/* global describe, it, beforeEach */

import { expect } from "chai";
import { fake } from "sinon";

import globals from "../src/globals";
import { ObjectData, DamageType, Affinity } from "../src/data";
import { GameObject, createObject, enemyDeathCallback, removeDeathCallback } from "../src/object";

describe("object", function () {
    describe("GameObject", function () {
        describe("act", function () {
            it("should call the act functions for both the fighter and ai", async function () {
                const obj = new GameObject("", 0, 0, "test");
                const ai = { act: fake.returns(Promise.resolve()), setOwner: fake() };
                const fighter = { act: fake.returns(Promise.resolve()), setOwner: fake() };
                obj.setAI(ai);
                obj.setFighter(fighter);
                await obj.act();

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
                ai: "basic_monster_ai",
                fighter: "basic_fighter",
                inventory: "basic_inventory",
                interactable: null,
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
                    [DamageType.physical]: Affinity.normal,
                    [DamageType.fire]: Affinity.normal,
                    [DamageType.lightning]: Affinity.normal,
                    [DamageType.ice]: Affinity.normal,
                    [DamageType.nature]: Affinity.normal
                },
                inventoryPool: [
                    ["health_potion_weak", 0.25]
                ],
                onDeath: "default"
            };
        });

        it("should set the name of the object", function () {
            const obj = createObject("test_object");
            expect(obj.type).to.be.equal("test_object");
        });

        describe("ai", function () {
            it("should set the ai to the basic monster ai", function () {
                ObjectData["test_object"].ai = "basic_monster_ai";
                const obj = createObject("test_object");
                expect(obj.ai.constructor.name).to.be.equal("BasicMonsterAI");
                expect(obj.ai.sightRange).to.be.equal(ObjectData["test_object"].sightRange);
                expect(obj.ai.owner).to.be.deep.equal(obj);
            });

            it("should set the ai to the patrolling monster ai", function () {
                ObjectData["test_object"].ai = "patrolling_monster_ai";
                const obj = createObject("test_object");
                expect(obj.ai.constructor.name).to.be.equal("PatrollingMonsterAI");
                expect(obj.ai.sightRange).to.be.equal(ObjectData["test_object"].sightRange);
                expect(obj.ai.owner).to.be.deep.equal(obj);
            });

            it("should set the ai to the chest ai", function () {
                ObjectData["test_object"].ai = "chest_ai";
                ObjectData["test_object"].emptyColor = "black";
                const obj = createObject("test_object");
                expect(obj.ai.constructor.name).to.be.equal("ChestAI");
                expect(obj.ai.bgColor).to.be.equal(ObjectData["test_object"].bgColor);
                expect(obj.ai.emptyColor).to.be.equal(ObjectData["test_object"].emptyColor);
                expect(obj.ai.owner).to.be.deep.equal(obj);
            });

            it("should set the ai to the dropped item ai", function () {
                ObjectData["test_object"].ai = "dropped_item_ai";
                const obj = createObject("test_object");
                expect(obj.ai.constructor.name).to.be.equal("DroppedItemAI");
                expect(obj.ai.owner).to.be.deep.equal(obj);
            });

            it("should throw an error when using an unkown ai type", function () {
                ObjectData["test_object"].ai = "aaaaa";
                expect(() => createObject("test_object")).to.throw();
            });
        });

        describe("graphics", function () {
            it("should set the graphics to basic graphics", function () {
                ObjectData["test_object"].graphics = "basic_graphics";
                const obj = createObject("test_object");
                expect(obj.graphics.constructor.name).to.be.equal("BasicGraphics");
                expect(obj.graphics.char).to.be.equal(ObjectData["test_object"].char);
                expect(obj.graphics.fgColor).to.be.equal(ObjectData["test_object"].fgColor);
                expect(obj.graphics.bgColor).to.be.equal(ObjectData["test_object"].bgColor);
                expect(obj.graphics.owner).to.be.deep.equal(obj);
            });

            it("should set the graphics to drawn after seen", function () {
                ObjectData["test_object"].graphics = "draw_after_seen";
                const obj = createObject("test_object");
                expect(obj.graphics.constructor.name).to.be.equal("DrawAfterSeen");
                expect(obj.graphics.char).to.be.equal(ObjectData["test_object"].char);
                expect(obj.graphics.fgColor).to.be.equal(ObjectData["test_object"].fgColor);
                expect(obj.graphics.bgColor).to.be.equal(ObjectData["test_object"].bgColor);
                expect(obj.graphics.owner).to.be.deep.equal(obj);
            });

            it("should throw an error when using an unkown graphics type", function () {
                ObjectData["test_object"].graphics = "aaaaa";
                expect(() => createObject("test_object")).to.throw();
            });
        });

        describe("lighting", function () {
            it("should set the lighting to reflectivity", function () {
                ObjectData["test_object"].lighting = "reflectivity";
                ObjectData["test_object"].lightingColor = "white";
                ObjectData["test_object"].lightingRange = 8;
                const obj = createObject("test_object");
                expect(obj.lighting.constructor.name).to.be.equal("ReflectivityLighting");
                expect(obj.lighting.color).to.be.equal(ObjectData["test_object"].lightingColor);
                expect(obj.lighting.range).to.be.equal(ObjectData["test_object"].lightingRange);
                expect(obj.lighting.owner).to.be.deep.equal(obj);
            });

            it("should set the lighting to player lighting", function () {
                ObjectData["test_object"].lighting = "player_lighting";
                ObjectData["test_object"].lightingColor = "white";
                ObjectData["test_object"].lightingRange = 8;
                const obj = createObject("test_object");
                expect(obj.lighting.constructor.name).to.be.equal("PlayerLighting");
                expect(obj.lighting.color).to.be.equal(ObjectData["test_object"].lightingColor);
                expect(obj.lighting.range).to.be.equal(ObjectData["test_object"].lightingRange);
                expect(obj.lighting.owner).to.be.deep.equal(obj);
            });

            it("should throw an error when using an unkown lighting type", function () {
                ObjectData["test_object"].lighting = "aaaaa";
                expect(() => createObject("test_object")).to.throw();
            });
        });

        describe("fighter", function () {
            it("should set the death callback to enemyDeathCallback", function () {
                ObjectData["test_object"].onDeath = "default";
                ObjectData["test_object"].fighter = "basic_fighter";
                const obj = createObject("test_object");
                expect(obj.fighter.deathCallback.name).to.be.equal("enemyDeathCallback");
            });

            it("should set the death callback to removeDeathCallback", function () {
                ObjectData["test_object"].onDeath = "remove_from_world";
                ObjectData["test_object"].fighter = "basic_fighter";
                const obj = createObject("test_object");
                expect(obj.fighter.deathCallback.name).to.be.equal("removeDeathCallback");
            });

            it("should throw an error when using an unkown death callback", function () {
                ObjectData["test_object"].onDeath = "aaaaa";
                ObjectData["test_object"].fighter = "basic_fighter";
                expect(() => createObject("test_object")).to.throw();
            });

            it("should set the fighter to basic fighter", function () {
                ObjectData["test_object"].onDeath = "default";
                ObjectData["test_object"].fighter = "basic_fighter";
                const obj = createObject("test_object");
                expect(obj.fighter.constructor.name).to.be.equal("BasicFighter");
                expect(obj.fighter.hp).to.be.equal(ObjectData["test_object"].maxHp);
                expect(obj.fighter.mana).to.be.equal(ObjectData["test_object"].maxMana);
                expect(obj.fighter.level).to.be.equal(ObjectData["test_object"].level);
                expect(obj.fighter.owner).to.be.deep.equal(obj);
            });

            it("should throw an error when using an unkown fighter type", function () {
                ObjectData["test_object"].onDeath = "default";
                ObjectData["test_object"].fighter = "aaaaa";
                expect(() => createObject("test_object")).to.throw();
            });
        });

        describe("inventory", function () {
            it("should set the inventory to basic inventory", function () {
                ObjectData["test_object"].inventory = "basic_inventory";
                const obj = createObject("test_object");
                expect(obj.inventoryComponent.constructor.name).to.be.equal("BasicInventory");
                expect(obj.inventoryComponent.owner).to.be.deep.equal(obj);
            });

            it("should populate the inventory with items from the pool", function () {
                ObjectData["test_object"].inventoryPool = [
                    ["health_potion_weak", 1]
                ];
                const obj = createObject("test_object");
                expect(obj.inventoryComponent.getItems()).to.be.deep.equal([{
                    id: "health_potion_weak",
                    count: 1,
                    displayName: "Weak Potion of Healing"
                }]);
            });

            it("should throw an error when using an unkown inventory type", function () {
                ObjectData["test_object"].inventory = "aaaaa";
                expect(() => createObject("test_object")).to.throw();
            });
        });

        describe("interactable", function () {
            it("should set the interactable to give items", function () {
                ObjectData["test_object"].interactable = "give_items_interactable";
                const obj = createObject("test_object");
                expect(obj.interactable.constructor.name).to.be.equal("GiveItemsInteractable");
                expect(obj.interactable.owner).to.be.deep.equal(obj);
            });

            it("should set the interactable to give spell", function () {
                ObjectData["test_object"].interactable = "give_spell_interactable";
                const obj = createObject("test_object");
                expect(obj.interactable.constructor.name).to.be.equal("GiveSpellInteractable");
                expect(obj.interactable.owner).to.be.deep.equal(obj);
            });

            it("should set the interactable to load level", function () {
                ObjectData["test_object"].interactable = "load_level_interactable";
                const obj = createObject("test_object");
                expect(obj.interactable.constructor.name).to.be.equal("LoadLevelInteractable");
                expect(obj.interactable.owner).to.be.deep.equal(obj);
            });

            it("should set the interactable to door", function () {
                ObjectData["test_object"].interactable = "door_interactable";
                const obj = createObject("test_object");
                expect(obj.interactable.constructor.name).to.be.equal("DoorInteractable");
                expect(obj.interactable.owner).to.be.deep.equal(obj);
            });

            it("should throw an error when using an unkown interactable type", function () {
                ObjectData["test_object"].interactable = "aaaaa";
                expect(() => createObject("test_object")).to.throw();
            });
        });
    });

    describe("enemyDeathCallback", function () {
        beforeEach(function () {
            globals.Game = {
                gameObjects: [],
                addObject: function (e) {
                    this.gameObjects.push(e);
                }
            };
        });

        it("should modify the game object", function () {
            const target = {
                name: "test",
                fighter: {},
                graphics: {},
                blocks: true,
                ai: {},
                interactable: {},
                inventoryComponent: {
                    getItems: fake.returns([])
                }
            };
            enemyDeathCallback(target);
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
            const inventoryComponent = {
                getItems: fake.returns([{ id: "test1", count: 1 }, { id: "test2", count: 2 }])
            };
            const target = {
                name: "test",
                fighter: {},
                graphics: {},
                blocks: true,
                ai: {},
                interactable: {},
                inventoryComponent
            };
            enemyDeathCallback(target);
            expect(globals.Game.gameObjects).to.have.lengthOf(1);
            expect(globals.Game.gameObjects[0].inventoryComponent).to.be.deep.equal(inventoryComponent);
        });
    });

    describe("removeDeathCallback", function () {
        beforeEach(function () {
            globals.Game = {
                gameObjects: [],
                addObject: function (e) {
                    this.gameObjects.push(e);
                },
                removeObject: fake()
            };
        });

        it("should modify the game object", function () {
            const target = {
                name: "test",
                fighter: {},
                graphics: {},
                blocks: true,
                ai: {},
                interactable: {},
                inventoryComponent: {
                    getItems: fake.returns([])
                }
            };
            removeDeathCallback(target);
            expect(globals.Game.removeObject.calledWith(target)).to.be.true;
        });

        it("should add items in inventory to the world as dropped items", function () {
            const inventoryComponent = {
                getItems: fake.returns([{ id: "test1", count: 1 }, { id: "test2", count: 2 }])
            };
            const target = {
                name: "test",
                fighter: {},
                graphics: {},
                blocks: true,
                ai: {},
                interactable: {},
                inventoryComponent
            };
            removeDeathCallback(target);
            expect(globals.Game.gameObjects).to.have.lengthOf(1);
            expect(globals.Game.gameObjects[0].inventoryComponent).to.be.deep.equal(inventoryComponent);
        });
    });
});
