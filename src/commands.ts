import { DIRS } from "./rot/index";

import globals from "./globals";
import { SpellData, ItemData, GameState } from "./data";
import { isBlocked } from "./map";
import { displayMessage } from "./ui";
import { GameObject } from "./object";

export type Command = (actor: GameObject) => boolean;

/**
 * Command that does nothing. Useful for passing a turn
 */
export function noOpCommand() {
    return function (): boolean {
        return true;
    };
}

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
export function moveCommand(direction: number, topology: number): Command {
    return function(actor: GameObject): boolean {
        const dir: number[] = DIRS[topology][direction];
        const newX: number = actor.x + dir[0];
        const newY: number = actor.y + dir[1];
        const { object, blocks } = isBlocked(
            globals.Game.map,
            globals.Game.gameObjects,
            newX,
            newY
        );

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
export function getItemCommand(): Command {
    return function(actor): boolean {
        const items = globals.Game.gameObjects.filter((item: GameObject) => {
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
export function openInventoryCommand(): Command {
    return function(): boolean {
        globals.gameEventEmitter.emit("ui.openInventory");
        globals.Game.state = GameState.InventoryMenu;
        return false;
    };
}

/**
 * Generate a function which puts the game into spell_menu state.
 * @returns {Function} A function which always returns false
 */
export function openSpellsCommand(): Command {
    return function(): boolean {
        globals.gameEventEmitter.emit("ui.openSpells");
        globals.Game.state = GameState.SpellMenu;
        return false;
    };
}

/**
 * Create a command function to use an item in the object's inventory
 * and call its use function.
 * @param {String} itemID The id of the item to use
 * @returns {Function} A command function which takes an object as a param
 */
export function useItemCommand(itemID: string, target: GameObject = null): Command {
    return function (actor: GameObject): boolean {
        if (!actor.inventory.hasItem(itemID)) { return false; }

        const itemDetails = ItemData[itemID];
        const used = itemDetails.useFunc(itemDetails, actor, target);

        if (used) {
            actor.inventory.useItem(itemID);
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
export function useSpellCommand(spellID: string, target?: GameObject): Command {
    return function (actor: GameObject): boolean {
        if (!actor.fighter.hasSpell(spellID)) { return false; }

        const details = SpellData[spellID];
        const stats = actor.fighter.getEffectiveStats();
        if (details.manaCost > stats.mana) {
            return false;
        }

        const used = details.useFunc(details, actor, target);
        if (used) {
            actor.fighter.useMana(details.manaCost);
            return true;
        }

        return false;
    };
}
