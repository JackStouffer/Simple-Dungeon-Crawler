/**
 * Component which controls the combat information and interaction
 * between different fighters
 */
class Fighter {
    constructor(hp, maxHp, strength, defense, experience, deathCallback=null) {
        this.hp = hp;
        this.maxHp = maxHp;
        this.strength = strength;
        this.defense = defense;
        this.deathCallback = deathCallback;
        this.owner = null;
        this.experience = experience;
        this.criticalChance = 0.05;
        this.criticalDamageMultipler = 1.5;
        this.ailmentSusceptibility = 0.1;
        this.statusEffects = [];
    }

    takeDamage(damage, damageType) {
        if (damage > 0) {
           this.hp -= damage;
        }
        if (this.hp <= 0) {
            if (this.owner != Game.player) {
                Game.player.experience += this.experience;
            }
            if (this.deathCallback !== null) {
                this.deathCallback(this.owner);
            }
        }
    }

    attack(target) {
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
            
            target.fighter.takeDamage(damage);
        } else {
            Game.displayMessage(this.owner.name + " attacks " + target.name + ", but it's too weak!");
        }
    }

    heal(amount) {
        console.log("amount",amount);
        this.hp += amount;
        console.log("this.hp",this.hp);
        console.log("this.maxHp",this.maxHp);
        if (this.hp > this.maxHp) {
            this.hp = this.maxHp;
        }
    }
}
