import { Entity, Query, System } from "ape-ecs";

import Display from "./rot/display/display";

import {
    GraphicsComponent,
    InputHandlingComponent,
    PositionComponent,
    SpeedComponent
} from "./entity";
import input from "./input";
import { distanceBetweenPoints, GameMap, getEntitiesAtLocation } from "./map";
import { Camera } from "./camera";
import { getTargetingReticle, PlayerState } from "./input-handler";
import { getActorMovementPath } from "./commands";

export class DrawSystem extends System {
    private graphicsQuery: Query;
    private display: Display;
    private map: GameMap;
    private camera: Camera;

    init(display: Display, gameCamera: Camera, map: GameMap) {
        this.display = display;
        this.map = map;
        this.camera = gameCamera;

        this.graphicsQuery = this
            .createQuery()
            .fromAll(GraphicsComponent, PositionComponent)
            .persist();
    }

    /**
     * Grab the first background color of an object on the position that doesn't
     * belong to the entity "id". If no objects, return the tile color
     */
    getTransparencyBackground(pos: PositionComponent, entities: Set<Entity>, id: string) {
        let ret: string = this.map[pos.y][pos.x].lightingColor;
        const entitiesAtLocation = getEntitiesAtLocation(this.world, pos.x, pos.y);
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

    /**
     * Simply draws the character with the fore and background color at
     * x and y coordinates if the tile it's on is visible.
     */
    draw(pos: PositionComponent, graphics: GraphicsComponent): void {
        if (this.map[pos.y][pos.x].isVisibleAndLit()) {
            const { x, y } = this.camera.worldToScreen(pos.x, pos.y);
            this.display.draw(x, y, graphics.char, graphics.fgColor, graphics.bgColor);
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
        if (this.map[pos.y][pos.x].isVisibleAndLit()) {
            const bgColor = this.getTransparencyBackground(pos, entities, id);
            const { x, y } = this.camera.worldToScreen(pos.x, pos.y);
            this.display.draw(
                x,
                y,
                graphics.char,
                graphics.fgColor,
                bgColor
            );
        }
    }

    drawAfterSeen(pos: PositionComponent, graphics: GraphicsComponent): void {
        if (this.map[pos.y][pos.x].explored) {
            const { x, y } = this.camera.worldToScreen(pos.x, pos.y);
            this.display.draw(x, y, graphics.char, graphics.fgColor, graphics.bgColor);
        }
    }

    /**
    * Draws the object's character and foreground color normally.
    *
    * If the tile is not occupied by anything else, use the lighting
    * color of the owner occupied tile as the background. If there are
    * other objects on the same tile, use that object's background color.
    */
    drawPlayer(
        pos: PositionComponent,
        graphics: GraphicsComponent,
        entities: Set<Entity>,
        player: Entity
    ): void {
        const inputStateData = player.getOne(InputHandlingComponent);
        const speedData = player.getOne(SpeedComponent);

        if (speedData === undefined || inputStateData === undefined) {
            throw new Error("Player missing speed or input data");
        }

        if (this.map[pos.y][pos.x].isVisibleAndLit()) {
            const bgColor = this.getTransparencyBackground(pos, entities, player.id);
            const { x, y } = this.camera.worldToScreen(pos.x, pos.y);

            this.display.draw(
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
                        this.map,
                    );
                    if (path === null) { return; }

                    for (let i = 0; i < path.length; i++) {
                        const step = path[i];
                        const { x, y } = this.camera.worldToScreen(step[0], step[1]);
                        this.display.draw(x, y, "", "yellow", "yellow");
                    }
                }
            } else if (inputStateData.state === PlayerState.Target) {
                const targetArea = getTargetingReticle(inputStateData);

                for (let i = 0; i < targetArea.length; i++) {
                    if (targetArea[i].x >= this.map[0].length ||
                       targetArea[i].y >= this.map.length ||
                       this.map[targetArea[i].y][targetArea[i].x].visible === false) {
                        return;
                    }

                    const { x, y } = this.camera.worldToScreen(targetArea[i].x, targetArea[i].y);
                    this.display.draw(x, y, "X", "black", "yellow");
                }
            }
        }
    }

    update() {
        const entities = this.graphicsQuery.execute();
        for (const entity of entities) {
            const graphicData = entity.getOne(GraphicsComponent);
            const pos = entity.getOne(PositionComponent);

            if (graphicData === undefined || pos === undefined) {
                throw new Error(`missing data for draw system for ${entity.id}`);
            }

            if (entity.id === "player") {
                this.drawPlayer(pos, graphicData, entities, entity);
            } else if (entity.tags.has("drawAfterSeen") === true) {
                this.drawAfterSeen(pos, graphicData);
            } else if (graphicData.bgColor === null) {
                this.drawWithTransparency(pos, graphicData, entities, entity.id);
            } else {
                this.draw(pos, graphicData);
            }
        }
    }
}
