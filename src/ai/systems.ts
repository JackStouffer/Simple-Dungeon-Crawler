import { Entity, Query, System, World } from "ape-ecs";
import { VisibilityCallback } from "../rot/fov/fov";

import globals from "../globals";
import {
    ConfusableAIComponent,
    FearAIComponent,
    LevelComponent,
    LoseTargetAIComponent,
    PlannerAIComponent,
    PositionComponent,
    TypeComponent
} from "../entity";
import { showLogMessage } from "../ui";
import { createPassableSightCallback } from "./commands";
import { FOV } from "../rot";
import { PLAYER_ID } from "../constants";

/**
 * Lose known target position after a defined number of turns
 */
export class LoseTargetSystem extends System {
    query: Query;

    init() {
        this.query = this
            .createQuery()
            .fromAll(LoseTargetAIComponent, PlannerAIComponent)
            .persist();
    }

    update() {
        if (globals.Game?.processAI === true) {
            const entities = this.query.execute();
            for (const e of entities) {
                const loseTrackData = e.getOne(LoseTargetAIComponent)!;
                const aiState = e.getOne(PlannerAIComponent)!;
                if (!aiState.hasTargetInSight && aiState.knowsTargetPosition) {
                    ++loseTrackData.turnsWithTargetOutOfSight;

                    if (loseTrackData.turnsWithTargetOutOfSight > loseTrackData.loseTrackAfterNTurns
                    ) {
                        aiState.knowsTargetPosition = false;
                        loseTrackData.turnsWithTargetOutOfSight = 0;
                        aiState.update();

                        const typeData = e.getOne(TypeComponent);
                        if (typeData !== undefined) {
                            showLogMessage(`${typeData.displayName} lost track of you`);
                        }
                    }

                    loseTrackData.update();
                } else {
                    loseTrackData.turnsWithTargetOutOfSight = 0;
                    loseTrackData.update();
                }
            }
        }
    }
}


/**
 * Add fear to an entity when it sees an enemy
 */
function calcFearOnSight(ecs: World, ai: Entity): number {
    const aiState = ai.getOne(PlannerAIComponent)!;
    const levelData = ai.getOne(LevelComponent);

    const target = ecs.getEntity(aiState.targetId);
    if (target === undefined) {
        if (globals.Game?.debugAI === true) {
            // eslint-disable-next-line no-console
            console.log(`calcFearOnSight for ${aiState.entity.id} has a non-existent target ${aiState.targetId}`);
        }
        return 1;
    }
    const targetLevelData = target.getOne(LevelComponent);

    if (levelData === undefined || targetLevelData === undefined) {
        return 1;
    }

    return Math.max(targetLevelData.level - levelData.level, 0);
}

/**
 * Creates a function which checks if the Game player object
 * is visible or not and sets the AI hasTargetInSight bool to
 * true.
 */
function createVisibilityCallback(ecs: World, ai: Entity): VisibilityCallback {
    const aiState = ai.getOne(PlannerAIComponent)!;
    const fearState = ai.getOne(FearAIComponent)!;

    const target = ecs.getEntity(aiState.targetId);
    const targetPos = target?.getOne(PositionComponent)?.tilePosition;

    return function(x: number, y: number, r: number, visibility: number) {
        if (targetPos === undefined) { return; }
        if (x === targetPos.x && y === targetPos.y && visibility > 0) {
            if (fearState !== undefined && aiState.knowsTargetPosition === false) {
                fearState.fear += calcFearOnSight(ecs, ai);
                fearState.update();
            }

            aiState.knowsTargetPosition = true;
            aiState.hasTargetInSight = true;
            aiState.update();
        }
    };
}

/**
 * Update AIs to note if they see their target
 *
 * Also update every entity every turn so that the dialog queries will be correct.
 */
export class UpdateAISightData extends System {
    query: Query;

    init() {
        this.query = this
            .createQuery()
            .fromAll(PlannerAIComponent, PositionComponent)
            .persist();
    }

    update() {
        if (globals.Game?.processAI === true) {
            const entities = this.query.execute();
            for (const e of entities) {
                const aiState = e.getOne(PlannerAIComponent)!;
                const pos = e.getOne(PositionComponent)!.tilePosition;

                // compute the FOV to see if the player is sighted
                const fov = new FOV.PreciseShadowcasting(createPassableSightCallback(pos));
                fov.compute(
                    pos.x,
                    pos.y,
                    aiState.knowsTargetPosition ?
                        aiState.alertSightRange : aiState.nonAlertSightRange,
                    createVisibilityCallback(this.world, e)
                );
            }
        }
    }
}

export class UpdateEntityTeamsSystem extends System {
    update() {
        if (globals.Game?.processAI === true) {
            // TODO, cleanup: Iterator "each" function
            for (const team of globals.Game!.entityTeams.values()) {
                team.update();
            }
        }
    }
}

/**
 * Update all of the confused entities by reducing their remaining turn count
 */
export class ConfusableAISystem extends System {
    query: Query;

    init() {
        this.query = this
            .createQuery()
            .fromAll(ConfusableAIComponent)
            .persist();
    }

    update() {
        if (globals.Game?.processAI === true) {
            const entities = this.query.execute();
            for (const entity of entities) {
                const confusedState = entity.getOne(ConfusableAIComponent)!;

                --confusedState.turnsLeft;

                if (confusedState.turnsLeft === 0) {
                    confusedState.confused = false;

                    const typeData = entity.getOne(TypeComponent);
                    if (entity.id === PLAYER_ID) {
                        showLogMessage("You are no longer confused");
                    } else if (typeData !== undefined) {
                        showLogMessage(`${typeData.displayName} is no longer confused`);
                    }
                }

                confusedState.update();
            }
        }
    }
}
