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

/**
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */

const FRAC = 2.3283064365386963e-10; /* 2^-32 */

class RNG {
    _seed = 0;
    _s0 = 0;
    _s1 = 0;
    _s2 = 0;
    _c = 0;

    getSeed() { return this._seed; }

    /**
     * Seed the number generator
     */
    setSeed(seed: number) {
        seed = (seed < 1 ? 1/seed : seed);

        this._seed = seed;
        this._s0 = (seed >>> 0) * FRAC;

        seed = (seed*69069 + 1) >>> 0;
        this._s1 = seed * FRAC;

        seed = (seed*69069 + 1) >>> 0;
        this._s2 = seed * FRAC;

        this._c = 1;
        return this;
    }

    /**
     * @returns Pseudorandom value [0,1), uniformly distributed
     */
    getUniform() {
        const t = 2091639 * this._s0 + this._c * FRAC;
        this._s0 = this._s1;
        this._s1 = this._s2;
        this._c = t | 0;
        this._s2 = t - this._c;
        return this._s2;
    }

    /**
     * @param lowerBound The lower end of the range to return a value from, inclusive
     * @param upperBound The upper end of the range to return a value from, inclusive
     * @returns Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
     */
    getUniformInt(lowerBound: number, upperBound: number) {
        const max = Math.max(lowerBound, upperBound);
        const min = Math.min(lowerBound, upperBound);
        return Math.floor(this.getUniform() * (max - min + 1)) + min;
    }

    /**
     * @param mean Mean value
     * @param stddev Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
     * @returns A normally distributed pseudorandom value
     */
    getNormal(mean = 0, stddev = 1) {
        let u, v, r;
        do {
            u = 2*this.getUniform()-1;
            v = 2*this.getUniform()-1;
            r = u*u + v*v;
        } while (r > 1 || r === 0);

        const gauss = u * Math.sqrt(-2*Math.log(r)/r);
        return mean + gauss*stddev;
    }

    /**
     * @returns Pseudorandom value [1,100] inclusive, uniformly distributed
     */
    getPercentage() {
        return 1 + Math.floor(this.getUniform()*100);
    }

    /**
     * @returns Randomly picked item, null when length=0
     */
    getItem<T>(array: Array<T>) {
        if (!array.length) { return null; }
        return array[Math.floor(this.getUniform() * array.length)];
    }

    /**
     * @returns New array with randomized items
     */
    shuffle<T>(array: Array<T>) {
        const result = [];
        const clone = array.slice();
        while (clone.length) {
            const index = clone.indexOf(this.getItem(clone) as T);
            result.push(clone.splice(index, 1)[0]);
        }
        return result;
    }

    /**
     * @param data key=whatever, value=weight (relative probability)
     * @returns whatever
     */
    getWeightedValue(data: { [key: string]: number, [key: number]: number }) {
        let total = 0;

        for (const id in data) {
            total += data[id];
        }
        const random = this.getUniform()*total;

        let id, part = 0;
        for (id in data) {
            part += data[id];
            if (random < part) { return id; }
        }

        // If by some floating-point annoyance we have
        // random >= total, just return the last id.
        return id;
    }

    /**
     * Get RNG state. Useful for storing the state and re-setting it via setState.
     * @returns Internal state
     */
    getState() { return [this._s0, this._s1, this._s2, this._c]; }

    /**
     * Set a previously retrieved state.
     */
    setState(state: number[]) {
        this._s0 = state[0];
        this._s1 = state[1];
        this._s2 = state[2];
        this._c = state[3];
        return this;
    }

    /**
     * Returns a cloned RNG
     */
    clone() {
        const clone = new RNG();
        return clone.setState(this.getState());
    }
}

export default new RNG().setSeed(Date.now());
