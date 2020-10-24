declare const ENV: string;

import { findKey, isEqual } from "lodash";

import { RNG, DIRS, Path } from "../rot/index";

import {
    Command,
    moveCommand,
    useItemCommand,
    useSpellCommand
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
    PathNode
} from "../map";
import { displayMessage } from "../ui";
import { ItemType } from "../data";

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

export function wanderAction(ai: AIComponent, map: GameMap, gameObjects: GameObject[]): Command {
    let blocks, newX, newY, dir;
    do {
        dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]);
        newX = ai.owner.x + DIRS[8][dir][0];
        newY = ai.owner.y + DIRS[8][dir][1];
        ({ blocks } = isBlocked(map, gameObjects, newX, newY));
    } while (blocks === true);

    return moveCommand(dir, 8);
}

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

    let { x, y } = getNextStepTowardsTarget(
        ai.owner,
        ai.patrolTarget.x,
        ai.patrolTarget.y
    );
    if (x === null || y === null) {
        ai.patrolTarget = pathNodes.get(ai.patrolTarget.next);
        ({ x, y } = getNextStepTowardsTarget(
            ai.owner,
            ai.patrolTarget.x,
            ai.patrolTarget.y
        ));
    }
    return moveCommand(newPositionToDirection(ai.owner.x, ai.owner.y, x, y), 8);
}

export function chaseAction(ai: AIComponent): Command {
    const { x, y } = getNextStepTowardsTarget(
        ai.owner,
        ai.target.x,
        ai.target.y
    );
    if (x === null || y === null) {
        return null;
    }

    return moveCommand(newPositionToDirection(ai.owner.x, ai.owner.y, x, y), 8);
}

export function chaseWeight(ai: AIComponent): number {
    return distanceBetweenObjects(ai.owner, ai.target);
}

export function useHealingItemAction(ai: AIComponent): Command {
    const item = ai.owner.inventoryComponent
        .getItems()
        .filter(i => i.type === ItemType.HealSelf)
        .sort((a, b) => a.value - b.value)[0];
    displayMessage(`${ai.owner.name} used a ${item.displayName}`);
    return useItemCommand(item.id);
}

export function useManaItemAction(ai: AIComponent): Command {
    const item = ai.owner.inventoryComponent
        .getItems()
        .filter(i => i.type === ItemType.AddManaSelf)
        .sort((a, b) => a.value - b.value)[0];
    displayMessage(`${ai.owner.name} used a ${item.displayName}`);
    return useItemCommand(item.id);
}

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
