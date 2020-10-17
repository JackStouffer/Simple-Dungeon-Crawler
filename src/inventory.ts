import globals from "./globals";
import { ItemData } from "./data";
import { GameObject } from "./object";

export interface InventoryItemDetails {
    id: string;
    displayName: string;
    type: string;
    count: number;
    value?: number;
}

export interface InventoryComponent {
    owner: GameObject;
    setOwner: (owner: GameObject) => void;
    getItems: () => InventoryItemDetails[];
    addItem: (id: string, count?: number) => boolean;
    useItem: (id: string) => void;
    hasItem: (id: string) => boolean;
}

/**
 * Inventory component. Holds items and their counts.
 */
export class BasicInventory implements InventoryComponent {
    owner: GameObject;
    private inventory: Map<string, number>;

    constructor() {
        this.owner = null;
        // Uses the Map in order to make sure the
        // key order is consistent across browsers
        this.inventory = new Map();
    }

    /**
     * Set the reference back to the entity.
     * @param {GameObject} owner The component owner
     * @returns {void}
     */
    setOwner(owner: GameObject) {
        this.owner = owner;
    }

    /**
     * Return an array of items with their id, displayName, and count
     * of the item in the inventory.
     * @returns {Array} An array of objects
     */
    getItems(): InventoryItemDetails[] {
        return [...this.inventory.keys()].map(e => {
            const data = ItemData[e];
            return {
                id: e,
                displayName: data.displayName,
                type: data.type,
                count: this.inventory.get(e),
                value: data.value
            };
        });
    }

    /**
     * Does the inventory contain at least one of the given item.
     * @param {String} id Item ID
     * @returns {Boolean} Has item
     */
    hasItem(id: string): boolean {
        return this.inventory.has(id);
    }

    /**
     * Add an item to the inventory by ID. Can add more than one
     * of the item with the count parameter.
     * @param {String} id Item ID
     * @param {Number} count The number of the item to add
     * @returns {Boolean} If the item was successfully added
     */
    addItem(id: string, count=1): boolean {
        if (!(id in ItemData)) { throw new Error(`${id} is not a valid item id`); }

        if (this.hasItem(id)) {
            const newValue = this.inventory.get(id) + count;

            if (newValue === 100) {
                return false;
            }

            this.inventory.set(id, newValue);
        } else {
            this.inventory.set(id, count);
        }

        if (this.owner === globals.Game.player) {
            globals.gameEventEmitter.emit("tutorial.inventory");

            if (ItemData[id].type === "wild_damage_scroll") {
                globals.gameEventEmitter.emit("tutorial.wildSpells");
            }
        }

        return true;
    }

    /**
     * Use an item by ID, thereby reducing its count in the
     * inventory or removing it from the list of items if the
     * count results in zero.
     * @param {String} id Item ID
     * @returns {void}
     */
    useItem(id: string): void {
        if (!this.hasItem(id)) {
            throw new Error(`Item ${id} not in inventory`);
        }

        this.inventory.set(id, this.inventory.get(id) - 1);

        if (this.inventory.get(id) === 0) {
            this.inventory.delete(id);
        }
    }
}
