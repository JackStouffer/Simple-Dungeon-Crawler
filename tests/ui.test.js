/* global describe, it */

import { expect } from "chai";

import { KeyBindingMenu, InventoryMenu, SpellSelectionMenu } from "../src/ui";

describe("ui", function () {
    describe("KeyBindingMenu", function () {
        it("should do nothing when a bad key is pressed", function () {
            const menu = new KeyBindingMenu();
            const commands = [
                { key: "w" },
                { key: "d" }
            ];
            menu.handleInput("d", commands);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should change the current selection when pressing down", function () {
            const menu = new KeyBindingMenu();
            const commands = [
                { key: "w" },
                { key: "d" }
            ];
            menu.handleInput("ArrowDown", commands);
            expect(menu.currentSelection).to.be.equal(1);
        });

        it("should change the current selection when pressing up", function () {
            const menu = new KeyBindingMenu();
            menu.currentSelection = 1;
            const commands = [
                { key: "w" },
                { key: "d" }
            ];
            menu.handleInput("ArrowUp", commands);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should change state when pressing Enter", function () {
            const menu = new KeyBindingMenu();
            const commands = [
                { key: "w" },
                { key: "d" }
            ];
            menu.handleInput("Enter", commands);
            expect(menu.state).to.be.equal("change");
        });

        it("should change bound key", function () {
            const menu = new KeyBindingMenu();
            const commands = [
                { key: "w" }
            ];
            menu.handleInput("Enter", commands);
            menu.handleInput("d", commands);
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
            menu.handleInput("d", items);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should change the current selection when pressing down", function () {
            const menu = new InventoryMenu();
            const items = [
                { id: "test" },
                { id: "test2" }
            ];
            menu.handleInput("ArrowDown", items);
            expect(menu.currentSelection).to.be.equal(1);
        });

        it("should change the current selection when pressing up", function () {
            const menu = new InventoryMenu();
            menu.currentSelection = 1;
            const items = [
                { id: "test" },
                { id: "test2" }
            ];
            menu.handleInput("ArrowUp", items);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should return a command when pressing enter", function () {
            const menu = new InventoryMenu();
            const items = [
                { id: "test" },
                { id: "test2" }
            ];
            const func = menu.handleInput("Enter", items);
            expect(typeof func).to.be.equal("function");
        });
    });

    describe("SpellSelectionMenu", function () {
        it("should do nothing when a bad key is pressed", function () {
            const menu = new SpellSelectionMenu();
            const spells = [
                { id: "test" },
                { id: "test2" }
            ];
            menu.handleInput("d", spells);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should change the current selection when pressing down", function () {
            const menu = new SpellSelectionMenu();
            const spells = [
                { id: "test" },
                { id: "test2" }
            ];
            menu.handleInput("ArrowDown", spells);
            expect(menu.currentSelection).to.be.equal(1);
        });

        it("should change the current selection when pressing up", function () {
            const menu = new SpellSelectionMenu();
            menu.currentSelection = 1;
            const spells = [
                { id: "test" },
                { id: "test2" }
            ];
            menu.handleInput("ArrowUp", spells);
            expect(menu.currentSelection).to.be.equal(0);
        });

        it("should return a command when pressing enter", function () {
            const menu = new SpellSelectionMenu();
            const spells = [
                { id: "test" },
                { id: "test2" }
            ];
            const func = menu.handleInput("Enter", spells);
            expect(typeof func).to.be.equal("function");
        });
    });
});
