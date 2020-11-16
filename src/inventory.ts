import globals from "./globals";
import { ItemData, ItemType } from "./data";
import { GameObject } from "./object";
import { Nullable } from "./util";

export interface InventoryItemDetails {
    id: string;
    displayName: string;
    type: ItemType;
    count: number;
    value: Nullable<number>;
}

export interface InventoryComponent {
    owner: Nullable<GameObject>;

    getItems: () => InventoryItemDetails[];
    addItem: (id: string, count?: number) => boolean;
    useItem: (id: string) => void;
    hasItem: (id: string) => boolean;
}

/**
 * Inventory component. Holds items and their counts.
 */
export class BasicInventory implements InventoryComponent {
    owner: Nullable<GameObject>;
    private readonly inventory: Map<string, number>;

    constructor() {
        this.owner = null;
        // Uses the Map in order to make sure the
        // key order is consistent across browsers
        this.inventory = new Map();
    }

    /**
     * Return an array of items with their id, displayName, and count
     * of the item in the inventory.
     * @returns {Array} An array of objects
     */
    getItems(): InventoryItemDetails[] {
        const res: InventoryItemDetails[] = [];
        for (const [k, v] of this.inventory) {
            const data = ItemData[k];
            res.push({
                id: k,
                displayName: data.displayName,
                type: data.type,
                count: v,
                value: data.value
            });
        }
        return res;
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
     * @param {string} id Item ID
     * @param {number} count The number of the item to add
     * @returns {boolean} If the item was successfully added
     */
    addItem(id: string, count: number = 1): boolean {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }
        if (this.owner === null) { throw new Error("Tried to add an item on a ownerless inventory"); }
        if (!(id in ItemData)) { throw new Error(`${id} is not a valid item id`); }

        if (this.hasItem(id)) {
            const newValue = this.inventory.get(id)! + count;

            if (newValue === 100) {
                return false;
            }

            this.inventory.set(id, newValue);
        } else {
            this.inventory.set(id, count);
        }

        if (this.owner === globals.Game.player) {
            globals.gameEventEmitter.emit("tutorial.inventory");

            if (ItemData[id].type === ItemType.WildDamageScroll) {
                globals.gameEventEmitter.emit("tutorial.wildSpells");
            }
        }

        return true;
    }

    /**
     * Use an item by ID, thereby reducing its count in the
     * inventory or removing it from the list of items if the
     * count results in zero.
     * @param {string} id Item ID
     * @returns {void}
     */
    useItem(id: string): void {
        if (!this.hasItem(id)) {
            throw new Error(`Item ${id} not in inventory`);
        }

        this.inventory.set(id, this.inventory.get(id)! - 1);

        if (this.inventory.get(id) === 0) {
            this.inventory.delete(id);
        }
    }
}
