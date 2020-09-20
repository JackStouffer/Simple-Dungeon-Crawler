/* global describe, it, beforeEach */

import { expect } from "chai";
import { fake } from "sinon";
import globals from "../src/globals";
import { Tile } from "../src/map";
import {
    moveCommand,
    getItemCommand,
    openInventoryCommand,
    openSpellsCommand,
    PlayerControlAI
} from "../src/player";
import { ItemData, SpellData } from "../src/data";

const emptySpaceData = [
    "empty",
    "",
    "white",
    "white",
    "grey",
    "grey",
    false,
    false
];
const filledSpaceData = [
    "filled",
    "",
    "grey",
    "grey",
    "black",
    "black",
    true,
    true
];

describe("player", function () {
    beforeEach(function () {
        globals.Game = {
            map: [
                [new Tile(...emptySpaceData), new Tile(...emptySpaceData), new Tile(...filledSpaceData)],
                [new Tile(...emptySpaceData), new Tile(...emptySpaceData), new Tile(...emptySpaceData)],
                [new Tile(...filledSpaceData), new Tile(...filledSpaceData), new Tile(...filledSpaceData)]
            ],
            gameObjects: [],
            displayMessage: fake(),
            drawAll: fake(),
            display: {
                draw: fake(),
                drawText: fake()
            }
        };
        globals.window = {
            removeEventListener: fake()
        };
    });

    describe("moveCommand", function () {
        it("should move the player up", function () {
            const player = { x: 1, y: 1 };
            const func = moveCommand(player, 0, 8);
            func();
            expect(player.x).to.be.equal(1);
            expect(player.y).to.be.equal(0);
        });

        it("should move the player down", function () {
            const player = { x: 0, y: 0 };
            const func = moveCommand(player, 4, 8);
            func();
            expect(player.x).to.be.equal(0);
            expect(player.y).to.be.equal(1);
        });

        it("should move the player left", function () {
            const player = { x: 1, y: 1 };
            const func = moveCommand(player, 6, 8);
            func();
            expect(player.x).to.be.equal(0);
            expect(player.y).to.be.equal(1);
        });

        it("should move the player right", function () {
            const player = { x: 1, y: 1 };
            const func = moveCommand(player, 2, 8);
            func();
            expect(player.x).to.be.equal(2);
            expect(player.y).to.be.equal(1);
        });

        it("should interact with an object", function () {
            const player = { x: 0, y: 0 };
            globals.Game.gameObjects = [{
                x: 1,
                y: 0,
                blocks: true,
                interactable: { interact: fake() }
            }];
            const func = moveCommand(player, 2, 8);
            func();
            expect(globals.Game.gameObjects[0].interactable.interact.calledOnce).to.be.true;
        });

        it("should attack a fighter", function () {
            const player = { x: 0, y: 0, fighter: { attack: fake() } };
            globals.Game.gameObjects = [{
                x: 1,
                y: 0,
                blocks: true,
                fighter: {}
            }];
            const func = moveCommand(player, 2, 8);
            func();
            expect(player.fighter.attack.calledOnce).to.be.true;
        });
    });

    describe("getItemCommand", function () {
        it("should check the tile below the actor for a dropped item", function () {
            globals.Game.gameObjects = [{
                x: 0,
                y: 0,
                type: "dropped_item",
                interactable: {
                    interact: fake()
                }
            }];
            const owner = {
                x: 0,
                y: 0
            };
            const func = getItemCommand(owner);
            expect(func()).to.be.true;
            expect(globals.Game.gameObjects[0].interactable.interact.calledOnce).to.be.true;
        });

        it("should not pick up the game object if it's not a dropped item", function () {
            globals.Game.gameObjects = [{
                x: 0,
                y: 0,
                type: "test",
                interactable: {
                    interact: fake()
                }
            }];
            const owner = {
                x: 0,
                y: 0
            };
            const func = getItemCommand(owner);
            expect(func()).to.be.false;
            expect(globals.Game.gameObjects[0].interactable.interact.calledOnce).to.be.false;
        });

        it("should not pick up the game object if it's not on the same tile", function () {
            globals.Game.gameObjects = [{
                x: 1,
                y: 1,
                type: "dropped_item",
                interactable: {
                    interact: fake()
                }
            }];
            const owner = {
                x: 0,
                y: 0
            };
            const func = getItemCommand(owner);
            expect(func()).to.be.false;
            expect(globals.Game.gameObjects[0].interactable.interact.calledOnce).to.be.false;
        });
    });

    describe("openInventoryCommand", function () {
        it("should put the ai into inventory state", function () {
            const owner = {
                ai: {
                    state: "normal"
                },
                inventoryComponent: {
                    getNamesAndCounts: fake.returns([])
                }
            };
            const func = openInventoryCommand(owner);
            func();
            expect(owner.ai.state).to.be.equal("inventory");
        });
    });

    describe("openSpellsCommand", function () {
        it("should put the ai into inventory state", function () {
            const owner = {
                ai: {
                    state: "normal"
                },
                fighter: {
                    getKnownSpells: fake.returns([])
                }
            };
            const func = openSpellsCommand(owner);
            func();
            expect(owner.ai.state).to.be.equal("spell_selection");
        });
    });

    describe("PlayerControlAI", function () {
        describe("handleInput", function () {
            it("should call a command when its key is pressed", async function () {
                const owner = {
                    x: 0,
                    y: 0,
                    fighter: {
                        hp: 1
                    },
                    ai: new PlayerControlAI()
                };
                owner.ai.setOwner(owner);
                owner.ai.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                globals.window.addEventListener = function (_, cb) {
                    return cb({ key: "w" });
                };

                await owner.ai.handleInput();
                expect(owner.ai.keyCommands[0].command.calledOnce).to.be.true;
            });

            it("should go back to normal state when escape is pressed when in inventory", async function () {
                globals.window.addEventListener = function (_, cb) {
                    return cb({ key: "Escape" });
                };
                const owner = {
                    x: 0,
                    y: 0,
                    fighter: {
                        hp: 1
                    },
                    ai: new PlayerControlAI(),
                    inventoryComponent: {
                        useItem: fake(),
                        getIDsAndCounts: fake.returns([{ id: "test", count: 1 }])
                    }
                };
                owner.ai.setOwner(owner);
                owner.ai.state = "inventory";

                await owner.ai.handleInput();
                expect(owner.ai.state).to.be.equal("normal");
                expect(owner.inventoryComponent.useItem.calledOnce).to.be.false;
            });

            it("should use an item when in inventory state", async function () {
                globals.window.addEventListener = function (_, cb) {
                    return cb({ key: "a" });
                };
                const owner = {
                    x: 0,
                    y: 0,
                    fighter: {
                        hp: 1
                    },
                    ai: new PlayerControlAI(),
                    inventoryComponent: {
                        useItem: fake(),
                        getIDsAndCounts: fake.returns([{ id: "test", count: 1 }])
                    }
                };
                owner.ai.setOwner(owner);
                owner.ai.state = "inventory";
                ItemData["test"] = {
                    displayName: "Test Item",
                    useFunc: async function () {
                        return true;
                    }
                };

                await owner.ai.handleInput();
                expect(owner.ai.state).to.be.equal("normal");
                expect(owner.inventoryComponent.useItem.calledWith("test")).to.be.true;
            });

            it("should not use item or change state if bad key is pressed", async function () {
                globals.window.addEventListener = function (_, cb) {
                    return cb({ key: "z" });
                };
                const owner = {
                    x: 0,
                    y: 0,
                    fighter: {
                        hp: 1
                    },
                    ai: new PlayerControlAI(),
                    inventoryComponent: {
                        useItem: fake(),
                        getIDsAndCounts: fake.returns([{ id: "test", count: 1 }])
                    }
                };
                owner.ai.setOwner(owner);
                owner.ai.state = "inventory";
                ItemData["test"] = {
                    displayName: "Test Item",
                    useFunc: async function () {
                        return true;
                    }
                };

                const acted = await owner.ai.handleInput();
                expect(acted).to.be.false;
                expect(owner.ai.state).to.be.equal("inventory");
                expect(owner.inventoryComponent.useItem.calledOnce).to.be.false;
            });

            it("should go back to normal state when escape is pressed when in spell_selection", async function () {
                globals.window.addEventListener = function (_, cb) {
                    return cb({ key: "Escape" });
                };
                const owner = {
                    x: 0,
                    y: 0,
                    fighter: {
                        hp: 1,
                        getKnownSpells: fake.returns(["test"]),
                        useMana: fake()
                    },
                    ai: new PlayerControlAI()
                };
                owner.ai.setOwner(owner);
                owner.ai.state = "spell_selection";
                SpellData["test"] = {
                    displayName: "Test Item",
                    value: 10,
                    manaCost: 20,
                    useFunc: async function () {
                        return true;
                    }
                };

                const acted = await owner.ai.handleInput();
                expect(acted).to.be.false;
                expect(owner.ai.state).to.be.equal("normal");
                expect(owner.fighter.getKnownSpells.calledOnce).to.be.false;
            });

            it("should use an spell when in spell_selection state", async function () {
                globals.window.addEventListener = function (_, cb) {
                    return cb({ key: "a" });
                };
                const owner = {
                    x: 0,
                    y: 0,
                    fighter: {
                        hp: 1,
                        getKnownSpells: fake.returns(["test"]),
                        useMana: fake()
                    },
                    ai: new PlayerControlAI()
                };
                owner.ai.setOwner(owner);
                owner.ai.state = "spell_selection";
                SpellData["test"] = {
                    displayName: "Test Item",
                    value: 10,
                    manaCost: 20,
                    useFunc: async function (spell, caster) {
                        expect(spell).to.be.deep.equal(SpellData["test"]);
                        expect(caster).to.be.equal(owner);
                        return true;
                    }
                };

                const acted = await owner.ai.handleInput();
                expect(acted).to.be.true;
                expect(owner.ai.state).to.be.equal("normal");
                expect(owner.fighter.useMana.calledWith(20)).to.be.true;
            });

            it("should not use spell or change state if bad key is pressed", async function () {
                globals.window.addEventListener = function (_, cb) {
                    return cb({ key: "z" });
                };
                const owner = {
                    x: 0,
                    y: 0,
                    fighter: {
                        hp: 1,
                        getKnownSpells: fake.returns(["test"]),
                        useMana: fake()
                    },
                    ai: new PlayerControlAI()
                };
                owner.ai.setOwner(owner);
                owner.ai.state = "spell_selection";
                SpellData["test"] = {
                    displayName: "Test Item",
                    value: 10,
                    manaCost: 20,
                    useFunc: async function (spell, caster) {
                        expect(spell).to.be.deep.equal(SpellData["test"]);
                        expect(caster).to.be.equal(owner);
                        return true;
                    }
                };

                const acted = await owner.ai.handleInput();
                expect(acted).to.be.false;
                expect(owner.ai.state).to.be.equal("spell_selection");
                expect(owner.fighter.useMana.calledOnce).to.be.false;
            });
        });
    });
});
