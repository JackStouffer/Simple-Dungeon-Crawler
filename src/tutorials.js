import { displayMessage } from "./ui";

const hasMessageBeenShown = {
    movement: false,
    attack: false,
    inventory: false,
    spellMenu: false,
    spellTargeting: false,
    wildSpells: false
};

export function explainMovement() {
    if (!hasMessageBeenShown.movement) {
        displayMessage("Move with WASD and QEZC. Look at things with the mouse.", "tutorial");
        hasMessageBeenShown.movement = true;
    }
}

export function explainAttacking() {
    if (!hasMessageBeenShown.attack) {
        displayMessage("Move into an enemy's tile to attack", "tutorial");
        hasMessageBeenShown.attack = true;
    }
}

export function explainInventory() {
    if (!hasMessageBeenShown.inventory) {
        displayMessage("Use i to open your inventory", "tutorial");
        hasMessageBeenShown.inventory = true;
    }
}

export function explainSpellMenu() {
    if (!hasMessageBeenShown.spellMenu) {
        displayMessage("Press m to open your spells", "tutorial");
        hasMessageBeenShown.spellMenu = true;
    }
}

export function explainPickUpItem() {
    if (!hasMessageBeenShown.spellMenu) {
        displayMessage("Press g pick up items", "tutorial");
        hasMessageBeenShown.spellMenu = true;
    }
}

export function explainSpellTargeting() {
    if (!hasMessageBeenShown.spellTargeting) {
        displayMessage("Left click on an enemy to target it, click elsewhere to cancel", "tutorial");
        hasMessageBeenShown.spellTargeting = true;
    }
}

export function explainWildSpells() {
    if (!hasMessageBeenShown.wildSpells) {
        displayMessage("Wild spells will randomly target an enemy within range. Use them carefully.", "tutorial");
        hasMessageBeenShown.wildSpells = true;
    }
}
