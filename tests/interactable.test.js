/* global describe, it, beforeEach */

import { expect } from "chai";
import { fake } from "sinon";
import globals from "../src/globals";
import { ItemData, SpellData } from "../src/data";
import { GiveItemsInteractable, GiveSpellInteractable, DoorInteractable, LoadLevelInteractable } from "../src/interactable";

describe("interactable", function () {
    beforeEach(function () {
        globals.Game = {
            removeObject: fake(),
            loadLevel: fake()
        };
    });

    describe("GiveItemsInteractable", function () {
        it("should throw error if the user does not have an inventory component", function () {
            ItemData["test1"] = { displayName: "test1" };
            ItemData["test2"] = { displayName: "test2" };

            const owner = {
                inventoryComponent: {
                    getIDsAndCounts: fake.returns([{ id: "test1", count: 1 }, { id: "test2", count: 1 }]),
                    useItem: fake()
                },
                interactable: new GiveItemsInteractable()
            };
            owner.interactable.setOwner(owner);
            const user = {};
            expect(() => owner.interactable.interact(user)).to.throw();
        });

        it("should give all items from the owner to the user", function () {
            ItemData["test1"] = { displayName: "test1" };
            ItemData["test2"] = { displayName: "test2" };

            const owner = {
                inventoryComponent: {
                    getItems: fake.returns([{ id: "test1", count: 1 }, { id: "test2", count: 1 }]),
                    useItem: fake()
                },
                interactable: new GiveItemsInteractable()
            };
            owner.interactable.setOwner(owner);
            const user = {
                inventoryComponent: {
                    addItem: fake()
                }
            };
            owner.interactable.interact(user);

            expect(user.inventoryComponent.addItem.callCount).to.be.equal(2);
        });
    });

    describe("GiveSpellInteractable", function () {
        it("should give the spell to the user", function () {
            SpellData["test1"] = { name: "test1", value: 10 };

            const owner = {
                interactable: new GiveSpellInteractable()
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
                interactable: new DoorInteractable()
            };
            owner.interactable.setOwner(owner);
            const user = {};
            owner.interactable.interact(user);

            expect(globals.Game.removeObject.calledOnce).to.be.true;
            expect(globals.Game.removeObject.calledWith(owner)).to.be.true;
        });
    });

    describe("LoadLevelInteractable", function () {
        it("should call loadLevel", function () {
            const owner = {
                interactable: new LoadLevelInteractable()
            };
            owner.interactable.setLevel("level_01");
            owner.interactable.setOwner(owner);
            const user = {};
            owner.interactable.interact(user);

            expect(globals.Game.loadLevel.calledOnce).to.be.true;
            expect(globals.Game.loadLevel.calledWith("level_01")).to.be.true;
        });
    });
});
