/* global describe, it, beforeEach, afterEach */

const _ = require("lodash");
const { expect } = require("chai");
const { fake } = require("sinon");
const proxyquire =  require('proxyquire');

const input = require("../test-dist/input");

describe("input-handler", function () {
    let inputHandler;

    function mock(mocks) {
        const defaultMocks = _.extend({
            "./globals": {
                default: {
                    Game: {
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
                    }
                }
            }
        }, mocks);

        inputHandler = proxyquire('../test-dist/input-handler', defaultMocks);
    }

    beforeEach(function () {
        mock();
    });

    afterEach(function () {
        input.default.clearInputs();
    });

    describe("PlayerInputHandler", function () {
        describe("getState", function () {
            it("should return the current state", function () {
                const handler = new inputHandler.PlayerInputHandler();
                expect(handler.getState()).to.be.equal(inputHandler.PlayerState.Combat);
            });
        });

        describe("setState", function () {
            it("should change the current state", function () {
                const handler = new inputHandler.PlayerInputHandler();
                handler.setState(inputHandler.PlayerState.Target);
                expect(handler.getState()).to.be.equal(inputHandler.PlayerState.Target);
            });
        });

        describe("handleInput", function () {
            it("should return a command when its key is pressed", function () {
                const owner = {
                    x: 0,
                    y: 0
                };
                const handler = new inputHandler.PlayerInputHandler();
                handler.setOwner(owner);
                handler.keyCommands = [
                    { key: "w", description: "", command: "Hello" }
                ];
                input.default.pressKey("w");
                const command = handler.handleInput([[]], []);
                expect(command).to.be.equal("Hello");
            });
        });
    });
});
