import globals from "./globals";
import input from "./input";
import {
    Command,
    getActorMovementPath,
    GoToLocationCommand,
    OpenInventoryCommand,
    OpenSpellsCommand,
    UseItemCommand,
    UseSpellCommand,
    NoOpCommand,
    InteractCommand,
    RotateReticleCommand
} from "./commands";
import { GameObject } from "./object";
import { InventoryItemDetails } from "./inventory";
import { distanceBetweenObjects, getObjectsAtLocation, GameMap, Point } from "./map";
import { Nullable } from "./util";
import { SpellData, SpellDataDetails } from "./data";

export interface KeyCommand {
    key: string;
    description: string;
    command: Command;
}

export enum PlayerState {
    Combat,
    Target
}

/**
 * Given a mouse position return the object at that location which
 * has an interactable or fighter. If there is no object, return null.
 * @param {Point} mousePosition - The mouse position
 * @param {GameMap} map - The current game map
 * @param {GameObject[]} gameObjects - The objects on the map
 * @return {Nullable<GameObject>} A game object
 */
export function mouseTarget(
    mousePosition: Point,
    map: GameMap,
    gameObjects: GameObject[]
): Nullable<GameObject> {
    let target = null;
    const objects = getObjectsAtLocation(gameObjects, mousePosition.x, mousePosition.y);

    if (mousePosition.x >= map[0].length ||
        mousePosition.y >= map.length ||
        map[mousePosition.y][mousePosition.x].visible === false) {
        return null;
    }

    for (let i = 0; i < objects.length; i++) {
        if (objects[i].fighter !== null || objects[i].interactable !== null) {
            target = objects[i];
            break;
        }
    }

    return target;
}

export interface InputHandler {
    state: any;
    reticleRotation: 0 | 90 | 180 | 270;
    owner: Nullable<GameObject>;
    keyCommands: KeyCommand[];
    itemForTarget: Nullable<InventoryItemDetails>;
    spellForTarget: Nullable<SpellDataDetails>;

    handleInput: (map: GameMap, objects: GameObject[]) => Nullable<Command>;
    getTargetingReticle: () => Point[];
}

export class PlayerInputHandler implements InputHandler {
    state: PlayerState;
    reticleRotation: 0 | 90 | 180 | 270;
    keyCommands: KeyCommand[];
    owner: Nullable<GameObject>;
    itemForTarget: Nullable<InventoryItemDetails>;
    spellForTarget: Nullable<SpellDataDetails>;

    constructor() {
        this.owner = null;
        this.reticleRotation = 0;
        this.state = PlayerState.Combat;
        this.itemForTarget = null;
        this.spellForTarget = null;
        this.keyCommands = [
            { key: "i", description: "Inventory", command: new OpenInventoryCommand() },
            { key: "m", description: "Spell Menu", command: new OpenSpellsCommand() },
            { key: "r", description: "Rotate Target Reticle", command: new RotateReticleCommand() },
            { key: "x", description: "Do Nothing", command: new NoOpCommand(true) }
        ];
    }

    /**
     * Returns a list of Points that represent the area being targeted by
     * the player.
     */
    getTargetingReticle(): Point[] {
        if (this.state !== PlayerState.Target) { throw new Error("Cannot get reticle outside of targeting state"); }

        const ret: Point[] = [];

        const mousePosition = input.getMousePosition();
        if (mousePosition === null) { return ret; }

        if (this.spellForTarget !== null) {
            const spellData = SpellData[this.spellForTarget.id];
            if (spellData.areaOfEffect !== null) {
                for (let dx = 0; dx < spellData.areaOfEffect.width; dx++) {
                    for (let dy = 0; dy < spellData.areaOfEffect.height; dy++) {
                        switch (this.reticleRotation) {
                            case 0:
                                ret.push({ x: mousePosition.x + dx, y: mousePosition.y + dy });
                                break;
                            case 90:
                                ret.push({ x: mousePosition.x + dy, y: mousePosition.y + dx });
                                break;
                            case 180:
                                ret.push({ x: mousePosition.x + dx, y: mousePosition.y - dy });
                                break;
                            case 270:
                                ret.push({ x: mousePosition.x - dy, y: mousePosition.y + dx });
                                break;
                            default: break;
                        }
                    }
                }
            } else {
                ret.push({ x: mousePosition.x, y: mousePosition.y });
            }
        } else {
            ret.push({ x: mousePosition.x, y: mousePosition.y });
        }

        return ret;
    }

    handleInput(map: GameMap, objects: GameObject[]): Nullable<Command> {
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter cannot be null"); }
        if (this.owner === null) { throw new Error("Can't handle input without an owner"); }

        if (this.state === PlayerState.Combat) {
            // Key commands
            for (let i = 0; i < this.keyCommands.length; i++) {
                const keyCommand = this.keyCommands[i];
                if (input.isDown(keyCommand.key)) {
                    return keyCommand.command;
                }
            }

            // Movement
            const mouseDownPosition = input.getLeftMouseDown();
            if (mouseDownPosition !== null) {
                if (distanceBetweenObjects(mouseDownPosition, this.owner) < 1.5) {
                    const target = mouseTarget(
                        mouseDownPosition,
                        map,
                        objects
                    );
                    if (target !== null && target !== this.owner) {
                        return new InteractCommand(target);
                    }
                }

                const path = getActorMovementPath(
                    mouseDownPosition.x,
                    mouseDownPosition.y,
                    this.owner,
                    map,
                    objects
                );
                if (path !== null) {
                    return new GoToLocationCommand(
                        path,
                        map,
                        objects
                    );
                }
            }

            return null;
        } else if (this.state === PlayerState.Target) {
            globals.gameEventEmitter.emit("tutorial.spellTargeting");

            // Key commands
            for (let i = 0; i < this.keyCommands.length; i++) {
                const keyCommand = this.keyCommands[i];
                if (input.isDown(keyCommand.key)) {
                    return keyCommand.command;
                }
            }

            const position = input.getLeftMouseDown();
            if (position === null) {
                return null;
            }

            let command: Nullable<Command> = null;
            if (this.itemForTarget !== null) {
                command = new UseItemCommand(this.itemForTarget.id, position, map, objects);
            } else if (this.spellForTarget !== null) {
                command = new UseSpellCommand(
                    this.spellForTarget.id,
                    position,
                    map,
                    objects,
                    this.reticleRotation
                );
            }

            this.state = PlayerState.Combat;
            this.itemForTarget = null;
            this.spellForTarget = null;
            return command;
        }

        return null;
    }
}
