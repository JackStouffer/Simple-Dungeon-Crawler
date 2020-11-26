import { World, Component, Entity, EntityRef, System, Query } from "ape-ecs";

import { RNG } from "./rot/index";

import { Affinity, BASE_SPEED, DamageType, DeathType, InteractableType, LightingType, ObjectData, SpellDataDetails, TriggerType } from "./data";
import { Nullable } from "./util";
import { KeyCommand, PlayerState } from "./input-handler";
import { InventoryItemDetails } from "./inventory";
import { Planner, PlannerWorldState } from "./ai/planner";
import { NoOpCommand, OpenInventoryCommand, OpenSpellsCommand, RotateReticleCommand } from "./commands";
import { createPlanner } from "./ai/components";

export class PositionComponent extends Component {
    x: number;
    y: number;

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
    mana: number;
    maxMana: number;
    strength: number;
    defense: number;
    criticalChance: number;
    criticalDamageMultiplier: number;
    ailmentSusceptibility: number;

    static properties = {
        mana: 100,
        maxMana: 100,
        strength: 5,
        defense: 1,
        criticalChance: 0.05,
        criticalDamageMultiplier: 1.5,
        ailmentSusceptibility: 0.1
    }
}

export class StatsEffectComponent extends Component {
    name: string;
    stat: "mana" | "maxMana" | "strength" | "defense" | "criticalChance" | "criticalDamageMultiplier" | "ailmentSusceptibility";
    modifierType: "multiply" | "add";
    turnsLeft: number;
    value: number;

    static properties = {
        name: "",
        stat: "mana",
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
    knownSpells: Set<string>;

    static properties = {
        knownSpells: null
    }
}

export class PlannerAIComponent extends Component {
    target: Entity;
    sightRange: number;
    planner: Planner;
    previousWorldState: PlannerWorldState;
    currentAction: Nullable<string>;
    currentOrder: string;
    goals: Set<string>;
    actions: Set<string>;
    lowHealthThreshold: number;
    lowManaThreshold: number;
    knowsTargetPosition: boolean;
    hasTargetInSight: boolean;

    static properties = {
        target: EntityRef,
        sightRange: 7,
        previousWorldState: {},
        currentAction: null,
        currentOrder: "attack",
        goals: null,
        actions: null,
        lowHealthThreshold: 0.25,
        lowManaThreshold: 0.25,
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
    isCowering: boolean;

    static properties = {
        fear: 0,
        fearThreshold: 10,
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

/**
 * Use an entity type to grab component data and create a new Entity
 */
export function createEntity(
    ecs: World,
    type: string,
    x: Nullable<number>,
    y: Nullable<number>,
    id?: number
): Entity {
    if (!(type in ObjectData)) { throw new Error(`${type} is not valid object id`); }

    const data = ObjectData[type];
    if (id !== undefined) {
        data.staticallyKnownComponents.id = id.toString(10);
    }

    const entity = ecs.createEntity(data.staticallyKnownComponents);

    if (x !== null && y !== null && entity.has(PositionComponent) === false) {
        entity.addComponent({ type: PositionComponent, x, y });
    }

    if (data.spells !== undefined && entity.has(SpellsComponent) === false) {
        entity.addComponent({ type: SpellsComponent, knownSpells: new Set(data.spells) });
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

        entity.addComponent({ type: InventoryComponent, inventory });
    }

    if (data?.addInput === true && entity.has(InputHandlingComponent) === false) {
        const keyCommands: KeyCommand[] = [
            { key: "i", description: "Inventory", command: new OpenInventoryCommand() },
            { key: "m", description: "Spell Menu", command: new OpenSpellsCommand() },
            { key: "r", description: "Rotate Target Reticle", command: new RotateReticleCommand() },
            { key: "x", description: "Do Nothing", command: new NoOpCommand(true) }
        ];

        entity.addComponent({
            type: InputHandlingComponent,
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
            type: PlannerAIComponent,
            sightRange: data?.sightRange ?? 5,
            planner,
            previousWorldState: {},
            currentAction: null,
            currentOrder: "attack",
            goals,
            actions,
            lowHealthThreshold: 0.25,
            lowManaThreshold: 0.25,
            knowsTargetPosition: false,
            hasTargetInSight: false
        });
    }

    return entity;
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
