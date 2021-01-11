import { Entity } from "ape-ecs";
import * as PIXI from "pixi.js";

import { PositionComponent } from "./entity";
import { GameMap } from "./map";
import { Nullable } from "./util";

export class Camera {
    private x: number;
    private y: number;
    private following: Nullable<Entity>;
    private readonly tileSize: number = 16;
    private readonly viewport: PIXI.Rectangle;
    zoom: number;

    constructor(viewport: PIXI.Rectangle) {
        this.x = 0;
        this.y = 0;
        this.zoom = 2; // FIXME
        this.viewport = viewport;
        this.following = null;
    }

    follow(object: Entity) {
        this.following = object;
    }

    update(map: GameMap) {
        if (this.following === null) { return; }
        const pos = this.following.getOne(PositionComponent);
        if (pos === undefined) { return; }

        const tileWidth = this.tileSize * this.zoom;
        const screenTileWidth = Math.floor(this.viewport.width / tileWidth);
        const screenTileHeight = Math.floor(this.viewport.height / tileWidth);

        // make the camera follow the sprite
        this.x = Math.floor(pos.x - (screenTileWidth / 2));
        this.y = Math.floor(pos.y - (screenTileHeight / 2));

        // clamp values
        this.x = Math.max(0, Math.min(this.x, map[0][0].length - screenTileWidth));
        this.y = Math.max(0, Math.min(this.y, map[0].length - screenTileHeight));
    }

    tilePositionToScreen(x: number, y: number) {
        const dx = (x * this.tileSize * this.zoom) - (this.x * this.tileSize * this.zoom);
        const dy = (y * this.tileSize * this.zoom) - (this.y * this.tileSize * this.zoom);
        return { x: dx, y: dy };
    }

    screenToTilePosition(x: number, y: number) {
        return {
            x: Math.floor(x / (this.tileSize * this.zoom)) + this.x,
            y: Math.floor(y / (this.tileSize * this.zoom)) + this.y
        };
    }
}
