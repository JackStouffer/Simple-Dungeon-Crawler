# Changelog

## Version 10

_In Development_

* Gameplay
  * Replaced burn status with on fire status
* Technical
  * Refactor to Entity Component System design rather than the Unity-style Entity with plugin components

## Version 9

_November 15, 2020_

* Gameplay
  * Movement is now done with the mouse and you can move multiple tiles in a turn
  * Enemies will use health potions or spells if they're low health
  * Enemies will use mana potions if they're low mana
  * Enemies will attack with spells if they know them
  * Enemies will try to regain sight of the player if they lose them
  * Enemies will eventually lose the player after so many turns not knowing their location
  * Added bandits
  * Added bandit mages that attack with spells
  * Walking on top of campfires now damages you
  * Added Wall of Fire spell that spawns a line of fire tiles that damage things that walk through them
  * Added Wall of Ice spell
    * Spawns a line of ice blocks
    * Block your sight
    * Can be broken
* Technical
  * AI now uses Goal Oriented Action Planning for decision making
  * Convert project to Typescript
  * Use strict null checks in the Typescript project
  * Modify game loop to remove async/await code to more align with a traditional infinite loop
    * Got the game running at 60fps
    * Added input handling code per-frame
  * Fixed bugs that were using fighter's stats without calling `getEffectiveStats`
  * Fix tests buy using proxyquire for mocking
  * Added edge weights to A* path finding to help enemies avoid dangerous areas
  * Changed command architecture to allow command execution to span multiple frames 
* Graphical Changes
  * Can now see actors moving between tiles until they reach their destination
  * Added targeting reticle when casting spells
  * Added movement path indicator when moving the mouse

## Version 8

_October 10, 2020_

* Gameplay
  * Added support for large maps with a scrolling camera
  * Added sound and music
  * Added more tutorials
  * Wild spells now target any random enemy within a certain range, visible or not
  * Damage effectiveness is now calculated according to the enemy's strengths and weaknesses
  * Smart monsters will now patrol an area with a defined patrol path
* Technical
  * Refactor `BasicInventory` to use JS ES6 `Map` to guarantee key order
  * Refactor `isBlocked`'s return value be more clear
  * Add `StatisticEffect` class to easily implement timed changes to fighter stats
  * Refactor haste and slow spells to use `StatisticEffect` instances
* Graphical changes
  * Changed how explored but not visible tiles are shown
  * Fixed a bug where the player's `@` character gets drawn multiple times
  * Fixed a bug where the player's `@` character appears on previously occupied tiles
  * Fixed a bug where the players tile was not lit on spawn
  * Fixed a bug where the inventory and spell menu drew over the screen when targeting a spell

## Version 7

_September 26, 2020_

* Gameplay
  * Added tutorials
  * Added Haste and Slow spells and potions
  * Use arrow keys for movement in menus so the player isn't limited to 26 options
  * Added keybinding
  * Fixed a bug where the player could mouse look into the fog of war
* Technical
  * Remove usage of ROT.Engine in favor of vanilla async/await
  * Use ROT Speed Scheduler instead of Simple Scheduler
  * Move to standard game loop setup
  * Improved webpack build by using the HTML plugin
  * Completely refactor input handling to move it into the game loop and out of player code
  * Refactor text crawls to be game states rather than special cases
* Graphical changes
  * Blocking tiles no longer render outside the player's sight range
  * Redesigned the spell menu now shows more information
  * Game messages now appear as a scrolling list next to the game window
  * Dead bodies have changed colors

## Version 6

_September 7, 2020_

* Added build system with Webpack
* Added code linting with ESLint
* Added Github workflow for continious integration testing
* Refactored code to ES6 modules
* Added tests with Mocha and Chai
* Added magic system
  * Spells are found in the world from shrines
  * Open a selection menu with the `m` key
  * Cast spells just like with magic scrolls
* Map tiles are now defined in data and can show characters
* All monsters can now move in eight directions
* Added barrels that have the same behavior as crates
* Graphical changes
  * Added trees, tables, chairs, cabinets, stoves, gravestones, and beds as map tiles
  * All world objects now use symbols, with characters and numbers being reserved for enemies
  * Using square rather than rectangular aspect ratio for tiles
* Fixed a bug with multiple player instances being created and accepting inputs when changing levels
* Fixed targeting bug with damage scrolls
* Fixed bug where dead bodies could draw over enemies on the same tile

## Version 5

_August 18, 2020_

* Levels are no longer randomly generated and instead are loaded from Tiled maps
* Added a patrolling AI that keeps picking a random spot on the map to go to looking for enemies on the way
* Monsters now have random inventory based on a unique probability pool for each monster
* Monsters how drop all items in their inventory upon death
* Players can pick up items on the ground with the g key
* Using a data oriented approach for objects
  * All items are just data ID-ed by a key in a hashmap
  * All components and arguments to components are now driven from this data hashmap
  * Objects are now added to the world just by using an ID and x, y coordinates
  * Graphics, inventory, and interact-ables were all refactored to be components on GameObject
  * Custom objects for monsters, the player, stairs, and chests are now no longer necessary as all their behavior is now in components. They have been deleted
* Using a data oriented approach for items
  * All items are just data ID-ed by a key in a hashmap and their behavior when used is controlled by a pointer to a use function
  * No need for a custom Item object anymore

## Version 4

_April 22, 2020_

* Use let and const instead of var
* Split the game code into smaller files
* Added a chance for a critical strike for all attacks
* All attacks now do at least 1 damage
* Added opening text
* It's now possible to win by reaching floor 20
* Losing now has a text overlay and allows you to instantly restart
* Enemies properties are now defined in data
* Each level has a separate item and enemy type spawn probability
* The number of chests and enemies in a level is now normally distributed
* Always show the locations of chests and stairs once you've seen them once
* Added magic scrolls: lighting, fireball, clairvoyance, confuse
* Added damage types (currently unused)
* Added status effects code and added the burn status effect
* Fixed a bug where items would disappear from the inventory once selected even if they couldn't be used
* Fixed a bug allowing healing past max health

## Version 3

_August 8, 2019_

* Removed typescript and went to just JS
* Refactored all of the code to be more pure and not modify global state
* Added lighting and "Fog of War"
* Added level traversal with stairs
* Levels are now both caves and dungeons
* Added experience from killing enemies and a simple leveling system
* Added an unfinished key binding system

## Version 2

_March 6, 2019_

* Switched visual style
* Switched to cave maps
* Added items and health potions
* Added goblins with A* path-finding
* Added player combat

## Version 1

_February 28, 2019_

Simple game in which you try to find a key in a chest before a character catches you.
