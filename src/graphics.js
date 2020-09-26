"use strict";

import { getObjectsAtLocation } from "./map";

/**
 * Graphics component which simply draws the character with the fore
 * and background color at the owner's x and y coordinates if the tile
 * it's on is visible.
 */
class BasicGraphics {
    constructor(char, fgColor, bgColor) {
        this.char = char;
        this.fgColor = fgColor;
        this.bgColor = bgColor;
        this.owner = null;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    draw(display, map) {
        if (this.owner && map[this.owner.y][this.owner.x].isVisibleAndLit()) {
            display.draw(this.owner.x, this.owner.y, this.char, this.fgColor, this.bgColor);
        }
    }
}

/**
 * Graphics component which handles the odd behavior with ROT.js and
 * transparent backgrounds
 */
class TransparencyGraphics {
    constructor(char, fgColor) {
        this.char = char;
        this.fgColor = fgColor;
        this.owner = null;
    }

    setOwner(owner) {
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
    draw(display, map, objects) {
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

            display.draw(
                this.owner.x,
                this.owner.y,
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
class DrawAfterSeen {
    constructor(char, fgColor, bgColor) {
        this.char = char;
        this.fgColor = fgColor;
        this.bgColor = bgColor;
        this.owner = null;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    draw(display, map) {
        if (this.owner && map[this.owner.y][this.owner.x].explored) {
            display.draw(this.owner.x, this.owner.y, this.char, this.fgColor, this.bgColor);
        }
    }
}
export { BasicGraphics, TransparencyGraphics, DrawAfterSeen };
