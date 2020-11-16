import { RNG } from "./rot/index";
import { SpeedActor } from "./rot/scheduler/speed";

import globals from "./globals";
import { ObjectData, BASE_SPEED, DeathType } from "./data";
import { PlanningAI, ChestAI, DroppedItemAI, AIComponent, RemoveAfterNTurns } from "./ai/components";
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
    GraphicsComponent,
    PlayerGraphics
} from "./graphics";
import { LightingComponent, ReflectivityLighting, PlayerLighting } from "./lighting";
import { BasicFighter, FighterComponent } from "./fighter";
import { InputHandler, PlayerInputHandler } from "./input-handler";
import { displayMessage } from "./ui";
import { GameMap, PathNode } from "./map";
import { EventTrigger, FireTrigger, TriggerComponent } from "./trigger";
import { Nullable } from "./util";

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
    name: Nullable<string>;
    x: number;
    y: number;
    blocks: boolean;
    blocksSight: boolean;
    ai: Nullable<AIComponent>;
    inputHandler: Nullable<InputHandler>;
    graphics: Nullable<GraphicsComponent>;
    lighting: Nullable<LightingComponent>;
    fighter: Nullable<FighterComponent & SpeedActor>;
    inventory: Nullable<InventoryComponent>;
    interactable: Nullable<InteractableComponent>;
    trigger: Nullable<TriggerComponent>;

    constructor(
        type: string,
        x: number,
        y: number,
        name: Nullable<string> = null,
        blocks: boolean = false,
        blocksSight: boolean = false
    ) {
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
        this.inputHandler = null;
        this.inventory = null;
        this.interactable = null;
        this.trigger = null;
    }

    /**
     * Give this object graphics
     * @param ai {GraphicsComponent} The graphic component instance
     */
    setGraphics(graphics: Nullable<GraphicsComponent>): void {
        if (graphics === null && this.graphics !== null) {
            this.graphics.setOwner(null);
            this.graphics = null;
            return;
        }

        if (graphics === null) {
            return;
        }

        graphics.setOwner(this);
        this.graphics = graphics;
    }

    /**
     * Give this object lighting
     * @param ai {LightingComponent} The lighting component instance
     */
    setLighting(lighting: Nullable<LightingComponent>): void {
        if (lighting === null && this.lighting !== null) {
            this.lighting.setOwner(null);
            this.lighting = null;
            return;
        }

        if (lighting === null) {
            return;
        }

        lighting.setOwner(this);
        this.lighting = lighting;
    }

    /**
     * Give this object an fighter
     * @param ai {FighterComponent} The fighter instance
     */
    setFighter(fighter: (FighterComponent & SpeedActor) | null): void {
        if (fighter === null && this.fighter !== null) {
            this.fighter.setOwner(null);
            this.fighter = null;
            return;
        }

        if (fighter === null) {
            return;
        }

        fighter.setOwner(this);
        this.fighter = fighter;
    }

    /**
     * Give this object an AI
     * @param ai {AIComponent} The AI instance
     */
    setAI(ai: AIComponent | null): void {
        if (ai === null && this.ai !== null) {
            this.ai.setOwner(null);
            this.ai = null;
            return;
        }

        if (ai === null) {
            return;
        }

        ai.setOwner(this);
        this.ai = ai;
    }

    /**
     * Give this object inventory
     * @param ai {InventoryComponent} The inventory component instance
     */
    setInventory(inventory: InventoryComponent | null): void {
        if (inventory === null && this.inventory !== null) {
            this.inventory.setOwner(null);
            this.inventory = null;
            return;
        }

        if (inventory === null) {
            return;
        }

        inventory.setOwner(this);
        this.inventory = inventory;
    }

    /**
     * Give this object interaction
     * @param ai {InteractableComponent} The interactable component instance
     */
    setInteractable(interactable: InteractableComponent | null): void {
        if (interactable === null && this.interactable !== null) {
            this.interactable.setOwner(null);
            this.interactable = null;
            return;
        }

        if (interactable === null) {
            return;
        }

        interactable.setOwner(this);
        this.interactable = interactable;
    }

    setInputHandler(handler: InputHandler | null): void {
        if (handler === null && this.inputHandler !== null) {
            this.inputHandler.setOwner(null);
            this.inputHandler = null;
            return;
        }

        if (handler === null) {
            return;
        }

        handler.setOwner(this);
        this.inputHandler = handler;
    }

    setTrigger(trigger: TriggerComponent | null): void {
        if (trigger === null && this.trigger !== null) {
            this.trigger.owner = null;
            this.trigger = null;
            return;
        }

        if (trigger === null) {
            return;
        }

        trigger.owner = this;
        this.trigger = trigger;
    }

    /**
     * @returns {number} The actor's speed
     */
    getSpeed(): number {
        if (this.fighter !== null) {
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

        if (this.ai !== null) {
            const command = this.ai.act(map, gameObjects, pathNodes);
            if (command !== null) {
                acted = command(this);
            }
        }

        if (this.fighter !== null) {
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

    if (data.ai !== null) {
        switch (data.ai) {
            case "planning_ai":
                object.setAI(new PlanningAI(data));
                break;
            case "chest_ai":
                object.setAI(new ChestAI(data));
                break;
            case "dropped_item_ai":
                object.setAI(new DroppedItemAI());
                break;
            case "remove_after_n_turns":
                object.setAI(new RemoveAfterNTurns(data));
                break;
            default:
                throw new Error(`Unhandled AI type ${data.ai}`);
        }
    }

    if (data.graphics !== null) {
        switch (data.graphics) {
            case "player_graphics":
                object.setGraphics(new PlayerGraphics(data));
                break;
            case "basic_graphics":
                object.setGraphics(new BasicGraphics(data));
                break;
            case "transparency_graphics":
                object.setGraphics(new TransparencyGraphics(data));
                break;
            case "draw_after_seen":
                object.setGraphics(new DrawAfterSeen(data));
                break;
            default:
                throw new Error(`Unhandled Graphics type ${data.graphics}`);
        }
    }

    if (data.lighting !== null) {
        if (data.lightingColor === null || data.lightingRange === null) {
            throw new Error("Cannot set lighting without lightingColor and lightingRange");
        }

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

    if (data.fighter !== null) {
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

        if (data.spells !== null) {
            data.spells.forEach(s => object.fighter!.addSpellById(s));
        }
    }

    if (data.inventory !== null) {
        switch (data.inventory) {
            case "basic_inventory":
                object.setInventory(new BasicInventory());
                break;
            default:
                throw new Error(`Unhandled Inventory type ${data.inventory}`);
        }

        if (data.inventoryPool !== null) {
            for (let i = 0; i < data.inventoryPool.length; i++) {
                if (RNG.getUniform() <= data.inventoryPool[i].probability) {
                    object.inventory!.addItem(data.inventoryPool[i].itemID);
                }
            }
        }
    }

    if (data.interactable !== null) {
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

    if (data.input !== null) {
        switch (data.input) {
            case "player_input":
                object.setInputHandler(new PlayerInputHandler());
                break;
            default:
                throw new Error(`Unhandled Interactable type ${data.interactable}`);
        }
    }

    if (data.trigger !== null) {
        switch (data.trigger) {
            case "fire":
                if (data.triggerValue === null) { throw new Error("Cannot create fire trigger without damage"); }
                object.setTrigger(new FireTrigger(data.triggerValue, 3, 5));
                break;
            case "event":
                object.setTrigger(new EventTrigger());
                break;
            default:
                throw new Error(`Unhandled trigger type ${data.trigger}`);
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
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    displayMessage(target.name + " has been killed");

    target.name = `Remains of a ${target.name}`;
    target.blocks = false;
    target.setGraphics(new BasicGraphics(ObjectData["dead_body"]));
    target.setFighter(null);
    target.setAI(null);
    target.setInteractable(null);

    if (target.inventory !== null && target.inventory.getItems().length > 0) {
        const item = createObject("dropped_item", target.x, target.y);
        item.inventory = target.inventory;
        globals.Game.addObject(item);
    }

    target.inventory = null;
}

/**
 * Removes self from world and scheduler. Also spawns a dropped item
 * if there were items in the inventory.
 *
 * @param  {GameObject} target    The GameObject that was killed
 * @return {void}
 */
export function removeDeathCallback(target: GameObject): void {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }

    if (target.inventory !== null && target.inventory.getItems().length > 0) {
        globals.gameEventEmitter.emit("tutorial.pickUpItem");

        const item = createObject("dropped_item", target.x, target.y);
        item.inventory = target.inventory;
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
