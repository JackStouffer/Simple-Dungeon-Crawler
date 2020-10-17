import globals from "./globals";
import { GameObject } from "./object";

export interface Volume {
    x: number;
    y: number;
    width: number;
    height: number;

    enter: (object: GameObject) => void;
}

export class TriggerVolume implements Volume {
    x: number;
    y: number;
    width: number;
    height: number;
    private eventName: string;

    constructor(x: number, y: number, width: number, height: number, eventName: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.eventName = eventName;
    }

    enter(object: GameObject) {
        if (object.type === "player") {
            globals.gameEventEmitter.emit(this.eventName);
        }
    }
}
