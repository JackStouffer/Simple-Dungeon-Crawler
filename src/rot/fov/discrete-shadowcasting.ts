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

import FOV, { VisibilityCallback } from "./fov";

/**
 * @class Discrete shadowcasting algorithm. Obsoleted by Precise shadowcasting.
 * @augments ROT.FOV
 */
export default class DiscreteShadowcasting extends FOV {
	compute(x: number, y: number, R: number, callback: VisibilityCallback) {
		/* this place is always visible */
		callback(x, y, 0, 1);

		/* standing in a dark place. FIXME is this a good idea?  */
		if (!this._lightPasses(x, y)) { return; }
		
		/* start and end angles */
		let DATA: number[] = [];
		
		let A, B, cx, cy, blocks;

		/* analyze surrounding cells in concentric rings, starting from the center */
		for (let r=1; r<=R; r++) {
			let neighbors = this._getCircle(x, y, r);
			let angle = 360 / neighbors.length;

			for (let i=0;i<neighbors.length;i++) {
				cx = neighbors[i][0];
				cy = neighbors[i][1];
				A = angle * (i - 0.5);
				B = A + angle;
				
				blocks = !this._lightPasses(cx, cy);
				if (this._visibleCoords(Math.floor(A), Math.ceil(B), blocks, DATA)) { callback(cx, cy, r, 1); }
				
				if (DATA.length == 2 && DATA[0] == 0 && DATA[1] == 360) { return; } /* cutoff? */

			} /* for all cells in this ring */
		} /* for all rings */
	}

	/**
	 * @param {int} A start angle
	 * @param {int} B end angle
	 * @param {bool} blocks Does current cell block visibility?
	 * @param {int[][]} DATA shadowed angle pairs
	 */
	_visibleCoords(A: number, B: number, blocks: boolean, DATA: number[]): boolean {
		if (A < 0) { 
			let v1 = this._visibleCoords(0, B, blocks, DATA);
			let v2 = this._visibleCoords(360+A, 360, blocks, DATA);
			return v1 || v2;
		}
		
		let index = 0;
		while (index < DATA.length && DATA[index] < A) { index++; }
		
		if (index == DATA.length) { /* completely new shadow */
			if (blocks) { DATA.push(A, B); } 
			return true;
		}
		
		let count = 0;
		
		if (index % 2) { /* this shadow starts in an existing shadow, or within its ending boundary */
			while (index < DATA.length && DATA[index] < B) {
				index++;
				count++;
			}
			
			if (count == 0) { return false; }
			
			if (blocks) { 
				if (count % 2) {
					DATA.splice(index-count, count, B);
				} else {
					DATA.splice(index-count, count);
				}
			}
			
			return true;

		} else { /* this shadow starts outside an existing shadow, or within a starting boundary */
			while (index < DATA.length && DATA[index] < B) {
				index++;
				count++;
			}
			
			/* visible when outside an existing shadow, or when overlapping */
			if (A == DATA[index-count] && count == 1) { return false; }
			
			if (blocks) { 
				if (count % 2) {
					DATA.splice(index-count, count, A);
				} else {
					DATA.splice(index-count, count, A, B);
				}
			}
				
			return true;
		}
	}
}
