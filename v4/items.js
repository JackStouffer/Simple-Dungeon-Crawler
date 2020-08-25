class Item {
    constructor(name, useCallback = null) {
        this.name = name;
        this.useCallback = useCallback;
    }

    use(target, ownerCallback) {
        if (this.useCallback === null) {
            Game.diplayMessage("Can't use " + this.name);
            return false;
        }
        return this.useCallback(target, ownerCallback);
    }
}

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
            const target = getActorOrObjectAtLocation(Game.map, Game.game_objects, Game.actors, pos[0], pos[1]);

            Game.canvas.removeEventListener("mousedown", _listener);
            Game.hookMouseLook();

            if (target && target.fighter) {
                return cb(target);
            } else {
                return cb(null);
            }
        }
    });
};

/**
 * Returns a new Item instance of a health potion which has
 * a function bound to the useCallback to heal the target for
 * hp points.
 *
 * @param  {Number} hp the amount to heal the target
 * @return {Item}      An Item
 */
const createHealthPotion = function(hp) {
    const heal = function(target, ownerCallback) {
        if (target.fighter.hp >= target.fighter.maxHp) {
            if (target === Game.player) {
                Game.displayMessage('You are already at full health.');
            } else {
                Game.displayMessage(target.name + ' tries and fails to take a health potion');
            }
            return ownerCallback(false);
        }
        target.fighter.heal(hp);
        return ownerCallback(true);
    };
    return new Item("Health Potion of +" + hp, heal);
};

const createTargetedDamageScroll = function(displayName, damage, damageType, statusEffectFunc=null) {
    const cast = function(user, ownerCallback) {
        Game.displayMessage('Left click on an enemy to target it, click elsewhere to cancel');
        mouseTarget(function (target) {
            if (target === null) {
                Game.displayMessage("Canceled casting");
                return ownerCallback(false);
            }

            Game.displayMessage(`Spell hits ${target.name} for ${damage} damage`);
            target.fighter.takeDamage(damage, damageType);

            if (target.fighter && statusEffectFunc) {
                if (ROT.RNG.getUniform() <= target.fighter.ailmentSusceptibility) {
                    const effectDamage = Math.round(target.fighter.maxHp * 0.0625);
                    const turns = randomIntFromInterval(3, 6);
                    target.statusEffects.push(
                        statusEffectFunc(target, effectDamage, turns)
                    );
                }
            }

            return ownerCallback(true);
        });
    };
    return new Item(displayName, cast);
};

const createWildDamageScroll = function(displayName, damage, damageType, statusEffectFunc=null) {
    const cast = function(user, ownerCallback) {
        const target = getClosestVisibleActor(Game.map, Game.actors, user, 8);

        if (target === null) {
            if (user === Game.player) {
                Game.displayMessage('No target is close enough to use the scroll');
            }
            return ownerCallback(false);
        }

        if (user === Game.player) {
            Game.displayMessage('Spell hits ' + target.name + ' for ' + damage + ' damage');
        } else {
            Game.displayMessage('Spell hits you for ' + damage + ' damage');
        }
        target.fighter.takeDamage(damage, damageType);

        if (target.fighter && statusEffectFunc) {
            if (ROT.RNG.getUniform() <= target.fighter.ailmentSusceptibility) {
                const effectDamage = Math.round(target.fighter.maxHp * 0.0625);
                const turns = randomIntFromInterval(3, 6);
                target.statusEffects.push(
                    statusEffectFunc(target, effectDamage, turns)
                );
            }
        }

        return ownerCallback(true);
    };
    return new Item(displayName, cast);
};

const createConfuseScroll = function (turns) {
    const cast = function(user, ownerCallback) {
        Game.displayMessage('Left click on an enemy to target it, click elsewhere to cancel');
        mouseTarget(function (target) {
            if (target === null) {
                return ownerCallback(false);
            }

            Game.displayMessage(target.name + ' is now confused');
            const oldAI = target.ai;
            target.ai = new ConfusedAI(oldAI, turns);
            target.ai.owner = target;
            return ownerCallback(true);
        });
    };
    return new Item("Confuse Scroll of " + turns + " turns", cast);
};


const createClairvoyanceScroll = function () {
    const cast = function(user, ownerCallback) {
        Game.displayMessage('You have been granted Clairvoyance');
        setAllToExplored(Game.map);
        return ownerCallback(true);
    };
    return new Item("Scroll of Clairvoyance", cast);
}
