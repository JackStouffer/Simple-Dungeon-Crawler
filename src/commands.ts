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
export interface Command {
    usedTurn: () => boolean;
    isFinished: () => boolean;
    execute: (dt: DOMHighResTimeStamp, object: GameObject) => void;
}

// TODO: rethink commands to be actual objects that have a finished
// state, set to true when animation completed. Tieing together
// both movement logic an animation logic here. Might be a problem
// for reuse.

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
 * Command that does nothing. Useful for passing a turn
 */
export class NoOpCommand implements Command {
    private readonly usesTurn: boolean;

    constructor(usesTurn: boolean) {
        this.usesTurn = usesTurn;
    }

    usedTurn(): boolean {
        return this.usesTurn;
    }

    isFinished(): boolean {
        return true;
    }

    execute(): void {
        return;
    }
}

/**
 * Move the game object to a specific point on the map
 */
export class GoToLocationCommand implements Command {
    private readonly usesTurn: boolean = true;
    private readonly path: number[][];
    private readonly map: GameMap;
    private readonly gameObjects: GameObject[];
    private done: boolean = false;

    constructor(path: number[][], map: GameMap, gameObjects: GameObject[]) {
        this.path = path;
        this.map = map;
        this.gameObjects = gameObjects;
    }

    usedTurn(): boolean {
        return true;
    }

    isFinished(): boolean {
        return this.done;
    }

    execute(deltaTime: DOMHighResTimeStamp, actor: GameObject): void {
        const destination = this.path[0];
        const { blocks } = isBlocked(
            this.map,
            this.gameObjects,
            destination[0],
            destination[1]
        );
        if (blocks === true) {
            this.done = true;
            return;
        }

        const triggerMap: Map<string, GameObject> = new Map();
        this.gameObjects
            .filter(o => o.trigger)
            .forEach(o => {
                triggerMap.set(`${o.x},${o.y}`, o);
            });

        for (let i = 0; i < this.path.length; i++) {
            const spot = this.path[i];
            const object = triggerMap.get(`${spot[0]},${spot[1]}`);
            if (object !== null && object !== undefined && object.trigger !== null) {
                object.trigger.trigger(actor);
            }
        }

        actor.x = destination[0];
        actor.y = destination[1];
        this.path.shift();
        if (this.path.length === 0) {
            this.done = true;
        }

        return;
    }
}

/**
 * Interact with the target, either calling the interactable or
 * attacking the fighter
 */
export class InteractCommand implements Command {
    private interacted: boolean = true;
    private readonly target: GameObject;

    constructor(target: GameObject) {
        this.target = target;
    }

    usedTurn(): boolean {
        return this.interacted;
    }

    isFinished(): boolean {
        return true;
    }

    execute(deltaTime: DOMHighResTimeStamp, actor: GameObject): void {
        if (this.target.interactable !== null) {
            this.target.interactable.interact(actor);
            this.interacted = true;
            return;
        }

        if (actor.fighter !== null && this.target.fighter !== null) {
            actor.fighter.attack(this.target);
            this.interacted = true;
            return;
        }

        this.interacted = false;
    }
}

/**
 * Generates a function to put the game into the inventory_menu state.
 * @return {Function} A function which always returns false
 */
export class OpenInventoryCommand implements Command {
    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return true;
    }

    execute(): void {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        globals.gameEventEmitter.emit("ui.openInventory");
        globals.Game.state = GameState.InventoryMenu;
    }
}

/**
 * Generate a function which puts the game into spell_menu state.
 * @returns {Function} A function which always returns false
 */
export class OpenSpellsCommand implements Command {
    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return true;
    }

    execute(): void {
        if (globals.Game === null) { throw new Error("Global Game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        globals.gameEventEmitter.emit("ui.openSpells");
        globals.Game.state = GameState.SpellMenu;
    }
}

/**
 * Create a command function to use an item in the object's inventory
 * and call its use function.
 */
export class UseItemCommand implements Command {
    private didUseItem: boolean = true;
    private readonly itemID: string;
    private readonly target: Nullable<Point> = null;
    private readonly map: Nullable<GameMap> = null;
    private readonly objects: Nullable<GameObject[]> = null;

    constructor(
        itemID: string,
        target: Nullable<Point> = null,
        map: Nullable<GameMap> = null,
        objects: Nullable<GameObject[]> = null) {
        this.itemID = itemID;
        this.target = target;
        this.map = map;
        this.objects = objects;
    }

    usedTurn(): boolean {
        return this.didUseItem;
    }

    isFinished(): boolean {
        return true;
    }

    execute(deltaTime: DOMHighResTimeStamp, actor: GameObject): void {
        if (actor.inventory === null) { throw new Error("Cannot use an item without an inventory"); }
        if (!actor.inventory.hasItem(this.itemID)) { throw new Error(`Cannot use ${this.itemID}, not in inventory`); }

        const itemDetails = ItemData[this.itemID];
        const used = itemDetails.useFunc(
            itemDetails,
            actor,
            this.target,
            this.map,
            this.objects,
            null
        );

        if (used) {
            actor.inventory.useItem(this.itemID);
            this.didUseItem = true;
            return;
        }

        this.didUseItem = false;
        return;
    }
}

/**
 * Create a command function to cast a spell in the known spells
 * and call its use function.
 */
export class UseSpellCommand implements Command {
    didUseSpell: boolean = false;
    spellID: string;
    target: Nullable<Point> = null;
    map: Nullable<GameMap> = null;
    objects: Nullable<GameObject[]> = null;
    rotation: Nullable<number> = null;

    constructor(
        spellID: string,
        target: Nullable<Point> = null,
        map: Nullable<GameMap> = null,
        objects: Nullable<GameObject[]> = null,
        rotation: Nullable<number> = null
    ) {
        this.spellID = spellID;
        this.target = target;
        this.map = map;
        this.objects = objects;
        this.rotation = rotation;
    }

    usedTurn(): boolean {
        return this.didUseSpell;
    }

    isFinished(): boolean {
        return true;
    }

    execute(deltaTime: DOMHighResTimeStamp, actor: GameObject): void {
        if (actor.fighter === null) { return; }
        if (!actor.fighter.hasSpell(this.spellID)) { return; }

        const details = SpellData[this.spellID];
        const stats = actor.fighter.getEffectiveStats();
        if (details.manaCost > stats.mana) {
            this.didUseSpell = false;
            return;
        }

        this.didUseSpell = details.useFunc(
            details,
            actor,
            this.target,
            this.map,
            this.objects,
            this.rotation
        );
        if (this.didUseSpell) {
            actor.fighter.useMana(details.manaCost);
        }
    }
}

export class RotateReticleCommand implements Command {
    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return true;
    }

    execute(deltaTime: DOMHighResTimeStamp, actor: GameObject): void {
        if (actor.inputHandler === null) { return; }

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

        return;
    }
}
