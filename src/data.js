"use strict";

import { castHeal, castConfuse, castClairvoyance, castDamageSpell, castWildDamageSpell } from "./items";
import { createBurnEffect } from "./effects";

export const WIDTH = 70;
export const HEIGHT = 45;
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
console.log("COLOR_AMBIENT_LIGHT", COLOR_AMBIENT_LIGHT);

export const MAP_FILLED_SPACE = "#";
export const MAP_EMPTY_SPACE = ".";

export const LEVEL_UP_BASE = 50;
export const LEVEL_UP_FACTOR = 150;

/**
 * Damage type enum
 */
export const DamageType = {
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
export const Affinity = {
    weak: 0.5,
    normal: 1,
    strong: 2,
    nullified: 0
};
Object.freeze(Affinity);

export const TileData = {
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
        fgColorExplored: COLOR_DARK_WALL,
        bgColorExplored: COLOR_DARK_WALL,
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2710: {
        name: "A table",
        char: "\u03A0",
        fgColor: "tan",
        bgColor: "brown",
        fgColorExplored: COLOR_DARK_WALL,
        bgColorExplored: COLOR_DARK_WALL,
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    2869: {
        name: "A chair",
        char: "\u043F",
        fgColor: "black",
        bgColor: "brown",
        fgColorExplored: COLOR_DARK_WALL,
        bgColorExplored: COLOR_DARK_WALL,
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    2936: {
        name: "A cabinet",
        char: "\u2339",
        fgColor: "black",
        bgColor: "brown",
        fgColorExplored: COLOR_DARK_WALL,
        bgColorExplored: COLOR_DARK_WALL,
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    }
};
Object.freeze(TileData);

export const ObjectData = {
    "door": {
        name: "Door",
        graphics: "basic_graphics",
        ai: null,
        inventory: null,
        fighter: null,
        interactable: "door_interactable",
        char: "\u1882",
        fgColor: "white",
        bgColor: "brown",
        blocks: true,
        blocksSight: true
    },
    "load_door": {
        name: "Door to new area",
        graphics: "draw_after_seen",
        ai: null,
        inventory: null,
        fighter: null,
        interactable: "load_level_interactable",
        char: "\u1882",
        fgColor: "white",
        bgColor: "black",
        blocks: true,
        blocksSight: true
    },
    "stairs": {
        name: "Stairs",
        graphics: "draw_after_seen",
        ai: null,
        inventory: null,
        fighter: null,
        interactable: "load_level_interactable",
        char: "\u1750",
        fgColor: "white",
        bgColor: "black",
        blocks: true,
        blocksSight: false
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
        blocks: true,
        blocksSight: false
    },
    "crate": {
        name: "Wooden Crate",
        graphics: "basic_graphics",
        ai: null,
        fighter: "basic_fighter",
        inventory: "basic_inventory",
        interactable: null,
        char: "\u2612",
        fgColor: "white",
        bgColor: "brown",
        emptyColor: "purple",
        blocks: true,
        blocksSight: false,
        experience: 0,
        experienceGiven: 0,
        maxHp: 5,
        strength: 0,
        defense: 0,
        onDeath: "removeFromWorld"
    },
    "lantern": {
        name: "Small Lantern",
        graphics: "basic_graphics",
        lighting: "reflectivity",
        lightingColor: "yellow",
        lightingRange: 4,
        ai: null,
        fighter: null,
        inventory: null,
        interactable: null,
        char: "\u16E1",
        fgColor: "black",
        bgColor: "yellow",
        blocks: true,
        blocksSight: false
    },
    "campfire": {
        name: "Small Fire",
        graphics: "basic_graphics",
        lighting: "reflectivity",
        lightingColor: "orange",
        lightingRange: 6,
        ai: null,
        fighter: null,
        inventory: null,
        interactable: null,
        char: "\u0436",
        fgColor: "black",
        bgColor: "orange",
        blocks: true,
        blocksSight: false
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
        blocks: false,
        blocksSight: false
    },
    "magic_shrine": {
        name: "Magicka Shrine",
        graphics: "basic_graphics",
        ai: null,
        fighter: null,
        interactable: "give_spell_interactable",
        char: "\u06DE",
        fgColor: "black",
        bgColor: "gold",
        blocks: true,
        blocksSight: false
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
        blocksSight: false,
        bgColor: "transparent",
        level: 1,
        experience: 0,
        experienceGiven: 0,
        maxHp: 100,
        maxMana: 100,
        strength: 3,
        defense: 1,
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.lightning]: Affinity.normal,
            [DamageType.ice]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
        onDeath: "default"
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
        blocksSight: false,
        level: 3,
        experience: 0,
        experienceGiven: 50,
        maxHp: 30,
        maxMana: 0,
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
            ["health_potion_weak", 0.25]
        ],
        onDeath: "default"
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
        blocksSight: false,
        level: 10,
        experience: 0,
        experienceGiven: 500,
        maxHp: 100,
        maxMana: 0,
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
            ["health_potion_weak", 0.25],
            ["health_potion", 0.1]
        ],
        onDeath: "default"
    },
    "rat": {
        name: "Rat",
        graphics: "basic_graphics",
        ai: "basic_monster_ai",
        fighter: "basic_fighter",
        inventory: "basic_inventory",
        interactable: null,
        char: "r",
        fgColor: "brown",
        bgColor: "transparent",
        blocks: true,
        blocksSight: false,
        level: 1,
        experience: 0,
        experienceGiven: 10,
        maxHp: 10,
        maxMana: 0,
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
        inventoryPool: [],
        onDeath: "default"
    },
};
Object.freeze(ObjectData);

export const ItemData = {
    "health_potion_weak": {
        displayName: "Weak Health Potion",
        value: 25,
        type: "health",
        useFunc: castHeal
    },
    "health_potion": {
        displayName: "Health Potion",
        value: 50,
        type: "health",
        useFunc: castHeal
    },
    "health_potion_strong": {
        displayName: "Health Potion",
        value: 100,
        type: "health",
        useFunc: castHeal
    },
    "lightning_scroll_weak": {
        displayName: "Weak Scroll of Lightning",
        value: 20,
        type: "damage_scroll",
        useFunc: castDamageSpell,
        damageType: DamageType.lightning
    },
    "lightning_scroll": {
        displayName: "Scroll of Lightning",
        value: 50,
        type: "damage_scroll",
        useFunc: castDamageSpell,
        damageType: DamageType.lightning
    },
    "lightning_scroll_strong": {
        displayName: "Strong Scroll of Lightning",
        value: 100,
        type: "damage_scroll",
        useFunc: castDamageSpell,
        damageType: DamageType.lightning
    },
    "fireball_scroll_weak": {
        displayName: "Weak Scroll of Fire",
        value: 20,
        type: "damage_scroll",
        useFunc: castDamageSpell,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll": {
        displayName: "Scroll of Fire",
        value: 50,
        type: "damage_scroll",
        useFunc: castDamageSpell,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll_strong": {
        displayName: "Strong Scroll of Fire",
        value: 100,
        type: "damage_scroll",
        useFunc: castDamageSpell,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "lightning_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Lightning",
        value: 50,
        type: "wild_damage_scroll",
        useFunc: castWildDamageSpell,
        damageType: DamageType.lightning
    },
    "lightning_scroll_wild": {
        displayName: "Scroll of Wild Lightning",
        value: 100,
        type: "wild_damage_scroll",
        useFunc: castWildDamageSpell,
        damageType: DamageType.lightning
    },
    "lightning_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Lightning",
        value: 150,
        type: "wild_damage_scroll",
        useFunc: castWildDamageSpell,
        damageType: DamageType.lightning
    },
    "fireball_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Fire",
        value: 50,
        type: "wild_damage_scroll",
        useFunc: castWildDamageSpell,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll_wild": {
        displayName: "Scroll of Wild Fire",
        value: 100,
        type: "wild_damage_scroll",
        useFunc: castWildDamageSpell,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "fireball_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Fire",
        value: 150,
        type: "wild_damage_scroll",
        useFunc: castWildDamageSpell,
        damageType: DamageType.fire,
        statusEffectFunc: createBurnEffect
    },
    "confuse_scroll": {
        displayName: "Scroll of Confuse Enemy",
        value: 8,
        type: "confuse_scroll",
        useFunc: castConfuse
    },
    "clairvoyance_scroll": {
        displayName: "Scroll of Clairvoyance",
        type: "clairvoyance_scroll",
        useFunc: castClairvoyance
    }
};
Object.freeze(ItemData);

export const SpellData = {
    "lightning_bolt": {
        name: "Lightning Bolt",
        manaCost: 50,
        value: 10,
        useFunc: castDamageSpell
    }
};
Object.freeze(SpellData);
