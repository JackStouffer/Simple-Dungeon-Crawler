import { System, Entity, Query } from "ape-ecs";

import globals from "./globals";
import { DamageType } from "./constants";
import {
    EventTriggerComponent,
    FireTriggerComponent,
    FlammableComponent,
    PositionComponent,
    SpeedComponent,
    TriggerTypeComponent,
    TypeComponent,
    WetableComponent,
} from "./entity";
import { takeDamage } from "./fighter";
import { setOnFire, setWet } from "./skills";
import { displayMessage } from "./ui";

export class UpdateTriggerMapSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this.createQuery()
            .fromAll(TriggerTypeComponent, PositionComponent)
            .persist();
    }

    update() {
        if (globals.Game === null) { throw new Error("Global game object is null"); }
        const entities = this.mainQuery.execute();
        globals.Game.triggerMap.clear();

        for (const e of entities) {
            const pos = e.getOne(PositionComponent);
            if (pos === undefined) { return; }
            globals.Game.triggerMap.set(`${pos.x},${pos.y}`, e);
        }
    }
}

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
