import attachScrollFrame from 'onscrolling';

// Parallax effect (on scroll)
var image = null,
    image_wrap = null,
    dimensions = {
        image: {},
        image_wrap: {},
    },
    detachScrollFrame,
    scrollY,
    scrollY_previous,
    resizeTimeoutId;

// Initializes parallax and implements it on scroll
function imageParallax(update) {
    scrollY = update ? update.scrollY : window.scrollY;
    // Initialize
    if (image_wrap === null) {
        // Verify we have a usable image object and if not, use a timeout to check again in 150ms
        if (image === null || !image.naturalWidth) {
            window.setTimeout(imageParallax, 150);
            return;
        }

        image_wrap = image.parentElement;
        // Special case for svgs
        if (image.src.substring(image.src.length - 4) === '.svg') {
            image_wrap.classList.add('is-svg');
        }

        scrollY_previous = scrollY;

        // Start listening for scroll events
        if (detachScrollFrame) detachScrollFrame();
        detachScrollFrame = attachScrollFrame(imageParallax);
    }

    var imageWrapHeight = image_wrap.clientHeight;
    // Get approximate scroll percentage of splash image in viewport
    var scrollPercentage = scrollY / imageWrapHeight;
    if (scrollPercentage > 1) return;

    // Possible translateY range is 0 to ½ of cropped height (because image is centered)
    var maxTranslateY = (image.clientHeight - imageWrapHeight) / 2;

    // Don't do any work if post__splash image isn't sufficiently cropped
    if (maxTranslateY <= 10) return;

    // Cache scrollY
    scrollY_previous = scrollY;

    // Parallaxify by applying scroll percentage to translateY range
    image.style.transform =
        'translateY(' +
        Math.min(Math.round(maxTranslateY * scrollPercentage * -1), maxTranslateY) +
        'px' +
        ')';
}

function onResizeDebouncer() {
    if (resizeTimeoutId) {
        window.clearTimeout(resizeTimeoutId);
    }
    window.setTimeout(imageParallax, 150);
}

// Return a function that initializes the effect
export default function initImageParallax(imageElement) {
    // Bail now if no image to work on
    if (!imageElement) return;

    image = imageElement;
    // Set up scrolling parallax image effects
    imageParallax(window.pageYOffset);
    window.addEventListener('resize', onResizeDebouncer);
}
