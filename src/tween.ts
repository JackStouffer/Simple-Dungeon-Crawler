export enum Transition {
    Linear,
    EaseIn
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
                    (this.timer - this.delay) / this.duration,
                    (this.timer - this.delay),
                    this.start,
                    this.end
                );
            } else if (this.transition === Transition.EaseIn) {
                this.obj[this.key] = this.easeIn(
                    (this.timer - this.delay) / this.duration,
                    (this.timer - this.delay),
                    this.start,
                    this.end,
                    this.duration
                );
            }
        }

        if (this.timer >= this.duration + this.delay) {
            this.finished = true;
        }
    }

    linear(percent: number, elapsed: number, start: number, end: number) {
        return start + (end - start) * percent;
    }

    easeIn(percent: number, elapsed: number, start: number, end: number, duration: number): number {
        return end * ( elapsed / duration ) * elapsed + start;
    }
}
