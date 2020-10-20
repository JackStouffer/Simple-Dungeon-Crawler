import { RNG } from "./rot/index";

import globals from "./globals";
import { ConfusedAI } from "./ai/components";
import { createHasteEffect, createSlowEffect } from "./effects";
import { getRandomFighterWithinRange, setAllToExplored } from "./map";
import { displayMessage } from "./ui";
import { randomIntFromInterval } from "./util";
import { ItemDataDetails, SpellDataDetails } from "./data";
import { GameObject } from "./object";

/**
 * Call the heal function on the user's fighter instance. Calls
 * the provided callback with true if the item was successfully used
 * and false otherwise.
 *
 * @param {Object} item The item data
 * @param {GameObject} user The object using the item
 */
export function castHeal(item: ItemDataDetails | SpellDataDetails, user: GameObject) {
    const stats = user.fighter.getEffectiveStats();
    if (stats.hp >= stats.maxHp) {
        if (user === globals.Game.player) {
            displayMessage("You are already at full health.");
        } else {
            displayMessage(user.name + " tries and fails to take a health potion");
        }

        return false;
    }

    user.fighter.heal(item.value);
    return true;
}

/**
 * Call the addMana function on the user's fighter instance. Calls
 * the provided callback with true if the item was successfully used
 * and false otherwise.
 *
 * @param {Object} item The item data
 * @param {GameObject} user The object using the item
 */
export function castIncreaseMana(
    item: ItemDataDetails | SpellDataDetails,
    user: GameObject
): boolean {
    const stats = user.fighter.getEffectiveStats();
    if (stats.mana >= stats.maxMana) {
        if (user === globals.Game.player) {
            displayMessage("You are already at full mana.");
        } else {
            displayMessage(user.name + " tries and fails to take a mana potion");
        }

        return false;
    }

    user.fighter.addMana(item.value);
    return true;
}

export function castDamageSpell(
    item: SpellDataDetails | ItemDataDetails,
    user: GameObject,
    target: GameObject
): boolean {
    target.fighter.takeDamage(item.value, false, item.damageType);

    // Check for the fighter again because it could have died already
    if (target.fighter && item.statusEffectFunc) {
        const stats = target.fighter.getEffectiveStats();

        if (RNG.getUniform() <= stats.ailmentSusceptibility) {
            const effectDamage = Math.round(stats.maxHp * 0.0625);
            const turns = randomIntFromInterval(3, 6);
            target.fighter.addStatusEffect(
                item.statusEffectFunc(target, effectDamage, turns)
            );
        }
    }

    return true;
}

export function castWildDamageSpell(
    item: SpellDataDetails | ItemDataDetails,
    user: GameObject
): boolean {
    let target;
    do {
        target = getRandomFighterWithinRange(globals.Game.map, globals.Game.gameObjects, user, 16);
    } while (target === user);

    if (target === null) {
        if (user === globals.Game.player) {
            displayMessage("No target is close enough to use the scroll");
        }
        return false;
    }

    target.fighter.takeDamage(item.value, false, item.damageType);

    // Check for the fighter again because it could have died already
    if (target.fighter && item.statusEffectFunc) {
        const stats = target.fighter.getEffectiveStats();

        if (RNG.getUniform() <= stats.ailmentSusceptibility) {
            const effectDamage = Math.round(stats.maxHp * 0.0625);
            const turns = randomIntFromInterval(3, 6);
            target.fighter.addStatusEffect(
                item.statusEffectFunc(target, effectDamage, turns)
            );
        }
    }

    return true;
}

export function castConfuse(
    item: SpellDataDetails | ItemDataDetails,
    user: GameObject,
    target: GameObject
): boolean {
    displayMessage(target.name + " is now confused");
    const oldAI = target.ai;
    target.ai = new ConfusedAI(oldAI, item.value);
    target.ai.owner = target;
    return true;
}

export function castClairvoyance(): boolean {
    displayMessage("You have been granted Clairvoyance");
    setAllToExplored(globals.Game.map);
    return true;
}

/**
 * Double the user's fighter's speed stat for value number
 * of turns. Does not stack.
 *
 * @param {Object} item The item data
 * @param {GameObject} user The object using the item
 */
export function castHaste(
    item: ItemDataDetails | SpellDataDetails,
    user: GameObject
): boolean {
    if (!user.fighter) { throw new Error("user of castHaste must have a fighter"); }

    const effects = user.fighter.getStatisticEffects();
    if (effects.filter(e => e.name === "Haste").length > 0) {
        return false;
    }

    user.fighter.addStatisticEffect(createHasteEffect(user, item.value));
    return true;
}

/**
 * Half the target's fighter speed stat for value number
 * of turns. Does not stack.
 *
 * @param {Object} item The item data
 * @param {GameObject} user The object using the item
 */
export function castSlow(
    item: SpellDataDetails | ItemDataDetails,
    user: GameObject,
    target: GameObject
): boolean {
    const statusEffects = target.fighter.getStatusEffects();
    if (statusEffects.filter(e => e.name === "Slow").length > 0) {
        displayMessage(`${target.name} is already slowed`);
        return false;
    }

    displayMessage(`Spell hits and slows ${target.name}`);
    target.fighter.addStatisticEffect(createSlowEffect(target, item.value));
    return true;
}
