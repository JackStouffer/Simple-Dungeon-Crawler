import { Lighting, FOV } from "./rot/index";
import { Color, toRGB, add, fromString } from "./rot/color";

import { createPassableSightCallback } from "./ai/components";
import { GameObject } from "./object";
import { GameMap } from "./map";

export interface LightingComponent {
    color: string;
    range: number;
    owner: GameObject;

    setOwner: (owner: GameObject) => void;
    compute: (map: any) => void;
}

function createReflectivityCallback(map: GameMap) {
    return function (x: number, y: number) {
        if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) {
            return 0;
        }
        return map[y][x].blocksSight ? 0 : map[y][x].reflectivity;
    };
}

/**
 * Component
 */
class ReflectivityLighting implements LightingComponent {
    color: string;
    range: number;
    owner: GameObject;

    constructor(color: string, range: number) {
        this.color = color;
        this.range = range;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
    }

    compute(map: GameMap) {
        function lightingCallback(x: number, y: number, color: Color) {
            if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) {
                return;
            }
            map[y][x].lightingColor = toRGB(
                add(
                    fromString(map[y][x].lightingColor),
                    color
                )
            );
        }
        const fov = new FOV.PreciseShadowcasting(
            createPassableSightCallback(this.owner)
        );
        const lighting = new Lighting(
            createReflectivityCallback(map),
            { range: this.range, passes: 2 }
        );
        lighting.setFOV(fov);
        lighting.setLight(this.owner.x, this.owner.y, this.color);
        lighting.compute(lightingCallback);
        // For some reason the tile you're on doesn't get lit
        map[this.owner.y][this.owner.x].lightingColor = this.color;
    }
}

/**
 * Component
 */
class PlayerLighting implements LightingComponent {
    color: string;
    range: number;
    owner: GameObject;

    constructor(color: string, range: number) {
        this.color = color;
        this.range = range;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
    }

    compute(map: GameMap) {
        function lightingCallback(x: number, y: number, color: Color) {
            if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) {
                return;
            }
            map[y][x].lightingColor = toRGB(
                add(
                    fromString(map[y][x].lightingColor),
                    color
                )
            );
            map[y][x].explored = true;
        }

        const sightFov = new FOV.PreciseShadowcasting(
            createPassableSightCallback(this.owner)
        );
        sightFov.compute(this.owner.x, this.owner.y, 100, function(x, y) {
            if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) {
                return;
            }
            map[y][x].visible = true;
        });

        const lightingFov = new FOV.PreciseShadowcasting(
            createPassableSightCallback(this.owner)
        );
        const lighting = new Lighting(
            createReflectivityCallback(map),
            { range: this.range, passes: 2 }
        );
        lighting.setFOV(lightingFov);
        lighting.setLight(this.owner.x, this.owner.y, this.color);
        lighting.compute(lightingCallback);
    }
}
export { ReflectivityLighting, PlayerLighting };
