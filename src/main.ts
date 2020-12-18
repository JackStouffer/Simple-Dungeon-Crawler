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
    startGameLoop,
    stopGameLoop,
    getEntity,
    step,
    getEntities
} from "./console-commands";

globals.window = window;
globals.document = document;
globals.Game = new SimpleDungeonCrawler();
globals.window.Game = globals.Game;

globals.window.giveAllItems = giveAllItems;
globals.window.giveAllSpells = giveAllSpells;
globals.window.toggleAI = toggleAI;
globals.window.togglePlayerFOV = togglePlayerFOV;
globals.window.toggleCommandExecution = toggleCommandExecution;
globals.window.togglePathfindingDebug = togglePathfindingDebug;
globals.window.toggleAIDebug = toggleAIDebug;
globals.window.startGameLoop = startGameLoop;
globals.window.stopGameLoop = stopGameLoop;
globals.window.getEntity = getEntity;
globals.window.getEntities = getEntities;
globals.window.step = step;

globals.Game.startGameplay();
