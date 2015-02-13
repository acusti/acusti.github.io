// Use ES6 imports
import {insertEmail} from './insert-email';
import {initImageComparison} from './image-comparison';
import {initImageParallax} from './image-parallax';

// Polyfills module returns nothing (just polyfills object prototypes where necessary)
import './polyfills';

// Poor man's document ready (this is last thing on page, so should work fine)
window.setTimeout(function() {
	'use strict';

	// Kick it all off
	insertEmail(document.querySelectorAll('.get-in-touch-link'));
	initImageComparison();
	initImageParallax(document.querySelector('.post__splash > img'));
}, 1);
