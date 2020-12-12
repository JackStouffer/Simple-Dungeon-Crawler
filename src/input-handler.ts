import { Entity, World } from "ape-ecs";

import globals from "./globals";
import input from "./input";
import {
    Command,
    getPlayerMovementPath,
    GoToLocationCommand,
    UseItemCommand,
    UseSpellCommand,
    InteractCommand
} from "./commands";
import { distanceBetweenPoints, getEntitiesAtLocation, GameMap, Point } from "./map";
import { Nullable } from "./util";
import {
    HitPointsComponent,
    InputHandlingComponent,
    InteractableTypeComponent,
    PlannerAIComponent,
    PositionComponent,
    SpeedComponent
} from "./entity";
import { SpellData } from "./skills";

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
 */
export function mouseTarget(
    ecs: World,
    map: GameMap,
    mousePosition: Point
): Nullable<Entity> {
    const entities = getEntitiesAtLocation(ecs, mousePosition.x, mousePosition.y);

    if (mousePosition.x >= map[0].length ||
        mousePosition.y >= map.length ||
        map[mousePosition.y][mousePosition.x].visible === false) {
        return null;
    }

    // SPEED
    const res = entities
        .filter(e => {
            const hpData = e.getOne(HitPointsComponent);
            const interactableData = e.getOne(InteractableTypeComponent);
            return hpData !== undefined || interactableData !== undefined;
        })
        .sort((a, b) => {
            const plannerA = a.getOne(PlannerAIComponent);
            const plannerB = b.getOne(PlannerAIComponent);

            if (plannerA !== undefined && plannerB === undefined) { return -1; }
            if (plannerA === undefined && plannerB === undefined) { return 0; }
            if (plannerA === undefined && plannerB !== undefined) { return 1; }
            if (plannerA !== undefined && plannerB !== undefined) { return 1; }
            return -1;
        })[0];

    return res ?? null;
}

/**
 * Returns a list of Points that represent the area being targeted by
 * the player.
 */
export function getTargetingReticle(inputState: InputHandlingComponent): Point[] {
    if (inputState.state !== PlayerState.Target) { throw new Error("Cannot get reticle outside of targeting state"); }

    const ret: Point[] = [];

    const mousePosition = input.getMousePosition();
    if (mousePosition === null) { return ret; }

    if (inputState.spellForTarget !== null) {
        const spellData = SpellData[inputState.spellForTarget.id];
        if (spellData.areaOfEffect !== undefined) {
            for (let dx = 0; dx < spellData.areaOfEffect.width; dx++) {
                for (let dy = 0; dy < spellData.areaOfEffect.height; dy++) {
                    switch (inputState.reticleRotation) {
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

export function handleInput(
    ecs: World,
    map: GameMap,
    triggerMap: Map<string, Entity>,
    player: Entity
): Nullable<Command> {
    if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter cannot be null"); }

    const inputState = player.getOne(InputHandlingComponent);
    const playerPosition = player.getOne(PositionComponent);
    const speedData = player.getOne(SpeedComponent);

    if (inputState === undefined ||
        playerPosition === undefined ||
        speedData === undefined) {
        throw new Error("player is missing data");
    }

    if (inputState.state === PlayerState.Combat) {
        // Key commands
        for (let i = 0; i < inputState.keyCommands.length; i++) {
            const keyCommand = inputState.keyCommands[i];
            if (input.isDown(keyCommand.key)) {
                return keyCommand.command;
            }
        }

        // Mouse input
        const mouseDownPosition = input.getLeftMouseDown();
        if (mouseDownPosition !== null) {
            // Attacking
            if (distanceBetweenPoints(mouseDownPosition, playerPosition) < 1.5) {
                const target = mouseTarget(
                    ecs,
                    map,
                    mouseDownPosition
                );
                if (target !== null && target !== inputState.entity) {
                    return new InteractCommand(target);
                }
            }

            const tile = globals.Game!.map[mouseDownPosition.y][mouseDownPosition.x];
            if (tile === undefined || tile.explored === false) { return null; }

            // Movement
            const path = getPlayerMovementPath(
                ecs,
                playerPosition,
                mouseDownPosition,
                speedData.maxTilesPerMove,
                map
            );
            if (path !== null) {
                return new GoToLocationCommand(
                    path,
                    ecs,
                    map,
                    triggerMap
                );
            }
        }

        return null;
    } else if (inputState.state === PlayerState.Target) {
        globals.gameEventEmitter.emit("tutorial.spellTargeting");

        // Key commands
        for (let i = 0; i < inputState.keyCommands.length; i++) {
            const keyCommand = inputState.keyCommands[i];
            if (input.isDown(keyCommand.key)) {
                return keyCommand.command;
            }
        }

        const position = input.getLeftMouseDown();
        if (position === null) {
            return null;
        }

        let command: Nullable<Command> = null;
        if (inputState.itemForTarget !== null) {
            command = new UseItemCommand(
                inputState.itemForTarget.id,
                ecs,
                position,
                map,
                inputState.reticleRotation
            );
        } else if (inputState.spellForTarget !== null) {
            command = new UseSpellCommand(
                inputState.spellForTarget.id,
                ecs,
                position,
                map,
                inputState.reticleRotation
            );
        }

        inputState.state = PlayerState.Combat;
        inputState.itemForTarget = null;
        inputState.spellForTarget = null;
        inputState.update();
        return command;
    }

    return null;
}
