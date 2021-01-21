import { RNG, DIRS, Path } from "../rot/index";

import {
    Command,
    UseItemCommand,
    UseSpellCommand,
    GoToLocationCommand,
    InteractCommand,
    NoOpCommand,
    createPassableCallback,
    generateWeightCallback
} from "../commands";
import {
    DisplayNameComponent,
    EntityMap,
    FearAIComponent,
    HitPointsComponent,
    InventoryComponent,
    PatrolAIComponent,
    PatrolPathComponent,
    PlannerAIComponent,
    PositionComponent,
    SpeedComponent,
    SpellsComponent
} from "../entity";
import {
    distanceBetweenPoints,
    getRandomOpenSpace,
    GameMap,
    isBlocked,
    Point,
} from "../map";
import { displayMessage } from "../ui";
import { ItemType, SpellType } from "../constants";
import { Nullable } from "../util";
import { Entity, World } from "ape-ecs";
import { getItems } from "../inventory";
import { getEffectiveStatData, getKnownSpells } from "../fighter";
import { SpellData } from "../skills";
import { isPositionPotentiallyDangerous } from "./goals";

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
    origin: Point,
    target: Point,
    steps: number,
    popBack: boolean = true
): Nullable<number[][]> {
    const aStar = new Path.AStar(
        target.x,
        target.y,
        createPassableCallback(origin),
        generateWeightCallback(ecs, map, entityMap, origin),
        { topology: 8 }
    );

    const path: number[][] = [];
    function pathCallback(x: number, y: number) {
        path.push([x, y]);
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
    return null;
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
    let blocks: boolean = true;
    let entity: Nullable<Entity> = null;
    let newX: number = 0;
    let newY: number = 0;
    let dir: number = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;
    const pos = aiState.entity.getOne(PositionComponent)!;

    do {
        dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;
        newX = pos.x + DIRS[8][dir][0];
        newY = pos.y + DIRS[8][dir][1];
        ({ blocks, entity } = isBlocked(map, entityMap, newX, newY));
    } while (blocks === true || entity !== null);

    return new GoToLocationCommand([[newX, newY]], ecs, map, entityMap);
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

    let targetPos = patrolState.patrolTarget.getOne(PositionComponent);
    if (targetPos === undefined) { throw new Error("Patrol target doesn't have a position"); }

    let path: Nullable<number[][]> = getStepsTowardsTarget(
        ecs,
        map,
        entityMap,
        aiState.entity,
        pos,
        targetPos,
        2
    );
    // try the next node
    if (path === null) {
        const next = patrolState.patrolTarget.getOne(PatrolPathComponent);
        if (next === undefined) { throw new Error(`Missing patrol link on node ${patrolState.patrolTarget.id}`); }

        if (next.next === null) {
            return new NoOpCommand(true);
        }
        patrolState.patrolTarget = next.next;

        targetPos = patrolState.patrolTarget.getOne(PositionComponent);
        if (targetPos === undefined) { throw new Error("Patrol target doesn't have a position"); }
        path = getStepsTowardsTarget(
            ecs,
            map,
            entityMap,
            aiState.entity,
            pos,
            targetPos,
            2
        );
    }
    // give up
    if (path === null) {
        return new NoOpCommand(true);
    }

    return new GoToLocationCommand(path, ecs, map, entityMap);
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
    if (aiState.target === null) { throw new Error("Cannot perform chaseAction without a target"); }

    const speedData = aiState.entity.getOne(SpeedComponent);
    const posData = aiState.entity.getOne(PositionComponent);
    const targetPosData = aiState.target.getOne(PositionComponent);
    if (speedData === undefined || posData === undefined) {
        throw new Error(`Missing data for ${aiState.entity.id}`);
    }
    if (targetPosData === undefined) {
        throw new Error(`Missing data for ${aiState.target.id}`);
    }

    const path: Nullable<number[][]> = getStepsTowardsTarget(
        ecs,
        map,
        entityMap,
        aiState.entity,
        posData,
        targetPosData,
        speedData.maxTilesPerMove
    );
    if (path === null) {
        return new NoOpCommand(true);
    }

    return new GoToLocationCommand(path, ecs, map, entityMap);
}

/**
 * Find the weight of chasing the AI's target
 */
function chaseWeight(ecs: World, aiState: PlannerAIComponent): number {
    if (aiState.target === null) { return 1; }
    const posData = aiState.entity.getOne(PositionComponent);
    const targetPosData = aiState.target.getOne(PositionComponent);
    if (posData === undefined || targetPosData === undefined) { throw new Error("no position data for ai"); }
    return distanceBetweenPoints(posData, targetPosData);
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
    if (aiState.target === null) { throw new Error("Cannot perform meleeAttackAction without a target"); }
    return new InteractCommand(aiState.target);
}

/**
 * Set the weight of a melee attack to the resulting HP of the target
 * after the attack. This way, the attack that takes away the most HP
 * will have the lowest weight. Therefore, the AI will choose the most
 * effective attack
 */
function meleeAttackWeight(ecs: World, aiState: PlannerAIComponent): number {
    if (aiState.target === null) { return 1; }
    const targetHPData = aiState.target.getOne(HitPointsComponent)!;
    const stats = getEffectiveStatData(aiState.entity)!;

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
    const displayName = aiState.entity.getOne(DisplayNameComponent);
    if (inventoryData === undefined) { throw new Error("No inventory on owner for AI for useHealingItemAction"); }
    if (displayName === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing DisplayNameComponent`); }

    const item = getItems(inventoryData)
        .filter(i => i.type === ItemType.HealSelf)
        .sort((a, b) => a.value! - b.value!)[0];

    displayMessage(`${displayName.name} used a ${item.displayName}`);

    return new UseItemCommand(item.id, ecs, map, entityMap);
}

function useHealingSpellAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    const spells = aiState.entity.getOne(SpellsComponent);
    const displayName = aiState.entity.getOne(DisplayNameComponent);
    if (spells === undefined) { throw new Error("No spells on owner for AI for useHealingSpellAction"); }
    if (displayName === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing DisplayNameComponent`); }

    const spell = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealSelf)
        .sort((a, b) => a.value! - b.value!)[0];

    displayMessage(`${displayName.name} casted ${spell.displayName}`);

    return new UseSpellCommand(spell.id, ecs, map, entityMap);
}

function healAllyAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    const pos = aiState.entity.getOne(PositionComponent);
    const spells = aiState.entity.getOne(SpellsComponent);
    const displayName = aiState.entity.getOne(DisplayNameComponent);
    if (pos === undefined) { throw new Error("No position on AI for healAllyAction"); }
    if (spells === undefined) { throw new Error("No spells on AI for healAllyAction"); }
    if (displayName === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing DisplayNameComponent`); }

    const spell = getKnownSpells(spells)
        .filter(i => i.type === SpellType.HealOther)
        .sort((a, b) => a.value! - b.value!)[0];

    const entities = ecs
        .createQuery()
        .fromAll(PositionComponent, PlannerAIComponent, HitPointsComponent)
        .execute();

    // SPEED this information is being calculated twice, once here
    // and once in the goals
    let target: Nullable<Point> = null;
    let targetHPPercent: Nullable<number> = null;
    for (const e of entities) {
        const hpData = e.getOne(HitPointsComponent)!;
        const ePos = e.getOne(PositionComponent)!;
        const hpPercent = hpData.hp / hpData.maxHp;

        if (distanceBetweenPoints(pos, ePos) < 10 &&
            (target === null || hpPercent < targetHPPercent!)) {
            target = ePos;
            targetHPPercent = hpPercent;
        }
    }

    if (target === null) {
        throw new Error("Should never get here, there's a bug in goal allyLowHealth");
    }

    displayMessage(`${displayName.name} casted ${spell.displayName}`);

    return new UseSpellCommand(spell.id, ecs, map, entityMap, target);
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
        if (aiState.target === null) { throw new Error("Cannot cast spell without a target"); }

        const spellData = aiState.entity.getOne(SpellsComponent);
        const displayName = aiState.entity.getOne(DisplayNameComponent);
        if (spellData === undefined) { throw new Error(`No spells on ${aiState.entity.id} for castSpellAction`); }
        if (displayName === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing DisplayNameComponent`); }

        const spells = getKnownSpells(spellData).map(s => s.id);
        if (spells.indexOf(spellID) === -1) {
            throw new Error(`${displayName.name} does not know spell ${spellID}`);
        }
        const targetPos = aiState.target.getOne(PositionComponent);
        if (targetPos === undefined) { throw new Error(`Target entity ${aiState.target.id} is missing PositionComponent`); }

        return new UseSpellCommand(spellID, ecs, map, entityMap, targetPos);
    };
}

/**
 * Set the weight of a spell attack to the resulting HP of the target
 * after the attack. This way, the attack that takes away the most HP
 * will have the lowest weight. Therefore, the AI will choose the most
 * effective attack
 */
function castSpellWeight(spellID: string) {
    return function (ecs: World, aiState: PlannerAIComponent): number {
        if (aiState.target === null) { return 1; }
        const targetHPData = aiState.target.getOne(HitPointsComponent)!;
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

    let path: Nullable<number[][]> = [];

    if (fearState.runAwayTarget === null) {
        // Give up after 5 tries as you might be boxed in
        let tries = 0;
        do {
            // TODO should also fix this to make it so the target is at least
            // n tiles away from the target we're afraid of
            fearState.runAwayTarget = getRandomOpenSpace(map, entityMap);

            path = getStepsTowardsTarget(
                ecs,
                map,
                entityMap,
                aiState.entity,
                pos,
                fearState.runAwayTarget,
                speedData.maxTilesPerMove
            );
            tries++;
        } while (path === null || tries < 5);
    } else {
        path = getStepsTowardsTarget(
            ecs,
            map,
            entityMap,
            aiState.entity,
            pos,
            fearState.runAwayTarget,
            speedData.maxTilesPerMove,
            false
        );
    }

    if (path === null) {
        return new NoOpCommand(true);
    }

    if (path[path.length - 1][0] === fearState.runAwayTarget.x &&
        path[path.length - 1][1] === fearState.runAwayTarget.y) {
        fearState.fear = 0;
        fearState.runAwayTarget = null;
    }

    return new GoToLocationCommand(path, ecs, map, entityMap);
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

    const bfs = new Path.ReverseAStar(
        (x, y) => !isPositionPotentiallyDangerous(ecs, aiState.entity, x, y),
        createPassableCallback(pos)
    );

    let path: number[][] = [];
    function pathCallback(x: number, y: number) {
        path.splice(0, 0, [x, y]);
    }
    bfs.compute(pos.x, pos.y, pathCallback);

    if (path.length === 0) {
        return new NoOpCommand(true);
    }

    // remove our own position
    path.shift();
    path = path.slice(0, speedData.maxTilesPerMove);
    return new GoToLocationCommand(path, ecs, map, entityMap);
}

function repositionAction(
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    aiState: PlannerAIComponent
): Command {
    if (aiState.target === null) { throw new Error("Cannot perform chaseAction without a target"); }

    const pos = aiState.entity.getOne(PositionComponent);
    const targetPosData = aiState.target.getOne(PositionComponent);
    const speedData = aiState.entity.getOne(SpeedComponent);
    if (pos === undefined || speedData === undefined || targetPosData === undefined) {
        throw new Error("Missing data when trying to reposition");
    }

    const bfs = new Path.ReverseAStar(
        (x, y) => {
            const d = distanceBetweenPoints({ x, y }, targetPosData);
            return Math.floor(d) === aiState.desiredDistanceToTarget;
        },
        createPassableCallback(pos)
    );

    let path: number[][] = [];
    function pathCallback(x: number, y: number) {
        path.splice(0, 0, [x, y]);
    }
    bfs.compute(pos.x, pos.y, pathCallback);

    if (path.length === 0) {
        return new NoOpCommand(true);
    }

    // remove our own position
    path.shift();
    path = path.slice(0, speedData.maxTilesPerMove);
    return new GoToLocationCommand(path, ecs, map, entityMap);
}

/**
 * Stand by until you're the last man standing, then you should melee attack
 * (or run away, but that's not handled here)
 */
function standbyWeight(ecs: World, aiState: PlannerAIComponent): number {
    if (aiState.target === null) { throw new Error("Cannot find standbyWeight without a target"); }
    const hpData = aiState.target.getOne(HitPointsComponent);
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

type ActionUpdateFunction = (
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    ai: PlannerAIComponent
) => Command;

interface Action {
    preconditions: { [key: string]: boolean },
    postconditions: { [key: string]: boolean }
    updateFunction: ActionUpdateFunction,
    weight: (ecs: World, aiState: PlannerAIComponent) => number
}

/**
 * Action data by the action's name. An action is something which
 * satisfies goal, thereby changing the world state. Defines
 * which state variables are changed, the function to perform the
 * action, and the cost (weight) of the action.
 */
export const ActionData: { [key: string]: Action } = {
    "wander": {
        preconditions: { targetPositionKnown: false },
        postconditions: { targetPositionKnown: true },
        updateFunction: wanderAction,
        weight: () => 1
    },
    "guard": {
        preconditions: { targetPositionKnown: false },
        postconditions: { targetPositionKnown: true },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: () => 1
    },
    "patrol": {
        preconditions: { targetPositionKnown: false },
        postconditions: { targetPositionKnown: true },
        updateFunction: patrolAction,
        weight: () => 1
    },
    "chase": {
        preconditions: { targetPositionKnown: true, targetInLineOfSight: false },
        postconditions: { targetInLineOfSight: true },
        updateFunction: chaseAction,
        weight: () => 1
    },
    // FIX ME: White mage currently will stand by even when they can't see the target
    // They should case if they lose sight
    "standby": {
        preconditions: {
            targetPositionKnown: true,
            atDesiredDistance: true,
            hasAliveAllies: true,
            targetKilled: false
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
            targetKilled: false
        },
        postconditions: { atDesiredDistance: true },
        updateFunction: repositionAction,
        weight: () => 1
    },
    "useHealingItem": {
        preconditions: { lowHealth: true, hasHealingItem: true },
        postconditions: { lowHealth: false },
        updateFunction: useHealingItemAction,
        weight: () => 1
    },
    "useHealingSpell": {
        preconditions: { lowHealth: true, hasSelfHealingSpell: true },
        postconditions: { lowHealth: false },
        updateFunction: useHealingSpellAction,
        weight: () => 1
    },
    "healAlly": {
        preconditions: { allyLowHealth: true, hasOtherHealingSpell: true },
        postconditions: { allyLowHealth: false },
        updateFunction: healAllyAction,
        weight: () => 1
    },
    "goToEnemy": {
        preconditions: { targetPositionKnown: true, nextToTarget: false },
        postconditions: { nextToTarget: true },
        updateFunction: chaseAction,
        weight: chaseWeight
    },
    "meleeAttack": {
        preconditions: { nextToTarget: true, targetKilled: false },
        postconditions: { targetKilled: true },
        updateFunction: meleeAttackAction,
        weight: meleeAttackWeight
    },
    "goToSafePosition": {
        preconditions: { inDangerousArea: true },
        postconditions: { inDangerousArea: false },
        updateFunction: goToSafePositionAction,
        weight: () => 1
    },
    "runAway": {
        preconditions: { afraid: true, cowering: false },
        postconditions: { afraid: false, cowering: true },
        updateFunction: runAwayAction,
        weight: () => 1
    },
    "goToFallbackPosition": {
        preconditions: { atFallbackPosition: false },
        postconditions: { atFallbackPosition: true },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: () => 1
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
                targetKilled: false
            },
            postconditions: { targetKilled: true },
            updateFunction: castSpellAction(key),
            weight: castSpellWeight(key)
        };
    } else if (data.type === SpellType.HealSelf) {
        ActionData[action] = {
            preconditions: { lowHealth: true, [goal]: true },
            postconditions: { lowHealth: false },
            updateFunction: castSpellAction(key),
            weight: () => 1
        };
    } else if (data.type === SpellType.HealOther) {
        ActionData[action] = {
            preconditions: { allyLowHealth: true, [goal]: true },
            postconditions: { allyLowHealth: false },
            updateFunction: healAllyAction,
            weight: () => 1
        };
    }
}
