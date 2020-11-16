import Display from "./rot/display/display";

import input from "./input";
import { distanceBetweenObjects, GameMap, getObjectsAtLocation } from "./map";
import { GameObject } from "./object";
import { Camera } from "./camera";
import { ObjectData, ObjectDataDetails } from "./data";
import { PlayerState } from "./input-handler";
import { getActorMovementPath } from "./commands";
import { Nullable } from "./util";

export interface GraphicsComponent {
    char: string;
    fgColor: string;
    bgColor: string;
    owner: Nullable<GameObject>;

    draw: (display: Display, camera: Camera, map: GameMap, objects: GameObject[]) => void;
}

/**
 * Graphics component which simply draws the character with the fore
 * and background color at the owner's x and y coordinates if the tile
 * it's on is visible.
 */
export class BasicGraphics implements GraphicsComponent {
    char: string;
    fgColor: string;
    bgColor: string;
    owner: Nullable<GameObject>;

    constructor(data: ObjectDataDetails) {
        if (data.char === null) {
            throw new Error("Missing data on DrawAfterSeen ctor");
        }
        if (data.fgColor === null) {
            throw new Error("Missing data on DrawAfterSeen ctor");
        }
        if (data.bgColor === null) {
            throw new Error("Missing data on DrawAfterSeen ctor");
        }

        this.char = data.char;
        this.fgColor = data.fgColor;
        this.bgColor = data.bgColor;
        this.owner = null;
    }

    draw(display: Display, camera: Camera, map: GameMap) {
        if (this.owner === null) { throw new Error("Can't draw BasicGraphics without owner"); }

        if (map[this.owner.y][this.owner.x].isVisibleAndLit()) {
            const { x, y } = camera.worldToScreen(this.owner.x, this.owner.y);
            display.draw(x, y, this.char, this.fgColor, this.bgColor);
        }
    }
}

/**
 * Graphics component which handles the odd behavior with ROT.js and
 * transparent backgrounds
 */
export class TransparencyGraphics implements GraphicsComponent {
    char: string;
    fgColor: string;
    bgColor: string;
    owner: Nullable<GameObject>;

    constructor(data: ObjectDataDetails) {
        if (data.char === null) {
            throw new Error("Missing data on DrawAfterSeen ctor");
        }
        if (data.fgColor === null) {
            throw new Error("Missing data on DrawAfterSeen ctor");
        }

        this.char = data.char;
        this.fgColor = data.fgColor;
        this.owner = null;
    }

    /**
     * Draws the object's character and foreground color normally.
     *
     * If the tile is not occupied by anything else, use the lighting
     * color of the owner occupied tile as the background. If there are
     * other objects on the same tile, use that object's background color.
     *
     * @param {Display} display The ROT.js Display object
     * @param {Array} map The map 2D array
     * @param {Array} objects An array of GameObjects
     */
    draw(display: Display, camera: Camera, map: GameMap, objects: GameObject[]) {
        if (this.owner === null) { throw new Error("Can't draw TransparencyGraphics without owner"); }

        if (map[this.owner.y][this.owner.x].isVisibleAndLit()) {
            let bgColor = map[this.owner.y][this.owner.x].lightingColor;
            const objectsAtLocation = getObjectsAtLocation(objects, this.owner.x, this.owner.y);
            if (objectsAtLocation.length > 0) {
                for (let i = 0; i < objectsAtLocation.length; i++) {
                    const obj = objectsAtLocation[i];
                    if (obj === this.owner || obj.graphics === null) {
                        continue;
                    }
                    if (obj.graphics.bgColor !== null) {
                        bgColor = obj.graphics.bgColor;
                    }
                }
            }

            const { x, y } = camera.worldToScreen(this.owner.x, this.owner.y);

            display.draw(
                x,
                y,
                this.char,
                this.fgColor,
                bgColor
            );
        }
    }
}

/**
 * Graphics component which handles the odd behavior with ROT.js and
 * transparent backgrounds
 */
export class PlayerGraphics implements GraphicsComponent {
    char: string;
    fgColor: string;
    bgColor: string;
    owner: Nullable<GameObject>;

    constructor(data: ObjectDataDetails) {
        if (data.char === null) {
            throw new Error("Missing data on DrawAfterSeen ctor");
        }
        if (data.fgColor === null) {
            throw new Error("Missing data on DrawAfterSeen ctor");
        }

        this.char = data.char;
        this.fgColor = data.fgColor;
        this.owner = null;
    }

    /**
     * Draws the object's character and foreground color normally.
     *
     * If the tile is not occupied by anything else, use the lighting
     * color of the owner occupied tile as the background. If there are
     * other objects on the same tile, use that object's background color.
     *
     * @param {Display} display The ROT.js Display object
     * @param {Array} map The map 2D array
     * @param {Array} objects An array of GameObjects
     */
    draw(display: Display, camera: Camera, map: GameMap, objects: GameObject[]): void {
        if (this.owner === null) { throw new Error("Can't draw PlayerGraphics without owner"); }
        if (this.owner.inputHandler === null) { throw new Error("Can't draw PlayerGraphics without inputHandler"); }
        if (ObjectData[this.owner.type].maxTilesPerMove === null) {
            throw new Error(`Missing maxTilesPerMove for ${this.owner.type}`);
        }
        const maxTilesPerMove = ObjectData[this.owner.type].maxTilesPerMove!;

        if (map[this.owner.y][this.owner.x].isVisibleAndLit()) {
            let bgColor = map[this.owner.y][this.owner.x].lightingColor;
            const objectsAtLocation = getObjectsAtLocation(objects, this.owner.x, this.owner.y);
            if (objectsAtLocation.length > 0) {
                for (let i = 0; i < objectsAtLocation.length; i++) {
                    const obj = objectsAtLocation[i];
                    if (obj === this.owner || obj.graphics === null) {
                        continue;
                    }
                    if (obj.graphics.bgColor !== null) {
                        bgColor = obj.graphics.bgColor;
                    }
                }
            }

            const { x, y } = camera.worldToScreen(this.owner.x, this.owner.y);

            display.draw(
                x,
                y,
                this.char,
                this.fgColor,
                bgColor
            );

            const inputHandlerState = this.owner.inputHandler.state;
            if (inputHandlerState === PlayerState.Combat) {
                const mousePosition = input.getMousePosition();
                if (mousePosition === null) { return; }

                // quick distance check to cut down the number of
                // AStar calcs
                if (distanceBetweenObjects(this.owner, mousePosition) < maxTilesPerMove * 2) {
                    const path = getActorMovementPath(
                        mousePosition.x,
                        mousePosition.y,
                        this.owner,
                        map,
                        objects
                    );
                    if (path === null) { return; }

                    for (let i = 0; i < path.length; i++) {
                        const step = path[i];
                        const { x, y } = camera.worldToScreen(step[0], step[1]);
                        display.draw(x, y, "", "yellow", "yellow");
                    }
                }
            } else if (inputHandlerState === PlayerState.Target) {
                const targetArea = this.owner.inputHandler.getTargetingReticle();

                for (let i = 0; i < targetArea.length; i++) {
                    if (targetArea[i].x >= map[0].length ||
                        targetArea[i].y >= map.length ||
                        map[targetArea[i].y][targetArea[i].x].visible === false) {
                        return;
                    }

                    const { x, y } = camera.worldToScreen(targetArea[i].x, targetArea[i].y);
                    display.draw(x, y, "X", "black", "yellow");
                }
            }
        }
    }
}

/**
 * Graphics component will always draw the object if the tile it's on has been explored,
 * regardless of its visibility
 */
export class DrawAfterSeen implements GraphicsComponent {
    char: string;
    fgColor: string;
    bgColor: string;
    owner: Nullable<GameObject>;

    constructor(data: ObjectDataDetails) {
        if (data.char === null) {
            throw new Error("Missing data on DrawAfterSeen ctor");
        }
        if (data.fgColor === null) {
            throw new Error("Missing data on DrawAfterSeen ctor");
        }
        if (data.bgColor === null) {
            throw new Error("Missing data on DrawAfterSeen ctor");
        }

        this.char = data.char;
        this.fgColor = data.fgColor;
        this.bgColor = data.bgColor;
        this.owner = null;
    }

    draw(display: Display, camera: Camera, map: GameMap) {
        if (this.owner === null) { throw new Error("Can't draw DrawAfterSeen without owner"); }

        if (map[this.owner.y][this.owner.x].explored) {
            const { x, y } = camera.worldToScreen(this.owner.x, this.owner.y);
            display.draw(x, y, this.char, this.fgColor, this.bgColor);
        }
    }
}
