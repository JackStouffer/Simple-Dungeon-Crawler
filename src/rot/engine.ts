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

import Scheduler from "./scheduler/scheduler";

/**
 * @class Asynchronous main loop
 * @param {ROT.Scheduler} scheduler
 */

export default class Engine {
	_scheduler: Scheduler;
	_lock: number;

	constructor(scheduler: Scheduler) {
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
		if (!this._lock) { throw new Error("Cannot unlock unlocked engine"); }
		this._lock--;

		while (!this._lock) {
			let actor = this._scheduler.next();
			if (!actor) { return this.lock(); } /* no actors */
			let result = actor.act();
			if (result && result.then) { /* actor returned a "thenable", looks like a Promise */
				this.lock();
				result.then(this.unlock.bind(this));
			}
		}

		return this;
	}
}
