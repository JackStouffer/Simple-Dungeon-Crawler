/* global describe, it */

const _ = require("lodash");
const { expect } = require("chai");
const { fake } = require("sinon");
const proxyquire =  require('proxyquire');

const { ItemData } = require("../test-dist/data");

describe("inventory", function () {
    let inventoryModule;

    function mock(mocks) {
        const defaultMocks = _.extend({
            "./globals": {
                default: {
                    Game: {
                        player: {}
                    },
                    gameEventEmitter: {
                        emit: fake()
                    }
                }
            },
            "./ui": {
                displayMessage: fake()
            }
        }, mocks);

        inventoryModule = proxyquire('../test-dist/inventory', defaultMocks);
    }

    beforeEach(() => {
        mock();
    });

    describe("BasicInventory", function () {
        it("should add a new item to the inventory", function () {
            ItemData["item"] = {
                displayName: "Test Item",
                type: "test",
                value: 10
            };

            const owner = {};
            const inventory = new inventoryModule.BasicInventory();
            inventory.setOwner(owner);

            inventory.addItem("item");
            expect(inventory.hasItem("item")).to.be.true;
        });

        it("should return item ids and counts from getIDsAndCounts", function () {
            ItemData["item"] = {
                displayName: "Test Item",
                type: "test",
                value: 10
            };
            ItemData["other"] = {
                displayName: "Other Item",
                type: "test",
                value: 10
            };

            const owner = {};
            const inventory = new inventoryModule.BasicInventory();
            inventory.setOwner(owner);

            inventory.addItem("item");
            inventory.addItem("other");
            expect(inventory.getItems()).to.be.deep.equal([
                {
                    "id": "item",
                    "count": 1,
                    "displayName": "Test Item",
                    "type": "test",
                    "value":  10
                },
                {
                    "id": "other",
                    "count": 1,
                    "displayName": "Other Item",
                    "type": "test",
                    "value":  10
                }
            ]);
        });

        it("should allow adding multiple items", function () {
            ItemData["item"] = {
                displayName: "Test Item",
                type: "test",
                value: 10
            };

            const owner = {};
            const inventory = new inventoryModule.BasicInventory();
            inventory.setOwner(owner);

            inventory.addItem("item", 5);
            expect(inventory.getItems()).to.be.deep.equal([{
                "id": "item",
                "count": 5,
                "displayName": "Test Item",
                "type": "test",
                "value":  10
            }]);
        });

        it("should reduce an item's count with useItem", function () {
            ItemData["item"] = {
                displayName: "Test Item",
                type: "test",
                value: 10
            };

            const owner = {};
            const inventory = new inventoryModule.BasicInventory();
            inventory.setOwner(owner);

            inventory.addItem("item", 5);
            inventory.useItem("item");
            expect(inventory.getItems()).to.be.deep.equal([{
                "id": "item",
                "count": 4,
                "displayName": "Test Item",
                "type": "test",
                "value":  10
            }]);
        });

        it("should remove an item when item count reaches zero", function () {
            ItemData["item"] = {
                displayName: "Test Item",
                type: "test",
                value: 10
            };

            const owner = {};
            const inventory = new inventoryModule.BasicInventory();
            inventory.setOwner(owner);

            inventory.addItem("item");
            expect(inventory.getItems()).to.be.deep.equal([{
                "id": "item",
                "count": 1,
                "displayName": "Test Item",
                "type": "test",
                "value":  10
            }]);
            inventory.useItem("item");
            expect(inventory.getItems()).to.be.deep.equal([]);
        });

        it("should return item names and counts from getNamesAndCounts", function () {
            ItemData["item"] = {
                displayName: "Test Item",
                type: "test",
                value: 10
            };

            const owner = {};
            const inventory = new inventoryModule.BasicInventory();
            inventory.setOwner(owner);

            inventory.addItem("item", 5);
            expect(inventory.getItems()).to.be.deep.equal([{
                "id": "item",
                "count": 5,
                "displayName": "Test Item",
                "type": "test",
                "value":  10
            }]);
        });
    });
});
