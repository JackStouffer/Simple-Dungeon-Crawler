import { Entity, World } from "ape-ecs";

import Path from "./rot/path/index";
import { WeightCallback, PassableCallback } from "./rot/path/path";

import globals from "./globals";
import {
    DamageType,
    GameState,
    InteractableType,
    TriggerType
} from "./constants";
import {
    GameMap,
    isBlocked,
    distanceBetweenPoints,
    Point,
    getEntitiesAtLocation
} from "./map";
import { assertUnreachable, Nullable, randomIntFromInterval } from "./util";
import { displayMessage } from "./ui";
import {
    DisplayNameComponent,
    EntityMap,
    FireTriggerComponent,
    FlammableComponent,
    GraphicsComponent,
    HitPointsComponent,
    InputHandlingComponent,
    InteractableTypeComponent,
    InventoryComponent,
    PositionComponent,
    SpellsComponent,
    StatsComponent,
    TriggerTypeComponent
} from "./entity";
import { attack, getEffectiveSpeedData, getKnownSpells, takeDamage, useSpell } from "./fighter";
import { getItems, hasItem, useItem } from "./inventory";
import { deepWaterTrigger, eventTrigger, fireTrigger, mudTrigger, shallowWaterTrigger } from "./trigger";
import { giveItemsInteract, giveSpellsInteract, doorInteract, levelLoadInteract } from "./interactable";
import { ItemData, SpellData, setOnFire, setParalyzed } from "./skills";
import { DIRS } from "./rot";

/**
 * Creates a function which returns if an x and y coordinate
 * represents a passable spot on the map
 */
export function createPassableCallback(origin: Point): PassableCallback {
    return function(x: number, y: number) {
        if (globals.Game === null) { throw new Error("Global game object is null"); }

        // own space is passable
        if (origin.x === x && origin.y === y) {
            return true;
        }
        const { blocks } = isBlocked(globals.Game.map, globals.Game.entityMap, x, y);

        return !blocks;
    };
}

export function generateWeightCallback(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    origin: Point
): WeightCallback {
    return function (x: number, y: number): number {
        if (globals.Game === null) { throw new Error("Global game object is null"); }

        const neighbors: [number, number][] = [];
        for (let i = 0; i < DIRS[8].length; i++) {
            const dir = DIRS[8][i];
            const dx = x + dir[0];
            const dy = y + dir[1];

            if (isBlocked(map, entityMap, dx, dy).blocks) { continue; }
            neighbors.push([dx, dy]);
        }

        let weight = Math.max(Math.abs(x - origin.x), Math.abs(y - origin.y));
        if (x !== origin.x || y !== origin.y) {
            const entities = getEntitiesAtLocation(entityMap, x, y);
            for (let i = 0; i < entities.length; i++) {
                const e = entities[i];
                const trigger = e.getOne(TriggerTypeComponent);

                if (trigger !== undefined) {
                    switch (trigger.triggerType) {
                        case TriggerType.Fire:
                            weight += 20;
                            break;
                        case TriggerType.ShallowWater:
                            weight += 2;
                            break;
                        case TriggerType.DeepWater:
                            weight += 7;
                            break;
                        case TriggerType.Mud:
                            weight += 7;
                            break;
                        case TriggerType.Event:
                            break;
                        default:
                            assertUnreachable(trigger.triggerType);
                    }
                }
            }

            // Should avoid tiles with neighboring fire triggers to avoid being set on fire
            for (let i = 0; i < neighbors.length; i++) {
                const n = neighbors[i];
                const entities = getEntitiesAtLocation(entityMap, n[0], n[1]);

                for (let j = 0; j < entities.length; j++) {
                    const e = entities[j];
                    const trigger = e.getOne(FireTriggerComponent);
                    if (trigger !== undefined) { weight += 5; }
                }
            }
        }

        if (globals.Game?.debugPathfinding === true) {
            globals.Game.map[0][y][x]!.pathfindingCost = weight.toString(10);
        }

        return weight;
    };
}

/**
 * Simplified distance heuristic
 */
export function generatePlayerWeightCallback(origin: Point): WeightCallback {
    return function (x: number, y: number): number {
        return Math.max(Math.abs(x - origin.x), Math.abs(y - origin.y));
    };
}

/**
 * Encapsulates an action that an entity can perform. Allows
 * entities to do things over multiple frames.
 *
 * SPEED: Perhaps pre-allocate common commands to be reused
 */
export interface Command {
    usedTurn: () => boolean;
    isFinished: () => boolean;
    execute: (dt: DOMHighResTimeStamp) => void;
}

export function getPlayerMovementPath(
    origin: Point,
    destination: Point,
    maxTilesPerMove: number,
    map: GameMap,
    entityMap: EntityMap
): Nullable<[number, number][]> {
    // quick distance check to cut down the number of
    // AStar calcs
    if (distanceBetweenPoints(destination, origin) < maxTilesPerMove * 2) {
        const aStar = new Path.AStar(
            destination.x,
            destination.y,
            createPassableCallback(origin),
            generatePlayerWeightCallback(origin),
            { topology: 8 }
        );

        if (destination.y >= map[0].length || destination.x >= map[0][0].length) {
            return null;
        }

        if (isBlocked(map, entityMap, destination.x, destination.y).blocks === true) {
            return null;
        }

        const path: [number, number][] = [];
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
    private readonly entity: Entity;
    private readonly path: number[][];
    private tilesMoved: number = 0;
    private done: boolean = false;

    constructor(entity: Entity, path: number[][]) {
        this.entity = entity;
        this.path = path;
    }

    usedTurn(): boolean {
        return true;
    }

    isFinished(): boolean {
        return this.done;
    }

    execute(deltaTime: DOMHighResTimeStamp): void {
        const destination = this.path[0];
        const { blocks } = isBlocked(
            globals.Game!.map,
            globals.Game!.entityMap,
            destination[0],
            destination[1]
        );
        if (blocks === true) {
            this.done = true;
            return;
        }

        const graphics = this.entity.getOne(GraphicsComponent);
        if (graphics === undefined || graphics.sprite === null) { throw new Error("No graphics for entity"); }

        const pos = this.entity.getOne(PositionComponent);
        if (pos === undefined) { throw new Error(`Entity ${this.entity.id} does not have a position for GoToLocationCommand`); }

        const speed = .25;
        const tilePos = pos.tilePosition();
        const startDistance = distanceBetweenPoints(
            globals.Game!.gameCamera.tilePositionToWorld(tilePos.x, tilePos.y),
            globals.Game!.gameCamera.tilePositionToWorld(destination[0], destination[1])
        );

        const dir: [number, number] = [ destination[0] - tilePos.x, destination[1] - tilePos.y ];

        pos.x += dir[0] * speed * deltaTime;
        pos.y += dir[1] * speed * deltaTime;
        pos.update();

        const distance = distanceBetweenPoints(
            globals.Game!.gameCamera.tilePositionToWorld(tilePos.x, tilePos.y),
            pos
        );

        if (distance >= startDistance) {
            const end = globals.Game!.gameCamera.tilePositionToWorld(
                destination[0], destination[1]
            );
            pos.x = end.x;
            pos.y = end.y;
            pos.tileX = destination[0];
            pos.tileY = destination[1];
            pos.update();

            this.tilesMoved++;
            this.path.shift();

            // Triggers and spreading fire
            const actorFlammableData = this.entity.getOne(FlammableComponent);
            const entities = globals.Game!.entityMap.get(`${pos.x},${pos.y}`) ?? [];
            for (let i = 0; i < entities.length; i++) {
                const e = entities[i];
                const triggerData = e.getOne(TriggerTypeComponent);
                const flammableData = e.getOne(FlammableComponent);

                // If we're walking over a flammable entity and we're
                // on fire, roll to set the entity on fire if the entity
                // in question is flammable
                if (actorFlammableData !== undefined &&
                    actorFlammableData.onFire === true &&
                    flammableData !== undefined &&
                    flammableData.onFire === false &&
                    Math.random() >= .5) {
                    setOnFire(
                        e,
                        actorFlammableData.fireDamage,
                        randomIntFromInterval(3, 6)
                    );
                }

                // Check to see if the current tile is a trigger
                // and activate it
                if (triggerData !== undefined) {
                    switch (triggerData.triggerType) {
                        case TriggerType.Event:
                            eventTrigger(this.entity, e);
                            break;
                        case TriggerType.Fire:
                            fireTrigger(this.entity, e);
                            break;
                        case TriggerType.ShallowWater:
                            shallowWaterTrigger(this.entity);
                            break;
                        case TriggerType.DeepWater:
                            deepWaterTrigger(this.entity);
                            break;
                        case TriggerType.Mud:
                            mudTrigger(this.entity);
                            break;
                        default:
                            assertUnreachable(triggerData.triggerType);
                    }
                }
            }

            // check for max movement differences in case one of the
            // triggers changed it
            const speedData = getEffectiveSpeedData(this.entity);
            if (speedData !== null && speedData.maxTilesPerMove <= this.tilesMoved) {
                this.done = true;
                return;
            }

            if (this.path.length === 0) {
                this.done = true;
            }
        }
    }
}

/**
 * Push an actor back a specified number of tiles
 */
export class PushBackCommand implements Command {
    private readonly entity: Entity;
    private readonly dir: number;
    private numTiles: number;
    private tilesMoved: number = 0;

    constructor(entity: Entity, dir: number, numTiles: number) {
        this.entity = entity;
        this.dir = dir;
        this.numTiles = numTiles;
    }

    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return this.tilesMoved === this.numTiles;
    }

    execute(deltaTime: DOMHighResTimeStamp): void {
        const pos = this.entity.getOne(PositionComponent);
        if (pos === undefined) { throw new Error(`Entity ${this.entity.id} does not have a position for PushBackCommand`); }
        const tilePos = pos.tilePosition();

        const step = DIRS[8][this.dir];
        const destinationX = tilePos.x + step[0];
        const destinationY = tilePos.y + step[1];
        const { blocks, entity: blocker } = isBlocked(
            globals.Game!.map,
            globals.Game!.entityMap,
            destinationX,
            destinationY
        );
        if (blocks === true) {
            const tilesLeft = this.numTiles - this.tilesMoved;
            const damage = (this.numTiles * 3) + (tilesLeft * 2);
            takeDamage(this.entity, damage, false, DamageType.Physical);
            if (Math.random() > 0.3) {
                const paralyzed = setParalyzed(this.entity, 3);
                if (paralyzed) {
                    const displayName = this.entity.getOne(DisplayNameComponent)!;
                    displayMessage(`${displayName.name} is now paralyzed`);
                }
            }

            if (blocker !== null && blocker.tags.has("moveable")) {
                takeDamage(blocker, damage, false, DamageType.Physical);
                globals.Game?.commandQueue.push(new PushBackCommand(blocker, this.dir, tilesLeft));

                if (Math.random() > 0.3) {
                    const paralyzed = setParalyzed(blocker, 3);
                    if (paralyzed) {
                        const displayName = blocker.getOne(DisplayNameComponent)!;
                        displayMessage(`${displayName.name} is now paralyzed`);
                    }
                }
            }

            this.numTiles = this.tilesMoved;
            return;
        }

        const speed = .5;
        const startDistance = distanceBetweenPoints(
            globals.Game!.gameCamera.tilePositionToWorld(tilePos.x, tilePos.y),
            globals.Game!.gameCamera.tilePositionToWorld(destinationX, destinationY)
        );

        pos.x += step[0] * speed * deltaTime;
        pos.y += step[1] * speed * deltaTime;
        pos.update();

        const distance = distanceBetweenPoints(
            globals.Game!.gameCamera.tilePositionToWorld(tilePos.x, tilePos.y),
            pos
        );

        if (distance >= startDistance) {
            const end = globals.Game!.gameCamera.tilePositionToWorld(
                destinationX, destinationY
            );
            pos.x = end.x;
            pos.y = end.y;
            pos.tileX = destinationX;
            pos.tileY = destinationY;
            pos.update();

            this.tilesMoved++;

            // Triggers and spreading fire
            const actorFlammableData = this.entity.getOne(FlammableComponent);
            const entities = globals.Game!.entityMap.get(`${pos.x},${pos.y}`) ?? [];
            for (let i = 0; i < entities.length; i++) {
                const e = entities[i];
                const triggerData = e.getOne(TriggerTypeComponent);
                const flammableData = e.getOne(FlammableComponent);

                // If we're walking over a flammable entity and we're
                // on fire, roll to set the entity on fire if the entity
                // in question is flammable
                if (actorFlammableData !== undefined &&
                    actorFlammableData.onFire === true &&
                    flammableData !== undefined &&
                    flammableData.onFire === false &&
                    Math.random() >= .5) {
                    setOnFire(
                        e,
                        actorFlammableData.fireDamage,
                        randomIntFromInterval(3, 6)
                    );
                }

                // Check to see if the current tile is a trigger
                // and activate it
                if (triggerData !== undefined) {
                    switch (triggerData.triggerType) {
                        case TriggerType.Event:
                            eventTrigger(this.entity, e);
                            break;
                        case TriggerType.Fire:
                            fireTrigger(this.entity, e);
                            break;
                        case TriggerType.ShallowWater:
                            shallowWaterTrigger(this.entity);
                            break;
                        case TriggerType.DeepWater:
                            deepWaterTrigger(this.entity);
                            break;
                        case TriggerType.Mud:
                            mudTrigger(this.entity);
                            break;
                        default:
                            assertUnreachable(triggerData.triggerType);
                    }
                }
            }
        }
    }
}

/**
 * Interact with the target, either calling the interactable or
 * attacking the fighter
 */
export class InteractCommand implements Command {
    private readonly entity: Entity;
    private interacted: boolean = true;
    private readonly target: Entity;

    constructor(entity: Entity, target: Entity) {
        this.entity = entity;
        this.target = target;
    }

    usedTurn(): boolean {
        return this.interacted;
    }

    isFinished(): boolean {
        return true;
    }

    execute(): void {
        const actorStats = this.entity.getOne(StatsComponent);
        const interactableData = this.target.getOne(InteractableTypeComponent);
        const hpData = this.target.getOne(HitPointsComponent);

        if (interactableData !== undefined) {
            switch (interactableData.interactableType) {
                case InteractableType.Door:
                    doorInteract(this.entity, this.target);
                    break;
                case InteractableType.GiveItems:
                    giveItemsInteract(this.entity, this.target);
                    break;
                case InteractableType.GiveSpells:
                    giveSpellsInteract(this.entity, this.target);
                    break;
                case InteractableType.LoadLevel:
                    levelLoadInteract(this.entity, this.target);
                    break;
                default:
                    assertUnreachable(interactableData.interactableType);
            }

            this.interacted = true;
            return;
        }

        if (hpData !== undefined && actorStats !== undefined) {
            attack(this.entity, this.target);
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
        const g = globals.Game;
        if (g === null) { throw new Error("Global Game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        globals.gameEventEmitter.emit("ui.openInventory");
        g.state = GameState.InventoryMenu;
        const invData = g.player.getOne(InventoryComponent)!;
        g.inventoryMenu.open(getItems(invData));
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
        const g = globals.Game;
        if (g === null) { throw new Error("Global Game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        globals.gameEventEmitter.emit("ui.openSpells");
        g.state = GameState.SpellMenu;
        const spellsData = g.player.getOne(SpellsComponent)!;
        g.spellSelectionMenu.open(getKnownSpells(spellsData));
    }
}

/**
 * Create a command function to use an item in the object's inventory
 * and call its use function.
 */
export class UseItemCommand implements Command {
    private readonly entity: Entity;
    private didUseItem: boolean = true;
    private readonly itemID: string;
    private readonly target: Point | undefined;
    private readonly rotation: number | undefined;

    constructor(entity: Entity, itemID: string, target?: Point, rotation?: number) {
        this.entity = entity;
        this.itemID = itemID;
        this.target = target;
        this.rotation = rotation;
    }

    usedTurn(): boolean {
        return this.didUseItem;
    }

    isFinished(): boolean {
        return true;
    }

    execute(): void {
        const actorInventory = this.entity.getOne(InventoryComponent);
        if (actorInventory === undefined) { throw new Error("Cannot use an item without an inventory"); }
        if (!hasItem(actorInventory, this.itemID)) { throw new Error(`Cannot use ${this.itemID}, not in inventory`); }

        const itemDetails = ItemData[this.itemID];
        const used = itemDetails.useFunc(
            itemDetails,
            this.entity,
            globals.Game!.ecs,
            globals.Game!.map,
            globals.Game!.entityMap,
            this.target,
            this.rotation
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
    private didUseTurn: boolean = false;
    private readonly entity: Entity;
    private readonly spellID: string;
    private readonly target: Point | undefined;
    private readonly rotation: number | undefined;

    constructor(entity: Entity, spellID: string, target?: Point, rotation?: number) {
        this.entity = entity;
        this.spellID = spellID;
        this.target = target;
        this.rotation = rotation;
    }

    usedTurn(): boolean {
        return this.didUseTurn;
    }

    isFinished(): boolean {
        return true;
    }

    execute(): void {
        const spellData = this.entity.getOne(SpellsComponent);
        if (spellData === undefined ||
            spellData.knownSpells.has(this.spellID) === false) {
            return;
        }

        const details = SpellData[this.spellID];

        // FIX ME
        if ((spellData.knownSpells.get(this.spellID) ?? -1) < 1) {
            this.didUseTurn = false;

            if (this.entity === globals.Game?.player) {
                displayMessage(`You don't have enough casts to use ${details.displayName}`);
            }

            return;
        }

        this.didUseTurn = details.useFunc(
            details,
            this.entity,
            globals.Game!.ecs,
            globals.Game!.map,
            globals.Game!.entityMap,
            this.target,
            this.rotation
        );

        if (this.didUseTurn) {
            const statData = this.entity.getOne(SpellsComponent)!;
            useSpell(statData, details.id);
        }
    }
}

export class RotateReticleCommand implements Command {
    private readonly entity: Entity;

    constructor(entity: Entity) {
        this.entity = entity;
    }

    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return true;
    }

    execute(): void {
        const inputHandlerState = this.entity.getOne(InputHandlingComponent);
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
