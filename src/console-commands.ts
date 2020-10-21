import globals from "./globals";
import { ItemData, SpellData } from "./data";

/**
 * Give the player all available items
 */
export function giveAllItems(): void {
    for (const key in ItemData) {
        globals.Game.player.inventoryComponent.addItem(key);
    }
}

/**
 * Give the player all available spells
 */
export function giveAllSpells(): void {
    for (const key in SpellData) {
        globals.Game.player.fighter.addSpellById(key);
    }
}

/**
 * Turn on/off AI processing
 */
export function toggleAI(): void {
    globals.Game.processAI = !globals.Game.processAI;
}

/**
 * Turn on/off lighting calculations
 */
export function togglePlayerFOV(): void {
    globals.Game.isLightingEnabled = !globals.Game.isLightingEnabled;
}
