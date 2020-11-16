import { DamageType } from "./data";
import globals from "./globals";
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

    trigger(actor: GameObject): void {
        if (actor.fighter !== null) {
            actor.fighter.takeDamage(this.damage, false, DamageType.Fire);
            const burn = createBurnEffect(actor, this.burnDamagePerTurn, this.burnTurns);
            actor.fighter.addStatusEffect(burn);
        }
    }
}

export class EventTrigger implements TriggerComponent {
    owner: Nullable<GameObject>;
    eventName: Nullable<string>;

    constructor() {
        this.owner = null;
        this.eventName = null;
    }

    trigger(actor: GameObject): void {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }

        if (actor.type === "player" && this.eventName !== null) {
            globals.gameEventEmitter.emit(this.eventName);
        }
    }
}
