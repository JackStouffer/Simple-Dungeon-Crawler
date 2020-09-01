"use strict";

import { RNG } from "rot-js";

import globals from "./globals";
import { ObjectData } from "./data";
import { BasicMonsterAI, PatrollingMonsterAI, ChestAI, DroppedItemAI } from "./ai";
import { PlayerControlAI } from "./player";
import { GiveItemsInteractable, GiveSpellInteractable, LoadLevelInteractable, DoorInteractable } from "./interactable";
import { BasicInventory } from "./inventory";
import { BasicGraphics, DrawAfterSeen } from "./graphics";
import { ReflectivityLighting, PlayerLighting } from "./lighting";
import { BasicFighter } from "./fighter";


/**
 * Base class representing all objects in the game. Uses the
 * Entity/Component design pattern so that the only thing that
 * this object directly controls is its position, whether it
 * has collision, and its name.
 *
 * The act method is the method called by the engine every turn.
 */
class GameObject {
    constructor(type, x, y, name, blocks=false, blocksSight=false) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.name = name;
        this.blocks = blocks;
        this.blocksSight = blocksSight;

        this.graphics = null;
        this.lighting = null;
        this.fighter = null;
        this.ai = null;
        this.inventoryComponent = null;
        this.interactable = null;
    }

    setGraphics(graphics) {
        graphics.setOwner(this);
        this.graphics = graphics;
    }

    setLighting(lighting) {
        lighting.setOwner(this);
        this.lighting = lighting;
    }

    setFighter(fighter) {
        fighter.setOwner(this);
        this.fighter = fighter;
    }

    setAI(ai) {
        ai.setOwner(this);
        this.ai = ai;
    }

    setInventory(inventoryComponent) {
        inventoryComponent.setOwner(this);
        this.inventoryComponent = inventoryComponent;
    }

    setInteractable(interactable) {
        interactable.setOwner(this);
        this.interactable = interactable;
    }

    act() {
        if (this.ai && typeof this.ai.act === "function") {
            this.ai.act();
        }
        if (this.fighter && typeof this.fighter.act === "function") {
            this.fighter.act();
        }
    }
}
export { GameObject };

/**
 * Use an id to grab object data and create a new GameObject
 * @param  {String} id     The object id
 * @return {GameObject}    A GameObject with the components and params given in the data
 */
export function createObject(id, x=0, y=0) {
    if (!(id in ObjectData)) { throw new Error(`${id} is not valid object id`); }

    const data = ObjectData[id];
    const object = new GameObject(
        id,
        x, y,
        data.name,
        data.blocks,
        data.blocksSight
    );

    if (data.ai) {
        switch (data.ai) {
        case "player_control_ai":
            object.setAI(new PlayerControlAI());
            break;
        case "basic_monster_ai":
            object.setAI(new BasicMonsterAI(data.sightRange));
            break;
        case "patrolling_monster_ai":
            object.setAI(new PatrollingMonsterAI(data.sightRange));
            break;
        case "chest_ai":
            object.setAI(new ChestAI(data.bgColor, data.emptyColor));
            break;
        case "dropped_item_ai":
            object.setAI(new DroppedItemAI());
            break;
        default:
            throw new Error(`Unhandled AI type ${data.ai}`);
        }
    }

    if (data.graphics) {
        switch (data.graphics) {
        case "basic_graphics":
            object.setGraphics(new BasicGraphics(data.char, data.fgColor, data.bgColor));
            break;
        case "draw_after_seen":
            object.setGraphics(new DrawAfterSeen(data.char, data.fgColor, data.bgColor));
            break;
        default:
            throw new Error(`Unhandled Graphics type ${data.graphics}`);
        }
    }

    if (data.lighting) {
        switch (data.lighting) {
        case "reflectivity":
            object.setLighting(new ReflectivityLighting(data.lightingColor, data.lightingRange));
            break;
        case "player_lighting":
            object.setLighting(new PlayerLighting(data.lightingColor, data.lightingRange));
            break;
        default:
            throw new Error(`Unhandled Lighting type ${data.lighting}`);
        }
    }

    if (data.fighter) {
        let callback;

        switch (data.onDeath) {
        case "default":
            callback = enemyDeathCallback;
            break;
        case "remove_from_world":
            callback = removeDeathCallback;
            break;
        default:
            throw new Error(`Unhandled onDeath type ${data.onDeath}`);
        }

        switch (data.fighter) {
        case "basic_fighter":
            object.setFighter(new BasicFighter(
                data,
                callback
            ));
            break;
        default:
            throw new Error(`Unhandled Fighter type ${data.fighter}`);
        }
    }

    if (data.inventory) {
        switch (data.inventory) {
        case "basic_inventory":
            object.setInventory(new BasicInventory());
            break;
        default:
            throw new Error(`Unhandled Inventory type ${data.inventory}`);
        }

        if (data.inventoryPool) {
            for (let i = 0; i < data.inventoryPool.length; i++) {
                if (RNG.getUniform() <= data.inventoryPool[i][1]) {
                    object.inventoryComponent.addItem(data.inventoryPool[i][0]);
                }
            }
        }
    }

    if (data.interactable) {
        switch (data.interactable) {
        case "give_items_interactable":
            object.setInteractable(new GiveItemsInteractable());
            break;
        case "give_spell_interactable":
            object.setInteractable(new GiveSpellInteractable());
            break;
        case "load_level_interactable":
            object.setInteractable(new LoadLevelInteractable());
            break;
        case "door_interactable":
            object.setInteractable(new DoorInteractable());
            break;
        default:
            throw new Error(`Unhandled Interactable type ${data.interactable}`);
        }
    }

    return object;
}

/**
 * Removes the AI, fighter, and intractable off of an object. Changes graphics
 * to dead body graphics and sets blocking to false. Also spawns a dropped item
 * if there were items in the inventory.
 *
 * @param  {GameObject} target    The GameObject that was killed
 * @return {void}
 */
export function enemyDeathCallback(target) {
    globals.Game.displayMessage(target.name + " has been killed");
    target.graphics.char = "%";
    target.graphics.fgColor = "green";
    target.graphics.bgColor = "darkred";
    target.blocks = false;
    target.fighter = null;
    target.ai = null;
    target.interactable = null;
    target.name = "Remains of a " + target.name;

    if (target.inventoryComponent.getIDsAndCounts().length > 0) {
        const item = createObject("dropped_item", target.x, target.y);
        item.inventoryComponent = target.inventoryComponent;
        globals.Game.addObject(item);
    }

    target.inventoryComponent = null;
}

/**
 * Removes self from world and scheduler. Also spawns a dropped item
 * if there were items in the inventory.
 *
 * @param  {GameObject} target    The GameObject that was killed
 * @return {void}
 */
export function removeDeathCallback(target) {
    if (target.inventoryComponent.getIDsAndCounts().length > 0) {
        const item = createObject("dropped_item", target.x, target.y);
        item.inventoryComponent = target.inventoryComponent;
        globals.Game.addObject(item);
    }

    globals.Game.removeObject(target);
}
