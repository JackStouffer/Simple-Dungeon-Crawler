import { System, Query } from "ape-ecs";

import { Lighting, FOV } from "./rot/index";
import { Color, toRGB, add, fromString } from "./rot/color";
import { ReflectivityCallback } from "./rot/lighting";

import globals from "./globals";
import { createPassableSightCallback } from "./ai/commands";
import { LightingType, WIDTH } from "./constants";
import { LightingComponent, PositionComponent } from "./entity";
import { GameMap, resetVisibility, setAllToExplored } from "./map";
import { assertUnreachable } from "./util";

function createReflectivityCallback(map: GameMap): ReflectivityCallback {
    return function (x: number, y: number) {
        if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) {
            return 0;
        }
        return map[0][y][x]!.blocksSight ? 0 : map[0][y][x]!.reflectivity;
    };
}

/**
 * Compute the lighting values for all entities with position
 * and a lighting components
 */
export class LightingSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this.createQuery()
            .fromAll(LightingComponent, PositionComponent)
            .persist();
    }

    computePlayerLighting(pos: PositionComponent, light: LightingComponent) {
        const tilePos = pos.tilePosition();
        const sightFov = new FOV.PreciseShadowcasting(
            createPassableSightCallback(tilePos)
        );
        sightFov.compute(tilePos.x, tilePos.y, WIDTH + 2, function(x, y) {
            if (globals.Game === null ||
                x < 0 ||
                y < 0 ||
                y >= globals.Game.map[0].length ||
                x >= globals.Game.map[0][y].length) {
                return;
            }

            for (let z = 0; z < globals.Game.map.length; z++) {
                const tile = globals.Game.map[z][y][x];
                if (tile !== null) {
                    tile.explored = true;
                    tile.visible = true;
                    tile.lightingColor = light.color;
                }
            }
        });
    }

    computePlayerIndoorLighting(pos: PositionComponent, light: LightingComponent) {
        const tilePos = pos.tilePosition();

        function lightingCallback(x: number, y: number, color: Color) {
            if (x < 0 ||
                y < 0 ||
                y >= globals.Game!.map.length ||
                x >= globals.Game!.map[y].length) {
                return;
            }
            globals.Game!.map[0][y][x]!.lightingColor = toRGB(
                add(
                    fromString(globals.Game!.map[0][y][x]!.lightingColor),
                    color
                )
            );
            globals.Game!.map[0][y][x]!.explored = true;
        }

        const sightFov = new FOV.PreciseShadowcasting(
            createPassableSightCallback(tilePos)
        );
        sightFov.compute(tilePos.x, tilePos.y, 50, function(x, y) {
            if (x < 0 ||
                y < 0 ||
                y >= globals.Game!.map.length ||
                x >= globals.Game!.map[y].length) {
                return;
            }
            globals.Game!.map[0][y][x]!.visible = true;
        });

        const lightingFov = new FOV.PreciseShadowcasting(
            createPassableSightCallback(tilePos)
        );
        const lighting = new Lighting(
            createReflectivityCallback(globals.Game!.map),
            { range: light.range, passes: 2 }
        );
        lighting.setFOV(lightingFov);
        lighting.setLight(tilePos.x, tilePos.y, light.color);
        lighting.compute(lightingCallback);
    }

    computeReflectivityLighting(pos: PositionComponent, light: LightingComponent) {
        const tilePos = pos.tilePosition();

        function lightingCallback(x: number, y: number, color: Color) {
            if (x < 0 ||
                y < 0 ||
                y >= globals.Game!.map.length ||
                x >= globals.Game!.map[y].length) {
                return;
            }
            globals.Game!.map[0][y][x]!.lightingColor = toRGB(
                add(
                    fromString(globals.Game!.map[0][y][x]!.lightingColor),
                    color
                )
            );
        }

        const fov = new FOV.PreciseShadowcasting(
            createPassableSightCallback(tilePos)
        );
        const lighting = new Lighting(
            createReflectivityCallback(globals.Game!.map),
            { range: light.range, passes: 2 }
        );
        lighting.setFOV(fov);
        lighting.setLight(tilePos.x, tilePos.y, light.color);
        lighting.compute(lightingCallback);
        // For some reason the tile you're on doesn't get lit
        globals.Game!.map[0][tilePos.y][tilePos.x]!.lightingColor = light.color;
    }

    update() {
        if (globals.Game === null) {
            throw new Error("Missing properties on global Game object required for lighting");
        }

        if (globals.Game.isLightingEnabled) {
            resetVisibility(globals.Game.map);
            const entities = this.mainQuery.execute();
            for (const entity of entities) {
                const positionData = entity.getOne(PositionComponent)!;
                const lightData = entity.getOne(LightingComponent)!;

                switch (lightData.lightingType) {
                    case LightingType.Player:
                        this.computePlayerLighting(positionData, lightData);
                        break;
                    case LightingType.OnePass:
                        throw new Error("not implemented");
                    case LightingType.TwoPass:
                        this.computeReflectivityLighting(positionData, lightData);
                        break;
                    default:
                        assertUnreachable(lightData.lightingType);
                }
            }
        } else {
            setAllToExplored(globals.Game.map, true, true);
        }
    }
}
