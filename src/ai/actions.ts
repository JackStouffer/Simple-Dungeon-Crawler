/* global ENV */
declare var ENV: any;

import { RNG, DIRS, FOV } from "../rot/index";

import { AsyncCommand, Command, moveCommand, useItemCommand, useSpellCommand } from "../commands";
import {
    getNextStepTowardsTarget,
    createPassableSightCallback,
    createVisibilityCallback,
    newPositionToDirection, AIComponent
} from "./components";
import { GameObject } from "../object";
import { distanceBetweenObjects, GameMap, isBlocked, PathNode } from "../map";
import { displayMessage } from "../ui";

export function wanderAction(ai: AIComponent, map: GameMap, gameObjects: GameObject[]): Command {
    // compute the FOV to see if the player is sighted
    const fov = new FOV.PreciseShadowcasting(createPassableSightCallback(ai.owner));
    fov.compute(
        ai.owner.x,
        ai.owner.y,
        ai.sightRange,
        createVisibilityCallback(ai)
    );

    let blocks, newX, newY, dir;
    do {
        dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]);
        newX = ai.owner.x + DIRS[8][dir][0];
        newY = ai.owner.y + DIRS[8][dir][1];
        ({ blocks } = isBlocked(map, gameObjects, newX, newY));
    } while (blocks === true);

    return moveCommand(dir, 8);
}

export function patrolAction(ai: AIComponent, map: GameMap, gameObjects: GameObject[], pathNodes: Map<number, PathNode>): Command {
    if (ENV === "DEV" && !ai.pathName) {
        throw new Error("pathName not set for PatrollingMonsterAI");
    }

    // compute the FOV to see if the player is sighted
    const fov = new FOV.PreciseShadowcasting(createPassableSightCallback(ai.owner));
    fov.compute(
        ai.owner.x,
        ai.owner.y,
        ai.sightRange,
        createVisibilityCallback(ai)
    );

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

export function useHealingItemAction(ai: AIComponent): AsyncCommand {
    const item = ai.owner.inventoryComponent
        .getItems()
        .filter(i => i.type === "heal")
        .sort((a, b) => a.value - b.value)[0];
    displayMessage(`${ai.owner.name} used a ${item.displayName}`);
    return useItemCommand(item.id);
}

export function useManaItemAction(ai: AIComponent): AsyncCommand {
    const item = ai.owner.inventoryComponent
        .getItems()
        .filter(i => i.type === "add_mana")
        .sort((a, b) => a.value - b.value)[0];
    displayMessage(`${ai.owner.name} used a ${item.displayName}`);
    return useItemCommand(item.id);
}

export function castSpellAction(spellID: string) {
    return function (ai: AIComponent): Command | AsyncCommand {
        if (ENV === "DEV") {
            const spells = ai.owner.fighter.getKnownSpells().map(s => s.id);
            console.log(spellID, ai.owner.fighter.getKnownSpells());
            if (spells.indexOf(spellID) === -1) {
                throw new Error(`${ai.owner.name} does not know spell ${spellID}`);
            }
        }
        return useSpellCommand(spellID);
    };
}
