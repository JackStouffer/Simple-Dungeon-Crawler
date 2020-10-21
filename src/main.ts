import globals from "./globals";
import { SimpleDungeonCrawler } from "./game";
import { giveAllItems, giveAllSpells, toggleAI, togglePlayerFOV } from "./console-commands";

globals.window = window;
globals.document = document;
globals.Game = new SimpleDungeonCrawler();
globals.window.Game = globals.Game;

globals.window.giveAllItems = giveAllItems;
globals.window.giveAllSpells = giveAllSpells;
globals.window.toggleAI = toggleAI;
globals.window.togglePlayerFOV = togglePlayerFOV;

globals.Game.startGameplay();
