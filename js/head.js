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
	//var css = 'display: block; text-align: right; position: absolute; bottom: 4px; right: 4px; color: #ccc; font: 400 11px sans-serif;';
	//if (typeof nav.style.setAttribute == 'object')
	//	nav.style.setAttribute('cssText', css); // non-standard (IE 7)
	//else
	//	nav.setAttribute('style', css); // standard
	
	document.body.appendChild(nav);
});