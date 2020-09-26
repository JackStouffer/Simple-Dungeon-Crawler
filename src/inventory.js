"use strict";

import { ItemData } from "./data";

/**
 * Inventory component. Holds items and their counts.
 */
class BasicInventory {
    constructor() {
        this.owner = null;
        // Uses the Map in order to make sure the
        // key order is consistent across browsers
        this._inventory = new Map();
    }

    /**
     * Set the reference back to the entity.
     * @param {GameObject} owner The component owner
     * @returns {void}
     */
    setOwner(owner) {
        this.owner = owner;
    }

    /**
     * Return an array of items with their id, displayName, and count
     * of the item in the inventory.
     * @returns {Array} An array of objects
     */
    getItems() {
        return [...this._inventory.keys()].map(e => {
            return { id: e, displayName: ItemData[e].displayName, count: this._inventory.get(e) };
        });
    }

    /**
     * Does the inventory contain at least one of the given item.
     * @param {String} id Item ID
     * @returns {Boolean} Has item
     */
    hasItem(id) {
        return this._inventory.has(id);
    }

    /**
     * Add an item to the inventory by ID. Can add more than one
     * of the item with the count parameter.
     * @param {String} id Item ID
     * @param {Number} count The number of the item to add
     * @returns {Boolean} If the item was successfully added
     */
    addItem(id, count=1) {
        if (this.hasItem(id)) {
            const newValue = this._inventory.get(id) + count;

            if (newValue === 100) {
                return false;
            }

            this._inventory.set(id, newValue);
        } else {
            this._inventory.set(id, count);
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
    useItem(id) {
        if (!this.hasItem(id)) {
            throw new Error(`Item ${id} not in inventory`);
        }

        this._inventory.set(id, this._inventory.get(id) - 1);

        if (this._inventory.get(id) === 0) {
            this._inventory.delete(id);
        }
    }
}
export { BasicInventory };
