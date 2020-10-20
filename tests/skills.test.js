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
} from "../src/skills";
import { createHasteEffect, createSlowEffect } from "../src/effects";
import { DamageType } from "../src/data";

describe("skills", function () {
    beforeEach(() => {
        globals.Game = {
            player: null,
            render: fake(),
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
                    addStatisticEffect: fake(),
                    getSpeed: fake.returns(1),
                    getEffectiveStats: fake.returns({
                        ailmentSusceptibility: 1
                    })
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
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10,
                    })
                }
            };

            const used = await castHeal({ value: 10 }, user);
            expect(user.fighter.heal.calledOnce).to.be.true;
            expect(user.fighter.heal.calledWith(10)).to.be.true;
            expect(used).to.be.true;
        });
    });

    describe("castDamageSpell", function () {
        it("should damage the target and return true to the callback when enemy is selected", function () {
            const user = {
                fighter: {
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10,
                    })
                }
            };

            const used = castDamageSpell(
                { value: 10, damageType: DamageType.fire },
                user,
                globals.Game.gameObjects[0]
            );
            expect(used).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.takeDamage.calledOnce).to.be.true;
            expect(
                globals
                    .Game
                    .gameObjects[0]
                    .fighter
                    .takeDamage.calledWith(10, false, DamageType.fire)
            ).to.be.true;
        });

        it("should add a status effect", function () {
            const user = {
                fighter: {
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10
                    })
                }
            };
            const statusEffectFunc = fake.returns({ name: "test" });

            const used = castDamageSpell(
                { value: 10, damageType: DamageType.fire, statusEffectFunc },
                user,
                globals.Game.gameObjects[0]
            );
            expect(used).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledOnce).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledWith({ name: "test" })).to.be.true;
        });
    });

    describe("castWildDamageSpell", function () {
        it("should damage the target and return true to the callback", async function () {
            const user = {
                fighter: {
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10,
                    })
                },
                x: 0,
                y: 0
            };

            const used = await castWildDamageSpell(
                { value: 10, damageType: DamageType.fire },
                user
            );
            expect(used).to.be.true;
            expect(
                globals
                    .Game
                    .gameObjects[0]
                    .fighter
                    .takeDamage
                    .calledOnce
            ).to.be.true;
            expect(
                globals
                    .Game
                    .gameObjects[0]
                    .fighter
                    .takeDamage
                    .calledWith(10, false, DamageType.fire)
            ).to.be.true;
        });

        it("should add a status effect", async function () {
            const user = {
                fighter: {
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10,
                    })
                },
                x: 0,
                y: 0
            };
            const statusEffectFunc = fake.returns({ name: "test" });

            const used = await castWildDamageSpell(
                { value: 10, damageType: DamageType.fire, statusEffectFunc },
                user
            );
            expect(used).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledOnce).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledWith({ name: "test" })).to.be.true;
        });

        it("should not damage the target and return false to the callback when no enemy is found", async function () {
            const user = {
                fighter: {
                    heal: fake(),
                    getEffectiveStats: fake.returns({
                        hp: 0,
                        maxHp: 10,
                    })
                },
                x: 0,
                y: 0
            };
            globals.Game.gameObjects = [];

            const used = await castWildDamageSpell(
                { value: 10, damageType: DamageType.fire },
                user
            );
            expect(used).to.be.false;
        });
    });

    describe("castConfuse", function () {
        it("should replace the ai on target and return true", function () {
            const user = {
                fighter: {
                    hp: 10
                }
            };

            const used = castConfuse({ value: 10 }, user, globals.Game.gameObjects[0]);
            expect(used).to.be.true;
            expect(globals.Game.gameObjects[0].ai.constructor.name).to.be.equal("ConfusedAI");
        });
    });

    describe("castClairvoyance", function () {
        it("should set the whole map to explored", function () {
            const user = {};
            globals.Game.map = [
                [{ explored: false }, { explored: false }],
                [{ explored: false }, { explored: false }]
            ];

            const used = castClairvoyance({ value: 10 }, user, globals.Game.gameObjects[0]);

            for (let y = 0; y < globals.Game.map.length; y++) {
                for (let x = 0; x < globals.Game.map[y].length; x++) {
                    expect(globals.Game.map[y][x].explored).to.be.true;
                }
            }

            expect(used).to.be.true;
        });
    });

    describe("castHaste", function () {
        it("should add a Haste effect to the fighters status effects", function () {
            const effects = [];
            const user = {
                fighter: {
                    addStatisticEffect: (e) => effects.push(e),
                    getStatisticEffects: () => effects,
                    getSpeed: () => 1,
                    setSpeed: () => null
                }
            };

            const used = castHaste({ value: 10 }, user);
            expect(effects).to.have.lengthOf(1);
            expect(effects[0].constructor.name).to.be.equal("StatisticEffect");
            expect(effects[0].name).to.be.equal("Haste");
            expect(used).to.be.true;
        });

        it("should give false if there's already a Haste effect on the fighter", function () {
            const effects = [];
            const user = {
                fighter: {
                    addStatisticEffect: (e) => effects.push(e),
                    getStatisticEffects: () => effects,
                    getSpeed: () => 1,
                    setSpeed: () => null
                }
            };
            effects.push(createHasteEffect(user, 1));

            const used = castHaste({ value: 10 }, user);
            expect(effects).to.have.lengthOf(1);
            expect(used).to.be.false;
        });
    });

    describe("castSlow", function () {
        it("should add a Slow effect to the fighters status effects", function () {
            const used = castSlow({ value: 10 }, null, globals.Game.gameObjects[0]);
            expect(globals.Game.gameObjects[0].fighter.addStatisticEffect.calledOnce).to.be.true;
            expect(used).to.be.true;
        });

        it("should give false if there's already a Slow effect on the fighter", function () {
            globals.Game.gameObjects[0].fighter.getStatusEffects = fake.returns(
                [createSlowEffect(globals.Game.gameObjects[0], 1)]
            );

            const used = castSlow({ value: 10 }, null, globals.Game.gameObjects[0]);
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledOnce).to.be.false;
            expect(used).to.be.false;
        });
    });
});
