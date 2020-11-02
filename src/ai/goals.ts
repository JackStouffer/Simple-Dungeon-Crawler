import { ItemType, SpellData } from "../data";
import { distanceBetweenObjects } from "../map";
import { PlanningAI } from "./components";

export function resolveTargetPositionKnown(ai: PlanningAI): boolean {
    return ai.knowsTargetPosition === true ? true : false;
}

export function resolveTargetInLOS(ai: PlanningAI): boolean {
    return ai.hasTargetInSight === true ? true : false;
}

export function resolveNextToTarget(ai: PlanningAI): boolean {
    if (ai.owner === null || ai.target === null) { return false; }

    return distanceBetweenObjects(ai.owner, ai.target) < 1.5;
}

export function resolveEnoughManaForSpellGenerator(spellID: string) {
    return function (ai: PlanningAI): boolean {
        if (ai.owner === null || ai.owner.fighter === null) { return false; }

        const spellData = SpellData[spellID];
        return ai.owner.fighter.getEffectiveStats().mana >= spellData.manaCost;
    };
}

export function resolveLowHealth(ai: PlanningAI): boolean {
    if (ai.owner === null || ai.owner.fighter === null) { return false; }

    const stats = ai.owner.fighter.getEffectiveStats();
    return (stats.hp / stats.maxHp) <= ai.lowHealthThreshold;
}

export function resolveLowMana(ai: PlanningAI): boolean {
    if (ai.owner === null || ai.owner.fighter === null) { return false; }

    const stats = ai.owner.fighter.getEffectiveStats();
    return (stats.mana / stats.maxMana) <= ai.lowManaThreshold;
}

export function resolveHasManaItem(ai: PlanningAI): boolean {
    if (ai.owner === null || ai.owner.inventory === null) { return false; }

    const manaItems = ai.owner.inventory
        .getItems()
        .filter(i => i.type === ItemType.AddManaSelf);
    return manaItems.length > 0;
}

export function resolveHasHealingItem(ai: PlanningAI): boolean {
    if (ai.owner === null || ai.owner.inventory === null) { return false; }

    const manaItems = ai.owner.inventory
        .getItems()
        .filter(i => i.type === ItemType.HealSelf);
    return manaItems.length > 0;
}

export function resolveInDangerousArea(): boolean {
    // FIXME
    return false;
}

export function resolveTargetKilled(ai: PlanningAI) {
    if (ai.target === null) { return false; }
    return ai.target.fighter === null;
}

export function resolveAfraid(ai: PlanningAI) {
    return ai.fear >= ai.fearThreshold;
}

export function resolveCowering(ai: PlanningAI) {
    return ai.isCowering === true ? true : false;
}

export function resolveAtFallbackPosition(ai: PlanningAI): boolean {
    return ai.isAtFallbackPosition === true ? true : false;
}

export function resolveHasArrows(): boolean {
    // FIXME
    return false;
}
