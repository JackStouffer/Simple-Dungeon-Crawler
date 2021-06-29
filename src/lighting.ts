import { System, Query } from "ape-ecs";

import { Lighting, FOV } from "./rot/index";
import { Color, toRGB, add, fromString } from "./rot/color";
import { ReflectivityCallback } from "./rot/lighting";

import globals from "./globals";
import { createPassableSightCallback } from "./ai/commands";
import { LightingType } from "./constants";
import { LightingComponent, PositionComponent } from "./entity";
import { GameMap, resetVisibility, setAllToExplored } from "./map";
import { assertUnreachable } from "./util";

function createReflectivityCallback(map: GameMap): ReflectivityCallback {
    return function (x: number, y: number) {
        if (x < 0 || y < 0 || y >= map.height || x >= map.width) {
            return 0;
        }
        return map.data[0][y][x]!.blocksSight ? 0 : map.data[0][y][x]!.reflectivity;
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
        const playerTilePos = pos.tilePosition();
        const sightFov = new FOV.PreciseShadowcasting(
            createPassableSightCallback(playerTilePos)
        );
        sightFov.compute(playerTilePos.x, playerTilePos.y, 30, function(x, y, r, visibility) {
            if (globals.Game === null ||
                x < 0 ||
                y < 0 ||
                y >= globals.Game.map.height ||
                x >= globals.Game.map.width) {
                return;
            }

            const tileVisibility = globals.Game.map.visibilityData[y][x];
            tileVisibility.explored = true;
            tileVisibility.visible = true;
            tileVisibility.lightingColor = light.color;

            if (visibility > 0) {
                const rect = globals.Game.shadowBoxes.filter(b => b.contains(x, y))[0];
                if (rect !== undefined) {
                    rect.seen = true;
                }
            }
        });

        // All seen shadow boxes should have all of their contained tiles shown
        for (let i = 0; i < globals.Game!.shadowBoxes.length; i++) {
            const s = globals.Game!.shadowBoxes[i];
            if (s.seen) {
                const positions = s.tiles();
                for (let i = 0; i < positions.length; i++) {
                    const p = positions[i];
                    const tileVisibility = globals.Game!.map.visibilityData[p.y][p.x];
                    tileVisibility.explored = true;
                    tileVisibility.visible = true;
                    tileVisibility.lightingColor = light.color;
                }
            }
        }
    }

    computeReflectivityLighting(pos: PositionComponent, light: LightingComponent) {
        const tilePos = pos.tilePosition();

        function lightingCallback(x: number, y: number, color: Color) {
            if (x < 0 ||
                y < 0 ||
                y >= globals.Game!.map.height ||
                x >= globals.Game!.map.width) {
                return;
            }
            globals.Game!.map.visibilityData[y][x].lightingColor = toRGB(
                add(
                    fromString(globals.Game!.map.visibilityData[y][x].lightingColor),
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
        globals.Game!.map.visibilityData[tilePos.y][tilePos.x]!.lightingColor = light.color;
    }

    update() {
        if (globals.Game === null) {
            throw new Error("Missing properties on global Game object required for lighting");
        }

        if (globals.Game.isLightingEnabled) {
            resetVisibility(globals.Game.map, globals.Game.shadowBoxes);
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
