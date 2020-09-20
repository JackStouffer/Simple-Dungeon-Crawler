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
import { readKey } from "./util";

export function drawUI(display, player) {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < UI_HEIGHT; y++) {
            display.draw(x, HEIGHT - (UI_HEIGHT - y), MAP_FILLED_SPACE, "blue", "blue");
        }
    }

    display.drawText(1, HEIGHT - UI_HEIGHT, "%c{white}%b{blue}HP: " + player.fighter.hp + "/" + player.fighter.maxHp);
    display.drawText(14, HEIGHT - UI_HEIGHT, "%c{white}%b{blue}Mana: " + player.fighter.mana + "/" + player.fighter.maxMana);
    display.drawText(30, HEIGHT - UI_HEIGHT, "%c{white}%b{blue}STR: " + player.fighter.strength);
    display.drawText(38, HEIGHT - UI_HEIGHT, "%c{white}%b{blue}DEF: " + player.fighter.defense);
    display.drawText(54, HEIGHT - UI_HEIGHT, "%c{white}%b{blue}EXP: " + player.fighter.experience + "/" + (LEVEL_UP_BASE + player.fighter.level * LEVEL_UP_FACTOR));
}

export function showSelectionMenu(header, items, type, width) {
    if (items.length > 26) {
        throw new Error("too many items");
    }

    const aCode = "a".charCodeAt(0);

    // add four for header
    const height = items.length + UI_HEIGHT;

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

    globals.Game.display.drawText(2, 1, "%c{white}%b{black}" + header);
    for (let i = 0; i < items.length; i++) {
        switch (type) {
        case "inventory":
            globals.Game.display.drawText(
                2, i + 3, `%c{white}%b{black} ${String.fromCharCode(i + aCode)}: ${items[i].name} (${items[i].count})`
            );
            break;
        case "spells":
            globals.Game.display.drawText(
                2, i + 3, `%c{white}%b{black} ${String.fromCharCode(i + aCode)}: ${items[i].name} dmg: ${items[i].value} cost: ${items[i].manaCost}`
            );
            break;
        default:
            throw new Error(`Unknown menu type ${type}`);
        }
    }
}

export function showKeyBindingMenu(keyCommands, selectedKey = null) {
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

        if (key === selectedKey) {
            globals.Game.display.drawText(
                2, i + 7,
                "%c{white}%b{grey} " + keyCommands[i].description + ": " + key
            );
        } else {
            globals.Game.display.drawText(
                2, i + 7,
                "%c{white}%b{black} " + keyCommands[i].description + ": " + key
            );
        }
    }
}

export async function handleKeybindingInput(keyCommands) {
    let e, keyPress;
    let state = "selection";
    let currentKey = 0;
    const allowedSelectionKeys = new Set(["ArrowDown", "ArrowUp", "Enter", "Escape"]);

    showKeyBindingMenu(keyCommands, keyCommands[currentKey].key);

    while (true) {
        if (state === "selection") {
            do {
                e = await readKey();
                e.preventDefault();
                keyPress = e.key;
            } while (!allowedSelectionKeys.has(keyPress));

            if (keyPress === "Escape") {
                return;
            }

            if (keyPress === "ArrowUp" && currentKey > 0) {
                currentKey--;
            }

            if (keyPress === "ArrowDown" && currentKey < keyCommands.length - 1) {
                currentKey++;
            }

            if (keyPress === "Enter") {
                state = "change";
            }
        } else if (state === "change") {
            e = await readKey();
            e.preventDefault();
            keyPress = e.key;
            keyCommands[currentKey].key = keyPress;
            state = "selection";
        }

        showKeyBindingMenu(keyCommands, keyCommands[currentKey].key);
    }
}

export function clearScreen(display) {
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            display.draw(x, y, MAP_EMPTY_SPACE, "black", "black");
        }
    }
}
