// --------------------------------------------------------------
// General event handling:

// Rock solid addEvent() from http://www.dustindiaz.com/rock-solid-addevent/
function addEvent( obj, type, fn ) {
	if (obj.addEventListener) {
		obj.addEventListener( type, fn, false );
		EventCache.add(obj, type, fn);
	}
	else if (obj.attachEvent) {
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); };
		obj.attachEvent( "on"+type, obj[type+fn] );
		EventCache.add(obj, type, fn);
	}
	else {
		obj["on"+type] = obj["e"+type+fn];
	}
}

var EventCache = function(){
	var listEvents = [];
	return {
		listEvents : listEvents,
		add : function(node, sEventName, fHandler){
			listEvents.push(arguments);
		},
		flush : function(){
			var i, item;
			for(i = listEvents.length - 1; i >= 0; i = i - 1){
				item = listEvents[i];
				if(item[0].removeEventListener){
					item[0].removeEventListener(item[1], item[2], item[3]);
				}
				if(item[1].substring(0, 2) != "on"){
					item[1] = "on" + item[1];
				}
				if(item[0].detachEvent){
					item[0].detachEvent(item[1], item[2]);
				}
				item[0][item[1]] = null;
			}
		}
	};
}();
addEvent(window, 'unload', EventCache.flush);

// A $(document).ready() type of a function from http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
// Relies on addEvent(), above
var ready = (function () {
	function ready(f) {
		if (ready.done) return f();
		if (ready.timer) {
			ready.ready.push(f);
		} else {
			addEvent(window, 'load', isDOMReady);
			ready.ready = [ f ];
			ready.timer = setInterval(isDOMReady, 13);
		}
	}
	function isDOMReady() {
		if (ready.done) return false;
		if (document && document.getElementsByTagName && document.getElementById && document.body) {
			clearInterval(ready.timer);
			ready.timer = null;
			for (var i = 0; i < ready.ready.length; i++) {
				ready.ready[i]();
			}
			ready.ready = null;
			ready.done = true;
		}
	}
	return ready;
})();

// Other helpers
// -------------

// Cross browser procedure to set CSS inline styles
var setStyles = function(el, styles) {
	if (typeof el.style.setAttribute === 'object') {
		// Non-standard (IE 7)
		el.style.setAttribute('cssText', styles);
	} else {
		// Standard
		el.setAttribute('style', styles);
	}
};


// End of global variables
// Beginning of functionality

(function() {
	// On document ready
	// -----------------
	ready(function() {
		// Set up fixed nav (displayed under regular header and nav)
		var nav = document.getElementsByClassName('top-nav');
		if (nav.length) {
			nav = nav[0].cloneNode(true);
			nav.className += ' ' + nav.className + '-fixed';
			document.body.appendChild(nav);
		}

		// Fill in my email address (cheapo spam protection):
		var emails = document.getElementsByClassName('email');
		for (var i=0, len=emails.length; i<len; ++i) {
			emails[i].href = 'mailto:andrew@acusti.ca' + '?subject=' + escape(document.title);
			emails[i].innerHTML = 'andrew@acusti.ca';
		}

		// Set up image comparison toggles
		initImageComparison();

		// Scrolling parallax image effects
		// Attach them on window load (need image dimensions)
		addEvent(window, 'load', function() {
			document.body.className += ' is-loaded';
			if (imageParallax()) {
				addEvent(window, 'scroll', imageParallax);
			}
		});
		addEvent(window, 'resize', imageParallaxCalculate);
	});

	// Parallax effect (on scroll)
	var image_splash,
	    image_splash_wrap,
	    parallax_speed = 0.3,
	    pageYOffset_previous;

	// Returns boolean indicating the existence of a post__splash image
	var imageParallax = function() {
		// Initialize
		if (image_splash === undefined) {
			image_splash = document.querySelector('.post__splash > img');
			if (image_splash === null || (image_splash_wrap = image_splash.parentElement) === null) {
				return false;
			}
			imageParallaxCalculate();
			// Special case for svgs
			if (image_splash.src.substring(image_splash.src.length - 4) === '.svg') {
				image_splash_wrap.className += ' is-svg';
			}
			pageYOffset_previous = window.pageYOffset;
		}

		// Don't do any work if:
		// 1. pageYOffset change is too small to matter
		// 2. post__splash image isn't cropped
		if (Math.abs(window.pageYOffset - pageYOffset_previous) * parallax_speed < 1.5 || image_splash.clientHeight - 20 < image_splash_wrap.clientHeight) {
			return true;
		}
		// Cache pageYOffset
		pageYOffset_previous = window.pageYOffset;

		// Parallaxify
		image_splash.style.bottom = Math.floor(pageYOffset_previous * parallax_speed * -1) + 'px';

		return true;
	};

	// Function to calculate dimensions and values for parallax
	var imageParallaxCalculate = function() {
		if (image_splash === null || image_splash_wrap === null) {
			return;
		}
		// Make sure image is at least 20 pixels too tall to crop it
		if (image_splash.clientHeight - 20 < image_splash_wrap.clientHeight) {
			image_splash_wrap.className = image_splash_wrap.className.replace(' is-cropped', '').replace(' is-full-bleed', '');
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
	var initImageComparison = function() {
		var comparison_toggles = document.getElementsByClassName('image-comparison-toggle'),
		    comparison_image_wrap,
		    i;
		for (i = 0; i < comparison_toggles.length; i++) {
			comparison_image_wrap = comparison_toggles[i].parentElement.previousElementSibling;
			// If markup does not match what we expect, bail
			if (comparison_image_wrap === null) {
				continue;
			}
			// Set image comparison class
			comparison_image_wrap.className += ' image-comparison-wrap';
			// Cache current content of toggle as 'data-text' attribute
			comparison_toggles[i].setAttribute('data-text', comparison_toggles[i].innerHTML);
			addEvent(comparison_toggles[i], 'click', toggleImageComparison);
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
