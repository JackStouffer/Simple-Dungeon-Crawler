export enum Transition {
    Linear,
    EaseInSine,
    EaseOutSine,
    EaseBezier
}

export interface TweenConfig {
    object: any,
    key: string,
    duration: number,
    delay: number;
    start: number,
    end: number,
    transition: Transition
}

export class Tween {
    hasStarted: boolean = false;
    finished: boolean = false;
    private timer: number = 0;
    private readonly obj: any;
    private readonly key: string;
    private readonly duration: number;
    private readonly delay: number;
    private readonly start: number;
    private readonly end: number;
    private readonly transition: number;

    constructor(config: TweenConfig) {
        this.obj = config.object;
        this.key = config.key;
        this.duration = config.duration;
        this.delay = config.delay;
        this.start = config.start;
        this.end = config.end;
        this.transition = config.transition;
        this.timer = 0;
    }

    update(delta: number) {
        if (this.hasStarted === false) {
            this.hasStarted = true;
        }

        if (this.finished === true) {
            return;
        }

        this.timer += delta;
        if (this.timer >= this.delay) {
            if (this.transition === Transition.Linear) {
                this.obj[this.key] = this.linear(
                    Math.min(1, (this.timer - this.delay) / this.duration),
                    this.start,
                    this.end
                );
            } else if (this.transition === Transition.EaseInSine) {
                this.obj[this.key] = this.easeInSine(
                    Math.min(1, (this.timer - this.delay) / this.duration),
                    this.start,
                    this.end
                );
            } else if (this.transition === Transition.EaseOutSine) {
                this.obj[this.key] = this.easeOutSine(
                    Math.min(1, (this.timer - this.delay) / this.duration),
                    this.start,
                    this.end
                );
            } else if (this.transition === Transition.EaseBezier) {
                this.obj[this.key] = this.easeBezier(
                    Math.min(1, (this.timer - this.delay) / this.duration),
                    this.start,
                    this.end
                );
            }
        }

        if (this.timer >= this.duration + this.delay) {
            this.finished = true;
        }
    }

    linear(percent: number, start: number, end: number) {
        return start + (end - start) * percent;
    }

    easeInSine(percent: number, start: number, end: number): number {
        const pos = 1 - Math.cos((percent * Math.PI) / 2);
        return start + ((end - start) * pos);
    }

    easeOutSine(percent: number, start: number, end: number): number {
        const pos = Math.sin((percent * Math.PI) / 2);
        return start + ((end - start) * pos);
    }

    easeBezier(percent: number, start: number, end: number): number {
        const pos = percent * percent * (3 - 2 * percent);
        return start + ((end - start) * pos);
    }
}
