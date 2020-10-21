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
 * @namespace
 * Contains text tokenization and breaking routines
 */

const RE_COLORS = /%([bc]){([^}]*)}/g;

// token types
export const TYPE_TEXT = 0;
export const TYPE_NEWLINE = 1;
export const TYPE_FG = 2;
export const TYPE_BG = 3;

/**
 * Measure size of a resulting text block
 */
export function measure(str: string, maxWidth: number) {
    const result = {width:0, height:1};
    const tokens = tokenize(str, maxWidth);
    let lineWidth = 0;

    for (let i=0;i<tokens.length;i++) {
        const token = tokens[i];
        switch (token.type) {
            case TYPE_TEXT:
                lineWidth += token.value.length;
                break;

            case TYPE_NEWLINE:
                result.height++;
                result.width = Math.max(result.width, lineWidth);
                lineWidth = 0;
                break;

            default:
                throw new Error("unknown token type");
        }
    }
    result.width = Math.max(result.width, lineWidth);

    return result;
}

/**
 * Convert string to a series of a formatting commands
 */
export function tokenize(str: string, maxWidth: number) {
    const result: any[] = [];

    /* first tokenization pass - split texts and color formatting commands */
    let offset = 0;
    str.replace(RE_COLORS, function(match, type, name, index) {
        /* string before */
        const part = str.substring(offset, index);
        if (part.length) {
            result.push({
                type: TYPE_TEXT,
                value: part
            });
        }

        /* color command */
        result.push({
            type: (type === "c" ? TYPE_FG : TYPE_BG),
            value: name.trim()
        });

        offset = index + match.length;
        return "";
    });

    /* last remaining part */
    const part = str.substring(offset);
    if (part.length) {
        result.push({
            type: TYPE_TEXT,
            value: part
        });
    }

    return breakLines(result, maxWidth);
}

/* insert line breaks into first-pass tokenized data */
function breakLines(tokens: any[], maxWidth: number) {
    if (!maxWidth) { maxWidth = Infinity; }

    let i = 0;
    let lineLength = 0;
    let lastTokenWithSpace = -1;

    while (i < tokens.length) { /* take all text tokens, remove space, apply linebreaks */
        const token = tokens[i];
        if (token.type === TYPE_NEWLINE) { /* reset */
            lineLength = 0;
            lastTokenWithSpace = -1;
        }
        if (token.type !== TYPE_TEXT) { /* skip non-text tokens */
            i++;
            continue;
        }

        /* remove spaces at the beginning of line */
        while (lineLength === 0 && token.value.charAt(0) === " ") { token.value = token.value.substring(1); }

        /* forced newline? insert two new tokens after this one */
        const index = token.value.indexOf("\n");
        if (index !== -1) {
            token.value = breakInsideToken(tokens, i, index, true);

            /* if there are spaces at the end, we must remove them (we do not want the line too long) */
            const arr = token.value.split("");
            while (arr.length && arr[arr.length-1] === " ") { arr.pop(); }
            token.value = arr.join("");
        }

        /* token degenerated? */
        if (!token.value.length) {
            tokens.splice(i, 1);
            continue;
        }

        if (lineLength + token.value.length > maxWidth) { /* line too long, find a suitable breaking spot */

            /* is it possible to break within this token? */
            let index = -1;
            while (1) {
                const nextIndex = token.value.indexOf(" ", index+1);
                if (nextIndex === -1) { break; }
                if (lineLength + nextIndex > maxWidth) { break; }
                index = nextIndex;
            }

            if (index !== -1) { /* break at space within this one */
                token.value = breakInsideToken(tokens, i, index, true);
            } else if (lastTokenWithSpace !== -1) { /* is there a previous token where a break can occur? */
                const token = tokens[lastTokenWithSpace];
                const breakIndex = token.value.lastIndexOf(" ");
                token.value = breakInsideToken(tokens, lastTokenWithSpace, breakIndex, true);
                i = lastTokenWithSpace;
            } else { /* force break in this token */
                token.value = breakInsideToken(tokens, i, maxWidth-lineLength, false);
            }

        } else { /* line not long, continue */
            lineLength += token.value.length;
            if (token.value.indexOf(" ") !== -1) { lastTokenWithSpace = i; }
        }

        i++; /* advance to next token */
    }

    tokens.push({type: TYPE_NEWLINE}); /* insert fake newline to fix the last text line */

    /* remove trailing space from text tokens before newlines */
    let lastTextToken = null;
    for (let i=0;i<tokens.length;i++) {
        const token = tokens[i];
        switch (token.type) {
            case TYPE_TEXT: lastTextToken = token; break;
            case TYPE_NEWLINE:
                if (lastTextToken) { /* remove trailing space */
                    const arr = lastTextToken.value.split("");
                    while (arr.length && arr[arr.length-1] === " ") { arr.pop(); }
                    lastTextToken.value = arr.join("");
                }
                lastTextToken = null;
                break;
            default:
                throw new Error("Unknown token type");
        }
    }

    tokens.pop(); /* remove fake token */

    return tokens;
}

/**
 * Create new tokens and insert them into the stream
 * @param {object[]} tokens
 * @param {int} tokenIndex Token being processed
 * @param {int} breakIndex Index within current token's value
 * @param {bool} removeBreakChar Do we want to remove the breaking character?
 * @returns {string} remaining unbroken token value
 */
function breakInsideToken(
    tokens: any[],
    tokenIndex: number,
    breakIndex: number,
    removeBreakChar: boolean
) {
    const newBreakToken = {
        type: TYPE_NEWLINE
    };
    const newTextToken = {
        type: TYPE_TEXT,
        value: tokens[tokenIndex].value.substring(breakIndex + (removeBreakChar ? 1 : 0))
    };
    tokens.splice(tokenIndex+1, 0, newBreakToken, newTextToken);
    return tokens[tokenIndex].value.substring(0, breakIndex);
}
