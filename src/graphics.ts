import Display from "./rot/display/display";

import { GameMap, getObjectsAtLocation } from "./map";
import { GameObject } from "./object";
import { Camera } from "./camera";
import { ObjectDataDetails } from "./data";

export interface GraphicsComponent {
    char: string;
    fgColor: string;
    bgColor: string;
    owner: GameObject;
    setOwner: (owner: GameObject) => void;
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
    owner: GameObject;

    constructor(data: ObjectDataDetails) {
        this.char = data.char;
        this.fgColor = data.fgColor;
        this.bgColor = data.bgColor;
        this.owner = null;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
    }

    draw(display: Display, camera: Camera, map: GameMap) {
        if (this.owner && map[this.owner.y][this.owner.x].isVisibleAndLit()) {
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
    owner: GameObject;

    constructor(data: ObjectDataDetails) {
        this.char = data.char;
        this.fgColor = data.fgColor;
        this.owner = null;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
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
        if (this.owner && map[this.owner.y][this.owner.x].isVisibleAndLit()) {
            let bgColor = map[this.owner.y][this.owner.x].lightingColor;
            const objectsAtLocation = getObjectsAtLocation(objects, this.owner.x, this.owner.y);
            if (objectsAtLocation.length > 0) {
                for (let i = 0; i < objectsAtLocation.length; i++) {
                    const obj = objectsAtLocation[i];
                    if (obj === this.owner) {
                        continue;
                    }
                    if (obj.graphics.bgColor) {
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
    owner: GameObject;

    constructor(data: ObjectDataDetails) {
        this.char = data.char;
        this.fgColor = data.fgColor;
        this.owner = null;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
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
        if (this.owner && map[this.owner.y][this.owner.x].isVisibleAndLit()) {
            let bgColor = map[this.owner.y][this.owner.x].lightingColor;
            const objectsAtLocation = getObjectsAtLocation(objects, this.owner.x, this.owner.y);
            if (objectsAtLocation.length > 0) {
                for (let i = 0; i < objectsAtLocation.length; i++) {
                    const obj = objectsAtLocation[i];
                    if (obj === this.owner) {
                        continue;
                    }
                    if (obj.graphics.bgColor) {
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
 * Graphics component will always draw the object if the tile it's on has been explored,
 * regardless of its visibility
 */
export class DrawAfterSeen implements GraphicsComponent {
    char: string;
    fgColor: string;
    bgColor: string;
    owner: GameObject;

    constructor(data: ObjectDataDetails) {
        this.char = data.char;
        this.fgColor = data.fgColor;
        this.bgColor = data.bgColor;
        this.owner = null;
    }

    setOwner(owner: GameObject) {
        this.owner = owner;
    }

    draw(display: Display, camera: Camera, map: GameMap) {
        if (this.owner && map[this.owner.y][this.owner.x].explored) {
            const { x, y } = camera.worldToScreen(this.owner.x, this.owner.y);
            display.draw(x, y, this.char, this.fgColor, this.bgColor);
        }
    }
}
