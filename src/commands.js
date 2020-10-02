"use strict";

import { DIRS } from "rot-js";

import globals from "./globals";
import { SpellData, ItemData, GameState } from "./data";
import { isBlocked } from "./map";
import { displayMessage } from "./ui";

/**
 * Create a move function for a specified GameObject. The function
 * checks if the moved to space contains a blocking object or tile.
 * If there is a blocking tile, it will not move, if it contains a
 * blocking object, it first tries to interact, and the attack.
 *
 * @param {GameObject} actor The game object to manipulate
 * @param {Number} direction A clock-wise direction to move in
 * @param {Number} topology Either four directions or eight
 * @returns {Function} A function to move the game object, it returns true when moved, false otherwise
 */
export function moveCommand(direction, topology) {
    return function(actor) {
        const dir = DIRS[topology][direction];
        const newX = actor.x + dir[0];
        const newY = actor.y + dir[1];
        const { object, blocks } = isBlocked(globals.Game.map, globals.Game.gameObjects, newX, newY);

        if (object) {
            if (object.interactable) {
                object.interactable.interact(actor);
                return true;
            }

            if (object.fighter) {
                actor.fighter.attack(object);
                return true;
            }
        }

        if (blocks === true) {
            return false;
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
export function getItemCommand() {
    return function(actor) {
        const items = globals.Game.gameObjects.filter(item => {
            return item.type === "dropped_item" && item.x === actor.x && item.y === actor.y;
        });

        if (items.length > 0) {
            items[0].interactable.interact(actor);
            return true;
        }

        displayMessage("There's no item to pick up");
        return false;
    };
}

/**
 * Generates a function to put the game into the inventory_menu state.
 * @return {Function} A function which always returns false
 */
export function openInventoryCommand() {
    return function() {
        globals.Game.state = GameState.inventoryMenu;
        return false;
    };
}

/**
 * Generate a function which puts the game into spell_menu state.
 * @returns {Function} A function which always returns false
 */
export function openSpellsCommand() {
    return function() {
        globals.Game.state = GameState.spellMenu;
        return false;
    };
}

/**
 * Create a command function to use an item in the object's inventory
 * and call its use function.
 * @param {String} itemID The id of the item to use
 * @returns {Function} A command function which takes an object as a param
 */
export function useItemCommand(itemID) {
    return async function (actor) {
        if (!actor.inventoryComponent.hasItem(itemID)) { return false; }

        const itemDetails = ItemData[itemID];
        const used = await itemDetails.useFunc(itemDetails, actor);

        if (used) {
            actor.inventoryComponent.useItem(itemID);
            return true;
        }

        return false;
    };
}

/**
 * Create a command function to cast a spell in the known spells
 * and call its use function.
 * @param {String} spellID The id of the spell to use
 * @returns {Function} A command function which takes an object as a param
 */
export function useSpellCommand(spellID) {
    return async function (actor) {
        if (!actor.fighter.hasSpell(spellID)) { return false; }

        const details = SpellData[spellID];
        const stats = actor.fighter.getEffectiveStats();
        if (details.manaCost > stats.mana) {
            return false;
        }

        const used = await details.useFunc(details, actor);
        if (used) {
            actor.fighter.useMana(details.manaCost);
            return true;
        }

        return false;
    };
}
