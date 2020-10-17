import globals from "./globals";

/**
 * Give a random integer inclusive between the given
 * min and max values.
 * @param {Number} min The min integer
 * @param {Number} max The max integer
 */
export function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Gives a promise that resolves on the next keypress
 * event. Returns the event object.
 * @returns {Promise} A promise on the keypress
 */
export async function readKey(): Promise<KeyboardEvent> {
    return new Promise(resolve => {
        globals.window.addEventListener("keydown", resolve, { once: true });
    });
}

/**
 * Gives a promise that resolves on the next mousedown
 * event. Returns the event object.
 * @returns {Promise} A promise on the keypress
 */
export async function readMouse(): Promise<MouseEvent> {
    return new Promise(resolve => {
        globals.Game.canvas.addEventListener("mousedown", resolve, { once: true });
    });
}
