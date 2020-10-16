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

/**
 * @class Tile backend
 * @private
 */
export default class Tile extends Canvas {
	_colorCanvas: HTMLCanvasElement;

	constructor() {
		super();
		this._colorCanvas = document.createElement("canvas");
	}

	draw(data: DisplayData, clearBefore: boolean) {
		let [x, y, ch, fg, bg] = data;

		let tileWidth = this._options.tileWidth;
		let tileHeight = this._options.tileHeight;

		if (clearBefore) {
			if (this._options.tileColorize) {
				this._ctx.clearRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
			} else {
				this._ctx.fillStyle = bg;
				this._ctx.fillRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
			}
		}

		if (!ch) { return; }

		let chars = ([] as string[]).concat(ch);
		let fgs = ([] as string[]).concat(fg);
		let bgs = ([] as string[]).concat(bg);

		for (let i=0;i<chars.length;i++) {
			let tile = this._options.tileMap[chars[i]];
			if (!tile) { throw new Error(`Char "${chars[i]}" not found in tileMap`); }
			
			if (this._options.tileColorize) { // apply colorization
				let canvas = this._colorCanvas;
				let context = canvas.getContext("2d") as CanvasRenderingContext2D;
				context.globalCompositeOperation = "source-over";
				context.clearRect(0, 0, tileWidth, tileHeight);

				let fg = fgs[i];
				let bg = bgs[i];

				context.drawImage(
					this._options.tileSet!,
					tile[0], tile[1], tileWidth, tileHeight,
					0, 0, tileWidth, tileHeight
				);

				if (fg != "transparent") {
					context.fillStyle = fg;
					context.globalCompositeOperation = "source-atop";
					context.fillRect(0, 0, tileWidth, tileHeight);
				}

				if (bg != "transparent") {
					context.fillStyle = bg;
					context.globalCompositeOperation = "destination-over";
					context.fillRect(0, 0, tileWidth, tileHeight);
				}

				this._ctx.drawImage(canvas, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
			} else { // no colorizing, easy
				this._ctx.drawImage(
					this._options.tileSet!,
					tile[0], tile[1], tileWidth, tileHeight,
					x*tileWidth, y*tileHeight, tileWidth, tileHeight
				);
			}
		}
	}

	computeSize(availWidth: number, availHeight: number): [number, number] {
		let width = Math.floor(availWidth / this._options.tileWidth);
		let height = Math.floor(availHeight / this._options.tileHeight);
		return [width, height];
	}

	computeFontSize(): number {
		throw new Error("Tile backend does not understand font size");
	}

	_normalizedEventToPosition(x:number, y:number): [number, number] {
		return [Math.floor(x/this._options.tileWidth), Math.floor(y/this._options.tileHeight)];
	}

	_updateSize() {
		const opts = this._options;
		this._ctx.canvas.width = opts.width * opts.tileWidth;
		this._ctx.canvas.height = opts.height * opts.tileHeight;
		this._colorCanvas.width = opts.tileWidth;
		this._colorCanvas.height = opts.tileHeight;
	}
}
