import { Entity, World } from "ape-ecs";

import Path from "./rot/path/index";

import globals from "./globals";
import { createPassableCallback } from "./ai/components";
import { SpellData, ItemData, GameState, TriggerType, InteractableType } from "./data";
import { GameMap, isBlocked, distanceBetweenPoints, Point } from "./map";
import { assertUnreachable, Nullable } from "./util";
import { displayMessage } from "./ui";
import {
    HitPointsComponent,
    InputHandlingComponent,
    InteractableTypeComponent,
    InventoryComponent,
    PositionComponent,
    StatsComponent,
    TriggerTypeComponent
} from "./entity";
import { attack, getEffectiveStatData, hasSpell, useMana } from "./fighter";
import { hasItem, useItem } from "./inventory";
import { deepWaterTrigger, eventTrigger, fireTrigger, shallowWaterTrigger } from "./trigger";
import { giveItemsInteract, giveSpellsInteract, doorInteract, levelLoadInteract } from "./interactable";

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
    execute: (dt: DOMHighResTimeStamp, actor: Entity) => void;
}

// TODO: rethink commands to be actual objects that have a finished
// state, set to true when animation completed. Tieing together
// both movement logic an animation logic here. Might be a problem
// for reuse.

export function getActorMovementPath(
    ecs: World,
    origin: Point,
    destination: Point,
    maxTilesPerMove: number,
    map: GameMap
): Nullable<number[][]> {
    // quick distance check to cut down the number of
    // AStar calcs
    if (distanceBetweenPoints(destination, origin) < maxTilesPerMove * 2) {
        const aStar = new Path.AStar(
            destination.x,
            destination.y,
            createPassableCallback(origin),
            () => 0,
            { topology: 8 }
        );

        if (destination.y >= map.length || destination.x >= map[0].length) {
            return null;
        }

        if (isBlocked(ecs, map, destination.x, destination.y).blocks === true) {
            return null;
        }

        const path: number[][] = [];
        function pathCallback(x: number, y: number) {
            path.push([x, y]);
        }
        aStar.compute(origin.x, origin.y, pathCallback);

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
    private readonly ecs: World;
    private readonly triggerMap: Map<string, Entity>;
    private done: boolean = false;

    constructor(path: number[][], ecs: World, map: GameMap, triggerMap: Map<string, Entity>) {
        this.path = path;
        this.ecs = ecs;
        this.map = map;
        this.triggerMap = triggerMap;
    }

    usedTurn(): boolean {
        return true;
    }

    isFinished(): boolean {
        return this.done;
    }

    execute(deltaTime: DOMHighResTimeStamp, actor: Entity): void {
        const destination = this.path[0];
        const { blocks } = isBlocked(
            this.ecs,
            this.map,
            destination[0],
            destination[1]
        );
        if (blocks === true) {
            this.done = true;
            return;
        }

        const triggerEntity = this.triggerMap.get(`${destination[0]},${destination[1]}`);
        if (triggerEntity !== undefined) {
            const triggerData = triggerEntity.getOne(TriggerTypeComponent);
            const triggerPosData = triggerEntity.getOne(PositionComponent);
            if (triggerData !== undefined &&
                triggerPosData !== undefined) {
                switch (triggerData.triggerType) {
                    case TriggerType.Event:
                        eventTrigger(actor, triggerEntity);
                        break;
                    case TriggerType.Fire:
                        fireTrigger(actor, triggerEntity);
                        break;
                    case TriggerType.ShallowWater:
                        shallowWaterTrigger(actor, triggerEntity);
                        break;
                    case TriggerType.DeepWater:
                        deepWaterTrigger(actor, triggerEntity);
                        break;
                    default:
                        assertUnreachable(triggerData.triggerType);
                }
            }
        }

        const pos = actor.getOne(PositionComponent);
        if (pos === undefined) { throw new Error(`Entity ${actor.id} does not have a position for GoToLocationCommand`); }
        pos.x = destination[0];
        pos.y = destination[1];
        pos.update();

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
    private readonly target: Entity;

    constructor(target: Entity) {
        this.target = target;
    }

    usedTurn(): boolean {
        return this.interacted;
    }

    isFinished(): boolean {
        return true;
    }

    execute(deltaTime: DOMHighResTimeStamp, actor: Entity): void {
        const actorStats = actor.getOne(StatsComponent);
        const interactableData = this.target.getOne(InteractableTypeComponent);
        const hpData = this.target.getOne(HitPointsComponent);

        if (interactableData !== undefined) {
            switch (interactableData.interactableType) {
                case InteractableType.Door:
                    doorInteract(actor, this.target);
                    break;
                case InteractableType.GiveItems:
                    giveItemsInteract(actor, this.target);
                    break;
                case InteractableType.GiveSpells:
                    giveSpellsInteract(actor, this.target);
                    break;
                case InteractableType.LoadLevel:
                    levelLoadInteract(actor, this.target);
                    break;
                default:
                    assertUnreachable(interactableData.interactableType);
            }

            this.interacted = true;
            return;
        }

        if (hpData !== undefined && actorStats !== undefined) {
            attack(actor, this.target);
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
    private readonly ecs: World;
    private readonly itemID: string;
    private readonly target: Nullable<Point> = null;
    private readonly map: Nullable<GameMap> = null;
    private readonly rotation: Nullable<number> = null;

    constructor(
        itemID: string,
        ecs: World,
        target: Nullable<Point> = null,
        map: Nullable<GameMap> = null,
        rotation: Nullable<number> = null) {
        this.itemID = itemID;
        this.target = target;
        this.map = map;
        this.ecs = ecs;
        this.rotation = rotation;
    }

    usedTurn(): boolean {
        return this.didUseItem;
    }

    isFinished(): boolean {
        return true;
    }

    execute(deltaTime: DOMHighResTimeStamp, actor: Entity): void {
        const actorInventory = actor.getOne(InventoryComponent);
        if (actorInventory === undefined) { throw new Error("Cannot use an item without an inventory"); }
        if (!hasItem(actorInventory, this.itemID)) { throw new Error(`Cannot use ${this.itemID}, not in inventory`); }

        const itemDetails = ItemData[this.itemID];
        const used = itemDetails.useFunc(
            this.ecs,
            itemDetails,
            actor,
            this.target,
            this.map,
            null
        );

        if (used) {
            useItem(actorInventory, this.itemID);
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
    private didUseSpell: boolean = false;
    private readonly ecs: World;
    private readonly spellID: string;
    private readonly target: Nullable<Point> = null;
    private readonly map: Nullable<GameMap> = null;
    private readonly rotation: Nullable<number> = null;

    constructor(
        spellID: string,
        ecs: World,
        target: Nullable<Point> = null,
        map: Nullable<GameMap> = null,
        rotation: Nullable<number> = null
    ) {
        this.spellID = spellID;
        this.ecs = ecs;
        this.target = target;
        this.map = map;
        this.rotation = rotation;
    }

    usedTurn(): boolean {
        return this.didUseSpell;
    }

    isFinished(): boolean {
        return true;
    }

    execute(deltaTime: DOMHighResTimeStamp, actor: Entity): void {
        if (hasSpell(actor, this.spellID) === false) { return; }

        const details = SpellData[this.spellID];
        const effectiveStats = getEffectiveStatData(actor);
        if (effectiveStats === null) { return; }

        if (details.manaCost > effectiveStats.mana) {
            this.didUseSpell = false;

            if (actor === globals.Game?.player) {
                displayMessage(`You don't have enough mana to cast ${details.displayName}`);
            }

            return;
        }

        this.didUseSpell = details.useFunc(
            this.ecs,
            details,
            actor,
            this.target,
            this.map,
            this.rotation
        );

        if (this.didUseSpell) {
            const statData = actor.getOne(StatsComponent)!;
            useMana(statData, details.manaCost);
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

    execute(deltaTime: DOMHighResTimeStamp, actor: Entity): void {
        const inputHandlerState = actor.getOne(InputHandlingComponent);
        if (inputHandlerState === undefined) { return; }

        switch(inputHandlerState.reticleRotation) {
            case 0:
                inputHandlerState.reticleRotation = 90;
                break;
            case 90:
                inputHandlerState.reticleRotation = 180;
                break;
            case 180:
                inputHandlerState.reticleRotation = 270;
                break;
            case 270:
                inputHandlerState.reticleRotation = 0;
                break;
            default: break;
        }

        inputHandlerState.update();

        return;
    }
}
