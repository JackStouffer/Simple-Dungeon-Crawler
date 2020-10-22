/* global describe, it, before */

import { expect } from "chai";
import globals from "../src/globals";
import { ObjectData, DeathType, DamageType, Affinity } from "../src/data";
import { createObject } from "../src/object";
import { createBurnEffect, createHasteEffect, createSlowEffect, StatisticEffect } from "../src/effects";

globals.Game = {
    player: null
};

describe("effects", function () {
    before(function () {
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

    describe("createBurnEffect", function () {
        it("should create a burn StatusEffect object", function () {
            const obj = createObject("test");
            const effect = createBurnEffect(obj, 10, 5);
            expect(effect.name).to.be.equal("Burn");
            expect(effect.owner).to.be.equal(obj);
            expect(effect.turns).to.be.equal(5);
        });

        it("should damage the owner and reduce the turns when the callback is called", function () {
            const obj = createObject("test");
            const health = obj.fighter.getEffectiveStats().hp;
            const effect = createBurnEffect(obj, 10, 5);
            effect.act();
            expect(obj.fighter.getEffectiveStats().hp).to.be.lessThan(health);
            expect(effect.turns).to.be.equal(4);
        });
    });

    describe("createHasteEffect", function () {
        it("should create a haste StatisticEffect object", function () {
            const obj = createObject("test");
            const effect = createHasteEffect(obj, 2);
            expect(effect.name).to.be.equal("Haste");
            expect(effect.owner).to.be.equal(obj);
            expect(effect.turns).to.be.equal(2);
        });
    });

    describe("createSlowEffect", function () {
        it("should create a slow StatisticEffect object", function () {
            const obj = createObject("test");
            const effect = createSlowEffect(obj, 2);
            expect(effect.name).to.be.equal("Slow");
            expect(effect.owner).to.be.equal(obj);
            expect(effect.turns).to.be.equal(2);
        });
    });

    describe("StatisticEffect", function () {
        it("should modify a base stat by multiplication", function () {
            const base = {
                hp: 10,
                speed: 12,
                strength: 7
            };
            const effect = new StatisticEffect(
                null,
                "test",
                1,
                { stat: "speed", type: "multiply", value: 0.5 }
            );
            const res = effect.modifyStats(base);
            expect(res).to.be.deep.equal({
                hp: 10,
                speed: 6,
                strength: 7
            });
        });

        it("should modify a base stat by addition", function () {
            const base = {
                hp: 10,
                speed: 12,
                strength: 7
            };
            const effect = new StatisticEffect(
                null,
                "test",
                1,
                { stat: "strength", type: "add", value: 4 }
            );
            const res = effect.modifyStats(base);
            expect(res).to.be.deep.equal({
                hp: 10,
                speed: 12,
                strength: 11
            });
        });
    });
});
