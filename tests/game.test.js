/* global describe, it, beforeEach */

import { fake } from "sinon";
import { expect } from "chai";

import globals from "../src/globals";
import { SimpleDungeonCrawler } from "../src/game";
import { GameState } from "../src/data";

describe("game", function () {
    describe("SimpleDungeonCrawler", function () {
        beforeEach(function () {
            globals.window = {};
            globals.Game = new SimpleDungeonCrawler();
            globals.Game.display = {
                draw: fake(),
                drawText: fake()
            };
            globals.Game.player = {
                graphics: { draw: fake() },
                fighter: { getKnownSpells: fake.returns([]) },
                lighting: { compute: fake() },
                inventoryComponent: { getItems: fake.returns([]) },
            };
        });

        describe("handleInput", function () {
            it("should call a command when its key is pressed", async function () {
                globals.Game.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                globals.Game.state = GameState.gameplay;
                globals.window.addEventListener = function (_, cb) {
                    return cb({ key: "w", preventDefault: fake() });
                };

                await globals.Game.handleInput();
                expect(globals.Game.keyCommands[0].command.calledOnce).to.be.true;
            });

            it("should go into pauseMenu state when escape is pressed when in gameplay", async function () {
                let calls = 0;
                globals.Game.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                globals.Game.state = GameState.gameplay;
                globals.window.addEventListener = function (_, cb) {
                    if (calls === 0) {
                        calls++;
                        return cb({ key: "Escape", preventDefault: fake() });
                    } else if (calls === 1) {
                        calls++;
                        expect(globals.Game.state).to.be.equal(GameState.pauseMenu);
                        return cb({ key: "Escape", preventDefault: fake() });
                    } else if (calls === 2) {
                        calls++;
                        return cb({ key: "w", preventDefault: fake() });
                    }
                };

                await globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.gameplay);
            });

            it("should go back to gameplay state when escape is pressed when in inventoryMenu", async function () {
                let calls = 0;
                globals.Game.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                globals.Game.state = GameState.inventoryMenu;
                globals.window.addEventListener = function (_, cb) {
                    if (calls === 0) {
                        calls++;
                        return cb({ key: "Escape", preventDefault: fake() });
                    } else {
                        return cb({ key: "w", preventDefault: fake() });
                    }
                };

                await globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.gameplay);
            });

            it("should return to gameplay when the inventory ui returns a command", async function () {
                const command = fake.returns(Promise.resolve(true));
                globals.Game.inventoryMenu = {
                    draw: fake(),
                    handleInput: function () { return command; }
                };
                globals.Game.state = GameState.inventoryMenu;
                globals.window.addEventListener = function (_, cb) {
                    return cb({ key: "w", preventDefault: fake() });
                };

                await globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.gameplay);
                expect(command.calledOnce).to.be.true;
            });

            it("should go back to gameplay state when escape is pressed when in spellMenu", async function () {
                let calls = 0;
                globals.Game.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                globals.Game.state = GameState.spellMenu;
                globals.window.addEventListener = function (_, cb) {
                    if (calls === 0) {
                        calls++;
                        return cb({ key: "Escape", preventDefault: fake() });
                    } else {
                        return cb({ key: "w", preventDefault: fake() });
                    }
                };

                await globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.gameplay);
            });

            it("should return to gameplay when the spell ui returns a command", async function () {
                const command = fake.returns(Promise.resolve(true));
                globals.Game.spellSelectionMenu = {
                    draw: fake(),
                    handleInput: function () { return command; }
                };
                globals.Game.state = GameState.spellMenu;
                globals.window.addEventListener = function (_, cb) {
                    return cb({ key: "w", preventDefault: fake() });
                };

                await globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.gameplay);
                expect(command.calledOnce).to.be.true;
            });

            it("should go to gameplay state when enter is pressed when in openingCinematic state", async function () {
                let calls = 0;
                globals.Game.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                globals.Game.state = GameState.openingCinematic;
                globals.window.addEventListener = function (_, cb) {
                    if (calls === 0) {
                        calls++;
                        return cb({ key: "Enter", preventDefault: fake() });
                    } else {
                        return cb({ key: "w", preventDefault: fake() });
                    }
                };

                await globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.gameplay);
            });

            it("should go to gameplay state when enter is pressed when in loseCinematic state", async function () {
                let calls = 0;
                globals.Game.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                globals.Game.state = GameState.loseCinematic;
                globals.window.addEventListener = function (_, cb) {
                    if (calls === 0) {
                        calls++;
                        return cb({ key: "Enter", preventDefault: fake() });
                    } else {
                        return cb({ key: "w", preventDefault: fake() });
                    }
                };

                await globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.gameplay);
            });

            it("should go to gameplay state when enter is pressed when in winCinematic state", async function () {
                let calls = 0;
                globals.Game.keyCommands = [{ key: "w", description: "Move Up", command: fake.returns(true) }];
                globals.Game.state = GameState.winCinematic;
                globals.window.addEventListener = function (_, cb) {
                    if (calls === 0) {
                        calls++;
                        return cb({ key: "Enter", preventDefault: fake() });
                    } else {
                        return cb({ key: "w", preventDefault: fake() });
                    }
                };

                await globals.Game.handleInput();
                expect(globals.Game.state).to.be.equal(GameState.gameplay);
            });
        });
    });
});
