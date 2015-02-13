'use strict';

// Quick and dirty addEventListener polyfill (effectively just for IE8)
if (window.addEventListener === undefined) {
	window.Element.prototype.addEventListener = function(event_name, callback) {
		var self = this;
		self.attachEvent('on' + event_name, function(evt) {
			evt = evt || window.event;
			evt.preventDefault = evt.preventDefault || function() { evt.returnValue = false; };
			evt.stopPropagation = evt.stopPropagation || function() { evt.cancelBubble = true; };
			callback.call(self, evt);
		});
	};
}
