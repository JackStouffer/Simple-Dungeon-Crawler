"use strict";

import globals from "./globals";
import { displayMessage } from "./ui";

class Effect {
    constructor(owner, name, turns, actCallback = null, endCallback = null) {
        this.owner = owner;
        this.name = name;
        this.turns = turns;
        this.actCallback = actCallback;
        this.endCallback = endCallback;
    }

    act() {
        this.turns--;

        if (this.actCallback) {
            this.actCallback(this.owner);
        }

        if (this.turns === 0 && this.endCallback) {
            this.endCallback(this.owner);
        }
    }
}
export { Effect };

/**
 * Create an Effect of applying damage over time
 * @param  {GameObject} victim     Who to apply the effect to
 * @param  {Number} damage         The amount of damage to give each turn
 * @param  {Number} turns          The number of turns to last
 * @returns {Effect}                The resulting effect object
 */
export function createBurnEffect(victim, damage, turns) {
    function act(owner) {
        if (owner.fighter) {
            owner.fighter.takeDamage(null, damage);
        }

        if (owner === globals.Game.player) {
            displayMessage(`You were hurt by the burn for ${damage} damage`);
        } else {
            displayMessage(`${owner.name} was hurt by the burn for ${damage} damage`);
        }
    }

    return new Effect(victim, "Burn", turns, act);
}

/**
 * Doubles the user's speed and sets it back when turns reaches
 * zero.
 * @param  {GameObject} user Who to apply the effect to
 * @param  {Number} turns The number of turns to last
 * @returns {Effect} The resulting effect object
 */
export function createHasteEffect(user, turns) {
    if (!user.fighter) { throw new Error("user of createHasteEffect must have a fighter"); }

    const speed = user.fighter.getSpeed();

    function endCallback(owner) {
        owner.fighter.setSpeed(speed);
    }

    user.fighter.speed = Math.floor(speed * 2);
    return new Effect(user, "Haste", turns, null, endCallback);
}

/**
 * Halves the victim's speed and sets it back when turns reaches
 * zero.
 * @param  {GameObject} victim Who to apply the effect to
 * @param  {Number} turns The number of turns to last
 * @returns {Effect} The resulting effect object
 */
export function createSlowEffect(victim, turns) {
    const speed = victim.fighter.getSpeed();

    function endCallback(owner) {
        owner.fighter.setSpeed(speed);
    }

    victim.fighter.speed = Math.floor(speed / 2);
    return new Effect(victim, "Slow", turns, null, endCallback);
}
