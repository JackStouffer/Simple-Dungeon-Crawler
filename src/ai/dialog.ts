import { Entity, World } from "ape-ecs";
import { RNG } from "../rot";

import globals from "../globals";
import { DialogMemoryComponent, EntityMap, EntityTeamMap, HitPointsComponent, LoseTargetAIComponent, PlannerAIComponent, TypeComponent } from "../entity";
import { GameMap } from "../map";
import {
    resolveHasHealingItem,
    resolveKnowsHealOtherSpell,
    resolveHasHealOtherSpellCasts,
    resolveAliveAllies,
    resolveKnowsHealSelfSpell,
    resolveHasHealSelfSpellCasts,
    resolveSilenced,
    resolveKnowsDamageOtherSpell,
    resolveOnFire,
    resolveHasDamageOtherSpellCasts,
    resolveConfused,
    resolveAfraid
} from "./goals";
import { ShowSpeechBubbleCommand } from "../commands";
import { Nullable } from "../util";
import * as BanditDialogJSON from "../dialog/bandit.json";
import * as GoblinDialogJSON from "../dialog/goblin.json";

// TODO: Add line for when ally is killed
// TODO: add logic where some lines can only be said once in a whole team
// TODO: Add confused state end dialog line.
// TODO: Add line mocking player when they have low health
// TODO, Bug: goblin on fire then sees player, does not say player seen until after fire goes out

type DialogRule = [string, "=" | ">" | "<" | "<=" | ">=", string | number | boolean];

interface DialogDefinition {
    "name": string,
    "respondingTo": Nullable<string>,
    "rules": DialogRule[],
    "dialog": string[],
    "aiStateChange": {
        [key: string]: string | number | boolean
    }
    "dialogMemoryChange": {
        [key: string]: string | number | boolean
    }
}
interface DialogData {
    rules: DialogDefinition[];
}
interface DialogQuery {
    classification: string;
    [key: string]: number | string | boolean;
}

export const dialogByClassification: {
    [key: string]: DialogData
} = {
    "bandit": (BanditDialogJSON as any).default as DialogData,
    "goblin": (GoblinDialogJSON as any).default as DialogData
};

/**
 * Given a AI and the current state of the game world, generate a list of facts
 * to give to the dialog system to find a suitable dialog definition for the AI
 * to say.
 *
 * @param ecs The current ECS world
 * @param entityMap A map of tile positions to entity ids
 * @param entityTeams A map of entity team ids to entity teams
 * @param map the current game map
 * @param ai the entity to build the query for
 * @param aiState the entity's ai state
 * @returns A query of facts about the AI
 */
export function buildDialogQuery(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    entityTeams: EntityTeamMap,
    ai: Entity,
    aiState: PlannerAIComponent
): DialogQuery {
    const typeInfo = ai.getOne(TypeComponent);
    const query: DialogQuery = {
        "race": typeInfo?.race ?? "generic",
        "classification": typeInfo?.classification ?? "generic"
    };

    const team = entityTeams.get(aiState.teamId ?? Infinity);
    if (team !== undefined) {
        query["is_team_commander"] = team.commanderId === ai.id;
        query["did_team_commander_exist"] = team.createdWithCommander;
        query["team_commander_alive"] = team.commanderId !== null;
        query["team_state"] = team.state;
        query["has_alive_allies"] = resolveAliveAllies(ecs, entityMap, ai);

        // Ally capabilities
        for (const entityId of team.memberIds) {
            if (entityId === ai.id) { continue; }
            const entity = ecs.getEntity(entityId);
            if (entity !== undefined) {
                // TODO, Speed: O(n^2). This is evaluated once per team member for every
                // team member that can speak. Need to cache this information somehow
                if (resolveKnowsHealOtherSpell(ecs, entityMap, entity) === true) {
                    query["ally_knows_heal_other_spell"] = true;
                    break;
                }
            }
        }
    }

    const hpData = ai.getOne(HitPointsComponent);
    if (hpData !== undefined) {
        query["health_percentage"] = Math.floor((hpData.hp / hpData.maxHp) * 100);
    }

    const dialogMemoryData = ai.getOne(DialogMemoryComponent);
    if (dialogMemoryData !== undefined) {
        for (const iterator of dialogMemoryData.memory.entries()) {
            query[iterator[0]] = iterator[1];
        }
    }

    const loseTrackAfterNTurns = ai.getOne(LoseTargetAIComponent);
    if (loseTrackAfterNTurns !== undefined) {
        query["turns_with_target_out_of_sight"] = loseTrackAfterNTurns.turnsWithTargetOutOfSight;
        query["lose_track_after_n_turns"] = loseTrackAfterNTurns.loseTrackAfterNTurns;
    }

    query["map_name"] = map.name;
    query["knows_target_position"] = aiState.knowsTargetPosition;
    query["has_target_in_sight"] = aiState.hasTargetInSight;
    query["has_healing_items"] = resolveHasHealingItem(ecs, entityMap, ai);
    query["on_fire"] = resolveOnFire(ecs, entityMap, ai);
    query["is_silenced"] = resolveSilenced(ecs, entityMap, ai);
    query["is_confused"] = resolveConfused(ecs, entityMap, ai);
    query["is_afraid"] = resolveAfraid(ecs, entityMap, ai);
    query["knows_heal_other_spell"] = resolveKnowsHealOtherSpell(ecs, entityMap, ai);
    query["has_heal_other_spell_casts"] = resolveHasHealOtherSpellCasts(ecs, entityMap, ai);
    query["knows_heal_self_spell"] = resolveKnowsHealSelfSpell(ecs, entityMap, ai);
    query["has_heal_self_spell_casts"] = resolveHasHealSelfSpellCasts(ecs, entityMap, ai);
    query["knows_damage_other_spell"] = resolveKnowsDamageOtherSpell(ecs, entityMap, ai);
    query["has_damage_other_spell_casts"] = resolveHasDamageOtherSpellCasts(ecs, entityMap, ai);

    return query;
}

const templateRegex = /{{([a-z,_,-]*)}}/g;

/**
 * Given a query, find the dialog definition that best matches.
 *
 * @param query The dialog query object of facts
 * @param respondingTo the name of the dialog definition to respond to
 * @returns a dialog definition which matches all of the facts
 */
export function queryDialogTable(
    query: DialogQuery,
    respondingTo: Nullable<string> = null
): Nullable<DialogDefinition> {
    // TODO, speed: Sort the definitions so that the highest rule count ones are first.
    // if a four rule definition is found, no need to check the three rule ones.

    // TODO, speed: turn the rule matching into the number line comparison
    // as shown in the original talk. Turn strings into symbols. Reduce branch penalties

    const matches: DialogDefinition[] = [];
    const debugDialog = globals.Game?.debugAIDialog === true;

    const dialogData = dialogByClassification[query["classification"]];
    if (dialogData === undefined) {
        return null;
    }

    definitions: for (const dialogDefinition of dialogData.rules) {
        if (debugDialog) {
            // eslint-disable-next-line no-console
            console.log(`definition ${dialogDefinition.name}`);
        }

        if (respondingTo === null && dialogDefinition.respondingTo !== null) {
            continue;
        } else if (respondingTo !== null && respondingTo !== dialogDefinition.respondingTo) {
            continue;
        }

        for (const rule of dialogDefinition.rules) {
            let value: any;
            // Dynamic template replacement
            if (typeof rule[2] === "string") {
                const templateMatch = templateRegex.exec(rule[2]);
                if (templateMatch !== null &&
                    templateMatch.length > 1 &&
                    templateMatch[1] in query) {
                    value = query[templateMatch[1]];
                } else if (templateMatch !== null &&
                    templateMatch.length > 1 &&
                    !(templateMatch[1] in query)) {
                    if (debugDialog) {
                        // eslint-disable-next-line no-console
                        console.log(`Dialog template ${rule[2]} does not exist in query. Skipping`);
                    }

                    continue definitions;
                } else {
                    value = rule[2];
                }
            } else {
                value = rule[2];
            }

            if (rule[1] === "=" && query[rule[0]] !== value) {

                if (debugDialog) {
                    // eslint-disable-next-line no-console
                    console.log(`rule fail: ${JSON.stringify(rule)}`);
                }

                continue definitions;
            } else if (rule[1] === "<" && query[rule[0]] >= value) {

                if (debugDialog) {
                    // eslint-disable-next-line no-console
                    console.log(`rule fail: ${JSON.stringify(rule)}`);
                }

                continue definitions;
            } else if (rule[1] === ">" && query[rule[0]] <= value) {

                if (debugDialog) {
                    // eslint-disable-next-line no-console
                    console.log(`rule fail: ${JSON.stringify(rule)}`);
                }

                continue definitions;
            } else if (rule[1] === "<=" && query[rule[0]] > value) {

                if (debugDialog) {
                    // eslint-disable-next-line no-console
                    console.log(`rule fail: ${JSON.stringify(rule)}`);
                }

                continue definitions;
            } else if (rule[1] === ">=" && query[rule[0]] < value) {

                if (debugDialog) {
                    // eslint-disable-next-line no-console
                    console.log(`rule fail: ${JSON.stringify(rule)}`);
                }

                continue definitions;
            }

            if (debugDialog) {
                // eslint-disable-next-line no-console
                console.log(`rule pass: ${JSON.stringify(rule)}`);
            }
        }

        matches.push(dialogDefinition);
    }

    if (matches.length === 0) {
        return null;
    }

    // heuristic for best dialog definition match is the one with
    // the most rules
    matches.sort((a, b) => {
        const aRules = a.rules.length;
        const bRules = b.rules.length;

        // Coin flip
        if (aRules === bRules) {
            return Math.random() <= .5 ? -1 : 1;
        }

        return bRules - aRules;
    });
    const match = matches[0];

    if (globals.Game?.debugAIDialog === true) {
        // eslint-disable-next-line no-console
        console.log("matched definitions", matches);
    }

    return match;
}

/**
 * Given a dialog definition, pick a line randomly, update the state
 * of the AI from the definition, and return the command to say the line.
 *
 * @param ai The entity to say the dialog
 * @param dialog The dialog data definition
 * @returns {ShowSpeechBubbleCommand} A command to show the chosen line
 */
export function sayDialogDefinition(
    ai: Entity,
    dialog: DialogDefinition
): ShowSpeechBubbleCommand {
    const aiState = ai.getOne(PlannerAIComponent);
    if (aiState === undefined) {
        throw new Error("Entity does not have a planner ai");
    }

    const line = RNG.getItem(dialog.dialog)!;

    if (globals.Game?.debugAIDialog === true) {
        // eslint-disable-next-line no-console
        console.log("randomly chosen line", line);
    }

    // Update the dialog memory
    const dialogMemoryData = ai.getOne(DialogMemoryComponent);
    if (dialogMemoryData !== undefined) {
        for (const key in dialog.dialogMemoryChange) {
            dialogMemoryData.memory.set(key, dialog.dialogMemoryChange[key]);
        }
    }

    for (const key in dialog.aiStateChange) {
        aiState[key] = dialog.aiStateChange[key];
    }

    return new ShowSpeechBubbleCommand(ai.id, line);
}

type QueryAlliesReturn = {
    teamMate: Entity,
    response: DialogDefinition
};

/**
 * Given a dialog definition that was said by an AI, look for dialog definitions
 * that could be said in response to it by the AI's allies.
 *
 * @param {World} ecs The ECS instance to use
 * @param {GameMap} map the current map instance
 * @param {EntityMap} entityMap a map of tile positions to entity ids
 * @param {EntityTeamMap} entityTeams a map of entity team ids to entity teams
 * @param {PlannerAIComponent} aiState the AI state that's saying the current line
 * @param {DialogDefinition} dialog  the dialog definition that was said
 * @returns {Nullable<QueryAlliesReturn>} the teammate who is going to say the response and the response
 */
export function queryAlliesForResponses(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    entityTeams: EntityTeamMap,
    aiState: PlannerAIComponent,
    dialog: DialogDefinition
): Nullable<QueryAlliesReturn> {
    const team = entityTeams.get(aiState.teamId ?? Infinity);
    const possibleResponses: QueryAlliesReturn[] = [];

    if (team !== undefined) {
        for (const eId of team.memberIds) {
            const teamMate = ecs.getEntity(eId);

            if (teamMate !== undefined) {
                const teamMateAIState = teamMate.getOne(PlannerAIComponent);
                if (teamMateAIState === undefined) {
                    throw new Error(`team mate ${eId} is missing a PlannerAIComponent`);
                }

                const response = queryDialogTable(
                    buildDialogQuery(ecs, map, entityMap, entityTeams, teamMate, teamMateAIState),
                    dialog.name
                );
                if (response !== null) {
                    possibleResponses.push({ teamMate: teamMate, response });
                }
            }
        }
    }

    if (possibleResponses.length === 0) {
        return null;
    }

    // heuristic for best dialog definition match is the one with
    // the most rules
    possibleResponses.sort((a, b) => {
        const aRules = a.response!.rules.length;
        const bRules = b.response!.rules.length;

        // Coin flip
        if (aRules === bRules) {
            return Math.random() <= .5 ? -1 : 1;
        }

        return aRules - bRules;
    });

    return possibleResponses[0];
}
