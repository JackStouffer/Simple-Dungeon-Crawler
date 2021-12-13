import { get } from "lodash";
import { Entity, IEntityConfig, World } from "ape-ecs";
import * as PIXI from "pixi.js";
import TiledMapOrthogonal, {
    TiledLayerTilelayer as TiledLayerTileLayer,
    TiledLayerObjectgroup as TiledLayerObjectGroup
} from "tiled-types";

import { RNG } from "./rot/index";

import * as tutorial_001 from "./maps/tutorial_001.json";
import * as tutorial_002 from "./maps/tutorial_002.json";
import * as forrest_001 from "./maps/forrest_001.json";
import * as forrest_001_interior_001 from "./maps/forrest_001_interior_001.json";
import * as forrest_001_interior_002 from "./maps/forrest_001_interior_002.json";

import {
    createEntity,
    EntityMap,
    EntityTeam,
    EntityTeamMap,
    GraphicsComponent,
    HitPointsComponent,
    InventoryComponent,
    KnownSpellData,
    PatrolPathComponent,
    PlannerAIComponent,
    PositionComponent,
    TriggerComponent
} from "./entity";
import { Camera, Rectangle } from "./camera";
import { Nullable, randomIntFromInterval } from "./util";
import { createPlanner } from "./ai/commands";
import { ItemData, SpellData } from "./skills";
import { PLAYER_ID, TILE_SIZE } from "./constants";

const COLOR_AMBIENT_LIGHT = "rgb(50, 50, 50)";

const LevelData: { [key: string]: TiledMapOrthogonal } = {
    tutorial_001: (tutorial_001 as any).default as TiledMapOrthogonal,
    tutorial_002: (tutorial_002 as any).default as TiledMapOrthogonal,
    forrest_001: (forrest_001 as any).default as TiledMapOrthogonal,
    forrest_001_interior_001: (forrest_001_interior_001 as any).default as TiledMapOrthogonal,
    forrest_001_interior_002: (forrest_001_interior_002 as any).default as TiledMapOrthogonal,
};

interface SavedLevelDetails {
    entities: string[],
    teams: string,
    playerTilePosition: string,
    visibilityData: string
}
const levelEntityStateMap: Map<string, SavedLevelDetails> = new Map();

interface TileDataDetails {
    name: string;
    textureKey: string;
    blocks: boolean;
    blocksSight: boolean;
    reflectivity: number;
    defaultToExplored?: boolean;
}

export const TileData: { [key: number]: TileDataDetails } = {
    6: {
        name: "grass",
        textureKey: "grass_1",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    25: {
        name: "grass",
        textureKey: "barrel_3",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    46: {
        name: "Window",
        textureKey: "sprite113",
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
    186: {
        name: "stone",
        textureKey: "stone_2",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    188: {
        name: "stone",
        textureKey: "sprite191",
        blocks: false,
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
    364: {
        name: "Tiled floor",
        textureKey: "sprite372",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    365: {
        name: "Wood floor",
        textureKey: "sprite373",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    380: {
        name: "Dresser",
        textureKey: "sprite457",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    382: {
        name: "Sack of food",
        textureKey: "sprite493",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    383: {
        name: "Sack of food",
        textureKey: "sprite510",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    384: {
        name: "Sack of food",
        textureKey: "sprite494",
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
    },
    387: {
        name: "Pot Rack",
        textureKey: "sprite495",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    388: {
        name: "Pot Rack",
        textureKey: "sprite496",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    399: {
        name: "A window",
        textureKey: "sprite467",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    542: {
        name: "Tiled floor",
        textureKey: "sprite548",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    543: {
        name: "wood floor",
        textureKey: "sprite549",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    563: {
        name: "Cabinets",
        textureKey: "sprite559",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    565: {
        name: "Vanity",
        textureKey: "sprite668",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    566: {
        name: "Pot Rack",
        textureKey: "sprite655",
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
    741: {
        name: "Cabinets",
        textureKey: "sprite732",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    743: {
        name: "Vanity",
        textureKey: "sprite734",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    917: {
        name: "Armoire",
        textureKey: "sprite974",
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
    1090: {
        name: "A table",
        textureKey: "long_wooden_table_1_middle",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1095: {
        name: "Armoire",
        textureKey: "sprite1072",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    1256: {
        name: "Path",
        textureKey: "sprite1248",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1264: {
        name: "Torch",
        textureKey: "sprite1314",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1432: {
        name: "Path",
        textureKey: "sprite1420",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1433: {
        name: "Path",
        textureKey: "sprite1421",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1434: {
        name: "Path",
        textureKey: "sprite1480",
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1438: {
        name: "An unlit fire",
        textureKey: "campfire_1_unlit",
        blocks: false,
        blocksSight: false,
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
    1797: {
        name: "Tree",
        textureKey: "sprite1812",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18,
        defaultToExplored: true
    },
    1799: {
        name: "Tree",
        textureKey: "sprite1814",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18,
        defaultToExplored: true
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
    1831: {
        name: "Magika Shrine",
        textureKey: "mage_statue_top",
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
    1975: {
        name: "Tree",
        textureKey: "sprite1886",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18,
        defaultToExplored: true
    },
    1977: {
        name: "Tree",
        textureKey: "sprite1888",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18,
        defaultToExplored: true
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
    2010: {
        name: "Gravestone",
        textureKey: "gravestone_2",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    2151: {
        name: "Building",
        textureKey: "sprite2006",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2153: {
        name: "Building",
        textureKey: "sprite2008",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2154: {
        name: "Building",
        textureKey: "sprite2009",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2156: {
        name: "Building",
        textureKey: "sprite2011",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2164: {
        name: "Building",
        textureKey: "sprite2019",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2165: {
        name: "Building",
        textureKey: "sprite2020",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2166: {
        name: "Building",
        textureKey: "sprite2021",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2167: {
        name: "Building",
        textureKey: "sprite2022",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2168: {
        name: "Building",
        textureKey: "sprite2023",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2328: {
        name: "Building",
        textureKey: "sprite2153",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2329: {
        name: "Building",
        textureKey: "sprite2154",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2330: {
        name: "Building",
        textureKey: "sprite2155",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2331: {
        name: "Building",
        textureKey: "sprite2156",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2332: {
        name: "Building",
        textureKey: "sprite2157",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2334: {
        name: "Building",
        textureKey: "sprite2159",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2344: {
        name: "Building",
        textureKey: "sprite2169",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2345: {
        name: "Building",
        textureKey: "sprite2170",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2346: {
        name: "Building",
        textureKey: "sprite2171",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2506: {
        name: "Building",
        textureKey: "sprite2307",
        blocks: true,
        blocksSight: true,
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
    2684: {
        name: "Building",
        textureKey: "sprite2462",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2685: {
        name: "Building",
        textureKey: "sprite2463",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2686: {
        name: "Building",
        textureKey: "sprite2464",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2687: {
        name: "Building",
        textureKey: "sprite2465",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2688: {
        name: "Building",
        textureKey: "sprite2466",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2689: {
        name: "Building",
        textureKey: "sprite2467",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2690: {
        name: "Building",
        textureKey: "sprite2468",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2691: {
        name: "Building",
        textureKey: "sprite2469",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2698: {
        name: "Building",
        textureKey: "sprite2476",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2699: {
        name: "Building",
        textureKey: "sprite2477",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2701: {
        name: "Building",
        textureKey: "sprite2479",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2702: {
        name: "Building",
        textureKey: "sprite2480",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2703: {
        name: "Building",
        textureKey: "sprite2481",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2704: {
        name: "Building",
        textureKey: "sprite2482",
        blocks: true,
        blocksSight: true,
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
    2705: {
        name: "Building",
        textureKey: "sprite2483",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3222: {
        name: "Building",
        textureKey: "sprite2928",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3224: {
        name: "Building",
        textureKey: "sprite2930",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3299: {
        name: "Table",
        textureKey: "sprite2973",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3300: {
        name: "Table",
        textureKey: "sprite2974",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3301: {
        name: "Table",
        textureKey: "sprite2975",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3304: {
        name: "Table",
        textureKey: "sprite2978",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3311: {
        name: "Bed2",
        textureKey: "sprite3052",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3402: {
        name: "Building",
        textureKey: "sprite3082",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3436: {
        name: "Stump",
        textureKey: "sprite3215",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3482: {
        name: "Table",
        textureKey: "sprite3146",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3489: {
        name: "Bed",
        textureKey: "sprite3148",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3580: {
        name: "Building",
        textureKey: "sprite3242",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3599: {
        name: "Building",
        textureKey: "sprite3258",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3660: {
        name: "Table",
        textureKey: "sprite3293",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3668: {
        name: "Bed",
        textureKey: "sprite3361",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3759: {
        name: "Roof",
        textureKey: "brown_roof_rear_left_slope",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    3760: {
        name: "Roof",
        textureKey: "brown_roof_rear_right_slope",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    3792: {
        name: "Stump",
        textureKey: "sprite3421",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3846: {
        name: "Bed4",
        textureKey: "sprite3457",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3934: {
        name: "Building",
        textureKey: "tan_building_exterior_left_edge",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    3935: {
        name: "Building",
        textureKey: "tan_building_exterior_middle",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    3936: {
        name: "Building",
        textureKey: "tan_building_exterior_right_edge",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    3937: {
        name: "Roof",
        textureKey: "brown_roof_left_slope",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    3938: {
        name: "Roof",
        textureKey: "brown_roof_right_slope",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    3939: {
        name: "Roof",
        textureKey: "brown_roof_edge_1",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    3942: {
        name: "Building",
        textureKey: "brown_building_exterior_middle",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    3949: {
        name: "Building",
        textureKey: "sprite3576",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    3970: {
        name: "Pile of Wood",
        textureKey: "sprite3651",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4112: {
        name: "Building",
        textureKey: "tan_building_exterior_bottom_right_corner",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    4113: {
        name: "Building",
        textureKey: "tan_building_exterior_bottom_edge",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    4114: {
        name: "Building",
        textureKey: "tan_building_exterior_bottom_left_corner",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    4115: {
        name: "Roof",
        textureKey: "brown_roof_front_left_slope",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    4116: {
        name: "Roof",
        textureKey: "brown_roof_front_right_slope",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    4142: {
        name: "Fence",
        textureKey: "sprite3751",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4143: {
        name: "Fence",
        textureKey: "sprite3752",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4144: {
        name: "Fence",
        textureKey: "sprite3753",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4145: {
        name: "Fence",
        textureKey: "sprite3754",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4146: {
        name: "Fence",
        textureKey: "sprite3755",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4147: {
        name: "Fence",
        textureKey: "sprite3854",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    4148: {
        name: "Fence",
        textureKey: "sprite3756",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    3764: {
        name: "Building",
        textureKey: "brown_building_exterior_top_edge",
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    5805: {
        name: "A stove",
        textureKey: "stove_1",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    5806: {
        name: "A stove",
        textureKey: "stove_2",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    5977: {
        name: "Counter",
        textureKey: "sprite4890",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    5978: {
        name: "Counter",
        textureKey: "sprite4891",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    5979: {
        name: "Counter",
        textureKey: "sprite4892",
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    5983: {
        name: "stove",
        textureKey: "stove_3",
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

export interface VisibilityData {
    explored: boolean;
    visible: boolean;
    lightingColor: string;
}

export class Tile {
    type: number;
    sprite: PIXI.Sprite;
    blocks: boolean;
    blocksSight: boolean;
    reflectivity: number;
    pathfindingCost: string = "0";

    constructor(
        type: number,
        texture: PIXI.Texture,
        blocks: boolean,
        blocksSight: boolean
    ) {
        this.type = type;
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.zIndex = 0;
        this.blocks = blocks;
        this.blocksSight = blocksSight;
        this.reflectivity = 0.18;
    }
}

function customJSONSerializer(key: string, value: any) {
    if (value instanceof Map) {
        return {
            dataType: "Map",
            value: Array.from(value.entries())
        };
    } else if (value instanceof Set) {
        return {
            dataType: "Set",
            value: Array.from(value.values())
        };
    } else {
        return value;
    }
}

function customJSONDeserializer(key: string, value: any) {
    if (typeof value === "object" && value !== null) {
        if (value.dataType === "Map") {
            return new Map(value.value);
        }
        if (value.dataType === "Set") {
            return new Set(value.value);
        }
    }
    return value;
}


/**
 * Is the tile position and is lit by non-ambient light
 * @returns {boolean} Is visible and lit
 */
export function isVisibleAndLit(map: GameMap, tilePos: Vector2D): boolean {
    const position = map.visibilityData[tilePos.y][tilePos.x];
    return position.visible && position.lightingColor !== COLOR_AMBIENT_LIGHT;
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

export class GameMap {
    readonly name: string;
    readonly width: number;
    readonly height: number;
    readonly depth: number;
    readonly data: Nullable<Tile>[][][];
    /** Each position on the map's visibility. 2D because we deal positions and not tiles here */
    readonly visibilityData: VisibilityData[][];

    constructor(name: string, data: Nullable<Tile>[][][], visibilityData: VisibilityData[][]) {
        this.name = name;
        this.data = data;
        this.depth = data.length;
        this.height = data[0].length;
        this.width = data[0][0].length;
        this.visibilityData = visibilityData;
    }
}

export class ShadowBox {
    x: number;
    y: number;
    width: number;
    height: number;
    seen: boolean;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.seen = false;
    }

    contains(x: number, y: number): boolean {
        if (x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height) {
            return true;
        }
        return false;
    }

    center(): Vector2D {
        return new Vector2D(
            this.x + Math.round(this.width / 2),
            this.y + Math.round(this.height / 2)
        );
    }

    tiles(): Vector2D[] {
        const ret = [];
        for (let x = this.x; x < this.x + this.width + 1; x++) {
            for (let y = this.y; y < this.y + this.height + 1; y++) {
                ret.push(new Vector2D(x, y));
            }
        }
        return ret;
    }
}

/**
 * Load a Tiled map using its name.
 */
export function loadTiledMap(
    ecs: World,
    stage: PIXI.Container,
    textures: PIXI.ITextureDictionary,
    level: string
) {
    if (!(level in LevelData)) { throw new Error(`${level} is not a valid level`); }

    const sourceData = LevelData[level];
    const tileSize: number = sourceData.tileheight;
    const mapData: Nullable<Tile>[][][] = [];
    let playerTilePosition: Vector2D = new Vector2D(0, 0);

    const tileLayers = sourceData.layers.filter(
        l => get(l, "properties[0].value", null) === "tile"
    ) as TiledLayerTileLayer[];

    const environmentLayer = sourceData.layers.filter(
        l => l.name === "Entity Layer"
    )[0] as TiledLayerTileLayer;

    const objectLayer = get(
        sourceData.layers.filter(
            l => l.name === "Object Layer"
        ),
        "[0]",
        null
    ) as TiledLayerObjectGroup;

    const nodeLayer = get(sourceData.layers.filter(
        (l) => l.name === "Node Layer"
    ), "[0]", null) as TiledLayerObjectGroup;

    const shadowBoxLayer = get(sourceData.layers.filter(
        (l) => l.name === "Shadow Boxes"
    ), "[0]", null) as TiledLayerObjectGroup;

    const wanderBoundsLayer = get(sourceData.layers.filter(
        (l) => l.name === "Wander Bounds"
    ), "[0]", null) as TiledLayerObjectGroup;

    if (tileLayers.length === 0) {
        throw new Error(`No tile layer in map ${level}`);
    }
    if (objectLayer === null) {
        throw new Error(`No object layer in map ${level}`);
    }
    if (nodeLayer === null) {
        throw new Error(`No node layer in map ${level}`);
    }
    if (shadowBoxLayer === null) {
        throw new Error(`No shadow box layer in map ${level}`);
    }
    if (wanderBoundsLayer === null) {
        throw new Error(`No wander bounds layer in map ${level}`);
    }

    let visibilityData: VisibilityData[][] = new Array(sourceData.height);
    // TODO, speed: This is done twice when the level is reloaded from a save
    // Create the visibility data of the tiles
    for (let h = 0; h < sourceData.height; h++) {
        visibilityData[h] = new Array(sourceData.width);
        for (let i = 0; i < visibilityData[h].length; i++) {
            visibilityData[h][i] = {
                explored: false,
                visible: false,
                lightingColor: "white"
            };
        }
    }

    // Loading the tile data
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
                tile,
                textures[data.textureKey],
                data.blocks,
                data.blocksSight
            );
            t.sprite.zIndex = z;
            stage.addChild(t.sprite);
            translated.push(t);

            if (data.defaultToExplored === true) {
                visibilityData[Math.floor(i / sourceData.width)][i % sourceData.width]
                    .explored = true;
            }
        }

        const layerResult = [];
        for (let i = 0; i < translated.length; i += sourceData.width) {
            layerResult.push(translated.slice(i, i + sourceData.width));
        }
        mapData.push(layerResult);
    }

    // First create all of the nodes
    nodeLayer.objects.forEach(o => {
        createEntity(
            ecs,
            textures,
            "node",
            new Vector2D(
                Math.floor(o.x / tileSize),
                Math.floor(o.y / tileSize)
            ),
            o.id.toString(10)
        );
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
            comp!.next = next.id;
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
            new Vector2D(Math.floor(i % sourceData.width), Math.floor(i / sourceData.width)),
        );
    });

    const wanderBounds: Map<number, Rectangle> = new Map();
    wanderBoundsLayer.objects.forEach(o => {
        wanderBounds.set(o.id, {
            x: Math.floor(o.x / tileSize),
            y: Math.floor(o.y / tileSize),
            width: Math.floor(o.width / tileSize),
            height: Math.floor(o.height / tileSize)
        });
    });

    const shadowBoxes = shadowBoxLayer.objects.map(o => {
        return new ShadowBox(
            Math.floor(o.x / tileSize),
            Math.floor(o.y / tileSize),
            Math.floor(o.width / tileSize),
            Math.floor(o.height / tileSize)
        );
    });

    const teams: EntityTeamMap = new Map();

    if (levelEntityStateMap.has(level)) {
        const levelData = levelEntityStateMap.get(level)!;

        for (const entityData of levelData.entities) {
            const obj: IEntityConfig = JSON.parse(entityData, customJSONDeserializer);
            createEntity(ecs, textures, obj.c!.TypeComponent.entityType, undefined, obj.id!, obj);
        }

        visibilityData = JSON.parse(levelData.visibilityData);

        JSON
            .parse(levelData.teams, customJSONDeserializer)
            .forEach((t: [number, { [key: string]: any }]) => {
                teams.set(t[0], new EntityTeam(t[1]));
            });

        playerTilePosition = Vector2D.fromVector(JSON.parse(levelData.playerTilePosition));
    } else {
        objectLayer.objects.forEach(o => {
            if (o.point !== undefined) {
                if (o.type === "object") {
                    // TODO, Speed: Doing a lot of iteration here. Would be better
                    // to just make a hash map.
                    const type = findProperty(o, "objectType") as string,
                        inventory = findProperty(o, "inventory") as string,
                        levelName = findProperty(o, "levelName") as string,
                        spellId = findProperty(o, "spellId") as string,
                        patrolTarget = findProperty(o, "patrolTarget") as number,
                        fallbackPosition = findProperty(o, "fallbackPosition") as number,
                        event = findProperty(o, "event") as string,
                        teamId = findProperty(o, "teamId") as number,
                        isTeamCommander = findProperty(o, "commander") as boolean,
                        wanderBoundsId = findProperty(o, "wanderBounds") as number;

                    if (type === null) {
                        throw new Error(`No type for ${o.name}`);
                    }

                    if (type === "player") {
                        playerTilePosition.x = Math.floor(o.x / tileSize);
                        playerTilePosition.y = Math.floor(o.y / tileSize);
                    } else {
                        const entity: Entity = createEntity(
                            ecs,
                            textures,
                            type,
                            new Vector2D(Math.floor(o.x / tileSize), Math.floor(o.y / tileSize)),
                            `${type}-${o.id}`,
                        );

                        if (inventory !== null) {
                            const items: Map<string, number> = new Map();
                            for (const i of inventory.split(",")) {
                                if (i in ItemData) {
                                    let current = items.get(i) ?? 0;
                                    items.set(i, ++current);
                                }
                            }

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
                            const spellData = SpellData[spellId];
                            if (spellData === undefined) { throw new Error(`${spellId} is not a valid spell`); }

                            const spells: { [key: string]: KnownSpellData } = {
                                [spellId]: {
                                    count: spellData.baseCastCount,
                                    maxCount: spellData.baseCastCount
                                }
                            };
                            entity.addComponent({ type: "SpellsComponent", knownSpells: spells });
                        }

                        if (patrolTarget !== null) {
                            const target = ecs.getEntity(patrolTarget.toString());
                            if (target === undefined) { throw new Error(`Patrol target ${patrolTarget} is not initialized`); }
                            entity.addComponent({
                                type: "PatrolAIComponent",
                                patrolTarget: target.id
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
                            const triggerData = entity.getOne(TriggerComponent);
                            if (triggerData === undefined) { throw new Error(`Missing TriggerComponent on ${entity.id}`); }
                            triggerData.event = event;
                            triggerData.update();
                        }

                        if (teamId !== null) {
                            if (!teams.has(teamId)) {
                                teams.set(teamId, new EntityTeam());
                            }

                            const team = teams.get(teamId)!;
                            team.memberIds.push(entity.id);
                            if (isTeamCommander) {
                                team.createdWithCommander = true;
                                team.commanderId = entity.id;
                            }

                            const ai = entity.getOne(PlannerAIComponent);
                            if (ai !== undefined) {
                                ai.teamId = teamId;
                            }
                        }

                        if (wanderBoundsId !== null) {
                            const bounds = wanderBounds.get(wanderBoundsId);
                            if (bounds === undefined) {
                                throw new Error(`Invalid wander bounds reference ${wanderBoundsId} in ${o.id}`);
                            }

                            const aiState = entity.getOne(PlannerAIComponent);
                            if (aiState === undefined) {
                                throw new Error(`Attempting to add wander bounds to entity ${entity.id} with no AI state`);
                            }

                            aiState.wanderBounds = bounds;
                            aiState.update();
                        }
                    }
                } else {
                    throw new Error(`Unrecognized object type ${o.type}`);
                }
            }
        });
    }

    return {
        map: new GameMap(level, mapData, visibilityData),
        playerTilePosition,
        shadowBoxes,
        teams
    };
}

export function saveLevelState(
    ecs: World,
    map: GameMap,
    teams: EntityTeamMap,
    playerTilePosition: Vector2D
): void {
    const entities = [];
    for (const entity of ecs.entities.values()) {
        if (entity.id !== PLAYER_ID) {
            const config = entity.getObject();
            if ("GraphicsComponent" in config.c) {
                config.c.GraphicsComponent.sprite = null;
            }
            entities.push(JSON.stringify(config, customJSONSerializer));
        }
    }

    levelEntityStateMap.set(map.name, {
        playerTilePosition: JSON.stringify(playerTilePosition),
        entities,
        teams: JSON.stringify(teams, customJSONSerializer),
        visibilityData: JSON.stringify(map.visibilityData)
    });
}

/**
 * Return all the objects at a given spot on the map
 */
export function getEntitiesAtLocation(
    ecs: World,
    entityMap: EntityMap,
    tilePos: Vector2D
): Entity[] {
    const eIds = entityMap.get(`${tilePos.x},${tilePos.y}`) ?? [];
    const ret: Entity[] = [];
    for (const eId of eIds) {
        const e = ecs.getEntity(eId);
        if (e !== undefined) {
            ret.push(e);
        }
    }
    return ret;
}

interface BlocksResult {
    entity: Nullable<Entity>;
    blocks: boolean;
}

/**
 * Gives data about a location. Key entity
 * will be the Entity on the tile if there is one, and null
 * otherwise. blocks is true if either the tile or the object on
 * the tile blocks, false otherwise.
 */
export function isBlocked(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    tilePos: Vector2D
): BlocksResult {
    // Assumes all layers are same size
    if (tilePos.x < 0 || tilePos.y < 0 || tilePos.x >= map.width || tilePos.y >= map.height) {
        return { entity: null, blocks: true };
    }

    for (let z = 0; z < map.depth; z++) {
        if (map.data[z][tilePos.y][tilePos.x]?.blocks === true) {
            return { entity: null, blocks: true };
        }
    }

    const entities = getEntitiesAtLocation(ecs, entityMap, tilePos);
    entities.sort((a, b) => {
        const g1 = a.getOne(GraphicsComponent)?.sprite?.zIndex ?? 0;
        const g2 = b.getOne(GraphicsComponent)?.sprite?.zIndex ?? 0;
        return g2 - g1;
    });

    if (entities.length === 0) {
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
export function isSightBlocked(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    tilePos: Vector2D
): boolean {
    // Assumes all layers are same size
    if (tilePos.x < 0 || tilePos.y < 0 || tilePos.x >= map.width || tilePos.y >= map.height) {
        return true;
    }

    for (let z = 0; z < map.depth; z++) {
        if (map.data[z][tilePos.y][tilePos.x] !== null &&
            map.data[z][tilePos.y][tilePos.x]!.blocksSight === true) {
            return true;
        }
    }

    const entities = getEntitiesAtLocation(ecs, entityMap, tilePos);
    for (const e of entities) {
        if (e.tags.has("blocksSight") === true) { return true; }
    }

    return false;
}

interface Point {
    x: number;
    y: number;
}

export class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static fromVector(v: Point): Vector2D {
        return new Vector2D(v.x, v.y);
    }

    isEqual(v: Point): boolean {
        return this.x === v.x && this.y === v.y;
    }

    divide(n: number): void {
        this.x /= n;
        this.y /= n;
    }

    magnitude(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    normalize(): void {
        this.divide(this.magnitude());
    }

    direction(origin: Vector2D): number {
        let direction = Math.atan2(this.y - origin.y, this.x - origin.x) * (180 / Math.PI);
        if (direction < 0) {
            direction = 360 + direction;
        }
        return direction;
    }
}

/**
 * Find the tile distance between two points
 * @param  {Vector2D} a A Vector2D
 * @param  {Vector2D} b A Vector2D
 * @return {number} The distance
 */
export function tileDistanceBetweenPoints(a: Vector2D, b: Vector2D): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
}

/**
 * Find the world distance between two tile positions. Does not find the
 * distance between two world positions.
 * @param  {Vector2D} a A Vector2D
 * @param  {Vector2D} b A Vector2D
 * @return {number} The distance
 */
export function worldDistanceBetweenPoints(a: Vector2D, b: Vector2D, zoom: number): number {
    const dx = (b.x * 16 * zoom) - (a.x * 16 * zoom);
    const dy = (b.y * 16 * zoom) - (a.y * 16 * zoom);
    return Math.sqrt(dx ** 2 + dy ** 2);
}

/**
 * Find a random actor which has a fighter and an ai and is on a
 * visible tile and is within the given max distance
 */
export function getRandomFighterWithinRange(
    ecs: World,
    map: GameMap,
    origin: Vector2D,
    maxDistance: number
): Nullable<Entity> {
    const entities = ecs
        .createQuery()
        .fromAll(PositionComponent, HitPointsComponent, PlannerAIComponent)
        .execute();

    const possible = [];
    for (const e of entities) {
        const pos = e.getOne(PositionComponent)!;
        const d = tileDistanceBetweenPoints(origin, pos.tilePosition);
        if (!origin.isEqual(pos.tilePosition) && d <= maxDistance) {
            possible.push(e);
        }
    }

    return possible.length > 0 ? RNG.getItem(possible) : null;
}

export function getRandomOpenSpace(ecs: World, map: GameMap, entityMap: EntityMap): Vector2D {
    let blocks = false;
    let entity;
    let pos: Vector2D;
    let failsafe = 0;

    do {
        pos = new Vector2D(
            randomIntFromInterval(0, map.width),
            randomIntFromInterval(0, map.height)
        );
        ({ entity, blocks } = isBlocked(ecs, map, entityMap, pos));
        ++failsafe;
    } while ((entity !== null || blocks === true) && failsafe < 2000);

    if (failsafe >= 2000) {
        throw new Error("Infinite loop");
    }

    return pos;
}

/**
 * Set all the Tile objects in a map to visible
 * @param  {Array} map  An array of arrays of Tiles
 * @return {void}
 */
export function resetVisibility(map: GameMap, shadowBoxes: ShadowBox[]): void {
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            map.visibilityData[y][x].visible = false;
            map.visibilityData[y][x].lightingColor = COLOR_AMBIENT_LIGHT;
        }
    }

    for (let i = 0; i < shadowBoxes.length; i++) {
        shadowBoxes[i].seen = false;
    }
}

export function resetTilePathCosts(map: GameMap): void {
    for (let z = 0; z < map.depth; z++) {
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                if (map.data[z][y][x] !== null) {
                    map.data[z][y][x]!.pathfindingCost = "0";
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
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            map.visibilityData[y][x].explored = true;
            if (visible) {
                map.visibilityData[y][x].visible = true;
            }
            if (lit) {
                map.visibilityData[y][x].lightingColor = "white";
            }
        }
    }
}

/**
 * Draw a tile given the tile data and the coordinates
 */
export function drawTile(
    map: GameMap,
    viewport: Rectangle,
    tile: Tile,
    posX: number,
    posY: number,
    screenX: number,
    screenY: number,
    scale: number
): void {
    const tileSize = TILE_SIZE * scale;
    if (screenX > viewport.width + tileSize ||
        screenX < 0 - tileSize ||
        screenY > viewport.height + tileSize ||
        screenY < 0 - tileSize) {
        tile.sprite.visible = false;
        return;
    }

    tile.sprite.position.set(screenX, screenY);
    tile.sprite.scale.set(scale, scale);

    const explored = map.visibilityData[posY][posX].explored;
    const visible = isVisibleAndLit(map, new Vector2D(posX, posY));
    if (tile.blocks) {
        if (visible) {
            tile.sprite.tint = 0xFFFFFF;
            tile.sprite.visible = true;
        } else if (!explored) {
            tile.sprite.tint = 0xFFFFFF;
            tile.sprite.visible = false;
        } else if (explored && !visible) {
            tile.sprite.tint = 0xBBBBBB;
            tile.sprite.visible = true;
        }
    } else {
        if (visible) {
            tile.sprite.tint = 0xFFFFFF;
            tile.sprite.visible = true;
        } else if (explored) {
            tile.sprite.tint = 0xBBBBBB;
            tile.sprite.visible = true;
        } else {
            tile.sprite.tint = 0x0;
            tile.sprite.visible = false;
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
export function drawMap(camera: Camera, map: GameMap): void {
    for (let z = 0; z < map.depth; z++) {
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                if (map.data[z][y][x] !== null) {
                    const screenPos = camera.tilePositionToScreen(
                        new Vector2D(x, y)
                    );
                    drawTile(
                        map,
                        camera.viewport,
                        map.data[z][y][x]!,
                        x,
                        y,
                        screenPos.x,
                        screenPos.y,
                        camera.zoom
                    );
                }
            }
        }
    }
}

/**
 * Given an x, y position, give the highest z index in the map that has a non-null
 * tile
 */
export function getHighestZIndexWithTile(map: GameMap, tilePos: Vector2D): number {
    let ret = 0;
    for (let z = 0; z < map.depth; z++) {
        const tile = map.data[z][tilePos.y][tilePos.x];
        if (tile !== null) { ret = z; }
    }

    return ret;
}
