/* global describe, it, beforeEach, afterEach */

import { fake } from "sinon";
import { expect } from "chai";

import globals from "../src/globals";
import { SimpleDungeonCrawler } from "../src/game";
import { GameState, ItemData, SpellData, ItemType, SpellType } from "../src/data";
import input from "../src/input";

describe("game", function () {
    describe("SimpleDungeonCrawler", function () {
        beforeEach(function () {
            globals.window = {
                addEventListener: function () {}
            };
            globals.Game = new SimpleDungeonCrawler();
            globals.Game.map = [[]];
            globals.Game.display = {
                draw: fake(),
                drawText: fake(),
                clear: fake()
            };
            globals.Game.player = {
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
                inventoryComponent: {
                    getItems: fake.returns([]),
                    hasItem: fake.returns(true),
                    useItem: fake()
                },
                getSpeed: fake.returns(1)
            };
            globals.Game.gameCamera.follow(globals.Game.player);
        });

        afterEach(function () {
            input.clearInputs();
        });

        describe("handleInput", function () {
            it("should call a command when its key is pressed", function () {
                globals.Game.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                globals.Game.state = GameState.Gameplay;

                input.press("w");
                globals.Game.handleInput();
                expect(globals.Game.keyCommands[0].command.calledOnce).to.be.true;
            });

            it("should go into PauseMenu state when escape is pressed when in gameplay", function () {
                globals.Game.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                globals.Game.state = GameState.Gameplay;

                input.press("Escape");
                globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.PauseMenu);
                input.clearInputs();

                input.press("Escape");
                globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.Gameplay);
            });

            it("should go back to gameplay state when escape is pressed when in inventoryMenu", function () {
                globals.Game.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                globals.Game.state = GameState.InventoryMenu;
                globals.Game.canvas = { addEventListener: fake() };

                input.press("Escape");
                globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.Gameplay);
            });

            it("should return to gameplay when the inventory ui returns an item", function () {
                ItemData["item"] = {
                    id: "item",
                    displayName: "Test",
                    value: 10,
                    type: ItemType.HealSelf,
                    useFunc: fake.returns(true)
                };
                globals.Game.inventoryMenu = {
                    draw: fake(),
                    handleInput: function () { return ItemData["item"]; },
                    resetState: fake()
                };
                globals.Game.state = GameState.InventoryMenu;

                input.press("w");
                globals.Game.handleInput();
                expect(ItemData["item"].useFunc.calledOnce).to.be.true;
                expect(globals.Game.state).to.be.equal(GameState.Gameplay);
            });

            it("should go back to gameplay state when escape is pressed when in SpellMenu", function () {
                globals.Game.state = GameState.SpellMenu;

                input.press("Escape");
                globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.Gameplay);
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
                globals.Game.spellSelectionMenu = {
                    draw: fake(),
                    handleInput: function () { return SpellData["spell"]; }
                };
                globals.Game.state = GameState.SpellMenu;

                input.press("w");
                globals.Game.handleInput();
                expect(SpellData["spell"].useFunc.calledOnce).to.be.true;
                expect(globals.Game.state).to.be.equal(GameState.Gameplay);
            });

            it("should go to gameplay state when enter is pressed when in openingCinematic state", function () {
                globals.Game.state = GameState.OpeningCinematic;
                globals.Game.canvas = { addEventListener: fake() };

                input.press("Enter");
                globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.Gameplay);
            });

            it("should go to gameplay state when enter is pressed when in loseCinematic state", function () {
                globals.Game.state = GameState.LoseCinematic;

                input.press("Enter");
                globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.Gameplay);
            });

            it("should go to gameplay state when enter is pressed when in winCinematic state", function () {
                globals.Game.state = GameState.WinCinematic;

                input.press("Enter");
                globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.Gameplay);
            });
        });
    });
});
