import { Entity, World } from "ape-ecs";

import { DIRS, RNG } from "./rot/index";

import globals from "./globals";
import {
    GameMap,
    getRandomFighterWithinRange,
    isBlocked,
    Point,
    setAllToExplored,
    getRandomOpenSpace,
    getEntitiesAtLocation,
    getHighestZIndexWithTile
} from "./map";
import { displayMessage } from "./ui";
import { DamageType, ItemType, SpellType, StatusEffectType, TriggerType } from "./constants";
import {
    createEntity,
    DisplayNameComponent,
    EntityMap,
    FlammableComponent,
    FreezableComponent,
    GraphicsComponent,
    HitPointsComponent,
    ParalyzableComponent,
    PlannerAIComponent,
    PositionComponent,
    removeEntity,
    SilenceableComponent,
    SpeedComponent,
    SpeedEffectComponent,
    SpellsComponent,
    TriggerTypeComponent,
    TypeComponent,
    WetableComponent
} from "./entity";
import { randomIntFromInterval, Nullable, assertUnreachable } from "./util";
import { mouseTarget } from "./input-handler";
import { getEffectiveHitPointData, getEffectiveStatData, heal, takeDamage } from "./fighter";
import { getTargetingReticle } from "./graphics";
import { PushBackCommand } from "./commands";

export interface Area {
    type: "rectangle" | "circle";
    width?: number;
    height?: number;
    radius?: number;
}

export interface ItemDataDetails {
    id: string;
    displayName: string,
    description: string;
    type: ItemType,
    value: Nullable<number>,
    damageType?: DamageType;
    statusEffect?: StatusEffectType;
    areaOfEffect?: Area;

    useFunc: SkillFunction;
}

export interface SpellDataDetails {
    id: string;
    displayName: string;
    description: string;
    type: SpellType;
    value: Nullable<number>;
    damageType?: DamageType;
    statusEffect?: StatusEffectType;
    areaOfEffect?: Area;

    useFunc: SkillFunction;
}

export type SkillFunction = (
    details: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs?: World,
    map?: GameMap,
    entityMap?: EntityMap,
    target?: Point,
    rotation?: number
) => boolean;

/**
 * Call the heal function on the user's fighter instance. Calls
 * the provided callback with true if the item was successfully used
 * and false otherwise
 */
function castHeal(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity
): boolean {
    if (item.value === null) { throw new Error("Item does not have a healing value"); }

    const hpData = getEffectiveHitPointData(user);
    if (hpData === null) { throw new Error(`Trying to heal entity ${user.id} without any hp data`); }

    if (hpData.hp >= hpData.maxHp) {
        if (user.id === "player") {
            displayMessage("You are already at full health.");
        } else {
            const displayName = user.getOne(DisplayNameComponent)!;
            displayMessage(`${displayName.name} tries and fails to take a health potion`);
        }

        return false;
    }

    heal(user.getOne(HitPointsComponent)!, item.value);
    return true;
}

function castHealOther(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Point
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value for castDamageSpell"); }

    const targetedEntity = mouseTarget(ecs, map, entityMap, target);
    if (targetedEntity === null) {
        displayMessage("Canceled casting");
        return false;
    }

    const targetName = targetedEntity.getOne(DisplayNameComponent)!;
    const targetHPData = targetedEntity.getOne(HitPointsComponent);
    if (targetHPData === undefined) {
        displayMessage(`${targetName.name} isn't healable`);
        return false;
    }

    heal(targetHPData, item.value);
    return true;
}

/**
 * Set an entity on fire an deal with all of the interactions
 * between different statuses, and the behavior with different
 * types of entities
 */
export function setOnFire(target: Entity, damage?: number, turns?: number): boolean {
    const flammableData = target.getOne(FlammableComponent);
    const wetData = target.getOne(WetableComponent);
    const blocks = target.tags.has("blocks");
    if (flammableData === undefined) {
        if (target === globals.Game?.player) {
            displayMessage("You were not set on fire because you're immune");
        } else {
            const displayName = target.getOne(DisplayNameComponent)!;
            displayMessage(`${displayName.name} was not set on fire because it is immune`);
        }
        return false;
    }

    // You can't be set on fire if you're wet
    if (wetData !== undefined && wetData.wet) {
        wetData.wet = false;
        wetData.turnsLeft = 0;
        wetData.update();

        if (target === globals.Game?.player) {
            displayMessage("You were not set on fire because you were wet");
        } else {
            const displayName = target.getOne(DisplayNameComponent)!;
            displayMessage(`${displayName.name} was not set on fire because it was wet`);
        }

        return false;
    }

    // If the entity doesn't block and it's on fire, we want
    // to add a fire trigger component so that things catch
    // on fire when they step on it
    if (flammableData.onFire === false && !blocks) {
        target.addComponent({
            type: "TriggerTypeComponent",
            triggerType: TriggerType.Fire
        });
        target.addComponent({
            type: "FireTriggerComponent",
            effectTurns: 5,
            effectDamage: 5,
            damage: 15
        });
    }

    // Inanimate objects should burn until they
    // are consumed
    if (target.tags.has("sentient")) {
        flammableData.turnsLeft = turns ?? randomIntFromInterval(3, 6);
    } else {
        flammableData.turnsLeft = 1000;
    }

    const hpData = target.getOne(HitPointsComponent);
    if (damage !== undefined) {
        flammableData.fireDamage = damage;
    } else if (hpData !== undefined) {
        flammableData.fireDamage = Math.max(
            1,
            Math.round(hpData.maxHp * 0.0625)
        );
    } else {
        flammableData.fireDamage = 3;
    }

    flammableData.onFire = true;
    flammableData.update();

    return true;
}

export function setWet(target: Entity, turns?: number): boolean {
    // Put the fire out if the actor is on fire
    const flammableData = target.getOne(FlammableComponent);
    if (flammableData !== undefined && flammableData.onFire) {
        flammableData.onFire = false;
        flammableData.turnsLeft = 0;
        flammableData.fireDamage = 0;
        flammableData.update();

        if (target === globals.Game?.player) {
            displayMessage("The water doused you");
        }
    }

    if (turns === undefined) { turns = 10; }
    const wetData = target.getOne(WetableComponent);
    if (wetData !== undefined && (wetData.wet === false || wetData.turnsLeft < turns)) {
        wetData.wet = true;
        wetData.turnsLeft = turns;
        wetData.update();
        return true;
    }

    return false;
}

export function setParalyzed(target: Entity, turns?: number): boolean {
    const paralyzableData = target.getOne(ParalyzableComponent);
    if (paralyzableData === undefined) { return false; }

    turns = turns ?? randomIntFromInterval(2, 4);

    if (paralyzableData.paralyzed && paralyzableData.turnsLeft >= turns) {
        return false;
    } else if (paralyzableData.paralyzed && paralyzableData.turnsLeft < turns) {
        paralyzableData.turnsLeft = turns ?? 0;
        paralyzableData.update();
        return true;
    }

    paralyzableData.paralyzed = true;
    paralyzableData.turnsLeft = turns;
    paralyzableData.update();

    return true;
}

export function setFrozen(target: Entity, turns: number): boolean {
    const name = target.getOne(DisplayNameComponent);
    const triggerData = target.getOne(TriggerTypeComponent);

    // Put the fire out if on fire
    const flammableData = target.getOne(FlammableComponent);
    if (flammableData !== undefined && flammableData.onFire) {
        flammableData.onFire = false;
        flammableData.turnsLeft = 0;
        flammableData.fireDamage = 0;
        flammableData.update();

        if (target === globals.Game?.player) {
            displayMessage("Instead of being frozen, the fire was extinguished");
        } else if (name !== undefined) {
            displayMessage(`Instead of ${name.name} being frozen, it is no longer on fire`);
        }

        if (triggerData !== undefined && triggerData.triggerType === TriggerType.Fire) {
            target.removeComponent("TriggerTypeComponent");
            target.removeComponent("FireTriggerComponent");
        }

        return false;
    }

    const frozenData = target.getOne(FreezableComponent);
    if (frozenData !== undefined && (frozenData.frozen === false || frozenData.turnsLeft < turns)) {
        frozenData.frozen = true;
        frozenData.turnsLeft = turns;
        frozenData.update();

        if (target === globals.Game?.player) {
            displayMessage("You are frozen");
        } else if (name !== undefined && target.tags.has("sentient")) {
            displayMessage(`${name.name} is now frozen`);
        }

        if (triggerData !== undefined &&
            (triggerData.triggerType === TriggerType.DeepWater ||
                triggerData.triggerType === TriggerType.ShallowWater ||
                triggerData.triggerType === TriggerType.Mud)) {
            triggerData.triggerType = TriggerType.Ice;
            triggerData.update();
        }

        const graphics = target.getOne(GraphicsComponent);
        if (graphics !== undefined && graphics.sprite !== null && frozenData.textureKey !== null) {
            graphics.sprite.texture = globals.Game!.textureAtlas[frozenData.textureKey];
        } else if (graphics !== undefined &&
            graphics.sprite !== null &&
            frozenData.textureKey === null) {
            graphics.sprite.texture = globals.Game!.textureAtlas[graphics.textureKey];
        }

        return true;
    }

    return false;
}

function rollForStatusEffect(
    item: ItemDataDetails | SpellDataDetails,
    target: Entity,
    targetStats: any,
    targetHp: Pick<HitPointsComponent, "hp" | "maxHp">
): void {
    if (item.statusEffect === undefined) { return; }

    if (RNG.getUniform() <= targetStats.ailmentSusceptibility) {
        switch (item.statusEffect) {
            case StatusEffectType.OnFire:
                setOnFire(target, Math.round(targetHp.maxHp * 0.0625), randomIntFromInterval(3, 6));
                break;
            case StatusEffectType.Frozen:
                throw new Error("Not implemented");
            case StatusEffectType.Paralyzed:
                setParalyzed(target, randomIntFromInterval(2, 4));
                break;
            default:
                assertUnreachable(item.statusEffect);
        }
    }
}

export function castDamageSpell(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Point
): boolean {
    function findEntitiesInBodyOfWater(start: Point): Entity[] {
        const entitiesInWater: Entity[] = [];
        // TODO: JS doesn't have a hash set so you can't do a set of objects
        // write one so we don't have to use string keys
        const todo: Map<string, Point> = new Map();
        todo.set(`${start.x},${start.y}`, start);
        const done: Set<string> = new Set();

        while (todo.size > 0) {
            const tile = todo.values().next().value;
            done.add(`${tile.x},${tile.y}`);
            todo.delete(`${tile.x},${tile.y}`);

            const entities = getEntitiesAtLocation(entityMap, tile.x, tile.y);
            // TODO, SPEED: iterating twice here
            const waterTiles = entities.filter(e => e.tags.has("waterTile"));
            const hpEntities = entities.filter(e => {
                return e.getOne(HitPointsComponent) !== undefined;
            });
            if (waterTiles.length > 0) {
                entitiesInWater.push(...hpEntities);
            }

            // get neighbors, using only cardinal directions electricity
            // jumping diagonally with no cardinal tiles looks wrong
            for (let i = 0; i < DIRS[4].length; i++) {
                const dir = DIRS[4][i];
                const x = tile.x + dir[0];
                const y = tile.y + dir[1];

                if (done.has(`${x},${y}`)) { continue; }

                const entities = getEntitiesAtLocation(entityMap, x, y);
                const hasWater = entities.filter(e => e.tags.has("waterTile")).length > 0;
                if (hasWater) {
                    todo.set(`${x},${y}`, { x, y });
                }
            }
        }

        return entitiesInWater;
    }

    if (item.value === null) { throw new Error("Item does not have a value for castDamageSpell"); }

    const targetedEntity = mouseTarget(ecs, map, entityMap, target);
    if (targetedEntity === null) {
        displayMessage("Canceled casting");
        return false;
    }

    const targetName = targetedEntity.getOne(DisplayNameComponent);
    const targetHPData = targetedEntity.getOne(HitPointsComponent);
    if (targetHPData === undefined && targetName !== undefined) {
        displayMessage(`${targetName.name} isn't attack-able`);
        return false;
    }

    // If the target is standing in water, we're going to
    // have the electricity spread throughout the water body
    // and damage everything standing in it
    if (item.damageType === DamageType.Electric) {
        const entities = getEntitiesAtLocation(entityMap, target.x, target.y);
        const isOnWater = entities.filter(e => e.tags.has("waterTile")).length > 0;
        if (isOnWater) {
            const entitiesToDamage = findEntitiesInBodyOfWater({ x: target.x, y: target.y });
            for (let i = 0; i < entitiesToDamage.length; i++) {
                // TODO: Add special sound effect here
                takeDamage(
                    entitiesToDamage[i],
                    item.value,
                    false,
                    item.damageType ?? DamageType.Physical
                );
            }
        } else {
            takeDamage(targetedEntity, item.value, false, item.damageType ?? DamageType.Physical);
        }
    } else {
        takeDamage(targetedEntity, item.value, false, item.damageType ?? DamageType.Physical);
    }

    const stats = getEffectiveStatData(targetedEntity);
    const hp = getEffectiveHitPointData(targetedEntity);
    if (stats === null || hp === null) { return true; }
    rollForStatusEffect(item, targetedEntity, stats, hp);
    return true;
}

export function castFireBall(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Point,
    rotation: number
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value for castDamageSpell"); }

    const targetedEntity = mouseTarget(ecs, map, entityMap, target);
    if (targetedEntity === null) {
        displayMessage("Canceled casting");
        return false;
    }

    const tiles = getTargetingReticle(item, target, rotation);
    for (let i = 0; i < tiles.length; i++) {
        const { entity } = isBlocked(map, entityMap, tiles[i][0], tiles[i][1]);
        if (entity !== null) {
            const targetHPData = entity.getOne(HitPointsComponent);
            if (targetHPData !== undefined) {
                // Make the spell dangerous by having it set things on fire rather than
                // destroy them if they're not actors
                if (item.statusEffect === StatusEffectType.OnFire && !entity.tags.has("sentient")) {
                    setOnFire(entity);
                } else {
                    takeDamage(entity, item.value, false, item.damageType ?? DamageType.Physical);

                    const stats = getEffectiveStatData(entity);
                    const hp = getEffectiveHitPointData(entity);
                    if (stats !== null && hp !== null) {
                        rollForStatusEffect(item, entity, stats, hp);
                    }
                }
            }
        }
    }

    return true;
}

export function castWildDamageSpell(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap
): boolean {
    if (item.value === null || item.damageType === undefined) { throw new Error("Item has missing data"); }

    const pos = user.getOne(PositionComponent);
    if (pos === undefined) { throw new Error("can't call castWildDamageSpell with a user without a position"); }

    let targetedEntity;
    do {
        targetedEntity = getRandomFighterWithinRange(ecs, map, pos, 16);
    } while (targetedEntity === user);

    if (targetedEntity === null) {
        if (user.id === "player") {
            displayMessage("No target is close enough to use the scroll");
        }
        return false;
    }

    takeDamage(targetedEntity, item.value, false, item.damageType);

    const stats = getEffectiveStatData(targetedEntity);
    const hp = getEffectiveHitPointData(targetedEntity);
    if (stats === null || hp === null) { return true; }
    rollForStatusEffect(item, targetedEntity, stats, hp);
    return true;
}

export function castConfuse(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Point
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value"); }

    const entity = mouseTarget(ecs, map, entityMap, target);
    if (entity === null) {
        displayMessage("Canceled casting");
        return false;
    }
    const aiState = entity.getOne(PlannerAIComponent);
    if (aiState === undefined) {
        displayMessage("Canceled casting");
        return false;
    }

    // TODO: Make confused an already existing component like Flammable
    // so that not every AI is confusable
    entity.addComponent({
        type: "ConfusedAIComponent",
        turnsLeft: item.value
    });

    const name = entity.getOne(DisplayNameComponent);
    if (name !== undefined) {
        displayMessage(`${name.name} is now confused`);
    }

    return true;
}

export function castClairvoyance(): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    displayMessage("You have been granted Clairvoyance");
    setAllToExplored(globals.Game.map);
    return true;
}

/**
 * Double the user's fighter's speed stat for value number
 * of turns. Does not stack.
 */
export function castHaste(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value"); }

    const speedEffects = user.getComponents(SpeedEffectComponent);
    // TODO implement filter/map for Iterators
    for (const e of speedEffects) {
        if (e.name === "Haste") {
            displayMessage("You are already hasted");
            return false;
        }
    }

    user.addComponent({
        type: "SpeedEffectComponent",
        name: "Haste",
        stat: "speed",
        modifierType: "multiply",
        turnsLeft: item.value,
        value: 2
    });

    return true;
}

/**
 * Half the target's fighter speed stat for value number
 * of turns. Does not stack.
 */
export function castSlow(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Point
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value"); }

    const entity = mouseTarget(ecs, map, entityMap, target);
    if (entity === null) {
        displayMessage("Canceled casting");
        return false;
    }

    const speedData = entity.getOne(SpeedComponent);
    const displayName = entity.getOne(DisplayNameComponent);
    if (displayName === undefined) {
        throw new Error(`${entity.id} is missing a display name`);
    }

    if (speedData === undefined) {
        displayMessage(`${displayName.name} isn't slow-able`);
        return false;
    }

    const speedEffects = entity.getComponents(SpeedEffectComponent);
    // TODO implement filter/map for Iterators
    for (const e of speedEffects) {
        if (e.name === "Slow") {
            displayMessage(`${displayName.name} is already slowed`);
            return false;
        }
    }

    displayMessage(`Spell hits and slows ${displayName.name}`);

    entity.addComponent({
        type: "SpeedEffectComponent",
        name: "Slow",
        stat: "speed",
        modifierType: "multiply",
        turnsLeft: item.value,
        value: 0.5
    });

    return true;
}

/**
 * Spawn a bunch of entities with the given ID in shape defined
 * by the item's details. Used for the wall of fire and wall of
 * ice spells.
 */
function castWall(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Point,
    rotation: number,
    objectId: string
): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (item.areaOfEffect === undefined) { throw new Error("areaOfEffect cannot be null for castWall"); }

    const tiles = getTargetingReticle(item, target, rotation);

    for (let i = 0; i < tiles.length; i++) {
        const { blocks, entity } = isBlocked(map, entityMap, tiles[i][0], tiles[i][1]);

        if (blocks === true && entity === null) {
            continue;
        }

        createEntity(ecs, globals.Game.textureAtlas, objectId, tiles[i][0], tiles[i][1]);
    }

    return true;
}

export function castIceWall(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Point,
    rotation: number
): boolean {
    return castWall(
        item,
        user,
        ecs,
        map,
        entityMap,
        target,
        rotation,
        "ice_wall"
    );
}

export function castFireWall(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Point,
    rotation: number
): boolean {
    return castWall(
        item,
        user,
        ecs,
        map,
        entityMap,
        target,
        rotation,
        "fire_effect"
    );
}

/**
 * Set a target on fire. Creates steam clouds when used on water tiles
 * and removes puddles.
 */
export function castCombust(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Point
): boolean {
    if (target.x >= map[0][0].length ||
        target.y >= map[0].length ||
        map[0][target.y][target.x]!.visible === false) {
        displayMessage("Canceled casting");
        return false;
    }

    const targetedEntity = getEntitiesAtLocation(entityMap, target.x, target.y)
        .sort((a, b) => {
            const plannerA = a.getOne(PlannerAIComponent);
            const plannerB = b.getOne(PlannerAIComponent);

            if (plannerA !== undefined && plannerB === undefined) { return -1; }
            if (plannerA === undefined && plannerB === undefined) { return 0; }
            if (plannerA === undefined && plannerB !== undefined) { return 1; }
            if (plannerA !== undefined && plannerB !== undefined) { return 1; }
            return -1;
        })[0];

    if (targetedEntity === undefined) {
        displayMessage("Canceled casting");
        return false;
    }

    if (targetedEntity.tags.has("waterTile")) {
        for (let dx = -5; dx < 5; dx++) {
            const height = Math.round(Math.sqrt(
                5 * 5 - dx * dx
            ));

            for (let dy = -height; dy < height; dy++) {
                createEntity(ecs, globals.Game!.textureAtlas, "steam", target.x + dx, target.y + dy);
            }
        }

        const t = targetedEntity.getOne(TypeComponent);
        if (t !== undefined && t.type === "puddle") {
            removeEntity(ecs, targetedEntity);
        }
    } else {
        setOnFire(targetedEntity);
    }

    return true;
}

/**
 * Set a target on fire
 */
export function castRain(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap
): boolean {
    if (globals.Game === null) { throw new Error("Global game object cannot be null"); }
    if (item.value === null) { throw new Error("value cannot be null for castRain"); }

    const entities = ecs.entities.values();
    for (const e of entities) {
        setWet(e, item.value);
    }

    // Spawn puddles in random places on the map
    for (let i = 0; i < 30; i++) {
        const { x, y } = getRandomOpenSpace(map, entityMap);
        createEntity(ecs, globals.Game.textureAtlas, "puddle", x, y);
    }

    return true;
}


export function castSilence(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Point
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value for castDamageSpell"); }

    const targetedEntity = mouseTarget(ecs, map, entityMap, target);
    if (targetedEntity === null) {
        displayMessage("Canceled casting");
        return false;
    }

    const targetName = targetedEntity.getOne(DisplayNameComponent)!;
    const targetSpellData = targetedEntity.getOne(SpellsComponent);
    const targetSilenceableData = targetedEntity.getOne(SilenceableComponent);
    if (targetSilenceableData === undefined) {
        displayMessage(`${targetName.name} is immune to silence effects`);
        return false;
    }
    if (targetSpellData === undefined) {
        displayMessage(`${targetName.name} cannot be silenced because it doesn't know any spells`);
        return false;
    }

    displayMessage(`${targetName.name} is silenced`);
    targetSilenceableData.silenced = true;
    targetSilenceableData.turnsLeft = item.value;
    targetSilenceableData.update();
    return true;
}

export function castExhale(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap
): boolean {
    if (item.value === null) { throw new Error("Item has missing data"); }

    const pos = user.getOne(PositionComponent);
    if (pos === undefined) { throw new Error("can't call castWildDamageSpell with a user without a position"); }
    const tilePos = pos.tilePosition();

    for (let i = 0; i < DIRS[8].length; i++) {
        const dir = DIRS[8][i];
        const dx = tilePos.x + dir[0];
        const dy = tilePos.y + dir[1];

        const { entity } = isBlocked(map, entityMap, dx, dy);
        if (entity !== null) {
            if (entity.tags.has("moveable")) {
                globals.Game!.commandQueue.push(new PushBackCommand(entity, i, 3));
            }
        }
    }

    return true;
}

export function castFreeze(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Point
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value for castFreeze"); }

    const targetedEntity = mouseTarget(ecs, map, entityMap, target, false);
    if (targetedEntity === null) {
        displayMessage("Canceled casting");
        return false;
    }

    const targetName = targetedEntity.getOne(DisplayNameComponent)!;
    const targetFreezableData = targetedEntity.getOne(FreezableComponent);
    if (targetFreezableData === undefined) {
        displayMessage(`${targetName.name} cannot be frozen`);
        return false;
    }

    const targetPos = targetedEntity.getOne(PositionComponent)!.tilePosition();

    const positions: Point[] = [targetPos];
    for (const dir of DIRS[8]) {
        positions.push({ x: targetPos.x + dir[0], y: targetPos.y + dir[1] });
        // Create a cool looking creeping ice effect
        if (Math.random() > 0.5) {
            positions.push({ x: targetPos.x + (dir[0] * 2), y: targetPos.y + (dir[1] * 2) });
            if (Math.random() > 0.4) {
                positions.push({ x: targetPos.x + (dir[0] * 3), y: targetPos.y + (dir[1] * 3) });
            }
        }
    }

    for (const pos of positions) {
        if (pos.x < map[0][0].length &&
            pos.y < map[0].length) {
            const z = getHighestZIndexWithTile(map, pos.x, pos.y);
            if (map[z][pos.y][pos.x]!.blocks === false) {
                const entities = getEntitiesAtLocation(entityMap, pos.x, pos.y);
                if (entities.length === 0) {
                    const puddle = createEntity(ecs, globals.Game!.textureAtlas, "puddle", pos.x, pos.y);
                    setFrozen(puddle, item.value * 3);
                } else {
                    for (const e of entities) {
                        setFrozen(e, e.tags.has("sentient") ? item.value : item.value * 3);
                    }
                }
            }
        }
    }

    return true;
}

/**
 * Map of item IDs and their data, including a function pointer
 * to the implementation of the item's behavior
 */
export const ItemData: { [key: string]: ItemDataDetails } = {
    "health_potion_weak": {
        id: "health_potion_weak",
        displayName: "Weak Potion of Healing",
        description: "Potion that restores a small amount of health",
        value: 25,
        type: ItemType.HealSelf,
        useFunc: castHeal
    },
    "health_potion": {
        id: "health_potion",
        displayName: "Potion of Healing",
        description: "Potion that restores a some health",
        value: 50,
        type: ItemType.HealSelf,
        useFunc: castHeal
    },
    "health_potion_strong": {
        id: "health_potion_strong",
        displayName: "Strong Potion of Healing",
        description: "Potion that restores a large amount of health",
        value: 100,
        type: ItemType.HealSelf,
        useFunc: castHeal
    },
    "lightning_scroll_weak": {
        id: "lightning_scroll_weak",
        displayName: "Weak Scroll of Lightning Bolt",
        description: "Conjure a lightning bolt that damages a target with lightning damage",
        value: 20,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell
    },
    "lightning_scroll": {
        id: "lightning_scroll",
        displayName: "Scroll of Lightning",
        description: "Conjure a lightning bolt that damages a target with lightning damage",
        value: 50,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell
    },
    "lightning_scroll_strong": {
        id: "lightning_scroll_strong",
        displayName: "Strong Scroll of Lightning",
        description: "Conjure a lightning bolt that damages a target with lightning damage",
        value: 100,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell
    },
    "fireball_scroll_weak": {
        id: "fireball_scroll_weak",
        displayName: "Weak Scroll of Fire",
        description: "Conjure a ball of fire that damages a target with fire damage",
        value: 20,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll": {
        id: "fireball_scroll",
        displayName: "Scroll of Fire",
        description: "Conjure a ball of fire that damages a target with fire damage",
        value: 50,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll_strong": {
        id: "fireball_scroll_strong",
        displayName: "Strong Scroll of Fire",
        description: "Conjure a ball of fire that damages a target with fire damage",
        value: 100,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "lightning_scroll_weak_wild": {
        id: "lightning_scroll_weak_wild",
        displayName: "Weak Scroll of Wild Lightning",
        description: "Summons a lightning bolt that's beyond your control and attacks randomly with lightning damage",
        value: 50,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell
    },
    "lightning_scroll_wild": {
        id: "lightning_scroll_wild",
        displayName: "Scroll of Wild Lightning",
        description: "Summons a lightning bolt that's beyond your control and attacks randomly with lightning damage",
        value: 100,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell,
    },
    "lightning_scroll_strong_wild": {
        id: "lightning_scroll_strong_wild",
        displayName: "Strong Scroll of Wild Lightning",
        description: "Summons a lightning bolt that's beyond your control and attacks randomly with lightning damage",
        value: 150,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell
    },
    "fireball_scroll_weak_wild": {
        id: "fireball_scroll_weak_wild",
        displayName: "Weak Scroll of Wild Fire",
        description: "Summons a ball of fire that's beyond your control and attacks randomly with fire damage",
        value: 50,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        useFunc: castWildDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll_wild": {
        id: "fireball_scroll_wild",
        displayName: "Scroll of Wild Fire",
        description: "Summons a ball of fire that's beyond your control and attacks randomly with fire damage",
        value: 100,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        useFunc: castWildDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll_strong_wild": {
        id: "fireball_scroll_strong_wild",
        displayName: "Strong Scroll of Wild Fire",
        description: "Summons a ball of fire that's beyond your control and attacks randomly with fire damage",
        value: 150,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        useFunc: castWildDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "confuse_scroll": {
        id: "confuse_scroll",
        displayName: "Scroll of Confuse Enemy",
        description: "Your target loses control of their actions",
        value: 8,
        type: ItemType.ConfuseScroll,
        useFunc: castConfuse,
    },
    "clairvoyance_scroll": {
        id: "clairvoyance_scroll",
        displayName: "Scroll of Clairvoyance",
        description: "Use sensory magics to learn the layout of the whole map",
        value: null,
        type: ItemType.ClairvoyanceScroll,
        useFunc: castClairvoyance
    },
    "haste_potion_weak": {
        id: "haste_potion_weak",
        displayName: "Weak Potion of Haste",
        description: "Haste gives you more actions per turn",
        value: 5,
        type: ItemType.HasteSelf,
        useFunc: castHaste,
    },
    "slow_poison_weak": {
        id: "slow_poison_weak",
        displayName: "Weak Poison of Slow",
        description: "Only allow your target to take one action per two turns",
        value: 5,
        type: ItemType.SlowOther,
        useFunc: castSlow
    }
};

/**
 * Defines all the properties of a spell: the name,
 * damage values, damage type, and the function to execute.
 */
export const SpellData: { [key: string]: SpellDataDetails } = {
    "lightning_bolt": {
        id: "lightning_bolt",
        displayName: "Lightning Bolt",
        description: "Send a bolt of lighting hurtling towards your foes. Deals electric damage.",
        value: 20,
        type: SpellType.DamageOther,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell
    },
    "wild_lightning_bolt": {
        id: "wild_lightning_bolt",
        displayName: "Wild Lightning Bolt",
        description: "Summons a lightning bolt that's beyond your control and attacks a random target within 10 spaces. Deals lightning damage",
        value: 30,
        type: SpellType.WildDamage,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell
    },
    "fireball": {
        id: "fireball",
        displayName: "Fireball",
        description: "Hurl a ball of fire towards a specific spot that deals fire damage and has a chance to catch targets on fire. Explodes in a large radius, possibly dealing self-damage or friendly fire",
        value: 20,
        type: SpellType.DamageOther,
        damageType: DamageType.Fire,
        useFunc: castFireBall,
        areaOfEffect: {
            type: "circle",
            radius: 3
        },
        statusEffect: StatusEffectType.OnFire
    },
    "confuse": {
        id: "confuse",
        displayName: "Confuse",
        description: "Your target loses control of their actions for the given number of turns",
        value: 8,
        type: SpellType.DamageOther,
        useFunc: castConfuse
    },
    "clairvoyance": {
        id: "clairvoyance",
        displayName: "Clairvoyance",
        description: "Use sensory magics to learn the layout of the whole map.",
        value: null,
        type: SpellType.Passive,
        useFunc: castClairvoyance
    },
    "lesser_heal": {
        id: "lesser_heal",
        displayName: "Lesser Heal",
        description: "Heals a small amount of hit points",
        value: 25,
        type: SpellType.HealSelf,
        useFunc: castHeal
    },
    "heal": {
        id: "heal",
        displayName: "Heal",
        description: "Heals a good amount of health",
        value: 50,
        type: SpellType.HealSelf,
        useFunc: castHeal
    },
    "greater_heal": {
        id: "greater_heal",
        displayName: "Greater Heal",
        description: "Gives a large amount of health",
        value: 100,
        type: SpellType.HealSelf,
        useFunc: castHeal
    },
    "heal_other": {
        id: "heal_other",
        displayName: "Heal Other",
        description: "Heals someone else for a small amount of hit points",
        value: 25,
        type: SpellType.HealOther,
        useFunc: castHealOther
    },
    "lesser_haste": {
        id: "lesser_haste",
        displayName: "Lesser Haste",
        description: "You can make two actions for every one turn for the given number of turns.",
        value: 10,
        type: SpellType.Effect,
        useFunc: castHaste
    },
    "lesser_slow": {
        id: "lesser_slow",
        displayName: "Lesser Slow",
        description: "Only allow your target to take one action per two turns",
        value: 10,
        type: SpellType.DamageOther,
        useFunc: castSlow
    },
    "fire_wall": {
        id: "fire_wall",
        displayName: "Wall of Fire",
        description: "Conjure a wall of flame that damages all who walk through it",
        value: 10,
        type: SpellType.DamageOther,
        damageType: DamageType.Fire,
        areaOfEffect: {
            type: "rectangle",
            width: 1,
            height: 6
        },
        useFunc: castFireWall
    },
    "ice_wall": {
        id: "ice_wall",
        displayName: "Wall of Ice",
        description: "Conjure a wall of ice that blocks foe's path",
        value: null,
        type: SpellType.DamageOther,
        areaOfEffect: {
            type: "rectangle",
            width: 1,
            height: 6
        },
        useFunc: castIceWall
    },
    "combust": {
        id: "combust",
        displayName: "Combust",
        description: "Doesn't do much damage, but is guaranteed to light something on fire",
        value: 5,
        type: SpellType.DamageOther,
        useFunc: castCombust
    },
    "rain": {
        id: "rain",
        displayName: "Rain",
        description: "Calls a storm which makes everything wet",
        value: 15,
        type: SpellType.Passive,
        useFunc: castRain
    },
    "silence": {
        id: "silence",
        displayName: "Silence",
        description: "Removes the target's ability to cast spells for a number of turns",
        value: 3,
        type: SpellType.DamageOther,
        useFunc: castSilence
    },
    "exhale": {
        id: "exhale",
        displayName: "Exhale",
        description: "Send out a burst of air from your body in all directions, pushing away anything that's too close. Enemies which slam into objects take physical damage and have a chance to be stunned.",
        value: 4,
        type: SpellType.Push,
        useFunc: castExhale
    },
    "freeze": {
        id: "freeze",
        displayName: "Freeze",
        description: "Freezes the target solid so they can't move and they become weak to physical damage. Does not damage the target.",
        value: 4,
        type: SpellType.DamageOther,
        useFunc: castFreeze
    }
};
