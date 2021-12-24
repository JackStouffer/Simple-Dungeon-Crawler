import { Entity, World } from "ape-ecs";

import globals from "./globals";
import input from "./input";
import {
    Command,
    getPlayerMovementPath,
    GoToLocationCommand,
    UseSkillCommand,
    InteractCommand,
    PhysicalAttackCommand,
    SkillCallback
} from "./commands";
import { tileDistanceBetweenPoints, getEntitiesAtLocation, GameMap, Vector2D } from "./map";
import { clampAngleToOppositeDIR, Nullable } from "./util";
import {
    EntityMap,
    HitPointsComponent,
    InputHandlingComponent,
    InteractableTypeComponent,
    PlannerAIComponent,
    PositionComponent,
    SpeedComponent
} from "./entity";
import { ItemData, ItemDataDetails, SpellData, SpellDataDetails } from "./skills";
import { useItem } from "./inventory";
import { useSpell } from "./fighter";
import { SpellType } from "./constants";

export interface KeyCommand {
    code: string;
    /** nice display for meta keys like Control -> Ctrl */
    keyDisplay: string;
    description: string;
    continuous: boolean;
    command: () => Nullable<Command>;
}

export enum PlayerState {
    Combat,
    Target,
    TargetDirection
}

/**
 * Given a mouse position return the object at that location which
 * has an interactable or fighter. If there is no object, return null
 *
 * @param {World} ecs - The ecs world to use
 * @param {GameMap} map - The ecs world to use
 * @param {EntityMap} entityMap - The ecs world to use
 * @param {Vector2D} mousePosition - the targeted point in map
 * @param {boolean} excludeUninteractable - should ignore entities that don't have hp or an interactable
 */
export function mouseTarget(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    mousePosition: Vector2D,
    excludeUninteractable = true
): Nullable<Entity> {
    if (mousePosition.x >= map.width ||
        mousePosition.y >= map.height ||
        map.visibilityData[mousePosition.y][mousePosition.x].visible === false) {
        return null;
    }

    const entities = getEntitiesAtLocation(ecs, entityMap, mousePosition);

    let res;
    if (excludeUninteractable) {
        res = entities.filter(e => {
            const hpData = e.getOne(HitPointsComponent);
            const interactableData = e.getOne(InteractableTypeComponent);
            return hpData !== undefined || interactableData !== undefined;
        });
    } else {
        res = entities;
    }

    // Prioritize things the player can interact with to the front of the array
    res = res.sort((a, b) => {
        let aValue: number = 0;
        let bValue: number = 0;

        if (a.getOne(PlannerAIComponent) !== undefined) { aValue += 10; }
        if (a.getOne(HitPointsComponent) !== undefined) { aValue += 5; }
        if (a.getOne(InteractableTypeComponent) !== undefined) { aValue += 3; }
        if (b.getOne(PlannerAIComponent) !== undefined) { bValue += 10; }
        if (b.getOne(HitPointsComponent) !== undefined) { bValue += 5; }
        if (b.getOne(InteractableTypeComponent) !== undefined) { bValue += 3; }

        return bValue - aValue;
    });

    return res[0] ?? null;
}

/**
 * Called every frame. Generates commands for the command queue given
 * the input handling state component of the player.
 *
 * @param ecs {World} The current ECS world
 * @param map {GameMap} The current game map
 * @param entityMap {EntityMap} Map of positions to entities at the position
 * @param player {Entity} The player entity
 * @returns {Command[]}
 */
export function playerInput(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    player: Entity
): Command[] {
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
        let keyResult: Nullable<Command> = null;
        for (let i = 0; i < inputState.keyCommands.length; i++) {
            const keyCommand = inputState.keyCommands[i];

            if (keyCommand.continuous && input.isDown(keyCommand.code)) {
                keyResult = keyCommand.command();
            }

            if (!keyCommand.continuous && input.wasPressed(keyCommand.code)) {
                keyResult = keyCommand.command();
            }
        }
        if (keyResult !== null) { return [keyResult]; }

        // Mouse input
        const mouseDownPosition = input.getLeftMouseDown();
        if (mouseDownPosition !== null) {
            // Attacking
            if (tileDistanceBetweenPoints(mouseDownPosition, playerPosition.tilePosition) < 1.5) {
                const target = mouseTarget(
                    ecs,
                    map,
                    entityMap,
                    mouseDownPosition
                );

                if (target !== null && target !== inputState.entity) {
                    const hpData = target.getOne(HitPointsComponent);
                    const interactableData = target.getOne(InteractableTypeComponent);

                    if (hpData !== undefined && target.tags.has("attackable")) {
                        return [new PhysicalAttackCommand(player.id, target.id)];
                    } else if (interactableData !== undefined) {
                        return [new InteractCommand(player.id, target.id)];
                    }
                }
            }

            if (!globals.Game!.map
                .visibilityData[mouseDownPosition.y][mouseDownPosition.x].explored) { return []; }

            // Movement
            const path = getPlayerMovementPath(
                ecs,
                map,
                entityMap,
                playerPosition.tilePosition,
                mouseDownPosition,
                speedData.maxTilesPerMove
            );
            if (path.length !== 0) {
                return [new GoToLocationCommand(
                    player.id,
                    path
                )];
            }
        }

        return [];
    } else if (inputState.state === PlayerState.Target) {
        // Key commands
        let keyResult: Nullable<Command> = null;
        for (let i = 0; i < inputState.keyCommands.length; i++) {
            const keyCommand = inputState.keyCommands[i];
            if (input.isDown(keyCommand.code)) {
                keyResult = keyCommand.command();
            }
        }
        if (keyResult !== null) { return [keyResult]; }

        const mousePosition = input.getLeftMouseDown();
        if (mousePosition === null) {
            return [];
        }

        const entityPos = player.getOne(PositionComponent)!.tilePosition;
        const range = inputState.spellForTarget?.range ??
            inputState.itemForTarget?.range ??
            Infinity;

        // TODO, gameplay: We judge the number of tiles the player can move
        // by number, not by distance. Should we have the same logic here?
        // Probably.
        if (tileDistanceBetweenPoints(mousePosition, entityPos) <= range) {
            let useCallback: SkillCallback | undefined = undefined;
            let data: ItemDataDetails | SpellDataDetails | undefined = undefined;
            let command: Nullable<Command> = null;
            if (inputState.itemForTarget !== null) {
                data = ItemData[inputState.itemForTarget.id];
                useCallback = useItem;
            } else if (inputState.spellForTarget !== null) {
                data = SpellData[inputState.spellForTarget.id];
                useCallback = useSpell;
            }

            if (data !== undefined && data.type === SpellType.Push) {
                inputState.state = PlayerState.TargetDirection;
                inputState.targetForDirection = mousePosition;
                inputState.update();
            } else if (data !== undefined && useCallback !== undefined) {
                command = new UseSkillCommand(
                    player.id,
                    data,
                    mousePosition,
                    inputState.reticleRotation,
                    undefined,
                    true,
                    useCallback
                );

                inputState.state = PlayerState.Combat;
                inputState.itemForTarget = null;
                inputState.spellForTarget = null;
                inputState.targetForDirection = null;
                inputState.update();
                if (command !== null) { return [command]; }
            }
        }
    } else if (inputState.state === PlayerState.TargetDirection) {
        const mousePosition = input.getLeftMouseDown();
        if (mousePosition !== null && inputState.targetForDirection !== null) {
            // Divide a circle into eight equal sections. Then, we draw an immaginary
            // line between the mouse position and the target to determine the direction
            // that the spell should go in.
            //
            // E.g. Mouse is clicked to the left of the target, spell is going to the right
            const mouseAngle = inputState.targetForDirection.direction(mousePosition);
            const direction = clampAngleToOppositeDIR(mouseAngle);
            let command: Nullable<Command> = null;

            if (direction !== null) {
                if (inputState.itemForTarget !== null) {
                    command = new UseSkillCommand(
                        player.id,
                        ItemData[inputState.itemForTarget.id],
                        inputState.targetForDirection,
                        inputState.reticleRotation,
                        direction,
                        true,
                        useItem
                    );
                } else if (inputState.spellForTarget !== null) {
                    command = new UseSkillCommand(
                        player.id,
                        SpellData[inputState.spellForTarget.id],
                        inputState.targetForDirection,
                        inputState.reticleRotation,
                        direction,
                        true,
                        useSpell
                    );
                }
            }

            inputState.state = PlayerState.Combat;
            inputState.itemForTarget = null;
            inputState.spellForTarget = null;
            inputState.targetForDirection = null;
            inputState.update();
            if (command !== null) { return [command]; }
        }
    }

    return [];
}
