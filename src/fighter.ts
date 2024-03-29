import { System, Query, Entity, World } from "ape-ecs";
import { cloneDeep, pick } from "lodash";

import { DIRS, FOV, RNG } from "./rot/index";

import globals from "./globals";
import {
    LEVEL_UP_BASE,
    LEVEL_UP_FACTOR,
    DamageType,
    SpellType,
    DeathType,
    Affinity,
    StatusEffectType,
    PLAYER_ID
} from "./constants";
import {
    createEntity,
    DamageAffinityComponent,
    EntityMap,
    FearAIComponent,
    FlammableComponent,
    FreezableComponent,
    GraphicsComponent,
    HitPointsComponent,
    HitPointsEffectComponent,
    InteractableTypeComponent,
    InventoryComponent,
    LevelComponent,
    LoseTargetAIComponent,
    StunnableComponent,
    PlannerAIComponent,
    PositionComponent,
    removeEntity,
    SpeedComponent,
    SpeedEffectComponent,
    SpellsComponent,
    StatsComponent,
    StatsEffectComponent,
    TriggerComponent,
    WetableComponent,
    AreaOfEffectComponent,
    ConfusableAIComponent,
    ParticleEmitterComponent,
    TypeComponent,
    OilCoveredComponent,
} from "./entity";
import { SpellData, Area, setOilCovered } from "./skills";
import { getEntitiesAtLocation, isBlocked, Vector2D } from "./map";
import { showLogMessage } from "./ui";
import { assertUnreachable, Nullable, randomIntFromInterval } from "./util";
import { createPassableSightCallback } from "./ai/commands";
import { IndicatorStyle, ShowDamageIndicatorCommand, UseSkillCommand } from "./commands";
import { getCirclePositions, removeExistingParticleEffects } from "./graphics";

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

    /**
     * Generate a callback given an entity which died. Updates the entities at the
     * given position to have increased fear and to alert them to the player's
     * presence.
     *
     * @param target {Entity}
     * @returns {void}
     */
    generateAISeesDeadBodyCallback(target: Entity) {
        const targetLevelData = target.getOne(LevelComponent);
        const parent = this;

        return function (x: number, y: number) {
            if (targetLevelData === undefined) { return; }

            const entities = getEntitiesAtLocation(
                parent.world, globals.Game!.entityMap, new Vector2D(x, y)
            );
            for (const e of entities) {
                if (e === target) { continue; }

                const fearData = e.getOne(FearAIComponent);
                const levelData = e.getOne(LevelComponent);
                if (fearData !== undefined && levelData !== undefined) {
                    const fearBasis = targetLevelData.level - levelData.level;
                    const fearVariance = Math.round(fearBasis * 0.5);
                    const addedFear = Math.max(randomIntFromInterval(
                        fearBasis - fearVariance, fearBasis + fearVariance
                    ), 1);

                    if (globals.Game?.debugAI === true) {
                        // eslint-disable-next-line no-console
                        console.log(`${e.id} saw ${target.id} die. Adding ${addedFear} fear`);
                    }

                    fearData.fear += addedFear;
                    fearData.update();
                }

                const aiState = e.getOne(PlannerAIComponent);
                if (aiState !== undefined) {
                    aiState.knowsTargetPosition = true;
                    aiState.update();
                }
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

        target.removeTag("blocks");
        target.removeTag("blocksSight");
        target.removeTag("sentient");

        const graphicData = target.getOne(GraphicsComponent);
        if (graphicData !== undefined && graphicData.sprite !== null) {
            graphicData.textureKey = "skull_bone";
            graphicData.sprite.texture = globals.Game.textureAtlas["skull_bone"];
            graphicData.update();
        }

        const typeData = target.getOne(TypeComponent);
        if (typeData !== undefined) {
            typeData.name = `Dead ${typeData.displayName}`;
            typeData.update();
        }

        // Update the surrounding AI's fear and target data
        const pos = target.getOne(PositionComponent)!.tilePosition;
        const fov = new FOV.PreciseShadowcasting(createPassableSightCallback(pos));
        fov.compute(
            pos.x,
            pos.y,
            10,
            this.generateAISeesDeadBodyCallback(target)
        );

        const compArray: any = [
            HitPointsComponent,
            DamageAffinityComponent,
            LevelComponent,
            StatsComponent,
            SpeedComponent,
            PlannerAIComponent,
            LoseTargetAIComponent,
            FearAIComponent,
            ConfusableAIComponent,
            InteractableTypeComponent,
            FlammableComponent,
            WetableComponent,
            FreezableComponent,
            TriggerComponent,
            StunnableComponent,
            AreaOfEffectComponent
        ];

        for (let i = 0; i < compArray.length; i++) {
            const c = target.getOne(compArray[i]);
            if (c !== undefined) {
                target.removeComponent(c);
            }
        }

        const particleData = target.getOne(ParticleEmitterComponent);
        if (particleData !== undefined) {
            particleData.emitter?.destroy();
            target.removeComponent(particleData);
        }

        target.tags.delete("sentient");

        // Create dropped item entity
        const inventoryData = target.getOne(InventoryComponent);
        const positionData = target.getOne(PositionComponent);
        if (inventoryData !== undefined &&
            positionData !== undefined &&
            inventoryData.inventory.size > 0) {
            globals.gameEventEmitter.emit("tutorial.pickUpItem");

            const item = createEntity(
                this.world,
                globals.Game.textureAtlas,
                "dropped_item",
                positionData.tilePosition
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
        if (globals.Game === null) { throw new Error("Global game is null"); }
        if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }

        const inventoryData = target.getOne(InventoryComponent);
        const positionData = target.getOne(PositionComponent);
        if (inventoryData !== undefined &&
            positionData !== undefined &&
            inventoryData.inventory.size > 0) {
            globals.gameEventEmitter.emit("tutorial.pickUpItem");

            const item = createEntity(
                this.world,
                globals.Game.textureAtlas,
                "dropped_item",
                positionData.tilePosition
            );
            const itemInventory = item.getOne(InventoryComponent);
            itemInventory!.inventory = inventoryData.inventory;
        }

        removeEntity(this.world, target);
    }

    /**
     * If the entity is on fire, explode. Otherwise, spawn oil at the location.
     */
    oilBarrelDeath(entity: Entity): void {
        if (globals.Game === null) { throw new Error("Global game is null"); }

        const positionData = entity.getOne(PositionComponent);
        const flammableData = entity.getOne(FlammableComponent);
        if (positionData === undefined || flammableData === undefined) {
            throw new Error(`Entity ${entity.id} is missing data in oilBarrelDeath`);
        }

        if (flammableData.onFire) {
            globals.Game.commandQueue.push(new UseSkillCommand(
                entity.id,
                SpellData["fireball_targeted"],
                positionData.tilePosition,
                0,
                undefined,
                false,
                (e: Entity) => { removeEntity(this.world, e); }
            ));
        } else {
            const tilePositions = getCirclePositions(
                4, positionData.tilePosition.x, positionData.tilePosition.y
            );

            for (const tile of tilePositions) {
                const { blocks, entity } = isBlocked(
                    this.world, globals.Game.map, globals.Game.entityMap, tile
                );
                if (blocks !== true || (blocks === true && entity !== null)) {
                    createEntity(this.world, globals.Game.textureAtlas, "oil_slick", tile);

                    const entities = getEntitiesAtLocation(
                        globals.Game.ecs,
                        globals.Game.entityMap,
                        tile
                    );
                    for (const entity of entities) {
                        setOilCovered(entity, 10);
                    }
                }
            }

            removeEntity(this.world, entity);
        }
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
                    case DeathType.OilBarrel:
                        this.oilBarrelDeath(entity);
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
                    if (entity?.id === PLAYER_ID) { continue; }
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
                const effectiveStats = getEffectiveStatData(
                    this.world, globals.Game!.entityMap, entity
                );

                if (hpData !== undefined && effectiveHp !== null) {
                    hpData.hp = effectiveHp.maxHp;
                    hpData.update();
                }

                if (statsData !== undefined && effectiveStats !== null) {
                    statsData.strength++;
                    statsData.defense++;
                    statsData.update();
                }

                if (globals.Game !== null && entity.id === PLAYER_ID) {
                    showLogMessage(`You reached level ${levelData.level}!`);
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
            copiedStats[modifier.stat] = Math.round(copiedStats[modifier.stat] + modifier.value);
            break;
        case "multiply":
            // @ts-expect-error
            copiedStats[modifier.stat] = Math.round(copiedStats[modifier.stat] * modifier.value);
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
export function getEffectiveStatData(ecs: World, entityMap: EntityMap, entity: Entity) {
    const effects = entity.getComponents(StatsEffectComponent);
    const stats = entity.getOne(StatsComponent);
    if (stats === undefined) { return null; }

    let newStats = pick(
        stats,
        "strength",
        "defense",
        "criticalChance",
        "criticalDamageMultiplier",
        "ailmentSusceptibility"
    );
    effects.forEach(e => {
        newStats = calculateStatModifier(e, newStats);
    });

    // Punish the player for being surrounded by enemies
    if (entity.id === "player") {
        let numberOfEnemies = 0;
        const pos = entity.getOne(PositionComponent)!.tilePosition;
        for (const dir of DIRS[8]) {
            const entities = getEntitiesAtLocation(
                ecs,
                entityMap,
                new Vector2D(pos.x + dir[0], pos.y + dir[1])
            );
            for (const e of entities) {
                // TODO: Target selection. Should only consider hostiles
                if (e.tags.has("sentient") && e.id !== "player") {
                    ++numberOfEnemies;
                }
            }
        }

        if (numberOfEnemies > 1) {
            newStats.defense -= (numberOfEnemies - 1) * Math.max(
                1,
                Math.floor(newStats.defense * 0.15)
            );
        }
    }

    newStats.strength = Math.max(1, newStats.strength);
    newStats.defense = Math.max(0, newStats.defense);
    newStats.ailmentSusceptibility = Math.min(1, newStats.ailmentSusceptibility);

    return newStats;
}

/**
 * Find the fighter's current stats after the effects of all
 * of the statistic effects are taken into account.
 */
export function getEffectiveSpeedData(ecs: World, entityMap: EntityMap, entity: Entity) {
    const effects = entity.getComponents(SpeedEffectComponent);
    const speed = entity.getOne(SpeedComponent);
    if (speed === undefined) { return null; }

    let newStats = pick(speed, "speed", "maxTilesPerMove");
    effects.forEach(e => {
        newStats = calculateStatModifier(e, newStats);
    });

    // Punish the player for being surrounded by enemies
    if (entity.id === "player") {
        let numberOfEnemies = 0;
        const pos = entity.getOne(PositionComponent)!.tilePosition;
        for (const dir of DIRS[8]) {
            const entities = getEntitiesAtLocation(
                ecs,
                entityMap,
                new Vector2D(pos.x + dir[0], pos.y + dir[1])
            );
            for (const e of entities) {
                // TODO: Target selection. Should only consider hostiles
                if (e.tags.has("sentient") && e.id !== "player") {
                    ++numberOfEnemies;
                }
            }
        }

        if (numberOfEnemies > 1) {
            newStats.maxTilesPerMove -= numberOfEnemies - 1;
        }
    }

    newStats.maxTilesPerMove = Math.max(1, newStats.maxTilesPerMove);
    newStats.speed = Math.max(1, newStats.speed);

    return newStats;
}

export function getEffectiveDamageAffinity(entity: Entity) {
    const affinity = entity.getOne(DamageAffinityComponent);
    const wetData = entity.getOne(WetableComponent);
    const frozenData = entity.getOne(FreezableComponent);
    const oilData = entity.getOne(OilCoveredComponent);
    if (affinity === undefined) { return null; }
    if (wetData === undefined && frozenData === undefined) { return affinity; }

    const newAffinity = pick(
        affinity,
        ...Object.keys(DamageType)
    );

    if (wetData !== undefined &&
        wetData.wet &&
        newAffinity[DamageType.Electric] !== Affinity.strong &&
        newAffinity[DamageType.Electric] !== Affinity.nullified
    ) {
        newAffinity[DamageType.Electric] = Affinity.weak;
    }

    if (frozenData !== undefined &&
        frozenData.frozen &&
        newAffinity[DamageType.Physical] !== Affinity.strong &&
        newAffinity[DamageType.Physical] !== Affinity.nullified
    ) {
        newAffinity[DamageType.Physical] = Affinity.weak;
    }

    if (oilData !== undefined &&
        oilData.oilCovered &&
        newAffinity[DamageType.Fire] !== Affinity.nullified
    ) {
        newAffinity[DamageType.Fire] = Affinity.weak;
    }

    return newAffinity;
}

/**
 * Take damage from an attacker. Takes this fighter's current defense
 * into account
 *
 * @param ecs The ECS world
 * @param entityMap The game's map of position to entities
 * @param target The Entity to damage
 * @param damage The amount of damage the attack deals
 * @param critical Is this a critical hit?
 * @param damageType What type of damage was the attack
 * @returns {boolean} Did the target's hp reach zero
 */
export function takeDamage(
    ecs: World,
    entityMap: EntityMap,
    target: Entity,
    damage: number,
    critical: boolean,
    damageType: DamageType,
    damageSource?: string
): boolean {
    let calculatedDamage = damage;
    const hpData = target.getOne(HitPointsComponent);
    if (hpData === undefined) { return false; }

    const targetStats = getEffectiveStatData(
        ecs,
        entityMap,
        target
    );
    const damageAffinity = getEffectiveDamageAffinity(target);

    if (targetStats !== null && damageAffinity !== null) {
        calculatedDamage = calculatedDamage * damageAffinity[damageType];
    } else if (targetStats === null && damageAffinity !== null) {
        calculatedDamage = calculatedDamage * damageAffinity[damageType];
        calculatedDamage = Math.max(1, calculatedDamage);
    } else if (targetStats !== null) {
        calculatedDamage = Math.max(1, calculatedDamage - targetStats.defense);
    }

    // Update the AI state to know where the target is
    // This is of course assuming that all damage is done by
    // the target and that the target is in line of sight
    // TODO: Target acquisition code
    const aiState = target.getOne(PlannerAIComponent);
    if (aiState !== undefined &&
        aiState.knowsTargetPosition === false &&
        damageSource === PLAYER_ID) {
        // Bonus damage for sneak attack
        if (calculatedDamage > 0 &&
            (damageAffinity === null || damageAffinity[damageType] !== Affinity.nullified)) {
            calculatedDamage = Math.ceil(calculatedDamage * 1.5);
            critical = true;
        }

        aiState.knowsTargetPosition = true;
        aiState.update();
    }

    if (damageAffinity === null || damageAffinity[damageType] !== Affinity.nullified) {
        calculatedDamage = Math.max(1, calculatedDamage);
    } else {
        calculatedDamage = Math.max(0, calculatedDamage);
    }

    if (calculatedDamage > 0) {
        hpData.hp -= calculatedDamage;
        hpData.update();
    }

    const entityPos = target.getOne(PositionComponent);
    if (entityPos === undefined) {
        throw new Error(`missing position data on entity ${target.id}`);
    }

    if (target.tags.has("sentient")) {
        let style: IndicatorStyle = IndicatorStyle.Damage;

        if (critical ||
            (damageAffinity !== null && damageAffinity[damageType] === Affinity.strong)) {
            style = IndicatorStyle.Critical;
        } else if (damageAffinity !== null && damageAffinity[damageType] === Affinity.nullified) {
            style = IndicatorStyle.Immune;
        }

        globals.Game!.commandQueue.push(new ShowDamageIndicatorCommand(
            target.id,
            calculatedDamage,
            style
        ));
    }

    // Remove the oil from a entity if it was damaged with fire
    const oilData = target.getOne(OilCoveredComponent);
    if (oilData !== undefined && oilData.oilCovered === true) {
        oilData.oilCovered = false;
        oilData.turnsLeft = 0;
        oilData.update();
        removeExistingParticleEffects(target);
    }

    // TODO, sound: play hit/crit/death sound here

    if (hpData.hp <= 0) {
        return true;
    }

    return false;
}

/**
 * Have this fighter attack another game object. Adds experience
 * if the target was killed
 */
export function attack(
    ecs: World,
    entityMap: EntityMap,
    attacker: Entity,
    target: Entity
): void {
    const attackerLevelData = attacker.getOne(LevelComponent);
    const attackerEffectiveStats = getEffectiveStatData(ecs, entityMap, attacker);
    const targetLevelData = target.getOne(LevelComponent);

    if (attackerEffectiveStats === null) { throw new Error("Cannot attack damage without a StatsComponent"); }

    let damage = Math.round(attackerEffectiveStats.strength);
    let critical = false;

    if (RNG.getUniform() <= attackerEffectiveStats.criticalChance) {
        damage = Math.ceil(damage * attackerEffectiveStats.criticalDamageMultiplier);
        critical = true;
    }

    if (damage > 0) {
        const experience = targetLevelData?.experienceGiven ?? 0;
        const killed = takeDamage(
            ecs, entityMap, target, damage, critical, DamageType.Physical, attacker.id
        );
        if (killed && attackerLevelData !== undefined) {
            attackerLevelData.experience += experience;
            attackerLevelData.update();
        }
    }
}

/**
 * Add hp to the fighter. Total fighter's hp is automatically
 * clamped to the max effective hp.
 */
export function heal(hpData: HitPointsComponent, amount: number): void {
    const effectiveHp = getEffectiveHitPointData(hpData.entity);
    if (effectiveHp !== null) {
        if (amount > effectiveHp.maxHp) {
            amount = effectiveHp.maxHp;
        }
        hpData.hp += amount;
        hpData.update();

        globals.Game!.commandQueue.push(new ShowDamageIndicatorCommand(
            hpData.entity.id,
            amount,
            IndicatorStyle.Heal
        ));
    }
}

/**
 * Reduce the number of casts left for a spell in the given spell
 * component by one. Does not do anything
 *
 * @param entity The entity
 * @param id the spell id
 */
export function useSpell(entity: Entity, id: string) {
    const spellData = entity.getOne(SpellsComponent)!;
    if (!(id in spellData.knownSpells)) {
        throw new Error(`Spell ${id} is not known`);
    }

    const count = spellData.knownSpells[id].count - 1;
    if (count > -1) {
        spellData.knownSpells[id].count = count;
    }
    spellData.update();
}

/**
 * Add a spell to the set of known spells by this
 * fighter
 */
export function addSpellById(entity: Entity, id: string, count: number, maxCount: number): boolean {
    if (globals.Game === null) { throw new Error("Global Game object is null"); }
    if (globals.gameEventEmitter === null) { throw new Error("Global gameEventEmitter object is null"); }
    if (!(id in SpellData)) { throw new Error(`${id} is not a valid spell id`); }

    const spellData = entity.getOne(SpellsComponent);
    if (spellData === undefined || id in spellData.knownSpells) { return false; }

    if (entity.id === PLAYER_ID) {
        globals.gameEventEmitter.emit("tutorial.spellMenu");

        if (SpellData[id].type === SpellType.WildDamage) {
            globals.gameEventEmitter.emit("tutorial.wildSpells");
        }
    }

    spellData.knownSpells[id] = { count, maxCount };
    spellData.update();
    return true;
}

export interface KnownSpellDetails {
    id: string;
    count: number;
    maxCount: number;
    displayName: string;
    description: string;
    type: SpellType;
    value: Nullable<number>;
    damageType?: DamageType;
    statusEffect?: StatusEffectType;
    areaOfEffect?: Area;
    range?: number;
}

export function getKnownSpells(data: SpellsComponent): KnownSpellDetails[] {
    return [...Object.entries(data.knownSpells)].map(([k, v]) => {
        return {
            id: k,
            count: v.count,
            maxCount: v.maxCount,
            displayName: SpellData[k].displayName,
            description: SpellData[k].description,
            type: SpellData[k].type,
            value: SpellData[k].value,
            damageType: SpellData[k].damageType,
            statusEffect: SpellData[k].statusEffect,
            areaOfEffect: SpellData[k].areaOfEffect,
            range: SpellData[k].range
        };
    });
}

export function hasSpell(entity: Entity, spellID: string) {
    const spellData = entity.getOne(SpellsComponent);
    if (spellData === undefined) { return false; }
    return spellID in spellData.knownSpells;
}
