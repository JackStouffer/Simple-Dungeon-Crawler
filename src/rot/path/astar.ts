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
    x: number;
    y: number;
    g: number;
    h: number;
    prev: Item | null;
}

/**
 * @class Simplified A* algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
export default class AStar extends Path {
    _todo: Item[];
    _done: {[key:string]: Item};
    _fromX!: number;
    _fromY!: number;

    constructor(
        toX: number,
        toY: number,
        passableCallback: PassableCallback,
        options: Partial<Options> = {}
    ) {
        super(toX, toY, passableCallback, options);

        this._todo = [];
        this._done = {};
    }

    /**
     * Compute a path from a given point
     * @see ROT.Path#compute
     */
    compute(fromX: number, fromY: number, callback: ComputeCallback) {
        this._todo = [];
        this._done = {};
        this._fromX = fromX;
        this._fromY = fromY;
        this._add(this._toX, this._toY, null);

        while (this._todo.length > 0) {
            const item = this._todo.shift() as Item;
            const id = item.x + "," + item.y;
            if (id in this._done) { continue; }
            this._done[id] = item;
            if (item.x === fromX && item.y === fromY) { break; }

            const neighbors = this._getNeighbors(item.x, item.y);

            for (let i = 0; i < neighbors.length; i++) {
                const neighbor = neighbors[i];
                const x = neighbor[0];
                const y = neighbor[1];
                const id = x + "," + y;
                if (id in this._done) { continue; }
                this._add(x, y, item);
            }
        }

        let item: Item | null = this._done[fromX+","+fromY];
        if (item === null) { return; }

        while (item !== null) {
            callback(item.x, item.y);
            item = item.prev;
        }
    }

    _add(x: number, y: number, prev: Item | null) {
        const h = this._distance(x, y);
        const obj = {
            x: x,
            y: y,
            prev: prev,
            g: (prev !== null ? prev.g + 1 : 0),
            h: h
        };

        /* insert into priority queue */

        const f = obj.g + obj.h;
        for (let i=0; i < this._todo.length; i++) {
            const item = this._todo[i];
            const itemF = item.g + item.h;
            if (f < itemF || (f === itemF && h < item.h)) {
                this._todo.splice(i, 0, obj);
                return;
            }
        }

        this._todo.push(obj);
    }

    _distance(x: number, y: number): number {
        const dx = Math.abs(x - this._fromX);
        const dy = Math.abs(y - this._fromY);

        switch (this._options.topology) {
            case 4:
                return (Math.abs(x-this._fromX) + Math.abs(y-this._fromY));

            case 6:
                return dy + Math.max(0, (dx-dy)/2);

            case 8:
                return Math.max(Math.abs(x-this._fromX), Math.abs(y-this._fromY));

            default:
                return 0;
        }
    }
}
