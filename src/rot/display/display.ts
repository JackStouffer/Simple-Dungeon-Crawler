/**!
 * Copyright (c) 2012-now(), Ondrej Zara
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * 	* Redistributions of source code must retain the above copyright notice,
 * 	  this list of conditions and the following disclaimer.
 * 	* Redistributions in binary form must reproduce the above copyright notice,
 * 	  this list of conditions and the following disclaimer in the documentation
 * 	  and/or other materials provided with the distribution.
 * 	* Neither the name of Ondrej Zara nor the names of its contributors may be used
 * 	  to endorse or promote products derived from this software without specific
 * 	  prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import Backend from "./backend";
import Hex from "./hex";
import Rect from "./rect";
import Tile from "./tile";
import TileGL from "./tile-gl";
import Term from "./term";

import * as Text from "../text";
import { DisplayOptions, DisplayData } from "./types";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from "../constants";

const BACKENDS = {
    "hex": Hex,
    "rect": Rect,
    "tile": Tile,
    "tile-gl": TileGL,
    "term": Term
};

const DEFAULT_OPTIONS: DisplayOptions = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    transpose: false,
    layout: "rect",
    fontSize: 15,
    spacing: 1,
    border: 0,
    forceSquareRatio: false,
    fontFamily: "monospace",
    fontStyle: "",
    fg: "#ccc",
    bg: "#000",
    tileWidth: 32,
    tileHeight: 32,
    tileMap: {},
    tileSet: null,
    tileColorize: false
};

/**
 * @class Visual map display
 */
export default class Display {
    _data: { [pos:string] : DisplayData };
    _dirty: boolean | { [pos: string]: boolean };
    _options!: DisplayOptions;
    _backend!: Backend;

    static Rect = Rect;
    static Hex = Hex;
    static Tile = Tile;
    static TileGL = TileGL;
    static Term = Term;

    constructor(options: Partial<DisplayOptions> = {}) {
        this._data = {};
        this._dirty = false; // false = nothing, true = all, object = dirty cells
        this._options = {} as DisplayOptions;

        options = Object.assign({}, DEFAULT_OPTIONS, options);
        this.setOptions(options);
        this.DEBUG = this.DEBUG.bind(this);

        this._tick = this._tick.bind(this);
        this._backend.schedule(this._tick);
    }

    /**
     * Debug helper, ideal as a map generator callback. Always bound to this.
     * @param {int} x
     * @param {int} y
     * @param {int} what
     */
    DEBUG(x: number, y: number, what: number) {
        const colors = [this._options.bg, this._options.fg];
        this.draw(x, y, null, null, colors[what % colors.length]);
    }

    /**
     * Clear the whole display (cover it with background color)
     */
    clear() {
        this._data = {};
        this._dirty = true;
    }

    /**
     * @see ROT.Display
     */
    setOptions(options: Partial<DisplayOptions>) {
        Object.assign(this._options, options);

        if (options.width || options.height || options.fontSize ||
            options.fontFamily || options.spacing || options.layout) {
            if (options.layout) {
                const ctor = BACKENDS[options.layout];
                this._backend = new ctor();
            }

            this._backend.setOptions(this._options);
            this._dirty = true;
        }
        return this;
    }

    /**
     * Returns currently set options
     */
    getOptions() { return this._options; }

    /**
     * Returns the DOM node of this display
     */
    getContainer() { return this._backend.getContainer(); }

    /**
     * Compute the maximum width/height to fit into a set of given constraints
     * @param {int} availWidth Maximum allowed pixel width
     * @param {int} availHeight Maximum allowed pixel height
     * @returns {int[2]} cellWidth,cellHeight
     */
    computeSize(availWidth: number, availHeight: number) {
        return this._backend.computeSize(availWidth, availHeight);
    }

    /**
     * Compute the maximum font size to fit into a set of given constraints
     * @param {int} availWidth Maximum allowed pixel width
     * @param {int} availHeight Maximum allowed pixel height
     * @returns {int} fontSize
     */
    computeFontSize(availWidth: number, availHeight: number) {
        return this._backend.computeFontSize(availWidth, availHeight);
    }

    computeTileSize(availWidth: number, availHeight: number) {
        const width = Math.floor(availWidth / this._options.width);
        const height = Math.floor(availHeight / this._options.height);
        return [width, height];
    }

    /**
     * Convert a DOM event (mouse or touch) to map coordinates. Uses first touch for multi-touch.
     * @param {Event} e event
     * @returns {int[2]} -1 for values outside of the canvas
     */
    eventToPosition(e: TouchEvent | MouseEvent) {
        let x, y;
        if ("touches" in e) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }

        return this._backend.eventToPosition(x, y);
    }

    /**
     * @param {int} x
     * @param {int} y
     * @param {string || string[]} ch One or more chars (will be overlapping themselves)
     * @param {string} [fg] foreground color
     * @param {string} [bg] background color
     */
    draw(x: number, y: number, ch: string | string[] | null, fg: string | null, bg: string | null) {
        if (!fg) { fg = this._options.fg; }
        if (!bg) { bg = this._options.bg; }
        const key = `${x},${y}`;
        this._data[key] = [x, y, ch, fg, bg];

        if (this._dirty === true) { return; } // will already redraw everything
        if (!this._dirty) { this._dirty = {}; } // first!
        this._dirty[key] = true;
    }

    /**
     * Draws a text at given position. Optionally wraps at a maximum length. Currently does not work with hex layout.
     * @param {int} x
     * @param {int} y
     * @param {string} text May contain color/background format specifiers, %c{name}/%b{name}, both optional. %c{}/%b{} resets to default.
     * @param {int} [maxWidth] wrap at what width?
     * @returns {int} lines drawn
     */
    drawText(x:number, y:number, text:string, maxWidth?:number) {
        let fg = null;
        let bg = null;
        let cx = x;
        let cy = y;
        let lines = 1;
        if (!maxWidth) { maxWidth = this._options.width-x; }

        const tokens = Text.tokenize(text, maxWidth);

        while (tokens.length) { // interpret tokenized opcode stream
            const token = tokens.shift();
            let isSpace = false,
                isPrevSpace = false,
                isFullWidth = false,
                isPrevFullWidth = false;

            switch (token.type) {
                case Text.TYPE_TEXT:
                    for (let i=0;i<token.value.length;i++) {
                        const cc = token.value.charCodeAt(i);
                        const c = token.value.charAt(i);
                        if (this._options.layout === "term") {
                            const cch = cc >> 8;
                            const isCJK = cch === 0x11 ||
                                (cch >= 0x2e && cch <= 0x9f) ||
                                (cch >= 0xac && cch <= 0xd7) ||
                                (cc >= 0xA960 && cc <= 0xA97F);
                            if (isCJK) {
                                this.draw(cx + 0, cy, c, fg, bg);
                                this.draw(cx + 1, cy, "\t", fg, bg);
                                cx += 2;
                                continue;
                            }
                        }

                        // Assign to `true` when the current char is full-width.
                        isFullWidth = (cc > 0xff00 && cc < 0xff61) ||
                            (cc > 0xffdc && cc < 0xffe8) ||
                            cc > 0xffee;
                        // Current char is space, whatever full-width or half-width both are OK.
                        isSpace = (c.charCodeAt(0) === 0x20 || c.charCodeAt(0) === 0x3000);
                        // The previous char is full-width and
                        // current char is nether half-width nor a space.
                        if (isPrevFullWidth && !isFullWidth && !isSpace) { cx++; } // add an extra position
                        // The current char is full-width and
                        // the previous char is not a space.
                        if(isFullWidth && !isPrevSpace) { cx++; } // add an extra position
                        this.draw(cx++, cy, c, fg, bg);
                        isPrevSpace = isSpace;
                        isPrevFullWidth = isFullWidth;
                    }
                    break;

                case Text.TYPE_FG:
                    fg = token.value || null;
                    break;

                case Text.TYPE_BG:
                    bg = token.value || null;
                    break;

                case Text.TYPE_NEWLINE:
                    cx = x;
                    cy++;
                    lines++;
                    break;

                default:
                    throw new Error("Unknown text type");
            }
        }

        return lines;
    }

    /**
     * Timer tick: update dirty parts
     */
    _tick() {
        this._backend.schedule(this._tick);

        if (!this._dirty) { return; }

        if (this._dirty === true) { // draw all
            this._backend.clear();
            for (const id in this._data) {
                // redraw cached data
                this._draw(id, false);
            }
        } else {
            // draw only dirty
            for (const key in this._dirty) {
                this._draw(key, true);
            }
        }

        this._dirty = false;
    }

    /**
     * @param {string} key What to draw
     * @param {bool} clearBefore Is it necessary to clean before?
     */
    _draw(key: string, clearBefore: boolean) {
        const data = this._data[key];
        if (data[4] !== this._options.bg) { clearBefore = true; }

        this._backend.draw(data, clearBefore);
    }
}
