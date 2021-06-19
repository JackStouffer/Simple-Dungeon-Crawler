import { Entity, World } from "ape-ecs";

import globals from "./globals";
import {
    LEVEL_UP_BASE,
    LEVEL_UP_FACTOR,
    SpellType
} from "./constants";
import input from "./input";
import { PlayerState, KeyCommand } from "./input-handler";
import {
    DisplayNameComponent,
    EntityMap,
    FlammableComponent,
    FreezableComponent,
    HitPointsComponent,
    InputHandlingComponent,
    LevelComponent,
    PlannerAIComponent,
    TriggerTypeComponent,
    WetableComponent
} from "./entity";
import { InventoryItemDetails } from "./inventory";
import { getEffectiveHitPointData, getEffectiveStatData, KnownSpellDetails } from "./fighter";
import { GameMap, getEntitiesAtLocation, getHighestZIndexWithTile } from "./map";
import { assertUnreachable, Nullable } from "./util";
import { SpellData, SpellDataDetails } from "./skills";
import { Container, Graphics, Sprite, Text, Texture } from "pixi.js";
import { playUIClick, playUIRollover } from "./audio";

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

        this.healthText = new Text("", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.healthText.x = 20;
        this.healthText.y = 520;
        this.healthText.zIndex = 21;
        this.healthText.visible = false;

        this.strengthText = new Text("", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.strengthText.x = 200;
        this.strengthText.y = 520;
        this.strengthText.zIndex = 21;
        this.strengthText.visible = false;

        this.defenseText = new Text("", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.defenseText.x = 350;
        this.defenseText.y = 520;
        this.defenseText.zIndex = 21;
        this.defenseText.visible = false;

        this.experienceText = new Text("", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.experienceText.x = 500;
        this.experienceText.y = 520;
        this.experienceText.zIndex = 21;
        this.experienceText.visible = false;

        this.stateText = new Text("", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.stateText.x = 20;
        this.stateText.y = 560;
        this.stateText.zIndex = 21;
        this.stateText.visible = false;

        this.statusText = new Text("", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.statusText.x = 200;
        this.statusText.y = 560;
        this.statusText.zIndex = 21;
        this.statusText.visible = false;

        this.targetText = new Text("", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.targetText.x = 350;
        this.targetText.y = 560;
        this.targetText.zIndex = 21;
        this.targetText.visible = false;

        this.debugPathfindingText = new Text("", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.debugPathfindingText.x = 650;
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

    setVisible(visible: boolean): void {
        this.background.visible = visible;
        this.healthText.visible = visible;
        this.strengthText.visible = visible;
        this.defenseText.visible = visible;
        this.experienceText.visible = visible;
        this.stateText.visible = visible;
        this.statusText.visible = visible;
        this.targetText.visible = visible;

        if (globals.Game?.debugPathfinding === true) {
            this.debugPathfindingText.visible = visible;
        }
    }

    update(
        ecs: World,
        map: GameMap,
        entityMap: EntityMap
    ) {
        const player = ecs.getEntity("player");
        if (player === undefined) { throw new Error("No player entity found"); }

        const hpData = getEffectiveHitPointData(player);
        const statData = getEffectiveStatData(entityMap, player);
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

        if (x >= 0 && y >= 0 && x < map.width && y < map.height) {
            const tile = map.data[getHighestZIndexWithTile(map, x, y)][y][x];
            if (tile !== null && tile.isVisibleAndLit() === true) {
                const entities = getEntitiesAtLocation(entityMap, x, y);
                if (entities.length === 0) {
                    this.targetText.text = `${tile.name}`;
                } else {
                    let target: Entity;
                    if (entities.length === 1) {
                        target = entities[0];
                    } else {
                        // TODO, SPEED: To get rid of this sorting, we should probably just
                        // have a UI thing which shows all of the entities on a tile
                        const sorted = entities.sort((a, b) => {
                            let aValue: number = 0;
                            let bValue: number = 0;

                            if (a.getOne(PlannerAIComponent) !== undefined) { aValue += 10; }
                            if (a.getOne(HitPointsComponent) !== undefined) { aValue += 5; }
                            if (a.getOne(TriggerTypeComponent) !== undefined) { aValue += 3; }
                            if (b.getOne(PlannerAIComponent) !== undefined) { bValue += 10; }
                            if (b.getOne(HitPointsComponent) !== undefined) { bValue += 5; }
                            if (b.getOne(TriggerTypeComponent) !== undefined) { bValue += 3; }

                            return aValue - bValue;
                        });
                        target = sorted[sorted.length - 1];
                    }

                    const targetNameData = target.getOne(DisplayNameComponent);
                    const targetHPData = getEffectiveHitPointData(target);
                    const targetAIData = target.getOne(PlannerAIComponent);

                    if (targetNameData !== undefined &&
                        targetAIData !== undefined &&
                        targetHPData !== null) {
                        this.targetText.text = `A ${targetNameData.name} (${targetHPData.hp}/${targetHPData.maxHp}) (${targetAIData.knowsTargetPosition})`;
                    } else if (targetNameData !== undefined && targetHPData !== null) {
                        this.targetText.text = `A ${targetNameData.name} (${targetHPData.hp}/${targetHPData.maxHp})`;
                    } else if (targetNameData !== undefined) {
                        this.targetText.text = `A ${targetNameData.name}`;
                    }
                }
            }

            if (globals.Game?.debugPathfinding === true && tile !== null) {
                this.debugPathfindingText.text = `(${x}, ${y}): ${tile.pathfindingCost}`;
            }
        }
    }
}

export enum MessageType {
    Default,
    Tutorial,
    Critical,
    StatusEffect
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
        small.innerHTML = `<small>Turn: ${globals.Game.totalTurns}</small>`;
    } else if (type === MessageType.StatusEffect) {
        el.className = "status-effect";
        small.innerHTML = `<small>Turn: ${globals.Game.totalTurns}</small>`;
    } else {
        small.innerHTML = `<small>Turn: ${globals.Game.totalTurns}</small>`;
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
    private readonly descriptionBackground: Graphics;
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
        this.background.drawRect(0, 0, 924, 604);
        this.background.endFill();
        this.background.x = 2;
        this.background.y = 2;
        this.background.zIndex = 20;
        this.background.visible = false;

        this.descriptionBackground = new Graphics();
        this.descriptionBackground.lineStyle(4, 0xFFFFFF, 1);
        this.descriptionBackground.beginFill(0x000000);
        this.descriptionBackground.drawRect(0, 0, 916, 100);
        this.descriptionBackground.endFill();
        this.descriptionBackground.x = 6;
        this.descriptionBackground.y = 502;
        this.descriptionBackground.zIndex = 22;
        this.descriptionBackground.visible = false;

        this.titleText = new Text("Inventory", { fontFamily : "monospace", fontSize: 24, fill : 0xFFFFFF, align : "center" });
        this.titleText.x = 410;
        this.titleText.y = 5;
        this.titleText.zIndex = 21;
        this.titleText.visible = false;

        this.descriptionText = new Text("", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.descriptionText.x = 20;
        this.descriptionText.y = 520;
        this.descriptionText.zIndex = 23;
        this.descriptionText.visible = false;

        this.menuItems = [];

        this.currentStage.addChild(this.background);
        this.currentStage.addChild(this.titleText);
        this.currentStage.addChild(this.descriptionBackground);
        this.currentStage.addChild(this.descriptionText);
    }

    open(inventoryItems: InventoryItemDetails[]): void {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }

        this.background.visible = true;
        this.titleText.visible = true;
        this.descriptionText.visible = true;
        this.descriptionBackground.visible = true;

        const info = inventoryItems[this.currentSelection];
        if (info !== undefined) {
            this.descriptionText.text = info.description;
        }

        for (let i = 0; i < inventoryItems.length; i++) {
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
        this.descriptionBackground.visible = false;
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
            playUIClick();
            return inventoryItems[this.currentSelection];
        }

        if (input.isDown("ArrowUp") && this.currentSelection > 0) {
            playUIRollover();
            this.currentSelection--;
            this.descriptionText.text = inventoryItems[this.currentSelection].description;
        }

        if (input.isDown("ArrowDown") && this.currentSelection < inventoryItems.length - 1) {
            playUIRollover();
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
    private readonly descriptionBackground: Graphics;
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
        this.background.drawRect(0, 0, 924, 604);
        this.background.endFill();
        this.background.x = 2;
        this.background.y = 2;
        this.background.zIndex = 20;
        this.background.visible = false;

        this.titleText = new Text("Spells", { fontFamily : "monospace", fontSize: 24, fill : 0xFFFFFF, align : "center" });
        this.titleText.x = 400;
        this.titleText.y = 0;
        this.titleText.zIndex = 21;
        this.titleText.visible = false;

        this.descriptionText = new Text("Spells", { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF });
        this.descriptionText.x = 20;
        this.descriptionText.y = 520;
        this.descriptionText.zIndex = 23;
        this.descriptionText.visible = false;

        this.descriptionBackground = new Graphics();
        this.descriptionBackground.lineStyle(4, 0xFFFFFF, 1);
        this.descriptionBackground.beginFill(0x000000);
        this.descriptionBackground.drawRect(0, 0, 916, 100);
        this.descriptionBackground.endFill();
        this.descriptionBackground.x = 6;
        this.descriptionBackground.y = 502;
        this.descriptionBackground.zIndex = 22;
        this.descriptionBackground.visible = false;

        this.menuItems = [];

        this.currentStage.addChild(this.background);
        this.currentStage.addChild(this.titleText);
        this.currentStage.addChild(this.descriptionBackground);
        this.currentStage.addChild(this.descriptionText);
    }

    open(spells: KnownSpellDetails[]): void {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }

        // SPEED: Mark all tiles and entities as invisible

        this.background.visible = true;
        this.titleText.visible = true;
        this.descriptionText.visible = true;
        this.descriptionBackground.visible = true;

        const info = spells[this.currentSelection];
        if (info !== undefined) {
            this.descriptionText.text = info.description;
        }

        for (let i = 0; i < spells.length; i++) {
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
                case SpellType.Push:
                    info.text = `tiles: ${spell.value}`;
                    break;
                case SpellType.Passive:
                    break;
                default:
                    assertUnreachable(spell.type);
            }

            const count = new Text(`Count: ${spell.count}/${spell.maxCount}`, this.unselectedStyle);
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
    }

    close(): void {
        this.currentSelection = 0;
        this.background.visible = false;
        this.titleText.visible = false;
        this.descriptionText.visible = false;
        this.descriptionBackground.visible = false;
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
            playUIClick();
            return SpellData[spells[this.currentSelection].id];
        }

        if (input.isDown("ArrowUp") && this.currentSelection > 0) {
            playUIRollover();
            this.currentSelection--;
            const info = spells[this.currentSelection];
            this.descriptionText.text = info.description;
        }

        if (input.isDown("ArrowDown") && this.currentSelection < spells.length - 1) {
            playUIRollover();
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
                playUIClick();
                return;
            }

            if (input.isDown("ArrowUp") && this.currentSelection > 0) {
                playUIRollover();
                this.currentSelection--;
            }

            if (input.isDown("ArrowDown") && this.currentSelection < keyCommands.length - 1) {
                playUIRollover();
                this.currentSelection++;
            }

            if (input.isDown("Enter")) {
                playUIClick();
                this.state = "change";
                this.menuItems[this.currentSelection].key.text = "";
            }
        } else if (this.state === "change") {
            playUIClick();

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
