import Path from "./rot/path/index";

import globals from "./globals";
import { createPassableCallback } from "./ai/components";
import { KeyCommand, mouseTarget } from "./game";
import input from "./input";
import { ObjectData } from "./data";
import {
    Command,
    goToLocationCommand,
    openInventoryCommand,
    getItemCommand,
    openSpellsCommand,
    useItemCommand,
    useSpellCommand,
    noOpCommand,
    interactCommand
} from "./commands";
import { GameObject } from "./object";
import { displayMessage } from "./ui";
import { InventoryItemDetails } from "./inventory";
import { SpellFighterDetails } from "./fighter";
import { distanceBetweenObjects, getObjectsAtLocation, GameMap } from "./map";


export enum PlayerState {
    Combat,
    Target
}

export interface InputHandler {
    owner: GameObject;
    keyCommands?: KeyCommand[];
    itemForTarget?: InventoryItemDetails;
    spellForTarget?: SpellFighterDetails;

    setOwner: (owner: GameObject) => void;
    handleInput: (map: GameMap, objects: GameObject[]) => Command;
    setState?: (state: any) => void;
    getState?: () => any;
}

export function getPlayerMovementPath(
    x: number,
    y: number,
    player: GameObject,
    map: GameMap,
    objects: GameObject[]
): number[][] {
    const maxTilesPerMove = ObjectData[player.type].maxTilesPerMove;
    // quick distance check to cut down the number of
    // AStar calcs
    if (distanceBetweenObjects({ x, y }, player) < maxTilesPerMove * 2) {
        const aStar = new Path.AStar(
            x,
            y,
            createPassableCallback(player),
            { topology: 8 }
        );

        if (y >= map.length ||
            x >= map[0].length ||
            !map[y][x].explored ||
            map[y][x].blocks) {
            return;
        }

        if (getObjectsAtLocation(objects, x, y)
            .filter(o => o.blocks)
            .length > 0) {
            return;
        }

        const path: number[][] = [];
        function pathCallback(x: number, y: number) {
            path.push([x, y]);
        }
        aStar.compute(player.x, player.y, pathCallback);

        if (path.length === 0 || path.length > maxTilesPerMove) { return; }

        // remove our own position
        path.shift();
        if (path.length === 0) { return; }
        return path;
    }

    return null;
}

export class PlayerInputHandler implements InputHandler {
    private state: PlayerState;
    keyCommands: KeyCommand[];
    owner: GameObject;
    itemForTarget: InventoryItemDetails;
    spellForTarget: SpellFighterDetails;

    constructor() {
        this.owner = null;
        this.state = PlayerState.Combat;
        this.keyCommands = [
            { key: "i", description: "Inventory", command: openInventoryCommand() },
            { key: "g", description: "Get Item", command: getItemCommand() },
            { key: "m", description: "Spells", command: openSpellsCommand() },
            { key: "x", description: "Do Nothing", command: noOpCommand(true) }
        ];
    }

    setOwner(owner: GameObject): void {
        this.owner = owner;
    }

    getState() {
        return this.state;
    }

    setState(state: PlayerState): void {
        this.state = state;
    }

    handleInput(map: GameMap, objects: GameObject[]): Command {
        if (this.state === PlayerState.Combat) {
            for (let i = 0; i < this.keyCommands.length; i++) {
                const keyCommand = this.keyCommands[i];
                if (input.isDown(keyCommand.key)) {
                    return keyCommand.command;
                }
            }

            const mouseDownPosition = input.getLeftMouseDown();
            if (mouseDownPosition !== null) {
                if (distanceBetweenObjects(mouseDownPosition, this.owner) < 1.5) {
                    const target: GameObject = mouseTarget(
                        mouseDownPosition,
                        objects
                    );
                    if (target) { return interactCommand(target); }
                }

                const path = getPlayerMovementPath(
                    mouseDownPosition.x,
                    mouseDownPosition.y,
                    this.owner,
                    map,
                    objects
                );
                if (path) {
                    return goToLocationCommand(
                        mouseDownPosition.x,
                        mouseDownPosition.y,
                        map,
                        objects
                    );
                }
            }

            return null;
        } else if (this.state === PlayerState.Target) {
            globals.gameEventEmitter.emit("tutorial.spellTargeting");

            const position = input.getLeftMouseDown();
            if (!position) {
                return null;
            }

            const target: GameObject = mouseTarget(position, objects);
            if (!target) {
                displayMessage("Canceled casting");
                this.itemForTarget = null;
                this.spellForTarget = null;
                return null;
            }

            let command: Command = null;
            if (this.itemForTarget) {
                command = useItemCommand(this.itemForTarget.id, target);
            } else if (this.spellForTarget) {
                command = useSpellCommand(this.spellForTarget.id, target);
            }

            this.state = PlayerState.Combat;
            this.itemForTarget = null;
            this.spellForTarget = null;
            return command;
        }
    }
}
