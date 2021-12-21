import { showConfirmationDialogBox } from "./ui";

const hasMessageBeenShown = {
    movement: false,
    cameraMovement: false,
    attack: false,
    inventory: false,
    pickUpItem: false,
    spellMenu: false,
    wildSpells: false,
    spellShrines: false,
    environment: false,
    enemySurrounding: false,
    attackPlanning: false,
    wetStatus: false
};

export function explainCamera() {
    if (!hasMessageBeenShown.cameraMovement) {
        showConfirmationDialogBox("Observing your enemy and environment from afar and planning your attack is key to survival. Move the camera around by using WASD. Pass a turn by pressing X.");
        hasMessageBeenShown.cameraMovement = true;
    }
}

export function explainAttacking() {
    if (!hasMessageBeenShown.attack) {
        showConfirmationDialogBox("Click on an enemy when you're next to it to melee attack.");
        hasMessageBeenShown.attack = true;
    }
}

export function explainSpellMenu() {
    if (!hasMessageBeenShown.spellMenu) {
        showConfirmationDialogBox("Press m to open your spells. Left click on an enemy to target it and click an empty tile to cancel. Spells have a limited number of casts, so use them sparingly.");
        hasMessageBeenShown.spellMenu = true;
    }
}

export function explainPickUpItem() {
    if (!hasMessageBeenShown.pickUpItem) {
        showConfirmationDialogBox("Click on a dropped item to pick it up. Use i to open your inventory");
        hasMessageBeenShown.pickUpItem = true;
    }
}

export function explainWildSpells() {
    if (!hasMessageBeenShown.wildSpells) {
        showConfirmationDialogBox("You've learned a wild spell. Wild spells will randomly target an enemy within range.");
        hasMessageBeenShown.wildSpells = true;
    }
}

export function explainSpellShrine() {
    if (!hasMessageBeenShown.spellShrines) {
        showConfirmationDialogBox("You can learn new spells by finding magic shrines. Some shrines will be hidden.");
        hasMessageBeenShown.spellShrines = true;
    }
}

export function explainEnvironmentInteractivity() {
    if (!hasMessageBeenShown.environment) {
        showConfirmationDialogBox("Spells can interact with the environment in different ways");
        hasMessageBeenShown.environment = true;
    }
}

export function explainEnemySurrounding() {
    if (!hasMessageBeenShown.enemySurrounding) {
        showConfirmationDialogBox("Your defense and movement are penalized for each enemy which surrounds you.");
        hasMessageBeenShown.enemySurrounding = true;
    }
}

export function explainWetStatus() {
    if (!hasMessageBeenShown.wetStatus) {
        showConfirmationDialogBox("You are now wet. Electric attacks will do more damage, but you are immune to fire damage for one hit. You will dry off after several turns.");
        hasMessageBeenShown.wetStatus = true;
    }
}
