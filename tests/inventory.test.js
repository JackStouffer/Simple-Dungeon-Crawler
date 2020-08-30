/* global describe, it */

import { expect } from "chai";
import { BasicInventory } from "../src/inventory";

describe("inventory", function () {
    describe("BasicInventory", function () {
        it("should add a new item to the inventory", function () {
            const inventory = new BasicInventory();
            inventory.addItem("item");
            expect(inventory.hasItem("item")).to.be.true;
        });

        it("should return item ids and counts from getIDsAndCounts", function () {
            const inventory = new BasicInventory();
            inventory.addItem("item");
            inventory.addItem("other");
            expect(inventory.getIDsAndCounts()).to.be.deep.equal([
                {"id": "item", "count": 1},
                {"id": "other", "count": 1}
            ]);
        });

        it("should allow adding multiple items", function () {
            const inventory = new BasicInventory();
            inventory.addItem("item", 5);
            expect(inventory.getIDsAndCounts()).to.be.deep.equal([{"id": "item", "count": 5}]);
        });

        it("should reduce an item's count with useItem", function () {
            const inventory = new BasicInventory();
            inventory.addItem("item", 5);
            inventory.useItem("item");
            expect(inventory.getIDsAndCounts()).to.be.deep.equal([{"id": "item", "count": 4}]);
        });

        it("should remove an item when item count reaches zero", function () {
            const inventory = new BasicInventory();
            inventory.addItem("item");
            expect(inventory.getIDsAndCounts()).to.be.deep.equal([{"id": "item", "count": 1}]);
            inventory.useItem("item");
            expect(inventory.getIDsAndCounts()).to.be.deep.equal([]);
        });

        it("should return item names and counts from getNamesAndCounts", function () {
            const inventory = new BasicInventory();
            inventory.addItem("health_potion", 5);
            expect(inventory.getNamesAndCounts()).to.be.deep.equal([{"name": "Health Potion", "count": 5}]);
        });
    });
});
