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

export function drawUI(display, player) {
    for (let i = 0; i < WIDTH; i++) {
        display.draw(i, HEIGHT - UI_HEIGHT, MAP_FILLED_SPACE, "blue", "blue");
    }

    display.drawText(1,  HEIGHT - UI_HEIGHT, "%c{white}%b{blue}HP: " + player.fighter.hp + "/" + player.fighter.maxHp);
    display.drawText(14,  HEIGHT - UI_HEIGHT, "%c{white}%b{blue}Mana: " + player.fighter.mana + "/" + player.fighter.maxMana);
    display.drawText(30,  HEIGHT - UI_HEIGHT, "%c{white}%b{blue}STR: " + player.fighter.strength);
    display.drawText(38,  HEIGHT - UI_HEIGHT, "%c{white}%b{blue}DEF: " + player.fighter.defense);
    display.drawText(54,  HEIGHT - UI_HEIGHT, "%c{white}%b{blue}EXP: " + player.fighter.experience + "/" + (LEVEL_UP_BASE + player.fighter.level * LEVEL_UP_FACTOR));
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

export function showKeyBindingMenu() {
    // add one for header
    const height = 16;
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
    globals.Game.display.drawText(2, 3, "%c{white}%b{black} Click on an option to change it");

    const commands = Object.keys(globals.Game.player.keyCommandMap);
    for (let i = 0; i < commands.length; i++) {
        const key = commands[i];
        globals.Game.display.drawText(
            2, i + 5,
            "%c{white}%b{black} " + globals.Game.player.keyCommandMap[key][0] + ": " + key
        );
    }
}

export function clearScreen(display) {
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            display.draw(x, y, MAP_EMPTY_SPACE, "black", "black");
        }
    }
}
