import { RNG, DIRS, Path } from "../rot/index";

import {
    Command,
    UseSkillCommand,
    GoToLocationCommand,
    NoOpCommand,
    createPassableCallback,
    generateWeightCallback,
    createWaterBasedPassableCallback,
    AlertAlliesCommand,
    PhysicalAttackCommand
} from "../commands";
import {
    EntityMap,
    FearAIComponent,
    HitPointsComponent,
    InventoryComponent,
    PatrolAIComponent,
    PatrolPathComponent,
    PlannerAIComponent,
    PositionComponent,
    SpeedComponent,
    SpellsComponent,
    TypeComponent
} from "../entity";
import {
    tileDistanceBetweenPoints,
    getRandomOpenSpace,
    GameMap,
    isBlocked,
    Vector2D,
    getEntitiesAtLocation,
} from "../map";
import { showLogMessage } from "../ui";
import { ItemType, SpellType } from "../constants";
import { Nullable } from "../util";
import { Entity, World } from "ape-ecs";
import { getItems, useItem } from "../inventory";
import { getEffectiveSpeedData, getEffectiveStatData, getKnownSpells, useSpell } from "../fighter";
import { ItemData, SpellData } from "../skills";
import { getPotentiallyDangerousPositions } from "./goals";
import { PassableCallback, WeightCallback } from "../rot/path/path";
import globals from "../globals";
import { rectangleContains } from "../camera";

type ActionUpdateFunction = (
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    ai: PlannerAIComponent
) => Command;

type WeightCalculationFunction = (
    ecs: World,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
) => number;

/**
 * Calculate a path from a game object to the give x and y
 * coordinates. Return the x and y position of the nth step
 * along the path
 */
function getStepsTowardsTarget(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    actor: Entity,
    origin: Vector2D,
    target: Vector2D,
    steps: number,
    popBack: boolean = true
): Vector2D[] {
    let passableCB: PassableCallback, weightCB: WeightCallback;

    if (actor.tags.has("aquatic")) {
        passableCB = createWaterBasedPassableCallback(origin);
        weightCB = () => 1;
    } else {
        passableCB = createPassableCallback(ecs, entityMap, origin, actor);
        weightCB = generateWeightCallback(ecs, map, entityMap, actor, origin);
    }

    const aStar = new Path.AStar(
        target.x,
        target.y,
        passableCB,
        weightCB,
        { topology: 8 }
    );

    const path: Vector2D[] = [];
    function pathCallback(x: number, y: number) {
        path.push(new Vector2D(x, y));
    }
    aStar.compute(origin.x, origin.y, pathCallback);

    // remove our own position
    path.shift();
    if (popBack) {
        // remove the target's position
        path.pop();
    }

    if (path.length > 0) {
        return path.slice(0, steps);
    }
    return [];
}

/**
 * Generates a command to move in a random direction that is not
 * blocked
 */
function wanderAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    const pos = aiState.entity.getOne(PositionComponent)!.tilePosition;
    const validPositions: Vector2D[] = [];
    const dangerousPositions = getPotentiallyDangerousPositions(
        ecs, entityMap, aiState.entity, aiState.nonAlertSightRange
    );

    if (Math.random() > 0.8) {
        return new NoOpCommand(true);
    }

    for (const dir of DIRS[8]) {
        const newPosition = new Vector2D(pos.x + dir[0], pos.y + dir[1]);
        const isAquatic = aiState.entity.tags.has("aquatic");
        const { blocks, entity } = isBlocked(ecs, map, entityMap, newPosition);

        if ((isAquatic && blocks === false && entity !== null && entity.tags.has("waterTile")) ||
            (!isAquatic && blocks === false)) {
            if (aiState.wanderBounds !== null &&
                !rectangleContains(aiState.wanderBounds, newPosition)) {
                continue;
            }

            if (!dangerousPositions.has(`${newPosition.x},${newPosition.y}`)) {
                validPositions.push(newPosition);
            }
        }
    }

    const newPos = RNG.getItem(validPositions);
    if (newPos === null) {
        return new NoOpCommand(true);
    } else {
        return new GoToLocationCommand(aiState.entity.id, [newPos]);
    }
}

/**
 * Generates a command to move towards the AI's current patrol node.
 * If the AI is at the patrol node, then set the AI's patrol node to
 * the next node.
 */
function patrolAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    const pos = aiState.entity.getOne(PositionComponent);
    const patrolState = aiState.entity.getOne(PatrolAIComponent);
    if (patrolState === undefined || pos === undefined) {
        throw new Error("Cannot patrol without a patrolState or position");
    }
    if (patrolState.patrolTarget === null) { throw new Error(`Null patrol target for entity ${aiState.entity.id}`); }

    let patrolTarget = ecs.getEntity(patrolState.patrolTarget);
    let targetPos = patrolTarget?.getOne(PositionComponent);
    if (targetPos === undefined) { throw new Error("Patrol target doesn't have a position"); }

    let path: Vector2D[] = getStepsTowardsTarget(
        ecs,
        map,
        entityMap,
        aiState.entity,
        pos.tilePosition,
        targetPos.tilePosition,
        2
    );
    // try the next node
    if (path.length === 0) {
        const next = patrolTarget?.getOne(PatrolPathComponent);
        if (next === undefined) { throw new Error(`Missing patrol link on node ${patrolState.patrolTarget}`); }

        if (next.next === null) {
            return new NoOpCommand(true);
        }
        patrolState.patrolTarget = next.next;
        patrolTarget = ecs.getEntity(patrolState.patrolTarget);
        targetPos = patrolTarget?.getOne(PositionComponent);
        if (targetPos === undefined) { throw new Error("Patrol target doesn't have a position"); }
        path = getStepsTowardsTarget(
            ecs,
            map,
            entityMap,
            aiState.entity,
            pos.tilePosition,
            targetPos.tilePosition,
            2
        );
    }
    // give up
    if (path.length === 0) {
        return new NoOpCommand(true);
    }

    return new GoToLocationCommand(aiState.entity.id, path);
}

/**
 * Go towards the AI's target
 */
function chaseAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    // TODO: Should only be called if some hasPathToTarget goal is true
    const speedData = aiState.entity.getOne(SpeedComponent);
    const posData = aiState.entity.getOne(PositionComponent);

    const target = ecs.getEntity(aiState.targetId);
    if (target === undefined) {
        if (globals.Game?.debugAI === true) {
            // eslint-disable-next-line no-console
            console.log(`chase action for ${aiState.entity.id} is chasing a non-existent entity ${aiState.targetId}`);
        }
        return new NoOpCommand(true);
    }

    const targetPosData = target.getOne(PositionComponent);
    if (speedData === undefined || posData === undefined) {
        throw new Error(`Missing data for ${aiState.entity.id}`);
    }
    if (targetPosData === undefined) {
        throw new Error(`Missing data for ${aiState.targetId}`);
    }

    const path: Vector2D[] = getStepsTowardsTarget(
        ecs,
        map,
        entityMap,
        aiState.entity,
        posData.tilePosition,
        targetPosData.tilePosition,
        speedData.maxTilesPerMove
    );
    if (path.length === 0) {
        return new NoOpCommand(true);
    }

    return new GoToLocationCommand(aiState.entity.id, path);
}

/**
 * Find the weight of chasing the AI's target
 */
function chaseWeight(ecs: World, entityMap: EntityMap, aiState: PlannerAIComponent): number {
    const posData = aiState.entity.getOne(PositionComponent);

    const target = ecs.getEntity(aiState.targetId);
    if (target === undefined) {
        if (globals.Game?.debugAI === true) {
            // eslint-disable-next-line no-console
            console.log(`chase weight for ${aiState.entity.id} is chasing a non-existent entity ${aiState.targetId}`);
        }
        return 1;
    }

    const targetPosData = target.getOne(PositionComponent);
    if (posData === undefined || targetPosData === undefined) { throw new Error("no position data for ai"); }
    const distance = tileDistanceBetweenPoints(posData.tilePosition, targetPosData.tilePosition);

    const speedData = getEffectiveSpeedData(ecs, entityMap, aiState.entity);
    if (speedData !== null) {
        return distance / speedData.maxTilesPerMove;
    } else {
        return distance / 3;
    }
}

/**
 * Generate a command to attack the current AI's target. Should
 * only be called if the AI is in attack range
 */
function meleeAttackAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    if (aiState.targetId === null) { throw new Error("Cannot perform meleeAttackAction without a target"); }
    return new PhysicalAttackCommand(aiState.entity.id, aiState.targetId);
}

/**
 * Set the weight of a melee attack to the resulting HP of the target
 * after the attack. This way, the attack that takes away the most HP
 * will have the lowest weight. Therefore, the AI will choose the most
 * effective attack
 */
function meleeAttackWeight(ecs: World, entityMap: EntityMap, aiState: PlannerAIComponent): number {
    const target = ecs.getEntity(aiState.targetId);
    if (target === undefined) {
        if (globals.Game?.debugAI === true) {
            // eslint-disable-next-line no-console
            console.log(`meleeAttackWeight for ${aiState.entity.id} has a non-existent target ${aiState.targetId}`);
        }
        return 1;
    }

    const targetHPData = target.getOne(HitPointsComponent)!;
    const stats = getEffectiveStatData(ecs, entityMap, aiState.entity)!;

    return Math.max(
        1,
        targetHPData.hp - stats.strength
    );
}

/**
 * Generate a command to use the most effective healing item
 * in the AI's inventory
 */
function useHealingItemAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    const inventoryData = aiState.entity.getOne(InventoryComponent);
    const typeData = aiState.entity.getOne(TypeComponent);
    if (inventoryData === undefined) { throw new Error("No inventory on owner for AI for useHealingItemAction"); }
    if (typeData === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing TypeComponent`); }

    const item = getItems(inventoryData)
        .filter(i => i.type === ItemType.HealSelf)
        .sort((a, b) => a.value! - b.value!)[0];

    showLogMessage(`${typeData.displayName} used a ${item.displayName}`);

    return new UseSkillCommand(
        aiState.entity.id,
        ItemData[item.id],
        undefined,
        undefined,
        undefined,
        true,
        useItem
    );
}

function useHealingSpellAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    const spells = aiState.entity.getOne(SpellsComponent);
    const typeData = aiState.entity.getOne(TypeComponent);
    if (spells === undefined) { throw new Error("No spells on owner for AI for useHealingSpellAction"); }
    if (typeData === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing TypeComponent`); }

    const spell = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealSelf)
        .sort((a, b) => a.value! - b.value!)[0];

    showLogMessage(`${typeData!.displayName} casted ${spell.displayName}`);

    return new UseSkillCommand(
        aiState.entity.id,
        SpellData[spell.id],
        undefined,
        undefined,
        undefined,
        true,
        useSpell
    );
}

function healAllyAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    // TODO: this should generate a move camera command to the entity being healed
    const pos = aiState.entity.getOne(PositionComponent);
    const spells = aiState.entity.getOne(SpellsComponent);
    const typeData = aiState.entity.getOne(TypeComponent);
    const team = globals.Game?.entityTeams.get(aiState.teamId ?? Infinity);
    if (pos === undefined) { throw new Error("No position on AI for healAllyAction"); }
    if (spells === undefined) { throw new Error("No spells on AI for healAllyAction"); }
    if (typeData === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing TypeComponent`); }
    if (team === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing a team for healAllyAction`); }

    const spell = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealOther)
        .sort((a, b) => a.value! - b.value!)[0];

    // TODO, SPEED: this information is being calculated twice, once here
    // and once in the goals
    let target: Nullable<Vector2D> = null;
    let targetHPPercent: Nullable<number> = null;
    for (const eId of team.memberIds) {
        if (eId === aiState.entity.id) { continue; }
        const e = ecs.getEntity(eId);
        if (e === undefined) { continue; }

        const hpData = e.getOne(HitPointsComponent)!;
        const ePos = e.getOne(PositionComponent)!;
        const hpPercent = hpData.hp / hpData.maxHp;

        if (tileDistanceBetweenPoints(pos.tilePosition, ePos.tilePosition) < 10 &&
            (target === null || hpPercent < targetHPPercent!)) {
            target = ePos.tilePosition;
            targetHPPercent = hpPercent;
        }
    }

    if (target === null) {
        throw new Error("Should never get here, there's a bug in goal allyLowHealth");
    }

    showLogMessage(`${typeData.displayName} casted ${spell.displayName}`);

    return new UseSkillCommand(
        aiState.entity.id,
        SpellData[spell.id],
        target,
        undefined,
        undefined,
        true,
        useSpell
    );
}

/**
 * Create a function which will return a command
 * which uses the specified spell
 */
function castSpellAction(spellID: string): ActionUpdateFunction {
    return function (
        ecs: World,
        map: GameMap,
        entityMap: EntityMap,
        aiState: PlannerAIComponent
    ): Command {
        const target = ecs.getEntity(aiState.targetId);
        if (target === undefined) {
            if (globals.Game?.debugAI === true) {
                // eslint-disable-next-line no-console
                console.log(`castSpellAction for ${aiState.entity.id} has a non-existent target ${aiState.targetId}`);
            }
            return new NoOpCommand(true);
        }

        const spellData = aiState.entity.getOne(SpellsComponent);
        const typeData = aiState.entity.getOne(TypeComponent);
        if (spellData === undefined) { throw new Error(`No spells on ${aiState.entity.id} for castSpellAction`); }
        if (typeData === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing TypeComponent`); }

        const spells = getKnownSpells(spellData).map(s => s.id);
        if (spells.indexOf(spellID) === -1) {
            throw new Error(`${typeData.displayName} does not know spell ${spellID}`);
        }
        const targetPos = target.getOne(PositionComponent);
        if (targetPos === undefined) { throw new Error(`Target entity ${aiState.targetId} is missing PositionComponent`); }

        return new UseSkillCommand(
            aiState.entity.id,
            SpellData[spellID],
            targetPos.tilePosition,
            0,
            undefined,
            true,
            useSpell
        );
    };
}

/**
 * Set the weight of a spell attack to the resulting HP of the target
 * after the attack. This way, the attack that takes away the most HP
 * will have the lowest weight. Therefore, the AI will choose the most
 * effective attack
 */
function castSpellWeight(spellID: string): WeightCalculationFunction {
    return function (ecs: World, entityMap: EntityMap, aiState: PlannerAIComponent): number {
        const target = ecs.getEntity(aiState.targetId);
        if (target === undefined) {
            if (globals.Game?.debugAI === true) {
                // eslint-disable-next-line no-console
                console.log(`castSpellWeight for ${aiState.entity.id} has a non-existent target ${aiState.targetId}`);
            }
            return 1;
        }

        const targetHPData = target.getOne(HitPointsComponent)!;
        const damage = SpellData[spellID].value ?? 1;

        return Math.max(
            1,
            targetHPData.hp - damage
        );
    };
}

/**
 * Simulate running away in fear from a target by choosing a random
 * spot on the map and going to it.
 */
function runAwayAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    // TODO: Could improve this by using basic steering behaviors so that the
    // AI at first moves away from the target and then follows the path to the
    // chosen run away position

    const pos = aiState.entity.getOne(PositionComponent);
    const fearState = aiState.entity.getOne(FearAIComponent);
    const speedData = aiState.entity.getOne(SpeedComponent);
    if (pos === undefined || fearState === undefined || speedData === undefined) {
        throw new Error("Missing data when trying to run away");
    }

    let path: Vector2D[] = [];

    if (fearState.runAwayTarget === null) {
        // Give up after 5 tries as you might be boxed in
        let tries = 0;
        do {
            // TODO: should also fix this to make it so the target is at least
            // n tiles away from the target we're afraid of
            fearState.runAwayTarget = getRandomOpenSpace(ecs, map, entityMap);

            path = getStepsTowardsTarget(
                ecs,
                map,
                entityMap,
                aiState.entity,
                pos.tilePosition,
                fearState.runAwayTarget,
                speedData.maxTilesPerMove
            );
            tries++;
        } while (path.length === 0 || tries < 5);
    } else {
        path = getStepsTowardsTarget(
            ecs,
            map,
            entityMap,
            aiState.entity,
            pos.tilePosition,
            fearState.runAwayTarget,
            speedData.maxTilesPerMove,
            false
        );
    }

    if (path === null) {
        return new NoOpCommand(true);
    }

    if (path[path.length - 1].x === fearState.runAwayTarget.x &&
        path[path.length - 1].y === fearState.runAwayTarget.y) {
        fearState.fear = Math.round(fearState.isAfraidThreshold * 0.6);
        fearState.runAwayTarget = null;
    }

    return new GoToLocationCommand(aiState.entity.id, path);
}

function goToSafePositionAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    const pos = aiState.entity.getOne(PositionComponent);
    const speedData = aiState.entity.getOne(SpeedComponent);
    if (pos === undefined || speedData === undefined) {
        throw new Error("Missing data when trying to run away");
    }
    const tilePos = pos.tilePosition;
    // TODO, speed: Calculating the dangerous positions twice here. Once
    // in the goal resolver and once here.
    const dangerousPositions = getPotentiallyDangerousPositions(
        ecs, entityMap, aiState.entity, 20
    );

    const bfs = new Path.ReverseAStar(
        (x, y) => !dangerousPositions.has(`${x},${y}`),
        createPassableCallback(ecs, entityMap, tilePos, aiState.entity),
        generateWeightCallback(ecs, map, entityMap, aiState.entity, tilePos)
    );

    let path: Vector2D[] = [];
    function pathCallback(x: number, y: number) {
        path.splice(0, 0, new Vector2D(x, y));
    }
    bfs.compute(tilePos.x, tilePos.y, pathCallback);

    if (path.length === 0) {
        if (globals.Game!.debugAI) {
            // eslint-disable-next-line no-console
            console.log("Could not find a path to a safe position");
        }
        return new NoOpCommand(true);
    }

    // remove our own position
    path.shift();
    if (path.length === 0) {
        if (globals.Game!.debugAI) {
            // eslint-disable-next-line no-console
            console.log("Could not find a path to a safe position");
        }
        return new NoOpCommand(true);
    }

    path = path.slice(0, speedData.maxTilesPerMove);
    return new GoToLocationCommand(aiState.entity.id, path);
}

/**
 * Find the nearest tile which is a lest N distance away from the
 * specified target in the AI state data
 */
function repositionAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    const target = ecs.getEntity(aiState.targetId);
    if (target === undefined) {
        if (globals.Game?.debugAI === true) {
            // eslint-disable-next-line no-console
            console.log(`repositionAction for ${aiState.entity.id} has a non-existent target ${aiState.targetId}`);
        }
        return new NoOpCommand(true);
    }

    const pos = aiState.entity.getOne(PositionComponent);
    const targetPosData = target.getOne(PositionComponent);
    const speedData = aiState.entity.getOne(SpeedComponent);
    if (pos === undefined || speedData === undefined || targetPosData === undefined) {
        throw new Error("Missing data when trying to reposition");
    }

    const bfs = new Path.ReverseAStar(
        (x, y) => {
            const d = tileDistanceBetweenPoints(new Vector2D(x, y), targetPosData.tilePosition);
            return Math.floor(d) === aiState.desiredDistanceToTarget;
        },
        createPassableCallback(ecs, entityMap, pos.tilePosition, aiState.entity),
        generateWeightCallback(ecs, map, entityMap, aiState.entity, pos.tilePosition)
    );

    let path: Vector2D[] = [];
    function pathCallback(x: number, y: number) {
        path.splice(0, 0, new Vector2D(x, y));
    }
    bfs.compute(pos.tilePosition.x, pos.tilePosition.y, pathCallback);

    if (path.length === 0) {
        return new NoOpCommand(true);
    }

    // remove our own position
    path.shift();
    path = path.slice(0, speedData.maxTilesPerMove);
    return new GoToLocationCommand(aiState.entity.id, path);
}

/**
 * Stand by until you're the last man standing, then you should melee attack
 * (or run away, but that's not handled here)
 */
function standbyWeight(ecs: World, entityMap: EntityMap, aiState: PlannerAIComponent): number {
    const target = ecs.getEntity(aiState.targetId);
    if (target === undefined) {
        if (globals.Game?.debugAI === true) {
            // eslint-disable-next-line no-console
            console.log(`standbyWeight for ${aiState.entity.id} has a non-existent target ${aiState.targetId}`);
        }
        return 1;
    }

    const hpData = target.getOne(HitPointsComponent);
    if (hpData === undefined) {
        throw new Error("target is missing a HitPointsComponent");
    }

    const spellData = aiState.entity.getOne(SpellsComponent);
    if (spellData !== undefined) {
        const spells = getKnownSpells(spellData);
        for (let i = 0; i < spells.length; i++) {
            const s = spells[i];
            if (s.type === SpellType.DamageOther && s.count > 0) {
                return hpData.hp;
            }
        }
    }

    return 1;
}

function douseFireOnSelfAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    const pos = aiState.entity.getOne(PositionComponent);
    const speedData = aiState.entity.getOne(SpeedComponent);
    if (pos === undefined || speedData === undefined) {
        throw new Error("Missing data when trying to run away");
    }

    const bfs = new Path.ReverseAStar(
        (x, y) => {
            const entities = getEntitiesAtLocation(ecs, entityMap, new Vector2D(x, y));
            for (const e of entities) {
                if (e.tags.has("waterTile")) {
                    return true;
                }
            }
            return false;
        },
        createPassableCallback(ecs, entityMap, pos.tilePosition, aiState.entity),
        generateWeightCallback(ecs, map, entityMap, aiState.entity, pos.tilePosition)
    );

    let path: Vector2D[] = [];
    function pathCallback(x: number, y: number) {
        path.splice(0, 0, new Vector2D(x, y));
    }
    bfs.compute(pos.tilePosition.x, pos.tilePosition.y, pathCallback);

    if (path.length === 0) {
        return new NoOpCommand(true);
    }

    // remove our own position
    path.shift();
    path = path.slice(0, speedData.maxTilesPerMove);
    return new GoToLocationCommand(aiState.entity.id, path);
}

function alertAlliesAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    aiState.currentOrder = "attack";
    aiState.update();
    return new AlertAlliesCommand(aiState.entity.id);
}

function confusedWander(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    let blocks: boolean = true;
    let newTilePos: Vector2D;
    let dir: number = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;
    const pos = aiState.entity.getOne(PositionComponent);
    if (pos === undefined) {
        throw new Error(`Entity ${aiState.entity.id} is missing data`);
    }

    do {
        dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;
        newTilePos = new Vector2D(
            pos.tilePosition.x + DIRS[8][dir][0],
            pos.tilePosition.y + DIRS[8][dir][1]
        );
        ({ blocks } = isBlocked(
            ecs,
            map,
            entityMap,
            newTilePos
        ));
    } while (blocks === true);

    return new GoToLocationCommand(
        aiState.entity.id,
        [newTilePos]
    );
}

/**
 * This logic is basically special cased for the web spell at the moment
 *
 * @param spellID {string} The spell to check
 * @returns {WeightCalculationFunction}
 */
function webAreaDenialWeight(ecs: World, entityMap: EntityMap, aiState: PlannerAIComponent): number {
    function isPostionWebbed(pos: Vector2D): boolean {
        let targetWebbed = false;
        for (const entity of getEntitiesAtLocation(ecs, entityMap, pos)) {
            const typeData = entity.getOne(TypeComponent);
            if (typeData !== undefined && typeData.entityType === "webbed_floor") {
                targetWebbed = true;
                break;
            }
        }
        return targetWebbed;
    }

    // Check if your current tile or the tile that the target is occupying is
    // webbed.
    // If no, web the target first, then your own tile
    const target = ecs.getEntity(aiState.targetId);
    if (target === undefined) { return 100; }

    const targetPositionData = target.getOne(PositionComponent);
    if (targetPositionData === undefined) { throw new Error(`${target.id} is missing position data`); }
    if (!isPostionWebbed(targetPositionData.tilePosition)) {
        return 1;
    }

    const positionData = aiState.entity.getOne(PositionComponent);
    if (positionData === undefined) { throw new Error(`${aiState.entity.id} is missing position data`); }
    if (!isPostionWebbed(positionData.tilePosition)) {
        return 1;
    }

    return 100;
}

function webAreaDenial(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    const spellData = aiState.entity.getOne(SpellsComponent);
    const typeData = aiState.entity.getOne(TypeComponent);
    if (spellData === undefined) { throw new Error(`No spells on ${aiState.entity.id} for webAreaDenial`); }
    if (typeData === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing TypeComponent`); }

    const spells = getKnownSpells(spellData).map(s => s.id);
    if (spells.indexOf("web") === -1) {
        throw new Error(`${typeData.displayName} does not know spell web`);
    }

    const target = ecs.getEntity(aiState.targetId);
    if (target === undefined) {
        if (globals.Game?.debugAI === true) {
            // eslint-disable-next-line no-console
            console.log(`webAreaDenial for ${aiState.entity.id} has a non-existent target ${aiState.targetId}`);
        }
        return new NoOpCommand(true);
    }
    const targetPos = target.getOne(PositionComponent);
    if (targetPos === undefined) { throw new Error(`Target entity ${aiState.targetId} is missing PositionComponent`); }

    return new UseSkillCommand(
        aiState.entity.id,
        SpellData["web"],
        targetPos.tilePosition,
        0,
        undefined,
        true,
        useSpell
    );
}

interface Action {
    preconditions: { [key: string]: boolean },
    postconditions: { [key: string]: boolean }
    updateFunction: ActionUpdateFunction,
    weight: WeightCalculationFunction
}

/**
 * Action data by the action's name. An action is something which
 * satisfies goal, thereby changing the world state. Defines
 * which state variables are changed, the function to perform the
 * action, and the cost (weight) of the action.
 */
export const ActionData: { [key: string]: Action } = {
    "wander": {
        preconditions: { targetPositionKnown: false, confused: false },
        postconditions: { targetPositionKnown: true },
        updateFunction: wanderAction,
        weight: () => 1
    },
    "guard": {
        preconditions: { targetPositionKnown: false, confused: false },
        postconditions: { targetPositionKnown: true },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: () => 1
    },
    "patrol": {
        preconditions: { targetPositionKnown: false, confused: false },
        postconditions: { targetPositionKnown: true },
        updateFunction: patrolAction,
        weight: () => 1
    },
    "chase": {
        preconditions: {
            afraid: false,
            targetPositionKnown: true,
            targetInLineOfSight: false,
            confused: false
        },
        postconditions: { targetInLineOfSight: true },
        updateFunction: chaseAction,
        weight: () => 1
    },
    "standby": {
        preconditions: {
            targetPositionKnown: true,
            atDesiredDistance: true,
            hasAliveAllies: true,
            targetKilled: false,
            confused: false
        },
        postconditions: { targetKilled: true },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: standbyWeight
    },
    "reposition": {
        preconditions: {
            targetPositionKnown: true,
            atDesiredDistance: false,
            hasAliveAllies: true,
            targetKilled: false,
            confused: false
        },
        postconditions: { atDesiredDistance: true },
        updateFunction: repositionAction,
        weight: () => 1
    },
    "useHealingItem": {
        preconditions: {
            lowHealth: true,
            hasHealingItem: true,
            confused: false
        },
        postconditions: { lowHealth: false },
        updateFunction: useHealingItemAction,
        weight: () => 1
    },
    "useHealingSpell": {
        preconditions: {
            lowHealth: true,
            hasSelfHealingSpell: true,
            silenced: false,
            confused: false
        },
        postconditions: { lowHealth: false },
        updateFunction: useHealingSpellAction,
        weight: () => 1
    },
    "healAlly": {
        preconditions: {
            allyLowHealth: true,
            hasHealOtherSpell: true,
            silenced: false,
            confused: false
        },
        postconditions: { allyLowHealth: false },
        updateFunction: healAllyAction,
        weight: () => 1
    },
    "goToEnemy": {
        preconditions: {
            afraid: false,
            targetPositionKnown: true,
            nextToTarget: false,
            confused: false
        },
        postconditions: { nextToTarget: true },
        updateFunction: chaseAction,
        weight: chaseWeight
    },
    "meleeAttack": {
        preconditions: {
            afraid: false,
            nextToTarget: true,
            targetKilled: false,
            confused: false
        },
        postconditions: { targetKilled: true },
        updateFunction: meleeAttackAction,
        weight: meleeAttackWeight
    },
    "goToSafePosition": {
        preconditions: { inDangerousArea: true, confused: false },
        postconditions: { inDangerousArea: false },
        updateFunction: goToSafePositionAction,
        weight: () => 1
    },
    "runAway": {
        preconditions: {
            afraid: true,
            cowering: false,
            confused: false
        },
        postconditions: { afraid: false, cowering: true },
        updateFunction: runAwayAction,
        weight: () => 1
    },
    "goToFallbackPosition": {
        preconditions: { atFallbackPosition: false, confused: false },
        postconditions: { atFallbackPosition: true },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: () => 1
    },
    "douseFireOnSelf": {
        preconditions: {
            onFire: true,
            nearWater: true,
            confused: false
        },
        postconditions: { onFire: false },
        updateFunction: douseFireOnSelfAction,
        weight: () => 1
    },
    "alertAllies": {
        preconditions: {
            hasAliveAllies: true,
            alliesAlerted: false,
            confused: false
        },
        postconditions: { alliesAlerted: true },
        updateFunction: alertAlliesAction,
        weight: () => 1
    },
    "confusedWander": {
        preconditions: { confused: true },
        postconditions: { confused: false },
        updateFunction: confusedWander,
        weight: () => 1
    },
    // We can get the planner to web the areas by having the weight of
    // gotoenemy take into account the movement speed after webbing SOMEHOW
    "webAreaDenial": {
        preconditions: {
            hasCastsFor_web: true,
            targetInLineOfSight: true,
            targetKilled: false,
            afraid: false,
            confused: false
        },
        postconditions: { targetKilled: true },
        updateFunction: webAreaDenial,
        weight: webAreaDenialWeight
    }
};

// Dynamically add spells to goals and actions
for (const key in SpellData) {
    const data = SpellData[key];
    // capitalize the first letter
    const goal = `hasCastsFor_${key}`;
    const action = `castSpell_${key}`;
    if (data.type === SpellType.DamageOther || data.type === SpellType.WildDamage) {
        ActionData[action] = {
            preconditions: {
                [goal]: true,
                targetInLineOfSight: true,
                targetKilled: false,
                silenced: false,
                afraid: false,
                confused: false
            },
            postconditions: { targetKilled: true },
            updateFunction: castSpellAction(key),
            weight: castSpellWeight(key)
        };
    } else if (data.type === SpellType.HealSelf) {
        ActionData[action] = {
            preconditions: {
                [goal]: true,
                lowHealth: true,
                silenced: false,
                confused: false
            },
            postconditions: { lowHealth: false },
            updateFunction: castSpellAction(key),
            weight: () => 1
        };
    } else if (data.type === SpellType.HealOther) {
        ActionData[action] = {
            preconditions: {
                [goal]: true,
                allyLowHealth: true,
                silenced: false,
                afraid: false,
                confused: false
            },
            postconditions: { allyLowHealth: false },
            updateFunction: healAllyAction,
            weight: () => 1
        };
    }
}
