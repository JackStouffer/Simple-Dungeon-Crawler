export const TILE_SIZE = 16;

export const BASE_SPEED = 10;
export const LEVEL_UP_BASE = 50;
export const LEVEL_UP_FACTOR = 150;

export const PLAYER_ID = "player";

/**
 * Damage type enum.
 *
 * Fire: weak to water, strong against nature
 * Electric: weak to nature, strong against water
 * Water: weak to electric, nature, strong against fire
 * Nature: weak to fire, ice, strong against water
 * Ice: weak to physical, strong against nature
 */
export enum DamageType {
    Physical,
    Fire,
    Electric,
    Water,
    Ice,
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
    RemoveFromWorld,
    /** Unique death type to handle barrels exploding or dumping their oil */
    OilBarrel
}

export enum LightingType {
    Player,
    OnePass,
    TwoPass
}

export enum ItemType {
    HealSelf,
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
    HealSelf,
    HealOther,
    Push,
    AreaOfEffect
}

export enum StatusEffectType {
    OnFire,
    Frozen,
    Stunned
}

export enum InteractableType {
    LoadLevel,
    Door,
    GiveItems,
    GiveSpells,
    Rest
}

export enum TriggerType {
    Event,
    Fire,
    ShallowWater,
    DeepWater,
    Mud,
    Steam,
    Ice,
    CauseExplosion,
    Oil
}

export enum AreaOfEffectType {
    Electric
}
