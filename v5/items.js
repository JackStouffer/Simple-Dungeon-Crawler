'use strict';

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
    Game.unhookMouseLook();
    Game.drawAll();

    Game.canvas.addEventListener("mousedown", function _listener(e) {
        if (e.button === 0) {
            const pos = Game.display.eventToPosition(e);

            Game.canvas.removeEventListener("mousedown", _listener);
            Game.hookMouseLook();

            let target;
            let objects = getObjectsAtLocation(Game.gameObjects, pos[0], pos[1]);

            for (var i = 0; i < objects.length; i++) {
                if (objects.fighter) {
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

const useHealthItem = function(item, user, ownerCallback) {
    if (user.fighter.hp >= user.fighter.maxHp) {
        if (user === Game.player) {
            Game.displayMessage('You are already at full health.');
        } else {
            Game.displayMessage(user.name + ' tries and fails to take a health potion');
        }
        return ownerCallback(false);
    }
    user.fighter.heal(item.value);
    return ownerCallback(true);
};

const useDamageScrollItem = function(item, user, ownerCallback) {
    Game.displayMessage('Left click on an enemy to target it, click elsewhere to cancel');
    mouseTarget(function (target) {
        if (target === null) {
            Game.displayMessage("Canceled casting");
            return ownerCallback(false);
        }

        Game.displayMessage(`Spell hits ${target.name} for ${item.value} damage`);
        target.fighter.takeDamage(user, item.value, item.damageType);

        // Check for the fighter again because it could have died already
        if (target.fighter && item.statusEffectFunc) {
            if (ROT.RNG.getUniform() <= target.fighter.ailmentSusceptibility) {
                const effectDamage = Math.round(target.fighter.maxHp * 0.0625);
                const turns = randomIntFromInterval(3, 6);
                target.fighter.addStatusEffect(
                    item.statusEffectFunc(target, effectDamage, turns)
                );
            }
        }

        return ownerCallback(true);
    });
};

const useWildDamageScrollItem = function(item, user, ownerCallback) {
    const target = getClosestVisibleFighter(Game.map, Game.gameObjects, user, 8);

    if (target === null) {
        if (user === Game.player) {
            Game.displayMessage('No target is close enough to use the scroll');
        }
        return ownerCallback(false);
    }

    Game.displayMessage(`Spell hits ${target.name} for ${item.value} damage`);
    target.fighter.takeDamage(user, item.value, item.damageType);

    // Check for the fighter again because it could have died already
    if (target.fighter && item.statusEffectFunc) {
        if (ROT.RNG.getUniform() <= target.fighter.ailmentSusceptibility) {
            const effectDamage = Math.round(target.fighter.maxHp * 0.0625);
            const turns = randomIntFromInterval(3, 6);
            target.fighter.addStatusEffect(
                item.statusEffectFunc(target, effectDamage, turns)
            );
        }
    }

    return ownerCallback(true);
};

const useConfuseScrollItem = function(item, user, ownerCallback) {
    Game.displayMessage('Left click on an enemy to target it, click elsewhere to cancel');
    mouseTarget(function (target) {
        if (target === null) {
            return ownerCallback(false);
        }

        Game.displayMessage(target.name + ' is now confused');
        const oldAI = target.ai;
        target.ai = new ConfusedAI(oldAI, item.value);
        target.ai.owner = target;
        return ownerCallback(true);
    });
};

const useClairvoyanceScrollItem = function(item, user, ownerCallback) {
    Game.displayMessage('You have been granted Clairvoyance');
    setAllToExplored(Game.map);
    return ownerCallback(true);
};
