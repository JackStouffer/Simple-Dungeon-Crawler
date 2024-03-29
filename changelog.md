# Changelog

## Version 14

_In Development_

* Gameplay
  * Major level redesigns
  * Added a new spell, "push", which throws enemies across the map in a specified direction
  * Barrels are now "Oil Barrels"
    * They explode if caught on fire
    * They cover an area with oil if broken
  * Added an "Oil Covered" status which makes the entity weak to fire damage
  * Leaving a level now saves the level entity state and reloads that state when returning
    * Using a door to return to a level no longer teleports you back to the beginning of the level
  * Lightning bugs now have fear and are weak to fire
  * Added apples as an item which restores a low amount of health
  * Give a better log message when picking up multiple items at once
  * Allow entity inventories to be defined with multiple of the same item in the map file
  * Dogs can now bark to alert their allies
  * Rest points now heal status aliments
  * Rest points now disappear after use
  * Grass can no longer be physically attack
  * Fixed a bug where being alerted by the presence of a dead body would cause mages not to attack
  * Fixed a bug where area of effect damage on an enemy could let it know where the player is
  * Fixed bugs relating to particle effects of statuses disappearing before the status ends
* Technical
  * Consolidated entity display strings with the entity type data
  * Added entity tag to control which entities can and cannot be physically attacked
* Graphical
  * Mousing over interactable entities now causes them to glow
  * Rest points are now marked by particle effects instead of a sprite
  * Added visual indicators for health values a-la the damage indicators

## Version 13

_December 2, 2021_

* Gameplay
  * Added new Lightning Bug enemy which has a constant AoE lightning attack
  * The camera can now move independently of the player with WASD
  * Setting enemies on fire makes them more likely to run away in fear
  * More dialog responses
    * Added lines when confused
    * Added lines when a bandit gives up on chasing the player
    * Added response when ally runs away
  * Added ring of fire defensive spell
  * Enemies will no longer run through fire to get to the player if they can be damaged by it
  * Enemy pathing now takes damage resistances into account when avoiding tiles
  * Add a new explosion trap spell
  * Fixed a bug where entities could path through two diagonally adjacent blocking tiles
  * Fixed a bug where enemies could use heal other spell on self
  * Fixed a bug where enemies weren't alerted after a sneak attack
  * Fixed a bug where enemies weren't alerted after seeing someone next to them dying
* Technical
  * Refactored chest updating to less over engineered. Just flip the texture key and then follow the normal code path
  * Added simple template system to dialog definitions to allow for dynamic rules
  * Enemies can be immune to confusion due to a refactoring of the confusion component
  * Refactored input system
    * Can now distinguish between a key press and a key hold
    * Support international keyboard layouts
  * Refactored trigger data design by merging it all into one component
* Graphical
  * Moved log messages from HTML to text on the game screen
  * Physical attacks now have an animation
  * Damage values are now shown as animated values on the screen rather than in the log
  * Tutorials are now shown in a confirmation modal window
  * Added particle effects to entities when they have the following status effects
    * On fire
    * Wet
    * Stunned

## Version 12

_July 7, 2021_

* Gameplay
  * Enemies now have "barks" and dialog
    * Based on the state of themselves and the world around them
    * Allies can give specific responses to the line said
  * Enemies can now be grouped into teams which controls dialog and if they give alerts when spotting their enemy
  * Targeted spells and items now have a max range for the player
  * The player is now penalized for being surrounded by more than one enemy with lower movement speed and defense
  * Added fast moving dog enemy
  * Rename "paralyzed" status effect to "stunned"
  * Gave the status effect messages their own styling to be more noticeable
  * Buff "exhale" spell by always stunning pushed back enemies
  * Game camera moves from entity to entity when a turn ends
  * Fixed a bug where wandering enemies could set themselves on fire by walking into a fire
  * Fixed a bug where entities could be set on fire when frozen
  * Fixed a bug where puddle which melted from ice would still be treated as ice when walking on it
* Technical
  * Some entity ids are now deterministic for easier debugging
  * Game map is now a structure instead of just a multidimensional array so extra data can be saved
  * Silence is now a separate state in the AI goal planning
    * Makes it easier to work with the dialog system
    * Makes it clearer and therefore harder to forget in the action definitions
  * Commands can now be run in parallel in the command queue in a single turn
    * Makes things like the exhale spell look much more natural
  * Game states are now grouped into their own static objects
    * Enter and exit functions make it much easier to manage moving from one state to another
    * Each state object has its own rendering, update, and input handling implementations
  * Added a "Play" button which must be pressed to start the game
    * This is to get around the auto-playing audio control rules in browsers
    * These rules stopped all game audio from starting
  * Made the UI code resolution independent
  * Lighting and fog of war data was refactored out of tile data
    * Now stored in its own array on the game map data
    * 2D array to more accurately represent the fog data per tile and for easier lookup
  * Most position data now stored as vector objects which makes passing data around and manipulating it later easier
  * Removed all instances where Entity references were kept across frames
    * Inherently bug prone, as the Entity could disappear from the world since the last frame
    * Use the ID strings to look up the entity in the ECS

## Version 11

_May 29, 2021_

* Gameplay
  * Added the beginnings of a tutorial
  * Damage done to enemies that aren't alerted do bonus damage
  * Fireball spell now does fire damage in a circle
  * Added "exhale" spell which pushes back everything around the player in a circle
  * Added Paralyzed status which removes an entities ability to act for a certain number of turns
  * Enemies try to run to water when on fire
  * Lightning attacks in water now spread throughout the entire body of water
  * Freezing water now creates ice, which entities will slide across with no control
  * Combusting water with the combustion spell now creates harmful steam
  * Created eel enemy which can only move in water
* Technical
  * Use Tiled's JSON format instead of the JS format
  * Use Pixi.js for rendering sprites in WebGL
  * Commands can now generate more commands to be executed so that turns can have secondary effects
* Graphical
  * Use 16x16 sprites instead of console display
  * Use inset-ed box shadow to represent selection
  * Allow maps to have arbitrary number of tile layers
  * Multi-tile static objects represented by tiles can now be visible in their entirety but still cast shadows
  * Spells can now have particle effects
  * Lightning spells have a specific lightning effect 

## Version 10

_December 19, 2020_

* Gameplay
  * Spells are based around number of casts per spell rather than using mana entity mana
  * Added a bandit healer who will stay back and heal allies
  * Replaced burn status effect with On Fire status
  * When walking over flammable things in the world while on fire, the objects have a chance to catch on fire
  * Added "Wet" status which
    * Makes you weak to electric attacks
    * Makes you invulnerable to the on fire status once, so walking into a fire will protect you for one turn when wet and then the wet status will be removed
  * Added shallow water which
    * Removes On Fire status
    * Gives you the Wet status
  * Added deep water which
    * Removes On Fire status
    * Gives you the Wet status
    * Slows you down when you try to walk through it
  * Added mud which slows you down when you try to walk through it
  * Added tall grass which can catch on fire
  * Enemies can now run away in fear
    * Enemies will run away when they reach a set threshold
    * They will become more and more afraid when they see powerful targets and when their allies are killed
  * Enemies will now run away from fire
* Technical
  * Refactor to Entity Component System design rather than the Unity-style Entity with plugin components
  * Refactor collision detection to use a hash map of entity positions
* Graphical Changes
  * Inventory and spell menus will now show a small description at the bottom
  * Inventory and spell menus can now paginate
  * Game display will now resize based on web browser window size
  * Changed the characters for both the ground and for trees
  * Entities that are on fire will now have a different background color
  * Entities that are wet will now have a different background color

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
