/**
 * Give a random integer inclusive between the given
 * min and max values.
 * @param {Number} min The min integer
 * @param {Number} max The max integer
 */
export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Gives a promise that resolves on the next keypress
 * event. Returns the event object.
 * @returns {Promise} A promise on the keypress
 */
export async function readKey() {
    return new Promise(resolve => {
        window.addEventListener("keypress", resolve, { once: true });
    });
}
