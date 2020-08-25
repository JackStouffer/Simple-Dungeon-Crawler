'use strict';

class Tile {
    constructor(val, blocks, blocksSight, visable = false, explored = false) {
        this.val = val;
        this.blocks = blocks;
        this.blocksSight = blocksSight;
        this.visable = visable;
        this.explored = explored;
    }
}

const generateCaveMap = function(currentLevel) {
    // create an array of arrays filled with 0's
    let map = Array(WORLD_HEIGHT).fill([]).map(
        x => Array(WORLD_WIDTH).fill(new Tile(MAP_FILLED_SPACE, true, true))
    );

    let cellular = new ROT.Map.Cellular(WORLD_WIDTH, WORLD_HEIGHT, { connected: true });
    cellular.randomize(0.5);

    let generations = Math.max(1, Math.floor(ROT.RNG.getNormal(4, 2)));
    for (let i = 0; i < generations; i++) {
        cellular.create();
    }

    let digCallback = function(x, y, value) {
        if (!value) {
            map[y][x] = new Tile(MAP_FILLED_SPACE, true, true);
        } else {
            map[y][x] = new Tile(MAP_EMPTY_SPACE, false, false);
        }
    }
    cellular.create(digCallback.bind(this));
    
    let actors = [];
    let objects = [];

    generateEnemies(map, actors, objects, currentLevel);
    generateChests(map, null, objects, actors, currentLevel);
    addStairs(map, objects, actors);

    cellular.connect(digCallback.bind(this), 1);
    return {map: map, actors: actors, objects: objects};
};

const generateDungeonMap = function(currentLevel) {
    // create an array of arrays filled with 0's
    let map = Array(WORLD_HEIGHT).fill([]).map(
        x => Array(WORLD_WIDTH).fill(new Tile(MAP_FILLED_SPACE, true, true))
    );

    let dungeon = new ROT.Map.Uniform(
        WORLD_WIDTH,
        WORLD_HEIGHT - 5,
        {
            roomDugPercentage: .4,
            roomWidth: [5, 10],
            roomHeight: [5, 10]
        }
    );

    let digCallback = function(x, y, value) {
        if (value) {
            map[y][x] = new Tile(MAP_FILLED_SPACE, true, true);
        } else {
            map[y][x] = new Tile(MAP_EMPTY_SPACE, false, false);
        }
    }
    dungeon.create(digCallback.bind(this));

    let actors = [];
    let objects = [];
    generateEnemies(map, actors, objects, currentLevel);

    let rooms = dungeon.getRooms();
    generateChests(map, rooms, objects, actors, currentLevel);
    addDungeonStairs(map, rooms, objects, actors);

    return {map: map, actors: actors, objects: objects};
};

const createBeing = function(what, char, fgcolor, bgcolor, name, level, blocks, map, objects, actors, fighter=null, ai=null) {
    let {x, y} = findEmptySpace(map, objects, actors);
    return new what(
        x, y, char, fgcolor, bgcolor, name, level, blocks, fighter, ai
    );
};

const generateEnemies = function (map, actors, objects, currentLevel) {
    const totalEnemies = Math.round(ROT.RNG.getNormal(8, 2));

    for (let i = 0; i < totalEnemies; i++) {
        const enemyType = ROT.RNG.getWeightedValue(levelEnemyPool[currentLevel]);
        const data = enemyData[enemyType];
        let enemyClass, aiClass;

        switch (data.type) {
            case "basic":
                enemyClass = BasicEnemy;
                break;
            default:
                throw new Error("Unhandled enemy class");
                break;
        }

        switch (data.ai) {
            case "basic":
                aiClass = BasicMonsterAI;
                break;
            default:
                throw new Error("Unhandled ai class");
                break;
        }

        actors.push(createBeing(
            enemyClass,
            data.char,
            data.fgColor,
            data.bgColor,
            data.name,
            data.level,
            true, // blocking movement
            map, // map object
            objects, // objects list
            actors, // actor list
            new Fighter(data.maxHp, data.maxHp, data.strength, data.defense, data.experience, die),
            new aiClass(data.sightRange)
        ));
    }
}

const generateChests = function(map, rooms, objects, actors, currentLevel) {
    const num = Math.max(1, Math.round(ROT.RNG.getNormal(3, 1)));

    for (let i = 0; i < num; i++) {
        let coordinates;
        if (rooms === null) {
            coordinates = findEmptySpace(map, objects, actors);
        } else {
            coordinates = findEmptySpaceInRoom(map, rooms, objects, actors);
        }

        let c = new Chest(coordinates.x, coordinates.y, "*", "white", "brown", "Chest", true);
        const itemType = ROT.RNG.getWeightedValue(levelChestItemPool[currentLevel]).split(":");
        const item = itemType[0];
        const value = parseInt(itemType[1], 10);

        switch (item) {
            case "health":
                c.item = createHealthPotion(value);
                break;
            case "lightning":
                c.item = createTargetedDamageScroll(
                    `Scroll of Lightning (${value} dmg)`,
                    value,
                    Affinities.lightning
                );
                break;
            case "wild lightning":
                c.item = createWildDamageScroll(
                    `Scroll of Wild Lightning (${value} dmg)`,
                    value,
                    Affinities.lightning
                );
                break;
            case "fireball":
                c.item = createTargetedDamageScroll(
                    `Scroll of Fireball (${value} dmg)`,
                    value,
                    Affinities.fire,
                    createBurnEffect
                );
                break;
            case "wild fireball":
                c.item = createWildDamageScroll(
                    `Scroll of Wild Fireball (${value} dmg)`,
                    value,
                    Affinities.fire,
                    createBurnEffect
                );
                break;
            case "confuse":
                c.item = createConfuseScroll(value);
                break;
            case "clairvoyance":
                c.item = createClairvoyanceScroll(value);
                break;
            default:
                throw new Error("Unhandled item type");
                break;
        }
        
        objects.push(c);
    }
};

const addStairs = function(map, objects, actors) {
    const {x, y} = findEmptySpace(map, objects, actors);
    let c = new Stairs(x, y, ">", "white", "black", "Stairs", true);
    objects.push(c);
};

const addDungeonStairs = function(map, rooms, objects, actors) {
    const {x, y} = findEmptySpaceInRoom(map, rooms, objects, actors);
    objects.push(new Stairs(x, y, ">", "white", "black", "Stairs", true));
};

const findEmptySpace = function(map, objects, actors) {
    let x = 0, y = 0;
    while (isBlocked(map, objects, actors, x, y)) {
        x = Math.floor(ROT.RNG.getUniform() * WORLD_WIDTH);
        y = Math.floor(ROT.RNG.getUniform() * WORLD_HEIGHT);
    }
    return {x: x, y: y};
};

/**
 * Find an empty space in the room array from a dungeon map
 * so that the object doesn't block a passageway.
 * @param  {Array} map      The map array
 * @param  {Array} rooms    The room array from the rng
 * @param  {Array} objects  The objects in the map
 * @param  {Array} actors   The actors in the map
 * @return {Number}         The x and y coordinates
 */
const findEmptySpaceInRoom = function(map, rooms, objects, actors) {
    let x = 0, y = 0;
    while (isBlocked(map, objects, actors, x, y)) {
        const room = rooms[Math.floor(ROT.RNG.getUniform() * rooms.length)];
        x = randomIntFromInterval(room.getLeft() + 1, room.getRight() - 1);
        y = randomIntFromInterval(room.getBottom() - 1, room.getTop() + 1);
    }
    return {x: x, y: y};
};

const getActorOrObjectAtLocation = function(map, objects, actors, x, y) {
    // now check for any blocking objects
    for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        if (object.x == x && object.y == y) {
            return object;
        }
    }

    for (let i = 0; i < actors.length; i++) {
        let actor = actors[i];
        if (actor.x == x && actor.y == y) {
            return actor;
        }
    }
}

/**
    Returns null if the space is open, true or the blocking object
    if blocked
*/
const isBlocked = function(map, objects, actors, x, y) {
    if (x < 0 || y < 0 || x >= WORLD_WIDTH || y >= WORLD_HEIGHT || map[y][x].blocks) {
        return true;
    }

    let target = getActorOrObjectAtLocation(map, objects, actors, x, y);
    if (target && target.blocks) {
        return target;
    }

    return null;
};

/**
    Returns true if space blocks sight, false otherwise
*/
const isSightBlocked = function(map, x, y) {
    if (x < 0 || y < 0 || x >= WORLD_WIDTH || y >= WORLD_HEIGHT || map[y][x].blocksSight) {
        return true;
    }
    return false;
};

const drawTile = function(display, tile, x, y) {
    let fgcolor, bgcolor;

    if (tile.val === MAP_FILLED_SPACE) {
        if (!tile.explored) {
            fgcolor = COLOR_INVISIBLE_WALL;
            bgcolor = COLOR_INVISIBLE_WALL;
        } else if (tile.explored && tile.visibile) {
            fgcolor = COLOR_LIGHT_WALL;
            bgcolor = COLOR_LIGHT_WALL;
        } else if (tile.explored && !tile.visibile) {
            fgcolor = COLOR_DARK_WALL;
            bgcolor = COLOR_DARK_WALL;
        }
    } else if (tile.val === MAP_EMPTY_SPACE) {
        if (!tile.explored) {
            fgcolor = COLOR_INVISIBLE_GROUND;
            bgcolor = COLOR_INVISIBLE_GROUND;
        } else if (tile.explored && tile.visibile) {
            fgcolor = COLOR_LIGHT_GROUND;
            bgcolor = COLOR_LIGHT_GROUND;
        } else if (tile.explored && !tile.visibile) {
            fgcolor = COLOR_DARK_GROUND;
            bgcolor = COLOR_DARK_GROUND;
        }
    }

    display.draw(x, y, tile.val, fgcolor, bgcolor);
};

/**
 * Find the distance between two GameObjects
 * @param  {GameObject} a An object
 * @param  {GameObject} b An object
 * @return {Number}       The distance
 */
const distanceBetweenObjects = function (a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx ** 2 + dy ** 2)
};

/**
 * Find the closest other actor from an actor origin given the actor is
 * on a visible tile.
 *
 * @param  {Array}      map          The current map
 * @param  {Array}      actors       The current list of actors
 * @param  {GameObject} origin       The starting object
 * @param  {Number}     maxDistance  The max allowed distance before giving up
 * @return {GameObject}              The closest actor
 */
const getClosestVisibleActor = function (map, actors, origin, maxDistance) {
    let closestActor = null;
    let closestDistance = maxDistance + 1;

    for (let i = 0; i < actors.length; i++) {
        const actor = actors[i];

        if (actor.fighter !== null && actor !== origin && map[actor.y][actor.x].visibile) {
            const distance = distanceBetweenObjects(origin, actor);
            if (distance < closestDistance) {
                closestActor = actor;
                closestDistance = distance;
            }
        }
    }

    return closestActor;
}

const drawObject = function(display, map, obj) {
    // Always draw the stairs or chests once they've been see to make
    // the game less tedious
    if ((obj instanceof Stairs || obj instanceof Chest) && map[obj.y][obj.x].explored) {
        display.draw(obj.x, obj.y, obj.char, obj.fgcolor, obj.bgcolor);
        return;
    }

    if (map[obj.y][obj.x].visibile) {
        display.draw(obj.x, obj.y, obj.char, obj.fgcolor, obj.bgcolor);
    }
};

const resetVisibility = function(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].visibile = false;
        }
    }
};

const setAllToExplored = function(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].explored = true;
        }
    }
};

const drawMap = function(display, map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            drawTile(display, map[y][x], x, y);
        }
    }
};
