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
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
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
				};
				if(item[1].substring(0, 2) != "on"){
					item[1] = "on" + item[1];
				};
				if(item[0].detachEvent){
					item[0].detachEvent(item[1], item[2]);
				};
				item[0][item[1]] = null;
			};
		}
	};
}();
addEvent(window, 'unload', EventCache.flush);

// a $(document).ready() type of a function from http://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
// relies on addEvent(), above
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
	};
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
	var nav = document.getElementById('top-nav').cloneNode(true);
	nav.setAttribute('id', nav.id + '-fixed');
	//var h = document.getElementsByTagName('header')[0]; h.parentNode.insertBefore(nav, h); // insert it before header
	document.body.appendChild(nav);
	// Fill in my email address (spam protection):
	var emails = document.getElementsByClassName('email');
	for ( i=0, len=emails.length; i<len; ++i ) {
		emails[i].href = 'mailto:andrew@acusti.ca' + '?subject=' + escape(document.title);
		emails[i].innerHTML = 'andrew@acusti.ca';
	}
});
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
	var oversized = document.getElementsByClassName('oversized');
	for (var i=0, len=oversized.length; i<len; ++i) {
		var image = oversized[i],
			wrap = image.parentNode,
			max_width = document.body.offsetWidth - 20,
			offset = 0,
			image_css = '';
		// Reset inline image CSS
		setStyles(image, '');

		if (image.offsetWidth > max_width) {
			image_css += 'width: ' + max_width + 'px;';
			offset = Math.floor((wrap.offsetWidth - max_width) / 2);
		} else {
			offset = Math.floor((wrap.offsetWidth - image.offsetWidth) / 2);
		}
		
		if (offset < 0)
			image_css += 'margin-left: ' + offset + 'px;';

		setStyles(image, image_css);
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
// Add a getElementsByClassName function if the browser doesn't have one
// Copyright: Eike Send http://eike.se/nd
// License: MIT License
// See https://gist.github.com/2299607
if (!document.getElementsByClassName) {
	document.getElementsByClassName = function(search) {
		var d = document, elements, pattern, i, results = [];
		if (d.querySelectorAll) { // IE8
			return d.querySelectorAll("." + search);
		}
		if (d.evaluate) { // IE6, IE7
			pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
			elements = d.evaluate(pattern, d, null, 0, null);
			while ((i = elements.iterateNext())) {
				results.push(i);
			}
		} else {
			elements = d.getElementsByTagName("*");
			pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
			for (i = 0; i < elements.length; i++) {
				if ( pattern.test(elements[i].className) ) {
					results.push(elements[i]);
				}
			}
		}
		return results;
	};
}