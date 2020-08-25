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
 * Component that calls Game.nextLevel when interacted with
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
            console.error('No level name has been set for load');
            return;
        }
        Game.loadLevel(this.levelName);
    }
}
