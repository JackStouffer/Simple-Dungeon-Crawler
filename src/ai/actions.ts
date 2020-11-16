import { get } from "lodash";

import { RNG, DIRS, Path } from "../rot/index";

import {
    Command,
    UseItemCommand,
    UseSpellCommand,
    GoToLocationCommand,
    InteractCommand,
    NoOpCommand
} from "../commands";
import {
    AIComponent,
    createPassableCallback,
    PlanningAI
} from "./components";
import { GameObject } from "../object";
import {
    distanceBetweenObjects,
    GameMap,
    getObjectsAtLocation,
    isBlocked,
    PathNode,
} from "../map";
import { displayMessage } from "../ui";
import { ItemType, ObjectData } from "../data";
import { Nullable } from "../util";
import globals from "../globals";

function weightCallback(x: number, y: number): number {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    const objects = getObjectsAtLocation(globals.Game.gameObjects, x, y);
    // if (objects.length > 0) { console.log(objects); }
    return objects.length > 0 ? 20 : 0;
}

/**
 * Calculate a path from a game object to the give x and y
 * coordinates. Return the x and y position of the nth step
 * along the path.
 * @param {GameObject} actor The starting point
 * @param {number} targetX The x coordinate to move towards
 * @param {number} targetY The y coordinate to move towards
 * @param {number} steps The number of steps along the path to take
 * @returns {Point} the nth step along the path
 */
export function getStepsTowardsTarget(
    actor: GameObject,
    targetX: number,
    targetY: number,
    steps: number
): Nullable<number[][]> {
    const aStar = new Path.AStar(
        targetX,
        targetY,
        createPassableCallback(actor),
        weightCallback,
        { topology: 8 }
    );

    const path: number[][] = [];
    function pathCallback(x: number, y: number) {
        path.push([x, y]);
    }
    aStar.compute(actor.x, actor.y, pathCallback);

    // remove our own position
    path.shift();
    // remove the target's position
    path.pop();

    if (path.length > 0) {
        return path.slice(0, steps);
    }
    return null;
}

/**
 * Generates a command to move in a random direction that is not
 * blocked.
 * @param ai The AI which is acting
 * @param map The current game map
 * @param gameObjects The current map's list of objects
 * @returns {Command} A move command
 */
export function wanderAction(ai: AIComponent, map: GameMap, gameObjects: GameObject[]): Command {
    if (ai.owner === null) { throw new Error("No owner on AI for wanderAction"); }

    let blocks: boolean = true;
    let object: Nullable<Object> = null;
    let newX: number = 0;
    let newY: number = 0;
    let dir: number = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;

    do {
        dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;
        newX = ai.owner.x + DIRS[8][dir][0];
        newY = ai.owner.y + DIRS[8][dir][1];
        ({ blocks, object } = isBlocked(map, gameObjects, newX, newY));
    } while (blocks === true || object !== null);

    return new GoToLocationCommand([[newX, newY]], map, gameObjects);
}

/**
 * Generates a command to move towards the AI's current patrol node.
 * If the AI is at the patrol node, then set the AI's patrol node to
 * the next node.
 * @param {AIComponent} ai The AI which is acting
 * @param {GameMap} map The current game map
 * @param {GameObject[]} gameObjects The current map's list of objects
 * @param {Map<number, PathNode>} pathNodes The map of patrol nodes for the map
 * @returns {Command} A move command
 */
export function patrolAction(
    ai: PlanningAI,
    map: GameMap,
    gameObjects: GameObject[],
    pathNodes: Map<number, PathNode>
): Command {
    if (ai.pathName === null) { throw new Error("pathName not set for PatrollingMonsterAI"); }
    if (ai.owner === null) { throw new Error("No owner on AI for patrolAction"); }

    // For the first node, find the closest node on the path
    // to the current position, we can just follow the path
    // after that
    if (ai.patrolTarget === null) {
        const sortedNodes = [...pathNodes.values()]
            .filter((n) => { return n.pathName === ai.pathName; })
            .map((e) => {
                e.distance = distanceBetweenObjects(e, ai.owner!);
                return e;
            })
            .sort((a, b) => {
                return a.distance - b.distance;
            });

        ai.patrolTarget = get(sortedNodes, "[0]", null);
    }
    if (ai.patrolTarget === null) {
        return new NoOpCommand(true);
    }

    let path: Nullable<number[][]> = getStepsTowardsTarget(
        ai.owner,
        ai.patrolTarget.x,
        ai.patrolTarget.y,
        2
    );
    // try the next node
    if (path === null) {
        ai.patrolTarget = pathNodes.get(ai.patrolTarget.next) ?? null;

        if (ai.patrolTarget === null) {
            return new NoOpCommand(true);
        }

        path = getStepsTowardsTarget(
            ai.owner,
            ai.patrolTarget.x,
            ai.patrolTarget.y,
            2
        );
    }
    // give up
    if (path === null) {
        return new NoOpCommand(true);
    }

    return new GoToLocationCommand(path, map, gameObjects);
}

/**
 * Go towards the AI's target
 * @param {AIComponent} ai The ai to act
 * @returns {Command} a command to move
 */
export function chaseAction(
    ai: PlanningAI,
    map: GameMap,
    gameObjects: GameObject[],
): Command {
    if (ai.owner === null) { throw new Error("No owner on AI for chaseAction"); }
    if (ai.target === null) { throw new Error("Cannot perform chaseAction without a target"); }

    const maxTilesPerMove = ObjectData[ai.owner.type].maxTilesPerMove;
    if (maxTilesPerMove === null) {
        throw new Error(`Missing maxTilesPerMove for ${ai.owner.type}`);
    }

    const path: Nullable<number[][]> = getStepsTowardsTarget(
        ai.owner,
        ai.target.x,
        ai.target.y,
        maxTilesPerMove
    );
    if (path === null) {
        return new NoOpCommand(true);
    }

    if (path === null) {
        return new NoOpCommand(true);
    }

    return new GoToLocationCommand(path, map, gameObjects);
}

/**
 * Find the weight of chasing the AI's target
 * @param {AIComponent} ai the ai to calculate the weight for
 * @returns {number} the weight
 */
export function chaseWeight(ai: PlanningAI): number {
    if (ai.owner === null) { throw new Error("No owner on AI for chaseWeight"); }
    if (ai.target === null) { throw new Error("Cannot find chaseWeight without a target"); }

    return distanceBetweenObjects(ai.owner, ai.target);
}

/**
 * Generate a command to attack the current AI's target. Should
 * only be called if the AI is in attack range.
 * @param ai The AI which is acting
 * @returns {Command} An attack command
 */
export function meleeAttackAction(ai: PlanningAI): Command {
    if (ai.owner === null) { throw new Error("No owner on AI for meleeAttackAction"); }
    if (ai.target === null) { throw new Error("Cannot perform meleeAttackAction without a target"); }
    return new InteractCommand(ai.target);
}

/**
 * Generate a command to use the most effective healing item
 * in the AI's inventory.
 * @param ai The AI to act
 * @returns {Command} A use item command
 */
export function useHealingItemAction(ai: PlanningAI): Command {
    if (ai.owner === null) { throw new Error("No owner on AI for useHealingItemAction"); }
    if (ai.owner.inventory === null) { throw new Error("No inventory on owner for AI for castSpellAction"); }

    const item = ai.owner.inventory
        .getItems()
        .filter(i => i.type === ItemType.HealSelf)
        .sort((a, b) => a.value! - b.value!)[0];

    displayMessage(`${ai.owner.name} used a ${item.displayName}`);

    return new UseItemCommand(item.id);
}

/**
 * Generate a command to use the most effective add mana item
 * in the AI's inventory.
 * @param ai The AI to act
 * @returns {Command} A use item command
 */
export function useManaItemAction(ai: PlanningAI): Command {
    if (ai.owner === null) { throw new Error("No owner on AI for useManaItemAction"); }
    if (ai.owner.inventory === null) { throw new Error("No inventory on owner for AI for useManaItemAction"); }

    const item = ai.owner.inventory
        .getItems()
        .filter(i => i.type === ItemType.AddManaSelf)
        .sort((a, b) => a.value! - b.value!)[0];

    displayMessage(`${ai.owner.name} used a ${item.displayName}`);

    return new UseItemCommand(item.id);
}

/**
 * A generator for an Action Update function.
 *
 * The generated update function will return a command
 * which uses the specified spell.
 *
 * @param {string} spellID The ID of the spell to use
 * @returns {function} the action update function
 */
export function castSpellAction(spellID: string) {
    return function (ai: PlanningAI, map: GameMap, gameObjects: GameObject[]): Command {
        if (ai.owner === null) { throw new Error("No owner on AI for castSpellAction"); }
        if (ai.owner.fighter === null) { throw new Error("No fighter on owner for AI for castSpellAction"); }

        const spells = ai.owner.fighter.getKnownSpells().map(s => s.id);
        if (spells.indexOf(spellID) === -1) {
            throw new Error(`${ai.owner.name} does not know spell ${spellID}`);
        }

        return new UseSpellCommand(spellID, ai.target, map, gameObjects);
    };
}
