# Simple Dungeon Crawler

A turn based, tactical adventure game which rewards player ingenuity. Written in TypeScript and rendered using WebGL.

Play an unfinished version for free at: https://jackstouffer.com/games/Simple-Dungeon-Crawler/dist/index.html

## Building

To install dependencies

```
npm install
```

To build

```
npm run build
```

To develop

```
npm run watch
```

To build the compress distributable version

```
npm run dist
```

## Implemented Features

* A resource-based magic system
* Spells which have tangible changes to the level
* An inventory system
* Potions
* Magic scrolls
* Tiled JSON map loading
* Sight FOVs for AIs and fog of war for the player
* Intelligent monster AI that
  * plans ahead
  * use their items
  * react to the world with dialog
* Two pass lighting
* Intractable world items like chests, boxes, and doors
* Some scenery like tables, lanterns, fires, chairs, and cabinets
* Environmental details like water, mud, ice, tall grass
* Keybinding for keyboard controls
