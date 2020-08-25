'use strict';

const WIDTH = 70;
const HEIGHT = 45;
const UI_HEIGHT = 6;
const WORLD_WIDTH = WIDTH;
const WORLD_HEIGHT = HEIGHT - UI_HEIGHT - 1;

const COLOR_INVISIBLE_WALL = "black";
const COLOR_DARK_WALL = "rgb(20, 20, 20)";
const COLOR_LIGHT_WALL = "#352620";
const COLOR_INVISIBLE_GROUND = "black";
const COLOR_DARK_GROUND = "rgb(50, 50, 50)";
const COLOR_LIGHT_GROUND = "white";
const COLOR_AMBIENT_LIGHT = "rgb(50, 50, 50)";

const MAP_FILLED_SPACE = "#";
const MAP_EMPTY_SPACE = ".";

const LEVEL_UP_BASE = 50;
const LEVEL_UP_FACTOR = 150;

/**
 * Damage type enum
 */
const DamageType = {
    physical: 1,
    fire: 2,
    lightning: 3,
    ice: 4,
    nature: 5
};
Object.freeze(DamageType);

/**
 * Damage affinity damage multiplier
 */
const Affinity = {
    weak: 0.5,
    normal: 1,
    strong: 2,
    nullified: 0
};
Object.freeze(Affinity);

const objectData = {
    "stairs": {
        name: "Stairs",
        graphics: "draw_after_seen",
        ai: null,
        inventory: null,
        fighter: null,
        interactable: "load_level_interactable",
        char: ">",
        fgColor: "white",
        bgColor: "black",
        blocks: true
    },
    "chest": {
        name: "Chest",
        graphics: "draw_after_seen",
        ai: "chest_ai",
        fighter: null,
        inventory: "basic_inventory",
        interactable: "give_items_interactable",
        char: "*",
        fgColor: "white",
        bgColor: "brown",
        emptyColor: "purple",
        blocks: true
    },
    "crate": {
        name: "Wooden Crate",
        graphics: "draw_after_seen",
        ai: null,
        fighter: "basic_fighter",
        inventory: "basic_inventory",
        interactable: null,
        char: "c",
        fgColor: "white",
        bgColor: "brown",
        emptyColor: "purple",
        blocks: true,
        experience: 0,
        experienceGiven: 0,
        maxHp: 5,
        strength: 0,
        defense: 0,
    },
    "lantern": {
        name: "Small Lantern",
        graphics: "basic_graphics",
        lighting: "reflectivity",
        lightingColor: "yellow",
        lightingRange: 5,
        ai: null,
        fighter: null,
        inventory: null,
        interactable: null,
        char: "l",
        fgColor: "black",
        bgColor: "yellow",
        blocks: true
    },
    "campfire": {
        name: "Small Camp Fire",
        graphics: "basic_graphics",
        lighting: "reflectivity",
        lightingColor: "orange",
        lightingRange: 8,
        ai: null,
        fighter: null,
        inventory: null,
        interactable: null,
        char: "f",
        fgColor: "black",
        bgColor: "orange",
        blocks: true
    },
    "dropped_item": {
        name: "Dropped Item",
        graphics: "basic_graphics",
        ai: "dropped_item_ai",
        inventory: null,
        fighter: null,
        interactable: "give_items_interactable",
        char: "!",
        fgColor: "white",
        bgColor: "brown",
        blocks: false
    },
    "player": {
        name: "The Player",
        graphics: "basic_graphics",
        lighting: "player_lighting",
        lightingColor: "white",
        lightingRange: 7,
        ai: "player_control_ai",
        inventory: "basic_inventory",
        fighter: "basic_fighter",
        interactable: null,
        char: "@",
        fgColor: "blue",
        blocks: true,
        bgColor: "transparent",
        level: 1,
        experience: 0,
        experienceGiven: 0,
        maxHp: 100,
        strength: 3,
        defense: 1,
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.lightning]: Affinity.normal,
            [DamageType.ice]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        }
    },
    "goblin": {
        name: "Goblin",
        graphics: "basic_graphics",
        ai: "basic_monster_ai",
        fighter: "basic_fighter",
        inventory: "basic_inventory",
        interactable: null,
        char: "G",
        fgColor: "green",
        bgColor: "transparent",
        blocks: true,
        level: 3,
        experience: 0,
        experienceGiven: 50,
        maxHp: 30,
        strength: 3,
        defense: 1,
        sightRange: 7,
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.lightning]: Affinity.normal,
            [DamageType.ice]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
        inventoryPool: [
            ['health_potion_weak', 0.25]
        ]
    },
    "goblin_brute": {
        name: "Goblin Brute",
        graphics: "basic_graphics",
        ai: "patrolling_monster_ai",
        fighter: "basic_fighter",
        inventory: "basic_inventory",
        interactable: null,
        char: "G",
        fgColor: "green",
        bgColor: "red",
        blocks: true,
        level: 10,
        experience: 0,
        experienceGiven: 500,
        maxHp: 100,
        strength: 7, 
        defense: 4,
        sightRange: 7,
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.lightning]: Affinity.normal,
            [DamageType.ice]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
        inventoryPool: [
            ['health_potion_weak', 0.25],
            ['health_potion', 0.1]
        ]
    },
    "rat": {
        name: "Rat",
        graphics: "basic_graphics",
        ai: "basic_monster_ai",
        fighter: "basic_fighter",
        inventory: "basic_inventory",
        interactable: null,
        char: "R",
        fgColor: "brown",
        bgColor: "transparent",
        blocks: true,
        level: 1,
        experience: 0,
        experienceGiven: 10,
        maxHp: 10,
        strength: 2,
        defense: 1,
        sightRange: 7,
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.lightning]: Affinity.normal,
            [DamageType.ice]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
        inventoryPool: []
    },
};
Object.freeze(objectData);

const itemData = {
    "health_potion_weak": {
        displayName: "Weak Health Potion",
        value: 25,
        type: "health",
        useFunc: useHealthItem
    },
    "health_potion": {
        displayName: "Health Potion",
        value: 50,
        type: "health",
        useFunc: useHealthItem
    },
    "health_potion_strong": {
        displayName: "Health Potion",
        value: 100,
        type: "health",
        useFunc: useHealthItem
    },
    "lightning_scroll_weak": {
        displayName: "Weak Scroll of Lightning",
        value: 20,
        type: "damage_scroll",
        useFunc: useDamageScrollItem,
        damageType: DamageType.lightning
    },
    "lightning_scroll": {
        displayName: "Scroll of Lightning",
        value: 50,
        type: "damage_scroll",
        useFunc: useDamageScrollItem,
        damageType: DamageType.lightning
    },
    "lightning_scroll_strong": {
        displayName: "Strong Scroll of Lightning",
        value: 100,
        type: "damage_scroll",
        useFunc: useDamageScrollItem,
        damageType: DamageType.lightning
    },
    "fireball_scroll_weak": {
        displayName: "Weak Scroll of Fire",
        value: 20,
        type: "damage_scroll",
        useFunc: useDamageScrollItem,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll": {
        displayName: "Scroll of Fire",
        value: 50,
        type: "damage_scroll",
        useFunc: useDamageScrollItem,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll_strong": {
        displayName: "Strong Scroll of Fire",
        value: 100,
        type: "damage_scroll",
        useFunc: useDamageScrollItem,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "lightning_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Lightning",
        value: 50,
        type: "wild_damage_scroll",
        useFunc: useWildDamageScrollItem,
        damageType: DamageType.lightning
    },
    "lightning_scroll_wild": {
        displayName: "Scroll of Wild Lightning",
        value: 100,
        type: "wild_damage_scroll",
        useFunc: useWildDamageScrollItem,
        damageType: DamageType.lightning
    },
    "lightning_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Lightning",
        value: 150,
        type: "wild_damage_scroll",
        useFunc: useWildDamageScrollItem,
        damageType: DamageType.lightning
    },
    "fireball_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Fire",
        value: 50,
        type: "wild_damage_scroll",
        useFunc: useWildDamageScrollItem,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll_wild": {
        displayName: "Scroll of Wild Fire",
        value: 100,
        type: "wild_damage_scroll",
        useFunc: useWildDamageScrollItem,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Fire",
        value: 150,
        type: "wild_damage_scroll",
        useFunc: useWildDamageScrollItem,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "confuse_scroll": {
        displayName: "Scroll of Confuse Enemy",
        value: 8,
        type: "confuse_scroll",
        useFunc: useConfuseScrollItem
    },
    "clairvoyance_scroll": {
        displayName: "Scroll of Clairvoyance",
        type: "clairvoyance_scroll",
        useFunc: useClairvoyanceScrollItem
    }
};
Object.freeze(itemData);
