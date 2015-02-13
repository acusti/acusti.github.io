/*global define */

define(function(require) {
	'use strict';

	// IE8 compatible method to fetch previousElementSibling
	var previousElementSibling = function(element) {
		if (element.previousElementSibling !== undefined) {
			return element.previousElementSibling;
		}
		// Browser doesn't support previousElementSibling
		do {
			element = element.previousSibling;
		} while (element && element.nodeType !== 1);

		return element;
	};

	// Expose utilities
	return {
		previousElementSibling: previousElementSibling
	};
});
