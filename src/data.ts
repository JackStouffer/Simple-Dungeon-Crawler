import { Entity, IEntityConfig, World } from "ape-ecs";

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
import { Command, NoOpCommand } from "./commands";
import { Nullable } from "./util";
import { GameMap } from "./map";
import { PlannerAIComponent } from "./entity";

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
    DeepWater
}

export interface DamageAffinityMap {
    [DamageType.Physical]: Affinity;
    [DamageType.Fire]: Affinity;
    [DamageType.Electric]: Affinity;
    [DamageType.Water]: Affinity;
    [DamageType.Ice]: Affinity;
    [DamageType.Nature]: Affinity;
}

const normalTypeDamageValues: DamageAffinityMap = {
    [DamageType.Physical]: Affinity.normal,
    [DamageType.Fire]: Affinity.normal,
    [DamageType.Electric]: Affinity.normal,
    [DamageType.Water]: Affinity.normal,
    [DamageType.Nature]: Affinity.normal,
    [DamageType.Ice]: Affinity.normal
};

const waterTypeDamageValues: DamageAffinityMap = {
    [DamageType.Physical]: Affinity.normal,
    [DamageType.Fire]: Affinity.strong,
    [DamageType.Electric]: Affinity.weak,
    [DamageType.Water]: Affinity.strong,
    [DamageType.Nature]: Affinity.normal,
    [DamageType.Ice]: Affinity.weak
};

export interface InventoryPoolProbabilities {
    itemID: string;
    probability: number;
}

export interface ObjectDataDetails {
    // Inventory, spells, actions, and input are not defined in the
    // static data because they require containers to be initialized
    addInventory?: boolean;
    addInput?: boolean;
    addPlannerAI?: boolean;
    sightRange?: number;
    spells?: string[];
    actions?: string[];
    inventoryPool?: InventoryPoolProbabilities[];
    staticallyKnownComponents: IEntityConfig;
}

export const ObjectData: { [key: string]: ObjectDataDetails } = {
    "door": {
        staticallyKnownComponents: {
            tags: ["blocks", "blocksSight"],
            c: {
                DisplayNameComponent: {
                    name: "Door"
                },
                GraphicsComponent: {
                    char: "\u1882",
                    fgColor: "white",
                    bgColor: "brown"
                },
                TypeComponent: {
                    entityType: "door"
                },
                InteractableTypeComponent: {
                    interactableType: InteractableType.Door
                }
            }
        }
    },
    "load_door": {
        staticallyKnownComponents: {
            tags: ["blocks", "blocksSight", "drawAfterSeen"],
            c: {
                DisplayNameComponent: {
                    name: "Door to new area"
                },
                GraphicsComponent: {
                    char: "\u1882",
                    fgColor: "white",
                    bgColor: "black",
                },
                TypeComponent: {
                    entityType: "door"
                },
                InteractableTypeComponent: {
                    interactableType: InteractableType.LoadLevel
                }
            }
        }
    },
    "stairs": {
        staticallyKnownComponents: {
            tags: ["blocks", "drawAfterSeen"],
            c: {
                DisplayNameComponent: {
                    name: "Stairs"
                },
                GraphicsComponent: {
                    char: "\u1750",
                    fgColor: "white",
                    bgColor: "black",
                },
                TypeComponent: {
                    entityType: "door"
                },
                InteractableTypeComponent: {
                    interactableType: InteractableType.LoadLevel
                }
            }
        }
    },
    "chest": {
        addInventory: true,
        staticallyKnownComponents: {
            tags: ["blocks", "drawAfterSeen"],
            c: {
                DisplayNameComponent: {
                    name: "Chest"
                },
                TypeComponent: {
                    entityType: "chest"
                },
                ChestGraphicsComponent: {
                    char: "*",
                    fgColor: "white",
                    bgColor: "brown",
                    emptyColor: "purple"
                },
                InteractableTypeComponent: {
                    interactableType: InteractableType.GiveItems
                },
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                }
            }
        }
    },
    "crate": {
        addInventory: true,
        staticallyKnownComponents: {
            tags: ["blocks"],
            c: {
                DisplayNameComponent: {
                    name: "Wooden Crate"
                },
                GraphicsComponent: {
                    char: "\u2612",
                    fgColor: "white",
                    bgColor: "brown"
                },
                TypeComponent: {
                    entityType: "chest"
                },
                HitPointsComponent: {
                    hp: 5,
                    maxHp: 5,
                    onDeath: DeathType.RemoveFromWorld,
                },
                DamageAffinityComponent: {
                    [DamageType.Physical]: Affinity.normal,
                    [DamageType.Fire]: Affinity.weak,
                    [DamageType.Electric]: Affinity.normal,
                    [DamageType.Water]: Affinity.strong,
                    [DamageType.Nature]: Affinity.normal,
                    [DamageType.Ice]: Affinity.strong
                },
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                }
            }
        }
    },
    "barrel": {
        addInventory: true,
        staticallyKnownComponents: {
            tags: ["blocks"],
            c: {
                DisplayNameComponent: {
                    name: "Wooden Barrel"
                },
                GraphicsComponent: {
                    char: "\u232D",
                    fgColor: "white",
                    bgColor: "brown",
                },
                TypeComponent: {
                    entityType: "chest"
                },
                HitPointsComponent: {
                    hp: 5,
                    maxHp: 5,
                    onDeath: DeathType.RemoveFromWorld,
                },
                DamageAffinityComponent: {
                    [DamageType.Physical]: Affinity.normal,
                    [DamageType.Fire]: Affinity.weak,
                    [DamageType.Electric]: Affinity.normal,
                    [DamageType.Water]: Affinity.strong,
                    [DamageType.Nature]: Affinity.normal,
                    [DamageType.Ice]: Affinity.strong
                },
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                }
            }
        }
    },
    "dead_body": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "dead_body"
                },
                DisplayNameComponent: {
                    name: "Dead Body"
                },
                GraphicsComponent: {
                    char: "%",
                    fgColor: "black",
                    bgColor: "red"
                }
            }
        }
    },
    "lantern": {
        staticallyKnownComponents: {
            tags: ["blocks"],
            c: {
                TypeComponent: {
                    entityType: "lantern"
                },
                DisplayNameComponent: {
                    name: "Small Lantern"
                },
                GraphicsComponent: {
                    char: "\u16E1",
                    fgColor: "black",
                    bgColor: "yellow",
                },
                LightingComponent: {
                    color: "yellow",
                    range: 4,
                    lightingType: LightingType.TwoPass
                }
            }
        }
    },
    "campfire": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "campfire"
                },
                DisplayNameComponent: {
                    name: "Small Campfire"
                },
                GraphicsComponent: {
                    char: "\u0436",
                    fgColor: "black",
                    bgColor: "orange",
                },
                LightingComponent: {
                    color: "orange",
                    range: 6,
                    lightingType: LightingType.TwoPass
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.Fire
                },
                FireTriggerComponent: {
                    effectTurns: 3,
                    effectDamage: 3,
                    damage: 10
                }
            }
        }
    },
    "fire_effect": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "fire_effect"
                },
                DisplayNameComponent: {
                    name: "Fire"
                },
                GraphicsComponent: {
                    char: "\u0436",
                    fgColor: "black",
                    bgColor: "orange"
                },
                LightingComponent: {
                    color: "orange",
                    range: 4,
                    lightingType: LightingType.TwoPass
                },
                RemoveAfterNTurnsComponent: {
                    turnsLeft: 5
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.Fire
                },
                FireTriggerComponent: {
                    effectTurns: 5,
                    effectDamage: 5,
                    damage: 15
                }
            }
        }
    },
    "ice_wall": {
        staticallyKnownComponents: {
            tags: ["blocks", "blocksSight"],
            c: {
                TypeComponent: {
                    entityType: "ice_wall"
                },
                DisplayNameComponent: {
                    name: "Ice Wall"
                },
                GraphicsComponent: {
                    char: "\u2042",
                    fgColor: "black",
                    bgColor: "lightblue",
                },
                HitPointsComponent: {
                    hp: 10,
                    maxHp: 10,
                    onDeath: DeathType.RemoveFromWorld,
                },
                DamageAffinityComponent: {
                    [DamageType.Physical]: Affinity.weak,
                    [DamageType.Fire]: Affinity.weak,
                    [DamageType.Electric]: Affinity.normal,
                    [DamageType.Water]: Affinity.strong,
                    [DamageType.Nature]: Affinity.strong,
                    [DamageType.Ice]: Affinity.nullified
                }
            }
        }
    },
    "dropped_item": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "dropped_item"
                },
                DisplayNameComponent: {
                    name: "Dropped Item"
                },
                GraphicsComponent: {
                    char: "!",
                    fgColor: "white",
                    bgColor: "brown"
                },
                InteractableTypeComponent: {
                    interactableType: InteractableType.GiveItems
                }
            }
        }
    },
    "magic_shrine": {
        staticallyKnownComponents: {
            tags: ["blocks", "blocksSight"],
            c: {
                TypeComponent: {
                    entityType: "magic_shrine"
                },
                DisplayNameComponent: {
                    name: "Magicka Shrine"
                },
                GraphicsComponent: {
                    char: "\u06DE",
                    fgColor: "black",
                    bgColor: "gold",
                },
                InteractableTypeComponent: {
                    interactableType: InteractableType.GiveSpells
                }
            }
        }
    },
    "event_trigger": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "event_trigger"
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.Event
                }
            }
        }
    },
    "shallow_water": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "shallow_water"
                },
                DisplayNameComponent: {
                    name: "Water"
                },
                GraphicsComponent: {
                    char: "~",
                    fgColor: "blue",
                    bgColor: "lightblue",
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.ShallowWater
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "water": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "water"
                },
                DisplayNameComponent: {
                    name: "Deep Water"
                },
                GraphicsComponent: {
                    char: "~",
                    fgColor: "lightblue",
                    bgColor: "blue"
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.DeepWater
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "player": {
        addInventory: true,
        addInput: true,
        spells: [],
        staticallyKnownComponents: {
            id: "player",
            tags: ["blocks", "input"],
            c: {
                TypeComponent: {
                    entityType: "player"
                },
                DisplayNameComponent: {
                    name: "The Player"
                },
                GraphicsComponent: {
                    char: "@",
                    fgColor: "blue",
                    bgColor: null
                },
                LightingComponent: {
                    color: "white",
                    range: 7,
                    lightingType: LightingType.Player
                },
                HitPointsComponent: {
                    hp: 100,
                    maxHp: 100,
                    onDeath: DeathType.Default
                },
                SpeedComponent: {
                    speed: BASE_SPEED,
                    maxTilesPerMove: 7
                },
                StatsComponent: {
                    mana: 100,
                    maxMana: 100,
                    strength: 5,
                    defense: 1,
                    criticalChance: 0.05,
                    criticalDamageMultiplier: 1.5,
                    ailmentSusceptibility: 0.1
                },
                LevelComponent: {
                    level: 1,
                    experience: 0,
                    experienceGiven: 0
                },
                DamageAffinityComponent: normalTypeDamageValues,
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "goblin": {
        addInventory: true,
        addPlannerAI: true,
        sightRange: 7,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack"
        ],
        inventoryPool: [
            {
                itemID: "health_potion_weak",
                probability: 0.25
            }
        ],
        staticallyKnownComponents: {
            tags: ["blocks"],
            c: {
                TypeComponent: {
                    entityType: "goblin"
                },
                DisplayNameComponent: {
                    name: "Goblin"
                },
                GraphicsComponent: {
                    char: "G",
                    fgColor: "green",
                    bgColor: null
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                SpeedComponent: {
                    speed: BASE_SPEED,
                    maxTilesPerMove: 5
                },
                HitPointsComponent: {
                    hp: 30,
                    maxHp: 30,
                    onDeath: DeathType.Default
                },
                StatsComponent: {
                    mana: 0,
                    maxMana: 0,
                    strength: 3,
                    defense: 1,
                    criticalChance: 0.05,
                    criticalDamageMultiplier: 1.5,
                    ailmentSusceptibility: 0.1
                },
                LevelComponent: {
                    level: 3,
                    experience: 0,
                    experienceGiven: 50
                },
                DamageAffinityComponent: normalTypeDamageValues,
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "goblin_brute": {
        addInventory: true,
        addPlannerAI: true,
        sightRange: 10,
        actions: [
            "guard",
            "chase",
            "useHealingItem",
            "goToEnemy",
            "reposition",
            "meleeAttack"
        ],
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
        staticallyKnownComponents: {
            tags: ["blocks"],
            c: {
                TypeComponent: {
                    entityType: "goblin_brute"
                },
                DisplayNameComponent: {
                    name: "Goblin Brute"
                },
                GraphicsComponent: {
                    char: "G",
                    fgColor: "green",
                    bgColor: "red"
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                SpeedComponent: {
                    speed: BASE_SPEED,
                    maxTilesPerMove: 5
                },
                HitPointsComponent: {
                    hp: 100,
                    maxHp: 100,
                    onDeath: DeathType.Default
                },
                StatsComponent: {
                    mana: 0,
                    maxMana: 0,
                    strength: 7,
                    defense: 4,
                    criticalChance: 0.05,
                    criticalDamageMultiplier: 1.5,
                    ailmentSusceptibility: 0.1
                },
                LevelComponent: {
                    level: 10,
                    experience: 0,
                    experienceGiven: 500
                },
                DamageAffinityComponent: normalTypeDamageValues,
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "rat": {
        addPlannerAI: true,
        sightRange: 5,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack"
        ],
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "rat"
                },
                DisplayNameComponent: {
                    name: "Rat"
                },
                GraphicsComponent: {
                    char: "r",
                    fgColor: "brown",
                    bgColor: null
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                FearAIComponent: {
                    fear: 0,
                    isAfraidThreshold: 10,
                    isCowering: false
                },
                SpeedComponent: {
                    speed: BASE_SPEED,
                    maxTilesPerMove: 4
                },
                HitPointsComponent: {
                    hp: 10,
                    maxHp: 10,
                    onDeath: DeathType.Default
                },
                StatsComponent: {
                    mana: 0,
                    maxMana: 0,
                    strength: 2,
                    defense: 1,
                    criticalChance: 0.05,
                    criticalDamageMultiplier: 1.5,
                    ailmentSusceptibility: 0.1
                },
                LevelComponent: {
                    level: 1,
                    experience: 0,
                    experienceGiven: 10
                },
                DamageAffinityComponent: normalTypeDamageValues,
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "water_sprite": {
        addPlannerAI: true,
        sightRange: 9,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack"
        ],
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "water_sprite"
                },
                DisplayNameComponent: {
                    name: "Water Sprite"
                },
                GraphicsComponent: {
                    char: "s",
                    fgColor: "white",
                    bgColor: "blue",
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                FearAIComponent: {
                    fear: 0,
                    isAfraidThreshold: 10,
                    isCowering: false
                },
                SpeedComponent: {
                    speed: BASE_SPEED,
                    maxTilesPerMove: 7
                },
                HitPointsComponent: {
                    hp: 10,
                    maxHp: 10,
                    onDeath: DeathType.Default
                },
                StatsComponent: {
                    mana: 0,
                    maxMana: 0,
                    strength: 2,
                    defense: 1,
                    criticalChance: 0.05,
                    criticalDamageMultiplier: 1.5,
                    ailmentSusceptibility: 0.1
                },
                LevelComponent: {
                    level: 1,
                    experience: 0,
                    experienceGiven: 10
                },
                DamageAffinityComponent: waterTypeDamageValues,
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "bandit": {
        addInventory: true,
        addPlannerAI: true,
        sightRange: 10,
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
            {
                itemID: "health_potion_weak",
                probability: 0.25
            }
        ],
        staticallyKnownComponents: {
            tags: ["blocks"],
            c: {
                TypeComponent: {
                    entityType: "bandit"
                },
                DisplayNameComponent: {
                    name: "Bandit"
                },
                GraphicsComponent: {
                    char: "b",
                    fgColor: "white",
                    bgColor: "brown",
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                SpeedComponent: {
                    speed: BASE_SPEED,
                    maxTilesPerMove: 5
                },
                HitPointsComponent: {
                    hp: 30,
                    maxHp: 30,
                    onDeath: DeathType.Default
                },
                StatsComponent: {
                    mana: 0,
                    maxMana: 0,
                    strength: 2,
                    defense: 1,
                    criticalChance: 0.05,
                    criticalDamageMultiplier: 1.5,
                    ailmentSusceptibility: 0.1
                },
                LevelComponent: {
                    level: 1,
                    experience: 0,
                    experienceGiven: 10
                },
                DamageAffinityComponent: normalTypeDamageValues,
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "bandit_mage": {
        addInventory: true,
        addPlannerAI: true,
        sightRange: 8,
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
        inventoryPool: [
            {
                itemID: "health_potion_weak",
                probability: 0.25
            }
        ],
        staticallyKnownComponents: {
            tags: ["blocks"],
            c: {
                TypeComponent: {
                    entityType: "bandit_mage"
                },
                DisplayNameComponent: {
                    name: "Bandit Mage"
                },
                GraphicsComponent: {
                    char: "b",
                    fgColor: "white",
                    bgColor: "blue",
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                SpeedComponent: {
                    speed: BASE_SPEED,
                    maxTilesPerMove: 5
                },
                HitPointsComponent: {
                    hp: 30,
                    maxHp: 30,
                    onDeath: DeathType.Default
                },
                StatsComponent: {
                    mana: 100,
                    maxMana: 100,
                    strength: 2,
                    defense: 1,
                    criticalChance: 0.05,
                    criticalDamageMultiplier: 1.5,
                    ailmentSusceptibility: 0.1
                },
                LevelComponent: {
                    level: 5,
                    experience: 0,
                    experienceGiven: 10
                },
                DamageAffinityComponent: normalTypeDamageValues,
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0
                }
            }
        }
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
    damageType?: DamageType;
    statusEffect?: StatusEffectType;
    areaOfEffect?: Area;

    useFunc: SkillFunction;
}

export const ItemData: { [key: string]: ItemDataDetails } = {
    "health_potion_weak": {
        displayName: "Weak Potion of Healing",
        value: 25,
        type: ItemType.HealSelf,
        useFunc: castHeal
    },
    "health_potion": {
        displayName: "Potion of Healing",
        value: 50,
        type: ItemType.HealSelf,
        useFunc: castHeal
    },
    "health_potion_strong": {
        displayName: "Strong Potion of Healing",
        value: 100,
        type: ItemType.HealSelf,
        useFunc: castHeal
    },
    "mana_potion_weak": {
        displayName: "Weak Potion of Mana",
        value: 25,
        type: ItemType.AddManaSelf,
        useFunc: castIncreaseMana
    },
    "lightning_scroll_weak": {
        displayName: "Weak Scroll of Lightning",
        value: 20,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell
    },
    "lightning_scroll": {
        displayName: "Scroll of Lightning",
        value: 50,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell
    },
    "lightning_scroll_strong": {
        displayName: "Strong Scroll of Lightning",
        value: 100,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell
    },
    "fireball_scroll_weak": {
        displayName: "Weak Scroll of Fire",
        value: 20,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll": {
        displayName: "Scroll of Fire",
        value: 50,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll_strong": {
        displayName: "Strong Scroll of Fire",
        value: 100,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "lightning_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Lightning",
        value: 50,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell
    },
    "lightning_scroll_wild": {
        displayName: "Scroll of Wild Lightning",
        value: 100,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell,
    },
    "lightning_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Lightning",
        value: 150,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell
    },
    "fireball_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Fire",
        value: 50,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        useFunc: castWildDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll_wild": {
        displayName: "Scroll of Wild Fire",
        value: 100,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        useFunc: castWildDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Fire",
        value: 150,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        useFunc: castWildDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "confuse_scroll": {
        displayName: "Scroll of Confuse Enemy",
        value: 8,
        type: ItemType.ConfuseScroll,
        useFunc: castConfuse,
    },
    "clairvoyance_scroll": {
        displayName: "Scroll of Clairvoyance",
        value: null,
        type: ItemType.ClairvoyanceScroll,
        useFunc: castClairvoyance
    },
    "haste_potion_weak": {
        displayName: "Weak Potion of Haste",
        value: 5,
        type: ItemType.HasteSelf,
        useFunc: castHaste,
    },
    "slow_poison_weak": {
        displayName: "Weak Poison of Slow",
        value: 5,
        type: ItemType.SlowOther,
        useFunc: castSlow
    }
};

export interface SpellDataDetails {
    id: string;
    displayName: string;
    manaCost: number;
    type: SpellType;
    value: Nullable<number>;
    damageType?: DamageType;
    statusEffect?: StatusEffectType;
    areaOfEffect?: Area;

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
        useFunc: castDamageSpell
    },
    "wild_lightning_bolt": {
        id: "wild_lightning_bolt",
        displayName: "Wild Lightning Bolt",
        manaCost: 10,
        value: 30,
        type: SpellType.WildDamage,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell
    },
    "fireball": {
        id: "fireball",
        displayName: "Fireball",
        manaCost: 50,
        value: 20,
        type: SpellType.DamageOther,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "wild_fireball": {
        id: "wild_fireball",
        displayName: "Wild Fireball",
        manaCost: 10,
        value: 30,
        type: SpellType.WildDamage,
        damageType: DamageType.Fire,
        useFunc: castWildDamageSpell
    },
    "confuse": {
        id: "confuse",
        displayName: "Confuse",
        manaCost: 20,
        value: 8,
        type: SpellType.DamageOther,
        useFunc: castConfuse
    },
    "clairvoyance": {
        id: "clairvoyance",
        displayName: "Clairvoyance",
        manaCost: 20,
        value: null,
        type: SpellType.Passive,
        useFunc: castClairvoyance
    },
    "lesser_heal": {
        id: "lesser_heal",
        displayName: "Lesser Heal",
        manaCost: 10,
        value: 25,
        type: SpellType.HealSelf,
        useFunc: castHeal
    },
    "heal": {
        id: "heal",
        displayName: "Heal",
        manaCost: 30,
        value: 50,
        type: SpellType.HealSelf,
        useFunc: castHeal
    },
    "greater_heal": {
        id: "greater_heal",
        displayName: "Greater Heal",
        manaCost: 50,
        value: 100,
        type: SpellType.HealSelf,
        useFunc: castHeal
    },
    "lesser_haste": {
        id: "lesser_haste",
        displayName: "Lesser Haste",
        manaCost: 30,
        value: 10,
        type: SpellType.Effect,
        useFunc: castHaste
    },
    "lesser_slow": {
        id: "lesser_slow",
        displayName: "Lesser Slow",
        manaCost: 30,
        value: 10,
        type: SpellType.DamageOther,
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
        areaOfEffect: {
            width: 1,
            height: 6
        },
        useFunc: castIceWall
    }
};

export interface Action {
    preconditions: { [key: string]: boolean },
    postconditions: { [key: string]: boolean }
    updateFunction: (
        ecs: World,
        ai: PlannerAIComponent,
        map: GameMap,
        triggerMap: Map<string, Entity>
    ) => Command,
    weight: (aiState: PlannerAIComponent) => number
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
        ActionData[action] = {
            preconditions: { lowHealth: true, [goal]: true },
            postconditions: { lowHealth: false },
            updateFunction: castSpellAction(key),
            weight: () => 1
        };
    }
}

// Dynamically add spells to actions
for (const objectID in ObjectData) {
    const data = ObjectData[objectID];
    if (data.spells !== undefined && data.actions !== undefined) {
        for (let i = 0; i < data.spells.length; i++) {
            const spell = data.spells[i];
            data.actions.push(`castSpell_${spell}`);
        }
    }
}
