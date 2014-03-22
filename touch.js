/**
 * @license Copyright (C) 2014 by Juan J. Martinez <jjm@usebox.net>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var TouchController = function(canvas) {
	self = {
		current : undefined,
		on : false,
		x : 0,
		y : 0,
		r : 30, // displacement in pixels, used for joystick sensibilty
		canvas : undefined
	};

	var size = 40; // radius of the joystick

	self.init = function(canvas) {
		if('createTouch' in document) {
			self.canvas = canvas;
			canvas.addEventListener('touchstart', self.start, false);
			canvas.addEventListener('touchend', self.end, false);
			canvas.addEventListener('touchmove', self.move, false);
		}
	};

	self.find_current = function(list) {
		var i;
		for(i=0; i<list.length; i++) {
			if(list[i].identifier == self.current.id) {
				return list[i];
			}
		}
		return undefined;
	};

	self.start = function(event) {
		if(!self.on && event.targetTouches.length == 1) {
			self.on = true;
			var e = event.targetTouches[0];
			self.current = { id: e.identifier, x: e.pageX, y: e.pageY };
		}
		event.preventDefault();
	};

	self.end = function(event) {
		if(self.on) {
			var c = self.find_current(event.changedTouches);
			if(c != undefined) {
				self.on = false;
				self.current = undefined;
				self.x = 0;
				self.y = 0;
			}
		}
	};

	self.move = function(event) {
		if(self.on) {
			self.x = 0;
			self.y = 0;
			var c = self.find_current(event.changedTouches);
			if(self.current.x-c.pageX > self.r) {
				self.x = -1;
			}
			if(c.pageX-self.current.x > self.r) {
				self.x = 1;
			}
			if(self.current.y-c.pageY > self.r) {
				self.y = -1;
			}
			if(c.pageY-self.current.y > self.r) {
				self.y = 1;
			}
		}
		event.preventDefault();
	};

	self.draw = function(ctx) {
		if(self.on) {
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = "rgba(192, 192, 192, 0.8)";
			ctx.fillStyle = "rgba(66, 66, 66, 0.5)";
			ctx.lineWidth = 4;
			ctx.arc(self.current.x-self.canvas.offsetLeft, self.current.y-self.canvas.offsetTop-size/2, size, 0, 2*Math.PI, true);
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.arc(self.current.x-self.canvas.offsetLeft, self.current.y-self.canvas.offsetTop-size/2, size-10, 0, 2*Math.PI, true);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(self.current.x-self.canvas.offsetLeft+self.x*10, self.current.y-self.canvas.offsetTop-size/2+self.y*10, size-10, 0, 2*Math.PI, true);
			ctx.fill();
			ctx.restore();
		}
	};

	self.init(canvas);
	return self;
};

