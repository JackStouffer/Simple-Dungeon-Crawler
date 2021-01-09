import { get } from "lodash";
import { Entity, World } from "ape-ecs";
import * as PIXI from "pixi.js";

import { RNG } from "./rot/index";

import * as forrest_001 from "./maps/forrest_001.json";

import {
    createEntity,
    EntityMap,
    HitPointsComponent,
    InventoryComponent,
    PatrolPathComponent,
    PlannerAIComponent,
    PositionComponent
} from "./entity";
import { Camera } from "./camera";
import { Nullable, randomIntFromInterval } from "./util";
import { createPlanner } from "./ai/commands";
import { ItemData } from "./skills";

const COLOR_AMBIENT_LIGHT = "rgb(50, 50, 50)";

const LevelData: { [key: string]: any } = {
    forrest_001
};

type LevelName = keyof typeof LevelData;

interface TileDataDetails {
    name: string;
    textureKey: string;
    blocks: boolean;
    blocksSight: boolean;
    reflectivity: number;
}

const TileData: { [key: number]: TileDataDetails } = {
    2010: {
        name: "Gravestone",
        textureKey: "gravestone_2",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    6: {
        name: "grass",
        textureKey: "grass_1",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    5805: {
        name: "A stove",
        textureKey: "stove_1",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1620: {
        name: "A tree",
        textureKey: "short_pine_tree_1",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    194: {
        name: "bed",
        textureKey: "red_bed_1_front",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1090: {
        name: "A table",
        textureKey: "long_wooden_table_1_middle",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    732: {
        name: "A chair",
        textureKey: "wooden_chair_1_front",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    385: {
        name: "A cabinet",
        textureKey: "cabinets_1",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    }
};
Object.freeze(TileData);

const TileToObject: Map<number, string> = new Map([
    [1350, "water"],
    [1, "shallow_water"],
    [7, "mud"],
    [1981, "tall_grass"],
    [1440, "campfire"],
    [1805, "thick_underbrush"]
]);

export class Tile {
    name: string;
    sprite: PIXI.Sprite;
    blocks: boolean;
    blocksSight: boolean;
    visible: boolean;
    explored: boolean;
    reflectivity: number;
    lightingColor: string;
    pathfindingCost: string = "0";

    constructor(
        name: string,
        textures: PIXI.ITextureDictionary,
        textureKey: string,
        blocks: boolean,
        blocksSight: boolean,
        visible: boolean = false,
        explored: boolean = false
    ) {
        this.name = name;
        if (textures[textureKey] === undefined) { throw new Error(`No texture ${textureKey} in atlas`); }
        this.sprite = new PIXI.Sprite(textures[textureKey]);
        this.sprite.zIndex = 0;
        this.blocks = blocks;
        this.blocksSight = blocksSight;
        this.visible = visible;
        this.explored = explored;
        this.reflectivity = 0.18;
        this.lightingColor = "white";
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
export function loadTiledMap(
    ecs: World,
    stage: PIXI.Container,
    textures: PIXI.ITextureDictionary,
    level: LevelName
) {
    if (!(level in LevelData)) { throw new Error(`${level} is not a valid level`); }

    const sourceData = LevelData[level].default;
    const tileSize: number = sourceData.tileheight;
    const map: GameMap = [];
    let playerLocation: [number, number] = [0, 0];

    const tileLayer = get(sourceData.layers.filter((l: any) => l.name === "Tile Layer"), "[0]");
    const objectLayer = get(sourceData.layers.filter((l: any) => l.name === "Object Layer"), "[0]");
    const environmentLayer = get(sourceData.layers.filter((l: any) => l.name === "Environment Layer"), "[0]");
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
        const t = new Tile(
            data.name,
            textures,
            data.textureKey,
            data.blocks,
            data.blocksSight
        );
        stage.addChild(t.sprite);
        return t;
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
        const next = nextId !== null ? ecs.getEntity(nextId.toString(10)) : undefined;
        if (next !== undefined) {
            const comp = entity.addComponent({
                type: "PatrolPathComponent"
            }) as PatrolPathComponent;
            comp!.next = next;
        }
    });

    environmentLayer.data.forEach((tile: number, i: number) => {
        if (tile === 0) { return; }

        const type = TileToObject.get(tile);
        if (type === undefined) {
            throw new Error(`Unknown environment tile ${tile}`);
        }

        createEntity(
            ecs,
            textures,
            type,
            Math.floor(i % sourceData.width),
            Math.floor(i / sourceData.width),
        );
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
                        textures,
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
 * Return all the objects at a given spot on the map
 */
export function getEntitiesAtLocation(
    entityMap: EntityMap,
    x: number,
    y: number
): Entity[] {
    return entityMap.get(`${x},${y}`) ?? [];
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
    map: GameMap,
    entityMap: EntityMap,
    x: number,
    y: number
): BlocksResult {
    if (map.length === 0) { throw new Error("Bad map data"); }

    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length || map[y][x].blocks) {
        return { entity: null, blocks: true };
    }

    const entities = entityMap.get(`${x},${y}`);
    if (entities === undefined) {
        return { entity: null, blocks: false };
    }

    let entity: Entity | undefined;
    for (const e of entities) {
        if (entity === undefined ||
            (entity !== undefined && !entity.tags.has("blocks") && e.tags.has("blocks"))) {
            entity = e;
        }
    }

    if (entity !== undefined) {
        return { entity, blocks: entity.tags.has("blocks") };
    }
    return { entity: null, blocks: false };
}

/**
 * Returns true if space blocks sight, false otherwise
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
export function drawTile(
    tile: Tile,
    x: number,
    y: number,
    zoom: number
): void {
    // FIXME
    if (x > 928 || x < 0 || y > 608 || y < 0) {
        tile.sprite.visible = false;
        return;
    }

    tile.sprite.position.set(x, y);
    tile.sprite.scale.set(zoom, zoom);

    if (tile.blocks) {
        if (tile.isVisibleAndLit()) {
            tile.sprite.tint = 0xFFFFFF;
            tile.sprite.visible = true;
        } else if (!tile.explored) {
            tile.sprite.tint = 0xFFFFFF;
            tile.sprite.visible = false;
        } else if (tile.explored && !tile.isVisibleAndLit()) {
            tile.sprite.tint = 0x999999;
            tile.sprite.visible = true;
        }
    } else {
        if (tile.isVisibleAndLit()) {
            tile.sprite.tint = 0xFFFFFF;
            tile.sprite.visible = true;
        } else if (tile.explored) {
            tile.sprite.tint = 0x999999;
            tile.sprite.visible = true;
        } else {
            tile.sprite.tint = 0x0;
            tile.sprite.visible = false;
        }
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
 * visible tile and is within the given max distance
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

export function getRandomOpenSpace(map: GameMap, entityMap: EntityMap): Point {
    const width = map[0].length;
    const height = map.length;
    let blocks = false;
    let entity;
    let x = 0;
    let y = 0;

    do {
        x = randomIntFromInterval(0, width);
        y = randomIntFromInterval(0, height);
        ({ entity, blocks } = isBlocked(map, entityMap, x, y));
    } while (entity !== null || blocks === true);

    return { x, y };
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
export function drawMap(renderer: PIXI.Renderer, camera: Camera, map: GameMap): void {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const { x: screenX, y: screenY } = camera.tilePositionToScreen(x, y);
            drawTile(map[y][x], screenX, screenY, camera.zoom);
        }
    }
}
