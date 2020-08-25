'use strict';

const die = function(target) {
    Game.displayMessage(target.name + " has been killed");
    target.char = '%';
    target.fgcolor = "green";
    target.bgcolor = "darkred";
    target.blocks = false;
    target.fighter = null;
    target.ai = null;
    target.name = 'Remains of a ' + target.name;
    target.statusEffects = [];
};

class BasicEnemy extends GameObject {
    constructor(x, y, char, fgcolor, bgcolor, name, level, blocks=false, fighter=null, ai=null) {
        super(x, y, char, fgcolor, bgcolor, name, blocks, fighter, ai);
        this.level = level;
        this.inventory = [];
    }

    act() {
        super.act();

        if (this.fighter && this.fighter.statusEffects.length > 0) {
            for (let i = 0; i < this.fighter.statusEffects.length; i++) {
                const effect = this.fighter.statusEffects[i];
                effect.act();

                if (effect.turns === 0) {
                    Game.displayMessage(`${this.name} recovered from its ${effect.name}`);
                    this.fighter.statusEffects.splice(i, 1);
                }
            }
        }
    }
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

    act() {
        const passableCallback = function(x, y) {
            // own space is passable
            if (this.owner.x === x && this.owner.y === y) {
                return true;
            }
            return isBlocked(Game.map, Game.game_objects, Game.actors, x, y) === null;
        };

        const passableSightCallback = function(x, y) {
            // own space is passable
            if (this.owner.x === x && this.owner.y === y) {
                return true;
            }
            return isSightBlocked(Game.map, x, y) === false;
        };

        const visibilityCallback = function(x, y, r, visibility) {
            if (x === Game.player.x && y === Game.player.y && visibility > 0) {
                Game.displayMessage(this.owner.name + " saw you");
                this.state = "chase";
            }
        };

        // wander in random directions
        if (this.state === "wander") {
            // compute the FOV to see if the player is sighted
            let fov = new ROT.FOV.PreciseShadowcasting(passableSightCallback.bind(this));
            fov.compute(this.owner.x, this.owner.y, this.sightRange, visibilityCallback.bind(this));
        
            const dir = ROT.DIRS[4][ROT.RNG.getItem([0, 1, 2, 3])];
            const newX = this.owner.x + dir[0];
            const newY = this.owner.y + dir[1];
            const target = isBlocked(Game.map, Game.game_objects, Game.actors, newX, newY);
            
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
                passableCallback.bind(this),
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
            const target = isBlocked(Game.map, Game.game_objects, Game.actors, newX, newY);
            
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
