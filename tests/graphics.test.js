/* global describe, it, beforeEach */

import { expect } from "chai";
import { fake } from "sinon";
import {
    BasicGraphics,
    DrawAfterSeen,
    TransparencyGraphics
} from "../src/graphics";

describe("graphics", function () {
    let display;

    beforeEach(function () {
        display = {
            draw: fake()
        };
    });

    describe("BasicGraphics", function () {
        it("should draw to the screen if the map tile is visible and lit", function () {
            const owner = {
                x: 0,
                y: 0,
                graphics: new BasicGraphics("T", "white", "black")
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, [[{ isVisibleAndLit: fake.returns(true) }]]);
            expect(display.draw.calledWith(0, 0, "T", "white", "black")).to.be.true;
        });

        it("should not draw to the screen if the map tile is not visible and lit", function () {
            const owner = {
                x: 0,
                y: 0,
                graphics: new BasicGraphics("T", "white", "black")
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, [[{ isVisibleAndLit: fake.returns(false) }]]);
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
                graphics: new TransparencyGraphics("T", "white")
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, map, objects);
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
                graphics: new TransparencyGraphics("T", "white")
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, map, objects);
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
                graphics: new TransparencyGraphics("T", "white")
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, map, objects);
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
                graphics: new TransparencyGraphics("T", "white")
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, map, objects);
            expect(display.draw.calledWith(0, 0, "T", "white", "red")).to.be.true;
        });
    });

    describe("DrawAfterSeen", function () {
        it("should draw to the screen if the map tile has been explored", function () {
            const owner = {
                x: 0,
                y: 0,
                graphics: new DrawAfterSeen("T", "white", "black")
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, [[{ explored: true }]]);
            expect(display.draw.calledWith(0, 0, "T", "white", "black")).to.be.true;
        });

        it("should not draw to the screen if the map tile has not been explored", function () {
            const owner = {
                x: 0,
                y: 0,
                graphics: new DrawAfterSeen("T", "white", "black")
            };
            owner.graphics.setOwner(owner);
            owner.graphics.draw(display, [[{ explored: false }]]);
            expect(display.draw.calledOnce).to.be.false;
        });
    });
});
