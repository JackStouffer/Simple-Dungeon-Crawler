import { Entity } from "ape-ecs";

import globals from "./globals";
import {
    SpellsComponent,
    InventoryComponent,
    TypeComponent,
    LoadLevelComponent,
    removeEntity,
    HitPointsComponent
} from "./entity";
import { addItem, getItems, useItem } from "./inventory";
import { displayMessage } from "./ui";
import { addSpellById, getKnownSpells } from "./fighter";
import { ItemData } from "./skills";
import { playChestOpen, playDoorOpen } from "./audio";

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
                displayMessage(`Found a ${ItemData[item.id].displayName}`);
                addItem(actorInventory, item.id, item.count);
                useItem(interactable, item.id);
            }

            const interactableEntityType = interactable.getOne(TypeComponent);
            if (actor.id === globals.Game.playerId && interactableEntityType?.entityType === "chest") {
                playChestOpen();
            }
            if (interactableEntityType?.entityType === "dropped_item") {
                removeEntity(globals.Game.ecs, interactable);
            }
        } else {
            displayMessage("Empty");
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
        if (entity.id === globals.Game?.playerId) {
            if (res) {
                displayMessage(`You learned a new spell: ${spell.displayName}`);
            } else {
                displayMessage(`You already know ${spell.displayName}`);
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

    globals.Game.loadLevel(loadLevelData.levelName);

    if (typeData?.entityType === "load_door") {
        playDoorOpen();
    }
}

export function restPointInteract(entity: Entity): void {
    const hpData = entity.getOne(HitPointsComponent);
    if (hpData !== undefined) {
        hpData.hp = hpData.maxHp;
        hpData.update();
    }

    const entitySpellData = entity.getOne(SpellsComponent);
    if (entitySpellData !== undefined) {
        const spells = getKnownSpells(entitySpellData);
        for (const spell of spells) {
            entitySpellData.knownSpells[spell.id].count = spell.maxCount;
        }
    }

    displayMessage("You are now rested");
}
