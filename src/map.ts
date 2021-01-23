import { get } from "lodash";
import { Entity, World } from "ape-ecs";
import * as PIXI from "pixi.js";
import TiledMapOrthogonal, { TiledLayerTilelayer, TiledLayerObjectgroup } from "tiled-types";

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

const LevelData: { [key: string]: TiledMapOrthogonal } = {
    forrest_001: (forrest_001 as any).default as TiledMapOrthogonal
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
    184: {
        name: "grass",
        textureKey: "grass_2",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    2678: {
        name: "Stone Road",
        textureKey: "stone_road_top_left_corner",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    2679: {
        name: "Stone Road",
        textureKey: "stone_road_top_edge",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    2680: {
        name: "Stone Road",
        textureKey: "stone_road_top_right_corner",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    2856: {
        name: "Stone Road",
        textureKey: "stone_road_left_edge",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    2857: {
        name: "Stone Road",
        textureKey: "stone_road_middle",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    2858: {
        name: "Stone Road",
        textureKey: "stone_road_right_edge",
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
    1610: {
        name: "Dirt",
        textureKey: "dirt_top_left_corner",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1611: {
        name: "Dirt",
        textureKey: "dirt_top_edge",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1612: {
        name: "Dirt",
        textureKey: "dirt_top_right_corner",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1788: {
        name: "Dirt",
        textureKey: "dirt_left_edge",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1789: {
        name: "Dirt",
        textureKey: "dirt_middle",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1790: {
        name: "Dirt",
        textureKey: "dirt_right_edge",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1966: {
        name: "Dirt",
        textureKey: "dirt_bottom_left_corner",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1967: {
        name: "Dirt",
        textureKey: "dirt_bottom_edge",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1968: {
        name: "Dirt",
        textureKey: "dirt_bottom_right_corner",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1827: {
        name: "Tent",
        textureKey: "green_tent_top_left",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1828: {
        name: "Tent",
        textureKey: "green_tent_top_right",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    2005: {
        name: "Tent",
        textureKey: "green_tent_bottom_left",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    2006: {
        name: "Tent",
        textureKey: "green_tent_bottom_right",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3934: {
        name: "Building",
        textureKey: "tan_building_exterior_left_edge",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3935: {
        name: "Building",
        textureKey: "tan_building_exterior_middle",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3936: {
        name: "Building",
        textureKey: "tan_building_exterior_right_edge",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4112: {
        name: "Building",
        textureKey: "tan_building_exterior_bottom_right_corner",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4113: {
        name: "Building",
        textureKey: "tan_building_exterior_bottom_edge",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4114: {
        name: "Building",
        textureKey: "tan_building_exterior_bottom_left_corner",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3759: {
        name: "Roof",
        textureKey: "brown_roof_rear_left_slope",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3760: {
        name: "Roof",
        textureKey: "brown_roof_rear_right_slope",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3937: {
        name: "Roof",
        textureKey: "brown_roof_left_slope",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3938: {
        name: "Roof",
        textureKey: "brown_roof_right_slope",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4115: {
        name: "Roof",
        textureKey: "brown_roof_front_left_slope",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4116: {
        name: "Roof",
        textureKey: "brown_roof_front_right_slope",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3939: {
        name: "Roof",
        textureKey: "brown_roof_edge_1",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3942: {
        name: "Building",
        textureKey: "brown_building_exterior_middle",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3764: {
        name: "Building",
        textureKey: "brown_building_exterior_top_edge",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    218: {
        name: "Door",
        textureKey: "brown_door_steel_frame_barred",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    221: {
        name: "Window",
        textureKey: "brown_square_4x4_window",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    935: {
        name: "Window",
        textureKey: "brown_window_curved_top_open_shutters",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1619: {
        name: "A tree",
        textureKey: "short_pine_tree_1",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    1620: {
        name: "A tree",
        textureKey: "short_pine_tree_1",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    1537: {
        name: "Trees",
        textureKey: "turquoise_copse_top_left_corner",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1538: {
        name: "Trees",
        textureKey: "turquoise_copse_top_middle",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1539: {
        name: "Trees",
        textureKey: "turquoise_copse_top_right_corner",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1715: {
        name: "Trees",
        textureKey: "turquoise_copse_left_edge",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1716: {
        name: "Trees",
        textureKey: "turquoise_copse_middle",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1717: {
        name: "Trees",
        textureKey: "turquoise_copse_right_edge",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1893: {
        name: "Trees",
        textureKey: "turquoise_copse_bottom_left_corner",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1894: {
        name: "Trees",
        textureKey: "turquoise_copse_bottom_middle",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1895: {
        name: "Trees",
        textureKey: "turquoise_copse_bottom_right_corner",
        blocks: true,
        blocksSight: false,
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
    [211, "door"],
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

export type GameMap = Nullable<Tile>[][][];

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

    const sourceData = LevelData[level];
    const tileSize: number = sourceData.tileheight;
    const map: GameMap = [];
    let playerLocation: [number, number] = [0, 0];

    const tileLayers = sourceData.layers.filter(
        l => get(l, "properties[0].value", null) === "tile"
    ) as TiledLayerTilelayer[];

    const environmentLayer = sourceData.layers.filter(
        l => l.name === "Entity Layer"
    )[0] as TiledLayerTilelayer;

    const objectLayer = get(
        sourceData.layers.filter(
            l => l.name === "Object Layer"
        ),
        "[0]",
        null
    ) as TiledLayerObjectgroup<"orthogonal">;

    const nodeLayer = get(sourceData.layers.filter(
        (l) => l.name === "Node Layer"
    ), "[0]", null) as TiledLayerObjectgroup<"orthogonal">;

    if (tileLayers.length === 0) {
        throw new Error(`No tile layer in map ${level}`);
    }
    if (objectLayer === null) {
        throw new Error(`No object layer in map ${level}`);
    }
    if (nodeLayer === null) {
        throw new Error(`No node layer in map ${level}`);
    }

    for (let z = 0; z < tileLayers.length; z++) {
        const layer = tileLayers[z].data as number[];
        const translated = [];
        for (let i = 0; i < layer.length; i++) {
            const tile = layer[i];
            if (tile === 0 && z === 0) {
                throw new Error("Can't have a null tile in the base layer");
            } else if (tile === 0 && z !== 0) {
                translated.push(null);
                continue;
            }
            if (!(tile in TileData)) { throw new Error(`${tile} is not valid tile`); }

            const data = TileData[tile];
            const t = new Tile(
                data.name,
                textures,
                data.textureKey,
                data.blocks,
                data.blocksSight
            );
            t.sprite.zIndex = z;
            stage.addChild(t.sprite);
            translated.push(t);
        }

        const layerResult = [];
        for (let i = 0; i < translated.length; i += sourceData.width) {
            layerResult.push(translated.slice(i, i + sourceData.width));
        }
        map.push(layerResult);
    }

    // First create all of the nodes
    nodeLayer.objects.forEach(o => {
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
    nodeLayer.objects.forEach(o => {
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

    (environmentLayer.data as number[]).forEach((tile: number, i: number) => {
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
                    playerLocation = [
                        Math.floor(o.x / tileSize) * tileSize,
                        Math.floor(o.y / tileSize) * tileSize
                    ];
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

    // Assumes all layers are same size
    if (x < 0 || y < 0 || x >= map[0][0].length || y >= map[0].length) {
        return { entity: null, blocks: true };
    }

    for (let z = 0; z < map.length; z++) {
        if (map[z][y][x]?.blocks === true) {
            return { entity: null, blocks: true };
        }
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

    // Assumes all layers are same size
    if (x < 0 || y < 0 || x >= map[0][0].length || y >= map[0].length) {
        return true;
    }

    for (let z = 0; z < map.length; z++) {
        if (map[z][y][x] !== null && map[z][y][x]!.blocksSight === true) {
            return true;
        }
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
 * Draw a tile given the tile data and the coordinates
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
        const d = distanceBetweenPoints(origin.tilePosition(), pos.tilePosition());
        if (pos !== origin && d <= maxDistance) {
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
    for (let z = 0; z < map.length; z++) {
        for (let y = 0; y < map[z].length; y++) {
            for (let x = 0; x < map[z][y].length; x++) {
                if (map[z][y][x] !== null) {
                    map[z][y][x]!.visible = false;
                    map[z][y][x]!.lightingColor = COLOR_AMBIENT_LIGHT;
                }
            }
        }
    }
}

export function resetTilePathCosts(map: GameMap): void {
    for (let z = 0; z < map.length; z++) {
        for (let y = 0; y < map[z].length; y++) {
            for (let x = 0; x < map[z][y].length; x++) {
                if (map[z][y][x] !== null) {
                    map[z][y][x]!.pathfindingCost = "0";
                }
            }
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
    for (let z = 0; z < map.length; z++) {
        for (let y = 0; y < map[z].length; y++) {
            for (let x = 0; x < map[z][y].length; x++) {
                if (map[z][y][x] === null) { continue; }

                map[z][y][x]!.explored = true;
                if (visible) {
                    map[z][y][x]!.visible = true;
                }
                if (lit) {
                    map[z][y][x]!.lightingColor = "white";
                }
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
    for (let z = 0; z < map.length; z++) {
        for (let y = 0; y < map[z].length; y++) {
            for (let x = 0; x < map[z][y].length; x++) {
                if (map[z][y][x] !== null) {
                    const { x: screenX, y: screenY } = camera.tilePositionToScreen(x, y);
                    drawTile(map[z][y][x]!, screenX, screenY, camera.zoom);
                }
            }
        }
    }
}

/**
 * Given an x, y position, give the highest z index in the map that has a non-null
 * tile
 */
export function getHighestZIndexWithTile(map: GameMap, x: number, y: number): number {
    let ret = 0;
    for (let z = 0; z < map.length; z++) {
        const tile = map[z][y][x];
        if (tile !== null) { ret = z; }
    }

    return ret;
}
