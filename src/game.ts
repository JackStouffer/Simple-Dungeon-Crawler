import { EventEmitter } from "events";
import { Display } from "./rot/index";
import { default as SpeedScheduler } from "./rot/scheduler/speed";

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
import { createObject, GameObject } from "./object";
import {
    useItemCommand,
    Command,
    useSpellCommand
} from "./commands";
import { WIDTH, HEIGHT, GameState, LevelName, ItemType, SpellType } from "./data";
import input from "./input";
import { PlayerState } from "./input-handler";
import {
    GameMap,
    Point,
    drawMap,
    getObjectsAtLocation,
    resetVisibility,
    loadTiledMap,
    findVolumeCollision,
    PathNode,
    setAllToExplored
} from "./map";
import {
    drawUI,
    KeyBindingMenu,
    InventoryMenu,
    SpellSelectionMenu,
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
import { Volume } from "./volume";
import { SpellFighterDetails } from "./fighter";
import { InventoryItemDetails } from "./inventory";
import { assertUnreachable, Nullable } from "./util";

globals.gameEventEmitter = new EventEmitter();

/**
 * Unhook the mouse look functionality and then listen for a mouse
 * input. If it's a left click on an object with a fighter component,
 * then re-hook the mouse look function and pass the target to the
 * callback cb.
 * @return {void}
 */
export function mouseTarget(
    mousePosition: Point,
    gameObjects: GameObject[]
): Nullable<GameObject> {
    let target = null;
    const objects = getObjectsAtLocation(gameObjects, mousePosition.x, mousePosition.y);

    for (let i = 0; i < objects.length; i++) {
        if (objects[i].fighter !== null || objects[i].interactable !== null) {
            target = objects[i];
            break;
        }
    }

    return target;
}

export class SimpleDungeonCrawler {
    state: GameState;
    totalTurns: number;
    canvas: Nullable<HTMLElement>;
    display: Nullable<Display>;
    gameCamera: Camera;
    processAI: boolean;
    isLightingEnabled: boolean;

    scheduler: SpeedScheduler;
    player: GameObject;
    currentActor: Nullable<GameObject>;
    gameObjects: GameObject[];
    map: GameMap;
    volumes: Volume[];
    pathNodes: Map<number, PathNode>;

    keyBindingMenu: KeyBindingMenu;
    inventoryMenu: InventoryMenu;
    spellSelectionMenu: SpellSelectionMenu;

    constructor() {
        this.state = GameState.OpeningCinematic;
        this.canvas = null;
        this.display = null;
        this.player = createObject("player", 1, 1);
        this.currentActor = null;
        this.scheduler = new SpeedScheduler();
        this.gameObjects = [];
        this.map = [];
        this.volumes = [];
        this.pathNodes = new Map();
        this.totalTurns = 1;

        this.processAI = true;
        this.isLightingEnabled = true;

        this.display = new Display({
            width: WIDTH,
            height: HEIGHT,
            fontSize: 14,
            forceSquareRatio: true
        });
        this.canvas = this.display.getContainer();
        globals.document.getElementById("canvas").prepend(this.canvas);

        const loading = globals.document.getElementById("loading");
        loading.parentNode.removeChild(loading);

        this.keyBindingMenu = new KeyBindingMenu();
        this.inventoryMenu = new InventoryMenu();
        this.spellSelectionMenu = new SpellSelectionMenu();
        this.gameCamera = new Camera();
    }

    reset(): void {
        this.player = createObject("player", 1, 1);
        this.map = [];
        this.gameObjects = [];
        this.totalTurns = 1;
        this.scheduler.clear();
        this.scheduler.add(this.player, true);
        this.gameCamera.follow(this.player);

        this.loadLevel("forrest_001");

        const log = globals.document.getElementById("log");
        log.innerHTML = "";
    }

    async startGameplay(): Promise<void> {
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

        this.scheduler.add(this.player, true);
        this.gameCamera.follow(this.player);

        globals.gameEventEmitter.emit("tutorial.start");

        input.init();

        this.mainLoop();
    }

    /**
     * Draw the game world to the canvas
     */
    render(): void {
        if (this.display === null) { throw new Error("Cannot render without a display"); }
        if (this.player === null) { throw new Error("Cannot render without a player"); }

        switch (this.state) {
            case GameState.Gameplay:
                this.display.clear();
                this.gameCamera.update(this.map);

                if (this.isLightingEnabled) {
                    resetVisibility(this.map);
                    for (let i = 0; i < this.gameObjects.length; i++) {
                        const obj = this.gameObjects[i];
                        if (obj.lighting !== null) {
                            obj.lighting.compute(this.map);
                        }
                    }
                } else {
                    setAllToExplored(this.map, true, true);
                }

                drawMap(this.display, this.gameCamera, this.map);

                this.gameObjects
                    .filter(o => o.graphics !== null)
                    // Make sure objects with fighters cannot be drawn over
                    .sort((a, b) => {
                        if (a.fighter === null && b.fighter !== null) {
                            return -1;
                        }
                        if (a.fighter === null && b.fighter === null) {
                            return -1;
                        }
                        if (a.fighter !== null && b.fighter === null) {
                            return 1;
                        }
                        return 0;
                    })
                    .forEach(o => o.graphics!.draw(
                        this.display!,
                        this.gameCamera,
                        this.map,
                        this.gameObjects
                    ));

                drawUI(this.display!, this.player, this.gameObjects, this.map);
                break;
            case GameState.PauseMenu:
                if (this.player.inputHandler === null) {
                    break;
                }
                this.keyBindingMenu.draw(this.player.inputHandler.keyCommands);
                break;
            case GameState.InventoryMenu:
                if (this.player.inventory === null) {
                    break;
                }
                this.inventoryMenu.draw(this.player.inventory.getItems());
                break;
            case GameState.SpellMenu:
                if (this.player.fighter === null) {
                    break;
                }
                this.spellSelectionMenu.draw(this.player.fighter.getKnownSpells());
                break;
            case GameState.OpeningCinematic:
                this.display.clear();
                this.display.drawText(WIDTH - (WIDTH - 18), 15, "%c{white}Press [enter] to start");
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
    loadLevel(name: LevelName): void {
        const { map, playerLocation, objects, volumes, pathNodes } = loadTiledMap(name);
        this.map = map;
        objects.push(this.player);
        this.gameObjects = objects;
        this.volumes = volumes;
        this.pathNodes = pathNodes;

        this.player.x = playerLocation[0];
        this.player.y = playerLocation[1];

        this.scheduler.clear();
        this.gameObjects.forEach(e => this.scheduler.add(e, true));

        globals.gameEventEmitter.emit("level.loaded", name);
    }

    /**
     * Read the current inputs and act on them according to the game state
     */
    handleInput(): boolean {
        let acted: boolean = false;

        if (this.state === GameState.Gameplay) {
            if (input.isDown("Escape")) {
                globals.gameEventEmitter.emit("ui.openKeybinding");
                this.state = GameState.PauseMenu;
                return acted;
            }

            for (let i = 0; i < this.gameObjects.length; i++) {
                const object = this.gameObjects[i];
                if (object.inputHandler !== null) {
                    const command: Nullable<Command> = object.inputHandler.handleInput(
                        this.map, this.gameObjects
                    );
                    if (command !== null) {
                        acted = command(object);
                    }
                    return acted;
                }
            }
        } else if (this.state === GameState.PauseMenu) {
            if (input.isDown("Escape")) {
                globals.gameEventEmitter.emit("ui.closeKeybinding");
                this.state = GameState.Gameplay;
                this.keyBindingMenu.resetState();
                return acted;
            }

            if (this.player.inputHandler === null) {
                return acted;
            }

            this.keyBindingMenu.handleInput(this.player.inputHandler.keyCommands);
        } else if (this.state === GameState.InventoryMenu) {
            if (input.isDown("Escape")) {
                globals.gameEventEmitter.emit("ui.closeInventory");
                this.state = GameState.Gameplay;
                this.inventoryMenu.resetState();
                return acted;
            }

            if (this.player.inventory === null) {
                return acted;
            }

            const item: Nullable<InventoryItemDetails> = this.inventoryMenu.handleInput(
                this.player.inventory.getItems()
            );

            if (item !== null) {
                let command: Nullable<Command> = null;

                switch (item.type) {
                    case ItemType.HealSelf:
                    case ItemType.AddManaSelf:
                    case ItemType.ClairvoyanceScroll:
                    case ItemType.HasteSelf:
                    case ItemType.WildDamageScroll:
                        command = useItemCommand(item.id);
                        this.state = GameState.Gameplay;
                        acted = command(this.player);
                        if (!acted) {
                            this.state = GameState.InventoryMenu;
                        }
                        break;
                    // Items that need to be targeted
                    case ItemType.DamageScroll:
                    case ItemType.SlowOther:
                    case ItemType.ConfuseScroll:
                        this.state = GameState.Gameplay;

                        if (this.player.inputHandler === null) {
                            break;
                        }
                        this.player.inputHandler.itemForTarget = item;
                        this.player.inputHandler.setState(PlayerState.Target);
                        break;
                    default:
                        assertUnreachable(item.type);
                }
            }
        } else if (this.state === GameState.SpellMenu) {
            if (input.isDown("Escape")) {
                globals.gameEventEmitter.emit("ui.closeSpells");
                this.state = GameState.Gameplay;
                this.spellSelectionMenu.resetState();
                return acted;
            }

            if (this.player.fighter === null) {
                return acted;
            }

            const spell: Nullable<SpellFighterDetails> = this.spellSelectionMenu.handleInput(
                this.player.fighter.getKnownSpells()
            );

            if (spell !== null) {
                switch (spell.type) {
                    case SpellType.Effect:
                    case SpellType.HealSelf:
                    case SpellType.Passive:
                    case SpellType.WildDamage:
                        this.state = GameState.Gameplay;
                        acted = useSpellCommand(spell.id)(this.player);
                        if (!acted) {
                            this.state = GameState.SpellMenu;
                        }
                        break;
                    case SpellType.DamageOther:
                        this.state = GameState.Gameplay;

                        if (this.player.inputHandler === null) {
                            break;
                        }
                        this.player.inputHandler.spellForTarget = spell;
                        this.player.inputHandler.setState(PlayerState.Target);
                        break;
                    default:
                        assertUnreachable(spell.type);
                }
            }
        } else if (this.state === GameState.OpeningCinematic) {
            if (input.isDown("Enter")) {
                this.loadLevel("forrest_001");
                this.state = GameState.Gameplay;
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

        return acted;
    }

    mainLoop(): void {
        globals.animationFrameID = window.requestAnimationFrame(this.mainLoop.bind(this));

        const acted = this.handleInput();
        if (acted === true) {
            const volumes = findVolumeCollision(this.volumes, this.player);
            if (volumes.length > 0) {
                volumes.forEach((v: Volume) => v.enter(this.player));
            }

            if (this.processAI) {
                do {
                    this.currentActor = this.scheduler.next();
                    if (this.currentActor === null) { continue; }

                    this.currentActor.act(this.map, this.gameObjects, this.pathNodes);

                    const volumes = findVolumeCollision(this.volumes, this.currentActor);
                    if (volumes.length > 0) {
                        volumes.forEach((v: Volume) => v.enter(this.currentActor!));
                    }
                } while (this.currentActor !== this.player);
            }

            this.totalTurns++;
        }

        if (this.player.fighter === null || this.player.fighter.getEffectiveStats().hp <= 0) {
            this.state = GameState.LoseCinematic;
        }

        this.render();
        input.clearInputs();
    }

    addObject(object: GameObject): void {
        this.gameObjects.push(object);
        this.scheduler.add(this.gameObjects[this.gameObjects.length - 1], true);
    }

    /**
     * Remove an object from the world
     * @param  {GameObject} object The object to remove
     * @return {void}
     */
    removeObject(object: GameObject): void {
        // could use an object pool or a linked list to speed up this operation
        // but that seems overkill for this
        this.gameObjects.splice(this.gameObjects.indexOf(object), 1);
        this.scheduler.remove(object);
    }

    getTurnNumber(): number {
        return this.totalTurns;
    }
}
