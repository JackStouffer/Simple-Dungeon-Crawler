import Path from "./rot/path/index";

import globals from "./globals";
import { createPassableCallback } from "./ai/components";
import { SpellData, ItemData, GameState, ObjectData } from "./data";
import { GameMap, isBlocked, distanceBetweenObjects, getObjectsAtLocation, Point } from "./map";
import { GameObject } from "./object";
import { Nullable } from "./util";

/**
 * Command design pattern that encapsulates an action that a
 * GameObject can perform. A function generally returns a Command
 * as a closure. Takes the GameObject that is acting, and then
 * returns a boolean representing if the actor took up their turn
 * or not.
 */
export type Command = (actor: GameObject) => boolean;

/**
 * Command that does nothing. Useful for passing a turn
 * @param {boolean} shouldAct if the command should take a turn
 * @returns {Command} a command which does nothing
 */
export function noOpCommand(shouldAct: boolean = true) {
    return function (): boolean {
        return shouldAct;
    };
}

export function getActorMovementPath(
    x: number,
    y: number,
    actor: GameObject,
    map: GameMap,
    objects: GameObject[]
): Nullable<number[][]> {
    if (ObjectData[actor.type].maxTilesPerMove === null) {
        throw new Error(`Missing maxTilesPerMove for ${actor.type}`);
    }
    const maxTilesPerMove = ObjectData[actor.type].maxTilesPerMove!;

    // quick distance check to cut down the number of
    // AStar calcs
    if (distanceBetweenObjects({ x, y }, actor) < maxTilesPerMove * 2) {
        const aStar = new Path.AStar(
            x,
            y,
            createPassableCallback(actor),
            () => 0,
            { topology: 8 }
        );

        if (y >= map.length ||
            x >= map[0].length ||
            map[y][x].blocks) {
            return null;
        }

        if (getObjectsAtLocation(objects, x, y)
            .filter(o => o.blocks && o !== actor)
            .length > 0) {
            return null;
        }

        const path: number[][] = [];
        function pathCallback(x: number, y: number) {
            path.push([x, y]);
        }
        aStar.compute(actor.x, actor.y, pathCallback);

        if (path.length === 0 || path.length > maxTilesPerMove) { return null; }

        // remove our own position
        path.shift();
        if (path.length === 0) { return null; }
        return path;
    }
    return null;
}

/**
 * Move the game object to a specific point on the map
 * @param {number} x the x coordinate to move to
 * @param {number} y the y coordinate to move to
 * @returns {Command} a command for movement
 */
export function goToLocationCommand(
    path: number[][],
    map: GameMap,
    gameObjects: GameObject[]
): Command {
    return function(actor: GameObject): boolean {
        const destination = path[path.length - 1];
        const { blocks } = isBlocked(
            map,
            gameObjects,
            destination[0],
            destination[1]
        );
        if (blocks === true) {
            return false;
        }

        const triggerMap: Map<string, GameObject> = new Map();
        gameObjects
            .filter(o => o.trigger)
            .forEach(o => {
                triggerMap.set(`${o.x},${o.y}`, o);
            });

        for (let i = 0; i < path.length; i++) {
            const spot = path[i];
            const object = triggerMap.get(`${spot[0]},${spot[1]}`);
            if (object !== null && object !== undefined && object.trigger !== null) {
                object.trigger.trigger(actor);
            }
        }

        actor.x = destination[0];
        actor.y = destination[1];
        return true;
    };
}

/**
 * Interact with the target, either calling the interactable or
 * attacking the fighter
 * @param {GameObject} target the object to interact with
 * @returns {Command} a command for interacting
 */
export function interactCommand(target: GameObject): Command {
    return function(actor: GameObject): boolean {
        if (target.interactable !== null) {
            target.interactable.interact(actor);
            return true;
        }

        if (actor.fighter !== null && target.fighter !== null) {
            actor.fighter.attack(target);
            return true;
        }

        return false;
    };
}

/**
 * Generates a function to put the game into the inventory_menu state.
 * @return {Function} A function which always returns false
 */
export function openInventoryCommand(): Command {
    return function(): boolean {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        globals.gameEventEmitter.emit("ui.openInventory");
        globals.Game.state = GameState.InventoryMenu;
        return false;
    };
}

/**
 * Generate a function which puts the game into spell_menu state.
 * @returns {Function} A function which always returns false
 */
export function openSpellsCommand(): Command {
    return function(): boolean {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        globals.gameEventEmitter.emit("ui.openSpells");
        globals.Game.state = GameState.SpellMenu;
        return false;
    };
}

/**
 * Create a command function to use an item in the object's inventory
 * and call its use function.
 * @param {string} itemID The id of the item to use
 * @returns {Function} A command function which takes an object as a param
 */
export function useItemCommand(
    itemID: string,
    target: Nullable<Point> = null,
    map: Nullable<GameMap> = null,
    objects: Nullable<GameObject[]> = null
): Command {
    return function (actor: GameObject): boolean {
        if (actor.inventory === null) { return false; }
        if (!actor.inventory.hasItem(itemID)) { return false; }

        const itemDetails = ItemData[itemID];
        const used = itemDetails.useFunc(itemDetails, actor, target, map, objects, null);

        if (used) {
            actor.inventory.useItem(itemID);
            return true;
        }

        return false;
    };
}

/**
 * Create a command function to cast a spell in the known spells
 * and call its use function.
 * @param {string} spellID The id of the spell to use
 * @returns {Function} A command function which takes an object as a param
 */
export function useSpellCommand(
    spellID: string,
    target: Nullable<Point> = null,
    map: Nullable<GameMap> = null,
    objects: Nullable<GameObject[]> = null,
    rotation: Nullable<number> = null
): Command {
    return function (actor: GameObject): boolean {
        if (actor.fighter === null) { return false; }
        if (!actor.fighter.hasSpell(spellID)) { return false; }

        const details = SpellData[spellID];
        const stats = actor.fighter.getEffectiveStats();
        if (details.manaCost > stats.mana) {
            return false;
        }

        const used = details.useFunc(details, actor, target, map, objects, rotation);
        if (used) {
            actor.fighter.useMana(details.manaCost);
            return true;
        }

        return false;
    };
}


export function rotateReticleCommand(): Command {
    return function (actor: GameObject): boolean {
        if (actor.inputHandler === null) { return false; }

        switch(actor.inputHandler.reticleRotation) {
            case 0:
                actor.inputHandler.reticleRotation = 90;
                break;
            case 90:
                actor.inputHandler.reticleRotation = 180;
                break;
            case 180:
                actor.inputHandler.reticleRotation = 270;
                break;
            case 270:
                actor.inputHandler.reticleRotation = 0;
                break;
            default: break;
        }

        return false;
    };
}
