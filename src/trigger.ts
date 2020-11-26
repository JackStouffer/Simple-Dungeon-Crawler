import { System, Entity } from "ape-ecs";

import globals from "./globals";
import { DamageType } from "./data";
import { EventTriggerComponent, FireTriggerComponent, FlammableComponent, PositionComponent, TypeComponent } from "./entity";
import { takeDamage } from "./fighter";

export class UpdateTriggerMapSystem extends System {
    init() {
        this.subscribe("TriggerTypeComponent");
    }

    update() {
        if (globals.Game === null) { throw new Error("Global game object is null"); }

        for (let i = 0; i < this.changes.length; i++) {
            const change = this.changes[i];
            const entity = this.world.getEntity(change.entity);
            if (entity === undefined) { return; }
            const pos = entity.getOne(PositionComponent);
            if (pos === undefined) { return; }

            switch (change.op) {
                case "add":
                    globals.Game.triggerMap.set(`${pos.x},${pos.y}`, entity);
                    break;
                case "destroy":
                    globals.Game.triggerMap.delete(`${pos.x},${pos.y}`);
                    break;
                case "change":
                case "addRef":
                case "deleteRef":
                    break;
                default:
                    throw new Error(`${change.entity}: Unknown change operation ${change.op}`);
            }
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

        takeDamage(actor, fireTriggerData.damage, false, DamageType.Fire);

        flammableData.onFire = true;
        flammableData.turnsLeft = Math.max(flammableData.turnsLeft, fireTriggerData.effectTurns);
        flammableData.fireDamage = Math.max(flammableData.fireDamage, fireTriggerData.effectDamage);
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

export function shallowWaterTrigger(actor: Entity, trigger: Entity): void {
    console.log(`Actor ${actor.id} stepped in shallow water ${trigger.id}`);
}

export function deepWaterTrigger(actor: Entity, trigger: Entity): void {
    console.log(`Actor ${actor.id} stepped in deep water ${trigger.id}`);
}
