import { World, Component, Entity, EntityRef, System, Query, IEntityConfig } from "ape-ecs";
import { assignIn } from "lodash";
import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";

import { RNG } from "./rot/index";

import globals from "./globals";
import {
    Affinity,
    BASE_SPEED,
    DamageType,
    DeathType,
    LightingType,
    InteractableType,
    TriggerType,
    AreaOfEffectType
} from "./constants";
import { Nullable, randomIntFromInterval } from "./util";
import { KeyCommand, PlayerState } from "./input-handler";
import { dialogByClassification } from "./ai/dialog";
import { Planner, PlannerWorldState } from "./ai/planner";
import { createPlanner } from "./ai/commands";
import {
    cameraReset,
    moveCameraDown,
    moveCameraLeft,
    moveCameraRight,
    moveCameraUp,
    NoOpCommand,
    OpenInventoryCommand,
    OpenSpellsCommand,
    RotateReticleCommand,
    zoomInCamera,
    zoomOutCamera
} from "./commands";
import { Area, ItemDataDetails, SpellDataDetails } from "./skills";
import { Vector2D } from "./map";
import { Rectangle } from "./camera";
import { playBoxBreak } from "./audio";
import { setUpParticleComponentEmitter } from "./graphics";

export type EntityMap = Map<string, string[]>;

interface DamageAffinityMap {
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

export class PositionComponent extends Component {
    worldPosition: Vector2D;
    tilePosition: Vector2D;
    static typeName = "PositionComponent";
    static properties = {
        worldPosition: new Vector2D(0, 0),
        tilePosition: new Vector2D(0, 0)
    }
}

export class TypeComponent extends Component {
    displayName: Nullable<string>;
    entityType: string;
    race: Nullable<string>;
    classification: Nullable<string>;

    static typeName = "TypeComponent";
    static properties = {
        displayName: "player",
        entityType: "player",
        race: "human",
        classification: "player"
    }
}

export class GraphicsComponent extends Component {
    textureKey: Nullable<string>;
    sprite: Nullable<PIXI.Sprite>;
    opacity: number;
    zIndex: number;

    static typeName = "GraphicsComponent";
    static properties = {
        textureKey: "",
        sprite: null,
        opacity: 1,
        zIndex: 10
    }
}

export class ChestComponent extends Component {
    openTextureKey: string;
    closedTextureKey: string;

    static typeName = "ChestComponent";
    static properties = {
        openTextureKey: "",
        closedTextureKey: ""
    }
}

export class LightingComponent extends Component {
    color: string;
    range: number;
    lightingType: LightingType;

    static typeName = "LightingComponent";
    static properties = {
        color: "white",
        range: 10,
        lightingType: LightingType.OnePass
    }
}

// TODO: rethink inventory so that each item is a component,
// this feels more in line with the ECS-way of doing things
// as everything is still an array
export class InventoryComponent extends Component {
    inventory: Map<string, number>;

    static typeName = "InventoryComponent";
    static properties = {
        inventory: new Map()
    }
}

export class HitPointsComponent extends Component {
    hp: number;
    maxHp: number;
    onDeath: DeathType;

    static typeName = "HitPointsComponent";
    static properties = {
        hp: 100,
        maxHp: 100,
        onDeath: DeathType.Default
    }
}

export class HitPointsEffectComponent extends Component {
    name: string;
    stat: "hp" | "maxHp";
    modifierType: "multiply" | "add";
    turnsLeft: number;
    value: number;

    static typeName = "HitPointsEffectComponent";
    static properties = {
        name: "",
        stat: "hp",
        modifierType: "add",
        turnsLeft: 0,
        value: 0
    }
}

export class SpeedComponent extends Component {
    speed: number;
    maxTilesPerMove: number;

    static typeName = "SpeedComponent";
    static properties = {
        speed: BASE_SPEED,
        maxTilesPerMove: 7
    }
}

export class SpeedEffectComponent extends Component {
    name: string;
    stat: "speed" | "maxTilesPerMove";
    modifierType: "multiply" | "add";
    turnsLeft: number;
    value: number;
    display: boolean;

    static typeName = "SpeedEffectComponent";
    static properties = {
        name: "",
        stat: "speed",
        modifierType: "add",
        turnsLeft: 0,
        value: 0,
        display: true
    }
}

export class StatsComponent extends Component {
    strength: number;
    defense: number;
    criticalChance: number;
    criticalDamageMultiplier: number;
    ailmentSusceptibility: number;

    static typeName = "StatsComponent";
    static properties = {
        strength: 5,
        defense: 1,
        criticalChance: 0.05,
        criticalDamageMultiplier: 1.5,
        ailmentSusceptibility: 0.1
    }
}

export class StatsEffectComponent extends Component {
    name: string;
    stat: "strength" | "defense" | "criticalChance" | "criticalDamageMultiplier" | "ailmentSusceptibility";
    modifierType: "multiply" | "add";
    turnsLeft: number;
    value: number;

    static typeName = "StatsEffectComponent";
    static properties = {
        name: "",
        stat: "strength",
        modifierType: "add",
        turnsLeft: 0,
        value: 0
    }
}

export class LevelComponent extends Component {
    level: number;
    experience: number;
    experienceGiven: number;

    static typeName = "LevelComponent";
    static properties = {
        level: 1,
        experience: 0,
        experienceGiven: 0
    }
}

export class DamageAffinityComponent extends Component {
    [DamageType.Physical]: Affinity;
    [DamageType.Fire]: Affinity;
    [DamageType.Electric]: Affinity;
    [DamageType.Water]: Affinity;
    [DamageType.Ice]: Affinity;
    [DamageType.Nature]: Affinity;

    static typeName = "DamageAffinityComponent";
    static properties = {
        [DamageType.Physical]: Affinity.normal,
        [DamageType.Fire]: Affinity.normal,
        [DamageType.Electric]: Affinity.normal,
        [DamageType.Water]: Affinity.normal,
        [DamageType.Nature]: Affinity.normal,
        [DamageType.Ice]: Affinity.normal
    };
}

export interface KnownSpellData {
    count: number;
    maxCount: number;
}

export class SpellsComponent extends Component {
    knownSpells: { [key: string]: KnownSpellData };

    static typeName = "SpellsComponent";
    static properties = {
        knownSpells: {}
    }
}

export class PlannerAIComponent extends Component {
    targetId: string;
    teamId: Nullable<number>;
    sightRange: null;
    nonAlertSightRange: number;
    alertSightRange: number;
    planner: Planner;
    previousWorldState: PlannerWorldState;
    currentAction: Nullable<string>;
    currentOrder: "attack" | "alert_allies" | "fallback";
    goals: Set<string>;
    actions: Set<string>;
    lowHealthThreshold: number;
    desiredDistanceToTarget: number;
    knowsTargetPosition: boolean;
    hasTargetInSight: boolean;
    wanderBounds: Nullable<Rectangle>;

    static typeName = "PlannerAIComponent";
    static properties = {
        targetId: "",
        teamId: null,
        nonAlertSightRange: 5,
        alertSightRange: 5,
        planner: null,
        previousWorldState: {},
        currentAction: null,
        currentOrder: "attack",
        goals: null,
        actions: null,
        lowHealthThreshold: 0.25,
        desiredDistanceToTarget: 1,
        knowsTargetPosition: false,
        hasTargetInSight: false,
        wanderBounds: null
    }
}

export class LoseTargetAIComponent extends Component {
    turnsWithTargetOutOfSight: number;
    loseTrackAfterNTurns: number;

    static typeName = "LoseTargetAIComponent";
    static properties = {
        turnsWithTargetOutOfSight: 0,
        loseTrackAfterNTurns: 10
    }
}

export class FearAIComponent extends Component {
    fear: number;
    isAfraidThreshold: number;
    runAwayTarget: Nullable<Vector2D>;
    isCowering: boolean;

    static typeName = "FearAIComponent";
    static properties = {
        fear: 0,
        isAfraidThreshold: 10,
        runAwayTarget: null,
        isCowering: false
    }
}

export class FallbackAIComponent extends Component {
    isAtFallbackPosition: boolean;
    fallbackPosition: any;

    static typeName = "FallbackAIComponent";
    static properties = {
        isAtFallbackPosition: false,
        fallbackPosition: EntityRef
    }
}

export class PatrolAIComponent extends Component {
    patrolTarget: string;

    static typeName = "PatrolAIComponent";
    static properties = {
        patrolTarget: ""
    }
}

export class PatrolPathComponent extends Component {
    next: string;

    static typeName = "PatrolPathComponent";
    static properties = {
        next: ""
    }
}

export class ConfusableAIComponent extends Component {
    confused: boolean;
    turnsLeft: number;

    static typeName = "ConfusableAIComponent";
    static properties = {
        confused: false,
        turnsLeft: 0
    }
}

export class InputHandlingComponent extends Component {
    state: PlayerState;
    reticleRotation: 0 | 90 | 180 | 270;
    keyCommands: KeyCommand[];
    itemForTarget: Nullable<ItemDataDetails>;
    spellForTarget: Nullable<SpellDataDetails>;

    static typeName = "InputHandlingComponent";
    static properties = {
        state: PlayerState.Combat,
        reticleRotation: 0,
        keyCommands: [],
        itemForTarget: null,
        spellForTarget: null
    };
}

export class FreezableComponent extends Component {
    frozen: boolean;
    turnsLeft: number;
    textureKey: Nullable<string>;

    static typeName = "FreezableComponent";
    static properties = {
        frozen: false,
        turnsLeft: 0,
        textureKey: null
    }
}

export class FlammableComponent extends Component {
    onFire: boolean;
    fireDamage: number;
    turnsLeft: number;

    static typeName = "FlammableComponent";
    static properties = {
        onFire: false,
        fireDamage: 0,
        turnsLeft: 1
    }
}

export class WetableComponent extends Component {
    wet: boolean;
    turnsLeft: number;

    static typeName = "WetableComponent";
    static properties = {
        wet: false,
        turnsLeft: 0
    }
}

export class SilenceableComponent extends Component {
    silenced: boolean;
    turnsLeft: number;

    static typeName = "SilenceableComponent";
    static properties = {
        silenced: false,
        turnsLeft: 0
    }
}

export class StunnableComponent extends Component {
    stunned: boolean;
    turnsLeft: number;

    static typeName = "StunnableComponent";
    static properties = {
        stunned: false,
        turnsLeft: 0
    }
}

export class TriggerComponent extends Component {
    currentTriggerType: TriggerType;
    initialTriggerType: TriggerType;
    effectTurns: Nullable<number>;
    effectDamage: Nullable<number>;
    damage: Nullable<number>;
    event: Nullable<string>;

    static typeName = "TriggerComponent";
    static properties = {
        currentTriggerType: null,
        initialTriggerType: null,
        effectTurns: null,
        effectDamage: null,
        damage: null,
        event: null
    }
}

export class InteractableTypeComponent extends Component {
    interactableType: InteractableType;

    static typeName = "InteractableTypeComponent";
    static properties = {
        interactableType: InteractableType.Door
    };
}

export class LoadLevelComponent extends Component {
    levelName: string;

    static typeName = "LoadLevelComponent";
    static properties = {
        levelName: ""
    };
}

export class RemoveAfterNTurnsComponent extends Component {
    turnsLeft: number;

    static typeName = "RemoveAfterNTurnsComponent";
    static properties = {
        turnsLeft: 0
    };
}

export class DialogMemoryComponent extends Component {
    memory: Map<string, string | number | boolean>;

    static typeName = "DialogMemoryComponent";
    static properties = {
        memory: new Map()
    }
}

/**
 * Effect to be applied to an area around the entity once
 * per turn cycle.
 */
export class AreaOfEffectComponent extends Component {
    /** Visual effect type */
    effectType: AreaOfEffectType;
    damageType: DamageType;
    damage: number;
    areaOfEffect: Area;

    static typeName = "AreaOfEffectComponent";
    static properties = {
        effectType: AreaOfEffectType.Electric,
        damageType: DamageType.Electric,
        damage: 0,
        areaOfEffect: {
            type: "circle",
            radius: 1
        }
    };
}

/**
 * Add particle visual effect to any entity
 */
export class ParticleEmitterComponent extends Component {
    emitter: Nullable<particles.Emitter>;
    particleDefinition: {
        particleImages: string[];
        particleConfig: particles.OldEmitterConfig;
    };
    turnsLeft: number;

    static typeName = "ParticleEmitterComponent";
    static properties = {
        turnsLeft: Infinity,
        particleDefinition: {},
        emitter: null
    };
}

export interface InventoryPoolProbabilities {
    itemID: string;
    probability: number;
}

interface ObjectDataDetails {
    // Inventory, spells, actions, and input are not defined in the
    // static data because they require containers to be initialized
    addInventory?: boolean;
    addInput?: boolean;
    addPlannerAI?: boolean;
    addDialogMemory?: boolean;
    desiredDistanceToTarget?: number;
    nonAlertSightRange?: number;
    alertSightRange?: number;
    spells?: [string, number][];
    actions?: string[];
    lowHealthThreshold?: number;
    inventoryPool?: InventoryPoolProbabilities[];
    staticallyKnownComponents: IEntityConfig;
}

export const ObjectData: { [key: string]: ObjectDataDetails } = {
    "node":{
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "node",
                    race: null,
                    classification: null
                }
            }
        }
    },
    "door": {
        staticallyKnownComponents: {
            tags: ["blocks", "blocksSight"],
            c: {
                TypeComponent: {
                    displayName: "Door",
                    entityType: "door",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "door_1_closed",
                    sprite: null,
                    zIndex: 5
                },
                InteractableTypeComponent: {
                    interactableType: InteractableType.Door
                }
            }
        }
    },
    "load_door": {
        staticallyKnownComponents: {
            tags: ["blocks", "drawAfterSeen"],
            c: {
                TypeComponent: {
                    displayName: "Door to new area",
                    entityType: "load_door",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "door_1_closed",
                    sprite: null,
                    zIndex: 5
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
                TypeComponent: {
                    displayName: "Stairs",
                    entityType: "stairs",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "stone_stairs_right",
                    sprite: null,
                    zIndex: 5
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
                TypeComponent: {
                    displayName: "Chest",
                    entityType: "chest",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "chest_1_closed",
                    sprite: null,
                    zIndex: 5
                },
                ChestComponent: {
                    closedTextureKey: "chest_1_closed",
                    openTextureKey: "chest_1_open"
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
            tags: ["blocks", "moveable"],
            c: {
                TypeComponent: {
                    displayName: "Wooden Crate",
                    entityType: "crate",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "wood_steel_crate",
                    sprite: null,
                    zIndex: 5
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
            tags: ["blocks", "moveable"],
            c: {
                TypeComponent: {
                    displayName: "Wooden Barrel",
                    entityType: "barrel",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "barrel_3",
                    sprite: null,
                    zIndex: 5
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
                    displayName: "Dead Body",
                    entityType: "dead_body",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "skull_bone",
                    sprite: null,
                    zIndex: 5
                }
            }
        }
    },
    "lantern": {
        staticallyKnownComponents: {
            tags: ["blocks"],
            c: {
                TypeComponent: {
                    displayName: "Small Lantern",
                    entityType: "lantern",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "iron_lantern_lit",
                    sprite: null,
                    zIndex: 5
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
                    displayName: "Small Campfire",
                    entityType: "campfire",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "campfire_1_lit_1",
                    sprite: null,
                    zIndex: 5
                },
                LightingComponent: {
                    color: "orange",
                    range: 6,
                    lightingType: LightingType.TwoPass
                },
                TriggerComponent: {
                    currentTriggerType: TriggerType.Fire,
                    initialTriggerType: TriggerType.Fire,
                    effectTurns: 3,
                    effectDamage: 3,
                    damage: 10
                }
            }
        }
    },
    "rest_point": {
        staticallyKnownComponents: {
            tags: ["blocks"],
            c: {
                TypeComponent: {
                    displayName: "Save Point",
                    entityType: "rest_point",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: null,
                    sprite: null,
                    zIndex: 5
                },
                InteractableTypeComponent: {
                    interactableType: InteractableType.Rest
                },
                ParticleEmitterComponent: {
                    turnsLeft: Infinity,
                    particleDefinition: {
                        particleImages: ["particle_cross_soft"],
                        particleConfig: {
                            acceleration: { x: 0, y: 0 },
                            addAtBack: false,
                            alpha: { start: 1, end: 1 },
                            blendMode: "normal",
                            color: { start: "#ec26ff", end: "#2638ff" },
                            emitterLifetime: -1,
                            frequency: 0.06,
                            lifetime: { min: 0.2, max: 0.3 },
                            maxParticles: 200,
                            maxSpeed: 0,
                            noRotation: false,
                            pos: { x: 8, y: 8 },
                            rotationSpeed: { min: 50, max: 50 },
                            scale: { start: .3, end: .3, minimumScaleMultiplier: 1 },
                            spawnCircle: { x: 0, y: 0, r: 10 },
                            spawnType: "circle",
                            speed: { start: 30, end: 20, minimumSpeedMultiplier: 1 },
                            startRotation: { min: 270, max: 270 }
                        }
                    }
                },
            }
        }
    },
    "fire_effect": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    displayName: "Fire",
                    entityType: "fire_effect",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: null,
                    sprite: null,
                    zIndex: 5
                },
                ParticleEmitterComponent: {
                    turnsLeft: Infinity,
                    particleDefinition: {
                        particleImages: ["particle_cloud", "particle_fire"],
                        particleConfig: {
                            acceleration: { x: 0, y: 0 },
                            addAtBack: false,
                            alpha: { start: 0.62, end: 0 },
                            blendMode: "normal",
                            color: { start: "#fff191", end: "#ff622c" },
                            emitterLifetime: -1,
                            frequency: 0.001,
                            lifetime: { min: 0.05, max: 0.1 },
                            maxParticles: 1000,
                            maxSpeed: 0,
                            noRotation: false,
                            pos: { x: 8, y: 8 },
                            rotationSpeed: { min: 50, max: 50 },
                            scale: { start: .2, end: 1, minimumScaleMultiplier: 1 },
                            spawnCircle: { x: 0, y: 0, r: 10 },
                            spawnType: "circle",
                            speed: { start: 300, end: 200, minimumSpeedMultiplier: 1 },
                            startRotation: { min: 265, max: 275 }
                        }
                    }
                },
                LightingComponent: {
                    color: "orange",
                    range: 4,
                    lightingType: LightingType.TwoPass
                },
                RemoveAfterNTurnsComponent: {
                    turnsLeft: 5
                },
                TriggerComponent: {
                    currentTriggerType: TriggerType.Fire,
                    initialTriggerType: TriggerType.Fire,
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
                    displayName: "Ice Wall",
                    entityType: "ice_wall",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "ice_wall",
                    sprite: null,
                    zIndex: 8
                },
                HitPointsComponent: {
                    hp: 100,
                    maxHp: 100,
                    onDeath: DeathType.RemoveFromWorld,
                },
                DamageAffinityComponent: {
                    [DamageType.Physical]: Affinity.normal,
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
        addInventory: true,
        staticallyKnownComponents: {
            tags: ["moveable"],
            c: {
                TypeComponent: {
                    displayName: "Dropped Item",
                    entityType: "dropped_item",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "yellow_and_green_bottle",
                    sprite: null,
                    zIndex: 8
                },
                InteractableTypeComponent: {
                    interactableType: InteractableType.GiveItems
                }
            }
        }
    },
    "magic_shrine": {
        staticallyKnownComponents: {
            tags: ["blocks", "blocksSight", "drawAfterSeen"],
            c: {
                TypeComponent: {
                    displayName: "Magicka Shrine",
                    entityType: "magic_shrine",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "mage_statue_bottom",
                    sprite: null,
                    zIndex: 5
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
                    displayName: null,
                    entityType: "event_trigger",
                    race: null,
                    classification: "trigger"
                },
                TriggerComponent: {
                    currentTriggerType: TriggerType.Event,
                    initialTriggerType: TriggerType.Event
                }
            }
        }
    },
    "shallow_water": {
        staticallyKnownComponents: {
            tags: ["environmentTile", "waterTile"],
            c: {
                TypeComponent: {
                    displayName: "Water",
                    entityType: "shallow_water",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "water_1",
                    sprite: null,
                    zIndex: 5
                },
                TriggerComponent: {
                    currentTriggerType: TriggerType.ShallowWater,
                    initialTriggerType: TriggerType.ShallowWater
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0,
                    textureKey: "frozen_water"
                }
            }
        }
    },
    "puddle": {
        staticallyKnownComponents: {
            tags: ["environmentTile", "waterTile"],
            c: {
                TypeComponent: {
                    displayName: "Puddle",
                    entityType: "puddle",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "water_1",
                    sprite: null,
                    zIndex: 3
                },
                TriggerComponent: {
                    currentTriggerType: TriggerType.ShallowWater,
                    initialTriggerType: TriggerType.ShallowWater
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0,
                    textureKey: "frozen_water"
                },
                RemoveAfterNTurnsComponent: {
                    turnsLeft: 30
                }
            }
        }
    },
    "water": {
        staticallyKnownComponents: {
            tags: ["environmentTile", "waterTile"],
            c: {
                TypeComponent: {
                    displayName: "Deep Water",
                    entityType: "water",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "deep_water",
                    sprite: null,
                    zIndex: 5
                },
                TriggerComponent: {
                    currentTriggerType: TriggerType.DeepWater,
                    initialTriggerType: TriggerType.DeepWater
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0,
                    textureKey: "frozen_water"
                }
            }
        }
    },
    "steam": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    displayName: "Steam",
                    entityType: "steam",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "sprite4691",
                    sprite: null,
                    zIndex: 10,
                    opacity: 0.6
                },
                // TODO, bug: Steam does not currently hurt you if you're standing still
                // in it
                TriggerComponent: {
                    currentTriggerType: TriggerType.Steam,
                    initialTriggerType: TriggerType.Steam
                },
                RemoveAfterNTurnsComponent: {
                    turnsLeft: 5
                }
            }
        }
    },
    "mud": {
        staticallyKnownComponents: {
            tags: ["environmentTile"],
            c: {
                TypeComponent: {
                    displayName: "Mud",
                    entityType: "mud",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "mud_1",
                    sprite: null,
                    zIndex: 5
                },
                TriggerComponent: {
                    currentTriggerType: TriggerType.Mud,
                    initialTriggerType: TriggerType.Mud
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0,
                    textureKey: "frozen_water"
                }
            }
        }
    },
    "fireball_rune": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    displayName: "Rune",
                    entityType: "fireball_rune",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "red_rune",
                    sprite: null,
                    zIndex: 5
                },
                TriggerComponent: {
                    currentTriggerType: TriggerType.Explosion,
                    initialTriggerType: TriggerType.Explosion
                }
            }
        }
    },
    "tall_grass": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    displayName: "Tall Grass",
                    entityType: "tall_grass",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "tall_grass_2",
                    sprite: null,
                    zIndex: 5
                },
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                },
                HitPointsComponent: {
                    hp: 10,
                    maxHp: 10,
                    onDeath: DeathType.RemoveFromWorld
                }
            }
        }
    },
    "thick_underbrush": {
        staticallyKnownComponents: {
            tags: ["blocksSight"],
            c: {
                TypeComponent: {
                    displayName: "Thick Bush",
                    entityType: "thick_underbrush",
                    race: null,
                    classification: "object"
                },
                GraphicsComponent: {
                    textureKey: "shrub_1",
                    sprite: null,
                    zIndex: 10
                },
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                },
                HitPointsComponent: {
                    hp: 5,
                    maxHp: 5,
                    onDeath: DeathType.RemoveFromWorld
                }
            }
        }
    },
    "player": {
        addInventory: true,
        addInput: true,
        spells: [
            ["lightning_bolt", 10],
        ],
        staticallyKnownComponents: {
            id: "player",
            tags: ["blocks", "input", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    displayName: "The Player",
                    entityType: "player",
                    race: "human",
                    classification: "player"
                },
                GraphicsComponent: {
                    textureKey: "player",
                    sprite: null,
                    zIndex: 8
                },
                LightingComponent: {
                    color: "white",
                    range: 7,
                    lightingType: LightingType.Player
                },
                ConfusableAIComponent: {
                    confused: false,
                    turnsLeft: 0
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
                    strength: 5,
                    defense: 2,
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
                    turnsLeft: 0,
                    textureKey: "ice_wall"
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                },
                SilenceableComponent: {
                    silenced: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "goblin": {
        addInventory: true,
        addPlannerAI: true,
        addDialogMemory: true,
        nonAlertSightRange: 6,
        alertSightRange: 8,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack",
            "goToSafePosition",
            "douseFireOnSelf",
            "alertAllies",
            "confusedWander"
        ],
        inventoryPool: [
            {
                itemID: "health_potion_weak",
                probability: 0.25
            }
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    displayName: "Goblin",
                    entityType: "goblin",
                    race: "goblin",
                    classification: "goblin"
                },
                GraphicsComponent: {
                    textureKey: "orc_body_1",
                    sprite: null,
                    zIndex: 5
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                ConfusableAIComponent: {
                    confused: false,
                    turnsLeft: 0
                },
                SpeedComponent: {
                    speed: BASE_SPEED,
                    maxTilesPerMove: 3
                },
                HitPointsComponent: {
                    hp: 30,
                    maxHp: 30,
                    onDeath: DeathType.Default
                },
                StatsComponent: {
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
                    turnsLeft: 0,
                    textureKey: "ice_wall"
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                },
                StunnableComponent: {
                    stunned: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "goblin_brute": {
        addInventory: true,
        addPlannerAI: true,
        addDialogMemory: true,
        nonAlertSightRange: 7,
        alertSightRange: 7,
        desiredDistanceToTarget: 1,
        actions: [
            "guard",
            "chase",
            "useHealingItem",
            "goToEnemy",
            "goToSafePosition",
            "meleeAttack",
            "douseFireOnSelf",
            "alertAllies",
            "confusedWander"
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
            tags: ["blocks", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    displayName: "Goblin Brute",
                    entityType: "goblin_brute",
                    race: "goblin",
                    classification: "goblin"
                },
                GraphicsComponent: {
                    textureKey: "orc_body_1",
                    sprite: null,
                    zIndex: 5
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                ConfusableAIComponent: {
                    confused: false,
                    turnsLeft: 0
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
                    turnsLeft: 0,
                    textureKey: "ice_wall"
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                },
                StunnableComponent: {
                    stunned: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "rat": {
        addPlannerAI: true,
        nonAlertSightRange: 5,
        alertSightRange: 6,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack",
            "goToSafePosition",
            "runAway",
            "douseFireOnSelf",
            "confusedWander"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    displayName: "Rat",
                    entityType: "rat",
                    race: "rat",
                    classification: "rat"
                },
                GraphicsComponent: {
                    textureKey: "rat",
                    sprite: null,
                    zIndex: 5
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                FearAIComponent: {
                    fear: 0,
                    isAfraidThreshold: 5,
                    isCowering: false
                },
                ConfusableAIComponent: {
                    confused: false,
                    turnsLeft: 0
                },
                SpeedComponent: {
                    speed: BASE_SPEED,
                    maxTilesPerMove: 5
                },
                HitPointsComponent: {
                    hp: 10,
                    maxHp: 10,
                    onDeath: DeathType.Default
                },
                StatsComponent: {
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
                    turnsLeft: 0,
                    textureKey: "ice_wall"
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                },
                StunnableComponent: {
                    stunned: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "eel": {
        addPlannerAI: true,
        nonAlertSightRange: 6,
        alertSightRange: 7,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "goToSafePosition",
            "meleeAttack",
            "confusedWander"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable", "aquatic"],
            c: {
                TypeComponent: {
                    displayName: "Eel",
                    entityType: "eel",
                    race: "eel",
                    classification: "eel"
                },
                GraphicsComponent: {
                    textureKey: "eel_1",
                    sprite: null,
                    zIndex: 5
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
                ConfusableAIComponent: {
                    confused: false,
                    turnsLeft: 0
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
                    turnsLeft: 0,
                    textureKey: "ice_wall"
                },
                StunnableComponent: {
                    stunned: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "lightning_bug": {
        addPlannerAI: true,
        nonAlertSightRange: 5,
        alertSightRange: 6,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack",
            "goToSafePosition",
            "runAway",
            "confusedWander"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    displayName: "Lightning Bug",
                    entityType: "lightning_bug",
                    race: "bug",
                    classification: "bug"
                },
                GraphicsComponent: {
                    textureKey: "lightning_bug",
                    sprite: null,
                    zIndex: 5
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                ConfusableAIComponent: {
                    confused: false,
                    turnsLeft: 0
                },
                FearAIComponent: {
                    fear: 0,
                    isAfraidThreshold: 5,
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
                DamageAffinityComponent: {
                    [DamageType.Physical]: Affinity.normal,
                    [DamageType.Fire]: Affinity.weak,
                    [DamageType.Electric]: Affinity.nullified,
                    [DamageType.Water]: Affinity.normal,
                    [DamageType.Nature]: Affinity.strong,
                    [DamageType.Ice]: Affinity.normal
                },
                FlammableComponent: {
                    onFire: false,
                    fireDamage: 0,
                    turnsLeft: 0
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0,
                    textureKey: "ice_wall"
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                },
                AreaOfEffectComponent: {
                    effectType: AreaOfEffectType.Electric,
                    damageType: DamageType.Electric,
                    damage: 10,
                    areaOfEffect: {
                        type: "circle",
                        radius: 3
                    }
                }
            }
        }
    },
    "bandit": {
        addInventory: true,
        addPlannerAI: true,
        addDialogMemory: true,
        nonAlertSightRange: 6,
        alertSightRange: 8,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "guard",
            "chase",
            "useHealingItem",
            "goToEnemy",
            "goToSafePosition",
            "runAway",
            "meleeAttack",
            "douseFireOnSelf",
            "alertAllies",
            "confusedWander"
        ],
        inventoryPool: [
            {
                itemID: "health_potion_weak",
                probability: 0.25
            }
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    displayName: "Bandit",
                    entityType: "bandit",
                    race: "human",
                    classification: "bandit"
                },
                GraphicsComponent: {
                    textureKey: "bandit_1",
                    sprite: null,
                    zIndex: 5
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
                ConfusableAIComponent: {
                    confused: false,
                    turnsLeft: 0
                },
                SpeedComponent: {
                    speed: BASE_SPEED,
                    maxTilesPerMove: 3
                },
                HitPointsComponent: {
                    hp: 30,
                    maxHp: 30,
                    onDeath: DeathType.Default
                },
                StatsComponent: {
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
                    turnsLeft: 0,
                    textureKey: "ice_wall"
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                },
                StunnableComponent: {
                    stunned: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "bandit_mage": {
        addInventory: true,
        addPlannerAI: true,
        addDialogMemory: true,
        nonAlertSightRange: 6,
        alertSightRange: 8,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 5,
        spells: [
            ["lightning_bolt", 3]
        ],
        actions: [
            "wander",
            "chase",
            "standby",
            "reposition",
            "useHealingItem",
            "useHealingSpell",
            "goToEnemy",
            "goToSafePosition",
            "runAway",
            "meleeAttack",
            "douseFireOnSelf",
            "alertAllies",
            "confusedWander"
        ],
        inventoryPool: [
            {
                itemID: "health_potion_weak",
                probability: 0.25
            }
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    displayName: "Bandit Mage",
                    entityType: "bandit_mage",
                    race: "human",
                    classification: "bandit"
                },
                GraphicsComponent: {
                    textureKey: "blue_mage_1",
                    sprite: null,
                    zIndex: 5
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
                ConfusableAIComponent: {
                    confused: false,
                    turnsLeft: 0
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
                    turnsLeft: 0,
                    textureKey: "ice_wall"
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                },
                SilenceableComponent: {
                    silenced: false,
                    turnsLeft: 0
                },
                StunnableComponent: {
                    stunned: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "bandit_white_mage": {
        addInventory: true,
        addPlannerAI: true,
        addDialogMemory: true,
        nonAlertSightRange: 6,
        alertSightRange: 8,
        lowHealthThreshold: 0.4,
        desiredDistanceToTarget: 5,
        spells: [
            ["heal_other", 2]
        ],
        actions: [
            "wander",
            "chase",
            "standby",
            "reposition",
            "useHealingItem",
            "useHealingSpell",
            "healAlly",
            "goToEnemy",
            "goToSafePosition",
            "runAway",
            "meleeAttack",
            "douseFireOnSelf",
            "alertAllies",
            "confusedWander"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    displayName: "Bandit White Mage",
                    entityType: "bandit_white_mage",
                    race: "human",
                    classification: "bandit"
                },
                GraphicsComponent: {
                    textureKey: "red_mage_1",
                    sprite: null,
                    zIndex: 5
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                FearAIComponent: {
                    fear: 0,
                    isAfraidThreshold: 30,
                    isCowering: false
                },
                ConfusableAIComponent: {
                    confused: false,
                    turnsLeft: 0
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
                    turnsLeft: 0,
                    textureKey: "ice_wall"
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                },
                SilenceableComponent: {
                    silenced: false,
                    turnsLeft: 0
                },
                StunnableComponent: {
                    stunned: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "dog": {
        addPlannerAI: true,
        addDialogMemory: true,
        nonAlertSightRange: 5,
        alertSightRange: 8,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack",
            "runAway",
            "confusedWander",
            "alertAllies"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    displayName: "Dog",
                    entityType: "dog",
                    race: "dog",
                    classification: "dog"
                },
                GraphicsComponent: {
                    textureKey: "dog",
                    sprite: null,
                    zIndex: 5
                },
                LoseTargetAIComponent: {
                    turnsWithTargetOutOfSight: 0,
                    loseTrackAfterNTurns: 6
                },
                ConfusableAIComponent: {
                    confused: false,
                    turnsLeft: 0
                },
                SpeedComponent: {
                    speed: BASE_SPEED,
                    maxTilesPerMove: 7
                },
                HitPointsComponent: {
                    hp: 20,
                    maxHp: 20,
                    onDeath: DeathType.Default
                },
                StatsComponent: {
                    strength: 5,
                    defense: 1,
                    criticalChance: 0.05,
                    criticalDamageMultiplier: 1.5,
                    ailmentSusceptibility: 0.1
                },
                LevelComponent: {
                    level: 3,
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
                    turnsLeft: 0,
                    textureKey: "ice_wall"
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                },
                StunnableComponent: {
                    stunned: false,
                    turnsLeft: 0
                }
            }
        }
    }
};

// Dynamically add spells to actions
for (const objectID in ObjectData) {
    const data = ObjectData[objectID];
    if (data.spells !== undefined && data.actions !== undefined) {
        for (let i = 0; i < data.spells.length; i++) {
            const spell = data.spells[i];
            data.actions.push(`castSpell_${spell[0]}`);
        }
    }
}

export type EntityTeamMap = Map<number, EntityTeam>;

/**
 * Facilitates the communication and giving orders of set teams
 * of entities.
 */
export class EntityTeam {
    state: "passive" | "attacking" | "retreating" = "passive";
    memberIds: string[] = [];
    /** Useful for checking if the team's commander was killed vs if they ever had one at all */
    createdWithCommander: boolean = false;
    commanderId: Nullable<string> = null;

    constructor(obj?: { [key: string]: any }) {
        if (obj !== undefined) {
            if (!("state" in obj) ||
                !("memberIds" in obj) ||
                !("createdWithCommander" in obj) ||
                !("commanderId" in obj)) {
                throw new Error("Missing data in Entity Team construction");
            }

            Object.assign(this, obj);
        }
    }

    /**
     * Remove dead team members
     */
    update() {
        if (this.commanderId !== null) {
            const commander = globals.Game?.ecs.getEntity(this.commanderId);
            if (commander === undefined) {
                this.commanderId = null;
            }
        }

        for (let i = 0; i < this.memberIds.length; i++) {
            const entity = globals.Game?.ecs.getEntity(this.memberIds[i]) ?? null;
            if (entity === null) {
                this.memberIds.splice(i, 1);
                continue;
            }

            const ai = entity.getOne(PlannerAIComponent);
            if (ai === undefined) {
                this.memberIds.splice(i, 1);
                continue;
            }
        }
    }

    /**
     * Update all members to know where the target is
     */
    alert() {
        for (let i = 0; i < this.memberIds.length; i++) {
            const entity = globals.Game?.ecs.getEntity(this.memberIds[i]);
            if (entity !== undefined) {
                const ai = entity.getOne(PlannerAIComponent);
                if (ai !== undefined) {
                    ai.knowsTargetPosition = true;
                    ai.currentOrder = "attack";
                    ai.update();
                }
            }
        }

        this.state = "attacking";
    }
}

/**
 * Update the hash map of entities and their tile positions
 */
export class UpdateEntityMapSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this.createQuery()
            .fromAll(PositionComponent)
            .persist();
    }

    update() {
        if (globals.Game === null) { throw new Error("Global game object is null"); }
        const entities = this.mainQuery.execute();
        globals.Game.entityMap.clear();

        for (const e of entities) {
            // TODO, Speed: JS doesn't have a hash set so you can't do a set of objects.
            // Write one so we don't have to use string keys
            const pos = e.getOne(PositionComponent)!.tilePosition;
            const key = `${pos.x},${pos.y}`;
            const val = globals.Game.entityMap.get(key) ?? [];
            val.push(e.id);
            globals.Game.entityMap.set(key, val);
        }
    }
}

/**
 * Remove entities with the RemoveAfterNTurnsComponent after they've
 * run out of turns
 */
export class RemoveAfterNTurnsSystem extends System {
    private query: Query;

    init() {
        this.query = this
            .createQuery()
            .fromAll(RemoveAfterNTurnsComponent)
            .persist();
    }

    update() {
        const entities = this.query.execute();
        for (const e of entities) {
            const turnData = e.getOne(RemoveAfterNTurnsComponent)!;
            turnData.turnsLeft--;

            if (turnData.turnsLeft === 0) {
                removeEntity(this.world, e);
            } else {
                turnData.update();
            }
        }
    }
}

/**
 * Use an entity type to grab component data and create a new Entity
 * and add it to the current ECS
 */
export function createEntity(
    ecs: World,
    textures: PIXI.ITextureDictionary,
    type: string,
    tilePosition?: Vector2D,
    id?: string,
    dataFromSave?: IEntityConfig
): Entity {
    if (globals.Game === null) { throw new Error("Global game is null"); }

    let hash = randomIntFromInterval(1, 2147483647);
    hash = hash & hash; // Convert to 32bit integer
    const entityId = id ?? `${type}-${hash.toString(16)}`;

    if (!(type in ObjectData)) { throw new Error(`${type} is not valid object id`); }
    const data = ObjectData[type];

    let entity: Entity;
    if (dataFromSave !== undefined) {
        entity = ecs.createEntity(assignIn(
            {},
            { id: entityId },
            dataFromSave
        ));

        // TODO, cleanup: We're breaking the rule here of components just as data and it's
        // coming back to bite us here. PlannerAIComponent needs to be rethought
        if (data?.addPlannerAI === true && entity.has(PlannerAIComponent) === true) {
            const aiState = entity.getOne(PlannerAIComponent)!;
            const { planner } = createPlanner(aiState.actions);
            aiState.planner = planner;
            aiState.update();
        }
    } else {
        entity = ecs.createEntity(assignIn(
            {},
            { id: entityId },
            data.staticallyKnownComponents
        ));

        if (data.spells !== undefined && entity.has(SpellsComponent) === false) {
            const spells: { [key: string]: KnownSpellData } = {};
            data.spells.forEach(s => {
                spells[s[0]] = { count: s[1], maxCount: s[1] };
            });
            entity.addComponent({ type: "SpellsComponent", knownSpells: spells });
        }

        if (data?.addInventory === true && entity.has(InventoryComponent) === false) {
            const inventory: Map<string, number> = new Map();

            if (data.inventoryPool !== undefined) {
                for (let i = 0; i < data.inventoryPool.length; i++) {
                    if (RNG.getUniform() <= data.inventoryPool[i].probability) {
                        inventory.set(data.inventoryPool[i].itemID, 1);
                    }
                }
            }

            entity.addComponent({ type: "InventoryComponent", inventory });
        }

        if (data?.addDialogMemory === true && entity.has(DialogMemoryComponent) === false) {
            const memory: Map<string, boolean> = new Map();

            const typeData = entity.getOne(TypeComponent);
            if (typeData !== undefined && typeData.classification !== null) {
                const dialogDefinitions = dialogByClassification[typeData.classification];
                if (dialogDefinitions !== undefined) {
                    for (const def of dialogDefinitions.rules) {
                        memory.set(`said_${def.name}`, false);
                    }
                }
            }

            entity.addComponent({ type: "DialogMemoryComponent", memory });
        }

        if (data?.addInput === true && entity.has(InputHandlingComponent) === false) {
            const keyCommands: KeyCommand[] = [
                { code: "KeyW", keyDisplay: "W", description: "Move Camera Up", continuous: true, command: moveCameraUp },
                { code: "KeyA", keyDisplay: "A", description: "Move Camera Left", continuous: true, command: moveCameraLeft },
                { code: "KeyS", keyDisplay: "S", description: "Move Camera Down", continuous: true, command: moveCameraDown },
                { code: "KeyD", keyDisplay: "D", description: "Move Camera Right", continuous: true, command: moveCameraRight },
                { code: "KeyQ", keyDisplay: "Q", description: "Camera Reset", continuous: false, command: cameraReset },
                { code: "KeyI", keyDisplay: "I", description: "Inventory", continuous: false, command: () => new OpenInventoryCommand() },
                { code: "KeyM", keyDisplay: "M", description: "Spell Menu", continuous: false, command: () => new OpenSpellsCommand() },
                { code: "KeyR", keyDisplay: "R", description: "Rotate Target Reticle", continuous: false, command: () => new RotateReticleCommand(entity.id) },
                { code: "Equal", keyDisplay: "Ctrl =", description: "Zoom In", continuous: false, command: zoomInCamera },
                { code: "Minus", keyDisplay: "Ctrl -", description: "Zoom Out", continuous: false, command: zoomOutCamera },
                { code: "KeyX", keyDisplay: "X", description: "Pass Turn", continuous: false, command: () => new NoOpCommand(true) }
            ];

            // TODO, cleanup: We're breaking the rule here of components just as data and it's
            // coming back to bite us here. InputHandlingComponent needs to be rethought
            entity.addComponent({
                type: "InputHandlingComponent",
                state: PlayerState.Combat,
                reticleRotation: 0,
                keyCommands,
                itemForTarget: null,
                spellForTarget: null
            });
        }

        if (data?.addPlannerAI === true &&
            data.actions !== undefined &&
            entity.has(PlannerAIComponent) === false) {
            const actions: Set<string> = new Set(data.actions);
            const { goals, planner } = createPlanner(actions);

            entity.addComponent({
                type: "PlannerAIComponent",
                nonAlertSightRange: data?.nonAlertSightRange ?? 5,
                alertSightRange: data?.alertSightRange ?? 5,
                desiredDistanceToTarget: data?.desiredDistanceToTarget ?? 1,
                planner,
                targetId: "player", // TODO: generic target selection
                teamId: null,
                previousWorldState: {},
                currentAction: null,
                currentOrder: "attack",
                goals,
                actions,
                lowHealthThreshold: data.lowHealthThreshold ?? 0.25,
                knowsTargetPosition: false,
                hasTargetInSight: false,
                wanderBounds: null
            });
        }
    }

    if (tilePosition !== undefined && entity.has(PositionComponent) === false) {
        entity.addComponent({
            type: "PositionComponent",
            worldPosition: globals.Game.gameCamera.tilePositionToWorld(tilePosition),
            tilePosition
        });
    }

    const graphics = entity.getOne(GraphicsComponent);
    if (graphics !== undefined && graphics.textureKey === null) {
        graphics.sprite = new PIXI.Sprite();
        globals.Game.pixiApp.stage.addChild(graphics.sprite);
    } else if (graphics !== undefined && graphics.textureKey !== null) {
        graphics.sprite = new PIXI.Sprite(textures[graphics.textureKey]);
        globals.Game.pixiApp.stage.addChild(graphics.sprite);
    }

    setUpParticleComponentEmitter(entity);

    return entity;
}

export function removeEntity(ecs: World, entity: Entity) {
    if (globals.Game === null) { throw new Error("Global game is null"); }

    const particleData = entity.getOne(ParticleEmitterComponent);
    if (particleData !== undefined) {
        particleData.emitter?.destroy();
        entity.removeComponent(particleData);
    }

    // TODO, sound: define these sounds in data on the entity or fighter instance or something
    const typeData = entity.getOne(TypeComponent);
    if (typeData?.entityType === "crate") {
        playBoxBreak();
    }
    if (typeData?.entityType === "barrel") {
        playBoxBreak();
    }

    const graphicData = entity.getOne(GraphicsComponent);
    if (graphicData !== undefined && graphicData.sprite !== null) {
        globals.Game.pixiApp.stage.removeChild(graphicData.sprite);
        graphicData.sprite.visible = false;
        graphicData.sprite.destroy();
        graphicData.sprite = null;
    }
    ecs.removeEntity(entity);
}
