import { RNG } from "./rot/index";
import { SpeedActor } from "./rot/scheduler/speed";

import globals from "./globals";
import { ObjectData, BASE_SPEED, DeathType } from "./data";
import { PlanningAI, ChestAI, DroppedItemAI, AIComponent } from "./ai/components";
import {
    GiveItemsInteractable,
    GiveSpellInteractable,
    LoadLevelInteractable,
    DoorInteractable,
    InteractableComponent
} from "./interactable";
import { BasicInventory, InventoryComponent } from "./inventory";
import {
    BasicGraphics,
    TransparencyGraphics,
    DrawAfterSeen,
    GraphicsComponent
} from "./graphics";
import { LightingComponent, ReflectivityLighting, PlayerLighting } from "./lighting";
import { BasicFighter, FighterComponent } from "./fighter";
import { displayMessage } from "./ui";
import { GameMap, PathNode } from "./map";

/**
 * Base class representing all objects in the game. Uses the
 * Entity/Component design pattern so that the only thing that
 * this object directly controls is its position, whether it
 * has collision, and its name.
 *
 * The act method is the method called by the engine every turn.
 */
export class GameObject implements SpeedActor {
    readonly type: string;
    name: string;
    x: number;
    y: number;
    blocks: boolean;
    blocksSight: boolean;
    ai: AIComponent;
    graphics: GraphicsComponent;
    lighting: LightingComponent;
    fighter: FighterComponent & SpeedActor;
    inventoryComponent: InventoryComponent;
    interactable: InteractableComponent;

    constructor(type: string, x: number, y: number, name: string, blocks=false, blocksSight=false) {
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

    /**
     * Give this object graphics
     * @param ai {GraphicsComponent} The graphic component instance
     */
    setGraphics(graphics: GraphicsComponent): void {
        if (graphics === null && this.graphics !== null) {
            this.graphics.setOwner(null);
            this.graphics = null;
            return;
        }

        if (graphics === null && this.graphics === null) {
            return;
        }

        graphics.setOwner(this);
        this.graphics = graphics;
    }

    /**
     * Give this object lighting
     * @param ai {LightingComponent} The lighting component instance
     */
    setLighting(lighting: LightingComponent): void {
        if (lighting === null && this.lighting !== null) {
            this.lighting.setOwner(null);
            this.lighting = null;
            return;
        }

        if (lighting === null && this.lighting === null) {
            return;
        }

        lighting.setOwner(this);
        this.lighting = lighting;
    }

    /**
     * Give this object an fighter
     * @param ai {FighterComponent} The fighter instance
     */
    setFighter(fighter: FighterComponent & SpeedActor): void {
        if (fighter === null && this.fighter !== null) {
            this.fighter.setOwner(null);
            this.fighter = null;
            return;
        }

        if (fighter === null && this.fighter === null) {
            return;
        }

        fighter.setOwner(this);
        this.fighter = fighter;
    }

    /**
     * Give this object an AI
     * @param ai {AIComponent} The AI instance
     */
    setAI(ai: AIComponent): void {
        if (ai === null && this.ai !== null) {
            this.ai.setOwner(null);
            this.ai = null;
            return;
        }

        if (ai === null && this.ai === null) {
            return;
        }

        ai.setOwner(this);
        this.ai = ai;
    }

    /**
     * Give this object inventory
     * @param ai {InventoryComponent} The inventory component instance
     */
    setInventory(inventoryComponent: InventoryComponent): void {
        if (inventoryComponent === null && this.inventoryComponent !== null) {
            this.inventoryComponent.setOwner(null);
            this.inventoryComponent = null;
            return;
        }

        if (inventoryComponent === null && this.inventoryComponent === null) {
            return;
        }

        inventoryComponent.setOwner(this);
        this.inventoryComponent = inventoryComponent;
    }

    /**
     * Give this object interaction
     * @param ai {InteractableComponent} The interactable component instance
     */
    setInteractable(interactable: InteractableComponent): void {
        if (interactable === null && this.interactable !== null) {
            this.interactable.setOwner(null);
            this.interactable = null;
            return;
        }

        if (interactable === null && this.interactable === null) {
            return;
        }

        interactable.setOwner(this);
        this.interactable = interactable;
    }

    /**
     * @returns {number} The actor's speed
     */
    getSpeed(): number {
        if (this.fighter) {
            return this.fighter.getSpeed();
        }
        return BASE_SPEED;
    }

    /**
     * Run the commands from the AI and run the fighter's act function
     * @param map the world map
     * @param gameObjects list of current game objects
     * @param pathNodes map of nodes by id
     * @returns {boolean} did the object use up their turn
     */
    act(map: GameMap, gameObjects: GameObject[], pathNodes: Map<number, PathNode>): boolean {
        let acted: boolean = true;

        if (this.ai) {
            const command = this.ai.act(map, gameObjects, pathNodes);
            if (command) {
                acted = command(this);
            }
        }

        if (this.fighter) {
            this.fighter.act();
        }

        return acted;
    }
}

/**
 * Use an id to grab object data and create a new GameObject
 * @param  {String} id     The object id
 * @return {GameObject}    A GameObject with the components and params given in the data
 */
export function createObject(id: string, x: number = 0, y: number = 0): GameObject {
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
            case "planning_ai":
                object.setAI(new PlanningAI(data));
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
            case "transparency_graphics":
                object.setGraphics(new TransparencyGraphics(data.char, data.fgColor));
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
                object.setLighting(
                    new ReflectivityLighting(data.lightingColor, data.lightingRange)
                );
                break;
            case "player_lighting":
                object.setLighting(
                    new PlayerLighting(data.lightingColor, data.lightingRange)
                );
                break;
            default:
                throw new Error(`Unhandled Lighting type ${data.lighting}`);
        }
    }

    if (data.fighter) {
        let callback;

        switch (data.onDeath) {
            case DeathType.Default:
                callback = enemyDeathCallback;
                break;
            case DeathType.RemoveFromWorld:
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

        if (data.spells) {
            data.spells.forEach(s => object.fighter.addSpellById(s));
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
                if (RNG.getUniform() <= data.inventoryPool[i].probability) {
                    object.inventoryComponent.addItem(data.inventoryPool[i].itemID);
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
export function enemyDeathCallback(target: GameObject): void {
    displayMessage(target.name + " has been killed");

    target.name = `Remains of a ${target.name}`;
    target.blocks = false;
    target.setGraphics(new BasicGraphics("%", "black", "red"));
    target.setFighter(null);
    target.setAI(null);
    target.setInteractable(null);

    if (target.inventoryComponent?.getItems().length > 0) {
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
export function removeDeathCallback(target: GameObject): void {
    if (target.inventoryComponent.getItems().length > 0) {
        globals.gameEventEmitter.emit("tutorial.pickUpItem");

        const item = createObject("dropped_item", target.x, target.y);
        item.inventoryComponent = target.inventoryComponent;
        globals.Game.addObject(item);
    }

    if (target.type === "crate") {
        globals.gameEventEmitter.emit("crate.break");
    }
    if (target.type === "barrel") {
        globals.gameEventEmitter.emit("barrel.break");
    }

    globals.Game.removeObject(target);
}
