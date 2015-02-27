'use strict';

import { previousElementSibling } from './util';

var toggleImageComparison = function() {
	var comparison_image_wrap = previousElementSibling(this.parentElement),
	    toggle_class          = 'is-toggled',
	    next_text_attr_name   = 'data-text' + comparison_image_wrap.classList.contains(toggle_class) ? '-toggled' : '',
		next_text;

	if (comparison_image_wrap === null) {
		return;
	}
	comparison_image_wrap.classList.toggle(toggle_class);
	next_text = this.getAttribute(next_text_attr_name);
	if (next_text && next_text.length) {
		this.innerHTML = next_text;
	}
};

export default function() {
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
		comparison_image_wrap.classList.add('image-comparison-wrap');
		// Cache current content of toggle as 'data-text' attribute
		comparison_toggles[i].setAttribute('data-text', comparison_toggles[i].innerHTML);
		comparison_toggles[i].addEventListener('click', toggleImageComparison);
	}
}
