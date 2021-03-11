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
    EntityMap,
    HitPointsComponent,
    InputHandlingComponent,
    InteractableTypeComponent,
    PlannerAIComponent,
    PositionComponent,
    SpeedComponent
} from "./entity";

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
 * has an interactable or fighter. If there is no object, return null
 */
export function mouseTarget(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    mousePosition: Point
): Nullable<Entity> {
    if (mousePosition.x >= map[0][0].length ||
        mousePosition.y >= map[0].length ||
        map[0][mousePosition.y][mousePosition.x]!.visible === false) {
        return null;
    }

    const res = getEntitiesAtLocation(entityMap, mousePosition.x, mousePosition.y)
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

export function playerInput(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
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
            if (distanceBetweenPoints(mouseDownPosition, playerPosition.tilePosition()) < 1.5) {
                const target = mouseTarget(
                    ecs,
                    map,
                    entityMap,
                    mouseDownPosition
                );
                if (target !== null && target !== inputState.entity) {
                    return new InteractCommand(player, target);
                }
            }

            const tile = globals.Game!.map[0][mouseDownPosition.y][mouseDownPosition.x];
            if (tile === null || tile.explored === false) { return null; }

            // Movement
            const path = getPlayerMovementPath(
                playerPosition.tilePosition(),
                mouseDownPosition,
                speedData.maxTilesPerMove,
                map,
                entityMap
            );
            if (path !== null) {
                return new GoToLocationCommand(
                    player,
                    path
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
                player,
                inputState.itemForTarget.id,
                position,
                inputState.reticleRotation
            );
        } else if (inputState.spellForTarget !== null) {
            command = new UseSpellCommand(
                player,
                inputState.spellForTarget.id,
                position,
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
