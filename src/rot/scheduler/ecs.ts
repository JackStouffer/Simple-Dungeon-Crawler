import { Entity } from "ape-ecs";
import Scheduler from "./scheduler";
import { BASE_SPEED } from "../../constants";
import { getEffectiveSpeedData } from "../../fighter";

/**
 * Speed-based scheduler
 */
export default class EntityScheduler extends Scheduler<Entity> {
    _current: Entity;

    add(item: Entity, repeat: boolean) {
        const speedData = getEffectiveSpeedData(item);
        const speed = speedData?.speed ?? BASE_SPEED;

        this._queue.add(item, 1 / speed);
        return super.add(item, repeat);
    }

    next() {
        if (this._current !== null && this._repeat.indexOf(this._current) !== -1) {
            const speedData = getEffectiveSpeedData(this._current);
            const speed = speedData?.speed ?? BASE_SPEED;
            this._queue.add(this._current, 1 / speed);
        }
        return super.next();
    }
}
