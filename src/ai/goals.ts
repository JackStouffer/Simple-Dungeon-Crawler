import { ItemType, SpellData } from "../data";
import { distanceBetweenObjects } from "../map";
import { AIComponent } from "./components";

export function resolveTargetPositionKnown(ai: AIComponent) {
    return ai.state === "chase";
}

export function resolveTargetInLOS(ai: AIComponent) {
    // FIXME
    return ai.state === "chase";
}

export function resolveNextToTarget(ai: AIComponent) {
    return distanceBetweenObjects(ai.owner, ai.target) < 1.5;
}

export function resolveEnoughManaForSpell(spellID: string) {
    return function (ai: AIComponent) {
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
    if (!ai.owner.inventoryComponent) {
        return false;
    }

    const manaItems = ai.owner.inventoryComponent
        .getItems()
        .filter(i => i.type === ItemType.AddManaSelf);
    return manaItems.length > 0;
}

export function resolveHasHealingItem(ai: AIComponent) {
    if (!ai.owner.inventoryComponent) {
        return false;
    }

    const manaItems = ai.owner.inventoryComponent
        .getItems()
        .filter(i => i.type === ItemType.HealSelf);
    return manaItems.length > 0;
}

export function resolveInDangerousArea() {
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
    return ai.state === "cower";
}

export function resolveAtFallbackPosition() {
    // FIXME
    return false;
}

export function resolveHasArrows() {
    // FIXME
    return false;
}
