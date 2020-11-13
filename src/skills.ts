import { RNG } from "./rot/index";

import globals from "./globals";
import { ConfusedAI } from "./ai/components";
import { createHasteEffect, createSlowEffect } from "./effects";
import { GameMap, getRandomFighterWithinRange, isBlocked, Point, setAllToExplored } from "./map";
import { displayMessage } from "./ui";
import { ItemDataDetails, SpellDataDetails } from "./data";
import { createObject, GameObject } from "./object";
import { randomIntFromInterval, Nullable } from "./util";
import { mouseTarget } from "./input-handler";

export type SkillFunction = (
    details: ItemDataDetails | SpellDataDetails,
    user: GameObject,
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    objects: Nullable<GameObject[]>,
    rotation: Nullable<number>
) => boolean;

/**
 * Call the heal function on the user's fighter instance. Calls
 * the provided callback with true if the item was successfully used
 * and false otherwise.
 *
 * @param {Object} item The item data
 * @param {GameObject} user The object using the item
 */
export function castHeal(item: ItemDataDetails | SpellDataDetails, user: GameObject) {
    if (item.value === null) { throw new Error("Item does not have a healing value"); }
    if (user.fighter === null) { throw new Error("Cannot heal a user without a fighter"); }

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
    if (item.value === null) { throw new Error("Item does not have a value"); }
    if (user.fighter === null) { throw new Error("Cannot increase mana on a user without a fighter"); }

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
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    objects: Nullable<GameObject[]>
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value for castDamageSpell"); }
    if (target === null) { throw new Error("Target cannot be null for castDamageSpell"); }
    if (map === null) { throw new Error("Map cannot be null for castDamageSpell"); }
    if (objects === null) { throw new Error("Objects cannot be null for castDamageSpell"); }

    const object = mouseTarget(target, map, objects);
    if (object === null) {
        displayMessage("Canceled casting");
        return false;
    }
    if (object.fighter === null) {
        displayMessage(`${object.name} isn't attackable`);
        return false;
    }

    object.fighter.takeDamage(item.value, false, item.damageType);

    // Check for the fighter again because it could have died already
    if (object.fighter !== null && item.statusEffectFunc !== undefined) {
        const stats = object.fighter.getEffectiveStats();

        if (RNG.getUniform() <= stats.ailmentSusceptibility) {
            const effectDamage = Math.round(stats.maxHp * 0.0625);
            const turns = randomIntFromInterval(3, 6);
            object.fighter.addStatusEffect(
                item.statusEffectFunc(object, effectDamage, turns)
            );
        }
    }

    return true;
}

export function castWildDamageSpell(
    item: SpellDataDetails | ItemDataDetails,
    user: GameObject,
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    objects: Nullable<GameObject[]>
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value"); }
    if (map === null) { throw new Error("Map cannot be null for castDamageSpell"); }
    if (objects === null) { throw new Error("Objects cannot be null for castDamageSpell"); }

    let object;
    do {
        object = getRandomFighterWithinRange(map, objects, user, 16);
    } while (object === user);

    if (object === null) {
        if (user === globals.Game.player) {
            displayMessage("No target is close enough to use the scroll");
        }
        return false;
    }

    object.fighter!.takeDamage(item.value, false, item.damageType);

    // Check for the fighter again because it could have died already
    if (object.fighter !== null && item.statusEffectFunc !== undefined) {
        const stats = object.fighter.getEffectiveStats();

        if (RNG.getUniform() <= stats.ailmentSusceptibility) {
            const effectDamage = Math.round(stats.maxHp * 0.0625);
            const turns = randomIntFromInterval(3, 6);
            object.fighter.addStatusEffect(
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
    if (item.value === null) { throw new Error("Item does not have a value"); }
    if (target.ai === null) { throw new Error("Cannot confuse an object without an AI"); }

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
    if (item.value === null) { throw new Error("Item does not have a value"); }
    if (user.fighter === null) { throw new Error("user of castHaste must have a fighter"); }

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
    if (item.value === null) { throw new Error("Item does not have a value"); }
    if (target.fighter === null) { throw new Error("target of castSlow must have a fighter"); }

    const statusEffects = target.fighter.getStatusEffects();
    if (statusEffects.filter(e => e.name === "Slow").length > 0) {
        displayMessage(`${target.name} is already slowed`);
        return false;
    }

    displayMessage(`Spell hits and slows ${target.name}`);
    target.fighter.addStatisticEffect(createSlowEffect(target, item.value));
    return true;
}

export function castFireWall(
    item: SpellDataDetails | ItemDataDetails,
    user: GameObject,
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    objects: Nullable<GameObject[]>,
    rotation: Nullable<number>
): boolean {
    if (target === null) { throw new Error("Target cannot be null for castFireWall"); }
    if (map === null) { throw new Error("Map cannot be null for castFireWall"); }
    if (objects === null) { throw new Error("Objects cannot be null for castFireWall"); }
    if (rotation === null) { rotation = 0; }

    let i: number = 0;
    while(i < 6) {
        const { blocks, object } = isBlocked(map, objects, target.x, target.y + i);

        if (blocks === true && object === null) {
            i++;
            continue;
        }

        let obj;
        switch (rotation) {
            default:
            case 0:
                obj = createObject("fire_effect", target.x, target.y + i);
                break;
            case 90:
                obj = createObject("fire_effect", target.x + i, target.y);
                break;
            case 180:
                obj = createObject("fire_effect", target.x, target.y - i);
                break;
            case 270:
                obj = createObject("fire_effect", target.x - i, target.y);
                break;
        }
        globals.Game.addObject(obj);
        i++;
    }

    return true;
}
