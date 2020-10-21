import { get } from "lodash";
import globals from "./globals";

declare const ENV: string;

const pressed: Set<string> = new Set();
let mouseEvent: MouseEvent = null;

function init(): void {
    globals.window.addEventListener("keydown", function (e: KeyboardEvent) {
        e.preventDefault();
        pressed.add(e.key);
    });

    globals.window.addEventListener("mousedown", function (e: MouseEvent) {
        e.preventDefault();
        mouseEvent = e;
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

function getMouseEvent() {
    return mouseEvent;
}

function clearInputs(): void {
    mouseEvent = null;
    pressed.clear();
}

export default { init, isDown, press, getFirstKeyPressed, getMouseEvent, clearInputs };
