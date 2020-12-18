import { World, Component, Entity, EntityRef, System, Query, IEntityConfig } from "ape-ecs";
import { assignIn } from "lodash";

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
import { InventoryItemDetails } from "./inventory";
import { Planner, PlannerWorldState } from "./ai/planner";
import {
    NoOpCommand,
    OpenInventoryCommand,
    OpenSpellsCommand,
    RotateReticleCommand
} from "./commands";
import { createPlanner } from "./ai/commands";
import { SpellDataDetails } from "./skills";
import { Point } from "./map";

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
    x: number;
    y: number;

    static typeName = "PositionComponent";
    static properties = {
        x: 0,
        y: 0
    }
}

export class TypeComponent extends Component {
    entityType: string;

    static properties = {
        entityType: "player"
    }
}

export class DisplayNameComponent extends Component {
    name: string;

    static properties = {
        name: "player"
    }
}

export class GraphicsComponent extends Component {
    char: string;
    fgColor: string;
    bgColor: Nullable<string>;

    static properties = {
        char: "",
        bgColor: null,
        fgColor: null
    }
}

export class ChestGraphicsComponent extends Component {
    char: string;
    fgColor: string;
    bgColor: string;
    emptyColor: string;

    static properties = {
        char: "*",
        bgColor: "white",
        fgColor: "brown",
        emptyColor: "purple"
    }
}

export class LightingComponent extends Component {
    color: string;
    range: number;
    lightingType: LightingType;

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

    static properties = {
        inventory: new Map()
    }
}

export class HitPointsComponent extends Component {
    hp: number;
    maxHp: number;
    onDeath: DeathType;

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

    static properties = {
        knownSpells: null
    }
}

export class PlannerAIComponent extends Component {
    target: Nullable<Entity>;
    sightRange: number;
    planner: Planner;
    previousWorldState: PlannerWorldState;
    currentAction: Nullable<string>;
    currentOrder: string;
    goals: Set<string>;
    actions: Set<string>;
    lowHealthThreshold: number;
    desiredDistanceToTarget: number;
    knowsTargetPosition: boolean;
    hasTargetInSight: boolean;

    static typeName = "PlannerAIComponent";
    static properties = {
        target: EntityRef,
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

    static properties = {
        isAtFallbackPosition: false,
        fallbackPosition: EntityRef
    }
}

export class PatrolAIComponent extends Component {
    patrolTarget: any;

    static properties = {
        patrolTarget: EntityRef
    }
}

export class PatrolPathComponent extends Component {
    next: any;

    static properties = {
        next: EntityRef
    }
}

export class ConfusedAIComponent extends Component {
    turnsLeft: number;

    static properties = {
        turnsLeft: 0
    }
}

export class InputHandlingComponent extends Component {
    state: PlayerState;
    reticleRotation: 0 | 90 | 180 | 270;
    keyCommands: KeyCommand[];
    itemForTarget: Nullable<InventoryItemDetails>;
    spellForTarget: Nullable<SpellDataDetails>;

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

    static properties = {
        frozen: false,
        turnsLeft: 0
    }
}

export class FlammableComponent extends Component {
    onFire: boolean;
    fireDamage: number;
    turnsLeft: number;

    static properties = {
        onFire: false,
        fireDamage: 0,
        turnsLeft: 1
    }
}

export class WetableComponent extends Component {
    wet: boolean;
    turnsLeft: number;

    static properties = {
        wet: false,
        turnsLeft: 0
    }
}

export class SilenceableComponent extends Component {
    silenced: boolean;
    turnsLeft: number;

    static properties = {
        silenced: false,
        turnsLeft: 0
    }
}

export class TriggerTypeComponent extends Component {
    triggerType: TriggerType;

    static properties = {
        triggerType: null
    }
}

export class FireTriggerComponent extends Component {
    effectTurns: number;
    effectDamage: number;
    damage: number;

    static properties = {
        effectTurns: 0,
        effectDamage: 0,
        damage: 0
    }
}

export class EventTriggerComponent extends Component {
    event: string;

    static properties = {
        event: ""
    }
}

export class InteractableTypeComponent extends Component {
    interactableType: InteractableType;

    static properties = {
        interactableType: InteractableType.Door
    };
}

export class LoadLevelComponent extends Component {
    levelName: string;

    static properties = {
        levelName: ""
    };
}

export class RemoveAfterNTurnsComponent extends Component {
    turnsLeft: number;

    static properties = {
        turnsLeft: 0
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
    desiredDistanceToTarget?: number;
    sightRange?: number;
    spells?: [string, number][];
    actions?: string[];
    lowHealthThreshold?: number;
    inventoryPool?: InventoryPoolProbabilities[];
    staticallyKnownComponents: IEntityConfig;
}

const ObjectData: { [key: string]: ObjectDataDetails } = {
    "door": {
        staticallyKnownComponents: {
            tags: ["blocks", "blocksSight"],
            c: {
                DisplayNameComponent: {
                    name: "Door"
                },
                TypeComponent: {
                    entityType: "door"
                },
                GraphicsComponent: {
                    char: "\u1882",
                    fgColor: "white",
                    bgColor: "brown"
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
                TypeComponent: {
                    entityType: "load_door"
                },
                GraphicsComponent: {
                    char: "\u1882",
                    fgColor: "white",
                    bgColor: "black",
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
                    entityType: "stairs"
                },
                GraphicsComponent: {
                    char: "\u1750",
                    fgColor: "white",
                    bgColor: "black",
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
                TypeComponent: {
                    entityType: "crate"
                },
                DisplayNameComponent: {
                    name: "Wooden Crate"
                },
                GraphicsComponent: {
                    char: "\u2612",
                    fgColor: "white",
                    bgColor: "brown"
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
                TypeComponent: {
                    entityType: "barrel"
                },
                DisplayNameComponent: {
                    name: "Wooden Barrel"
                },
                GraphicsComponent: {
                    char: "\u232D",
                    fgColor: "white",
                    bgColor: "brown",
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
    "puddle": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "puddle"
                },
                DisplayNameComponent: {
                    name: "Puddle"
                },
                GraphicsComponent: {
                    char: ".",
                    fgColor: "blue",
                    bgColor: "lightblue",
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.ShallowWater
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0
                },
                RemoveAfterNTurnsComponent: {
                    turnsLeft: 25
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
    "mud": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "mud"
                },
                DisplayNameComponent: {
                    name: "Mud"
                },
                GraphicsComponent: {
                    char: ".",
                    fgColor: "tan",
                    bgColor: "brown"
                },
                TriggerTypeComponent: {
                    triggerType: TriggerType.Mud
                },
                FreezableComponent: {
                    frozen: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "tall_grass": {
        staticallyKnownComponents: {
            c: {
                TypeComponent: {
                    entityType: "tall_grass"
                },
                DisplayNameComponent: {
                    name: "Tall Grass"
                },
                GraphicsComponent: {
                    char: "\u15D0",
                    fgColor: "green",
                    bgColor: null
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
            ["fireball", 10],
            ["lesser_heal", 5]
        ],
        staticallyKnownComponents: {
            id: "player",
            tags: ["blocks", "input", "sentient"],
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
        sightRange: 7,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
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
            tags: ["blocks", "sentient"],
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
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "goblin_brute": {
        addInventory: true,
        addPlannerAI: true,
        sightRange: 10,
        desiredDistanceToTarget: 1,
        actions: [
            "guard",
            "chase",
            "useHealingItem",
            "goToEnemy",
            "goToSafePosition",
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
            tags: ["blocks", "sentient"],
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
                },
                WetableComponent: {
                    wet: false,
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
            "runAway"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient"],
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
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "water_sprite": {
        addPlannerAI: true,
        sightRange: 9,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "wander",
            "chase",
            "goToEnemy",
            "meleeAttack"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient"],
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
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 1,
        actions: [
            "guard",
            "chase",
            "useHealingItem",
            "goToEnemy",
            "goToSafePosition",
            "runAway",
            "meleeAttack"
        ],
        inventoryPool: [
            {
                itemID: "health_potion_weak",
                probability: 0.25
            }
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient"],
            c: {
                TypeComponent: {
                    entityType: "bandit"
                },
                DisplayNameComponent: {
                    name: "Bandit"
                },
                GraphicsComponent: {
                    char: "b",
                    fgColor: "brown",
                    bgColor: null
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
                },
                WetableComponent: {
                    wet: false,
                    turnsLeft: 0
                }
            }
        }
    },
    "bandit_mage": {
        addInventory: true,
        addPlannerAI: true,
        sightRange: 8,
        lowHealthThreshold: 0.5,
        desiredDistanceToTarget: 5,
        spells: [
            ["fireball", 3],
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
            "meleeAttack"
        ],
        inventoryPool: [
            {
                itemID: "health_potion_weak",
                probability: 0.25
            }
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient"],
            c: {
                TypeComponent: {
                    entityType: "bandit_mage"
                },
                DisplayNameComponent: {
                    name: "Bandit Mage"
                },
                GraphicsComponent: {
                    char: "b",
                    fgColor: "blue",
                    bgColor: null,
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
                    turnsLeft: 0
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
    "bandit_white_mage": {
        addInventory: true,
        addPlannerAI: true,
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
            "meleeAttack"
        ],
        staticallyKnownComponents: {
            tags: ["blocks", "sentient"],
            c: {
                TypeComponent: {
                    entityType: "bandit_white_mage"
                },
                DisplayNameComponent: {
                    name: "Bandit White Mage"
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
                    turnsLeft: 0
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

/**
 * Use an entity type to grab component data and create a new Entity
 */
export function createEntity(
    ecs: World,
    type: string,
    x: Nullable<number>,
    y: Nullable<number>,
    id?: string
): Entity {
    if (!(type in ObjectData)) { throw new Error(`${type} is not valid object id`); }

    let hash = randomIntFromInterval(1, 2147483647);
    hash = hash & hash; // Convert to 32bit integer
    const entityId = id ?? `${type}-${hash.toString(16)}`;

    const data = ObjectData[type];
    const entity = ecs.createEntity(assignIn({}, { id: entityId }, data.staticallyKnownComponents));

    if (x !== null && y !== null && entity.has(PositionComponent) === false) {
        entity.addComponent({ type: "PositionComponent", x, y });
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

    if (data?.addInput === true && entity.has(InputHandlingComponent) === false) {
        const keyCommands: KeyCommand[] = [
            { key: "i", description: "Inventory", command: new OpenInventoryCommand() },
            { key: "m", description: "Spell Menu", command: new OpenSpellsCommand() },
            { key: "r", description: "Rotate Target Reticle", command: new RotateReticleCommand() },
            { key: "x", description: "Do Nothing", command: new NoOpCommand(true) }
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
            const pos = e.getOne(PositionComponent)!;
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
                e.destroy();
            } else {
                turnData.update();
            }
        }
    }
}
