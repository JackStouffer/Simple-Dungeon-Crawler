import { Entity } from "ape-ecs";
import { ItemType, SpellData } from "../data";
import {
    FallbackAIComponent,
    FearAIComponent,
    InventoryComponent,
    PlannerAIComponent,
    PositionComponent
} from "../entity";
import { getEffectiveHitPointData, getEffectiveStatData } from "../fighter";
import { getItems } from "../inventory";
import { distanceBetweenPoints } from "../map";

export function resolveTargetPositionKnown(ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    return aiState?.knowsTargetPosition === true ? true : false;
}

export function resolveTargetInLOS(ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    return aiState?.hasTargetInSight === true ? true : false;
}

export function resolveNextToTarget(ai: Entity): boolean {
    const aiState = ai.getOne(PlannerAIComponent);
    const pos = ai.getOne(PositionComponent);
    const targetPos = aiState?.target.getOne(PositionComponent);
    if (pos === undefined || targetPos === undefined) {
        throw new Error(`Entity ${ai.id} is missing data for resolveNextToTarget`);
    }
    return distanceBetweenPoints(pos, targetPos) < 1.5;
}

export function resolveEnoughManaForSpellGenerator(spellID: string) {
    return function (ai: Entity): boolean {
        const statData = getEffectiveStatData(ai);
        if (statData === null) { return false; }

        const spellData = SpellData[spellID];
        return statData.mana >= spellData.manaCost;
    };
}

export function resolveLowHealth(ai: Entity): boolean {
    const hpData = getEffectiveHitPointData(ai);
    const aiState = ai.getOne(PlannerAIComponent);
    if (hpData === null || aiState === undefined) { return false; }

    return (hpData.hp / hpData.maxHp) <= aiState.lowHealthThreshold;
}

export function resolveLowMana(ai: Entity): boolean {
    const statData = getEffectiveStatData(ai);
    const aiState = ai.getOne(PlannerAIComponent);
    if (statData === null || aiState === undefined) { return false; }

    return (statData.mana / statData.maxMana) <= aiState.lowManaThreshold;
}

export function resolveHasManaItem(ai: Entity): boolean {
    const inventoryData = ai.getOne(InventoryComponent);
    if (inventoryData === undefined) { return false; }

    const manaItems = getItems(inventoryData)
        .filter(i => i.type === ItemType.AddManaSelf);
    return manaItems.length > 0;
}

export function resolveHasHealingItem(ai: Entity): boolean {
    const inventoryData = ai.getOne(InventoryComponent);
    if (inventoryData === undefined) { return false; }

    const healthItems = getItems(inventoryData)
        .filter(i => i.type === ItemType.HealSelf);
    return healthItems.length > 0;
}

export function resolveInDangerousArea(): boolean {
    // TODO
    return false;
}

export function resolveTargetKilled(ai: Entity) {
    const aiState = ai.getOne(PlannerAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.target === null;
}

export function resolveAfraid(ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.fear >= aiState.fearThreshold;
}

export function resolveCowering(ai: Entity) {
    const aiState = ai.getOne(FearAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.isCowering === true ? true : false;
}

export function resolveAtFallbackPosition(ai: Entity): boolean {
    const aiState = ai.getOne(FallbackAIComponent);
    if (aiState === undefined) { return false; }
    return aiState.isAtFallbackPosition === true ? true : false;
}

export function resolveHasArrows(): boolean {
    // FIXME
    return false;
}
