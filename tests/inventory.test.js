/* global describe, it */

import { expect } from "chai";
import { BasicInventory } from "../src/inventory";
import { ItemData } from "../src/data";

describe("inventory", function () {
    describe("BasicInventory", function () {
        it("should add a new item to the inventory", function () {
            const inventory = new BasicInventory();
            inventory.addItem("item");
            expect(inventory.hasItem("item")).to.be.true;
        });

        it("should return item ids and counts from getIDsAndCounts", function () {
            ItemData["item"] = {
                displayName: "Test Item",
                type: "test"
            };
            ItemData["other"] = {
                displayName: "Other Item",
                type: "test"
            };

            const inventory = new BasicInventory();
            inventory.addItem("item");
            inventory.addItem("other");
            expect(inventory.getItems()).to.be.deep.equal([
                { "id": "item", "count": 1, "displayName": "Test Item", "type": "test" },
                { "id": "other", "count": 1, "displayName": "Other Item", "type": "test" }
            ]);
        });

        it("should allow adding multiple items", function () {
            ItemData["item"] = {
                displayName: "Test Item",
                type: "test"
            };

            const inventory = new BasicInventory();
            inventory.addItem("item", 5);
            expect(inventory.getItems()).to.be.deep.equal([{
                "id": "item",
                "count": 5,
                "displayName": "Test Item",
                "type": "test"
            }]);
        });

        it("should reduce an item's count with useItem", function () {
            ItemData["item"] = {
                displayName: "Test Item",
                type: "test"
            };

            const inventory = new BasicInventory();
            inventory.addItem("item", 5);
            inventory.useItem("item");
            expect(inventory.getItems()).to.be.deep.equal([{
                "id": "item",
                "count": 4,
                "displayName": "Test Item",
                "type": "test"
            }]);
        });

        it("should remove an item when item count reaches zero", function () {
            ItemData["item"] = {
                displayName: "Test Item",
                type: "test"
            };

            const inventory = new BasicInventory();
            inventory.addItem("item");
            expect(inventory.getItems()).to.be.deep.equal([{
                "id": "item",
                "count": 1,
                "displayName": "Test Item",
                "type": "test"
            }]);
            inventory.useItem("item");
            expect(inventory.getItems()).to.be.deep.equal([]);
        });

        it("should return item names and counts from getNamesAndCounts", function () {
            ItemData["item"] = {
                displayName: "Test Item",
                type: "test"
            };

            const inventory = new BasicInventory();
            inventory.addItem("item", 5);
            expect(inventory.getItems()).to.be.deep.equal([{
                "id": "item",
                "count": 5,
                "displayName": "Test Item",
                "type": "test"
            }]);
        });
    });
});
