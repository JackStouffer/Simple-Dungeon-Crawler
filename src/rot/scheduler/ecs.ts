import { Entity } from "ape-ecs";
import Scheduler from "./scheduler";
import { SpeedComponent } from "../../entity";

/**
 * Speed-based scheduler
 */
export default class EntityScheduler extends Scheduler<Entity> {
    add(item: Entity, repeat: boolean) {
        const speedData = item.getOne(SpeedComponent);
        const speed = speedData?.speed ?? 1;

        this._queue.add(item, 1 / speed);
        return super.add(item, repeat);
    }

    next() {
        if (this._current !== null && this._repeat.indexOf(this._current) !== -1) {
            this._queue.add(this._current, 1/this._current.getSpeed());
        }
        return super.next();
    }
}
