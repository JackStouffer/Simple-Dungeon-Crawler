import { cloneDeep } from "lodash";
import { DamageType } from "./data";
import { FighterStats } from "./fighter";

import globals from "./globals";
import { GameObject } from "./object";
import { displayMessage } from "./ui";
import { Nullable } from "./util";

export type EffectActCallback = (owner: GameObject) => void;

export enum StatusEffectType {
    Burn
}

/**
 * Implements effects to Fighters that have a different effect
 * each turn for a set amount of turns.
 *
 * E.g. reducing hp each turn by 5 is a different effect because
 * turn one is 100 hp -> 95 hp, turn two is 95 hp -> 90 hp, etc.
 * An example of an effect that is not different over time would
 * be a reduction of a Fighter's base strength by 5 for 10 turns,
 * as each turn is a reduction from say 10 -> 5.
 */
export class StatusEffect {
    owner: GameObject;
    readonly name: string;
    turns: number;
    private readonly actCallback: Nullable<EffectActCallback>;
    private readonly endCallback: Nullable<EffectActCallback>;

    /**
     * Create a new StatusEffect
     * @param {GameObject} owner The game object this effect is on
     * @param {String} name The name of the effect
     * @param {Number} turns The number of turns this effect will exist
     * @param {Function} actCallback The function to call every turn, called with owner
     * @param {Function} endCallback The function to call when the effect ends, called with owner
     */
    constructor(
        owner: GameObject,
        name: string,
        turns: number,
        actCallback: Nullable<EffectActCallback> = null,
        endCallback: Nullable<EffectActCallback> = null) {
        this.owner = owner;
        this.name = name;
        this.turns = turns;
        this.actCallback = actCallback;
        this.endCallback = endCallback;
    }

    act() {
        this.turns--;

        if (this.actCallback !== null) {
            this.actCallback(this.owner);
        }

        if (this.turns === 0 && this.endCallback !== null) {
            this.endCallback(this.owner);
        }
    }
}

export interface StatisticEffectModifier {
    stat: string;
    type: "multiply" | "add";
    value: number;
}

/**
 * Implements a constant effect to a Fighter's base stats, such as increased
 * speed or strength for a specified number of turns.
 */
export class StatisticEffect {
    owner: GameObject;
    name: string;
    turns: number;
    private readonly modifier: StatisticEffectModifier;

    constructor(owner: GameObject, name: string, turns: number, modifier: StatisticEffectModifier) {
        this.owner = owner;
        this.name = name;
        this.turns = turns;
        this.modifier = modifier;
    }

    act() {
        this.turns--;
    }

    modifyStats(stats: FighterStats) {
        // don't want to accidentally modify the actor's base stats
        const copiedStats = cloneDeep(stats);

        switch (this.modifier.type) {
            case "add":
                copiedStats[this.modifier.stat] += this.modifier.value;
                break;
            case "multiply":
                copiedStats[this.modifier.stat] *= this.modifier.value;
                break;
            default:
                throw new Error(`Bad StatisticEffect type ${this.modifier.type}`);
        }

        return copiedStats;
    }
}

/**
 * Create an StatusEffect of applying damage over time
 * @param  {GameObject} victim     Who to apply the effect to
 * @param  {Number} damage         The amount of damage to give each turn
 * @param  {Number} turns          The number of turns to last
 * @returns {StatusEffect}                The resulting effect object
 */
export function createBurnEffect(victim: GameObject, damage: number, turns: number): StatusEffect {
    function act(owner: GameObject) {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }

        if (owner.fighter !== null) {
            owner.fighter.takeDamage(damage, false, DamageType.Fire);
        }

        if (owner === globals.Game.player) {
            displayMessage(`You were hurt by the burn for ${damage} damage`);
        } else {
            displayMessage(`${owner.name} was hurt by the burn for ${damage} damage`);
        }
    }

    return new StatusEffect(victim, "Burn", turns, act);
}

/**
 * Doubles the user's speed and sets it back when turns reaches
 * zero.
 * @param  {GameObject} user Who to apply the effect to
 * @param  {Number} turns The number of turns to last
 * @returns {StatusEffect} The resulting effect object
 */
export function createHasteEffect(user: GameObject, turns: number): StatisticEffect {
    if (user.fighter === null) { throw new Error("user of createHasteEffect must have a fighter"); }
    return new StatisticEffect(user, "Haste", turns, { stat: "speed", type: "multiply", value: 2 });
}

/**
 * Halves the victim's speed and sets it back when turns reaches
 * zero.
 * @param  {GameObject} victim Who to apply the effect to
 * @param  {Number} turns The number of turns to last
 * @returns {StatusEffect} The resulting effect object
 */
export function createSlowEffect(victim: GameObject, turns: number): StatisticEffect {
    if (victim.fighter === null) { throw new Error("user of createHasteEffect must have a fighter"); }
    return new StatisticEffect(victim, "Slow", turns, { stat: "speed", type: "multiply", value: 0.5 });
}
