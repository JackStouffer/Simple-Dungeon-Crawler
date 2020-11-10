/* global describe, it, afterEach */

const { expect } = require("chai");
const input = require("../test-dist/input").default;

describe("input", function () {
    afterEach(function () {
        input.clearInputs();
    });

    describe("isDown", function () {
        it("should return false if a button is not pressed", function () {
            input.pressKey("d");
            expect(input.isDown("w")).to.be.false;
        });

        it("should return true if a button is pressed", function () {
            input.pressKey("w");
            expect(input.isDown("w")).to.be.true;
        });
    });

    describe("getFirstKeyPressed", function () {
        it("should return null if no keys are pressed", function () {
            expect(input.getFirstKeyPressed()).to.be.null;
        });

        it("should return the first key pressed", function () {
            input.pressKey("w");
            input.pressKey("d");
            expect(input.getFirstKeyPressed()).to.be.equal("w");
        });
    });
});
