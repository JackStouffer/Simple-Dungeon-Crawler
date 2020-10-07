/* global ENV */

"use strict";

import { Howl } from "howler";

const sounds = {};

const levelThemes = {
    "forrest_001": "forrestTheme",
    "forrest_002": "forrestTheme",
    "forrest_003": "forrestTheme",
    "forrest_004": "forrestTheme",
    "durdwin_001": "caveTheme"
};

const musicVolume = 0.8;
const musicChannel = {
    id: null,
    sound: null
};

export async function loadSounds() {
    if (ENV === "TEST") {
        return;
    }

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
    if (ENV === "TEST") {
        return;
    }

    sounds.uiClick.play();
}

export function playUIRollover() {
    if (ENV === "TEST") {
        return;
    }

    sounds.uiRollover.play();
}

export function playOpenSpells() {
    if (ENV === "TEST") {
        return;
    }

    sounds.bookFlip.play();
}

export function playCloseSpells() {
    if (ENV === "TEST") {
        return;
    }

    sounds.bookFlip2.play();
}

export function playOpenInventory() {
    if (ENV === "TEST") {
        return;
    }

    sounds.handleLeather2.play();
}

export function playCloseInventory() {
    if (ENV === "TEST") {
        return;
    }

    sounds.handleLeather.play();
}

export function playPing() {
    if (ENV === "TEST") {
        return;
    }

    sounds.ping.play();
}

export function playDoorOpen() {
    if (ENV === "TEST") {
        return;
    }

    sounds.doorOpening.play();
}

export function playChestOpen() {
    if (ENV === "TEST") {
        return;
    }

    sounds.chestOpening.play();
}

export function playBoxBreak() {
    if (ENV === "TEST") {
        return;
    }

    sounds.boxBreaking.play();
}

export function playLevelTheme(levelName) {
    if (ENV === "TEST") {
        return;
    }

    const levelTheme = sounds[levelThemes[levelName]];

    if (musicChannel.sound === levelTheme) {
        return;
    }

    if (musicChannel.id) {
        musicChannel.sound.fade(musicVolume, 0, 3000, musicChannel.id);
    }

    musicChannel.sound = levelTheme;
    musicChannel.id = levelTheme.play();
    musicChannel.sound.fade(0, musicVolume, 3000, musicChannel.id);
}

export function pauseMusic() {
    if (ENV === "TEST") {
        return;
    }

    if (musicChannel.id) {
        musicChannel.sound.pause(musicChannel.id);
    }
}

export function resumeMusic() {
    if (ENV === "TEST") {
        return;
    }

    if (musicChannel.id) {
        musicChannel.sound.play(musicChannel.id);
    }
}
