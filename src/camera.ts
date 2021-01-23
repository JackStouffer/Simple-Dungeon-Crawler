import { Entity } from "ape-ecs";
import * as PIXI from "pixi.js";

import { TILE_SIZE } from "./constants";
import { PositionComponent } from "./entity";
import { GameMap, Point } from "./map";
import { Nullable } from "./util";

export class Camera {
    // Tile position
    private x: number;
    private y: number;
    private following: Nullable<Entity>;
    private readonly tileSize: number = TILE_SIZE;
    private readonly viewport: PIXI.Rectangle;
    zoom: number;

    constructor(viewport: PIXI.Rectangle) {
        this.x = 0;
        this.y = 0;
        this.zoom = 2; // FIXME
        this.viewport = viewport;
        this.following = null;
    }

    follow(object: Entity): void {
        this.following = object;
    }

    update(map: GameMap): void {
        if (this.following === null) { return; }
        const pos = this.following.getOne(PositionComponent);
        if (pos === undefined) { return; }

        const tileWidth = this.tileSize * this.zoom;
        const screenTileWidth = Math.floor(this.viewport.width / tileWidth);
        const screenTileHeight = Math.floor(this.viewport.height / tileWidth);

        // make the camera follow the sprite
        const tilePos = pos.tilePosition();
        this.x = Math.floor(tilePos.x - (screenTileWidth / 2));
        this.y = Math.floor(tilePos.y - (screenTileHeight / 2));

        // clamp values
        this.x = Math.max(0, Math.min(this.x, map[0][0].length - screenTileWidth));
        this.y = Math.max(0, Math.min(this.y, map[0].length - screenTileHeight));
    }

    tilePositionToScreen(x: number, y: number): Point {
        const dx = (x * this.tileSize * this.zoom) - (this.x * this.tileSize * this.zoom);
        const dy = (y * this.tileSize * this.zoom) - (this.y * this.tileSize * this.zoom);
        return { x: dx, y: dy };
    }

    worldPositionToScreen(x: number, y: number): Point {
        const dx = (x * this.zoom) - (this.x * this.tileSize * this.zoom);
        const dy = (y * this.zoom) - (this.y * this.tileSize * this.zoom);
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
            x: Math.floor(x / (this.tileSize * this.zoom)) + this.x,
            y: Math.floor(y / (this.tileSize * this.zoom)) + this.y
        };
    }
}
