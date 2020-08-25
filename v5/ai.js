'use strict';

const createPassableCallback = function (owner) {
    return function(x, y) {
        // own space is passable
        if (owner.x === x && owner.y === y) {
            return true;
        }
        return isBlocked(Game.map, Game.gameObjects, x, y) === null;
    };
};

const createPassableSightCallback = function (owner) {
    return function(x, y) {
        // own space is passable
        if (owner.x === x && owner.y === y) {
            return true;
        }
        return isSightBlocked(Game.map, x, y) === false;
    };
}

const createVisibilityCallback = function (ai) {
    return function(x, y, r, visibility) {
        if (x === Game.player.x && y === Game.player.y && visibility > 0) {
            Game.displayMessage(ai.owner.name + " saw you");
            ai.state = "chase";
        }
    };
}

/**
 * Basic monster behavior with two states, chase and wander
 *
 * Definable sight range
 * 
 * Attacks the target when it's within one tile from it
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
            let fov = new ROT.FOV.PreciseShadowcasting(createPassableSightCallback(this.owner));
            fov.compute(this.owner.x, this.owner.y, this.sightRange, createVisibilityCallback(this));

            const dir = ROT.DIRS[4][ROT.RNG.getItem([0, 1, 2, 3])];
            const newX = this.owner.x + dir[0];
            const newY = this.owner.y + dir[1];
            const target = isBlocked(Game.map, Game.gameObjects, newX, newY);
            
            if (target !== null) {
                return;
            }
            
            this.owner.x = newX;
            this.owner.y = newY;
        // chase the player with A*
        } else if (this.state === "chase") {
            let x = Game.player.x;
            let y = Game.player.y;
            let astar = new ROT.Path.AStar(
                x,
                y,
                createPassableCallback(this.owner),
                {topology: 4}
            );

            let path = [];
            let pathCallback = function(x, y) {
                path.push([x, y]);
            }
            astar.compute(this.owner.x, this.owner.y, pathCallback);

            // remove our own position
            path.shift();
            if (path.length == 1) {
                this.owner.fighter.attack(Game.player);
            } else {
                if (path.length === 0) {
                    return;
                }

                x = path[0][0];
                y = path[0][1];
                this.owner.x = x;
                this.owner.y = y;
            }
        }
    }
}

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
            let fov = new ROT.FOV.PreciseShadowcasting(createPassableSightCallback(this.owner));
            fov.compute(this.owner.x, this.owner.y, this.sightRange, createVisibilityCallback(this));

            if (this.patrolTarget === null) {
                this.patrolTarget = findEmptySpace(Game.map, Game.gameObjects);
            }

            const astar = new ROT.Path.AStar(
                this.patrolTarget.x,
                this.patrolTarget.y,
                createPassableCallback(this.owner),
                { topology: 8 }
            );

            let path = [];
            const pathCallback = function(x, y) {
                path.push([x, y]);
            }
            astar.compute(this.owner.x, this.owner.y, pathCallback);

            path.shift();

            if (path.length === 0) {
                this.patrolTarget = null;
                return;
            }

            this.owner.x = path[0][0];
            this.owner.y = path[0][1];
        // chase the player with A*
        } else if (this.state === "chase") {
            const astar = new ROT.Path.AStar(
                Game.player.x,
                Game.player.y,
                createPassableSightCallback(this.owner),
                { topology: 8 }
            );

            let path = [];
            let pathCallback = function(x, y) {
                path.push([x, y]);
            }
            astar.compute(this.owner.x, this.owner.y, pathCallback);

            // remove our own position
            path.shift();
            if (path.length == 1) {
                this.owner.fighter.attack(Game.player);
            } else {
                if (path.length === 0) {
                    return;
                }

                this.owner.x = path[0][0];
                this.owner.y = path[0][1];
            }
        }
    }
}

class ConfusedAI {
    constructor(currentAI, turns) {
        this.owner = null;
        this.oldAI = currentAI;
        this.turns = turns;
    }

    act() {
        if (this.turns > 0) {
            const dir = ROT.DIRS[4][ROT.RNG.getItem([0, 1, 2, 3])];
            const newX = this.owner.x + dir[0];
            const newY = this.owner.y + dir[1];
            const target = isBlocked(Game.map, Game.gameObjects, newX, newY);
            
            if (target !== null) {
                return;
            }
            
            this.owner.x = newX;
            this.owner.y = newY;
        } else {
            if (this.owner === Game.player) {
                Game.displayMessage("You are no longer confused");
            } else {
                Game.displayMessage(this.owner.name + " is no longer confused");
            }

            this.owner.ai = this.oldAI;
        }
        this.turns--;
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
            if (this.owner.inventoryComponent.getIDsAndCounts().length === 0) {
                this.owner.graphics.bgColor = this.emptyColor;
            } else {
                this.owner.graphics.bgColor = this.bgColor;
            }
        } else {
            console.error("Missing inventoryComponent for ChestAI");
        }
    }
}

/**
 * AI which removes the owner from the game when the inventory is empty
 */
class DroppedItemAI {
    constructor(bgColor, emptyColor) {
        this.owner = null;
        this.bgColor = bgColor;
        this.emptyColor = emptyColor;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        console.log(this.owner.inventoryComponent.getIDsAndCounts());
        if (this.owner && this.owner.inventoryComponent) {
            if (this.owner.inventoryComponent.getIDsAndCounts().length === 0) {
                Game.removeObject(this.owner);
            }
        } else {
            console.error("Missing inventoryComponent for DroppedItemAI");
        }
    }
}
