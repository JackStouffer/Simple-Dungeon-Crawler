// @ts-expect-error
import * as forrest_001 from "./maps/forrest_001";
// @ts-expect-error
import * as durdwin_001 from "./maps/durdwin_001";
// @ts-expect-error
import * as dev_room from "./maps/dev_room";

import {
    resolveTargetPositionKnown,
    resolveTargetInLOS,
    resolveNextToTarget,
    resolveEnoughManaForSpellGenerator,
    resolveLowHealth,
    resolveLowMana,
    resolveHasManaItem,
    resolveHasHealingItem,
    resolveInDangerousArea,
    resolveTargetKilled,
    resolveAfraid,
    resolveCowering,
    resolveAtFallbackPosition,
    resolveHasArrows
} from "./ai/goals";
import {
    wanderAction,
    patrolAction,
    chaseAction,
    chaseWeight,
    useHealingItemAction,
    useManaItemAction,
    castSpellAction,
    meleeAttackAction
} from "./ai/actions";
import {
    castHeal,
    castConfuse,
    castClairvoyance,
    castDamageSpell,
    castWildDamageSpell,
    castHaste,
    castSlow,
    castIncreaseMana,
    castFireWall,
    castIceWall,
    SkillFunction
} from "./skills";
import { createBurnEffect } from "./effects";
import { AIComponent } from "./ai/components";
import { GameObject } from "./object";
import { Command, NoOpCommand } from "./commands";
import { PathNode } from "./map";
import { Nullable } from "./util";

export const WIDTH = 58;
export const HEIGHT = 38;
export const UI_HEIGHT = 6;
export const WORLD_WIDTH = WIDTH;
export const WORLD_HEIGHT = HEIGHT - UI_HEIGHT - 1;

export const COLOR_INVISIBLE_WALL = "black";
export const COLOR_DARK_WALL = "rgb(20, 20, 20)";
export const COLOR_LIGHT_WALL = "#352620";
export const COLOR_INVISIBLE_GROUND = "black";
export const COLOR_DARK_GROUND = "rgb(50, 50, 50)";
export const COLOR_LIGHT_GROUND = "white";
export const COLOR_AMBIENT_LIGHT = "rgb(50, 50, 50)";

export const MAP_FILLED_SPACE = "#";
export const MAP_EMPTY_SPACE = ".";

export const BASE_SPEED = 10;
export const LEVEL_UP_BASE = 50;
export const LEVEL_UP_FACTOR = 150;

/**
 * Damage type enum.
 *
 * Fire: weak to water
 * Electric: weak to nature
 * Water: weak to electric
 * Nature: weak to fire
 */
export enum DamageType {
    Physical,
    Fire,
    Electric,
    Water,
    Nature
}

/**
 * Damage affinity damage multiplier
 */
export enum Affinity {
    weak = 2,
    normal = 1,
    strong = 0.5,
    nullified = 0
}

export enum DeathType {
    Default,
    RemoveFromWorld
}

export enum GameState {
    Gameplay,
    OpeningCinematic,
    WinCinematic,
    LoseCinematic,
    PauseMenu,
    InventoryMenu,
    SpellMenu
}

export enum ItemType {
    HealSelf,
    AddManaSelf,
    DamageScroll,
    WildDamageScroll,
    ClairvoyanceScroll,
    ConfuseScroll,
    HasteSelf,
    SlowOther
}

export enum SpellType {
    DamageOther,
    WildDamage,
    Effect,
    Passive,
    HealSelf
}

export interface TileDataDetails {
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

export const TileData: { [key: number]: TileDataDetails } = {
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
        fgColor: COLOR_LIGHT_GROUND,
        bgColor: COLOR_LIGHT_GROUND,
        fgColorExplored: COLOR_DARK_GROUND,
        bgColorExplored: COLOR_DARK_GROUND,
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
        fgColor: COLOR_LIGHT_WALL,
        bgColor: COLOR_LIGHT_WALL,
        fgColorExplored: COLOR_DARK_WALL,
        bgColorExplored: COLOR_DARK_WALL,
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

export interface DamageAffinityMap {
    [DamageType.Physical]: Affinity;
    [DamageType.Fire]: Affinity;
    [DamageType.Electric]: Affinity;
    [DamageType.Water]: Affinity;
    [DamageType.Nature]: Affinity;
}

export interface InventoryPoolProbabilities {
    itemID: string;
    probability: number;
}

export interface ObjectDataDetails {
    name: Nullable<string>;
    char: Nullable<string>;
    bgColor: Nullable<string>;
    emptyColor: Nullable<string>;
    fgColor: Nullable<string>;
    blocks: boolean
    blocksSight: boolean;
    ai: Nullable<string>;
    removeAfterNTurns: Nullable<number>;
    input: Nullable<string>;
    inventory: Nullable<string>;
    fighter: Nullable<string>;
    graphics: Nullable<string>;
    interactable: Nullable<string>;
    lighting: Nullable<string>;
    lightingColor: Nullable<string>;
    lightingRange: Nullable<number>;
    trigger: Nullable<string>;
    triggerValue: Nullable<any>;
    level: Nullable<number>;
    experience: Nullable<number>;
    experienceGiven: Nullable<number>;
    sightRange: Nullable<number>;
    maxTilesPerMove: Nullable<number>;
    loseTrackAfterNTurns: Nullable<number>;
    speed: Nullable<number>;
    maxHp: Nullable<number>;
    maxMana: Nullable<number>;
    strength: Nullable<number>;
    defense: Nullable<number>;
    onDeath: Nullable<DeathType>;
    damageAffinity: Nullable<DamageAffinityMap>;
    inventoryPool: Nullable<InventoryPoolProbabilities[]>;
    actions: Nullable<string[]>;
    spells: Nullable<string[]>;
}

export const ObjectData: { [key: string]: ObjectDataDetails } = {
    "door": {
        name: "Door",
        blocks: true,
        blocksSight: true,
        char: "\u1882",
        fgColor: "white",
        bgColor: "brown",
        graphics: "basic_graphics",
        ai: null,
        removeAfterNTurns: null,
        inventory: null,
        fighter: null,
        input: null,
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        interactable: "door_interactable",
        emptyColor: null,
        trigger: null,
        triggerValue: null,
        level: null,
        experience: null,
        experienceGiven: null,
        sightRange: null,
        maxTilesPerMove: null,
        loseTrackAfterNTurns: null,
        speed: null,
        maxHp: null,
        maxMana: null,
        strength: null,
        defense: null,
        onDeath: null,
        damageAffinity: null,
        inventoryPool: null,
        actions: null,
        spells: null
    },
    "load_door": {
        name: "Door to new area",
        blocks: true,
        blocksSight: true,
        char: "\u1882",
        fgColor: "white",
        bgColor: "black",
        emptyColor: null,
        graphics: "draw_after_seen",
        ai: null,
        removeAfterNTurns: null,
        inventory: null,
        fighter: null,
        interactable: "load_level_interactable",
        input: null,
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        trigger: null,
        triggerValue: null,
        level: null,
        experience: null,
        experienceGiven: null,
        sightRange: null,
        maxTilesPerMove: null,
        loseTrackAfterNTurns: null,
        speed: null,
        maxHp: null,
        maxMana: null,
        strength: null,
        defense: null,
        onDeath: null,
        damageAffinity: null,
        inventoryPool: null,
        actions: null,
        spells: null
    },
    "stairs": {
        name: "Stairs",
        char: "\u1750",
        fgColor: "white",
        bgColor: "black",
        emptyColor: null,
        blocks: true,
        blocksSight: false,
        graphics: "draw_after_seen",
        ai: null,
        removeAfterNTurns: null,
        inventory: null,
        fighter: null,
        interactable: "load_level_interactable",
        input: null,
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        trigger: null,
        triggerValue: null,
        level: null,
        experience: null,
        experienceGiven: null,
        sightRange: null,
        maxTilesPerMove: null,
        loseTrackAfterNTurns: null,
        speed: null,
        maxHp: null,
        maxMana: null,
        strength: null,
        defense: null,
        onDeath: null,
        damageAffinity: null,
        inventoryPool: null,
        actions: null,
        spells: null
    },
    "chest": {
        name: "Chest",
        char: "*",
        fgColor: "white",
        bgColor: "brown",
        emptyColor: "purple",
        blocks: true,
        blocksSight: false,
        graphics: "draw_after_seen",
        ai: "chest_ai",
        removeAfterNTurns: null,
        fighter: null,
        inventory: "basic_inventory",
        interactable: "give_items_interactable",
        input: null,
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        trigger: null,
        triggerValue: null,
        level: null,
        experience: null,
        experienceGiven: null,
        sightRange: null,
        maxTilesPerMove: null,
        loseTrackAfterNTurns: null,
        speed: null,
        maxHp: null,
        maxMana: null,
        strength: null,
        defense: null,
        onDeath: null,
        damageAffinity: null,
        inventoryPool: null,
        actions: null,
        spells: null
    },
    "crate": {
        name: "Wooden Crate",
        char: "\u2612",
        fgColor: "white",
        bgColor: "brown",
        emptyColor: "purple",
        blocks: true,
        blocksSight: false,
        graphics: "basic_graphics",
        ai: null,
        removeAfterNTurns: null,
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        experience: 0,
        experienceGiven: 0,
        maxHp: 5,
        strength: 0,
        defense: 0,
        onDeath: DeathType.RemoveFromWorld,
        damageAffinity: {
            [DamageType.Physical]: Affinity.normal,
            [DamageType.Fire]: Affinity.weak,
            [DamageType.Electric]: Affinity.normal,
            [DamageType.Water]: Affinity.normal,
            [DamageType.Nature]: Affinity.normal
        },
        inventory: "basic_inventory",
        input: null,
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        trigger: null,
        triggerValue: null,
        level: null,
        sightRange: null,
        maxTilesPerMove: null,
        loseTrackAfterNTurns: null,
        maxMana: null,
        inventoryPool: null,
        actions: null,
        spells: null,
        interactable: null
    },
    "barrel": {
        name: "Wooden Barrel",
        blocks: true,
        blocksSight: false,
        char: "\u232D",
        fgColor: "white",
        bgColor: "brown",
        emptyColor: "purple",
        graphics: "basic_graphics",
        ai: null,
        removeAfterNTurns: null,
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        inventory: "basic_inventory",
        interactable: null,
        experience: 0,
        experienceGiven: 0,
        maxHp: 3,
        strength: 0,
        defense: 0,
        onDeath: DeathType.RemoveFromWorld,
        damageAffinity: {
            [DamageType.Physical]: Affinity.normal,
            [DamageType.Fire]: Affinity.weak,
            [DamageType.Electric]: Affinity.normal,
            [DamageType.Water]: Affinity.normal,
            [DamageType.Nature]: Affinity.normal
        },
        input: null,
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        trigger: null,
        triggerValue: null,
        level: null,
        sightRange: null,
        maxTilesPerMove: null,
        loseTrackAfterNTurns: null,
        maxMana: null,
        inventoryPool: null,
        actions: null,
        spells: null
    },
    "dead_body": {
        name: "Dead Body",
        char: "%",
        fgColor: "black",
        bgColor: "red",
        emptyColor: null,
        blocks: false,
        blocksSight: false,
        graphics: "basic_graphics",
        ai: null,
        removeAfterNTurns: null,
        fighter: null,
        inventory: null,
        interactable: null,
        input: null,
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        trigger: null,
        triggerValue: null,
        level: null,
        experience: null,
        experienceGiven: null,
        sightRange: null,
        maxTilesPerMove: null,
        loseTrackAfterNTurns: null,
        speed: null,
        maxHp: null,
        maxMana: null,
        strength: null,
        defense: null,
        onDeath: null,
        damageAffinity: null,
        inventoryPool: null,
        actions: null,
        spells: null
    },
    "lantern": {
        name: "Small Lantern",
        char: "\u16E1",
        fgColor: "black",
        bgColor: "yellow",
        emptyColor: null,
        blocks: true,
        blocksSight: false,
        graphics: "basic_graphics",
        lighting: "reflectivity",
        lightingColor: "yellow",
        lightingRange: 4,
        ai: null,
        removeAfterNTurns: null,
        fighter: null,
        level: null,
        experience: null,
        experienceGiven: null,
        speed: null,
        maxHp: null,
        maxMana: null,
        strength: null,
        defense: null,
        onDeath: null,
        damageAffinity: null,
        inventoryPool: null,
        inventory: null,
        interactable: null,
        input: null,
        trigger: null,
        triggerValue: null,
        sightRange: null,
        maxTilesPerMove: null,
        loseTrackAfterNTurns: null,
        actions: null,
        spells: null
    },
    "campfire": {
        name: "Small Fire",
        char: "\u0436",
        fgColor: "black",
        bgColor: "orange",
        emptyColor: null,
        blocks: false,
        blocksSight: false,
        graphics: "basic_graphics",
        lighting: "reflectivity",
        lightingColor: "orange",
        lightingRange: 6,
        ai: null,
        removeAfterNTurns: null,
        loseTrackAfterNTurns: null,
        actions: null,
        spells: null,
        sightRange: null,
        maxTilesPerMove: null,
        fighter: null,
        level: null,
        experience: null,
        experienceGiven: null,
        speed: null,
        maxHp: null,
        maxMana: null,
        strength: null,
        defense: null,
        onDeath: null,
        damageAffinity: null,
        inventoryPool: null,
        inventory: null,
        interactable: null,
        input: null,
        trigger: "fire",
        triggerValue: 10,
    },
    "fire_effect": {
        name: "Fire",
        char: "\u0436",
        fgColor: "black",
        bgColor: "orange",
        emptyColor: null,
        blocks: false,
        blocksSight: false,
        graphics: "basic_graphics",
        lighting: "reflectivity",
        lightingColor: "orange",
        lightingRange: 4,
        ai: "remove_after_n_turns",
        removeAfterNTurns: 5,
        loseTrackAfterNTurns: null,
        actions: null,
        spells: null,
        sightRange: null,
        maxTilesPerMove: null,
        fighter: null,
        level: null,
        experience: null,
        experienceGiven: null,
        speed: null,
        maxHp: null,
        maxMana: null,
        strength: null,
        defense: null,
        onDeath: null,
        damageAffinity: null,
        inventoryPool: null,
        inventory: null,
        interactable: null,
        input: null,
        trigger: "fire",
        triggerValue: 10,
    },
    "ice_wall": {
        name: "Ice Wall",
        char: "\u2042",
        fgColor: "black",
        bgColor: "lightblue",
        emptyColor: null,
        blocks: true,
        blocksSight: true,
        graphics: "basic_graphics",
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        ai: null,
        removeAfterNTurns: null,
        loseTrackAfterNTurns: null,
        actions: null,
        spells: null,
        sightRange: null,
        maxTilesPerMove: null,
        fighter: "basic_fighter",
        level: 1,
        experience: 0,
        experienceGiven: 0,
        speed: BASE_SPEED,
        maxHp: 10,
        maxMana: 0,
        strength: null,
        defense: 0,
        onDeath: DeathType.RemoveFromWorld,
        damageAffinity: {
            [DamageType.Physical]: Affinity.normal,
            [DamageType.Fire]: Affinity.weak,
            [DamageType.Electric]: Affinity.normal,
            [DamageType.Water]: Affinity.nullified,
            [DamageType.Nature]: Affinity.normal
        },
        inventoryPool: [],
        inventory: null,
        interactable: null,
        input: null,
        trigger: "fire",
        triggerValue: 10,
    },
    "dropped_item": {
        name: "Dropped Item",
        char: "!",
        fgColor: "white",
        bgColor: "brown",
        emptyColor: null,
        blocks: false,
        blocksSight: false,
        graphics: "basic_graphics",
        input: null,
        ai: "dropped_item_ai",
        removeAfterNTurns: null,
        loseTrackAfterNTurns: null,
        actions: null,
        spells: null,
        sightRange: null,
        maxTilesPerMove: null,
        inventory: null,
        fighter: null,
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        level: null,
        experience: null,
        experienceGiven: null,
        speed: null,
        maxHp: null,
        maxMana: null,
        strength: null,
        defense: null,
        onDeath: null,
        damageAffinity: null,
        inventoryPool: null,
        interactable: "give_items_interactable",
        trigger: null,
        triggerValue: null
    },
    "magic_shrine": {
        name: "Magicka Shrine",
        char: "\u06DE",
        fgColor: "black",
        bgColor: "gold",
        emptyColor: null,
        blocks: true,
        blocksSight: false,
        graphics: "basic_graphics",
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        inventory: null,
        input: null,
        ai: null,
        removeAfterNTurns: null,
        loseTrackAfterNTurns: null,
        actions: null,
        spells: null,
        sightRange: null,
        maxTilesPerMove: null,
        fighter: null,
        level: null,
        experience: null,
        experienceGiven: null,
        speed: null,
        maxHp: null,
        maxMana: null,
        strength: null,
        defense: null,
        onDeath: null,
        damageAffinity: null,
        inventoryPool: null,
        interactable: "give_spell_interactable",
        trigger: null,
        triggerValue: null
    },
    "event_trigger": {
        name: null,
        graphics: null,
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        ai: null,
        removeAfterNTurns: null,
        sightRange: null,
        loseTrackAfterNTurns: null,
        spells: null,
        actions: null,
        input: null,
        inventory: null,
        fighter: null,
        speed: BASE_SPEED,
        maxTilesPerMove: null,
        interactable: null,
        char: null,
        fgColor: null,
        bgColor: null,
        emptyColor: null,
        blocks: false,
        blocksSight: false,
        level: null,
        experience: null,
        experienceGiven: null,
        maxHp: null,
        maxMana: null,
        strength: null,
        defense: null,
        damageAffinity: null,
        onDeath: null,
        inventoryPool: null,
        trigger: "event",
        triggerValue: null
    },
    "player": {
        name: "The Player",
        graphics: "player_graphics",
        lighting: "player_lighting",
        lightingColor: "white",
        lightingRange: 7,
        ai: null,
        removeAfterNTurns: null,
        sightRange: null,
        loseTrackAfterNTurns: null,
        spells: null,
        actions: null,
        input: "player_input",
        inventory: "basic_inventory",
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        maxTilesPerMove: 7,
        interactable: null,
        char: "@",
        fgColor: "blue",
        bgColor: null,
        emptyColor: null,
        blocks: true,
        blocksSight: false,
        level: 1,
        experience: 0,
        experienceGiven: 0,
        maxHp: 100,
        maxMana: 100,
        strength: 3,
        defense: 1,
        damageAffinity: {
            [DamageType.Physical]: Affinity.normal,
            [DamageType.Fire]: Affinity.normal,
            [DamageType.Electric]: Affinity.normal,
            [DamageType.Water]: Affinity.normal,
            [DamageType.Nature]: Affinity.normal
        },
        onDeath: DeathType.Default,
        inventoryPool: null,
        trigger: null,
        triggerValue: null
    },
    "goblin": {
        name: "Goblin",
        char: "G",
        fgColor: "green",
        bgColor: null,
        emptyColor: null,
        graphics: "transparency_graphics",
        ai: "planning_ai",
        removeAfterNTurns: null,
        sightRange: 10,
        loseTrackAfterNTurns: 6,
        maxTilesPerMove: 5,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack"
        ],
        spells: null,
        input: null,
        lighting: null,
        lightingColor: null,
        lightingRange: null,
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        inventory: "basic_inventory",
        interactable: null,
        blocks: true,
        blocksSight: false,
        level: 3,
        experience: 0,
        experienceGiven: 50,
        maxHp: 30,
        maxMana: 0,
        strength: 3,
        defense: 1,
        damageAffinity: {
            [DamageType.Physical]: Affinity.normal,
            [DamageType.Fire]: Affinity.normal,
            [DamageType.Electric]: Affinity.normal,
            [DamageType.Water]: Affinity.normal,
            [DamageType.Nature]: Affinity.normal
        },
        inventoryPool: [
            {
                itemID: "health_potion_weak",
                probability: 0.25
            }
        ],
        onDeath: DeathType.Default,
        trigger: null,
        triggerValue: null
    },
    "goblin_brute": {
        name: "Goblin Brute",
        blocks: true,
        blocksSight: false,
        char: "G",
        fgColor: "green",
        bgColor: "red",
        emptyColor: null,
        graphics: "basic_graphics",
        ai: "planning_ai",
        removeAfterNTurns: null,
        sightRange: 10,
        maxTilesPerMove: 5,
        loseTrackAfterNTurns: 6,
        actions: [
            "guard",
            "chase",
            "useHealingItem",
            "goToEnemy",
            "reposition",
            "meleeAttack"
        ],
        spells: null,
        input: null,
        fighter: "basic_fighter",
        level: 10,
        experience: 0,
        experienceGiven: 500,
        maxHp: 100,
        maxMana: 0,
        strength: 7,
        defense: 4,
        speed: BASE_SPEED,
        damageAffinity: {
            [DamageType.Physical]: Affinity.normal,
            [DamageType.Fire]: Affinity.normal,
            [DamageType.Electric]: Affinity.normal,
            [DamageType.Water]: Affinity.normal,
            [DamageType.Nature]: Affinity.normal
        },
        inventoryPool: [
            {
                itemID: "health_potion_weak",
                probability: 0.25
            },
            {
                itemID: "health_potion",
                probability: 0.1
            }
        ],
        onDeath: DeathType.Default,
        inventory: "basic_inventory",
        interactable: null,
        lighting: null,
        lightingRange: null,
        lightingColor: null,
        trigger: null,
        triggerValue: null
    },
    "rat": {
        name: "Rat",
        graphics: "transparency_graphics",
        char: "r",
        fgColor: "brown",
        bgColor: null,
        emptyColor: null,
        input: null,
        ai: "planning_ai",
        removeAfterNTurns: null,
        sightRange: 9,
        maxTilesPerMove: 4,
        loseTrackAfterNTurns: 6,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack"
        ],
        spells: null,
        fighter: "basic_fighter",
        level: 1,
        experience: 0,
        experienceGiven: 10,
        maxHp: 10,
        maxMana: 0,
        strength: 2,
        defense: 1,
        speed: BASE_SPEED,
        inventory: "basic_inventory",
        interactable: null,
        blocks: true,
        blocksSight: false,
        damageAffinity: {
            [DamageType.Physical]: Affinity.normal,
            [DamageType.Fire]: Affinity.normal,
            [DamageType.Electric]: Affinity.normal,
            [DamageType.Water]: Affinity.normal,
            [DamageType.Nature]: Affinity.normal
        },
        inventoryPool: [],
        onDeath: DeathType.Default,
        lighting: null,
        lightingRange: null,
        lightingColor: null,
        trigger: null,
        triggerValue: null
    },
    "water_sprite": {
        name: "Water Sprite",
        graphics: "basic_graphics",
        char: "s",
        fgColor: "white",
        bgColor: "blue",
        emptyColor: null,
        input: null,
        ai: "planning_ai",
        removeAfterNTurns: null,
        sightRange: 9,
        maxTilesPerMove: 7,
        loseTrackAfterNTurns: 6,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack"
        ],
        spells: null,
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        inventory: "basic_inventory",
        interactable: null,
        blocks: true,
        blocksSight: false,
        level: 1,
        experience: 0,
        experienceGiven: 10,
        maxHp: 10,
        maxMana: 0,
        strength: 2,
        defense: 1,
        damageAffinity: {
            [DamageType.Physical]: Affinity.normal,
            [DamageType.Fire]: Affinity.strong,
            [DamageType.Electric]: Affinity.weak,
            [DamageType.Water]: Affinity.nullified,
            [DamageType.Nature]: Affinity.normal
        },
        inventoryPool: [],
        onDeath: DeathType.Default,
        lighting: null,
        lightingRange: null,
        lightingColor: null,
        trigger: null,
        triggerValue: null
    },
    "bandit": {
        name: "Bandit",
        blocks: true,
        blocksSight: false,
        graphics: "basic_graphics",
        char: "b",
        fgColor: "white",
        bgColor: "brown",
        emptyColor: null,
        input: null,
        ai: "planning_ai",
        removeAfterNTurns: null,
        sightRange: 10,
        maxTilesPerMove: 5,
        loseTrackAfterNTurns: 6,
        actions: [
            "guard",
            "chase",
            "useHealingItem",
            "goToEnemy",
            "reposition",
            "runAway",
            "cower",
            "meleeAttack"
        ],
        spells: null,
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        inventory: "basic_inventory",
        interactable: null,
        level: 1,
        experience: 0,
        experienceGiven: 10,
        maxHp: 30,
        maxMana: 0,
        strength: 2,
        defense: 1,
        damageAffinity: {
            [DamageType.Physical]: Affinity.normal,
            [DamageType.Fire]: Affinity.normal,
            [DamageType.Electric]: Affinity.normal,
            [DamageType.Water]: Affinity.normal,
            [DamageType.Nature]: Affinity.normal
        },
        inventoryPool: [
            {
                itemID: "health_potion_weak",
                probability: 0.25
            }
        ],
        onDeath: DeathType.Default,
        lighting: null,
        lightingRange: null,
        lightingColor: null,
        trigger: null,
        triggerValue: null
    },
    "bandit_mage": {
        name: "Bandit Mage",
        graphics: "basic_graphics",
        char: "b",
        fgColor: "white",
        bgColor: "blue",
        emptyColor: null,
        input: null,
        ai: "planning_ai",
        removeAfterNTurns: null,
        sightRange: 8,
        maxTilesPerMove: 5,
        loseTrackAfterNTurns: 6,
        spells: [
            "fireball",
            "lesser_heal"
        ],
        actions: [
            "wander",
            "chase",
            "useHealingItem",
            "useManaItem",
            "goToEnemy",
            "reposition",
            "runAway",
            "cower",
            "meleeAttack"
        ],
        fighter: "basic_fighter",
        level: 5,
        experience: 0,
        experienceGiven: 100,
        maxHp: 30,
        maxMana: 100,
        strength: 2,
        defense: 1,
        speed: BASE_SPEED,
        damageAffinity: {
            [DamageType.Physical]: Affinity.normal,
            [DamageType.Fire]: Affinity.normal,
            [DamageType.Electric]: Affinity.normal,
            [DamageType.Water]: Affinity.normal,
            [DamageType.Nature]: Affinity.normal
        },
        inventory: "basic_inventory",
        interactable: null,
        blocks: true,
        blocksSight: false,
        inventoryPool: [],
        onDeath: DeathType.Default,
        lighting: null,
        lightingRange: null,
        lightingColor: null,
        trigger: null,
        triggerValue: null
    }
};

interface Area {
    width: number;
    height: number;
}

export interface ItemDataDetails {
    displayName: string,
    type: ItemType,
    value: Nullable<number>,
    damageType: Nullable<DamageType>;
    statusEffectFunc: Nullable<any>;
    areaOfEffect: Nullable<Area>;

    useFunc: SkillFunction;
}

export const ItemData: { [key: string]: ItemDataDetails } = {
    "health_potion_weak": {
        displayName: "Weak Potion of Healing",
        value: 25,
        type: ItemType.HealSelf,
        damageType: null,
        areaOfEffect: null,
        useFunc: castHeal,
        statusEffectFunc: null
    },
    "health_potion": {
        displayName: "Potion of Healing",
        value: 50,
        type: ItemType.HealSelf,
        damageType: null,
        areaOfEffect: null,
        useFunc: castHeal,
        statusEffectFunc: null
    },
    "health_potion_strong": {
        displayName: "Strong Potion of Healing",
        value: 100,
        type: ItemType.HealSelf,
        damageType: null,
        areaOfEffect: null,
        useFunc: castHeal,
        statusEffectFunc: null
    },
    "mana_potion_weak": {
        displayName: "Weak Potion of Mana",
        value: 25,
        type: ItemType.AddManaSelf,
        damageType: null,
        areaOfEffect: null,
        useFunc: castIncreaseMana,
        statusEffectFunc: null
    },
    "lightning_scroll_weak": {
        displayName: "Weak Scroll of Lightning",
        value: 20,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        areaOfEffect: null,
        useFunc: castDamageSpell,
        statusEffectFunc: null
    },
    "lightning_scroll": {
        displayName: "Scroll of Lightning",
        value: 50,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        areaOfEffect: null,
        useFunc: castDamageSpell,
        statusEffectFunc: null
    },
    "lightning_scroll_strong": {
        displayName: "Strong Scroll of Lightning",
        value: 100,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        areaOfEffect: null,
        useFunc: castDamageSpell,
        statusEffectFunc: null
    },
    "fireball_scroll_weak": {
        displayName: "Weak Scroll of Fire",
        value: 20,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        areaOfEffect: null,
        useFunc: castDamageSpell,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll": {
        displayName: "Scroll of Fire",
        value: 50,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        areaOfEffect: null,
        useFunc: castDamageSpell,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll_strong": {
        displayName: "Strong Scroll of Fire",
        value: 100,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        areaOfEffect: null,
        useFunc: castDamageSpell,
        statusEffectFunc: createBurnEffect
    },
    "lightning_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Lightning",
        value: 50,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        areaOfEffect: null,
        useFunc: castWildDamageSpell,
        statusEffectFunc: null
    },
    "lightning_scroll_wild": {
        displayName: "Scroll of Wild Lightning",
        value: 100,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        areaOfEffect: null,
        useFunc: castWildDamageSpell,
        statusEffectFunc: null
    },
    "lightning_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Lightning",
        value: 150,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        areaOfEffect: null,
        useFunc: castWildDamageSpell,
        statusEffectFunc: null
    },
    "fireball_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Fire",
        value: 50,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        areaOfEffect: null,
        useFunc: castWildDamageSpell,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll_wild": {
        displayName: "Scroll of Wild Fire",
        value: 100,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        areaOfEffect: null,
        useFunc: castWildDamageSpell,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Fire",
        value: 150,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        areaOfEffect: null,
        useFunc: castWildDamageSpell,
        statusEffectFunc: createBurnEffect
    },
    "confuse_scroll": {
        displayName: "Scroll of Confuse Enemy",
        value: 8,
        type: ItemType.ConfuseScroll,
        damageType: null,
        areaOfEffect: null,
        useFunc: castConfuse,
        statusEffectFunc: null
    },
    "clairvoyance_scroll": {
        displayName: "Scroll of Clairvoyance",
        value: null,
        type: ItemType.ClairvoyanceScroll,
        damageType: null,
        areaOfEffect: null,
        useFunc: castClairvoyance,
        statusEffectFunc: null
    },
    "haste_potion_weak": {
        displayName: "Weak Potion of Haste",
        value: 5,
        type: ItemType.HasteSelf,
        damageType: null,
        areaOfEffect: null,
        useFunc: castHaste,
        statusEffectFunc: null
    },
    "slow_poison_weak": {
        displayName: "Weak Poison of Slow",
        value: 5,
        type: ItemType.SlowOther,
        damageType: null,
        areaOfEffect: null,
        useFunc: castSlow,
        statusEffectFunc: null
    }
};

export interface SpellDataDetails {
    id: string;
    displayName: string;
    manaCost: number;
    type: SpellType;
    value: Nullable<number>;
    damageType: Nullable<DamageType>;
    statusEffectFunc?: any;
    areaOfEffect: Nullable<Area>;

    useFunc: SkillFunction;
}

/**
 * Defines all the properties of a spell: the name, mana cost,
 * damage values, damage type, and the function to execute.
 */
export const SpellData: { [key: string]: SpellDataDetails } = {
    "lightning_bolt": {
        id: "lightning_bolt",
        displayName: "Lightning Bolt",
        manaCost: 10,
        value: 20,
        type: SpellType.DamageOther,
        damageType: DamageType.Electric,
        areaOfEffect: null,
        useFunc: castDamageSpell
    },
    "wild_lightning_bolt": {
        id: "wild_lightning_bolt",
        displayName: "Wild Lightning Bolt",
        manaCost: 10,
        value: 30,
        type: SpellType.WildDamage,
        damageType: DamageType.Electric,
        areaOfEffect: null,
        useFunc: castWildDamageSpell
    },
    "fireball": {
        id: "fireball",
        displayName: "Fireball",
        manaCost: 50,
        value: 20,
        type: SpellType.DamageOther,
        damageType: DamageType.Fire,
        areaOfEffect: null,
        useFunc: castDamageSpell,
        statusEffectFunc: createBurnEffect
    },
    "wild_fireball": {
        id: "wild_fireball",
        displayName: "Wild Fireball",
        manaCost: 10,
        value: 30,
        type: SpellType.WildDamage,
        damageType: DamageType.Fire,
        areaOfEffect: null,
        useFunc: castWildDamageSpell
    },
    "confuse": {
        id: "confuse",
        displayName: "Confuse",
        manaCost: 20,
        value: 8,
        type: SpellType.DamageOther,
        damageType: null,
        areaOfEffect: null,
        useFunc: castConfuse
    },
    "clairvoyance": {
        id: "clairvoyance",
        displayName: "Clairvoyance",
        manaCost: 20,
        value: null,
        type: SpellType.Passive,
        damageType: null,
        areaOfEffect: null,
        useFunc: castClairvoyance
    },
    "lesser_heal": {
        id: "lesser_heal",
        displayName: "Lesser Heal",
        manaCost: 10,
        value: 25,
        type: SpellType.HealSelf,
        damageType: null,
        areaOfEffect: null,
        useFunc: castHeal
    },
    "heal": {
        id: "heal",
        displayName: "Heal",
        manaCost: 30,
        value: 50,
        type: SpellType.HealSelf,
        damageType: null,
        areaOfEffect: null,
        useFunc: castHeal
    },
    "greater_heal": {
        id: "greater_heal",
        displayName: "Greater Heal",
        manaCost: 50,
        value: 100,
        type: SpellType.HealSelf,
        damageType: null,
        areaOfEffect: null,
        useFunc: castHeal
    },
    "lesser_haste": {
        id: "lesser_haste",
        displayName: "Lesser Haste",
        manaCost: 30,
        value: 10,
        type: SpellType.Effect,
        damageType: null,
        areaOfEffect: null,
        useFunc: castHaste
    },
    "lesser_slow": {
        id: "lesser_slow",
        displayName: "Lesser Slow",
        manaCost: 30,
        value: 10,
        type: SpellType.DamageOther,
        damageType: null,
        areaOfEffect: null,
        useFunc: castSlow
    },
    "fire_wall": {
        id: "fire_wall",
        displayName: "Wall of Fire",
        manaCost: 30,
        value: 10,
        type: SpellType.DamageOther,
        damageType: DamageType.Fire,
        areaOfEffect: {
            width: 1,
            height: 6
        },
        useFunc: castFireWall
    },
    "ice_wall": {
        id: "ice_wall",
        displayName: "Wall of Ice",
        manaCost: 30,
        value: null,
        type: SpellType.DamageOther,
        damageType: null,
        areaOfEffect: {
            width: 1,
            height: 6
        },
        useFunc: castIceWall
    }
};

export interface GoalDataDetails {
    resolver: (ai: AIComponent) => boolean
}

/**
 * A set of world state variables and the functions used
 * to determine if they're true. Used in the planner.
 */
export const GoalData: { [key: string]: GoalDataDetails } = {
    "targetPositionKnown": {
        resolver: resolveTargetPositionKnown
    },
    "targetInLineOfSight": {
        resolver: resolveTargetInLOS
    },
    "nextToTarget": {
        resolver: resolveNextToTarget
    },
    "lowMana": {
        resolver: resolveLowMana
    },
    "lowHealth": {
        resolver: resolveLowHealth
    },
    "hasArrows": {
        resolver: resolveHasArrows
    },
    "hasManaItem": {
        resolver: resolveHasManaItem
    },
    "hasHealingItem": {
        resolver: resolveHasHealingItem
    },
    "inDangerousArea": {
        resolver: resolveInDangerousArea
    },
    "targetKilled": {
        resolver: resolveTargetKilled
    },
    "afraid": {
        resolver: resolveAfraid
    },
    "cowering": {
        resolver: resolveCowering
    },
    "atFallbackPosition": {
        resolver: resolveAtFallbackPosition
    }
};

export interface Action {
    preconditions: { [key: string]: boolean },
    postconditions: { [key: string]: boolean }
    updateFunction: (
        ai: AIComponent,
        map: any,
        gameObjects: GameObject[],
        pathNodes: Map<number, PathNode>
    ) => Command,
    weight: (ai: AIComponent) => number
}

/**
 * Action data by the action's name. An action is something which
 * satisfies goal, thereby changing the world state. Defines
 * which state variables are changed, the function to perform the
 * action, and the cost (weight) of the action.
 */
export const ActionData: { [key: string]: Action } = {
    "wander": {
        preconditions: { targetPositionKnown: false },
        postconditions: { targetPositionKnown: true },
        updateFunction: wanderAction,
        weight: () => 1
    },
    "guard": {
        preconditions: { targetPositionKnown: false },
        postconditions: { targetPositionKnown: true },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: () => 1
    },
    "patrol": {
        preconditions: { targetPositionKnown: false },
        postconditions: { targetPositionKnown: true },
        updateFunction: patrolAction,
        weight: () => 1
    },
    "chase": {
        preconditions: { targetPositionKnown: true, targetInLineOfSight: false },
        postconditions: { targetInLineOfSight: true },
        updateFunction: chaseAction,
        weight: () => 1
    },
    "useManaItem": {
        preconditions: { lowMana: true, hasManaItem: true },
        postconditions: { lowMana: false },
        updateFunction: useManaItemAction,
        weight: () => 1
    },
    "useHealingItem": {
        preconditions: { lowHealth: true, hasHealingItem: true },
        postconditions: { lowHealth: false },
        updateFunction: useHealingItemAction,
        weight: () => 1
    },
    "goToEnemy": {
        preconditions: { targetPositionKnown: true, nextToTarget: false },
        postconditions: { nextToTarget: true },
        updateFunction: chaseAction,
        weight: chaseWeight
    },
    "meleeAttack": {
        preconditions: { nextToTarget: true, targetKilled: false },
        postconditions: { targetKilled: true },
        updateFunction: meleeAttackAction,
        weight: () => 1
    },
    "reposition": {
        preconditions: { inDangerousArea: true },
        postconditions: { inDangerousArea: false },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: () => 1
    },
    "runAway": {
        preconditions: { afraid: true },
        postconditions: { afraid: false },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: () => 1
    },
    "cower": {
        preconditions: { afraid: false, cowering: false },
        postconditions: { cowering: true },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: () => 1
    },
    "goToFallbackPosition": {
        preconditions: { atFallbackPosition: false },
        postconditions: { atFallbackPosition: true },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: () => 1
    }
};

// Dynamically add spells to goals and actions
for (const key in SpellData) {
    const data: SpellDataDetails = SpellData[key];
    // capitalize the first letter
    const goal = `enoughManaFor_${key}`;
    const action = `castSpell_${key}`;
    if (data.type === SpellType.DamageOther) {
        GoalData[goal] = {
            resolver: resolveEnoughManaForSpellGenerator(key)
        };
        ActionData[action] = {
            preconditions: {
                [goal]: true,
                targetInLineOfSight: true,
                targetKilled: false
            },
            postconditions: { targetKilled: true },
            updateFunction: castSpellAction(key),
            weight: () => 1
        };
    } else if (data.type === SpellType.HealSelf) {
        GoalData[goal] = {
            resolver: resolveEnoughManaForSpellGenerator(key)
        };
        ActionData[action] = {
            preconditions: { lowHealth: true, [goal]: true },
            postconditions: { lowHealth: false },
            updateFunction: castSpellAction(key),
            weight: () => 1
        };
    }
}
for (const objectID in ObjectData) {
    const data = ObjectData[objectID];
    if (data.spells !== null && data.actions !== null) {
        for (let i = 0; i < data.spells.length; i++) {
            const spell = data.spells[i];
            data.actions.push(`castSpell_${spell}`);
        }
    }
}

export const LevelData: { [key: string]: any } = {
    forrest_001,
    durdwin_001,
    dev_room
};

export type LevelName = keyof typeof LevelData;
