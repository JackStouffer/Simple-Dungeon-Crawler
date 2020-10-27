import { get } from "lodash";
import globals from "./globals";
import { Point } from "./map";

declare const ENV: string;

const pressed: Set<string> = new Set();
let mouseDownEvent: MouseEvent = null;
let mouseMoveEvent: MouseEvent = null;

function init(): void {
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

function press(key: string): void {
    if (ENV === "TEST") {
        pressed.add(key);
    }
}

function isDown(key: string): boolean {
    return pressed.has(key);
}

function getFirstKeyPressed(): string {
    return get([...pressed.values()], "[0]", null);
}

function getLeftMouseDown(): Point {
    if (!mouseDownEvent) { return null; }

    const pos = globals.Game.display.eventToPosition(mouseDownEvent);
    return globals.Game.gameCamera.screenToWorld(pos[0], pos[1]);
}

function getMousePosition(): Point {
    if (!mouseMoveEvent) { return null; }
    const pos = globals.Game.display.eventToPosition(mouseMoveEvent);
    return globals.Game.gameCamera.screenToWorld(pos[0], pos[1]);
}

function clearInputs(): void {
    mouseDownEvent = null;
    pressed.clear();
}

export default {
    init,
    isDown,
    press,
    getFirstKeyPressed,
    getLeftMouseDown,
    getMousePosition,
    clearInputs
};
