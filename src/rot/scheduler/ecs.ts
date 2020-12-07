import Scheduler from "./scheduler";
import { BASE_SPEED } from "../../constants";
import { getEffectiveSpeedData } from "../../fighter";
import globals from "../../globals";

/**
 * Speed-based scheduler
 */
export default class EntityScheduler extends Scheduler<string> {
    _current: string;

    add(item: string, repeat: boolean) {
        const e = globals.Game!.ecs.getEntity(item);
        if (e === undefined) { throw new Error(`Unknown entity ${item} in scheduler`); }
        const speedData = getEffectiveSpeedData(e);
        const speed = speedData?.speed ?? BASE_SPEED;

        this._queue.add(item, 1 / speed);
        return super.add(item, repeat);
    }

    next(): string | null {
        if (this._current !== null && this._repeat.indexOf(this._current) !== -1) {
            const e = globals.Game!.ecs.getEntity(this._current);
            if (e === undefined) { throw new Error(`Unknown entity ${this._current} in scheduler`); }
            const speedData = getEffectiveSpeedData(e);
            const speed = speedData?.speed ?? BASE_SPEED;
            this._queue.add(this._current, 1 / speed);
        }
        return super.next();
    }
}
