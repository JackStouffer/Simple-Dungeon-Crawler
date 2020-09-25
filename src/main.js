"use strict";

import globals from "./globals";
import { SimpleDungeonCrawler } from "./game";

globals.window = window;
globals.document = document;
globals.Game = new SimpleDungeonCrawler();

globals.Game.openingCinematic();
