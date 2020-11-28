import { System, Entity } from "ape-ecs";

import globals from "./globals";
import { DamageType } from "./constants";
import {
    EventTriggerComponent,
    FireTriggerComponent,
    FlammableComponent,
    PositionComponent,
    SpeedComponent,
    TypeComponent,
    WetableComponent
} from "./entity";
import { takeDamage } from "./fighter";
import { displayMessage } from "./ui";

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
    const wetData = actor.getOne(WetableComponent);

    if (flammableData !== undefined) {
        // You can't be set on fire if you're wet
        if (wetData !== undefined && wetData.wet) {
            wetData.wet = false;
            wetData.turnsLeft = 0;
            wetData.update();

            if (actor === globals.Game?.player) {
                displayMessage("Being wet prevented you from being set on fire");
            }
            return;
        }

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

export function shallowWaterTrigger(actor: Entity): void {
    // Put the fire out if the actor is on fire
    const flammableData = actor.getOne(FlammableComponent);
    if (flammableData !== undefined && flammableData.onFire) {
        flammableData.onFire = false;
        flammableData.turnsLeft = 0;
        flammableData.fireDamage = 0;
        flammableData.update();

        if (actor === globals.Game?.player) {
            displayMessage("The water doused you");
        }
    }

    const wetData = actor.getOne(WetableComponent);
    if (wetData !== undefined && wetData.wet === false && actor === globals.Game?.player) {
        displayMessage("You are now wet from stepping in the water");
    }
    if (wetData !== undefined && (wetData.wet === false || wetData.turnsLeft < 2)) {
        wetData.wet = true;
        wetData.turnsLeft = 3;
        wetData.update();
    }
}

export function deepWaterTrigger(actor: Entity): void {
    // Put the fire out if the actor is on fire
    const flammableData = actor.getOne(FlammableComponent);
    if (flammableData !== undefined && flammableData.onFire) {
        flammableData.onFire = false;
        flammableData.turnsLeft = 0;
        flammableData.fireDamage = 0;
        flammableData.update();

        if (actor === globals.Game?.player) {
            displayMessage("The water doused you");
        }
    }

    const wetData = actor.getOne(WetableComponent);
    if (wetData !== undefined && wetData.wet === false && actor === globals.Game?.player) {
        displayMessage("You are now wet from swimming");
    }
    if (wetData !== undefined && (wetData.wet === false || wetData.turnsLeft < 6)) {
        wetData.wet = true;
        wetData.turnsLeft = 10;
        wetData.update();
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
