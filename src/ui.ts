import { get } from "lodash";
import { Entity, World } from "ape-ecs";

import { Display } from "./rot/index";
import globals from "./globals";
import {
    WIDTH,
    HEIGHT,
    UI_HEIGHT,
    LEVEL_UP_BASE,
    LEVEL_UP_FACTOR,
    SpellType
} from "./constants";
import input from "./input";
import { PlayerState, KeyCommand } from "./input-handler";
import { DisplayNameComponent, FlammableComponent, FreezableComponent, InputHandlingComponent, LevelComponent, PlannerAIComponent, WetableComponent } from "./entity";
import { InventoryItemDetails } from "./inventory";
import { getEffectiveHitPointData, getEffectiveStatData } from "./fighter";
import { GameMap, getEntitiesAtLocation } from "./map";
import { assertUnreachable, Nullable } from "./util";
import { SpellDataDetails } from "./skills";

export function drawStatusBar(
    display: Display,
    ecs: World,
    map: GameMap
): void {
    const player = ecs.getEntity("player");
    if (player === undefined) { throw new Error("No player entity found"); }

    const hpData = getEffectiveHitPointData(player);
    const statData = getEffectiveStatData(player);
    const levelData = player.getOne(LevelComponent);
    const inputHandlerData = player.getOne(InputHandlingComponent);
    const flammableData = player.getOne(FlammableComponent);
    const frozenData = player.getOne(FreezableComponent);
    const wetData = player.getOne(WetableComponent);

    if (hpData === null ||
        statData === null ||
        levelData === undefined ||
        inputHandlerData === undefined) {
        throw new Error("Player missing data");
    }

    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < UI_HEIGHT; y++) {
            display.draw(x, HEIGHT - (UI_HEIGHT - y), "#", "blue", "blue");
        }
    }

    display.drawText(1, HEIGHT - UI_HEIGHT, `%c{white}%b{blue}HP: ${hpData.hp}/${hpData.maxHp}`);
    display.drawText(14, HEIGHT - UI_HEIGHT, `%c{white}%b{blue}Mana: ${statData.mana}/${statData.maxMana}`);
    display.drawText(30, HEIGHT - UI_HEIGHT, `%c{white}%b{blue}STR: ${statData.strength}`);
    display.drawText(38, HEIGHT - UI_HEIGHT, `%c{white}%b{blue}DEF: ${statData.defense}`);
    display.drawText(46, HEIGHT - UI_HEIGHT, `%c{white}%b{blue}EXP: ${levelData.experience}/${(LEVEL_UP_BASE + levelData.level * LEVEL_UP_FACTOR)}`);
    display.drawText(1, HEIGHT - UI_HEIGHT + 2, `%c{white}%b{blue}${PlayerState[inputHandlerData.state]}`);

    if (flammableData !== undefined && flammableData.onFire) {
        display.drawText(14, HEIGHT - UI_HEIGHT + 2, `%c{white}%b{blue}On Fire`);
    } else if (frozenData !== undefined && frozenData.frozen) {
        display.drawText(14, HEIGHT - UI_HEIGHT + 2, `%c{white}%b{blue}Frozen`);
    } else if (wetData !== undefined && wetData.wet) {
        display.drawText(14, HEIGHT - UI_HEIGHT + 2, `%c{white}%b{blue}Wet`);
    }

    const mousePosition = input.getMousePosition();
    if (mousePosition === null) { return; }
    const { x, y } = mousePosition;

    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) {
        return;
    }

    const tile = map[y][x];
    if (!tile?.isVisibleAndLit()) {
        return;
    }

    const target: Nullable<Entity> = get(getEntitiesAtLocation(ecs, x, y), "[0]", null);
    if (target === null) {
        display.drawText(1, HEIGHT - UI_HEIGHT + 4, `%c{white}%b{blue}${tile.name}`);
        return;
    }

    const targetNameData = target.getOne(DisplayNameComponent);
    const targetHPData = getEffectiveHitPointData(target);
    const targetAIData = target.getOne(PlannerAIComponent);

    if (targetNameData !== undefined && targetAIData !== undefined && targetHPData !== null) {
        display.drawText(1, HEIGHT - UI_HEIGHT + 4, `%c{white}%b{blue}A ${targetNameData.name} (${targetHPData.hp}/${targetHPData.maxHp}) (${targetAIData.knowsTargetPosition})`);
    } else if (targetNameData !== undefined) {
        display.drawText(1, HEIGHT - UI_HEIGHT + 4, `%c{white}%b{blue}A ${targetNameData.name}`);
    }
}

export enum MessageType {
    Default,
    Tutorial,
    Critical
}

export function displayMessage(text: string, type: MessageType = MessageType.Default): void {
    if (globals.document === null) { throw new Error("Global document object is null"); }
    if (globals.Game === null) { throw new Error("Global Game object is null"); }

    const log = globals.document.getElementById("log");
    if (log === null) { throw new Error("Can't find log list element"); }

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
    private readonly allowedKeys: Set<string>;

    constructor() {
        this.currentSelection = 0;
        this.allowedKeys = new Set(["ArrowDown", "ArrowUp", "Enter"]);
    }

    resetState() {
        this.currentSelection = 0;
    }

    draw(inventoryItems: InventoryItemDetails[]) {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }
        if (globals.Game.display === null) { throw new Error("Cannot draw InventoryMenu when display is null"); }

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

    handleInput(inventoryItems: InventoryItemDetails[]): Nullable<InventoryItemDetails> {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        if (input.isDown("Enter")) {
            globals.gameEventEmitter.emit("ui.select");
            return inventoryItems[this.currentSelection];
        }

        if (input.isDown("ArrowUp") && this.currentSelection > 0) {
            globals.gameEventEmitter.emit("ui.cursorMove");
            this.currentSelection--;
        }

        if (input.isDown("ArrowDown") && this.currentSelection < inventoryItems.length - 1) {
            globals.gameEventEmitter.emit("ui.cursorMove");
            this.currentSelection++;
        }

        return null;
    }
}

export class SpellSelectionMenu {
    private currentSelection: number;
    private readonly allowedKeys: Set<string>;

    constructor() {
        this.currentSelection = 0;
        this.allowedKeys = new Set(["ArrowDown", "ArrowUp", "Enter"]);
    }

    resetState(): void {
        this.currentSelection = 0;
    }

    draw(spells: SpellDataDetails[]): void {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }
        if (globals.Game.display === null) { throw new Error("Cannot draw InventoryMenu when display is null"); }

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
                case SpellType.DamageOther:
                case SpellType.WildDamage:
                    infoString += `dmg: ${spell.value}`;
                    break;
                case SpellType.Effect:
                    infoString += `turns: ${spell.value}`;
                    break;
                case SpellType.HealSelf:
                    infoString += `health: ${spell.value}`;
                    break;
                case SpellType.Passive:
                    break;
                default:
                    assertUnreachable(spell.type);
            }
            globals.Game.display.drawText(25, i + 3, infoString);

            globals.Game.display.drawText(40, i + 3, `%c{white}%b{black}cost: ${spell.manaCost}`);
        }
    }

    handleInput(spells: SpellDataDetails[]): Nullable<SpellDataDetails> {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        if (input.isDown("Enter")) {
            globals.gameEventEmitter.emit("ui.select");
            return spells[this.currentSelection];
        }

        if (input.isDown("ArrowUp") && this.currentSelection > 0) {
            globals.gameEventEmitter.emit("ui.cursorMove");
            this.currentSelection--;
        }

        if (input.isDown("ArrowDown") && this.currentSelection < spells.length - 1) {
            globals.gameEventEmitter.emit("ui.cursorMove");
            this.currentSelection++;
        }

        return null;
    }
}

export class KeyBindingMenu {
    private state: "selection" | "change";
    private currentSelection: number;
    private readonly allowedSelectionKeys: Set<string>;

    constructor() {
        this.state = "selection";
        this.currentSelection = 0;
        this.allowedSelectionKeys = new Set(["ArrowDown", "ArrowUp", "Enter", "Escape"]);
    }

    resetState(): void {
        this.state = "selection";
        this.currentSelection = 0;
    }

    draw(keyCommands: KeyCommand[]): void {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }
        if (globals.Game.display === null) { throw new Error("Cannot draw InventoryMenu when display is null"); }

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
        globals.Game.display.drawText(2, 3, "%c{white}%b{black} Use the arrow keys to select a binding, and enter to change it. Use Escape to exit");

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

    handleInput(keyCommands: KeyCommand[]): void {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        if (this.state === "selection") {
            if (input.isDown("Escape")) {
                globals.gameEventEmitter.emit("ui.select");
                return;
            }

            if (input.isDown("ArrowUp") && this.currentSelection > 0) {
                globals.gameEventEmitter.emit("ui.cursorMove");
                this.currentSelection--;
            }

            if (input.isDown("ArrowDown") && this.currentSelection < keyCommands.length - 1) {
                globals.gameEventEmitter.emit("ui.cursorMove");
                this.currentSelection++;
            }

            if (input.isDown("Enter")) {
                globals.gameEventEmitter.emit("ui.select");
                this.state = "change";
            }
        } else if (this.state === "change") {
            globals.gameEventEmitter.emit("ui.select");

            const key: Nullable<string> = input.getFirstKeyPressed();
            if (key !== null) {
                keyCommands[this.currentSelection].key = key;
                this.state = "selection";
            }
        }
    }
}
