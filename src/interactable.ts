import { Entity } from "ape-ecs";

import globals from "./globals";
import {
    SpellsComponent,
    InventoryComponent,
    TypeComponent,
    LoadLevelComponent,
    removeEntity,
    HitPointsComponent,
    PositionComponent,
    FlammableComponent,
    SpeedEffectComponent,
    HitPointsEffectComponent,
    WetableComponent
} from "./entity";
import { addItem, getItems, useItem } from "./inventory";
import { showLogMessage } from "./ui";
import { addSpellById, getKnownSpells } from "./fighter";
import { ItemData } from "./skills";
import { playChestOpen, playDoorOpen } from "./audio";
import { PLAYER_ID } from "./constants";
import { saveLevelState } from "./map";

/**
 * Give the actor all of the items in the interactable's inventory
 */
export function giveItemsInteract(actor: Entity, interactable: Entity) {
    const actorInventory = actor.getOne(InventoryComponent);
    const interactableInventory = interactable.getOne(InventoryComponent);

    if (globals.Game === null) { throw new Error("Global game object is null"); }

    if (actorInventory !== undefined && interactableInventory !== undefined) {
        const items = getItems(interactableInventory);
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.count === 1) {
                    showLogMessage(`Found a ${ItemData[item.id].displayName}`);
                } else {
                    showLogMessage(`Found ${item.count} ${ItemData[item.id].displayName}s`);
                }

                addItem(actorInventory, item.id, item.count);
                useItem(interactable, item.id);
            }

            const interactableEntityType = interactable.getOne(TypeComponent);
            // TODO, sound: We need some sort of table for interactable sound lookups
            if (actor.id === PLAYER_ID && interactableEntityType?.entityType === "chest") {
                playChestOpen();
            }
            if (interactableEntityType?.entityType === "dropped_item") {
                removeEntity(globals.Game.ecs, interactable);
            }
        } else {
            showLogMessage("Empty");
        }
    } else {
        throw new Error(`Missing inventory on ${actor.id} or ${interactable.id}`);
    }
}

/**
 * Give the actor all of the spells in the interactable's known spells
 */
export function giveSpellsInteract(entity: Entity, interactable: Entity): void {
    const interactableSpellData = interactable.getOne(SpellsComponent);
    if (interactableSpellData === undefined) {
        throw new Error(`Entity ${interactable.id} is missing a SpellsComponent`);
    }

    const spells = getKnownSpells(interactableSpellData);
    for (const spell of spells) {
        const res = addSpellById(entity, spell.id, spell.count, spell.maxCount);
        if (entity.id === PLAYER_ID) {
            if (res) {
                showLogMessage(`You learned a new spell: ${spell.displayName}`);
            } else {
                showLogMessage(`You already know ${spell.displayName}`);
            }
        }
    }
}

/**
 * Simply removes the interactable from the world and plays a sound
 */
export function doorInteract(actor: Entity, interactable: Entity): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    playDoorOpen();
    removeEntity(globals.Game.ecs, interactable);
}

export function levelLoadInteract(actor: Entity, interactable: Entity): void {
    const loadLevelData = interactable.getOne(LoadLevelComponent);
    const typeData = interactable.getOne(TypeComponent);
    if (loadLevelData === undefined) {
        throw new Error("No level name has been set for load");
    }

    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }

    const player = globals.Game.ecs.getEntity(PLAYER_ID)!;
    const pos = player.getOne(PositionComponent)!;

    saveLevelState(
        globals.Game.ecs,
        globals.Game.map,
        globals.Game.entityTeams,
        pos.tilePosition
    );

    globals.Game.loadLevel(loadLevelData.levelName);

    // TODO, sound: We need some sort of table for interactable sound lookups
    if (typeData?.entityType === "load_door") {
        playDoorOpen();
    }
}

export function restPointInteract(entity: Entity, interactable: Entity): void {
    // Heal
    const hpData = entity.getOne(HitPointsComponent);
    if (hpData !== undefined && hpData.hp < hpData.maxHp) {
        hpData.hp = hpData.maxHp;
        hpData.update();
    }

    // Regen spell casts
    const entitySpellData = entity.getOne(SpellsComponent);
    if (entitySpellData !== undefined) {
        const spells = getKnownSpells(entitySpellData);
        for (const spell of spells) {
            if (entitySpellData.knownSpells[spell.id].count < spell.maxCount) {
                entitySpellData.knownSpells[spell.id].count = spell.maxCount;
            }
        }
    }

    // TODO, bug: Does not remove particle effects
    const flammableData = entity.getOne(FlammableComponent);
    if (flammableData !== undefined) {
        flammableData.onFire = false;
        flammableData.turnsLeft = 0;
        flammableData.update();
    }

    // TODO, bug: Does not remove particle effects
    const wetData = entity.getOne(WetableComponent);
    if (wetData !== undefined) {
        wetData.wet = false;
        wetData.turnsLeft = 0;
        wetData.update();
    }

    const speedEffectData = entity.getComponents(SpeedEffectComponent);
    for (const s of speedEffectData.values()) {
        s.destroy();
    }

    const hpEffectData = entity.getComponents(HitPointsEffectComponent);
    for (const h of hpEffectData.values()) {
        h.destroy();
    }

    if (globals.Game === null) { throw new Error("Global game object is null"); }
    removeEntity(globals.Game.ecs, interactable);
    showLogMessage("You are now rested");
}
