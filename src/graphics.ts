import { Entity, Query, System, World } from "ape-ecs";

import {
    ChestGraphicsComponent,
    GraphicsComponent,
    InputHandlingComponent,
    InventoryComponent,
    PositionComponent,
    SpeedComponent
} from "./entity";
import input from "./input";
import { distanceBetweenPoints, getEntitiesAtLocation } from "./map";
import { getTargetingReticle, PlayerState } from "./input-handler";
import { getActorMovementPath } from "./commands";
import { getItems } from "./inventory";
import globals from "./globals";

/**
 * Grab the first background color of an object on the position that doesn't
 * belong to the entity "id". If no objects, return the tile color
 */
function getTransparencyBackground(
    ecs: World,
    pos: PositionComponent,
    entities: Set<Entity>,
    id: string
) {
    let ret: string = globals.Game!.map[pos.y][pos.x].lightingColor;
    const entitiesAtLocation = getEntitiesAtLocation(ecs, pos.x, pos.y);
    if (entitiesAtLocation.length > 0) {
        for (let i = 0; i < entitiesAtLocation.length; i++) {
            const entity = entitiesAtLocation[i];
            if (entity.id === id) {
                continue;
            }
            const graphicData = entity.getOne(GraphicsComponent);
            if (graphicData !== undefined && graphicData.bgColor !== null) {
                ret = graphicData.bgColor;
                break;
            }
        }
    }
    return ret;
}

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
    draw(pos: PositionComponent, graphics: GraphicsComponent): void {
        if (globals.Game!.map[pos.y][pos.x].isVisibleAndLit()) {
            const { x, y } = globals.Game!.gameCamera.worldToScreen(pos.x, pos.y);
            globals.Game!.display!.draw(x, y, graphics.char, graphics.fgColor, graphics.bgColor);
        }
    }

    /**
     * Draws the object's character and foreground color normally.
     *
     * If the tile is not occupied by anything else, use the lighting
     * color of the owner occupied tile as the background. If there are
     * other objects on the same tile, use that object's background color.
     */
    drawWithTransparency(
        pos: PositionComponent,
        graphics: GraphicsComponent,
        entities: Set<Entity>,
        id: string
    ): void {
        if (globals.Game!.map[pos.y][pos.x].isVisibleAndLit()) {
            const bgColor = getTransparencyBackground(this.world, pos, entities, id);
            const { x, y } = globals.Game!.gameCamera.worldToScreen(pos.x, pos.y);
            globals.Game!.display!.draw(
                x,
                y,
                graphics.char,
                graphics.fgColor,
                bgColor
            );
        }
    }

    drawAfterSeen(pos: PositionComponent, graphics: GraphicsComponent): void {
        if (globals.Game!.map[pos.y][pos.x].explored) {
            const { x, y } = globals.Game!.gameCamera.worldToScreen(pos.x, pos.y);
            globals.Game!.display!.draw(x, y, graphics.char, graphics.fgColor, graphics.bgColor);
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
            } else if (graphicData.bgColor === null) {
                this.drawWithTransparency(pos, graphicData, entities, entity.id);
            } else {
                this.draw(pos, graphicData);
            }
        }
    }
}

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

            if (globals.Game.map[pos.y][pos.x].explored) {
                const graphics = entity.getOne(ChestGraphicsComponent)!;
                const inventory = entity.getOne(InventoryComponent)!;
                const bgColor = getItems(inventory).length > 0 ?
                    graphics.bgColor :
                    graphics.emptyColor;

                const { x, y } = globals.Game.gameCamera.worldToScreen(pos.x, pos.y);
                globals.Game.display!.draw(x, y, graphics.char, graphics.fgColor, bgColor);
            }
        }
    }
}

export class DrawPlayerSystem extends System {
    private query: Query;

    init() {
        this.query = this
            .createQuery()
            .fromAll(PositionComponent, InventoryComponent, "input")
            .persist();
    }

    update() {
        if (globals.Game === null) { throw new Error("Global game is null"); }

        const entities = this.query.execute();
        for (const entity of entities) {
            const pos = entity.getOne(PositionComponent)!;
            const inputStateData = entity.getOne(InputHandlingComponent);
            const speedData = entity.getOne(SpeedComponent);
            const graphics = entity.getOne(GraphicsComponent);

            if (speedData === undefined ||
                inputStateData === undefined ||
                graphics === undefined) {
                throw new Error("Player missing speed or input data");
            }

            if (globals.Game!.map[pos.y][pos.x].isVisibleAndLit()) {
                const bgColor = getTransparencyBackground(this.world, pos, entities, entity.id);
                const { x, y } = globals.Game!.gameCamera.worldToScreen(pos.x, pos.y);

                globals.Game!.display!.draw(
                    x,
                    y,
                    graphics.char,
                    graphics.fgColor,
                    bgColor
                );

                if (inputStateData.state === PlayerState.Combat) {
                    const mousePosition = input.getMousePosition();
                    if (mousePosition === null) { return; }

                    // quick distance check to cut down the number of
                    // AStar calcs
                    if (distanceBetweenPoints(pos, mousePosition) < speedData.maxTilesPerMove * 2) {
                        const path = getActorMovementPath(
                            this.world,
                            pos,
                            mousePosition,
                            speedData.maxTilesPerMove,
                            globals.Game!.map,
                        );
                        if (path === null) { return; }

                        for (let i = 0; i < path.length; i++) {
                            const step = path[i];
                            const { x, y } = globals
                                .Game!
                                .gameCamera
                                .worldToScreen(step[0], step[1]);
                            globals.Game!.display!.draw(x, y, "", "yellow", "yellow");
                        }
                    }
                } else if (inputStateData.state === PlayerState.Target) {
                    const targetArea = getTargetingReticle(inputStateData);

                    for (let i = 0; i < targetArea.length; i++) {
                        if (targetArea[i].x >= globals.Game!.map[0].length ||
                        targetArea[i].y >= globals.Game!.map.length ||
                        globals.Game!.map[targetArea[i].y][targetArea[i].x].visible === false) {
                            return;
                        }

                        const { x, y } = globals
                            .Game!
                            .gameCamera
                            .worldToScreen(targetArea[i].x, targetArea[i].y);
                        globals.Game!.display!.draw(x, y, "X", "black", "yellow");
                    }
                }
            }
        }
    }
}
