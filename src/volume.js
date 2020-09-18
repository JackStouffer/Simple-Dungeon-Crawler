import globals from "./globals";

class TriggerVolume {
    constructor(x, y, width, height, eventName) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.eventName = eventName;
    }

    enter(object) {
        if (object.type === "player") {
            globals.gameEventEmitter.emit(this.eventName);
        }
    }

    exit() {}
}
export { TriggerVolume };
