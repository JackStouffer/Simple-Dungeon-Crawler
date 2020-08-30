/* global describe, it */

import { expect } from "chai";
import { fake } from "sinon";
import globals from "../src/globals";
import { createObject } from "../src/object";
import { createBurnEffect } from "../src/effects";

globals.Game = {
    player: null,
    displayMessage: fake()
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
});
