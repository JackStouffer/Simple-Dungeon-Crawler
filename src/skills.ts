import { Entity, World } from "ape-ecs";

import { RNG } from "./rot/index";

import globals from "./globals";
import { GameMap, getRandomFighterWithinRange, isBlocked, Point, setAllToExplored } from "./map";
import { displayMessage } from "./ui";
import { DamageType, ItemType, SpellType, StatusEffectType, TriggerType } from "./constants";
import {
    createEntity,
    DisplayNameComponent,
    FlammableComponent,
    HitPointsComponent,
    PlannerAIComponent,
    PositionComponent,
    SpeedComponent,
    SpeedEffectComponent,
    StatsComponent,
    WetableComponent
} from "./entity";
import { randomIntFromInterval, Nullable, assertUnreachable } from "./util";
import { mouseTarget } from "./input-handler";
import { addMana, getEffectiveHitPointData, getEffectiveStatData, heal, takeDamage } from "./fighter";

interface Area {
    width: number;
    height: number;
}

export interface ItemDataDetails {
    displayName: string,
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
    manaCost: number;
    type: SpellType;
    value: Nullable<number>;
    damageType?: DamageType;
    statusEffect?: StatusEffectType;
    areaOfEffect?: Area;

    useFunc: SkillFunction;
}

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

export function setOnFire(target: Entity, damage?: number, turns?: number): boolean {
    const flammableData = target.getOne(FlammableComponent);
    const wetData = target.getOne(WetableComponent);
    const blocks = target.tags.has("blocks");
    if (flammableData === undefined) { return false; }

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
    if (target.has(PlannerAIComponent)) {
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

function rollForStatusEffect(
    item: ItemDataDetails | SpellDataDetails,
    target: Entity,
    targetStats: any,
    targetHp: any
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
                throw new Error("Not implemented");
            default:
                assertUnreachable(item.statusEffect);
        }
    }
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
    rollForStatusEffect(item, targetedEntity, stats, hp);
    return true;
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
    rollForStatusEffect(item, targetedEntity, stats, hp);
    return true;
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

/**
 * Set a target on fire
 */
export function castCombust(
    ecs: World,
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    target: Nullable<Point>,
    map: Nullable<GameMap>
): boolean {
    if (target === null) { throw new Error("Target cannot be null for castDamageSpell"); }
    if (map === null) { throw new Error("Map cannot be null for castDamageSpell"); }

    const targetedEntity = mouseTarget(ecs, map, target);
    if (targetedEntity === null) {
        displayMessage("Canceled casting");
        return false;
    }

    setOnFire(targetedEntity);
    return true;
}

/**
 * Map of item IDs and their data, including a function pointer
 * to the implementation of the item's behavior
 */
export const ItemData: { [key: string]: ItemDataDetails } = {
    "health_potion_weak": {
        displayName: "Weak Potion of Healing",
        value: 25,
        type: ItemType.HealSelf,
        useFunc: castHeal
    },
    "health_potion": {
        displayName: "Potion of Healing",
        value: 50,
        type: ItemType.HealSelf,
        useFunc: castHeal
    },
    "health_potion_strong": {
        displayName: "Strong Potion of Healing",
        value: 100,
        type: ItemType.HealSelf,
        useFunc: castHeal
    },
    "mana_potion_weak": {
        displayName: "Weak Potion of Mana",
        value: 25,
        type: ItemType.AddManaSelf,
        useFunc: castIncreaseMana
    },
    "lightning_scroll_weak": {
        displayName: "Weak Scroll of Lightning",
        value: 20,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell
    },
    "lightning_scroll": {
        displayName: "Scroll of Lightning",
        value: 50,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell
    },
    "lightning_scroll_strong": {
        displayName: "Strong Scroll of Lightning",
        value: 100,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell
    },
    "fireball_scroll_weak": {
        displayName: "Weak Scroll of Fire",
        value: 20,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll": {
        displayName: "Scroll of Fire",
        value: 50,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll_strong": {
        displayName: "Strong Scroll of Fire",
        value: 100,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "lightning_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Lightning",
        value: 50,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell
    },
    "lightning_scroll_wild": {
        displayName: "Scroll of Wild Lightning",
        value: 100,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell,
    },
    "lightning_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Lightning",
        value: 150,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell
    },
    "fireball_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Fire",
        value: 50,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        useFunc: castWildDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll_wild": {
        displayName: "Scroll of Wild Fire",
        value: 100,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        useFunc: castWildDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "fireball_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Fire",
        value: 150,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        useFunc: castWildDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "confuse_scroll": {
        displayName: "Scroll of Confuse Enemy",
        value: 8,
        type: ItemType.ConfuseScroll,
        useFunc: castConfuse,
    },
    "clairvoyance_scroll": {
        displayName: "Scroll of Clairvoyance",
        value: null,
        type: ItemType.ClairvoyanceScroll,
        useFunc: castClairvoyance
    },
    "haste_potion_weak": {
        displayName: "Weak Potion of Haste",
        value: 5,
        type: ItemType.HasteSelf,
        useFunc: castHaste,
    },
    "slow_poison_weak": {
        displayName: "Weak Poison of Slow",
        value: 5,
        type: ItemType.SlowOther,
        useFunc: castSlow
    }
};

/**
 * Defines all the properties of a spell: the name, mana cost,
 * damage values, damage type, and the function to execute.
 */
export const SpellData: { [key: string]: SpellDataDetails } = {
    "lightning_bolt": {
        id: "lightning_bolt",
        displayName: "Lightning Bolt",
        manaCost: 10,
        value: 20,
        type: SpellType.DamageOther,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell
    },
    "wild_lightning_bolt": {
        id: "wild_lightning_bolt",
        displayName: "Wild Lightning Bolt",
        manaCost: 10,
        value: 30,
        type: SpellType.WildDamage,
        damageType: DamageType.Electric,
        useFunc: castWildDamageSpell
    },
    "fireball": {
        id: "fireball",
        displayName: "Fireball",
        manaCost: 50,
        value: 20,
        type: SpellType.DamageOther,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire
    },
    "wild_fireball": {
        id: "wild_fireball",
        displayName: "Wild Fireball",
        manaCost: 10,
        value: 30,
        type: SpellType.WildDamage,
        damageType: DamageType.Fire,
        useFunc: castWildDamageSpell
    },
    "confuse": {
        id: "confuse",
        displayName: "Confuse",
        manaCost: 20,
        value: 8,
        type: SpellType.DamageOther,
        useFunc: castConfuse
    },
    "clairvoyance": {
        id: "clairvoyance",
        displayName: "Clairvoyance",
        manaCost: 20,
        value: null,
        type: SpellType.Passive,
        useFunc: castClairvoyance
    },
    "lesser_heal": {
        id: "lesser_heal",
        displayName: "Lesser Heal",
        manaCost: 10,
        value: 25,
        type: SpellType.HealSelf,
        useFunc: castHeal
    },
    "heal": {
        id: "heal",
        displayName: "Heal",
        manaCost: 30,
        value: 50,
        type: SpellType.HealSelf,
        useFunc: castHeal
    },
    "greater_heal": {
        id: "greater_heal",
        displayName: "Greater Heal",
        manaCost: 50,
        value: 100,
        type: SpellType.HealSelf,
        useFunc: castHeal
    },
    "lesser_haste": {
        id: "lesser_haste",
        displayName: "Lesser Haste",
        manaCost: 30,
        value: 10,
        type: SpellType.Effect,
        useFunc: castHaste
    },
    "lesser_slow": {
        id: "lesser_slow",
        displayName: "Lesser Slow",
        manaCost: 30,
        value: 10,
        type: SpellType.DamageOther,
        useFunc: castSlow
    },
    "fire_wall": {
        id: "fire_wall",
        displayName: "Wall of Fire",
        manaCost: 30,
        value: 10,
        type: SpellType.DamageOther,
        damageType: DamageType.Fire,
        areaOfEffect: {
            width: 1,
            height: 6
        },
        useFunc: castFireWall
    },
    "ice_wall": {
        id: "ice_wall",
        displayName: "Wall of Ice",
        manaCost: 30,
        value: null,
        type: SpellType.DamageOther,
        areaOfEffect: {
            width: 1,
            height: 6
        },
        useFunc: castIceWall
    },
    "combust": {
        id: "combust",
        displayName: "Combust",
        value: 5,
        manaCost: 10,
        type: SpellType.DamageOther,
        useFunc: castCombust
    }
};
