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

type Arc = [number, number];

/**
 * @class Precise shadowcasting algorithm
 * @augments ROT.FOV
 */
export default class PreciseShadowcasting extends FOV {
    compute(x: number, y: number, R: number, callback: VisibilityCallback) {
        /* this place is always visible */
        callback(x, y, 0, 1);

        /* standing in a dark place. FIXME is this a good idea?  */
        if (!this._lightPasses(x, y)) { return; }

        /* list of all shadows */
        const SHADOWS: Arc[] = [];

        let cx: number, cy: number, blocks: boolean, A1: Arc, A2: Arc, visibility: number;

        /* analyze surrounding cells in concentric rings, starting from the center */
        for (let r = 1; r <= R; r++) {
            const neighbors = this._getCircle(x, y, r);
            const neighborCount = neighbors.length;

            /* for all cells in this ring */
            for (let i = 0; i < neighborCount; i++) {
                cx = neighbors[i][0];
                cy = neighbors[i][1];
                /* shift half-an-angle backwards to maintain consistency of 0-th cells */
                A1 = [i > 0 ? 2 * i - 1 : 2 * neighborCount - 1, 2 * neighborCount];
                A2 = [2 * i + 1, 2 * neighborCount];

                blocks = !this._lightPasses(cx, cy);
                visibility = this._checkVisibility(A1, A2, blocks, SHADOWS);
                if (visibility > 0) { callback(cx, cy, r, visibility); }

                if (SHADOWS.length === 2 &&
                    SHADOWS[0][0] === 0 &&
                    SHADOWS[1][0] === SHADOWS[1][1]) {
                    /* cutoff? */
                    return;
                }
            }
        }
    }

    /**
     * @param {int[2]} A1 arc start
     * @param {int[2]} A2 arc end
     * @param {bool} blocks Does current arc block visibility?
     * @param {int[][]} SHADOWS list of active shadows
     */
    _checkVisibility(A1: Arc, A2: Arc, blocks: boolean, SHADOWS: Arc[]): number {
        if (A1[0] > A2[0]) { /* split into two sub-arcs */
            const v1 = this._checkVisibility(A1, [A1[1], A1[1]], blocks, SHADOWS);
            const v2 = this._checkVisibility([0, 1], A2, blocks, SHADOWS);
            return (v1 + v2) / 2;
        }

        /* index1: first shadow >= A1 */
        let index1 = 0, edge1 = false;
        while (index1 < SHADOWS.length) {
            const old = SHADOWS[index1];
            const diff = old[0] * A1[1] - A1[0] * old[1];
            if (diff >= 0) { /* old >= A1 */
                if (diff === 0 && !(index1 % 2 > 0)) { edge1 = true; }
                break;
            }
            index1++;
        }

        /* index2: last shadow <= A2 */
        let index2 = SHADOWS.length, edge2 = false;
        while (index2-- > 0) {
            const old = SHADOWS[index2];
            const diff = A2[0] * old[1] - old[0] * A2[1];
            if (diff >= 0) { /* old <= A2 */
                if (diff === 0 && (index2 % 2 > 0)) { edge2 = true; }
                break;
            }
        }

        let visible = true;
        if (index1 === index2 && (edge1 || edge2)) { /* subset of existing shadow, one of the edges match */
            visible = false;
        } else if (edge1 && edge2 && index1 + 1 === index2 && (index2 % 2 > 0)) { /* completely equivalent with existing shadow */
            visible = false;
        } else if (index1 > index2 && (index1 % 2 > 0)) { /* subset of existing shadow, not touching */
            visible = false;
        }

        if (!visible) { return 0; } /* fast case: not visible */

        let visibleLength;

        /* compute the length of visible arc, adjust list of shadows (if blocking) */
        const remove = index2 - index1 + 1;
        if (remove % 2 > 0) {
            if (index1 % 2 > 0) { /* first edge within existing shadow, second outside */
                const P = SHADOWS[index1];
                visibleLength = (A2[0] * P[1] - P[0] * A2[1]) / (P[1] * A2[1]);
                if (blocks) { SHADOWS.splice(index1, remove, A2); }
            } else { /* second edge within existing shadow, first outside */
                const P = SHADOWS[index2];
                visibleLength = (P[0]*A1[1] - A1[0]*P[1]) / (A1[1] * P[1]);
                if (blocks) { SHADOWS.splice(index1, remove, A1); }
            }
        } else {
            if (index1 % 2 > 0) { /* both edges within existing shadows */
                const P1 = SHADOWS[index1];
                const P2 = SHADOWS[index2];
                visibleLength = (P2[0] * P1[1] - P1[0] * P2[1]) / (P1[1] * P2[1]);
                if (blocks) { SHADOWS.splice(index1, remove); }
            } else { /* both edges outside existing shadows */
                if (blocks) { SHADOWS.splice(index1, remove, A1, A2); }
                return 1; /* whole arc visible! */
            }
        }

        const arcLength = (A2[0] * A1[1] - A1[0] * A2[1]) / (A1[1] * A2[1]);

        return visibleLength / arcLength;
    }
}
