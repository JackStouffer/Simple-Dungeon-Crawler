import { Entity, World } from "ape-ecs";

import { RNG } from "./rot/index";

import globals from "./globals";
import { GameMap, getRandomFighterWithinRange, isBlocked, Point, setAllToExplored } from "./map";
import { displayMessage } from "./ui";
import { DamageType, ItemDataDetails, SpellDataDetails, StatusEffectType } from "./data";
import {
    createEntity,
    DisplayNameComponent,
    FlammableComponent,
    HitPointsComponent,
    PlannerAIComponent,
    PositionComponent,
    SpeedComponent,
    SpeedEffectComponent,
    StatsComponent
} from "./entity";
import { randomIntFromInterval, Nullable } from "./util";
import { mouseTarget } from "./input-handler";
import { addMana, getEffectiveHitPointData, getEffectiveStatData, heal, takeDamage } from "./fighter";

export type SkillFunction = (
    ecs: World,
    details: ItemDataDetails | SpellDataDetails,
    user: Entity,
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    rotation: Nullable<number>
) => boolean;

/**
 * Call the heal function on the user's fighter instance. Calls
 * the provided callback with true if the item was successfully used
 * and false otherwise.
 *
 * @param {Object} item The item data
 * @param {GameObject} user The object using the item
 */
export function castHeal(
    ecs: World,
    item: ItemDataDetails | SpellDataDetails,
    user: Entity
): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (item.value === null) { throw new Error("Item does not have a healing value"); }

    const hpData = getEffectiveHitPointData(user);
    if (hpData === null) { throw new Error(`Trying to heal entity ${user.id} without any hp data`); }

    if (hpData.hp >= hpData.maxHp) {
        if (user === globals.Game.player) {
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

/**
 * Call the addMana function on the user's fighter instance. Calls
 * the provided callback with true if the item was successfully used
 * and false otherwise.
 *
 * @param {Object} item The item data
 * @param {GameObject} user The object using the item
 */
export function castIncreaseMana(
    ecs: World,
    item: ItemDataDetails | SpellDataDetails,
    user: Entity
): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (item.value === null) { throw new Error("Item does not have a value"); }

    const statsData = getEffectiveStatData(user);
    if (statsData === null) { throw new Error(`Trying to heal entity ${user.id} without any hp data`); }

    if (statsData.mana >= statsData.maxMana) {
        if (user === globals.Game.player) {
            displayMessage("You are already at full mana.");
        } else {
            const displayName = user.getOne(DisplayNameComponent)!;
            displayMessage(`${displayName.name} tries and fails to take a mana potion`);
        }

        return false;
    }

    addMana(user.getOne(StatsComponent)!, item.value);
    return true;
}

function rollForStatusEffect(
    item: ItemDataDetails | SpellDataDetails,
    target: Entity,
    targetStats: any,
    targetHp: any
) {
    if (RNG.getUniform() <= targetStats.ailmentSusceptibility) {
        if (item?.statusEffect === StatusEffectType.OnFire) {
            const flammableData = target.getOne(FlammableComponent);
            if (flammableData === undefined) { return true; }

            flammableData.turnsLeft = randomIntFromInterval(3, 6);
            flammableData.fireDamage = Math.round(targetHp.maxHp * 0.0625);
            flammableData.update();
        } else if (item?.statusEffect !== undefined) {
            throw new Error(`Status effect ${item?.statusEffect} is no implemented`);
        }
    }

    return true;
}

export function castDamageSpell(
    ecs: World,
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    target: Nullable<Point>,
    map: Nullable<GameMap>
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value for castDamageSpell"); }
    if (target === null) { throw new Error("Target cannot be null for castDamageSpell"); }
    if (map === null) { throw new Error("Map cannot be null for castDamageSpell"); }

    const targetedEntity = mouseTarget(ecs, map, target);
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

    takeDamage(targetedEntity, item.value, false, item.damageType ?? DamageType.Physical);

    const stats = getEffectiveStatData(targetedEntity);
    const hp = getEffectiveHitPointData(targetedEntity);
    if (stats === null || hp === null) { return true; }
    return rollForStatusEffect(item, targetedEntity, stats, hp);
}

export function castWildDamageSpell(
    ecs: World,
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    targetedPos: Nullable<Point>,
    map: Nullable<GameMap>
): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (item.value === null || item.damageType === undefined) { throw new Error("Item has missing data"); }
    if (map === null) { throw new Error("Map cannot be null for castDamageSpell"); }

    const pos = user.getOne(PositionComponent);
    if (pos === undefined) { throw new Error("can't call castWildDamageSpell with a user without a position"); }

    let targetedEntity;
    do {
        targetedEntity = getRandomFighterWithinRange(ecs, map, pos, 16);
    } while (targetedEntity === user);

    if (targetedEntity === null) {
        if (user === globals.Game.player) {
            displayMessage("No target is close enough to use the scroll");
        }
        return false;
    }

    takeDamage(targetedEntity, item.value, false, item.damageType);

    const stats = getEffectiveStatData(targetedEntity);
    const hp = getEffectiveHitPointData(targetedEntity);
    if (stats === null || hp === null) { return true; }
    return rollForStatusEffect(item, targetedEntity, stats, hp);
}

export function castConfuse(
    ecs: World,
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    targetedPos: Nullable<Point>,
    map: Nullable<GameMap>
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value"); }
    if (targetedPos === null) { throw new Error("Target cannot be null for castConfuse"); }
    if (map === null) { throw new Error("Map cannot be null for castConfuse"); }

    const entity = mouseTarget(ecs, map, targetedPos);
    if (entity === null) {
        displayMessage("Canceled casting");
        return false;
    }
    const aiState = entity.getOne(PlannerAIComponent);
    if (aiState === undefined) {
        displayMessage("Canceled casting");
        return false;
    }

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
 *
 * @param {Object} item The item data
 * @param {GameObject} user The object using the item
 */
export function castHaste(
    ecs: World,
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
 *
 * @param {Object} item The item data
 * @param {GameObject} user The object using the item
 */
export function castSlow(
    ecs: World,
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    target: Nullable<Point>,
    map: Nullable<GameMap>
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value"); }
    if (target === null) { throw new Error("Target cannot be null for castSlow"); }
    if (map === null) { throw new Error("Map cannot be null for castSlow"); }

    const entity = mouseTarget(ecs, map, target);
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

    const speedEffects = user.getComponents(SpeedEffectComponent);
    // TODO implement filter/map for Iterators
    for (const e of speedEffects) {
        if (e.name === "Slow") {
            displayMessage(`${displayName.name} is already slowed`);
            return false;
        }
    }

    displayMessage(`Spell hits and slows ${displayName.name}`);

    user.addComponent({
        type: "SpeedEffectComponent",
        name: "Slow",
        stat: "speed",
        modifierType: "multiply",
        turnsLeft: item.value,
        value: 0.5
    });

    return true;
}

function castWall(
    ecs: World,
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    rotation: Nullable<number>,
    objectId: string
): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (target === null) { throw new Error("Target cannot be null for castWall"); }
    if (map === null) { throw new Error("Map cannot be null for castWall"); }
    if (rotation === null) { rotation = 0; }
    if (item.areaOfEffect === undefined) { throw new Error("areaOfEffect cannot be null for castWall"); }

    for (let dx = 0; dx < item.areaOfEffect.width; dx++) {
        for (let dy = 0; dy < item.areaOfEffect.height; dy++) {
            let locationX: number, locationY: number;
            switch (rotation) {
                default:
                case 0:
                    locationX = target.x + dx;
                    locationY = target.y + dy;
                    break;
                case 90:
                    locationX = target.x + dy;
                    locationY = target.y + dx;
                    break;
                case 180:
                    locationX = target.x + dx;
                    locationY = target.y - dy;
                    break;
                case 270:
                    locationX = target.x - dy;
                    locationY = target.y + dx;
                    break;
            }

            const { blocks, entity } = isBlocked(ecs, map, locationX, locationY);

            if (blocks === true && entity === null) {
                continue;
            }

            createEntity(ecs, objectId, locationX, locationY);
        }
    }

    return true;
}

export function castIceWall(
    ecs: World,
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    rotation: Nullable<number>
): boolean {
    return castWall(
        ecs,
        item,
        user,
        target,
        map,
        rotation,
        "ice_wall"
    );
}

export function castFireWall(
    ecs: World,
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    target: Nullable<Point>,
    map: Nullable<GameMap>,
    rotation: Nullable<number>
): boolean {
    return castWall(
        ecs,
        item,
        user,
        target,
        map,
        rotation,
        "fire_effect"
    );
}
