'use strict';

export function insertEmail(elements) {
	var host = window.location.hostname.replace('www.', ''),
	    href = 'mai',
		html = 'and',
		updateHref,
	    i;

	// Intentionally opaque
	href += String.fromCharCode(108) + 'to' + String.fromCharCode(58) + html;
	href += 'rew' + String.fromCharCode(64) + host;
	html += 'rew';
	html += '&#64;' + host;
	// Finish href with encoded document title
	href += '?subject=' + encodeURI(document.title);

	updateHref = function() {
		this.href = href;
	};

	// Fill it in (with link on click)
	for (i = 0; i < elements.length; ++i) {
		elements[i].addEventListener('click', updateHref);
		elements[i].innerHTML = html;
	}
}
