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

import RNG from "./rng";

interface Options {
	/** Use word mode? */
	words: boolean;
	/** Order, default = 3 */
	order: number;
	/** Prior value, default = 0.001 */
	prior: number;
}

type Events = { [key:string]: number };

/**
 * @class (Markov process)-based string generator. 
 * Copied from a <a href="http://www.roguebasin.roguelikedevelopment.org/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme">RogueBasin article</a>. 
 * Offers configurable order and prior.
 */
export default class StringGenerator {
	_options: Options;
	_boundary: string;
	_suffix: string;
	_prefix: string[];
	_priorValues: { [key:string]: number };
	_data: { [key:string]: Events };

	constructor(options: Partial<Options>) {
		this._options = {
			words: false,
			order: 3,
			prior: 0.001
		};
		Object.assign(this._options, options);

		this._boundary = String.fromCharCode(0);
		this._suffix = this._boundary;
		this._prefix = [];
		for (let i=0;i<this._options.order;i++) { this._prefix.push(this._boundary); }

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
		while (result[result.length-1] != this._boundary) {
			result.push(this._sample(result));
		}
		return this._join(result.slice(0, -1));
	}

	/**
	 * Observe (learn) a string from a training set
	 */
	observe(string: string) {
		let tokens = this._split(string);

		for (let i=0; i<tokens.length; i++) {
			this._priorValues[tokens[i]] = this._options.prior;
		}

		tokens = this._prefix.concat(tokens).concat(this._suffix); /* add boundary symbols */

		for (let i=this._options.order; i<tokens.length; i++) {
			let context = tokens.slice(i-this._options.order, i);
			let event = tokens[i];
			for (let j=0; j<context.length; j++) {
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
	_split(str: string) {
		return str.split(this._options.words ? /\s+/ : "");
	}

	/**
	 * @param {string[]}
	 * @returns {string} 
	 */
	_join(arr: string[]) {
		return arr.join(this._options.words ? " " : "");
	}

	/**
	 * @param {string[]} context
	 * @param {string} event
	 */
	_observeEvent(context: string[], event: string) {
		let key = this._join(context);
		if (!(key in this._data)) { this._data[key] = {}; }
		let data = this._data[key];

		if (!(event in data)) { data[event] = 0; }
		data[event]++;
	}

	/**
	 * @param {string[]}
	 * @returns {string}
	 */
	_sample(context: string[]) {
		context = this._backoff(context);
		let key = this._join(context);
		let data = this._data[key];

		let available : Events = {};

		if (this._options.prior) {
			for (let event in this._priorValues) { available[event] = this._priorValues[event]; }
			for (let event in data) { available[event] += data[event]; }
		} else { 
			available = data;
		}

		return RNG.getWeightedValue(available) as string;
	}

	/**
	 * @param {string[]}
	 * @returns {string[]}
	 */
	_backoff(context: string[]) {
		if (context.length > this._options.order) {
			context = context.slice(-this._options.order);
		} else if (context.length < this._options.order) {
			context = this._prefix.slice(0, this._options.order - context.length).concat(context);
		}

		while (!(this._join(context) in this._data) && context.length > 0) { context = context.slice(1); }

		return context;
	}
}
