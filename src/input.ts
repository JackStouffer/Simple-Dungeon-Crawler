import globals from "./globals";
import { Vector2D } from "./map";
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

        if (e.ctrlKey) {
            pressed.add("Control");
        }
        if (e.shiftKey) {
            pressed.add("Shift");
        }
        if (e.altKey) {
            pressed.add("Alt");
        }
        // TODO, speed: this should be a regex but I was getting really odd spurious failures
        // with them
        if (e.metaKey && window.navigator.platform.indexOf("Mac") > -1) {
            pressed.add("Command");
        }
        if (e.key !== "Meta" && e.key !== "Command" && e.key !== "Alt" && e.key !== "Shift") {
            pressed.add(e.key);
        }
    });

    globals.Game.canvas.addEventListener("mousedown", function (e: MouseEvent) {
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
 * Check if a key is down
 */
function isDown(key: string): boolean {
    // TODO, speed, cleanup: The meta/shift key situation should be stored
    // as a boolean on the key command so we don't have to do string parsing
    const keys = key.split(" ");
    for (const k of keys) {
        if (!pressed.has(k)) {
            return false;
        }
    }
    return true;
}

function getPressedKeys(): string[] {
    return [...pressed.values()];
}

/**
 * Give the world position of the mouse click if there is
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
 * Give the world position of the mouse cursor's position if there is
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
    getPressedKeys,
    getLeftMouseDown,
    getMousePosition,
    clearInputs
};
