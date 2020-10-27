/* global describe, it, afterEach */

import { expect } from "chai";

import input from "../src/input";
import { KeyBindingMenu, InventoryMenu, SpellSelectionMenu } from "../src/ui";

describe("ui", function () {
    afterEach(function () {
        input.clearInputs();
    });

    describe("KeyBindingMenu", function () {
        it("should do nothing when a bad key is pressed", function () {
            const menu = new KeyBindingMenu();
            const commands = [
                { key: "w" },
                { key: "d" }
            ];
            input.pressKey("d");
            menu.handleInput(commands);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should change the current selection when pressing down", function () {
            const menu = new KeyBindingMenu();
            const commands = [
                { key: "w" },
                { key: "d" }
            ];
            input.pressKey("ArrowDown");
            menu.handleInput(commands);
            expect(menu.currentSelection).to.be.equal(1);
        });

        it("should change the current selection when pressing up", function () {
            const menu = new KeyBindingMenu();
            menu.currentSelection = 1;
            const commands = [
                { key: "w" },
                { key: "d" }
            ];
            input.pressKey("ArrowUp");
            menu.handleInput(commands);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should change state when pressing Enter", function () {
            const menu = new KeyBindingMenu();
            const commands = [
                { key: "w" },
                { key: "d" }
            ];
            input.pressKey("Enter");
            menu.handleInput(commands);
            expect(menu.state).to.be.equal("change");
        });

        it("should change bound key", function () {
            const menu = new KeyBindingMenu();
            const commands = [
                { key: "w" }
            ];
            input.pressKey("Enter");
            menu.handleInput(commands);
            input.clearInputs();
            input.pressKey("d");
            menu.handleInput(commands);
            expect(commands[0].key).to.be.equal("d");
        });
    });

    describe("InventoryMenu", function () {
        it("should do nothing when a bad key is pressed", function () {
            const menu = new InventoryMenu();
            const items = [
                { id: "test" },
                { id: "test2" }
            ];
            input.pressKey("j");
            menu.handleInput(items);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should change the current selection when pressing down", function () {
            const menu = new InventoryMenu();
            const items = [
                { id: "test" },
                { id: "test2" }
            ];
            input.pressKey("ArrowDown");
            menu.handleInput(items);
            expect(menu.currentSelection).to.be.equal(1);
        });

        it("should change the current selection when pressing up", function () {
            const menu = new InventoryMenu();
            menu.currentSelection = 1;
            const items = [
                { id: "test" },
                { id: "test2" }
            ];
            input.pressKey("ArrowUp");
            menu.handleInput(items);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should return item details when pressing enter", function () {
            const menu = new InventoryMenu();
            const items = [
                { id: "test" },
                { id: "test2" }
            ];
            input.pressKey("Enter");
            const item = menu.handleInput(items);
            expect(item).to.be.deep.equal({ id: "test" });
        });
    });

    describe("SpellSelectionMenu", function () {
        it("should do nothing when a bad key is pressed", function () {
            const menu = new SpellSelectionMenu();
            const spells = [
                { id: "test" },
                { id: "test2" }
            ];
            input.pressKey("d");
            menu.handleInput(spells);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should change the current selection when pressing down", function () {
            const menu = new SpellSelectionMenu();
            const spells = [
                { id: "test" },
                { id: "test2" }
            ];
            input.pressKey("ArrowDown");
            menu.handleInput(spells);
            expect(menu.currentSelection).to.be.equal(1);
        });

        it("should change the current selection when pressing up", function () {
            const menu = new SpellSelectionMenu();
            menu.currentSelection = 1;
            const spells = [
                { id: "test" },
                { id: "test2" }
            ];
            input.pressKey("ArrowUp");
            menu.handleInput(spells);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should return spell details when pressing enter", function () {
            const menu = new SpellSelectionMenu();
            const spells = [
                { id: "test" },
                { id: "test2" }
            ];
            input.pressKey("Enter");
            const spell = menu.handleInput(spells);
            expect(spell).to.be.deep.equal({ id: "test" });
        });
    });
});
