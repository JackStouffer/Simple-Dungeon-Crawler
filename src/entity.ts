import { World, Component, Entity, EntityRef, System, Query, IEntityConfig } from "ape-ecs";
import { assignIn } from "lodash";
import * as PIXI from "pixi.js";

import { RNG } from "./rot/index";

import globals from "./globals";
import {
    Affinity,
    BASE_SPEED,
    DamageType,
    DeathType,
    LightingType,
    InteractableType,
    TriggerType
} from "./constants";
import { Nullable, randomIntFromInterval } from "./util";
import { KeyCommand, PlayerState } from "./input-handler";
import { dialogByClassification } from "./ai/dialog";
import { Planner, PlannerWorldState } from "./ai/planner";
import { createPlanner } from "./ai/commands";
import {
    NoOpCommand,
    OpenInventoryCommand,
    OpenSpellsCommand,
    RotateReticleCommand
} from "./commands";
import { ItemDataDetails, SpellDataDetails } from "./skills";
import { Point } from "./map";

export type EntityMap = Map<string, Entity[]>;

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
    // World coords
    x: number;
    y: number;

    // Tile coords
    tileX: number;
    tileY: number;

    static typeName = "PositionComponent";
    static properties = {
        x: 0,
        y: 0,
        tileX: 0,
        tileY: 0
    }

    tilePosition(): Point {
        return {
            x: this.tileX,
            y: this.tileY
        };
    }
}

export class TypeComponent extends Component {
    entityType: string;
    race: Nullable<string>;
    classification: string;

    static typeName = "TypeComponent";
    static properties = {
        entityType: "player",
        race: "human",
        classification: "player"
    }
}

export class DisplayNameComponent extends Component {
    name: string;

    static typeName = "DisplayNameComponent";
    static properties = {
        name: "player"
    }
}

export class GraphicsComponent extends Component {
    textureKey: string;
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

export class ChestGraphicsComponent extends Component {
    textureKey: string;
    openTextureKey: string;
    sprite: Nullable<PIXI.Sprite>;
    opacity: number;
    zIndex: number;

    static typeName = "ChestGraphicsComponent";
    static properties = {
        textureKey: "",
        openTextureKey: "",
        sprite: null,
        opacity: 1,
        zIndex: 10
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

    static typeName = "SpeedEffectComponent";
    static properties = {
        name: "",
        stat: "speed",
        modifierType: "add",
        turnsLeft: 0,
        value: 0
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

export class SpellsComponent extends Component {
    knownSpells: Map<string, number>;

    static typeName = "SpellsComponent";
    static properties = {
        knownSpells: null
    }
}

export class PlannerAIComponent extends Component {
    // TODO: This should be the target's id, no entity refs across frames
    target: Nullable<Entity>;
    teamId: Nullable<number>;
    sightRange: number;
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

    static typeName = "PlannerAIComponent";
    static properties = {
        target: EntityRef,
        teamId: null,
        sightRange: 7,
        planner: null,
        previousWorldState: {},
        currentAction: null,
        currentOrder: "attack",
        goals: null,
        actions: null,
        lowHealthThreshold: 0.25,
        desiredDistanceToTarget: 1,
        knowsTargetPosition: false,
        hasTargetInSight: false
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
    fearThreshold: number;
    runAwayTarget: Nullable<Point>;
    isCowering: boolean;

    static typeName = "FearAIComponent";
    static properties = {
        fear: 0,
        fearThreshold: 10,
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
    patrolTarget: Nullable<Entity>;

    static typeName = "PatrolAIComponent";
    static properties = {
        patrolTarget: EntityRef
    }
}

export class PatrolPathComponent extends Component {
    next: Nullable<Entity>;

    static typeName = "PatrolPathComponent";
    static properties = {
        next: EntityRef
    }
}

export class ConfusedAIComponent extends Component {
    turnsLeft: number;

    static typeName = "ConfusedAIComponent";
    static properties = {
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

export class TriggerTypeComponent extends Component {
    triggerType: TriggerType;

    static typeName = "TriggerTypeComponent";
    static properties = {
        triggerType: null
    }
}

export class FireTriggerComponent extends Component {
    effectTurns: number;
    effectDamage: number;
    damage: number;

    static typeName = "FireTriggerComponent";
    static properties = {
        effectTurns: 0,
        effectDamage: 0,
        damage: 0
    }
}

export class EventTriggerComponent extends Component {
    event: string;

    static typeName = "EventTriggerComponent";
    static properties = {
        event: ""
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
    sightRange?: number;
    spells?: [string, number][];
    actions?: string[];
    lowHealthThreshold?: number;
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
                TypeComponent: {
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
                DisplayNameComponent: {
                    name: "Door to new area"
                },
                TypeComponent: {
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
                DisplayNameComponent: {
                    name: "Stairs"
                },
                TypeComponent: {
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
                DisplayNameComponent: {
                    name: "Chest"
                },
                TypeComponent: {
                    entityType: "chest",
                    race: null,
                    classification: "object"
                },
                ChestGraphicsComponent: {
                    textureKey: "chest_1_closed",
                    openTextureKey: "chest_1_open",
                    sprite: null,
                    zIndex: 5
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
                    entityType: "crate",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Wooden Crate"
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
                    entityType: "barrel",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Wooden Barrel"
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
                    entityType: "dead_body",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Dead Body"
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
                    entityType: "lantern",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Small Lantern"
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
                    entityType: "campfire",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Small Campfire"
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
                    entityType: "fire_effect",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Fire"
                },
                GraphicsComponent: {
                    textureKey: "campfire_1_lit_1",
                    sprite: null,
                    zIndex: 8
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
                    entityType: "ice_wall",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Ice Wall"
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
                    entityType: "dropped_item",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Dropped Item"
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
                    entityType: "magic_shrine",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Magicka Shrine"
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
                    entityType: "event_trigger",
                    race: null,
                    classification: "trigger"
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.Event
                }
            }
        }
    },
    "shallow_water": {
        staticallyKnownComponents: {
            tags: ["environmentTile", "waterTile"],
            c: {
                TypeComponent: {
                    entityType: "shallow_water",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Water"
                },
                GraphicsComponent: {
                    textureKey: "water_1",
                    sprite: null,
                    zIndex: 5
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.ShallowWater
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
                    entityType: "puddle",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Puddle"
                },
                GraphicsComponent: {
                    textureKey: "water_1",
                    sprite: null,
                    zIndex: 5
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.ShallowWater
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
                    entityType: "water",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Deep Water"
                },
                GraphicsComponent: {
                    textureKey: "deep_water",
                    sprite: null,
                    zIndex: 5
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.DeepWater
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
                    entityType: "steam",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Steam"
                },
                GraphicsComponent: {
                    textureKey: "sprite4691",
                    sprite: null,
                    zIndex: 10,
                    opacity: 0.6
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.Steam
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
                    entityType: "mud",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Mud"
                },
                GraphicsComponent: {
                    textureKey: "mud_1",
                    sprite: null,
                    zIndex: 5
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.Mud
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0,
                    textureKey: "frozen_water"
                }
            }
        }
    },
    "tall_grass": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "tall_grass",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Tall Grass"
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
                    entityType: "thick_underbrush",
                    race: null,
                    classification: "object"
                },
                DisplayNameComponent: {
                    name: "Underbrush"
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
                    hp: 10,
                    maxHp: 10,
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
                    entityType: "player",
                    race: "human",
                    classification: "player"
                },
                DisplayNameComponent: {
                    name: "The Player"
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
        sightRange: 7,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack",
            "goToSafePosition",
            "douseFireOnSelf",
            "alertAllies"
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
                    entityType: "goblin",
                    race: "goblin",
                    classification: "goblin"
                },
                DisplayNameComponent: {
                    name: "Goblin"
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
        sightRange: 10,
        desiredDistanceToTarget: 1,
        actions: [
            "guard",
            "chase",
            "useHealingItem",
            "goToEnemy",
            "goToSafePosition",
            "meleeAttack",
            "douseFireOnSelf",
            "alertAllies"
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
                    entityType: "goblin_brute",
                    race: "goblin",
                    classification: "goblin"
                },
                DisplayNameComponent: {
                    name: "Goblin Brute"
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
        sightRange: 5,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack",
            "goToSafePosition",
            "runAway",
            "douseFireOnSelf"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    entityType: "rat",
                    race: "rat",
                    classification: "rat"
                },
                DisplayNameComponent: {
                    name: "Rat"
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
        sightRange: 9,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "goToSafePosition",
            "meleeAttack"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable", "aquatic"],
            c: {
                TypeComponent: {
                    entityType: "eel",
                    race: "eel",
                    classification: "eel"
                },
                DisplayNameComponent: {
                    name: "Eel"
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
    "bandit": {
        addInventory: true,
        addPlannerAI: true,
        addDialogMemory: true,
        sightRange: 10,
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
            "alertAllies"
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
                    entityType: "bandit",
                    race: "human",
                    classification: "bandit"
                },
                DisplayNameComponent: {
                    name: "Bandit"
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
        sightRange: 8,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 5,
        spells: [
            ["lightning_bolt", 3],
            ["lesser_heal", 1]
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
            "alertAllies"
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
                    entityType: "bandit_mage",
                    race: "human",
                    classification: "bandit"
                },
                DisplayNameComponent: {
                    name: "Bandit Mage"
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
                    isAfraidThreshold: 30,
                    isCowering: false
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
        sightRange: 8,
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
            "alertAllies"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    entityType: "bandit_white_mage",
                    race: "human",
                    classification: "bandit"
                },
                DisplayNameComponent: {
                    name: "Bandit White Mage"
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
        sightRange: 7,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack",
            "runAway"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient", "moveable"],
            c: {
                TypeComponent: {
                    entityType: "dog",
                    race: "dog",
                    classification: "dog"
                },
                DisplayNameComponent: {
                    name: "Dog"
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
    commanderId: Nullable<string> = null;

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
            const pos = e.getOne(PositionComponent)!.tilePosition();
            const key = `${pos.x},${pos.y}`;
            const val = globals.Game.entityMap.get(key) ?? [];
            val.push(e);
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

export class UpdateEntityTeamsSystem extends System {
    update() {
        // TODO, cleanup: Iterator "each" function
        for (const team of globals.Game!.entityTeams.values()) {
            team.update();
        }
    }
}

/**
 * Use an entity type to grab component data and create a new Entity
 */
export function createEntity(
    ecs: World,
    textures: PIXI.ITextureDictionary,
    type: string,
    x: Nullable<number>,
    y: Nullable<number>,
    id?: string
): Entity {
    if (globals.Game === null) { throw new Error("Global game is null"); }
    if (!(type in ObjectData)) { throw new Error(`${type} is not valid object id`); }

    let hash = randomIntFromInterval(1, 2147483647);
    hash = hash & hash; // Convert to 32bit integer
    const entityId = id ?? `${type}-${hash.toString(16)}`;

    const data = ObjectData[type];
    const entity = ecs.createEntity(assignIn({}, { id: entityId }, data.staticallyKnownComponents));

    if (x !== null && y !== null && entity.has(PositionComponent) === false) {
        const { x: wx, y: wy } = globals.Game.gameCamera.tilePositionToWorld(x, y);
        entity.addComponent({
            type: "PositionComponent",
            x: wx,
            y: wy,
            tileX: x,
            tileY: y
        });
    }

    const graphics = entity.getOne(GraphicsComponent) ?? entity.getOne(ChestGraphicsComponent);
    if (graphics !== undefined) {
        graphics.sprite = new PIXI.Sprite(textures[graphics.textureKey]);
        globals.Game.pixiApp.stage.addChild(graphics.sprite);
    }

    if (data.spells !== undefined && entity.has(SpellsComponent) === false) {
        const spells = new Map();
        data.spells.forEach(s => spells.set(s[0], s[1]));
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
        if (typeData !== undefined) {
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
            { key: "i", description: "Inventory", command: () => new OpenInventoryCommand() },
            { key: "m", description: "Spell Menu", command: () => new OpenSpellsCommand() },
            { key: "r", description: "Rotate Target Reticle", command: () => new RotateReticleCommand(entity) },
            { key: "x", description: "Pass Turn", command: () => new NoOpCommand(true) }
        ];

        entity.addComponent({
            type: "InputHandlingComponent",
            state: PlayerState.Combat,
            reticleRotation: 0,
            keyCommands,
            itemForTarget: null,
            spellForTarget: null
        });
    }

    if (data?.addPlannerAI === true && data.actions !== undefined) {
        const actions: Set<string> = new Set(data.actions);
        const { goals, planner } = createPlanner(actions);

        entity.addComponent({
            type: "PlannerAIComponent",
            sightRange: data?.sightRange ?? 5,
            desiredDistanceToTarget: data?.desiredDistanceToTarget ?? 1,
            planner,
            target: ecs.getEntity("player"), // TODO: generic target selection
            teamId: null,
            previousWorldState: {},
            currentAction: null,
            currentOrder: "attack",
            goals,
            actions,
            lowHealthThreshold: data.lowHealthThreshold ?? 0.25,
            knowsTargetPosition: false,
            hasTargetInSight: false
        });
    }

    return entity;
}

export function removeEntity(ecs: World, entity: Entity) {
    if (globals.Game === null) { throw new Error("Global game is null"); }

    const graphicData = entity.getOne(GraphicsComponent) ?? entity.getOne(ChestGraphicsComponent);
    if (graphicData !== undefined && graphicData.sprite !== null) {
        globals.Game.pixiApp.stage.removeChild(graphicData.sprite);
        graphicData.sprite.visible = false;
        graphicData.sprite.destroy();
        graphicData.sprite = null;
    }
    ecs.removeEntity(entity);
}
