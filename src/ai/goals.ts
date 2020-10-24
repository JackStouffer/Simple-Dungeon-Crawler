import { ItemType, SpellData } from "../data";
import { distanceBetweenObjects } from "../map";
import { AIComponent } from "./components";

export function resolveTargetPositionKnown(ai: AIComponent) {
    return ai.knowsTargetPosition;
}

export function resolveTargetInLOS(ai: AIComponent) {
    return ai.hasTargetInSight;
}

export function resolveNextToTarget(ai: AIComponent) {
    return distanceBetweenObjects(ai.owner, ai.target) < 1.5;
}

export function resolveEnoughManaForSpellGenerator(spellID: string) {
    return function (ai: AIComponent): boolean {
        const spellData = SpellData[spellID];
        return ai.owner.fighter.getEffectiveStats().mana >= spellData.manaCost;
    };
}

export function resolveLowHealth(ai: AIComponent) {
    const stats = ai.owner.fighter.getEffectiveStats();
    return (stats.hp / stats.maxHp) <= ai.lowHealthThreshold;
}

export function resolveLowMana(ai: AIComponent) {
    const stats = ai.owner.fighter.getEffectiveStats();
    return (stats.mana / stats.maxMana) <= ai.lowManaThreshold;
}

export function resolveHasManaItem(ai: AIComponent) {
    if (!ai.owner.inventory) {
        return false;
    }

    const manaItems = ai.owner.inventory
        .getItems()
        .filter(i => i.type === ItemType.AddManaSelf);
    return manaItems.length > 0;
}

export function resolveHasHealingItem(ai: AIComponent): boolean {
    if (!ai.owner.inventory) {
        return false;
    }

    const manaItems = ai.owner.inventory
        .getItems()
        .filter(i => i.type === ItemType.HealSelf);
    return manaItems.length > 0;
}

export function resolveInDangerousArea(): boolean {
    // FIXME
    return false;
}

export function resolveTargetKilled(ai: AIComponent) {
    return ai.target.fighter === null;
}

export function resolveAfraid(ai: AIComponent) {
    return ai.fear >= ai.fearThreshold;
}

export function resolveCowering(ai: AIComponent) {
    return ai.isCowering;
}

export function resolveAtFallbackPosition(ai: AIComponent): boolean {
    return ai.isAtFallbackPosition;
}

export function resolveHasArrows(): boolean {
    // FIXME
    return false;
}
