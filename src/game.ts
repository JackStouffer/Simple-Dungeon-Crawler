import { EventEmitter } from "events";
import { Entity, World } from "ape-ecs";
import * as PIXI from "pixi.js";

import EntityScheduler from "./rot/scheduler/ecs";

import globals from "./globals";
import {
    loadSounds,
    loadEventualSounds,
    playCloseInventory,
    playCloseSpells,
    playUIClick,
    playLevelTheme,
    pauseMusic,
    resumeMusic,
    playOpenInventory,
    playOpenSpells
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
    UpdateEntityMapSystem,
    EntityMap,
    StunnableComponent,
    removeEntity,
    EntityTeamMap,
    DialogMemoryComponent,
    UpdateEntityTeamsSystem
} from "./entity";
import {
    Command,
    MoveCameraCommand,
    NoOpCommand,
    UseSkillCommand
} from "./commands";
import { ItemType, SpellType } from "./constants";
import input from "./input";
import { playerInput, PlayerState } from "./input-handler";
import {
    GameMap,
    drawMap,
    loadTiledMap,
    resetTilePathCosts,
    ShadowBox
} from "./map";
import {
    KeyBindingMenu,
    InventoryMenu,
    SpellSelectionMenu,
    StatusBar,
    displayMessage,
} from "./ui";
import {
    explainMovement,
    explainAttacking,
    explainSpellTargeting,
    explainWildSpells,
    explainInventory,
    explainSpellMenu,
    explainPickUpItem,
    explainSpellCasts,
    explainSpellShrine,
    explainEnvironmentInteractivity,
    explainEnemySurrounding
} from "./tutorials";
import { getItems, hasItem, InventoryItemDetails, useItem } from "./inventory";
import { assertUnreachable, Nullable } from "./util";
import { DeathSystem, getEffectiveHitPointData, getKnownSpells, LevelUpSystem, UpdateSchedulerSystem, useSpell } from "./fighter";
import { DrawChestsSystem, DrawPlayerSystem, DrawSystem } from "./graphics";
import { LightingSystem } from "./lighting";
import {
    OnFireSystem,
    UpdateHitPointsEffectsSystem,
    UpdateStatsEffectsSystem,
    UpdateSpeedEffectsSystem,
    WetSystem,
    SilenceSystem,
    StunSystem,
    FrozenSystem
} from "./effects";
import { generateAICommands } from "./ai/commands";
import { ItemData, SpellData } from "./skills";

globals.gameEventEmitter = new EventEmitter();

interface GameState {
    enter: (game: SimpleDungeonCrawler) => void;
    exit: (game: SimpleDungeonCrawler) => void;
    update: (game: SimpleDungeonCrawler) => void;
    handleInput: (game: SimpleDungeonCrawler) => void;
    render: (game: SimpleDungeonCrawler) => void;
}

const OpeningCinematicState: GameState = {
    enter(game: SimpleDungeonCrawler): void {
        game.blackBackground.visible = true;
        game.openingText.visible = true;
    },

    exit(game: SimpleDungeonCrawler) {
        game.blackBackground.visible = false;
        game.openingText.visible = false;
    },

    handleInput(game: SimpleDungeonCrawler) {
        if (input.isDown("Enter")) {
            game.player = createEntity(game.ecs, game.textureAtlas, "player", 1, 1);
            game.scheduler.add(game.player.id, true);

            game.openingText.visible = false;
            game.loadLevel("tutorial_001");
            game.setState(game.gameplayState);
            globals.gameEventEmitter!.emit("tutorial.start");
        }
    },

    update() {},
    render() {}
};

const WiningCinematicState: GameState = {
    enter(game: SimpleDungeonCrawler) {
        game.blackBackground.visible = true;
        game.winningText.visible = true;
    },

    exit(game: SimpleDungeonCrawler) {
        game.blackBackground.visible = false;
        game.winningText.visible = false;
        game.reset();
        game.loadLevel("tutorial_001");
        globals.gameEventEmitter!.emit("tutorial.start");
    },

    handleInput(game: SimpleDungeonCrawler) {
        if (input.isDown("Enter")) {
            game.setState(game.gameplayState);
        }
    },

    update() {},
    render() {}
};

const LosingCinematicState: GameState = {
    enter(game: SimpleDungeonCrawler) {
        game.blackBackground.visible = true;
        game.losingText.visible = true;
    },

    exit(game: SimpleDungeonCrawler) {
        game.blackBackground.visible = false;
        game.losingText.visible = false;
        game.reset();
        game.loadLevel("tutorial_001");
        globals.gameEventEmitter!.emit("tutorial.start");
    },

    handleInput(game: SimpleDungeonCrawler) {
        if (input.isDown("Enter")) {
            game.setState(game.gameplayState);
        }
    },

    update() {},
    render() {}
};

const GameplayState: GameState = {
    enter(game: SimpleDungeonCrawler): void {
        game.statusBar.setVisible(true);
    },
    exit(game: SimpleDungeonCrawler) {
        game.statusBar.setVisible(false);
    },

    update(game: SimpleDungeonCrawler) {
        // Turn order
        if (game.currentActor === null) {
            game.currentActor = game.ecs.getEntity(
                game.scheduler.next()!
            )!;
            // Camera update
            if (game.currentActor === game.player &&
                game.gameCamera.following !== game.player) {
                game.commandQueue.unshift(
                    new MoveCameraCommand(game.map, game.gameCamera, game.currentActor)
                );
            }
        }

        // Command generation
        if (game.currentActor !== null &&
            game.currentActor !== game.player &&
            game.commandQueue.length === 0) {
            if (game.processAI) {
                game.commandQueue.push(...generateAICommands(
                    game.ecs,
                    game.map,
                    game.entityMap,
                    game.entityTeams,
                    game.currentActor
                ));
            } else {
                game.commandQueue.push(new NoOpCommand(true));
            }
        }

        if (game.shouldProcessCommands && game.currentActor !== null) {
            game.processCommands();
        }

        const hpData = getEffectiveHitPointData(game.player);
        if (hpData === null || hpData.hp <= 0) {
            game.setState(game.losingCinematicState);
        } else {
            game.statusBar.update(game.ecs, game.map, game.entityMap);
        }
    },

    handleInput(game: SimpleDungeonCrawler) {
        const inputHandlerState = game.player.getOne(InputHandlingComponent);
        if (inputHandlerState === undefined) {
            return;
        }

        // TODO, cleanup: Maybe move these ifs to the player input handling code
        if (input.isDown("Escape") && inputHandlerState.state === PlayerState.Combat) {
            game.setState(game.pauseMenuState);
            return;
        } else if (input.isDown("Escape") && inputHandlerState.state === PlayerState.Target) {
            inputHandlerState.state = PlayerState.Combat;
            inputHandlerState.itemForTarget = null;
            inputHandlerState.spellForTarget = null;
            inputHandlerState.update();
            displayMessage("Canceled casting");
            return;
        }

        if (game.currentActor === game.player) {
            const command = playerInput(game.ecs, game.map, game.entityMap, game.player);
            if (command !== null) {
                game.commandQueue.push(command);
            }
        }
    },

    render(game: SimpleDungeonCrawler): void {
        game.gameCamera.update(game.map);
        drawMap(game.gameCamera, game.map);
        game.ecs.runSystems("frame");
    }
};

const PauseMenuState: GameState = {
    enter(game: SimpleDungeonCrawler) {
        pauseMusic();
        playUIClick();

        const inputHandlerState = game.player.getOne(InputHandlingComponent);
        if (inputHandlerState === undefined) { throw new Error("player needs an input"); }
        game.keyBindingMenu.open(inputHandlerState.keyCommands);
    },

    exit(game: SimpleDungeonCrawler) {
        resumeMusic();
        playUIClick();
        game.keyBindingMenu.close();
    },

    handleInput(game: SimpleDungeonCrawler) {
        const inputHandlerState = game.player.getOne(InputHandlingComponent);
        if (inputHandlerState === undefined) {
            return;
        }

        if (input.isDown("Escape")) {
            game.setState(game.gameplayState);
            return;
        }

        game.keyBindingMenu.handleInput(inputHandlerState.keyCommands);
    },

    update() {},
    render() {}
};

const InventoryMenuState: GameState = {
    enter(game: SimpleDungeonCrawler) {
        playOpenInventory();
        const invData = game.player.getOne(InventoryComponent)!;
        game.inventoryMenu.open(getItems(invData));
    },

    exit(game: SimpleDungeonCrawler) {
        playCloseInventory();
        game.inventoryMenu.close();
    },

    handleInput(game: SimpleDungeonCrawler) {
        const inputHandlerState = game.player.getOne(InputHandlingComponent);
        const playerInventory = game.player.getOne(InventoryComponent);
        if (playerInventory === undefined ||
            inputHandlerState === undefined) {
            return;
        }

        if (input.isDown("Escape")) {
            game.setState(game.gameplayState);
            return;
        }

        const item: Nullable<InventoryItemDetails> = game.inventoryMenu.handleInput(
            getItems(playerInventory)
        );

        if (item !== null) {
            // This really should never happen. Just for sanity checking
            if (!hasItem(playerInventory, item.id)) {
                displayMessage(`You don't have ${item.displayName} in your inventory`);
                return;
            }

            switch (item.type) {
                case ItemType.HealSelf:
                case ItemType.ClairvoyanceScroll:
                case ItemType.HasteSelf:
                case ItemType.WildDamageScroll:
                    game.setState(game.gameplayState);

                    game.commandQueue.push(new UseSkillCommand(
                        game.player,
                        ItemData[item.id],
                        undefined,
                        undefined,
                        useItem
                    ));
                    break;
                // Items that need to be targeted
                case ItemType.DamageScroll:
                case ItemType.SlowOther:
                case ItemType.ConfuseScroll:
                    inputHandlerState.itemForTarget = item;
                    inputHandlerState.state = PlayerState.Target;
                    inputHandlerState.update();
                    game.setState(game.gameplayState);
                    break;
                default:
                    assertUnreachable(item.type);
            }
        }
    },

    update() {},
    render() {}
};

const SpellMenuState: GameState = {
    enter(game: SimpleDungeonCrawler) {
        playOpenSpells();
        const spellsData = game.player.getOne(SpellsComponent)!;
        game.spellSelectionMenu.open(getKnownSpells(spellsData));
    },

    exit(game: SimpleDungeonCrawler) {
        playCloseSpells();
        game.spellSelectionMenu.close();
    },

    handleInput(game: SimpleDungeonCrawler) {
        const inputHandlerState = game.player.getOne(InputHandlingComponent);
        const playerSpells = game.player.getOne(SpellsComponent);
        const playerSilence = game.player.getOne(SilenceableComponent);
        if (playerSpells === undefined ||
            inputHandlerState === undefined) {
            return;
        }

        if (input.isDown("Escape")) {
            game.setState(game.gameplayState);
            return;
        }

        const spell = game.spellSelectionMenu.handleInput(
            getKnownSpells(playerSpells)
        );

        if (spell !== null) {
            if (playerSilence !== undefined && playerSilence.silenced) {
                displayMessage("Cannot cast spells while silenced");
                return;
            }

            if (!(spell.id in playerSpells.knownSpells)) {
                displayMessage(`You don't know ${spell.displayName}`);
                return;
            }

            if ((playerSpells.knownSpells[spell.id]?.count ?? -1) < 1) {
                displayMessage(`You don't have enough casts to use ${spell.displayName}`);
                return;
            }

            switch (spell.type) {
                case SpellType.Effect:
                case SpellType.HealSelf:
                case SpellType.Passive:
                case SpellType.WildDamage:
                case SpellType.Push:
                    game.commandQueue.push(new UseSkillCommand(
                        game.player,
                        SpellData[spell.id],
                        undefined,
                        undefined,
                        useSpell
                    ));
                    game.setState(game.gameplayState);
                    break;
                case SpellType.DamageOther:
                case SpellType.HealOther:
                    inputHandlerState.spellForTarget = spell;
                    inputHandlerState.state = PlayerState.Target;
                    inputHandlerState.update();
                    game.setState(game.gameplayState);
                    break;
                default:
                    assertUnreachable(spell.type);
            }
        }
    },

    update() {},
    render() {}
};

export class SimpleDungeonCrawler {
    ecs: World;
    totalTurns: number;
    canvas: Nullable<HTMLElement>;
    tileSet: HTMLImageElement;
    pixiApp: PIXI.Application;
    textureAtlas: PIXI.ITextureDictionary;
    gameCamera: Camera;

    state: GameState;
    openingCinematicState = OpeningCinematicState;
    winingCinematicState = WiningCinematicState;
    losingCinematicState = LosingCinematicState;
    gameplayState = GameplayState;
    pauseMenuState = PauseMenuState;
    inventoryMenuState = InventoryMenuState;
    spellMenuState = SpellMenuState;

    // debug flags
    processAI: boolean;
    shouldProcessCommands: boolean;
    isLightingEnabled: boolean;
    debugPathfinding: boolean;
    debugAI: boolean;
    debugAIDialog: boolean;

    lastTimestamp: DOMHighResTimeStamp;
    deltaTime: DOMHighResTimeStamp;

    scheduler: EntityScheduler;
    player: Entity;
    currentActor: Nullable<Entity>;
    commandQueue: Command[];
    map: GameMap;
    entityMap: EntityMap;
    // Shadow boxes are a way of forcing multi-tiled entities and static tile objects to be lit properly
    shadowBoxes: ShadowBox[];
    entityTeams: EntityTeamMap;

    keyBindingMenu: KeyBindingMenu;
    inventoryMenu: InventoryMenu;
    spellSelectionMenu: SpellSelectionMenu;
    statusBar: StatusBar;

    blackBackground: PIXI.Graphics;
    openingText: PIXI.Text;
    losingText: PIXI.Text;
    winningText: PIXI.Text;
    loadingText: PIXI.Text;

    constructor() {
        if (globals.window === null) { throw new Error("Global window cannot be null"); }
        if (globals.document === null) { throw new Error("Global document cannot be null"); }

        this.canvas = null;
        this.currentActor = null;
        this.commandQueue = [];
        this.scheduler = new EntityScheduler();
        this.map = new GameMap("", [[[]]]);
        this.entityMap = new Map();
        this.shadowBoxes = [];
        this.totalTurns = 1;

        this.state = this.openingCinematicState;

        // debug flags
        this.processAI = true;
        this.shouldProcessCommands = true;
        this.isLightingEnabled = true;
        this.debugPathfinding = false;
        this.debugAI = false;
        this.debugAIDialog = false;

        this.pixiApp = new PIXI.Application({ width: 928, height: 608 });

        const canvasContainer: Nullable<HTMLElement> = globals.document.getElementById("canvas");
        if (canvasContainer === null) { throw new Error("this.canvas cannot be null"); }

        canvasContainer.prepend(this.pixiApp.view);
        this.canvas = this.pixiApp.view;
        PIXI.settings.RESOLUTION = window.devicePixelRatio ?? 1;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this.pixiApp.stage.sortableChildren = true;
        PIXI.Loader.shared.onProgress.add((loader: PIXI.Loader) => {
            parent.loadingText.text = `Loading Textures: ${loader.progress}%`;
        });

        this.blackBackground = new PIXI.Graphics();
        this.blackBackground.beginFill(0x000000);
        this.blackBackground.drawRect(0, 0, this.pixiApp.screen.width, this.pixiApp.screen.height);
        this.blackBackground.endFill();
        this.blackBackground.zIndex = 20;
        this.blackBackground.visible = false;
        this.pixiApp.stage.addChild(this.blackBackground);

        this.openingText = new PIXI.Text(
            "This is an experiment to test a bunch of gameplay ideas I have. \nIt doesn't represent a finished product, but I hope you'll enjoy it anyway!\n\n\nPress [enter] to start",
            { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF, align : "center" }
        );
        this.openingText.x = 150;
        this.openingText.y = 200;
        this.openingText.visible = false;
        this.openingText.zIndex = 25;
        this.pixiApp.stage.addChild(this.openingText);

        this.losingText = new PIXI.Text(
            "You have died\n\n\nPress [enter] to restart",
            { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF, align : "center" }
        );
        this.losingText.x = 360;
        this.losingText.y = 200;
        this.losingText.visible = false;
        this.losingText.zIndex = 25;
        this.pixiApp.stage.addChild(this.losingText);

        this.winningText = new PIXI.Text(
            "You won!\n\n\nPress [enter] to restart the game",
            { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF, align : "center" }
        );
        this.winningText.x = 300;
        this.winningText.y = 200;
        this.winningText.visible = false;
        this.winningText.zIndex = 25;
        this.pixiApp.stage.addChild(this.winningText);

        this.loadingText = new PIXI.Text(
            "Loading",
            { fontFamily : "monospace", fontSize: 14, fill : 0xFFFFFF, align : "center" }
        );
        this.loadingText.x = 380;
        this.loadingText.y = 200;
        this.loadingText.visible = true;
        this.loadingText.zIndex = 25;
        this.pixiApp.stage.addChild(this.loadingText);

        const parent = this;
        PIXI.Loader
            .shared
            .add("bin/images/packed_rougelike_sheet.png")
            .add("bin/images/sprites.json")
            .load((loader, resources) => {
                parent.textureAtlas = resources["bin/images/sprites.json"]!.textures!;

                const loading: Nullable<HTMLElement> = globals.document!.getElementById("loading");
                if (loading === null || loading.parentNode === null) { throw new Error("this.canvas cannot be null"); }
                loading.parentNode.removeChild(loading);

                parent.keyBindingMenu = new KeyBindingMenu(parent.pixiApp.stage);
                parent.inventoryMenu = new InventoryMenu(parent.pixiApp.stage);
                parent.spellSelectionMenu = new SpellSelectionMenu(parent.pixiApp.stage);
                parent.statusBar = new StatusBar(parent.pixiApp.stage);
                parent.gameCamera = new Camera(parent.pixiApp.screen);
                parent.ecs = new World({
                    trackChanges: true,
                    entityPool: 200,
                    cleanupPools: true
                });

                parent
                    .startGameplay()
                    .then(() => parent.pixiApp.ticker.add(parent.mainLoop.bind(parent)));
            });
    }

    setState(state: GameState): void {
        this.state.exit(this);
        this.state = state;
        this.state.enter(this);
    }

    reset(): void {
        if (globals.document === null) { throw new Error("Global document cannot be null"); }

        this.scheduler.clear();
        this.ecs.entities.forEach((e) => {
            removeEntity(this.ecs, e);
        });

        this.currentActor = null;
        this.player = createEntity(this.ecs, this.textureAtlas, "player", 1, 1);
        this.totalTurns = 1;

        this.loadLevel("tutorial_001");
        this.scheduler.add(this.player.id, true);
        this.gameCamera.following = this.player;

        const log = globals.document.getElementById("log");
        if (log === null) { return; }
        log.innerHTML = "";
    }

    async startGameplay(): Promise<void> {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter cannot be null"); }

        this.loadingText.text = "Loading Sounds";

        try {
            await loadSounds();
        } catch (err) {
            this.loadingText.text = "There was an error when loading sounds. Please reload and try again";
            return;
        }

        loadEventualSounds();

        this.ecs.registerTags(
            "blocks",
            "blocksSight",
            "drawAfterSeen",
            "input",
            "sentient",
            "moveable",
            "aquatic",
            "environmentTile",
            "waterTile"
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
        this.ecs.registerComponent(DialogMemoryComponent, 20);
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
        this.ecs.registerComponent(StunnableComponent, 50);
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

        this.ecs.registerSystem("postTurn", DeathSystem);
        this.ecs.registerSystem("postTurn", UpdateSchedulerSystem);
        this.ecs.registerSystem("postTurn", UpdateEntityMapSystem);
        this.ecs.registerSystem("postTurn", UpdateEntityTeamsSystem);

        this.ecs.registerSystem("postOneTurnCycle", RemoveAfterNTurnsSystem);
        this.ecs.registerSystem("postOneTurnCycle", UpdateHitPointsEffectsSystem);
        this.ecs.registerSystem("postOneTurnCycle", UpdateStatsEffectsSystem);
        this.ecs.registerSystem("postOneTurnCycle", UpdateSpeedEffectsSystem);
        this.ecs.registerSystem("postOneTurnCycle", WetSystem);
        this.ecs.registerSystem("postOneTurnCycle", OnFireSystem);
        this.ecs.registerSystem("postOneTurnCycle", SilenceSystem);
        this.ecs.registerSystem("postOneTurnCycle", StunSystem);
        this.ecs.registerSystem("postOneTurnCycle", FrozenSystem);
        this.ecs.registerSystem("postOneTurnCycle", LevelUpSystem);

        globals.gameEventEmitter.on("tutorial.start", explainMovement);
        globals.gameEventEmitter.on("tutorial.attacking", explainAttacking);
        globals.gameEventEmitter.on("tutorial.inventory", explainInventory);
        globals.gameEventEmitter.on("tutorial.spellMenu", explainSpellMenu);
        globals.gameEventEmitter.on("tutorial.pickUpItem", explainPickUpItem);
        globals.gameEventEmitter.on("tutorial.spellTargeting", explainSpellTargeting);
        globals.gameEventEmitter.on("tutorial.wildSpells", explainWildSpells);
        globals.gameEventEmitter.on("tutorial.spellCasts", explainSpellCasts);
        globals.gameEventEmitter.on("tutorial.spellShrine", explainSpellShrine);
        globals.gameEventEmitter.on("tutorial.environmentInteractivity", explainEnvironmentInteractivity);
        globals.gameEventEmitter.on("tutorial.enemySurrounding", explainEnemySurrounding);

        input.init();
        this.loadingText.visible = false;
        this.openingText.visible = true;
    }

    /**
     * Load a tiled map into the game world by name
     */
    loadLevel(name: string): void {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter cannot be null"); }

        for (const e of this.ecs.entities.values()) {
            if (e.id !== this.player.id) {
                removeEntity(this.ecs, e);
            }
        }

        for (let z = 0; z < this.map.depth; z++) {
            for (let y = 0; y < this.map.height; y++) {
                for (let x = 0; x < this.map.width; x++) {
                    const tile = this.map.data[z][y][x];
                    if (tile !== null) {
                        tile.sprite.visible = false;
                        this.pixiApp.stage.removeChild(tile.sprite);
                        tile.sprite.destroy();
                    }
                }
            }
        }

        this.scheduler.clear();
        this.scheduler.add(this.player.id, true);

        const { map, playerLocation, shadowBoxes, teams } = loadTiledMap(
            this.ecs,
            this.pixiApp.stage,
            this.textureAtlas,
            name
        );
        this.map = map;
        this.shadowBoxes = shadowBoxes;
        this.entityTeams = teams;

        const playerPos = this.player.getOne(PositionComponent);
        if (playerPos === undefined) { throw new Error("Player doesn't have a PositionComponent"); }
        playerPos.x = playerLocation[0];
        playerPos.y = playerLocation[1];
        const tile = this.gameCamera.worldPositionToTile(playerPos.x, playerPos.y);
        playerPos.tileX = tile.x;
        playerPos.tileY = tile.y;
        playerPos.update();

        for (const query of this.ecs.queries) {
            query.refresh();
        }
        this.ecs.runSystems("postTurn");
        this.gameCamera.update(this.map);

        playLevelTheme(name);
    }

    processCommands(): void {
        for (let i = 0; i < this.commandQueue.length; i++) {
            const command = this.commandQueue[i];

            if (command.setUp !== undefined && !command.isSetUp) {
                command.setUp();
                command.isSetUp = true;
            }

            command.update(this.deltaTime);

            if (command.isFinished()) {
                if (command.usedTurn()) {
                    if (this.currentActor === this.player) {
                        this.ecs.runSystems("postOneTurnCycle");
                        this.totalTurns++;
                    }

                    this.ecs.runSystems("postTurn");
                    this.currentActor = null;
                }


                if (command.tearDown !== undefined) {
                    command.tearDown();
                }
                this.commandQueue.splice(i, 1);
                --i;

                if (this.debugPathfinding) {
                    resetTilePathCosts(this.map);
                }
            }

            if (command.blocks) { break; }
        }
    }

    update(): void {
        this.state.update(this);
    }

    /**
     * Draw the game world to the canvas
     */
    render(): void {
        this.state.render(this);
    }

    /**
     * Read the current inputs and act on them according to the game state
     */
    handleInput(): void {
        this.state.handleInput(this);
    }

    mainLoop(): void {
        this.deltaTime = this.pixiApp.ticker.deltaMS;
        this.handleInput();
        this.update();
        this.render();
        input.clearInputs();
        this.ecs.tick();
    }
}
