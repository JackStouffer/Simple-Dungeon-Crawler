/* global ENV */

"use strict";

import { invert, noop } from "lodash";

import * as forrest_001 from "./maps/forrest_001";
import * as durdwin_001 from "./maps/durdwin_001";
import * as dev_room from "./maps/dev_room";

import {
    resolveTargetPositionKnown,
    resolveTargetInLOS,
    resolveNextToTarget,
    resolveEnoughManaForSpell,
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
    castSpellAction
} from "./ai/actions";
import {
    castHeal,
    castConfuse,
    castClairvoyance,
    castDamageSpell,
    castWildDamageSpell,
    castHaste,
    castSlow,
    castIncreaseMana
} from "./skills";
import { createBurnEffect } from "./effects";
import isNil from "lodash/isNil";

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
export const DamageType = {
    physical: 1,
    fire: 2,
    electric: 3,
    water: 4,
    nature: 5
};
Object.freeze(DamageType);

export const DamageTypeNames = invert(DamageType);
Object.freeze(DamageTypeNames);

/**
 * Damage affinity damage multiplier
 */
export const Affinity = {
    weak: 2,
    normal: 1,
    strong: 0.5,
    nullified: 0
};
Object.freeze(Affinity);

export const TileData = {
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
        speed: BASE_SPEED,
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
        onDeath: "remove_from_world",
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.weak,
            [DamageType.electric]: Affinity.normal,
            [DamageType.water]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        }
    },
    "barrel": {
        name: "Wooden Barrel",
        graphics: "basic_graphics",
        ai: null,
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        inventory: "basic_inventory",
        interactable: null,
        char: "\u232D",
        fgColor: "white",
        bgColor: "brown",
        emptyColor: "purple",
        blocks: true,
        blocksSight: false,
        experience: 0,
        experienceGiven: 0,
        maxHp: 3,
        strength: 0,
        defense: 0,
        onDeath: "remove_from_world",
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.weak,
            [DamageType.electric]: Affinity.normal,
            [DamageType.water]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        }
    },
    "dead_body": {
        name: "Dead Body",
        graphics: "basic_graphics",
        ai: null,
        fighter: null,
        inventory: null,
        interactable: null,
        char: "%",
        fgColor: "black",
        bgColor: "red",
        blocks: false,
        blocksSight: false
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
        graphics: "transparency_graphics",
        lighting: "player_lighting",
        lightingColor: "white",
        lightingRange: 7,
        ai: null,
        inventory: "basic_inventory",
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        interactable: null,
        char: "@",
        fgColor: "blue",
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
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.electric]: Affinity.normal,
            [DamageType.water]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
        onDeath: "default"
    },
    "goblin": {
        name: "Goblin",
        graphics: "transparency_graphics",
        ai: "basic_monster_ai",
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        inventory: "basic_inventory",
        interactable: null,
        char: "G",
        fgColor: "green",
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
            [DamageType.electric]: Affinity.normal,
            [DamageType.water]: Affinity.normal,
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
        ai: "planning_ai",
        fighter: "basic_fighter",
        speed: BASE_SPEED,
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
            [DamageType.electric]: Affinity.normal,
            [DamageType.water]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
        inventoryPool: [
            ["health_potion_weak", 0.25],
            ["health_potion", 0.1]
        ],
        actions: [
            "guard",
            "chase",
            "useHealingItem",
            "goToEnemy",
            "reposition",
            "meleeAttack"
        ],
        onDeath: "default"
    },
    "rat": {
        name: "Rat",
        graphics: "transparency_graphics",
        ai: "basic_monster_ai",
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        inventory: "basic_inventory",
        interactable: null,
        char: "r",
        fgColor: "brown",
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
            [DamageType.electric]: Affinity.normal,
            [DamageType.water]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
        inventoryPool: [],
        onDeath: "default"
    },
    "water_sprite": {
        name: "Water Sprite",
        graphics: "basic_graphics",
        ai: "basic_monster_ai",
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        inventory: "basic_inventory",
        interactable: null,
        char: "s",
        fgColor: "white",
        bgColor: "blue",
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
            [DamageType.fire]: Affinity.strong,
            [DamageType.electric]: Affinity.weak,
            [DamageType.water]: Affinity.nullified,
            [DamageType.nature]: Affinity.normal
        },
        inventoryPool: [],
        onDeath: "default"
    },
    "bandit": {
        name: "Bandit",
        graphics: "basic_graphics",
        ai: "planning_ai",
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        inventory: "basic_inventory",
        interactable: null,
        char: "b",
        fgColor: "white",
        bgColor: "brown",
        blocks: true,
        blocksSight: false,
        level: 1,
        experience: 0,
        experienceGiven: 10,
        maxHp: 30,
        maxMana: 0,
        strength: 2,
        defense: 1,
        sightRange: 7,
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.electric]: Affinity.normal,
            [DamageType.water]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
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
        inventoryPool: [
            ["health_potion_weak", 0.25]
        ],
        onDeath: "default"
    },
    "bandit_mage": {
        name: "Bandit Mage",
        graphics: "basic_graphics",
        ai: "planning_ai",
        fighter: "basic_fighter",
        speed: BASE_SPEED,
        inventory: "basic_inventory",
        interactable: null,
        char: "b",
        fgColor: "white",
        bgColor: "blue",
        blocks: true,
        blocksSight: false,
        level: 5,
        experience: 0,
        experienceGiven: 100,
        maxHp: 30,
        maxMana: 100,
        strength: 2,
        defense: 1,
        sightRange: 7,
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.electric]: Affinity.normal,
            [DamageType.water]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
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
        inventoryPool: [],
        onDeath: "default"
    }
};

export const ItemData = {
    "health_potion_weak": {
        displayName: "Weak Potion of Healing",
        value: 25,
        type: "heal",
        useFunc: castHeal
    },
    "health_potion": {
        displayName: "Potion of Healing",
        value: 50,
        type: "heal",
        useFunc: castHeal
    },
    "health_potion_strong": {
        displayName: "Strong Potion of Healing",
        value: 100,
        type: "heal",
        useFunc: castHeal
    },
    "mana_potion_weak": {
        displayName: "Weak Potion of Mana",
        value: 25,
        type: "add_mana",
        useFunc: castIncreaseMana
    },
    "lightning_scroll_weak": {
        displayName: "Weak Scroll of Lightning",
        value: 20,
        type: "damage_scroll",
        useFunc: castDamageSpell,
        damageType: DamageType.electric
    },
    "lightning_scroll": {
        displayName: "Scroll of Lightning",
        value: 50,
        type: "damage_scroll",
        useFunc: castDamageSpell,
        damageType: DamageType.electric
    },
    "lightning_scroll_strong": {
        displayName: "Strong Scroll of Lightning",
        value: 100,
        type: "damage_scroll",
        useFunc: castDamageSpell,
        damageType: DamageType.electric
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
        damageType: DamageType.electric
    },
    "lightning_scroll_wild": {
        displayName: "Scroll of Wild Lightning",
        value: 100,
        type: "wild_damage_scroll",
        useFunc: castWildDamageSpell,
        damageType: DamageType.electric
    },
    "lightning_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Lightning",
        value: 150,
        type: "wild_damage_scroll",
        useFunc: castWildDamageSpell,
        damageType: DamageType.electric
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
    },
    "haste_potion_weak": {
        displayName: "Weak Potion of Haste",
        value: 5,
        type: "haste",
        useFunc: castHaste
    },
    "slow_poison_weak": {
        displayName: "Weak Poison of Slow",
        value: 5,
        type: "slow",
        useFunc: castSlow
    }
};

if (ENV !== "TEST") {
    Object.freeze(ItemData);
}

export const SpellData = {
    "lightning_bolt": {
        displayName: "Lightning Bolt",
        manaCost: 50,
        value: 20,
        type: "damage",
        damageType: DamageType.electric,
        useFunc: castDamageSpell
    },
    "wild_lightning_bolt": {
        displayName: "Lightning Bolt",
        manaCost: 60,
        value: 30,
        type: "wild",
        damageType: DamageType.electric,
        useFunc: castWildDamageSpell
    },
    "fireball": {
        displayName: "Fireball",
        manaCost: 50,
        value: 20,
        type: "damage",
        damageType: DamageType.fire,
        useFunc: castDamageSpell
    },
    "wild_fireball": {
        displayName: "Wild Fireball",
        manaCost: 60,
        value: 30,
        type: "wild",
        damageType: DamageType.fire,
        useFunc: castWildDamageSpell
    },
    "confuse": {
        displayName: "Confuse",
        manaCost: 50,
        value: 8,
        type: "effect",
        useFunc: castConfuse
    },
    "clairvoyance": {
        displayName: "Clairvoyance",
        manaCost: 50,
        type: "passive",
        useFunc: castClairvoyance
    },
    "lesser_heal": {
        displayName: "Lesser Heal",
        manaCost: 50,
        value: 25,
        type: "heal",
        useFunc: castHeal
    },
    "heal": {
        displayName: "Heal",
        manaCost: 50,
        value: 50,
        type: "heal",
        useFunc: castHeal
    },
    "greater_heal": {
        displayName: "Greater Heal",
        manaCost: 50,
        value: 100,
        type: "heal",
        useFunc: castHeal
    },
    "lesser_haste": {
        displayName: "Lesser Haste",
        manaCost: 100,
        value: 6,
        type: "effect",
        useFunc: castHaste
    },
    "lesser_slow": {
        displayName: "Lesser Slow",
        manaCost: 100,
        value: 6,
        type: "effect",
        useFunc: castSlow
    }
};

if (ENV !== "TEST") {
    Object.freeze(SpellData);
}

export const Goals = {
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

export const Actions = {
    "wander": {
        preconditions: { targetPositionKnown: false },
        postconditions: { targetPositionKnown: true },
        updateFunction: wanderAction,
        weight: () => 1
    },
    "guard": {
        preconditions: { targetPositionKnown: false },
        postconditions: { targetPositionKnown: true },
        updateFunction: () => noop,
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
        updateFunction: chaseAction,
        weight: () => 1
    },
    "reposition": {
        preconditions: { inDangerousArea: true },
        postconditions: { inDangerousArea: false },
        updateFunction: () => noop,
        weight: () => 1
    },
    "runAway": {
        preconditions: { afraid: true },
        postconditions: { afraid: false },
        updateFunction: () => noop,
        weight: () => 1
    },
    "cower": {
        preconditions: { afraid: false, cowering: false },
        postconditions: { cowering: true },
        updateFunction: () => noop,
        weight: () => 1
    },
    "goToFallbackPosition": {
        preconditions: { atFallbackPosition: false },
        postconditions: { atFallbackPosition: true },
        updateFunction: () => noop,
        weight: () => 1
    }
};

// Dynamically add spells to goals and actions
for (const key in SpellData) {
    const data = SpellData[key];
    // capitalize the first letter
    const goal = `enoughManaFor_${key}`;
    const action = `castSpell_${key}`;
    if (data.type === "damage") {
        Goals[goal] = {
            resolver: resolveEnoughManaForSpell(key)
        };
        Actions[action] = {
            preconditions: {
                [goal]: true,
                targetInLineOfSight: true,
                targetKilled: false
            },
            postconditions: { targetKilled: true },
            updateFunction: castSpellAction(key),
            weight: () => 1
        };
    } else if (data.type === "heal") {
        Goals[goal] = {
            resolver: resolveEnoughManaForSpell(key)
        };
        Actions[action] = {
            preconditions: { lowHealth: true, [goal]: true },
            postconditions: { lowHealth: false },
            updateFunction: castSpellAction(key),
            weight: () => 1
        };
    }
}
for (const objectID in ObjectData) {
    const data = ObjectData[objectID];
    if (data.spells) {
        for (let i = 0; i < data.spells.length; i++) {
            const spell = data.spells[i];
            data.actions.push(`castSpell_${spell}`);
        }
    }
}
if (ENV !== "TEST") {
    Object.freeze(ObjectData);
}

export const LevelData = {
    forrest_001,
    durdwin_001,
    dev_room
};

if (ENV !== "TEST") {
    Object.freeze(LevelData);
}

export const GameState = {
    gameplay: 1,
    openingCinematic: 2,
    winCinematic: 3,
    loseCinematic: 4,
    pauseMenu: 5,
    inventoryMenu: 6,
    spellMenu: 7
};

if (ENV !== "TEST") {
    Object.freeze(GameState);
}
