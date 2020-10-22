import { DIRS, RNG, Path } from "../rot/index";
import { PassableCallback } from "../rot/path/path";
import { findKey, isEqual, get } from "lodash";

import globals from "../globals";
import { GoalData, ActionData, ObjectDataDetails } from "../data";
import { Planner, ActionList, PlannerWorldState } from "./planner";
import { Command, moveCommand, noOpCommand } from "../commands";
import { GameMap, isBlocked, isSightBlocked, PathNode } from "../map";
import { GameObject } from "../object";
import { displayMessage } from "../ui";

export interface AIComponent {
    owner: GameObject;
    sightRange?: number;
    state?: string;
    target?: GameObject;
    pathName?: string;
    patrolTarget?: PathNode;
    fear?: number;
    fearThreshold?: number;
    lowHealthThreshold?: number;
    lowManaThreshold?: number;

    setOwner: (owner: GameObject) => void;
    act: (
        map: GameMap,
        gameObjects: GameObject[],
        pathNodes: Map<number, PathNode>
    ) => Command;
    setPatrolPath?: (name: string) => void;
    setFallbackPosition?: (name: number) => void;
}

/**
 * Creates a function which returns if an x and y coordinate
 * represents a passable spot on the map.
 *
 * @param  {GameObject} owner The game object to be used with this function
 * @return {Function}         the callback
 */
export function createPassableCallback(owner: GameObject): PassableCallback {
    return function(x: number, y: number) {
        // own space is passable
        if (owner.x === x && owner.y === y) {
            return true;
        }
        const { blocks } = isBlocked(globals.Game.map, globals.Game.gameObjects, x, y);
        return !blocks;
    };
}

/**
 * Creates a function which returns if an x and y coordinate
 * represents a spot on the map which can be seen through.
 *
 * @param  {GameObject} owner The game object to be used with this function
 * @return {Function}         the callback
 */
export function createPassableSightCallback(owner: GameObject): PassableCallback {
    return function(x: number, y: number) {
        // own space is passable
        if (owner.x === x && owner.y === y) {
            return true;
        }
        return isSightBlocked(globals.Game.map, globals.Game.gameObjects, x, y) === false;
    };
}

/**
 * Creates a function which checks if the Game player object
 * is visible or not and sets the AI to the chase state if it
 * is.
 *
 * @param  {GameObject} owner The game object to be used with this function
 * @return {Function}         the callback
 */
export function createVisibilityCallback(ai: AIComponent) {
    return function(x:number, y:number, r: number, visibility: number) {
        if (x === globals.Game.player.x && y === globals.Game.player.y && visibility > 0) {
            displayMessage(ai.owner.name + " saw you");
            ai.state = "chase";
        }
    };
}

/**
 * Calculate a path from the actor to the target and return
 * the x and y coordinates of the next step along that path.
 *
 * @param {GameObject} actor The game object to start from
 * @param {Number} targetX The target x coordinate
 * @param {Number} targetY The target y coordinate
 * @returns {Object} The x and y coordinates
 */
export function getNextStepTowardsTarget(
    actor: GameObject,
    targetX: number,
    targetY: number
): { x: number, y: number } {
    const aStar = new Path.AStar(
        targetX,
        targetY,
        createPassableCallback(actor),
        { topology: 8 }
    );

    const path: number[][] = [];
    function pathCallback(x: number, y: number) {
        path.push([x, y]);
    }
    aStar.compute(actor.x, actor.y, pathCallback);

    // remove our own position
    path.shift();

    if (path.length > 0) {
        return { x: path[0][0], y: path[0][1] };
    }
    return { x: null, y: null };
}

/**
 * Turn a change in position to a ROT.js DIR, so
 * a number between 0 and 7.
 *
 * @param {Number} currentX The starting x coordinate
 * @param {Number} currentY The starting y coordinate
 * @param {Number} newX The new x coordinate
 * @param {Number} newY The new y coordinate
 * @return {Number} the ROT.js DIR
 */
export function newPositionToDirection(
    currentX: number,
    currentY: number,
    newX: number,
    newY: number
): number {
    const key = findKey(
        DIRS[8],
        function(o) { return isEqual(o, [newX - currentX, newY - currentY]); }
    );
    return Number.parseInt(key, 10);
}

export class PlanningAI implements AIComponent {
    owner: GameObject;
    target: GameObject;
    state: string;
    sightRange: number;
    currentOrder: string;
    fear: number;
    fearThreshold: number;
    lowHealthThreshold: number;
    lowManaThreshold: number;
    pathName: string;
    patrolTarget: any;
    fallbackPosition: any;
    previousWorldState: PlannerWorldState;
    currentAction: string;
    goals: Set<string>;
    actions: Set<string>;
    planner: Planner;

    constructor(data: ObjectDataDetails) {
        this.owner = null;
        this.target = globals.Game.player;
        this.state = "wander";
        // TODO: order received from superior
        this.currentOrder = "attack";
        this.fear = 0;
        this.fearThreshold = 10;
        this.lowHealthThreshold = .25;
        this.lowManaThreshold = .25;
        this.sightRange = data.sightRange;
        this.pathName = null;
        this.patrolTarget = null;
        this.fallbackPosition = null;

        this.previousWorldState = {};
        this.currentAction = null;
        this.goals = new Set();
        this.actions = new Set(data.actions);
    }

    createPlanner() {
        const actionList = new ActionList();

        for (const action of this.actions) {
            const actionData = ActionData[action];
            const preconditions = Object.keys(actionData.preconditions);
            const postconditions = Object.keys(actionData.postconditions);

            // Get the needed list of goals from the pre and post conditions
            // of the list of actions
            for (let j = 0; j < preconditions.length; j++) {
                this.goals.add(preconditions[j]);
            }
            for (let k = 0; k < postconditions.length; k++) {
                this.goals.add(postconditions[k]);
            }

            actionList.addCondition(action, actionData.preconditions);
            actionList.addReaction(action, actionData.postconditions);
            actionList.setWeight(action, actionData.weight(this as AIComponent));
        }

        this.planner = new Planner(...this.goals.values());
        this.planner.setActionList(actionList);
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
        if (owner !== null) {
            this.createPlanner();
        }
    }

    setPatrolPath(name: string) {
        this.pathName = name;
        this.actions.delete("wander");
        this.actions.delete("guard");
        this.actions.add("patrol");
        this.createPlanner();
    }

    setFallbackPosition(nodeID: number) {
        this.fallbackPosition = nodeID;
        this.actions.add("goToFallbackPosition");
        this.createPlanner();
    }

    generateWorldState(): PlannerWorldState {
        const state: PlannerWorldState = {};

        for (const goal of this.goals) {
            const goalData = GoalData[goal];
            state[goal] = goalData.resolver(this as AIComponent);
        }

        return state;
    }

    /**
     * Set the world state and the weights of the actions on the
     * planner
     */
    getPlan() {
        const worldState = this.generateWorldState();

        if (isEqual(this.previousWorldState, worldState)) {
            return this.currentAction;
        }

        this.planner.setStartState(worldState);

        const stateStack = [];
        if (this.currentOrder === "attack") {
            stateStack.push({ targetKilled: true });
        }
        if (worldState.lowMana) {
            stateStack.push({ lowMana: false });
        }
        if (worldState.lowHealth) {
            stateStack.push({ lowHealth: false });
        }
        if (worldState.inDangerousArea) {
            stateStack.push({ inDangerousArea: false });
        }
        if (this.currentOrder === "fallback" && this.goals.has("atFallbackPosition")) {
            stateStack.push({ atFallbackPosition: true });
        }
        if (worldState.afraid) {
            stateStack.push({ cowering: true });
        }

        do {
            this.planner.setGoalState(stateStack.pop());
            const plan = this.planner.calculate();
            this.currentAction = get(plan, "['0'].name", null);
        } while (stateStack.length && !this.currentAction);

        this.previousWorldState = worldState;
        return this.currentAction;
    }

    act(
        map: GameMap,
        gameObjects: GameObject[],
        pathNodes: Map<number, PathNode>
    ): Command {
        if (!this.owner.fighter) { throw new Error("Mage AI must have a fighter"); }
        const plan = this.getPlan();
        if (plan) {
            return ActionData[plan].updateFunction(this, map, gameObjects, pathNodes);
        } else {
            return noOpCommand();
        }
    }
}

/**
 * AI component which stores the previous AI from the owner.
 * Goes in random directions for the specified number of act
 * calls. Then, replaces itself on the owner with the previous
 * AI component on the owner.
 */
export class ConfusedAI implements AIComponent {
    owner: GameObject;
    oldAI: AIComponent;
    turns: number;

    constructor(currentAI: AIComponent, turns: number) {
        this.owner = null;
        this.oldAI = currentAI;
        this.turns = turns;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
    }

    act() {
        if (this.turns > 0) {
            let blocks, newX, newY, dir;
            do {
                dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]);
                newX = this.owner.x + DIRS[8][dir][0];
                newY = this.owner.y + DIRS[8][dir][1];
                ({ blocks } = isBlocked(globals.Game.map, globals.Game.gameObjects, newX, newY));
            } while (blocks === true);

            this.turns--;
            return moveCommand(dir, 8);
        } else {
            if (this.owner === globals.Game.player) {
                displayMessage("You are no longer confused");
            } else {
                displayMessage(`${this.owner.name} is no longer confused`);
            }

            this.owner.ai = this.oldAI;
            return null;
        }
    }
}

/**
 * AI which changes the background color of the object when the inventory
 * component is empty
 */
export class ChestAI implements AIComponent {
    owner: GameObject;
    bgColor: string;
    emptyColor: string;

    constructor(bgColor: string, emptyColor: string) {
        this.owner = null;
        this.bgColor = bgColor;
        this.emptyColor = emptyColor;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
    }

    act(): Command {
        if (this?.owner?.inventoryComponent) {
            if (this.owner.inventoryComponent.getItems().length === 0) {
                this.owner.graphics.bgColor = this.emptyColor;
            } else {
                this.owner.graphics.bgColor = this.bgColor;
            }
        } else {
            throw new Error("Missing inventoryComponent for ChestAI");
        }
        return null;
    }
}

/**
 * AI which removes the owner from the game when the inventory is empty
 */
export class DroppedItemAI implements AIComponent {
    owner: GameObject;

    constructor() {
        this.owner = null;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
    }

    act(): Command {
        if (this?.owner?.inventoryComponent) {
            if (this.owner.inventoryComponent.getItems().length === 0) {
                globals.Game.removeObject(this.owner);
            }
        } else {
            throw new Error("Missing inventoryComponent for DroppedItemAI");
        }
        return null;
    }
}
