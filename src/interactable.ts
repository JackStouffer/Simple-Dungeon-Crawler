import globals from "./globals";
import { ItemData, SpellData } from "./data";
import { displayMessage } from "./ui";
import { GameObject } from "./object";

export interface InteractableComponent {
    owner: GameObject;
    setOwner: (owner: GameObject) => void;
    interact: (user: GameObject) => void;
    setLevel?: (name: string) => void;
    setSpell?: (name: string) => void;
}

/**
 * Component gives all the items in the inventory of the GameObject
 * to the user when interacted with
 */
export class GiveItemsInteractable implements InteractableComponent {
    owner: GameObject;

    constructor() {
        this.owner = null;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
    }

    interact(user: GameObject) {
        if (this.owner.inventoryComponent && user.inventoryComponent) {
            const items = this.owner.inventoryComponent.getItems();
            if (items.length > 0) {
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    displayMessage("Found a " + ItemData[item.id].displayName);
                    user.inventoryComponent.addItem(item.id, item.count);
                    this.owner.inventoryComponent.useItem(item.id);
                }

                if (user === globals.Game.player && this.owner.type === "chest") {
                    globals.gameEventEmitter.emit("chest.open");
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
export class GiveSpellInteractable implements InteractableComponent {
    owner: GameObject;
    spellId: string;

    constructor() {
        this.owner = null;
        this.spellId = null;
    }

    setOwner(owner: GameObject): void {
        this.owner = owner;
    }

    setSpell(id: string): void {
        this.spellId = id;
    }

    interact(user: GameObject): void {
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
export class DoorInteractable implements InteractableComponent {
    owner: GameObject;

    constructor() {
        this.owner = null;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
    }

    interact() {
        globals.gameEventEmitter.emit("door.open");
        globals.Game.removeObject(this.owner);
    }
}

/**
 * Interaction component that calls Game.nextLevel when interacted with
 */
export class LoadLevelInteractable implements InteractableComponent {
    owner: GameObject;
    levelName: string;

    constructor() {
        this.owner = null;
        this.levelName = null;
    }

    setLevel(name: string) {
        this.levelName = name;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
    }

    interact(): void {
        if (!this.levelName) {
            throw new Error("No level name has been set for load");
        }
        globals.Game.loadLevel(this.levelName);

        if (this.owner.type === "load_door") {
            globals.gameEventEmitter.emit("door.open");
        }
    }
}
