/* global describe, it, beforeEach */

import { expect } from "chai";
import { fake } from "sinon";
import { Tile, PatrolNode } from "../../src/map";
import globals from "../../src/globals";
import {
    createPassableCallback,
    createPassableSightCallback,
    createVisibilityCallback,
    BasicMonsterAI,
    ConfusedAI,
    ChestAI,
    DroppedItemAI
} from "../../src/ai/components";

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

describe("ai", function () {
    beforeEach(function () {
        globals.Game = {
            player: {
                x: 0,
                y: 0,
                blocks: true,
                fighter: {}
            },
            gameObjects: [],
            map: [
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
            ],
            removeObject: fake()
        };
        globals.Game.gameObjects.push(globals.Game.player);
    });

    describe("createPassableCallback", function () {
        it("should mark owner space as passable", function () {
            const owner = { x: 1, y: 1 };
            const func = createPassableCallback(owner);
            expect(func(1, 1)).to.be.true;
        });

        it("should mark empty space as passable", function () {
            const owner = { x: 1, y: 1 };
            const func = createPassableCallback(owner);
            expect(func(1, 0)).to.be.true;
        });

        it("should mark filled space as not passable", function () {
            const owner = { x: 1, y: 1 };
            const func = createPassableCallback(owner);
            expect(func(0, 2)).to.be.false;
        });

        it("should mark space as not passable when there's a blocking object on it", function () {
            const owner = { x: 1, y: 1 };
            globals.Game.gameObjects = [{ x: 0, y: 0, blocks: true }];
            const func = createPassableCallback(owner);
            expect(func(0, 0)).to.be.false;
        });
    });

    describe("createPassableSightCallback", function () {
        it("should mark owner space as passable", function () {
            const owner = { x: 1, y: 1 };
            const func = createPassableSightCallback(owner);
            expect(func(1, 1)).to.be.true;
        });

        it("should mark empty space as passable", function () {
            const owner = { x: 1, y: 1 };
            const func = createPassableSightCallback(owner);
            expect(func(0, 0)).to.be.true;
        });

        it("should mark blocking space as not passable", function () {
            const owner = { x: 1, y: 1 };
            const func = createPassableSightCallback(owner);
            expect(func(0, 2)).to.be.false;
        });

        it("should mark blocking space as passable when blocksSight is false", function () {
            const owner = { x: 1, y: 1 };
            const func = createPassableSightCallback(owner);
            globals.Game.map[2][0].blocksSight = false;
            expect(func(0, 2)).to.be.true;
        });

        it("should mark space as not passable when there's a blocking object on it", function () {
            const owner = { x: 1, y: 1 };
            globals.Game.gameObjects = [{ x: 0, y: 0, blocksSight: true }];
            const func = createPassableSightCallback(owner);
            expect(func(0, 0)).to.be.false;
        });

        it("should mark space as passable when there's a object on it but blocks sight is false", function () {
            const owner = { x: 1, y: 1 };
            globals.Game.gameObjects = [{ x: 0, y: 0, blocksSight: false }];
            const func = createPassableSightCallback(owner);
            expect(func(0, 0)).to.be.true;
        });
    });

    describe("createVisibilityCallback", function () {
        it("should mark the ai state as chase when the player is seen", function () {
            const ai = { state: "wander", owner: { name: "test" } };
            const func = createVisibilityCallback(ai);
            func(0, 0, 0, 1);
            expect(ai.state).to.be.equal("chase");
        });
    });

    describe("BasicMonsterAI", function () {
        it("should move in a random direction when in wander state", function () {
            const owner = { x: 1, y: 1, ai: new BasicMonsterAI(0) };
            owner.ai.setOwner(owner);
            const command = owner.ai.act(globals.Game.map, globals.Game.gameObjects);
            command(owner);
            expect(owner.x === 1 && owner.y === 1).to.be.false;
        });

        it("should see the player and change states when player is in range", function () {
            const owner = { x: 2, y: 2, ai: new BasicMonsterAI(8) };
            owner.ai.setOwner(owner);
            const command = owner.ai.act(globals.Game.map, globals.Game.gameObjects);
            command(owner);
            expect(owner.ai.state).to.be.equal("chase");
        });

        it("should attack the player when within one tile", function () {
            const owner = {
                x: 1,
                y: 0,
                ai: new BasicMonsterAI(8),
                fighter: {
                    attack: fake()
                }
            };
            owner.ai.setOwner(owner);
            owner.ai.state = "chase";
            const command = owner.ai.act(globals.Game.map, globals.Game.gameObjects);
            command(owner);
            expect(owner.fighter.attack.calledOnce).to.be.true;
            expect(owner.fighter.attack.calledWith(globals.Game.player)).to.be.true;
        });
    });

    describe("ConfusedAI", function () {
        it("should move in a random direction", function () {
            const owner = {
                x: 1,
                y: 1,
                ai: new BasicMonsterAI(8),
                fighter: {
                    attack: fake()
                }
            };
            owner.ai.setOwner(owner);
            const confusedAI = new ConfusedAI(owner.ai, 1);
            confusedAI.setOwner(owner);
            owner.ai = confusedAI;
            const command = owner.ai.act(globals.Game.map, globals.Game.gameObjects);
            command(owner);
            expect(owner.x === 1 && owner.y === 1).to.be.false;
        });

        it("should replace itself with the old ai", function () {
            const owner = {
                x: 1,
                y: 1,
                ai: new BasicMonsterAI(8),
                fighter: {
                    attack: fake()
                }
            };
            owner.ai.setOwner(owner);
            const confusedAI = new ConfusedAI(owner.ai, 1);
            confusedAI.setOwner(owner);
            owner.ai = confusedAI;

            let command = owner.ai.act(globals.Game.map, globals.Game.gameObjects);
            command(owner);
            command = owner.ai.act(globals.Game.map, globals.Game.gameObjects);

            expect(owner.ai.constructor.name).to.be.equal("BasicMonsterAI");
        });
    });

    describe("ChestAI", function () {
        it("should change the color when empty", function () {
            const owner = {
                inventoryComponent: {
                    getItems: fake.returns([])
                },
                graphics: {
                    bgColor: "test"
                },
                ai: new ChestAI("test", "purple")
            };
            owner.ai.setOwner(owner);
            owner.ai.act(globals.Game.map, globals.Game.gameObjects);
            expect(owner.graphics.bgColor).to.be.equal("purple");
        });

        it("should not change the color when items are in the inventory", function () {
            const owner = {
                inventoryComponent: {
                    getItems: fake.returns([{ id: "test", count: 1 }])
                },
                graphics: {
                    bgColor: "test"
                },
                ai: new ChestAI("test", "purple")
            };
            owner.ai.setOwner(owner);
            owner.ai.act(globals.Game.map, globals.Game.gameObjects);
            expect(owner.graphics.bgColor).to.be.equal("test");
        });
    });

    describe("DroppedItemAI", function () {
        it("should remove itself when inventory is empty", function () {
            const owner = {
                inventoryComponent: {
                    getItems: fake.returns([])
                },
                ai: new DroppedItemAI()
            };
            owner.ai.setOwner(owner);
            owner.ai.act(globals.Game.map, globals.Game.gameObjects);
            expect(globals.Game.removeObject.calledWith(owner)).to.be.true;
        });

        it("should not remove itself when inventory has items", function () {
            const owner = {
                inventoryComponent: {
                    getItems: fake.returns([{ id: "test", count: 1 }])
                },
                ai: new DroppedItemAI()
            };
            owner.ai.setOwner(owner);
            owner.ai.act(globals.Game.map, globals.Game.gameObjects);
            expect(globals.Game.removeObject.calledOnce).to.be.false;
        });
    });
});
