'use strict';

// Ideas
//
// Find some way to incorporate the speed scheduler while also having the manager draw
// everything once per turn cycle
// 
// Remove the ability to farm trash mobs by having persistent world state when moving
// between levels
//
// Status effects: sleep, bleed (work like dark souls, not damage over time), fatigued,
// rage (increased strength but lose control), attack up/down, defense up/down,
// speed up/down, freeze
// 
// Sight range effected by world lighting. So same logic which appiles to the PC
// seeing lights in the distance when the line of sight is clear would apply.
// Would need to separate the player's "lantern" from the logic around lighting
// and make it a sight range.
//
// Shrines/other object that gives permanent stat buffs
//
// Remove log from game ui and make scrollable text log as element on the page
//
// Tutorials that spawn in the log with special color/background when something
// happens. Have global flags that mark if a tutorial has already happened
//
// Passive by default, high level enemies that are difficult to defeat but give
// good drops
//
// Enemies that only run away after seeing the player and then disappear after
// so many turns running away. Give great drops.
//
// Thieves that go around stealing items from chests. Have to catch them before
// moving to next level to get the items back.
//
// Shop every few floors. Turns hostile if attacked, very hard enemy but drops good loot
//
// Player lantern is infinite but can be put away so they can sneak
// by enemies who don't have night vision, cost of reduced visibility
//
// Doors in dungeon maps to break line of sight, possibly spawn keys
// for locked ones to encourage exploration
//
// locked chests, good loot, opened by found keys or lock picks
//
// Monster infighting, would have to implement teams/factions
// 
// Phone interface

const randomIntFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const mouseLook = function(e) {
    const pos = Game.display.eventToPosition(e);
    const target = getObjectsAtLocation(Game.gameObjects, pos[0], pos[1])[0];
    if (target && target.name && target.ai && target.ai.state) {
        if (target.ai.state === "wander") {
            Game.displayMessage("A " + target.name + ", it hasn't seen you.");
        } else {
            Game.displayMessage("A " + target.name);
        }
    } else if (target && target.name) {
        Game.displayMessage(target.name);
    } else if (!target) {
        Game.displayMessage(Game.map[pos[1]][pos[0]].name);
    }
};

/**
 * Class inside the scheduler which handles the normal functions of
 * the game loop which aren't related to initiating the behavior of
 * actors or objects
 */
class Manager {
    act() {
        Game.engine.lock();
        Game.currentTurn++;

        if (Game.player.fighter === null) {
            Game.loseCinematic();
            return;
        }

        resetVisibility(Game.map);
        Game.drawAll();
        Game.engine.unlock();
    }
}

/**
 * god object
 */
let Game = {
    canvas: null,
    display: null,
    player: null,
    engine: null,
    scheduler: null,
    gameObjects: [],
    map: [],
    currentLogLines: [],
    currentLevel: 0,
    currentTurn: 0,
    totalMessages: 0,

    init: function() {
        this.display = new ROT.Display({
            width: WIDTH,
            height: HEIGHT,
            fontSize: 13,
            forceSquareRatio: true
        });
        this.canvas = this.display.getContainer();
        document.getElementById("canvas").appendChild(this.canvas);

        this.openingCinematic();
    },

    reset: function () {
        clearScreen(this.display);
        this.player.fighter = null;
        this.player.ai = null;
        window.removeEventListener("keydown", this.player.ai);
        this.player = null;
        this.currentLevel = 0;
        this.map = [];
        this.gameObjects = [];
        this.currentLogLines = [];
        this.scheduler.clear();
    },

    openingCinematic: function() {
        this.display.drawText(WIDTH - (WIDTH - 7), 12, "%c{white}Your country is being overrun by the forces of darkness");
        this.display.drawText(WIDTH - (WIDTH - 8), 15, "%c{white}Tales tell of a weapon of great power lost in the");
        this.display.drawText(WIDTH - (WIDTH - 4), 16, "%c{white}lands beyond the dwarf stronghold Durdwin, under the Red Hills.");
        this.display.drawText(WIDTH - (WIDTH - 17), 18, "%c{white}None who have entered have returned");
        this.display.drawText(WIDTH - (WIDTH - 14), 20, "%c{white}It is the last hope of a desperate people");
        this.display.drawText(WIDTH - (WIDTH - 16), 21, "%c{white}You have volunteered to retrieve it");
        this.display.drawText(WIDTH - (WIDTH - 24), 27, "%c{white}Press [enter] to start");

        const parent = this;
        window.addEventListener("keydown", function _listener(e) {
            if (e.key === "Enter") {
                parent.startGameplay();
                window.removeEventListener("keydown", _listener);
            }
        });
    },

    winCinematic: function() {
        this.reset();

        this.display.drawText(WIDTH - (WIDTH - 12), 12, "%c{white}You have reached the bottom and have retrieved");
        this.display.drawText(WIDTH - (WIDTH - 16), 13, "%c{white}the fabled weapon and saved your people");
        this.display.drawText(WIDTH - (WIDTH - 18), 24, "%c{white}Press [enter] to restart the game");

        const parent = this;
        window.addEventListener("keydown", function _listener(e) {
            if (e.key === "Enter") {
                parent.startGameplay();
                window.removeEventListener("keydown", _listener);
            }
        });
    },

    loseCinematic: function() {
        this.reset();

        this.display.drawText(WIDTH - (WIDTH - 5), 12, "%c{white}You have died, and the last hope of your people dies with you");
        this.display.drawText(WIDTH - (WIDTH - 18), 24, "%c{white}Press [enter] to restart the game");

        const parent = this;
        window.addEventListener("keydown", function _listener(e) {
            if (e.key === "Enter") {
                parent.startGameplay();
                window.removeEventListener("keydown", _listener);
            }
        });
    },

    startGameplay: function() {
        // looking at objects on the map with the mouse
        this.hookMouseLook();

        this.scheduler = new ROT.Scheduler.Simple();
        this.manager = new Manager();
        this.player = createObject("player", 1, 1);
        this.loadLevel("level_1");
    },
    
    displayMessage: function(text) {
        this.totalMessages++;

        for (let i = 0; i < WIDTH; i++) {
            for (let j = 1; j < UI_HEIGHT; j++) {
                this.display.draw(i, HEIGHT - j, MAP_FILLED_SPACE, "black", "black");
            }
        }

        if (this.currentLogLines.length === 5) {
            this.currentLogLines.splice(0, 1);
        }
        this.currentLogLines.push(this.totalMessages + ") " + text);
        for (let d = 0; d < this.currentLogLines.length; d++) {
            this.display.drawText(0,  HEIGHT - 5 + d, "%c{white}" + this.currentLogLines[d]);
        }
    },

    drawAll() {
        this.gameObjects
            .filter(o => o.lighting && typeof o.lighting.compute === "function")
            .forEach(o => o.lighting.compute(Game.map));
        this.player.lighting.compute(this.map);

        drawMap(this.display, this.map);

        // FIX ME: dead bodies draw over enemies on the same tile
        this.gameObjects
            .filter(o => o.graphics && typeof o.graphics.draw === "function")
            .forEach(o => o.graphics.draw(Game.display, Game.map));

        this.player.graphics.draw(this.display, this.map);
        drawUI(this.display, this.currentLevel, this.player);
    },

    loadLevel: function (name) {
        this.currentLevel++;

        if (this.currentLevel === 21) {
            this.winCinematic();
            return;
        }

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
        this.engine = new ROT.Engine(this.scheduler);
        this.engine.start();
    },

    hookMouseLook: function () {
        // break out the hook and unhook mouse look into their own functions
        // because other actions need to take over the mouse at some points
        // and we don't want anything other than the Game object interacting
        // with the canvas
        this.canvas.addEventListener("mousedown", mouseLook);
    },

    unhookMouseLook: function () {
        this.canvas.removeEventListener("mousedown", mouseLook);
    },

    addObject: function (object) {
        this.gameObjects.push(object);
        this.scheduler.add(this.gameObjects[this.gameObjects.length - 1], true);
    },

    /**
     * Remove an object from the world
     * @param  {GameObject} object The object to remove
     * @return {void}
     */
    removeObject: function (object) {
        // could use an object pool or a linked list to speed up this operation
        // but that seems overkill for this
        this.gameObjects.splice(this.gameObjects.indexOf(object), 1);
        this.scheduler.remove(object);
    }
}

window.onload = function() {
    Game.init();
}
