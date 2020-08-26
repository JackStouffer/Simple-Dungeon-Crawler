"use strict";

import { DIRS } from "rot-js";

import globals from "./globals";
import { WIDTH, SpellData, ItemData } from "./data";
import { isBlocked } from "./map";
import { showSelectionMenu, showKeyBindingMenu } from "./ui";

/**
    returns true when moved, false otherwise
 */
function moveCommand(actor, direction, topology) {
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

function getItemCommand(actor) {
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

function openInventoryCommand(actor) {
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

function openSpellsCommand(actor) {
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

    act() {
        globals.Game.engine.lock();
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
                globals.Game.manager.act();
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

            const itemDetails = ItemData[inventoryInputMap[keyCode]];
            const useCallback = used => {
                this.owner.ai.state = "normal";
                if (used) {
                    this.owner.inventoryComponent.useItem(inventoryInputMap[keyCode]);
                    globals.Game.displayMessage("Used " + itemDetails.displayName);
                    globals.Game.engine.unlock();
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
                globals.Game.manager.act();
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

            const details = SpellData[spellInputMap[keyCode]];

            if (details.manaCost > this.owner.fighter.mana) {
                globals.Game.displayMessage(`Not enough mana to cast ${details.name}`);
                return;
            }

            const useCallback = used => {
                this.owner.ai.state = "normal";
                if (used) {
                    this.owner.fighter.useMana(details.manaCost);
                    globals.Game.engine.unlock();
                }
            };
            details.useFunc(details, this.owner, useCallback.bind(this));
        } else if (this.state === "keybinding") {
            console.log("fix me");
        }

        window.removeEventListener("keydown", this);
        globals.Game.engine.unlock();
    }
}
export { PlayerControlAI };
