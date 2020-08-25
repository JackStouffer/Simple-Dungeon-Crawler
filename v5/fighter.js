'use strict';

/**
 * Component which controls the combat information and interaction
 * between different fighters
 */
class BasicFighter {
    constructor(hp, maxHp, strength, defense, experience, experienceGiven, level, deathCallback=null) {
        this.hp = hp;
        this.maxHp = maxHp;
        this.strength = strength;
        this.defense = defense;
        this.deathCallback = deathCallback;
        this.owner = null;
        this.experience = experience;
        this.experienceGiven = experienceGiven;
        this.level = level;
        this.criticalChance = 0.05;
        this.criticalDamageMultipler = 1.5;
        this.statusEffects = [];
        this.ailmentSusceptibility = 0.1;
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
            this.strength++;
            if (this.owner === Game.player) {
                Game.displayMessage('You reached level ' + this.level + '!');
            }
        }

        if (this.statusEffects.length > 0) {
            for (let i = 0; i < this.statusEffects.length; i++) {
                const effect = this.statusEffects[i];
                effect.act();

                if (effect.turns === 0) {
                    Game.displayMessage(`${this.owner.name} recovered from its ${effect.name}`);
                    this.statusEffects.splice(i, 1);
                }
            }
        }
    }

    takeDamage(attacker, damage, damageType) {
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

        if (ROT.RNG.getUniform() <= this.criticalChance) {
            damage = Math.ceil(damage * this.criticalDamageMultipler);
            critical = true;
        }

        if (damage > 0) {
            if (critical) {
                Game.displayMessage("CRITICAL! " + this.owner.name + " attacks " + target.name + " for " + damage + " damage.");
            } else {
                Game.displayMessage(this.owner.name + " attacks " + target.name + " for " + damage + " damage.");
            }
            
            target.fighter.takeDamage(this.owner, damage);
        } else {
            Game.displayMessage(this.owner.name + " attacks " + target.name + ", but it's too weak!");
        }
    }

    heal(amount) {
        this.hp += amount;
        if (this.hp > this.maxHp) {
            this.hp = this.maxHp;
        }
    }

    addStatusEffect(effect) {
        this.statusEffects.push(effect);
    }
}
