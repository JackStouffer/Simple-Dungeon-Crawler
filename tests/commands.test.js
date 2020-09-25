/* global describe, it, beforeEach */

import { expect } from "chai";
import { fake } from "sinon";

import globals from "../src/globals";
import { Tile } from "../src/map";
import {
    moveCommand,
    getItemCommand,
    openInventoryCommand,
    openSpellsCommand
} from "../src/commands";
import { GameState } from "../src/data";

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
            render: fake(),
            display: {
                draw: fake(),
                drawText: fake()
            },
            state: "gameplay"
        };
        globals.window = {
            removeEventListener: fake()
        };
    });

    describe("moveCommand", function () {
        it("should move the player up", function () {
            const player = { x: 1, y: 1 };
            const func = moveCommand(0, 8);
            func(player);
            expect(player.x).to.be.equal(1);
            expect(player.y).to.be.equal(0);
        });

        it("should move the player down", function () {
            const player = { x: 0, y: 0 };
            const func = moveCommand(4, 8);
            func(player);
            expect(player.x).to.be.equal(0);
            expect(player.y).to.be.equal(1);
        });

        it("should move the player left", function () {
            const player = { x: 1, y: 1 };
            const func = moveCommand(6, 8);
            func(player);
            expect(player.x).to.be.equal(0);
            expect(player.y).to.be.equal(1);
        });

        it("should move the player right", function () {
            const player = { x: 1, y: 1 };
            const func = moveCommand(2, 8);
            func(player);
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
            const func = moveCommand(2, 8);
            func(player);
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
            const func = moveCommand(2, 8);
            func(player);
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
            const func = getItemCommand();
            expect(func(owner)).to.be.true;
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
            const func = getItemCommand();
            expect(func(owner)).to.be.false;
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
            const func = getItemCommand();
            expect(func(owner)).to.be.false;
            expect(globals.Game.gameObjects[0].interactable.interact.calledOnce).to.be.false;
        });
    });

    describe("openInventoryCommand", function () {
        it("should put the game into inventory menu state", function () {
            const owner = {
                ai: {
                    state: "normal"
                },
                inventoryComponent: {
                    getNamesAndCounts: fake.returns([])
                }
            };
            const func = openInventoryCommand();
            func(owner);
            expect(globals.Game.state).to.be.equal(GameState.inventoryMenu);
        });
    });

    describe("openSpellsCommand", function () {
        it("should put the game into spell menu state", function () {
            const owner = {
                ai: {
                    state: "normal"
                },
                fighter: {
                    getKnownSpells: fake.returns([])
                }
            };
            const func = openSpellsCommand();
            func(owner);
            expect(globals.Game.state).to.be.equal(GameState.spellMenu);
        });
    });
});
