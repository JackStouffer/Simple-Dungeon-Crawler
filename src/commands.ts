import { Entity, World } from "ape-ecs";
import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";

import Path from "./rot/path/index";
import { WeightCallback, PassableCallback } from "./rot/path/path";

import globals from "./globals";
import {
    Affinity,
    DamageType,
    InteractableType,
    ItemType,
    PLAYER_ID,
    SpellType,
    TriggerType,
} from "./constants";
import {
    GameMap,
    isBlocked,
    tileDistanceBetweenPoints,
    Vector2D,
    getEntitiesAtLocation,
    getHighestZIndexWithTile,
    worldDistanceBetweenPoints,
    getRandomFighterWithinRange
} from "./map";
import { assertUnreachable, Nullable, randomIntFromInterval } from "./util";
import { showConfirmationDialogBox } from "./ui";
import {
    EntityMap,
    FlammableComponent,
    GraphicsComponent,
    HitPointsComponent,
    InputHandlingComponent,
    InteractableTypeComponent,
    PlannerAIComponent,
    PositionComponent,
    removeEntity,
    StatsComponent,
    TriggerComponent
} from "./entity";
import { attack, getEffectiveDamageAffinity, getEffectiveSpeedData, takeDamage } from "./fighter";
import { deepWaterTrigger, eventTrigger, explosionTrapTrigger, fireTrigger, mudTrigger, shallowWaterTrigger, steamTrigger } from "./trigger";
import { giveItemsInteract, giveSpellsInteract, doorInteract, levelLoadInteract, restPointInteract } from "./interactable";
import { setOnFire, setStunned, SpellDataDetails, ItemDataDetails } from "./skills";
import { DIRS } from "./rot";
import { createLightningTexture, createSpeechBubbleTexture } from "./graphics";
import { Transition, Tween } from "./tween";
import { Camera } from "./camera";

/**
 * Creates a function which returns if an x and y coordinate
 * represents a passable spot on the map
 */
export function createPassableCallback(
    ecs: World,
    entityMap: EntityMap,
    origin: Vector2D,
    ai?: Entity
): PassableCallback {
    return function(x: number, y: number, previousX?: number, previousY?: number) {
        if (globals.Game === null) { throw new Error("Global game object is null"); }

        // Don't allow entities to pass through diagonally through diagonally
        // adjacent blocks
        let dx, dy;
        if (previousX !== undefined && previousY !== undefined) {
            dx = x - previousX;
            dy = y - previousY;

            // NW
            if (dx === -1 && dy === -1) {
                const { blocks: east } = isBlocked(
                    globals.Game.ecs,
                    globals.Game.map,
                    globals.Game.entityMap,
                    new Vector2D(x + 1, y)
                );
                const { blocks: south } = isBlocked(
                    globals.Game.ecs,
                    globals.Game.map,
                    globals.Game.entityMap,
                    new Vector2D(x, y + 1)
                );
                if (east && south) { return false; }
            // NE
            } else if (dx === 1 && dy === -1) {
                const { blocks: west } = isBlocked(
                    globals.Game.ecs,
                    globals.Game.map,
                    globals.Game.entityMap,
                    new Vector2D(x - 1, y)
                );
                const { blocks: south } = isBlocked(
                    globals.Game.ecs,
                    globals.Game.map,
                    globals.Game.entityMap,
                    new Vector2D(x, y + 1)
                );
                if (west && south) { return false; }
            // SW
            } else if (dx === -1 && dy === 1) {
                const { blocks: east } = isBlocked(
                    globals.Game.ecs,
                    globals.Game.map,
                    globals.Game.entityMap,
                    new Vector2D(x + 1, y)
                );
                const { blocks: north } = isBlocked(
                    globals.Game.ecs,
                    globals.Game.map,
                    globals.Game.entityMap,
                    new Vector2D(x, y - 1)
                );
                if (east && north) { return false; }
            // SE
            } else if (dx === 1 && dy === 1) {
                const { blocks: west } = isBlocked(
                    globals.Game.ecs,
                    globals.Game.map,
                    globals.Game.entityMap,
                    new Vector2D(x - 1, y)
                );
                const { blocks: north } = isBlocked(
                    globals.Game.ecs,
                    globals.Game.map,
                    globals.Game.entityMap,
                    new Vector2D(x, y - 1)
                );
                if (west && north) { return false; }
            }
        }

        // own space is passable
        if (origin.x === x && origin.y === y) {
            return true;
        }

        const { blocks } = isBlocked(
            globals.Game.ecs,
            globals.Game.map,
            globals.Game.entityMap,
            new Vector2D(x, y)
        );
        if (blocks) { return false; }

        if (ai !== undefined) {
            const aiState = ai.getOne(PlannerAIComponent);
            const flammableData = ai.getOne(FlammableComponent);
            const affinity = getEffectiveDamageAffinity(ai);
            if (aiState !== undefined &&
                flammableData?.onFire !== true &&
                affinity !== null &&
                affinity[DamageType.Fire] !== Affinity.nullified) {
                const entities = getEntitiesAtLocation(ecs, entityMap, new Vector2D(x, y));
                for (const e of entities) {
                    const triggerData = e.getOne(TriggerComponent);
                    if (triggerData !== undefined &&
                        triggerData.currentTriggerType === TriggerType.Fire) {
                        return false;
                    }
                }
            }
        }

        return true;
    };
}

/**
 * Passable callback for water based entities which cannot go on land
 */
export function createWaterBasedPassableCallback(origin: Vector2D): PassableCallback {
    return function(x: number, y: number) {
        if (globals.Game === null) { throw new Error("Global game object is null"); }

        // own space is passable
        if (origin.x === x && origin.y === y) {
            return true;
        }
        const { blocks, entity } = isBlocked(
            globals.Game.ecs,
            globals.Game.map,
            globals.Game.entityMap,
            new Vector2D(x, y)
        );

        if (blocks) { return false; }

        if (entity !== null && entity.tags.has("waterTile")) {
            return true;
        }

        return false;
    };
}

/**
 * Factory to generate a function which takes an x and y coordinate
 * and returns the weight for A* pathing calculations on that tile.
 *
 * @param ecs The current world
 * @param map The current game map
 * @param entityMap A map of tile positions to entities
 * @param origin The starting point
 * @returns A function
 */
export function generateWeightCallback(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    entity: Entity,
    origin: Vector2D
): WeightCallback {
    return function (x: number, y: number): number {
        if (globals.Game === null) { throw new Error("Global game object is null"); }

        const affinity = getEffectiveDamageAffinity(entity);

        const neighbors: Vector2D[] = [];
        for (let i = 0; i < DIRS[8].length; i++) {
            const dir = DIRS[8][i];
            const delta = new Vector2D(x + dir[0], y + dir[1]);

            if (!isBlocked(ecs, map, entityMap, delta).blocks) {
                neighbors.push(delta);
            }
        }

        let weight = Math.max(Math.abs(x - origin.x), Math.abs(y - origin.y));
        if (x !== origin.x || y !== origin.y) {
            const entities = getEntitiesAtLocation(ecs, entityMap, new Vector2D(x, y));
            for (let i = 0; i < entities.length; i++) {
                const e = entities[i];
                const trigger = e.getOne(TriggerComponent);

                if (trigger !== undefined) {
                    switch (trigger.currentTriggerType) {
                        case TriggerType.Fire: {
                            if (affinity !== null &&
                                affinity[DamageType.Fire] !== Affinity.nullified) {
                                weight += 20;
                            }
                            break;
                        } case TriggerType.ShallowWater:
                            weight += 2;
                            break;
                        case TriggerType.DeepWater:
                            weight += 7;
                            break;
                        case TriggerType.Mud:
                            weight += 7;
                            break;
                        case TriggerType.Steam: {
                            if (affinity !== null &&
                                affinity[DamageType.Water] !== Affinity.nullified) {
                                weight += 20;
                            }
                            break;
                        } case TriggerType.Event:
                            break;
                        case TriggerType.Ice:
                            weight += 7;
                            break;
                        case TriggerType.Explosion:
                            break;
                        default:
                            assertUnreachable(trigger.currentTriggerType);
                    }
                }
            }

            // Should avoid tiles with neighboring fire triggers to avoid being set on fire
            for (let i = 0; i < neighbors.length; i++) {
                const n = neighbors[i];
                // TODO, speed: take another look at this, getting entities twice for a lot
                // of locations
                const entities = getEntitiesAtLocation(ecs, entityMap, n);

                for (let j = 0; j < entities.length; j++) {
                    const e = entities[j];
                    const trigger = e.getOne(TriggerComponent);
                    if (trigger !== undefined &&
                        trigger.currentTriggerType === TriggerType.Fire) { weight += 5; }
                }
            }
        }

        if (globals.Game?.debugPathfinding === true) {
            globals.Game.map.data[0][y][x]!.pathfindingCost = weight.toString(10);
        }

        return weight;
    };
}

/**
 * Simplified distance heuristic use for drawing the movement path
 */
export function generatePlayerWeightCallback(origin: Vector2D): WeightCallback {
    return function (x: number, y: number): number {
        return Math.max(Math.abs(x - origin.x), Math.abs(y - origin.y));
    };
}

/**
 * Encapsulates an action that an entity can perform. Allows
 * entities to do things over multiple frames.
 *
 * TODO, SPEED: Perhaps pre-allocate common commands to be reused
 */
export interface Command {
    /**
     * Controls if this command should stop commands after it in the
     * queue from being executed. This allows several commands to be
     * run at once in a single turn, e.g. a switch could open multiple
     * doors.
     */
    blocks: boolean;
    isSetUp: boolean;

    usedTurn: () => boolean;
    isFinished: () => boolean;
    /**
     * Commands are created all over the place and then placed
     * in the queue. We don't want things like the effects to
     * be placed into the world until we're ready for them to
     * be run. Which is why the set up instructions are not in
     * the constructor.
     */
    setUp?: (ecs: World) => void;
    tearDown?: (ecs: World) => void;
    update: (ecs: World, dt: DOMHighResTimeStamp) => void;
}

export function getPlayerMovementPath(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    origin: Vector2D,
    destination: Vector2D,
    maxTilesPerMove: number,
): Vector2D[] {
    // quick distance check to cut down the number of
    // AStar calcs
    if (tileDistanceBetweenPoints(destination, origin) < maxTilesPerMove * 2) {
        const aStar = new Path.AStar(
            destination.x,
            destination.y,
            createPassableCallback(ecs, entityMap, origin),
            generatePlayerWeightCallback(origin),
            { topology: 8 }
        );

        if (destination.y >= map.height || destination.x >= map.width) {
            return [];
        }

        if (isBlocked(ecs, map, entityMap, destination).blocks === true) {
            return [];
        }

        const path: Vector2D[] = [];
        function pathCallback(x: number, y: number) {
            path.push(new Vector2D(x, y));
        }
        aStar.compute(origin.x, origin.y, pathCallback);

        if (path.length === 0 || path.length > maxTilesPerMove) { return []; }

        // remove our own position
        path.shift();
        if (path.length === 0) { return []; }
        return path;
    }

    return [];
}

/**
 * Command that does nothing. Useful for passing a turn
 */
export class NoOpCommand implements Command {
    blocks: boolean = true;
    isSetUp: boolean = false;
    readonly usesTurn: boolean;

    constructor(usesTurn: boolean) {
        this.usesTurn = usesTurn;
    }

    usedTurn(): boolean {
        return this.usesTurn;
    }

    isFinished(): boolean {
        return true;
    }

    update(): void {
        return;
    }
}

/**
 * Move the game object to a specific point on the map
 */
export class GoToLocationCommand implements Command {
    blocks: boolean = true;
    isSetUp: boolean = false;
    readonly entityId: string;
    readonly path: Vector2D[];
    tilesMoved: number = 0;
    done: boolean = false;

    // TODO, cleanup: Commands need some sort of mechanism whereby its origin
    // point is saved in the command so it's possible to tell where a wayward
    // command came from. Possible to save some sort of stacktrace? Maybe overkill.
    // Maybe just a function name?
    constructor(entityId: string, path: Vector2D[]) {
        if (path.length === 0) { throw new Error("Zero length path for GoToLocationCommand"); }
        this.entityId = entityId;
        this.path = path;
    }

    usedTurn(): boolean {
        return true;
    }

    isFinished(): boolean {
        return this.done;
    }

    update(ecs: World, deltaTime: DOMHighResTimeStamp): void {
        const destination = this.path[0];
        const { blocks } = isBlocked(
            globals.Game!.ecs,
            globals.Game!.map,
            globals.Game!.entityMap,
            destination
        );
        if (blocks === true) {
            this.done = true;
            return;
        }

        const entity = ecs.getEntity(this.entityId);
        if (entity === undefined) {
            this.done = true;
            return;
        }

        const graphics = entity.getOne(GraphicsComponent);
        if (graphics === undefined || graphics.sprite === null) { throw new Error("No graphics for entity"); }

        const pos = entity.getOne(PositionComponent);
        if (pos === undefined) { throw new Error(`Entity ${this.entityId} does not have a position for GoToLocationCommand`); }

        const speed = .25;
        const startDistance = tileDistanceBetweenPoints(
            globals.Game!.gameCamera.tilePositionToWorld(pos.tilePosition),
            globals.Game!.gameCamera.tilePositionToWorld(destination)
        );

        const dir = new Vector2D(
            destination.x - pos.tilePosition.x,
            destination.y - pos.tilePosition.y
        );

        pos.worldPosition.x += dir.x * speed * deltaTime;
        pos.worldPosition.y += dir.y * speed * deltaTime;
        pos.update();

        const distance = tileDistanceBetweenPoints(
            globals.Game!.gameCamera.tilePositionToWorld(pos.tilePosition),
            Vector2D.fromVector(pos.worldPosition)
        );

        // we're done animating one tile movement, update the position and
        // do the movement logic
        if (distance >= startDistance) {
            const end = globals.Game!.gameCamera.tilePositionToWorld(destination);
            pos.worldPosition = end;
            pos.tilePosition = destination;
            pos.update();

            this.tilesMoved++;
            this.path.shift();

            // Triggers and spreading fire
            const actorFlammableData = entity.getOne(FlammableComponent);
            const entities = getEntitiesAtLocation(
                ecs,
                globals.Game!.entityMap,
                destination
            );
            for (let i = 0; i < entities.length; i++) {
                const e = entities[i];
                const triggerData = e.getOne(TriggerComponent);
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
                    switch (triggerData.currentTriggerType) {
                        case TriggerType.Event:
                            eventTrigger(entity, e);
                            break;
                        case TriggerType.Fire:
                            fireTrigger(ecs, globals.Game!.entityMap, entity, e);
                            break;
                        case TriggerType.ShallowWater:
                            shallowWaterTrigger(entity);
                            break;
                        case TriggerType.DeepWater:
                            deepWaterTrigger(entity);
                            break;
                        case TriggerType.Mud:
                            mudTrigger(entity);
                            break;
                        case TriggerType.Steam:
                            steamTrigger(ecs, globals.Game!.entityMap, entity, e);
                            break;
                        case TriggerType.Ice: {
                            globals.Game!.commandQueue.push(
                                new GoToLocationCommand(
                                    this.entityId,
                                    [new Vector2D(
                                        pos.tilePosition.x + dir.x, pos.tilePosition.y + dir.y
                                    )]
                                )
                            );
                            this.done = true;
                            return;
                        }
                        case TriggerType.Explosion:
                            explosionTrapTrigger(ecs, globals.Game!.entityMap, entity, e);
                            break;
                        default:
                            assertUnreachable(triggerData.currentTriggerType);
                    }
                }
            }

            // check for max movement differences in case one of the
            // triggers changed it
            const speedData = getEffectiveSpeedData(
                globals.Game!.ecs,
                globals.Game!.entityMap,
                entity
            );
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
    blocks = false;
    isSetUp: boolean = false;
    readonly entityId: string;
    readonly dir: number;
    numTiles: number;
    tilesMoved: number = 0;
    readonly stunProbability: number;

    constructor(entityId: string, dir: number, numTiles: number, stunProbability: number = 0.3) {
        this.entityId = entityId;
        this.dir = dir;
        this.numTiles = numTiles;
        this.stunProbability = stunProbability;
    }

    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return this.tilesMoved === this.numTiles;
    }

    tearDown(ecs: World) {
        const entity = ecs.getEntity(this.entityId);
        if (entity === undefined) { return; }

        if (Math.random() <= this.stunProbability) {
            setStunned(entity, 1);
        }
    }

    update(ecs: World, deltaTime: DOMHighResTimeStamp): void {
        const entity = ecs.getEntity(this.entityId);
        if (entity === undefined) {
            this.tilesMoved = this.numTiles;
            return;
        }

        const pos = entity.getOne(PositionComponent);
        if (pos === undefined) { throw new Error(`Entity ${this.entityId} does not have a position for PushBackCommand`); }

        const step = DIRS[8][this.dir];
        const destination = new Vector2D(
            pos.tilePosition.x + step[0],
            pos.tilePosition.y + step[1]
        );
        const { blocks, entity: blocker } = isBlocked(
            globals.Game!.ecs,
            globals.Game!.map,
            globals.Game!.entityMap,
            destination
        );
        if (blocks === true) {
            const tilesLeft = this.numTiles - this.tilesMoved;
            const damage = (this.numTiles * 3) + (tilesLeft * 2);
            takeDamage(ecs, globals.Game!.entityMap, entity, damage, false, DamageType.Physical);
            if (Math.random() > 0.3) {
                setStunned(entity, 3);
            }

            if (blocker !== null) {
                takeDamage(
                    ecs,
                    globals.Game!.entityMap,
                    blocker,
                    damage,
                    false,
                    DamageType.Physical
                );

                if (Math.random() <= this.stunProbability) {
                    setStunned(blocker, 1);
                }
                if (blocker.tags.has("moveable")) {
                    // TODO, cleanup: Pushing directly onto the command queue sort of sucks.
                    // Have some way for commands to cleanly spawn other commands
                    globals.Game?.commandQueue.push(
                        new PushBackCommand(blocker.id, this.dir, tilesLeft)
                    );
                }
            }

            this.numTiles = this.tilesMoved;
            return;
        }

        const speed = .5;
        const startDistance = tileDistanceBetweenPoints(
            globals.Game!.gameCamera.tilePositionToWorld(pos.tilePosition),
            globals.Game!.gameCamera.tilePositionToWorld(destination)
        );

        pos.worldPosition.x += step[0] * speed * deltaTime;
        pos.worldPosition.y += step[1] * speed * deltaTime;
        pos.update();

        const distance = tileDistanceBetweenPoints(
            globals.Game!.gameCamera.tilePositionToWorld(pos.tilePosition),
            Vector2D.fromVector(pos.worldPosition)
        );

        if (distance >= startDistance) {
            const end = globals.Game!.gameCamera.tilePositionToWorld(destination);
            pos.worldPosition = end;
            pos.tilePosition = destination;
            pos.update();

            this.tilesMoved++;

            // Triggers and spreading fire
            const actorFlammableData = entity.getOne(FlammableComponent);
            const entities = getEntitiesAtLocation(
                ecs,
                globals.Game!.entityMap,
                destination
            );
            for (let i = 0; i < entities.length; i++) {
                const e = entities[i];
                const triggerData = e.getOne(TriggerComponent);
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
                    switch (triggerData.currentTriggerType) {
                        case TriggerType.Event:
                            eventTrigger(entity, e);
                            break;
                        case TriggerType.Fire:
                            fireTrigger(ecs, globals.Game!.entityMap, entity, e);
                            break;
                        case TriggerType.ShallowWater:
                            shallowWaterTrigger(entity);
                            break;
                        case TriggerType.DeepWater:
                            deepWaterTrigger(entity);
                            break;
                        case TriggerType.Mud:
                            mudTrigger(entity);
                            break;
                        case TriggerType.Steam:
                            steamTrigger(ecs, globals.Game!.entityMap, entity, e);
                            break;
                        case TriggerType.Ice:
                            this.numTiles++;
                            break;
                        case TriggerType.Explosion:
                            break;
                        default:
                            assertUnreachable(triggerData.currentTriggerType);
                    }
                }
            }
        }
    }
}

/**
 * Call the attack logic and animate the attacker
 */
export class PhysicalAttackCommand implements Command {
    blocks = true;
    isSetUp: boolean = false;
    attacked: boolean = true;
    inTweenX: Nullable<Tween> = null;
    inTweenY: Nullable<Tween> = null;
    outTweenX: Nullable<Tween> = null;
    outTweenY: Nullable<Tween> = null;
    readonly entityId: string;
    readonly targetId: string;

    constructor(entityId: string, targetId: string) {
        this.entityId = entityId;
        this.targetId = targetId;
    }

    usedTurn(): boolean {
        return this.attacked;
    }

    isFinished(): boolean {
        if (this.attacked) {
            if (this.outTweenX !== null) {
                return this.outTweenX.finished;
            }

            return false;
        }

        return true;
    }

    setUp(ecs: World) {
        const entity = ecs.getEntity(this.entityId);
        const target = ecs.getEntity(this.targetId);
        if (entity === undefined || target === undefined) {
            this.attacked = false;
            return;
        }

        const actorStats = entity.getOne(StatsComponent);
        const actorPosData = entity.getOne(PositionComponent);
        const targetHPData = target.getOne(HitPointsComponent);
        const targetPosData = target.getOne(PositionComponent);

        if (targetHPData !== undefined &&
            actorStats !== undefined &&
            actorPosData !== undefined &&
            targetPosData !== undefined
        ) {
            attack(ecs, globals.Game!.entityMap, entity, target);
            this.attacked = true;
            this.inTweenX = new Tween({
                object: actorPosData.worldPosition,
                key: "x",
                duration: 100,
                delay: 20,
                start: actorPosData.worldPosition.x,
                end: targetPosData.worldPosition.x,
                transition: Transition.Linear
            });
            this.inTweenY = new Tween({
                object: actorPosData.worldPosition,
                key: "y",
                duration: 100,
                delay: 20,
                start: actorPosData.worldPosition.y,
                end: targetPosData.worldPosition.y,
                transition: Transition.Linear
            });
            this.outTweenX = new Tween({
                object: actorPosData.worldPosition,
                key: "x",
                duration: 100,
                delay: 0,
                start: targetPosData.worldPosition.x,
                end: actorPosData.worldPosition.x,
                transition: Transition.Linear
            });
            this.outTweenY = new Tween({
                object: actorPosData.worldPosition,
                key: "y",
                duration: 100,
                delay: 0,
                start: targetPosData.worldPosition.y,
                end: actorPosData.worldPosition.y,
                transition: Transition.Linear
            });
            return;
        }

        this.attacked = false;
    }

    update(ecs: World, deltaTime: DOMHighResTimeStamp): void {
        if (this.inTweenX !== null) {
            this.inTweenX.update(deltaTime);

            if (this.inTweenX.finished) {
                this.inTweenX = null;
            }
        }
        if (this.inTweenY !== null) {
            this.inTweenY.update(deltaTime);

            if (this.inTweenY.finished) {
                this.inTweenY = null;
            }

            // TODO, sound: move attack call here
        }

        if (this.inTweenX === null && this.outTweenX !== null) {
            this.outTweenX.update(deltaTime);
        }
        if (this.inTweenY === null && this.outTweenY !== null) {
            this.outTweenY.update(deltaTime);
        }
    }
}

/**
 * Interact with the target calling the interactable function
 */
export class InteractCommand implements Command {
    // TODO, cleanup: This needs to be completely rethought. Too much
    // logic is happening in the update function here. Really we should
    // have different commands for each interactable type so there can
    // be different effects/animations

    blocks = true;
    isSetUp: boolean = false;
    interacted: boolean = true;
    readonly entityId: string;
    readonly targetId: string;

    constructor(entityId: string, targetId: string) {
        this.entityId = entityId;
        this.targetId = targetId;
    }

    usedTurn(): boolean {
        return this.interacted;
    }

    isFinished(): boolean {
        return true;
    }

    update(ecs: World): void {
        const entity = ecs.getEntity(this.entityId);
        const target = ecs.getEntity(this.targetId);
        if (entity === undefined || target === undefined) {
            return;
        }

        const interactableData = target.getOne(InteractableTypeComponent);

        if (interactableData !== undefined) {
            switch (interactableData.interactableType) {
                case InteractableType.Door:
                    doorInteract(entity, target);
                    break;
                case InteractableType.GiveItems:
                    giveItemsInteract(entity, target);
                    break;
                case InteractableType.GiveSpells:
                    giveSpellsInteract(entity, target);
                    break;
                case InteractableType.LoadLevel:
                    levelLoadInteract(entity, target);
                    break;
                case InteractableType.Rest:
                    restPointInteract(entity);
                    break;
                default:
                    assertUnreachable(interactableData.interactableType);
            }

            this.interacted = true;
            return;
        }

        this.interacted = false;
    }
}

/**
 * Put the game into the inventory_menu state
 */
export class OpenInventoryCommand implements Command {
    blocks: boolean = true;
    isSetUp: boolean = false;

    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return true;
    }

    update(): void {
        const g = globals.Game;
        if (g === null) { throw new Error("Global Game object is null"); }

        g.setState(g.inventoryMenuState);
    }
}

/**
 * Generate a function which puts the game into spell_menu state.
 * @returns {Function} A function which always returns false
 */
export class OpenSpellsCommand implements Command {
    blocks: boolean = true;
    isSetUp: boolean = false;

    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return true;
    }

    update(): void {
        globals.Game?.setState(globals.Game.spellMenuState);
    }
}

type SkillCallback = (e: Entity, id: string) => void;

/**
 * Create a command function to call a skill function at the specified
 * point. Calls the callback if the skill was cast.
 */
export class UseSkillCommand implements Command {
    blocks: boolean = true;
    isSetUp: boolean = false;
    didUseTurn: boolean = false;
    shouldUseTurn: boolean = true;
    entityId: string;
    rotation: number | undefined;
    details: SpellDataDetails | ItemDataDetails;
    target: Vector2D | undefined;
    particleEmitter: Nullable<particles.Emitter> = null;
    effectGraphics: Nullable<PIXI.Graphics> = null;
    effectTween: Nullable<Tween> = null;
    skillCallback: SkillCallback | undefined;

    constructor(
        entityId: string,
        details: SpellDataDetails | ItemDataDetails,
        target?: Vector2D,
        rotation?: number,
        shouldUseTurn?: boolean,
        cb?: SkillCallback
    ) {
        this.entityId = entityId;
        this.target = target;
        this.rotation = rotation;
        this.details = details;
        this.shouldUseTurn = shouldUseTurn ?? true;
        this.skillCallback = cb;
    }

    usedTurn(): boolean {
        return this.shouldUseTurn ? this.didUseTurn : false;
    }

    isFinished(): boolean {
        if (this.particleEmitter !== null) {
            return !this.particleEmitter.emit;
        }

        if (this.effectTween !== null) {
            return this.effectTween.finished;
        }

        return true;
    }

    setUp(ecs: World) {
        const entity = ecs.getEntity(this.entityId);
        if (entity === undefined) { return; }
        const entityPos = entity.getOne(PositionComponent)!;

        // Wild spell target selection
        if (this.details.type === SpellType.WildDamage ||
            this.details.type === ItemType.WildDamageScroll) {
            const targetedEntity = getRandomFighterWithinRange(
                globals.Game!.ecs,
                globals.Game!.map,
                entityPos.tilePosition,
                16
            );

            if (targetedEntity === null) {
                if (entity.id === "player") {
                    showConfirmationDialogBox("No target is close enough to use the scroll");
                }

                this.didUseTurn = false;
                return;
            }

            this.target = targetedEntity.getOne(PositionComponent)!.tilePosition;
        }

        this.didUseTurn = this.details.useFunc(
            this.details,
            entity,
            globals.Game!.ecs,
            globals.Game!.map,
            globals.Game!.entityMap,
            this.target,
            this.rotation
        );

        if (this.didUseTurn) {
            if (this.skillCallback !== undefined) {
                this.skillCallback(entity, this.details.id);
            }

            if (this.details.effect === "particles" &&
                this.details.particles !== undefined &&
                ((this.details.particles.particleLocation === "target" && this.target !== undefined && globals.Game!.gameCamera.isTilePosOnScreen(this.target)) ||
                (this.details.particles.particleLocation === "self" && globals.Game!.gameCamera.isTilePosOnScreen(entityPos.tilePosition)))) {
                let sprite: PIXI.Sprite | undefined;

                if (this.details.particles.particleLocation === "target" && this.target !== undefined) {
                    // We need to put the emitter at the location. For some reason
                    // the API requires a container at the location rather than the
                    // location. So get either the entity sprite there or the highest
                    // tile sprite.
                    const entities = getEntitiesAtLocation(
                        ecs,
                        globals.Game!.entityMap,
                        this.target
                    );
                    entities.sort((a, b) => {
                        const g1 = a.getOne(GraphicsComponent)?.sprite?.zIndex ?? 0;
                        const g2 = b.getOne(GraphicsComponent)?.sprite?.zIndex ?? 0;
                        return g2 - g1;
                    });
                    const entity = entities[0];

                    if (entity !== undefined) {
                        sprite = entity.getOne(GraphicsComponent)?.sprite ?? undefined;
                    }

                    // Fallback
                    let z = getHighestZIndexWithTile(
                        globals.Game!.map, this.target
                    );
                    while (sprite === undefined) {
                        const tile = globals.Game!.map.data[z][this.target.y][this.target.x];
                        if (tile === null || tile.sprite === null) {
                            --z;
                            continue;
                        }
                        sprite = tile.sprite;
                    }
                } else if (this.details.particles.particleLocation === "self") {
                    sprite = entity.getOne(GraphicsComponent)?.sprite ?? undefined;
                }

                this.particleEmitter = new particles.Emitter(
                    sprite!,
                    this.details.particles.particleImages.map(
                        e => globals.Game!.textureAtlas[e]
                    ),
                    this.details.particles.particleConfig
                );
                this.particleEmitter.emit = true;
            }

            if (this.details.effect === "lightning" &&
                this.details.lightning !== undefined &&
                this.target !== undefined) {
                const tilePos = entity.getOne(PositionComponent)!.tilePosition;
                const screenPos = globals.Game!.gameCamera.tilePositionToScreen(tilePos);
                this.effectGraphics = createLightningTexture(
                    screenPos.x,
                    screenPos.y,
                    20,
                    2,
                    false,
                    worldDistanceBetweenPoints(
                        tilePos, this.target, globals.Game!.gameCamera.zoom
                    )
                );
                this.effectGraphics.rotation = Math.atan2(
                    -(this.target.x - tilePos.x),
                    this.target.y - tilePos.y
                );
                globals.Game?.pixiApp.stage.addChild(this.effectGraphics);

                this.effectTween = new Tween({
                    object: this.effectGraphics,
                    key: "alpha",
                    duration: this.details.lightning.fadeOut,
                    delay: this.details.lightning.duration,
                    start: 1,
                    end: 0,
                    transition: Transition.Linear
                });
            }
        }
    }

    update(ecs: World, deltaTime: DOMHighResTimeStamp): void {
        if (this.didUseTurn && this.particleEmitter !== null && this.particleEmitter.emit) {
            this.particleEmitter.update(deltaTime * .001);
        }

        if (this.didUseTurn && this.effectTween !== null) {
            this.effectTween.update(deltaTime);
        }
    }

    tearDown() {
        if (this.particleEmitter !== null) {
            this.particleEmitter.destroy();
        }
        if (this.effectGraphics !== null) {
            this.effectGraphics.destroy();
        }
    }
}

export class RotateReticleCommand implements Command {
    blocks: boolean = true;
    isSetUp: boolean = false;
    readonly entityId: string;

    constructor(entityId: string) {
        this.entityId = entityId;
    }

    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return true;
    }

    update(ecs: World): void {
        const entity = ecs.getEntity(this.entityId);
        if (entity === undefined) { return; }

        const inputHandlerState = entity.getOne(InputHandlingComponent);
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

/**
 * Have a speech bubble appear over an entity with some text
 */
export class ShowSpeechBubbleCommand implements Command {
    blocks: boolean = true;
    isSetUp: boolean = false;
    entityId: string;
    dialog: string;
    duration: number;
    private effectGraphics: Nullable<PIXI.Graphics> = null;
    private effectTween: Nullable<Tween> = null;

    constructor(entityId: string, dialog: string, duration: number = 1250) {
        this.entityId = entityId;
        this.dialog = dialog;
        this.duration = duration;
    }

    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return this.effectTween !== null ? this.effectTween.finished : true;
    }

    setUp(ecs: World): void {
        const entity = ecs.getEntity(this.entityId);
        if (entity === undefined) { return; }

        const tilePos = entity.getOne(PositionComponent)!.tilePosition;
        const screenPos = globals.Game!.gameCamera.tilePositionToScreen(tilePos);

        // Only show if we're on screen
        if (screenPos.x < globals.Game!.gameCamera.viewport.width &&
            screenPos.x >= 0 &&
            screenPos.y < globals.Game!.gameCamera.viewport.height &&
            screenPos.y >= 0) {
            this.effectGraphics = createSpeechBubbleTexture(
                screenPos.x, screenPos.y, this.dialog
            );
            globals.Game?.pixiApp.stage.addChild(this.effectGraphics);

            this.effectTween = new Tween({
                object: this.effectGraphics,
                key: "alpha",
                delay: this.duration,
                duration: 200,
                start: 1,
                end: 0,
                transition: Transition.Linear
            });
        }
    }

    update(ecs: World, deltaTime: DOMHighResTimeStamp): void {
        if (this.effectTween !== null) {
            this.effectTween.update(deltaTime);
        }
    }

    tearDown() {
        if (this.effectGraphics !== null) {
            this.effectGraphics.destroy();
        }
    }
}

/**
 * Let all allies in the entity team know where the player is
 */
export class AlertAlliesCommand implements Command {
    blocks: boolean = true;
    isSetUp: boolean = false;
    readonly entityId: string;

    constructor(entityId: string) {
        this.entityId = entityId;
    }

    usedTurn(): boolean {
        return true;
    }

    isFinished(): boolean {
        return true;
    }

    update(ecs: World): void {
        const entity = ecs.getEntity(this.entityId);
        if (entity === undefined) { return; }

        const ai = entity.getOne(PlannerAIComponent);
        if (ai !== undefined && ai.teamId !== null) {
            const team = globals.Game!.entityTeams.get(ai.teamId);
            if (team !== undefined) {
                team.alert();
            }
        }
    }
}

/**
 * Move the game camera to an entity then set the camera to follow
 * that entity
 */
export class MoveCameraCommand implements Command {
    blocks: boolean = true;
    isSetUp: boolean = false;
    map: GameMap;
    camera: Camera;
    duration: number;
    delay: number;
    entityId: string;
    private xTween: Nullable<Tween> = null;
    private yTween: Nullable<Tween> = null;
    readonly position: Vector2D;

    constructor(
        map: GameMap,
        camera: Camera,
        to: Entity,
        duration: Nullable<number> = null,
        delay = 200
    ) {
        this.map = map;
        this.camera = camera;
        this.camera.following = null;
        this.entityId = to.id;
        this.delay = delay;

        const pos = to.getOne(PositionComponent)!;
        this.position = camera.clamp(
            pos.worldPosition.x, pos.worldPosition.y, map.width, map.height
        );

        this.duration = duration ?? Math.min(
            Math.max(
                50,
                tileDistanceBetweenPoints(this.position, Vector2D.fromVector(camera)) * 3.5
            ),
            1500
        );
    }

    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        const finished = this.xTween !== null ? this.xTween.finished : true;

        if (finished) {
            this.camera.following = this.entityId;
        }

        return finished;
    }

    setUp() {
        this.xTween = new Tween({
            object: this.camera,
            key: "x",
            delay: this.delay,
            duration: this.duration,
            start: this.camera.x,
            end: this.position.x,
            transition: Transition.EaseOutSine
        });
        this.yTween = new Tween({
            object: this.camera,
            key: "y",
            delay: this.delay,
            duration: this.duration,
            start: this.camera.y,
            end: this.position.y,
            transition: Transition.EaseOutSine
        });
    }

    update(ecs: World, deltaTime: DOMHighResTimeStamp): void {
        if (this.xTween !== null && this.yTween !== null) {
            this.xTween.update(deltaTime);
            this.yTween.update(deltaTime);
        }
    }
}

/**
 * Useful for removing an entity after another command executes
 */
export class RemoveEntityCommand implements Command {
    entity: Entity;
    blocks: boolean = true;
    isSetUp: boolean = false;

    constructor(entity: Entity) {
        this.entity = entity;
    }

    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return true;
    }

    update(): void {
        removeEntity(globals.Game!.ecs, this.entity);
    }
}

export enum IndicatorStyle {
    Damage,
    Heal,
    Immune,
    Critical
}

export class ShowDamageIndicatorCommand implements Command {
    entityId: string;
    text: PIXI.Text;
    tweenY: Nullable<Tween>;
    worldPosition: Vector2D;
    blocks: boolean = true;
    isSetUp: boolean = false;

    static normalTextStyle = {
        fontFamily: "monospace",
        fontSize: 24,
        fill: 0xFFFFFF,
        stroke: 0x000000,
        strokeThickness: 2
    };
    static heathTextStyle = {
        fontFamily: "monospace",
        fontSize: 24,
        fill: 0x00FF00,
        stroke: 0x000000,
        strokeThickness: 2
    };
    static criticalTextStyle = {
        fontFamily: "monospace",
        fontSize: 24,
        fill: 0xFF0000,
        stroke: 0x000000,
        strokeThickness: 2
    };
    static immuneTextStyle = {
        fontFamily: "monospace",
        fontSize: 24,
        fill: 0x0000FF,
        stroke: 0x000000,
        strokeThickness: 2
    };

    constructor(
        entityId: string,
        value: number,
        type: IndicatorStyle
    ) {
        this.entityId = entityId;
        this.tweenY = null;

        this.text = new PIXI.Text(value.toString());
        this.text.zIndex = 20;
        switch (type) {
            case IndicatorStyle.Damage:
                this.text.style = ShowDamageIndicatorCommand.normalTextStyle;
                break;
            case IndicatorStyle.Critical:
                this.text.style = ShowDamageIndicatorCommand.criticalTextStyle;
                break;
            case IndicatorStyle.Immune:
                this.text.style = ShowDamageIndicatorCommand.immuneTextStyle;
                break;
            case IndicatorStyle.Heal:
                this.text.style = ShowDamageIndicatorCommand.heathTextStyle;
                break;
            default:
                assertUnreachable(type);
        }
    }

    setUp(ecs: World): void {
        const entity = ecs.getEntity(this.entityId);
        if (entity === undefined) { return; }

        const worldPos = entity.getOne(PositionComponent)!.worldPosition;
        const screenPos = globals.Game!.gameCamera.worldPositionToScreen(worldPos);

        // Only show if we're on screen
        if (screenPos.x < globals.Game!.gameCamera.viewport.width &&
            screenPos.x >= 0 &&
            screenPos.y < globals.Game!.gameCamera.viewport.height &&
            screenPos.y >= 0) {
            this.text.x = screenPos.x + (
                ((globals.Game!.gameCamera.tileSize * globals.Game!.gameCamera.zoom) / 2) -
                (this.text.width / 2)
            );
            this.text.y = screenPos.y - this.text.height - 5;

            this.tweenY = new Tween({
                object: this.text,
                key: "y",
                duration: 500,
                delay: 0,
                start: this.text.y,
                end: this.text.y - (this.text.height * 1.35),
                transition: Transition.EaseOutSine
            });

            globals.Game?.pixiApp.stage.addChild(this.text);
        }
    }

    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return this.tweenY !== null ? this.tweenY.finished : true;
    }

    update(ecs: World, deltaTime: DOMHighResTimeStamp): void {
        if (this.tweenY !== null) {
            this.tweenY.update(deltaTime);
        }
    }

    tearDown() {
        if (this.tweenY !== null) {
            globals.Game?.pixiApp.stage.removeChild(this.text);
        }
    }
}

export function zoomInCamera(): null {
    const g = globals.Game;
    if (g === null) { throw new Error("Global Game object is null"); }

    if (g.gameCamera.zoom !== 4) {
        g.gameCamera.zoom += 1;
    }

    return null;
}

export function zoomOutCamera(): null {
    const g = globals.Game;
    if (g === null) { throw new Error("Global Game object is null"); }

    if (g.gameCamera.zoom !== 1) {
        g.gameCamera.zoom -= 1;
    }

    return null;
}

export function moveCameraLeft(): null {
    globals.Game!.gameCamera.x -= 5;

    if (globals.Game!.gameCamera.x < 0) {
        globals.Game!.gameCamera.x = 0;
    }

    return null;
}

export function moveCameraRight(): null {
    globals.Game!.gameCamera.x += 5;

    const maxWidth = globals.Game!.map.width *
        globals.Game!.gameCamera.tileSize *
        globals.Game!.gameCamera.zoom;
    if (globals.Game!.gameCamera.x >= maxWidth) {
        globals.Game!.gameCamera.x = 0;
    }

    return null;
}

export function moveCameraUp(): null {
    globals.Game!.gameCamera.y -= 5;

    if (globals.Game!.gameCamera.y < 0) {
        globals.Game!.gameCamera.y = 0;
    }

    return null;
}

export function moveCameraDown(): null {
    globals.Game!.gameCamera.y += 5;

    const maxHeight = globals.Game!.map.height *
        globals.Game!.gameCamera.tileSize *
        globals.Game!.gameCamera.zoom;
    if (globals.Game!.gameCamera.y >= maxHeight) {
        globals.Game!.gameCamera.y = maxHeight;
    }

    return null;
}

export function cameraReset(): null {
    const player = globals.Game!.ecs.getEntity(PLAYER_ID);
    if (player === undefined) { throw new Error("Undefined player id"); }
    const playerPos = player.getOne(PositionComponent)!;
    const cameraPos = globals.Game!.gameCamera.clamp(
        playerPos.worldPosition.x,
        playerPos.worldPosition.y,
        globals.Game!.map.width,
        globals.Game!.map.height
    );
    globals.Game!.gameCamera.x = cameraPos.x;
    globals.Game!.gameCamera.y = cameraPos.y;

    return null;
}
