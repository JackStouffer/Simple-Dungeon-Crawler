import globals from "./globals";
import { ItemType } from "./data";
import { Nullable } from "./util";
import { InventoryComponent } from "./entity";
import { ItemData } from "./skills";

export interface InventoryItemDetails {
    id: string;
    displayName: string;
    type: ItemType;
    count: number;
    value: Nullable<number>;
}

/**
 * Return an array of items with their id, displayName, and count
 * of the item in the inventory.
 * @returns {Array} An array of objects
 */
export function getItems(inventory: InventoryComponent): InventoryItemDetails[] {
    const res: InventoryItemDetails[] = [];
    for (const [k, v] of inventory.inventory) {
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
export function hasItem(inventory: InventoryComponent, id: string): boolean {
    return inventory.inventory.has(id);
}

/**
 * Add an item to the inventory by ID. Can add more than one
 * of the item with the count parameter.
 * @param {string} id Item ID
 * @param {number} count The number of the item to add
 * @returns {boolean} If the item was successfully added
 */
export function addItem(inventory: InventoryComponent, id: string, count: number = 1): boolean {
    if (globals.Game === null) { throw new Error("Global Game object is null"); }
    if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }
    if (!(id in ItemData)) { throw new Error(`${id} is not a valid item id`); }

    if (hasItem(inventory, id)) {
        const newValue = inventory.inventory.get(id)! + count;

        if (newValue === 100) {
            return false;
        }

        inventory.inventory.set(id, newValue);
    } else {
        inventory.inventory.set(id, count);
    }

    if (inventory.entity === globals.Game.player) {
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
export function useItem(inventory: InventoryComponent, id: string): void {
    if (hasItem(inventory, id)) {
        throw new Error(`Item ${id} not in inventory`);
    }

    inventory.inventory.set(id, inventory.inventory.get(id)! - 1);

    if (inventory.inventory.get(id) === 0) {
        inventory.inventory.delete(id);
    }
}
