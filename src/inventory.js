"use strict";

import { ItemData } from "./data";

class BasicInventory {
    constructor() {
        this.owner = null;

        // A class implementation without private data members?
        // Can JS do anything right?
        this._inventory = {};
    }

    setOwner(owner) {
        this.owner = owner;
    }

    // This implementation relies on JS now having a set ordering to
    // keys in objects when using ownKeys. Not a perfect solution since
    // it's not obvious what's going on.
    getIDsAndCounts() {
        const orderedKeys = Reflect.ownKeys(this._inventory);
        return orderedKeys.map(e => { return { id: e, count: this._inventory[e] }; });
    }

    getNamesAndCounts() {
        const orderedKeys = Reflect.ownKeys(this._inventory);
        return orderedKeys.map(e => { return { name: ItemData[e].displayName, count: this._inventory[e] }; });
    }

    hasItem(id) {
        return id in this._inventory;
    }

    addItem(id, count=1) {
        if (id in this._inventory) {
            const newValue = this._inventory[id] + count;

            if (newValue === 100) {
                return false;
            }

            this._inventory[id] = newValue;
        } else {
            this._inventory[id] = count;
        }
        return true;
    }

    useItem(id) {
        if (!(id in this._inventory)) {
            throw new Error(`Item ${id} not in inventory`);
        }

        this._inventory[id]--;

        if (this._inventory[id] === 0) {
            delete this._inventory[id];
        }
    }
}
export { BasicInventory };
