import { EventEmitter } from "events";
import { Entity, World } from "ape-ecs";

import { Display } from "./rot/index";
import EntityScheduler from "./rot/scheduler/ecs";

import globals from "./globals";
import {
    loadSounds,
    loadEventualSounds,
    playOpenInventory,
    playCloseInventory,
    playOpenSpells,
    playCloseSpells,
    playUIClick,
    playUIRollover,
    playLevelTheme,
    pauseMusic,
    resumeMusic,
    playDoorOpen,
    playChestOpen,
    playBoxBreak
} from "./audio";
import { Camera } from "./camera";
import {
    createEntity,
    PositionComponent,
    TypeComponent,
    DisplayNameComponent,
    GraphicsComponent,
    LightingComponent,
    InventoryComponent,
    HitPointsComponent,
    SpeedComponent,
    StatsComponent,
    SpellsComponent,
    PlannerAIComponent,
    LoseTargetAIComponent,
    FearAIComponent,
    FallbackAIComponent,
    PatrolAIComponent,
    PatrolPathComponent,
    InputHandlingComponent,
    FreezableComponent,
    FlammableComponent,
    TriggerTypeComponent,
    InteractableTypeComponent,
    StatsEffectComponent,
    SpeedEffectComponent,
    HitPointsEffectComponent,
    LevelComponent,
    DamageAffinityComponent,
    FireTriggerComponent,
    ConfusedAIComponent,
    EventTriggerComponent,
    RemoveAfterNTurnsComponent,
    RemoveAfterNTurnsSystem,
    LoadLevelComponent,
    ChestGraphicsComponent,
    WetableComponent,
    SilenceableComponent,
    UpdateEntityMapSystem
} from "./entity";
import {
    Command,
    NoOpCommand,
    UseItemCommand,
    UseSpellCommand
} from "./commands";
import { WIDTH, HEIGHT, GameState, ItemType, SpellType } from "./constants";
import input from "./input";
import { handleInput, PlayerState } from "./input-handler";
import {
    GameMap,
    drawMap,
    loadTiledMap,
    resetTilePathCosts
} from "./map";
import {
    KeyBindingMenu,
    InventoryMenu,
    SpellSelectionMenu,
    drawStatusBar,
    displayMessage,
} from "./ui";
import {
    explainMovement,
    explainAttacking,
    explainSpellTargeting,
    explainWildSpells,
    explainInventory,
    explainSpellMenu,
    explainPickUpItem
} from "./tutorials";
import { getItems, InventoryItemDetails } from "./inventory";
import { assertUnreachable, Nullable } from "./util";
import { DeathSystem, getEffectiveHitPointData, getKnownSpells, LevelUpSystem, UpdateSchedulerSystem } from "./fighter";
import { DrawChestsSystem, DrawPlayerSystem, DrawSystem } from "./graphics";
import { LightingSystem } from "./lighting";
import {
    OnFireSystem,
    UpdateHitPointsEffectsSystem,
    UpdateStatsEffectsSystem,
    UpdateSpeedEffectsSystem,
    WetSystem,
    SilenceSystem
} from "./effects";
import { generateAICommand } from "./ai/commands";
import { debounce } from "lodash";

globals.gameEventEmitter = new EventEmitter();

export class SimpleDungeonCrawler {
    ecs: World;
    state: GameState;
    totalTurns: number;
    canvas: Nullable<HTMLElement>;
    display: Nullable<Display>;
    gameCamera: Camera;

    // debug flags
    processAI: boolean;
    processCommands: boolean;
    isLightingEnabled: boolean;
    debugPathfinding: boolean;
    debugAI: boolean;

    lastTimestamp: DOMHighResTimeStamp;
    deltaTime: DOMHighResTimeStamp;

    scheduler: EntityScheduler;
    player: Entity;
    currentActor: Nullable<Entity>;
    currentCommand: Nullable<Command>;
    map: GameMap;
    entityMap: Map<string, Entity[]>;

    private readonly keyBindingMenu: KeyBindingMenu;
    private readonly inventoryMenu: InventoryMenu;
    private readonly spellSelectionMenu: SpellSelectionMenu;

    constructor() {
        if (globals.window === null) { throw new Error("Global window cannot be null"); }
        if (globals.document === null) { throw new Error("Global document cannot be null"); }

        this.state = GameState.OpeningCinematic;
        this.canvas = null;
        this.display = null;
        this.currentActor = null;
        this.currentCommand = null;
        this.scheduler = new EntityScheduler();
        this.map = [];
        this.entityMap = new Map();
        this.totalTurns = 1;

        // debug flags
        this.processAI = true;
        this.processCommands = true;
        this.isLightingEnabled = true;
        this.debugPathfinding = false;

        this.display = new Display({
            width: WIDTH,
            height: HEIGHT,
            fontSize: Math.max(
                Math.floor(globals.window.innerHeight / 40),
                12
            ),
            forceSquareRatio: true
        });
        this.canvas = this.display.getContainer();
        if (this.canvas === null) { throw new Error("this.canvas cannot be null"); }

        const canvasContainer: Nullable<HTMLElement> = globals.document.getElementById("canvas");
        if (canvasContainer === null) { throw new Error("this.canvas cannot be null"); }
        canvasContainer.prepend(this.canvas);

        const loading: Nullable<HTMLElement> = globals.document.getElementById("loading");
        if (loading === null || loading.parentNode === null) { throw new Error("this.canvas cannot be null"); }
        loading.parentNode.removeChild(loading);

        globals.window.addEventListener(
            "resize",
            debounce(resizeGameDisplay, 300),
            { once: false }
        );

        this.keyBindingMenu = new KeyBindingMenu();
        this.inventoryMenu = new InventoryMenu();
        this.spellSelectionMenu = new SpellSelectionMenu();
        this.gameCamera = new Camera();
        this.ecs = new World({
            trackChanges: true,
            entityPool: 100,
            cleanupPools: true
        });
    }

    reset(): void {
        if (globals.document === null) { throw new Error("Global document cannot be null"); }
        this.ecs.entities.forEach((v) => {
            this.ecs.removeEntity(v);
        });

        this.currentActor = null;
        this.player = createEntity(this.ecs, "player", 1, 1);
        this.map = [];
        this.totalTurns = 1;

        this.loadLevel("forrest_001");
        this.scheduler.add(this.player.id, true);
        this.gameCamera.follow(this.player);

        const log = globals.document.getElementById("log");
        if (log === null) { return; }
        log.innerHTML = "";
    }

    async startGameplay(): Promise<void> {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter cannot be null"); }

        if (this.display !== null) {
            this.display.drawText(WIDTH - (WIDTH - 28), 22, "%c{white}Loading Sounds");
        }

        try {
            await loadSounds();
        } catch (err) {
            if (this.display !== null) {
                this.display.clear();
                this.display.drawText(WIDTH - (WIDTH - 10), 22, "%c{white}Error loading game files, please reload the page");
            }
            return;
        }

        loadEventualSounds();

        this.ecs.registerTags(
            "blocks",
            "blocksSight",
            "drawAfterSeen",
            "input",
            "sentient"
        );
        this.ecs.registerComponent(PositionComponent, 100);
        this.ecs.registerComponent(TypeComponent, 100);
        this.ecs.registerComponent(DisplayNameComponent, 100);
        this.ecs.registerComponent(GraphicsComponent, 100);
        this.ecs.registerComponent(ChestGraphicsComponent, 10);
        this.ecs.registerComponent(LightingComponent, 20);
        this.ecs.registerComponent(InventoryComponent, 20);
        this.ecs.registerComponent(HitPointsComponent, 50);
        this.ecs.registerComponent(HitPointsEffectComponent, 50);
        this.ecs.registerComponent(SpeedComponent, 50);
        this.ecs.registerComponent(SpeedEffectComponent, 50);
        this.ecs.registerComponent(StatsComponent, 50);
        this.ecs.registerComponent(StatsEffectComponent, 50);
        this.ecs.registerComponent(LevelComponent, 20);
        this.ecs.registerComponent(DamageAffinityComponent, 50);
        this.ecs.registerComponent(SpellsComponent, 20);
        this.ecs.registerComponent(PlannerAIComponent, 20);
        this.ecs.registerComponent(LoseTargetAIComponent, 20);
        this.ecs.registerComponent(FearAIComponent, 20);
        this.ecs.registerComponent(FallbackAIComponent, 50);
        this.ecs.registerComponent(PatrolAIComponent, 50);
        this.ecs.registerComponent(PatrolPathComponent, 50);
        this.ecs.registerComponent(ConfusedAIComponent, 10);
        this.ecs.registerComponent(InputHandlingComponent, 1);
        this.ecs.registerComponent(FreezableComponent, 50);
        this.ecs.registerComponent(FlammableComponent, 50);
        this.ecs.registerComponent(WetableComponent, 50);
        this.ecs.registerComponent(SilenceableComponent, 50);
        this.ecs.registerComponent(TriggerTypeComponent, 50);
        this.ecs.registerComponent(FireTriggerComponent, 20);
        this.ecs.registerComponent(EventTriggerComponent, 20);
        this.ecs.registerComponent(InteractableTypeComponent, 50);
        this.ecs.registerComponent(LoadLevelComponent, 10);
        this.ecs.registerComponent(RemoveAfterNTurnsComponent, 10);

        this.ecs.registerSystem("frame", LightingSystem);
        this.ecs.registerSystem("frame", DrawSystem);
        this.ecs.registerSystem("frame", DrawChestsSystem);
        this.ecs.registerSystem("frame", DrawPlayerSystem);

        this.ecs.registerSystem("postCommand", DeathSystem);
        this.ecs.registerSystem("postCommand", UpdateSchedulerSystem);
        this.ecs.registerSystem("postCommand", UpdateEntityMapSystem);

        this.ecs.registerSystem("postTurn", RemoveAfterNTurnsSystem);
        this.ecs.registerSystem("postTurn", UpdateHitPointsEffectsSystem);
        this.ecs.registerSystem("postTurn", UpdateStatsEffectsSystem);
        this.ecs.registerSystem("postTurn", UpdateSpeedEffectsSystem);
        this.ecs.registerSystem("postTurn", WetSystem);
        this.ecs.registerSystem("postTurn", OnFireSystem);
        this.ecs.registerSystem("postTurn", SilenceSystem);
        this.ecs.registerSystem("postTurn", LevelUpSystem);

        this.player = createEntity(this.ecs, "player", 1, 1);

        globals.gameEventEmitter.on("ui.openInventory", playOpenInventory);
        globals.gameEventEmitter.on("ui.closeInventory", playCloseInventory);
        globals.gameEventEmitter.on("ui.openSpells", playOpenSpells);
        globals.gameEventEmitter.on("ui.closeSpells", playCloseSpells);
        globals.gameEventEmitter.on("ui.openKeybinding", pauseMusic);
        globals.gameEventEmitter.on("ui.openKeybinding", playUIClick);
        globals.gameEventEmitter.on("ui.closeKeybinding", resumeMusic);
        globals.gameEventEmitter.on("ui.closeKeybinding", playUIClick);
        globals.gameEventEmitter.on("ui.select", playUIClick);
        globals.gameEventEmitter.on("ui.cursorMove", playUIRollover);

        globals.gameEventEmitter.on("level.loaded", playLevelTheme);
        globals.gameEventEmitter.on("door.open", playDoorOpen);
        globals.gameEventEmitter.on("chest.open", playChestOpen);
        globals.gameEventEmitter.on("crate.break", playBoxBreak);
        globals.gameEventEmitter.on("barrel.break", playBoxBreak);

        globals.gameEventEmitter.on("tutorial.start", explainMovement);
        globals.gameEventEmitter.on("tutorial.attacking", explainAttacking);
        globals.gameEventEmitter.on("tutorial.inventory", explainInventory);
        globals.gameEventEmitter.on("tutorial.spellMenu", explainSpellMenu);
        globals.gameEventEmitter.on("tutorial.pickUpItem", explainPickUpItem);
        globals.gameEventEmitter.on("tutorial.spellTargeting", explainSpellTargeting);
        globals.gameEventEmitter.on("tutorial.wildSpells", explainWildSpells);

        this.scheduler.add(this.player.id, true);
        this.gameCamera.follow(this.player);

        input.init();

        this.lastTimestamp = performance.now();
        this.mainLoop(performance.now());
    }

    /**
     * Draw the game world to the canvas
     */
    render(): void {
        if (this.display === null) { throw new Error("Cannot render without a display"); }
        if (this.player === null) { throw new Error("Cannot render without a player"); }

        const inputHandlerData = this.player.getOne(InputHandlingComponent);
        const inventoryData = this.player.getOne(InventoryComponent);
        const spellsData = this.player.getOne(SpellsComponent);

        switch (this.state) {
            case GameState.Gameplay:
                this.display.clear();
                this.gameCamera.update(this.map);

                drawMap(this.display, this.gameCamera, this.map);
                this.ecs.runSystems("frame");
                drawStatusBar(this.display, this.ecs, this.map, this.entityMap);
                break;
            case GameState.PauseMenu:
                if (inputHandlerData === undefined) {
                    return;
                }
                this.keyBindingMenu.draw(inputHandlerData.keyCommands);
                break;
            case GameState.InventoryMenu:
                if (inventoryData === undefined) {
                    return;
                }
                this.inventoryMenu.draw(getItems(inventoryData));
                break;
            case GameState.SpellMenu:
                if (spellsData === undefined) {
                    return;
                }
                this.spellSelectionMenu.draw(getKnownSpells(spellsData));
                break;
            case GameState.OpeningCinematic:
                this.display.clear();
                this.display.drawText(WIDTH - (WIDTH - 2), 15, "%c{white}This is an experiment to test a bunch of gameplay ideas I have. It doesn't represent a finished product, but I hope you'll enjoy it anyway!");
                this.display.drawText(WIDTH - (WIDTH - 18), 25, "%c{white}Press [enter] to start");
                break;
            case GameState.LoseCinematic:
                this.display.clear();
                this.display.drawText(WIDTH - (WIDTH - 23), 12, "%c{white}You have died");
                this.display.drawText(WIDTH - (WIDTH - 18), 15, "%c{white}Press [enter] to start");
                break;
            case GameState.WinCinematic:
                this.display.clear();
                this.display.drawText(WIDTH - (WIDTH - 18), 15, "%c{white}Press [enter] to restart the game");
                break;
            default:
                assertUnreachable(this.state);
        }

        this.display.drawWithCache();
    }

    /**
     * Load a tiled map into the game world
     * @param name {string} the name of the level to load
     */
    loadLevel(name: string): void {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter cannot be null"); }

        this.scheduler.clear();
        this.scheduler.add(this.player.id, true);

        const { map, playerLocation } = loadTiledMap(this.ecs, name);
        this.map = map;

        const playerPos = this.player.getOne(PositionComponent);
        if (playerPos === undefined) { throw new Error("Player doesn't have a PositionComponent"); }
        playerPos.x = playerLocation[0];
        playerPos.y = playerLocation[1];
        playerPos.update();

        this.ecs.runSystems("postCommand");

        globals.gameEventEmitter.emit("level.loaded", name);
    }

    /**
     * Read the current inputs and act on them according to the game state
     */
    handleInput(): void {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter cannot be null"); }
        const inputHandlerState = this.player.getOne(InputHandlingComponent);
        const playerInventory = this.player.getOne(InventoryComponent);
        const playerSpells = this.player.getOne(SpellsComponent);
        const playerSilence = this.player.getOne(SilenceableComponent);

        if (this.state === GameState.Gameplay) {
            if (input.isDown("Escape")) {
                globals.gameEventEmitter.emit("ui.openKeybinding");
                this.state = GameState.PauseMenu;
                return;
            }

            this.currentCommand = handleInput(this.ecs, this.map, this.entityMap, this.player);
            return;
        } else if (this.state === GameState.PauseMenu) {
            if (inputHandlerState === undefined) {
                return;
            }

            if (input.isDown("Escape")) {
                globals.gameEventEmitter.emit("ui.closeKeybinding");
                this.state = GameState.Gameplay;
                this.keyBindingMenu.resetState();
                return;
            }

            this.keyBindingMenu.handleInput(inputHandlerState.keyCommands);
        } else if (this.state === GameState.InventoryMenu) {
            if (playerInventory === undefined ||
                inputHandlerState === undefined) {
                return;
            }

            if (input.isDown("Escape")) {
                globals.gameEventEmitter.emit("ui.closeInventory");
                this.state = GameState.Gameplay;
                this.inventoryMenu.resetState();
                return;
            }

            const item: Nullable<InventoryItemDetails> = this.inventoryMenu.handleInput(
                getItems(playerInventory)
            );

            if (item !== null) {
                switch (item.type) {
                    case ItemType.HealSelf:
                    case ItemType.ClairvoyanceScroll:
                    case ItemType.HasteSelf:
                    case ItemType.WildDamageScroll:
                        this.state = GameState.Gameplay;

                        this.currentCommand = new UseItemCommand(
                            item.id, this.ecs, this.map, this.entityMap
                        );
                        break;
                    // Items that need to be targeted
                    case ItemType.DamageScroll:
                    case ItemType.SlowOther:
                    case ItemType.ConfuseScroll:
                        this.state = GameState.Gameplay;
                        inputHandlerState.itemForTarget = item;
                        inputHandlerState.state = PlayerState.Target;
                        inputHandlerState.update();
                        break;
                    default:
                        assertUnreachable(item.type);
                }
            }
        } else if (this.state === GameState.SpellMenu) {
            if (playerSpells === undefined ||
                inputHandlerState === undefined) {
                return;
            }

            if (input.isDown("Escape")) {
                globals.gameEventEmitter.emit("ui.closeSpells");
                this.state = GameState.Gameplay;
                this.spellSelectionMenu.resetState();
                return;
            }

            const spell = this.spellSelectionMenu.handleInput(
                getKnownSpells(playerSpells)
            );

            if (spell !== null) {
                if (playerSilence !== undefined && playerSilence.silenced) {
                    displayMessage("Cannot cast spells while silenced");
                    return;
                }

                switch (spell.type) {
                    case SpellType.Effect:
                    case SpellType.HealSelf:
                    case SpellType.Passive:
                    case SpellType.WildDamage:
                        this.state = GameState.Gameplay;

                        this.currentCommand = new UseSpellCommand(
                            spell.id, this.ecs, this.map, this.entityMap
                        );
                        break;
                    case SpellType.DamageOther:
                    case SpellType.HealOther:
                        this.state = GameState.Gameplay;
                        inputHandlerState.spellForTarget = spell;
                        inputHandlerState.state = PlayerState.Target;
                        inputHandlerState.update();
                        break;
                    default:
                        assertUnreachable(spell.type);
                }
            }
        } else if (this.state === GameState.OpeningCinematic) {
            if (input.isDown("Enter")) {
                this.loadLevel("forrest_001");
                this.state = GameState.Gameplay;
                globals.gameEventEmitter.emit("tutorial.start");
            }
        } else if (this.state === GameState.WinCinematic) {
            if (input.isDown("Enter")) {
                this.reset();
                this.state = GameState.Gameplay;
            }
        } else if (this.state === GameState.LoseCinematic) {
            if (input.isDown("Enter")) {
                this.reset();
                this.state = GameState.Gameplay;
            }
        }

        return;
    }

    mainLoop(timestamp: DOMHighResTimeStamp): void {
        globals.animationFrameID = window.requestAnimationFrame(this.mainLoop.bind(this));

        this.deltaTime = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;

        if (this.currentActor === null) {
            this.currentActor = this.ecs.getEntity(
                this.scheduler.next()!
            )!;
        }

        // Command generation
        if (this.currentActor !== null && this.currentCommand === null) {
            if (this.currentActor === this.player) {
                this.handleInput();
            } else {
                if (this.processAI) {
                    this.currentCommand = generateAICommand(
                        this.ecs,
                        this.currentActor,
                        this.map,
                        this.entityMap
                    );
                } else {
                    this.currentCommand = new NoOpCommand(true);
                }
            }
        }

        // Run the command
        if (this.currentCommand !== null &&
            this.currentActor !== null &&
            this.processCommands === true) {
            this.currentCommand.execute(this.deltaTime, this.currentActor);
        }

        // Schedule the next actor and run post command systems if finished
        if (this.currentCommand !== null && this.currentCommand.isFinished()) {
            if (this.currentCommand.usedTurn()) {
                if (this.currentActor === this.player) {
                    this.ecs.runSystems("postTurn");
                    this.totalTurns++;
                }

                this.ecs.runSystems("postCommand");

                this.currentActor = this.ecs.getEntity(
                    this.scheduler.next()!
                )!;
            }

            this.currentCommand = null;

            if (this.debugPathfinding) {
                resetTilePathCosts(this.map);
            }
        }

        const hpData = getEffectiveHitPointData(this.player);
        if (hpData === null || hpData.hp <= 0) {
            this.state = GameState.LoseCinematic;
        }

        this.render();
        input.clearInputs();
        this.ecs.tick();
    }

    getTurnNumber(): number {
        return this.totalTurns;
    }
}

function resizeGameDisplay() {
    if (globals.Game === null ||
        globals.Game.display === null ||
        globals.window === null) { return; }

    globals.Game.display.setOptions({
        fontSize: Math.max(
            Math.floor(globals.window.innerHeight / 40),
            12
        )
    });
}
