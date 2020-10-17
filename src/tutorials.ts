import { displayMessage, MessageType } from "./ui";
import { playPing } from "./audio";

const hasMessageBeenShown = {
    movement: false,
    attack: false,
    inventory: false,
    pickUpItem: false,
    spellMenu: false,
    spellTargeting: false,
    wildSpells: false
};

export function explainMovement() {
    if (!hasMessageBeenShown.movement) {
        displayMessage("Move with WASD and QEZC. Look at things with the mouse.", MessageType.Tutorial);
        hasMessageBeenShown.movement = true;
    }
}

export function explainAttacking() {
    if (!hasMessageBeenShown.attack) {
        displayMessage("Move into an enemy's tile to attack", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.attack = true;
    }
}

export function explainInventory() {
    if (!hasMessageBeenShown.inventory) {
        displayMessage("Use i to open your inventory", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.inventory = true;
    }
}

export function explainSpellMenu() {
    if (!hasMessageBeenShown.spellMenu) {
        displayMessage("Press m to open your spells", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.spellMenu = true;
    }
}

export function explainPickUpItem() {
    if (!hasMessageBeenShown.pickUpItem) {
        displayMessage("Press g pick up items", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.pickUpItem = true;
    }
}

export function explainSpellTargeting() {
    if (!hasMessageBeenShown.spellTargeting) {
        displayMessage("Left click on an enemy to target it, click elsewhere to cancel", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.spellTargeting = true;
    }
}

export function explainWildSpells() {
    if (!hasMessageBeenShown.wildSpells) {
        displayMessage("Wild spells will randomly target an enemy within range. Use them carefully.", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.wildSpells = true;
    }
}
