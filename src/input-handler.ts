import globals from "./globals";
import { KeyCommand, mouseTarget } from "./game";
import input from "./input";
import {
    Command,
    moveCommand,
    openInventoryCommand,
    getItemCommand,
    openSpellsCommand,
    useItemCommand,
    useSpellCommand,
} from "./commands";
import { GameObject } from "./object";
import { displayMessage } from "./ui";
import { InventoryItemDetails } from "./inventory";
import { SpellFighterDetails } from "./fighter";

export interface InputHandler {
    owner: GameObject;
    keyCommands?: KeyCommand[];
    itemForTarget?: InventoryItemDetails;
    spellForTarget?: SpellFighterDetails;

    setOwner: (owner: GameObject) => void;
    handleInput: () => Command;
    setState?: (state: any) => void;
}

export enum PlayerState {
    Gameplay,
    Target
}

export class PlayerInputHandler implements InputHandler {
    private state: PlayerState;
    keyCommands: KeyCommand[];
    owner: GameObject;
    itemForTarget: InventoryItemDetails;
    spellForTarget: SpellFighterDetails;

    constructor() {
        this.owner = null;
        this.state = PlayerState.Gameplay;
        this.keyCommands = [
            { key: "w", description: "Move Up", command: moveCommand(0, 8) },
            { key: "e", description: "Move Up Right", command: moveCommand(1, 8) },
            { key: "d", description: "Move Right", command: moveCommand(2, 8) },
            { key: "c", description: "Move Down Right", command: moveCommand(3, 8) },
            { key: "s", description: "Move Down", command: moveCommand(4, 8) },
            { key: "z", description: "Move Down Left", command: moveCommand(5, 8) },
            { key: "a", description: "Move Left", command: moveCommand(6, 8) },
            { key: "q", description: "Move Up Left", command: moveCommand(7, 8) },
            { key: "i", description: "Inventory", command: openInventoryCommand() },
            { key: "g", description: "Get Item", command: getItemCommand() },
            { key: "m", description: "Spells", command: openSpellsCommand() }
        ];
    }

    setOwner(owner: GameObject): void {
        this.owner = owner;
    }

    setState(state: PlayerState): void {
        this.state = state;
    }

    handleInput(): Command {
        if (this.state === PlayerState.Gameplay) {
            for (let i = 0; i < this.keyCommands.length; i++) {
                const keyCommand = this.keyCommands[i];
                if (input.isDown(keyCommand.key)) {
                    return keyCommand.command;
                }
            }
        } else if (this.state === PlayerState.Target) {
            globals.gameEventEmitter.emit("tutorial.spellTargeting");

            const e: MouseEvent = input.getMouseEvent();
            if (!e) {
                return null;
            }

            const target: GameObject = mouseTarget(
                e,
                globals.Game.gameObjects,
                globals.Game.gameCamera
            );
            if (!target) {
                displayMessage("Canceled casting");
                this.itemForTarget = null;
                this.spellForTarget = null;
                globals.Game.hookMouseLook();
                return null;
            }

            let command: Command = null;
            if (this.itemForTarget) {
                command = useItemCommand(this.itemForTarget.id, target);
            } else if (this.spellForTarget) {
                command = useSpellCommand(this.spellForTarget.id, target);
            }

            globals.Game.hookMouseLook();
            this.state = PlayerState.Gameplay;
            this.itemForTarget = null;
            this.spellForTarget = null;
            return command;
        }

        return null;
    }
}
