'use strict';

/**
 * Base class representing all actors and objects in the game
 */
class GameObject {
    constructor(x, y, char, fgcolor, bgcolor, name, blocks=false, fighter=null, ai=null) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.fgcolor = fgcolor;
        this.bgcolor = bgcolor;
        this.name = name;
        this.blocks = blocks;

        if (fighter) {
            this.fighter = fighter;
            fighter.owner = this;
        }

        if (ai) {
            this.ai = ai;
            ai.owner = this;
        }
    }

    act() {
        if (this.ai) {
            this.ai.act();
        }
    }
}

class Chest extends GameObject {
    item = null;
    
    interact() {
        if (this.item) {
            Game.displayMessage("Found a " + this.item.name);
            Game.player.inventory.push(this.item);
            this.item = null;
            this.bgcolor = "purple";
            this.name = "Empty Chest"
        } else {
            Game.displayMessage("The chest is empty");
        }
    }
}

class Stairs extends GameObject {
    interact() {
        Game.nextLevel();
    }
}
