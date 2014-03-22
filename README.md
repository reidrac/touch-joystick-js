Virtual joystick for touch events
---------------------------------

This is very simple Javascript object to implement a simulated analog
joystick.

When a touch event is registered, the joystick is drawn on the provided
canvas context.

It updates three states:

 - on (true/false): whether the joystick is no or not.
 - x (-1, 0, 1): position of the x axis.
 - y (-1, 0, 1): position of the y axis.

You can use Firefox "responsive design mode" to test it (it can
simulate touch events!), or the upcoming dev tools of Chrome (canary
version).

The implementation is very simple and it may not suit your needs, but
it is a good start point!

References:

 - http://www.w3.org/TR/touch-events/
 - http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html


Juan J. Martinez <jjm@usebox.net>

