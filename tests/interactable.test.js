/* global describe, it, beforeEach */

const _ = require("lodash");
const { expect } = require("chai");
const { fake } = require("sinon");
const proxyquire =  require('proxyquire');

const { ItemData, SpellData } = require("../test-dist/data");

describe("interactable", function () {
    let interact, loadLevelFake, removeObjectFake;

    function mock(mocks) {
        loadLevelFake = fake();
        removeObjectFake = fake();
        const defaultMocks = _.extend({
            "./globals": {
                default: {
                    Game: {
                        removeObject: removeObjectFake,
                        loadLevel: loadLevelFake
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

        interact = proxyquire('../test-dist/interactable', defaultMocks);
    }

    beforeEach(() => {
        mock();
    });

    describe("GiveItemsInteractable", function () {
        it("should throw error if the user does not have an inventory component", function () {
            ItemData["test1"] = { displayName: "test1" };
            ItemData["test2"] = { displayName: "test2" };

            const owner = {
                inventory: {
                    getIDsAndCounts: fake.returns([{ id: "test1", count: 1 }, { id: "test2", count: 1 }]),
                    useItem: fake()
                },
                interactable: new interact.GiveItemsInteractable()
            };
            owner.interactable.setOwner(owner);
            const user = {};
            expect(() => owner.interactable.interact(user)).to.throw();
        });

        it("should give all items from the owner to the user", function () {
            ItemData["test1"] = { displayName: "test1" };
            ItemData["test2"] = { displayName: "test2" };

            const owner = {
                inventory: {
                    getItems: fake.returns([{ id: "test1", count: 1 }, { id: "test2", count: 1 }]),
                    useItem: fake()
                },
                interactable: new interact.GiveItemsInteractable()
            };
            owner.interactable.setOwner(owner);
            const user = {
                inventory: {
                    addItem: fake()
                }
            };
            owner.interactable.interact(user);

            expect(user.inventory.addItem.callCount).to.be.equal(2);
        });
    });

    describe("GiveSpellInteractable", function () {
        it("should give the spell to the user", function () {
            SpellData["test1"] = { name: "test1", value: 10 };

            const owner = {
                interactable: new interact.GiveSpellInteractable()
            };
            owner.interactable.setOwner(owner);
            owner.interactable.setSpell("test1");
            const user = {
                fighter: {
                    addSpellById: fake()
                }
            };
            owner.interactable.interact(user);

            expect(user.fighter.addSpellById.calledOnce).to.be.true;
            expect(user.fighter.addSpellById.calledWith("test1")).to.be.true;
        });
    });

    describe("DoorInteractable", function () {
        it("should remove itself", function () {
            const owner = {
                interactable: new interact.DoorInteractable()
            };
            owner.interactable.setOwner(owner);
            const user = {};
            owner.interactable.interact(user);

            expect(removeObjectFake.calledOnce).to.be.true;
            expect(removeObjectFake.calledWith(owner)).to.be.true;
        });
    });

    describe("LoadLevelInteractable", function () {
        it("should call loadLevel", function () {
            const owner = {
                interactable: new interact.LoadLevelInteractable()
            };
            owner.interactable.setLevel("level_01");
            owner.interactable.setOwner(owner);
            const user = {};
            owner.interactable.interact(user);

            expect(loadLevelFake.calledOnce).to.be.true;
            expect(loadLevelFake.calledWith("level_01")).to.be.true;
        });
    });
});
