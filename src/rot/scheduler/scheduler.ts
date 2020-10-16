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

import EventQueue from "../eventqueue";

export default class Scheduler<T = any> {
	_queue: EventQueue<T>;
	_repeat: T[];
	_current: any;

	/**
	 * @class Abstract scheduler
	 */
	constructor() {
		this._queue = new EventQueue<T>();
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
	add(item:T, repeat:boolean) {
		if (repeat) { this._repeat.push(item); }
		return this;
	}

	/**
	 * Get the time the given item is scheduled for
	 * @param {?} item
	 * @returns {number} time
	 */
	getTimeOf(item: T) {
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
	remove(item: any) {
		let result = this._queue.remove(item);

		let index = this._repeat.indexOf(item);
		if (index != -1) { this._repeat.splice(index, 1); }

		if (this._current == item) { this._current = null; }

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
