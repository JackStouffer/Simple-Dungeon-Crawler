const drawUI = function(display, level, player) {
    for (let i = 0; i < WIDTH; i++) {
        display.draw(i, HEIGHT - UI_HEIGHT, MAP_FILLED_SPACE, "blue", "blue");
    }

    display.drawText(0,  HEIGHT - UI_HEIGHT, "%c{white}%b{blue}Depth: " + (level * 100) + "ft");
    display.drawText(17,  HEIGHT - UI_HEIGHT, "%c{white}%b{blue}HP: " + player.fighter.hp + "/" + player.fighter.maxHp);
    display.drawText(30,  HEIGHT - UI_HEIGHT, "%c{white}%b{blue}STR: " + player.fighter.strength);
    display.drawText(38,  HEIGHT - UI_HEIGHT, "%c{white}%b{blue}DEF: " + player.fighter.defense);
    display.drawText(46,  HEIGHT - UI_HEIGHT, "%c{white}%b{blue}LVL: " + player.level);
    display.drawText(54,  HEIGHT - UI_HEIGHT, "%c{white}%b{blue}EXP: " + player.experience + "/" + (LEVEL_UP_BASE + player.level * LEVEL_UP_FACTOR));
};

const showSelectionMenu = function(header, options, width) {
    if (options.length > 26) {
        console.error("too many options");
        return;
    }

    const aCode = "a".charCodeAt(0);

    // add four for header
    const height = options.length + UI_HEIGHT;
    
    // draw background
    for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
            if (w === 0 || h === 0 || w === width - 1 || h === height - 1) {
                Game.display.draw(w, h, "1", "grey", "grey");
            } else {
                Game.display.draw(w, h, "1", "black", "black");
            }
        }
    }

    Game.display.drawText(2, 1, "%c{white}%b{black}" + header);
    for (let i = 0; i < options.length; i++) {
         Game.display.drawText(
             2, i + 3,
            "%c{white}%b{black}" + String.fromCharCode(i + aCode) + ": " + options[i]
         );
    }
};

const showKeyBindingMenu = function() {
    // add one for header
    const height = 16;
    const width = WIDTH;

    // draw background
    for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
            if (w === 0 || h === 0 || w === width - 1 || h === height - 1) {
                Game.display.draw(w, h, "1", "grey", "grey");
            } else {
                Game.display.draw(w, h, "1", "black", "black");
            }
        }
    }

    Game.display.drawText(2, 1, "%c{white}%b{black} Keyboard Bindings");
    Game.display.drawText(2, 3, "%c{white}%b{black} Click on an option to change it");

    let commands = Object.keys(keyCommandMap);
    for (let i = 0; i < commands.length; i++) {
        let key = commands[i];
        Game.display.drawText(
            2, i + 5,
            "%c{white}%b{black} " + keyCommandMap[key][0] + ": " + key
        );
    }
};

const clearScreen = function (display) {
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            display.draw(x, y, MAP_EMPTY_SPACE, 'black', 'black');
        }
    }
}
