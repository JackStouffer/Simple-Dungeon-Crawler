import { Query, System } from "ape-ecs";

import globals from "./globals";
import { AreaOfEffectType, DamageType, PLAYER_ID } from "./constants";
import { showLogMessage } from "./ui";
import {
    FlammableComponent,
    FreezableComponent,
    GraphicsComponent,
    HitPointsComponent,
    HitPointsEffectComponent,
    ObjectData,
    StunnableComponent,
    PositionComponent,
    SilenceableComponent,
    SpeedEffectComponent,
    StatsEffectComponent,
    TriggerComponent,
    TypeComponent,
    WetableComponent,
    AreaOfEffectComponent,
    OilCoveredComponent
} from "./entity";
import { takeDamage } from "./fighter";
import { setOnFire, SpellData } from "./skills";
import { DIRS } from "./rot";
import { getEntitiesAtLocation, Vector2D } from "./map";
import { UseSkillCommand } from "./commands";
import { cloneDeep } from "lodash";

/**
 * Gives damage to those entities with a flammable comp that is
 * set to on fire, which also have a hit points comp. Sets the
 * flammable comp to not on fire when the fire has gone out.
 */
export class OnFireSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this
            .createQuery()
            .fromAll(HitPointsComponent, FlammableComponent)
            .persist();
    }

    update() {
        const entities = this.mainQuery.execute();
        for (const entity of entities) {
            const flammableData = entity.getOne(FlammableComponent)!;
            if (flammableData.onFire === true) {
                takeDamage(
                    this.world,
                    globals.Game!.entityMap,
                    entity,
                    flammableData.fireDamage,
                    false,
                    DamageType.Fire
                );
                --flammableData.turnsLeft;

                if (flammableData.turnsLeft <= 0) {
                    flammableData.onFire = false;
                    flammableData.fireDamage = 0;

                    // If this is an entity which was given a fire trigger
                    // because it was on fire and non-blocking, then remove
                    // the trigger
                    if (entity.tags.has("blocks") === false &&
                        entity.has(TriggerComponent)) {
                        entity.removeComponent(entity.getOne(TriggerComponent)!);
                    }
                } else {
                    // Simulate Fire Spreading
                    // Check neighboring tiles for flammable entities
                    // If there is one, roll to see if the entity will
                    // be set to on fire
                    const pos = entity.getOne(PositionComponent);
                    if (pos !== undefined) {
                        for (let i = 0; i < DIRS[8].length; i++) {
                            const dir = DIRS[8][i];
                            const entities = getEntitiesAtLocation(
                                this.world,
                                globals.Game!.entityMap,
                                new Vector2D(
                                    pos.tilePosition.x + dir[0],
                                    pos.tilePosition.y + dir[1]
                                )
                            );

                            if (Math.random() >= .65) {
                                for (const e of entities) {
                                    // TODO: Find some way to defer the setting on fire until
                                    // the next turn
                                    setOnFire(e);
                                }
                            }
                        }
                    }
                }

                flammableData.update();
            }
        }
    }
}

export class WetSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this
            .createQuery()
            .fromAll(WetableComponent)
            .persist();
    }

    update() {
        const entities = this.mainQuery.execute();
        for (const entity of entities) {
            const effect = entity.getOne(WetableComponent)!;
            if (effect.wet && effect.turnsLeft > 0) {
                effect.turnsLeft--;
                effect.update();
            } else if (effect.wet && effect.turnsLeft <= 0) {
                effect.wet = false;
                effect.update();

                if (entity.id === PLAYER_ID) {
                    showLogMessage("You are no longer wet");
                } else {
                    const typeInfo = entity.getOne(TypeComponent);
                    if (typeInfo !== undefined) {
                        showLogMessage(`${typeInfo.displayName} is no longer wet`);
                    }
                }
            }
        }
    }
}

export class SilenceSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this
            .createQuery()
            .fromAll(SilenceableComponent)
            .persist();
    }

    update() {
        const entities = this.mainQuery.execute();
        for (const entity of entities) {
            const effect = entity.getOne(SilenceableComponent)!;
            if (effect.silenced && effect.turnsLeft > 0) {
                effect.turnsLeft--;
                effect.update();
            } else if (effect.silenced && effect.turnsLeft <= 0) {
                effect.silenced = false;
                effect.update();

                if (entity.id === PLAYER_ID) {
                    showLogMessage("You are no longer silenced");
                } else {
                    const typeInfo = entity.getOne(TypeComponent);
                    if (typeInfo !== undefined) {
                        showLogMessage(`${typeInfo.displayName} is no longer silenced`);
                    }
                }
            }
        }
    }
}

export class StunSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this
            .createQuery()
            .fromAll(StunnableComponent)
            .persist();
    }

    update() {
        const entities = this.mainQuery.execute();
        for (const entity of entities) {
            const effect = entity.getOne(StunnableComponent)!;
            if (effect.stunned && effect.turnsLeft > 0) {
                effect.turnsLeft--;
                effect.update();
            } else if (effect.stunned && effect.turnsLeft <= 0) {
                effect.stunned = false;
                effect.update();

                if (entity.id === PLAYER_ID) {
                    showLogMessage("You are no longer stunned");
                } else {
                    const typeInfo = entity.getOne(TypeComponent);
                    if (typeInfo !== undefined) {
                        showLogMessage(`${typeInfo.displayName} is no longer stunned`);
                    }
                }
            }
        }
    }
}

export class FrozenSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this
            .createQuery()
            .fromAll(FreezableComponent)
            .persist();
    }

    update() {
        const entities = this.mainQuery.execute();
        for (const entity of entities) {
            const effect = entity.getOne(FreezableComponent)!;
            if (effect.frozen && effect.turnsLeft > 0) {
                effect.turnsLeft--;
                effect.update();
            } else if (effect.frozen && effect.turnsLeft <= 0) {
                effect.frozen = false;
                effect.update();

                const typeInfo = entity.getOne(TypeComponent);
                const graphics = entity.getOne(GraphicsComponent);
                if (typeInfo !== undefined && graphics !== undefined && graphics.sprite !== null) {
                    graphics.sprite.texture = globals.Game!.textureAtlas[
                        ObjectData[typeInfo.entityType]
                            .staticallyKnownComponents.c!.GraphicsComponent.textureKey
                    ];
                    graphics.update();
                }

                const triggerData = entity.getOne(TriggerComponent);
                if (triggerData !== undefined &&
                    triggerData.currentTriggerType !== triggerData.initialTriggerType) {
                    triggerData.currentTriggerType = triggerData.initialTriggerType;
                    triggerData.update();
                }

                if (entity.id === PLAYER_ID) {
                    // TODO, sound: ice cracking sound
                    showLogMessage("You are no longer frozen");
                } else {
                    const typeInfo = entity.getOne(TypeComponent);
                    if (typeInfo !== undefined) {
                        // TODO, sound: ice cracking sound
                        showLogMessage(`${typeInfo.displayName} is no longer frozen`);
                    }
                }
            }
        }
    }
}

export class OilCoveredSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this
            .createQuery()
            .fromAll(OilCoveredComponent)
            .persist();
    }

    update() {
        const entities = this.mainQuery.execute();
        for (const entity of entities) {
            const effect = entity.getOne(OilCoveredComponent)!;
            if (effect.oilCovered && effect.turnsLeft > 0) {
                effect.turnsLeft--;
                effect.update();
            } else if (effect.oilCovered && effect.turnsLeft <= 0) {
                effect.oilCovered = false;
                effect.update();

                if (entity.id === PLAYER_ID) {
                    showLogMessage("You are no longer covered in oil");
                } else {
                    const typeInfo = entity.getOne(TypeComponent);
                    if (typeInfo !== undefined) {
                        showLogMessage(`${typeInfo.displayName} is no longer covered in oil`);
                    }
                }
            }
        }
    }
}

/**
 * System to reduce the turn count of all effects on entities. If the
 * turn count reaches zero, then destroy the effect.
 */
export class UpdateHitPointsEffectsSystem extends System {
    private hitPointsEffectQuery: Query;

    init() {
        this.hitPointsEffectQuery = this.createQuery()
            .fromAll(HitPointsEffectComponent)
            .persist();
    }

    update() {
        const hpEffects = this.hitPointsEffectQuery.execute();

        for (const entity of hpEffects) {
            const effects = entity.getComponents(HitPointsEffectComponent);
            for (const effect of effects) {
                effect.turnsLeft -= 1;
                if (effect.turnsLeft === 0) {
                    entity.removeComponent(effect);
                    effect.destroy();

                    const typeInfo = entity.getOne(TypeComponent)!;
                    showLogMessage(`${effect.name} has ended for ${typeInfo.displayName}`);
                } else {
                    effect.update();
                }
            }
        }
    }
}

/**
 * System to reduce the turn count of all effects on entities. If the
 * turn count reaches zero, then destroy the effect.
 */
export class UpdateStatsEffectsSystem extends System {
    private statsEffectQuery: Query;

    init() {
        this.statsEffectQuery = this.createQuery()
            .fromAll(StatsEffectComponent)
            .persist();
    }

    update() {
        const statsEffects = this.statsEffectQuery.execute();
        for (const entity of statsEffects) {
            const effects = entity.getComponents(StatsEffectComponent);
            for (const effect of effects) {
                effect.turnsLeft -= 1;
                if (effect.turnsLeft === 0) {
                    entity.removeComponent(effect);
                    effect.destroy();

                    const typeInfo = entity.getOne(TypeComponent)!;
                    showLogMessage(`${effect.name} has ended for ${typeInfo.displayName}`);
                } else {
                    effect.update();
                }
            }
        }
    }
}

/**
 * System to reduce the turn count of all effects on entities. If the
 * turn count reaches zero, then destroy the effect.
 */
export class UpdateSpeedEffectsSystem extends System {
    private speedEffectQuery: Query;

    init() {
        this.speedEffectQuery = this.createQuery()
            .fromAll(SpeedEffectComponent)
            .persist();
    }

    update() {
        const speedEffects = this.speedEffectQuery.execute();
        for (const entity of speedEffects) {
            const effects = entity.getComponents(SpeedEffectComponent);
            for (const effect of effects) {
                effect.turnsLeft--;
                if (effect.turnsLeft === 0) {
                    entity.removeComponent(effect);
                    effect.destroy();

                    if (effect.display) {
                        const typeInfo = entity.getOne(TypeComponent)!;
                        showLogMessage(`${effect.name} has ended for ${typeInfo.displayName}`);
                    }
                } else {
                    effect.update();
                }
            }
        }
    }
}

/**
 * Apply the area of effect to an area around the entity once
 * per turn cycle.
 */
export class AreaOfEffectSystem extends System {
    private mainQuery: Query;

    init() {
        this.mainQuery = this
            .createQuery()
            .fromAll(AreaOfEffectComponent, PositionComponent)
            .persist();
    }

    update() {
        const entities = this.mainQuery.execute();
        for (const entity of entities) {
            const aoeData = entity.getOne(AreaOfEffectComponent)!;
            const position = entity.getOne(PositionComponent)!;

            const spellIDMapping = {
                [AreaOfEffectType.Electric]: "lightning_aoe"
            };
            const data = cloneDeep(SpellData[spellIDMapping[aoeData.effectType]]);
            data.value = aoeData.damage;
            data.damageType = aoeData.damageType;

            globals.Game!.commandQueue.push(new UseSkillCommand(
                entity.id,
                data,
                position.tilePosition,
                0,
                undefined,
                false
            ));
        }
    }
}
