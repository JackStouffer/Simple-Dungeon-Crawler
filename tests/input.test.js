/* global describe, it, afterEach */

import { expect } from "chai";
import input from "../src/input";

describe("input", function () {
    afterEach(function () {
        input.clearInputs();
    });

    describe("isDown", function () {
        it("should return false if a button is not pressed", function () {
            input.press("d");
            expect(input.isDown("w")).to.be.false;
        });

        it("should return true if a button is pressed", function () {
            input.press("w");
            expect(input.isDown("w")).to.be.true;
        });
    });

    describe("getFirstKeyPressed", function () {
        it("should return null if no keys are pressed", function () {
            expect(input.getFirstKeyPressed()).to.be.null;
        });

        it("should return the first key pressed", function () {
            input.press("w");
            input.press("d");
            expect(input.getFirstKeyPressed()).to.be.equal("w");
        });
    });
});
