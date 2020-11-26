import { Entity } from "ape-ecs";
import { WIDTH, HEIGHT, UI_HEIGHT } from "./data";
import { PositionComponent } from "./entity";
import { GameMap } from "./map";
import { Nullable } from "./util";

export class Camera {
    private x: number;
    private y: number;
    private following: Nullable<Entity>;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.following = null;
    }

    follow(object: Entity) {
        this.following = object;
    }

    update(map: GameMap) {
        if (this.following === null) { return; }
        const pos = this.following.getOne(PositionComponent);
        if (pos === undefined) { return; }

        // make the camera follow the sprite
        this.x = Math.floor(pos.x - WIDTH / 2);
        this.y = Math.floor(pos.y - (HEIGHT - UI_HEIGHT) / 2);
        // clamp values
        this.x = Math.max(0, Math.min(this.x, map.length));
        this.y = Math.max(0, Math.min(this.y, map[0].length));
    }

    worldToScreen(x: number, y: number) {
        return {
            x: x - this.x,
            y: y - this.y
        };
    }

    screenToWorld(x: number, y: number) {
        return {
            x: x + this.x,
            y: y + this.y
        };
    }
}
