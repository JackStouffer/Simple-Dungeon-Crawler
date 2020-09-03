"use strict";

import { Display, Scheduler, Engine } from "rot-js";

import globals from "./globals";
import { createObject } from "./object";
import { WIDTH, HEIGHT, UI_HEIGHT } from "./data";
import { drawMap, getObjectsAtLocation, resetVisibility, loadTiledMap } from "./map";
import { drawUI, clearScreen } from "./ui";

globals.window = window;

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

/**
 * Class inside the scheduler which handles the normal functions of
 * the game loop which aren't related to initiating the behavior of
 * actors or objects
 */
class Manager {
    constructor(game) {
        this.game = game;
    }

    act() {
        this.game.engine.lock();

        if (this.game.player.fighter === null) {
            this.game.loseCinematic();
            return;
        }

        resetVisibility(this.game.map);
        this.game.drawAll();
        this.game.engine.unlock();
    }
}

class SimpleDungeonCrawler {
    constructor() {
        this.canvas = null;
        this.display = null;
        this.player = null;
        this.engine = null;
        this.scheduler = null;
        this.gameObjects = [];
        this.map = [];
        this.currentLogLines = [];
        this.totalMessages = 0;
        this.display = new Display({
            width: WIDTH,
            height: HEIGHT,
            fontSize: 13,
            forceSquareRatio: true
        });
        this.canvas = this.display.getContainer();
        document.getElementById("canvas").appendChild(this.canvas);

        this.openingCinematic();
    }

    reset () {
        clearScreen(this.display);
        this.player.fighter = null;
        this.player.ai = null;
        globals.window.removeEventListener("keydown", this.player.ai);
        this.player = null;
        this.map = [];
        this.gameObjects = [];
        this.currentLogLines = [];
        this.scheduler.clear();
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

        this.scheduler = new Scheduler.Simple();
        this.manager = new Manager(this);
        this.player = createObject("player", 1, 1);
        this.loadLevel("forrest_001");
    }

    displayMessage(text) {
        this.totalMessages++;

        for (let i = 0; i < WIDTH; i++) {
            for (let j = 1; j < UI_HEIGHT; j++) {
                this.display.draw(i, HEIGHT - j, "", "black", "black");
            }
        }

        if (this.currentLogLines.length === 5) {
            this.currentLogLines.splice(0, 1);
        }
        this.currentLogLines.push(this.totalMessages + ") " + text);
        for (let d = 0; d < this.currentLogLines.length; d++) {
            this.display.drawText(0,  HEIGHT - 5 + d, "%c{white}" + this.currentLogLines[d]);
        }
    }

    drawAll() {
        this.gameObjects
            .filter(o => o.lighting && typeof o.lighting.compute === "function")
            .forEach(o => o.lighting.compute(this.map));
        this.player.lighting.compute(this.map);

        drawMap(this.display, this.map);

        this.gameObjects
            .filter(o => o.graphics && typeof o.graphics.draw === "function")
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
    }

    loadLevel (name) {
        const {map, playerLocation, objects} = loadTiledMap(name);
        this.map = map;
        this.gameObjects = objects;

        this.player.x = playerLocation[0];
        this.player.y = playerLocation[1];
        this.player.fighter.mana = this.player.fighter.maxMana;

        this.scheduler.clear();
        this.scheduler.add(this.manager, true);
        this.scheduler.add(this.player, true);
        this.gameObjects.forEach(e => this.scheduler.add(e, true));
        this.engine = new Engine(this.scheduler);
        this.engine.start();
    }

    hookMouseLook () {
        // break out the hook and unhook mouse look into their own functions
        // because other actions need to take over the mouse at some points
        // and we don't want anything other than the Game object interacting
        // with the canvas
        this.canvas.addEventListener("mousedown", mouseLook);
    }

    unhookMouseLook () {
        this.canvas.removeEventListener("mousedown", mouseLook);
    }

    addObject (object) {
        this.gameObjects.push(object);
        this.scheduler.add(this.gameObjects[this.gameObjects.length - 1], true);
    }

    /**
     * Remove an object from the world
     * @param  {GameObject} object The object to remove
     * @return {void}
     */
    removeObject (object) {
        // could use an object pool or a linked list to speed up this operation
        // but that seems overkill for this
        this.gameObjects.splice(this.gameObjects.indexOf(object), 1);
        this.scheduler.remove(object);
    }
}
globals.Game = new SimpleDungeonCrawler();
