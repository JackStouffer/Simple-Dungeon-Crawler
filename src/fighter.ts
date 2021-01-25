import { System, Query, Entity } from "ape-ecs";
import { cloneDeep, pick } from "lodash";

import { FOV, RNG } from "./rot/index";

import globals from "./globals";
import {
    LEVEL_UP_BASE,
    LEVEL_UP_FACTOR,
    DamageType,
    SpellType,
    DeathType,
    Affinity,
    StatusEffectType
} from "./constants";
import {
    createEntity,
    DamageAffinityComponent,
    DisplayNameComponent,
    FearAIComponent,
    FireTriggerComponent,
    FlammableComponent,
    GraphicsComponent,
    HitPointsComponent,
    HitPointsEffectComponent,
    InteractableTypeComponent,
    InventoryComponent,
    LevelComponent,
    LoseTargetAIComponent,
    ParalyzableComponent,
    PlannerAIComponent,
    PositionComponent,
    SpeedComponent,
    SpeedEffectComponent,
    SpellsComponent,
    StatsComponent,
    StatsEffectComponent,
    TriggerTypeComponent,
    TypeComponent,
    WetableComponent
} from "./entity";
import { displayMessage, MessageType } from "./ui";
import { assertUnreachable, Nullable } from "./util";
import { SpellData, Area } from "./skills";
import { createPassableSightCallback } from "./ai/commands";
import { getEntitiesAtLocation } from "./map";

/**
 * Find all entities with HitPointsComponents and when hp is <= 0,
 * run the corresponding function for the given DeathType
 */
export class DeathSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this.createQuery()
            .fromAll(HitPointsComponent)
            .persist();
    }

    generateUpdateFearVisibilityCallback(target: Entity) {
        const targetLevelData = target.getOne(LevelComponent);

        return function (x: number, y: number) {
            if (targetLevelData === undefined) { return; }

            // SPEED: use quad tree
            const entities = getEntitiesAtLocation(globals.Game!.entityMap, x, y);
            for (const e of entities) {
                const fearData = e.getOne(FearAIComponent);
                const levelData = e.getOne(LevelComponent);
                if (fearData === undefined || levelData === undefined) { continue; }

                fearData.fear += Math.max(
                    (targetLevelData.level - levelData.level) + 5, 1
                );
                fearData.update();
            }
        };
    }

    /**
     * Removes the AI, fighter, and intractable off of an object. Changes graphics
     * to dead body graphics and sets blocking to false. Also spawns a dropped item
     * if there were items in the inventory
     */
    actorDeath(target: Entity): void {
        if (globals.Game === null) { throw new Error("Global game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }

        const nameData = target.getOne(DisplayNameComponent);
        if (nameData !== undefined) {
            displayMessage(`${nameData.name} has been killed`);
            nameData.name = `Remains of a ${nameData.name}`;
            nameData.update();
        }

        target.removeTag("blocks");
        target.removeTag("blocksSight");

        const graphicData = target.getOne(GraphicsComponent);
        if (graphicData !== undefined && graphicData.sprite !== null) {
            graphicData.sprite.texture = globals.Game.textureAtlas["skull_bone"];
            graphicData.update();
        }

        // Calculate the added fear for all of the entities
        // with fear components within an FOV of the current
        // location
        const pos = target.getOne(PositionComponent);
        if (pos === undefined) { throw new Error("Position data missing on dead body"); }
        const fov = new FOV.PreciseShadowcasting(createPassableSightCallback(pos));
        fov.compute(
            pos.x,
            pos.y,
            10,
            this.generateUpdateFearVisibilityCallback(target)
        );

        const compArray: any = [
            HitPointsComponent,
            StatsComponent,
            SpeedComponent,
            PlannerAIComponent,
            LoseTargetAIComponent,
            FearAIComponent,
            InteractableTypeComponent,
            FlammableComponent,
            WetableComponent,
            TriggerTypeComponent,
            FireTriggerComponent,
            ParalyzableComponent
        ];

        for (let i = 0; i < compArray.length; i++) {
            const c = target.getOne(compArray[i]);
            if (c !== undefined) {
                target.removeComponent(c);
            }
        }

        // Create dropped item entity
        const inventoryData = target.getOne(InventoryComponent);
        const positionData = target.getOne(PositionComponent);
        if (inventoryData !== undefined &&
            positionData !== undefined &&
            inventoryData.inventory.size > 0) {
            globals.gameEventEmitter.emit("tutorial.pickUpItem");
            const tilePos = positionData.tilePosition();

            const item = createEntity(
                this.world,
                globals.Game.textureAtlas,
                "dropped_item",
                tilePos.x,
                tilePos.y
            );
            const itemInventory = item.getOne(InventoryComponent);
            itemInventory!.inventory = inventoryData.inventory;
        }

        target.removeComponent(target.getOne(InventoryComponent)!);
    }

    /**
     * Removes target from world and scheduler. Also spawns a dropped item
     * if there were items in the inventory.
     */
    removeDeath(target: Entity): void {
        if (globals.Game === null) { throw new Error("Global game object is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }

        const inventoryData = target.getOne(InventoryComponent);
        const positionData = target.getOne(PositionComponent);
        if (inventoryData !== undefined &&
            positionData !== undefined &&
            inventoryData.inventory.size > 0) {
            globals.gameEventEmitter.emit("tutorial.pickUpItem");
            const tilePos = positionData.tilePosition();

            const item = createEntity(
                this.world,
                globals.Game.textureAtlas,
                "dropped_item",
                tilePos.x,
                tilePos.y
            );
            const itemInventory = item.getOne(InventoryComponent);
            itemInventory!.inventory = inventoryData.inventory;
        }

        // TODO define these sounds in data on the entity or fighter instance or something
        const typeData = target.getOne(TypeComponent);
        if (typeData?.entityType === "crate") {
            globals.gameEventEmitter.emit("crate.break");
        }
        if (typeData?.entityType === "barrel") {
            globals.gameEventEmitter.emit("barrel.break");
        }

        const graphicData = target.getOne(GraphicsComponent);
        if (graphicData !== undefined && graphicData.sprite !== null) {
            globals.Game.pixiApp.stage.removeChild(graphicData.sprite);
            graphicData.sprite.visible = false;
            graphicData.sprite = null;
        }
        this.world.removeEntity(target);
    }

    update() {
        const entities = this.mainQuery.execute();
        for (const entity of entities) {
            const hpData = entity.getOne(HitPointsComponent);
            if (hpData === undefined) { throw new Error(`hp missing in death system ${entity.id}`); }

            if (hpData.hp <= 0) {
                switch (hpData.onDeath) {
                    case DeathType.Default:
                        this.actorDeath(entity);
                        break;
                    case DeathType.RemoveFromWorld:
                        this.removeDeath(entity);
                        break;
                    default:
                        assertUnreachable(hpData.onDeath);
                        break;
                }
            }
        }
    }
}

/**
 * Add and remove entities from the scheduler based on changes to the
 * SpeedComponent.
 */
export class UpdateSchedulerSystem extends System {
    init() {
        this.subscribe("SpeedComponent");
    }

    update() {
        if (globals.Game === null) { throw new Error("Game object is null"); }

        for (let i = 0; i < this.changes.length; i++) {
            const change = this.changes[i];
            const entity = this.world.getEntity(change.entity);

            switch (change.op) {
                case "add":
                    // We want to add the player manually so that the player is
                    // always first to act in a level load
                    if (entity === globals.Game?.player) { continue; }
                    globals.Game.scheduler.add(change.entity, true);
                    break;
                case "destroy":
                    globals.Game.scheduler.remove(change.entity);
                    break;
                case "change":
                case "addRef":
                case "deleteRef":
                    break;
                default:
                    throw new Error(`${change.entity}: Unknown change operation ${change.op}`);
            }
        }
    }
}

export class LevelUpSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this.createQuery()
            .fromAll(LevelComponent)
            .persist();
    }

    update() {
        const entities = this.mainQuery.execute();
        for (const entity of entities) {
            const levelData = entity.getOne(LevelComponent)!;

            const levelUpEXP = LEVEL_UP_BASE + (levelData.level * LEVEL_UP_FACTOR);
            if (levelData.experience >= levelUpEXP) {
                levelData.level += 1;
                levelData.experience = 0;
                levelData.update();

                const hpData = entity.getOne(HitPointsComponent);
                const statsData = entity.getOne(StatsComponent);
                const effectiveHp = getEffectiveHitPointData(entity);
                const effectiveStats = getEffectiveStatData(entity);

                if (hpData !== undefined && effectiveHp !== null) {
                    hpData.hp = effectiveHp.maxHp;
                    hpData.update();
                }

                if (statsData !== undefined && effectiveStats !== null) {
                    statsData.strength++;
                    statsData.defense++;
                    statsData.update();
                }

                if (globals.Game !== null && entity === globals.Game.player) {
                    displayMessage(`You reached level ${levelData.level}!`);
                }
            }
        }
    }
}

interface StatModifier {
    stat: string;
    modifierType: "multiply" | "add";
    turnsLeft: number;
    value: number;
}

export function calculateStatModifier<T>(modifier: StatModifier, stats: T) {
    // don't want to accidentally modify the actor's base stats
    const copiedStats = cloneDeep(stats);

    switch (modifier.modifierType) {
        case "add":
            // @ts-expect-error
            copiedStats[modifier.stat] += modifier.value;
            break;
        case "multiply":
            // @ts-expect-error
            copiedStats[modifier.stat] *= modifier.value;
            break;
        default:
            throw new Error(`Bad StatisticEffect type ${modifier.modifierType}`);
    }

    return copiedStats;
}

/**
 * Find the fighter's current stats with the effects of all
 * of the statistic effects.
 */
export function getEffectiveHitPointData(entity: Entity) {
    const effects = entity.getComponents(HitPointsEffectComponent);
    const hpData = entity.getOne(HitPointsComponent);
    if (hpData === undefined) { return null; }
    if (effects.size === 0) { return hpData; }

    let newHp = pick(hpData, "hp", "maxHp");
    effects.forEach(e => {
        newHp = calculateStatModifier(e, newHp);
    });

    // Max hp modifiers should not kill the player
    if (newHp.maxHp <= 0) {
        newHp.maxHp = 1;
    }

    // If the current max HP is less than the current
    // hp we want to reduce the actual hp rather
    // than the effective hp so that reducing the max HP
    // "damages" the fighter so when the max HP goes back up, the
    // HP is still lowered
    if (hpData.hp > newHp.maxHp) {
        hpData.hp = newHp.maxHp;
        newHp.hp = newHp.maxHp;
    }

    return newHp;
}

/**
 * Find the fighter's current stats after the effects of all
 * of the statistic effects are taken into account.
 */
export function getEffectiveStatData(entity: Entity) {
    const effects = entity.getComponents(StatsEffectComponent);
    const stats = entity.getOne(StatsComponent);
    if (stats === undefined) { return null; }
    if (effects.size === 0) { return stats; }

    let newStats = pick(stats, "strength", "defense", "criticalChance", "criticalDamageMultiplier", "ailmentSusceptibility");
    effects.forEach(e => {
        newStats = calculateStatModifier(e, newStats);
    });

    return newStats;
}

/**
 * Find the fighter's current stats after the effects of all
 * of the statistic effects are taken into account.
 */
export function getEffectiveSpeedData(entity: Entity) {
    const effects = entity.getComponents(SpeedEffectComponent);
    const speed = entity.getOne(SpeedComponent);
    if (speed === undefined) { return null; }
    if (effects.size === 0) { return speed; }

    let newStats = pick(speed, "speed", "maxTilesPerMove");
    effects.forEach(e => {
        newStats = calculateStatModifier(e, newStats);
    });

    newStats.maxTilesPerMove = Math.max(1, newStats.maxTilesPerMove);
    newStats.speed = Math.max(1, newStats.speed);

    return newStats;
}

export function getEffectiveAffinityData(entity: Entity) {
    const affinity = entity.getOne(DamageAffinityComponent);
    const wetData = entity.getOne(WetableComponent);
    if (affinity === undefined) { return null; }
    if (wetData === undefined) { return affinity; }

    const newAffinity = pick(
        affinity,
        DamageType.Physical,
        DamageType.Fire,
        DamageType.Electric,
        DamageType.Water,
        DamageType.Ice,
        DamageType.Nature
    );
    if (wetData.wet && newAffinity[DamageType.Electric] !== Affinity.strong) {
        newAffinity[DamageType.Electric] = Affinity.weak;
    }

    return newAffinity;
}

/**
 * Take damage from an attacker. Takes this fighter's current defense
 * into account
 */
export function takeDamage(
    target: Entity,
    damage: number,
    critical: boolean,
    damageType: DamageType
): boolean {
    const name = target.getOne(DisplayNameComponent);
    const hpData = target.getOne(HitPointsComponent);
    if (hpData === undefined) { throw new Error("Cannot take damage without a HitPointsComponent"); }

    const targetStats = getEffectiveStatData(target);
    const damageAffinity = getEffectiveAffinityData(target);

    if (targetStats !== null && damageAffinity !== null) {
        damage = damage * damageAffinity[damageType];
        damage = Math.max(1, damage - targetStats.defense);
    } else if (targetStats === null && damageAffinity !== null) {
        damage = damage * damageAffinity[damageType];
        damage = Math.max(1, damage);
    } else if (targetStats !== null) {
        damage = Math.max(1, damage - targetStats.defense);
    }

    if (damage > 0) {
        const aiState = target.getOne(PlannerAIComponent);
        // Update the AI state to know where the target is
        // This is of course assuming that all damage is done by
        // the target and that the target is in line of sight
        // TODO: Target acquisition code
        if (aiState !== undefined && aiState.knowsTargetPosition === false) {
            aiState.knowsTargetPosition = true;
            aiState.update();
            // Bonus damage for sneak attack
            damage = Math.ceil(damage * 1.5);
            critical = true;
        }

        hpData.hp -= damage;
        hpData.update();
    }

    // TODO fix messages to say who did the attacking
    if (critical && name !== undefined) {
        displayMessage(`CRITICAL! ${name.name} takes ${damage} of ${DamageType[damageType]} damage.`, MessageType.Critical);
    } else if (name !== undefined) {
        displayMessage(`${name.name} takes ${damage} ${DamageType[damageType]} damage.`);
    }

    if (hpData.hp <= 0) {
        return true;
    }

    return false;
}

/**
 * Have this fighter attack another game object. Adds experience
 * if the target was killed
 */
export function attack(attacker: Entity, target: Entity): void {
    const attackerLevelData = attacker.getOne(LevelComponent);
    const attackerEffectiveStats = getEffectiveStatData(attacker);
    const attackerDisplayName = attacker.getOne(DisplayNameComponent);
    const targetLevelData = target.getOne(LevelComponent);
    const targetDisplayName = target.getOne(DisplayNameComponent);

    if (attackerEffectiveStats === null) { throw new Error("Cannot attack damage without a StatsComponent"); }

    let damage = Math.round(attackerEffectiveStats.strength);
    let critical = false;

    if (RNG.getUniform() <= attackerEffectiveStats.criticalChance) {
        damage = Math.ceil(damage * attackerEffectiveStats.criticalDamageMultiplier);
        critical = true;
    }

    if (damage > 0) {
        const experience = targetLevelData?.experienceGiven ?? 0;
        const killed = takeDamage(target, damage, critical, DamageType.Physical);
        if (killed && attackerLevelData !== undefined) {
            attackerLevelData.experience += experience;
            attackerLevelData.update();
        }
    } else if (attackerDisplayName !== undefined && targetDisplayName !== undefined) {
        displayMessage(`${attackerDisplayName.name} attacks ${targetDisplayName.name}, but it's too weak!`);
    }
}

/**
 * Add hp to the fighter. Total fighter's hp is automatically
 * clamped to the max effective hp.
 */
export function heal(hpData: HitPointsComponent, amount: number): void {
    const effectiveHp = getEffectiveHitPointData(hpData.entity);
    if (effectiveHp !== null) {
        hpData.hp += amount;
        if (hpData.hp > effectiveHp.maxHp) {
            hpData.hp = effectiveHp.maxHp;
        }
        hpData.update();
    }
}

export function useSpell(spellData: SpellsComponent, id: string) {
    if (!spellData.knownSpells.has(id)) {
        throw new Error(`Item ${id} not in inventory`);
    }

    const count = spellData.knownSpells.get(id)! - 1;
    if (count > -1) {
        spellData.knownSpells.set(id, count);
    }
    spellData.update();
}

/**
 * Add a spell to the set of known spells by this
 * fighter
 */
export function addSpellById(entity: Entity, id: string, count: number): boolean {
    if (globals.Game === null) { throw new Error("Global Game object is null"); }
    if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }
    if (!(id in SpellData)) { throw new Error(`${id} is not a valid spell id`); }

    const spellData = entity.getOne(SpellsComponent);
    if (spellData === undefined || spellData.knownSpells.has(id) === true) { return false; }

    if (entity === globals.Game.player) {
        globals.gameEventEmitter.emit("tutorial.spellMenu");

        if (SpellData[id].type === SpellType.WildDamage) {
            globals.gameEventEmitter.emit("tutorial.wildSpells");
        }
    }

    spellData.knownSpells.set(id, count);
    spellData.update();
    return true;
}

export interface KnownSpellDetails {
    id: string;
    count: number;
    displayName: string;
    description: string;
    type: SpellType;
    value: Nullable<number>;
    damageType?: DamageType;
    statusEffect?: StatusEffectType;
    areaOfEffect?: Area;
}

export function getKnownSpells(data: SpellsComponent): KnownSpellDetails[] {
    return [...data.knownSpells.entries()].map(([k, v]) => {
        return {
            id: k,
            count: v,
            displayName: SpellData[k].displayName,
            description: SpellData[k].description,
            type: SpellData[k].type,
            value: SpellData[k].value,
            damageType: SpellData[k].damageType,
            statusEffect: SpellData[k].statusEffect,
            areaOfEffect: SpellData[k].areaOfEffect
        };
    });
}

export function hasSpell(entity: Entity, spellID: string) {
    const spellData = entity.getOne(SpellsComponent);
    if (spellData === undefined) { return false; }
    return spellData.knownSpells.has(spellID);
}
