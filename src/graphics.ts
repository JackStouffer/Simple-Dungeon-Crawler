import { Entity, Query, System } from "ape-ecs";
import * as PIXI from "pixi.js";
import { GlowFilter } from "pixi-filters";
import * as particles from "pixi-particles";

import globals from "./globals";
import {
    ChestComponent,
    GraphicsComponent,
    InputHandlingComponent,
    InteractableTypeComponent,
    InventoryComponent,
    ParticleEmitterComponent,
    PositionComponent,
    SpeedComponent,
} from "./entity";
import input from "./input";
import { tileDistanceBetweenPoints, getEntitiesAtLocation, getHighestZIndexWithTile, Vector2D, isVisibleAndLit } from "./map";
import { PlayerState } from "./input-handler";
import { getPlayerMovementPath } from "./commands";
import { getEffectiveSpeedData } from "./fighter";
import { Area } from "./skills";
import { clampAngleToDIR, Nullable, randomIntFromInterval } from "./util";
import { TILE_SIZE } from "./constants";
import { DIRS } from "./rot";

/**
 * Draw all entities with a GraphicsComponent and a PositionComponent,
 * also takes into account entities with transparent background, correctly
 * drawing the right background color based on the objects on that tile.
 */
export class DrawSystem extends System {
    private graphicsQuery: Query;

    init() {
        this.graphicsQuery = this
            .createQuery()
            .fromAll(GraphicsComponent, PositionComponent)
            .not("input")
            .persist();
    }

    /**
     * Simply draws the character with the fore and background color at
     * x and y coordinates if the tile it's on is visible.
     */
    draw(entity: Entity, pos: PositionComponent, graphics: GraphicsComponent): void {
        if (globals.Game === null) { throw new Error("global Game object is null"); }

        if (pos.tilePosition.y >= globals.Game.map.height ||
            pos.tilePosition.x >= globals.Game.map.width) {
            throw new Error(`Object ${pos.entity.id} exists outside the game world`);
        }

        // assuming all tiles on the same position have the same visibility
        if (isVisibleAndLit(globals.Game.map, pos.tilePosition) &&
            graphics.sprite !== null) {
            graphics.sprite.visible = true;

            const { x, y } = globals.Game.gameCamera.worldPositionToScreen(pos.worldPosition);
            graphics.sprite.position.set(x, y);
            graphics.sprite.scale.set(globals.Game!.gameCamera.zoom, globals.Game!.gameCamera.zoom);
            graphics.sprite.alpha = graphics.opacity;
            graphics.sprite.zIndex = graphics.zIndex;
        } else if (graphics.sprite !== null) {
            graphics.sprite.visible = false;
        }
    }

    drawAfterSeen(pos: PositionComponent, graphics: GraphicsComponent): void {
        if (globals.Game === null) { throw new Error("global Game object is null"); }

        if (pos.tilePosition.y > globals.Game.map.height ||
            pos.tilePosition.x > globals.Game.map.width) {
            throw new Error(`Object ${pos.entity.id} exists outside the game world`);
        }

        if (globals.Game.map.visibilityData[pos.tilePosition.y][pos.tilePosition.x]!.explored &&
            graphics.sprite !== null) {
            graphics.sprite.visible = true;

            const { x, y } = globals.Game!.gameCamera.tilePositionToScreen(pos.tilePosition);
            graphics.sprite.position.set(x, y);
            graphics.sprite.scale.set(globals.Game!.gameCamera.zoom, globals.Game!.gameCamera.zoom);

            graphics.sprite.alpha = graphics.opacity;
            graphics.sprite.zIndex = graphics.zIndex;

            if (isVisibleAndLit(globals.Game.map, pos.tilePosition)) {
                graphics.sprite.tint = 0xFFFFFF;
            } else {
                graphics.sprite.tint = 0x999999;
            }
        } else if (graphics.sprite !== null) {
            graphics.sprite.visible = false;
        }
    }

    update() {
        if (globals.Game === null) { throw new Error("Global game is null"); }

        const entities = this.graphicsQuery.execute();
        for (const entity of entities) {
            const graphicData = entity.getOne(GraphicsComponent);
            const pos = entity.getOne(PositionComponent);

            if (graphicData === undefined || pos === undefined) {
                throw new Error(`missing data for draw system for ${entity.id}`);
            }

            if (entity.tags.has("drawAfterSeen") === true) {
                this.drawAfterSeen(pos, graphicData);
            } else {
                this.draw(entity, pos, graphicData);
            }
        }
    }
}

/**
 * Update chest's graphics by looking in the inventory and changing the sprite
 * if it's empty
 */
export class UpdateChestsSystem extends System {
    chestGraphics: Query;

    init() {
        this.chestGraphics = this
            .createQuery()
            .fromAll(GraphicsComponent, ChestComponent, InventoryComponent)
            .persist();
    }

    update() {
        const entities = this.chestGraphics.execute();
        for (const entity of entities) {
            const graphics = entity.getOne(GraphicsComponent);
            const chestData = entity.getOne(ChestComponent);

            if (graphics === undefined ||
                graphics.sprite === null ||
                chestData === undefined) { throw new Error("Missing graphics data on chest"); }

            const inventory = entity.getOne(InventoryComponent)!;
            if (inventory.inventory.size === 0) {
                graphics.sprite.texture = globals.Game!.textureAtlas[chestData.openTextureKey];
                const c = entity.getOne(InteractableTypeComponent);
                if (c !== undefined) { entity.removeComponent(c); }
            } else {
                graphics.sprite.texture = globals.Game!.textureAtlas[chestData.closedTextureKey];
            }
        }
    }
}

export function setUpParticleComponentEmitter(entity: Entity) {
    const particleData = entity.getOne(ParticleEmitterComponent);
    if (particleData === undefined) { return; }

    if (particleData.emitter === null) {
        const graphicsData = entity.getOne(GraphicsComponent)!;
        particleData.emitter = new particles.Emitter(
            graphicsData.sprite!,
            particleData.particleDefinition.particleImages.map(
                e => globals.Game!.textureAtlas[e]
            ),
            particleData.particleDefinition.particleConfig
        );
        particleData.emitter.emit = true;
        particleData.update();
    }
}

/**
 * Update and draw entity's particle components
 */
export class DrawParticlesSystem extends System {
    query: Query;

    init() {
        this.subscribe("ParticleEmitterComponent");
        this.query = this
            .createQuery()
            .fromAll(GraphicsComponent, ParticleEmitterComponent)
            .persist();
    }

    update() {
        const entities = this.query.execute();
        for (const e of entities) {
            const particleData = e.getOne(ParticleEmitterComponent)!;
            if (particleData.emitter === null) { continue; }
            particleData.emitter.update(globals.Game!.deltaTime * .001);
        }

        for (let i = 0; i < this.changes.length; i++) {
            const change = this.changes[i];
            const entity = this.world.getEntity(change.entity);
            if (entity === undefined) { continue; }

            switch (change.op) {
                case "add":
                    setUpParticleComponentEmitter(entity);
                    break;
                case "destroy":
                    break;
                case "change": {
                    const particleData = entity.getOne(ParticleEmitterComponent);
                    if (particleData === undefined) { continue; }
                    particleData.emitter?.destroy();
                    setUpParticleComponentEmitter(entity);
                    break;
                }
                case "addRef":
                case "deleteRef":
                    break;
                default:
                    throw new Error(`${change.entity}: Unknown change operation ${change.op}`);
            }
        }
    }
}

/**
 * Count down the number of turns left on the component
 */
export class UpdateParticlesSystem extends System {
    query: Query;

    init() {
        this.query = this
            .createQuery()
            .fromAll(ParticleEmitterComponent)
            .persist();
    }

    update() {
        const entities = this.query.execute();
        for (const e of entities) {
            const particleData = e.getOne(ParticleEmitterComponent)!;
            --particleData.turnsLeft;

            if (particleData.turnsLeft <= 0) {
                if (particleData.emitter !== null) {
                    particleData.emitter.destroy();
                }
                e.removeComponent(particleData);
            } else {
                particleData.update();
            }
        }
    }
}

/**
 * Get the x and y coords of a circle at cx, cy with the given radius
 * @param radius The circle radius
 * @param cx center x coord
 * @param cy center y coord
 * @returns Array of positions
 */
export function getCirclePositions(radius: number, cx: number, cy: number): Vector2D[] {
    const ret: Vector2D[] = [];
    for (let dx = -radius; dx < radius; dx++) {
        const height = Math.round(Math.sqrt(
            radius * radius - dx * dx
        ));

        for (let dy = -height; dy < height; dy++) {
            ret.push(new Vector2D(cx + dx, cy + dy ));
        }
    }
    return ret;
}

/**
 * Not really a ring, more of an empty rectangle because the square tile based movement
 * allows one to move diagonally, skipping the triggers on the two cardinal tiles
 */
export function getRingPositions(radius: number, cx: number, cy: number): Vector2D[] {
    const positions: Vector2D[] = [];

    for (let y = cy - radius; y < cy + radius + 1; y++) {
        for (let x = cx - radius; x < cx + radius + 1; x++) {
            if ((y === cy - radius || y === cy + radius) ||
                (x === cx - radius || x === cx + radius)) {
                positions.push(new Vector2D(x, y));
            }
        }
    }

    return positions;
}

/**
 * Returns a list of Points that represent the area being targeted by
 * the player.
 */
export function getTargetedArea(
    areaOfEffect: Nullable<Area>,
    origin: Nullable<Vector2D>,
    rotation: number
): Vector2D[] {
    const ret: Vector2D[] = [];

    if (origin === null) {
        return [];
    }

    if (areaOfEffect === null) {
        ret.push(new Vector2D(origin.x, origin.y));
        return ret;
    }

    if (areaOfEffect !== undefined) {
        if (areaOfEffect.type === "rectangle") {
            for (let dx = 0; dx < areaOfEffect.width!; dx++) {
                for (let dy = 0; dy < areaOfEffect.height!; dy++) {
                    switch (rotation) {
                        case 0:
                            ret.push(new Vector2D(
                                origin.x + dx,
                                (origin.y - Math.floor(areaOfEffect.height! / 2)) + dy
                            ));
                            break;
                        case 90:
                            ret.push(new Vector2D(
                                (origin.x - Math.floor(areaOfEffect.height! / 2)) + dy,
                                origin.y + dx
                            ));
                            break;
                        case 180:
                            ret.push(new Vector2D(
                                origin.x + dx,
                                (origin.y + Math.floor(areaOfEffect.height! / 2)) - dy
                            ));
                            break;
                        case 270:
                            ret.push(new Vector2D(
                                (origin.x + Math.floor(areaOfEffect.height! / 2)) - dy,
                                origin.y + dx
                            ));
                            break;
                        default: break;
                    }
                }
            }
        } else if (areaOfEffect.type === "circle") {
            return getCirclePositions(areaOfEffect.radius!, origin.x, origin.y);
        } else if (areaOfEffect.type === "ring") {
            return getRingPositions(areaOfEffect.radius!, origin.x, origin.y);
        }
    } else {
        ret.push(new Vector2D(origin.x, origin.y));
    }

    return ret;
}

// TODO, cleanup: A lot of this should actually be considered UI
// code, and therefore be moved to the ui file and have a dedicated
// object which allocates the UI elements
export class DrawPlayerSystem extends System {
    query: Query;
    perviousPath: PIXI.Sprite[];
    directionSprite: Nullable<PIXI.Sprite> = null;

    static pathFilter: GlowFilter = new GlowFilter({
        color: 0xFBFF00,
        innerStrength: 2,
        outerStrength: 0
    });
    static targetFilter: GlowFilter = new GlowFilter({
        color: 0xFF0000,
        innerStrength: 2,
        outerStrength: 0
    });
    static interactableFilter: GlowFilter = new GlowFilter({
        color: 0xFFFFFF,
        innerStrength: 0,
        outerStrength: 2.5
    });
    static dirSpriteMap: { [key: number]: string } = {
        0: "arrow_down",
        1: "arrow_down_left",
        2: "arrow_left",
        3: "arrow_up_left",
        4: "arrow_up",
        5: "arrow_up_right",
        6: "arrow_right",
        7: "arrow_down_right"
    };

    init() {
        this.query = this
            .createQuery()
            .fromAll(PositionComponent, SpeedComponent, GraphicsComponent, "input")
            .persist();
        this.perviousPath = [];
    }

    update() {
        if (globals.Game === null) { throw new Error("Global game is null"); }

        const entities = this.query.execute();
        for (const entity of entities) {
            const pos = entity.getOne(PositionComponent)!;
            const inputStateData = entity.getOne(InputHandlingComponent);
            const speedData = getEffectiveSpeedData(this.world, globals.Game!.entityMap, entity);
            const graphics = entity.getOne(GraphicsComponent);

            if (speedData === null ||
                inputStateData === undefined ||
                graphics === undefined ||
                graphics.sprite === null) {
                throw new Error("Player missing speed or input data");
            }

            if (isVisibleAndLit(globals.Game.map, pos.tilePosition)) {
                graphics.sprite.visible = true;

                const { x, y } = globals.Game!.gameCamera.worldPositionToScreen(pos.worldPosition);
                graphics.sprite.position.set(x, y);
                graphics.sprite.scale.set(
                    globals.Game!.gameCamera.zoom,
                    globals.Game!.gameCamera.zoom
                );
                graphics.sprite.alpha = graphics.opacity;
                graphics.sprite.zIndex = graphics.zIndex;

                // Remove effects from last path draw
                for (let i = 0; i < this.perviousPath.length; i++) {
                    const step = this.perviousPath[i];
                    if (step.texture === null) {
                        continue;
                    }

                    step.filters = [];
                }
                if (this.directionSprite !== null) {
                    this.directionSprite.visible = false;
                }

                if (inputStateData.state === PlayerState.Combat &&
                    globals.Game.currentActor === entity.id &&
                    globals.Game.commandQueue.length === 0 &&
                    globals.Game.isGameplayPaused === false) {
                    const mousePosition = input.getMousePosition();
                    if (mousePosition === null) { return; }
                    if (!globals.Game.map
                        .visibilityData[mousePosition.y][mousePosition.x].explored) {
                        return;
                    }

                    // Show a filter around an interactable
                    const entities = getEntitiesAtLocation(
                        this.world, globals.Game!.entityMap, mousePosition
                    ).filter((e: Entity) => e.has(InteractableTypeComponent));
                    if (entities.length > 0) {
                        const e = entities[0];
                        const graphicsData = e.getOne(GraphicsComponent);
                        if (graphicsData !== undefined && graphicsData.sprite !== null) {
                            this.perviousPath.push(graphicsData.sprite);
                            graphicsData.sprite.filters = [DrawPlayerSystem.interactableFilter];
                        }
                    // Or show the movement path
                    } else {
                        // quick distance check to cut down the number of
                        // AStar calcs
                        const max = speedData.maxTilesPerMove * 2;
                        if (tileDistanceBetweenPoints(pos.tilePosition, mousePosition) < max) {
                            const path = getPlayerMovementPath(
                                this.world,
                                globals.Game!.map,
                                globals.Game!.entityMap,
                                pos.tilePosition,
                                mousePosition,
                                speedData.maxTilesPerMove
                            );

                            if (path.length !== 0) {
                                outer: for (let j = 0; j < path.length; j++) {
                                    const step = path[j];

                                    // If there's an entity tile like water or mud, we want
                                    // to put the reticle on that instead of the tile beneath it
                                    const entities = getEntitiesAtLocation(
                                        this.world,
                                        globals.Game.entityMap,
                                        step
                                    );
                                    for (let i = 0; i < entities.length; i++) {
                                        if (entities[i].tags.has("environmentTile")) {
                                            const graphics = entities[i].getOne(GraphicsComponent);
                                            if (graphics !== undefined &&
                                                graphics.sprite !== null) {
                                                graphics.sprite.filters = [DrawPlayerSystem.pathFilter];
                                                this.perviousPath.push(graphics.sprite);
                                                continue outer;
                                            }
                                        }
                                    }

                                    const z = getHighestZIndexWithTile(globals.Game.map, step);
                                    const sprite = globals.Game
                                        .map
                                        .data[z][step.y][step.x]!
                                        .sprite;
                                    this.perviousPath.push(sprite);
                                    sprite.filters = [DrawPlayerSystem.pathFilter];
                                }
                            }
                        }
                    }
                } else if (inputStateData.state === PlayerState.Target &&
                    globals.Game.currentActor === entity.id &&
                    globals.Game.commandQueue.length === 0 &&
                    globals.Game.isGameplayPaused === false) {
                    const mousePosition = input.getMousePosition();
                    const entityPos = entity.getOne(PositionComponent)!.tilePosition;
                    const range = inputStateData.spellForTarget?.range ??
                        inputStateData.itemForTarget?.range ??
                        Infinity;

                    if (mousePosition !== null &&
                        tileDistanceBetweenPoints(mousePosition, entityPos) <= range) {
                        const data = inputStateData.spellForTarget ?? inputStateData.itemForTarget;
                        const targetArea = getTargetedArea(
                            data?.areaOfEffect ?? null,
                            mousePosition,
                            inputStateData.reticleRotation
                        );

                        outer: for (let i = 0; i < targetArea.length; i++) {
                            // If there's an entity tile like water or mud, we want
                            // to put the reticle on that instead of the tile beneath it
                            const entities = getEntitiesAtLocation(
                                this.world,
                                globals.Game.entityMap,
                                targetArea[i]
                            );
                            for (let i = 0; i < entities.length; i++) {
                                if (entities[i].tags.has("environmentTile")) {
                                    const graphics = entities[i].getOne(GraphicsComponent);
                                    if (graphics !== undefined && graphics.sprite !== null) {
                                        graphics.sprite.filters = [DrawPlayerSystem.targetFilter];
                                        this.perviousPath.push(graphics.sprite);
                                        continue outer;
                                    }
                                }
                            }

                            const z = getHighestZIndexWithTile(
                                globals.Game.map,
                                targetArea[i]
                            );

                            const visible = globals.Game
                                .map
                                .visibilityData[targetArea[i].y][targetArea[i].x].visible;

                            if (targetArea[i].x >= globals.Game.map.width ||
                                targetArea[i].y >= globals.Game.map.height ||
                                !visible) {
                                return;
                            }
                            const sprite = globals.Game
                                .map
                                .data[z][targetArea[i].y][targetArea[i].x]!
                                .sprite;
                            this.perviousPath.push(sprite);
                            sprite.filters = [DrawPlayerSystem.targetFilter];
                        }
                    }
                // Show the directional arrow next to the targeted entity based on the
                // mouse position
                } else if (inputStateData.state === PlayerState.TargetDirection &&
                    inputStateData.targetForDirection !== null &&
                    globals.Game.currentActor === entity.id &&
                    globals.Game.commandQueue.length === 0 &&
                    globals.Game.isGameplayPaused === false
                ) {
                    const mousePosition = input.getMousePosition();

                    if (mousePosition !== null) {
                        if (this.directionSprite === null) {
                            this.directionSprite = new PIXI.Sprite(globals.Game.textureAtlas["arrow_right"]);
                            this.directionSprite.zIndex = 10;
                            globals.Game!.pixiApp.stage.addChild(this.directionSprite);
                        }

                        this.directionSprite.visible = true;
                        this.directionSprite.scale.set(
                            globals.Game.gameCamera.zoom,
                            globals.Game.gameCamera.zoom
                        );
                        const mouseAngle = inputStateData.targetForDirection.direction(
                            mousePosition
                        );
                        const dir = clampAngleToDIR(mouseAngle);
                        this.directionSprite.texture = globals.Game.textureAtlas[
                            DrawPlayerSystem.dirSpriteMap[dir]
                        ];
                        const arrowTilePos = new Vector2D(
                            inputStateData.targetForDirection.x + DIRS[8][dir][0],
                            inputStateData.targetForDirection.y + DIRS[8][dir][1],
                        );
                        const screenPos = globals.Game.gameCamera.tilePositionToScreen(
                            arrowTilePos
                        );
                        this.directionSprite.x = screenPos.x;
                        this.directionSprite.y = screenPos.y;
                    }
                }
            } else {
                graphics.sprite.visible = false;
            }
        }
    }
}

/**
 * Lightning will be made up of several line segments starting at the
 * center of the top edge of the bitmap and ending at the target.
 *
 * The original code was licensed under the terms of the MIT License by
 * John Watson.
 *
 * @param {number} x place at this x coord
 * @param {number} y place at this y coord
 * @param {number} segments number of segments to the main branch
 * @param {number} boltWidth width of the bolt
 * @param {boolean} branch is this the main bolt
 * @param {number} distance distance to the target
 * @returns {PIXI.Graphics} the graphics object of the lightning
 */
export function createLightningTexture(
    x: number,
    y: number,
    segments: number,
    boltWidth: number,
    branch: boolean,
    distance: number
): PIXI.Graphics {
    let originX = 0;
    let originY = 0;
    const width = 200;
    const zoomedBoltWidth = boltWidth * (globals.Game?.gameCamera.zoom ?? 1);

    const lightningBitmap = new PIXI.Graphics();
    lightningBitmap.zIndex = 10;
    lightningBitmap.x = x + ((TILE_SIZE * globals.Game!.gameCamera.zoom) / 2);
    lightningBitmap.y = y + ((TILE_SIZE * globals.Game!.gameCamera.zoom) / 2);

    if (!branch) {
        lightningBitmap.clear();
    }

    for (let i = 0; i < segments; i++) {
        lightningBitmap.lineStyle(zoomedBoltWidth, 0xFFFFFF, 1);
        lightningBitmap.moveTo(originX, originY);

        originX += randomIntFromInterval(-30, 30);
        if (originX <= 10) {
            originX = 10;
        }

        if (originX >= width - 10) {
            originX = width - 10;
        }

        // Calculate a y offset from the end of the last line segment.
        // When we've reached the target or there are no more segments left,
        // set the y position to the distance to the target. For branches, we
        // don't care if they reach the target so don't set the last coordinate
        // to the target if it's hanging in the air.
        if (branch) {
            originY += randomIntFromInterval(10, 20);
        } else {
            originY += randomIntFromInterval(20, distance / segments);
        }

        if ((!branch && i === segments - 1) || originY > distance) {
            // terminate at target
            if (!branch) {
                originY = distance;
                originX = 0;
            }
        }

        lightningBitmap.lineTo(originX, originY);

        if (originY >= distance) {
            break;
        }

        if (!branch && Math.random() <= .3) {
            // Draws another, thinner, bolt starting from this position
            const child = createLightningTexture(
                originX,
                originY,
                randomIntFromInterval(3, 10),
                1,
                true,
                randomIntFromInterval(Math.floor(distance / 2), Math.floor(distance))
            );
            child.x = originX;
            child.y = originY;
            lightningBitmap.addChild(child);
        }
    }

    if (!branch) {
        lightningBitmap.filters = [new GlowFilter({
            color: 0xFFFFFF,
            innerStrength: 0,
            outerStrength: 2
        })];
    }

    return lightningBitmap;
}

/**
 * Create a speech bubble graphics object with given speech.
 *
 * @param x screen X coord
 * @param y screen Y coord
 * @param text Text in the speech bubble
 * @returns {PIXI.Graphics} the speech bubble graphic
 */
export function createSpeechBubbleTexture(x: number, y: number, text: string) {
    const graphics = new PIXI.Graphics();
    let padding = 25;
    graphics.zIndex = 10;
    graphics.zIndex = 10;

    const speech = new PIXI.Text(text, { fontFamily: "serif", fontSize: 16, fill: 0x00000 });
    // TODO, cleanup: This is a hardcode-ed special case
    if (text === "!?") {
        speech.style.fontSize = 24;
        padding = 30;
    }

    const rectWidth = speech.width + padding;
    const rectHeight = speech.height + padding;
    const halfTileSize = ((TILE_SIZE * globals.Game!.gameCamera.zoom) / 2);

    graphics.x = x - (rectWidth / 2) + halfTileSize;
    graphics.y = y - rectHeight - halfTileSize;
    speech.x += padding / 2;
    speech.y += padding / 2;

    graphics.clear();
    graphics.beginFill(0xffffff, 1);
    graphics.drawRoundedRect(
        0,
        0,
        rectWidth,
        rectHeight,
        5
    );

    graphics.drawPolygon([
        new PIXI.Point((rectWidth / 2) - halfTileSize, rectHeight),
        new PIXI.Point((rectWidth / 2) + halfTileSize, rectHeight),
        new PIXI.Point((rectWidth / 2), rectHeight + halfTileSize)
    ]);

    graphics.addChild(speech);

    return graphics;
}

export function removeExistingParticleEffects(entity: Entity): void {
    if (entity.has(ParticleEmitterComponent)) {
        const particleDatas = entity.getComponents(ParticleEmitterComponent);
        for (const particleData of particleDatas) {
            // Set existing particle effects to zero turns so they're destroyed
            // properly
            particleData.turnsLeft = 0;
            particleData.update();
        }
    }
}
