const WIDTH = 70;
const HEIGHT = 45;
const UI_HEIGHT = 6;
const WORLD_WIDTH = WIDTH;
const WORLD_HEIGHT = HEIGHT - UI_HEIGHT - 1;

const COLOR_INVISIBLE_WALL = "black";
const COLOR_DARK_WALL = "rgb(0, 0, 100)";
const COLOR_LIGHT_WALL = "#352620";
const COLOR_INVISIBLE_GROUND = "black";
const COLOR_DARK_GROUND = "rgb(50, 50, 150)";
const COLOR_LIGHT_GROUND = "white";
const COLOR_PLAYER = "blue";

const MAP_FILLED_SPACE = "#";
const MAP_EMPTY_SPACE = ".";

const LEVEL_UP_BASE = 50;
const LEVEL_UP_FACTOR = 150;

const enemyData = {
    Goblin: {
        type: "basic",
        ai: "basic",
        char: "G",
        fgColor: "green",
        bgColor: COLOR_LIGHT_GROUND,
        name: "Goblin",
        level: 3,
        experience: 50,
        maxHp: 30,
        strength: 3, 
        defense: 1,
        sightRange: 7,
        dropPool: {
            "nothing:0": 1,
            "gold:10": 1
        }
    },
    Rat: {
        type: "basic",
        ai: "basic",
        char: "R",
        fgColor: "brown",
        bgColor: COLOR_LIGHT_GROUND,
        name: "Rat",
        level: 1,
        experience: 10,
        maxHp: 10,
        strength: 2,
        defense: 1,
        sightRange: 7,
        dropPool: {
            "nothing:0": 1
        }
    },
};

const Affinities = {
    normal: 1,
    fire: 2,
    lightning: 3,
    ice: 4,
    nature: 5

};
Object.freeze(Affinities);

// Relative probability of enemy spawns. Each element in the array is
// a level
const levelEnemyPool = [
    { "Goblin": 1, "Rat": 3 },
    { "Goblin": 1, "Rat": 3 },
    { "Goblin": 2, "Rat": 3 },
    { "Goblin": 2, "Rat": 3 },
    { "Goblin": 2, "Rat": 3 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 },
    { "Goblin": 5, "Rat": 1 }
];

// Relative probability of items in chests. Each element in the array is
// a level. Each key is the item and its value, so health:25 is a health
// potion for 25 hp.
const levelChestItemPool = [
    { "health:20": 5, "health:50": 1, "confuse:8": 2, "lightning:25": 2 },
    { "health:20": 5, "health:50": 1, "confuse:8": 2, "lightning:25": 3, "fireball:25": 2, "wild lightning:50": 1, "wild fireball:50": 1 },
    { "health:20": 5, "health:50": 1, "confuse:8": 2, "lightning:25": 2, "fireball:25": 2, "wild lightning:50": 1, "wild fireball:50": 1 },
    { "health:50": 3, "lightning:50": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:50": 3, "lightning:50": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:50": 3, "lightning:50": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:50": 3, "lightning:50": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:50": 3, "lightning:50": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:50": 3, "lightning:50": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:100": 3, "lightning:100": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:100": 3, "lightning:100": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:100": 3, "lightning:100": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:100": 3, "lightning:100": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:150": 3, "lightning:150": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:150": 3, "lightning:150": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:150": 3, "lightning:150": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:150": 3, "lightning:150": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:150": 3, "lightning:150": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:150": 3, "lightning:150": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:150": 3, "lightning:150": 1, "confuse:8": 1, "clairvoyance:0": 1 },
    { "health:150": 3, "lightning:150": 1, "confuse:8": 1, "clairvoyance:0": 1 }
];