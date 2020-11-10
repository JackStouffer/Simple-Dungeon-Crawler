/* global describe, it, beforeEach */

const _ = require("lodash");
const { expect } = require("chai");
const { fake } = require("sinon");
const proxyquire =  require('proxyquire');

const globals = require("../test-dist/globals");
const { Tile } = require("../test-dist/map");
const { GameState, SpellData, ItemData } = require("../test-dist/data");

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

const testMap = [
    [
        new Tile(...emptySpaceData),
        new Tile(...emptySpaceData),
        new Tile(...filledSpaceData)
    ],
    [
        new Tile(...emptySpaceData),
        new Tile(...emptySpaceData),
        new Tile(...emptySpaceData)
    ],
    [
        new Tile(...filledSpaceData),
        new Tile(...filledSpaceData),
        new Tile(...filledSpaceData)
    ]
];

describe("command", function () {
    let commands;

    function mock(mocks) {
        const defaultMocks = _.extend({
            './globals': {
                default: {
                    Game: {
                        map: testMap,
                        gameObjects: []
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

        commands = proxyquire('../test-dist/commands', defaultMocks);
    }

    beforeEach(function () {
        mock();
    });

    describe("goToLocationCommand", function () {
        it("should move the player", function () {
            const player = { x: 1, y: 1 };
            const func = commands.goToLocationCommand([[0, 0]], testMap, []);
            func(player);
            expect(player.x).to.be.equal(0);
            expect(player.y).to.be.equal(0);
        });

        it("should not move the player when the spot is blocked", function () {
            const player = { x: 1, y: 1 };
            const func = commands.goToLocationCommand([[2, 2]], testMap, []);
            const ret = func(player);
            expect(player.x).to.be.equal(1);
            expect(player.y).to.be.equal(1);
            expect(ret).to.be.false;
        });
    });

    describe("interactCommand", function () {
        it("should interact with an object", function () {
            const player = { x: 0, y: 0 };
            const target = {
                x: 1,
                y: 0,
                blocks: true,
                interactable: { interact: fake() },
                fighter: null
            };
            const func = commands.interactCommand(target);
            func(player);
            expect(target.interactable.interact.calledOnce).to.be.true;
        });

        it("should attack a fighter", function () {
            const player = { x: 0, y: 0, fighter: { attack: fake() } };
            const target = {
                x: 1,
                y: 0,
                blocks: true,
                interactable: null,
                fighter: {}
            };
            const func = commands.interactCommand(target);
            func(player);
            expect(player.fighter.attack.calledOnce).to.be.true;
        });
    });

    describe("getItemCommand", function () {
        it("should check the tile below the actor for a dropped item", function () {
            const interactFake = fake();

            mock({
                './globals': {
                    default: {
                        Game: {
                            gameObjects: [{
                                x: 0,
                                y: 0,
                                type: "dropped_item",
                                interactable: {
                                    interact: interactFake
                                }
                            }]
                        }
                    }
                }
            });

            const owner = {
                x: 0,
                y: 0
            };
            const func = commands.getItemCommand();
            expect(func(owner)).to.be.true;
            expect(interactFake.calledOnce).to.be.true;
        });

        it("should not pick up the game object if it's not a dropped item", function () {
            const interactFake = fake();

            mock({
                './globals': {
                    default: {
                        Game: {
                            gameObjects: [{
                                x: 0,
                                y: 0,
                                type: "test",
                                interactable: {
                                    interact: interactFake
                                }
                            }]
                        }
                    }
                }
            });
            const owner = {
                x: 0,
                y: 0
            };
            const func = commands.getItemCommand();
            expect(func(owner)).to.be.false;
            expect(interactFake.calledOnce).to.be.false;
        });

        it("should not pick up the game object if it's not on the same tile", function () {
            const interactFake = fake();

            mock({
                "./globals": {
                    default: {
                        Game: {
                            gameObjects: [{
                                x: 1,
                                y: 1,
                                type: "dropped_item",
                                interactable: {
                                    interact: interactFake
                                }
                            }]
                        }
                    }
                }
            });
            const owner = {
                x: 0,
                y: 0
            };
            const func = commands.getItemCommand();
            expect(func(owner)).to.be.false;
            expect(interactFake.calledOnce).to.be.false;
        });
    });

    describe("openInventoryCommand", function () {
        it("should put the game into inventory menu state", function () {
            const game = {
                state: null
            };
            mock({
                "./globals": {
                    default: {
                        Game: game,
                        gameEventEmitter: {
                            emit: fake()
                        }
                    }
                }
            });

            const owner = {
                ai: {
                    state: "normal"
                },
                inventory: {
                    getNamesAndCounts: fake.returns([])
                }
            };
            const func = commands.openInventoryCommand();
            func(owner);
            expect(game.state).to.be.equal(GameState.InventoryMenu);
        });
    });

    describe("openSpellsCommand", function () {
        it("should put the game into spell menu state", function () {
            const game = {
                state: null
            };
            mock({
                "./globals": {
                    default: {
                        Game: game,
                        gameEventEmitter: {
                            emit: fake()
                        }
                    }
                }
            });

            const owner = {
                ai: {
                    state: "normal"
                },
                fighter: {
                    getKnownSpells: fake.returns([])
                }
            };
            const func = commands.openSpellsCommand();
            func(owner);
            expect(game.state).to.be.equal(GameState.SpellMenu);
        });
    });

    describe("useItemCommand", function () {
        it("should return false if the fighter does have that item", function () {
            ItemData["item"] = {
                displayName: "Test",
                value: 10,
                type: "health",
                useFunc: fake.returns(false)
            };
            const owner = {
                inventory: {
                    hasItem: fake.returns(false),
                }
            };

            const ret = commands.useItemCommand("item")(owner);
            expect(ret).to.be.false;
            expect(ItemData["item"].useFunc.calledOnce).to.be.false;
        });

        it("should return false if useFunc does", function () {
            ItemData["item"] = {
                displayName: "Test",
                value: 10,
                type: "health",
                useFunc: fake.returns(false)
            };
            const owner = {
                inventory: {
                    hasItem: fake.returns(true),
                    useItem: fake()
                }
            };

            const ret = commands.useItemCommand("item")(owner);
            expect(ret).to.be.false;
            expect(owner.inventory.useItem.calledOnce).to.be.false;
            expect(ItemData["item"].useFunc.calledOnce).to.be.true;
        });

        it("should return true and use the item", function () {
            ItemData["item"] = {
                displayName: "Test",
                value: 10,
                type: "health",
                useFunc: fake.returns(true)
            };
            const owner = {
                inventory: {
                    hasItem: fake.returns(true),
                    useItem: fake()
                }
            };

            const ret = commands.useItemCommand("item")(owner);
            expect(ret).to.be.true;
            expect(owner.inventory.useItem.calledOnce).to.be.true;
            expect(ItemData["item"].useFunc.calledOnce).to.be.true;
        });
    });

    describe("useSpellCommand", function () {
        it("should return false if the fighter does not know the spell", function () {
            SpellData["spell"] = {
                displayName: "Test Spell",
                type: "damage",
                value: 10,
                manaCost: 20
            };
            const owner = {
                fighter: {
                    hasSpell: fake.returns(false),
                }
            };

            const ret = commands.useSpellCommand("spell")(owner);
            expect(ret).to.be.false;
        });

        it("should return false if the fighter does not have enough mana", function () {
            SpellData["spell"] = {
                displayName: "Test Spell",
                type: "damage",
                value: 10,
                manaCost: 20
            };
            const owner = {
                fighter: {
                    hasSpell: fake.returns(true),
                    getEffectiveStats: fake.returns({
                        mana: 0
                    })
                }
            };

            const ret = commands.useSpellCommand("spell")(owner);
            expect(ret).to.be.false;
            expect(owner.fighter.getEffectiveStats.calledOnce).to.be.true;
        });

        it("should return false if useFunc does", function () {
            SpellData["spell"] = {
                displayName: "Test Spell",
                type: "damage",
                value: 10,
                manaCost: 20,
                useFunc: fake.returns(false)
            };
            const owner = {
                fighter: {
                    hasSpell: fake.returns(true),
                    getEffectiveStats: fake.returns({
                        mana: 20
                    }),
                    useMana: fake()
                }
            };

            const ret = commands.useSpellCommand("spell")(owner);
            expect(ret).to.be.false;
            expect(owner.fighter.getEffectiveStats.calledOnce).to.be.true;
            expect(owner.fighter.useMana.calledWith(20)).to.be.false;
            expect(SpellData["spell"].useFunc.calledOnce).to.be.true;
        });

        it("should return true and use mana", function () {
            SpellData["spell"] = {
                displayName: "Test Spell",
                type: "damage",
                value: 10,
                manaCost: 20,
                useFunc: fake.returns(true)
            };
            const owner = {
                fighter: {
                    hasSpell: fake.returns(true),
                    getEffectiveStats: fake.returns({
                        mana: 20
                    }),
                    useMana: fake()
                }
            };

            const ret = commands.useSpellCommand("spell")(owner);
            expect(ret).to.be.true;
            expect(owner.fighter.getEffectiveStats.calledOnce).to.be.true;
            expect(owner.fighter.useMana.calledWith(20)).to.be.true;
            expect(SpellData["spell"].useFunc.calledOnce).to.be.true;
        });
    });
});
