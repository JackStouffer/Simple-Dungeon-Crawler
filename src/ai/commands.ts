import { isEqual, get } from "lodash";
import { World } from "ape-ecs";

import { PassableCallback } from "../rot/path/path";

import globals from "../globals";
import { Planner, ActionList, PlannerWorldState } from "./planner";
import { Command, MoveCameraCommand, NoOpCommand } from "../commands";
import {
    GoalData
} from "./goals";
import { ActionData } from "./actions";
import { GameMap, isSightBlocked, Vector2D } from "../map";
import {
    DisplayNameComponent,
    EntityMap,
    EntityTeamMap,
    FreezableComponent,
    StunnableComponent,
    PlannerAIComponent,
    PositionComponent,
    FearAIComponent,
    ConfusableAIComponent,
} from "../entity";
import { displayMessage } from "../ui";
import { Nullable } from "../util";
import { buildDialogQuery, queryAlliesForResponses, queryDialogTable, sayDialogDefinition } from "./dialog";

/**
 * Creates a function which returns if an x and y coordinate
 * represents a spot on the map which can be seen through
 */
export function createPassableSightCallback(origin: Vector2D): PassableCallback {
    return function(x: number, y: number) {
        if (globals.Game === null) { throw new Error("Global game object is null"); }

        // own space is passable
        if (origin.x === x && origin.y === y) {
            return true;
        }

        return isSightBlocked(
            globals.Game.ecs,
            globals.Game.map,
            globals.Game.entityMap,
            new Vector2D(x, y)
        ) === false;
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

    if (isEqual(aiState.previousWorldState, worldState)) {
        if (debug) {
            // eslint-disable-next-line no-console
            console.log(`World state has not changed from previous turn. currentAction: ${aiState.currentAction}`);
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
            const weight = actionData.weight(ecs, entityMap, aiState);
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
    } else if (aiState.currentOrder === "fallback" && aiState.goals.has("atFallbackPosition")) {
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

        if (debug && aiState.currentAction === null) {
            // eslint-disable-next-line no-console
            console.log(`No possible path to goal ${JSON.stringify(goal)}, skipping`);
        }
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

/**
 * Given an AI and the state of the game world, generate a list of commands
 * for AIs to perform.
 *
 * It is possible for commands to be generated for entities other than the
 * given one.
 *
 * @param ecs The current ECS world instance
 * @param map The current game map
 * @param entityMap A map of tile positions to entity ids
 * @param entityTeams A map of entity team ids to entity teams
 * @param ai the entity to generate a command for
 * @returns An array of commands
 */
export function generateAICommands(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    entityTeams: EntityTeamMap,
    entityId: string
): Command[] {
    const ai = ecs.getEntity(entityId);
    if (ai === undefined) {
        if (globals.Game?.debugAI === true) {
            // eslint-disable-next-line no-console
            console.log(`generateAICommands for ${entityId}, entityId does not exist`);
        }
        return [new NoOpCommand(true)];
    }

    const pos = ai.getOne(PositionComponent)?.tilePosition;
    if (pos === undefined) {
        throw new Error(`Entity ${ai.id} is missing a position component`);
    }

    const stunnableData = ai.getOne(StunnableComponent);
    if (stunnableData !== undefined &&
        stunnableData.stunned) {
        return [new NoOpCommand(true)];
    }

    const freezableData = ai.getOne(FreezableComponent);
    if (freezableData !== undefined && freezableData.frozen) {
        return [new NoOpCommand(true)];
    }

    const aiState = ai.getOne(PlannerAIComponent);
    if (aiState !== undefined) {
        const commands: Command[] = [];
        const target = ecs.getEntity(aiState.targetId);
        if (target === undefined) {
            if (globals.Game?.debugAI === true) {
                // eslint-disable-next-line no-console
                console.log(`generateAICommands for ${aiState.entity.id} has a non-existent target ${aiState.targetId}`);
            }
            return [new NoOpCommand(true)];
        }

        // Move the camera to the entity, but only if we're not running away
        // or confused
        const fearData = ai.getOne(FearAIComponent);
        const confusedData = ai.getOne(ConfusableAIComponent);
        if (aiState.knowsTargetPosition &&
            target.id === globals.Game!.playerId &&
            (fearData === undefined || fearData.fear < fearData.fearThreshold) &&
            (confusedData === undefined || !confusedData.confused)) {
            commands.push(new MoveCameraCommand(map, globals.Game!.gameCamera, ai));
        }

        const query = buildDialogQuery(ecs, map, entityMap, entityTeams, ai, aiState);
        const debugDialog = globals.Game?.debugAIDialog === true;

        if (debugDialog) {
            // eslint-disable-next-line no-console
            console.groupCollapsed(aiState.entity.id + " dialog");
            // eslint-disable-next-line no-console
            console.log("query", query);
        }

        const dialogDefinition = queryDialogTable(query);

        if (dialogDefinition !== null) {
            commands.push(sayDialogDefinition(ai, dialogDefinition));

            const allyResponse = queryAlliesForResponses(
                ecs, map, entityMap, entityTeams, aiState, dialogDefinition
            );
            if (allyResponse !== null) {
                commands.push(sayDialogDefinition(allyResponse.teamMate, allyResponse.response));
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
