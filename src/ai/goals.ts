import { Entity } from "ape-ecs";
import { ItemType, SpellType } from "../constants";
import {
    FallbackAIComponent,
    FearAIComponent,
    InventoryComponent,
    PlannerAIComponent,
    PositionComponent,
    SpellsComponent
} from "../entity";
import { getEffectiveHitPointData, getKnownSpells } from "../fighter";
import { getItems } from "../inventory";
import { distanceBetweenPoints } from "../map";
import { SpellData } from "../skills";

function resolveTargetPositionKnown(ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    return aiState?.knowsTargetPosition === true ? true : false;
}

function resolveTargetInLOS(ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    return aiState?.hasTargetInSight === true ? true : false;
}

function resolveNextToTarget(ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    const pos = ai.getOne(PositionComponent);
    const targetPos = aiState?.target.getOne(PositionComponent);
    if (pos === undefined || targetPos === undefined) {
        throw new Error(`Entity ${ai.id} is missing data for resolveNextToTarget`);
    }
    return distanceBetweenPoints(pos, targetPos) < 1.5;
}

function resolveEnoughCastsForSpellGenerator(spellID: string) {
    return function (ai: Entity): boolean {
        const spellData = ai.getOne(SpellsComponent);
        if (spellData === undefined) { return false; }
        return (spellData.knownSpells.get(spellID) ?? -1) > 0;
    };
}

function resolveLowHealth(ai: Entity): boolean {
    const hpData = getEffectiveHitPointData(ai);
    const aiState = ai.getOne(PlannerAIComponent);
    if (hpData === null || aiState === undefined) { return false; }

    return (hpData.hp / hpData.maxHp) <= aiState.lowHealthThreshold;
}

function resolveHasHealingItem(ai: Entity): boolean {
    const inventoryData = ai.getOne(InventoryComponent);
    if (inventoryData === undefined) { return false; }

    const healthItems = getItems(inventoryData)
        .filter(i => i.type === ItemType.HealSelf);
    return healthItems.length > 0;
}

function resolveHasHealingSpell(ai: Entity): boolean {
    const spells = ai.getOne(SpellsComponent);
    if (spells === undefined) { return false; }

    const healthSpells = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealSelf && i.count > 0);
    return healthSpells.length > 0;
}

function resolveInDangerousArea(): boolean {
    // TODO
    return false;
}

function resolveTargetKilled(ai: Entity) {
    const aiState = ai.getOne(PlannerAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.target === null;
}

function resolveAfraid(ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.fear >= aiState.fearThreshold;
}

function resolveCowering(ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    const pos = ai.getOne(PositionComponent);
    if (aiState === undefined || pos === undefined) { return false; }
    return pos.x === aiState.runAwayTarget?.x && pos.y === aiState.runAwayTarget?.y;
}

function resolveAtFallbackPosition(ai: Entity): boolean {
    const aiState = ai.getOne(FallbackAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.isAtFallbackPosition === true ? true : false;
}

interface GoalDataDetails {
    resolver: (ai: Entity) => boolean
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
    const data = SpellData[key];
    // capitalize the first letter
    const goal = `hasCastsFor_${key}`;
    if (data.type === SpellType.DamageOther) {
        GoalData[goal] = {
            resolver: resolveEnoughCastsForSpellGenerator(key)
        };
    } else if (data.type === SpellType.HealSelf) {
        GoalData[goal] = {
            resolver: resolveEnoughCastsForSpellGenerator(key)
        };
    }
}
