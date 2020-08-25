'use strict';

class Tile {
    constructor(name, char, fgColor, bgColor, fgColorExplored, bgColorExplored, blocks, blocksSight, visible = false, explored = false) {
        this.name = name;
        this.char = char;
        this.fgColor = fgColor;
        this.bgColor = bgColor;
        this.fgColorExplored = fgColorExplored;
        this.bgColorExplored = bgColorExplored;
        this.blocks = blocks;
        this.blocksSight = blocksSight;
        this.visible = visible;
        this.explored = explored;
        this.reflectivity = 0.18;
        this.lightingColor = bgColor;
    }

    isVisibleAndLit() {
        return this.visible && this.lightingColor !== COLOR_AMBIENT_LIGHT;
    }
}

const loadTiledMap = function (level) {
    const sourceData = TileMaps[level];
    const tileSize = sourceData.tileheight;
    let map = [], objects = [], playerLocation = null;

    if (sourceData.width !== WORLD_WIDTH && sourceData.height !== WORLD_HEIGHT) {
        throw new Error(`Loaded map ${name} doesn't match world width/height`);
    }

    if (sourceData.layers.length !== 2) {
        throw new Error(`Loaded map ${name} should only have two layers`);
    }

    const translated = sourceData.layers[0].data.map(tile => {
        if (!(tile in tileData)) { throw new Error(`${tile} is not valid tile`); }

        const data = tileData[tile];
        return new Tile(
            data.name,
            data.char,
            data.fgColor,
            data.bgColor,
            data.fgColorExplored,
            data.bgColorExplored,
            data.blocks,
            data.blocksSight
        );
    });

    for (let i = 0; i < translated.length; i += WORLD_WIDTH) {
        map.push(translated.slice(i, i + WORLD_WIDTH));
    }

    sourceData.layers[1].objects.forEach(o => {
        const findProperty = function (name) {
            if (!o.properties || !o.properties.length) { return null; }

            let property = o.properties.filter(prop => {
                return prop.name === name;
            });

            if (property.length === 0) {
                return null;
            } else {
                return property[0].value;
            }
        };

        let id = findProperty("id"),
            obj,
            inventory = findProperty("inventory"),
            levelName = findProperty("levelName"),
            spellId = findProperty("spellId");

        if (!id) {
            console.error(`No id for ${o.name}`);
            return;
        }

        if (o.point) {
            if (id === "player") {
                playerLocation = [Math.floor(o.x / tileSize), Math.floor(o.y / tileSize)];
            } else {
                obj = createObject(
                    id,
                    Math.floor(o.x / tileSize),
                    Math.floor(o.y / tileSize),
                );

                if (inventory && obj.inventoryComponent) {
                    inventory.split(',').forEach(i => obj.inventoryComponent.addItem(i));
                }

                if (levelName && obj.interactable && obj.interactable.setLevel) {
                    obj.interactable.setLevel(levelName);
                }

                if (spellId && obj.interactable && obj.interactable.setSpell) {
                    obj.interactable.setSpell(spellId);
                }
                objects.push(obj);
            }
        } else if (o.type === "Rectangle") {
            let x = Math.floor(o.x / tileSize);
            let y = Math.floor(o.y / tileSize);
            const width = Math.floor(o.width / tileSize) + x;
            const height = Math.floor(o.height / tileSize) + y;

            for (let i = y; i < height; i++) {
                for (let j = x; j < width; j++) {
                    objects.push(createObject(id, i, j));
                }
            }
        }
    });

    return { map, playerLocation, objects };
};

const addStairs = function(map, objects) {
    const {x, y} = findEmptySpace(map, objects);
    objects.push(createObject("stairs", x, y));
};

const addDungeonStairs = function(map, rooms, objects) {
    const {x, y} = findEmptySpaceInRoom(map, rooms, objects);
    objects.push(createObject("stairs", x, y));
};

const findEmptySpace = function(map, objects) {
    let x = 0, y = 0;
    while (isBlocked(map, objects, x, y)) {
        x = Math.floor(ROT.RNG.getUniform() * WORLD_WIDTH);
        y = Math.floor(ROT.RNG.getUniform() * WORLD_HEIGHT);
    }
    return { x, y };
};

/**
 * Find an empty space in the room array from a dungeon map
 * so that the object doesn't block a passageway.
 * @param  {Array} map      The map array
 * @param  {Array} rooms    The room array from the rng
 * @param  {Array} objects  The objects in the map
 * @return {Number}         The x and y coordinates
 */
const findEmptySpaceInRoom = function(map, rooms, objects) {
    let x = 0, y = 0;
    while (isBlocked(map, objects, x, y)) {
        const room = rooms[Math.floor(ROT.RNG.getUniform() * rooms.length)];
        x = randomIntFromInterval(room.getLeft() + 1, room.getRight() - 1);
        y = randomIntFromInterval(room.getBottom() - 1, room.getTop() + 1);
    }
    return { x, y };
};

const getObjectsAtLocation = function(objects, x, y) {
    return objects.filter(object => object.x == x && object.y == y);
}

/**
    Returns null if the space is open, true or the blocking object
    if blocked
*/
const isBlocked = function(map, objects, x, y) {
    if (x < 0 || y < 0 || x >= WORLD_WIDTH || y >= WORLD_HEIGHT || map[y][x].blocks) {
        return true;
    }

    const target = objects.filter(object => object.x == x && object.y == y && object.blocks === true)[0];
    return target ? target : null;
};

/**
    Returns true if space blocks sight, false otherwise
*/
const isSightBlocked = function(map, objects, x, y) {
    if (x < 0 || y < 0 || x >= WORLD_WIDTH || y >= WORLD_HEIGHT || map[y][x].blocksSight) {
        return true;
    }

    const o = getObjectsAtLocation(objects, x, y);
    for (var i = 0; i < o.length; i++) {
        if (o[i].blocksSight) {
            return true;
        }
    }

    return false;
};

const drawTile = function(display, tile, x, y) {
    let fgColor, bgColor;

    if (tile.blocks) {
        if (!tile.explored) {
            fgColor = COLOR_INVISIBLE_WALL;
            bgColor = COLOR_INVISIBLE_WALL;
        } else if (tile.explored && tile.visible) {
            fgColor = tile.fgColor;
            bgColor = tile.bgColor;
        } else if (tile.explored && !tile.visible) {
            fgColor = COLOR_DARK_WALL;
            bgColor = COLOR_DARK_WALL;
        }
    } else {
        if (tile.isVisibleAndLit()) {
            fgColor = tile.fgColor;
            bgColor = tile.lightingColor;
        } else if (tile.explored) {
            fgColor = COLOR_DARK_GROUND;
            bgColor = COLOR_DARK_GROUND;
        } else {
            fgColor = COLOR_INVISIBLE_GROUND;
            bgColor = COLOR_INVISIBLE_GROUND;
        }
    }


    display.draw(x, y, tile.char, fgColor, bgColor);
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
const getClosestVisibleFighter = function (map, actors, origin, maxDistance) {
    let closestActor = null;
    let closestDistance = maxDistance + 1;

    for (let i = 0; i < actors.length; i++) {
        const actor = actors[i];
        if (actor.fighter !== undefined && actor.fighter !== null && actor !== origin && map[actor.y][actor.x].visible) {
            const distance = distanceBetweenObjects(origin, actor);
            if (distance < closestDistance) {
                closestActor = actor;
                closestDistance = distance;
            }
        }
    }

    return closestActor;
}

/**
 * Set all the Tile objects in a map to visible
 * @param  {Array} map  An array of arrays of Tiles
 * @return {void}
 */
const resetVisibility = function(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].visible = false;
            map[y][x].lightingColor = COLOR_AMBIENT_LIGHT;
        }
    }
};

/**
 * Set all the Tile objects in a map to explored
 * @param  {Array} map  An array of arrays of Tiles
 * @return {void}
 */
const setAllToExplored = function(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].explored = true;
        }
    }
};

/**
 * Calls drawTile on an array of Tile arrays
 * @param  {Object} display The ROT display
 * @param  {Array} map      An array of arrays of Tiles
 * @return {void}
 */
const drawMap = function(display, map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            drawTile(display, map[y][x], x, y);
        }
    }
};
