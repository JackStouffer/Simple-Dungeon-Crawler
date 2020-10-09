/* global describe, beforeEach, it */

import { expect } from "chai";
import { fake } from "sinon";
import {
    Tile,
    loadTiledMap,
    findEmptySpace,
    isBlocked,
    isSightBlocked,
    drawTile,
    getRandomFighterWithinRange,
    drawMap
} from "../src/map";
import {
    COLOR_INVISIBLE_GROUND,
    COLOR_INVISIBLE_WALL,
    COLOR_DARK_GROUND,
    LevelData,
    TileData,
    ItemData
} from "../src/data";
import testMap from "./test-data/map";

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
    LevelData["test"] = testMap;
    ItemData["test"] = {
        displayName: "test"
    };

    beforeEach(function () {
        map = [
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
        display = {
            draw: fake()
        };
    });

    describe("loadTiledMap", function () {
        it("should load tile data into Tiles", function () {
            const { map } = loadTiledMap("test");
            expect(map[0][0]).to.be.deep.equal(new Tile(
                TileData[1048].name,
                TileData[1048].char,
                TileData[1048].fgColor,
                TileData[1048].bgColor,
                TileData[1048].fgColorExplored,
                TileData[1048].bgColorExplored,
                TileData[1048].blocks,
                TileData[1048].blocksSight
            ));
        });

        it("should set the player location correctly", function () {
            const { playerLocation } = loadTiledMap("test");
            expect(playerLocation[0]).to.be.equal(27);
            expect(playerLocation[1]).to.be.equal(23);
        });

        it("should load a game object correctly", function () {
            const { objects } = loadTiledMap("test");
            expect(objects[0].type).to.be.equal("goblin");
            expect(objects[0].x).to.be.equal(40);
            expect(objects[0].y).to.be.equal(15);
        });

        it("should add inventory items to an object", function () {
            ItemData["test"] = {
                displayName: "Test Item"
            };
            const { objects } = loadTiledMap("test");
            expect(objects[1].type).to.be.equal("chest");
            expect(objects[1].inventoryComponent.getItems()).to.be.deep.equal([{
                id: "test",
                count: 1,
                displayName: "Test Item"
            }]);
        });

        it("should set the level to load for a load level interactable", function () {
            const { objects } = loadTiledMap("test");
            expect(objects[2].type).to.be.equal("load_door");
            expect(objects[2].interactable.levelName).to.be.equal("test_level");
        });

        it("should set the spell for a set spell interactable", function () {
            const { objects } = loadTiledMap("test");
            expect(objects[3].type).to.be.equal("magic_shrine");
            expect(objects[3].interactable.spellId).to.be.equal("test_spell");
        });
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
            const { object, blocks } = isBlocked(map, [], 0, 3);
            expect(blocks).to.be.true;
            expect(object).to.be.null;
        });

        it("should return false if the space on the map is not blocked", function () {
            const { object, blocks } = isBlocked(map, [], 0, 0);
            expect(blocks).to.be.false;
            expect(object).to.be.null;
        });

        it("should return the blocking object if it's on the space", function () {
            const { object, blocks } = isBlocked(map, [{ x: 0, y: 0, blocks: true }], 0, 0);
            expect(object).to.be.deep.equal({ x: 0, y: 0, blocks: true });
            expect(blocks).to.be.true;
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
            expect(
                isSightBlocked(map, [{ x: 0, y: 0, blocksSight: true }], 0, 0)
            ).to.be.deep.equal(true);
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

        it("should draw a blocking tile with its explored color when it's explored but not visible", function () {
            const tile = new Tile(...filledSpaceData);
            tile.explored = true;
            drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", "black", "black")).to.be.true;
        });

        it("should draw a non-blocking tile with the light color when visible", function () {
            const tile = new Tile(...emptySpaceData);
            tile.explored = true;
            tile.visible = true;
            tile.lightingColor = "#ffffff";
            drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", "white", "#ffffff")).to.be.true;
        });

        it("should draw a non-blocking tile with the fgColor when visible", function () {
            const tile = new Tile(...filledSpaceData);
            tile.explored = true;
            tile.visible = true;
            tile.lightingColor = "#ffffff";
            drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", "grey", "grey")).to.be.true;
        });
    });

    describe("getRandomFighterWithinRange", function () {
        it("should return the a fighter", function () {
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    map[y][x].visible = true;
                }
            }

            const gameObjects = [{ name: "test1", x: 2, y: 1, fighter: {}, ai: {} }];
            const actor = getRandomFighterWithinRange(map, gameObjects, { x: 0, y: 0 }, 8);
            expect(actor.name).to.be.equal("test1");
        });

        it("should return null if no fighter is within minimum range", function () {
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    map[y][x].visible = true;
                }
            }

            const gameObjects = [{ name: "test1", x: 2, y: 1, fighter: {}, ai: {} }];
            const actor = getRandomFighterWithinRange(map, gameObjects, { x: 0, y: 0 }, 1);
            expect(actor).to.be.equal(null);
        });
    });

    describe("drawMap", function () {
        it("should call draw on all tiles", function () {
            const camera = {
                worldToScreen: function (x, y) {
                    return { x, y };
                }
            };
            drawMap(display, camera, map);
            expect(display.draw.callCount).to.be.equal(9);
        });
    });
});
