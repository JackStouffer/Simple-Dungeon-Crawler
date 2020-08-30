"use strict";

import { RNG } from "rot-js";

import { LEVEL_UP_BASE, LEVEL_UP_FACTOR } from "./data";
import globals from "./globals";

/**
 * Component which controls the combat information and interaction
 * between different fighters
 */
class BasicFighter {
    constructor(data, deathCallback=null) {
        this.hp = data.maxHp;
        this.maxHp = data.maxHp;
        this.mana = data.maxMana;
        this.maxMana = data.maxMana;

        this.strength = data.strength;
        this.defense = data.defense;
        this.deathCallback = deathCallback;
        this.owner = null;

        this.experience = data.experience;
        this.experienceGiven = data.experienceGiven;
        this.level = data.level;

        this.criticalChance = data.criticalChance || 0.05;
        this.criticalDamageMultipler = 1.5;

        this.statusEffects = [];
        this.ailmentSusceptibility = data.ailmentSusceptibility;

        this.knownSpells = new Set();
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        const levelUpEXP = LEVEL_UP_BASE + (this.level * LEVEL_UP_FACTOR);
        if (this.experience >= levelUpEXP) {
            this.level += 1;
            this.experience = 0;
            this.hp = this.maxHp;
            this.mana = this.maxMana;
            this.strength++;

            if (this.owner === globals.Game.player) {
                globals.Game.displayMessage("You reached level " + this.level + "!");
            }
        }

        if (this.statusEffects.length > 0) {
            for (let i = 0; i < this.statusEffects.length; i++) {
                const effect = this.statusEffects[i];
                effect.act();

                if (effect.turns === 0) {
                    globals.Game.displayMessage(`${this.owner.name} recovered from its ${effect.name}`);
                    this.statusEffects.splice(i, 1);
                }
            }
        }
    }

    takeDamage(attacker, damage) {
        if (damage > 0) {
            this.hp -= damage;
        }

        if (this.hp <= 0) {
            attacker.fighter.experience += this.experienceGiven;

            if (this.deathCallback !== null) {
                this.deathCallback(this.owner);
            }
        }
    }

    attack(target) {
        if (!target.fighter) { return; }

        let damage = Math.round(Math.max(1, this.strength - target.fighter.defense));
        let critical = false;

        if (RNG.getUniform() <= this.criticalChance) {
            damage = Math.ceil(damage * this.criticalDamageMultipler);
            critical = true;
        }

        if (damage > 0) {
            if (critical) {
                globals.Game.displayMessage("CRITICAL! " + this.owner.name + " attacks " + target.name + " for " + damage + " damage.");
            } else {
                globals.Game.displayMessage(this.owner.name + " attacks " + target.name + " for " + damage + " damage.");
            }

            target.fighter.takeDamage(this.owner, damage);
        } else {
            globals.Game.displayMessage(this.owner.name + " attacks " + target.name + ", but it's too weak!");
        }
    }

    heal(amount) {
        this.hp += amount;
        if (this.hp > this.maxHp) {
            this.hp = this.maxHp;
        }
    }

    useMana(cost) {
        this.mana = Math.max(this.mana - cost, 0);
    }

    addStatusEffect(effect) {
        this.statusEffects.push(effect);
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
        return [...this.knownSpells];
    }
}
export { BasicFighter };
