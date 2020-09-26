"use strict";

import { RNG } from "rot-js";

import {
    WORLD_HEIGHT,
    WORLD_WIDTH,
    COLOR_AMBIENT_LIGHT,
    COLOR_DARK_WALL,
    COLOR_INVISIBLE_WALL,
    COLOR_DARK_GROUND,
    COLOR_INVISIBLE_GROUND,
    LevelData,
    TileData
} from "./data";
import { createObject } from "./object";
import { TriggerVolume } from "./volume";

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
export { Tile };

/**
 * Load a Tiled map using its name.
 * @param {String} level The name of the level
 * @returns {Object}     The map 2d array, player location, and game objects array
 */
export function loadTiledMap(level) {
    if (!(level in LevelData)) { throw new Error(`${level} is not a valid level`); }

    const sourceData = LevelData[level];
    const tileSize = sourceData.tileheight;
    const map = [];
    const objects = [];
    const volumes = [];
    let playerLocation = null;

    if (sourceData.width !== WORLD_WIDTH && sourceData.height !== WORLD_HEIGHT) {
        throw new Error(`Loaded map ${name} doesn't match world width/height`);
    }

    if (sourceData.layers.length !== 2) {
        throw new Error(`Loaded map ${name} should only have two layers`);
    }

    const translated = sourceData.layers[0].data.map(tile => {
        if (!(tile in TileData)) { throw new Error(`${tile} is not valid tile`); }

        const data = TileData[tile];
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
        function findProperty(name) {
            if (!o.properties || !o.properties.length) { return null; }

            const property = o.properties.filter(prop => {
                return prop.name === name;
            });

            if (property.length === 0) {
                return null;
            } else {
                return property[0].value;
            }
        }

        if (o.point) {
            let obj;
            const id = findProperty("id"),
                inventory = findProperty("inventory"),
                levelName = findProperty("levelName"),
                spellId = findProperty("spellId");

            if (!id) {
                throw new Error(`No id for ${o.name}`);
            }

            if (id === "player") {
                playerLocation = [Math.floor(o.x / tileSize), Math.floor(o.y / tileSize)];
            } else {
                obj = createObject(
                    id,
                    Math.floor(o.x / tileSize),
                    Math.floor(o.y / tileSize),
                );

                if (inventory && obj.inventoryComponent) {
                    inventory.split(",").forEach(i => obj.inventoryComponent.addItem(i));
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
            const x = Math.floor(o.x / tileSize);
            const y = Math.floor(o.y / tileSize);
            const width = Math.ceil(o.width / tileSize);
            const height = Math.ceil(o.height / tileSize);
            const type = findProperty("type");

            if (type === "trigger_volume") {
                const event = findProperty("event");
                volumes.push(new TriggerVolume(x, y, width, height, event));
            }
        }
    });

    return { map, playerLocation, objects, volumes };
}

/**
 * Return a random pair of x and y coordinates which
 * is non-blocking and does not have a blocking GameObject
 * on it.
 * @param {Array} map     The 2D map array
 * @param {Array} objects An array of GameObjects
 * @returns {Object}      The x and y coordinates
 */
export function findEmptySpace(map, objects) {
    let x = 0, y = 0;
    while (isBlocked(map, objects, x, y)) {
        x = Math.floor(RNG.getUniform() * map[0].length);
        y = Math.floor(RNG.getUniform() * map.length);
    }
    return { x, y };
}

/**
 * Return all the objects at a given spot on the map.
 * @param {Array} objects An array of GameObjects
 * @param {Number} x The x coordinate
 * @param {Number} y The y coordinate
 * @returns {Array} An array of GameObjects
 */
export function getObjectsAtLocation(objects, x, y) {
    return objects.filter(object => object.x === x && object.y === y);
}

/**
 * Returns null if the space is open, true or the blocking object
 * if blocked.
 * @param {Array} map The map 2D array
 * @param {Array} objects An array of GameObjects
 * @param {Number} x The x coordinate to check
 * @param {Number} y The y coordinate to check
 */
export function isBlocked(map, objects, x, y) {
    if (!Array.isArray(map) || map.length === 0 || !Array.isArray(map[0])) { throw new Error("Bad map data"); }

    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length || map[y][x].blocks) {
        return true;
    }

    const target = objects.filter(object => object.x === x && object.y === y && object.blocks === true)[0];
    return target ? target : null;
}

/**
 * Returns true if space blocks sight, false otherwise.
 * @param {Array} map The 2D map array
 * @param {Array} objects An array of GameObjects
 * @param {Number} x The x coordinate to check
 * @param {Number} y The y coordinate to check
 * @returns {Boolean} Does the spot block sight
 */
export function isSightBlocked(map, objects, x, y) {
    if (!Array.isArray(map) || map.length === 0 || !Array.isArray(map[0])) { throw new Error("Bad map data"); }

    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length || map[y][x].blocksSight) {
        return true;
    }

    const o = getObjectsAtLocation(objects, x, y);
    for (let i = 0; i < o.length; i++) {
        if (o[i].blocksSight) {
            return true;
        }
    }

    return false;
}

/**
 * Draw a tile given the tile data and the coordinates.
 * @param {Object} display The ROT.js display object
 * @param {Tile} tile The tile to draw
 * @param {Number} x The x coordinate
 * @param {Number} y The y coordinate
 */
export function drawTile(display, tile, x, y) {
    let fgColor, bgColor;

    if (tile.blocks) {
        if (tile.isVisibleAndLit()) {
            fgColor = tile.fgColor;
            bgColor = tile.bgColor;
        } else if (!tile.explored) {
            fgColor = COLOR_INVISIBLE_WALL;
            bgColor = COLOR_INVISIBLE_WALL;
        } else if (tile.explored && !tile.isVisibleAndLit()) {
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
}

/**
 * Find the distance between two GameObjects
 * @param  {GameObject} a An object
 * @param  {GameObject} b An object
 * @return {Number}       The distance
 */
function distanceBetweenObjects(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
}

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
export function getClosestVisibleFighter(map, actors, origin, maxDistance) {
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
export function resetVisibility(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].visible = false;
            map[y][x].lightingColor = COLOR_AMBIENT_LIGHT;
        }
    }
}

/**
 * Set all the Tile objects in a map to explored
 * @param  {Array} map  An array of arrays of Tiles
 * @return {void}
 */
export function setAllToExplored(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].explored = true;
        }
    }
}

/**
 * Calls drawTile on an array of Tile arrays
 * @param  {Object} display The ROT display
 * @param  {Array} map      An array of arrays of Tiles
 * @return {void}
 */
export function drawMap(display, map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            drawTile(display, map[y][x], x, y);
        }
    }
}

export function findVolumeCollision(volumes, object) {
    return volumes.filter(v => {
        if (v.x < object.x &&
            v.x + v.width > object.x &&
            v.y <= object.y &&
            v.y + v.height >= object.y) {
            return true;
        }
        return false;
    });
}
