/* global ENV */

import { FOV } from "rot-js";

import { moveCommand, useItemCommand } from "../commands";
import {
    getNextStepTowardsTarget,
    createPassableSightCallback,
    createVisibilityCallback,
    newPositionToDirection
} from "./components";
import { distanceBetweenObjects } from "../map";
import { displayMessage } from "../ui";

export function patrolAction(ai, map, gameObjects, pathNodes) {
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

export function chaseAction(ai) {
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

export function useHealingItemAction(ai) {
    const item = ai.owner.inventoryComponent
        .getItems()
        .filter(i => i.type === "heal")
        .sort((a, b) => a.value - b.value)[0];
    displayMessage(`${ai.owner.name} used a ${item.displayName}`);
    return useItemCommand(item.id);
}

export function useManaItemAction(ai) {
    const item = ai.owner.inventoryComponent
        .getItems()
        .filter(i => i.type === "add_mana")
        .sort((a, b) => a.value - b.value)[0];
    displayMessage(`${ai.owner.name} used a ${item.displayName}`);
    return useItemCommand(item.id);
}