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

import Path, { ComputeCallback, PassableCallback, Options } from "./path";

interface Item {
    x: number,
    y: number,
    prev: Item | null
}

/**
 * @class Simplified Dijkstra's algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
export default class Dijkstra extends Path {
    _computed: {[key:string]: Item};
    _todo: Item[];

    constructor(
        toX: number,
        toY: number,
        passableCallback: PassableCallback,
        options: Partial<Options>
    ) {
        super(toX, toY, passableCallback, options);

        this._computed = {};
        this._todo = [];
        this._add(toX, toY, null);
    }

    /**
     * Compute a path from a given point
     * @see ROT.Path#compute
     */
    compute(fromX: number, fromY: number, callback: ComputeCallback) {
        const key = fromX + "," + fromY;
        if (!(key in this._computed)) { this._compute(fromX, fromY); }
        if (!(key in this._computed)) { return; }

        let item: Item | null = this._computed[key];
        while (item !== null) {
            callback(item.x, item.y);
            item = item.prev;
        }
    }

    /**
     * Compute a non-cached value
     */
    _compute(fromX: number, fromY: number) {
        while (this._todo.length > 0) {
            const item = this._todo.shift() as Item;
            if (item.x === fromX && item.y === fromY) { return; }

            const neighbors = this._getNeighbors(item.x, item.y);

            for (let i=0;i<neighbors.length;i++) {
                const neighbor = neighbors[i];
                const x = neighbor[0];
                const y = neighbor[1];
                const id = x + "," + y;
                if (id in this._computed) { continue; } /* already done */
                this._add(x, y, item);
            }
        }
    }

    _add(x: number, y: number, prev: Item | null) {
        const obj = {
            x: x,
            y: y,
            prev: prev
        };
        this._computed[x + "," + y] = obj;
        this._todo.push(obj);
    }
}
