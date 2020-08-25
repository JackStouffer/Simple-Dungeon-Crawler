'use strict';

/**
    returns true when moved, false otherwise
 */
const moveCommand = function(actor, direction, topology) {
    return function() {
        /* is there a free space? */
        const dir = ROT.DIRS[topology][direction];
        const newX = actor.x + dir[0];
        const newY = actor.y + dir[1];
        const target = isBlocked(Game.map, Game.game_objects, Game.actors, newX, newY);

        if (target === true) {
            return false;
        }

        if (target && target.fighter) {
            actor.fighter.attack(target);
            return true;
        }
        
        if (target && target.interact) {
            target.interact();
            return true;
        }

        actor.x = newX;
        actor.y = newY;
        return true;
    };
};

const openInventoryCommand = function(actor) {
    return function() {
        showSelectionMenu("Player Inventory", actor.inventory.map(i => i.name), WIDTH);
        actor.ai.state = "inventory";
        return false;
    }
};

const openKeyBindingCommand = function(actor) {
    return function() {
        showKeyBindingMenu();
        actor.ai.state = "keybinding";
        return false;
    }
};

const killPlayer = function(target) {
    target.fighter = null;
    target.ai = null;
};

/**
 * Special game object to denote the player character with an inventory,
 * level, and experience
 */
class Player extends GameObject {
    inventory = [];
    gold = 0;
    level = 1;
    experience = 0;

    act() {
        super.act();

        if (this.fighter && this.fighter.statusEffects.length > 0) {
            for (let i = 0; i < this.fighter.statusEffects.length; i++) {
                const effect = this.fighter.statusEffects[i];
                effect.act();

                if (effect.turns === 0) {
                    this.fighter.statusEffects.splice(i, 1);
                }
            }
        }
    }

    destroy () {
        this.fighter = null;
        this.ai = null;
        window.removeEventListener("keydown", this.ai);
    }
}

/**
 * Controls the player character through user input
 * 
 * While it would probably make sense to move input handling code
 * to the Game object since it modifies game state, but putting
 * in an AI component made the code cleaner
 */
class PlayerControlAI {
    constructor() {
        this.owner = null;
        this.state = "normal";
    }

    act() {
        Game.engine.lock();
        /* wait for user input; do stuff when user hits a key */
        window.addEventListener("keydown", this);
    }

    handleEvent(e) {
        e.preventDefault();

        if (this.owner.fighter === null || this.owner.fighter.hp <= 0) { return; }

        const key = e.key;

        if (this.state === "normal") {
            /* one of numpad directions? */
            if (!(key in keyCommandMap)) {
                return;
            }

            const acted = keyCommandMap[key][1]();

            if (!acted) {
                return;
            }
        } else if (this.state === "inventory") {
            const aCode = "a".charCodeAt(0);
            const zCode = "z".charCodeAt(0);
            const keyCode = key.charCodeAt(0);

            if (keyCode < aCode && keyCode > zCode) {
                return;
            }

            if (key === "Escape") {
                Game.manager.act();
                this.state = "normal";
                return;
            }

            let index = keyCode - aCode;

            if (index >= this.owner.inventory.length) {
                return;
            }

            const item = this.owner.inventory[index];
            item.use(this.owner, used => {
                Game.player.ai.state = "normal";
                if (used) {
                    this.owner.inventory.splice(index, 1);
                    Game.displayMessage("Used " + item.name);
                    Game.engine.unlock();
                }
            });
            return;
        } else if (this.state === "keybinding") {
            console.log("fix me");
        }

        Game.engine.unlock();
    }
}
