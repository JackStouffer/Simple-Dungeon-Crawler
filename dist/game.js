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
const createVisibilityCallback = function (ai) {
    return function(x, y, r, visibility) {
        if (x === _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player.x && y === _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.player.y && visibility > 0) {
            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.displayMessage(ai.owner.name + " saw you");
            ai.state = "chase";
        }
    };
};

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
            let astar = new rot_js__WEBPACK_IMPORTED_MODULE_0__["Path"].AStar(
                x,
                y,
                createPassableCallback(this.owner),
                { topology: 8 }
            );

            let path = [];
            let pathCallback = function(x, y) {
                path.push([x, y]);
            };
            astar.compute(this.owner.x, this.owner.y, pathCallback);

            // remove our own position
            path.shift();
            if (path.length == 1) {
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

            let path = [];
            const pathCallback = function(x, y) {
                path.push([x, y]);
            };
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

            let path = [];
            let pathCallback = function(x, y) {
                path.push([x, y]);
            };
            astar.compute(this.owner.x, this.owner.y, pathCallback);

            // remove our own position
            path.shift();
            if (path.length == 1) {
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
console.log("COLOR_AMBIENT_LIGHT", COLOR_AMBIENT_LIGHT);

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
    const act = function (owner) {
        if (owner.fighter) {
            owner.fighter.takeDamage(null, damage);
        }

        if (owner === _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.player) {
            _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.displayMessage("You were hurt by the burn for " + damage + " damage");
        } else {
            _globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.displayMessage(owner.name + " was hurt by the burn for " + damage + " damage");
        }
    };

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
const mouseTarget = function (cb) {
    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.unhookMouseLook();
    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.drawAll();

    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.canvas.addEventListener("mousedown", function _listener(e) {
        if (e.button === 0) {
            const pos = _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.display.eventToPosition(e);

            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.canvas.removeEventListener("mousedown", _listener);
            _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.hookMouseLook();

            let target;
            let objects = Object(_map__WEBPACK_IMPORTED_MODULE_3__["getObjectsAtLocation"])(_globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.gameObjects, pos[0], pos[1]);

            for (var i = 0; i < objects.length; i++) {
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
};

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
        const lightingCallback = function (x, y, color) {
            if (x < 0 || y < 0 || x >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"] || y >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_HEIGHT"]) {
                return;
            }
            map[y][x].lightingColor = rot_js__WEBPACK_IMPORTED_MODULE_0__["Color"].toRGB(
                rot_js__WEBPACK_IMPORTED_MODULE_0__["Color"].add(
                    rot_js__WEBPACK_IMPORTED_MODULE_0__["Color"].fromString(map[y][x].lightingColor),
                    color
                )
            );
        };
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
    console.log(sourceData.width, "WORLD_WIDTH", _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"], sourceData.height, _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_HEIGHT"]);
    const tileSize = sourceData.tileheight;
    let map = [], objects = [], playerLocation = null;

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
        const findProperty = function (name) {
            if (!o.properties || !o.properties.length) { return null; }

            let property = o.properties.filter(prop => {
                return prop.name === name;
            });

            if (property.length === 0) {
                return null;
            } else {
                return property[0].value;
            }
        };

        let id = findProperty("id"),
            obj,
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
            let x = Math.floor(o.x / tileSize);
            let y = Math.floor(o.y / tileSize);
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

const getObjectsAtLocation = function(objects, x, y) {
    return objects.filter(object => object.x == x && object.y == y);
};

/**
    Returns null if the space is open, true or the blocking object
    if blocked
*/
function isBlocked(map, objects, x, y) {
    if (x < 0 || y < 0 || x >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_WIDTH"] || y >= _data__WEBPACK_IMPORTED_MODULE_1__["WORLD_HEIGHT"] || map[y][x].blocks) {
        return true;
    }

    const target = objects.filter(object => object.x == x && object.y == y && object.blocks === true)[0];
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
    for (var i = 0; i < o.length; i++) {
        if (o[i].blocksSight) {
            return true;
        }
    }

    return false;
}

const drawTile = function(display, tile, x, y) {
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
};

/**
 * Find the distance between two GameObjects
 * @param  {GameObject} a An object
 * @param  {GameObject} b An object
 * @return {Number}       The distance
 */
const distanceBetweenObjects = function (a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
};

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
const createObject = function (id, x=0, y=0) {
    if (!(id in _data__WEBPACK_IMPORTED_MODULE_2__["ObjectData"])) { throw new Error(`${id} is not valid object id`); }

    const data = _data__WEBPACK_IMPORTED_MODULE_2__["ObjectData"][id];
    let object = new GameObject(
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
            for (var i = 0; i < data.inventoryPool.length; i++) {
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
};

/**
 * Removes the AI, fighter, and intractable off of an object. Changes graphics
 * to dead body graphics and sets blocking to false. Also spawns a dropped item
 * if there were items in the inventory.
 *
 * @param  {GameObject} target    The GameObject that was killed
 * @return {void}
 */
const enemyDeathCallback = function(target) {
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
        let item = createObject("dropped_item", target.x, target.y);
        item.inventoryComponent = target.inventoryComponent;
        _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.addObject(item);
    }

    target.inventoryComponent = null;
};

/**
 * Removes self from world and scheduler. Also spawns a dropped item
 * if there were items in the inventory.
 *
 * @param  {GameObject} target    The GameObject that was killed
 * @return {void}
 */
const removeDeathCallback = function(target) {
    if (target.inventoryComponent.getIDsAndCounts().length > 0) {
        let item = createObject("dropped_item", target.x, target.y);
        item.inventoryComponent = target.inventoryComponent;
        _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.addObject(item);
    }

    _globals__WEBPACK_IMPORTED_MODULE_1__["default"].Game.removeObject(target);
};


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
const moveCommand = function(actor, direction, topology) {
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
};

const getItemCommand = function(actor) {
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
};

const openInventoryCommand = function(actor) {
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
};

const openSpellsCommand = function(actor) {
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
};

const openKeyBindingCommand = function(actor) {
    return function() {
        Object(_ui__WEBPACK_IMPORTED_MODULE_4__["showKeyBindingMenu"])();
        actor.ai.state = "keybinding";
        return false;
    };
};

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

    let commands = Object.keys(_globals__WEBPACK_IMPORTED_MODULE_0__["default"].Game.player.keyCommandMap);
    for (let i = 0; i < commands.length; i++) {
        let key = commands[i];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9NaW5IZWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2NvbG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9kaXNwbGF5L2JhY2tlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS9kaXNwbGF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvaGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvcmVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9kaXNwbGF5L3Rlcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZGlzcGxheS90aWxlLWdsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Rpc3BsYXkvdGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvZXZlbnRxdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvZGlzY3JldGUtc2hhZG93Y2FzdGluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvZm92LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Zvdi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9mb3YvcHJlY2lzZS1zaGFkb3djYXN0aW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL2Zvdi9yZWN1cnNpdmUtc2hhZG93Y2FzdGluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9saWdodGluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvYXJlbmEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2NlbGx1bGFyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9kaWdnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2RpdmlkZWRtYXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9kdW5nZW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9lbGxlcm1hemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL2ZlYXR1cmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL21hcC9pY2V5bWF6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9tYXAvcm9ndWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbWFwL3VuaWZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbm9pc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbm9pc2Uvbm9pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvbm9pc2Uvc2ltcGxleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9wYXRoL2FzdGFyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3BhdGgvZGlqa3N0cmEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcGF0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9wYXRoL3BhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvcm5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3NjaGVkdWxlci9hY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3NjaGVkdWxlci9zY2hlZHVsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc2NoZWR1bGVyL3NpbXBsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcm90LWpzL2xpYi9zY2hlZHVsZXIvc3BlZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvc3RyaW5nZ2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yb3QtanMvbGliL3RleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JvdC1qcy9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9haS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWZmZWN0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlnaHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3JhcGhpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ludGVyYWN0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW52ZW50b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy9pdGVtcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbGlnaHRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwcy9kZXZfcm9vbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwcy9sZXZlbF8xLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXBzL2xldmVsXzIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFj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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvVUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ087QUFDUDtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSw4QkFBOEI7QUFDdEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvREFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDalJBO0FBQUE7QUFBQTtBQUFpQztBQUNq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O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0RBQU87QUFDdkI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRW1GOzs7Ozs7Ozs7Ozs7O0FDcFRuRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFhOztBQUUyRjtBQUMzRDs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNQOztBQUVPO0FBQ0E7O0FBRUE7QUFDQTs7QUFFUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJB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QUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FB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QUFPO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLGdEQUFPLGlDQUFpQyxNQUFNLEdBQUcsTUFBTTtBQUMzRCxJQUFJLGdEQUFPLGlDQUFpQyxNQUFNLEdBQUcsTUFBTTs7QUFFM0QsK0JBQStCLGdEQUFPO0FBQ3RDLG1CQUFtQixxQkFBcUI7QUFDeEM7QUFDQSxRQUFRLGdEQUFPO0FBQ2Y7QUFDQSxnQkFBZ0IsTUFBTSxHQUFHLE1BQU0sS0FBSyxnREFBTztBQUMzQztBQUNBO0FBQ0E7O0FBRU87QUFDUCxtQkFBbUIsS0FBSyw0Q0FBTSxDQUFDO0FBQy9CLHVCQUF1QixLQUFLLDJDQUFLLENBQUM7QUFDbEMsK0JBQStCLHFEQUFlO0FBQzlDO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUFBO0FBQU87QUFDUDtBQUNBIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLmpzXCIpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsImV4cG9ydCBjbGFzcyBNaW5IZWFwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5oZWFwID0gW107XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gMDtcbiAgICB9XG4gICAgbGVzc1RoYW4oYSwgYikge1xuICAgICAgICByZXR1cm4gYS5rZXkgPT0gYi5rZXkgPyBhLnRpbWVzdGFtcCA8IGIudGltZXN0YW1wIDogYS5rZXkgPCBiLmtleTtcbiAgICB9XG4gICAgc2hpZnQodikge1xuICAgICAgICB0aGlzLmhlYXAgPSB0aGlzLmhlYXAubWFwKCh7IGtleSwgdmFsdWUsIHRpbWVzdGFtcCB9KSA9PiAoeyBrZXk6IGtleSArIHYsIHZhbHVlLCB0aW1lc3RhbXAgfSkpO1xuICAgIH1cbiAgICBsZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlYXAubGVuZ3RoO1xuICAgIH1cbiAgICBwdXNoKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgKz0gMTtcbiAgICAgICAgY29uc3QgbG9jID0gdGhpcy5sZW4oKTtcbiAgICAgICAgdGhpcy5oZWFwLnB1c2goeyB2YWx1ZSwgdGltZXN0YW1wOiB0aGlzLnRpbWVzdGFtcCwga2V5IH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZVVwKGxvYyk7XG4gICAgfVxuICAgIHBvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGVuKCkgPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gZWxlbWVudCB0byBwb3BcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG9wID0gdGhpcy5oZWFwWzBdO1xuICAgICAgICBpZiAodGhpcy5sZW4oKSA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcFswXSA9IHRoaXMuaGVhcC5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRG93bigwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhcC5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9wO1xuICAgIH1cbiAgICBmaW5kKHYpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbigpOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh2ID09IHRoaXMuaGVhcFtpXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlYXBbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJlbW92ZSh2KSB7XG4gICAgICAgIGxldCBpbmRleCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW4oKTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodiA9PSB0aGlzLmhlYXBbaV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlbigpID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhcFtpbmRleF0gPSB0aGlzLmhlYXAucG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEb3duKGluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhcC5wb3AoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHBhcmVudE5vZGUoeCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoeCAtIDEpIC8gMik7XG4gICAgfVxuICAgIGxlZnRDaGlsZE5vZGUoeCkge1xuICAgICAgICByZXR1cm4gMiAqIHggKyAxO1xuICAgIH1cbiAgICByaWdodENoaWxkTm9kZSh4KSB7XG4gICAgICAgIHJldHVybiAyICogeCArIDI7XG4gICAgfVxuICAgIGV4aXN0Tm9kZSh4KSB7XG4gICAgICAgIHJldHVybiB4ID49IDAgJiYgeCA8IHRoaXMuaGVhcC5sZW5ndGg7XG4gICAgfVxuICAgIHN3YXAoeCwgeSkge1xuICAgICAgICBjb25zdCB0ID0gdGhpcy5oZWFwW3hdO1xuICAgICAgICB0aGlzLmhlYXBbeF0gPSB0aGlzLmhlYXBbeV07XG4gICAgICAgIHRoaXMuaGVhcFt5XSA9IHQ7XG4gICAgfVxuICAgIG1pbk5vZGUobnVtYmVycykge1xuICAgICAgICBjb25zdCB2YWxpZG51bWJlcnMgPSBudW1iZXJzLmZpbHRlcih0aGlzLmV4aXN0Tm9kZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgbGV0IG1pbmltYWwgPSB2YWxpZG51bWJlcnNbMF07XG4gICAgICAgIGZvciAoY29uc3QgaSBvZiB2YWxpZG51bWJlcnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxlc3NUaGFuKHRoaXMuaGVhcFtpXSwgdGhpcy5oZWFwW21pbmltYWxdKSkge1xuICAgICAgICAgICAgICAgIG1pbmltYWwgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtaW5pbWFsO1xuICAgIH1cbiAgICB1cGRhdGVVcCh4KSB7XG4gICAgICAgIGlmICh4ID09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGUoeCk7XG4gICAgICAgIGlmICh0aGlzLmV4aXN0Tm9kZShwYXJlbnQpICYmIHRoaXMubGVzc1RoYW4odGhpcy5oZWFwW3hdLCB0aGlzLmhlYXBbcGFyZW50XSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3dhcCh4LCBwYXJlbnQpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVVcChwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZURvd24oeCkge1xuICAgICAgICBjb25zdCBsZWZ0Q2hpbGQgPSB0aGlzLmxlZnRDaGlsZE5vZGUoeCk7XG4gICAgICAgIGNvbnN0IHJpZ2h0Q2hpbGQgPSB0aGlzLnJpZ2h0Q2hpbGROb2RlKHgpO1xuICAgICAgICBpZiAoIXRoaXMuZXhpc3ROb2RlKGxlZnRDaGlsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtID0gdGhpcy5taW5Ob2RlKFt4LCBsZWZ0Q2hpbGQsIHJpZ2h0Q2hpbGRdKTtcbiAgICAgICAgaWYgKG0gIT0geCkge1xuICAgICAgICAgICAgdGhpcy5zd2FwKHgsIG0pO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEb3duKG0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlYnVnUHJpbnQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaGVhcCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY2xhbXAgfSBmcm9tIFwiLi91dGlsLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuL3JuZy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21TdHJpbmcoc3RyKSB7XG4gICAgbGV0IGNhY2hlZCwgcjtcbiAgICBpZiAoc3RyIGluIENBQ0hFKSB7XG4gICAgICAgIGNhY2hlZCA9IENBQ0hFW3N0cl07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoc3RyLmNoYXJBdCgwKSA9PSBcIiNcIikgeyAvLyBoZXggcmdiXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZCA9IHN0ci5tYXRjaCgvWzAtOWEtZl0vZ2kpIHx8IFtdO1xuICAgICAgICAgICAgbGV0IHZhbHVlcyA9IG1hdGNoZWQubWFwKCh4KSA9PiBwYXJzZUludCh4LCAxNikpO1xuICAgICAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGggPT0gMykge1xuICAgICAgICAgICAgICAgIGNhY2hlZCA9IHZhbHVlcy5tYXAoKHgpID0+IHggKiAxNyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbaSArIDFdICs9IDE2ICogdmFsdWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWNoZWQgPSB2YWx1ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKHIgPSBzdHIubWF0Y2goL3JnYlxcKChbMC05LCBdKylcXCkvaSkpKSB7IC8vIGRlY2ltYWwgcmdiXG4gICAgICAgICAgICBjYWNoZWQgPSByWzFdLnNwbGl0KC9cXHMqLFxccyovKS5tYXAoKHgpID0+IHBhcnNlSW50KHgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy8gaHRtbCBuYW1lXG4gICAgICAgICAgICBjYWNoZWQgPSBbMCwgMCwgMF07XG4gICAgICAgIH1cbiAgICAgICAgQ0FDSEVbc3RyXSA9IGNhY2hlZDtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZC5zbGljZSgpO1xufVxuLyoqXG4gKiBBZGQgdHdvIG9yIG1vcmUgY29sb3JzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGQoY29sb3IxLCAuLi5jb2xvcnMpIHtcbiAgICBsZXQgcmVzdWx0ID0gY29sb3IxLnNsaWNlKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSArPSBjb2xvcnNbal1baV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQWRkIHR3byBvciBtb3JlIGNvbG9ycywgTU9ESUZJRVMgRklSU1QgQVJHVU1FTlRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZF8oY29sb3IxLCAuLi5jb2xvcnMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbG9ycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29sb3IxW2ldICs9IGNvbG9yc1tqXVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sb3IxO1xufVxuLyoqXG4gKiBNdWx0aXBseSAobWl4KSB0d28gb3IgbW9yZSBjb2xvcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG11bHRpcGx5KGNvbG9yMSwgLi4uY29sb3JzKSB7XG4gICAgbGV0IHJlc3VsdCA9IGNvbG9yMS5zbGljZSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sb3JzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICByZXN1bHRbaV0gKj0gY29sb3JzW2pdW2ldIC8gMjU1O1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdFtpXSA9IE1hdGgucm91bmQocmVzdWx0W2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogTXVsdGlwbHkgKG1peCkgdHdvIG9yIG1vcmUgY29sb3JzLCBNT0RJRklFUyBGSVJTVCBBUkdVTUVOVFxuICovXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlwbHlfKGNvbG9yMSwgLi4uY29sb3JzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xvcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbG9yMVtpXSAqPSBjb2xvcnNbal1baV0gLyAyNTU7XG4gICAgICAgIH1cbiAgICAgICAgY29sb3IxW2ldID0gTWF0aC5yb3VuZChjb2xvcjFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3IxO1xufVxuLyoqXG4gKiBJbnRlcnBvbGF0ZSAoYmxlbmQpIHR3byBjb2xvcnMgd2l0aCBhIGdpdmVuIGZhY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJwb2xhdGUoY29sb3IxLCBjb2xvcjIsIGZhY3RvciA9IDAuNSkge1xuICAgIGxldCByZXN1bHQgPSBjb2xvcjEuc2xpY2UoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gPSBNYXRoLnJvdW5kKHJlc3VsdFtpXSArIGZhY3RvciAqIChjb2xvcjJbaV0gLSBjb2xvcjFbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBjb25zdCBsZXJwID0gaW50ZXJwb2xhdGU7XG4vKipcbiAqIEludGVycG9sYXRlIChibGVuZCkgdHdvIGNvbG9ycyB3aXRoIGEgZ2l2ZW4gZmFjdG9yIGluIEhTTCBtb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnBvbGF0ZUhTTChjb2xvcjEsIGNvbG9yMiwgZmFjdG9yID0gMC41KSB7XG4gICAgbGV0IGhzbDEgPSByZ2IyaHNsKGNvbG9yMSk7XG4gICAgbGV0IGhzbDIgPSByZ2IyaHNsKGNvbG9yMik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgaHNsMVtpXSArPSBmYWN0b3IgKiAoaHNsMltpXSAtIGhzbDFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gaHNsMnJnYihoc2wxKTtcbn1cbmV4cG9ydCBjb25zdCBsZXJwSFNMID0gaW50ZXJwb2xhdGVIU0w7XG4vKipcbiAqIENyZWF0ZSBhIG5ldyByYW5kb20gY29sb3IgYmFzZWQgb24gdGhpcyBvbmVcbiAqIEBwYXJhbSBjb2xvclxuICogQHBhcmFtIGRpZmYgU2V0IG9mIHN0YW5kYXJkIGRldmlhdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbWl6ZShjb2xvciwgZGlmZikge1xuICAgIGlmICghKGRpZmYgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgZGlmZiA9IE1hdGgucm91bmQoUk5HLmdldE5vcm1hbCgwLCBkaWZmKSk7XG4gICAgfVxuICAgIGxldCByZXN1bHQgPSBjb2xvci5zbGljZSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIHJlc3VsdFtpXSArPSAoZGlmZiBpbnN0YW5jZW9mIEFycmF5ID8gTWF0aC5yb3VuZChSTkcuZ2V0Tm9ybWFsKDAsIGRpZmZbaV0pKSA6IGRpZmYpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNMLiBFeHBlY3RzIDAuLjI1NSBpbnB1dHMsIHByb2R1Y2VzIDAuLjEgb3V0cHV0cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYjJoc2woY29sb3IpIHtcbiAgICBsZXQgciA9IGNvbG9yWzBdIC8gMjU1O1xuICAgIGxldCBnID0gY29sb3JbMV0gLyAyNTU7XG4gICAgbGV0IGIgPSBjb2xvclsyXSAvIDI1NTtcbiAgICBsZXQgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIGxldCBoID0gMCwgcywgbCA9IChtYXggKyBtaW4pIC8gMjtcbiAgICBpZiAobWF4ID09IG1pbikge1xuICAgICAgICBzID0gMDsgLy8gYWNocm9tYXRpY1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGV0IGQgPSBtYXggLSBtaW47XG4gICAgICAgIHMgPSAobCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbikpO1xuICAgICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICAgICAgY2FzZSByOlxuICAgICAgICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZzpcbiAgICAgICAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBiOlxuICAgICAgICAgICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaCAvPSA2O1xuICAgIH1cbiAgICByZXR1cm4gW2gsIHMsIGxdO1xufVxuZnVuY3Rpb24gaHVlMnJnYihwLCBxLCB0KSB7XG4gICAgaWYgKHQgPCAwKVxuICAgICAgICB0ICs9IDE7XG4gICAgaWYgKHQgPiAxKVxuICAgICAgICB0IC09IDE7XG4gICAgaWYgKHQgPCAxIC8gNilcbiAgICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHQ7XG4gICAgaWYgKHQgPCAxIC8gMilcbiAgICAgICAgcmV0dXJuIHE7XG4gICAgaWYgKHQgPCAyIC8gMylcbiAgICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogKDIgLyAzIC0gdCkgKiA2O1xuICAgIHJldHVybiBwO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBIU0wgY29sb3IgdmFsdWUgdG8gUkdCLiBFeHBlY3RzIDAuLjEgaW5wdXRzLCBwcm9kdWNlcyAwLi4yNTUgb3V0cHV0cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhzbDJyZ2IoY29sb3IpIHtcbiAgICBsZXQgbCA9IGNvbG9yWzJdO1xuICAgIGlmIChjb2xvclsxXSA9PSAwKSB7XG4gICAgICAgIGwgPSBNYXRoLnJvdW5kKGwgKiAyNTUpO1xuICAgICAgICByZXR1cm4gW2wsIGwsIGxdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGV0IHMgPSBjb2xvclsxXTtcbiAgICAgICAgbGV0IHEgPSAobCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcyk7XG4gICAgICAgIGxldCBwID0gMiAqIGwgLSBxO1xuICAgICAgICBsZXQgciA9IGh1ZTJyZ2IocCwgcSwgY29sb3JbMF0gKyAxIC8gMyk7XG4gICAgICAgIGxldCBnID0gaHVlMnJnYihwLCBxLCBjb2xvclswXSk7XG4gICAgICAgIGxldCBiID0gaHVlMnJnYihwLCBxLCBjb2xvclswXSAtIDEgLyAzKTtcbiAgICAgICAgcmV0dXJuIFtNYXRoLnJvdW5kKHIgKiAyNTUpLCBNYXRoLnJvdW5kKGcgKiAyNTUpLCBNYXRoLnJvdW5kKGIgKiAyNTUpXTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gdG9SR0IoY29sb3IpIHtcbiAgICBsZXQgY2xhbXBlZCA9IGNvbG9yLm1hcCh4ID0+IGNsYW1wKHgsIDAsIDI1NSkpO1xuICAgIHJldHVybiBgcmdiKCR7Y2xhbXBlZC5qb2luKFwiLFwiKX0pYDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0b0hleChjb2xvcikge1xuICAgIGxldCBjbGFtcGVkID0gY29sb3IubWFwKHggPT4gY2xhbXAoeCwgMCwgMjU1KS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpKTtcbiAgICByZXR1cm4gYCMke2NsYW1wZWQuam9pbihcIlwiKX1gO1xufVxuY29uc3QgQ0FDSEUgPSB7XG4gICAgXCJibGFja1wiOiBbMCwgMCwgMF0sXG4gICAgXCJuYXZ5XCI6IFswLCAwLCAxMjhdLFxuICAgIFwiZGFya2JsdWVcIjogWzAsIDAsIDEzOV0sXG4gICAgXCJtZWRpdW1ibHVlXCI6IFswLCAwLCAyMDVdLFxuICAgIFwiYmx1ZVwiOiBbMCwgMCwgMjU1XSxcbiAgICBcImRhcmtncmVlblwiOiBbMCwgMTAwLCAwXSxcbiAgICBcImdyZWVuXCI6IFswLCAxMjgsIDBdLFxuICAgIFwidGVhbFwiOiBbMCwgMTI4LCAxMjhdLFxuICAgIFwiZGFya2N5YW5cIjogWzAsIDEzOSwgMTM5XSxcbiAgICBcImRlZXBza3libHVlXCI6IFswLCAxOTEsIDI1NV0sXG4gICAgXCJkYXJrdHVycXVvaXNlXCI6IFswLCAyMDYsIDIwOV0sXG4gICAgXCJtZWRpdW1zcHJpbmdncmVlblwiOiBbMCwgMjUwLCAxNTRdLFxuICAgIFwibGltZVwiOiBbMCwgMjU1LCAwXSxcbiAgICBcInNwcmluZ2dyZWVuXCI6IFswLCAyNTUsIDEyN10sXG4gICAgXCJhcXVhXCI6IFswLCAyNTUsIDI1NV0sXG4gICAgXCJjeWFuXCI6IFswLCAyNTUsIDI1NV0sXG4gICAgXCJtaWRuaWdodGJsdWVcIjogWzI1LCAyNSwgMTEyXSxcbiAgICBcImRvZGdlcmJsdWVcIjogWzMwLCAxNDQsIDI1NV0sXG4gICAgXCJmb3Jlc3RncmVlblwiOiBbMzQsIDEzOSwgMzRdLFxuICAgIFwic2VhZ3JlZW5cIjogWzQ2LCAxMzksIDg3XSxcbiAgICBcImRhcmtzbGF0ZWdyYXlcIjogWzQ3LCA3OSwgNzldLFxuICAgIFwiZGFya3NsYXRlZ3JleVwiOiBbNDcsIDc5LCA3OV0sXG4gICAgXCJsaW1lZ3JlZW5cIjogWzUwLCAyMDUsIDUwXSxcbiAgICBcIm1lZGl1bXNlYWdyZWVuXCI6IFs2MCwgMTc5LCAxMTNdLFxuICAgIFwidHVycXVvaXNlXCI6IFs2NCwgMjI0LCAyMDhdLFxuICAgIFwicm95YWxibHVlXCI6IFs2NSwgMTA1LCAyMjVdLFxuICAgIFwic3RlZWxibHVlXCI6IFs3MCwgMTMwLCAxODBdLFxuICAgIFwiZGFya3NsYXRlYmx1ZVwiOiBbNzIsIDYxLCAxMzldLFxuICAgIFwibWVkaXVtdHVycXVvaXNlXCI6IFs3MiwgMjA5LCAyMDRdLFxuICAgIFwiaW5kaWdvXCI6IFs3NSwgMCwgMTMwXSxcbiAgICBcImRhcmtvbGl2ZWdyZWVuXCI6IFs4NSwgMTA3LCA0N10sXG4gICAgXCJjYWRldGJsdWVcIjogWzk1LCAxNTgsIDE2MF0sXG4gICAgXCJjb3JuZmxvd2VyYmx1ZVwiOiBbMTAwLCAxNDksIDIzN10sXG4gICAgXCJtZWRpdW1hcXVhbWFyaW5lXCI6IFsxMDIsIDIwNSwgMTcwXSxcbiAgICBcImRpbWdyYXlcIjogWzEwNSwgMTA1LCAxMDVdLFxuICAgIFwiZGltZ3JleVwiOiBbMTA1LCAxMDUsIDEwNV0sXG4gICAgXCJzbGF0ZWJsdWVcIjogWzEwNiwgOTAsIDIwNV0sXG4gICAgXCJvbGl2ZWRyYWJcIjogWzEwNywgMTQyLCAzNV0sXG4gICAgXCJzbGF0ZWdyYXlcIjogWzExMiwgMTI4LCAxNDRdLFxuICAgIFwic2xhdGVncmV5XCI6IFsxMTIsIDEyOCwgMTQ0XSxcbiAgICBcImxpZ2h0c2xhdGVncmF5XCI6IFsxMTksIDEzNiwgMTUzXSxcbiAgICBcImxpZ2h0c2xhdGVncmV5XCI6IFsxMTksIDEzNiwgMTUzXSxcbiAgICBcIm1lZGl1bXNsYXRlYmx1ZVwiOiBbMTIzLCAxMDQsIDIzOF0sXG4gICAgXCJsYXduZ3JlZW5cIjogWzEyNCwgMjUyLCAwXSxcbiAgICBcImNoYXJ0cmV1c2VcIjogWzEyNywgMjU1LCAwXSxcbiAgICBcImFxdWFtYXJpbmVcIjogWzEyNywgMjU1LCAyMTJdLFxuICAgIFwibWFyb29uXCI6IFsxMjgsIDAsIDBdLFxuICAgIFwicHVycGxlXCI6IFsxMjgsIDAsIDEyOF0sXG4gICAgXCJvbGl2ZVwiOiBbMTI4LCAxMjgsIDBdLFxuICAgIFwiZ3JheVwiOiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgXCJncmV5XCI6IFsxMjgsIDEyOCwgMTI4XSxcbiAgICBcInNreWJsdWVcIjogWzEzNSwgMjA2LCAyMzVdLFxuICAgIFwibGlnaHRza3libHVlXCI6IFsxMzUsIDIwNiwgMjUwXSxcbiAgICBcImJsdWV2aW9sZXRcIjogWzEzOCwgNDMsIDIyNl0sXG4gICAgXCJkYXJrcmVkXCI6IFsxMzksIDAsIDBdLFxuICAgIFwiZGFya21hZ2VudGFcIjogWzEzOSwgMCwgMTM5XSxcbiAgICBcInNhZGRsZWJyb3duXCI6IFsxMzksIDY5LCAxOV0sXG4gICAgXCJkYXJrc2VhZ3JlZW5cIjogWzE0MywgMTg4LCAxNDNdLFxuICAgIFwibGlnaHRncmVlblwiOiBbMTQ0LCAyMzgsIDE0NF0sXG4gICAgXCJtZWRpdW1wdXJwbGVcIjogWzE0NywgMTEyLCAyMTZdLFxuICAgIFwiZGFya3Zpb2xldFwiOiBbMTQ4LCAwLCAyMTFdLFxuICAgIFwicGFsZWdyZWVuXCI6IFsxNTIsIDI1MSwgMTUyXSxcbiAgICBcImRhcmtvcmNoaWRcIjogWzE1MywgNTAsIDIwNF0sXG4gICAgXCJ5ZWxsb3dncmVlblwiOiBbMTU0LCAyMDUsIDUwXSxcbiAgICBcInNpZW5uYVwiOiBbMTYwLCA4MiwgNDVdLFxuICAgIFwiYnJvd25cIjogWzE2NSwgNDIsIDQyXSxcbiAgICBcImRhcmtncmF5XCI6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBcImRhcmtncmV5XCI6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBcImxpZ2h0Ymx1ZVwiOiBbMTczLCAyMTYsIDIzMF0sXG4gICAgXCJncmVlbnllbGxvd1wiOiBbMTczLCAyNTUsIDQ3XSxcbiAgICBcInBhbGV0dXJxdW9pc2VcIjogWzE3NSwgMjM4LCAyMzhdLFxuICAgIFwibGlnaHRzdGVlbGJsdWVcIjogWzE3NiwgMTk2LCAyMjJdLFxuICAgIFwicG93ZGVyYmx1ZVwiOiBbMTc2LCAyMjQsIDIzMF0sXG4gICAgXCJmaXJlYnJpY2tcIjogWzE3OCwgMzQsIDM0XSxcbiAgICBcImRhcmtnb2xkZW5yb2RcIjogWzE4NCwgMTM0LCAxMV0sXG4gICAgXCJtZWRpdW1vcmNoaWRcIjogWzE4NiwgODUsIDIxMV0sXG4gICAgXCJyb3N5YnJvd25cIjogWzE4OCwgMTQzLCAxNDNdLFxuICAgIFwiZGFya2toYWtpXCI6IFsxODksIDE4MywgMTA3XSxcbiAgICBcInNpbHZlclwiOiBbMTkyLCAxOTIsIDE5Ml0sXG4gICAgXCJtZWRpdW12aW9sZXRyZWRcIjogWzE5OSwgMjEsIDEzM10sXG4gICAgXCJpbmRpYW5yZWRcIjogWzIwNSwgOTIsIDkyXSxcbiAgICBcInBlcnVcIjogWzIwNSwgMTMzLCA2M10sXG4gICAgXCJjaG9jb2xhdGVcIjogWzIxMCwgMTA1LCAzMF0sXG4gICAgXCJ0YW5cIjogWzIxMCwgMTgwLCAxNDBdLFxuICAgIFwibGlnaHRncmF5XCI6IFsyMTEsIDIxMSwgMjExXSxcbiAgICBcImxpZ2h0Z3JleVwiOiBbMjExLCAyMTEsIDIxMV0sXG4gICAgXCJwYWxldmlvbGV0cmVkXCI6IFsyMTYsIDExMiwgMTQ3XSxcbiAgICBcInRoaXN0bGVcIjogWzIxNiwgMTkxLCAyMTZdLFxuICAgIFwib3JjaGlkXCI6IFsyMTgsIDExMiwgMjE0XSxcbiAgICBcImdvbGRlbnJvZFwiOiBbMjE4LCAxNjUsIDMyXSxcbiAgICBcImNyaW1zb25cIjogWzIyMCwgMjAsIDYwXSxcbiAgICBcImdhaW5zYm9yb1wiOiBbMjIwLCAyMjAsIDIyMF0sXG4gICAgXCJwbHVtXCI6IFsyMjEsIDE2MCwgMjIxXSxcbiAgICBcImJ1cmx5d29vZFwiOiBbMjIyLCAxODQsIDEzNV0sXG4gICAgXCJsaWdodGN5YW5cIjogWzIyNCwgMjU1LCAyNTVdLFxuICAgIFwibGF2ZW5kZXJcIjogWzIzMCwgMjMwLCAyNTBdLFxuICAgIFwiZGFya3NhbG1vblwiOiBbMjMzLCAxNTAsIDEyMl0sXG4gICAgXCJ2aW9sZXRcIjogWzIzOCwgMTMwLCAyMzhdLFxuICAgIFwicGFsZWdvbGRlbnJvZFwiOiBbMjM4LCAyMzIsIDE3MF0sXG4gICAgXCJsaWdodGNvcmFsXCI6IFsyNDAsIDEyOCwgMTI4XSxcbiAgICBcImtoYWtpXCI6IFsyNDAsIDIzMCwgMTQwXSxcbiAgICBcImFsaWNlYmx1ZVwiOiBbMjQwLCAyNDgsIDI1NV0sXG4gICAgXCJob25leWRld1wiOiBbMjQwLCAyNTUsIDI0MF0sXG4gICAgXCJhenVyZVwiOiBbMjQwLCAyNTUsIDI1NV0sXG4gICAgXCJzYW5keWJyb3duXCI6IFsyNDQsIDE2NCwgOTZdLFxuICAgIFwid2hlYXRcIjogWzI0NSwgMjIyLCAxNzldLFxuICAgIFwiYmVpZ2VcIjogWzI0NSwgMjQ1LCAyMjBdLFxuICAgIFwid2hpdGVzbW9rZVwiOiBbMjQ1LCAyNDUsIDI0NV0sXG4gICAgXCJtaW50Y3JlYW1cIjogWzI0NSwgMjU1LCAyNTBdLFxuICAgIFwiZ2hvc3R3aGl0ZVwiOiBbMjQ4LCAyNDgsIDI1NV0sXG4gICAgXCJzYWxtb25cIjogWzI1MCwgMTI4LCAxMTRdLFxuICAgIFwiYW50aXF1ZXdoaXRlXCI6IFsyNTAsIDIzNSwgMjE1XSxcbiAgICBcImxpbmVuXCI6IFsyNTAsIDI0MCwgMjMwXSxcbiAgICBcImxpZ2h0Z29sZGVucm9keWVsbG93XCI6IFsyNTAsIDI1MCwgMjEwXSxcbiAgICBcIm9sZGxhY2VcIjogWzI1MywgMjQ1LCAyMzBdLFxuICAgIFwicmVkXCI6IFsyNTUsIDAsIDBdLFxuICAgIFwiZnVjaHNpYVwiOiBbMjU1LCAwLCAyNTVdLFxuICAgIFwibWFnZW50YVwiOiBbMjU1LCAwLCAyNTVdLFxuICAgIFwiZGVlcHBpbmtcIjogWzI1NSwgMjAsIDE0N10sXG4gICAgXCJvcmFuZ2VyZWRcIjogWzI1NSwgNjksIDBdLFxuICAgIFwidG9tYXRvXCI6IFsyNTUsIDk5LCA3MV0sXG4gICAgXCJob3RwaW5rXCI6IFsyNTUsIDEwNSwgMTgwXSxcbiAgICBcImNvcmFsXCI6IFsyNTUsIDEyNywgODBdLFxuICAgIFwiZGFya29yYW5nZVwiOiBbMjU1LCAxNDAsIDBdLFxuICAgIFwibGlnaHRzYWxtb25cIjogWzI1NSwgMTYwLCAxMjJdLFxuICAgIFwib3JhbmdlXCI6IFsyNTUsIDE2NSwgMF0sXG4gICAgXCJsaWdodHBpbmtcIjogWzI1NSwgMTgyLCAxOTNdLFxuICAgIFwicGlua1wiOiBbMjU1LCAxOTIsIDIwM10sXG4gICAgXCJnb2xkXCI6IFsyNTUsIDIxNSwgMF0sXG4gICAgXCJwZWFjaHB1ZmZcIjogWzI1NSwgMjE4LCAxODVdLFxuICAgIFwibmF2YWpvd2hpdGVcIjogWzI1NSwgMjIyLCAxNzNdLFxuICAgIFwibW9jY2FzaW5cIjogWzI1NSwgMjI4LCAxODFdLFxuICAgIFwiYmlzcXVlXCI6IFsyNTUsIDIyOCwgMTk2XSxcbiAgICBcIm1pc3R5cm9zZVwiOiBbMjU1LCAyMjgsIDIyNV0sXG4gICAgXCJibGFuY2hlZGFsbW9uZFwiOiBbMjU1LCAyMzUsIDIwNV0sXG4gICAgXCJwYXBheWF3aGlwXCI6IFsyNTUsIDIzOSwgMjEzXSxcbiAgICBcImxhdmVuZGVyYmx1c2hcIjogWzI1NSwgMjQwLCAyNDVdLFxuICAgIFwic2Vhc2hlbGxcIjogWzI1NSwgMjQ1LCAyMzhdLFxuICAgIFwiY29ybnNpbGtcIjogWzI1NSwgMjQ4LCAyMjBdLFxuICAgIFwibGVtb25jaGlmZm9uXCI6IFsyNTUsIDI1MCwgMjA1XSxcbiAgICBcImZsb3JhbHdoaXRlXCI6IFsyNTUsIDI1MCwgMjQwXSxcbiAgICBcInNub3dcIjogWzI1NSwgMjUwLCAyNTBdLFxuICAgIFwieWVsbG93XCI6IFsyNTUsIDI1NSwgMF0sXG4gICAgXCJsaWdodHllbGxvd1wiOiBbMjU1LCAyNTUsIDIyNF0sXG4gICAgXCJpdm9yeVwiOiBbMjU1LCAyNTUsIDI0MF0sXG4gICAgXCJ3aGl0ZVwiOiBbMjU1LCAyNTUsIDI1NV1cbn07XG4iLCIvKiogRGVmYXVsdCB3aXRoIGZvciBkaXNwbGF5IGFuZCBtYXAgZ2VuZXJhdG9ycyAqL1xuZXhwb3J0IGxldCBERUZBVUxUX1dJRFRIID0gODA7XG4vKiogRGVmYXVsdCBoZWlnaHQgZm9yIGRpc3BsYXkgYW5kIG1hcCBnZW5lcmF0b3JzICovXG5leHBvcnQgbGV0IERFRkFVTFRfSEVJR0hUID0gMjU7XG5leHBvcnQgY29uc3QgRElSUyA9IHtcbiAgICA0OiBbWzAsIC0xXSwgWzEsIDBdLCBbMCwgMV0sIFstMSwgMF1dLFxuICAgIDg6IFtbMCwgLTFdLCBbMSwgLTFdLCBbMSwgMF0sIFsxLCAxXSwgWzAsIDFdLCBbLTEsIDFdLCBbLTEsIDBdLCBbLTEsIC0xXV0sXG4gICAgNjogW1stMSwgLTFdLCBbMSwgLTFdLCBbMiwgMF0sIFsxLCAxXSwgWy0xLCAxXSwgWy0yLCAwXV1cbn07XG5leHBvcnQgY29uc3QgS0VZUyA9IHtcbiAgICAvKiogQ2FuY2VsIGtleS4gKi9cbiAgICBWS19DQU5DRUw6IDMsXG4gICAgLyoqIEhlbHAga2V5LiAqL1xuICAgIFZLX0hFTFA6IDYsXG4gICAgLyoqIEJhY2tzcGFjZSBrZXkuICovXG4gICAgVktfQkFDS19TUEFDRTogOCxcbiAgICAvKiogVGFiIGtleS4gKi9cbiAgICBWS19UQUI6IDksXG4gICAgLyoqIDUga2V5IG9uIE51bXBhZCB3aGVuIE51bUxvY2sgaXMgdW5sb2NrZWQuIE9yIG9uIE1hYywgY2xlYXIga2V5IHdoaWNoIGlzIHBvc2l0aW9uZWQgYXQgTnVtTG9jayBrZXkuICovXG4gICAgVktfQ0xFQVI6IDEyLFxuICAgIC8qKiBSZXR1cm4vZW50ZXIga2V5IG9uIHRoZSBtYWluIGtleWJvYXJkLiAqL1xuICAgIFZLX1JFVFVSTjogMTMsXG4gICAgLyoqIFJlc2VydmVkLCBidXQgbm90IHVzZWQuICovXG4gICAgVktfRU5URVI6IDE0LFxuICAgIC8qKiBTaGlmdCBrZXkuICovXG4gICAgVktfU0hJRlQ6IDE2LFxuICAgIC8qKiBDb250cm9sIGtleS4gKi9cbiAgICBWS19DT05UUk9MOiAxNyxcbiAgICAvKiogQWx0IChPcHRpb24gb24gTWFjKSBrZXkuICovXG4gICAgVktfQUxUOiAxOCxcbiAgICAvKiogUGF1c2Uga2V5LiAqL1xuICAgIFZLX1BBVVNFOiAxOSxcbiAgICAvKiogQ2FwcyBsb2NrLiAqL1xuICAgIFZLX0NBUFNfTE9DSzogMjAsXG4gICAgLyoqIEVzY2FwZSBrZXkuICovXG4gICAgVktfRVNDQVBFOiAyNyxcbiAgICAvKiogU3BhY2UgYmFyLiAqL1xuICAgIFZLX1NQQUNFOiAzMixcbiAgICAvKiogUGFnZSBVcCBrZXkuICovXG4gICAgVktfUEFHRV9VUDogMzMsXG4gICAgLyoqIFBhZ2UgRG93biBrZXkuICovXG4gICAgVktfUEFHRV9ET1dOOiAzNCxcbiAgICAvKiogRW5kIGtleS4gKi9cbiAgICBWS19FTkQ6IDM1LFxuICAgIC8qKiBIb21lIGtleS4gKi9cbiAgICBWS19IT01FOiAzNixcbiAgICAvKiogTGVmdCBhcnJvdy4gKi9cbiAgICBWS19MRUZUOiAzNyxcbiAgICAvKiogVXAgYXJyb3cuICovXG4gICAgVktfVVA6IDM4LFxuICAgIC8qKiBSaWdodCBhcnJvdy4gKi9cbiAgICBWS19SSUdIVDogMzksXG4gICAgLyoqIERvd24gYXJyb3cuICovXG4gICAgVktfRE9XTjogNDAsXG4gICAgLyoqIFByaW50IFNjcmVlbiBrZXkuICovXG4gICAgVktfUFJJTlRTQ1JFRU46IDQ0LFxuICAgIC8qKiBJbnMoZXJ0KSBrZXkuICovXG4gICAgVktfSU5TRVJUOiA0NSxcbiAgICAvKiogRGVsKGV0ZSkga2V5LiAqL1xuICAgIFZLX0RFTEVURTogNDYsXG4gICAgLyoqKi9cbiAgICBWS18wOiA0OCxcbiAgICAvKioqL1xuICAgIFZLXzE6IDQ5LFxuICAgIC8qKiovXG4gICAgVktfMjogNTAsXG4gICAgLyoqKi9cbiAgICBWS18zOiA1MSxcbiAgICAvKioqL1xuICAgIFZLXzQ6IDUyLFxuICAgIC8qKiovXG4gICAgVktfNTogNTMsXG4gICAgLyoqKi9cbiAgICBWS182OiA1NCxcbiAgICAvKioqL1xuICAgIFZLXzc6IDU1LFxuICAgIC8qKiovXG4gICAgVktfODogNTYsXG4gICAgLyoqKi9cbiAgICBWS185OiA1NyxcbiAgICAvKiogQ29sb24gKDopIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0NPTE9OOiA1OCxcbiAgICAvKiogU2VtaWNvbG9uICg7KSBrZXkuICovXG4gICAgVktfU0VNSUNPTE9OOiA1OSxcbiAgICAvKiogTGVzcy10aGFuICg8KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19MRVNTX1RIQU46IDYwLFxuICAgIC8qKiBFcXVhbHMgKD0pIGtleS4gKi9cbiAgICBWS19FUVVBTFM6IDYxLFxuICAgIC8qKiBHcmVhdGVyLXRoYW4gKD4pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0dSRUFURVJfVEhBTjogNjIsXG4gICAgLyoqIFF1ZXN0aW9uIG1hcmsgKD8pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1FVRVNUSU9OX01BUks6IDYzLFxuICAgIC8qKiBBdG1hcmsgKEApIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FUOiA2NCxcbiAgICAvKioqL1xuICAgIFZLX0E6IDY1LFxuICAgIC8qKiovXG4gICAgVktfQjogNjYsXG4gICAgLyoqKi9cbiAgICBWS19DOiA2NyxcbiAgICAvKioqL1xuICAgIFZLX0Q6IDY4LFxuICAgIC8qKiovXG4gICAgVktfRTogNjksXG4gICAgLyoqKi9cbiAgICBWS19GOiA3MCxcbiAgICAvKioqL1xuICAgIFZLX0c6IDcxLFxuICAgIC8qKiovXG4gICAgVktfSDogNzIsXG4gICAgLyoqKi9cbiAgICBWS19JOiA3MyxcbiAgICAvKioqL1xuICAgIFZLX0o6IDc0LFxuICAgIC8qKiovXG4gICAgVktfSzogNzUsXG4gICAgLyoqKi9cbiAgICBWS19MOiA3NixcbiAgICAvKioqL1xuICAgIFZLX006IDc3LFxuICAgIC8qKiovXG4gICAgVktfTjogNzgsXG4gICAgLyoqKi9cbiAgICBWS19POiA3OSxcbiAgICAvKioqL1xuICAgIFZLX1A6IDgwLFxuICAgIC8qKiovXG4gICAgVktfUTogODEsXG4gICAgLyoqKi9cbiAgICBWS19SOiA4MixcbiAgICAvKioqL1xuICAgIFZLX1M6IDgzLFxuICAgIC8qKiovXG4gICAgVktfVDogODQsXG4gICAgLyoqKi9cbiAgICBWS19VOiA4NSxcbiAgICAvKioqL1xuICAgIFZLX1Y6IDg2LFxuICAgIC8qKiovXG4gICAgVktfVzogODcsXG4gICAgLyoqKi9cbiAgICBWS19YOiA4OCxcbiAgICAvKioqL1xuICAgIFZLX1k6IDg5LFxuICAgIC8qKiovXG4gICAgVktfWjogOTAsXG4gICAgLyoqKi9cbiAgICBWS19DT05URVhUX01FTlU6IDkzLFxuICAgIC8qKiAwIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQwOiA5NixcbiAgICAvKiogMSBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFEMTogOTcsXG4gICAgLyoqIDIgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDI6IDk4LFxuICAgIC8qKiAzIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQzOiA5OSxcbiAgICAvKiogNCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFENDogMTAwLFxuICAgIC8qKiA1IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ1OiAxMDEsXG4gICAgLyoqIDYgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDY6IDEwMixcbiAgICAvKiogNyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTlVNUEFENzogMTAzLFxuICAgIC8qKiA4IG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19OVU1QQUQ4OiAxMDQsXG4gICAgLyoqIDkgb24gdGhlIG51bWVyaWMga2V5cGFkLiAqL1xuICAgIFZLX05VTVBBRDk6IDEwNSxcbiAgICAvKiogKiBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfTVVMVElQTFk6IDEwNixcbiAgICAvKiogKyBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfQUREOiAxMDcsXG4gICAgLyoqKi9cbiAgICBWS19TRVBBUkFUT1I6IDEwOCxcbiAgICAvKiogLSBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfU1VCVFJBQ1Q6IDEwOSxcbiAgICAvKiogRGVjaW1hbCBwb2ludCBvbiB0aGUgbnVtZXJpYyBrZXlwYWQuICovXG4gICAgVktfREVDSU1BTDogMTEwLFxuICAgIC8qKiAvIG9uIHRoZSBudW1lcmljIGtleXBhZC4gKi9cbiAgICBWS19ESVZJREU6IDExMSxcbiAgICAvKiogRjEga2V5LiAqL1xuICAgIFZLX0YxOiAxMTIsXG4gICAgLyoqIEYyIGtleS4gKi9cbiAgICBWS19GMjogMTEzLFxuICAgIC8qKiBGMyBrZXkuICovXG4gICAgVktfRjM6IDExNCxcbiAgICAvKiogRjQga2V5LiAqL1xuICAgIFZLX0Y0OiAxMTUsXG4gICAgLyoqIEY1IGtleS4gKi9cbiAgICBWS19GNTogMTE2LFxuICAgIC8qKiBGNiBrZXkuICovXG4gICAgVktfRjY6IDExNyxcbiAgICAvKiogRjcga2V5LiAqL1xuICAgIFZLX0Y3OiAxMTgsXG4gICAgLyoqIEY4IGtleS4gKi9cbiAgICBWS19GODogMTE5LFxuICAgIC8qKiBGOSBrZXkuICovXG4gICAgVktfRjk6IDEyMCxcbiAgICAvKiogRjEwIGtleS4gKi9cbiAgICBWS19GMTA6IDEyMSxcbiAgICAvKiogRjExIGtleS4gKi9cbiAgICBWS19GMTE6IDEyMixcbiAgICAvKiogRjEyIGtleS4gKi9cbiAgICBWS19GMTI6IDEyMyxcbiAgICAvKiogRjEzIGtleS4gKi9cbiAgICBWS19GMTM6IDEyNCxcbiAgICAvKiogRjE0IGtleS4gKi9cbiAgICBWS19GMTQ6IDEyNSxcbiAgICAvKiogRjE1IGtleS4gKi9cbiAgICBWS19GMTU6IDEyNixcbiAgICAvKiogRjE2IGtleS4gKi9cbiAgICBWS19GMTY6IDEyNyxcbiAgICAvKiogRjE3IGtleS4gKi9cbiAgICBWS19GMTc6IDEyOCxcbiAgICAvKiogRjE4IGtleS4gKi9cbiAgICBWS19GMTg6IDEyOSxcbiAgICAvKiogRjE5IGtleS4gKi9cbiAgICBWS19GMTk6IDEzMCxcbiAgICAvKiogRjIwIGtleS4gKi9cbiAgICBWS19GMjA6IDEzMSxcbiAgICAvKiogRjIxIGtleS4gKi9cbiAgICBWS19GMjE6IDEzMixcbiAgICAvKiogRjIyIGtleS4gKi9cbiAgICBWS19GMjI6IDEzMyxcbiAgICAvKiogRjIzIGtleS4gKi9cbiAgICBWS19GMjM6IDEzNCxcbiAgICAvKiogRjI0IGtleS4gKi9cbiAgICBWS19GMjQ6IDEzNSxcbiAgICAvKiogTnVtIExvY2sga2V5LiAqL1xuICAgIFZLX05VTV9MT0NLOiAxNDQsXG4gICAgLyoqIFNjcm9sbCBMb2NrIGtleS4gKi9cbiAgICBWS19TQ1JPTExfTE9DSzogMTQ1LFxuICAgIC8qKiBDaXJjdW1mbGV4ICheKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19DSVJDVU1GTEVYOiAxNjAsXG4gICAgLyoqIEV4Y2xhbWF0aW9uICghKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19FWENMQU1BVElPTjogMTYxLFxuICAgIC8qKiBEb3VibGUgcXVvdGUgKCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfRE9VQkxFX1FVT1RFOiAxNjIsXG4gICAgLyoqIEhhc2ggKCMpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0hBU0g6IDE2MyxcbiAgICAvKiogRG9sbGFyIHNpZ24gKCQpIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0RPTExBUjogMTY0LFxuICAgIC8qKiBQZXJjZW50ICglKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19QRVJDRU5UOiAxNjUsXG4gICAgLyoqIEFtcGVyc2FuZCAoJikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQU1QRVJTQU5EOiAxNjYsXG4gICAgLyoqIFVuZGVyc2NvcmUgKF8pIGtleS4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX1VOREVSU0NPUkU6IDE2NyxcbiAgICAvKiogT3BlbiBwYXJlbnRoZXNpcyAoKCkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfT1BFTl9QQVJFTjogMTY4LFxuICAgIC8qKiBDbG9zZSBwYXJlbnRoZXNpcyAoKSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQ0xPU0VfUEFSRU46IDE2OSxcbiAgICAvKiBBc3RlcmlzayAoKikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQVNURVJJU0s6IDE3MCxcbiAgICAvKiogUGx1cyAoKykga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfUExVUzogMTcxLFxuICAgIC8qKiBQaXBlICh8KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19QSVBFOiAxNzIsXG4gICAgLyoqIEh5cGhlbi1VUy9kb2NzL01pbnVzICgtKSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19IWVBIRU5fTUlOVVM6IDE3MyxcbiAgICAvKiogT3BlbiBjdXJseSBicmFja2V0ICh7KSBrZXkuIFJlcXVpcmVzIEdlY2tvIDE1LjAgKi9cbiAgICBWS19PUEVOX0NVUkxZX0JSQUNLRVQ6IDE3NCxcbiAgICAvKiogQ2xvc2UgY3VybHkgYnJhY2tldCAofSkga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfQ0xPU0VfQ1VSTFlfQlJBQ0tFVDogMTc1LFxuICAgIC8qKiBUaWxkZSAofikga2V5LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfVElMREU6IDE3NixcbiAgICAvKiogQ29tbWEgKCwpIGtleS4gKi9cbiAgICBWS19DT01NQTogMTg4LFxuICAgIC8qKiBQZXJpb2QgKC4pIGtleS4gKi9cbiAgICBWS19QRVJJT0Q6IDE5MCxcbiAgICAvKiogU2xhc2ggKC8pIGtleS4gKi9cbiAgICBWS19TTEFTSDogMTkxLFxuICAgIC8qKiBCYWNrIHRpY2sgKGApIGtleS4gKi9cbiAgICBWS19CQUNLX1FVT1RFOiAxOTIsXG4gICAgLyoqIE9wZW4gc3F1YXJlIGJyYWNrZXQgKFspIGtleS4gKi9cbiAgICBWS19PUEVOX0JSQUNLRVQ6IDIxOSxcbiAgICAvKiogQmFjayBzbGFzaCAoXFwpIGtleS4gKi9cbiAgICBWS19CQUNLX1NMQVNIOiAyMjAsXG4gICAgLyoqIENsb3NlIHNxdWFyZSBicmFja2V0IChdKSBrZXkuICovXG4gICAgVktfQ0xPU0VfQlJBQ0tFVDogMjIxLFxuICAgIC8qKiBRdW90ZSAoJycnKSBrZXkuICovXG4gICAgVktfUVVPVEU6IDIyMixcbiAgICAvKiogTWV0YSBrZXkgb24gTGludXgsIENvbW1hbmQga2V5IG9uIE1hYy4gKi9cbiAgICBWS19NRVRBOiAyMjQsXG4gICAgLyoqIEFsdEdyIGtleSBvbiBMaW51eC4gUmVxdWlyZXMgR2Vja28gMTUuMCAqL1xuICAgIFZLX0FMVEdSOiAyMjUsXG4gICAgLyoqIFdpbmRvd3MgbG9nbyBrZXkgb24gV2luZG93cy4gT3IgU3VwZXIgb3IgSHlwZXIga2V5IG9uIExpbnV4LiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfV0lOOiA5MSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfS0FOQTogMjEsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0hBTkdVTDogMjEsXG4gICAgLyoqIOiLseaVsCBrZXkgb24gSmFwYW5lc2UgTWFjIGtleWJvYXJkLiBSZXF1aXJlcyBHZWNrbyAxNS4wICovXG4gICAgVktfRUlTVTogMjIsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0pVTkpBOiAyMyxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfRklOQUw6IDI0LFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19IQU5KQTogMjUsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX0tBTkpJOiAyNSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfQ09OVkVSVDogMjgsXG4gICAgLyoqIExpbnV4IHN1cHBvcnQgZm9yIHRoaXMga2V5Y29kZSB3YXMgYWRkZWQgaW4gR2Vja28gNC4wLiAqL1xuICAgIFZLX05PTkNPTlZFUlQ6IDI5LFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19BQ0NFUFQ6IDMwLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19NT0RFQ0hBTkdFOiAzMSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfU0VMRUNUOiA0MSxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuICovXG4gICAgVktfUFJJTlQ6IDQyLFxuICAgIC8qKiBMaW51eCBzdXBwb3J0IGZvciB0aGlzIGtleWNvZGUgd2FzIGFkZGVkIGluIEdlY2tvIDQuMC4gKi9cbiAgICBWS19FWEVDVVRFOiA0MyxcbiAgICAvKiogTGludXggc3VwcG9ydCBmb3IgdGhpcyBrZXljb2RlIHdhcyBhZGRlZCBpbiBHZWNrbyA0LjAuXHQgKi9cbiAgICBWS19TTEVFUDogOTVcbn07XG4iLCIvKipcbiAqIEBjbGFzcyBBYnN0cmFjdCBkaXNwbGF5IGJhY2tlbmQgbW9kdWxlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrZW5kIHtcbiAgICBnZXRDb250YWluZXIoKSB7IHJldHVybiBudWxsOyB9XG4gICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7IHRoaXMuX29wdGlvbnMgPSBvcHRpb25zOyB9XG59XG4iLCJpbXBvcnQgQmFja2VuZCBmcm9tIFwiLi9iYWNrZW5kLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMgZXh0ZW5kcyBCYWNrZW5kIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fY3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfVxuICAgIHNjaGVkdWxlKGNiKSB7IHJlcXVlc3RBbmltYXRpb25GcmFtZShjYik7IH1cbiAgICBnZXRDb250YWluZXIoKSB7IHJldHVybiB0aGlzLl9jdHguY2FudmFzOyB9XG4gICAgc2V0T3B0aW9ucyhvcHRzKSB7XG4gICAgICAgIHN1cGVyLnNldE9wdGlvbnMob3B0cyk7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gKG9wdHMuZm9udFN0eWxlID8gYCR7b3B0cy5mb250U3R5bGV9IGAgOiBgYCk7XG4gICAgICAgIGNvbnN0IGZvbnQgPSBgJHtzdHlsZX0gJHtvcHRzLmZvbnRTaXplfXB4ICR7b3B0cy5mb250RmFtaWx5fWA7XG4gICAgICAgIHRoaXMuX2N0eC5mb250ID0gZm9udDtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgICB0aGlzLl9jdHguZm9udCA9IGZvbnQ7XG4gICAgICAgIHRoaXMuX2N0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICAgICAgICB0aGlzLl9jdHgudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSB0aGlzLl9vcHRpb25zLmJnO1xuICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5fY3R4LmNhbnZhcy53aWR0aCwgdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cbiAgICBldmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5fY3R4LmNhbnZhcztcbiAgICAgICAgbGV0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHggLT0gcmVjdC5sZWZ0O1xuICAgICAgICB5IC09IHJlY3QudG9wO1xuICAgICAgICB4ICo9IGNhbnZhcy53aWR0aCAvIHJlY3Qud2lkdGg7XG4gICAgICAgIHkgKj0gY2FudmFzLmhlaWdodCAvIHJlY3QuaGVpZ2h0O1xuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSBjYW52YXMud2lkdGggfHwgeSA+PSBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gWy0xLCAtMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEhleCBmcm9tIFwiLi9oZXguanNcIjtcbmltcG9ydCBSZWN0IGZyb20gXCIuL3JlY3QuanNcIjtcbmltcG9ydCBUaWxlIGZyb20gXCIuL3RpbGUuanNcIjtcbmltcG9ydCBUaWxlR0wgZnJvbSBcIi4vdGlsZS1nbC5qc1wiO1xuaW1wb3J0IFRlcm0gZnJvbSBcIi4vdGVybS5qc1wiO1xuaW1wb3J0ICogYXMgVGV4dCBmcm9tIFwiLi4vdGV4dC5qc1wiO1xuaW1wb3J0IHsgREVGQVVMVF9XSURUSCwgREVGQVVMVF9IRUlHSFQgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG5jb25zdCBCQUNLRU5EUyA9IHtcbiAgICBcImhleFwiOiBIZXgsXG4gICAgXCJyZWN0XCI6IFJlY3QsXG4gICAgXCJ0aWxlXCI6IFRpbGUsXG4gICAgXCJ0aWxlLWdsXCI6IFRpbGVHTCxcbiAgICBcInRlcm1cIjogVGVybVxufTtcbmNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICB3aWR0aDogREVGQVVMVF9XSURUSCxcbiAgICBoZWlnaHQ6IERFRkFVTFRfSEVJR0hULFxuICAgIHRyYW5zcG9zZTogZmFsc2UsXG4gICAgbGF5b3V0OiBcInJlY3RcIixcbiAgICBmb250U2l6ZTogMTUsXG4gICAgc3BhY2luZzogMSxcbiAgICBib3JkZXI6IDAsXG4gICAgZm9yY2VTcXVhcmVSYXRpbzogZmFsc2UsXG4gICAgZm9udEZhbWlseTogXCJtb25vc3BhY2VcIixcbiAgICBmb250U3R5bGU6IFwiXCIsXG4gICAgZmc6IFwiI2NjY1wiLFxuICAgIGJnOiBcIiMwMDBcIixcbiAgICB0aWxlV2lkdGg6IDMyLFxuICAgIHRpbGVIZWlnaHQ6IDMyLFxuICAgIHRpbGVNYXA6IHt9LFxuICAgIHRpbGVTZXQ6IG51bGwsXG4gICAgdGlsZUNvbG9yaXplOiBmYWxzZVxufTtcbi8qKlxuICogQGNsYXNzIFZpc3VhbCBtYXAgZGlzcGxheVxuICovXG5sZXQgRGlzcGxheSA9IC8qKiBAY2xhc3MgKi8gKCgpID0+IHtcbiAgICBjbGFzcyBEaXNwbGF5IHtcbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgICAgICAgICB0aGlzLl9kaXJ0eSA9IGZhbHNlOyAvLyBmYWxzZSA9IG5vdGhpbmcsIHRydWUgPSBhbGwsIG9iamVjdCA9IGRpcnR5IGNlbGxzXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0ge307XG4gICAgICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuREVCVUcgPSB0aGlzLkRFQlVHLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl90aWNrID0gdGhpcy5fdGljay5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fYmFja2VuZC5zY2hlZHVsZSh0aGlzLl90aWNrKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogRGVidWcgaGVscGVyLCBpZGVhbCBhcyBhIG1hcCBnZW5lcmF0b3IgY2FsbGJhY2suIEFsd2F5cyBib3VuZCB0byB0aGlzLlxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAgICAgKiBAcGFyYW0ge2ludH0gd2hhdFxuICAgICAgICAgKi9cbiAgICAgICAgREVCVUcoeCwgeSwgd2hhdCkge1xuICAgICAgICAgICAgbGV0IGNvbG9ycyA9IFt0aGlzLl9vcHRpb25zLmJnLCB0aGlzLl9vcHRpb25zLmZnXTtcbiAgICAgICAgICAgIHRoaXMuZHJhdyh4LCB5LCBudWxsLCBudWxsLCBjb2xvcnNbd2hhdCAlIGNvbG9ycy5sZW5ndGhdKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ2xlYXIgdGhlIHdob2xlIGRpc3BsYXkgKGNvdmVyIGl0IHdpdGggYmFja2dyb3VuZCBjb2xvcilcbiAgICAgICAgICovXG4gICAgICAgIGNsZWFyKCkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAc2VlIFJPVC5EaXNwbGF5XG4gICAgICAgICAqL1xuICAgICAgICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy53aWR0aCB8fCBvcHRpb25zLmhlaWdodCB8fCBvcHRpb25zLmZvbnRTaXplIHx8IG9wdGlvbnMuZm9udEZhbWlseSB8fCBvcHRpb25zLnNwYWNpbmcgfHwgb3B0aW9ucy5sYXlvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5sYXlvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN0b3IgPSBCQUNLRU5EU1tvcHRpb25zLmxheW91dF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JhY2tlbmQgPSBuZXcgY3RvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9iYWNrZW5kLnNldE9wdGlvbnModGhpcy5fb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgY3VycmVudGx5IHNldCBvcHRpb25zXG4gICAgICAgICAqL1xuICAgICAgICBnZXRPcHRpb25zKCkgeyByZXR1cm4gdGhpcy5fb3B0aW9uczsgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgRE9NIG5vZGUgb2YgdGhpcyBkaXNwbGF5XG4gICAgICAgICAqL1xuICAgICAgICBnZXRDb250YWluZXIoKSB7IHJldHVybiB0aGlzLl9iYWNrZW5kLmdldENvbnRhaW5lcigpOyB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wdXRlIHRoZSBtYXhpbXVtIHdpZHRoL2hlaWdodCB0byBmaXQgaW50byBhIHNldCBvZiBnaXZlbiBjb25zdHJhaW50c1xuICAgICAgICAgKiBAcGFyYW0ge2ludH0gYXZhaWxXaWR0aCBNYXhpbXVtIGFsbG93ZWQgcGl4ZWwgd2lkdGhcbiAgICAgICAgICogQHBhcmFtIHtpbnR9IGF2YWlsSGVpZ2h0IE1heGltdW0gYWxsb3dlZCBwaXhlbCBoZWlnaHRcbiAgICAgICAgICogQHJldHVybnMge2ludFsyXX0gY2VsbFdpZHRoLGNlbGxIZWlnaHRcbiAgICAgICAgICovXG4gICAgICAgIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZC5jb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXB1dGUgdGhlIG1heGltdW0gZm9udCBzaXplIHRvIGZpdCBpbnRvIGEgc2V0IG9mIGdpdmVuIGNvbnN0cmFpbnRzXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSBhdmFpbFdpZHRoIE1heGltdW0gYWxsb3dlZCBwaXhlbCB3aWR0aFxuICAgICAgICAgKiBAcGFyYW0ge2ludH0gYXZhaWxIZWlnaHQgTWF4aW11bSBhbGxvd2VkIHBpeGVsIGhlaWdodFxuICAgICAgICAgKiBAcmV0dXJucyB7aW50fSBmb250U2l6ZVxuICAgICAgICAgKi9cbiAgICAgICAgY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZC5jb21wdXRlRm9udFNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbXB1dGVUaWxlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy53aWR0aCk7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnQgYSBET00gZXZlbnQgKG1vdXNlIG9yIHRvdWNoKSB0byBtYXAgY29vcmRpbmF0ZXMuIFVzZXMgZmlyc3QgdG91Y2ggZm9yIG11bHRpLXRvdWNoLlxuICAgICAgICAgKiBAcGFyYW0ge0V2ZW50fSBlIGV2ZW50XG4gICAgICAgICAqIEByZXR1cm5zIHtpbnRbMl19IC0xIGZvciB2YWx1ZXMgb3V0c2lkZSBvZiB0aGUgY2FudmFzXG4gICAgICAgICAqL1xuICAgICAgICBldmVudFRvUG9zaXRpb24oZSkge1xuICAgICAgICAgICAgbGV0IHgsIHk7XG4gICAgICAgICAgICBpZiAoXCJ0b3VjaGVzXCIgaW4gZSkge1xuICAgICAgICAgICAgICAgIHggPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgICAgICAgICB5ID0gZS50b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB4ID0gZS5jbGllbnRYO1xuICAgICAgICAgICAgICAgIHkgPSBlLmNsaWVudFk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFja2VuZC5ldmVudFRvUG9zaXRpb24oeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nIHx8IHN0cmluZ1tdfSBjaCBPbmUgb3IgbW9yZSBjaGFycyAod2lsbCBiZSBvdmVybGFwcGluZyB0aGVtc2VsdmVzKVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2ZnXSBmb3JlZ3JvdW5kIGNvbG9yXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbYmddIGJhY2tncm91bmQgY29sb3JcbiAgICAgICAgICovXG4gICAgICAgIGRyYXcoeCwgeSwgY2gsIGZnLCBiZykge1xuICAgICAgICAgICAgaWYgKCFmZykge1xuICAgICAgICAgICAgICAgIGZnID0gdGhpcy5fb3B0aW9ucy5mZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYmcpIHtcbiAgICAgICAgICAgICAgICBiZyA9IHRoaXMuX29wdGlvbnMuYmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQga2V5ID0gYCR7eH0sJHt5fWA7XG4gICAgICAgICAgICB0aGlzLl9kYXRhW2tleV0gPSBbeCwgeSwgY2gsIGZnLCBiZ107XG4gICAgICAgICAgICBpZiAodGhpcy5fZGlydHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IC8vIHdpbGwgYWxyZWFkeSByZWRyYXcgZXZlcnl0aGluZyBcbiAgICAgICAgICAgIGlmICghdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJ0eSA9IHt9O1xuICAgICAgICAgICAgfSAvLyBmaXJzdCFcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5W2tleV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEcmF3cyBhIHRleHQgYXQgZ2l2ZW4gcG9zaXRpb24uIE9wdGlvbmFsbHkgd3JhcHMgYXQgYSBtYXhpbXVtIGxlbmd0aC4gQ3VycmVudGx5IGRvZXMgbm90IHdvcmsgd2l0aCBoZXggbGF5b3V0LlxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBNYXkgY29udGFpbiBjb2xvci9iYWNrZ3JvdW5kIGZvcm1hdCBzcGVjaWZpZXJzLCAlY3tuYW1lfS8lYntuYW1lfSwgYm90aCBvcHRpb25hbC4gJWN7fS8lYnt9IHJlc2V0cyB0byBkZWZhdWx0LlxuICAgICAgICAgKiBAcGFyYW0ge2ludH0gW21heFdpZHRoXSB3cmFwIGF0IHdoYXQgd2lkdGg/XG4gICAgICAgICAqIEByZXR1cm5zIHtpbnR9IGxpbmVzIGRyYXduXG4gICAgICAgICAqL1xuICAgICAgICBkcmF3VGV4dCh4LCB5LCB0ZXh0LCBtYXhXaWR0aCkge1xuICAgICAgICAgICAgbGV0IGZnID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBiZyA9IG51bGw7XG4gICAgICAgICAgICBsZXQgY3ggPSB4O1xuICAgICAgICAgICAgbGV0IGN5ID0geTtcbiAgICAgICAgICAgIGxldCBsaW5lcyA9IDE7XG4gICAgICAgICAgICBpZiAoIW1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgbWF4V2lkdGggPSB0aGlzLl9vcHRpb25zLndpZHRoIC0geDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0b2tlbnMgPSBUZXh0LnRva2VuaXplKHRleHQsIG1heFdpZHRoKTtcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7IC8vIGludGVycHJldCB0b2tlbml6ZWQgb3Bjb2RlIHN0cmVhbVxuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IHRva2Vucy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFRleHQuVFlQRV9URVhUOlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzU3BhY2UgPSBmYWxzZSwgaXNQcmV2U3BhY2UgPSBmYWxzZSwgaXNGdWxsV2lkdGggPSBmYWxzZSwgaXNQcmV2RnVsbFdpZHRoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2VuLnZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNjID0gdG9rZW4udmFsdWUuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IHRva2VuLnZhbHVlLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy5sYXlvdXQgPT09IFwidGVybVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjY2ggPSBjYyA+PiA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNDSksgPSBjY2ggPT09IDB4MTEgfHwgKGNjaCA+PSAweDJlICYmIGNjaCA8PSAweDlmKSB8fCAoY2NoID49IDB4YWMgJiYgY2NoIDw9IDB4ZDcpIHx8IChjYyA+PSAweEE5NjAgJiYgY2MgPD0gMHhBOTdGKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ0pLKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXcoY3ggKyAwLCBjeSwgYywgZmcsIGJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhdyhjeCArIDEsIGN5LCBcIlxcdFwiLCBmZywgYmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ggKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFzc2lnbiB0byBgdHJ1ZWAgd2hlbiB0aGUgY3VycmVudCBjaGFyIGlzIGZ1bGwtd2lkdGguXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGdWxsV2lkdGggPSAoY2MgPiAweGZmMDAgJiYgY2MgPCAweGZmNjEpIHx8IChjYyA+IDB4ZmZkYyAmJiBjYyA8IDB4ZmZlOCkgfHwgY2MgPiAweGZmZWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3VycmVudCBjaGFyIGlzIHNwYWNlLCB3aGF0ZXZlciBmdWxsLXdpZHRoIG9yIGhhbGYtd2lkdGggYm90aCBhcmUgT0suXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTcGFjZSA9IChjLmNoYXJDb2RlQXQoMCkgPT0gMHgyMCB8fCBjLmNoYXJDb2RlQXQoMCkgPT0gMHgzMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcHJldmlvdXMgY2hhciBpcyBmdWxsLXdpZHRoIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGN1cnJlbnQgY2hhciBpcyBuZXRoZXIgaGFsZi13aWR0aCBub3IgYSBzcGFjZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcmV2RnVsbFdpZHRoICYmICFpc0Z1bGxXaWR0aCAmJiAhaXNTcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gLy8gYWRkIGFuIGV4dHJhIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgY2hhciBpcyBmdWxsLXdpZHRoIGFuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBwcmV2aW91cyBjaGFyIGlzIG5vdCBhIHNwYWNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Z1bGxXaWR0aCAmJiAhaXNQcmV2U3BhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3grKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IC8vIGFkZCBhbiBleHRyYSBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhdyhjeCsrLCBjeSwgYywgZmcsIGJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1ByZXZTcGFjZSA9IGlzU3BhY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmV2RnVsbFdpZHRoID0gaXNGdWxsV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUZXh0LlRZUEVfRkc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmZyA9IHRva2VuLnZhbHVlIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUZXh0LlRZUEVfQkc6XG4gICAgICAgICAgICAgICAgICAgICAgICBiZyA9IHRva2VuLnZhbHVlIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBUZXh0LlRZUEVfTkVXTElORTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN4ID0geDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN5Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lcysrO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpbmVzO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaW1lciB0aWNrOiB1cGRhdGUgZGlydHkgcGFydHNcbiAgICAgICAgICovXG4gICAgICAgIF90aWNrKCkge1xuICAgICAgICAgICAgdGhpcy5fYmFja2VuZC5zY2hlZHVsZSh0aGlzLl90aWNrKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fZGlydHkgPT09IHRydWUpIHsgLy8gZHJhdyBhbGxcbiAgICAgICAgICAgICAgICB0aGlzLl9iYWNrZW5kLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcmF3KGlkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSAvLyByZWRyYXcgY2FjaGVkIGRhdGEgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgLy8gZHJhdyBvbmx5IGRpcnR5IFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9kaXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcmF3KGtleSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBXaGF0IHRvIGRyYXdcbiAgICAgICAgICogQHBhcmFtIHtib29sfSBjbGVhckJlZm9yZSBJcyBpdCBuZWNlc3NhcnkgdG8gY2xlYW4gYmVmb3JlP1xuICAgICAgICAgKi9cbiAgICAgICAgX2RyYXcoa2V5LCBjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9kYXRhW2tleV07XG4gICAgICAgICAgICBpZiAoZGF0YVs0XSAhPSB0aGlzLl9vcHRpb25zLmJnKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJCZWZvcmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYmFja2VuZC5kcmF3KGRhdGEsIGNsZWFyQmVmb3JlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBEaXNwbGF5LlJlY3QgPSBSZWN0O1xuICAgIERpc3BsYXkuSGV4ID0gSGV4O1xuICAgIERpc3BsYXkuVGlsZSA9IFRpbGU7XG4gICAgRGlzcGxheS5UaWxlR0wgPSBUaWxlR0w7XG4gICAgRGlzcGxheS5UZXJtID0gVGVybTtcbiAgICByZXR1cm4gRGlzcGxheTtcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBEaXNwbGF5O1xuIiwiaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9jYW52YXMuanNcIjtcbmltcG9ydCB7IG1vZCB9IGZyb20gXCIuLi91dGlsLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBIZXhhZ29uYWwgYmFja2VuZFxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGV4IGV4dGVuZHMgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSAwO1xuICAgICAgICB0aGlzLl9zcGFjaW5nWSA9IDA7XG4gICAgICAgIHRoaXMuX2hleFNpemUgPSAwO1xuICAgIH1cbiAgICBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgIGxldCBbeCwgeSwgY2gsIGZnLCBiZ10gPSBkYXRhO1xuICAgICAgICBsZXQgcHggPSBbXG4gICAgICAgICAgICAoeCArIDEpICogdGhpcy5fc3BhY2luZ1gsXG4gICAgICAgICAgICB5ICogdGhpcy5fc3BhY2luZ1kgKyB0aGlzLl9oZXhTaXplXG4gICAgICAgIF07XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICAgICAgcHgucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbGVhckJlZm9yZSkge1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgdGhpcy5fZmlsbChweFswXSwgcHhbMV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gZmc7XG4gICAgICAgIGxldCBjaGFycyA9IFtdLmNvbmNhdChjaCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsVGV4dChjaGFyc1tpXSwgcHhbMF0sIE1hdGguY2VpbChweFsxXSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICAgICAgYXZhaWxXaWR0aCArPSBhdmFpbEhlaWdodDtcbiAgICAgICAgICAgIGF2YWlsSGVpZ2h0ID0gYXZhaWxXaWR0aCAtIGF2YWlsSGVpZ2h0O1xuICAgICAgICAgICAgYXZhaWxXaWR0aCAtPSBhdmFpbEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9zcGFjaW5nWCkgLSAxO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5mbG9vcigoYXZhaWxIZWlnaHQgLSAyICogdGhpcy5faGV4U2l6ZSkgLyB0aGlzLl9zcGFjaW5nWSArIDEpO1xuICAgICAgICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdO1xuICAgIH1cbiAgICBjb21wdXRlRm9udFNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgICAgICBhdmFpbFdpZHRoICs9IGF2YWlsSGVpZ2h0O1xuICAgICAgICAgICAgYXZhaWxIZWlnaHQgPSBhdmFpbFdpZHRoIC0gYXZhaWxIZWlnaHQ7XG4gICAgICAgICAgICBhdmFpbFdpZHRoIC09IGF2YWlsSGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGxldCBoZXhTaXplV2lkdGggPSAyICogYXZhaWxXaWR0aCAvICgodGhpcy5fb3B0aW9ucy53aWR0aCArIDEpICogTWF0aC5zcXJ0KDMpKSAtIDE7XG4gICAgICAgIGxldCBoZXhTaXplSGVpZ2h0ID0gYXZhaWxIZWlnaHQgLyAoMiArIDEuNSAqICh0aGlzLl9vcHRpb25zLmhlaWdodCAtIDEpKTtcbiAgICAgICAgbGV0IGhleFNpemUgPSBNYXRoLm1pbihoZXhTaXplV2lkdGgsIGhleFNpemVIZWlnaHQpO1xuICAgICAgICAvLyBjb21wdXRlIGNoYXIgcmF0aW9cbiAgICAgICAgbGV0IG9sZEZvbnQgPSB0aGlzLl9jdHguZm9udDtcbiAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBcIjEwMHB4IFwiICsgdGhpcy5fb3B0aW9ucy5mb250RmFtaWx5O1xuICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aCk7XG4gICAgICAgIHRoaXMuX2N0eC5mb250ID0gb2xkRm9udDtcbiAgICAgICAgbGV0IHJhdGlvID0gd2lkdGggLyAxMDA7XG4gICAgICAgIGhleFNpemUgPSBNYXRoLmZsb29yKGhleFNpemUpICsgMTsgLy8gY2xvc2VzdCBsYXJnZXIgaGV4U2l6ZVxuICAgICAgICAvLyBGSVhNRSBjaGFyIHNpemUgY29tcHV0YXRpb24gZG9lcyBub3QgcmVzcGVjdCB0cmFuc3Bvc2VkIGhleGVzXG4gICAgICAgIGxldCBmb250U2l6ZSA9IDIgKiBoZXhTaXplIC8gKHRoaXMuX29wdGlvbnMuc3BhY2luZyAqICgxICsgcmF0aW8gLyBNYXRoLnNxcnQoMykpKTtcbiAgICAgICAgLy8gY2xvc2VzdCBzbWFsbGVyIGZvbnRTaXplXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoZm9udFNpemUpIC0gMTtcbiAgICB9XG4gICAgX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgICBsZXQgbm9kZVNpemU7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRyYW5zcG9zZSkge1xuICAgICAgICAgICAgeCArPSB5O1xuICAgICAgICAgICAgeSA9IHggLSB5O1xuICAgICAgICAgICAgeCAtPSB5O1xuICAgICAgICAgICAgbm9kZVNpemUgPSB0aGlzLl9jdHguY2FudmFzLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9kZVNpemUgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2l6ZSA9IG5vZGVTaXplIC8gdGhpcy5fb3B0aW9ucy5oZWlnaHQ7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKHkgLyBzaXplKTtcbiAgICAgICAgaWYgKG1vZCh5LCAyKSkgeyAvKiBvZGQgcm93ICovXG4gICAgICAgICAgICB4IC09IHRoaXMuX3NwYWNpbmdYO1xuICAgICAgICAgICAgeCA9IDEgKyAyICogTWF0aC5mbG9vcih4IC8gKDIgKiB0aGlzLl9zcGFjaW5nWCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeCA9IDIgKiBNYXRoLmZsb29yKHggLyAoMiAqIHRoaXMuX3NwYWNpbmdYKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXJndW1lbnRzIGFyZSBwaXhlbCB2YWx1ZXMuIElmIFwidHJhbnNwb3NlZFwiIG1vZGUgaXMgZW5hYmxlZCwgdGhlbiB0aGVzZSB0d28gYXJlIGFscmVhZHkgc3dhcHBlZC5cbiAgICAgKi9cbiAgICBfZmlsbChjeCwgY3kpIHtcbiAgICAgICAgbGV0IGEgPSB0aGlzLl9oZXhTaXplO1xuICAgICAgICBsZXQgYiA9IHRoaXMuX29wdGlvbnMuYm9yZGVyO1xuICAgICAgICBjb25zdCBjdHggPSB0aGlzLl9jdHg7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudHJhbnNwb3NlKSB7XG4gICAgICAgICAgICBjdHgubW92ZVRvKGN4IC0gYSArIGIsIGN5KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggLSBhIC8gMiArIGIsIGN5ICsgdGhpcy5fc3BhY2luZ1ggLSBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggKyBhIC8gMiAtIGIsIGN5ICsgdGhpcy5fc3BhY2luZ1ggLSBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggKyBhIC0gYiwgY3kpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCArIGEgLyAyIC0gYiwgY3kgLSB0aGlzLl9zcGFjaW5nWCArIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCAtIGEgLyAyICsgYiwgY3kgLSB0aGlzLl9zcGFjaW5nWCArIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCAtIGEgKyBiLCBjeSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdHgubW92ZVRvKGN4LCBjeSAtIGEgKyBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggKyB0aGlzLl9zcGFjaW5nWCAtIGIsIGN5IC0gYSAvIDIgKyBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3ggKyB0aGlzLl9zcGFjaW5nWCAtIGIsIGN5ICsgYSAvIDIgLSBiKTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3gsIGN5ICsgYSAtIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCAtIHRoaXMuX3NwYWNpbmdYICsgYiwgY3kgKyBhIC8gMiAtIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCAtIHRoaXMuX3NwYWNpbmdYICsgYiwgY3kgLSBhIC8gMiArIGIpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjeCwgY3kgLSBhICsgYik7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG4gICAgX3VwZGF0ZVNpemUoKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgICAgICBjb25zdCBjaGFyV2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aCk7XG4gICAgICAgIHRoaXMuX2hleFNpemUgPSBNYXRoLmZsb29yKG9wdHMuc3BhY2luZyAqIChvcHRzLmZvbnRTaXplICsgY2hhcldpZHRoIC8gTWF0aC5zcXJ0KDMpKSAvIDIpO1xuICAgICAgICB0aGlzLl9zcGFjaW5nWCA9IHRoaXMuX2hleFNpemUgKiBNYXRoLnNxcnQoMykgLyAyO1xuICAgICAgICB0aGlzLl9zcGFjaW5nWSA9IHRoaXMuX2hleFNpemUgKiAxLjU7XG4gICAgICAgIGxldCB4cHJvcDtcbiAgICAgICAgbGV0IHlwcm9wO1xuICAgICAgICBpZiAob3B0cy50cmFuc3Bvc2UpIHtcbiAgICAgICAgICAgIHhwcm9wID0gXCJoZWlnaHRcIjtcbiAgICAgICAgICAgIHlwcm9wID0gXCJ3aWR0aFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeHByb3AgPSBcIndpZHRoXCI7XG4gICAgICAgICAgICB5cHJvcCA9IFwiaGVpZ2h0XCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3R4LmNhbnZhc1t4cHJvcF0gPSBNYXRoLmNlaWwoKG9wdHMud2lkdGggKyAxKSAqIHRoaXMuX3NwYWNpbmdYKTtcbiAgICAgICAgdGhpcy5fY3R4LmNhbnZhc1t5cHJvcF0gPSBNYXRoLmNlaWwoKG9wdHMuaGVpZ2h0IC0gMSkgKiB0aGlzLl9zcGFjaW5nWSArIDIgKiB0aGlzLl9oZXhTaXplKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FudmFzIGZyb20gXCIuL2NhbnZhcy5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgUmVjdGFuZ3VsYXIgYmFja2VuZFxuICogQHByaXZhdGVcbiAqL1xubGV0IFJlY3QgPSAvKiogQGNsYXNzICovICgoKSA9PiB7XG4gICAgY2xhc3MgUmVjdCBleHRlbmRzIENhbnZhcyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NwYWNpbmdYID0gMDtcbiAgICAgICAgICAgIHRoaXMuX3NwYWNpbmdZID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhc0NhY2hlID0ge307XG4gICAgICAgIH1cbiAgICAgICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgICAgICBzdXBlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzQ2FjaGUgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBkcmF3KGRhdGEsIGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICBpZiAoUmVjdC5jYWNoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdXaXRoQ2FjaGUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmF3Tm9DYWNoZShkYXRhLCBjbGVhckJlZm9yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2RyYXdXaXRoQ2FjaGUoZGF0YSkge1xuICAgICAgICAgICAgbGV0IFt4LCB5LCBjaCwgZmcsIGJnXSA9IGRhdGE7XG4gICAgICAgICAgICBsZXQgaGFzaCA9IFwiXCIgKyBjaCArIGZnICsgYmc7XG4gICAgICAgICAgICBsZXQgY2FudmFzO1xuICAgICAgICAgICAgaWYgKGhhc2ggaW4gdGhpcy5fY2FudmFzQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICBjYW52YXMgPSB0aGlzLl9jYW52YXNDYWNoZVtoYXNoXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBiID0gdGhpcy5fb3B0aW9ucy5ib3JkZXI7XG4gICAgICAgICAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgICAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSB0aGlzLl9zcGFjaW5nWDtcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5fc3BhY2luZ1k7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChiLCBiLCBjYW52YXMud2lkdGggLSBiLCBjYW52YXMuaGVpZ2h0IC0gYik7XG4gICAgICAgICAgICAgICAgaWYgKGNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBmZztcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZvbnQgPSB0aGlzLl9jdHguZm9udDtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG4gICAgICAgICAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoY2hhcnNbaV0sIHRoaXMuX3NwYWNpbmdYIC8gMiwgTWF0aC5jZWlsKHRoaXMuX3NwYWNpbmdZIC8gMikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbnZhc0NhY2hlW2hhc2hdID0gY2FudmFzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShjYW52YXMsIHggKiB0aGlzLl9zcGFjaW5nWCwgeSAqIHRoaXMuX3NwYWNpbmdZKTtcbiAgICAgICAgfVxuICAgICAgICBfZHJhd05vQ2FjaGUoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgIGxldCBbeCwgeSwgY2gsIGZnLCBiZ10gPSBkYXRhO1xuICAgICAgICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGIgPSB0aGlzLl9vcHRpb25zLmJvcmRlcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gYmc7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KHggKiB0aGlzLl9zcGFjaW5nWCArIGIsIHkgKiB0aGlzLl9zcGFjaW5nWSArIGIsIHRoaXMuX3NwYWNpbmdYIC0gYiwgdGhpcy5fc3BhY2luZ1kgLSBiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gZmc7XG4gICAgICAgICAgICBsZXQgY2hhcnMgPSBbXS5jb25jYXQoY2gpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsVGV4dChjaGFyc1tpXSwgKHggKyAwLjUpICogdGhpcy5fc3BhY2luZ1gsIE1hdGguY2VpbCgoeSArIDAuNSkgKiB0aGlzLl9zcGFjaW5nWSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbXB1dGVTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9zcGFjaW5nWCk7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX3NwYWNpbmdZKTtcbiAgICAgICAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgICAgIH1cbiAgICAgICAgY29tcHV0ZUZvbnRTaXplKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgYm94V2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLndpZHRoKTtcbiAgICAgICAgICAgIGxldCBib3hIZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy5oZWlnaHQpO1xuICAgICAgICAgICAgLyogY29tcHV0ZSBjaGFyIHJhdGlvICovXG4gICAgICAgICAgICBsZXQgb2xkRm9udCA9IHRoaXMuX2N0eC5mb250O1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBcIjEwMHB4IFwiICsgdGhpcy5fb3B0aW9ucy5mb250RmFtaWx5O1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5jZWlsKHRoaXMuX2N0eC5tZWFzdXJlVGV4dChcIldcIikud2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZvbnQgPSBvbGRGb250O1xuICAgICAgICAgICAgbGV0IHJhdGlvID0gd2lkdGggLyAxMDA7XG4gICAgICAgICAgICBsZXQgd2lkdGhGcmFjdGlvbiA9IHJhdGlvICogYm94SGVpZ2h0IC8gYm94V2lkdGg7XG4gICAgICAgICAgICBpZiAod2lkdGhGcmFjdGlvbiA+IDEpIHsgLyogdG9vIHdpZGUgd2l0aCBjdXJyZW50IGFzcGVjdCByYXRpbyAqL1xuICAgICAgICAgICAgICAgIGJveEhlaWdodCA9IE1hdGguZmxvb3IoYm94SGVpZ2h0IC8gd2lkdGhGcmFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihib3hIZWlnaHQgLyB0aGlzLl9vcHRpb25zLnNwYWNpbmcpO1xuICAgICAgICB9XG4gICAgICAgIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgICAgIHJldHVybiBbTWF0aC5mbG9vcih4IC8gdGhpcy5fc3BhY2luZ1gpLCBNYXRoLmZsb29yKHkgLyB0aGlzLl9zcGFjaW5nWSldO1xuICAgICAgICB9XG4gICAgICAgIF91cGRhdGVTaXplKCkge1xuICAgICAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgICAgICBjb25zdCBjaGFyV2lkdGggPSBNYXRoLmNlaWwodGhpcy5fY3R4Lm1lYXN1cmVUZXh0KFwiV1wiKS53aWR0aCk7XG4gICAgICAgICAgICB0aGlzLl9zcGFjaW5nWCA9IE1hdGguY2VpbChvcHRzLnNwYWNpbmcgKiBjaGFyV2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5fc3BhY2luZ1kgPSBNYXRoLmNlaWwob3B0cy5zcGFjaW5nICogb3B0cy5mb250U2l6ZSk7XG4gICAgICAgICAgICBpZiAob3B0cy5mb3JjZVNxdWFyZVJhdGlvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSB0aGlzLl9zcGFjaW5nWSA9IE1hdGgubWF4KHRoaXMuX3NwYWNpbmdYLCB0aGlzLl9zcGFjaW5nWSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jdHguY2FudmFzLndpZHRoID0gb3B0cy53aWR0aCAqIHRoaXMuX3NwYWNpbmdYO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQgPSBvcHRzLmhlaWdodCAqIHRoaXMuX3NwYWNpbmdZO1xuICAgICAgICB9XG4gICAgfVxuICAgIFJlY3QuY2FjaGUgPSBmYWxzZTtcbiAgICByZXR1cm4gUmVjdDtcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBSZWN0O1xuIiwiaW1wb3J0IEJhY2tlbmQgZnJvbSBcIi4vYmFja2VuZC5qc1wiO1xuaW1wb3J0ICogYXMgQ29sb3IgZnJvbSBcIi4uL2NvbG9yLmpzXCI7XG5mdW5jdGlvbiBjbGVhclRvQW5zaShiZykge1xuICAgIHJldHVybiBgXFx4MWJbMDs0ODs1OyR7dGVybWNvbG9yKGJnKX1tXFx4MWJbMkpgO1xufVxuZnVuY3Rpb24gY29sb3JUb0Fuc2koZmcsIGJnKSB7XG4gICAgcmV0dXJuIGBcXHgxYlswOzM4OzU7JHt0ZXJtY29sb3IoZmcpfTs0ODs1OyR7dGVybWNvbG9yKGJnKX1tYDtcbn1cbmZ1bmN0aW9uIHBvc2l0aW9uVG9BbnNpKHgsIHkpIHtcbiAgICByZXR1cm4gYFxceDFiWyR7eSArIDF9OyR7eCArIDF9SGA7XG59XG5mdW5jdGlvbiB0ZXJtY29sb3IoY29sb3IpIHtcbiAgICBjb25zdCBTUkNfQ09MT1JTID0gMjU2LjA7XG4gICAgY29uc3QgRFNUX0NPTE9SUyA9IDYuMDtcbiAgICBjb25zdCBDT0xPUl9SQVRJTyA9IERTVF9DT0xPUlMgLyBTUkNfQ09MT1JTO1xuICAgIGxldCByZ2IgPSBDb2xvci5mcm9tU3RyaW5nKGNvbG9yKTtcbiAgICBsZXQgciA9IE1hdGguZmxvb3IocmdiWzBdICogQ09MT1JfUkFUSU8pO1xuICAgIGxldCBnID0gTWF0aC5mbG9vcihyZ2JbMV0gKiBDT0xPUl9SQVRJTyk7XG4gICAgbGV0IGIgPSBNYXRoLmZsb29yKHJnYlsyXSAqIENPTE9SX1JBVElPKTtcbiAgICByZXR1cm4gciAqIDM2ICsgZyAqIDYgKyBiICogMSArIDE2O1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVybSBleHRlbmRzIEJhY2tlbmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSBbMCwgMF07XG4gICAgICAgIHRoaXMuX2N1cnNvciA9IFstMSwgLTFdO1xuICAgICAgICB0aGlzLl9sYXN0Q29sb3IgPSBcIlwiO1xuICAgIH1cbiAgICBzY2hlZHVsZShjYikgeyBzZXRUaW1lb3V0KGNiLCAxMDAwIC8gNjApOyB9XG4gICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIGxldCBzaXplID0gW29wdGlvbnMud2lkdGgsIG9wdGlvbnMuaGVpZ2h0XTtcbiAgICAgICAgbGV0IGF2YWlsID0gdGhpcy5jb21wdXRlU2l6ZSgpO1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSBhdmFpbC5tYXAoKHZhbCwgaW5kZXgpID0+IE1hdGguZmxvb3IoKHZhbCAtIHNpemVbaW5kZXhdKSAvIDIpKTtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGNsZWFyVG9BbnNpKHRoaXMuX29wdGlvbnMuYmcpKTtcbiAgICB9XG4gICAgZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICAvLyBkZXRlcm1pbmUgd2hlcmUgdG8gZHJhdyB3aGF0IHdpdGggd2hhdCBjb2xvcnNcbiAgICAgICAgbGV0IFt4LCB5LCBjaCwgZmcsIGJnXSA9IGRhdGE7XG4gICAgICAgIC8vIGRldGVybWluZSBpZiB3ZSBuZWVkIHRvIG1vdmUgdGhlIHRlcm1pbmFsIGN1cnNvclxuICAgICAgICBsZXQgZHggPSB0aGlzLl9vZmZzZXRbMF0gKyB4O1xuICAgICAgICBsZXQgZHkgPSB0aGlzLl9vZmZzZXRbMV0gKyB5O1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuY29tcHV0ZVNpemUoKTtcbiAgICAgICAgaWYgKGR4IDwgMCB8fCBkeCA+PSBzaXplWzBdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR5IDwgMCB8fCBkeSA+PSBzaXplWzFdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR4ICE9PSB0aGlzLl9jdXJzb3JbMF0gfHwgZHkgIT09IHRoaXMuX2N1cnNvclsxXSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUocG9zaXRpb25Ub0Fuc2koZHgsIGR5KSk7XG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JbMF0gPSBkeDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclsxXSA9IGR5O1xuICAgICAgICB9XG4gICAgICAgIC8vIHRlcm1pbmFscyBhdXRvbWF0aWNhbGx5IGNsZWFyLCBidXQgaWYgd2UncmUgY2xlYXJpbmcgd2hlbiB3ZSdyZVxuICAgICAgICAvLyBub3Qgb3RoZXJ3aXNlIHByb3ZpZGVkIHdpdGggYSBjaGFyYWN0ZXIsIGp1c3QgdXNlIGEgc3BhY2UgaW5zdGVhZFxuICAgICAgICBpZiAoY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgICAgIGlmICghY2gpIHtcbiAgICAgICAgICAgICAgICBjaCA9IFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHdlJ3JlIG5vdCBjbGVhcmluZyBhbmQgbm90IHByb3ZpZGVkIHdpdGggYSBjaGFyYWN0ZXIsIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKCFjaCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRldGVybWluZSBpZiB3ZSBuZWVkIHRvIGNoYW5nZSBjb2xvcnNcbiAgICAgICAgbGV0IG5ld0NvbG9yID0gY29sb3JUb0Fuc2koZmcsIGJnKTtcbiAgICAgICAgaWYgKG5ld0NvbG9yICE9PSB0aGlzLl9sYXN0Q29sb3IpIHtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG5ld0NvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RDb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaCAhPSAnXFx0Jykge1xuICAgICAgICAgICAgLy8gd3JpdGUgdGhlIHByb3ZpZGVkIHN5bWJvbCB0byB0aGUgZGlzcGxheVxuICAgICAgICAgICAgbGV0IGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGNoYXJzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgb3VyIHBvc2l0aW9uLCBnaXZlbiB0aGF0IHdlIHdyb3RlIGEgY2hhcmFjdGVyXG4gICAgICAgIHRoaXMuX2N1cnNvclswXSsrO1xuICAgICAgICBpZiAodGhpcy5fY3Vyc29yWzBdID49IHNpemVbMF0pIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvclswXSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9jdXJzb3JbMV0rKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wdXRlRm9udFNpemUoKSB7IHRocm93IG5ldyBFcnJvcihcIlRlcm1pbmFsIGJhY2tlbmQgaGFzIG5vIG5vdGlvbiBvZiBmb250IHNpemVcIik7IH1cbiAgICBldmVudFRvUG9zaXRpb24oeCwgeSkgeyByZXR1cm4gW3gsIHldOyB9XG4gICAgY29tcHV0ZVNpemUoKSB7IHJldHVybiBbcHJvY2Vzcy5zdGRvdXQuY29sdW1ucywgcHJvY2Vzcy5zdGRvdXQucm93c107IH1cbn1cbiIsImltcG9ydCBCYWNrZW5kIGZyb20gXCIuL2JhY2tlbmQuanNcIjtcbmltcG9ydCAqIGFzIENvbG9yIGZyb20gXCIuLi9jb2xvci5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgVGlsZSBiYWNrZW5kXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlR0wgZXh0ZW5kcyBCYWNrZW5kIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fdW5pZm9ybXMgPSB7fTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX2dsID0gdGhpcy5faW5pdFdlYkdMKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGFsZXJ0KGUubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGlzU3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gISFkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLmdldENvbnRleHQoXCJ3ZWJnbDJcIiwgeyBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUgfSk7XG4gICAgfVxuICAgIHNjaGVkdWxlKGNiKSB7IHJlcXVlc3RBbmltYXRpb25GcmFtZShjYik7IH1cbiAgICBnZXRDb250YWluZXIoKSB7IHJldHVybiB0aGlzLl9nbC5jYW52YXM7IH1cbiAgICBzZXRPcHRpb25zKG9wdHMpIHtcbiAgICAgICAgc3VwZXIuc2V0T3B0aW9ucyhvcHRzKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgICBsZXQgdGlsZVNldCA9IHRoaXMuX29wdGlvbnMudGlsZVNldDtcbiAgICAgICAgaWYgKHRpbGVTZXQgJiYgXCJjb21wbGV0ZVwiIGluIHRpbGVTZXQgJiYgIXRpbGVTZXQuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHRpbGVTZXQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4gdGhpcy5fdXBkYXRlVGV4dHVyZSh0aWxlU2V0KSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVUZXh0dXJlKHRpbGVTZXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXcoZGF0YSwgY2xlYXJCZWZvcmUpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIGxldCBbeCwgeSwgY2gsIGZnLCBiZ10gPSBkYXRhO1xuICAgICAgICBsZXQgc2Npc3NvclkgPSBnbC5jYW52YXMuaGVpZ2h0IC0gKHkgKyAxKSAqIG9wdHMudGlsZUhlaWdodDtcbiAgICAgICAgZ2wuc2Npc3Nvcih4ICogb3B0cy50aWxlV2lkdGgsIHNjaXNzb3JZLCBvcHRzLnRpbGVXaWR0aCwgb3B0cy50aWxlSGVpZ2h0KTtcbiAgICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICBpZiAob3B0cy50aWxlQ29sb3JpemUpIHtcbiAgICAgICAgICAgICAgICBnbC5jbGVhckNvbG9yKDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2wuY2xlYXJDb2xvciguLi5wYXJzZUNvbG9yKGJnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgbGV0IGJncyA9IFtdLmNvbmNhdChiZyk7XG4gICAgICAgIGxldCBmZ3MgPSBbXS5jb25jYXQoZmcpO1xuICAgICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGFyZ2V0UG9zUmVsXCJdLCBbeCwgeV0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRoaXMuX29wdGlvbnMudGlsZU1hcFtjaGFyc1tpXV07XG4gICAgICAgICAgICBpZiAoIXRpbGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoYXIgXCIke2NoYXJzW2ldfVwiIG5vdCBmb3VuZCBpbiB0aWxlTWFwYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbC51bmlmb3JtMWYodGhpcy5fdW5pZm9ybXNbXCJjb2xvcml6ZVwiXSwgb3B0cy50aWxlQ29sb3JpemUgPyAxIDogMCk7XG4gICAgICAgICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGlsZXNldFBvc0Fic1wiXSwgdGlsZSk7XG4gICAgICAgICAgICBpZiAob3B0cy50aWxlQ29sb3JpemUpIHtcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtNGZ2KHRoaXMuX3VuaWZvcm1zW1widGludFwiXSwgcGFyc2VDb2xvcihmZ3NbaV0pKTtcbiAgICAgICAgICAgICAgICBnbC51bmlmb3JtNGZ2KHRoaXMuX3VuaWZvcm1zW1wiYmdcIl0sIHBhcnNlQ29sb3IoYmdzW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcbiAgICAgICAgfVxuICAgICAgICAvKlxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8Y2hhcnMubGVuZ3RoO2krKykge1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudGlsZUNvbG9yaXplKSB7IC8vIGFwcGx5IGNvbG9yaXphdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuX2NvbG9yQ2FudmFzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpIGFzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2Utb3ZlclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmcgPSBmZ3NbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBiZ3NbaV07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy50aWxlU2V0ISxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyAhPSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJzb3VyY2UtYXRvcFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBiZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwiZGVzdGluYXRpb24tb3ZlclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKGNhbnZhcywgeCp0aWxlV2lkdGgsIHkqdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gbm8gY29sb3JpemluZywgZWFzeVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcHRpb25zLnRpbGVTZXQhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVbMF0sIHRpbGVbMV0sIHRpbGVXaWR0aCwgdGlsZUhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4KnRpbGVXaWR0aCwgeSp0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAqL1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcbiAgICAgICAgZ2wuY2xlYXJDb2xvciguLi5wYXJzZUNvbG9yKHRoaXMuX29wdGlvbnMuYmcpKTtcbiAgICAgICAgZ2wuc2Npc3NvcigwLCAwLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICB9XG4gICAgY29tcHV0ZVNpemUoYXZhaWxXaWR0aCwgYXZhaWxIZWlnaHQpIHtcbiAgICAgICAgbGV0IHdpZHRoID0gTWF0aC5mbG9vcihhdmFpbFdpZHRoIC8gdGhpcy5fb3B0aW9ucy50aWxlV2lkdGgpO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gTWF0aC5mbG9vcihhdmFpbEhlaWdodCAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCk7XG4gICAgICAgIHJldHVybiBbd2lkdGgsIGhlaWdodF07XG4gICAgfVxuICAgIGNvbXB1dGVGb250U2l6ZSgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGlsZSBiYWNrZW5kIGRvZXMgbm90IHVuZGVyc3RhbmQgZm9udCBzaXplXCIpO1xuICAgIH1cbiAgICBldmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgICBsZXQgY2FudmFzID0gdGhpcy5fZ2wuY2FudmFzO1xuICAgICAgICBsZXQgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgeCAtPSByZWN0LmxlZnQ7XG4gICAgICAgIHkgLT0gcmVjdC50b3A7XG4gICAgICAgIHggKj0gY2FudmFzLndpZHRoIC8gcmVjdC53aWR0aDtcbiAgICAgICAgeSAqPSBjYW52YXMuaGVpZ2h0IC8gcmVjdC5oZWlnaHQ7XG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IGNhbnZhcy53aWR0aCB8fCB5ID49IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVybiBbLTEsIC0xXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbm9ybWFsaXplZEV2ZW50VG9Qb3NpdGlvbih4LCB5KTtcbiAgICB9XG4gICAgX2luaXRXZWJHTCgpIHtcbiAgICAgICAgbGV0IGdsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwid2ViZ2wyXCIsIHsgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlIH0pO1xuICAgICAgICB3aW5kb3cuZ2wgPSBnbDtcbiAgICAgICAgbGV0IHByb2dyYW0gPSBjcmVhdGVQcm9ncmFtKGdsLCBWUywgRlMpO1xuICAgICAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICBjcmVhdGVRdWFkKGdsKTtcbiAgICAgICAgVU5JRk9STVMuZm9yRWFjaChuYW1lID0+IHRoaXMuX3VuaWZvcm1zW25hbWVdID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIG5hbWUpKTtcbiAgICAgICAgdGhpcy5fcHJvZ3JhbSA9IHByb2dyYW07XG4gICAgICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSwgZ2wuT05FLCBnbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcbiAgICAgICAgZ2wuZW5hYmxlKGdsLlNDSVNTT1JfVEVTVCk7XG4gICAgICAgIHJldHVybiBnbDtcbiAgICB9XG4gICAgX25vcm1hbGl6ZWRFdmVudFRvUG9zaXRpb24oeCwgeSkge1xuICAgICAgICByZXR1cm4gW01hdGguZmxvb3IoeCAvIHRoaXMuX29wdGlvbnMudGlsZVdpZHRoKSwgTWF0aC5mbG9vcih5IC8gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0KV07XG4gICAgfVxuICAgIF91cGRhdGVTaXplKCkge1xuICAgICAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICAgICAgY29uc3QgY2FudmFzU2l6ZSA9IFtvcHRzLndpZHRoICogb3B0cy50aWxlV2lkdGgsIG9wdHMuaGVpZ2h0ICogb3B0cy50aWxlSGVpZ2h0XTtcbiAgICAgICAgZ2wuY2FudmFzLndpZHRoID0gY2FudmFzU2l6ZVswXTtcbiAgICAgICAgZ2wuY2FudmFzLmhlaWdodCA9IGNhbnZhc1NpemVbMV07XG4gICAgICAgIGdsLnZpZXdwb3J0KDAsIDAsIGNhbnZhc1NpemVbMF0sIGNhbnZhc1NpemVbMV0pO1xuICAgICAgICBnbC51bmlmb3JtMmZ2KHRoaXMuX3VuaWZvcm1zW1widGlsZVNpemVcIl0sIFtvcHRzLnRpbGVXaWR0aCwgb3B0cy50aWxlSGVpZ2h0XSk7XG4gICAgICAgIGdsLnVuaWZvcm0yZnYodGhpcy5fdW5pZm9ybXNbXCJ0YXJnZXRTaXplXCJdLCBjYW52YXNTaXplKTtcbiAgICB9XG4gICAgX3VwZGF0ZVRleHR1cmUodGlsZVNldCkge1xuICAgICAgICBjcmVhdGVUZXh0dXJlKHRoaXMuX2dsLCB0aWxlU2V0KTtcbiAgICB9XG59XG5jb25zdCBVTklGT1JNUyA9IFtcInRhcmdldFBvc1JlbFwiLCBcInRpbGVzZXRQb3NBYnNcIiwgXCJ0aWxlU2l6ZVwiLCBcInRhcmdldFNpemVcIiwgXCJjb2xvcml6ZVwiLCBcImJnXCIsIFwidGludFwiXTtcbmNvbnN0IFZTID0gYFxuI3ZlcnNpb24gMzAwIGVzXG5cbmluIHZlYzIgdGlsZVBvc1JlbDtcbm91dCB2ZWMyIHRpbGVzZXRQb3NQeDtcblxudW5pZm9ybSB2ZWMyIHRpbGVzZXRQb3NBYnM7XG51bmlmb3JtIHZlYzIgdGlsZVNpemU7XG51bmlmb3JtIHZlYzIgdGFyZ2V0U2l6ZTtcbnVuaWZvcm0gdmVjMiB0YXJnZXRQb3NSZWw7XG5cbnZvaWQgbWFpbigpIHtcblx0dmVjMiB0YXJnZXRQb3NQeCA9ICh0YXJnZXRQb3NSZWwgKyB0aWxlUG9zUmVsKSAqIHRpbGVTaXplO1xuXHR2ZWMyIHRhcmdldFBvc05kYyA9ICgodGFyZ2V0UG9zUHggLyB0YXJnZXRTaXplKS0wLjUpKjIuMDtcblx0dGFyZ2V0UG9zTmRjLnkgKj0gLTEuMDtcblxuXHRnbF9Qb3NpdGlvbiA9IHZlYzQodGFyZ2V0UG9zTmRjLCAwLjAsIDEuMCk7XG5cdHRpbGVzZXRQb3NQeCA9IHRpbGVzZXRQb3NBYnMgKyB0aWxlUG9zUmVsICogdGlsZVNpemU7XG59YC50cmltKCk7XG5jb25zdCBGUyA9IGBcbiN2ZXJzaW9uIDMwMCBlc1xucHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1xuXG5pbiB2ZWMyIHRpbGVzZXRQb3NQeDtcbm91dCB2ZWM0IGZyYWdDb2xvcjtcbnVuaWZvcm0gc2FtcGxlcjJEIGltYWdlO1xudW5pZm9ybSBib29sIGNvbG9yaXplO1xudW5pZm9ybSB2ZWM0IGJnO1xudW5pZm9ybSB2ZWM0IHRpbnQ7XG5cbnZvaWQgbWFpbigpIHtcblx0ZnJhZ0NvbG9yID0gdmVjNCgwLCAwLCAwLCAxKTtcblxuXHR2ZWM0IHRleGVsID0gdGV4ZWxGZXRjaChpbWFnZSwgaXZlYzIodGlsZXNldFBvc1B4KSwgMCk7XG5cblx0aWYgKGNvbG9yaXplKSB7XG5cdFx0dGV4ZWwucmdiID0gdGludC5hICogdGludC5yZ2IgKyAoMS4wLXRpbnQuYSkgKiB0ZXhlbC5yZ2I7XG5cdFx0ZnJhZ0NvbG9yLnJnYiA9IHRleGVsLmEqdGV4ZWwucmdiICsgKDEuMC10ZXhlbC5hKSpiZy5yZ2I7XG5cdFx0ZnJhZ0NvbG9yLmEgPSB0ZXhlbC5hICsgKDEuMC10ZXhlbC5hKSpiZy5hO1xuXHR9IGVsc2Uge1xuXHRcdGZyYWdDb2xvciA9IHRleGVsO1xuXHR9XG59YC50cmltKCk7XG5mdW5jdGlvbiBjcmVhdGVQcm9ncmFtKGdsLCB2c3MsIGZzcykge1xuICAgIGNvbnN0IHZzID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZSh2cywgdnNzKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHZzKTtcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih2cywgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKHZzKSB8fCBcIlwiKTtcbiAgICB9XG4gICAgY29uc3QgZnMgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UoZnMsIGZzcyk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihmcyk7XG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoZnMsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcykgfHwgXCJcIik7XG4gICAgfVxuICAgIGNvbnN0IHAgPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHAsIHZzKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocCwgZnMpO1xuICAgIGdsLmxpbmtQcm9ncmFtKHApO1xuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHApIHx8IFwiXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVF1YWQoZ2wpIHtcbiAgICBjb25zdCBwb3MgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAxLCAwLCAwLCAxLCAxLCAxXSk7XG4gICAgY29uc3QgYnVmID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1Zik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHBvcywgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KDApO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoMCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVRleHR1cmUoZ2wsIGRhdGEpIHtcbiAgICBsZXQgdCA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0KTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLlJFUEVBVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuUkVQRUFUKTtcbiAgICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCAwKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGRhdGEpO1xuICAgIHJldHVybiB0O1xufVxubGV0IGNvbG9yQ2FjaGUgPSB7fTtcbmZ1bmN0aW9uIHBhcnNlQ29sb3IoY29sb3IpIHtcbiAgICBpZiAoIShjb2xvciBpbiBjb2xvckNhY2hlKSkge1xuICAgICAgICBsZXQgcGFyc2VkO1xuICAgICAgICBpZiAoY29sb3IgPT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICBwYXJzZWQgPSBbMCwgMCwgMCwgMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sb3IuaW5kZXhPZihcInJnYmFcIikgPiAtMSkge1xuICAgICAgICAgICAgcGFyc2VkID0gKGNvbG9yLm1hdGNoKC9bXFxkLl0rL2cpIHx8IFtdKS5tYXAoTnVtYmVyKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkW2ldID0gcGFyc2VkW2ldIC8gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VkID0gQ29sb3IuZnJvbVN0cmluZyhjb2xvcikubWFwKCQgPT4gJCAvIDI1NSk7XG4gICAgICAgICAgICBwYXJzZWQucHVzaCgxKTtcbiAgICAgICAgfVxuICAgICAgICBjb2xvckNhY2hlW2NvbG9yXSA9IHBhcnNlZDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yQ2FjaGVbY29sb3JdO1xufVxuIiwiaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9jYW52YXMuanNcIjtcbi8qKlxuICogQGNsYXNzIFRpbGUgYmFja2VuZFxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZSBleHRlbmRzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2NvbG9yQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICB9XG4gICAgZHJhdyhkYXRhLCBjbGVhckJlZm9yZSkge1xuICAgICAgICBsZXQgW3gsIHksIGNoLCBmZywgYmddID0gZGF0YTtcbiAgICAgICAgbGV0IHRpbGVXaWR0aCA9IHRoaXMuX29wdGlvbnMudGlsZVdpZHRoO1xuICAgICAgICBsZXQgdGlsZUhlaWdodCA9IHRoaXMuX29wdGlvbnMudGlsZUhlaWdodDtcbiAgICAgICAgaWYgKGNsZWFyQmVmb3JlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50aWxlQ29sb3JpemUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguY2xlYXJSZWN0KHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCh4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNoYXJzID0gW10uY29uY2F0KGNoKTtcbiAgICAgICAgbGV0IGZncyA9IFtdLmNvbmNhdChmZyk7XG4gICAgICAgIGxldCBiZ3MgPSBbXS5jb25jYXQoYmcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdGlsZSA9IHRoaXMuX29wdGlvbnMudGlsZU1hcFtjaGFyc1tpXV07XG4gICAgICAgICAgICBpZiAoIXRpbGUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENoYXIgXCIke2NoYXJzW2ldfVwiIG5vdCBmb3VuZCBpbiB0aWxlTWFwYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50aWxlQ29sb3JpemUpIHsgLy8gYXBwbHkgY29sb3JpemF0aW9uXG4gICAgICAgICAgICAgICAgbGV0IGNhbnZhcyA9IHRoaXMuX2NvbG9yQ2FudmFzO1xuICAgICAgICAgICAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLW92ZXJcIjtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGxldCBmZyA9IGZnc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgYmcgPSBiZ3NbaV07XG4gICAgICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5fb3B0aW9ucy50aWxlU2V0LCB0aWxlWzBdLCB0aWxlWzFdLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQsIDAsIDAsIHRpbGVXaWR0aCwgdGlsZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgaWYgKGZnICE9IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IFwic291cmNlLWF0b3BcIjtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYmcgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1vdmVyXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LmRyYXdJbWFnZShjYW52YXMsIHggKiB0aWxlV2lkdGgsIHkgKiB0aWxlSGVpZ2h0LCB0aWxlV2lkdGgsIHRpbGVIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8vIG5vIGNvbG9yaXppbmcsIGVhc3lcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKHRoaXMuX29wdGlvbnMudGlsZVNldCwgdGlsZVswXSwgdGlsZVsxXSwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0LCB4ICogdGlsZVdpZHRoLCB5ICogdGlsZUhlaWdodCwgdGlsZVdpZHRoLCB0aWxlSGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wdXRlU2l6ZShhdmFpbFdpZHRoLCBhdmFpbEhlaWdodCkge1xuICAgICAgICBsZXQgd2lkdGggPSBNYXRoLmZsb29yKGF2YWlsV2lkdGggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCk7XG4gICAgICAgIGxldCBoZWlnaHQgPSBNYXRoLmZsb29yKGF2YWlsSGVpZ2h0IC8gdGhpcy5fb3B0aW9ucy50aWxlSGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XTtcbiAgICB9XG4gICAgY29tcHV0ZUZvbnRTaXplKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaWxlIGJhY2tlbmQgZG9lcyBub3QgdW5kZXJzdGFuZCBmb250IHNpemVcIik7XG4gICAgfVxuICAgIF9ub3JtYWxpemVkRXZlbnRUb1Bvc2l0aW9uKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIFtNYXRoLmZsb29yKHggLyB0aGlzLl9vcHRpb25zLnRpbGVXaWR0aCksIE1hdGguZmxvb3IoeSAvIHRoaXMuX29wdGlvbnMudGlsZUhlaWdodCldO1xuICAgIH1cbiAgICBfdXBkYXRlU2l6ZSgpIHtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHRoaXMuX29wdGlvbnM7XG4gICAgICAgIHRoaXMuX2N0eC5jYW52YXMud2lkdGggPSBvcHRzLndpZHRoICogb3B0cy50aWxlV2lkdGg7XG4gICAgICAgIHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0ID0gb3B0cy5oZWlnaHQgKiBvcHRzLnRpbGVIZWlnaHQ7XG4gICAgICAgIHRoaXMuX2NvbG9yQ2FudmFzLndpZHRoID0gb3B0cy50aWxlV2lkdGg7XG4gICAgICAgIHRoaXMuX2NvbG9yQ2FudmFzLmhlaWdodCA9IG9wdHMudGlsZUhlaWdodDtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBjbGFzcyBBc3luY2hyb25vdXMgbWFpbiBsb29wXG4gKiBAcGFyYW0ge1JPVC5TY2hlZHVsZXJ9IHNjaGVkdWxlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmdpbmUge1xuICAgIGNvbnN0cnVjdG9yKHNjaGVkdWxlcikge1xuICAgICAgICB0aGlzLl9zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIHRoaXMuX2xvY2sgPSAxO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydCB0aGUgbWFpbiBsb29wLiBXaGVuIHRoaXMgY2FsbCByZXR1cm5zLCB0aGUgbG9vcCBpcyBsb2NrZWQuXG4gICAgICovXG4gICAgc3RhcnQoKSB7IHJldHVybiB0aGlzLnVubG9jaygpOyB9XG4gICAgLyoqXG4gICAgICogSW50ZXJydXB0IHRoZSBlbmdpbmUgYnkgYW4gYXN5bmNocm9ub3VzIGFjdGlvblxuICAgICAqL1xuICAgIGxvY2soKSB7XG4gICAgICAgIHRoaXMuX2xvY2srKztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc3VtZSBleGVjdXRpb24gKHBhdXNlZCBieSBhIHByZXZpb3VzIGxvY2spXG4gICAgICovXG4gICAgdW5sb2NrKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCB1bmxvY2sgdW5sb2NrZWQgZW5naW5lXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvY2stLTtcbiAgICAgICAgd2hpbGUgKCF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgICBsZXQgYWN0b3IgPSB0aGlzLl9zY2hlZHVsZXIubmV4dCgpO1xuICAgICAgICAgICAgaWYgKCFhY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2soKTtcbiAgICAgICAgICAgIH0gLyogbm8gYWN0b3JzICovXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYWN0b3IuYWN0KCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC50aGVuKSB7IC8qIGFjdG9yIHJldHVybmVkIGEgXCJ0aGVuYWJsZVwiLCBsb29rcyBsaWtlIGEgUHJvbWlzZSAqL1xuICAgICAgICAgICAgICAgIHRoaXMubG9jaygpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC50aGVuKHRoaXMudW5sb2NrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1pbkhlYXAgfSBmcm9tIFwiLi9NaW5IZWFwXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFF1ZXVlIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgR2VuZXJpYyBldmVudCBxdWV1ZTogc3RvcmVzIGV2ZW50cyBhbmQgcmV0cmlldmVzIHRoZW0gYmFzZWQgb24gdGhlaXIgdGltZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl90aW1lID0gMDtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gbmV3IE1pbkhlYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMge251bWJlcn0gRWxhcHNlZCB0aW1lXG4gICAgICovXG4gICAgZ2V0VGltZSgpIHsgcmV0dXJuIHRoaXMuX3RpbWU7IH1cbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgc2NoZWR1bGVkIGV2ZW50c1xuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBuZXcgTWluSGVhcCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHs/fSBldmVudFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXG4gICAgICovXG4gICAgYWRkKGV2ZW50LCB0aW1lKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5wdXNoKGV2ZW50LCB0aW1lKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9jYXRlcyB0aGUgbmVhcmVzdCBldmVudCwgYWR2YW5jZXMgdGltZSBpZiBuZWNlc3NhcnkuIFJldHVybnMgdGhhdCBldmVudCBhbmQgcmVtb3ZlcyBpdCBmcm9tIHRoZSBxdWV1ZS5cbiAgICAgKiBAcmV0dXJucyB7PyB8fCBudWxsfSBUaGUgZXZlbnQgcHJldmlvdXNseSBhZGRlZCBieSBhZGRFdmVudCwgbnVsbCBpZiBubyBldmVudCBhdmFpbGFibGVcbiAgICAgKi9cbiAgICBnZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fZXZlbnRzLmxlbigpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgeyBrZXk6IHRpbWUsIHZhbHVlOiBldmVudCB9ID0gdGhpcy5fZXZlbnRzLnBvcCgpO1xuICAgICAgICBpZiAodGltZSA+IDApIHsgLyogYWR2YW5jZSAqL1xuICAgICAgICAgICAgdGhpcy5fdGltZSArPSB0aW1lO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLnNoaWZ0KC10aW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGltZSBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIGV2ZW50XG4gICAgICogQHBhcmFtIHs/fSBldmVudFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRpbWVcbiAgICAgKi9cbiAgICBnZXRFdmVudFRpbWUoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgciA9IHRoaXMuX2V2ZW50cy5maW5kKGV2ZW50KTtcbiAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAgIGNvbnN0IHsga2V5IH0gPSByO1xuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYW4gZXZlbnQgZnJvbSB0aGUgcXVldWVcbiAgICAgKiBAcGFyYW0gez99IGV2ZW50XG4gICAgICogQHJldHVybnMge2Jvb2x9IHN1Y2Nlc3M/XG4gICAgICovXG4gICAgcmVtb3ZlKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHMucmVtb3ZlKGV2ZW50KTtcbiAgICB9XG4gICAgO1xufVxuIiwiaW1wb3J0IEZPViBmcm9tIFwiLi9mb3YuanNcIjtcbi8qKlxuICogQGNsYXNzIERpc2NyZXRlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtLiBPYnNvbGV0ZWQgYnkgUHJlY2lzZSBzaGFkb3djYXN0aW5nLlxuICogQGF1Z21lbnRzIFJPVC5GT1ZcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzY3JldGVTaGFkb3djYXN0aW5nIGV4dGVuZHMgRk9WIHtcbiAgICBjb21wdXRlKHgsIHksIFIsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8qIHRoaXMgcGxhY2UgaXMgYWx3YXlzIHZpc2libGUgKi9cbiAgICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICAgIC8qIHN0YW5kaW5nIGluIGEgZGFyayBwbGFjZS4gRklYTUUgaXMgdGhpcyBhIGdvb2QgaWRlYT8gICovXG4gICAgICAgIGlmICghdGhpcy5fbGlnaHRQYXNzZXMoeCwgeSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvKiBzdGFydCBhbmQgZW5kIGFuZ2xlcyAqL1xuICAgICAgICBsZXQgREFUQSA9IFtdO1xuICAgICAgICBsZXQgQSwgQiwgY3gsIGN5LCBibG9ja3M7XG4gICAgICAgIC8qIGFuYWx5emUgc3Vycm91bmRpbmcgY2VsbHMgaW4gY29uY2VudHJpYyByaW5ncywgc3RhcnRpbmcgZnJvbSB0aGUgY2VudGVyICovXG4gICAgICAgIGZvciAobGV0IHIgPSAxOyByIDw9IFI7IHIrKykge1xuICAgICAgICAgICAgbGV0IG5laWdoYm9ycyA9IHRoaXMuX2dldENpcmNsZSh4LCB5LCByKTtcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IDM2MCAvIG5laWdoYm9ycy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGN4ID0gbmVpZ2hib3JzW2ldWzBdO1xuICAgICAgICAgICAgICAgIGN5ID0gbmVpZ2hib3JzW2ldWzFdO1xuICAgICAgICAgICAgICAgIEEgPSBhbmdsZSAqIChpIC0gMC41KTtcbiAgICAgICAgICAgICAgICBCID0gQSArIGFuZ2xlO1xuICAgICAgICAgICAgICAgIGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl92aXNpYmxlQ29vcmRzKE1hdGguZmxvb3IoQSksIE1hdGguY2VpbChCKSwgYmxvY2tzLCBEQVRBKSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhjeCwgY3ksIHIsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoREFUQS5sZW5ndGggPT0gMiAmJiBEQVRBWzBdID09IDAgJiYgREFUQVsxXSA9PSAzNjApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gLyogY3V0b2ZmPyAqL1xuICAgICAgICAgICAgfSAvKiBmb3IgYWxsIGNlbGxzIGluIHRoaXMgcmluZyAqL1xuICAgICAgICB9IC8qIGZvciBhbGwgcmluZ3MgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbnR9IEEgc3RhcnQgYW5nbGVcbiAgICAgKiBAcGFyYW0ge2ludH0gQiBlbmQgYW5nbGVcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IGJsb2NrcyBEb2VzIGN1cnJlbnQgY2VsbCBibG9jayB2aXNpYmlsaXR5P1xuICAgICAqIEBwYXJhbSB7aW50W11bXX0gREFUQSBzaGFkb3dlZCBhbmdsZSBwYWlyc1xuICAgICAqL1xuICAgIF92aXNpYmxlQ29vcmRzKEEsIEIsIGJsb2NrcywgREFUQSkge1xuICAgICAgICBpZiAoQSA8IDApIHtcbiAgICAgICAgICAgIGxldCB2MSA9IHRoaXMuX3Zpc2libGVDb29yZHMoMCwgQiwgYmxvY2tzLCBEQVRBKTtcbiAgICAgICAgICAgIGxldCB2MiA9IHRoaXMuX3Zpc2libGVDb29yZHMoMzYwICsgQSwgMzYwLCBibG9ja3MsIERBVEEpO1xuICAgICAgICAgICAgcmV0dXJuIHYxIHx8IHYyO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIHdoaWxlIChpbmRleCA8IERBVEEubGVuZ3RoICYmIERBVEFbaW5kZXhdIDwgQSkge1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT0gREFUQS5sZW5ndGgpIHsgLyogY29tcGxldGVseSBuZXcgc2hhZG93ICovXG4gICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgREFUQS5wdXNoKEEsIEIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgaWYgKGluZGV4ICUgMikgeyAvKiB0aGlzIHNoYWRvdyBzdGFydHMgaW4gYW4gZXhpc3Rpbmcgc2hhZG93LCBvciB3aXRoaW4gaXRzIGVuZGluZyBib3VuZGFyeSAqL1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4IDwgREFUQS5sZW5ndGggJiYgREFUQVtpbmRleF0gPCBCKSB7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvdW50ID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ICUgMikge1xuICAgICAgICAgICAgICAgICAgICBEQVRBLnNwbGljZShpbmRleCAtIGNvdW50LCBjb3VudCwgQik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBEQVRBLnNwbGljZShpbmRleCAtIGNvdW50LCBjb3VudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8qIHRoaXMgc2hhZG93IHN0YXJ0cyBvdXRzaWRlIGFuIGV4aXN0aW5nIHNoYWRvdywgb3Igd2l0aGluIGEgc3RhcnRpbmcgYm91bmRhcnkgKi9cbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA8IERBVEEubGVuZ3RoICYmIERBVEFbaW5kZXhdIDwgQikge1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIHZpc2libGUgd2hlbiBvdXRzaWRlIGFuIGV4aXN0aW5nIHNoYWRvdywgb3Igd2hlbiBvdmVybGFwcGluZyAqL1xuICAgICAgICAgICAgaWYgKEEgPT0gREFUQVtpbmRleCAtIGNvdW50XSAmJiBjb3VudCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCAlIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQsIEEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgREFUQS5zcGxpY2UoaW5kZXggLSBjb3VudCwgY291bnQsIEEsIEIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRElSUyB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbjtcbjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZPViB7XG4gICAgLyoqXG4gICAgICogQGNsYXNzIEFic3RyYWN0IEZPViBhbGdvcml0aG1cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaWdodFBhc3Nlc0NhbGxiYWNrIERvZXMgdGhlIGxpZ2h0IHBhc3MgdGhyb3VnaCB4LHk/XG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICAgICAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50b3BvbG9neT04XSA0LzYvOFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGxpZ2h0UGFzc2VzQ2FsbGJhY2ssIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl9saWdodFBhc3NlcyA9IGxpZ2h0UGFzc2VzQ2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsgdG9wb2xvZ3k6IDggfSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbGwgbmVpZ2hib3JzIGluIGEgY29uY2VudHJpYyByaW5nXG4gICAgICogQHBhcmFtIHtpbnR9IGN4IGNlbnRlci14XG4gICAgICogQHBhcmFtIHtpbnR9IGN5IGNlbnRlci15XG4gICAgICogQHBhcmFtIHtpbnR9IHIgcmFuZ2VcbiAgICAgKi9cbiAgICBfZ2V0Q2lyY2xlKGN4LCBjeSwgcikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBkaXJzLCBjb3VudEZhY3Rvciwgc3RhcnRPZmZzZXQ7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fb3B0aW9ucy50b3BvbG9neSkge1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGNvdW50RmFjdG9yID0gMTtcbiAgICAgICAgICAgICAgICBzdGFydE9mZnNldCA9IFswLCAxXTtcbiAgICAgICAgICAgICAgICBkaXJzID0gW1xuICAgICAgICAgICAgICAgICAgICBESVJTWzhdWzddLFxuICAgICAgICAgICAgICAgICAgICBESVJTWzhdWzFdLFxuICAgICAgICAgICAgICAgICAgICBESVJTWzhdWzNdLFxuICAgICAgICAgICAgICAgICAgICBESVJTWzhdWzVdXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBkaXJzID0gRElSU1s2XTtcbiAgICAgICAgICAgICAgICBjb3VudEZhY3RvciA9IDE7XG4gICAgICAgICAgICAgICAgc3RhcnRPZmZzZXQgPSBbLTEsIDFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIGRpcnMgPSBESVJTWzRdO1xuICAgICAgICAgICAgICAgIGNvdW50RmFjdG9yID0gMjtcbiAgICAgICAgICAgICAgICBzdGFydE9mZnNldCA9IFstMSwgMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluY29ycmVjdCB0b3BvbG9neSBmb3IgRk9WIGNvbXB1dGF0aW9uXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8qIHN0YXJ0aW5nIG5laWdoYm9yICovXG4gICAgICAgIGxldCB4ID0gY3ggKyBzdGFydE9mZnNldFswXSAqIHI7XG4gICAgICAgIGxldCB5ID0gY3kgKyBzdGFydE9mZnNldFsxXSAqIHI7XG4gICAgICAgIC8qIGNpcmNsZSAqL1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgciAqIGNvdW50RmFjdG9yOyBqKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChbeCwgeV0pO1xuICAgICAgICAgICAgICAgIHggKz0gZGlyc1tpXVswXTtcbiAgICAgICAgICAgICAgICB5ICs9IGRpcnNbaV1bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCJpbXBvcnQgRGlzY3JldGVTaGFkb3djYXN0aW5nIGZyb20gXCIuL2Rpc2NyZXRlLXNoYWRvd2Nhc3RpbmcuanNcIjtcbmltcG9ydCBQcmVjaXNlU2hhZG93Y2FzdGluZyBmcm9tIFwiLi9wcmVjaXNlLXNoYWRvd2Nhc3RpbmcuanNcIjtcbmltcG9ydCBSZWN1cnNpdmVTaGFkb3djYXN0aW5nIGZyb20gXCIuL3JlY3Vyc2l2ZS1zaGFkb3djYXN0aW5nLmpzXCI7XG5leHBvcnQgZGVmYXVsdCB7IERpc2NyZXRlU2hhZG93Y2FzdGluZywgUHJlY2lzZVNoYWRvd2Nhc3RpbmcsIFJlY3Vyc2l2ZVNoYWRvd2Nhc3RpbmcgfTtcbiIsImltcG9ydCBGT1YgZnJvbSBcIi4vZm92LmpzXCI7XG4vKipcbiAqIEBjbGFzcyBQcmVjaXNlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtXG4gKiBAYXVnbWVudHMgUk9ULkZPVlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVjaXNlU2hhZG93Y2FzdGluZyBleHRlbmRzIEZPViB7XG4gICAgY29tcHV0ZSh4LCB5LCBSLCBjYWxsYmFjaykge1xuICAgICAgICAvKiB0aGlzIHBsYWNlIGlzIGFsd2F5cyB2aXNpYmxlICovXG4gICAgICAgIGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgICAgICAvKiBzdGFuZGluZyBpbiBhIGRhcmsgcGxhY2UuIEZJWE1FIGlzIHRoaXMgYSBnb29kIGlkZWE/ICAqL1xuICAgICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKHgsIHkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLyogbGlzdCBvZiBhbGwgc2hhZG93cyAqL1xuICAgICAgICBsZXQgU0hBRE9XUyA9IFtdO1xuICAgICAgICBsZXQgY3gsIGN5LCBibG9ja3MsIEExLCBBMiwgdmlzaWJpbGl0eTtcbiAgICAgICAgLyogYW5hbHl6ZSBzdXJyb3VuZGluZyBjZWxscyBpbiBjb25jZW50cmljIHJpbmdzLCBzdGFydGluZyBmcm9tIHRoZSBjZW50ZXIgKi9cbiAgICAgICAgZm9yIChsZXQgciA9IDE7IHIgPD0gUjsgcisrKSB7XG4gICAgICAgICAgICBsZXQgbmVpZ2hib3JzID0gdGhpcy5fZ2V0Q2lyY2xlKHgsIHksIHIpO1xuICAgICAgICAgICAgbGV0IG5laWdoYm9yQ291bnQgPSBuZWlnaGJvcnMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWlnaGJvckNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjeCA9IG5laWdoYm9yc1tpXVswXTtcbiAgICAgICAgICAgICAgICBjeSA9IG5laWdoYm9yc1tpXVsxXTtcbiAgICAgICAgICAgICAgICAvKiBzaGlmdCBoYWxmLWFuLWFuZ2xlIGJhY2t3YXJkcyB0byBtYWludGFpbiBjb25zaXN0ZW5jeSBvZiAwLXRoIGNlbGxzICovXG4gICAgICAgICAgICAgICAgQTEgPSBbaSA/IDIgKiBpIC0gMSA6IDIgKiBuZWlnaGJvckNvdW50IC0gMSwgMiAqIG5laWdoYm9yQ291bnRdO1xuICAgICAgICAgICAgICAgIEEyID0gWzIgKiBpICsgMSwgMiAqIG5laWdoYm9yQ291bnRdO1xuICAgICAgICAgICAgICAgIGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHkgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpO1xuICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChTSEFET1dTLmxlbmd0aCA9PSAyICYmIFNIQURPV1NbMF1bMF0gPT0gMCAmJiBTSEFET1dTWzFdWzBdID09IFNIQURPV1NbMV1bMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gLyogY3V0b2ZmPyAqL1xuICAgICAgICAgICAgfSAvKiBmb3IgYWxsIGNlbGxzIGluIHRoaXMgcmluZyAqL1xuICAgICAgICB9IC8qIGZvciBhbGwgcmluZ3MgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbnRbMl19IEExIGFyYyBzdGFydFxuICAgICAqIEBwYXJhbSB7aW50WzJdfSBBMiBhcmMgZW5kXG4gICAgICogQHBhcmFtIHtib29sfSBibG9ja3MgRG9lcyBjdXJyZW50IGFyYyBibG9jayB2aXNpYmlsaXR5P1xuICAgICAqIEBwYXJhbSB7aW50W11bXX0gU0hBRE9XUyBsaXN0IG9mIGFjdGl2ZSBzaGFkb3dzXG4gICAgICovXG4gICAgX2NoZWNrVmlzaWJpbGl0eShBMSwgQTIsIGJsb2NrcywgU0hBRE9XUykge1xuICAgICAgICBpZiAoQTFbMF0gPiBBMlswXSkgeyAvKiBzcGxpdCBpbnRvIHR3byBzdWItYXJjcyAqL1xuICAgICAgICAgICAgbGV0IHYxID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KEExLCBbQTFbMV0sIEExWzFdXSwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgICAgIGxldCB2MiA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShbMCwgMV0sIEEyLCBibG9ja3MsIFNIQURPV1MpO1xuICAgICAgICAgICAgcmV0dXJuICh2MSArIHYyKSAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgLyogaW5kZXgxOiBmaXJzdCBzaGFkb3cgPj0gQTEgKi9cbiAgICAgICAgbGV0IGluZGV4MSA9IDAsIGVkZ2UxID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChpbmRleDEgPCBTSEFET1dTLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IG9sZCA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgICAgIGxldCBkaWZmID0gb2xkWzBdICogQTFbMV0gLSBBMVswXSAqIG9sZFsxXTtcbiAgICAgICAgICAgIGlmIChkaWZmID49IDApIHsgLyogb2xkID49IEExICovXG4gICAgICAgICAgICAgICAgaWYgKGRpZmYgPT0gMCAmJiAhKGluZGV4MSAlIDIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVkZ2UxID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleDErKztcbiAgICAgICAgfVxuICAgICAgICAvKiBpbmRleDI6IGxhc3Qgc2hhZG93IDw9IEEyICovXG4gICAgICAgIGxldCBpbmRleDIgPSBTSEFET1dTLmxlbmd0aCwgZWRnZTIgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKGluZGV4Mi0tKSB7XG4gICAgICAgICAgICBsZXQgb2xkID0gU0hBRE9XU1tpbmRleDJdO1xuICAgICAgICAgICAgbGV0IGRpZmYgPSBBMlswXSAqIG9sZFsxXSAtIG9sZFswXSAqIEEyWzFdO1xuICAgICAgICAgICAgaWYgKGRpZmYgPj0gMCkgeyAvKiBvbGQgPD0gQTIgKi9cbiAgICAgICAgICAgICAgICBpZiAoZGlmZiA9PSAwICYmIChpbmRleDIgJSAyKSkge1xuICAgICAgICAgICAgICAgICAgICBlZGdlMiA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCB2aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgaWYgKGluZGV4MSA9PSBpbmRleDIgJiYgKGVkZ2UxIHx8IGVkZ2UyKSkgeyAvKiBzdWJzZXQgb2YgZXhpc3Rpbmcgc2hhZG93LCBvbmUgb2YgdGhlIGVkZ2VzIG1hdGNoICovXG4gICAgICAgICAgICB2aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZWRnZTEgJiYgZWRnZTIgJiYgaW5kZXgxICsgMSA9PSBpbmRleDIgJiYgKGluZGV4MiAlIDIpKSB7IC8qIGNvbXBsZXRlbHkgZXF1aXZhbGVudCB3aXRoIGV4aXN0aW5nIHNoYWRvdyAqL1xuICAgICAgICAgICAgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4MSA+IGluZGV4MiAmJiAoaW5kZXgxICUgMikpIHsgLyogc3Vic2V0IG9mIGV4aXN0aW5nIHNoYWRvdywgbm90IHRvdWNoaW5nICovXG4gICAgICAgICAgICB2aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2aXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSAvKiBmYXN0IGNhc2U6IG5vdCB2aXNpYmxlICovXG4gICAgICAgIGxldCB2aXNpYmxlTGVuZ3RoO1xuICAgICAgICAvKiBjb21wdXRlIHRoZSBsZW5ndGggb2YgdmlzaWJsZSBhcmMsIGFkanVzdCBsaXN0IG9mIHNoYWRvd3MgKGlmIGJsb2NraW5nKSAqL1xuICAgICAgICBsZXQgcmVtb3ZlID0gaW5kZXgyIC0gaW5kZXgxICsgMTtcbiAgICAgICAgaWYgKHJlbW92ZSAlIDIpIHtcbiAgICAgICAgICAgIGlmIChpbmRleDEgJSAyKSB7IC8qIGZpcnN0IGVkZ2Ugd2l0aGluIGV4aXN0aW5nIHNoYWRvdywgc2Vjb25kIG91dHNpZGUgKi9cbiAgICAgICAgICAgICAgICBsZXQgUCA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgICAgICAgICB2aXNpYmxlTGVuZ3RoID0gKEEyWzBdICogUFsxXSAtIFBbMF0gKiBBMlsxXSkgLyAoUFsxXSAqIEEyWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlLCBBMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8qIHNlY29uZCBlZGdlIHdpdGhpbiBleGlzdGluZyBzaGFkb3csIGZpcnN0IG91dHNpZGUgKi9cbiAgICAgICAgICAgICAgICBsZXQgUCA9IFNIQURPV1NbaW5kZXgyXTtcbiAgICAgICAgICAgICAgICB2aXNpYmxlTGVuZ3RoID0gKFBbMF0gKiBBMVsxXSAtIEExWzBdICogUFsxXSkgLyAoQTFbMV0gKiBQWzFdKTtcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGluZGV4MSwgcmVtb3ZlLCBBMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGluZGV4MSAlIDIpIHsgLyogYm90aCBlZGdlcyB3aXRoaW4gZXhpc3Rpbmcgc2hhZG93cyAqL1xuICAgICAgICAgICAgICAgIGxldCBQMSA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgICAgICAgICBsZXQgUDIgPSBTSEFET1dTW2luZGV4Ml07XG4gICAgICAgICAgICAgICAgdmlzaWJsZUxlbmd0aCA9IChQMlswXSAqIFAxWzFdIC0gUDFbMF0gKiBQMlsxXSkgLyAoUDFbMV0gKiBQMlsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7IC8qIGJvdGggZWRnZXMgb3V0c2lkZSBleGlzdGluZyBzaGFkb3dzICovXG4gICAgICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgICAgICBTSEFET1dTLnNwbGljZShpbmRleDEsIHJlbW92ZSwgQTEsIEEyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7IC8qIHdob2xlIGFyYyB2aXNpYmxlISAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBhcmNMZW5ndGggPSAoQTJbMF0gKiBBMVsxXSAtIEExWzBdICogQTJbMV0pIC8gKEExWzFdICogQTJbMV0pO1xuICAgICAgICByZXR1cm4gdmlzaWJsZUxlbmd0aCAvIGFyY0xlbmd0aDtcbiAgICB9XG59XG4iLCJpbXBvcnQgRk9WIGZyb20gXCIuL2Zvdi5qc1wiO1xuLyoqIE9jdGFudHMgdXNlZCBmb3IgdHJhbnNsYXRpbmcgcmVjdXJzaXZlIHNoYWRvd2Nhc3Rpbmcgb2Zmc2V0cyAqL1xuY29uc3QgT0NUQU5UUyA9IFtcbiAgICBbLTEsIDAsIDAsIDFdLFxuICAgIFswLCAtMSwgMSwgMF0sXG4gICAgWzAsIC0xLCAtMSwgMF0sXG4gICAgWy0xLCAwLCAwLCAtMV0sXG4gICAgWzEsIDAsIDAsIC0xXSxcbiAgICBbMCwgMSwgLTEsIDBdLFxuICAgIFswLCAxLCAxLCAwXSxcbiAgICBbMSwgMCwgMCwgMV1cbl07XG4vKipcbiAqIEBjbGFzcyBSZWN1cnNpdmUgc2hhZG93Y2FzdGluZyBhbGdvcml0aG1cbiAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIDQvOCB0b3BvbG9naWVzLCBub3QgaGV4YWdvbmFsLlxuICogQmFzZWQgb24gUGV0ZXIgSGFya2lucycgaW1wbGVtZW50YXRpb24gb2YgQmrDtnJuIEJlcmdzdHLDtm0ncyBhbGdvcml0aG0gZGVzY3JpYmVkIGhlcmU6IGh0dHA6Ly93d3cucm9ndWViYXNpbi5jb20vaW5kZXgucGhwP3RpdGxlPUZPVl91c2luZ19yZWN1cnNpdmVfc2hhZG93Y2FzdGluZ1xuICogQGF1Z21lbnRzIFJPVC5GT1ZcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdXJzaXZlU2hhZG93Y2FzdGluZyBleHRlbmRzIEZPViB7XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB2aXNpYmlsaXR5IGZvciBhIDM2MC1kZWdyZWUgY2lyY2xlXG4gICAgICogQHBhcmFtIHtpbnR9IHhcbiAgICAgKiBAcGFyYW0ge2ludH0geVxuICAgICAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIGNvbXB1dGUoeCwgeSwgUiwgY2FsbGJhY2spIHtcbiAgICAgICAgLy9Zb3UgY2FuIGFsd2F5cyBzZWUgeW91ciBvd24gdGlsZVxuICAgICAgICBjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPQ1RBTlRTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tpXSwgUiwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgdmlzaWJpbGl0eSBmb3IgYSAxODAtZGVncmVlIGFyY1xuICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gICAgICogQHBhcmFtIHtpbnR9IGRpciBEaXJlY3Rpb24gdG8gbG9vayBpbiAoZXhwcmVzc2VkIGluIGEgUk9ULkRJUlMgdmFsdWUpO1xuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICovXG4gICAgY29tcHV0ZTE4MCh4LCB5LCBSLCBkaXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vWW91IGNhbiBhbHdheXMgc2VlIHlvdXIgb3duIHRpbGVcbiAgICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICAgIGxldCBwcmV2aW91c09jdGFudCA9IChkaXIgLSAxICsgOCkgJSA4OyAvL05lZWQgdG8gcmV0cmlldmUgdGhlIHByZXZpb3VzIG9jdGFudCB0byByZW5kZXIgYSBmdWxsIDE4MCBkZWdyZWVzXG4gICAgICAgIGxldCBuZXh0UHJldmlvdXNPY3RhbnQgPSAoZGlyIC0gMiArIDgpICUgODsgLy9OZWVkIHRvIHJldHJpZXZlIHRoZSBwcmV2aW91cyB0d28gb2N0YW50cyB0byByZW5kZXIgYSBmdWxsIDE4MCBkZWdyZWVzXG4gICAgICAgIGxldCBuZXh0T2N0YW50ID0gKGRpciArIDEgKyA4KSAlIDg7IC8vTmVlZCB0byBncmFiIHRvIG5leHQgb2N0YW50IHRvIHJlbmRlciBhIGZ1bGwgMTgwIGRlZ3JlZXNcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbbmV4dFByZXZpb3VzT2N0YW50XSwgUiwgY2FsbGJhY2spO1xuICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1twcmV2aW91c09jdGFudF0sIFIsIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbZGlyXSwgUiwgY2FsbGJhY2spO1xuICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1tuZXh0T2N0YW50XSwgUiwgY2FsbGJhY2spO1xuICAgIH1cbiAgICA7XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSB2aXNpYmlsaXR5IGZvciBhIDkwLWRlZ3JlZSBhcmNcbiAgICAgKiBAcGFyYW0ge2ludH0geFxuICAgICAqIEBwYXJhbSB7aW50fSB5XG4gICAgICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICAgICAqIEBwYXJhbSB7aW50fSBkaXIgRGlyZWN0aW9uIHRvIGxvb2sgaW4gKGV4cHJlc3NlZCBpbiBhIFJPVC5ESVJTIHZhbHVlKTtcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIGNvbXB1dGU5MCh4LCB5LCBSLCBkaXIsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vWW91IGNhbiBhbHdheXMgc2VlIHlvdXIgb3duIHRpbGVcbiAgICAgICAgY2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgICAgIGxldCBwcmV2aW91c09jdGFudCA9IChkaXIgLSAxICsgOCkgJSA4OyAvL05lZWQgdG8gcmV0cmlldmUgdGhlIHByZXZpb3VzIG9jdGFudCB0byByZW5kZXIgYSBmdWxsIDkwIGRlZ3JlZXNcbiAgICAgICAgdGhpcy5fcmVuZGVyT2N0YW50KHgsIHksIE9DVEFOVFNbZGlyXSwgUiwgY2FsbGJhY2spO1xuICAgICAgICB0aGlzLl9yZW5kZXJPY3RhbnQoeCwgeSwgT0NUQU5UU1twcmV2aW91c09jdGFudF0sIFIsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIG9uZSBvY3RhbnQgKDQ1LWRlZ3JlZSBhcmMpIG9mIHRoZSB2aWV3c2hlZFxuICAgICAqIEBwYXJhbSB7aW50fSB4XG4gICAgICogQHBhcmFtIHtpbnR9IHlcbiAgICAgKiBAcGFyYW0ge2ludH0gb2N0YW50IE9jdGFudCB0byBiZSByZW5kZXJlZFxuICAgICAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqL1xuICAgIF9yZW5kZXJPY3RhbnQoeCwgeSwgb2N0YW50LCBSLCBjYWxsYmFjaykge1xuICAgICAgICAvL1JhZGl1cyBpbmNyZW1lbnRlZCBieSAxIHRvIHByb3ZpZGUgc2FtZSBjb3ZlcmFnZSBhcmVhIGFzIG90aGVyIHNoYWRvd2Nhc3RpbmcgcmFkaXVzZXNcbiAgICAgICAgdGhpcy5fY2FzdFZpc2liaWxpdHkoeCwgeSwgMSwgMS4wLCAwLjAsIFIgKyAxLCBvY3RhbnRbMF0sIG9jdGFudFsxXSwgb2N0YW50WzJdLCBvY3RhbnRbM10sIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWN0dWFsbHkgY2FsY3VsYXRlcyB0aGUgdmlzaWJpbGl0eVxuICAgICAqIEBwYXJhbSB7aW50fSBzdGFydFggVGhlIHN0YXJ0aW5nIFggY29vcmRpbmF0ZVxuICAgICAqIEBwYXJhbSB7aW50fSBzdGFydFkgVGhlIHN0YXJ0aW5nIFkgY29vcmRpbmF0ZVxuICAgICAqIEBwYXJhbSB7aW50fSByb3cgVGhlIHJvdyB0byByZW5kZXJcbiAgICAgKiBAcGFyYW0ge2Zsb2F0fSB2aXNTbG9wZVN0YXJ0IFRoZSBzbG9wZSB0byBzdGFydCBhdFxuICAgICAqIEBwYXJhbSB7ZmxvYXR9IHZpc1Nsb3BlRW5kIFRoZSBzbG9wZSB0byBlbmQgYXRcbiAgICAgKiBAcGFyYW0ge2ludH0gcmFkaXVzIFRoZSByYWRpdXMgdG8gcmVhY2ggb3V0IHRvXG4gICAgICogQHBhcmFtIHtpbnR9IHh4XG4gICAgICogQHBhcmFtIHtpbnR9IHh5XG4gICAgICogQHBhcmFtIHtpbnR9IHl4XG4gICAgICogQHBhcmFtIHtpbnR9IHl5XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHVzZSB3aGVuIHdlIGhpdCBhIGJsb2NrIHRoYXQgaXMgdmlzaWJsZVxuICAgICAqL1xuICAgIF9jYXN0VmlzaWJpbGl0eShzdGFydFgsIHN0YXJ0WSwgcm93LCB2aXNTbG9wZVN0YXJ0LCB2aXNTbG9wZUVuZCwgcmFkaXVzLCB4eCwgeHksIHl4LCB5eSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHZpc1Nsb3BlU3RhcnQgPCB2aXNTbG9wZUVuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSByb3c7IGkgPD0gcmFkaXVzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkeCA9IC1pIC0gMTtcbiAgICAgICAgICAgIGxldCBkeSA9IC1pO1xuICAgICAgICAgICAgbGV0IGJsb2NrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBuZXdTdGFydCA9IDA7XG4gICAgICAgICAgICAvLydSb3cnIGNvdWxkIGJlIGNvbHVtbiwgbmFtZXMgaGVyZSBhc3N1bWUgb2N0YW50IDAgYW5kIHdvdWxkIGJlIGZsaXBwZWQgZm9yIGhhbGYgdGhlIG9jdGFudHNcbiAgICAgICAgICAgIHdoaWxlIChkeCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgZHggKz0gMTtcbiAgICAgICAgICAgICAgICAvL1RyYW5zbGF0ZSBmcm9tIHJlbGF0aXZlIGNvb3JkaW5hdGVzIHRvIG1hcCBjb29yZGluYXRlc1xuICAgICAgICAgICAgICAgIGxldCBtYXBYID0gc3RhcnRYICsgZHggKiB4eCArIGR5ICogeHk7XG4gICAgICAgICAgICAgICAgbGV0IG1hcFkgPSBzdGFydFkgKyBkeCAqIHl4ICsgZHkgKiB5eTtcbiAgICAgICAgICAgICAgICAvL1JhbmdlIG9mIHRoZSByb3dcbiAgICAgICAgICAgICAgICBsZXQgc2xvcGVTdGFydCA9IChkeCAtIDAuNSkgLyAoZHkgKyAwLjUpO1xuICAgICAgICAgICAgICAgIGxldCBzbG9wZUVuZCA9IChkeCArIDAuNSkgLyAoZHkgLSAwLjUpO1xuICAgICAgICAgICAgICAgIC8vSWdub3JlIGlmIG5vdCB5ZXQgYXQgbGVmdCBlZGdlIG9mIE9jdGFudFxuICAgICAgICAgICAgICAgIGlmIChzbG9wZUVuZCA+IHZpc1Nsb3BlU3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vRG9uZSBpZiBwYXN0IHJpZ2h0IGVkZ2VcbiAgICAgICAgICAgICAgICBpZiAoc2xvcGVTdGFydCA8IHZpc1Nsb3BlRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0lmIGl0J3MgaW4gcmFuZ2UsIGl0J3MgdmlzaWJsZVxuICAgICAgICAgICAgICAgIGlmICgoZHggKiBkeCArIGR5ICogZHkpIDwgKHJhZGl1cyAqIHJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobWFwWCwgbWFwWSwgaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghYmxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAvL0lmIHRpbGUgaXMgYSBibG9ja2luZyB0aWxlLCBjYXN0IGFyb3VuZCBpdFxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKG1hcFgsIG1hcFkpICYmIGkgPCByYWRpdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FzdFZpc2liaWxpdHkoc3RhcnRYLCBzdGFydFksIGkgKyAxLCB2aXNTbG9wZVN0YXJ0LCBzbG9wZVN0YXJ0LCByYWRpdXMsIHh4LCB4eSwgeXgsIHl5LCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTdGFydCA9IHNsb3BlRW5kO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL0tlZXAgbmFycm93aW5nIGlmIHNjYW5uaW5nIGFjcm9zcyBhIGJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbGlnaHRQYXNzZXMobWFwWCwgbWFwWSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1N0YXJ0ID0gc2xvcGVFbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL0Jsb2NrIGhhcyBlbmRlZFxuICAgICAgICAgICAgICAgICAgICBibG9ja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZpc1Nsb3BlU3RhcnQgPSBuZXdTdGFydDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmxvY2tlZCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBSTkcgfSBmcm9tIFwiLi9ybmcuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRGlzcGxheSB9IGZyb20gXCIuL2Rpc3BsYXkvZGlzcGxheS5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTdHJpbmdHZW5lcmF0b3IgfSBmcm9tIFwiLi9zdHJpbmdnZW5lcmF0b3IuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRXZlbnRRdWV1ZSB9IGZyb20gXCIuL2V2ZW50cXVldWUuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2NoZWR1bGVyIH0gZnJvbSBcIi4vc2NoZWR1bGVyL2luZGV4LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEZPViB9IGZyb20gXCIuL2Zvdi9pbmRleC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBNYXAgfSBmcm9tIFwiLi9tYXAvaW5kZXguanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTm9pc2UgfSBmcm9tIFwiLi9ub2lzZS9pbmRleC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQYXRoIH0gZnJvbSBcIi4vcGF0aC9pbmRleC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFbmdpbmUgfSBmcm9tIFwiLi9lbmdpbmUuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTGlnaHRpbmcgfSBmcm9tIFwiLi9saWdodGluZy5qc1wiO1xuZXhwb3J0IHsgREVGQVVMVF9XSURUSCwgREVGQVVMVF9IRUlHSFQsIERJUlMsIEtFWVMgfSBmcm9tIFwiLi9jb25zdGFudHMuanNcIjtcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcIi4vdXRpbC5qc1wiO1xuZXhwb3J0IGNvbnN0IFV0aWwgPSB1dGlsO1xuaW1wb3J0ICogYXMgY29sb3IgZnJvbSBcIi4vY29sb3IuanNcIjtcbmV4cG9ydCBjb25zdCBDb2xvciA9IGNvbG9yO1xuaW1wb3J0ICogYXMgdGV4dCBmcm9tIFwiLi90ZXh0LmpzXCI7XG5leHBvcnQgY29uc3QgVGV4dCA9IHRleHQ7XG4iLCJpbXBvcnQgKiBhcyBDb2xvciBmcm9tIFwiLi9jb2xvci5qc1wiO1xuO1xuO1xuO1xuO1xuLyoqXG4gKiBMaWdodGluZyBjb21wdXRhdGlvbiwgYmFzZWQgb24gYSB0cmFkaXRpb25hbCBGT1YgZm9yIG11bHRpcGxlIGxpZ2h0IHNvdXJjZXMgYW5kIG11bHRpcGxlIHBhc3Nlcy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlnaHRpbmcge1xuICAgIGNvbnN0cnVjdG9yKHJlZmxlY3Rpdml0eUNhbGxiYWNrLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5fcmVmbGVjdGl2aXR5Q2FsbGJhY2sgPSByZWZsZWN0aXZpdHlDYWxsYmFjaztcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHt9O1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBwYXNzZXM6IDEsXG4gICAgICAgICAgICBlbWlzc2lvblRocmVzaG9sZDogMTAwLFxuICAgICAgICAgICAgcmFuZ2U6IDEwXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9saWdodHMgPSB7fTtcbiAgICAgICAgdGhpcy5fcmVmbGVjdGl2aXR5Q2FjaGUgPSB7fTtcbiAgICAgICAgdGhpcy5fZm92Q2FjaGUgPSB7fTtcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGp1c3Qgb3B0aW9ucyBhdCBydW50aW1lXG4gICAgICovXG4gICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB1c2VkIEZpZWxkLU9mLVZpZXcgYWxnb1xuICAgICAqL1xuICAgIHNldEZPVihmb3YpIHtcbiAgICAgICAgdGhpcy5fZm92ID0gZm92O1xuICAgICAgICB0aGlzLl9mb3ZDYWNoZSA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IChvciByZW1vdmUpIGEgbGlnaHQgc291cmNlXG4gICAgICovXG4gICAgc2V0TGlnaHQoeCwgeSwgY29sb3IpIHtcbiAgICAgICAgbGV0IGtleSA9IHggKyBcIixcIiArIHk7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5fbGlnaHRzW2tleV0gPSAodHlwZW9mIChjb2xvcikgPT0gXCJzdHJpbmdcIiA/IENvbG9yLmZyb21TdHJpbmcoY29sb3IpIDogY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2xpZ2h0c1trZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGxpZ2h0IHNvdXJjZXNcbiAgICAgKi9cbiAgICBjbGVhckxpZ2h0cygpIHsgdGhpcy5fbGlnaHRzID0ge307IH1cbiAgICAvKipcbiAgICAgKiBSZXNldCB0aGUgcHJlLWNvbXB1dGVkIHRvcG9sb2d5IHZhbHVlcy4gQ2FsbCB3aGVuZXZlciB0aGUgdW5kZXJseWluZyBtYXAgY2hhbmdlcyBpdHMgbGlnaHQtcGFzc2FiaWxpdHkuXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlID0ge307XG4gICAgICAgIHRoaXMuX2ZvdkNhY2hlID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIHRoZSBsaWdodGluZ1xuICAgICAqL1xuICAgIGNvbXB1dGUobGlnaHRpbmdDYWxsYmFjaykge1xuICAgICAgICBsZXQgZG9uZUNlbGxzID0ge307XG4gICAgICAgIGxldCBlbWl0dGluZ0NlbGxzID0ge307XG4gICAgICAgIGxldCBsaXRDZWxscyA9IHt9O1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fbGlnaHRzKSB7IC8qIHByZXBhcmUgZW1pdHRlcnMgZm9yIGZpcnN0IHBhc3MgKi9cbiAgICAgICAgICAgIGxldCBsaWdodCA9IHRoaXMuX2xpZ2h0c1trZXldO1xuICAgICAgICAgICAgZW1pdHRpbmdDZWxsc1trZXldID0gWzAsIDAsIDBdO1xuICAgICAgICAgICAgQ29sb3IuYWRkXyhlbWl0dGluZ0NlbGxzW2tleV0sIGxpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMucGFzc2VzOyBpKyspIHsgLyogbWFpbiBsb29wICovXG4gICAgICAgICAgICB0aGlzLl9lbWl0TGlnaHQoZW1pdHRpbmdDZWxscywgbGl0Q2VsbHMsIGRvbmVDZWxscyk7XG4gICAgICAgICAgICBpZiAoaSArIDEgPT0gdGhpcy5fb3B0aW9ucy5wYXNzZXMpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gLyogbm90IGZvciB0aGUgbGFzdCBwYXNzICovXG4gICAgICAgICAgICBlbWl0dGluZ0NlbGxzID0gdGhpcy5fY29tcHV0ZUVtaXR0ZXJzKGxpdENlbGxzLCBkb25lQ2VsbHMpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGxpdEtleSBpbiBsaXRDZWxscykgeyAvKiBsZXQgdGhlIHVzZXIga25vdyB3aGF0IGFuZCBob3cgaXMgbGl0ICovXG4gICAgICAgICAgICBsZXQgcGFydHMgPSBsaXRLZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgbGV0IHggPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgICAgICBsZXQgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgICAgIGxpZ2h0aW5nQ2FsbGJhY2soeCwgeSwgbGl0Q2VsbHNbbGl0S2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgb25lIGl0ZXJhdGlvbiBmcm9tIGFsbCBlbWl0dGluZyBjZWxsc1xuICAgICAqIEBwYXJhbSBlbWl0dGluZ0NlbGxzIFRoZXNlIGVtaXQgbGlnaHRcbiAgICAgKiBAcGFyYW0gbGl0Q2VsbHMgQWRkIHByb2plY3RlZCBsaWdodCB0byB0aGVzZVxuICAgICAqIEBwYXJhbSBkb25lQ2VsbHMgVGhlc2UgYWxyZWFkeSBlbWl0dGVkLCBmb3JiaWQgdGhlbSBmcm9tIGZ1cnRoZXIgY2FsY3VsYXRpb25zXG4gICAgICovXG4gICAgX2VtaXRMaWdodChlbWl0dGluZ0NlbGxzLCBsaXRDZWxscywgZG9uZUNlbGxzKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBlbWl0dGluZ0NlbGxzKSB7XG4gICAgICAgICAgICBsZXQgcGFydHMgPSBrZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgbGV0IHggPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgICAgICBsZXQgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXRMaWdodEZyb21DZWxsKHgsIHksIGVtaXR0aW5nQ2VsbHNba2V5XSwgbGl0Q2VsbHMpO1xuICAgICAgICAgICAgZG9uZUNlbGxzW2tleV0gPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcmVwYXJlIGEgbGlzdCBvZiBlbWl0dGVycyBmb3IgbmV4dCBwYXNzXG4gICAgICovXG4gICAgX2NvbXB1dGVFbWl0dGVycyhsaXRDZWxscywgZG9uZUNlbGxzKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGxpdENlbGxzKSB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIGRvbmVDZWxscykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSAvKiBhbHJlYWR5IGVtaXR0ZWQgKi9cbiAgICAgICAgICAgIGxldCBjb2xvciA9IGxpdENlbGxzW2tleV07XG4gICAgICAgICAgICBsZXQgcmVmbGVjdGl2aXR5O1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9yZWZsZWN0aXZpdHlDYWNoZSkge1xuICAgICAgICAgICAgICAgIHJlZmxlY3Rpdml0eSA9IHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFydHMgPSBrZXkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgIGxldCB4ID0gcGFyc2VJbnQocGFydHNbMF0pO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gcGFyc2VJbnQocGFydHNbMV0pO1xuICAgICAgICAgICAgICAgIHJlZmxlY3Rpdml0eSA9IHRoaXMuX3JlZmxlY3Rpdml0eUNhbGxiYWNrKHgsIHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlZmxlY3Rpdml0eUNhY2hlW2tleV0gPSByZWZsZWN0aXZpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVmbGVjdGl2aXR5ID09IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gLyogd2lsbCBub3QgcmVmbGVjdCBhdCBhbGwgKi9cbiAgICAgICAgICAgIC8qIGNvbXB1dGUgZW1pc3Npb24gY29sb3IgKi9cbiAgICAgICAgICAgIGxldCBlbWlzc2lvbiA9IFswLCAwLCAwXTtcbiAgICAgICAgICAgIGxldCBpbnRlbnNpdHkgPSAwO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcGFydCA9IE1hdGgucm91bmQoY29sb3JbaV0gKiByZWZsZWN0aXZpdHkpO1xuICAgICAgICAgICAgICAgIGVtaXNzaW9uW2ldID0gcGFydDtcbiAgICAgICAgICAgICAgICBpbnRlbnNpdHkgKz0gcGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnRlbnNpdHkgPiB0aGlzLl9vcHRpb25zLmVtaXNzaW9uVGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBlbWlzc2lvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIG9uZSBpdGVyYXRpb24gZnJvbSBvbmUgY2VsbFxuICAgICAqL1xuICAgIF9lbWl0TGlnaHRGcm9tQ2VsbCh4LCB5LCBjb2xvciwgbGl0Q2VsbHMpIHtcbiAgICAgICAgbGV0IGtleSA9IHggKyBcIixcIiArIHk7XG4gICAgICAgIGxldCBmb3Y7XG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy5fZm92Q2FjaGUpIHtcbiAgICAgICAgICAgIGZvdiA9IHRoaXMuX2ZvdkNhY2hlW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3YgPSB0aGlzLl91cGRhdGVGT1YoeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgZm92S2V5IGluIGZvdikge1xuICAgICAgICAgICAgbGV0IGZvcm1GYWN0b3IgPSBmb3ZbZm92S2V5XTtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBpZiAoZm92S2V5IGluIGxpdENlbGxzKSB7IC8qIGFscmVhZHkgbGl0ICovXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbGl0Q2VsbHNbZm92S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvKiBuZXdseSBsaXQgKi9cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBbMCwgMCwgMF07XG4gICAgICAgICAgICAgICAgbGl0Q2VsbHNbZm92S2V5XSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldICs9IE1hdGgucm91bmQoY29sb3JbaV0gKiBmb3JtRmFjdG9yKTtcbiAgICAgICAgICAgIH0gLyogYWRkIGxpZ2h0IGNvbG9yICovXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbXB1dGUgRk9WIChcImZvcm0gZmFjdG9yXCIpIGZvciBhIHBvdGVudGlhbCBsaWdodCBzb3VyY2UgYXQgW3gseV1cbiAgICAgKi9cbiAgICBfdXBkYXRlRk9WKHgsIHkpIHtcbiAgICAgICAgbGV0IGtleTEgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICBsZXQgY2FjaGUgPSB7fTtcbiAgICAgICAgdGhpcy5fZm92Q2FjaGVba2V5MV0gPSBjYWNoZTtcbiAgICAgICAgbGV0IHJhbmdlID0gdGhpcy5fb3B0aW9ucy5yYW5nZTtcbiAgICAgICAgZnVuY3Rpb24gY2IoeCwgeSwgciwgdmlzKSB7XG4gICAgICAgICAgICBsZXQga2V5MiA9IHggKyBcIixcIiArIHk7XG4gICAgICAgICAgICBsZXQgZm9ybUZhY3RvciA9IHZpcyAqICgxIC0gciAvIHJhbmdlKTtcbiAgICAgICAgICAgIGlmIChmb3JtRmFjdG9yID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWNoZVtrZXkyXSA9IGZvcm1GYWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICB0aGlzLl9mb3YuY29tcHV0ZSh4LCB5LCByYW5nZSwgY2IuYmluZCh0aGlzKSk7XG4gICAgICAgIHJldHVybiBjYWNoZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgU2ltcGxlIGVtcHR5IHJlY3Rhbmd1bGFyIHJvb21cbiAqIEBhdWdtZW50cyBST1QuTWFwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyZW5hIGV4dGVuZHMgTWFwIHtcbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHcgPSB0aGlzLl93aWR0aCAtIDE7XG4gICAgICAgIGxldCBoID0gdGhpcy5faGVpZ2h0IC0gMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gdzsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZW1wdHkgPSAoaSAmJiBqICYmIGkgPCB3ICYmIGogPCBoKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCBlbXB0eSA/IDAgOiAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuaW1wb3J0IHsgRElSUyB9IGZyb20gXCIuLi9jb25zdGFudHMuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuO1xuLyoqXG4gKiBAY2xhc3MgQ2VsbHVsYXIgYXV0b21hdG9uIG1hcCBnZW5lcmF0b3JcbiAqIEBhdWdtZW50cyBST1QuTWFwXG4gKiBAcGFyYW0ge2ludH0gW3dpZHRoPVJPVC5ERUZBVUxUX1dJRFRIXVxuICogQHBhcmFtIHtpbnR9IFtoZWlnaHQ9Uk9ULkRFRkFVTFRfSEVJR0hUXVxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSBPcHRpb25zXG4gKiBAcGFyYW0ge2ludFtdfSBbb3B0aW9ucy5ib3JuXSBMaXN0IG9mIG5laWdoYm9yIGNvdW50cyBmb3IgYSBuZXcgY2VsbCB0byBiZSBib3JuIGluIGVtcHR5IHNwYWNlXG4gKiBAcGFyYW0ge2ludFtdfSBbb3B0aW9ucy5zdXJ2aXZlXSBMaXN0IG9mIG5laWdoYm9yIGNvdW50cyBmb3IgYW4gZXhpc3RpbmcgIGNlbGwgdG8gc3Vydml2ZVxuICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnRvcG9sb2d5XSBUb3BvbG9neSA0IG9yIDYgb3IgOFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDZWxsdWxhciBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgICAgICAgYm9ybjogWzUsIDYsIDcsIDhdLFxuICAgICAgICAgICAgc3Vydml2ZTogWzQsIDUsIDYsIDcsIDhdLFxuICAgICAgICAgICAgdG9wb2xvZ3k6IDhcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9kaXJzID0gRElSU1t0aGlzLl9vcHRpb25zLnRvcG9sb2d5XTtcbiAgICAgICAgdGhpcy5fbWFwID0gdGhpcy5fZmlsbE1hcCgwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsbCB0aGUgbWFwIHdpdGggcmFuZG9tIHZhbHVlc1xuICAgICAqIEBwYXJhbSB7ZmxvYXR9IHByb2JhYmlsaXR5IFByb2JhYmlsaXR5IGZvciBhIGNlbGwgdG8gYmVjb21lIGFsaXZlOyAwID0gYWxsIGVtcHR5LCAxID0gYWxsIGZ1bGxcbiAgICAgKi9cbiAgICByYW5kb21pemUocHJvYmFiaWxpdHkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwW2ldW2pdID0gKFJORy5nZXRVbmlmb3JtKCkgPCBwcm9iYWJpbGl0eSA/IDEgOiAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIG9wdGlvbnMuXG4gICAgICogQHNlZSBST1QuTWFwLkNlbGx1bGFyXG4gICAgICovXG4gICAgc2V0T3B0aW9ucyhvcHRpb25zKSB7IE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7IH1cbiAgICBzZXQoeCwgeSwgdmFsdWUpIHsgdGhpcy5fbWFwW3hdW3ldID0gdmFsdWU7IH1cbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IG5ld01hcCA9IHRoaXMuX2ZpbGxNYXAoMCk7XG4gICAgICAgIGxldCBib3JuID0gdGhpcy5fb3B0aW9ucy5ib3JuO1xuICAgICAgICBsZXQgc3Vydml2ZSA9IHRoaXMuX29wdGlvbnMuc3Vydml2ZTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgbGV0IHdpZHRoU3RlcCA9IDE7XG4gICAgICAgICAgICBsZXQgd2lkdGhTdGFydCA9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XG4gICAgICAgICAgICAgICAgd2lkdGhTdGVwID0gMjtcbiAgICAgICAgICAgICAgICB3aWR0aFN0YXJ0ID0gaiAlIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gd2lkdGhTdGFydDsgaSA8IHRoaXMuX3dpZHRoOyBpICs9IHdpZHRoU3RlcCkge1xuICAgICAgICAgICAgICAgIGxldCBjdXIgPSB0aGlzLl9tYXBbaV1bal07XG4gICAgICAgICAgICAgICAgbGV0IG5jb3VudCA9IHRoaXMuX2dldE5laWdoYm9ycyhpLCBqKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VyICYmIHN1cnZpdmUuaW5kZXhPZihuY291bnQpICE9IC0xKSB7IC8qIHN1cnZpdmUgKi9cbiAgICAgICAgICAgICAgICAgICAgbmV3TWFwW2ldW2pdID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIWN1ciAmJiBib3JuLmluZGV4T2YobmNvdW50KSAhPSAtMSkgeyAvKiBib3JuICovXG4gICAgICAgICAgICAgICAgICAgIG5ld01hcFtpXVtqXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcCA9IG5ld01hcDtcbiAgICAgICAgY2FsbGJhY2sgJiYgdGhpcy5fc2VydmljZUNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgX3NlcnZpY2VDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICBsZXQgd2lkdGhTdGVwID0gMTtcbiAgICAgICAgICAgIGxldCB3aWR0aFN0YXJ0ID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5ID09IDYpIHtcbiAgICAgICAgICAgICAgICB3aWR0aFN0ZXAgPSAyO1xuICAgICAgICAgICAgICAgIHdpZHRoU3RhcnQgPSBqICUgMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB3aWR0aFN0YXJ0OyBpIDwgdGhpcy5fd2lkdGg7IGkgKz0gd2lkdGhTdGVwKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5fbWFwW2ldW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgbmVpZ2hib3IgY291bnQgYXQgW2ksal0gaW4gdGhpcy5fbWFwXG4gICAgICovXG4gICAgX2dldE5laWdoYm9ycyhjeCwgY3kpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRpciA9IHRoaXMuX2RpcnNbaV07XG4gICAgICAgICAgICBsZXQgeCA9IGN4ICsgZGlyWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBjeSArIGRpclsxXTtcbiAgICAgICAgICAgIGlmICh4IDwgMCB8fCB4ID49IHRoaXMuX3dpZHRoIHx8IHkgPCAwIHx8IHkgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgKz0gKHRoaXMuX21hcFt4XVt5XSA9PSAxID8gMSA6IDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ha2Ugc3VyZSBldmVyeSBub24td2FsbCBzcGFjZSBpcyBhY2Nlc3NpYmxlLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIHRvIGNhbGwgdG8gZGlzcGxheSBtYXAgd2hlbiBkb1xuICAgICAqIEBwYXJhbSB7aW50fSB2YWx1ZSB0byBjb25zaWRlciBlbXB0eSBzcGFjZSAtIGRlZmF1bHRzIHRvIDBcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayB0byBjYWxsIHdoZW4gYSBuZXcgY29ubmVjdGlvbiBpcyBtYWRlXG4gICAgICovXG4gICAgY29ubmVjdChjYWxsYmFjaywgdmFsdWUsIGNvbm5lY3Rpb25DYWxsYmFjaykge1xuICAgICAgICBpZiAoIXZhbHVlKVxuICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICBsZXQgYWxsRnJlZVNwYWNlID0gW107XG4gICAgICAgIGxldCBub3RDb25uZWN0ZWQgPSB7fTtcbiAgICAgICAgLy8gZmluZCBhbGwgZnJlZSBzcGFjZVxuICAgICAgICBsZXQgd2lkdGhTdGVwID0gMTtcbiAgICAgICAgbGV0IHdpZHRoU3RhcnRzID0gWzAsIDBdO1xuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2KSB7XG4gICAgICAgICAgICB3aWR0aFN0ZXAgPSAyO1xuICAgICAgICAgICAgd2lkdGhTdGFydHMgPSBbMCwgMV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLl9oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IHdpZHRoU3RhcnRzW3kgJSAyXTsgeCA8IHRoaXMuX3dpZHRoOyB4ICs9IHdpZHRoU3RlcCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9mcmVlU3BhY2UoeCwgeSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwID0gW3gsIHldO1xuICAgICAgICAgICAgICAgICAgICBub3RDb25uZWN0ZWRbdGhpcy5fcG9pbnRLZXkocCldID0gcDtcbiAgICAgICAgICAgICAgICAgICAgYWxsRnJlZVNwYWNlLnB1c2goW3gsIHldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0YXJ0ID0gYWxsRnJlZVNwYWNlW1JORy5nZXRVbmlmb3JtSW50KDAsIGFsbEZyZWVTcGFjZS5sZW5ndGggLSAxKV07XG4gICAgICAgIGxldCBrZXkgPSB0aGlzLl9wb2ludEtleShzdGFydCk7XG4gICAgICAgIGxldCBjb25uZWN0ZWQgPSB7fTtcbiAgICAgICAgY29ubmVjdGVkW2tleV0gPSBzdGFydDtcbiAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtrZXldO1xuICAgICAgICAvLyBmaW5kIHdoYXQncyBjb25uZWN0ZWQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50XG4gICAgICAgIHRoaXMuX2ZpbmRDb25uZWN0ZWQoY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIFtzdGFydF0sIGZhbHNlLCB2YWx1ZSk7XG4gICAgICAgIHdoaWxlIChPYmplY3Qua2V5cyhub3RDb25uZWN0ZWQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIGZpbmQgdHdvIHBvaW50cyBmcm9tIG5vdENvbm5lY3RlZCB0byBjb25uZWN0ZWRcbiAgICAgICAgICAgIGxldCBwID0gdGhpcy5fZ2V0RnJvbVRvKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkKTtcbiAgICAgICAgICAgIGxldCBmcm9tID0gcFswXTsgLy8gbm90Q29ubmVjdGVkXG4gICAgICAgICAgICBsZXQgdG8gPSBwWzFdOyAvLyBjb25uZWN0ZWRcbiAgICAgICAgICAgIC8vIGZpbmQgZXZlcnl0aGluZyBjb25uZWN0ZWQgdG8gdGhlIHN0YXJ0aW5nIHBvaW50XG4gICAgICAgICAgICBsZXQgbG9jYWwgPSB7fTtcbiAgICAgICAgICAgIGxvY2FsW3RoaXMuX3BvaW50S2V5KGZyb20pXSA9IGZyb207XG4gICAgICAgICAgICB0aGlzLl9maW5kQ29ubmVjdGVkKGxvY2FsLCBub3RDb25uZWN0ZWQsIFtmcm9tXSwgdHJ1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgLy8gY29ubmVjdCB0byBhIGNvbm5lY3RlZCBjZWxsXG4gICAgICAgICAgICBsZXQgdHVubmVsRm4gPSAodGhpcy5fb3B0aW9ucy50b3BvbG9neSA9PSA2ID8gdGhpcy5fdHVubmVsVG9Db25uZWN0ZWQ2IDogdGhpcy5fdHVubmVsVG9Db25uZWN0ZWQpO1xuICAgICAgICAgICAgdHVubmVsRm4uY2FsbCh0aGlzLCB0bywgZnJvbSwgY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIHZhbHVlLCBjb25uZWN0aW9uQ2FsbGJhY2spO1xuICAgICAgICAgICAgLy8gbm93IGFsbCBvZiBsb2NhbCBpcyBjb25uZWN0ZWRcbiAgICAgICAgICAgIGZvciAobGV0IGsgaW4gbG9jYWwpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHAgPSBsb2NhbFtrXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBbcHBbMF1dW3BwWzFdXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbm5lY3RlZFtrXSA9IHBwO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBub3RDb25uZWN0ZWRba107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2sgJiYgdGhpcy5fc2VydmljZUNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZCByYW5kb20gcG9pbnRzIHRvIGNvbm5lY3QuIFNlYXJjaCBmb3IgdGhlIGNsb3Nlc3QgcG9pbnQgaW4gdGhlIGxhcmdlciBzcGFjZS5cbiAgICAgKiBUaGlzIGlzIHRvIG1pbmltaXplIHRoZSBsZW5ndGggb2YgdGhlIHBhc3NhZ2Ugd2hpbGUgbWFpbnRhaW5pbmcgZ29vZCBwZXJmb3JtYW5jZS5cbiAgICAgKi9cbiAgICBfZ2V0RnJvbVRvKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkKSB7XG4gICAgICAgIGxldCBmcm9tID0gWzAsIDBdLCB0byA9IFswLCAwXSwgZDtcbiAgICAgICAgbGV0IGNvbm5lY3RlZEtleXMgPSBPYmplY3Qua2V5cyhjb25uZWN0ZWQpO1xuICAgICAgICBsZXQgbm90Q29ubmVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKG5vdENvbm5lY3RlZCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY29ubmVjdGVkS2V5cy5sZW5ndGggPCBub3RDb25uZWN0ZWRLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBrZXlzID0gY29ubmVjdGVkS2V5cztcbiAgICAgICAgICAgICAgICB0byA9IGNvbm5lY3RlZFtrZXlzW1JORy5nZXRVbmlmb3JtSW50KDAsIGtleXMubGVuZ3RoIC0gMSldXTtcbiAgICAgICAgICAgICAgICBmcm9tID0gdGhpcy5fZ2V0Q2xvc2VzdCh0bywgbm90Q29ubmVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBrZXlzID0gbm90Q29ubmVjdGVkS2V5cztcbiAgICAgICAgICAgICAgICBmcm9tID0gbm90Q29ubmVjdGVkW2tleXNbUk5HLmdldFVuaWZvcm1JbnQoMCwga2V5cy5sZW5ndGggLSAxKV1dO1xuICAgICAgICAgICAgICAgIHRvID0gdGhpcy5fZ2V0Q2xvc2VzdChmcm9tLCBjb25uZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZCA9IChmcm9tWzBdIC0gdG9bMF0pICogKGZyb21bMF0gLSB0b1swXSkgKyAoZnJvbVsxXSAtIHRvWzFdKSAqIChmcm9tWzFdIC0gdG9bMV0pO1xuICAgICAgICAgICAgaWYgKGQgPCA2NCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPj4+IGNvbm5lY3RlZD1cIiArIHRvICsgXCIgbm90Q29ubmVjdGVkPVwiICsgZnJvbSArIFwiIGRpc3Q9XCIgKyBkKTtcbiAgICAgICAgcmV0dXJuIFtmcm9tLCB0b107XG4gICAgfVxuICAgIF9nZXRDbG9zZXN0KHBvaW50LCBzcGFjZSkge1xuICAgICAgICBsZXQgbWluUG9pbnQgPSBudWxsO1xuICAgICAgICBsZXQgbWluRGlzdCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGsgaW4gc3BhY2UpIHtcbiAgICAgICAgICAgIGxldCBwID0gc3BhY2Vba107XG4gICAgICAgICAgICBsZXQgZCA9IChwWzBdIC0gcG9pbnRbMF0pICogKHBbMF0gLSBwb2ludFswXSkgKyAocFsxXSAtIHBvaW50WzFdKSAqIChwWzFdIC0gcG9pbnRbMV0pO1xuICAgICAgICAgICAgaWYgKG1pbkRpc3QgPT0gbnVsbCB8fCBkIDwgbWluRGlzdCkge1xuICAgICAgICAgICAgICAgIG1pbkRpc3QgPSBkO1xuICAgICAgICAgICAgICAgIG1pblBvaW50ID0gcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluUG9pbnQ7XG4gICAgfVxuICAgIF9maW5kQ29ubmVjdGVkKGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCBzdGFjaywga2VlcE5vdENvbm5lY3RlZCwgdmFsdWUpIHtcbiAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBwID0gc3RhY2suc3BsaWNlKDAsIDEpWzBdO1xuICAgICAgICAgICAgbGV0IHRlc3RzO1xuICAgICAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gNikge1xuICAgICAgICAgICAgICAgIHRlc3RzID0gW1xuICAgICAgICAgICAgICAgICAgICBbcFswXSArIDIsIHBbMV1dLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSArIDEsIHBbMV0gLSAxXSxcbiAgICAgICAgICAgICAgICAgICAgW3BbMF0gLSAxLCBwWzFdIC0gMV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdIC0gMiwgcFsxXV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdIC0gMSwgcFsxXSArIDFdLFxuICAgICAgICAgICAgICAgICAgICBbcFswXSArIDEsIHBbMV0gKyAxXSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVzdHMgPSBbXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdICsgMSwgcFsxXV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdIC0gMSwgcFsxXV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdLCBwWzFdICsgMV0sXG4gICAgICAgICAgICAgICAgICAgIFtwWzBdLCBwWzFdIC0gMV1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBrZXkgPSB0aGlzLl9wb2ludEtleSh0ZXN0c1tpXSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbm5lY3RlZFtrZXldID09IG51bGwgJiYgdGhpcy5fZnJlZVNwYWNlKHRlc3RzW2ldWzBdLCB0ZXN0c1tpXVsxXSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3RlZFtrZXldID0gdGVzdHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICgha2VlcE5vdENvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2godGVzdHNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfdHVubmVsVG9Db25uZWN0ZWQodG8sIGZyb20sIGNvbm5lY3RlZCwgbm90Q29ubmVjdGVkLCB2YWx1ZSwgY29ubmVjdGlvbkNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBhLCBiO1xuICAgICAgICBpZiAoZnJvbVswXSA8IHRvWzBdKSB7XG4gICAgICAgICAgICBhID0gZnJvbTtcbiAgICAgICAgICAgIGIgPSB0bztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGEgPSB0bztcbiAgICAgICAgICAgIGIgPSBmcm9tO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHh4ID0gYVswXTsgeHggPD0gYlswXTsgeHgrKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW3h4XVthWzFdXSA9IHZhbHVlO1xuICAgICAgICAgICAgbGV0IHAgPSBbeHgsIGFbMV1dO1xuICAgICAgICAgICAgbGV0IHBrZXkgPSB0aGlzLl9wb2ludEtleShwKTtcbiAgICAgICAgICAgIGNvbm5lY3RlZFtwa2V5XSA9IHA7XG4gICAgICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW3BrZXldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25uZWN0aW9uQ2FsbGJhY2sgJiYgYVswXSA8IGJbMF0pIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb25DYWxsYmFjayhhLCBbYlswXSwgYVsxXV0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHggaXMgbm93IGZpeGVkXG4gICAgICAgIGxldCB4ID0gYlswXTtcbiAgICAgICAgaWYgKGZyb21bMV0gPCB0b1sxXSkge1xuICAgICAgICAgICAgYSA9IGZyb207XG4gICAgICAgICAgICBiID0gdG87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhID0gdG87XG4gICAgICAgICAgICBiID0gZnJvbTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCB5eSA9IGFbMV07IHl5IDwgYlsxXTsgeXkrKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW3hdW3l5XSA9IHZhbHVlO1xuICAgICAgICAgICAgbGV0IHAgPSBbeCwgeXldO1xuICAgICAgICAgICAgbGV0IHBrZXkgPSB0aGlzLl9wb2ludEtleShwKTtcbiAgICAgICAgICAgIGNvbm5lY3RlZFtwa2V5XSA9IHA7XG4gICAgICAgICAgICBkZWxldGUgbm90Q29ubmVjdGVkW3BrZXldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25uZWN0aW9uQ2FsbGJhY2sgJiYgYVsxXSA8IGJbMV0pIHtcbiAgICAgICAgICAgIGNvbm5lY3Rpb25DYWxsYmFjayhbYlswXSwgYVsxXV0sIFtiWzBdLCBiWzFdXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3R1bm5lbFRvQ29ubmVjdGVkNih0bywgZnJvbSwgY29ubmVjdGVkLCBub3RDb25uZWN0ZWQsIHZhbHVlLCBjb25uZWN0aW9uQ2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGEsIGI7XG4gICAgICAgIGlmIChmcm9tWzBdIDwgdG9bMF0pIHtcbiAgICAgICAgICAgIGEgPSBmcm9tO1xuICAgICAgICAgICAgYiA9IHRvO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYSA9IHRvO1xuICAgICAgICAgICAgYiA9IGZyb207XG4gICAgICAgIH1cbiAgICAgICAgLy8gdHVubmVsIGRpYWdvbmFsbHkgdW50aWwgaG9yaXpvbnRhbGx5IGxldmVsXG4gICAgICAgIGxldCB4eCA9IGFbMF07XG4gICAgICAgIGxldCB5eSA9IGFbMV07XG4gICAgICAgIHdoaWxlICghKHh4ID09IGJbMF0gJiYgeXkgPT0gYlsxXSkpIHtcbiAgICAgICAgICAgIGxldCBzdGVwV2lkdGggPSAyO1xuICAgICAgICAgICAgaWYgKHl5IDwgYlsxXSkge1xuICAgICAgICAgICAgICAgIHl5Kys7XG4gICAgICAgICAgICAgICAgc3RlcFdpZHRoID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHl5ID4gYlsxXSkge1xuICAgICAgICAgICAgICAgIHl5LS07XG4gICAgICAgICAgICAgICAgc3RlcFdpZHRoID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh4eCA8IGJbMF0pIHtcbiAgICAgICAgICAgICAgICB4eCArPSBzdGVwV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh4eCA+IGJbMF0pIHtcbiAgICAgICAgICAgICAgICB4eCAtPSBzdGVwV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChiWzFdICUgMikge1xuICAgICAgICAgICAgICAgIC8vIFdvbid0IHN0ZXAgb3V0c2lkZSBtYXAgaWYgZGVzdGluYXRpb24gb24gaXMgbWFwJ3MgcmlnaHQgZWRnZVxuICAgICAgICAgICAgICAgIHh4IC09IHN0ZXBXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGRpdHRvIGZvciBsZWZ0IGVkZ2VcbiAgICAgICAgICAgICAgICB4eCArPSBzdGVwV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9tYXBbeHhdW3l5XSA9IHZhbHVlO1xuICAgICAgICAgICAgbGV0IHAgPSBbeHgsIHl5XTtcbiAgICAgICAgICAgIGxldCBwa2V5ID0gdGhpcy5fcG9pbnRLZXkocCk7XG4gICAgICAgICAgICBjb25uZWN0ZWRbcGtleV0gPSBwO1xuICAgICAgICAgICAgZGVsZXRlIG5vdENvbm5lY3RlZFtwa2V5XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29ubmVjdGlvbkNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uQ2FsbGJhY2soZnJvbSwgdG8pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9mcmVlU3BhY2UoeCwgeSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHggPj0gMCAmJiB4IDwgdGhpcy5fd2lkdGggJiYgeSA+PSAwICYmIHkgPCB0aGlzLl9oZWlnaHQgJiYgdGhpcy5fbWFwW3hdW3ldID09IHZhbHVlO1xuICAgIH1cbiAgICBfcG9pbnRLZXkocCkgeyByZXR1cm4gcFswXSArIFwiLlwiICsgcFsxXTsgfVxufVxuIiwiaW1wb3J0IER1bmdlb24gZnJvbSBcIi4vZHVuZ2Vvbi5qc1wiO1xuaW1wb3J0IHsgUm9vbSwgQ29ycmlkb3IgfSBmcm9tIFwiLi9mZWF0dXJlcy5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG5pbXBvcnQgeyBESVJTIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuY29uc3QgRkVBVFVSRVMgPSB7XG4gICAgXCJyb29tXCI6IFJvb20sXG4gICAgXCJjb3JyaWRvclwiOiBDb3JyaWRvclxufTtcbi8qKlxuICogUmFuZG9tIGR1bmdlb24gZ2VuZXJhdG9yIHVzaW5nIGh1bWFuLWxpa2UgZGlnZ2luZyBwYXR0ZXJucy5cbiAqIEhlYXZpbHkgYmFzZWQgb24gTWlrZSBBbmRlcnNvbidzIGlkZWFzIGZyb20gdGhlIFwiVHlyYW50XCIgYWxnbywgbWVudGlvbmVkIGF0XG4gKiBodHRwOi8vd3d3LnJvZ3VlYmFzaW4ucm9ndWVsaWtlZGV2ZWxvcG1lbnQub3JnL2luZGV4LnBocD90aXRsZT1EdW5nZW9uLUJ1aWxkaW5nX0FsZ29yaXRobS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlnZ2VyIGV4dGVuZHMgRHVuZ2VvbiB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICByb29tV2lkdGg6IFszLCA5XSxcbiAgICAgICAgICAgIHJvb21IZWlnaHQ6IFszLCA1XSxcbiAgICAgICAgICAgIGNvcnJpZG9yTGVuZ3RoOiBbMywgMTBdLFxuICAgICAgICAgICAgZHVnUGVyY2VudGFnZTogMC4yLFxuICAgICAgICAgICAgdGltZUxpbWl0OiAxMDAwIC8qIHdlIHN0b3AgYWZ0ZXIgdGhpcyBtdWNoIHRpbWUgaGFzIHBhc3NlZCAobXNlYykgKi9cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2ZlYXR1cmVzID0ge1xuICAgICAgICAgICAgXCJyb29tXCI6IDQsXG4gICAgICAgICAgICBcImNvcnJpZG9yXCI6IDRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICAgIHRoaXMuX2ZlYXR1cmVBdHRlbXB0cyA9IDIwOyAvKiBob3cgbWFueSB0aW1lcyBkbyB3ZSB0cnkgdG8gY3JlYXRlIGEgZmVhdHVyZSBvbiBhIHN1aXRhYmxlIHdhbGwgKi9cbiAgICAgICAgdGhpcy5fd2FsbHMgPSB7fTsgLyogdGhlc2UgYXJlIGF2YWlsYWJsZSBmb3IgZGlnZ2luZyAqL1xuICAgICAgICB0aGlzLl9kdWcgPSAwO1xuICAgICAgICB0aGlzLl9kaWdDYWxsYmFjayA9IHRoaXMuX2RpZ0NhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2sgPSB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2lzV2FsbENhbGxiYWNrID0gdGhpcy5faXNXYWxsQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fcHJpb3JpdHlXYWxsQ2FsbGJhY2sgPSB0aGlzLl9wcmlvcml0eVdhbGxDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fcm9vbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fY29ycmlkb3JzID0gW107XG4gICAgICAgIHRoaXMuX21hcCA9IHRoaXMuX2ZpbGxNYXAoMSk7XG4gICAgICAgIHRoaXMuX3dhbGxzID0ge307XG4gICAgICAgIHRoaXMuX2R1ZyA9IDA7XG4gICAgICAgIGxldCBhcmVhID0gKHRoaXMuX3dpZHRoIC0gMikgKiAodGhpcy5faGVpZ2h0IC0gMik7XG4gICAgICAgIHRoaXMuX2ZpcnN0Um9vbSgpO1xuICAgICAgICBsZXQgdDEgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgcHJpb3JpdHlXYWxscztcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgcHJpb3JpdHlXYWxscyA9IDA7XG4gICAgICAgICAgICBsZXQgdDIgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKHQyIC0gdDEgPiB0aGlzLl9vcHRpb25zLnRpbWVMaW1pdCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyogZmluZCBhIGdvb2Qgd2FsbCAqL1xuICAgICAgICAgICAgbGV0IHdhbGwgPSB0aGlzLl9maW5kV2FsbCgpO1xuICAgICAgICAgICAgaWYgKCF3YWxsKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IC8qIG5vIG1vcmUgd2FsbHMgKi9cbiAgICAgICAgICAgIGxldCBwYXJ0cyA9IHdhbGwuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgbGV0IHggPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgICAgICBsZXQgeSA9IHBhcnNlSW50KHBhcnRzWzFdKTtcbiAgICAgICAgICAgIGxldCBkaXIgPSB0aGlzLl9nZXREaWdnaW5nRGlyZWN0aW9uKHgsIHkpO1xuICAgICAgICAgICAgaWYgKCFkaXIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gLyogdGhpcyB3YWxsIGlzIG5vdCBzdWl0YWJsZSAqL1xuICAgICAgICAgICAgLy9cdFx0Y29uc29sZS5sb2coXCJ3YWxsXCIsIHgsIHkpO1xuICAgICAgICAgICAgLyogdHJ5IGFkZGluZyBhIGZlYXR1cmUgKi9cbiAgICAgICAgICAgIGxldCBmZWF0dXJlQXR0ZW1wdHMgPSAwO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGZlYXR1cmVBdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90cnlGZWF0dXJlKHgsIHksIGRpclswXSwgZGlyWzFdKSkgeyAvKiBmZWF0dXJlIGFkZGVkICovXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoaXMuX3Jvb21zLmxlbmd0aCArIHRoaXMuX2NvcnJpZG9ycy5sZW5ndGggPT0gMikgeyB0aGlzLl9yb29tc1swXS5hZGREb29yKHgsIHkpOyB9IC8qIGZpcnN0IHJvb20gb2ZpY2lhbGx5IGhhcyBkb29ycyAqL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzKHgsIHkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVTdXJyb3VuZGluZ1dhbGxzKHggLSBkaXJbMF0sIHkgLSBkaXJbMV0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlIChmZWF0dXJlQXR0ZW1wdHMgPCB0aGlzLl9mZWF0dXJlQXR0ZW1wdHMpO1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgaW4gdGhpcy5fd2FsbHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2FsbHNbaWRdID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eVdhbGxzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLl9kdWcgLyBhcmVhIDwgdGhpcy5fb3B0aW9ucy5kdWdQZXJjZW50YWdlIHx8IHByaW9yaXR5V2FsbHMpOyAvKiBmaXhtZSBudW1iZXIgb2YgcHJpb3JpdHkgd2FsbHMgKi9cbiAgICAgICAgdGhpcy5fYWRkRG9vcnMoKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGksIGosIHRoaXMuX21hcFtpXVtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dhbGxzID0ge307XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX2RpZ0NhbGxiYWNrKHgsIHksIHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PSAwIHx8IHZhbHVlID09IDIpIHsgLyogZW1wdHkgKi9cbiAgICAgICAgICAgIHRoaXMuX21hcFt4XVt5XSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9kdWcrKztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLyogd2FsbCAqL1xuICAgICAgICAgICAgdGhpcy5fd2FsbHNbeCArIFwiLFwiICsgeV0gPSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9pc1dhbGxDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IHRoaXMuX3dpZHRoIHx8IHkgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLl9tYXBbeF1beV0gPT0gMSk7XG4gICAgfVxuICAgIF9jYW5CZUR1Z0NhbGxiYWNrKHgsIHkpIHtcbiAgICAgICAgaWYgKHggPCAxIHx8IHkgPCAxIHx8IHggKyAxID49IHRoaXMuX3dpZHRoIHx8IHkgKyAxID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fbWFwW3hdW3ldID09IDEpO1xuICAgIH1cbiAgICBfcHJpb3JpdHlXYWxsQ2FsbGJhY2soeCwgeSkgeyB0aGlzLl93YWxsc1t4ICsgXCIsXCIgKyB5XSA9IDI7IH1cbiAgICA7XG4gICAgX2ZpcnN0Um9vbSgpIHtcbiAgICAgICAgbGV0IGN4ID0gTWF0aC5mbG9vcih0aGlzLl93aWR0aCAvIDIpO1xuICAgICAgICBsZXQgY3kgPSBNYXRoLmZsb29yKHRoaXMuX2hlaWdodCAvIDIpO1xuICAgICAgICBsZXQgcm9vbSA9IFJvb20uY3JlYXRlUmFuZG9tQ2VudGVyKGN4LCBjeSwgdGhpcy5fb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3Jvb21zLnB1c2gocm9vbSk7XG4gICAgICAgIHJvb20uY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGEgc3VpdGFibGUgd2FsbFxuICAgICAqL1xuICAgIF9maW5kV2FsbCgpIHtcbiAgICAgICAgbGV0IHByaW8xID0gW107XG4gICAgICAgIGxldCBwcmlvMiA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLl93YWxscykge1xuICAgICAgICAgICAgbGV0IHByaW8gPSB0aGlzLl93YWxsc1tpZF07XG4gICAgICAgICAgICBpZiAocHJpbyA9PSAyKSB7XG4gICAgICAgICAgICAgICAgcHJpbzIucHVzaChpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmlvMS5wdXNoKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgYXJyID0gKHByaW8yLmxlbmd0aCA/IHByaW8yIDogcHJpbzEpO1xuICAgICAgICBpZiAoIWFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IC8qIG5vIHdhbGxzIDovICovXG4gICAgICAgIGxldCBpZCA9IFJORy5nZXRJdGVtKGFyci5zb3J0KCkpOyAvLyBzb3J0IHRvIG1ha2UgdGhlIG9yZGVyIGRldGVybWluaXN0aWNcbiAgICAgICAgZGVsZXRlIHRoaXMuX3dhbGxzW2lkXTtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmllcyBhZGRpbmcgYSBmZWF0dXJlXG4gICAgICogQHJldHVybnMge2Jvb2x9IHdhcyB0aGlzIGEgc3VjY2Vzc2Z1bCB0cnk/XG4gICAgICovXG4gICAgX3RyeUZlYXR1cmUoeCwgeSwgZHgsIGR5KSB7XG4gICAgICAgIGxldCBmZWF0dXJlTmFtZSA9IFJORy5nZXRXZWlnaHRlZFZhbHVlKHRoaXMuX2ZlYXR1cmVzKTtcbiAgICAgICAgbGV0IGN0b3IgPSBGRUFUVVJFU1tmZWF0dXJlTmFtZV07XG4gICAgICAgIGxldCBmZWF0dXJlID0gY3Rvci5jcmVhdGVSYW5kb21BdCh4LCB5LCBkeCwgZHksIHRoaXMuX29wdGlvbnMpO1xuICAgICAgICBpZiAoIWZlYXR1cmUuaXNWYWxpZCh0aGlzLl9pc1dhbGxDYWxsYmFjaywgdGhpcy5fY2FuQmVEdWdDYWxsYmFjaykpIHtcbiAgICAgICAgICAgIC8vXHRcdGNvbnNvbGUubG9nKFwibm90IHZhbGlkXCIpO1xuICAgICAgICAgICAgLy9cdFx0ZmVhdHVyZS5kZWJ1ZygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZlYXR1cmUuY3JlYXRlKHRoaXMuX2RpZ0NhbGxiYWNrKTtcbiAgICAgICAgLy9cdGZlYXR1cmUuZGVidWcoKTtcbiAgICAgICAgaWYgKGZlYXR1cmUgaW5zdGFuY2VvZiBSb29tKSB7XG4gICAgICAgICAgICB0aGlzLl9yb29tcy5wdXNoKGZlYXR1cmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmZWF0dXJlIGluc3RhbmNlb2YgQ29ycmlkb3IpIHtcbiAgICAgICAgICAgIGZlYXR1cmUuY3JlYXRlUHJpb3JpdHlXYWxscyh0aGlzLl9wcmlvcml0eVdhbGxDYWxsYmFjayk7XG4gICAgICAgICAgICB0aGlzLl9jb3JyaWRvcnMucHVzaChmZWF0dXJlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgX3JlbW92ZVN1cnJvdW5kaW5nV2FsbHMoY3gsIGN5KSB7XG4gICAgICAgIGxldCBkZWx0YXMgPSBESVJTWzRdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlbHRhcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGRlbHRhID0gZGVsdGFzW2ldO1xuICAgICAgICAgICAgbGV0IHggPSBjeCArIGRlbHRhWzBdO1xuICAgICAgICAgICAgbGV0IHkgPSBjeSArIGRlbHRhWzFdO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3dhbGxzW3ggKyBcIixcIiArIHldO1xuICAgICAgICAgICAgeCA9IGN4ICsgMiAqIGRlbHRhWzBdO1xuICAgICAgICAgICAgeSA9IGN5ICsgMiAqIGRlbHRhWzFdO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3dhbGxzW3ggKyBcIixcIiArIHldO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdmVjdG9yIGluIFwiZGlnZ2luZ1wiIGRpcmVjdGlvbiwgb3IgZmFsc2UsIGlmIHRoaXMgZG9lcyBub3QgZXhpc3QgKG9yIGlzIG5vdCB1bmlxdWUpXG4gICAgICovXG4gICAgX2dldERpZ2dpbmdEaXJlY3Rpb24oY3gsIGN5KSB7XG4gICAgICAgIGlmIChjeCA8PSAwIHx8IGN5IDw9IDAgfHwgY3ggPj0gdGhpcy5fd2lkdGggLSAxIHx8IGN5ID49IHRoaXMuX2hlaWdodCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBsZXQgZGVsdGFzID0gRElSU1s0XTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWx0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkZWx0YSA9IGRlbHRhc1tpXTtcbiAgICAgICAgICAgIGxldCB4ID0gY3ggKyBkZWx0YVswXTtcbiAgICAgICAgICAgIGxldCB5ID0gY3kgKyBkZWx0YVsxXTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fbWFwW3hdW3ldKSB7IC8qIHRoZXJlIGFscmVhZHkgaXMgYW5vdGhlciBlbXB0eSBuZWlnaGJvciEgKi9cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkZWx0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKiBubyBlbXB0eSBuZWlnaGJvciAqL1xuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFstcmVzdWx0WzBdLCAtcmVzdWx0WzFdXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZCBlbXB0eSBzcGFjZXMgc3Vycm91bmRpbmcgcm9vbXMsIGFuZCBhcHBseSBkb29ycy5cbiAgICAgKi9cbiAgICBfYWRkRG9vcnMoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fbWFwO1xuICAgICAgICBmdW5jdGlvbiBpc1dhbGxDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgICAgICByZXR1cm4gKGRhdGFbeF1beV0gPT0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Jvb21zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcm9vbSA9IHRoaXMuX3Jvb21zW2ldO1xuICAgICAgICAgICAgcm9vbS5jbGVhckRvb3JzKCk7XG4gICAgICAgICAgICByb29tLmFkZERvb3JzKGlzV2FsbENhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBNYXAgZnJvbSBcIi4vbWFwLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbi8qKlxuICogQGNsYXNzIFJlY3Vyc2l2ZWx5IGRpdmlkZWQgbWF6ZSwgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NYXplX2dlbmVyYXRpb25fYWxnb3JpdGhtI1JlY3Vyc2l2ZV9kaXZpc2lvbl9tZXRob2RcbiAqIEBhdWdtZW50cyBST1QuTWFwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpdmlkZWRNYXplIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fc3RhY2sgPSBbXTtcbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgfVxuICAgIGNyZWF0ZShjYWxsYmFjaykge1xuICAgICAgICBsZXQgdyA9IHRoaXMuX3dpZHRoO1xuICAgICAgICBsZXQgaCA9IHRoaXMuX2hlaWdodDtcbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGg7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSAoaSA9PSAwIHx8IGogPT0gMCB8fCBpICsgMSA9PSB3IHx8IGogKyAxID09IGgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcFtpXS5wdXNoKGJvcmRlciA/IDEgOiAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGFjayA9IFtcbiAgICAgICAgICAgIFsxLCAxLCB3IC0gMiwgaCAtIDJdXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3OyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgdGhpcy5fbWFwW2ldW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9wcm9jZXNzKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5fc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgcm9vbSA9IHRoaXMuX3N0YWNrLnNoaWZ0KCk7IC8qIFtsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b21dICovXG4gICAgICAgICAgICB0aGlzLl9wYXJ0aXRpb25Sb29tKHJvb20pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9wYXJ0aXRpb25Sb29tKHJvb20pIHtcbiAgICAgICAgbGV0IGF2YWlsWCA9IFtdO1xuICAgICAgICBsZXQgYXZhaWxZID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSByb29tWzBdICsgMTsgaSA8IHJvb21bMl07IGkrKykge1xuICAgICAgICAgICAgbGV0IHRvcCA9IHRoaXMuX21hcFtpXVtyb29tWzFdIC0gMV07XG4gICAgICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5fbWFwW2ldW3Jvb21bM10gKyAxXTtcbiAgICAgICAgICAgIGlmICh0b3AgJiYgYm90dG9tICYmICEoaSAlIDIpKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxYLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaiA9IHJvb21bMV0gKyAxOyBqIDwgcm9vbVszXTsgaisrKSB7XG4gICAgICAgICAgICBsZXQgbGVmdCA9IHRoaXMuX21hcFtyb29tWzBdIC0gMV1bal07XG4gICAgICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLl9tYXBbcm9vbVsyXSArIDFdW2pdO1xuICAgICAgICAgICAgaWYgKGxlZnQgJiYgcmlnaHQgJiYgIShqICUgMikpIHtcbiAgICAgICAgICAgICAgICBhdmFpbFkucHVzaChqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWF2YWlsWC5sZW5ndGggfHwgIWF2YWlsWS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgeCA9IFJORy5nZXRJdGVtKGF2YWlsWCk7XG4gICAgICAgIGxldCB5ID0gUk5HLmdldEl0ZW0oYXZhaWxZKTtcbiAgICAgICAgdGhpcy5fbWFwW3hdW3ldID0gMTtcbiAgICAgICAgbGV0IHdhbGxzID0gW107XG4gICAgICAgIGxldCB3ID0gW107XG4gICAgICAgIHdhbGxzLnB1c2godyk7IC8qIGxlZnQgcGFydCAqL1xuICAgICAgICBmb3IgKGxldCBpID0gcm9vbVswXTsgaSA8IHg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW2ldW3ldID0gMTtcbiAgICAgICAgICAgIGlmIChpICUgMilcbiAgICAgICAgICAgICAgICB3LnB1c2goW2ksIHldKTtcbiAgICAgICAgfVxuICAgICAgICB3ID0gW107XG4gICAgICAgIHdhbGxzLnB1c2godyk7IC8qIHJpZ2h0IHBhcnQgKi9cbiAgICAgICAgZm9yIChsZXQgaSA9IHggKyAxOyBpIDw9IHJvb21bMl07IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW2ldW3ldID0gMTtcbiAgICAgICAgICAgIGlmIChpICUgMilcbiAgICAgICAgICAgICAgICB3LnB1c2goW2ksIHldKTtcbiAgICAgICAgfVxuICAgICAgICB3ID0gW107XG4gICAgICAgIHdhbGxzLnB1c2godyk7IC8qIHRvcCBwYXJ0ICovXG4gICAgICAgIGZvciAobGV0IGogPSByb29tWzFdOyBqIDwgeTsgaisrKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXBbeF1bal0gPSAxO1xuICAgICAgICAgICAgaWYgKGogJSAyKVxuICAgICAgICAgICAgICAgIHcucHVzaChbeCwgal0pO1xuICAgICAgICB9XG4gICAgICAgIHcgPSBbXTtcbiAgICAgICAgd2FsbHMucHVzaCh3KTsgLyogYm90dG9tIHBhcnQgKi9cbiAgICAgICAgZm9yIChsZXQgaiA9IHkgKyAxOyBqIDw9IHJvb21bM107IGorKykge1xuICAgICAgICAgICAgdGhpcy5fbWFwW3hdW2pdID0gMTtcbiAgICAgICAgICAgIGlmIChqICUgMilcbiAgICAgICAgICAgICAgICB3LnB1c2goW3gsIGpdKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc29saWQgPSBSTkcuZ2V0SXRlbSh3YWxscyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2FsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB3ID0gd2FsbHNbaV07XG4gICAgICAgICAgICBpZiAodyA9PSBzb2xpZCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGhvbGUgPSBSTkcuZ2V0SXRlbSh3KTtcbiAgICAgICAgICAgIHRoaXMuX21hcFtob2xlWzBdXVtob2xlWzFdXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhY2sucHVzaChbcm9vbVswXSwgcm9vbVsxXSwgeCAtIDEsIHkgLSAxXSk7IC8qIGxlZnQgdG9wICovXG4gICAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3ggKyAxLCByb29tWzFdLCByb29tWzJdLCB5IC0gMV0pOyAvKiByaWdodCB0b3AgKi9cbiAgICAgICAgdGhpcy5fc3RhY2sucHVzaChbcm9vbVswXSwgeSArIDEsIHggLSAxLCByb29tWzNdXSk7IC8qIGxlZnQgYm90dG9tICovXG4gICAgICAgIHRoaXMuX3N0YWNrLnB1c2goW3ggKyAxLCB5ICsgMSwgcm9vbVsyXSwgcm9vbVszXV0pOyAvKiByaWdodCBib3R0b20gKi9cbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgRHVuZ2VvbiBtYXA6IGhhcyByb29tcyBhbmQgY29ycmlkb3JzXG4gKiBAYXVnbWVudHMgUk9ULk1hcFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEdW5nZW9uIGV4dGVuZHMgTWFwIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9yb29tcyA9IFtdO1xuICAgICAgICB0aGlzLl9jb3JyaWRvcnMgPSBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW5lcmF0ZWQgcm9vbXNcbiAgICAgKiBAcmV0dXJucyB7Uk9ULk1hcC5GZWF0dXJlLlJvb21bXX1cbiAgICAgKi9cbiAgICBnZXRSb29tcygpIHsgcmV0dXJuIHRoaXMuX3Jvb21zOyB9XG4gICAgLyoqXG4gICAgICogR2V0IGFsbCBnZW5lcmF0ZWQgY29ycmlkb3JzXG4gICAgICogQHJldHVybnMge1JPVC5NYXAuRmVhdHVyZS5Db3JyaWRvcltdfVxuICAgICAqL1xuICAgIGdldENvcnJpZG9ycygpIHsgcmV0dXJuIHRoaXMuX2NvcnJpZG9yczsgfVxufVxuIiwiaW1wb3J0IE1hcCBmcm9tIFwiLi9tYXAuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuLyoqXG4gKiBKb2luIGxpc3RzIHdpdGggXCJpXCIgYW5kIFwiaSsxXCJcbiAqL1xuZnVuY3Rpb24gYWRkVG9MaXN0KGksIEwsIFIpIHtcbiAgICBSW0xbaSArIDFdXSA9IFJbaV07XG4gICAgTFtSW2ldXSA9IExbaSArIDFdO1xuICAgIFJbaV0gPSBpICsgMTtcbiAgICBMW2kgKyAxXSA9IGk7XG59XG4vKipcbiAqIFJlbW92ZSBcImlcIiBmcm9tIGl0cyBsaXN0XG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUZyb21MaXN0KGksIEwsIFIpIHtcbiAgICBSW0xbaV1dID0gUltpXTtcbiAgICBMW1JbaV1dID0gTFtpXTtcbiAgICBSW2ldID0gaTtcbiAgICBMW2ldID0gaTtcbn1cbi8qKlxuICogTWF6ZSBnZW5lcmF0b3IgLSBFbGxlcidzIGFsZ29yaXRobVxuICogU2VlIGh0dHA6Ly9ob21lcGFnZXMuY3dpLm5sL350cm9tcC9tYXplLmh0bWwgZm9yIGV4cGxhbmF0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsbGVyTWF6ZSBleHRlbmRzIE1hcCB7XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBtYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgICBsZXQgdyA9IE1hdGguY2VpbCgodGhpcy5fd2lkdGggLSAyKSAvIDIpO1xuICAgICAgICBsZXQgcmFuZCA9IDkgLyAyNDtcbiAgICAgICAgbGV0IEwgPSBbXTtcbiAgICAgICAgbGV0IFIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3OyBpKyspIHtcbiAgICAgICAgICAgIEwucHVzaChpKTtcbiAgICAgICAgICAgIFIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBMLnB1c2godyAtIDEpOyAvKiBmYWtlIHN0b3AtYmxvY2sgYXQgdGhlIHJpZ2h0IHNpZGUgKi9cbiAgICAgICAgbGV0IGo7XG4gICAgICAgIGZvciAoaiA9IDE7IGogKyAzIDwgdGhpcy5faGVpZ2h0OyBqICs9IDIpIHtcbiAgICAgICAgICAgIC8qIG9uZSByb3cgKi9cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLyogY2VsbCBjb29yZHMgKHdpbGwgYmUgYWx3YXlzIGVtcHR5KSAqL1xuICAgICAgICAgICAgICAgIGxldCB4ID0gMiAqIGkgKyAxO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gajtcbiAgICAgICAgICAgICAgICBtYXBbeF1beV0gPSAwO1xuICAgICAgICAgICAgICAgIC8qIHJpZ2h0IGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgICAgICBpZiAoaSAhPSBMW2kgKyAxXSAmJiBSTkcuZ2V0VW5pZm9ybSgpID4gcmFuZCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRUb0xpc3QoaSwgTCwgUik7XG4gICAgICAgICAgICAgICAgICAgIG1hcFt4ICsgMV1beV0gPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKiBib3R0b20gY29ubmVjdGlvbiAqL1xuICAgICAgICAgICAgICAgIGlmIChpICE9IExbaV0gJiYgUk5HLmdldFVuaWZvcm0oKSA+IHJhbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgLyogcmVtb3ZlIGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRnJvbUxpc3QoaSwgTCwgUik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKiBjcmVhdGUgY29ubmVjdGlvbiAqL1xuICAgICAgICAgICAgICAgICAgICBtYXBbeF1beSArIDFdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyogbGFzdCByb3cgKi9cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3OyBpKyspIHtcbiAgICAgICAgICAgIC8qIGNlbGwgY29vcmRzICh3aWxsIGJlIGFsd2F5cyBlbXB0eSkgKi9cbiAgICAgICAgICAgIGxldCB4ID0gMiAqIGkgKyAxO1xuICAgICAgICAgICAgbGV0IHkgPSBqO1xuICAgICAgICAgICAgbWFwW3hdW3ldID0gMDtcbiAgICAgICAgICAgIC8qIHJpZ2h0IGNvbm5lY3Rpb24gKi9cbiAgICAgICAgICAgIGlmIChpICE9IExbaSArIDFdICYmIChpID09IExbaV0gfHwgUk5HLmdldFVuaWZvcm0oKSA+IHJhbmQpKSB7XG4gICAgICAgICAgICAgICAgLyogZGlnIHJpZ2h0IGFsc28gaWYgdGhlIGNlbGwgaXMgc2VwYXJhdGVkLCBzbyBpdCBnZXRzIGNvbm5lY3RlZCB0byB0aGUgcmVzdCBvZiBtYXplICovXG4gICAgICAgICAgICAgICAgYWRkVG9MaXN0KGksIEwsIFIpO1xuICAgICAgICAgICAgICAgIG1hcFt4ICsgMV1beV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVtb3ZlRnJvbUxpc3QoaSwgTCwgUik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuX2hlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaSwgaiwgbWFwW2ldW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbjtcbi8qKlxuICogQGNsYXNzIER1bmdlb24gZmVhdHVyZTsgaGFzIG93biAuY3JlYXRlKCkgbWV0aG9kXG4gKi9cbmNsYXNzIEZlYXR1cmUge1xufVxuLyoqXG4gKiBAY2xhc3MgUm9vbVxuICogQGF1Z21lbnRzIFJPVC5NYXAuRmVhdHVyZVxuICogQHBhcmFtIHtpbnR9IHgxXG4gKiBAcGFyYW0ge2ludH0geTFcbiAqIEBwYXJhbSB7aW50fSB4MlxuICogQHBhcmFtIHtpbnR9IHkyXG4gKiBAcGFyYW0ge2ludH0gW2Rvb3JYXVxuICogQHBhcmFtIHtpbnR9IFtkb29yWV1cbiAqL1xuZXhwb3J0IGNsYXNzIFJvb20gZXh0ZW5kcyBGZWF0dXJlIHtcbiAgICBjb25zdHJ1Y3Rvcih4MSwgeTEsIHgyLCB5MiwgZG9vclgsIGRvb3JZKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3gxID0geDE7XG4gICAgICAgIHRoaXMuX3kxID0geTE7XG4gICAgICAgIHRoaXMuX3gyID0geDI7XG4gICAgICAgIHRoaXMuX3kyID0geTI7XG4gICAgICAgIHRoaXMuX2Rvb3JzID0ge307XG4gICAgICAgIGlmIChkb29yWCAhPT0gdW5kZWZpbmVkICYmIGRvb3JZICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRG9vcihkb29yWCwgZG9vclkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIDtcbiAgICAvKipcbiAgICAgKiBSb29tIG9mIHJhbmRvbSBzaXplLCB3aXRoIGEgZ2l2ZW4gZG9vcnMgYW5kIGRpcmVjdGlvblxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVSYW5kb21BdCh4LCB5LCBkeCwgZHksIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG1pbiA9IG9wdGlvbnMucm9vbVdpZHRoWzBdO1xuICAgICAgICBsZXQgbWF4ID0gb3B0aW9ucy5yb29tV2lkdGhbMV07XG4gICAgICAgIGxldCB3aWR0aCA9IFJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgICAgbWluID0gb3B0aW9ucy5yb29tSGVpZ2h0WzBdO1xuICAgICAgICBtYXggPSBvcHRpb25zLnJvb21IZWlnaHRbMV07XG4gICAgICAgIGxldCBoZWlnaHQgPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIGlmIChkeCA9PSAxKSB7IC8qIHRvIHRoZSByaWdodCAqL1xuICAgICAgICAgICAgbGV0IHkyID0geSAtIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIGhlaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoeCArIDEsIHkyLCB4ICsgd2lkdGgsIHkyICsgaGVpZ2h0IC0gMSwgeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR4ID09IC0xKSB7IC8qIHRvIHRoZSBsZWZ0ICovXG4gICAgICAgICAgICBsZXQgeTIgPSB5IC0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogaGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcyh4IC0gd2lkdGgsIHkyLCB4IC0gMSwgeTIgKyBoZWlnaHQgLSAxLCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHkgPT0gMSkgeyAvKiB0byB0aGUgYm90dG9tICovXG4gICAgICAgICAgICBsZXQgeDIgPSB4IC0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogd2lkdGgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHgyLCB5ICsgMSwgeDIgKyB3aWR0aCAtIDEsIHkgKyBoZWlnaHQsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkeSA9PSAtMSkgeyAvKiB0byB0aGUgdG9wICovXG4gICAgICAgICAgICBsZXQgeDIgPSB4IC0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogd2lkdGgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHgyLCB5IC0gaGVpZ2h0LCB4MiArIHdpZHRoIC0gMSwgeSAtIDEsIHgsIHkpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImR4IG9yIGR5IG11c3QgYmUgMSBvciAtMVwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUm9vbSBvZiByYW5kb20gc2l6ZSwgcG9zaXRpb25lZCBhcm91bmQgY2VudGVyIGNvb3Jkc1xuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVSYW5kb21DZW50ZXIoY3gsIGN5LCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBtaW4gPSBvcHRpb25zLnJvb21XaWR0aFswXTtcbiAgICAgICAgbGV0IG1heCA9IG9wdGlvbnMucm9vbVdpZHRoWzFdO1xuICAgICAgICBsZXQgd2lkdGggPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIG1pbiA9IG9wdGlvbnMucm9vbUhlaWdodFswXTtcbiAgICAgICAgbWF4ID0gb3B0aW9ucy5yb29tSGVpZ2h0WzFdO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICBsZXQgeDEgPSBjeCAtIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIHdpZHRoKTtcbiAgICAgICAgbGV0IHkxID0gY3kgLSBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiBoZWlnaHQpO1xuICAgICAgICBsZXQgeDIgPSB4MSArIHdpZHRoIC0gMTtcbiAgICAgICAgbGV0IHkyID0geTEgKyBoZWlnaHQgLSAxO1xuICAgICAgICByZXR1cm4gbmV3IHRoaXMoeDEsIHkxLCB4MiwgeTIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSb29tIG9mIHJhbmRvbSBzaXplIHdpdGhpbiBhIGdpdmVuIGRpbWVuc2lvbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlUmFuZG9tKGF2YWlsV2lkdGgsIGF2YWlsSGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBtaW4gPSBvcHRpb25zLnJvb21XaWR0aFswXTtcbiAgICAgICAgbGV0IG1heCA9IG9wdGlvbnMucm9vbVdpZHRoWzFdO1xuICAgICAgICBsZXQgd2lkdGggPSBSTkcuZ2V0VW5pZm9ybUludChtaW4sIG1heCk7XG4gICAgICAgIG1pbiA9IG9wdGlvbnMucm9vbUhlaWdodFswXTtcbiAgICAgICAgbWF4ID0gb3B0aW9ucy5yb29tSGVpZ2h0WzFdO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gUk5HLmdldFVuaWZvcm1JbnQobWluLCBtYXgpO1xuICAgICAgICBsZXQgbGVmdCA9IGF2YWlsV2lkdGggLSB3aWR0aCAtIDE7XG4gICAgICAgIGxldCB0b3AgPSBhdmFpbEhlaWdodCAtIGhlaWdodCAtIDE7XG4gICAgICAgIGxldCB4MSA9IDEgKyBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiBsZWZ0KTtcbiAgICAgICAgbGV0IHkxID0gMSArIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIHRvcCk7XG4gICAgICAgIGxldCB4MiA9IHgxICsgd2lkdGggLSAxO1xuICAgICAgICBsZXQgeTIgPSB5MSArIGhlaWdodCAtIDE7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcyh4MSwgeTEsIHgyLCB5Mik7XG4gICAgfVxuICAgIGFkZERvb3IoeCwgeSkge1xuICAgICAgICB0aGlzLl9kb29yc1t4ICsgXCIsXCIgKyB5XSA9IDE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufVxuICAgICAqL1xuICAgIGdldERvb3JzKGNiKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9kb29ycykge1xuICAgICAgICAgICAgbGV0IHBhcnRzID0ga2V5LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIGNiKHBhcnNlSW50KHBhcnRzWzBdKSwgcGFyc2VJbnQocGFydHNbMV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2xlYXJEb29ycygpIHtcbiAgICAgICAgdGhpcy5fZG9vcnMgPSB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZERvb3JzKGlzV2FsbENhbGxiYWNrKSB7XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5feDEgLSAxO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLl94MiArIDE7XG4gICAgICAgIGxldCB0b3AgPSB0aGlzLl95MSAtIDE7XG4gICAgICAgIGxldCBib3R0b20gPSB0aGlzLl95MiArIDE7XG4gICAgICAgIGZvciAobGV0IHggPSBsZWZ0OyB4IDw9IHJpZ2h0OyB4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSB0b3A7IHkgPD0gYm90dG9tOyB5KyspIHtcbiAgICAgICAgICAgICAgICBpZiAoeCAhPSBsZWZ0ICYmIHggIT0gcmlnaHQgJiYgeSAhPSB0b3AgJiYgeSAhPSBib3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc1dhbGxDYWxsYmFjayh4LCB5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hZGREb29yKHgsIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkZWJ1ZygpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJyb29tXCIsIHRoaXMuX3gxLCB0aGlzLl95MSwgdGhpcy5feDIsIHRoaXMuX3kyKTtcbiAgICB9XG4gICAgaXNWYWxpZChpc1dhbGxDYWxsYmFjaywgY2FuQmVEdWdDYWxsYmFjaykge1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuX3gxIC0gMTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5feDIgKyAxO1xuICAgICAgICBsZXQgdG9wID0gdGhpcy5feTEgLSAxO1xuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5feTIgKyAxO1xuICAgICAgICBmb3IgKGxldCB4ID0gbGVmdDsgeCA8PSByaWdodDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gdG9wOyB5IDw9IGJvdHRvbTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHggPT0gbGVmdCB8fCB4ID09IHJpZ2h0IHx8IHkgPT0gdG9wIHx8IHkgPT0gYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNXYWxsQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5CZUR1Z0NhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGRpZ0NhbGxiYWNrIERpZyBjYWxsYmFjayB3aXRoIGEgc2lnbmF0dXJlICh4LCB5LCB2YWx1ZSkuIFZhbHVlczogMCA9IGVtcHR5LCAxID0gd2FsbCwgMiA9IGRvb3IuIE11bHRpcGxlIGRvb3JzIGFyZSBhbGxvd2VkLlxuICAgICAqL1xuICAgIGNyZWF0ZShkaWdDYWxsYmFjaykge1xuICAgICAgICBsZXQgbGVmdCA9IHRoaXMuX3gxIC0gMTtcbiAgICAgICAgbGV0IHJpZ2h0ID0gdGhpcy5feDIgKyAxO1xuICAgICAgICBsZXQgdG9wID0gdGhpcy5feTEgLSAxO1xuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5feTIgKyAxO1xuICAgICAgICBsZXQgdmFsdWUgPSAwO1xuICAgICAgICBmb3IgKGxldCB4ID0gbGVmdDsgeCA8PSByaWdodDsgeCsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gdG9wOyB5IDw9IGJvdHRvbTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHggKyBcIixcIiArIHkgaW4gdGhpcy5fZG9vcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh4ID09IGxlZnQgfHwgeCA9PSByaWdodCB8fCB5ID09IHRvcCB8fCB5ID09IGJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRpZ0NhbGxiYWNrKHgsIHksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRDZW50ZXIoKSB7XG4gICAgICAgIHJldHVybiBbTWF0aC5yb3VuZCgodGhpcy5feDEgKyB0aGlzLl94MikgLyAyKSwgTWF0aC5yb3VuZCgodGhpcy5feTEgKyB0aGlzLl95MikgLyAyKV07XG4gICAgfVxuICAgIGdldExlZnQoKSB7IHJldHVybiB0aGlzLl94MTsgfVxuICAgIGdldFJpZ2h0KCkgeyByZXR1cm4gdGhpcy5feDI7IH1cbiAgICBnZXRUb3AoKSB7IHJldHVybiB0aGlzLl95MTsgfVxuICAgIGdldEJvdHRvbSgpIHsgcmV0dXJuIHRoaXMuX3kyOyB9XG59XG4vKipcbiAqIEBjbGFzcyBDb3JyaWRvclxuICogQGF1Z21lbnRzIFJPVC5NYXAuRmVhdHVyZVxuICogQHBhcmFtIHtpbnR9IHN0YXJ0WFxuICogQHBhcmFtIHtpbnR9IHN0YXJ0WVxuICogQHBhcmFtIHtpbnR9IGVuZFhcbiAqIEBwYXJhbSB7aW50fSBlbmRZXG4gKi9cbmV4cG9ydCBjbGFzcyBDb3JyaWRvciBleHRlbmRzIEZlYXR1cmUge1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3N0YXJ0WCA9IHN0YXJ0WDtcbiAgICAgICAgdGhpcy5fc3RhcnRZID0gc3RhcnRZO1xuICAgICAgICB0aGlzLl9lbmRYID0gZW5kWDtcbiAgICAgICAgdGhpcy5fZW5kWSA9IGVuZFk7XG4gICAgICAgIHRoaXMuX2VuZHNXaXRoQVdhbGwgPSB0cnVlO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlUmFuZG9tQXQoeCwgeSwgZHgsIGR5LCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBtaW4gPSBvcHRpb25zLmNvcnJpZG9yTGVuZ3RoWzBdO1xuICAgICAgICBsZXQgbWF4ID0gb3B0aW9ucy5jb3JyaWRvckxlbmd0aFsxXTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IFJORy5nZXRVbmlmb3JtSW50KG1pbiwgbWF4KTtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzKHgsIHksIHggKyBkeCAqIGxlbmd0aCwgeSArIGR5ICogbGVuZ3RoKTtcbiAgICB9XG4gICAgZGVidWcoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29ycmlkb3JcIiwgdGhpcy5fc3RhcnRYLCB0aGlzLl9zdGFydFksIHRoaXMuX2VuZFgsIHRoaXMuX2VuZFkpO1xuICAgIH1cbiAgICBpc1ZhbGlkKGlzV2FsbENhbGxiYWNrLCBjYW5CZUR1Z0NhbGxiYWNrKSB7XG4gICAgICAgIGxldCBzeCA9IHRoaXMuX3N0YXJ0WDtcbiAgICAgICAgbGV0IHN5ID0gdGhpcy5fc3RhcnRZO1xuICAgICAgICBsZXQgZHggPSB0aGlzLl9lbmRYIC0gc3g7XG4gICAgICAgIGxldCBkeSA9IHRoaXMuX2VuZFkgLSBzeTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IDEgKyBNYXRoLm1heChNYXRoLmFicyhkeCksIE1hdGguYWJzKGR5KSk7XG4gICAgICAgIGlmIChkeCkge1xuICAgICAgICAgICAgZHggPSBkeCAvIE1hdGguYWJzKGR4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHkpIHtcbiAgICAgICAgICAgIGR5ID0gZHkgLyBNYXRoLmFicyhkeSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG54ID0gZHk7XG4gICAgICAgIGxldCBueSA9IC1keDtcbiAgICAgICAgbGV0IG9rID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSBzeCArIGkgKiBkeDtcbiAgICAgICAgICAgIGxldCB5ID0gc3kgKyBpICogZHk7XG4gICAgICAgICAgICBpZiAoIWNhbkJlRHVnQ2FsbGJhY2soeCwgeSkpIHtcbiAgICAgICAgICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc1dhbGxDYWxsYmFjayh4ICsgbngsIHkgKyBueSkpIHtcbiAgICAgICAgICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc1dhbGxDYWxsYmFjayh4IC0gbngsIHkgLSBueSkpIHtcbiAgICAgICAgICAgICAgICBvayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IGk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW5kWCA9IHggLSBkeDtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmRZID0geSAtIGR5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGUgbGVuZ3RoIGRlZ2VuZXJhdGVkLCB0aGlzIGNvcnJpZG9yIG1pZ2h0IGJlIGludmFsaWRcbiAgICAgICAgICovXG4gICAgICAgIC8qIG5vdCBzdXBwb3J0ZWQgKi9cbiAgICAgICAgaWYgKGxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyogbGVuZ3RoIDEgYWxsb3dlZCBvbmx5IGlmIHRoZSBuZXh0IHNwYWNlIGlzIGVtcHR5ICovXG4gICAgICAgIGlmIChsZW5ndGggPT0gMSAmJiBpc1dhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgZHgsIHRoaXMuX2VuZFkgKyBkeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV2UgZG8gbm90IHdhbnQgdGhlIGNvcnJpZG9yIHRvIGNyYXNoIGludG8gYSBjb3JuZXIgb2YgYSByb29tO1xuICAgICAgICAgKiBpZiBhbnkgb2YgdGhlIGVuZGluZyBjb3JuZXJzIGlzIGVtcHR5LCB0aGUgTisxdGggY2VsbCBvZiB0aGlzIGNvcnJpZG9yIG11c3QgYmUgZW1wdHkgdG9vLlxuICAgICAgICAgKlxuICAgICAgICAgKiBTaXR1YXRpb246XG4gICAgICAgICAqICMjIyMjIyMxXG4gICAgICAgICAqIC4uLi4uLi4/XG4gICAgICAgICAqICMjIyMjIyMyXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBjb3JyaWRvciB3YXMgZHVnIGZyb20gbGVmdCB0byByaWdodC5cbiAgICAgICAgICogMSwgMiAtIHByb2JsZW1hdGljIGNvcm5lcnMsID8gPSBOKzF0aCBjZWxsIChub3QgZHVnKVxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IGZpcnN0Q29ybmVyQmFkID0gIWlzV2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCArIG54LCB0aGlzLl9lbmRZICsgZHkgKyBueSk7XG4gICAgICAgIGxldCBzZWNvbmRDb3JuZXJCYWQgPSAhaXNXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4IC0gbngsIHRoaXMuX2VuZFkgKyBkeSAtIG55KTtcbiAgICAgICAgdGhpcy5fZW5kc1dpdGhBV2FsbCA9IGlzV2FsbENhbGxiYWNrKHRoaXMuX2VuZFggKyBkeCwgdGhpcy5fZW5kWSArIGR5KTtcbiAgICAgICAgaWYgKChmaXJzdENvcm5lckJhZCB8fCBzZWNvbmRDb3JuZXJCYWQpICYmIHRoaXMuX2VuZHNXaXRoQVdhbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZGlnQ2FsbGJhY2sgRGlnIGNhbGxiYWNrIHdpdGggYSBzaWduYXR1cmUgKHgsIHksIHZhbHVlKS4gVmFsdWVzOiAwID0gZW1wdHkuXG4gICAgICovXG4gICAgY3JlYXRlKGRpZ0NhbGxiYWNrKSB7XG4gICAgICAgIGxldCBzeCA9IHRoaXMuX3N0YXJ0WDtcbiAgICAgICAgbGV0IHN5ID0gdGhpcy5fc3RhcnRZO1xuICAgICAgICBsZXQgZHggPSB0aGlzLl9lbmRYIC0gc3g7XG4gICAgICAgIGxldCBkeSA9IHRoaXMuX2VuZFkgLSBzeTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IDEgKyBNYXRoLm1heChNYXRoLmFicyhkeCksIE1hdGguYWJzKGR5KSk7XG4gICAgICAgIGlmIChkeCkge1xuICAgICAgICAgICAgZHggPSBkeCAvIE1hdGguYWJzKGR4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHkpIHtcbiAgICAgICAgICAgIGR5ID0gZHkgLyBNYXRoLmFicyhkeSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSBzeCArIGkgKiBkeDtcbiAgICAgICAgICAgIGxldCB5ID0gc3kgKyBpICogZHk7XG4gICAgICAgICAgICBkaWdDYWxsYmFjayh4LCB5LCAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY3JlYXRlUHJpb3JpdHlXYWxscyhwcmlvcml0eVdhbGxDYWxsYmFjaykge1xuICAgICAgICBpZiAoIXRoaXMuX2VuZHNXaXRoQVdhbGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3ggPSB0aGlzLl9zdGFydFg7XG4gICAgICAgIGxldCBzeSA9IHRoaXMuX3N0YXJ0WTtcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5fZW5kWCAtIHN4O1xuICAgICAgICBsZXQgZHkgPSB0aGlzLl9lbmRZIC0gc3k7XG4gICAgICAgIGlmIChkeCkge1xuICAgICAgICAgICAgZHggPSBkeCAvIE1hdGguYWJzKGR4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHkpIHtcbiAgICAgICAgICAgIGR5ID0gZHkgLyBNYXRoLmFicyhkeSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG54ID0gZHk7XG4gICAgICAgIGxldCBueSA9IC1keDtcbiAgICAgICAgcHJpb3JpdHlXYWxsQ2FsbGJhY2sodGhpcy5fZW5kWCArIGR4LCB0aGlzLl9lbmRZICsgZHkpO1xuICAgICAgICBwcmlvcml0eVdhbGxDYWxsYmFjayh0aGlzLl9lbmRYICsgbngsIHRoaXMuX2VuZFkgKyBueSk7XG4gICAgICAgIHByaW9yaXR5V2FsbENhbGxiYWNrKHRoaXMuX2VuZFggLSBueCwgdGhpcy5fZW5kWSAtIG55KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcC5qc1wiO1xuaW1wb3J0IFJORyBmcm9tIFwiLi4vcm5nLmpzXCI7XG4vKipcbiAqIEljZXkncyBNYXplIGdlbmVyYXRvclxuICogU2VlIGh0dHA6Ly93d3cucm9ndWViYXNpbi5yb2d1ZWxpa2VkZXZlbG9wbWVudC5vcmcvaW5kZXgucGhwP3RpdGxlPVNpbXBsZV9tYXplIGZvciBleHBsYW5hdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJY2V5TWF6ZSBleHRlbmRzIE1hcCB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgcmVndWxhcml0eSA9IDApIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuX3JlZ3VsYXJpdHkgPSByZWd1bGFyaXR5O1xuICAgICAgICB0aGlzLl9tYXAgPSBbXTtcbiAgICB9XG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuX3dpZHRoO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0O1xuICAgICAgICBsZXQgbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgd2lkdGggLT0gKHdpZHRoICUgMiA/IDEgOiAyKTtcbiAgICAgICAgaGVpZ2h0IC09IChoZWlnaHQgJSAyID8gMSA6IDIpO1xuICAgICAgICBsZXQgY3ggPSAwO1xuICAgICAgICBsZXQgY3kgPSAwO1xuICAgICAgICBsZXQgbnggPSAwO1xuICAgICAgICBsZXQgbnkgPSAwO1xuICAgICAgICBsZXQgZG9uZSA9IDA7XG4gICAgICAgIGxldCBibG9ja2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBkaXJzID0gW1xuICAgICAgICAgICAgWzAsIDBdLFxuICAgICAgICAgICAgWzAsIDBdLFxuICAgICAgICAgICAgWzAsIDBdLFxuICAgICAgICAgICAgWzAsIDBdXG4gICAgICAgIF07XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGN4ID0gMSArIDIgKiBNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiAod2lkdGggLSAxKSAvIDIpO1xuICAgICAgICAgICAgY3kgPSAxICsgMiAqIE1hdGguZmxvb3IoUk5HLmdldFVuaWZvcm0oKSAqIChoZWlnaHQgLSAxKSAvIDIpO1xuICAgICAgICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgICAgICAgICAgbWFwW2N4XVtjeV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFtYXBbY3hdW2N5XSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JhbmRvbWl6ZShkaXJzKTtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKFJORy5nZXRVbmlmb3JtKCkgKiAodGhpcy5fcmVndWxhcml0eSArIDEpKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yYW5kb21pemUoZGlycyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYmxvY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBueCA9IGN4ICsgZGlyc1tpXVswXSAqIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBueSA9IGN5ICsgZGlyc1tpXVsxXSAqIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNGcmVlKG1hcCwgbngsIG55LCB3aWR0aCwgaGVpZ2h0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcFtueF1bbnldID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBbY3ggKyBkaXJzW2ldWzBdXVtjeSArIGRpcnNbaV1bMV1dID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeCA9IG54O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN5ID0gbnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKCFibG9ja2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoZG9uZSArIDEgPCB3aWR0aCAqIGhlaWdodCAvIDQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3dpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5faGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCBtYXBbaV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hcCA9IFtdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3JhbmRvbWl6ZShkaXJzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICBkaXJzW2ldWzBdID0gMDtcbiAgICAgICAgICAgIGRpcnNbaV1bMV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogNCkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBkaXJzWzBdWzBdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1sxXVswXSA9IDE7XG4gICAgICAgICAgICAgICAgZGlyc1syXVsxXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbM11bMV0gPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGRpcnNbM11bMF0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzJdWzBdID0gMTtcbiAgICAgICAgICAgICAgICBkaXJzWzFdWzFdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1swXVsxXSA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgZGlyc1syXVswXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbM11bMF0gPSAxO1xuICAgICAgICAgICAgICAgIGRpcnNbMF1bMV0gPSAtMTtcbiAgICAgICAgICAgICAgICBkaXJzWzFdWzFdID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBkaXJzWzFdWzBdID0gLTE7XG4gICAgICAgICAgICAgICAgZGlyc1swXVswXSA9IDE7XG4gICAgICAgICAgICAgICAgZGlyc1szXVsxXSA9IC0xO1xuICAgICAgICAgICAgICAgIGRpcnNbMl1bMV0gPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9pc0ZyZWUobWFwLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICh4IDwgMSB8fCB5IDwgMSB8fCB4ID49IHdpZHRoIHx8IHkgPj0gaGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcFt4XVt5XTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQXJlbmEgZnJvbSBcIi4vYXJlbmEuanNcIjtcbmltcG9ydCBVbmlmb3JtIGZyb20gXCIuL3VuaWZvcm0uanNcIjtcbmltcG9ydCBDZWxsdWxhciBmcm9tIFwiLi9jZWxsdWxhci5qc1wiO1xuaW1wb3J0IERpZ2dlciBmcm9tIFwiLi9kaWdnZXIuanNcIjtcbmltcG9ydCBFbGxlck1hemUgZnJvbSBcIi4vZWxsZXJtYXplLmpzXCI7XG5pbXBvcnQgRGl2aWRlZE1hemUgZnJvbSBcIi4vZGl2aWRlZG1hemUuanNcIjtcbmltcG9ydCBJY2V5TWF6ZSBmcm9tIFwiLi9pY2V5bWF6ZS5qc1wiO1xuaW1wb3J0IFJvZ3VlIGZyb20gXCIuL3JvZ3VlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCB7IEFyZW5hLCBVbmlmb3JtLCBDZWxsdWxhciwgRGlnZ2VyLCBFbGxlck1hemUsIERpdmlkZWRNYXplLCBJY2V5TWF6ZSwgUm9ndWUgfTtcbiIsImltcG9ydCB7IERFRkFVTFRfV0lEVEgsIERFRkFVTFRfSEVJR0hUIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwIHtcbiAgICAvKipcbiAgICAgKiBAY2xhc3MgQmFzZSBtYXAgZ2VuZXJhdG9yXG4gICAgICogQHBhcmFtIHtpbnR9IFt3aWR0aD1ST1QuREVGQVVMVF9XSURUSF1cbiAgICAgKiBAcGFyYW0ge2ludH0gW2hlaWdodD1ST1QuREVGQVVMVF9IRUlHSFRdXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGggPSBERUZBVUxUX1dJRFRILCBoZWlnaHQgPSBERUZBVUxUX0hFSUdIVCkge1xuICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuICAgIDtcbiAgICBfZmlsbE1hcCh2YWx1ZSkge1xuICAgICAgICBsZXQgbWFwID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fd2lkdGg7IGkrKykge1xuICAgICAgICAgICAgbWFwLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIG1hcFtpXS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cbn1cbiIsImltcG9ydCBNYXAgZnJvbSBcIi4vbWFwLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbmltcG9ydCB7IERJUlMgfSBmcm9tIFwiLi4vY29uc3RhbnRzLmpzXCI7XG4vKipcbiAqIER1bmdlb24gZ2VuZXJhdG9yIHdoaWNoIHVzZXMgdGhlIFwib3JnaW5hbFwiIFJvZ3VlIGR1bmdlb24gZ2VuZXJhdGlvbiBhbGdvcml0aG0uIFNlZSBodHRwOi8va3VvaS5jb20vfmthbWlrYXplL0dhbWVEZXNpZ24vYXJ0MDdfcm9ndWVfZHVuZ2Vvbi5waHBcbiAqIEBhdXRob3IgaHlha3VnZWlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9ndWUgZXh0ZW5kcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMubWFwID0gW107XG4gICAgICAgIHRoaXMucm9vbXMgPSBbXTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWRDZWxscyA9IFtdO1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBjZWxsV2lkdGg6IDMsXG4gICAgICAgICAgICBjZWxsSGVpZ2h0OiAzIC8vICAgICBpZS4gYXMgYW4gYXJyYXkgd2l0aCBtaW4tbWF4IHZhbHVlcyBmb3IgZWFjaCBkaXJlY3Rpb24uLi4uXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICAvKlxuICAgICAgICBTZXQgdGhlIHJvb20gc2l6ZXMgYWNjb3JkaW5nIHRvIHRoZSBvdmVyLWFsbCB3aWR0aCBvZiB0aGUgbWFwLFxuICAgICAgICBhbmQgdGhlIGNlbGwgc2l6ZXMuXG4gICAgICAgICovXG4gICAgICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShcInJvb21XaWR0aFwiKSkge1xuICAgICAgICAgICAgb3B0aW9uc1tcInJvb21XaWR0aFwiXSA9IHRoaXMuX2NhbGN1bGF0ZVJvb21TaXplKHRoaXMuX3dpZHRoLCBvcHRpb25zW1wiY2VsbFdpZHRoXCJdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJyb29tSGVpZ2h0XCIpKSB7XG4gICAgICAgICAgICBvcHRpb25zW1wicm9vbUhlaWdodFwiXSA9IHRoaXMuX2NhbGN1bGF0ZVJvb21TaXplKHRoaXMuX2hlaWdodCwgb3B0aW9uc1tcImNlbGxIZWlnaHRcIl0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICBjcmVhdGUoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgICB0aGlzLnJvb21zID0gW107XG4gICAgICAgIHRoaXMuY29ubmVjdGVkQ2VsbHMgPSBbXTtcbiAgICAgICAgdGhpcy5faW5pdFJvb21zKCk7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3RSb29tcygpO1xuICAgICAgICB0aGlzLl9jb25uZWN0VW5jb25uZWN0ZWRSb29tcygpO1xuICAgICAgICB0aGlzLl9jcmVhdGVSYW5kb21Sb29tQ29ubmVjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlUm9vbXMoKTtcbiAgICAgICAgdGhpcy5fY3JlYXRlQ29ycmlkb3JzKCk7XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLm1hcFtpXVtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfY2FsY3VsYXRlUm9vbVNpemUoc2l6ZSwgY2VsbCkge1xuICAgICAgICBsZXQgbWF4ID0gTWF0aC5mbG9vcigoc2l6ZSAvIGNlbGwpICogMC44KTtcbiAgICAgICAgbGV0IG1pbiA9IE1hdGguZmxvb3IoKHNpemUgLyBjZWxsKSAqIDAuMjUpO1xuICAgICAgICBpZiAobWluIDwgMikge1xuICAgICAgICAgICAgbWluID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF4IDwgMikge1xuICAgICAgICAgICAgbWF4ID0gMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW21pbiwgbWF4XTtcbiAgICB9XG4gICAgX2luaXRSb29tcygpIHtcbiAgICAgICAgLy8gY3JlYXRlIHJvb21zIGFycmF5LiBUaGlzIGlzIHRoZSBcImdyaWRcIiBsaXN0IGZyb20gdGhlIGFsZ28uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5yb29tcy5wdXNoKFtdKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb21zW2ldLnB1c2goeyBcInhcIjogMCwgXCJ5XCI6IDAsIFwid2lkdGhcIjogMCwgXCJoZWlnaHRcIjogMCwgXCJjb25uZWN0aW9uc1wiOiBbXSwgXCJjZWxseFwiOiBpLCBcImNlbGx5XCI6IGogfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2Nvbm5lY3RSb29tcygpIHtcbiAgICAgICAgLy9waWNrIHJhbmRvbSBzdGFydGluZyBncmlkXG4gICAgICAgIGxldCBjZ3ggPSBSTkcuZ2V0VW5pZm9ybUludCgwLCB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aCAtIDEpO1xuICAgICAgICBsZXQgY2d5ID0gUk5HLmdldFVuaWZvcm1JbnQoMCwgdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0IC0gMSk7XG4gICAgICAgIGxldCBpZHg7XG4gICAgICAgIGxldCBuY2d4O1xuICAgICAgICBsZXQgbmNneTtcbiAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgIGxldCByb29tO1xuICAgICAgICBsZXQgb3RoZXJSb29tO1xuICAgICAgICBsZXQgZGlyVG9DaGVjaztcbiAgICAgICAgLy8gZmluZCAgdW5jb25uZWN0ZWQgbmVpZ2hib3VyIGNlbGxzXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vZGlyVG9DaGVjayA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3XTtcbiAgICAgICAgICAgIGRpclRvQ2hlY2sgPSBbMCwgMiwgNCwgNl07XG4gICAgICAgICAgICBkaXJUb0NoZWNrID0gUk5HLnNodWZmbGUoZGlyVG9DaGVjayk7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZHggPSBkaXJUb0NoZWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgIG5jZ3ggPSBjZ3ggKyBESVJTWzhdW2lkeF1bMF07XG4gICAgICAgICAgICAgICAgbmNneSA9IGNneSArIERJUlNbOF1baWR4XVsxXTtcbiAgICAgICAgICAgICAgICBpZiAobmNneCA8IDAgfHwgbmNneCA+PSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5jZ3kgPCAwIHx8IG5jZ3kgPj0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByb29tID0gdGhpcy5yb29tc1tjZ3hdW2NneV07XG4gICAgICAgICAgICAgICAgaWYgKHJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFzIGxvbmcgYXMgdGhpcyByb29tIGRvZXNuJ3QgYWxyZWFkeSBjb29uZWN0IHRvIG1lLCB3ZSBhcmUgb2sgd2l0aCBpdC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvb21bXCJjb25uZWN0aW9uc1wiXVswXVswXSA9PSBuY2d4ICYmIHJvb21bXCJjb25uZWN0aW9uc1wiXVswXVsxXSA9PSBuY2d5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW25jZ3hdW25jZ3ldO1xuICAgICAgICAgICAgICAgIGlmIChvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXS5wdXNoKFtjZ3gsIGNneV0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RlZENlbGxzLnB1c2goW25jZ3gsIG5jZ3ldKTtcbiAgICAgICAgICAgICAgICAgICAgY2d4ID0gbmNneDtcbiAgICAgICAgICAgICAgICAgICAgY2d5ID0gbmNneTtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gd2hpbGUgKGRpclRvQ2hlY2subGVuZ3RoID4gMCAmJiBmb3VuZCA9PSBmYWxzZSk7XG4gICAgICAgIH0gd2hpbGUgKGRpclRvQ2hlY2subGVuZ3RoID4gMCk7XG4gICAgfVxuICAgIF9jb25uZWN0VW5jb25uZWN0ZWRSb29tcygpIHtcbiAgICAgICAgLy9XaGlsZSB0aGVyZSBhcmUgdW5jb25uZWN0ZWQgcm9vbXMsIHRyeSB0byBjb25uZWN0IHRoZW0gdG8gYSByYW5kb20gY29ubmVjdGVkIG5laWdoYm9yXG4gICAgICAgIC8vKGlmIGEgcm9vbSBoYXMgbm8gY29ubmVjdGVkIG5laWdoYm9ycyB5ZXQsIGp1c3Qga2VlcCBjeWNsaW5nLCB5b3UnbGwgZmlsbCBvdXQgdG8gaXQgZXZlbnR1YWxseSkuXG4gICAgICAgIGxldCBjdyA9IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoO1xuICAgICAgICBsZXQgY2ggPSB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkQ2VsbHMgPSBSTkcuc2h1ZmZsZSh0aGlzLmNvbm5lY3RlZENlbGxzKTtcbiAgICAgICAgbGV0IHJvb207XG4gICAgICAgIGxldCBvdGhlclJvb207XG4gICAgICAgIGxldCB2YWxpZFJvb207XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fb3B0aW9ucy5jZWxsV2lkdGg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIHJvb20gPSB0aGlzLnJvb21zW2ldW2pdO1xuICAgICAgICAgICAgICAgIGlmIChyb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpcmVjdGlvbnMgPSBbMCwgMiwgNCwgNl07XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbnMgPSBSTkcuc2h1ZmZsZShkaXJlY3Rpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRSb29tID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXJJZHggPSBkaXJlY3Rpb25zLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0kgPSBpICsgRElSU1s4XVtkaXJJZHhdWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0ogPSBqICsgRElSU1s4XVtkaXJJZHhdWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0kgPCAwIHx8IG5ld0kgPj0gY3cgfHwgbmV3SiA8IDAgfHwgbmV3SiA+PSBjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tuZXdJXVtuZXdKXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkUm9vbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgb3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJSb29tW1wiY29ubmVjdGlvbnNcIl1ba11bMF0gPT0gaSAmJiBvdGhlclJvb21bXCJjb25uZWN0aW9uc1wiXVtrXVsxXSA9PSBqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkUm9vbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRSb29tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKGRpcmVjdGlvbnMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkUm9vbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbVtcImNvbm5lY3Rpb25zXCJdLnB1c2goW290aGVyUm9vbVtcImNlbGx4XCJdLCBvdGhlclJvb21bXCJjZWxseVwiXV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCItLSBVbmFibGUgdG8gY29ubmVjdCByb29tLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY3JlYXRlUmFuZG9tUm9vbUNvbm5lY3Rpb25zKCkge1xuICAgICAgICAvLyBFbXB0eSBmb3Igbm93LlxuICAgIH1cbiAgICBfY3JlYXRlUm9vbXMoKSB7XG4gICAgICAgIGxldCB3ID0gdGhpcy5fd2lkdGg7XG4gICAgICAgIGxldCBoID0gdGhpcy5faGVpZ2h0O1xuICAgICAgICBsZXQgY3cgPSB0aGlzLl9vcHRpb25zLmNlbGxXaWR0aDtcbiAgICAgICAgbGV0IGNoID0gdGhpcy5fb3B0aW9ucy5jZWxsSGVpZ2h0O1xuICAgICAgICBsZXQgY3dwID0gTWF0aC5mbG9vcih0aGlzLl93aWR0aCAvIGN3KTtcbiAgICAgICAgbGV0IGNocCA9IE1hdGguZmxvb3IodGhpcy5faGVpZ2h0IC8gY2gpO1xuICAgICAgICBsZXQgcm9vbXc7XG4gICAgICAgIGxldCByb29taDtcbiAgICAgICAgbGV0IHJvb21XaWR0aCA9IHRoaXMuX29wdGlvbnNbXCJyb29tV2lkdGhcIl07XG4gICAgICAgIGxldCByb29tSGVpZ2h0ID0gdGhpcy5fb3B0aW9uc1tcInJvb21IZWlnaHRcIl07XG4gICAgICAgIGxldCBzeDtcbiAgICAgICAgbGV0IHN5O1xuICAgICAgICBsZXQgb3RoZXJSb29tO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN3OyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2g7IGorKykge1xuICAgICAgICAgICAgICAgIHN4ID0gY3dwICogaTtcbiAgICAgICAgICAgICAgICBzeSA9IGNocCAqIGo7XG4gICAgICAgICAgICAgICAgaWYgKHN4ID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3ggPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3kgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzeSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJvb213ID0gUk5HLmdldFVuaWZvcm1JbnQocm9vbVdpZHRoWzBdLCByb29tV2lkdGhbMV0pO1xuICAgICAgICAgICAgICAgIHJvb21oID0gUk5HLmdldFVuaWZvcm1JbnQocm9vbUhlaWdodFswXSwgcm9vbUhlaWdodFsxXSk7XG4gICAgICAgICAgICAgICAgaWYgKGogPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyUm9vbSA9IHRoaXMucm9vbXNbaV1baiAtIDFdO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoc3kgLSAob3RoZXJSb29tW1wieVwiXSArIG90aGVyUm9vbVtcImhlaWdodFwiXSkgPCAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzeSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBvdGhlclJvb20gPSB0aGlzLnJvb21zW2kgLSAxXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHN4IC0gKG90aGVyUm9vbVtcInhcIl0gKyBvdGhlclJvb21bXCJ3aWR0aFwiXSkgPCAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzeCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBzeE9mZnNldCA9IE1hdGgucm91bmQoUk5HLmdldFVuaWZvcm1JbnQoMCwgY3dwIC0gcm9vbXcpIC8gMik7XG4gICAgICAgICAgICAgICAgbGV0IHN5T2Zmc2V0ID0gTWF0aC5yb3VuZChSTkcuZ2V0VW5pZm9ybUludCgwLCBjaHAgLSByb29taCkgLyAyKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoc3ggKyBzeE9mZnNldCArIHJvb213ID49IHcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN4T2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzeE9mZnNldC0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbXctLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoc3kgKyBzeU9mZnNldCArIHJvb21oID49IGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN5T2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzeU9mZnNldC0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbWgtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzeCA9IHN4ICsgc3hPZmZzZXQ7XG4gICAgICAgICAgICAgICAgc3kgPSBzeSArIHN5T2Zmc2V0O1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbXNbaV1bal1bXCJ4XCJdID0gc3g7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXVtqXVtcInlcIl0gPSBzeTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb21zW2ldW2pdW1wid2lkdGhcIl0gPSByb29tdztcbiAgICAgICAgICAgICAgICB0aGlzLnJvb21zW2ldW2pdW1wiaGVpZ2h0XCJdID0gcm9vbWg7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWkgPSBzeDsgaWkgPCBzeCArIHJvb213OyBpaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGpqID0gc3k7IGpqIDwgc3kgKyByb29taDsgamorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBbaWldW2pqXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldFdhbGxQb3NpdGlvbihhUm9vbSwgYURpcmVjdGlvbikge1xuICAgICAgICBsZXQgcng7XG4gICAgICAgIGxldCByeTtcbiAgICAgICAgbGV0IGRvb3I7XG4gICAgICAgIGlmIChhRGlyZWN0aW9uID09IDEgfHwgYURpcmVjdGlvbiA9PSAzKSB7XG4gICAgICAgICAgICByeCA9IFJORy5nZXRVbmlmb3JtSW50KGFSb29tW1wieFwiXSArIDEsIGFSb29tW1wieFwiXSArIGFSb29tW1wid2lkdGhcIl0gLSAyKTtcbiAgICAgICAgICAgIGlmIChhRGlyZWN0aW9uID09IDEpIHtcbiAgICAgICAgICAgICAgICByeSA9IGFSb29tW1wieVwiXSAtIDI7XG4gICAgICAgICAgICAgICAgZG9vciA9IHJ5ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJ5ID0gYVJvb21bXCJ5XCJdICsgYVJvb21bXCJoZWlnaHRcIl0gKyAxO1xuICAgICAgICAgICAgICAgIGRvb3IgPSByeSAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1hcFtyeF1bZG9vcl0gPSAwOyAvLyBpJ20gbm90IHNldHRpbmcgYSBzcGVjaWZpYyAnZG9vcicgdGlsZSB2YWx1ZSByaWdodCBub3csIGp1c3QgZW1wdHkgc3BhY2UuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByeSA9IFJORy5nZXRVbmlmb3JtSW50KGFSb29tW1wieVwiXSArIDEsIGFSb29tW1wieVwiXSArIGFSb29tW1wiaGVpZ2h0XCJdIC0gMik7XG4gICAgICAgICAgICBpZiAoYURpcmVjdGlvbiA9PSAyKSB7XG4gICAgICAgICAgICAgICAgcnggPSBhUm9vbVtcInhcIl0gKyBhUm9vbVtcIndpZHRoXCJdICsgMTtcbiAgICAgICAgICAgICAgICBkb29yID0gcnggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcnggPSBhUm9vbVtcInhcIl0gLSAyO1xuICAgICAgICAgICAgICAgIGRvb3IgPSByeCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1hcFtkb29yXVtyeV0gPSAwOyAvLyBpJ20gbm90IHNldHRpbmcgYSBzcGVjaWZpYyAnZG9vcicgdGlsZSB2YWx1ZSByaWdodCBub3csIGp1c3QgZW1wdHkgc3BhY2UuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyeCwgcnldO1xuICAgIH1cbiAgICBfZHJhd0NvcnJpZG9yKHN0YXJ0UG9zaXRpb24sIGVuZFBvc2l0aW9uKSB7XG4gICAgICAgIGxldCB4T2Zmc2V0ID0gZW5kUG9zaXRpb25bMF0gLSBzdGFydFBvc2l0aW9uWzBdO1xuICAgICAgICBsZXQgeU9mZnNldCA9IGVuZFBvc2l0aW9uWzFdIC0gc3RhcnRQb3NpdGlvblsxXTtcbiAgICAgICAgbGV0IHhwb3MgPSBzdGFydFBvc2l0aW9uWzBdO1xuICAgICAgICBsZXQgeXBvcyA9IHN0YXJ0UG9zaXRpb25bMV07XG4gICAgICAgIGxldCB0ZW1wRGlzdDtcbiAgICAgICAgbGV0IHhEaXI7XG4gICAgICAgIGxldCB5RGlyO1xuICAgICAgICBsZXQgbW92ZTsgLy8gMiBlbGVtZW50IGFycmF5LCBlbGVtZW50IDAgaXMgdGhlIGRpcmVjdGlvbiwgZWxlbWVudCAxIGlzIHRoZSB0b3RhbCB2YWx1ZSB0byBtb3ZlLlxuICAgICAgICBsZXQgbW92ZXMgPSBbXTsgLy8gYSBsaXN0IG9mIDIgZWxlbWVudCBhcnJheXNcbiAgICAgICAgbGV0IHhBYnMgPSBNYXRoLmFicyh4T2Zmc2V0KTtcbiAgICAgICAgbGV0IHlBYnMgPSBNYXRoLmFicyh5T2Zmc2V0KTtcbiAgICAgICAgbGV0IHBlcmNlbnQgPSBSTkcuZ2V0VW5pZm9ybSgpOyAvLyB1c2VkIHRvIHNwbGl0IHRoZSBtb3ZlIGF0IGRpZmZlcmVudCBwbGFjZXMgYWxvbmcgdGhlIGxvbmcgYXhpc1xuICAgICAgICBsZXQgZmlyc3RIYWxmID0gcGVyY2VudDtcbiAgICAgICAgbGV0IHNlY29uZEhhbGYgPSAxIC0gcGVyY2VudDtcbiAgICAgICAgeERpciA9IHhPZmZzZXQgPiAwID8gMiA6IDY7XG4gICAgICAgIHlEaXIgPSB5T2Zmc2V0ID4gMCA/IDQgOiAwO1xuICAgICAgICBpZiAoeEFicyA8IHlBYnMpIHtcbiAgICAgICAgICAgIC8vIG1vdmUgZmlyc3RIYWxmIG9mIHRoZSB5IG9mZnNldFxuICAgICAgICAgICAgdGVtcERpc3QgPSBNYXRoLmNlaWwoeUFicyAqIGZpcnN0SGFsZik7XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt5RGlyLCB0ZW1wRGlzdF0pO1xuICAgICAgICAgICAgLy8gbW92ZSBhbGwgdGhlIHggb2Zmc2V0XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt4RGlyLCB4QWJzXSk7XG4gICAgICAgICAgICAvLyBtb3ZlIHNlbmRIYWxmIG9mIHRoZSAgeSBvZmZzZXRcbiAgICAgICAgICAgIHRlbXBEaXN0ID0gTWF0aC5mbG9vcih5QWJzICogc2Vjb25kSGFsZik7XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt5RGlyLCB0ZW1wRGlzdF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gIG1vdmUgZmlyc3RIYWxmIG9mIHRoZSB4IG9mZnNldFxuICAgICAgICAgICAgdGVtcERpc3QgPSBNYXRoLmNlaWwoeEFicyAqIGZpcnN0SGFsZik7XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt4RGlyLCB0ZW1wRGlzdF0pO1xuICAgICAgICAgICAgLy8gbW92ZSBhbGwgdGhlIHkgb2Zmc2V0XG4gICAgICAgICAgICBtb3Zlcy5wdXNoKFt5RGlyLCB5QWJzXSk7XG4gICAgICAgICAgICAvLyBtb3ZlIHNlY29uZEhhbGYgb2YgdGhlIHggb2Zmc2V0LlxuICAgICAgICAgICAgdGVtcERpc3QgPSBNYXRoLmZsb29yKHhBYnMgKiBzZWNvbmRIYWxmKTtcbiAgICAgICAgICAgIG1vdmVzLnB1c2goW3hEaXIsIHRlbXBEaXN0XSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXBbeHBvc11beXBvc10gPSAwO1xuICAgICAgICB3aGlsZSAobW92ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbW92ZSA9IG1vdmVzLnBvcCgpO1xuICAgICAgICAgICAgd2hpbGUgKG1vdmVbMV0gPiAwKSB7XG4gICAgICAgICAgICAgICAgeHBvcyArPSBESVJTWzhdW21vdmVbMF1dWzBdO1xuICAgICAgICAgICAgICAgIHlwb3MgKz0gRElSU1s4XVttb3ZlWzBdXVsxXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFt4cG9zXVt5cG9zXSA9IDA7XG4gICAgICAgICAgICAgICAgbW92ZVsxXSA9IG1vdmVbMV0gLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9jcmVhdGVDb3JyaWRvcnMoKSB7XG4gICAgICAgIC8vIERyYXcgQ29ycmlkb3JzIGJldHdlZW4gY29ubmVjdGVkIHJvb21zXG4gICAgICAgIGxldCBjdyA9IHRoaXMuX29wdGlvbnMuY2VsbFdpZHRoO1xuICAgICAgICBsZXQgY2ggPSB0aGlzLl9vcHRpb25zLmNlbGxIZWlnaHQ7XG4gICAgICAgIGxldCByb29tO1xuICAgICAgICBsZXQgY29ubmVjdGlvbjtcbiAgICAgICAgbGV0IG90aGVyUm9vbTtcbiAgICAgICAgbGV0IHdhbGw7XG4gICAgICAgIGxldCBvdGhlcldhbGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3c7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaDsgaisrKSB7XG4gICAgICAgICAgICAgICAgcm9vbSA9IHRoaXMucm9vbXNbaV1bal07XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByb29tW1wiY29ubmVjdGlvbnNcIl0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbiA9IHJvb21bXCJjb25uZWN0aW9uc1wiXVtrXTtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJSb29tID0gdGhpcy5yb29tc1tjb25uZWN0aW9uWzBdXVtjb25uZWN0aW9uWzFdXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmlndXJlIG91dCB3aGF0IHdhbGwgb3VyIGNvcnJpZG9yIHdpbGwgc3RhcnQgb25lLlxuICAgICAgICAgICAgICAgICAgICAvLyBmaWd1cmUgb3V0IHdoYXQgd2FsbCBvdXIgY29ycmlkb3Igd2lsbCBlbmQgb24uXG4gICAgICAgICAgICAgICAgICAgIGlmIChvdGhlclJvb21bXCJjZWxseFwiXSA+IHJvb21bXCJjZWxseFwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FsbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcldhbGwgPSA0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG90aGVyUm9vbVtcImNlbGx4XCJdIDwgcm9vbVtcImNlbGx4XCJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyV2FsbCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3RoZXJSb29tW1wiY2VsbHlcIl0gPiByb29tW1wiY2VsbHlcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGwgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJXYWxsID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGwgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJXYWxsID0gMztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcmF3Q29ycmlkb3IodGhpcy5fZ2V0V2FsbFBvc2l0aW9uKHJvb20sIHdhbGwpLCB0aGlzLl9nZXRXYWxsUG9zaXRpb24ob3RoZXJSb29tLCBvdGhlcldhbGwpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgRHVuZ2VvbiBmcm9tIFwiLi9kdW5nZW9uLmpzXCI7XG5pbXBvcnQgeyBSb29tLCBDb3JyaWRvciB9IGZyb20gXCIuL2ZlYXR1cmVzLmpzXCI7XG5pbXBvcnQgUk5HIGZyb20gXCIuLi9ybmcuanNcIjtcbjtcbi8qKlxuICogQGNsYXNzIER1bmdlb24gZ2VuZXJhdG9yIHdoaWNoIHRyaWVzIHRvIGZpbGwgdGhlIHNwYWNlIGV2ZW5seS4gR2VuZXJhdGVzIGluZGVwZW5kZW50IHJvb21zIGFuZCB0cmllcyB0byBjb25uZWN0IHRoZW0uXG4gKiBAYXVnbWVudHMgUk9ULk1hcC5EdW5nZW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuaWZvcm0gZXh0ZW5kcyBEdW5nZW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgICAgICAgcm9vbVdpZHRoOiBbMywgOV0sXG4gICAgICAgICAgICByb29tSGVpZ2h0OiBbMywgNV0sXG4gICAgICAgICAgICByb29tRHVnUGVyY2VudGFnZTogMC4xLFxuICAgICAgICAgICAgdGltZUxpbWl0OiAxMDAwIC8qIHdlIHN0b3AgYWZ0ZXIgdGhpcyBtdWNoIHRpbWUgaGFzIHBhc3NlZCAobXNlYykgKi9cbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fbWFwID0gW107XG4gICAgICAgIHRoaXMuX2R1ZyA9IDA7XG4gICAgICAgIHRoaXMuX3Jvb21BdHRlbXB0cyA9IDIwOyAvKiBuZXcgcm9vbSBpcyBjcmVhdGVkIE4tdGltZXMgdW50aWwgaXMgY29uc2lkZXJlZCBhcyBpbXBvc3NpYmxlIHRvIGdlbmVyYXRlICovXG4gICAgICAgIHRoaXMuX2NvcnJpZG9yQXR0ZW1wdHMgPSAyMDsgLyogY29ycmlkb3JzIGFyZSB0cmllZCBOLXRpbWVzIHVudGlsIHRoZSBsZXZlbCBpcyBjb25zaWRlcmVkIGFzIGltcG9zc2libGUgdG8gY29ubmVjdCAqL1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBbXTsgLyogbGlzdCBvZiBhbHJlYWR5IGNvbm5lY3RlZCByb29tcyAqL1xuICAgICAgICB0aGlzLl91bmNvbm5lY3RlZCA9IFtdOyAvKiBsaXN0IG9mIHJlbWFpbmluZyB1bmNvbm5lY3RlZCByb29tcyAqL1xuICAgICAgICB0aGlzLl9kaWdDYWxsYmFjayA9IHRoaXMuX2RpZ0NhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2NhbkJlRHVnQ2FsbGJhY2sgPSB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2lzV2FsbENhbGxiYWNrID0gdGhpcy5faXNXYWxsQ2FsbGJhY2suYmluZCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbWFwLiBJZiB0aGUgdGltZSBsaW1pdCBoYXMgYmVlbiBoaXQsIHJldHVybnMgbnVsbC5cbiAgICAgKiBAc2VlIFJPVC5NYXAjY3JlYXRlXG4gICAgICovXG4gICAgY3JlYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCB0MSA9IERhdGUubm93KCk7XG4gICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICBsZXQgdDIgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKHQyIC0gdDEgPiB0aGlzLl9vcHRpb25zLnRpbWVMaW1pdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSAvKiB0aW1lIGxpbWl0ISAqL1xuICAgICAgICAgICAgdGhpcy5fbWFwID0gdGhpcy5fZmlsbE1hcCgxKTtcbiAgICAgICAgICAgIHRoaXMuX2R1ZyA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yb29tcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlUm9vbXMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yb29tcy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fZ2VuZXJhdGVDb3JyaWRvcnMoKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl93aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLl9oZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhpLCBqLCB0aGlzLl9tYXBbaV1bal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgc3VpdGFibGUgYW1vdW50IG9mIHJvb21zXG4gICAgICovXG4gICAgX2dlbmVyYXRlUm9vbXMoKSB7XG4gICAgICAgIGxldCB3ID0gdGhpcy5fd2lkdGggLSAyO1xuICAgICAgICBsZXQgaCA9IHRoaXMuX2hlaWdodCAtIDI7XG4gICAgICAgIGxldCByb29tO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICByb29tID0gdGhpcy5fZ2VuZXJhdGVSb29tKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fZHVnIC8gKHcgKiBoKSA+IHRoaXMuX29wdGlvbnMucm9vbUR1Z1BlcmNlbnRhZ2UpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gLyogYWNoaWV2ZWQgcmVxdWVzdGVkIGFtb3VudCBvZiBmcmVlIHNwYWNlICovXG4gICAgICAgIH0gd2hpbGUgKHJvb20pO1xuICAgICAgICAvKiBlaXRoZXIgZW5vdWdoIHJvb21zLCBvciBub3QgYWJsZSB0byBnZW5lcmF0ZSBtb3JlIG9mIHRoZW0gOikgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJ5IHRvIGdlbmVyYXRlIG9uZSByb29tXG4gICAgICovXG4gICAgX2dlbmVyYXRlUm9vbSgpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgd2hpbGUgKGNvdW50IDwgdGhpcy5fcm9vbUF0dGVtcHRzKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgbGV0IHJvb20gPSBSb29tLmNyZWF0ZVJhbmRvbSh0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0LCB0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgICAgIGlmICghcm9vbS5pc1ZhbGlkKHRoaXMuX2lzV2FsbENhbGxiYWNrLCB0aGlzLl9jYW5CZUR1Z0NhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm9vbS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuICAgICAgICAgICAgdGhpcy5fcm9vbXMucHVzaChyb29tKTtcbiAgICAgICAgICAgIHJldHVybiByb29tO1xuICAgICAgICB9XG4gICAgICAgIC8qIG5vIHJvb20gd2FzIGdlbmVyYXRlZCBpbiBhIGdpdmVuIG51bWJlciBvZiBhdHRlbXB0cyAqL1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGNvbm5lY3RvcnMgYmV3ZWVuIHJvb21zXG4gICAgICogQHJldHVybnMge2Jvb2x9IHN1Y2Nlc3MgV2FzIHRoaXMgYXR0ZW1wdCBzdWNjZXNzZnVsbD9cbiAgICAgKi9cbiAgICBfZ2VuZXJhdGVDb3JyaWRvcnMoKSB7XG4gICAgICAgIGxldCBjbnQgPSAwO1xuICAgICAgICB3aGlsZSAoY250IDwgdGhpcy5fY29ycmlkb3JBdHRlbXB0cykge1xuICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICB0aGlzLl9jb3JyaWRvcnMgPSBbXTtcbiAgICAgICAgICAgIC8qIGRpZyByb29tcyBpbnRvIGEgY2xlYXIgbWFwICovXG4gICAgICAgICAgICB0aGlzLl9tYXAgPSB0aGlzLl9maWxsTWFwKDEpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9yb29tcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCByb29tID0gdGhpcy5fcm9vbXNbaV07XG4gICAgICAgICAgICAgICAgcm9vbS5jbGVhckRvb3JzKCk7XG4gICAgICAgICAgICAgICAgcm9vbS5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdW5jb25uZWN0ZWQgPSBSTkcuc2h1ZmZsZSh0aGlzLl9yb29tcy5zbGljZSgpKTtcbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IFtdO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3VuY29ubmVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3RlZC5wdXNoKHRoaXMuX3VuY29ubmVjdGVkLnBvcCgpKTtcbiAgICAgICAgICAgIH0gLyogZmlyc3Qgb25lIGlzIGFsd2F5cyBjb25uZWN0ZWQgKi9cbiAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgLyogMS4gcGljayByYW5kb20gY29ubmVjdGVkIHJvb20gKi9cbiAgICAgICAgICAgICAgICBsZXQgY29ubmVjdGVkID0gUk5HLmdldEl0ZW0odGhpcy5fY29ubmVjdGVkKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogMi4gZmluZCBjbG9zZXN0IHVuY29ubmVjdGVkICovXG4gICAgICAgICAgICAgICAgbGV0IHJvb20xID0gdGhpcy5fY2xvc2VzdFJvb20odGhpcy5fdW5jb25uZWN0ZWQsIGNvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyb29tMSkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogMy4gY29ubmVjdCBpdCB0byBjbG9zZXN0IGNvbm5lY3RlZCAqL1xuICAgICAgICAgICAgICAgIGxldCByb29tMiA9IHRoaXMuX2Nsb3Nlc3RSb29tKHRoaXMuX2Nvbm5lY3RlZCwgcm9vbTEpO1xuICAgICAgICAgICAgICAgIGlmICghcm9vbTIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBvayA9IHRoaXMuX2Nvbm5lY3RSb29tcyhyb29tMSwgcm9vbTIpO1xuICAgICAgICAgICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSAvKiBzdG9wIGNvbm5lY3RpbmcsIHJlLXNodWZmbGUgKi9cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX3VuY29ubmVjdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IC8qIGRvbmU7IG5vIHJvb21zIHJlbWFpbiAqL1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgO1xuICAgIC8qKlxuICAgICAqIEZvciBhIGdpdmVuIHJvb20sIGZpbmQgdGhlIGNsb3Nlc3Qgb25lIGZyb20gdGhlIGxpc3RcbiAgICAgKi9cbiAgICBfY2xvc2VzdFJvb20ocm9vbXMsIHJvb20pIHtcbiAgICAgICAgbGV0IGRpc3QgPSBJbmZpbml0eTtcbiAgICAgICAgbGV0IGNlbnRlciA9IHJvb20uZ2V0Q2VudGVyKCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvb21zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgciA9IHJvb21zW2ldO1xuICAgICAgICAgICAgbGV0IGMgPSByLmdldENlbnRlcigpO1xuICAgICAgICAgICAgbGV0IGR4ID0gY1swXSAtIGNlbnRlclswXTtcbiAgICAgICAgICAgIGxldCBkeSA9IGNbMV0gLSBjZW50ZXJbMV07XG4gICAgICAgICAgICBsZXQgZCA9IGR4ICogZHggKyBkeSAqIGR5O1xuICAgICAgICAgICAgaWYgKGQgPCBkaXN0KSB7XG4gICAgICAgICAgICAgICAgZGlzdCA9IGQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBfY29ubmVjdFJvb21zKHJvb20xLCByb29tMikge1xuICAgICAgICAvKlxuICAgICAgICAgICAgcm9vbTEuZGVidWcoKTtcbiAgICAgICAgICAgIHJvb20yLmRlYnVnKCk7XG4gICAgICAgICovXG4gICAgICAgIGxldCBjZW50ZXIxID0gcm9vbTEuZ2V0Q2VudGVyKCk7XG4gICAgICAgIGxldCBjZW50ZXIyID0gcm9vbTIuZ2V0Q2VudGVyKCk7XG4gICAgICAgIGxldCBkaWZmWCA9IGNlbnRlcjJbMF0gLSBjZW50ZXIxWzBdO1xuICAgICAgICBsZXQgZGlmZlkgPSBjZW50ZXIyWzFdIC0gY2VudGVyMVsxXTtcbiAgICAgICAgbGV0IHN0YXJ0O1xuICAgICAgICBsZXQgZW5kO1xuICAgICAgICBsZXQgZGlySW5kZXgxLCBkaXJJbmRleDIsIG1pbiwgbWF4LCBpbmRleDtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpZmZYKSA8IE1hdGguYWJzKGRpZmZZKSkgeyAvKiBmaXJzdCB0cnkgY29ubmVjdGluZyBub3J0aC1zb3V0aCB3YWxscyAqL1xuICAgICAgICAgICAgZGlySW5kZXgxID0gKGRpZmZZID4gMCA/IDIgOiAwKTtcbiAgICAgICAgICAgIGRpckluZGV4MiA9IChkaXJJbmRleDEgKyAyKSAlIDQ7XG4gICAgICAgICAgICBtaW4gPSByb29tMi5nZXRMZWZ0KCk7XG4gICAgICAgICAgICBtYXggPSByb29tMi5nZXRSaWdodCgpO1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgeyAvKiBmaXJzdCB0cnkgY29ubmVjdGluZyBlYXN0LXdlc3Qgd2FsbHMgKi9cbiAgICAgICAgICAgIGRpckluZGV4MSA9IChkaWZmWCA+IDAgPyAxIDogMyk7XG4gICAgICAgICAgICBkaXJJbmRleDIgPSAoZGlySW5kZXgxICsgMikgJSA0O1xuICAgICAgICAgICAgbWluID0gcm9vbTIuZ2V0VG9wKCk7XG4gICAgICAgICAgICBtYXggPSByb29tMi5nZXRCb3R0b20oKTtcbiAgICAgICAgICAgIGluZGV4ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBzdGFydCA9IHRoaXMuX3BsYWNlSW5XYWxsKHJvb20xLCBkaXJJbmRleDEpOyAvKiBjb3JyaWRvciB3aWxsIHN0YXJ0IGhlcmUgKi9cbiAgICAgICAgaWYgKCFzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydFtpbmRleF0gPj0gbWluICYmIHN0YXJ0W2luZGV4XSA8PSBtYXgpIHsgLyogcG9zc2libGUgdG8gY29ubmVjdCB3aXRoIHN0cmFpZ2h0IGxpbmUgKEktbGlrZSkgKi9cbiAgICAgICAgICAgIGVuZCA9IHN0YXJ0LnNsaWNlKCk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSAwO1xuICAgICAgICAgICAgc3dpdGNoIChkaXJJbmRleDIpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0VG9wKCkgLSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcm9vbTIuZ2V0UmlnaHQoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSByb29tMi5nZXRCb3R0b20oKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSByb29tMi5nZXRMZWZ0KCkgLSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFsoaW5kZXggKyAxKSAlIDJdID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9kaWdMaW5lKFtzdGFydCwgZW5kXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RhcnRbaW5kZXhdIDwgbWluIC0gMSB8fCBzdGFydFtpbmRleF0gPiBtYXggKyAxKSB7IC8qIG5lZWQgdG8gc3dpdGNoIHRhcmdldCB3YWxsIChMLWxpa2UpICovXG4gICAgICAgICAgICBsZXQgZGlmZiA9IHN0YXJ0W2luZGV4XSAtIGNlbnRlcjJbaW5kZXhdO1xuICAgICAgICAgICAgbGV0IHJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgIHN3aXRjaCAoZGlySW5kZXgyKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgcm90YXRpb24gPSAoZGlmZiA8IDAgPyAzIDogMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uID0gKGRpZmYgPCAwID8gMSA6IDMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpckluZGV4MiA9IChkaXJJbmRleDIgKyByb3RhdGlvbikgJSA0O1xuICAgICAgICAgICAgZW5kID0gdGhpcy5fcGxhY2VJbldhbGwocm9vbTIsIGRpckluZGV4Mik7XG4gICAgICAgICAgICBpZiAoIWVuZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBtaWQgPSBbMCwgMF07XG4gICAgICAgICAgICBtaWRbaW5kZXhdID0gc3RhcnRbaW5kZXhdO1xuICAgICAgICAgICAgbGV0IGluZGV4MiA9IChpbmRleCArIDEpICUgMjtcbiAgICAgICAgICAgIG1pZFtpbmRleDJdID0gZW5kW2luZGV4Ml07XG4gICAgICAgICAgICB0aGlzLl9kaWdMaW5lKFtzdGFydCwgbWlkLCBlbmRdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLyogdXNlIGN1cnJlbnQgd2FsbCBwYWlyLCBidXQgYWRqdXN0IHRoZSBsaW5lIGluIHRoZSBtaWRkbGUgKFMtbGlrZSkgKi9cbiAgICAgICAgICAgIGxldCBpbmRleDIgPSAoaW5kZXggKyAxKSAlIDI7XG4gICAgICAgICAgICBlbmQgPSB0aGlzLl9wbGFjZUluV2FsbChyb29tMiwgZGlySW5kZXgyKTtcbiAgICAgICAgICAgIGlmICghZW5kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1pZCA9IE1hdGgucm91bmQoKGVuZFtpbmRleDJdICsgc3RhcnRbaW5kZXgyXSkgLyAyKTtcbiAgICAgICAgICAgIGxldCBtaWQxID0gWzAsIDBdO1xuICAgICAgICAgICAgbGV0IG1pZDIgPSBbMCwgMF07XG4gICAgICAgICAgICBtaWQxW2luZGV4XSA9IHN0YXJ0W2luZGV4XTtcbiAgICAgICAgICAgIG1pZDFbaW5kZXgyXSA9IG1pZDtcbiAgICAgICAgICAgIG1pZDJbaW5kZXhdID0gZW5kW2luZGV4XTtcbiAgICAgICAgICAgIG1pZDJbaW5kZXgyXSA9IG1pZDtcbiAgICAgICAgICAgIHRoaXMuX2RpZ0xpbmUoW3N0YXJ0LCBtaWQxLCBtaWQyLCBlbmRdKTtcbiAgICAgICAgfVxuICAgICAgICByb29tMS5hZGREb29yKHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgIHJvb20yLmFkZERvb3IoZW5kWzBdLCBlbmRbMV0pO1xuICAgICAgICBpbmRleCA9IHRoaXMuX3VuY29ubmVjdGVkLmluZGV4T2Yocm9vbTEpO1xuICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3VuY29ubmVjdGVkLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0ZWQucHVzaChyb29tMSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXggPSB0aGlzLl91bmNvbm5lY3RlZC5pbmRleE9mKHJvb20yKTtcbiAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl91bmNvbm5lY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGVkLnB1c2gocm9vbTIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBfcGxhY2VJbldhbGwocm9vbSwgZGlySW5kZXgpIHtcbiAgICAgICAgbGV0IHN0YXJ0ID0gWzAsIDBdO1xuICAgICAgICBsZXQgZGlyID0gWzAsIDBdO1xuICAgICAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICAgICAgc3dpdGNoIChkaXJJbmRleCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGRpciA9IFsxLCAwXTtcbiAgICAgICAgICAgICAgICBzdGFydCA9IFtyb29tLmdldExlZnQoKSwgcm9vbS5nZXRUb3AoKSAtIDFdO1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHJvb20uZ2V0UmlnaHQoKSAtIHJvb20uZ2V0TGVmdCgpICsgMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBkaXIgPSBbMCwgMV07XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRSaWdodCgpICsgMSwgcm9vbS5nZXRUb3AoKV07XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gcm9vbS5nZXRCb3R0b20oKSAtIHJvb20uZ2V0VG9wKCkgKyAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGRpciA9IFsxLCAwXTtcbiAgICAgICAgICAgICAgICBzdGFydCA9IFtyb29tLmdldExlZnQoKSwgcm9vbS5nZXRCb3R0b20oKSArIDFdO1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHJvb20uZ2V0UmlnaHQoKSAtIHJvb20uZ2V0TGVmdCgpICsgMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBkaXIgPSBbMCwgMV07XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBbcm9vbS5nZXRMZWZ0KCkgLSAxLCByb29tLmdldFRvcCgpXTtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSByb29tLmdldEJvdHRvbSgpIC0gcm9vbS5nZXRUb3AoKSArIDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGF2YWlsID0gW107XG4gICAgICAgIGxldCBsYXN0QmFkSW5kZXggPSAtMjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHggPSBzdGFydFswXSArIGkgKiBkaXJbMF07XG4gICAgICAgICAgICBsZXQgeSA9IHN0YXJ0WzFdICsgaSAqIGRpclsxXTtcbiAgICAgICAgICAgIGF2YWlsLnB1c2gobnVsbCk7XG4gICAgICAgICAgICBsZXQgaXNXYWxsID0gKHRoaXMuX21hcFt4XVt5XSA9PSAxKTtcbiAgICAgICAgICAgIGlmIChpc1dhbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdEJhZEluZGV4ICE9IGkgLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGF2YWlsW2ldID0gW3gsIHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhc3RCYWRJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgaWYgKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxbaSAtIDFdID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IGF2YWlsLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAoIWF2YWlsW2ldKSB7XG4gICAgICAgICAgICAgICAgYXZhaWwuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYXZhaWwubGVuZ3RoID8gUk5HLmdldEl0ZW0oYXZhaWwpIDogbnVsbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpZyBhIHBvbHlsaW5lLlxuICAgICAqL1xuICAgIF9kaWdMaW5lKHBvaW50cykge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gcG9pbnRzW2kgLSAxXTtcbiAgICAgICAgICAgIGxldCBlbmQgPSBwb2ludHNbaV07XG4gICAgICAgICAgICBsZXQgY29ycmlkb3IgPSBuZXcgQ29ycmlkb3Ioc3RhcnRbMF0sIHN0YXJ0WzFdLCBlbmRbMF0sIGVuZFsxXSk7XG4gICAgICAgICAgICBjb3JyaWRvci5jcmVhdGUodGhpcy5fZGlnQ2FsbGJhY2spO1xuICAgICAgICAgICAgdGhpcy5fY29ycmlkb3JzLnB1c2goY29ycmlkb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9kaWdDYWxsYmFjayh4LCB5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9tYXBbeF1beV0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2R1ZysrO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9pc1dhbGxDYWxsYmFjayh4LCB5KSB7XG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IHRoaXMuX3dpZHRoIHx8IHkgPj0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLl9tYXBbeF1beV0gPT0gMSk7XG4gICAgfVxuICAgIF9jYW5CZUR1Z0NhbGxiYWNrKHgsIHkpIHtcbiAgICAgICAgaWYgKHggPCAxIHx8IHkgPCAxIHx8IHggKyAxID49IHRoaXMuX3dpZHRoIHx8IHkgKyAxID49IHRoaXMuX2hlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5fbWFwW3hdW3ldID09IDEpO1xuICAgIH1cbn1cbiIsImltcG9ydCBTaW1wbGV4IGZyb20gXCIuL3NpbXBsZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IHsgU2ltcGxleCB9O1xuIiwiLyoqXG4gKiBCYXNlIG5vaXNlIGdlbmVyYXRvclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2lzZSB7XG59XG4iLCJpbXBvcnQgTm9pc2UgZnJvbSBcIi4vbm9pc2UuanNcIjtcbmltcG9ydCBSTkcgZnJvbSBcIi4uL3JuZy5qc1wiO1xuaW1wb3J0IHsgbW9kIH0gZnJvbSBcIi4uL3V0aWwuanNcIjtcbmNvbnN0IEYyID0gMC41ICogKE1hdGguc3FydCgzKSAtIDEpO1xuY29uc3QgRzIgPSAoMyAtIE1hdGguc3FydCgzKSkgLyA2O1xuLyoqXG4gKiBBIHNpbXBsZSAyZCBpbXBsZW1lbnRhdGlvbiBvZiBzaW1wbGV4IG5vaXNlIGJ5IE9uZHJlaiBaYXJhXG4gKlxuICogQmFzZWQgb24gYSBzcGVlZC1pbXByb3ZlZCBzaW1wbGV4IG5vaXNlIGFsZ29yaXRobSBmb3IgMkQsIDNEIGFuZCA0RCBpbiBKYXZhLlxuICogV2hpY2ggaXMgYmFzZWQgb24gZXhhbXBsZSBjb2RlIGJ5IFN0ZWZhbiBHdXN0YXZzb24gKHN0ZWd1QGl0bi5saXUuc2UpLlxuICogV2l0aCBPcHRpbWlzYXRpb25zIGJ5IFBldGVyIEVhc3RtYW4gKHBlYXN0bWFuQGRyaXp6bGUuc3RhbmZvcmQuZWR1KS5cbiAqIEJldHRlciByYW5rIG9yZGVyaW5nIG1ldGhvZCBieSBTdGVmYW4gR3VzdGF2c29uIGluIDIwMTIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXBsZXggZXh0ZW5kcyBOb2lzZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGdyYWRpZW50cyBSYW5kb20gZ3JhZGllbnRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZ3JhZGllbnRzID0gMjU2KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2dyYWRpZW50cyA9IFtcbiAgICAgICAgICAgIFswLCAtMV0sXG4gICAgICAgICAgICBbMSwgLTFdLFxuICAgICAgICAgICAgWzEsIDBdLFxuICAgICAgICAgICAgWzEsIDFdLFxuICAgICAgICAgICAgWzAsIDFdLFxuICAgICAgICAgICAgWy0xLCAxXSxcbiAgICAgICAgICAgIFstMSwgMF0sXG4gICAgICAgICAgICBbLTEsIC0xXVxuICAgICAgICBdO1xuICAgICAgICBsZXQgcGVybXV0YXRpb25zID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JhZGllbnRzOyBpKyspIHtcbiAgICAgICAgICAgIHBlcm11dGF0aW9ucy5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIHBlcm11dGF0aW9ucyA9IFJORy5zaHVmZmxlKHBlcm11dGF0aW9ucyk7XG4gICAgICAgIHRoaXMuX3Blcm1zID0gW107XG4gICAgICAgIHRoaXMuX2luZGV4ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyICogZ3JhZGllbnRzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3Blcm1zLnB1c2gocGVybXV0YXRpb25zW2kgJSBncmFkaWVudHNdKTtcbiAgICAgICAgICAgIHRoaXMuX2luZGV4ZXMucHVzaCh0aGlzLl9wZXJtc1tpXSAlIHRoaXMuX2dyYWRpZW50cy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCh4aW4sIHlpbikge1xuICAgICAgICBsZXQgcGVybXMgPSB0aGlzLl9wZXJtcztcbiAgICAgICAgbGV0IGluZGV4ZXMgPSB0aGlzLl9pbmRleGVzO1xuICAgICAgICBsZXQgY291bnQgPSBwZXJtcy5sZW5ndGggLyAyO1xuICAgICAgICBsZXQgbjAgPSAwLCBuMSA9IDAsIG4yID0gMCwgZ2k7IC8vIE5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSB0aGUgdGhyZWUgY29ybmVyc1xuICAgICAgICAvLyBTa2V3IHRoZSBpbnB1dCBzcGFjZSB0byBkZXRlcm1pbmUgd2hpY2ggc2ltcGxleCBjZWxsIHdlJ3JlIGluXG4gICAgICAgIGxldCBzID0gKHhpbiArIHlpbikgKiBGMjsgLy8gSGFpcnkgZmFjdG9yIGZvciAyRFxuICAgICAgICBsZXQgaSA9IE1hdGguZmxvb3IoeGluICsgcyk7XG4gICAgICAgIGxldCBqID0gTWF0aC5mbG9vcih5aW4gKyBzKTtcbiAgICAgICAgbGV0IHQgPSAoaSArIGopICogRzI7XG4gICAgICAgIGxldCBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSkgc3BhY2VcbiAgICAgICAgbGV0IFkwID0gaiAtIHQ7XG4gICAgICAgIGxldCB4MCA9IHhpbiAtIFgwOyAvLyBUaGUgeCx5IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuICAgICAgICBsZXQgeTAgPSB5aW4gLSBZMDtcbiAgICAgICAgLy8gRm9yIHRoZSAyRCBjYXNlLCB0aGUgc2ltcGxleCBzaGFwZSBpcyBhbiBlcXVpbGF0ZXJhbCB0cmlhbmdsZS5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggd2UgYXJlIGluLlxuICAgICAgICBsZXQgaTEsIGoxOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgKG1pZGRsZSkgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaikgY29vcmRzXG4gICAgICAgIGlmICh4MCA+IHkwKSB7XG4gICAgICAgICAgICBpMSA9IDE7XG4gICAgICAgICAgICBqMSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8vIGxvd2VyIHRyaWFuZ2xlLCBYWSBvcmRlcjogKDAsMCktPigxLDApLT4oMSwxKVxuICAgICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgICAgajEgPSAxO1xuICAgICAgICB9IC8vIHVwcGVyIHRyaWFuZ2xlLCBZWCBvcmRlcjogKDAsMCktPigwLDEpLT4oMSwxKVxuICAgICAgICAvLyBBIHN0ZXAgb2YgKDEsMCkgaW4gKGksaikgbWVhbnMgYSBzdGVwIG9mICgxLWMsLWMpIGluICh4LHkpLCBhbmRcbiAgICAgICAgLy8gYSBzdGVwIG9mICgwLDEpIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jKSBpbiAoeCx5KSwgd2hlcmVcbiAgICAgICAgLy8gYyA9ICgzLXNxcnQoMykpLzZcbiAgICAgICAgbGV0IHgxID0geDAgLSBpMSArIEcyOyAvLyBPZmZzZXRzIGZvciBtaWRkbGUgY29ybmVyIGluICh4LHkpIHVuc2tld2VkIGNvb3Jkc1xuICAgICAgICBsZXQgeTEgPSB5MCAtIGoxICsgRzI7XG4gICAgICAgIGxldCB4MiA9IHgwIC0gMSArIDIgKiBHMjsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXG4gICAgICAgIGxldCB5MiA9IHkwIC0gMSArIDIgKiBHMjtcbiAgICAgICAgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSB0aHJlZSBzaW1wbGV4IGNvcm5lcnNcbiAgICAgICAgbGV0IGlpID0gbW9kKGksIGNvdW50KTtcbiAgICAgICAgbGV0IGpqID0gbW9kKGosIGNvdW50KTtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgdGhyZWUgY29ybmVyc1xuICAgICAgICBsZXQgdDAgPSAwLjUgLSB4MCAqIHgwIC0geTAgKiB5MDtcbiAgICAgICAgaWYgKHQwID49IDApIHtcbiAgICAgICAgICAgIHQwICo9IHQwO1xuICAgICAgICAgICAgZ2kgPSBpbmRleGVzW2lpICsgcGVybXNbampdXTtcbiAgICAgICAgICAgIGxldCBncmFkID0gdGhpcy5fZ3JhZGllbnRzW2dpXTtcbiAgICAgICAgICAgIG4wID0gdDAgKiB0MCAqIChncmFkWzBdICogeDAgKyBncmFkWzFdICogeTApO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0MSA9IDAuNSAtIHgxICogeDEgLSB5MSAqIHkxO1xuICAgICAgICBpZiAodDEgPj0gMCkge1xuICAgICAgICAgICAgdDEgKj0gdDE7XG4gICAgICAgICAgICBnaSA9IGluZGV4ZXNbaWkgKyBpMSArIHBlcm1zW2pqICsgajFdXTtcbiAgICAgICAgICAgIGxldCBncmFkID0gdGhpcy5fZ3JhZGllbnRzW2dpXTtcbiAgICAgICAgICAgIG4xID0gdDEgKiB0MSAqIChncmFkWzBdICogeDEgKyBncmFkWzFdICogeTEpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0MiA9IDAuNSAtIHgyICogeDIgLSB5MiAqIHkyO1xuICAgICAgICBpZiAodDIgPj0gMCkge1xuICAgICAgICAgICAgdDIgKj0gdDI7XG4gICAgICAgICAgICBnaSA9IGluZGV4ZXNbaWkgKyAxICsgcGVybXNbamogKyAxXV07XG4gICAgICAgICAgICBsZXQgZ3JhZCA9IHRoaXMuX2dyYWRpZW50c1tnaV07XG4gICAgICAgICAgICBuMiA9IHQyICogdDIgKiAoZ3JhZFswXSAqIHgyICsgZ3JhZFsxXSAqIHkyKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXG4gICAgICAgIC8vIFRoZSByZXN1bHQgaXMgc2NhbGVkIHRvIHJldHVybiB2YWx1ZXMgaW4gdGhlIGludGVydmFsIFstMSwxXS5cbiAgICAgICAgcmV0dXJuIDcwICogKG4wICsgbjEgKyBuMik7XG4gICAgfVxufVxuIiwiaW1wb3J0IFBhdGggZnJvbSBcIi4vcGF0aC5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgU2ltcGxpZmllZCBBKiBhbGdvcml0aG06IGFsbCBlZGdlcyBoYXZlIGEgdmFsdWUgb2YgMVxuICogQGF1Z21lbnRzIFJPVC5QYXRoXG4gKiBAc2VlIFJPVC5QYXRoXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFTdGFyIGV4dGVuZHMgUGF0aCB7XG4gICAgY29uc3RydWN0b3IodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcih0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3RvZG8gPSBbXTtcbiAgICAgICAgdGhpcy5fZG9uZSA9IHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgcGF0aCBmcm9tIGEgZ2l2ZW4gcG9pbnRcbiAgICAgKiBAc2VlIFJPVC5QYXRoI2NvbXB1dGVcbiAgICAgKi9cbiAgICBjb21wdXRlKGZyb21YLCBmcm9tWSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fdG9kbyA9IFtdO1xuICAgICAgICB0aGlzLl9kb25lID0ge307XG4gICAgICAgIHRoaXMuX2Zyb21YID0gZnJvbVg7XG4gICAgICAgIHRoaXMuX2Zyb21ZID0gZnJvbVk7XG4gICAgICAgIHRoaXMuX2FkZCh0aGlzLl90b1gsIHRoaXMuX3RvWSwgbnVsbCk7XG4gICAgICAgIHdoaWxlICh0aGlzLl90b2RvLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl90b2RvLnNoaWZ0KCk7XG4gICAgICAgICAgICBsZXQgaWQgPSBpdGVtLnggKyBcIixcIiArIGl0ZW0ueTtcbiAgICAgICAgICAgIGlmIChpZCBpbiB0aGlzLl9kb25lKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kb25lW2lkXSA9IGl0ZW07XG4gICAgICAgICAgICBpZiAoaXRlbS54ID09IGZyb21YICYmIGl0ZW0ueSA9PSBmcm9tWSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG5laWdoYm9ycyA9IHRoaXMuX2dldE5laWdoYm9ycyhpdGVtLngsIGl0ZW0ueSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5laWdoYm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IG5laWdoYm9yWzBdO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gbmVpZ2hib3JbMV07XG4gICAgICAgICAgICAgICAgbGV0IGlkID0geCArIFwiLFwiICsgeTtcbiAgICAgICAgICAgICAgICBpZiAoaWQgaW4gdGhpcy5fZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkKHgsIHksIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5fZG9uZVtmcm9tWCArIFwiLFwiICsgZnJvbVldO1xuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICAgICAgY2FsbGJhY2soaXRlbS54LCBpdGVtLnkpO1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ucHJldjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfYWRkKHgsIHksIHByZXYpIHtcbiAgICAgICAgbGV0IGggPSB0aGlzLl9kaXN0YW5jZSh4LCB5KTtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgcHJldjogcHJldixcbiAgICAgICAgICAgIGc6IChwcmV2ID8gcHJldi5nICsgMSA6IDApLFxuICAgICAgICAgICAgaDogaFxuICAgICAgICB9O1xuICAgICAgICAvKiBpbnNlcnQgaW50byBwcmlvcml0eSBxdWV1ZSAqL1xuICAgICAgICBsZXQgZiA9IG9iai5nICsgb2JqLmg7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdG9kby5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl90b2RvW2ldO1xuICAgICAgICAgICAgbGV0IGl0ZW1GID0gaXRlbS5nICsgaXRlbS5oO1xuICAgICAgICAgICAgaWYgKGYgPCBpdGVtRiB8fCAoZiA9PSBpdGVtRiAmJiBoIDwgaXRlbS5oKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvZG8uc3BsaWNlKGksIDAsIG9iaik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RvZG8ucHVzaChvYmopO1xuICAgIH1cbiAgICBfZGlzdGFuY2UoeCwgeSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kpIHtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKE1hdGguYWJzKHggLSB0aGlzLl9mcm9tWCkgKyBNYXRoLmFicyh5IC0gdGhpcy5fZnJvbVkpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBsZXQgZHggPSBNYXRoLmFicyh4IC0gdGhpcy5fZnJvbVgpO1xuICAgICAgICAgICAgICAgIGxldCBkeSA9IE1hdGguYWJzKHkgLSB0aGlzLl9mcm9tWSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGR5ICsgTWF0aC5tYXgoMCwgKGR4IC0gZHkpIC8gMik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGguYWJzKHggLSB0aGlzLl9mcm9tWCksIE1hdGguYWJzKHkgLSB0aGlzLl9mcm9tWSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFBhdGggZnJvbSBcIi4vcGF0aC5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgU2ltcGxpZmllZCBEaWprc3RyYSdzIGFsZ29yaXRobTogYWxsIGVkZ2VzIGhhdmUgYSB2YWx1ZSBvZiAxXG4gKiBAYXVnbWVudHMgUk9ULlBhdGhcbiAqIEBzZWUgUk9ULlBhdGhcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlqa3N0cmEgZXh0ZW5kcyBQYXRoIHtcbiAgICBjb25zdHJ1Y3Rvcih0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICBzdXBlcih0b1gsIHRvWSwgcGFzc2FibGVDYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2NvbXB1dGVkID0ge307XG4gICAgICAgIHRoaXMuX3RvZG8gPSBbXTtcbiAgICAgICAgdGhpcy5fYWRkKHRvWCwgdG9ZLCBudWxsKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBhIHBhdGggZnJvbSBhIGdpdmVuIHBvaW50XG4gICAgICogQHNlZSBST1QuUGF0aCNjb21wdXRlXG4gICAgICovXG4gICAgY29tcHV0ZShmcm9tWCwgZnJvbVksIGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBrZXkgPSBmcm9tWCArIFwiLFwiICsgZnJvbVk7XG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLl9jb21wdXRlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXB1dGUoZnJvbVgsIGZyb21ZKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5fY29tcHV0ZWQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9jb21wdXRlZFtrZXldO1xuICAgICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICAgICAgY2FsbGJhY2soaXRlbS54LCBpdGVtLnkpO1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ucHJldjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgbm9uLWNhY2hlZCB2YWx1ZVxuICAgICAqL1xuICAgIF9jb21wdXRlKGZyb21YLCBmcm9tWSkge1xuICAgICAgICB3aGlsZSAodGhpcy5fdG9kby5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5fdG9kby5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKGl0ZW0ueCA9PSBmcm9tWCAmJiBpdGVtLnkgPT0gZnJvbVkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbmVpZ2hib3JzID0gdGhpcy5fZ2V0TmVpZ2hib3JzKGl0ZW0ueCwgaXRlbS55KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5laWdoYm9yID0gbmVpZ2hib3JzW2ldO1xuICAgICAgICAgICAgICAgIGxldCB4ID0gbmVpZ2hib3JbMF07XG4gICAgICAgICAgICAgICAgbGV0IHkgPSBuZWlnaGJvclsxXTtcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSB4ICsgXCIsXCIgKyB5O1xuICAgICAgICAgICAgICAgIGlmIChpZCBpbiB0aGlzLl9jb21wdXRlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IC8qIGFscmVhZHkgZG9uZSAqL1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZCh4LCB5LCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfYWRkKHgsIHksIHByZXYpIHtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgcHJldjogcHJldlxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9jb21wdXRlZFt4ICsgXCIsXCIgKyB5XSA9IG9iajtcbiAgICAgICAgdGhpcy5fdG9kby5wdXNoKG9iaik7XG4gICAgfVxufVxuIiwiaW1wb3J0IERpamtzdHJhIGZyb20gXCIuL2RpamtzdHJhLmpzXCI7XG5pbXBvcnQgQVN0YXIgZnJvbSBcIi4vYXN0YXIuanNcIjtcbmV4cG9ydCBkZWZhdWx0IHsgRGlqa3N0cmEsIEFTdGFyIH07XG4iLCJpbXBvcnQgeyBESVJTIH0gZnJvbSBcIi4uL2NvbnN0YW50cy5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgQWJzdHJhY3QgcGF0aGZpbmRlclxuICogQHBhcmFtIHtpbnR9IHRvWCBUYXJnZXQgWCBjb29yZFxuICogQHBhcmFtIHtpbnR9IHRvWSBUYXJnZXQgWSBjb29yZFxuICogQHBhcmFtIHtmdW5jdGlvbn0gcGFzc2FibGVDYWxsYmFjayBDYWxsYmFjayB0byBkZXRlcm1pbmUgbWFwIHBhc3NhYmlsaXR5XG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge2ludH0gW29wdGlvbnMudG9wb2xvZ3k9OF1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF0aCB7XG4gICAgY29uc3RydWN0b3IodG9YLCB0b1ksIHBhc3NhYmxlQ2FsbGJhY2ssIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl90b1ggPSB0b1g7XG4gICAgICAgIHRoaXMuX3RvWSA9IHRvWTtcbiAgICAgICAgdGhpcy5fcGFzc2FibGVDYWxsYmFjayA9IHBhc3NhYmxlQ2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHRvcG9sb2d5OiA4XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9kaXJzID0gRElSU1t0aGlzLl9vcHRpb25zLnRvcG9sb2d5XTtcbiAgICAgICAgaWYgKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kgPT0gOCkgeyAvKiByZW9yZGVyIGRpcnMgZm9yIG1vcmUgYWVzdGhldGljIHJlc3VsdCAodmVydGljYWwvaG9yaXpvbnRhbCBmaXJzdCkgKi9cbiAgICAgICAgICAgIHRoaXMuX2RpcnMgPSBbXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1swXSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzJdLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbNF0sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1s2XSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzFdLFxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnNbM10sXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlyc1s1XSxcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJzWzddXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXROZWlnaGJvcnMoY3gsIGN5KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9kaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGlyID0gdGhpcy5fZGlyc1tpXTtcbiAgICAgICAgICAgIGxldCB4ID0gY3ggKyBkaXJbMF07XG4gICAgICAgICAgICBsZXQgeSA9IGN5ICsgZGlyWzFdO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9wYXNzYWJsZUNhbGxiYWNrKHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQucHVzaChbeCwgeV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBUaGlzIGNvZGUgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgQWxlYSBhbGdvcml0aG07IChDKSAyMDEwIEpvaGFubmVzIEJhYWfDuGUuXG4gKiBBbGVhIGlzIGxpY2Vuc2VkIGFjY29yZGluZyB0byB0aGUgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NSVRfTGljZW5zZS5cbiAqL1xuY29uc3QgRlJBQyA9IDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8qIDJeLTMyICovXG5jbGFzcyBSTkcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9zZWVkID0gMDtcbiAgICAgICAgdGhpcy5fczAgPSAwO1xuICAgICAgICB0aGlzLl9zMSA9IDA7XG4gICAgICAgIHRoaXMuX3MyID0gMDtcbiAgICAgICAgdGhpcy5fYyA9IDA7XG4gICAgfVxuICAgIGdldFNlZWQoKSB7IHJldHVybiB0aGlzLl9zZWVkOyB9XG4gICAgLyoqXG4gICAgICogU2VlZCB0aGUgbnVtYmVyIGdlbmVyYXRvclxuICAgICAqL1xuICAgIHNldFNlZWQoc2VlZCkge1xuICAgICAgICBzZWVkID0gKHNlZWQgPCAxID8gMSAvIHNlZWQgOiBzZWVkKTtcbiAgICAgICAgdGhpcy5fc2VlZCA9IHNlZWQ7XG4gICAgICAgIHRoaXMuX3MwID0gKHNlZWQgPj4+IDApICogRlJBQztcbiAgICAgICAgc2VlZCA9IChzZWVkICogNjkwNjkgKyAxKSA+Pj4gMDtcbiAgICAgICAgdGhpcy5fczEgPSBzZWVkICogRlJBQztcbiAgICAgICAgc2VlZCA9IChzZWVkICogNjkwNjkgKyAxKSA+Pj4gMDtcbiAgICAgICAgdGhpcy5fczIgPSBzZWVkICogRlJBQztcbiAgICAgICAgdGhpcy5fYyA9IDE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBQc2V1ZG9yYW5kb20gdmFsdWUgWzAsMSksIHVuaWZvcm1seSBkaXN0cmlidXRlZFxuICAgICAqL1xuICAgIGdldFVuaWZvcm0oKSB7XG4gICAgICAgIGxldCB0ID0gMjA5MTYzOSAqIHRoaXMuX3MwICsgdGhpcy5fYyAqIEZSQUM7XG4gICAgICAgIHRoaXMuX3MwID0gdGhpcy5fczE7XG4gICAgICAgIHRoaXMuX3MxID0gdGhpcy5fczI7XG4gICAgICAgIHRoaXMuX2MgPSB0IHwgMDtcbiAgICAgICAgdGhpcy5fczIgPSB0IC0gdGhpcy5fYztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3MyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbG93ZXJCb3VuZCBUaGUgbG93ZXIgZW5kIG9mIHRoZSByYW5nZSB0byByZXR1cm4gYSB2YWx1ZSBmcm9tLCBpbmNsdXNpdmVcbiAgICAgKiBAcGFyYW0gdXBwZXJCb3VuZCBUaGUgdXBwZXIgZW5kIG9mIHRoZSByYW5nZSB0byByZXR1cm4gYSB2YWx1ZSBmcm9tLCBpbmNsdXNpdmVcbiAgICAgKiBAcmV0dXJucyBQc2V1ZG9yYW5kb20gdmFsdWUgW2xvd2VyQm91bmQsIHVwcGVyQm91bmRdLCB1c2luZyBST1QuUk5HLmdldFVuaWZvcm0oKSB0byBkaXN0cmlidXRlIHRoZSB2YWx1ZVxuICAgICAqL1xuICAgIGdldFVuaWZvcm1JbnQobG93ZXJCb3VuZCwgdXBwZXJCb3VuZCkge1xuICAgICAgICBsZXQgbWF4ID0gTWF0aC5tYXgobG93ZXJCb3VuZCwgdXBwZXJCb3VuZCk7XG4gICAgICAgIGxldCBtaW4gPSBNYXRoLm1pbihsb3dlckJvdW5kLCB1cHBlckJvdW5kKTtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5nZXRVbmlmb3JtKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbWVhbiBNZWFuIHZhbHVlXG4gICAgICogQHBhcmFtIHN0ZGRldiBTdGFuZGFyZCBkZXZpYXRpb24uIH45NSUgb2YgdGhlIGFic29sdXRlIHZhbHVlcyB3aWxsIGJlIGxvd2VyIHRoYW4gMipzdGRkZXYuXG4gICAgICogQHJldHVybnMgQSBub3JtYWxseSBkaXN0cmlidXRlZCBwc2V1ZG9yYW5kb20gdmFsdWVcbiAgICAgKi9cbiAgICBnZXROb3JtYWwobWVhbiA9IDAsIHN0ZGRldiA9IDEpIHtcbiAgICAgICAgbGV0IHUsIHYsIHI7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHUgPSAyICogdGhpcy5nZXRVbmlmb3JtKCkgLSAxO1xuICAgICAgICAgICAgdiA9IDIgKiB0aGlzLmdldFVuaWZvcm0oKSAtIDE7XG4gICAgICAgICAgICByID0gdSAqIHUgKyB2ICogdjtcbiAgICAgICAgfSB3aGlsZSAociA+IDEgfHwgciA9PSAwKTtcbiAgICAgICAgbGV0IGdhdXNzID0gdSAqIE1hdGguc3FydCgtMiAqIE1hdGgubG9nKHIpIC8gcik7XG4gICAgICAgIHJldHVybiBtZWFuICsgZ2F1c3MgKiBzdGRkZXY7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFBzZXVkb3JhbmRvbSB2YWx1ZSBbMSwxMDBdIGluY2x1c2l2ZSwgdW5pZm9ybWx5IGRpc3RyaWJ1dGVkXG4gICAgICovXG4gICAgZ2V0UGVyY2VudGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIDEgKyBNYXRoLmZsb29yKHRoaXMuZ2V0VW5pZm9ybSgpICogMTAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmFuZG9tbHkgcGlja2VkIGl0ZW0sIG51bGwgd2hlbiBsZW5ndGg9MFxuICAgICAqL1xuICAgIGdldEl0ZW0oYXJyYXkpIHtcbiAgICAgICAgaWYgKCFhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheVtNYXRoLmZsb29yKHRoaXMuZ2V0VW5pZm9ybSgpICogYXJyYXkubGVuZ3RoKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIE5ldyBhcnJheSB3aXRoIHJhbmRvbWl6ZWQgaXRlbXNcbiAgICAgKi9cbiAgICBzaHVmZmxlKGFycmF5KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgbGV0IGNsb25lID0gYXJyYXkuc2xpY2UoKTtcbiAgICAgICAgd2hpbGUgKGNsb25lLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gY2xvbmUuaW5kZXhPZih0aGlzLmdldEl0ZW0oY2xvbmUpKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNsb25lLnNwbGljZShpbmRleCwgMSlbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRhIGtleT13aGF0ZXZlciwgdmFsdWU9d2VpZ2h0IChyZWxhdGl2ZSBwcm9iYWJpbGl0eSlcbiAgICAgKiBAcmV0dXJucyB3aGF0ZXZlclxuICAgICAqL1xuICAgIGdldFdlaWdodGVkVmFsdWUoZGF0YSkge1xuICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICBmb3IgKGxldCBpZCBpbiBkYXRhKSB7XG4gICAgICAgICAgICB0b3RhbCArPSBkYXRhW2lkXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmFuZG9tID0gdGhpcy5nZXRVbmlmb3JtKCkgKiB0b3RhbDtcbiAgICAgICAgbGV0IGlkLCBwYXJ0ID0gMDtcbiAgICAgICAgZm9yIChpZCBpbiBkYXRhKSB7XG4gICAgICAgICAgICBwYXJ0ICs9IGRhdGFbaWRdO1xuICAgICAgICAgICAgaWYgKHJhbmRvbSA8IHBhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgYnkgc29tZSBmbG9hdGluZy1wb2ludCBhbm5veWFuY2Ugd2UgaGF2ZVxuICAgICAgICAvLyByYW5kb20gPj0gdG90YWwsIGp1c3QgcmV0dXJuIHRoZSBsYXN0IGlkLlxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBSTkcgc3RhdGUuIFVzZWZ1bCBmb3Igc3RvcmluZyB0aGUgc3RhdGUgYW5kIHJlLXNldHRpbmcgaXQgdmlhIHNldFN0YXRlLlxuICAgICAqIEByZXR1cm5zIEludGVybmFsIHN0YXRlXG4gICAgICovXG4gICAgZ2V0U3RhdGUoKSB7IHJldHVybiBbdGhpcy5fczAsIHRoaXMuX3MxLCB0aGlzLl9zMiwgdGhpcy5fY107IH1cbiAgICAvKipcbiAgICAgKiBTZXQgYSBwcmV2aW91c2x5IHJldHJpZXZlZCBzdGF0ZS5cbiAgICAgKi9cbiAgICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgICAgICB0aGlzLl9zMCA9IHN0YXRlWzBdO1xuICAgICAgICB0aGlzLl9zMSA9IHN0YXRlWzFdO1xuICAgICAgICB0aGlzLl9zMiA9IHN0YXRlWzJdO1xuICAgICAgICB0aGlzLl9jID0gc3RhdGVbM107XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY2xvbmVkIFJOR1xuICAgICAqL1xuICAgIGNsb25lKCkge1xuICAgICAgICBsZXQgY2xvbmUgPSBuZXcgUk5HKCk7XG4gICAgICAgIHJldHVybiBjbG9uZS5zZXRTdGF0ZSh0aGlzLmdldFN0YXRlKCkpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBSTkcoKS5zZXRTZWVkKERhdGUubm93KCkpO1xuIiwiaW1wb3J0IFNjaGVkdWxlciBmcm9tIFwiLi9zY2hlZHVsZXIuanNcIjtcbi8qKlxuICogQGNsYXNzIEFjdGlvbi1iYXNlZCBzY2hlZHVsZXJcbiAqIEBhdWdtZW50cyBST1QuU2NoZWR1bGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdGlvbiBleHRlbmRzIFNjaGVkdWxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2RlZmF1bHREdXJhdGlvbiA9IDE7IC8qIGZvciBuZXdseSBhZGRlZCAqL1xuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjsgLyogZm9yIHRoaXMuX2N1cnJlbnQgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGl0ZW1cbiAgICAgKiBAcGFyYW0ge2Jvb2x9IHJlcGVhdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZT0xXVxuICAgICAqIEBzZWUgUk9ULlNjaGVkdWxlciNhZGRcbiAgICAgKi9cbiAgICBhZGQoaXRlbSwgcmVwZWF0LCB0aW1lKSB7XG4gICAgICAgIHRoaXMuX3F1ZXVlLmFkZChpdGVtLCB0aW1lIHx8IHRoaXMuX2RlZmF1bHREdXJhdGlvbik7XG4gICAgICAgIHJldHVybiBzdXBlci5hZGQoaXRlbSwgcmVwZWF0KTtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fZGVmYXVsdER1cmF0aW9uO1xuICAgICAgICByZXR1cm4gc3VwZXIuY2xlYXIoKTtcbiAgICB9XG4gICAgcmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0gPT0gdGhpcy5fY3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB0aGlzLl9kZWZhdWx0RHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLnJlbW92ZShpdGVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHNlZSBST1QuU2NoZWR1bGVyI25leHRcbiAgICAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudCAhPT0gbnVsbCAmJiB0aGlzLl9yZXBlYXQuaW5kZXhPZih0aGlzLl9jdXJyZW50KSAhPSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fcXVldWUuYWRkKHRoaXMuX2N1cnJlbnQsIHRoaXMuX2R1cmF0aW9uIHx8IHRoaXMuX2RlZmF1bHREdXJhdGlvbik7XG4gICAgICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IHRoaXMuX2RlZmF1bHREdXJhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIubmV4dCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgZHVyYXRpb24gZm9yIHRoZSBhY3RpdmUgaXRlbVxuICAgICAqL1xuICAgIHNldER1cmF0aW9uKHRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2R1cmF0aW9uID0gdGltZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iLCJpbXBvcnQgU2ltcGxlIGZyb20gXCIuL3NpbXBsZS5qc1wiO1xuaW1wb3J0IFNwZWVkIGZyb20gXCIuL3NwZWVkLmpzXCI7XG5pbXBvcnQgQWN0aW9uIGZyb20gXCIuL2FjdGlvbi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgeyBTaW1wbGUsIFNwZWVkLCBBY3Rpb24gfTtcbiIsImltcG9ydCBFdmVudFF1ZXVlIGZyb20gXCIuLi9ldmVudHF1ZXVlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2hlZHVsZXIge1xuICAgIC8qKlxuICAgICAqIEBjbGFzcyBBYnN0cmFjdCBzY2hlZHVsZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcXVldWUgPSBuZXcgRXZlbnRRdWV1ZSgpO1xuICAgICAgICB0aGlzLl9yZXBlYXQgPSBbXTtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUgUk9ULkV2ZW50UXVldWUjZ2V0VGltZVxuICAgICAqL1xuICAgIGdldFRpbWUoKSB7IHJldHVybiB0aGlzLl9xdWV1ZS5nZXRUaW1lKCk7IH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gez99IGl0ZW1cbiAgICAgKiBAcGFyYW0ge2Jvb2x9IHJlcGVhdFxuICAgICAqL1xuICAgIGFkZChpdGVtLCByZXBlYXQpIHtcbiAgICAgICAgaWYgKHJlcGVhdCkge1xuICAgICAgICAgICAgdGhpcy5fcmVwZWF0LnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGltZSB0aGUgZ2l2ZW4gaXRlbSBpcyBzY2hlZHVsZWQgZm9yXG4gICAgICogQHBhcmFtIHs/fSBpdGVtXG4gICAgICogQHJldHVybnMge251bWJlcn0gdGltZVxuICAgICAqL1xuICAgIGdldFRpbWVPZihpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWV1ZS5nZXRFdmVudFRpbWUoaXRlbSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFyIGFsbCBpdGVtc1xuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5jbGVhcigpO1xuICAgICAgICB0aGlzLl9yZXBlYXQgPSBbXTtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBwcmV2aW91c2x5IGFkZGVkIGl0ZW1cbiAgICAgKiBAcGFyYW0gez99IGl0ZW1cbiAgICAgKiBAcmV0dXJucyB7Ym9vbH0gc3VjY2Vzc2Z1bD9cbiAgICAgKi9cbiAgICByZW1vdmUoaXRlbSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fcXVldWUucmVtb3ZlKGl0ZW0pO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLl9yZXBlYXQuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXBlYXQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY3VycmVudCA9PSBpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY2hlZHVsZSBuZXh0IGl0ZW1cbiAgICAgKiBAcmV0dXJucyB7P31cbiAgICAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5fcXVldWUuZ2V0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50O1xuICAgIH1cbn1cbiIsImltcG9ydCBTY2hlZHVsZXIgZnJvbSBcIi4vc2NoZWR1bGVyLmpzXCI7XG4vKipcbiAqIEBjbGFzcyBTaW1wbGUgZmFpciBzY2hlZHVsZXIgKHJvdW5kLXJvYmluIHN0eWxlKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGUgZXh0ZW5kcyBTY2hlZHVsZXIge1xuICAgIGFkZChpdGVtLCByZXBlYXQpIHtcbiAgICAgICAgdGhpcy5fcXVldWUuYWRkKGl0ZW0sIDApO1xuICAgICAgICByZXR1cm4gc3VwZXIuYWRkKGl0ZW0sIHJlcGVhdCk7XG4gICAgfVxuICAgIG5leHQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50ICE9PSBudWxsICYmIHRoaXMuX3JlcGVhdC5pbmRleE9mKHRoaXMuX2N1cnJlbnQpICE9IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWV1ZS5hZGQodGhpcy5fY3VycmVudCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1cGVyLm5leHQoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU2NoZWR1bGVyIGZyb20gXCIuL3NjaGVkdWxlci5qc1wiO1xuLyoqXG4gKiBAY2xhc3MgU3BlZWQtYmFzZWQgc2NoZWR1bGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwZWVkIGV4dGVuZHMgU2NoZWR1bGVyIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaXRlbSBhbnl0aGluZyB3aXRoIFwiZ2V0U3BlZWRcIiBtZXRob2RcbiAgICAgKiBAcGFyYW0ge2Jvb2x9IHJlcGVhdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZT0xL2l0ZW0uZ2V0U3BlZWQoKV1cbiAgICAgKiBAc2VlIFJPVC5TY2hlZHVsZXIjYWRkXG4gICAgICovXG4gICAgYWRkKGl0ZW0sIHJlcGVhdCwgdGltZSkge1xuICAgICAgICB0aGlzLl9xdWV1ZS5hZGQoaXRlbSwgdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IDEgLyBpdGVtLmdldFNwZWVkKCkpO1xuICAgICAgICByZXR1cm4gc3VwZXIuYWRkKGl0ZW0sIHJlcGVhdCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUgUk9ULlNjaGVkdWxlciNuZXh0XG4gICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnQgJiYgdGhpcy5fcmVwZWF0LmluZGV4T2YodGhpcy5fY3VycmVudCkgIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlLmFkZCh0aGlzLl9jdXJyZW50LCAxIC8gdGhpcy5fY3VycmVudC5nZXRTcGVlZCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIubmV4dCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBSTkcgZnJvbSBcIi4vcm5nLmpzXCI7XG4vKipcbiAqIEBjbGFzcyAoTWFya292IHByb2Nlc3MpLWJhc2VkIHN0cmluZyBnZW5lcmF0b3IuXG4gKiBDb3BpZWQgZnJvbSBhIDxhIGhyZWY9XCJodHRwOi8vd3d3LnJvZ3VlYmFzaW4ucm9ndWVsaWtlZGV2ZWxvcG1lbnQub3JnL2luZGV4LnBocD90aXRsZT1OYW1lc19mcm9tX2FfaGlnaF9vcmRlcl9NYXJrb3ZfUHJvY2Vzc19hbmRfYV9zaW1wbGlmaWVkX0thdHpfYmFjay1vZmZfc2NoZW1lXCI+Um9ndWVCYXNpbiBhcnRpY2xlPC9hPi5cbiAqIE9mZmVycyBjb25maWd1cmFibGUgb3JkZXIgYW5kIHByaW9yLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHJpbmdHZW5lcmF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHdvcmRzOiBmYWxzZSxcbiAgICAgICAgICAgIG9yZGVyOiAzLFxuICAgICAgICAgICAgcHJpb3I6IDAuMDAxXG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2JvdW5kYXJ5ID0gU3RyaW5nLmZyb21DaGFyQ29kZSgwKTtcbiAgICAgICAgdGhpcy5fc3VmZml4ID0gdGhpcy5fYm91bmRhcnk7XG4gICAgICAgIHRoaXMuX3ByZWZpeCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX29wdGlvbnMub3JkZXI7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fcHJlZml4LnB1c2godGhpcy5fYm91bmRhcnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ByaW9yVmFsdWVzID0ge307XG4gICAgICAgIHRoaXMuX3ByaW9yVmFsdWVzW3RoaXMuX2JvdW5kYXJ5XSA9IHRoaXMuX29wdGlvbnMucHJpb3I7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBsZWFybmluZyBkYXRhXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICAgICAgdGhpcy5fcHJpb3JWYWx1ZXMgPSB7fTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ30gR2VuZXJhdGVkIHN0cmluZ1xuICAgICAqL1xuICAgIGdlbmVyYXRlKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW3RoaXMuX3NhbXBsZSh0aGlzLl9wcmVmaXgpXTtcbiAgICAgICAgd2hpbGUgKHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gIT0gdGhpcy5fYm91bmRhcnkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuX3NhbXBsZShyZXN1bHQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fam9pbihyZXN1bHQuc2xpY2UoMCwgLTEpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT2JzZXJ2ZSAobGVhcm4pIGEgc3RyaW5nIGZyb20gYSB0cmFpbmluZyBzZXRcbiAgICAgKi9cbiAgICBvYnNlcnZlKHN0cmluZykge1xuICAgICAgICBsZXQgdG9rZW5zID0gdGhpcy5fc3BsaXQoc3RyaW5nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3ByaW9yVmFsdWVzW3Rva2Vuc1tpXV0gPSB0aGlzLl9vcHRpb25zLnByaW9yO1xuICAgICAgICB9XG4gICAgICAgIHRva2VucyA9IHRoaXMuX3ByZWZpeC5jb25jYXQodG9rZW5zKS5jb25jYXQodGhpcy5fc3VmZml4KTsgLyogYWRkIGJvdW5kYXJ5IHN5bWJvbHMgKi9cbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX29wdGlvbnMub3JkZXI7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gdG9rZW5zLnNsaWNlKGkgLSB0aGlzLl9vcHRpb25zLm9yZGVyLCBpKTtcbiAgICAgICAgICAgIGxldCBldmVudCA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29udGV4dC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGxldCBzdWJjb250ZXh0ID0gY29udGV4dC5zbGljZShqKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vYnNlcnZlRXZlbnQoc3ViY29udGV4dCwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGdldFN0YXRzKCkge1xuICAgICAgICBsZXQgcGFydHMgPSBbXTtcbiAgICAgICAgbGV0IHByaW9yQ291bnQgPSBPYmplY3Qua2V5cyh0aGlzLl9wcmlvclZhbHVlcykubGVuZ3RoO1xuICAgICAgICBwcmlvckNvdW50LS07IC8vIGJvdW5kYXJ5XG4gICAgICAgIHBhcnRzLnB1c2goXCJkaXN0aW5jdCBzYW1wbGVzOiBcIiArIHByaW9yQ291bnQpO1xuICAgICAgICBsZXQgZGF0YUNvdW50ID0gT2JqZWN0LmtleXModGhpcy5fZGF0YSkubGVuZ3RoO1xuICAgICAgICBsZXQgZXZlbnRDb3VudCA9IDA7XG4gICAgICAgIGZvciAobGV0IHAgaW4gdGhpcy5fZGF0YSkge1xuICAgICAgICAgICAgZXZlbnRDb3VudCArPSBPYmplY3Qua2V5cyh0aGlzLl9kYXRhW3BdKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChcImRpY3Rpb25hcnkgc2l6ZSAoY29udGV4dHMpOiBcIiArIGRhdGFDb3VudCk7XG4gICAgICAgIHBhcnRzLnB1c2goXCJkaWN0aW9uYXJ5IHNpemUgKGV2ZW50cyk6IFwiICsgZXZlbnRDb3VudCk7XG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiLCBcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cbiAgICBfc3BsaXQoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIuc3BsaXQodGhpcy5fb3B0aW9ucy53b3JkcyA/IC9cXHMrLyA6IFwiXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgX2pvaW4oYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnIuam9pbih0aGlzLl9vcHRpb25zLndvcmRzID8gXCIgXCIgOiBcIlwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gY29udGV4dFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgICAqL1xuICAgIF9vYnNlcnZlRXZlbnQoY29udGV4dCwgZXZlbnQpIHtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuX2pvaW4oY29udGV4dCk7XG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLl9kYXRhKSkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YVtrZXldID0ge307XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9kYXRhW2tleV07XG4gICAgICAgIGlmICghKGV2ZW50IGluIGRhdGEpKSB7XG4gICAgICAgICAgICBkYXRhW2V2ZW50XSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtldmVudF0rKztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIF9zYW1wbGUoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0ID0gdGhpcy5fYmFja29mZihjb250ZXh0KTtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuX2pvaW4oY29udGV4dCk7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fZGF0YVtrZXldO1xuICAgICAgICBsZXQgYXZhaWxhYmxlID0ge307XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnByaW9yKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBldmVudCBpbiB0aGlzLl9wcmlvclZhbHVlcykge1xuICAgICAgICAgICAgICAgIGF2YWlsYWJsZVtldmVudF0gPSB0aGlzLl9wcmlvclZhbHVlc1tldmVudF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBldmVudCBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlW2V2ZW50XSArPSBkYXRhW2V2ZW50XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJORy5nZXRXZWlnaHRlZFZhbHVlKGF2YWlsYWJsZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119XG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuICAgIF9iYWNrb2ZmKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gdGhpcy5fb3B0aW9ucy5vcmRlcikge1xuICAgICAgICAgICAgY29udGV4dCA9IGNvbnRleHQuc2xpY2UoLXRoaXMuX29wdGlvbnMub3JkZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbnRleHQubGVuZ3RoIDwgdGhpcy5fb3B0aW9ucy5vcmRlcikge1xuICAgICAgICAgICAgY29udGV4dCA9IHRoaXMuX3ByZWZpeC5zbGljZSgwLCB0aGlzLl9vcHRpb25zLm9yZGVyIC0gY29udGV4dC5sZW5ndGgpLmNvbmNhdChjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoISh0aGlzLl9qb2luKGNvbnRleHQpIGluIHRoaXMuX2RhdGEpICYmIGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29udGV4dCA9IGNvbnRleHQuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRleHQ7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAbmFtZXNwYWNlXG4gKiBDb250YWlucyB0ZXh0IHRva2VuaXphdGlvbiBhbmQgYnJlYWtpbmcgcm91dGluZXNcbiAqL1xuY29uc3QgUkVfQ09MT1JTID0gLyUoW2JjXSl7KFtefV0qKX0vZztcbi8vIHRva2VuIHR5cGVzXG5leHBvcnQgY29uc3QgVFlQRV9URVhUID0gMDtcbmV4cG9ydCBjb25zdCBUWVBFX05FV0xJTkUgPSAxO1xuZXhwb3J0IGNvbnN0IFRZUEVfRkcgPSAyO1xuZXhwb3J0IGNvbnN0IFRZUEVfQkcgPSAzO1xuLyoqXG4gKiBNZWFzdXJlIHNpemUgb2YgYSByZXN1bHRpbmcgdGV4dCBibG9ja1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWVhc3VyZShzdHIsIG1heFdpZHRoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHsgd2lkdGg6IDAsIGhlaWdodDogMSB9O1xuICAgIGxldCB0b2tlbnMgPSB0b2tlbml6ZShzdHIsIG1heFdpZHRoKTtcbiAgICBsZXQgbGluZVdpZHRoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBUWVBFX1RFWFQ6XG4gICAgICAgICAgICAgICAgbGluZVdpZHRoICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVFlQRV9ORVdMSU5FOlxuICAgICAgICAgICAgICAgIHJlc3VsdC5oZWlnaHQrKztcbiAgICAgICAgICAgICAgICByZXN1bHQud2lkdGggPSBNYXRoLm1heChyZXN1bHQud2lkdGgsIGxpbmVXaWR0aCk7XG4gICAgICAgICAgICAgICAgbGluZVdpZHRoID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQud2lkdGggPSBNYXRoLm1heChyZXN1bHQud2lkdGgsIGxpbmVXaWR0aCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQ29udmVydCBzdHJpbmcgdG8gYSBzZXJpZXMgb2YgYSBmb3JtYXR0aW5nIGNvbW1hbmRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2tlbml6ZShzdHIsIG1heFdpZHRoKSB7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIC8qIGZpcnN0IHRva2VuaXphdGlvbiBwYXNzIC0gc3BsaXQgdGV4dHMgYW5kIGNvbG9yIGZvcm1hdHRpbmcgY29tbWFuZHMgKi9cbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBzdHIucmVwbGFjZShSRV9DT0xPUlMsIGZ1bmN0aW9uIChtYXRjaCwgdHlwZSwgbmFtZSwgaW5kZXgpIHtcbiAgICAgICAgLyogc3RyaW5nIGJlZm9yZSAqL1xuICAgICAgICBsZXQgcGFydCA9IHN0ci5zdWJzdHJpbmcob2Zmc2V0LCBpbmRleCk7XG4gICAgICAgIGlmIChwYXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IFRZUEVfVEVYVCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcGFydFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyogY29sb3IgY29tbWFuZCAqL1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAodHlwZSA9PSBcImNcIiA/IFRZUEVfRkcgOiBUWVBFX0JHKSxcbiAgICAgICAgICAgIHZhbHVlOiBuYW1lLnRyaW0oKVxuICAgICAgICB9KTtcbiAgICAgICAgb2Zmc2V0ID0gaW5kZXggKyBtYXRjaC5sZW5ndGg7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH0pO1xuICAgIC8qIGxhc3QgcmVtYWluaW5nIHBhcnQgKi9cbiAgICBsZXQgcGFydCA9IHN0ci5zdWJzdHJpbmcob2Zmc2V0KTtcbiAgICBpZiAocGFydC5sZW5ndGgpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgdHlwZTogVFlQRV9URVhULFxuICAgICAgICAgICAgdmFsdWU6IHBhcnRcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBicmVha0xpbmVzKHJlc3VsdCwgbWF4V2lkdGgpO1xufVxuLyogaW5zZXJ0IGxpbmUgYnJlYWtzIGludG8gZmlyc3QtcGFzcyB0b2tlbml6ZWQgZGF0YSAqL1xuZnVuY3Rpb24gYnJlYWtMaW5lcyh0b2tlbnMsIG1heFdpZHRoKSB7XG4gICAgaWYgKCFtYXhXaWR0aCkge1xuICAgICAgICBtYXhXaWR0aCA9IEluZmluaXR5O1xuICAgIH1cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxpbmVMZW5ndGggPSAwO1xuICAgIGxldCBsYXN0VG9rZW5XaXRoU3BhY2UgPSAtMTtcbiAgICB3aGlsZSAoaSA8IHRva2Vucy5sZW5ndGgpIHsgLyogdGFrZSBhbGwgdGV4dCB0b2tlbnMsIHJlbW92ZSBzcGFjZSwgYXBwbHkgbGluZWJyZWFrcyAqL1xuICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgIGlmICh0b2tlbi50eXBlID09IFRZUEVfTkVXTElORSkgeyAvKiByZXNldCAqL1xuICAgICAgICAgICAgbGluZUxlbmd0aCA9IDA7XG4gICAgICAgICAgICBsYXN0VG9rZW5XaXRoU3BhY2UgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9rZW4udHlwZSAhPSBUWVBFX1RFWFQpIHsgLyogc2tpcCBub24tdGV4dCB0b2tlbnMgKi9cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8qIHJlbW92ZSBzcGFjZXMgYXQgdGhlIGJlZ2lubmluZyBvZiBsaW5lICovXG4gICAgICAgIHdoaWxlIChsaW5lTGVuZ3RoID09IDAgJiYgdG9rZW4udmFsdWUuY2hhckF0KDApID09IFwiIFwiKSB7XG4gICAgICAgICAgICB0b2tlbi52YWx1ZSA9IHRva2VuLnZhbHVlLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuICAgICAgICAvKiBmb3JjZWQgbmV3bGluZT8gaW5zZXJ0IHR3byBuZXcgdG9rZW5zIGFmdGVyIHRoaXMgb25lICovXG4gICAgICAgIGxldCBpbmRleCA9IHRva2VuLnZhbHVlLmluZGV4T2YoXCJcXG5cIik7XG4gICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgdG9rZW4udmFsdWUgPSBicmVha0luc2lkZVRva2VuKHRva2VucywgaSwgaW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgLyogaWYgdGhlcmUgYXJlIHNwYWNlcyBhdCB0aGUgZW5kLCB3ZSBtdXN0IHJlbW92ZSB0aGVtICh3ZSBkbyBub3Qgd2FudCB0aGUgbGluZSB0b28gbG9uZykgKi9cbiAgICAgICAgICAgIGxldCBhcnIgPSB0b2tlbi52YWx1ZS5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgIHdoaWxlIChhcnIubGVuZ3RoICYmIGFyclthcnIubGVuZ3RoIC0gMV0gPT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICBhcnIucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbi52YWx1ZSA9IGFyci5qb2luKFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8qIHRva2VuIGRlZ2VuZXJhdGVkPyAqL1xuICAgICAgICBpZiAoIXRva2VuLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgdG9rZW5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW5lTGVuZ3RoICsgdG9rZW4udmFsdWUubGVuZ3RoID4gbWF4V2lkdGgpIHsgLyogbGluZSB0b28gbG9uZywgZmluZCBhIHN1aXRhYmxlIGJyZWFraW5nIHNwb3QgKi9cbiAgICAgICAgICAgIC8qIGlzIGl0IHBvc3NpYmxlIHRvIGJyZWFrIHdpdGhpbiB0aGlzIHRva2VuPyAqL1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXh0SW5kZXggPSB0b2tlbi52YWx1ZS5pbmRleE9mKFwiIFwiLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsaW5lTGVuZ3RoICsgbmV4dEluZGV4ID4gbWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGV4ID0gbmV4dEluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4ICE9IC0xKSB7IC8qIGJyZWFrIGF0IHNwYWNlIHdpdGhpbiB0aGlzIG9uZSAqL1xuICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGksIGluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGxhc3RUb2tlbldpdGhTcGFjZSAhPSAtMSkgeyAvKiBpcyB0aGVyZSBhIHByZXZpb3VzIHRva2VuIHdoZXJlIGEgYnJlYWsgY2FuIG9jY3VyPyAqL1xuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IHRva2Vuc1tsYXN0VG9rZW5XaXRoU3BhY2VdO1xuICAgICAgICAgICAgICAgIGxldCBicmVha0luZGV4ID0gdG9rZW4udmFsdWUubGFzdEluZGV4T2YoXCIgXCIpO1xuICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlID0gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIGxhc3RUb2tlbldpdGhTcGFjZSwgYnJlYWtJbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaSA9IGxhc3RUb2tlbldpdGhTcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgeyAvKiBmb3JjZSBicmVhayBpbiB0aGlzIHRva2VuICovXG4gICAgICAgICAgICAgICAgdG9rZW4udmFsdWUgPSBicmVha0luc2lkZVRva2VuKHRva2VucywgaSwgbWF4V2lkdGggLSBsaW5lTGVuZ3RoLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7IC8qIGxpbmUgbm90IGxvbmcsIGNvbnRpbnVlICovXG4gICAgICAgICAgICBsaW5lTGVuZ3RoICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZS5pbmRleE9mKFwiIFwiKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIGxhc3RUb2tlbldpdGhTcGFjZSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaSsrOyAvKiBhZHZhbmNlIHRvIG5leHQgdG9rZW4gKi9cbiAgICB9XG4gICAgdG9rZW5zLnB1c2goeyB0eXBlOiBUWVBFX05FV0xJTkUgfSk7IC8qIGluc2VydCBmYWtlIG5ld2xpbmUgdG8gZml4IHRoZSBsYXN0IHRleHQgbGluZSAqL1xuICAgIC8qIHJlbW92ZSB0cmFpbGluZyBzcGFjZSBmcm9tIHRleHQgdG9rZW5zIGJlZm9yZSBuZXdsaW5lcyAqL1xuICAgIGxldCBsYXN0VGV4dFRva2VuID0gbnVsbDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBUWVBFX1RFWFQ6XG4gICAgICAgICAgICAgICAgbGFzdFRleHRUb2tlbiA9IHRva2VuO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUWVBFX05FV0xJTkU6XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RUZXh0VG9rZW4pIHsgLyogcmVtb3ZlIHRyYWlsaW5nIHNwYWNlICovXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnIgPSBsYXN0VGV4dFRva2VuLnZhbHVlLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoYXJyLmxlbmd0aCAmJiBhcnJbYXJyLmxlbmd0aCAtIDFdID09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGFzdFRleHRUb2tlbi52YWx1ZSA9IGFyci5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0VGV4dFRva2VuID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2tlbnMucG9wKCk7IC8qIHJlbW92ZSBmYWtlIHRva2VuICovXG4gICAgcmV0dXJuIHRva2Vucztcbn1cbi8qKlxuICogQ3JlYXRlIG5ldyB0b2tlbnMgYW5kIGluc2VydCB0aGVtIGludG8gdGhlIHN0cmVhbVxuICogQHBhcmFtIHtvYmplY3RbXX0gdG9rZW5zXG4gKiBAcGFyYW0ge2ludH0gdG9rZW5JbmRleCBUb2tlbiBiZWluZyBwcm9jZXNzZWRcbiAqIEBwYXJhbSB7aW50fSBicmVha0luZGV4IEluZGV4IHdpdGhpbiBjdXJyZW50IHRva2VuJ3MgdmFsdWVcbiAqIEBwYXJhbSB7Ym9vbH0gcmVtb3ZlQnJlYWtDaGFyIERvIHdlIHdhbnQgdG8gcmVtb3ZlIHRoZSBicmVha2luZyBjaGFyYWN0ZXI/XG4gKiBAcmV0dXJucyB7c3RyaW5nfSByZW1haW5pbmcgdW5icm9rZW4gdG9rZW4gdmFsdWVcbiAqL1xuZnVuY3Rpb24gYnJlYWtJbnNpZGVUb2tlbih0b2tlbnMsIHRva2VuSW5kZXgsIGJyZWFrSW5kZXgsIHJlbW92ZUJyZWFrQ2hhcikge1xuICAgIGxldCBuZXdCcmVha1Rva2VuID0ge1xuICAgICAgICB0eXBlOiBUWVBFX05FV0xJTkVcbiAgICB9O1xuICAgIGxldCBuZXdUZXh0VG9rZW4gPSB7XG4gICAgICAgIHR5cGU6IFRZUEVfVEVYVCxcbiAgICAgICAgdmFsdWU6IHRva2Vuc1t0b2tlbkluZGV4XS52YWx1ZS5zdWJzdHJpbmcoYnJlYWtJbmRleCArIChyZW1vdmVCcmVha0NoYXIgPyAxIDogMCkpXG4gICAgfTtcbiAgICB0b2tlbnMuc3BsaWNlKHRva2VuSW5kZXggKyAxLCAwLCBuZXdCcmVha1Rva2VuLCBuZXdUZXh0VG9rZW4pO1xuICAgIHJldHVybiB0b2tlbnNbdG9rZW5JbmRleF0udmFsdWUuc3Vic3RyaW5nKDAsIGJyZWFrSW5kZXgpO1xufVxuIiwiLyoqXG4gKiBBbHdheXMgcG9zaXRpdmUgbW9kdWx1c1xuICogQHBhcmFtIHggT3BlcmFuZFxuICogQHBhcmFtIG4gTW9kdWx1c1xuICogQHJldHVybnMgeCBtb2R1bG8gblxuICovXG5leHBvcnQgZnVuY3Rpb24gbW9kKHgsIG4pIHtcbiAgICByZXR1cm4gKHggJSBuICsgbikgJSBuO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wKHZhbCwgbWluID0gMCwgbWF4ID0gMSkge1xuICAgIGlmICh2YWwgPCBtaW4pXG4gICAgICAgIHJldHVybiBtaW47XG4gICAgaWYgKHZhbCA+IG1heClcbiAgICAgICAgcmV0dXJuIG1heDtcbiAgICByZXR1cm4gdmFsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zdWJzdHJpbmcoMSk7XG59XG4vKipcbiAqIEZvcm1hdCBhIHN0cmluZyBpbiBhIGZsZXhpYmxlIHdheS4gU2NhbnMgZm9yICVzIHN0cmluZ3MgYW5kIHJlcGxhY2VzIHRoZW0gd2l0aCBhcmd1bWVudHMuIExpc3Qgb2YgcGF0dGVybnMgaXMgbW9kaWZpYWJsZSB2aWEgU3RyaW5nLmZvcm1hdC5tYXAuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGVtcGxhdGVcbiAqIEBwYXJhbSB7YW55fSBbYXJndl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdCh0ZW1wbGF0ZSwgLi4uYXJncykge1xuICAgIGxldCBtYXAgPSBmb3JtYXQubWFwO1xuICAgIGxldCByZXBsYWNlciA9IGZ1bmN0aW9uIChtYXRjaCwgZ3JvdXAxLCBncm91cDIsIGluZGV4KSB7XG4gICAgICAgIGlmICh0ZW1wbGF0ZS5jaGFyQXQoaW5kZXggLSAxKSA9PSBcIiVcIikge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9iaiA9IGFyZ3NbMF07XG4gICAgICAgIGxldCBncm91cCA9IGdyb3VwMSB8fCBncm91cDI7XG4gICAgICAgIGxldCBwYXJ0cyA9IGdyb3VwLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgbGV0IG5hbWUgPSBwYXJ0cy5zaGlmdCgpIHx8IFwiXCI7XG4gICAgICAgIGxldCBtZXRob2QgPSBtYXBbbmFtZS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgaWYgKCFtZXRob2QpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuICAgICAgICBvYmogPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIGxldCByZXBsYWNlZCA9IG9ialttZXRob2RdLmFwcGx5KG9iaiwgcGFydHMpO1xuICAgICAgICBsZXQgZmlyc3QgPSBuYW1lLmNoYXJBdCgwKTtcbiAgICAgICAgaWYgKGZpcnN0ICE9IGZpcnN0LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIHJlcGxhY2VkID0gY2FwaXRhbGl6ZShyZXBsYWNlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcGxhY2VkO1xuICAgIH07XG4gICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoLyUoPzooW2Etel0rKXwoPzp7KFtefV0rKX0pKS9naSwgcmVwbGFjZXIpO1xufVxuZm9ybWF0Lm1hcCA9IHtcbiAgICBcInNcIjogXCJ0b1N0cmluZ1wiXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEZPViwgRElSUywgUk5HLCBQYXRoIH0gZnJvbSBcInJvdC1qc1wiO1xuXG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiLi9nbG9iYWxzXCI7XG5pbXBvcnQgeyBpc0Jsb2NrZWQsIGlzU2lnaHRCbG9ja2VkLCBmaW5kRW1wdHlTcGFjZSB9IGZyb20gXCIuL21hcFwiO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGlmIGFuIHggYW5kIHkgY29vcmRpbmF0ZVxuICogcmVwcmVzZW50cyBhIHBhc3NhYmxlIHNwb3Qgb24gdGhlIG1hcC5cbiAqXG4gKiBAcGFyYW0gIHtHYW1lT2JqZWN0fSBvd25lciBUaGUgZ2FtZSBvYmplY3QgdG8gYmUgdXNlZCB3aXRoIHRoaXMgZnVuY3Rpb25cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSAgICAgICAgIHRoZSBjYWxsYmFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGFzc2FibGVDYWxsYmFjayhvd25lcikge1xuICAgIHJldHVybiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIC8vIG93biBzcGFjZSBpcyBwYXNzYWJsZVxuICAgICAgICBpZiAob3duZXIueCA9PT0geCAmJiBvd25lci55ID09PSB5KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNCbG9ja2VkKGdsb2JhbHMuR2FtZS5tYXAsIGdsb2JhbHMuR2FtZS5nYW1lT2JqZWN0cywgeCwgeSkgPT09IG51bGw7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBpZiBhbiB4IGFuZCB5IGNvb3JkaW5hdGVcbiAqIHJlcHJlc2VudHMgYSBzcG90IG9uIHRoZSBtYXAgd2hpY2ggY2FuIGJlIHNlZW4gdGhyb3VnaC5cbiAqXG4gKiBAcGFyYW0gIHtHYW1lT2JqZWN0fSBvd25lciBUaGUgZ2FtZSBvYmplY3QgdG8gYmUgdXNlZCB3aXRoIHRoaXMgZnVuY3Rpb25cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSAgICAgICAgIHRoZSBjYWxsYmFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGFzc2FibGVTaWdodENhbGxiYWNrKG93bmVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgLy8gb3duIHNwYWNlIGlzIHBhc3NhYmxlXG4gICAgICAgIGlmIChvd25lci54ID09PSB4ICYmIG93bmVyLnkgPT09IHkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1NpZ2h0QmxvY2tlZChnbG9iYWxzLkdhbWUubWFwLCBnbG9iYWxzLkdhbWUuZ2FtZU9iamVjdHMsIHgsIHkpID09PSBmYWxzZTtcbiAgICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB3aGljaCBjaGVja3MgaWYgdGhlIEdhbWUgcGxheWVyIG9iamVjdFxuICogaXMgdmlzaWJsZSBvciBub3QgYW5kIHNldHMgdGhlIEFJIHRvIHRoZSBjaGFzZSBzdGF0ZSBpZiBpdFxuICogaXMuXG4gKlxuICogQHBhcmFtICB7R2FtZU9iamVjdH0gb3duZXIgVGhlIGdhbWUgb2JqZWN0IHRvIGJlIHVzZWQgd2l0aCB0aGlzIGZ1bmN0aW9uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gICAgICAgICB0aGUgY2FsbGJhY2tcbiAqL1xuY29uc3QgY3JlYXRlVmlzaWJpbGl0eUNhbGxiYWNrID0gZnVuY3Rpb24gKGFpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHgsIHksIHIsIHZpc2liaWxpdHkpIHtcbiAgICAgICAgaWYgKHggPT09IGdsb2JhbHMuR2FtZS5wbGF5ZXIueCAmJiB5ID09PSBnbG9iYWxzLkdhbWUucGxheWVyLnkgJiYgdmlzaWJpbGl0eSA+IDApIHtcbiAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShhaS5vd25lci5uYW1lICsgXCIgc2F3IHlvdVwiKTtcbiAgICAgICAgICAgIGFpLnN0YXRlID0gXCJjaGFzZVwiO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbi8qKlxuICogQmFzaWMgbW9uc3RlciBiZWhhdmlvciB3aXRoIHR3byBzdGF0ZXMsIGNoYXNlIGFuZCB3YW5kZXIuXG4gKiBEZWZhdWx0IHN0YXRlIGlzIHdhbmRlciwgd2hpY2gganVzdCBjaG9vc2VzIGEgcmFuZG9tIGRpcmVjdGlvblxuICogc2VlcyBpZiBpdCdzIGVtcHR5LCBhbmQgbW92ZXMgaWYgaXQgaXMuXG4gKiBcbiAqIFVzZXMgYSBkZWZpbmFibGUgc2lnaHQgcmFuZ2UgdG8gY2hlY2sgaWYgYSB0YXJnZXQgaXMgaW4gcmFuZ2UuXG4gKiBJZiBvbmUgaXMgdGhpcyBzd2l0Y2hlcyB0byBjaGFzZSB3aGljaCB1c2VzIEEqIHRvIGdvIHRvd2FyZHNcbiAqIHRoZSB0YXJnZXQuIEF0dGFja3MgdGhlIHRhcmdldCB3aGVuIGl0J3Mgd2l0aGluIG9uZSB0aWxlIGZyb20gaXRcbiAqL1xuY2xhc3MgQmFzaWNNb25zdGVyQUkge1xuICAgIGNvbnN0cnVjdG9yKHNpZ2h0UmFuZ2UpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBcIndhbmRlclwiO1xuICAgICAgICB0aGlzLnNpZ2h0UmFuZ2UgPSBzaWdodFJhbmdlO1xuICAgIH1cblxuICAgIHNldE93bmVyKG93bmVyKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG5cbiAgICBhY3QoKSB7XG4gICAgICAgIC8vIHdhbmRlciBpbiByYW5kb20gZGlyZWN0aW9uc1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gXCJ3YW5kZXJcIikge1xuICAgICAgICAgICAgLy8gY29tcHV0ZSB0aGUgRk9WIHRvIHNlZSBpZiB0aGUgcGxheWVyIGlzIHNpZ2h0ZWRcbiAgICAgICAgICAgIGNvbnN0IGZvdiA9IG5ldyBGT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcoY3JlYXRlUGFzc2FibGVTaWdodENhbGxiYWNrKHRoaXMub3duZXIpKTtcbiAgICAgICAgICAgIGZvdi5jb21wdXRlKHRoaXMub3duZXIueCwgdGhpcy5vd25lci55LCB0aGlzLnNpZ2h0UmFuZ2UsIGNyZWF0ZVZpc2liaWxpdHlDYWxsYmFjayh0aGlzKSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRpciA9IERJUlNbOF1bUk5HLmdldEl0ZW0oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDddKV07XG4gICAgICAgICAgICBjb25zdCBuZXdYID0gdGhpcy5vd25lci54ICsgZGlyWzBdO1xuICAgICAgICAgICAgY29uc3QgbmV3WSA9IHRoaXMub3duZXIueSArIGRpclsxXTtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGlzQmxvY2tlZChnbG9iYWxzLkdhbWUubWFwLCBnbG9iYWxzLkdhbWUuZ2FtZU9iamVjdHMsIG5ld1gsIG5ld1kpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm93bmVyLnggPSBuZXdYO1xuICAgICAgICAgICAgdGhpcy5vd25lci55ID0gbmV3WTtcbiAgICAgICAgLy8gY2hhc2UgdGhlIHBsYXllciB3aXRoIEEqXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gXCJjaGFzZVwiKSB7XG4gICAgICAgICAgICBsZXQgeCA9IGdsb2JhbHMuR2FtZS5wbGF5ZXIueDtcbiAgICAgICAgICAgIGxldCB5ID0gZ2xvYmFscy5HYW1lLnBsYXllci55O1xuICAgICAgICAgICAgbGV0IGFzdGFyID0gbmV3IFBhdGguQVN0YXIoXG4gICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgIGNyZWF0ZVBhc3NhYmxlQ2FsbGJhY2sodGhpcy5vd25lciksXG4gICAgICAgICAgICAgICAgeyB0b3BvbG9neTogOCB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgcGF0aCA9IFtdO1xuICAgICAgICAgICAgbGV0IHBhdGhDYWxsYmFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgICAgICAgICBwYXRoLnB1c2goW3gsIHldKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhc3Rhci5jb21wdXRlKHRoaXMub3duZXIueCwgdGhpcy5vd25lci55LCBwYXRoQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgb3VyIG93biBwb3NpdGlvblxuICAgICAgICAgICAgcGF0aC5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmZpZ2h0ZXIuYXR0YWNrKGdsb2JhbHMuR2FtZS5wbGF5ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHggPSBwYXRoWzBdWzBdO1xuICAgICAgICAgICAgICAgIHkgPSBwYXRoWzBdWzFdO1xuICAgICAgICAgICAgICAgIHRoaXMub3duZXIueCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci55ID0geTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBNb3JlIGNvbXBsZXggbW9uc3RlciBiZWhhdmlvciB3aXRoIHR3byBzdGF0ZXMsIGNoYXNlIGFuZCBwYXRyb2wuXG4gKiBUaGUgZGVmYXVsdCBzdGF0ZSwgcGF0cm9sLCBjaG9vc2VzIGEgcmFuZG9tIGVtcHR5IHNwYWNlIGluIHRoZVxuICogbWFwIGFuZCB1c2VzIEEqIHRvIGdvIHRoZXJlLlxuICpcbiAqIFVzZXMgYSBkZWZpbmFibGUgc2lnaHQgcmFuZ2UgdG8gY2hlY2sgaWYgYSB0YXJnZXQgaXMgaW4gcmFuZ2UuXG4gKiBJZiBvbmUgaXMgdGhpcyBzd2l0Y2hlcyB0byBjaGFzZSB3aGljaCB1c2VzIEEqIHRvIGdvIHRvd2FyZHNcbiAqIHRoZSB0YXJnZXQuIEF0dGFja3MgdGhlIHRhcmdldCB3aGVuIGl0J3Mgd2l0aGluIG9uZSB0aWxlIGZyb20gaXRcbiAqL1xuY2xhc3MgUGF0cm9sbGluZ01vbnN0ZXJBSSB7XG4gICAgY29uc3RydWN0b3Ioc2lnaHRSYW5nZSkge1xuICAgICAgICB0aGlzLm93bmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwicGF0cm9sXCI7XG4gICAgICAgIHRoaXMuc2lnaHRSYW5nZSA9IHNpZ2h0UmFuZ2U7XG4gICAgICAgIHRoaXMucGF0cm9sVGFyZ2V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgYWN0KCkge1xuICAgICAgICAvLyBjaG9vc2UgYSByYW5kb20gc3BvdCBvcGVuIGluIHRoZSBtYXAgYW5kIGdvIHRoZXJlXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBcInBhdHJvbFwiKSB7XG4gICAgICAgICAgICAvLyBjb21wdXRlIHRoZSBGT1YgdG8gc2VlIGlmIHRoZSBwbGF5ZXIgaXMgc2lnaHRlZFxuICAgICAgICAgICAgY29uc3QgZm92ID0gbmV3IEZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZyhjcmVhdGVQYXNzYWJsZVNpZ2h0Q2FsbGJhY2sodGhpcy5vd25lcikpO1xuICAgICAgICAgICAgZm92LmNvbXB1dGUodGhpcy5vd25lci54LCB0aGlzLm93bmVyLnksIHRoaXMuc2lnaHRSYW5nZSwgY3JlYXRlVmlzaWJpbGl0eUNhbGxiYWNrKHRoaXMpKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGF0cm9sVGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xUYXJnZXQgPSBmaW5kRW1wdHlTcGFjZShnbG9iYWxzLkdhbWUubWFwLCBnbG9iYWxzLkdhbWUuZ2FtZU9iamVjdHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBhc3RhciA9IG5ldyBQYXRoLkFTdGFyKFxuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sVGFyZ2V0LngsXG4gICAgICAgICAgICAgICAgdGhpcy5wYXRyb2xUYXJnZXQueSxcbiAgICAgICAgICAgICAgICBjcmVhdGVQYXNzYWJsZUNhbGxiYWNrKHRoaXMub3duZXIpLFxuICAgICAgICAgICAgICAgIHsgdG9wb2xvZ3k6IDggfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgbGV0IHBhdGggPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHBhdGhDYWxsYmFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgICAgICAgICBwYXRoLnB1c2goW3gsIHldKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhc3Rhci5jb21wdXRlKHRoaXMub3duZXIueCwgdGhpcy5vd25lci55LCBwYXRoQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICBwYXRoLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGF0cm9sVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3duZXIueCA9IHBhdGhbMF1bMF07XG4gICAgICAgICAgICB0aGlzLm93bmVyLnkgPSBwYXRoWzBdWzFdO1xuICAgICAgICAvLyBjaGFzZSB0aGUgcGxheWVyIHdpdGggQSpcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09PSBcImNoYXNlXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGFzdGFyID0gbmV3IFBhdGguQVN0YXIoXG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLnBsYXllci54LFxuICAgICAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5wbGF5ZXIueSxcbiAgICAgICAgICAgICAgICBjcmVhdGVQYXNzYWJsZVNpZ2h0Q2FsbGJhY2sodGhpcy5vd25lciksXG4gICAgICAgICAgICAgICAgeyB0b3BvbG9neTogOCB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBsZXQgcGF0aCA9IFtdO1xuICAgICAgICAgICAgbGV0IHBhdGhDYWxsYmFjayA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgICAgICAgICBwYXRoLnB1c2goW3gsIHldKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBhc3Rhci5jb21wdXRlKHRoaXMub3duZXIueCwgdGhpcy5vd25lci55LCBwYXRoQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgb3VyIG93biBwb3NpdGlvblxuICAgICAgICAgICAgcGF0aC5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKHBhdGgubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmZpZ2h0ZXIuYXR0YWNrKGdsb2JhbHMuR2FtZS5wbGF5ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub3duZXIueCA9IHBhdGhbMF1bMF07XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci55ID0gcGF0aFswXVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBSSBjb21wb25lbnQgd2hpY2ggc3RvcmVzIHRoZSBwcmV2aW91cyBBSSBmcm9tIHRoZSBvd25lci5cbiAqIEdvZXMgaW4gcmFuZG9tIGRpcmVjdGlvbnMgZm9yIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGFjdFxuICogY2FsbHMuIFRoZW4sIHJlcGxhY2VzIGl0c2VsZiBvbiB0aGUgb3duZXIgd2l0aCB0aGUgcHJldmlvdXNcbiAqIEFJIGNvbXBvbmVudCBvbiB0aGUgb3duZXIuXG4gKi9cbmNsYXNzIENvbmZ1c2VkQUkge1xuICAgIGNvbnN0cnVjdG9yKGN1cnJlbnRBSSwgdHVybnMpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG51bGw7XG4gICAgICAgIHRoaXMub2xkQUkgPSBjdXJyZW50QUk7XG4gICAgICAgIHRoaXMudHVybnMgPSB0dXJucztcbiAgICB9XG5cbiAgICBhY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLnR1cm5zID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZGlyID0gRElSU1s0XVtSTkcuZ2V0SXRlbShbMCwgMSwgMiwgM10pXTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ggPSB0aGlzLm93bmVyLnggKyBkaXJbMF07XG4gICAgICAgICAgICBjb25zdCBuZXdZID0gdGhpcy5vd25lci55ICsgZGlyWzFdO1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gaXNCbG9ja2VkKGdsb2JhbHMuR2FtZS5tYXAsIGdsb2JhbHMuR2FtZS5nYW1lT2JqZWN0cywgbmV3WCwgbmV3WSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0YXJnZXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMub3duZXIueCA9IG5ld1g7XG4gICAgICAgICAgICB0aGlzLm93bmVyLnkgPSBuZXdZO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMub3duZXIgPT09IGdsb2JhbHMuR2FtZS5wbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJZb3UgYXJlIG5vIGxvbmdlciBjb25mdXNlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKHRoaXMub3duZXIubmFtZSArIFwiIGlzIG5vIGxvbmdlciBjb25mdXNlZFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vd25lci5haSA9IHRoaXMub2xkQUk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50dXJucy0tO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBSSB3aGljaCBjaGFuZ2VzIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBvYmplY3Qgd2hlbiB0aGUgaW52ZW50b3J5XG4gKiBjb21wb25lbnQgaXMgZW1wdHlcbiAqL1xuY2xhc3MgQ2hlc3RBSSB7XG4gICAgY29uc3RydWN0b3IoYmdDb2xvciwgZW1wdHlDb2xvcikge1xuICAgICAgICB0aGlzLm93bmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5iZ0NvbG9yID0gYmdDb2xvcjtcbiAgICAgICAgdGhpcy5lbXB0eUNvbG9yID0gZW1wdHlDb2xvcjtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgYWN0KCkge1xuICAgICAgICBpZiAodGhpcy5vd25lciAmJiB0aGlzLm93bmVyLmludmVudG9yeUNvbXBvbmVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3duZXIuaW52ZW50b3J5Q29tcG9uZW50LmdldElEc0FuZENvdW50cygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3duZXIuZ3JhcGhpY3MuYmdDb2xvciA9IHRoaXMuZW1wdHlDb2xvcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci5ncmFwaGljcy5iZ0NvbG9yID0gdGhpcy5iZ0NvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1pc3NpbmcgaW52ZW50b3J5Q29tcG9uZW50IGZvciBDaGVzdEFJXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEFJIHdoaWNoIHJlbW92ZXMgdGhlIG93bmVyIGZyb20gdGhlIGdhbWUgd2hlbiB0aGUgaW52ZW50b3J5IGlzIGVtcHR5XG4gKi9cbmNsYXNzIERyb3BwZWRJdGVtQUkge1xuICAgIGNvbnN0cnVjdG9yKGJnQ29sb3IsIGVtcHR5Q29sb3IpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG51bGw7XG4gICAgICAgIHRoaXMuYmdDb2xvciA9IGJnQ29sb3I7XG4gICAgICAgIHRoaXMuZW1wdHlDb2xvciA9IGVtcHR5Q29sb3I7XG4gICAgfVxuXG4gICAgc2V0T3duZXIob3duZXIpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIH1cblxuICAgIGFjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3duZXIgJiYgdGhpcy5vd25lci5pbnZlbnRvcnlDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm93bmVyLmludmVudG9yeUNvbXBvbmVudC5nZXRJRHNBbmRDb3VudHMoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzLkdhbWUucmVtb3ZlT2JqZWN0KHRoaXMub3duZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1pc3NpbmcgaW52ZW50b3J5Q29tcG9uZW50IGZvciBEcm9wcGVkSXRlbUFJXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgeyBCYXNpY01vbnN0ZXJBSSwgUGF0cm9sbGluZ01vbnN0ZXJBSSwgQ29uZnVzZWRBSSwgQ2hlc3RBSSwgRHJvcHBlZEl0ZW1BSSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGNhc3RIZWFsLCBjYXN0Q29uZnVzZSwgY2FzdENsYWlydm95YW5jZSwgY2FzdERhbWFnZVNwZWxsLCBjYXN0V2lsZERhbWFnZVNwZWxsIH0gZnJvbSBcIi4vaXRlbXNcIjtcbmltcG9ydCB7IGNyZWF0ZUJ1cm5FZmZlY3QgfSBmcm9tIFwiLi9lZmZlY3RzXCI7XG5cbmV4cG9ydCBjb25zdCBXSURUSCA9IDcwO1xuZXhwb3J0IGNvbnN0IEhFSUdIVCA9IDQ1O1xuZXhwb3J0IGNvbnN0IFVJX0hFSUdIVCA9IDY7XG5leHBvcnQgY29uc3QgV09STERfV0lEVEggPSBXSURUSDtcbmV4cG9ydCBjb25zdCBXT1JMRF9IRUlHSFQgPSBIRUlHSFQgLSBVSV9IRUlHSFQgLSAxO1xuXG5leHBvcnQgY29uc3QgQ09MT1JfSU5WSVNJQkxFX1dBTEwgPSBcImJsYWNrXCI7XG5leHBvcnQgY29uc3QgQ09MT1JfREFSS19XQUxMID0gXCJyZ2IoMjAsIDIwLCAyMClcIjtcbmV4cG9ydCBjb25zdCBDT0xPUl9MSUdIVF9XQUxMID0gXCIjMzUyNjIwXCI7XG5leHBvcnQgY29uc3QgQ09MT1JfSU5WSVNJQkxFX0dST1VORCA9IFwiYmxhY2tcIjtcbmV4cG9ydCBjb25zdCBDT0xPUl9EQVJLX0dST1VORCA9IFwicmdiKDUwLCA1MCwgNTApXCI7XG5leHBvcnQgY29uc3QgQ09MT1JfTElHSFRfR1JPVU5EID0gXCJ3aGl0ZVwiO1xuZXhwb3J0IGNvbnN0IENPTE9SX0FNQklFTlRfTElHSFQgPSBcInJnYig1MCwgNTAsIDUwKVwiO1xuY29uc29sZS5sb2coXCJDT0xPUl9BTUJJRU5UX0xJR0hUXCIsIENPTE9SX0FNQklFTlRfTElHSFQpO1xuXG5leHBvcnQgY29uc3QgTUFQX0ZJTExFRF9TUEFDRSA9IFwiI1wiO1xuZXhwb3J0IGNvbnN0IE1BUF9FTVBUWV9TUEFDRSA9IFwiLlwiO1xuXG5leHBvcnQgY29uc3QgTEVWRUxfVVBfQkFTRSA9IDUwO1xuZXhwb3J0IGNvbnN0IExFVkVMX1VQX0ZBQ1RPUiA9IDE1MDtcblxuLyoqXG4gKiBEYW1hZ2UgdHlwZSBlbnVtXG4gKi9cbmV4cG9ydCBjb25zdCBEYW1hZ2VUeXBlID0ge1xuICAgIHBoeXNpY2FsOiAxLFxuICAgIGZpcmU6IDIsXG4gICAgbGlnaHRuaW5nOiAzLFxuICAgIGljZTogNCxcbiAgICBuYXR1cmU6IDVcbn07XG5PYmplY3QuZnJlZXplKERhbWFnZVR5cGUpO1xuXG4vKipcbiAqIERhbWFnZSBhZmZpbml0eSBkYW1hZ2UgbXVsdGlwbGllclxuICovXG5leHBvcnQgY29uc3QgQWZmaW5pdHkgPSB7XG4gICAgd2VhazogMC41LFxuICAgIG5vcm1hbDogMSxcbiAgICBzdHJvbmc6IDIsXG4gICAgbnVsbGlmaWVkOiAwXG59O1xuT2JqZWN0LmZyZWV6ZShBZmZpbml0eSk7XG5cbmV4cG9ydCBjb25zdCBUaWxlRGF0YSA9IHtcbiAgICA5MDA6IHtcbiAgICAgICAgbmFtZTogXCJlbXB0eSBncm91bmRcIixcbiAgICAgICAgY2hhcjogXCJcIixcbiAgICAgICAgZmdDb2xvcjogQ09MT1JfTElHSFRfR1JPVU5ELFxuICAgICAgICBiZ0NvbG9yOiBDT0xPUl9MSUdIVF9HUk9VTkQsXG4gICAgICAgIGZnQ29sb3JFeHBsb3JlZDogQ09MT1JfREFSS19HUk9VTkQsXG4gICAgICAgIGJnQ29sb3JFeHBsb3JlZDogQ09MT1JfREFSS19HUk9VTkQsXG4gICAgICAgIGJsb2NrczogZmFsc2UsXG4gICAgICAgIGJsb2Nrc1NpZ2h0OiBmYWxzZSxcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAwLjE4XG4gICAgfSxcbiAgICAxMDQ4OiB7XG4gICAgICAgIG5hbWU6IFwiQSB3YWxsXCIsXG4gICAgICAgIGNoYXI6IFwiXCIsXG4gICAgICAgIGZnQ29sb3I6IENPTE9SX0xJR0hUX1dBTEwsXG4gICAgICAgIGJnQ29sb3I6IENPTE9SX0xJR0hUX1dBTEwsXG4gICAgICAgIGZnQ29sb3JFeHBsb3JlZDogQ09MT1JfREFSS19XQUxMLFxuICAgICAgICBiZ0NvbG9yRXhwbG9yZWQ6IENPTE9SX0RBUktfV0FMTCxcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogdHJ1ZSxcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAwLjE4XG4gICAgfSwgXG4gICAgMTE2NToge1xuICAgICAgICBuYW1lOiBcIkEgdHJlZVwiLFxuICAgICAgICBjaGFyOiBcIlxcdTEyNzhcIixcbiAgICAgICAgZmdDb2xvcjogXCJsaWdodGdyZWVuXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiZGFya2dyZWVuXCIsXG4gICAgICAgIGZnQ29sb3JFeHBsb3JlZDogQ09MT1JfREFSS19XQUxMLFxuICAgICAgICBiZ0NvbG9yRXhwbG9yZWQ6IENPTE9SX0RBUktfV0FMTCxcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogdHJ1ZSxcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAwLjE4XG4gICAgfSxcbiAgICAyNzEwOiB7XG4gICAgICAgIG5hbWU6IFwiQSB0YWJsZVwiLFxuICAgICAgICBjaGFyOiBcIlxcdTAzQTBcIixcbiAgICAgICAgZmdDb2xvcjogXCJ0YW5cIixcbiAgICAgICAgYmdDb2xvcjogXCJicm93blwiLFxuICAgICAgICBmZ0NvbG9yRXhwbG9yZWQ6IENPTE9SX0RBUktfV0FMTCxcbiAgICAgICAgYmdDb2xvckV4cGxvcmVkOiBDT0xPUl9EQVJLX1dBTEwsXG4gICAgICAgIGJsb2NrczogdHJ1ZSxcbiAgICAgICAgYmxvY2tzU2lnaHQ6IGZhbHNlLFxuICAgICAgICByZWZsZWN0aXZpdHk6IDAuMThcbiAgICB9LFxuICAgIDI4Njk6IHtcbiAgICAgICAgbmFtZTogXCJBIGNoYWlyXCIsXG4gICAgICAgIGNoYXI6IFwiXFx1MDQzRlwiLFxuICAgICAgICBmZ0NvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiYnJvd25cIixcbiAgICAgICAgZmdDb2xvckV4cGxvcmVkOiBDT0xPUl9EQVJLX1dBTEwsXG4gICAgICAgIGJnQ29sb3JFeHBsb3JlZDogQ09MT1JfREFSS19XQUxMLFxuICAgICAgICBibG9ja3M6IHRydWUsXG4gICAgICAgIGJsb2Nrc1NpZ2h0OiBmYWxzZSxcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAwLjE4XG4gICAgfSxcbiAgICAyOTM2OiB7XG4gICAgICAgIG5hbWU6IFwiQSBjYWJpbmV0XCIsXG4gICAgICAgIGNoYXI6IFwiXFx1MjMzOVwiLFxuICAgICAgICBmZ0NvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiYnJvd25cIixcbiAgICAgICAgZmdDb2xvckV4cGxvcmVkOiBDT0xPUl9EQVJLX1dBTEwsXG4gICAgICAgIGJnQ29sb3JFeHBsb3JlZDogQ09MT1JfREFSS19XQUxMLFxuICAgICAgICBibG9ja3M6IHRydWUsXG4gICAgICAgIGJsb2Nrc1NpZ2h0OiBmYWxzZSxcbiAgICAgICAgcmVmbGVjdGl2aXR5OiAwLjE4XG4gICAgfVxufTtcbk9iamVjdC5mcmVlemUoVGlsZURhdGEpO1xuXG5leHBvcnQgY29uc3QgT2JqZWN0RGF0YSA9IHtcbiAgICBcImRvb3JcIjoge1xuICAgICAgICBuYW1lOiBcIkRvb3JcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgYWk6IG51bGwsXG4gICAgICAgIGludmVudG9yeTogbnVsbCxcbiAgICAgICAgZmlnaHRlcjogbnVsbCxcbiAgICAgICAgaW50ZXJhY3RhYmxlOiBcImRvb3JfaW50ZXJhY3RhYmxlXCIsXG4gICAgICAgIGNoYXI6IFwiXFx1MTg4MlwiLFxuICAgICAgICBmZ0NvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiYnJvd25cIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogdHJ1ZVxuICAgIH0sXG4gICAgXCJsb2FkX2Rvb3JcIjoge1xuICAgICAgICBuYW1lOiBcIkRvb3IgdG8gbmV3IGFyZWFcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiZHJhd19hZnRlcl9zZWVuXCIsXG4gICAgICAgIGFpOiBudWxsLFxuICAgICAgICBpbnZlbnRvcnk6IG51bGwsXG4gICAgICAgIGZpZ2h0ZXI6IG51bGwsXG4gICAgICAgIGludGVyYWN0YWJsZTogXCJsb2FkX2xldmVsX2ludGVyYWN0YWJsZVwiLFxuICAgICAgICBjaGFyOiBcIlxcdTE4ODJcIixcbiAgICAgICAgZmdDb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICBiZ0NvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgIGJsb2NrczogdHJ1ZSxcbiAgICAgICAgYmxvY2tzU2lnaHQ6IHRydWVcbiAgICB9LFxuICAgIFwic3RhaXJzXCI6IHtcbiAgICAgICAgbmFtZTogXCJTdGFpcnNcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiZHJhd19hZnRlcl9zZWVuXCIsXG4gICAgICAgIGFpOiBudWxsLFxuICAgICAgICBpbnZlbnRvcnk6IG51bGwsXG4gICAgICAgIGZpZ2h0ZXI6IG51bGwsXG4gICAgICAgIGludGVyYWN0YWJsZTogXCJsb2FkX2xldmVsX2ludGVyYWN0YWJsZVwiLFxuICAgICAgICBjaGFyOiBcIlxcdTE3NTBcIixcbiAgICAgICAgZmdDb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICBiZ0NvbG9yOiBcImJsYWNrXCIsXG4gICAgICAgIGJsb2NrczogdHJ1ZSxcbiAgICAgICAgYmxvY2tzU2lnaHQ6IGZhbHNlXG4gICAgfSxcbiAgICBcImNoZXN0XCI6IHtcbiAgICAgICAgbmFtZTogXCJDaGVzdFwiLFxuICAgICAgICBncmFwaGljczogXCJkcmF3X2FmdGVyX3NlZW5cIixcbiAgICAgICAgYWk6IFwiY2hlc3RfYWlcIixcbiAgICAgICAgZmlnaHRlcjogbnVsbCxcbiAgICAgICAgaW52ZW50b3J5OiBcImJhc2ljX2ludmVudG9yeVwiLFxuICAgICAgICBpbnRlcmFjdGFibGU6IFwiZ2l2ZV9pdGVtc19pbnRlcmFjdGFibGVcIixcbiAgICAgICAgY2hhcjogXCIqXCIsXG4gICAgICAgIGZnQ29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgYmdDb2xvcjogXCJicm93blwiLFxuICAgICAgICBlbXB0eUNvbG9yOiBcInB1cnBsZVwiLFxuICAgICAgICBibG9ja3M6IHRydWUsXG4gICAgICAgIGJsb2Nrc1NpZ2h0OiBmYWxzZVxuICAgIH0sXG4gICAgXCJjcmF0ZVwiOiB7XG4gICAgICAgIG5hbWU6IFwiV29vZGVuIENyYXRlXCIsXG4gICAgICAgIGdyYXBoaWNzOiBcImJhc2ljX2dyYXBoaWNzXCIsXG4gICAgICAgIGFpOiBudWxsLFxuICAgICAgICBmaWdodGVyOiBcImJhc2ljX2ZpZ2h0ZXJcIixcbiAgICAgICAgaW52ZW50b3J5OiBcImJhc2ljX2ludmVudG9yeVwiLFxuICAgICAgICBpbnRlcmFjdGFibGU6IG51bGwsXG4gICAgICAgIGNoYXI6IFwiXFx1MjYxMlwiLFxuICAgICAgICBmZ0NvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiYnJvd25cIixcbiAgICAgICAgZW1wdHlDb2xvcjogXCJwdXJwbGVcIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2UsXG4gICAgICAgIGV4cGVyaWVuY2U6IDAsXG4gICAgICAgIGV4cGVyaWVuY2VHaXZlbjogMCxcbiAgICAgICAgbWF4SHA6IDUsXG4gICAgICAgIHN0cmVuZ3RoOiAwLFxuICAgICAgICBkZWZlbnNlOiAwLFxuICAgICAgICBvbkRlYXRoOiBcInJlbW92ZUZyb21Xb3JsZFwiXG4gICAgfSxcbiAgICBcImxhbnRlcm5cIjoge1xuICAgICAgICBuYW1lOiBcIlNtYWxsIExhbnRlcm5cIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgbGlnaHRpbmc6IFwicmVmbGVjdGl2aXR5XCIsXG4gICAgICAgIGxpZ2h0aW5nQ29sb3I6IFwieWVsbG93XCIsXG4gICAgICAgIGxpZ2h0aW5nUmFuZ2U6IDQsXG4gICAgICAgIGFpOiBudWxsLFxuICAgICAgICBmaWdodGVyOiBudWxsLFxuICAgICAgICBpbnZlbnRvcnk6IG51bGwsXG4gICAgICAgIGludGVyYWN0YWJsZTogbnVsbCxcbiAgICAgICAgY2hhcjogXCJcXHUxNkUxXCIsXG4gICAgICAgIGZnQ29sb3I6IFwiYmxhY2tcIixcbiAgICAgICAgYmdDb2xvcjogXCJ5ZWxsb3dcIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2VcbiAgICB9LFxuICAgIFwiY2FtcGZpcmVcIjoge1xuICAgICAgICBuYW1lOiBcIlNtYWxsIEZpcmVcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgbGlnaHRpbmc6IFwicmVmbGVjdGl2aXR5XCIsXG4gICAgICAgIGxpZ2h0aW5nQ29sb3I6IFwib3JhbmdlXCIsXG4gICAgICAgIGxpZ2h0aW5nUmFuZ2U6IDYsXG4gICAgICAgIGFpOiBudWxsLFxuICAgICAgICBmaWdodGVyOiBudWxsLFxuICAgICAgICBpbnZlbnRvcnk6IG51bGwsXG4gICAgICAgIGludGVyYWN0YWJsZTogbnVsbCxcbiAgICAgICAgY2hhcjogXCJcXHUwNDM2XCIsXG4gICAgICAgIGZnQ29sb3I6IFwiYmxhY2tcIixcbiAgICAgICAgYmdDb2xvcjogXCJvcmFuZ2VcIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2VcbiAgICB9LFxuICAgIFwiZHJvcHBlZF9pdGVtXCI6IHtcbiAgICAgICAgbmFtZTogXCJEcm9wcGVkIEl0ZW1cIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgYWk6IFwiZHJvcHBlZF9pdGVtX2FpXCIsXG4gICAgICAgIGludmVudG9yeTogbnVsbCxcbiAgICAgICAgZmlnaHRlcjogbnVsbCxcbiAgICAgICAgaW50ZXJhY3RhYmxlOiBcImdpdmVfaXRlbXNfaW50ZXJhY3RhYmxlXCIsXG4gICAgICAgIGNoYXI6IFwiIVwiLFxuICAgICAgICBmZ0NvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgIGJnQ29sb3I6IFwiYnJvd25cIixcbiAgICAgICAgYmxvY2tzOiBmYWxzZSxcbiAgICAgICAgYmxvY2tzU2lnaHQ6IGZhbHNlXG4gICAgfSxcbiAgICBcIm1hZ2ljX3NocmluZVwiOiB7XG4gICAgICAgIG5hbWU6IFwiTWFnaWNrYSBTaHJpbmVcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgYWk6IG51bGwsXG4gICAgICAgIGZpZ2h0ZXI6IG51bGwsXG4gICAgICAgIGludGVyYWN0YWJsZTogXCJnaXZlX3NwZWxsX2ludGVyYWN0YWJsZVwiLFxuICAgICAgICBjaGFyOiBcIlxcdTA2REVcIixcbiAgICAgICAgZmdDb2xvcjogXCJibGFja1wiLFxuICAgICAgICBiZ0NvbG9yOiBcImdvbGRcIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2VcbiAgICB9LFxuICAgIFwicGxheWVyXCI6IHtcbiAgICAgICAgbmFtZTogXCJUaGUgUGxheWVyXCIsXG4gICAgICAgIGdyYXBoaWNzOiBcImJhc2ljX2dyYXBoaWNzXCIsXG4gICAgICAgIGxpZ2h0aW5nOiBcInBsYXllcl9saWdodGluZ1wiLFxuICAgICAgICBsaWdodGluZ0NvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgIGxpZ2h0aW5nUmFuZ2U6IDcsXG4gICAgICAgIGFpOiBcInBsYXllcl9jb250cm9sX2FpXCIsXG4gICAgICAgIGludmVudG9yeTogXCJiYXNpY19pbnZlbnRvcnlcIixcbiAgICAgICAgZmlnaHRlcjogXCJiYXNpY19maWdodGVyXCIsXG4gICAgICAgIGludGVyYWN0YWJsZTogbnVsbCxcbiAgICAgICAgY2hhcjogXCJAXCIsXG4gICAgICAgIGZnQ29sb3I6IFwiYmx1ZVwiLFxuICAgICAgICBibG9ja3M6IHRydWUsXG4gICAgICAgIGJsb2Nrc1NpZ2h0OiBmYWxzZSxcbiAgICAgICAgYmdDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgZXhwZXJpZW5jZTogMCxcbiAgICAgICAgZXhwZXJpZW5jZUdpdmVuOiAwLFxuICAgICAgICBtYXhIcDogMTAwLFxuICAgICAgICBtYXhNYW5hOiAxMDAsXG4gICAgICAgIHN0cmVuZ3RoOiAzLFxuICAgICAgICBkZWZlbnNlOiAxLFxuICAgICAgICBkYW1hZ2VBZmZpbml0eToge1xuICAgICAgICAgICAgW0RhbWFnZVR5cGUucGh5c2ljYWxdOiBBZmZpbml0eS5ub3JtYWwsXG4gICAgICAgICAgICBbRGFtYWdlVHlwZS5maXJlXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUubGlnaHRuaW5nXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUuaWNlXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUubmF0dXJlXTogQWZmaW5pdHkubm9ybWFsXG4gICAgICAgIH0sXG4gICAgICAgIG9uRGVhdGg6IFwiZGVmYXVsdFwiXG4gICAgfSxcbiAgICBcImdvYmxpblwiOiB7XG4gICAgICAgIG5hbWU6IFwiR29ibGluXCIsXG4gICAgICAgIGdyYXBoaWNzOiBcImJhc2ljX2dyYXBoaWNzXCIsXG4gICAgICAgIGFpOiBcImJhc2ljX21vbnN0ZXJfYWlcIixcbiAgICAgICAgZmlnaHRlcjogXCJiYXNpY19maWdodGVyXCIsXG4gICAgICAgIGludmVudG9yeTogXCJiYXNpY19pbnZlbnRvcnlcIixcbiAgICAgICAgaW50ZXJhY3RhYmxlOiBudWxsLFxuICAgICAgICBjaGFyOiBcIkdcIixcbiAgICAgICAgZmdDb2xvcjogXCJncmVlblwiLFxuICAgICAgICBiZ0NvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgIGJsb2NrczogdHJ1ZSxcbiAgICAgICAgYmxvY2tzU2lnaHQ6IGZhbHNlLFxuICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgZXhwZXJpZW5jZTogMCxcbiAgICAgICAgZXhwZXJpZW5jZUdpdmVuOiA1MCxcbiAgICAgICAgbWF4SHA6IDMwLFxuICAgICAgICBtYXhNYW5hOiAwLFxuICAgICAgICBzdHJlbmd0aDogMyxcbiAgICAgICAgZGVmZW5zZTogMSxcbiAgICAgICAgc2lnaHRSYW5nZTogNyxcbiAgICAgICAgZGFtYWdlQWZmaW5pdHk6IHtcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLnBoeXNpY2FsXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUuZmlyZV06IEFmZmluaXR5Lm5vcm1hbCxcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLmxpZ2h0bmluZ106IEFmZmluaXR5Lm5vcm1hbCxcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLmljZV06IEFmZmluaXR5Lm5vcm1hbCxcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLm5hdHVyZV06IEFmZmluaXR5Lm5vcm1hbFxuICAgICAgICB9LFxuICAgICAgICBpbnZlbnRvcnlQb29sOiBbXG4gICAgICAgICAgICBbXCJoZWFsdGhfcG90aW9uX3dlYWtcIiwgMC4yNV1cbiAgICAgICAgXSxcbiAgICAgICAgb25EZWF0aDogXCJkZWZhdWx0XCJcbiAgICB9LFxuICAgIFwiZ29ibGluX2JydXRlXCI6IHtcbiAgICAgICAgbmFtZTogXCJHb2JsaW4gQnJ1dGVcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgYWk6IFwicGF0cm9sbGluZ19tb25zdGVyX2FpXCIsXG4gICAgICAgIGZpZ2h0ZXI6IFwiYmFzaWNfZmlnaHRlclwiLFxuICAgICAgICBpbnZlbnRvcnk6IFwiYmFzaWNfaW52ZW50b3J5XCIsXG4gICAgICAgIGludGVyYWN0YWJsZTogbnVsbCxcbiAgICAgICAgY2hhcjogXCJHXCIsXG4gICAgICAgIGZnQ29sb3I6IFwiZ3JlZW5cIixcbiAgICAgICAgYmdDb2xvcjogXCJyZWRcIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2UsXG4gICAgICAgIGxldmVsOiAxMCxcbiAgICAgICAgZXhwZXJpZW5jZTogMCxcbiAgICAgICAgZXhwZXJpZW5jZUdpdmVuOiA1MDAsXG4gICAgICAgIG1heEhwOiAxMDAsXG4gICAgICAgIG1heE1hbmE6IDAsXG4gICAgICAgIHN0cmVuZ3RoOiA3LCBcbiAgICAgICAgZGVmZW5zZTogNCxcbiAgICAgICAgc2lnaHRSYW5nZTogNyxcbiAgICAgICAgZGFtYWdlQWZmaW5pdHk6IHtcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLnBoeXNpY2FsXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUuZmlyZV06IEFmZmluaXR5Lm5vcm1hbCxcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLmxpZ2h0bmluZ106IEFmZmluaXR5Lm5vcm1hbCxcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLmljZV06IEFmZmluaXR5Lm5vcm1hbCxcbiAgICAgICAgICAgIFtEYW1hZ2VUeXBlLm5hdHVyZV06IEFmZmluaXR5Lm5vcm1hbFxuICAgICAgICB9LFxuICAgICAgICBpbnZlbnRvcnlQb29sOiBbXG4gICAgICAgICAgICBbXCJoZWFsdGhfcG90aW9uX3dlYWtcIiwgMC4yNV0sXG4gICAgICAgICAgICBbXCJoZWFsdGhfcG90aW9uXCIsIDAuMV1cbiAgICAgICAgXSxcbiAgICAgICAgb25EZWF0aDogXCJkZWZhdWx0XCJcbiAgICB9LFxuICAgIFwicmF0XCI6IHtcbiAgICAgICAgbmFtZTogXCJSYXRcIixcbiAgICAgICAgZ3JhcGhpY3M6IFwiYmFzaWNfZ3JhcGhpY3NcIixcbiAgICAgICAgYWk6IFwiYmFzaWNfbW9uc3Rlcl9haVwiLFxuICAgICAgICBmaWdodGVyOiBcImJhc2ljX2ZpZ2h0ZXJcIixcbiAgICAgICAgaW52ZW50b3J5OiBcImJhc2ljX2ludmVudG9yeVwiLFxuICAgICAgICBpbnRlcmFjdGFibGU6IG51bGwsXG4gICAgICAgIGNoYXI6IFwiclwiLFxuICAgICAgICBmZ0NvbG9yOiBcImJyb3duXCIsXG4gICAgICAgIGJnQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgYmxvY2tzOiB0cnVlLFxuICAgICAgICBibG9ja3NTaWdodDogZmFsc2UsXG4gICAgICAgIGxldmVsOiAxLFxuICAgICAgICBleHBlcmllbmNlOiAwLFxuICAgICAgICBleHBlcmllbmNlR2l2ZW46IDEwLFxuICAgICAgICBtYXhIcDogMTAsXG4gICAgICAgIG1heE1hbmE6IDAsXG4gICAgICAgIHN0cmVuZ3RoOiAyLFxuICAgICAgICBkZWZlbnNlOiAxLFxuICAgICAgICBzaWdodFJhbmdlOiA3LFxuICAgICAgICBkYW1hZ2VBZmZpbml0eToge1xuICAgICAgICAgICAgW0RhbWFnZVR5cGUucGh5c2ljYWxdOiBBZmZpbml0eS5ub3JtYWwsXG4gICAgICAgICAgICBbRGFtYWdlVHlwZS5maXJlXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUubGlnaHRuaW5nXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUuaWNlXTogQWZmaW5pdHkubm9ybWFsLFxuICAgICAgICAgICAgW0RhbWFnZVR5cGUubmF0dXJlXTogQWZmaW5pdHkubm9ybWFsXG4gICAgICAgIH0sXG4gICAgICAgIGludmVudG9yeVBvb2w6IFtdLFxuICAgICAgICBvbkRlYXRoOiBcImRlZmF1bHRcIlxuICAgIH0sXG59O1xuT2JqZWN0LmZyZWV6ZShPYmplY3REYXRhKTtcblxuZXhwb3J0IGNvbnN0IEl0ZW1EYXRhID0ge1xuICAgIFwiaGVhbHRoX3BvdGlvbl93ZWFrXCI6IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwiV2VhayBIZWFsdGggUG90aW9uXCIsXG4gICAgICAgIHZhbHVlOiAyNSxcbiAgICAgICAgdHlwZTogXCJoZWFsdGhcIixcbiAgICAgICAgdXNlRnVuYzogY2FzdEhlYWxcbiAgICB9LFxuICAgIFwiaGVhbHRoX3BvdGlvblwiOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIkhlYWx0aCBQb3Rpb25cIixcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgICB0eXBlOiBcImhlYWx0aFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0SGVhbFxuICAgIH0sXG4gICAgXCJoZWFsdGhfcG90aW9uX3N0cm9uZ1wiOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIkhlYWx0aCBQb3Rpb25cIixcbiAgICAgICAgdmFsdWU6IDEwMCxcbiAgICAgICAgdHlwZTogXCJoZWFsdGhcIixcbiAgICAgICAgdXNlRnVuYzogY2FzdEhlYWxcbiAgICB9LFxuICAgIFwibGlnaHRuaW5nX3Njcm9sbF93ZWFrXCI6IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwiV2VhayBTY3JvbGwgb2YgTGlnaHRuaW5nXCIsXG4gICAgICAgIHZhbHVlOiAyMCxcbiAgICAgICAgdHlwZTogXCJkYW1hZ2Vfc2Nyb2xsXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3REYW1hZ2VTcGVsbCxcbiAgICAgICAgZGFtYWdlVHlwZTogRGFtYWdlVHlwZS5saWdodG5pbmdcbiAgICB9LFxuICAgIFwibGlnaHRuaW5nX3Njcm9sbFwiOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIlNjcm9sbCBvZiBMaWdodG5pbmdcIixcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgICB0eXBlOiBcImRhbWFnZV9zY3JvbGxcIixcbiAgICAgICAgdXNlRnVuYzogY2FzdERhbWFnZVNwZWxsLFxuICAgICAgICBkYW1hZ2VUeXBlOiBEYW1hZ2VUeXBlLmxpZ2h0bmluZ1xuICAgIH0sXG4gICAgXCJsaWdodG5pbmdfc2Nyb2xsX3N0cm9uZ1wiOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIlN0cm9uZyBTY3JvbGwgb2YgTGlnaHRuaW5nXCIsXG4gICAgICAgIHZhbHVlOiAxMDAsXG4gICAgICAgIHR5cGU6IFwiZGFtYWdlX3Njcm9sbFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0RGFtYWdlU3BlbGwsXG4gICAgICAgIGRhbWFnZVR5cGU6IERhbWFnZVR5cGUubGlnaHRuaW5nXG4gICAgfSxcbiAgICBcImZpcmViYWxsX3Njcm9sbF93ZWFrXCI6IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwiV2VhayBTY3JvbGwgb2YgRmlyZVwiLFxuICAgICAgICB2YWx1ZTogMjAsXG4gICAgICAgIHR5cGU6IFwiZGFtYWdlX3Njcm9sbFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0RGFtYWdlU3BlbGwsXG4gICAgICAgIGRhbWFnZVR5cGU6IERhbWFnZVR5cGUuZmlyZSxcbiAgICAgICAgc3RhdHVzRWZmZWN0RnVuYzogY3JlYXRlQnVybkVmZmVjdFxuICAgIH0sXG4gICAgXCJmaXJlYmFsbF9zY3JvbGxcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGwgb2YgRmlyZVwiLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICAgIHR5cGU6IFwiZGFtYWdlX3Njcm9sbFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0RGFtYWdlU3BlbGwsXG4gICAgICAgIGRhbWFnZVR5cGU6IERhbWFnZVR5cGUuZmlyZSxcbiAgICAgICAgc3RhdHVzRWZmZWN0RnVuYzogY3JlYXRlQnVybkVmZmVjdFxuICAgIH0sXG4gICAgXCJmaXJlYmFsbF9zY3JvbGxfc3Ryb25nXCI6IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwiU3Ryb25nIFNjcm9sbCBvZiBGaXJlXCIsXG4gICAgICAgIHZhbHVlOiAxMDAsXG4gICAgICAgIHR5cGU6IFwiZGFtYWdlX3Njcm9sbFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0RGFtYWdlU3BlbGwsXG4gICAgICAgIGRhbWFnZVR5cGU6IERhbWFnZVR5cGUuZmlyZSxcbiAgICAgICAgc3RhdHVzRWZmZWN0RnVuYzogY3JlYXRlQnVybkVmZmVjdFxuICAgIH0sXG4gICAgXCJsaWdodG5pbmdfc2Nyb2xsX3dlYWtfd2lsZFwiOiB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIldlYWsgU2Nyb2xsIG9mIFdpbGQgTGlnaHRuaW5nXCIsXG4gICAgICAgIHZhbHVlOiA1MCxcbiAgICAgICAgdHlwZTogXCJ3aWxkX2RhbWFnZV9zY3JvbGxcIixcbiAgICAgICAgdXNlRnVuYzogY2FzdFdpbGREYW1hZ2VTcGVsbCxcbiAgICAgICAgZGFtYWdlVHlwZTogRGFtYWdlVHlwZS5saWdodG5pbmdcbiAgICB9LFxuICAgIFwibGlnaHRuaW5nX3Njcm9sbF93aWxkXCI6IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsIG9mIFdpbGQgTGlnaHRuaW5nXCIsXG4gICAgICAgIHZhbHVlOiAxMDAsXG4gICAgICAgIHR5cGU6IFwid2lsZF9kYW1hZ2Vfc2Nyb2xsXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3RXaWxkRGFtYWdlU3BlbGwsXG4gICAgICAgIGRhbWFnZVR5cGU6IERhbWFnZVR5cGUubGlnaHRuaW5nXG4gICAgfSxcbiAgICBcImxpZ2h0bmluZ19zY3JvbGxfc3Ryb25nX3dpbGRcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJTdHJvbmcgU2Nyb2xsIG9mIFdpbGQgTGlnaHRuaW5nXCIsXG4gICAgICAgIHZhbHVlOiAxNTAsXG4gICAgICAgIHR5cGU6IFwid2lsZF9kYW1hZ2Vfc2Nyb2xsXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3RXaWxkRGFtYWdlU3BlbGwsXG4gICAgICAgIGRhbWFnZVR5cGU6IERhbWFnZVR5cGUubGlnaHRuaW5nXG4gICAgfSxcbiAgICBcImZpcmViYWxsX3Njcm9sbF93ZWFrX3dpbGRcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJXZWFrIFNjcm9sbCBvZiBXaWxkIEZpcmVcIixcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgICB0eXBlOiBcIndpbGRfZGFtYWdlX3Njcm9sbFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0V2lsZERhbWFnZVNwZWxsLFxuICAgICAgICBkYW1hZ2VUeXBlOiBEYW1hZ2VUeXBlLmZpcmUsXG4gICAgICAgIHN0YXR1c0VmZmVjdEZ1bmM6IGNyZWF0ZUJ1cm5FZmZlY3RcbiAgICB9LFxuICAgIFwiZmlyZWJhbGxfc2Nyb2xsX3dpbGRcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGwgb2YgV2lsZCBGaXJlXCIsXG4gICAgICAgIHZhbHVlOiAxMDAsXG4gICAgICAgIHR5cGU6IFwid2lsZF9kYW1hZ2Vfc2Nyb2xsXCIsXG4gICAgICAgIHVzZUZ1bmM6IGNhc3RXaWxkRGFtYWdlU3BlbGwsXG4gICAgICAgIGRhbWFnZVR5cGU6IERhbWFnZVR5cGUuZmlyZSxcbiAgICAgICAgc3RhdHVzRWZmZWN0RnVuYzogY3JlYXRlQnVybkVmZmVjdFxuICAgIH0sXG4gICAgXCJmaXJlYmFsbF9zY3JvbGxfc3Ryb25nX3dpbGRcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJTdHJvbmcgU2Nyb2xsIG9mIFdpbGQgRmlyZVwiLFxuICAgICAgICB2YWx1ZTogMTUwLFxuICAgICAgICB0eXBlOiBcIndpbGRfZGFtYWdlX3Njcm9sbFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0V2lsZERhbWFnZVNwZWxsLFxuICAgICAgICBkYW1hZ2VUeXBlOiBEYW1hZ2VUeXBlLmZpcmUsXG4gICAgICAgIHN0YXR1c0VmZmVjdEZ1bmM6IGNyZWF0ZUJ1cm5FZmZlY3RcbiAgICB9LFxuICAgIFwiY29uZnVzZV9zY3JvbGxcIjoge1xuICAgICAgICBkaXNwbGF5TmFtZTogXCJTY3JvbGwgb2YgQ29uZnVzZSBFbmVteVwiLFxuICAgICAgICB2YWx1ZTogOCxcbiAgICAgICAgdHlwZTogXCJjb25mdXNlX3Njcm9sbFwiLFxuICAgICAgICB1c2VGdW5jOiBjYXN0Q29uZnVzZVxuICAgIH0sXG4gICAgXCJjbGFpcnZveWFuY2Vfc2Nyb2xsXCI6IHtcbiAgICAgICAgZGlzcGxheU5hbWU6IFwiU2Nyb2xsIG9mIENsYWlydm95YW5jZVwiLFxuICAgICAgICB0eXBlOiBcImNsYWlydm95YW5jZV9zY3JvbGxcIixcbiAgICAgICAgdXNlRnVuYzogY2FzdENsYWlydm95YW5jZVxuICAgIH1cbn07XG5PYmplY3QuZnJlZXplKEl0ZW1EYXRhKTtcblxuZXhwb3J0IGNvbnN0IFNwZWxsRGF0YSA9IHtcbiAgICBcImxpZ2h0bmluZ19ib2x0XCI6IHtcbiAgICAgICAgbmFtZTogXCJMaWdodG5pbmcgQm9sdFwiLFxuICAgICAgICBtYW5hQ29zdDogNTAsXG4gICAgICAgIHZhbHVlOiAxMCxcbiAgICAgICAgdXNlRnVuYzogY2FzdERhbWFnZVNwZWxsXG4gICAgfVxufTtcbk9iamVjdC5mcmVlemUoU3BlbGxEYXRhKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiLi9nbG9iYWxzXCI7XG5cbmNsYXNzIEVmZmVjdCB7XG4gICAgY29uc3RydWN0b3Iob3duZXIsIG5hbWUsIHR1cm5zLCBhY3RDYWxsYmFjaykge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudHVybnMgPSB0dXJucztcbiAgICAgICAgdGhpcy5hY3RDYWxsYmFjayA9IGFjdENhbGxiYWNrO1xuICAgIH1cblxuICAgIGFjdCgpIHtcbiAgICAgICAgdGhpcy5hY3RDYWxsYmFjayh0aGlzLm93bmVyLCB0aGlzLm5hbWUpO1xuICAgICAgICB0aGlzLnR1cm5zLS07XG4gICAgfVxufVxuZXhwb3J0IHsgRWZmZWN0IH07XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVmZmVjdCBvZiBhcHBseWluZyBkYW1hZ2Ugb3ZlciB0aW1lXG4gKiBAcGFyYW0gIHtHYW1lT2JqZWN0fSB2aWN0aW0gICAgIFdobyB0byBhcHBseSB0aGUgZWZmZWN0IHRvXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IGRhbWFnZSAgICAgICAgIFRoZSBhbW91bnQgb2YgZGFtYWdlIHRvIGdpdmUgZWFjaCB0dXJuIFxuICogQHBhcmFtICB7TnVtYmVyfSB0dXJucyAgICAgICAgICBUaGUgbnVtYmVyIG9mIHR1cm5zIHRvIGxhc3RcbiAqIEByZXR1cm4ge0VmZmVjdH0gICAgICAgICAgICAgICAgVGhlIHJlc3VsdGluZyBlZmZlY3Qgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCdXJuRWZmZWN0KHZpY3RpbSwgZGFtYWdlLCB0dXJucykge1xuICAgIGNvbnN0IGFjdCA9IGZ1bmN0aW9uIChvd25lcikge1xuICAgICAgICBpZiAob3duZXIuZmlnaHRlcikge1xuICAgICAgICAgICAgb3duZXIuZmlnaHRlci50YWtlRGFtYWdlKG51bGwsIGRhbWFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3duZXIgPT09IGdsb2JhbHMuR2FtZS5wbGF5ZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShcIllvdSB3ZXJlIGh1cnQgYnkgdGhlIGJ1cm4gZm9yIFwiICsgZGFtYWdlICsgXCIgZGFtYWdlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKG93bmVyLm5hbWUgKyBcIiB3YXMgaHVydCBieSB0aGUgYnVybiBmb3IgXCIgKyBkYW1hZ2UgKyBcIiBkYW1hZ2VcIik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBFZmZlY3QodmljdGltLCBcIkJ1cm5cIiwgdHVybnMsIGFjdCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUk5HIH0gZnJvbSBcInJvdC1qc1wiO1xuXG5pbXBvcnQgeyBMRVZFTF9VUF9CQVNFLCBMRVZFTF9VUF9GQUNUT1IgfSBmcm9tIFwiLi9kYXRhXCI7XG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiLi9nbG9iYWxzXCI7XG5cbi8qKlxuICogQ29tcG9uZW50IHdoaWNoIGNvbnRyb2xzIHRoZSBjb21iYXQgaW5mb3JtYXRpb24gYW5kIGludGVyYWN0aW9uXG4gKiBiZXR3ZWVuIGRpZmZlcmVudCBmaWdodGVyc1xuICovXG5jbGFzcyBCYXNpY0ZpZ2h0ZXIge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGRlYXRoQ2FsbGJhY2s9bnVsbCkge1xuICAgICAgICB0aGlzLmhwID0gZGF0YS5tYXhIcDtcbiAgICAgICAgdGhpcy5tYXhIcCA9IGRhdGEubWF4SHA7XG4gICAgICAgIHRoaXMubWFuYSA9IGRhdGEubWF4TWFuYTtcbiAgICAgICAgdGhpcy5tYXhNYW5hID0gZGF0YS5tYXhNYW5hO1xuXG4gICAgICAgIHRoaXMuc3RyZW5ndGggPSBkYXRhLnN0cmVuZ3RoO1xuICAgICAgICB0aGlzLmRlZmVuc2UgPSBkYXRhLmRlZmVuc2U7XG4gICAgICAgIHRoaXMuZGVhdGhDYWxsYmFjayA9IGRlYXRoQ2FsbGJhY2s7XG4gICAgICAgIHRoaXMub3duZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuZXhwZXJpZW5jZSA9IGRhdGEuZXhwZXJpZW5jZTtcbiAgICAgICAgdGhpcy5leHBlcmllbmNlR2l2ZW4gPSBkYXRhLmV4cGVyaWVuY2VHaXZlbjtcbiAgICAgICAgdGhpcy5sZXZlbCA9IGRhdGEubGV2ZWw7XG5cbiAgICAgICAgdGhpcy5jcml0aWNhbENoYW5jZSA9IDAuMDU7XG4gICAgICAgIHRoaXMuY3JpdGljYWxEYW1hZ2VNdWx0aXBsZXIgPSAxLjU7XG5cbiAgICAgICAgdGhpcy5zdGF0dXNFZmZlY3RzID0gW107XG4gICAgICAgIHRoaXMuYWlsbWVudFN1c2NlcHRpYmlsaXR5ID0gZGF0YS5haWxtZW50U3VzY2VwdGliaWxpdHk7XG5cbiAgICAgICAgdGhpcy5rbm93blNwZWxscyA9IG5ldyBTZXQoKTtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgYWN0KCkge1xuICAgICAgICBjb25zdCBsZXZlbFVwRVhQID0gTEVWRUxfVVBfQkFTRSArICh0aGlzLmxldmVsICogTEVWRUxfVVBfRkFDVE9SKTtcbiAgICAgICAgaWYgKHRoaXMuZXhwZXJpZW5jZSA+PSBsZXZlbFVwRVhQKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsICs9IDE7XG4gICAgICAgICAgICB0aGlzLmV4cGVyaWVuY2UgPSAwO1xuICAgICAgICAgICAgdGhpcy5ocCA9IHRoaXMubWF4SHA7XG4gICAgICAgICAgICB0aGlzLnN0cmVuZ3RoKys7XG4gICAgICAgICAgICBpZiAodGhpcy5vd25lciA9PT0gZ2xvYmFscy5HYW1lLnBsYXllcikge1xuICAgICAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShcIllvdSByZWFjaGVkIGxldmVsIFwiICsgdGhpcy5sZXZlbCArIFwiIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0YXR1c0VmZmVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXR1c0VmZmVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlZmZlY3QgPSB0aGlzLnN0YXR1c0VmZmVjdHNbaV07XG4gICAgICAgICAgICAgICAgZWZmZWN0LmFjdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVmZmVjdC50dXJucyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoYCR7dGhpcy5vd25lci5uYW1lfSByZWNvdmVyZWQgZnJvbSBpdHMgJHtlZmZlY3QubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNFZmZlY3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0YWtlRGFtYWdlKGF0dGFja2VyLCBkYW1hZ2UpIHtcbiAgICAgICAgaWYgKGRhbWFnZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaHAgLT0gZGFtYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgYXR0YWNrZXIuZmlnaHRlci5leHBlcmllbmNlICs9IHRoaXMuZXhwZXJpZW5jZUdpdmVuO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kZWF0aENhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWF0aENhbGxiYWNrKHRoaXMub3duZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXR0YWNrKHRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldC5maWdodGVyKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGxldCBkYW1hZ2UgPSBNYXRoLnJvdW5kKE1hdGgubWF4KDEsIHRoaXMuc3RyZW5ndGggLSB0YXJnZXQuZmlnaHRlci5kZWZlbnNlKSk7XG4gICAgICAgIGxldCBjcml0aWNhbCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChSTkcuZ2V0VW5pZm9ybSgpIDw9IHRoaXMuY3JpdGljYWxDaGFuY2UpIHtcbiAgICAgICAgICAgIGRhbWFnZSA9IE1hdGguY2VpbChkYW1hZ2UgKiB0aGlzLmNyaXRpY2FsRGFtYWdlTXVsdGlwbGVyKTtcbiAgICAgICAgICAgIGNyaXRpY2FsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYW1hZ2UgPiAwKSB7XG4gICAgICAgICAgICBpZiAoY3JpdGljYWwpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJDUklUSUNBTCEgXCIgKyB0aGlzLm93bmVyLm5hbWUgKyBcIiBhdHRhY2tzIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiBmb3IgXCIgKyBkYW1hZ2UgKyBcIiBkYW1hZ2UuXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UodGhpcy5vd25lci5uYW1lICsgXCIgYXR0YWNrcyBcIiArIHRhcmdldC5uYW1lICsgXCIgZm9yIFwiICsgZGFtYWdlICsgXCIgZGFtYWdlLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGFyZ2V0LmZpZ2h0ZXIudGFrZURhbWFnZSh0aGlzLm93bmVyLCBkYW1hZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKHRoaXMub3duZXIubmFtZSArIFwiIGF0dGFja3MgXCIgKyB0YXJnZXQubmFtZSArIFwiLCBidXQgaXQncyB0b28gd2VhayFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoZWFsKGFtb3VudCkge1xuICAgICAgICB0aGlzLmhwICs9IGFtb3VudDtcbiAgICAgICAgaWYgKHRoaXMuaHAgPiB0aGlzLm1heEhwKSB7XG4gICAgICAgICAgICB0aGlzLmhwID0gdGhpcy5tYXhIcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVzZU1hbmEoY29zdCkge1xuICAgICAgICB0aGlzLm1hbmEgPSBNYXRoLm1heCh0aGlzLm1hbmEgLSBjb3N0LCAwKTtcbiAgICB9XG5cbiAgICBhZGRTdGF0dXNFZmZlY3QoZWZmZWN0KSB7XG4gICAgICAgIHRoaXMuc3RhdHVzRWZmZWN0cy5wdXNoKGVmZmVjdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgc3BlbGwgdG8gdGhlIHNldCBvZiBrbm93biBzcGVsbHMgYnkgdGhpc1xuICAgICAqIGZpZ2h0ZXIuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkIEEgc3BlbGwgaWRcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gSWYgdGhlIHNwZWxsIHdhcyBzdWNjZXNzZnVsbHkgbGVhcm5lZFxuICAgICAqL1xuICAgIGFkZFNwZWxsQnlJZChpZCkge1xuICAgICAgICBpZiAodGhpcy5rbm93blNwZWxscy5oYXMoaWQpKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICB0aGlzLmtub3duU3BlbGxzLmFkZChpZCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldEtub3duU3BlbGxzKCkge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMua25vd25TcGVsbHNdO1xuICAgIH1cbn1cbmV4cG9ydCB7IEJhc2ljRmlnaHRlciB9O1xuIiwiZXhwb3J0IGRlZmF1bHQge307IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogR3JhcGhpY3MgY29tcG9uZW50IHdoaWNoIHNpbXBseSBkcmF3cyB0aGUgY2hhcmFjdGVyIHdpdGggdGhlIGZvcmVcbiAqIGFuZCBiYWNrZ3JvdW5kIGNvbG9yIGF0IHRoZSBvd25lcidzIHggYW5kIHkgY29vcmRpbmF0ZXMgaWYgdGhlIHRpbGVcbiAqIGl0J3Mgb24gaXMgdmlzaWJsZS5cbiAqL1xuY2xhc3MgQmFzaWNHcmFwaGljcyB7XG4gICAgY29uc3RydWN0b3IoY2hhciwgZmdDb2xvciwgYmdDb2xvcikge1xuICAgICAgICB0aGlzLmNoYXIgPSBjaGFyO1xuICAgICAgICB0aGlzLmZnQ29sb3IgPSBmZ0NvbG9yO1xuICAgICAgICB0aGlzLmJnQ29sb3IgPSBiZ0NvbG9yO1xuICAgICAgICB0aGlzLm93bmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgZHJhdyhkaXNwbGF5LCBtYXApIHtcbiAgICAgICAgaWYgKHRoaXMub3duZXIgJiYgbWFwW3RoaXMub3duZXIueV1bdGhpcy5vd25lci54XS5pc1Zpc2libGVBbmRMaXQoKSkge1xuICAgICAgICAgICAgZGlzcGxheS5kcmF3KHRoaXMub3duZXIueCwgdGhpcy5vd25lci55LCB0aGlzLmNoYXIsIHRoaXMuZmdDb2xvciwgdGhpcy5iZ0NvbG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBHcmFwaGljcyBjb21wb25lbnQgd2lsbCBhbHdheXMgZHJhdyB0aGUgb2JqZWN0IGlmIHRoZSB0aWxlIGl0J3Mgb24gaGFzIGJlZW4gZXhwbG9yZWQsXG4gKiByZWdhcmRsZXNzIG9mIGl0cyB2aXNpYmlsaXR5XG4gKi9cbmNsYXNzIERyYXdBZnRlclNlZW4ge1xuICAgIGNvbnN0cnVjdG9yKGNoYXIsIGZnQ29sb3IsIGJnQ29sb3IpIHtcbiAgICAgICAgdGhpcy5jaGFyID0gY2hhcjtcbiAgICAgICAgdGhpcy5mZ0NvbG9yID0gZmdDb2xvcjtcbiAgICAgICAgdGhpcy5iZ0NvbG9yID0gYmdDb2xvcjtcbiAgICAgICAgdGhpcy5vd25lciA9IG51bGw7XG4gICAgfVxuXG4gICAgc2V0T3duZXIob3duZXIpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIH1cblxuICAgIGRyYXcoZGlzcGxheSwgbWFwKSB7XG4gICAgICAgIGlmICh0aGlzLm93bmVyICYmIG1hcFt0aGlzLm93bmVyLnldW3RoaXMub3duZXIueF0uZXhwbG9yZWQpIHtcbiAgICAgICAgICAgIGRpc3BsYXkuZHJhdyh0aGlzLm93bmVyLngsIHRoaXMub3duZXIueSwgdGhpcy5jaGFyLCB0aGlzLmZnQ29sb3IsIHRoaXMuYmdDb2xvcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgeyBCYXNpY0dyYXBoaWNzLCBEcmF3QWZ0ZXJTZWVuIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGdsb2JhbHMgZnJvbSBcIi4vZ2xvYmFsc1wiO1xuaW1wb3J0IHsgSXRlbURhdGEsIFNwZWxsRGF0YSB9IGZyb20gXCIuL2RhdGFcIjtcblxuLyoqXG4gKiBDb21wb25lbnQgZ2l2ZXMgYWxsIHRoZSBpdGVtcyBpbiB0aGUgaW52ZW50b3J5IG9mIHRoZSBHYW1lT2JqZWN0XG4gKiB0byB0aGUgdXNlciB3aGVuIGludGVyYWN0ZWQgd2l0aFxuICovXG5jbGFzcyBHaXZlSXRlbXNJbnRlcmFjdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm93bmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgaW50ZXJhY3QodXNlcikge1xuICAgICAgICBpZiAodGhpcy5vd25lci5pbnZlbnRvcnlDb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoZXN0SXRlbXMgPSB0aGlzLm93bmVyLmludmVudG9yeUNvbXBvbmVudC5nZXRJRHNBbmRDb3VudHMoKTtcbiAgICAgICAgICAgIGlmIChjaGVzdEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoZXN0SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGNoZXN0SXRlbXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShcIkZvdW5kIGEgXCIgKyBJdGVtRGF0YVtpdGVtLmlkXS5kaXNwbGF5TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHVzZXIuaW52ZW50b3J5Q29tcG9uZW50LmFkZEl0ZW0oaXRlbS5pZCwgaXRlbS5jb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3duZXIuaW52ZW50b3J5Q29tcG9uZW50LnVzZUl0ZW0oaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJFbXB0eVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJNaXNzaW5nIGludmVudG9yeUNvbXBvbmVudCBvbiBcIiwgdGhpcy5vd25lcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogSW50ZXJhY3Rpb24gY29tcG9uZW50IHRoYXQgYWRkcyBhIHNwZWxsIHRvIHRoZSB1c2VyJ3Mgc3BlbGwgbGlzdFxuICovXG5jbGFzcyBHaXZlU3BlbGxJbnRlcmFjdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm93bmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5zcGVsbElkID0gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgc2V0U3BlbGwoaWQpIHtcbiAgICAgICAgdGhpcy5zcGVsbElkID0gaWQ7XG4gICAgfVxuXG4gICAgaW50ZXJhY3QodXNlcikge1xuICAgICAgICBpZiAoIXRoaXMuc3BlbGxJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3BlbGwgaWQgZ2l2ZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoISh0aGlzLnNwZWxsSWQgaW4gU3BlbGxEYXRhKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RoaXMuc3BlbGxJZH0gaXMgbm90IGEgdmFsaWQgc3BlbGxgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IHVzZXIuZmlnaHRlci5hZGRTcGVsbEJ5SWQodGhpcy5zcGVsbElkKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IFNwZWxsRGF0YVt0aGlzLnNwZWxsSWRdO1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoYFlvdSBsZWFybmVkIGEgbmV3IHNwZWxsOiAke2RhdGEubmFtZX1gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShgWW91IGFscmVhZHkga25vdyAke2RhdGEubmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBJbnRlcmFjdGlvbiBjb21wb25lbnQgcmVtb3ZlcyBvd25lciB0byBnaXZlIHRoZSBhcHBlYXJhbmNlIG9mIG9wZW5pbmdcbiAqIHdoZW4gaW50ZXJhY3RpbmdcbiAqL1xuY2xhc3MgRG9vckludGVyYWN0YWJsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmxldmVsTmFtZSA9IG51bGw7XG4gICAgfVxuXG4gICAgc2V0TGV2ZWwobmFtZSkge1xuICAgICAgICB0aGlzLmxldmVsTmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgc2V0T3duZXIob3duZXIpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIH1cblxuICAgIGludGVyYWN0KCkge1xuICAgICAgICBnbG9iYWxzLkdhbWUucmVtb3ZlT2JqZWN0KHRoaXMub3duZXIpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBJbnRlcmFjdGlvbiBjb21wb25lbnQgdGhhdCBjYWxscyBHYW1lLm5leHRMZXZlbCB3aGVuIGludGVyYWN0ZWQgd2l0aFxuICovXG5jbGFzcyBMb2FkTGV2ZWxJbnRlcmFjdGFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm93bmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5sZXZlbE5hbWUgPSBudWxsO1xuICAgIH1cblxuICAgIHNldExldmVsKG5hbWUpIHtcbiAgICAgICAgdGhpcy5sZXZlbE5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIHNldE93bmVyKG93bmVyKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG5cbiAgICBpbnRlcmFjdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmxldmVsTmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gbGV2ZWwgbmFtZSBoYXMgYmVlbiBzZXQgZm9yIGxvYWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFscy5HYW1lLmxvYWRMZXZlbCh0aGlzLmxldmVsTmFtZSk7XG4gICAgfVxufVxuZXhwb3J0IHsgR2l2ZUl0ZW1zSW50ZXJhY3RhYmxlLCBHaXZlU3BlbGxJbnRlcmFjdGFibGUsIERvb3JJbnRlcmFjdGFibGUsIExvYWRMZXZlbEludGVyYWN0YWJsZSB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEl0ZW1EYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xuXG5jbGFzcyBCYXNpY0ludmVudG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBudWxsO1xuXG4gICAgICAgIC8vIEEgY2xhc3MgaW1wbGVtZW50YXRpb24gd2l0aG91dCBwcml2YXRlIGRhdGEgbWVtYmVycz9cbiAgICAgICAgLy8gQ2FuIEpTIGRvIGFueXRoaW5nIHJpZ2h0P1xuICAgICAgICB0aGlzLl9pbnZlbnRvcnkgPSB7fTtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiByZWxpZXMgb24gSlMgbm93IGhhdmluZyBhIHNldCBvcmRlcmluZyB0b1xuICAgIC8vIGtleXMgaW4gb2JqZWN0cyB3aGVuIHVzaW5nIG93bktleXMuIE5vdCBhIHBlcmZlY3Qgc29sdXRpb24gc2luY2VcbiAgICAvLyBpdCdzIG5vdCBvYnZpb3VzIHdoYXQncyBnb2luZyBvbi5cbiAgICBnZXRJRHNBbmRDb3VudHMoKSB7XG4gICAgICAgIGNvbnN0IG9yZGVyZWRLZXlzID0gUmVmbGVjdC5vd25LZXlzKHRoaXMuX2ludmVudG9yeSk7XG4gICAgICAgIHJldHVybiBvcmRlcmVkS2V5cy5tYXAoZSA9PiB7IHJldHVybiB7IGlkOiBlLCBjb3VudDogdGhpcy5faW52ZW50b3J5W2VdIH07IH0pO1xuICAgIH1cblxuICAgIGdldE5hbWVzQW5kQ291bnRzKCkge1xuICAgICAgICBjb25zdCBvcmRlcmVkS2V5cyA9IFJlZmxlY3Qub3duS2V5cyh0aGlzLl9pbnZlbnRvcnkpO1xuICAgICAgICByZXR1cm4gb3JkZXJlZEtleXMubWFwKGUgPT4geyByZXR1cm4geyBuYW1lOiBJdGVtRGF0YVtlXS5kaXNwbGF5TmFtZSwgY291bnQ6IHRoaXMuX2ludmVudG9yeVtlXSB9OyB9KTtcbiAgICB9XG5cbiAgICBoYXNJdGVtKGlkKSB7XG4gICAgICAgIHJldHVybiBpZCBpbiB0aGlzLl9pbnZlbnRvcnk7XG4gICAgfVxuXG4gICAgYWRkSXRlbShpZCwgY291bnQ9MSkge1xuICAgICAgICBpZiAoaWQgaW4gdGhpcy5faW52ZW50b3J5KSB7XG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuX2ludmVudG9yeVtpZF0gKyBjb3VudDtcblxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSAxMDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2ludmVudG9yeVtpZF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ludmVudG9yeVtpZF0gPSBjb3VudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB1c2VJdGVtKGlkKSB7XG4gICAgICAgIGlmICghKGlkIGluIHRoaXMuX2ludmVudG9yeSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSXRlbSAke2lkfSBub3QgaW4gaW52ZW50b3J5YCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pbnZlbnRvcnlbaWRdLS07XG5cbiAgICAgICAgaWYgKHRoaXMuX2ludmVudG9yeVtpZF0gPT09IDApIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9pbnZlbnRvcnlbaWRdO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IHsgQmFzaWNJbnZlbnRvcnkgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBSTkcgfSBmcm9tIFwicm90LWpzXCI7XG5cbmltcG9ydCBnbG9iYWxzIGZyb20gXCIuL2dsb2JhbHNcIjtcbmltcG9ydCB7IENvbmZ1c2VkQUkgfSBmcm9tIFwiLi9haVwiO1xuaW1wb3J0IHsgZ2V0T2JqZWN0c0F0TG9jYXRpb24sIGdldENsb3Nlc3RWaXNpYmxlRmlnaHRlciwgc2V0QWxsVG9FeHBsb3JlZCB9IGZyb20gXCIuL21hcFwiO1xuaW1wb3J0IHsgcmFuZG9tSW50RnJvbUludGVydmFsIH0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIFVuaG9vayB0aGUgbW91c2UgbG9vayBmdW5jdGlvbmFsaXR5IGFuZCB0aGVuIGxpc3RlbiBmb3IgYSBtb3VzZVxuICogaW5wdXQuIElmIGl0J3MgYSBsZWZ0IGNsaWNrIG9uIGFuIG9iamVjdCB3aXRoIGEgZmlnaHRlciBjb21wb25lbnQsXG4gKiB0aGVuIHJlLWhvb2sgdGhlIG1vdXNlIGxvb2sgZnVuY3Rpb24gYW5kIHBhc3MgdGhlIHRhcmdldCB0byB0aGVcbiAqIGNhbGxiYWNrIGNiLlxuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYiBjYWxsYmFja1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuY29uc3QgbW91c2VUYXJnZXQgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICBnbG9iYWxzLkdhbWUudW5ob29rTW91c2VMb29rKCk7XG4gICAgZ2xvYmFscy5HYW1lLmRyYXdBbGwoKTtcblxuICAgIGdsb2JhbHMuR2FtZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbiBfbGlzdGVuZXIoZSkge1xuICAgICAgICBpZiAoZS5idXR0b24gPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IGdsb2JhbHMuR2FtZS5kaXNwbGF5LmV2ZW50VG9Qb3NpdGlvbihlKTtcblxuICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIF9saXN0ZW5lcik7XG4gICAgICAgICAgICBnbG9iYWxzLkdhbWUuaG9va01vdXNlTG9vaygpO1xuXG4gICAgICAgICAgICBsZXQgdGFyZ2V0O1xuICAgICAgICAgICAgbGV0IG9iamVjdHMgPSBnZXRPYmplY3RzQXRMb2NhdGlvbihnbG9iYWxzLkdhbWUuZ2FtZU9iamVjdHMsIHBvc1swXSwgcG9zWzFdKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iamVjdHNbaV0uZmlnaHRlcikge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBvYmplY3RzW2ldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmZpZ2h0ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2IodGFyZ2V0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2FzdEhlYWwoaXRlbSwgdXNlciwgb3duZXJDYWxsYmFjaykge1xuICAgIGlmICh1c2VyLmZpZ2h0ZXIuaHAgPj0gdXNlci5maWdodGVyLm1heEhwKSB7XG4gICAgICAgIGlmICh1c2VyID09PSBnbG9iYWxzLkdhbWUucGxheWVyKSB7XG4gICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJZb3UgYXJlIGFscmVhZHkgYXQgZnVsbCBoZWFsdGguXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKHVzZXIubmFtZSArIFwiIHRyaWVzIGFuZCBmYWlscyB0byB0YWtlIGEgaGVhbHRoIHBvdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3duZXJDYWxsYmFjayhmYWxzZSk7XG4gICAgfVxuICAgIHVzZXIuZmlnaHRlci5oZWFsKGl0ZW0udmFsdWUpO1xuICAgIHJldHVybiBvd25lckNhbGxiYWNrKHRydWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FzdERhbWFnZVNwZWxsKGl0ZW0sIHVzZXIsIG93bmVyQ2FsbGJhY2spIHtcbiAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJMZWZ0IGNsaWNrIG9uIGFuIGVuZW15IHRvIHRhcmdldCBpdCwgY2xpY2sgZWxzZXdoZXJlIHRvIGNhbmNlbFwiKTtcbiAgICBtb3VzZVRhcmdldChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShcIkNhbmNlbGVkIGNhc3RpbmdcIik7XG4gICAgICAgICAgICByZXR1cm4gb3duZXJDYWxsYmFjayhmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoYFNwZWxsIGhpdHMgJHt0YXJnZXQubmFtZX0gZm9yICR7aXRlbS52YWx1ZX0gZGFtYWdlYCk7XG4gICAgICAgIHRhcmdldC5maWdodGVyLnRha2VEYW1hZ2UodXNlciwgaXRlbS52YWx1ZSwgaXRlbS5kYW1hZ2VUeXBlKTtcblxuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIGZpZ2h0ZXIgYWdhaW4gYmVjYXVzZSBpdCBjb3VsZCBoYXZlIGRpZWQgYWxyZWFkeVxuICAgICAgICBpZiAodGFyZ2V0LmZpZ2h0ZXIgJiYgaXRlbS5zdGF0dXNFZmZlY3RGdW5jKSB7XG4gICAgICAgICAgICBpZiAoUk5HLmdldFVuaWZvcm0oKSA8PSB0YXJnZXQuZmlnaHRlci5haWxtZW50U3VzY2VwdGliaWxpdHkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlZmZlY3REYW1hZ2UgPSBNYXRoLnJvdW5kKHRhcmdldC5maWdodGVyLm1heEhwICogMC4wNjI1KTtcbiAgICAgICAgICAgICAgICBjb25zdCB0dXJucyA9IHJhbmRvbUludEZyb21JbnRlcnZhbCgzLCA2KTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZmlnaHRlci5hZGRTdGF0dXNFZmZlY3QoXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3RhdHVzRWZmZWN0RnVuYyh0YXJnZXQsIGVmZmVjdERhbWFnZSwgdHVybnMpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvd25lckNhbGxiYWNrKHRydWUpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FzdFdpbGREYW1hZ2VTcGVsbChpdGVtLCB1c2VyLCBvd25lckNhbGxiYWNrKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZ2V0Q2xvc2VzdFZpc2libGVGaWdodGVyKGdsb2JhbHMuR2FtZS5tYXAsIGdsb2JhbHMuR2FtZS5nYW1lT2JqZWN0cywgdXNlciwgOCk7XG5cbiAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgIGlmICh1c2VyID09PSBnbG9iYWxzLkdhbWUucGxheWVyKSB7XG4gICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJObyB0YXJnZXQgaXMgY2xvc2UgZW5vdWdoIHRvIHVzZSB0aGUgc2Nyb2xsXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvd25lckNhbGxiYWNrKGZhbHNlKTtcbiAgICB9XG5cbiAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoYFNwZWxsIGhpdHMgJHt0YXJnZXQubmFtZX0gZm9yICR7aXRlbS52YWx1ZX0gZGFtYWdlYCk7XG4gICAgdGFyZ2V0LmZpZ2h0ZXIudGFrZURhbWFnZSh1c2VyLCBpdGVtLnZhbHVlLCBpdGVtLmRhbWFnZVR5cGUpO1xuXG4gICAgLy8gQ2hlY2sgZm9yIHRoZSBmaWdodGVyIGFnYWluIGJlY2F1c2UgaXQgY291bGQgaGF2ZSBkaWVkIGFscmVhZHlcbiAgICBpZiAodGFyZ2V0LmZpZ2h0ZXIgJiYgaXRlbS5zdGF0dXNFZmZlY3RGdW5jKSB7XG4gICAgICAgIGlmIChSTkcuZ2V0VW5pZm9ybSgpIDw9IHRhcmdldC5maWdodGVyLmFpbG1lbnRTdXNjZXB0aWJpbGl0eSkge1xuICAgICAgICAgICAgY29uc3QgZWZmZWN0RGFtYWdlID0gTWF0aC5yb3VuZCh0YXJnZXQuZmlnaHRlci5tYXhIcCAqIDAuMDYyNSk7XG4gICAgICAgICAgICBjb25zdCB0dXJucyA9IHJhbmRvbUludEZyb21JbnRlcnZhbCgzLCA2KTtcbiAgICAgICAgICAgIHRhcmdldC5maWdodGVyLmFkZFN0YXR1c0VmZmVjdChcbiAgICAgICAgICAgICAgICBpdGVtLnN0YXR1c0VmZmVjdEZ1bmModGFyZ2V0LCBlZmZlY3REYW1hZ2UsIHR1cm5zKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvd25lckNhbGxiYWNrKHRydWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FzdENvbmZ1c2UoaXRlbSwgdXNlciwgb3duZXJDYWxsYmFjaykge1xuICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5TWVzc2FnZShcIkxlZnQgY2xpY2sgb24gYW4gZW5lbXkgdG8gdGFyZ2V0IGl0LCBjbGljayBlbHNld2hlcmUgdG8gY2FuY2VsXCIpO1xuICAgIG1vdXNlVGFyZ2V0KGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG93bmVyQ2FsbGJhY2soZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKHRhcmdldC5uYW1lICsgXCIgaXMgbm93IGNvbmZ1c2VkXCIpO1xuICAgICAgICBjb25zdCBvbGRBSSA9IHRhcmdldC5haTtcbiAgICAgICAgdGFyZ2V0LmFpID0gbmV3IENvbmZ1c2VkQUkob2xkQUksIGl0ZW0udmFsdWUpO1xuICAgICAgICB0YXJnZXQuYWkub3duZXIgPSB0YXJnZXQ7XG4gICAgICAgIHJldHVybiBvd25lckNhbGxiYWNrKHRydWUpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FzdENsYWlydm95YW5jZShpdGVtLCB1c2VyLCBvd25lckNhbGxiYWNrKSB7XG4gICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKFwiWW91IGhhdmUgYmVlbiBncmFudGVkIENsYWlydm95YW5jZVwiKTtcbiAgICBzZXRBbGxUb0V4cGxvcmVkKGdsb2JhbHMuR2FtZS5tYXApO1xuICAgIHJldHVybiBvd25lckNhbGxiYWNrKHRydWUpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IENvbG9yLCBMaWdodGluZywgRk9WIH0gZnJvbSBcInJvdC1qc1wiO1xuXG5pbXBvcnQgeyBXT1JMRF9XSURUSCwgV09STERfSEVJR0hUIH0gZnJvbSBcIi4vZGF0YVwiO1xuaW1wb3J0IHsgY3JlYXRlUGFzc2FibGVTaWdodENhbGxiYWNrIH0gZnJvbSBcIi4vYWlcIjtcblxuZnVuY3Rpb24gY3JlYXRlUmVmbGVjdGl2aXR5Q2FsbGJhY2sobWFwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCB8fCB4ID49IFdPUkxEX1dJRFRIIHx8IHkgPj0gV09STERfSEVJR0hUKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwW3ldW3hdLmJsb2Nrc1NpZ2h0ID8gMCA6IG1hcFt5XVt4XS5yZWZsZWN0aXZpdHk7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBDb21wb25lbnRcbiAqL1xuY2xhc3MgUmVmbGVjdGl2aXR5TGlnaHRpbmcge1xuICAgIGNvbnN0cnVjdG9yKGNvbG9yLCByYW5nZSkge1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgfVxuXG4gICAgY29tcHV0ZShtYXApIHtcbiAgICAgICAgY29uc3QgbGlnaHRpbmdDYWxsYmFjayA9IGZ1bmN0aW9uICh4LCB5LCBjb2xvcikge1xuICAgICAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gV09STERfV0lEVEggfHwgeSA+PSBXT1JMRF9IRUlHSFQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXBbeV1beF0ubGlnaHRpbmdDb2xvciA9IENvbG9yLnRvUkdCKFxuICAgICAgICAgICAgICAgIENvbG9yLmFkZChcbiAgICAgICAgICAgICAgICAgICAgQ29sb3IuZnJvbVN0cmluZyhtYXBbeV1beF0ubGlnaHRpbmdDb2xvciksXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZm92ID0gbmV3IEZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZyhcbiAgICAgICAgICAgIGNyZWF0ZVBhc3NhYmxlU2lnaHRDYWxsYmFjayh0aGlzLm93bmVyKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBsaWdodGluZyA9IG5ldyBMaWdodGluZyhjcmVhdGVSZWZsZWN0aXZpdHlDYWxsYmFjayhtYXApLCB7IHJhbmdlOiB0aGlzLnJhbmdlLCBwYXNzZXM6IDIgfSk7XG4gICAgICAgIGxpZ2h0aW5nLnNldEZPVihmb3YpO1xuICAgICAgICBsaWdodGluZy5zZXRMaWdodCh0aGlzLm93bmVyLngsIHRoaXMub3duZXIueSwgdGhpcy5jb2xvcik7XG4gICAgICAgIGxpZ2h0aW5nLmNvbXB1dGUobGlnaHRpbmdDYWxsYmFjayk7XG4gICAgICAgIC8vIEZvciBzb21lIHJlYXNvbiB0aGUgdGlsZSB5b3UncmUgb24gZG9lc24ndCBnZXQgbGl0XG4gICAgICAgIG1hcFt0aGlzLm93bmVyLnldW3RoaXMub3duZXIueF0ubGlnaHRpbmdDb2xvciA9IHRoaXMuY29sb3I7XG4gICAgfVxufVxuXG4vKipcbiAqIENvbXBvbmVudFxuICovXG5jbGFzcyBQbGF5ZXJMaWdodGluZyB7XG4gICAgY29uc3RydWN0b3IoY29sb3IsIHJhbmdlKSB7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5yYW5nZSA9IHJhbmdlO1xuICAgIH1cblxuICAgIHNldE93bmVyKG93bmVyKSB7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICB9XG5cbiAgICBjb21wdXRlKG1hcCkge1xuICAgICAgICBmdW5jdGlvbiBsaWdodGluZ0NhbGxiYWNrICh4LCB5LCBjb2xvcikge1xuICAgICAgICAgICAgaWYgKHggPCAwIHx8IHkgPCAwIHx8IHggPj0gV09STERfV0lEVEggfHwgeSA+PSBXT1JMRF9IRUlHSFQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXBbeV1beF0ubGlnaHRpbmdDb2xvciA9IENvbG9yLnRvUkdCKFxuICAgICAgICAgICAgICAgIENvbG9yLmFkZChcbiAgICAgICAgICAgICAgICAgICAgQ29sb3IuZnJvbVN0cmluZyhtYXBbeV1beF0ubGlnaHRpbmdDb2xvciksXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hcFt5XVt4XS5leHBsb3JlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaWdodEZvdiA9IG5ldyBGT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcoXG4gICAgICAgICAgICBjcmVhdGVQYXNzYWJsZVNpZ2h0Q2FsbGJhY2sodGhpcy5vd25lcilcbiAgICAgICAgKTtcbiAgICAgICAgc2lnaHRGb3YuY29tcHV0ZSh0aGlzLm93bmVyLngsIHRoaXMub3duZXIueSwgMTAwLCBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSBXT1JMRF9XSURUSCB8fCB5ID49IFdPUkxEX0hFSUdIVCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1hcFt5XVt4XS52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgbGlnaHRpbmdGb3YgPSBuZXcgRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nKFxuICAgICAgICAgICAgY3JlYXRlUGFzc2FibGVTaWdodENhbGxiYWNrKHRoaXMub3duZXIpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGxpZ2h0aW5nID0gbmV3IExpZ2h0aW5nKGNyZWF0ZVJlZmxlY3Rpdml0eUNhbGxiYWNrKG1hcCksIHsgcmFuZ2U6IHRoaXMucmFuZ2UsIHBhc3NlczogMiB9KTtcbiAgICAgICAgbGlnaHRpbmcuc2V0Rk9WKGxpZ2h0aW5nRm92KTtcbiAgICAgICAgbGlnaHRpbmcuc2V0TGlnaHQodGhpcy5vd25lci54LCB0aGlzLm93bmVyLnksIHRoaXMuY29sb3IpO1xuICAgICAgICBsaWdodGluZy5jb21wdXRlKGxpZ2h0aW5nQ2FsbGJhY2spO1xuICAgIH1cbn1cbmV4cG9ydCB7IFJlZmxlY3Rpdml0eUxpZ2h0aW5nLCBQbGF5ZXJMaWdodGluZyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IERpc3BsYXksIFNjaGVkdWxlciwgRW5naW5lIH0gZnJvbSBcInJvdC1qc1wiO1xuXG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiLi9nbG9iYWxzXCI7XG5pbXBvcnQgeyBjcmVhdGVPYmplY3QgfSBmcm9tIFwiLi9vYmplY3RcIjtcbmltcG9ydCB7IFdJRFRILCBIRUlHSFQsIFVJX0hFSUdIVCB9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IGRyYXdNYXAsIGdldE9iamVjdHNBdExvY2F0aW9uLCByZXNldFZpc2liaWxpdHksIGxvYWRUaWxlZE1hcCB9IGZyb20gXCIuL21hcFwiO1xuaW1wb3J0IHsgZHJhd1VJLCBjbGVhclNjcmVlbiB9IGZyb20gXCIuL3VpXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3VzZUxvb2soZSkge1xuICAgIGNvbnN0IHBvcyA9IGdsb2JhbHMuR2FtZS5kaXNwbGF5LmV2ZW50VG9Qb3NpdGlvbihlKTtcbiAgICBjb25zdCB0YXJnZXQgPSBnZXRPYmplY3RzQXRMb2NhdGlvbihnbG9iYWxzLkdhbWUuZ2FtZU9iamVjdHMsIHBvc1swXSwgcG9zWzFdKVswXTtcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5uYW1lICYmIHRhcmdldC5haSAmJiB0YXJnZXQuYWkuc3RhdGUpIHtcbiAgICAgICAgaWYgKHRhcmdldC5haS5zdGF0ZSA9PT0gXCJ3YW5kZXJcIikge1xuICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKFwiQSBcIiArIHRhcmdldC5uYW1lICsgXCIsIGl0IGhhc24ndCBzZWVuIHlvdS5cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UoXCJBIFwiICsgdGFyZ2V0Lm5hbWUpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm5hbWUpIHtcbiAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKHRhcmdldC5uYW1lKTtcbiAgICB9IGVsc2UgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKGdsb2JhbHMuR2FtZS5tYXBbcG9zWzFdXVtwb3NbMF1dLm5hbWUpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDbGFzcyBpbnNpZGUgdGhlIHNjaGVkdWxlciB3aGljaCBoYW5kbGVzIHRoZSBub3JtYWwgZnVuY3Rpb25zIG9mXG4gKiB0aGUgZ2FtZSBsb29wIHdoaWNoIGFyZW4ndCByZWxhdGVkIHRvIGluaXRpYXRpbmcgdGhlIGJlaGF2aW9yIG9mXG4gKiBhY3RvcnMgb3Igb2JqZWN0c1xuICovXG5jbGFzcyBNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgfVxuXG4gICAgYWN0KCkge1xuICAgICAgICB0aGlzLmdhbWUuZW5naW5lLmxvY2soKTtcbiAgICAgICAgdGhpcy5nYW1lLmN1cnJlbnRUdXJuKys7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5wbGF5ZXIuZmlnaHRlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmxvc2VDaW5lbWF0aWMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc2V0VmlzaWJpbGl0eSh0aGlzLmdhbWUubWFwKTtcbiAgICAgICAgdGhpcy5nYW1lLmRyYXdBbGwoKTtcbiAgICAgICAgdGhpcy5nYW1lLmVuZ2luZS51bmxvY2soKTtcbiAgICB9XG59XG5cbmNsYXNzIFNpbXBsZUR1bmdlb25DcmF3bGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBudWxsO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBudWxsO1xuICAgICAgICB0aGlzLnBsYXllciA9IG51bGw7XG4gICAgICAgIHRoaXMuZW5naW5lID0gbnVsbDtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmdhbWVPYmplY3RzID0gW107XG4gICAgICAgIHRoaXMubWFwID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudExvZ0xpbmVzID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudExldmVsID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50VHVybiA9IDA7XG4gICAgICAgIHRoaXMudG90YWxNZXNzYWdlcyA9IDA7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IG5ldyBEaXNwbGF5KHtcbiAgICAgICAgICAgIHdpZHRoOiBXSURUSCxcbiAgICAgICAgICAgIGhlaWdodDogSEVJR0hULFxuICAgICAgICAgICAgZm9udFNpemU6IDEzLFxuICAgICAgICAgICAgZm9yY2VTcXVhcmVSYXRpbzogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSB0aGlzLmRpc3BsYXkuZ2V0Q29udGFpbmVyKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcblxuICAgICAgICB0aGlzLm9wZW5pbmdDaW5lbWF0aWMoKTtcbiAgICB9XG5cbiAgICByZXNldCAoKSB7XG4gICAgICAgIGNsZWFyU2NyZWVuKHRoaXMuZGlzcGxheSk7XG4gICAgICAgIHRoaXMucGxheWVyLmZpZ2h0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnBsYXllci5haSA9IG51bGw7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLnBsYXllci5haSk7XG4gICAgICAgIHRoaXMucGxheWVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWwgPSAwO1xuICAgICAgICB0aGlzLm1hcCA9IFtdO1xuICAgICAgICB0aGlzLmdhbWVPYmplY3RzID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudExvZ0xpbmVzID0gW107XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgb3BlbmluZ0NpbmVtYXRpYygpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmRyYXdUZXh0KFdJRFRIIC0gKFdJRFRIIC0gNyksIDEyLCBcIiVje3doaXRlfVlvdXIgY291bnRyeSBpcyBiZWluZyBvdmVycnVuIGJ5IHRoZSBmb3JjZXMgb2YgZGFya25lc3NcIik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5kcmF3VGV4dChXSURUSCAtIChXSURUSCAtIDgpLCAxNSwgXCIlY3t3aGl0ZX1UYWxlcyB0ZWxsIG9mIGEgd2VhcG9uIG9mIGdyZWF0IHBvd2VyIGxvc3QgaW4gdGhlXCIpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuZHJhd1RleHQoV0lEVEggLSAoV0lEVEggLSA0KSwgMTYsIFwiJWN7d2hpdGV9bGFuZHMgYmV5b25kIHRoZSBkd2FyZiBzdHJvbmdob2xkIER1cmR3aW4sIHVuZGVyIHRoZSBSZWQgSGlsbHMuXCIpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuZHJhd1RleHQoV0lEVEggLSAoV0lEVEggLSAxNyksIDE4LCBcIiVje3doaXRlfU5vbmUgd2hvIGhhdmUgZW50ZXJlZCBoYXZlIHJldHVybmVkXCIpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuZHJhd1RleHQoV0lEVEggLSAoV0lEVEggLSAxNCksIDIwLCBcIiVje3doaXRlfUl0IGlzIHRoZSBsYXN0IGhvcGUgb2YgYSBkZXNwZXJhdGUgcGVvcGxlXCIpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuZHJhd1RleHQoV0lEVEggLSAoV0lEVEggLSAxNiksIDIxLCBcIiVje3doaXRlfVlvdSBoYXZlIHZvbHVudGVlcmVkIHRvIHJldHJpZXZlIGl0XCIpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuZHJhd1RleHQoV0lEVEggLSAoV0lEVEggLSAyNCksIDI3LCBcIiVje3doaXRlfVByZXNzIFtlbnRlcl0gdG8gc3RhcnRcIik7XG5cbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcztcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIF9saXN0ZW5lcihlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgICAgICAgIHBhcmVudC5zdGFydEdhbWVwbGF5KCk7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIF9saXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHdpbkNpbmVtYXRpYygpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuXG4gICAgICAgIHRoaXMuZGlzcGxheS5kcmF3VGV4dChXSURUSCAtIChXSURUSCAtIDEyKSwgMTIsIFwiJWN7d2hpdGV9WW91IGhhdmUgcmVhY2hlZCB0aGUgYm90dG9tIGFuZCBoYXZlIHJldHJpZXZlZFwiKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LmRyYXdUZXh0KFdJRFRIIC0gKFdJRFRIIC0gMTYpLCAxMywgXCIlY3t3aGl0ZX10aGUgZmFibGVkIHdlYXBvbiBhbmQgc2F2ZWQgeW91ciBwZW9wbGVcIik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5kcmF3VGV4dChXSURUSCAtIChXSURUSCAtIDE4KSwgMjQsIFwiJWN7d2hpdGV9UHJlc3MgW2VudGVyXSB0byByZXN0YXJ0IHRoZSBnYW1lXCIpO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXM7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiBfbGlzdGVuZXIoZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuc3RhcnRHYW1lcGxheSgpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBfbGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb3NlQ2luZW1hdGljKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG5cbiAgICAgICAgdGhpcy5kaXNwbGF5LmRyYXdUZXh0KFdJRFRIIC0gKFdJRFRIIC0gNSksIDEyLCBcIiVje3doaXRlfVlvdSBoYXZlIGRpZWQsIGFuZCB0aGUgbGFzdCBob3BlIG9mIHlvdXIgcGVvcGxlIGRpZXMgd2l0aCB5b3VcIik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5kcmF3VGV4dChXSURUSCAtIChXSURUSCAtIDE4KSwgMjQsIFwiJWN7d2hpdGV9UHJlc3MgW2VudGVyXSB0byByZXN0YXJ0IHRoZSBnYW1lXCIpO1xuXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXM7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiBfbGlzdGVuZXIoZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuc3RhcnRHYW1lcGxheSgpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBfbGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWVwbGF5KCkge1xuICAgICAgICAvLyBsb29raW5nIGF0IG9iamVjdHMgb24gdGhlIG1hcCB3aXRoIHRoZSBtb3VzZVxuICAgICAgICB0aGlzLmhvb2tNb3VzZUxvb2soKTtcblxuICAgICAgICB0aGlzLnNjaGVkdWxlciA9IG5ldyBTY2hlZHVsZXIuU2ltcGxlKCk7XG4gICAgICAgIHRoaXMubWFuYWdlciA9IG5ldyBNYW5hZ2VyKHRoaXMpO1xuICAgICAgICB0aGlzLnBsYXllciA9IGNyZWF0ZU9iamVjdChcInBsYXllclwiLCAxLCAxKTtcbiAgICAgICAgdGhpcy5sb2FkTGV2ZWwoXCJsZXZlbF8xXCIpO1xuICAgIH1cbiAgICBcbiAgICBkaXNwbGF5TWVzc2FnZSh0ZXh0KSB7XG4gICAgICAgIHRoaXMudG90YWxNZXNzYWdlcysrO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgV0lEVEg7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCBVSV9IRUlHSFQ7IGorKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheS5kcmF3KGksIEhFSUdIVCAtIGosIFwiXCIsIFwiYmxhY2tcIiwgXCJibGFja1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRMb2dMaW5lcy5sZW5ndGggPT09IDUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExvZ0xpbmVzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRMb2dMaW5lcy5wdXNoKHRoaXMudG90YWxNZXNzYWdlcyArIFwiKSBcIiArIHRleHQpO1xuICAgICAgICBmb3IgKGxldCBkID0gMDsgZCA8IHRoaXMuY3VycmVudExvZ0xpbmVzLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkuZHJhd1RleHQoMCwgIEhFSUdIVCAtIDUgKyBkLCBcIiVje3doaXRlfVwiICsgdGhpcy5jdXJyZW50TG9nTGluZXNbZF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0FsbCgpIHtcbiAgICAgICAgdGhpcy5nYW1lT2JqZWN0c1xuICAgICAgICAgICAgLmZpbHRlcihvID0+IG8ubGlnaHRpbmcgJiYgdHlwZW9mIG8ubGlnaHRpbmcuY29tcHV0ZSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgLmZvckVhY2gobyA9PiBvLmxpZ2h0aW5nLmNvbXB1dGUodGhpcy5tYXApKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIubGlnaHRpbmcuY29tcHV0ZSh0aGlzLm1hcCk7XG5cbiAgICAgICAgZHJhd01hcCh0aGlzLmRpc3BsYXksIHRoaXMubWFwKTtcblxuICAgICAgICAvLyBGSVggTUU6IGRlYWQgYm9kaWVzIGRyYXcgb3ZlciBlbmVtaWVzIG9uIHRoZSBzYW1lIHRpbGVcbiAgICAgICAgdGhpcy5nYW1lT2JqZWN0c1xuICAgICAgICAgICAgLmZpbHRlcihvID0+IG8uZ3JhcGhpY3MgJiYgdHlwZW9mIG8uZ3JhcGhpY3MuZHJhdyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgLmZvckVhY2gobyA9PiBvLmdyYXBoaWNzLmRyYXcodGhpcy5kaXNwbGF5LCB0aGlzLm1hcCkpO1xuXG4gICAgICAgIHRoaXMucGxheWVyLmdyYXBoaWNzLmRyYXcodGhpcy5kaXNwbGF5LCB0aGlzLm1hcCk7XG4gICAgICAgIGRyYXdVSSh0aGlzLmRpc3BsYXksIHRoaXMuY3VycmVudExldmVsLCB0aGlzLnBsYXllcik7XG4gICAgfVxuXG4gICAgbG9hZExldmVsIChuYW1lKSB7XG4gICAgICAgIHRoaXMuY3VycmVudExldmVsKys7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VycmVudExldmVsID09PSAyMSkge1xuICAgICAgICAgICAgdGhpcy53aW5DaW5lbWF0aWMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHttYXAsIHBsYXllckxvY2F0aW9uLCBvYmplY3RzfSA9IGxvYWRUaWxlZE1hcChuYW1lKTtcbiAgICAgICAgdGhpcy5tYXAgPSBtYXA7XG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMgPSBvYmplY3RzO1xuXG4gICAgICAgIHRoaXMucGxheWVyLnggPSBwbGF5ZXJMb2NhdGlvblswXTtcbiAgICAgICAgdGhpcy5wbGF5ZXIueSA9IHBsYXllckxvY2F0aW9uWzFdO1xuICAgICAgICB0aGlzLnBsYXllci5maWdodGVyLm1hbmEgPSB0aGlzLnBsYXllci5maWdodGVyLm1heE1hbmE7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZXIuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIuYWRkKHRoaXMubWFuYWdlciwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyLmFkZCh0aGlzLnBsYXllciwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMuZm9yRWFjaChlID0+IHRoaXMuc2NoZWR1bGVyLmFkZChlLCB0cnVlKSk7XG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEVuZ2luZSh0aGlzLnNjaGVkdWxlcik7XG4gICAgICAgIHRoaXMuZW5naW5lLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgaG9va01vdXNlTG9vayAoKSB7XG4gICAgICAgIC8vIGJyZWFrIG91dCB0aGUgaG9vayBhbmQgdW5ob29rIG1vdXNlIGxvb2sgaW50byB0aGVpciBvd24gZnVuY3Rpb25zXG4gICAgICAgIC8vIGJlY2F1c2Ugb3RoZXIgYWN0aW9ucyBuZWVkIHRvIHRha2Ugb3ZlciB0aGUgbW91c2UgYXQgc29tZSBwb2ludHNcbiAgICAgICAgLy8gYW5kIHdlIGRvbid0IHdhbnQgYW55dGhpbmcgb3RoZXIgdGhhbiB0aGUgR2FtZSBvYmplY3QgaW50ZXJhY3RpbmdcbiAgICAgICAgLy8gd2l0aCB0aGUgY2FudmFzXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbW91c2VMb29rKTtcbiAgICB9XG5cbiAgICB1bmhvb2tNb3VzZUxvb2sgKCkge1xuICAgICAgICB0aGlzLmNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1vdXNlTG9vayk7XG4gICAgfVxuXG4gICAgYWRkT2JqZWN0IChvYmplY3QpIHtcbiAgICAgICAgdGhpcy5nYW1lT2JqZWN0cy5wdXNoKG9iamVjdCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyLmFkZCh0aGlzLmdhbWVPYmplY3RzW3RoaXMuZ2FtZU9iamVjdHMubGVuZ3RoIC0gMV0sIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbiBvYmplY3QgZnJvbSB0aGUgd29ybGRcbiAgICAgKiBAcGFyYW0gIHtHYW1lT2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAqL1xuICAgIHJlbW92ZU9iamVjdCAob2JqZWN0KSB7XG4gICAgICAgIC8vIGNvdWxkIHVzZSBhbiBvYmplY3QgcG9vbCBvciBhIGxpbmtlZCBsaXN0IHRvIHNwZWVkIHVwIHRoaXMgb3BlcmF0aW9uXG4gICAgICAgIC8vIGJ1dCB0aGF0IHNlZW1zIG92ZXJraWxsIGZvciB0aGlzXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMuc3BsaWNlKHRoaXMuZ2FtZU9iamVjdHMuaW5kZXhPZihvYmplY3QpLCAxKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZXIucmVtb3ZlKG9iamVjdCk7XG4gICAgfVxufVxuZ2xvYmFscy5HYW1lID0gbmV3IFNpbXBsZUR1bmdlb25DcmF3bGVyKCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUk5HIH0gZnJvbSBcInJvdC1qc1wiO1xuXG5pbXBvcnQge1xuICAgIFdPUkxEX0hFSUdIVCxcbiAgICBXT1JMRF9XSURUSCxcbiAgICBDT0xPUl9BTUJJRU5UX0xJR0hULFxuICAgIENPTE9SX0RBUktfV0FMTCxcbiAgICBDT0xPUl9JTlZJU0lCTEVfV0FMTCxcbiAgICBDT0xPUl9EQVJLX0dST1VORCxcbiAgICBDT0xPUl9JTlZJU0lCTEVfR1JPVU5ELFxuICAgIFRpbGVEYXRhXG59IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IGNyZWF0ZU9iamVjdCB9IGZyb20gXCIuL29iamVjdFwiO1xuXG5pbXBvcnQgbGV2ZWxfMSBmcm9tIFwiLi9tYXBzL2xldmVsXzFcIjtcbmltcG9ydCBsZXZlbF8yIGZyb20gXCIuL21hcHMvbGV2ZWxfMlwiO1xuaW1wb3J0IGRldl9yb29tIGZyb20gXCIuL21hcHMvZGV2X3Jvb21cIjtcblxuY29uc3QgVGlsZU1hcHMgPSB7IGxldmVsXzEsIGxldmVsXzIsIGRldl9yb29tIH07XG5cbmNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNoYXIsIGZnQ29sb3IsIGJnQ29sb3IsIGZnQ29sb3JFeHBsb3JlZCwgYmdDb2xvckV4cGxvcmVkLCBibG9ja3MsIGJsb2Nrc1NpZ2h0LCB2aXNpYmxlID0gZmFsc2UsIGV4cGxvcmVkID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jaGFyID0gY2hhcjtcbiAgICAgICAgdGhpcy5mZ0NvbG9yID0gZmdDb2xvcjtcbiAgICAgICAgdGhpcy5iZ0NvbG9yID0gYmdDb2xvcjtcbiAgICAgICAgdGhpcy5mZ0NvbG9yRXhwbG9yZWQgPSBmZ0NvbG9yRXhwbG9yZWQ7XG4gICAgICAgIHRoaXMuYmdDb2xvckV4cGxvcmVkID0gYmdDb2xvckV4cGxvcmVkO1xuICAgICAgICB0aGlzLmJsb2NrcyA9IGJsb2NrcztcbiAgICAgICAgdGhpcy5ibG9ja3NTaWdodCA9IGJsb2Nrc1NpZ2h0O1xuICAgICAgICB0aGlzLnZpc2libGUgPSB2aXNpYmxlO1xuICAgICAgICB0aGlzLmV4cGxvcmVkID0gZXhwbG9yZWQ7XG4gICAgICAgIHRoaXMucmVmbGVjdGl2aXR5ID0gMC4xODtcbiAgICAgICAgdGhpcy5saWdodGluZ0NvbG9yID0gYmdDb2xvcjtcbiAgICB9XG5cbiAgICBpc1Zpc2libGVBbmRMaXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGUgJiYgdGhpcy5saWdodGluZ0NvbG9yICE9PSBDT0xPUl9BTUJJRU5UX0xJR0hUO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUaWxlZE1hcChsZXZlbCkge1xuICAgIGNvbnN0IHNvdXJjZURhdGEgPSBUaWxlTWFwc1tsZXZlbF07XG4gICAgY29uc29sZS5sb2coc291cmNlRGF0YS53aWR0aCwgXCJXT1JMRF9XSURUSFwiLCBXT1JMRF9XSURUSCwgc291cmNlRGF0YS5oZWlnaHQsIFdPUkxEX0hFSUdIVCk7XG4gICAgY29uc3QgdGlsZVNpemUgPSBzb3VyY2VEYXRhLnRpbGVoZWlnaHQ7XG4gICAgbGV0IG1hcCA9IFtdLCBvYmplY3RzID0gW10sIHBsYXllckxvY2F0aW9uID0gbnVsbDtcblxuICAgIGlmIChzb3VyY2VEYXRhLndpZHRoICE9PSBXT1JMRF9XSURUSCAmJiBzb3VyY2VEYXRhLmhlaWdodCAhPT0gV09STERfSEVJR0hUKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9hZGVkIG1hcCAke25hbWV9IGRvZXNuJ3QgbWF0Y2ggd29ybGQgd2lkdGgvaGVpZ2h0YCk7XG4gICAgfVxuXG4gICAgaWYgKHNvdXJjZURhdGEubGF5ZXJzLmxlbmd0aCAhPT0gMikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExvYWRlZCBtYXAgJHtuYW1lfSBzaG91bGQgb25seSBoYXZlIHR3byBsYXllcnNgKTtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2xhdGVkID0gc291cmNlRGF0YS5sYXllcnNbMF0uZGF0YS5tYXAodGlsZSA9PiB7XG4gICAgICAgIGlmICghKHRpbGUgaW4gVGlsZURhdGEpKSB7IHRocm93IG5ldyBFcnJvcihgJHt0aWxlfSBpcyBub3QgdmFsaWQgdGlsZWApOyB9XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IFRpbGVEYXRhW3RpbGVdO1xuICAgICAgICByZXR1cm4gbmV3IFRpbGUoXG4gICAgICAgICAgICBkYXRhLm5hbWUsXG4gICAgICAgICAgICBkYXRhLmNoYXIsXG4gICAgICAgICAgICBkYXRhLmZnQ29sb3IsXG4gICAgICAgICAgICBkYXRhLmJnQ29sb3IsXG4gICAgICAgICAgICBkYXRhLmZnQ29sb3JFeHBsb3JlZCxcbiAgICAgICAgICAgIGRhdGEuYmdDb2xvckV4cGxvcmVkLFxuICAgICAgICAgICAgZGF0YS5ibG9ja3MsXG4gICAgICAgICAgICBkYXRhLmJsb2Nrc1NpZ2h0XG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYW5zbGF0ZWQubGVuZ3RoOyBpICs9IFdPUkxEX1dJRFRIKSB7XG4gICAgICAgIG1hcC5wdXNoKHRyYW5zbGF0ZWQuc2xpY2UoaSwgaSArIFdPUkxEX1dJRFRIKSk7XG4gICAgfVxuXG4gICAgc291cmNlRGF0YS5sYXllcnNbMV0ub2JqZWN0cy5mb3JFYWNoKG8gPT4ge1xuICAgICAgICBjb25zdCBmaW5kUHJvcGVydHkgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgaWYgKCFvLnByb3BlcnRpZXMgfHwgIW8ucHJvcGVydGllcy5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gby5wcm9wZXJ0aWVzLmZpbHRlcihwcm9wID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcC5uYW1lID09PSBuYW1lO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5WzBdLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBpZCA9IGZpbmRQcm9wZXJ0eShcImlkXCIpLFxuICAgICAgICAgICAgb2JqLFxuICAgICAgICAgICAgaW52ZW50b3J5ID0gZmluZFByb3BlcnR5KFwiaW52ZW50b3J5XCIpLFxuICAgICAgICAgICAgbGV2ZWxOYW1lID0gZmluZFByb3BlcnR5KFwibGV2ZWxOYW1lXCIpLFxuICAgICAgICAgICAgc3BlbGxJZCA9IGZpbmRQcm9wZXJ0eShcInNwZWxsSWRcIik7XG5cbiAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgTm8gaWQgZm9yICR7by5uYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG8ucG9pbnQpIHtcbiAgICAgICAgICAgIGlmIChpZCA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgICAgICAgICAgIHBsYXllckxvY2F0aW9uID0gW01hdGguZmxvb3Ioby54IC8gdGlsZVNpemUpLCBNYXRoLmZsb29yKG8ueSAvIHRpbGVTaXplKV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iaiA9IGNyZWF0ZU9iamVjdChcbiAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3Ioby54IC8gdGlsZVNpemUpLFxuICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKG8ueSAvIHRpbGVTaXplKSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGludmVudG9yeSAmJiBvYmouaW52ZW50b3J5Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGludmVudG9yeS5zcGxpdChcIixcIikuZm9yRWFjaChpID0+IG9iai5pbnZlbnRvcnlDb21wb25lbnQuYWRkSXRlbShpKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsTmFtZSAmJiBvYmouaW50ZXJhY3RhYmxlICYmIG9iai5pbnRlcmFjdGFibGUuc2V0TGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmludGVyYWN0YWJsZS5zZXRMZXZlbChsZXZlbE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzcGVsbElkICYmIG9iai5pbnRlcmFjdGFibGUgJiYgb2JqLmludGVyYWN0YWJsZS5zZXRTcGVsbCkge1xuICAgICAgICAgICAgICAgICAgICBvYmouaW50ZXJhY3RhYmxlLnNldFNwZWxsKHNwZWxsSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYmplY3RzLnB1c2gob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvLnR5cGUgPT09IFwiUmVjdGFuZ2xlXCIpIHtcbiAgICAgICAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihvLnggLyB0aWxlU2l6ZSk7XG4gICAgICAgICAgICBsZXQgeSA9IE1hdGguZmxvb3Ioby55IC8gdGlsZVNpemUpO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLmZsb29yKG8ud2lkdGggLyB0aWxlU2l6ZSkgKyB4O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5mbG9vcihvLmhlaWdodCAvIHRpbGVTaXplKSArIHk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0geDsgaiA8IHdpZHRoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0cy5wdXNoKGNyZWF0ZU9iamVjdChpZCwgaSwgaikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgbWFwLCBwbGF5ZXJMb2NhdGlvbiwgb2JqZWN0cyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZEVtcHR5U3BhY2UobWFwLCBvYmplY3RzKSB7XG4gICAgbGV0IHggPSAwLCB5ID0gMDtcbiAgICB3aGlsZSAoZXhwb3J0cy5pc0Jsb2NrZWQobWFwLCBvYmplY3RzLCB4LCB5KSkge1xuICAgICAgICB4ID0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogV09STERfV0lEVEgpO1xuICAgICAgICB5ID0gTWF0aC5mbG9vcihSTkcuZ2V0VW5pZm9ybSgpICogV09STERfSEVJR0hUKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgeCwgeSB9O1xufVxuXG5leHBvcnQgY29uc3QgZ2V0T2JqZWN0c0F0TG9jYXRpb24gPSBmdW5jdGlvbihvYmplY3RzLCB4LCB5KSB7XG4gICAgcmV0dXJuIG9iamVjdHMuZmlsdGVyKG9iamVjdCA9PiBvYmplY3QueCA9PSB4ICYmIG9iamVjdC55ID09IHkpO1xufTtcblxuLyoqXG4gICAgUmV0dXJucyBudWxsIGlmIHRoZSBzcGFjZSBpcyBvcGVuLCB0cnVlIG9yIHRoZSBibG9ja2luZyBvYmplY3RcbiAgICBpZiBibG9ja2VkXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQmxvY2tlZChtYXAsIG9iamVjdHMsIHgsIHkpIHtcbiAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSBXT1JMRF9XSURUSCB8fCB5ID49IFdPUkxEX0hFSUdIVCB8fCBtYXBbeV1beF0uYmxvY2tzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldCA9IG9iamVjdHMuZmlsdGVyKG9iamVjdCA9PiBvYmplY3QueCA9PSB4ICYmIG9iamVjdC55ID09IHkgJiYgb2JqZWN0LmJsb2NrcyA9PT0gdHJ1ZSlbMF07XG4gICAgcmV0dXJuIHRhcmdldCA/IHRhcmdldCA6IG51bGw7XG59XG5cbi8qKlxuICAgIFJldHVybnMgdHJ1ZSBpZiBzcGFjZSBibG9ja3Mgc2lnaHQsIGZhbHNlIG90aGVyd2lzZVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NpZ2h0QmxvY2tlZChtYXAsIG9iamVjdHMsIHgsIHkpIHtcbiAgICBpZiAoeCA8IDAgfHwgeSA8IDAgfHwgeCA+PSBXT1JMRF9XSURUSCB8fCB5ID49IFdPUkxEX0hFSUdIVCB8fCBtYXBbeV1beF0uYmxvY2tzU2lnaHQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgbyA9IGdldE9iamVjdHNBdExvY2F0aW9uKG9iamVjdHMsIHgsIHkpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgby5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAob1tpXS5ibG9ja3NTaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmNvbnN0IGRyYXdUaWxlID0gZnVuY3Rpb24oZGlzcGxheSwgdGlsZSwgeCwgeSkge1xuICAgIGxldCBmZ0NvbG9yLCBiZ0NvbG9yO1xuXG4gICAgaWYgKHRpbGUuYmxvY2tzKSB7XG4gICAgICAgIGlmICghdGlsZS5leHBsb3JlZCkge1xuICAgICAgICAgICAgZmdDb2xvciA9IENPTE9SX0lOVklTSUJMRV9XQUxMO1xuICAgICAgICAgICAgYmdDb2xvciA9IENPTE9SX0lOVklTSUJMRV9XQUxMO1xuICAgICAgICB9IGVsc2UgaWYgKHRpbGUuZXhwbG9yZWQgJiYgdGlsZS52aXNpYmxlKSB7XG4gICAgICAgICAgICBmZ0NvbG9yID0gdGlsZS5mZ0NvbG9yO1xuICAgICAgICAgICAgYmdDb2xvciA9IHRpbGUuYmdDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmICh0aWxlLmV4cGxvcmVkICYmICF0aWxlLnZpc2libGUpIHtcbiAgICAgICAgICAgIGZnQ29sb3IgPSBDT0xPUl9EQVJLX1dBTEw7XG4gICAgICAgICAgICBiZ0NvbG9yID0gQ09MT1JfREFSS19XQUxMO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRpbGUuaXNWaXNpYmxlQW5kTGl0KCkpIHtcbiAgICAgICAgICAgIGZnQ29sb3IgPSB0aWxlLmZnQ29sb3I7XG4gICAgICAgICAgICBiZ0NvbG9yID0gdGlsZS5saWdodGluZ0NvbG9yO1xuICAgICAgICB9IGVsc2UgaWYgKHRpbGUuZXhwbG9yZWQpIHtcbiAgICAgICAgICAgIGZnQ29sb3IgPSBDT0xPUl9EQVJLX0dST1VORDtcbiAgICAgICAgICAgIGJnQ29sb3IgPSBDT0xPUl9EQVJLX0dST1VORDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZnQ29sb3IgPSBDT0xPUl9JTlZJU0lCTEVfR1JPVU5EO1xuICAgICAgICAgICAgYmdDb2xvciA9IENPTE9SX0lOVklTSUJMRV9HUk9VTkQ7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGRpc3BsYXkuZHJhdyh4LCB5LCB0aWxlLmNoYXIsIGZnQ29sb3IsIGJnQ29sb3IpO1xufTtcblxuLyoqXG4gKiBGaW5kIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBHYW1lT2JqZWN0c1xuICogQHBhcmFtICB7R2FtZU9iamVjdH0gYSBBbiBvYmplY3RcbiAqIEBwYXJhbSAge0dhbWVPYmplY3R9IGIgQW4gb2JqZWN0XG4gKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgIFRoZSBkaXN0YW5jZVxuICovXG5jb25zdCBkaXN0YW5jZUJldHdlZW5PYmplY3RzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBjb25zdCBkeCA9IGIueCAtIGEueDtcbiAgICBjb25zdCBkeSA9IGIueSAtIGEueTtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICoqIDIgKyBkeSAqKiAyKTtcbn07XG5cbi8qKlxuICogRmluZCB0aGUgY2xvc2VzdCBvdGhlciBhY3RvciBmcm9tIGFuIGFjdG9yIG9yaWdpbiBnaXZlbiB0aGUgYWN0b3IgaXNcbiAqIG9uIGEgdmlzaWJsZSB0aWxlLlxuICpcbiAqIEBwYXJhbSAge0FycmF5fSAgICAgIG1hcCAgICAgICAgICBUaGUgY3VycmVudCBtYXBcbiAqIEBwYXJhbSAge0FycmF5fSAgICAgIGFjdG9ycyAgICAgICBUaGUgY3VycmVudCBsaXN0IG9mIGFjdG9yc1xuICogQHBhcmFtICB7R2FtZU9iamVjdH0gb3JpZ2luICAgICAgIFRoZSBzdGFydGluZyBvYmplY3RcbiAqIEBwYXJhbSAge051bWJlcn0gICAgIG1heERpc3RhbmNlICBUaGUgbWF4IGFsbG93ZWQgZGlzdGFuY2UgYmVmb3JlIGdpdmluZyB1cFxuICogQHJldHVybiB7R2FtZU9iamVjdH0gICAgICAgICAgICAgIFRoZSBjbG9zZXN0IGFjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbG9zZXN0VmlzaWJsZUZpZ2h0ZXIobWFwLCBhY3RvcnMsIG9yaWdpbiwgbWF4RGlzdGFuY2UpIHtcbiAgICBsZXQgY2xvc2VzdEFjdG9yID0gbnVsbDtcbiAgICBsZXQgY2xvc2VzdERpc3RhbmNlID0gbWF4RGlzdGFuY2UgKyAxO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYWN0b3IgPSBhY3RvcnNbaV07XG4gICAgICAgIGlmIChhY3Rvci5maWdodGVyICE9PSB1bmRlZmluZWQgJiYgYWN0b3IuZmlnaHRlciAhPT0gbnVsbCAmJiBhY3RvciAhPT0gb3JpZ2luICYmIG1hcFthY3Rvci55XVthY3Rvci54XS52aXNpYmxlKSB7XG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGRpc3RhbmNlQmV0d2Vlbk9iamVjdHMob3JpZ2luLCBhY3Rvcik7XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCBjbG9zZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBjbG9zZXN0QWN0b3IgPSBhY3RvcjtcbiAgICAgICAgICAgICAgICBjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbG9zZXN0QWN0b3I7XG59XG5cbi8qKlxuICogU2V0IGFsbCB0aGUgVGlsZSBvYmplY3RzIGluIGEgbWFwIHRvIHZpc2libGVcbiAqIEBwYXJhbSAge0FycmF5fSBtYXAgIEFuIGFycmF5IG9mIGFycmF5cyBvZiBUaWxlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VmlzaWJpbGl0eShtYXApIHtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IG1hcC5sZW5ndGg7IHkrKykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IG1hcFt5XS5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgbWFwW3ldW3hdLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIG1hcFt5XVt4XS5saWdodGluZ0NvbG9yID0gQ09MT1JfQU1CSUVOVF9MSUdIVDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBTZXQgYWxsIHRoZSBUaWxlIG9iamVjdHMgaW4gYSBtYXAgdG8gZXhwbG9yZWRcbiAqIEBwYXJhbSAge0FycmF5fSBtYXAgIEFuIGFycmF5IG9mIGFycmF5cyBvZiBUaWxlc1xuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEFsbFRvRXhwbG9yZWQobWFwKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBtYXAubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBtYXBbeV0ubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgIG1hcFt5XVt4XS5leHBsb3JlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQ2FsbHMgZHJhd1RpbGUgb24gYW4gYXJyYXkgb2YgVGlsZSBhcnJheXNcbiAqIEBwYXJhbSAge09iamVjdH0gZGlzcGxheSBUaGUgUk9UIGRpc3BsYXlcbiAqIEBwYXJhbSAge0FycmF5fSBtYXAgICAgICBBbiBhcnJheSBvZiBhcnJheXMgb2YgVGlsZXNcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkcmF3TWFwKGRpc3BsYXksIG1hcCkge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgbWFwLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgbWFwW3ldLmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICBkcmF3VGlsZShkaXNwbGF5LCBtYXBbeV1beF0sIHgsIHkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiKGZ1bmN0aW9uKG5hbWUsZGF0YSl7XG4gaWYodHlwZW9mIG9uVGlsZU1hcExvYWRlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgaWYodHlwZW9mIFRpbGVNYXBzID09PSAndW5kZWZpbmVkJykgVGlsZU1hcHMgPSB7fTtcbiAgVGlsZU1hcHNbbmFtZV0gPSBkYXRhO1xuIH0gZWxzZSB7XG4gIG9uVGlsZU1hcExvYWRlZChuYW1lLGRhdGEpO1xuIH1cbiBpZih0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBkYXRhO1xuIH19KShcImRldl9yb29tXCIsXG57IFwiY29tcHJlc3Npb25sZXZlbFwiOi0xLFxuIFwiaGVpZ2h0XCI6MzksXG4gXCJpbmZpbml0ZVwiOmZhbHNlLFxuIFwibGF5ZXJzXCI6W1xuICAgICAgICB7XG4gICAgICAgICBcImRhdGFcIjpbMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OF0sXG4gICAgICAgICBcImhlaWdodFwiOjM5LFxuICAgICAgICAgXCJpZFwiOjEsXG4gICAgICAgICBcIm5hbWVcIjpcIlRpbGUgTGF5ZXIgMVwiLFxuICAgICAgICAgXCJvcGFjaXR5XCI6MSxcbiAgICAgICAgIFwidHlwZVwiOlwidGlsZWxheWVyXCIsXG4gICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgXCJ3aWR0aFwiOjcwLFxuICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgIFwieVwiOjBcbiAgICAgICAgfSwgXG4gICAgICAgIHtcbiAgICAgICAgIFwiZHJhd29yZGVyXCI6XCJ0b3Bkb3duXCIsXG4gICAgICAgICBcImlkXCI6MixcbiAgICAgICAgIFwibmFtZVwiOlwiT2JqZWN0IExheWVyIDFcIixcbiAgICAgICAgIFwib2JqZWN0c1wiOltcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjEsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiUGxheWVyXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwicGxheWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjg4MC4yNTAwMzU0NjI4MjUsXG4gICAgICAgICAgICAgICAgIFwieVwiOjc1NC4xOTIxOTc4NTA1ODRcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjIsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiRG9vclwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImRvb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTI5Ny40NTg4OTM4NzE0NSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NjI3LjgwMjY5MDU4Mjk2XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjozLFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkdvYmxpblwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImdvYmxpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjoxMjk3LjQ1ODg5Mzg3MTQ1LFxuICAgICAgICAgICAgICAgICBcInlcIjo0ODguNzg5MjM3NjY4MTYxXG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjo0LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkNoZXN0XCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiY2hlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpbnZlbnRvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImhlYWx0aF9wb3Rpb25fd2VhayxsaWdodG5pbmdfc2Nyb2xsX3dlYWtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTIwMS43OTM3MjE5NzMwOSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6ODg3Ljg5MjM3NjY4MTYxNFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6NSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJMYW50ZXJuXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibGFudGVyblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjoxMTM5Ljc2MDgzNzA3MDI1LFxuICAgICAgICAgICAgICAgICBcInlcIjo3NTcuODQ3NTMzNjMyMjg3XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjo2LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkNoZXN0XCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiY2hlc3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpbnZlbnRvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImhlYWx0aF9wb3Rpb25fd2VhayxoZWFsdGhfcG90aW9uX3dlYWtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTAzOC44NjM5NzYwODM3MSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6ODg3LjE0NDk5MjUyNjE1OFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6NyxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJNYWdpa2EgU2hyaW5lXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibWFnaWNfc2hyaW5lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwic3BlbGxJZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibGlnaHRuaW5nX2JvbHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTQyNS4yNjE1ODQ0NTQ0MSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NzYwLjgzNzA3MDI1NDExMVxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6OCxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJDcmF0ZVwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImNyYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaW52ZW50b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJoZWFsdGhfcG90aW9uX3dlYWtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTEzNS4yNzY1MzIxMzc1MixcbiAgICAgICAgICAgICAgICAgXCJ5XCI6ODg3LjE0NDk5MjUyNjE1OFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6OSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJEb29yXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiZG9vclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjoxMDM5LjYxMTM2MDIzOTE2LFxuICAgICAgICAgICAgICAgICBcInlcIjo2MzAuNzkyMjI3MjA0NzgzXG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxMCxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJHb2JsaW4gQnJ1dGVcIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJnb2JsaW5fYnJ1dGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTA0My4zNDgyODEwMTY0NCxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NTA3LjQ3Mzg0MTU1NDU1OVxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgXCJvcGFjaXR5XCI6MSxcbiAgICAgICAgIFwidHlwZVwiOlwib2JqZWN0Z3JvdXBcIixcbiAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICBcInhcIjowLFxuICAgICAgICAgXCJ5XCI6MFxuICAgICAgICB9XSxcbiBcIm5leHRsYXllcmlkXCI6MyxcbiBcIm5leHRvYmplY3RpZFwiOjExLFxuIFwib3JpZW50YXRpb25cIjpcIm9ydGhvZ29uYWxcIixcbiBcInJlbmRlcm9yZGVyXCI6XCJyaWdodC1kb3duXCIsXG4gXCJ0aWxlZHZlcnNpb25cIjpcIjEuMy40XCIsXG4gXCJ0aWxlaGVpZ2h0XCI6MzIsXG4gXCJ0aWxlc2V0c1wiOltcbiAgICAgICAge1xuICAgICAgICAgXCJmaXJzdGdpZFwiOjEsXG4gICAgICAgICBcInNvdXJjZVwiOlwiLi5cXC9EdW5nZW9uQ3Jhd2xfUHJvamVjdFV0dW1ub1RpbGVzZXQudHN4XCJcbiAgICAgICAgfV0sXG4gXCJ0aWxld2lkdGhcIjozMixcbiBcInR5cGVcIjpcIm1hcFwiLFxuIFwidmVyc2lvblwiOjEuMixcbiBcIndpZHRoXCI6NzBcbn0pOyIsIihmdW5jdGlvbihuYW1lLGRhdGEpe1xuIGlmKHR5cGVvZiBvblRpbGVNYXBMb2FkZWQgPT09ICd1bmRlZmluZWQnKSB7XG4gIGlmKHR5cGVvZiBUaWxlTWFwcyA9PT0gJ3VuZGVmaW5lZCcpIFRpbGVNYXBzID0ge307XG4gIFRpbGVNYXBzW25hbWVdID0gZGF0YTtcbiB9IGVsc2Uge1xuICBvblRpbGVNYXBMb2FkZWQobmFtZSxkYXRhKTtcbiB9XG4gaWYodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZGF0YTtcbiB9fSkoXCJsZXZlbF8xXCIsXG57IFwiY29tcHJlc3Npb25sZXZlbFwiOi0xLFxuIFwiZWRpdG9yc2V0dGluZ3NcIjpcbiAgICB7XG4gICAgIFwiZXhwb3J0XCI6XG4gICAgICAgIHtcbiAgICAgICAgIFwidGFyZ2V0XCI6XCIuXCJcbiAgICAgICAgfVxuICAgIH0sXG4gXCJoZWlnaHRcIjozOSxcbiBcImluZmluaXRlXCI6ZmFsc2UsXG4gXCJsYXllcnNcIjpbXG4gICAgICAgIHtcbiAgICAgICAgIFwiZGF0YVwiOlsxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCAxMTY1LCAxMTY1LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDExNjUsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTE2NSwgMTE2NSwgMTE2NSwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMTY1LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4XSxcbiAgICAgICAgIFwiaGVpZ2h0XCI6MzksXG4gICAgICAgICBcImlkXCI6MSxcbiAgICAgICAgIFwibmFtZVwiOlwiV29ybGRcIixcbiAgICAgICAgIFwib3BhY2l0eVwiOjEsXG4gICAgICAgICBcInR5cGVcIjpcInRpbGVsYXllclwiLFxuICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgIFwid2lkdGhcIjo3MCxcbiAgICAgICAgIFwieFwiOjAsXG4gICAgICAgICBcInlcIjowXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICBcImRyYXdvcmRlclwiOlwidG9wZG93blwiLFxuICAgICAgICAgXCJpZFwiOjQsXG4gICAgICAgICBcIm5hbWVcIjpcIk9iamVjdCBMYXllciAxXCIsXG4gICAgICAgICBcIm9iamVjdHNcIjpbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjo0LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlBsYXllclwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcInBsYXllclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjo0MzQuNDA3MjE0ODg1NzMyLFxuICAgICAgICAgICAgICAgICBcInlcIjo1OTcuNDI2MjU4OTY5NThcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjUsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiUmF0XCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwicmF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjEwMzQuMjEzMDY1ODEzMTUsXG4gICAgICAgICAgICAgICAgIFwieVwiOjYzNy45Nzk0NTAxNzIyMzdcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjEwLFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlJhdFwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcInJhdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjo5NDYuNjQ3NzgwOTI1NDAyLFxuICAgICAgICAgICAgICAgICBcInlcIjoxMTkyLjE2MjQxNzM3NDg4XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxMSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJEb29yXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibG9hZF9kb29yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwibGV2ZWxOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJsZXZlbF8yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjE1NTMuMzUyMjE5MDc0NixcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NTY3Ljg1Mzk2MDU5NTU2MlxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MTIsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiTGFudGVyblwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImxhbnRlcm5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTQ5Mi4wOTg4NDQ3NDI2NSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NDQzLjQyNzk1OTkxNjkyXG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxNyxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJDcmF0ZVwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImNyYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaW52ZW50b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJoZWFsdGhfcG90aW9uX3dlYWtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6NTI4LjU2NTY5NjAzODIyOSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NTIuMTgyMjIwMTI1OTkxMlxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MTgsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiTGFudGVyblwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImxhbnRlcm5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6MTQ4OC4zMjkwOTYzNzE2MixcbiAgICAgICAgICAgICAgICAgXCJ5XCI6Njk1LjYzMjA3NzY1MTk1M1xuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MTksXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiUmF0XCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwicmF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjY4MS43NjU2NTc0OTk0MjIsXG4gICAgICAgICAgICAgICAgIFwieVwiOjk3LjA2NDk0MTA2NzcxNDVcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgIFwib3BhY2l0eVwiOjEsXG4gICAgICAgICBcInR5cGVcIjpcIm9iamVjdGdyb3VwXCIsXG4gICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgIFwieVwiOjBcbiAgICAgICAgfV0sXG4gXCJuZXh0bGF5ZXJpZFwiOjUsXG4gXCJuZXh0b2JqZWN0aWRcIjoyMCxcbiBcIm9yaWVudGF0aW9uXCI6XCJvcnRob2dvbmFsXCIsXG4gXCJyZW5kZXJvcmRlclwiOlwicmlnaHQtZG93blwiLFxuIFwidGlsZWR2ZXJzaW9uXCI6XCIxLjMuNFwiLFxuIFwidGlsZWhlaWdodFwiOjMyLFxuIFwidGlsZXNldHNcIjpbXG4gICAgICAgIHtcbiAgICAgICAgIFwiZmlyc3RnaWRcIjoxLFxuICAgICAgICAgXCJzb3VyY2VcIjpcIi4uXFwvRHVuZ2VvbkNyYXdsX1Byb2plY3RVdHVtbm9UaWxlc2V0LnRzeFwiXG4gICAgICAgIH1dLFxuIFwidGlsZXdpZHRoXCI6MzIsXG4gXCJ0eXBlXCI6XCJtYXBcIixcbiBcInZlcnNpb25cIjoxLjIsXG4gXCJ3aWR0aFwiOjcwXG59KTsiLCIoZnVuY3Rpb24obmFtZSxkYXRhKXtcbiBpZih0eXBlb2Ygb25UaWxlTWFwTG9hZGVkID09PSAndW5kZWZpbmVkJykge1xuICBpZih0eXBlb2YgVGlsZU1hcHMgPT09ICd1bmRlZmluZWQnKSBUaWxlTWFwcyA9IHt9O1xuICBUaWxlTWFwc1tuYW1lXSA9IGRhdGE7XG4gfSBlbHNlIHtcbiAgb25UaWxlTWFwTG9hZGVkKG5hbWUsZGF0YSk7XG4gfVxuIGlmKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGRhdGE7XG4gfX0pKFwibGV2ZWxfMlwiLFxueyBcImNvbXByZXNzaW9ubGV2ZWxcIjotMSxcbiBcImVkaXRvcnNldHRpbmdzXCI6XG4gICAge1xuICAgICBcImV4cG9ydFwiOlxuICAgICAgICB7XG4gICAgICAgICBcInRhcmdldFwiOlwiLlwiXG4gICAgICAgIH1cbiAgICB9LFxuIFwiaGVpZ2h0XCI6MzksXG4gXCJpbmZpbml0ZVwiOmZhbHNlLFxuIFwibGF5ZXJzXCI6W1xuICAgICAgICB7XG4gICAgICAgICBcImRhdGFcIjpbMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgMjkzNiwgMjkzNiwgMjkzNiwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCAyNzEwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgMjcxMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDI4NjksIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgMTA0OCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDkwMCwgOTAwLCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCAxMDQ4LCA5MDAsIDkwMCwgOTAwLCA5MDAsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDgsIDEwNDhdLFxuICAgICAgICAgXCJoZWlnaHRcIjozOSxcbiAgICAgICAgIFwiaWRcIjoxLFxuICAgICAgICAgXCJuYW1lXCI6XCJXb3JsZFwiLFxuICAgICAgICAgXCJvcGFjaXR5XCI6MSxcbiAgICAgICAgIFwidHlwZVwiOlwidGlsZWxheWVyXCIsXG4gICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgXCJ3aWR0aFwiOjcwLFxuICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgIFwieVwiOjBcbiAgICAgICAgfSwgXG4gICAgICAgIHtcbiAgICAgICAgIFwiZHJhd29yZGVyXCI6XCJ0b3Bkb3duXCIsXG4gICAgICAgICBcImlkXCI6NCxcbiAgICAgICAgIFwibmFtZVwiOlwiT2JqZWN0IExheWVyIDFcIixcbiAgICAgICAgIFwib2JqZWN0c1wiOltcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjQsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiUGxheWVyXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwicGxheWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjQ4Ljk3MzA4OTM0NDQ3NjIsXG4gICAgICAgICAgICAgICAgIFwieVwiOjcyNy45MTE1NzM3Njk3MlxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6NSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJHb2xiaW5cIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJnb2JsaW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6NjQ0LjE5MzcxOTQ0NDA1MixcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NzEyLjMzMDU0MDcwODYzOFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6NixcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJDaGVzdFwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImNoZXN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaW52ZW50b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJoZWFsdGhfcG90aW9uX3dlYWssbGlnaHRuaW5nX3Njcm9sbF93ZWFrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjM0MS41MjYyNzUzOTc0MjUsXG4gICAgICAgICAgICAgICAgIFwieVwiOjk0OC42NzI5Njc4NTA2NTJcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjcsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiU3RhaXJzXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwic3RhaXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwibGV2ZWxOYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJsZXZlbF8yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjEyMDIuMzA3ODg1NjEyMTEsXG4gICAgICAgICAgICAgICAgIFwieVwiOjI0Ny45Mzc3NDc1NjQ5NzZcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjgsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiQ3JhdGVcIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJjcmF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImludmVudG9yeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaGVhbHRoX3BvdGlvbl93ZWFrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjM3MC42MTcyNjE1NTQxMzIsXG4gICAgICAgICAgICAgICAgIFwieVwiOjk0OS45NDc5MjY5MDU4M1xuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6OSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJDcmF0ZVwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImNyYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaW52ZW50b3J5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6OTQ0LjcyOTc3NjMyMTA4NCxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6NzI1LjMzMzM0MDg0MjA2N1xuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MTEsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiQ3JhdGVcIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJjcmF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImludmVudG9yeVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaGVhbHRoX3BvdGlvbl93ZWFrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjk0My42MDM5MDY4OTI4MTksXG4gICAgICAgICAgICAgICAgIFwieVwiOjc2MC4xODI0Njg0ODM2NTVcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjEyLFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkdvbGJpblwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImdvYmxpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjozNDAuNTQ1NTk2MDQ0NDQyLFxuICAgICAgICAgICAgICAgICBcInlcIjoxMDgzLjI2MDk3ODMxNzMxXG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxNCxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJGaXJlXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiY2FtcGZpcmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6NjU4Ljc4MTcxMDI5NDgyNSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6MjM3LjIwMTk4MDEyNTUxOFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MTUsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiRmlyZVwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImNhbXBmaXJlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjc4Ni4yNTg2MTg2MDQwODgsXG4gICAgICAgICAgICAgICAgIFwieVwiOjIzOC4yOTY4NDI4NjkyMzlcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjE2LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkZpcmVcIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJjYW1wZmlyZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjo5MTAuODUwMzY4OTM2NzM2LFxuICAgICAgICAgICAgICAgICBcInlcIjoyMzkuNTA2NDcxNTEzMjQ1XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxNyxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJMYW50ZXJuXCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibGFudGVyblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjoyMDkuMjY1NzU1NDEzMDg4LFxuICAgICAgICAgICAgICAgICBcInlcIjo5NTEuOTc3NzQyODMyOTVcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjE4LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkdvbGJpblwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImdvYmxpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjo5NDkuNTU4NDg1NTQ0OTM4LFxuICAgICAgICAgICAgICAgICBcInlcIjoxNDUuMTU1NDM3MjgwNzU1XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICBcImhlaWdodFwiOjAsXG4gICAgICAgICAgICAgICAgIFwiaWRcIjoxOSxcbiAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJHb2xiaW5cIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJnb2JsaW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgIFwicm90YXRpb25cIjowLFxuICAgICAgICAgICAgICAgICBcInR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcIndpZHRoXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ4XCI6NjIyLjk1ODc1MTY2MzIzOSxcbiAgICAgICAgICAgICAgICAgXCJ5XCI6MTQ3LjU3NDY5NDU2ODc2N1xuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIjowLFxuICAgICAgICAgICAgICAgICBcImlkXCI6MjAsXG4gICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiUmF0XCIsXG4gICAgICAgICAgICAgICAgIFwicG9pbnRcIjp0cnVlLFxuICAgICAgICAgICAgICAgICBcInByb3BlcnRpZXNcIjpbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwicmF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjI0NC4zNDQ5ODYwODkyNzEsXG4gICAgICAgICAgICAgICAgIFwieVwiOjIyNi4yMDA1NTY0MjkxNzZcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjIyLFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkxvYWQgRG9vclwiLFxuICAgICAgICAgICAgICAgICBcInBvaW50XCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzXCI6W1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjpcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImxvYWRfZG9vclwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImxldmVsTmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwibGV2ZWxfMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgXCJyb3RhdGlvblwiOjAsXG4gICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgIFwidmlzaWJsZVwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwid2lkdGhcIjowLFxuICAgICAgICAgICAgICAgICBcInhcIjoxNC42MDU0MTgxMzg5ODcsXG4gICAgICAgICAgICAgICAgIFwieVwiOjcyMy4yMDM3NjkxNDAxNjVcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCI6MCxcbiAgICAgICAgICAgICAgICAgXCJpZFwiOjI5LFxuICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIkRvb3JcIixcbiAgICAgICAgICAgICAgICAgXCJwb2ludFwiOnRydWUsXG4gICAgICAgICAgICAgICAgIFwicHJvcGVydGllc1wiOltcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJkb29yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICBcInJvdGF0aW9uXCI6MCxcbiAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgXCJ2aXNpYmxlXCI6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiOjAsXG4gICAgICAgICAgICAgICAgIFwieFwiOjUyNi45MTAwNDg5MjczNjIsXG4gICAgICAgICAgICAgICAgIFwieVwiOjcyOC4yNjQ5NjA0ODE3NDZcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgIFwib3BhY2l0eVwiOjEsXG4gICAgICAgICBcInR5cGVcIjpcIm9iamVjdGdyb3VwXCIsXG4gICAgICAgICBcInZpc2libGVcIjp0cnVlLFxuICAgICAgICAgXCJ4XCI6MCxcbiAgICAgICAgIFwieVwiOjBcbiAgICAgICAgfV0sXG4gXCJuZXh0bGF5ZXJpZFwiOjUsXG4gXCJuZXh0b2JqZWN0aWRcIjozMCxcbiBcIm9yaWVudGF0aW9uXCI6XCJvcnRob2dvbmFsXCIsXG4gXCJyZW5kZXJvcmRlclwiOlwicmlnaHQtZG93blwiLFxuIFwidGlsZWR2ZXJzaW9uXCI6XCIxLjMuNFwiLFxuIFwidGlsZWhlaWdodFwiOjMyLFxuIFwidGlsZXNldHNcIjpbXG4gICAgICAgIHtcbiAgICAgICAgIFwiZmlyc3RnaWRcIjoxLFxuICAgICAgICAgXCJzb3VyY2VcIjpcIi4uXFwvRHVuZ2VvbkNyYXdsX1Byb2plY3RVdHVtbm9UaWxlc2V0LnRzeFwiXG4gICAgICAgIH1dLFxuIFwidGlsZXdpZHRoXCI6MzIsXG4gXCJ0eXBlXCI6XCJtYXBcIixcbiBcInZlcnNpb25cIjoxLjIsXG4gXCJ3aWR0aFwiOjcwXG59KTsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUk5HIH0gZnJvbSBcInJvdC1qc1wiO1xuXG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiLi9nbG9iYWxzXCI7XG5pbXBvcnQgeyBPYmplY3REYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xuaW1wb3J0IHsgQmFzaWNNb25zdGVyQUksIFBhdHJvbGxpbmdNb25zdGVyQUksIENoZXN0QUksIERyb3BwZWRJdGVtQUkgfSBmcm9tIFwiLi9haVwiO1xuaW1wb3J0IHsgUGxheWVyQ29udHJvbEFJIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBHaXZlSXRlbXNJbnRlcmFjdGFibGUsIEdpdmVTcGVsbEludGVyYWN0YWJsZSwgTG9hZExldmVsSW50ZXJhY3RhYmxlLCBEb29ySW50ZXJhY3RhYmxlIH0gZnJvbSBcIi4vaW50ZXJhY3RhYmxlXCI7XG5pbXBvcnQgeyBCYXNpY0ludmVudG9yeSB9IGZyb20gXCIuL2ludmVudG9yeVwiO1xuaW1wb3J0IHsgQmFzaWNHcmFwaGljcywgRHJhd0FmdGVyU2VlbiB9IGZyb20gXCIuL2dyYXBoaWNzXCI7XG5pbXBvcnQgeyBSZWZsZWN0aXZpdHlMaWdodGluZywgUGxheWVyTGlnaHRpbmcgfSBmcm9tIFwiLi9saWdodGluZ1wiO1xuaW1wb3J0IHsgQmFzaWNGaWdodGVyIH0gZnJvbSBcIi4vZmlnaHRlclwiO1xuXG5cbi8qKlxuICogQmFzZSBjbGFzcyByZXByZXNlbnRpbmcgYWxsIG9iamVjdHMgaW4gdGhlIGdhbWUuIFVzZXMgdGhlXG4gKiBFbnRpdHkvQ29tcG9uZW50IGRlc2lnbiBwYXR0ZXJuIHNvIHRoYXQgdGhlIG9ubHkgdGhpbmcgdGhhdFxuICogdGhpcyBvYmplY3QgZGlyZWN0bHkgY29udHJvbHMgaXMgaXRzIHBvc2l0aW9uLCB3aGV0aGVyIGl0XG4gKiBoYXMgY29sbGlzaW9uLCBhbmQgaXRzIG5hbWUuXG4gKlxuICogVGhlIGFjdCBtZXRob2QgaXMgdGhlIG1ldGhvZCBjYWxsZWQgYnkgdGhlIGVuZ2luZSBldmVyeSB0dXJuLlxuICovXG5jbGFzcyBHYW1lT2JqZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCB4LCB5LCBuYW1lLCBibG9ja3M9ZmFsc2UsIGJsb2Nrc1NpZ2h0PWZhbHNlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuYmxvY2tzID0gYmxvY2tzO1xuICAgICAgICB0aGlzLmJsb2Nrc1NpZ2h0ID0gYmxvY2tzU2lnaHQ7XG5cbiAgICAgICAgdGhpcy5ncmFwaGljcyA9IG51bGw7XG4gICAgICAgIHRoaXMubGlnaHRpbmcgPSBudWxsO1xuICAgICAgICB0aGlzLmZpZ2h0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmFpID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnZlbnRvcnlDb21wb25lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmludGVyYWN0YWJsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgc2V0R3JhcGhpY3MoZ3JhcGhpY3MpIHtcbiAgICAgICAgZ3JhcGhpY3Muc2V0T3duZXIodGhpcyk7XG4gICAgICAgIHRoaXMuZ3JhcGhpY3MgPSBncmFwaGljcztcbiAgICB9XG5cbiAgICBzZXRMaWdodGluZyhsaWdodGluZykge1xuICAgICAgICBsaWdodGluZy5zZXRPd25lcih0aGlzKTtcbiAgICAgICAgdGhpcy5saWdodGluZyA9IGxpZ2h0aW5nO1xuICAgIH1cblxuICAgIHNldEZpZ2h0ZXIoZmlnaHRlcikge1xuICAgICAgICBmaWdodGVyLnNldE93bmVyKHRoaXMpO1xuICAgICAgICB0aGlzLmZpZ2h0ZXIgPSBmaWdodGVyO1xuICAgIH1cblxuICAgIHNldEFJKGFpKSB7XG4gICAgICAgIGFpLnNldE93bmVyKHRoaXMpO1xuICAgICAgICB0aGlzLmFpID0gYWk7XG4gICAgfVxuXG4gICAgc2V0SW52ZW50b3J5KGludmVudG9yeUNvbXBvbmVudCkge1xuICAgICAgICBpbnZlbnRvcnlDb21wb25lbnQuc2V0T3duZXIodGhpcyk7XG4gICAgICAgIHRoaXMuaW52ZW50b3J5Q29tcG9uZW50ID0gaW52ZW50b3J5Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHNldEludGVyYWN0YWJsZShpbnRlcmFjdGFibGUpIHtcbiAgICAgICAgaW50ZXJhY3RhYmxlLnNldE93bmVyKHRoaXMpO1xuICAgICAgICB0aGlzLmludGVyYWN0YWJsZSA9IGludGVyYWN0YWJsZTtcbiAgICB9XG5cbiAgICBhY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmFpICYmIHR5cGVvZiB0aGlzLmFpLmFjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmFpLmFjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZpZ2h0ZXIgJiYgdHlwZW9mIHRoaXMuZmlnaHRlci5hY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpcy5maWdodGVyLmFjdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFVzZSBhbiBpZCB0byBncmFiIG9iamVjdCBkYXRhIGFuZCBjcmVhdGUgYSBuZXcgR2FtZU9iamVjdFxuICogQHBhcmFtICB7U3RyaW5nfSBpZCAgICAgVGhlIG9iamVjdCBpZFxuICogQHJldHVybiB7R2FtZU9iamVjdH0gICAgQSBHYW1lT2JqZWN0IHdpdGggdGhlIGNvbXBvbmVudHMgYW5kIHBhcmFtcyBnaXZlbiBpbiB0aGUgZGF0YVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlT2JqZWN0ID0gZnVuY3Rpb24gKGlkLCB4PTAsIHk9MCkge1xuICAgIGlmICghKGlkIGluIE9iamVjdERhdGEpKSB7IHRocm93IG5ldyBFcnJvcihgJHtpZH0gaXMgbm90IHZhbGlkIG9iamVjdCBpZGApOyB9XG5cbiAgICBjb25zdCBkYXRhID0gT2JqZWN0RGF0YVtpZF07XG4gICAgbGV0IG9iamVjdCA9IG5ldyBHYW1lT2JqZWN0KFxuICAgICAgICBpZCxcbiAgICAgICAgeCwgeSxcbiAgICAgICAgZGF0YS5uYW1lLFxuICAgICAgICBkYXRhLmJsb2NrcyxcbiAgICAgICAgZGF0YS5ibG9ja3NTaWdodFxuICAgICk7XG5cbiAgICBpZiAoZGF0YS5haSkge1xuICAgICAgICBzd2l0Y2ggKGRhdGEuYWkpIHtcbiAgICAgICAgY2FzZSBcInBsYXllcl9jb250cm9sX2FpXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0QUkobmV3IFBsYXllckNvbnRyb2xBSSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYmFzaWNfbW9uc3Rlcl9haVwiOlxuICAgICAgICAgICAgb2JqZWN0LnNldEFJKG5ldyBCYXNpY01vbnN0ZXJBSShkYXRhLnNpZ2h0UmFuZ2UpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicGF0cm9sbGluZ19tb25zdGVyX2FpXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0QUkobmV3IFBhdHJvbGxpbmdNb25zdGVyQUkoZGF0YS5zaWdodFJhbmdlKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNoZXN0X2FpXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0QUkobmV3IENoZXN0QUkoZGF0YS5iZ0NvbG9yLCBkYXRhLmVtcHR5Q29sb3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZHJvcHBlZF9pdGVtX2FpXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0QUkobmV3IERyb3BwZWRJdGVtQUkoKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuaGFuZGxlZCBBSSB0eXBlICR7ZGF0YS5haX1gKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRhdGEuZ3JhcGhpY3MpIHtcbiAgICAgICAgc3dpdGNoIChkYXRhLmdyYXBoaWNzKSB7XG4gICAgICAgIGNhc2UgXCJiYXNpY19ncmFwaGljc1wiOlxuICAgICAgICAgICAgb2JqZWN0LnNldEdyYXBoaWNzKG5ldyBCYXNpY0dyYXBoaWNzKGRhdGEuY2hhciwgZGF0YS5mZ0NvbG9yLCBkYXRhLmJnQ29sb3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZHJhd19hZnRlcl9zZWVuXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0R3JhcGhpY3MobmV3IERyYXdBZnRlclNlZW4oZGF0YS5jaGFyLCBkYXRhLmZnQ29sb3IsIGRhdGEuYmdDb2xvcikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmhhbmRsZWQgR3JhcGhpY3MgdHlwZSAke2RhdGEuZ3JhcGhpY3N9YCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkYXRhLmxpZ2h0aW5nKSB7XG4gICAgICAgIHN3aXRjaCAoZGF0YS5saWdodGluZykge1xuICAgICAgICBjYXNlIFwicmVmbGVjdGl2aXR5XCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0TGlnaHRpbmcobmV3IFJlZmxlY3Rpdml0eUxpZ2h0aW5nKGRhdGEubGlnaHRpbmdDb2xvciwgZGF0YS5saWdodGluZ1JhbmdlKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInBsYXllcl9saWdodGluZ1wiOlxuICAgICAgICAgICAgb2JqZWN0LnNldExpZ2h0aW5nKG5ldyBQbGF5ZXJMaWdodGluZyhkYXRhLmxpZ2h0aW5nQ29sb3IsIGRhdGEubGlnaHRpbmdSYW5nZSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmhhbmRsZWQgTGlnaHRpbmcgdHlwZSAke2RhdGEubGlnaHRpbmd9YCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkYXRhLmZpZ2h0ZXIpIHtcbiAgICAgICAgbGV0IGNhbGxiYWNrO1xuXG4gICAgICAgIHN3aXRjaCAoZGF0YS5vbkRlYXRoKSB7XG4gICAgICAgIGNhc2UgXCJkZWZhdWx0XCI6XG4gICAgICAgICAgICBjYWxsYmFjayA9IGVuZW15RGVhdGhDYWxsYmFjaztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVtb3ZlRnJvbVdvcmxkXCI6XG4gICAgICAgICAgICBjYWxsYmFjayA9IHJlbW92ZURlYXRoQ2FsbGJhY2s7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuaGFuZGxlZCBvbkRlYXRoIHR5cGUgJHtkYXRhLm9uRGVhdGh9YCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZGF0YS5maWdodGVyKSB7XG4gICAgICAgIGNhc2UgXCJiYXNpY19maWdodGVyXCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0RmlnaHRlcihuZXcgQmFzaWNGaWdodGVyKFxuICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmhhbmRsZWQgRmlnaHRlciB0eXBlICR7ZGF0YS5maWdodGVyfWApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGF0YS5pbnZlbnRvcnkpIHtcbiAgICAgICAgc3dpdGNoIChkYXRhLmludmVudG9yeSkge1xuICAgICAgICBjYXNlIFwiYmFzaWNfaW52ZW50b3J5XCI6XG4gICAgICAgICAgICBvYmplY3Quc2V0SW52ZW50b3J5KG5ldyBCYXNpY0ludmVudG9yeSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5oYW5kbGVkIEludmVudG9yeSB0eXBlICR7ZGF0YS5pbnZlbnRvcnl9YCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLmludmVudG9yeVBvb2wpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5pbnZlbnRvcnlQb29sLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKFJORy5nZXRVbmlmb3JtKCkgPD0gZGF0YS5pbnZlbnRvcnlQb29sW2ldWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5pbnZlbnRvcnlDb21wb25lbnQuYWRkSXRlbShkYXRhLmludmVudG9yeVBvb2xbaV1bMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkYXRhLmludGVyYWN0YWJsZSkge1xuICAgICAgICBzd2l0Y2ggKGRhdGEuaW50ZXJhY3RhYmxlKSB7XG4gICAgICAgIGNhc2UgXCJnaXZlX2l0ZW1zX2ludGVyYWN0YWJsZVwiOlxuICAgICAgICAgICAgb2JqZWN0LnNldEludGVyYWN0YWJsZShuZXcgR2l2ZUl0ZW1zSW50ZXJhY3RhYmxlKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJnaXZlX3NwZWxsX2ludGVyYWN0YWJsZVwiOlxuICAgICAgICAgICAgb2JqZWN0LnNldEludGVyYWN0YWJsZShuZXcgR2l2ZVNwZWxsSW50ZXJhY3RhYmxlKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJsb2FkX2xldmVsX2ludGVyYWN0YWJsZVwiOlxuICAgICAgICAgICAgb2JqZWN0LnNldEludGVyYWN0YWJsZShuZXcgTG9hZExldmVsSW50ZXJhY3RhYmxlKCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb29yX2ludGVyYWN0YWJsZVwiOlxuICAgICAgICAgICAgb2JqZWN0LnNldEludGVyYWN0YWJsZShuZXcgRG9vckludGVyYWN0YWJsZSgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiBcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuaGFuZGxlZCBJbnRlcmFjdGFibGUgdHlwZSAke2RhdGEuaW50ZXJhY3RhYmxlfWApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBBSSwgZmlnaHRlciwgYW5kIGludHJhY3RhYmxlIG9mZiBvZiBhbiBvYmplY3QuIENoYW5nZXMgZ3JhcGhpY3NcbiAqIHRvIGRlYWQgYm9keSBncmFwaGljcyBhbmQgc2V0cyBibG9ja2luZyB0byBmYWxzZS4gQWxzbyBzcGF3bnMgYSBkcm9wcGVkIGl0ZW1cbiAqIGlmIHRoZXJlIHdlcmUgaXRlbXMgaW4gdGhlIGludmVudG9yeS5cbiAqXG4gKiBAcGFyYW0gIHtHYW1lT2JqZWN0fSB0YXJnZXQgICAgVGhlIEdhbWVPYmplY3QgdGhhdCB3YXMga2lsbGVkXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5jb25zdCBlbmVteURlYXRoQ2FsbGJhY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICBnbG9iYWxzLkdhbWUuZGlzcGxheU1lc3NhZ2UodGFyZ2V0Lm5hbWUgKyBcIiBoYXMgYmVlbiBraWxsZWRcIik7XG4gICAgdGFyZ2V0LmdyYXBoaWNzLmNoYXIgPSBcIiVcIjtcbiAgICB0YXJnZXQuZ3JhcGhpY3MuZmdDb2xvciA9IFwiZ3JlZW5cIjtcbiAgICB0YXJnZXQuZ3JhcGhpY3MuYmdDb2xvciA9IFwiZGFya3JlZFwiO1xuICAgIHRhcmdldC5ibG9ja3MgPSBmYWxzZTtcbiAgICB0YXJnZXQuZmlnaHRlciA9IG51bGw7XG4gICAgdGFyZ2V0LmFpID0gbnVsbDtcbiAgICB0YXJnZXQuaW50ZXJhY3RhYmxlID0gbnVsbDtcbiAgICB0YXJnZXQubmFtZSA9IFwiUmVtYWlucyBvZiBhIFwiICsgdGFyZ2V0Lm5hbWU7XG5cbiAgICBpZiAodGFyZ2V0LmludmVudG9yeUNvbXBvbmVudC5nZXRJRHNBbmRDb3VudHMoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBpdGVtID0gY3JlYXRlT2JqZWN0KFwiZHJvcHBlZF9pdGVtXCIsIHRhcmdldC54LCB0YXJnZXQueSk7XG4gICAgICAgIGl0ZW0uaW52ZW50b3J5Q29tcG9uZW50ID0gdGFyZ2V0LmludmVudG9yeUNvbXBvbmVudDtcbiAgICAgICAgZ2xvYmFscy5HYW1lLmFkZE9iamVjdChpdGVtKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuaW52ZW50b3J5Q29tcG9uZW50ID0gbnVsbDtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBzZWxmIGZyb20gd29ybGQgYW5kIHNjaGVkdWxlci4gQWxzbyBzcGF3bnMgYSBkcm9wcGVkIGl0ZW1cbiAqIGlmIHRoZXJlIHdlcmUgaXRlbXMgaW4gdGhlIGludmVudG9yeS5cbiAqXG4gKiBAcGFyYW0gIHtHYW1lT2JqZWN0fSB0YXJnZXQgICAgVGhlIEdhbWVPYmplY3QgdGhhdCB3YXMga2lsbGVkXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5jb25zdCByZW1vdmVEZWF0aENhbGxiYWNrID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5pbnZlbnRvcnlDb21wb25lbnQuZ2V0SURzQW5kQ291bnRzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgaXRlbSA9IGNyZWF0ZU9iamVjdChcImRyb3BwZWRfaXRlbVwiLCB0YXJnZXQueCwgdGFyZ2V0LnkpO1xuICAgICAgICBpdGVtLmludmVudG9yeUNvbXBvbmVudCA9IHRhcmdldC5pbnZlbnRvcnlDb21wb25lbnQ7XG4gICAgICAgIGdsb2JhbHMuR2FtZS5hZGRPYmplY3QoaXRlbSk7XG4gICAgfVxuXG4gICAgZ2xvYmFscy5HYW1lLnJlbW92ZU9iamVjdCh0YXJnZXQpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBESVJTIH0gZnJvbSBcInJvdC1qc1wiO1xuXG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiLi9nbG9iYWxzXCI7XG5pbXBvcnQgeyBXSURUSCwgU3BlbGxEYXRhLCBJdGVtRGF0YSB9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IGlzQmxvY2tlZCB9IGZyb20gXCIuL21hcFwiO1xuaW1wb3J0IHsgc2hvd1NlbGVjdGlvbk1lbnUsIHNob3dLZXlCaW5kaW5nTWVudSB9IGZyb20gXCIuL3VpXCI7XG5cbi8qKlxuICAgIHJldHVybnMgdHJ1ZSB3aGVuIG1vdmVkLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuY29uc3QgbW92ZUNvbW1hbmQgPSBmdW5jdGlvbihhY3RvciwgZGlyZWN0aW9uLCB0b3BvbG9neSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgZGlyID0gRElSU1t0b3BvbG9neV1bZGlyZWN0aW9uXTtcbiAgICAgICAgY29uc3QgbmV3WCA9IGFjdG9yLnggKyBkaXJbMF07XG4gICAgICAgIGNvbnN0IG5ld1kgPSBhY3Rvci55ICsgZGlyWzFdO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBpc0Jsb2NrZWQoZ2xvYmFscy5HYW1lLm1hcCwgZ2xvYmFscy5HYW1lLmdhbWVPYmplY3RzLCBuZXdYLCBuZXdZKTtcblxuICAgICAgICBpZiAodGFyZ2V0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmludGVyYWN0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5pbnRlcmFjdGFibGUuaW50ZXJhY3QoYWN0b3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmZpZ2h0ZXIpIHtcbiAgICAgICAgICAgICAgICBhY3Rvci5maWdodGVyLmF0dGFjayh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYWN0b3IueCA9IG5ld1g7XG4gICAgICAgIGFjdG9yLnkgPSBuZXdZO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xufTtcblxuY29uc3QgZ2V0SXRlbUNvbW1hbmQgPSBmdW5jdGlvbihhY3Rvcikge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBnbG9iYWxzLkdhbWUuZ2FtZU9iamVjdHMuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gXCJkcm9wcGVkX2l0ZW1cIiAmJiBpdGVtLnggPT09IGFjdG9yLnggJiYgaXRlbS55ID09PSBhY3Rvci55O1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaXRlbXNbMF0uaW50ZXJhY3RhYmxlLmludGVyYWN0KGFjdG9yKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKFwiVGhlcmUncyBubyBpdGVtIHRvIHBpY2sgdXBcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufTtcblxuY29uc3Qgb3BlbkludmVudG9yeUNvbW1hbmQgPSBmdW5jdGlvbihhY3Rvcikge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgc2hvd1NlbGVjdGlvbk1lbnUoXG4gICAgICAgICAgICBcIlBsYXllciBJbnZlbnRvcnlcIixcbiAgICAgICAgICAgIGFjdG9yLmludmVudG9yeUNvbXBvbmVudC5nZXROYW1lc0FuZENvdW50cygpLFxuICAgICAgICAgICAgXCJpbnZlbnRvcnlcIixcbiAgICAgICAgICAgIFdJRFRIXG4gICAgICAgICk7XG4gICAgICAgIGFjdG9yLmFpLnN0YXRlID0gXCJpbnZlbnRvcnlcIjtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG59O1xuXG5jb25zdCBvcGVuU3BlbGxzQ29tbWFuZCA9IGZ1bmN0aW9uKGFjdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBzaG93U2VsZWN0aW9uTWVudShcbiAgICAgICAgICAgIFwiU3BlbGxzXCIsXG4gICAgICAgICAgICBhY3Rvci5maWdodGVyLmdldEtub3duU3BlbGxzKCkubWFwKGUgPT4gU3BlbGxEYXRhW2VdKSxcbiAgICAgICAgICAgIFwic3BlbGxzXCIsXG4gICAgICAgICAgICBXSURUSFxuICAgICAgICApO1xuICAgICAgICBhY3Rvci5haS5zdGF0ZSA9IFwic3BlbGxfc2VsZWN0aW9uXCI7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xufTtcblxuY29uc3Qgb3BlbktleUJpbmRpbmdDb21tYW5kID0gZnVuY3Rpb24oYWN0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNob3dLZXlCaW5kaW5nTWVudSgpO1xuICAgICAgICBhY3Rvci5haS5zdGF0ZSA9IFwia2V5YmluZGluZ1wiO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbn07XG5cbi8qKlxuICogQ29udHJvbHMgdGhlIHBsYXllciBjaGFyYWN0ZXIgdGhyb3VnaCB1c2VyIGlucHV0XG4gKiBcbiAqIFdoaWxlIGl0IHdvdWxkIHByb2JhYmx5IG1ha2Ugc2Vuc2UgdG8gbW92ZSBpbnB1dCBoYW5kbGluZyBjb2RlXG4gKiB0byB0aGUgR2FtZSBvYmplY3Qgc2luY2UgaXQgbW9kaWZpZXMgZ2FtZSBzdGF0ZSwgYnV0IHB1dHRpbmdcbiAqIGluIGFuIEFJIGNvbXBvbmVudCBtYWRlIHRoZSBjb2RlIGNsZWFuZXJcbiAqL1xuY2xhc3MgUGxheWVyQ29udHJvbEFJIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vd25lciA9IG51bGw7XG4gICAgICAgIHRoaXMua2V5Q29tbWFuZE1hcCA9IHt9O1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJub3JtYWxcIjtcbiAgICB9XG5cbiAgICBzZXRPd25lcihvd25lcikge1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICAgIHRoaXMua2V5Q29tbWFuZE1hcCA9IHtcbiAgICAgICAgICAgIFwid1wiOiBbXCJNb3ZlIFVwXCIsIG1vdmVDb21tYW5kKHRoaXMub3duZXIsIDAsIDgpXSxcbiAgICAgICAgICAgIFwiZVwiOiBbXCJNb3ZlIFVwIFJpZ2h0XCIsIG1vdmVDb21tYW5kKHRoaXMub3duZXIsIDEsIDgpXSxcbiAgICAgICAgICAgIFwiZFwiOiBbXCJNb3ZlIFJpZ2h0XCIsIG1vdmVDb21tYW5kKHRoaXMub3duZXIsIDIsIDgpXSxcbiAgICAgICAgICAgIFwiY1wiOiBbXCJNb3ZlIERvd24gUmlnaHRcIiwgbW92ZUNvbW1hbmQodGhpcy5vd25lciwgMywgOCldLFxuICAgICAgICAgICAgXCJzXCI6IFtcIk1vdmUgRG93blwiLCBtb3ZlQ29tbWFuZCh0aGlzLm93bmVyLCA0LCA4KV0sXG4gICAgICAgICAgICBcInpcIjogW1wiTW92ZSBEb3duIExlZnRcIiwgbW92ZUNvbW1hbmQodGhpcy5vd25lciwgNSwgOCldLFxuICAgICAgICAgICAgXCJhXCI6IFtcIk1vdmUgTGVmdFwiLCBtb3ZlQ29tbWFuZCh0aGlzLm93bmVyLCA2LCA4KV0sXG4gICAgICAgICAgICBcInFcIjogW1wiTW92ZSBVcCBMZWZ0XCIsIG1vdmVDb21tYW5kKHRoaXMub3duZXIsIDcsIDgpXSxcbiAgICAgICAgICAgIFwiaVwiOiBbXCJJbnZlbnRvcnlcIiwgb3BlbkludmVudG9yeUNvbW1hbmQodGhpcy5vd25lcildLFxuICAgICAgICAgICAgXCJnXCI6IFtcIkdldCBJdGVtXCIsIGdldEl0ZW1Db21tYW5kKHRoaXMub3duZXIpXSxcbiAgICAgICAgICAgIFwibVwiOiBbXCJTcGVsbHNcIiwgb3BlblNwZWxsc0NvbW1hbmQodGhpcy5vd25lcildLFxuICAgICAgICAgICAgXCJFc2NhcGVcIjogW1wiS2V5IEJpbmRpbmdzXCIsIG9wZW5LZXlCaW5kaW5nQ29tbWFuZCh0aGlzLm93bmVyKV1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhY3QoKSB7XG4gICAgICAgIGdsb2JhbHMuR2FtZS5lbmdpbmUubG9jaygpO1xuICAgICAgICAvKiB3YWl0IGZvciB1c2VyIGlucHV0OyBkbyBzdHVmZiB3aGVuIHVzZXIgaGl0cyBhIGtleSAqL1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlRXZlbnQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3duZXIuZmlnaHRlciA9PT0gbnVsbCB8fCB0aGlzLm93bmVyLmZpZ2h0ZXIuaHAgPD0gMCkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zdCBrZXkgPSBlLmtleTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgICAgLyogb25lIG9mIG51bXBhZCBkaXJlY3Rpb25zPyAqL1xuICAgICAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMua2V5Q29tbWFuZE1hcCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFjdGVkID0gdGhpcy5rZXlDb21tYW5kTWFwW2tleV1bMV0oKTtcblxuICAgICAgICAgICAgaWYgKCFhY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09PSBcImludmVudG9yeVwiKSB7XG4gICAgICAgICAgICBjb25zdCBhQ29kZSA9IFwiYVwiLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICBjb25zdCB6Q29kZSA9IFwielwiLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICBjb25zdCBrZXlDb2RlID0ga2V5LmNoYXJDb2RlQXQoMCk7XG5cbiAgICAgICAgICAgIGlmIChrZXlDb2RlIDwgYUNvZGUgJiYga2V5Q29kZSA+IHpDb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoa2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwibm9ybWFsXCI7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLm1hbmFnZXIuYWN0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpbnZlbnRvcnlJbnB1dE1hcCA9IHt9O1xuICAgICAgICAgICAgY29uc3QgaW52ZW50b3J5SURzID0gdGhpcy5vd25lci5pbnZlbnRvcnlDb21wb25lbnQuZ2V0SURzQW5kQ291bnRzKCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW52ZW50b3J5SURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW52ZW50b3J5SW5wdXRNYXBbYUNvZGUgKyBpXSA9IGludmVudG9yeUlEc1tpXS5pZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEoa2V5Q29kZSBpbiBpbnZlbnRvcnlJbnB1dE1hcCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGl0ZW1EZXRhaWxzID0gSXRlbURhdGFbaW52ZW50b3J5SW5wdXRNYXBba2V5Q29kZV1dO1xuICAgICAgICAgICAgY29uc3QgdXNlQ2FsbGJhY2sgPSB1c2VkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmFpLnN0YXRlID0gXCJub3JtYWxcIjtcbiAgICAgICAgICAgICAgICBpZiAodXNlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmludmVudG9yeUNvbXBvbmVudC51c2VJdGVtKGludmVudG9yeUlucHV0TWFwW2tleUNvZGVdKTtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKFwiVXNlZCBcIiArIGl0ZW1EZXRhaWxzLmRpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmVuZ2luZS51bmxvY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaXRlbURldGFpbHMudXNlRnVuYyhpdGVtRGV0YWlscywgdGhpcy5vd25lciwgdXNlQ2FsbGJhY2suYmluZCh0aGlzKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gXCJzcGVsbF9zZWxlY3Rpb25cIikge1xuICAgICAgICAgICAgY29uc3QgYUNvZGUgPSBcImFcIi5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgY29uc3QgekNvZGUgPSBcInpcIi5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgY29uc3Qga2V5Q29kZSA9IGtleS5jaGFyQ29kZUF0KDApO1xuXG4gICAgICAgICAgICBpZiAoa2V5Q29kZSA8IGFDb2RlICYmIGtleUNvZGUgPiB6Q29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBcIm5vcm1hbFwiO1xuICAgICAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5tYW5hZ2VyLmFjdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc3BlbGxJbnB1dE1hcCA9IHt9O1xuICAgICAgICAgICAgY29uc3Qgc3BlbGxJZHMgPSB0aGlzLm93bmVyLmZpZ2h0ZXIuZ2V0S25vd25TcGVsbHMoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGVsbElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNwZWxsSW5wdXRNYXBbYUNvZGUgKyBpXSA9IHNwZWxsSWRzW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIShrZXlDb2RlIGluIHNwZWxsSW5wdXRNYXApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBkZXRhaWxzID0gU3BlbGxEYXRhW3NwZWxsSW5wdXRNYXBba2V5Q29kZV1dO1xuXG4gICAgICAgICAgICBpZiAoZGV0YWlscy5tYW5hQ29zdCA+IHRoaXMub3duZXIuZmlnaHRlci5tYW5hKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXlNZXNzYWdlKGBOb3QgZW5vdWdoIG1hbmEgdG8gY2FzdCAke2RldGFpbHMubmFtZX1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVzZUNhbGxiYWNrID0gdXNlZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci5haS5zdGF0ZSA9IFwibm9ybWFsXCI7XG4gICAgICAgICAgICAgICAgaWYgKHVzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vd25lci5maWdodGVyLnVzZU1hbmEoZGV0YWlscy5tYW5hQ29zdCk7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5lbmdpbmUudW5sb2NrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRldGFpbHMudXNlRnVuYyhkZXRhaWxzLCB0aGlzLm93bmVyLCB1c2VDYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlID09PSBcImtleWJpbmRpbmdcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXggbWVcIik7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcyk7XG4gICAgICAgIGdsb2JhbHMuR2FtZS5lbmdpbmUudW5sb2NrKCk7XG4gICAgfVxufVxuZXhwb3J0IHsgUGxheWVyQ29udHJvbEFJIH07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGdsb2JhbHMgZnJvbSBcIi4vZ2xvYmFsc1wiO1xuaW1wb3J0IHtcbiAgICBXSURUSCxcbiAgICBIRUlHSFQsXG4gICAgVUlfSEVJR0hULFxuICAgIE1BUF9GSUxMRURfU1BBQ0UsXG4gICAgTUFQX0VNUFRZX1NQQUNFLFxuICAgIExFVkVMX1VQX0JBU0UsXG4gICAgTEVWRUxfVVBfRkFDVE9SXG59IGZyb20gXCIuL2RhdGFcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdVSShkaXNwbGF5LCBsZXZlbCwgcGxheWVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBXSURUSDsgaSsrKSB7XG4gICAgICAgIGRpc3BsYXkuZHJhdyhpLCBIRUlHSFQgLSBVSV9IRUlHSFQsIE1BUF9GSUxMRURfU1BBQ0UsIFwiYmx1ZVwiLCBcImJsdWVcIik7XG4gICAgfVxuXG4gICAgZGlzcGxheS5kcmF3VGV4dCgxLCAgSEVJR0hUIC0gVUlfSEVJR0hULCBcIiVje3doaXRlfSVie2JsdWV9SFA6IFwiICsgcGxheWVyLmZpZ2h0ZXIuaHAgKyBcIi9cIiArIHBsYXllci5maWdodGVyLm1heEhwKTtcbiAgICBkaXNwbGF5LmRyYXdUZXh0KDE0LCAgSEVJR0hUIC0gVUlfSEVJR0hULCBcIiVje3doaXRlfSVie2JsdWV9TWFuYTogXCIgKyBwbGF5ZXIuZmlnaHRlci5tYW5hICsgXCIvXCIgKyBwbGF5ZXIuZmlnaHRlci5tYXhNYW5hKTtcbiAgICBkaXNwbGF5LmRyYXdUZXh0KDMwLCAgSEVJR0hUIC0gVUlfSEVJR0hULCBcIiVje3doaXRlfSVie2JsdWV9U1RSOiBcIiArIHBsYXllci5maWdodGVyLnN0cmVuZ3RoKTtcbiAgICBkaXNwbGF5LmRyYXdUZXh0KDM4LCAgSEVJR0hUIC0gVUlfSEVJR0hULCBcIiVje3doaXRlfSVie2JsdWV9REVGOiBcIiArIHBsYXllci5maWdodGVyLmRlZmVuc2UpO1xuICAgIGRpc3BsYXkuZHJhd1RleHQoNDYsICBIRUlHSFQgLSBVSV9IRUlHSFQsIFwiJWN7d2hpdGV9JWJ7Ymx1ZX1MVkw6IFwiICsgcGxheWVyLmZpZ2h0ZXIubGV2ZWwpO1xuICAgIGRpc3BsYXkuZHJhd1RleHQoNTQsICBIRUlHSFQgLSBVSV9IRUlHSFQsIFwiJWN7d2hpdGV9JWJ7Ymx1ZX1FWFA6IFwiICsgcGxheWVyLmZpZ2h0ZXIuZXhwZXJpZW5jZSArIFwiL1wiICsgKExFVkVMX1VQX0JBU0UgKyBwbGF5ZXIuZmlnaHRlci5sZXZlbCAqIExFVkVMX1VQX0ZBQ1RPUikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1NlbGVjdGlvbk1lbnUoaGVhZGVyLCBpdGVtcywgdHlwZSwgd2lkdGgpIHtcbiAgICBpZiAoaXRlbXMubGVuZ3RoID4gMjYpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcInRvbyBtYW55IGl0ZW1zXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYUNvZGUgPSBcImFcIi5jaGFyQ29kZUF0KDApO1xuXG4gICAgLy8gYWRkIGZvdXIgZm9yIGhlYWRlclxuICAgIGNvbnN0IGhlaWdodCA9IGl0ZW1zLmxlbmd0aCArIFVJX0hFSUdIVDtcblxuICAgIC8vIGRyYXcgYmFja2dyb3VuZFxuICAgIGZvciAobGV0IHcgPSAwOyB3IDwgd2lkdGg7IHcrKykge1xuICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IGhlaWdodDsgaCsrKSB7XG4gICAgICAgICAgICBpZiAodyA9PT0gMCB8fCBoID09PSAwIHx8IHcgPT09IHdpZHRoIC0gMSB8fCBoID09PSBoZWlnaHQgLSAxKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhdyh3LCBoLCBcIjFcIiwgXCJncmV5XCIsIFwiZ3JleVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhdyh3LCBoLCBcIjFcIiwgXCJibGFja1wiLCBcImJsYWNrXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhd1RleHQoMiwgMSwgXCIlY3t3aGl0ZX0lYntibGFja31cIiArIGhlYWRlcik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcImludmVudG9yeVwiOlxuICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhd1RleHQoXG4gICAgICAgICAgICAgICAgMiwgaSArIDMsIGAlY3t3aGl0ZX0lYntibGFja30gJHtTdHJpbmcuZnJvbUNoYXJDb2RlKGkgKyBhQ29kZSl9OiAke2l0ZW1zW2ldLm5hbWV9ICgke2l0ZW1zW2ldLmNvdW50fSlgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzcGVsbHNcIjpcbiAgICAgICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5LmRyYXdUZXh0KFxuICAgICAgICAgICAgICAgIDIsIGkgKyAzLCBgJWN7d2hpdGV9JWJ7YmxhY2t9ICR7U3RyaW5nLmZyb21DaGFyQ29kZShpICsgYUNvZGUpfTogJHtpdGVtc1tpXS5uYW1lfSBkbWc6ICR7aXRlbXNbaV0udmFsdWV9IGNvc3Q6ICR7aXRlbXNbaV0ubWFuYUNvc3R9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIG1lbnUgdHlwZSAke3R5cGV9YCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93S2V5QmluZGluZ01lbnUoKSB7XG4gICAgLy8gYWRkIG9uZSBmb3IgaGVhZGVyXG4gICAgY29uc3QgaGVpZ2h0ID0gMTY7XG4gICAgY29uc3Qgd2lkdGggPSBXSURUSDtcblxuICAgIC8vIGRyYXcgYmFja2dyb3VuZFxuICAgIGZvciAobGV0IHcgPSAwOyB3IDwgd2lkdGg7IHcrKykge1xuICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IGhlaWdodDsgaCsrKSB7XG4gICAgICAgICAgICBpZiAodyA9PT0gMCB8fCBoID09PSAwIHx8IHcgPT09IHdpZHRoIC0gMSB8fCBoID09PSBoZWlnaHQgLSAxKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhdyh3LCBoLCBcIjFcIiwgXCJncmV5XCIsIFwiZ3JleVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhdyh3LCBoLCBcIjFcIiwgXCJibGFja1wiLCBcImJsYWNrXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhd1RleHQoMiwgMSwgXCIlY3t3aGl0ZX0lYntibGFja30gS2V5Ym9hcmQgQmluZGluZ3NcIik7XG4gICAgZ2xvYmFscy5HYW1lLmRpc3BsYXkuZHJhd1RleHQoMiwgMywgXCIlY3t3aGl0ZX0lYntibGFja30gQ2xpY2sgb24gYW4gb3B0aW9uIHRvIGNoYW5nZSBpdFwiKTtcblxuICAgIGxldCBjb21tYW5kcyA9IE9iamVjdC5rZXlzKGdsb2JhbHMuR2FtZS5wbGF5ZXIua2V5Q29tbWFuZE1hcCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQga2V5ID0gY29tbWFuZHNbaV07XG4gICAgICAgIGdsb2JhbHMuR2FtZS5kaXNwbGF5LmRyYXdUZXh0KFxuICAgICAgICAgICAgMiwgaSArIDUsXG4gICAgICAgICAgICBcIiVje3doaXRlfSVie2JsYWNrfSBcIiArIGdsb2JhbHMuR2FtZS5wbGF5ZXIua2V5Q29tbWFuZE1hcFtrZXldWzBdICsgXCI6IFwiICsga2V5XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJTY3JlZW4oZGlzcGxheSkge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgSEVJR0hUOyB5KyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBXSURUSDsgeCsrKSB7XG4gICAgICAgICAgICBkaXNwbGF5LmRyYXcoeCwgeSwgTUFQX0VNUFRZX1NQQUNFLCBcImJsYWNrXCIsIFwiYmxhY2tcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gcmFuZG9tSW50RnJvbUludGVydmFsKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9