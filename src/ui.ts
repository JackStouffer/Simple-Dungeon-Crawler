import { Entity, World } from "ape-ecs";
import * as PIXI from "pixi.js";
import { OutlineFilter } from "pixi-filters";

import globals from "./globals";
import {
    ItemType,
    LEVEL_UP_BASE,
    LEVEL_UP_FACTOR,
    PLAYER_ID,
    SpellType
} from "./constants";
import input from "./input";
import { PlayerState, KeyCommand } from "./input-handler";
import {
    EntityMap,
    FlammableComponent,
    FreezableComponent,
    HitPointsComponent,
    InputHandlingComponent,
    LevelComponent,
    OilCoveredComponent,
    PlannerAIComponent,
    StunnableComponent,
    TriggerComponent,
    TypeComponent,
    WetableComponent
} from "./entity";
import { InventoryItemDetails } from "./inventory";
import { getEffectiveHitPointData, getEffectiveStatData, KnownSpellDetails } from "./fighter";
import { GameMap, getEntitiesAtLocation, getHighestZIndexWithTile, isVisibleAndLit, TileData } from "./map";
import { assertUnreachable, Nullable } from "./util";
import { SpellData, SpellDataDetails } from "./skills";
import { playPing, playUIClick, playUIRollover } from "./audio";
import { rectangleContains } from "./camera";

export class StatusBar {
    readonly height = 96;
    private readonly background: PIXI.Graphics;
    private readonly healthText: PIXI.Text;
    private readonly strengthText: PIXI.Text;
    private readonly defenseText: PIXI.Text;
    private readonly experienceText: PIXI.Text;
    private readonly stateText: PIXI.Text;
    private readonly statusText: PIXI.Text;
    private readonly targetText: PIXI.Text;
    private readonly debugPathfindingText: PIXI.Text;

    constructor(viewport: PIXI.Rectangle, stage: PIXI.Container) {
        const top = viewport.height - this.height;

        this.background = new PIXI.Graphics();
        this.background.beginFill(0x0000FF);
        this.background.drawRect(0, 0, viewport.width, this.height);
        this.background.endFill();
        this.background.x = 0;
        this.background.y = top;
        this.background.zIndex = 20;
        this.background.visible = false;

        this.healthText = new PIXI.Text("", { fontFamily : "serif", fontSize: 16, fill : 0xFFFFFF });
        this.healthText.x = 20;
        this.healthText.y = top + 15;
        this.healthText.zIndex = 21;
        this.healthText.visible = false;

        this.strengthText = new PIXI.Text("", { fontFamily : "serif", fontSize: 16, fill : 0xFFFFFF });
        this.strengthText.x = 200;
        this.strengthText.y = top + 15;
        this.strengthText.zIndex = 21;
        this.strengthText.visible = false;

        this.defenseText = new PIXI.Text("", { fontFamily : "serif", fontSize: 16, fill : 0xFFFFFF });
        this.defenseText.x = 350;
        this.defenseText.y = top + 15;
        this.defenseText.zIndex = 21;
        this.defenseText.visible = false;

        this.experienceText = new PIXI.Text("", { fontFamily : "serif", fontSize: 16, fill : 0xFFFFFF });
        this.experienceText.x = 500;
        this.experienceText.y = top + 15;
        this.experienceText.zIndex = 21;
        this.experienceText.visible = false;

        this.stateText = new PIXI.Text("", { fontFamily : "serif", fontSize: 16, fill : 0xFFFFFF });
        this.stateText.x = 20;
        this.stateText.y = top + 45;
        this.stateText.zIndex = 21;
        this.stateText.visible = false;

        this.statusText = new PIXI.Text("", { fontFamily : "serif", fontSize: 16, fill : 0xFFFFFF });
        this.statusText.x = 200;
        this.statusText.y = top + 45;
        this.statusText.zIndex = 21;
        this.statusText.visible = false;

        this.targetText = new PIXI.Text("", { fontFamily : "serif", fontSize: 16, fill : 0xFFFFFF });
        this.targetText.x = 350;
        this.targetText.y = top + 45;
        this.targetText.zIndex = 21;
        this.targetText.visible = false;

        this.debugPathfindingText = new PIXI.Text("", { fontFamily : "serif", fontSize: 16, fill : 0xFFFFFF });
        this.debugPathfindingText.x = 650;
        this.debugPathfindingText.y = top + 45;
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
        const statData = getEffectiveStatData(ecs, entityMap, player);
        const levelData = player.getOne(LevelComponent);
        const inputHandlerData = player.getOne(InputHandlingComponent);
        const flammableData = player.getOne(FlammableComponent);
        const frozenData = player.getOne(FreezableComponent);
        const wetData = player.getOne(WetableComponent);
        const stunnableData = player.getOne(StunnableComponent);
        const oilData = player.getOne(OilCoveredComponent);

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

        if (globals.Game?.currentActor === PLAYER_ID) {
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
        } else if (stunnableData !== undefined && stunnableData.stunned) {
            status = "Stunned";
        } else if (oilData !== undefined && oilData.oilCovered) {
            status = "Oil Covered";
        }
        this.statusText.text = `Status: ${status}`;

        const mousePosition = input.getMousePosition();
        if (mousePosition === null) { return; }

        if (mousePosition.x >= 0 &&
            mousePosition.y >= 0 &&
            mousePosition.x < map.width &&
            mousePosition.y < map.height) {
            const tile = map
                .data[
                    getHighestZIndexWithTile(map, mousePosition)
                ][mousePosition.y][mousePosition.x];
            if (tile !== null && isVisibleAndLit(map, mousePosition)) {
                const entities = getEntitiesAtLocation(ecs, entityMap, mousePosition);
                if (entities.length === 0) {
                    this.targetText.text = `${TileData[tile.type].name}`;
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
                            if (a.getOne(TriggerComponent) !== undefined) { aValue += 3; }
                            if (b.getOne(PlannerAIComponent) !== undefined) { bValue += 10; }
                            if (b.getOne(HitPointsComponent) !== undefined) { bValue += 5; }
                            if (b.getOne(TriggerComponent) !== undefined) { bValue += 3; }

                            return aValue - bValue;
                        });
                        target = sorted[sorted.length - 1];
                    }

                    const targetTypeData = target.getOne(TypeComponent);
                    const targetHPData = getEffectiveHitPointData(target);
                    const targetAIData = target.getOne(PlannerAIComponent);

                    if (targetTypeData !== undefined &&
                        targetTypeData.displayName !== null &&
                        targetAIData !== undefined &&
                        targetHPData !== null) {
                        this.targetText.text = `A ${targetTypeData.displayName} (${targetHPData.hp}/${targetHPData.maxHp}) (${targetAIData.knowsTargetPosition})`;
                    } else if (targetTypeData !== undefined &&
                        targetTypeData.displayName !== null &&
                        targetHPData !== null) {
                        this.targetText.text = `A ${targetTypeData.displayName} (${targetHPData.hp}/${targetHPData.maxHp})`;
                    } else if (targetTypeData !== undefined &&
                        targetTypeData.displayName !== null) {
                        this.targetText.text = `A ${targetTypeData.displayName}`;
                    }
                }
            }

            if (globals.Game?.debugPathfinding === true && tile !== null) {
                this.debugPathfindingText.text = `(${mousePosition.x}, ${mousePosition.y}): ${tile.pathfindingCost}`;
                this.debugPathfindingText.visible = true;
            } else {
                this.debugPathfindingText.visible = false;
            }
        }
    }
}

export class LogMessage {
    stage: PIXI.Container;
    text: PIXI.Text;
    lifeTime: number;

    constructor(stage: PIXI.Container, text: string) {
        this.stage = stage;
        this.text = new PIXI.Text(text, {
            fontFamily: "monospace",
            fontSize: 18,
            fill: 0xFFFFFF,
            stroke: 0x000000,
            strokeThickness: 2
        });
        this.text.zIndex = 21;
        this.stage.addChild(this.text);
        this.lifeTime = 5000;
    }

    update(deltaTime: DOMHighResTimeStamp) {
        this.lifeTime -= deltaTime;
    }

    remove() {
        this.stage.removeChild(this.text);
        this.text.destroy();
    }
}

export function showLogMessage(text: string): void {
    if (globals.document === null) { throw new Error("Global document object is null"); }
    if (globals.Game === null) { throw new Error("Global Game object is null"); }

    globals.Game.logMessages.push(new LogMessage(globals.Game.pixiApp.stage, text));
    globals.Game.updateLogMessages();
}

interface InventoryMenuRow {
    bg: PIXI.Graphics;
    name: PIXI.Text;
    info: PIXI.Text;
    count: PIXI.Text;
}

export class InventoryMenu {
    readonly pageSize: number = 16;

    currentSelection: number;
    readonly viewport: PIXI.Rectangle;
    readonly currentStage: PIXI.Container;

    readonly background: PIXI.TilingSprite;
    readonly descriptionBackground: PIXI.Graphics;
    readonly titleText: PIXI.Text;
    readonly descriptionText: PIXI.Text;

    menuItems: InventoryMenuRow[];

    static unselectedStyle = { fontFamily : "serif", fontSize: 16, fill : 0x633418 };
    static selectedStyle = { fontFamily : "serif", fontSize: 16, fill : 0xFFFFFF };
    static descriptionStyle = {
        fontFamily: "serif",
        fontSize: 16,
        fill: 0xFFFFFF,
        wordWrap: true
    };
    static titleStyle = { fontFamily : "Luminari, serif", fontSize: 28, fill : 0x633418, align : "center" };

    static descriptionBackgroundColor = 0x631721;
    static descriptionBorderColor = 0x635917;
    static selectionBackgroundColor = 0x631721;

    constructor(viewport: PIXI.Rectangle, stage: PIXI.Container, textures: PIXI.ITextureDictionary) {
        this.currentSelection = 0;
        this.viewport = viewport;
        this.currentStage = stage;

        this.background = new PIXI.TilingSprite(textures["parchment_bg"]);
        this.background.width = viewport.width;
        this.background.height = viewport.height;
        this.background.x = 0;
        this.background.y = 0;
        this.background.zIndex = 20;
        this.background.visible = false;

        this.titleText = new PIXI.Text("Inventory", InventoryMenu.titleStyle);
        this.titleText.x = (viewport.width / 2) - (this.titleText.width / 2);
        this.titleText.y = 5;
        this.titleText.zIndex = 21;
        this.titleText.visible = false;

        const descriptionLineWidth = 4;
        const descriptionBoxHeight = 96;
        const descriptionBoxTop = viewport.height - descriptionBoxHeight;
        this.descriptionBackground = new PIXI.Graphics();
        this.descriptionBackground.lineStyle(
            descriptionLineWidth,
            InventoryMenu.descriptionBorderColor,
            1,
            1
        );
        this.descriptionBackground.beginFill(InventoryMenu.descriptionBackgroundColor);
        this.descriptionBackground.drawRect(
            0,
            0,
            viewport.width - (descriptionLineWidth * 2),
            descriptionBoxHeight
        );
        this.descriptionBackground.endFill();
        this.descriptionBackground.x = descriptionLineWidth;
        this.descriptionBackground.y = descriptionBoxTop;
        this.descriptionBackground.zIndex = 22;
        this.descriptionBackground.visible = false;

        this.descriptionText = new PIXI.Text("", InventoryMenu.descriptionStyle);
        this.descriptionText.x = 20;
        this.descriptionText.y = descriptionBoxTop + 15;
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

        this.descriptionText.style.wordWrapWidth = this.descriptionBackground.width * 0.95;

        const info = inventoryItems[this.currentSelection];
        if (info !== undefined) {
            this.descriptionText.text = info.description;
        }

        for (let i = 0; i < inventoryItems.length; i++) {
            const item = inventoryItems[i];
            const y = 25 * (i + 3);

            const bg = new PIXI.Graphics();
            bg.beginFill(InventoryMenu.selectionBackgroundColor);
            bg.drawRect(
                this.viewport.width * 0.01,
                y - 3,
                this.viewport.width * 0.98,
                25
            );
            bg.zIndex = 21;
            bg.visible = false;

            const name = new PIXI.Text(`${item.displayName}`, InventoryMenu.unselectedStyle);
            name.x = this.viewport.width * 0.02;
            name.y = y;
            name.zIndex = 22;
            name.visible = true;

            const info = new PIXI.Text("", InventoryMenu.unselectedStyle);
            info.x = this.viewport.width * 0.65;
            info.y = y;
            info.zIndex = 22;
            info.visible = true;

            switch (item.type) {
                case ItemType.DamageScroll:
                case ItemType.WildDamageScroll:
                    info.text = `dmg: ${item.value}`;
                    break;
                case ItemType.HasteSelf:
                case ItemType.SlowOther:
                case ItemType.ConfuseScroll:
                    info.text = `turns: ${item.value}`;
                    break;
                case ItemType.HealSelf:
                    info.text = `health: ${item.value}`;
                    break;
                case ItemType.ClairvoyanceScroll:
                    break;
                default:
                    assertUnreachable(item.type);
            }

            const count = new PIXI.Text(`Count: ${item.count}`, InventoryMenu.unselectedStyle);
            count.x = this.viewport.width * 0.85;
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

    handleInput(inventoryItems: InventoryItemDetails[]): Nullable<InventoryItemDetails> {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        if (input.wasPressed("Enter")) {
            playUIClick();
            return inventoryItems[this.currentSelection];
        }

        if (input.wasPressed("ArrowUp") && this.currentSelection > 0) {
            playUIRollover();
            this.currentSelection--;
            this.descriptionText.text = inventoryItems[this.currentSelection].description;
        }

        if (input.wasPressed("ArrowDown") && this.currentSelection < inventoryItems.length - 1) {
            playUIRollover();
            this.currentSelection++;
            this.descriptionText.text = inventoryItems[this.currentSelection].description;
        }

        for (let i = 0; i < this.menuItems.length; i++) {
            const m = this.menuItems[i];
            if (i === this.currentSelection) {
                m.bg.visible = true;
                m.name.style = InventoryMenu.selectedStyle;
                m.info.style = InventoryMenu.selectedStyle;
                m.count.style = InventoryMenu.selectedStyle;
            } else {
                m.bg.visible = false;
                m.name.style = InventoryMenu.unselectedStyle;
                m.info.style = InventoryMenu.unselectedStyle;
                m.count.style = InventoryMenu.unselectedStyle;
            }
        }

        return null;
    }
}

interface SpellMenuRow {
    bg: PIXI.Graphics;
    name: PIXI.Text;
    info: PIXI.Text;
    range: PIXI.Text;
    count: PIXI.Text;
}

export class SpellSelectionMenu {
    readonly pageSize: number = 16;

    currentSelection: number;
    readonly viewport: PIXI.Rectangle;
    readonly currentStage: PIXI.Container;

    private readonly background: PIXI.TilingSprite;
    private readonly descriptionBackground: PIXI.Graphics;
    private readonly titleText: PIXI.Text;
    private readonly descriptionText: PIXI.Text;

    private menuItems: SpellMenuRow[];

    static unselectedStyle = { fontFamily : "serif", fontSize: 16, fill : 0x633418 };
    static selectedStyle = { fontFamily : "serif", fontSize: 16, fill : 0xFFFFFF };
    static descriptionStyle = {
        fontFamily: "serif",
        fontSize: 16,
        fill: 0xFFFFFF,
        wordWrap: true
    };
    static titleStyle = { fontFamily : "Luminari, serif", fontSize: 28, fill : 0x633418, align : "center" };

    static descriptionBackgroundColor = 0x631721;
    static descriptionBorderColor = 0x635917;
    static selectionBackgroundColor = 0x631721;

    constructor(viewport: PIXI.Rectangle, stage: PIXI.Container, textures: PIXI.ITextureDictionary) {
        this.currentSelection = 0;
        this.viewport = viewport;
        this.currentStage = stage;

        this.background = new PIXI.TilingSprite(textures["parchment_bg"]);
        this.background.width = viewport.width;
        this.background.height = viewport.height;
        this.background.x = 0;
        this.background.y = 0;
        this.background.zIndex = 20;
        this.background.visible = false;

        this.titleText = new PIXI.Text("Spells", InventoryMenu.titleStyle);
        this.titleText.x = (viewport.width / 2) - (this.titleText.width / 2);
        this.titleText.y = 15;
        this.titleText.zIndex = 21;
        this.titleText.visible = false;

        const descriptionLineWidth = 4;
        const descriptionBoxHeight = 96;
        const descriptionBoxTop = viewport.height - descriptionBoxHeight;
        this.descriptionBackground = new PIXI.Graphics();
        this.descriptionBackground.lineStyle(
            descriptionLineWidth,
            SpellSelectionMenu.descriptionBorderColor,
            1,
            1
        );
        this.descriptionBackground.beginFill(SpellSelectionMenu.descriptionBackgroundColor);
        this.descriptionBackground.drawRect(
            0,
            0,
            viewport.width - (descriptionLineWidth * 2),
            descriptionBoxHeight
        );
        this.descriptionBackground.endFill();
        this.descriptionBackground.x = descriptionLineWidth;
        this.descriptionBackground.y = descriptionBoxTop;
        this.descriptionBackground.zIndex = 22;
        this.descriptionBackground.visible = false;

        this.descriptionText = new PIXI.Text("", SpellSelectionMenu.descriptionStyle);
        this.descriptionText.x = 20;
        this.descriptionText.y = descriptionBoxTop + 15;
        this.descriptionText.zIndex = 23;
        this.descriptionText.visible = false;

        this.menuItems = [];

        this.currentStage.addChild(this.background);
        this.currentStage.addChild(this.titleText);
        this.currentStage.addChild(this.descriptionBackground);
        this.currentStage.addChild(this.descriptionText);
    }

    open(spells: KnownSpellDetails[]): void {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }

        // TODO, SPEED: Mark all map tiles and entities as invisible

        this.background.visible = true;
        this.titleText.visible = true;
        this.descriptionText.visible = true;
        this.descriptionBackground.visible = true;

        this.descriptionText.style.wordWrapWidth = this.descriptionBackground.width * 0.95;

        const spellData = spells[this.currentSelection];
        if (spellData !== undefined) {
            this.descriptionText.text = spellData.description;
        }

        // TODO, SPEED: these objects are allocated every time the menu is opened
        for (let i = 0; i < spells.length; i++) {
            const spell = spells[i];
            const y = 20 * (i + 3);

            const bg = new PIXI.Graphics();
            bg.beginFill(InventoryMenu.selectionBackgroundColor);
            bg.drawRect(
                this.viewport.width * 0.01,
                y - 3,
                this.viewport.width * 0.98,
                25
            );
            bg.zIndex = 21;
            bg.visible = false;

            const name = new PIXI.Text(`${spell.displayName}`, SpellSelectionMenu.unselectedStyle);
            name.x = this.viewport.width * 0.02;
            name.y = y;
            name.zIndex = 22;
            name.visible = true;

            const info = new PIXI.Text("", SpellSelectionMenu.unselectedStyle);
            info.x = this.viewport.width * 0.55;
            info.y = y;
            info.zIndex = 22;
            info.visible = true;

            switch (spell.type) {
                case SpellType.DamageOther:
                case SpellType.WildDamage:
                    info.text = `dmg: ${spell.value}`;
                    break;
                case SpellType.Effect:
                case SpellType.EffectOther:
                    info.text = `turns: ${spell.value}`;
                    break;
                case SpellType.HealSelf:
                case SpellType.HealOther:
                    info.text = `health: ${spell.value}`;
                    break;
                case SpellType.AreaOfEffect:
                    info.text = `radius: ${spell.value}`;
                    break;
                case SpellType.Push:
                    info.text = `tiles: ${spell.value}`;
                    break;
                case SpellType.Passive:
                case SpellType.AreaDenial:
                    break;
                default:
                    assertUnreachable(spell.type);
            }

            const range = new PIXI.Text("", SpellSelectionMenu.unselectedStyle);
            range.visible = false;
            if (spell.range !== undefined) {
                range.x = this.viewport.width * 0.7;
                range.y = y;
                range.zIndex = 22;
                range.visible = true;
                range.text = `range: ${spell.range} tiles`;
            }

            const count = new PIXI.Text(`Count: ${spell.count}/${spell.maxCount}`, SpellSelectionMenu.unselectedStyle);
            count.x = this.viewport.width * 0.85;
            count.y = y;
            count.zIndex = 22;
            count.visible = true;

            this.menuItems.push({
                bg,
                name,
                info,
                range,
                count
            });
            this.currentStage.addChild(bg);
            this.currentStage.addChild(name);
            this.currentStage.addChild(info);
            this.currentStage.addChild(range);
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
            this.currentStage.removeChild(m.range);
            this.currentStage.removeChild(m.count);
        }
        this.menuItems = [];
    }

    handleInput(spells: KnownSpellDetails[]): Nullable<SpellDataDetails> {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        if (input.wasPressed("Enter")) {
            playUIClick();
            return SpellData[spells[this.currentSelection].id];
        }

        if (input.wasPressed("ArrowUp") && this.currentSelection > 0) {
            playUIRollover();
            this.currentSelection--;
            const info = spells[this.currentSelection];
            this.descriptionText.text = info.description;
        }

        if (input.wasPressed("ArrowDown") && this.currentSelection < spells.length - 1) {
            playUIRollover();
            this.currentSelection++;
            const info = spells[this.currentSelection];
            this.descriptionText.text = info.description;
        }

        for (let i = 0; i < this.menuItems.length; i++) {
            const m = this.menuItems[i];
            if (i === this.currentSelection) {
                m.bg.visible = true;
                m.name.style = SpellSelectionMenu.selectedStyle;
                m.info.style = SpellSelectionMenu.selectedStyle;
                m.range.style = SpellSelectionMenu.selectedStyle;
                m.count.style = SpellSelectionMenu.selectedStyle;
            } else {
                m.bg.visible = false;
                m.name.style = SpellSelectionMenu.unselectedStyle;
                m.info.style = SpellSelectionMenu.unselectedStyle;
                m.range.style = SpellSelectionMenu.unselectedStyle;
                m.count.style = SpellSelectionMenu.unselectedStyle;
            }
        }

        return null;
    }
}

interface KeyCommandMenuRow {
    bg: PIXI.Sprite;
    description: PIXI.Text;
    key: PIXI.Text;
}

const formatTable: { [key: string]: string } = {
    "ArrowLeft": "Left Arrow",
    "ArrowRight": "Right Arrow",
    "ArrowDown": "Down Arrow",
    "ArrowUp": "Up Arrow",
    "ShiftLeft": "Left Shift",
    "ShiftRight": "Right Shift",
    "AltLeft": "Left Alt",
    "AltRight": "Right Alt",
    "ControlLeft": "Left Ctl",
    "ControlRight": "Right Ctl"
};

export class KeyBindingMenu {
    state: "selection" | "change";
    currentSelection: number;
    readonly viewport: PIXI.Rectangle;
    readonly currentStage: PIXI.Container;

    readonly background: PIXI.Graphics;
    readonly titleText: PIXI.Text;

    menuItems: KeyCommandMenuRow[];

    readonly unselectedStyle = { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF };
    readonly selectedStyle = { fontFamily : "monospace", fontSize: 14, fill : 0x0 };

    constructor(viewport: PIXI.Rectangle, stage: PIXI.Container) {
        this.state = "selection";
        this.currentSelection = 0;
        this.currentStage = stage;
        this.viewport = viewport;

        const backgroundLineWidth = 4;
        this.background = new PIXI.Graphics();
        this.background.lineStyle(backgroundLineWidth, 0x999999, 1, 1);
        this.background.beginFill(0x000000);
        this.background.drawRect(
            0,
            0,
            viewport.width - (backgroundLineWidth * 2),
            viewport.height - (backgroundLineWidth * 2)
        );
        this.background.endFill();
        this.background.x = backgroundLineWidth;
        this.background.y = backgroundLineWidth;
        this.background.zIndex = 20;
        this.background.visible = false;

        this.titleText = new PIXI.Text("Keybindings", { fontFamily : "monospace", fontSize: 24, fill : 0xFFFFFF, align : "center" });
        this.titleText.x = (viewport.width / 2) - (this.titleText.width / 2);
        this.titleText.y = 5 + backgroundLineWidth;
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

            const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
            bg.width = this.viewport.width * 0.98;
            bg.height = 20;
            bg.x = this.viewport.width * 0.01;
            bg.y = y - 3;
            bg.zIndex = 21;
            bg.visible = false;

            const description = new PIXI.Text(command.description, this.unselectedStyle);
            description.x = this.viewport.width * 0.05;
            description.y = y;
            description.zIndex = 22;
            description.visible = true;

            const key = new PIXI.Text(command.keyDisplay, this.unselectedStyle);
            key.x = this.viewport.width * 0.80;
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
            if (input.wasPressed("Escape")) {
                playUIClick();
                return;
            }

            if (input.wasPressed("ArrowUp") && this.currentSelection > 0) {
                playUIRollover();
                this.currentSelection--;
            }

            if (input.wasPressed("ArrowDown") && this.currentSelection < keyCommands.length - 1) {
                playUIRollover();
                this.currentSelection++;
            }

            if (input.wasPressed("Enter")) {
                playUIClick();
                this.state = "change";
                this.menuItems[this.currentSelection].key.text = "";
            }
        } else if (this.state === "change") {
            playUIClick();

            const keys = input.getPressedKeys();
            if (keys.length > 0) {
                keyCommands[this.currentSelection].code = keys[0].code;

                const display = keys[0].code in formatTable ?
                    formatTable[keys[0].code] : keys[0].character!.toUpperCase();
                keyCommands[this.currentSelection].keyDisplay = display;
                this.menuItems[this.currentSelection].key.text = display;
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

class Button {
    viewport: PIXI.Rectangle;
    currentStage: PIXI.Container;
    zIndex: number;
    background: PIXI.Graphics;
    backgroundX: number;
    backgroundY: number;
    backgroundWidth: number;
    backgroundHeight: number;
    backgroundColor: number;
    buttonText: PIXI.Text;
    buttonTextColor: number;

    onMouseEnter: Nullable<(button: Button) => void> = null;
    onMouseExit: Nullable<(button: Button) => void> = null;
    onMouseDown: Nullable<(button: Button) => void> = null;
    onMouseUp: Nullable<(button: Button) => void> = null;

    pressed: boolean = false;
    visible: boolean = true;
    mouseIsOver: boolean = false;
    mouseIsDown: boolean = false;

    static textStyle = { fontFamily: "serif", fontSize: 16, fill: 0xFFFFFF };

    constructor(
        viewport: PIXI.Rectangle,
        stage: PIXI.Container,
        text: string,
        x: number,
        y: number,
        width: number,
        height: number,
        zIndex: number
    ) {
        this.viewport = viewport;
        this.currentStage = stage;
        this.background = new PIXI.Graphics();
        this.backgroundX = x;
        this.backgroundY = y;
        this.backgroundWidth = width;
        this.backgroundHeight = height;
        this.backgroundColor = 0x0078e7;
        this.zIndex = zIndex;

        this.buttonTextColor = 0xFFFFFF;
        this.buttonText = new PIXI.Text(text, Button.textStyle);
        this.buttonText.x = x + ((width / 2) - (this.buttonText.width / 2));
        this.buttonText.y = y + ((height / 2) - (this.buttonText.height / 2));
        this.buttonText.zIndex = zIndex + 2;
        this.buttonText.visible = true;

        this.redraw();

        this.onMouseEnter = defaultMouseEnter;
        this.onMouseExit = defaultMouseExit;
        this.onMouseDown = defaultMouseDown;

        this.currentStage.addChild(this.background);
        this.currentStage.addChild(this.buttonText);
    }

    /**
     * Force the button to redraw
     */
    redraw(): void {
        this.background.clear();
        this.background.beginFill(this.backgroundColor);
        this.background.drawRect(0, 0, this.backgroundWidth, this.backgroundHeight);
        this.background.endFill();
        this.background.x = this.backgroundX;
        this.background.y = this.backgroundY;
        this.background.zIndex = this.zIndex + 1;
        this.background.visible = true;

        this.buttonText.style.fill = this.buttonTextColor;
    }

    handleInput(): void {
        const mousePos = input.getMouseScreenPosition();
        if (mousePos === null) {
            return;
        }
        const mouseDownPos = input.getLeftMouseDownScreen();

        if (rectangleContains(this.background, mousePos)) {
            if (!this.mouseIsOver) {
                this.mouseIsOver = true;
                if (this.onMouseEnter !== null) {
                    this.onMouseEnter(this);
                }
            }

            if (!this.mouseIsDown && mouseDownPos !== null) {
                this.mouseIsDown = true;
                if (this.onMouseDown !== null) {
                    this.onMouseDown(this);
                }
            }
        } else if (this.mouseIsOver) {
            this.mouseIsOver = false;
            if (this.onMouseExit !== null) {
                this.onMouseExit(this);
            }
        }

        if (this.mouseIsDown && mouseDownPos === null) {
            this.mouseIsDown = false;
            if (this.onMouseUp !== null) {
                this.onMouseUp(this);
            }
        }
    }

    remove(): void {
        this.currentStage.removeChild(this.background);
        this.currentStage.removeChild(this.buttonText);
    }
}

function defaultMouseEnter(button: Button) {
    button.backgroundColor = 0x005db5;
    button.buttonTextColor = 0xFFFFFF;
    button.redraw();
    globals.Game!.canvas!.style.cursor = "pointer";
}

function defaultMouseExit(button: Button) {
    button.backgroundColor = 0x0078e7;
    button.buttonTextColor = 0xFFFFFF;
    button.redraw();
    globals.Game!.canvas!.style.cursor = "default";
}

function defaultMouseDown() {
    playUIClick();
    globals.Game!.canvas!.style.cursor = "default";
}

export class ConfirmationModal {
    readonly viewport: PIXI.Rectangle;
    readonly currentStage: PIXI.Container;
    readonly background: PIXI.TilingSprite;
    readonly descriptionBackground: PIXI.Graphics;
    readonly titleText: PIXI.Text;
    readonly bodyText: PIXI.Text;
    readonly button: Button;

    onConfirmation: Nullable<(modal: ConfirmationModal) => void>;

    static titleStyle = { fontFamily: "Luminari, fantasy", fontSize: 32, fill: 0x633418, align: "center" };
    static bodyTextStyle = {
        fontFamily: "serif",
        fontSize: 18,
        fill: 0x633418,
        align: "center",
        wordWrap: true,
    };

    constructor(
        viewport: PIXI.Rectangle,
        stage: PIXI.Container,
        textures: PIXI.ITextureDictionary,
        title: string,
        body: string
    ) {
        this.viewport = viewport;
        this.currentStage = stage;

        const backgroundWidth = viewport.width / 2;
        const backgroundHeight = viewport.height / 2;
        const backgroundX = backgroundWidth - (backgroundWidth / 2);
        const backgroundY = backgroundHeight - (backgroundHeight / 2);
        const backgroundLineWidth = 10;
        const backgroundZIndex = 20;

        this.background = new PIXI.TilingSprite(textures["parchment_bg"]);
        this.background.width = backgroundWidth;
        this.background.height = backgroundHeight;
        this.background.x = backgroundX;
        this.background.y = backgroundY;
        this.background.zIndex = backgroundZIndex;
        this.background.visible = true;
        this.background.filters = [
            new OutlineFilter(backgroundLineWidth, 0x631721)
        ];

        this.titleText = new PIXI.Text(title, ConfirmationModal.titleStyle);
        this.titleText.x = (viewport.width / 2) - (this.titleText.width / 2);
        this.titleText.y = backgroundY + 10;
        this.titleText.zIndex = 21;
        this.titleText.visible = true;

        const buttonWidth = 80;
        const buttonHeight = 45;
        this.button = new Button(
            viewport,
            stage,
            "Ok",
            (viewport.width / 2) - (buttonWidth / 2),
            backgroundY + backgroundHeight - (buttonHeight * 1.5),
            buttonWidth,
            buttonHeight,
            backgroundZIndex
        );

        this.bodyText = new PIXI.Text(body, ConfirmationModal.bodyTextStyle);
        this.bodyText.style.wordWrapWidth = backgroundWidth * 0.90;
        this.bodyText.x = (viewport.width / 2) - (this.bodyText.width / 2);
        this.bodyText.y = (viewport.height / 2) - (this.bodyText.height / 2);
        this.bodyText.zIndex = 21;
        this.bodyText.visible = true;

        this.button.onMouseDown = () => {
            playUIClick();
            if (this.onConfirmation !== null) {
                this.onConfirmation(this);
            }
            globals.Game!.canvas!.style.cursor = "default";
        };

        this.currentStage.addChild(this.background);
        this.currentStage.addChild(this.titleText);
        this.currentStage.addChild(this.bodyText);
    }

    handleInput(): void {
        this.button.handleInput();
    }

    remove(): void {
        this.currentStage.removeChild(this.background);
        this.currentStage.removeChild(this.titleText);
        this.currentStage.removeChild(this.bodyText);

        this.button.remove();
    }
}

export function showConfirmationDialogBox(text: string): void {
    if (globals.Game!.confirmationModal !== null) {
        return;
    }

    playPing();
    const modal = new ConfirmationModal(
        globals.Game!.pixiApp.screen,
        globals.Game!.pixiApp.stage,
        globals.Game!.textureAtlas,
        "Tutorial",
        text
    );
    modal.onConfirmation = (m) => {
        globals.Game!.isGameplayPaused = false;
        m.remove();
        globals.Game!.confirmationModal = null;
    };
    globals.Game!.confirmationModal = modal;
    globals.Game!.isGameplayPaused = true;
}
