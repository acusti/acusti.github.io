'use strict';

import attachScrollFrame from './requestVerticalScrollFrame';

// Keep track of state of nav bar, scrolling direction, "deliberateness" of scroll in current direction (for affixing nav bar, it should be deliberate, i.e. not just a casual slip). Also, track when transitioning for adjusting position
var scrollYPrev        = 0,
    scrollY            = 0,
    upScrollCount      = 0,
    //downScrollCount    = 0,
    isNavAffixed       = true,
    isNavTransitioning = false,
    navBar,
    handleScroll,
    checkNavPosition,
    affixNavBar,
    unAffixNavBar;

handleScroll = function(scrollYCurrent) {
    scrollY = scrollYCurrent;
	// Make sure that the nav bar doesn't wind up stranded in the middle of the page
	checkNavPosition();
	// If this is bounce scrolling, bail
	if (scrollY < 0 || (scrollY + window.innerHeight) > document.documentElement.offsetHeight) {
		return;
	}
	if (scrollY < scrollYPrev) {
		// If the user has scrolled up quickly / jumped up (like shift-spacebar)
		// Or we are transitioning and have reached the top of the bar
		if ((!isNavAffixed && scrollY + navBar.clientHeight < scrollYPrev) || (isNavTransitioning && scrollY <= navBar.offsetTop + 2)) {
			affixNavBar();
		} else if (!isNavAffixed) {
			if (upScrollCount > 6) {
				//downScrollCount = 0;
				isNavAffixed = true;
				// If the navbar is not currently visible, set the top to just above the viewport so it appears as we scroll up
				if (scrollY > navBar.offsetTop + navBar.clientHeight + 5) {
					navBar.style.top = (scrollY - navBar.clientHeight) + 'px';
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
	scrollYPrev = scrollY;
};

checkNavPosition = function() {
	if (!isNavAffixed && navBar.offsetTop > scrollY) {
		affixNavBar();
	}
};

affixNavBar = function() {
    isNavAffixed          = true;
    isNavTransitioning    = false;
    navBar.style.top      = 0;
    navBar.style.position = 'fixed';
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
		if (scrollY > scrollYPrev + navBar.clientHeight + 5) {
			navBar.style.top = scrollYPrev + 5 + 'px';
		} else {
			navBar.style.top = scrollY + 'px';
		}
	} else {
		isNavTransitioning = false;
	}
	navBar.style.position = '';
};

export default function(navElement) {
	if (!navElement) {
		return;
	}
	navBar = navElement;
    // Use attachScrollFrame helper to listen for scroll changes
	attachScrollFrame(handleScroll);
}
