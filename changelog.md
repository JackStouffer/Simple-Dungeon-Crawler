# Changelog

## Version 7

_In Development_

* Remove usage of ROT.Engine in favor of vanilla async/await
* Use ROT Speed Scheduler instead of Simple

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
