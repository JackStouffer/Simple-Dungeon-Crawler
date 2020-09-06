"use strict";

import globals from "./globals";
import { SimpleDungeonCrawler } from "./game";

globals.window = window;
globals.Game = new SimpleDungeonCrawler();
