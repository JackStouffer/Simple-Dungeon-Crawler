/* global describe, beforeEach, it */

import { expect } from "chai";
import { fake, stub } from "sinon";

import globals from "../src/globals";
import {
    castHeal,
    castDamageSpell,
    castWildDamageSpell,
    castConfuse,
    castClairvoyance
} from "../src/items";
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
                    addStatusEffect: fake()
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
        });
    });
});
