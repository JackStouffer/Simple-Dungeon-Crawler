'use strict';

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
        if (this.owner.inventoryComponent) {
            const chestItems = this.owner.inventoryComponent.getIDsAndCounts();
            if (chestItems.length > 0) {
                for (let i = 0; i < chestItems.length; i++) {
                    const item = chestItems[i];
                    Game.displayMessage("Found a " + itemData[item.id].displayName);
                    user.inventoryComponent.addItem(item.id, item.count);
                    this.owner.inventoryComponent.useItem(item.id);
                }
            } else {
                Game.displayMessage("Empty");
            }
        } else {
            console.error("Missing inventoryComponent on ", this.owner);
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
        if (!this.spellId) {
            throw new Error('No spell id given');
        }

        if (!(this.spellId in spellData)) {
            throw new Error(`${this.spellId} is not a valid spell`);
        }

        const res = user.fighter.addSpellById(this.spellId);
        const data = spellData[this.spellId];
        if (res) {
            Game.displayMessage(`You learned a new spell: ${data.name}`);
        } else {
            Game.displayMessage(`You already know ${data.name}`);
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

    interact(user) {
        Game.removeObject(this.owner);
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

    interact(user) {
        if (!this.levelName) {
            throw new Error('No level name has been set for load');
        }
        Game.loadLevel(this.levelName);
    }
}
