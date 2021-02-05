import { Entity, World } from "ape-ecs";
import { ItemType, SpellType } from "../constants";
import {
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
    SpellsComponent
} from "../entity";
import { getEffectiveHitPointData, getKnownSpells } from "../fighter";
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

        const silenceData = ai.getOne(SilenceableComponent);
        if (silenceData?.silenced === true) { return false; }

        return (spellData.knownSpells.get(spellID) ?? -1) > 0;
    };
}

function resolveLowHealth(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const hpData = getEffectiveHitPointData(ai);
    const aiState = ai.getOne(PlannerAIComponent);
    if (hpData === null || aiState === undefined) { return false; }

    return (hpData.hp / hpData.maxHp) <= aiState.lowHealthThreshold;
}

function resolveHasHealingItem(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const inventoryData = ai.getOne(InventoryComponent);
    if (inventoryData === undefined) { return false; }

    const healthItems = getItems(inventoryData)
        .filter(i => i.type === ItemType.HealSelf);
    return healthItems.length > 0;
}

function resolveHasSelfHealingSpell(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const spells = ai.getOne(SpellsComponent);
    if (spells === undefined) { return false; }

    const silenceData = ai.getOne(SilenceableComponent);
    if (silenceData?.silenced === true) { return false; }

    const healthSpells = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealSelf && i.count > 0);
    return healthSpells.length > 0;
}

function resolveHasHealOtherSpell(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const spells = ai.getOne(SpellsComponent);
    if (spells === undefined) { return false; }

    const silenceData = ai.getOne(SilenceableComponent);
    if (silenceData?.silenced === true) { return false; }

    const healthSpells = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealOther && i.count > 0);
    return healthSpells.length > 0;
}

function resolveAllyLowHealth(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const pos = ai.getOne(PositionComponent)!;
    const aiData = ai.getOne(PlannerAIComponent)!;
    const entities = ecs
        .createQuery()
        .fromAll(PositionComponent, PlannerAIComponent, HitPointsComponent)
        .execute();

    // SPEED this information is being calculated twice, once here
    // and once in the action
    let target: Nullable<Point> = null;
    let targetHPData: Nullable<HitPointsComponent> = null;
    for (const e of entities) {
        // TODO remove when we have target selection/factions
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
 * isn't dangerous itself E.g. a tile may be fine but
 * it's in the radius of a bomb which is about to explode
 */
export function isPositionPotentiallyDangerous(
    ecs: World,
    self: Entity,
    x: number,
    y: number
): boolean {
    const positions: Set<string> = new Set();

    positions.add(`${x},${y}`);
    for (let i = 0; i < DIRS[8].length; i++) {
        const dir = DIRS[8][i];
        const cx = x + dir[0];
        const cy = y + dir[1];
        positions.add(`${cx},${cy}`);
    }

    // SPEED use quad tree
    const entities = ecs.entities.values();
    for (const e of entities) {
        if (e === self) { continue; }

        const entityPos = e.getOne(PositionComponent);
        if (entityPos !== undefined &&
            positions.has(`${entityPos.x},${entityPos.y}`)) {

            // Right now all we're doing is avoiding potentially flammable
            // tiles as a short cut. We're not taking into account if the
            // flammable data actually matters
            const flameData = e.getOne(FlammableComponent);
            const triggerData = e.getOne(FireTriggerComponent);

            if (triggerData !== undefined || flameData !== undefined) {
                return true;
            }
        }
    }

    return false;
}

function resolveInDangerousArea(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const pos = ai.getOne(PositionComponent)!;

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
            if (triggerData !== undefined || (flameData !== undefined && flameData.onFire && !e.tags.has("sentient"))) {
                return true;
            }
        }
    }

    return false;
}

function resolveTargetKilled(ecs: World, entityMap: EntityMap, ai: Entity) {
    const aiState = ai.getOne(PlannerAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.target === null;
}

function resolveAfraid(ecs: World, entityMap: EntityMap, ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.fear >= aiState.fearThreshold;
}

function resolveCowering(ecs: World, entityMap: EntityMap, ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    const pos = ai.getOne(PositionComponent);
    if (aiState === undefined || pos === undefined) { return false; }
    return pos.x === aiState.runAwayTarget?.x && pos.y === aiState.runAwayTarget?.y;
}

function resolveAtFallbackPosition(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const aiState = ai.getOne(FallbackAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.isAtFallbackPosition === true ? true : false;
}

function resolveAliveAllies(ecs: World, entityMap: EntityMap, ai: Entity): boolean {
    const pos = ai.getOne(PositionComponent)!;
    const entities = ecs
        .createQuery()
        .fromAll(PositionComponent, PlannerAIComponent, HitPointsComponent)
        .execute();

    for (const e of entities) {
        if (e.id === ai.id) { continue; }

        const ePos = e.getOne(PositionComponent)!;
        const hpData = e.getOne(HitPointsComponent)!;
        if (distanceBetweenPoints(ePos.tilePosition(), pos.tilePosition()) < 12 && hpData.hp > 0) {
            return true;
        }
    }

    return false;
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
        resolver: resolveHasSelfHealingSpell
    },
    "hasHealOtherSpell": {
        resolver: resolveHasHealOtherSpell
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
    }
};


// Dynamically add spells to goals and actions
for (const key in SpellData) {
    const goal = `hasCastsFor_${key}`;
    GoalData[goal] = {
        resolver: resolveEnoughCastsForSpellGenerator(key)
    };
}
