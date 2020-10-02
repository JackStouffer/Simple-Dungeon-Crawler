"use strict";

import globals from "./globals";
import { ItemData, SpellData } from "./data";
import { displayMessage } from "./ui";

/**
 * Component gives all the items in the inventory of the GameObject
 * to the user when interacted with
 */
class GiveItemsInteractable {
    constructor() {
        this.owner = null;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    interact(user) {
        if (this.owner.inventoryComponent && user.inventoryComponent) {
            const items = this.owner.inventoryComponent.getItems();
            if (items.length > 0) {
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    displayMessage("Found a " + ItemData[item.id].displayName);
                    user.inventoryComponent.addItem(item.id, item.count);
                    this.owner.inventoryComponent.useItem(item.id);
                }
            } else {
                displayMessage("Empty");
            }
        } else {
            throw new Error(`Missing inventoryComponent on ${this.owner} or ${user}`);
        }
    }
}

/**
 * Interaction component that adds a spell to the user's spell list
 */
class GiveSpellInteractable {
    constructor() {
        this.owner = null;
        this.spellId = null;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    setSpell(id) {
        this.spellId = id;
    }

    interact(user) {
        if (!user.fighter) { return; }

        if (!this.spellId) {
            throw new Error("No spell id given");
        }

        if (!(this.spellId in SpellData)) {
            throw new Error(`${this.spellId} is not a valid spell`);
        }

        const res = user.fighter.addSpellById(this.spellId);
        const data = SpellData[this.spellId];
        if (res) {
            displayMessage(`You learned a new spell: ${data.displayName}`);
        } else {
            displayMessage(`You already know ${data.displayName}`);
        }
    }
}

/**
 * Interaction component removes owner to give the appearance of opening
 * when interacting
 */
class DoorInteractable {
    constructor() {
        this.owner = null;
        this.levelName = null;
    }

    setLevel(name) {
        this.levelName = name;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    interact() {
        globals.Game.removeObject(this.owner);
    }
}

/**
 * Interaction component that calls Game.nextLevel when interacted with
 */
class LoadLevelInteractable {
    constructor() {
        this.owner = null;
        this.levelName = null;
    }

    setLevel(name) {
        this.levelName = name;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    interact() {
        if (!this.levelName) {
            throw new Error("No level name has been set for load");
        }
        globals.Game.loadLevel(this.levelName);
    }
}
export { GiveItemsInteractable, GiveSpellInteractable, DoorInteractable, LoadLevelInteractable };
