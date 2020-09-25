/* global ENV */

"use strict";

import { Display, Scheduler } from "rot-js";
import EventEmitter from "events";

import globals from "./globals";
import { createObject } from "./object";
import { moveCommand, openInventoryCommand, openSpellsCommand, getItemCommand } from "./commands";
import { WIDTH, HEIGHT } from "./data";
import {
    drawMap,
    getObjectsAtLocation,
    resetVisibility,
    loadTiledMap,
    findVolumeCollision
} from "./map";
import { drawUI, clearScreen, KeyBindingMenu, InventoryMenu, SpellSelectionMenu } from "./ui";
import { explainMovement, explainAttacking } from "./tutorials";
import { readKey } from "./util";

export function mouseLook(e) {
    const pos = globals.Game.display.eventToPosition(e);
    const target = getObjectsAtLocation(globals.Game.gameObjects, pos[0], pos[1])[0];
    if (target && target.name && target.ai && target.ai.state) {
        if (target.ai.state === "wander") {
            globals.Game.displayMessage("A " + target.name + ", it hasn't seen you.");
        } else {
            globals.Game.displayMessage("A " + target.name);
        }
    } else if (target && target.name) {
        globals.Game.displayMessage(target.name);
    } else if (!target) {
        globals.Game.displayMessage(globals.Game.map[pos[1]][pos[0]].name);
    }
}

class SimpleDungeonCrawler {
    constructor() {
        this.state = "gameplay";
        this.canvas = null;
        this.display = null;
        this.player = null;
        this.engine = null;
        this.scheduler = null;
        this.gameObjects = [];
        this.map = [];
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

        globals.gameEventEmitter = new EventEmitter();

        this.registerListeners();
    }

    registerListeners() {
        globals.gameEventEmitter.on("tutorial.start", explainMovement);
        globals.gameEventEmitter.on("tutorial.attacking", explainAttacking);
    }

    reset() {
        clearScreen(this.display);
        this.player.fighter = null;
        this.player.ai = null;
        this.player = null;
        this.map = [];
        this.gameObjects = [];
        this.totalTurns = 0;
        this.scheduler.clear();

        const log = globals.document.getElementById("log");
        log.innerHTML = "";
    }

    openingCinematic() {
        this.display.drawText(WIDTH - (WIDTH - 7), 12, "%c{white}Your country is being overrun by the forces of darkness");
        this.display.drawText(WIDTH - (WIDTH - 8), 15, "%c{white}Tales tell of a weapon of great power lost in the");
        this.display.drawText(WIDTH - (WIDTH - 4), 16, "%c{white}lands beyond the dwarf stronghold Durdwin, under the Red Hills.");
        this.display.drawText(WIDTH - (WIDTH - 17), 18, "%c{white}None who have entered have returned");
        this.display.drawText(WIDTH - (WIDTH - 14), 20, "%c{white}It is the last hope of a desperate people");
        this.display.drawText(WIDTH - (WIDTH - 16), 21, "%c{white}You have volunteered to retrieve it");
        this.display.drawText(WIDTH - (WIDTH - 24), 27, "%c{white}Press [enter] to start");

        const parent = this;
        globals.window.addEventListener("keydown", function _listener(e) {
            if (e.key === "Enter") {
                parent.startGameplay();
                globals.window.removeEventListener("keydown", _listener);
            }
        });
    }

    winCinematic() {
        this.reset();

        this.display.drawText(WIDTH - (WIDTH - 12), 12, "%c{white}You have reached the bottom and have retrieved");
        this.display.drawText(WIDTH - (WIDTH - 16), 13, "%c{white}the fabled weapon and saved your people");
        this.display.drawText(WIDTH - (WIDTH - 18), 24, "%c{white}Press [enter] to restart the game");

        const parent = this;
        globals.window.addEventListener("keydown", function _listener(e) {
            if (e.key === "Enter") {
                parent.startGameplay();
                globals.window.removeEventListener("keydown", _listener);
            }
        });
    }

    loseCinematic() {
        this.reset();

        this.display.drawText(WIDTH - (WIDTH - 5), 12, "%c{white}You have died, and the last hope of your people dies with you");
        this.display.drawText(WIDTH - (WIDTH - 18), 24, "%c{white}Press [enter] to restart the game");

        const parent = this;
        globals.window.addEventListener("keydown", function _listener(e) {
            if (e.key === "Enter") {
                parent.startGameplay();
                globals.window.removeEventListener("keydown", _listener);
            }
        });
    }

    startGameplay() {
        // looking at objects on the map with the mouse
        this.hookMouseLook();

        this.scheduler = new Scheduler.Speed();
        this.player = createObject("player", 1, 1);

        this.loadLevel("forrest_001");

        globals.gameEventEmitter.emit("tutorial.start");

        this.mainLoop();
    }

    displayMessage(text, type = "default") {
        const log = globals.document.getElementById("log");
        const el = document.createElement("div");
        const p = document.createElement("p");
        const small = document.createElement("p");
        p.innerHTML = `${text}`;

        if (type === "tutorial") {
            el.className = "tutorial";
        } else {
            small.innerHTML = `<small>Turn: ${this.totalTurns}</small>`;
        }

        el.appendChild(p);
        el.appendChild(small);
        log.appendChild(el);

        while (log.children.length > 100) {
            log.children[0].remove();
        }

        log.scrollTop = log.scrollHeight;
    }

    render() {
        if (this.state === "gameplay") {
            resetVisibility(this.map);

            this.gameObjects
                .filter(o => o.lighting && typeof o.lighting.compute === "function")
                .forEach(o => o.lighting.compute(this.map));
            this.player.lighting.compute(this.map);

            drawMap(this.display, this.map);

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
                .forEach(o => o.graphics.draw(this.display, this.map));

            this.player.graphics.draw(this.display, this.map);
            drawUI(this.display, this.player);
        } else if (this.state === "pause_menu") {
            this.keyBindingMenu.draw(this.keyCommands);
        } else if (this.state === "inventory_menu") {
            this.inventoryMenu.draw(this.player.inventoryComponent.getItems());
        } else if (this.state === "spell_menu") {
            this.spellSelectionMenu.draw(this.player.fighter.getKnownSpells());
        }
    }

    loadLevel(name) {
        const { map, playerLocation, objects, volumes } = loadTiledMap(name);
        this.map = map;
        this.gameObjects = objects;
        this.volumes = volumes;

        this.player.x = playerLocation[0];
        this.player.y = playerLocation[1];
        this.player.fighter.mana = this.player.fighter.maxMana;

        this.scheduler.clear();
        this.scheduler.add(this.player, true);
        this.gameObjects.forEach(e => this.scheduler.add(e, true));
    }

    async handleInput() {
        let acted;
        do {
            if (this.player.fighter === null || this.player.fighter.hp <= 0) { return; }

            this.render();

            const e = await readKey();
            e.preventDefault();

            if (this.state === "gameplay") {
                if (e.key === "Escape") {
                    this.state = "pause_menu";
                    continue;
                }

                if (this.keyCommands.map(c => c.key).indexOf(e.key) === -1) {
                    acted = false;
                    continue;
                }

                const command = this.keyCommands.filter(c => c.key === e.key)[0].command;
                acted = command(this.player);
            } else if (this.state === "pause_menu") {
                if (e.key === "Escape") {
                    this.state = "gameplay";
                    this.keyBindingMenu.resetState();
                    this.render();
                    continue;
                }

                this.keyBindingMenu.handleInput(e.key, this.keyCommands);
            } else if (this.state === "inventory_menu") {
                if (e.key === "Escape") {
                    this.state = "gameplay";
                    this.inventoryMenu.resetState();
                    this.render();
                    continue;
                }

                const command = this.inventoryMenu.handleInput(e.key, this.player.inventoryComponent.getItems());
                if (command) {
                    acted = await command(this.player);
                    if (acted) {
                        this.state = "gameplay";
                    }
                }
            } else if (this.state === "spell_menu") {
                if (e.key === "Escape") {
                    this.state = "gameplay";
                    this.spellSelectionMenu.resetState();
                    this.render();
                    continue;
                }

                const command = this.spellSelectionMenu.handleInput(e.key, this.player.fighter.getKnownSpells());
                if (command) {
                    acted = await command(this.player);
                    if (acted) {
                        this.state = "gameplay";
                    }
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
            } else {
                await actor.act();
            }

            if (this.player.fighter === null) {
                this.loseCinematic();
                break;
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
        // and we don't want anything other than the Game object interacting
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
}
export { SimpleDungeonCrawler };
