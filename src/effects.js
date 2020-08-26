"use strict";

import globals from "./globals";

class Effect {
    constructor(owner, name, turns, actCallback) {
        this.owner = owner;
        this.name = name;
        this.turns = turns;
        this.actCallback = actCallback;
    }

    act() {
        this.actCallback(this.owner, this.name);
        this.turns--;
    }
}
export { Effect };

/**
 * Create an Effect of applying damage over time
 * @param  {GameObject} victim     Who to apply the effect to
 * @param  {Number} damage         The amount of damage to give each turn
 * @param  {Number} turns          The number of turns to last
 * @return {Effect}                The resulting effect object
 */
export function createBurnEffect(victim, damage, turns) {
    function act(owner) {
        if (owner.fighter) {
            owner.fighter.takeDamage(null, damage);
        }

        if (owner === globals.Game.player) {
            globals.Game.displayMessage("You were hurt by the burn for " + damage + " damage");
        } else {
            globals.Game.displayMessage(owner.name + " was hurt by the burn for " + damage + " damage");
        }
    }

    return new Effect(victim, "Burn", turns, act);
}
