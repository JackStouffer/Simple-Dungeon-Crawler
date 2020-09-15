"use strict";

import { DIRS } from "rot-js";

import globals from "./globals";
import { WIDTH, SpellData, ItemData } from "./data";
import { isBlocked } from "./map";
import { showSelectionMenu, showKeyBindingMenu } from "./ui";
import { readKey } from "./util";

/**
 * Create a move function for a specified GameObject. The funciton
 * checks if the moved to space contains a blocking object or tile.
 * If there is a blocking tile, it will not move, if it contains a
 * blocking object, it first tries to interact, and the attack.
 *
 * @param {GameObject} actor The game object to manipulate
 * @param {Number} direction A clock-wise direction to move in
 * @param {Number} topology Either four directions or eight
 * @returns {Function} A function to move the game object, it returns true when moved, false otherwise
 */
export function moveCommand(actor, direction, topology) {
    return function() {
        const dir = DIRS[topology][direction];
        const newX = actor.x + dir[0];
        const newY = actor.y + dir[1];
        const target = isBlocked(globals.Game.map, globals.Game.gameObjects, newX, newY);

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
}

/**
 * Generates a function which checks the actor's tile to see if there
 * is an object with an id of dropped_item. If there is, interact with
 * the game object. If not, do nothing but display a message.
 *
 * @param {GameObject} actor The game object to manipulate
 * @returns {Function} A function which returns true if an object was picked up, false otherwise
 */
export function getItemCommand(actor) {
    return function() {
        const items = globals.Game.gameObjects.filter(item => {
            return item.type === "dropped_item" && item.x === actor.x && item.y === actor.y;
        });

        if (items.length > 0) {
            items[0].interactable.interact(actor);
            return true;
        }

        globals.Game.displayMessage("There's no item to pick up");
        return false;
    };
}

/**
 * Generates a function to put the actor into inventory state and show
 * the inventory selection menu.
 * @param {GameObject} actor The game object to put into inventory state
 * @return {Function} A function which always returns false
 */
export function openInventoryCommand(actor) {
    return function() {
        showSelectionMenu(
            "Player Inventory",
            actor.inventoryComponent.getNamesAndCounts(),
            "inventory",
            WIDTH
        );
        actor.ai.state = "inventory";
        return false;
    };
}

/**
 * Generate a funciton which puts the object ai into spell_selection state
 * and shows the spell selection menu.
 * @param {GameObject} actor The game object to put into spell_selection state
 * @returns {Function} A function which always returns false
 */
export function openSpellsCommand(actor) {
    return function() {
        showSelectionMenu(
            "Spells",
            actor.fighter.getKnownSpells().map(e => SpellData[e]),
            "spells",
            WIDTH
        );
        actor.ai.state = "spell_selection";
        return false;
    };
}

/**
 * Generate a funciton which puts the object ai into keybinding state
 * and shows the keybinding menu.
 * @param {GameObject} actor The game object to put into keybinding state
 * @returns {Function} A function which always returns false
 */
function openKeyBindingCommand(actor) {
    return function() {
        showKeyBindingMenu();
        actor.ai.state = "keybinding";
        return false;
    };
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

    async act() {
        let acted;
        do {
            acted = await this.handleInput();
        } while (!acted);
    }

    async handleInput() {
        if (this.owner.fighter === null || this.owner.fighter.hp <= 0) { return; }

        let e, key, keyCode;
        const aCode = "a".charCodeAt(0);
        const zCode = "z".charCodeAt(0);

        if (this.state === "normal") {
            do {
                e = await readKey();
                key = e.key;
            } while (!(key in this.keyCommandMap));

            return this.keyCommandMap[key][1]();
        } else if (this.state === "inventory") {
            do {
                e = await readKey();
                key = e.key;
                keyCode = key.charCodeAt(0);
            } while (key !== "Escape" && (keyCode < aCode && keyCode > zCode));

            if (key === "Escape") {
                this.state = "normal";
                globals.Game.drawAll();
                return false;
            }

            const inventoryInputMap = {};
            const inventoryIDs = this.owner.inventoryComponent.getIDsAndCounts();

            for (let i = 0; i < inventoryIDs.length; i++) {
                inventoryInputMap[aCode + i] = inventoryIDs[i].id;
            }

            if (!(keyCode in inventoryInputMap)) {
                return false;
            }

            const itemDetails = ItemData[inventoryInputMap[keyCode]];
            const used = await itemDetails.useFunc(itemDetails, this.owner);

            this.owner.ai.state = "normal";
            if (used) {
                this.owner.inventoryComponent.useItem(inventoryInputMap[keyCode]);
                globals.Game.displayMessage("Used " + itemDetails.displayName);
                return true;
            }

            return false;
        } else if (this.state === "spell_selection") {
            do {
                e = await readKey();
                key = e.key;
                keyCode = key.charCodeAt(0);
            } while (key !== "Escape" && (keyCode < aCode && keyCode > zCode));

            if (key === "Escape") {
                this.state = "normal";
                globals.Game.drawAll();
                return false;
            }

            const spellInputMap = {};
            const spellIds = this.owner.fighter.getKnownSpells();

            for (let i = 0; i < spellIds.length; i++) {
                spellInputMap[aCode + i] = spellIds[i];
            }

            if (!(keyCode in spellInputMap)) {
                return false;
            }

            const details = SpellData[spellInputMap[keyCode]];

            if (details.manaCost > this.owner.fighter.mana) {
                globals.Game.displayMessage(`Not enough mana to cast ${details.name}`);
                return false;
            }

            const used = await details.useFunc(details, this.owner);
            this.owner.ai.state = "normal";
            if (used) {
                this.owner.fighter.useMana(details.manaCost);
                return true;
            }
            return false;
        } else if (this.state === "keybinding") {
            throw new Error("fix me");
        }
    }
}
export { PlayerControlAI };
