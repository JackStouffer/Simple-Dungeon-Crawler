/* global ENV */

"use strict";

import globals from "./globals";
import {
    WIDTH,
    HEIGHT,
    UI_HEIGHT,
    MAP_FILLED_SPACE,
    MAP_EMPTY_SPACE,
    LEVEL_UP_BASE,
    LEVEL_UP_FACTOR
} from "./data";
import { useItemCommand, useSpellCommand } from "./commands";

export function drawUI(display, player) {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < UI_HEIGHT; y++) {
            display.draw(x, HEIGHT - (UI_HEIGHT - y), MAP_FILLED_SPACE, "blue", "blue");
        }
    }

    const stats = player.fighter.getEffectiveStats();

    display.drawText(1, HEIGHT - UI_HEIGHT, "%c{white}%b{blue}HP: " + stats.hp + "/" + stats.maxHp);
    display.drawText(14, HEIGHT - UI_HEIGHT, "%c{white}%b{blue}Mana: " + stats.mana + "/" + stats.maxMana);
    display.drawText(30, HEIGHT - UI_HEIGHT, "%c{white}%b{blue}STR: " + stats.strength);
    display.drawText(38, HEIGHT - UI_HEIGHT, "%c{white}%b{blue}DEF: " + stats.defense);
    display.drawText(54, HEIGHT - UI_HEIGHT, "%c{white}%b{blue}EXP: " + player.fighter.experience + "/" + (LEVEL_UP_BASE + player.fighter.level * LEVEL_UP_FACTOR));
}

export function clearScreen(display) {
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            display.draw(x, y, MAP_EMPTY_SPACE, "black", "black");
        }
    }
}

export function displayMessage(text, type = "default") {
    if (ENV === "TEST") { return; }

    const log = globals.document.getElementById("log");
    const el = document.createElement("div");
    const p = document.createElement("p");
    const small = document.createElement("p");
    p.innerHTML = `${text}`;

    if (type === "tutorial") {
        el.className = "tutorial";
    } else {
        small.innerHTML = `<small>Turn: ${globals.Game.getTurnNumber()}</small>`;
    }

    el.appendChild(p);
    el.appendChild(small);
    log.appendChild(el);

    while (log.children.length > 100) {
        log.children[0].remove();
    }

    log.scrollTop = log.scrollHeight;
}

class InventoryMenu {
    constructor() {
        this.currentSelection = 0;
        this.allowedKeys = new Set(["ArrowDown", "ArrowUp", "Enter"]);
    }

    resetState() {
        this.currentSelection = 0;
    }

    draw(inventoryItems) {
        // add four for header
        const height = inventoryItems.length + UI_HEIGHT;

        // draw background
        for (let w = 0; w < WIDTH; w++) {
            for (let h = 0; h < height; h++) {
                if (w === 0 || h === 0 || w === WIDTH - 1 || h === height - 1) {
                    globals.Game.display.draw(w, h, "1", "grey", "grey");
                } else {
                    globals.Game.display.draw(w, h, "1", "black", "black");
                }
            }
        }

        globals.Game.display.drawText(2, 1, "%c{white}%b{black}Player Inventory");
        for (let i = 0; i < inventoryItems.length; i++) {
            let displayString;
            if (i === this.currentSelection) {
                displayString = `%c{white}%b{grey}${inventoryItems[i].displayName} (${inventoryItems[i].count})`;
            } else {
                displayString = `%c{white}%b{black}${inventoryItems[i].displayName} (${inventoryItems[i].count})`;
            }
            globals.Game.display.drawText(2, i + 3, displayString);
        }
    }

    handleInput(key, inventoryItems) {
        if (!this.allowedKeys.has(key)) {
            return null;
        }

        if (key === "Enter") {
            return useItemCommand(inventoryItems[this.currentSelection].id);
        }

        if (key === "ArrowUp" && this.currentSelection > 0) {
            this.currentSelection--;
        }

        if (key === "ArrowDown" && this.currentSelection < inventoryItems.length - 1) {
            this.currentSelection++;
        }

        return null;
    }
}
export { InventoryMenu };

class SpellSelectionMenu {
    constructor() {
        this.currentSelection = 0;
        this.allowedKeys = new Set(["ArrowDown", "ArrowUp", "Enter"]);
    }

    resetState() {
        this.currentSelection = 0;
    }

    draw(spells) {
        // add four for header
        const height = spells.length + UI_HEIGHT;

        // draw background
        for (let w = 0; w < WIDTH; w++) {
            for (let h = 0; h < height; h++) {
                if (w === 0 || h === 0 || w === WIDTH - 1 || h === height - 1) {
                    globals.Game.display.draw(w, h, "1", "grey", "grey");
                } else {
                    globals.Game.display.draw(w, h, "1", "black", "black");
                }
            }
        }

        globals.Game.display.drawText(2, 1, "%c{white}%b{black}Spells");
        for (let i = 0; i < spells.length; i++) {
            const spell = spells[i];
            let displaySettings;

            if (i === this.currentSelection) {
                displaySettings = "%c{white}%b{grey}";
            } else {
                displaySettings = "%c{white}%b{black}";
            }

            globals.Game.display.drawText(2, i + 3, displaySettings + ` ${spell.displayName}`);

            let infoString = "%c{white}%b{black}";
            switch (spell.type) {
                case "damage":
                    infoString += `dmg: ${spell.value}`;
                    break;
                case "effect":
                    infoString += `turns: ${spell.value}`;
                    break;
                case "heal":
                    infoString += `health: ${spell.value}`;
                    break;
                default: break;
            }
            globals.Game.display.drawText(25, i + 3, infoString);

            globals.Game.display.drawText(40, i + 3, `%c{white}%b{black}cost: ${spell.manaCost}`);
        }
    }

    handleInput(key, spells) {
        if (!this.allowedKeys.has(key)) {
            return null;
        }

        if (key === "Enter") {
            return useSpellCommand(spells[this.currentSelection].id);
        }

        if (key === "ArrowUp" && this.currentSelection > 0) {
            this.currentSelection--;
        }

        if (key === "ArrowDown" && this.currentSelection < spells.length - 1) {
            this.currentSelection++;
        }

        return null;
    }
}
export { SpellSelectionMenu };

class KeyBindingMenu {
    constructor() {
        this.state = "selection";
        this.currentSelection = 0;
    }

    resetState() {
        this.state = "selection";
        this.currentSelection = 0;
    }

    draw(keyCommands) {
        // add one for header
        const height = keyCommands.length + UI_HEIGHT + 4;
        const width = WIDTH;

        // draw background
        for (let w = 0; w < width; w++) {
            for (let h = 0; h < height; h++) {
                if (w === 0 || h === 0 || w === width - 1 || h === height - 1) {
                    globals.Game.display.draw(w, h, "1", "grey", "grey");
                } else {
                    globals.Game.display.draw(w, h, "1", "black", "black");
                }
            }
        }

        globals.Game.display.drawText(2, 1, "%c{white}%b{black} Keyboard Bindings");
        globals.Game.display.drawText(2, 3, "%c{white}%b{black} Use the arrow keys to select a binding, and enter to change it");
        globals.Game.display.drawText(2, 5, "%c{white}%b{black} Use Escape to exit");

        for (let i = 0; i < keyCommands.length; i++) {
            const key = keyCommands[i].key;

            if (i === this.currentSelection) {
                if (this.state === "selection") {
                    globals.Game.display.drawText(
                        2, i + 7,
                        "%c{white}%b{grey} " + keyCommands[i].description + ": " + key
                    );
                } else {
                    globals.Game.display.drawText(
                        2, i + 7,
                        "%c{white}%b{grey} " + keyCommands[i].description + ":"
                    );
                }
            } else {
                globals.Game.display.drawText(
                    2, i + 7,
                    "%c{white}%b{black} " + keyCommands[i].description + ": " + key
                );
            }
        }
    }

    handleInput(key, keyCommands) {
        if (this.state === "selection") {
            const allowedSelectionKeys = new Set(["ArrowDown", "ArrowUp", "Enter", "Escape"]);

            if (!allowedSelectionKeys.has(key)) {
                return;
            }

            if (key === "Escape") {
                return;
            }

            if (key === "ArrowUp" && this.currentSelection > 0) {
                this.currentSelection--;
            }

            if (key === "ArrowDown" && this.currentSelection < keyCommands.length - 1) {
                this.currentSelection++;
            }

            if (key === "Enter") {
                this.state = "change";
            }
        } else if (this.state === "change") {
            keyCommands[this.currentSelection].key = key;
            this.state = "selection";
        }
    }
}
export { KeyBindingMenu };
