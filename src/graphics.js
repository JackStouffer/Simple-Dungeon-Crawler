'use strict';

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
