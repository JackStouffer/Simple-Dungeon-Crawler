import { Howl } from "howler";
import { Nullable, randomFromInterval } from "./util";

const sounds: { [key: string]: Howl } = {};

const levelThemes: { [key: string]: string } = {
    "tutorial_001": "forrestTheme",
    "tutorial_002": "forrestTheme",
    "forrest_001": "forrestTheme"
};

interface SoundChannel {
    id: Nullable<number>,
    sound: Nullable<Howl>
}

const musicVolume = 0.7;
const musicChannel: SoundChannel = {
    id: null,
    sound: null
};

// TODO, cleanup: Load sounds async with the game code
// TODO: low pass filter when in inventory and spells. This is not possible in Howler.js

export async function loadSounds() {
    await Promise.all([
        new Promise(function(resolve, reject) {
            sounds.uiClick = new Howl({
                src: ["bin/sounds/click.mp3"],
                onload: resolve,
                onloaderror: reject
            });
        }),
        new Promise(function(resolve, reject) {
            sounds.uiRollover = new Howl({
                src: ["bin/sounds/rollover.mp3"],
                onload: resolve,
                onloaderror: reject
            });
        }),
        new Promise(function(resolve, reject) {
            sounds.bookFlip = new Howl({
                src: ["bin/sounds/book_flip.mp3"],
                onload: resolve,
                onloaderror: reject
            });
        }),
        new Promise(function(resolve, reject) {
            sounds.bookFlip2 = new Howl({
                src: ["bin/sounds/book_flip2.mp3"],
                onload: resolve,
                onloaderror: reject
            });
        }),
        new Promise(function(resolve, reject) {
            sounds.handleLeather = new Howl({
                src: ["bin/sounds/handle_small_leather1.mp3"],
                onload: resolve,
                onloaderror: reject
            });
        }),
        new Promise(function(resolve, reject) {
            sounds.handleLeather2 = new Howl({
                src: ["bin/sounds/handle_small_leather2.mp3"],
                onload: resolve,
                onloaderror: reject
            });
        }),
        new Promise(function(resolve, reject) {
            sounds.ping = new Howl({
                src: ["bin/sounds/ping.mp3"],
                onload: resolve,
                onloaderror: reject,
                volume: 0.2
            });
        }),
        new Promise(function(resolve, reject) {
            sounds.doorOpening = new Howl({
                src: ["bin/sounds/door_open.mp3"],
                onload: resolve,
                onloaderror: reject,
                volume: 0.5
            });
        }),
        new Promise(function(resolve, reject) {
            sounds.chestOpening = new Howl({
                src: ["bin/sounds/chest_open.mp3"],
                onload: resolve,
                onloaderror: reject,
                volume: 0.5
            });
        }),
        new Promise(function(resolve, reject) {
            sounds.boxBreaking = new Howl({
                src: ["bin/sounds/box_break.mp3"],
                onload: resolve,
                onloaderror: reject,
                volume: 0.1
            });
        }),
        new Promise(function(resolve, reject) {
            sounds.forrestTheme = new Howl({
                src: ["bin/sounds/water_prelude.mp3"],
                onload: resolve,
                onloaderror: reject,
                volume: 0,
                loop: true
            });
        })
    ]);
}

/**
 * Load the sounds which will need to be used eventually
 * but do not await for them.
 */
export function loadEventualSounds() {
    sounds.caveTheme = new Howl({
        src: ["bin/sounds/unpromised.mp3"],
        volume: 0,
        loop: true
    });
}

export function playUIClick() {
    sounds.uiClick.play();
}

export function playUIRollover() {
    // perturbation
    sounds.uiRollover.rate(randomFromInterval(0.95, 1.08));
    sounds.uiRollover.volume(randomFromInterval(0.95, 1.05));

    sounds.uiRollover.play();
}

export function playOpenSpells() {
    sounds.bookFlip.play();
}

export function playCloseSpells() {
    sounds.bookFlip2.play();
}

export function playOpenInventory() {
    sounds.handleLeather2.play();
}

export function playCloseInventory() {
    sounds.handleLeather.play();
}

export function playPing() {
    sounds.ping.play();
}

export function playDoorOpen() {
    sounds.doorOpening.play();
}

export function playChestOpen() {
    sounds.chestOpening.play();
}

export function playBoxBreak() {
    sounds.boxBreaking.play();
}

export function playLevelTheme(levelName: string) {
    const levelTheme = sounds[levelThemes[levelName]];

    if (levelTheme === undefined || musicChannel.sound === levelTheme) {
        return;
    }

    if (musicChannel.id !== null && musicChannel.sound !== null) {
        musicChannel.sound.fade(musicVolume, 0, 3000, musicChannel.id);
    }

    musicChannel.sound = levelTheme;
    musicChannel.id = levelTheme.play();
    musicChannel.sound.fade(0, musicVolume, 3000, musicChannel.id);
}

export function pauseMusic() {
    if (musicChannel.id !== null && musicChannel.sound !== null) {
        musicChannel.sound.pause(musicChannel.id);
    }
}

export function resumeMusic() {
    if (musicChannel.id !== null && musicChannel.sound !== null) {
        musicChannel.sound.play(musicChannel.id);
    }
}
