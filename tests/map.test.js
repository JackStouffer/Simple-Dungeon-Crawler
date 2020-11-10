/* global describe, before, beforeEach, it */

const _ = require("lodash");
const { expect } = require("chai");
const { fake } = require("sinon");
const proxyquire =  require('proxyquire');

const {
    COLOR_DARK_GROUND,
    LevelData,
    TileData,
    ItemData,
    ObjectData,
    DeathType,
    DamageType,
    Affinity
} = require("../test-dist/data");
const testMap = require("./test-data/map");

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
    "brown",
    "brown",
    true,
    true
];

describe("map", function () {
    let mapModule, map, display;

    function mock(mocks) {
        const defaultMocks = _.extend({
            "./globals": {
                default: {
                    Game: {
                        player: {}
                    },
                    gameEventEmitter: {
                        emit: fake()
                    }
                }
            },
            "./object": {
                createObject: (type, x, y) => {
                    return {
                        x, y, type,
                        inventory: {
                            getItems: fake(),
                            addItem: fake()
                        },
                        interactable: {
                            setLevel: fake(),
                            setSpell: fake()
                        }
                    };
                }
            },
            "./ui": {
                displayMessage: fake()
            }
        }, mocks);

        mapModule = proxyquire('../test-dist/map', defaultMocks);
    }

    before(function () {
        LevelData["test"] = testMap;
        ItemData["test"] = {
            displayName: "test"
        };
        ObjectData["test"] = {
            name: "test",
            char: "a",
            fgColor: "white",
            blocks: "white",
            blocksSight: true,
            fighter: "basic_fighter",
            onDeath: DeathType.Default,
            maxHp: 100,
            strength: 0,
            defense: 0,
            damageAffinity: {
                [DamageType.Physical]: Affinity.normal,
                [DamageType.Fire]: Affinity.weak,
                [DamageType.Electric]: Affinity.normal,
                [DamageType.Water]: Affinity.normal,
                [DamageType.Nature]: Affinity.normal
            }
        };
    });

    beforeEach(() => {
        mock();
    });

    beforeEach(function () {
        map = [
            [
                new mapModule.Tile(...emptySpaceData),
                new mapModule.Tile(...emptySpaceData),
                new mapModule.Tile(...filledSpaceData)
            ],
            [
                new mapModule.Tile(...emptySpaceData),
                new mapModule.Tile(...emptySpaceData),
                new mapModule.Tile(...emptySpaceData)
            ],
            [
                new mapModule.Tile(...filledSpaceData),
                new mapModule.Tile(...filledSpaceData),
                new mapModule.Tile(...filledSpaceData)
            ]
        ];
        display = {
            draw: fake()
        };
    });

    describe("loadTiledMap", function () {
        it("should load tile data into Tiles", function () {
            const { map } = mapModule.loadTiledMap("test");
            expect(map[0][0]).to.be.deep.equal(new mapModule.Tile(
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
            const { playerLocation } = mapModule.loadTiledMap("test");
            expect(playerLocation[0]).to.be.equal(27);
            expect(playerLocation[1]).to.be.equal(23);
        });

        it("should load a game object correctly", function () {
            const { objects } = mapModule.loadTiledMap("test");
            expect(objects[0].x).to.be.equal(40);
            expect(objects[0].y).to.be.equal(15);
        });

        it("should add inventory items to an object", function () {
            ItemData["test"] = {
                displayName: "Test Item",
                type: "test",
                value: 10
            };
            const { objects } = mapModule.loadTiledMap("test");
            expect(objects[1].type).to.be.equal("chest");
            expect(objects[1].inventory.addItem.calledOnce).to.be.true;
        });

        it("should set the level to load for a load level interactable", function () {
            const { objects } = mapModule.loadTiledMap("test");
            expect(objects[2].type).to.be.equal("load_door");
            expect(objects[2].interactable.setLevel.calledWith("test_level")).to.be.true;
        });

        it("should set the spell for a set spell interactable", function () {
            const { objects } = mapModule.loadTiledMap("test");
            expect(objects[3].type).to.be.equal("magic_shrine");
            expect(objects[3].interactable.setSpell.calledWith("test_spell")).to.be.true;
        });
    });

    describe("findEmptySpace", function () {
        it("should return an empty space", function () {
            const { x, y } = mapModule.findEmptySpace(map, []);
            expect(map[y][x].blocks).to.be.false;
        });

        it("should not return an empty space if it has a blocking object on it", function () {
            map = [
                [new mapModule.Tile(...emptySpaceData), new mapModule.Tile(...emptySpaceData)],
            ];
            const { x, y } = mapModule.findEmptySpace(map, [{ x: 0, y: 0, blocks: true }]);
            expect(x).to.be.equal(1);
            expect(y).to.be.equal(0);
        });
    });

    describe("isBlocked", function () {
        it("should return true if the space on the map is blocked", function () {
            const { object, blocks } = mapModule.isBlocked(map, [], 0, 3);
            expect(blocks).to.be.true;
            expect(object).to.be.null;
        });

        it("should return false if the space on the map is not blocked", function () {
            const { object, blocks } = mapModule.isBlocked(map, [], 0, 0);
            expect(blocks).to.be.false;
            expect(object).to.be.null;
        });

        it("should return the blocking object if it's on the space", function () {
            const { object, blocks } = mapModule.isBlocked(map, [{ x: 0, y: 0, blocks: true }], 0, 0);
            expect(object).to.be.deep.equal({ x: 0, y: 0, blocks: true });
            expect(blocks).to.be.true;
        });
    });

    describe("isSightBlocked", function () {
        it("should return true if the space on the map blocks sight", function () {
            expect(mapModule.isSightBlocked(map, [], 0, 3)).to.be.true;
        });

        it("should return false if the space on the map does not block sight", function () {
            expect(mapModule.isSightBlocked(map, [], 0, 0)).to.be.equal(false);
        });

        it("should return true if an object on the spot blocks sight", function () {
            expect(
                mapModule.isSightBlocked(map, [{ x: 0, y: 0, blocksSight: true }], 0, 0)
            ).to.be.deep.equal(true);
        });
    });

    describe("drawTile", function () {
        it("should not draw a non-blocking tile when it's invisible", function () {
            const tile = new mapModule.Tile(...emptySpaceData);
            mapModule.drawTile(display, tile, 0, 0);
            expect(display.draw.calledOnce).to.be.false;
        });

        it("should not draw a blocking tile when it's invisible", function () {
            const tile = new mapModule.Tile(...filledSpaceData);
            mapModule.drawTile(display, tile, 0, 0);
            expect(display.draw.calledOnce).to.be.false;
        });

        it("should draw a non-blocking tile as dark when it's explored but not visible", function () {
            const tile = new mapModule.Tile(...emptySpaceData);
            tile.explored = true;
            mapModule.drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", COLOR_DARK_GROUND, COLOR_DARK_GROUND)).to.be.true;
        });

        it("should draw a blocking tile with its explored color when it's explored but not visible", function () {
            const tile = new mapModule.Tile(...filledSpaceData);
            tile.explored = true;
            mapModule.drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", "brown", "brown")).to.be.true;
        });

        it("should draw a non-blocking tile with the light color when visible", function () {
            const tile = new mapModule.Tile(...emptySpaceData);
            tile.explored = true;
            tile.visible = true;
            tile.lightingColor = "#ffffff";
            mapModule.drawTile(display, tile, 0, 0);
            expect(display.draw.calledWith(0, 0, "", "white", "rgb(255,255,255)")).to.be.true;
        });

        it("should draw a non-blocking tile with the fgColor when visible", function () {
            const tile = new mapModule.Tile(...filledSpaceData);
            tile.explored = true;
            tile.visible = true;
            tile.lightingColor = "#ffffff";
            mapModule.drawTile(display, tile, 0, 0);
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
            const actor = mapModule.getRandomFighterWithinRange(map, gameObjects, { x: 0, y: 0 }, 8);
            expect(actor.name).to.be.equal("test1");
        });

        it("should return null if no fighter is within minimum range", function () {
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[y].length; x++) {
                    map[y][x].visible = true;
                }
            }

            const gameObjects = [{ name: "test1", x: 2, y: 1, fighter: {}, ai: {} }];
            const actor = mapModule.getRandomFighterWithinRange(map, gameObjects, { x: 0, y: 0 }, 1);
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
            mapModule.setAllToExplored(map);
            mapModule.drawMap(display, camera, map);
            expect(display.draw.callCount).to.be.equal(9);
        });
    });
});
