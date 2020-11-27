import globals from "./globals";
import { ItemData, SpellData } from "./data";
import { InventoryComponent, SpellsComponent } from "./entity";
import { addItem } from "./inventory";
import { addSpellById } from "./fighter";
import { Entity } from "ape-ecs";

/**
 * Start the game loop
 */
export function startGameLoop(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    if (globals.animationFrameID === null) {
        globals.animationFrameID = window.requestAnimationFrame(
            globals.Game.mainLoop.bind(globals.Game)
        );
    }
}


/**
 * Stop the game loop
 */
export function stopGameLoop(): void {
    if (globals.animationFrameID === null) { return; }
    window.cancelAnimationFrame(globals.animationFrameID);
    globals.animationFrameID = null;
}

/**
 * Give the player all available items
 */
export function giveAllItems(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    const inventoryData = globals.Game.player.getOne(InventoryComponent);
    if (inventoryData === undefined) { throw new Error("Global player does not have an inventory"); }

    for (const key in ItemData) {
        addItem(inventoryData, key);
    }
}

/**
 * Give the player all available spells
 */
export function giveAllSpells(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    const spellData = globals.Game.player.getOne(SpellsComponent);
    if (spellData === undefined) { throw new Error("Global player cannot learn spells"); }

    for (const key in SpellData) {
        addSpellById(globals.Game.player, key);
    }
}

/**
 * Turn on/off AI processing
 */
export function toggleAI(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    globals.Game.processAI = !(globals.Game.processAI as boolean);
}

/**
 * Turn on/off lighting calculations
 */
export function togglePlayerFOV(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    globals.Game.isLightingEnabled = !(globals.Game.isLightingEnabled as boolean);
}

export function getEntity(id: string): Entity | undefined {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    return globals.Game.ecs.getEntity(id);
}