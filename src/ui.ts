import { get } from "lodash";
import { Entity, World } from "ape-ecs";

import globals from "./globals";
import {
    LEVEL_UP_BASE,
    LEVEL_UP_FACTOR,
    GameState,
    SpellType
} from "./constants";
import input from "./input";
import { PlayerState, KeyCommand } from "./input-handler";
import {
    DisplayNameComponent,
    EntityMap,
    FlammableComponent,
    FreezableComponent,
    InputHandlingComponent,
    LevelComponent,
    PlannerAIComponent,
    WetableComponent
} from "./entity";
import { InventoryItemDetails } from "./inventory";
import { getEffectiveHitPointData, getEffectiveStatData, KnownSpellDetails } from "./fighter";
import { GameMap, getEntitiesAtLocation } from "./map";
import { assertUnreachable, Nullable } from "./util";
import { SpellData, SpellDataDetails } from "./skills";
import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";

export class StatusBar {
    private readonly background: Graphics;
    private readonly healthText: Text;
    private readonly strengthText: Text;
    private readonly defenseText: Text;
    private readonly experienceText: Text;
    private readonly stateText: Text;
    private readonly statusText: Text;
    private readonly targetText: Text;
    private readonly debugPathfindingText: Text;

    constructor(stage: Container) {
        this.background = new Graphics();
        this.background.beginFill(0x0000FF);
        this.background.drawRect(0, 0, 928, 100);
        this.background.endFill();
        this.background.x = 0;
        this.background.y = 512;
        this.background.zIndex = 20;
        this.background.visible = false;

        this.healthText = new Text("", { fontFamily : "monospace", fontSize: 12, fill : 0xFFFFFF });
        this.healthText.x = 20;
        this.healthText.y = 520;
        this.healthText.zIndex = 21;
        this.healthText.visible = false;

        this.strengthText = new Text("", { fontFamily : "monospace", fontSize: 12, fill : 0xFFFFFF });
        this.strengthText.x = 200;
        this.strengthText.y = 520;
        this.strengthText.zIndex = 21;
        this.strengthText.visible = false;

        this.defenseText = new Text("", { fontFamily : "monospace", fontSize: 12, fill : 0xFFFFFF });
        this.defenseText.x = 600;
        this.defenseText.y = 520;
        this.defenseText.zIndex = 21;
        this.defenseText.visible = false;

        this.experienceText = new Text("", { fontFamily : "monospace", fontSize: 12, fill : 0xFFFFFF });
        this.experienceText.x = 700;
        this.experienceText.y = 520;
        this.experienceText.zIndex = 21;
        this.experienceText.visible = false;

        this.stateText = new Text("", { fontFamily : "monospace", fontSize: 12, fill : 0xFFFFFF });
        this.stateText.x = 20;
        this.stateText.y = 560;
        this.stateText.zIndex = 21;
        this.stateText.visible = false;

        this.statusText = new Text("", { fontFamily : "monospace", fontSize: 12, fill : 0xFFFFFF });
        this.statusText.x = 200;
        this.statusText.y = 560;
        this.statusText.zIndex = 21;
        this.statusText.visible = false;

        this.targetText = new Text("", { fontFamily : "monospace", fontSize: 12, fill : 0xFFFFFF });
        this.targetText.x = 400;
        this.targetText.y = 560;
        this.targetText.zIndex = 21;
        this.targetText.visible = false;

        this.debugPathfindingText = new Text("", { fontFamily : "monospace", fontSize: 12, fill : 0xFFFFFF });
        this.debugPathfindingText.x = 500;
        this.debugPathfindingText.y = 560;
        this.debugPathfindingText.zIndex = 21;
        this.debugPathfindingText.visible = false;

        stage.addChild(this.background);
        stage.addChild(this.healthText);
        stage.addChild(this.strengthText);
        stage.addChild(this.defenseText);
        stage.addChild(this.experienceText);
        stage.addChild(this.stateText);
        stage.addChild(this.statusText);
        stage.addChild(this.targetText);
        stage.addChild(this.debugPathfindingText);
        stage.addChild(this.targetText);
    }

    update(
        state: GameState,
        ecs: World,
        map: GameMap,
        entityMap: EntityMap
    ) {
        if (state !== GameState.Gameplay) {
            this.background.visible = false;
            this.healthText.visible = false;
            this.strengthText.visible = false;
            this.defenseText.visible = false;
            this.experienceText.visible = false;
            this.stateText.visible = false;
            this.statusText.visible = false;
            this.targetText.visible = false;
            this.debugPathfindingText.visible = false;

            return;
        } else {
            this.background.visible = true;
            this.healthText.visible = true;
            this.strengthText.visible = true;
            this.defenseText.visible = true;
            this.experienceText.visible = true;
            this.stateText.visible = true;
            this.statusText.visible = true;
            this.targetText.visible = true;
            this.debugPathfindingText.visible = true;
        }

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

        this.healthText.text = `HP: ${hpData.hp}/${hpData.maxHp}`;
        this.strengthText.text = `STR: ${statData.strength}`;
        this.defenseText.text = `DEF: ${statData.defense}`;
        this.experienceText.text = `EXP: ${levelData.experience}/${(LEVEL_UP_BASE + levelData.level * LEVEL_UP_FACTOR)}`;

        if (globals.Game?.player === globals.Game?.currentActor) {
            this.stateText.text = `State: ${PlayerState[inputHandlerData.state]}`;
        } else {
            this.stateText.text = "Enemy Turn";
        }

        let status = "none";
        if (flammableData !== undefined && flammableData.onFire) {
            status = "On Fire";
        } else if (frozenData !== undefined && frozenData.frozen) {
            status = "Frozen";
        } else if (wetData !== undefined && wetData.wet) {
            status = "Wet";
        }
        this.statusText.text = `Status: ${status}`;

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

        if (globals.Game?.debugPathfinding === true) {
            this.debugPathfindingText.text = `(${x}, ${y}): ${tile.pathfindingCost}`;
            this.debugPathfindingText.visible = true;
        } else {
            this.debugPathfindingText.visible = false;
        }

        const target: Nullable<Entity> = get(getEntitiesAtLocation(entityMap, x, y), "[0]", null);
        if (target === null) {
            this.targetText.text = `${tile.name}`;
            return;
        }

        const targetNameData = target.getOne(DisplayNameComponent);
        const targetHPData = getEffectiveHitPointData(target);
        const targetAIData = target.getOne(PlannerAIComponent);

        if (targetNameData !== undefined && targetAIData !== undefined && targetHPData !== null) {
            this.targetText.text = `A ${targetNameData.name} (${targetHPData.hp}/${targetHPData.maxHp}) (${targetAIData.knowsTargetPosition})`;
        } else if (targetNameData !== undefined && targetHPData !== null) {
            this.targetText.text = `A ${targetNameData.name} (${targetHPData.hp}/${targetHPData.maxHp})`;
        } else if (targetNameData !== undefined) {
            this.targetText.text = `A ${targetNameData.name}`;
        }
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

interface InventoryMenuRow {
    bg: Sprite;
    name: Text;
    count: Text;
}

export class InventoryMenu {
    private readonly pageSize: number = 16;

    private currentSelection: number;
    private readonly currentStage: Container;

    private readonly background: Graphics;
    private readonly titleText: Text;
    private readonly descriptionText: Text;

    private menuItems: InventoryMenuRow[];

    private readonly unselectedStyle = { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF };
    private readonly selectedStyle = { fontFamily : "monospace", fontSize: 14, fill : 0x0 };

    constructor(stage: Container) {
        this.currentSelection = 0;
        this.currentStage = stage;

        this.background = new Graphics();
        this.background.lineStyle(4, 0x999999, 1);
        this.background.beginFill(0x000000);
        this.background.drawRect(0, 0, 928, 608);
        this.background.endFill();
        this.background.x = 0;
        this.background.y = 0;
        this.background.zIndex = 20;
        this.background.visible = false;

        this.titleText = new Text("Inventory", { fontFamily : "monospace", fontSize: 24, fill : 0xFFFFFF, align : "center" });
        this.titleText.x = 400;
        this.titleText.y = 0;
        this.titleText.zIndex = 21;
        this.titleText.visible = false;

        this.descriptionText = new Text("", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.descriptionText.x = 20;
        this.descriptionText.y = 400;
        this.descriptionText.zIndex = 21;
        this.descriptionText.visible = false;

        this.menuItems = [];

        this.currentStage.addChild(this.background);
        this.currentStage.addChild(this.titleText);
    }

    open(inventoryItems: InventoryItemDetails[]): void {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }

        this.background.visible = true;
        this.titleText.visible = true;
        this.descriptionText.visible = true;

        const info = inventoryItems[this.currentSelection];
        if (info !== undefined) {
            this.descriptionText.text = info.description;
        }

        const currentPage = Math.floor(this.currentSelection / this.pageSize);
        const start = currentPage * this.pageSize;
        const end = Math.min(start + this.pageSize, inventoryItems.length);

        for (let i = start; i < end; i++) {
            const item = inventoryItems[i];
            const y = 20 * (i + 2);

            const bg = new Sprite(Texture.WHITE);
            bg.width = 900;
            bg.height = 20;
            bg.x = 12;
            bg.y = y - 3;
            bg.zIndex = 21;
            bg.visible = false;

            const name = new Text(`${item.displayName}`, this.unselectedStyle);
            name.x = 20;
            name.y = y;
            name.zIndex = 22;
            name.visible = true;

            const count = new Text(`Count: ${item.count}`, this.unselectedStyle);
            count.x = 600;
            count.y = y;
            count.zIndex = 22;
            count.visible = true;

            this.menuItems.push({
                bg,
                name,
                count
            });
            this.currentStage.addChild(bg);
            this.currentStage.addChild(name);
            this.currentStage.addChild(count);
        }
    }

    close(): void {
        this.currentSelection = 0;
        this.background.visible = false;
        this.titleText.visible = false;
        this.descriptionText.visible = false;
        for (let i = 0; i < this.menuItems.length; i++) {
            const m = this.menuItems[i];
            this.currentStage.removeChild(m.bg);
            this.currentStage.removeChild(m.name);
            this.currentStage.removeChild(m.count);
        }
        this.menuItems = [];
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
            this.descriptionText.text = inventoryItems[this.currentSelection].description;
        }

        if (input.isDown("ArrowDown") && this.currentSelection < inventoryItems.length - 1) {
            globals.gameEventEmitter.emit("ui.cursorMove");
            this.currentSelection++;
            this.descriptionText.text = inventoryItems[this.currentSelection].description;
        }

        for (let i = 0; i < this.menuItems.length; i++) {
            const m = this.menuItems[i];
            if (i === this.currentSelection) {
                m.bg.visible = true;
                m.name.style = this.selectedStyle;
                m.count.style = this.selectedStyle;
            } else {
                m.bg.visible = false;
                m.name.style = this.unselectedStyle;
                m.count.style = this.unselectedStyle;
            }
        }

        return null;
    }
}

interface SpellMenuRow {
    bg: Sprite;
    name: Text;
    info: Text;
    count: Text;
}

export class SpellSelectionMenu {
    private readonly pageSize: number = 16;

    private currentSelection: number;
    private readonly currentStage: Container;

    private readonly background: Graphics;
    private readonly titleText: Text;
    private readonly descriptionText: Text;

    private menuItems: SpellMenuRow[];

    private readonly unselectedStyle = { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF };
    private readonly selectedStyle = { fontFamily : "monospace", fontSize: 14, fill : 0x0 };

    constructor(stage: Container) {
        this.currentSelection = 0;
        this.currentStage = stage;

        this.background = new Graphics();
        this.background.lineStyle(4, 0x999999, 1);
        this.background.beginFill(0x000000);
        this.background.drawRect(0, 0, 928, 608);
        this.background.endFill();
        this.background.x = 0;
        this.background.y = 0;
        this.background.zIndex = 20;
        this.background.visible = false;

        this.titleText = new Text("Spells", { fontFamily : "monospace", fontSize: 24, fill : 0xFFFFFF, align : "center" });
        this.titleText.x = 400;
        this.titleText.y = 0;
        this.titleText.zIndex = 21;
        this.titleText.visible = false;

        this.descriptionText = new Text("Spells", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.descriptionText.x = 20;
        this.descriptionText.y = 400;
        this.descriptionText.zIndex = 21;
        this.descriptionText.visible = false;

        this.menuItems = [];

        this.currentStage.addChild(this.background);
        this.currentStage.addChild(this.titleText);
    }

    open(spells: KnownSpellDetails[]): void {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }

        this.background.visible = true;
        this.titleText.visible = true;
        this.descriptionText.visible = true;

        const info = spells[this.currentSelection];
        this.descriptionText.text = info.description;

        const currentPage = Math.floor(this.currentSelection / this.pageSize);
        const start = currentPage * this.pageSize;
        const end = Math.min(start + this.pageSize, spells.length);

        for (let i = start; i < end; i++) {
            const spell = spells[i];
            const y = 20 * (i + 2);

            const bg = new Sprite(Texture.WHITE);
            bg.width = 900;
            bg.height = 20;
            bg.x = 12;
            bg.y = y - 3;
            bg.zIndex = 21;
            bg.visible = false;

            const name = new Text(`${spell.displayName}`, this.unselectedStyle);
            name.x = 20;
            name.y = y;
            name.zIndex = 22;
            name.visible = true;

            const info = new Text("", this.unselectedStyle);
            info.x = 400;
            info.y = y;
            info.zIndex = 22;
            info.visible = true;

            switch (spell.type) {
                case SpellType.DamageOther:
                case SpellType.WildDamage:
                    info.text = `dmg: ${spell.value}`;
                    break;
                case SpellType.Effect:
                    info.text = `turns: ${spell.value}`;
                    break;
                case SpellType.HealSelf:
                case SpellType.HealOther:
                    info.text = `health: ${spell.value}`;
                    break;
                case SpellType.Passive:
                    break;
                default:
                    assertUnreachable(spell.type);
            }

            const count = new Text(`Count: ${spell.count}`, this.unselectedStyle);
            count.x = 600;
            count.y = y;
            count.zIndex = 22;
            count.visible = true;

            this.menuItems.push({
                bg,
                name,
                info,
                count
            });
            this.currentStage.addChild(bg);
            this.currentStage.addChild(name);
            this.currentStage.addChild(info);
            this.currentStage.addChild(count);
        }

        if (start > 0) {
            // globals.Game.display.drawText((WIDTH / 2) - 2, 2, "%c{white}%b{black}\u25B2\u25B2\u25B2");
        }
        if (end < spells.length) {
            // globals.Game.display.drawText((WIDTH / 2) - 2, (HEIGHT / 2) - 1, "%c{white}%b{black}\u25BC\u25BC\u25BC");
        }

    }

    close(): void {
        this.currentSelection = 0;
        this.background.visible = false;
        this.titleText.visible = false;
        this.descriptionText.visible = false;
        for (let i = 0; i < this.menuItems.length; i++) {
            const m = this.menuItems[i];
            this.currentStage.removeChild(m.bg);
            this.currentStage.removeChild(m.name);
            this.currentStage.removeChild(m.info);
            this.currentStage.removeChild(m.count);
        }
        this.menuItems = [];
    }

    handleInput(spells: KnownSpellDetails[]): Nullable<SpellDataDetails> {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        if (input.isDown("Enter")) {
            globals.gameEventEmitter.emit("ui.select");
            return SpellData[spells[this.currentSelection].id];
        }

        if (input.isDown("ArrowUp") && this.currentSelection > 0) {
            globals.gameEventEmitter.emit("ui.cursorMove");
            this.currentSelection--;
            const info = spells[this.currentSelection];
            this.descriptionText.text = info.description;
        }

        if (input.isDown("ArrowDown") && this.currentSelection < spells.length - 1) {
            globals.gameEventEmitter.emit("ui.cursorMove");
            this.currentSelection++;
            const info = spells[this.currentSelection];
            this.descriptionText.text = info.description;
        }

        for (let i = 0; i < this.menuItems.length; i++) {
            const m = this.menuItems[i];
            if (i === this.currentSelection) {
                m.bg.visible = true;
                m.name.style = this.selectedStyle;
                m.info.style = this.selectedStyle;
                m.count.style = this.selectedStyle;
            } else {
                m.bg.visible = false;
                m.name.style = this.unselectedStyle;
                m.info.style = this.unselectedStyle;
                m.count.style = this.unselectedStyle;
            }
        }

        // INCOMPLETE: multiple pages does not work
        return null;
    }
}

interface KeyCommandMenuRow {
    bg: Sprite;
    description: Text;
    key: Text;
}

export class KeyBindingMenu {
    private state: "selection" | "change";
    private currentSelection: number;
    private readonly currentStage: Container;

    private readonly background: Graphics;
    private readonly titleText: Text;

    private menuItems: KeyCommandMenuRow[];

    private readonly unselectedStyle = { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF };
    private readonly selectedStyle = { fontFamily : "monospace", fontSize: 14, fill : 0x0 };

    constructor(stage: Container) {
        this.state = "selection";
        this.currentSelection = 0;
        this.currentStage = stage;

        this.background = new Graphics();
        this.background.lineStyle(4, 0x999999, 1);
        this.background.beginFill(0x000000);
        this.background.drawRect(0, 0, 928, 608);
        this.background.endFill();
        this.background.x = 0;
        this.background.y = 0;
        this.background.zIndex = 20;
        this.background.visible = false;

        this.titleText = new Text("Keybindings", { fontFamily : "monospace", fontSize: 24, fill : 0xFFFFFF, align : "center" });
        this.titleText.x = 380;
        this.titleText.y = 0;
        this.titleText.zIndex = 21;
        this.titleText.visible = false;

        this.menuItems = [];

        this.currentStage.addChild(this.background);
        this.currentStage.addChild(this.titleText);
    }

    open(keyCommands: KeyCommand[]): void {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }

        this.background.visible = true;
        this.titleText.visible = true;

        for (let i = 0; i < keyCommands.length; i++) {
            const command = keyCommands[i];
            const y = 20 * (i + 2);

            const bg = new Sprite(Texture.WHITE);
            bg.width = 900;
            bg.height = 20;
            bg.x = 12;
            bg.y = y - 3;
            bg.zIndex = 21;
            bg.visible = false;

            const description = new Text(command.description, this.unselectedStyle);
            description.x = 20;
            description.y = y;
            description.zIndex = 22;
            description.visible = true;

            const key = new Text(command.key, this.unselectedStyle);
            key.x = 600;
            key.y = y;
            key.zIndex = 22;
            key.visible = true;

            this.menuItems.push({
                bg,
                description,
                key
            });
            this.currentStage.addChild(bg);
            this.currentStage.addChild(description);
            this.currentStage.addChild(key);
        }
    }

    close(): void {
        this.state = "selection";
        this.currentSelection = 0;
        this.background.visible = false;
        this.titleText.visible = false;
        for (let i = 0; i < this.menuItems.length; i++) {
            const m = this.menuItems[i];
            this.currentStage.removeChild(m.bg);
            this.currentStage.removeChild(m.description);
            this.currentStage.removeChild(m.key);
        }
        this.menuItems = [];
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
                this.menuItems[this.currentSelection].key.text = "";
            }
        } else if (this.state === "change") {
            globals.gameEventEmitter.emit("ui.select");

            const key: Nullable<string> = input.getFirstKeyPressed();
            if (key !== null) {
                keyCommands[this.currentSelection].key = key;
                this.menuItems[this.currentSelection].key.text = key;
                this.state = "selection";
            }
        }

        for (let i = 0; i < this.menuItems.length; i++) {
            const m = this.menuItems[i];
            if (i === this.currentSelection) {
                m.bg.visible = true;
                m.description.style = this.selectedStyle;
                m.key.style = this.selectedStyle;
            } else {
                m.bg.visible = false;
                m.description.style = this.unselectedStyle;
                m.key.style = this.unselectedStyle;
            }
        }
    }
}
