export const WIDTH = 58;
export const HEIGHT = 38;
export const UI_HEIGHT = 6;
export const WORLD_WIDTH = WIDTH;
export const WORLD_HEIGHT = HEIGHT - UI_HEIGHT - 1;

export const MAP_FILLED_SPACE = "#";
export const MAP_EMPTY_SPACE = ".";

export const BASE_SPEED = 10;
export const LEVEL_UP_BASE = 50;
export const LEVEL_UP_FACTOR = 150;

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
    RemoveFromWorld
}

export enum LightingType {
    Player,
    OnePass,
    TwoPass
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
    HealOther
}

export enum StatusEffectType {
    OnFire,
    Frozen,
    Paralyzed
}

export enum InteractableType {
    LoadLevel,
    Door,
    GiveItems,
    GiveSpells
}

export enum TriggerType {
    Event,
    Fire,
    ShallowWater,
    DeepWater,
    Mud
}
