/* global ENV */
declare var ENV: any;

import { RNG, SpeedActor } from "./rot/index";

import globals from "./globals";
import {
    LEVEL_UP_BASE,
    LEVEL_UP_FACTOR,
    DamageType,
    SpellData,
    ObjectData
} from "./data";
import { displayMessage, MessageType } from "./ui";
import { cloneDeep } from "lodash";
import { GameObject } from "./object";
import { StatisticEffect, StatusEffect } from "./effects";

export interface FighterComponent {
    owner: GameObject;
    experience?: number;
    level?: number;

    setOwner: (owner: GameObject) => void;
    act: () => void;
    attack: (target: GameObject) => void;
    getEffectiveStats: () => FighterStats;
    heal?: (hp: number) => void;
    takeDamage?: (damage: number, critical: boolean, damageType: any) => boolean;
    addSpellById?: (id: string) => boolean;
    useMana?: (mana: number) => void;
    addMana?: (mana: number) => void;
    hasSpell?: (spell: string) => boolean;
    getKnownSpells?: () => SpellFighterDetails[];
    getStatusEffects?: () => StatusEffect[];
    addStatusEffect?: (effect: StatusEffect) => void;
    getStatisticEffects?: () => StatisticEffect[];
    addStatisticEffect?: (effect: StatisticEffect) => void;
}

export interface FighterStats {
    hp: number;
    maxHp: number;
    mana: number;
    maxMana: number;
    strength: number;
    defense: number;
    speed: number;
    ailmentSusceptibility: number;
    [index: string]: number;
}

export interface SpellFighterDetails {
    id: string;
    displayName: string;
    manaCost: number;
    value: number;
    type: string;
}

/**
 * Component which controls the combat information and interaction
 * between different fighters
 */
class BasicFighter implements FighterComponent, SpeedActor {
    owner: GameObject;
    private stats: FighterStats;
    private deathCallback: (target: GameObject) => void;
    experience: number;
    experienceGiven: number;
    level: number;
    criticalChance: number;
    criticalDamageMultiplier: number;
    statusEffects: StatusEffect[];
    statisticEffects: StatisticEffect[];
    damageAffinity: any;
    knownSpells: Set<string>;

    constructor(data: any, deathCallback: (target: GameObject) => void = null) {
        this.stats = {
            hp: data.maxHp,
            maxHp: data.maxHp,
            mana: data.maxMana,
            maxMana: data.maxMana,
            strength: data.strength,
            defense: data.defense,
            speed: data.speed,
            ailmentSusceptibility: data.ailmentSusceptibility
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
        this.damageAffinity = data.damageAffinity;

        this.knownSpells = new Set();
    }

    setOwner(owner: GameObject) {
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
    takeDamage(damage: number, critical: boolean, damageType: DamageType): boolean {
        const effectiveStats = this.getEffectiveStats();
        damage = damage * this.damageAffinity[damageType];
        damage = Math.max(1, damage - effectiveStats.defense);

        if (damage > 0) {
            this.stats.hp -= damage;
        }

        if (critical) {
            displayMessage(`CRITICAL! ${this.owner.name} takes ${damage} of ${DamageType[damageType]} damage.`, MessageType.Critical);
        } else {
            displayMessage(`${this.owner.name} takes ${damage} ${DamageType[damageType]} damage.`);
        }

        if (this.stats.hp <= 0) {
            if (this.deathCallback !== null) {
                this.deathCallback(this.owner);
            }

            return true;
        }

        return false;
    }

    attack(target: GameObject): void {
        if (!target.fighter) { return; }

        const effectiveStats = this.getEffectiveStats();
        let damage = Math.round(effectiveStats.strength);
        let critical = false;

        if (RNG.getUniform() <= this.criticalChance) {
            damage = Math.ceil(damage * this.criticalDamageMultiplier);
            critical = true;
        }

        if (damage > 0) {
            const killed = target.fighter.takeDamage(damage, critical, DamageType.physical);
            if (killed) {
                this.experience += ObjectData[target.type].experienceGiven;
            }
        } else {
            displayMessage(`${this.owner.name} attacks ${target.name}, but it's too weak!`);
        }
    }

    /**
     * Add hp to the fighter. Total fighter's hp is automatically
     * clamped to the max effective hp.
     * @param {Number} amount hp amount
     * @returns {void}
     */
    heal(amount: number): void {
        const effectiveStats = this.getEffectiveStats();
        this.stats.hp += amount;
        if (this.stats.hp > effectiveStats.maxHp) {
            this.stats.hp = effectiveStats.maxHp;
        }
    }

    /**
     * Reduce the fighter's mana by a given amount. Resulting
     * fighter mana is automatically clamped to a min of zero.
     * @param {Number} cost The amount of mana to use
     * @returns {void}
     */
    useMana(cost: number) {
        this.stats.mana = Math.max(this.stats.mana - cost, 0);
    }

    /**
     * Add mana to the fighter. Total fighter's mana is automatically
     * clamped to the max effective mana.
     * @param {Number} amount mana amount
     * @returns {void}
     */
    addMana(amount: number) {
        const effectiveStats = this.getEffectiveStats();
        this.stats.mana += amount;
        if (this.stats.mana > effectiveStats.maxMana) {
            this.stats.mana = effectiveStats.maxMana;
        }
    }

    /**
     * Find the fighter's current stats with the effects of all
     * of the statistic effects.
     * @returns {Object} An object containing the stats
     */
    getEffectiveStats(): FighterStats {
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

    addStatusEffect(effect: StatusEffect) {
        if (ENV === "DEV" && effect.constructor.name !== "StatusEffect") {
            throw new Error("effect must be of type StatusEffect");
        }
        this.statusEffects.push(effect);
    }

    getStatusEffects(): StatusEffect[] {
        // Copy the array because JS doesn't have const references
        return cloneDeep(this.statusEffects);
    }

    addStatisticEffect(effect: StatisticEffect) {
        if (ENV === "DEV" && effect.constructor.name !== "StatisticEffect") {
            throw new Error("effect must be of type StatisticEffect");
        }
        this.statisticEffects.push(effect);
    }

    getStatisticEffects(): StatisticEffect[] {
        // Copy the array because JS doesn't have const references
        return cloneDeep(this.statisticEffects);
    }

    /**
     * Add a spell to the set of known spells by this
     * fighter.
     * @param {String} id A spell id
     * @returns {Boolean} If the spell was successfully learned
     */
    addSpellById(id: string): boolean {
        if (!(id in SpellData)) { throw new Error(`${id} is not a valid spell id`); }
        if (this.knownSpells.has(id)) { return false; }

        if (this.owner === globals.Game.player) {
            globals.gameEventEmitter.emit("tutorial.spellMenu");

            if (SpellData[id].type === "wild") {
                globals.gameEventEmitter.emit("tutorial.wildSpells");
            }
        }

        this.knownSpells.add(id);
        return true;
    }

    getKnownSpells(): SpellFighterDetails[] {
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

    hasSpell(spellID: string) {
        return this.knownSpells.has(spellID);
    }

    getSpeed(): number {
        return this.getEffectiveStats().speed;
    }
}
export { BasicFighter };
