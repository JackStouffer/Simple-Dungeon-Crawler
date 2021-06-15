import { Entity, World } from "ape-ecs";
import { Affinity, DamageType, ItemType, SpellType, TriggerType } from "../constants";
import {
    ConfusedAIComponent,
    EntityMap,
    FallbackAIComponent,
    FearAIComponent,
    FireTriggerComponent,
    FlammableComponent,
    HitPointsComponent,
    InventoryComponent,
    PlannerAIComponent,
    PositionComponent,
    SilenceableComponent,
    SpellsComponent,
    TriggerTypeComponent
} from "../entity";
import { getEffectiveDamageAffinity, getEffectiveHitPointData, getKnownSpells } from "../fighter";
import globals from "../globals";
import { getItems } from "../inventory";
import { distanceBetweenPoints, getEntitiesAtLocation, Point } from "../map";
import { DIRS } from "../rot";
import { SpellData } from "../skills";
import { Nullable } from "../util";

function resolveTargetPositionKnown(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    return aiState?.knowsTargetPosition === true ? true : false;
}

function resolveTargetInLOS(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    return aiState?.hasTargetInSight === true ? true : false;
}

function resolveNextToTarget(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    if (aiState === undefined || aiState.target === null) {
        throw new Error(`Entity ${ai.id} is missing a target`);
    }

    const pos = ai.getOne(PositionComponent);
    const targetPos = aiState.target.getOne(PositionComponent);
    if (pos === undefined || targetPos === undefined) {
        throw new Error(`Entity ${ai.id} is missing data for resolveNextToTarget`);
    }
    return distanceBetweenPoints(pos.tilePosition(), targetPos.tilePosition()) < 1.5;
}

function resolveAtDesiredDistance(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    if (aiState === undefined || aiState.target === null) {
        throw new Error(`Entity ${ai.id} is missing a target`);
    }

    const pos = ai.getOne(PositionComponent);
    const targetPos = aiState.target.getOne(PositionComponent);
    if (pos === undefined || targetPos === undefined) {
        throw new Error(`Entity ${ai.id} is missing data for resolveNextToTarget`);
    }

    const distance = distanceBetweenPoints(pos.tilePosition(), targetPos.tilePosition());
    return Math.floor(distance) === aiState.desiredDistanceToTarget;
}

function resolveEnoughCastsForSpellGenerator(spellID: string): GoalResolver {
    return function (ecs: World, entityMap: EntityMap, ai: Entity): boolean {
        const spellData = ai.getOne(SpellsComponent);
        if (spellData === undefined) { return false; }

        return (spellData.knownSpells.get(spellID) ?? -1) > 0;
    };
}

function resolveLowHealth(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const hpData = getEffectiveHitPointData(ai);
    const aiState = ai.getOne(PlannerAIComponent);
    if (hpData === null || aiState === undefined) { return false; }

    return (hpData.hp / hpData.maxHp) <= aiState.lowHealthThreshold;
}

export function resolveHasHealingItem(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const inventoryData = ai.getOne(InventoryComponent);
    if (inventoryData === undefined) { return false; }

    const healthItems = getItems(inventoryData)
        .filter(i => i.type === ItemType.HealSelf);
    return healthItems.length > 0;
}

export function resolveKnowsHealSelfSpell(
    ecs: World,
    entityMap: EntityMap,
    ai: Entity
): boolean {
    const spells = ai.getOne(SpellsComponent);
    if (spells === undefined) { return false; }

    const healthSpells = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealSelf);
    return healthSpells.length > 0;
}

export function resolveHasHealSelfSpellCasts(
    ecs: World,
    entityMap: EntityMap,
    ai: Entity
): boolean {
    const spells = ai.getOne(SpellsComponent);
    if (spells === undefined) { return false; }

    const healthSpells = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealSelf && i.count > 0);
    return healthSpells.length > 0;
}

/**
 * Does the entity know a spell to heal another entity?
 *
 * @param ecs {World} The ECS instance
 * @param entityMap {EntityMap} A map of tile positions to entity
 * @param ai {Entity} The entity to resolve for
 * @returns {boolean}
 */
export function resolveKnowsHealOtherSpell(
    ecs: World,
    entityMap:
    EntityMap,
    ai: Entity
): boolean {
    const spells = ai.getOne(SpellsComponent);
    if (spells === undefined) { return false; }

    const healthSpells = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealOther);
    return healthSpells.length > 0;
}

/**
 * Does the entity have any casts for a heal other spell?
 *
 * @param ecs {World} The ECS instance
 * @param entityMap {EntityMap} A map of tile positions to entity
 * @param ai {Entity} The entity to resolve for
 * @returns {boolean}
 */
export function resolveHasHealOtherSpellCasts(
    ecs: World,
    entityMap:
    EntityMap,
    ai: Entity
): boolean {
    const spells = ai.getOne(SpellsComponent);
    if (spells === undefined) { return false; }

    const healthSpells = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealOther && i.count > 0);
    return healthSpells.length > 0;
}

/**
 * Does the entity know a damage other spell?
 *
 * @param ecs {World} The ECS instance
 * @param entityMap {EntityMap} A map of tile positions to entity
 * @param ai {Entity} The entity to resolve for
 * @returns {boolean}
 */
export function resolveKnowsDamageOtherSpell(
    ecs: World,
    entityMap:
    EntityMap,
    ai: Entity
): boolean {
    const spellData = ai.getOne(SpellsComponent);
    if (spellData === undefined) { return false; }

    const spells = getKnownSpells(spellData)
        .filter(i => i.type === SpellType.DamageOther);
    return spells.length > 0;
}

/**
 * Does the entity have any casts for a heal other spell?
 *
 * @param ecs {World} The ECS instance
 * @param entityMap {EntityMap} A map of tile positions to entity
 * @param ai {Entity} The entity to resolve for
 * @returns {boolean}
 */
export function resolveHasDamageOtherSpellCasts(
    ecs: World,
    entityMap:
    EntityMap,
    ai: Entity
): boolean {
    const spellData = ai.getOne(SpellsComponent);
    if (spellData === undefined) { return false; }

    const spells = getKnownSpells(spellData)
        .filter(i => i.type === SpellType.DamageOther && i.count > 0);
    return spells.length > 0;
}

function resolveAllyLowHealth(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const pos = ai.getOne(PositionComponent)!;
    const aiData = ai.getOne(PlannerAIComponent)!;
    const entities = ecs
        .createQuery()
        .fromAll(PositionComponent, PlannerAIComponent, HitPointsComponent)
        .execute();

    // TODO, SPEED: this information is being calculated twice, once here
    // and once in the action
    let target: Nullable<Point> = null;
    let targetHPData: Nullable<HitPointsComponent> = null;
    for (const e of entities) {
        // TODO: remove when we have target selection/factions
        if (e === aiData.target || e === ai) { continue; }

        const hpData = e.getOne(HitPointsComponent)!;
        const ePos = e.getOne(PositionComponent)!;
        const aiState = e.getOne(PlannerAIComponent)!;
        const isLowHealth = (hpData.hp / hpData.maxHp) <= aiState.lowHealthThreshold;

        if (distanceBetweenPoints(pos.tilePosition(), ePos.tilePosition()) < 10 &&
            isLowHealth &&
            (target === null || hpData.hp < targetHPData!.hp)) {
            target = ePos.tilePosition();
            targetHPData = hpData;
        }
    }

    return target !== null;
}

/**
 * We want to know if the entity should avoid this tile
 * when running away from a dangerous area. even if it
 * isn't dangerous itself
 *
 * E.g. a tile may be fine but it could catch on fire, or
 * it's in the radius of a bomb which is about to explode
 *
 * This is in contrast to the resolveInDangerousArea which
 * only looks at the current tile and does not take into
 * account things like potential fire spread. This gives
 * more interesting enemy behavior.
 */
export function isPositionPotentiallyDangerous(
    ecs: World,
    entityMap: EntityMap,
    self: Entity,
    x: number,
    y: number
): boolean {
    const positions: Point[] = [];

    const selfDamageTypes = getEffectiveDamageAffinity(self);

    positions.push({ x, y });
    for (let i = 0; i < DIRS[8].length; i++) {
        const dir = DIRS[8][i];
        const cx = x + dir[0];
        const cy = y + dir[1];
        positions.push({ x: cx, y: cy });
    }

    for (const p of positions) {
        const entities = getEntitiesAtLocation(entityMap, p.x, p.y);
        for (const e of entities) {
            if (e === self) { continue; }

            const flameData = e.getOne(FlammableComponent);
            const triggerData = e.getOne(FireTriggerComponent);
            const steamData = e.getOne(TriggerTypeComponent);

            // If the entity has damage affinity then we can be a bit more intelligent
            if (selfDamageTypes !== null) {
                if (selfDamageTypes[DamageType.Fire] !== Affinity.nullified &&
                    (triggerData !== undefined || flameData !== undefined)) {
                    return true;
                }

                if (selfDamageTypes[DamageType.Water] !== Affinity.nullified &&
                    steamData !== undefined && steamData.triggerType === TriggerType.Steam) {
                    return true;
                }
            } else {
                if (triggerData !== undefined || flameData !== undefined) {
                    return true;
                }

                if (steamData !== undefined && steamData.triggerType === TriggerType.Steam) {
                    return true;
                }
            }
        }
    }

    return false;
}

function resolveInDangerousArea(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const pos = ai.getOne(PositionComponent)!.tilePosition();

    const positions: [number, number][] = [[pos.x, pos.y]];
    for (let i=0; i < DIRS[8].length; i++) {
        const dir = DIRS[8][i];
        const dx = pos.x + dir[0];
        const dy = pos.y + dir[1];
        positions.push([dx, dy]);
    }

    // Check if own tile or any neighbors have on fire entities
    for (let i = 0; i < positions.length; i++) {
        const p = positions[i];
        const entities = getEntitiesAtLocation(entityMap, p[0], p[1]);

        for (let j = 0; j < entities.length; j++) {
            const e = entities[j];
            const flameData = e.getOne(FlammableComponent);
            const triggerData = e.getOne(FireTriggerComponent);
            const steamData = e.getOne(TriggerTypeComponent);

            if (triggerData !== undefined || (flameData !== undefined && flameData.onFire && !e.tags.has("sentient"))) {
                return true;
            }

            if (steamData !== undefined && steamData.triggerType === TriggerType.Steam) {
                return true;
            }
        }
    }

    return false;
}

function resolveTargetKilled(ecs: World, entityMap: EntityMap, ai: Entity) {
    const aiState = ai.getOne(PlannerAIComponent);
    return aiState !== undefined && aiState.target === null;
}

export function resolveAfraid(ecs: World, entityMap: EntityMap, ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    return aiState !== undefined && aiState.fear >= aiState.fearThreshold;
}

function resolveCowering(ecs: World, entityMap: EntityMap, ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    const pos = ai.getOne(PositionComponent);
    if (aiState === undefined || pos === undefined) { return false; }
    return pos.x === aiState.runAwayTarget?.x && pos.y === aiState.runAwayTarget?.y;
}

function resolveAtFallbackPosition(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const aiState = ai.getOne(FallbackAIComponent);
    return aiState !== undefined && aiState.isAtFallbackPosition;
}

/**
 * Does the entity have members of its team which are alive and in a 12
 * tile radius?
 *
 * @param ecs {World} The ECS instance to use
 * @param entityMap {EntityMap} The current map of positions to entities
 * @param ai {Entity} THe entity to resolve the goal for
 * @returns {boolean}
 */
export function resolveAliveAllies(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    if (aiState === undefined || aiState.teamId === null) { return false; }
    const team = globals.Game?.entityTeams.get(aiState.teamId);
    if (team === undefined) { return false; }

    const pos = ai.getOne(PositionComponent)!;
    for (const id of team.memberIds) {
        if (ai.id === id) { continue; }
        const e = ecs.getEntity(id);
        if (e === undefined) { continue; }

        const ePos = e.getOne(PositionComponent)!;
        const hpData = e.getOne(HitPointsComponent)!;
        if (distanceBetweenPoints(ePos.tilePosition(), pos.tilePosition()) < 12 && hpData.hp > 0) {
            return true;
        }
    }

    return false;
}

/**
 * Is the entity flammable and currently on fire?
 *
 * @param ecs {World} The ECS instance to use
 * @param entityMap {EntityMap} The current map of positions to entities
 * @param ai {Entity} THe entity to resolve the goal for
 * @returns {boolean}
 */
export function resolveOnFire(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const flammableData = ai.getOne(FlammableComponent);

    if (flammableData !== undefined && flammableData.onFire) {
        return true;
    }

    return false;
}

/**
 * Is the entity within 15 blocks of a water tile?
 *
 * @param ecs {World} The ECS instance to use
 * @param entityMap {EntityMap} The current map of positions to entities
 * @param ai {Entity} THe entity to resolve the goal for
 * @returns {boolean}
 */
function resolveNearWater(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const pos = ai.getOne(PositionComponent)!.tilePosition();
    const entities = ecs
        .createQuery()
        .fromAll(PositionComponent, "waterTile")
        .execute();

    for (const e of entities) {
        if (e.id === ai.id) { continue; }

        const ePos = e.getOne(PositionComponent)!;
        if (distanceBetweenPoints(ePos.tilePosition(), pos) < 15) {
            return true;
        }
    }

    return false;
}

function resolveAlliesAlerted(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    if (aiState === undefined || aiState.teamId === null) { return false; }
    const team = globals.Game?.entityTeams.get(aiState.teamId);
    if (team === undefined) { return false; }

    return team.state === "attacking";
}

/**
 * Is the entity silenceable and currently silenced?
 *
 * @param ecs {World} The ECS instance to use
 * @param entityMap {EntityMap} The current map of positions to entities
 * @param ai {Entity} THe entity to resolve the goal for
 * @returns {boolean}
 */
export function resolveSilenced(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const silenceData = ai.getOne(SilenceableComponent);
    return silenceData !== undefined && silenceData.silenced;
}

/**
 * Is the entity confuse-able and currently confused?
 *
 * @param ecs {World} The ECS instance to use
 * @param entityMap {EntityMap} The current map of positions to entities
 * @param ai {Entity} THe entity to resolve the goal for
 * @returns {boolean}
 */
export function resolveConfused(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const confusedData = ai.getOne(ConfusedAIComponent);
    return confusedData !== undefined && confusedData.turnsLeft > 0;
}

type GoalResolver = (ecs: World, entityMap: EntityMap, ai: Entity) => boolean;

interface GoalDataDetails {
    resolver: GoalResolver
}

/**
 * A set of world state variables and the functions used
 * to determine if they're true. Used in the planner.
 */
export const GoalData: { [key: string]: GoalDataDetails } = {
    "targetPositionKnown": {
        resolver: resolveTargetPositionKnown
    },
    "targetInLineOfSight": {
        resolver: resolveTargetInLOS
    },
    "nextToTarget": {
        resolver: resolveNextToTarget
    },
    "lowHealth": {
        resolver: resolveLowHealth
    },
    "hasHealingItem": {
        resolver: resolveHasHealingItem
    },
    "hasSelfHealingSpell": {
        resolver: resolveHasHealSelfSpellCasts
    },
    "hasHealOtherSpell": {
        resolver: resolveHasHealOtherSpellCasts
    },
    "hasAliveAllies": {
        resolver: resolveAliveAllies
    },
    "allyLowHealth": {
        resolver: resolveAllyLowHealth
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
    "atDesiredDistance": {
        resolver: resolveAtDesiredDistance
    },
    "atFallbackPosition": {
        resolver: resolveAtFallbackPosition
    },
    "onFire": {
        resolver: resolveOnFire
    },
    "nearWater": {
        resolver: resolveNearWater
    },
    "alliesAlerted": {
        resolver: resolveAlliesAlerted
    },
    "silenced": {
        resolver: resolveSilenced
    }
};


// Dynamically add spells to goals
for (const key in SpellData) {
    const goal = `hasCastsFor_${key}`;
    GoalData[goal] = {
        resolver: resolveEnoughCastsForSpellGenerator(key)
    };
}
