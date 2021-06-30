import { Entity, Query, System } from "ape-ecs";
import * as PIXI from "pixi.js";
import { GlowFilter } from "pixi-filters";

import {
    ChestGraphicsComponent,
    FlammableComponent,
    GraphicsComponent,
    InputHandlingComponent,
    InventoryComponent,
    PositionComponent,
    WetableComponent
} from "./entity";
import input from "./input";
import { tileDistanceBetweenPoints, getEntitiesAtLocation, getHighestZIndexWithTile, Vector2D, isVisibleAndLit } from "./map";
import { PlayerState } from "./input-handler";
import { getPlayerMovementPath } from "./commands";
import { getItems } from "./inventory";
import globals from "./globals";
import { getEffectiveSpeedData } from "./fighter";
import { ItemDataDetails, SpellDataDetails } from "./skills";
import { Nullable, randomIntFromInterval } from "./util";
import { TILE_SIZE } from "./constants";

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
        const tilePos = pos.tilePosition();

        if (tilePos.y > globals.Game.map.height || tilePos.x > globals.Game.map.width) {
            throw new Error(`Object ${pos.entity.id} exists outside the game world`);
        }

        // assuming all tiles on the same position have the same visibility
        if (isVisibleAndLit(globals.Game.map, tilePos.x, tilePos.y) &&
            graphics.sprite !== null) {
            graphics.sprite.visible = true;

            const { x, y } = globals.Game.gameCamera.worldPositionToScreen(pos.x, pos.y);
            graphics.sprite.position.set(x, y);
            graphics.sprite.scale.set(globals.Game!.gameCamera.zoom, globals.Game!.gameCamera.zoom);

            const flameData = entity.getOne(FlammableComponent);
            const wetData = entity.getOne(WetableComponent);

            if (flameData !== undefined && flameData.onFire === true) {
                graphics.sprite.tint = 0xFF0000;
            } else if (wetData !== undefined && wetData.wet === true) {
                graphics.sprite.tint = 0x0000FF;
            } else {
                graphics.sprite.tint = 0xFFFFFF;
            }

            graphics.sprite.alpha = graphics.opacity;
            graphics.sprite.zIndex = graphics.zIndex;
        } else if (graphics.sprite !== null) {
            graphics.sprite.visible = false;
        }
    }

    drawAfterSeen(pos: PositionComponent, graphics: GraphicsComponent): void {
        if (globals.Game === null) { throw new Error("global Game object is null"); }
        const tilePos = pos.tilePosition();

        if (tilePos.y > globals.Game.map.height || tilePos.x > globals.Game.map.width) {
            throw new Error(`Object ${pos.entity.id} exists outside the game world`);
        }

        if (globals.Game.map.visibilityData[tilePos.y][tilePos.x]!.explored &&
            graphics.sprite !== null) {
            graphics.sprite.visible = true;

            const { x, y } = globals.Game!.gameCamera.tilePositionToScreen(tilePos.x, tilePos.y);
            graphics.sprite.position.set(x, y);
            graphics.sprite.scale.set(globals.Game!.gameCamera.zoom, globals.Game!.gameCamera.zoom);

            graphics.sprite.alpha = graphics.opacity;
            graphics.sprite.zIndex = graphics.zIndex;

            if (isVisibleAndLit(globals.Game.map, tilePos.x, tilePos.y)) {
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
 * Draw all chests which have a ChestGraphicsComponent, a PositionComponent,
 * and an InventoryComponent. Looks in the inventory and changes the sprite
 * if it's empty.
 */
export class DrawChestsSystem extends System {
    private chestGraphics: Query;

    init() {
        this.chestGraphics = this
            .createQuery()
            .fromAll(ChestGraphicsComponent, PositionComponent, InventoryComponent)
            .persist();
    }

    update() {
        if (globals.Game === null) { throw new Error("Global game is null"); }

        const entities = this.chestGraphics.execute();
        for (const entity of entities) {
            const pos = entity.getOne(PositionComponent)!;
            const tilePos = pos.tilePosition();
            const graphics = entity.getOne(ChestGraphicsComponent);

            if (graphics === undefined || graphics.sprite === null) { throw new Error("Missing graphics data on chest"); }

            if (globals.Game.map.visibilityData[tilePos.y][tilePos.x].explored) {
                const inventory = entity.getOne(InventoryComponent)!;

                graphics.sprite.visible = true;

                if (getItems(inventory).length === 0) {
                    graphics.sprite.texture = globals.Game.textureAtlas[graphics.openTextureKey];
                }

                const { x, y } = globals.Game.gameCamera.tilePositionToScreen(tilePos.x, tilePos.y);
                graphics.sprite.position.set(x, y);
                graphics.sprite.scale.set(
                    globals.Game!.gameCamera.zoom,
                    globals.Game!.gameCamera.zoom
                );
                graphics.sprite.alpha = graphics.opacity;
                graphics.sprite.zIndex = graphics.zIndex;
            } else {
                graphics.sprite.visible = false;
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
 * Returns a list of Points that represent the area being targeted by
 * the player.
 */
export function getTargetingReticle(
    data: ItemDataDetails | SpellDataDetails | null,
    pos: Nullable<Vector2D>,
    rotation: number
): Vector2D[] {
    const ret: Vector2D[] = [];

    if (pos === null) {
        return [];
    }

    if (data === null) {
        ret.push(new Vector2D(pos.x, pos.y));
        return ret;
    }

    if (data.areaOfEffect !== undefined) {
        if (data.areaOfEffect.type === "rectangle") {
            for (let dx = 0; dx < data.areaOfEffect.width!; dx++) {
                for (let dy = 0; dy < data.areaOfEffect.height!; dy++) {
                    switch (rotation) {
                        case 0:
                            ret.push(new Vector2D(
                                pos.x + dx,
                                (pos.y - Math.floor(data.areaOfEffect.height! / 2)) + dy
                            ));
                            break;
                        case 90:
                            ret.push(new Vector2D(
                                (pos.x - Math.floor(data.areaOfEffect.height! / 2)) + dy,
                                pos.y + dx
                            ));
                            break;
                        case 180:
                            ret.push(new Vector2D(
                                pos.x + dx,
                                (pos.y + Math.floor(data.areaOfEffect.height! / 2)) - dy
                            ));
                            break;
                        case 270:
                            ret.push(new Vector2D(
                                (pos.x + Math.floor(data.areaOfEffect.height! / 2)) - dy,
                                pos.y + dx
                            ));
                            break;
                        default: break;
                    }
                }
            }
        } else if (data.areaOfEffect.type === "circle") {
            return getCirclePositions(data.areaOfEffect.radius!, pos.x, pos.y);
        }
    } else {
        ret.push(new Vector2D(pos.x, pos.y));
    }

    return ret;
}

export class DrawPlayerSystem extends System {
    private query: Query;
    private pathFilter: GlowFilter;
    private targetFilter: GlowFilter;
    private perviousPath: PIXI.Sprite[];

    init() {
        this.query = this
            .createQuery()
            .fromAll(PositionComponent, InventoryComponent, "input")
            .persist();
        this.pathFilter = new GlowFilter({
            color: 0xFBFF00,
            innerStrength: 2,
            outerStrength: 0
        });
        this.targetFilter = new GlowFilter({
            color: 0xFF0000,
            innerStrength: 2,
            outerStrength: 0
        });
        this.perviousPath = [];
    }

    update() {
        if (globals.Game === null) { throw new Error("Global game is null"); }

        const entities = this.query.execute();
        for (const entity of entities) {
            const pos = entity.getOne(PositionComponent)!;
            const tilePosition = pos.tilePosition();
            const inputStateData = entity.getOne(InputHandlingComponent);
            const speedData = getEffectiveSpeedData(globals.Game!.entityMap, entity);
            const graphics = entity.getOne(GraphicsComponent);

            if (speedData === null ||
                inputStateData === undefined ||
                graphics === undefined ||
                graphics.sprite === null) {
                throw new Error("Player missing speed or input data");
            }

            if (isVisibleAndLit(globals.Game.map, tilePosition.x, tilePosition.y)) {
                graphics.sprite.visible = true;

                const { x, y } = globals.Game!.gameCamera.worldPositionToScreen(pos.x, pos.y);
                graphics.sprite.position.set(x, y);
                graphics.sprite.scale.set(
                    globals.Game!.gameCamera.zoom,
                    globals.Game!.gameCamera.zoom
                );

                const flameData = entity.getOne(FlammableComponent);
                const wetData = entity.getOne(WetableComponent);

                if (flameData !== undefined && flameData.onFire === true) {
                    graphics.sprite.tint = 0xFF0000;
                } else if (wetData !== undefined && wetData.wet === true) {
                    graphics.sprite.tint = 0x0000FF;
                } else {
                    graphics.sprite.tint = 0xFFFFFF;
                }

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

                if (inputStateData.state === PlayerState.Combat &&
                    globals.Game.currentActor === entity &&
                    globals.Game.commandQueue.length === 0) {
                    const mousePosition = input.getMousePosition();
                    if (mousePosition === null) { return; }
                    if (!globals.Game.map
                        .visibilityData[mousePosition.y][mousePosition.x].explored) {
                        return;
                    }

                    // quick distance check to cut down the number of
                    // AStar calcs
                    const max = speedData.maxTilesPerMove * 2;
                    if (tileDistanceBetweenPoints(pos.tilePosition(), mousePosition) < max) {
                        const path = getPlayerMovementPath(
                            pos.tilePosition(),
                            mousePosition,
                            speedData.maxTilesPerMove,
                            globals.Game!.map,
                            globals.Game!.entityMap
                        );
                        if (path.length === 0) { return; }

                        outer: for (let j = 0; j < path.length; j++) {
                            const step = path[j];

                            // If there's an entity tile like water or mud, we want
                            // to put the reticle on that instead of the tile beneath it
                            const entities = getEntitiesAtLocation(
                                globals.Game.entityMap,
                                step[0],
                                step[1]
                            );
                            for (let i = 0; i < entities.length; i++) {
                                if (entities[i].tags.has("environmentTile")) {
                                    const graphics = entities[i].getOne(GraphicsComponent);
                                    if (graphics !== undefined && graphics.sprite !== null) {
                                        graphics.sprite.filters = [this.pathFilter];
                                        this.perviousPath.push(graphics.sprite);
                                        continue outer;
                                    }
                                }
                            }

                            const z = getHighestZIndexWithTile(globals.Game.map, step[0], step[1]);
                            const sprite = globals.Game
                                .map
                                .data[z][step[1]][step[0]]!
                                .sprite;
                            this.perviousPath.push(sprite);
                            sprite.filters = [this.pathFilter];
                        }
                    }
                } else if (inputStateData.state === PlayerState.Target &&
                    globals.Game.currentActor === entity &&
                    globals.Game.commandQueue.length === 0) {
                    const mousePosition = input.getMousePosition();
                    const entityPos = entity.getOne(PositionComponent)!.tilePosition();
                    const range = inputStateData.spellForTarget?.range ??
                        inputStateData.itemForTarget?.range ??
                        Infinity;

                    if (mousePosition !== null &&
                        tileDistanceBetweenPoints(mousePosition, entityPos) <= range) {
                        const targetArea = getTargetingReticle(
                            inputStateData.spellForTarget ?? inputStateData.itemForTarget,
                            mousePosition,
                            inputStateData.reticleRotation
                        );

                        outer: for (let i = 0; i < targetArea.length; i++) {
                            // If there's an entity tile like water or mud, we want
                            // to put the reticle on that instead of the tile beneath it
                            const entities = getEntitiesAtLocation(
                                globals.Game.entityMap,
                                targetArea[i].x,
                                targetArea[i].y
                            );
                            for (let i = 0; i < entities.length; i++) {
                                if (entities[i].tags.has("environmentTile")) {
                                    const graphics = entities[i].getOne(GraphicsComponent);
                                    if (graphics !== undefined && graphics.sprite !== null) {
                                        graphics.sprite.filters = [this.targetFilter];
                                        this.perviousPath.push(graphics.sprite);
                                        continue outer;
                                    }
                                }
                            }

                            const z = getHighestZIndexWithTile(
                                globals.Game.map,
                                targetArea[i].x,
                                targetArea[i].y
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
                            sprite.filters = [this.targetFilter];
                        }
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
    const padding = 20;
    graphics.zIndex = 10;
    graphics.zIndex = 10;

    const speech = new PIXI.Text(text, { fontFamily : "monospace", fontSize: 12, fill : 0x000000 });
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
