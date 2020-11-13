import globals from "./globals";
import { mouseTarget } from "./game";
import input from "./input";
import {
    Command,
    goToLocationCommand,
    openInventoryCommand,
    getItemCommand,
    openSpellsCommand,
    useItemCommand,
    useSpellCommand,
    noOpCommand,
    interactCommand,
    getActorMovementPath
} from "./commands";
import { GameObject } from "./object";
import { displayMessage } from "./ui";
import { InventoryItemDetails } from "./inventory";
import { SpellFighterDetails } from "./fighter";
import { distanceBetweenObjects, GameMap } from "./map";
import { Nullable } from "./util";

export interface KeyCommand {
    key: string;
    description: string;
    command: Command;
}

export enum PlayerState {
    Combat,
    Target
}

export interface InputHandler {
    owner: Nullable<GameObject>;
    keyCommands: KeyCommand[];
    itemForTarget: Nullable<InventoryItemDetails>;
    spellForTarget: Nullable<SpellFighterDetails>;

    setOwner: (owner: Nullable<GameObject>) => void;
    handleInput: (map: GameMap, objects: GameObject[]) => Nullable<Command>;
}

export class PlayerInputHandler implements InputHandler {
    state: PlayerState;
    keyCommands: KeyCommand[];
    owner: Nullable<GameObject>;
    itemForTarget: Nullable<InventoryItemDetails>;
    spellForTarget: Nullable<SpellFighterDetails>;

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

    setOwner(owner: Nullable<GameObject>): void {
        this.owner = owner;
    }


    }

    handleInput(map: GameMap, objects: GameObject[]): Nullable<Command> {
        if (this.owner === null) { throw new Error("Can't handle input without an owner"); }

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
                    const target = mouseTarget(
                        mouseDownPosition,
                        objects
                    );
                    if (target !== null && target !== this.owner) {
                        return interactCommand(target);
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
                    return goToLocationCommand(
                        path,
                        map,
                        objects
                    );
                }
            }

            return null;
        } else if (this.state === PlayerState.Target) {
            globals.gameEventEmitter.emit("tutorial.spellTargeting");

            const position = input.getLeftMouseDown();
            if (position === null) {
                return null;
            }

            const target = mouseTarget(position, objects);
            if (target !== null) {
                displayMessage("Canceled casting");
                this.itemForTarget = null;
                this.spellForTarget = null;
                return null;
            }

            let command: Nullable<Command> = null;
            if (this.itemForTarget !== null) {
                command = useItemCommand(this.itemForTarget.id, target);
            } else if (this.spellForTarget !== null) {
                command = useSpellCommand(this.spellForTarget.id, target);
            }

            this.state = PlayerState.Combat;
            this.itemForTarget = null;
            this.spellForTarget = null;
            return command;
        }

        return null;
    }
}
