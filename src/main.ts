import globals from "./globals";
import { SimpleDungeonCrawler } from "./game";
import {
    giveAllItems,
    giveAllSpells,
    toggleAI,
    togglePlayerFOV,
    toggleCommandExecution,
    togglePathfindingDebug,
    toggleAIDebug,
    toggleAIDialogDebug,
    startGameLoop,
    stopGameLoop,
    getEntity,
    step,
    getEntities,
    loopOnce
} from "./console-commands";

globals.window = window;
globals.document = document;

globals.window.giveAllItems = giveAllItems;
globals.window.giveAllSpells = giveAllSpells;
globals.window.toggleAI = toggleAI;
globals.window.togglePlayerFOV = togglePlayerFOV;
globals.window.toggleCommandExecution = toggleCommandExecution;
globals.window.togglePathfindingDebug = togglePathfindingDebug;
globals.window.toggleAIDebug = toggleAIDebug;
globals.window.toggleAIDialogDebug = toggleAIDialogDebug;
globals.window.startGameLoop = startGameLoop;
globals.window.stopGameLoop = stopGameLoop;
globals.window.loopOnce = loopOnce;
globals.window.getEntity = getEntity;
globals.window.getEntities = getEntities;
globals.window.step = step;

window.addEventListener("load", function() {
    const loading = globals.document!.getElementById("loading")!;
    loading.parentNode!.removeChild(loading);

    const playButton = document.createElement("button");
    playButton.innerText = "Play";
    playButton.classList.add("play-button");
    playButton.addEventListener("click", function () {
        globals.Game = new SimpleDungeonCrawler();
        globals.window!.Game = globals.Game;
        playButton.remove();
    });

    const canvas = document.getElementById("canvas")!;
    canvas.prepend(playButton);
});
