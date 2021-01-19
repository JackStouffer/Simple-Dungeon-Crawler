import { Entity, Query, System } from "ape-ecs";
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
import { distanceBetweenPoints, getHighestZIndexWithTile, Point } from "./map";
import { PlayerState } from "./input-handler";
import { getPlayerMovementPath } from "./commands";
import { getItems } from "./inventory";
import globals from "./globals";
import { getEffectiveSpeedData } from "./fighter";
import { ItemDataDetails, SpellDataDetails } from "./skills";
import { Nullable } from "./util";

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

        // assuming all tiles on the same position have the same visibility
        if (globals.Game.map[0][pos.y][pos.x]!.isVisibleAndLit() && graphics.sprite !== null) {
            graphics.sprite.visible = true;

            const { x, y } = globals.Game!.gameCamera.tilePositionToScreen(pos.x, pos.y);
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
        } else if (graphics.sprite !== null) {
            graphics.sprite.visible = false;
        }
    }

    drawAfterSeen(pos: PositionComponent, graphics: GraphicsComponent): void {
        if (globals.Game === null) { throw new Error("global Game object is null"); }

        if (globals.Game.map[0][pos.y][pos.x]!.explored && graphics.sprite !== null) {
            graphics.sprite.visible = true;

            const { x, y } = globals.Game!.gameCamera.tilePositionToScreen(pos.x, pos.y);
            graphics.sprite.position.set(x, y);
            graphics.sprite.scale.set(globals.Game!.gameCamera.zoom, globals.Game!.gameCamera.zoom);
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
 * and an InventoryComponent. Looks in the inventory and changes the background
 * color if it's empty.
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
            const graphics = entity.getOne(ChestGraphicsComponent);

            if (graphics === undefined || graphics.sprite === null) { throw new Error("Missing graphics data on chest"); }

            if (globals.Game.map[0][pos.y][pos.x]!.explored) {
                const inventory = entity.getOne(InventoryComponent)!;

                graphics.sprite.visible = false;

                if (getItems(inventory).length > 0) {
                    graphics.sprite.tint = 0xFFFFFF;
                } else {
                    graphics.sprite.tint = 0xFF00FF;
                }

                const { x, y } = globals.Game.gameCamera.tilePositionToScreen(pos.x, pos.y);
                graphics.sprite.position.set(x, y);
                graphics.sprite.scale.set(
                    globals.Game!.gameCamera.zoom,
                    globals.Game!.gameCamera.zoom
                );
            } else {
                graphics.sprite.visible = false;
            }
        }
    }
}

/**
 * Returns a list of Points that represent the area being targeted by
 * the player.
 */
export function getTargetingReticle(
    data: ItemDataDetails | SpellDataDetails | null,
    pos: Nullable<Point>,
    rotation: number
): [number, number][] {
    const ret: [number, number][] = [];

    if (pos === null) {
        return [];
    }

    if (data === null) {
        ret.push([ pos.x, pos.y ]);
        return ret;
    }

    if (data.areaOfEffect !== undefined) {
        if (data.areaOfEffect.type === "rectangle") {
            for (let dx = 0; dx < data.areaOfEffect.width!; dx++) {
                for (let dy = 0; dy < data.areaOfEffect.height!; dy++) {
                    switch (rotation) {
                        case 0:
                            ret.push([
                                pos.x + dx,
                                (pos.y - Math.floor(data.areaOfEffect.height! / 2)) + dy
                            ]);
                            break;
                        case 90:
                            ret.push([
                                (pos.x - Math.floor(data.areaOfEffect.height! / 2)) + dy,
                                pos.y + dx
                            ]);
                            break;
                        case 180:
                            ret.push([
                                pos.x + dx,
                                (pos.y + Math.floor(data.areaOfEffect.height! / 2)) - dy
                            ]);
                            break;
                        case 270:
                            ret.push([
                                (pos.x + Math.floor(data.areaOfEffect.height! / 2)) - dy,
                                pos.y + dx
                            ]);
                            break;
                        default: break;
                    }
                }
            }
        } else if (data.areaOfEffect.type === "circle") {
            for (let dx = -data.areaOfEffect.radius!; dx < data.areaOfEffect.radius!; dx++) {
                const height = Math.round(Math.sqrt(
                    data.areaOfEffect.radius! * data.areaOfEffect.radius! - dx * dx
                ));

                for (let dy = -height; dy < height; dy++) {
                    ret.push([ pos.x + dx, pos.y + dy ]);
                }
            }
        }
    } else {
        ret.push([ pos.x, pos.y ]);
    }

    return ret;
}

export class DrawPlayerSystem extends System {
    private query: Query;
    private pathFilter: GlowFilter;
    private targetFilter: GlowFilter;
    private perviousPath: [number, number][];

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
            const inputStateData = entity.getOne(InputHandlingComponent);
            const speedData = getEffectiveSpeedData(entity);
            const graphics = entity.getOne(GraphicsComponent);

            if (speedData === null ||
                inputStateData === undefined ||
                graphics === undefined ||
                graphics.sprite === null) {
                throw new Error("Player missing speed or input data");
            }

            if (globals.Game.map[0][pos.y][pos.x]!.isVisibleAndLit()) {
                graphics.sprite.visible = true;

                const { x, y } = globals.Game!.gameCamera.tilePositionToScreen(pos.x, pos.y);
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

                if (inputStateData.state === PlayerState.Combat) {
                    const mousePosition = input.getMousePosition();
                    if (mousePosition === null) { return; }
                    const tile = globals.Game.map[0][mousePosition.y][mousePosition.x];
                    if (tile !== null && !tile.explored) {
                        return;
                    }

                    // quick distance check to cut down the number of
                    // AStar calcs
                    if (distanceBetweenPoints(pos, mousePosition) < 40) {
                        // clear
                        for (let i = 0; i < this.perviousPath.length; i++) {
                            const step = this.perviousPath[i];
                            const z = getHighestZIndexWithTile(globals.Game.map, step[0], step[1]);
                            globals.Game
                                .map[z][step[1]][step[0]]!
                                .sprite
                                .filters = [];
                        }

                        const path = getPlayerMovementPath(
                            pos,
                            mousePosition,
                            speedData.maxTilesPerMove,
                            globals.Game!.map,
                            globals.Game!.entityMap
                        );
                        if (path === null) { return; }

                        for (let j = 0; j < path.length; j++) {
                            const step = path[j];
                            const z = getHighestZIndexWithTile(globals.Game.map, step[0], step[1]);
                            globals.Game
                                .map[z][step[1]][step[0]]!
                                .sprite
                                .filters = [this.pathFilter];
                        }
                        this.perviousPath = path;
                    }
                } else if (inputStateData.state === PlayerState.Target) {
                    // clear
                    for (let i = 0; i < this.perviousPath.length; i++) {
                        const step = this.perviousPath[i];
                        const z = getHighestZIndexWithTile(globals.Game.map, step[0], step[1]);
                        globals.Game!
                            .map[z][step[1]][step[0]]!
                            .sprite
                            .filters = [];
                    }


                    const mousePosition = input.getMousePosition();
                    const targetArea = getTargetingReticle(
                        inputStateData.spellForTarget ?? inputStateData.itemForTarget,
                        mousePosition,
                        inputStateData.reticleRotation
                    );

                    for (let i = 0; i < targetArea.length; i++) {
                        const z = getHighestZIndexWithTile(
                            globals.Game.map,
                            targetArea[i][0],
                            targetArea[i][1]
                        );

                        if (targetArea[i][0] >= globals.Game.map[z][0].length ||
                        targetArea[i][1] >= globals.Game!.map[z].length ||
                        globals.Game
                            .map[z][targetArea[i][1]][targetArea[i][0]]!.visible === false) {
                            return;
                        }

                        globals.Game
                            .map[z][targetArea[i][1]][targetArea[i][0]]!
                            .sprite
                            .filters = [this.targetFilter];
                    }
                    this.perviousPath = targetArea;
                }
            } else {
                graphics.sprite.visible = false;
            }
        }
    }
}
