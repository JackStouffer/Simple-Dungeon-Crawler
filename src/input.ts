import { get } from "lodash";
import globals from "./globals";
import { Point } from "./map";
import { Nullable } from "./util";

const pressed: Set<string> = new Set();
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
        e.preventDefault();
        pressed.add(e.key);
    });

    globals.window.addEventListener("mousedown", function (e: MouseEvent) {
        e.preventDefault();
        mouseDownEvent = e;
    });

    globals.Game.canvas.addEventListener("mousemove", function (e: MouseEvent) {
        e.preventDefault();
        mouseMoveEvent = e;
    });
}

/**
 * Test function to mark a key as pressed
 * @param {string} key The key to set to pressed
 * @returns {void}
 */
function pressKey(key: string): void {
    pressed.add(key);
}

/**
 * Test function mark the mouse as pressed. Does not
 * set the mouse position; overload the eventToPosition
 * function to do that.
 */
function pressMouse(): void {
    mouseDownEvent = new MouseEvent("mousedown");
}

/**
 * Check if a key is down.
 * @param key The key to check
 * @returns {boolean}
 */
function isDown(key: string): boolean {
    return pressed.has(key);
}

/**
 * Of all the keys pressed, get the first one. Relies
 * on JS Sets preserving insertion order.
 * @returns {string} the name of the key
 */
function getFirstKeyPressed(): Nullable<string> {
    return get([...pressed.values()], "[0]", null);
}

/**
 * Give the world position of the mouse click if there is
 * one, null otherwise.
 * @returns {Point} the position in the game world
 */
function getLeftMouseDown(): Nullable<Point> {
    if (globals.Game === null ||
        globals.Game === undefined ||
        globals.Game.display === null ||
        mouseDownEvent === null
    ) { return null; }

    const pos = globals.Game.display.eventToPosition(mouseDownEvent);
    return globals.Game.gameCamera.screenToWorld(pos[0], pos[1]);
}

/**
 * Give the world position of the mouse cursor's position if there is
 * one, null otherwise.
 * @returns {Point} the position in the game world
 */
function getMousePosition(): Nullable<Point> {
    if (globals.Game === null ||
        globals.Game === undefined ||
        globals.Game.display === null ||
        mouseMoveEvent === null
    ) { return null; }

    const pos = globals.Game.display.eventToPosition(mouseMoveEvent);
    return globals.Game.gameCamera.screenToWorld(pos[0], pos[1]);
}

/**
 * Clear the currently pressed keys and the mouse click info.
 * Should be called after every frame.
 */
function clearInputs(): void {
    mouseDownEvent = null;
    pressed.clear();
}

export default {
    init,
    isDown,
    pressKey,
    pressMouse,
    getFirstKeyPressed,
    getLeftMouseDown,
    getMousePosition,
    clearInputs
};
