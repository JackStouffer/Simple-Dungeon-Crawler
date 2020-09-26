import { displayMessage } from "./ui";

const hasMessageBeenShown = {
    "movement": false,
    "attack": false
};

export function explainMovement() {
    if (!hasMessageBeenShown["movement"]) {
        displayMessage("Move with WASD and QEZC. Look at things with the mouse.", "tutorial");
        hasMessageBeenShown["movement"] = true;
    }
}

export function explainAttacking() {
    if (!hasMessageBeenShown["attack"]) {
        displayMessage("Move into an enemy's tile to attack", "tutorial");
        hasMessageBeenShown["attack"] = true;
    }
}
