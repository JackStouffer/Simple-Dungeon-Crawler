/* global describe, it, beforeEach, afterEach */

const _ = require("lodash");
const { fake } = require("sinon");
const { expect } = require("chai");
const proxyquire =  require('proxyquire');

const { GameState, ItemData, SpellData, ItemType, SpellType } = require("../test-dist/data");
const input = require("../test-dist/input");

class MockDisplay {
    getContainer() {}
}

class MockInventoryMenu {
    draw() {}
    handleInput() { return ItemData["item"]; }
    resetState() {}
}

describe("game", function () {
    let game;

    function mock(mocks) {
        const defaultMocks = _.extend({
            "./rot/index": {
                Display: MockDisplay
            },
            './globals': {
                default: {
                    gameEventEmitter: {
                        emit: fake()
                    },
                    window: {
                        addEventListener: fake()
                    },
                    document: {
                        getElementById: fake.returns({
                            prepend: fake(),
                            parentNode: {
                                removeChild: fake()
                            }
                        })
                    }
                }
            },
            "./object": {
                createObject: () => ({
                    type: "player",
                    getSpeed: fake.returns(10),
                    fighter: {
                        getKnownSpells: fake.returns([]),
                        hasSpell: fake.returns(true),
                        getEffectiveStats: fake.returns({
                            mana: 100
                        }),
                        useMana: fake.returns(true)
                    },
                    inventory: {
                        getItems: fake.returns([]),
                        addItem: fake.returns(true),
                        hasItem: fake.returns(true),
                        useItem: fake.returns(true)
                    }
                })
            },
            "./map": {
                loadTiledMap: fake.returns({
                    map: [[]],
                    playerLocation: [0, 0],
                    objects: [],
                    volumes: [],
                    pathNodes: []
                })
            },
            "./ui": {
                displayMessage: fake(),
                InventoryMenu: MockInventoryMenu
            }
        }, mocks);

        game = proxyquire('../test-dist/game', defaultMocks);
    }

    beforeEach(function () {
        mock();
    });

    beforeEach(function () {
        input.default.clearInputs();
    });

    describe("SimpleDungeonCrawler", function () {
        let gameInstance;
        const player = {
            x: 0,
            y: 0,
            graphics: { draw: fake() },
            fighter: {
                getEffectiveStats: fake.returns({}),
                getKnownSpells: fake.returns([]),
                hasSpell: fake.returns(true),
                useMana: fake()
            },
            lighting: { compute: fake() },
            inventory: {
                getItems: fake.returns([]),
                hasItem: fake.returns(true),
                useItem: fake()
            },
            getSpeed: fake.returns(1)
        };

        beforeEach(function () {
            gameInstance = new game.SimpleDungeonCrawler();
            gameInstance.gameCamera.follow(gameInstance.player);
        });

        describe("handleInput", function () {
            it("should go into PauseMenu state when escape is pressed when in gameplay", function () {
                gameInstance.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                gameInstance.state = GameState.Gameplay;

                input.default.pressKey("Escape");
                gameInstance.handleInput();
                expect(gameInstance.state).to.be.equal(GameState.PauseMenu);
                input.default.clearInputs();

                input.default.pressKey("Escape");
                gameInstance.handleInput();
                expect(gameInstance.state).to.be.equal(GameState.Gameplay);
            });

            it("should go back to gameplay state when escape is pressed when in inventoryMenu", function () {
                gameInstance.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                gameInstance.state = GameState.InventoryMenu;
                gameInstance.canvas = { addEventListener: fake() };

                input.default.pressKey("Escape");
                gameInstance.handleInput();
                expect(gameInstance.state).to.be.equal(GameState.Gameplay);
            });

            it("should return to gameplay when the inventory ui returns an item", function () {
                ItemData["item"] = {
                    id: "item",
                    displayName: "Test",
                    value: 10,
                    type: ItemType.HealSelf,
                    useFunc: fake.returns(true)
                };
                gameInstance.player.inventory.addItem("item");
                gameInstance.state = GameState.InventoryMenu;

                gameInstance.handleInput();
                expect(ItemData["item"].useFunc.calledOnce).to.be.true;
                expect(gameInstance.state).to.be.equal(GameState.Gameplay);
            });

            it("should go back to gameplay state when escape is pressed when in SpellMenu", function () {
                gameInstance.state = GameState.SpellMenu;

                input.default.pressKey("Escape");
                gameInstance.handleInput();
                expect(gameInstance.state).to.be.equal(GameState.Gameplay);
            });

            it("should return to gameplay when the spell ui returns a spell", function () {
                SpellData["spell"] = {
                    id: "spell",
                    displayName: "Test Spell",
                    type: SpellType.HealSelf,
                    value: 10,
                    manaCost: 20,
                    useFunc: fake.returns(true)
                };
                gameInstance.spellSelectionMenu = {
                    draw: fake(),
                    handleInput: function () { return SpellData["spell"]; }
                };
                gameInstance.state = GameState.SpellMenu;

                input.default.pressKey("w");
                gameInstance.handleInput();
                expect(SpellData["spell"].useFunc.calledOnce).to.be.true;
                expect(gameInstance.state).to.be.equal(GameState.Gameplay);
            });

            it("should go to gameplay state when enter is pressed when in openingCinematic state", function () {
                gameInstance.state = GameState.OpeningCinematic;
                gameInstance.canvas = { addEventListener: fake() };

                input.default.pressKey("Enter");
                gameInstance.handleInput();
                expect(gameInstance.state).to.be.equal(GameState.Gameplay);
            });

            it("should go to gameplay state when enter is pressed when in loseCinematic state", function () {
                gameInstance.state = GameState.LoseCinematic;

                input.default.pressKey("Enter");
                gameInstance.handleInput();
                expect(gameInstance.state).to.be.equal(GameState.Gameplay);
            });

            it("should go to gameplay state when enter is pressed when in winCinematic state", function () {
                gameInstance.state = GameState.WinCinematic;

                input.default.pressKey("Enter");
                gameInstance.handleInput();
                expect(gameInstance.state).to.be.equal(GameState.Gameplay);
            });
        });
    });
});
