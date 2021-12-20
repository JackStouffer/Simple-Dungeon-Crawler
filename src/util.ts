/**
 * Give a random integer inclusive between the given
 * min and max values.
 * @param {Number} min The min integer
 * @param {Number} max The max integer
 */
export function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomFromInterval(min: number, max: number){
    return Math.random() * (max - min + 1) + min;
}

export function clampAngleToDIR(angle: number): number {
    if (angle >= 0 && angle < 45) {
        return 6;
    } else if (angle >= 45 && angle < 90) {
        return 7;
    } else if (angle >= 90 && angle < 135) {
        return 0;
    } else if (angle >= 135 && angle < 180) {
        return 1;
    } else if (angle >= 180 && angle < 225) {
        return 2;
    } else if (angle >= 225 && angle < 270) {
        return 3;
    } else if (angle >= 270 && angle < 315) {
        return 4;
    } else if (angle >= 315 && angle < 360) {
        return 5;
    }

    throw new Error(`${angle} is not between 0 and 360`);
}

export function clampAngleToOppositeDIR(angle: number): number {
    if (angle >= 0 && angle < 45) {
        return 2;
    } else if (angle >= 45 && angle < 90) {
        return 3;
    } else if (angle >= 90 && angle < 135) {
        return 4;
    } else if (angle >= 135 && angle < 180) {
        return 5;
    } else if (angle >= 180 && angle < 225) {
        return 6;
    } else if (angle >= 225 && angle < 270) {
        return 7;
    } else if (angle >= 270 && angle < 315) {
        return 0;
    } else if (angle >= 315 && angle < 360) {
        return 1;
    }

    throw new Error(`${angle} is not between 0 and 360`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertUnreachable(_x: never): never {
    throw new Error("Should be unreachable");
}

export type Nullable<T> = T | null;
