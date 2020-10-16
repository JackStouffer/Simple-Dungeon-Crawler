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

import Scheduler from "./scheduler";

/**
 * @class Action-based scheduler
 * @augments ROT.Scheduler
 */
export default class Action<T = any> extends Scheduler<T> {
	_defaultDuration: number;
	_duration: number;

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
	add(item:T, repeat:boolean, time?: number) {
		this._queue.add(item, time || this._defaultDuration);
		return super.add(item, repeat);
	}

	clear() {
		this._duration = this._defaultDuration;
		return super.clear();
	}

	remove(item:T) {
		if (item == this._current) { this._duration = this._defaultDuration; }
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
	setDuration(time: number) {
		if (this._current) { this._duration = time; }
		return this;
	}
}
