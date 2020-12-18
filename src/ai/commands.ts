import { isEqual, get } from "lodash";
import { Entity, World } from "ape-ecs";

import { DIRS, RNG, FOV } from "../rot/index";
import { VisibilityCallback } from "../rot/fov/fov";
import { PassableCallback } from "../rot/path/path";

import globals from "../globals";
import { Planner, ActionList, PlannerWorldState } from "./planner";
import { Command, GoToLocationCommand, NoOpCommand } from "../commands";
import { GoalData } from "./goals";
import { ActionData } from "./actions";
import { GameMap, isBlocked, isSightBlocked } from "../map";
import {
    ConfusedAIComponent,
    DisplayNameComponent,
    FearAIComponent,
    LevelComponent,
    LoseTargetAIComponent,
    PlannerAIComponent,
    PositionComponent
} from "../entity";
import { displayMessage } from "../ui";
import { Nullable } from "../util";

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
    const targetPos = aiState.target?.getOne(PositionComponent);

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
 * represents a spot on the map which can be seen through.
 *
 * @param  {GameObject} owner The game object to be used with this function
 * @return {Function}         the callback
 */
export function createPassableSightCallback(origin: PositionComponent): PassableCallback {
    return function(x: number, y: number) {
        if (globals.Game === null) { throw new Error("Global game object is null"); }

        // own space is passable
        if (origin.x === x && origin.y === y) {
            return true;
        }
        return isSightBlocked(globals.Game.ecs, globals.Game.map, x, y) === false;
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

export function generateWorldState(ecs: World, aiState: PlannerAIComponent): PlannerWorldState {
    const state: PlannerWorldState = {};

    for (const goal of aiState.goals) {
        const goalData = GoalData[goal];
        state[goal] = goalData.resolver(ecs, aiState.entity);
    }

    return state;
}

/**
 * Set the world state and the weights of the actions on the
 * planner
 */
export function getPlan(ecs: World, aiState: PlannerAIComponent): Nullable<string> {
    const displayName = aiState.entity.getOne(DisplayNameComponent);
    if (displayName === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing a DisplayNameComponent`); }

    const worldState = generateWorldState(ecs, aiState);

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
        return aiState.currentAction;
    }

    if (aiState.previousWorldState.targetPositionKnown === false &&
        worldState.targetPositionKnown === true) {
        displayMessage(`${displayName.name} saw you`);
    }

    const actions = Object.keys(aiState.planner.actionList!.reactions);
    for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        const actionData = ActionData[action];
        if (actionData !== undefined) {
            const weight = actionData.weight(ecs, aiState);
            aiState.planner.actionList!.setWeight(action, weight);
            if (globals.Game?.debugAI === true) {
                // eslint-disable-next-line no-console
                console.log(`${aiState.entity.id}, action ${action} weight ${weight}`);
            }
        }
    }

    aiState.planner.setStartState(worldState);

    const stateStack: { [key: string]: boolean }[] = [];
    if (aiState.currentOrder === "attack") {
        stateStack.push({ targetKilled: true });
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

    let goal;
    do {
        goal = stateStack.pop();
        aiState.planner.setGoalState(goal);
        const plan = aiState.planner.calculate();
        aiState.currentAction = get(plan, "['0'].name", null);
    } while (stateStack.length > 0 && aiState.currentAction === null);

    if (globals.Game?.debugAI === true) {
        // eslint-disable-next-line no-console
        console.log(`${aiState.entity.id}, goal ${JSON.stringify(goal)} currentAction ${aiState.currentAction}`);
    }

    aiState.previousWorldState = worldState;
    return aiState.currentAction;
}

/**
 * Make a plan and return a command to fulfil the first step.
 * @param map {GameMap} The current map
 * @param gameObjects {GameObject[]} The world's game objects
 * @param pathNodes {Map<number, PathNode>} The map's nodes
 * @returns {Command} a command function
 */
export function plannerAIGenerateCommand(
    ecs: World,
    ai: Entity,
    map: GameMap,
    entityMap: Map<string, Entity[]>
): Command {
    const aiState = ai.getOne(PlannerAIComponent);
    const pos = ai.getOne(PositionComponent);
    if (pos === undefined || aiState === undefined) {
        throw new Error(`Entity ${ai.id} is missing a position component`);
    }

    // compute the FOV to see if the player is sighted
    const fov = new FOV.PreciseShadowcasting(createPassableSightCallback(pos));
    fov.compute(
        pos.x,
        pos.y,
        aiState.sightRange,
        createVisibilityCallback(ai)
    );

    const plan = getPlan(ecs, aiState);

    // Assume we've lost sight of the target after every turn,
    // so that when the visibility callback sets the flag to true,
    // iff the target is seen, we get the right behavior
    aiState.hasTargetInSight = false;

    if (plan !== null) {
        return ActionData[plan].updateFunction(ecs, aiState, map, entityMap);
    } else {
        return new NoOpCommand(true);
    }
}

export function confusedAIGenerateCommand(
    ecs: World,
    entity: Entity,
    map: GameMap,
    entityMap: Map<string, Entity[]>
): Command {
    const confusedState = entity.getOne(ConfusedAIComponent);
    if (confusedState === undefined) { throw new Error(`Entity ${entity.id} is missing a ConfusedAIComponent`); }
    const pos = entity.getOne(PositionComponent);
    const displayName = entity.getOne(DisplayNameComponent);
    if (pos === undefined || displayName === undefined) {
        throw new Error(`Entity ${entity.id} is missing a data`);
    }

    confusedState.turnsLeft--;

    if (confusedState.turnsLeft > 0) {
        let blocks: boolean = true;
        let newX: number = 0;
        let newY: number = 0;
        let dir: number = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;

        do {
            dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;
            newX = pos.x + DIRS[8][dir][0];
            newY = pos.y + DIRS[8][dir][1];
            ({ blocks } = isBlocked(map, entityMap, newX, newY));
        } while (blocks === true);

        confusedState.update();
        return new GoToLocationCommand(
            [[newX, newY]],
            ecs,
            map,
            entityMap
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
    ai: Entity,
    map: GameMap,
    entityMap: Map<string, Entity[]>
): Command {
    const aiState = ai.getOne(PlannerAIComponent);
    const confusedState = ai.getOne(ConfusedAIComponent);

    if (confusedState !== undefined) {
        return confusedAIGenerateCommand(ecs, ai, map, entityMap);
    }

    if (aiState !== undefined) {
        return plannerAIGenerateCommand(ecs, ai, map, entityMap);
    }

    throw new Error(`Missing AI state on entity ${ai.id}`);
}
