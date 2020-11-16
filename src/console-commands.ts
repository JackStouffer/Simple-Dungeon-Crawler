import globals from "./globals";
import { ItemData, SpellData } from "./data";

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
    if (globals.Game.player.inventory === null) { throw new Error("Global player inventory is null"); }

    for (const key in ItemData) {
        globals.Game.player.inventory.addItem(key);
    }
}

/**
 * Give the player all available spells
 */
export function giveAllSpells(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (globals.Game.player.fighter === null) { throw new Error("Global player inventory is null"); }

    for (const key in SpellData) {
        globals.Game.player.fighter.addSpellById(key);
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
