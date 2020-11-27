import { Query, System } from "ape-ecs";

import globals from "./globals";
import { DamageType } from "./constants";
import { displayMessage } from "./ui";
import {
    DisplayNameComponent,
    FlammableComponent,
    HitPointsComponent
} from "./entity";
import { takeDamage } from "./fighter";

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
                takeDamage(entity, flammableData.fireDamage, false, DamageType.Fire);
                flammableData.turnsLeft--;

                if (flammableData.turnsLeft === 0) {
                    flammableData.onFire = false;
                    flammableData.fireDamage = 0;
                }

                flammableData.update();

                // TODO two messages are generated here, one for the fire
                // damage and one in the takeDamage function
                if (globals.Game === null) { continue; }
                if (entity === globals.Game.player) {
                    displayMessage(`You took ${flammableData.fireDamage} damage from being on fire`);
                } else {
                    const displayName = entity.getOne(DisplayNameComponent);
                    if (displayName === undefined) { continue; }
                    displayMessage(`${displayName.name} took ${flammableData.fireDamage} damage from being on fire`);
                }
            }
        }
    }
}
