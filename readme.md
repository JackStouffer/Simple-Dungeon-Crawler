# Simple Dungeon Crawler

Play for free at: https://jackstouffer.com/games/Simple-Dungeon-Crawler/index.html

A JavaScript browser game with unicode console graphics. Reminiscent of old rouge-likes
but has more in common gameplay-wise with modern RPGs.

## Building

To install dependencies

```
npm install
```

To build

```
npm run build
```

## Tests

```
npm run test
```

## Implemented Features

* Multiple levels loaded and connected from Tiled maps
* An inventory system
* A very basic leveling system
* Monsters with basic AI, like rats and goblins
* Lighting and sight FOVs
* Intractable world items like chests, boxes, and doors
* Some scenery like tables, lanterns, fires, chairs, and cabinets
* A magic system with damage spells and two types of utility spells
* Health potions
* Magic scrolls

## Planned Features

### RPG Features

* A leveling system
  * Would be rather simple, you would only be able to choose which stats to increase from a small number
* Fleshing out the magic system to make it a viable alternative to physical combat
* Rouge builds
  * Stealth reduces visibility but can sneak by enemies
  * Attacks from stealth do extra damage
  * Thrown poison
* Skills
  * spells for magic builds, techniques for knight and rouge builds
  * found in the world to encourage exploration
  * points of power or shrines for magic, tomes for combat techniques
  * Your stats determine their effectiveness and their resource cost
* After all this is implemented, would need to rebalance the entire game

### New Mechanics or Levels

* Implement the rest of the levels and a conclusion to the "story"
* Status effects: sleep, poison, freeze, bleed (work like dark souls, not damage over time), fatigued, rage (increased strength but lose control), attack up/down, defense up/down, speed up/down
* Sight range effected by world lighting. So same logic which applies
to the PC seeing lights in the distance when the line of sight is clear
would apply. Would need to separate the player's "lantern" from the logic around lighting and make it a sight range.
* Shrines/other object that gives permanent stat buffs
* Passive by default, high level enemies that are difficult to defeat but give good drops
* Enemies that only run away after seeing the player and then disappear after so many turns running away. Give great drops.
* Thieves that go around stealing items from chests. Have to catch them before moving to next level to get the items back.
* Shop every few floors. Turns hostile if attacked, very hard enemy but drops good loot
* Locked doors
* Locked chests, good loot, opened by found keys or lock picks
* Monster infighting
  * Teams and factions
