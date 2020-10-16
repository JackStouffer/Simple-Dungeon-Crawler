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
import { DisplayOptions, DisplayData } from "./types";

/**
 * @class Rectangular backend
 * @private
 */
export default class Rect extends Canvas {
	_spacingX: number;
	_spacingY: number;
	_canvasCache: {[key:string]: HTMLCanvasElement};
	_options!: DisplayOptions;

	static cache = false;

	constructor() {
		super();
		this._spacingX = 0;
		this._spacingY = 0;
		this._canvasCache = {};
	}

	setOptions(options: DisplayOptions) {
		super.setOptions(options);
		this._canvasCache = {};
	}

	draw(data: DisplayData, clearBefore: boolean) {
		if (Rect.cache) {
			this._drawWithCache(data);
		} else {
			this._drawNoCache(data, clearBefore);
		}
	}

	_drawWithCache(data: DisplayData) {
		let [x, y, ch, fg, bg] = data;

		let hash = ""+ch+fg+bg;
		let canvas;
		if (hash in this._canvasCache) {
			canvas = this._canvasCache[hash];
		} else {
			let b = this._options.border;
			canvas = document.createElement("canvas");
			let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
			canvas.width = this._spacingX;
			canvas.height = this._spacingY;
			ctx.fillStyle = bg;
			ctx.fillRect(b, b, canvas.width-b, canvas.height-b);
			
			if (ch) {
				ctx.fillStyle = fg;
				ctx.font = this._ctx.font;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";

				let chars = ([] as string[]).concat(ch);
				for (let i=0;i<chars.length;i++) {
					ctx.fillText(chars[i], this._spacingX/2, Math.ceil(this._spacingY/2));
				}
			}
			this._canvasCache[hash] = canvas;
		}
		
		this._ctx.drawImage(canvas, x*this._spacingX, y*this._spacingY);
	}

	_drawNoCache(data: DisplayData, clearBefore: boolean) {
		let [x, y, ch, fg, bg] = data;

		if (clearBefore) { 
			let b = this._options.border;
			this._ctx.fillStyle = bg;
			this._ctx.fillRect(x*this._spacingX + b, y*this._spacingY + b, this._spacingX - b, this._spacingY - b);
		}
		
		if (!ch) { return; }

		this._ctx.fillStyle = fg;

		let chars = ([] as string[]).concat(ch);
		for (let i=0;i<chars.length;i++) {
			this._ctx.fillText(chars[i], (x+0.5) * this._spacingX, Math.ceil((y+0.5) * this._spacingY));
		}
	}

	computeSize(availWidth: number, availHeight: number): [number, number] {
		let width = Math.floor(availWidth / this._spacingX);
		let height = Math.floor(availHeight / this._spacingY);
		return [width, height];
	}

	computeFontSize(availWidth: number, availHeight: number) {
		let boxWidth = Math.floor(availWidth / this._options.width);
		let boxHeight = Math.floor(availHeight / this._options.height);

		/* compute char ratio */
		let oldFont = this._ctx.font;
		this._ctx.font = "100px " + this._options.fontFamily;
		let width = Math.ceil(this._ctx.measureText("W").width);
		this._ctx.font = oldFont;
		let ratio = width / 100;
			
		let widthFraction = ratio * boxHeight / boxWidth;
		if (widthFraction > 1) { /* too wide with current aspect ratio */
			boxHeight = Math.floor(boxHeight / widthFraction);
		}
		return Math.floor(boxHeight / this._options.spacing);
	}

	_normalizedEventToPosition(x:number, y:number): [number, number] {
		return [Math.floor(x/this._spacingX), Math.floor(y/this._spacingY)];
	}

	_updateSize() {
		const opts = this._options;
		const charWidth = Math.ceil(this._ctx.measureText("W").width);
		this._spacingX = Math.ceil(opts.spacing * charWidth);
		this._spacingY = Math.ceil(opts.spacing * opts.fontSize);

		if (opts.forceSquareRatio) {
			this._spacingX = this._spacingY = Math.max(this._spacingX, this._spacingY);
		}

		this._ctx.canvas.width = opts.width * this._spacingX;
		this._ctx.canvas.height = opts.height * this._spacingY;
	}
}
