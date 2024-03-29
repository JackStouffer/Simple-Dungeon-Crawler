import globals from "./globals";
import { InventoryComponent, SpellsComponent } from "./entity";
import { addItem } from "./inventory";
import { addSpellById } from "./fighter";
import { Entity } from "ape-ecs";
import { ItemData, SpellData } from "./skills";
import { getEntitiesAtLocation, Vector2D } from "./map";
import { PLAYER_ID } from "./constants";

/**
 * Start the game loop
 */
export function startGameLoop(): void {
    globals.Game!.pixiApp.ticker.start();
}

/**
 * Stop the game loop
 */
export function stopGameLoop(): void {
    globals.Game!.pixiApp.ticker.stop();
}

export function loopOnce(): void {
    globals.Game!.mainLoop.bind(globals.Game)();
}

/**
 * Give the player all available items
 */
export function giveAllItems(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    const player = globals.Game.ecs.getEntity(PLAYER_ID)!;
    const inventoryData = player.getOne(InventoryComponent);
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
    const player = globals.Game.ecs.getEntity(PLAYER_ID)!;
    const spellData = player.getOne(SpellsComponent);
    if (spellData === undefined) { throw new Error("Global player cannot learn spells"); }

    for (const key in SpellData) {
        addSpellById(player, key, SpellData[key].baseCastCount, SpellData[key].baseCastCount);
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

export function toggleCommandExecution(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    globals.Game.shouldProcessCommands = !(globals.Game.shouldProcessCommands as boolean);
}

export function togglePathfindingDebug(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    globals.Game.debugPathfinding = !(globals.Game.debugPathfinding as boolean);
}

export function toggleAIDebug(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    globals.Game.debugAI = !(globals.Game.debugAI as boolean);
}

export function toggleAIDialogDebug(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    globals.Game.debugAIDialog = !(globals.Game.debugAIDialog as boolean);
}

export function toggleTutorials(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    globals.Game.showTutorials = !(globals.Game.showTutorials as boolean);
}

export function getEntity(id: string): Entity | undefined {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    return globals.Game.ecs.getEntity(id);
}

export function getEntities(x: number, y: number): Entity[] {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    if (x === undefined || y === undefined) {
        return [...globals.Game.ecs.entities.values()];
    }

    return getEntitiesAtLocation(globals.Game.ecs, globals.Game.entityMap, new Vector2D(x, y));
}

export function step(): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    globals.Game.processCommands();
}
