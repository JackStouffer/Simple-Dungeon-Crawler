import { SpellData } from "../data";
import { distanceBetweenObjects } from "../map";

export function resolveTargetPositionKnown(ai) {
    return ai.state === "chase";
}

export function resolveTargetInLOS(ai) {
    // FIXME
    return ai.state === "chase";
}

export function resolveNextToTarget(ai) {
    return distanceBetweenObjects(ai.owner, ai.target) < 1.5;
}

export function resolveEnoughManaForSpell(spellID) {
    return function (ai) {
        const spellData = SpellData[spellID];
        return ai.owner.fighter.getEffectiveStats().mana >= spellData.manaCost;
    };
}

export function resolveLowHealth(ai) {
    const stats = ai.owner.fighter.getEffectiveStats();
    return (stats.hp / stats.maxHp) <= ai.lowHealthThreshold;
}

export function resolveLowMana(ai) {
    const stats = ai.owner.fighter.getEffectiveStats();
    return (stats.mana / stats.maxMana) <= ai.lowManaThreshold;
}

export function resolveHasManaItem(ai) {
    if (!ai.owner.inventoryComponent) {
        return false;
    }

    const manaItems = ai.owner.inventoryComponent
        .getItems()
        .filter(i => i.type === "add_mana");
    return manaItems.length > 0;
}

export function resolveHasHealingItem(ai) {
    if (!ai.owner.inventoryComponent) {
        return false;
    }

    const manaItems = ai.owner.inventoryComponent
        .getItems()
        .filter(i => i.type === "heal");
    return manaItems.length > 0;
}

export function resolveInDangerousArea() {
    // FIXME
    return false;
}

export function resolveTargetKilled(ai) {
    return ai.target.fighter === null;
}

export function resolveAfraid(ai) {
    return ai.fear >= ai.fearThreshold;
}

export function resolveCowering(ai) {
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