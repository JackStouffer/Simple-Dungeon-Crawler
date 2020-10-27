declare const ENV: string;

import { RNG, DIRS, Path } from "../rot/index";

import {
    Command,
    useItemCommand,
    useSpellCommand,
    goToLocationCommand,
    interactCommand
} from "../commands";
import {
    AIComponent,
    createPassableCallback
} from "./components";
import { GameObject } from "../object";
import {
    distanceBetweenObjects,
    GameMap,
    isBlocked,
    PathNode,
    Point
} from "../map";
import { displayMessage } from "../ui";
import { ItemType, ObjectData } from "../data";

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
): Point {
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
    // remove the target's position
    path.pop();

    if (path.length > 0) {
        const index = Math.min(steps - 1, path.length - 1);
        return { x: path[index][0], y: path[index][1] };
    }
    return { x: null, y: null };
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
    let blocks, newX, newY, dir;
    do {
        dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]);
        newX = ai.owner.x + DIRS[8][dir][0];
        newY = ai.owner.y + DIRS[8][dir][1];
        ({ blocks } = isBlocked(map, gameObjects, newX, newY));
    } while (blocks === true);

    return goToLocationCommand(newX, newY);
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
    ai: AIComponent,
    map: GameMap,
    gameObjects: GameObject[],
    pathNodes: Map<number, PathNode>
): Command {
    if (ENV === "DEV" && !ai.pathName) {
        throw new Error("pathName not set for PatrollingMonsterAI");
    }

    // For the first node, find the closest node on the path
    // to the current position, we can just follow the path
    // after that
    if (ai.patrolTarget === null) {
        const sortedNodes = [...pathNodes.values()]
            .filter((n) => { return n.pathName === ai.pathName; })
            .map((e) => {
                e.distance = distanceBetweenObjects(e, ai.owner);
                return e;
            })
            .sort((a, b) => {
                return a.distance - b.distance;
            });

        ai.patrolTarget = sortedNodes[0];
    }

    const maxTilesPerMove = ObjectData[ai.owner.type].maxTilesPerMove;
    let { x, y } = getStepsTowardsTarget(
        ai.owner,
        ai.patrolTarget.x,
        ai.patrolTarget.y,
        maxTilesPerMove
    );
    if (x === null || y === null) {
        ai.patrolTarget = pathNodes.get(ai.patrolTarget.next);
        ({ x, y } = getStepsTowardsTarget(
            ai.owner,
            ai.patrolTarget.x,
            ai.patrolTarget.y,
            maxTilesPerMove
        ));
    }
    return goToLocationCommand(x, y);
}

/**
 * Go towards the AI's target
 * @param {AIComponent} ai The ai to act
 * @returns {Command} a command to move
 */
export function chaseAction(ai: AIComponent): Command {
    const { x, y } = getStepsTowardsTarget(
        ai.owner,
        ai.target.x,
        ai.target.y,
        5
    );
    if (x === null || y === null) {
        return null;
    }

    return goToLocationCommand(x, y);
}

/**
 * Find the weight of chasing the AI's target
 * @param {AIComponent} ai the ai to calculate the weight for
 * @returns {number} the weight
 */
export function chaseWeight(ai: AIComponent): number {
    return distanceBetweenObjects(ai.owner, ai.target);
}

/**
 * Generate a command to attack the current AI's target. Should
 * only be called if the AI is in attack range.
 * @param ai The AI which is acting
 * @returns {Command} An attack command
 */
export function meleeAttackAction(ai: AIComponent): Command {
    return interactCommand(ai.target);
}

/**
 * Generate a command to use the most effective healing item
 * in the AI's inventory.
 * @param ai The AI to act
 * @returns {Command} A use item command
 */
export function useHealingItemAction(ai: AIComponent): Command {
    const item = ai.owner.inventory
        .getItems()
        .filter(i => i.type === ItemType.HealSelf)
        .sort((a, b) => a.value - b.value)[0];
    displayMessage(`${ai.owner.name} used a ${item.displayName}`);
    return useItemCommand(item.id);
}

/**
 * Generate a command to use the most effective add mana item
 * in the AI's inventory.
 * @param ai The AI to act
 * @returns {Command} A use item command
 */
export function useManaItemAction(ai: AIComponent): Command {
    const item = ai.owner.inventory
        .getItems()
        .filter(i => i.type === ItemType.AddManaSelf)
        .sort((a, b) => a.value - b.value)[0];
    displayMessage(`${ai.owner.name} used a ${item.displayName}`);
    return useItemCommand(item.id);
}

/**
 * A generator for an Action Update function.
 *
 * The generated update function will return a command
 * which uses the specified spell.
 *
 * @param spellID The ID of the spell to use
 * @returns {function} the action update function
 */
export function castSpellAction(spellID: string) {
    return function (ai: AIComponent): Command {
        if (ENV === "DEV") {
            const spells = ai.owner.fighter.getKnownSpells().map(s => s.id);
            if (spells.indexOf(spellID) === -1) {
                throw new Error(`${ai.owner.name} does not know spell ${spellID}`);
            }
        }
        return useSpellCommand(spellID, ai.target);
    };
}
