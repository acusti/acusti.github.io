'use strict';

// Keep track of state of nav bar, scrolling direction, "deliberateness" of scroll in current direction (for affixing nav bar, it should be deliberate, i.e. not just a casual slip). Also, track when transitioning for adjusting position
var scrollYPrev        = 0,
    upScrollCount      = 0,
    //downScrollCount    = 0,
    affixedClass       = ' is-affixed',
    isNavAffixed       = true,
    isNavTransitioning = false,
    navBar,
    handleScroll,
    initScrollChecking,
    checkNavPosition,
    affixNavBar,
    unAffixNavBar;

handleScroll = function() {
	// Make sure that the nav bar doesn't wind up stranded in the middle of the page
	checkNavPosition();
	// Set up next cycle
	window.requestAnimationFrame(handleScroll);
	// No scroll change or bounce scrolling, time to bail
	if (window.scrollY === scrollYPrev || window.scrollY < 0 || (window.scrollY + window.innerHeight) > document.documentElement.offsetHeight) {
		return;
	}
	if (window.scrollY < scrollYPrev) {
		// If the user has scrolled up quickly / jumped up (like shift-spacebar)
		// Or we are transitioning and have reached the top of the bar
		if ((!isNavAffixed && window.scrollY + navBar.clientHeight < scrollYPrev) || (isNavTransitioning && window.scrollY <= navBar.offsetTop + 2)) {
			affixNavBar();
		} else if (!isNavAffixed) {
			if (upScrollCount > 6) {
				//downScrollCount = 0;
				isNavAffixed = true;
				// If the navbar is not currently visible, set the top to just above the viewport so it appears as we scroll up
				if (window.scrollY > navBar.offsetTop + navBar.clientHeight + 5) {
					navBar.style.top = (window.scrollY - navBar.clientHeight) + 'px';
				}
				isNavTransitioning = true;
			}
			upScrollCount++;
		}
	} else if (isNavAffixed) {
		//if (downScrollCount > 0) {
		unAffixNavBar();
		//}
		//downScrollCount++;
	}
	scrollYPrev = window.scrollY;
};

checkNavPosition = function() {
	if (!isNavAffixed && navBar.offsetTop > window.scrollY) {
		affixNavBar();
	}
};

affixNavBar = function() {
	isNavAffixed = true;
	isNavTransitioning = false;
	navBar.style.top = 0;
	navBar.className += affixedClass;
};

unAffixNavBar = function() {
	if (!isNavAffixed) {
		// Nothing to do here
		return;
	}
	upScrollCount = 0;
	isNavAffixed = false;
	// Only set top position for switch from fixed absolute if not transitioning
	if (!isNavTransitioning) {
		// If user jumped down the page (e.g. paging with spacebar)
		if (window.scrollY > scrollYPrev + navBar.clientHeight + 5) {
			navBar.style.top = scrollYPrev + 5 + 'px';
		} else {
			navBar.style.top = window.scrollY + 'px';
		}
	} else {
		isNavTransitioning = false;
	}
	navBar.className = navBar.className.replace(affixedClass, '');
};

initScrollChecking = function() {
	if (window.scrollY <= 0) {
		return;
	}
	window.requestAnimationFrame(handleScroll);
	window.removeEventListener('scroll', initScrollChecking);
	document.body.removeEventListener('touchmove', initScrollChecking);
};

export default function(navElement) {
	if (!navElement) {
		return;
	}
	navBar = navElement;
	window.addEventListener('scroll', initScrollChecking);
	document.body.addEventListener('touchmove', initScrollChecking);
}
