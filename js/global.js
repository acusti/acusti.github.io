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

// --------------------------------------------------------------
// Our document ready functions
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

	// Dynamic positioning logic
	resizing();
	// In case the image hasn't loaded yet, resize again in 1 second
	window.setTimeout(resizing, 1000);
	// Window load / resize functions
	addEvent(window, 'resize', function() {
		if (resize_timer) clearTimeout(resize_timer);
		resize_timer = setTimeout(resizing, 5);
	});
});

// Attach resize functions to document onload event (after images are loaded)
var resize_timer = 0;
// Procedures to execute on ready and on resize
var resizing = function() {
	// Handle oversized images
	var oversized = document.getElementsByClassName('oversized'),
		next_element,
	    i;
	for (i = 0; i < oversized.length; i++) {
		if (oversized[i].firstElementChild === null) {
			continue;
		}
		next_element = oversized[i].nextElementSibling;
		// Update margin of next element
		setStyles(next_element, 'padding-top: ' + (oversized[i].clientHeight + 55) + 'px;');
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

// --------------------------------------------------------------
// Polyfills and helpers and such

// Cross browser procedure to set CSS inline styles
var setStyles = function(el, styles) {
	if (typeof el.style.setAttribute == 'object') {
		// Non-standard (IE 7)
		el.style.setAttribute('cssText', styles);
	} else {
		// Standard
		el.setAttribute('style', styles);
	}
};
