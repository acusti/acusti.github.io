'use strict';
import initAffixingHeader from 'affixing-header';

import insertEmail from './insert-email.js';
import initImageComparison from './image-comparison.js';
import initImageEnlargement from './image-enlargement.js';
import initImageParallax from './image-parallax.js';

addEventListener('DOMContentLoaded', function () {
    // Kick it all off
    insertEmail(document.querySelectorAll('.get-in-touch-link'));
    initImageComparison();
    initImageParallax(document.querySelector('.post__splash > img'));
    initAffixingHeader(document.querySelector('.header-menubar'));
});

// Run after images have loaded
addEventListener('load', function () {
    initImageEnlargement();
});
