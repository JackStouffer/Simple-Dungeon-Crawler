import globals from "./globals";
import { Vector2D } from "./map";
import { Nullable } from "./util";

interface KeyState {
    code: string;
    character: Nullable<string>;
    down: boolean;
    heldDown: boolean;
}

const keyStates: { [key: string]: KeyState } = {
    "KeyA": { code: "KeyA", character: null, down: false, heldDown: false },
    "KeyB": { code: "KeyB", character: null, down: false, heldDown: false },
    "KeyC": { code: "KeyC", character: null, down: false, heldDown: false },
    "KeyD": { code: "KeyD", character: null, down: false, heldDown: false },
    "KeyE": { code: "KeyE", character: null, down: false, heldDown: false },
    "KeyF": { code: "KeyF", character: null, down: false, heldDown: false },
    "KeyG": { code: "KeyG", character: null, down: false, heldDown: false },
    "KeyH": { code: "KeyH", character: null, down: false, heldDown: false },
    "KeyI": { code: "KeyI", character: null, down: false, heldDown: false },
    "KeyJ": { code: "KeyJ", character: null, down: false, heldDown: false },
    "KeyK": { code: "KeyK", character: null, down: false, heldDown: false },
    "KeyL": { code: "KeyL", character: null, down: false, heldDown: false },
    "KeyM": { code: "KeyM", character: null, down: false, heldDown: false },
    "KeyN": { code: "KeyN", character: null, down: false, heldDown: false },
    "KeyO": { code: "KeyO", character: null, down: false, heldDown: false },
    "KeyP": { code: "KeyP", character: null, down: false, heldDown: false },
    "KeyQ": { code: "KeyQ", character: null, down: false, heldDown: false },
    "KeyR": { code: "KeyR", character: null, down: false, heldDown: false },
    "KeyS": { code: "KeyS", character: null, down: false, heldDown: false },
    "KeyT": { code: "KeyT", character: null, down: false, heldDown: false },
    "KeyU": { code: "KeyU", character: null, down: false, heldDown: false },
    "KeyV": { code: "KeyV", character: null, down: false, heldDown: false },
    "KeyW": { code: "KeyW", character: null, down: false, heldDown: false },
    "KeyX": { code: "KeyX", character: null, down: false, heldDown: false },
    "KeyY": { code: "KeyY", character: null, down: false, heldDown: false },
    "KeyZ": { code: "KeyZ", character: null, down: false, heldDown: false },
    "Digit0": { code: "Digit0", character: null, down: false, heldDown: false },
    "Digit1": { code: "Digit1", character: null, down: false, heldDown: false },
    "Digit2": { code: "Digit2", character: null, down: false, heldDown: false },
    "Digit3": { code: "Digit3", character: null, down: false, heldDown: false },
    "Digit4": { code: "Digit4", character: null, down: false, heldDown: false },
    "Digit5": { code: "Digit5", character: null, down: false, heldDown: false },
    "Digit6": { code: "Digit6", character: null, down: false, heldDown: false },
    "Digit7": { code: "Digit7", character: null, down: false, heldDown: false },
    "Digit8": { code: "Digit8", character: null, down: false, heldDown: false },
    "Digit9": { code: "Digit9", character: null, down: false, heldDown: false },
    "Minus": { code: "Minus", character: null, down: false, heldDown: false },
    "Equal": { code: "Equal", character: null, down: false, heldDown: false },
    "ArrowLeft": { code: "ArrowLeft", character: null, down: false, heldDown: false },
    "ArrowRight": { code: "ArrowRight", character: null, down: false, heldDown: false },
    "ArrowDown": { code: "ArrowDown", character: null, down: false, heldDown: false },
    "ArrowUp": { code: "ArrowUp", character: null, down: false, heldDown: false },
    "BracketRight": { code: "BracketRight", character: null, down: false, heldDown: false },
    "BracketLeft": { code: "BracketLeft", character: null, down: false, heldDown: false },
    "IntlBackslash": { code: "IntlBackslash", character: null, down: false, heldDown: false },
    "Backslash": { code: "Backslash", character: null, down: false, heldDown: false },
    "Slash": { code: "Slash", character: null, down: false, heldDown: false },
    "Enter": { code: "Enter", character: null, down: false, heldDown: false },
    "Quote": { code: "Quote", character: null, down: false, heldDown: false },
    "Semicolon": { code: "Semicolon", character: null, down: false, heldDown: false },
    "Comma": { code: "Comma", character: null, down: false, heldDown: false },
    "Period": { code: "Period", character: null, down: false, heldDown: false },
    "Tab": { code: "Tab", character: null, down: false, heldDown: false },
    "Space": { code: "Space", character: null, down: false, heldDown: false },
    "Backquote": { code: "Backquote", character: null, down: false, heldDown: false },
    "Backspace": { code: "Backspace", character: null, down: false, heldDown: false },
    "Escape": { code: "Escape", character: null, down: false, heldDown: false },
    "ShiftLeft": { code: "ShiftLeft", character: null, down: false, heldDown: false },
    "CapsLock": { code: "CapsLock", character: null, down: false, heldDown: false },
    "AltLeft": { code: "AltLeft", character: null, down: false, heldDown: false },
    "ControlLeft": { code: "ControlLeft", character: null, down: false, heldDown: false },
    "ShiftRight": { code: "ShiftRight", character: null, down: false, heldDown: false },
    "AltRight": { code: "AltRight", character: null, down: false, heldDown: false },
    "ControlRight": { code: "ControlRight", character: null, down: false, heldDown: false },
    "NumpadDecimal": { code: "NumpadDecimal", character: null, down: false, heldDown: false },
    "NumpadMultiply": { code: "NumpadMultiply", character: null, down: false, heldDown: false },
    "NumpadAdd": { code: "NumpadAdd", character: null, down: false, heldDown: false },
    "NumLock": { code: "NumLock", character: null, down: false, heldDown: false },
    "NumpadDivide": { code: "NumpadDivide", character: null, down: false, heldDown: false },
    "NumpadEnter": { code: "NumpadEnter", character: null, down: false, heldDown: false },
    "NumpadSubtract": { code: "NumpadSubtract", character: null, down: false, heldDown: false },
    "NumpadEqual": { code: "NumpadEqual", character: null, down: false, heldDown: false },
    "NumpadComma": { code: "NumpadComma", character: null, down: false, heldDown: false },
    "Numpad0": { code: "Numpad0", character: null, down: false, heldDown: false },
    "Numpad1": { code: "Numpad1", character: null, down: false, heldDown: false },
    "Numpad2": { code: "Numpad2", character: null, down: false, heldDown: false },
    "Numpad3": { code: "Numpad3", character: null, down: false, heldDown: false },
    "Numpad4": { code: "Numpad4", character: null, down: false, heldDown: false },
    "Numpad5": { code: "Numpad5", character: null, down: false, heldDown: false },
    "Numpad6": { code: "Numpad6", character: null, down: false, heldDown: false },
    "Numpad7": { code: "Numpad7", character: null, down: false, heldDown: false },
    "Numpad8": { code: "Numpad8", character: null, down: false, heldDown: false },
    "Numpad9": { code: "Numpad9", character: null, down: false, heldDown: false },
    "F1": { code: "F1", character: null, down: false, heldDown: false },
    "F2": { code: "F2", character: null, down: false, heldDown: false },
    "F3": { code: "F3", character: null, down: false, heldDown: false },
    "F4": { code: "F4", character: null, down: false, heldDown: false },
    "F5": { code: "F5", character: null, down: false, heldDown: false },
    "F6": { code: "F6", character: null, down: false, heldDown: false },
    "F7": { code: "F7", character: null, down: false, heldDown: false },
    "F8": { code: "F8", character: null, down: false, heldDown: false },
    "F9": { code: "F9", character: null, down: false, heldDown: false },
    "F10": { code: "F10", character: null, down: false, heldDown: false },
    "F11": { code: "F11", character: null, down: false, heldDown: false },
    "F12": { code: "F12", character: null, down: false, heldDown: false },
    "F13": { code: "F13", character: null, down: false, heldDown: false },
    "F14": { code: "F14", character: null, down: false, heldDown: false },
    "F15": { code: "F15", character: null, down: false, heldDown: false },
    "F16": { code: "F16", character: null, down: false, heldDown: false },
    "F17": { code: "F17", character: null, down: false, heldDown: false },
    "F18": { code: "F18", character: null, down: false, heldDown: false },
    "F19": { code: "F19", character: null, down: false, heldDown: false },
    "F20": { code: "F20", character: null, down: false, heldDown: false },
    "Home": { code: "Home", character: null, down: false, heldDown: false },
    "PageUp": { code: "PageUp", character: null, down: false, heldDown: false },
    "Delete": { code: "Delete", character: null, down: false, heldDown: false },
    "End": { code: "End", character: null, down: false, heldDown: false },
    "PageDown": { code: "PageDown", character: null, down: false, heldDown: false }
};
let mouseDownEvent: Nullable<MouseEvent> = null;
let mouseMoveEvent: Nullable<MouseEvent> = null;

function init(): void {
    if (globals.window === null ||
        globals.window === undefined ||
        globals.Game === null ||
        globals.Game === undefined ||
        globals.Game.canvas === null
    ) { throw new Error("Cannot init input without the globals initialized"); }

    globals.window.addEventListener("keydown", function (e: KeyboardEvent) {
        e.stopPropagation();
        e.preventDefault();

        if (!(e.code in keyStates)) { return; }

        keyStates[e.code].character = e.key;
        keyStates[e.code].down = true;
        keyStates[e.code].heldDown = false;
    });

    globals.window.addEventListener("keyup", function (e: KeyboardEvent) {
        e.stopPropagation();
        e.preventDefault();

        if (!(e.code in keyStates)) { return; }

        keyStates[e.code].character = null;
        keyStates[e.code].down = false;
        keyStates[e.code].heldDown = false;
    });

    globals.Game.canvas.addEventListener("mousedown", function (e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        mouseDownEvent = e;
    });

    globals.Game.canvas.addEventListener("mousemove", function (e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        mouseMoveEvent = e;
    });
}

/**
 * Check if a key is held down
 */
function isDown(key: string): boolean {
    if (!(key in keyStates)) { return false; }
    return keyStates[key].down;
}

/**
 * Check if a key was pressed, single keystroke no repetes or holds
 */
function wasPressed(key: string): boolean {
    if (!(key in keyStates)) { return false; }
    return keyStates[key].down && !keyStates[key].heldDown;
}

function getPressedKeys(): KeyState[] {
    const ret = [];
    for (const key in keyStates) {
        if (Object.prototype.hasOwnProperty.call(keyStates, key) === true) {
            if (keyStates[key].down && !keyStates[key].heldDown) {
                ret.push(keyStates[key]);
            }
        }
    }
    return ret;
}

/**
 * Give the tile position of the mouse click if there is
 * one, null otherwise.
 * @returns {Vector2D} the position in the game world
 */
function getLeftMouseDown(): Nullable<Vector2D> {
    if (globals.Game === null ||
        globals.Game === undefined ||
        mouseDownEvent === null
    ) {
        return null;
    }

    const rect = (mouseDownEvent.target! as HTMLElement).getBoundingClientRect();
    const x = mouseDownEvent.clientX - rect.left;
    const y = mouseDownEvent.clientY - rect.top;

    if (x < 0 || y < 0) {
        return null;
    }

    const tilePos = globals.Game.gameCamera.mouseToTilePosition(x, y);
    if (tilePos.y >= globals.Game.map.height || tilePos.x >= globals.Game.map.width) {
        return null;
    }

    return tilePos;
}

/**
 * Give the screen position of the mouse click if there is
 * one, null otherwise.
 * @returns {Vector2D} the position on the screen
 */
function getLeftMouseDownScreen(): Nullable<Vector2D> {
    if (globals.Game === null ||
        globals.Game === undefined ||
        mouseDownEvent === null
    ) {
        return null;
    }

    const rect = (mouseDownEvent.target! as HTMLElement).getBoundingClientRect();
    const x = mouseDownEvent.clientX - rect.left;
    const y = mouseDownEvent.clientY - rect.top;

    if (x < 0 || y < 0) {
        return null;
    }

    return new Vector2D(x, y);
}

/**
 * Give the tile position of the mouse cursor's position if there is
 * one, null otherwise.
 * @returns {Vector2D} the position in the game world
 */
function getMousePosition(): Nullable<Vector2D> {
    if (globals.Game === null ||
        globals.Game === undefined ||
        mouseMoveEvent === null
    ) {
        return null;
    }

    const rect = (mouseMoveEvent.target! as HTMLElement).getBoundingClientRect();
    const x = mouseMoveEvent.clientX - rect.left;
    const y = mouseMoveEvent.clientY - rect.top;

    if (x < 0 || y < 0) {
        return null;
    }
    const tilePos = globals.Game.gameCamera.mouseToTilePosition(x, y);
    if (tilePos.y >= globals.Game.map.height || tilePos.x >= globals.Game.map.width) {
        return null;
    }

    return tilePos;
}

/**
 * Give the screen position of the mouse cursor's position if it's within the canvas.
 * Null otherwise.
 * @returns {Vector2D} the position in the game world
 */
function getMouseScreenPosition(): Nullable<Vector2D> {
    if (globals.Game === null ||
        globals.Game === undefined ||
        mouseMoveEvent === null
    ) {
        return null;
    }

    const rect = (mouseMoveEvent.target! as HTMLElement).getBoundingClientRect();
    const x = mouseMoveEvent.clientX - rect.left;
    const y = mouseMoveEvent.clientY - rect.top;

    if (x < 0 || y < 0) {
        return null;
    }

    return new Vector2D(x, y);
}

/**
 * Clear the currently pressed keys and the mouse click info.
 * Should be called after every frame.
 */
function updateInputs(): void {
    mouseDownEvent = null;

    for (const key in keyStates) {
        if (Object.prototype.hasOwnProperty.call(keyStates, key) === true) {
            const state = keyStates[key];
            if (state.down && state.heldDown === false) {
                state.heldDown = true;
            }
        }
    }
}

export default {
    init,
    isDown,
    wasPressed,
    getPressedKeys,
    getLeftMouseDown,
    getLeftMouseDownScreen,
    getMousePosition,
    getMouseScreenPosition,
    updateInputs
};
