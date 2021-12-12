import { Entity, World } from "ape-ecs";

import globals from "./globals";
import { DamageType, PLAYER_ID } from "./constants";
import {
    DisplayNameComponent,
    EntityMap,
    FlammableComponent,
    PositionComponent,
    SpeedComponent,
    TriggerComponent,
    TypeComponent,
    WetableComponent,
} from "./entity";
import { takeDamage } from "./fighter";
import { setOnFire, setWet, SpellData } from "./skills";
import { showLogMessage } from "./ui";
import { RemoveEntityCommand, UseSkillCommand } from "./commands";

/**
 * Checks if the actor is flammable, and then damages them, and then sets
 * them on fire using the data from the trigger's FireTriggerComponent
 */
export function fireTrigger(
    ecs: World,
    entityMap: EntityMap,
    actor: Entity,
    trigger: Entity
): void {
    const flammableData = actor.getOne(FlammableComponent);

    if (flammableData !== undefined) {
        const triggerData = trigger.getOne(TriggerComponent);
        if (triggerData === undefined ||
            triggerData.damage === null ||
            triggerData.effectDamage === null ||
            triggerData.effectTurns === null) { throw new Error("Fire trigger is missing its data"); }

        const wasSetOnFire = setOnFire(
            actor,
            Math.max(flammableData.fireDamage, triggerData.effectDamage),
            Math.max(flammableData.turnsLeft, triggerData.effectTurns)
        );

        if (!wasSetOnFire) { return; }
        takeDamage(
            ecs,
            entityMap,
            actor,
            triggerData.damage,
            false,
            DamageType.Fire,
            trigger.id
        );
    }
}

export function eventTrigger(actor: Entity, trigger: Entity): void {
    if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }

    const triggerData = trigger.getOne(TriggerComponent);
    const typeData = actor.getOne(TypeComponent);

    if (triggerData === undefined || triggerData.event === null) {
        throw new Error(`Event trigger ${trigger.id} is missing a TriggerComponent`);
    }
    if (typeData === undefined) {
        throw new Error(`Actor ${actor.id} is missing a TypeComponent`);
    }

    if (typeData.entityType === "player") {
        globals.gameEventEmitter.emit(triggerData.event);
    }
}

export function mudTrigger(actor: Entity): void {
    // Slow the player down to simulate walking in mud
    const speedData = actor.getOne(SpeedComponent);
    if (speedData !== undefined) {
        actor.addComponent({
            type: "SpeedEffectComponent",
            name: "mud",
            stat: "maxTilesPerMove",
            modifierType: "multiply",
            turnsLeft: 1,
            value: 0.1,
            display: false
        });
    }
}

export function shallowWaterTrigger(actor: Entity): void {
    setWet(actor, 10);
    const wetData = actor.getOne(WetableComponent);
    if (wetData !== undefined && wetData.wet === false && actor.id === PLAYER_ID) {
        showLogMessage("You are now wet from stepping in the water");
    }
}

export function deepWaterTrigger(actor: Entity): void {
    setWet(actor, 20);
    const wetData = actor.getOne(WetableComponent);
    if (wetData !== undefined && wetData.wet === false && actor.id === PLAYER_ID) {
        showLogMessage("You are now wet from stepping in the water");
    }

    if (!actor.tags.has("aquatic")) {
        // Slow the player down to simulate swimming
        const speedData = actor.getOne(SpeedComponent);
        if (speedData !== undefined) {
            actor.addComponent({
                type: "SpeedEffectComponent",
                name: "water",
                stat: "maxTilesPerMove",
                modifierType: "multiply",
                turnsLeft: 1,
                value: 0.1,
                display: false
            });
        }
    }
}

export function steamTrigger(
    ecs: World,
    entityMap: EntityMap,
    actor: Entity,
    trigger: Entity
): void {
    if (actor.id === PLAYER_ID) {
        showLogMessage("You take damage from the steam");
    } else {
        const d = actor.getOne(DisplayNameComponent);
        if (d !== undefined) {
            showLogMessage(`${d.name} is hurt by the steam`);
        }
    }

    takeDamage(
        ecs,
        entityMap,
        actor,
        7,
        false,
        DamageType.Water,
        trigger.id
    );
}

export function explosionTrapTrigger(
    ecs: World,
    entityMap: EntityMap,
    actor: Entity,
    trigger: Entity
) {
    const pos = trigger.getOne(PositionComponent)!.tilePosition;
    globals.Game!.commandQueue.unshift(
        new UseSkillCommand(
            actor.id,
            SpellData["fireball_placed"],
            pos,
            0
        ),
        new RemoveEntityCommand(trigger)
    );
}
