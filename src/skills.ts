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
export function castHeal(item: ItemDataDetails | SpellDataDetails, user: GameObject): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (item.value === null) { throw new Error("Item does not have a healing value"); }
    if (user.fighter === null) { throw new Error("Cannot heal a user without a fighter"); }

    const stats = user.fighter.getEffectiveStats();
    if (stats.hp >= stats.maxHp) {
        if (user === globals.Game.player) {
            displayMessage("You are already at full health.");
        } else {
            displayMessage(`${user.name} tries and fails to take a health potion`);
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
    if (globals.Game === null) { throw new Error("Global game object is null"); }
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
        displayMessage(`${object.name} isn't attack-able`);
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
    if (globals.Game === null) { throw new Error("Global game object is null"); }
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
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    objects: Nullable<GameObject[]>
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value"); }
    if (target === null) { throw new Error("Target cannot be null for castConfuse"); }
    if (map === null) { throw new Error("Map cannot be null for castConfuse"); }
    if (objects === null) { throw new Error("Objects cannot be null for castConfuse"); }

    const object = mouseTarget(target, map, objects);
    if (object === null) {
        displayMessage("Canceled casting");
        return false;
    }
    if (object.ai === null) { throw new Error("Cannot confuse an object without an AI"); }
    if (object.fighter === null) {
        displayMessage(`${object.name} isn't attack-able`);
        return false;
    }

    displayMessage(object.name + " is now confused");
    const oldAI = object.ai;
    object.ai = new ConfusedAI(oldAI, item.value);
    object.ai.owner = object;
    return true;
}

export function castClairvoyance(): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

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
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    objects: Nullable<GameObject[]>
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value"); }
    if (target === null) { throw new Error("Target cannot be null for castSlow"); }
    if (map === null) { throw new Error("Map cannot be null for castSlow"); }
    if (objects === null) { throw new Error("Objects cannot be null for castSlow"); }

    const object = mouseTarget(target, map, objects);
    if (object === null) {
        displayMessage("Canceled casting");
        return false;
    }
    if (object.ai === null) { throw new Error("Cannot confuse an object without an AI"); }
    if (object.fighter === null) {
        displayMessage(`${object.name} isn't slow-able`);
        return false;
    }

    const statusEffects = object.fighter.getStatusEffects();
    if (statusEffects.filter(e => e.name === "Slow").length > 0) {
        displayMessage(`${object.name} is already slowed`);
        return false;
    }

    displayMessage(`Spell hits and slows ${object.name}`);
    object.fighter.addStatisticEffect(createSlowEffect(object, item.value));
    return true;
}

function castWall(
    item: SpellDataDetails | ItemDataDetails,
    user: GameObject,
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    objects: Nullable<GameObject[]>,
    rotation: Nullable<number>,
    objectId: string
): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (target === null) { throw new Error("Target cannot be null for castWall"); }
    if (map === null) { throw new Error("Map cannot be null for castWall"); }
    if (objects === null) { throw new Error("Objects cannot be null for castWall"); }
    if (rotation === null) { rotation = 0; }
    if (item.areaOfEffect === null) { throw new Error("areaOfEffect cannot be null for castWall"); }

    for (let dx = 0; dx < item.areaOfEffect.width; dx++) {
        for (let dy = 0; dy < item.areaOfEffect.height; dy++) {
            let locationX: number, locationY: number;
            switch (rotation) {
                default:
                case 0:
                    locationX = target.x + dx;
                    locationY = target.y + dy;
                    break;
                case 90:
                    locationX = target.x + dy;
                    locationY = target.y + dx;
                    break;
                case 180:
                    locationX = target.x + dx;
                    locationY = target.y - dy;
                    break;
                case 270:
                    locationX = target.x - dy;
                    locationY = target.y + dx;
                    break;
            }

            const { blocks, object } = isBlocked(map, objects, locationX, locationY);

            if (blocks === true && object === null) {
                continue;
            }

            globals.Game.addObject(createObject(objectId, locationX, locationY));
        }
    }

    return true;
}

export function castIceWall(
    item: SpellDataDetails | ItemDataDetails,
    user: GameObject,
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    objects: Nullable<GameObject[]>,
    rotation: Nullable<number>
): boolean {
    return castWall(
        item,
        user,
        target,
        map,
        objects,
        rotation,
        "ice_wall"
    );
}

export function castFireWall(
    item: SpellDataDetails | ItemDataDetails,
    user: GameObject,
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    objects: Nullable<GameObject[]>,
    rotation: Nullable<number>
): boolean {
    return castWall(
        item,
        user,
        target,
        map,
        objects,
        rotation,
        "fire_effect"
    );
}
