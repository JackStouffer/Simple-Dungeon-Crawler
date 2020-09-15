"use strict";

import { RNG } from "rot-js";

import globals from "./globals";
import { ConfusedAI } from "./ai";
import { getObjectsAtLocation, getClosestVisibleFighter, setAllToExplored } from "./map";
import { randomIntFromInterval, readMouse } from "./util";

/**
 * Unhook the mouse look functionality and then listen for a mouse
 * input. If it's a left click on an object with a fighter component,
 * then re-hook the mouse look function and pass the target to the
 * callback cb.
 * @return {void}
 */
export async function mouseTarget() {
    globals.Game.unhookMouseLook();
    globals.Game.drawAll();

    let e;
    do {
        e = await readMouse();
    } while (!e || e.button !== 0);

    globals.Game.hookMouseLook();
    const pos = globals.Game.display.eventToPosition(e);

    let target;
    const objects = getObjectsAtLocation(globals.Game.gameObjects, pos[0], pos[1]);

    for (let i = 0; i < objects.length; i++) {
        if (objects[i].fighter) {
            target = objects[i];
            break;
        }
    }

    if (target && target.fighter) {
        return target;
    } else {
        return null;
    }
}

/**
 * Call the heal function on the user's fighter instance. Calls
 * the provided callback with true if the item was successfully used
 * and false otherwise.
 *
 * @param {Object} item The item data
 * @param {GameObject} user The object using the item
 */
export async function castHeal(item, user) {
    if (user.fighter.hp >= user.fighter.maxHp) {
        if (user === globals.Game.player) {
            globals.Game.displayMessage("You are already at full health.");
        } else {
            globals.Game.displayMessage(user.name + " tries and fails to take a health potion");
        }

        return false;
    }

    user.fighter.heal(item.value);
    return true;
}

export async function castDamageSpell(item, user) {
    globals.Game.displayMessage("Left click on an enemy to target it, click elsewhere to cancel");
    const target = await mouseTarget();

    if (target === null) {
        globals.Game.displayMessage("Canceled casting");
        return false;
    }

    globals.Game.displayMessage(`Spell hits ${target.name} for ${item.value} damage`);
    target.fighter.takeDamage(user, item.value, item.damageType);

    // Check for the fighter again because it could have died already
    if (target.fighter && item.statusEffectFunc) {
        if (RNG.getUniform() <= target.fighter.ailmentSusceptibility) {
            const effectDamage = Math.round(target.fighter.maxHp * 0.0625);
            const turns = randomIntFromInterval(3, 6);
            target.fighter.addStatusEffect(
                item.statusEffectFunc(target, effectDamage, turns)
            );
        }
    }

    return true;
}

export async function castWildDamageSpell(item, user) {
    const target = getClosestVisibleFighter(globals.Game.map, globals.Game.gameObjects, user, 8);

    if (target === null) {
        if (user === globals.Game.player) {
            globals.Game.displayMessage("No target is close enough to use the scroll");
        }
        return false;
    }

    globals.Game.displayMessage(`Spell hits ${target.name} for ${item.value} damage`);
    target.fighter.takeDamage(user, item.value, item.damageType);

    // Check for the fighter again because it could have died already
    if (target.fighter && item.statusEffectFunc) {
        if (RNG.getUniform() <= target.fighter.ailmentSusceptibility) {
            const effectDamage = Math.round(target.fighter.maxHp * 0.0625);
            const turns = randomIntFromInterval(3, 6);
            target.fighter.addStatusEffect(
                item.statusEffectFunc(target, effectDamage, turns)
            );
        }
    }

    return true;
}

export async function castConfuse(item) {
    globals.Game.displayMessage("Left click on an enemy to target it, click elsewhere to cancel");
    const target = await mouseTarget();
    if (target === null) {
        return false;
    }

    globals.Game.displayMessage(target.name + " is now confused");
    const oldAI = target.ai;
    target.ai = new ConfusedAI(oldAI, item.value);
    target.ai.owner = target;
    return true;
}

export async function castClairvoyance() {
    globals.Game.displayMessage("You have been granted Clairvoyance");
    setAllToExplored(globals.Game.map);
}
