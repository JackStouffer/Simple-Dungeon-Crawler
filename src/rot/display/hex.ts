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

import Canvas from "./canvas";
import { DisplayData } from "./types";
import { mod } from "../util";

/**
 * @class Hexagonal backend
 * @private
 */
export default class Hex extends Canvas {
    _spacingX: number;
    _spacingY: number;
    _hexSize: number;

    constructor() {
        super();
        this._spacingX = 0;
        this._spacingY = 0;
        this._hexSize = 0;
    }

    draw(data: DisplayData, clearBefore: boolean) {
        const [x, y, ch, fg, bg] = data;

        const px = [
            (x+1) * this._spacingX,
            y * this._spacingY + this._hexSize
        ];
        if (this._options.transpose) { px.reverse(); }

        if (clearBefore) {
            this._ctx.fillStyle = bg;
            this._fill(px[0], px[1]);
        }

        if (!ch) { return; }

        this._ctx.fillStyle = fg;

        const chars = ([] as string[]).concat(ch);
        for (let i=0;i<chars.length;i++) {
            this._ctx.fillText(chars[i], px[0], Math.ceil(px[1]));
        }
    }

    computeSize(availWidth: number, availHeight: number): [number, number] {
        if (this._options.transpose) {
            availWidth += availHeight;
            availHeight = availWidth - availHeight;
            availWidth -= availHeight;
        }

        const width = Math.floor(availWidth / this._spacingX) - 1;
        const height = Math.floor((availHeight - 2*this._hexSize) / this._spacingY + 1);
        return [width, height];
    }

    computeFontSize(availWidth: number, availHeight: number) {
        if (this._options.transpose) {
            availWidth += availHeight;
            availHeight = availWidth - availHeight;
            availWidth -= availHeight;
        }

        const hexSizeWidth = 2*availWidth / ((this._options.width+1) * Math.sqrt(3)) - 1;
        const hexSizeHeight = availHeight / (2 + 1.5*(this._options.height-1));
        let hexSize = Math.min(hexSizeWidth, hexSizeHeight);

        // compute char ratio
        const oldFont = this._ctx.font;
        this._ctx.font = "100px " + this._options.fontFamily;
        const width = Math.ceil(this._ctx.measureText("W").width);
        this._ctx.font = oldFont;
        const ratio = width / 100;

        hexSize = Math.floor(hexSize)+1; // closest larger hexSize

        // FIXME char size computation does not respect transposed hexes
        const fontSize = 2*hexSize / (this._options.spacing * (1 + ratio / Math.sqrt(3)));

        // closest smaller fontSize
        return Math.ceil(fontSize)-1;
    }

    _normalizedEventToPosition(x: number, y: number): [number, number] {
        let nodeSize;
        if (this._options.transpose) {
            x += y;
            y = x-y;
            x -= y;
            nodeSize = this._ctx.canvas.width;
        } else {
            nodeSize = this._ctx.canvas.height;
        }
        const size = nodeSize / this._options.height;
        y = Math.floor(y/size);

        if (mod(y, 2)) { /* odd row */
            x -= this._spacingX;
            x = 1 + 2*Math.floor(x/(2*this._spacingX));
        } else {
            x = 2*Math.floor(x/(2*this._spacingX));
        }

        return [x, y];
    }

    /**
     * Arguments are pixel values. If "transposed" mode is enabled, then these two are already swapped.
     */
    _fill(cx: number, cy: number) {
        const a = this._hexSize;
        const b = this._options.border;
        const ctx = this._ctx;

        ctx.beginPath();

        if (this._options.transpose) {
            ctx.moveTo(cx-a+b,		cy);
            ctx.lineTo(cx-a/2+b,	cy+this._spacingX-b);
            ctx.lineTo(cx+a/2-b,	cy+this._spacingX-b);
            ctx.lineTo(cx+a-b,		cy);
            ctx.lineTo(cx+a/2-b,	cy-this._spacingX+b);
            ctx.lineTo(cx-a/2+b,	cy-this._spacingX+b);
            ctx.lineTo(cx-a+b,		cy);
        } else {
            ctx.moveTo(cx,					cy-a+b);
            ctx.lineTo(cx+this._spacingX-b,	cy-a/2+b);
            ctx.lineTo(cx+this._spacingX-b,	cy+a/2-b);
            ctx.lineTo(cx,					cy+a-b);
            ctx.lineTo(cx-this._spacingX+b,	cy+a/2-b);
            ctx.lineTo(cx-this._spacingX+b,	cy-a/2+b);
            ctx.lineTo(cx,					cy-a+b);
        }
        ctx.fill();
    }

    _updateSize() {
        const opts = this._options;
        const charWidth = Math.ceil(this._ctx.measureText("W").width);
        this._hexSize = Math.floor(opts.spacing * (opts.fontSize + charWidth/Math.sqrt(3)) / 2);
        this._spacingX = this._hexSize * Math.sqrt(3) / 2;
        this._spacingY = this._hexSize * 1.5;

        let xprop: "width" | "height";
        let yprop: "width" | "height";
        if (opts.transpose) {
            xprop = "height";
            yprop = "width";
        } else {
            xprop = "width";
            yprop = "height";
        }
        this._ctx.canvas[xprop] = Math.ceil( (opts.width + 1) * this._spacingX );
        this._ctx.canvas[yprop] = Math.ceil( (opts.height - 1) * this._spacingY + 2*this._hexSize );

    }
}
