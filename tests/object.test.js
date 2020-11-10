/* global describe, it, beforeEach */

const _ = require("lodash");
const { expect } = require("chai");
const { fake } = require("sinon");
const proxyquire =  require('proxyquire');

const {
    ObjectData,
    DeathType,
    DamageType,
    Affinity
} = require("../test-dist/data");

class MockAI {
    setOwner() {}
}

class MockInventory {
    setOwner() {}
    constructor() {
        this.addItem = fake();
    }
}

class MockFighter {
    _data = null;
    deathCallback = null;
    setOwner() {}
    constructor(data, cb) {
        this._data = data;
        this.deathCallback = cb;
    }
}

class MockInteractable {
    owner = null;
    setOwner() {}
    interact() {}
}

class MockLighting {
    setOwner() {}
}

class MockInputHandler {
    setOwner() {}
}

describe("object", function () {
    let objectModule, addObjectFake, removeObjectFake;

    function mock(mocks) {
        const defaultMocks = _.extend({
            "./ai/components": {
                PlanningAI: MockAI,
                ChestAI: MockAI,
                DroppedItemAI: MockAI
            },
            "./globals": {
                default: {
                    Game: {
                        player: {},
                        addObject: addObjectFake,
                        removeObject: removeObjectFake
                    },
                    gameEventEmitter: {
                        emit: fake()
                    }
                }
            },
            "./inventory": {
                BasicInventory: MockInventory
            },
            "./interactable": {
                GiveItemsInteractable: MockInteractable,
                GiveSpellInteractable: MockInteractable,
                LoadLevelInteractable: MockInteractable,
                DoorInteractable: MockInteractable
            },
            "./input-handler": {
                PlayerInputHandler: MockInputHandler
            },
            "./fighter": {
                BasicFighter: MockFighter
            },
            "./lighting": {
                ReflectivityLighting: MockLighting,
                PlayerLighting: MockLighting
            },
            "./ui": {
                displayMessage: fake()
            }
        }, mocks);

        objectModule = proxyquire('../test-dist/object', defaultMocks);
    }

    beforeEach(() => {
        addObjectFake = fake();
        removeObjectFake = fake();
        mock();
    });

    describe("GameObject", function () {
        describe("act", function () {
            it("should call the act functions for both the fighter and ai", function () {
                const obj = new objectModule.GameObject("", 0, 0, "test");
                const ai = { act: fake.returns(null), setOwner: fake() };
                const fighter = { act: fake.returns(null), setOwner: fake() };
                obj.setAI(ai);
                obj.setFighter(fighter);
                obj.act();

                expect(ai.act.calledOnce).to.be.true;
                expect(fighter.act.calledOnce).to.be.true;
            });
        });
    });

    describe("createObject", function () {
        beforeEach(function () {
            ObjectData["test_object"] = {
                name: "Test Object",
                graphics: "basic_graphics",
                ai: null,
                fighter: "basic_fighter",
                spells: [],
                actions: [],
                inventory: "basic_inventory",
                interactable: null,
                lighting: null,
                char: "t",
                fgColor: "green",
                bgColor: "transparent",
                blocks: true,
                blocksSight: false,
                level: 3,
                experience: 0,
                experienceGiven: 50,
                maxHp: 50,
                maxMana: 10,
                strength: 3,
                defense: 1,
                sightRange: 7,
                damageAffinity: {
                    [DamageType.Physical]: Affinity.normal,
                    [DamageType.Fire]: Affinity.normal,
                    [DamageType.Electric]: Affinity.normal,
                    [DamageType.Water]: Affinity.normal,
                    [DamageType.Nature]: Affinity.normal
                },
                actions: [
                    "wander",
                    "chase",
                    "goToEnemy",
                    "meleeAttack"
                ],
                inventoryPool: [
                    ["health_potion_weak", 0.25]
                ],
                onDeath: DeathType.Default
            };
        });

        it("should set the name of the object", function () {
            const obj = objectModule.createObject("test_object");
            expect(obj.type).to.be.equal("test_object");
        });

        describe("ai", function () {
            it("should set the ai", function () {
                ObjectData["test_object"].ai = "chest_ai";
                ObjectData["test_object"].emptyColor = "black";
                const obj = objectModule.createObject("test_object");
                expect(obj.ai).to.be.not.null;
            });

            it("should throw an error when using an unknown ai type", function () {
                ObjectData["test_object"].ai = "aaaaa";
                expect(() => objectModule.createObject("test_object")).to.throw();
            });
        });

        describe("graphics", function () {
            it("should set the graphics", function () {
                ObjectData["test_object"].graphics = "basic_graphics";
                const obj = objectModule.createObject("test_object");
                expect(obj.graphics).to.be.not.null;
            });

            it("should throw an error when using an unknown graphics type", function () {
                ObjectData["test_object"].graphics = "aaaaa";
                expect(() => objectModule.createObject("test_object")).to.throw();
            });
        });

        describe("lighting", function () {
            it("should set the lighting", function () {
                ObjectData["test_object"].lighting = "reflectivity";
                ObjectData["test_object"].lightingColor = "white";
                ObjectData["test_object"].lightingRange = 8;
                const obj = objectModule.createObject("test_object");
                expect(obj.lighting).to.be.not.null;
            });

            it("should throw an error when using an unknown lighting type", function () {
                ObjectData["test_object"].lighting = "aaaaa";
                expect(() => objectModule.createObject("test_object")).to.throw();
            });
        });

        describe("fighter", function () {
            it("should set the death callback", function () {
                ObjectData["test_object"].onDeath = DeathType.Default;
                ObjectData["test_object"].fighter = "basic_fighter";
                const obj = objectModule.createObject("test_object");
                expect(obj.fighter.deathCallback).to.be.not.null;
            });

            it("should throw an error when using an unknown death callback", function () {
                ObjectData["test_object"].onDeath = "aaaaa";
                ObjectData["test_object"].fighter = "basic_fighter";
                expect(() => objectModule.createObject("test_object")).to.throw();
            });

            it("should set the fighter data", function () {
                ObjectData["test_object"].onDeath = DeathType.Default;
                ObjectData["test_object"].fighter = "basic_fighter";
                const obj = objectModule.createObject("test_object");
                expect(obj.fighter._data.maxHp).to.be.equal(ObjectData["test_object"].maxHp);
                expect(obj.fighter._data.maxMana).to.be.equal(ObjectData["test_object"].maxMana);
            });

            it("should throw an error when using an unknown fighter type", function () {
                ObjectData["test_object"].onDeath = "default";
                ObjectData["test_object"].fighter = "aaaaa";
                expect(() => objectModule.createObject("test_object")).to.throw();
            });
        });

        describe("inventory", function () {
            it("should set the inventory", function () {
                ObjectData["test_object"].inventory = "basic_inventory";
                const obj = objectModule.createObject("test_object");
                expect(obj.inventory).to.be.not.null;
            });

            it("should populate the inventory with items from the pool", function () {
                ObjectData["test_object"].inventoryPool = [
                    {
                        itemID: "health_potion_weak",
                        probability: 1
                    }
                ];
                const obj = objectModule.createObject("test_object");
                expect(obj.inventory.addItem.calledWith("health_potion_weak")).to.be.true;
            });

            it("should throw an error when using an unknown inventory type", function () {
                ObjectData["test_object"].inventory = "aaaaa";
                expect(() => objectModule.createObject("test_object")).to.throw();
            });
        });

        describe("interactable", function () {
            it("should set the interactable", function () {
                ObjectData["test_object"].interactable = "give_items_interactable";
                const obj = objectModule.createObject("test_object");
                expect(obj.interactable).to.be.not.null;
            });

            it("should throw an error when using an unknown interactable type", function () {
                ObjectData["test_object"].interactable = "aaaaa";
                expect(() => objectModule.createObject("test_object")).to.throw();
            });
        });
    });

    describe("enemyDeathCallback", function () {
        it("should modify the game object", function () {
            const target = {
                name: "test",
                fighter: {},
                graphics: {},
                blocks: true,
                ai: {},
                interactable: {},
                inventory: {
                    getItems: fake.returns([])
                },
                setAI: function (ai) {
                    this.ai = ai;
                },
                setGraphics: function (g) {
                    this.graphics = g;
                },
                setInteractable: function (i) {
                    this.interactable = i;
                },
                setFighter: function (f) {
                    this.fighter = f;
                }
            };
            objectModule.enemyDeathCallback(target);
            expect(target.graphics.char).to.be.equal("%");
            expect(target.graphics.fgColor).to.be.equal("black");
            expect(target.graphics.bgColor).to.be.equal("red");
            expect(target.blocks).to.be.false;
            expect(target.fighter).to.be.equal(null);
            expect(target.ai).to.be.equal(null);
            expect(target.interactable).to.be.equal(null);
            expect(target.name).to.be.equal("Remains of a test");
        });

        it("should add items in inventory to the world as dropped items", function () {
            const inventory = {
                getItems: fake.returns([{ id: "test1", count: 1 }, { id: "test2", count: 2 }])
            };
            const target = {
                name: "test",
                fighter: {},
                graphics: {},
                blocks: true,
                ai: {},
                interactable: {},
                inventory,
                setAI: function (ai) {
                    this.ai = ai;
                },
                setGraphics: function (g) {
                    this.graphics = g;
                },
                setInteractable: function (i) {
                    this.interactable = i;
                },
                setFighter: function (f) {
                    this.fighter = f;
                }
            };
            objectModule.enemyDeathCallback(target);
            expect(inventory.getItems.calledOnce).to.be.true;
            expect(addObjectFake.calledOnce).to.be.true;
        });
    });

    describe("removeDeathCallback", function () {
        it("should modify the game object", function () {
            const target = {
                name: "test",
                fighter: {},
                graphics: {},
                blocks: true,
                ai: {},
                interactable: {},
                inventory: {
                    getItems: fake.returns([])
                }
            };
            objectModule.removeDeathCallback(target);
            expect(removeObjectFake.calledWith(target)).to.be.true;
        });

        it("should add items in inventory to the world as dropped items", function () {
            const inventory = {
                getItems: fake.returns([{ id: "test1", count: 1 }, { id: "test2", count: 2 }])
            };
            const target = {
                name: "test",
                fighter: {},
                graphics: {},
                blocks: true,
                ai: {},
                interactable: {},
                inventory
            };
            objectModule.removeDeathCallback(target);
            expect(inventory.getItems.calledOnce).to.be.true;
            expect(addObjectFake.calledOnce).to.be.true;
        });
    });
});
