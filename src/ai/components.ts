import { isEqual, get } from "lodash";

import { DIRS, RNG, FOV } from "../rot/index";
import { VisibilityCallback } from "../rot/fov/fov";
import { PassableCallback } from "../rot/path/path";

import globals from "../globals";
import { GoalData, ActionData, ObjectDataDetails, ObjectData } from "../data";
import { Planner, ActionList, PlannerWorldState } from "./planner";
import { Command, goToLocationCommand, noOpCommand } from "../commands";
import { GameMap, isBlocked, PathNode, isSightBlocked } from "../map";
import { GameObject } from "../object";
import { displayMessage } from "../ui";
import { Nullable } from "../util";


/**
 * Creates a function which checks if the Game player object
 * is visible or not and sets the AI to the chase state if it
 * is.
 *
 * @param {GameObject} owner The game object to be used with this function
 * @return {VisibilityCallback} the callback
 */
export function createVisibilityCallback(ai: PlanningAI): VisibilityCallback {
    return function(x: number, y: number, r: number, visibility: number) {
        if (ai.target === null) { return; }

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
    owner: Nullable<GameObject>;

    setOwner: (owner: Nullable<GameObject>) => void;
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
    owner: Nullable<GameObject>;

    // REFACTOR ME, should be a set of facts that an AI knows about,
    // some AIs can know more possible facts than others, returns false
    // if they don't track that fact
    sightRange: number;
    target: Nullable<GameObject>;
    pathName: Nullable<string>;
    patrolTarget: Nullable<PathNode>;
    fear: number;
    fearThreshold: number;
    lowHealthThreshold: number;
    lowManaThreshold: number;
    currentOrder: string;
    fallbackPosition: Nullable<number>;

    private previousWorldState: PlannerWorldState;
    private currentAction: Nullable<string>;
    private readonly goals: Set<string>;
    private readonly actions: Set<string>;
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
        this.sightRange = data.sightRange ?? 0;
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

    setOwner(owner: Nullable<GameObject>) {
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
                return "";
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
    getPlan(): Nullable<string> {
        if (this.owner === null) { throw new Error("Cannot create a plan without an owner"); }

        const worldState = this.generateWorldState();

        // Lose knowledge of the target's position if the target
        // is out of sight for seven turns
        if (worldState.targetInLineOfSight === false && this.knowsTargetPosition) {
            this.turnsWithTargetOutOfSight++;
        }

        const loseTrackAfterNTurns = ObjectData[this.owner.type].loseTrackAfterNTurns;
        if (this.turnsWithTargetOutOfSight === loseTrackAfterNTurns) {
            this.knowsTargetPosition = false;
            this.turnsWithTargetOutOfSight = 0;
            worldState.targetPositionKnown = false;
            displayMessage(`${this.owner.name} lost track of you`);
        }

        if (isEqual(this.previousWorldState, worldState)) {
            return this.currentAction;
        }

        if (this.previousWorldState.targetPositionKnown === false &&
            worldState.targetPositionKnown === true) {
            displayMessage(`${this.owner.name} saw you`);
        }

        this.planner.setStartState(worldState);

        const stateStack = [];
        if (this.currentOrder === "attack") {
            stateStack.push({ targetKilled: true });
        }
        if (worldState.lowMana === true) {
            stateStack.push({ lowMana: false });
        }
        if (worldState.lowHealth === true) {
            stateStack.push({ lowHealth: false });
        }
        if (worldState.inDangerousArea === true) {
            stateStack.push({ inDangerousArea: false });
        }
        if (this.currentOrder === "fallback" && this.goals.has("atFallbackPosition")) {
            stateStack.push({ atFallbackPosition: true });
        }
        if (worldState.afraid === true) {
            stateStack.push({ cowering: true });
        }

        do {
            this.planner.setGoalState(stateStack.pop());
            const plan = this.planner.calculate();
            this.currentAction = get(plan, "['0'].name", null);
        } while (stateStack.length > 0 && this.currentAction === null);

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
        if (this.owner === null) { throw new Error("Planning AI must have an owner to act"); }
        if (this.owner.fighter === null) { throw new Error("Planning AI must have a fighter"); }

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

        if (plan !== null) {
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
    owner: Nullable<GameObject>;
    oldAI: AIComponent;
    turns: number;

    constructor(currentAI: AIComponent, turns: number) {
        this.owner = null;
        this.oldAI = currentAI;
        this.turns = turns;
    }

    setOwner(owner: Nullable<GameObject>) {
        this.owner = owner;
    }

    getStateName(): string {
        return "confused";
    }

    act(): Command {
        if (this.owner === null) { throw new Error("ConfusedAI must have an owner to act"); }

        if (this.turns > 0) {
            let blocks: boolean = true;
            let newX: number = 0;
            let newY: number = 0;
            let dir: number = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;

            do {
                dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;
                newX = this.owner.x + DIRS[8][dir][0];
                newY = this.owner.y + DIRS[8][dir][1];
                ({ blocks } = isBlocked(globals.Game.map, globals.Game.gameObjects, newX, newY));
            } while (blocks === true);

            this.turns--;
            return goToLocationCommand([[newX, newY]], globals.Game.map, globals.Game.gameObjects);
        } else {
            if (this.owner === globals.Game.player) {
                displayMessage("You are no longer confused");
            } else {
                displayMessage(`${this.owner.name} is no longer confused`);
            }

            this.owner.ai = this.oldAI;
            return noOpCommand(true);
        }
    }
}

/**
 * AI which changes the background color of the object when the inventory
 * component is empty
 */
export class ChestAI implements AIComponent {
    owner: Nullable<GameObject>;
    bgColor: string;
    emptyColor: string;

    constructor(data: ObjectDataDetails) {
        if (data.bgColor === null) {
            throw new Error("Missing data bgColor on ChestAI ctor");
        }
        if (data.emptyColor === null) {
            throw new Error("Missing data emptyColor on ChestAI ctor");
        }

        this.owner = null;
        this.bgColor = data.bgColor;
        this.emptyColor = data.emptyColor;
    }

    setOwner(owner: Nullable<GameObject>) {
        this.owner = owner;
    }

    getStateName(): string {
        if (this.owner === null) { throw new Error("ChestAI must have an owner to getStateName"); }
        if (this.owner.graphics === null) { throw new Error("ChestAI must have graphics to getStateName"); }

        if (this.owner.graphics.bgColor === this.emptyColor) {
            return "empty";
        } else {
            return "closed";
        }
    }

    act(): Command {
        if (this.owner === null) { throw new Error("ChestAI must have an owner to act"); }
        if (this.owner.inventory === null) { throw new Error("ChestAI must have an inventory to act"); }
        if (this.owner.graphics === null) { throw new Error("ChestAI must have graphics to act"); }

        if (this.owner.inventory.getItems().length === 0) {
            this.owner.graphics.bgColor = this.emptyColor;
        } else {
            this.owner.graphics.bgColor = this.bgColor;
        }

        return noOpCommand(true);
    }
}

/**
 * AI which removes the owner from the game when the inventory is empty
 */
export class DroppedItemAI implements AIComponent {
    owner: Nullable<GameObject>;

    constructor() {
        this.owner = null;
    }

    setOwner(owner: Nullable<GameObject>) {
        this.owner = owner;
    }

    getStateName(): string {
        // fix me
        return "unknown";
    }

    act(): Command {
        if (this.owner === null) { throw new Error("DroppedItemAI must have an owner to act"); }
        if (this.owner.inventory === null) { throw new Error("DroppedItemAI must have an inventory to act"); }

        if (this.owner.inventory.getItems().length === 0) {
            globals.Game.removeObject(this.owner);
        }

        return noOpCommand(true);
    }
}

/**
 * Interaction component removes owner to give the appearance of opening
 * when interacting
 */
export class RemoveAfterNTurns implements AIComponent {
    private turns: number;
    owner: Nullable<GameObject>;

    constructor(data: ObjectDataDetails) {
        if (data.removeAfterNTurns === null) { throw new Error("RemoveAfterNTurns needs removeAfterNTurns set on the data"); }

        this.owner = null;
        this.turns = data.removeAfterNTurns;
    }

    getStateName(): string {
        return `Turns Left: ${this.turns}`;
    }

    setOwner(owner: Nullable<GameObject>): void {
        this.owner = owner;
    }

    act(): Command {
        if (this.owner === null) { throw new Error("Can't interact without an owner"); }

        if (this.turns <= 0) {
            globals.Game.removeObject(this.owner);
        }

        this.turns--;
        return noOpCommand(true);
    }
}
