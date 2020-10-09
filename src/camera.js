"use strict";

import { WIDTH, HEIGHT, UI_HEIGHT } from "./data";

class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.following = null;
    }

    follow(object) {
        this.following = object;
    }

    update(map) {
        // make the camera follow the sprite
        this.x = Math.floor(this.following.x - WIDTH / 2);
        this.y = Math.floor(this.following.y - (HEIGHT - UI_HEIGHT) / 2);
        // clamp values
        this.x = Math.max(0, Math.min(this.x, map.length));
        this.y = Math.max(0, Math.min(this.y, map[0].length));
    }

    worldToScreen(x, y) {
        return {
            x: x - this.x,
            y: y - this.y
        };
    }

    screenToWorld(x, y) {
        return {
            x: x + this.x,
            y: y + this.y
        };
    }
}
export { Camera };
