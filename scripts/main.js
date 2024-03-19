'use strict';
import initAffixingHeader from 'affixing-header';

import insertEmail from './insert-email.js';
import initImageComparison from './image-comparison.js';
import initImageParallax from './image-parallax.js';

addEventListener('DOMContentLoaded', function () {
    // Kick it all off
    insertEmail(document.querySelectorAll('.get-in-touch-link'));
    initImageComparison();
    initImageParallax(document.querySelector('.post__splash > img'));
    initAffixingHeader(document.querySelector('.header-menubar'));
});
