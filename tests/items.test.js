/* global describe, beforeEach, it */

import { expect } from "chai";
import { fake, stub } from "sinon";

import globals from "../src/globals";
import {
    castHeal,
    castDamageSpell,
    castWildDamageSpell,
    castConfuse,
    castClairvoyance,
    castHaste,
    castSlow
} from "../src/items";
import { createHasteEffect, createSlowEffect } from "../src/effects";
import { DamageType } from "../src/data";

describe("items", function () {
    beforeEach(() => {
        globals.Game = {
            player: null,
            displayMessage: fake(),
            drawAll: fake(),
            map: [[{ visible: true }]],
            canvas: {
                addEventListener: function (_, cb) {
                    return cb({ button: 0 });
                },
                removeEventListener: fake()
            },
            display: {
                eventToPosition: stub().returns([0, 0])
            },
            hookMouseLook: fake(),
            unhookMouseLook: fake(),
            gameObjects: [{
                fighter: {
                    takeDamage: fake(),
                    addStatusEffect: fake(),
                    getStatusEffects: fake.returns([]),
                    getSpeed: fake.returns(1)
                },
                ai: { type: "testai" },
                x: 0,
                y: 0
            }]
        };
    });

    describe("castHeal", function () {
        it("should heal the user with it's data value", async function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                }
            };

            const used = await castHeal({ value: 10 }, user);
            expect(user.fighter.heal.calledOnce).to.be.true;
            expect(user.fighter.heal.calledWith(10)).to.be.true;
            expect(used).to.be.true;
        });
    });

    describe("castDamageSpell", function () {
        it("should damage the target and return true to the callback when enemy is selected", async function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                }
            };

            const used = await castDamageSpell({ value: 10, damageType: DamageType.fire }, user);
            expect(used).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.takeDamage.calledOnce).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.takeDamage.calledWith(user, 10, DamageType.fire)).to.be.true;
        });

        it("should add a status effect", async function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                }
            };
            globals.Game.gameObjects[0].fighter.ailmentSusceptibility = 1;
            const statusEffectFunc = fake.returns({ name: "test" });

            const used = await castDamageSpell({ value: 10, damageType: DamageType.fire, statusEffectFunc }, user);
            expect(used).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledOnce).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledWith({ name: "test" })).to.be.true;
        });

        it("should not damage the target and return false to the callback when no enemy is found", async function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                }
            };
            globals.Game.gameObjects = [];

            const used = await castDamageSpell({ value: 10, damageType: DamageType.fire }, user);
            expect(used).to.be.false;
        });
    });

    describe("castWildDamageSpell", function () {
        it("should damage the target and return true to the callback", async function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                },
                x: 0,
                y: 0
            };

            const used = await castWildDamageSpell({ value: 10, damageType: DamageType.fire }, user);
            expect(used).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.takeDamage.calledOnce).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.takeDamage.calledWith(user, 10, DamageType.fire)).to.be.true;
        });

        it("should add a status effect", async function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                },
                x: 0,
                y: 0
            };
            globals.Game.gameObjects[0].fighter.ailmentSusceptibility = 1;
            const statusEffectFunc = fake.returns({ name: "test" });

            const used = await castWildDamageSpell({ value: 10, damageType: DamageType.fire, statusEffectFunc }, user);
            expect(used).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledOnce).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledWith({ name: "test" })).to.be.true;
        });

        it("should not damage the target and return false to the callback when no enemy is found", async function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                },
                x: 0,
                y: 0
            };
            globals.Game.gameObjects = [];

            const used = await castWildDamageSpell({ value: 10, damageType: DamageType.fire }, user);
            expect(used).to.be.false;
        });
    });

    describe("castConfuse", function () {
        it("should replace the ai on target and return true", async function () {
            const user = {
                fighter: {
                    hp: 10
                }
            };

            const used = await castConfuse({ value: 10 }, user);
            expect(used).to.be.true;
            expect(globals.Game.gameObjects[0].ai.constructor.name).to.be.equal("ConfusedAI");
        });

        it("should return false if there are no targets", async function () {
            const user = {
                fighter: {
                    hp: 10
                }
            };
            globals.Game.gameObjects = [];

            const used = await castConfuse({ value: 10 }, user);
            expect(used).to.be.false;
        });
    });

    describe("castClairvoyance", function () {
        it("should set the whole map to explored", async function () {
            const user = {};
            globals.Game.map = [
                [{ explored: false }, { explored: false }],
                [{ explored: false }, { explored: false }]
            ];

            const used = await castClairvoyance({ value: 10 }, user);

            for (let y = 0; y < globals.Game.map.length; y++) {
                for (let x = 0; x < globals.Game.map[y].length; x++) {
                    expect(globals.Game.map[y][x].explored).to.be.true;
                }
            }

            expect(used).to.be.true;
        });
    });

    describe("castHaste", function () {
        it("should add a Haste effect to the fighters status effects", async function () {
            const statusEffects = [];
            const user = {
                fighter: {
                    addStatusEffect: (e) => statusEffects.push(e),
                    getStatusEffects: () => statusEffects,
                    getSpeed: () => 1
                }
            };

            const used = await castHaste({ value: 10 }, user);
            expect(statusEffects).to.have.lengthOf(1);
            expect(statusEffects[0].constructor.name).to.be.equal("Effect");
            expect(statusEffects[0].name).to.be.equal("Haste");
            expect(used).to.be.true;
        });

        it("should give false if there's already a Haste effect on the fighter", async function () {
            const statusEffects = [];
            const user = {
                fighter: {
                    addStatusEffect: (e) => statusEffects.push(e),
                    getStatusEffects: () => statusEffects,
                    getSpeed: () => 1
                }
            };
            statusEffects.push(createHasteEffect(user, 1));

            const used = await castHaste({ value: 10 }, user);
            expect(statusEffects).to.have.lengthOf(1);
            expect(used).to.be.false;
        });
    });

    describe("castSlow", function () {
        it("should add a Slow effect to the fighters status effects", async function () {
            const user = {};

            const used = await castSlow({ value: 10 }, user);
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledOnce).to.be.true;
            expect(used).to.be.true;
        });

        it("should give false if there's already a Slow effect on the fighter", async function () {
            const user = {};
            globals.Game.gameObjects[0].fighter.getStatusEffects = fake.returns([createSlowEffect(globals.Game.gameObjects[0], 1)]);

            const used = await castSlow({ value: 10 }, user);
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledOnce).to.be.false;
            expect(used).to.be.false;
        });
    });
});
