/* global ENV */

"use strict";

import { EventEmitter } from "events";
import { Display, Scheduler } from "./rot/index";

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
import { createObject } from "./object";
import {
    moveCommand,
    openInventoryCommand,
    openSpellsCommand,
    getItemCommand
} from "./commands";
import { WIDTH, HEIGHT, GameState } from "./data";
import {
    drawMap,
    getObjectsAtLocation,
    resetVisibility,
    loadTiledMap,
    findVolumeCollision
} from "./map";
import {
    drawUI,
    KeyBindingMenu,
    InventoryMenu,
    SpellSelectionMenu,
    displayMessage
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
import { readKey } from "./util";

globals.gameEventEmitter = new EventEmitter();

/**
 * Function to bind the mousedown event to looking at
 * objects or tiles in the game world and printing a
 * message to the log.
 * @param {Event} e The JS event object
 * @returns {void}
 */
export function mouseLook(e) {
    const [x, y] = globals.Game.display.eventToPosition(e);
    const target = getObjectsAtLocation(globals.Game.gameObjects, x, y)[0];
    const tile = globals.Game.map[y][x];

    if (!tile.isVisibleAndLit()) {
        displayMessage("Can't see what's there.");
        return;
    }

    if (target && target.name && target.ai && target.ai.state) {
        if (target.ai.state === "wander") {
            displayMessage("A " + target.name + ", it hasn't seen you.");
        } else {
            displayMessage("A " + target.name);
        }
    } else if (target && target.name) {
        displayMessage(target.name);
    } else if (!target) {
        displayMessage(tile.name);
    }
}

class SimpleDungeonCrawler {
    constructor() {
        this.state = GameState.openingCinematic;
        this.canvas = null;
        this.display = null;
        this.player = null;
        this.scheduler = new Scheduler.Speed();
        this.gameObjects = [];
        this.map = [];
        this.volumes = [];
        this.pathNodes = [];
        this.totalTurns = 0;

        if (ENV === "TEST") {
            this.display = null;
            this.canvas = null;
        } else {
            this.display = new Display({
                width: WIDTH,
                height: HEIGHT,
                fontSize: 13,
                forceSquareRatio: true
            });
            this.canvas = this.display.getContainer();
            globals.document.getElementById("canvas").prepend(this.canvas);

            const loading = globals.document.getElementById("loading");
            loading.parentNode.removeChild(loading);
        }

        this.keyCommands = [
            { key: "w", description: "Move Up", command: moveCommand(0, 8) },
            { key: "e", description: "Move Up Right", command: moveCommand(1, 8) },
            { key: "d", description: "Move Right", command: moveCommand(2, 8) },
            { key: "c", description: "Move Down Right", command: moveCommand(3, 8) },
            { key: "s", description: "Move Down", command: moveCommand(4, 8) },
            { key: "z", description: "Move Down Left", command: moveCommand(5, 8) },
            { key: "a", description: "Move Left", command: moveCommand(6, 8) },
            { key: "q", description: "Move Up Left", command: moveCommand(7, 8) },
            { key: "i", description: "Inventory", command: openInventoryCommand() },
            { key: "g", description: "Get Item", command: getItemCommand() },
            { key: "m", description: "Spells", command: openSpellsCommand() }
        ];

        this.keyBindingMenu = new KeyBindingMenu();
        this.inventoryMenu = new InventoryMenu();
        this.spellSelectionMenu = new SpellSelectionMenu();
        this.gameCamera = new Camera();
    }

    reset() {
        this.player = createObject("player", 1, 1);
        this.map = [];
        this.gameObjects = [];
        this.totalTurns = 0;
        this.scheduler.clear();
        this.scheduler.add(this.player);
        this.gameCamera.follow(this.player);

        this.loadLevel("forrest_001");

        if (ENV !== "TEST") {
            const log = globals.document.getElementById("log");
            log.innerHTML = "";
        }
    }

    async startGameplay() {
        this.display.drawText(WIDTH - (WIDTH - 28), 22, "%c{white}Loading Sounds");

        try {
            await loadSounds();
        } catch (err) {
            this.display.clear();
            this.display.drawText(WIDTH - (WIDTH - 10), 22, "%c{white}Error loading game files, please reload the page");
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

        this.player = createObject("player", 1, 1);
        this.scheduler.add(this.player);
        this.gameCamera.follow(this.player);

        globals.gameEventEmitter.emit("tutorial.start");

        this.mainLoop();
    }

    render() {
        switch (this.state) {
            case GameState.gameplay:
                this.display.clear();
                this.gameCamera.update(this.map);

                resetVisibility(this.map);
                this.gameObjects
                    .filter(o => o.lighting && typeof o.lighting.compute === "function")
                    .forEach(o => o.lighting.compute(this.map));

                drawMap(this.display, this.gameCamera, this.map);

                this.gameObjects
                    .filter(o => o.graphics && typeof o.graphics.draw === "function")
                    // Make sure objects with fighters cannot be drawn over
                    .sort((a, b) => {
                        if (!a.fighter && b.fighter) {
                            return -1;
                        }
                        if (!a.fighter && !b.fighter) {
                            return -1;
                        }
                        if (a.fighter && !b.fighter) {
                            return 1;
                        }
                        return 0;
                    })
                    .forEach(o => o.graphics.draw(
                        this.display,
                        this.gameCamera,
                        this.map,
                        this.gameObjects
                    ));

                drawUI(this.display, this.player);
                break;
            case GameState.pauseMenu:
                this.keyBindingMenu.draw(this.keyCommands);
                break;
            case GameState.inventoryMenu:
                this.inventoryMenu.draw(this.player.inventoryComponent.getItems());
                break;
            case GameState.spellMenu:
                this.spellSelectionMenu.draw(this.player.fighter.getKnownSpells());
                break;
            case GameState.openingCinematic:
                this.display.clear();
                this.display.drawText(WIDTH - (WIDTH - 7), 12, "%c{white}Your country is being overrun by the forces of darkness");
                this.display.drawText(WIDTH - (WIDTH - 8), 15, "%c{white}Tales tell of a weapon of great power lost in the");
                this.display.drawText(WIDTH - (WIDTH - 4), 16, "%c{white}lands beyond the dwarf stronghold Durdwin, under the Red Hills.");
                this.display.drawText(WIDTH - (WIDTH - 17), 18, "%c{white}None who have entered have returned");
                this.display.drawText(WIDTH - (WIDTH - 14), 20, "%c{white}It is the last hope of a desperate people");
                this.display.drawText(WIDTH - (WIDTH - 16), 21, "%c{white}You have volunteered to retrieve it");
                this.display.drawText(WIDTH - (WIDTH - 24), 27, "%c{white}Press [enter] to start");
                break;
            case GameState.loseCinematic:
                this.display.clear();
                this.display.drawText(WIDTH - (WIDTH - 5), 12, "%c{white}You have died, and the last hope of your people dies with you");
                this.display.drawText(WIDTH - (WIDTH - 18), 24, "%c{white}Press [enter] to restart the game");
                break;
            case GameState.winCinematic:
                this.display.clear();
                this.display.drawText(WIDTH - (WIDTH - 12), 12, "%c{white}You have reached the bottom and have retrieved");
                this.display.drawText(WIDTH - (WIDTH - 16), 13, "%c{white}the fabled weapon and saved your people");
                this.display.drawText(WIDTH - (WIDTH - 18), 24, "%c{white}Press [enter] to restart the game");
                break;
            default:
                throw new Error(`Unknown state ${this.state}`);
        }
    }

    loadLevel(name) {
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

    async handleInput() {
        let acted;
        do {
            this.render();

            const e = await readKey();
            e.preventDefault();

            if (this.state === GameState.gameplay) {
                if (e.key === "Escape") {
                    globals.gameEventEmitter.emit("ui.openKeybinding");
                    this.state = GameState.pauseMenu;
                    continue;
                }

                if (this.keyCommands.map(c => c.key).indexOf(e.key) === -1) {
                    acted = false;
                    continue;
                }

                const command = this.keyCommands.filter(c => c.key === e.key)[0].command;
                acted = command(this.player);
            } else if (this.state === GameState.pauseMenu) {
                if (e.key === "Escape") {
                    globals.gameEventEmitter.emit("ui.closeKeybinding");
                    this.state = GameState.gameplay;
                    this.keyBindingMenu.resetState();
                    this.render();
                    continue;
                }

                this.keyBindingMenu.handleInput(e.key, this.keyCommands);
            } else if (this.state === GameState.inventoryMenu) {
                if (e.key === "Escape") {
                    globals.gameEventEmitter.emit("ui.closeInventory");
                    this.state = GameState.gameplay;
                    this.inventoryMenu.resetState();
                    this.render();
                    continue;
                }

                const command = this.inventoryMenu.handleInput(
                    e.key,
                    this.player.inventoryComponent.getItems()
                );

                if (command) {
                    this.state = GameState.gameplay;
                    this.render();
                    acted = await command(this.player);
                    if (!acted) {
                        this.state = GameState.inventoryMenu;
                    }
                }
            } else if (this.state === GameState.spellMenu) {
                if (e.key === "Escape") {
                    globals.gameEventEmitter.emit("ui.closeSpells");
                    this.state = GameState.gameplay;
                    this.spellSelectionMenu.resetState();
                    this.render();
                    continue;
                }

                const command = this.spellSelectionMenu.handleInput(
                    e.key,
                    this.player.fighter.getKnownSpells()
                );

                if (command) {
                    this.state = GameState.gameplay;
                    this.render();
                    acted = await command(this.player);
                    if (!acted) {
                        this.state = GameState.spellMenu;
                    }
                }
            } else if (this.state === GameState.openingCinematic) {
                if (e.key === "Enter") {
                    this.hookMouseLook();
                    this.loadLevel("forrest_001");
                    this.state = GameState.gameplay;
                }
            } else if (this.state === GameState.winCinematic) {
                if (e.key === "Enter") {
                    this.reset();
                    this.state = GameState.gameplay;
                }
            } else if (this.state === GameState.loseCinematic) {
                if (e.key === "Enter") {
                    this.reset();
                    this.state = GameState.gameplay;
                }
            }
        } while (!acted);
    }

    async mainLoop() {
        while (true) {
            const actor = this.scheduler.next();

            if (actor === this.player) {
                this.totalTurns++;
                await this.handleInput();
            }
            actor.act(this.map, this.gameObjects, this.pathNodes);

            if (this.player.fighter === null || this.player.fighter.hp <= 0) {
                this.state = GameState.loseCinematic;
            }

            const volumes = findVolumeCollision(this.volumes, actor);
            if (volumes.length) {
                volumes.forEach(v => v.enter(actor));
            }
        }
    }

    hookMouseLook() {
        // break out the hook and unhook mouse look into their own functions
        // because other actions need to take over the mouse at some points
        // and we don"t want anything other than the Game object interacting
        // with the canvas
        this.canvas.addEventListener("mousedown", mouseLook);
    }

    unhookMouseLook() {
        this.canvas.removeEventListener("mousedown", mouseLook);
    }

    addObject(object) {
        this.gameObjects.push(object);
        this.scheduler.add(this.gameObjects[this.gameObjects.length - 1], true);
    }

    /**
     * Remove an object from the world
     * @param  {GameObject} object The object to remove
     * @return {void}
     */
    removeObject(object) {
        // could use an object pool or a linked list to speed up this operation
        // but that seems overkill for this
        this.gameObjects.splice(this.gameObjects.indexOf(object), 1);
        this.scheduler.remove(object);
    }

    getTurnNumber() {
        return this.totalTurns;
    }
}
export { SimpleDungeonCrawler };