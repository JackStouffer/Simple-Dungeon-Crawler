/* global ENV */
declare var ENV: any;

import { Display } from "./rot/index";
import globals from "./globals";
import {
    WIDTH,
    HEIGHT,
    UI_HEIGHT,
    MAP_FILLED_SPACE,
    LEVEL_UP_BASE,
    LEVEL_UP_FACTOR
} from "./data";
import { KeyCommand } from "./game";
import { useItemCommand, useSpellCommand } from "./commands";
import { GameObject } from "./object";
import { InventoryItemDetails } from "./inventory";
import { SpellFighterDetails } from "./fighter";

export function drawUI(display: Display, player: GameObject) {
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

export const enum MessageType {
    Default,
    Tutorial,
    Critical
}

export function displayMessage(text: string, type: MessageType = MessageType.Default) {
    if (ENV === "TEST") { return; }

    const log = globals.document.getElementById("log");
    const el = document.createElement("div");
    const p = document.createElement("p");
    const small = document.createElement("p");
    p.innerHTML = `${text}`;

    if (type === MessageType.Tutorial) {
        el.className = "tutorial";
    } else if (type === MessageType.Critical) {
        el.className = "critical";
        small.innerHTML = `<small>Turn: ${globals.Game.getTurnNumber()}</small>`;
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

export class InventoryMenu {
    private currentSelection: number;
    private allowedKeys: Set<string>;

    constructor() {
        this.currentSelection = 0;
        this.allowedKeys = new Set(["ArrowDown", "ArrowUp", "Enter"]);
    }

    resetState() {
        this.currentSelection = 0;
    }

    draw(inventoryItems: InventoryItemDetails[]) {
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

    handleInput(key: string, inventoryItems: InventoryItemDetails[]) {
        if (!this.allowedKeys.has(key)) {
            return null;
        }

        if (key === "Enter") {
            globals.gameEventEmitter.emit("ui.select");
            return useItemCommand(inventoryItems[this.currentSelection].id);
        }

        if (key === "ArrowUp" && this.currentSelection > 0) {
            globals.gameEventEmitter.emit("ui.cursorMove");
            this.currentSelection--;
        }

        if (key === "ArrowDown" && this.currentSelection < inventoryItems.length - 1) {
            globals.gameEventEmitter.emit("ui.cursorMove");
            this.currentSelection++;
        }

        return null;
    }
}

export class SpellSelectionMenu {
    private currentSelection: number;
    private allowedKeys: Set<string>;

    constructor() {
        this.currentSelection = 0;
        this.allowedKeys = new Set(["ArrowDown", "ArrowUp", "Enter"]);
    }

    resetState() {
        this.currentSelection = 0;
    }

    draw(spells: SpellFighterDetails[]) {
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
                case "wild":
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

    handleInput(key: string, spells: SpellFighterDetails[]) {
        if (!this.allowedKeys.has(key)) {
            return null;
        }

        if (key === "Enter") {
            globals.gameEventEmitter.emit("ui.select");
            return useSpellCommand(spells[this.currentSelection].id);
        }

        if (key === "ArrowUp" && this.currentSelection > 0) {
            globals.gameEventEmitter.emit("ui.cursorMove");
            this.currentSelection--;
        }

        if (key === "ArrowDown" && this.currentSelection < spells.length - 1) {
            globals.gameEventEmitter.emit("ui.cursorMove");
            this.currentSelection++;
        }

        return null;
    }
}

export class KeyBindingMenu {
    private state: "selection" | "change";
    private currentSelection: number;
    private allowedSelectionKeys: Set<string>;

    constructor() {
        this.state = "selection";
        this.currentSelection = 0;
        this.allowedSelectionKeys = new Set(["ArrowDown", "ArrowUp", "Enter", "Escape"]);
    }

    resetState() {
        this.state = "selection";
        this.currentSelection = 0;
    }

    draw(keyCommands: KeyCommand[]) {
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

    handleInput(key: string, keyCommands: KeyCommand[]) {
        if (this.state === "selection") {
            if (!this.allowedSelectionKeys.has(key)) {
                return;
            }

            if (key === "Escape") {
                globals.gameEventEmitter.emit("ui.select");
                return;
            }

            if (key === "ArrowUp" && this.currentSelection > 0) {
                globals.gameEventEmitter.emit("ui.cursorMove");
                this.currentSelection--;
            }

            if (key === "ArrowDown" && this.currentSelection < keyCommands.length - 1) {
                globals.gameEventEmitter.emit("ui.cursorMove");
                this.currentSelection++;
            }

            if (key === "Enter") {
                globals.gameEventEmitter.emit("ui.select");
                this.state = "change";
            }
        } else if (this.state === "change") {
            globals.gameEventEmitter.emit("ui.select");
            keyCommands[this.currentSelection].key = key;
            this.state = "selection";
        }
    }
}
