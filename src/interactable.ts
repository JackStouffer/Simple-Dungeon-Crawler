import globals from "./globals";
import { ItemData, SpellData } from "./data";
import { displayMessage } from "./ui";
import { GameObject } from "./object";
import { Nullable } from "./util";

/**
 * Interactables are any object which does something when
 * the user clicks on it. Examples would be chests, which
 * give items, or switches which open gates, or doors which
 * open.
 */
export interface InteractableComponent {
    owner: Nullable<GameObject>;
    setOwner: (owner: Nullable<GameObject>) => void;
    interact: (user: GameObject) => void;
    setLevel?: (name: string) => void;
    setSpell?: (name: string) => void;
}

/**
 * Component gives all the items in the inventory of the GameObject
 * to the user when interacted with
 */
export class GiveItemsInteractable implements InteractableComponent {
    owner: Nullable<GameObject>;

    constructor() {
        this.owner = null;
    }

    setOwner(owner: Nullable<GameObject>) {
        this.owner = owner;
    }

    interact(user: GameObject) {
        if (globals.Game === null) { throw new Error("Global game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }
        if (this.owner === null) { throw new Error("Can't interact without an owner"); }

        if (this.owner.inventory !== null && user.inventory !== null) {
            const items = this.owner.inventory.getItems();
            if (items.length > 0) {
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    displayMessage("Found a " + ItemData[item.id].displayName);
                    user.inventory.addItem(item.id, item.count);
                    this.owner.inventory.useItem(item.id);
                }

                if (user === globals.Game.player && this.owner.type === "chest") {
                    globals.gameEventEmitter.emit("chest.open");
                }
            } else {
                displayMessage("Empty");
            }
        } else {
            throw new Error(`Missing inventory on ${this.owner.name} or ${user.name}`);
        }
    }
}

/**
 * Interaction component that adds a spell to the user's spell list
 */
export class GiveSpellInteractable implements InteractableComponent {
    owner: Nullable<GameObject>;
    spellId: string;

    constructor() {
        this.owner = null;
        this.spellId = "";
    }

    setOwner(owner: Nullable<GameObject>): void {
        this.owner = owner;
    }

    setSpell(id: string): void {
        this.spellId = id;
    }

    interact(user: GameObject): void {
        if (user.fighter === null) { return; }

        if (this.spellId === null) {
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
    owner: Nullable<GameObject>;

    constructor() {
        this.owner = null;
    }

    setOwner(owner: Nullable<GameObject>) {
        this.owner = owner;
    }

    interact() {
        if (globals.Game === null) { throw new Error("Global game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }
        if (this.owner === null) { throw new Error("Can't interact without an owner"); }

        globals.gameEventEmitter.emit("door.open");
        globals.Game.removeObject(this.owner);
    }
}

/**
 * Interaction component that calls Game.nextLevel when interacted with
 */
export class LoadLevelInteractable implements InteractableComponent {
    owner: Nullable<GameObject>;
    levelName: string;

    constructor() {
        this.owner = null;
        this.levelName = "";
    }

    setLevel(name: string) {
        this.levelName = name;
    }

    setOwner(owner: Nullable<GameObject>) {
        this.owner = owner;
    }

    interact(): void {
        if (globals.Game === null) { throw new Error("Global game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }
        if (this.owner === null) { throw new Error("Can't interact without an owner"); }

        if (this.levelName === null) {
            throw new Error("No level name has been set for load");
        }
        globals.Game.loadLevel(this.levelName);

        if (this.owner.type === "load_door") {
            globals.gameEventEmitter.emit("door.open");
        }
    }
}
