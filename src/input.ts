import globals from "./globals";

const pressed = new Set();

function init() {
    globals.window.addEventListener("keydown", function (e: KeyboardEvent) {
        e.preventDefault();
        pressed.add(e.key);
    });
}

function isDown(key: string) {
    return pressed.has(key);
}

function clearInputs() {
    pressed.clear();
}

export default { init, isDown, clearInputs };
