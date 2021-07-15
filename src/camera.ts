import { World } from "ape-ecs";

import { TILE_SIZE } from "./constants";
import { PositionComponent } from "./entity";
import { GameMap, Vector2D } from "./map";
import { Nullable } from "./util";

export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Camera {
    // world position
    x: number;
    y: number;

    readonly tileSize: number = TILE_SIZE;
    viewport: Rectangle;
    following: Nullable<string>;
    zoom: number;

    constructor(viewport: Rectangle) {
        this.x = 0;
        this.y = 0;
        this.zoom = 2; // TODO, bind to key?
        this.viewport = viewport;
        this.following = null;
    }

    update(ecs: World, map: GameMap): void {
        if (this.following === null) { return; }
        const entity = ecs.getEntity(this.following);
        if (entity === undefined) { return; }
        const pos = entity.getOne(PositionComponent);
        if (pos === undefined) { return; }

        // make the camera follow the sprite
        const point = this.clamp(pos.worldPosition.x, pos.worldPosition.y, map.width, map.height);
        // const screenPos = this.worldPositionToScreen(pos.worldPosition);
        // const point = this.clamp(screenPos.x, screenPos.y, map.width, map.height);
        this.x = point.x;
        this.y = point.y;
    }

    clamp(x: number, y: number, width: number, height: number): Vector2D {
        // TODO, bug: The camera prevents itself from going past the top of the map
        // but not the bottom
        let dx = Math.floor(x - (this.viewport.width / (this.zoom * 2)));
        let dy = Math.floor(y - (this.viewport.height / (this.zoom * 2)));

        // clamp values
        dx = Math.max(
            0,
            Math.min(
                dx,
                (width * this.tileSize * this.zoom)
            )
        );
        dy = Math.max(
            0,
            Math.min(
                dy,
                (height * this.tileSize * this.zoom)
            )
        );
        return new Vector2D(dx, dy);
    }

    tilePositionToScreen(pos: Vector2D): Vector2D {
        const dx = (pos.x * this.tileSize * this.zoom) - (this.x * this.zoom);
        const dy = (pos.y * this.tileSize * this.zoom) - (this.y * this.zoom);
        return new Vector2D(dx, dy);
    }

    worldPositionToScreen(pos: Vector2D): Vector2D {
        const dx = (pos.x * this.zoom) - (this.x * this.zoom);
        const dy = (pos.y * this.zoom) - (this.y * this.zoom);
        return new Vector2D(dx, dy);
    }

    tilePositionToWorld(pos: Vector2D): Vector2D {
        return new Vector2D(pos.x * this.tileSize, pos.y * this.tileSize);
    }

    worldPositionToTile(pos: Vector2D): Vector2D {
        return new Vector2D(Math.floor(pos.x / this.tileSize), Math.floor(pos.y / this.tileSize));
    }

    screenToTilePosition(x: number, y: number): Vector2D {
        return new Vector2D(
            Math.floor(x / (this.tileSize * this.zoom)) + Math.floor(this.x / this.tileSize),
            Math.floor(y / (this.tileSize * this.zoom)) + Math.floor(this.y / this.tileSize)
        );
    }

    /**
     * Like screenToTilePosition, but using rounding because it feels better for input code
     */
    mouseToTilePosition(x: number, y: number): Vector2D {
        // TODO, BUG: This is wrong somehow when the camera is all the way to the left
        return new Vector2D(
            Math.round(x / (this.tileSize * this.zoom)) + Math.floor(this.x / this.tileSize),
            Math.round(y / (this.tileSize * this.zoom)) + Math.floor(this.y / this.tileSize)
        );
    }
}
