'use strict';

import attachScrollFrame from './requestVerticalScrollFrame';

// Parallax effect (on scroll)
var image,
    image_wrap,
    parallax_speed = 0.3,
    scrollY,
    scrollY_previous,
	imageParallax,
	imageParallaxCalculate;

// Initializes parallax and implements it on scroll
// @uses imageParallaxCalculate
imageParallax = function(scrollYCurrent) {
    scrollY = scrollYCurrent;
	// Initialize
	if (image_wrap === undefined) {
		if (image === null || (image_wrap = image.parentElement) === null) {
			return false;
		}
		// Adding our calculations to window load doesn't work when command clicking a post link to open it in a new tab in Chrome
		// So instead, verify we have a usable image object and if not, use a timeout to check again in 150ms
		if (image.naturalWidth) {
			document.body.classList.add('is-loaded');
		} else {
			window.setTimeout(imageParallax, 150);
		}
		// Special case for svgs
		if (image.src.substring(image.src.length - 4) === '.svg') {
			image_wrap.classList.add('is-svg');
		}
		imageParallaxCalculate();
		scrollY_previous = scrollY;
	}

	// Don't proceed (and don't cache scrolLY) if scrollY change is too small to matter
	if (Math.abs(scrollY - scrollY_previous) * parallax_speed < 1.5) {
		return;
	}
	// Cache scrollY
	scrollY_previous = scrollY;

    // Don't do any work if post__splash image isn't cropped
	if (image.clientHeight - 20 < image_wrap.clientHeight) {
		return;
	}
	// Parallaxify
	image.style.bottom = Math.floor(scrollY_previous * parallax_speed * -1) + 'px';
};

// Function to calculate dimensions and values for parallax
imageParallaxCalculate = function() {
	if (image === null || image_wrap === null) {
		return;
	}
	// Make sure image is at least 15 pixels too tall to crop it
	if (image.clientHeight - 15 < image_wrap.clientHeight) {
		image_wrap.classList.remove('is-cropped');
		image_wrap.classList.remove('is-full-bleed');
		image_wrap.style.height = '';
		return;
	}

	// Calculations
	image_wrap.style.height = image_wrap.clientHeight + 'px';
	image_wrap.classList.add('is-cropped');
	if (image.clientWidth < image_wrap.clientWidth) {
		image_wrap.style.width = image.clientWidth + 'px';
	} else {
		// image_wrap.classList.add('is-full-bleed');
		image_wrap.style.width = '';
		// If image is high-res (double resolution or thereabouts, set max-width at the smallest of clientHeight and full width * 0.5)
		if (image.naturalWidth > 2100 && image.naturalWidth / 2 < image_wrap.clientWidth) {
			image.style.maxWidth = image.naturalWidth / 2 + 'px';
			image_wrap.style.width = image.naturalWidth / 2 + 'px';
		} else {
			image.style.maxWidth = '';
			image_wrap.style.width = '';
		}
	}
};

// Return a function that initializes the effect
export default function(imageElement) {
	// Bail now if no image to work on
	if (!imageElement) {
		return;
	}
	image = imageElement;
	// Set up scrolling parallax image effects
    attachScrollFrame(imageParallax);
	imageParallax(window.pageYOffset);
    window.addEventListener('resize', imageParallaxCalculate);
}
