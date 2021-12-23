import { Entity, World } from "ape-ecs";

import { DIRS, RNG } from "./rot/index";
import * as particles from "pixi-particles";

import globals from "./globals";
import {
    GameMap,
    isBlocked,
    Vector2D,
    setAllToExplored,
    getRandomOpenSpace,
    getEntitiesAtLocation,
    getHighestZIndexWithTile
} from "./map";
import { showLogMessage } from "./ui";
import { DamageType, ItemType, PLAYER_ID, SpellType, StatusEffectType, TriggerType } from "./constants";
import {
    createEntity,
    EntityMap,
    FlammableComponent,
    FreezableComponent,
    GraphicsComponent,
    HitPointsComponent,
    StunnableComponent,
    PlannerAIComponent,
    PositionComponent,
    removeEntity,
    SilenceableComponent,
    SpeedComponent,
    SpeedEffectComponent,
    SpellsComponent,
    TriggerComponent,
    TypeComponent,
    WetableComponent,
    ConfusableAIComponent,
    FearAIComponent,
    OilCoveredComponent,
    ParticleEmitterComponent,
} from "./entity";
import { randomIntFromInterval, Nullable, assertUnreachable } from "./util";
import { mouseTarget } from "./input-handler";
import { getEffectiveHitPointData, getEffectiveStatData, heal, takeDamage } from "./fighter";
import { getCirclePositions, getTargetedArea, removeExistingParticleEffects } from "./graphics";
import { PushBackCommand } from "./commands";
import { explainOiledStatus, explainWetStatus } from "./tutorials";

export interface Area {
    type: "rectangle" | "circle" | "ring";
    width?: number;
    height?: number;
    radius?: number;
}

export interface ItemDataDetails {
    id: string;
    displayName: string;
    description: string;
    type: ItemType;
    value: Nullable<number>;
    damageType?: DamageType;
    range?: number;
    statusEffect?: StatusEffectType;
    areaOfEffect?: Area;
    effect?: "lightning" | "particles";
    lightning?: {
        duration: number;
        segments: number;
        strikes: number;
        fadeOut: number;
    };
    particles?: {
        particleLocation: "self" | "target";
        particleImages: string[];
        particleConfig: particles.OldEmitterConfig;
    };

    useFunc: SkillFunction;
}

export interface SpellDataDetails {
    id: string;
    displayName: string;
    description: string;
    /** the number of casts that the player should have when first learning the spell */
    baseCastCount: number;
    type: SpellType;
    value: Nullable<number>;
    damageType?: DamageType;
    range?: number;
    statusEffect?: StatusEffectType;
    areaOfEffect?: Area;
    effect?: "lightning" | "particles";
    lightning?: {
        duration: number;
        segments: number;
        strikes: number;
        fadeOut: number;
    };
    particles?: {
        particleLocation: "self" | "target";
        particleImages: string[];
        particleConfig: particles.OldEmitterConfig;
    };

    useFunc: SkillFunction;
}

export type SkillFunction = (
    details: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs?: World,
    map?: GameMap,
    entityMap?: EntityMap,
    target?: Vector2D,
    rotation?: number,
    direction?: number
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
    const typeData = user.getOne(TypeComponent)!;

    const hpData = getEffectiveHitPointData(user);
    if (hpData === null) { throw new Error(`Trying to heal entity ${user.id} without any hp data`); }

    if (hpData.hp >= hpData.maxHp) {
        if (user.id === "player") {
            showLogMessage("You are already at full health.");
        } else {
            showLogMessage(`${typeData.displayName} tries and fails to take a health potion`);
        }

        return false;
    }

    heal(user.getOne(HitPointsComponent)!, item.value);
    if (user.id === "player") {
        showLogMessage(`You are healed for ${item.value} hp.`);
    } else {
        showLogMessage(`${typeData.displayName} is healed for ${item.value} hp.`);
    }
    return true;
}

function castHealOther(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Vector2D
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value for castDamageSpell"); }

    const targetedEntity = mouseTarget(ecs, map, entityMap, target);
    if (targetedEntity === null) {
        showLogMessage("Canceled casting");
        return false;
    }

    const typeData = targetedEntity.getOne(TypeComponent)!;
    const targetHPData = targetedEntity.getOne(HitPointsComponent);
    if (targetHPData === undefined) {
        showLogMessage(`${typeData.displayName} isn't healable`);
        return false;
    }

    heal(targetHPData, item.value);
    return true;
}

/**
 * Set an entity on fire an deal with all of the interactions
 * between different statuses, and the behavior with different
 * types of entities
 * @returns {boolean} Was set on fire. False if entity was already on fire or can't be set on fire
 */
export function setOnFire(target: Entity, damage?: number, turns?: number): boolean {
    const typeData = target.getOne(TypeComponent)!;
    const flammableData = target.getOne(FlammableComponent);
    const wetData = target.getOne(WetableComponent);
    const frozenData = target.getOne(FreezableComponent);
    const blocks = target.tags.has("blocks");

    if (flammableData === undefined) {
        if (target.id === PLAYER_ID) {
            // TODO, sound: spell not working sound
            showLogMessage("You were not set on fire because you're immune");
        } else if (typeData.displayName !== null && target.tags.has("sentient")) {
            // TODO, sound: spell not working sound
            showLogMessage(`${typeData.displayName} was not set on fire because it is immune`);
        }
        return false;
    }

    // You can't be set on fire if you're wet
    if (wetData !== undefined && wetData.wet) {
        wetData.wet = false;
        wetData.turnsLeft = 0;
        wetData.update();
        removeExistingParticleEffects(target);

        if (target.id === PLAYER_ID) {
            // TODO, sound: spell not working sound
            showLogMessage("You were not set on fire because you were wet");
        } else if (typeData.displayName !== null) {
            // TODO, sound: spell not working sound
            showLogMessage(`${typeData.displayName} was not set on fire because it was wet`);
        }

        return false;
    }

    // You can't be set on fire if you're frozen
    if (frozenData !== undefined && frozenData.frozen) {
        if (wetData !== undefined) {
            // TODO, BUG: Use setWet here
            wetData.wet = true;
            wetData.turnsLeft = frozenData.turnsLeft;
            wetData.update();
        }

        frozenData.frozen = false;
        frozenData.turnsLeft = 0;
        frozenData.update();


        if (target.id === PLAYER_ID) {
            // TODO, sound: ice shattering sound
            showLogMessage("You were not set on fire because you were frozen");
        } else if (typeData.displayName !== null) {
            // TODO, sound: ice shattering sound
            showLogMessage(`${typeData.displayName} was not set on fire because it was frozen`);
        }

        return false;
    }

    // If the entity doesn't block and it's on fire, we want
    // to add a fire trigger component so that things catch
    // on fire when they step on it
    if (flammableData.onFire === false && !blocks) {
        target.addComponent({
            type: "TriggerComponent",
            currentTriggerType: TriggerType.Fire,
            initialTriggerType: TriggerType.Fire,
            effectTurns: 5,
            effectDamage: 5,
            damage: 15
        });
    }

    // Keep generating more turns even if the target is already on fire.
    // If the entity keeps stepping in fire we want the turns to keep being
    // set at the random level
    if (target.tags.has("sentient")) {
        turns = turns ?? randomIntFromInterval(3, 6);
    } else {
        // Inanimate objects should burn until they
        // are consumed
        turns = 1000;
    }

    if (flammableData.onFire === false) {
        flammableData.onFire = true;
        flammableData.turnsLeft = turns;
        flammableData.update();

        // Being on fire adds a lot of fear
        const fearData = target.getOne(FearAIComponent);
        if (fearData !== undefined && !flammableData.onFire) {
            fearData.fear += 7;
            fearData.update();
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

        // Add the particle emitter
        const graphicsData = target.getOne(GraphicsComponent);
        if (graphicsData !== undefined) {
            removeExistingParticleEffects(target);
            target.addComponent({
                type: "ParticleEmitterComponent",
                emitter: null,
                turnsLeft: flammableData.turnsLeft,
                particleDefinition: {
                    particleImages: ["particle_cloud", "particle_fire"],
                    particleConfig: {
                        acceleration: { x: 0, y: 0 },
                        addAtBack: false,
                        alpha: { start: 0.62, end: 0 },
                        blendMode: "normal",
                        color: { start: "#fff191", end: "#ff622c" },
                        emitterLifetime: -1,
                        frequency: 0.001,
                        lifetime: { min: 0.05, max: 0.1 },
                        maxParticles: 500,
                        maxSpeed: 0,
                        noRotation: false,
                        pos: { x: 8, y: 8 },
                        rotationSpeed: { min: 50, max: 50 },
                        scale: { start: .2, end: 1, minimumScaleMultiplier: 1 },
                        spawnCircle: { x: 0, y: 0, r: 10 },
                        spawnType: "circle",
                        speed: { start: 230, end: 150, minimumSpeedMultiplier: 1 },
                        startRotation: { min: 265, max: 275 }
                    }
                }
            });
        }

        return true;
    } else if (flammableData.onFire === true && flammableData.turnsLeft < turns) {
        flammableData.turnsLeft = turns;
        flammableData.update();

        const particleData = target.getOne(ParticleEmitterComponent);
        if (particleData !== undefined) {
            particleData.turnsLeft = turns;
            particleData.update();
        }
    }

    return false;
}

export function setWet(target: Entity, turns?: number): boolean {
    // Put the fire out if the actor is on fire
    const flammableData = target.getOne(FlammableComponent);
    if (flammableData !== undefined && flammableData.onFire) {
        flammableData.onFire = false;
        flammableData.turnsLeft = 0;
        flammableData.fireDamage = 0;
        flammableData.update();
        removeExistingParticleEffects(target);
    }

    if (turns === undefined) { turns = 10; }
    const wetData = target.getOne(WetableComponent);
    if (wetData !== undefined && wetData.wet === false) {
        wetData.wet = true;
        wetData.turnsLeft = turns;
        wetData.update();

        // Add the particle emitter
        const graphicsData = target.getOne(GraphicsComponent);
        if (graphicsData !== undefined) {
            removeExistingParticleEffects(target);
            target.addComponent({
                type: "ParticleEmitterComponent",
                emitter: null,
                turnsLeft: wetData.turnsLeft,
                particleDefinition: {
                    particleImages: ["particle_cloud"],
                    particleConfig: {
                        acceleration: { x: 0, y: 0 },
                        addAtBack: false,
                        alpha: { start: 1, end: 0.8 },
                        blendMode: "normal",
                        color: { start: "#003cff", end: "#003cff" },
                        emitterLifetime: -1,
                        frequency: 0.004,
                        lifetime: { min: 0.2, max: 0.25 },
                        maxParticles: 4,
                        maxSpeed: 0,
                        noRotation: false,
                        pos: { x: 8, y: 8 },
                        rotationSpeed: { min: 50, max: 50 },
                        scale: { start: .18, end: .18, minimumScaleMultiplier: 1 },
                        spawnCircle: { x: 0, y: -2, r: 10 },
                        spawnType: "circle",
                        speed: { start: 5, end: 10, minimumSpeedMultiplier: 1 },
                        startRotation: { min: 90, max: 90 }
                    }
                }
            });
        }

        if (target.id === PLAYER_ID) {
            explainWetStatus();
        }

        return true;
    } else if (wetData !== undefined && wetData.turnsLeft < turns) {
        wetData.turnsLeft = turns;
        wetData.update();

        const particleData = target.getOne(ParticleEmitterComponent);
        if (particleData !== undefined) {
            particleData.turnsLeft = turns;
            particleData.update();
        }
    }

    return false;
}

export function setStunned(target: Entity, turns?: number): boolean {
    const stunnableData = target.getOne(StunnableComponent);
    if (stunnableData === undefined) { return false; }

    turns = turns ?? randomIntFromInterval(2, 4);

    if (stunnableData.stunned && stunnableData.turnsLeft >= turns) {
        return false;
    }
    if (stunnableData.stunned && stunnableData.turnsLeft < turns) {
        stunnableData.turnsLeft = turns ?? 0;
        stunnableData.update();

        const particleData = target.getOne(ParticleEmitterComponent);
        if (particleData !== undefined) {
            particleData.turnsLeft = stunnableData.turnsLeft;
            particleData.update();
        }

        return true;
    }

    stunnableData.stunned = true;
    stunnableData.turnsLeft = turns;
    stunnableData.update();

    // Add the particle emitter
    const graphicsData = target.getOne(GraphicsComponent);
    if (graphicsData !== undefined) {
        removeExistingParticleEffects(target);
        target.addComponent({
            type: "ParticleEmitterComponent",
            emitter: null,
            turnsLeft: stunnableData.turnsLeft,
            particleDefinition: {
                particleImages: ["particle_star"],
                particleConfig: {
                    acceleration: { x: 0, y: 0 },
                    addAtBack: false,
                    alpha: { start: 1, end: .8 },
                    blendMode: "normal",
                    color: { start: "#eaff00", end: "#eaff00" },
                    emitterLifetime: -1,
                    frequency: 0.15,
                    lifetime: { min: 0.3, max: 0.4 },
                    maxParticles: 100,
                    maxSpeed: 0,
                    noRotation: false,
                    pos: { x: 0, y: 0 },
                    rotationSpeed: { min: 0, max: 1 },
                    scale: { start: .8, end: .6, minimumScaleMultiplier: 0.5 },
                    spawnCircle: { x: 8, y: 8, r: 18 },
                    spawnType: "circle",
                    speed: { start: 0, end: 0, minimumSpeedMultiplier: 1 },
                    startRotation: { min: 0, max: 360 }
                }
            }
        });
    }

    return true;
}

/**
 * Freeze an entity if it can be frozen. If it's on fire, put out the
 * fire instead.
 */
export function setFrozen(target: Entity, turns: number): boolean {
    const typeData = target.getOne(TypeComponent)!;
    const triggerData = target.getOne(TriggerComponent);

    // Put the fire out if on fire
    const flammableData = target.getOne(FlammableComponent);
    if (flammableData !== undefined && flammableData.onFire) {
        flammableData.onFire = false;
        flammableData.turnsLeft = 0;
        flammableData.fireDamage = 0;
        flammableData.update();

        if (target.id === PLAYER_ID) {
            // TODO, sound: Dousing sound effect
            showLogMessage("Instead of being frozen, the fire was extinguished");
        } else if (typeData.displayName !== null) {
            // TODO, sound: Dousing sound effect
            showLogMessage(`Instead of ${typeData.displayName} being frozen, it is no longer on fire`);
        }

        if (triggerData !== undefined && triggerData.currentTriggerType === TriggerType.Fire) {
            target.removeComponent("TriggerComponent");
        }

        return false;
    }

    const frozenData = target.getOne(FreezableComponent);
    if (frozenData !== undefined && (frozenData.frozen === false || frozenData.turnsLeft < turns)) {
        frozenData.frozen = true;
        frozenData.turnsLeft = turns;
        frozenData.update();

        if (triggerData !== undefined &&
            (triggerData.currentTriggerType === TriggerType.DeepWater ||
                triggerData.currentTriggerType === TriggerType.ShallowWater ||
                triggerData.currentTriggerType === TriggerType.Mud)) {
            triggerData.currentTriggerType = TriggerType.Ice;
            triggerData.update();
        }

        const graphics = target.getOne(GraphicsComponent);
        if (graphics !== undefined && graphics.sprite !== null && frozenData.textureKey !== null) {
            graphics.sprite.texture = globals.Game!.textureAtlas[frozenData.textureKey];
        } else if (graphics !== undefined &&
            graphics.sprite !== null &&
            graphics.textureKey !== null &&
            frozenData.textureKey === null) {
            graphics.sprite.texture = globals.Game!.textureAtlas[graphics.textureKey];
        }

        return true;
    }

    return false;
}

/**
 * Mark an entity as covered in oil, dealing with all of the interactions
 * between the different statuses.
 */
export function setOilCovered(target: Entity, turns?: number): boolean {
    if (turns === undefined) { turns = 10; }
    const oilData = target.getOne(OilCoveredComponent);
    const typeData = target.getOne(TypeComponent)!;
    const wetData = target.getOne(WetableComponent);
    const frozenData = target.getOne(FreezableComponent);

    if (oilData === undefined) {
        if (target.id === PLAYER_ID) {
            showLogMessage("You were not covered in oil because you're immune");
        } else if (typeData.displayName !== null && target.tags.has("sentient")) {
            showLogMessage(`${typeData.displayName} was not set on fire because it is immune`);
        }
        return false;
    }

    // You can't be covered in oil you're wet
    if (wetData !== undefined && wetData.wet) {
        if (target.id === PLAYER_ID) {
            showLogMessage("You were not covered in oil because you were wet");
        } else if (typeData.displayName !== null) {
            showLogMessage(`${typeData.displayName} was not covered in oil because it is wet`);
        }
        return false;
    }

    // You can't be covered in oil you're frozen
    if (frozenData !== undefined && frozenData.frozen) {
        if (target.id === PLAYER_ID) {
            showLogMessage("You were not covered in oil because you were frozen");
        } else if (typeData.displayName !== null) {
            showLogMessage(`${typeData.displayName} was not covered in oil because it is frozen`);
        }
        return false;
    }

    if (oilData.oilCovered === false || oilData.turnsLeft < turns) {
        oilData.oilCovered = true;
        oilData.turnsLeft = turns;
        oilData.update();

        // Add the particle emitter
        const graphicsData = target.getOne(GraphicsComponent);
        if (graphicsData !== undefined) {
            removeExistingParticleEffects(target);
            target.addComponent({
                type: "ParticleEmitterComponent",
                emitter: null,
                turnsLeft: oilData.turnsLeft,
                particleDefinition: {
                    particleImages: ["particle_cloud"],
                    particleConfig: {
                        acceleration: { x: 0, y: 0 },
                        addAtBack: false,
                        alpha: { start: 1, end: 0.8 },
                        blendMode: "normal",
                        color: { start: "#C66527", end: "#CB942A" },
                        emitterLifetime: -1,
                        frequency: 0.004,
                        lifetime: { min: 0.2, max: 0.25 },
                        maxParticles: 4,
                        maxSpeed: 0,
                        noRotation: false,
                        pos: { x: 8, y: 8 },
                        rotationSpeed: { min: 50, max: 50 },
                        scale: { start: .18, end: .18, minimumScaleMultiplier: 1 },
                        spawnCircle: { x: 0, y: -2, r: 10 },
                        spawnType: "circle",
                        speed: { start: 5, end: 10, minimumSpeedMultiplier: 1 },
                        startRotation: { min: 90, max: 90 }
                    }
                }
            });
        }

        if (target.id === PLAYER_ID) {
            showLogMessage("You're covered in oil");
        } else if (typeData.displayName !== null) {
            showLogMessage(`${typeData.displayName} is covered in oil`);
        }

        explainOiledStatus();
        // TODO, sound: Oil covered sound
        return true;
    }

    return false;
}

/**
 * Given a skill definition being used, roll to see if the status effect
 * will be applied to the target
 */
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
            case StatusEffectType.Stunned:
                setStunned(target, randomIntFromInterval(2, 4));
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
    target: Vector2D
): boolean {
    function findEntitiesInBodyOfWater(start: Vector2D): Entity[] {
        const entitiesInWater: Entity[] = [];
        // TODO, Speed: JS doesn't have a hash set so you can't do a set of objects.
        // Write one so we don't have to use string keys
        const todo: Map<string, Vector2D> = new Map();
        todo.set(`${start.x},${start.y}`, start);
        const done: Set<string> = new Set();

        while (todo.size > 0) {
            const tile = todo.values().next().value;
            done.add(`${tile.x},${tile.y}`);
            todo.delete(`${tile.x},${tile.y}`);

            const entities = getEntitiesAtLocation(ecs, entityMap, tile);
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
                const newTilePos = new Vector2D(tile.x + dir[0], tile.y + dir[1]);
                const newTilePosString = `${newTilePos.x},${newTilePos.y}`;

                if (done.has(newTilePosString)) { continue; }

                const entities = getEntitiesAtLocation(ecs, entityMap, newTilePos);
                const hasWater = entities.filter(e => e.tags.has("waterTile")).length > 0;
                if (hasWater) {
                    todo.set(newTilePosString, newTilePos);
                }
            }
        }

        return entitiesInWater;
    }

    if (item.value === null) { throw new Error("Item does not have a value for castDamageSpell"); }

    const targetedEntity = mouseTarget(ecs, map, entityMap, target);
    if (targetedEntity === null) {
        showLogMessage("Canceled casting");
        return false;
    }

    const targetTypeData = targetedEntity.getOne(TypeComponent);
    const targetHPData = targetedEntity.getOne(HitPointsComponent);
    if (targetHPData === undefined && targetTypeData?.displayName !== null) {
        showLogMessage(`${targetTypeData?.displayName} isn't attack-able`);
        return false;
    }

    // If the target is standing in water, we're going to
    // have the electricity spread throughout the water body
    // and damage everything standing in it
    if (item.damageType === DamageType.Electric) {
        const entities = getEntitiesAtLocation(ecs, entityMap, target);
        const isOnWater = entities.filter(e => e.tags.has("waterTile")).length > 0;
        if (isOnWater) {
            const entitiesToDamage = findEntitiesInBodyOfWater(target);
            for (let i = 0; i < entitiesToDamage.length; i++) {
                // TODO: Add special sound effect here
                takeDamage(
                    ecs,
                    entityMap,
                    entitiesToDamage[i],
                    item.value,
                    false,
                    item.damageType ?? DamageType.Physical,
                    user.id
                );
            }
        } else {
            takeDamage(
                ecs,
                entityMap,
                targetedEntity,
                item.value,
                false,
                item.damageType ?? DamageType.Physical,
                user.id
            );
        }
    } else {
        takeDamage(
            ecs,
            entityMap,
            targetedEntity,
            item.value,
            false,
            item.damageType ?? DamageType.Physical,
            user.id
        );
    }

    const stats = getEffectiveStatData(ecs, entityMap, targetedEntity);
    const hp = getEffectiveHitPointData(targetedEntity);
    if (stats === null || hp === null) { return true; }
    rollForStatusEffect(item, targetedEntity, stats, hp);
    return true;
}

/**
 * Give fire damages to all entities in an area
 */
function fireball(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Vector2D,
    rotation: number
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value for fireball"); }

    const tiles = getTargetedArea(item.areaOfEffect ?? null, target, rotation);
    for (let i = 0; i < tiles.length; i++) {
        const entities = getEntitiesAtLocation(ecs, entityMap, tiles[i]);
        for (const entity of entities) {
            const targetHPData = entity.getOne(HitPointsComponent);
            if (targetHPData !== undefined) {
                // Make the spell dangerous by having it set things on fire rather than
                // destroy them if they're not actors
                if (item.statusEffect === StatusEffectType.OnFire && !entity.tags.has("sentient")) {
                    setOnFire(entity);
                } else {
                    takeDamage(
                        ecs,
                        entityMap,
                        entity,
                        item.value,
                        false,
                        item.damageType ?? DamageType.Physical,
                        user.id
                    );

                    const stats = getEffectiveStatData(ecs, entityMap, entity);
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

export function castFireballTargeted(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Vector2D,
    rotation: number
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value for castFireballTargeted"); }

    const targetedEntity = mouseTarget(ecs, map, entityMap, target);
    if (targetedEntity === null) {
        showLogMessage("Canceled casting");
        return false;
    }

    return fireball(item, user, ecs, map, entityMap, target, rotation);
}

export function castConfuse(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Vector2D
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value"); }

    const entity = mouseTarget(ecs, map, entityMap, target);
    if (entity === null) {
        showLogMessage("Canceled casting");
        return false;
    }

    const typeData = entity.getOne(TypeComponent);
    if (typeData === undefined) { throw new Error("entity does not have a TypeComponent"); }

    const confusedState = entity.getOne(ConfusableAIComponent);
    if (confusedState === undefined) {
        showLogMessage(`${typeData.displayName} is immune to confusion`);
        return false;
    }

    confusedState.confused = true;
    confusedState.turnsLeft = item.value;
    showLogMessage(`${typeData.displayName} is now confused`);

    return true;
}

export function castClairvoyance(): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    showLogMessage("You have been granted Clairvoyance");
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
            showLogMessage("You are already hasted");
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
    target: Vector2D
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value"); }

    const entity = mouseTarget(ecs, map, entityMap, target);
    if (entity === null) {
        showLogMessage("Canceled casting");
        return false;
    }

    const speedData = entity.getOne(SpeedComponent);
    const typeData = entity.getOne(TypeComponent)!;

    if (speedData === undefined) {
        showLogMessage(`${typeData.displayName} isn't slow-able`);
        return false;
    }

    const speedEffects = entity.getComponents(SpeedEffectComponent);
    // TODO implement filter/map for Iterators
    for (const e of speedEffects) {
        if (e.name === "Slow") {
            showLogMessage(`${typeData.displayName} is already slowed`);
            return false;
        }
    }

    showLogMessage(`Spell hits and slows ${typeData.displayName}`);

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
    target: Vector2D,
    rotation: number,
    objectId: string
): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (item.areaOfEffect === undefined) { throw new Error("areaOfEffect cannot be null for castWall"); }

    const tiles = getTargetedArea(item.areaOfEffect, target, rotation);

    for (let i = 0; i < tiles.length; i++) {
        const { blocks, entity } = isBlocked(ecs, map, entityMap, tiles[i]);

        if (blocks === true && entity === null) {
            continue;
        }

        createEntity(ecs, globals.Game.textureAtlas, objectId, tiles[i]);
    }

    return true;
}

export function castIceWall(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Vector2D,
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
    target: Vector2D,
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

export function castFireRing(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Vector2D,
    rotation: number
): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }
    if (item.areaOfEffect === undefined) { throw new Error("areaOfEffect cannot be null for castWall"); }

    const tiles = getTargetedArea(item.areaOfEffect, target, rotation);

    for (let i = 0; i < tiles.length; i++) {
        const { blocks, entity } = isBlocked(ecs, map, entityMap, tiles[i]);

        if (blocks === true && entity === null) {
            continue;
        }

        createEntity(ecs, globals.Game.textureAtlas, "fire_effect", tiles[i]);
    }

    return true;
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
    target: Vector2D
): boolean {
    if (target.x >= map.width ||
        target.y >= map.height ||
        map.visibilityData[target.y][target.x].visible === false) {
        showLogMessage("Canceled casting");
        return false;
    }

    const targetedEntity = getEntitiesAtLocation(ecs, entityMap, target)
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
        showLogMessage("Canceled casting");
        return false;
    }

    if (targetedEntity.tags.has("waterTile")) {
        for (let dx = -5; dx < 5; dx++) {
            const height = Math.round(Math.sqrt(
                5 * 5 - dx * dx
            ));

            for (let dy = -height; dy < height; dy++) {
                createEntity(ecs, globals.Game!.textureAtlas, "steam", new Vector2D(target.x + dx, target.y + dy));
            }
        }

        const t = targetedEntity.getOne(TypeComponent);
        if (t !== undefined && t.entityType === "puddle") {
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
        const tilePos = getRandomOpenSpace(ecs, map, entityMap);
        createEntity(ecs, globals.Game.textureAtlas, "puddle", tilePos);
    }

    return true;
}


export function castSilence(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Vector2D
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value for castSilence"); }

    const targetedEntity = mouseTarget(ecs, map, entityMap, target);
    if (targetedEntity === null) {
        showLogMessage("Canceled casting");
        return false;
    }

    const targetTypeData = targetedEntity.getOne(TypeComponent)!;
    const targetSpellData = targetedEntity.getOne(SpellsComponent);
    const targetSilenceableData = targetedEntity.getOne(SilenceableComponent);
    if (targetSilenceableData === undefined && targetedEntity.tags.has("sentient")) {
        showLogMessage(`${targetTypeData.displayName} is immune to silence effects`);
        return false;
    } else if (targetSpellData === undefined && targetedEntity.tags.has("sentient")) {
        showLogMessage(`${targetTypeData.displayName} cannot be silenced because it doesn't know any spells`);
        return false;
    } else if (targetSilenceableData === undefined || targetSpellData === undefined) {
        showLogMessage(`${targetTypeData.displayName} cannot be silenced`);
        return false;
    }

    showLogMessage(`${targetTypeData.displayName} is silenced`);
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
    if (pos === undefined) { throw new Error("can't call castExhale with a user without a position"); }

    for (let i = 0; i < DIRS[8].length; i++) {
        const dir = DIRS[8][i];

        const { entity } = isBlocked(
            ecs,
            map,
            entityMap,
            new Vector2D(pos.tilePosition.x + dir[0], pos.tilePosition.y + dir[1])
        );
        if (entity !== null) {
            if (entity.tags.has("moveable")) {
                globals.Game!.commandQueue.push(new PushBackCommand(entity.id, i, item.value, 1));
            }
        }
    }

    return true;
}

export function castPush(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target?: Vector2D,
    rotation?: number,
    direction?: number
): boolean {
    if (item.value === null) { throw new Error("Item has missing data"); }
    if (target === undefined) { throw new Error("Push requires a target"); }
    if (direction === undefined) { throw new Error("Push requires a direction"); }

    const targetedEntity = mouseTarget(ecs, map, entityMap, target);
    if (targetedEntity === null) {
        showLogMessage("Canceled casting");
        return false;
    }

    if (!targetedEntity.tags.has("moveable")) {
        const typeData = targetedEntity.getOne(TypeComponent);
        showLogMessage(`${typeData?.displayName} cannot be pushed. Canceled casting`);
        return false;
    }

    const targetPos = targetedEntity.getOne(PositionComponent);
    if (targetPos === undefined) { throw new Error("can't call castPush on a target without a position"); }

    globals.Game!.commandQueue.push(
        new PushBackCommand(targetedEntity.id, direction, item.value, 1)
    );
    return true;
}

export function castFreeze(
    skillData: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Vector2D
): boolean {
    if (skillData.value === null) { throw new Error("Item does not have a value for castFreeze"); }
    if (skillData.areaOfEffect === undefined) { throw new Error("Item does not have an area of effect for castFreeze"); }

    const targetedEntity = mouseTarget(ecs, map, entityMap, target, false);
    if (targetedEntity === null) {
        showLogMessage("Canceled casting");
        return false;
    }

    const targetTypeData = targetedEntity.getOne(TypeComponent)!;
    const targetFreezableData = targetedEntity.getOne(FreezableComponent);
    if (targetFreezableData === undefined) {
        showLogMessage(`${targetTypeData.displayName} cannot be frozen`);
        return false;
    }

    const targetPos = targetedEntity.getOne(PositionComponent)!.tilePosition;
    const positions: Vector2D[] = getCirclePositions(
        skillData.areaOfEffect.radius!, targetPos.x, targetPos.y
    );

    for (const pos of positions) {
        if (pos.x < map.width &&
            pos.y < map.height) {
            const z = getHighestZIndexWithTile(map, pos);
            const entities = getEntitiesAtLocation(ecs, entityMap, pos);
            if (map.data[z][pos.y][pos.x]!.blocks === false || entities.length > 0) {
                const puddle = createEntity(ecs, globals.Game!.textureAtlas, "puddle", pos);
                setFrozen(puddle, skillData.value * 3);

                for (const e of entities) {
                    setFrozen(e, skillData.value);
                }
            }
        }
    }

    return true;
}

function castFireballRune(
    skillData: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Vector2D
): boolean {
    if (globals.Game === null) { throw new Error("Global game object is null"); }

    const { blocks, entity } = isBlocked(ecs, map, entityMap, target);

    if (blocks === true && entity === null) {
        return false;
    }

    createEntity(ecs, globals.Game.textureAtlas, "fireball_rune", target);
    return true;
}

/**
 * Give fire damages to all entities in an area
 */
function castAreaOfEffect(
    item: ItemDataDetails | SpellDataDetails,
    user: Entity,
    ecs: World,
    map: GameMap,
    entityMap: EntityMap,
    target: Vector2D,
    rotation: number
): boolean {
    if (item.value === null) { throw new Error("Item does not have a value for fireball"); }

    const tiles = getTargetedArea(item.areaOfEffect ?? null, target, rotation);
    for (let i = 0; i < tiles.length; i++) {
        const entities = getEntitiesAtLocation(ecs, entityMap, tiles[i]);
        for (const entity of entities) {
            if (entity === user) { continue; }

            const targetHPData = entity.getOne(HitPointsComponent);
            if (targetHPData !== undefined) {
                // Make the spell dangerous by having it set things on fire rather than
                // destroy them if they're not actors
                if (item.statusEffect === StatusEffectType.OnFire && !entity.tags.has("sentient")) {
                    setOnFire(entity);
                } else {
                    takeDamage(
                        ecs,
                        entityMap,
                        entity,
                        item.value,
                        false,
                        item.damageType ?? DamageType.Physical,
                        user.id
                    );

                    const stats = getEffectiveStatData(ecs, entityMap, entity);
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

/**
 * Map of item IDs and their data, including a function pointer
 * to the implementation of the item's behavior
 */
export const ItemData: { [key: string]: ItemDataDetails } = {
    "apple": {
        id: "apple",
        displayName: "Apple",
        description: "Heals a small amount of health when eaten",
        value: 5,
        type: ItemType.HealSelf,
        useFunc: castHeal
    },
    "health_potion_weak": {
        id: "health_potion_weak",
        displayName: "Weak Potion of Healing",
        description: "Potion that restores a small amount of health",
        value: 25,
        type: ItemType.HealSelf,
        useFunc: castHeal,
        effect: "particles",
        particles: {
            particleLocation: "self",
            particleImages: ["particle_health_cross"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: 0.8 },
                blendMode: "normal",
                color: { start: "#C66527", end: "#C66527" },
                emitterLifetime: 1,
                frequency: 0.077,
                lifetime: { min: .2, max: .3 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: true,
                pos: {x: 0, y: 0},
                rotationSpeed: { min: 0, max: 20 },
                scale: { start: .7, end: 0.3, minimumScaleMultiplier: 0.5 },
                spawnRect: {x: -3, y: 16, w: 20, h: 0},
                spawnType: "rect",
                speed: { start: 100, end: 100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 270, max: 270 }
            }
        }
    },
    "health_potion": {
        id: "health_potion",
        displayName: "Potion of Healing",
        description: "Potion that restores a some health",
        value: 50,
        type: ItemType.HealSelf,
        useFunc: castHeal,
        effect: "particles",
        particles: {
            particleLocation: "self",
            particleImages: ["particle_health_cross"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: 0.8 },
                blendMode: "normal",
                color: { start: "#C66527", end: "#C66527" },
                emitterLifetime: 1,
                frequency: 0.077,
                lifetime: { min: .2, max: .3 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: true,
                pos: {x: 0, y: 0},
                rotationSpeed: { min: 0, max: 20 },
                scale: { start: .7, end: 0.3, minimumScaleMultiplier: 0.5 },
                spawnRect: {x: -3, y: 16, w: 20, h: 0},
                spawnType: "rect",
                speed: { start: 100, end: 100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 270, max: 270 }
            }
        }
    },
    "health_potion_strong": {
        id: "health_potion_strong",
        displayName: "Strong Potion of Healing",
        description: "Potion that restores a large amount of health",
        value: 100,
        type: ItemType.HealSelf,
        useFunc: castHeal,
        effect: "particles",
        particles: {
            particleLocation: "self",
            particleImages: ["particle_health_cross"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: 0.8 },
                blendMode: "normal",
                color: { start: "#C66527", end: "#C66527" },
                emitterLifetime: 1,
                frequency: 0.077,
                lifetime: { min: .2, max: .3 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: true,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 20 },
                scale: { start: .7, end: 0.3, minimumScaleMultiplier: 0.5 },
                spawnRect: { x: -3, y: 16, w: 20, h: 0 },
                spawnType: "rect",
                speed: { start: 100, end: 100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 270, max: 270 }
            }
        }
    },
    "lightning_scroll": {
        id: "lightning_scroll",
        displayName: "Scroll of Lightning",
        description: "Conjure a lightning bolt that damages a target with lightning damage",
        value: 50,
        type: ItemType.DamageScroll,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell,
        range: 9,
        effect: "lightning",
        lightning: {
            duration: 500,
            segments: 20,
            strikes: 1,
            fadeOut: 300
        }
    },
    "fireball_scroll": {
        id: "fireball_scroll",
        displayName: "Scroll of Fire",
        description: "Conjure a ball of fire that damages a target with fire damage",
        value: 50,
        type: ItemType.DamageScroll,
        damageType: DamageType.Fire,
        range: 9,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire,
        effect: "particles",
        particles: {
            particleImages: ["particle_cloud"],
            particleLocation: "target",
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 0.84, end: 0.4 },
                angleStart: 0,
                blendMode: "normal",
                color: { start: "#f7a134", end: "#fa0303" },
                emitterLifetime: 0.35,
                frequency: 0.04,
                lifetime: { min: 0.3, max: 0.35 },
                maxParticles: 80,
                maxSpeed: 0,
                noRotation: false,
                particleSpacing: 0,
                particlesPerWave: 40,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 0 },
                scale: { start: 1, end: 0.3, minimumScaleMultiplier: 1 },
                spawnType: "burst",
                speed: { start: 200, end: 100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 0, max: 0 },
            }
        }
    },
    "lightning_scroll_wild": {
        id: "lightning_scroll_wild",
        displayName: "Scroll of Wild Lightning",
        description: "Summons a lightning bolt that's beyond your control and attacks randomly with lightning damage",
        value: 100,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell,
        effect: "lightning",
        lightning: {
            duration: 500,
            segments: 20,
            strikes: 1,
            fadeOut: 300
        }
    },
    "fireball_scroll_wild": {
        id: "fireball_scroll_wild",
        displayName: "Scroll of Wild Fire",
        description: "Summons a ball of fire that's beyond your control and attacks randomly with fire damage",
        value: 100,
        type: ItemType.WildDamageScroll,
        damageType: DamageType.Fire,
        useFunc: castDamageSpell,
        statusEffect: StatusEffectType.OnFire,
        effect: "particles",
        particles: {
            particleImages: ["particle_cloud"],
            particleLocation: "target",
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 0.84, end: 0.4 },
                angleStart: 0,
                blendMode: "normal",
                color: { start: "#f7a134", end: "#fa0303" },
                emitterLifetime: 0.35,
                frequency: 0.04,
                lifetime: { min: 0.3, max: 0.35 },
                maxParticles: 80,
                maxSpeed: 0,
                noRotation: false,
                particleSpacing: 0,
                particlesPerWave: 40,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 0 },
                scale: { start: 1, end: 0.3, minimumScaleMultiplier: 1 },
                spawnType: "burst",
                speed: { start: 200, end: 100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 0, max: 0 },
            }
        }
    },
    "confuse_scroll": {
        id: "confuse_scroll",
        displayName: "Scroll of Confuse Enemy",
        description: "Your target loses control of their actions",
        value: 8,
        type: ItemType.ConfuseScroll,
        useFunc: castConfuse,
        effect: "particles",
        particles: {
            particleLocation: "target",
            particleImages: ["particle_star"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: .8 },
                blendMode: "normal",
                color: { start: "#eaff00", end: "#eaff00" },
                emitterLifetime: 1,
                frequency: 0.057,
                lifetime: { min: 0.3, max: 0.4 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: false,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 0 },
                scale: { start: .8, end: .6, minimumScaleMultiplier: 0.5 },
                spawnCircle: { x: 8, y: 8, r: 30 },
                spawnType: "circle",
                speed: { start: 0, end: 0, minimumSpeedMultiplier: 1 },
                startRotation: { min: 0, max: 360 }
            }
        }
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
        effect: "particles",
        particles: {
            particleLocation: "self",
            particleImages: ["particle_arrow_up"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: 1 },
                blendMode: "normal",
                color: { start: "#4BA86D", end: "#4BA86D" },
                emitterLifetime: 1,
                frequency: 0.077,
                lifetime: { min: .2, max: .3 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: true,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 20 },
                scale: { start: 0.5, end: 0.7, minimumScaleMultiplier: 0.5 },
                spawnRect: { x: -3, y: 16, w: 20, h: 0 },
                spawnType: "rect",
                speed: { start: 50, end: 200, minimumSpeedMultiplier: 1 },
                startRotation: { min: 270, max: 270 }
            }
        }
    },
    "slow_poison_weak": {
        id: "slow_poison_weak",
        displayName: "Weak Poison of Slow",
        description: "Only allow your target to take one action per two turns",
        value: 5,
        type: ItemType.SlowOther,
        useFunc: castSlow,
        effect: "particles",
        particles: {
            particleLocation: "target",
            particleImages: ["particle_arrow_up"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: 1 },
                blendMode: "normal",
                color: { start: "#B760A6", end: "#B760A6" },
                emitterLifetime: 1,
                frequency: 0.077,
                lifetime: { min: .2, max: 1 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: true,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 20 },
                scale: { start: 0.5, end: 0.7, minimumScaleMultiplier: 0.5 },
                spawnRect: { x: -3, y: -16, w: 20, h: 0 },
                spawnType: "rect",
                speed: { start: 100, end: 10, minimumSpeedMultiplier: 1 },
                startRotation: { min: 90, max: 90 }
            }
        }
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
        baseCastCount: 10,
        value: 20,
        type: SpellType.DamageOther,
        damageType: DamageType.Electric,
        range: 9,
        useFunc: castDamageSpell,
        effect: "lightning",
        lightning: {
            duration: 500,
            segments: 20,
            strikes: 1,
            fadeOut: 300
        }
    },
    "wild_lightning_bolt": {
        id: "wild_lightning_bolt",
        displayName: "Wild Lightning Bolt",
        description: "Summons a lightning bolt that's beyond your control and attacks a random target within 10 spaces. Deals lightning damage",
        baseCastCount: 1,
        value: 30,
        type: SpellType.WildDamage,
        damageType: DamageType.Electric,
        useFunc: castDamageSpell,
        effect: "lightning",
        lightning: {
            duration: 300,
            segments: 20,
            strikes: 2,
            fadeOut: 400
        }
    },
    "fireball_targeted": {
        id: "fireball_targeted",
        displayName: "Fireball",
        description: "Hurl a ball of fire towards a specific spot that deals fire damage and has a chance to catch targets on fire. Explodes in a large radius, possibly dealing self-damage or friendly fire",
        baseCastCount: 2,
        value: 20,
        type: SpellType.DamageOther,
        damageType: DamageType.Fire,
        range: 10,
        useFunc: castFireballTargeted,
        areaOfEffect: {
            type: "circle",
            radius: 4
        },
        statusEffect: StatusEffectType.OnFire,
        effect: "particles",
        particles: {
            particleImages: ["particle_cloud"],
            particleLocation: "target",
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 0.84, end: 0.4 },
                angleStart: 0,
                blendMode: "normal",
                color: { start: "#f7a134", end: "#fa0303" },
                emitterLifetime: 0.35,
                frequency: 0.04,
                lifetime: { min: 0.32, max: 0.37 },
                maxParticles: 80,
                maxSpeed: 0,
                noRotation: false,
                particleSpacing: 0,
                particlesPerWave: 40,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 0 },
                scale: { start: 1, end: 0.3, minimumScaleMultiplier: 1 },
                spawnType: "burst",
                speed: { start: 250, end: 150, minimumSpeedMultiplier: 1 },
                startRotation: { min: 0, max: 0 },
            }
        }
    },
    "fireball_placed": {
        id: "fireball_placed",
        displayName: "[DEV] Fireball Placed",
        description: "",
        baseCastCount: 1,
        value: 40,
        type: SpellType.DamageOther,
        damageType: DamageType.Fire,
        range: 10,
        useFunc: fireball,
        areaOfEffect: {
            type: "circle",
            radius: 3
        },
        statusEffect: StatusEffectType.OnFire,
        effect: "particles",
        particles: {
            particleImages: ["particle_cloud"],
            particleLocation: "target",
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 0.84, end: 0.4 },
                angleStart: 0,
                blendMode: "normal",
                color: { start: "#f7a134", end: "#fa0303" },
                emitterLifetime: 0.35,
                frequency: 0.04,
                lifetime: { min: 0.3, max: 0.35 },
                maxParticles: 80,
                maxSpeed: 0,
                noRotation: false,
                particleSpacing: 0,
                particlesPerWave: 40,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 0 },
                scale: { start: 1, end: 0.3, minimumScaleMultiplier: 1 },
                spawnType: "burst",
                speed: { start: 200, end: 100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 0, max: 0 },
            }
        }
    },
    "lightning_aoe": {
        id: "lightning_aoe",
        displayName: "[DEV] Lightning AOE",
        description: "[DEV] Lightning AOE",
        baseCastCount: 1,
        value: 40,
        type: SpellType.AreaOfEffect,
        damageType: DamageType.Electric,
        range: 10,
        useFunc: castAreaOfEffect,
        areaOfEffect: {
            type: "circle",
            radius: 3
        },
        statusEffect: StatusEffectType.Stunned,
        effect: "particles",
        particles: {
            particleImages: ["particle_lightning_bolt"],
            particleLocation: "target",
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 0.84, end: 0.4 },
                angleStart: 0,
                blendMode: "normal",
                color: { start: "#effc02", end: "#effc02" },
                emitterLifetime: 0.55,
                frequency: 0.04,
                lifetime: { min: 0.3, max: 0.35 },
                maxParticles: 10,
                maxSpeed: 0,
                noRotation: false,
                particleSpacing: 0,
                particlesPerWave: 40,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 0 },
                scale: { start: 1.5, end: 0.5, minimumScaleMultiplier: 1 },
                spawnType: "burst",
                speed: { start: 200, end: 100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 0, max: 0 },
            }
        }
    },
    "confuse": {
        id: "confuse",
        displayName: "Confuse",
        description: "Your target loses control of their actions for the given number of turns",
        baseCastCount: 2,
        value: 8,
        type: SpellType.DamageOther,
        useFunc: castConfuse,
        effect: "particles",
        particles: {
            particleLocation: "target",
            particleImages: ["particle_star"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: .8 },
                blendMode: "normal",
                color: { start: "#eaff00", end: "#eaff00" },
                emitterLifetime: 1,
                frequency: 0.057,
                lifetime: { min: 0.3, max: 0.4 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: false,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 0 },
                scale: { start: .8, end: .6, minimumScaleMultiplier: 0.5 },
                spawnCircle: { x: 8, y: 8, r: 30 },
                spawnType: "circle",
                speed: { start: 0, end: 0, minimumSpeedMultiplier: 1 },
                startRotation: { min: 0, max: 360 }
            }
        }
    },
    "clairvoyance": {
        id: "clairvoyance",
        displayName: "Clairvoyance",
        description: "Use sensory magics to learn the layout of the whole map.",
        baseCastCount: 10,
        value: null,
        type: SpellType.Passive,
        useFunc: castClairvoyance
    },
    "lesser_heal": {
        id: "lesser_heal",
        displayName: "Lesser Heal",
        description: "Heals a small amount of hit points",
        baseCastCount: 5,
        value: 25,
        type: SpellType.HealSelf,
        useFunc: castHeal,
        effect: "particles",
        particles: {
            particleLocation: "self",
            particleImages: ["particle_health_cross"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: 0.8 },
                blendMode: "normal",
                color: { start: "#C66527", end: "#C66527" },
                emitterLifetime: 1,
                frequency: 0.077,
                lifetime: { min: .2, max: .3 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: true,
                pos: {x: 0, y: 0},
                rotationSpeed: { min: 0, max: 20 },
                scale: { start: .7, end: 0.3, minimumScaleMultiplier: 0.5 },
                spawnRect: {x: -3, y: 16, w: 20, h: 0},
                spawnType: "rect",
                speed: { start: 100, end: 100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 270, max: 270 }
            }
        }
    },
    "heal": {
        id: "heal",
        displayName: "Heal",
        description: "Heals a good amount of health",
        baseCastCount: 10,
        value: 50,
        type: SpellType.HealSelf,
        useFunc: castHeal,
        effect: "particles",
        particles: {
            particleLocation: "self",
            particleImages: ["particle_health_cross"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: 0.8 },
                blendMode: "normal",
                color: { start: "#C66527", end: "#C66527" },
                emitterLifetime: 1.5,
                frequency: 0.077,
                lifetime: { min: .2, max: .3 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: true,
                pos: {x: 0, y: 0},
                rotationSpeed: { min: 0, max: 20 },
                scale: { start: .7, end: 0.3, minimumScaleMultiplier: 0.5 },
                spawnRect: {x: -3, y: 16, w: 20, h: 0},
                spawnType: "rect",
                speed: { start: 100, end: 100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 270, max: 270 }
            }
        }
    },
    "greater_heal": {
        id: "greater_heal",
        displayName: "Greater Heal",
        description: "Gives a large amount of health",
        baseCastCount: 10,
        value: 100,
        type: SpellType.HealSelf,
        useFunc: castHeal,
        effect: "particles",
        particles: {
            particleLocation: "self",
            particleImages: ["particle_health_cross"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: 0.8 },
                blendMode: "normal",
                color: { start: "#C66527", end: "#C66527" },
                emitterLifetime: 1.8,
                frequency: 0.077,
                lifetime: { min: .2, max: .3 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: true,
                pos: {x: 0, y: 0},
                rotationSpeed: { min: 0, max: 20 },
                scale: { start: .7, end: 0.3, minimumScaleMultiplier: 0.5 },
                spawnRect: { x: -3, y: 16, w: 20, h: 0 },
                spawnType: "rect",
                speed: { start: 100, end: 100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 270, max: 270 }
            }
        }
    },
    "heal_other": {
        id: "heal_other",
        displayName: "Heal Other",
        description: "Heals someone else for a small amount of hit points",
        baseCastCount: 10,
        value: 25,
        type: SpellType.HealOther,
        useFunc: castHealOther,
        effect: "particles",
        particles: {
            particleLocation: "target",
            particleImages: ["particle_health_cross"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: 0.8 },
                blendMode: "normal",
                color: { start: "#C66527", end: "#C66527" },
                emitterLifetime: 1,
                frequency: 0.077,
                lifetime: { min: .2, max: .3 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: true,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 20 },
                scale: { start: .7, end: 0.3, minimumScaleMultiplier: 0.5 },
                spawnRect: {x: -3, y: 16, w: 20, h: 0},
                spawnType: "rect",
                speed: { start: 100, end: 100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 270, max: 270 }
            }
        }
    },
    "lesser_haste": {
        id: "lesser_haste",
        displayName: "Lesser Haste",
        description: "You can make two actions for every one turn for the given number of turns.",
        baseCastCount: 10,
        value: 10,
        type: SpellType.Effect,
        useFunc: castHaste,
        effect: "particles",
        particles: {
            particleLocation: "self",
            particleImages: ["particle_arrow_up"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: 1 },
                blendMode: "normal",
                color: { start: "#4BA86D", end: "#4BA86D" },
                emitterLifetime: 1,
                frequency: 0.077,
                lifetime: { min: .2, max: .3 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: true,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 20 },
                scale: { start: 0.5, end: 0.7, minimumScaleMultiplier: 0.5 },
                spawnRect: { x: -3, y: 16, w: 20, h: 0 },
                spawnType: "rect",
                speed: { start: 50, end: 200, minimumSpeedMultiplier: 1 },
                startRotation: { min: 270, max: 270 }
            }
        }
    },
    "lesser_slow": {
        id: "lesser_slow",
        displayName: "Lesser Slow",
        description: "Only allow your target to take one action per two turns",
        baseCastCount: 10,
        value: 10,
        type: SpellType.DamageOther,
        range: 9,
        useFunc: castSlow,
        effect: "particles",
        particles: {
            particleLocation: "target",
            particleImages: ["particle_arrow_up"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 1, end: 1 },
                blendMode: "normal",
                color: { start: "#B760A6", end: "#B760A6" },
                emitterLifetime: 1,
                frequency: 0.077,
                lifetime: { min: .2, max: 1 },
                maxParticles: 500,
                maxSpeed: 0,
                noRotation: true,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 20 },
                scale: { start: 0.5, end: 0.7, minimumScaleMultiplier: 0.5 },
                spawnRect: { x: -3, y: -16, w: 20, h: 0 },
                spawnType: "rect",
                speed: { start: 100, end: 10, minimumSpeedMultiplier: 1 },
                startRotation: { min: 90, max: 90 }
            }
        }
    },
    "ring_of_fire": {
        id: "ring_of_fire",
        displayName: "Ring of Fire",
        description: "Conjure a ring of flame around you that damages anything that touches it",
        baseCastCount: 10,
        value: 10,
        type: SpellType.DamageOther,
        damageType: DamageType.Fire,
        range: 9,
        areaOfEffect: {
            type: "ring",
            radius: 2
        },
        useFunc: castFireRing
    },
    "fire_wall": {
        id: "fire_wall",
        displayName: "Wall of Fire",
        description: "Conjure a wall of flame that damages all who walk through it",
        baseCastCount: 10,
        value: 10,
        type: SpellType.DamageOther,
        damageType: DamageType.Fire,
        range: 9,
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
        baseCastCount: 10,
        value: null,
        type: SpellType.DamageOther,
        range: 9,
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
        baseCastCount: 3,
        value: 5,
        type: SpellType.DamageOther,
        range: 11,
        useFunc: castCombust,
        effect: "particles",
        particles: {
            particleLocation: "target",
            particleImages: ["particle_cloud", "particle_fire"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 0.62, end: 0 },
                blendMode: "normal",
                color: { start: "#fff191", end: "#ff622c" },
                emitterLifetime: 0.5,
                frequency: 0.001,
                lifetime: { min: 0.05, max: 0.1 },
                maxParticles: 1000,
                maxSpeed: 0,
                noRotation: false,
                pos: { x: 8, y: 8 },
                rotationSpeed: { min: 50, max: 50 },
                scale: { start: .2, end: 1, minimumScaleMultiplier: 1 },
                spawnCircle: { x: 0, y: 0, r: 10 },
                spawnType: "circle",
                speed: { start: 500, end: 500, minimumSpeedMultiplier: 1 },
                startRotation: { min: 265, max: 275 }
            }
        }
    },
    "rain": {
        id: "rain",
        displayName: "Rain",
        description: "Calls a storm which makes everything wet",
        baseCastCount: 10,
        value: 15,
        type: SpellType.Passive,
        useFunc: castRain,
        effect: "particles",
        particles: {
            particleLocation: "self",
            particleImages: ["particle_cloud"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: false,
                alpha: { start: 0.4, end: 0.5 },
                blendMode: "normal",
                color: {start: "#7e82fc", end: "#321fff"},
                emitterLifetime: 2,
                frequency: 0.002,
                lifetime: { min: 0.81, max: 0.81 },
                maxParticles: 1000,
                maxSpeed: 0,
                noRotation: false,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 0 },
                scale: { start: .3, end: .3, minimumScaleMultiplier: 1 },
                spawnRect: { x: -600, y: -460, w: 900, h: 20 },
                spawnType: "rect",
                speed: { start: 800, end: 800, minimumSpeedMultiplier: 1 },
                startRotation: { min: 65, max: 65 }
            }
        }
    },
    "silence": {
        id: "silence",
        displayName: "Silence",
        description: "Removes the target's ability to cast spells for a number of turns",
        baseCastCount: 10,
        value: 3,
        type: SpellType.EffectOther,
        range: 15,
        useFunc: castSilence,
        effect: "particles",
        particles: {
            particleLocation: "target",
            particleImages: ["particle_cloud"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: true,
                alpha: { start: 0.74, end: 0.2 },
                blendMode: "normal",
                color: { start: "#00bd19", end: "#171414" },
                emitterLifetime: 1,
                frequency: 0.017,
                lifetime: { min: 0.2, max: 0.2 },
                maxParticles: 100,
                maxSpeed: 0,
                noRotation: false,
                pos: { x: 0, y: 0 },
                rotationSpeed: { min: 0, max: 0 },
                scale: { start: 0.8, end: 0.2, minimumScaleMultiplier: 1 },
                spawnCircle: { x: 8, y: 8, r: 20, minR: 20 },
                spawnType: "ring",
                speed: { start: -100, end: -100, minimumSpeedMultiplier: 1 },
                startRotation: { min: 0, max: 0 }
            }
        }
    },
    "exhale": {
        id: "exhale",
        displayName: "Exhale",
        description: "Send out a burst of air from your body in all directions, pushing away anything that's within range and stunning enemies for a short time. Pushed enemies which hit objects, walls, or other enemies take physical damage. Anything hit by the pushed object also takes physical damage.",
        baseCastCount: 2,
        value: 4,
        type: SpellType.AreaOfEffect,
        useFunc: castExhale,
        effect: "particles",
        particles: {
            particleLocation: "self",
            particleImages: ["particle_cloud"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: true,
                alpha: { start: 0.74, end: 0 },
                blendMode: "normal",
                color: { start: "#ffffff", end: "#eb8b58" },
                emitterLifetime: 0.2,
                frequency: 0.001,
                lifetime: { min: 0.4, max: 0.7 },
                maxParticles: 100,
                maxSpeed: 0,
                noRotation: false,
                pos: { x: 8, y: 8 },
                rotationSpeed: { min: 0, max: 200 },
                scale: { start: 1, end: 1.2, minimumScaleMultiplier: 1 },
                spawnType: "point",
                speed: { start: 200, end: 50, minimumSpeedMultiplier: 1 },
                startRotation: { min: 0, max: 360 }
            }
        }
    },
    "push": {
        id: "push",
        displayName: "Push",
        description: "Create a directed gust of wind to throw objects or enemies and stun them for a short time. Pushed enemies which hit objects, walls, or other enemies take physical damage. Anything hit by the pushed object also takes physical damage.",
        baseCastCount: 5,
        value: 8,
        type: SpellType.Push,
        range: 15,
        useFunc: castPush,
        effect: "particles",
        particles: {
            particleLocation: "target",
            particleImages: ["particle_cloud"],
            particleConfig: {
                acceleration: { x: 0, y: 0 },
                addAtBack: true,
                alpha: { start: 0.74, end: 0 },
                blendMode: "normal",
                color: { start: "#ffffff", end: "#eb8b58" },
                emitterLifetime: 0.2,
                frequency: 0.001,
                lifetime: { min: 0.4, max: 0.7 },
                maxParticles: 100,
                maxSpeed: 0,
                noRotation: false,
                pos: { x: 8, y: 8 },
                rotationSpeed: { min: 0, max: 200 },
                scale: { start: 1, end: 1.2, minimumScaleMultiplier: 1 },
                spawnType: "point",
                speed: { start: 200, end: 50, minimumSpeedMultiplier: 1 },
                startRotation: { min: 0, max: 360 }
            }
        }
    },
    "freeze": {
        id: "freeze",
        displayName: "Freeze",
        description: "Freezes the target solid so they can't move and they become weak to physical damage. Does not damage the target.",
        baseCastCount: 10,
        value: 4,
        type: SpellType.EffectOther,
        range: 9,
        useFunc: castFreeze,
        areaOfEffect: {
            type: "circle",
            radius: 3
        }
    },
    "fireball_trap": {
        id: "fireball_trap",
        displayName: "Fireball Rune",
        description: "Places a rune on the ground which creates an explosion when stepped on",
        baseCastCount: 1,
        value: 40,
        type: SpellType.DamageOther,
        range: 30,
        useFunc: castFireballRune
    }
};
