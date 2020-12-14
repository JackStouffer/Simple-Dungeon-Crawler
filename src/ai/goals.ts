import { Entity, World } from "ape-ecs";
import { ItemType, SpellType } from "../constants";
import {
    FallbackAIComponent,
    FearAIComponent,
    FireTriggerComponent,
    FlammableComponent,
    InventoryComponent,
    PlannerAIComponent,
    PositionComponent,
    SilenceableComponent,
    SpellsComponent
} from "../entity";
import { getEffectiveHitPointData, getKnownSpells } from "../fighter";
import { getItems } from "../inventory";
import { distanceBetweenPoints } from "../map";
import { DIRS } from "../rot";
import { SpellData } from "../skills";

function resolveTargetPositionKnown(ecs: World, ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    return aiState?.knowsTargetPosition === true ? true : false;
}

function resolveTargetInLOS(ecs: World, ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    return aiState?.hasTargetInSight === true ? true : false;
}

function resolveNextToTarget(ecs: World, ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    const pos = ai.getOne(PositionComponent);
    const targetPos = aiState?.target.getOne(PositionComponent);
    if (pos === undefined || targetPos === undefined) {
        throw new Error(`Entity ${ai.id} is missing data for resolveNextToTarget`);
    }
    return distanceBetweenPoints(pos, targetPos) < 1.5;
}

function resolveEnoughCastsForSpellGenerator(spellID: string) {
    return function (ecs: World, ai: Entity): boolean {
        const spellData = ai.getOne(SpellsComponent);
        if (spellData === undefined) { return false; }

        const silenceData = ai.getOne(SilenceableComponent);
        if (silenceData?.silenced === true) { return false; }

        return (spellData.knownSpells.get(spellID) ?? -1) > 0;
    };
}

function resolveLowHealth(ecs: World, ai: Entity): boolean {
    const hpData = getEffectiveHitPointData(ai);
    const aiState = ai.getOne(PlannerAIComponent);
    if (hpData === null || aiState === undefined) { return false; }

    return (hpData.hp / hpData.maxHp) <= aiState.lowHealthThreshold;
}

function resolveHasHealingItem(ecs: World, ai: Entity): boolean {
    const inventoryData = ai.getOne(InventoryComponent);
    if (inventoryData === undefined) { return false; }

    const healthItems = getItems(inventoryData)
        .filter(i => i.type === ItemType.HealSelf);
    return healthItems.length > 0;
}

function resolveHasHealingSpell(ecs: World, ai: Entity): boolean {
    const spells = ai.getOne(SpellsComponent);
    if (spells === undefined) { return false; }

    const healthSpells = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealSelf && i.count > 0);
    return healthSpells.length > 0;
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

function resolveInDangerousArea(ecs: World, ai: Entity): boolean {
    // For now, check if own tile or any neighbors have on fire
    // entities
    const pos = ai.getOne(PositionComponent)!;
    const positions: Set<string> = new Set();

    positions.add(`${pos.x},${pos.y}`);
    for (let i = 0; i < DIRS[8].length; i++) {
        const dir = DIRS[8][i];
        const cx = pos.x + dir[0];
        const cy = pos.y + dir[1];
        positions.add(`${cx},${cy}`);
    }

    // SPEED use quad tree
    const entities = ecs.entities.values();
    for (const e of entities) {
        if (e === ai) { continue; }

        const entityPos = e.getOne(PositionComponent);
        if (entityPos !== undefined &&
            positions.has(`${entityPos.x},${entityPos.y}`)) {

            const flameData = e.getOne(FlammableComponent);
            const triggerData = e.getOne(FireTriggerComponent);

            if (triggerData !== undefined || (flameData !== undefined && flameData.onFire)) {
                return true;
            }
        }
    }

    return false;
}

function resolveTargetKilled(ecs: World, ai: Entity) {
    const aiState = ai.getOne(PlannerAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.target === null;
}

function resolveAfraid(ecs: World, ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.fear >= aiState.fearThreshold;
}

function resolveCowering(ecs: World, ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    const pos = ai.getOne(PositionComponent);
    if (aiState === undefined || pos === undefined) { return false; }
    return pos.x === aiState.runAwayTarget?.x && pos.y === aiState.runAwayTarget?.y;
}

function resolveAtFallbackPosition(ecs: World, ai: Entity): boolean {
    const aiState = ai.getOne(FallbackAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.isAtFallbackPosition === true ? true : false;
}

interface GoalDataDetails {
    resolver: (ecs: World, ai: Entity) => boolean
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
    "hasHealingSpell": {
        resolver: resolveHasHealingSpell
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
