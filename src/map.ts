import { get } from "lodash";
import { Entity, World } from "ape-ecs";

import { Display, RNG } from "./rot/index";
import { toRGB, fromString, multiply } from "./rot/color";

// @ts-expect-error
import * as forrest_001 from "./maps/forrest_001";
// @ts-expect-error
import * as durdwin_001 from "./maps/durdwin_001";
// @ts-expect-error
import * as dev_room from "./maps/dev_room";

import {
    createEntity,
    HitPointsComponent,
    InventoryComponent,
    PatrolPathComponent,
    PlannerAIComponent,
    PositionComponent
} from "./entity";
import { Camera } from "./camera";
import { Nullable } from "./util";
import { createPlanner } from "./ai/commands";
import { ItemData } from "./skills";
import globals from "./globals";

const COLOR_INVISIBLE_WALL = "black";
const COLOR_INVISIBLE_GROUND = "black";
const COLOR_DARK_GROUND = "rgb(50, 50, 50)";
const COLOR_AMBIENT_LIGHT = "rgb(50, 50, 50)";

const LevelData: { [key: string]: any } = {
    forrest_001,
    durdwin_001,
    dev_room
};

type LevelName = keyof typeof LevelData;

interface TileDataDetails {
    name: string;
    char: string;
    fgColor: string;
    bgColor: string;
    fgColorExplored: string;
    bgColorExplored: string;
    blocks: boolean;
    blocksSight: boolean;
    reflectivity: number;
}

const TileData: { [key: number]: TileDataDetails } = {
    780: {
        name: "Gravestone",
        char: "\u07E1",
        fgColor: "white",
        bgColor: "brown",
        fgColorExplored: "white",
        bgColorExplored: "black",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    900: {
        name: "empty ground",
        char: "",
        fgColor: "white",
        bgColor: "white",
        fgColorExplored: "rgb(50, 50, 50)",
        bgColorExplored: "rgb(50, 50, 50)",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    980: {
        name: "A stove",
        char: "\u233B",
        fgColor: "black",
        bgColor: "brown",
        fgColorExplored: "white",
        bgColorExplored: "black",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1048: {
        name: "A wall",
        char: "",
        fgColor: "#352620",
        bgColor: "#352620",
        fgColorExplored: "black",
        bgColorExplored: "black",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    1165: {
        name: "A tree",
        char: "\u1278",
        fgColor: "lightgreen",
        bgColor: "darkgreen",
        fgColorExplored: "grey",
        bgColorExplored: "black",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    1543: {
        name: "bed",
        char: "\u2583",
        fgColor: "gold",
        bgColor: "white",
        fgColorExplored: "white",
        bgColorExplored: "black",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    2710: {
        name: "A table",
        char: "\u03A0",
        fgColor: "tan",
        bgColor: "brown",
        fgColorExplored: "white",
        bgColorExplored: "black",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    2869: {
        name: "A chair",
        char: "\u043F",
        fgColor: "black",
        bgColor: "brown",
        fgColorExplored: "white",
        bgColorExplored: "black",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    2936: {
        name: "A cabinet",
        char: "\u2339",
        fgColor: "black",
        bgColor: "brown",
        fgColorExplored: "white",
        bgColorExplored: "black",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    }
};
Object.freeze(TileData);


export class Tile {
    name: string;
    char: string;
    fgColor: string;
    bgColor: string;
    fgColorExplored: string;
    bgColorExplored: string;
    blocks: boolean;
    blocksSight: boolean;
    visible: boolean;
    explored: boolean;
    reflectivity: number;
    lightingColor: string;
    pathfindingCost: string = "0";

    constructor(
        name: string,
        char: string,
        fgColor: string,
        bgColor: string,
        fgColorExplored: string,
        bgColorExplored: string,
        blocks: boolean,
        blocksSight: boolean,
        visible: boolean = false,
        explored : boolean= false
    ) {
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

    /**
     * Is the tile visible and is lit by non-ambient light
     * @returns {Boolean} Is visible and lit
     */
    isVisibleAndLit(): boolean {
        return this.visible && this.lightingColor !== COLOR_AMBIENT_LIGHT;
    }
}

/**
 * Searches through the properties on a tiled object and returns the value
 */
function findProperty(o: any, name: string): any {
    if (o.properties === undefined || o.properties.length === 0) { return null; }

    const property = o.properties.filter((prop: any) => {
        return prop.name === name;
    });

    if (property.length === 0) {
        return null;
    } else {
        return property[0].value;
    }
}

export type GameMap = Tile[][];

/**
 * Load a Tiled map using its name.
 */
export function loadTiledMap(ecs: World, level: LevelName) {
    if (!(level in LevelData)) { throw new Error(`${level} is not a valid level`); }

    const sourceData = LevelData[level];
    const tileSize: number = sourceData.tileheight;
    const map: GameMap = [];
    let playerLocation: [number, number] = [0, 0];

    const tileLayer = get(sourceData.layers.filter((l: any) => l.name === "Tile Layer"), "[0]");
    const objectLayer = get(sourceData.layers.filter((l: any) => l.name === "Object Layer"), "[0]");
    const nodeLayer = get(sourceData.layers.filter((l: any) => l.name === "Node Layer"), "[0]");

    if (tileLayer === null) {
        throw new Error(`No tile layer in map ${level}`);
    }
    if (objectLayer === null) {
        throw new Error(`No object layer in map ${level}`);
    }
    if (nodeLayer === null) {
        throw new Error(`No node layer in map ${level}`);
    }

    const translated = tileLayer.data.map((tile: number) => {
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

    for (let i = 0; i < translated.length; i += sourceData.width) {
        map.push(translated.slice(i, i + sourceData.width));
    }

    // First create all of the nodes
    nodeLayer.objects.forEach((o: any) => {
        ecs.createEntity({
            id: o.id.toString(10),
            c: {
                PositionComponent: {
                    x: Math.floor(o.x / tileSize),
                    y: Math.floor(o.y / tileSize)
                }
            }
        });
    });

    // Do this is two passes because each node could reference
    // another node so make sure all of the nodes are created
    // before we try to create the references
    nodeLayer.objects.forEach((o: any) => {
        const entity = ecs.getEntity(o.id.toString());
        if (entity === undefined) { throw new Error(`Node ${o.id} not initialized in level load`); }

        const nextId = findProperty(o, "next") as number;
        const next = nextId !== null ? ecs.getEntity(nextId.toString(10)) : null;
        if (next !== null) {
            const comp = entity.addComponent({
                type: "PatrolPathComponent"
            }) as PatrolPathComponent;
            comp!.next = next;
        }
    });

    objectLayer.objects.forEach((o: any) => {
        if (o.point !== undefined) {
            if (o.type === "object") {
                const type = findProperty(o, "objectType") as string,
                    inventory = findProperty(o, "inventory") as string,
                    levelName = findProperty(o, "levelName") as string,
                    spellId = findProperty(o, "spellId") as string,
                    patrolTarget = findProperty(o, "patrolTarget") as number,
                    fallbackPosition = findProperty(o, "fallbackPosition") as number,
                    event = findProperty(o, "event") as string;

                if (type === null) {
                    throw new Error(`No type for ${o.name}`);
                }

                if (type === "player") {
                    playerLocation = [Math.floor(o.x / tileSize), Math.floor(o.y / tileSize)];
                } else {
                    const entity: Entity = createEntity(
                        ecs,
                        type,
                        Math.floor(o.x / tileSize),
                        Math.floor(o.y / tileSize)
                    );

                    if (inventory !== null) {
                        const items: Map<string, number> = new Map();
                        inventory
                            .split(",")
                            .filter((i: string) => i in ItemData)
                            .forEach((i: string) => items.set(i, 1));

                        const existingInventory = entity.getOne(InventoryComponent);
                        if (existingInventory === undefined) {
                            entity.addComponent({
                                type: "InventoryComponent",
                                inventory: items
                            });
                        } else {
                            existingInventory.inventory = items;
                        }
                    }

                    if (levelName !== null) {
                        entity.addComponent({
                            type: "LoadLevelComponent",
                            levelName
                        });
                    }

                    if (spellId !== null) {
                        entity.addComponent({
                            type: "SpellsComponent",
                            knownSpells: new Set([spellId])
                        });
                    }

                    if (patrolTarget !== null) {
                        const target = ecs.getEntity(patrolTarget.toString());
                        if (target === undefined) { throw new Error(`Patrol target ${patrolTarget} is not initialized`); }
                        entity.addComponent({
                            type: "PatrolAIComponent",
                            patrolTarget: target
                        });

                        // recreate the planner
                        const aiState = entity.getOne(PlannerAIComponent);
                        if (aiState === undefined) { throw new Error("Trying to set patrol target without an ai"); }
                        aiState.actions.delete("wander");
                        aiState.actions.delete("guard");
                        aiState.actions.add("patrol");
                        const { goals, planner } = createPlanner(aiState.actions);
                        aiState.goals = goals;
                        aiState.planner = planner;
                        aiState.update();
                    }

                    if (fallbackPosition !== null) {
                        const fallback = ecs.getEntity(fallbackPosition.toString());
                        if (fallback === undefined) { throw new Error(`Fallback target ${fallbackPosition} is not initialized`); }
                        entity.addComponent({
                            type: "FallbackAIComponent",
                            isAtFallbackPosition: false,
                            fallbackPosition: fallback
                        });

                        // recreate the planner
                        const aiState = entity.getOne(PlannerAIComponent);
                        if (aiState === undefined) { throw new Error("Trying to set fallback position without an ai"); }
                        aiState.actions.add("goToFallbackPosition");
                        const { goals, planner } = createPlanner(aiState.actions);
                        aiState.goals = goals;
                        aiState.planner = planner;
                        aiState.update();
                    }

                    if (type === "event_trigger" && event !== null) {
                        entity.addComponent({
                            type: "TriggerTypeComponent",
                            triggerType: "event"
                        });
                        entity.addComponent({
                            type: "EventTriggerComponent",
                            event
                        });
                    }
                }
            } else {
                throw new Error(`Unrecognized object type ${o.type}`);
            }
        }
    });

    return { map, playerLocation };
}

/**
 * Return all the objects at a given spot on the map.
 * @param {Array} objects An array of GameObjects
 * @param {Number} x The x coordinate
 * @param {Number} y The y coordinate
 * @returns {Array} An array of GameObjects
 */
export function getEntitiesAtLocation(
    ecs: World,
    x: number,
    y: number
): Entity[] {
    const entities = ecs.createQuery().fromAll(PositionComponent).execute();
    if (entities === undefined) { return []; }
    const ret = [];

    for (const entity of entities) {
        const pos = entity.getOne(PositionComponent)!;
        if (pos.x === x && pos.y === y) {
            ret.push(entity);
        }
    }
    return ret;
}

interface BlocksResult {
    entity: Nullable<Entity>;
    blocks: boolean;
}

/**
 * Returns an entity with two keys, entity and blocks. entity
 * will be the Entity on the tile if there is one, and null
 * otherwise. Blocks is true if either the tile or the object on
 * the tile blocks, false otherwise.
 */
export function isBlocked(
    ecs: World,
    map: GameMap,
    x: number,
    y: number
): BlocksResult {
    if (map.length === 0) { throw new Error("Bad map data"); }

    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length || map[y][x].blocks) {
        return { entity: null, blocks: true };
    }

    const entities = ecs.createQuery().fromAll(PositionComponent).execute();

    let entity: Entity | undefined;
    for (const e of entities) {
        const pos = e.getOne(PositionComponent);
        if (pos !== undefined && pos.x === x && pos.y === y) {
            entity = e;
            break;
        }
    }

    if (entity !== undefined) {
        return { entity, blocks: entity.tags.has("blocks") };
    }
    return { entity: null, blocks: false };
}

/**
 * Returns true if space blocks sight, false otherwise.
 * @param {number} x The x coordinate to check
 * @param {number} y The y coordinate to check
 * @returns {boolean} Does the spot block sight
 */
export function isSightBlocked(ecs: World, map: GameMap, x: number, y: number): boolean {
    if (map.length === 0) { throw new Error("Bad map data"); }

    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length || map[y][x].blocksSight) {
        return true;
    }

    const entities = ecs.createQuery().fromAll(PositionComponent, "blocksSight").execute();
    for (const e of entities) {
        const pos = e.getOne(PositionComponent)!;
        if (pos.x === x && pos.y === y) {
            return true;
        }
    }

    return false;
}

/**
 * Draw a tile given the tile data and the coordinates.
 * @param {Display} display The ROT.js display object
 * @param {Tile} tile The tile to draw
 * @param {Number} x The x coordinate
 * @param {Number} y The y coordinate
 */
export function drawTile(display: Display, tile: Tile, x: number, y: number): void {
    if (x > display._options.width || x < 0 || y > display._options.height || y < 0) {
        return;
    }

    let fgColor: string = "";
    let bgColor: string = "";

    if (tile.blocks) {
        if (tile.isVisibleAndLit()) {
            fgColor = tile.fgColor;
            bgColor = tile.bgColor;
        } else if (!tile.explored) {
            fgColor = COLOR_INVISIBLE_WALL;
            bgColor = COLOR_INVISIBLE_WALL;
        } else if (tile.explored && !tile.isVisibleAndLit()) {
            fgColor = tile.fgColorExplored;
            bgColor = tile.bgColorExplored;
        }
    } else {
        if (tile.isVisibleAndLit()) {
            fgColor = tile.fgColor;
            bgColor = toRGB(
                multiply(fromString(tile.bgColor), fromString(tile.lightingColor))
            );
        } else if (tile.explored) {
            fgColor = COLOR_DARK_GROUND;
            bgColor = COLOR_DARK_GROUND;
        } else {
            fgColor = COLOR_INVISIBLE_GROUND;
            bgColor = COLOR_INVISIBLE_GROUND;
        }
    }

    if (!(fgColor === "black" && bgColor === "black")) {
        display.draw(x, y, tile.char, fgColor, bgColor);
    }
}

export interface Point {
    x: number;
    y: number;
}

/**
 * Find the distance between two points
 * @param  {Point} a A point
 * @param  {Point} b A point
 * @return {number} The distance
 */
export function distanceBetweenPoints(a: Point, b: Point): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
}

/**
 * Find a random actor which has a fighter and an ai and is on a
 * visible tile and is within the given max distance.
 *
 * @param  {Array}      map          The current map
 * @param  {Array}      actors       The current list of actors
 * @param  {GameObject} origin       The starting object
 * @param  {Number}     maxDistance  The max allowed distance before giving up
 * @return {GameObject}              The closest actor
 */
export function getRandomFighterWithinRange(
    ecs: World,
    map: GameMap,
    origin: PositionComponent,
    maxDistance: number
): Nullable<Entity> {
    const entities = ecs
        .createQuery()
        .fromAll(PositionComponent, HitPointsComponent, PlannerAIComponent)
        .execute();

    const possible = [];
    for (const e of entities) {
        const pos = e.getOne(PositionComponent)!;
        if (pos !== origin && distanceBetweenPoints(origin, pos) <= maxDistance) {
            possible.push(e);
        }
    }

    return possible.length > 0 ? RNG.getItem(possible) : null;
}

/**
 * Set all the Tile objects in a map to visible
 * @param  {Array} map  An array of arrays of Tiles
 * @return {void}
 */
export function resetVisibility(map: GameMap): void {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].visible = false;
            map[y][x].lightingColor = COLOR_AMBIENT_LIGHT;
        }
    }
}

export function resetTilePathCosts(map: GameMap): void {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].pathfindingCost = "0";
        }
    }
}

/**
 * Set all the Tile objects in a map to explored
 * @param  {Array} map  An array of arrays of Tiles
 * @return {void}
 */
export function setAllToExplored(
    map: GameMap,
    visible: boolean = false,
    lit: boolean = false
): void {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].explored = true;
            if (visible) {
                map[y][x].visible = true;
            }
            if (lit) {
                map[y][x].lightingColor = "white";
            }
        }
    }
}

/**
 * Calls drawTile on an array of Tile arrays
 * @param  {Display} display The ROT display
 * @param  {Camera}  camera  camera object
 * @param  {Array}   map     An array of arrays of Tiles
 * @return {void}
 */
export function drawMap(display: Display, camera: Camera, map: GameMap): void {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const { x: screenX, y: screenY } = camera.worldToScreen(x, y);
            drawTile(display, map[y][x], screenX, screenY);
        }
    }
}
