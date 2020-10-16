import { Color, Lighting, FOV } from "./rot/index";

import { createPassableSightCallback } from "./ai/components";

function createReflectivityCallback(map) {
    return function (x, y) {
        if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) {
            return 0;
        }
        return map[y][x].blocksSight ? 0 : map[y][x].reflectivity;
    };
}

/**
 * Component
 */
class ReflectivityLighting {
    constructor(color, range) {
        this.color = color;
        this.range = range;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    compute(map) {
        function lightingCallback(x, y, color) {
            if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) {
                return;
            }
            map[y][x].lightingColor = Color.toRGB(
                Color.add(
                    Color.fromString(map[y][x].lightingColor),
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
class PlayerLighting {
    constructor(color, range) {
        this.color = color;
        this.range = range;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    compute(map) {
        function lightingCallback(x, y, color) {
            if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) {
                return;
            }
            map[y][x].lightingColor = Color.toRGB(
                Color.add(
                    Color.fromString(map[y][x].lightingColor),
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
