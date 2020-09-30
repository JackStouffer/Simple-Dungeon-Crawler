/* global ENV */

"use strict";

import { RNG } from "rot-js";

import globals from "./globals";
import { LEVEL_UP_BASE, LEVEL_UP_FACTOR, SpellData } from "./data";
import { displayMessage } from "./ui";
import { cloneDeep } from "lodash";

/**
 * Component which controls the combat information and interaction
 * between different fighters
 */
class BasicFighter {
    constructor(data, deathCallback=null) {
        this.stats = {
            hp: data.maxHp,
            maxHp: data.maxHp,
            mana: data.maxMana,
            maxMana: data.maxMana,
            strength: data.strength,
            defense: data.defense,
            speed: data.speed
        };

        this.deathCallback = deathCallback;
        this.owner = null;

        this.experience = data.experience;
        this.experienceGiven = data.experienceGiven;
        this.level = data.level;

        this.criticalChance = ("criticalChance" in data) ? data.criticalChance : 0.05;
        this.criticalDamageMultiplier = 1.5;

        this.statusEffects = [];
        this.statisticEffects = [];
        this.ailmentSusceptibility = data.ailmentSusceptibility;

        this.knownSpells = new Set();
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        const effectiveStats = this.getEffectiveStats();

        const levelUpEXP = LEVEL_UP_BASE + (this.level * LEVEL_UP_FACTOR);
        if (this.experience >= levelUpEXP) {
            this.level += 1;
            this.experience = 0;
            this.stats.hp = effectiveStats.maxHp;
            this.stats.mana = effectiveStats.maxMana;
            this.stats.strength++;

            if (this.owner === globals.Game.player) {
                displayMessage(`You reached level ${this.level}!`);
            }
        }

        for (let i = 0; i < this.statusEffects.length; i++) {
            const effect = this.statusEffects[i];
            effect.act();

            if (effect.turns === 0) {
                displayMessage(`${effect.name} has ended for ${this.owner.name}`);
                this.statusEffects.splice(i, 1);
            }
        }

        for (let i = 0; i < this.statisticEffects.length; i++) {
            const effect = this.statisticEffects[i];
            effect.act();

            if (effect.turns === 0) {
                displayMessage(`${effect.name} has ended for ${this.owner.name}`);
                this.statisticEffects.splice(i, 1);
            }
        }
    }

    /**
     * Take damage from an attacker. Takes this fighter's current defense
     * into account.
     * @param {Number} damage The amount of damage
     * @returns {Boolean} Did the attack kill the target
     */
    takeDamage(damage) {
        const effectiveStats = this.getEffectiveStats();
        damage = Math.max(1, damage - effectiveStats.defense);

        if (damage > 0) {
            this.stats.hp -= damage;
        }

        if (this.stats.hp <= 0) {
            if (this.deathCallback !== null) {
                this.deathCallback(this.owner);
            }

            return true;
        }

        return false;
    }

    attack(target) {
        if (!target.fighter) { return; }

        const effectiveStats = this.getEffectiveStats();
        let damage = Math.round(effectiveStats.strength);
        let critical = false;

        if (RNG.getUniform() <= this.criticalChance) {
            damage = Math.ceil(damage * this.criticalDamageMultiplier);
            critical = true;
        }

        if (damage > 0) {
            if (critical) {
                displayMessage("CRITICAL! " + this.owner.name + " attacks " + target.name + " for " + damage + " damage.");
            } else {
                displayMessage(this.owner.name + " attacks " + target.name + " for " + damage + " damage.");
            }

            const killed = target.fighter.takeDamage(damage);
            if (killed) {
                this.experience += this.experienceGiven;
            }
        } else {
            displayMessage(this.owner.name + " attacks " + target.name + ", but it's too weak!");
        }
    }

    heal(amount) {
        const effectiveStats = this.getEffectiveStats();
        this.stats.hp += amount;
        if (this.stats.hp > effectiveStats.maxHp) {
            this.stats.hp = effectiveStats.maxHp;
        }
    }

    useMana(cost) {
        this.stats.mana = Math.max(this.stats.mana - cost, 0);
    }

    /**
     * Find the fighter's current stats with the effects of all
     * of the statistic effects.
     * @returns {Object} An object containing the stats
     */
    getEffectiveStats() {
        if (this.statisticEffects.length === 0) { return this.stats; }

        let newStats = this.stats;
        this.statisticEffects.forEach(e => {
            newStats = e.modifyStats(newStats);
        });

        // Max hp modifiers should not kill the player
        // no such check for mana so effects like "silence"
        // work
        if (newStats.maxHp <= 0) {
            newStats.maxHp = 1;
        }

        // If the current max HP or mana is less than the current
        // hp or mana, we want to reduce the actual hp or mana rather
        // than the effective hp or mana, so that reducing the max HP
        // "damages" the fighter so when the max HP goes back up, the
        // HP is still lowered
        if (this.stats.hp > newStats.maxHp) {
            this.stats.hp = newStats.maxHp;
            newStats.hp = newStats.maxHp;
        }
        if (this.stats.mana > newStats.maxMana) {
            this.stats.mana = newStats.maxMana;
            newStats.mana = newStats.maxMana;
        }

        return newStats;
    }

    addStatusEffect(effect) {
        if (ENV === "DEV" && effect.constructor.name !== "StatusEffect") {
            throw new Error("effect must be of type StatusEffect");
        }
        this.statusEffects.push(effect);
    }

    getStatusEffects() {
        // Copy the array because JS doesn't have const references
        return cloneDeep(this.statusEffects);
    }

    addStatisticEffect(effect) {
        if (ENV === "DEV" && effect.constructor.name !== "StatisticEffect") {
            throw new Error("effect must be of type StatisticEffect");
        }
        this.statisticEffects.push(effect);
    }

    getStatisticEffects() {
        // Copy the array because JS doesn't have const references
        return cloneDeep(this.statisticEffects);
    }

    /**
     * Add a spell to the set of known spells by this
     * fighter.
     * @param {String} id A spell id
     * @returns {Boolean} If the spell was successfully learned
     */
    addSpellById(id) {
        if (this.knownSpells.has(id)) { return false; }
        this.knownSpells.add(id);
        return true;
    }

    getKnownSpells() {
        return [...this.knownSpells].map(s => {
            return {
                id: s,
                displayName: SpellData[s].displayName,
                manaCost: SpellData[s].manaCost,
                value: SpellData[s].value,
                type: SpellData[s].type
            };
        });
    }

    hasSpell(spellID) {
        return this.knownSpells.has(spellID);
    }

    getSpeed() {
        return this.getEffectiveStats().speed;
    }
}
export { BasicFighter };
