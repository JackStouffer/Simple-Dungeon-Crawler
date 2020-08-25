'use strict';

// Ideas
// 
// Enemy drops
// 
// Status effects: sleep, bleed (work like dark souls, not damage over time), fatigued,
// rage (increased strength but lose control), attack up/down, defense up/down,
// speed up/down, freeze
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
// Shop every few floors. Turns hostile if attacked, very hard enemy but drops good loot
//
// Player torch is infinite but can be put away so they can sneak
// by enemies who don't have night vision, cost of reduced visibility
//
// Spawn lanterns/fireplaces in map, only have them cast light when the player
// is standing on a tile that the latern is in the FOV of
//
// Spawn tables, chairs, shelves, beds to break up the monateny of rooms
// 
// Doors in dungeon maps to break line of sight, possibly spawn keys
// for locked ones to encourage exploration
// 
// Monster infighting, would have to implement teams/factions

let keyCommandMap;

const randomIntFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const mouseLook = function(e) {
    const pos = Game.display.eventToPosition(e);
    const target = getActorOrObjectAtLocation(Game.map, Game.game_objects, Game.actors, pos[0], pos[1]);
    if (target && target.name && target.ai && target.ai.state) {
        if (target.ai.state === "wander") {
            Game.displayMessage("A " + target.name + ", it hasn't seen you.");
        } else {
            Game.displayMessage("A " + target.name);
        }
    } else if (target && target.name) {
        Game.displayMessage(target.name);
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

        const passableSightCallback = function(x, y) {
            // own space is passable
            if (Game.player.x === x && Game.player.y === y) {
                return true;
            }
            return isSightBlocked(Game.map, x, y) === false;
        };

        resetVisibility(Game.map);
        let playerFOV = new ROT.FOV.PreciseShadowcasting(passableSightCallback);

        playerFOV.compute(Game.player.x, Game.player.y, 20, function(x, y, r, visibility) {
            if (x < 0 || y < 0 || x >= WORLD_WIDTH || y >= WORLD_HEIGHT) {
                return;
            }
            Game.map[y][x].visibile = true;
            Game.map[y][x].explored = true;
        });
    
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
    game_objects: [],
    actors: [],
    map: [],
    currentLogLines: [],
    currentLevel: -1,
    currentTurn: 0,
    totalMessages: 0,

    init: function() {
        this.display = new ROT.Display({
            width: WIDTH,
            height: HEIGHT,
            fontSize: 13
        });
        this.canvas = this.display.getContainer();
        document.getElementById("canvas").appendChild(this.canvas);

        this.openingCinematic();
    },

    reset: function () {
        clearScreen(this.display);
        this.player.destroy();
        this.player = null;
        this.currentLevel = -1;
        this.actors = [];
        this.map = [];
        this.game_objects = [];
        this.currentLogLines = [];
        this.scheduler.clear();
    },

    openingCinematic: function() {
        this.display.drawText(WIDTH - (WIDTH - 7), 12, "%c{white}Your country is being overrun by the forces of darkness");
        this.display.drawText(WIDTH - (WIDTH - 8), 15, "%c{white}Tales tell of a weapon of great power hidden away at");
        this.display.drawText(WIDTH - (WIDTH - 8), 16, "%c{white}the bottom of the abandoned dwarf stronghold Durdwin");
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

        this.player = new Player(
            0, 0,
            "@", COLOR_PLAYER, COLOR_LIGHT_GROUND,
            "The Player",
            true,
            new Fighter(100, 100, 3, 1, 0, killPlayer),
            new PlayerControlAI()
        );

        // Command pattern
        keyCommandMap = {
            "w": ["Move Up", moveCommand(this.player, 0, 8)],
            "e": ["Move Up Right", moveCommand(this.player, 1, 8)],
            "d": ["Move Right", moveCommand(this.player, 2, 8)],
            "c": ["Move Down Right", moveCommand(this.player, 3, 8)],
            "s": ["Move Down", moveCommand(this.player, 4, 8)],
            "z": ["Move Down Left", moveCommand(this.player, 5, 8)],
            "a": ["Move Left", moveCommand(this.player, 6, 8)],
            "q": ["Move Up Left", moveCommand(this.player, 7, 8)],
            "i": ["Inventory", openInventoryCommand(this.player)],
            "Escape": ["Key Bindings", openKeyBindingCommand(this.player)]
        };

        this.nextLevel();
    },
    
    displayMessage: function(text) {
        this.totalMessages++;

        for (let i = 0; i < WIDTH; i++) {
            for (let j = 1; j < UI_HEIGHT + 1; j++) {
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
        drawMap(this.display, this.map);
        for (let i = 0; i < this.game_objects.length; i++) {
            drawObject(this.display, this.map, this.game_objects[i]);
        }
        // FIX ME: dead bodies draw over enemies on the same tile
        for (let i = 0; i < this.actors.length; i++) {
            drawObject(this.display, this.map, this.actors[i]);
        }
        drawObject(this.display, this.map, this.player);

        const levelUpEXP = LEVEL_UP_BASE + (this.player.level * LEVEL_UP_FACTOR);
        if (this.player.experience >= levelUpEXP) {
            this.player.level += 1;
            this.player.experience = 0;
            this.player.fighter.hp = this.player.fighter.maxHp;
            this.player.fighter.strength++;
            this.displayMessage('You reached level ' + this.player.level + '!');
        }

        drawUI(this.display, this.currentLevel, this.player);
    },

    nextLevel: function () {
        this.currentLevel++;

        if (this.currentLevel === 21) {
            this.winCinematic();
            return;
        }

        let generationFunc;
        if (this.currentLevel < 3) {
            generationFunc = generateDungeonMap;
        } else {
            if (ROT.RNG.getUniform() < 0.4) {
                generationFunc = generateDungeonMap;
            } else {
                generationFunc = generateCaveMap;
            }
        }

        let {map, actors, objects} = generationFunc(this.currentLevel);
        this.map = map;
        this.actors = actors;
        this.game_objects = objects;

        let {x, y} = findEmptySpace(this.map, this.game_objects, this.actors);
        this.player.x = x;
        this.player.y = y;

        this.scheduler = new ROT.Scheduler.Simple();
        this.manager = new Manager();
        this.scheduler.add(this.manager, true);
        this.scheduler.add(this.player, true);
        for (let i = 0; i < this.actors.length; i++) {
            this.scheduler.add(this.actors[i], true);
        }
        this.engine = new ROT.Engine(this.scheduler);
        this.engine.start();
    },

    // break out the hook and unhook mouse look into their own functions
    // because other actions need to take over the mouse at some points
    // and we don't want anything other than the Game object interacting
    // with the canvas
    hookMouseLook: function () {
        this.canvas.addEventListener("mousedown", mouseLook);
    },

    unhookMouseLook: function () {
        this.canvas.removeEventListener("mousedown", mouseLook);
    }
}

window.onload = function() {
    Game.init();
}
