/**
 * Give a random integer inclusive between the given
 * min and max values.
 * @param {Number} min The min integer
 * @param {Number} max The max integer
 */
export function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertUnreachable(_x: never): never {
    throw new Error("Should be unreachable");
}
