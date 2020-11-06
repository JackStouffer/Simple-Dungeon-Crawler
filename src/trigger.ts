import { DamageType } from "./data";
import { createBurnEffect } from "./effects";
import { GameObject } from "./object";
import { Nullable } from "./util";

/**
 * Triggers are components which do something when another
 * game object enters their tile. Examples would be traps,
 * fire, water.
 */
export interface TriggerComponent {
    owner: Nullable<GameObject>;

    setOwner: (owner: Nullable<GameObject>) => void;
    trigger: (actor: GameObject) => void;
}

export class FireTrigger implements TriggerComponent {
    owner: Nullable<GameObject>;

    private readonly damage: number;
    private readonly burnDamagePerTurn: number;
    private readonly burnTurns: number;

    constructor(damage: number, burnTurns: number, burnDamagePerTurn: number) {
        this.damage = damage;
        this.burnTurns = burnTurns;
        this.burnDamagePerTurn = burnDamagePerTurn;
    }

    setOwner(owner: Nullable<GameObject>): void {
        this.owner = owner;
    }

    trigger(actor: GameObject): void {
        if (actor.fighter !== null) {
            actor.fighter.takeDamage(this.damage, false, DamageType.Fire);
            const burn = createBurnEffect(actor, this.burnDamagePerTurn, this.burnTurns);
            actor.fighter.addStatusEffect(burn);
        }
    }
}
