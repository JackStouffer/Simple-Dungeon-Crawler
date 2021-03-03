import { displayMessage, MessageType } from "./ui";
import { playPing } from "./audio";

const hasMessageBeenShown = {
    movement: false,
    attack: false,
    inventory: false,
    pickUpItem: false,
    spellMenu: false,
    spellTargeting: false,
    wildSpells: false,
    spellCasts: false,
    spellShrines: false,
    environment: false
};

export function explainMovement() {
    if (!hasMessageBeenShown.movement) {
        displayMessage("Move by clicking where you want to go. You can only move seven tiles at a time.", MessageType.Tutorial);
        hasMessageBeenShown.movement = true;
    }
}

export function explainAttacking() {
    if (!hasMessageBeenShown.attack) {
        displayMessage("Click on an enemy when next to it to attack", MessageType.Tutorial);
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
        displayMessage("Click on a dropped item to pick it up", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.pickUpItem = true;
    }
}

export function explainSpellTargeting() {
    if (!hasMessageBeenShown.spellTargeting) {
        displayMessage("Left click on an enemy to target it, click elsewhere to cancel", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.spellMenu = true;
        hasMessageBeenShown.spellTargeting = true;
    }
}

export function explainWildSpells() {
    if (!hasMessageBeenShown.wildSpells) {
        displayMessage("Wild spells will randomly target an enemy within range", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.wildSpells = true;
    }
}

export function explainSpellCasts() {
    if (!hasMessageBeenShown.spellCasts) {
        displayMessage("Spells have a limited number of casts. Use them sparingly.", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.spellMenu = true;
        hasMessageBeenShown.spellCasts = true;
    }
}

export function explainSpellShrine() {
    if (!hasMessageBeenShown.spellShrines) {
        displayMessage("Learn new spells by finding magic shrines", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.spellShrines = true;
    }
}

export function explainEnvironmentInteractivity() {
    if (!hasMessageBeenShown.environment) {
        displayMessage("Spells can interact with the environment in different ways", MessageType.Tutorial);
        playPing();
        hasMessageBeenShown.environment = true;
    }
}
