import { Query, System } from "ape-ecs";

import globals from "./globals";
import { DamageType } from "./constants";
import { displayMessage, MessageType } from "./ui";
import {
    DisplayNameComponent,
    FireTriggerComponent,
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
    TriggerTypeComponent,
    TypeComponent,
    WetableComponent
} from "./entity";
import { takeDamage } from "./fighter";
import { setOnFire } from "./skills";
import { DIRS } from "./rot";
import { getEntitiesAtLocation, Vector2D } from "./map";

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
                flammableData.turnsLeft--;

                if (flammableData.turnsLeft <= 0) {
                    flammableData.onFire = false;
                    flammableData.fireDamage = 0;

                    // If this is an entity which was given a fire trigger
                    // because it was on fire and non-blocking, then remove
                    // the trigger
                    if (entity.tags.has("blocks") === false &&
                        entity.has(TriggerTypeComponent)) {
                        entity.removeComponent(entity.getOne(TriggerTypeComponent)!);
                        entity.removeComponent(entity.getOne(FireTriggerComponent)!);
                    }


                    if (entity.id === globals.Game!.playerId) {
                        displayMessage("You are no longer on fire", MessageType.StatusEffect);
                    } else if (entity.tags.has("sentient")) {
                        const displayName = entity.getOne(DisplayNameComponent);
                        if (displayName !== undefined) {
                            displayMessage(`${displayName.name} is no longer on fire`, MessageType.StatusEffect);
                        }
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

                // TODO, cleanup: two messages are generated here, one for the fire
                // damage and one in the takeDamage function
                if (globals.Game === null) { continue; }
                if (entity.id === globals.Game.playerId) {
                    displayMessage(`You took ${flammableData.fireDamage} damage from being on fire`);
                } else if (entity.tags.has("sentient")) {
                    const displayName = entity.getOne(DisplayNameComponent);
                    if (displayName !== undefined) {
                        displayMessage(`${displayName.name} took ${flammableData.fireDamage} damage from being on fire`);
                    }
                }
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

                if (entity.id === globals.Game!.playerId) {
                    displayMessage("You are no longer wet", MessageType.StatusEffect);
                } else {
                    const displayName = entity.getOne(DisplayNameComponent);
                    if (displayName !== undefined) {
                        displayMessage(`${displayName.name} is no longer wet`, MessageType.StatusEffect);
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

                if (entity.id === globals.Game!.playerId) {
                    displayMessage("You are no longer silenced", MessageType.StatusEffect);
                } else {
                    const displayName = entity.getOne(DisplayNameComponent);
                    if (displayName !== undefined) {
                        displayMessage(`${displayName.name} is no longer silenced`, MessageType.StatusEffect);
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

                if (entity.id === globals.Game!.playerId) {
                    displayMessage("You are no longer stunned", MessageType.StatusEffect);
                } else {
                    const displayName = entity.getOne(DisplayNameComponent);
                    if (displayName !== undefined) {
                        displayMessage(`${displayName.name} is no longer stunned`, MessageType.StatusEffect);
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

                const triggerData = entity.getOne(TriggerTypeComponent);
                if (triggerData !== undefined &&
                    triggerData.currentTriggerType !== triggerData.initialTriggerType) {
                    triggerData.currentTriggerType = triggerData.initialTriggerType;
                    triggerData.update();
                }

                if (entity.id === globals.Game!.playerId) {
                    displayMessage("You are no longer frozen", MessageType.StatusEffect);
                } else {
                    const displayName = entity.getOne(DisplayNameComponent);
                    if (displayName !== undefined) {
                        displayMessage(`${displayName.name} is no longer frozen`, MessageType.StatusEffect);
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

                    const displayName = entity.getOne(DisplayNameComponent)!;
                    displayMessage(`${effect.name} has ended for ${displayName.name}`, MessageType.StatusEffect);
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

                    const displayName = entity.getOne(DisplayNameComponent)!;
                    displayMessage(`${effect.name} has ended for ${displayName.name}`, MessageType.StatusEffect);
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
                        const displayName = entity.getOne(DisplayNameComponent)!;
                        displayMessage(`${effect.name} has ended for ${displayName.name}`, MessageType.StatusEffect);
                    }
                } else {
                    effect.update();
                }
            }
        }
    }
}
