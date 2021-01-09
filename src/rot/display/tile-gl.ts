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
import { DisplayOptions, DisplayData } from "./types";
import * as Color from "../color";

/**
 * @class Tile backend
 * @private
 */
export default class TileGL extends Backend {
    _gl!: WebGLRenderingContext;
    _program!: WebGLProgram;
    _uniforms: {[key:string]: WebGLUniformLocation | null};

    static isSupported(): boolean {
        return document.createElement("canvas").getContext("webgl2", {preserveDrawingBuffer:true}) !== null;
    }

    constructor() {
        super();
        this._uniforms = {};
        try {
            this._gl = this._initWebGL();
        } catch (e) {
            alert(e.message);
        }
    }

    getContainer() { return this._gl.canvas as HTMLCanvasElement; }

    setOptions(opts: DisplayOptions) {
        super.setOptions(opts);

        this._updateSize();

        const tileSet = this._options.tileSet;
        if (tileSet !== null && "complete" in tileSet && !tileSet.complete) {
            tileSet.addEventListener("load", () => this._updateTexture(tileSet as HTMLImageElement));
        } else {
            this._updateTexture(tileSet as HTMLImageElement);
        }
    }


    draw(data: DisplayData, clearBefore: boolean) {
        const gl = this._gl;
        const opts = this._options;
        const [x, y, ch, fg, bg] = data;

        const scissorY = gl.canvas.height - (y+1)*opts.tileHeight;
        gl.scissor(x*opts.tileWidth, scissorY, opts.tileWidth, opts.tileHeight);

        if (clearBefore) {
            if (opts.tileColorize === true) {
                gl.clearColor(0, 0, 0, 0);
            } else {
                gl.clearColor(...parseColor(bg));
            }
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        if (!ch) { return; }

        const chars = ([] as string[]).concat(ch);
        const bgs = ([] as string[]).concat(bg);
        const fgs = ([] as string[]).concat(fg);

        gl.uniform2fv(this._uniforms["targetPosRel"], [x, y]);

        for (let i = 0; i < chars.length; i++) {
            const tile = this._options.tileMap[chars[i]];
            if (tile === undefined) { throw new Error(`Char "${chars[i]}" not found in tileMap`); }

            gl.uniform1f(this._uniforms["colorize"], opts.tileColorize === true ? 1 : 0);
            gl.uniform2fv(this._uniforms["tilesetPosAbs"], tile);

            if (opts.tileColorize === true) {
                gl.uniform4fv(this._uniforms["tint"], parseColor(fgs[i]));
                gl.uniform4fv(this._uniforms["bg"], parseColor(bgs[i]));
            }

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
    }

    clear() {
        const gl = this._gl;

        gl.clearColor(...parseColor(this._options.bg));
        gl.scissor(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    computeSize(availWidth: number, availHeight: number): [number, number] {
        const width = Math.floor(availWidth / this._options.tileWidth);
        const height = Math.floor(availHeight / this._options.tileHeight);
        return [width, height];
    }

    computeFontSize(): number {
        throw new Error("Tile backend does not understand font size");
    }

    eventToPosition(x: number, y: number): [number, number] {
        const canvas = this._gl.canvas as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;

        x *= canvas.width / rect.width;
        y *= canvas.height / rect.height;

        if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) { return [-1, -1]; }

        return this._normalizedEventToPosition(x, y);
    }

    _initWebGL() {
        const gl = document.createElement("canvas").getContext("webgl2", {preserveDrawingBuffer:true}) as WebGLRenderingContext;
        (window as any).gl = gl;
        const program = createProgram(gl, VS, FS);
        gl.useProgram(program);
        createQuad(gl);

        UNIFORMS.forEach(name => { this._uniforms[name] = gl.getUniformLocation(program, name); });
        this._program = program;

        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(
            gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
            gl.ONE, gl.ONE_MINUS_SRC_ALPHA
        );
        gl.enable(gl.SCISSOR_TEST);
        return gl;
    }

    _normalizedEventToPosition(x:number, y:number): [number, number] {
        return [Math.floor(x/this._options.tileWidth), Math.floor(y/this._options.tileHeight)];
    }

    _updateSize() {
        const gl = this._gl;

        const opts = this._options;
        const canvasSize = [opts.width * opts.tileWidth, opts.height * opts.tileHeight];
        gl.canvas.width = canvasSize[0];
        gl.canvas.height = canvasSize[1];

        gl.viewport(0, 0, canvasSize[0], canvasSize[1]);
        gl.uniform2fv(this._uniforms["tileSize"], [opts.tileWidth, opts.tileHeight]);
        gl.uniform2fv(this._uniforms["targetSize"], canvasSize);
    }

    _updateTexture(tileSet: HTMLImageElement) {
        createTexture(this._gl, tileSet);
    }
}

const UNIFORMS = ["targetPosRel", "tilesetPosAbs", "tileSize", "targetSize", "colorize", "bg", "tint"];

const VS = `
#version 300 es

in vec2 tilePosRel;
out vec2 tilesetPosPx;

uniform vec2 tilesetPosAbs;
uniform vec2 tileSize;
uniform vec2 targetSize;
uniform vec2 targetPosRel;

void main() {
    vec2 targetPosPx = (targetPosRel + tilePosRel) * tileSize;
    vec2 targetPosNdc = ((targetPosPx / targetSize)-0.5)*2.0;
    targetPosNdc.y *= -1.0;

    gl_Position = vec4(targetPosNdc, 0.0, 1.0);
    tilesetPosPx = tilesetPosAbs + tilePosRel * tileSize;
}`.trim();

const FS = `
#version 300 es
precision highp float;

in vec2 tilesetPosPx;
out vec4 fragColor;
uniform sampler2D image;
uniform bool colorize;
uniform vec4 bg;
uniform vec4 tint;

void main() {
    fragColor = vec4(0, 0, 0, 1);

    vec4 texel = texelFetch(image, ivec2(tilesetPosPx), 0);

    if (colorize) {
        texel.rgb = tint.a * tint.rgb + (1.0-tint.a) * texel.rgb;
        fragColor.rgb = texel.a*texel.rgb + (1.0-texel.a)*bg.rgb;
        fragColor.a = texel.a + (1.0-texel.a)*bg.a;
    } else {
        fragColor = texel;
    }
}`.trim();

function createProgram(gl: WebGLRenderingContext, vss: string, fss: string) {
    const vs = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
    gl.shaderSource(vs, vss);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) { throw new Error(gl.getShaderInfoLog(vs) || ""); }

    const fs = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
    gl.shaderSource(fs, fss);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) { throw new Error(gl.getShaderInfoLog(fs) || ""); }

    const p = gl.createProgram() as WebGLProgram;
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) { throw new Error(gl.getProgramInfoLog(p) || ""); }

    return p;
}

function createQuad(gl: WebGLRenderingContext) {
    const pos = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
}

function createTexture(gl: WebGLRenderingContext, data: HTMLImageElement) {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    return t;
}

type GLColor = [number, number, number, number];
const colorCache: {[key:string]: GLColor} = {};

function parseColor(color: string) {
    if (!(color in colorCache)) {
        let parsed: GLColor;
        if (color === "transparent") {
            parsed = [0, 0, 0, 0];
        } else if (color.indexOf("rgba") > -1) {
            parsed = (color.match(/[\d.]+/g) ?? []).map(Number) as GLColor;
            for (let i=0;i<3;i++) { parsed[i] = parsed[i]/255; }
        } else {
            parsed = Color.fromString(color).map($ => $/255) as GLColor;
            parsed.push(1);
        }
        colorCache[color] = parsed;
    }

    return colorCache[color];
}
