import { Entity } from "ape-ecs";
import * as PIXI from "pixi.js";

import { TILE_SIZE } from "./constants";
import { PositionComponent } from "./entity";
import { GameMap, Point } from "./map";
import { Nullable } from "./util";

export class Camera {
    // world position
    x: number;
    y: number;

    readonly tileSize: number = TILE_SIZE;
    viewport: PIXI.Rectangle;
    following: Nullable<Entity>;
    // TODO: does pixi.js have a projection thing with WebGL? Can we use that to zoom?
    zoom: number;

    constructor(viewport: PIXI.Rectangle) {
        this.x = 0;
        this.y = 0;
        this.zoom = 2; // TODO, bind to key?
        this.viewport = viewport;
        this.following = null;
    }

    update(map: GameMap): void {
        if (this.following === null) { return; }
        const pos = this.following.getOne(PositionComponent);
        if (pos === undefined) { return; }

        // make the camera follow the sprite
        const point = this.clamp(pos.x, pos.y, map.width, map.height);
        this.x = point.x;
        this.y = point.y;
    }

    clamp(x: number, y: number, width: number, height: number): Point {
        let dx = Math.floor(x - (this.viewport.width / 4));
        let dy = Math.floor(y - (this.viewport.height / 4));

        // clamp values
        dx = Math.max(
            0,
            Math.min(
                dx,
                (width * this.tileSize)
            )
        );
        dy = Math.max(
            0,
            Math.min(
                dy,
                (height * this.tileSize)
            )
        );
        return { x: dx, y: dy };
    }

    tilePositionToScreen(x: number, y: number): Point {
        const dx = (x * this.tileSize * this.zoom) - (this.x * this.zoom);
        const dy = (y * this.tileSize * this.zoom) - (this.y * this.zoom);
        return { x: dx, y: dy };
    }

    worldPositionToScreen(x: number, y: number): Point {
        const dx = (x * this.zoom) - (this.x * this.zoom);
        const dy = (y * this.zoom) - (this.y * this.zoom);
        return { x: dx, y: dy };
    }

    tilePositionToWorld(x: number, y: number): Point {
        return { x: x * this.tileSize, y: y * this.tileSize };
    }

    worldPositionToTile(x: number, y: number): Point {
        return { x: Math.floor(x / this.tileSize), y: Math.floor(y / this.tileSize) };
    }

    screenToTilePosition(x: number, y: number): Point {
        return {
            x: Math.floor(x / (this.tileSize * this.zoom)) + Math.floor(this.x / this.tileSize),
            y: Math.floor(y / (this.tileSize * this.zoom)) + Math.floor(this.y / this.tileSize)
        };
    }

    // Like screenToTilePosition, but using rounding because it feels better for input code
    mouseToTilePosition(x: number, y: number): Point {
        // TODO, BUG: This is wrong somehow when the camera is all the way to the left
        return {
            x: Math.round(x / (this.tileSize * this.zoom)) + Math.floor(this.x / this.tileSize),
            y: Math.round(y / (this.tileSize * this.zoom)) + Math.floor(this.y / this.tileSize)
        };
    }
}
