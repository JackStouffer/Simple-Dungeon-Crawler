import { Entity } from "ape-ecs";

import globals from "./globals";
import { DamageType } from "./constants";
import {
    DisplayNameComponent,
    EventTriggerComponent,
    FireTriggerComponent,
    FlammableComponent,
    SpeedComponent,
    TypeComponent,
    WetableComponent,
} from "./entity";
import { takeDamage } from "./fighter";
import { setOnFire, setWet } from "./skills";
import { displayMessage } from "./ui";

/**
 * Checks if the actor is flammable, and then damages them, and then sets
 * them on fire using the data from the trigger's FireTriggerComponent
 */
export function fireTrigger(actor: Entity, trigger: Entity): void {
    const flammableData = actor.getOne(FlammableComponent);

    if (flammableData !== undefined) {
        const fireTriggerData = trigger.getOne(FireTriggerComponent);
        if (fireTriggerData === undefined) { throw new Error("Fire trigger is missing its data"); }
        const wasSetOnFire = setOnFire(
            actor,
            Math.max(flammableData.fireDamage, fireTriggerData.effectDamage),
            Math.max(flammableData.turnsLeft, fireTriggerData.effectTurns)
        );

        if (!wasSetOnFire) { return; }
        takeDamage(actor, fireTriggerData.damage, false, DamageType.Fire);
    }
}

export function eventTrigger(actor: Entity, trigger: Entity): void {
    if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }

    const eventData = trigger.getOne(EventTriggerComponent);
    const typeData = actor.getOne(TypeComponent);

    if (eventData === undefined) {
        throw new Error(`Event trigger ${trigger.id} is missing a EventTriggerComponent`);
    }
    if (typeData === undefined) {
        throw new Error(`Actor ${actor.id} is missing a TypeComponent`);
    }

    if (typeData.entityType === "player") {
        globals.gameEventEmitter.emit(eventData.event);
    }
}

export function mudTrigger(actor: Entity): void {
    // Slow the player down to simulate walking in mud
    const speedData = actor.getOne(SpeedComponent);
    if (speedData !== undefined) {
        actor.addComponent({
            type: "SpeedEffectComponent",
            stat: "maxTilesPerMove",
            modifierType: "multiply",
            turnsLeft: 1,
            value: 0.1
        });
    }
}

export function shallowWaterTrigger(actor: Entity): void {
    setWet(actor, 10);
    const wetData = actor.getOne(WetableComponent);
    if (wetData !== undefined && wetData.wet === false && actor === globals.Game?.player) {
        displayMessage("You are now wet from stepping in the water");
    }
}

export function deepWaterTrigger(actor: Entity): void {
    setWet(actor, 20);
    const wetData = actor.getOne(WetableComponent);
    if (wetData !== undefined && wetData.wet === false && actor === globals.Game?.player) {
        displayMessage("You are now wet from stepping in the water");
    }

    if (!actor.tags.has("aquatic")) {
        // Slow the player down to simulate swimming
        const speedData = actor.getOne(SpeedComponent);
        if (speedData !== undefined) {
            actor.addComponent({
                type: "SpeedEffectComponent",
                stat: "maxTilesPerMove",
                modifierType: "multiply",
                turnsLeft: 1,
                value: 0.1
            });
        }
    }
}

export function steamTrigger(actor: Entity): void {
    if (actor === globals.Game?.player) {
        displayMessage("You take damage from the steam");
    } else {
        const d = actor.getOne(DisplayNameComponent);
        if (d !== undefined) {
            displayMessage(`${d.name} is hurt by the steam`);
        }
    }

    takeDamage(actor, 10, false, DamageType.Water);
}
