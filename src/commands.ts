import { Entity, World } from "ape-ecs";
import * as PIXI from "pixi.js";
import * as particles from "pixi-particles";

import Path from "./rot/path/index";
import { WeightCallback, PassableCallback } from "./rot/path/path";

import globals from "./globals";
import {
    DamageType,
    GameState,
    InteractableType,
    ItemType,
    SpellType,
    TriggerType,
} from "./constants";
import {
    GameMap,
    isBlocked,
    tileDistanceBetweenPoints,
    Point,
    getEntitiesAtLocation,
    getHighestZIndexWithTile,
    worldDistanceBetweenPoints,
    getRandomFighterWithinRange
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
    PlannerAIComponent,
    PositionComponent,
    SpellsComponent,
    StatsComponent,
    TriggerTypeComponent
} from "./entity";
import { attack, getEffectiveSpeedData, getKnownSpells, takeDamage } from "./fighter";
import { getItems } from "./inventory";
import { deepWaterTrigger, eventTrigger, fireTrigger, mudTrigger, shallowWaterTrigger, steamTrigger } from "./trigger";
import { giveItemsInteract, giveSpellsInteract, doorInteract, levelLoadInteract } from "./interactable";
import { setOnFire, setParalyzed, SpellDataDetails, ItemDataDetails } from "./skills";
import { DIRS } from "./rot";
import { playOpenInventory, playOpenSpells } from "./audio";
import { createLightningTexture, createSpeechBubbleTexture } from "./graphics";
import { Transition, Tween } from "./tween";
import { Camera } from "./camera";

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

/**
 * Passable callback for water based entities which cannot go on land
 */
export function createWaterBasedPassableCallback(origin: Point): PassableCallback {
    return function(x: number, y: number) {
        if (globals.Game === null) { throw new Error("Global game object is null"); }

        // own space is passable
        if (origin.x === x && origin.y === y) {
            return true;
        }
        const { blocks, entity } = isBlocked(globals.Game.map, globals.Game.entityMap, x, y);

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
                        case TriggerType.Steam:
                            weight += 20;
                            break;
                        case TriggerType.Event:
                            break;
                        case TriggerType.Ice:
                            weight += 7;
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
            globals.Game.map.data[0][y][x]!.pathfindingCost = weight.toString(10);
        }

        return weight;
    };
}

/**
 * Simplified distance heuristic use for drawing the movement path
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
 * TODO, SPEED: Perhaps pre-allocate common commands to be reused
 */
export interface Command {
    usedTurn: () => boolean;
    isFinished: () => boolean;
    setUp?: () => void;
    tearDown?: () => void;
    update: (dt: DOMHighResTimeStamp) => void;
}

export function getPlayerMovementPath(
    origin: Point,
    destination: Point,
    maxTilesPerMove: number,
    map: GameMap,
    entityMap: EntityMap
): [number, number][] {
    // quick distance check to cut down the number of
    // AStar calcs
    if (tileDistanceBetweenPoints(destination, origin) < maxTilesPerMove * 2) {
        const aStar = new Path.AStar(
            destination.x,
            destination.y,
            createPassableCallback(origin),
            generatePlayerWeightCallback(origin),
            { topology: 8 }
        );

        if (destination.y >= map.height || destination.x >= map.width) {
            return [];
        }

        if (isBlocked(map, entityMap, destination.x, destination.y).blocks === true) {
            return [];
        }

        const path: [number, number][] = [];
        function pathCallback(x: number, y: number) {
            path.push([x, y]);
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

    update(): void {
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

    update(deltaTime: DOMHighResTimeStamp): void {
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
        const startDistance = tileDistanceBetweenPoints(
            globals.Game!.gameCamera.tilePositionToWorld(tilePos.x, tilePos.y),
            globals.Game!.gameCamera.tilePositionToWorld(destination[0], destination[1])
        );

        const dir: [number, number] = [ destination[0] - tilePos.x, destination[1] - tilePos.y ];

        pos.x += dir[0] * speed * deltaTime;
        pos.y += dir[1] * speed * deltaTime;
        pos.update();

        const distance = tileDistanceBetweenPoints(
            globals.Game!.gameCamera.tilePositionToWorld(tilePos.x, tilePos.y),
            pos
        );

        // we're done animating one tile movement, update the position and
        // do the movement logic
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
            const entities = globals.Game!.entityMap.get(`${destination[0]},${destination[1]}`) ?? [];
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
                        case TriggerType.Steam:
                            steamTrigger(this.entity);
                            break;
                        case TriggerType.Ice: {
                            const vecX = destination[0] - tilePos.x;
                            const vecY = destination[1] - tilePos.y;
                            // TODO: pushing directly onto the command queue sort of sucks
                            globals.Game!.commandQueue.push(
                                new GoToLocationCommand(
                                    this.entity,
                                    [[destination[0] + vecX, destination[1] + vecY]]
                                )
                            );
                            this.done = true;
                            return;
                        }
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

    update(deltaTime: DOMHighResTimeStamp): void {
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
                // TODO: pushing directly onto the command queue sort of sucks
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
        const startDistance = tileDistanceBetweenPoints(
            globals.Game!.gameCamera.tilePositionToWorld(tilePos.x, tilePos.y),
            globals.Game!.gameCamera.tilePositionToWorld(destinationX, destinationY)
        );

        pos.x += step[0] * speed * deltaTime;
        pos.y += step[1] * speed * deltaTime;
        pos.update();

        const distance = tileDistanceBetweenPoints(
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
            const entities = globals.Game!.entityMap.get(`${destinationX},${destinationY}`) ?? [];
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
                        case TriggerType.Steam:
                            steamTrigger(this.entity);
                            break;
                        case TriggerType.Ice:
                            this.numTiles++;
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

    update(): void {
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

    update(): void {
        const g = globals.Game;
        if (g === null) { throw new Error("Global Game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        playOpenInventory();
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

    update(): void {
        const g = globals.Game;
        if (g === null) { throw new Error("Global Game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter is null"); }

        playOpenSpells();
        g.state = GameState.SpellMenu;
        const spellsData = g.player.getOne(SpellsComponent)!;
        g.spellSelectionMenu.open(getKnownSpells(spellsData));
    }
}

type SkillCallback = (e: Entity, id: string) => void;

/**
 * Create a command function to call a skill function at the specified
 * point. Calls the callback if the skill was cast.
 */
export class UseSkillCommand implements Command {
    private didUseTurn: boolean = false;
    private readonly entity: Entity;
    private readonly rotation: number | undefined;
    private readonly details: SpellDataDetails | ItemDataDetails;
    private target: Point | undefined;
    private particleEmitter: Nullable<particles.Emitter> = null;
    private effectGraphics: Nullable<PIXI.Graphics> = null;
    private effectTween: Nullable<Tween> = null;
    private readonly skillCallback: SkillCallback | undefined;

    constructor(
        entity: Entity,
        details: SpellDataDetails | ItemDataDetails,
        target?: Point,
        rotation?: number,
        cb?: SkillCallback
    ) {
        this.entity = entity;
        this.target = target;
        this.rotation = rotation;
        this.details = details;
        this.skillCallback = cb;
    }

    usedTurn(): boolean {
        return this.didUseTurn;
    }

    isFinished(): boolean {
        globals.gameEventEmitter!.emit("tutorial.spellCasts");

        if (this.particleEmitter !== null) {
            return !this.particleEmitter.emit;
        }

        if (this.effectTween !== null) {
            return this.effectTween.finished;
        }

        return true;
    }

    setUp() {
        // Wild spell target selection
        if (this.details.type === SpellType.WildDamage ||
            this.details.type === ItemType.WildDamageScroll) {
            const targetedEntity = getRandomFighterWithinRange(
                globals.Game!.ecs,
                globals.Game!.map,
                this.entity.getOne(PositionComponent)!.tilePosition(),
                16
            );

            if (targetedEntity === null) {
                if (this.entity.id === "player") {
                    displayMessage("No target is close enough to use the scroll");
                }

                this.didUseTurn = false;
                return;
            }

            this.target = targetedEntity.getOne(PositionComponent)!.tilePosition();
        }

        this.didUseTurn = this.details.useFunc(
            this.details,
            this.entity,
            globals.Game!.ecs,
            globals.Game!.map,
            globals.Game!.entityMap,
            this.target,
            this.rotation
        );

        if (this.didUseTurn) {
            if (this.skillCallback !== undefined) {
                this.skillCallback(this.entity, this.details.id);
            }

            if (this.details.effect === "particles" &&
                this.details.particles !== undefined) {
                let sprite: PIXI.Sprite | undefined;

                if (this.details.particles.particleLocation === "target" && this.target !== undefined) {
                    // We need to put the emitter at the location. For some reason
                    // the API requires a container at the location rather than the
                    // location. So get either the entity sprite there or the highest
                    // tile sprite.
                    const entity = getEntitiesAtLocation(
                        globals.Game!.entityMap,
                        this.target.x,
                        this.target.y
                    )[0];

                    if (entity !== undefined) {
                        sprite = entity.getOne(GraphicsComponent)?.sprite ?? undefined;
                    }

                    // Fallback
                    let z = getHighestZIndexWithTile(
                        globals.Game!.map, this.target.x, this.target.y
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
                    sprite = this.entity.getOne(GraphicsComponent)?.sprite ?? undefined;
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
                const tilePos = this.entity.getOne(PositionComponent)!.tilePosition();
                const screenPos = globals.Game!.gameCamera.tilePositionToScreen(
                    tilePos.x,
                    tilePos.y
                );
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

    update(deltaTime: DOMHighResTimeStamp): void {
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

    update(): void {
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

/**
 * Have a speech bubble appear over an entity with some text
 */
export class ShowSpeechBubbleCommand implements Command {
    entity: Entity;
    dialog: string;
    duration: number;
    private effectGraphics: Nullable<PIXI.Graphics> = null;
    private effectTween: Nullable<Tween> = null;

    constructor(entity: Entity, dialog: string, duration: number = 1000) {
        this.entity = entity;
        this.dialog = dialog;
        this.duration = duration;
    }

    usedTurn(): boolean {
        return false;
    }

    isFinished(): boolean {
        return this.effectTween !== null ? this.effectTween.finished : true;
    }

    setUp(): void {
        const tilePos = this.entity.getOne(PositionComponent)!.tilePosition();
        const screenPos = globals.Game!.gameCamera.tilePositionToScreen(
            tilePos.x,
            tilePos.y
        );

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

    update(deltaTime: DOMHighResTimeStamp): void {
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
    private readonly entity: Entity;

    constructor(entity: Entity) {
        this.entity = entity;
    }

    usedTurn(): boolean {
        return true;
    }

    isFinished(): boolean {
        return true;
    }

    update(): void {
        const ai = this.entity.getOne(PlannerAIComponent);
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
    map: GameMap;
    camera: Camera;
    to: Entity;
    duration: number;
    private xTween: Nullable<Tween> = null;
    private yTween: Nullable<Tween> = null;
    private readonly position: Point;

    constructor(map: GameMap, camera: Camera, to: Entity, duration: Nullable<number> = null) {
        this.map = map;
        this.camera = camera;
        this.camera.following = null;

        this.to = to;
        const positionComp = this.to.getOne(PositionComponent)!;
        this.position = camera.clamp(positionComp.x, positionComp.y, map.width, map.height);

        this.duration = duration ?? Math.min(
            Math.max(
                50,
                tileDistanceBetweenPoints(this.position, camera) * 3.5
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
            this.camera.following = this.to;
        }

        return finished;
    }

    setUp() {
        this.xTween = new Tween({
            object: this.camera,
            key: "x",
            delay: 200,
            duration: this.duration,
            start: this.camera.x,
            end: this.position.x,
            transition: Transition.Linear
        });
        this.yTween = new Tween({
            object: this.camera,
            key: "y",
            delay: 200,
            duration: this.duration,
            start: this.camera.y,
            end: this.position.y,
            transition: Transition.Linear
        });
    }

    update(deltaTime: DOMHighResTimeStamp): void {
        if (this.xTween !== null && this.yTween !== null) {
            this.xTween.update(deltaTime);
            this.yTween.update(deltaTime);
        }
    }
}
