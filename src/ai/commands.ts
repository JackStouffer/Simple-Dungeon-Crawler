import { isEqual, get } from "lodash";
import { Entity, World } from "ape-ecs";

import { DIRS, RNG, FOV } from "../rot/index";
import { VisibilityCallback } from "../rot/fov/fov";
import { PassableCallback } from "../rot/path/path";

import globals from "../globals";
import { Planner, ActionList, PlannerWorldState } from "./planner";
import { Command, GoToLocationCommand, NoOpCommand, ShowSpeechBubbleCommand } from "../commands";
import {
    GoalData,
    resolveHasHealingItem,
    resolveKnowsHealOtherSpell,
    resolveHasHealOtherSpellCasts,
    resolveAliveAllies,
    resolveKnowsHealSelfSpell,
    resolveHasHealSelfSpellCasts
} from "./goals";
import { ActionData } from "./actions";
import { GameMap, isBlocked, isSightBlocked, Point } from "../map";
import {
    ConfusedAIComponent,
    DialogMemoryComponent,
    DisplayNameComponent,
    EntityMap,
    EntityTeamMap,
    FearAIComponent,
    FreezableComponent,
    HitPointsComponent,
    LevelComponent,
    LoseTargetAIComponent,
    ParalyzableComponent,
    PlannerAIComponent,
    PositionComponent,
    TypeComponent
} from "../entity";
import * as BanditDialogJSON from "../dialog/bandit.json";
import { displayMessage } from "../ui";
import { Nullable } from "../util";

type DialogRule = [string, "=" | ">" | "<" | "<=" | ">=", string | number | boolean];

type DialogDefinition = {
    "respondingTo": Nullable<string>,
    "rules": DialogRule[],
    "dialog": string[],
    "aiStateChange": {
        [key: string]: string | number | boolean
    }
    "dialogMemoryChange": {
        [key: string]: string | number | boolean
    }
};
type DialogData = {
    [key: string]: DialogDefinition
};

type DialogQuery = {
    classification: string;
    [key: string]: number | string | boolean;
};

export const dialogByClassification: {
    [key: string]: DialogData
} = {
    "bandit": (BanditDialogJSON as any).default as DialogData
};

/**
 * Add fear to an entity when it sees an enemy
 */
function calcFearOnSight(ai: Entity): number {
    const aiState = ai.getOne(PlannerAIComponent)!;
    const levelData = ai.getOne(LevelComponent);

    if (aiState.target === null) { throw new Error("Should set target here"); }
    const targetLevelData = aiState.target.getOne(LevelComponent);

    if (levelData === undefined || targetLevelData === undefined) {
        return 1;
    }

    return Math.max(targetLevelData.level - levelData.level, 0);
}

/**
 * Creates a function which checks if the Game player object
 * is visible or not and sets the AI hasTargetInSight bool to
 * true.
 */
function createVisibilityCallback(ai: Entity): VisibilityCallback {
    const aiState = ai.getOne(PlannerAIComponent)!;
    const fearState = ai.getOne(FearAIComponent)!;
    const targetPos = aiState.target?.getOne(PositionComponent)?.tilePosition();

    return function(x: number, y: number, r: number, visibility: number) {
        if (targetPos === undefined) { return; }
        if (x === targetPos.x && y === targetPos.y && visibility > 0) {
            if (fearState !== undefined && aiState.knowsTargetPosition === false) {
                fearState.fear += calcFearOnSight(ai);
                fearState.update();
            }

            aiState.knowsTargetPosition = true;
            aiState.hasTargetInSight = true;
            aiState.update();
        }
    };
}

/**
 * Creates a function which returns if an x and y coordinate
 * represents a spot on the map which can be seen through
 */
export function createPassableSightCallback(origin: Point): PassableCallback {
    return function(x: number, y: number) {
        if (globals.Game === null) { throw new Error("Global game object is null"); }

        // own space is passable
        if (origin.x === x && origin.y === y) {
            return true;
        }
        return isSightBlocked(globals.Game.map, globals.Game.entityMap, x, y) === false;
    };
}

export function createPlanner(actions: Set<string>) {
    const goals: Set<string> = new Set();
    const actionList = new ActionList();

    for (const action of actions) {
        const actionData = ActionData[action];
        if (actionData === undefined) { throw new Error(`${action} is not a valid action`); }
        const preconditions = Object.keys(actionData.preconditions);
        const postconditions = Object.keys(actionData.postconditions);

        // Get the needed list of goals from the pre and post conditions
        // of the list of actions
        for (let j = 0; j < preconditions.length; j++) {
            goals.add(preconditions[j]);
        }
        for (let k = 0; k < postconditions.length; k++) {
            goals.add(postconditions[k]);
        }

        actionList.addCondition(action, actionData.preconditions);
        actionList.addReaction(action, actionData.postconditions);
    }

    const planner = new Planner(...goals.values());
    planner.setActionList(actionList);

    return { planner, goals };
}

/**
 * used for getting a nice string for the ui
 */
export function getStateName(aiState: PlannerAIComponent): string {
    switch (aiState.currentAction) {
        case "wander":
        case "guard":
        case "patrol":
            return aiState.currentAction;
        case "goToEnemy":
        case "meleeAttack":
            return "attacking";
        default:
            return "";
    }
}

function generateWorldState(
    ecs: World,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): PlannerWorldState {
    const state: PlannerWorldState = {};

    for (const goal of aiState.goals) {
        const goalData = GoalData[goal];
        state[goal] = goalData.resolver(ecs, entityMap, aiState.entity);
    }

    return state;
}

/**
 * Set the world state and the weights of the actions on the
 * planner
 */
export function getPlan(
    ecs: World,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Nullable<string> {
    const debug = globals.Game?.debugAI === true;
    const displayName = aiState.entity.getOne(DisplayNameComponent);
    if (displayName === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing a DisplayNameComponent`); }

    const worldState = generateWorldState(ecs, entityMap, aiState);
    if (debug) {
        // eslint-disable-next-line no-console
        console.groupCollapsed(aiState.entity.id);
        // eslint-disable-next-line no-console
        console.log("worldState", worldState);
    }

    const loseTrackData = aiState.entity.getOne(LoseTargetAIComponent);
    // Lose knowledge of the target's position if the target
    // is out of sight for seven turns
    if (loseTrackData !== undefined &&
        worldState.targetInLineOfSight === false &&
        aiState.knowsTargetPosition
    ) {
        loseTrackData.turnsWithTargetOutOfSight++;

        if (loseTrackData.turnsWithTargetOutOfSight === loseTrackData.loseTrackAfterNTurns) {
            aiState.knowsTargetPosition = false;
            loseTrackData.turnsWithTargetOutOfSight = 0;
            worldState.targetPositionKnown = false;
            displayMessage(`${displayName.name} lost track of you`);
        }

        loseTrackData.update();
    }

    if (isEqual(aiState.previousWorldState, worldState)) {
        if (debug) {
            // eslint-disable-next-line no-console
            console.groupEnd();
        }
        return aiState.currentAction;
    }

    if (aiState.previousWorldState.targetPositionKnown === false &&
        worldState.targetPositionKnown === true) {
        displayMessage(`${displayName.name} saw you`);
    }

    const actions = Object.keys(aiState.planner.actionList!.reactions);
    const actionDebugTable = [];
    for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        const actionData = ActionData[action];
        if (actionData !== undefined) {
            const weight = actionData.weight(ecs, aiState);
            aiState.planner.actionList!.setWeight(action, weight);

            if (debug) {
                actionDebugTable.push({ action, weight });
            }
        }
    }

    if (debug) {
        // eslint-disable-next-line no-console
        console.table(actionDebugTable);
    }

    aiState.planner.setStartState(worldState);

    // The state stack is the list of things the AI wants
    // to do in ascending order of importance. If the AI
    // doesn't have plan to do the most important thing, it
    // moves onto the next item
    const stateStack: { [key: string]: boolean }[] = [];

    if (aiState.currentOrder === "attack") {
        stateStack.push({ targetKilled: true });
    } else if (aiState.currentOrder === "alert_allies") {
        stateStack.push({ alliesAlerted: true });
    } else if (aiState.currentOrder === "fallback") {
        stateStack.push({ atFallbackPosition: true });
    }

    if (aiState.goals.has("lowHealth") && worldState.lowHealth === true) {
        stateStack.push({ lowHealth: false });
    }
    if (aiState.goals.has("allyLowHealth") && worldState.allyLowHealth === true) {
        stateStack.push({ allyLowHealth: false });
    }
    if (aiState.goals.has("inDangerousArea") && worldState.inDangerousArea === true) {
        stateStack.push({ inDangerousArea: false });
    }
    if (aiState.currentOrder === "fallback" && aiState.goals.has("atFallbackPosition")) {
        stateStack.push({ atFallbackPosition: true });
    }
    if (aiState.goals.has("afraid") && worldState.afraid === true) {
        stateStack.push({ cowering: true });
    }
    if (aiState.goals.has("onFire") && worldState.onFire === true) {
        stateStack.push({ onFire: false });
    }

    let goal: { [key: string]: boolean } | undefined;
    do {
        goal = stateStack.pop();

        if (goal === undefined) {
            aiState.currentAction = null;
            break;
        }

        aiState.planner.setGoalState(goal);
        const plan = aiState.planner.calculate();
        aiState.currentAction = get(plan, "['0'].name", null);
    } while (stateStack.length > 0 && aiState.currentAction === null);

    if (debug) {
        // eslint-disable-next-line no-console
        console.log(`goal: ${JSON.stringify(goal)}`);
        // eslint-disable-next-line no-console
        console.log(`currentAction: ${aiState.currentAction}`);
        // eslint-disable-next-line no-console
        console.groupEnd();
    }

    aiState.previousWorldState = worldState;
    return aiState.currentAction;
}

/**
 * Make a plan and return a command to fulfil the first step
 */
function plannerAIGenerateCommand(
    ecs: World,
    aiState: PlannerAIComponent,
    map: GameMap,
    entityMap: EntityMap
): Command {
    const plan = getPlan(ecs, entityMap, aiState);

    if (plan !== null) {
        return ActionData[plan].updateFunction(ecs, map, entityMap, aiState);
    } else {
        return new NoOpCommand(true);
    }
}

function confusedAIGenerateCommand(
    ecs: World,
    entity: Entity,
    map: GameMap,
    entityMap: EntityMap
): Command {
    const confusedState = entity.getOne(ConfusedAIComponent);
    if (confusedState === undefined) { throw new Error(`Entity ${entity.id} is missing a ConfusedAIComponent`); }
    const pos = entity.getOne(PositionComponent);
    const displayName = entity.getOne(DisplayNameComponent);
    if (pos === undefined || displayName === undefined) {
        throw new Error(`Entity ${entity.id} is missing data`);
    }

    confusedState.turnsLeft--;

    if (confusedState.turnsLeft > 0) {
        const tilePos = pos.tilePosition();
        let blocks: boolean = true;
        let newX: number = 0;
        let newY: number = 0;
        let dir: number = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;

        do {
            dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;
            newX = tilePos.x + DIRS[8][dir][0];
            newY = tilePos.y + DIRS[8][dir][1];
            ({ blocks } = isBlocked(map, entityMap, newX, newY));
        } while (blocks === true);

        confusedState.update();
        return new GoToLocationCommand(
            entity,
            [[newX, newY]]
        );
    } else {
        confusedState.destroy();

        if (entity === globals.Game!.player) {
            displayMessage("You are no longer confused");
        } else {
            displayMessage(`${displayName.name} is no longer confused`);
        }

        return new NoOpCommand(true);
    }
}

export function generateAICommand(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    entityTeams: EntityTeamMap,
    ai: Entity
): Command[] {
    const aiState = ai.getOne(PlannerAIComponent);
    const confusedState = ai.getOne(ConfusedAIComponent);
    const paralyzableData = ai.getOne(ParalyzableComponent);
    const freezableData = ai.getOne(FreezableComponent);
    const pos = ai.getOne(PositionComponent)?.tilePosition();

    if (pos === undefined) {
        throw new Error(`Entity ${ai.id} is missing a position component`);
    }

    if (paralyzableData !== undefined &&
        paralyzableData.paralyzed) {
        return [new NoOpCommand(true)];
    }

    if (freezableData !== undefined && freezableData.frozen) {
        return [new NoOpCommand(true)];
    }

    if (confusedState !== undefined) {
        return [confusedAIGenerateCommand(ecs, ai, map, entityMap)];
    }

    if (aiState !== undefined) {
        const commands: Command[] = [];

        // compute the FOV to see if the player is sighted
        const fov = new FOV.PreciseShadowcasting(createPassableSightCallback(pos));
        fov.compute(
            pos.x,
            pos.y,
            aiState.sightRange,
            createVisibilityCallback(ai)
        );

        const query = buildDialogQuery(ecs, entityMap, entityTeams, map, ai, aiState);
        const debugDialog = globals.Game?.debugAIDialog === true;

        if (debugDialog) {
            // eslint-disable-next-line no-console
            console.groupCollapsed(aiState.entity.id + " dialog");
            // eslint-disable-next-line no-console
            console.log("query", query);
        }

        const dialogDefinition = queryDialogTable(query);

        if (dialogDefinition !== null) {
            const line = RNG.getItem(dialogDefinition.dialog)!;

            if (debugDialog) {
                // eslint-disable-next-line no-console
                console.log("randomly chosen line", line);
            }

            commands.push(new ShowSpeechBubbleCommand(ai, line));

            // Update the dialog memory
            const dialogMemoryData = ai.getOne(DialogMemoryComponent);
            if (dialogMemoryData !== undefined) {
                for (const key in dialogDefinition.dialogMemoryChange) {
                    dialogMemoryData.memory.set(key, dialogDefinition.dialogMemoryChange[key]);
                }
            }

            for (const key in dialogDefinition.aiStateChange) {
                aiState[key] = dialogDefinition.aiStateChange[key];
            }
        }

        if (debugDialog) {
            // eslint-disable-next-line no-console
            console.groupEnd();
        }

        commands.push(plannerAIGenerateCommand(ecs, aiState, map, entityMap));

        // Assume we've lost sight of the target after every turn,
        // so that when the visibility callback sets the flag to true,
        // iff the target is seen, we get the right behavior
        aiState.hasTargetInSight = false;

        return commands;
    }

    throw new Error(`Missing AI state on entity ${ai.id}`);
}


function buildDialogQuery(
    ecs: World,
    entityMap: EntityMap,
    entityTeams: EntityTeamMap,
    map: GameMap,
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
        query["team_commander_alive"] = team.commanderId !== null;
        query["team_state"] = team.state;
        query["has_alive_allies"] = resolveAliveAllies(ecs, entityMap, ai);

        // Ally capabilities
        for (const entityId of team.memberIds) {
            if (entityId === ai.id) { continue; }
            const entity = ecs.getEntity(entityId);
            if (entity !== undefined) {
                // TODO, Speed: O(n^2).
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

    query["map_name"] = map.name;
    query["knows_target_position"] = aiState.knowsTargetPosition;
    query["has_target_in_sight"] = aiState.hasTargetInSight;
    query["has_healing_items"] = resolveHasHealingItem(ecs, entityMap, ai);
    query["knows_heal_other_spell"] = resolveKnowsHealOtherSpell(ecs, entityMap, ai);
    query["has_heal_other_spell_casts"] = resolveHasHealOtherSpellCasts(ecs, entityMap, ai);
    query["knows_heal_self_spell"] = resolveKnowsHealSelfSpell(ecs, entityMap, ai);
    query["has_heal_self_spell_casts"] = resolveHasHealSelfSpellCasts(ecs, entityMap, ai);

    return query;
}

function queryDialogTable(query: DialogQuery): Nullable<DialogDefinition> {
    const matches: string[] = [];

    const dialogData = dialogByClassification[query["classification"]];
    if (dialogData === undefined) {
        return null;
    }

    definitions: for (const key in dialogData) {
        const dialogDefinition = dialogData[key];

        if (dialogDefinition.respondingTo !== null) {
            continue;
        }

        for (const rule of dialogDefinition.rules) {
            if (rule[1] === "=" && query[rule[0]] !== rule[2]) {
                continue definitions;
            } else if (rule[1] === "<" && query[rule[0]] >= rule[2]) {
                continue definitions;
            } else if (rule[1] === ">" && query[rule[0]] <= rule[2]) {
                continue definitions;
            } else if (rule[1] === "<=" && query[rule[0]] > rule[2]) {
                continue definitions;
            } else if (rule[1] === ">=" && query[rule[0]] < rule[2]) {
                continue definitions;
            }
        }

        matches.push(key);
    }

    if (matches.length === 0) {
        return null;
    }

    // heuristic for best dialog definition match is the one with
    // the most rules
    matches.sort((a, b) => {
        const aRules = dialogData[b].rules.length;
        const bRules = dialogData[a].rules.length;

        // Coin flip
        if (aRules === bRules) {
            return Math.random() <= .5 ? -1 : 1;
        }

        return aRules - bRules;
    });
    const match = dialogData[matches[0]];

    if (globals.Game?.debugAIDialog === true) {
        // eslint-disable-next-line no-console
        console.log("matched definitions", matches);
    }

    return match;
}
