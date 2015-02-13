'use strict';

import util from './util';

var previousElementSibling = util.previousElementSibling;

var toggleImageComparison = function() {
	var comparison_image_wrap = previousElementSibling(this.parentElement),
	    toggle_class = ' is-toggled',
		next_text;

	if (comparison_image_wrap === null) {
		return;
	}
	if (comparison_image_wrap.className.indexOf(toggle_class) > -1) {
		comparison_image_wrap.className = comparison_image_wrap.className.replace(toggle_class, '');
		next_text = this.getAttribute('data-text');
	} else {
		comparison_image_wrap.className += toggle_class;
		next_text = this.getAttribute('data-text-toggled');
	}
	if (next_text && next_text.length) {
		this.innerHTML = next_text;
	}
};

export function initImageComparison() {
	var comparison_toggles = document.querySelectorAll('.image-comparison-toggle'),
	    comparison_image_wrap,
	    i;
	for (i = 0; i < comparison_toggles.length; i++) {
		comparison_image_wrap = previousElementSibling(comparison_toggles[i].parentElement);
		// If markup does not match what we expect, bail
		if (comparison_image_wrap === null) {
			continue;
		}
		// Set image comparison class
		comparison_image_wrap.className += ' image-comparison-wrap';
		// Cache current content of toggle as 'data-text' attribute
		comparison_toggles[i].setAttribute('data-text', comparison_toggles[i].innerHTML);
		comparison_toggles[i].addEventListener('click', toggleImageComparison);
	}
}
