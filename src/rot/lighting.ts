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

import FOV from "./fov/fov";
import * as Color from "./color";

type LightColor = [number, number, number];

/** Callback to retrieve cell reflectivity (0..1) */
interface ReflectivityCallback { (x:number, y:number ): number }

/** Will be called for every lit cell */
interface LightingCallback { (x:number, y:number, color: LightColor ): void }

interface LightingMap { [key:string]: LightColor }
interface NumberMap { [key:string]: number }

interface Options {
    /** Number of passes. 1 equals to simple FOV of all light sources, >1 means a *highly simplified* radiosity-like algorithm. Default = 1 */
    passes: number,
    /** Cells with emissivity > threshold will be treated as light source in the next pass. Default = 100 */
    emissionThreshold: number,
    /** Max light range, default = 10 */
    range: number
}

/**
 * Lighting computation, based on a traditional FOV for multiple light sources and multiple passes.
 */
export default class Lighting {
    private _reflectivityCallback: ReflectivityCallback;
    private _options!: Options;
    private _fov!: FOV;
    private _lights: LightingMap;
    private _reflectivityCache: NumberMap;
    private _fovCache: { [key:string]: NumberMap };

    constructor(reflectivityCallback: ReflectivityCallback, options: Partial<Options> = {}) {
        this._reflectivityCallback = reflectivityCallback;
        this._options = {} as Options;
        options = Object.assign({
            passes: 1,
            emissionThreshold: 100,
            range: 10
        }, options);

        this._lights = {};
        this._reflectivityCache = {};
        this._fovCache = {};

        this.setOptions(options);
    }

    /**
     * Adjust options at runtime
     */
    setOptions(options: Partial<Options>) {
        Object.assign(this._options, options);
        if (options?.range) { this.reset(); }
        return this;
    }

    /**
     * Set the used Field-Of-View algo
     */
    setFOV(fov: FOV) {
        this._fov = fov;
        this._fovCache = {};
        return this;
    }

    /**
     * Set (or remove) a light source
     */
    setLight(x: number, y: number, color: null | string | LightColor) {
        const key = x + "," + y;

        if (color) {
            this._lights[key] = (typeof(color) === "string" ? Color.fromString(color) as LightColor : color);
        } else {
            delete this._lights[key];
        }
        return this;
    }

    /**
     * Remove all light sources
     */
    clearLights() { this._lights = {}; }

    /**
     * Reset the pre-computed topology values. Call whenever the underlying map changes its light-passability.
     */
    reset() {
        this._reflectivityCache = {};
        this._fovCache = {};

        return this;
    }

    /**
     * Compute the lighting
     */
    compute(lightingCallback: LightingCallback) {
        const doneCells: {[key:string]:number} = {};
        let emittingCells: LightingMap = {};
        const litCells: LightingMap = {};

        for (const key in this._lights) { /* prepare emitters for first pass */
            const light = this._lights[key];
            emittingCells[key] = [0, 0, 0];
            Color.add_(emittingCells[key], light);
        }

        for (let i=0;i<this._options.passes;i++) { /* main loop */
            this._emitLight(emittingCells, litCells, doneCells);
            if (i+1 === this._options.passes) { continue; } /* not for the last pass */
            emittingCells = this._computeEmitters(litCells, doneCells);
        }

        for (const litKey in litCells) { /* let the user know what and how is lit */
            const parts = litKey.split(",");
            const x = parseInt(parts[0]);
            const y = parseInt(parts[1]);
            lightingCallback(x, y, litCells[litKey]);
        }

        return this;
    }

    /**
     * Compute one iteration from all emitting cells
     * @param emittingCells These emit light
     * @param litCells Add projected light to these
     * @param doneCells These already emitted, forbid them from further calculations
     */
    private _emitLight(
        emittingCells: LightingMap,
        litCells: LightingMap,
        doneCells: {[key:string]:number}
    ) {
        for (const key in emittingCells) {
            const parts = key.split(",");
            const x = parseInt(parts[0]);
            const y = parseInt(parts[1]);
            this._emitLightFromCell(x, y, emittingCells[key], litCells);
            doneCells[key] = 1;
        }
        return this;
    }

    /**
     * Prepare a list of emitters for next pass
     */
    private _computeEmitters(litCells: LightingMap, doneCells: {[key:string]:number}) {
        const result: LightingMap = {};

        for (const key in litCells) {
            if (key in doneCells) { continue; } /* already emitted */

            const color = litCells[key];

            let reflectivity;
            if (key in this._reflectivityCache) {
                reflectivity = this._reflectivityCache[key];
            } else {
                const parts = key.split(",");
                const x = parseInt(parts[0]);
                const y = parseInt(parts[1]);
                reflectivity = this._reflectivityCallback(x, y);
                this._reflectivityCache[key] = reflectivity;
            }

            if (reflectivity === 0) { continue; } /* will not reflect at all */

            /* compute emission color */
            const emission: LightColor = [0, 0, 0];
            let intensity = 0;
            for (let i=0;i<3;i++) {
                const part = Math.round(color[i]*reflectivity);
                emission[i] = part;
                intensity += part;
            }
            if (intensity > this._options.emissionThreshold) { result[key] = emission; }
        }

        return result;
    }

    /**
     * Compute one iteration from one cell
     */
    private _emitLightFromCell(x: number, y: number, color: LightColor, litCells: LightingMap) {
        const key = x+","+y;
        let fov : NumberMap;
        if (key in this._fovCache) {
            fov = this._fovCache[key];
        } else {
            fov = this._updateFOV(x, y);
        }

        for (const fovKey in fov) {
            const formFactor = fov[fovKey];

            let result : LightColor;
            if (fovKey in litCells) { /* already lit */
                result = litCells[fovKey];
            } else { /* newly lit */
                result = [0, 0, 0];
                litCells[fovKey] = result;
            }

            for (let i=0;i<3;i++) { result[i] += Math.round(color[i]*formFactor); } /* add light color */
        }

        return this;
    }

    /**
     * Compute FOV ("form factor") for a potential light source at [x,y]
     */
    private _updateFOV(x: number, y: number) {
        const key1 = x+","+y;
        const cache: NumberMap = {};
        this._fovCache[key1] = cache;
        const range = this._options.range;
        function cb(x: number, y: number, r: number, vis: number) {
            const key2 = x+","+y;
            const formFactor = vis * (1-r/range);
            if (formFactor === 0) { return; }
            cache[key2] = formFactor;
        }
        this._fov.compute(x, y, range, cb.bind(this));

        return cache;
    }
}
