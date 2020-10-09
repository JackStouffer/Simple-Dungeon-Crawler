"use strict";

import { FOV, DIRS, RNG, Path } from "rot-js";
import findKey from "lodash/findKey";
import isEqual from "lodash/isEqual";

import globals from "./globals";
import { moveCommand } from "./commands";
import { isBlocked, isSightBlocked, findEmptySpace } from "./map";
import { displayMessage } from "./ui";

/**
 * Creates a function which returns if an x and y coordinate
 * represents a passable spot on the map.
 *
 * @param  {GameObject} owner The game object to be used with this function
 * @return {Function}         the callback
 */
export function createPassableCallback(owner) {
    return function(x, y) {
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
export function createPassableSightCallback(owner) {
    return function(x, y) {
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
export function createVisibilityCallback(ai) {
    return function(x, y, r, visibility) {
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
function getNextStepTowardsTarget(actor, targetX, targetY) {
    const aStar = new Path.AStar(
        targetX,
        targetY,
        createPassableCallback(actor),
        { topology: 8 }
    );

    const path = [];
    function pathCallback(x, y) {
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
function newPositionToDirection(currentX, currentY, newX, newY) {
    return findKey(
        DIRS[8],
        function(o) { return isEqual(o, [newX - currentX, newY - currentY]); }
    );
}

/**
 * Basic monster behavior designed for dumb mobs. Only two states:
 * chase and wander. Default state is wander, which just chooses
 * a random direction and sees if it's empty, then moves if it is.
 *
 * Uses a definable sight range to check if a target is in range.
 * If one is this switches to chase which uses A* to go towards
 * the target. Attacks the target when it's within one tile from it
 */
class BasicMonsterAI {
    constructor(sightRange) {
        this.owner = null;
        this.state = "wander";
        this.sightRange = sightRange;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        // wander in random directions
        if (this.state === "wander") {
            // compute the FOV to see if the player is sighted
            const fov = new FOV.PreciseShadowcasting(createPassableSightCallback(this.owner));
            fov.compute(
                this.owner.x,
                this.owner.y,
                this.sightRange, createVisibilityCallback(this)
            );

            let blocks, newX, newY, dir;
            do {
                dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]);
                newX = this.owner.x + DIRS[8][dir][0];
                newY = this.owner.y + DIRS[8][dir][1];
                ({ blocks } = isBlocked(globals.Game.map, globals.Game.gameObjects, newX, newY));
            } while (blocks === true);

            return moveCommand(dir, 8);
        // chase the player with A*
        } else if (this.state === "chase") {
            const { x, y } = getNextStepTowardsTarget(
                this.owner,
                globals.Game.player.x,
                globals.Game.player.y
            );
            if (x === null || y === null) {
                return null;
            }

            return moveCommand(newPositionToDirection(this.owner.x, this.owner.y, x, y), 8);
        }
    }
}

/**
 * More complex monster behavior with two states, chase and patrol.
 * The default state, patrol, chooses a random empty space in the
 * map and uses A* to go there.
 *
 * Uses a definable sight range to check if a target is in range.
 * If one is this switches to chase which uses A* to go towards
 * the target. Attacks the target when it's within one tile from it
 */
class PatrollingMonsterAI {
    constructor(sightRange) {
        this.owner = null;
        this.state = "patrol";
        this.sightRange = sightRange;
        this.patrolTarget = null;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        // choose a random spot open in the map and go there
        if (this.state === "patrol") {
            // compute the FOV to see if the player is sighted
            const fov = new FOV.PreciseShadowcasting(createPassableSightCallback(this.owner));
            fov.compute(
                this.owner.x,
                this.owner.y,
                this.sightRange,
                createVisibilityCallback(this)
            );

            if (this.patrolTarget === null) {
                this.patrolTarget = findEmptySpace(globals.Game.map, globals.Game.gameObjects);
            }

            const { x, y } = getNextStepTowardsTarget(
                this.owner,
                this.patrolTarget.x,
                this.patrolTarget.y
            );
            if (x === null || y === null) {
                this.patrolTarget = null;
                return null;
            }
            return moveCommand(newPositionToDirection(this.owner.x, this.owner.y, x, y), 8);
        // chase the player with A*
        } else if (this.state === "chase") {
            const { x, y } = getNextStepTowardsTarget(
                this.owner,
                globals.Game.player.x,
                globals.Game.player.y
            );
            if (x === null || y === null) {
                return null;
            }

            return moveCommand(newPositionToDirection(this.owner.x, this.owner.y, x, y), 8);
        }
    }
}

/**
 * AI component which stores the previous AI from the owner.
 * Goes in random directions for the specified number of act
 * calls. Then, replaces itself on the owner with the previous
 * AI component on the owner.
 */
class ConfusedAI {
    constructor(currentAI, turns) {
        this.owner = null;
        this.oldAI = currentAI;
        this.turns = turns;
    }

    setOwner(owner) {
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
class ChestAI {
    constructor(bgColor, emptyColor) {
        this.owner = null;
        this.bgColor = bgColor;
        this.emptyColor = emptyColor;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        if (this.owner && this.owner.inventoryComponent) {
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
class DroppedItemAI {
    constructor() {
        this.owner = null;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        if (this.owner && this.owner.inventoryComponent) {
            if (this.owner.inventoryComponent.getItems().length === 0) {
                globals.Game.removeObject(this.owner);
            }
        } else {
            throw new Error("Missing inventoryComponent for DroppedItemAI");
        }
        return null;
    }
}

export { BasicMonsterAI, PatrollingMonsterAI, ConfusedAI, ChestAI, DroppedItemAI };
