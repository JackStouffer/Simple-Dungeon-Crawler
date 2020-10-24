import { isEqual, get } from "lodash";

import { DIRS, RNG, FOV } from "../rot/index";
import { VisibilityCallback } from "../rot/fov/fov";
import { PassableCallback } from "../rot/path/path";

import globals from "../globals";
import { GoalData, ActionData, ObjectDataDetails } from "../data";
import { Planner, ActionList, PlannerWorldState } from "./planner";
import { Command, moveCommand, noOpCommand } from "../commands";
import { GameMap, isBlocked, PathNode, isSightBlocked } from "../map";
import { GameObject } from "../object";
import { displayMessage } from "../ui";


/**
 * Creates a function which checks if the Game player object
 * is visible or not and sets the AI to the chase state if it
 * is.
 *
 * @param {GameObject} owner The game object to be used with this function
 * @return {VisibilityCallback} the callback
 */
export function createVisibilityCallback(ai: AIComponent): VisibilityCallback {
    return function(x: number, y: number, r: number, visibility: number) {
        if (x === ai.target.x && y === ai.target.y && visibility > 0) {
            ai.knowsTargetPosition = true;
            ai.hasTargetInSight = true;
        }
    };
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

    isCowering?: boolean;
    isAtFallbackPosition?: boolean;
    knowsTargetPosition?: boolean;
    hasTargetInSight?: boolean;

    setOwner: (owner: GameObject) => void;
    getStateName: () => string;
    act: (
        map: GameMap,
        gameObjects: GameObject[],
        pathNodes: Map<number, PathNode>
    ) => Command;
    setPatrolPath?: (name: string) => void;
    setFallbackPosition?: (name: number) => void;
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
    patrolTarget: PathNode;
    fallbackPosition: number;

    private previousWorldState: PlannerWorldState;
    private currentAction: string;
    private goals: Set<string>;
    private actions: Set<string>;
    private planner: Planner;
    private turnsWithTargetOutOfSight: number;

    knowsTargetPosition: boolean;
    hasTargetInSight: boolean;
    isCowering: boolean;
    isAtFallbackPosition: boolean;

    constructor(data: ObjectDataDetails) {
        this.owner = null;
        this.target = globals.Game.player;
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
        this.turnsWithTargetOutOfSight = 0;

        this.knowsTargetPosition = false;
        this.hasTargetInSight = false;
        this.isCowering = false;
        this.isAtFallbackPosition = false;

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
            actionList.setWeight(action, actionData.weight(this));
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

    getStateName(): string {
        switch (this.currentAction) {
            case "wander":
            case "guard":
            case "patrol":
                return this.currentAction;
            case "goToEnemy":
            case "meleeAttack":
                return "attacking";
            default:
                return this.currentAction;
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
            state[goal] = goalData.resolver(this);
        }

        return state;
    }

    /**
     * Set the world state and the weights of the actions on the
     * planner
     */
    getPlan() {
        const worldState = this.generateWorldState();

        // Lose knowledge of the target's position if the target
        // is out of sight for seven turns
        if (!worldState.targetInLineOfSight && this.knowsTargetPosition) {
            this.turnsWithTargetOutOfSight++;
        }
        if (this.turnsWithTargetOutOfSight === 7) {
            this.knowsTargetPosition = false;
            this.turnsWithTargetOutOfSight = 0;
            worldState.targetPositionKnown = false;
            displayMessage(`${this.owner.name} lost track of you`);
        }

        if (isEqual(this.previousWorldState, worldState)) {
            return this.currentAction;
        }

        if (!this.previousWorldState.targetPositionKnown &&
            worldState.targetPositionKnown) {
            displayMessage(`${this.owner.name} saw you`);
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

    /**
     * Make a plan and return a command to fulfil the first step.
     * @param map {GameMap} The current map
     * @param gameObjects {GameObject[]} The world's game objects
     * @param pathNodes {Map<number, PathNode>} The map's nodes
     * @returns {Command} a command function
     */
    act(
        map: GameMap,
        gameObjects: GameObject[],
        pathNodes: Map<number, PathNode>
    ): Command {
        if (!this.owner.fighter) { throw new Error("Planning AI must have a fighter"); }

        // compute the FOV to see if the player is sighted
        const fov = new FOV.PreciseShadowcasting(createPassableSightCallback(this.owner));
        fov.compute(
            this.owner.x,
            this.owner.y,
            this.sightRange,
            createVisibilityCallback(this)
        );

        const plan = this.getPlan();

        // Assume we've lost sight of the target after every turn,
        // so that when the visibility callback sets the flag to true,
        // iff the target is seen, we get the right behavior
        this.hasTargetInSight = false;

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

    getStateName(): string {
        return "confused";
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

    getStateName(): string {
        if (this.owner.graphics.bgColor === this.emptyColor) {
            return "empty";
        } else {
            return "closed";
        }
    }

    act(): Command {
        if (this?.owner?.inventory) {
            if (this.owner.inventory.getItems().length === 0) {
                this.owner.graphics.bgColor = this.emptyColor;
            } else {
                this.owner.graphics.bgColor = this.bgColor;
            }
        } else {
            throw new Error("Missing inventory for ChestAI");
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

    getStateName(): string {
        return "unknown";
    }

    act(): Command {
        if (this?.owner?.inventory) {
            if (this.owner.inventory.getItems().length === 0) {
                globals.Game.removeObject(this.owner);
            }
        } else {
            throw new Error("Missing inventory for DroppedItemAI");
        }
        return null;
    }
}
