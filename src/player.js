'use strict';

/**
    returns true when moved, false otherwise
 */
const moveCommand = function(actor, direction, topology) {
    return function() {
        const dir = ROT.DIRS[topology][direction];
        const newX = actor.x + dir[0];
        const newY = actor.y + dir[1];
        const target = isBlocked(Game.map, Game.gameObjects, newX, newY);

        if (target === true) {
            return false;
        }

        if (target) {
            if (target.interactable) {
                target.interactable.interact(actor);
                return true;
            }

            if (target.fighter) {
                actor.fighter.attack(target);
                return true;
            }
        }

        actor.x = newX;
        actor.y = newY;
        return true;
    };
};

const getItemCommand = function(actor) {
    return function() {
        const items = Game.gameObjects.filter(item => {
            return item.type === "dropped_item" && item.x === actor.x && item.y === actor.y;
        });

        if (items.length > 0) {
            items[0].interactable.interact(actor);
            return true;
        }

        Game.displayMessage("There's no item to pick up");
        return false;
    };
};

const openInventoryCommand = function(actor) {
    return function() {
        showSelectionMenu(
            "Player Inventory",
            actor.inventoryComponent.getNamesAndCounts(),
            'inventory',
            WIDTH
        );
        actor.ai.state = "inventory";
        return false;
    };
};

const openSpellsCommand = function(actor) {
    return function() {
        showSelectionMenu(
            "Spells",
            actor.fighter.getKnownSpells().map(e => spellData[e]),
            'spells',
            WIDTH
        );
        actor.ai.state = "spell_selection";
        return false;
    };
};

const openKeyBindingCommand = function(actor) {
    return function() {
        showKeyBindingMenu();
        actor.ai.state = "keybinding";
        return false;
    };
};

const killPlayer = function(target) {
    target.fighter = null;
    target.ai = null;
    target.inventoryComponent = null;
};

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
        this.keyCommandMap = {};
        this.state = "normal";
    }

    setOwner(owner) {
        this.owner = owner;
        this.keyCommandMap = {
            "w": ["Move Up", moveCommand(this.owner, 0, 8)],
            "e": ["Move Up Right", moveCommand(this.owner, 1, 8)],
            "d": ["Move Right", moveCommand(this.owner, 2, 8)],
            "c": ["Move Down Right", moveCommand(this.owner, 3, 8)],
            "s": ["Move Down", moveCommand(this.owner, 4, 8)],
            "z": ["Move Down Left", moveCommand(this.owner, 5, 8)],
            "a": ["Move Left", moveCommand(this.owner, 6, 8)],
            "q": ["Move Up Left", moveCommand(this.owner, 7, 8)],
            "i": ["Inventory", openInventoryCommand(this.owner)],
            "g": ["Get Item", getItemCommand(this.owner)],
            "m": ["Spells", openSpellsCommand(this.owner)],
            "Escape": ["Key Bindings", openKeyBindingCommand(this.owner)]
        };
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
            if (!(key in this.keyCommandMap)) {
                return;
            }

            const acted = this.keyCommandMap[key][1]();

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
                this.state = "normal";
                Game.manager.act();
                return;
            }

            const inventoryInputMap = {};
            const inventoryIDs = this.owner.inventoryComponent.getIDsAndCounts();

            for (let i = 0; i < inventoryIDs.length; i++) {
                inventoryInputMap[aCode + i] = inventoryIDs[i].id;
            }

            if (!(keyCode in inventoryInputMap)) {
                return;
            }

            const itemDetails = itemData[inventoryInputMap[keyCode]];
            const useCallback = used => {
                this.owner.ai.state = "normal";
                if (used) {
                    this.owner.inventoryComponent.useItem(inventoryInputMap[keyCode]);
                    Game.displayMessage("Used " + itemDetails.displayName);
                    Game.engine.unlock();
                }
            };
            itemDetails.useFunc(itemDetails, this.owner, useCallback.bind(this));
            return;
        } else if (this.state === "spell_selection") {
            const aCode = "a".charCodeAt(0);
            const zCode = "z".charCodeAt(0);
            const keyCode = key.charCodeAt(0);

            if (keyCode < aCode && keyCode > zCode) {
                return;
            }

            if (key === "Escape") {
                this.state = "normal";
                Game.manager.act();
                return;
            }

            const spellInputMap = {};
            const spellIds = this.owner.fighter.getKnownSpells();

            for (let i = 0; i < spellIds.length; i++) {
                spellInputMap[aCode + i] = spellIds[i];
            }

            if (!(keyCode in spellInputMap)) {
                return;
            }

            const details = spellData[spellInputMap[keyCode]];

            if (details.manaCost > this.owner.fighter.mana) {
                Game.displayMessage(`Not enough mana to cast ${details.name}`);
                return;
            }

            const useCallback = used => {
                this.owner.ai.state = "normal";
                if (used) {
                    this.owner.fighter.useMana(details.manaCost);
                    Game.engine.unlock();
                }
            };
            details.useFunc(details, this.owner, useCallback.bind(this));
        } else if (this.state === "keybinding") {
            console.log("fix me");
        }

        window.removeEventListener("keydown", this);
        Game.engine.unlock();
    }
}
