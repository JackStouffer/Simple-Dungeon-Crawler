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

const createBurnEffect = function(victim, damage, turns) {
    const act = function (owner, name) {
        if (owner.fighter) {
            owner.fighter.takeDamage(damage);
        }

        if (owner === Game.player) {
            Game.displayMessage("You were hurt by the burn for " + damage + " damage");
        } else {
            Game.displayMessage(owner.name + " was hurt by the burn for " + damage + " damage");
        }
    };

    return new Effect(victim, "Burn", turns, act);
};
