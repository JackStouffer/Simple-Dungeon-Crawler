/* global describe, it, beforeEach, afterEach */

import { expect } from "chai";
import { fake } from "sinon";

import globals from "../src/globals";
import input from "../src/input";
import { PlayerInputHandler, PlayerState } from "../src/input-handler";

describe("input-handler", function () {
    beforeEach(function () {
        globals.Game = {
            player: {
                x: 0,
                y: 0
            },
            map: [[]],
            gameObjects: [],
            display: {
                eventToPosition: fake()
            },
            gameCamera: {
                screenToWorld: fake()
            }
        };
    });

    afterEach(function () {
        input.clearInputs();
    });

    describe("PlayerInputHandler", function () {
        describe("getState", function () {
            it("should return the current state", function () {
                const handler = new PlayerInputHandler();
                expect(handler.getState()).to.be.equal(PlayerState.Combat);
            });
        });

        describe("setState", function () {
            it("should change the current state", function () {
                const handler = new PlayerInputHandler();
                handler.setState(PlayerState.Target);
                expect(handler.getState()).to.be.equal(PlayerState.Target);
            });
        });

        describe("handleInput", function () {
            it("should return a command when its key is pressed", function () {
                const handler = new PlayerInputHandler();
                handler.keyCommands = [
                    { key: "w", description: "", command: "Hello" }
                ];
                input.pressKey("w");
                const command = handler.handleInput(globals.Game.map, globals.Game.gameObjects);
                expect(command).to.be.equal("Hello");
            });
        });
    });
});
