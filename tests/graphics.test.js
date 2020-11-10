/* global describe, it, beforeEach */

const _ = require("lodash");
const { expect } = require("chai");
const { fake } = require("sinon");
const proxyquire =  require('proxyquire');

describe("graphics", function () {
    let graphics, display, camera;

    function mock(mocks) {
        const defaultMocks = _.extend({
            "./globals": {
                default: {
                    Game: {
                        player: {}
                    }
                }
            }
        }, mocks);

        graphics = proxyquire('../test-dist/graphics', defaultMocks);
    }

    beforeEach(() => {
        mock();

        display = {
            draw: fake()
        };
        camera = {
            worldToScreen: function (x, y) {
                return { x, y };
            }
        };
    });

    describe("BasicGraphics", function () {
        it("should draw to the screen if the map tile is visible and lit", function () {
            const owner = {
                x: 0,
                y: 0,
                graphics: new graphics.BasicGraphics({
                    char: "T",
                    fgColor: "white",
                    bgColor: "black"
                })
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, camera, [[{ isVisibleAndLit: fake.returns(true) }]]);
            expect(display.draw.calledWith(0, 0, "T", "white", "black")).to.be.true;
        });

        it("should not draw to the screen if the map tile is not visible and lit", function () {
            const owner = {
                x: 0,
                y: 0,
                graphics: new graphics.BasicGraphics({
                    char: "T",
                    fgColor: "white",
                    bgColor: "black"
                })
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, camera, [[{ isVisibleAndLit: fake.returns(false) }]]);
            expect(display.draw.calledOnce).to.be.false;
        });
    });

    describe("TransparencyGraphics", function () {
        it("should draw to the screen if the map tile is visible and lit", function () {
            const map = [[{
                fgColor: "green",
                bgColor: "red",
                lightingColor: "red",
                isVisibleAndLit: fake.returns(true)
            }]];
            const objects = [];
            const owner = {
                x: 0,
                y: 0,
                graphics: new graphics.TransparencyGraphics({
                    char: "T",
                    fgColor: "white"
                })
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, camera, map, objects);
            expect(display.draw.calledWith(0, 0, "T", "white", "red")).to.be.true;
        });

        it("should not draw to the screen if the map tile is not visible and lit", function () {
            const map = [[{
                fgColor: "green",
                bgColor: "red",
                lightingColor: "red",
                isVisibleAndLit: fake.returns(false)
            }]];
            const objects = [];
            const owner = {
                x: 0,
                y: 0,
                graphics: new graphics.TransparencyGraphics({
                    char: "T",
                    fgColor: "white"
                })
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, camera, map, objects);
            expect(display.draw.calledOnce).to.be.false;
        });

        it("should draw the background color of the object on the same tile", function () {
            const map = [[{
                fgColor: "green",
                bgColor: "red",
                lightingColor: "red",
                isVisibleAndLit: fake.returns(true)
            }]];
            const objects = [{
                x: 0,
                y: 0,
                graphics: {
                    fgColor: "purple",
                    bgColor: "yellow"
                }
            }];
            const owner = {
                x: 0,
                y: 0,
                graphics: new graphics.TransparencyGraphics({
                    char: "T",
                    fgColor: "white"
                })
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, camera, map, objects);
            expect(display.draw.calledWith(0, 0, "T", "white", "yellow")).to.be.true;
        });

        it("should not draw the background color of the object on a different tile", function () {
            const map = [[{
                fgColor: "green",
                bgColor: "red",
                lightingColor: "red",
                isVisibleAndLit: fake.returns(true)
            }]];
            const objects = [{
                x: 1,
                y: 1,
                graphics: {
                    fgColor: "purple",
                    bgColor: "yellow"
                }
            }];
            const owner = {
                x: 0,
                y: 0,
                graphics: new graphics.TransparencyGraphics({
                    char: "T",
                    fgColor: "white"
                })
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, camera, map, objects);
            expect(display.draw.calledWith(0, 0, "T", "white", "red")).to.be.true;
        });
    });

    describe("DrawAfterSeen", function () {
        it("should draw to the screen if the map tile has been explored", function () {
            const owner = {
                x: 0,
                y: 0,
                graphics: new graphics.DrawAfterSeen({
                    char: "T",
                    fgColor: "white",
                    bgColor: "black"
                })
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, camera, [[{ explored: true }]]);
            expect(display.draw.calledWith(0, 0, "T", "white", "black")).to.be.true;
        });

        it("should not draw to the screen if the map tile has not been explored", function () {
            const owner = {
                x: 0,
                y: 0,
                graphics: new graphics.DrawAfterSeen({
                    char: "T",
                    fgColor: "white",
                    bgColor: "black"
                })
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, camera, [[{ explored: false }]]);
            expect(display.draw.calledOnce).to.be.false;
        });
    });
});
