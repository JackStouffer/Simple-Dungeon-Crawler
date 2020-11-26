import { Entity } from "ape-ecs";

import globals from "./globals";
import { ItemData, SpellData } from "./data";
import { SpellsComponent, InventoryComponent, TypeComponent, LoadLevelComponent } from "./entity";
import { addItem, getItems, useItem } from "./inventory";
import { displayMessage } from "./ui";
import { addSpellById } from "./fighter";

export function giveItemsInteract(actor: Entity, interactable: Entity) {
    const actorInventory = actor.getOne(InventoryComponent);
    const interactableInventory = interactable.getOne(InventoryComponent);

    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }

    if (actorInventory !== undefined && interactableInventory !== undefined) {
        const items = getItems(interactableInventory);
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                displayMessage(`Found a ${ItemData[item.id].displayName}`);
                addItem(actorInventory, item.id, item.count);
                useItem(interactableInventory, item.id);
            }

            const interactableEntityType = interactable.getOne(TypeComponent);
            if (actor === globals.Game.player && interactableEntityType?.type === "chest") {
                globals.gameEventEmitter.emit("chest.open");
            }
        } else {
            displayMessage("Empty");
        }
    } else {
        throw new Error(`Missing inventory on ${actor.id} or ${interactable.id}`);
    }
}

export function giveSpellsInteract(actor: Entity, interactable: Entity): void {
    const spellData = interactable.getOne(SpellsComponent);
    if (spellData === undefined) {
        throw new Error(`Entity ${interactable.id} is missing a SpellsComponent`);
    }

    for (const spell of spellData.knownSpells.values()) {
        const res = addSpellById(actor, spell);
        if (actor === globals.Game?.player) {
            if (res) {
                displayMessage(`You learned a new spell: ${SpellData[spell].displayName}`);
            } else {
                displayMessage(`You already know ${SpellData[spell].displayName}`);
            }
        }
    }
}

export function doorInteract(actor: Entity, interactable: Entity): void {
    if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }

    globals.gameEventEmitter.emit("door.open");
    interactable.destroy();
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
        globals.gameEventEmitter.emit("door.open");
    }
}
