import { RNG, DIRS, Path } from "../rot/index";

import {
    Command,
    UseItemCommand,
    UseSpellCommand,
    GoToLocationCommand,
    InteractCommand,
    NoOpCommand,
    createPassableCallback
} from "../commands";
import {
    DisplayNameComponent,
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
    GameMap,
    getEntitiesAtLocation,
    isBlocked,
} from "../map";
import { displayMessage } from "../ui";
import { ItemType, SpellType } from "../data";
import { Nullable } from "../util";
import globals from "../globals";
import { Entity, World } from "ape-ecs";
import { WeightCallback } from "../rot/path/path";
import { getItems } from "../inventory";
import { getKnownSpells } from "../fighter";
import { SpellData } from "../skills";

function generateWeightCallback(ecs: World): WeightCallback {
    return function (x: number, y: number): number {
        if (globals.Game === null) { throw new Error("Global game object is null"); }

        const objects = getEntitiesAtLocation(ecs, x, y);
        // if (objects.length > 0) { console.log(objects); }
        return objects.length > 0 ? 20 : 0;
    };
}

/**
 * Calculate a path from a game object to the give x and y
 * coordinates. Return the x and y position of the nth step
 * along the path.
 * @param {GameObject} actor The starting point
 * @param {number} targetX The x coordinate to move towards
 * @param {number} targetY The y coordinate to move towards
 * @param {number} steps The number of steps along the path to take
 * @returns {Point} the nth step along the path
 */
export function getStepsTowardsTarget(
    ecs: World,
    origin: PositionComponent,
    target: PositionComponent,
    steps: number
): Nullable<number[][]> {
    const aStar = new Path.AStar(
        target.x,
        target.y,
        createPassableCallback(origin),
        generateWeightCallback(ecs),
        { topology: 8 }
    );

    const path: number[][] = [];
    function pathCallback(x: number, y: number) {
        path.push([x, y]);
    }
    aStar.compute(origin.x, origin.y, pathCallback);

    // remove our own position
    path.shift();
    // remove the target's position
    path.pop();

    if (path.length > 0) {
        return path.slice(0, steps);
    }
    return null;
}

/**
 * Generates a command to move in a random direction that is not
 * blocked.
 * @param ai The AI which is acting
 * @param map The current game map
 * @param gameObjects The current map's list of objects
 * @returns {Command} A move command
 */
export function wanderAction(
    ecs: World,
    ai: PlannerAIComponent,
    map: GameMap,
    triggerMap: Map<string, Entity>
): Command {
    let blocks: boolean = true;
    let entity: Nullable<Entity> = null;
    let newX: number = 0;
    let newY: number = 0;
    let dir: number = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;
    const pos = ai.entity.getOne(PositionComponent)!;

    do {
        dir = RNG.getItem([0, 1, 2, 3, 4, 5, 6, 7]) ?? 0;
        newX = pos.x + DIRS[8][dir][0];
        newY = pos.y + DIRS[8][dir][1];
        ({ blocks, entity } = isBlocked(ecs, map, newX, newY));
    } while (blocks === true || entity !== null);

    return new GoToLocationCommand([[newX, newY]], ecs, map, triggerMap);
}

/**
 * Generates a command to move towards the AI's current patrol node.
 * If the AI is at the patrol node, then set the AI's patrol node to
 * the next node.
 */
export function patrolAction(
    ecs: World,
    aiState: PlannerAIComponent,
    map: GameMap,
    triggerMap: Map<string, Entity>
): Command {
    const pos = aiState.entity.getOne(PositionComponent);
    const patrolState = aiState.entity.getOne(PatrolAIComponent);
    if (patrolState === undefined || pos === undefined) {
        throw new Error("Cannot patrol without a patrolState or position");
    }
    if (patrolState.patrolTarget === null) { throw new Error(`Null patrol target for entity ${aiState.entity.id}`); }

    let targetPos: PositionComponent = patrolState.patrolTarget.getOne(PositionComponent);
    let path: Nullable<number[][]> = getStepsTowardsTarget(
        ecs,
        pos,
        targetPos,
        2
    );
    // try the next node
    if (path === null) {
        const next = patrolState.patrolTarget.getOne(PatrolPathComponent);
        if (next === undefined) { throw new Error(`Missing patrol link on node ${patrolState.patrolTarget.id}`); }
        patrolState.patrolTarget = next.next;

        if (patrolState.patrolTarget === null) {
            return new NoOpCommand(true);
        }

        targetPos = patrolState.patrolTarget.getOne(PositionComponent);
        path = getStepsTowardsTarget(
            ecs,
            pos,
            targetPos,
            2
        );
    }
    // give up
    if (path === null) {
        return new NoOpCommand(true);
    }

    return new GoToLocationCommand(path, ecs, map, triggerMap);
}

/**
 * Go towards the AI's target
 * @param {AIComponent} ai The ai to act
 * @returns {Command} a command to move
 */
export function chaseAction(
    ecs: World,
    ai: PlannerAIComponent,
    map: GameMap,
    triggerMap: Map<string, Entity>
): Command {
    if (ai.target === null) { throw new Error("Cannot perform chaseAction without a target"); }

    const speedData = ai.entity.getOne(SpeedComponent);
    const posData = ai.entity.getOne(PositionComponent);
    const targetPosData = ai.target.getOne(PositionComponent);
    if (speedData === undefined || posData === undefined) {
        throw new Error(`Missing data for ${ai.entity.id}`);
    }
    if (targetPosData === undefined) {
        throw new Error(`Missing data for ${ai.target.id}`);
    }

    const path: Nullable<number[][]> = getStepsTowardsTarget(
        ecs,
        posData,
        targetPosData,
        speedData.maxTilesPerMove
    );
    if (path === null) {
        return new NoOpCommand(true);
    }

    if (path === null) {
        return new NoOpCommand(true);
    }

    return new GoToLocationCommand(path, ecs, map, triggerMap);
}

/**
 * Find the weight of chasing the AI's target
 * @param {AIComponent} ai the ai to calculate the weight for
 * @returns {number} the weight
 */
export function chaseWeight(aiState: PlannerAIComponent): number {
    const posData = aiState.entity.getOne(PositionComponent);
    const targetPosData = aiState.target.getOne(PositionComponent);
    if (posData === undefined || targetPosData === undefined) { throw new Error("no position data for ai"); }
    return distanceBetweenPoints(posData, targetPosData);
}

/**
 * Generate a command to attack the current AI's target. Should
 * only be called if the AI is in attack range.
 * @param ai The AI which is acting
 * @returns {Command} An attack command
 */
export function meleeAttackAction(
    ecs: World,
    ai: PlannerAIComponent
): Command {
    if (ai.target === null) { throw new Error("Cannot perform meleeAttackAction without a target"); }
    return new InteractCommand(ai.target);
}

/**
 * Generate a command to use the most effective healing item
 * in the AI's inventory.
 * @param ai The AI to act
 * @returns {Command} A use item command
 */
export function useHealingItemAction(
    ecs: World,
    aiState: PlannerAIComponent
): Command {
    const inventoryData = aiState.entity.getOne(InventoryComponent);
    const displayName = aiState.entity.getOne(DisplayNameComponent);
    if (inventoryData === undefined) { throw new Error("No inventory on owner for AI for castSpellAction"); }
    if (displayName === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing DisplayNameComponent`); }

    const item = getItems(inventoryData)
        .filter(i => i.type === ItemType.HealSelf)
        .sort((a, b) => a.value! - b.value!)[0];

    displayMessage(`${displayName.name} used a ${item.displayName}`);

    return new UseItemCommand(item.id, ecs);
}

/**
 * Generate a command to use the most effective add mana item
 * in the AI's inventory.
 * @param ai The AI to act
 * @returns {Command} A use item command
 */
export function useManaItemAction(
    ecs: World,
    aiState: PlannerAIComponent
): Command {
    const inventoryData = aiState.entity.getOne(InventoryComponent);
    const displayName = aiState.entity.getOne(DisplayNameComponent);
    if (inventoryData === undefined) { throw new Error("No inventory on owner for AI for castSpellAction"); }
    if (displayName === undefined) { throw new Error(`Entity ${aiState.entity.id} is missing DisplayNameComponent`); }

    const item = getItems(inventoryData)
        .filter(i => i.type === ItemType.AddManaSelf)
        .sort((a, b) => a.value! - b.value!)[0];

    displayMessage(`${displayName.name} used a ${item.displayName}`);

    return new UseItemCommand(item.id, ecs);
}

/**
 * A generator for an Action Update function.
 *
 * The generated update function will return a command
 * which uses the specified spell.
 *
 * @param {string} spellID The ID of the spell to use
 * @returns {function} the action update function
 */
export function castSpellAction(spellID: string) {
    return function (ecs: World, aiState: PlannerAIComponent, map: GameMap): Command {
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

        return new UseSpellCommand(spellID, ecs, targetPos, map);
    };
}

interface Action {
    preconditions: { [key: string]: boolean },
    postconditions: { [key: string]: boolean }
    updateFunction: (
        ecs: World,
        ai: PlannerAIComponent,
        map: GameMap,
        triggerMap: Map<string, Entity>
    ) => Command,
    weight: (aiState: PlannerAIComponent) => number
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
    "useManaItem": {
        preconditions: { lowMana: true, hasManaItem: true },
        postconditions: { lowMana: false },
        updateFunction: useManaItemAction,
        weight: () => 1
    },
    "useHealingItem": {
        preconditions: { lowHealth: true, hasHealingItem: true },
        postconditions: { lowHealth: false },
        updateFunction: useHealingItemAction,
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
        weight: () => 1
    },
    "reposition": {
        preconditions: { inDangerousArea: true },
        postconditions: { inDangerousArea: false },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: () => 1
    },
    "runAway": {
        preconditions: { afraid: true },
        postconditions: { afraid: false },
        updateFunction: () => { return new NoOpCommand(true); },
        weight: () => 1
    },
    "cower": {
        preconditions: { afraid: false, cowering: false },
        postconditions: { cowering: true },
        updateFunction: () => { return new NoOpCommand(true); },
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
    const goal = `enoughManaFor_${key}`;
    const action = `castSpell_${key}`;
    if (data.type === SpellType.DamageOther) {
        ActionData[action] = {
            preconditions: {
                [goal]: true,
                targetInLineOfSight: true,
                targetKilled: false
            },
            postconditions: { targetKilled: true },
            updateFunction: castSpellAction(key),
            weight: () => 1
        };
    } else if (data.type === SpellType.HealSelf) {
        ActionData[action] = {
            preconditions: { lowHealth: true, [goal]: true },
            postconditions: { lowHealth: false },
            updateFunction: castSpellAction(key),
            weight: () => 1
        };
    }
}
