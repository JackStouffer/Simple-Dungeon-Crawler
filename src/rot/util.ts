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
 * Always positive modulus
 * @param x Operand
 * @param n Modulus
 * @returns x modulo n
 */
export function mod(x: number, n: number): number {
    return (x % n + n) % n;
}

export function clamp(val: number, min = 0, max = 1): number {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

export function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}

interface HasMap {
    () : string;
    map: {[key:string]: string};
}

/**
 * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
 * @param {string} template
 * @param {any} [argv]
 */
export function format(template: string, ...args: any[]): string {
    const map = (format as HasMap).map;

    function replacer(match: string, group1: string, group2: string, index: number) {
        if (template.charAt(index-1) === "%") { return match.substring(1); }
        if (!args.length) { return match; }
        let obj = args[0];

        const group = group1 || group2;
        const parts = group.split(",");
        const name = parts.shift() || "";
        const method = map[name.toLowerCase()];
        if (!method) { return match; }

        obj = args.shift();
        let replaced = obj[method].apply(obj, parts);

        const first = name.charAt(0);
        if (first !== first.toLowerCase()) { replaced = capitalize(replaced); }

        return replaced;
    }

    return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
}

(format as HasMap).map = {
    "s": "toString"
};
