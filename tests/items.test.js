/* global describe, beforeEach, it */

import { expect } from "chai";
import { fake, stub } from "sinon";

import globals from "../src/globals";
import {
    castHeal,
    castDamageSpell,
    castWildDamageSpell
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
                x: 0,
                y: 0
            }]
        };
    });

    describe("castHeal", function () {
        it("should heal the user with it's data value", function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                }
            };
            const callback = fake();

            castHeal({ value: 10 }, user, callback);
            expect(user.fighter.heal.calledOnce).to.be.true;
            expect(user.fighter.heal.calledWith(10)).to.be.true;
            expect(callback.calledOnce).to.be.true;
            expect(callback.calledWith(true)).to.be.true;
        });
    });

    describe("castDamageSpell", function () {
        it("should damage the target and return true to the callback when enemy is selected", function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                }
            };

            const callback = fake();
            castDamageSpell({ value: 10, damageType: DamageType.fire }, user, callback);
            expect(callback.calledOnce).to.be.true;
            expect(callback.calledWith(true)).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.takeDamage.calledOnce).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.takeDamage.calledWith(user, 10, DamageType.fire)).to.be.true;
        });

        it("should add a status effect", function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                }
            };
            globals.Game.gameObjects[0].fighter.ailmentSusceptibility = 1;
            const statusEffectFunc = fake.returns({ name: "test" });
            const callback = fake();

            castDamageSpell({ value: 10, damageType: DamageType.fire, statusEffectFunc }, user, callback);
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledOnce).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledWith({ name: "test" })).to.be.true;
        });

        it("should not damage the target and return false to the callback when no enemy is found", function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                }
            };
            globals.Game.gameObjects = [];

            const callback = fake();
            castDamageSpell({ value: 10, damageType: DamageType.fire }, user, callback);
            expect(callback.calledOnce).to.be.true;
            expect(callback.calledWith(false)).to.be.true;
        });
    });

    describe("castWildDamageSpell", function () {
        it("should damage the target and return true to the callback", function () {
            const user = {
                fighter: {
                    hp: 0,
                    maxHp: 10,
                    heal: fake()
                },
                x: 0,
                y: 0
            };

            const callback = fake();
            castWildDamageSpell({ value: 10, damageType: DamageType.fire }, user, callback);
            expect(callback.calledOnce).to.be.true;
            expect(callback.calledWith(true)).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.takeDamage.calledOnce).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.takeDamage.calledWith(user, 10, DamageType.fire)).to.be.true;
        });

        it("should add a status effect", function () {
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
            const callback = fake();

            castWildDamageSpell({ value: 10, damageType: DamageType.fire, statusEffectFunc }, user, callback);
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledOnce).to.be.true;
            expect(globals.Game.gameObjects[0].fighter.addStatusEffect.calledWith({ name: "test" })).to.be.true;
        });

        it("should not damage the target and return false to the callback when no enemy is found", function () {
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

            const callback = fake();
            castWildDamageSpell({ value: 10, damageType: DamageType.fire }, user, callback);
            expect(callback.calledOnce).to.be.true;
            expect(callback.calledWith(false)).to.be.true;
        });
    });
});
