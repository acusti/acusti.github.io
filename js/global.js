(function() {
	// Poor man's document ready (this is last thing on page, so should work fine)
	window.setTimeout(function() {
		// Set up fixed nav (displayed under regular header and nav)
		var nav = document.querySelector('.top-nav');
		if (nav !== null) {
			nav = nav.cloneNode(true);
			nav.className += ' ' + nav.className + '-fixed';
			document.body.appendChild(nav);
		}

		// Fill in my email address (cheapo spam protection):
		var emails = document.querySelectorAll('.email');
		for (var i=0, len=emails.length; i<len; ++i) {
			emails[i].href = 'mailto:andrew@acusti.ca' + '?subject=' + escape(document.title);
			emails[i].innerHTML = 'andrew@acusti.ca';
		}

		// Set up image comparison toggles
		initImageComparison();

		// Bail now if no support for addEventListener or pageYOffset
		if (window.addEventListener === undefined || window.pageYOffset === undefined) {
			return;
		}

		// Scrolling parallax image effects
		// Attach them on image load (need image dimensions)
		image_splash = document.querySelector('.post__splash > img');
		if (image_splash !== null) {
			imageParallax();
			window.addEventListener('scroll', imageParallax);
			window.addEventListener('resize', imageParallaxCalculate);
		}
	}, 1);

	// Parallax effect (on scroll)
	var image_splash,
	    image_splash_wrap,
	    parallax_speed = 0.3,
	    scrollY_previous;

	// Initializes parallax and implements it on scroll
	// @uses imageParallaxCalculate
	var imageParallax = function() {
		// Initialize
		if (image_splash_wrap === undefined) {
			if (image_splash === null || (image_splash_wrap = image_splash.parentElement) === null) {
				return false;
			}
			// Adding our calculations to window load doesn't work when command clicking a post link to open it in a new tab in Chrome
			// So instead, verify we have a usable image object and if not, use a timeout to check again in 150ms
			if (image_splash.naturalWidth) {
				document.body.className += ' is-loaded';
			} else {
				window.setTimeout(imageParallax, 150);
			}
			// Special case for svgs
			if (image_splash.src.substring(image_splash.src.length - 4) === '.svg') {
				image_splash_wrap.className += ' is-svg';
			}
			imageParallaxCalculate();
			scrollY_previous = window.pageYOffset;
		}

		// Don't do any work if:
		// 1. pageYOffset change is too small to matter
		// 2. post__splash image isn't cropped
		if (Math.abs(window.pageYOffset - scrollY_previous) * parallax_speed < 1.5 || image_splash.clientHeight - 20 < image_splash_wrap.clientHeight) {
			return;
		}
		// Cache pageYOffset
		scrollY_previous = window.pageYOffset;

		// Parallaxify
		image_splash.style.bottom = Math.floor(scrollY_previous * parallax_speed * -1) + 'px';
	};

	// Function to calculate dimensions and values for parallax
	var imageParallaxCalculate = function() {
		if (image_splash === null || image_splash_wrap === null) {
			return;
		}
		// Make sure image is at least 20 pixels too tall to crop it
		if (image_splash.clientHeight - 20 < image_splash_wrap.clientHeight) {
			image_splash_wrap.className = image_splash_wrap.className.replace(/ is-cropped/g, '').replace(/ is-full-bleed/g, '');
			image_splash_wrap.style.height = '';
			return;
		}

		// Calculations
		image_splash_wrap.style.height = image_splash_wrap.clientHeight + 'px';
		image_splash_wrap.className += ' is-cropped';
		if (image_splash.clientWidth < image_splash_wrap.clientWidth) {
			image_splash_wrap.style.width = image_splash.clientWidth + 'px';
		} else {
			// image_splash_wrap.className += ' is-full-bleed';
			image_splash_wrap.style.width = '';
			// If image is high-res (double resolution or thereabouts, set max-width at the smallest of clientHeight and full width * 0.5)
			if (image_splash.naturalWidth > 2100 && image_splash.naturalWidth / 2 < image_splash_wrap.clientWidth) {
				image_splash.style.maxWidth = image_splash.naturalWidth / 2 + 'px';
				image_splash_wrap.style.width = image_splash.naturalWidth / 2 + 'px';
			} else {
				image_splash.style.maxWidth = '';
				image_splash_wrap.style.width = '';
			}
		}
	};

	// Image comparison toggle

	// Polyfill missing previousElementSibling property for IE8
	var previousSibling = function(element) {
		if (element.previousElementSibling !== undefined) {
			return element.previousElementSibling;
		}
		// Browser doesn't support previousElementSibling
		do {
			element = element.previousSibling;
		} while (element !== null && (element.nodeName === '#comment' || element.nodeName === '#text'));

		return element;
	};

	var initImageComparison = function() {
		var comparison_toggles = document.querySelectorAll('.image-comparison-toggle'),
		    comparison_image_wrap,
		    i;
		for (i = 0; i < comparison_toggles.length; i++) {
			comparison_image_wrap = previousSibling(comparison_toggles[i].parentElement);
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
	};

	var toggleImageComparison = function() {
		var comparison_image_wrap = this.parentElement.previousElementSibling,
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
})();
