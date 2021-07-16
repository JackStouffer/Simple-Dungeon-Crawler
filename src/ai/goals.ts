import { Entity, World } from "ape-ecs";
import { Affinity, DamageType, ItemType, SpellType, TriggerType } from "../constants";
import {
    ConfusableAIComponent,
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
import { tileDistanceBetweenPoints, getEntitiesAtLocation, Vector2D } from "../map";
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
    if (aiState === undefined || aiState.targetId === null) {
        throw new Error(`Entity ${ai.id} is missing a target`);
    }

    const target = ecs.getEntity(aiState.targetId);
    if (target === undefined) {
        if (globals.Game?.debugAI === true) {
            // eslint-disable-next-line no-console
            console.log(`resolveNextToTarget for ${aiState.entity.id} has a non-existent target ${aiState.targetId}`);
        }
        return false;
    }

    const pos = ai.getOne(PositionComponent);
    const targetPos = target.getOne(PositionComponent);
    if (pos === undefined || targetPos === undefined) {
        throw new Error(`Entity ${ai.id} is missing data for resolveNextToTarget`);
    }
    return tileDistanceBetweenPoints(pos.tilePosition, targetPos.tilePosition) < 1.5;
}

function resolveAtDesiredDistance(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    if (aiState === undefined || aiState.targetId === null) {
        throw new Error(`Entity ${ai.id} is missing a target`);
    }

    const pos = ai.getOne(PositionComponent);

    const target = ecs.getEntity(aiState.targetId);
    if (target === undefined) {
        if (globals.Game?.debugAI === true) {
            // eslint-disable-next-line no-console
            console.log(`resolveAtDesiredDistance for ${aiState.entity.id} has a non-existent target ${aiState.targetId}`);
        }
        return false;
    }
    const targetPos = target.getOne(PositionComponent);
    if (pos === undefined || targetPos === undefined) {
        throw new Error(`Entity ${ai.id} is missing data for resolveNextToTarget`);
    }

    const distance = tileDistanceBetweenPoints(pos.tilePosition, targetPos.tilePosition);
    return Math.floor(distance) === aiState.desiredDistanceToTarget;
}

function resolveEnoughCastsForSpellGenerator(spellID: string): GoalResolver {
    return function (ecs: World, entityMap: EntityMap, ai: Entity): boolean {
        const spellData = ai.getOne(SpellsComponent);
        if (spellData === undefined) { return false; }

        return (spellData.knownSpells[spellID].count ?? -1) > 0;
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
    let target: Nullable<Vector2D> = null;
    let targetHPData: Nullable<HitPointsComponent> = null;
    for (const e of entities) {
        // TODO: remove when we have target selection/factions
        if (e.id === aiData.targetId || e === ai) { continue; }

        const hpData = e.getOne(HitPointsComponent)!;
        const ePos = e.getOne(PositionComponent)!;
        const aiState = e.getOne(PlannerAIComponent)!;
        const isLowHealth = (hpData.hp / hpData.maxHp) <= aiState.lowHealthThreshold;

        if (tileDistanceBetweenPoints(pos.tilePosition, ePos.tilePosition) < 10 &&
            isLowHealth &&
            (target === null || hpData.hp < targetHPData!.hp)) {
            target = ePos.tilePosition;
            targetHPData = hpData;
        }
    }

    return target !== null;
}

/**
 * Get all of the potentially dangerous tiles around a given
 * entity in a square with a width and height of squareSize.
 *
 * We want to know if the entity should avoid a given tile
 * when running away from a dangerous area. even if it
 * isn't dangerous itself.
 *
 * E.g. a tile may be fine but it could catch on fire, or
 * it's in the radius of a bomb which is about to explode
 */
export function getPotentiallyDangerousPositions(
    ecs: World,
    entityMap: EntityMap,
    entity: Entity,
    sightRange: number,
    includeNeighbors: boolean = true
): Set<string> {
    // TODO, speed: Using hashset of strings here because js hashsets don't work
    // well with objects. Should be a set of vector2d
    const positions: Set<string> = new Set();
    const entityTilePos = entity.getOne(PositionComponent)!.tilePosition;
    const selfDamageTypes = getEffectiveDamageAffinity(entity);
    const SQUARE_RADIUS = Math.floor(sightRange / 2);

    const flammableEntitiesQuery = ecs
        .createQuery()
        .fromAll(FlammableComponent, PositionComponent)
        .execute();

    let closeTileOnFire: boolean = false;
    for (const e of flammableEntitiesQuery.values()) {
        if (e.id === entity.id) { continue; }

        const tilePos = e.getOne(PositionComponent)!.tilePosition;
        const fireData = e.getOne(FlammableComponent)!;
        if (fireData.onFire && tileDistanceBetweenPoints(tilePos, entityTilePos) < sightRange) {
            closeTileOnFire = true;
            break;
        }
    }

    for (let y = entityTilePos.y - SQUARE_RADIUS; y < entityTilePos.y + SQUARE_RADIUS; y++) {
        for (let x = entityTilePos.x - SQUARE_RADIUS; x < entityTilePos.x + SQUARE_RADIUS; x++) {

            if (positions.has(`${x},${y}`)) { continue; }

            const entitiesAtLocation = getEntitiesAtLocation(ecs, entityMap, new Vector2D(x, y));
            for (const e of entitiesAtLocation) {
                if (e.id === entity.id) { continue; }

                const flammableData = e.getOne(FlammableComponent);
                const fireTriggerData = e.getOne(FireTriggerComponent);
                const steamData = e.getOne(TriggerTypeComponent);

                // If the entity has damage affinity then we can be a bit more intelligent
                // about avoiding or not avoiding tiles. E.g. a lava snake can move through
                // on fire tiles
                if (selfDamageTypes !== null) {
                    if (selfDamageTypes[DamageType.Fire] !== Affinity.nullified &&
                        flammableData !== undefined &&
                        flammableData.onFire) {
                        positions.add(`${x},${y}`);
                        if (includeNeighbors) {
                            // if something is on fire in this tile, we also want to avoid
                            // the neighbors so that we don't get fire spread
                            for (let i = 0; i < DIRS[8].length; i++) {
                                const dir = DIRS[8][i];
                                positions.add(`${x + dir[0]},${y + dir[1]}`);
                            }
                        }
                    }

                    if (selfDamageTypes[DamageType.Fire] !== Affinity.nullified &&
                        flammableData !== undefined
                        && closeTileOnFire) {
                        positions.add(`${x},${y}`);
                    }

                    if (selfDamageTypes[DamageType.Water] !== Affinity.nullified &&
                        steamData !== undefined &&
                        steamData.currentTriggerType === TriggerType.Steam) {
                        positions.add(`${x},${y}`);
                    }
                } else {
                    if (flammableData !== undefined && flammableData.onFire) {
                        positions.add(`${x},${y}`);
                    }

                    if (fireTriggerData !== undefined) {
                        positions.add(`${x},${y}`);
                    }

                    if (steamData !== undefined &&
                        steamData.currentTriggerType === TriggerType.Steam) {
                        positions.add(`${x},${y}`);
                    }
                }
            }
        }
    }

    return positions;
}

function resolveInDangerousArea(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const tilePos = ai.getOne(PositionComponent)!.tilePosition;
    // Sight range of the dangerous position is a game play decision.
    // Want to balance making the enemy appear intelligent with allowing
    // the player to successfully set traps.
    const dangerousPositions = getPotentiallyDangerousPositions(
        ecs, entityMap, ai, 5, true
    );
    return dangerousPositions.has(`${tilePos.x},${tilePos.y}`);
}

function resolveTargetKilled(ecs: World, entityMap: EntityMap, ai: Entity) {
    const aiState = ai.getOne(PlannerAIComponent);
    return aiState !== undefined && aiState.targetId === null;
}

export function resolveAfraid(ecs: World, entityMap: EntityMap, ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    return aiState !== undefined && aiState.fear >= aiState.fearThreshold;
}

function resolveCowering(ecs: World, entityMap: EntityMap, ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    const pos = ai.getOne(PositionComponent);
    if (aiState === undefined || pos === undefined) { return false; }
    if (aiState.runAwayTarget === null) { return false; }
    return pos.x === aiState.runAwayTarget.x && pos.y === aiState.runAwayTarget.y;
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
        const teamMember = ecs.getEntity(id);
        if (teamMember === undefined) { continue; }

        const teamMemberPos = teamMember.getOne(PositionComponent);
        const teamMemberHP = teamMember.getOne(HitPointsComponent);

        if (teamMemberPos !== undefined &&
            teamMemberHP !== undefined &&
            tileDistanceBetweenPoints(teamMemberPos.tilePosition, pos.tilePosition) < 12 &&
            teamMemberHP.hp > 0) {
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
    const pos = ai.getOne(PositionComponent)!.tilePosition;
    const entities = ecs
        .createQuery()
        .fromAll(PositionComponent, "waterTile")
        .execute();

    for (const e of entities) {
        if (e.id === ai.id) { continue; }

        const ePos = e.getOne(PositionComponent)!;
        if (tileDistanceBetweenPoints(ePos.tilePosition, pos) < 15) {
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
    const confusedData = ai.getOne(ConfusableAIComponent);
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
    },
    "confused": {
        resolver: resolveConfused
    }
};


// Dynamically add spells to goals
for (const key in SpellData) {
    const goal = `hasCastsFor_${key}`;
    GoalData[goal] = {
        resolver: resolveEnoughCastsForSpellGenerator(key)
    };
}
