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

import { DIRS } from "../constants";

export interface LightPassesCallback { (x: number, y: number): boolean };

export interface VisibilityCallback { (x: number, y: number, r: number, visibility: number): void };

export interface Options {
	topology: 4 | 6 | 8
}

export default abstract class FOV {
	_lightPasses: LightPassesCallback;
	_options: Options;

	/**
	 * @class Abstract FOV algorithm
	 * @param {function} lightPassesCallback Does the light pass through x,y?
	 * @param {object} [options]
	 * @param {int} [options.topology=8] 4/6/8
	 */
	constructor(lightPassesCallback: LightPassesCallback, options: Partial<Options> = {}) {
		this._lightPasses = lightPassesCallback;
		this._options = Object.assign({topology: 8}, options);
	}

	/**
	 * Compute visibility for a 360-degree circle
	 * @param {int} x
	 * @param {int} y
	 * @param {int} R Maximum visibility radius
	 * @param {function} callback
	 */
	abstract compute(x: number, y: number, R: number, callback: VisibilityCallback): void;

	/**
	 * Return all neighbors in a concentric ring
	 * @param {int} cx center-x
	 * @param {int} cy center-y
	 * @param {int} r range
	 */
	_getCircle(cx: number, cy: number, r: number) {
		let result = [];
		let dirs, countFactor, startOffset;

		switch (this._options.topology) {
			case 4:
				countFactor = 1;
				startOffset = [0, 1];
				dirs = [
					DIRS[8][7],
					DIRS[8][1],
					DIRS[8][3],
					DIRS[8][5]
				];
			break;

			case 6:
				dirs = DIRS[6];
				countFactor = 1;
				startOffset = [-1, 1];
			break;

			case 8:
				dirs = DIRS[4];
				countFactor = 2;
				startOffset = [-1, 1];
			break;

			default:
				throw new Error("Incorrect topology for FOV computation");
			break;
		}

		/* starting neighbor */
		let x = cx + startOffset[0]*r;
		let y = cy + startOffset[1]*r;

		/* circle */
		for (let i=0;i<dirs.length;i++) {
			for (let j=0;j<r*countFactor;j++) {
				result.push([x, y]);
				x += dirs[i][0];
				y += dirs[i][1];

			}
		}

		return result;
	}
}
