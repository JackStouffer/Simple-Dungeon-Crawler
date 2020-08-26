/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/rot-js/lib/MinHeap.js":
/*!********************************************!*\
  !*** ./node_modules/rot-js/lib/MinHeap.js ***!
  \********************************************/
/*! exports provided: MinHeap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinHeap", function() { return MinHeap; });
class MinHeap {
    constructor() {
        this.heap = [];
        this.timestamp = 0;
    }
    lessThan(a, b) {
        return a.key == b.key ? a.timestamp < b.timestamp : a.key < b.key;
    }
    shift(v) {
        this.heap = this.heap.map(({ key, value, timestamp }) => ({ key: key + v, value, timestamp }));
    }
    len() {
        return this.heap.length;
    }
    push(value, key) {
        this.timestamp += 1;
        const loc = this.len();
        this.heap.push({ value, timestamp: this.timestamp, key });
        this.updateUp(loc);
    }
    pop() {
        if (this.len() == 0) {
            throw new Error("no element to pop");
        }
        const top = this.heap[0];
        if (this.len() > 1) {
            this.heap[0] = this.heap.pop();
            this.updateDown(0);
        }
        else {
            this.heap.pop();
        }
        return top;
    }
    find(v) {
        for (let i = 0; i < this.len(); i++) {
            if (v == this.heap[i].value) {
                return this.heap[i];
            }
        }
        return null;
    }
    remove(v) {
        let index = null;
        for (let i = 0; i < this.len(); i++) {
            if (v == this.heap[i].value) {
                index = i;
            }
        }
        if (index != null) {
            if (this.len() > 1) {
                this.heap[index] = this.heap.pop();
                this.updateDown(index);
                return true;
            }
            else {
                this.heap.pop();
                return true;
            }
        }
        return false;
    }
    parentNode(x) {
        return Math.floor((x - 1) / 2);
    }
    leftChildNode(x) {
        return 2 * x + 1;
    }
    rightChildNode(x) {
        return 2 * x + 2;
    }
    existNode(x) {
        return x >= 0 && x < this.heap.length;
    }
    swap(x, y) {
        const t = this.heap[x];
        this.heap[x] = this.heap[y];
        this.heap[y] = t;
    }
    minNode(numbers) {
        const validnumbers = numbers.filter(this.existNode.bind(this));
        let minimal = validnumbers[0];
        for (const i of validnumbers) {
            if (this.lessThan(this.heap[i], this.heap[minimal])) {
                minimal = i;
            }
        }
        return minimal;
    }
    updateUp(x) {
        if (x == 0) {
            return;
        }
        const parent = this.parentNode(x);
        if (this.existNode(parent) && this.lessThan(this.heap[x], this.heap[parent])) {
            this.swap(x, parent);
            this.updateUp(parent);
        }
    }
    updateDown(x) {
        const leftChild = this.leftChildNode(x);
        const rightChild = this.rightChildNode(x);
        if (!this.existNode(leftChild)) {
            return;
        }
        const m = this.minNode([x, leftChild, rightChild]);
        if (m != x) {
            this.swap(x, m);
            this.updateDown(m);
        }
    }
    debugPrint() {
        console.log(this.heap);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/color.js":
/*!******************************************!*\
  !*** ./node_modules/rot-js/lib/color.js ***!
  \******************************************/
/*! exports provided: fromString, add, add_, multiply, multiply_, interpolate, lerp, interpolateHSL, lerpHSL, randomize, rgb2hsl, hsl2rgb, toRGB, toHex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromString", function() { return fromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_", function() { return add_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply_", function() { return multiply_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return interpolate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateHSL", function() { return interpolateHSL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerpHSL", function() { return lerpHSL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomize", function() { return randomize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb2hsl", function() { return rgb2hsl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsl2rgb", function() { return hsl2rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRGB", function() { return toRGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toHex", function() { return toHex; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/rot-js/lib/util.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/rot-js/lib/rng.js");


function fromString(str) {
    let cached, r;
    if (str in CACHE) {
        cached = CACHE[str];
    }
    else {
        if (str.charAt(0) == "#") { // hex rgb
            let matched = str.match(/[0-9a-f]/gi) || [];
            let values = matched.map((x) => parseInt(x, 16));
            if (values.length == 3) {
                cached = values.map((x) => x * 17);
            }
            else {
                for (let i = 0; i < 3; i++) {
                    values[i + 1] += 16 * values[i];
                    values.splice(i, 1);
                }
                cached = values;
            }
        }
        else if ((r = str.match(/rgb\(([0-9, ]+)\)/i))) { // decimal rgb
            cached = r[1].split(/\s*,\s*/).map((x) => parseInt(x));
        }
        else { // html name
            cached = [0, 0, 0];
        }
        CACHE[str] = cached;
    }
    return cached.slice();
}
/**
 * Add two or more colors
 */
function add(color1, ...colors) {
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < colors.length; j++) {
            result[i] += colors[j][i];
        }
    }
    return result;
}
/**
 * Add two or more colors, MODIFIES FIRST ARGUMENT
 */
function add_(color1, ...colors) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < colors.length; j++) {
            color1[i] += colors[j][i];
        }
    }
    return color1;
}
/**
 * Multiply (mix) two or more colors
 */
function multiply(color1, ...colors) {
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < colors.length; j++) {
            result[i] *= colors[j][i] / 255;
        }
        result[i] = Math.round(result[i]);
    }
    return result;
}
/**
 * Multiply (mix) two or more colors, MODIFIES FIRST ARGUMENT
 */
function multiply_(color1, ...colors) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < colors.length; j++) {
            color1[i] *= colors[j][i] / 255;
        }
        color1[i] = Math.round(color1[i]);
    }
    return color1;
}
/**
 * Interpolate (blend) two colors with a given factor
 */
function interpolate(color1, color2, factor = 0.5) {
    let result = color1.slice();
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}
const lerp = interpolate;
/**
 * Interpolate (blend) two colors with a given factor in HSL mode
 */
function interpolateHSL(color1, color2, factor = 0.5) {
    let hsl1 = rgb2hsl(color1);
    let hsl2 = rgb2hsl(color2);
    for (let i = 0; i < 3; i++) {
        hsl1[i] += factor * (hsl2[i] - hsl1[i]);
    }
    return hsl2rgb(hsl1);
}
const lerpHSL = interpolateHSL;
/**
 * Create a new random color based on this one
 * @param color
 * @param diff Set of standard deviations
 */
function randomize(color, diff) {
    if (!(diff instanceof Array)) {
        diff = Math.round(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getNormal(0, diff));
    }
    let result = color.slice();
    for (let i = 0; i < 3; i++) {
        result[i] += (diff instanceof Array ? Math.round(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getNormal(0, diff[i])) : diff);
    }
    return result;
}
/**
 * Converts an RGB color value to HSL. Expects 0..255 inputs, produces 0..1 outputs.
 */
function rgb2hsl(color) {
    let r = color[0] / 255;
    let g = color[1] / 255;
    let b = color[2] / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max == min) {
        s = 0; // achromatic
    }
    else {
        let d = max - min;
        s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
}
function hue2rgb(p, q, t) {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
/**
 * Converts an HSL color value to RGB. Expects 0..1 inputs, produces 0..255 outputs.
 */
function hsl2rgb(color) {
    let l = color[2];
    if (color[1] == 0) {
        l = Math.round(l * 255);
        return [l, l, l];
    }
    else {
        let s = color[1];
        let q = (l < 0.5 ? l * (1 + s) : l + s - l * s);
        let p = 2 * l - q;
        let r = hue2rgb(p, q, color[0] + 1 / 3);
        let g = hue2rgb(p, q, color[0]);
        let b = hue2rgb(p, q, color[0] - 1 / 3);
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
}
function toRGB(color) {
    let clamped = color.map(x => Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["clamp"])(x, 0, 255));
    return `rgb(${clamped.join(",")})`;
}
function toHex(color) {
    let clamped = color.map(x => Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["clamp"])(x, 0, 255).toString(16).padStart(2, "0"));
    return `#${clamped.join("")}`;
}
const CACHE = {
    "black": [0, 0, 0],
    "navy": [0, 0, 128],
    "darkblue": [0, 0, 139],
    "mediumblue": [0, 0, 205],
    "blue": [0, 0, 255],
    "darkgreen": [0, 100, 0],
    "green": [0, 128, 0],
    "teal": [0, 128, 128],
    "darkcyan": [0, 139, 139],
    "deepskyblue": [0, 191, 255],
    "darkturquoise": [0, 206, 209],
    "mediumspringgreen": [0, 250, 154],
    "lime": [0, 255, 0],
    "springgreen": [0, 255, 127],
    "aqua": [0, 255, 255],
    "cyan": [0, 255, 255],
    "midnightblue": [25, 25, 112],
    "dodgerblue": [30, 144, 255],
    "forestgreen": [34, 139, 34],
    "seagreen": [46, 139, 87],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "limegreen": [50, 205, 50],
    "mediumseagreen": [60, 179, 113],
    "turquoise": [64, 224, 208],
    "royalblue": [65, 105, 225],
    "steelblue": [70, 130, 180],
    "darkslateblue": [72, 61, 139],
    "mediumturquoise": [72, 209, 204],
    "indigo": [75, 0, 130],
    "darkolivegreen": [85, 107, 47],
    "cadetblue": [95, 158, 160],
    "cornflowerblue": [100, 149, 237],
    "mediumaquamarine": [102, 205, 170],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "slateblue": [106, 90, 205],
    "olivedrab": [107, 142, 35],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "mediumslateblue": [123, 104, 238],
    "lawngreen": [124, 252, 0],
    "chartreuse": [127, 255, 0],
    "aquamarine": [127, 255, 212],
    "maroon": [128, 0, 0],
    "purple": [128, 0, 128],
    "olive": [128, 128, 0],
    "gray": [128, 128, 128],
    "grey": [128, 128, 128],
    "skyblue": [135, 206, 235],
    "lightskyblue": [135, 206, 250],
    "blueviolet": [138, 43, 226],
    "darkred": [139, 0, 0],
    "darkmagenta": [139, 0, 139],
    "saddlebrown": [139, 69, 19],
    "darkseagreen": [143, 188, 143],
    "lightgreen": [144, 238, 144],
    "mediumpurple": [147, 112, 216],
    "darkviolet": [148, 0, 211],
    "palegreen": [152, 251, 152],
    "darkorchid": [153, 50, 204],
    "yellowgreen": [154, 205, 50],
    "sienna": [160, 82, 45],
    "brown": [165, 42, 42],
    "darkgray": [169, 169, 169],
    "darkgrey": [169, 169, 169],
    "lightblue": [173, 216, 230],
    "greenyellow": [173, 255, 47],
    "paleturquoise": [175, 238, 238],
    "lightsteelblue": [176, 196, 222],
    "powderblue": [176, 224, 230],
    "firebrick": [178, 34, 34],
    "darkgoldenrod": [184, 134, 11],
    "mediumorchid": [186, 85, 211],
    "rosybrown": [188, 143, 143],
    "darkkhaki": [189, 183, 107],
    "silver": [192, 192, 192],
    "mediumvioletred": [199, 21, 133],
    "indianred": [205, 92, 92],
    "peru": [205, 133, 63],
    "chocolate": [210, 105, 30],
    "tan": [210, 180, 140],
    "lightgray": [211, 211, 211],
    "lightgrey": [211, 211, 211],
    "palevioletred": [216, 112, 147],
    "thistle": [216, 191, 216],
    "orchid": [218, 112, 214],
    "goldenrod": [218, 165, 32],
    "crimson": [220, 20, 60],
    "gainsboro": [220, 220, 220],
    "plum": [221, 160, 221],
    "burlywood": [222, 184, 135],
    "lightcyan": [224, 255, 255],
    "lavender": [230, 230, 250],
    "darksalmon": [233, 150, 122],
    "violet": [238, 130, 238],
    "palegoldenrod": [238, 232, 170],
    "lightcoral": [240, 128, 128],
    "khaki": [240, 230, 140],
    "aliceblue": [240, 248, 255],
    "honeydew": [240, 255, 240],
    "azure": [240, 255, 255],
    "sandybrown": [244, 164, 96],
    "wheat": [245, 222, 179],
    "beige": [245, 245, 220],
    "whitesmoke": [245, 245, 245],
    "mintcream": [245, 255, 250],
    "ghostwhite": [248, 248, 255],
    "salmon": [250, 128, 114],
    "antiquewhite": [250, 235, 215],
    "linen": [250, 240, 230],
    "lightgoldenrodyellow": [250, 250, 210],
    "oldlace": [253, 245, 230],
    "red": [255, 0, 0],
    "fuchsia": [255, 0, 255],
    "magenta": [255, 0, 255],
    "deeppink": [255, 20, 147],
    "orangered": [255, 69, 0],
    "tomato": [255, 99, 71],
    "hotpink": [255, 105, 180],
    "coral": [255, 127, 80],
    "darkorange": [255, 140, 0],
    "lightsalmon": [255, 160, 122],
    "orange": [255, 165, 0],
    "lightpink": [255, 182, 193],
    "pink": [255, 192, 203],
    "gold": [255, 215, 0],
    "peachpuff": [255, 218, 185],
    "navajowhite": [255, 222, 173],
    "moccasin": [255, 228, 181],
    "bisque": [255, 228, 196],
    "mistyrose": [255, 228, 225],
    "blanchedalmond": [255, 235, 205],
    "papayawhip": [255, 239, 213],
    "lavenderblush": [255, 240, 245],
    "seashell": [255, 245, 238],
    "cornsilk": [255, 248, 220],
    "lemonchiffon": [255, 250, 205],
    "floralwhite": [255, 250, 240],
    "snow": [255, 250, 250],
    "yellow": [255, 255, 0],
    "lightyellow": [255, 255, 224],
    "ivory": [255, 255, 240],
    "white": [255, 255, 255]
};


/***/ }),

/***/ "./node_modules/rot-js/lib/constants.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/constants.js ***!
  \**********************************************/
/*! exports provided: DEFAULT_WIDTH, DEFAULT_HEIGHT, DIRS, KEYS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_WIDTH", function() { return DEFAULT_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HEIGHT", function() { return DEFAULT_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRS", function() { return DIRS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEYS", function() { return KEYS; });
/** Default with for display and map generators */
let DEFAULT_WIDTH = 80;
/** Default height for display and map generators */
let DEFAULT_HEIGHT = 25;
const DIRS = {
    4: [[0, -1], [1, 0], [0, 1], [-1, 0]],
    8: [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]],
    6: [[-1, -1], [1, -1], [2, 0], [1, 1], [-1, 1], [-2, 0]]
};
const KEYS = {
    /** Cancel key. */
    VK_CANCEL: 3,
    /** Help key. */
    VK_HELP: 6,
    /** Backspace key. */
    VK_BACK_SPACE: 8,
    /** Tab key. */
    VK_TAB: 9,
    /** 5 key on Numpad when NumLock is unlocked. Or on Mac, clear key which is positioned at NumLock key. */
    VK_CLEAR: 12,
    /** Return/enter key on the main keyboard. */
    VK_RETURN: 13,
    /** Reserved, but not used. */
    VK_ENTER: 14,
    /** Shift key. */
    VK_SHIFT: 16,
    /** Control key. */
    VK_CONTROL: 17,
    /** Alt (Option on Mac) key. */
    VK_ALT: 18,
    /** Pause key. */
    VK_PAUSE: 19,
    /** Caps lock. */
    VK_CAPS_LOCK: 20,
    /** Escape key. */
    VK_ESCAPE: 27,
    /** Space bar. */
    VK_SPACE: 32,
    /** Page Up key. */
    VK_PAGE_UP: 33,
    /** Page Down key. */
    VK_PAGE_DOWN: 34,
    /** End key. */
    VK_END: 35,
    /** Home key. */
    VK_HOME: 36,
    /** Left arrow. */
    VK_LEFT: 37,
    /** Up arrow. */
    VK_UP: 38,
    /** Right arrow. */
    VK_RIGHT: 39,
    /** Down arrow. */
    VK_DOWN: 40,
    /** Print Screen key. */
    VK_PRINTSCREEN: 44,
    /** Ins(ert) key. */
    VK_INSERT: 45,
    /** Del(ete) key. */
    VK_DELETE: 46,
    /***/
    VK_0: 48,
    /***/
    VK_1: 49,
    /***/
    VK_2: 50,
    /***/
    VK_3: 51,
    /***/
    VK_4: 52,
    /***/
    VK_5: 53,
    /***/
    VK_6: 54,
    /***/
    VK_7: 55,
    /***/
    VK_8: 56,
    /***/
    VK_9: 57,
    /** Colon (:) key. Requires Gecko 15.0 */
    VK_COLON: 58,
    /** Semicolon (;) key. */
    VK_SEMICOLON: 59,
    /** Less-than (<) key. Requires Gecko 15.0 */
    VK_LESS_THAN: 60,
    /** Equals (=) key. */
    VK_EQUALS: 61,
    /** Greater-than (>) key. Requires Gecko 15.0 */
    VK_GREATER_THAN: 62,
    /** Question mark (?) key. Requires Gecko 15.0 */
    VK_QUESTION_MARK: 63,
    /** Atmark (@) key. Requires Gecko 15.0 */
    VK_AT: 64,
    /***/
    VK_A: 65,
    /***/
    VK_B: 66,
    /***/
    VK_C: 67,
    /***/
    VK_D: 68,
    /***/
    VK_E: 69,
    /***/
    VK_F: 70,
    /***/
    VK_G: 71,
    /***/
    VK_H: 72,
    /***/
    VK_I: 73,
    /***/
    VK_J: 74,
    /***/
    VK_K: 75,
    /***/
    VK_L: 76,
    /***/
    VK_M: 77,
    /***/
    VK_N: 78,
    /***/
    VK_O: 79,
    /***/
    VK_P: 80,
    /***/
    VK_Q: 81,
    /***/
    VK_R: 82,
    /***/
    VK_S: 83,
    /***/
    VK_T: 84,
    /***/
    VK_U: 85,
    /***/
    VK_V: 86,
    /***/
    VK_W: 87,
    /***/
    VK_X: 88,
    /***/
    VK_Y: 89,
    /***/
    VK_Z: 90,
    /***/
    VK_CONTEXT_MENU: 93,
    /** 0 on the numeric keypad. */
    VK_NUMPAD0: 96,
    /** 1 on the numeric keypad. */
    VK_NUMPAD1: 97,
    /** 2 on the numeric keypad. */
    VK_NUMPAD2: 98,
    /** 3 on the numeric keypad. */
    VK_NUMPAD3: 99,
    /** 4 on the numeric keypad. */
    VK_NUMPAD4: 100,
    /** 5 on the numeric keypad. */
    VK_NUMPAD5: 101,
    /** 6 on the numeric keypad. */
    VK_NUMPAD6: 102,
    /** 7 on the numeric keypad. */
    VK_NUMPAD7: 103,
    /** 8 on the numeric keypad. */
    VK_NUMPAD8: 104,
    /** 9 on the numeric keypad. */
    VK_NUMPAD9: 105,
    /** * on the numeric keypad. */
    VK_MULTIPLY: 106,
    /** + on the numeric keypad. */
    VK_ADD: 107,
    /***/
    VK_SEPARATOR: 108,
    /** - on the numeric keypad. */
    VK_SUBTRACT: 109,
    /** Decimal point on the numeric keypad. */
    VK_DECIMAL: 110,
    /** / on the numeric keypad. */
    VK_DIVIDE: 111,
    /** F1 key. */
    VK_F1: 112,
    /** F2 key. */
    VK_F2: 113,
    /** F3 key. */
    VK_F3: 114,
    /** F4 key. */
    VK_F4: 115,
    /** F5 key. */
    VK_F5: 116,
    /** F6 key. */
    VK_F6: 117,
    /** F7 key. */
    VK_F7: 118,
    /** F8 key. */
    VK_F8: 119,
    /** F9 key. */
    VK_F9: 120,
    /** F10 key. */
    VK_F10: 121,
    /** F11 key. */
    VK_F11: 122,
    /** F12 key. */
    VK_F12: 123,
    /** F13 key. */
    VK_F13: 124,
    /** F14 key. */
    VK_F14: 125,
    /** F15 key. */
    VK_F15: 126,
    /** F16 key. */
    VK_F16: 127,
    /** F17 key. */
    VK_F17: 128,
    /** F18 key. */
    VK_F18: 129,
    /** F19 key. */
    VK_F19: 130,
    /** F20 key. */
    VK_F20: 131,
    /** F21 key. */
    VK_F21: 132,
    /** F22 key. */
    VK_F22: 133,
    /** F23 key. */
    VK_F23: 134,
    /** F24 key. */
    VK_F24: 135,
    /** Num Lock key. */
    VK_NUM_LOCK: 144,
    /** Scroll Lock key. */
    VK_SCROLL_LOCK: 145,
    /** Circumflex (^) key. Requires Gecko 15.0 */
    VK_CIRCUMFLEX: 160,
    /** Exclamation (!) key. Requires Gecko 15.0 */
    VK_EXCLAMATION: 161,
    /** Double quote () key. Requires Gecko 15.0 */
    VK_DOUBLE_QUOTE: 162,
    /** Hash (#) key. Requires Gecko 15.0 */
    VK_HASH: 163,
    /** Dollar sign ($) key. Requires Gecko 15.0 */
    VK_DOLLAR: 164,
    /** Percent (%) key. Requires Gecko 15.0 */
    VK_PERCENT: 165,
    /** Ampersand (&) key. Requires Gecko 15.0 */
    VK_AMPERSAND: 166,
    /** Underscore (_) key. Requires Gecko 15.0 */
    VK_UNDERSCORE: 167,
    /** Open parenthesis (() key. Requires Gecko 15.0 */
    VK_OPEN_PAREN: 168,
    /** Close parenthesis ()) key. Requires Gecko 15.0 */
    VK_CLOSE_PAREN: 169,
    /* Asterisk (*) key. Requires Gecko 15.0 */
    VK_ASTERISK: 170,
    /** Plus (+) key. Requires Gecko 15.0 */
    VK_PLUS: 171,
    /** Pipe (|) key. Requires Gecko 15.0 */
    VK_PIPE: 172,
    /** Hyphen-US/docs/Minus (-) key. Requires Gecko 15.0 */
    VK_HYPHEN_MINUS: 173,
    /** Open curly bracket ({) key. Requires Gecko 15.0 */
    VK_OPEN_CURLY_BRACKET: 174,
    /** Close curly bracket (}) key. Requires Gecko 15.0 */
    VK_CLOSE_CURLY_BRACKET: 175,
    /** Tilde (~) key. Requires Gecko 15.0 */
    VK_TILDE: 176,
    /** Comma (,) key. */
    VK_COMMA: 188,
    /** Period (.) key. */
    VK_PERIOD: 190,
    /** Slash (/) key. */
    VK_SLASH: 191,
    /** Back tick (`) key. */
    VK_BACK_QUOTE: 192,
    /** Open square bracket ([) key. */
    VK_OPEN_BRACKET: 219,
    /** Back slash (\) key. */
    VK_BACK_SLASH: 220,
    /** Close square bracket (]) key. */
    VK_CLOSE_BRACKET: 221,
    /** Quote (''') key. */
    VK_QUOTE: 222,
    /** Meta key on Linux, Command key on Mac. */
    VK_META: 224,
    /** AltGr key on Linux. Requires Gecko 15.0 */
    VK_ALTGR: 225,
    /** Windows logo key on Windows. Or Super or Hyper key on Linux. Requires Gecko 15.0 */
    VK_WIN: 91,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_KANA: 21,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_HANGUL: 21,
    /** 英数 key on Japanese Mac keyboard. Requires Gecko 15.0 */
    VK_EISU: 22,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_JUNJA: 23,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_FINAL: 24,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_HANJA: 25,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_KANJI: 25,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_CONVERT: 28,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_NONCONVERT: 29,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_ACCEPT: 30,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_MODECHANGE: 31,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_SELECT: 41,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_PRINT: 42,
    /** Linux support for this keycode was added in Gecko 4.0. */
    VK_EXECUTE: 43,
    /** Linux support for this keycode was added in Gecko 4.0.	 */
    VK_SLEEP: 95
};


/***/ }),

/***/ "./node_modules/rot-js/lib/display/backend.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/display/backend.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Backend; });
/**
 * @class Abstract display backend module
 * @private
 */
class Backend {
    getContainer() { return null; }
    setOptions(options) { this._options = options; }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/display/canvas.js":
/*!***************************************************!*\
  !*** ./node_modules/rot-js/lib/display/canvas.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Canvas; });
/* harmony import */ var _backend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./backend.js */ "./node_modules/rot-js/lib/display/backend.js");

class Canvas extends _backend_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._ctx = document.createElement("canvas").getContext("2d");
    }
    schedule(cb) { requestAnimationFrame(cb); }
    getContainer() { return this._ctx.canvas; }
    setOptions(opts) {
        super.setOptions(opts);
        const style = (opts.fontStyle ? `${opts.fontStyle} ` : ``);
        const font = `${style} ${opts.fontSize}px ${opts.fontFamily}`;
        this._ctx.font = font;
        this._updateSize();
        this._ctx.font = font;
        this._ctx.textAlign = "center";
        this._ctx.textBaseline = "middle";
    }
    clear() {
        this._ctx.fillStyle = this._options.bg;
        this._ctx.fillRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
    }
    eventToPosition(x, y) {
        let canvas = this._ctx.canvas;
        let rect = canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
        x *= canvas.width / rect.width;
        y *= canvas.height / rect.height;
        if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
            return [-1, -1];
        }
        return this._normalizedEventToPosition(x, y);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/display/display.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/display/display.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hex.js */ "./node_modules/rot-js/lib/display/hex.js");
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rect.js */ "./node_modules/rot-js/lib/display/rect.js");
/* harmony import */ var _tile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tile.js */ "./node_modules/rot-js/lib/display/tile.js");
/* harmony import */ var _tile_gl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tile-gl.js */ "./node_modules/rot-js/lib/display/tile-gl.js");
/* harmony import */ var _term_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./term.js */ "./node_modules/rot-js/lib/display/term.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../text.js */ "./node_modules/rot-js/lib/text.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");







const BACKENDS = {
    "hex": _hex_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    "rect": _rect_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    "tile": _tile_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    "tile-gl": _tile_gl_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    "term": _term_js__WEBPACK_IMPORTED_MODULE_4__["default"]
};
const DEFAULT_OPTIONS = {
    width: _constants_js__WEBPACK_IMPORTED_MODULE_6__["DEFAULT_WIDTH"],
    height: _constants_js__WEBPACK_IMPORTED_MODULE_6__["DEFAULT_HEIGHT"],
    transpose: false,
    layout: "rect",
    fontSize: 15,
    spacing: 1,
    border: 0,
    forceSquareRatio: false,
    fontFamily: "monospace",
    fontStyle: "",
    fg: "#ccc",
    bg: "#000",
    tileWidth: 32,
    tileHeight: 32,
    tileMap: {},
    tileSet: null,
    tileColorize: false
};
/**
 * @class Visual map display
 */
let Display = /** @class */ (() => {
    class Display {
        constructor(options = {}) {
            this._data = {};
            this._dirty = false; // false = nothing, true = all, object = dirty cells
            this._options = {};
            options = Object.assign({}, DEFAULT_OPTIONS, options);
            this.setOptions(options);
            this.DEBUG = this.DEBUG.bind(this);
            this._tick = this._tick.bind(this);
            this._backend.schedule(this._tick);
        }
        /**
         * Debug helper, ideal as a map generator callback. Always bound to this.
         * @param {int} x
         * @param {int} y
         * @param {int} what
         */
        DEBUG(x, y, what) {
            let colors = [this._options.bg, this._options.fg];
            this.draw(x, y, null, null, colors[what % colors.length]);
        }
        /**
         * Clear the whole display (cover it with background color)
         */
        clear() {
            this._data = {};
            this._dirty = true;
        }
        /**
         * @see ROT.Display
         */
        setOptions(options) {
            Object.assign(this._options, options);
            if (options.width || options.height || options.fontSize || options.fontFamily || options.spacing || options.layout) {
                if (options.layout) {
                    let ctor = BACKENDS[options.layout];
                    this._backend = new ctor();
                }
                this._backend.setOptions(this._options);
                this._dirty = true;
            }
            return this;
        }
        /**
         * Returns currently set options
         */
        getOptions() { return this._options; }
        /**
         * Returns the DOM node of this display
         */
        getContainer() { return this._backend.getContainer(); }
        /**
         * Compute the maximum width/height to fit into a set of given constraints
         * @param {int} availWidth Maximum allowed pixel width
         * @param {int} availHeight Maximum allowed pixel height
         * @returns {int[2]} cellWidth,cellHeight
         */
        computeSize(availWidth, availHeight) {
            return this._backend.computeSize(availWidth, availHeight);
        }
        /**
         * Compute the maximum font size to fit into a set of given constraints
         * @param {int} availWidth Maximum allowed pixel width
         * @param {int} availHeight Maximum allowed pixel height
         * @returns {int} fontSize
         */
        computeFontSize(availWidth, availHeight) {
            return this._backend.computeFontSize(availWidth, availHeight);
        }
        computeTileSize(availWidth, availHeight) {
            let width = Math.floor(availWidth / this._options.width);
            let height = Math.floor(availHeight / this._options.height);
            return [width, height];
        }
        /**
         * Convert a DOM event (mouse or touch) to map coordinates. Uses first touch for multi-touch.
         * @param {Event} e event
         * @returns {int[2]} -1 for values outside of the canvas
         */
        eventToPosition(e) {
            let x, y;
            if ("touches" in e) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            }
            else {
                x = e.clientX;
                y = e.clientY;
            }
            return this._backend.eventToPosition(x, y);
        }
        /**
         * @param {int} x
         * @param {int} y
         * @param {string || string[]} ch One or more chars (will be overlapping themselves)
         * @param {string} [fg] foreground color
         * @param {string} [bg] background color
         */
        draw(x, y, ch, fg, bg) {
            if (!fg) {
                fg = this._options.fg;
            }
            if (!bg) {
                bg = this._options.bg;
            }
            let key = `${x},${y}`;
            this._data[key] = [x, y, ch, fg, bg];
            if (this._dirty === true) {
                return;
            } // will already redraw everything 
            if (!this._dirty) {
                this._dirty = {};
            } // first!
            this._dirty[key] = true;
        }
        /**
         * Draws a text at given position. Optionally wraps at a maximum length. Currently does not work with hex layout.
         * @param {int} x
         * @param {int} y
         * @param {string} text May contain color/background format specifiers, %c{name}/%b{name}, both optional. %c{}/%b{} resets to default.
         * @param {int} [maxWidth] wrap at what width?
         * @returns {int} lines drawn
         */
        drawText(x, y, text, maxWidth) {
            let fg = null;
            let bg = null;
            let cx = x;
            let cy = y;
            let lines = 1;
            if (!maxWidth) {
                maxWidth = this._options.width - x;
            }
            let tokens = _text_js__WEBPACK_IMPORTED_MODULE_5__["tokenize"](text, maxWidth);
            while (tokens.length) { // interpret tokenized opcode stream
                let token = tokens.shift();
                switch (token.type) {
                    case _text_js__WEBPACK_IMPORTED_MODULE_5__["TYPE_TEXT"]:
                        let isSpace = false, isPrevSpace = false, isFullWidth = false, isPrevFullWidth = false;
                        for (let i = 0; i < token.value.length; i++) {
                            let cc = token.value.charCodeAt(i);
                            let c = token.value.charAt(i);
                            if (this._options.layout === "term") {
                                let cch = cc >> 8;
                                let isCJK = cch === 0x11 || (cch >= 0x2e && cch <= 0x9f) || (cch >= 0xac && cch <= 0xd7) || (cc >= 0xA960 && cc <= 0xA97F);
                                if (isCJK) {
                                    this.draw(cx + 0, cy, c, fg, bg);
                                    this.draw(cx + 1, cy, "\t", fg, bg);
                                    cx += 2;
                                    continue;
                                }
                            }
                            // Assign to `true` when the current char is full-width.
                            isFullWidth = (cc > 0xff00 && cc < 0xff61) || (cc > 0xffdc && cc < 0xffe8) || cc > 0xffee;
                            // Current char is space, whatever full-width or half-width both are OK.
                            isSpace = (c.charCodeAt(0) == 0x20 || c.charCodeAt(0) == 0x3000);
                            // The previous char is full-width and
                            // current char is nether half-width nor a space.
                            if (isPrevFullWidth && !isFullWidth && !isSpace) {
                                cx++;
                            } // add an extra position
                            // The current char is full-width and
                            // the previous char is not a space.
                            if (isFullWidth && !isPrevSpace) {
                                cx++;
                            } // add an extra position
                            this.draw(cx++, cy, c, fg, bg);
                            isPrevSpace = isSpace;
                            isPrevFullWidth = isFullWidth;
                        }
                        break;
                    case _text_js__WEBPACK_IMPORTED_MODULE_5__["TYPE_FG"]:
                        fg = token.value || null;
                        break;
                    case _text_js__WEBPACK_IMPORTED_MODULE_5__["TYPE_BG"]:
                        bg = token.value || null;
                        break;
                    case _text_js__WEBPACK_IMPORTED_MODULE_5__["TYPE_NEWLINE"]:
                        cx = x;
                        cy++;
                        lines++;
                        break;
                }
            }
            return lines;
        }
        /**
         * Timer tick: update dirty parts
         */
        _tick() {
            this._backend.schedule(this._tick);
            if (!this._dirty) {
                return;
            }
            if (this._dirty === true) { // draw all
                this._backend.clear();
                for (let id in this._data) {
                    this._draw(id, false);
                } // redraw cached data 
            }
            else { // draw only dirty 
                for (let key in this._dirty) {
                    this._draw(key, true);
                }
            }
            this._dirty = false;
        }
        /**
         * @param {string} key What to draw
         * @param {bool} clearBefore Is it necessary to clean before?
         */
        _draw(key, clearBefore) {
            let data = this._data[key];
            if (data[4] != this._options.bg) {
                clearBefore = true;
            }
            this._backend.draw(data, clearBefore);
        }
    }
    Display.Rect = _rect_js__WEBPACK_IMPORTED_MODULE_1__["default"];
    Display.Hex = _hex_js__WEBPACK_IMPORTED_MODULE_0__["default"];
    Display.Tile = _tile_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    Display.TileGL = _tile_gl_js__WEBPACK_IMPORTED_MODULE_3__["default"];
    Display.Term = _term_js__WEBPACK_IMPORTED_MODULE_4__["default"];
    return Display;
})();
/* harmony default export */ __webpack_exports__["default"] = (Display);


/***/ }),

/***/ "./node_modules/rot-js/lib/display/hex.js":
/*!************************************************!*\
  !*** ./node_modules/rot-js/lib/display/hex.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Hex; });
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.js */ "./node_modules/rot-js/lib/display/canvas.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./node_modules/rot-js/lib/util.js");


/**
 * @class Hexagonal backend
 * @private
 */
class Hex extends _canvas_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._spacingX = 0;
        this._spacingY = 0;
        this._hexSize = 0;
    }
    draw(data, clearBefore) {
        let [x, y, ch, fg, bg] = data;
        let px = [
            (x + 1) * this._spacingX,
            y * this._spacingY + this._hexSize
        ];
        if (this._options.transpose) {
            px.reverse();
        }
        if (clearBefore) {
            this._ctx.fillStyle = bg;
            this._fill(px[0], px[1]);
        }
        if (!ch) {
            return;
        }
        this._ctx.fillStyle = fg;
        let chars = [].concat(ch);
        for (let i = 0; i < chars.length; i++) {
            this._ctx.fillText(chars[i], px[0], Math.ceil(px[1]));
        }
    }
    computeSize(availWidth, availHeight) {
        if (this._options.transpose) {
            availWidth += availHeight;
            availHeight = availWidth - availHeight;
            availWidth -= availHeight;
        }
        let width = Math.floor(availWidth / this._spacingX) - 1;
        let height = Math.floor((availHeight - 2 * this._hexSize) / this._spacingY + 1);
        return [width, height];
    }
    computeFontSize(availWidth, availHeight) {
        if (this._options.transpose) {
            availWidth += availHeight;
            availHeight = availWidth - availHeight;
            availWidth -= availHeight;
        }
        let hexSizeWidth = 2 * availWidth / ((this._options.width + 1) * Math.sqrt(3)) - 1;
        let hexSizeHeight = availHeight / (2 + 1.5 * (this._options.height - 1));
        let hexSize = Math.min(hexSizeWidth, hexSizeHeight);
        // compute char ratio
        let oldFont = this._ctx.font;
        this._ctx.font = "100px " + this._options.fontFamily;
        let width = Math.ceil(this._ctx.measureText("W").width);
        this._ctx.font = oldFont;
        let ratio = width / 100;
        hexSize = Math.floor(hexSize) + 1; // closest larger hexSize
        // FIXME char size computation does not respect transposed hexes
        let fontSize = 2 * hexSize / (this._options.spacing * (1 + ratio / Math.sqrt(3)));
        // closest smaller fontSize
        return Math.ceil(fontSize) - 1;
    }
    _normalizedEventToPosition(x, y) {
        let nodeSize;
        if (this._options.transpose) {
            x += y;
            y = x - y;
            x -= y;
            nodeSize = this._ctx.canvas.width;
        }
        else {
            nodeSize = this._ctx.canvas.height;
        }
        let size = nodeSize / this._options.height;
        y = Math.floor(y / size);
        if (Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["mod"])(y, 2)) { /* odd row */
            x -= this._spacingX;
            x = 1 + 2 * Math.floor(x / (2 * this._spacingX));
        }
        else {
            x = 2 * Math.floor(x / (2 * this._spacingX));
        }
        return [x, y];
    }
    /**
     * Arguments are pixel values. If "transposed" mode is enabled, then these two are already swapped.
     */
    _fill(cx, cy) {
        let a = this._hexSize;
        let b = this._options.border;
        const ctx = this._ctx;
        ctx.beginPath();
        if (this._options.transpose) {
            ctx.moveTo(cx - a + b, cy);
            ctx.lineTo(cx - a / 2 + b, cy + this._spacingX - b);
            ctx.lineTo(cx + a / 2 - b, cy + this._spacingX - b);
            ctx.lineTo(cx + a - b, cy);
            ctx.lineTo(cx + a / 2 - b, cy - this._spacingX + b);
            ctx.lineTo(cx - a / 2 + b, cy - this._spacingX + b);
            ctx.lineTo(cx - a + b, cy);
        }
        else {
            ctx.moveTo(cx, cy - a + b);
            ctx.lineTo(cx + this._spacingX - b, cy - a / 2 + b);
            ctx.lineTo(cx + this._spacingX - b, cy + a / 2 - b);
            ctx.lineTo(cx, cy + a - b);
            ctx.lineTo(cx - this._spacingX + b, cy + a / 2 - b);
            ctx.lineTo(cx - this._spacingX + b, cy - a / 2 + b);
            ctx.lineTo(cx, cy - a + b);
        }
        ctx.fill();
    }
    _updateSize() {
        const opts = this._options;
        const charWidth = Math.ceil(this._ctx.measureText("W").width);
        this._hexSize = Math.floor(opts.spacing * (opts.fontSize + charWidth / Math.sqrt(3)) / 2);
        this._spacingX = this._hexSize * Math.sqrt(3) / 2;
        this._spacingY = this._hexSize * 1.5;
        let xprop;
        let yprop;
        if (opts.transpose) {
            xprop = "height";
            yprop = "width";
        }
        else {
            xprop = "width";
            yprop = "height";
        }
        this._ctx.canvas[xprop] = Math.ceil((opts.width + 1) * this._spacingX);
        this._ctx.canvas[yprop] = Math.ceil((opts.height - 1) * this._spacingY + 2 * this._hexSize);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/display/rect.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/display/rect.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.js */ "./node_modules/rot-js/lib/display/canvas.js");

/**
 * @class Rectangular backend
 * @private
 */
let Rect = /** @class */ (() => {
    class Rect extends _canvas_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
        constructor() {
            super();
            this._spacingX = 0;
            this._spacingY = 0;
            this._canvasCache = {};
        }
        setOptions(options) {
            super.setOptions(options);
            this._canvasCache = {};
        }
        draw(data, clearBefore) {
            if (Rect.cache) {
                this._drawWithCache(data);
            }
            else {
                this._drawNoCache(data, clearBefore);
            }
        }
        _drawWithCache(data) {
            let [x, y, ch, fg, bg] = data;
            let hash = "" + ch + fg + bg;
            let canvas;
            if (hash in this._canvasCache) {
                canvas = this._canvasCache[hash];
            }
            else {
                let b = this._options.border;
                canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                canvas.width = this._spacingX;
                canvas.height = this._spacingY;
                ctx.fillStyle = bg;
                ctx.fillRect(b, b, canvas.width - b, canvas.height - b);
                if (ch) {
                    ctx.fillStyle = fg;
                    ctx.font = this._ctx.font;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    let chars = [].concat(ch);
                    for (let i = 0; i < chars.length; i++) {
                        ctx.fillText(chars[i], this._spacingX / 2, Math.ceil(this._spacingY / 2));
                    }
                }
                this._canvasCache[hash] = canvas;
            }
            this._ctx.drawImage(canvas, x * this._spacingX, y * this._spacingY);
        }
        _drawNoCache(data, clearBefore) {
            let [x, y, ch, fg, bg] = data;
            if (clearBefore) {
                let b = this._options.border;
                this._ctx.fillStyle = bg;
                this._ctx.fillRect(x * this._spacingX + b, y * this._spacingY + b, this._spacingX - b, this._spacingY - b);
            }
            if (!ch) {
                return;
            }
            this._ctx.fillStyle = fg;
            let chars = [].concat(ch);
            for (let i = 0; i < chars.length; i++) {
                this._ctx.fillText(chars[i], (x + 0.5) * this._spacingX, Math.ceil((y + 0.5) * this._spacingY));
            }
        }
        computeSize(availWidth, availHeight) {
            let width = Math.floor(availWidth / this._spacingX);
            let height = Math.floor(availHeight / this._spacingY);
            return [width, height];
        }
        computeFontSize(availWidth, availHeight) {
            let boxWidth = Math.floor(availWidth / this._options.width);
            let boxHeight = Math.floor(availHeight / this._options.height);
            /* compute char ratio */
            let oldFont = this._ctx.font;
            this._ctx.font = "100px " + this._options.fontFamily;
            let width = Math.ceil(this._ctx.measureText("W").width);
            this._ctx.font = oldFont;
            let ratio = width / 100;
            let widthFraction = ratio * boxHeight / boxWidth;
            if (widthFraction > 1) { /* too wide with current aspect ratio */
                boxHeight = Math.floor(boxHeight / widthFraction);
            }
            return Math.floor(boxHeight / this._options.spacing);
        }
        _normalizedEventToPosition(x, y) {
            return [Math.floor(x / this._spacingX), Math.floor(y / this._spacingY)];
        }
        _updateSize() {
            const opts = this._options;
            const charWidth = Math.ceil(this._ctx.measureText("W").width);
            this._spacingX = Math.ceil(opts.spacing * charWidth);
            this._spacingY = Math.ceil(opts.spacing * opts.fontSize);
            if (opts.forceSquareRatio) {
                this._spacingX = this._spacingY = Math.max(this._spacingX, this._spacingY);
            }
            this._ctx.canvas.width = opts.width * this._spacingX;
            this._ctx.canvas.height = opts.height * this._spacingY;
        }
    }
    Rect.cache = false;
    return Rect;
})();
/* harmony default export */ __webpack_exports__["default"] = (Rect);


/***/ }),

/***/ "./node_modules/rot-js/lib/display/term.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/display/term.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Term; });
/* harmony import */ var _backend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./backend.js */ "./node_modules/rot-js/lib/display/backend.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.js */ "./node_modules/rot-js/lib/color.js");


function clearToAnsi(bg) {
    return `\x1b[0;48;5;${termcolor(bg)}m\x1b[2J`;
}
function colorToAnsi(fg, bg) {
    return `\x1b[0;38;5;${termcolor(fg)};48;5;${termcolor(bg)}m`;
}
function positionToAnsi(x, y) {
    return `\x1b[${y + 1};${x + 1}H`;
}
function termcolor(color) {
    const SRC_COLORS = 256.0;
    const DST_COLORS = 6.0;
    const COLOR_RATIO = DST_COLORS / SRC_COLORS;
    let rgb = _color_js__WEBPACK_IMPORTED_MODULE_1__["fromString"](color);
    let r = Math.floor(rgb[0] * COLOR_RATIO);
    let g = Math.floor(rgb[1] * COLOR_RATIO);
    let b = Math.floor(rgb[2] * COLOR_RATIO);
    return r * 36 + g * 6 + b * 1 + 16;
}
class Term extends _backend_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._offset = [0, 0];
        this._cursor = [-1, -1];
        this._lastColor = "";
    }
    schedule(cb) { setTimeout(cb, 1000 / 60); }
    setOptions(options) {
        super.setOptions(options);
        let size = [options.width, options.height];
        let avail = this.computeSize();
        this._offset = avail.map((val, index) => Math.floor((val - size[index]) / 2));
    }
    clear() {
        process.stdout.write(clearToAnsi(this._options.bg));
    }
    draw(data, clearBefore) {
        // determine where to draw what with what colors
        let [x, y, ch, fg, bg] = data;
        // determine if we need to move the terminal cursor
        let dx = this._offset[0] + x;
        let dy = this._offset[1] + y;
        let size = this.computeSize();
        if (dx < 0 || dx >= size[0]) {
            return;
        }
        if (dy < 0 || dy >= size[1]) {
            return;
        }
        if (dx !== this._cursor[0] || dy !== this._cursor[1]) {
            process.stdout.write(positionToAnsi(dx, dy));
            this._cursor[0] = dx;
            this._cursor[1] = dy;
        }
        // terminals automatically clear, but if we're clearing when we're
        // not otherwise provided with a character, just use a space instead
        if (clearBefore) {
            if (!ch) {
                ch = " ";
            }
        }
        // if we're not clearing and not provided with a character, do nothing
        if (!ch) {
            return;
        }
        // determine if we need to change colors
        let newColor = colorToAnsi(fg, bg);
        if (newColor !== this._lastColor) {
            process.stdout.write(newColor);
            this._lastColor = newColor;
        }
        if (ch != '\t') {
            // write the provided symbol to the display
            let chars = [].concat(ch);
            process.stdout.write(chars[0]);
        }
        // update our position, given that we wrote a character
        this._cursor[0]++;
        if (this._cursor[0] >= size[0]) {
            this._cursor[0] = 0;
            this._cursor[1]++;
        }
    }
    computeFontSize() { throw new Error("Terminal backend has no notion of font size"); }
    eventToPosition(x, y) { return [x, y]; }
    computeSize() { return [process.stdout.columns, process.stdout.rows]; }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/rot-js/lib/display/tile-gl.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/display/tile-gl.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TileGL; });
/* harmony import */ var _backend_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./backend.js */ "./node_modules/rot-js/lib/display/backend.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.js */ "./node_modules/rot-js/lib/color.js");


/**
 * @class Tile backend
 * @private
 */
class TileGL extends _backend_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._uniforms = {};
        try {
            this._gl = this._initWebGL();
        }
        catch (e) {
            alert(e.message);
        }
    }
    static isSupported() {
        return !!document.createElement("canvas").getContext("webgl2", { preserveDrawingBuffer: true });
    }
    schedule(cb) { requestAnimationFrame(cb); }
    getContainer() { return this._gl.canvas; }
    setOptions(opts) {
        super.setOptions(opts);
        this._updateSize();
        let tileSet = this._options.tileSet;
        if (tileSet && "complete" in tileSet && !tileSet.complete) {
            tileSet.addEventListener("load", () => this._updateTexture(tileSet));
        }
        else {
            this._updateTexture(tileSet);
        }
    }
    draw(data, clearBefore) {
        const gl = this._gl;
        const opts = this._options;
        let [x, y, ch, fg, bg] = data;
        let scissorY = gl.canvas.height - (y + 1) * opts.tileHeight;
        gl.scissor(x * opts.tileWidth, scissorY, opts.tileWidth, opts.tileHeight);
        if (clearBefore) {
            if (opts.tileColorize) {
                gl.clearColor(0, 0, 0, 0);
            }
            else {
                gl.clearColor(...parseColor(bg));
            }
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        if (!ch) {
            return;
        }
        let chars = [].concat(ch);
        let bgs = [].concat(bg);
        let fgs = [].concat(fg);
        gl.uniform2fv(this._uniforms["targetPosRel"], [x, y]);
        for (let i = 0; i < chars.length; i++) {
            let tile = this._options.tileMap[chars[i]];
            if (!tile) {
                throw new Error(`Char "${chars[i]}" not found in tileMap`);
            }
            gl.uniform1f(this._uniforms["colorize"], opts.tileColorize ? 1 : 0);
            gl.uniform2fv(this._uniforms["tilesetPosAbs"], tile);
            if (opts.tileColorize) {
                gl.uniform4fv(this._uniforms["tint"], parseColor(fgs[i]));
                gl.uniform4fv(this._uniforms["bg"], parseColor(bgs[i]));
            }
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        /*
        
        
                for (let i=0;i<chars.length;i++) {
        
                    if (this._options.tileColorize) { // apply colorization
                        let canvas = this._colorCanvas;
                        let context = canvas.getContext("2d") as CanvasRenderingContext2D;
                        context.globalCompositeOperation = "source-over";
                        context.clearRect(0, 0, tileWidth, tileHeight);
        
                        let fg = fgs[i];
                        let bg = bgs[i];
        
                        context.drawImage(
                            this._options.tileSet!,
                            tile[0], tile[1], tileWidth, tileHeight,
                            0, 0, tileWidth, tileHeight
                        );
        
                        if (fg != "transparent") {
                            context.fillStyle = fg;
                            context.globalCompositeOperation = "source-atop";
                            context.fillRect(0, 0, tileWidth, tileHeight);
                        }
        
                        if (bg != "transparent") {
                            context.fillStyle = bg;
                            context.globalCompositeOperation = "destination-over";
                            context.fillRect(0, 0, tileWidth, tileHeight);
                        }
        
                        this._ctx.drawImage(canvas, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
                    } else { // no colorizing, easy
                        this._ctx.drawImage(
                            this._options.tileSet!,
                            tile[0], tile[1], tileWidth, tileHeight,
                            x*tileWidth, y*tileHeight, tileWidth, tileHeight
                        );
                    }
                }
        
        */
    }
    clear() {
        const gl = this._gl;
        gl.clearColor(...parseColor(this._options.bg));
        gl.scissor(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    computeSize(availWidth, availHeight) {
        let width = Math.floor(availWidth / this._options.tileWidth);
        let height = Math.floor(availHeight / this._options.tileHeight);
        return [width, height];
    }
    computeFontSize() {
        throw new Error("Tile backend does not understand font size");
    }
    eventToPosition(x, y) {
        let canvas = this._gl.canvas;
        let rect = canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;
        x *= canvas.width / rect.width;
        y *= canvas.height / rect.height;
        if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
            return [-1, -1];
        }
        return this._normalizedEventToPosition(x, y);
    }
    _initWebGL() {
        let gl = document.createElement("canvas").getContext("webgl2", { preserveDrawingBuffer: true });
        window.gl = gl;
        let program = createProgram(gl, VS, FS);
        gl.useProgram(program);
        createQuad(gl);
        UNIFORMS.forEach(name => this._uniforms[name] = gl.getUniformLocation(program, name));
        this._program = program;
        gl.enable(gl.BLEND);
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.SCISSOR_TEST);
        return gl;
    }
    _normalizedEventToPosition(x, y) {
        return [Math.floor(x / this._options.tileWidth), Math.floor(y / this._options.tileHeight)];
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
    _updateTexture(tileSet) {
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
function createProgram(gl, vss, fss) {
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vss);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(vs) || "");
    }
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fss);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(fs) || "");
    }
    const p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(p) || "");
    }
    return p;
}
function createQuad(gl) {
    const pos = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
}
function createTexture(gl, data) {
    let t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    return t;
}
let colorCache = {};
function parseColor(color) {
    if (!(color in colorCache)) {
        let parsed;
        if (color == "transparent") {
            parsed = [0, 0, 0, 0];
        }
        else if (color.indexOf("rgba") > -1) {
            parsed = (color.match(/[\d.]+/g) || []).map(Number);
            for (let i = 0; i < 3; i++) {
                parsed[i] = parsed[i] / 255;
            }
        }
        else {
            parsed = _color_js__WEBPACK_IMPORTED_MODULE_1__["fromString"](color).map($ => $ / 255);
            parsed.push(1);
        }
        colorCache[color] = parsed;
    }
    return colorCache[color];
}


/***/ }),

/***/ "./node_modules/rot-js/lib/display/tile.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/display/tile.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tile; });
/* harmony import */ var _canvas_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.js */ "./node_modules/rot-js/lib/display/canvas.js");

/**
 * @class Tile backend
 * @private
 */
class Tile extends _canvas_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._colorCanvas = document.createElement("canvas");
    }
    draw(data, clearBefore) {
        let [x, y, ch, fg, bg] = data;
        let tileWidth = this._options.tileWidth;
        let tileHeight = this._options.tileHeight;
        if (clearBefore) {
            if (this._options.tileColorize) {
                this._ctx.clearRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            }
            else {
                this._ctx.fillStyle = bg;
                this._ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            }
        }
        if (!ch) {
            return;
        }
        let chars = [].concat(ch);
        let fgs = [].concat(fg);
        let bgs = [].concat(bg);
        for (let i = 0; i < chars.length; i++) {
            let tile = this._options.tileMap[chars[i]];
            if (!tile) {
                throw new Error(`Char "${chars[i]}" not found in tileMap`);
            }
            if (this._options.tileColorize) { // apply colorization
                let canvas = this._colorCanvas;
                let context = canvas.getContext("2d");
                context.globalCompositeOperation = "source-over";
                context.clearRect(0, 0, tileWidth, tileHeight);
                let fg = fgs[i];
                let bg = bgs[i];
                context.drawImage(this._options.tileSet, tile[0], tile[1], tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
                if (fg != "transparent") {
                    context.fillStyle = fg;
                    context.globalCompositeOperation = "source-atop";
                    context.fillRect(0, 0, tileWidth, tileHeight);
                }
                if (bg != "transparent") {
                    context.fillStyle = bg;
                    context.globalCompositeOperation = "destination-over";
                    context.fillRect(0, 0, tileWidth, tileHeight);
                }
                this._ctx.drawImage(canvas, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            }
            else { // no colorizing, easy
                this._ctx.drawImage(this._options.tileSet, tile[0], tile[1], tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
            }
        }
    }
    computeSize(availWidth, availHeight) {
        let width = Math.floor(availWidth / this._options.tileWidth);
        let height = Math.floor(availHeight / this._options.tileHeight);
        return [width, height];
    }
    computeFontSize() {
        throw new Error("Tile backend does not understand font size");
    }
    _normalizedEventToPosition(x, y) {
        return [Math.floor(x / this._options.tileWidth), Math.floor(y / this._options.tileHeight)];
    }
    _updateSize() {
        const opts = this._options;
        this._ctx.canvas.width = opts.width * opts.tileWidth;
        this._ctx.canvas.height = opts.height * opts.tileHeight;
        this._colorCanvas.width = opts.tileWidth;
        this._colorCanvas.height = opts.tileHeight;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/engine.js":
/*!*******************************************!*\
  !*** ./node_modules/rot-js/lib/engine.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Engine; });
/**
 * @class Asynchronous main loop
 * @param {ROT.Scheduler} scheduler
 */
class Engine {
    constructor(scheduler) {
        this._scheduler = scheduler;
        this._lock = 1;
    }
    /**
     * Start the main loop. When this call returns, the loop is locked.
     */
    start() { return this.unlock(); }
    /**
     * Interrupt the engine by an asynchronous action
     */
    lock() {
        this._lock++;
        return this;
    }
    /**
     * Resume execution (paused by a previous lock)
     */
    unlock() {
        if (!this._lock) {
            throw new Error("Cannot unlock unlocked engine");
        }
        this._lock--;
        while (!this._lock) {
            let actor = this._scheduler.next();
            if (!actor) {
                return this.lock();
            } /* no actors */
            let result = actor.act();
            if (result && result.then) { /* actor returned a "thenable", looks like a Promise */
                this.lock();
                result.then(this.unlock.bind(this));
            }
        }
        return this;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/eventqueue.js":
/*!***********************************************!*\
  !*** ./node_modules/rot-js/lib/eventqueue.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventQueue; });
/* harmony import */ var _MinHeap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MinHeap */ "./node_modules/rot-js/lib/MinHeap.js");

class EventQueue {
    /**
     * @class Generic event queue: stores events and retrieves them based on their time
     */
    constructor() {
        this._time = 0;
        this._events = new _MinHeap__WEBPACK_IMPORTED_MODULE_0__["MinHeap"]();
    }
    /**
     * @returns {number} Elapsed time
     */
    getTime() { return this._time; }
    /**
     * Clear all scheduled events
     */
    clear() {
        this._events = new _MinHeap__WEBPACK_IMPORTED_MODULE_0__["MinHeap"]();
        return this;
    }
    /**
     * @param {?} event
     * @param {number} time
     */
    add(event, time) {
        this._events.push(event, time);
    }
    /**
     * Locates the nearest event, advances time if necessary. Returns that event and removes it from the queue.
     * @returns {? || null} The event previously added by addEvent, null if no event available
     */
    get() {
        if (!this._events.len()) {
            return null;
        }
        let { key: time, value: event } = this._events.pop();
        if (time > 0) { /* advance */
            this._time += time;
            this._events.shift(-time);
        }
        return event;
    }
    /**
     * Get the time associated with the given event
     * @param {?} event
     * @returns {number} time
     */
    getEventTime(event) {
        const r = this._events.find(event);
        if (r) {
            const { key } = r;
            return key;
        }
        return undefined;
    }
    /**
     * Remove an event from the queue
     * @param {?} event
     * @returns {bool} success?
     */
    remove(event) {
        return this._events.remove(event);
    }
    ;
}


/***/ }),

/***/ "./node_modules/rot-js/lib/fov/discrete-shadowcasting.js":
/*!***************************************************************!*\
  !*** ./node_modules/rot-js/lib/fov/discrete-shadowcasting.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DiscreteShadowcasting; });
/* harmony import */ var _fov_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fov.js */ "./node_modules/rot-js/lib/fov/fov.js");

/**
 * @class Discrete shadowcasting algorithm. Obsoleted by Precise shadowcasting.
 * @augments ROT.FOV
 */
class DiscreteShadowcasting extends _fov_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    compute(x, y, R, callback) {
        /* this place is always visible */
        callback(x, y, 0, 1);
        /* standing in a dark place. FIXME is this a good idea?  */
        if (!this._lightPasses(x, y)) {
            return;
        }
        /* start and end angles */
        let DATA = [];
        let A, B, cx, cy, blocks;
        /* analyze surrounding cells in concentric rings, starting from the center */
        for (let r = 1; r <= R; r++) {
            let neighbors = this._getCircle(x, y, r);
            let angle = 360 / neighbors.length;
            for (let i = 0; i < neighbors.length; i++) {
                cx = neighbors[i][0];
                cy = neighbors[i][1];
                A = angle * (i - 0.5);
                B = A + angle;
                blocks = !this._lightPasses(cx, cy);
                if (this._visibleCoords(Math.floor(A), Math.ceil(B), blocks, DATA)) {
                    callback(cx, cy, r, 1);
                }
                if (DATA.length == 2 && DATA[0] == 0 && DATA[1] == 360) {
                    return;
                } /* cutoff? */
            } /* for all cells in this ring */
        } /* for all rings */
    }
    /**
     * @param {int} A start angle
     * @param {int} B end angle
     * @param {bool} blocks Does current cell block visibility?
     * @param {int[][]} DATA shadowed angle pairs
     */
    _visibleCoords(A, B, blocks, DATA) {
        if (A < 0) {
            let v1 = this._visibleCoords(0, B, blocks, DATA);
            let v2 = this._visibleCoords(360 + A, 360, blocks, DATA);
            return v1 || v2;
        }
        let index = 0;
        while (index < DATA.length && DATA[index] < A) {
            index++;
        }
        if (index == DATA.length) { /* completely new shadow */
            if (blocks) {
                DATA.push(A, B);
            }
            return true;
        }
        let count = 0;
        if (index % 2) { /* this shadow starts in an existing shadow, or within its ending boundary */
            while (index < DATA.length && DATA[index] < B) {
                index++;
                count++;
            }
            if (count == 0) {
                return false;
            }
            if (blocks) {
                if (count % 2) {
                    DATA.splice(index - count, count, B);
                }
                else {
                    DATA.splice(index - count, count);
                }
            }
            return true;
        }
        else { /* this shadow starts outside an existing shadow, or within a starting boundary */
            while (index < DATA.length && DATA[index] < B) {
                index++;
                count++;
            }
            /* visible when outside an existing shadow, or when overlapping */
            if (A == DATA[index - count] && count == 1) {
                return false;
            }
            if (blocks) {
                if (count % 2) {
                    DATA.splice(index - count, count, A);
                }
                else {
                    DATA.splice(index - count, count, A, B);
                }
            }
            return true;
        }
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/fov/fov.js":
/*!********************************************!*\
  !*** ./node_modules/rot-js/lib/fov/fov.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FOV; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");

;
;
class FOV {
    /**
     * @class Abstract FOV algorithm
     * @param {function} lightPassesCallback Does the light pass through x,y?
     * @param {object} [options]
     * @param {int} [options.topology=8] 4/6/8
     */
    constructor(lightPassesCallback, options = {}) {
        this._lightPasses = lightPassesCallback;
        this._options = Object.assign({ topology: 8 }, options);
    }
    /**
     * Return all neighbors in a concentric ring
     * @param {int} cx center-x
     * @param {int} cy center-y
     * @param {int} r range
     */
    _getCircle(cx, cy, r) {
        let result = [];
        let dirs, countFactor, startOffset;
        switch (this._options.topology) {
            case 4:
                countFactor = 1;
                startOffset = [0, 1];
                dirs = [
                    _constants_js__WEBPACK_IMPORTED_MODULE_0__["DIRS"][8][7],
                    _constants_js__WEBPACK_IMPORTED_MODULE_0__["DIRS"][8][1],
                    _constants_js__WEBPACK_IMPORTED_MODULE_0__["DIRS"][8][3],
                    _constants_js__WEBPACK_IMPORTED_MODULE_0__["DIRS"][8][5]
                ];
                break;
            case 6:
                dirs = _constants_js__WEBPACK_IMPORTED_MODULE_0__["DIRS"][6];
                countFactor = 1;
                startOffset = [-1, 1];
                break;
            case 8:
                dirs = _constants_js__WEBPACK_IMPORTED_MODULE_0__["DIRS"][4];
                countFactor = 2;
                startOffset = [-1, 1];
                break;
            default:
                throw new Error("Incorrect topology for FOV computation");
                break;
        }
        /* starting neighbor */
        let x = cx + startOffset[0] * r;
        let y = cy + startOffset[1] * r;
        /* circle */
        for (let i = 0; i < dirs.length; i++) {
            for (let j = 0; j < r * countFactor; j++) {
                result.push([x, y]);
                x += dirs[i][0];
                y += dirs[i][1];
            }
        }
        return result;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/fov/index.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/fov/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _discrete_shadowcasting_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./discrete-shadowcasting.js */ "./node_modules/rot-js/lib/fov/discrete-shadowcasting.js");
/* harmony import */ var _precise_shadowcasting_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./precise-shadowcasting.js */ "./node_modules/rot-js/lib/fov/precise-shadowcasting.js");
/* harmony import */ var _recursive_shadowcasting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recursive-shadowcasting.js */ "./node_modules/rot-js/lib/fov/recursive-shadowcasting.js");



/* harmony default export */ __webpack_exports__["default"] = ({ DiscreteShadowcasting: _discrete_shadowcasting_js__WEBPACK_IMPORTED_MODULE_0__["default"], PreciseShadowcasting: _precise_shadowcasting_js__WEBPACK_IMPORTED_MODULE_1__["default"], RecursiveShadowcasting: _recursive_shadowcasting_js__WEBPACK_IMPORTED_MODULE_2__["default"] });


/***/ }),

/***/ "./node_modules/rot-js/lib/fov/precise-shadowcasting.js":
/*!**************************************************************!*\
  !*** ./node_modules/rot-js/lib/fov/precise-shadowcasting.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PreciseShadowcasting; });
/* harmony import */ var _fov_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fov.js */ "./node_modules/rot-js/lib/fov/fov.js");

/**
 * @class Precise shadowcasting algorithm
 * @augments ROT.FOV
 */
class PreciseShadowcasting extends _fov_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    compute(x, y, R, callback) {
        /* this place is always visible */
        callback(x, y, 0, 1);
        /* standing in a dark place. FIXME is this a good idea?  */
        if (!this._lightPasses(x, y)) {
            return;
        }
        /* list of all shadows */
        let SHADOWS = [];
        let cx, cy, blocks, A1, A2, visibility;
        /* analyze surrounding cells in concentric rings, starting from the center */
        for (let r = 1; r <= R; r++) {
            let neighbors = this._getCircle(x, y, r);
            let neighborCount = neighbors.length;
            for (let i = 0; i < neighborCount; i++) {
                cx = neighbors[i][0];
                cy = neighbors[i][1];
                /* shift half-an-angle backwards to maintain consistency of 0-th cells */
                A1 = [i ? 2 * i - 1 : 2 * neighborCount - 1, 2 * neighborCount];
                A2 = [2 * i + 1, 2 * neighborCount];
                blocks = !this._lightPasses(cx, cy);
                visibility = this._checkVisibility(A1, A2, blocks, SHADOWS);
                if (visibility) {
                    callback(cx, cy, r, visibility);
                }
                if (SHADOWS.length == 2 && SHADOWS[0][0] == 0 && SHADOWS[1][0] == SHADOWS[1][1]) {
                    return;
                } /* cutoff? */
            } /* for all cells in this ring */
        } /* for all rings */
    }
    /**
     * @param {int[2]} A1 arc start
     * @param {int[2]} A2 arc end
     * @param {bool} blocks Does current arc block visibility?
     * @param {int[][]} SHADOWS list of active shadows
     */
    _checkVisibility(A1, A2, blocks, SHADOWS) {
        if (A1[0] > A2[0]) { /* split into two sub-arcs */
            let v1 = this._checkVisibility(A1, [A1[1], A1[1]], blocks, SHADOWS);
            let v2 = this._checkVisibility([0, 1], A2, blocks, SHADOWS);
            return (v1 + v2) / 2;
        }
        /* index1: first shadow >= A1 */
        let index1 = 0, edge1 = false;
        while (index1 < SHADOWS.length) {
            let old = SHADOWS[index1];
            let diff = old[0] * A1[1] - A1[0] * old[1];
            if (diff >= 0) { /* old >= A1 */
                if (diff == 0 && !(index1 % 2)) {
                    edge1 = true;
                }
                break;
            }
            index1++;
        }
        /* index2: last shadow <= A2 */
        let index2 = SHADOWS.length, edge2 = false;
        while (index2--) {
            let old = SHADOWS[index2];
            let diff = A2[0] * old[1] - old[0] * A2[1];
            if (diff >= 0) { /* old <= A2 */
                if (diff == 0 && (index2 % 2)) {
                    edge2 = true;
                }
                break;
            }
        }
        let visible = true;
        if (index1 == index2 && (edge1 || edge2)) { /* subset of existing shadow, one of the edges match */
            visible = false;
        }
        else if (edge1 && edge2 && index1 + 1 == index2 && (index2 % 2)) { /* completely equivalent with existing shadow */
            visible = false;
        }
        else if (index1 > index2 && (index1 % 2)) { /* subset of existing shadow, not touching */
            visible = false;
        }
        if (!visible) {
            return 0;
        } /* fast case: not visible */
        let visibleLength;
        /* compute the length of visible arc, adjust list of shadows (if blocking) */
        let remove = index2 - index1 + 1;
        if (remove % 2) {
            if (index1 % 2) { /* first edge within existing shadow, second outside */
                let P = SHADOWS[index1];
                visibleLength = (A2[0] * P[1] - P[0] * A2[1]) / (P[1] * A2[1]);
                if (blocks) {
                    SHADOWS.splice(index1, remove, A2);
                }
            }
            else { /* second edge within existing shadow, first outside */
                let P = SHADOWS[index2];
                visibleLength = (P[0] * A1[1] - A1[0] * P[1]) / (A1[1] * P[1]);
                if (blocks) {
                    SHADOWS.splice(index1, remove, A1);
                }
            }
        }
        else {
            if (index1 % 2) { /* both edges within existing shadows */
                let P1 = SHADOWS[index1];
                let P2 = SHADOWS[index2];
                visibleLength = (P2[0] * P1[1] - P1[0] * P2[1]) / (P1[1] * P2[1]);
                if (blocks) {
                    SHADOWS.splice(index1, remove);
                }
            }
            else { /* both edges outside existing shadows */
                if (blocks) {
                    SHADOWS.splice(index1, remove, A1, A2);
                }
                return 1; /* whole arc visible! */
            }
        }
        let arcLength = (A2[0] * A1[1] - A1[0] * A2[1]) / (A1[1] * A2[1]);
        return visibleLength / arcLength;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/fov/recursive-shadowcasting.js":
/*!****************************************************************!*\
  !*** ./node_modules/rot-js/lib/fov/recursive-shadowcasting.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RecursiveShadowcasting; });
/* harmony import */ var _fov_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fov.js */ "./node_modules/rot-js/lib/fov/fov.js");

/** Octants used for translating recursive shadowcasting offsets */
const OCTANTS = [
    [-1, 0, 0, 1],
    [0, -1, 1, 0],
    [0, -1, -1, 0],
    [-1, 0, 0, -1],
    [1, 0, 0, -1],
    [0, 1, -1, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1]
];
/**
 * @class Recursive shadowcasting algorithm
 * Currently only supports 4/8 topologies, not hexagonal.
 * Based on Peter Harkins' implementation of Björn Bergström's algorithm described here: http://www.roguebasin.com/index.php?title=FOV_using_recursive_shadowcasting
 * @augments ROT.FOV
 */
class RecursiveShadowcasting extends _fov_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * Compute visibility for a 360-degree circle
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {function} callback
     */
    compute(x, y, R, callback) {
        //You can always see your own tile
        callback(x, y, 0, 1);
        for (let i = 0; i < OCTANTS.length; i++) {
            this._renderOctant(x, y, OCTANTS[i], R, callback);
        }
    }
    /**
     * Compute visibility for a 180-degree arc
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
     * @param {function} callback
     */
    compute180(x, y, R, dir, callback) {
        //You can always see your own tile
        callback(x, y, 0, 1);
        let previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 180 degrees
        let nextPreviousOctant = (dir - 2 + 8) % 8; //Need to retrieve the previous two octants to render a full 180 degrees
        let nextOctant = (dir + 1 + 8) % 8; //Need to grab to next octant to render a full 180 degrees
        this._renderOctant(x, y, OCTANTS[nextPreviousOctant], R, callback);
        this._renderOctant(x, y, OCTANTS[previousOctant], R, callback);
        this._renderOctant(x, y, OCTANTS[dir], R, callback);
        this._renderOctant(x, y, OCTANTS[nextOctant], R, callback);
    }
    ;
    /**
     * Compute visibility for a 90-degree arc
     * @param {int} x
     * @param {int} y
     * @param {int} R Maximum visibility radius
     * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
     * @param {function} callback
     */
    compute90(x, y, R, dir, callback) {
        //You can always see your own tile
        callback(x, y, 0, 1);
        let previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 90 degrees
        this._renderOctant(x, y, OCTANTS[dir], R, callback);
        this._renderOctant(x, y, OCTANTS[previousOctant], R, callback);
    }
    /**
     * Render one octant (45-degree arc) of the viewshed
     * @param {int} x
     * @param {int} y
     * @param {int} octant Octant to be rendered
     * @param {int} R Maximum visibility radius
     * @param {function} callback
     */
    _renderOctant(x, y, octant, R, callback) {
        //Radius incremented by 1 to provide same coverage area as other shadowcasting radiuses
        this._castVisibility(x, y, 1, 1.0, 0.0, R + 1, octant[0], octant[1], octant[2], octant[3], callback);
    }
    /**
     * Actually calculates the visibility
     * @param {int} startX The starting X coordinate
     * @param {int} startY The starting Y coordinate
     * @param {int} row The row to render
     * @param {float} visSlopeStart The slope to start at
     * @param {float} visSlopeEnd The slope to end at
     * @param {int} radius The radius to reach out to
     * @param {int} xx
     * @param {int} xy
     * @param {int} yx
     * @param {int} yy
     * @param {function} callback The callback to use when we hit a block that is visible
     */
    _castVisibility(startX, startY, row, visSlopeStart, visSlopeEnd, radius, xx, xy, yx, yy, callback) {
        if (visSlopeStart < visSlopeEnd) {
            return;
        }
        for (let i = row; i <= radius; i++) {
            let dx = -i - 1;
            let dy = -i;
            let blocked = false;
            let newStart = 0;
            //'Row' could be column, names here assume octant 0 and would be flipped for half the octants
            while (dx <= 0) {
                dx += 1;
                //Translate from relative coordinates to map coordinates
                let mapX = startX + dx * xx + dy * xy;
                let mapY = startY + dx * yx + dy * yy;
                //Range of the row
                let slopeStart = (dx - 0.5) / (dy + 0.5);
                let slopeEnd = (dx + 0.5) / (dy - 0.5);
                //Ignore if not yet at left edge of Octant
                if (slopeEnd > visSlopeStart) {
                    continue;
                }
                //Done if past right edge
                if (slopeStart < visSlopeEnd) {
                    break;
                }
                //If it's in range, it's visible
                if ((dx * dx + dy * dy) < (radius * radius)) {
                    callback(mapX, mapY, i, 1);
                }
                if (!blocked) {
                    //If tile is a blocking tile, cast around it
                    if (!this._lightPasses(mapX, mapY) && i < radius) {
                        blocked = true;
                        this._castVisibility(startX, startY, i + 1, visSlopeStart, slopeStart, radius, xx, xy, yx, yy, callback);
                        newStart = slopeEnd;
                    }
                }
                else {
                    //Keep narrowing if scanning across a block
                    if (!this._lightPasses(mapX, mapY)) {
                        newStart = slopeEnd;
                        continue;
                    }
                    //Block has ended
                    blocked = false;
                    visSlopeStart = newStart;
                }
            }
            if (blocked) {
                break;
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/index.js":
/*!******************************************!*\
  !*** ./node_modules/rot-js/lib/index.js ***!
  \******************************************/
/*! exports provided: RNG, Display, StringGenerator, EventQueue, Scheduler, FOV, Map, Noise, Path, Engine, Lighting, DEFAULT_WIDTH, DEFAULT_HEIGHT, DIRS, KEYS, Util, Color, Text */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return Util; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return Text; });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/rot-js/lib/rng.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RNG", function() { return _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _display_display_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display/display.js */ "./node_modules/rot-js/lib/display/display.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Display", function() { return _display_display_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _stringgenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringgenerator.js */ "./node_modules/rot-js/lib/stringgenerator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StringGenerator", function() { return _stringgenerator_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _eventqueue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventqueue.js */ "./node_modules/rot-js/lib/eventqueue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventQueue", function() { return _eventqueue_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _scheduler_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scheduler/index.js */ "./node_modules/rot-js/lib/scheduler/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scheduler", function() { return _scheduler_index_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _fov_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fov/index.js */ "./node_modules/rot-js/lib/fov/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FOV", function() { return _fov_index_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _map_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./map/index.js */ "./node_modules/rot-js/lib/map/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return _map_index_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _noise_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./noise/index.js */ "./node_modules/rot-js/lib/noise/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Noise", function() { return _noise_index_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _path_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./path/index.js */ "./node_modules/rot-js/lib/path/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Path", function() { return _path_index_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _engine_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./engine.js */ "./node_modules/rot-js/lib/engine.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Engine", function() { return _engine_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _lighting_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lighting.js */ "./node_modules/rot-js/lib/lighting.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Lighting", function() { return _lighting_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./constants.js */ "./node_modules/rot-js/lib/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_WIDTH", function() { return _constants_js__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_WIDTH"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_HEIGHT", function() { return _constants_js__WEBPACK_IMPORTED_MODULE_11__["DEFAULT_HEIGHT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DIRS", function() { return _constants_js__WEBPACK_IMPORTED_MODULE_11__["DIRS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KEYS", function() { return _constants_js__WEBPACK_IMPORTED_MODULE_11__["KEYS"]; });

/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./util.js */ "./node_modules/rot-js/lib/util.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./color.js */ "./node_modules/rot-js/lib/color.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./text.js */ "./node_modules/rot-js/lib/text.js");













const Util = _util_js__WEBPACK_IMPORTED_MODULE_12__;

const Color = _color_js__WEBPACK_IMPORTED_MODULE_13__;

const Text = _text_js__WEBPACK_IMPORTED_MODULE_14__;


/***/ }),

/***/ "./node_modules/rot-js/lib/lighting.js":
/*!*********************************************!*\
  !*** ./node_modules/rot-js/lib/lighting.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Lighting; });
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "./node_modules/rot-js/lib/color.js");

;
;
;
;
/**
 * Lighting computation, based on a traditional FOV for multiple light sources and multiple passes.
 */
class Lighting {
    constructor(reflectivityCallback, options = {}) {
        this._reflectivityCallback = reflectivityCallback;
        this._options = {};
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
    setOptions(options) {
        Object.assign(this._options, options);
        if (options && options.range) {
            this.reset();
        }
        return this;
    }
    /**
     * Set the used Field-Of-View algo
     */
    setFOV(fov) {
        this._fov = fov;
        this._fovCache = {};
        return this;
    }
    /**
     * Set (or remove) a light source
     */
    setLight(x, y, color) {
        let key = x + "," + y;
        if (color) {
            this._lights[key] = (typeof (color) == "string" ? _color_js__WEBPACK_IMPORTED_MODULE_0__["fromString"](color) : color);
        }
        else {
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
    compute(lightingCallback) {
        let doneCells = {};
        let emittingCells = {};
        let litCells = {};
        for (let key in this._lights) { /* prepare emitters for first pass */
            let light = this._lights[key];
            emittingCells[key] = [0, 0, 0];
            _color_js__WEBPACK_IMPORTED_MODULE_0__["add_"](emittingCells[key], light);
        }
        for (let i = 0; i < this._options.passes; i++) { /* main loop */
            this._emitLight(emittingCells, litCells, doneCells);
            if (i + 1 == this._options.passes) {
                continue;
            } /* not for the last pass */
            emittingCells = this._computeEmitters(litCells, doneCells);
        }
        for (let litKey in litCells) { /* let the user know what and how is lit */
            let parts = litKey.split(",");
            let x = parseInt(parts[0]);
            let y = parseInt(parts[1]);
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
    _emitLight(emittingCells, litCells, doneCells) {
        for (let key in emittingCells) {
            let parts = key.split(",");
            let x = parseInt(parts[0]);
            let y = parseInt(parts[1]);
            this._emitLightFromCell(x, y, emittingCells[key], litCells);
            doneCells[key] = 1;
        }
        return this;
    }
    /**
     * Prepare a list of emitters for next pass
     */
    _computeEmitters(litCells, doneCells) {
        let result = {};
        for (let key in litCells) {
            if (key in doneCells) {
                continue;
            } /* already emitted */
            let color = litCells[key];
            let reflectivity;
            if (key in this._reflectivityCache) {
                reflectivity = this._reflectivityCache[key];
            }
            else {
                let parts = key.split(",");
                let x = parseInt(parts[0]);
                let y = parseInt(parts[1]);
                reflectivity = this._reflectivityCallback(x, y);
                this._reflectivityCache[key] = reflectivity;
            }
            if (reflectivity == 0) {
                continue;
            } /* will not reflect at all */
            /* compute emission color */
            let emission = [0, 0, 0];
            let intensity = 0;
            for (let i = 0; i < 3; i++) {
                let part = Math.round(color[i] * reflectivity);
                emission[i] = part;
                intensity += part;
            }
            if (intensity > this._options.emissionThreshold) {
                result[key] = emission;
            }
        }
        return result;
    }
    /**
     * Compute one iteration from one cell
     */
    _emitLightFromCell(x, y, color, litCells) {
        let key = x + "," + y;
        let fov;
        if (key in this._fovCache) {
            fov = this._fovCache[key];
        }
        else {
            fov = this._updateFOV(x, y);
        }
        for (let fovKey in fov) {
            let formFactor = fov[fovKey];
            let result;
            if (fovKey in litCells) { /* already lit */
                result = litCells[fovKey];
            }
            else { /* newly lit */
                result = [0, 0, 0];
                litCells[fovKey] = result;
            }
            for (let i = 0; i < 3; i++) {
                result[i] += Math.round(color[i] * formFactor);
            } /* add light color */
        }
        return this;
    }
    /**
     * Compute FOV ("form factor") for a potential light source at [x,y]
     */
    _updateFOV(x, y) {
        let key1 = x + "," + y;
        let cache = {};
        this._fovCache[key1] = cache;
        let range = this._options.range;
        function cb(x, y, r, vis) {
            let key2 = x + "," + y;
            let formFactor = vis * (1 - r / range);
            if (formFactor == 0) {
                return;
            }
            cache[key2] = formFactor;
        }
        ;
        this._fov.compute(x, y, range, cb.bind(this));
        return cache;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/arena.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/map/arena.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Arena; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");

/**
 * @class Simple empty rectangular room
 * @augments ROT.Map
 */
class Arena extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    create(callback) {
        let w = this._width - 1;
        let h = this._height - 1;
        for (let i = 0; i <= w; i++) {
            for (let j = 0; j <= h; j++) {
                let empty = (i && j && i < w && j < h);
                callback(i, j, empty ? 0 : 1);
            }
        }
        return this;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/cellular.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/map/cellular.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cellular; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");



;
/**
 * @class Cellular automaton map generator
 * @augments ROT.Map
 * @param {int} [width=ROT.DEFAULT_WIDTH]
 * @param {int} [height=ROT.DEFAULT_HEIGHT]
 * @param {object} [options] Options
 * @param {int[]} [options.born] List of neighbor counts for a new cell to be born in empty space
 * @param {int[]} [options.survive] List of neighbor counts for an existing  cell to survive
 * @param {int} [options.topology] Topology 4 or 6 or 8
 */
class Cellular extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height, options = {}) {
        super(width, height);
        this._options = {
            born: [5, 6, 7, 8],
            survive: [4, 5, 6, 7, 8],
            topology: 8
        };
        this.setOptions(options);
        this._dirs = _constants_js__WEBPACK_IMPORTED_MODULE_1__["DIRS"][this._options.topology];
        this._map = this._fillMap(0);
    }
    /**
     * Fill the map with random values
     * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
     */
    randomize(probability) {
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                this._map[i][j] = (_rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUniform() < probability ? 1 : 0);
            }
        }
        return this;
    }
    /**
     * Change options.
     * @see ROT.Map.Cellular
     */
    setOptions(options) { Object.assign(this._options, options); }
    set(x, y, value) { this._map[x][y] = value; }
    create(callback) {
        let newMap = this._fillMap(0);
        let born = this._options.born;
        let survive = this._options.survive;
        for (let j = 0; j < this._height; j++) {
            let widthStep = 1;
            let widthStart = 0;
            if (this._options.topology == 6) {
                widthStep = 2;
                widthStart = j % 2;
            }
            for (let i = widthStart; i < this._width; i += widthStep) {
                let cur = this._map[i][j];
                let ncount = this._getNeighbors(i, j);
                if (cur && survive.indexOf(ncount) != -1) { /* survive */
                    newMap[i][j] = 1;
                }
                else if (!cur && born.indexOf(ncount) != -1) { /* born */
                    newMap[i][j] = 1;
                }
            }
        }
        this._map = newMap;
        callback && this._serviceCallback(callback);
    }
    _serviceCallback(callback) {
        for (let j = 0; j < this._height; j++) {
            let widthStep = 1;
            let widthStart = 0;
            if (this._options.topology == 6) {
                widthStep = 2;
                widthStart = j % 2;
            }
            for (let i = widthStart; i < this._width; i += widthStep) {
                callback(i, j, this._map[i][j]);
            }
        }
    }
    /**
     * Get neighbor count at [i,j] in this._map
     */
    _getNeighbors(cx, cy) {
        let result = 0;
        for (let i = 0; i < this._dirs.length; i++) {
            let dir = this._dirs[i];
            let x = cx + dir[0];
            let y = cy + dir[1];
            if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
                continue;
            }
            result += (this._map[x][y] == 1 ? 1 : 0);
        }
        return result;
    }
    /**
     * Make sure every non-wall space is accessible.
     * @param {function} callback to call to display map when do
     * @param {int} value to consider empty space - defaults to 0
     * @param {function} callback to call when a new connection is made
     */
    connect(callback, value, connectionCallback) {
        if (!value)
            value = 0;
        let allFreeSpace = [];
        let notConnected = {};
        // find all free space
        let widthStep = 1;
        let widthStarts = [0, 0];
        if (this._options.topology == 6) {
            widthStep = 2;
            widthStarts = [0, 1];
        }
        for (let y = 0; y < this._height; y++) {
            for (let x = widthStarts[y % 2]; x < this._width; x += widthStep) {
                if (this._freeSpace(x, y, value)) {
                    let p = [x, y];
                    notConnected[this._pointKey(p)] = p;
                    allFreeSpace.push([x, y]);
                }
            }
        }
        let start = allFreeSpace[_rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUniformInt(0, allFreeSpace.length - 1)];
        let key = this._pointKey(start);
        let connected = {};
        connected[key] = start;
        delete notConnected[key];
        // find what's connected to the starting point
        this._findConnected(connected, notConnected, [start], false, value);
        while (Object.keys(notConnected).length > 0) {
            // find two points from notConnected to connected
            let p = this._getFromTo(connected, notConnected);
            let from = p[0]; // notConnected
            let to = p[1]; // connected
            // find everything connected to the starting point
            let local = {};
            local[this._pointKey(from)] = from;
            this._findConnected(local, notConnected, [from], true, value);
            // connect to a connected cell
            let tunnelFn = (this._options.topology == 6 ? this._tunnelToConnected6 : this._tunnelToConnected);
            tunnelFn.call(this, to, from, connected, notConnected, value, connectionCallback);
            // now all of local is connected
            for (let k in local) {
                let pp = local[k];
                this._map[pp[0]][pp[1]] = value;
                connected[k] = pp;
                delete notConnected[k];
            }
        }
        callback && this._serviceCallback(callback);
    }
    /**
     * Find random points to connect. Search for the closest point in the larger space.
     * This is to minimize the length of the passage while maintaining good performance.
     */
    _getFromTo(connected, notConnected) {
        let from = [0, 0], to = [0, 0], d;
        let connectedKeys = Object.keys(connected);
        let notConnectedKeys = Object.keys(notConnected);
        for (let i = 0; i < 5; i++) {
            if (connectedKeys.length < notConnectedKeys.length) {
                let keys = connectedKeys;
                to = connected[keys[_rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUniformInt(0, keys.length - 1)]];
                from = this._getClosest(to, notConnected);
            }
            else {
                let keys = notConnectedKeys;
                from = notConnected[keys[_rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getUniformInt(0, keys.length - 1)]];
                to = this._getClosest(from, connected);
            }
            d = (from[0] - to[0]) * (from[0] - to[0]) + (from[1] - to[1]) * (from[1] - to[1]);
            if (d < 64) {
                break;
            }
        }
        // console.log(">>> connected=" + to + " notConnected=" + from + " dist=" + d);
        return [from, to];
    }
    _getClosest(point, space) {
        let minPoint = null;
        let minDist = null;
        for (let k in space) {
            let p = space[k];
            let d = (p[0] - point[0]) * (p[0] - point[0]) + (p[1] - point[1]) * (p[1] - point[1]);
            if (minDist == null || d < minDist) {
                minDist = d;
                minPoint = p;
            }
        }
        return minPoint;
    }
    _findConnected(connected, notConnected, stack, keepNotConnected, value) {
        while (stack.length > 0) {
            let p = stack.splice(0, 1)[0];
            let tests;
            if (this._options.topology == 6) {
                tests = [
                    [p[0] + 2, p[1]],
                    [p[0] + 1, p[1] - 1],
                    [p[0] - 1, p[1] - 1],
                    [p[0] - 2, p[1]],
                    [p[0] - 1, p[1] + 1],
                    [p[0] + 1, p[1] + 1],
                ];
            }
            else {
                tests = [
                    [p[0] + 1, p[1]],
                    [p[0] - 1, p[1]],
                    [p[0], p[1] + 1],
                    [p[0], p[1] - 1]
                ];
            }
            for (let i = 0; i < tests.length; i++) {
                let key = this._pointKey(tests[i]);
                if (connected[key] == null && this._freeSpace(tests[i][0], tests[i][1], value)) {
                    connected[key] = tests[i];
                    if (!keepNotConnected) {
                        delete notConnected[key];
                    }
                    stack.push(tests[i]);
                }
            }
        }
    }
    _tunnelToConnected(to, from, connected, notConnected, value, connectionCallback) {
        let a, b;
        if (from[0] < to[0]) {
            a = from;
            b = to;
        }
        else {
            a = to;
            b = from;
        }
        for (let xx = a[0]; xx <= b[0]; xx++) {
            this._map[xx][a[1]] = value;
            let p = [xx, a[1]];
            let pkey = this._pointKey(p);
            connected[pkey] = p;
            delete notConnected[pkey];
        }
        if (connectionCallback && a[0] < b[0]) {
            connectionCallback(a, [b[0], a[1]]);
        }
        // x is now fixed
        let x = b[0];
        if (from[1] < to[1]) {
            a = from;
            b = to;
        }
        else {
            a = to;
            b = from;
        }
        for (let yy = a[1]; yy < b[1]; yy++) {
            this._map[x][yy] = value;
            let p = [x, yy];
            let pkey = this._pointKey(p);
            connected[pkey] = p;
            delete notConnected[pkey];
        }
        if (connectionCallback && a[1] < b[1]) {
            connectionCallback([b[0], a[1]], [b[0], b[1]]);
        }
    }
    _tunnelToConnected6(to, from, connected, notConnected, value, connectionCallback) {
        let a, b;
        if (from[0] < to[0]) {
            a = from;
            b = to;
        }
        else {
            a = to;
            b = from;
        }
        // tunnel diagonally until horizontally level
        let xx = a[0];
        let yy = a[1];
        while (!(xx == b[0] && yy == b[1])) {
            let stepWidth = 2;
            if (yy < b[1]) {
                yy++;
                stepWidth = 1;
            }
            else if (yy > b[1]) {
                yy--;
                stepWidth = 1;
            }
            if (xx < b[0]) {
                xx += stepWidth;
            }
            else if (xx > b[0]) {
                xx -= stepWidth;
            }
            else if (b[1] % 2) {
                // Won't step outside map if destination on is map's right edge
                xx -= stepWidth;
            }
            else {
                // ditto for left edge
                xx += stepWidth;
            }
            this._map[xx][yy] = value;
            let p = [xx, yy];
            let pkey = this._pointKey(p);
            connected[pkey] = p;
            delete notConnected[pkey];
        }
        if (connectionCallback) {
            connectionCallback(from, to);
        }
    }
    _freeSpace(x, y, value) {
        return x >= 0 && x < this._width && y >= 0 && y < this._height && this._map[x][y] == value;
    }
    _pointKey(p) { return p[0] + "." + p[1]; }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/digger.js":
/*!***********************************************!*\
  !*** ./node_modules/rot-js/lib/map/digger.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Digger; });
/* harmony import */ var _dungeon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dungeon.js */ "./node_modules/rot-js/lib/map/dungeon.js");
/* harmony import */ var _features_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./features.js */ "./node_modules/rot-js/lib/map/features.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");




const FEATURES = {
    "room": _features_js__WEBPACK_IMPORTED_MODULE_1__["Room"],
    "corridor": _features_js__WEBPACK_IMPORTED_MODULE_1__["Corridor"]
};
/**
 * Random dungeon generator using human-like digging patterns.
 * Heavily based on Mike Anderson's ideas from the "Tyrant" algo, mentioned at
 * http://www.roguebasin.roguelikedevelopment.org/index.php?title=Dungeon-Building_Algorithm.
 */
class Digger extends _dungeon_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height, options = {}) {
        super(width, height);
        this._options = Object.assign({
            roomWidth: [3, 9],
            roomHeight: [3, 5],
            corridorLength: [3, 10],
            dugPercentage: 0.2,
            timeLimit: 1000 /* we stop after this much time has passed (msec) */
        }, options);
        this._features = {
            "room": 4,
            "corridor": 4
        };
        this._map = [];
        this._featureAttempts = 20; /* how many times do we try to create a feature on a suitable wall */
        this._walls = {}; /* these are available for digging */
        this._dug = 0;
        this._digCallback = this._digCallback.bind(this);
        this._canBeDugCallback = this._canBeDugCallback.bind(this);
        this._isWallCallback = this._isWallCallback.bind(this);
        this._priorityWallCallback = this._priorityWallCallback.bind(this);
    }
    create(callback) {
        this._rooms = [];
        this._corridors = [];
        this._map = this._fillMap(1);
        this._walls = {};
        this._dug = 0;
        let area = (this._width - 2) * (this._height - 2);
        this._firstRoom();
        let t1 = Date.now();
        let priorityWalls;
        do {
            priorityWalls = 0;
            let t2 = Date.now();
            if (t2 - t1 > this._options.timeLimit) {
                break;
            }
            /* find a good wall */
            let wall = this._findWall();
            if (!wall) {
                break;
            } /* no more walls */
            let parts = wall.split(",");
            let x = parseInt(parts[0]);
            let y = parseInt(parts[1]);
            let dir = this._getDiggingDirection(x, y);
            if (!dir) {
                continue;
            } /* this wall is not suitable */
            //		console.log("wall", x, y);
            /* try adding a feature */
            let featureAttempts = 0;
            do {
                featureAttempts++;
                if (this._tryFeature(x, y, dir[0], dir[1])) { /* feature added */
                    //if (this._rooms.length + this._corridors.length == 2) { this._rooms[0].addDoor(x, y); } /* first room oficially has doors */
                    this._removeSurroundingWalls(x, y);
                    this._removeSurroundingWalls(x - dir[0], y - dir[1]);
                    break;
                }
            } while (featureAttempts < this._featureAttempts);
            for (let id in this._walls) {
                if (this._walls[id] > 1) {
                    priorityWalls++;
                }
            }
        } while (this._dug / area < this._options.dugPercentage || priorityWalls); /* fixme number of priority walls */
        this._addDoors();
        if (callback) {
            for (let i = 0; i < this._width; i++) {
                for (let j = 0; j < this._height; j++) {
                    callback(i, j, this._map[i][j]);
                }
            }
        }
        this._walls = {};
        this._map = [];
        return this;
    }
    _digCallback(x, y, value) {
        if (value == 0 || value == 2) { /* empty */
            this._map[x][y] = 0;
            this._dug++;
        }
        else { /* wall */
            this._walls[x + "," + y] = 1;
        }
    }
    _isWallCallback(x, y) {
        if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
            return false;
        }
        return (this._map[x][y] == 1);
    }
    _canBeDugCallback(x, y) {
        if (x < 1 || y < 1 || x + 1 >= this._width || y + 1 >= this._height) {
            return false;
        }
        return (this._map[x][y] == 1);
    }
    _priorityWallCallback(x, y) { this._walls[x + "," + y] = 2; }
    ;
    _firstRoom() {
        let cx = Math.floor(this._width / 2);
        let cy = Math.floor(this._height / 2);
        let room = _features_js__WEBPACK_IMPORTED_MODULE_1__["Room"].createRandomCenter(cx, cy, this._options);
        this._rooms.push(room);
        room.create(this._digCallback);
    }
    /**
     * Get a suitable wall
     */
    _findWall() {
        let prio1 = [];
        let prio2 = [];
        for (let id in this._walls) {
            let prio = this._walls[id];
            if (prio == 2) {
                prio2.push(id);
            }
            else {
                prio1.push(id);
            }
        }
        let arr = (prio2.length ? prio2 : prio1);
        if (!arr.length) {
            return null;
        } /* no walls :/ */
        let id = _rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getItem(arr.sort()); // sort to make the order deterministic
        delete this._walls[id];
        return id;
    }
    /**
     * Tries adding a feature
     * @returns {bool} was this a successful try?
     */
    _tryFeature(x, y, dx, dy) {
        let featureName = _rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getWeightedValue(this._features);
        let ctor = FEATURES[featureName];
        let feature = ctor.createRandomAt(x, y, dx, dy, this._options);
        if (!feature.isValid(this._isWallCallback, this._canBeDugCallback)) {
            //		console.log("not valid");
            //		feature.debug();
            return false;
        }
        feature.create(this._digCallback);
        //	feature.debug();
        if (feature instanceof _features_js__WEBPACK_IMPORTED_MODULE_1__["Room"]) {
            this._rooms.push(feature);
        }
        if (feature instanceof _features_js__WEBPACK_IMPORTED_MODULE_1__["Corridor"]) {
            feature.createPriorityWalls(this._priorityWallCallback);
            this._corridors.push(feature);
        }
        return true;
    }
    _removeSurroundingWalls(cx, cy) {
        let deltas = _constants_js__WEBPACK_IMPORTED_MODULE_3__["DIRS"][4];
        for (let i = 0; i < deltas.length; i++) {
            let delta = deltas[i];
            let x = cx + delta[0];
            let y = cy + delta[1];
            delete this._walls[x + "," + y];
            x = cx + 2 * delta[0];
            y = cy + 2 * delta[1];
            delete this._walls[x + "," + y];
        }
    }
    /**
     * Returns vector in "digging" direction, or false, if this does not exist (or is not unique)
     */
    _getDiggingDirection(cx, cy) {
        if (cx <= 0 || cy <= 0 || cx >= this._width - 1 || cy >= this._height - 1) {
            return null;
        }
        let result = null;
        let deltas = _constants_js__WEBPACK_IMPORTED_MODULE_3__["DIRS"][4];
        for (let i = 0; i < deltas.length; i++) {
            let delta = deltas[i];
            let x = cx + delta[0];
            let y = cy + delta[1];
            if (!this._map[x][y]) { /* there already is another empty neighbor! */
                if (result) {
                    return null;
                }
                result = delta;
            }
        }
        /* no empty neighbor */
        if (!result) {
            return null;
        }
        return [-result[0], -result[1]];
    }
    /**
     * Find empty spaces surrounding rooms, and apply doors.
     */
    _addDoors() {
        let data = this._map;
        function isWallCallback(x, y) {
            return (data[x][y] == 1);
        }
        ;
        for (let i = 0; i < this._rooms.length; i++) {
            let room = this._rooms[i];
            room.clearDoors();
            room.addDoors(isWallCallback);
        }
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/dividedmaze.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/map/dividedmaze.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DividedMaze; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");


/**
 * @class Recursively divided maze, http://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method
 * @augments ROT.Map
 */
class DividedMaze extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this._stack = [];
        this._map = [];
    }
    create(callback) {
        let w = this._width;
        let h = this._height;
        this._map = [];
        for (let i = 0; i < w; i++) {
            this._map.push([]);
            for (let j = 0; j < h; j++) {
                let border = (i == 0 || j == 0 || i + 1 == w || j + 1 == h);
                this._map[i].push(border ? 1 : 0);
            }
        }
        this._stack = [
            [1, 1, w - 2, h - 2]
        ];
        this._process();
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                callback(i, j, this._map[i][j]);
            }
        }
        this._map = [];
        return this;
    }
    _process() {
        while (this._stack.length) {
            let room = this._stack.shift(); /* [left, top, right, bottom] */
            this._partitionRoom(room);
        }
    }
    _partitionRoom(room) {
        let availX = [];
        let availY = [];
        for (let i = room[0] + 1; i < room[2]; i++) {
            let top = this._map[i][room[1] - 1];
            let bottom = this._map[i][room[3] + 1];
            if (top && bottom && !(i % 2)) {
                availX.push(i);
            }
        }
        for (let j = room[1] + 1; j < room[3]; j++) {
            let left = this._map[room[0] - 1][j];
            let right = this._map[room[2] + 1][j];
            if (left && right && !(j % 2)) {
                availY.push(j);
            }
        }
        if (!availX.length || !availY.length) {
            return;
        }
        let x = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItem(availX);
        let y = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItem(availY);
        this._map[x][y] = 1;
        let walls = [];
        let w = [];
        walls.push(w); /* left part */
        for (let i = room[0]; i < x; i++) {
            this._map[i][y] = 1;
            if (i % 2)
                w.push([i, y]);
        }
        w = [];
        walls.push(w); /* right part */
        for (let i = x + 1; i <= room[2]; i++) {
            this._map[i][y] = 1;
            if (i % 2)
                w.push([i, y]);
        }
        w = [];
        walls.push(w); /* top part */
        for (let j = room[1]; j < y; j++) {
            this._map[x][j] = 1;
            if (j % 2)
                w.push([x, j]);
        }
        w = [];
        walls.push(w); /* bottom part */
        for (let j = y + 1; j <= room[3]; j++) {
            this._map[x][j] = 1;
            if (j % 2)
                w.push([x, j]);
        }
        let solid = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItem(walls);
        for (let i = 0; i < walls.length; i++) {
            let w = walls[i];
            if (w == solid) {
                continue;
            }
            let hole = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getItem(w);
            this._map[hole[0]][hole[1]] = 0;
        }
        this._stack.push([room[0], room[1], x - 1, y - 1]); /* left top */
        this._stack.push([x + 1, room[1], room[2], y - 1]); /* right top */
        this._stack.push([room[0], y + 1, x - 1, room[3]]); /* left bottom */
        this._stack.push([x + 1, y + 1, room[2], room[3]]); /* right bottom */
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/dungeon.js":
/*!************************************************!*\
  !*** ./node_modules/rot-js/lib/map/dungeon.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dungeon; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");

/**
 * @class Dungeon map: has rooms and corridors
 * @augments ROT.Map
 */
class Dungeon extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height) {
        super(width, height);
        this._rooms = [];
        this._corridors = [];
    }
    /**
     * Get all generated rooms
     * @returns {ROT.Map.Feature.Room[]}
     */
    getRooms() { return this._rooms; }
    /**
     * Get all generated corridors
     * @returns {ROT.Map.Feature.Corridor[]}
     */
    getCorridors() { return this._corridors; }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/ellermaze.js":
/*!**************************************************!*\
  !*** ./node_modules/rot-js/lib/map/ellermaze.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EllerMaze; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");


/**
 * Join lists with "i" and "i+1"
 */
function addToList(i, L, R) {
    R[L[i + 1]] = R[i];
    L[R[i]] = L[i + 1];
    R[i] = i + 1;
    L[i + 1] = i;
}
/**
 * Remove "i" from its list
 */
function removeFromList(i, L, R) {
    R[L[i]] = R[i];
    L[R[i]] = L[i];
    R[i] = i;
    L[i] = i;
}
/**
 * Maze generator - Eller's algorithm
 * See http://homepages.cwi.nl/~tromp/maze.html for explanation
 */
class EllerMaze extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    create(callback) {
        let map = this._fillMap(1);
        let w = Math.ceil((this._width - 2) / 2);
        let rand = 9 / 24;
        let L = [];
        let R = [];
        for (let i = 0; i < w; i++) {
            L.push(i);
            R.push(i);
        }
        L.push(w - 1); /* fake stop-block at the right side */
        let j;
        for (j = 1; j + 3 < this._height; j += 2) {
            /* one row */
            for (let i = 0; i < w; i++) {
                /* cell coords (will be always empty) */
                let x = 2 * i + 1;
                let y = j;
                map[x][y] = 0;
                /* right connection */
                if (i != L[i + 1] && _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() > rand) {
                    addToList(i, L, R);
                    map[x + 1][y] = 0;
                }
                /* bottom connection */
                if (i != L[i] && _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() > rand) {
                    /* remove connection */
                    removeFromList(i, L, R);
                }
                else {
                    /* create connection */
                    map[x][y + 1] = 0;
                }
            }
        }
        /* last row */
        for (let i = 0; i < w; i++) {
            /* cell coords (will be always empty) */
            let x = 2 * i + 1;
            let y = j;
            map[x][y] = 0;
            /* right connection */
            if (i != L[i + 1] && (i == L[i] || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() > rand)) {
                /* dig right also if the cell is separated, so it gets connected to the rest of maze */
                addToList(i, L, R);
                map[x + 1][y] = 0;
            }
            removeFromList(i, L, R);
        }
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                callback(i, j, map[i][j]);
            }
        }
        return this;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/features.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/map/features.js ***!
  \*************************************************/
/*! exports provided: Room, Corridor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Room", function() { return Room; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Corridor", function() { return Corridor; });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");

;
/**
 * @class Dungeon feature; has own .create() method
 */
class Feature {
}
/**
 * @class Room
 * @augments ROT.Map.Feature
 * @param {int} x1
 * @param {int} y1
 * @param {int} x2
 * @param {int} y2
 * @param {int} [doorX]
 * @param {int} [doorY]
 */
class Room extends Feature {
    constructor(x1, y1, x2, y2, doorX, doorY) {
        super();
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
        this._doors = {};
        if (doorX !== undefined && doorY !== undefined) {
            this.addDoor(doorX, doorY);
        }
    }
    ;
    /**
     * Room of random size, with a given doors and direction
     */
    static createRandomAt(x, y, dx, dy, options) {
        let min = options.roomWidth[0];
        let max = options.roomWidth[1];
        let width = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        min = options.roomHeight[0];
        max = options.roomHeight[1];
        let height = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        if (dx == 1) { /* to the right */
            let y2 = y - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * height);
            return new this(x + 1, y2, x + width, y2 + height - 1, x, y);
        }
        if (dx == -1) { /* to the left */
            let y2 = y - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * height);
            return new this(x - width, y2, x - 1, y2 + height - 1, x, y);
        }
        if (dy == 1) { /* to the bottom */
            let x2 = x - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * width);
            return new this(x2, y + 1, x2 + width - 1, y + height, x, y);
        }
        if (dy == -1) { /* to the top */
            let x2 = x - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * width);
            return new this(x2, y - height, x2 + width - 1, y - 1, x, y);
        }
        throw new Error("dx or dy must be 1 or -1");
    }
    /**
     * Room of random size, positioned around center coords
     */
    static createRandomCenter(cx, cy, options) {
        let min = options.roomWidth[0];
        let max = options.roomWidth[1];
        let width = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        min = options.roomHeight[0];
        max = options.roomHeight[1];
        let height = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        let x1 = cx - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * width);
        let y1 = cy - Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * height);
        let x2 = x1 + width - 1;
        let y2 = y1 + height - 1;
        return new this(x1, y1, x2, y2);
    }
    /**
     * Room of random size within a given dimensions
     */
    static createRandom(availWidth, availHeight, options) {
        let min = options.roomWidth[0];
        let max = options.roomWidth[1];
        let width = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        min = options.roomHeight[0];
        max = options.roomHeight[1];
        let height = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        let left = availWidth - width - 1;
        let top = availHeight - height - 1;
        let x1 = 1 + Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * left);
        let y1 = 1 + Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniform() * top);
        let x2 = x1 + width - 1;
        let y2 = y1 + height - 1;
        return new this(x1, y1, x2, y2);
    }
    addDoor(x, y) {
        this._doors[x + "," + y] = 1;
        return this;
    }
    /**
     * @param {function}
     */
    getDoors(cb) {
        for (let key in this._doors) {
            let parts = key.split(",");
            cb(parseInt(parts[0]), parseInt(parts[1]));
        }
        return this;
    }
    clearDoors() {
        this._doors = {};
        return this;
    }
    addDoors(isWallCallback) {
        let left = this._x1 - 1;
        let right = this._x2 + 1;
        let top = this._y1 - 1;
        let bottom = this._y2 + 1;
        for (let x = left; x <= right; x++) {
            for (let y = top; y <= bottom; y++) {
                if (x != left && x != right && y != top && y != bottom) {
                    continue;
                }
                if (isWallCallback(x, y)) {
                    continue;
                }
                this.addDoor(x, y);
            }
        }
        return this;
    }
    debug() {
        console.log("room", this._x1, this._y1, this._x2, this._y2);
    }
    isValid(isWallCallback, canBeDugCallback) {
        let left = this._x1 - 1;
        let right = this._x2 + 1;
        let top = this._y1 - 1;
        let bottom = this._y2 + 1;
        for (let x = left; x <= right; x++) {
            for (let y = top; y <= bottom; y++) {
                if (x == left || x == right || y == top || y == bottom) {
                    if (!isWallCallback(x, y)) {
                        return false;
                    }
                }
                else {
                    if (!canBeDugCallback(x, y)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    /**
     * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty, 1 = wall, 2 = door. Multiple doors are allowed.
     */
    create(digCallback) {
        let left = this._x1 - 1;
        let right = this._x2 + 1;
        let top = this._y1 - 1;
        let bottom = this._y2 + 1;
        let value = 0;
        for (let x = left; x <= right; x++) {
            for (let y = top; y <= bottom; y++) {
                if (x + "," + y in this._doors) {
                    value = 2;
                }
                else if (x == left || x == right || y == top || y == bottom) {
                    value = 1;
                }
                else {
                    value = 0;
                }
                digCallback(x, y, value);
            }
        }
    }
    getCenter() {
        return [Math.round((this._x1 + this._x2) / 2), Math.round((this._y1 + this._y2) / 2)];
    }
    getLeft() { return this._x1; }
    getRight() { return this._x2; }
    getTop() { return this._y1; }
    getBottom() { return this._y2; }
}
/**
 * @class Corridor
 * @augments ROT.Map.Feature
 * @param {int} startX
 * @param {int} startY
 * @param {int} endX
 * @param {int} endY
 */
class Corridor extends Feature {
    constructor(startX, startY, endX, endY) {
        super();
        this._startX = startX;
        this._startY = startY;
        this._endX = endX;
        this._endY = endY;
        this._endsWithAWall = true;
    }
    static createRandomAt(x, y, dx, dy, options) {
        let min = options.corridorLength[0];
        let max = options.corridorLength[1];
        let length = _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getUniformInt(min, max);
        return new this(x, y, x + dx * length, y + dy * length);
    }
    debug() {
        console.log("corridor", this._startX, this._startY, this._endX, this._endY);
    }
    isValid(isWallCallback, canBeDugCallback) {
        let sx = this._startX;
        let sy = this._startY;
        let dx = this._endX - sx;
        let dy = this._endY - sy;
        let length = 1 + Math.max(Math.abs(dx), Math.abs(dy));
        if (dx) {
            dx = dx / Math.abs(dx);
        }
        if (dy) {
            dy = dy / Math.abs(dy);
        }
        let nx = dy;
        let ny = -dx;
        let ok = true;
        for (let i = 0; i < length; i++) {
            let x = sx + i * dx;
            let y = sy + i * dy;
            if (!canBeDugCallback(x, y)) {
                ok = false;
            }
            if (!isWallCallback(x + nx, y + ny)) {
                ok = false;
            }
            if (!isWallCallback(x - nx, y - ny)) {
                ok = false;
            }
            if (!ok) {
                length = i;
                this._endX = x - dx;
                this._endY = y - dy;
                break;
            }
        }
        /**
         * If the length degenerated, this corridor might be invalid
         */
        /* not supported */
        if (length == 0) {
            return false;
        }
        /* length 1 allowed only if the next space is empty */
        if (length == 1 && isWallCallback(this._endX + dx, this._endY + dy)) {
            return false;
        }
        /**
         * We do not want the corridor to crash into a corner of a room;
         * if any of the ending corners is empty, the N+1th cell of this corridor must be empty too.
         *
         * Situation:
         * #######1
         * .......?
         * #######2
         *
         * The corridor was dug from left to right.
         * 1, 2 - problematic corners, ? = N+1th cell (not dug)
         */
        let firstCornerBad = !isWallCallback(this._endX + dx + nx, this._endY + dy + ny);
        let secondCornerBad = !isWallCallback(this._endX + dx - nx, this._endY + dy - ny);
        this._endsWithAWall = isWallCallback(this._endX + dx, this._endY + dy);
        if ((firstCornerBad || secondCornerBad) && this._endsWithAWall) {
            return false;
        }
        return true;
    }
    /**
     * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty.
     */
    create(digCallback) {
        let sx = this._startX;
        let sy = this._startY;
        let dx = this._endX - sx;
        let dy = this._endY - sy;
        let length = 1 + Math.max(Math.abs(dx), Math.abs(dy));
        if (dx) {
            dx = dx / Math.abs(dx);
        }
        if (dy) {
            dy = dy / Math.abs(dy);
        }
        for (let i = 0; i < length; i++) {
            let x = sx + i * dx;
            let y = sy + i * dy;
            digCallback(x, y, 0);
        }
        return true;
    }
    createPriorityWalls(priorityWallCallback) {
        if (!this._endsWithAWall) {
            return;
        }
        let sx = this._startX;
        let sy = this._startY;
        let dx = this._endX - sx;
        let dy = this._endY - sy;
        if (dx) {
            dx = dx / Math.abs(dx);
        }
        if (dy) {
            dy = dy / Math.abs(dy);
        }
        let nx = dy;
        let ny = -dx;
        priorityWallCallback(this._endX + dx, this._endY + dy);
        priorityWallCallback(this._endX + nx, this._endY + ny);
        priorityWallCallback(this._endX - nx, this._endY - ny);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/iceymaze.js":
/*!*************************************************!*\
  !*** ./node_modules/rot-js/lib/map/iceymaze.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IceyMaze; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");


/**
 * Icey's Maze generator
 * See http://www.roguebasin.roguelikedevelopment.org/index.php?title=Simple_maze for explanation
 */
class IceyMaze extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height, regularity = 0) {
        super(width, height);
        this._regularity = regularity;
        this._map = [];
    }
    create(callback) {
        let width = this._width;
        let height = this._height;
        let map = this._fillMap(1);
        width -= (width % 2 ? 1 : 2);
        height -= (height % 2 ? 1 : 2);
        let cx = 0;
        let cy = 0;
        let nx = 0;
        let ny = 0;
        let done = 0;
        let blocked = false;
        let dirs = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        do {
            cx = 1 + 2 * Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() * (width - 1) / 2);
            cy = 1 + 2 * Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() * (height - 1) / 2);
            if (!done) {
                map[cx][cy] = 0;
            }
            if (!map[cx][cy]) {
                this._randomize(dirs);
                do {
                    if (Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() * (this._regularity + 1)) == 0) {
                        this._randomize(dirs);
                    }
                    blocked = true;
                    for (let i = 0; i < 4; i++) {
                        nx = cx + dirs[i][0] * 2;
                        ny = cy + dirs[i][1] * 2;
                        if (this._isFree(map, nx, ny, width, height)) {
                            map[nx][ny] = 0;
                            map[cx + dirs[i][0]][cy + dirs[i][1]] = 0;
                            cx = nx;
                            cy = ny;
                            blocked = false;
                            done++;
                            break;
                        }
                    }
                } while (!blocked);
            }
        } while (done + 1 < width * height / 4);
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                callback(i, j, map[i][j]);
            }
        }
        this._map = [];
        return this;
    }
    _randomize(dirs) {
        for (let i = 0; i < 4; i++) {
            dirs[i][0] = 0;
            dirs[i][1] = 0;
        }
        switch (Math.floor(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform() * 4)) {
            case 0:
                dirs[0][0] = -1;
                dirs[1][0] = 1;
                dirs[2][1] = -1;
                dirs[3][1] = 1;
                break;
            case 1:
                dirs[3][0] = -1;
                dirs[2][0] = 1;
                dirs[1][1] = -1;
                dirs[0][1] = 1;
                break;
            case 2:
                dirs[2][0] = -1;
                dirs[3][0] = 1;
                dirs[0][1] = -1;
                dirs[1][1] = 1;
                break;
            case 3:
                dirs[1][0] = -1;
                dirs[0][0] = 1;
                dirs[3][1] = -1;
                dirs[2][1] = 1;
                break;
        }
    }
    _isFree(map, x, y, width, height) {
        if (x < 1 || y < 1 || x >= width || y >= height) {
            return false;
        }
        return map[x][y];
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/index.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/map/index.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _arena_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arena.js */ "./node_modules/rot-js/lib/map/arena.js");
/* harmony import */ var _uniform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uniform.js */ "./node_modules/rot-js/lib/map/uniform.js");
/* harmony import */ var _cellular_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cellular.js */ "./node_modules/rot-js/lib/map/cellular.js");
/* harmony import */ var _digger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./digger.js */ "./node_modules/rot-js/lib/map/digger.js");
/* harmony import */ var _ellermaze_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ellermaze.js */ "./node_modules/rot-js/lib/map/ellermaze.js");
/* harmony import */ var _dividedmaze_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dividedmaze.js */ "./node_modules/rot-js/lib/map/dividedmaze.js");
/* harmony import */ var _iceymaze_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./iceymaze.js */ "./node_modules/rot-js/lib/map/iceymaze.js");
/* harmony import */ var _rogue_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rogue.js */ "./node_modules/rot-js/lib/map/rogue.js");








/* harmony default export */ __webpack_exports__["default"] = ({ Arena: _arena_js__WEBPACK_IMPORTED_MODULE_0__["default"], Uniform: _uniform_js__WEBPACK_IMPORTED_MODULE_1__["default"], Cellular: _cellular_js__WEBPACK_IMPORTED_MODULE_2__["default"], Digger: _digger_js__WEBPACK_IMPORTED_MODULE_3__["default"], EllerMaze: _ellermaze_js__WEBPACK_IMPORTED_MODULE_4__["default"], DividedMaze: _dividedmaze_js__WEBPACK_IMPORTED_MODULE_5__["default"], IceyMaze: _iceymaze_js__WEBPACK_IMPORTED_MODULE_6__["default"], Rogue: _rogue_js__WEBPACK_IMPORTED_MODULE_7__["default"] });


/***/ }),

/***/ "./node_modules/rot-js/lib/map/map.js":
/*!********************************************!*\
  !*** ./node_modules/rot-js/lib/map/map.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Map; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");

;
class Map {
    /**
     * @class Base map generator
     * @param {int} [width=ROT.DEFAULT_WIDTH]
     * @param {int} [height=ROT.DEFAULT_HEIGHT]
     */
    constructor(width = _constants_js__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_WIDTH"], height = _constants_js__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_HEIGHT"]) {
        this._width = width;
        this._height = height;
    }
    ;
    _fillMap(value) {
        let map = [];
        for (let i = 0; i < this._width; i++) {
            map.push([]);
            for (let j = 0; j < this._height; j++) {
                map[i].push(value);
            }
        }
        return map;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/rogue.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/map/rogue.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rogue; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/rot-js/lib/map/map.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");



/**
 * Dungeon generator which uses the "orginal" Rogue dungeon generation algorithm. See http://kuoi.com/~kamikaze/GameDesign/art07_rogue_dungeon.php
 * @author hyakugei
 */
class Rogue extends _map_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height, options) {
        super(width, height);
        this.map = [];
        this.rooms = [];
        this.connectedCells = [];
        options = Object.assign({
            cellWidth: 3,
            cellHeight: 3 //     ie. as an array with min-max values for each direction....
        }, options);
        /*
        Set the room sizes according to the over-all width of the map,
        and the cell sizes.
        */
        if (!options.hasOwnProperty("roomWidth")) {
            options["roomWidth"] = this._calculateRoomSize(this._width, options["cellWidth"]);
        }
        if (!options.hasOwnProperty("roomHeight")) {
            options["roomHeight"] = this._calculateRoomSize(this._height, options["cellHeight"]);
        }
        this._options = options;
    }
    create(callback) {
        this.map = this._fillMap(1);
        this.rooms = [];
        this.connectedCells = [];
        this._initRooms();
        this._connectRooms();
        this._connectUnconnectedRooms();
        this._createRandomRoomConnections();
        this._createRooms();
        this._createCorridors();
        if (callback) {
            for (let i = 0; i < this._width; i++) {
                for (let j = 0; j < this._height; j++) {
                    callback(i, j, this.map[i][j]);
                }
            }
        }
        return this;
    }
    _calculateRoomSize(size, cell) {
        let max = Math.floor((size / cell) * 0.8);
        let min = Math.floor((size / cell) * 0.25);
        if (min < 2) {
            min = 2;
        }
        if (max < 2) {
            max = 2;
        }
        return [min, max];
    }
    _initRooms() {
        // create rooms array. This is the "grid" list from the algo.
        for (let i = 0; i < this._options.cellWidth; i++) {
            this.rooms.push([]);
            for (let j = 0; j < this._options.cellHeight; j++) {
                this.rooms[i].push({ "x": 0, "y": 0, "width": 0, "height": 0, "connections": [], "cellx": i, "celly": j });
            }
        }
    }
    _connectRooms() {
        //pick random starting grid
        let cgx = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(0, this._options.cellWidth - 1);
        let cgy = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(0, this._options.cellHeight - 1);
        let idx;
        let ncgx;
        let ncgy;
        let found = false;
        let room;
        let otherRoom;
        let dirToCheck;
        // find  unconnected neighbour cells
        do {
            //dirToCheck = [0, 1, 2, 3, 4, 5, 6, 7];
            dirToCheck = [0, 2, 4, 6];
            dirToCheck = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].shuffle(dirToCheck);
            do {
                found = false;
                idx = dirToCheck.pop();
                ncgx = cgx + _constants_js__WEBPACK_IMPORTED_MODULE_2__["DIRS"][8][idx][0];
                ncgy = cgy + _constants_js__WEBPACK_IMPORTED_MODULE_2__["DIRS"][8][idx][1];
                if (ncgx < 0 || ncgx >= this._options.cellWidth) {
                    continue;
                }
                if (ncgy < 0 || ncgy >= this._options.cellHeight) {
                    continue;
                }
                room = this.rooms[cgx][cgy];
                if (room["connections"].length > 0) {
                    // as long as this room doesn't already coonect to me, we are ok with it.
                    if (room["connections"][0][0] == ncgx && room["connections"][0][1] == ncgy) {
                        break;
                    }
                }
                otherRoom = this.rooms[ncgx][ncgy];
                if (otherRoom["connections"].length == 0) {
                    otherRoom["connections"].push([cgx, cgy]);
                    this.connectedCells.push([ncgx, ncgy]);
                    cgx = ncgx;
                    cgy = ncgy;
                    found = true;
                }
            } while (dirToCheck.length > 0 && found == false);
        } while (dirToCheck.length > 0);
    }
    _connectUnconnectedRooms() {
        //While there are unconnected rooms, try to connect them to a random connected neighbor
        //(if a room has no connected neighbors yet, just keep cycling, you'll fill out to it eventually).
        let cw = this._options.cellWidth;
        let ch = this._options.cellHeight;
        this.connectedCells = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].shuffle(this.connectedCells);
        let room;
        let otherRoom;
        let validRoom;
        for (let i = 0; i < this._options.cellWidth; i++) {
            for (let j = 0; j < this._options.cellHeight; j++) {
                room = this.rooms[i][j];
                if (room["connections"].length == 0) {
                    let directions = [0, 2, 4, 6];
                    directions = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].shuffle(directions);
                    validRoom = false;
                    do {
                        let dirIdx = directions.pop();
                        let newI = i + _constants_js__WEBPACK_IMPORTED_MODULE_2__["DIRS"][8][dirIdx][0];
                        let newJ = j + _constants_js__WEBPACK_IMPORTED_MODULE_2__["DIRS"][8][dirIdx][1];
                        if (newI < 0 || newI >= cw || newJ < 0 || newJ >= ch) {
                            continue;
                        }
                        otherRoom = this.rooms[newI][newJ];
                        validRoom = true;
                        if (otherRoom["connections"].length == 0) {
                            break;
                        }
                        for (let k = 0; k < otherRoom["connections"].length; k++) {
                            if (otherRoom["connections"][k][0] == i && otherRoom["connections"][k][1] == j) {
                                validRoom = false;
                                break;
                            }
                        }
                        if (validRoom) {
                            break;
                        }
                    } while (directions.length);
                    if (validRoom) {
                        room["connections"].push([otherRoom["cellx"], otherRoom["celly"]]);
                    }
                    else {
                        console.log("-- Unable to connect room.");
                    }
                }
            }
        }
    }
    _createRandomRoomConnections() {
        // Empty for now.
    }
    _createRooms() {
        let w = this._width;
        let h = this._height;
        let cw = this._options.cellWidth;
        let ch = this._options.cellHeight;
        let cwp = Math.floor(this._width / cw);
        let chp = Math.floor(this._height / ch);
        let roomw;
        let roomh;
        let roomWidth = this._options["roomWidth"];
        let roomHeight = this._options["roomHeight"];
        let sx;
        let sy;
        let otherRoom;
        for (let i = 0; i < cw; i++) {
            for (let j = 0; j < ch; j++) {
                sx = cwp * i;
                sy = chp * j;
                if (sx == 0) {
                    sx = 1;
                }
                if (sy == 0) {
                    sy = 1;
                }
                roomw = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(roomWidth[0], roomWidth[1]);
                roomh = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(roomHeight[0], roomHeight[1]);
                if (j > 0) {
                    otherRoom = this.rooms[i][j - 1];
                    while (sy - (otherRoom["y"] + otherRoom["height"]) < 3) {
                        sy++;
                    }
                }
                if (i > 0) {
                    otherRoom = this.rooms[i - 1][j];
                    while (sx - (otherRoom["x"] + otherRoom["width"]) < 3) {
                        sx++;
                    }
                }
                let sxOffset = Math.round(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(0, cwp - roomw) / 2);
                let syOffset = Math.round(_rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(0, chp - roomh) / 2);
                while (sx + sxOffset + roomw >= w) {
                    if (sxOffset) {
                        sxOffset--;
                    }
                    else {
                        roomw--;
                    }
                }
                while (sy + syOffset + roomh >= h) {
                    if (syOffset) {
                        syOffset--;
                    }
                    else {
                        roomh--;
                    }
                }
                sx = sx + sxOffset;
                sy = sy + syOffset;
                this.rooms[i][j]["x"] = sx;
                this.rooms[i][j]["y"] = sy;
                this.rooms[i][j]["width"] = roomw;
                this.rooms[i][j]["height"] = roomh;
                for (let ii = sx; ii < sx + roomw; ii++) {
                    for (let jj = sy; jj < sy + roomh; jj++) {
                        this.map[ii][jj] = 0;
                    }
                }
            }
        }
    }
    _getWallPosition(aRoom, aDirection) {
        let rx;
        let ry;
        let door;
        if (aDirection == 1 || aDirection == 3) {
            rx = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(aRoom["x"] + 1, aRoom["x"] + aRoom["width"] - 2);
            if (aDirection == 1) {
                ry = aRoom["y"] - 2;
                door = ry + 1;
            }
            else {
                ry = aRoom["y"] + aRoom["height"] + 1;
                door = ry - 1;
            }
            this.map[rx][door] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.
        }
        else {
            ry = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniformInt(aRoom["y"] + 1, aRoom["y"] + aRoom["height"] - 2);
            if (aDirection == 2) {
                rx = aRoom["x"] + aRoom["width"] + 1;
                door = rx - 1;
            }
            else {
                rx = aRoom["x"] - 2;
                door = rx + 1;
            }
            this.map[door][ry] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.
        }
        return [rx, ry];
    }
    _drawCorridor(startPosition, endPosition) {
        let xOffset = endPosition[0] - startPosition[0];
        let yOffset = endPosition[1] - startPosition[1];
        let xpos = startPosition[0];
        let ypos = startPosition[1];
        let tempDist;
        let xDir;
        let yDir;
        let move; // 2 element array, element 0 is the direction, element 1 is the total value to move.
        let moves = []; // a list of 2 element arrays
        let xAbs = Math.abs(xOffset);
        let yAbs = Math.abs(yOffset);
        let percent = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].getUniform(); // used to split the move at different places along the long axis
        let firstHalf = percent;
        let secondHalf = 1 - percent;
        xDir = xOffset > 0 ? 2 : 6;
        yDir = yOffset > 0 ? 4 : 0;
        if (xAbs < yAbs) {
            // move firstHalf of the y offset
            tempDist = Math.ceil(yAbs * firstHalf);
            moves.push([yDir, tempDist]);
            // move all the x offset
            moves.push([xDir, xAbs]);
            // move sendHalf of the  y offset
            tempDist = Math.floor(yAbs * secondHalf);
            moves.push([yDir, tempDist]);
        }
        else {
            //  move firstHalf of the x offset
            tempDist = Math.ceil(xAbs * firstHalf);
            moves.push([xDir, tempDist]);
            // move all the y offset
            moves.push([yDir, yAbs]);
            // move secondHalf of the x offset.
            tempDist = Math.floor(xAbs * secondHalf);
            moves.push([xDir, tempDist]);
        }
        this.map[xpos][ypos] = 0;
        while (moves.length > 0) {
            move = moves.pop();
            while (move[1] > 0) {
                xpos += _constants_js__WEBPACK_IMPORTED_MODULE_2__["DIRS"][8][move[0]][0];
                ypos += _constants_js__WEBPACK_IMPORTED_MODULE_2__["DIRS"][8][move[0]][1];
                this.map[xpos][ypos] = 0;
                move[1] = move[1] - 1;
            }
        }
    }
    _createCorridors() {
        // Draw Corridors between connected rooms
        let cw = this._options.cellWidth;
        let ch = this._options.cellHeight;
        let room;
        let connection;
        let otherRoom;
        let wall;
        let otherWall;
        for (let i = 0; i < cw; i++) {
            for (let j = 0; j < ch; j++) {
                room = this.rooms[i][j];
                for (let k = 0; k < room["connections"].length; k++) {
                    connection = room["connections"][k];
                    otherRoom = this.rooms[connection[0]][connection[1]];
                    // figure out what wall our corridor will start one.
                    // figure out what wall our corridor will end on.
                    if (otherRoom["cellx"] > room["cellx"]) {
                        wall = 2;
                        otherWall = 4;
                    }
                    else if (otherRoom["cellx"] < room["cellx"]) {
                        wall = 4;
                        otherWall = 2;
                    }
                    else if (otherRoom["celly"] > room["celly"]) {
                        wall = 3;
                        otherWall = 1;
                    }
                    else {
                        wall = 1;
                        otherWall = 3;
                    }
                    this._drawCorridor(this._getWallPosition(room, wall), this._getWallPosition(otherRoom, otherWall));
                }
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/map/uniform.js":
/*!************************************************!*\
  !*** ./node_modules/rot-js/lib/map/uniform.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Uniform; });
/* harmony import */ var _dungeon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dungeon.js */ "./node_modules/rot-js/lib/map/dungeon.js");
/* harmony import */ var _features_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./features.js */ "./node_modules/rot-js/lib/map/features.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");



;
/**
 * @class Dungeon generator which tries to fill the space evenly. Generates independent rooms and tries to connect them.
 * @augments ROT.Map.Dungeon
 */
class Uniform extends _dungeon_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(width, height, options) {
        super(width, height);
        this._options = {
            roomWidth: [3, 9],
            roomHeight: [3, 5],
            roomDugPercentage: 0.1,
            timeLimit: 1000 /* we stop after this much time has passed (msec) */
        };
        Object.assign(this._options, options);
        this._map = [];
        this._dug = 0;
        this._roomAttempts = 20; /* new room is created N-times until is considered as impossible to generate */
        this._corridorAttempts = 20; /* corridors are tried N-times until the level is considered as impossible to connect */
        this._connected = []; /* list of already connected rooms */
        this._unconnected = []; /* list of remaining unconnected rooms */
        this._digCallback = this._digCallback.bind(this);
        this._canBeDugCallback = this._canBeDugCallback.bind(this);
        this._isWallCallback = this._isWallCallback.bind(this);
    }
    /**
     * Create a map. If the time limit has been hit, returns null.
     * @see ROT.Map#create
     */
    create(callback) {
        let t1 = Date.now();
        while (1) {
            let t2 = Date.now();
            if (t2 - t1 > this._options.timeLimit) {
                return null;
            } /* time limit! */
            this._map = this._fillMap(1);
            this._dug = 0;
            this._rooms = [];
            this._unconnected = [];
            this._generateRooms();
            if (this._rooms.length < 2) {
                continue;
            }
            if (this._generateCorridors()) {
                break;
            }
        }
        if (callback) {
            for (let i = 0; i < this._width; i++) {
                for (let j = 0; j < this._height; j++) {
                    callback(i, j, this._map[i][j]);
                }
            }
        }
        return this;
    }
    /**
     * Generates a suitable amount of rooms
     */
    _generateRooms() {
        let w = this._width - 2;
        let h = this._height - 2;
        let room;
        do {
            room = this._generateRoom();
            if (this._dug / (w * h) > this._options.roomDugPercentage) {
                break;
            } /* achieved requested amount of free space */
        } while (room);
        /* either enough rooms, or not able to generate more of them :) */
    }
    /**
     * Try to generate one room
     */
    _generateRoom() {
        let count = 0;
        while (count < this._roomAttempts) {
            count++;
            let room = _features_js__WEBPACK_IMPORTED_MODULE_1__["Room"].createRandom(this._width, this._height, this._options);
            if (!room.isValid(this._isWallCallback, this._canBeDugCallback)) {
                continue;
            }
            room.create(this._digCallback);
            this._rooms.push(room);
            return room;
        }
        /* no room was generated in a given number of attempts */
        return null;
    }
    /**
     * Generates connectors beween rooms
     * @returns {bool} success Was this attempt successfull?
     */
    _generateCorridors() {
        let cnt = 0;
        while (cnt < this._corridorAttempts) {
            cnt++;
            this._corridors = [];
            /* dig rooms into a clear map */
            this._map = this._fillMap(1);
            for (let i = 0; i < this._rooms.length; i++) {
                let room = this._rooms[i];
                room.clearDoors();
                room.create(this._digCallback);
            }
            this._unconnected = _rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].shuffle(this._rooms.slice());
            this._connected = [];
            if (this._unconnected.length) {
                this._connected.push(this._unconnected.pop());
            } /* first one is always connected */
            while (1) {
                /* 1. pick random connected room */
                let connected = _rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getItem(this._connected);
                if (!connected) {
                    break;
                }
                /* 2. find closest unconnected */
                let room1 = this._closestRoom(this._unconnected, connected);
                if (!room1) {
                    break;
                }
                /* 3. connect it to closest connected */
                let room2 = this._closestRoom(this._connected, room1);
                if (!room2) {
                    break;
                }
                let ok = this._connectRooms(room1, room2);
                if (!ok) {
                    break;
                } /* stop connecting, re-shuffle */
                if (!this._unconnected.length) {
                    return true;
                } /* done; no rooms remain */
            }
        }
        return false;
    }
    ;
    /**
     * For a given room, find the closest one from the list
     */
    _closestRoom(rooms, room) {
        let dist = Infinity;
        let center = room.getCenter();
        let result = null;
        for (let i = 0; i < rooms.length; i++) {
            let r = rooms[i];
            let c = r.getCenter();
            let dx = c[0] - center[0];
            let dy = c[1] - center[1];
            let d = dx * dx + dy * dy;
            if (d < dist) {
                dist = d;
                result = r;
            }
        }
        return result;
    }
    _connectRooms(room1, room2) {
        /*
            room1.debug();
            room2.debug();
        */
        let center1 = room1.getCenter();
        let center2 = room2.getCenter();
        let diffX = center2[0] - center1[0];
        let diffY = center2[1] - center1[1];
        let start;
        let end;
        let dirIndex1, dirIndex2, min, max, index;
        if (Math.abs(diffX) < Math.abs(diffY)) { /* first try connecting north-south walls */
            dirIndex1 = (diffY > 0 ? 2 : 0);
            dirIndex2 = (dirIndex1 + 2) % 4;
            min = room2.getLeft();
            max = room2.getRight();
            index = 0;
        }
        else { /* first try connecting east-west walls */
            dirIndex1 = (diffX > 0 ? 1 : 3);
            dirIndex2 = (dirIndex1 + 2) % 4;
            min = room2.getTop();
            max = room2.getBottom();
            index = 1;
        }
        start = this._placeInWall(room1, dirIndex1); /* corridor will start here */
        if (!start) {
            return false;
        }
        if (start[index] >= min && start[index] <= max) { /* possible to connect with straight line (I-like) */
            end = start.slice();
            let value = 0;
            switch (dirIndex2) {
                case 0:
                    value = room2.getTop() - 1;
                    break;
                case 1:
                    value = room2.getRight() + 1;
                    break;
                case 2:
                    value = room2.getBottom() + 1;
                    break;
                case 3:
                    value = room2.getLeft() - 1;
                    break;
            }
            end[(index + 1) % 2] = value;
            this._digLine([start, end]);
        }
        else if (start[index] < min - 1 || start[index] > max + 1) { /* need to switch target wall (L-like) */
            let diff = start[index] - center2[index];
            let rotation = 0;
            switch (dirIndex2) {
                case 0:
                case 1:
                    rotation = (diff < 0 ? 3 : 1);
                    break;
                case 2:
                case 3:
                    rotation = (diff < 0 ? 1 : 3);
                    break;
            }
            dirIndex2 = (dirIndex2 + rotation) % 4;
            end = this._placeInWall(room2, dirIndex2);
            if (!end) {
                return false;
            }
            let mid = [0, 0];
            mid[index] = start[index];
            let index2 = (index + 1) % 2;
            mid[index2] = end[index2];
            this._digLine([start, mid, end]);
        }
        else { /* use current wall pair, but adjust the line in the middle (S-like) */
            let index2 = (index + 1) % 2;
            end = this._placeInWall(room2, dirIndex2);
            if (!end) {
                return false;
            }
            let mid = Math.round((end[index2] + start[index2]) / 2);
            let mid1 = [0, 0];
            let mid2 = [0, 0];
            mid1[index] = start[index];
            mid1[index2] = mid;
            mid2[index] = end[index];
            mid2[index2] = mid;
            this._digLine([start, mid1, mid2, end]);
        }
        room1.addDoor(start[0], start[1]);
        room2.addDoor(end[0], end[1]);
        index = this._unconnected.indexOf(room1);
        if (index != -1) {
            this._unconnected.splice(index, 1);
            this._connected.push(room1);
        }
        index = this._unconnected.indexOf(room2);
        if (index != -1) {
            this._unconnected.splice(index, 1);
            this._connected.push(room2);
        }
        return true;
    }
    _placeInWall(room, dirIndex) {
        let start = [0, 0];
        let dir = [0, 0];
        let length = 0;
        switch (dirIndex) {
            case 0:
                dir = [1, 0];
                start = [room.getLeft(), room.getTop() - 1];
                length = room.getRight() - room.getLeft() + 1;
                break;
            case 1:
                dir = [0, 1];
                start = [room.getRight() + 1, room.getTop()];
                length = room.getBottom() - room.getTop() + 1;
                break;
            case 2:
                dir = [1, 0];
                start = [room.getLeft(), room.getBottom() + 1];
                length = room.getRight() - room.getLeft() + 1;
                break;
            case 3:
                dir = [0, 1];
                start = [room.getLeft() - 1, room.getTop()];
                length = room.getBottom() - room.getTop() + 1;
                break;
        }
        let avail = [];
        let lastBadIndex = -2;
        for (let i = 0; i < length; i++) {
            let x = start[0] + i * dir[0];
            let y = start[1] + i * dir[1];
            avail.push(null);
            let isWall = (this._map[x][y] == 1);
            if (isWall) {
                if (lastBadIndex != i - 1) {
                    avail[i] = [x, y];
                }
            }
            else {
                lastBadIndex = i;
                if (i) {
                    avail[i - 1] = null;
                }
            }
        }
        for (let i = avail.length - 1; i >= 0; i--) {
            if (!avail[i]) {
                avail.splice(i, 1);
            }
        }
        return (avail.length ? _rng_js__WEBPACK_IMPORTED_MODULE_2__["default"].getItem(avail) : null);
    }
    /**
     * Dig a polyline.
     */
    _digLine(points) {
        for (let i = 1; i < points.length; i++) {
            let start = points[i - 1];
            let end = points[i];
            let corridor = new _features_js__WEBPACK_IMPORTED_MODULE_1__["Corridor"](start[0], start[1], end[0], end[1]);
            corridor.create(this._digCallback);
            this._corridors.push(corridor);
        }
    }
    _digCallback(x, y, value) {
        this._map[x][y] = value;
        if (value == 0) {
            this._dug++;
        }
    }
    _isWallCallback(x, y) {
        if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
            return false;
        }
        return (this._map[x][y] == 1);
    }
    _canBeDugCallback(x, y) {
        if (x < 1 || y < 1 || x + 1 >= this._width || y + 1 >= this._height) {
            return false;
        }
        return (this._map[x][y] == 1);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/noise/index.js":
/*!************************************************!*\
  !*** ./node_modules/rot-js/lib/noise/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simplex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simplex.js */ "./node_modules/rot-js/lib/noise/simplex.js");

/* harmony default export */ __webpack_exports__["default"] = ({ Simplex: _simplex_js__WEBPACK_IMPORTED_MODULE_0__["default"] });


/***/ }),

/***/ "./node_modules/rot-js/lib/noise/noise.js":
/*!************************************************!*\
  !*** ./node_modules/rot-js/lib/noise/noise.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Noise; });
/**
 * Base noise generator
 */
class Noise {
}


/***/ }),

/***/ "./node_modules/rot-js/lib/noise/simplex.js":
/*!**************************************************!*\
  !*** ./node_modules/rot-js/lib/noise/simplex.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Simplex; });
/* harmony import */ var _noise_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./noise.js */ "./node_modules/rot-js/lib/noise/noise.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rng.js */ "./node_modules/rot-js/lib/rng.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util.js */ "./node_modules/rot-js/lib/util.js");



const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
/**
 * A simple 2d implementation of simplex noise by Ondrej Zara
 *
 * Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
 * Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 */
class Simplex extends _noise_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param gradients Random gradients
     */
    constructor(gradients = 256) {
        super();
        this._gradients = [
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1]
        ];
        let permutations = [];
        for (let i = 0; i < gradients; i++) {
            permutations.push(i);
        }
        permutations = _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"].shuffle(permutations);
        this._perms = [];
        this._indexes = [];
        for (let i = 0; i < 2 * gradients; i++) {
            this._perms.push(permutations[i % gradients]);
            this._indexes.push(this._perms[i] % this._gradients.length);
        }
    }
    get(xin, yin) {
        let perms = this._perms;
        let indexes = this._indexes;
        let count = perms.length / 2;
        let n0 = 0, n1 = 0, n2 = 0, gi; // Noise contributions from the three corners
        // Skew the input space to determine which simplex cell we're in
        let s = (xin + yin) * F2; // Hairy factor for 2D
        let i = Math.floor(xin + s);
        let j = Math.floor(yin + s);
        let t = (i + j) * G2;
        let X0 = i - t; // Unskew the cell origin back to (x,y) space
        let Y0 = j - t;
        let x0 = xin - X0; // The x,y distances from the cell origin
        let y0 = yin - Y0;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
            i1 = 1;
            j1 = 0;
        }
        else { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
            i1 = 0;
            j1 = 1;
        } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        let x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        let y1 = y0 - j1 + G2;
        let x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
        let y2 = y0 - 1 + 2 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        let ii = Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["mod"])(i, count);
        let jj = Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["mod"])(j, count);
        // Calculate the contribution from the three corners
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 >= 0) {
            t0 *= t0;
            gi = indexes[ii + perms[jj]];
            let grad = this._gradients[gi];
            n0 = t0 * t0 * (grad[0] * x0 + grad[1] * y0);
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 >= 0) {
            t1 *= t1;
            gi = indexes[ii + i1 + perms[jj + j1]];
            let grad = this._gradients[gi];
            n1 = t1 * t1 * (grad[0] * x1 + grad[1] * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 >= 0) {
            t2 *= t2;
            gi = indexes[ii + 1 + perms[jj + 1]];
            let grad = this._gradients[gi];
            n2 = t2 * t2 * (grad[0] * x2 + grad[1] * y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70 * (n0 + n1 + n2);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/path/astar.js":
/*!***********************************************!*\
  !*** ./node_modules/rot-js/lib/path/astar.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AStar; });
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path.js */ "./node_modules/rot-js/lib/path/path.js");

/**
 * @class Simplified A* algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
class AStar extends _path_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(toX, toY, passableCallback, options = {}) {
        super(toX, toY, passableCallback, options);
        this._todo = [];
        this._done = {};
    }
    /**
     * Compute a path from a given point
     * @see ROT.Path#compute
     */
    compute(fromX, fromY, callback) {
        this._todo = [];
        this._done = {};
        this._fromX = fromX;
        this._fromY = fromY;
        this._add(this._toX, this._toY, null);
        while (this._todo.length) {
            let item = this._todo.shift();
            let id = item.x + "," + item.y;
            if (id in this._done) {
                continue;
            }
            this._done[id] = item;
            if (item.x == fromX && item.y == fromY) {
                break;
            }
            let neighbors = this._getNeighbors(item.x, item.y);
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                let x = neighbor[0];
                let y = neighbor[1];
                let id = x + "," + y;
                if (id in this._done) {
                    continue;
                }
                this._add(x, y, item);
            }
        }
        let item = this._done[fromX + "," + fromY];
        if (!item) {
            return;
        }
        while (item) {
            callback(item.x, item.y);
            item = item.prev;
        }
    }
    _add(x, y, prev) {
        let h = this._distance(x, y);
        let obj = {
            x: x,
            y: y,
            prev: prev,
            g: (prev ? prev.g + 1 : 0),
            h: h
        };
        /* insert into priority queue */
        let f = obj.g + obj.h;
        for (let i = 0; i < this._todo.length; i++) {
            let item = this._todo[i];
            let itemF = item.g + item.h;
            if (f < itemF || (f == itemF && h < item.h)) {
                this._todo.splice(i, 0, obj);
                return;
            }
        }
        this._todo.push(obj);
    }
    _distance(x, y) {
        switch (this._options.topology) {
            case 4:
                return (Math.abs(x - this._fromX) + Math.abs(y - this._fromY));
                break;
            case 6:
                let dx = Math.abs(x - this._fromX);
                let dy = Math.abs(y - this._fromY);
                return dy + Math.max(0, (dx - dy) / 2);
                break;
            case 8:
                return Math.max(Math.abs(x - this._fromX), Math.abs(y - this._fromY));
                break;
        }
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/path/dijkstra.js":
/*!**************************************************!*\
  !*** ./node_modules/rot-js/lib/path/dijkstra.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dijkstra; });
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./path.js */ "./node_modules/rot-js/lib/path/path.js");

/**
 * @class Simplified Dijkstra's algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
class Dijkstra extends _path_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(toX, toY, passableCallback, options) {
        super(toX, toY, passableCallback, options);
        this._computed = {};
        this._todo = [];
        this._add(toX, toY, null);
    }
    /**
     * Compute a path from a given point
     * @see ROT.Path#compute
     */
    compute(fromX, fromY, callback) {
        let key = fromX + "," + fromY;
        if (!(key in this._computed)) {
            this._compute(fromX, fromY);
        }
        if (!(key in this._computed)) {
            return;
        }
        let item = this._computed[key];
        while (item) {
            callback(item.x, item.y);
            item = item.prev;
        }
    }
    /**
     * Compute a non-cached value
     */
    _compute(fromX, fromY) {
        while (this._todo.length) {
            let item = this._todo.shift();
            if (item.x == fromX && item.y == fromY) {
                return;
            }
            let neighbors = this._getNeighbors(item.x, item.y);
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                let x = neighbor[0];
                let y = neighbor[1];
                let id = x + "," + y;
                if (id in this._computed) {
                    continue;
                } /* already done */
                this._add(x, y, item);
            }
        }
    }
    _add(x, y, prev) {
        let obj = {
            x: x,
            y: y,
            prev: prev
        };
        this._computed[x + "," + y] = obj;
        this._todo.push(obj);
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/path/index.js":
/*!***********************************************!*\
  !*** ./node_modules/rot-js/lib/path/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dijkstra_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dijkstra.js */ "./node_modules/rot-js/lib/path/dijkstra.js");
/* harmony import */ var _astar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./astar.js */ "./node_modules/rot-js/lib/path/astar.js");


/* harmony default export */ __webpack_exports__["default"] = ({ Dijkstra: _dijkstra_js__WEBPACK_IMPORTED_MODULE_0__["default"], AStar: _astar_js__WEBPACK_IMPORTED_MODULE_1__["default"] });


/***/ }),

/***/ "./node_modules/rot-js/lib/path/path.js":
/*!**********************************************!*\
  !*** ./node_modules/rot-js/lib/path/path.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Path; });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./node_modules/rot-js/lib/constants.js");

/**
 * @class Abstract pathfinder
 * @param {int} toX Target X coord
 * @param {int} toY Target Y coord
 * @param {function} passableCallback Callback to determine map passability
 * @param {object} [options]
 * @param {int} [options.topology=8]
 */
class Path {
    constructor(toX, toY, passableCallback, options = {}) {
        this._toX = toX;
        this._toY = toY;
        this._passableCallback = passableCallback;
        this._options = Object.assign({
            topology: 8
        }, options);
        this._dirs = _constants_js__WEBPACK_IMPORTED_MODULE_0__["DIRS"][this._options.topology];
        if (this._options.topology == 8) { /* reorder dirs for more aesthetic result (vertical/horizontal first) */
            this._dirs = [
                this._dirs[0],
                this._dirs[2],
                this._dirs[4],
                this._dirs[6],
                this._dirs[1],
                this._dirs[3],
                this._dirs[5],
                this._dirs[7]
            ];
        }
    }
    _getNeighbors(cx, cy) {
        let result = [];
        for (let i = 0; i < this._dirs.length; i++) {
            let dir = this._dirs[i];
            let x = cx + dir[0];
            let y = cy + dir[1];
            if (!this._passableCallback(x, y)) {
                continue;
            }
            result.push([x, y]);
        }
        return result;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/rng.js":
/*!****************************************!*\
  !*** ./node_modules/rot-js/lib/rng.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
const FRAC = 2.3283064365386963e-10; /* 2^-32 */
class RNG {
    constructor() {
        this._seed = 0;
        this._s0 = 0;
        this._s1 = 0;
        this._s2 = 0;
        this._c = 0;
    }
    getSeed() { return this._seed; }
    /**
     * Seed the number generator
     */
    setSeed(seed) {
        seed = (seed < 1 ? 1 / seed : seed);
        this._seed = seed;
        this._s0 = (seed >>> 0) * FRAC;
        seed = (seed * 69069 + 1) >>> 0;
        this._s1 = seed * FRAC;
        seed = (seed * 69069 + 1) >>> 0;
        this._s2 = seed * FRAC;
        this._c = 1;
        return this;
    }
    /**
     * @returns Pseudorandom value [0,1), uniformly distributed
     */
    getUniform() {
        let t = 2091639 * this._s0 + this._c * FRAC;
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
    getUniformInt(lowerBound, upperBound) {
        let max = Math.max(lowerBound, upperBound);
        let min = Math.min(lowerBound, upperBound);
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
            u = 2 * this.getUniform() - 1;
            v = 2 * this.getUniform() - 1;
            r = u * u + v * v;
        } while (r > 1 || r == 0);
        let gauss = u * Math.sqrt(-2 * Math.log(r) / r);
        return mean + gauss * stddev;
    }
    /**
     * @returns Pseudorandom value [1,100] inclusive, uniformly distributed
     */
    getPercentage() {
        return 1 + Math.floor(this.getUniform() * 100);
    }
    /**
     * @returns Randomly picked item, null when length=0
     */
    getItem(array) {
        if (!array.length) {
            return null;
        }
        return array[Math.floor(this.getUniform() * array.length)];
    }
    /**
     * @returns New array with randomized items
     */
    shuffle(array) {
        let result = [];
        let clone = array.slice();
        while (clone.length) {
            let index = clone.indexOf(this.getItem(clone));
            result.push(clone.splice(index, 1)[0]);
        }
        return result;
    }
    /**
     * @param data key=whatever, value=weight (relative probability)
     * @returns whatever
     */
    getWeightedValue(data) {
        let total = 0;
        for (let id in data) {
            total += data[id];
        }
        let random = this.getUniform() * total;
        let id, part = 0;
        for (id in data) {
            part += data[id];
            if (random < part) {
                return id;
            }
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
    setState(state) {
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
        let clone = new RNG();
        return clone.setState(this.getState());
    }
}
/* harmony default export */ __webpack_exports__["default"] = (new RNG().setSeed(Date.now()));


/***/ }),

/***/ "./node_modules/rot-js/lib/scheduler/action.js":
/*!*****************************************************!*\
  !*** ./node_modules/rot-js/lib/scheduler/action.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Action; });
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/rot-js/lib/scheduler/scheduler.js");

/**
 * @class Action-based scheduler
 * @augments ROT.Scheduler
 */
class Action extends _scheduler_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this._defaultDuration = 1; /* for newly added */
        this._duration = this._defaultDuration; /* for this._current */
    }
    /**
     * @param {object} item
     * @param {bool} repeat
     * @param {number} [time=1]
     * @see ROT.Scheduler#add
     */
    add(item, repeat, time) {
        this._queue.add(item, time || this._defaultDuration);
        return super.add(item, repeat);
    }
    clear() {
        this._duration = this._defaultDuration;
        return super.clear();
    }
    remove(item) {
        if (item == this._current) {
            this._duration = this._defaultDuration;
        }
        return super.remove(item);
    }
    /**
     * @see ROT.Scheduler#next
     */
    next() {
        if (this._current !== null && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, this._duration || this._defaultDuration);
            this._duration = this._defaultDuration;
        }
        return super.next();
    }
    /**
     * Set duration for the active item
     */
    setDuration(time) {
        if (this._current) {
            this._duration = time;
        }
        return this;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/scheduler/index.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/scheduler/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _simple_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simple.js */ "./node_modules/rot-js/lib/scheduler/simple.js");
/* harmony import */ var _speed_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./speed.js */ "./node_modules/rot-js/lib/scheduler/speed.js");
/* harmony import */ var _action_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action.js */ "./node_modules/rot-js/lib/scheduler/action.js");



/* harmony default export */ __webpack_exports__["default"] = ({ Simple: _simple_js__WEBPACK_IMPORTED_MODULE_0__["default"], Speed: _speed_js__WEBPACK_IMPORTED_MODULE_1__["default"], Action: _action_js__WEBPACK_IMPORTED_MODULE_2__["default"] });


/***/ }),

/***/ "./node_modules/rot-js/lib/scheduler/scheduler.js":
/*!********************************************************!*\
  !*** ./node_modules/rot-js/lib/scheduler/scheduler.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Scheduler; });
/* harmony import */ var _eventqueue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../eventqueue.js */ "./node_modules/rot-js/lib/eventqueue.js");

class Scheduler {
    /**
     * @class Abstract scheduler
     */
    constructor() {
        this._queue = new _eventqueue_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this._repeat = [];
        this._current = null;
    }
    /**
     * @see ROT.EventQueue#getTime
     */
    getTime() { return this._queue.getTime(); }
    /**
     * @param {?} item
     * @param {bool} repeat
     */
    add(item, repeat) {
        if (repeat) {
            this._repeat.push(item);
        }
        return this;
    }
    /**
     * Get the time the given item is scheduled for
     * @param {?} item
     * @returns {number} time
     */
    getTimeOf(item) {
        return this._queue.getEventTime(item);
    }
    /**
     * Clear all items
     */
    clear() {
        this._queue.clear();
        this._repeat = [];
        this._current = null;
        return this;
    }
    /**
     * Remove a previously added item
     * @param {?} item
     * @returns {bool} successful?
     */
    remove(item) {
        let result = this._queue.remove(item);
        let index = this._repeat.indexOf(item);
        if (index != -1) {
            this._repeat.splice(index, 1);
        }
        if (this._current == item) {
            this._current = null;
        }
        return result;
    }
    /**
     * Schedule next item
     * @returns {?}
     */
    next() {
        this._current = this._queue.get();
        return this._current;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/scheduler/simple.js":
/*!*****************************************************!*\
  !*** ./node_modules/rot-js/lib/scheduler/simple.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Simple; });
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/rot-js/lib/scheduler/scheduler.js");

/**
 * @class Simple fair scheduler (round-robin style)
 */
class Simple extends _scheduler_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    add(item, repeat) {
        this._queue.add(item, 0);
        return super.add(item, repeat);
    }
    next() {
        if (this._current !== null && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, 0);
        }
        return super.next();
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/scheduler/speed.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/scheduler/speed.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Speed; });
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/rot-js/lib/scheduler/scheduler.js");

/**
 * @class Speed-based scheduler
 */
class Speed extends _scheduler_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * @param {object} item anything with "getSpeed" method
     * @param {bool} repeat
     * @param {number} [time=1/item.getSpeed()]
     * @see ROT.Scheduler#add
     */
    add(item, repeat, time) {
        this._queue.add(item, time !== undefined ? time : 1 / item.getSpeed());
        return super.add(item, repeat);
    }
    /**
     * @see ROT.Scheduler#next
     */
    next() {
        if (this._current && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, 1 / this._current.getSpeed());
        }
        return super.next();
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/stringgenerator.js":
/*!****************************************************!*\
  !*** ./node_modules/rot-js/lib/stringgenerator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StringGenerator; });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/rot-js/lib/rng.js");

/**
 * @class (Markov process)-based string generator.
 * Copied from a <a href="http://www.roguebasin.roguelikedevelopment.org/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme">RogueBasin article</a>.
 * Offers configurable order and prior.
 */
class StringGenerator {
    constructor(options) {
        this._options = {
            words: false,
            order: 3,
            prior: 0.001
        };
        Object.assign(this._options, options);
        this._boundary = String.fromCharCode(0);
        this._suffix = this._boundary;
        this._prefix = [];
        for (let i = 0; i < this._options.order; i++) {
            this._prefix.push(this._boundary);
        }
        this._priorValues = {};
        this._priorValues[this._boundary] = this._options.prior;
        this._data = {};
    }
    /**
     * Remove all learning data
     */
    clear() {
        this._data = {};
        this._priorValues = {};
    }
    /**
     * @returns {string} Generated string
     */
    generate() {
        let result = [this._sample(this._prefix)];
        while (result[result.length - 1] != this._boundary) {
            result.push(this._sample(result));
        }
        return this._join(result.slice(0, -1));
    }
    /**
     * Observe (learn) a string from a training set
     */
    observe(string) {
        let tokens = this._split(string);
        for (let i = 0; i < tokens.length; i++) {
            this._priorValues[tokens[i]] = this._options.prior;
        }
        tokens = this._prefix.concat(tokens).concat(this._suffix); /* add boundary symbols */
        for (let i = this._options.order; i < tokens.length; i++) {
            let context = tokens.slice(i - this._options.order, i);
            let event = tokens[i];
            for (let j = 0; j < context.length; j++) {
                let subcontext = context.slice(j);
                this._observeEvent(subcontext, event);
            }
        }
    }
    getStats() {
        let parts = [];
        let priorCount = Object.keys(this._priorValues).length;
        priorCount--; // boundary
        parts.push("distinct samples: " + priorCount);
        let dataCount = Object.keys(this._data).length;
        let eventCount = 0;
        for (let p in this._data) {
            eventCount += Object.keys(this._data[p]).length;
        }
        parts.push("dictionary size (contexts): " + dataCount);
        parts.push("dictionary size (events): " + eventCount);
        return parts.join(", ");
    }
    /**
     * @param {string}
     * @returns {string[]}
     */
    _split(str) {
        return str.split(this._options.words ? /\s+/ : "");
    }
    /**
     * @param {string[]}
     * @returns {string}
     */
    _join(arr) {
        return arr.join(this._options.words ? " " : "");
    }
    /**
     * @param {string[]} context
     * @param {string} event
     */
    _observeEvent(context, event) {
        let key = this._join(context);
        if (!(key in this._data)) {
            this._data[key] = {};
        }
        let data = this._data[key];
        if (!(event in data)) {
            data[event] = 0;
        }
        data[event]++;
    }
    /**
     * @param {string[]}
     * @returns {string}
     */
    _sample(context) {
        context = this._backoff(context);
        let key = this._join(context);
        let data = this._data[key];
        let available = {};
        if (this._options.prior) {
            for (let event in this._priorValues) {
                available[event] = this._priorValues[event];
            }
            for (let event in data) {
                available[event] += data[event];
            }
        }
        else {
            available = data;
        }
        return _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"].getWeightedValue(available);
    }
    /**
     * @param {string[]}
     * @returns {string[]}
     */
    _backoff(context) {
        if (context.length > this._options.order) {
            context = context.slice(-this._options.order);
        }
        else if (context.length < this._options.order) {
            context = this._prefix.slice(0, this._options.order - context.length).concat(context);
        }
        while (!(this._join(context) in this._data) && context.length > 0) {
            context = context.slice(1);
        }
        return context;
    }
}


/***/ }),

/***/ "./node_modules/rot-js/lib/text.js":
/*!*****************************************!*\
  !*** ./node_modules/rot-js/lib/text.js ***!
  \*****************************************/
/*! exports provided: TYPE_TEXT, TYPE_NEWLINE, TYPE_FG, TYPE_BG, measure, tokenize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_TEXT", function() { return TYPE_TEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_NEWLINE", function() { return TYPE_NEWLINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_FG", function() { return TYPE_FG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_BG", function() { return TYPE_BG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "measure", function() { return measure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenize", function() { return tokenize; });
/**
 * @namespace
 * Contains text tokenization and breaking routines
 */
const RE_COLORS = /%([bc]){([^}]*)}/g;
// token types
const TYPE_TEXT = 0;
const TYPE_NEWLINE = 1;
const TYPE_FG = 2;
const TYPE_BG = 3;
/**
 * Measure size of a resulting text block
 */
function measure(str, maxWidth) {
    let result = { width: 0, height: 1 };
    let tokens = tokenize(str, maxWidth);
    let lineWidth = 0;
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token.type) {
            case TYPE_TEXT:
                lineWidth += token.value.length;
                break;
            case TYPE_NEWLINE:
                result.height++;
                result.width = Math.max(result.width, lineWidth);
                lineWidth = 0;
                break;
        }
    }
    result.width = Math.max(result.width, lineWidth);
    return result;
}
/**
 * Convert string to a series of a formatting commands
 */
function tokenize(str, maxWidth) {
    let result = [];
    /* first tokenization pass - split texts and color formatting commands */
    let offset = 0;
    str.replace(RE_COLORS, function (match, type, name, index) {
        /* string before */
        let part = str.substring(offset, index);
        if (part.length) {
            result.push({
                type: TYPE_TEXT,
                value: part
            });
        }
        /* color command */
        result.push({
            type: (type == "c" ? TYPE_FG : TYPE_BG),
            value: name.trim()
        });
        offset = index + match.length;
        return "";
    });
    /* last remaining part */
    let part = str.substring(offset);
    if (part.length) {
        result.push({
            type: TYPE_TEXT,
            value: part
        });
    }
    return breakLines(result, maxWidth);
}
/* insert line breaks into first-pass tokenized data */
function breakLines(tokens, maxWidth) {
    if (!maxWidth) {
        maxWidth = Infinity;
    }
    let i = 0;
    let lineLength = 0;
    let lastTokenWithSpace = -1;
    while (i < tokens.length) { /* take all text tokens, remove space, apply linebreaks */
        let token = tokens[i];
        if (token.type == TYPE_NEWLINE) { /* reset */
            lineLength = 0;
            lastTokenWithSpace = -1;
        }
        if (token.type != TYPE_TEXT) { /* skip non-text tokens */
            i++;
            continue;
        }
        /* remove spaces at the beginning of line */
        while (lineLength == 0 && token.value.charAt(0) == " ") {
            token.value = token.value.substring(1);
        }
        /* forced newline? insert two new tokens after this one */
        let index = token.value.indexOf("\n");
        if (index != -1) {
            token.value = breakInsideToken(tokens, i, index, true);
            /* if there are spaces at the end, we must remove them (we do not want the line too long) */
            let arr = token.value.split("");
            while (arr.length && arr[arr.length - 1] == " ") {
                arr.pop();
            }
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
                let nextIndex = token.value.indexOf(" ", index + 1);
                if (nextIndex == -1) {
                    break;
                }
                if (lineLength + nextIndex > maxWidth) {
                    break;
                }
                index = nextIndex;
            }
            if (index != -1) { /* break at space within this one */
                token.value = breakInsideToken(tokens, i, index, true);
            }
            else if (lastTokenWithSpace != -1) { /* is there a previous token where a break can occur? */
                let token = tokens[lastTokenWithSpace];
                let breakIndex = token.value.lastIndexOf(" ");
                token.value = breakInsideToken(tokens, lastTokenWithSpace, breakIndex, true);
                i = lastTokenWithSpace;
            }
            else { /* force break in this token */
                token.value = breakInsideToken(tokens, i, maxWidth - lineLength, false);
            }
        }
        else { /* line not long, continue */
            lineLength += token.value.length;
            if (token.value.indexOf(" ") != -1) {
                lastTokenWithSpace = i;
            }
        }
        i++; /* advance to next token */
    }
    tokens.push({ type: TYPE_NEWLINE }); /* insert fake newline to fix the last text line */
    /* remove trailing space from text tokens before newlines */
    let lastTextToken = null;
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token.type) {
            case TYPE_TEXT:
                lastTextToken = token;
                break;
            case TYPE_NEWLINE:
                if (lastTextToken) { /* remove trailing space */
                    let arr = lastTextToken.value.split("");
                    while (arr.length && arr[arr.length - 1] == " ") {
                        arr.pop();
                    }
                    lastTextToken.value = arr.join("");
                }
                lastTextToken = null;
                break;
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
function breakInsideToken(tokens, tokenIndex, breakIndex, removeBreakChar) {
    let newBreakToken = {
        type: TYPE_NEWLINE
    };
    let newTextToken = {
        type: TYPE_TEXT,
        value: tokens[tokenIndex].value.substring(breakIndex + (removeBreakChar ? 1 : 0))
    };
    tokens.splice(tokenIndex + 1, 0, newBreakToken, newTextToken);
    return tokens[tokenIndex].value.substring(0, breakIndex);
}


/***/ }),

/***/ "./node_modules/rot-js/lib/util.js":
/*!*****************************************!*\
  !*** ./node_modules/rot-js/lib/util.js ***!
  \*****************************************/
/*! exports provided: mod, clamp, capitalize, format */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mod", function() { return mod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitalize", function() { return capitalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/**
 * Always positive modulus
 * @param x Operand
 * @param n Modulus
 * @returns x modulo n
 */
function mod(x, n) {
    return (x % n + n) % n;
}
function clamp(val, min = 0, max = 1) {
    if (val < min)
        return min;
    if (val > max)
        return max;
    return val;
}
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
}
/**
 * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
 * @param {string} template
 * @param {any} [argv]
 */
function format(template, ...args) {
    let map = format.map;
    let replacer = function (match, group1, group2, index) {
        if (template.charAt(index - 1) == "%") {
            return match.substring(1);
        }
        if (!args.length) {
            return match;
        }
        let obj = args[0];
        let group = group1 || group2;
        let parts = group.split(",");
        let name = parts.shift() || "";
        let method = map[name.toLowerCase()];
        if (!method) {
            return match;
        }
        obj = args.shift();
        let replaced = obj[method].apply(obj, parts);
        let first = name.charAt(0);
        if (first != first.toLowerCase()) {
            replaced = capitalize(replaced);
        }
        return replaced;
    };
    return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
}
format.map = {
    "s": "toString"
};


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/ai.js":
/*!*******************!*\
  !*** ./src/ai.js ***!
  \*******************/
/*! exports provided: createPassableCallback, createPassableSightCallback, BasicMonsterAI, PatrollingMonsterAI, ConfusedAI, ChestAI, DroppedItemAI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPassableCallback", function() { return createPassableCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPassableSightCallback", function() { return createPassableSightCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicMonsterAI", function() { return BasicMonsterAI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatrollingMonsterAI", function() { return PatrollingMonsterAI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfusedAI", function() { return ConfusedAI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChestAI", function() { return ChestAI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DroppedItemAI", function() { return DroppedItemAI; });
/* harmony import */ var rot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ "./src/globals.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map */ "./src/map.js");







/**
 * Creates a function which returns if an x and y coordinate
 * represents a passable spot on the map.
 *
 * @param  {GameObject} owner The game object to be used with this function
 * @return {Function}         the callback
 */
function createPassableCallback(owner) {
    return function(x, y) {
        // own space is passable
        if (owner.x === x && owner.y === y) {
            return true;
        }
        return Object(_map__WEBPACK_IMPORTED_MODULE_2__["isBlocked"])(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.map, _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.gameObjects, x, y) === null;
    };
}

/**
 * Creates a function which returns if an x and y coordinate
 * represents a spot on the map which can be seen through.
 *
 * @param  {GameObject} owner The game object to be used with this function
 * @return {Function}         the callback
 */
function createPassableSightCallback(owner) {
    return function(x, y) {
        // own space is passable
        if (owner.x === x && owner.y === y) {
            return true;
        }
        return Object(_map__WEBPACK_IMPORTED_MODULE_2__["isSightBlocked"])(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.map, _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.gameObjects, x, y) === false;
    };
}

/**
 * Creates a function which checks if the Game player object
 * is visible or not and sets the AI to the chase state if it
 * is.
 *
 * @param  {GameObject} owner The game object to be used with this function
 * @return {Function}         the callback
 */
function createVisibilityCallback(ai) {
    return function(x, y, r, visibility) {
        if (x === _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player.x && y === _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player.y && visibility > 0) {
            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage(ai.owner.name + " saw you");
            ai.state = "chase";
        }
    };
}

/**
 * Basic monster behavior with two states, chase and wander.
 * Default state is wander, which just chooses a random direction
 * sees if it's empty, and moves if it is.
 *
 * Uses a definable sight range to check if a target is in range.
 * If one is this switches to chase which uses A* to go towards
 * the target. Attacks the target when it's within one tile from it
 */
class BasicMonsterAI {
    constructor(sightRange) {
        this.owner = null;
        this.state = "wander";
        this.sightRange = sightRange;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        // wander in random directions
        if (this.state === "wander") {
            // compute the FOV to see if the player is sighted
            const fov = new rot_js__WEBPACK_IMPORTED_MODULE_0__["FOV"].PreciseShadowcasting(createPassableSightCallback(this.owner));
            fov.compute(this.owner.x, this.owner.y, this.sightRange, createVisibilityCallback(this));

            const dir = rot_js__WEBPACK_IMPORTED_MODULE_0__["DIRS"][8][rot_js__WEBPACK_IMPORTED_MODULE_0__["RNG"].getItem([0, 1, 2, 3, 4, 5, 6, 7])];
            const newX = this.owner.x + dir[0];
            const newY = this.owner.y + dir[1];
            const target = Object(_map__WEBPACK_IMPORTED_MODULE_2__["isBlocked"])(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.map, _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.gameObjects, newX, newY);

            if (target !== null) {
                return;
            }

            this.owner.x = newX;
            this.owner.y = newY;
        // chase the player with A*
        } else if (this.state === "chase") {
            let x = _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player.x;
            let y = _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player.y;
            const astar = new rot_js__WEBPACK_IMPORTED_MODULE_0__["Path"].AStar(
                x,
                y,
                createPassableCallback(this.owner),
                { topology: 8 }
            );

            const path = [];
            function pathCallback(x, y) {
                path.push([x, y]);
            }
            astar.compute(this.owner.x, this.owner.y, pathCallback);

            // remove our own position
            path.shift();
            if (path.length === 1) {
                this.owner.fighter.attack(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player);
            } else {
                if (path.length === 0) {
                    return;
                }

                x = path[0][0];
                y = path[0][1];
                this.owner.x = x;
                this.owner.y = y;
            }
        }
    }
}

/**
 * More complex monster behavior with two states, chase and patrol.
 * The default state, patrol, chooses a random empty space in the
 * map and uses A* to go there.
 *
 * Uses a definable sight range to check if a target is in range.
 * If one is this switches to chase which uses A* to go towards
 * the target. Attacks the target when it's within one tile from it
 */
class PatrollingMonsterAI {
    constructor(sightRange) {
        this.owner = null;
        this.state = "patrol";
        this.sightRange = sightRange;
        this.patrolTarget = null;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        // choose a random spot open in the map and go there
        if (this.state === "patrol") {
            // compute the FOV to see if the player is sighted
            const fov = new rot_js__WEBPACK_IMPORTED_MODULE_0__["FOV"].PreciseShadowcasting(createPassableSightCallback(this.owner));
            fov.compute(this.owner.x, this.owner.y, this.sightRange, createVisibilityCallback(this));

            if (this.patrolTarget === null) {
                this.patrolTarget = Object(_map__WEBPACK_IMPORTED_MODULE_2__["findEmptySpace"])(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.map, _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.gameObjects);
            }

            const astar = new rot_js__WEBPACK_IMPORTED_MODULE_0__["Path"].AStar(
                this.patrolTarget.x,
                this.patrolTarget.y,
                createPassableCallback(this.owner),
                { topology: 8 }
            );

            const path = [];
            function pathCallback(x, y) {
                path.push([x, y]);
            }
            astar.compute(this.owner.x, this.owner.y, pathCallback);

            path.shift();

            if (path.length === 0) {
                this.patrolTarget = null;
                return;
            }

            this.owner.x = path[0][0];
            this.owner.y = path[0][1];
        // chase the player with A*
        } else if (this.state === "chase") {
            const astar = new rot_js__WEBPACK_IMPORTED_MODULE_0__["Path"].AStar(
                _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player.x,
                _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player.y,
                createPassableSightCallback(this.owner),
                { topology: 8 }
            );

            const path = [];
            function pathCallback(x, y) {
                path.push([x, y]);
            }
            astar.compute(this.owner.x, this.owner.y, pathCallback);

            // remove our own position
            path.shift();
            if (path.length === 1) {
                this.owner.fighter.attack(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player);
            } else {
                if (path.length === 0) {
                    return;
                }

                this.owner.x = path[0][0];
                this.owner.y = path[0][1];
            }
        }
    }
}

/**
 * AI component which stores the previous AI from the owner.
 * Goes in random directions for the specified number of act
 * calls. Then, replaces itself on the owner with the previous
 * AI component on the owner.
 */
class ConfusedAI {
    constructor(currentAI, turns) {
        this.owner = null;
        this.oldAI = currentAI;
        this.turns = turns;
    }

    act() {
        if (this.turns > 0) {
            const dir = rot_js__WEBPACK_IMPORTED_MODULE_0__["DIRS"][4][rot_js__WEBPACK_IMPORTED_MODULE_0__["RNG"].getItem([0, 1, 2, 3])];
            const newX = this.owner.x + dir[0];
            const newY = this.owner.y + dir[1];
            const target = Object(_map__WEBPACK_IMPORTED_MODULE_2__["isBlocked"])(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.map, _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.gameObjects, newX, newY);

            if (target !== null) {
                return;
            }

            this.owner.x = newX;
            this.owner.y = newY;
        } else {
            if (this.owner === _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player) {
                _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage("You are no longer confused");
            } else {
                _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage(this.owner.name + " is no longer confused");
            }

            this.owner.ai = this.oldAI;
        }
        this.turns--;
    }
}

/**
 * AI which changes the background color of the object when the inventory
 * component is empty
 */
class ChestAI {
    constructor(bgColor, emptyColor) {
        this.owner = null;
        this.bgColor = bgColor;
        this.emptyColor = emptyColor;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        if (this.owner && this.owner.inventoryComponent) {
            if (this.owner.inventoryComponent.getIDsAndCounts().length === 0) {
                this.owner.graphics.bgColor = this.emptyColor;
            } else {
                this.owner.graphics.bgColor = this.bgColor;
            }
        } else {
            console.error("Missing inventoryComponent for ChestAI");
        }
    }
}

/**
 * AI which removes the owner from the game when the inventory is empty
 */
class DroppedItemAI {
    constructor(bgColor, emptyColor) {
        this.owner = null;
        this.bgColor = bgColor;
        this.emptyColor = emptyColor;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        if (this.owner && this.owner.inventoryComponent) {
            if (this.owner.inventoryComponent.getIDsAndCounts().length === 0) {
                _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.removeObject(this.owner);
            }
        } else {
            console.error("Missing inventoryComponent for DroppedItemAI");
        }
    }
}




/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: WIDTH, HEIGHT, UI_HEIGHT, WORLD_WIDTH, WORLD_HEIGHT, COLOR_INVISIBLE_WALL, COLOR_DARK_WALL, COLOR_LIGHT_WALL, COLOR_INVISIBLE_GROUND, COLOR_DARK_GROUND, COLOR_LIGHT_GROUND, COLOR_AMBIENT_LIGHT, MAP_FILLED_SPACE, MAP_EMPTY_SPACE, LEVEL_UP_BASE, LEVEL_UP_FACTOR, DamageType, Affinity, TileData, ObjectData, ItemData, SpellData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WIDTH", function() { return WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEIGHT", function() { return HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UI_HEIGHT", function() { return UI_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORLD_WIDTH", function() { return WORLD_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORLD_HEIGHT", function() { return WORLD_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_INVISIBLE_WALL", function() { return COLOR_INVISIBLE_WALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_DARK_WALL", function() { return COLOR_DARK_WALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_LIGHT_WALL", function() { return COLOR_LIGHT_WALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_INVISIBLE_GROUND", function() { return COLOR_INVISIBLE_GROUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_DARK_GROUND", function() { return COLOR_DARK_GROUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_LIGHT_GROUND", function() { return COLOR_LIGHT_GROUND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_AMBIENT_LIGHT", function() { return COLOR_AMBIENT_LIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAP_FILLED_SPACE", function() { return MAP_FILLED_SPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAP_EMPTY_SPACE", function() { return MAP_EMPTY_SPACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEVEL_UP_BASE", function() { return LEVEL_UP_BASE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEVEL_UP_FACTOR", function() { return LEVEL_UP_FACTOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DamageType", function() { return DamageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Affinity", function() { return Affinity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileData", function() { return TileData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectData", function() { return ObjectData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemData", function() { return ItemData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpellData", function() { return SpellData; });
/* harmony import */ var _items__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./items */ "./src/items.js");
/* harmony import */ var _effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effects */ "./src/effects.js");





const WIDTH = 70;
const HEIGHT = 45;
const UI_HEIGHT = 6;
const WORLD_WIDTH = WIDTH;
const WORLD_HEIGHT = HEIGHT - UI_HEIGHT - 1;

const COLOR_INVISIBLE_WALL = "black";
const COLOR_DARK_WALL = "rgb(20, 20, 20)";
const COLOR_LIGHT_WALL = "#352620";
const COLOR_INVISIBLE_GROUND = "black";
const COLOR_DARK_GROUND = "rgb(50, 50, 50)";
const COLOR_LIGHT_GROUND = "white";
const COLOR_AMBIENT_LIGHT = "rgb(50, 50, 50)";

const MAP_FILLED_SPACE = "#";
const MAP_EMPTY_SPACE = ".";

const LEVEL_UP_BASE = 50;
const LEVEL_UP_FACTOR = 150;

/**
 * Damage type enum
 */
const DamageType = {
    physical: 1,
    fire: 2,
    lightning: 3,
    ice: 4,
    nature: 5
};
Object.freeze(DamageType);

/**
 * Damage affinity damage multiplier
 */
const Affinity = {
    weak: 0.5,
    normal: 1,
    strong: 2,
    nullified: 0
};
Object.freeze(Affinity);

const TileData = {
    900: {
        name: "empty ground",
        char: "",
        fgColor: COLOR_LIGHT_GROUND,
        bgColor: COLOR_LIGHT_GROUND,
        fgColorExplored: COLOR_DARK_GROUND,
        bgColorExplored: COLOR_DARK_GROUND,
        blocks: false,
        blocksSight: false,
        reflectivity: 0.18
    },
    1048: {
        name: "A wall",
        char: "",
        fgColor: COLOR_LIGHT_WALL,
        bgColor: COLOR_LIGHT_WALL,
        fgColorExplored: COLOR_DARK_WALL,
        bgColorExplored: COLOR_DARK_WALL,
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    1165: {
        name: "A tree",
        char: "\u1278",
        fgColor: "lightgreen",
        bgColor: "darkgreen",
        fgColorExplored: COLOR_DARK_WALL,
        bgColorExplored: COLOR_DARK_WALL,
        blocks: true,
        blocksSight: true,
        reflectivity: 0.18
    },
    2710: {
        name: "A table",
        char: "\u03A0",
        fgColor: "tan",
        bgColor: "brown",
        fgColorExplored: COLOR_DARK_WALL,
        bgColorExplored: COLOR_DARK_WALL,
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    2869: {
        name: "A chair",
        char: "\u043F",
        fgColor: "black",
        bgColor: "brown",
        fgColorExplored: COLOR_DARK_WALL,
        bgColorExplored: COLOR_DARK_WALL,
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    },
    2936: {
        name: "A cabinet",
        char: "\u2339",
        fgColor: "black",
        bgColor: "brown",
        fgColorExplored: COLOR_DARK_WALL,
        bgColorExplored: COLOR_DARK_WALL,
        blocks: true,
        blocksSight: false,
        reflectivity: 0.18
    }
};
Object.freeze(TileData);

const ObjectData = {
    "door": {
        name: "Door",
        graphics: "basic_graphics",
        ai: null,
        inventory: null,
        fighter: null,
        interactable: "door_interactable",
        char: "\u1882",
        fgColor: "white",
        bgColor: "brown",
        blocks: true,
        blocksSight: true
    },
    "load_door": {
        name: "Door to new area",
        graphics: "draw_after_seen",
        ai: null,
        inventory: null,
        fighter: null,
        interactable: "load_level_interactable",
        char: "\u1882",
        fgColor: "white",
        bgColor: "black",
        blocks: true,
        blocksSight: true
    },
    "stairs": {
        name: "Stairs",
        graphics: "draw_after_seen",
        ai: null,
        inventory: null,
        fighter: null,
        interactable: "load_level_interactable",
        char: "\u1750",
        fgColor: "white",
        bgColor: "black",
        blocks: true,
        blocksSight: false
    },
    "chest": {
        name: "Chest",
        graphics: "draw_after_seen",
        ai: "chest_ai",
        fighter: null,
        inventory: "basic_inventory",
        interactable: "give_items_interactable",
        char: "*",
        fgColor: "white",
        bgColor: "brown",
        emptyColor: "purple",
        blocks: true,
        blocksSight: false
    },
    "crate": {
        name: "Wooden Crate",
        graphics: "basic_graphics",
        ai: null,
        fighter: "basic_fighter",
        inventory: "basic_inventory",
        interactable: null,
        char: "\u2612",
        fgColor: "white",
        bgColor: "brown",
        emptyColor: "purple",
        blocks: true,
        blocksSight: false,
        experience: 0,
        experienceGiven: 0,
        maxHp: 5,
        strength: 0,
        defense: 0,
        onDeath: "removeFromWorld"
    },
    "lantern": {
        name: "Small Lantern",
        graphics: "basic_graphics",
        lighting: "reflectivity",
        lightingColor: "yellow",
        lightingRange: 4,
        ai: null,
        fighter: null,
        inventory: null,
        interactable: null,
        char: "\u16E1",
        fgColor: "black",
        bgColor: "yellow",
        blocks: true,
        blocksSight: false
    },
    "campfire": {
        name: "Small Fire",
        graphics: "basic_graphics",
        lighting: "reflectivity",
        lightingColor: "orange",
        lightingRange: 6,
        ai: null,
        fighter: null,
        inventory: null,
        interactable: null,
        char: "\u0436",
        fgColor: "black",
        bgColor: "orange",
        blocks: true,
        blocksSight: false
    },
    "dropped_item": {
        name: "Dropped Item",
        graphics: "basic_graphics",
        ai: "dropped_item_ai",
        inventory: null,
        fighter: null,
        interactable: "give_items_interactable",
        char: "!",
        fgColor: "white",
        bgColor: "brown",
        blocks: false,
        blocksSight: false
    },
    "magic_shrine": {
        name: "Magicka Shrine",
        graphics: "basic_graphics",
        ai: null,
        fighter: null,
        interactable: "give_spell_interactable",
        char: "\u06DE",
        fgColor: "black",
        bgColor: "gold",
        blocks: true,
        blocksSight: false
    },
    "player": {
        name: "The Player",
        graphics: "basic_graphics",
        lighting: "player_lighting",
        lightingColor: "white",
        lightingRange: 7,
        ai: "player_control_ai",
        inventory: "basic_inventory",
        fighter: "basic_fighter",
        interactable: null,
        char: "@",
        fgColor: "blue",
        blocks: true,
        blocksSight: false,
        bgColor: "transparent",
        level: 1,
        experience: 0,
        experienceGiven: 0,
        maxHp: 100,
        maxMana: 100,
        strength: 3,
        defense: 1,
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.lightning]: Affinity.normal,
            [DamageType.ice]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
        onDeath: "default"
    },
    "goblin": {
        name: "Goblin",
        graphics: "basic_graphics",
        ai: "basic_monster_ai",
        fighter: "basic_fighter",
        inventory: "basic_inventory",
        interactable: null,
        char: "G",
        fgColor: "green",
        bgColor: "transparent",
        blocks: true,
        blocksSight: false,
        level: 3,
        experience: 0,
        experienceGiven: 50,
        maxHp: 30,
        maxMana: 0,
        strength: 3,
        defense: 1,
        sightRange: 7,
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.lightning]: Affinity.normal,
            [DamageType.ice]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
        inventoryPool: [
            ["health_potion_weak", 0.25]
        ],
        onDeath: "default"
    },
    "goblin_brute": {
        name: "Goblin Brute",
        graphics: "basic_graphics",
        ai: "patrolling_monster_ai",
        fighter: "basic_fighter",
        inventory: "basic_inventory",
        interactable: null,
        char: "G",
        fgColor: "green",
        bgColor: "red",
        blocks: true,
        blocksSight: false,
        level: 10,
        experience: 0,
        experienceGiven: 500,
        maxHp: 100,
        maxMana: 0,
        strength: 7,
        defense: 4,
        sightRange: 7,
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.lightning]: Affinity.normal,
            [DamageType.ice]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
        inventoryPool: [
            ["health_potion_weak", 0.25],
            ["health_potion", 0.1]
        ],
        onDeath: "default"
    },
    "rat": {
        name: "Rat",
        graphics: "basic_graphics",
        ai: "basic_monster_ai",
        fighter: "basic_fighter",
        inventory: "basic_inventory",
        interactable: null,
        char: "r",
        fgColor: "brown",
        bgColor: "transparent",
        blocks: true,
        blocksSight: false,
        level: 1,
        experience: 0,
        experienceGiven: 10,
        maxHp: 10,
        maxMana: 0,
        strength: 2,
        defense: 1,
        sightRange: 7,
        damageAffinity: {
            [DamageType.physical]: Affinity.normal,
            [DamageType.fire]: Affinity.normal,
            [DamageType.lightning]: Affinity.normal,
            [DamageType.ice]: Affinity.normal,
            [DamageType.nature]: Affinity.normal
        },
        inventoryPool: [],
        onDeath: "default"
    },
};
Object.freeze(ObjectData);

const ItemData = {
    "health_potion_weak": {
        displayName: "Weak Health Potion",
        value: 25,
        type: "health",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castHeal"]
    },
    "health_potion": {
        displayName: "Health Potion",
        value: 50,
        type: "health",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castHeal"]
    },
    "health_potion_strong": {
        displayName: "Health Potion",
        value: 100,
        type: "health",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castHeal"]
    },
    "lightning_scroll_weak": {
        displayName: "Weak Scroll of Lightning",
        value: 20,
        type: "damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castDamageSpell"],
        damageType: DamageType.lightning
    },
    "lightning_scroll": {
        displayName: "Scroll of Lightning",
        value: 50,
        type: "damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castDamageSpell"],
        damageType: DamageType.lightning
    },
    "lightning_scroll_strong": {
        displayName: "Strong Scroll of Lightning",
        value: 100,
        type: "damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castDamageSpell"],
        damageType: DamageType.lightning
    },
    "fireball_scroll_weak": {
        displayName: "Weak Scroll of Fire",
        value: 20,
        type: "damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castDamageSpell"],
        damageType: DamageType.fire,
        statusEffectFunc: _effects__WEBPACK_IMPORTED_MODULE_1__["createBurnEffect"]
    },
    "fireball_scroll": {
        displayName: "Scroll of Fire",
        value: 50,
        type: "damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castDamageSpell"],
        damageType: DamageType.fire,
        statusEffectFunc: _effects__WEBPACK_IMPORTED_MODULE_1__["createBurnEffect"]
    },
    "fireball_scroll_strong": {
        displayName: "Strong Scroll of Fire",
        value: 100,
        type: "damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castDamageSpell"],
        damageType: DamageType.fire,
        statusEffectFunc: _effects__WEBPACK_IMPORTED_MODULE_1__["createBurnEffect"]
    },
    "lightning_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Lightning",
        value: 50,
        type: "wild_damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castWildDamageSpell"],
        damageType: DamageType.lightning
    },
    "lightning_scroll_wild": {
        displayName: "Scroll of Wild Lightning",
        value: 100,
        type: "wild_damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castWildDamageSpell"],
        damageType: DamageType.lightning
    },
    "lightning_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Lightning",
        value: 150,
        type: "wild_damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castWildDamageSpell"],
        damageType: DamageType.lightning
    },
    "fireball_scroll_weak_wild": {
        displayName: "Weak Scroll of Wild Fire",
        value: 50,
        type: "wild_damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castWildDamageSpell"],
        damageType: DamageType.fire,
        statusEffectFunc: _effects__WEBPACK_IMPORTED_MODULE_1__["createBurnEffect"]
    },
    "fireball_scroll_wild": {
        displayName: "Scroll of Wild Fire",
        value: 100,
        type: "wild_damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castWildDamageSpell"],
        damageType: DamageType.fire,
        statusEffectFunc: _effects__WEBPACK_IMPORTED_MODULE_1__["createBurnEffect"]
    },
    "fireball_scroll_strong_wild": {
        displayName: "Strong Scroll of Wild Fire",
        value: 150,
        type: "wild_damage_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castWildDamageSpell"],
        damageType: DamageType.fire,
        statusEffectFunc: _effects__WEBPACK_IMPORTED_MODULE_1__["createBurnEffect"]
    },
    "confuse_scroll": {
        displayName: "Scroll of Confuse Enemy",
        value: 8,
        type: "confuse_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castConfuse"]
    },
    "clairvoyance_scroll": {
        displayName: "Scroll of Clairvoyance",
        type: "clairvoyance_scroll",
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castClairvoyance"]
    }
};
Object.freeze(ItemData);

const SpellData = {
    "lightning_bolt": {
        name: "Lightning Bolt",
        manaCost: 50,
        value: 10,
        useFunc: _items__WEBPACK_IMPORTED_MODULE_0__["castDamageSpell"]
    }
};
Object.freeze(SpellData);


/***/ }),

/***/ "./src/effects.js":
/*!************************!*\
  !*** ./src/effects.js ***!
  \************************/
/*! exports provided: Effect, createBurnEffect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Effect", function() { return Effect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBurnEffect", function() { return createBurnEffect; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ "./src/globals.js");




class Effect {
    constructor(owner, name, turns, actCallback) {
        this.owner = owner;
        this.name = name;
        this.turns = turns;
        this.actCallback = actCallback;
    }

    act() {
        this.actCallback(this.owner, this.name);
        this.turns--;
    }
}


/**
 * Create an Effect of applying damage over time
 * @param  {GameObject} victim     Who to apply the effect to
 * @param  {Number} damage         The amount of damage to give each turn
 * @param  {Number} turns          The number of turns to last
 * @return {Effect}                The resulting effect object
 */
function createBurnEffect(victim, damage, turns) {
    function act(owner) {
        if (owner.fighter) {
            owner.fighter.takeDamage(null, damage);
        }

        if (owner === _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.player) {
            _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.displayMessage("You were hurt by the burn for " + damage + " damage");
        } else {
            _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.displayMessage(owner.name + " was hurt by the burn for " + damage + " damage");
        }
    }

    return new Effect(victim, "Burn", turns, act);
}


/***/ }),

/***/ "./src/fighter.js":
/*!************************!*\
  !*** ./src/fighter.js ***!
  \************************/
/*! exports provided: BasicFighter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicFighter", function() { return BasicFighter; });
/* harmony import */ var rot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./globals */ "./src/globals.js");







/**
 * Component which controls the combat information and interaction
 * between different fighters
 */
class BasicFighter {
    constructor(data, deathCallback=null) {
        this.hp = data.maxHp;
        this.maxHp = data.maxHp;
        this.mana = data.maxMana;
        this.maxMana = data.maxMana;

        this.strength = data.strength;
        this.defense = data.defense;
        this.deathCallback = deathCallback;
        this.owner = null;

        this.experience = data.experience;
        this.experienceGiven = data.experienceGiven;
        this.level = data.level;

        this.criticalChance = 0.05;
        this.criticalDamageMultipler = 1.5;

        this.statusEffects = [];
        this.ailmentSusceptibility = data.ailmentSusceptibility;

        this.knownSpells = new Set();
    }

    setOwner(owner) {
        this.owner = owner;
    }

    act() {
        const levelUpEXP = _data__WEBPACK_IMPORTED_MODULE_1__["LEVEL_UP_BASE"] + (this.level * _data__WEBPACK_IMPORTED_MODULE_1__["LEVEL_UP_FACTOR"]);
        if (this.experience >= levelUpEXP) {
            this.level += 1;
            this.experience = 0;
            this.hp = this.maxHp;
            this.strength++;
            if (this.owner === _globals__WEBPACK_IMPORTED_MODULE_2__["default"].Game.player) {
                _globals__WEBPACK_IMPORTED_MODULE_2__["default"].Game.displayMessage("You reached level " + this.level + "!");
            }
        }

        if (this.statusEffects.length > 0) {
            for (let i = 0; i < this.statusEffects.length; i++) {
                const effect = this.statusEffects[i];
                effect.act();

                if (effect.turns === 0) {
                    _globals__WEBPACK_IMPORTED_MODULE_2__["default"].Game.displayMessage(`${this.owner.name} recovered from its ${effect.name}`);
                    this.statusEffects.splice(i, 1);
                }
            }
        }
    }

    takeDamage(attacker, damage) {
        if (damage > 0) {
            this.hp -= damage;
        }

        if (this.hp <= 0) {
            attacker.fighter.experience += this.experienceGiven;

            if (this.deathCallback !== null) {
                this.deathCallback(this.owner);
            }
        }
    }

    attack(target) {
        if (!target.fighter) { return; }

        let damage = Math.round(Math.max(1, this.strength - target.fighter.defense));
        let critical = false;

        if (rot_js__WEBPACK_IMPORTED_MODULE_0__["RNG"].getUniform() <= this.criticalChance) {
            damage = Math.ceil(damage * this.criticalDamageMultipler);
            critical = true;
        }

        if (damage > 0) {
            if (critical) {
                _globals__WEBPACK_IMPORTED_MODULE_2__["default"].Game.displayMessage("CRITICAL! " + this.owner.name + " attacks " + target.name + " for " + damage + " damage.");
            } else {
                _globals__WEBPACK_IMPORTED_MODULE_2__["default"].Game.displayMessage(this.owner.name + " attacks " + target.name + " for " + damage + " damage.");
            }

            target.fighter.takeDamage(this.owner, damage);
        } else {
            _globals__WEBPACK_IMPORTED_MODULE_2__["default"].Game.displayMessage(this.owner.name + " attacks " + target.name + ", but it's too weak!");
        }
    }

    heal(amount) {
        this.hp += amount;
        if (this.hp > this.maxHp) {
            this.hp = this.maxHp;
        }
    }

    useMana(cost) {
        this.mana = Math.max(this.mana - cost, 0);
    }

    addStatusEffect(effect) {
        this.statusEffects.push(effect);
    }

    /**
     * Add a spell to the set of known spells by this
     * fighter.
     * @param {String} id A spell id
     * @returns {Boolean} If the spell was successfully learned
     */
    addSpellById(id) {
        if (this.knownSpells.has(id)) { return false; }
        this.knownSpells.add(id);
        return true;
    }

    getKnownSpells() {
        return [...this.knownSpells];
    }
}



/***/ }),

/***/ "./src/globals.js":
/*!************************!*\
  !*** ./src/globals.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({});


/***/ }),

/***/ "./src/graphics.js":
/*!*************************!*\
  !*** ./src/graphics.js ***!
  \*************************/
/*! exports provided: BasicGraphics, DrawAfterSeen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicGraphics", function() { return BasicGraphics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawAfterSeen", function() { return DrawAfterSeen; });


/**
 * Graphics component which simply draws the character with the fore
 * and background color at the owner's x and y coordinates if the tile
 * it's on is visible.
 */
class BasicGraphics {
    constructor(char, fgColor, bgColor) {
        this.char = char;
        this.fgColor = fgColor;
        this.bgColor = bgColor;
        this.owner = null;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    draw(display, map) {
        if (this.owner && map[this.owner.y][this.owner.x].isVisibleAndLit()) {
            display.draw(this.owner.x, this.owner.y, this.char, this.fgColor, this.bgColor);
        }
    }
}

/**
 * Graphics component will always draw the object if the tile it's on has been explored,
 * regardless of its visibility
 */
class DrawAfterSeen {
    constructor(char, fgColor, bgColor) {
        this.char = char;
        this.fgColor = fgColor;
        this.bgColor = bgColor;
        this.owner = null;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    draw(display, map) {
        if (this.owner && map[this.owner.y][this.owner.x].explored) {
            display.draw(this.owner.x, this.owner.y, this.char, this.fgColor, this.bgColor);
        }
    }
}



/***/ }),

/***/ "./src/interactable.js":
/*!*****************************!*\
  !*** ./src/interactable.js ***!
  \*****************************/
/*! exports provided: GiveItemsInteractable, GiveSpellInteractable, DoorInteractable, LoadLevelInteractable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GiveItemsInteractable", function() { return GiveItemsInteractable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GiveSpellInteractable", function() { return GiveSpellInteractable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoorInteractable", function() { return DoorInteractable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadLevelInteractable", function() { return LoadLevelInteractable; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ "./src/globals.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");





/**
 * Component gives all the items in the inventory of the GameObject
 * to the user when interacted with
 */
class GiveItemsInteractable {
    constructor() {
        this.owner = null;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    interact(user) {
        if (this.owner.inventoryComponent) {
            const chestItems = this.owner.inventoryComponent.getIDsAndCounts();
            if (chestItems.length > 0) {
                for (let i = 0; i < chestItems.length; i++) {
                    const item = chestItems[i];
                    _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.displayMessage("Found a " + _data__WEBPACK_IMPORTED_MODULE_1__["ItemData"][item.id].displayName);
                    user.inventoryComponent.addItem(item.id, item.count);
                    this.owner.inventoryComponent.useItem(item.id);
                }
            } else {
                _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.displayMessage("Empty");
            }
        } else {
            console.error("Missing inventoryComponent on ", this.owner);
        }
    }
}

/**
 * Interaction component that adds a spell to the user's spell list
 */
class GiveSpellInteractable {
    constructor() {
        this.owner = null;
        this.spellId = null;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    setSpell(id) {
        this.spellId = id;
    }

    interact(user) {
        if (!this.spellId) {
            throw new Error("No spell id given");
        }

        if (!(this.spellId in _data__WEBPACK_IMPORTED_MODULE_1__["SpellData"])) {
            throw new Error(`${this.spellId} is not a valid spell`);
        }

        const res = user.fighter.addSpellById(this.spellId);
        const data = _data__WEBPACK_IMPORTED_MODULE_1__["SpellData"][this.spellId];
        if (res) {
            _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.displayMessage(`You learned a new spell: ${data.name}`);
        } else {
            _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.displayMessage(`You already know ${data.name}`);
        }
    }
}

/**
 * Interaction component removes owner to give the appearance of opening
 * when interacting
 */
class DoorInteractable {
    constructor() {
        this.owner = null;
        this.levelName = null;
    }

    setLevel(name) {
        this.levelName = name;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    interact() {
        _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.removeObject(this.owner);
    }
}

/**
 * Interaction component that calls Game.nextLevel when interacted with
 */
class LoadLevelInteractable {
    constructor() {
        this.owner = null;
        this.levelName = null;
    }

    setLevel(name) {
        this.levelName = name;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    interact() {
        if (!this.levelName) {
            throw new Error("No level name has been set for load");
        }
        _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.loadLevel(this.levelName);
    }
}



/***/ }),

/***/ "./src/inventory.js":
/*!**************************!*\
  !*** ./src/inventory.js ***!
  \**************************/
/*! exports provided: BasicInventory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicInventory", function() { return BasicInventory; });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");




class BasicInventory {
    constructor() {
        this.owner = null;

        // A class implementation without private data members?
        // Can JS do anything right?
        this._inventory = {};
    }

    setOwner(owner) {
        this.owner = owner;
    }

    // This implementation relies on JS now having a set ordering to
    // keys in objects when using ownKeys. Not a perfect solution since
    // it's not obvious what's going on.
    getIDsAndCounts() {
        const orderedKeys = Reflect.ownKeys(this._inventory);
        return orderedKeys.map(e => { return { id: e, count: this._inventory[e] }; });
    }

    getNamesAndCounts() {
        const orderedKeys = Reflect.ownKeys(this._inventory);
        return orderedKeys.map(e => { return { name: _data__WEBPACK_IMPORTED_MODULE_0__["ItemData"][e].displayName, count: this._inventory[e] }; });
    }

    hasItem(id) {
        return id in this._inventory;
    }

    addItem(id, count=1) {
        if (id in this._inventory) {
            const newValue = this._inventory[id] + count;

            if (newValue === 100) {
                return false;
            }

            this._inventory[id] = newValue;
        } else {
            this._inventory[id] = count;
        }
        return true;
    }

    useItem(id) {
        if (!(id in this._inventory)) {
            throw new Error(`Item ${id} not in inventory`);
        }

        this._inventory[id]--;

        if (this._inventory[id] === 0) {
            delete this._inventory[id];
        }
    }
}



/***/ }),

/***/ "./src/items.js":
/*!**********************!*\
  !*** ./src/items.js ***!
  \**********************/
/*! exports provided: castHeal, castDamageSpell, castWildDamageSpell, castConfuse, castClairvoyance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "castHeal", function() { return castHeal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "castDamageSpell", function() { return castDamageSpell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "castWildDamageSpell", function() { return castWildDamageSpell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "castConfuse", function() { return castConfuse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "castClairvoyance", function() { return castClairvoyance; });
/* harmony import */ var rot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ "./src/globals.js");
/* harmony import */ var _ai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ai */ "./src/ai.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map */ "./src/map.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./src/util.js");









/**
 * Unhook the mouse look functionality and then listen for a mouse
 * input. If it's a left click on an object with a fighter component,
 * then re-hook the mouse look function and pass the target to the
 * callback cb.
 *
 * @param  {Function} cb callback
 * @return {void}
 */
function mouseTarget(cb) {
    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.unhookMouseLook();
    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.drawAll();

    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.canvas.addEventListener("mousedown", function _listener(e) {
        if (e.button === 0) {
            const pos = _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.display.eventToPosition(e);

            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.canvas.removeEventListener("mousedown", _listener);
            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.hookMouseLook();

            let target;
            const objects = Object(_map__WEBPACK_IMPORTED_MODULE_3__["getObjectsAtLocation"])(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.gameObjects, pos[0], pos[1]);

            for (let i = 0; i < objects.length; i++) {
                if (objects[i].fighter) {
                    target = objects[i];
                    break;
                }
            }

            if (target && target.fighter) {
                return cb(target);
            } else {
                return cb(null);
            }
        }
    });
}

function castHeal(item, user, ownerCallback) {
    if (user.fighter.hp >= user.fighter.maxHp) {
        if (user === _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player) {
            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage("You are already at full health.");
        } else {
            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage(user.name + " tries and fails to take a health potion");
        }
        return ownerCallback(false);
    }
    user.fighter.heal(item.value);
    return ownerCallback(true);
}

function castDamageSpell(item, user, ownerCallback) {
    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage("Left click on an enemy to target it, click elsewhere to cancel");
    mouseTarget(function (target) {
        if (target === null) {
            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage("Canceled casting");
            return ownerCallback(false);
        }

        _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage(`Spell hits ${target.name} for ${item.value} damage`);
        target.fighter.takeDamage(user, item.value, item.damageType);

        // Check for the fighter again because it could have died already
        if (target.fighter && item.statusEffectFunc) {
            if (rot_js__WEBPACK_IMPORTED_MODULE_0__["RNG"].getUniform() <= target.fighter.ailmentSusceptibility) {
                const effectDamage = Math.round(target.fighter.maxHp * 0.0625);
                const turns = Object(_util__WEBPACK_IMPORTED_MODULE_4__["randomIntFromInterval"])(3, 6);
                target.fighter.addStatusEffect(
                    item.statusEffectFunc(target, effectDamage, turns)
                );
            }
        }

        return ownerCallback(true);
    });
}

function castWildDamageSpell(item, user, ownerCallback) {
    const target = Object(_map__WEBPACK_IMPORTED_MODULE_3__["getClosestVisibleFighter"])(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.map, _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.gameObjects, user, 8);

    if (target === null) {
        if (user === _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player) {
            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage("No target is close enough to use the scroll");
        }
        return ownerCallback(false);
    }

    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage(`Spell hits ${target.name} for ${item.value} damage`);
    target.fighter.takeDamage(user, item.value, item.damageType);

    // Check for the fighter again because it could have died already
    if (target.fighter && item.statusEffectFunc) {
        if (rot_js__WEBPACK_IMPORTED_MODULE_0__["RNG"].getUniform() <= target.fighter.ailmentSusceptibility) {
            const effectDamage = Math.round(target.fighter.maxHp * 0.0625);
            const turns = Object(_util__WEBPACK_IMPORTED_MODULE_4__["randomIntFromInterval"])(3, 6);
            target.fighter.addStatusEffect(
                item.statusEffectFunc(target, effectDamage, turns)
            );
        }
    }

    return ownerCallback(true);
}

function castConfuse(item, user, ownerCallback) {
    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage("Left click on an enemy to target it, click elsewhere to cancel");
    mouseTarget(function (target) {
        if (target === null) {
            return ownerCallback(false);
        }

        _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage(target.name + " is now confused");
        const oldAI = target.ai;
        target.ai = new _ai__WEBPACK_IMPORTED_MODULE_2__["ConfusedAI"](oldAI, item.value);
        target.ai.owner = target;
        return ownerCallback(true);
    });
}

function castClairvoyance(item, user, ownerCallback) {
    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage("You have been granted Clairvoyance");
    Object(_map__WEBPACK_IMPORTED_MODULE_3__["setAllToExplored"])(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.map);
    return ownerCallback(true);
}


/***/ }),

/***/ "./src/lighting.js":
/*!*************************!*\
  !*** ./src/lighting.js ***!
  \*************************/
/*! exports provided: ReflectivityLighting, PlayerLighting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReflectivityLighting", function() { return ReflectivityLighting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerLighting", function() { return PlayerLighting; });
/* harmony import */ var rot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _ai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ai */ "./src/ai.js");







function createReflectivityCallback(map) {
    return function (x, y) {
        if (x < 0 || y < 0 || x >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"] || y >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_HEIGHT"]) {
            return 0;
        }
        return map[y][x].blocksSight ? 0 : map[y][x].reflectivity;
    };
}

/**
 * Component
 */
class ReflectivityLighting {
    constructor(color, range) {
        this.color = color;
        this.range = range;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    compute(map) {
        function lightingCallback(x, y, color) {
            if (x < 0 || y < 0 || x >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"] || y >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_HEIGHT"]) {
                return;
            }
            map[y][x].lightingColor = rot_js__WEBPACK_IMPORTED_MODULE_0__["Color"].toRGB(
                rot_js__WEBPACK_IMPORTED_MODULE_0__["Color"].add(
                    rot_js__WEBPACK_IMPORTED_MODULE_0__["Color"].fromString(map[y][x].lightingColor),
                    color
                )
            );
        }
        const fov = new rot_js__WEBPACK_IMPORTED_MODULE_0__["FOV"].PreciseShadowcasting(
            Object(_ai__WEBPACK_IMPORTED_MODULE_2__["createPassableSightCallback"])(this.owner)
        );
        const lighting = new rot_js__WEBPACK_IMPORTED_MODULE_0__["Lighting"](createReflectivityCallback(map), { range: this.range, passes: 2 });
        lighting.setFOV(fov);
        lighting.setLight(this.owner.x, this.owner.y, this.color);
        lighting.compute(lightingCallback);
        // For some reason the tile you're on doesn't get lit
        map[this.owner.y][this.owner.x].lightingColor = this.color;
    }
}

/**
 * Component
 */
class PlayerLighting {
    constructor(color, range) {
        this.color = color;
        this.range = range;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    compute(map) {
        function lightingCallback (x, y, color) {
            if (x < 0 || y < 0 || x >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"] || y >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_HEIGHT"]) {
                return;
            }
            map[y][x].lightingColor = rot_js__WEBPACK_IMPORTED_MODULE_0__["Color"].toRGB(
                rot_js__WEBPACK_IMPORTED_MODULE_0__["Color"].add(
                    rot_js__WEBPACK_IMPORTED_MODULE_0__["Color"].fromString(map[y][x].lightingColor),
                    color
                )
            );
            map[y][x].explored = true;
        }

        const sightFov = new rot_js__WEBPACK_IMPORTED_MODULE_0__["FOV"].PreciseShadowcasting(
            Object(_ai__WEBPACK_IMPORTED_MODULE_2__["createPassableSightCallback"])(this.owner)
        );
        sightFov.compute(this.owner.x, this.owner.y, 100, function(x, y) {
            if (x < 0 || y < 0 || x >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"] || y >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_HEIGHT"]) {
                return;
            }
            map[y][x].visible = true;
        });

        const lightingFov = new rot_js__WEBPACK_IMPORTED_MODULE_0__["FOV"].PreciseShadowcasting(
            Object(_ai__WEBPACK_IMPORTED_MODULE_2__["createPassableSightCallback"])(this.owner)
        );
        const lighting = new rot_js__WEBPACK_IMPORTED_MODULE_0__["Lighting"](createReflectivityCallback(map), { range: this.range, passes: 2 });
        lighting.setFOV(lightingFov);
        lighting.setLight(this.owner.x, this.owner.y, this.color);
        lighting.compute(lightingCallback);
    }
}



/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: mouseLook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mouseLook", function() { return mouseLook; });
/* harmony import */ var rot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ "./src/globals.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object */ "./src/object.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map */ "./src/map.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui */ "./src/ui.js");










function mouseLook(e) {
    const pos = _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.display.eventToPosition(e);
    const target = Object(_map__WEBPACK_IMPORTED_MODULE_4__["getObjectsAtLocation"])(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.gameObjects, pos[0], pos[1])[0];
    if (target && target.name && target.ai && target.ai.state) {
        if (target.ai.state === "wander") {
            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage("A " + target.name + ", it hasn't seen you.");
        } else {
            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage("A " + target.name);
        }
    } else if (target && target.name) {
        _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage(target.name);
    } else if (!target) {
        _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.map[pos[1]][pos[0]].name);
    }
}

/**
 * Class inside the scheduler which handles the normal functions of
 * the game loop which aren't related to initiating the behavior of
 * actors or objects
 */
class Manager {
    constructor(game) {
        this.game = game;
    }

    act() {
        this.game.engine.lock();
        this.game.currentTurn++;

        if (this.game.player.fighter === null) {
            this.game.loseCinematic();
            return;
        }

        Object(_map__WEBPACK_IMPORTED_MODULE_4__["resetVisibility"])(this.game.map);
        this.game.drawAll();
        this.game.engine.unlock();
    }
}

class SimpleDungeonCrawler {
    constructor() {
        this.canvas = null;
        this.display = null;
        this.player = null;
        this.engine = null;
        this.scheduler = null;
        this.gameObjects = [];
        this.map = [];
        this.currentLogLines = [];
        this.currentLevel = 0;
        this.currentTurn = 0;
        this.totalMessages = 0;
        this.display = new rot_js__WEBPACK_IMPORTED_MODULE_0__["Display"]({
            width: _data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"],
            height: _data__WEBPACK_IMPORTED_MODULE_3__["HEIGHT"],
            fontSize: 13,
            forceSquareRatio: true
        });
        this.canvas = this.display.getContainer();
        document.getElementById("canvas").appendChild(this.canvas);

        this.openingCinematic();
    }

    reset () {
        Object(_ui__WEBPACK_IMPORTED_MODULE_5__["clearScreen"])(this.display);
        this.player.fighter = null;
        this.player.ai = null;
        window.removeEventListener("keydown", this.player.ai);
        this.player = null;
        this.currentLevel = 0;
        this.map = [];
        this.gameObjects = [];
        this.currentLogLines = [];
        this.scheduler.clear();
    }

    openingCinematic() {
        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 7), 12, "%c{white}Your country is being overrun by the forces of darkness");
        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 8), 15, "%c{white}Tales tell of a weapon of great power lost in the");
        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 4), 16, "%c{white}lands beyond the dwarf stronghold Durdwin, under the Red Hills.");
        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 17), 18, "%c{white}None who have entered have returned");
        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 14), 20, "%c{white}It is the last hope of a desperate people");
        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 16), 21, "%c{white}You have volunteered to retrieve it");
        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 24), 27, "%c{white}Press [enter] to start");

        const parent = this;
        window.addEventListener("keydown", function _listener(e) {
            if (e.key === "Enter") {
                parent.startGameplay();
                window.removeEventListener("keydown", _listener);
            }
        });
    }

    winCinematic() {
        this.reset();

        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 12), 12, "%c{white}You have reached the bottom and have retrieved");
        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 16), 13, "%c{white}the fabled weapon and saved your people");
        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 18), 24, "%c{white}Press [enter] to restart the game");

        const parent = this;
        window.addEventListener("keydown", function _listener(e) {
            if (e.key === "Enter") {
                parent.startGameplay();
                window.removeEventListener("keydown", _listener);
            }
        });
    }

    loseCinematic() {
        this.reset();

        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 5), 12, "%c{white}You have died, and the last hope of your people dies with you");
        this.display.drawText(_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - (_data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"] - 18), 24, "%c{white}Press [enter] to restart the game");

        const parent = this;
        window.addEventListener("keydown", function _listener(e) {
            if (e.key === "Enter") {
                parent.startGameplay();
                window.removeEventListener("keydown", _listener);
            }
        });
    }

    startGameplay() {
        // looking at objects on the map with the mouse
        this.hookMouseLook();

        this.scheduler = new rot_js__WEBPACK_IMPORTED_MODULE_0__["Scheduler"].Simple();
        this.manager = new Manager(this);
        this.player = Object(_object__WEBPACK_IMPORTED_MODULE_2__["createObject"])("player", 1, 1);
        this.loadLevel("level_1");
    }

    displayMessage(text) {
        this.totalMessages++;

        for (let i = 0; i < _data__WEBPACK_IMPORTED_MODULE_3__["WIDTH"]; i++) {
            for (let j = 1; j < _data__WEBPACK_IMPORTED_MODULE_3__["UI_HEIGHT"]; j++) {
                this.display.draw(i, _data__WEBPACK_IMPORTED_MODULE_3__["HEIGHT"] - j, "", "black", "black");
            }
        }

        if (this.currentLogLines.length === 5) {
            this.currentLogLines.splice(0, 1);
        }
        this.currentLogLines.push(this.totalMessages + ") " + text);
        for (let d = 0; d < this.currentLogLines.length; d++) {
            this.display.drawText(0,  _data__WEBPACK_IMPORTED_MODULE_3__["HEIGHT"] - 5 + d, "%c{white}" + this.currentLogLines[d]);
        }
    }

    drawAll() {
        this.gameObjects
            .filter(o => o.lighting && typeof o.lighting.compute === "function")
            .forEach(o => o.lighting.compute(this.map));
        this.player.lighting.compute(this.map);

        Object(_map__WEBPACK_IMPORTED_MODULE_4__["drawMap"])(this.display, this.map);

        // FIX ME: dead bodies draw over enemies on the same tile
        this.gameObjects
            .filter(o => o.graphics && typeof o.graphics.draw === "function")
            .forEach(o => o.graphics.draw(this.display, this.map));

        this.player.graphics.draw(this.display, this.map);
        Object(_ui__WEBPACK_IMPORTED_MODULE_5__["drawUI"])(this.display, this.currentLevel, this.player);
    }

    loadLevel (name) {
        this.currentLevel++;

        if (this.currentLevel === 21) {
            this.winCinematic();
            return;
        }

        const {map, playerLocation, objects} = Object(_map__WEBPACK_IMPORTED_MODULE_4__["loadTiledMap"])(name);
        this.map = map;
        this.gameObjects = objects;

        this.player.x = playerLocation[0];
        this.player.y = playerLocation[1];
        this.player.fighter.mana = this.player.fighter.maxMana;

        this.scheduler.clear();
        this.scheduler.add(this.manager, true);
        this.scheduler.add(this.player, true);
        this.gameObjects.forEach(e => this.scheduler.add(e, true));
        this.engine = new rot_js__WEBPACK_IMPORTED_MODULE_0__["Engine"](this.scheduler);
        this.engine.start();
    }

    hookMouseLook () {
        // break out the hook and unhook mouse look into their own functions
        // because other actions need to take over the mouse at some points
        // and we don't want anything other than the Game object interacting
        // with the canvas
        this.canvas.addEventListener("mousedown", mouseLook);
    }

    unhookMouseLook () {
        this.canvas.removeEventListener("mousedown", mouseLook);
    }

    addObject (object) {
        this.gameObjects.push(object);
        this.scheduler.add(this.gameObjects[this.gameObjects.length - 1], true);
    }

    /**
     * Remove an object from the world
     * @param  {GameObject} object The object to remove
     * @return {void}
     */
    removeObject (object) {
        // could use an object pool or a linked list to speed up this operation
        // but that seems overkill for this
        this.gameObjects.splice(this.gameObjects.indexOf(object), 1);
        this.scheduler.remove(object);
    }
}
_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game = new SimpleDungeonCrawler();


/***/ }),

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! exports provided: loadTiledMap, findEmptySpace, getObjectsAtLocation, isBlocked, isSightBlocked, getClosestVisibleFighter, resetVisibility, setAllToExplored, drawMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTiledMap", function() { return loadTiledMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findEmptySpace", function() { return findEmptySpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getObjectsAtLocation", function() { return getObjectsAtLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBlocked", function() { return isBlocked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSightBlocked", function() { return isSightBlocked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClosestVisibleFighter", function() { return getClosestVisibleFighter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetVisibility", function() { return resetVisibility; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllToExplored", function() { return setAllToExplored; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawMap", function() { return drawMap; });
/* harmony import */ var rot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object */ "./src/object.js");
/* harmony import */ var _maps_level_1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maps/level_1 */ "./src/maps/level_1.js");
/* harmony import */ var _maps_level_1__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_maps_level_1__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _maps_level_2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./maps/level_2 */ "./src/maps/level_2.js");
/* harmony import */ var _maps_level_2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_maps_level_2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _maps_dev_room__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./maps/dev_room */ "./src/maps/dev_room.js");
/* harmony import */ var _maps_dev_room__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_maps_dev_room__WEBPACK_IMPORTED_MODULE_5__);











const TileMaps = { level_1: (_maps_level_1__WEBPACK_IMPORTED_MODULE_3___default()), level_2: (_maps_level_2__WEBPACK_IMPORTED_MODULE_4___default()), dev_room: (_maps_dev_room__WEBPACK_IMPORTED_MODULE_5___default()) };

class Tile {
    constructor(name, char, fgColor, bgColor, fgColorExplored, bgColorExplored, blocks, blocksSight, visible = false, explored = false) {
        this.name = name;
        this.char = char;
        this.fgColor = fgColor;
        this.bgColor = bgColor;
        this.fgColorExplored = fgColorExplored;
        this.bgColorExplored = bgColorExplored;
        this.blocks = blocks;
        this.blocksSight = blocksSight;
        this.visible = visible;
        this.explored = explored;
        this.reflectivity = 0.18;
        this.lightingColor = bgColor;
    }

    isVisibleAndLit() {
        return this.visible && this.lightingColor !== _data__WEBPACK_IMPORTED_MODULE_1__["COLOR_AMBIENT_LIGHT"];
    }
}

function loadTiledMap(level) {
    const sourceData = TileMaps[level];
    const tileSize = sourceData.tileheight;
    const map = [];
    const objects = [];
    let playerLocation = null;

    if (sourceData.width !== _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"] && sourceData.height !== _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_HEIGHT"]) {
        throw new Error(`Loaded map ${name} doesn't match world width/height`);
    }

    if (sourceData.layers.length !== 2) {
        throw new Error(`Loaded map ${name} should only have two layers`);
    }

    const translated = sourceData.layers[0].data.map(tile => {
        if (!(tile in _data__WEBPACK_IMPORTED_MODULE_1__["TileData"])) { throw new Error(`${tile} is not valid tile`); }

        const data = _data__WEBPACK_IMPORTED_MODULE_1__["TileData"][tile];
        return new Tile(
            data.name,
            data.char,
            data.fgColor,
            data.bgColor,
            data.fgColorExplored,
            data.bgColorExplored,
            data.blocks,
            data.blocksSight
        );
    });

    for (let i = 0; i < translated.length; i += _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"]) {
        map.push(translated.slice(i, i + _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"]));
    }

    sourceData.layers[1].objects.forEach(o => {
        function findProperty(name) {
            if (!o.properties || !o.properties.length) { return null; }

            const property = o.properties.filter(prop => {
                return prop.name === name;
            });

            if (property.length === 0) {
                return null;
            } else {
                return property[0].value;
            }
        }

        let obj;
        const id = findProperty("id"),
            inventory = findProperty("inventory"),
            levelName = findProperty("levelName"),
            spellId = findProperty("spellId");

        if (!id) {
            console.error(`No id for ${o.name}`);
            return;
        }

        if (o.point) {
            if (id === "player") {
                playerLocation = [Math.floor(o.x / tileSize), Math.floor(o.y / tileSize)];
            } else {
                obj = Object(_object__WEBPACK_IMPORTED_MODULE_2__["createObject"])(
                    id,
                    Math.floor(o.x / tileSize),
                    Math.floor(o.y / tileSize),
                );

                if (inventory && obj.inventoryComponent) {
                    inventory.split(",").forEach(i => obj.inventoryComponent.addItem(i));
                }

                if (levelName && obj.interactable && obj.interactable.setLevel) {
                    obj.interactable.setLevel(levelName);
                }

                if (spellId && obj.interactable && obj.interactable.setSpell) {
                    obj.interactable.setSpell(spellId);
                }
                objects.push(obj);
            }
        } else if (o.type === "Rectangle") {
            const x = Math.floor(o.x / tileSize);
            const y = Math.floor(o.y / tileSize);
            const width = Math.floor(o.width / tileSize) + x;
            const height = Math.floor(o.height / tileSize) + y;

            for (let i = y; i < height; i++) {
                for (let j = x; j < width; j++) {
                    objects.push(Object(_object__WEBPACK_IMPORTED_MODULE_2__["createObject"])(id, i, j));
                }
            }
        }
    });

    return { map, playerLocation, objects };
}

function findEmptySpace(map, objects) {
    let x = 0, y = 0;
    while (exports.isBlocked(map, objects, x, y)) {
        x = Math.floor(rot_js__WEBPACK_IMPORTED_MODULE_0__["RNG"].getUniform() * _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"]);
        y = Math.floor(rot_js__WEBPACK_IMPORTED_MODULE_0__["RNG"].getUniform() * _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_HEIGHT"]);
    }
    return { x, y };
}

function getObjectsAtLocation(objects, x, y) {
    return objects.filter(object => object.x === x && object.y === y);
}

/**
    Returns null if the space is open, true or the blocking object
    if blocked
*/
function isBlocked(map, objects, x, y) {
    if (x < 0 || y < 0 || x >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"] || y >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_HEIGHT"] || map[y][x].blocks) {
        return true;
    }

    const target = objects.filter(object => object.x === x && object.y === y && object.blocks === true)[0];
    return target ? target : null;
}

/**
    Returns true if space blocks sight, false otherwise
*/
function isSightBlocked(map, objects, x, y) {
    if (x < 0 || y < 0 || x >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"] || y >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_HEIGHT"] || map[y][x].blocksSight) {
        return true;
    }

    const o = getObjectsAtLocation(objects, x, y);
    for (let i = 0; i < o.length; i++) {
        if (o[i].blocksSight) {
            return true;
        }
    }

    return false;
}

function drawTile(display, tile, x, y) {
    let fgColor, bgColor;

    if (tile.blocks) {
        if (!tile.explored) {
            fgColor = _data__WEBPACK_IMPORTED_MODULE_1__["COLOR_INVISIBLE_WALL"];
            bgColor = _data__WEBPACK_IMPORTED_MODULE_1__["COLOR_INVISIBLE_WALL"];
        } else if (tile.explored && tile.visible) {
            fgColor = tile.fgColor;
            bgColor = tile.bgColor;
        } else if (tile.explored && !tile.visible) {
            fgColor = _data__WEBPACK_IMPORTED_MODULE_1__["COLOR_DARK_WALL"];
            bgColor = _data__WEBPACK_IMPORTED_MODULE_1__["COLOR_DARK_WALL"];
        }
    } else {
        if (tile.isVisibleAndLit()) {
            fgColor = tile.fgColor;
            bgColor = tile.lightingColor;
        } else if (tile.explored) {
            fgColor = _data__WEBPACK_IMPORTED_MODULE_1__["COLOR_DARK_GROUND"];
            bgColor = _data__WEBPACK_IMPORTED_MODULE_1__["COLOR_DARK_GROUND"];
        } else {
            fgColor = _data__WEBPACK_IMPORTED_MODULE_1__["COLOR_INVISIBLE_GROUND"];
            bgColor = _data__WEBPACK_IMPORTED_MODULE_1__["COLOR_INVISIBLE_GROUND"];
        }
    }


    display.draw(x, y, tile.char, fgColor, bgColor);
}

/**
 * Find the distance between two GameObjects
 * @param  {GameObject} a An object
 * @param  {GameObject} b An object
 * @return {Number}       The distance
 */
function distanceBetweenObjects(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
}

/**
 * Find the closest other actor from an actor origin given the actor is
 * on a visible tile.
 *
 * @param  {Array}      map          The current map
 * @param  {Array}      actors       The current list of actors
 * @param  {GameObject} origin       The starting object
 * @param  {Number}     maxDistance  The max allowed distance before giving up
 * @return {GameObject}              The closest actor
 */
function getClosestVisibleFighter(map, actors, origin, maxDistance) {
    let closestActor = null;
    let closestDistance = maxDistance + 1;

    for (let i = 0; i < actors.length; i++) {
        const actor = actors[i];
        if (actor.fighter !== undefined && actor.fighter !== null && actor !== origin && map[actor.y][actor.x].visible) {
            const distance = distanceBetweenObjects(origin, actor);
            if (distance < closestDistance) {
                closestActor = actor;
                closestDistance = distance;
            }
        }
    }

    return closestActor;
}

/**
 * Set all the Tile objects in a map to visible
 * @param  {Array} map  An array of arrays of Tiles
 * @return {void}
 */
function resetVisibility(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].visible = false;
            map[y][x].lightingColor = _data__WEBPACK_IMPORTED_MODULE_1__["COLOR_AMBIENT_LIGHT"];
        }
    }
}

/**
 * Set all the Tile objects in a map to explored
 * @param  {Array} map  An array of arrays of Tiles
 * @return {void}
 */
function setAllToExplored(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].explored = true;
        }
    }
}

/**
 * Calls drawTile on an array of Tile arrays
 * @param  {Object} display The ROT display
 * @param  {Array} map      An array of arrays of Tiles
 * @return {void}
 */
function drawMap(display, map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            drawTile(display, map[y][x], x, y);
        }
    }
}


/***/ }),

/***/ "./src/maps/dev_room.js":
/*!******************************!*\
  !*** ./src/maps/dev_room.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if( true && module && module.exports) {
  module.exports = data;
 }})("dev_room",
{ "compressionlevel":-1,
 "height":39,
 "infinite":false,
 "layers":[
        {
         "data":[1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 1048, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 1048, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 1048, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 1048, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 1048, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048],
         "height":39,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":70,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":2,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":0,
                 "id":1,
                 "name":"Player",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"player"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":880.250035462825,
                 "y":754.192197850584
                }, 
                {
                 "height":0,
                 "id":2,
                 "name":"Door",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"door"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1297.45889387145,
                 "y":627.80269058296
                }, 
                {
                 "height":0,
                 "id":3,
                 "name":"Goblin",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"goblin"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1297.45889387145,
                 "y":488.789237668161
                }, 
                {
                 "height":0,
                 "id":4,
                 "name":"Chest",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"chest"
                        }, 
                        {
                         "name":"inventory",
                         "type":"string",
                         "value":"health_potion_weak,lightning_scroll_weak"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1201.79372197309,
                 "y":887.892376681614
                }, 
                {
                 "height":0,
                 "id":5,
                 "name":"Lantern",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"lantern"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1139.76083707025,
                 "y":757.847533632287
                }, 
                {
                 "height":0,
                 "id":6,
                 "name":"Chest",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"chest"
                        }, 
                        {
                         "name":"inventory",
                         "type":"string",
                         "value":"health_potion_weak,health_potion_weak"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1038.86397608371,
                 "y":887.144992526158
                }, 
                {
                 "height":0,
                 "id":7,
                 "name":"Magika Shrine",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"magic_shrine"
                        }, 
                        {
                         "name":"spellId",
                         "type":"string",
                         "value":"lightning_bolt"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1425.26158445441,
                 "y":760.837070254111
                }, 
                {
                 "height":0,
                 "id":8,
                 "name":"Crate",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"crate"
                        }, 
                        {
                         "name":"inventory",
                         "type":"string",
                         "value":"health_potion_weak"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1135.27653213752,
                 "y":887.144992526158
                }, 
                {
                 "height":0,
                 "id":9,
                 "name":"Door",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"door"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1039.61136023916,
                 "y":630.792227204783
                }, 
                {
                 "height":0,
                 "id":10,
                 "name":"Goblin Brute",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"goblin_brute"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1043.34828101644,
                 "y":507.473841554559
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":3,
 "nextobjectid":11,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.3.4",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/DungeonCrawl_ProjectUtumnoTileset.tsx"
        }],
 "tilewidth":32,
 "type":"map",
 "version":1.2,
 "width":70
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/maps/level_1.js":
/*!*****************************!*\
  !*** ./src/maps/level_1.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if( true && module && module.exports) {
  module.exports = data;
 }})("level_1",
{ "compressionlevel":-1,
 "editorsettings":
    {
     "export":
        {
         "target":"."
        }
    },
 "height":39,
 "infinite":false,
 "layers":[
        {
         "data":[1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1165, 1165, 1165, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1165, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048],
         "height":39,
         "id":1,
         "name":"World",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":70,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":4,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":0,
                 "id":4,
                 "name":"Player",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"player"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":434.407214885732,
                 "y":597.42625896958
                }, 
                {
                 "height":0,
                 "id":5,
                 "name":"Rat",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"rat"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1034.21306581315,
                 "y":637.979450172237
                }, 
                {
                 "height":0,
                 "id":10,
                 "name":"Rat",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"rat"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":946.647780925402,
                 "y":1192.16241737488
                }, 
                {
                 "height":0,
                 "id":11,
                 "name":"Door",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"load_door"
                        }, 
                        {
                         "name":"levelName",
                         "type":"string",
                         "value":"level_2"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1553.3522190746,
                 "y":567.853960595562
                }, 
                {
                 "height":0,
                 "id":12,
                 "name":"Lantern",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"lantern"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1492.09884474265,
                 "y":443.42795991692
                }, 
                {
                 "height":0,
                 "id":17,
                 "name":"Crate",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"crate"
                        }, 
                        {
                         "name":"inventory",
                         "type":"string",
                         "value":"health_potion_weak"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":528.565696038229,
                 "y":52.1822201259912
                }, 
                {
                 "height":0,
                 "id":18,
                 "name":"Lantern",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"lantern"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1488.32909637162,
                 "y":695.632077651953
                }, 
                {
                 "height":0,
                 "id":19,
                 "name":"Rat",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"rat"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":681.765657499422,
                 "y":97.0649410677145
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":5,
 "nextobjectid":20,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.3.4",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/DungeonCrawl_ProjectUtumnoTileset.tsx"
        }],
 "tilewidth":32,
 "type":"map",
 "version":1.2,
 "width":70
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/maps/level_2.js":
/*!*****************************!*\
  !*** ./src/maps/level_2.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if( true && module && module.exports) {
  module.exports = data;
 }})("level_2",
{ "compressionlevel":-1,
 "editorsettings":
    {
     "export":
        {
         "target":"."
        }
    },
 "height":39,
 "infinite":false,
 "layers":[
        {
         "data":[1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 2936, 2936, 2936, 900, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 2869, 900, 900, 900, 2869, 900, 900, 900, 2869, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 900, 900, 900, 900, 900, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 1048, 1048, 1048, 900, 900, 900, 900, 900, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 2710, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 2869, 900, 900, 900, 2869, 900, 900, 900, 2869, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 900, 900, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 900, 900, 900, 900, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048, 1048],
         "height":39,
         "id":1,
         "name":"World",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":70,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "id":4,
         "name":"Object Layer 1",
         "objects":[
                {
                 "height":0,
                 "id":4,
                 "name":"Player",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"player"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":48.9730893444762,
                 "y":727.91157376972
                }, 
                {
                 "height":0,
                 "id":5,
                 "name":"Golbin",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"goblin"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":644.193719444052,
                 "y":712.330540708638
                }, 
                {
                 "height":0,
                 "id":6,
                 "name":"Chest",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"chest"
                        }, 
                        {
                         "name":"inventory",
                         "type":"string",
                         "value":"health_potion_weak,lightning_scroll_weak"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":341.526275397425,
                 "y":948.672967850652
                }, 
                {
                 "height":0,
                 "id":7,
                 "name":"Stairs",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"stairs"
                        }, 
                        {
                         "name":"levelName",
                         "type":"string",
                         "value":"level_2"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":1202.30788561211,
                 "y":247.937747564976
                }, 
                {
                 "height":0,
                 "id":8,
                 "name":"Crate",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"crate"
                        }, 
                        {
                         "name":"inventory",
                         "type":"string",
                         "value":"health_potion_weak"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":370.617261554132,
                 "y":949.94792690583
                }, 
                {
                 "height":0,
                 "id":9,
                 "name":"Crate",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"crate"
                        }, 
                        {
                         "name":"inventory",
                         "type":"string",
                         "value":""
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":944.729776321084,
                 "y":725.333340842067
                }, 
                {
                 "height":0,
                 "id":11,
                 "name":"Crate",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"crate"
                        }, 
                        {
                         "name":"inventory",
                         "type":"string",
                         "value":"health_potion_weak"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":943.603906892819,
                 "y":760.182468483655
                }, 
                {
                 "height":0,
                 "id":12,
                 "name":"Golbin",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"goblin"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":340.545596044442,
                 "y":1083.26097831731
                }, 
                {
                 "height":0,
                 "id":14,
                 "name":"Fire",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"campfire"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":658.781710294825,
                 "y":237.201980125518
                }, 
                {
                 "height":0,
                 "id":15,
                 "name":"Fire",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"campfire"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":786.258618604088,
                 "y":238.296842869239
                }, 
                {
                 "height":0,
                 "id":16,
                 "name":"Fire",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"campfire"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":910.850368936736,
                 "y":239.506471513245
                }, 
                {
                 "height":0,
                 "id":17,
                 "name":"Lantern",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"lantern"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":209.265755413088,
                 "y":951.97774283295
                }, 
                {
                 "height":0,
                 "id":18,
                 "name":"Golbin",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"goblin"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":949.558485544938,
                 "y":145.155437280755
                }, 
                {
                 "height":0,
                 "id":19,
                 "name":"Golbin",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"goblin"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":622.958751663239,
                 "y":147.574694568767
                }, 
                {
                 "height":0,
                 "id":20,
                 "name":"Rat",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"rat"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":244.344986089271,
                 "y":226.200556429176
                }, 
                {
                 "height":0,
                 "id":22,
                 "name":"Load Door",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"load_door"
                        }, 
                        {
                         "name":"levelName",
                         "type":"string",
                         "value":"level_1"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":14.605418138987,
                 "y":723.203769140165
                }, 
                {
                 "height":0,
                 "id":29,
                 "name":"Door",
                 "point":true,
                 "properties":[
                        {
                         "name":"id",
                         "type":"string",
                         "value":"door"
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":526.910048927362,
                 "y":728.264960481746
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":5,
 "nextobjectid":30,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.3.4",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/DungeonCrawl_ProjectUtumnoTileset.tsx"
        }],
 "tilewidth":32,
 "type":"map",
 "version":1.2,
 "width":70
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/object.js":
/*!***********************!*\
  !*** ./src/object.js ***!
  \***********************/
/*! exports provided: createObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createObject", function() { return createObject; });
/* harmony import */ var rot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ "./src/globals.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _ai__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ai */ "./src/ai.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _interactable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./interactable */ "./src/interactable.js");
/* harmony import */ var _inventory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./inventory */ "./src/inventory.js");
/* harmony import */ var _graphics__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./graphics */ "./src/graphics.js");
/* harmony import */ var _lighting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lighting */ "./src/lighting.js");
/* harmony import */ var _fighter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./fighter */ "./src/fighter.js");















/**
 * Base class representing all objects in the game. Uses the
 * Entity/Component design pattern so that the only thing that
 * this object directly controls is its position, whether it
 * has collision, and its name.
 *
 * The act method is the method called by the engine every turn.
 */
class GameObject {
    constructor(type, x, y, name, blocks=false, blocksSight=false) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.name = name;
        this.blocks = blocks;
        this.blocksSight = blocksSight;

        this.graphics = null;
        this.lighting = null;
        this.fighter = null;
        this.ai = null;
        this.inventoryComponent = null;
        this.interactable = null;
    }

    setGraphics(graphics) {
        graphics.setOwner(this);
        this.graphics = graphics;
    }

    setLighting(lighting) {
        lighting.setOwner(this);
        this.lighting = lighting;
    }

    setFighter(fighter) {
        fighter.setOwner(this);
        this.fighter = fighter;
    }

    setAI(ai) {
        ai.setOwner(this);
        this.ai = ai;
    }

    setInventory(inventoryComponent) {
        inventoryComponent.setOwner(this);
        this.inventoryComponent = inventoryComponent;
    }

    setInteractable(interactable) {
        interactable.setOwner(this);
        this.interactable = interactable;
    }

    act() {
        if (this.ai && typeof this.ai.act === "function") {
            this.ai.act();
        }
        if (this.fighter && typeof this.fighter.act === "function") {
            this.fighter.act();
        }
    }
}

/**
 * Use an id to grab object data and create a new GameObject
 * @param  {String} id     The object id
 * @return {GameObject}    A GameObject with the components and params given in the data
 */
function createObject(id, x=0, y=0) {
    if (!(id in _data__WEBPACK_IMPORTED_MODULE_2__["ObjectData"])) { throw new Error(`${id} is not valid object id`); }

    const data = _data__WEBPACK_IMPORTED_MODULE_2__["ObjectData"][id];
    const object = new GameObject(
        id,
        x, y,
        data.name,
        data.blocks,
        data.blocksSight
    );

    if (data.ai) {
        switch (data.ai) {
        case "player_control_ai":
            object.setAI(new _player__WEBPACK_IMPORTED_MODULE_4__["PlayerControlAI"]());
            break;
        case "basic_monster_ai":
            object.setAI(new _ai__WEBPACK_IMPORTED_MODULE_3__["BasicMonsterAI"](data.sightRange));
            break;
        case "patrolling_monster_ai":
            object.setAI(new _ai__WEBPACK_IMPORTED_MODULE_3__["PatrollingMonsterAI"](data.sightRange));
            break;
        case "chest_ai":
            object.setAI(new _ai__WEBPACK_IMPORTED_MODULE_3__["ChestAI"](data.bgColor, data.emptyColor));
            break;
        case "dropped_item_ai":
            object.setAI(new _ai__WEBPACK_IMPORTED_MODULE_3__["DroppedItemAI"]());
            break;
        default:
            console.error(`Unhandled AI type ${data.ai}`);
            break;
        }
    }

    if (data.graphics) {
        switch (data.graphics) {
        case "basic_graphics":
            object.setGraphics(new _graphics__WEBPACK_IMPORTED_MODULE_7__["BasicGraphics"](data.char, data.fgColor, data.bgColor));
            break;
        case "draw_after_seen":
            object.setGraphics(new _graphics__WEBPACK_IMPORTED_MODULE_7__["DrawAfterSeen"](data.char, data.fgColor, data.bgColor));
            break;
        default:
            console.error(`Unhandled Graphics type ${data.graphics}`);
            break;
        }
    }

    if (data.lighting) {
        switch (data.lighting) {
        case "reflectivity":
            object.setLighting(new _lighting__WEBPACK_IMPORTED_MODULE_8__["ReflectivityLighting"](data.lightingColor, data.lightingRange));
            break;
        case "player_lighting":
            object.setLighting(new _lighting__WEBPACK_IMPORTED_MODULE_8__["PlayerLighting"](data.lightingColor, data.lightingRange));
            break;
        default:
            console.error(`Unhandled Lighting type ${data.lighting}`);
            break;
        }
    }

    if (data.fighter) {
        let callback;

        switch (data.onDeath) {
        case "default":
            callback = enemyDeathCallback;
            break;
        case "removeFromWorld":
            callback = removeDeathCallback;
            break;
        default:
            console.error(`Unhandled onDeath type ${data.onDeath}`);
            break;
        }

        switch (data.fighter) {
        case "basic_fighter":
            object.setFighter(new _fighter__WEBPACK_IMPORTED_MODULE_9__["BasicFighter"](
                data,
                callback
            ));
            break;
        default:
            console.error(`Unhandled Fighter type ${data.fighter}`);
            break;
        }
    }

    if (data.inventory) {
        switch (data.inventory) {
        case "basic_inventory":
            object.setInventory(new _inventory__WEBPACK_IMPORTED_MODULE_6__["BasicInventory"]());
            break;
        default:
            console.error(`Unhandled Inventory type ${data.inventory}`);
            break;
        }

        if (data.inventoryPool) {
            for (let i = 0; i < data.inventoryPool.length; i++) {
                if (rot_js__WEBPACK_IMPORTED_MODULE_0__["RNG"].getUniform() <= data.inventoryPool[i][1]) {
                    object.inventoryComponent.addItem(data.inventoryPool[i][0]);
                }
            }
        }
    }

    if (data.interactable) {
        switch (data.interactable) {
        case "give_items_interactable":
            object.setInteractable(new _interactable__WEBPACK_IMPORTED_MODULE_5__["GiveItemsInteractable"]());
            break;
        case "give_spell_interactable":
            object.setInteractable(new _interactable__WEBPACK_IMPORTED_MODULE_5__["GiveSpellInteractable"]());
            break;
        case "load_level_interactable":
            object.setInteractable(new _interactable__WEBPACK_IMPORTED_MODULE_5__["LoadLevelInteractable"]());
            break;
        case "door_interactable":
            object.setInteractable(new _interactable__WEBPACK_IMPORTED_MODULE_5__["DoorInteractable"]());
            break;
        default:
            console.error(`Unhandled Interactable type ${data.interactable}`);
            break;
        }
    }

    return object;
}

/**
 * Removes the AI, fighter, and intractable off of an object. Changes graphics
 * to dead body graphics and sets blocking to false. Also spawns a dropped item
 * if there were items in the inventory.
 *
 * @param  {GameObject} target    The GameObject that was killed
 * @return {void}
 */
function enemyDeathCallback(target) {
    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage(target.name + " has been killed");
    target.graphics.char = "%";
    target.graphics.fgColor = "green";
    target.graphics.bgColor = "darkred";
    target.blocks = false;
    target.fighter = null;
    target.ai = null;
    target.interactable = null;
    target.name = "Remains of a " + target.name;

    if (target.inventoryComponent.getIDsAndCounts().length > 0) {
        const item = createObject("dropped_item", target.x, target.y);
        item.inventoryComponent = target.inventoryComponent;
        _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.addObject(item);
    }

    target.inventoryComponent = null;
}

/**
 * Removes self from world and scheduler. Also spawns a dropped item
 * if there were items in the inventory.
 *
 * @param  {GameObject} target    The GameObject that was killed
 * @return {void}
 */
function removeDeathCallback(target) {
    if (target.inventoryComponent.getIDsAndCounts().length > 0) {
        const item = createObject("dropped_item", target.x, target.y);
        item.inventoryComponent = target.inventoryComponent;
        _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.addObject(item);
    }

    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.removeObject(target);
}


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: PlayerControlAI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerControlAI", function() { return PlayerControlAI; });
/* harmony import */ var rot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rot-js */ "./node_modules/rot-js/lib/index.js");
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ "./src/globals.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map */ "./src/map.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui */ "./src/ui.js");









/**
    returns true when moved, false otherwise
 */
function moveCommand(actor, direction, topology) {
    return function() {
        const dir = rot_js__WEBPACK_IMPORTED_MODULE_0__["DIRS"][topology][direction];
        const newX = actor.x + dir[0];
        const newY = actor.y + dir[1];
        const target = Object(_map__WEBPACK_IMPORTED_MODULE_3__["isBlocked"])(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.map, _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.gameObjects, newX, newY);

        if (target === true) {
            return false;
        }

        if (target) {
            if (target.interactable) {
                target.interactable.interact(actor);
                return true;
            }

            if (target.fighter) {
                actor.fighter.attack(target);
                return true;
            }
        }

        actor.x = newX;
        actor.y = newY;
        return true;
    };
}

function getItemCommand(actor) {
    return function() {
        const items = _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.gameObjects.filter(item => {
            return item.type === "dropped_item" && item.x === actor.x && item.y === actor.y;
        });

        if (items.length > 0) {
            items[0].interactable.interact(actor);
            return true;
        }

        _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage("There's no item to pick up");
        return false;
    };
}

function openInventoryCommand(actor) {
    return function() {
        Object(_ui__WEBPACK_IMPORTED_MODULE_4__["showSelectionMenu"])(
            "Player Inventory",
            actor.inventoryComponent.getNamesAndCounts(),
            "inventory",
            _data__WEBPACK_IMPORTED_MODULE_2__["WIDTH"]
        );
        actor.ai.state = "inventory";
        return false;
    };
}

function openSpellsCommand(actor) {
    return function() {
        Object(_ui__WEBPACK_IMPORTED_MODULE_4__["showSelectionMenu"])(
            "Spells",
            actor.fighter.getKnownSpells().map(e => _data__WEBPACK_IMPORTED_MODULE_2__["SpellData"][e]),
            "spells",
            _data__WEBPACK_IMPORTED_MODULE_2__["WIDTH"]
        );
        actor.ai.state = "spell_selection";
        return false;
    };
}

function openKeyBindingCommand(actor) {
    return function() {
        Object(_ui__WEBPACK_IMPORTED_MODULE_4__["showKeyBindingMenu"])();
        actor.ai.state = "keybinding";
        return false;
    };
}

/**
 * Controls the player character through user input
 *
 * While it would probably make sense to move input handling code
 * to the Game object since it modifies game state, but putting
 * in an AI component made the code cleaner
 */
class PlayerControlAI {
    constructor() {
        this.owner = null;
        this.keyCommandMap = {};
        this.state = "normal";
    }

    setOwner(owner) {
        this.owner = owner;
        this.keyCommandMap = {
            "w": ["Move Up", moveCommand(this.owner, 0, 8)],
            "e": ["Move Up Right", moveCommand(this.owner, 1, 8)],
            "d": ["Move Right", moveCommand(this.owner, 2, 8)],
            "c": ["Move Down Right", moveCommand(this.owner, 3, 8)],
            "s": ["Move Down", moveCommand(this.owner, 4, 8)],
            "z": ["Move Down Left", moveCommand(this.owner, 5, 8)],
            "a": ["Move Left", moveCommand(this.owner, 6, 8)],
            "q": ["Move Up Left", moveCommand(this.owner, 7, 8)],
            "i": ["Inventory", openInventoryCommand(this.owner)],
            "g": ["Get Item", getItemCommand(this.owner)],
            "m": ["Spells", openSpellsCommand(this.owner)],
            "Escape": ["Key Bindings", openKeyBindingCommand(this.owner)]
        };
    }

    act() {
        _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.engine.lock();
        /* wait for user input; do stuff when user hits a key */
        window.addEventListener("keydown", this);
    }

    handleEvent(e) {
        e.preventDefault();

        if (this.owner.fighter === null || this.owner.fighter.hp <= 0) { return; }

        const key = e.key;

        if (this.state === "normal") {
            /* one of numpad directions? */
            if (!(key in this.keyCommandMap)) {
                return;
            }

            const acted = this.keyCommandMap[key][1]();

            if (!acted) {
                return;
            }
        } else if (this.state === "inventory") {
            const aCode = "a".charCodeAt(0);
            const zCode = "z".charCodeAt(0);
            const keyCode = key.charCodeAt(0);

            if (keyCode < aCode && keyCode > zCode) {
                return;
            }

            if (key === "Escape") {
                this.state = "normal";
                _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.manager.act();
                return;
            }

            const inventoryInputMap = {};
            const inventoryIDs = this.owner.inventoryComponent.getIDsAndCounts();

            for (let i = 0; i < inventoryIDs.length; i++) {
                inventoryInputMap[aCode + i] = inventoryIDs[i].id;
            }

            if (!(keyCode in inventoryInputMap)) {
                return;
            }

            const itemDetails = _data__WEBPACK_IMPORTED_MODULE_2__["ItemData"][inventoryInputMap[keyCode]];
            const useCallback = used => {
                this.owner.ai.state = "normal";
                if (used) {
                    this.owner.inventoryComponent.useItem(inventoryInputMap[keyCode]);
                    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage("Used " + itemDetails.displayName);
                    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.engine.unlock();
                }
            };
            itemDetails.useFunc(itemDetails, this.owner, useCallback.bind(this));
            return;
        } else if (this.state === "spell_selection") {
            const aCode = "a".charCodeAt(0);
            const zCode = "z".charCodeAt(0);
            const keyCode = key.charCodeAt(0);

            if (keyCode < aCode && keyCode > zCode) {
                return;
            }

            if (key === "Escape") {
                this.state = "normal";
                _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.manager.act();
                return;
            }

            const spellInputMap = {};
            const spellIds = this.owner.fighter.getKnownSpells();

            for (let i = 0; i < spellIds.length; i++) {
                spellInputMap[aCode + i] = spellIds[i];
            }

            if (!(keyCode in spellInputMap)) {
                return;
            }

            const details = _data__WEBPACK_IMPORTED_MODULE_2__["SpellData"][spellInputMap[keyCode]];

            if (details.manaCost > this.owner.fighter.mana) {
                _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage(`Not enough mana to cast ${details.name}`);
                return;
            }

            const useCallback = used => {
                this.owner.ai.state = "normal";
                if (used) {
                    this.owner.fighter.useMana(details.manaCost);
                    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.engine.unlock();
                }
            };
            details.useFunc(details, this.owner, useCallback.bind(this));
        } else if (this.state === "keybinding") {
            console.log("fix me");
        }

        window.removeEventListener("keydown", this);
        _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.engine.unlock();
    }
}



/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/*! exports provided: drawUI, showSelectionMenu, showKeyBindingMenu, clearScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawUI", function() { return drawUI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSelectionMenu", function() { return showSelectionMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showKeyBindingMenu", function() { return showKeyBindingMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearScreen", function() { return clearScreen; });
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals */ "./src/globals.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");





function drawUI(display, level, player) {
    for (let i = 0; i < _data__WEBPACK_IMPORTED_MODULE_1__["WIDTH"]; i++) {
        display.draw(i, _data__WEBPACK_IMPORTED_MODULE_1__["HEIGHT"] - _data__WEBPACK_IMPORTED_MODULE_1__["UI_HEIGHT"], _data__WEBPACK_IMPORTED_MODULE_1__["MAP_FILLED_SPACE"], "blue", "blue");
    }

    display.drawText(1,  _data__WEBPACK_IMPORTED_MODULE_1__["HEIGHT"] - _data__WEBPACK_IMPORTED_MODULE_1__["UI_HEIGHT"], "%c{white}%b{blue}HP: " + player.fighter.hp + "/" + player.fighter.maxHp);
    display.drawText(14,  _data__WEBPACK_IMPORTED_MODULE_1__["HEIGHT"] - _data__WEBPACK_IMPORTED_MODULE_1__["UI_HEIGHT"], "%c{white}%b{blue}Mana: " + player.fighter.mana + "/" + player.fighter.maxMana);
    display.drawText(30,  _data__WEBPACK_IMPORTED_MODULE_1__["HEIGHT"] - _data__WEBPACK_IMPORTED_MODULE_1__["UI_HEIGHT"], "%c{white}%b{blue}STR: " + player.fighter.strength);
    display.drawText(38,  _data__WEBPACK_IMPORTED_MODULE_1__["HEIGHT"] - _data__WEBPACK_IMPORTED_MODULE_1__["UI_HEIGHT"], "%c{white}%b{blue}DEF: " + player.fighter.defense);
    display.drawText(46,  _data__WEBPACK_IMPORTED_MODULE_1__["HEIGHT"] - _data__WEBPACK_IMPORTED_MODULE_1__["UI_HEIGHT"], "%c{white}%b{blue}LVL: " + player.fighter.level);
    display.drawText(54,  _data__WEBPACK_IMPORTED_MODULE_1__["HEIGHT"] - _data__WEBPACK_IMPORTED_MODULE_1__["UI_HEIGHT"], "%c{white}%b{blue}EXP: " + player.fighter.experience + "/" + (_data__WEBPACK_IMPORTED_MODULE_1__["LEVEL_UP_BASE"] + player.fighter.level * _data__WEBPACK_IMPORTED_MODULE_1__["LEVEL_UP_FACTOR"]));
}

function showSelectionMenu(header, items, type, width) {
    if (items.length > 26) {
        console.error("too many items");
        return;
    }

    const aCode = "a".charCodeAt(0);

    // add four for header
    const height = items.length + _data__WEBPACK_IMPORTED_MODULE_1__["UI_HEIGHT"];

    // draw background
    for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
            if (w === 0 || h === 0 || w === width - 1 || h === height - 1) {
                _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.display.draw(w, h, "1", "grey", "grey");
            } else {
                _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.display.draw(w, h, "1", "black", "black");
            }
        }
    }

    _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.display.drawText(2, 1, "%c{white}%b{black}" + header);
    for (let i = 0; i < items.length; i++) {
        switch (type) {
        case "inventory":
            _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.display.drawText(
                2, i + 3, `%c{white}%b{black} ${String.fromCharCode(i + aCode)}: ${items[i].name} (${items[i].count})`
            );
            break;
        case "spells":
            _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.display.drawText(
                2, i + 3, `%c{white}%b{black} ${String.fromCharCode(i + aCode)}: ${items[i].name} dmg: ${items[i].value} cost: ${items[i].manaCost}`
            );
            break;
        default:
            throw new Error(`Unknown menu type ${type}`);
        }
    }
}

function showKeyBindingMenu() {
    // add one for header
    const height = 16;
    const width = _data__WEBPACK_IMPORTED_MODULE_1__["WIDTH"];

    // draw background
    for (let w = 0; w < width; w++) {
        for (let h = 0; h < height; h++) {
            if (w === 0 || h === 0 || w === width - 1 || h === height - 1) {
                _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.display.draw(w, h, "1", "grey", "grey");
            } else {
                _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.display.draw(w, h, "1", "black", "black");
            }
        }
    }

    _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.display.drawText(2, 1, "%c{white}%b{black} Keyboard Bindings");
    _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.display.drawText(2, 3, "%c{white}%b{black} Click on an option to change it");

    const commands = Object.keys(_globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.player.keyCommandMap);
    for (let i = 0; i < commands.length; i++) {
        const key = commands[i];
        _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.display.drawText(
            2, i + 5,
            "%c{white}%b{black} " + _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.player.keyCommandMap[key][0] + ": " + key
        );
    }
}

function clearScreen(display) {
    for (let y = 0; y < _data__WEBPACK_IMPORTED_MODULE_1__["HEIGHT"]; y++) {
        for (let x = 0; x < _data__WEBPACK_IMPORTED_MODULE_1__["WIDTH"]; x++) {
            display.draw(x, y, _data__WEBPACK_IMPORTED_MODULE_1__["MAP_EMPTY_SPACE"], "black", "black");
        }
    }
}


/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: randomIntFromInterval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomIntFromInterval", function() { return randomIntFromInterval; });
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9NaW5IZWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2NvbG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9kaXNwbGF5L2JhY2tlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS9kaXNwbGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvaGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvcmVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9kaXNwbGF5L3Rlcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS90aWxlLWdsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvdGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZXZlbnRxdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvZGlzY3JldGUtc2hhZG93Y2FzdGluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvZm92LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Zvdi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvcHJlY2lzZS1zaGFkb3djYXN0aW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Zvdi9yZWN1cnNpdmUtc2hhZG93Y2FzdGluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9saWdodGluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvYXJlbmEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2NlbGx1bGFyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9kaWdnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2RpdmlkZWRtYXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9kdW5nZW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9lbGxlcm1hemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2ZlYXR1cmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9pY2V5bWF6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvcm9ndWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL3VuaWZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbm9pc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbm9pc2Uvbm9pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbm9pc2Uvc2ltcGxleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9wYXRoL2FzdGFyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3BhdGgvZGlqa3N0cmEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcGF0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9wYXRoL3BhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcm5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3NjaGVkdWxlci9hY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3NjaGVkdWxlci9zY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL3NpbXBsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9zY2hlZHVsZXIvc3BlZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc3RyaW5nZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3RleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9haS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWZmZWN0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlnaHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGhpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyYWN0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW52ZW50b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy9pdGVtcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlnaHRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwcy9kZXZfcm9vbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwcy9sZXZlbF8xLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXBzL2xldmVsXzIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFj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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvVUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ087QUFDUDtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSw4QkFBOEI7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvREFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDalJBO0FBQUE7QUFBQTtBQUFpQztBQUNq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O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0RBQU87QUFDdkI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRW1GOzs7Ozs7Ozs7Ozs7O0FDcFRuRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFhOztBQUUyRjtBQUMzRDs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRVA7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFD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eUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7O0FDNVBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxJQUFJLEtBQTBCO0FBQzlCO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7Ozs7QUNyTkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLElBQUksS0FBMEI7QUFDOUI7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7Ozs7QUMzWUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWE7O0FBRWdCOztBQUVHO0FBQ0k7QUFDK0M7QUFDeEM7QUFDNEU7QUFDMUU7QUFDYTtBQUNRO0FBQ3pCOzs7QUFHekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ087QUFDUCxnQkFBZ0IsZ0RBQVUsSUFBSSxvQkFBb0IsR0FBRywwQkFBMEI7O0FBRS9FLGlCQUFpQixnREFBVTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsdURBQWU7QUFDNUM7QUFDQTtBQUNBLDZCQUE2QixrREFBYztBQUMzQztBQUNBO0FBQ0EsNkJBQTZCLHVEQUFtQjtBQUNoRDtBQUNBO0FBQ0EsNkJBQTZCLDJDQUFPO0FBQ3BDO0FBQ0E7QUFDQSw2QkFBNkIsaURBQWE7QUFDMUM7QUFDQTtBQUNBLCtDQUErQyxRQUFRO0FBQ3ZEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsdURBQWE7QUFDaEQ7QUFDQTtBQUNBLG1DQUFtQyx1REFBYTtBQUNoRDtBQUNBO0FBQ0EscURBQXFELGNBQWM7QUFDbkU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw4REFBb0I7QUFDdkQ7QUFDQTtBQUNBLG1DQUFtQyx3REFBYztBQUNqRDtBQUNBO0FBQ0EscURBQXFELGNBQWM7QUFDbkU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxhQUFhO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQyxxREFBWTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGFBQWE7QUFDakU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyx5REFBYztBQUNsRDtBQUNBO0FBQ0Esc0RBQXNELGVBQWU7QUFDckU7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQiwrQkFBK0I7QUFDMUQsb0JBQW9CLDBDQUFHO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG1FQUFxQjtBQUM1RDtBQUNBO0FBQ0EsdUNBQXVDLG1FQUFxQjtBQUM1RDtBQUNBO0FBQ0EsdUNBQXVDLG1FQUFxQjtBQUM1RDtBQUNBO0FBQ0EsdUNBQXVDLDhEQUFnQjtBQUN2RDtBQUNBO0FBQ0EseURBQXlELGtCQUFrQjtBQUMzRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxXQUFXO0FBQ3ZCLFlBQVk7QUFDWjtBQUNBO0FBQ0EsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnREFBTztBQUNmOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFdBQVc7QUFDdkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGdEQUFPO0FBQ2Y7O0FBRUEsSUFBSSxnREFBTztBQUNYOzs7Ozs7Ozs7Ozs7O0FDclFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWE7O0FBRWlCOztBQUVFO0FBQ29CO0FBQ2xCO0FBQzJCOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDJDQUFJO0FBQ3hCO0FBQ0E7QUFDQSx1QkFBdUIsc0RBQVMsQ0FBQyxnREFBTyxXQUFXLGdEQUFPOztBQUUxRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixnREFBTztBQUM3QjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxnREFBTztBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSw2REFBaUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsWUFBWSwyQ0FBSztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLDZEQUFpQjtBQUN6QjtBQUNBLG9EQUFvRCwrQ0FBUztBQUM3RDtBQUNBLFlBQVksMkNBQUs7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSw4REFBa0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsZ0RBQU87QUFDZiwrQkFBK0I7QUFDL0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHdFQUF3RSxRQUFROztBQUVoRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0RBQU87QUFDdkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQix5QkFBeUI7QUFDcEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDLDhDQUFRO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdEQUFPO0FBQzNCLG9CQUFvQixnREFBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0RBQU87QUFDdkI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQixxQkFBcUI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTRCLCtDQUFTOztBQUVyQztBQUNBLGdCQUFnQixnREFBTyxnREFBZ0QsYUFBYTtBQUNwRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdEQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0EsUUFBUSxnREFBTztBQUNmO0FBQ0E7QUFDMkI7Ozs7Ozs7Ozs7Ozs7QUN6TzNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWE7O0FBRW1CO0FBU2hCOztBQUVUO0FBQ1AsbUJBQW1CLEtBQUssMkNBQUssQ0FBQztBQUM5Qix3QkFBd0IsNENBQU0sR0FBRywrQ0FBUyxFQUFFLHNEQUFnQjtBQUM1RDs7QUFFQSx5QkFBeUIsNENBQU0sR0FBRywrQ0FBUyxNQUFNLE1BQU0sR0FBRyxLQUFLO0FBQy9ELDBCQUEwQiw0Q0FBTSxHQUFHLCtDQUFTLE1BQU0sTUFBTSxHQUFHLEtBQUs7QUFDaEUsMEJBQTBCLDRDQUFNLEdBQUcsK0NBQVMsTUFBTSxNQUFNLEdBQUcsS0FBSztBQUNoRSwwQkFBMEIsNENBQU0sR0FBRywrQ0FBUyxNQUFNLE1BQU0sR0FBRyxLQUFLO0FBQ2hFLDBCQUEwQiw0Q0FBTSxHQUFHLCtDQUFTLE1BQU0sTUFBTSxHQUFHLEtBQUs7QUFDaEUsMEJBQTBCLDRDQUFNLEdBQUcsK0NBQVMsTUFBTSxNQUFNLEdBQUcsS0FBSyw0Q0FBNEMsbURBQWEsMEJBQTBCLHFEQUFlO0FBQ2xLOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxrQ0FBa0MsK0NBQVM7O0FBRTNDO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUIsdUJBQXVCLFlBQVk7QUFDbkM7QUFDQSxnQkFBZ0IsZ0RBQU87QUFDdkIsYUFBYTtBQUNiLGdCQUFnQixnREFBTztBQUN2QjtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxnREFBTyxpQ0FBaUMsTUFBTSxHQUFHLE1BQU07QUFDM0QsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0EsWUFBWSxnREFBTztBQUNuQiw4QkFBOEIsTUFBTSxHQUFHLE1BQU0sR0FBRywrQkFBK0IsSUFBSSxjQUFjLElBQUksZUFBZTtBQUNwSDtBQUNBO0FBQ0E7QUFDQSxZQUFZLGdEQUFPO0FBQ25CLDhCQUE4QixNQUFNLEdBQUcsTUFBTSxHQUFHLCtCQUErQixJQUFJLGNBQWMsUUFBUSxlQUFlLFNBQVMsa0JBQWtCO0FBQ25KO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxLQUFLO0FBQ3REO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxrQkFBa0IsMkNBQUs7O0FBRXZCO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUIsdUJBQXVCLFlBQVk7QUFDbkM7QUFDQSxnQkFBZ0IsZ0RBQU87QUFDdkIsYUFBYTtBQUNiLGdCQUFnQixnREFBTztBQUN2QjtBQUNBO0FBQ0E7O0FBRUEsSUFBSSxnREFBTyxpQ0FBaUMsTUFBTSxHQUFHLE1BQU07QUFDM0QsSUFBSSxnREFBTyxpQ0FBaUMsTUFBTSxHQUFHLE1BQU07O0FBRTNELGlDQUFpQyxnREFBTztBQUN4QyxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0EsUUFBUSxnREFBTztBQUNmO0FBQ0EsZ0JBQWdCLE1BQU0sR0FBRyxNQUFNLEtBQUssZ0RBQU87QUFDM0M7QUFDQTtBQUNBOztBQUVPO0FBQ1AsbUJBQW1CLEtBQUssNENBQU0sQ0FBQztBQUMvQix1QkFBdUIsS0FBSywyQ0FBSyxDQUFDO0FBQ2xDLCtCQUErQixxREFBZTtBQUM5QztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0R0E7QUFBQTtBQUFPO0FBQ1A7QUFDQSIsImZpbGUiOiJnYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJleHBvcnQgY2xhc3MgTWluSGVhcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaGVhcCA9IFtdO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IDA7XG4gICAgfVxuICAgIGxlc3NUaGFuKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEua2V5ID09IGIua2V5ID8gYS50aW1lc3RhbXAgPCBiLnRpbWVzdGFtcCA6IGEua2V5IDwgYi5rZXk7XG4gICAgfVxuICAgIHNoaWZ0KHYpIHtcbiAgICAgICAgdGhpcy5oZWFwID0gdGhpcy5oZWFwLm1hcCgoeyBrZXksIHZhbHVlLCB0aW1lc3RhbXAgfSkgPT4gKHsga2V5OiBrZXkgKyB2LCB2YWx1ZSwgdGltZXN0YW1wIH0pKTtcbiAgICB9XG4gICAgbGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWFwLmxlbmd0aDtcbiAgICB9XG4gICAgcHVzaCh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHRoaXMudGltZXN0YW1wICs9IDE7XG4gICAgICAgIGNvbnN0IGxvYyA9IHRoaXMubGVuKCk7XG4gICAgICAgIHRoaXMuaGVhcC5wdXNoKHsgdmFsdWUsIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXAsIGtleSB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVVcChsb2MpO1xuICAgIH1cbiAgICBwb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmxlbigpID09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIGVsZW1lbnQgdG8gcG9wXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRvcCA9IHRoaXMuaGVhcFswXTtcbiAgICAgICAgaWYgKHRoaXMubGVuKCkgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLmhlYXBbMF0gPSB0aGlzLmhlYXAucG9wKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURvd24oMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlYXAucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvcDtcbiAgICB9XG4gICAgZmluZCh2KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW4oKTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodiA9PSB0aGlzLmhlYXBbaV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWFwW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZW1vdmUodikge1xuICAgICAgICBsZXQgaW5kZXggPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuKCk7IGkrKykge1xuICAgICAgICAgICAgaWYgKHYgPT0gdGhpcy5oZWFwW2ldLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sZW4oKSA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYXBbaW5kZXhdID0gdGhpcy5oZWFwLnBvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRG93bihpbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYXAucG9wKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBwYXJlbnROb2RlKHgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKHggLSAxKSAvIDIpO1xuICAgIH1cbiAgICBsZWZ0Q2hpbGROb2RlKHgpIHtcbiAgICAgICAgcmV0dXJuIDIgKiB4ICsgMTtcbiAgICB9XG4gICAgcmlnaHRDaGlsZE5vZGUoeCkge1xuICAgICAgICByZXR1cm4gMiAqIHggKyAyO1xuICAgIH1cbiAgICBleGlzdE5vZGUoeCkge1xuICAgICAgICByZXR1cm4geCA+PSAwICYmIHggPCB0aGlzLmhlYXAubGVuZ3RoO1xuICAgIH1cbiAgICBzd2FwKHgsIHkpIHtcbiAgICAgICAgY29uc3QgdCA9IHRoaXMuaGVhcFt4XTtcbiAgICAgICAgdGhpcy5oZWFwW3hdID0gdGhpcy5oZWFwW3ldO1xuICAgICAgICB0aGlzLmhlYXBbeV0gPSB0O1xuICAgIH1cbiAgICBtaW5Ob2RlKG51bWJlcnMpIHtcbiAgICAgICAgY29uc3QgdmFsaWRudW1iZXJzID0gbnVtYmVycy5maWx0ZXIodGhpcy5leGlzdE5vZGUuYmluZCh0aGlzKSk7XG4gICAgICAgIGxldCBtaW5pbWFsID0gdmFsaWRudW1iZXJzWzBdO1xuICAgICAgICBmb3IgKGNvbnN0IGkgb2YgdmFsaWRudW1iZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sZXNzVGhhbih0aGlzLmhlYXBbaV0sIHRoaXMuaGVhcFttaW5pbWFsXSkpIHtcbiAgICAgICAgICAgICAgICBtaW5pbWFsID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluaW1hbDtcbiAgICB9XG4gICAgdXBkYXRlVXAoeCkge1xuICAgICAgICBpZiAoeCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlKHgpO1xuICAgICAgICBpZiAodGhpcy5leGlzdE5vZGUocGFyZW50KSAmJiB0aGlzLmxlc3NUaGFuKHRoaXMuaGVhcFt4XSwgdGhpcy5oZWFwW3BhcmVudF0pKSB7XG4gICAgICAgICAgICB0aGlzLnN3YXAoeCwgcGFyZW50KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVXAocGFyZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVEb3duKHgpIHtcbiAgICAgICAgY29uc3QgbGVmdENoaWxkID0gdGhpcy5sZWZ0Q2hpbGROb2RlKHgpO1xuICAgICAgICBjb25zdCByaWdodENoaWxkID0gdGhpcy5yaWdodENoaWxkTm9kZSh4KTtcbiAgICAgICAgaWYgKCF0aGlzLmV4aXN0Tm9kZShsZWZ0Q2hpbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbSA9IHRoaXMubWluTm9kZShbeCwgbGVmdENoaWxkLCByaWdodENoaWxkXSk7XG4gICAgICAgIGlmIChtICE9IHgpIHtcbiAgICAgICAgICAgIHRoaXMuc3dhcCh4LCBtKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRG93bihtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZWJ1Z1ByaW50KCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmhlYXApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNsYW1wIH0gZnJvbSBcIi4vdXRpbC5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi9ybmcuanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBmcm9tU3RyaW5nKHN0cikge1xuICAgIGxldCBjYWNoZWQsIHI7XG4gICAgaWYgKHN0ciBpbiBDQUNIRSkge1xuICAgICAgICBjYWNoZWQgPSBDQUNIRVtzdHJdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKHN0ci5jaGFyQXQoMCkgPT0gXCIjXCIpIHsgLy8gaGV4IHJnYlxuICAgICAgICAgICAgbGV0IG1hdGNoZWQgPSBzdHIubWF0Y2goL1swLTlhLWZdL2dpKSB8fCBbXTtcbiAgICAgICAgICAgIGxldCB2YWx1ZXMgPSBtYXRjaGVkLm1hcCgoeCkgPT4gcGFyc2VJbnQoeCwgMTYpKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID09IDMpIHtcbiAgICAgICAgICAgICAgICBjYWNoZWQgPSB2YWx1ZXMubWFwKCh4KSA9PiB4ICogMTcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzW2kgKyAxXSArPSAxNiAqIHZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FjaGVkID0gdmFsdWVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChyID0gc3RyLm1hdGNoKC9yZ2JcXCgoWzAtOSwgXSspXFwpL2kpKSkgeyAvLyBkZWNpbWFsIHJnYlxuICAgICAgICAgICAgY2FjaGVkID0gclsxXS5zcGxpdCgvXFxzKixcXHMqLykubWFwKCh4KSA9PiBwYXJzZUludCh4KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8vIGh0bWwgbmFtZVxuICAgICAgICAgICAgY2FjaGVkID0gWzAsIDAsIDBdO1xuICAgICAgICB9XG4gICAgICAgIENBQ0hFW3N0cl0gPSBjYWNoZWQ7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWQuc2xpY2UoKTtcbn1cbi8qKlxuICogQWRkIHR3byBvciBtb3JlIGNvbG9yc1xuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkKGNvbG9yMSwgLi4uY29sb3JzKSB7XG4gICAgbGV0IHJlc3VsdCA9IGNvbG9yMS5zbGljZSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICByZXN1bHRbaV0gKz0gY29sb3JzW2pdW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEFkZCB0d28gb3IgbW9yZSBjb2xvcnMsIE1PRElGSUVTIEZJUlNUIEFSR1VNRU5UXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRfKGNvbG9yMSwgLi4uY29sb3JzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbG9yMVtpXSArPSBjb2xvcnNbal1baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yMTtcbn1cbi8qKlxuICogTXVsdGlwbHkgKG1peCkgdHdvIG9yIG1vcmUgY29sb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseShjb2xvcjEsIC4uLmNvbG9ycykge1xuICAgIGxldCByZXN1bHQgPSBjb2xvcjEuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldICo9IGNvbG9yc1tqXVtpXSAvIDI1NTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRbaV0gPSBNYXRoLnJvdW5kKHJlc3VsdFtpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIE11bHRpcGx5IChtaXgpIHR3byBvciBtb3JlIGNvbG9ycywgTU9ESUZJRVMgRklSU1QgQVJHVU1FTlRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5Xyhjb2xvcjEsIC4uLmNvbG9ycykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb2xvcjFbaV0gKj0gY29sb3JzW2pdW2ldIC8gMjU1O1xuICAgICAgICB9XG4gICAgICAgIGNvbG9yMVtpXSA9IE1hdGgucm91bmQoY29sb3IxW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yMTtcbn1cbi8qKlxuICogSW50ZXJwb2xhdGUgKGJsZW5kKSB0d28gY29sb3JzIHdpdGggYSBnaXZlbiBmYWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludGVycG9sYXRlKGNvbG9yMSwgY29sb3IyLCBmYWN0b3IgPSAwLjUpIHtcbiAgICBsZXQgcmVzdWx0ID0gY29sb3IxLnNsaWNlKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gTWF0aC5yb3VuZChyZXN1bHRbaV0gKyBmYWN0b3IgKiAoY29sb3IyW2ldIC0gY29sb3IxW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgY29uc3QgbGVycCA9IGludGVycG9sYXRlO1xuLyoqXG4gKiBJbnRlcnBvbGF0ZSAoYmxlbmQpIHR3byBjb2xvcnMgd2l0aCBhIGdpdmVuIGZhY3RvciBpbiBIU0wgbW9kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJwb2xhdGVIU0woY29sb3IxLCBjb2xvcjIsIGZhY3RvciA9IDAuNSkge1xuICAgIGxldCBoc2wxID0gcmdiMmhzbChjb2xvcjEpO1xuICAgIGxldCBoc2wyID0gcmdiMmhzbChjb2xvcjIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGhzbDFbaV0gKz0gZmFjdG9yICogKGhzbDJbaV0gLSBoc2wxW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGhzbDJyZ2IoaHNsMSk7XG59XG5leHBvcnQgY29uc3QgbGVycEhTTCA9IGludGVycG9sYXRlSFNMO1xuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcmFuZG9tIGNvbG9yIGJhc2VkIG9uIHRoaXMgb25lXG4gKiBAcGFyYW0gY29sb3JcbiAqIEBwYXJhbSBkaWZmIFNldCBvZiBzdGFuZGFyZCBkZXZpYXRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21pemUoY29sb3IsIGRpZmYpIHtcbiAgICBpZiAoIShkaWZmIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgIGRpZmYgPSBNYXRoLnJvdW5kKFJORy5nZXROb3JtYWwoMCwgZGlmZikpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gY29sb3Iuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gKz0gKGRpZmYgaW5zdGFuY2VvZiBBcnJheSA/IE1hdGgucm91bmQoUk5HLmdldE5vcm1hbCgwLCBkaWZmW2ldKSkgOiBkaWZmKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHZhbHVlIHRvIEhTTC4gRXhwZWN0cyAwLi4yNTUgaW5wdXRzLCBwcm9kdWNlcyAwLi4xIG91dHB1dHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2IyaHNsKGNvbG9yKSB7XG4gICAgbGV0IHIgPSBjb2xvclswXSAvIDI1NTtcbiAgICBsZXQgZyA9IGNvbG9yWzFdIC8gMjU1O1xuICAgIGxldCBiID0gY29sb3JbMl0gLyAyNTU7XG4gICAgbGV0IG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBsZXQgaCA9IDAsIHMsIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgICAgcyA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxldCBkID0gbWF4IC0gbWluO1xuICAgICAgICBzID0gKGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pKTtcbiAgICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgICAgIGNhc2UgcjpcbiAgICAgICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGc6XG4gICAgICAgICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYjpcbiAgICAgICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGggLz0gNjtcbiAgICB9XG4gICAgcmV0dXJuIFtoLCBzLCBsXTtcbn1cbmZ1bmN0aW9uIGh1ZTJyZ2IocCwgcSwgdCkge1xuICAgIGlmICh0IDwgMClcbiAgICAgICAgdCArPSAxO1xuICAgIGlmICh0ID4gMSlcbiAgICAgICAgdCAtPSAxO1xuICAgIGlmICh0IDwgMSAvIDYpXG4gICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0O1xuICAgIGlmICh0IDwgMSAvIDIpXG4gICAgICAgIHJldHVybiBxO1xuICAgIGlmICh0IDwgMiAvIDMpXG4gICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNjtcbiAgICByZXR1cm4gcDtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi4gRXhwZWN0cyAwLi4xIGlucHV0cywgcHJvZHVjZXMgMC4uMjU1IG91dHB1dHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoc2wycmdiKGNvbG9yKSB7XG4gICAgbGV0IGwgPSBjb2xvclsyXTtcbiAgICBpZiAoY29sb3JbMV0gPT0gMCkge1xuICAgICAgICBsID0gTWF0aC5yb3VuZChsICogMjU1KTtcbiAgICAgICAgcmV0dXJuIFtsLCBsLCBsXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxldCBzID0gY29sb3JbMV07XG4gICAgICAgIGxldCBxID0gKGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHMpO1xuICAgICAgICBsZXQgcCA9IDIgKiBsIC0gcTtcbiAgICAgICAgbGV0IHIgPSBodWUycmdiKHAsIHEsIGNvbG9yWzBdICsgMSAvIDMpO1xuICAgICAgICBsZXQgZyA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0pO1xuICAgICAgICBsZXQgYiA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0gLSAxIC8gMyk7XG4gICAgICAgIHJldHVybiBbTWF0aC5yb3VuZChyICogMjU1KSwgTWF0aC5yb3VuZChnICogMjU1KSwgTWF0aC5yb3VuZChiICogMjU1KV07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRvUkdCKGNvbG9yKSB7XG4gICAgbGV0IGNsYW1wZWQgPSBjb2xvci5tYXAoeCA9PiBjbGFtcCh4LCAwLCAyNTUpKTtcbiAgICByZXR1cm4gYHJnYigke2NsYW1wZWQuam9pbihcIixcIil9KWA7XG59XG5leHBvcnQgZnVuY3Rpb24gdG9IZXgoY29sb3IpIHtcbiAgICBsZXQgY2xhbXBlZCA9IGNvbG9yLm1hcCh4ID0+IGNsYW1wKHgsIDAsIDI1NSkudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSk7XG4gICAgcmV0dXJuIGAjJHtjbGFtcGVkLmpvaW4oXCJcIil9YDtcbn1cbmNvbnN0IENBQ0hFID0ge1xuICAgIFwiYmxhY2tcIjogWzAsIDAsIDBdLFxuICAgIFwibmF2eVwiOiBbMCwgMCwgMTI4XSxcbiAgICBcImRhcmtibHVlXCI6IFswLCAwLCAxMzldLFxuICAgIFwibWVkaXVtYmx1ZVwiOiBbMCwgMCwgMjA1XSxcbiAgICBcImJsdWVcIjogWzAsIDAsIDI1NV0sXG4gICAgXCJkYXJrZ3JlZW5cIjogWzAsIDEwMCwgMF0sXG4gICAgXCJncmVlblwiOiBbMCwgMTI4LCAwXSxcbiAgICBcInRlYWxcIjogWzAsIDEyOCwgMTI4XSxcbiAgICBcImRhcmtjeWFuXCI6IFswLCAxMzksIDEzOV0sXG4gICAgXCJkZWVwc2t5Ymx1ZVwiOiBbMCwgMTkxLCAyNTVdLFxuICAgIFwiZGFya3R1cnF1b2lzZVwiOiBbMCwgMjA2LCAyMDldLFxuICAgIFwibWVkaXVtc3ByaW5nZ3JlZW5cIjogWzAsIDI1MCwgMTU0XSxcbiAgICBcImxpbWVcIjogWzAsIDI1NSwgMF0sXG4gICAgXCJzcHJpbmdncmVlblwiOiBbMCwgMjU1LCAxMjddLFxuICAgIFwiYXF1YVwiOiBbMCwgMjU1LCAyNTVdLFxuICAgIFwiY3lhblwiOiBbMCwgMjU1LCAyNTVdLFxuICAgIFwibWlkbmlnaHRibHVlXCI6IFsyNSwgMjUsIDExMl0sXG4gICAgXCJkb2RnZXJibHVlXCI6IFszMCwgMTQ0LCAyNTVdLFxuICAgIFwiZm9yZXN0Z3JlZW5cIjogWzM0LCAxMzksIDM0XSxcbiAgICBcInNlYWdyZWVuXCI6IFs0NiwgMTM5LCA4N10sXG4gICAgXCJkYXJrc2xhdGVncmF5XCI6IFs0NywgNzksIDc5XSxcbiAgICBcImRhcmtzbGF0ZWdyZXlcIjogWzQ3LCA3OSwgNzldLFxuICAgIFwibGltZWdyZWVuXCI6IFs1MCwgMjA1LCA1MF0sXG4gICAgXCJtZWRpdW1zZWFncmVlblwiOiBbNjAsIDE3OSwgMTEzXSxcbiAgICBcInR1cnF1b2lzZVwiOiBbNjQsIDIyNCwgMjA4XSxcbiAgICBcInJveWFsYmx1ZVwiOiBbNjUsIDEwNSwgMjI1XSxcbiAgICBcInN0ZWVsYmx1ZVwiOiBbNzAsIDEzMCwgMTgwXSxcbiAgICBcImRhcmtzbGF0ZWJsdWVcIjogWzcyLCA2MSwgMTM5XSxcbiAgICBcIm1lZGl1bXR1cnF1b2lzZVwiOiBbNzIsIDIwOSwgMjA0XSxcbiAgICBcImluZGlnb1wiOiBbNzUsIDAsIDEzMF0sXG4gICAgXCJkYXJrb2xpdmVncmVlblwiOiBbODUsIDEwNywgNDddLFxuICAgIFwiY2FkZXRibHVlXCI6IFs5NSwgMTU4LCAxNjBdLFxuICAgIFwiY29ybmZsb3dlcmJsdWVcIjogWzEwMCwgMTQ5LCAyMzddLFxuICAgIFwibWVkaXVtYXF1YW1hcmluZVwiOiBbMTAyLCAyMDUsIDE3MF0sXG4gICAgXCJkaW1ncmF5XCI6IFsxMDUsIDEwNSwgMTA1XSxcbiAgICBcImRpbWdyZXlcIjogWzEwNSwgMTA1LCAxMDVdLFxuICAgIFwic2xhdGVibHVlXCI6IFsxMDYsIDkwLCAyMDVdLFxuICAgIFwib2xpdmVkcmFiXCI6IFsxMDcsIDE0MiwgMzVdLFxuICAgIFwic2xhdGVncmF5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcbiAgICBcInNsYXRlZ3JleVwiOiBbMTEyLCAxMjgsIDE0NF0sXG4gICAgXCJsaWdodHNsYXRlZ3JheVwiOiBbMTE5LCAxMzYsIDE1M10sXG4gICAgXCJsaWdodHNsYXRlZ3JleVwiOiBbMTE5LCAxMzYsIDE1M10sXG4gICAgXCJtZWRpdW1zbGF0ZWJsdWVcIjogWzEyMywgMTA0LCAyMzhdLFxuICAgIFwibGF3bmdyZWVuXCI6IFsxMjQsIDI1MiwgMF0sXG4gICAgXCJjaGFydHJldXNlXCI6IFsxMjcsIDI1NSwgMF0sXG4gICAgXCJhcXVhbWFyaW5lXCI6IFsxMjcsIDI1NSwgMjEyXSxcbiAgICBcIm1hcm9vblwiOiBbMTI4LCAwLCAwXSxcbiAgICBcInB1cnBsZVwiOiBbMTI4LCAwLCAxMjhdLFxuICAgIFwib2xpdmVcIjogWzEyOCwgMTI4LCAwXSxcbiAgICBcImdyYXlcIjogWzEyOCwgMTI4LCAxMjhdLFxuICAgIFwiZ3JleVwiOiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgXCJza3libHVlXCI6IFsxMzUsIDIwNiwgMjM1XSxcbiAgICBcImxpZ2h0c2t5Ymx1ZVwiOiBbMTM1LCAyMDYsIDI1MF0sXG4gICAgXCJibHVldmlvbGV0XCI6IFsxMzgsIDQzLCAyMjZdLFxuICAgIFwiZGFya3JlZFwiOiBbMTM5LCAwLCAwXSxcbiAgICBcImRhcmttYWdlbnRhXCI6IFsxMzksIDAsIDEzOV0sXG4gICAgXCJzYWRkbGVicm93blwiOiBbMTM5LCA2OSwgMTldLFxuICAgIFwiZGFya3NlYWdyZWVuXCI6IFsxNDMsIDE4OCwgMTQzXSxcbiAgICBcImxpZ2h0Z3JlZW5cIjogWzE0NCwgMjM4LCAxNDRdLFxuICAgIFwibWVkaXVtcHVycGxlXCI6IFsxNDcsIDExMiwgMjE2XSxcbiAgICBcImRhcmt2aW9sZXRcIjogWzE0OCwgMCwgMjExXSxcbiAgICBcInBhbGVncmVlblwiOiBbMTUyLCAyNTEsIDE1Ml0sXG4gICAgXCJkYXJrb3JjaGlkXCI6IFsxNTMsIDUwLCAyMDRdLFxuICAgIFwieWVsbG93Z3JlZW5cIjogWzE1NCwgMjA1LCA1MF0sXG4gICAgXCJzaWVubmFcIjogWzE2MCwgODIsIDQ1XSxcbiAgICBcImJyb3duXCI6IFsxNjUsIDQyLCA0Ml0sXG4gICAgXCJkYXJrZ3JheVwiOiBbMTY5LCAxNjksIDE2OV0sXG4gICAgXCJkYXJrZ3JleVwiOiBbMTY5LCAxNjksIDE2OV0sXG4gICAgXCJsaWdodGJsdWVcIjogWzE3MywgMjE2LCAyMzBdLFxuICAgIFwiZ3JlZW55ZWxsb3dcIjogWzE3MywgMjU1LCA0N10sXG4gICAgXCJwYWxldHVycXVvaXNlXCI6IFsxNzUsIDIzOCwgMjM4XSxcbiAgICBcImxpZ2h0c3RlZWxibHVlXCI6IFsxNzYsIDE5NiwgMjIyXSxcbiAgICBcInBvd2RlcmJsdWVcIjogWzE3NiwgMjI0LCAyMzBdLFxuICAgIFwiZmlyZWJyaWNrXCI6IFsxNzgsIDM0LCAzNF0sXG4gICAgXCJkYXJrZ29sZGVucm9kXCI6IFsxODQsIDEzNCwgMTFdLFxuICAgIFwibWVkaXVtb3JjaGlkXCI6IFsxODYsIDg1LCAyMTFdLFxuICAgIFwicm9zeWJyb3duXCI6IFsxODgsIDE0MywgMTQzXSxcbiAgICBcImRhcmtraGFraVwiOiBbMTg5LCAxODMsIDEwN10sXG4gICAgXCJzaWx2ZXJcIjogWzE5MiwgMTkyLCAxOTJdLFxuICAgIFwibWVkaXVtdmlvbGV0cmVkXCI6IFsxOTksIDIxLCAxMzNdLFxuICAgIFwiaW5kaWFucmVkXCI6IFsyMDUsIDkyLCA5Ml0sXG4gICAgXCJwZXJ1XCI6IFsyMDUsIDEzMywgNjNdLFxuICAgIFwiY2hvY29sYXRlXCI6IFsyMTAsIDEwNSwgMzBdLFxuICAgIFwidGFuXCI6IFsyMTAsIDE4MCwgMTQwXSxcbiAgICBcImxpZ2h0Z3JheVwiOiBbMjExLCAyMTEsIDIxMV0sXG4gICAgXCJsaWdodGdyZXlcIjogWzIxMSwgMjExLCAyMTFdLFxuICAgIFwicGFsZXZpb2xldHJlZFwiOiBbMjE2LCAxMTIsIDE0N10sXG4gICAgXCJ0aGlzdGxlXCI6IFsyMTYsIDE5MSwgMjE2XSxcbiAgICBcIm9yY2hpZFwiOiBbMjE4LCAxMTIsIDIxNF0sXG4gICAgXCJnb2xkZW5yb2RcIjogWzIxOCwgMTY1LCAzMl0sXG4gICAgXCJjcmltc29uXCI6IFsyMjAsIDIwLCA2MF0sXG4gICAgXCJnYWluc2Jvcm9cIjogWzIyMCwgMjIwLCAyMjBdLFxuICAgIFwicGx1bVwiOiBbMjIxLCAxNjAsIDIyMV0sXG4gICAgXCJidXJseXdvb2RcIjogWzIyMiwgMTg0LCAxMzVdLFxuICAgIFwibGlnaHRjeWFuXCI6IFsyMjQsIDI1NSwgMjU1XSxcbiAgICBcImxhdmVuZGVyXCI6IFsyMzAsIDIzMCwgMjUwXSxcbiAgICBcImRhcmtzYWxtb25cIjogWzIzMywgMTUwLCAxMjJdLFxuICAgIFwidmlvbGV0XCI6IFsyMzgsIDEzMCwgMjM4XSxcbiAgICBcInBhbGVnb2xkZW5yb2RcIjogWzIzOCwgMjMyLCAxNzBdLFxuICAgIFwibGlnaHRjb3JhbFwiOiBbMjQwLCAxMjgsIDEyOF0sXG4gICAgXCJraGFraVwiOiBbMjQwLCAyMzAsIDE0MF0sXG4gICAgXCJhbGljZWJsdWVcIjogWzI0MCwgMjQ4LCAyNTVdLFxuICAgIFwiaG9uZXlkZXdcIjogWzI0MCwgMjU1LCAyNDBdLFxuICAgIFwiYXp1cmVcIjogWzI0MCwgMjU1LCAyNTVdLFxuICAgIFwic2FuZHlicm93blwiOiBbMjQ0LCAxNjQsIDk2XSxcbiAgICBcIndoZWF0XCI6IFsyNDUsIDIyMiwgMTc5XSxcbiAgICBcImJlaWdlXCI6IFsyNDUsIDI0NSwgMjIwXSxcbiAgICBcIndoaXRlc21va2VcIjogWzI0NSwgMjQ1LCAyNDVdLFxuICAgIFwibWludGNyZWFtXCI6IFsyNDUsIDI1NSwgMjUwXSxcbiAgICBcImdob3N0d2hpdGVcIjogWzI0OCwgMjQ4LCAyNTVdLFxuICAgIFwic2FsbW9uXCI6IFsyNTAsIDEyOCwgMTE0XSxcbiAgICBcImFudGlxdWV3aGl0ZVwiOiBbMjUwLCAyMzUsIDIxNV0sXG4gICAgXCJsaW5lblwiOiBbMjUwLCAyNDAsIDIzMF0sXG4gICAgXCJsaWdodGdvbGRlbnJvZHllbGxvd1wiOiBbMjUwLCAyNTAsIDIxMF0sXG4gICAgXCJvbGRsYWNlXCI6IFsyNTMsIDI0NSwgMjMwXSxcbiAgICBcInJlZFwiOiBbMjU1LCAwLCAwXSxcbiAgICBcImZ1Y2hzaWFcIjogWzI1NSwgMCwgMjU1XSxcbiAgICBcIm1hZ2VudGFcIjogWzI1NSwgMCwgMjU1XSxcbiAgICBcImRlZXBwaW5rXCI6IFsyNTUsIDIwLCAxNDddLFxuICAgIFwib3JhbmdlcmVkXCI6IFsyNTUsIDY5LCAwXSxcbiAgICBcInRvbWF0b1wiOiBbMjU1LCA5OSwgNzFdLFxuICAgIFwiaG90cGlua1wiOiBbMjU1LCAxMDUsIDE4MF0sXG4gICAgXCJjb3JhbFwiOiBbMjU1LCAxMjcsIDgwXSxcbiAgICBcImRhcmtvcmFuZ2VcIjogWzI1NSwgMTQwLCAwXSxcbiAgICBcImxpZ2h0c2FsbW9uXCI6IFsyNTUsIDE2MCwgMTIyXSxcbiAgICBcIm9yYW5nZVwiOiBbMjU1LCAxNjUsIDBdLFxuICAgIFwibGlnaHRwaW5rXCI6IFsyNTUsIDE4MiwgMTkzXSxcbiAgICBcInBpbmtcIjogWzI1NSwgMTkyLCAyMDNdLFxuICAgIFwiZ29sZFwiOiBbMjU1LCAyMTUsIDBdLFxuICAgIFwicGVhY2hwdWZmXCI6IFsyNTUsIDIxOCwgMTg1XSxcbiAgICBcIm5hdmFqb3doaXRlXCI6IFsyNTUsIDIyMiwgMTczXSxcbiAgICBcIm1vY2Nhc2luXCI6IFsyNTUsIDIyOCwgMTgxXSxcbiAgICBcImJpc3F1ZVwiOiBbMjU1LCAyMjgsIDE5Nl0sXG4gICAgXCJtaXN0eXJvc2VcIjogWzI1NSwgMjI4LCAyMjVdLFxuICAgIFwiYmxhbmNoZWRhbG1vbmRcIjogWzI1NSwgMjM1LCAyMDVdLFxuICAgIFwicGFwYXlhd2hpcFwiOiBbMjU1LCAyMzksIDIxM10sXG4gICAgXCJsYXZlbmRlcmJsdXNoXCI6IFsyNTUsIDI0MCwgMjQ1XSxcbiAgICBcInNlYXNoZWxsXCI6IFsyNTUsIDI0NSwgMjM4XSxcbiAgICBcImNvcm5zaWxrXCI6IFsyNTUsIDI0OCwgMjIwXSxcbiAgICBcImxlbW9uY2hpZmZvblwiOiBbMjU1LCAyNTAsIDIwNV0sXG4gICAgXCJmbG9yYWx3aGl0ZVwiOiBbMjU1LCAyNTAsIDI0MF0sXG4gICAgXCJzbm93XCI6IFsyNTUsIDI1MCwgMjUwXSxcbiAgICBcInllbGxvd1wiOiBbMjU1LCAyNTUsIDBdLFxuICAgIFwibGlnaHR5ZWxsb3dcIjogWzI1NSwgMjU1LCAyMjRdLFxuICAgIFwiaXZvcnlcIjogWzI1NSwgMjU1LCAyNDBdLFxuICAgIFwid2hpdGVcIjogWzI1NSwgMjU1LCAyNTVdXG59O1xuIiwiLyoqIERlZmF1bHQgd2l0aCBmb3IgZGlzcGxheSBhbmQgbWFwIGdlbmVyYXRvcnMgKi9cbmV4cG9ydCBsZXQgREVGQVVMVF9XSURUSCA9IDgwO1xuLyoqIERlZmF1bHQgaGVpZ2h0IGZvciBkaXNwbGF5IGFuZCBtYXAgZ2VuZXJhdG9ycyAqL1xuZXhwb3J0IGxldCBERUZBVUxUX0hFSUdIVCA9IDI1O1xuZXhwb3J0IGNvbnN0IERJUlMgPSB7XG4gICAgNDogW1swLCAtMV0sIFsxLCAwXSwgWzAsIDFdLCBbLTEsIDBdXSxcbiAgICA4OiBbWzAsIC0xXSwgWzEsIC0xXSwgWzEsIDBdLCBbMSwgMV0sIFswLCAxXSwgWy0xLCAxXSwgWy0xLCAwXSwgWy0xLCAtMV1dLFxuICAgIDY6IFtbLTEsIC0xXSwgWzEsIC0xXSwgWzIsIDBdLCBbMSwgMV0sIFstMSwgMV0sIFstMiwgMF1dXG59O1xuZXhwb3J0IGNvbnN0IEtFWVMgPSB7XG4gICAgLyoqIENhbmNlbCBrZXkuICovXG4gICAgVktfQ0FOQ0VMOiAzLFxuICAgIC8qKiBIZWxwIGtleS4gKi9cbiAgICBWS19IRUxQOiA2LFxuICAgIC8qKiBCYWNrc3BhY2Uga2V5LiAqL1xuICAgIFZLX0JBQ0tfU1BBQ0U6IDgsXG4gICAgLyoqIFRhYiBrZXkuICovXG4gICAgVktfVEFCOiA5LFxuICAgIC8qKiA1IGtleSBvbiBOdW1wYWQgd2hlbiBOdW1Mb2NrIGlzIHVubG9ja2VkLiBPciBvbiBNYWMsIGNsZWFyIGtleSB3aGljaCBpcyBwb3NpdGlvbmVkIGF0IE51bUxvY2sga2V5LiAqL1xuICAgIFZLX0NMRUFSOiAxMixcbiAgICAvKiogUmV0dXJuL2VudGVyIGtleSBvbiB0aGUgbWFpbiBrZXlib2FyZC4gKi9cbiAgICBWS19SRVRVUk46IDEzLFxuICAgIC8qKiBSZXNlcnZlZCwgYnV0IG5vdCB1c2VkLiAqL1xuICAgIFZLX0VOVEVSOiAxNCxcbiAgICAvKiogU2hpZnQga2V5LiAqL1xuICAgIFZLX1NISUZUOiAxNixcbiAgICAvKiogQ29udHJvbCBrZXkuICovXG4gICAgVktfQ09OVFJPTDogMTcsXG4gICAgLyoqIEFsdCAoT3B0aW9uIG9uIE1hYykga2V5LiAqL1xuICAgIFZLX0FMVDogMTgsXG4gICAgLyoqIFBhdXNlIGtleS4gKi9cbiAgICBWS19QQVVTRTogMTksXG4gICAgLyoqIENhcHMgbG9jay4gKi9cbiAgICBWS19DQVBTX0xPQ0s6IDIwLFxuICAgIC8qKiBFc2NhcGUga2V5LiAqL1xuICAgIFZLX0VTQ0FQRTogMjcsXG4gICAgLyoqIFNwYWNlIGJhci4gKi9cbiAgICBWS19TUEFDRTogMzIsXG4gICAgLyoqIFBhZ2UgVXAga2V5LiAqL1xuICAgIFZLX1BBR0VfVVA6IDMzLFxuICAgIC8qKiBQYWdlIERvd24ga2V5LiAqL1xuICAgIFZLX1BBR0VfRE9XTjogMzQsXG4gICAgLyoqIEVuZCBrZXkuICovXG4gICAgVktfRU5EOiAzNSxcbiAgICAvKiogSG9tZSBrZXkuICovXG4gICAgVktfSE9NRTogMzYsXG4gICAgLyoqIExlZnQgYXJyb3cuICovXG4gICAgVktfTEVGVDogMzcsXG4gICAgLyoqIFVwIGFycm93LiAqL1xuICAgIFZLX1VQOiAzOCxcbiAgICAvKiogUmlnaHQgYXJyb3cuICovXG4gICAgVktfUklHSFQ6IDM5LFxuICAgIC8qKiBEb3duIGFycm93LiAqL1xuICAgIFZLX0RPV046IDQwLFxuICAgIC8qKiBQcmludCBTY3JlZW4ga2V5LiAqL1xuICAgIFZLX1BSSU5UU0NSRUVOOiA0NCxcbiAgICAvKiogSW5zKGVydCkga2V5LiAqL1xuICAgIFZLX0lOU0VSVDogNDUsXG4gICAgLyoqIERlbChldGUpIGtleS4gKi9cbiAgICBWS19ERUxFVEU6IDQ2LFxuICAgIC8qKiovXG4gICAgVktfMDogNDgsXG4gICAgLyoqKi9cbiAgICBWS18xOiA0OSxcbiAgICAvKioqL1xuICAgIFZLXzI6IDUwLFxuICAgIC8qKiovXG4gICAgVktfMzogNTEsXG4gICAgLyoqKi9cbiAgICBWS180OiA1MixcbiAgICAvKioqL1xuICAgIFZLXzU6IDUzLFxuICAgIC8qKiovXG4gICAgVktfNjogNTQsXG4gICAgLyoqKi9cbiAgICBWS183OiA1NSxcbiAgICAvKioqL1xuICAgIFZLXzg6IDU2LFxuICAgIC8qKiovXG4gICAgVktfOTogNTcsXG4gICAgLyoqIENvbG9uICg6KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19DT0xPTjogNTgsXG4gICAgLyoqIFNlbWljb2xvbiAoOykga2V5LiAqL1xuICAgIFZLX1NFTUlDT0xPTjogNTksXG4gICAgLyoqIExlc3MtdGhhbiAoPCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfTEVTU19USEFOOiA2MCxcbiAgICAvKiogRXF1YWxzICg9KSBrZXkuICovXG4gICAgVktfRVFVQUxTOiA2MSxcbiAgICAvKiogR3JlYXRlci10aGFuICg+KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19HUkVBVEVSX1RIQU46IDYyLFxuICAgIC8qKiBRdWVzdGlvbiBtYXJrICg/KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19RVUVTVElPTl9NQVJLOiA2MyxcbiAgICAvKiogQXRtYXJrIChAKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19BVDogNjQsXG4gICAgLyoqKi9cbiAgICBWS19BOiA2NSxcbiAgICAvKioqL1xuICAgIFZLX0I6IDY2LFxuICAgIC8qKiovXG4gICAgVktfQzogNjcsXG4gICAgLyoqKi9cbiAgICBWS19EOiA2OCxcbiAgICAvKioqL1xuICAgIFZLX0U6IDY5LFxuICAgIC8qKiovXG4gICAgVktfRjogNzAsXG4gICAgLyoqKi9cbiAgICBWS19HOiA3MSxcbiAgICAvKioqL1xuICAgIFZLX0g6IDcyLFxuICAgIC8qKiovXG4gICAgVktfSTogNzMsXG4gICAgLyoqKi9cbiAgICBWS19KOiA3NCxcbiAgICAvKioqL1xuICAgIFZLX0s6IDc1LFxuICAgIC8qKiovXG4gICAgVktfTDogNzYsXG4gICAgLyoqKi9cbiAgICBWS19NOiA3NyxcbiAgICAvKioqL1xuICAgIFZLX046IDc4LFxuICAgIC8qKiovXG4gICAgVktfTzogNzksXG4gICAgLyoqKi9cbiAgICBWS19QOiA4MCxcbiAgICAvKioqL1xuICAgIFZLX1E6IDgxLFxuICAgIC8qKiovXG4gICAgVktfUjogODIsXG4gICAgLyoqKi9cbiAgICBWS19TOiA4MyxcbiAgICAvKioqL1xuICAgIFZLX1Q6IDg0LFxuICAgIC8qKiovXG4gICAgVktfVTogODUsXG4gICAgLyoqKi9cbiAgICBWS19WOiA4NixcbiAgICAvKioqL1xuICAgIFZLX1c6IDg3LFxuICAgIC8qKiovXG4gICAgVktfWDogODgsXG4gICAgLyoqKi9cbiAgICBWS19ZOiA4OSxcbiAgICAvKioqL1xuICAgIFZLX1o6IDkwLFxuICAgIC8qKiovXG4gICAgVktfQ09OVEVYVF9NRU5VOiA5MyxcbiAgICAvKiogMCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEMDogOTYsXG4gICAgLyoqIDEgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDE6IDk3LFxuICAgIC8qKiAyIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQyOiA5OCxcbiAgICAvKiogMyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEMzogOTksXG4gICAgLyoqIDQgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDQ6IDEwMCxcbiAgICAvKiogNSBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFENTogMTAxLFxuICAgIC8qKiA2IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ2OiAxMDIsXG4gICAgLyoqIDcgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDc6IDEwMyxcbiAgICAvKiogOCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEODogMTA0LFxuICAgIC8qKiA5IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ5OiAxMDUsXG4gICAgLyoqICogb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX01VTFRJUExZOiAxMDYsXG4gICAgLyoqICsgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX0FERDogMTA3LFxuICAgIC8qKiovXG4gICAgVktfU0VQQVJBVE9SOiAxMDgsXG4gICAgLyoqIC0gb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX1NVQlRSQUNUOiAxMDksXG4gICAgLyoqIERlY2ltYWwgcG9pbnQgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX0RFQ0lNQUw6IDExMCxcbiAgICAvKiogLyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfRElWSURFOiAxMTEsXG4gICAgLyoqIEYxIGtleS4gKi9cbiAgICBWS19GMTogMTEyLFxuICAgIC8qKiBGMiBrZXkuICovXG4gICAgVktfRjI6IDExMyxcbiAgICAvKiogRjMga2V5LiAqL1xuICAgIFZLX0YzOiAxMTQsXG4gICAgLyoqIEY0IGtleS4gKi9cbiAgICBWS19GNDogMTE1LFxuICAgIC8qKiBGNSBrZXkuICovXG4gICAgVktfRjU6IDExNixcbiAgICAvKiogRjYga2V5LiAqL1xuICAgIFZLX0Y2OiAxMTcsXG4gICAgLyoqIEY3IGtleS4gKi9cbiAgICBWS19GNzogMTE4LFxuICAgIC8qKiBGOCBrZXkuICovXG4gICAgVktfRjg6IDExOSxcbiAgICAvKiogRjkga2V5LiAqL1xuICAgIFZLX0Y5OiAxMjAsXG4gICAgLyoqIEYxMCBrZXkuICovXG4gICAgVktfRjEwOiAxMjEsXG4gICAgLyoqIEYxMSBrZXkuICovXG4gICAgVktfRjExOiAxMjIsXG4gICAgLyoqIEYxMiBrZXkuICovXG4gICAgVktfRjEyOiAxMjMsXG4gICAgLyoqIEYxMyBrZXkuICovXG4gICAgVktfRjEzOiAxMjQsXG4gICAgLyoqIEYxNCBrZXkuICovXG4gICAgVktfRjE0OiAxMjUsXG4gICAgLyoqIEYxNSBrZXkuICovXG4gICAgVktfRjE1OiAxMjYsXG4gICAgLyoqIEYxNiBrZXkuICovXG4gICAgVktfRjE2OiAxMjcsXG4gICAgLyoqIEYxNyBrZXkuICovXG4gICAgVktfRjE3OiAxMjgsXG4gICAgLyoqIEYxOCBrZXkuICovXG4gICAgVktfRjE4OiAxMjksXG4gICAgLyoqIEYxOSBrZXkuICovXG4gICAgVktfRjE5OiAxMzAsXG4gICAgLyoqIEYyMCBrZXkuICovXG4gICAgVktfRjIwOiAxMzEsXG4gICAgLyoqIEYyMSBrZXkuICovXG4gICAgVktfRjIxOiAxMzIsXG4gICAgLyoqIEYyMiBrZXkuICovXG4gICAgVktfRjIyOiAxMzMsXG4gICAgLyoqIEYyMyBrZXkuICovXG4gICAgVktfRjIzOiAxMzQsXG4gICAgLyoqIEYyNCBrZXkuICovXG4gICAgVktfRjI0OiAxMzUsXG4gICAgLyoqIE51bSBMb2NrIGtleS4gKi9cbiAgICBWS19OVU1fTE9DSzogMTQ0LFxuICAgIC8qKiBTY3JvbGwgTG9jayBrZXkuICovXG4gICAgVktfU0NST0xMX0xPQ0s6IDE0NSxcbiAgICAvKiogQ2lyY3VtZmxleCAoXikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQ0lSQ1VNRkxFWDogMTYwLFxuICAgIC8qKiBFeGNsYW1hdGlvbiAoISkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfRVhDTEFNQVRJT046IDE2MSxcbiAgICAvKiogRG91YmxlIHF1b3RlICgpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0RPVUJMRV9RVU9URTogMTYyLFxuICAgIC8qKiBIYXNoICgjKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19IQVNIOiAxNjMsXG4gICAgLyoqIERvbGxhciBzaWduICgkKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19ET0xMQVI6IDE2NCxcbiAgICAvKiogUGVyY2VudCAoJSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfUEVSQ0VOVDogMTY1LFxuICAgIC8qKiBBbXBlcnNhbmQgKCYpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FNUEVSU0FORDogMTY2LFxuICAgIC8qKiBVbmRlcnNjb3JlIChfKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19VTkRFUlNDT1JFOiAxNjcsXG4gICAgLyoqIE9wZW4gcGFyZW50aGVzaXMgKCgpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX09QRU5fUEFSRU46IDE2OCxcbiAgICAvKiogQ2xvc2UgcGFyZW50aGVzaXMgKCkpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0NMT1NFX1BBUkVOOiAxNjksXG4gICAgLyogQXN0ZXJpc2sgKCopIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FTVEVSSVNLOiAxNzAsXG4gICAgLyoqIFBsdXMgKCspIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1BMVVM6IDE3MSxcbiAgICAvKiogUGlwZSAofCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfUElQRTogMTcyLFxuICAgIC8qKiBIeXBoZW4tVVMvZG9jcy9NaW51cyAoLSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfSFlQSEVOX01JTlVTOiAxNzMsXG4gICAgLyoqIE9wZW4gY3VybHkgYnJhY2tldCAoeykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfT1BFTl9DVVJMWV9CUkFDS0VUOiAxNzQsXG4gICAgLyoqIENsb3NlIGN1cmx5IGJyYWNrZXQgKH0pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0NMT1NFX0NVUkxZX0JSQUNLRVQ6IDE3NSxcbiAgICAvKiogVGlsZGUgKH4pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1RJTERFOiAxNzYsXG4gICAgLyoqIENvbW1hICgsKSBrZXkuICovXG4gICAgVktfQ09NTUE6IDE4OCxcbiAgICAvKiogUGVyaW9kICguKSBrZXkuICovXG4gICAgVktfUEVSSU9EOiAxOTAsXG4gICAgLyoqIFNsYXNoICgvKSBrZXkuICovXG4gICAgVktfU0xBU0g6IDE5MSxcbiAgICAvKiogQmFjayB0aWNrIChgKSBrZXkuICovXG4gICAgVktfQkFDS19RVU9URTogMTkyLFxuICAgIC8qKiBPcGVuIHNxdWFyZSBicmFja2V0IChbKSBrZXkuICovXG4gICAgVktfT1BFTl9CUkFDS0VUOiAyMTksXG4gICAgLyoqIEJhY2sgc2xhc2ggKFxcKSBrZXkuICovXG4gICAgVktfQkFDS19TTEFTSDogMjIwLFxuICAgIC8qKiBDbG9zZSBzcXVhcmUgYnJhY2tldCAoXSkga2V5LiAqL1xuICAgIFZLX0NMT1NFX0JSQUNLRVQ6IDIyMSxcbiAgICAvKiogUXVvdGUgKCcnJykga2V5LiAqL1xuICAgIFZLX1FVT1RFOiAyMjIsXG4gICAgLyoqIE1ldGEga2V5IG9uIExpbnV4LCBDb21tYW5kIGtleSBvbiBNYWMuICovXG4gICAgVktfTUVUQTogMjI0LFxuICAgIC8qKiBBbHRHciBrZXkgb24gTGludXguIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19BTFRHUjogMjI1LFxuICAgIC8qKiBXaW5kb3dzIGxvZ28ga2V5IG9uIFdpbmRvd3MuIE9yIFN1cGVyIG9yIEh5cGVyIGtleSBvbiBMaW51eC4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1dJTjogOTEsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0tBTkE6IDIxLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19IQU5HVUw6IDIxLFxuICAgIC8qKiDoi7HmlbAga2V5IG9uIEphcGFuZXNlIE1hYyBrZXlib2FyZC4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0VJU1U6IDIyLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19KVU5KQTogMjMsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0ZJTkFMOiAyNCxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfSEFOSkE6IDI1LFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19LQU5KSTogMjUsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0NPTlZFUlQ6IDI4LFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19OT05DT05WRVJUOiAyOSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfQUNDRVBUOiAzMCxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfTU9ERUNIQU5HRTogMzEsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX1NFTEVDVDogNDEsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX1BSSU5UOiA0MixcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfRVhFQ1VURTogNDMsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLlx0ICovXG4gICAgVktfU0xFRVA6IDk1XG59O1xuIiwiLyoqXG4gKiBAY2xhc3MgQWJzdHJhY3QgZGlzcGxheSBiYWNrZW5kIG1vZHVsZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2VuZCB7XG4gICAgZ2V0Q29udGFpbmVyKCkgeyByZXR1cm4gbnVsbDsgfVxuICAgIHNldE9wdGlvbnMob3B0aW9ucykgeyB0aGlzLl9vcHRpb25zID0gb3B0aW9uczsgfVxufVxuIiwiaW1wb3J0IEJhY2tlbmQgZnJvbSBcIi4vYmFja2VuZC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIGV4dGVuZHMgQmFja2VuZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2N0eCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIH1cbiAgICBzY2hlZHVsZShjYikgeyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpOyB9XG4gICAgZ2V0Q29udGFpbmVyKCkgeyByZXR1cm4gdGhpcy5fY3R4LmNhbnZhczsgfVxuICAgIHNldE9wdGlvbnMob3B0cykge1xuICAgICAgICBzdXBlci5zZXRPcHRpb25zKG9wdHMpO1xuICAgICAgICBjb25zdCBzdHlsZSA9IChvcHRzLmZvbnRTdHlsZSA/IGAke29wdHMuZm9udFN0eWxlfSBgIDogYGApO1xuICAgICAgICBjb25zdCBmb250ID0gYCR7c3R5bGV9ICR7b3B0cy5mb250U2l6ZX1weCAke29wdHMuZm9udEZhbWlseX1gO1xuICAgICAgICB0aGlzLl9jdHguZm9udCA9IGZvbnQ7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBmb250O1xuICAgICAgICB0aGlzLl9jdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgdGhpcy5fY3R4LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gdGhpcy5fb3B0aW9ucy5iZztcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuX2N0eC5jYW52YXMud2lkdGgsIHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgZXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuX2N0eC5jYW52YXM7XG4gICAgICAgIGxldCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB4IC09IHJlY3QubGVmdDtcbiAgICAgICAgeSAtPSByZWN0LnRvcDtcbiAgICAgICAgeCAqPSBjYW52YXMud2lkdGggLyByZWN0LndpZHRoO1xuICAgICAgICB5ICo9IGNhbnZhcy5oZWlnaHQgLyByZWN0LmhlaWdodDtcbiAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gY2FudmFzLndpZHRoIHx8IHkgPj0gY2FudmFzLmhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIFstMSwgLTFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpO1xuICAgIH1cbn1cbiIsImltcG9ydCBIZXggZnJvbSBcIi4vaGV4LmpzXCI7XG5pbXBvcnQgUmVjdCBmcm9tIFwiLi9yZWN0LmpzXCI7XG5pbXBvcnQgVGlsZSBmcm9tIFwiLi90aWxlLmpzXCI7XG5pbXBvcnQgVGlsZUdMIGZyb20gXCIuL3RpbGUtZ2wuanNcIjtcbmltcG9ydCBUZXJtIGZyb20gXCIuL3Rlcm0uanNcIjtcbmltcG9ydCAqIGFzIFRleHQgZnJvbSBcIi4uL3RleHQuanNcIjtcbmltcG9ydCB7IERFRkFVTFRfV0lEVEgsIERFRkFVTFRfSEVJR0hUIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuY29uc3QgQkFDS0VORFMgPSB7XG4gICAgXCJoZXhcIjogSGV4LFxuICAgIFwicmVjdFwiOiBSZWN0LFxuICAgIFwidGlsZVwiOiBUaWxlLFxuICAgIFwidGlsZS1nbFwiOiBUaWxlR0wsXG4gICAgXCJ0ZXJtXCI6IFRlcm1cbn07XG5jb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG4gICAgd2lkdGg6IERFRkFVTFRfV0lEVEgsXG4gICAgaGVpZ2h0OiBERUZBVUxUX0hFSUdIVCxcbiAgICB0cmFuc3Bvc2U6IGZhbHNlLFxuICAgIGxheW91dDogXCJyZWN0XCIsXG4gICAgZm9udFNpemU6IDE1LFxuICAgIHNwYWNpbmc6IDEsXG4gICAgYm9yZGVyOiAwLFxuICAgIGZvcmNlU3F1YXJlUmF0aW86IGZhbHNlLFxuICAgIGZvbnRGYW1pbHk6IFwibW9ub3NwYWNlXCIsXG4gICAgZm9udFN0eWxlOiBcIlwiLFxuICAgIGZnOiBcIiNjY2NcIixcbiAgICBiZzogXCIjMDAwXCIsXG4gICAgdGlsZVdpZHRoOiAzMixcbiAgICB0aWxlSGVpZ2h0OiAzMixcbiAgICB0aWxlTWFwOiB7fSxcbiAgICB0aWxlU2V0OiBudWxsLFxuICAgIHRpbGVDb2xvcml6ZTogZmFsc2Vcbn07XG4vKipcbiAqIEBjbGFzcyBWaXN1YWwgbWFwIGRpc3BsYXlcbiAqL1xubGV0IERpc3BsYXkgPSAvKiogQGNsYXNzICovICgoKSA9PiB7XG4gICAgY2xhc3MgRGlzcGxheSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTsgLy8gZmFsc2UgPSBub3RoaW5nLCB0cnVlID0gYWxsLCBvYmplY3QgPSBkaXJ0eSBjZWxsc1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLkRFQlVHID0gdGhpcy5ERUJVRy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fdGljayA9IHRoaXMuX3RpY2suYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tlbmQuc2NoZWR1bGUodGhpcy5fdGljayk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlYnVnIGhlbHBlciwgaWRlYWwgYXMgYSBtYXAgZ2VuZXJhdG9yIGNhbGxiYWNrLiBBbHdheXMgYm91bmQgdG8gdGhpcy5cbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHdoYXRcbiAgICAgICAgICovXG4gICAgICAgIERFQlVHKHgsIHksIHdoYXQpIHtcbiAgICAgICAgICAgIGxldCBjb2xvcnMgPSBbdGhpcy5fb3B0aW9ucy5iZywgdGhpcy5fb3B0aW9ucy5mZ107XG4gICAgICAgICAgICB0aGlzLmRyYXcoeCwgeSwgbnVsbCwgbnVsbCwgY29sb3JzW3doYXQgJSBjb2xvcnMubGVuZ3RoXSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFyIHRoZSB3aG9sZSBkaXNwbGF5IChjb3ZlciBpdCB3aXRoIGJhY2tncm91bmQgY29sb3IpXG4gICAgICAgICAqL1xuICAgICAgICBjbGVhcigpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQHNlZSBST1QuRGlzcGxheVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMud2lkdGggfHwgb3B0aW9ucy5oZWlnaHQgfHwgb3B0aW9ucy5mb250U2l6ZSB8fCBvcHRpb25zLmZvbnRGYW1pbHkgfHwgb3B0aW9ucy5zcGFjaW5nIHx8IG9wdGlvbnMubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdG9yID0gQkFDS0VORFNbb3B0aW9ucy5sYXlvdXRdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iYWNrZW5kID0gbmV3IGN0b3IoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fYmFja2VuZC5zZXRPcHRpb25zKHRoaXMuX29wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGN1cnJlbnRseSBzZXQgb3B0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgZ2V0T3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnM7IH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIERPTSBub2RlIG9mIHRoaXMgZGlzcGxheVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0Q29udGFpbmVyKCkgeyByZXR1cm4gdGhpcy5fYmFja2VuZC5nZXRDb250YWluZXIoKTsgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcHV0ZSB0aGUgbWF4aW11bSB3aWR0aC9oZWlnaHQgdG8gZml0IGludG8gYSBzZXQgb2YgZ2l2ZW4gY29uc3RyYWludHNcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IGF2YWlsV2lkdGggTWF4aW11bSBhbGxvd2VkIHBpeGVsIHdpZHRoXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSBhdmFpbEhlaWdodCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgaGVpZ2h0XG4gICAgICAgICAqIEByZXR1cm5zIHtpbnRbMl19IGNlbGxXaWR0aCxjZWxsSGVpZ2h0XG4gICAgICAgICAqL1xuICAgICAgICBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tlbmQuY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wdXRlIHRoZSBtYXhpbXVtIGZvbnQgc2l6ZSB0byBmaXQgaW50byBhIHNldCBvZiBnaXZlbiBjb25zdHJhaW50c1xuICAgICAgICAgKiBAcGFyYW0ge2ludH0gYXZhaWxXaWR0aCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgd2lkdGhcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IGF2YWlsSGVpZ2h0IE1heGltdW0gYWxsb3dlZCBwaXhlbCBoZWlnaHRcbiAgICAgICAgICogQHJldHVybnMge2ludH0gZm9udFNpemVcbiAgICAgICAgICovXG4gICAgICAgIGNvbXB1dGVGb250U2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tlbmQuY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBjb21wdXRlVGlsZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX29wdGlvbnMud2lkdGgpO1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9vcHRpb25zLmhlaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0IGEgRE9NIGV2ZW50IChtb3VzZSBvciB0b3VjaCkgdG8gbWFwIGNvb3JkaW5hdGVzLiBVc2VzIGZpcnN0IHRvdWNoIGZvciBtdWx0aS10b3VjaC5cbiAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZSBldmVudFxuICAgICAgICAgKiBAcmV0dXJucyB7aW50WzJdfSAtMSBmb3IgdmFsdWVzIG91dHNpZGUgb2YgdGhlIGNhbnZhc1xuICAgICAgICAgKi9cbiAgICAgICAgZXZlbnRUb1Bvc2l0aW9uKGUpIHtcbiAgICAgICAgICAgIGxldCB4LCB5O1xuICAgICAgICAgICAgaWYgKFwidG91Y2hlc1wiIGluIGUpIHtcbiAgICAgICAgICAgICAgICB4ID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgICAgICAgICAgeSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeCA9IGUuY2xpZW50WDtcbiAgICAgICAgICAgICAgICB5ID0gZS5jbGllbnRZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tlbmQuZXZlbnRUb1Bvc2l0aW9uKHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZyB8fCBzdHJpbmdbXX0gY2ggT25lIG9yIG1vcmUgY2hhcnMgKHdpbGwgYmUgb3ZlcmxhcHBpbmcgdGhlbXNlbHZlcylcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtmZ10gZm9yZWdyb3VuZCBjb2xvclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2JnXSBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICAgICAqL1xuICAgICAgICBkcmF3KHgsIHksIGNoLCBmZywgYmcpIHtcbiAgICAgICAgICAgIGlmICghZmcpIHtcbiAgICAgICAgICAgICAgICBmZyA9IHRoaXMuX29wdGlvbnMuZmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWJnKSB7XG4gICAgICAgICAgICAgICAgYmcgPSB0aGlzLl9vcHRpb25zLmJnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGtleSA9IGAke3h9LCR7eX1gO1xuICAgICAgICAgICAgdGhpcy5fZGF0YVtrZXldID0gW3gsIHksIGNoLCBmZywgYmddO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2RpcnR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSAvLyB3aWxsIGFscmVhZHkgcmVkcmF3IGV2ZXJ5dGhpbmcgXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2RpcnR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlydHkgPSB7fTtcbiAgICAgICAgICAgIH0gLy8gZmlyc3QhXG4gICAgICAgICAgICB0aGlzLl9kaXJ0eVtrZXldID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogRHJhd3MgYSB0ZXh0IGF0IGdpdmVuIHBvc2l0aW9uLiBPcHRpb25hbGx5IHdyYXBzIGF0IGEgbWF4aW11bSBsZW5ndGguIEN1cnJlbnRseSBkb2VzIG5vdCB3b3JrIHdpdGggaGV4IGxheW91dC5cbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgTWF5IGNvbnRhaW4gY29sb3IvYmFja2dyb3VuZCBmb3JtYXQgc3BlY2lmaWVycywgJWN7bmFtZX0vJWJ7bmFtZX0sIGJvdGggb3B0aW9uYWwuICVje30vJWJ7fSByZXNldHMgdG8gZGVmYXVsdC5cbiAgICAgICAgICogQHBhcmFtIHtpbnR9IFttYXhXaWR0aF0gd3JhcCBhdCB3aGF0IHdpZHRoP1xuICAgICAgICAgKiBAcmV0dXJucyB7aW50fSBsaW5lcyBkcmF3blxuICAgICAgICAgKi9cbiAgICAgICAgZHJhd1RleHQoeCwgeSwgdGV4dCwgbWF4V2lkdGgpIHtcbiAgICAgICAgICAgIGxldCBmZyA9IG51bGw7XG4gICAgICAgICAgICBsZXQgYmcgPSBudWxsO1xuICAgICAgICAgICAgbGV0IGN4ID0geDtcbiAgICAgICAgICAgIGxldCBjeSA9IHk7XG4gICAgICAgICAgICBsZXQgbGluZXMgPSAxO1xuICAgICAgICAgICAgaWYgKCFtYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgIG1heFdpZHRoID0gdGhpcy5fb3B0aW9ucy53aWR0aCAtIHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdG9rZW5zID0gVGV4dC50b2tlbml6ZSh0ZXh0LCBtYXhXaWR0aCk7XG4gICAgICAgICAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkgeyAvLyBpbnRlcnByZXQgdG9rZW5pemVkIG9wY29kZSBzdHJlYW1cbiAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUZXh0LlRZUEVfVEVYVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc1NwYWNlID0gZmFsc2UsIGlzUHJldlNwYWNlID0gZmFsc2UsIGlzRnVsbFdpZHRoID0gZmFsc2UsIGlzUHJldkZ1bGxXaWR0aCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbi52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYyA9IHRva2VuLnZhbHVlLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSB0b2tlbi52YWx1ZS5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMubGF5b3V0ID09PSBcInRlcm1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2NoID0gY2MgPj4gODtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzQ0pLID0gY2NoID09PSAweDExIHx8IChjY2ggPj0gMHgyZSAmJiBjY2ggPD0gMHg5ZikgfHwgKGNjaCA+PSAweGFjICYmIGNjaCA8PSAweGQ3KSB8fCAoY2MgPj0gMHhBOTYwICYmIGNjIDw9IDB4QTk3Rik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NKSykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3KGN4ICsgMCwgY3ksIGMsIGZnLCBiZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcoY3ggKyAxLCBjeSwgXCJcXHRcIiwgZmcsIGJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN4ICs9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBc3NpZ24gdG8gYHRydWVgIHdoZW4gdGhlIGN1cnJlbnQgY2hhciBpcyBmdWxsLXdpZHRoLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRnVsbFdpZHRoID0gKGNjID4gMHhmZjAwICYmIGNjIDwgMHhmZjYxKSB8fCAoY2MgPiAweGZmZGMgJiYgY2MgPCAweGZmZTgpIHx8IGNjID4gMHhmZmVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEN1cnJlbnQgY2hhciBpcyBzcGFjZSwgd2hhdGV2ZXIgZnVsbC13aWR0aCBvciBoYWxmLXdpZHRoIGJvdGggYXJlIE9LLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU3BhY2UgPSAoYy5jaGFyQ29kZUF0KDApID09IDB4MjAgfHwgYy5jaGFyQ29kZUF0KDApID09IDB4MzAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHByZXZpb3VzIGNoYXIgaXMgZnVsbC13aWR0aCBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjdXJyZW50IGNoYXIgaXMgbmV0aGVyIGhhbGYtd2lkdGggbm9yIGEgc3BhY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJldkZ1bGxXaWR0aCAmJiAhaXNGdWxsV2lkdGggJiYgIWlzU3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3grKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IC8vIGFkZCBhbiBleHRyYSBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBjdXJyZW50IGNoYXIgaXMgZnVsbC13aWR0aCBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgcHJldmlvdXMgY2hhciBpcyBub3QgYSBzcGFjZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGdWxsV2lkdGggJiYgIWlzUHJldlNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAvLyBhZGQgYW4gZXh0cmEgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcoY3grKywgY3ksIGMsIGZnLCBiZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmV2U3BhY2UgPSBpc1NwYWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJldkZ1bGxXaWR0aCA9IGlzRnVsbFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVGV4dC5UWVBFX0ZHOlxuICAgICAgICAgICAgICAgICAgICAgICAgZmcgPSB0b2tlbi52YWx1ZSB8fCBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVGV4dC5UWVBFX0JHOlxuICAgICAgICAgICAgICAgICAgICAgICAgYmcgPSB0b2tlbi52YWx1ZSB8fCBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgVGV4dC5UWVBFX05FV0xJTkU6XG4gICAgICAgICAgICAgICAgICAgICAgICBjeCA9IHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBjeSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZXMrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaW5lcztcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGltZXIgdGljazogdXBkYXRlIGRpcnR5IHBhcnRzXG4gICAgICAgICAqL1xuICAgICAgICBfdGljaygpIHtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tlbmQuc2NoZWR1bGUodGhpcy5fdGljayk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2RpcnR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2RpcnR5ID09PSB0cnVlKSB7IC8vIGRyYXcgYWxsXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFja2VuZC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhdyhpZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gLy8gcmVkcmF3IGNhY2hlZCBkYXRhIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vIGRyYXcgb25seSBkaXJ0eSBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhdyhrZXksIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgV2hhdCB0byBkcmF3XG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbH0gY2xlYXJCZWZvcmUgSXMgaXQgbmVjZXNzYXJ5IHRvIGNsZWFuIGJlZm9yZT9cbiAgICAgICAgICovXG4gICAgICAgIF9kcmF3KGtleSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5fZGF0YVtrZXldO1xuICAgICAgICAgICAgaWYgKGRhdGFbNF0gIT0gdGhpcy5fb3B0aW9ucy5iZykge1xuICAgICAgICAgICAgICAgIGNsZWFyQmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2JhY2tlbmQuZHJhdyhkYXRhLCBjbGVhckJlZm9yZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgRGlzcGxheS5SZWN0ID0gUmVjdDtcbiAgICBEaXNwbGF5LkhleCA9IEhleDtcbiAgICBEaXNwbGF5LlRpbGUgPSBUaWxlO1xuICAgIERpc3BsYXkuVGlsZUdMID0gVGlsZUdMO1xuICAgIERpc3BsYXkuVGVybSA9IFRlcm07XG4gICAgcmV0dXJuIERpc3BsYXk7XG59KSgpO1xuZXhwb3J0IGRlZmF1bHQgRGlzcGxheTtcbiIsImltcG9ydCBDYW52YXMgZnJvbSBcIi4vY2FudmFzLmpzXCI7XG5pbXBvcnQgeyBtb2QgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgSGV4YWdvbmFsIGJhY2tlbmRcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhleCBleHRlbmRzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3NwYWNpbmdYID0gMDtcbiAgICAgICAgdGhpcy5fc3BhY2luZ1kgPSAwO1xuICAgICAgICB0aGlzLl9oZXhTaXplID0gMDtcbiAgICB9XG4gICAgZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICBsZXQgW3gsIHksIGNoLCBmZywgYmddID0gZGF0YTtcbiAgICAgICAgbGV0IHB4ID0gW1xuICAgICAgICAgICAgKHggKyAxKSAqIHRoaXMuX3NwYWNpbmdYLFxuICAgICAgICAgICAgeSAqIHRoaXMuX3NwYWNpbmdZICsgdGhpcy5faGV4U2l6ZVxuICAgICAgICBdO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgICAgIHB4LnJldmVyc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICAgIHRoaXMuX2ZpbGwocHhbMF0sIHB4WzFdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICBsZXQgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQoY2hhcnNbaV0sIHB4WzBdLCBNYXRoLmNlaWwocHhbMV0pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgICAgIGF2YWlsV2lkdGggKz0gYXZhaWxIZWlnaHQ7XG4gICAgICAgICAgICBhdmFpbEhlaWdodCA9IGF2YWlsV2lkdGggLSBhdmFpbEhlaWdodDtcbiAgICAgICAgICAgIGF2YWlsV2lkdGggLT0gYXZhaWxIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fc3BhY2luZ1gpIC0gMTtcbiAgICAgICAgbGV0IGhlaWdodCA9IE1hdGguZmxvb3IoKGF2YWlsSGVpZ2h0IC0gMiAqIHRoaXMuX2hleFNpemUpIC8gdGhpcy5fc3BhY2luZ1kgKyAxKTtcbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICB9XG4gICAgY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICAgICAgYXZhaWxXaWR0aCArPSBhdmFpbEhlaWdodDtcbiAgICAgICAgICAgIGF2YWlsSGVpZ2h0ID0gYXZhaWxXaWR0aCAtIGF2YWlsSGVpZ2h0O1xuICAgICAgICAgICAgYXZhaWxXaWR0aCAtPSBhdmFpbEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaGV4U2l6ZVdpZHRoID0gMiAqIGF2YWlsV2lkdGggLyAoKHRoaXMuX29wdGlvbnMud2lkdGggKyAxKSAqIE1hdGguc3FydCgzKSkgLSAxO1xuICAgICAgICBsZXQgaGV4U2l6ZUhlaWdodCA9IGF2YWlsSGVpZ2h0IC8gKDIgKyAxLjUgKiAodGhpcy5fb3B0aW9ucy5oZWlnaHQgLSAxKSk7XG4gICAgICAgIGxldCBoZXhTaXplID0gTWF0aC5taW4oaGV4U2l6ZVdpZHRoLCBoZXhTaXplSGVpZ2h0KTtcbiAgICAgICAgLy8gY29tcHV0ZSBjaGFyIHJhdGlvXG4gICAgICAgIGxldCBvbGRGb250ID0gdGhpcy5fY3R4LmZvbnQ7XG4gICAgICAgIHRoaXMuX2N0eC5mb250ID0gXCIxMDBweCBcIiArIHRoaXMuX29wdGlvbnMuZm9udEZhbWlseTtcbiAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgICB0aGlzLl9jdHguZm9udCA9IG9sZEZvbnQ7XG4gICAgICAgIGxldCByYXRpbyA9IHdpZHRoIC8gMTAwO1xuICAgICAgICBoZXhTaXplID0gTWF0aC5mbG9vcihoZXhTaXplKSArIDE7IC8vIGNsb3Nlc3QgbGFyZ2VyIGhleFNpemVcbiAgICAgICAgLy8gRklYTUUgY2hhciBzaXplIGNvbXB1dGF0aW9uIGRvZXMgbm90IHJlc3BlY3QgdHJhbnNwb3NlZCBoZXhlc1xuICAgICAgICBsZXQgZm9udFNpemUgPSAyICogaGV4U2l6ZSAvICh0aGlzLl9vcHRpb25zLnNwYWNpbmcgKiAoMSArIHJhdGlvIC8gTWF0aC5zcXJ0KDMpKSk7XG4gICAgICAgIC8vIGNsb3Nlc3Qgc21hbGxlciBmb250U2l6ZVxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGZvbnRTaXplKSAtIDE7XG4gICAgfVxuICAgIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgbGV0IG5vZGVTaXplO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50cmFuc3Bvc2UpIHtcbiAgICAgICAgICAgIHggKz0geTtcbiAgICAgICAgICAgIHkgPSB4IC0geTtcbiAgICAgICAgICAgIHggLT0geTtcbiAgICAgICAgICAgIG5vZGVTaXplID0gdGhpcy5fY3R4LmNhbnZhcy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vZGVTaXplID0gdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpemUgPSBub2RlU2l6ZSAvIHRoaXMuX29wdGlvbnMuaGVpZ2h0O1xuICAgICAgICB5ID0gTWF0aC5mbG9vcih5IC8gc2l6ZSk7XG4gICAgICAgIGlmIChtb2QoeSwgMikpIHsgLyogb2RkIHJvdyAqL1xuICAgICAgICAgICAgeCAtPSB0aGlzLl9zcGFjaW5nWDtcbiAgICAgICAgICAgIHggPSAxICsgMiAqIE1hdGguZmxvb3IoeCAvICgyICogdGhpcy5fc3BhY2luZ1gpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHggPSAyICogTWF0aC5mbG9vcih4IC8gKDIgKiB0aGlzLl9zcGFjaW5nWCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbeCwgeV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFyZ3VtZW50cyBhcmUgcGl4ZWwgdmFsdWVzLiBJZiBcInRyYW5zcG9zZWRcIiBtb2RlIGlzIGVuYWJsZWQsIHRoZW4gdGhlc2UgdHdvIGFyZSBhbHJlYWR5IHN3YXBwZWQuXG4gICAgICovXG4gICAgX2ZpbGwoY3gsIGN5KSB7XG4gICAgICAgIGxldCBhID0gdGhpcy5faGV4U2l6ZTtcbiAgICAgICAgbGV0IGIgPSB0aGlzLl9vcHRpb25zLmJvcmRlcjtcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhjeCAtIGEgKyBiLCBjeSk7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4IC0gYSAvIDIgKyBiLCBjeSArIHRoaXMuX3NwYWNpbmdYIC0gYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4ICsgYSAvIDIgLSBiLCBjeSArIHRoaXMuX3NwYWNpbmdYIC0gYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4ICsgYSAtIGIsIGN5KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggKyBhIC8gMiAtIGIsIGN5IC0gdGhpcy5fc3BhY2luZ1ggKyBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggLSBhIC8gMiArIGIsIGN5IC0gdGhpcy5fc3BhY2luZ1ggKyBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggLSBhICsgYiwgY3kpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhjeCwgY3kgLSBhICsgYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4ICsgdGhpcy5fc3BhY2luZ1ggLSBiLCBjeSAtIGEgLyAyICsgYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4ICsgdGhpcy5fc3BhY2luZ1ggLSBiLCBjeSArIGEgLyAyIC0gYik7XG4gICAgICAgICAgICBjdHgubGluZVRvKGN4LCBjeSArIGEgLSBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggLSB0aGlzLl9zcGFjaW5nWCArIGIsIGN5ICsgYSAvIDIgLSBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggLSB0aGlzLl9zcGFjaW5nWCArIGIsIGN5IC0gYSAvIDIgKyBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3gsIGN5IC0gYSArIGIpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuICAgIF91cGRhdGVTaXplKCkge1xuICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgY29uc3QgY2hhcldpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgICB0aGlzLl9oZXhTaXplID0gTWF0aC5mbG9vcihvcHRzLnNwYWNpbmcgKiAob3B0cy5mb250U2l6ZSArIGNoYXJXaWR0aCAvIE1hdGguc3FydCgzKSkgLyAyKTtcbiAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSB0aGlzLl9oZXhTaXplICogTWF0aC5zcXJ0KDMpIC8gMjtcbiAgICAgICAgdGhpcy5fc3BhY2luZ1kgPSB0aGlzLl9oZXhTaXplICogMS41O1xuICAgICAgICBsZXQgeHByb3A7XG4gICAgICAgIGxldCB5cHJvcDtcbiAgICAgICAgaWYgKG9wdHMudHJhbnNwb3NlKSB7XG4gICAgICAgICAgICB4cHJvcCA9IFwiaGVpZ2h0XCI7XG4gICAgICAgICAgICB5cHJvcCA9IFwid2lkdGhcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHhwcm9wID0gXCJ3aWR0aFwiO1xuICAgICAgICAgICAgeXByb3AgPSBcImhlaWdodFwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N0eC5jYW52YXNbeHByb3BdID0gTWF0aC5jZWlsKChvcHRzLndpZHRoICsgMSkgKiB0aGlzLl9zcGFjaW5nWCk7XG4gICAgICAgIHRoaXMuX2N0eC5jYW52YXNbeXByb3BdID0gTWF0aC5jZWlsKChvcHRzLmhlaWdodCAtIDEpICogdGhpcy5fc3BhY2luZ1kgKyAyICogdGhpcy5faGV4U2l6ZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9jYW52YXMuanNcIjtcbi8qKlxuICogQGNsYXNzIFJlY3Rhbmd1bGFyIGJhY2tlbmRcbiAqIEBwcml2YXRlXG4gKi9cbmxldCBSZWN0ID0gLyoqIEBjbGFzcyAqLyAoKCkgPT4ge1xuICAgIGNsYXNzIFJlY3QgZXh0ZW5kcyBDYW52YXMge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9zcGFjaW5nWCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9zcGFjaW5nWSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXNDYWNoZSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICAgICAgc3VwZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhc0NhY2hlID0ge307XG4gICAgICAgIH1cbiAgICAgICAgZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgaWYgKFJlY3QuY2FjaGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmF3V2l0aENhY2hlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhd05vQ2FjaGUoZGF0YSwgY2xlYXJCZWZvcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9kcmF3V2l0aENhY2hlKGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBbeCwgeSwgY2gsIGZnLCBiZ10gPSBkYXRhO1xuICAgICAgICAgICAgbGV0IGhhc2ggPSBcIlwiICsgY2ggKyBmZyArIGJnO1xuICAgICAgICAgICAgbGV0IGNhbnZhcztcbiAgICAgICAgICAgIGlmIChoYXNoIGluIHRoaXMuX2NhbnZhc0NhY2hlKSB7XG4gICAgICAgICAgICAgICAgY2FudmFzID0gdGhpcy5fY2FudmFzQ2FjaGVbaGFzaF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgYiA9IHRoaXMuX29wdGlvbnMuYm9yZGVyO1xuICAgICAgICAgICAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5fc3BhY2luZ1g7XG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuX3NwYWNpbmdZO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoYiwgYiwgY2FudmFzLndpZHRoIC0gYiwgY2FudmFzLmhlaWdodCAtIGIpO1xuICAgICAgICAgICAgICAgIGlmIChjaCkge1xuICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZmc7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5mb250ID0gdGhpcy5fY3R4LmZvbnQ7XG4gICAgICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICAgICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGNoYXJzW2ldLCB0aGlzLl9zcGFjaW5nWCAvIDIsIE1hdGguY2VpbCh0aGlzLl9zcGFjaW5nWSAvIDIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jYW52YXNDYWNoZVtoYXNoXSA9IGNhbnZhcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UoY2FudmFzLCB4ICogdGhpcy5fc3BhY2luZ1gsIHkgKiB0aGlzLl9zcGFjaW5nWSk7XG4gICAgICAgIH1cbiAgICAgICAgX2RyYXdOb0NhY2hlKGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICBsZXQgW3gsIHksIGNoLCBmZywgYmddID0gZGF0YTtcbiAgICAgICAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgICAgIGxldCBiID0gdGhpcy5fb3B0aW9ucy5ib3JkZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCh4ICogdGhpcy5fc3BhY2luZ1ggKyBiLCB5ICogdGhpcy5fc3BhY2luZ1kgKyBiLCB0aGlzLl9zcGFjaW5nWCAtIGIsIHRoaXMuX3NwYWNpbmdZIC0gYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICAgICAgbGV0IGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQoY2hhcnNbaV0sICh4ICsgMC41KSAqIHRoaXMuX3NwYWNpbmdYLCBNYXRoLmNlaWwoKHkgKyAwLjUpICogdGhpcy5fc3BhY2luZ1kpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fc3BhY2luZ1gpO1xuICAgICAgICAgICAgbGV0IGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9zcGFjaW5nWSk7XG4gICAgICAgICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgICAgICB9XG4gICAgICAgIGNvbXB1dGVGb250U2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICAgICAgbGV0IGJveFdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy53aWR0aCk7XG4gICAgICAgICAgICBsZXQgYm94SGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMuaGVpZ2h0KTtcbiAgICAgICAgICAgIC8qIGNvbXB1dGUgY2hhciByYXRpbyAqL1xuICAgICAgICAgICAgbGV0IG9sZEZvbnQgPSB0aGlzLl9jdHguZm9udDtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5mb250ID0gXCIxMDBweCBcIiArIHRoaXMuX29wdGlvbnMuZm9udEZhbWlseTtcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IE1hdGguY2VpbCh0aGlzLl9jdHgubWVhc3VyZVRleHQoXCJXXCIpLndpZHRoKTtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5mb250ID0gb2xkRm9udDtcbiAgICAgICAgICAgIGxldCByYXRpbyA9IHdpZHRoIC8gMTAwO1xuICAgICAgICAgICAgbGV0IHdpZHRoRnJhY3Rpb24gPSByYXRpbyAqIGJveEhlaWdodCAvIGJveFdpZHRoO1xuICAgICAgICAgICAgaWYgKHdpZHRoRnJhY3Rpb24gPiAxKSB7IC8qIHRvbyB3aWRlIHdpdGggY3VycmVudCBhc3BlY3QgcmF0aW8gKi9cbiAgICAgICAgICAgICAgICBib3hIZWlnaHQgPSBNYXRoLmZsb29yKGJveEhlaWdodCAvIHdpZHRoRnJhY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYm94SGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy5zcGFjaW5nKTtcbiAgICAgICAgfVxuICAgICAgICBfbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICAgICAgICByZXR1cm4gW01hdGguZmxvb3IoeCAvIHRoaXMuX3NwYWNpbmdYKSwgTWF0aC5mbG9vcih5IC8gdGhpcy5fc3BhY2luZ1kpXTtcbiAgICAgICAgfVxuICAgICAgICBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgICAgICAgY29uc3QgY2hhcldpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSBNYXRoLmNlaWwob3B0cy5zcGFjaW5nICogY2hhcldpZHRoKTtcbiAgICAgICAgICAgIHRoaXMuX3NwYWNpbmdZID0gTWF0aC5jZWlsKG9wdHMuc3BhY2luZyAqIG9wdHMuZm9udFNpemUpO1xuICAgICAgICAgICAgaWYgKG9wdHMuZm9yY2VTcXVhcmVSYXRpbykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwYWNpbmdYID0gdGhpcy5fc3BhY2luZ1kgPSBNYXRoLm1heCh0aGlzLl9zcGFjaW5nWCwgdGhpcy5fc3BhY2luZ1kpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY3R4LmNhbnZhcy53aWR0aCA9IG9wdHMud2lkdGggKiB0aGlzLl9zcGFjaW5nWDtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0ID0gb3B0cy5oZWlnaHQgKiB0aGlzLl9zcGFjaW5nWTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBSZWN0LmNhY2hlID0gZmFsc2U7XG4gICAgcmV0dXJuIFJlY3Q7XG59KSgpO1xuZXhwb3J0IGRlZmF1bHQgUmVjdDtcbiIsImltcG9ydCBCYWNrZW5kIGZyb20gXCIuL2JhY2tlbmQuanNcIjtcbmltcG9ydCAqIGFzIENvbG9yIGZyb20gXCIuLi9jb2xvci5qc1wiO1xuZnVuY3Rpb24gY2xlYXJUb0Fuc2koYmcpIHtcbiAgICByZXR1cm4gYFxceDFiWzA7NDg7NTske3Rlcm1jb2xvcihiZyl9bVxceDFiWzJKYDtcbn1cbmZ1bmN0aW9uIGNvbG9yVG9BbnNpKGZnLCBiZykge1xuICAgIHJldHVybiBgXFx4MWJbMDszODs1OyR7dGVybWNvbG9yKGZnKX07NDg7NTske3Rlcm1jb2xvcihiZyl9bWA7XG59XG5mdW5jdGlvbiBwb3NpdGlvblRvQW5zaSh4LCB5KSB7XG4gICAgcmV0dXJuIGBcXHgxYlske3kgKyAxfTske3ggKyAxfUhgO1xufVxuZnVuY3Rpb24gdGVybWNvbG9yKGNvbG9yKSB7XG4gICAgY29uc3QgU1JDX0NPTE9SUyA9IDI1Ni4wO1xuICAgIGNvbnN0IERTVF9DT0xPUlMgPSA2LjA7XG4gICAgY29uc3QgQ09MT1JfUkFUSU8gPSBEU1RfQ09MT1JTIC8gU1JDX0NPTE9SUztcbiAgICBsZXQgcmdiID0gQ29sb3IuZnJvbVN0cmluZyhjb2xvcik7XG4gICAgbGV0IHIgPSBNYXRoLmZsb29yKHJnYlswXSAqIENPTE9SX1JBVElPKTtcbiAgICBsZXQgZyA9IE1hdGguZmxvb3IocmdiWzFdICogQ09MT1JfUkFUSU8pO1xuICAgIGxldCBiID0gTWF0aC5mbG9vcihyZ2JbMl0gKiBDT0xPUl9SQVRJTyk7XG4gICAgcmV0dXJuIHIgKiAzNiArIGcgKiA2ICsgYiAqIDEgKyAxNjtcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlcm0gZXh0ZW5kcyBCYWNrZW5kIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gWzAsIDBdO1xuICAgICAgICB0aGlzLl9jdXJzb3IgPSBbLTEsIC0xXTtcbiAgICAgICAgdGhpcy5fbGFzdENvbG9yID0gXCJcIjtcbiAgICB9XG4gICAgc2NoZWR1bGUoY2IpIHsgc2V0VGltZW91dChjYiwgMTAwMCAvIDYwKTsgfVxuICAgIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBzdXBlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICBsZXQgc2l6ZSA9IFtvcHRpb25zLndpZHRoLCBvcHRpb25zLmhlaWdodF07XG4gICAgICAgIGxldCBhdmFpbCA9IHRoaXMuY29tcHV0ZVNpemUoKTtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gYXZhaWwubWFwKCh2YWwsIGluZGV4KSA9PiBNYXRoLmZsb29yKCh2YWwgLSBzaXplW2luZGV4XSkgLyAyKSk7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShjbGVhclRvQW5zaSh0aGlzLl9vcHRpb25zLmJnKSk7XG4gICAgfVxuICAgIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoZXJlIHRvIGRyYXcgd2hhdCB3aXRoIHdoYXQgY29sb3JzXG4gICAgICAgIGxldCBbeCwgeSwgY2gsIGZnLCBiZ10gPSBkYXRhO1xuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgd2UgbmVlZCB0byBtb3ZlIHRoZSB0ZXJtaW5hbCBjdXJzb3JcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5fb2Zmc2V0WzBdICsgeDtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5fb2Zmc2V0WzFdICsgeTtcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLmNvbXB1dGVTaXplKCk7XG4gICAgICAgIGlmIChkeCA8IDAgfHwgZHggPj0gc2l6ZVswXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeSA8IDAgfHwgZHkgPj0gc2l6ZVsxXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeCAhPT0gdGhpcy5fY3Vyc29yWzBdIHx8IGR5ICE9PSB0aGlzLl9jdXJzb3JbMV0pIHtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHBvc2l0aW9uVG9BbnNpKGR4LCBkeSkpO1xuICAgICAgICAgICAgdGhpcy5fY3Vyc29yWzBdID0gZHg7XG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JbMV0gPSBkeTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0ZXJtaW5hbHMgYXV0b21hdGljYWxseSBjbGVhciwgYnV0IGlmIHdlJ3JlIGNsZWFyaW5nIHdoZW4gd2UncmVcbiAgICAgICAgLy8gbm90IG90aGVyd2lzZSBwcm92aWRlZCB3aXRoIGEgY2hhcmFjdGVyLCBqdXN0IHVzZSBhIHNwYWNlIGluc3RlYWRcbiAgICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICAgICAgY2ggPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB3ZSdyZSBub3QgY2xlYXJpbmcgYW5kIG5vdCBwcm92aWRlZCB3aXRoIGEgY2hhcmFjdGVyLCBkbyBub3RoaW5nXG4gICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgd2UgbmVlZCB0byBjaGFuZ2UgY29sb3JzXG4gICAgICAgIGxldCBuZXdDb2xvciA9IGNvbG9yVG9BbnNpKGZnLCBiZyk7XG4gICAgICAgIGlmIChuZXdDb2xvciAhPT0gdGhpcy5fbGFzdENvbG9yKSB7XG4gICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShuZXdDb2xvcik7XG4gICAgICAgICAgICB0aGlzLl9sYXN0Q29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ggIT0gJ1xcdCcpIHtcbiAgICAgICAgICAgIC8vIHdyaXRlIHRoZSBwcm92aWRlZCBzeW1ib2wgdG8gdGhlIGRpc3BsYXlcbiAgICAgICAgICAgIGxldCBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShjaGFyc1swXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIG91ciBwb3NpdGlvbiwgZ2l2ZW4gdGhhdCB3ZSB3cm90ZSBhIGNoYXJhY3RlclxuICAgICAgICB0aGlzLl9jdXJzb3JbMF0rKztcbiAgICAgICAgaWYgKHRoaXMuX2N1cnNvclswXSA+PSBzaXplWzBdKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JbMF0gPSAwO1xuICAgICAgICAgICAgdGhpcy5fY3Vyc29yWzFdKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcHV0ZUZvbnRTaXplKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJUZXJtaW5hbCBiYWNrZW5kIGhhcyBubyBub3Rpb24gb2YgZm9udCBzaXplXCIpOyB9XG4gICAgZXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHsgcmV0dXJuIFt4LCB5XTsgfVxuICAgIGNvbXB1dGVTaXplKCkgeyByZXR1cm4gW3Byb2Nlc3Muc3Rkb3V0LmNvbHVtbnMsIHByb2Nlc3Muc3Rkb3V0LnJvd3NdOyB9XG59XG4iLCJpbXBvcnQgQmFja2VuZCBmcm9tIFwiLi9iYWNrZW5kLmpzXCI7XG5pbXBvcnQgKiBhcyBDb2xvciBmcm9tIFwiLi4vY29sb3IuanNcIjtcbi8qKlxuICogQGNsYXNzIFRpbGUgYmFja2VuZFxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZUdMIGV4dGVuZHMgQmFja2VuZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3VuaWZvcm1zID0ge307XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9nbCA9IHRoaXMuX2luaXRXZWJHTCgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBhbGVydChlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBpc1N1cHBvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwid2ViZ2wyXCIsIHsgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlIH0pO1xuICAgIH1cbiAgICBzY2hlZHVsZShjYikgeyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpOyB9XG4gICAgZ2V0Q29udGFpbmVyKCkgeyByZXR1cm4gdGhpcy5fZ2wuY2FudmFzOyB9XG4gICAgc2V0T3B0aW9ucyhvcHRzKSB7XG4gICAgICAgIHN1cGVyLnNldE9wdGlvbnMob3B0cyk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgICAgbGV0IHRpbGVTZXQgPSB0aGlzLl9vcHRpb25zLnRpbGVTZXQ7XG4gICAgICAgIGlmICh0aWxlU2V0ICYmIFwiY29tcGxldGVcIiBpbiB0aWxlU2V0ICYmICF0aWxlU2V0LmNvbXBsZXRlKSB7XG4gICAgICAgICAgICB0aWxlU2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHRoaXMuX3VwZGF0ZVRleHR1cmUodGlsZVNldCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVGV4dHVyZSh0aWxlU2V0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgICBsZXQgW3gsIHksIGNoLCBmZywgYmddID0gZGF0YTtcbiAgICAgICAgbGV0IHNjaXNzb3JZID0gZ2wuY2FudmFzLmhlaWdodCAtICh5ICsgMSkgKiBvcHRzLnRpbGVIZWlnaHQ7XG4gICAgICAgIGdsLnNjaXNzb3IoeCAqIG9wdHMudGlsZVdpZHRoLCBzY2lzc29yWSwgb3B0cy50aWxlV2lkdGgsIG9wdHMudGlsZUhlaWdodCk7XG4gICAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgaWYgKG9wdHMudGlsZUNvbG9yaXplKSB7XG4gICAgICAgICAgICAgICAgZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdsLmNsZWFyQ29sb3IoLi4ucGFyc2VDb2xvcihiZykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICAgIGxldCBiZ3MgPSBbXS5jb25jYXQoYmcpO1xuICAgICAgICBsZXQgZmdzID0gW10uY29uY2F0KGZnKTtcbiAgICAgICAgZ2wudW5pZm9ybTJmdih0aGlzLl91bmlmb3Jtc1tcInRhcmdldFBvc1JlbFwiXSwgW3gsIHldKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl9vcHRpb25zLnRpbGVNYXBbY2hhcnNbaV1dO1xuICAgICAgICAgICAgaWYgKCF0aWxlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGFyIFwiJHtjaGFyc1tpXX1cIiBub3QgZm91bmQgaW4gdGlsZU1hcGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2wudW5pZm9ybTFmKHRoaXMuX3VuaWZvcm1zW1wiY29sb3JpemVcIl0sIG9wdHMudGlsZUNvbG9yaXplID8gMSA6IDApO1xuICAgICAgICAgICAgZ2wudW5pZm9ybTJmdih0aGlzLl91bmlmb3Jtc1tcInRpbGVzZXRQb3NBYnNcIl0sIHRpbGUpO1xuICAgICAgICAgICAgaWYgKG9wdHMudGlsZUNvbG9yaXplKSB7XG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTRmdih0aGlzLl91bmlmb3Jtc1tcInRpbnRcIl0sIHBhcnNlQ29sb3IoZmdzW2ldKSk7XG4gICAgICAgICAgICAgICAgZ2wudW5pZm9ybTRmdih0aGlzLl91bmlmb3Jtc1tcImJnXCJdLCBwYXJzZUNvbG9yKGJnc1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRV9TVFJJUCwgMCwgNCk7XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPGNoYXJzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRpbGVDb2xvcml6ZSkgeyAvLyBhcHBseSBjb2xvcml6YXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYW52YXMgPSB0aGlzLl9jb2xvckNhbnZhcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZnID0gZmdzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnID0gYmdzW2ldO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29wdGlvbnMudGlsZVNldCEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLWF0b3BcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJnICE9IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLW92ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShjYW52YXMsIHgqdGlsZVdpZHRoLCB5KnRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5vIGNvbG9yaXppbmcsIGVhc3lcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy50aWxlU2V0ISxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeCp0aWxlV2lkdGgsIHkqdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgKi9cbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgICAgIGdsLmNsZWFyQ29sb3IoLi4ucGFyc2VDb2xvcih0aGlzLl9vcHRpb25zLmJnKSk7XG4gICAgICAgIGdsLnNjaXNzb3IoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCk7XG4gICAgfVxuICAgIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIGxldCB3aWR0aCA9IE1hdGguZmxvb3IoYXZhaWxXaWR0aCAvIHRoaXMuX29wdGlvbnMudGlsZVdpZHRoKTtcbiAgICAgICAgbGV0IGhlaWdodCA9IE1hdGguZmxvb3IoYXZhaWxIZWlnaHQgLyB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQpO1xuICAgICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgIH1cbiAgICBjb21wdXRlRm9udFNpemUoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbGUgYmFja2VuZCBkb2VzIG5vdCB1bmRlcnN0YW5kIGZvbnQgc2l6ZVwiKTtcbiAgICB9XG4gICAgZXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuX2dsLmNhbnZhcztcbiAgICAgICAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHggLT0gcmVjdC5sZWZ0O1xuICAgICAgICB5IC09IHJlY3QudG9wO1xuICAgICAgICB4ICo9IGNhbnZhcy53aWR0aCAvIHJlY3Qud2lkdGg7XG4gICAgICAgIHkgKj0gY2FudmFzLmhlaWdodCAvIHJlY3QuaGVpZ2h0O1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSBjYW52YXMud2lkdGggfHwgeSA+PSBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gWy0xLCAtMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSk7XG4gICAgfVxuICAgIF9pbml0V2ViR0woKSB7XG4gICAgICAgIGxldCBnbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikuZ2V0Q29udGV4dChcIndlYmdsMlwiLCB7IHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdHJ1ZSB9KTtcbiAgICAgICAgd2luZG93LmdsID0gZ2w7XG4gICAgICAgIGxldCBwcm9ncmFtID0gY3JlYXRlUHJvZ3JhbShnbCwgVlMsIEZTKTtcbiAgICAgICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcbiAgICAgICAgY3JlYXRlUXVhZChnbCk7XG4gICAgICAgIFVOSUZPUk1TLmZvckVhY2gobmFtZSA9PiB0aGlzLl91bmlmb3Jtc1tuYW1lXSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lKSk7XG4gICAgICAgIHRoaXMuX3Byb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgICAgICBnbC5ibGVuZEZ1bmNTZXBhcmF0ZShnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEsIGdsLk9ORSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgICAgIGdsLmVuYWJsZShnbC5TQ0lTU09SX1RFU1QpO1xuICAgICAgICByZXR1cm4gZ2w7XG4gICAgfVxuICAgIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIFtNYXRoLmZsb29yKHggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCksIE1hdGguZmxvb3IoeSAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCldO1xuICAgIH1cbiAgICBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIGNvbnN0IGNhbnZhc1NpemUgPSBbb3B0cy53aWR0aCAqIG9wdHMudGlsZVdpZHRoLCBvcHRzLmhlaWdodCAqIG9wdHMudGlsZUhlaWdodF07XG4gICAgICAgIGdsLmNhbnZhcy53aWR0aCA9IGNhbnZhc1NpemVbMF07XG4gICAgICAgIGdsLmNhbnZhcy5oZWlnaHQgPSBjYW52YXNTaXplWzFdO1xuICAgICAgICBnbC52aWV3cG9ydCgwLCAwLCBjYW52YXNTaXplWzBdLCBjYW52YXNTaXplWzFdKTtcbiAgICAgICAgZ2wudW5pZm9ybTJmdih0aGlzLl91bmlmb3Jtc1tcInRpbGVTaXplXCJdLCBbb3B0cy50aWxlV2lkdGgsIG9wdHMudGlsZUhlaWdodF0pO1xuICAgICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGFyZ2V0U2l6ZVwiXSwgY2FudmFzU2l6ZSk7XG4gICAgfVxuICAgIF91cGRhdGVUZXh0dXJlKHRpbGVTZXQpIHtcbiAgICAgICAgY3JlYXRlVGV4dHVyZSh0aGlzLl9nbCwgdGlsZVNldCk7XG4gICAgfVxufVxuY29uc3QgVU5JRk9STVMgPSBbXCJ0YXJnZXRQb3NSZWxcIiwgXCJ0aWxlc2V0UG9zQWJzXCIsIFwidGlsZVNpemVcIiwgXCJ0YXJnZXRTaXplXCIsIFwiY29sb3JpemVcIiwgXCJiZ1wiLCBcInRpbnRcIl07XG5jb25zdCBWUyA9IGBcbiN2ZXJzaW9uIDMwMCBlc1xuXG5pbiB2ZWMyIHRpbGVQb3NSZWw7XG5vdXQgdmVjMiB0aWxlc2V0UG9zUHg7XG5cbnVuaWZvcm0gdmVjMiB0aWxlc2V0UG9zQWJzO1xudW5pZm9ybSB2ZWMyIHRpbGVTaXplO1xudW5pZm9ybSB2ZWMyIHRhcmdldFNpemU7XG51bmlmb3JtIHZlYzIgdGFyZ2V0UG9zUmVsO1xuXG52b2lkIG1haW4oKSB7XG5cdHZlYzIgdGFyZ2V0UG9zUHggPSAodGFyZ2V0UG9zUmVsICsgdGlsZVBvc1JlbCkgKiB0aWxlU2l6ZTtcblx0dmVjMiB0YXJnZXRQb3NOZGMgPSAoKHRhcmdldFBvc1B4IC8gdGFyZ2V0U2l6ZSktMC41KSoyLjA7XG5cdHRhcmdldFBvc05kYy55ICo9IC0xLjA7XG5cblx0Z2xfUG9zaXRpb24gPSB2ZWM0KHRhcmdldFBvc05kYywgMC4wLCAxLjApO1xuXHR0aWxlc2V0UG9zUHggPSB0aWxlc2V0UG9zQWJzICsgdGlsZVBvc1JlbCAqIHRpbGVTaXplO1xufWAudHJpbSgpO1xuY29uc3QgRlMgPSBgXG4jdmVyc2lvbiAzMDAgZXNcbnByZWNpc2lvbiBoaWdocCBmbG9hdDtcblxuaW4gdmVjMiB0aWxlc2V0UG9zUHg7XG5vdXQgdmVjNCBmcmFnQ29sb3I7XG51bmlmb3JtIHNhbXBsZXIyRCBpbWFnZTtcbnVuaWZvcm0gYm9vbCBjb2xvcml6ZTtcbnVuaWZvcm0gdmVjNCBiZztcbnVuaWZvcm0gdmVjNCB0aW50O1xuXG52b2lkIG1haW4oKSB7XG5cdGZyYWdDb2xvciA9IHZlYzQoMCwgMCwgMCwgMSk7XG5cblx0dmVjNCB0ZXhlbCA9IHRleGVsRmV0Y2goaW1hZ2UsIGl2ZWMyKHRpbGVzZXRQb3NQeCksIDApO1xuXG5cdGlmIChjb2xvcml6ZSkge1xuXHRcdHRleGVsLnJnYiA9IHRpbnQuYSAqIHRpbnQucmdiICsgKDEuMC10aW50LmEpICogdGV4ZWwucmdiO1xuXHRcdGZyYWdDb2xvci5yZ2IgPSB0ZXhlbC5hKnRleGVsLnJnYiArICgxLjAtdGV4ZWwuYSkqYmcucmdiO1xuXHRcdGZyYWdDb2xvci5hID0gdGV4ZWwuYSArICgxLjAtdGV4ZWwuYSkqYmcuYTtcblx0fSBlbHNlIHtcblx0XHRmcmFnQ29sb3IgPSB0ZXhlbDtcblx0fVxufWAudHJpbSgpO1xuZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbShnbCwgdnNzLCBmc3MpIHtcbiAgICBjb25zdCB2cyA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UodnMsIHZzcyk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcih2cyk7XG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodnMsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyh2cykgfHwgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IGZzID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG4gICAgZ2wuc2hhZGVyU291cmNlKGZzLCBmc3MpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnMpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZzLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFNoYWRlckluZm9Mb2coZnMpIHx8IFwiXCIpO1xuICAgIH1cbiAgICBjb25zdCBwID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwLCB2cyk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHAsIGZzKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwKTtcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocCwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRQcm9ncmFtSW5mb0xvZyhwKSB8fCBcIlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG59XG5mdW5jdGlvbiBjcmVhdGVRdWFkKGdsKSB7XG4gICAgY29uc3QgcG9zID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMSwgMCwgMCwgMSwgMSwgMV0pO1xuICAgIGNvbnN0IGJ1ZiA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBidWYpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBwb3MsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSgwKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKDAsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG59XG5mdW5jdGlvbiBjcmVhdGVUZXh0dXJlKGdsLCBkYXRhKSB7XG4gICAgbGV0IHQgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5SRVBFQVQpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLlJFUEVBVCk7XG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgMCk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcbiAgICByZXR1cm4gdDtcbn1cbmxldCBjb2xvckNhY2hlID0ge307XG5mdW5jdGlvbiBwYXJzZUNvbG9yKGNvbG9yKSB7XG4gICAgaWYgKCEoY29sb3IgaW4gY29sb3JDYWNoZSkpIHtcbiAgICAgICAgbGV0IHBhcnNlZDtcbiAgICAgICAgaWYgKGNvbG9yID09IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgcGFyc2VkID0gWzAsIDAsIDAsIDBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbG9yLmluZGV4T2YoXCJyZ2JhXCIpID4gLTEpIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IChjb2xvci5tYXRjaCgvW1xcZC5dKy9nKSB8fCBbXSkubWFwKE51bWJlcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIHBhcnNlZFtpXSA9IHBhcnNlZFtpXSAvIDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlZCA9IENvbG9yLmZyb21TdHJpbmcoY29sb3IpLm1hcCgkID0+ICQgLyAyNTUpO1xuICAgICAgICAgICAgcGFyc2VkLnB1c2goMSk7XG4gICAgICAgIH1cbiAgICAgICAgY29sb3JDYWNoZVtjb2xvcl0gPSBwYXJzZWQ7XG4gICAgfVxuICAgIHJldHVybiBjb2xvckNhY2hlW2NvbG9yXTtcbn1cbiIsImltcG9ydCBDYW52YXMgZnJvbSBcIi4vY2FudmFzLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBUaWxlIGJhY2tlbmRcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbGUgZXh0ZW5kcyBDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9jb2xvckNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgfVxuICAgIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgbGV0IFt4LCB5LCBjaCwgZmcsIGJnXSA9IGRhdGE7XG4gICAgICAgIGxldCB0aWxlV2lkdGggPSB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aDtcbiAgICAgICAgbGV0IHRpbGVIZWlnaHQgPSB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQ7XG4gICAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudGlsZUNvbG9yaXplKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmNsZWFyUmVjdCh4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICAgIGxldCBmZ3MgPSBbXS5jb25jYXQoZmcpO1xuICAgICAgICBsZXQgYmdzID0gW10uY29uY2F0KGJnKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl9vcHRpb25zLnRpbGVNYXBbY2hhcnNbaV1dO1xuICAgICAgICAgICAgaWYgKCF0aWxlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaGFyIFwiJHtjaGFyc1tpXX1cIiBub3QgZm91bmQgaW4gdGlsZU1hcGApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudGlsZUNvbG9yaXplKSB7IC8vIGFwcGx5IGNvbG9yaXphdGlvblxuICAgICAgICAgICAgICAgIGxldCBjYW52YXMgPSB0aGlzLl9jb2xvckNhbnZhcztcbiAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1vdmVyXCI7XG4gICAgICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBsZXQgZmcgPSBmZ3NbaV07XG4gICAgICAgICAgICAgICAgbGV0IGJnID0gYmdzW2ldO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuX29wdGlvbnMudGlsZVNldCwgdGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LCAwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGlmIChmZyAhPSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBmZztcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcInNvdXJjZS1hdG9wXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGJnICE9IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3ZlclwiO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5kcmF3SW1hZ2UoY2FudmFzLCB4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvLyBubyBjb2xvcml6aW5nLCBlYXN5XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZSh0aGlzLl9vcHRpb25zLnRpbGVTZXQsIHRpbGVbMF0sIHRpbGVbMV0sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCwgeCAqIHRpbGVXaWR0aCwgeSAqIHRpbGVIZWlnaHQsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCk7XG4gICAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgfVxuICAgIGNvbXB1dGVGb250U2l6ZSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGlsZSBiYWNrZW5kIGRvZXMgbm90IHVuZGVyc3RhbmQgZm9udCBzaXplXCIpO1xuICAgIH1cbiAgICBfbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiBbTWF0aC5mbG9vcih4IC8gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpLCBNYXRoLmZsb29yKHkgLyB0aGlzLl9vcHRpb25zLnRpbGVIZWlnaHQpXTtcbiAgICB9XG4gICAgX3VwZGF0ZVNpemUoKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgICB0aGlzLl9jdHguY2FudmFzLndpZHRoID0gb3B0cy53aWR0aCAqIG9wdHMudGlsZVdpZHRoO1xuICAgICAgICB0aGlzLl9jdHguY2FudmFzLmhlaWdodCA9IG9wdHMuaGVpZ2h0ICogb3B0cy50aWxlSGVpZ2h0O1xuICAgICAgICB0aGlzLl9jb2xvckNhbnZhcy53aWR0aCA9IG9wdHMudGlsZVdpZHRoO1xuICAgICAgICB0aGlzLl9jb2xvckNhbnZhcy5oZWlnaHQgPSBvcHRzLnRpbGVIZWlnaHQ7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAY2xhc3MgQXN5bmNocm9ub3VzIG1haW4gbG9vcFxuICogQHBhcmFtIHtST1QuU2NoZWR1bGVyfSBzY2hlZHVsZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5naW5lIHtcbiAgICBjb25zdHJ1Y3RvcihzY2hlZHVsZXIpIHtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGVyID0gc2NoZWR1bGVyO1xuICAgICAgICB0aGlzLl9sb2NrID0gMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnQgdGhlIG1haW4gbG9vcC4gV2hlbiB0aGlzIGNhbGwgcmV0dXJucywgdGhlIGxvb3AgaXMgbG9ja2VkLlxuICAgICAqL1xuICAgIHN0YXJ0KCkgeyByZXR1cm4gdGhpcy51bmxvY2soKTsgfVxuICAgIC8qKlxuICAgICAqIEludGVycnVwdCB0aGUgZW5naW5lIGJ5IGFuIGFzeW5jaHJvbm91cyBhY3Rpb25cbiAgICAgKi9cbiAgICBsb2NrKCkge1xuICAgICAgICB0aGlzLl9sb2NrKys7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXN1bWUgZXhlY3V0aW9uIChwYXVzZWQgYnkgYSBwcmV2aW91cyBsb2NrKVxuICAgICAqL1xuICAgIHVubG9jaygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgdW5sb2NrIHVubG9ja2VkIGVuZ2luZVwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2NrLS07XG4gICAgICAgIHdoaWxlICghdGhpcy5fbG9jaykge1xuICAgICAgICAgICAgbGV0IGFjdG9yID0gdGhpcy5fc2NoZWR1bGVyLm5leHQoKTtcbiAgICAgICAgICAgIGlmICghYWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NrKCk7XG4gICAgICAgICAgICB9IC8qIG5vIGFjdG9ycyAqL1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGFjdG9yLmFjdCgpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQudGhlbikgeyAvKiBhY3RvciByZXR1cm5lZCBhIFwidGhlbmFibGVcIiwgbG9va3MgbGlrZSBhIFByb21pc2UgKi9cbiAgICAgICAgICAgICAgICB0aGlzLmxvY2soKTtcbiAgICAgICAgICAgICAgICByZXN1bHQudGhlbih0aGlzLnVubG9jay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBNaW5IZWFwIH0gZnJvbSBcIi4vTWluSGVhcFwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRRdWV1ZSB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEdlbmVyaWMgZXZlbnQgcXVldWU6IHN0b3JlcyBldmVudHMgYW5kIHJldHJpZXZlcyB0aGVtIGJhc2VkIG9uIHRoZWlyIHRpbWVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fdGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBNaW5IZWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IEVsYXBzZWQgdGltZVxuICAgICAqL1xuICAgIGdldFRpbWUoKSB7IHJldHVybiB0aGlzLl90aW1lOyB9XG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIHNjaGVkdWxlZCBldmVudHNcbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IE1pbkhlYXAoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7P30gZXZlbnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGltZVxuICAgICAqL1xuICAgIGFkZChldmVudCwgdGltZSkge1xuICAgICAgICB0aGlzLl9ldmVudHMucHVzaChldmVudCwgdGltZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvY2F0ZXMgdGhlIG5lYXJlc3QgZXZlbnQsIGFkdmFuY2VzIHRpbWUgaWYgbmVjZXNzYXJ5LiBSZXR1cm5zIHRoYXQgZXZlbnQgYW5kIHJlbW92ZXMgaXQgZnJvbSB0aGUgcXVldWUuXG4gICAgICogQHJldHVybnMgez8gfHwgbnVsbH0gVGhlIGV2ZW50IHByZXZpb3VzbHkgYWRkZWQgYnkgYWRkRXZlbnQsIG51bGwgaWYgbm8gZXZlbnQgYXZhaWxhYmxlXG4gICAgICovXG4gICAgZ2V0KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2V2ZW50cy5sZW4oKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHsga2V5OiB0aW1lLCB2YWx1ZTogZXZlbnQgfSA9IHRoaXMuX2V2ZW50cy5wb3AoKTtcbiAgICAgICAgaWYgKHRpbWUgPiAwKSB7IC8qIGFkdmFuY2UgKi9cbiAgICAgICAgICAgIHRoaXMuX3RpbWUgKz0gdGltZTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5zaGlmdCgtdGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRpbWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiBldmVudFxuICAgICAqIEBwYXJhbSB7P30gZXZlbnRcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSB0aW1lXG4gICAgICovXG4gICAgZ2V0RXZlbnRUaW1lKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHIgPSB0aGlzLl9ldmVudHMuZmluZChldmVudCk7XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICBjb25zdCB7IGtleSB9ID0gcjtcbiAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFuIGV2ZW50IGZyb20gdGhlIHF1ZXVlXG4gICAgICogQHBhcmFtIHs/fSBldmVudFxuICAgICAqIEByZXR1cm5zIHtib29sfSBzdWNjZXNzP1xuICAgICAqL1xuICAgIHJlbW92ZShldmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzLnJlbW92ZShldmVudCk7XG4gICAgfVxuICAgIDtcbn1cbiIsImltcG9ydCBGT1YgZnJvbSBcIi4vZm92LmpzXCI7XG4vKipcbiAqIEBjbGFzcyBEaXNjcmV0ZSBzaGFkb3djYXN0aW5nIGFsZ29yaXRobS4gT2Jzb2xldGVkIGJ5IFByZWNpc2Ugc2hhZG93Y2FzdGluZy5cbiAqIEBhdWdtZW50cyBST1QuRk9WXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc2NyZXRlU2hhZG93Y2FzdGluZyBleHRlbmRzIEZPViB7XG4gICAgY29tcHV0ZSh4LCB5LCBSLCBjYWxsYmFjaykge1xuICAgICAgICAvKiB0aGlzIHBsYWNlIGlzIGFsd2F5cyB2aXNpYmxlICovXG4gICAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgICAvKiBzdGFuZGluZyBpbiBhIGRhcmsgcGxhY2UuIEZJWE1FIGlzIHRoaXMgYSBnb29kIGlkZWE/ICAqL1xuICAgICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKHgsIHkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLyogc3RhcnQgYW5kIGVuZCBhbmdsZXMgKi9cbiAgICAgICAgbGV0IERBVEEgPSBbXTtcbiAgICAgICAgbGV0IEEsIEIsIGN4LCBjeSwgYmxvY2tzO1xuICAgICAgICAvKiBhbmFseXplIHN1cnJvdW5kaW5nIGNlbGxzIGluIGNvbmNlbnRyaWMgcmluZ3MsIHN0YXJ0aW5nIGZyb20gdGhlIGNlbnRlciAqL1xuICAgICAgICBmb3IgKGxldCByID0gMTsgciA8PSBSOyByKyspIHtcbiAgICAgICAgICAgIGxldCBuZWlnaGJvcnMgPSB0aGlzLl9nZXRDaXJjbGUoeCwgeSwgcik7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSAzNjAgLyBuZWlnaGJvcnMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjeCA9IG5laWdoYm9yc1tpXVswXTtcbiAgICAgICAgICAgICAgICBjeSA9IG5laWdoYm9yc1tpXVsxXTtcbiAgICAgICAgICAgICAgICBBID0gYW5nbGUgKiAoaSAtIDAuNSk7XG4gICAgICAgICAgICAgICAgQiA9IEEgKyBhbmdsZTtcbiAgICAgICAgICAgICAgICBibG9ja3MgPSAhdGhpcy5fbGlnaHRQYXNzZXMoY3gsIGN5KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlzaWJsZUNvb3JkcyhNYXRoLmZsb29yKEEpLCBNYXRoLmNlaWwoQiksIGJsb2NrcywgREFUQSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soY3gsIGN5LCByLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKERBVEEubGVuZ3RoID09IDIgJiYgREFUQVswXSA9PSAwICYmIERBVEFbMV0gPT0gMzYwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IC8qIGN1dG9mZj8gKi9cbiAgICAgICAgICAgIH0gLyogZm9yIGFsbCBjZWxscyBpbiB0aGlzIHJpbmcgKi9cbiAgICAgICAgfSAvKiBmb3IgYWxsIHJpbmdzICovXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50fSBBIHN0YXJ0IGFuZ2xlXG4gICAgICogQHBhcmFtIHtpbnR9IEIgZW5kIGFuZ2xlXG4gICAgICogQHBhcmFtIHtib29sfSBibG9ja3MgRG9lcyBjdXJyZW50IGNlbGwgYmxvY2sgdmlzaWJpbGl0eT9cbiAgICAgKiBAcGFyYW0ge2ludFtdW119IERBVEEgc2hhZG93ZWQgYW5nbGUgcGFpcnNcbiAgICAgKi9cbiAgICBfdmlzaWJsZUNvb3JkcyhBLCBCLCBibG9ja3MsIERBVEEpIHtcbiAgICAgICAgaWYgKEEgPCAwKSB7XG4gICAgICAgICAgICBsZXQgdjEgPSB0aGlzLl92aXNpYmxlQ29vcmRzKDAsIEIsIGJsb2NrcywgREFUQSk7XG4gICAgICAgICAgICBsZXQgdjIgPSB0aGlzLl92aXNpYmxlQ29vcmRzKDM2MCArIEEsIDM2MCwgYmxvY2tzLCBEQVRBKTtcbiAgICAgICAgICAgIHJldHVybiB2MSB8fCB2MjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB3aGlsZSAoaW5kZXggPCBEQVRBLmxlbmd0aCAmJiBEQVRBW2luZGV4XSA8IEEpIHtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ID09IERBVEEubGVuZ3RoKSB7IC8qIGNvbXBsZXRlbHkgbmV3IHNoYWRvdyAqL1xuICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgIERBVEEucHVzaChBLCBCKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGlmIChpbmRleCAlIDIpIHsgLyogdGhpcyBzaGFkb3cgc3RhcnRzIGluIGFuIGV4aXN0aW5nIHNoYWRvdywgb3Igd2l0aGluIGl0cyBlbmRpbmcgYm91bmRhcnkgKi9cbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA8IERBVEEubGVuZ3RoICYmIERBVEFbaW5kZXhdIDwgQikge1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb3VudCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCAlIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQsIEIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvKiB0aGlzIHNoYWRvdyBzdGFydHMgb3V0c2lkZSBhbiBleGlzdGluZyBzaGFkb3csIG9yIHdpdGhpbiBhIHN0YXJ0aW5nIGJvdW5kYXJ5ICovXG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPCBEQVRBLmxlbmd0aCAmJiBEQVRBW2luZGV4XSA8IEIpIHtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiB2aXNpYmxlIHdoZW4gb3V0c2lkZSBhbiBleGlzdGluZyBzaGFkb3csIG9yIHdoZW4gb3ZlcmxhcHBpbmcgKi9cbiAgICAgICAgICAgIGlmIChBID09IERBVEFbaW5kZXggLSBjb3VudF0gJiYgY291bnQgPT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgJSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIERBVEEuc3BsaWNlKGluZGV4IC0gY291bnQsIGNvdW50LCBBKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIERBVEEuc3BsaWNlKGluZGV4IC0gY291bnQsIGNvdW50LCBBLCBCKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IERJUlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG47XG47XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGT1Yge1xuICAgIC8qKlxuICAgICAqIEBjbGFzcyBBYnN0cmFjdCBGT1YgYWxnb3JpdGhtXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlnaHRQYXNzZXNDYWxsYmFjayBEb2VzIHRoZSBsaWdodCBwYXNzIHRocm91Z2ggeCx5P1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAgICAgKiBAcGFyYW0ge2ludH0gW29wdGlvbnMudG9wb2xvZ3k9OF0gNC82LzhcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihsaWdodFBhc3Nlc0NhbGxiYWNrLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5fbGlnaHRQYXNzZXMgPSBsaWdodFBhc3Nlc0NhbGxiYWNrO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7IHRvcG9sb2d5OiA4IH0sIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYWxsIG5laWdoYm9ycyBpbiBhIGNvbmNlbnRyaWMgcmluZ1xuICAgICAqIEBwYXJhbSB7aW50fSBjeCBjZW50ZXIteFxuICAgICAqIEBwYXJhbSB7aW50fSBjeSBjZW50ZXIteVxuICAgICAqIEBwYXJhbSB7aW50fSByIHJhbmdlXG4gICAgICovXG4gICAgX2dldENpcmNsZShjeCwgY3ksIHIpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBsZXQgZGlycywgY291bnRGYWN0b3IsIHN0YXJ0T2Zmc2V0O1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kpIHtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBjb3VudEZhY3RvciA9IDE7XG4gICAgICAgICAgICAgICAgc3RhcnRPZmZzZXQgPSBbMCwgMV07XG4gICAgICAgICAgICAgICAgZGlycyA9IFtcbiAgICAgICAgICAgICAgICAgICAgRElSU1s4XVs3XSxcbiAgICAgICAgICAgICAgICAgICAgRElSU1s4XVsxXSxcbiAgICAgICAgICAgICAgICAgICAgRElSU1s4XVszXSxcbiAgICAgICAgICAgICAgICAgICAgRElSU1s4XVs1XVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgZGlycyA9IERJUlNbNl07XG4gICAgICAgICAgICAgICAgY291bnRGYWN0b3IgPSAxO1xuICAgICAgICAgICAgICAgIHN0YXJ0T2Zmc2V0ID0gWy0xLCAxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICBkaXJzID0gRElSU1s0XTtcbiAgICAgICAgICAgICAgICBjb3VudEZhY3RvciA9IDI7XG4gICAgICAgICAgICAgICAgc3RhcnRPZmZzZXQgPSBbLTEsIDFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbmNvcnJlY3QgdG9wb2xvZ3kgZm9yIEZPViBjb21wdXRhdGlvblwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvKiBzdGFydGluZyBuZWlnaGJvciAqL1xuICAgICAgICBsZXQgeCA9IGN4ICsgc3RhcnRPZmZzZXRbMF0gKiByO1xuICAgICAgICBsZXQgeSA9IGN5ICsgc3RhcnRPZmZzZXRbMV0gKiByO1xuICAgICAgICAvKiBjaXJjbGUgKi9cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHIgKiBjb3VudEZhY3RvcjsgaisrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goW3gsIHldKTtcbiAgICAgICAgICAgICAgICB4ICs9IGRpcnNbaV1bMF07XG4gICAgICAgICAgICAgICAgeSArPSBkaXJzW2ldWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IERpc2NyZXRlU2hhZG93Y2FzdGluZyBmcm9tIFwiLi9kaXNjcmV0ZS1zaGFkb3djYXN0aW5nLmpzXCI7XG5pbXBvcnQgUHJlY2lzZVNoYWRvd2Nhc3RpbmcgZnJvbSBcIi4vcHJlY2lzZS1zaGFkb3djYXN0aW5nLmpzXCI7XG5pbXBvcnQgUmVjdXJzaXZlU2hhZG93Y2FzdGluZyBmcm9tIFwiLi9yZWN1cnNpdmUtc2hhZG93Y2FzdGluZy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgeyBEaXNjcmV0ZVNoYWRvd2Nhc3RpbmcsIFByZWNpc2VTaGFkb3djYXN0aW5nLCBSZWN1cnNpdmVTaGFkb3djYXN0aW5nIH07XG4iLCJpbXBvcnQgRk9WIGZyb20gXCIuL2Zvdi5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgUHJlY2lzZSBzaGFkb3djYXN0aW5nIGFsZ29yaXRobVxuICogQGF1Z21lbnRzIFJPVC5GT1ZcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlY2lzZVNoYWRvd2Nhc3RpbmcgZXh0ZW5kcyBGT1Yge1xuICAgIGNvbXB1dGUoeCwgeSwgUiwgY2FsbGJhY2spIHtcbiAgICAgICAgLyogdGhpcyBwbGFjZSBpcyBhbHdheXMgdmlzaWJsZSAqL1xuICAgICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICAgICAgLyogc3RhbmRpbmcgaW4gYSBkYXJrIHBsYWNlLiBGSVhNRSBpcyB0aGlzIGEgZ29vZCBpZGVhPyAgKi9cbiAgICAgICAgaWYgKCF0aGlzLl9saWdodFBhc3Nlcyh4LCB5KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8qIGxpc3Qgb2YgYWxsIHNoYWRvd3MgKi9cbiAgICAgICAgbGV0IFNIQURPV1MgPSBbXTtcbiAgICAgICAgbGV0IGN4LCBjeSwgYmxvY2tzLCBBMSwgQTIsIHZpc2liaWxpdHk7XG4gICAgICAgIC8qIGFuYWx5emUgc3Vycm91bmRpbmcgY2VsbHMgaW4gY29uY2VudHJpYyByaW5ncywgc3RhcnRpbmcgZnJvbSB0aGUgY2VudGVyICovXG4gICAgICAgIGZvciAobGV0IHIgPSAxOyByIDw9IFI7IHIrKykge1xuICAgICAgICAgICAgbGV0IG5laWdoYm9ycyA9IHRoaXMuX2dldENpcmNsZSh4LCB5LCByKTtcbiAgICAgICAgICAgIGxldCBuZWlnaGJvckNvdW50ID0gbmVpZ2hib3JzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVpZ2hib3JDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3ggPSBuZWlnaGJvcnNbaV1bMF07XG4gICAgICAgICAgICAgICAgY3kgPSBuZWlnaGJvcnNbaV1bMV07XG4gICAgICAgICAgICAgICAgLyogc2hpZnQgaGFsZi1hbi1hbmdsZSBiYWNrd2FyZHMgdG8gbWFpbnRhaW4gY29uc2lzdGVuY3kgb2YgMC10aCBjZWxscyAqL1xuICAgICAgICAgICAgICAgIEExID0gW2kgPyAyICogaSAtIDEgOiAyICogbmVpZ2hib3JDb3VudCAtIDEsIDIgKiBuZWlnaGJvckNvdW50XTtcbiAgICAgICAgICAgICAgICBBMiA9IFsyICogaSArIDEsIDIgKiBuZWlnaGJvckNvdW50XTtcbiAgICAgICAgICAgICAgICBibG9ja3MgPSAhdGhpcy5fbGlnaHRQYXNzZXMoY3gsIGN5KTtcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhjeCwgY3ksIHIsIHZpc2liaWxpdHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoU0hBRE9XUy5sZW5ndGggPT0gMiAmJiBTSEFET1dTWzBdWzBdID09IDAgJiYgU0hBRE9XU1sxXVswXSA9PSBTSEFET1dTWzFdWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IC8qIGN1dG9mZj8gKi9cbiAgICAgICAgICAgIH0gLyogZm9yIGFsbCBjZWxscyBpbiB0aGlzIHJpbmcgKi9cbiAgICAgICAgfSAvKiBmb3IgYWxsIHJpbmdzICovXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW50WzJdfSBBMSBhcmMgc3RhcnRcbiAgICAgKiBAcGFyYW0ge2ludFsyXX0gQTIgYXJjIGVuZFxuICAgICAqIEBwYXJhbSB7Ym9vbH0gYmxvY2tzIERvZXMgY3VycmVudCBhcmMgYmxvY2sgdmlzaWJpbGl0eT9cbiAgICAgKiBAcGFyYW0ge2ludFtdW119IFNIQURPV1MgbGlzdCBvZiBhY3RpdmUgc2hhZG93c1xuICAgICAqL1xuICAgIF9jaGVja1Zpc2liaWxpdHkoQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpIHtcbiAgICAgICAgaWYgKEExWzBdID4gQTJbMF0pIHsgLyogc3BsaXQgaW50byB0d28gc3ViLWFyY3MgKi9cbiAgICAgICAgICAgIGxldCB2MSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShBMSwgW0ExWzFdLCBBMVsxXV0sIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICBsZXQgdjIgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoWzAsIDFdLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgICAgIHJldHVybiAodjEgKyB2MikgLyAyO1xuICAgICAgICB9XG4gICAgICAgIC8qIGluZGV4MTogZmlyc3Qgc2hhZG93ID49IEExICovXG4gICAgICAgIGxldCBpbmRleDEgPSAwLCBlZGdlMSA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoaW5kZXgxIDwgU0hBRE9XUy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBvbGQgPSBTSEFET1dTW2luZGV4MV07XG4gICAgICAgICAgICBsZXQgZGlmZiA9IG9sZFswXSAqIEExWzFdIC0gQTFbMF0gKiBvbGRbMV07XG4gICAgICAgICAgICBpZiAoZGlmZiA+PSAwKSB7IC8qIG9sZCA+PSBBMSAqL1xuICAgICAgICAgICAgICAgIGlmIChkaWZmID09IDAgJiYgIShpbmRleDEgJSAyKSkge1xuICAgICAgICAgICAgICAgICAgICBlZGdlMSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXgxKys7XG4gICAgICAgIH1cbiAgICAgICAgLyogaW5kZXgyOiBsYXN0IHNoYWRvdyA8PSBBMiAqL1xuICAgICAgICBsZXQgaW5kZXgyID0gU0hBRE9XUy5sZW5ndGgsIGVkZ2UyID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChpbmRleDItLSkge1xuICAgICAgICAgICAgbGV0IG9sZCA9IFNIQURPV1NbaW5kZXgyXTtcbiAgICAgICAgICAgIGxldCBkaWZmID0gQTJbMF0gKiBvbGRbMV0gLSBvbGRbMF0gKiBBMlsxXTtcbiAgICAgICAgICAgIGlmIChkaWZmID49IDApIHsgLyogb2xkIDw9IEEyICovXG4gICAgICAgICAgICAgICAgaWYgKGRpZmYgPT0gMCAmJiAoaW5kZXgyICUgMikpIHtcbiAgICAgICAgICAgICAgICAgICAgZWRnZTIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgdmlzaWJsZSA9IHRydWU7XG4gICAgICAgIGlmIChpbmRleDEgPT0gaW5kZXgyICYmIChlZGdlMSB8fCBlZGdlMikpIHsgLyogc3Vic2V0IG9mIGV4aXN0aW5nIHNoYWRvdywgb25lIG9mIHRoZSBlZGdlcyBtYXRjaCAqL1xuICAgICAgICAgICAgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVkZ2UxICYmIGVkZ2UyICYmIGluZGV4MSArIDEgPT0gaW5kZXgyICYmIChpbmRleDIgJSAyKSkgeyAvKiBjb21wbGV0ZWx5IGVxdWl2YWxlbnQgd2l0aCBleGlzdGluZyBzaGFkb3cgKi9cbiAgICAgICAgICAgIHZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleDEgPiBpbmRleDIgJiYgKGluZGV4MSAlIDIpKSB7IC8qIHN1YnNldCBvZiBleGlzdGluZyBzaGFkb3csIG5vdCB0b3VjaGluZyAqL1xuICAgICAgICAgICAgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gLyogZmFzdCBjYXNlOiBub3QgdmlzaWJsZSAqL1xuICAgICAgICBsZXQgdmlzaWJsZUxlbmd0aDtcbiAgICAgICAgLyogY29tcHV0ZSB0aGUgbGVuZ3RoIG9mIHZpc2libGUgYXJjLCBhZGp1c3QgbGlzdCBvZiBzaGFkb3dzIChpZiBibG9ja2luZykgKi9cbiAgICAgICAgbGV0IHJlbW92ZSA9IGluZGV4MiAtIGluZGV4MSArIDE7XG4gICAgICAgIGlmIChyZW1vdmUgJSAyKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXgxICUgMikgeyAvKiBmaXJzdCBlZGdlIHdpdGhpbiBleGlzdGluZyBzaGFkb3csIHNlY29uZCBvdXRzaWRlICovXG4gICAgICAgICAgICAgICAgbGV0IFAgPSBTSEFET1dTW2luZGV4MV07XG4gICAgICAgICAgICAgICAgdmlzaWJsZUxlbmd0aCA9IChBMlswXSAqIFBbMV0gLSBQWzBdICogQTJbMV0pIC8gKFBbMV0gKiBBMlsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSwgQTIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvKiBzZWNvbmQgZWRnZSB3aXRoaW4gZXhpc3Rpbmcgc2hhZG93LCBmaXJzdCBvdXRzaWRlICovXG4gICAgICAgICAgICAgICAgbGV0IFAgPSBTSEFET1dTW2luZGV4Ml07XG4gICAgICAgICAgICAgICAgdmlzaWJsZUxlbmd0aCA9IChQWzBdICogQTFbMV0gLSBBMVswXSAqIFBbMV0pIC8gKEExWzFdICogUFsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSwgQTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbmRleDEgJSAyKSB7IC8qIGJvdGggZWRnZXMgd2l0aGluIGV4aXN0aW5nIHNoYWRvd3MgKi9cbiAgICAgICAgICAgICAgICBsZXQgUDEgPSBTSEFET1dTW2luZGV4MV07XG4gICAgICAgICAgICAgICAgbGV0IFAyID0gU0hBRE9XU1tpbmRleDJdO1xuICAgICAgICAgICAgICAgIHZpc2libGVMZW5ndGggPSAoUDJbMF0gKiBQMVsxXSAtIFAxWzBdICogUDJbMV0pIC8gKFAxWzFdICogUDJbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoaW5kZXgxLCByZW1vdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvKiBib3RoIGVkZ2VzIG91dHNpZGUgZXhpc3Rpbmcgc2hhZG93cyAqL1xuICAgICAgICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoaW5kZXgxLCByZW1vdmUsIEExLCBBMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAxOyAvKiB3aG9sZSBhcmMgdmlzaWJsZSEgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgYXJjTGVuZ3RoID0gKEEyWzBdICogQTFbMV0gLSBBMVswXSAqIEEyWzFdKSAvIChBMVsxXSAqIEEyWzFdKTtcbiAgICAgICAgcmV0dXJuIHZpc2libGVMZW5ndGggLyBhcmNMZW5ndGg7XG4gICAgfVxufVxuIiwiaW1wb3J0IEZPViBmcm9tIFwiLi9mb3YuanNcIjtcbi8qKiBPY3RhbnRzIHVzZWQgZm9yIHRyYW5zbGF0aW5nIHJlY3Vyc2l2ZSBzaGFkb3djYXN0aW5nIG9mZnNldHMgKi9cbmNvbnN0IE9DVEFOVFMgPSBbXG4gICAgWy0xLCAwLCAwLCAxXSxcbiAgICBbMCwgLTEsIDEsIDBdLFxuICAgIFswLCAtMSwgLTEsIDBdLFxuICAgIFstMSwgMCwgMCwgLTFdLFxuICAgIFsxLCAwLCAwLCAtMV0sXG4gICAgWzAsIDEsIC0xLCAwXSxcbiAgICBbMCwgMSwgMSwgMF0sXG4gICAgWzEsIDAsIDAsIDFdXG5dO1xuLyoqXG4gKiBAY2xhc3MgUmVjdXJzaXZlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtXG4gKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyA0LzggdG9wb2xvZ2llcywgbm90IGhleGFnb25hbC5cbiAqIEJhc2VkIG9uIFBldGVyIEhhcmtpbnMnIGltcGxlbWVudGF0aW9uIG9mIEJqw7ZybiBCZXJnc3Ryw7ZtJ3MgYWxnb3JpdGhtIGRlc2NyaWJlZCBoZXJlOiBodHRwOi8vd3d3LnJvZ3VlYmFzaW4uY29tL2luZGV4LnBocD90aXRsZT1GT1ZfdXNpbmdfcmVjdXJzaXZlX3NoYWRvd2Nhc3RpbmdcbiAqIEBhdWdtZW50cyBST1QuRk9WXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcgZXh0ZW5kcyBGT1Yge1xuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdmlzaWJpbGl0eSBmb3IgYSAzNjAtZGVncmVlIGNpcmNsZVxuICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBjb21wdXRlKHgsIHksIFIsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vWW91IGNhbiBhbHdheXMgc2VlIHlvdXIgb3duIHRpbGVcbiAgICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT0NUQU5UUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbaV0sIFIsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHZpc2liaWxpdHkgZm9yIGEgMTgwLWRlZ3JlZSBhcmNcbiAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7aW50fSBkaXIgRGlyZWN0aW9uIHRvIGxvb2sgaW4gKGV4cHJlc3NlZCBpbiBhIFJPVC5ESVJTIHZhbHVlKTtcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIGNvbXB1dGUxODAoeCwgeSwgUiwgZGlyLCBjYWxsYmFjaykge1xuICAgICAgICAvL1lvdSBjYW4gYWx3YXlzIHNlZSB5b3VyIG93biB0aWxlXG4gICAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgICBsZXQgcHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMSArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyBvY3RhbnQgdG8gcmVuZGVyIGEgZnVsbCAxODAgZGVncmVlc1xuICAgICAgICBsZXQgbmV4dFByZXZpb3VzT2N0YW50ID0gKGRpciAtIDIgKyA4KSAlIDg7IC8vTmVlZCB0byByZXRyaWV2ZSB0aGUgcHJldmlvdXMgdHdvIG9jdGFudHMgdG8gcmVuZGVyIGEgZnVsbCAxODAgZGVncmVlc1xuICAgICAgICBsZXQgbmV4dE9jdGFudCA9IChkaXIgKyAxICsgOCkgJSA4OyAvL05lZWQgdG8gZ3JhYiB0byBuZXh0IG9jdGFudCB0byByZW5kZXIgYSBmdWxsIDE4MCBkZWdyZWVzXG4gICAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW25leHRQcmV2aW91c09jdGFudF0sIFIsIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbcHJldmlvdXNPY3RhbnRdLCBSLCBjYWxsYmFjayk7XG4gICAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW2Rpcl0sIFIsIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbbmV4dE9jdGFudF0sIFIsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgO1xuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdmlzaWJpbGl0eSBmb3IgYSA5MC1kZWdyZWUgYXJjXG4gICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2ludH0gZGlyIERpcmVjdGlvbiB0byBsb29rIGluIChleHByZXNzZWQgaW4gYSBST1QuRElSUyB2YWx1ZSk7XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBjb21wdXRlOTAoeCwgeSwgUiwgZGlyLCBjYWxsYmFjaykge1xuICAgICAgICAvL1lvdSBjYW4gYWx3YXlzIHNlZSB5b3VyIG93biB0aWxlXG4gICAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgICBsZXQgcHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMSArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyBvY3RhbnQgdG8gcmVuZGVyIGEgZnVsbCA5MCBkZWdyZWVzXG4gICAgICAgIHRoaXMuX3JlbmRlck9jdGFudCh4LCB5LCBPQ1RBTlRTW2Rpcl0sIFIsIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbcHJldmlvdXNPY3RhbnRdLCBSLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciBvbmUgb2N0YW50ICg0NS1kZWdyZWUgYXJjKSBvZiB0aGUgdmlld3NoZWRcbiAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICogQHBhcmFtIHtpbnR9IG9jdGFudCBPY3RhbnQgdG8gYmUgcmVuZGVyZWRcbiAgICAgKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBfcmVuZGVyT2N0YW50KHgsIHksIG9jdGFudCwgUiwgY2FsbGJhY2spIHtcbiAgICAgICAgLy9SYWRpdXMgaW5jcmVtZW50ZWQgYnkgMSB0byBwcm92aWRlIHNhbWUgY292ZXJhZ2UgYXJlYSBhcyBvdGhlciBzaGFkb3djYXN0aW5nIHJhZGl1c2VzXG4gICAgICAgIHRoaXMuX2Nhc3RWaXNpYmlsaXR5KHgsIHksIDEsIDEuMCwgMC4wLCBSICsgMSwgb2N0YW50WzBdLCBvY3RhbnRbMV0sIG9jdGFudFsyXSwgb2N0YW50WzNdLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFjdHVhbGx5IGNhbGN1bGF0ZXMgdGhlIHZpc2liaWxpdHlcbiAgICAgKiBAcGFyYW0ge2ludH0gc3RhcnRYIFRoZSBzdGFydGluZyBYIGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0ge2ludH0gc3RhcnRZIFRoZSBzdGFydGluZyBZIGNvb3JkaW5hdGVcbiAgICAgKiBAcGFyYW0ge2ludH0gcm93IFRoZSByb3cgdG8gcmVuZGVyXG4gICAgICogQHBhcmFtIHtmbG9hdH0gdmlzU2xvcGVTdGFydCBUaGUgc2xvcGUgdG8gc3RhcnQgYXRcbiAgICAgKiBAcGFyYW0ge2Zsb2F0fSB2aXNTbG9wZUVuZCBUaGUgc2xvcGUgdG8gZW5kIGF0XG4gICAgICogQHBhcmFtIHtpbnR9IHJhZGl1cyBUaGUgcmFkaXVzIHRvIHJlYWNoIG91dCB0b1xuICAgICAqIEBwYXJhbSB7aW50fSB4eFxuICAgICAqIEBwYXJhbSB7aW50fSB4eVxuICAgICAqIEBwYXJhbSB7aW50fSB5eFxuICAgICAqIEBwYXJhbSB7aW50fSB5eVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byB1c2Ugd2hlbiB3ZSBoaXQgYSBibG9jayB0aGF0IGlzIHZpc2libGVcbiAgICAgKi9cbiAgICBfY2FzdFZpc2liaWxpdHkoc3RhcnRYLCBzdGFydFksIHJvdywgdmlzU2xvcGVTdGFydCwgdmlzU2xvcGVFbmQsIHJhZGl1cywgeHgsIHh5LCB5eCwgeXksIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh2aXNTbG9wZVN0YXJ0IDwgdmlzU2xvcGVFbmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gcm93OyBpIDw9IHJhZGl1czsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZHggPSAtaSAtIDE7XG4gICAgICAgICAgICBsZXQgZHkgPSAtaTtcbiAgICAgICAgICAgIGxldCBibG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgbmV3U3RhcnQgPSAwO1xuICAgICAgICAgICAgLy8nUm93JyBjb3VsZCBiZSBjb2x1bW4sIG5hbWVzIGhlcmUgYXNzdW1lIG9jdGFudCAwIGFuZCB3b3VsZCBiZSBmbGlwcGVkIGZvciBoYWxmIHRoZSBvY3RhbnRzXG4gICAgICAgICAgICB3aGlsZSAoZHggPD0gMCkge1xuICAgICAgICAgICAgICAgIGR4ICs9IDE7XG4gICAgICAgICAgICAgICAgLy9UcmFuc2xhdGUgZnJvbSByZWxhdGl2ZSBjb29yZGluYXRlcyB0byBtYXAgY29vcmRpbmF0ZXNcbiAgICAgICAgICAgICAgICBsZXQgbWFwWCA9IHN0YXJ0WCArIGR4ICogeHggKyBkeSAqIHh5O1xuICAgICAgICAgICAgICAgIGxldCBtYXBZID0gc3RhcnRZICsgZHggKiB5eCArIGR5ICogeXk7XG4gICAgICAgICAgICAgICAgLy9SYW5nZSBvZiB0aGUgcm93XG4gICAgICAgICAgICAgICAgbGV0IHNsb3BlU3RhcnQgPSAoZHggLSAwLjUpIC8gKGR5ICsgMC41KTtcbiAgICAgICAgICAgICAgICBsZXQgc2xvcGVFbmQgPSAoZHggKyAwLjUpIC8gKGR5IC0gMC41KTtcbiAgICAgICAgICAgICAgICAvL0lnbm9yZSBpZiBub3QgeWV0IGF0IGxlZnQgZWRnZSBvZiBPY3RhbnRcbiAgICAgICAgICAgICAgICBpZiAoc2xvcGVFbmQgPiB2aXNTbG9wZVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0RvbmUgaWYgcGFzdCByaWdodCBlZGdlXG4gICAgICAgICAgICAgICAgaWYgKHNsb3BlU3RhcnQgPCB2aXNTbG9wZUVuZCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9JZiBpdCdzIGluIHJhbmdlLCBpdCdzIHZpc2libGVcbiAgICAgICAgICAgICAgICBpZiAoKGR4ICogZHggKyBkeSAqIGR5KSA8IChyYWRpdXMgKiByYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG1hcFgsIG1hcFksIGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWJsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9JZiB0aWxlIGlzIGEgYmxvY2tpbmcgdGlsZSwgY2FzdCBhcm91bmQgaXRcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9saWdodFBhc3NlcyhtYXBYLCBtYXBZKSAmJiBpIDwgcmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nhc3RWaXNpYmlsaXR5KHN0YXJ0WCwgc3RhcnRZLCBpICsgMSwgdmlzU2xvcGVTdGFydCwgc2xvcGVTdGFydCwgcmFkaXVzLCB4eCwgeHksIHl4LCB5eSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U3RhcnQgPSBzbG9wZUVuZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9LZWVwIG5hcnJvd2luZyBpZiBzY2FubmluZyBhY3Jvc3MgYSBibG9ja1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKG1hcFgsIG1hcFkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTdGFydCA9IHNsb3BlRW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9CbG9jayBoYXMgZW5kZWRcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2aXNTbG9wZVN0YXJ0ID0gbmV3U3RhcnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJsb2NrZWQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgUk5HIH0gZnJvbSBcIi4vcm5nLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIERpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5L2Rpc3BsYXkuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3RyaW5nR2VuZXJhdG9yIH0gZnJvbSBcIi4vc3RyaW5nZ2VuZXJhdG9yLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEV2ZW50UXVldWUgfSBmcm9tIFwiLi9ldmVudHF1ZXVlLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNjaGVkdWxlciB9IGZyb20gXCIuL3NjaGVkdWxlci9pbmRleC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBGT1YgfSBmcm9tIFwiLi9mb3YvaW5kZXguanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTWFwIH0gZnJvbSBcIi4vbWFwL2luZGV4LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5vaXNlIH0gZnJvbSBcIi4vbm9pc2UvaW5kZXguanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGF0aCB9IGZyb20gXCIuL3BhdGgvaW5kZXguanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRW5naW5lIH0gZnJvbSBcIi4vZW5naW5lLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIExpZ2h0aW5nIH0gZnJvbSBcIi4vbGlnaHRpbmcuanNcIjtcbmV4cG9ydCB7IERFRkFVTFRfV0lEVEgsIERFRkFVTFRfSEVJR0hULCBESVJTLCBLRVlTIH0gZnJvbSBcIi4vY29uc3RhbnRzLmpzXCI7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gXCIuL3V0aWwuanNcIjtcbmV4cG9ydCBjb25zdCBVdGlsID0gdXRpbDtcbmltcG9ydCAqIGFzIGNvbG9yIGZyb20gXCIuL2NvbG9yLmpzXCI7XG5leHBvcnQgY29uc3QgQ29sb3IgPSBjb2xvcjtcbmltcG9ydCAqIGFzIHRleHQgZnJvbSBcIi4vdGV4dC5qc1wiO1xuZXhwb3J0IGNvbnN0IFRleHQgPSB0ZXh0O1xuIiwiaW1wb3J0ICogYXMgQ29sb3IgZnJvbSBcIi4vY29sb3IuanNcIjtcbjtcbjtcbjtcbjtcbi8qKlxuICogTGlnaHRpbmcgY29tcHV0YXRpb24sIGJhc2VkIG9uIGEgdHJhZGl0aW9uYWwgRk9WIGZvciBtdWx0aXBsZSBsaWdodCBzb3VyY2VzIGFuZCBtdWx0aXBsZSBwYXNzZXMuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpZ2h0aW5nIHtcbiAgICBjb25zdHJ1Y3RvcihyZWZsZWN0aXZpdHlDYWxsYmFjaywgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhbGxiYWNrID0gcmVmbGVjdGl2aXR5Q2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7fTtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcGFzc2VzOiAxLFxuICAgICAgICAgICAgZW1pc3Npb25UaHJlc2hvbGQ6IDEwMCxcbiAgICAgICAgICAgIHJhbmdlOiAxMFxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fbGlnaHRzID0ge307XG4gICAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlID0ge307XG4gICAgICAgIHRoaXMuX2ZvdkNhY2hlID0ge307XG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRqdXN0IG9wdGlvbnMgYXQgcnVudGltZVxuICAgICAqL1xuICAgIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdXNlZCBGaWVsZC1PZi1WaWV3IGFsZ29cbiAgICAgKi9cbiAgICBzZXRGT1YoZm92KSB7XG4gICAgICAgIHRoaXMuX2ZvdiA9IGZvdjtcbiAgICAgICAgdGhpcy5fZm92Q2FjaGUgPSB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCAob3IgcmVtb3ZlKSBhIGxpZ2h0IHNvdXJjZVxuICAgICAqL1xuICAgIHNldExpZ2h0KHgsIHksIGNvbG9yKSB7XG4gICAgICAgIGxldCBrZXkgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpZ2h0c1trZXldID0gKHR5cGVvZiAoY29sb3IpID09IFwic3RyaW5nXCIgPyBDb2xvci5mcm9tU3RyaW5nKGNvbG9yKSA6IGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saWdodHNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBsaWdodCBzb3VyY2VzXG4gICAgICovXG4gICAgY2xlYXJMaWdodHMoKSB7IHRoaXMuX2xpZ2h0cyA9IHt9OyB9XG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIHByZS1jb21wdXRlZCB0b3BvbG9neSB2YWx1ZXMuIENhbGwgd2hlbmV2ZXIgdGhlIHVuZGVybHlpbmcgbWFwIGNoYW5nZXMgaXRzIGxpZ2h0LXBhc3NhYmlsaXR5LlxuICAgICAqL1xuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZSA9IHt9O1xuICAgICAgICB0aGlzLl9mb3ZDYWNoZSA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB0aGUgbGlnaHRpbmdcbiAgICAgKi9cbiAgICBjb21wdXRlKGxpZ2h0aW5nQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGRvbmVDZWxscyA9IHt9O1xuICAgICAgICBsZXQgZW1pdHRpbmdDZWxscyA9IHt9O1xuICAgICAgICBsZXQgbGl0Q2VsbHMgPSB7fTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX2xpZ2h0cykgeyAvKiBwcmVwYXJlIGVtaXR0ZXJzIGZvciBmaXJzdCBwYXNzICovXG4gICAgICAgICAgICBsZXQgbGlnaHQgPSB0aGlzLl9saWdodHNba2V5XTtcbiAgICAgICAgICAgIGVtaXR0aW5nQ2VsbHNba2V5XSA9IFswLCAwLCAwXTtcbiAgICAgICAgICAgIENvbG9yLmFkZF8oZW1pdHRpbmdDZWxsc1trZXldLCBsaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vcHRpb25zLnBhc3NlczsgaSsrKSB7IC8qIG1haW4gbG9vcCAqL1xuICAgICAgICAgICAgdGhpcy5fZW1pdExpZ2h0KGVtaXR0aW5nQ2VsbHMsIGxpdENlbGxzLCBkb25lQ2VsbHMpO1xuICAgICAgICAgICAgaWYgKGkgKyAxID09IHRoaXMuX29wdGlvbnMucGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IC8qIG5vdCBmb3IgdGhlIGxhc3QgcGFzcyAqL1xuICAgICAgICAgICAgZW1pdHRpbmdDZWxscyA9IHRoaXMuX2NvbXB1dGVFbWl0dGVycyhsaXRDZWxscywgZG9uZUNlbGxzKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBsaXRLZXkgaW4gbGl0Q2VsbHMpIHsgLyogbGV0IHRoZSB1c2VyIGtub3cgd2hhdCBhbmQgaG93IGlzIGxpdCAqL1xuICAgICAgICAgICAgbGV0IHBhcnRzID0gbGl0S2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIGxldCB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICAgICAgbGV0IHkgPSBwYXJzZUludChwYXJ0c1sxXSk7XG4gICAgICAgICAgICBsaWdodGluZ0NhbGxiYWNrKHgsIHksIGxpdENlbGxzW2xpdEtleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIG9uZSBpdGVyYXRpb24gZnJvbSBhbGwgZW1pdHRpbmcgY2VsbHNcbiAgICAgKiBAcGFyYW0gZW1pdHRpbmdDZWxscyBUaGVzZSBlbWl0IGxpZ2h0XG4gICAgICogQHBhcmFtIGxpdENlbGxzIEFkZCBwcm9qZWN0ZWQgbGlnaHQgdG8gdGhlc2VcbiAgICAgKiBAcGFyYW0gZG9uZUNlbGxzIFRoZXNlIGFscmVhZHkgZW1pdHRlZCwgZm9yYmlkIHRoZW0gZnJvbSBmdXJ0aGVyIGNhbGN1bGF0aW9uc1xuICAgICAqL1xuICAgIF9lbWl0TGlnaHQoZW1pdHRpbmdDZWxscywgbGl0Q2VsbHMsIGRvbmVDZWxscykge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZW1pdHRpbmdDZWxscykge1xuICAgICAgICAgICAgbGV0IHBhcnRzID0ga2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIGxldCB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICAgICAgbGV0IHkgPSBwYXJzZUludChwYXJ0c1sxXSk7XG4gICAgICAgICAgICB0aGlzLl9lbWl0TGlnaHRGcm9tQ2VsbCh4LCB5LCBlbWl0dGluZ0NlbGxzW2tleV0sIGxpdENlbGxzKTtcbiAgICAgICAgICAgIGRvbmVDZWxsc1trZXldID0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJlcGFyZSBhIGxpc3Qgb2YgZW1pdHRlcnMgZm9yIG5leHQgcGFzc1xuICAgICAqL1xuICAgIF9jb21wdXRlRW1pdHRlcnMobGl0Q2VsbHMsIGRvbmVDZWxscykge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBsaXRDZWxscykge1xuICAgICAgICAgICAgaWYgKGtleSBpbiBkb25lQ2VsbHMpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gLyogYWxyZWFkeSBlbWl0dGVkICovXG4gICAgICAgICAgICBsZXQgY29sb3IgPSBsaXRDZWxsc1trZXldO1xuICAgICAgICAgICAgbGV0IHJlZmxlY3Rpdml0eTtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGUpIHtcbiAgICAgICAgICAgICAgICByZWZsZWN0aXZpdHkgPSB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcnRzID0ga2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHBhcnNlSW50KHBhcnRzWzBdKTtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgICAgICAgICByZWZsZWN0aXZpdHkgPSB0aGlzLl9yZWZsZWN0aXZpdHlDYWxsYmFjayh4LCB5KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZVtrZXldID0gcmVmbGVjdGl2aXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlZmxlY3Rpdml0eSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IC8qIHdpbGwgbm90IHJlZmxlY3QgYXQgYWxsICovXG4gICAgICAgICAgICAvKiBjb21wdXRlIGVtaXNzaW9uIGNvbG9yICovXG4gICAgICAgICAgICBsZXQgZW1pc3Npb24gPSBbMCwgMCwgMF07XG4gICAgICAgICAgICBsZXQgaW50ZW5zaXR5ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcnQgPSBNYXRoLnJvdW5kKGNvbG9yW2ldICogcmVmbGVjdGl2aXR5KTtcbiAgICAgICAgICAgICAgICBlbWlzc2lvbltpXSA9IHBhcnQ7XG4gICAgICAgICAgICAgICAgaW50ZW5zaXR5ICs9IHBhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW50ZW5zaXR5ID4gdGhpcy5fb3B0aW9ucy5lbWlzc2lvblRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gZW1pc3Npb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBvbmUgaXRlcmF0aW9uIGZyb20gb25lIGNlbGxcbiAgICAgKi9cbiAgICBfZW1pdExpZ2h0RnJvbUNlbGwoeCwgeSwgY29sb3IsIGxpdENlbGxzKSB7XG4gICAgICAgIGxldCBrZXkgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICBsZXQgZm92O1xuICAgICAgICBpZiAoa2V5IGluIHRoaXMuX2ZvdkNhY2hlKSB7XG4gICAgICAgICAgICBmb3YgPSB0aGlzLl9mb3ZDYWNoZVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm92ID0gdGhpcy5fdXBkYXRlRk9WKHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGZvdktleSBpbiBmb3YpIHtcbiAgICAgICAgICAgIGxldCBmb3JtRmFjdG9yID0gZm92W2ZvdktleV07XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgaWYgKGZvdktleSBpbiBsaXRDZWxscykgeyAvKiBhbHJlYWR5IGxpdCAqL1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGxpdENlbGxzW2ZvdktleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLyogbmV3bHkgbGl0ICovXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gWzAsIDAsIDBdO1xuICAgICAgICAgICAgICAgIGxpdENlbGxzW2ZvdktleV0gPSByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSArPSBNYXRoLnJvdW5kKGNvbG9yW2ldICogZm9ybUZhY3Rvcik7XG4gICAgICAgICAgICB9IC8qIGFkZCBsaWdodCBjb2xvciAqL1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIEZPViAoXCJmb3JtIGZhY3RvclwiKSBmb3IgYSBwb3RlbnRpYWwgbGlnaHQgc291cmNlIGF0IFt4LHldXG4gICAgICovXG4gICAgX3VwZGF0ZUZPVih4LCB5KSB7XG4gICAgICAgIGxldCBrZXkxID0geCArIFwiLFwiICsgeTtcbiAgICAgICAgbGV0IGNhY2hlID0ge307XG4gICAgICAgIHRoaXMuX2ZvdkNhY2hlW2tleTFdID0gY2FjaGU7XG4gICAgICAgIGxldCByYW5nZSA9IHRoaXMuX29wdGlvbnMucmFuZ2U7XG4gICAgICAgIGZ1bmN0aW9uIGNiKHgsIHksIHIsIHZpcykge1xuICAgICAgICAgICAgbGV0IGtleTIgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICAgICAgbGV0IGZvcm1GYWN0b3IgPSB2aXMgKiAoMSAtIHIgLyByYW5nZSk7XG4gICAgICAgICAgICBpZiAoZm9ybUZhY3RvciA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FjaGVba2V5Ml0gPSBmb3JtRmFjdG9yO1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgdGhpcy5fZm92LmNvbXB1dGUoeCwgeSwgcmFuZ2UsIGNiLmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gY2FjaGU7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbi8qKlxuICogQGNsYXNzIFNpbXBsZSBlbXB0eSByZWN0YW5ndWxhciByb29tXG4gKiBAYXVnbWVudHMgUk9ULk1hcFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcmVuYSBleHRlbmRzIE1hcCB7XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCB3ID0gdGhpcy5fd2lkdGggLSAxO1xuICAgICAgICBsZXQgaCA9IHRoaXMuX2hlaWdodCAtIDE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHc7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gaDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVtcHR5ID0gKGkgJiYgaiAmJiBpIDwgdyAmJiBqIDwgaCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgZW1wdHkgPyAwIDogMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbmltcG9ydCB7IERJUlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbjtcbi8qKlxuICogQGNsYXNzIENlbGx1bGFyIGF1dG9tYXRvbiBtYXAgZ2VuZXJhdG9yXG4gKiBAYXVnbWVudHMgUk9ULk1hcFxuICogQHBhcmFtIHtpbnR9IFt3aWR0aD1ST1QuREVGQVVMVF9XSURUSF1cbiAqIEBwYXJhbSB7aW50fSBbaGVpZ2h0PVJPVC5ERUZBVUxUX0hFSUdIVF1cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gT3B0aW9uc1xuICogQHBhcmFtIHtpbnRbXX0gW29wdGlvbnMuYm9ybl0gTGlzdCBvZiBuZWlnaGJvciBjb3VudHMgZm9yIGEgbmV3IGNlbGwgdG8gYmUgYm9ybiBpbiBlbXB0eSBzcGFjZVxuICogQHBhcmFtIHtpbnRbXX0gW29wdGlvbnMuc3Vydml2ZV0gTGlzdCBvZiBuZWlnaGJvciBjb3VudHMgZm9yIGFuIGV4aXN0aW5nICBjZWxsIHRvIHN1cnZpdmVcbiAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50b3BvbG9neV0gVG9wb2xvZ3kgNCBvciA2IG9yIDhcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbHVsYXIgZXh0ZW5kcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGJvcm46IFs1LCA2LCA3LCA4XSxcbiAgICAgICAgICAgIHN1cnZpdmU6IFs0LCA1LCA2LCA3LCA4XSxcbiAgICAgICAgICAgIHRvcG9sb2d5OiA4XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fZGlycyA9IERJUlNbdGhpcy5fb3B0aW9ucy50b3BvbG9neV07XG4gICAgICAgIHRoaXMuX21hcCA9IHRoaXMuX2ZpbGxNYXAoMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbGwgdGhlIG1hcCB3aXRoIHJhbmRvbSB2YWx1ZXNcbiAgICAgKiBAcGFyYW0ge2Zsb2F0fSBwcm9iYWJpbGl0eSBQcm9iYWJpbGl0eSBmb3IgYSBjZWxsIHRvIGJlY29tZSBhbGl2ZTsgMCA9IGFsbCBlbXB0eSwgMSA9IGFsbCBmdWxsXG4gICAgICovXG4gICAgcmFuZG9taXplKHByb2JhYmlsaXR5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcFtpXVtqXSA9IChSTkcuZ2V0VW5pZm9ybSgpIDwgcHJvYmFiaWxpdHkgPyAxIDogMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoYW5nZSBvcHRpb25zLlxuICAgICAqIEBzZWUgUk9ULk1hcC5DZWxsdWxhclxuICAgICAqL1xuICAgIHNldE9wdGlvbnMob3B0aW9ucykgeyBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpOyB9XG4gICAgc2V0KHgsIHksIHZhbHVlKSB7IHRoaXMuX21hcFt4XVt5XSA9IHZhbHVlOyB9XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBuZXdNYXAgPSB0aGlzLl9maWxsTWFwKDApO1xuICAgICAgICBsZXQgYm9ybiA9IHRoaXMuX29wdGlvbnMuYm9ybjtcbiAgICAgICAgbGV0IHN1cnZpdmUgPSB0aGlzLl9vcHRpb25zLnN1cnZpdmU7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgIGxldCB3aWR0aFN0ZXAgPSAxO1xuICAgICAgICAgICAgbGV0IHdpZHRoU3RhcnQgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNikge1xuICAgICAgICAgICAgICAgIHdpZHRoU3RlcCA9IDI7XG4gICAgICAgICAgICAgICAgd2lkdGhTdGFydCA9IGogJSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHdpZHRoU3RhcnQ7IGkgPCB0aGlzLl93aWR0aDsgaSArPSB3aWR0aFN0ZXApIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VyID0gdGhpcy5fbWFwW2ldW2pdO1xuICAgICAgICAgICAgICAgIGxldCBuY291bnQgPSB0aGlzLl9nZXROZWlnaGJvcnMoaSwgaik7XG4gICAgICAgICAgICAgICAgaWYgKGN1ciAmJiBzdXJ2aXZlLmluZGV4T2YobmNvdW50KSAhPSAtMSkgeyAvKiBzdXJ2aXZlICovXG4gICAgICAgICAgICAgICAgICAgIG5ld01hcFtpXVtqXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFjdXIgJiYgYm9ybi5pbmRleE9mKG5jb3VudCkgIT0gLTEpIHsgLyogYm9ybiAqL1xuICAgICAgICAgICAgICAgICAgICBuZXdNYXBbaV1bal0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXAgPSBuZXdNYXA7XG4gICAgICAgIGNhbGxiYWNrICYmIHRoaXMuX3NlcnZpY2VDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxuICAgIF9zZXJ2aWNlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgbGV0IHdpZHRoU3RlcCA9IDE7XG4gICAgICAgICAgICBsZXQgd2lkdGhTdGFydCA9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XG4gICAgICAgICAgICAgICAgd2lkdGhTdGVwID0gMjtcbiAgICAgICAgICAgICAgICB3aWR0aFN0YXJ0ID0gaiAlIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gd2lkdGhTdGFydDsgaSA8IHRoaXMuX3dpZHRoOyBpICs9IHdpZHRoU3RlcCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IG5laWdoYm9yIGNvdW50IGF0IFtpLGpdIGluIHRoaXMuX21hcFxuICAgICAqL1xuICAgIF9nZXROZWlnaGJvcnMoY3gsIGN5KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2RpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkaXIgPSB0aGlzLl9kaXJzW2ldO1xuICAgICAgICAgICAgbGV0IHggPSBjeCArIGRpclswXTtcbiAgICAgICAgICAgIGxldCB5ID0gY3kgKyBkaXJbMV07XG4gICAgICAgICAgICBpZiAoeCA8IDAgfHwgeCA+PSB0aGlzLl93aWR0aCB8fCB5IDwgMCB8fCB5ID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ICs9ICh0aGlzLl9tYXBbeF1beV0gPT0gMSA/IDEgOiAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlIHN1cmUgZXZlcnkgbm9uLXdhbGwgc3BhY2UgaXMgYWNjZXNzaWJsZS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayB0byBjYWxsIHRvIGRpc3BsYXkgbWFwIHdoZW4gZG9cbiAgICAgKiBAcGFyYW0ge2ludH0gdmFsdWUgdG8gY29uc2lkZXIgZW1wdHkgc3BhY2UgLSBkZWZhdWx0cyB0byAwXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgdG8gY2FsbCB3aGVuIGEgbmV3IGNvbm5lY3Rpb24gaXMgbWFkZVxuICAgICAqL1xuICAgIGNvbm5lY3QoY2FsbGJhY2ssIHZhbHVlLCBjb25uZWN0aW9uQ2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgbGV0IGFsbEZyZWVTcGFjZSA9IFtdO1xuICAgICAgICBsZXQgbm90Q29ubmVjdGVkID0ge307XG4gICAgICAgIC8vIGZpbmQgYWxsIGZyZWUgc3BhY2VcbiAgICAgICAgbGV0IHdpZHRoU3RlcCA9IDE7XG4gICAgICAgIGxldCB3aWR0aFN0YXJ0cyA9IFswLCAwXTtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNikge1xuICAgICAgICAgICAgd2lkdGhTdGVwID0gMjtcbiAgICAgICAgICAgIHdpZHRoU3RhcnRzID0gWzAsIDFdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5faGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSB3aWR0aFN0YXJ0c1t5ICUgMl07IHggPCB0aGlzLl93aWR0aDsgeCArPSB3aWR0aFN0ZXApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZnJlZVNwYWNlKHgsIHksIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcCA9IFt4LCB5XTtcbiAgICAgICAgICAgICAgICAgICAgbm90Q29ubmVjdGVkW3RoaXMuX3BvaW50S2V5KHApXSA9IHA7XG4gICAgICAgICAgICAgICAgICAgIGFsbEZyZWVTcGFjZS5wdXNoKFt4LCB5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBzdGFydCA9IGFsbEZyZWVTcGFjZVtSTkcuZ2V0VW5pZm9ybUludCgwLCBhbGxGcmVlU3BhY2UubGVuZ3RoIC0gMSldO1xuICAgICAgICBsZXQga2V5ID0gdGhpcy5fcG9pbnRLZXkoc3RhcnQpO1xuICAgICAgICBsZXQgY29ubmVjdGVkID0ge307XG4gICAgICAgIGNvbm5lY3RlZFtrZXldID0gc3RhcnQ7XG4gICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRba2V5XTtcbiAgICAgICAgLy8gZmluZCB3aGF0J3MgY29ubmVjdGVkIHRvIHRoZSBzdGFydGluZyBwb2ludFxuICAgICAgICB0aGlzLl9maW5kQ29ubmVjdGVkKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCBbc3RhcnRdLCBmYWxzZSwgdmFsdWUpO1xuICAgICAgICB3aGlsZSAoT2JqZWN0LmtleXMobm90Q29ubmVjdGVkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBmaW5kIHR3byBwb2ludHMgZnJvbSBub3RDb25uZWN0ZWQgdG8gY29ubmVjdGVkXG4gICAgICAgICAgICBsZXQgcCA9IHRoaXMuX2dldEZyb21Ubyhjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCk7XG4gICAgICAgICAgICBsZXQgZnJvbSA9IHBbMF07IC8vIG5vdENvbm5lY3RlZFxuICAgICAgICAgICAgbGV0IHRvID0gcFsxXTsgLy8gY29ubmVjdGVkXG4gICAgICAgICAgICAvLyBmaW5kIGV2ZXJ5dGhpbmcgY29ubmVjdGVkIHRvIHRoZSBzdGFydGluZyBwb2ludFxuICAgICAgICAgICAgbGV0IGxvY2FsID0ge307XG4gICAgICAgICAgICBsb2NhbFt0aGlzLl9wb2ludEtleShmcm9tKV0gPSBmcm9tO1xuICAgICAgICAgICAgdGhpcy5fZmluZENvbm5lY3RlZChsb2NhbCwgbm90Q29ubmVjdGVkLCBbZnJvbV0sIHRydWUsIHZhbHVlKTtcbiAgICAgICAgICAgIC8vIGNvbm5lY3QgdG8gYSBjb25uZWN0ZWQgY2VsbFxuICAgICAgICAgICAgbGV0IHR1bm5lbEZuID0gKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNiA/IHRoaXMuX3R1bm5lbFRvQ29ubmVjdGVkNiA6IHRoaXMuX3R1bm5lbFRvQ29ubmVjdGVkKTtcbiAgICAgICAgICAgIHR1bm5lbEZuLmNhbGwodGhpcywgdG8sIGZyb20sIGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKTtcbiAgICAgICAgICAgIC8vIG5vdyBhbGwgb2YgbG9jYWwgaXMgY29ubmVjdGVkXG4gICAgICAgICAgICBmb3IgKGxldCBrIGluIGxvY2FsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBwID0gbG9jYWxba107XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwW3BwWzBdXVtwcFsxXV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25uZWN0ZWRba10gPSBwcDtcbiAgICAgICAgICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW2tdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrICYmIHRoaXMuX3NlcnZpY2VDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgcmFuZG9tIHBvaW50cyB0byBjb25uZWN0LiBTZWFyY2ggZm9yIHRoZSBjbG9zZXN0IHBvaW50IGluIHRoZSBsYXJnZXIgc3BhY2UuXG4gICAgICogVGhpcyBpcyB0byBtaW5pbWl6ZSB0aGUgbGVuZ3RoIG9mIHRoZSBwYXNzYWdlIHdoaWxlIG1haW50YWluaW5nIGdvb2QgcGVyZm9ybWFuY2UuXG4gICAgICovXG4gICAgX2dldEZyb21Ubyhjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCkge1xuICAgICAgICBsZXQgZnJvbSA9IFswLCAwXSwgdG8gPSBbMCwgMF0sIGQ7XG4gICAgICAgIGxldCBjb25uZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMoY29ubmVjdGVkKTtcbiAgICAgICAgbGV0IG5vdENvbm5lY3RlZEtleXMgPSBPYmplY3Qua2V5cyhub3RDb25uZWN0ZWQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNvbm5lY3RlZEtleXMubGVuZ3RoIDwgbm90Q29ubmVjdGVkS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5cyA9IGNvbm5lY3RlZEtleXM7XG4gICAgICAgICAgICAgICAgdG8gPSBjb25uZWN0ZWRba2V5c1tSTkcuZ2V0VW5pZm9ybUludCgwLCBrZXlzLmxlbmd0aCAtIDEpXV07XG4gICAgICAgICAgICAgICAgZnJvbSA9IHRoaXMuX2dldENsb3Nlc3QodG8sIG5vdENvbm5lY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5cyA9IG5vdENvbm5lY3RlZEtleXM7XG4gICAgICAgICAgICAgICAgZnJvbSA9IG5vdENvbm5lY3RlZFtrZXlzW1JORy5nZXRVbmlmb3JtSW50KDAsIGtleXMubGVuZ3RoIC0gMSldXTtcbiAgICAgICAgICAgICAgICB0byA9IHRoaXMuX2dldENsb3Nlc3QoZnJvbSwgY29ubmVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGQgPSAoZnJvbVswXSAtIHRvWzBdKSAqIChmcm9tWzBdIC0gdG9bMF0pICsgKGZyb21bMV0gLSB0b1sxXSkgKiAoZnJvbVsxXSAtIHRvWzFdKTtcbiAgICAgICAgICAgIGlmIChkIDwgNjQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj4+PiBjb25uZWN0ZWQ9XCIgKyB0byArIFwiIG5vdENvbm5lY3RlZD1cIiArIGZyb20gKyBcIiBkaXN0PVwiICsgZCk7XG4gICAgICAgIHJldHVybiBbZnJvbSwgdG9dO1xuICAgIH1cbiAgICBfZ2V0Q2xvc2VzdChwb2ludCwgc3BhY2UpIHtcbiAgICAgICAgbGV0IG1pblBvaW50ID0gbnVsbDtcbiAgICAgICAgbGV0IG1pbkRpc3QgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBrIGluIHNwYWNlKSB7XG4gICAgICAgICAgICBsZXQgcCA9IHNwYWNlW2tdO1xuICAgICAgICAgICAgbGV0IGQgPSAocFswXSAtIHBvaW50WzBdKSAqIChwWzBdIC0gcG9pbnRbMF0pICsgKHBbMV0gLSBwb2ludFsxXSkgKiAocFsxXSAtIHBvaW50WzFdKTtcbiAgICAgICAgICAgIGlmIChtaW5EaXN0ID09IG51bGwgfHwgZCA8IG1pbkRpc3QpIHtcbiAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZDtcbiAgICAgICAgICAgICAgICBtaW5Qb2ludCA9IHA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pblBvaW50O1xuICAgIH1cbiAgICBfZmluZENvbm5lY3RlZChjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgc3RhY2ssIGtlZXBOb3RDb25uZWN0ZWQsIHZhbHVlKSB7XG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgcCA9IHN0YWNrLnNwbGljZSgwLCAxKVswXTtcbiAgICAgICAgICAgIGxldCB0ZXN0cztcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYpIHtcbiAgICAgICAgICAgICAgICB0ZXN0cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gKyAyLCBwWzFdXSxcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gKyAxLCBwWzFdIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdIC0gMSwgcFsxXSAtIDFdLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSAtIDIsIHBbMV1dLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSAtIDEsIHBbMV0gKyAxXSxcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gKyAxLCBwWzFdICsgMV0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRlc3RzID0gW1xuICAgICAgICAgICAgICAgICAgICBbcFswXSArIDEsIHBbMV1dLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSAtIDEsIHBbMV1dLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSwgcFsxXSArIDFdLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSwgcFsxXSAtIDFdXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5fcG9pbnRLZXkodGVzdHNbaV0pO1xuICAgICAgICAgICAgICAgIGlmIChjb25uZWN0ZWRba2V5XSA9PSBudWxsICYmIHRoaXMuX2ZyZWVTcGFjZSh0ZXN0c1tpXVswXSwgdGVzdHNbaV1bMV0sIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0ZWRba2V5XSA9IHRlc3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWtlZXBOb3RDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHRlc3RzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3R1bm5lbFRvQ29ubmVjdGVkKHRvLCBmcm9tLCBjb25uZWN0ZWQsIG5vdENvbm5lY3RlZCwgdmFsdWUsIGNvbm5lY3Rpb25DYWxsYmFjaykge1xuICAgICAgICBsZXQgYSwgYjtcbiAgICAgICAgaWYgKGZyb21bMF0gPCB0b1swXSkge1xuICAgICAgICAgICAgYSA9IGZyb207XG4gICAgICAgICAgICBiID0gdG87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhID0gdG87XG4gICAgICAgICAgICBiID0gZnJvbTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCB4eCA9IGFbMF07IHh4IDw9IGJbMF07IHh4KyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcFt4eF1bYVsxXV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBwID0gW3h4LCBhWzFdXTtcbiAgICAgICAgICAgIGxldCBwa2V5ID0gdGhpcy5fcG9pbnRLZXkocCk7XG4gICAgICAgICAgICBjb25uZWN0ZWRbcGtleV0gPSBwO1xuICAgICAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtwa2V5XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29ubmVjdGlvbkNhbGxiYWNrICYmIGFbMF0gPCBiWzBdKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uQ2FsbGJhY2soYSwgW2JbMF0sIGFbMV1dKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB4IGlzIG5vdyBmaXhlZFxuICAgICAgICBsZXQgeCA9IGJbMF07XG4gICAgICAgIGlmIChmcm9tWzFdIDwgdG9bMV0pIHtcbiAgICAgICAgICAgIGEgPSBmcm9tO1xuICAgICAgICAgICAgYiA9IHRvO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYSA9IHRvO1xuICAgICAgICAgICAgYiA9IGZyb207XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgeXkgPSBhWzFdOyB5eSA8IGJbMV07IHl5KyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcFt4XVt5eV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBwID0gW3gsIHl5XTtcbiAgICAgICAgICAgIGxldCBwa2V5ID0gdGhpcy5fcG9pbnRLZXkocCk7XG4gICAgICAgICAgICBjb25uZWN0ZWRbcGtleV0gPSBwO1xuICAgICAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtwa2V5XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29ubmVjdGlvbkNhbGxiYWNrICYmIGFbMV0gPCBiWzFdKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uQ2FsbGJhY2soW2JbMF0sIGFbMV1dLCBbYlswXSwgYlsxXV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF90dW5uZWxUb0Nvbm5lY3RlZDYodG8sIGZyb20sIGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBhLCBiO1xuICAgICAgICBpZiAoZnJvbVswXSA8IHRvWzBdKSB7XG4gICAgICAgICAgICBhID0gZnJvbTtcbiAgICAgICAgICAgIGIgPSB0bztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGEgPSB0bztcbiAgICAgICAgICAgIGIgPSBmcm9tO1xuICAgICAgICB9XG4gICAgICAgIC8vIHR1bm5lbCBkaWFnb25hbGx5IHVudGlsIGhvcml6b250YWxseSBsZXZlbFxuICAgICAgICBsZXQgeHggPSBhWzBdO1xuICAgICAgICBsZXQgeXkgPSBhWzFdO1xuICAgICAgICB3aGlsZSAoISh4eCA9PSBiWzBdICYmIHl5ID09IGJbMV0pKSB7XG4gICAgICAgICAgICBsZXQgc3RlcFdpZHRoID0gMjtcbiAgICAgICAgICAgIGlmICh5eSA8IGJbMV0pIHtcbiAgICAgICAgICAgICAgICB5eSsrO1xuICAgICAgICAgICAgICAgIHN0ZXBXaWR0aCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh5eSA+IGJbMV0pIHtcbiAgICAgICAgICAgICAgICB5eS0tO1xuICAgICAgICAgICAgICAgIHN0ZXBXaWR0aCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeHggPCBiWzBdKSB7XG4gICAgICAgICAgICAgICAgeHggKz0gc3RlcFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoeHggPiBiWzBdKSB7XG4gICAgICAgICAgICAgICAgeHggLT0gc3RlcFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYlsxXSAlIDIpIHtcbiAgICAgICAgICAgICAgICAvLyBXb24ndCBzdGVwIG91dHNpZGUgbWFwIGlmIGRlc3RpbmF0aW9uIG9uIGlzIG1hcCdzIHJpZ2h0IGVkZ2VcbiAgICAgICAgICAgICAgICB4eCAtPSBzdGVwV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBkaXR0byBmb3IgbGVmdCBlZGdlXG4gICAgICAgICAgICAgICAgeHggKz0gc3RlcFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbWFwW3h4XVt5eV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBwID0gW3h4LCB5eV07XG4gICAgICAgICAgICBsZXQgcGtleSA9IHRoaXMuX3BvaW50S2V5KHApO1xuICAgICAgICAgICAgY29ubmVjdGVkW3BrZXldID0gcDtcbiAgICAgICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRbcGtleV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbm5lY3Rpb25DYWxsYmFjaykge1xuICAgICAgICAgICAgY29ubmVjdGlvbkNhbGxiYWNrKGZyb20sIHRvKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZnJlZVNwYWNlKHgsIHksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB4ID49IDAgJiYgeCA8IHRoaXMuX3dpZHRoICYmIHkgPj0gMCAmJiB5IDwgdGhpcy5faGVpZ2h0ICYmIHRoaXMuX21hcFt4XVt5XSA9PSB2YWx1ZTtcbiAgICB9XG4gICAgX3BvaW50S2V5KHApIHsgcmV0dXJuIHBbMF0gKyBcIi5cIiArIHBbMV07IH1cbn1cbiIsImltcG9ydCBEdW5nZW9uIGZyb20gXCIuL2R1bmdlb24uanNcIjtcbmltcG9ydCB7IFJvb20sIENvcnJpZG9yIH0gZnJvbSBcIi4vZmVhdHVyZXMuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuaW1wb3J0IHsgRElSUyB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbmNvbnN0IEZFQVRVUkVTID0ge1xuICAgIFwicm9vbVwiOiBSb29tLFxuICAgIFwiY29ycmlkb3JcIjogQ29ycmlkb3Jcbn07XG4vKipcbiAqIFJhbmRvbSBkdW5nZW9uIGdlbmVyYXRvciB1c2luZyBodW1hbi1saWtlIGRpZ2dpbmcgcGF0dGVybnMuXG4gKiBIZWF2aWx5IGJhc2VkIG9uIE1pa2UgQW5kZXJzb24ncyBpZGVhcyBmcm9tIHRoZSBcIlR5cmFudFwiIGFsZ28sIG1lbnRpb25lZCBhdFxuICogaHR0cDovL3d3dy5yb2d1ZWJhc2luLnJvZ3VlbGlrZWRldmVsb3BtZW50Lm9yZy9pbmRleC5waHA/dGl0bGU9RHVuZ2Vvbi1CdWlsZGluZ19BbGdvcml0aG0uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpZ2dlciBleHRlbmRzIER1bmdlb24ge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcm9vbVdpZHRoOiBbMywgOV0sXG4gICAgICAgICAgICByb29tSGVpZ2h0OiBbMywgNV0sXG4gICAgICAgICAgICBjb3JyaWRvckxlbmd0aDogWzMsIDEwXSxcbiAgICAgICAgICAgIGR1Z1BlcmNlbnRhZ2U6IDAuMixcbiAgICAgICAgICAgIHRpbWVMaW1pdDogMTAwMCAvKiB3ZSBzdG9wIGFmdGVyIHRoaXMgbXVjaCB0aW1lIGhhcyBwYXNzZWQgKG1zZWMpICovXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9mZWF0dXJlcyA9IHtcbiAgICAgICAgICAgIFwicm9vbVwiOiA0LFxuICAgICAgICAgICAgXCJjb3JyaWRvclwiOiA0XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgICB0aGlzLl9mZWF0dXJlQXR0ZW1wdHMgPSAyMDsgLyogaG93IG1hbnkgdGltZXMgZG8gd2UgdHJ5IHRvIGNyZWF0ZSBhIGZlYXR1cmUgb24gYSBzdWl0YWJsZSB3YWxsICovXG4gICAgICAgIHRoaXMuX3dhbGxzID0ge307IC8qIHRoZXNlIGFyZSBhdmFpbGFibGUgZm9yIGRpZ2dpbmcgKi9cbiAgICAgICAgdGhpcy5fZHVnID0gMDtcbiAgICAgICAgdGhpcy5fZGlnQ2FsbGJhY2sgPSB0aGlzLl9kaWdDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrID0gdGhpcy5fY2FuQmVEdWdDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9pc1dhbGxDYWxsYmFjayA9IHRoaXMuX2lzV2FsbENhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX3ByaW9yaXR5V2FsbENhbGxiYWNrID0gdGhpcy5fcHJpb3JpdHlXYWxsQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICB9XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX3Jvb21zID0gW107XG4gICAgICAgIHRoaXMuX2NvcnJpZG9ycyA9IFtdO1xuICAgICAgICB0aGlzLl9tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgICB0aGlzLl93YWxscyA9IHt9O1xuICAgICAgICB0aGlzLl9kdWcgPSAwO1xuICAgICAgICBsZXQgYXJlYSA9ICh0aGlzLl93aWR0aCAtIDIpICogKHRoaXMuX2hlaWdodCAtIDIpO1xuICAgICAgICB0aGlzLl9maXJzdFJvb20oKTtcbiAgICAgICAgbGV0IHQxID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IHByaW9yaXR5V2FsbHM7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHByaW9yaXR5V2FsbHMgPSAwO1xuICAgICAgICAgICAgbGV0IHQyID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICh0MiAtIHQxID4gdGhpcy5fb3B0aW9ucy50aW1lTGltaXQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIGZpbmQgYSBnb29kIHdhbGwgKi9cbiAgICAgICAgICAgIGxldCB3YWxsID0gdGhpcy5fZmluZFdhbGwoKTtcbiAgICAgICAgICAgIGlmICghd2FsbCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSAvKiBubyBtb3JlIHdhbGxzICovXG4gICAgICAgICAgICBsZXQgcGFydHMgPSB3YWxsLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIGxldCB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICAgICAgbGV0IHkgPSBwYXJzZUludChwYXJ0c1sxXSk7XG4gICAgICAgICAgICBsZXQgZGlyID0gdGhpcy5fZ2V0RGlnZ2luZ0RpcmVjdGlvbih4LCB5KTtcbiAgICAgICAgICAgIGlmICghZGlyKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IC8qIHRoaXMgd2FsbCBpcyBub3Qgc3VpdGFibGUgKi9cbiAgICAgICAgICAgIC8vXHRcdGNvbnNvbGUubG9nKFwid2FsbFwiLCB4LCB5KTtcbiAgICAgICAgICAgIC8qIHRyeSBhZGRpbmcgYSBmZWF0dXJlICovXG4gICAgICAgICAgICBsZXQgZmVhdHVyZUF0dGVtcHRzID0gMDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBmZWF0dXJlQXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHJ5RmVhdHVyZSh4LCB5LCBkaXJbMF0sIGRpclsxXSkpIHsgLyogZmVhdHVyZSBhZGRlZCAqL1xuICAgICAgICAgICAgICAgICAgICAvL2lmICh0aGlzLl9yb29tcy5sZW5ndGggKyB0aGlzLl9jb3JyaWRvcnMubGVuZ3RoID09IDIpIHsgdGhpcy5fcm9vbXNbMF0uYWRkRG9vcih4LCB5KTsgfSAvKiBmaXJzdCByb29tIG9maWNpYWxseSBoYXMgZG9vcnMgKi9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlU3Vycm91bmRpbmdXYWxscyh4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlU3Vycm91bmRpbmdXYWxscyh4IC0gZGlyWzBdLCB5IC0gZGlyWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAoZmVhdHVyZUF0dGVtcHRzIDwgdGhpcy5fZmVhdHVyZUF0dGVtcHRzKTtcbiAgICAgICAgICAgIGZvciAobGV0IGlkIGluIHRoaXMuX3dhbGxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dhbGxzW2lkXSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHlXYWxscysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5fZHVnIC8gYXJlYSA8IHRoaXMuX29wdGlvbnMuZHVnUGVyY2VudGFnZSB8fCBwcmlvcml0eVdhbGxzKTsgLyogZml4bWUgbnVtYmVyIG9mIHByaW9yaXR5IHdhbGxzICovXG4gICAgICAgIHRoaXMuX2FkZERvb3JzKCk7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLl9tYXBbaV1bal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl93YWxscyA9IHt9O1xuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9kaWdDYWxsYmFjayh4LCB5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT0gMCB8fCB2YWx1ZSA9PSAyKSB7IC8qIGVtcHR5ICovXG4gICAgICAgICAgICB0aGlzLl9tYXBbeF1beV0gPSAwO1xuICAgICAgICAgICAgdGhpcy5fZHVnKys7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8qIHdhbGwgKi9cbiAgICAgICAgICAgIHRoaXMuX3dhbGxzW3ggKyBcIixcIiArIHldID0gMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfaXNXYWxsQ2FsbGJhY2soeCwgeSkge1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSB0aGlzLl93aWR0aCB8fCB5ID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fbWFwW3hdW3ldID09IDEpO1xuICAgIH1cbiAgICBfY2FuQmVEdWdDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgIGlmICh4IDwgMSB8fCB5IDwgMSB8fCB4ICsgMSA+PSB0aGlzLl93aWR0aCB8fCB5ICsgMSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuX21hcFt4XVt5XSA9PSAxKTtcbiAgICB9XG4gICAgX3ByaW9yaXR5V2FsbENhbGxiYWNrKHgsIHkpIHsgdGhpcy5fd2FsbHNbeCArIFwiLFwiICsgeV0gPSAyOyB9XG4gICAgO1xuICAgIF9maXJzdFJvb20oKSB7XG4gICAgICAgIGxldCBjeCA9IE1hdGguZmxvb3IodGhpcy5fd2lkdGggLyAyKTtcbiAgICAgICAgbGV0IGN5ID0gTWF0aC5mbG9vcih0aGlzLl9oZWlnaHQgLyAyKTtcbiAgICAgICAgbGV0IHJvb20gPSBSb29tLmNyZWF0ZVJhbmRvbUNlbnRlcihjeCwgY3ksIHRoaXMuX29wdGlvbnMpO1xuICAgICAgICB0aGlzLl9yb29tcy5wdXNoKHJvb20pO1xuICAgICAgICByb29tLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhIHN1aXRhYmxlIHdhbGxcbiAgICAgKi9cbiAgICBfZmluZFdhbGwoKSB7XG4gICAgICAgIGxldCBwcmlvMSA9IFtdO1xuICAgICAgICBsZXQgcHJpbzIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy5fd2FsbHMpIHtcbiAgICAgICAgICAgIGxldCBwcmlvID0gdGhpcy5fd2FsbHNbaWRdO1xuICAgICAgICAgICAgaWYgKHByaW8gPT0gMikge1xuICAgICAgICAgICAgICAgIHByaW8yLnB1c2goaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJpbzEucHVzaChpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFyciA9IChwcmlvMi5sZW5ndGggPyBwcmlvMiA6IHByaW8xKTtcbiAgICAgICAgaWYgKCFhcnIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSAvKiBubyB3YWxscyA6LyAqL1xuICAgICAgICBsZXQgaWQgPSBSTkcuZ2V0SXRlbShhcnIuc29ydCgpKTsgLy8gc29ydCB0byBtYWtlIHRoZSBvcmRlciBkZXRlcm1pbmlzdGljXG4gICAgICAgIGRlbGV0ZSB0aGlzLl93YWxsc1tpZF07XG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpZXMgYWRkaW5nIGEgZmVhdHVyZVxuICAgICAqIEByZXR1cm5zIHtib29sfSB3YXMgdGhpcyBhIHN1Y2Nlc3NmdWwgdHJ5P1xuICAgICAqL1xuICAgIF90cnlGZWF0dXJlKHgsIHksIGR4LCBkeSkge1xuICAgICAgICBsZXQgZmVhdHVyZU5hbWUgPSBSTkcuZ2V0V2VpZ2h0ZWRWYWx1ZSh0aGlzLl9mZWF0dXJlcyk7XG4gICAgICAgIGxldCBjdG9yID0gRkVBVFVSRVNbZmVhdHVyZU5hbWVdO1xuICAgICAgICBsZXQgZmVhdHVyZSA9IGN0b3IuY3JlYXRlUmFuZG9tQXQoeCwgeSwgZHgsIGR5LCB0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgaWYgKCFmZWF0dXJlLmlzVmFsaWQodGhpcy5faXNXYWxsQ2FsbGJhY2ssIHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2spKSB7XG4gICAgICAgICAgICAvL1x0XHRjb25zb2xlLmxvZyhcIm5vdCB2YWxpZFwiKTtcbiAgICAgICAgICAgIC8vXHRcdGZlYXR1cmUuZGVidWcoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmZWF0dXJlLmNyZWF0ZSh0aGlzLl9kaWdDYWxsYmFjayk7XG4gICAgICAgIC8vXHRmZWF0dXJlLmRlYnVnKCk7XG4gICAgICAgIGlmIChmZWF0dXJlIGluc3RhbmNlb2YgUm9vbSkge1xuICAgICAgICAgICAgdGhpcy5fcm9vbXMucHVzaChmZWF0dXJlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmVhdHVyZSBpbnN0YW5jZW9mIENvcnJpZG9yKSB7XG4gICAgICAgICAgICBmZWF0dXJlLmNyZWF0ZVByaW9yaXR5V2FsbHModGhpcy5fcHJpb3JpdHlXYWxsQ2FsbGJhY2spO1xuICAgICAgICAgICAgdGhpcy5fY29ycmlkb3JzLnB1c2goZmVhdHVyZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIF9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzKGN4LCBjeSkge1xuICAgICAgICBsZXQgZGVsdGFzID0gRElSU1s0XTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWx0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkZWx0YSA9IGRlbHRhc1tpXTtcbiAgICAgICAgICAgIGxldCB4ID0gY3ggKyBkZWx0YVswXTtcbiAgICAgICAgICAgIGxldCB5ID0gY3kgKyBkZWx0YVsxXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl93YWxsc1t4ICsgXCIsXCIgKyB5XTtcbiAgICAgICAgICAgIHggPSBjeCArIDIgKiBkZWx0YVswXTtcbiAgICAgICAgICAgIHkgPSBjeSArIDIgKiBkZWx0YVsxXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl93YWxsc1t4ICsgXCIsXCIgKyB5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHZlY3RvciBpbiBcImRpZ2dpbmdcIiBkaXJlY3Rpb24sIG9yIGZhbHNlLCBpZiB0aGlzIGRvZXMgbm90IGV4aXN0IChvciBpcyBub3QgdW5pcXVlKVxuICAgICAqL1xuICAgIF9nZXREaWdnaW5nRGlyZWN0aW9uKGN4LCBjeSkge1xuICAgICAgICBpZiAoY3ggPD0gMCB8fCBjeSA8PSAwIHx8IGN4ID49IHRoaXMuX3dpZHRoIC0gMSB8fCBjeSA+PSB0aGlzLl9oZWlnaHQgLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgbGV0IGRlbHRhcyA9IERJUlNbNF07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVsdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGVsdGEgPSBkZWx0YXNbaV07XG4gICAgICAgICAgICBsZXQgeCA9IGN4ICsgZGVsdGFbMF07XG4gICAgICAgICAgICBsZXQgeSA9IGN5ICsgZGVsdGFbMV07XG4gICAgICAgICAgICBpZiAoIXRoaXMuX21hcFt4XVt5XSkgeyAvKiB0aGVyZSBhbHJlYWR5IGlzIGFub3RoZXIgZW1wdHkgbmVpZ2hib3IhICovXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGVsdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyogbm8gZW1wdHkgbmVpZ2hib3IgKi9cbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbLXJlc3VsdFswXSwgLXJlc3VsdFsxXV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgZW1wdHkgc3BhY2VzIHN1cnJvdW5kaW5nIHJvb21zLCBhbmQgYXBwbHkgZG9vcnMuXG4gICAgICovXG4gICAgX2FkZERvb3JzKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX21hcDtcbiAgICAgICAgZnVuY3Rpb24gaXNXYWxsQ2FsbGJhY2soeCwgeSkge1xuICAgICAgICAgICAgcmV0dXJuIChkYXRhW3hdW3ldID09IDEpO1xuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9yb29tcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJvb20gPSB0aGlzLl9yb29tc1tpXTtcbiAgICAgICAgICAgIHJvb20uY2xlYXJEb29ycygpO1xuICAgICAgICAgICAgcm9vbS5hZGREb29ycyhpc1dhbGxDYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBSZWN1cnNpdmVseSBkaXZpZGVkIG1hemUsIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTWF6ZV9nZW5lcmF0aW9uX2FsZ29yaXRobSNSZWN1cnNpdmVfZGl2aXNpb25fbWV0aG9kXG4gKiBAYXVnbWVudHMgUk9ULk1hcFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXZpZGVkTWF6ZSBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuX3N0YWNrID0gW107XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgIH1cbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHcgPSB0aGlzLl93aWR0aDtcbiAgICAgICAgbGV0IGggPSB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHc7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYm9yZGVyID0gKGkgPT0gMCB8fCBqID09IDAgfHwgaSArIDEgPT0gdyB8fCBqICsgMSA9PSBoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBbaV0ucHVzaChib3JkZXIgPyAxIDogMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhY2sgPSBbXG4gICAgICAgICAgICBbMSwgMSwgdyAtIDIsIGggLSAyXVxuICAgICAgICBdO1xuICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGg7IGorKykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfcHJvY2VzcygpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuX3N0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHJvb20gPSB0aGlzLl9zdGFjay5zaGlmdCgpOyAvKiBbbGVmdCwgdG9wLCByaWdodCwgYm90dG9tXSAqL1xuICAgICAgICAgICAgdGhpcy5fcGFydGl0aW9uUm9vbShyb29tKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfcGFydGl0aW9uUm9vbShyb29tKSB7XG4gICAgICAgIGxldCBhdmFpbFggPSBbXTtcbiAgICAgICAgbGV0IGF2YWlsWSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gcm9vbVswXSArIDE7IGkgPCByb29tWzJdOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0b3AgPSB0aGlzLl9tYXBbaV1bcm9vbVsxXSAtIDFdO1xuICAgICAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMuX21hcFtpXVtyb29tWzNdICsgMV07XG4gICAgICAgICAgICBpZiAodG9wICYmIGJvdHRvbSAmJiAhKGkgJSAyKSkge1xuICAgICAgICAgICAgICAgIGF2YWlsWC5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGogPSByb29tWzFdICsgMTsgaiA8IHJvb21bM107IGorKykge1xuICAgICAgICAgICAgbGV0IGxlZnQgPSB0aGlzLl9tYXBbcm9vbVswXSAtIDFdW2pdO1xuICAgICAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5fbWFwW3Jvb21bMl0gKyAxXVtqXTtcbiAgICAgICAgICAgIGlmIChsZWZ0ICYmIHJpZ2h0ICYmICEoaiAlIDIpKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxZLnB1c2goaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhdmFpbFgubGVuZ3RoIHx8ICFhdmFpbFkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHggPSBSTkcuZ2V0SXRlbShhdmFpbFgpO1xuICAgICAgICBsZXQgeSA9IFJORy5nZXRJdGVtKGF2YWlsWSk7XG4gICAgICAgIHRoaXMuX21hcFt4XVt5XSA9IDE7XG4gICAgICAgIGxldCB3YWxscyA9IFtdO1xuICAgICAgICBsZXQgdyA9IFtdO1xuICAgICAgICB3YWxscy5wdXNoKHcpOyAvKiBsZWZ0IHBhcnQgKi9cbiAgICAgICAgZm9yIChsZXQgaSA9IHJvb21bMF07IGkgPCB4OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcFtpXVt5XSA9IDE7XG4gICAgICAgICAgICBpZiAoaSAlIDIpXG4gICAgICAgICAgICAgICAgdy5wdXNoKFtpLCB5XSk7XG4gICAgICAgIH1cbiAgICAgICAgdyA9IFtdO1xuICAgICAgICB3YWxscy5wdXNoKHcpOyAvKiByaWdodCBwYXJ0ICovXG4gICAgICAgIGZvciAobGV0IGkgPSB4ICsgMTsgaSA8PSByb29tWzJdOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcFtpXVt5XSA9IDE7XG4gICAgICAgICAgICBpZiAoaSAlIDIpXG4gICAgICAgICAgICAgICAgdy5wdXNoKFtpLCB5XSk7XG4gICAgICAgIH1cbiAgICAgICAgdyA9IFtdO1xuICAgICAgICB3YWxscy5wdXNoKHcpOyAvKiB0b3AgcGFydCAqL1xuICAgICAgICBmb3IgKGxldCBqID0gcm9vbVsxXTsgaiA8IHk7IGorKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW3hdW2pdID0gMTtcbiAgICAgICAgICAgIGlmIChqICUgMilcbiAgICAgICAgICAgICAgICB3LnB1c2goW3gsIGpdKTtcbiAgICAgICAgfVxuICAgICAgICB3ID0gW107XG4gICAgICAgIHdhbGxzLnB1c2godyk7IC8qIGJvdHRvbSBwYXJ0ICovXG4gICAgICAgIGZvciAobGV0IGogPSB5ICsgMTsgaiA8PSByb29tWzNdOyBqKyspIHtcbiAgICAgICAgICAgIHRoaXMuX21hcFt4XVtqXSA9IDE7XG4gICAgICAgICAgICBpZiAoaiAlIDIpXG4gICAgICAgICAgICAgICAgdy5wdXNoKFt4LCBqXSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNvbGlkID0gUk5HLmdldEl0ZW0od2FsbHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdhbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdyA9IHdhbGxzW2ldO1xuICAgICAgICAgICAgaWYgKHcgPT0gc29saWQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBob2xlID0gUk5HLmdldEl0ZW0odyk7XG4gICAgICAgICAgICB0aGlzLl9tYXBbaG9sZVswXV1baG9sZVsxXV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3Jvb21bMF0sIHJvb21bMV0sIHggLSAxLCB5IC0gMV0pOyAvKiBsZWZ0IHRvcCAqL1xuICAgICAgICB0aGlzLl9zdGFjay5wdXNoKFt4ICsgMSwgcm9vbVsxXSwgcm9vbVsyXSwgeSAtIDFdKTsgLyogcmlnaHQgdG9wICovXG4gICAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3Jvb21bMF0sIHkgKyAxLCB4IC0gMSwgcm9vbVszXV0pOyAvKiBsZWZ0IGJvdHRvbSAqL1xuICAgICAgICB0aGlzLl9zdGFjay5wdXNoKFt4ICsgMSwgeSArIDEsIHJvb21bMl0sIHJvb21bM11dKTsgLyogcmlnaHQgYm90dG9tICovXG4gICAgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbi8qKlxuICogQGNsYXNzIER1bmdlb24gbWFwOiBoYXMgcm9vbXMgYW5kIGNvcnJpZG9yc1xuICogQGF1Z21lbnRzIFJPVC5NYXBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHVuZ2VvbiBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fcm9vbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fY29ycmlkb3JzID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZ2VuZXJhdGVkIHJvb21zXG4gICAgICogQHJldHVybnMge1JPVC5NYXAuRmVhdHVyZS5Sb29tW119XG4gICAgICovXG4gICAgZ2V0Um9vbXMoKSB7IHJldHVybiB0aGlzLl9yb29tczsgfVxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZ2VuZXJhdGVkIGNvcnJpZG9yc1xuICAgICAqIEByZXR1cm5zIHtST1QuTWFwLkZlYXR1cmUuQ29ycmlkb3JbXX1cbiAgICAgKi9cbiAgICBnZXRDb3JyaWRvcnMoKSB7IHJldHVybiB0aGlzLl9jb3JyaWRvcnM7IH1cbn1cbiIsImltcG9ydCBNYXAgZnJvbSBcIi4vbWFwLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbi8qKlxuICogSm9pbiBsaXN0cyB3aXRoIFwiaVwiIGFuZCBcImkrMVwiXG4gKi9cbmZ1bmN0aW9uIGFkZFRvTGlzdChpLCBMLCBSKSB7XG4gICAgUltMW2kgKyAxXV0gPSBSW2ldO1xuICAgIExbUltpXV0gPSBMW2kgKyAxXTtcbiAgICBSW2ldID0gaSArIDE7XG4gICAgTFtpICsgMV0gPSBpO1xufVxuLyoqXG4gKiBSZW1vdmUgXCJpXCIgZnJvbSBpdHMgbGlzdFxuICovXG5mdW5jdGlvbiByZW1vdmVGcm9tTGlzdChpLCBMLCBSKSB7XG4gICAgUltMW2ldXSA9IFJbaV07XG4gICAgTFtSW2ldXSA9IExbaV07XG4gICAgUltpXSA9IGk7XG4gICAgTFtpXSA9IGk7XG59XG4vKipcbiAqIE1hemUgZ2VuZXJhdG9yIC0gRWxsZXIncyBhbGdvcml0aG1cbiAqIFNlZSBodHRwOi8vaG9tZXBhZ2VzLmN3aS5ubC9+dHJvbXAvbWF6ZS5odG1sIGZvciBleHBsYW5hdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGxlck1hemUgZXh0ZW5kcyBNYXAge1xuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICBsZXQgbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgbGV0IHcgPSBNYXRoLmNlaWwoKHRoaXMuX3dpZHRoIC0gMikgLyAyKTtcbiAgICAgICAgbGV0IHJhbmQgPSA5IC8gMjQ7XG4gICAgICAgIGxldCBMID0gW107XG4gICAgICAgIGxldCBSID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgICAgICBMLnB1c2goaSk7XG4gICAgICAgICAgICBSLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgTC5wdXNoKHcgLSAxKTsgLyogZmFrZSBzdG9wLWJsb2NrIGF0IHRoZSByaWdodCBzaWRlICovXG4gICAgICAgIGxldCBqO1xuICAgICAgICBmb3IgKGogPSAxOyBqICsgMyA8IHRoaXMuX2hlaWdodDsgaiArPSAyKSB7XG4gICAgICAgICAgICAvKiBvbmUgcm93ICovXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHc7IGkrKykge1xuICAgICAgICAgICAgICAgIC8qIGNlbGwgY29vcmRzICh3aWxsIGJlIGFsd2F5cyBlbXB0eSkgKi9cbiAgICAgICAgICAgICAgICBsZXQgeCA9IDIgKiBpICsgMTtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IGo7XG4gICAgICAgICAgICAgICAgbWFwW3hdW3ldID0gMDtcbiAgICAgICAgICAgICAgICAvKiByaWdodCBjb25uZWN0aW9uICovXG4gICAgICAgICAgICAgICAgaWYgKGkgIT0gTFtpICsgMV0gJiYgUk5HLmdldFVuaWZvcm0oKSA+IHJhbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkVG9MaXN0KGksIEwsIFIpO1xuICAgICAgICAgICAgICAgICAgICBtYXBbeCArIDFdW3ldID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogYm90dG9tIGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgICAgICBpZiAoaSAhPSBMW2ldICYmIFJORy5nZXRVbmlmb3JtKCkgPiByYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIHJlbW92ZSBjb25uZWN0aW9uICovXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUZyb21MaXN0KGksIEwsIFIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLyogY3JlYXRlIGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgICAgICAgICAgbWFwW3hdW3kgKyAxXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qIGxhc3Qgcm93ICovXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgICAgICAvKiBjZWxsIGNvb3JkcyAod2lsbCBiZSBhbHdheXMgZW1wdHkpICovXG4gICAgICAgICAgICBsZXQgeCA9IDIgKiBpICsgMTtcbiAgICAgICAgICAgIGxldCB5ID0gajtcbiAgICAgICAgICAgIG1hcFt4XVt5XSA9IDA7XG4gICAgICAgICAgICAvKiByaWdodCBjb25uZWN0aW9uICovXG4gICAgICAgICAgICBpZiAoaSAhPSBMW2kgKyAxXSAmJiAoaSA9PSBMW2ldIHx8IFJORy5nZXRVbmlmb3JtKCkgPiByYW5kKSkge1xuICAgICAgICAgICAgICAgIC8qIGRpZyByaWdodCBhbHNvIGlmIHRoZSBjZWxsIGlzIHNlcGFyYXRlZCwgc28gaXQgZ2V0cyBjb25uZWN0ZWQgdG8gdGhlIHJlc3Qgb2YgbWF6ZSAqL1xuICAgICAgICAgICAgICAgIGFkZFRvTGlzdChpLCBMLCBSKTtcbiAgICAgICAgICAgICAgICBtYXBbeCArIDFdW3ldID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlbW92ZUZyb21MaXN0KGksIEwsIFIpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIG1hcFtpXVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG47XG4vKipcbiAqIEBjbGFzcyBEdW5nZW9uIGZlYXR1cmU7IGhhcyBvd24gLmNyZWF0ZSgpIG1ldGhvZFxuICovXG5jbGFzcyBGZWF0dXJlIHtcbn1cbi8qKlxuICogQGNsYXNzIFJvb21cbiAqIEBhdWdtZW50cyBST1QuTWFwLkZlYXR1cmVcbiAqIEBwYXJhbSB7aW50fSB4MVxuICogQHBhcmFtIHtpbnR9IHkxXG4gKiBAcGFyYW0ge2ludH0geDJcbiAqIEBwYXJhbSB7aW50fSB5MlxuICogQHBhcmFtIHtpbnR9IFtkb29yWF1cbiAqIEBwYXJhbSB7aW50fSBbZG9vclldXG4gKi9cbmV4cG9ydCBjbGFzcyBSb29tIGV4dGVuZHMgRmVhdHVyZSB7XG4gICAgY29uc3RydWN0b3IoeDEsIHkxLCB4MiwgeTIsIGRvb3JYLCBkb29yWSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl94MSA9IHgxO1xuICAgICAgICB0aGlzLl95MSA9IHkxO1xuICAgICAgICB0aGlzLl94MiA9IHgyO1xuICAgICAgICB0aGlzLl95MiA9IHkyO1xuICAgICAgICB0aGlzLl9kb29ycyA9IHt9O1xuICAgICAgICBpZiAoZG9vclggIT09IHVuZGVmaW5lZCAmJiBkb29yWSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZERvb3IoZG9vclgsIGRvb3JZKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICA7XG4gICAgLyoqXG4gICAgICogUm9vbSBvZiByYW5kb20gc2l6ZSwgd2l0aCBhIGdpdmVuIGRvb3JzIGFuZCBkaXJlY3Rpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlUmFuZG9tQXQoeCwgeSwgZHgsIGR5LCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBtaW4gPSBvcHRpb25zLnJvb21XaWR0aFswXTtcbiAgICAgICAgbGV0IG1heCA9IG9wdGlvbnMucm9vbVdpZHRoWzFdO1xuICAgICAgICBsZXQgd2lkdGggPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIG1pbiA9IG9wdGlvbnMucm9vbUhlaWdodFswXTtcbiAgICAgICAgbWF4ID0gb3B0aW9ucy5yb29tSGVpZ2h0WzFdO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICBpZiAoZHggPT0gMSkgeyAvKiB0byB0aGUgcmlnaHQgKi9cbiAgICAgICAgICAgIGxldCB5MiA9IHkgLSBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiBoZWlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHggKyAxLCB5MiwgeCArIHdpZHRoLCB5MiArIGhlaWdodCAtIDEsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeCA9PSAtMSkgeyAvKiB0byB0aGUgbGVmdCAqL1xuICAgICAgICAgICAgbGV0IHkyID0geSAtIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIGhlaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoeCAtIHdpZHRoLCB5MiwgeCAtIDEsIHkyICsgaGVpZ2h0IC0gMSwgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR5ID09IDEpIHsgLyogdG8gdGhlIGJvdHRvbSAqL1xuICAgICAgICAgICAgbGV0IHgyID0geCAtIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIHdpZHRoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcyh4MiwgeSArIDEsIHgyICsgd2lkdGggLSAxLCB5ICsgaGVpZ2h0LCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHkgPT0gLTEpIHsgLyogdG8gdGhlIHRvcCAqL1xuICAgICAgICAgICAgbGV0IHgyID0geCAtIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIHdpZHRoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcyh4MiwgeSAtIGhlaWdodCwgeDIgKyB3aWR0aCAtIDEsIHkgLSAxLCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkeCBvciBkeSBtdXN0IGJlIDEgb3IgLTFcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJvb20gb2YgcmFuZG9tIHNpemUsIHBvc2l0aW9uZWQgYXJvdW5kIGNlbnRlciBjb29yZHNcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlUmFuZG9tQ2VudGVyKGN4LCBjeSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgbWluID0gb3B0aW9ucy5yb29tV2lkdGhbMF07XG4gICAgICAgIGxldCBtYXggPSBvcHRpb25zLnJvb21XaWR0aFsxXTtcbiAgICAgICAgbGV0IHdpZHRoID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICBtaW4gPSBvcHRpb25zLnJvb21IZWlnaHRbMF07XG4gICAgICAgIG1heCA9IG9wdGlvbnMucm9vbUhlaWdodFsxXTtcbiAgICAgICAgbGV0IGhlaWdodCA9IFJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgICAgbGV0IHgxID0gY3ggLSBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiB3aWR0aCk7XG4gICAgICAgIGxldCB5MSA9IGN5IC0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogaGVpZ2h0KTtcbiAgICAgICAgbGV0IHgyID0geDEgKyB3aWR0aCAtIDE7XG4gICAgICAgIGxldCB5MiA9IHkxICsgaGVpZ2h0IC0gMTtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHgxLCB5MSwgeDIsIHkyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUm9vbSBvZiByYW5kb20gc2l6ZSB3aXRoaW4gYSBnaXZlbiBkaW1lbnNpb25zXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVJhbmRvbShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCwgb3B0aW9ucykge1xuICAgICAgICBsZXQgbWluID0gb3B0aW9ucy5yb29tV2lkdGhbMF07XG4gICAgICAgIGxldCBtYXggPSBvcHRpb25zLnJvb21XaWR0aFsxXTtcbiAgICAgICAgbGV0IHdpZHRoID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICBtaW4gPSBvcHRpb25zLnJvb21IZWlnaHRbMF07XG4gICAgICAgIG1heCA9IG9wdGlvbnMucm9vbUhlaWdodFsxXTtcbiAgICAgICAgbGV0IGhlaWdodCA9IFJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgICAgbGV0IGxlZnQgPSBhdmFpbFdpZHRoIC0gd2lkdGggLSAxO1xuICAgICAgICBsZXQgdG9wID0gYXZhaWxIZWlnaHQgLSBoZWlnaHQgLSAxO1xuICAgICAgICBsZXQgeDEgPSAxICsgTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogbGVmdCk7XG4gICAgICAgIGxldCB5MSA9IDEgKyBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiB0b3ApO1xuICAgICAgICBsZXQgeDIgPSB4MSArIHdpZHRoIC0gMTtcbiAgICAgICAgbGV0IHkyID0geTEgKyBoZWlnaHQgLSAxO1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoeDEsIHkxLCB4MiwgeTIpO1xuICAgIH1cbiAgICBhZGREb29yKHgsIHkpIHtcbiAgICAgICAgdGhpcy5fZG9vcnNbeCArIFwiLFwiICsgeV0gPSAxO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn1cbiAgICAgKi9cbiAgICBnZXREb29ycyhjYikge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fZG9vcnMpIHtcbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IGtleS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICBjYihwYXJzZUludChwYXJ0c1swXSksIHBhcnNlSW50KHBhcnRzWzFdKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNsZWFyRG9vcnMoKSB7XG4gICAgICAgIHRoaXMuX2Rvb3JzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGREb29ycyhpc1dhbGxDYWxsYmFjaykge1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuX3gxIC0gMTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5feDIgKyAxO1xuICAgICAgICBsZXQgdG9wID0gdGhpcy5feTEgLSAxO1xuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5feTIgKyAxO1xuICAgICAgICBmb3IgKGxldCB4ID0gbGVmdDsgeCA8PSByaWdodDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gdG9wOyB5IDw9IGJvdHRvbTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHggIT0gbGVmdCAmJiB4ICE9IHJpZ2h0ICYmIHkgIT0gdG9wICYmIHkgIT0gYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNXYWxsQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWRkRG9vcih4LCB5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGVidWcoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicm9vbVwiLCB0aGlzLl94MSwgdGhpcy5feTEsIHRoaXMuX3gyLCB0aGlzLl95Mik7XG4gICAgfVxuICAgIGlzVmFsaWQoaXNXYWxsQ2FsbGJhY2ssIGNhbkJlRHVnQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLl94MSAtIDE7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuX3gyICsgMTtcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMuX3kxIC0gMTtcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMuX3kyICsgMTtcbiAgICAgICAgZm9yIChsZXQgeCA9IGxlZnQ7IHggPD0gcmlnaHQ7IHgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IHRvcDsgeSA8PSBib3R0b207IHkrKykge1xuICAgICAgICAgICAgICAgIGlmICh4ID09IGxlZnQgfHwgeCA9PSByaWdodCB8fCB5ID09IHRvcCB8fCB5ID09IGJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzV2FsbENhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuQmVEdWdDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBkaWdDYWxsYmFjayBEaWcgY2FsbGJhY2sgd2l0aCBhIHNpZ25hdHVyZSAoeCwgeSwgdmFsdWUpLiBWYWx1ZXM6IDAgPSBlbXB0eSwgMSA9IHdhbGwsIDIgPSBkb29yLiBNdWx0aXBsZSBkb29ycyBhcmUgYWxsb3dlZC5cbiAgICAgKi9cbiAgICBjcmVhdGUoZGlnQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGxlZnQgPSB0aGlzLl94MSAtIDE7XG4gICAgICAgIGxldCByaWdodCA9IHRoaXMuX3gyICsgMTtcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMuX3kxIC0gMTtcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMuX3kyICsgMTtcbiAgICAgICAgbGV0IHZhbHVlID0gMDtcbiAgICAgICAgZm9yIChsZXQgeCA9IGxlZnQ7IHggPD0gcmlnaHQ7IHgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IHRvcDsgeSA8PSBib3R0b207IHkrKykge1xuICAgICAgICAgICAgICAgIGlmICh4ICsgXCIsXCIgKyB5IGluIHRoaXMuX2Rvb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoeCA9PSBsZWZ0IHx8IHggPT0gcmlnaHQgfHwgeSA9PSB0b3AgfHwgeSA9PSBib3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaWdDYWxsYmFjayh4LCB5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0Q2VudGVyKCkge1xuICAgICAgICByZXR1cm4gW01hdGgucm91bmQoKHRoaXMuX3gxICsgdGhpcy5feDIpIC8gMiksIE1hdGgucm91bmQoKHRoaXMuX3kxICsgdGhpcy5feTIpIC8gMildO1xuICAgIH1cbiAgICBnZXRMZWZ0KCkgeyByZXR1cm4gdGhpcy5feDE7IH1cbiAgICBnZXRSaWdodCgpIHsgcmV0dXJuIHRoaXMuX3gyOyB9XG4gICAgZ2V0VG9wKCkgeyByZXR1cm4gdGhpcy5feTE7IH1cbiAgICBnZXRCb3R0b20oKSB7IHJldHVybiB0aGlzLl95MjsgfVxufVxuLyoqXG4gKiBAY2xhc3MgQ29ycmlkb3JcbiAqIEBhdWdtZW50cyBST1QuTWFwLkZlYXR1cmVcbiAqIEBwYXJhbSB7aW50fSBzdGFydFhcbiAqIEBwYXJhbSB7aW50fSBzdGFydFlcbiAqIEBwYXJhbSB7aW50fSBlbmRYXG4gKiBAcGFyYW0ge2ludH0gZW5kWVxuICovXG5leHBvcnQgY2xhc3MgQ29ycmlkb3IgZXh0ZW5kcyBGZWF0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9zdGFydFggPSBzdGFydFg7XG4gICAgICAgIHRoaXMuX3N0YXJ0WSA9IHN0YXJ0WTtcbiAgICAgICAgdGhpcy5fZW5kWCA9IGVuZFg7XG4gICAgICAgIHRoaXMuX2VuZFkgPSBlbmRZO1xuICAgICAgICB0aGlzLl9lbmRzV2l0aEFXYWxsID0gdHJ1ZTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZVJhbmRvbUF0KHgsIHksIGR4LCBkeSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgbWluID0gb3B0aW9ucy5jb3JyaWRvckxlbmd0aFswXTtcbiAgICAgICAgbGV0IG1heCA9IG9wdGlvbnMuY29ycmlkb3JMZW5ndGhbMV07XG4gICAgICAgIGxldCBsZW5ndGggPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyh4LCB5LCB4ICsgZHggKiBsZW5ndGgsIHkgKyBkeSAqIGxlbmd0aCk7XG4gICAgfVxuICAgIGRlYnVnKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvcnJpZG9yXCIsIHRoaXMuX3N0YXJ0WCwgdGhpcy5fc3RhcnRZLCB0aGlzLl9lbmRYLCB0aGlzLl9lbmRZKTtcbiAgICB9XG4gICAgaXNWYWxpZChpc1dhbGxDYWxsYmFjaywgY2FuQmVEdWdDYWxsYmFjaykge1xuICAgICAgICBsZXQgc3ggPSB0aGlzLl9zdGFydFg7XG4gICAgICAgIGxldCBzeSA9IHRoaXMuX3N0YXJ0WTtcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5fZW5kWCAtIHN4O1xuICAgICAgICBsZXQgZHkgPSB0aGlzLl9lbmRZIC0gc3k7XG4gICAgICAgIGxldCBsZW5ndGggPSAxICsgTWF0aC5tYXgoTWF0aC5hYnMoZHgpLCBNYXRoLmFicyhkeSkpO1xuICAgICAgICBpZiAoZHgpIHtcbiAgICAgICAgICAgIGR4ID0gZHggLyBNYXRoLmFicyhkeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR5KSB7XG4gICAgICAgICAgICBkeSA9IGR5IC8gTWF0aC5hYnMoZHkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBueCA9IGR5O1xuICAgICAgICBsZXQgbnkgPSAtZHg7XG4gICAgICAgIGxldCBvayA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB4ID0gc3ggKyBpICogZHg7XG4gICAgICAgICAgICBsZXQgeSA9IHN5ICsgaSAqIGR5O1xuICAgICAgICAgICAgaWYgKCFjYW5CZUR1Z0NhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgb2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNXYWxsQ2FsbGJhY2soeCArIG54LCB5ICsgbnkpKSB7XG4gICAgICAgICAgICAgICAgb2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNXYWxsQ2FsbGJhY2soeCAtIG54LCB5IC0gbnkpKSB7XG4gICAgICAgICAgICAgICAgb2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VuZFggPSB4IC0gZHg7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW5kWSA9IHkgLSBkeTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdGhlIGxlbmd0aCBkZWdlbmVyYXRlZCwgdGhpcyBjb3JyaWRvciBtaWdodCBiZSBpbnZhbGlkXG4gICAgICAgICAqL1xuICAgICAgICAvKiBub3Qgc3VwcG9ydGVkICovXG4gICAgICAgIGlmIChsZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qIGxlbmd0aCAxIGFsbG93ZWQgb25seSBpZiB0aGUgbmV4dCBzcGFjZSBpcyBlbXB0eSAqL1xuICAgICAgICBpZiAobGVuZ3RoID09IDEgJiYgaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4LCB0aGlzLl9lbmRZICsgZHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdlIGRvIG5vdCB3YW50IHRoZSBjb3JyaWRvciB0byBjcmFzaCBpbnRvIGEgY29ybmVyIG9mIGEgcm9vbTtcbiAgICAgICAgICogaWYgYW55IG9mIHRoZSBlbmRpbmcgY29ybmVycyBpcyBlbXB0eSwgdGhlIE4rMXRoIGNlbGwgb2YgdGhpcyBjb3JyaWRvciBtdXN0IGJlIGVtcHR5IHRvby5cbiAgICAgICAgICpcbiAgICAgICAgICogU2l0dWF0aW9uOlxuICAgICAgICAgKiAjIyMjIyMjMVxuICAgICAgICAgKiAuLi4uLi4uP1xuICAgICAgICAgKiAjIyMjIyMjMlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgY29ycmlkb3Igd2FzIGR1ZyBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gICAgICAgICAqIDEsIDIgLSBwcm9ibGVtYXRpYyBjb3JuZXJzLCA/ID0gTisxdGggY2VsbCAobm90IGR1ZylcbiAgICAgICAgICovXG4gICAgICAgIGxldCBmaXJzdENvcm5lckJhZCA9ICFpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHggKyBueCwgdGhpcy5fZW5kWSArIGR5ICsgbnkpO1xuICAgICAgICBsZXQgc2Vjb25kQ29ybmVyQmFkID0gIWlzV2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCAtIG54LCB0aGlzLl9lbmRZICsgZHkgLSBueSk7XG4gICAgICAgIHRoaXMuX2VuZHNXaXRoQVdhbGwgPSBpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHgsIHRoaXMuX2VuZFkgKyBkeSk7XG4gICAgICAgIGlmICgoZmlyc3RDb3JuZXJCYWQgfHwgc2Vjb25kQ29ybmVyQmFkKSAmJiB0aGlzLl9lbmRzV2l0aEFXYWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpZ0NhbGxiYWNrIERpZyBjYWxsYmFjayB3aXRoIGEgc2lnbmF0dXJlICh4LCB5LCB2YWx1ZSkuIFZhbHVlczogMCA9IGVtcHR5LlxuICAgICAqL1xuICAgIGNyZWF0ZShkaWdDYWxsYmFjaykge1xuICAgICAgICBsZXQgc3ggPSB0aGlzLl9zdGFydFg7XG4gICAgICAgIGxldCBzeSA9IHRoaXMuX3N0YXJ0WTtcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5fZW5kWCAtIHN4O1xuICAgICAgICBsZXQgZHkgPSB0aGlzLl9lbmRZIC0gc3k7XG4gICAgICAgIGxldCBsZW5ndGggPSAxICsgTWF0aC5tYXgoTWF0aC5hYnMoZHgpLCBNYXRoLmFicyhkeSkpO1xuICAgICAgICBpZiAoZHgpIHtcbiAgICAgICAgICAgIGR4ID0gZHggLyBNYXRoLmFicyhkeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR5KSB7XG4gICAgICAgICAgICBkeSA9IGR5IC8gTWF0aC5hYnMoZHkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB4ID0gc3ggKyBpICogZHg7XG4gICAgICAgICAgICBsZXQgeSA9IHN5ICsgaSAqIGR5O1xuICAgICAgICAgICAgZGlnQ2FsbGJhY2soeCwgeSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNyZWF0ZVByaW9yaXR5V2FsbHMocHJpb3JpdHlXYWxsQ2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbmRzV2l0aEFXYWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN4ID0gdGhpcy5fc3RhcnRYO1xuICAgICAgICBsZXQgc3kgPSB0aGlzLl9zdGFydFk7XG4gICAgICAgIGxldCBkeCA9IHRoaXMuX2VuZFggLSBzeDtcbiAgICAgICAgbGV0IGR5ID0gdGhpcy5fZW5kWSAtIHN5O1xuICAgICAgICBpZiAoZHgpIHtcbiAgICAgICAgICAgIGR4ID0gZHggLyBNYXRoLmFicyhkeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR5KSB7XG4gICAgICAgICAgICBkeSA9IGR5IC8gTWF0aC5hYnMoZHkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBueCA9IGR5O1xuICAgICAgICBsZXQgbnkgPSAtZHg7XG4gICAgICAgIHByaW9yaXR5V2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCwgdGhpcy5fZW5kWSArIGR5KTtcbiAgICAgICAgcHJpb3JpdHlXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIG54LCB0aGlzLl9lbmRZICsgbnkpO1xuICAgICAgICBwcmlvcml0eVdhbGxDYWxsYmFjayh0aGlzLl9lbmRYIC0gbngsIHRoaXMuX2VuZFkgLSBueSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuLyoqXG4gKiBJY2V5J3MgTWF6ZSBnZW5lcmF0b3JcbiAqIFNlZSBodHRwOi8vd3d3LnJvZ3VlYmFzaW4ucm9ndWVsaWtlZGV2ZWxvcG1lbnQub3JnL2luZGV4LnBocD90aXRsZT1TaW1wbGVfbWF6ZSBmb3IgZXhwbGFuYXRpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNleU1hemUgZXh0ZW5kcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIHJlZ3VsYXJpdHkgPSAwKSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9yZWd1bGFyaXR5ID0gcmVndWxhcml0eTtcbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgfVxuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLl93aWR0aDtcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgbGV0IG1hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICAgIHdpZHRoIC09ICh3aWR0aCAlIDIgPyAxIDogMik7XG4gICAgICAgIGhlaWdodCAtPSAoaGVpZ2h0ICUgMiA/IDEgOiAyKTtcbiAgICAgICAgbGV0IGN4ID0gMDtcbiAgICAgICAgbGV0IGN5ID0gMDtcbiAgICAgICAgbGV0IG54ID0gMDtcbiAgICAgICAgbGV0IG55ID0gMDtcbiAgICAgICAgbGV0IGRvbmUgPSAwO1xuICAgICAgICBsZXQgYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgZGlycyA9IFtcbiAgICAgICAgICAgIFswLCAwXSxcbiAgICAgICAgICAgIFswLCAwXSxcbiAgICAgICAgICAgIFswLCAwXSxcbiAgICAgICAgICAgIFswLCAwXVxuICAgICAgICBdO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBjeCA9IDEgKyAyICogTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogKHdpZHRoIC0gMSkgLyAyKTtcbiAgICAgICAgICAgIGN5ID0gMSArIDIgKiBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiAoaGVpZ2h0IC0gMSkgLyAyKTtcbiAgICAgICAgICAgIGlmICghZG9uZSkge1xuICAgICAgICAgICAgICAgIG1hcFtjeF1bY3ldID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbWFwW2N4XVtjeV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yYW5kb21pemUoZGlycyk7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogKHRoaXMuX3JlZ3VsYXJpdHkgKyAxKSkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmFuZG9taXplKGRpcnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnggPSBjeCArIGRpcnNbaV1bMF0gKiAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgbnkgPSBjeSArIGRpcnNbaV1bMV0gKiAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzRnJlZShtYXAsIG54LCBueSwgd2lkdGgsIGhlaWdodCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBbbnhdW255XSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwW2N4ICsgZGlyc1tpXVswXV1bY3kgKyBkaXJzW2ldWzFdXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ggPSBueDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeSA9IG55O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb25lKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IHdoaWxlICghYmxvY2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGRvbmUgKyAxIDwgd2lkdGggKiBoZWlnaHQgLyA0KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgbWFwW2ldW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9yYW5kb21pemUoZGlycykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgZGlyc1tpXVswXSA9IDA7XG4gICAgICAgICAgICBkaXJzW2ldWzFdID0gMDtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIDQpKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgZGlyc1swXVswXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbMV1bMF0gPSAxO1xuICAgICAgICAgICAgICAgIGRpcnNbMl1bMV0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzNdWzFdID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBkaXJzWzNdWzBdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1syXVswXSA9IDE7XG4gICAgICAgICAgICAgICAgZGlyc1sxXVsxXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbMF1bMV0gPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGRpcnNbMl1bMF0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzNdWzBdID0gMTtcbiAgICAgICAgICAgICAgICBkaXJzWzBdWzFdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1sxXVsxXSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgZGlyc1sxXVswXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbMF1bMF0gPSAxO1xuICAgICAgICAgICAgICAgIGRpcnNbM11bMV0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzJdWzFdID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBfaXNGcmVlKG1hcCwgeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAoeCA8IDEgfHwgeSA8IDEgfHwgeCA+PSB3aWR0aCB8fCB5ID49IGhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXBbeF1beV07XG4gICAgfVxufVxuIiwiaW1wb3J0IEFyZW5hIGZyb20gXCIuL2FyZW5hLmpzXCI7XG5pbXBvcnQgVW5pZm9ybSBmcm9tIFwiLi91bmlmb3JtLmpzXCI7XG5pbXBvcnQgQ2VsbHVsYXIgZnJvbSBcIi4vY2VsbHVsYXIuanNcIjtcbmltcG9ydCBEaWdnZXIgZnJvbSBcIi4vZGlnZ2VyLmpzXCI7XG5pbXBvcnQgRWxsZXJNYXplIGZyb20gXCIuL2VsbGVybWF6ZS5qc1wiO1xuaW1wb3J0IERpdmlkZWRNYXplIGZyb20gXCIuL2RpdmlkZWRtYXplLmpzXCI7XG5pbXBvcnQgSWNleU1hemUgZnJvbSBcIi4vaWNleW1hemUuanNcIjtcbmltcG9ydCBSb2d1ZSBmcm9tIFwiLi9yb2d1ZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgeyBBcmVuYSwgVW5pZm9ybSwgQ2VsbHVsYXIsIERpZ2dlciwgRWxsZXJNYXplLCBEaXZpZGVkTWF6ZSwgSWNleU1hemUsIFJvZ3VlIH07XG4iLCJpbXBvcnQgeyBERUZBVUxUX1dJRFRILCBERUZBVUxUX0hFSUdIVCB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcCB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEJhc2UgbWFwIGdlbmVyYXRvclxuICAgICAqIEBwYXJhbSB7aW50fSBbd2lkdGg9Uk9ULkRFRkFVTFRfV0lEVEhdXG4gICAgICogQHBhcmFtIHtpbnR9IFtoZWlnaHQ9Uk9ULkRFRkFVTFRfSEVJR0hUXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoID0gREVGQVVMVF9XSURUSCwgaGVpZ2h0ID0gREVGQVVMVF9IRUlHSFQpIHtcbiAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cbiAgICA7XG4gICAgX2ZpbGxNYXAodmFsdWUpIHtcbiAgICAgICAgbGV0IG1hcCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIG1hcC5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICBtYXBbaV0ucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG5pbXBvcnQgeyBESVJTIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuLyoqXG4gKiBEdW5nZW9uIGdlbmVyYXRvciB3aGljaCB1c2VzIHRoZSBcIm9yZ2luYWxcIiBSb2d1ZSBkdW5nZW9uIGdlbmVyYXRpb24gYWxnb3JpdGhtLiBTZWUgaHR0cDovL2t1b2kuY29tL35rYW1pa2F6ZS9HYW1lRGVzaWduL2FydDA3X3JvZ3VlX2R1bmdlb24ucGhwXG4gKiBAYXV0aG9yIGh5YWt1Z2VpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvZ3VlIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLm1hcCA9IFtdO1xuICAgICAgICB0aGlzLnJvb21zID0gW107XG4gICAgICAgIHRoaXMuY29ubmVjdGVkQ2VsbHMgPSBbXTtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgY2VsbFdpZHRoOiAzLFxuICAgICAgICAgICAgY2VsbEhlaWdodDogMyAvLyAgICAgaWUuIGFzIGFuIGFycmF5IHdpdGggbWluLW1heCB2YWx1ZXMgZm9yIGVhY2ggZGlyZWN0aW9uLi4uLlxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgLypcbiAgICAgICAgU2V0IHRoZSByb29tIHNpemVzIGFjY29yZGluZyB0byB0aGUgb3Zlci1hbGwgd2lkdGggb2YgdGhlIG1hcCxcbiAgICAgICAgYW5kIHRoZSBjZWxsIHNpemVzLlxuICAgICAgICAqL1xuICAgICAgICBpZiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJyb29tV2lkdGhcIikpIHtcbiAgICAgICAgICAgIG9wdGlvbnNbXCJyb29tV2lkdGhcIl0gPSB0aGlzLl9jYWxjdWxhdGVSb29tU2l6ZSh0aGlzLl93aWR0aCwgb3B0aW9uc1tcImNlbGxXaWR0aFwiXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRpb25zLmhhc093blByb3BlcnR5KFwicm9vbUhlaWdodFwiKSkge1xuICAgICAgICAgICAgb3B0aW9uc1tcInJvb21IZWlnaHRcIl0gPSB0aGlzLl9jYWxjdWxhdGVSb29tU2l6ZSh0aGlzLl9oZWlnaHQsIG9wdGlvbnNbXCJjZWxsSGVpZ2h0XCJdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgdGhpcy5yb29tcyA9IFtdO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZENlbGxzID0gW107XG4gICAgICAgIHRoaXMuX2luaXRSb29tcygpO1xuICAgICAgICB0aGlzLl9jb25uZWN0Um9vbXMoKTtcbiAgICAgICAgdGhpcy5fY29ubmVjdFVuY29ubmVjdGVkUm9vbXMoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlUmFuZG9tUm9vbUNvbm5lY3Rpb25zKCk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZVJvb21zKCk7XG4gICAgICAgIHRoaXMuX2NyZWF0ZUNvcnJpZG9ycygpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5tYXBbaV1bal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX2NhbGN1bGF0ZVJvb21TaXplKHNpemUsIGNlbGwpIHtcbiAgICAgICAgbGV0IG1heCA9IE1hdGguZmxvb3IoKHNpemUgLyBjZWxsKSAqIDAuOCk7XG4gICAgICAgIGxldCBtaW4gPSBNYXRoLmZsb29yKChzaXplIC8gY2VsbCkgKiAwLjI1KTtcbiAgICAgICAgaWYgKG1pbiA8IDIpIHtcbiAgICAgICAgICAgIG1pbiA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heCA8IDIpIHtcbiAgICAgICAgICAgIG1heCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFttaW4sIG1heF07XG4gICAgfVxuICAgIF9pbml0Um9vbXMoKSB7XG4gICAgICAgIC8vIGNyZWF0ZSByb29tcyBhcnJheS4gVGhpcyBpcyB0aGUgXCJncmlkXCIgbGlzdCBmcm9tIHRoZSBhbGdvLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucm9vbXMucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXS5wdXNoKHsgXCJ4XCI6IDAsIFwieVwiOiAwLCBcIndpZHRoXCI6IDAsIFwiaGVpZ2h0XCI6IDAsIFwiY29ubmVjdGlvbnNcIjogW10sIFwiY2VsbHhcIjogaSwgXCJjZWxseVwiOiBqIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9jb25uZWN0Um9vbXMoKSB7XG4gICAgICAgIC8vcGljayByYW5kb20gc3RhcnRpbmcgZ3JpZFxuICAgICAgICBsZXQgY2d4ID0gUk5HLmdldFVuaWZvcm1JbnQoMCwgdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGggLSAxKTtcbiAgICAgICAgbGV0IGNneSA9IFJORy5nZXRVbmlmb3JtSW50KDAsIHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodCAtIDEpO1xuICAgICAgICBsZXQgaWR4O1xuICAgICAgICBsZXQgbmNneDtcbiAgICAgICAgbGV0IG5jZ3k7XG4gICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBsZXQgcm9vbTtcbiAgICAgICAgbGV0IG90aGVyUm9vbTtcbiAgICAgICAgbGV0IGRpclRvQ2hlY2s7XG4gICAgICAgIC8vIGZpbmQgIHVuY29ubmVjdGVkIG5laWdoYm91ciBjZWxsc1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICAvL2RpclRvQ2hlY2sgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgN107XG4gICAgICAgICAgICBkaXJUb0NoZWNrID0gWzAsIDIsIDQsIDZdO1xuICAgICAgICAgICAgZGlyVG9DaGVjayA9IFJORy5zaHVmZmxlKGRpclRvQ2hlY2spO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWR4ID0gZGlyVG9DaGVjay5wb3AoKTtcbiAgICAgICAgICAgICAgICBuY2d4ID0gY2d4ICsgRElSU1s4XVtpZHhdWzBdO1xuICAgICAgICAgICAgICAgIG5jZ3kgPSBjZ3kgKyBESVJTWzhdW2lkeF1bMV07XG4gICAgICAgICAgICAgICAgaWYgKG5jZ3ggPCAwIHx8IG5jZ3ggPj0gdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuY2d5IDwgMCB8fCBuY2d5ID49IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcm9vbSA9IHRoaXMucm9vbXNbY2d4XVtjZ3ldO1xuICAgICAgICAgICAgICAgIGlmIChyb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhcyBsb25nIGFzIHRoaXMgcm9vbSBkb2Vzbid0IGFscmVhZHkgY29vbmVjdCB0byBtZSwgd2UgYXJlIG9rIHdpdGggaXQuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb29tW1wiY29ubmVjdGlvbnNcIl1bMF1bMF0gPT0gbmNneCAmJiByb29tW1wiY29ubmVjdGlvbnNcIl1bMF1bMV0gPT0gbmNneSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tuY2d4XVtuY2d5XTtcbiAgICAgICAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ucHVzaChbY2d4LCBjZ3ldKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0ZWRDZWxscy5wdXNoKFtuY2d4LCBuY2d5XSk7XG4gICAgICAgICAgICAgICAgICAgIGNneCA9IG5jZ3g7XG4gICAgICAgICAgICAgICAgICAgIGNneSA9IG5jZ3k7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlIChkaXJUb0NoZWNrLmxlbmd0aCA+IDAgJiYgZm91bmQgPT0gZmFsc2UpO1xuICAgICAgICB9IHdoaWxlIChkaXJUb0NoZWNrLmxlbmd0aCA+IDApO1xuICAgIH1cbiAgICBfY29ubmVjdFVuY29ubmVjdGVkUm9vbXMoKSB7XG4gICAgICAgIC8vV2hpbGUgdGhlcmUgYXJlIHVuY29ubmVjdGVkIHJvb21zLCB0cnkgdG8gY29ubmVjdCB0aGVtIHRvIGEgcmFuZG9tIGNvbm5lY3RlZCBuZWlnaGJvclxuICAgICAgICAvLyhpZiBhIHJvb20gaGFzIG5vIGNvbm5lY3RlZCBuZWlnaGJvcnMgeWV0LCBqdXN0IGtlZXAgY3ljbGluZywgeW91J2xsIGZpbGwgb3V0IHRvIGl0IGV2ZW50dWFsbHkpLlxuICAgICAgICBsZXQgY3cgPSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDtcbiAgICAgICAgbGV0IGNoID0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0O1xuICAgICAgICB0aGlzLmNvbm5lY3RlZENlbGxzID0gUk5HLnNodWZmbGUodGhpcy5jb25uZWN0ZWRDZWxscyk7XG4gICAgICAgIGxldCByb29tO1xuICAgICAgICBsZXQgb3RoZXJSb29tO1xuICAgICAgICBsZXQgdmFsaWRSb29tO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICByb29tID0gdGhpcy5yb29tc1tpXVtqXTtcbiAgICAgICAgICAgICAgICBpZiAocm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb25zID0gWzAsIDIsIDQsIDZdO1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zID0gUk5HLnNodWZmbGUoZGlyZWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkUm9vbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlySWR4ID0gZGlyZWN0aW9ucy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdJID0gaSArIERJUlNbOF1bZGlySWR4XVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdKID0gaiArIERJUlNbOF1bZGlySWR4XVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdJIDwgMCB8fCBuZXdJID49IGN3IHx8IG5ld0ogPCAwIHx8IG5ld0ogPj0gY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbbmV3SV1bbmV3Sl07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZFJvb20gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyUm9vbVtcImNvbm5lY3Rpb25zXCJdW2tdWzBdID09IGkgJiYgb3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl1ba11bMV0gPT0gaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZFJvb20gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkUm9vbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChkaXJlY3Rpb25zLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZFJvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb21bXCJjb25uZWN0aW9uc1wiXS5wdXNoKFtvdGhlclJvb21bXCJjZWxseFwiXSwgb3RoZXJSb29tW1wiY2VsbHlcIl1dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0gVW5hYmxlIHRvIGNvbm5lY3Qgcm9vbS5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NyZWF0ZVJhbmRvbVJvb21Db25uZWN0aW9ucygpIHtcbiAgICAgICAgLy8gRW1wdHkgZm9yIG5vdy5cbiAgICB9XG4gICAgX2NyZWF0ZVJvb21zKCkge1xuICAgICAgICBsZXQgdyA9IHRoaXMuX3dpZHRoO1xuICAgICAgICBsZXQgaCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgbGV0IGN3ID0gdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7XG4gICAgICAgIGxldCBjaCA9IHRoaXMuX29wdGlvbnMuY2VsbEhlaWdodDtcbiAgICAgICAgbGV0IGN3cCA9IE1hdGguZmxvb3IodGhpcy5fd2lkdGggLyBjdyk7XG4gICAgICAgIGxldCBjaHAgPSBNYXRoLmZsb29yKHRoaXMuX2hlaWdodCAvIGNoKTtcbiAgICAgICAgbGV0IHJvb213O1xuICAgICAgICBsZXQgcm9vbWg7XG4gICAgICAgIGxldCByb29tV2lkdGggPSB0aGlzLl9vcHRpb25zW1wicm9vbVdpZHRoXCJdO1xuICAgICAgICBsZXQgcm9vbUhlaWdodCA9IHRoaXMuX29wdGlvbnNbXCJyb29tSGVpZ2h0XCJdO1xuICAgICAgICBsZXQgc3g7XG4gICAgICAgIGxldCBzeTtcbiAgICAgICAgbGV0IG90aGVyUm9vbTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdzsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBzeCA9IGN3cCAqIGk7XG4gICAgICAgICAgICAgICAgc3kgPSBjaHAgKiBqO1xuICAgICAgICAgICAgICAgIGlmIChzeCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN4ID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN5ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3kgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByb29tdyA9IFJORy5nZXRVbmlmb3JtSW50KHJvb21XaWR0aFswXSwgcm9vbVdpZHRoWzFdKTtcbiAgICAgICAgICAgICAgICByb29taCA9IFJORy5nZXRVbmlmb3JtSW50KHJvb21IZWlnaHRbMF0sIHJvb21IZWlnaHRbMV0pO1xuICAgICAgICAgICAgICAgIGlmIChqID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW2ldW2ogLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHN5IC0gKG90aGVyUm9vbVtcInlcIl0gKyBvdGhlclJvb21bXCJoZWlnaHRcIl0pIDwgMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3krKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tpIC0gMV1bal07XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChzeCAtIChvdGhlclJvb21bXCJ4XCJdICsgb3RoZXJSb29tW1wid2lkdGhcIl0pIDwgMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3grKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgc3hPZmZzZXQgPSBNYXRoLnJvdW5kKFJORy5nZXRVbmlmb3JtSW50KDAsIGN3cCAtIHJvb213KSAvIDIpO1xuICAgICAgICAgICAgICAgIGxldCBzeU9mZnNldCA9IE1hdGgucm91bmQoUk5HLmdldFVuaWZvcm1JbnQoMCwgY2hwIC0gcm9vbWgpIC8gMik7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHN4ICsgc3hPZmZzZXQgKyByb29tdyA+PSB3KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzeE9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3hPZmZzZXQtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb213LS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKHN5ICsgc3lPZmZzZXQgKyByb29taCA+PSBoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzeU9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3lPZmZzZXQtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb21oLS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3ggPSBzeCArIHN4T2Zmc2V0O1xuICAgICAgICAgICAgICAgIHN5ID0gc3kgKyBzeU9mZnNldDtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb21zW2ldW2pdW1wieFwiXSA9IHN4O1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbXNbaV1bal1bXCJ5XCJdID0gc3k7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXVtqXVtcIndpZHRoXCJdID0gcm9vbXc7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXVtqXVtcImhlaWdodFwiXSA9IHJvb21oO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlpID0gc3g7IGlpIDwgc3ggKyByb29tdzsgaWkrKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqaiA9IHN5OyBqaiA8IHN5ICsgcm9vbWg7IGpqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwW2lpXVtqal0gPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRXYWxsUG9zaXRpb24oYVJvb20sIGFEaXJlY3Rpb24pIHtcbiAgICAgICAgbGV0IHJ4O1xuICAgICAgICBsZXQgcnk7XG4gICAgICAgIGxldCBkb29yO1xuICAgICAgICBpZiAoYURpcmVjdGlvbiA9PSAxIHx8IGFEaXJlY3Rpb24gPT0gMykge1xuICAgICAgICAgICAgcnggPSBSTkcuZ2V0VW5pZm9ybUludChhUm9vbVtcInhcIl0gKyAxLCBhUm9vbVtcInhcIl0gKyBhUm9vbVtcIndpZHRoXCJdIC0gMik7XG4gICAgICAgICAgICBpZiAoYURpcmVjdGlvbiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcnkgPSBhUm9vbVtcInlcIl0gLSAyO1xuICAgICAgICAgICAgICAgIGRvb3IgPSByeSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByeSA9IGFSb29tW1wieVwiXSArIGFSb29tW1wiaGVpZ2h0XCJdICsgMTtcbiAgICAgICAgICAgICAgICBkb29yID0gcnkgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tYXBbcnhdW2Rvb3JdID0gMDsgLy8gaSdtIG5vdCBzZXR0aW5nIGEgc3BlY2lmaWMgJ2Rvb3InIHRpbGUgdmFsdWUgcmlnaHQgbm93LCBqdXN0IGVtcHR5IHNwYWNlLlxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcnkgPSBSTkcuZ2V0VW5pZm9ybUludChhUm9vbVtcInlcIl0gKyAxLCBhUm9vbVtcInlcIl0gKyBhUm9vbVtcImhlaWdodFwiXSAtIDIpO1xuICAgICAgICAgICAgaWYgKGFEaXJlY3Rpb24gPT0gMikge1xuICAgICAgICAgICAgICAgIHJ4ID0gYVJvb21bXCJ4XCJdICsgYVJvb21bXCJ3aWR0aFwiXSArIDE7XG4gICAgICAgICAgICAgICAgZG9vciA9IHJ4IC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJ4ID0gYVJvb21bXCJ4XCJdIC0gMjtcbiAgICAgICAgICAgICAgICBkb29yID0gcnggKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tYXBbZG9vcl1bcnldID0gMDsgLy8gaSdtIG5vdCBzZXR0aW5nIGEgc3BlY2lmaWMgJ2Rvb3InIHRpbGUgdmFsdWUgcmlnaHQgbm93LCBqdXN0IGVtcHR5IHNwYWNlLlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbcngsIHJ5XTtcbiAgICB9XG4gICAgX2RyYXdDb3JyaWRvcihzdGFydFBvc2l0aW9uLCBlbmRQb3NpdGlvbikge1xuICAgICAgICBsZXQgeE9mZnNldCA9IGVuZFBvc2l0aW9uWzBdIC0gc3RhcnRQb3NpdGlvblswXTtcbiAgICAgICAgbGV0IHlPZmZzZXQgPSBlbmRQb3NpdGlvblsxXSAtIHN0YXJ0UG9zaXRpb25bMV07XG4gICAgICAgIGxldCB4cG9zID0gc3RhcnRQb3NpdGlvblswXTtcbiAgICAgICAgbGV0IHlwb3MgPSBzdGFydFBvc2l0aW9uWzFdO1xuICAgICAgICBsZXQgdGVtcERpc3Q7XG4gICAgICAgIGxldCB4RGlyO1xuICAgICAgICBsZXQgeURpcjtcbiAgICAgICAgbGV0IG1vdmU7IC8vIDIgZWxlbWVudCBhcnJheSwgZWxlbWVudCAwIGlzIHRoZSBkaXJlY3Rpb24sIGVsZW1lbnQgMSBpcyB0aGUgdG90YWwgdmFsdWUgdG8gbW92ZS5cbiAgICAgICAgbGV0IG1vdmVzID0gW107IC8vIGEgbGlzdCBvZiAyIGVsZW1lbnQgYXJyYXlzXG4gICAgICAgIGxldCB4QWJzID0gTWF0aC5hYnMoeE9mZnNldCk7XG4gICAgICAgIGxldCB5QWJzID0gTWF0aC5hYnMoeU9mZnNldCk7XG4gICAgICAgIGxldCBwZXJjZW50ID0gUk5HLmdldFVuaWZvcm0oKTsgLy8gdXNlZCB0byBzcGxpdCB0aGUgbW92ZSBhdCBkaWZmZXJlbnQgcGxhY2VzIGFsb25nIHRoZSBsb25nIGF4aXNcbiAgICAgICAgbGV0IGZpcnN0SGFsZiA9IHBlcmNlbnQ7XG4gICAgICAgIGxldCBzZWNvbmRIYWxmID0gMSAtIHBlcmNlbnQ7XG4gICAgICAgIHhEaXIgPSB4T2Zmc2V0ID4gMCA/IDIgOiA2O1xuICAgICAgICB5RGlyID0geU9mZnNldCA+IDAgPyA0IDogMDtcbiAgICAgICAgaWYgKHhBYnMgPCB5QWJzKSB7XG4gICAgICAgICAgICAvLyBtb3ZlIGZpcnN0SGFsZiBvZiB0aGUgeSBvZmZzZXRcbiAgICAgICAgICAgIHRlbXBEaXN0ID0gTWF0aC5jZWlsKHlBYnMgKiBmaXJzdEhhbGYpO1xuICAgICAgICAgICAgbW92ZXMucHVzaChbeURpciwgdGVtcERpc3RdKTtcbiAgICAgICAgICAgIC8vIG1vdmUgYWxsIHRoZSB4IG9mZnNldFxuICAgICAgICAgICAgbW92ZXMucHVzaChbeERpciwgeEFic10pO1xuICAgICAgICAgICAgLy8gbW92ZSBzZW5kSGFsZiBvZiB0aGUgIHkgb2Zmc2V0XG4gICAgICAgICAgICB0ZW1wRGlzdCA9IE1hdGguZmxvb3IoeUFicyAqIHNlY29uZEhhbGYpO1xuICAgICAgICAgICAgbW92ZXMucHVzaChbeURpciwgdGVtcERpc3RdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vICBtb3ZlIGZpcnN0SGFsZiBvZiB0aGUgeCBvZmZzZXRcbiAgICAgICAgICAgIHRlbXBEaXN0ID0gTWF0aC5jZWlsKHhBYnMgKiBmaXJzdEhhbGYpO1xuICAgICAgICAgICAgbW92ZXMucHVzaChbeERpciwgdGVtcERpc3RdKTtcbiAgICAgICAgICAgIC8vIG1vdmUgYWxsIHRoZSB5IG9mZnNldFxuICAgICAgICAgICAgbW92ZXMucHVzaChbeURpciwgeUFic10pO1xuICAgICAgICAgICAgLy8gbW92ZSBzZWNvbmRIYWxmIG9mIHRoZSB4IG9mZnNldC5cbiAgICAgICAgICAgIHRlbXBEaXN0ID0gTWF0aC5mbG9vcih4QWJzICogc2Vjb25kSGFsZik7XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt4RGlyLCB0ZW1wRGlzdF0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFwW3hwb3NdW3lwb3NdID0gMDtcbiAgICAgICAgd2hpbGUgKG1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG1vdmUgPSBtb3Zlcy5wb3AoKTtcbiAgICAgICAgICAgIHdoaWxlIChtb3ZlWzFdID4gMCkge1xuICAgICAgICAgICAgICAgIHhwb3MgKz0gRElSU1s4XVttb3ZlWzBdXVswXTtcbiAgICAgICAgICAgICAgICB5cG9zICs9IERJUlNbOF1bbW92ZVswXV1bMV07XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBbeHBvc11beXBvc10gPSAwO1xuICAgICAgICAgICAgICAgIG1vdmVbMV0gPSBtb3ZlWzFdIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY3JlYXRlQ29ycmlkb3JzKCkge1xuICAgICAgICAvLyBEcmF3IENvcnJpZG9ycyBiZXR3ZWVuIGNvbm5lY3RlZCByb29tc1xuICAgICAgICBsZXQgY3cgPSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDtcbiAgICAgICAgbGV0IGNoID0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0O1xuICAgICAgICBsZXQgcm9vbTtcbiAgICAgICAgbGV0IGNvbm5lY3Rpb247XG4gICAgICAgIGxldCBvdGhlclJvb207XG4gICAgICAgIGxldCB3YWxsO1xuICAgICAgICBsZXQgb3RoZXJXYWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN3OyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2g7IGorKykge1xuICAgICAgICAgICAgICAgIHJvb20gPSB0aGlzLnJvb21zW2ldW2pdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcm9vbVtcImNvbm5lY3Rpb25zXCJdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSByb29tW1wiY29ubmVjdGlvbnNcIl1ba107XG4gICAgICAgICAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbY29ubmVjdGlvblswXV1bY29ubmVjdGlvblsxXV07XG4gICAgICAgICAgICAgICAgICAgIC8vIGZpZ3VyZSBvdXQgd2hhdCB3YWxsIG91ciBjb3JyaWRvciB3aWxsIHN0YXJ0IG9uZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gZmlndXJlIG91dCB3aGF0IHdhbGwgb3VyIGNvcnJpZG9yIHdpbGwgZW5kIG9uLlxuICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY2VsbHhcIl0gPiByb29tW1wiY2VsbHhcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGwgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJXYWxsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvdGhlclJvb21bXCJjZWxseFwiXSA8IHJvb21bXCJjZWxseFwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcldhbGwgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG90aGVyUm9vbVtcImNlbGx5XCJdID4gcm9vbVtcImNlbGx5XCJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyV2FsbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyV2FsbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhd0NvcnJpZG9yKHRoaXMuX2dldFdhbGxQb3NpdGlvbihyb29tLCB3YWxsKSwgdGhpcy5fZ2V0V2FsbFBvc2l0aW9uKG90aGVyUm9vbSwgb3RoZXJXYWxsKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IER1bmdlb24gZnJvbSBcIi4vZHVuZ2Vvbi5qc1wiO1xuaW1wb3J0IHsgUm9vbSwgQ29ycmlkb3IgfSBmcm9tIFwiLi9mZWF0dXJlcy5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG47XG4vKipcbiAqIEBjbGFzcyBEdW5nZW9uIGdlbmVyYXRvciB3aGljaCB0cmllcyB0byBmaWxsIHRoZSBzcGFjZSBldmVubHkuIEdlbmVyYXRlcyBpbmRlcGVuZGVudCByb29tcyBhbmQgdHJpZXMgdG8gY29ubmVjdCB0aGVtLlxuICogQGF1Z21lbnRzIFJPVC5NYXAuRHVuZ2VvblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbmlmb3JtIGV4dGVuZHMgRHVuZ2VvbiB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHJvb21XaWR0aDogWzMsIDldLFxuICAgICAgICAgICAgcm9vbUhlaWdodDogWzMsIDVdLFxuICAgICAgICAgICAgcm9vbUR1Z1BlcmNlbnRhZ2U6IDAuMSxcbiAgICAgICAgICAgIHRpbWVMaW1pdDogMTAwMCAvKiB3ZSBzdG9wIGFmdGVyIHRoaXMgbXVjaCB0aW1lIGhhcyBwYXNzZWQgKG1zZWMpICovXG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgICB0aGlzLl9kdWcgPSAwO1xuICAgICAgICB0aGlzLl9yb29tQXR0ZW1wdHMgPSAyMDsgLyogbmV3IHJvb20gaXMgY3JlYXRlZCBOLXRpbWVzIHVudGlsIGlzIGNvbnNpZGVyZWQgYXMgaW1wb3NzaWJsZSB0byBnZW5lcmF0ZSAqL1xuICAgICAgICB0aGlzLl9jb3JyaWRvckF0dGVtcHRzID0gMjA7IC8qIGNvcnJpZG9ycyBhcmUgdHJpZWQgTi10aW1lcyB1bnRpbCB0aGUgbGV2ZWwgaXMgY29uc2lkZXJlZCBhcyBpbXBvc3NpYmxlIHRvIGNvbm5lY3QgKi9cbiAgICAgICAgdGhpcy5fY29ubmVjdGVkID0gW107IC8qIGxpc3Qgb2YgYWxyZWFkeSBjb25uZWN0ZWQgcm9vbXMgKi9cbiAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQgPSBbXTsgLyogbGlzdCBvZiByZW1haW5pbmcgdW5jb25uZWN0ZWQgcm9vbXMgKi9cbiAgICAgICAgdGhpcy5fZGlnQ2FsbGJhY2sgPSB0aGlzLl9kaWdDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrID0gdGhpcy5fY2FuQmVEdWdDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9pc1dhbGxDYWxsYmFjayA9IHRoaXMuX2lzV2FsbENhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG1hcC4gSWYgdGhlIHRpbWUgbGltaXQgaGFzIGJlZW4gaGl0LCByZXR1cm5zIG51bGwuXG4gICAgICogQHNlZSBST1QuTWFwI2NyZWF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICBsZXQgdDEgPSBEYXRlLm5vdygpO1xuICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgbGV0IHQyID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICh0MiAtIHQxID4gdGhpcy5fb3B0aW9ucy50aW1lTGltaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0gLyogdGltZSBsaW1pdCEgKi9cbiAgICAgICAgICAgIHRoaXMuX21hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICAgICAgICB0aGlzLl9kdWcgPSAwO1xuICAgICAgICAgICAgdGhpcy5fcm9vbXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3VuY29ubmVjdGVkID0gW107XG4gICAgICAgICAgICB0aGlzLl9nZW5lcmF0ZVJvb21zKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fcm9vbXMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2dlbmVyYXRlQ29ycmlkb3JzKCkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5fbWFwW2ldW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHN1aXRhYmxlIGFtb3VudCBvZiByb29tc1xuICAgICAqL1xuICAgIF9nZW5lcmF0ZVJvb21zKCkge1xuICAgICAgICBsZXQgdyA9IHRoaXMuX3dpZHRoIC0gMjtcbiAgICAgICAgbGV0IGggPSB0aGlzLl9oZWlnaHQgLSAyO1xuICAgICAgICBsZXQgcm9vbTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgcm9vbSA9IHRoaXMuX2dlbmVyYXRlUm9vbSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2R1ZyAvICh3ICogaCkgPiB0aGlzLl9vcHRpb25zLnJvb21EdWdQZXJjZW50YWdlKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IC8qIGFjaGlldmVkIHJlcXVlc3RlZCBhbW91bnQgb2YgZnJlZSBzcGFjZSAqL1xuICAgICAgICB9IHdoaWxlIChyb29tKTtcbiAgICAgICAgLyogZWl0aGVyIGVub3VnaCByb29tcywgb3Igbm90IGFibGUgdG8gZ2VuZXJhdGUgbW9yZSBvZiB0aGVtIDopICovXG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyeSB0byBnZW5lcmF0ZSBvbmUgcm9vbVxuICAgICAqL1xuICAgIF9nZW5lcmF0ZVJvb20oKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHdoaWxlIChjb3VudCA8IHRoaXMuX3Jvb21BdHRlbXB0cykge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIGxldCByb29tID0gUm9vbS5jcmVhdGVSYW5kb20odGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCwgdGhpcy5fb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoIXJvb20uaXNWYWxpZCh0aGlzLl9pc1dhbGxDYWxsYmFjaywgdGhpcy5fY2FuQmVEdWdDYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvb20uY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb21zLnB1c2gocm9vbSk7XG4gICAgICAgICAgICByZXR1cm4gcm9vbTtcbiAgICAgICAgfVxuICAgICAgICAvKiBubyByb29tIHdhcyBnZW5lcmF0ZWQgaW4gYSBnaXZlbiBudW1iZXIgb2YgYXR0ZW1wdHMgKi9cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBjb25uZWN0b3JzIGJld2VlbiByb29tc1xuICAgICAqIEByZXR1cm5zIHtib29sfSBzdWNjZXNzIFdhcyB0aGlzIGF0dGVtcHQgc3VjY2Vzc2Z1bGw/XG4gICAgICovXG4gICAgX2dlbmVyYXRlQ29ycmlkb3JzKCkge1xuICAgICAgICBsZXQgY250ID0gMDtcbiAgICAgICAgd2hpbGUgKGNudCA8IHRoaXMuX2NvcnJpZG9yQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgIGNudCsrO1xuICAgICAgICAgICAgdGhpcy5fY29ycmlkb3JzID0gW107XG4gICAgICAgICAgICAvKiBkaWcgcm9vbXMgaW50byBhIGNsZWFyIG1hcCAqL1xuICAgICAgICAgICAgdGhpcy5fbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcm9vbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcm9vbSA9IHRoaXMuX3Jvb21zW2ldO1xuICAgICAgICAgICAgICAgIHJvb20uY2xlYXJEb29ycygpO1xuICAgICAgICAgICAgICAgIHJvb20uY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3VuY29ubmVjdGVkID0gUk5HLnNodWZmbGUodGhpcy5fcm9vbXMuc2xpY2UoKSk7XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLl91bmNvbm5lY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0ZWQucHVzaCh0aGlzLl91bmNvbm5lY3RlZC5wb3AoKSk7XG4gICAgICAgICAgICB9IC8qIGZpcnN0IG9uZSBpcyBhbHdheXMgY29ubmVjdGVkICovXG4gICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgIC8qIDEuIHBpY2sgcmFuZG9tIGNvbm5lY3RlZCByb29tICovXG4gICAgICAgICAgICAgICAgbGV0IGNvbm5lY3RlZCA9IFJORy5nZXRJdGVtKHRoaXMuX2Nvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIDIuIGZpbmQgY2xvc2VzdCB1bmNvbm5lY3RlZCAqL1xuICAgICAgICAgICAgICAgIGxldCByb29tMSA9IHRoaXMuX2Nsb3Nlc3RSb29tKHRoaXMuX3VuY29ubmVjdGVkLCBjb25uZWN0ZWQpO1xuICAgICAgICAgICAgICAgIGlmICghcm9vbTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIDMuIGNvbm5lY3QgaXQgdG8gY2xvc2VzdCBjb25uZWN0ZWQgKi9cbiAgICAgICAgICAgICAgICBsZXQgcm9vbTIgPSB0aGlzLl9jbG9zZXN0Um9vbSh0aGlzLl9jb25uZWN0ZWQsIHJvb20xKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJvb20yKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgb2sgPSB0aGlzLl9jb25uZWN0Um9vbXMocm9vbTEsIHJvb20yKTtcbiAgICAgICAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gLyogc3RvcCBjb25uZWN0aW5nLCByZS1zaHVmZmxlICovXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl91bmNvbm5lY3RlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSAvKiBkb25lOyBubyByb29tcyByZW1haW4gKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIDtcbiAgICAvKipcbiAgICAgKiBGb3IgYSBnaXZlbiByb29tLCBmaW5kIHRoZSBjbG9zZXN0IG9uZSBmcm9tIHRoZSBsaXN0XG4gICAgICovXG4gICAgX2Nsb3Nlc3RSb29tKHJvb21zLCByb29tKSB7XG4gICAgICAgIGxldCBkaXN0ID0gSW5maW5pdHk7XG4gICAgICAgIGxldCBjZW50ZXIgPSByb29tLmdldENlbnRlcigpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb29tcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHIgPSByb29tc1tpXTtcbiAgICAgICAgICAgIGxldCBjID0gci5nZXRDZW50ZXIoKTtcbiAgICAgICAgICAgIGxldCBkeCA9IGNbMF0gLSBjZW50ZXJbMF07XG4gICAgICAgICAgICBsZXQgZHkgPSBjWzFdIC0gY2VudGVyWzFdO1xuICAgICAgICAgICAgbGV0IGQgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgICAgICAgIGlmIChkIDwgZGlzdCkge1xuICAgICAgICAgICAgICAgIGRpc3QgPSBkO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgX2Nvbm5lY3RSb29tcyhyb29tMSwgcm9vbTIpIHtcbiAgICAgICAgLypcbiAgICAgICAgICAgIHJvb20xLmRlYnVnKCk7XG4gICAgICAgICAgICByb29tMi5kZWJ1ZygpO1xuICAgICAgICAqL1xuICAgICAgICBsZXQgY2VudGVyMSA9IHJvb20xLmdldENlbnRlcigpO1xuICAgICAgICBsZXQgY2VudGVyMiA9IHJvb20yLmdldENlbnRlcigpO1xuICAgICAgICBsZXQgZGlmZlggPSBjZW50ZXIyWzBdIC0gY2VudGVyMVswXTtcbiAgICAgICAgbGV0IGRpZmZZID0gY2VudGVyMlsxXSAtIGNlbnRlcjFbMV07XG4gICAgICAgIGxldCBzdGFydDtcbiAgICAgICAgbGV0IGVuZDtcbiAgICAgICAgbGV0IGRpckluZGV4MSwgZGlySW5kZXgyLCBtaW4sIG1heCwgaW5kZXg7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPCBNYXRoLmFicyhkaWZmWSkpIHsgLyogZmlyc3QgdHJ5IGNvbm5lY3Rpbmcgbm9ydGgtc291dGggd2FsbHMgKi9cbiAgICAgICAgICAgIGRpckluZGV4MSA9IChkaWZmWSA+IDAgPyAyIDogMCk7XG4gICAgICAgICAgICBkaXJJbmRleDIgPSAoZGlySW5kZXgxICsgMikgJSA0O1xuICAgICAgICAgICAgbWluID0gcm9vbTIuZ2V0TGVmdCgpO1xuICAgICAgICAgICAgbWF4ID0gcm9vbTIuZ2V0UmlnaHQoKTtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLyogZmlyc3QgdHJ5IGNvbm5lY3RpbmcgZWFzdC13ZXN0IHdhbGxzICovXG4gICAgICAgICAgICBkaXJJbmRleDEgPSAoZGlmZlggPiAwID8gMSA6IDMpO1xuICAgICAgICAgICAgZGlySW5kZXgyID0gKGRpckluZGV4MSArIDIpICUgNDtcbiAgICAgICAgICAgIG1pbiA9IHJvb20yLmdldFRvcCgpO1xuICAgICAgICAgICAgbWF4ID0gcm9vbTIuZ2V0Qm90dG9tKCk7XG4gICAgICAgICAgICBpbmRleCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgPSB0aGlzLl9wbGFjZUluV2FsbChyb29tMSwgZGlySW5kZXgxKTsgLyogY29ycmlkb3Igd2lsbCBzdGFydCBoZXJlICovXG4gICAgICAgIGlmICghc3RhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRbaW5kZXhdID49IG1pbiAmJiBzdGFydFtpbmRleF0gPD0gbWF4KSB7IC8qIHBvc3NpYmxlIHRvIGNvbm5lY3Qgd2l0aCBzdHJhaWdodCBsaW5lIChJLWxpa2UpICovXG4gICAgICAgICAgICBlbmQgPSBzdGFydC5zbGljZSgpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gMDtcbiAgICAgICAgICAgIHN3aXRjaCAoZGlySW5kZXgyKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHJvb20yLmdldFRvcCgpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHJvb20yLmdldFJpZ2h0KCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0Qm90dG9tKCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0TGVmdCgpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRbKGluZGV4ICsgMSkgJSAyXSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fZGlnTGluZShbc3RhcnQsIGVuZF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0YXJ0W2luZGV4XSA8IG1pbiAtIDEgfHwgc3RhcnRbaW5kZXhdID4gbWF4ICsgMSkgeyAvKiBuZWVkIHRvIHN3aXRjaCB0YXJnZXQgd2FsbCAoTC1saWtlKSAqL1xuICAgICAgICAgICAgbGV0IGRpZmYgPSBzdGFydFtpbmRleF0gLSBjZW50ZXIyW2luZGV4XTtcbiAgICAgICAgICAgIGxldCByb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICBzd2l0Y2ggKGRpckluZGV4Mikge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uID0gKGRpZmYgPCAwID8gMyA6IDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICByb3RhdGlvbiA9IChkaWZmIDwgMCA/IDEgOiAzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXJJbmRleDIgPSAoZGlySW5kZXgyICsgcm90YXRpb24pICUgNDtcbiAgICAgICAgICAgIGVuZCA9IHRoaXMuX3BsYWNlSW5XYWxsKHJvb20yLCBkaXJJbmRleDIpO1xuICAgICAgICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbWlkID0gWzAsIDBdO1xuICAgICAgICAgICAgbWlkW2luZGV4XSA9IHN0YXJ0W2luZGV4XTtcbiAgICAgICAgICAgIGxldCBpbmRleDIgPSAoaW5kZXggKyAxKSAlIDI7XG4gICAgICAgICAgICBtaWRbaW5kZXgyXSA9IGVuZFtpbmRleDJdO1xuICAgICAgICAgICAgdGhpcy5fZGlnTGluZShbc3RhcnQsIG1pZCwgZW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8qIHVzZSBjdXJyZW50IHdhbGwgcGFpciwgYnV0IGFkanVzdCB0aGUgbGluZSBpbiB0aGUgbWlkZGxlIChTLWxpa2UpICovXG4gICAgICAgICAgICBsZXQgaW5kZXgyID0gKGluZGV4ICsgMSkgJSAyO1xuICAgICAgICAgICAgZW5kID0gdGhpcy5fcGxhY2VJbldhbGwocm9vbTIsIGRpckluZGV4Mik7XG4gICAgICAgICAgICBpZiAoIWVuZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBtaWQgPSBNYXRoLnJvdW5kKChlbmRbaW5kZXgyXSArIHN0YXJ0W2luZGV4Ml0pIC8gMik7XG4gICAgICAgICAgICBsZXQgbWlkMSA9IFswLCAwXTtcbiAgICAgICAgICAgIGxldCBtaWQyID0gWzAsIDBdO1xuICAgICAgICAgICAgbWlkMVtpbmRleF0gPSBzdGFydFtpbmRleF07XG4gICAgICAgICAgICBtaWQxW2luZGV4Ml0gPSBtaWQ7XG4gICAgICAgICAgICBtaWQyW2luZGV4XSA9IGVuZFtpbmRleF07XG4gICAgICAgICAgICBtaWQyW2luZGV4Ml0gPSBtaWQ7XG4gICAgICAgICAgICB0aGlzLl9kaWdMaW5lKFtzdGFydCwgbWlkMSwgbWlkMiwgZW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgcm9vbTEuYWRkRG9vcihzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICByb29tMi5hZGREb29yKGVuZFswXSwgZW5kWzFdKTtcbiAgICAgICAgaW5kZXggPSB0aGlzLl91bmNvbm5lY3RlZC5pbmRleE9mKHJvb20xKTtcbiAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl91bmNvbm5lY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGVkLnB1c2gocm9vbTEpO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4ID0gdGhpcy5fdW5jb25uZWN0ZWQuaW5kZXhPZihyb29tMik7XG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3RlZC5wdXNoKHJvb20yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgX3BsYWNlSW5XYWxsKHJvb20sIGRpckluZGV4KSB7XG4gICAgICAgIGxldCBzdGFydCA9IFswLCAwXTtcbiAgICAgICAgbGV0IGRpciA9IFswLCAwXTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgICAgIHN3aXRjaCAoZGlySW5kZXgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBkaXIgPSBbMSwgMF07XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRMZWZ0KCksIHJvb20uZ2V0VG9wKCkgLSAxXTtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByb29tLmdldFJpZ2h0KCkgLSByb29tLmdldExlZnQoKSArIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgZGlyID0gWzAsIDFdO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gW3Jvb20uZ2V0UmlnaHQoKSArIDEsIHJvb20uZ2V0VG9wKCldO1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHJvb20uZ2V0Qm90dG9tKCkgLSByb29tLmdldFRvcCgpICsgMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBkaXIgPSBbMSwgMF07XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRMZWZ0KCksIHJvb20uZ2V0Qm90dG9tKCkgKyAxXTtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByb29tLmdldFJpZ2h0KCkgLSByb29tLmdldExlZnQoKSArIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgZGlyID0gWzAsIDFdO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gW3Jvb20uZ2V0TGVmdCgpIC0gMSwgcm9vbS5nZXRUb3AoKV07XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gcm9vbS5nZXRCb3R0b20oKSAtIHJvb20uZ2V0VG9wKCkgKyAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhdmFpbCA9IFtdO1xuICAgICAgICBsZXQgbGFzdEJhZEluZGV4ID0gLTI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB4ID0gc3RhcnRbMF0gKyBpICogZGlyWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBzdGFydFsxXSArIGkgKiBkaXJbMV07XG4gICAgICAgICAgICBhdmFpbC5wdXNoKG51bGwpO1xuICAgICAgICAgICAgbGV0IGlzV2FsbCA9ICh0aGlzLl9tYXBbeF1beV0gPT0gMSk7XG4gICAgICAgICAgICBpZiAoaXNXYWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RCYWRJbmRleCAhPSBpIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhdmFpbFtpXSA9IFt4LCB5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsYXN0QmFkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF2YWlsW2kgLSAxXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSBhdmFpbC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKCFhdmFpbFtpXSkge1xuICAgICAgICAgICAgICAgIGF2YWlsLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGF2YWlsLmxlbmd0aCA/IFJORy5nZXRJdGVtKGF2YWlsKSA6IG51bGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaWcgYSBwb2x5bGluZS5cbiAgICAgKi9cbiAgICBfZGlnTGluZShwb2ludHMpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IHBvaW50c1tpIC0gMV07XG4gICAgICAgICAgICBsZXQgZW5kID0gcG9pbnRzW2ldO1xuICAgICAgICAgICAgbGV0IGNvcnJpZG9yID0gbmV3IENvcnJpZG9yKHN0YXJ0WzBdLCBzdGFydFsxXSwgZW5kWzBdLCBlbmRbMV0pO1xuICAgICAgICAgICAgY29ycmlkb3IuY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICAgICAgICAgIHRoaXMuX2NvcnJpZG9ycy5wdXNoKGNvcnJpZG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZGlnQ2FsbGJhY2soeCwgeSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWFwW3hdW3ldID0gdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9kdWcrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBfaXNXYWxsQ2FsbGJhY2soeCwgeSkge1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSB0aGlzLl93aWR0aCB8fCB5ID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fbWFwW3hdW3ldID09IDEpO1xuICAgIH1cbiAgICBfY2FuQmVEdWdDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgIGlmICh4IDwgMSB8fCB5IDwgMSB8fCB4ICsgMSA+PSB0aGlzLl93aWR0aCB8fCB5ICsgMSA+PSB0aGlzLl9oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuX21hcFt4XVt5XSA9PSAxKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU2ltcGxleCBmcm9tIFwiLi9zaW1wbGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCB7IFNpbXBsZXggfTtcbiIsIi8qKlxuICogQmFzZSBub2lzZSBnZW5lcmF0b3JcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9pc2Uge1xufVxuIiwiaW1wb3J0IE5vaXNlIGZyb20gXCIuL25vaXNlLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbmltcG9ydCB7IG1vZCB9IGZyb20gXCIuLi91dGlsLmpzXCI7XG5jb25zdCBGMiA9IDAuNSAqIChNYXRoLnNxcnQoMykgLSAxKTtcbmNvbnN0IEcyID0gKDMgLSBNYXRoLnNxcnQoMykpIC8gNjtcbi8qKlxuICogQSBzaW1wbGUgMmQgaW1wbGVtZW50YXRpb24gb2Ygc2ltcGxleCBub2lzZSBieSBPbmRyZWogWmFyYVxuICpcbiAqIEJhc2VkIG9uIGEgc3BlZWQtaW1wcm92ZWQgc2ltcGxleCBub2lzZSBhbGdvcml0aG0gZm9yIDJELCAzRCBhbmQgNEQgaW4gSmF2YS5cbiAqIFdoaWNoIGlzIGJhc2VkIG9uIGV4YW1wbGUgY29kZSBieSBTdGVmYW4gR3VzdGF2c29uIChzdGVndUBpdG4ubGl1LnNlKS5cbiAqIFdpdGggT3B0aW1pc2F0aW9ucyBieSBQZXRlciBFYXN0bWFuIChwZWFzdG1hbkBkcml6emxlLnN0YW5mb3JkLmVkdSkuXG4gKiBCZXR0ZXIgcmFuayBvcmRlcmluZyBtZXRob2QgYnkgU3RlZmFuIEd1c3RhdnNvbiBpbiAyMDEyLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGV4IGV4dGVuZHMgTm9pc2Uge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSBncmFkaWVudHMgUmFuZG9tIGdyYWRpZW50c1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGdyYWRpZW50cyA9IDI1Nikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9ncmFkaWVudHMgPSBbXG4gICAgICAgICAgICBbMCwgLTFdLFxuICAgICAgICAgICAgWzEsIC0xXSxcbiAgICAgICAgICAgIFsxLCAwXSxcbiAgICAgICAgICAgIFsxLCAxXSxcbiAgICAgICAgICAgIFswLCAxXSxcbiAgICAgICAgICAgIFstMSwgMV0sXG4gICAgICAgICAgICBbLTEsIDBdLFxuICAgICAgICAgICAgWy0xLCAtMV1cbiAgICAgICAgXTtcbiAgICAgICAgbGV0IHBlcm11dGF0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyYWRpZW50czsgaSsrKSB7XG4gICAgICAgICAgICBwZXJtdXRhdGlvbnMucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBwZXJtdXRhdGlvbnMgPSBSTkcuc2h1ZmZsZShwZXJtdXRhdGlvbnMpO1xuICAgICAgICB0aGlzLl9wZXJtcyA9IFtdO1xuICAgICAgICB0aGlzLl9pbmRleGVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMiAqIGdyYWRpZW50czsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9wZXJtcy5wdXNoKHBlcm11dGF0aW9uc1tpICUgZ3JhZGllbnRzXSk7XG4gICAgICAgICAgICB0aGlzLl9pbmRleGVzLnB1c2godGhpcy5fcGVybXNbaV0gJSB0aGlzLl9ncmFkaWVudHMubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQoeGluLCB5aW4pIHtcbiAgICAgICAgbGV0IHBlcm1zID0gdGhpcy5fcGVybXM7XG4gICAgICAgIGxldCBpbmRleGVzID0gdGhpcy5faW5kZXhlcztcbiAgICAgICAgbGV0IGNvdW50ID0gcGVybXMubGVuZ3RoIC8gMjtcbiAgICAgICAgbGV0IG4wID0gMCwgbjEgPSAwLCBuMiA9IDAsIGdpOyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIHRocmVlIGNvcm5lcnNcbiAgICAgICAgLy8gU2tldyB0aGUgaW5wdXQgc3BhY2UgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggY2VsbCB3ZSdyZSBpblxuICAgICAgICBsZXQgcyA9ICh4aW4gKyB5aW4pICogRjI7IC8vIEhhaXJ5IGZhY3RvciBmb3IgMkRcbiAgICAgICAgbGV0IGkgPSBNYXRoLmZsb29yKHhpbiArIHMpO1xuICAgICAgICBsZXQgaiA9IE1hdGguZmxvb3IoeWluICsgcyk7XG4gICAgICAgIGxldCB0ID0gKGkgKyBqKSAqIEcyO1xuICAgICAgICBsZXQgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkpIHNwYWNlXG4gICAgICAgIGxldCBZMCA9IGogLSB0O1xuICAgICAgICBsZXQgeDAgPSB4aW4gLSBYMDsgLy8gVGhlIHgseSBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW5cbiAgICAgICAgbGV0IHkwID0geWluIC0gWTA7XG4gICAgICAgIC8vIEZvciB0aGUgMkQgY2FzZSwgdGhlIHNpbXBsZXggc2hhcGUgaXMgYW4gZXF1aWxhdGVyYWwgdHJpYW5nbGUuXG4gICAgICAgIC8vIERldGVybWluZSB3aGljaCBzaW1wbGV4IHdlIGFyZSBpbi5cbiAgICAgICAgbGV0IGkxLCBqMTsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIChtaWRkbGUpIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGopIGNvb3Jkc1xuICAgICAgICBpZiAoeDAgPiB5MCkge1xuICAgICAgICAgICAgaTEgPSAxO1xuICAgICAgICAgICAgajEgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvLyBsb3dlciB0cmlhbmdsZSwgWFkgb3JkZXI6ICgwLDApLT4oMSwwKS0+KDEsMSlcbiAgICAgICAgICAgIGkxID0gMDtcbiAgICAgICAgICAgIGoxID0gMTtcbiAgICAgICAgfSAvLyB1cHBlciB0cmlhbmdsZSwgWVggb3JkZXI6ICgwLDApLT4oMCwxKS0+KDEsMSlcbiAgICAgICAgLy8gQSBzdGVwIG9mICgxLDApIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoMS1jLC1jKSBpbiAoeCx5KSwgYW5kXG4gICAgICAgIC8vIGEgc3RlcCBvZiAoMCwxKSBpbiAoaSxqKSBtZWFucyBhIHN0ZXAgb2YgKC1jLDEtYykgaW4gKHgseSksIHdoZXJlXG4gICAgICAgIC8vIGMgPSAoMy1zcXJ0KDMpKS82XG4gICAgICAgIGxldCB4MSA9IHgwIC0gaTEgKyBHMjsgLy8gT2Zmc2V0cyBmb3IgbWlkZGxlIGNvcm5lciBpbiAoeCx5KSB1bnNrZXdlZCBjb29yZHNcbiAgICAgICAgbGV0IHkxID0geTAgLSBqMSArIEcyO1xuICAgICAgICBsZXQgeDIgPSB4MCAtIDEgKyAyICogRzI7IC8vIE9mZnNldHMgZm9yIGxhc3QgY29ybmVyIGluICh4LHkpIHVuc2tld2VkIGNvb3Jkc1xuICAgICAgICBsZXQgeTIgPSB5MCAtIDEgKyAyICogRzI7XG4gICAgICAgIC8vIFdvcmsgb3V0IHRoZSBoYXNoZWQgZ3JhZGllbnQgaW5kaWNlcyBvZiB0aGUgdGhyZWUgc2ltcGxleCBjb3JuZXJzXG4gICAgICAgIGxldCBpaSA9IG1vZChpLCBjb3VudCk7XG4gICAgICAgIGxldCBqaiA9IG1vZChqLCBjb3VudCk7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29udHJpYnV0aW9uIGZyb20gdGhlIHRocmVlIGNvcm5lcnNcbiAgICAgICAgbGV0IHQwID0gMC41IC0geDAgKiB4MCAtIHkwICogeTA7XG4gICAgICAgIGlmICh0MCA+PSAwKSB7XG4gICAgICAgICAgICB0MCAqPSB0MDtcbiAgICAgICAgICAgIGdpID0gaW5kZXhlc1tpaSArIHBlcm1zW2pqXV07XG4gICAgICAgICAgICBsZXQgZ3JhZCA9IHRoaXMuX2dyYWRpZW50c1tnaV07XG4gICAgICAgICAgICBuMCA9IHQwICogdDAgKiAoZ3JhZFswXSAqIHgwICsgZ3JhZFsxXSAqIHkwKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdDEgPSAwLjUgLSB4MSAqIHgxIC0geTEgKiB5MTtcbiAgICAgICAgaWYgKHQxID49IDApIHtcbiAgICAgICAgICAgIHQxICo9IHQxO1xuICAgICAgICAgICAgZ2kgPSBpbmRleGVzW2lpICsgaTEgKyBwZXJtc1tqaiArIGoxXV07XG4gICAgICAgICAgICBsZXQgZ3JhZCA9IHRoaXMuX2dyYWRpZW50c1tnaV07XG4gICAgICAgICAgICBuMSA9IHQxICogdDEgKiAoZ3JhZFswXSAqIHgxICsgZ3JhZFsxXSAqIHkxKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdDIgPSAwLjUgLSB4MiAqIHgyIC0geTIgKiB5MjtcbiAgICAgICAgaWYgKHQyID49IDApIHtcbiAgICAgICAgICAgIHQyICo9IHQyO1xuICAgICAgICAgICAgZ2kgPSBpbmRleGVzW2lpICsgMSArIHBlcm1zW2pqICsgMV1dO1xuICAgICAgICAgICAgbGV0IGdyYWQgPSB0aGlzLl9ncmFkaWVudHNbZ2ldO1xuICAgICAgICAgICAgbjIgPSB0MiAqIHQyICogKGdyYWRbMF0gKiB4MiArIGdyYWRbMV0gKiB5Mik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIGNvcm5lciB0byBnZXQgdGhlIGZpbmFsIG5vaXNlIHZhbHVlLlxuICAgICAgICAvLyBUaGUgcmVzdWx0IGlzIHNjYWxlZCB0byByZXR1cm4gdmFsdWVzIGluIHRoZSBpbnRlcnZhbCBbLTEsMV0uXG4gICAgICAgIHJldHVybiA3MCAqIChuMCArIG4xICsgbjIpO1xuICAgIH1cbn1cbiIsImltcG9ydCBQYXRoIGZyb20gXCIuL3BhdGguanNcIjtcbi8qKlxuICogQGNsYXNzIFNpbXBsaWZpZWQgQSogYWxnb3JpdGhtOiBhbGwgZWRnZXMgaGF2ZSBhIHZhbHVlIG9mIDFcbiAqIEBhdWdtZW50cyBST1QuUGF0aFxuICogQHNlZSBST1QuUGF0aFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBU3RhciBleHRlbmRzIFBhdGgge1xuICAgIGNvbnN0cnVjdG9yKHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgc3VwZXIodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl90b2RvID0gW107XG4gICAgICAgIHRoaXMuX2RvbmUgPSB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBhIHBhdGggZnJvbSBhIGdpdmVuIHBvaW50XG4gICAgICogQHNlZSBST1QuUGF0aCNjb21wdXRlXG4gICAgICovXG4gICAgY29tcHV0ZShmcm9tWCwgZnJvbVksIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX3RvZG8gPSBbXTtcbiAgICAgICAgdGhpcy5fZG9uZSA9IHt9O1xuICAgICAgICB0aGlzLl9mcm9tWCA9IGZyb21YO1xuICAgICAgICB0aGlzLl9mcm9tWSA9IGZyb21ZO1xuICAgICAgICB0aGlzLl9hZGQodGhpcy5fdG9YLCB0aGlzLl90b1ksIG51bGwpO1xuICAgICAgICB3aGlsZSAodGhpcy5fdG9kby5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5fdG9kby5zaGlmdCgpO1xuICAgICAgICAgICAgbGV0IGlkID0gaXRlbS54ICsgXCIsXCIgKyBpdGVtLnk7XG4gICAgICAgICAgICBpZiAoaWQgaW4gdGhpcy5fZG9uZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZG9uZVtpZF0gPSBpdGVtO1xuICAgICAgICAgICAgaWYgKGl0ZW0ueCA9PSBmcm9tWCAmJiBpdGVtLnkgPT0gZnJvbVkpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZWlnaGJvcnMgPSB0aGlzLl9nZXROZWlnaGJvcnMoaXRlbS54LCBpdGVtLnkpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHggPSBuZWlnaGJvclswXTtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IG5laWdoYm9yWzFdO1xuICAgICAgICAgICAgICAgIGxldCBpZCA9IHggKyBcIixcIiArIHk7XG4gICAgICAgICAgICAgICAgaWYgKGlkIGluIHRoaXMuX2RvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2FkZCh4LCB5LCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX2RvbmVbZnJvbVggKyBcIixcIiArIGZyb21ZXTtcbiAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGl0ZW0ueCwgaXRlbS55KTtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnByZXY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2FkZCh4LCB5LCBwcmV2KSB7XG4gICAgICAgIGxldCBoID0gdGhpcy5fZGlzdGFuY2UoeCwgeSk7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHByZXY6IHByZXYsXG4gICAgICAgICAgICBnOiAocHJldiA/IHByZXYuZyArIDEgOiAwKSxcbiAgICAgICAgICAgIGg6IGhcbiAgICAgICAgfTtcbiAgICAgICAgLyogaW5zZXJ0IGludG8gcHJpb3JpdHkgcXVldWUgKi9cbiAgICAgICAgbGV0IGYgPSBvYmouZyArIG9iai5oO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3RvZG8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5fdG9kb1tpXTtcbiAgICAgICAgICAgIGxldCBpdGVtRiA9IGl0ZW0uZyArIGl0ZW0uaDtcbiAgICAgICAgICAgIGlmIChmIDwgaXRlbUYgfHwgKGYgPT0gaXRlbUYgJiYgaCA8IGl0ZW0uaCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b2RvLnNwbGljZShpLCAwLCBvYmopO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90b2RvLnB1c2gob2JqKTtcbiAgICB9XG4gICAgX2Rpc3RhbmNlKHgsIHkpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5KSB7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChNYXRoLmFicyh4IC0gdGhpcy5fZnJvbVgpICsgTWF0aC5hYnMoeSAtIHRoaXMuX2Zyb21ZKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgbGV0IGR4ID0gTWF0aC5hYnMoeCAtIHRoaXMuX2Zyb21YKTtcbiAgICAgICAgICAgICAgICBsZXQgZHkgPSBNYXRoLmFicyh5IC0gdGhpcy5fZnJvbVkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkeSArIE1hdGgubWF4KDAsIChkeCAtIGR5KSAvIDIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLmFicyh4IC0gdGhpcy5fZnJvbVgpLCBNYXRoLmFicyh5IC0gdGhpcy5fZnJvbVkpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBQYXRoIGZyb20gXCIuL3BhdGguanNcIjtcbi8qKlxuICogQGNsYXNzIFNpbXBsaWZpZWQgRGlqa3N0cmEncyBhbGdvcml0aG06IGFsbCBlZGdlcyBoYXZlIGEgdmFsdWUgb2YgMVxuICogQGF1Z21lbnRzIFJPVC5QYXRoXG4gKiBAc2VlIFJPVC5QYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpamtzdHJhIGV4dGVuZHMgUGF0aCB7XG4gICAgY29uc3RydWN0b3IodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9jb21wdXRlZCA9IHt9O1xuICAgICAgICB0aGlzLl90b2RvID0gW107XG4gICAgICAgIHRoaXMuX2FkZCh0b1gsIHRvWSwgbnVsbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgYSBwYXRoIGZyb20gYSBnaXZlbiBwb2ludFxuICAgICAqIEBzZWUgUk9ULlBhdGgjY29tcHV0ZVxuICAgICAqL1xuICAgIGNvbXB1dGUoZnJvbVgsIGZyb21ZLCBjYWxsYmFjaykge1xuICAgICAgICBsZXQga2V5ID0gZnJvbVggKyBcIixcIiArIGZyb21ZO1xuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5fY29tcHV0ZWQpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wdXRlKGZyb21YLCBmcm9tWSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMuX2NvbXB1dGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5fY29tcHV0ZWRba2V5XTtcbiAgICAgICAgd2hpbGUgKGl0ZW0pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGl0ZW0ueCwgaXRlbS55KTtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnByZXY7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBhIG5vbi1jYWNoZWQgdmFsdWVcbiAgICAgKi9cbiAgICBfY29tcHV0ZShmcm9tWCwgZnJvbVkpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuX3RvZG8ubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuX3RvZG8uc2hpZnQoKTtcbiAgICAgICAgICAgIGlmIChpdGVtLnggPT0gZnJvbVggJiYgaXRlbS55ID09IGZyb21ZKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5laWdoYm9ycyA9IHRoaXMuX2dldE5laWdoYm9ycyhpdGVtLngsIGl0ZW0ueSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IG5laWdoYm9yWzBdO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gbmVpZ2hib3JbMV07XG4gICAgICAgICAgICAgICAgbGV0IGlkID0geCArIFwiLFwiICsgeTtcbiAgICAgICAgICAgICAgICBpZiAoaWQgaW4gdGhpcy5fY29tcHV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSAvKiBhbHJlYWR5IGRvbmUgKi9cbiAgICAgICAgICAgICAgICB0aGlzLl9hZGQoeCwgeSwgaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2FkZCh4LCB5LCBwcmV2KSB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHByZXY6IHByZXZcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fY29tcHV0ZWRbeCArIFwiLFwiICsgeV0gPSBvYmo7XG4gICAgICAgIHRoaXMuX3RvZG8ucHVzaChvYmopO1xuICAgIH1cbn1cbiIsImltcG9ydCBEaWprc3RyYSBmcm9tIFwiLi9kaWprc3RyYS5qc1wiO1xuaW1wb3J0IEFTdGFyIGZyb20gXCIuL2FzdGFyLmpzXCI7XG5leHBvcnQgZGVmYXVsdCB7IERpamtzdHJhLCBBU3RhciB9O1xuIiwiaW1wb3J0IHsgRElSUyB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbi8qKlxuICogQGNsYXNzIEFic3RyYWN0IHBhdGhmaW5kZXJcbiAqIEBwYXJhbSB7aW50fSB0b1ggVGFyZ2V0IFggY29vcmRcbiAqIEBwYXJhbSB7aW50fSB0b1kgVGFyZ2V0IFkgY29vcmRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBhc3NhYmxlQ2FsbGJhY2sgQ2FsbGJhY2sgdG8gZGV0ZXJtaW5lIG1hcCBwYXNzYWJpbGl0eVxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnRvcG9sb2d5PThdXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGgge1xuICAgIGNvbnN0cnVjdG9yKHRvWCwgdG9ZLCBwYXNzYWJsZUNhbGxiYWNrLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5fdG9YID0gdG9YO1xuICAgICAgICB0aGlzLl90b1kgPSB0b1k7XG4gICAgICAgIHRoaXMuX3Bhc3NhYmxlQ2FsbGJhY2sgPSBwYXNzYWJsZUNhbGxiYWNrO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICB0b3BvbG9neTogOFxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fZGlycyA9IERJUlNbdGhpcy5fb3B0aW9ucy50b3BvbG9neV07XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDgpIHsgLyogcmVvcmRlciBkaXJzIGZvciBtb3JlIGFlc3RoZXRpYyByZXN1bHQgKHZlcnRpY2FsL2hvcml6b250YWwgZmlyc3QpICovXG4gICAgICAgICAgICB0aGlzLl9kaXJzID0gW1xuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbMF0sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1syXSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzRdLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbNl0sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1sxXSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzNdLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbNV0sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1s3XVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0TmVpZ2hib3JzKGN4LCBjeSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRpciA9IHRoaXMuX2RpcnNbaV07XG4gICAgICAgICAgICBsZXQgeCA9IGN4ICsgZGlyWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBjeSArIGRpclsxXTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fcGFzc2FibGVDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW3gsIHldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsIi8qKlxuICogVGhpcyBjb2RlIGlzIGFuIGltcGxlbWVudGF0aW9uIG9mIEFsZWEgYWxnb3JpdGhtOyAoQykgMjAxMCBKb2hhbm5lcyBCYWFnw7hlLlxuICogQWxlYSBpcyBsaWNlbnNlZCBhY2NvcmRpbmcgdG8gdGhlIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTUlUX0xpY2Vuc2UuXG4gKi9cbmNvbnN0IEZSQUMgPSAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvKiAyXi0zMiAqL1xuY2xhc3MgUk5HIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fc2VlZCA9IDA7XG4gICAgICAgIHRoaXMuX3MwID0gMDtcbiAgICAgICAgdGhpcy5fczEgPSAwO1xuICAgICAgICB0aGlzLl9zMiA9IDA7XG4gICAgICAgIHRoaXMuX2MgPSAwO1xuICAgIH1cbiAgICBnZXRTZWVkKCkgeyByZXR1cm4gdGhpcy5fc2VlZDsgfVxuICAgIC8qKlxuICAgICAqIFNlZWQgdGhlIG51bWJlciBnZW5lcmF0b3JcbiAgICAgKi9cbiAgICBzZXRTZWVkKHNlZWQpIHtcbiAgICAgICAgc2VlZCA9IChzZWVkIDwgMSA/IDEgLyBzZWVkIDogc2VlZCk7XG4gICAgICAgIHRoaXMuX3NlZWQgPSBzZWVkO1xuICAgICAgICB0aGlzLl9zMCA9IChzZWVkID4+PiAwKSAqIEZSQUM7XG4gICAgICAgIHNlZWQgPSAoc2VlZCAqIDY5MDY5ICsgMSkgPj4+IDA7XG4gICAgICAgIHRoaXMuX3MxID0gc2VlZCAqIEZSQUM7XG4gICAgICAgIHNlZWQgPSAoc2VlZCAqIDY5MDY5ICsgMSkgPj4+IDA7XG4gICAgICAgIHRoaXMuX3MyID0gc2VlZCAqIEZSQUM7XG4gICAgICAgIHRoaXMuX2MgPSAxO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUHNldWRvcmFuZG9tIHZhbHVlIFswLDEpLCB1bmlmb3JtbHkgZGlzdHJpYnV0ZWRcbiAgICAgKi9cbiAgICBnZXRVbmlmb3JtKCkge1xuICAgICAgICBsZXQgdCA9IDIwOTE2MzkgKiB0aGlzLl9zMCArIHRoaXMuX2MgKiBGUkFDO1xuICAgICAgICB0aGlzLl9zMCA9IHRoaXMuX3MxO1xuICAgICAgICB0aGlzLl9zMSA9IHRoaXMuX3MyO1xuICAgICAgICB0aGlzLl9jID0gdCB8IDA7XG4gICAgICAgIHRoaXMuX3MyID0gdCAtIHRoaXMuX2M7XG4gICAgICAgIHJldHVybiB0aGlzLl9zMjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGxvd2VyQm91bmQgVGhlIGxvd2VyIGVuZCBvZiB0aGUgcmFuZ2UgdG8gcmV0dXJuIGEgdmFsdWUgZnJvbSwgaW5jbHVzaXZlXG4gICAgICogQHBhcmFtIHVwcGVyQm91bmQgVGhlIHVwcGVyIGVuZCBvZiB0aGUgcmFuZ2UgdG8gcmV0dXJuIGEgdmFsdWUgZnJvbSwgaW5jbHVzaXZlXG4gICAgICogQHJldHVybnMgUHNldWRvcmFuZG9tIHZhbHVlIFtsb3dlckJvdW5kLCB1cHBlckJvdW5kXSwgdXNpbmcgUk9ULlJORy5nZXRVbmlmb3JtKCkgdG8gZGlzdHJpYnV0ZSB0aGUgdmFsdWVcbiAgICAgKi9cbiAgICBnZXRVbmlmb3JtSW50KGxvd2VyQm91bmQsIHVwcGVyQm91bmQpIHtcbiAgICAgICAgbGV0IG1heCA9IE1hdGgubWF4KGxvd2VyQm91bmQsIHVwcGVyQm91bmQpO1xuICAgICAgICBsZXQgbWluID0gTWF0aC5taW4obG93ZXJCb3VuZCwgdXBwZXJCb3VuZCk7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZ2V0VW5pZm9ybSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIG1lYW4gTWVhbiB2YWx1ZVxuICAgICAqIEBwYXJhbSBzdGRkZXYgU3RhbmRhcmQgZGV2aWF0aW9uLiB+OTUlIG9mIHRoZSBhYnNvbHV0ZSB2YWx1ZXMgd2lsbCBiZSBsb3dlciB0aGFuIDIqc3RkZGV2LlxuICAgICAqIEByZXR1cm5zIEEgbm9ybWFsbHkgZGlzdHJpYnV0ZWQgcHNldWRvcmFuZG9tIHZhbHVlXG4gICAgICovXG4gICAgZ2V0Tm9ybWFsKG1lYW4gPSAwLCBzdGRkZXYgPSAxKSB7XG4gICAgICAgIGxldCB1LCB2LCByO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB1ID0gMiAqIHRoaXMuZ2V0VW5pZm9ybSgpIC0gMTtcbiAgICAgICAgICAgIHYgPSAyICogdGhpcy5nZXRVbmlmb3JtKCkgLSAxO1xuICAgICAgICAgICAgciA9IHUgKiB1ICsgdiAqIHY7XG4gICAgICAgIH0gd2hpbGUgKHIgPiAxIHx8IHIgPT0gMCk7XG4gICAgICAgIGxldCBnYXVzcyA9IHUgKiBNYXRoLnNxcnQoLTIgKiBNYXRoLmxvZyhyKSAvIHIpO1xuICAgICAgICByZXR1cm4gbWVhbiArIGdhdXNzICogc3RkZGV2O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBQc2V1ZG9yYW5kb20gdmFsdWUgWzEsMTAwXSBpbmNsdXNpdmUsIHVuaWZvcm1seSBkaXN0cmlidXRlZFxuICAgICAqL1xuICAgIGdldFBlcmNlbnRhZ2UoKSB7XG4gICAgICAgIHJldHVybiAxICsgTWF0aC5mbG9vcih0aGlzLmdldFVuaWZvcm0oKSAqIDEwMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJhbmRvbWx5IHBpY2tlZCBpdGVtLCBudWxsIHdoZW4gbGVuZ3RoPTBcbiAgICAgKi9cbiAgICBnZXRJdGVtKGFycmF5KSB7XG4gICAgICAgIGlmICghYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vcih0aGlzLmdldFVuaWZvcm0oKSAqIGFycmF5Lmxlbmd0aCldO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBOZXcgYXJyYXkgd2l0aCByYW5kb21pemVkIGl0ZW1zXG4gICAgICovXG4gICAgc2h1ZmZsZShhcnJheSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBjbG9uZSA9IGFycmF5LnNsaWNlKCk7XG4gICAgICAgIHdoaWxlIChjbG9uZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGNsb25lLmluZGV4T2YodGhpcy5nZXRJdGVtKGNsb25lKSk7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjbG9uZS5zcGxpY2UoaW5kZXgsIDEpWzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0YSBrZXk9d2hhdGV2ZXIsIHZhbHVlPXdlaWdodCAocmVsYXRpdmUgcHJvYmFiaWxpdHkpXG4gICAgICogQHJldHVybnMgd2hhdGV2ZXJcbiAgICAgKi9cbiAgICBnZXRXZWlnaHRlZFZhbHVlKGRhdGEpIHtcbiAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgZm9yIChsZXQgaWQgaW4gZGF0YSkge1xuICAgICAgICAgICAgdG90YWwgKz0gZGF0YVtpZF07XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJhbmRvbSA9IHRoaXMuZ2V0VW5pZm9ybSgpICogdG90YWw7XG4gICAgICAgIGxldCBpZCwgcGFydCA9IDA7XG4gICAgICAgIGZvciAoaWQgaW4gZGF0YSkge1xuICAgICAgICAgICAgcGFydCArPSBkYXRhW2lkXTtcbiAgICAgICAgICAgIGlmIChyYW5kb20gPCBwYXJ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIGJ5IHNvbWUgZmxvYXRpbmctcG9pbnQgYW5ub3lhbmNlIHdlIGhhdmVcbiAgICAgICAgLy8gcmFuZG9tID49IHRvdGFsLCBqdXN0IHJldHVybiB0aGUgbGFzdCBpZC5cbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgUk5HIHN0YXRlLiBVc2VmdWwgZm9yIHN0b3JpbmcgdGhlIHN0YXRlIGFuZCByZS1zZXR0aW5nIGl0IHZpYSBzZXRTdGF0ZS5cbiAgICAgKiBAcmV0dXJucyBJbnRlcm5hbCBzdGF0ZVxuICAgICAqL1xuICAgIGdldFN0YXRlKCkgeyByZXR1cm4gW3RoaXMuX3MwLCB0aGlzLl9zMSwgdGhpcy5fczIsIHRoaXMuX2NdOyB9XG4gICAgLyoqXG4gICAgICogU2V0IGEgcHJldmlvdXNseSByZXRyaWV2ZWQgc3RhdGUuXG4gICAgICovXG4gICAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5fczAgPSBzdGF0ZVswXTtcbiAgICAgICAgdGhpcy5fczEgPSBzdGF0ZVsxXTtcbiAgICAgICAgdGhpcy5fczIgPSBzdGF0ZVsyXTtcbiAgICAgICAgdGhpcy5fYyA9IHN0YXRlWzNdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGNsb25lZCBSTkdcbiAgICAgKi9cbiAgICBjbG9uZSgpIHtcbiAgICAgICAgbGV0IGNsb25lID0gbmV3IFJORygpO1xuICAgICAgICByZXR1cm4gY2xvbmUuc2V0U3RhdGUodGhpcy5nZXRTdGF0ZSgpKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgUk5HKCkuc2V0U2VlZChEYXRlLm5vdygpKTtcbiIsImltcG9ydCBTY2hlZHVsZXIgZnJvbSBcIi4vc2NoZWR1bGVyLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBBY3Rpb24tYmFzZWQgc2NoZWR1bGVyXG4gKiBAYXVnbWVudHMgUk9ULlNjaGVkdWxlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rpb24gZXh0ZW5kcyBTY2hlZHVsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9kZWZhdWx0RHVyYXRpb24gPSAxOyAvKiBmb3IgbmV3bHkgYWRkZWQgKi9cbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0RHVyYXRpb247IC8qIGZvciB0aGlzLl9jdXJyZW50ICovXG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtXG4gICAgICogQHBhcmFtIHtib29sfSByZXBlYXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWU9MV1cbiAgICAgKiBAc2VlIFJPVC5TY2hlZHVsZXIjYWRkXG4gICAgICovXG4gICAgYWRkKGl0ZW0sIHJlcGVhdCwgdGltZSkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5hZGQoaXRlbSwgdGltZSB8fCB0aGlzLl9kZWZhdWx0RHVyYXRpb24pO1xuICAgICAgICByZXR1cm4gc3VwZXIuYWRkKGl0ZW0sIHJlcGVhdCk7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmNsZWFyKCk7XG4gICAgfVxuICAgIHJlbW92ZShpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtID09IHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fZGVmYXVsdER1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5yZW1vdmUoaXRlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUgUk9ULlNjaGVkdWxlciNuZXh0XG4gICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnQgIT09IG51bGwgJiYgdGhpcy5fcmVwZWF0LmluZGV4T2YodGhpcy5fY3VycmVudCkgIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlLmFkZCh0aGlzLl9jdXJyZW50LCB0aGlzLl9kdXJhdGlvbiB8fCB0aGlzLl9kZWZhdWx0RHVyYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0RHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLm5leHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGR1cmF0aW9uIGZvciB0aGUgYWN0aXZlIGl0ZW1cbiAgICAgKi9cbiAgICBzZXREdXJhdGlvbih0aW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNpbXBsZSBmcm9tIFwiLi9zaW1wbGUuanNcIjtcbmltcG9ydCBTcGVlZCBmcm9tIFwiLi9zcGVlZC5qc1wiO1xuaW1wb3J0IEFjdGlvbiBmcm9tIFwiLi9hY3Rpb24uanNcIjtcbmV4cG9ydCBkZWZhdWx0IHsgU2ltcGxlLCBTcGVlZCwgQWN0aW9uIH07XG4iLCJpbXBvcnQgRXZlbnRRdWV1ZSBmcm9tIFwiLi4vZXZlbnRxdWV1ZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NoZWR1bGVyIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgQWJzdHJhY3Qgc2NoZWR1bGVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlID0gbmV3IEV2ZW50UXVldWUoKTtcbiAgICAgICAgdGhpcy5fcmVwZWF0ID0gW107XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAc2VlIFJPVC5FdmVudFF1ZXVlI2dldFRpbWVcbiAgICAgKi9cbiAgICBnZXRUaW1lKCkgeyByZXR1cm4gdGhpcy5fcXVldWUuZ2V0VGltZSgpOyB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBpdGVtXG4gICAgICogQHBhcmFtIHtib29sfSByZXBlYXRcbiAgICAgKi9cbiAgICBhZGQoaXRlbSwgcmVwZWF0KSB7XG4gICAgICAgIGlmIChyZXBlYXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlcGVhdC5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRpbWUgdGhlIGdpdmVuIGl0ZW0gaXMgc2NoZWR1bGVkIGZvclxuICAgICAqIEBwYXJhbSB7P30gaXRlbVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRpbWVcbiAgICAgKi9cbiAgICBnZXRUaW1lT2YoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVldWUuZ2V0RXZlbnRUaW1lKGl0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgaXRlbXNcbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fcXVldWUuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fcmVwZWF0ID0gW107XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBudWxsO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgcHJldmlvdXNseSBhZGRlZCBpdGVtXG4gICAgICogQHBhcmFtIHs/fSBpdGVtXG4gICAgICogQHJldHVybnMge2Jvb2x9IHN1Y2Nlc3NmdWw/XG4gICAgICovXG4gICAgcmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuX3F1ZXVlLnJlbW92ZShpdGVtKTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fcmVwZWF0LmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fcmVwZWF0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnQgPT0gaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NoZWR1bGUgbmV4dCBpdGVtXG4gICAgICogQHJldHVybnMgez99XG4gICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IHRoaXMuX3F1ZXVlLmdldCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudDtcbiAgICB9XG59XG4iLCJpbXBvcnQgU2NoZWR1bGVyIGZyb20gXCIuL3NjaGVkdWxlci5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgU2ltcGxlIGZhaXIgc2NoZWR1bGVyIChyb3VuZC1yb2JpbiBzdHlsZSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxlIGV4dGVuZHMgU2NoZWR1bGVyIHtcbiAgICBhZGQoaXRlbSwgcmVwZWF0KSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlLmFkZChpdGVtLCAwKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFkZChpdGVtLCByZXBlYXQpO1xuICAgIH1cbiAgICBuZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudCAhPT0gbnVsbCAmJiB0aGlzLl9yZXBlYXQuaW5kZXhPZih0aGlzLl9jdXJyZW50KSAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fcXVldWUuYWRkKHRoaXMuX2N1cnJlbnQsIDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdXBlci5uZXh0KCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNjaGVkdWxlciBmcm9tIFwiLi9zY2hlZHVsZXIuanNcIjtcbi8qKlxuICogQGNsYXNzIFNwZWVkLWJhc2VkIHNjaGVkdWxlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGVlZCBleHRlbmRzIFNjaGVkdWxlciB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGl0ZW0gYW55dGhpbmcgd2l0aCBcImdldFNwZWVkXCIgbWV0aG9kXG4gICAgICogQHBhcmFtIHtib29sfSByZXBlYXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWU9MS9pdGVtLmdldFNwZWVkKCldXG4gICAgICogQHNlZSBST1QuU2NoZWR1bGVyI2FkZFxuICAgICAqL1xuICAgIGFkZChpdGVtLCByZXBlYXQsIHRpbWUpIHtcbiAgICAgICAgdGhpcy5fcXVldWUuYWRkKGl0ZW0sIHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiAxIC8gaXRlbS5nZXRTcGVlZCgpKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmFkZChpdGVtLCByZXBlYXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAc2VlIFJPVC5TY2hlZHVsZXIjbmV4dFxuICAgICAqL1xuICAgIG5leHQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50ICYmIHRoaXMuX3JlcGVhdC5pbmRleE9mKHRoaXMuX2N1cnJlbnQpICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWV1ZS5hZGQodGhpcy5fY3VycmVudCwgMSAvIHRoaXMuX2N1cnJlbnQuZ2V0U3BlZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLm5leHQoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUk5HIGZyb20gXCIuL3JuZy5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgKE1hcmtvdiBwcm9jZXNzKS1iYXNlZCBzdHJpbmcgZ2VuZXJhdG9yLlxuICogQ29waWVkIGZyb20gYSA8YSBocmVmPVwiaHR0cDovL3d3dy5yb2d1ZWJhc2luLnJvZ3VlbGlrZWRldmVsb3BtZW50Lm9yZy9pbmRleC5waHA/dGl0bGU9TmFtZXNfZnJvbV9hX2hpZ2hfb3JkZXJfTWFya292X1Byb2Nlc3NfYW5kX2Ffc2ltcGxpZmllZF9LYXR6X2JhY2stb2ZmX3NjaGVtZVwiPlJvZ3VlQmFzaW4gYXJ0aWNsZTwvYT4uXG4gKiBPZmZlcnMgY29uZmlndXJhYmxlIG9yZGVyIGFuZCBwcmlvci5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RyaW5nR2VuZXJhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAgICAgICB3b3JkczogZmFsc2UsXG4gICAgICAgICAgICBvcmRlcjogMyxcbiAgICAgICAgICAgIHByaW9yOiAwLjAwMVxuICAgICAgICB9O1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9ib3VuZGFyeSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMCk7XG4gICAgICAgIHRoaXMuX3N1ZmZpeCA9IHRoaXMuX2JvdW5kYXJ5O1xuICAgICAgICB0aGlzLl9wcmVmaXggPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vcHRpb25zLm9yZGVyOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZWZpeC5wdXNoKHRoaXMuX2JvdW5kYXJ5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcmlvclZhbHVlcyA9IHt9O1xuICAgICAgICB0aGlzLl9wcmlvclZhbHVlc1t0aGlzLl9ib3VuZGFyeV0gPSB0aGlzLl9vcHRpb25zLnByaW9yO1xuICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGVhcm5pbmcgZGF0YVxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgICAgIHRoaXMuX3ByaW9yVmFsdWVzID0ge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IEdlbmVyYXRlZCBzdHJpbmdcbiAgICAgKi9cbiAgICBnZW5lcmF0ZSgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFt0aGlzLl9zYW1wbGUodGhpcy5fcHJlZml4KV07XG4gICAgICAgIHdoaWxlIChyZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdICE9IHRoaXMuX2JvdW5kYXJ5KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLl9zYW1wbGUocmVzdWx0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2pvaW4ocmVzdWx0LnNsaWNlKDAsIC0xKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9ic2VydmUgKGxlYXJuKSBhIHN0cmluZyBmcm9tIGEgdHJhaW5pbmcgc2V0XG4gICAgICovXG4gICAgb2JzZXJ2ZShzdHJpbmcpIHtcbiAgICAgICAgbGV0IHRva2VucyA9IHRoaXMuX3NwbGl0KHN0cmluZyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmlvclZhbHVlc1t0b2tlbnNbaV1dID0gdGhpcy5fb3B0aW9ucy5wcmlvcjtcbiAgICAgICAgfVxuICAgICAgICB0b2tlbnMgPSB0aGlzLl9wcmVmaXguY29uY2F0KHRva2VucykuY29uY2F0KHRoaXMuX3N1ZmZpeCk7IC8qIGFkZCBib3VuZGFyeSBzeW1ib2xzICovXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9vcHRpb25zLm9yZGVyOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IHRva2Vucy5zbGljZShpIC0gdGhpcy5fb3B0aW9ucy5vcmRlciwgaSk7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbnRleHQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc3ViY29udGV4dCA9IGNvbnRleHQuc2xpY2Uoaik7XG4gICAgICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZUV2ZW50KHN1YmNvbnRleHQsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRTdGF0cygpIHtcbiAgICAgICAgbGV0IHBhcnRzID0gW107XG4gICAgICAgIGxldCBwcmlvckNvdW50ID0gT2JqZWN0LmtleXModGhpcy5fcHJpb3JWYWx1ZXMpLmxlbmd0aDtcbiAgICAgICAgcHJpb3JDb3VudC0tOyAvLyBib3VuZGFyeVxuICAgICAgICBwYXJ0cy5wdXNoKFwiZGlzdGluY3Qgc2FtcGxlczogXCIgKyBwcmlvckNvdW50KTtcbiAgICAgICAgbGV0IGRhdGFDb3VudCA9IE9iamVjdC5rZXlzKHRoaXMuX2RhdGEpLmxlbmd0aDtcbiAgICAgICAgbGV0IGV2ZW50Q291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBwIGluIHRoaXMuX2RhdGEpIHtcbiAgICAgICAgICAgIGV2ZW50Q291bnQgKz0gT2JqZWN0LmtleXModGhpcy5fZGF0YVtwXSkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goXCJkaWN0aW9uYXJ5IHNpemUgKGNvbnRleHRzKTogXCIgKyBkYXRhQ291bnQpO1xuICAgICAgICBwYXJ0cy5wdXNoKFwiZGljdGlvbmFyeSBzaXplIChldmVudHMpOiBcIiArIGV2ZW50Q291bnQpO1xuICAgICAgICByZXR1cm4gcGFydHMuam9pbihcIiwgXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ31cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgX3NwbGl0KHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLnNwbGl0KHRoaXMuX29wdGlvbnMud29yZHMgPyAvXFxzKy8gOiBcIlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIF9qb2luKGFycikge1xuICAgICAgICByZXR1cm4gYXJyLmpvaW4odGhpcy5fb3B0aW9ucy53b3JkcyA/IFwiIFwiIDogXCJcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICAgKi9cbiAgICBfb2JzZXJ2ZUV2ZW50KGNvbnRleHQsIGV2ZW50KSB7XG4gICAgICAgIGxldCBrZXkgPSB0aGlzLl9qb2luKGNvbnRleHQpO1xuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5fZGF0YSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFba2V5XSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fZGF0YVtrZXldO1xuICAgICAgICBpZiAoIShldmVudCBpbiBkYXRhKSkge1xuICAgICAgICAgICAgZGF0YVtldmVudF0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGRhdGFbZXZlbnRdKys7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBfc2FtcGxlKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dCA9IHRoaXMuX2JhY2tvZmYoY29udGV4dCk7XG4gICAgICAgIGxldCBrZXkgPSB0aGlzLl9qb2luKGNvbnRleHQpO1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX2RhdGFba2V5XTtcbiAgICAgICAgbGV0IGF2YWlsYWJsZSA9IHt9O1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5wcmlvcikge1xuICAgICAgICAgICAgZm9yIChsZXQgZXZlbnQgaW4gdGhpcy5fcHJpb3JWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVbZXZlbnRdID0gdGhpcy5fcHJpb3JWYWx1ZXNbZXZlbnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgZXZlbnQgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVtldmVudF0gKz0gZGF0YVtldmVudF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdmFpbGFibGUgPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBSTkcuZ2V0V2VpZ2h0ZWRWYWx1ZShhdmFpbGFibGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cbiAgICBfYmFja29mZihjb250ZXh0KSB7XG4gICAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IHRoaXMuX29wdGlvbnMub3JkZXIpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnNsaWNlKC10aGlzLl9vcHRpb25zLm9yZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb250ZXh0Lmxlbmd0aCA8IHRoaXMuX29wdGlvbnMub3JkZXIpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzLl9wcmVmaXguc2xpY2UoMCwgdGhpcy5fb3B0aW9ucy5vcmRlciAtIGNvbnRleHQubGVuZ3RoKS5jb25jYXQoY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKCEodGhpcy5fam9pbihjb250ZXh0KSBpbiB0aGlzLl9kYXRhKSAmJiBjb250ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbn1cbiIsIi8qKlxuICogQG5hbWVzcGFjZVxuICogQ29udGFpbnMgdGV4dCB0b2tlbml6YXRpb24gYW5kIGJyZWFraW5nIHJvdXRpbmVzXG4gKi9cbmNvbnN0IFJFX0NPTE9SUyA9IC8lKFtiY10peyhbXn1dKil9L2c7XG4vLyB0b2tlbiB0eXBlc1xuZXhwb3J0IGNvbnN0IFRZUEVfVEVYVCA9IDA7XG5leHBvcnQgY29uc3QgVFlQRV9ORVdMSU5FID0gMTtcbmV4cG9ydCBjb25zdCBUWVBFX0ZHID0gMjtcbmV4cG9ydCBjb25zdCBUWVBFX0JHID0gMztcbi8qKlxuICogTWVhc3VyZSBzaXplIG9mIGEgcmVzdWx0aW5nIHRleHQgYmxvY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lYXN1cmUoc3RyLCBtYXhXaWR0aCkge1xuICAgIGxldCByZXN1bHQgPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDEgfTtcbiAgICBsZXQgdG9rZW5zID0gdG9rZW5pemUoc3RyLCBtYXhXaWR0aCk7XG4gICAgbGV0IGxpbmVXaWR0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVFlQRV9URVhUOlxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aCArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFRZUEVfTkVXTElORTpcbiAgICAgICAgICAgICAgICByZXN1bHQuaGVpZ2h0Kys7XG4gICAgICAgICAgICAgICAgcmVzdWx0LndpZHRoID0gTWF0aC5tYXgocmVzdWx0LndpZHRoLCBsaW5lV2lkdGgpO1xuICAgICAgICAgICAgICAgIGxpbmVXaWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0LndpZHRoID0gTWF0aC5tYXgocmVzdWx0LndpZHRoLCBsaW5lV2lkdGgpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIENvbnZlcnQgc3RyaW5nIHRvIGEgc2VyaWVzIG9mIGEgZm9ybWF0dGluZyBjb21tYW5kc1xuICovXG5leHBvcnQgZnVuY3Rpb24gdG9rZW5pemUoc3RyLCBtYXhXaWR0aCkge1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAvKiBmaXJzdCB0b2tlbml6YXRpb24gcGFzcyAtIHNwbGl0IHRleHRzIGFuZCBjb2xvciBmb3JtYXR0aW5nIGNvbW1hbmRzICovXG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgc3RyLnJlcGxhY2UoUkVfQ09MT1JTLCBmdW5jdGlvbiAobWF0Y2gsIHR5cGUsIG5hbWUsIGluZGV4KSB7XG4gICAgICAgIC8qIHN0cmluZyBiZWZvcmUgKi9cbiAgICAgICAgbGV0IHBhcnQgPSBzdHIuc3Vic3RyaW5nKG9mZnNldCwgaW5kZXgpO1xuICAgICAgICBpZiAocGFydC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBUWVBFX1RFWFQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhcnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qIGNvbG9yIGNvbW1hbmQgKi9cbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgdHlwZTogKHR5cGUgPT0gXCJjXCIgPyBUWVBFX0ZHIDogVFlQRV9CRyksXG4gICAgICAgICAgICB2YWx1ZTogbmFtZS50cmltKClcbiAgICAgICAgfSk7XG4gICAgICAgIG9mZnNldCA9IGluZGV4ICsgbWF0Y2gubGVuZ3RoO1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9KTtcbiAgICAvKiBsYXN0IHJlbWFpbmluZyBwYXJ0ICovXG4gICAgbGV0IHBhcnQgPSBzdHIuc3Vic3RyaW5nKG9mZnNldCk7XG4gICAgaWYgKHBhcnQubGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IFRZUEVfVEVYVCxcbiAgICAgICAgICAgIHZhbHVlOiBwYXJ0XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYnJlYWtMaW5lcyhyZXN1bHQsIG1heFdpZHRoKTtcbn1cbi8qIGluc2VydCBsaW5lIGJyZWFrcyBpbnRvIGZpcnN0LXBhc3MgdG9rZW5pemVkIGRhdGEgKi9cbmZ1bmN0aW9uIGJyZWFrTGluZXModG9rZW5zLCBtYXhXaWR0aCkge1xuICAgIGlmICghbWF4V2lkdGgpIHtcbiAgICAgICAgbWF4V2lkdGggPSBJbmZpbml0eTtcbiAgICB9XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsaW5lTGVuZ3RoID0gMDtcbiAgICBsZXQgbGFzdFRva2VuV2l0aFNwYWNlID0gLTE7XG4gICAgd2hpbGUgKGkgPCB0b2tlbnMubGVuZ3RoKSB7IC8qIHRha2UgYWxsIHRleHQgdG9rZW5zLCByZW1vdmUgc3BhY2UsIGFwcGx5IGxpbmVicmVha3MgKi9cbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBpZiAodG9rZW4udHlwZSA9PSBUWVBFX05FV0xJTkUpIHsgLyogcmVzZXQgKi9cbiAgICAgICAgICAgIGxpbmVMZW5ndGggPSAwO1xuICAgICAgICAgICAgbGFzdFRva2VuV2l0aFNwYWNlID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT0gVFlQRV9URVhUKSB7IC8qIHNraXAgbm9uLXRleHQgdG9rZW5zICovXG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvKiByZW1vdmUgc3BhY2VzIGF0IHRoZSBiZWdpbm5pbmcgb2YgbGluZSAqL1xuICAgICAgICB3aGlsZSAobGluZUxlbmd0aCA9PSAwICYmIHRva2VuLnZhbHVlLmNoYXJBdCgwKSA9PSBcIiBcIikge1xuICAgICAgICAgICAgdG9rZW4udmFsdWUgPSB0b2tlbi52YWx1ZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgICAgLyogZm9yY2VkIG5ld2xpbmU/IGluc2VydCB0d28gbmV3IHRva2VucyBhZnRlciB0aGlzIG9uZSAqL1xuICAgICAgICBsZXQgaW5kZXggPSB0b2tlbi52YWx1ZS5pbmRleE9mKFwiXFxuXCIpO1xuICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIHRva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGksIGluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgIC8qIGlmIHRoZXJlIGFyZSBzcGFjZXMgYXQgdGhlIGVuZCwgd2UgbXVzdCByZW1vdmUgdGhlbSAod2UgZG8gbm90IHdhbnQgdGhlIGxpbmUgdG9vIGxvbmcpICovXG4gICAgICAgICAgICBsZXQgYXJyID0gdG9rZW4udmFsdWUuc3BsaXQoXCJcIik7XG4gICAgICAgICAgICB3aGlsZSAoYXJyLmxlbmd0aCAmJiBhcnJbYXJyLmxlbmd0aCAtIDFdID09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW4udmFsdWUgPSBhcnIuam9pbihcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICAvKiB0b2tlbiBkZWdlbmVyYXRlZD8gKi9cbiAgICAgICAgaWYgKCF0b2tlbi52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRva2Vucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGluZUxlbmd0aCArIHRva2VuLnZhbHVlLmxlbmd0aCA+IG1heFdpZHRoKSB7IC8qIGxpbmUgdG9vIGxvbmcsIGZpbmQgYSBzdWl0YWJsZSBicmVha2luZyBzcG90ICovXG4gICAgICAgICAgICAvKiBpcyBpdCBwb3NzaWJsZSB0byBicmVhayB3aXRoaW4gdGhpcyB0b2tlbj8gKi9cbiAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dEluZGV4ID0gdG9rZW4udmFsdWUuaW5kZXhPZihcIiBcIiwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dEluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGluZUxlbmd0aCArIG5leHRJbmRleCA+IG1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmRleCA9IG5leHRJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkgeyAvKiBicmVhayBhdCBzcGFjZSB3aXRoaW4gdGhpcyBvbmUgKi9cbiAgICAgICAgICAgICAgICB0b2tlbi52YWx1ZSA9IGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCBpLCBpbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsYXN0VG9rZW5XaXRoU3BhY2UgIT0gLTEpIHsgLyogaXMgdGhlcmUgYSBwcmV2aW91cyB0b2tlbiB3aGVyZSBhIGJyZWFrIGNhbiBvY2N1cj8gKi9cbiAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbbGFzdFRva2VuV2l0aFNwYWNlXTtcbiAgICAgICAgICAgICAgICBsZXQgYnJlYWtJbmRleCA9IHRva2VuLnZhbHVlLmxhc3RJbmRleE9mKFwiIFwiKTtcbiAgICAgICAgICAgICAgICB0b2tlbi52YWx1ZSA9IGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCBsYXN0VG9rZW5XaXRoU3BhY2UsIGJyZWFrSW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgICAgIGkgPSBsYXN0VG9rZW5XaXRoU3BhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLyogZm9yY2UgYnJlYWsgaW4gdGhpcyB0b2tlbiAqL1xuICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGksIG1heFdpZHRoIC0gbGluZUxlbmd0aCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvKiBsaW5lIG5vdCBsb25nLCBjb250aW51ZSAqL1xuICAgICAgICAgICAgbGluZUxlbmd0aCArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAodG9rZW4udmFsdWUuaW5kZXhPZihcIiBcIikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsYXN0VG9rZW5XaXRoU3BhY2UgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGkrKzsgLyogYWR2YW5jZSB0byBuZXh0IHRva2VuICovXG4gICAgfVxuICAgIHRva2Vucy5wdXNoKHsgdHlwZTogVFlQRV9ORVdMSU5FIH0pOyAvKiBpbnNlcnQgZmFrZSBuZXdsaW5lIHRvIGZpeCB0aGUgbGFzdCB0ZXh0IGxpbmUgKi9cbiAgICAvKiByZW1vdmUgdHJhaWxpbmcgc3BhY2UgZnJvbSB0ZXh0IHRva2VucyBiZWZvcmUgbmV3bGluZXMgKi9cbiAgICBsZXQgbGFzdFRleHRUb2tlbiA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVFlQRV9URVhUOlxuICAgICAgICAgICAgICAgIGxhc3RUZXh0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVFlQRV9ORVdMSU5FOlxuICAgICAgICAgICAgICAgIGlmIChsYXN0VGV4dFRva2VuKSB7IC8qIHJlbW92ZSB0cmFpbGluZyBzcGFjZSAqL1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gbGFzdFRleHRUb2tlbi52YWx1ZS5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGFyci5sZW5ndGggJiYgYXJyW2Fyci5sZW5ndGggLSAxXSA9PSBcIiBcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxhc3RUZXh0VG9rZW4udmFsdWUgPSBhcnIuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdFRleHRUb2tlbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdG9rZW5zLnBvcCgpOyAvKiByZW1vdmUgZmFrZSB0b2tlbiAqL1xuICAgIHJldHVybiB0b2tlbnM7XG59XG4vKipcbiAqIENyZWF0ZSBuZXcgdG9rZW5zIGFuZCBpbnNlcnQgdGhlbSBpbnRvIHRoZSBzdHJlYW1cbiAqIEBwYXJhbSB7b2JqZWN0W119IHRva2Vuc1xuICogQHBhcmFtIHtpbnR9IHRva2VuSW5kZXggVG9rZW4gYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0ge2ludH0gYnJlYWtJbmRleCBJbmRleCB3aXRoaW4gY3VycmVudCB0b2tlbidzIHZhbHVlXG4gKiBAcGFyYW0ge2Jvb2x9IHJlbW92ZUJyZWFrQ2hhciBEbyB3ZSB3YW50IHRvIHJlbW92ZSB0aGUgYnJlYWtpbmcgY2hhcmFjdGVyP1xuICogQHJldHVybnMge3N0cmluZ30gcmVtYWluaW5nIHVuYnJva2VuIHRva2VuIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIGJyZWFrSW5zaWRlVG9rZW4odG9rZW5zLCB0b2tlbkluZGV4LCBicmVha0luZGV4LCByZW1vdmVCcmVha0NoYXIpIHtcbiAgICBsZXQgbmV3QnJlYWtUb2tlbiA9IHtcbiAgICAgICAgdHlwZTogVFlQRV9ORVdMSU5FXG4gICAgfTtcbiAgICBsZXQgbmV3VGV4dFRva2VuID0ge1xuICAgICAgICB0eXBlOiBUWVBFX1RFWFQsXG4gICAgICAgIHZhbHVlOiB0b2tlbnNbdG9rZW5JbmRleF0udmFsdWUuc3Vic3RyaW5nKGJyZWFrSW5kZXggKyAocmVtb3ZlQnJlYWtDaGFyID8gMSA6IDApKVxuICAgIH07XG4gICAgdG9rZW5zLnNwbGljZSh0b2tlbkluZGV4ICsgMSwgMCwgbmV3QnJlYWtUb2tlbiwgbmV3VGV4dFRva2VuKTtcbiAgICByZXR1cm4gdG9rZW5zW3Rva2VuSW5kZXhdLnZhbHVlLnN1YnN0cmluZygwLCBicmVha0luZGV4KTtcbn1cbiIsIi8qKlxuICogQWx3YXlzIHBvc2l0aXZlIG1vZHVsdXNcbiAqIEBwYXJhbSB4IE9wZXJhbmRcbiAqIEBwYXJhbSBuIE1vZHVsdXNcbiAqIEByZXR1cm5zIHggbW9kdWxvIG5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vZCh4LCBuKSB7XG4gICAgcmV0dXJuICh4ICUgbiArIG4pICUgbjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCh2YWwsIG1pbiA9IDAsIG1heCA9IDEpIHtcbiAgICBpZiAodmFsIDwgbWluKVxuICAgICAgICByZXR1cm4gbWluO1xuICAgIGlmICh2YWwgPiBtYXgpXG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgcmV0dXJuIHZhbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc3Vic3RyaW5nKDEpO1xufVxuLyoqXG4gKiBGb3JtYXQgYSBzdHJpbmcgaW4gYSBmbGV4aWJsZSB3YXkuIFNjYW5zIGZvciAlcyBzdHJpbmdzIGFuZCByZXBsYWNlcyB0aGVtIHdpdGggYXJndW1lbnRzLiBMaXN0IG9mIHBhdHRlcm5zIGlzIG1vZGlmaWFibGUgdmlhIFN0cmluZy5mb3JtYXQubWFwLlxuICogQHBhcmFtIHtzdHJpbmd9IHRlbXBsYXRlXG4gKiBAcGFyYW0ge2FueX0gW2FyZ3ZdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQodGVtcGxhdGUsIC4uLmFyZ3MpIHtcbiAgICBsZXQgbWFwID0gZm9ybWF0Lm1hcDtcbiAgICBsZXQgcmVwbGFjZXIgPSBmdW5jdGlvbiAobWF0Y2gsIGdyb3VwMSwgZ3JvdXAyLCBpbmRleCkge1xuICAgICAgICBpZiAodGVtcGxhdGUuY2hhckF0KGluZGV4IC0gMSkgPT0gXCIlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaC5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvYmogPSBhcmdzWzBdO1xuICAgICAgICBsZXQgZ3JvdXAgPSBncm91cDEgfHwgZ3JvdXAyO1xuICAgICAgICBsZXQgcGFydHMgPSBncm91cC5zcGxpdChcIixcIik7XG4gICAgICAgIGxldCBuYW1lID0gcGFydHMuc2hpZnQoKSB8fCBcIlwiO1xuICAgICAgICBsZXQgbWV0aG9kID0gbWFwW25hbWUudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIGlmICghbWV0aG9kKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgIH1cbiAgICAgICAgb2JqID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBsZXQgcmVwbGFjZWQgPSBvYmpbbWV0aG9kXS5hcHBseShvYmosIHBhcnRzKTtcbiAgICAgICAgbGV0IGZpcnN0ID0gbmFtZS5jaGFyQXQoMCk7XG4gICAgICAgIGlmIChmaXJzdCAhPSBmaXJzdC50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICByZXBsYWNlZCA9IGNhcGl0YWxpemUocmVwbGFjZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXBsYWNlZDtcbiAgICB9O1xuICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKC8lKD86KFthLXpdKyl8KD86eyhbXn1dKyl9KSkvZ2ksIHJlcGxhY2VyKTtcbn1cbmZvcm1hdC5tYXAgPSB7XG4gICAgXCJzXCI6IFwidG9TdHJpbmdcIlxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBGT1YsIERJUlMsIFJORywgUGF0aCB9IGZyb20gXCJyb3QtanNcIjtcblxuaW1wb3J0IGdsb2JhbHMgZnJvbSBcIi4vZ2xvYmFsc1wiO1xuaW1wb3J0IHsgaXNCbG9ja2VkLCBpc1NpZ2h0QmxvY2tlZCwgZmluZEVtcHR5U3BhY2UgfSBmcm9tIFwiLi9tYXBcIjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBpZiBhbiB4IGFuZCB5IGNvb3JkaW5hdGVcbiAqIHJlcHJlc2VudHMgYSBwYXNzYWJsZSBzcG90IG9uIHRoZSBtYXAuXG4gKlxuICogQHBhcmFtICB7R2FtZU9iamVjdH0gb3duZXIgVGhlIGdhbWUgb2JqZWN0IHRvIGJlIHVzZWQgd2l0aCB0aGlzIGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gICAgICAgICB0aGUgY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhc3NhYmxlQ2FsbGJhY2sob3duZXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAvLyBvd24gc3BhY2UgaXMgcGFzc2FibGVcbiAgICAgICAgaWYgKG93bmVyLnggPT09IHggJiYgb3duZXIueSA9PT0geSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzQmxvY2tlZChnbG9iYWxzLkdhbWUubWFwLCBnbG9iYWxzLkdhbWUuZ2FtZU9iamVjdHMsIHgsIHkpID09PSBudWxsO1xuICAgIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgaWYgYW4geCBhbmQgeSBjb29yZGluYXRlXG4gKiByZXByZXNlbnRzIGEgc3BvdCBvbiB0aGUgbWFwIHdoaWNoIGNhbiBiZSBzZWVuIHRocm91Z2guXG4gKlxuICogQHBhcmFtICB7R2FtZU9iamVjdH0gb3duZXIgVGhlIGdhbWUgb2JqZWN0IHRvIGJlIHVzZWQgd2l0aCB0aGlzIGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gICAgICAgICB0aGUgY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhc3NhYmxlU2lnaHRDYWxsYmFjayhvd25lcikge1xuICAgIHJldHVybiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIC8vIG93biBzcGFjZSBpcyBwYXNzYWJsZVxuICAgICAgICBpZiAob3duZXIueCA9PT0geCAmJiBvd25lci55ID09PSB5KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNTaWdodEJsb2NrZWQoZ2xvYmFscy5HYW1lLm1hcCwgZ2xvYmFscy5HYW1lLmdhbWVPYmplY3RzLCB4LCB5KSA9PT0gZmFsc2U7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gd2hpY2ggY2hlY2tzIGlmIHRoZSBHYW1lIHBsYXllciBvYmplY3RcbiAqIGlzIHZpc2libGUgb3Igbm90IGFuZCBzZXRzIHRoZSBBSSB0byB0aGUgY2hhc2Ugc3RhdGUgaWYgaXRcbiAqIGlzLlxuICpcbiAqIEBwYXJhbSAge0dhbWVPYmplY3R9IG93bmVyIFRoZSBnYW1lIG9iamVjdCB0byBiZSB1c2VkIHdpdGggdGhpcyBmdW5jdGlvblxuICogQHJldHVybiB7RnVuY3Rpb259ICAgICAgICAgdGhlIGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVZpc2liaWxpdHlDYWxsYmFjayhhaSkge1xuICAgIHJldHVybiBmdW5jdGlvbih4LCB5LCByLCB2aXNpYmlsaXR5KSB7XG4gICAgICAgIGlmICh4ID09PSBnbG9iYWxzLkdhbWUucGxheWVyLnggJiYgeSA9PT0gZ2xvYmFscy5HYW1lLnBsYXllci55ICYmIHZpc2liaWxpdHkgPiAwKSB7XG4gICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoYWkub3duZXIubmFtZSArIFwiIHNhdyB5b3VcIik7XG4gICAgICAgICAgICBhaS5zdGF0ZSA9IFwiY2hhc2VcIjtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8qKlxuICogQmFzaWMgbW9uc3RlciBiZWhhdmlvciB3aXRoIHR3byBzdGF0ZXMsIGNoYXNlIGFuZCB3YW5kZXIuXG4gKiBEZWZhdWx0IHN0YXRlIGlzIHdhbmRlciwgd2hpY2gganVzdCBjaG9vc2VzIGEgcmFuZG9tIGRpcmVjdGlvblxuICogc2VlcyBpZiBpdCdzIGVtcHR5LCBhbmQgbW92ZXMgaWYgaXQgaXMuXG4gKlxuICogVXNlcyBhIGRlZmluYWJsZSBzaWdodCByYW5nZSB0byBjaGVjayBpZiBhIHRhcmdldCBpcyBpbiByYW5nZS5cbiAqIElmIG9uZSBpcyB0aGlzIHN3aXRjaGVzIHRvIGNoYXNlIHdoaWNoIHVzZXMgQSogdG8gZ28gdG93YXJkc1xuICogdGhlIHRhcmdldC4gQXR0YWNrcyB0aGUgdGFyZ2V0IHdoZW4gaXQncyB3aXRoaW4gb25lIHRpbGUgZnJvbSBpdFxuICovXG5jbGFzcyBCYXNpY01vbnN0ZXJBSSB7XG4gICAgY29uc3RydWN0b3Ioc2lnaHRSYW5nZSkge1xuICAgICAgICB0aGlzLm93bmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwid2FuZGVyXCI7XG4gICAgICAgIHRoaXMuc2lnaHRSYW5nZSA9IHNpZ2h0UmFuZ2U7XG4gICAgfVxuXG4gICAgc2V0T3duZXIob3duZXIpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIH1cblxuICAgIGFjdCgpIHtcbiAgICAgICAgLy8gd2FuZGVyIGluIHJhbmRvbSBkaXJlY3Rpb25zXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBcIndhbmRlclwiKSB7XG4gICAgICAgICAgICAvLyBjb21wdXRlIHRoZSBGT1YgdG8gc2VlIGlmIHRoZSBwbGF5ZXIgaXMgc2lnaHRlZFxuICAgICAgICAgICAgY29uc3QgZm92ID0gbmV3IEZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZyhjcmVhdGVQYXNzYWJsZVNpZ2h0Q2FsbGJhY2sodGhpcy5vd25lcikpO1xuICAgICAgICAgICAgZm92LmNvbXB1dGUodGhpcy5vd25lci54LCB0aGlzLm93bmVyLnksIHRoaXMuc2lnaHRSYW5nZSwgY3JlYXRlVmlzaWJpbGl0eUNhbGxiYWNrKHRoaXMpKTtcblxuICAgICAgICAgICAgY29uc3QgZGlyID0gRElSU1s4XVtSTkcuZ2V0SXRlbShbMCwgMSwgMiwgMywgNCwgNSwgNiwgN10pXTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ggPSB0aGlzLm93bmVyLnggKyBkaXJbMF07XG4gICAgICAgICAgICBjb25zdCBuZXdZID0gdGhpcy5vd25lci55ICsgZGlyWzFdO1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gaXNCbG9ja2VkKGdsb2JhbHMuR2FtZS5tYXAsIGdsb2JhbHMuR2FtZS5nYW1lT2JqZWN0cywgbmV3WCwgbmV3WSk7XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3duZXIueCA9IG5ld1g7XG4gICAgICAgICAgICB0aGlzLm93bmVyLnkgPSBuZXdZO1xuICAgICAgICAvLyBjaGFzZSB0aGUgcGxheWVyIHdpdGggQSpcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09PSBcImNoYXNlXCIpIHtcbiAgICAgICAgICAgIGxldCB4ID0gZ2xvYmFscy5HYW1lLnBsYXllci54O1xuICAgICAgICAgICAgbGV0IHkgPSBnbG9iYWxzLkdhbWUucGxheWVyLnk7XG4gICAgICAgICAgICBjb25zdCBhc3RhciA9IG5ldyBQYXRoLkFTdGFyKFxuICAgICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgICAgeSxcbiAgICAgICAgICAgICAgICBjcmVhdGVQYXNzYWJsZUNhbGxiYWNrKHRoaXMub3duZXIpLFxuICAgICAgICAgICAgICAgIHsgdG9wb2xvZ3k6IDggfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IFtdO1xuICAgICAgICAgICAgZnVuY3Rpb24gcGF0aENhbGxiYWNrKHgsIHkpIHtcbiAgICAgICAgICAgICAgICBwYXRoLnB1c2goW3gsIHldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzdGFyLmNvbXB1dGUodGhpcy5vd25lci54LCB0aGlzLm93bmVyLnksIHBhdGhDYWxsYmFjayk7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBvdXIgb3duIHBvc2l0aW9uXG4gICAgICAgICAgICBwYXRoLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmZpZ2h0ZXIuYXR0YWNrKGdsb2JhbHMuR2FtZS5wbGF5ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHggPSBwYXRoWzBdWzBdO1xuICAgICAgICAgICAgICAgIHkgPSBwYXRoWzBdWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMub3duZXIueCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci55ID0geTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBNb3JlIGNvbXBsZXggbW9uc3RlciBiZWhhdmlvciB3aXRoIHR3byBzdGF0ZXMsIGNoYXNlIGFuZCBwYXRyb2wuXG4gKiBUaGUgZGVmYXVsdCBzdGF0ZSwgcGF0cm9sLCBjaG9vc2VzIGEgcmFuZG9tIGVtcHR5IHNwYWNlIGluIHRoZVxuICogbWFwIGFuZCB1c2VzIEEqIHRvIGdvIHRoZXJlLlxuICpcbiAqIFVzZXMgYSBkZWZpbmFibGUgc2lnaHQgcmFuZ2UgdG8gY2hlY2sgaWYgYSB0YXJnZXQgaXMgaW4gcmFuZ2UuXG4gKiBJZiBvbmUgaXMgdGhpcyBzd2l0Y2hlcyB0byBjaGFzZSB3aGljaCB1c2VzIEEqIHRvIGdvIHRvd2FyZHNcbiAqIHRoZSB0YXJnZXQuIEF0dGFja3MgdGhlIHRhcmdldCB3aGVuIGl0J3Mgd2l0aGluIG9uZSB0aWxlIGZyb20gaXRcbiAqL1xuY2xhc3MgUGF0cm9sbGluZ01vbnN0ZXJBSSB7XG4gICAgY29uc3RydWN0b3Ioc2lnaHRSYW5nZSkge1xuICAgICAgICB0aGlzLm93bmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwicGF0cm9sXCI7XG4gICAgICAgIHRoaXMuc2lnaHRSYW5nZSA9IHNpZ2h0UmFuZ2U7XG4gICAgICAgIHRoaXMucGF0cm9sVGFyZ2V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgYWN0KCkge1xuICAgICAgICAvLyBjaG9vc2UgYSByYW5kb20gc3BvdCBvcGVuIGluIHRoZSBtYXAgYW5kIGdvIHRoZXJlXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBcInBhdHJvbFwiKSB7XG4gICAgICAgICAgICAvLyBjb21wdXRlIHRoZSBGT1YgdG8gc2VlIGlmIHRoZSBwbGF5ZXIgaXMgc2lnaHRlZFxuICAgICAgICAgICAgY29uc3QgZm92ID0gbmV3IEZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZyhjcmVhdGVQYXNzYWJsZVNpZ2h0Q2FsbGJhY2sodGhpcy5vd25lcikpO1xuICAgICAgICAgICAgZm92LmNvbXB1dGUodGhpcy5vd25lci54LCB0aGlzLm93bmVyLnksIHRoaXMuc2lnaHRSYW5nZSwgY3JlYXRlVmlzaWJpbGl0eUNhbGxiYWNrKHRoaXMpKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGF0cm9sVGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xUYXJnZXQgPSBmaW5kRW1wdHlTcGFjZShnbG9iYWxzLkdhbWUubWFwLCBnbG9iYWxzLkdhbWUuZ2FtZU9iamVjdHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBhc3RhciA9IG5ldyBQYXRoLkFTdGFyKFxuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sVGFyZ2V0LngsXG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xUYXJnZXQueSxcbiAgICAgICAgICAgICAgICBjcmVhdGVQYXNzYWJsZUNhbGxiYWNrKHRoaXMub3duZXIpLFxuICAgICAgICAgICAgICAgIHsgdG9wb2xvZ3k6IDggfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IFtdO1xuICAgICAgICAgICAgZnVuY3Rpb24gcGF0aENhbGxiYWNrKHgsIHkpIHtcbiAgICAgICAgICAgICAgICBwYXRoLnB1c2goW3gsIHldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzdGFyLmNvbXB1dGUodGhpcy5vd25lci54LCB0aGlzLm93bmVyLnksIHBhdGhDYWxsYmFjayk7XG5cbiAgICAgICAgICAgIHBhdGguc2hpZnQoKTtcblxuICAgICAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xUYXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vd25lci54ID0gcGF0aFswXVswXTtcbiAgICAgICAgICAgIHRoaXMub3duZXIueSA9IHBhdGhbMF1bMV07XG4gICAgICAgIC8vIGNoYXNlIHRoZSBwbGF5ZXIgd2l0aCBBKlxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUgPT09IFwiY2hhc2VcIikge1xuICAgICAgICAgICAgY29uc3QgYXN0YXIgPSBuZXcgUGF0aC5BU3RhcihcbiAgICAgICAgICAgICAgICBnbG9iYWxzLkdhbWUucGxheWVyLngsXG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLnBsYXllci55LFxuICAgICAgICAgICAgICAgIGNyZWF0ZVBhc3NhYmxlU2lnaHRDYWxsYmFjayh0aGlzLm93bmVyKSxcbiAgICAgICAgICAgICAgICB7IHRvcG9sb2d5OiA4IH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBbXTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhdGhDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKFt4LCB5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhc3Rhci5jb21wdXRlKHRoaXMub3duZXIueCwgdGhpcy5vd25lci55LCBwYXRoQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgb3VyIG93biBwb3NpdGlvblxuICAgICAgICAgICAgcGF0aC5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci5maWdodGVyLmF0dGFjayhnbG9iYWxzLkdhbWUucGxheWVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLnggPSBwYXRoWzBdWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMub3duZXIueSA9IHBhdGhbMF1bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQUkgY29tcG9uZW50IHdoaWNoIHN0b3JlcyB0aGUgcHJldmlvdXMgQUkgZnJvbSB0aGUgb3duZXIuXG4gKiBHb2VzIGluIHJhbmRvbSBkaXJlY3Rpb25zIGZvciB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBhY3RcbiAqIGNhbGxzLiBUaGVuLCByZXBsYWNlcyBpdHNlbGYgb24gdGhlIG93bmVyIHdpdGggdGhlIHByZXZpb3VzXG4gKiBBSSBjb21wb25lbnQgb24gdGhlIG93bmVyLlxuICovXG5jbGFzcyBDb25mdXNlZEFJIHtcbiAgICBjb25zdHJ1Y3RvcihjdXJyZW50QUksIHR1cm5zKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBudWxsO1xuICAgICAgICB0aGlzLm9sZEFJID0gY3VycmVudEFJO1xuICAgICAgICB0aGlzLnR1cm5zID0gdHVybnM7XG4gICAgfVxuXG4gICAgYWN0KCkge1xuICAgICAgICBpZiAodGhpcy50dXJucyA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IERJUlNbNF1bUk5HLmdldEl0ZW0oWzAsIDEsIDIsIDNdKV07XG4gICAgICAgICAgICBjb25zdCBuZXdYID0gdGhpcy5vd25lci54ICsgZGlyWzBdO1xuICAgICAgICAgICAgY29uc3QgbmV3WSA9IHRoaXMub3duZXIueSArIGRpclsxXTtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQmxvY2tlZChnbG9iYWxzLkdhbWUubWFwLCBnbG9iYWxzLkdhbWUuZ2FtZU9iamVjdHMsIG5ld1gsIG5ld1kpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm93bmVyLnggPSBuZXdYO1xuICAgICAgICAgICAgdGhpcy5vd25lci55ID0gbmV3WTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm93bmVyID09PSBnbG9iYWxzLkdhbWUucGxheWVyKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKFwiWW91IGFyZSBubyBsb25nZXIgY29uZnVzZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZSh0aGlzLm93bmVyLm5hbWUgKyBcIiBpcyBubyBsb25nZXIgY29uZnVzZWRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3duZXIuYWkgPSB0aGlzLm9sZEFJO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHVybnMtLTtcbiAgICB9XG59XG5cbi8qKlxuICogQUkgd2hpY2ggY2hhbmdlcyB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgb2JqZWN0IHdoZW4gdGhlIGludmVudG9yeVxuICogY29tcG9uZW50IGlzIGVtcHR5XG4gKi9cbmNsYXNzIENoZXN0QUkge1xuICAgIGNvbnN0cnVjdG9yKGJnQ29sb3IsIGVtcHR5Q29sb3IpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG51bGw7XG4gICAgICAgIHRoaXMuYmdDb2xvciA9IGJnQ29sb3I7XG4gICAgICAgIHRoaXMuZW1wdHlDb2xvciA9IGVtcHR5Q29sb3I7XG4gICAgfVxuXG4gICAgc2V0T3duZXIob3duZXIpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIH1cblxuICAgIGFjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3duZXIgJiYgdGhpcy5vd25lci5pbnZlbnRvcnlDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm93bmVyLmludmVudG9yeUNvbXBvbmVudC5nZXRJRHNBbmRDb3VudHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmdyYXBoaWNzLmJnQ29sb3IgPSB0aGlzLmVtcHR5Q29sb3I7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3duZXIuZ3JhcGhpY3MuYmdDb2xvciA9IHRoaXMuYmdDb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNaXNzaW5nIGludmVudG9yeUNvbXBvbmVudCBmb3IgQ2hlc3RBSVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBSSB3aGljaCByZW1vdmVzIHRoZSBvd25lciBmcm9tIHRoZSBnYW1lIHdoZW4gdGhlIGludmVudG9yeSBpcyBlbXB0eVxuICovXG5jbGFzcyBEcm9wcGVkSXRlbUFJIHtcbiAgICBjb25zdHJ1Y3RvcihiZ0NvbG9yLCBlbXB0eUNvbG9yKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmJnQ29sb3IgPSBiZ0NvbG9yO1xuICAgICAgICB0aGlzLmVtcHR5Q29sb3IgPSBlbXB0eUNvbG9yO1xuICAgIH1cblxuICAgIHNldE93bmVyKG93bmVyKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG5cbiAgICBhY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLm93bmVyICYmIHRoaXMub3duZXIuaW52ZW50b3J5Q29tcG9uZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vd25lci5pbnZlbnRvcnlDb21wb25lbnQuZ2V0SURzQW5kQ291bnRzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLnJlbW92ZU9iamVjdCh0aGlzLm93bmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNaXNzaW5nIGludmVudG9yeUNvbXBvbmVudCBmb3IgRHJvcHBlZEl0ZW1BSVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHsgQmFzaWNNb25zdGVyQUksIFBhdHJvbGxpbmdNb25zdGVyQUksIENvbmZ1c2VkQUksIENoZXN0QUksIERyb3BwZWRJdGVtQUkgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBjYXN0SGVhbCwgY2FzdENvbmZ1c2UsIGNhc3RDbGFpcnZveWFuY2UsIGNhc3REYW1hZ2VTcGVsbCwgY2FzdFdpbGREYW1hZ2VTcGVsbCB9IGZyb20gXCIuL2l0ZW1zXCI7XG5pbXBvcnQgeyBjcmVhdGVCdXJuRWZmZWN0IH0gZnJvbSBcIi4vZWZmZWN0c1wiO1xuXG5leHBvcnQgY29uc3QgV0lEVEggPSA3MDtcbmV4cG9ydCBjb25zdCBIRUlHSFQgPSA0NTtcbmV4cG9ydCBjb25zdCBVSV9IRUlHSFQgPSA2O1xuZXhwb3J0IGNvbnN0IFdPUkxEX1dJRFRIID0gV0lEVEg7XG5leHBvcnQgY29uc3QgV09STERfSEVJR0hUID0gSEVJR0hUIC0gVUlfSEVJR0hUIC0gMTtcblxuZXhwb3J0IGNvbnN0IENPTE9SX0lOVklTSUJMRV9XQUxMID0gXCJibGFja1wiO1xuZXhwb3J0IGNvbnN0IENPTE9SX0RBUktfV0FMTCA9IFwicmdiKDIwLCAyMCwgMjApXCI7XG5leHBvcnQgY29uc3QgQ09MT1JfTElHSFRfV0FMTCA9IFwiIzM1MjYyMFwiO1xuZXhwb3J0IGNvbnN0IENPTE9SX0lOVklTSUJMRV9HUk9VTkQgPSBcImJsYWNrXCI7XG5leHBvcnQgY29uc3QgQ09MT1JfREFSS19HUk9VTkQgPSBcInJnYig1MCwgNTAsIDUwKVwiO1xuZXhwb3J0IGNvbnN0IENPTE9SX0xJR0hUX0dST1VORCA9IFwid2hpdGVcIjtcbmV4cG9ydCBjb25zdCBDT0xPUl9BTUJJRU5UX0xJR0hUID0gXCJyZ2IoNTAsIDUwLCA1MClcIjtcblxuZXhwb3J0IGNvbnN0IE1BUF9GSUxMRURfU1BBQ0UgPSBcIiNcIjtcbmV4cG9ydCBjb25zdCBNQVBfRU1QVFlfU1BBQ0UgPSBcIi5cIjtcblxuZXhwb3J0IGNvbnN0IExFVkVMX1VQX0JBU0UgPSA1MDtcbmV4cG9ydCBjb25zdCBMRVZFTF9VUF9GQUNUT1IgPSAxNTA7XG5cbi8qKlxuICogRGFtYWdlIHR5cGUgZW51bVxuICovXG5leHBvcnQgY29uc3QgRGFtYWdlVHlwZSA9IHtcbiAgICBwaHlzaWNhbDogMSxcbiAgICBmaXJlOiAyLFxuICAgIGxpZ2h0bmluZzogMyxcbiAgICBpY2U6IDQsXG4gICAgbmF0dXJlOiA1XG59O1xuT2JqZWN0LmZyZWV6ZShEYW1hZ2VUeXBlKTtcblxuLyoqXG4gKiBEYW1hZ2UgYWZmaW5pdHkgZGFtYWdlIG11bHRpcGxpZXJcbiAqL1xuZXhwb3J0IGNvbnN0IEFmZmluaXR5ID0ge1xuICAgIHdlYWs6IDAuNSxcbiAgICBub3JtYWw6IDEsXG4gICAgc3Ryb25nOiAyLFxuICAgIG51bGxpZmllZDogMFxufTtcbk9iamVjdC5mcmVlemUoQWZmaW5pdHkpO1xuXG5leHBvcnQgY29uc3QgVGlsZURhdGEgPSB7XG4gICAgOTAwOiB7XG4gICAgICAgIG5hbWU6IFwiZW1wdHkgZ3JvdW5kXCIsXG4gICAgICAgIGNoYXI6IFwiXCIsXG4gICAgICAgIGZnQ29sb3I6IENPTE9SX0xJR0hUX0dST1VORCxcbiAgICAgICAgYmdDb2xvcjogQ09MT1JfTElHSFRfR1JPVU5ELFxuICAgICAgICBmZ0NvbG9yRXhwbG9yZWQ6IENPTE9SX0RBUktfR1JPVU5ELFxuICAgICAgICBiZ0NvbG9yRXhwbG9yZWQ6IENPTE9SX0RBUktfR1JPVU5ELFxuICAgICAgICBibG9ja3M6IGZhbHNlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2UsXG4gICAgICAgIHJlZmxlY3Rpdml0eTogMC4xOFxuICAgIH0sXG4gICAgMTA0ODoge1xuICAgICAgICBuYW1lOiBcIkEgd2FsbFwiLFxuICAgICAgICBjaGFyOiBcIlwiLFxuICAgICAgICBmZ0NvbG9yOiBDT0xPUl9MSUdIVF9XQUxMLFxuICAgICAgICBiZ0NvbG9yOiBDT0xPUl9MSUdIVF9XQUxMLFxuICAgICAgICBmZ0NvbG9yRXhwbG9yZWQ6IENPTE9SX0RBUktfV0FMTCxcbiAgICAgICAgYmdDb2xvckV4cGxvcmVkOiBDT0xPUl9EQVJLX1dBTEwsXG4gICAgICAgIGJsb2NrczogdHJ1ZSxcbiAgICAgICAgYmxvY2tzU2lnaHQ6IHRydWUsXG4gICAgICAgIHJlZmxlY3Rpdml0eTogMC4xOFxuICAgIH0sXG4gICAgMTE2NToge1xuICAgICAgICBuYW1lOiBcIkEgdHJlZVwiLFxuICAgICAgICBjaGFyOiBcIlxcdTEyNzhcIixcbiAgICAgICAgZmdDb2xvcjogXCJsaWdodGdyZWVuXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiZGFya2dyZWVuXCIsXG4gICAgICAgIGZnQ29sb3JFeHBsb3JlZDogQ09MT1JfREFSS19XQUxMLFxuICAgICAgICBiZ0NvbG9yRXhwbG9yZWQ6IENPTE9SX0RBUktfV0FMTCxcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogdHJ1ZSxcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAwLjE4XG4gICAgfSxcbiAgICAyNzEwOiB7XG4gICAgICAgIG5hbWU6IFwiQSB0YWJsZVwiLFxuICAgICAgICBjaGFyOiBcIlxcdTAzQTBcIixcbiAgICAgICAgZmdDb2xvcjogXCJ0YW5cIixcbiAgICAgICAgYmdDb2xvcjogXCJicm93blwiLFxuICAgICAgICBmZ0NvbG9yRXhwbG9yZWQ6IENPTE9SX0RBUktfV0FMTCxcbiAgICAgICAgYmdDb2xvckV4cGxvcmVkOiBDT0xPUl9EQVJLX1dBTEwsXG4gICAgICAgIGJsb2NrczogdHJ1ZSxcbiAgICAgICAgYmxvY2tzU2lnaHQ6IGZhbHNlLFxuICAgICAgICByZWZsZWN0aXZpdHk6IDAuMThcbiAgICB9LFxuICAgIDI4Njk6IHtcbiAgICAgICAgbmFtZTogXCJBIGNoYWlyXCIsXG4gICAgICAgIGNoYXI6IFwiXFx1MDQzRlwiLFxuICAgICAgICBmZ0NvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiYnJvd25cIixcbiAgICAgICAgZmdDb2xvckV4cGxvcmVkOiBDT0xPUl9EQVJLX1dBTEwsXG4gICAgICAgIGJnQ29sb3JFeHBsb3JlZDogQ09MT1JfREFSS19XQUxMLFxuICAgICAgICBibG9ja3M6IHRydWUsXG4gICAgICAgIGJsb2Nrc1NpZ2h0OiBmYWxzZSxcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAwLjE4XG4gICAgfSxcbiAgICAyOTM2OiB7XG4gICAgICAgIG5hbWU6IFwiQSBjYWJpbmV0XCIsXG4gICAgICAgIGNoYXI6IFwiXFx1MjMzOVwiLFxuICAgICAgICBmZ0NvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiYnJvd25cIixcbiAgICAgICAgZmdDb2xvckV4cGxvcmVkOiBDT0xPUl9EQVJLX1dBTEwsXG4gICAgICAgIGJnQ29sb3JFeHBsb3JlZDogQ09MT1JfREFSS19XQUxMLFxuICAgICAgICBibG9ja3M6IHRydWUsXG4gICAgICAgIGJsb2Nrc1NpZ2h0OiBmYWxzZSxcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAwLjE4XG4gICAgfVxufTtcbk9iamVjdC5mcmVlemUoVGlsZURhdGEpO1xuXG5leHBvcnQgY29uc3QgT2JqZWN0RGF0YSA9IHtcbiAgICBcImRvb3JcIjoge1xuICAgICAgICBuYW1lOiBcIkRvb3JcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgYWk6IG51bGwsXG4gICAgICAgIGludmVudG9yeTogbnVsbCxcbiAgICAgICAgZmlnaHRlcjogbnVsbCxcbiAgICAgICAgaW50ZXJhY3RhYmxlOiBcImRvb3JfaW50ZXJhY3RhYmxlXCIsXG4gICAgICAgIGNoYXI6IFwiXFx1MTg4MlwiLFxuICAgICAgICBmZ0NvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiYnJvd25cIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogdHJ1ZVxuICAgIH0sXG4gICAgXCJsb2FkX2Rvb3JcIjoge1xuICAgICAgICBuYW1lOiBcIkRvb3IgdG8gbmV3IGFyZWFcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiZHJhd19hZnRlcl9zZWVuXCIsXG4gICAgICAgIGFpOiBudWxsLFxuICAgICAgICBpbnZlbnRvcnk6IG51bGwsXG4gICAgICAgIGZpZ2h0ZXI6IG51bGwsXG4gICAgICAgIGludGVyYWN0YWJsZTogXCJsb2FkX2xldmVsX2ludGVyYWN0YWJsZVwiLFxuICAgICAgICBjaGFyOiBcIlxcdTE4ODJcIixcbiAgICAgICAgZmdDb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICBiZ0NvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgIGJsb2NrczogdHJ1ZSxcbiAgICAgICAgYmxvY2tzU2lnaHQ6IHRydWVcbiAgICB9LFxuICAgIFwic3RhaXJzXCI6IHtcbiAgICAgICAgbmFtZTogXCJTdGFpcnNcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiZHJhd19hZnRlcl9zZWVuXCIsXG4gICAgICAgIGFpOiBudWxsLFxuICAgICAgICBpbnZlbnRvcnk6IG51bGwsXG4gICAgICAgIGZpZ2h0ZXI6IG51bGwsXG4gICAgICAgIGludGVyYWN0YWJsZTogXCJsb2FkX2xldmVsX2ludGVyYWN0YWJsZVwiLFxuICAgICAgICBjaGFyOiBcIlxcdTE3NTBcIixcbiAgICAgICAgZmdDb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICBiZ0NvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgIGJsb2NrczogdHJ1ZSxcbiAgICAgICAgYmxvY2tzU2lnaHQ6IGZhbHNlXG4gICAgfSxcbiAgICBcImNoZXN0XCI6IHtcbiAgICAgICAgbmFtZTogXCJDaGVzdFwiLFxuICAgICAgICBncmFwaGljczogXCJkcmF3X2FmdGVyX3NlZW5cIixcbiAgICAgICAgYWk6IFwiY2hlc3RfYWlcIixcbiAgICAgICAgZmlnaHRlcjogbnVsbCxcbiAgICAgICAgaW52ZW50b3J5OiBcImJhc2ljX2ludmVudG9yeVwiLFxuICAgICAgICBpbnRlcmFjdGFibGU6IFwiZ2l2ZV9pdGVtc19pbnRlcmFjdGFibGVcIixcbiAgICAgICAgY2hhcjogXCIqXCIsXG4gICAgICAgIGZnQ29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgYmdDb2xvcjogXCJicm93blwiLFxuICAgICAgICBlbXB0eUNvbG9yOiBcInB1cnBsZVwiLFxuICAgICAgICBibG9ja3M6IHRydWUsXG4gICAgICAgIGJsb2Nrc1NpZ2h0OiBmYWxzZVxuICAgIH0sXG4gICAgXCJjcmF0ZVwiOiB7XG4gICAgICAgIG5hbWU6IFwiV29vZGVuIENyYXRlXCIsXG4gICAgICAgIGdyYXBoaWNzOiBcImJhc2ljX2dyYXBoaWNzXCIsXG4gICAgICAgIGFpOiBudWxsLFxuICAgICAgICBmaWdodGVyOiBcImJhc2ljX2ZpZ2h0ZXJcIixcbiAgICAgICAgaW52ZW50b3J5OiBcImJhc2ljX2ludmVudG9yeVwiLFxuICAgICAgICBpbnRlcmFjdGFibGU6IG51bGwsXG4gICAgICAgIGNoYXI6IFwiXFx1MjYxMlwiLFxuICAgICAgICBmZ0NvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiYnJvd25cIixcbiAgICAgICAgZW1wdHlDb2xvcjogXCJwdXJwbGVcIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2UsXG4gICAgICAgIGV4cGVyaWVuY2U6IDAsXG4gICAgICAgIGV4cGVyaWVuY2VHaXZlbjogMCxcbiAgICAgICAgbWF4SHA6IDUsXG4gICAgICAgIHN0cmVuZ3RoOiAwLFxuICAgICAgICBkZWZlbnNlOiAwLFxuICAgICAgICBvbkRlYXRoOiBcInJlbW92ZUZyb21Xb3JsZFwiXG4gICAgfSxcbiAgICBcImxhbnRlcm5cIjoge1xuICAgICAgICBuYW1lOiBcIlNtYWxsIExhbnRlcm5cIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgbGlnaHRpbmc6IFwicmVmbGVjdGl2aXR5XCIsXG4gICAgICAgIGxpZ2h0aW5nQ29sb3I6IFwieWVsbG93XCIsXG4gICAgICAgIGxpZ2h0aW5nUmFuZ2U6IDQsXG4gICAgICAgIGFpOiBudWxsLFxuICAgICAgICBmaWdodGVyOiBudWxsLFxuICAgICAgICBpbnZlbnRvcnk6IG51bGwsXG4gICAgICAgIGludGVyYWN0YWJsZTogbnVsbCxcbiAgICAgICAgY2hhcjogXCJcXHUxNkUxXCIsXG4gICAgICAgIGZnQ29sb3I6IFwiYmxhY2tcIixcbiAgICAgICAgYmdDb2xvcjogXCJ5ZWxsb3dcIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2VcbiAgICB9LFxuICAgIFwiY2FtcGZpcmVcIjoge1xuICAgICAgICBuYW1lOiBcIlNtYWxsIEZpcmVcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgbGlnaHRpbmc6IFwicmVmbGVjdGl2aXR5XCIsXG4gICAgICAgIGxpZ2h0aW5nQ29sb3I6IFwib3JhbmdlXCIsXG4gICAgICAgIGxpZ2h0aW5nUmFuZ2U6IDYsXG4gICAgICAgIGFpOiBudWxsLFxuICAgICAgICBmaWdodGVyOiBudWxsLFxuICAgICAgICBpbnZlbnRvcnk6IG51bGwsXG4gICAgICAgIGludGVyYWN0YWJsZTogbnVsbCxcbiAgICAgICAgY2hhcjogXCJcXHUwNDM2XCIsXG4gICAgICAgIGZnQ29sb3I6IFwiYmxhY2tcIixcbiAgICAgICAgYmdDb2xvcjogXCJvcmFuZ2VcIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2VcbiAgICB9LFxuICAgIFwiZHJvcHBlZF9pdGVtXCI6IHtcbiAgICAgICAgbmFtZTogXCJEcm9wcGVkIEl0ZW1cIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgYWk6IFwiZHJvcHBlZF9pdGVtX2FpXCIsXG4gICAgICAgIGludmVudG9yeTogbnVsbCxcbiAgICAgICAgZmlnaHRlcjogbnVsbCxcbiAgICAgICAgaW50ZXJhY3RhYmxlOiBcImdpdmVfaXRlbXNfaW50ZXJhY3RhYmxlXCIsXG4gICAgICAgIGNoYXI6IFwiIVwiLFxuICAgICAgICBmZ0NvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiYnJvd25cIixcbiAgICAgICAgYmxvY2tzOiBmYWxzZSxcbiAgICAgICAgYmxvY2tzU2lnaHQ6IGZhbHNlXG4gICAgfSxcbiAgICBcIm1hZ2ljX3NocmluZVwiOiB7XG4gICAgICAgIG5hbWU6IFwiTWFnaWNrYSBTaHJpbmVcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgYWk6IG51bGwsXG4gICAgICAgIGZpZ2h0ZXI6IG51bGwsXG4gICAgICAgIGludGVyYWN0YWJsZTogXCJnaXZlX3NwZWxsX2ludGVyYWN0YWJsZVwiLFxuICAgICAgICBjaGFyOiBcIlxcdTA2REVcIixcbiAgICAgICAgZmdDb2xvcjogXCJibGFja1wiLFxuICAgICAgICBiZ0NvbG9yOiBcImdvbGRcIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2VcbiAgICB9LFxuICAgIFwicGxheWVyXCI6IHtcbiAgICAgICAgbmFtZTogXCJUaGUgUGxheWVyXCIsXG4gICAgICAgIGdyYXBoaWNzOiBcImJhc2ljX2dyYXBoaWNzXCIsXG4gICAgICAgIGxpZ2h0aW5nOiBcInBsYXllcl9saWdodGluZ1wiLFxuICAgICAgICBsaWdodGluZ0NvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgIGxpZ2h0aW5nUmFuZ2U6IDcsXG4gICAgICAgIGFpOiBcInBsYXllcl9jb250cm9sX2FpXCIsXG4gICAgICAgIGludmVudG9yeTogXCJiYXNpY19pbnZlbnRvcnlcIixcbiAgICAgICAgZmlnaHRlcjogXCJiYXNpY19maWdodGVyXCIsXG4gICAgICAgIGludGVyYWN0YWJsZTogbnVsbCxcbiAgICAgICAgY2hhcjogXCJAXCIsXG4gICAgICAgIGZnQ29sb3I6IFwiYmx1ZVwiLFxuICAgICAgICBibG9ja3M6IHRydWUsXG4gICAgICAgIGJsb2Nrc1NpZ2h0OiBmYWxzZSxcbiAgICAgICAgYmdDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgZXhwZXJpZW5jZTogMCxcbiAgICAgICAgZXhwZXJpZW5jZUdpdmVuOiAwLFxuICAgICAgICBtYXhIcDogMTAwLFxuICAgICAgICBtYXhNYW5hOiAxMDAsXG4gICAgICAgIHN0cmVuZ3RoOiAzLFxuICAgICAgICBkZWZlbnNlOiAxLFxuICAgICAgICBkYW1hZ2VBZmZpbml0eToge1xuICAgICAgICAgICAgW0RhbWFnZVR5cGUucGh5c2ljYWxdOiBBZmZpbml0eS5ub3JtYWwsXG4gICAgICAgICAgICBbRGFtYWdlVHlwZS5maXJlXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUubGlnaHRuaW5nXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUuaWNlXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUubmF0dXJlXTogQWZmaW5pdHkubm9ybWFsXG4gICAgICAgIH0sXG4gICAgICAgIG9uRGVhdGg6IFwiZGVmYXVsdFwiXG4gICAgfSxcbiAgICBcImdvYmxpblwiOiB7XG4gICAgICAgIG5hbWU6IFwiR29ibGluXCIsXG4gICAgICAgIGdyYXBoaWNzOiBcImJhc2ljX2dyYXBoaWNzXCIsXG4gICAgICAgIGFpOiBcImJhc2ljX21vbnN0ZXJfYWlcIixcbiAgICAgICAgZmlnaHRlcjogXCJiYXNpY19maWdodGVyXCIsXG4gICAgICAgIGludmVudG9yeTogXCJiYXNpY19pbnZlbnRvcnlcIixcbiAgICAgICAgaW50ZXJhY3RhYmxlOiBudWxsLFxuICAgICAgICBjaGFyOiBcIkdcIixcbiAgICAgICAgZmdDb2xvcjogXCJncmVlblwiLFxuICAgICAgICBiZ0NvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgIGJsb2NrczogdHJ1ZSxcbiAgICAgICAgYmxvY2tzU2lnaHQ6IGZhbHNlLFxuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgZXhwZXJpZW5jZTogMCxcbiAgICAgICAgZXhwZXJpZW5jZUdpdmVuOiA1MCxcbiAgICAgICAgbWF4SHA6IDMwLFxuICAgICAgICBtYXhNYW5hOiAwLFxuICAgICAgICBzdHJlbmd0aDogMyxcbiAgICAgICAgZGVmZW5zZTogMSxcbiAgICAgICAgc2lnaHRSYW5nZTogNyxcbiAgICAgICAgZGFtYWdlQWZmaW5pdHk6IHtcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLnBoeXNpY2FsXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUuZmlyZV06IEFmZmluaXR5Lm5vcm1hbCxcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLmxpZ2h0bmluZ106IEFmZmluaXR5Lm5vcm1hbCxcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLmljZV06IEFmZmluaXR5Lm5vcm1hbCxcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLm5hdHVyZV06IEFmZmluaXR5Lm5vcm1hbFxuICAgICAgICB9LFxuICAgICAgICBpbnZlbnRvcnlQb29sOiBbXG4gICAgICAgICAgICBbXCJoZWFsdGhfcG90aW9uX3dlYWtcIiwgMC4yNV1cbiAgICAgICAgXSxcbiAgICAgICAgb25EZWF0aDogXCJkZWZhdWx0XCJcbiAgICB9LFxuICAgIFwiZ29ibGluX2JydXRlXCI6IHtcbiAgICAgICAgbmFtZTogXCJHb2JsaW4gQnJ1dGVcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgYWk6IFwicGF0cm9sbGluZ19tb25zdGVyX2FpXCIsXG4gICAgICAgIGZpZ2h0ZXI6IFwiYmFzaWNfZmlnaHRlclwiLFxuICAgICAgICBpbnZlbnRvcnk6IFwiYmFzaWNfaW52ZW50b3J5XCIsXG4gICAgICAgIGludGVyYWN0YWJsZTogbnVsbCxcbiAgICAgICAgY2hhcjogXCJHXCIsXG4gICAgICAgIGZnQ29sb3I6IFwiZ3JlZW5cIixcbiAgICAgICAgYmdDb2xvcjogXCJyZWRcIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2UsXG4gICAgICAgIGxldmVsOiAxMCxcbiAgICAgICAgZXhwZXJpZW5jZTogMCxcbiAgICAgICAgZXhwZXJpZW5jZUdpdmVuOiA1MDAsXG4gICAgICAgIG1heEhwOiAxMDAsXG4gICAgICAgIG1heE1hbmE6IDAsXG4gICAgICAgIHN0cmVuZ3RoOiA3LFxuICAgICAgICBkZWZlbnNlOiA0LFxuICAgICAgICBzaWdodFJhbmdlOiA3LFxuICAgICAgICBkYW1hZ2VBZmZpbml0eToge1xuICAgICAgICAgICAgW0RhbWFnZVR5cGUucGh5c2ljYWxdOiBBZmZpbml0eS5ub3JtYWwsXG4gICAgICAgICAgICBbRGFtYWdlVHlwZS5maXJlXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUubGlnaHRuaW5nXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUuaWNlXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUubmF0dXJlXTogQWZmaW5pdHkubm9ybWFsXG4gICAgICAgIH0sXG4gICAgICAgIGludmVudG9yeVBvb2w6IFtcbiAgICAgICAgICAgIFtcImhlYWx0aF9wb3Rpb25fd2Vha1wiLCAwLjI1XSxcbiAgICAgICAgICAgIFtcImhlYWx0aF9wb3Rpb25cIiwgMC4xXVxuICAgICAgICBdLFxuICAgICAgICBvbkRlYXRoOiBcImRlZmF1bHRcIlxuICAgIH0sXG4gICAgXCJyYXRcIjoge1xuICAgICAgICBuYW1lOiBcIlJhdFwiLFxuICAgICAgICBncmFwaGljczogXCJiYXNpY19ncmFwaGljc1wiLFxuICAgICAgICBhaTogXCJiYXNpY19tb25zdGVyX2FpXCIsXG4gICAgICAgIGZpZ2h0ZXI6IFwiYmFzaWNfZmlnaHRlclwiLFxuICAgICAgICBpbnZlbnRvcnk6IFwiYmFzaWNfaW52ZW50b3J5XCIsXG4gICAgICAgIGludGVyYWN0YWJsZTogbnVsbCxcbiAgICAgICAgY2hhcjogXCJyXCIsXG4gICAgICAgIGZnQ29sb3I6IFwiYnJvd25cIixcbiAgICAgICAgYmdDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICBibG9ja3M6IHRydWUsXG4gICAgICAgIGJsb2Nrc1NpZ2h0OiBmYWxzZSxcbiAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgIGV4cGVyaWVuY2U6IDAsXG4gICAgICAgIGV4cGVyaWVuY2VHaXZlbjogMTAsXG4gICAgICAgIG1heEhwOiAxMCxcbiAgICAgICAgbWF4TWFuYTogMCxcbiAgICAgICAgc3RyZW5ndGg6IDIsXG4gICAgICAgIGRlZmVuc2U6IDEsXG4gICAgICAgIHNpZ2h0UmFuZ2U6IDcsXG4gICAgICAgIGRhbWFnZUFmZmluaXR5OiB7XG4gICAgICAgICAgICBbRGFtYWdlVHlwZS5waHlzaWNhbF06IEFmZmluaXR5Lm5vcm1hbCxcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLmZpcmVdOiBBZmZpbml0eS5ub3JtYWwsXG4gICAgICAgICAgICBbRGFtYWdlVHlwZS5saWdodG5pbmddOiBBZmZpbml0eS5ub3JtYWwsXG4gICAgICAgICAgICBbRGFtYWdlVHlwZS5pY2VdOiBBZmZpbml0eS5ub3JtYWwsXG4gICAgICAgICAgICBbRGFtYWdlVHlwZS5uYXR1cmVdOiBBZmZpbml0eS5ub3JtYWxcbiAgICAgICAgfSxcbiAgICAgICAgaW52ZW50b3J5UG9vbDogW10sXG4gICAgICAgIG9uRGVhdGg6IFwiZGVmYXVsdFwiXG4gICAgfSxcbn07XG5PYmplY3QuZnJlZXplKE9iamVjdERhdGEpO1xuXG5leHBvcnQgY29uc3QgSXRlbURhdGEgPSB7XG4gICAgXCJoZWFsdGhfcG90aW9uX3dlYWtcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJXZWFrIEhlYWx0aCBQb3Rpb25cIixcbiAgICAgICAgdmFsdWU6IDI1LFxuICAgICAgICB0eXBlOiBcImhlYWx0aFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0SGVhbFxuICAgIH0sXG4gICAgXCJoZWFsdGhfcG90aW9uXCI6IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwiSGVhbHRoIFBvdGlvblwiLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICAgIHR5cGU6IFwiaGVhbHRoXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3RIZWFsXG4gICAgfSxcbiAgICBcImhlYWx0aF9wb3Rpb25fc3Ryb25nXCI6IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwiSGVhbHRoIFBvdGlvblwiLFxuICAgICAgICB2YWx1ZTogMTAwLFxuICAgICAgICB0eXBlOiBcImhlYWx0aFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0SGVhbFxuICAgIH0sXG4gICAgXCJsaWdodG5pbmdfc2Nyb2xsX3dlYWtcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJXZWFrIFNjcm9sbCBvZiBMaWdodG5pbmdcIixcbiAgICAgICAgdmFsdWU6IDIwLFxuICAgICAgICB0eXBlOiBcImRhbWFnZV9zY3JvbGxcIixcbiAgICAgICAgdXNlRnVuYzogY2FzdERhbWFnZVNwZWxsLFxuICAgICAgICBkYW1hZ2VUeXBlOiBEYW1hZ2VUeXBlLmxpZ2h0bmluZ1xuICAgIH0sXG4gICAgXCJsaWdodG5pbmdfc2Nyb2xsXCI6IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsIG9mIExpZ2h0bmluZ1wiLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICAgIHR5cGU6IFwiZGFtYWdlX3Njcm9sbFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0RGFtYWdlU3BlbGwsXG4gICAgICAgIGRhbWFnZVR5cGU6IERhbWFnZVR5cGUubGlnaHRuaW5nXG4gICAgfSxcbiAgICBcImxpZ2h0bmluZ19zY3JvbGxfc3Ryb25nXCI6IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwiU3Ryb25nIFNjcm9sbCBvZiBMaWdodG5pbmdcIixcbiAgICAgICAgdmFsdWU6IDEwMCxcbiAgICAgICAgdHlwZTogXCJkYW1hZ2Vfc2Nyb2xsXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3REYW1hZ2VTcGVsbCxcbiAgICAgICAgZGFtYWdlVHlwZTogRGFtYWdlVHlwZS5saWdodG5pbmdcbiAgICB9LFxuICAgIFwiZmlyZWJhbGxfc2Nyb2xsX3dlYWtcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJXZWFrIFNjcm9sbCBvZiBGaXJlXCIsXG4gICAgICAgIHZhbHVlOiAyMCxcbiAgICAgICAgdHlwZTogXCJkYW1hZ2Vfc2Nyb2xsXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3REYW1hZ2VTcGVsbCxcbiAgICAgICAgZGFtYWdlVHlwZTogRGFtYWdlVHlwZS5maXJlLFxuICAgICAgICBzdGF0dXNFZmZlY3RGdW5jOiBjcmVhdGVCdXJuRWZmZWN0XG4gICAgfSxcbiAgICBcImZpcmViYWxsX3Njcm9sbFwiOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbCBvZiBGaXJlXCIsXG4gICAgICAgIHZhbHVlOiA1MCxcbiAgICAgICAgdHlwZTogXCJkYW1hZ2Vfc2Nyb2xsXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3REYW1hZ2VTcGVsbCxcbiAgICAgICAgZGFtYWdlVHlwZTogRGFtYWdlVHlwZS5maXJlLFxuICAgICAgICBzdGF0dXNFZmZlY3RGdW5jOiBjcmVhdGVCdXJuRWZmZWN0XG4gICAgfSxcbiAgICBcImZpcmViYWxsX3Njcm9sbF9zdHJvbmdcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJTdHJvbmcgU2Nyb2xsIG9mIEZpcmVcIixcbiAgICAgICAgdmFsdWU6IDEwMCxcbiAgICAgICAgdHlwZTogXCJkYW1hZ2Vfc2Nyb2xsXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3REYW1hZ2VTcGVsbCxcbiAgICAgICAgZGFtYWdlVHlwZTogRGFtYWdlVHlwZS5maXJlLFxuICAgICAgICBzdGF0dXNFZmZlY3RGdW5jOiBjcmVhdGVCdXJuRWZmZWN0XG4gICAgfSxcbiAgICBcImxpZ2h0bmluZ19zY3JvbGxfd2Vha193aWxkXCI6IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwiV2VhayBTY3JvbGwgb2YgV2lsZCBMaWdodG5pbmdcIixcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgICB0eXBlOiBcIndpbGRfZGFtYWdlX3Njcm9sbFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0V2lsZERhbWFnZVNwZWxsLFxuICAgICAgICBkYW1hZ2VUeXBlOiBEYW1hZ2VUeXBlLmxpZ2h0bmluZ1xuICAgIH0sXG4gICAgXCJsaWdodG5pbmdfc2Nyb2xsX3dpbGRcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGwgb2YgV2lsZCBMaWdodG5pbmdcIixcbiAgICAgICAgdmFsdWU6IDEwMCxcbiAgICAgICAgdHlwZTogXCJ3aWxkX2RhbWFnZV9zY3JvbGxcIixcbiAgICAgICAgdXNlRnVuYzogY2FzdFdpbGREYW1hZ2VTcGVsbCxcbiAgICAgICAgZGFtYWdlVHlwZTogRGFtYWdlVHlwZS5saWdodG5pbmdcbiAgICB9LFxuICAgIFwibGlnaHRuaW5nX3Njcm9sbF9zdHJvbmdfd2lsZFwiOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIlN0cm9uZyBTY3JvbGwgb2YgV2lsZCBMaWdodG5pbmdcIixcbiAgICAgICAgdmFsdWU6IDE1MCxcbiAgICAgICAgdHlwZTogXCJ3aWxkX2RhbWFnZV9zY3JvbGxcIixcbiAgICAgICAgdXNlRnVuYzogY2FzdFdpbGREYW1hZ2VTcGVsbCxcbiAgICAgICAgZGFtYWdlVHlwZTogRGFtYWdlVHlwZS5saWdodG5pbmdcbiAgICB9LFxuICAgIFwiZmlyZWJhbGxfc2Nyb2xsX3dlYWtfd2lsZFwiOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIldlYWsgU2Nyb2xsIG9mIFdpbGQgRmlyZVwiLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICAgIHR5cGU6IFwid2lsZF9kYW1hZ2Vfc2Nyb2xsXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3RXaWxkRGFtYWdlU3BlbGwsXG4gICAgICAgIGRhbWFnZVR5cGU6IERhbWFnZVR5cGUuZmlyZSxcbiAgICAgICAgc3RhdHVzRWZmZWN0RnVuYzogY3JlYXRlQnVybkVmZmVjdFxuICAgIH0sXG4gICAgXCJmaXJlYmFsbF9zY3JvbGxfd2lsZFwiOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbCBvZiBXaWxkIEZpcmVcIixcbiAgICAgICAgdmFsdWU6IDEwMCxcbiAgICAgICAgdHlwZTogXCJ3aWxkX2RhbWFnZV9zY3JvbGxcIixcbiAgICAgICAgdXNlRnVuYzogY2FzdFdpbGREYW1hZ2VTcGVsbCxcbiAgICAgICAgZGFtYWdlVHlwZTogRGFtYWdlVHlwZS5maXJlLFxuICAgICAgICBzdGF0dXNFZmZlY3RGdW5jOiBjcmVhdGVCdXJuRWZmZWN0XG4gICAgfSxcbiAgICBcImZpcmViYWxsX3Njcm9sbF9zdHJvbmdfd2lsZFwiOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIlN0cm9uZyBTY3JvbGwgb2YgV2lsZCBGaXJlXCIsXG4gICAgICAgIHZhbHVlOiAxNTAsXG4gICAgICAgIHR5cGU6IFwid2lsZF9kYW1hZ2Vfc2Nyb2xsXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3RXaWxkRGFtYWdlU3BlbGwsXG4gICAgICAgIGRhbWFnZVR5cGU6IERhbWFnZVR5cGUuZmlyZSxcbiAgICAgICAgc3RhdHVzRWZmZWN0RnVuYzogY3JlYXRlQnVybkVmZmVjdFxuICAgIH0sXG4gICAgXCJjb25mdXNlX3Njcm9sbFwiOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbCBvZiBDb25mdXNlIEVuZW15XCIsXG4gICAgICAgIHZhbHVlOiA4LFxuICAgICAgICB0eXBlOiBcImNvbmZ1c2Vfc2Nyb2xsXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3RDb25mdXNlXG4gICAgfSxcbiAgICBcImNsYWlydm95YW5jZV9zY3JvbGxcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGwgb2YgQ2xhaXJ2b3lhbmNlXCIsXG4gICAgICAgIHR5cGU6IFwiY2xhaXJ2b3lhbmNlX3Njcm9sbFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0Q2xhaXJ2b3lhbmNlXG4gICAgfVxufTtcbk9iamVjdC5mcmVlemUoSXRlbURhdGEpO1xuXG5leHBvcnQgY29uc3QgU3BlbGxEYXRhID0ge1xuICAgIFwibGlnaHRuaW5nX2JvbHRcIjoge1xuICAgICAgICBuYW1lOiBcIkxpZ2h0bmluZyBCb2x0XCIsXG4gICAgICAgIG1hbmFDb3N0OiA1MCxcbiAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgICB1c2VGdW5jOiBjYXN0RGFtYWdlU3BlbGxcbiAgICB9XG59O1xuT2JqZWN0LmZyZWV6ZShTcGVsbERhdGEpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBnbG9iYWxzIGZyb20gXCIuL2dsb2JhbHNcIjtcblxuY2xhc3MgRWZmZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihvd25lciwgbmFtZSwgdHVybnMsIGFjdENhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50dXJucyA9IHR1cm5zO1xuICAgICAgICB0aGlzLmFjdENhbGxiYWNrID0gYWN0Q2FsbGJhY2s7XG4gICAgfVxuXG4gICAgYWN0KCkge1xuICAgICAgICB0aGlzLmFjdENhbGxiYWNrKHRoaXMub3duZXIsIHRoaXMubmFtZSk7XG4gICAgICAgIHRoaXMudHVybnMtLTtcbiAgICB9XG59XG5leHBvcnQgeyBFZmZlY3QgfTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRWZmZWN0IG9mIGFwcGx5aW5nIGRhbWFnZSBvdmVyIHRpbWVcbiAqIEBwYXJhbSAge0dhbWVPYmplY3R9IHZpY3RpbSAgICAgV2hvIHRvIGFwcGx5IHRoZSBlZmZlY3QgdG9cbiAqIEBwYXJhbSAge051bWJlcn0gZGFtYWdlICAgICAgICAgVGhlIGFtb3VudCBvZiBkYW1hZ2UgdG8gZ2l2ZSBlYWNoIHR1cm5cbiAqIEBwYXJhbSAge051bWJlcn0gdHVybnMgICAgICAgICAgVGhlIG51bWJlciBvZiB0dXJucyB0byBsYXN0XG4gKiBAcmV0dXJuIHtFZmZlY3R9ICAgICAgICAgICAgICAgIFRoZSByZXN1bHRpbmcgZWZmZWN0IG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnVybkVmZmVjdCh2aWN0aW0sIGRhbWFnZSwgdHVybnMpIHtcbiAgICBmdW5jdGlvbiBhY3Qob3duZXIpIHtcbiAgICAgICAgaWYgKG93bmVyLmZpZ2h0ZXIpIHtcbiAgICAgICAgICAgIG93bmVyLmZpZ2h0ZXIudGFrZURhbWFnZShudWxsLCBkYW1hZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG93bmVyID09PSBnbG9iYWxzLkdhbWUucGxheWVyKSB7XG4gICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJZb3Ugd2VyZSBodXJ0IGJ5IHRoZSBidXJuIGZvciBcIiArIGRhbWFnZSArIFwiIGRhbWFnZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShvd25lci5uYW1lICsgXCIgd2FzIGh1cnQgYnkgdGhlIGJ1cm4gZm9yIFwiICsgZGFtYWdlICsgXCIgZGFtYWdlXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBFZmZlY3QodmljdGltLCBcIkJ1cm5cIiwgdHVybnMsIGFjdCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUk5HIH0gZnJvbSBcInJvdC1qc1wiO1xuXG5pbXBvcnQgeyBMRVZFTF9VUF9CQVNFLCBMRVZFTF9VUF9GQUNUT1IgfSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiLi9nbG9iYWxzXCI7XG5cbi8qKlxuICogQ29tcG9uZW50IHdoaWNoIGNvbnRyb2xzIHRoZSBjb21iYXQgaW5mb3JtYXRpb24gYW5kIGludGVyYWN0aW9uXG4gKiBiZXR3ZWVuIGRpZmZlcmVudCBmaWdodGVyc1xuICovXG5jbGFzcyBCYXNpY0ZpZ2h0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGRlYXRoQ2FsbGJhY2s9bnVsbCkge1xuICAgICAgICB0aGlzLmhwID0gZGF0YS5tYXhIcDtcbiAgICAgICAgdGhpcy5tYXhIcCA9IGRhdGEubWF4SHA7XG4gICAgICAgIHRoaXMubWFuYSA9IGRhdGEubWF4TWFuYTtcbiAgICAgICAgdGhpcy5tYXhNYW5hID0gZGF0YS5tYXhNYW5hO1xuXG4gICAgICAgIHRoaXMuc3RyZW5ndGggPSBkYXRhLnN0cmVuZ3RoO1xuICAgICAgICB0aGlzLmRlZmVuc2UgPSBkYXRhLmRlZmVuc2U7XG4gICAgICAgIHRoaXMuZGVhdGhDYWxsYmFjayA9IGRlYXRoQ2FsbGJhY2s7XG4gICAgICAgIHRoaXMub3duZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGRhdGEuZXhwZXJpZW5jZTtcbiAgICAgICAgdGhpcy5leHBlcmllbmNlR2l2ZW4gPSBkYXRhLmV4cGVyaWVuY2VHaXZlbjtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGRhdGEubGV2ZWw7XG5cbiAgICAgICAgdGhpcy5jcml0aWNhbENoYW5jZSA9IDAuMDU7XG4gICAgICAgIHRoaXMuY3JpdGljYWxEYW1hZ2VNdWx0aXBsZXIgPSAxLjU7XG5cbiAgICAgICAgdGhpcy5zdGF0dXNFZmZlY3RzID0gW107XG4gICAgICAgIHRoaXMuYWlsbWVudFN1c2NlcHRpYmlsaXR5ID0gZGF0YS5haWxtZW50U3VzY2VwdGliaWxpdHk7XG5cbiAgICAgICAgdGhpcy5rbm93blNwZWxscyA9IG5ldyBTZXQoKTtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgYWN0KCkge1xuICAgICAgICBjb25zdCBsZXZlbFVwRVhQID0gTEVWRUxfVVBfQkFTRSArICh0aGlzLmxldmVsICogTEVWRUxfVVBfRkFDVE9SKTtcbiAgICAgICAgaWYgKHRoaXMuZXhwZXJpZW5jZSA+PSBsZXZlbFVwRVhQKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsICs9IDE7XG4gICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UgPSAwO1xuICAgICAgICAgICAgdGhpcy5ocCA9IHRoaXMubWF4SHA7XG4gICAgICAgICAgICB0aGlzLnN0cmVuZ3RoKys7XG4gICAgICAgICAgICBpZiAodGhpcy5vd25lciA9PT0gZ2xvYmFscy5HYW1lLnBsYXllcikge1xuICAgICAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShcIllvdSByZWFjaGVkIGxldmVsIFwiICsgdGhpcy5sZXZlbCArIFwiIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXR1c0VmZmVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXR1c0VmZmVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlZmZlY3QgPSB0aGlzLnN0YXR1c0VmZmVjdHNbaV07XG4gICAgICAgICAgICAgICAgZWZmZWN0LmFjdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVmZmVjdC50dXJucyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoYCR7dGhpcy5vd25lci5uYW1lfSByZWNvdmVyZWQgZnJvbSBpdHMgJHtlZmZlY3QubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNFZmZlY3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0YWtlRGFtYWdlKGF0dGFja2VyLCBkYW1hZ2UpIHtcbiAgICAgICAgaWYgKGRhbWFnZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaHAgLT0gZGFtYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgYXR0YWNrZXIuZmlnaHRlci5leHBlcmllbmNlICs9IHRoaXMuZXhwZXJpZW5jZUdpdmVuO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kZWF0aENhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWF0aENhbGxiYWNrKHRoaXMub3duZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXR0YWNrKHRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldC5maWdodGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBkYW1hZ2UgPSBNYXRoLnJvdW5kKE1hdGgubWF4KDEsIHRoaXMuc3RyZW5ndGggLSB0YXJnZXQuZmlnaHRlci5kZWZlbnNlKSk7XG4gICAgICAgIGxldCBjcml0aWNhbCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChSTkcuZ2V0VW5pZm9ybSgpIDw9IHRoaXMuY3JpdGljYWxDaGFuY2UpIHtcbiAgICAgICAgICAgIGRhbWFnZSA9IE1hdGguY2VpbChkYW1hZ2UgKiB0aGlzLmNyaXRpY2FsRGFtYWdlTXVsdGlwbGVyKTtcbiAgICAgICAgICAgIGNyaXRpY2FsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYW1hZ2UgPiAwKSB7XG4gICAgICAgICAgICBpZiAoY3JpdGljYWwpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJDUklUSUNBTCEgXCIgKyB0aGlzLm93bmVyLm5hbWUgKyBcIiBhdHRhY2tzIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiBmb3IgXCIgKyBkYW1hZ2UgKyBcIiBkYW1hZ2UuXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UodGhpcy5vd25lci5uYW1lICsgXCIgYXR0YWNrcyBcIiArIHRhcmdldC5uYW1lICsgXCIgZm9yIFwiICsgZGFtYWdlICsgXCIgZGFtYWdlLlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFyZ2V0LmZpZ2h0ZXIudGFrZURhbWFnZSh0aGlzLm93bmVyLCBkYW1hZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKHRoaXMub3duZXIubmFtZSArIFwiIGF0dGFja3MgXCIgKyB0YXJnZXQubmFtZSArIFwiLCBidXQgaXQncyB0b28gd2VhayFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoZWFsKGFtb3VudCkge1xuICAgICAgICB0aGlzLmhwICs9IGFtb3VudDtcbiAgICAgICAgaWYgKHRoaXMuaHAgPiB0aGlzLm1heEhwKSB7XG4gICAgICAgICAgICB0aGlzLmhwID0gdGhpcy5tYXhIcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVzZU1hbmEoY29zdCkge1xuICAgICAgICB0aGlzLm1hbmEgPSBNYXRoLm1heCh0aGlzLm1hbmEgLSBjb3N0LCAwKTtcbiAgICB9XG5cbiAgICBhZGRTdGF0dXNFZmZlY3QoZWZmZWN0KSB7XG4gICAgICAgIHRoaXMuc3RhdHVzRWZmZWN0cy5wdXNoKGVmZmVjdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgc3BlbGwgdG8gdGhlIHNldCBvZiBrbm93biBzcGVsbHMgYnkgdGhpc1xuICAgICAqIGZpZ2h0ZXIuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkIEEgc3BlbGwgaWRcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gSWYgdGhlIHNwZWxsIHdhcyBzdWNjZXNzZnVsbHkgbGVhcm5lZFxuICAgICAqL1xuICAgIGFkZFNwZWxsQnlJZChpZCkge1xuICAgICAgICBpZiAodGhpcy5rbm93blNwZWxscy5oYXMoaWQpKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICB0aGlzLmtub3duU3BlbGxzLmFkZChpZCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldEtub3duU3BlbGxzKCkge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMua25vd25TcGVsbHNdO1xuICAgIH1cbn1cbmV4cG9ydCB7IEJhc2ljRmlnaHRlciB9O1xuIiwiZXhwb3J0IGRlZmF1bHQge307XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBHcmFwaGljcyBjb21wb25lbnQgd2hpY2ggc2ltcGx5IGRyYXdzIHRoZSBjaGFyYWN0ZXIgd2l0aCB0aGUgZm9yZVxuICogYW5kIGJhY2tncm91bmQgY29sb3IgYXQgdGhlIG93bmVyJ3MgeCBhbmQgeSBjb29yZGluYXRlcyBpZiB0aGUgdGlsZVxuICogaXQncyBvbiBpcyB2aXNpYmxlLlxuICovXG5jbGFzcyBCYXNpY0dyYXBoaWNzIHtcbiAgICBjb25zdHJ1Y3RvcihjaGFyLCBmZ0NvbG9yLCBiZ0NvbG9yKSB7XG4gICAgICAgIHRoaXMuY2hhciA9IGNoYXI7XG4gICAgICAgIHRoaXMuZmdDb2xvciA9IGZnQ29sb3I7XG4gICAgICAgIHRoaXMuYmdDb2xvciA9IGJnQ29sb3I7XG4gICAgICAgIHRoaXMub3duZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHNldE93bmVyKG93bmVyKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG5cbiAgICBkcmF3KGRpc3BsYXksIG1hcCkge1xuICAgICAgICBpZiAodGhpcy5vd25lciAmJiBtYXBbdGhpcy5vd25lci55XVt0aGlzLm93bmVyLnhdLmlzVmlzaWJsZUFuZExpdCgpKSB7XG4gICAgICAgICAgICBkaXNwbGF5LmRyYXcodGhpcy5vd25lci54LCB0aGlzLm93bmVyLnksIHRoaXMuY2hhciwgdGhpcy5mZ0NvbG9yLCB0aGlzLmJnQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEdyYXBoaWNzIGNvbXBvbmVudCB3aWxsIGFsd2F5cyBkcmF3IHRoZSBvYmplY3QgaWYgdGhlIHRpbGUgaXQncyBvbiBoYXMgYmVlbiBleHBsb3JlZCxcbiAqIHJlZ2FyZGxlc3Mgb2YgaXRzIHZpc2liaWxpdHlcbiAqL1xuY2xhc3MgRHJhd0FmdGVyU2VlbiB7XG4gICAgY29uc3RydWN0b3IoY2hhciwgZmdDb2xvciwgYmdDb2xvcikge1xuICAgICAgICB0aGlzLmNoYXIgPSBjaGFyO1xuICAgICAgICB0aGlzLmZnQ29sb3IgPSBmZ0NvbG9yO1xuICAgICAgICB0aGlzLmJnQ29sb3IgPSBiZ0NvbG9yO1xuICAgICAgICB0aGlzLm93bmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgZHJhdyhkaXNwbGF5LCBtYXApIHtcbiAgICAgICAgaWYgKHRoaXMub3duZXIgJiYgbWFwW3RoaXMub3duZXIueV1bdGhpcy5vd25lci54XS5leHBsb3JlZCkge1xuICAgICAgICAgICAgZGlzcGxheS5kcmF3KHRoaXMub3duZXIueCwgdGhpcy5vd25lci55LCB0aGlzLmNoYXIsIHRoaXMuZmdDb2xvciwgdGhpcy5iZ0NvbG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCB7IEJhc2ljR3JhcGhpY3MsIERyYXdBZnRlclNlZW4gfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiLi9nbG9iYWxzXCI7XG5pbXBvcnQgeyBJdGVtRGF0YSwgU3BlbGxEYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xuXG4vKipcbiAqIENvbXBvbmVudCBnaXZlcyBhbGwgdGhlIGl0ZW1zIGluIHRoZSBpbnZlbnRvcnkgb2YgdGhlIEdhbWVPYmplY3RcbiAqIHRvIHRoZSB1c2VyIHdoZW4gaW50ZXJhY3RlZCB3aXRoXG4gKi9cbmNsYXNzIEdpdmVJdGVtc0ludGVyYWN0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHNldE93bmVyKG93bmVyKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG5cbiAgICBpbnRlcmFjdCh1c2VyKSB7XG4gICAgICAgIGlmICh0aGlzLm93bmVyLmludmVudG9yeUNvbXBvbmVudCkge1xuICAgICAgICAgICAgY29uc3QgY2hlc3RJdGVtcyA9IHRoaXMub3duZXIuaW52ZW50b3J5Q29tcG9uZW50LmdldElEc0FuZENvdW50cygpO1xuICAgICAgICAgICAgaWYgKGNoZXN0SXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hlc3RJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gY2hlc3RJdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKFwiRm91bmQgYSBcIiArIEl0ZW1EYXRhW2l0ZW0uaWRdLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdXNlci5pbnZlbnRvcnlDb21wb25lbnQuYWRkSXRlbShpdGVtLmlkLCBpdGVtLmNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vd25lci5pbnZlbnRvcnlDb21wb25lbnQudXNlSXRlbShpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShcIkVtcHR5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1pc3NpbmcgaW52ZW50b3J5Q29tcG9uZW50IG9uIFwiLCB0aGlzLm93bmVyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBJbnRlcmFjdGlvbiBjb21wb25lbnQgdGhhdCBhZGRzIGEgc3BlbGwgdG8gdGhlIHVzZXIncyBzcGVsbCBsaXN0XG4gKi9cbmNsYXNzIEdpdmVTcGVsbEludGVyYWN0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnNwZWxsSWQgPSBudWxsO1xuICAgIH1cblxuICAgIHNldE93bmVyKG93bmVyKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG5cbiAgICBzZXRTcGVsbChpZCkge1xuICAgICAgICB0aGlzLnNwZWxsSWQgPSBpZDtcbiAgICB9XG5cbiAgICBpbnRlcmFjdCh1c2VyKSB7XG4gICAgICAgIGlmICghdGhpcy5zcGVsbElkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzcGVsbCBpZCBnaXZlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKHRoaXMuc3BlbGxJZCBpbiBTcGVsbERhdGEpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGhpcy5zcGVsbElkfSBpcyBub3QgYSB2YWxpZCBzcGVsbGApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gdXNlci5maWdodGVyLmFkZFNwZWxsQnlJZCh0aGlzLnNwZWxsSWQpO1xuICAgICAgICBjb25zdCBkYXRhID0gU3BlbGxEYXRhW3RoaXMuc3BlbGxJZF07XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShgWW91IGxlYXJuZWQgYSBuZXcgc3BlbGw6ICR7ZGF0YS5uYW1lfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKGBZb3UgYWxyZWFkeSBrbm93ICR7ZGF0YS5uYW1lfWApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEludGVyYWN0aW9uIGNvbXBvbmVudCByZW1vdmVzIG93bmVyIHRvIGdpdmUgdGhlIGFwcGVhcmFuY2Ugb2Ygb3BlbmluZ1xuICogd2hlbiBpbnRlcmFjdGluZ1xuICovXG5jbGFzcyBEb29ySW50ZXJhY3RhYmxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG51bGw7XG4gICAgICAgIHRoaXMubGV2ZWxOYW1lID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRMZXZlbChuYW1lKSB7XG4gICAgICAgIHRoaXMubGV2ZWxOYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgaW50ZXJhY3QoKSB7XG4gICAgICAgIGdsb2JhbHMuR2FtZS5yZW1vdmVPYmplY3QodGhpcy5vd25lcik7XG4gICAgfVxufVxuXG4vKipcbiAqIEludGVyYWN0aW9uIGNvbXBvbmVudCB0aGF0IGNhbGxzIEdhbWUubmV4dExldmVsIHdoZW4gaW50ZXJhY3RlZCB3aXRoXG4gKi9cbmNsYXNzIExvYWRMZXZlbEludGVyYWN0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmxldmVsTmFtZSA9IG51bGw7XG4gICAgfVxuXG4gICAgc2V0TGV2ZWwobmFtZSkge1xuICAgICAgICB0aGlzLmxldmVsTmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgc2V0T3duZXIob3duZXIpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIH1cblxuICAgIGludGVyYWN0KCkge1xuICAgICAgICBpZiAoIXRoaXMubGV2ZWxOYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBsZXZlbCBuYW1lIGhhcyBiZWVuIHNldCBmb3IgbG9hZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxzLkdhbWUubG9hZExldmVsKHRoaXMubGV2ZWxOYW1lKTtcbiAgICB9XG59XG5leHBvcnQgeyBHaXZlSXRlbXNJbnRlcmFjdGFibGUsIEdpdmVTcGVsbEludGVyYWN0YWJsZSwgRG9vckludGVyYWN0YWJsZSwgTG9hZExldmVsSW50ZXJhY3RhYmxlIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgSXRlbURhdGEgfSBmcm9tIFwiLi9kYXRhXCI7XG5cbmNsYXNzIEJhc2ljSW52ZW50b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG51bGw7XG5cbiAgICAgICAgLy8gQSBjbGFzcyBpbXBsZW1lbnRhdGlvbiB3aXRob3V0IHByaXZhdGUgZGF0YSBtZW1iZXJzP1xuICAgICAgICAvLyBDYW4gSlMgZG8gYW55dGhpbmcgcmlnaHQ/XG4gICAgICAgIHRoaXMuX2ludmVudG9yeSA9IHt9O1xuICAgIH1cblxuICAgIHNldE93bmVyKG93bmVyKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGltcGxlbWVudGF0aW9uIHJlbGllcyBvbiBKUyBub3cgaGF2aW5nIGEgc2V0IG9yZGVyaW5nIHRvXG4gICAgLy8ga2V5cyBpbiBvYmplY3RzIHdoZW4gdXNpbmcgb3duS2V5cy4gTm90IGEgcGVyZmVjdCBzb2x1dGlvbiBzaW5jZVxuICAgIC8vIGl0J3Mgbm90IG9idmlvdXMgd2hhdCdzIGdvaW5nIG9uLlxuICAgIGdldElEc0FuZENvdW50cygpIHtcbiAgICAgICAgY29uc3Qgb3JkZXJlZEtleXMgPSBSZWZsZWN0Lm93bktleXModGhpcy5faW52ZW50b3J5KTtcbiAgICAgICAgcmV0dXJuIG9yZGVyZWRLZXlzLm1hcChlID0+IHsgcmV0dXJuIHsgaWQ6IGUsIGNvdW50OiB0aGlzLl9pbnZlbnRvcnlbZV0gfTsgfSk7XG4gICAgfVxuXG4gICAgZ2V0TmFtZXNBbmRDb3VudHMoKSB7XG4gICAgICAgIGNvbnN0IG9yZGVyZWRLZXlzID0gUmVmbGVjdC5vd25LZXlzKHRoaXMuX2ludmVudG9yeSk7XG4gICAgICAgIHJldHVybiBvcmRlcmVkS2V5cy5tYXAoZSA9PiB7IHJldHVybiB7IG5hbWU6IEl0ZW1EYXRhW2VdLmRpc3BsYXlOYW1lLCBjb3VudDogdGhpcy5faW52ZW50b3J5W2VdIH07IH0pO1xuICAgIH1cblxuICAgIGhhc0l0ZW0oaWQpIHtcbiAgICAgICAgcmV0dXJuIGlkIGluIHRoaXMuX2ludmVudG9yeTtcbiAgICB9XG5cbiAgICBhZGRJdGVtKGlkLCBjb3VudD0xKSB7XG4gICAgICAgIGlmIChpZCBpbiB0aGlzLl9pbnZlbnRvcnkpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5faW52ZW50b3J5W2lkXSArIGNvdW50O1xuXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPT09IDEwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5W2lkXSA9IG5ld1ZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faW52ZW50b3J5W2lkXSA9IGNvdW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHVzZUl0ZW0oaWQpIHtcbiAgICAgICAgaWYgKCEoaWQgaW4gdGhpcy5faW52ZW50b3J5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJdGVtICR7aWR9IG5vdCBpbiBpbnZlbnRvcnlgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ludmVudG9yeVtpZF0tLTtcblxuICAgICAgICBpZiAodGhpcy5faW52ZW50b3J5W2lkXSA9PT0gMCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2ludmVudG9yeVtpZF07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgeyBCYXNpY0ludmVudG9yeSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFJORyB9IGZyb20gXCJyb3QtanNcIjtcblxuaW1wb3J0IGdsb2JhbHMgZnJvbSBcIi4vZ2xvYmFsc1wiO1xuaW1wb3J0IHsgQ29uZnVzZWRBSSB9IGZyb20gXCIuL2FpXCI7XG5pbXBvcnQgeyBnZXRPYmplY3RzQXRMb2NhdGlvbiwgZ2V0Q2xvc2VzdFZpc2libGVGaWdodGVyLCBzZXRBbGxUb0V4cGxvcmVkIH0gZnJvbSBcIi4vbWFwXCI7XG5pbXBvcnQgeyByYW5kb21JbnRGcm9tSW50ZXJ2YWwgfSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogVW5ob29rIHRoZSBtb3VzZSBsb29rIGZ1bmN0aW9uYWxpdHkgYW5kIHRoZW4gbGlzdGVuIGZvciBhIG1vdXNlXG4gKiBpbnB1dC4gSWYgaXQncyBhIGxlZnQgY2xpY2sgb24gYW4gb2JqZWN0IHdpdGggYSBmaWdodGVyIGNvbXBvbmVudCxcbiAqIHRoZW4gcmUtaG9vayB0aGUgbW91c2UgbG9vayBmdW5jdGlvbiBhbmQgcGFzcyB0aGUgdGFyZ2V0IHRvIHRoZVxuICogY2FsbGJhY2sgY2IuXG4gKlxuICogQHBhcmFtICB7RnVuY3Rpb259IGNiIGNhbGxiYWNrXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBtb3VzZVRhcmdldChjYikge1xuICAgIGdsb2JhbHMuR2FtZS51bmhvb2tNb3VzZUxvb2soKTtcbiAgICBnbG9iYWxzLkdhbWUuZHJhd0FsbCgpO1xuXG4gICAgZ2xvYmFscy5HYW1lLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIF9saXN0ZW5lcihlKSB7XG4gICAgICAgIGlmIChlLmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgcG9zID0gZ2xvYmFscy5HYW1lLmRpc3BsYXkuZXZlbnRUb1Bvc2l0aW9uKGUpO1xuXG4gICAgICAgICAgICBnbG9iYWxzLkdhbWUuY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgX2xpc3RlbmVyKTtcbiAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5ob29rTW91c2VMb29rKCk7XG5cbiAgICAgICAgICAgIGxldCB0YXJnZXQ7XG4gICAgICAgICAgICBjb25zdCBvYmplY3RzID0gZ2V0T2JqZWN0c0F0TG9jYXRpb24oZ2xvYmFscy5HYW1lLmdhbWVPYmplY3RzLCBwb3NbMF0sIHBvc1sxXSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChvYmplY3RzW2ldLmZpZ2h0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gb2JqZWN0c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5maWdodGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKHRhcmdldCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYihudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FzdEhlYWwoaXRlbSwgdXNlciwgb3duZXJDYWxsYmFjaykge1xuICAgIGlmICh1c2VyLmZpZ2h0ZXIuaHAgPj0gdXNlci5maWdodGVyLm1heEhwKSB7XG4gICAgICAgIGlmICh1c2VyID09PSBnbG9iYWxzLkdhbWUucGxheWVyKSB7XG4gICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJZb3UgYXJlIGFscmVhZHkgYXQgZnVsbCBoZWFsdGguXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKHVzZXIubmFtZSArIFwiIHRyaWVzIGFuZCBmYWlscyB0byB0YWtlIGEgaGVhbHRoIHBvdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3duZXJDYWxsYmFjayhmYWxzZSk7XG4gICAgfVxuICAgIHVzZXIuZmlnaHRlci5oZWFsKGl0ZW0udmFsdWUpO1xuICAgIHJldHVybiBvd25lckNhbGxiYWNrKHRydWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FzdERhbWFnZVNwZWxsKGl0ZW0sIHVzZXIsIG93bmVyQ2FsbGJhY2spIHtcbiAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJMZWZ0IGNsaWNrIG9uIGFuIGVuZW15IHRvIHRhcmdldCBpdCwgY2xpY2sgZWxzZXdoZXJlIHRvIGNhbmNlbFwiKTtcbiAgICBtb3VzZVRhcmdldChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShcIkNhbmNlbGVkIGNhc3RpbmdcIik7XG4gICAgICAgICAgICByZXR1cm4gb3duZXJDYWxsYmFjayhmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoYFNwZWxsIGhpdHMgJHt0YXJnZXQubmFtZX0gZm9yICR7aXRlbS52YWx1ZX0gZGFtYWdlYCk7XG4gICAgICAgIHRhcmdldC5maWdodGVyLnRha2VEYW1hZ2UodXNlciwgaXRlbS52YWx1ZSwgaXRlbS5kYW1hZ2VUeXBlKTtcblxuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIGZpZ2h0ZXIgYWdhaW4gYmVjYXVzZSBpdCBjb3VsZCBoYXZlIGRpZWQgYWxyZWFkeVxuICAgICAgICBpZiAodGFyZ2V0LmZpZ2h0ZXIgJiYgaXRlbS5zdGF0dXNFZmZlY3RGdW5jKSB7XG4gICAgICAgICAgICBpZiAoUk5HLmdldFVuaWZvcm0oKSA8PSB0YXJnZXQuZmlnaHRlci5haWxtZW50U3VzY2VwdGliaWxpdHkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlZmZlY3REYW1hZ2UgPSBNYXRoLnJvdW5kKHRhcmdldC5maWdodGVyLm1heEhwICogMC4wNjI1KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0dXJucyA9IHJhbmRvbUludEZyb21JbnRlcnZhbCgzLCA2KTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZmlnaHRlci5hZGRTdGF0dXNFZmZlY3QoXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3RhdHVzRWZmZWN0RnVuYyh0YXJnZXQsIGVmZmVjdERhbWFnZSwgdHVybnMpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvd25lckNhbGxiYWNrKHRydWUpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FzdFdpbGREYW1hZ2VTcGVsbChpdGVtLCB1c2VyLCBvd25lckNhbGxiYWNrKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZ2V0Q2xvc2VzdFZpc2libGVGaWdodGVyKGdsb2JhbHMuR2FtZS5tYXAsIGdsb2JhbHMuR2FtZS5nYW1lT2JqZWN0cywgdXNlciwgOCk7XG5cbiAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgIGlmICh1c2VyID09PSBnbG9iYWxzLkdhbWUucGxheWVyKSB7XG4gICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJObyB0YXJnZXQgaXMgY2xvc2UgZW5vdWdoIHRvIHVzZSB0aGUgc2Nyb2xsXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvd25lckNhbGxiYWNrKGZhbHNlKTtcbiAgICB9XG5cbiAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoYFNwZWxsIGhpdHMgJHt0YXJnZXQubmFtZX0gZm9yICR7aXRlbS52YWx1ZX0gZGFtYWdlYCk7XG4gICAgdGFyZ2V0LmZpZ2h0ZXIudGFrZURhbWFnZSh1c2VyLCBpdGVtLnZhbHVlLCBpdGVtLmRhbWFnZVR5cGUpO1xuXG4gICAgLy8gQ2hlY2sgZm9yIHRoZSBmaWdodGVyIGFnYWluIGJlY2F1c2UgaXQgY291bGQgaGF2ZSBkaWVkIGFscmVhZHlcbiAgICBpZiAodGFyZ2V0LmZpZ2h0ZXIgJiYgaXRlbS5zdGF0dXNFZmZlY3RGdW5jKSB7XG4gICAgICAgIGlmIChSTkcuZ2V0VW5pZm9ybSgpIDw9IHRhcmdldC5maWdodGVyLmFpbG1lbnRTdXNjZXB0aWJpbGl0eSkge1xuICAgICAgICAgICAgY29uc3QgZWZmZWN0RGFtYWdlID0gTWF0aC5yb3VuZCh0YXJnZXQuZmlnaHRlci5tYXhIcCAqIDAuMDYyNSk7XG4gICAgICAgICAgICBjb25zdCB0dXJucyA9IHJhbmRvbUludEZyb21JbnRlcnZhbCgzLCA2KTtcbiAgICAgICAgICAgIHRhcmdldC5maWdodGVyLmFkZFN0YXR1c0VmZmVjdChcbiAgICAgICAgICAgICAgICBpdGVtLnN0YXR1c0VmZmVjdEZ1bmModGFyZ2V0LCBlZmZlY3REYW1hZ2UsIHR1cm5zKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvd25lckNhbGxiYWNrKHRydWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FzdENvbmZ1c2UoaXRlbSwgdXNlciwgb3duZXJDYWxsYmFjaykge1xuICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShcIkxlZnQgY2xpY2sgb24gYW4gZW5lbXkgdG8gdGFyZ2V0IGl0LCBjbGljayBlbHNld2hlcmUgdG8gY2FuY2VsXCIpO1xuICAgIG1vdXNlVGFyZ2V0KGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG93bmVyQ2FsbGJhY2soZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKHRhcmdldC5uYW1lICsgXCIgaXMgbm93IGNvbmZ1c2VkXCIpO1xuICAgICAgICBjb25zdCBvbGRBSSA9IHRhcmdldC5haTtcbiAgICAgICAgdGFyZ2V0LmFpID0gbmV3IENvbmZ1c2VkQUkob2xkQUksIGl0ZW0udmFsdWUpO1xuICAgICAgICB0YXJnZXQuYWkub3duZXIgPSB0YXJnZXQ7XG4gICAgICAgIHJldHVybiBvd25lckNhbGxiYWNrKHRydWUpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FzdENsYWlydm95YW5jZShpdGVtLCB1c2VyLCBvd25lckNhbGxiYWNrKSB7XG4gICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKFwiWW91IGhhdmUgYmVlbiBncmFudGVkIENsYWlydm95YW5jZVwiKTtcbiAgICBzZXRBbGxUb0V4cGxvcmVkKGdsb2JhbHMuR2FtZS5tYXApO1xuICAgIHJldHVybiBvd25lckNhbGxiYWNrKHRydWUpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IENvbG9yLCBMaWdodGluZywgRk9WIH0gZnJvbSBcInJvdC1qc1wiO1xuXG5pbXBvcnQgeyBXT1JMRF9XSURUSCwgV09STERfSEVJR0hUIH0gZnJvbSBcIi4vZGF0YVwiO1xuaW1wb3J0IHsgY3JlYXRlUGFzc2FibGVTaWdodENhbGxiYWNrIH0gZnJvbSBcIi4vYWlcIjtcblxuZnVuY3Rpb24gY3JlYXRlUmVmbGVjdGl2aXR5Q2FsbGJhY2sobWFwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IFdPUkxEX1dJRFRIIHx8IHkgPj0gV09STERfSEVJR0hUKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwW3ldW3hdLmJsb2Nrc1NpZ2h0ID8gMCA6IG1hcFt5XVt4XS5yZWZsZWN0aXZpdHk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBDb21wb25lbnRcbiAqL1xuY2xhc3MgUmVmbGVjdGl2aXR5TGlnaHRpbmcge1xuICAgIGNvbnN0cnVjdG9yKGNvbG9yLCByYW5nZSkge1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgY29tcHV0ZShtYXApIHtcbiAgICAgICAgZnVuY3Rpb24gbGlnaHRpbmdDYWxsYmFjayh4LCB5LCBjb2xvcikge1xuICAgICAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gV09STERfV0lEVEggfHwgeSA+PSBXT1JMRF9IRUlHSFQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXBbeV1beF0ubGlnaHRpbmdDb2xvciA9IENvbG9yLnRvUkdCKFxuICAgICAgICAgICAgICAgIENvbG9yLmFkZChcbiAgICAgICAgICAgICAgICAgICAgQ29sb3IuZnJvbVN0cmluZyhtYXBbeV1beF0ubGlnaHRpbmdDb2xvciksXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb3YgPSBuZXcgRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nKFxuICAgICAgICAgICAgY3JlYXRlUGFzc2FibGVTaWdodENhbGxiYWNrKHRoaXMub3duZXIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGxpZ2h0aW5nID0gbmV3IExpZ2h0aW5nKGNyZWF0ZVJlZmxlY3Rpdml0eUNhbGxiYWNrKG1hcCksIHsgcmFuZ2U6IHRoaXMucmFuZ2UsIHBhc3NlczogMiB9KTtcbiAgICAgICAgbGlnaHRpbmcuc2V0Rk9WKGZvdik7XG4gICAgICAgIGxpZ2h0aW5nLnNldExpZ2h0KHRoaXMub3duZXIueCwgdGhpcy5vd25lci55LCB0aGlzLmNvbG9yKTtcbiAgICAgICAgbGlnaHRpbmcuY29tcHV0ZShsaWdodGluZ0NhbGxiYWNrKTtcbiAgICAgICAgLy8gRm9yIHNvbWUgcmVhc29uIHRoZSB0aWxlIHlvdSdyZSBvbiBkb2Vzbid0IGdldCBsaXRcbiAgICAgICAgbWFwW3RoaXMub3duZXIueV1bdGhpcy5vd25lci54XS5saWdodGluZ0NvbG9yID0gdGhpcy5jb2xvcjtcbiAgICB9XG59XG5cbi8qKlxuICogQ29tcG9uZW50XG4gKi9cbmNsYXNzIFBsYXllckxpZ2h0aW5nIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2xvciwgcmFuZ2UpIHtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XG4gICAgfVxuXG4gICAgc2V0T3duZXIob3duZXIpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIH1cblxuICAgIGNvbXB1dGUobWFwKSB7XG4gICAgICAgIGZ1bmN0aW9uIGxpZ2h0aW5nQ2FsbGJhY2sgKHgsIHksIGNvbG9yKSB7XG4gICAgICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSBXT1JMRF9XSURUSCB8fCB5ID49IFdPUkxEX0hFSUdIVCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1hcFt5XVt4XS5saWdodGluZ0NvbG9yID0gQ29sb3IudG9SR0IoXG4gICAgICAgICAgICAgICAgQ29sb3IuYWRkKFxuICAgICAgICAgICAgICAgICAgICBDb2xvci5mcm9tU3RyaW5nKG1hcFt5XVt4XS5saWdodGluZ0NvbG9yKSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3JcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFwW3ldW3hdLmV4cGxvcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNpZ2h0Rm92ID0gbmV3IEZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZyhcbiAgICAgICAgICAgIGNyZWF0ZVBhc3NhYmxlU2lnaHRDYWxsYmFjayh0aGlzLm93bmVyKVxuICAgICAgICApO1xuICAgICAgICBzaWdodEZvdi5jb21wdXRlKHRoaXMub3duZXIueCwgdGhpcy5vd25lci55LCAxMDAsIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IFdPUkxEX1dJRFRIIHx8IHkgPj0gV09STERfSEVJR0hUKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWFwW3ldW3hdLnZpc2libGUgPSB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBsaWdodGluZ0ZvdiA9IG5ldyBGT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcoXG4gICAgICAgICAgICBjcmVhdGVQYXNzYWJsZVNpZ2h0Q2FsbGJhY2sodGhpcy5vd25lcilcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgbGlnaHRpbmcgPSBuZXcgTGlnaHRpbmcoY3JlYXRlUmVmbGVjdGl2aXR5Q2FsbGJhY2sobWFwKSwgeyByYW5nZTogdGhpcy5yYW5nZSwgcGFzc2VzOiAyIH0pO1xuICAgICAgICBsaWdodGluZy5zZXRGT1YobGlnaHRpbmdGb3YpO1xuICAgICAgICBsaWdodGluZy5zZXRMaWdodCh0aGlzLm93bmVyLngsIHRoaXMub3duZXIueSwgdGhpcy5jb2xvcik7XG4gICAgICAgIGxpZ2h0aW5nLmNvbXB1dGUobGlnaHRpbmdDYWxsYmFjayk7XG4gICAgfVxufVxuZXhwb3J0IHsgUmVmbGVjdGl2aXR5TGlnaHRpbmcsIFBsYXllckxpZ2h0aW5nIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRGlzcGxheSwgU2NoZWR1bGVyLCBFbmdpbmUgfSBmcm9tIFwicm90LWpzXCI7XG5cbmltcG9ydCBnbG9iYWxzIGZyb20gXCIuL2dsb2JhbHNcIjtcbmltcG9ydCB7IGNyZWF0ZU9iamVjdCB9IGZyb20gXCIuL29iamVjdFwiO1xuaW1wb3J0IHsgV0lEVEgsIEhFSUdIVCwgVUlfSEVJR0hUIH0gZnJvbSBcIi4vZGF0YVwiO1xuaW1wb3J0IHsgZHJhd01hcCwgZ2V0T2JqZWN0c0F0TG9jYXRpb24sIHJlc2V0VmlzaWJpbGl0eSwgbG9hZFRpbGVkTWFwIH0gZnJvbSBcIi4vbWFwXCI7XG5pbXBvcnQgeyBkcmF3VUksIGNsZWFyU2NyZWVuIH0gZnJvbSBcIi4vdWlcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1vdXNlTG9vayhlKSB7XG4gICAgY29uc3QgcG9zID0gZ2xvYmFscy5HYW1lLmRpc3BsYXkuZXZlbnRUb1Bvc2l0aW9uKGUpO1xuICAgIGNvbnN0IHRhcmdldCA9IGdldE9iamVjdHNBdExvY2F0aW9uKGdsb2JhbHMuR2FtZS5nYW1lT2JqZWN0cywgcG9zWzBdLCBwb3NbMV0pWzBdO1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm5hbWUgJiYgdGFyZ2V0LmFpICYmIHRhcmdldC5haS5zdGF0ZSkge1xuICAgICAgICBpZiAodGFyZ2V0LmFpLnN0YXRlID09PSBcIndhbmRlclwiKSB7XG4gICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJBIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiwgaXQgaGFzbid0IHNlZW4geW91LlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShcIkEgXCIgKyB0YXJnZXQubmFtZSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0YXJnZXQubmFtZSkge1xuICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UodGFyZ2V0Lm5hbWUpO1xuICAgIH0gZWxzZSBpZiAoIXRhcmdldCkge1xuICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoZ2xvYmFscy5HYW1lLm1hcFtwb3NbMV1dW3Bvc1swXV0ubmFtZSk7XG4gICAgfVxufVxuXG4vKipcbiAqIENsYXNzIGluc2lkZSB0aGUgc2NoZWR1bGVyIHdoaWNoIGhhbmRsZXMgdGhlIG5vcm1hbCBmdW5jdGlvbnMgb2ZcbiAqIHRoZSBnYW1lIGxvb3Agd2hpY2ggYXJlbid0IHJlbGF0ZWQgdG8gaW5pdGlhdGluZyB0aGUgYmVoYXZpb3Igb2ZcbiAqIGFjdG9ycyBvciBvYmplY3RzXG4gKi9cbmNsYXNzIE1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB9XG5cbiAgICBhY3QoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5lbmdpbmUubG9jaygpO1xuICAgICAgICB0aGlzLmdhbWUuY3VycmVudFR1cm4rKztcblxuICAgICAgICBpZiAodGhpcy5nYW1lLnBsYXllci5maWdodGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUubG9zZUNpbmVtYXRpYygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzZXRWaXNpYmlsaXR5KHRoaXMuZ2FtZS5tYXApO1xuICAgICAgICB0aGlzLmdhbWUuZHJhd0FsbCgpO1xuICAgICAgICB0aGlzLmdhbWUuZW5naW5lLnVubG9jaygpO1xuICAgIH1cbn1cblxuY2xhc3MgU2ltcGxlRHVuZ2VvbkNyYXdsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IG51bGw7XG4gICAgICAgIHRoaXMucGxheWVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBudWxsO1xuICAgICAgICB0aGlzLnNjaGVkdWxlciA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXAgPSBbXTtcbiAgICAgICAgdGhpcy5jdXJyZW50TG9nTGluZXMgPSBbXTtcbiAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWwgPSAwO1xuICAgICAgICB0aGlzLmN1cnJlbnRUdXJuID0gMDtcbiAgICAgICAgdGhpcy50b3RhbE1lc3NhZ2VzID0gMDtcbiAgICAgICAgdGhpcy5kaXNwbGF5ID0gbmV3IERpc3BsYXkoe1xuICAgICAgICAgICAgd2lkdGg6IFdJRFRILFxuICAgICAgICAgICAgaGVpZ2h0OiBIRUlHSFQsXG4gICAgICAgICAgICBmb250U2l6ZTogMTMsXG4gICAgICAgICAgICBmb3JjZVNxdWFyZVJhdGlvOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IHRoaXMuZGlzcGxheS5nZXRDb250YWluZXIoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuXG4gICAgICAgIHRoaXMub3BlbmluZ0NpbmVtYXRpYygpO1xuICAgIH1cblxuICAgIHJlc2V0ICgpIHtcbiAgICAgICAgY2xlYXJTY3JlZW4odGhpcy5kaXNwbGF5KTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuZmlnaHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMucGxheWVyLmFpID0gbnVsbDtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMucGxheWVyLmFpKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbCA9IDA7XG4gICAgICAgIHRoaXMubWFwID0gW107XG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5jdXJyZW50TG9nTGluZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBvcGVuaW5nQ2luZW1hdGljKCkge1xuICAgICAgICB0aGlzLmRpc3BsYXkuZHJhd1RleHQoV0lEVEggLSAoV0lEVEggLSA3KSwgMTIsIFwiJWN7d2hpdGV9WW91ciBjb3VudHJ5IGlzIGJlaW5nIG92ZXJydW4gYnkgdGhlIGZvcmNlcyBvZiBkYXJrbmVzc1wiKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmRyYXdUZXh0KFdJRFRIIC0gKFdJRFRIIC0gOCksIDE1LCBcIiVje3doaXRlfVRhbGVzIHRlbGwgb2YgYSB3ZWFwb24gb2YgZ3JlYXQgcG93ZXIgbG9zdCBpbiB0aGVcIik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5kcmF3VGV4dChXSURUSCAtIChXSURUSCAtIDQpLCAxNiwgXCIlY3t3aGl0ZX1sYW5kcyBiZXlvbmQgdGhlIGR3YXJmIHN0cm9uZ2hvbGQgRHVyZHdpbiwgdW5kZXIgdGhlIFJlZCBIaWxscy5cIik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5kcmF3VGV4dChXSURUSCAtIChXSURUSCAtIDE3KSwgMTgsIFwiJWN7d2hpdGV9Tm9uZSB3aG8gaGF2ZSBlbnRlcmVkIGhhdmUgcmV0dXJuZWRcIik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5kcmF3VGV4dChXSURUSCAtIChXSURUSCAtIDE0KSwgMjAsIFwiJWN7d2hpdGV9SXQgaXMgdGhlIGxhc3QgaG9wZSBvZiBhIGRlc3BlcmF0ZSBwZW9wbGVcIik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5kcmF3VGV4dChXSURUSCAtIChXSURUSCAtIDE2KSwgMjEsIFwiJWN7d2hpdGV9WW91IGhhdmUgdm9sdW50ZWVyZWQgdG8gcmV0cmlldmUgaXRcIik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5kcmF3VGV4dChXSURUSCAtIChXSURUSCAtIDI0KSwgMjcsIFwiJWN7d2hpdGV9UHJlc3MgW2VudGVyXSB0byBzdGFydFwiKTtcblxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gX2xpc3RlbmVyKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50LnN0YXJ0R2FtZXBsYXkoKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgX2xpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgd2luQ2luZW1hdGljKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5LmRyYXdUZXh0KFdJRFRIIC0gKFdJRFRIIC0gMTIpLCAxMiwgXCIlY3t3aGl0ZX1Zb3UgaGF2ZSByZWFjaGVkIHRoZSBib3R0b20gYW5kIGhhdmUgcmV0cmlldmVkXCIpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuZHJhd1RleHQoV0lEVEggLSAoV0lEVEggLSAxNiksIDEzLCBcIiVje3doaXRlfXRoZSBmYWJsZWQgd2VhcG9uIGFuZCBzYXZlZCB5b3VyIHBlb3BsZVwiKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmRyYXdUZXh0KFdJRFRIIC0gKFdJRFRIIC0gMTgpLCAyNCwgXCIlY3t3aGl0ZX1QcmVzcyBbZW50ZXJdIHRvIHJlc3RhcnQgdGhlIGdhbWVcIik7XG5cbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcztcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIF9saXN0ZW5lcihlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIHBhcmVudC5zdGFydEdhbWVwbGF5KCk7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIF9saXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvc2VDaW5lbWF0aWMoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcblxuICAgICAgICB0aGlzLmRpc3BsYXkuZHJhd1RleHQoV0lEVEggLSAoV0lEVEggLSA1KSwgMTIsIFwiJWN7d2hpdGV9WW91IGhhdmUgZGllZCwgYW5kIHRoZSBsYXN0IGhvcGUgb2YgeW91ciBwZW9wbGUgZGllcyB3aXRoIHlvdVwiKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmRyYXdUZXh0KFdJRFRIIC0gKFdJRFRIIC0gMTgpLCAyNCwgXCIlY3t3aGl0ZX1QcmVzcyBbZW50ZXJdIHRvIHJlc3RhcnQgdGhlIGdhbWVcIik7XG5cbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcztcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIF9saXN0ZW5lcihlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIHBhcmVudC5zdGFydEdhbWVwbGF5KCk7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIF9saXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXJ0R2FtZXBsYXkoKSB7XG4gICAgICAgIC8vIGxvb2tpbmcgYXQgb2JqZWN0cyBvbiB0aGUgbWFwIHdpdGggdGhlIG1vdXNlXG4gICAgICAgIHRoaXMuaG9va01vdXNlTG9vaygpO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gbmV3IFNjaGVkdWxlci5TaW1wbGUoKTtcbiAgICAgICAgdGhpcy5tYW5hZ2VyID0gbmV3IE1hbmFnZXIodGhpcyk7XG4gICAgICAgIHRoaXMucGxheWVyID0gY3JlYXRlT2JqZWN0KFwicGxheWVyXCIsIDEsIDEpO1xuICAgICAgICB0aGlzLmxvYWRMZXZlbChcImxldmVsXzFcIik7XG4gICAgfVxuXG4gICAgZGlzcGxheU1lc3NhZ2UodGV4dCkge1xuICAgICAgICB0aGlzLnRvdGFsTWVzc2FnZXMrKztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFdJRFRIOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgVUlfSEVJR0hUOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkuZHJhdyhpLCBIRUlHSFQgLSBqLCBcIlwiLCBcImJsYWNrXCIsIFwiYmxhY2tcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50TG9nTGluZXMubGVuZ3RoID09PSA1KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMb2dMaW5lcy5zcGxpY2UoMCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50TG9nTGluZXMucHVzaCh0aGlzLnRvdGFsTWVzc2FnZXMgKyBcIikgXCIgKyB0ZXh0KTtcbiAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCB0aGlzLmN1cnJlbnRMb2dMaW5lcy5sZW5ndGg7IGQrKykge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LmRyYXdUZXh0KDAsICBIRUlHSFQgLSA1ICsgZCwgXCIlY3t3aGl0ZX1cIiArIHRoaXMuY3VycmVudExvZ0xpbmVzW2RdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdBbGwoKSB7XG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHNcbiAgICAgICAgICAgIC5maWx0ZXIobyA9PiBvLmxpZ2h0aW5nICYmIHR5cGVvZiBvLmxpZ2h0aW5nLmNvbXB1dGUgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIC5mb3JFYWNoKG8gPT4gby5saWdodGluZy5jb21wdXRlKHRoaXMubWFwKSk7XG4gICAgICAgIHRoaXMucGxheWVyLmxpZ2h0aW5nLmNvbXB1dGUodGhpcy5tYXApO1xuXG4gICAgICAgIGRyYXdNYXAodGhpcy5kaXNwbGF5LCB0aGlzLm1hcCk7XG5cbiAgICAgICAgLy8gRklYIE1FOiBkZWFkIGJvZGllcyBkcmF3IG92ZXIgZW5lbWllcyBvbiB0aGUgc2FtZSB0aWxlXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHNcbiAgICAgICAgICAgIC5maWx0ZXIobyA9PiBvLmdyYXBoaWNzICYmIHR5cGVvZiBvLmdyYXBoaWNzLmRyYXcgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIC5mb3JFYWNoKG8gPT4gby5ncmFwaGljcy5kcmF3KHRoaXMuZGlzcGxheSwgdGhpcy5tYXApKTtcblxuICAgICAgICB0aGlzLnBsYXllci5ncmFwaGljcy5kcmF3KHRoaXMuZGlzcGxheSwgdGhpcy5tYXApO1xuICAgICAgICBkcmF3VUkodGhpcy5kaXNwbGF5LCB0aGlzLmN1cnJlbnRMZXZlbCwgdGhpcy5wbGF5ZXIpO1xuICAgIH1cblxuICAgIGxvYWRMZXZlbCAobmFtZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbCsrO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRMZXZlbCA9PT0gMjEpIHtcbiAgICAgICAgICAgIHRoaXMud2luQ2luZW1hdGljKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7bWFwLCBwbGF5ZXJMb2NhdGlvbiwgb2JqZWN0c30gPSBsb2FkVGlsZWRNYXAobmFtZSk7XG4gICAgICAgIHRoaXMubWFwID0gbWFwO1xuICAgICAgICB0aGlzLmdhbWVPYmplY3RzID0gb2JqZWN0cztcblxuICAgICAgICB0aGlzLnBsYXllci54ID0gcGxheWVyTG9jYXRpb25bMF07XG4gICAgICAgIHRoaXMucGxheWVyLnkgPSBwbGF5ZXJMb2NhdGlvblsxXTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuZmlnaHRlci5tYW5hID0gdGhpcy5wbGF5ZXIuZmlnaHRlci5tYXhNYW5hO1xuXG4gICAgICAgIHRoaXMuc2NoZWR1bGVyLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyLmFkZCh0aGlzLm1hbmFnZXIsIHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlci5hZGQodGhpcy5wbGF5ZXIsIHRydWUpO1xuICAgICAgICB0aGlzLmdhbWVPYmplY3RzLmZvckVhY2goZSA9PiB0aGlzLnNjaGVkdWxlci5hZGQoZSwgdHJ1ZSkpO1xuICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBFbmdpbmUodGhpcy5zY2hlZHVsZXIpO1xuICAgICAgICB0aGlzLmVuZ2luZS5zdGFydCgpO1xuICAgIH1cblxuICAgIGhvb2tNb3VzZUxvb2sgKCkge1xuICAgICAgICAvLyBicmVhayBvdXQgdGhlIGhvb2sgYW5kIHVuaG9vayBtb3VzZSBsb29rIGludG8gdGhlaXIgb3duIGZ1bmN0aW9uc1xuICAgICAgICAvLyBiZWNhdXNlIG90aGVyIGFjdGlvbnMgbmVlZCB0byB0YWtlIG92ZXIgdGhlIG1vdXNlIGF0IHNvbWUgcG9pbnRzXG4gICAgICAgIC8vIGFuZCB3ZSBkb24ndCB3YW50IGFueXRoaW5nIG90aGVyIHRoYW4gdGhlIEdhbWUgb2JqZWN0IGludGVyYWN0aW5nXG4gICAgICAgIC8vIHdpdGggdGhlIGNhbnZhc1xuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1vdXNlTG9vayk7XG4gICAgfVxuXG4gICAgdW5ob29rTW91c2VMb29rICgpIHtcbiAgICAgICAgdGhpcy5jYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBtb3VzZUxvb2spO1xuICAgIH1cblxuICAgIGFkZE9iamVjdCAob2JqZWN0KSB7XG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlci5hZGQodGhpcy5nYW1lT2JqZWN0c1t0aGlzLmdhbWVPYmplY3RzLmxlbmd0aCAtIDFdLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW4gb2JqZWN0IGZyb20gdGhlIHdvcmxkXG4gICAgICogQHBhcmFtICB7R2FtZU9iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVPYmplY3QgKG9iamVjdCkge1xuICAgICAgICAvLyBjb3VsZCB1c2UgYW4gb2JqZWN0IHBvb2wgb3IgYSBsaW5rZWQgbGlzdCB0byBzcGVlZCB1cCB0aGlzIG9wZXJhdGlvblxuICAgICAgICAvLyBidXQgdGhhdCBzZWVtcyBvdmVya2lsbCBmb3IgdGhpc1xuICAgICAgICB0aGlzLmdhbWVPYmplY3RzLnNwbGljZSh0aGlzLmdhbWVPYmplY3RzLmluZGV4T2Yob2JqZWN0KSwgMSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyLnJlbW92ZShvYmplY3QpO1xuICAgIH1cbn1cbmdsb2JhbHMuR2FtZSA9IG5ldyBTaW1wbGVEdW5nZW9uQ3Jhd2xlcigpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IFJORyB9IGZyb20gXCJyb3QtanNcIjtcblxuaW1wb3J0IHtcbiAgICBXT1JMRF9IRUlHSFQsXG4gICAgV09STERfV0lEVEgsXG4gICAgQ09MT1JfQU1CSUVOVF9MSUdIVCxcbiAgICBDT0xPUl9EQVJLX1dBTEwsXG4gICAgQ09MT1JfSU5WSVNJQkxFX1dBTEwsXG4gICAgQ09MT1JfREFSS19HUk9VTkQsXG4gICAgQ09MT1JfSU5WSVNJQkxFX0dST1VORCxcbiAgICBUaWxlRGF0YVxufSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgeyBjcmVhdGVPYmplY3QgfSBmcm9tIFwiLi9vYmplY3RcIjtcblxuaW1wb3J0IGxldmVsXzEgZnJvbSBcIi4vbWFwcy9sZXZlbF8xXCI7XG5pbXBvcnQgbGV2ZWxfMiBmcm9tIFwiLi9tYXBzL2xldmVsXzJcIjtcbmltcG9ydCBkZXZfcm9vbSBmcm9tIFwiLi9tYXBzL2Rldl9yb29tXCI7XG5cbmNvbnN0IFRpbGVNYXBzID0geyBsZXZlbF8xLCBsZXZlbF8yLCBkZXZfcm9vbSB9O1xuXG5jbGFzcyBUaWxlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjaGFyLCBmZ0NvbG9yLCBiZ0NvbG9yLCBmZ0NvbG9yRXhwbG9yZWQsIGJnQ29sb3JFeHBsb3JlZCwgYmxvY2tzLCBibG9ja3NTaWdodCwgdmlzaWJsZSA9IGZhbHNlLCBleHBsb3JlZCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2hhciA9IGNoYXI7XG4gICAgICAgIHRoaXMuZmdDb2xvciA9IGZnQ29sb3I7XG4gICAgICAgIHRoaXMuYmdDb2xvciA9IGJnQ29sb3I7XG4gICAgICAgIHRoaXMuZmdDb2xvckV4cGxvcmVkID0gZmdDb2xvckV4cGxvcmVkO1xuICAgICAgICB0aGlzLmJnQ29sb3JFeHBsb3JlZCA9IGJnQ29sb3JFeHBsb3JlZDtcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBibG9ja3M7XG4gICAgICAgIHRoaXMuYmxvY2tzU2lnaHQgPSBibG9ja3NTaWdodDtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdmlzaWJsZTtcbiAgICAgICAgdGhpcy5leHBsb3JlZCA9IGV4cGxvcmVkO1xuICAgICAgICB0aGlzLnJlZmxlY3Rpdml0eSA9IDAuMTg7XG4gICAgICAgIHRoaXMubGlnaHRpbmdDb2xvciA9IGJnQ29sb3I7XG4gICAgfVxuXG4gICAgaXNWaXNpYmxlQW5kTGl0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlICYmIHRoaXMubGlnaHRpbmdDb2xvciAhPT0gQ09MT1JfQU1CSUVOVF9MSUdIVDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGlsZWRNYXAobGV2ZWwpIHtcbiAgICBjb25zdCBzb3VyY2VEYXRhID0gVGlsZU1hcHNbbGV2ZWxdO1xuICAgIGNvbnN0IHRpbGVTaXplID0gc291cmNlRGF0YS50aWxlaGVpZ2h0O1xuICAgIGNvbnN0IG1hcCA9IFtdO1xuICAgIGNvbnN0IG9iamVjdHMgPSBbXTtcbiAgICBsZXQgcGxheWVyTG9jYXRpb24gPSBudWxsO1xuXG4gICAgaWYgKHNvdXJjZURhdGEud2lkdGggIT09IFdPUkxEX1dJRFRIICYmIHNvdXJjZURhdGEuaGVpZ2h0ICE9PSBXT1JMRF9IRUlHSFQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMb2FkZWQgbWFwICR7bmFtZX0gZG9lc24ndCBtYXRjaCB3b3JsZCB3aWR0aC9oZWlnaHRgKTtcbiAgICB9XG5cbiAgICBpZiAoc291cmNlRGF0YS5sYXllcnMubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9hZGVkIG1hcCAke25hbWV9IHNob3VsZCBvbmx5IGhhdmUgdHdvIGxheWVyc2ApO1xuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zbGF0ZWQgPSBzb3VyY2VEYXRhLmxheWVyc1swXS5kYXRhLm1hcCh0aWxlID0+IHtcbiAgICAgICAgaWYgKCEodGlsZSBpbiBUaWxlRGF0YSkpIHsgdGhyb3cgbmV3IEVycm9yKGAke3RpbGV9IGlzIG5vdCB2YWxpZCB0aWxlYCk7IH1cblxuICAgICAgICBjb25zdCBkYXRhID0gVGlsZURhdGFbdGlsZV07XG4gICAgICAgIHJldHVybiBuZXcgVGlsZShcbiAgICAgICAgICAgIGRhdGEubmFtZSxcbiAgICAgICAgICAgIGRhdGEuY2hhcixcbiAgICAgICAgICAgIGRhdGEuZmdDb2xvcixcbiAgICAgICAgICAgIGRhdGEuYmdDb2xvcixcbiAgICAgICAgICAgIGRhdGEuZmdDb2xvckV4cGxvcmVkLFxuICAgICAgICAgICAgZGF0YS5iZ0NvbG9yRXhwbG9yZWQsXG4gICAgICAgICAgICBkYXRhLmJsb2NrcyxcbiAgICAgICAgICAgIGRhdGEuYmxvY2tzU2lnaHRcbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhbnNsYXRlZC5sZW5ndGg7IGkgKz0gV09STERfV0lEVEgpIHtcbiAgICAgICAgbWFwLnB1c2godHJhbnNsYXRlZC5zbGljZShpLCBpICsgV09STERfV0lEVEgpKTtcbiAgICB9XG5cbiAgICBzb3VyY2VEYXRhLmxheWVyc1sxXS5vYmplY3RzLmZvckVhY2gobyA9PiB7XG4gICAgICAgIGZ1bmN0aW9uIGZpbmRQcm9wZXJ0eShuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIW8ucHJvcGVydGllcyB8fCAhby5wcm9wZXJ0aWVzLmxlbmd0aCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IG8ucHJvcGVydGllcy5maWx0ZXIocHJvcCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3AubmFtZSA9PT0gbmFtZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocHJvcGVydHkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eVswXS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvYmo7XG4gICAgICAgIGNvbnN0IGlkID0gZmluZFByb3BlcnR5KFwiaWRcIiksXG4gICAgICAgICAgICBpbnZlbnRvcnkgPSBmaW5kUHJvcGVydHkoXCJpbnZlbnRvcnlcIiksXG4gICAgICAgICAgICBsZXZlbE5hbWUgPSBmaW5kUHJvcGVydHkoXCJsZXZlbE5hbWVcIiksXG4gICAgICAgICAgICBzcGVsbElkID0gZmluZFByb3BlcnR5KFwic3BlbGxJZFwiKTtcblxuICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBObyBpZCBmb3IgJHtvLm5hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoby5wb2ludCkge1xuICAgICAgICAgICAgaWYgKGlkID09PSBcInBsYXllclwiKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyTG9jYXRpb24gPSBbTWF0aC5mbG9vcihvLnggLyB0aWxlU2l6ZSksIE1hdGguZmxvb3Ioby55IC8gdGlsZVNpemUpXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqID0gY3JlYXRlT2JqZWN0KFxuICAgICAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihvLnggLyB0aWxlU2l6ZSksXG4gICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3Ioby55IC8gdGlsZVNpemUpLFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW52ZW50b3J5ICYmIG9iai5pbnZlbnRvcnlDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW52ZW50b3J5LnNwbGl0KFwiLFwiKS5mb3JFYWNoKGkgPT4gb2JqLmludmVudG9yeUNvbXBvbmVudC5hZGRJdGVtKGkpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobGV2ZWxOYW1lICYmIG9iai5pbnRlcmFjdGFibGUgJiYgb2JqLmludGVyYWN0YWJsZS5zZXRMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW50ZXJhY3RhYmxlLnNldExldmVsKGxldmVsTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHNwZWxsSWQgJiYgb2JqLmludGVyYWN0YWJsZSAmJiBvYmouaW50ZXJhY3RhYmxlLnNldFNwZWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5pbnRlcmFjdGFibGUuc2V0U3BlbGwoc3BlbGxJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iamVjdHMucHVzaChvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG8udHlwZSA9PT0gXCJSZWN0YW5nbGVcIikge1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGguZmxvb3Ioby54IC8gdGlsZVNpemUpO1xuICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3Ioby55IC8gdGlsZVNpemUpO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLmZsb29yKG8ud2lkdGggLyB0aWxlU2l6ZSkgKyB4O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5mbG9vcihvLmhlaWdodCAvIHRpbGVTaXplKSArIHk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0geDsgaiA8IHdpZHRoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0cy5wdXNoKGNyZWF0ZU9iamVjdChpZCwgaSwgaikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgbWFwLCBwbGF5ZXJMb2NhdGlvbiwgb2JqZWN0cyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZEVtcHR5U3BhY2UobWFwLCBvYmplY3RzKSB7XG4gICAgbGV0IHggPSAwLCB5ID0gMDtcbiAgICB3aGlsZSAoZXhwb3J0cy5pc0Jsb2NrZWQobWFwLCBvYmplY3RzLCB4LCB5KSkge1xuICAgICAgICB4ID0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogV09STERfV0lEVEgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogV09STERfSEVJR0hUKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgeCwgeSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2JqZWN0c0F0TG9jYXRpb24ob2JqZWN0cywgeCwgeSkge1xuICAgIHJldHVybiBvYmplY3RzLmZpbHRlcihvYmplY3QgPT4gb2JqZWN0LnggPT09IHggJiYgb2JqZWN0LnkgPT09IHkpO1xufVxuXG4vKipcbiAgICBSZXR1cm5zIG51bGwgaWYgdGhlIHNwYWNlIGlzIG9wZW4sIHRydWUgb3IgdGhlIGJsb2NraW5nIG9iamVjdFxuICAgIGlmIGJsb2NrZWRcbiovXG5leHBvcnQgZnVuY3Rpb24gaXNCbG9ja2VkKG1hcCwgb2JqZWN0cywgeCwgeSkge1xuICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IFdPUkxEX1dJRFRIIHx8IHkgPj0gV09STERfSEVJR0hUIHx8IG1hcFt5XVt4XS5ibG9ja3MpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gb2JqZWN0cy5maWx0ZXIob2JqZWN0ID0+IG9iamVjdC54ID09PSB4ICYmIG9iamVjdC55ID09PSB5ICYmIG9iamVjdC5ibG9ja3MgPT09IHRydWUpWzBdO1xuICAgIHJldHVybiB0YXJnZXQgPyB0YXJnZXQgOiBudWxsO1xufVxuXG4vKipcbiAgICBSZXR1cm5zIHRydWUgaWYgc3BhY2UgYmxvY2tzIHNpZ2h0LCBmYWxzZSBvdGhlcndpc2VcbiovXG5leHBvcnQgZnVuY3Rpb24gaXNTaWdodEJsb2NrZWQobWFwLCBvYmplY3RzLCB4LCB5KSB7XG4gICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gV09STERfV0lEVEggfHwgeSA+PSBXT1JMRF9IRUlHSFQgfHwgbWFwW3ldW3hdLmJsb2Nrc1NpZ2h0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IG8gPSBnZXRPYmplY3RzQXRMb2NhdGlvbihvYmplY3RzLCB4LCB5KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG9baV0uYmxvY2tzU2lnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBkcmF3VGlsZShkaXNwbGF5LCB0aWxlLCB4LCB5KSB7XG4gICAgbGV0IGZnQ29sb3IsIGJnQ29sb3I7XG5cbiAgICBpZiAodGlsZS5ibG9ja3MpIHtcbiAgICAgICAgaWYgKCF0aWxlLmV4cGxvcmVkKSB7XG4gICAgICAgICAgICBmZ0NvbG9yID0gQ09MT1JfSU5WSVNJQkxFX1dBTEw7XG4gICAgICAgICAgICBiZ0NvbG9yID0gQ09MT1JfSU5WSVNJQkxFX1dBTEw7XG4gICAgICAgIH0gZWxzZSBpZiAodGlsZS5leHBsb3JlZCAmJiB0aWxlLnZpc2libGUpIHtcbiAgICAgICAgICAgIGZnQ29sb3IgPSB0aWxlLmZnQ29sb3I7XG4gICAgICAgICAgICBiZ0NvbG9yID0gdGlsZS5iZ0NvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKHRpbGUuZXhwbG9yZWQgJiYgIXRpbGUudmlzaWJsZSkge1xuICAgICAgICAgICAgZmdDb2xvciA9IENPTE9SX0RBUktfV0FMTDtcbiAgICAgICAgICAgIGJnQ29sb3IgPSBDT0xPUl9EQVJLX1dBTEw7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGlsZS5pc1Zpc2libGVBbmRMaXQoKSkge1xuICAgICAgICAgICAgZmdDb2xvciA9IHRpbGUuZmdDb2xvcjtcbiAgICAgICAgICAgIGJnQ29sb3IgPSB0aWxlLmxpZ2h0aW5nQ29sb3I7XG4gICAgICAgIH0gZWxzZSBpZiAodGlsZS5leHBsb3JlZCkge1xuICAgICAgICAgICAgZmdDb2xvciA9IENPTE9SX0RBUktfR1JPVU5EO1xuICAgICAgICAgICAgYmdDb2xvciA9IENPTE9SX0RBUktfR1JPVU5EO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmdDb2xvciA9IENPTE9SX0lOVklTSUJMRV9HUk9VTkQ7XG4gICAgICAgICAgICBiZ0NvbG9yID0gQ09MT1JfSU5WSVNJQkxFX0dST1VORDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgZGlzcGxheS5kcmF3KHgsIHksIHRpbGUuY2hhciwgZmdDb2xvciwgYmdDb2xvcik7XG59XG5cbi8qKlxuICogRmluZCB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gR2FtZU9iamVjdHNcbiAqIEBwYXJhbSAge0dhbWVPYmplY3R9IGEgQW4gb2JqZWN0XG4gKiBAcGFyYW0gIHtHYW1lT2JqZWN0fSBiIEFuIG9iamVjdFxuICogQHJldHVybiB7TnVtYmVyfSAgICAgICBUaGUgZGlzdGFuY2VcbiAqL1xuZnVuY3Rpb24gZGlzdGFuY2VCZXR3ZWVuT2JqZWN0cyhhLCBiKSB7XG4gICAgY29uc3QgZHggPSBiLnggLSBhLng7XG4gICAgY29uc3QgZHkgPSBiLnkgLSBhLnk7XG4gICAgcmV0dXJuIE1hdGguc3FydChkeCAqKiAyICsgZHkgKiogMik7XG59XG5cbi8qKlxuICogRmluZCB0aGUgY2xvc2VzdCBvdGhlciBhY3RvciBmcm9tIGFuIGFjdG9yIG9yaWdpbiBnaXZlbiB0aGUgYWN0b3IgaXNcbiAqIG9uIGEgdmlzaWJsZSB0aWxlLlxuICpcbiAqIEBwYXJhbSAge0FycmF5fSAgICAgIG1hcCAgICAgICAgICBUaGUgY3VycmVudCBtYXBcbiAqIEBwYXJhbSAge0FycmF5fSAgICAgIGFjdG9ycyAgICAgICBUaGUgY3VycmVudCBsaXN0IG9mIGFjdG9yc1xuICogQHBhcmFtICB7R2FtZU9iamVjdH0gb3JpZ2luICAgICAgIFRoZSBzdGFydGluZyBvYmplY3RcbiAqIEBwYXJhbSAge051bWJlcn0gICAgIG1heERpc3RhbmNlICBUaGUgbWF4IGFsbG93ZWQgZGlzdGFuY2UgYmVmb3JlIGdpdmluZyB1cFxuICogQHJldHVybiB7R2FtZU9iamVjdH0gICAgICAgICAgICAgIFRoZSBjbG9zZXN0IGFjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbG9zZXN0VmlzaWJsZUZpZ2h0ZXIobWFwLCBhY3RvcnMsIG9yaWdpbiwgbWF4RGlzdGFuY2UpIHtcbiAgICBsZXQgY2xvc2VzdEFjdG9yID0gbnVsbDtcbiAgICBsZXQgY2xvc2VzdERpc3RhbmNlID0gbWF4RGlzdGFuY2UgKyAxO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYWN0b3IgPSBhY3RvcnNbaV07XG4gICAgICAgIGlmIChhY3Rvci5maWdodGVyICE9PSB1bmRlZmluZWQgJiYgYWN0b3IuZmlnaHRlciAhPT0gbnVsbCAmJiBhY3RvciAhPT0gb3JpZ2luICYmIG1hcFthY3Rvci55XVthY3Rvci54XS52aXNpYmxlKSB7XG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGRpc3RhbmNlQmV0d2Vlbk9iamVjdHMob3JpZ2luLCBhY3Rvcik7XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCBjbG9zZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBjbG9zZXN0QWN0b3IgPSBhY3RvcjtcbiAgICAgICAgICAgICAgICBjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbG9zZXN0QWN0b3I7XG59XG5cbi8qKlxuICogU2V0IGFsbCB0aGUgVGlsZSBvYmplY3RzIGluIGEgbWFwIHRvIHZpc2libGVcbiAqIEBwYXJhbSAge0FycmF5fSBtYXAgIEFuIGFycmF5IG9mIGFycmF5cyBvZiBUaWxlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VmlzaWJpbGl0eShtYXApIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IG1hcC5sZW5ndGg7IHkrKykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IG1hcFt5XS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgbWFwW3ldW3hdLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIG1hcFt5XVt4XS5saWdodGluZ0NvbG9yID0gQ09MT1JfQU1CSUVOVF9MSUdIVDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBTZXQgYWxsIHRoZSBUaWxlIG9iamVjdHMgaW4gYSBtYXAgdG8gZXhwbG9yZWRcbiAqIEBwYXJhbSAge0FycmF5fSBtYXAgIEFuIGFycmF5IG9mIGFycmF5cyBvZiBUaWxlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEFsbFRvRXhwbG9yZWQobWFwKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBtYXAubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBtYXBbeV0ubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIG1hcFt5XVt4XS5leHBsb3JlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQ2FsbHMgZHJhd1RpbGUgb24gYW4gYXJyYXkgb2YgVGlsZSBhcnJheXNcbiAqIEBwYXJhbSAge09iamVjdH0gZGlzcGxheSBUaGUgUk9UIGRpc3BsYXlcbiAqIEBwYXJhbSAge0FycmF5fSBtYXAgICAgICBBbiBhcnJheSBvZiBhcnJheXMgb2YgVGlsZXNcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3TWFwKGRpc3BsYXksIG1hcCkge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgbWFwLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgbWFwW3ldLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICBkcmF3VGlsZShkaXNwbGF5LCBtYXBbeV1beF0sIHgsIHkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiKGZ1bmN0aW9uKG5hbWUsZGF0YSl7XG4gaWYodHlwZW9mIG9uVGlsZU1hcExvYWRlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgaWYodHlwZW9mIFRpbGVNYXBzID09PSAndW5kZWZpbmVkJykgVGlsZU1hcHMgPSB7fTtcbiAgVGlsZU1hcHNbbmFtZV0gPSBkYXRhO1xuIH0gZWxzZSB7XG4gIG9uVGlsZU1hcExvYWRlZChuYW1lLGRhdGEpO1xuIH1cbiBpZih0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBkYXRhO1xuIH19KShcImRldl9yb29tXCIsXG57IFwiY29tcHJlc3Npb25sZXZlbFwiOi0xLFxuIFwiaGVpZ2h0XCI6MzksXG4gXCJpbmZpbml0ZVwiOmZhbHNlLFxuIFwibGF5ZXJzXCI6W1xuICAgICAgICB7XG4gICAgICAgICBcImRhdGFcIjpbMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OF0sXG4gICAgICAgICBcImhlaWdodFwiOjM5LFxuICAgICAgICAgXCJpZFwiOjEsXG4gICAgICAgICBcIm5hbWVcIjpcIlRpbGUgTGF5ZXIgMVwiLFxuICAgICAgICAgXCJvcGFjaXR5XCI6MSxcbiAgICAgICAgIFwidHlwZVwiOlwidGlsZWxheWVyXCIsXG4gICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgXCJ3aWR0aFwiOjcwLFxuICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgIFwieVwiOjBcbiAgICAgICAgfSwgXG4gICAgICAgIHtcbiAgICAgICAgIFwiZHJhd29yZGVyXCI6XCJ0b3Bkb3duXCIsXG4gICAgICAgICBcImlkXCI6MixcbiAgICAgICAgIFwibmFtZVwiOlwiT2JqZWN0IExheWVyIDFcIixcbiAgICAgICAgIFwib2JqZWN0c1wiOltcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjEsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiUGxheWVyXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwicGxheWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjg4MC4yNTAwMzU0NjI4MjUsXG4gICAgICAgICAgICAgICAgIFwieVwiOjc1NC4xOTIxOTc4NTA1ODRcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjIsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiRG9vclwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImRvb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTI5Ny40NTg4OTM4NzE0NSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NjI3LjgwMjY5MDU4Mjk2XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjozLFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkdvYmxpblwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImdvYmxpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjoxMjk3LjQ1ODg5Mzg3MTQ1LFxuICAgICAgICAgICAgICAgICBcInlcIjo0ODguNzg5MjM3NjY4MTYxXG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjo0LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkNoZXN0XCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiY2hlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpbnZlbnRvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImhlYWx0aF9wb3Rpb25fd2VhayxsaWdodG5pbmdfc2Nyb2xsX3dlYWtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTIwMS43OTM3MjE5NzMwOSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6ODg3Ljg5MjM3NjY4MTYxNFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6NSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJMYW50ZXJuXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibGFudGVyblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjoxMTM5Ljc2MDgzNzA3MDI1LFxuICAgICAgICAgICAgICAgICBcInlcIjo3NTcuODQ3NTMzNjMyMjg3XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjo2LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkNoZXN0XCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiY2hlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpbnZlbnRvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImhlYWx0aF9wb3Rpb25fd2VhayxoZWFsdGhfcG90aW9uX3dlYWtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTAzOC44NjM5NzYwODM3MSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6ODg3LjE0NDk5MjUyNjE1OFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6NyxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJNYWdpa2EgU2hyaW5lXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibWFnaWNfc2hyaW5lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwic3BlbGxJZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibGlnaHRuaW5nX2JvbHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTQyNS4yNjE1ODQ0NTQ0MSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NzYwLjgzNzA3MDI1NDExMVxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6OCxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJDcmF0ZVwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImNyYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaW52ZW50b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJoZWFsdGhfcG90aW9uX3dlYWtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTEzNS4yNzY1MzIxMzc1MixcbiAgICAgICAgICAgICAgICAgXCJ5XCI6ODg3LjE0NDk5MjUyNjE1OFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6OSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJEb29yXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiZG9vclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjoxMDM5LjYxMTM2MDIzOTE2LFxuICAgICAgICAgICAgICAgICBcInlcIjo2MzAuNzkyMjI3MjA0NzgzXG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxMCxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJHb2JsaW4gQnJ1dGVcIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJnb2JsaW5fYnJ1dGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTA0My4zNDgyODEwMTY0NCxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NTA3LjQ3Mzg0MTU1NDU1OVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgXCJvcGFjaXR5XCI6MSxcbiAgICAgICAgIFwidHlwZVwiOlwib2JqZWN0Z3JvdXBcIixcbiAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICBcInhcIjowLFxuICAgICAgICAgXCJ5XCI6MFxuICAgICAgICB9XSxcbiBcIm5leHRsYXllcmlkXCI6MyxcbiBcIm5leHRvYmplY3RpZFwiOjExLFxuIFwib3JpZW50YXRpb25cIjpcIm9ydGhvZ29uYWxcIixcbiBcInJlbmRlcm9yZGVyXCI6XCJyaWdodC1kb3duXCIsXG4gXCJ0aWxlZHZlcnNpb25cIjpcIjEuMy40XCIsXG4gXCJ0aWxlaGVpZ2h0XCI6MzIsXG4gXCJ0aWxlc2V0c1wiOltcbiAgICAgICAge1xuICAgICAgICAgXCJmaXJzdGdpZFwiOjEsXG4gICAgICAgICBcInNvdXJjZVwiOlwiLi5cXC9EdW5nZW9uQ3Jhd2xfUHJvamVjdFV0dW1ub1RpbGVzZXQudHN4XCJcbiAgICAgICAgfV0sXG4gXCJ0aWxld2lkdGhcIjozMixcbiBcInR5cGVcIjpcIm1hcFwiLFxuIFwidmVyc2lvblwiOjEuMixcbiBcIndpZHRoXCI6NzBcbn0pOyIsIihmdW5jdGlvbihuYW1lLGRhdGEpe1xuIGlmKHR5cGVvZiBvblRpbGVNYXBMb2FkZWQgPT09ICd1bmRlZmluZWQnKSB7XG4gIGlmKHR5cGVvZiBUaWxlTWFwcyA9PT0gJ3VuZGVmaW5lZCcpIFRpbGVNYXBzID0ge307XG4gIFRpbGVNYXBzW25hbWVdID0gZGF0YTtcbiB9IGVsc2Uge1xuICBvblRpbGVNYXBMb2FkZWQobmFtZSxkYXRhKTtcbiB9XG4gaWYodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZGF0YTtcbiB9fSkoXCJsZXZlbF8xXCIsXG57IFwiY29tcHJlc3Npb25sZXZlbFwiOi0xLFxuIFwiZWRpdG9yc2V0dGluZ3NcIjpcbiAgICB7XG4gICAgIFwiZXhwb3J0XCI6XG4gICAgICAgIHtcbiAgICAgICAgIFwidGFyZ2V0XCI6XCIuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gXCJoZWlnaHRcIjozOSxcbiBcImluZmluaXRlXCI6ZmFsc2UsXG4gXCJsYXllcnNcIjpbXG4gICAgICAgIHtcbiAgICAgICAgIFwiZGF0YVwiOlsxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4XSxcbiAgICAgICAgIFwiaGVpZ2h0XCI6MzksXG4gICAgICAgICBcImlkXCI6MSxcbiAgICAgICAgIFwibmFtZVwiOlwiV29ybGRcIixcbiAgICAgICAgIFwib3BhY2l0eVwiOjEsXG4gICAgICAgICBcInR5cGVcIjpcInRpbGVsYXllclwiLFxuICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgIFwid2lkdGhcIjo3MCxcbiAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICBcInlcIjowXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICBcImRyYXdvcmRlclwiOlwidG9wZG93blwiLFxuICAgICAgICAgXCJpZFwiOjQsXG4gICAgICAgICBcIm5hbWVcIjpcIk9iamVjdCBMYXllciAxXCIsXG4gICAgICAgICBcIm9iamVjdHNcIjpbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjo0LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlBsYXllclwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcInBsYXllclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjo0MzQuNDA3MjE0ODg1NzMyLFxuICAgICAgICAgICAgICAgICBcInlcIjo1OTcuNDI2MjU4OTY5NThcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjUsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiUmF0XCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwicmF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjEwMzQuMjEzMDY1ODEzMTUsXG4gICAgICAgICAgICAgICAgIFwieVwiOjYzNy45Nzk0NTAxNzIyMzdcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjEwLFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlJhdFwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcInJhdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjo5NDYuNjQ3NzgwOTI1NDAyLFxuICAgICAgICAgICAgICAgICBcInlcIjoxMTkyLjE2MjQxNzM3NDg4XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxMSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJEb29yXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibG9hZF9kb29yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwibGV2ZWxOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJsZXZlbF8yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjE1NTMuMzUyMjE5MDc0NixcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NTY3Ljg1Mzk2MDU5NTU2MlxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MTIsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiTGFudGVyblwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImxhbnRlcm5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTQ5Mi4wOTg4NDQ3NDI2NSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NDQzLjQyNzk1OTkxNjkyXG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxNyxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJDcmF0ZVwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImNyYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaW52ZW50b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJoZWFsdGhfcG90aW9uX3dlYWtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6NTI4LjU2NTY5NjAzODIyOSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NTIuMTgyMjIwMTI1OTkxMlxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MTgsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiTGFudGVyblwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImxhbnRlcm5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTQ4OC4zMjkwOTYzNzE2MixcbiAgICAgICAgICAgICAgICAgXCJ5XCI6Njk1LjYzMjA3NzY1MTk1M1xuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MTksXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiUmF0XCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwicmF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjY4MS43NjU2NTc0OTk0MjIsXG4gICAgICAgICAgICAgICAgIFwieVwiOjk3LjA2NDk0MTA2NzcxNDVcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgIFwib3BhY2l0eVwiOjEsXG4gICAgICAgICBcInR5cGVcIjpcIm9iamVjdGdyb3VwXCIsXG4gICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgIFwieVwiOjBcbiAgICAgICAgfV0sXG4gXCJuZXh0bGF5ZXJpZFwiOjUsXG4gXCJuZXh0b2JqZWN0aWRcIjoyMCxcbiBcIm9yaWVudGF0aW9uXCI6XCJvcnRob2dvbmFsXCIsXG4gXCJyZW5kZXJvcmRlclwiOlwicmlnaHQtZG93blwiLFxuIFwidGlsZWR2ZXJzaW9uXCI6XCIxLjMuNFwiLFxuIFwidGlsZWhlaWdodFwiOjMyLFxuIFwidGlsZXNldHNcIjpbXG4gICAgICAgIHtcbiAgICAgICAgIFwiZmlyc3RnaWRcIjoxLFxuICAgICAgICAgXCJzb3VyY2VcIjpcIi4uXFwvRHVuZ2VvbkNyYXdsX1Byb2plY3RVdHVtbm9UaWxlc2V0LnRzeFwiXG4gICAgICAgIH1dLFxuIFwidGlsZXdpZHRoXCI6MzIsXG4gXCJ0eXBlXCI6XCJtYXBcIixcbiBcInZlcnNpb25cIjoxLjIsXG4gXCJ3aWR0aFwiOjcwXG59KTsiLCIoZnVuY3Rpb24obmFtZSxkYXRhKXtcbiBpZih0eXBlb2Ygb25UaWxlTWFwTG9hZGVkID09PSAndW5kZWZpbmVkJykge1xuICBpZih0eXBlb2YgVGlsZU1hcHMgPT09ICd1bmRlZmluZWQnKSBUaWxlTWFwcyA9IHt9O1xuICBUaWxlTWFwc1tuYW1lXSA9IGRhdGE7XG4gfSBlbHNlIHtcbiAgb25UaWxlTWFwTG9hZGVkKG5hbWUsZGF0YSk7XG4gfVxuIGlmKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGRhdGE7XG4gfX0pKFwibGV2ZWxfMlwiLFxueyBcImNvbXByZXNzaW9ubGV2ZWxcIjotMSxcbiBcImVkaXRvcnNldHRpbmdzXCI6XG4gICAge1xuICAgICBcImV4cG9ydFwiOlxuICAgICAgICB7XG4gICAgICAgICBcInRhcmdldFwiOlwiLlwiXG4gICAgICAgIH1cbiAgICB9LFxuIFwiaGVpZ2h0XCI6MzksXG4gXCJpbmZpbml0ZVwiOmZhbHNlLFxuIFwibGF5ZXJzXCI6W1xuICAgICAgICB7XG4gICAgICAgICBcImRhdGFcIjpbMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgMjkzNiwgMjkzNiwgMjkzNiwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDhdLFxuICAgICAgICAgXCJoZWlnaHRcIjozOSxcbiAgICAgICAgIFwiaWRcIjoxLFxuICAgICAgICAgXCJuYW1lXCI6XCJXb3JsZFwiLFxuICAgICAgICAgXCJvcGFjaXR5XCI6MSxcbiAgICAgICAgIFwidHlwZVwiOlwidGlsZWxheWVyXCIsXG4gICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgXCJ3aWR0aFwiOjcwLFxuICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgIFwieVwiOjBcbiAgICAgICAgfSwgXG4gICAgICAgIHtcbiAgICAgICAgIFwiZHJhd29yZGVyXCI6XCJ0b3Bkb3duXCIsXG4gICAgICAgICBcImlkXCI6NCxcbiAgICAgICAgIFwibmFtZVwiOlwiT2JqZWN0IExheWVyIDFcIixcbiAgICAgICAgIFwib2JqZWN0c1wiOltcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjQsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiUGxheWVyXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwicGxheWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjQ4Ljk3MzA4OTM0NDQ3NjIsXG4gICAgICAgICAgICAgICAgIFwieVwiOjcyNy45MTE1NzM3Njk3MlxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6NSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJHb2xiaW5cIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJnb2JsaW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6NjQ0LjE5MzcxOTQ0NDA1MixcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NzEyLjMzMDU0MDcwODYzOFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6NixcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJDaGVzdFwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImNoZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaW52ZW50b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJoZWFsdGhfcG90aW9uX3dlYWssbGlnaHRuaW5nX3Njcm9sbF93ZWFrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjM0MS41MjYyNzUzOTc0MjUsXG4gICAgICAgICAgICAgICAgIFwieVwiOjk0OC42NzI5Njc4NTA2NTJcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjcsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiU3RhaXJzXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwic3RhaXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwibGV2ZWxOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJsZXZlbF8yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjEyMDIuMzA3ODg1NjEyMTEsXG4gICAgICAgICAgICAgICAgIFwieVwiOjI0Ny45Mzc3NDc1NjQ5NzZcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjgsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiQ3JhdGVcIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJjcmF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImludmVudG9yeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaGVhbHRoX3BvdGlvbl93ZWFrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjM3MC42MTcyNjE1NTQxMzIsXG4gICAgICAgICAgICAgICAgIFwieVwiOjk0OS45NDc5MjY5MDU4M1xuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6OSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJDcmF0ZVwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImNyYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaW52ZW50b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6OTQ0LjcyOTc3NjMyMTA4NCxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NzI1LjMzMzM0MDg0MjA2N1xuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MTEsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiQ3JhdGVcIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJjcmF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImludmVudG9yeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaGVhbHRoX3BvdGlvbl93ZWFrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjk0My42MDM5MDY4OTI4MTksXG4gICAgICAgICAgICAgICAgIFwieVwiOjc2MC4xODI0Njg0ODM2NTVcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjEyLFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkdvbGJpblwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImdvYmxpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjozNDAuNTQ1NTk2MDQ0NDQyLFxuICAgICAgICAgICAgICAgICBcInlcIjoxMDgzLjI2MDk3ODMxNzMxXG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxNCxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJGaXJlXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiY2FtcGZpcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6NjU4Ljc4MTcxMDI5NDgyNSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6MjM3LjIwMTk4MDEyNTUxOFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MTUsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiRmlyZVwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImNhbXBmaXJlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjc4Ni4yNTg2MTg2MDQwODgsXG4gICAgICAgICAgICAgICAgIFwieVwiOjIzOC4yOTY4NDI4NjkyMzlcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjE2LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkZpcmVcIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJjYW1wZmlyZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjo5MTAuODUwMzY4OTM2NzM2LFxuICAgICAgICAgICAgICAgICBcInlcIjoyMzkuNTA2NDcxNTEzMjQ1XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxNyxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJMYW50ZXJuXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibGFudGVyblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjoyMDkuMjY1NzU1NDEzMDg4LFxuICAgICAgICAgICAgICAgICBcInlcIjo5NTEuOTc3NzQyODMyOTVcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjE4LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkdvbGJpblwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImdvYmxpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjo5NDkuNTU4NDg1NTQ0OTM4LFxuICAgICAgICAgICAgICAgICBcInlcIjoxNDUuMTU1NDM3MjgwNzU1XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxOSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJHb2xiaW5cIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJnb2JsaW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6NjIyLjk1ODc1MTY2MzIzOSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6MTQ3LjU3NDY5NDU2ODc2N1xuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MjAsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiUmF0XCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwicmF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjI0NC4zNDQ5ODYwODkyNzEsXG4gICAgICAgICAgICAgICAgIFwieVwiOjIyNi4yMDA1NTY0MjkxNzZcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjIyLFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkxvYWQgRG9vclwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImxvYWRfZG9vclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImxldmVsTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibGV2ZWxfMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjoxNC42MDU0MTgxMzg5ODcsXG4gICAgICAgICAgICAgICAgIFwieVwiOjcyMy4yMDM3NjkxNDAxNjVcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjI5LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkRvb3JcIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJkb29yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjUyNi45MTAwNDg5MjczNjIsXG4gICAgICAgICAgICAgICAgIFwieVwiOjcyOC4yNjQ5NjA0ODE3NDZcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgIFwib3BhY2l0eVwiOjEsXG4gICAgICAgICBcInR5cGVcIjpcIm9iamVjdGdyb3VwXCIsXG4gICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgIFwieVwiOjBcbiAgICAgICAgfV0sXG4gXCJuZXh0bGF5ZXJpZFwiOjUsXG4gXCJuZXh0b2JqZWN0aWRcIjozMCxcbiBcIm9yaWVudGF0aW9uXCI6XCJvcnRob2dvbmFsXCIsXG4gXCJyZW5kZXJvcmRlclwiOlwicmlnaHQtZG93blwiLFxuIFwidGlsZWR2ZXJzaW9uXCI6XCIxLjMuNFwiLFxuIFwidGlsZWhlaWdodFwiOjMyLFxuIFwidGlsZXNldHNcIjpbXG4gICAgICAgIHtcbiAgICAgICAgIFwiZmlyc3RnaWRcIjoxLFxuICAgICAgICAgXCJzb3VyY2VcIjpcIi4uXFwvRHVuZ2VvbkNyYXdsX1Byb2plY3RVdHVtbm9UaWxlc2V0LnRzeFwiXG4gICAgICAgIH1dLFxuIFwidGlsZXdpZHRoXCI6MzIsXG4gXCJ0eXBlXCI6XCJtYXBcIixcbiBcInZlcnNpb25cIjoxLjIsXG4gXCJ3aWR0aFwiOjcwXG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUk5HIH0gZnJvbSBcInJvdC1qc1wiO1xuXG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiLi9nbG9iYWxzXCI7XG5pbXBvcnQgeyBPYmplY3REYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xuaW1wb3J0IHsgQmFzaWNNb25zdGVyQUksIFBhdHJvbGxpbmdNb25zdGVyQUksIENoZXN0QUksIERyb3BwZWRJdGVtQUkgfSBmcm9tIFwiLi9haVwiO1xuaW1wb3J0IHsgUGxheWVyQ29udHJvbEFJIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBHaXZlSXRlbXNJbnRlcmFjdGFibGUsIEdpdmVTcGVsbEludGVyYWN0YWJsZSwgTG9hZExldmVsSW50ZXJhY3RhYmxlLCBEb29ySW50ZXJhY3RhYmxlIH0gZnJvbSBcIi4vaW50ZXJhY3RhYmxlXCI7XG5pbXBvcnQgeyBCYXNpY0ludmVudG9yeSB9IGZyb20gXCIuL2ludmVudG9yeVwiO1xuaW1wb3J0IHsgQmFzaWNHcmFwaGljcywgRHJhd0FmdGVyU2VlbiB9IGZyb20gXCIuL2dyYXBoaWNzXCI7XG5pbXBvcnQgeyBSZWZsZWN0aXZpdHlMaWdodGluZywgUGxheWVyTGlnaHRpbmcgfSBmcm9tIFwiLi9saWdodGluZ1wiO1xuaW1wb3J0IHsgQmFzaWNGaWdodGVyIH0gZnJvbSBcIi4vZmlnaHRlclwiO1xuXG5cbi8qKlxuICogQmFzZSBjbGFzcyByZXByZXNlbnRpbmcgYWxsIG9iamVjdHMgaW4gdGhlIGdhbWUuIFVzZXMgdGhlXG4gKiBFbnRpdHkvQ29tcG9uZW50IGRlc2lnbiBwYXR0ZXJuIHNvIHRoYXQgdGhlIG9ubHkgdGhpbmcgdGhhdFxuICogdGhpcyBvYmplY3QgZGlyZWN0bHkgY29udHJvbHMgaXMgaXRzIHBvc2l0aW9uLCB3aGV0aGVyIGl0XG4gKiBoYXMgY29sbGlzaW9uLCBhbmQgaXRzIG5hbWUuXG4gKlxuICogVGhlIGFjdCBtZXRob2QgaXMgdGhlIG1ldGhvZCBjYWxsZWQgYnkgdGhlIGVuZ2luZSBldmVyeSB0dXJuLlxuICovXG5jbGFzcyBHYW1lT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCB4LCB5LCBuYW1lLCBibG9ja3M9ZmFsc2UsIGJsb2Nrc1NpZ2h0PWZhbHNlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuYmxvY2tzID0gYmxvY2tzO1xuICAgICAgICB0aGlzLmJsb2Nrc1NpZ2h0ID0gYmxvY2tzU2lnaHQ7XG5cbiAgICAgICAgdGhpcy5ncmFwaGljcyA9IG51bGw7XG4gICAgICAgIHRoaXMubGlnaHRpbmcgPSBudWxsO1xuICAgICAgICB0aGlzLmZpZ2h0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmFpID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlDb21wb25lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmludGVyYWN0YWJsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgc2V0R3JhcGhpY3MoZ3JhcGhpY3MpIHtcbiAgICAgICAgZ3JhcGhpY3Muc2V0T3duZXIodGhpcyk7XG4gICAgICAgIHRoaXMuZ3JhcGhpY3MgPSBncmFwaGljcztcbiAgICB9XG5cbiAgICBzZXRMaWdodGluZyhsaWdodGluZykge1xuICAgICAgICBsaWdodGluZy5zZXRPd25lcih0aGlzKTtcbiAgICAgICAgdGhpcy5saWdodGluZyA9IGxpZ2h0aW5nO1xuICAgIH1cblxuICAgIHNldEZpZ2h0ZXIoZmlnaHRlcikge1xuICAgICAgICBmaWdodGVyLnNldE93bmVyKHRoaXMpO1xuICAgICAgICB0aGlzLmZpZ2h0ZXIgPSBmaWdodGVyO1xuICAgIH1cblxuICAgIHNldEFJKGFpKSB7XG4gICAgICAgIGFpLnNldE93bmVyKHRoaXMpO1xuICAgICAgICB0aGlzLmFpID0gYWk7XG4gICAgfVxuXG4gICAgc2V0SW52ZW50b3J5KGludmVudG9yeUNvbXBvbmVudCkge1xuICAgICAgICBpbnZlbnRvcnlDb21wb25lbnQuc2V0T3duZXIodGhpcyk7XG4gICAgICAgIHRoaXMuaW52ZW50b3J5Q29tcG9uZW50ID0gaW52ZW50b3J5Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHNldEludGVyYWN0YWJsZShpbnRlcmFjdGFibGUpIHtcbiAgICAgICAgaW50ZXJhY3RhYmxlLnNldE93bmVyKHRoaXMpO1xuICAgICAgICB0aGlzLmludGVyYWN0YWJsZSA9IGludGVyYWN0YWJsZTtcbiAgICB9XG5cbiAgICBhY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmFpICYmIHR5cGVvZiB0aGlzLmFpLmFjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmFpLmFjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZpZ2h0ZXIgJiYgdHlwZW9mIHRoaXMuZmlnaHRlci5hY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpcy5maWdodGVyLmFjdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFVzZSBhbiBpZCB0byBncmFiIG9iamVjdCBkYXRhIGFuZCBjcmVhdGUgYSBuZXcgR2FtZU9iamVjdFxuICogQHBhcmFtICB7U3RyaW5nfSBpZCAgICAgVGhlIG9iamVjdCBpZFxuICogQHJldHVybiB7R2FtZU9iamVjdH0gICAgQSBHYW1lT2JqZWN0IHdpdGggdGhlIGNvbXBvbmVudHMgYW5kIHBhcmFtcyBnaXZlbiBpbiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT2JqZWN0KGlkLCB4PTAsIHk9MCkge1xuICAgIGlmICghKGlkIGluIE9iamVjdERhdGEpKSB7IHRocm93IG5ldyBFcnJvcihgJHtpZH0gaXMgbm90IHZhbGlkIG9iamVjdCBpZGApOyB9XG5cbiAgICBjb25zdCBkYXRhID0gT2JqZWN0RGF0YVtpZF07XG4gICAgY29uc3Qgb2JqZWN0ID0gbmV3IEdhbWVPYmplY3QoXG4gICAgICAgIGlkLFxuICAgICAgICB4LCB5LFxuICAgICAgICBkYXRhLm5hbWUsXG4gICAgICAgIGRhdGEuYmxvY2tzLFxuICAgICAgICBkYXRhLmJsb2Nrc1NpZ2h0XG4gICAgKTtcblxuICAgIGlmIChkYXRhLmFpKSB7XG4gICAgICAgIHN3aXRjaCAoZGF0YS5haSkge1xuICAgICAgICBjYXNlIFwicGxheWVyX2NvbnRyb2xfYWlcIjpcbiAgICAgICAgICAgIG9iamVjdC5zZXRBSShuZXcgUGxheWVyQ29udHJvbEFJKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJiYXNpY19tb25zdGVyX2FpXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0QUkobmV3IEJhc2ljTW9uc3RlckFJKGRhdGEuc2lnaHRSYW5nZSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJwYXRyb2xsaW5nX21vbnN0ZXJfYWlcIjpcbiAgICAgICAgICAgIG9iamVjdC5zZXRBSShuZXcgUGF0cm9sbGluZ01vbnN0ZXJBSShkYXRhLnNpZ2h0UmFuZ2UpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY2hlc3RfYWlcIjpcbiAgICAgICAgICAgIG9iamVjdC5zZXRBSShuZXcgQ2hlc3RBSShkYXRhLmJnQ29sb3IsIGRhdGEuZW1wdHlDb2xvcikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkcm9wcGVkX2l0ZW1fYWlcIjpcbiAgICAgICAgICAgIG9iamVjdC5zZXRBSShuZXcgRHJvcHBlZEl0ZW1BSSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5oYW5kbGVkIEFJIHR5cGUgJHtkYXRhLmFpfWApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGF0YS5ncmFwaGljcykge1xuICAgICAgICBzd2l0Y2ggKGRhdGEuZ3JhcGhpY3MpIHtcbiAgICAgICAgY2FzZSBcImJhc2ljX2dyYXBoaWNzXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0R3JhcGhpY3MobmV3IEJhc2ljR3JhcGhpY3MoZGF0YS5jaGFyLCBkYXRhLmZnQ29sb3IsIGRhdGEuYmdDb2xvcikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkcmF3X2FmdGVyX3NlZW5cIjpcbiAgICAgICAgICAgIG9iamVjdC5zZXRHcmFwaGljcyhuZXcgRHJhd0FmdGVyU2VlbihkYXRhLmNoYXIsIGRhdGEuZmdDb2xvciwgZGF0YS5iZ0NvbG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuaGFuZGxlZCBHcmFwaGljcyB0eXBlICR7ZGF0YS5ncmFwaGljc31gKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRhdGEubGlnaHRpbmcpIHtcbiAgICAgICAgc3dpdGNoIChkYXRhLmxpZ2h0aW5nKSB7XG4gICAgICAgIGNhc2UgXCJyZWZsZWN0aXZpdHlcIjpcbiAgICAgICAgICAgIG9iamVjdC5zZXRMaWdodGluZyhuZXcgUmVmbGVjdGl2aXR5TGlnaHRpbmcoZGF0YS5saWdodGluZ0NvbG9yLCBkYXRhLmxpZ2h0aW5nUmFuZ2UpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicGxheWVyX2xpZ2h0aW5nXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0TGlnaHRpbmcobmV3IFBsYXllckxpZ2h0aW5nKGRhdGEubGlnaHRpbmdDb2xvciwgZGF0YS5saWdodGluZ1JhbmdlKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuaGFuZGxlZCBMaWdodGluZyB0eXBlICR7ZGF0YS5saWdodGluZ31gKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuZmlnaHRlcikge1xuICAgICAgICBsZXQgY2FsbGJhY2s7XG5cbiAgICAgICAgc3dpdGNoIChkYXRhLm9uRGVhdGgpIHtcbiAgICAgICAgY2FzZSBcImRlZmF1bHRcIjpcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZW5lbXlEZWF0aENhbGxiYWNrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZW1vdmVGcm9tV29ybGRcIjpcbiAgICAgICAgICAgIGNhbGxiYWNrID0gcmVtb3ZlRGVhdGhDYWxsYmFjaztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5oYW5kbGVkIG9uRGVhdGggdHlwZSAke2RhdGEub25EZWF0aH1gKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChkYXRhLmZpZ2h0ZXIpIHtcbiAgICAgICAgY2FzZSBcImJhc2ljX2ZpZ2h0ZXJcIjpcbiAgICAgICAgICAgIG9iamVjdC5zZXRGaWdodGVyKG5ldyBCYXNpY0ZpZ2h0ZXIoXG4gICAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuaGFuZGxlZCBGaWdodGVyIHR5cGUgJHtkYXRhLmZpZ2h0ZXJ9YCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkYXRhLmludmVudG9yeSkge1xuICAgICAgICBzd2l0Y2ggKGRhdGEuaW52ZW50b3J5KSB7XG4gICAgICAgIGNhc2UgXCJiYXNpY19pbnZlbnRvcnlcIjpcbiAgICAgICAgICAgIG9iamVjdC5zZXRJbnZlbnRvcnkobmV3IEJhc2ljSW52ZW50b3J5KCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmhhbmRsZWQgSW52ZW50b3J5IHR5cGUgJHtkYXRhLmludmVudG9yeX1gKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEuaW52ZW50b3J5UG9vbCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmludmVudG9yeVBvb2wubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoUk5HLmdldFVuaWZvcm0oKSA8PSBkYXRhLmludmVudG9yeVBvb2xbaV1bMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LmludmVudG9yeUNvbXBvbmVudC5hZGRJdGVtKGRhdGEuaW52ZW50b3J5UG9vbFtpXVswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuaW50ZXJhY3RhYmxlKSB7XG4gICAgICAgIHN3aXRjaCAoZGF0YS5pbnRlcmFjdGFibGUpIHtcbiAgICAgICAgY2FzZSBcImdpdmVfaXRlbXNfaW50ZXJhY3RhYmxlXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0SW50ZXJhY3RhYmxlKG5ldyBHaXZlSXRlbXNJbnRlcmFjdGFibGUoKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImdpdmVfc3BlbGxfaW50ZXJhY3RhYmxlXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0SW50ZXJhY3RhYmxlKG5ldyBHaXZlU3BlbGxJbnRlcmFjdGFibGUoKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImxvYWRfbGV2ZWxfaW50ZXJhY3RhYmxlXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0SW50ZXJhY3RhYmxlKG5ldyBMb2FkTGV2ZWxJbnRlcmFjdGFibGUoKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvb3JfaW50ZXJhY3RhYmxlXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0SW50ZXJhY3RhYmxlKG5ldyBEb29ySW50ZXJhY3RhYmxlKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmhhbmRsZWQgSW50ZXJhY3RhYmxlIHR5cGUgJHtkYXRhLmludGVyYWN0YWJsZX1gKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBBSSwgZmlnaHRlciwgYW5kIGludHJhY3RhYmxlIG9mZiBvZiBhbiBvYmplY3QuIENoYW5nZXMgZ3JhcGhpY3NcbiAqIHRvIGRlYWQgYm9keSBncmFwaGljcyBhbmQgc2V0cyBibG9ja2luZyB0byBmYWxzZS4gQWxzbyBzcGF3bnMgYSBkcm9wcGVkIGl0ZW1cbiAqIGlmIHRoZXJlIHdlcmUgaXRlbXMgaW4gdGhlIGludmVudG9yeS5cbiAqXG4gKiBAcGFyYW0gIHtHYW1lT2JqZWN0fSB0YXJnZXQgICAgVGhlIEdhbWVPYmplY3QgdGhhdCB3YXMga2lsbGVkXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBlbmVteURlYXRoQ2FsbGJhY2sodGFyZ2V0KSB7XG4gICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKHRhcmdldC5uYW1lICsgXCIgaGFzIGJlZW4ga2lsbGVkXCIpO1xuICAgIHRhcmdldC5ncmFwaGljcy5jaGFyID0gXCIlXCI7XG4gICAgdGFyZ2V0LmdyYXBoaWNzLmZnQ29sb3IgPSBcImdyZWVuXCI7XG4gICAgdGFyZ2V0LmdyYXBoaWNzLmJnQ29sb3IgPSBcImRhcmtyZWRcIjtcbiAgICB0YXJnZXQuYmxvY2tzID0gZmFsc2U7XG4gICAgdGFyZ2V0LmZpZ2h0ZXIgPSBudWxsO1xuICAgIHRhcmdldC5haSA9IG51bGw7XG4gICAgdGFyZ2V0LmludGVyYWN0YWJsZSA9IG51bGw7XG4gICAgdGFyZ2V0Lm5hbWUgPSBcIlJlbWFpbnMgb2YgYSBcIiArIHRhcmdldC5uYW1lO1xuXG4gICAgaWYgKHRhcmdldC5pbnZlbnRvcnlDb21wb25lbnQuZ2V0SURzQW5kQ291bnRzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBpdGVtID0gY3JlYXRlT2JqZWN0KFwiZHJvcHBlZF9pdGVtXCIsIHRhcmdldC54LCB0YXJnZXQueSk7XG4gICAgICAgIGl0ZW0uaW52ZW50b3J5Q29tcG9uZW50ID0gdGFyZ2V0LmludmVudG9yeUNvbXBvbmVudDtcbiAgICAgICAgZ2xvYmFscy5HYW1lLmFkZE9iamVjdChpdGVtKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuaW52ZW50b3J5Q29tcG9uZW50ID0gbnVsbDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIHNlbGYgZnJvbSB3b3JsZCBhbmQgc2NoZWR1bGVyLiBBbHNvIHNwYXducyBhIGRyb3BwZWQgaXRlbVxuICogaWYgdGhlcmUgd2VyZSBpdGVtcyBpbiB0aGUgaW52ZW50b3J5LlxuICpcbiAqIEBwYXJhbSAge0dhbWVPYmplY3R9IHRhcmdldCAgICBUaGUgR2FtZU9iamVjdCB0aGF0IHdhcyBraWxsZWRcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHJlbW92ZURlYXRoQ2FsbGJhY2sodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5pbnZlbnRvcnlDb21wb25lbnQuZ2V0SURzQW5kQ291bnRzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBpdGVtID0gY3JlYXRlT2JqZWN0KFwiZHJvcHBlZF9pdGVtXCIsIHRhcmdldC54LCB0YXJnZXQueSk7XG4gICAgICAgIGl0ZW0uaW52ZW50b3J5Q29tcG9uZW50ID0gdGFyZ2V0LmludmVudG9yeUNvbXBvbmVudDtcbiAgICAgICAgZ2xvYmFscy5HYW1lLmFkZE9iamVjdChpdGVtKTtcbiAgICB9XG5cbiAgICBnbG9iYWxzLkdhbWUucmVtb3ZlT2JqZWN0KHRhcmdldCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRElSUyB9IGZyb20gXCJyb3QtanNcIjtcblxuaW1wb3J0IGdsb2JhbHMgZnJvbSBcIi4vZ2xvYmFsc1wiO1xuaW1wb3J0IHsgV0lEVEgsIFNwZWxsRGF0YSwgSXRlbURhdGEgfSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgeyBpc0Jsb2NrZWQgfSBmcm9tIFwiLi9tYXBcIjtcbmltcG9ydCB7IHNob3dTZWxlY3Rpb25NZW51LCBzaG93S2V5QmluZGluZ01lbnUgfSBmcm9tIFwiLi91aVwiO1xuXG4vKipcbiAgICByZXR1cm5zIHRydWUgd2hlbiBtb3ZlZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmZ1bmN0aW9uIG1vdmVDb21tYW5kKGFjdG9yLCBkaXJlY3Rpb24sIHRvcG9sb2d5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBkaXIgPSBESVJTW3RvcG9sb2d5XVtkaXJlY3Rpb25dO1xuICAgICAgICBjb25zdCBuZXdYID0gYWN0b3IueCArIGRpclswXTtcbiAgICAgICAgY29uc3QgbmV3WSA9IGFjdG9yLnkgKyBkaXJbMV07XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQmxvY2tlZChnbG9iYWxzLkdhbWUubWFwLCBnbG9iYWxzLkdhbWUuZ2FtZU9iamVjdHMsIG5ld1gsIG5ld1kpO1xuXG4gICAgICAgIGlmICh0YXJnZXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaW50ZXJhY3RhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmludGVyYWN0YWJsZS5pbnRlcmFjdChhY3Rvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXQuZmlnaHRlcikge1xuICAgICAgICAgICAgICAgIGFjdG9yLmZpZ2h0ZXIuYXR0YWNrKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhY3Rvci54ID0gbmV3WDtcbiAgICAgICAgYWN0b3IueSA9IG5ld1k7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldEl0ZW1Db21tYW5kKGFjdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IGdsb2JhbHMuR2FtZS5nYW1lT2JqZWN0cy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50eXBlID09PSBcImRyb3BwZWRfaXRlbVwiICYmIGl0ZW0ueCA9PT0gYWN0b3IueCAmJiBpdGVtLnkgPT09IGFjdG9yLnk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpdGVtc1swXS5pbnRlcmFjdGFibGUuaW50ZXJhY3QoYWN0b3IpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJUaGVyZSdzIG5vIGl0ZW0gdG8gcGljayB1cFwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIG9wZW5JbnZlbnRvcnlDb21tYW5kKGFjdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBzaG93U2VsZWN0aW9uTWVudShcbiAgICAgICAgICAgIFwiUGxheWVyIEludmVudG9yeVwiLFxuICAgICAgICAgICAgYWN0b3IuaW52ZW50b3J5Q29tcG9uZW50LmdldE5hbWVzQW5kQ291bnRzKCksXG4gICAgICAgICAgICBcImludmVudG9yeVwiLFxuICAgICAgICAgICAgV0lEVEhcbiAgICAgICAgKTtcbiAgICAgICAgYWN0b3IuYWkuc3RhdGUgPSBcImludmVudG9yeVwiO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gb3BlblNwZWxsc0NvbW1hbmQoYWN0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNob3dTZWxlY3Rpb25NZW51KFxuICAgICAgICAgICAgXCJTcGVsbHNcIixcbiAgICAgICAgICAgIGFjdG9yLmZpZ2h0ZXIuZ2V0S25vd25TcGVsbHMoKS5tYXAoZSA9PiBTcGVsbERhdGFbZV0pLFxuICAgICAgICAgICAgXCJzcGVsbHNcIixcbiAgICAgICAgICAgIFdJRFRIXG4gICAgICAgICk7XG4gICAgICAgIGFjdG9yLmFpLnN0YXRlID0gXCJzcGVsbF9zZWxlY3Rpb25cIjtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIG9wZW5LZXlCaW5kaW5nQ29tbWFuZChhY3Rvcikge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2hvd0tleUJpbmRpbmdNZW51KCk7XG4gICAgICAgIGFjdG9yLmFpLnN0YXRlID0gXCJrZXliaW5kaW5nXCI7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufVxuXG4vKipcbiAqIENvbnRyb2xzIHRoZSBwbGF5ZXIgY2hhcmFjdGVyIHRocm91Z2ggdXNlciBpbnB1dFxuICpcbiAqIFdoaWxlIGl0IHdvdWxkIHByb2JhYmx5IG1ha2Ugc2Vuc2UgdG8gbW92ZSBpbnB1dCBoYW5kbGluZyBjb2RlXG4gKiB0byB0aGUgR2FtZSBvYmplY3Qgc2luY2UgaXQgbW9kaWZpZXMgZ2FtZSBzdGF0ZSwgYnV0IHB1dHRpbmdcbiAqIGluIGFuIEFJIGNvbXBvbmVudCBtYWRlIHRoZSBjb2RlIGNsZWFuZXJcbiAqL1xuY2xhc3MgUGxheWVyQ29udHJvbEFJIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG51bGw7XG4gICAgICAgIHRoaXMua2V5Q29tbWFuZE1hcCA9IHt9O1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJub3JtYWxcIjtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICAgIHRoaXMua2V5Q29tbWFuZE1hcCA9IHtcbiAgICAgICAgICAgIFwid1wiOiBbXCJNb3ZlIFVwXCIsIG1vdmVDb21tYW5kKHRoaXMub3duZXIsIDAsIDgpXSxcbiAgICAgICAgICAgIFwiZVwiOiBbXCJNb3ZlIFVwIFJpZ2h0XCIsIG1vdmVDb21tYW5kKHRoaXMub3duZXIsIDEsIDgpXSxcbiAgICAgICAgICAgIFwiZFwiOiBbXCJNb3ZlIFJpZ2h0XCIsIG1vdmVDb21tYW5kKHRoaXMub3duZXIsIDIsIDgpXSxcbiAgICAgICAgICAgIFwiY1wiOiBbXCJNb3ZlIERvd24gUmlnaHRcIiwgbW92ZUNvbW1hbmQodGhpcy5vd25lciwgMywgOCldLFxuICAgICAgICAgICAgXCJzXCI6IFtcIk1vdmUgRG93blwiLCBtb3ZlQ29tbWFuZCh0aGlzLm93bmVyLCA0LCA4KV0sXG4gICAgICAgICAgICBcInpcIjogW1wiTW92ZSBEb3duIExlZnRcIiwgbW92ZUNvbW1hbmQodGhpcy5vd25lciwgNSwgOCldLFxuICAgICAgICAgICAgXCJhXCI6IFtcIk1vdmUgTGVmdFwiLCBtb3ZlQ29tbWFuZCh0aGlzLm93bmVyLCA2LCA4KV0sXG4gICAgICAgICAgICBcInFcIjogW1wiTW92ZSBVcCBMZWZ0XCIsIG1vdmVDb21tYW5kKHRoaXMub3duZXIsIDcsIDgpXSxcbiAgICAgICAgICAgIFwiaVwiOiBbXCJJbnZlbnRvcnlcIiwgb3BlbkludmVudG9yeUNvbW1hbmQodGhpcy5vd25lcildLFxuICAgICAgICAgICAgXCJnXCI6IFtcIkdldCBJdGVtXCIsIGdldEl0ZW1Db21tYW5kKHRoaXMub3duZXIpXSxcbiAgICAgICAgICAgIFwibVwiOiBbXCJTcGVsbHNcIiwgb3BlblNwZWxsc0NvbW1hbmQodGhpcy5vd25lcildLFxuICAgICAgICAgICAgXCJFc2NhcGVcIjogW1wiS2V5IEJpbmRpbmdzXCIsIG9wZW5LZXlCaW5kaW5nQ29tbWFuZCh0aGlzLm93bmVyKV1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhY3QoKSB7XG4gICAgICAgIGdsb2JhbHMuR2FtZS5lbmdpbmUubG9jaygpO1xuICAgICAgICAvKiB3YWl0IGZvciB1c2VyIGlucHV0OyBkbyBzdHVmZiB3aGVuIHVzZXIgaGl0cyBhIGtleSAqL1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlRXZlbnQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3duZXIuZmlnaHRlciA9PT0gbnVsbCB8fCB0aGlzLm93bmVyLmZpZ2h0ZXIuaHAgPD0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBrZXkgPSBlLmtleTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgICAgLyogb25lIG9mIG51bXBhZCBkaXJlY3Rpb25zPyAqL1xuICAgICAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMua2V5Q29tbWFuZE1hcCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFjdGVkID0gdGhpcy5rZXlDb21tYW5kTWFwW2tleV1bMV0oKTtcblxuICAgICAgICAgICAgaWYgKCFhY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09PSBcImludmVudG9yeVwiKSB7XG4gICAgICAgICAgICBjb25zdCBhQ29kZSA9IFwiYVwiLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICBjb25zdCB6Q29kZSA9IFwielwiLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICBjb25zdCBrZXlDb2RlID0ga2V5LmNoYXJDb2RlQXQoMCk7XG5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlIDwgYUNvZGUgJiYga2V5Q29kZSA+IHpDb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoa2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwibm9ybWFsXCI7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLm1hbmFnZXIuYWN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpbnZlbnRvcnlJbnB1dE1hcCA9IHt9O1xuICAgICAgICAgICAgY29uc3QgaW52ZW50b3J5SURzID0gdGhpcy5vd25lci5pbnZlbnRvcnlDb21wb25lbnQuZ2V0SURzQW5kQ291bnRzKCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW52ZW50b3J5SURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW52ZW50b3J5SW5wdXRNYXBbYUNvZGUgKyBpXSA9IGludmVudG9yeUlEc1tpXS5pZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEoa2V5Q29kZSBpbiBpbnZlbnRvcnlJbnB1dE1hcCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1EZXRhaWxzID0gSXRlbURhdGFbaW52ZW50b3J5SW5wdXRNYXBba2V5Q29kZV1dO1xuICAgICAgICAgICAgY29uc3QgdXNlQ2FsbGJhY2sgPSB1c2VkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmFpLnN0YXRlID0gXCJub3JtYWxcIjtcbiAgICAgICAgICAgICAgICBpZiAodXNlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmludmVudG9yeUNvbXBvbmVudC51c2VJdGVtKGludmVudG9yeUlucHV0TWFwW2tleUNvZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKFwiVXNlZCBcIiArIGl0ZW1EZXRhaWxzLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmVuZ2luZS51bmxvY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaXRlbURldGFpbHMudXNlRnVuYyhpdGVtRGV0YWlscywgdGhpcy5vd25lciwgdXNlQ2FsbGJhY2suYmluZCh0aGlzKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gXCJzcGVsbF9zZWxlY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc3QgYUNvZGUgPSBcImFcIi5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgY29uc3QgekNvZGUgPSBcInpcIi5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgY29uc3Qga2V5Q29kZSA9IGtleS5jaGFyQ29kZUF0KDApO1xuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA8IGFDb2RlICYmIGtleUNvZGUgPiB6Q29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIm5vcm1hbFwiO1xuICAgICAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5tYW5hZ2VyLmFjdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc3BlbGxJbnB1dE1hcCA9IHt9O1xuICAgICAgICAgICAgY29uc3Qgc3BlbGxJZHMgPSB0aGlzLm93bmVyLmZpZ2h0ZXIuZ2V0S25vd25TcGVsbHMoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGVsbElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNwZWxsSW5wdXRNYXBbYUNvZGUgKyBpXSA9IHNwZWxsSWRzW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShrZXlDb2RlIGluIHNwZWxsSW5wdXRNYXApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBkZXRhaWxzID0gU3BlbGxEYXRhW3NwZWxsSW5wdXRNYXBba2V5Q29kZV1dO1xuXG4gICAgICAgICAgICBpZiAoZGV0YWlscy5tYW5hQ29zdCA+IHRoaXMub3duZXIuZmlnaHRlci5tYW5hKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKGBOb3QgZW5vdWdoIG1hbmEgdG8gY2FzdCAke2RldGFpbHMubmFtZX1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVzZUNhbGxiYWNrID0gdXNlZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci5haS5zdGF0ZSA9IFwibm9ybWFsXCI7XG4gICAgICAgICAgICAgICAgaWYgKHVzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vd25lci5maWdodGVyLnVzZU1hbmEoZGV0YWlscy5tYW5hQ29zdCk7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5lbmdpbmUudW5sb2NrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRldGFpbHMudXNlRnVuYyhkZXRhaWxzLCB0aGlzLm93bmVyLCB1c2VDYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09PSBcImtleWJpbmRpbmdcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXggbWVcIik7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcyk7XG4gICAgICAgIGdsb2JhbHMuR2FtZS5lbmdpbmUudW5sb2NrKCk7XG4gICAgfVxufVxuZXhwb3J0IHsgUGxheWVyQ29udHJvbEFJIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGdsb2JhbHMgZnJvbSBcIi4vZ2xvYmFsc1wiO1xuaW1wb3J0IHtcbiAgICBXSURUSCxcbiAgICBIRUlHSFQsXG4gICAgVUlfSEVJR0hULFxuICAgIE1BUF9GSUxMRURfU1BBQ0UsXG4gICAgTUFQX0VNUFRZX1NQQUNFLFxuICAgIExFVkVMX1VQX0JBU0UsXG4gICAgTEVWRUxfVVBfRkFDVE9SXG59IGZyb20gXCIuL2RhdGFcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdVSShkaXNwbGF5LCBsZXZlbCwgcGxheWVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBXSURUSDsgaSsrKSB7XG4gICAgICAgIGRpc3BsYXkuZHJhdyhpLCBIRUlHSFQgLSBVSV9IRUlHSFQsIE1BUF9GSUxMRURfU1BBQ0UsIFwiYmx1ZVwiLCBcImJsdWVcIik7XG4gICAgfVxuXG4gICAgZGlzcGxheS5kcmF3VGV4dCgxLCAgSEVJR0hUIC0gVUlfSEVJR0hULCBcIiVje3doaXRlfSVie2JsdWV9SFA6IFwiICsgcGxheWVyLmZpZ2h0ZXIuaHAgKyBcIi9cIiArIHBsYXllci5maWdodGVyLm1heEhwKTtcbiAgICBkaXNwbGF5LmRyYXdUZXh0KDE0LCAgSEVJR0hUIC0gVUlfSEVJR0hULCBcIiVje3doaXRlfSVie2JsdWV9TWFuYTogXCIgKyBwbGF5ZXIuZmlnaHRlci5tYW5hICsgXCIvXCIgKyBwbGF5ZXIuZmlnaHRlci5tYXhNYW5hKTtcbiAgICBkaXNwbGF5LmRyYXdUZXh0KDMwLCAgSEVJR0hUIC0gVUlfSEVJR0hULCBcIiVje3doaXRlfSVie2JsdWV9U1RSOiBcIiArIHBsYXllci5maWdodGVyLnN0cmVuZ3RoKTtcbiAgICBkaXNwbGF5LmRyYXdUZXh0KDM4LCAgSEVJR0hUIC0gVUlfSEVJR0hULCBcIiVje3doaXRlfSVie2JsdWV9REVGOiBcIiArIHBsYXllci5maWdodGVyLmRlZmVuc2UpO1xuICAgIGRpc3BsYXkuZHJhd1RleHQoNDYsICBIRUlHSFQgLSBVSV9IRUlHSFQsIFwiJWN7d2hpdGV9JWJ7Ymx1ZX1MVkw6IFwiICsgcGxheWVyLmZpZ2h0ZXIubGV2ZWwpO1xuICAgIGRpc3BsYXkuZHJhd1RleHQoNTQsICBIRUlHSFQgLSBVSV9IRUlHSFQsIFwiJWN7d2hpdGV9JWJ7Ymx1ZX1FWFA6IFwiICsgcGxheWVyLmZpZ2h0ZXIuZXhwZXJpZW5jZSArIFwiL1wiICsgKExFVkVMX1VQX0JBU0UgKyBwbGF5ZXIuZmlnaHRlci5sZXZlbCAqIExFVkVMX1VQX0ZBQ1RPUikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1NlbGVjdGlvbk1lbnUoaGVhZGVyLCBpdGVtcywgdHlwZSwgd2lkdGgpIHtcbiAgICBpZiAoaXRlbXMubGVuZ3RoID4gMjYpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcInRvbyBtYW55IGl0ZW1zXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYUNvZGUgPSBcImFcIi5jaGFyQ29kZUF0KDApO1xuXG4gICAgLy8gYWRkIGZvdXIgZm9yIGhlYWRlclxuICAgIGNvbnN0IGhlaWdodCA9IGl0ZW1zLmxlbmd0aCArIFVJX0hFSUdIVDtcblxuICAgIC8vIGRyYXcgYmFja2dyb3VuZFxuICAgIGZvciAobGV0IHcgPSAwOyB3IDwgd2lkdGg7IHcrKykge1xuICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IGhlaWdodDsgaCsrKSB7XG4gICAgICAgICAgICBpZiAodyA9PT0gMCB8fCBoID09PSAwIHx8IHcgPT09IHdpZHRoIC0gMSB8fCBoID09PSBoZWlnaHQgLSAxKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhdyh3LCBoLCBcIjFcIiwgXCJncmV5XCIsIFwiZ3JleVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhdyh3LCBoLCBcIjFcIiwgXCJibGFja1wiLCBcImJsYWNrXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhd1RleHQoMiwgMSwgXCIlY3t3aGl0ZX0lYntibGFja31cIiArIGhlYWRlcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImludmVudG9yeVwiOlxuICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhd1RleHQoXG4gICAgICAgICAgICAgICAgMiwgaSArIDMsIGAlY3t3aGl0ZX0lYntibGFja30gJHtTdHJpbmcuZnJvbUNoYXJDb2RlKGkgKyBhQ29kZSl9OiAke2l0ZW1zW2ldLm5hbWV9ICgke2l0ZW1zW2ldLmNvdW50fSlgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzcGVsbHNcIjpcbiAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5LmRyYXdUZXh0KFxuICAgICAgICAgICAgICAgIDIsIGkgKyAzLCBgJWN7d2hpdGV9JWJ7YmxhY2t9ICR7U3RyaW5nLmZyb21DaGFyQ29kZShpICsgYUNvZGUpfTogJHtpdGVtc1tpXS5uYW1lfSBkbWc6ICR7aXRlbXNbaV0udmFsdWV9IGNvc3Q6ICR7aXRlbXNbaV0ubWFuYUNvc3R9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIG1lbnUgdHlwZSAke3R5cGV9YCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93S2V5QmluZGluZ01lbnUoKSB7XG4gICAgLy8gYWRkIG9uZSBmb3IgaGVhZGVyXG4gICAgY29uc3QgaGVpZ2h0ID0gMTY7XG4gICAgY29uc3Qgd2lkdGggPSBXSURUSDtcblxuICAgIC8vIGRyYXcgYmFja2dyb3VuZFxuICAgIGZvciAobGV0IHcgPSAwOyB3IDwgd2lkdGg7IHcrKykge1xuICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IGhlaWdodDsgaCsrKSB7XG4gICAgICAgICAgICBpZiAodyA9PT0gMCB8fCBoID09PSAwIHx8IHcgPT09IHdpZHRoIC0gMSB8fCBoID09PSBoZWlnaHQgLSAxKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhdyh3LCBoLCBcIjFcIiwgXCJncmV5XCIsIFwiZ3JleVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhdyh3LCBoLCBcIjFcIiwgXCJibGFja1wiLCBcImJsYWNrXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhd1RleHQoMiwgMSwgXCIlY3t3aGl0ZX0lYntibGFja30gS2V5Ym9hcmQgQmluZGluZ3NcIik7XG4gICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhd1RleHQoMiwgMywgXCIlY3t3aGl0ZX0lYntibGFja30gQ2xpY2sgb24gYW4gb3B0aW9uIHRvIGNoYW5nZSBpdFwiKTtcblxuICAgIGNvbnN0IGNvbW1hbmRzID0gT2JqZWN0LmtleXMoZ2xvYmFscy5HYW1lLnBsYXllci5rZXlDb21tYW5kTWFwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGNvbW1hbmRzW2ldO1xuICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheS5kcmF3VGV4dChcbiAgICAgICAgICAgIDIsIGkgKyA1LFxuICAgICAgICAgICAgXCIlY3t3aGl0ZX0lYntibGFja30gXCIgKyBnbG9iYWxzLkdhbWUucGxheWVyLmtleUNvbW1hbmRNYXBba2V5XVswXSArIFwiOiBcIiArIGtleVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU2NyZWVuKGRpc3BsYXkpIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IEhFSUdIVDsgeSsrKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgV0lEVEg7IHgrKykge1xuICAgICAgICAgICAgZGlzcGxheS5kcmF3KHgsIHksIE1BUF9FTVBUWV9TUEFDRSwgXCJibGFja1wiLCBcImJsYWNrXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUludEZyb21JbnRlcnZhbChtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==