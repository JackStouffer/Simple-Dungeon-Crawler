"use strict";

import { RNG } from "rot-js";

import globals from "./globals";
import { ConfusedAI } from "./ai";
import { getObjectsAtLocation, getClosestVisibleFighter, setAllToExplored } from "./map";
import { randomIntFromInterval } from "./util";

/**
 * Unhook the mouse look functionality and then listen for a mouse
 * input. If it's a left click on an object with a fighter component,
 * then re-hook the mouse look function and pass the target to the
 * callback cb.
 *
 * @param  {Function} cb callback
 * @return {void}
 */
const mouseTarget = function (cb) {
    globals.Game.unhookMouseLook();
    globals.Game.drawAll();

    globals.Game.canvas.addEventListener("mousedown", function _listener(e) {
        if (e.button === 0) {
            const pos = globals.Game.display.eventToPosition(e);

            globals.Game.canvas.removeEventListener("mousedown", _listener);
            globals.Game.hookMouseLook();

            let target;
            let objects = getObjectsAtLocation(globals.Game.gameObjects, pos[0], pos[1]);

            for (var i = 0; i < objects.length; i++) {
                if (objects[i].fighter) {
                    target = objects[i];
                    break;
                }
            }

            if (target && target.fighter) {
                return cb(target);
            } else {
                return cb(null);
            }
        }
    });
};

export function castHeal(item, user, ownerCallback) {
    if (user.fighter.hp >= user.fighter.maxHp) {
        if (user === globals.Game.player) {
            globals.Game.displayMessage("You are already at full health.");
        } else {
            globals.Game.displayMessage(user.name + " tries and fails to take a health potion");
        }
        return ownerCallback(false);
    }
    user.fighter.heal(item.value);
    return ownerCallback(true);
}

export function castDamageSpell(item, user, ownerCallback) {
    globals.Game.displayMessage("Left click on an enemy to target it, click elsewhere to cancel");
    mouseTarget(function (target) {
        if (target === null) {
            globals.Game.displayMessage("Canceled casting");
            return ownerCallback(false);
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

        return ownerCallback(true);
    });
}

export function castWildDamageSpell(item, user, ownerCallback) {
    const target = getClosestVisibleFighter(globals.Game.map, globals.Game.gameObjects, user, 8);

    if (target === null) {
        if (user === globals.Game.player) {
            globals.Game.displayMessage("No target is close enough to use the scroll");
        }
        return ownerCallback(false);
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

    return ownerCallback(true);
}

export function castConfuse(item, user, ownerCallback) {
    globals.Game.displayMessage("Left click on an enemy to target it, click elsewhere to cancel");
    mouseTarget(function (target) {
        if (target === null) {
            return ownerCallback(false);
        }

        globals.Game.displayMessage(target.name + " is now confused");
        const oldAI = target.ai;
        target.ai = new ConfusedAI(oldAI, item.value);
        target.ai.owner = target;
        return ownerCallback(true);
    });
}

export function castClairvoyance(item, user, ownerCallback) {
    globals.Game.displayMessage("You have been granted Clairvoyance");
    setAllToExplored(globals.Game.map);
    return ownerCallback(true);
}
