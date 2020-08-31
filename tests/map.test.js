/* global describe, beforeEach, it */

import { expect } from "chai";
import { fake } from "sinon";
import {
    Tile,
    findEmptySpace,
    isBlocked,
    isSightBlocked,
    drawTile,
    getClosestVisibleFighter,
    drawMap
} from "../src/map";
import {
    COLOR_INVISIBLE_GROUND,
    COLOR_INVISIBLE_WALL,
    COLOR_DARK_GROUND,
    COLOR_DARK_WALL
} from "../src/data";

describe("map", function () {
    let map;
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
    let display;

    beforeEach(function () {
        map = [
            [new Tile(...emptySpaceData), new Tile(...emptySpaceData), new Tile(...filledSpaceData)],
            [new Tile(...emptySpaceData), new Tile(...emptySpaceData), new Tile(...emptySpaceData)],
            [new Tile(...filledSpaceData), new Tile(...filledSpaceData), new Tile(...filledSpaceData)]
        ];
        display = {
            draw: fake()
        };
    });

    describe("findEmptySpace", function () {
        it("should return an empty space", function () {
            const { x, y } = findEmptySpace(map, []);
            expect(map[y][x].blocks).to.be.false;
        });

        it("should not return an empty space if it has a blocking object on it", function () {
            map = [
                [new Tile(...emptySpaceData), new Tile(...emptySpaceData)],
            ];
            const { x, y } = findEmptySpace(map, [{ x: 0, y: 0, blocks: true }]);
            expect(x).to.be.equal(1);
            expect(y).to.be.equal(0);
        });
    });

    describe("isBlocked", function () {
        it("should return true if the space on the map is blocked", function () {
            expect(isBlocked(map, [], 0, 3)).to.be.true;
        });

        it("should return null if the space on the map is empty", function () {
            expect(isBlocked(map, [], 0, 0)).to.be.equal(null);
        });

        it("should return the blocking object if it's on the space", function () {
            expect(isBlocked(map, [{ x: 0, y: 0, blocks: true }], 0, 0)).to.be.deep.equal({ x: 0, y: 0, blocks: true });
        });
    });

    describe("isSightBlocked", function () {
        it("should return true if the space on the map blocks sight", function () {
            expect(isSightBlocked(map, [], 0, 3)).to.be.true;
        });

        it("should return false if the space on the map does not block sight", function () {
            expect(isSightBlocked(map, [], 0, 0)).to.be.equal(false);
        });

        it("should return true if an object on the spot blocks sight", function () {
            expect(isSightBlocked(map, [{ x: 0, y: 0, blocksSight: true }], 0, 0)).to.be.deep.equal(true);
        });
    });

    describe("drawTile", function () {
        it("should draw a non-blocking tile invisible when it's not visible or explored", function () {
            const tile = new Tile(...emptySpaceData);
            drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", COLOR_INVISIBLE_GROUND, COLOR_INVISIBLE_GROUND)).to.be.true;
        });

        it("should draw a blocking tile invisible when it's not visible or explored", function () {
            const tile = new Tile(...filledSpaceData);
            drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", COLOR_INVISIBLE_WALL, COLOR_INVISIBLE_WALL)).to.be.true;
        });

        it("should draw a non-blocking tile as dark when it's explored but not visible", function () {
            const tile = new Tile(...emptySpaceData);
            tile.explored = true;
            drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", COLOR_DARK_GROUND, COLOR_DARK_GROUND)).to.be.true;
        });

        it("should draw a blocking tile as dark when it's explored but not visible", function () {
            const tile = new Tile(...filledSpaceData);
            tile.explored = true;
            drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", COLOR_DARK_WALL, COLOR_DARK_WALL)).to.be.true;
        });

        it("should draw a non-blocking tile with the light color when visible", function () {
            const tile = new Tile(...emptySpaceData);
            tile.explored = true;
            tile.visible = true;
            tile.lightingColor = "#ffffff";
            drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", "white", "#ffffff")).to.be.true;
        });

        it("should draw a non-blocking tile with the fgcolor when visible", function () {
            const tile = new Tile(...filledSpaceData);
            tile.explored = true;
            tile.visible = true;
            tile.lightingColor = "#ffffff";
            drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", "grey", "grey")).to.be.true;
        });
    });

    describe("getClosestVisibleFighter", function () {
        it("should return the closest fighter", function () {
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    map[y][x].visible = true;
                }
            }

            const gameObjects = [{ name: "test1", x: 2, y: 1, fighter: {} }, { name: "test2", x: 2, y: 0, fighter: {} }];
            const actor = getClosestVisibleFighter(map, gameObjects, { x: 0, y: 0 }, 8);
            expect(actor.name).to.be.equal("test2");
        });

        it("should not return the closest fighter if it's not visible", function () {
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    map[y][x].visible = true;
                }
            }
            map[0][2].visible = false;

            const gameObjects = [{ name: "test1", x: 2, y: 1, fighter: {} }, { name: "test2", x: 2, y: 0, fighter: {} }];
            const actor = getClosestVisibleFighter(map, gameObjects, { x: 0, y: 0 }, 8);
            expect(actor.name).to.be.equal("test1");
        });

        it("should return null if no fighter is within minimum range", function () {
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    map[y][x].visible = true;
                }
            }

            const gameObjects = [{ name: "test1", x: 2, y: 1, fighter: {} }];
            const actor = getClosestVisibleFighter(map, gameObjects, { x: 0, y: 0 }, 1);
            expect(actor).to.be.equal(null);
        });
    });

    describe("drawMap", function () {
        it("should call draw on all tiles", function () {
            drawMap(display, map);
            expect(display.draw.callCount).to.be.equal(9);
        });
    });
});
