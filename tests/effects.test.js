/* global describe, it */

import { expect } from "chai";
import globals from "../src/globals";
import { createObject } from "../src/object";
import { createBurnEffect, createHasteEffect, createSlowEffect } from "../src/effects";

globals.Game = {
    player: null
};

describe("effects", function () {
    describe("createBurnEffect", function () {
        it("should create a burn Effect object", function () {
            const obj = createObject("goblin");
            const effect = createBurnEffect(obj, 10, 5);
            expect(effect.name).to.be.equal("Burn");
            expect(effect.owner).to.be.equal(obj);
            expect(effect.turns).to.be.equal(5);
        });

        it("should damage the owner and reduce the turns when the callback is called", function () {
            const obj = createObject("goblin");
            const health = obj.fighter.hp;
            const effect = createBurnEffect(obj, 10, 5);
            effect.act();
            expect(obj.fighter.hp).to.be.lessThan(health);
            expect(effect.turns).to.be.equal(4);
        });
    });

    describe("createHasteEffect", function () {
        it("should create a haste Effect object", function () {
            const obj = createObject("goblin");
            const effect = createHasteEffect(obj, 2);
            expect(effect.name).to.be.equal("Haste");
            expect(effect.owner).to.be.equal(obj);
            expect(effect.turns).to.be.equal(2);
        });

        it("should increase the user's speed", function () {
            const obj = createObject("goblin");
            const speed = obj.fighter.getSpeed();
            createHasteEffect(obj, 2);
            expect(obj.getSpeed()).to.be.equal(speed * 2);
        });

        it("should put the original speed back when the effect ends", function () {
            const obj = createObject("goblin");
            const speed = obj.fighter.getSpeed();
            const effect = createHasteEffect(obj, 1);
            effect.act();
            expect(obj.getSpeed()).to.be.equal(speed);
        });
    });

    describe("createSlowEffect", function () {
        it("should create a slow Effect object", function () {
            const obj = createObject("goblin");
            const effect = createSlowEffect(obj, 2);
            expect(effect.name).to.be.equal("Slow");
            expect(effect.owner).to.be.equal(obj);
            expect(effect.turns).to.be.equal(2);
        });

        it("should decrease the user's speed", function () {
            const obj = createObject("goblin");
            const speed = obj.fighter.getSpeed();
            createSlowEffect(obj, 2);
            expect(obj.getSpeed()).to.be.equal(speed / 2);
        });

        it("should put the original speed back when the effect ends", function () {
            const obj = createObject("goblin");
            const speed = obj.fighter.getSpeed();
            const effect = createSlowEffect(obj, 1);
            effect.act();
            expect(obj.getSpeed()).to.be.equal(speed);
        });
    });
});
