'use strict';

export default function initImageEnlargement() {
    const images = document.querySelectorAll('img');

    images.forEach((img) => {
        // Check if image is rendered smaller than its natural size
        if (
            img.naturalWidth > img.clientWidth ||
            img.naturalHeight > img.clientHeight
        ) {
            img.style.cursor = 'zoom-in';

            img.addEventListener('click', (e) => {
                e.preventDefault();
                enlargeImage(img);
            });
        }
    });
}

function enlargeImage(img) {
    // Get original image position and size
    const rect = img.getBoundingClientRect();

    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `\
    position: fixed;\
    top: 0;\
    left: 0;\
    right: 0;\
    bottom: 0;\
    background: rgba(0, 0, 0, 0);\
    display: flex;\
    align-items: center;\
    justify-content: center;\
    z-index: 10000;\
    cursor: zoom-out;\
    opacity: 1;\
    transition: background 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms ease-out;\
`;

    // Create enlarged image
    const enlargedImg = document.createElement('img');
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    // Calculate final dimensions: full size or viewport, whichever is smaller
    const scale = Math.min(
        maxWidth / img.naturalWidth,
        maxHeight / img.naturalHeight,
        1, // Don’t scale up beyond natural size
    );

    enlargedImg.src = img.src;
    enlargedImg.srcset = img.srcset || '';
    enlargedImg.alt = img.alt;

    // Start at original position and size
    enlargedImg.style.cssText = `\
    position: fixed;\
    top: ${rect.top}px;\
    left: ${rect.left}px;\
    width: ${rect.width}px;\
    height: ${rect.height}px;\
    object-fit: contain;\
    transition: all 300ms cubic-bezier(0.34, 1.4, 0.64, 1);\
`;

    overlay.appendChild(enlargedImg);
    document.body.appendChild(overlay);

    // Trigger animation on next frame
    requestAnimationFrame(() => {
        // Fade in overlay background
        overlay.style.background = 'rgba(0, 0, 0, 0.9)';

        // Calculate final centered position
        const finalWidth = Math.min(img.naturalWidth, maxWidth);
        const finalHeight = Math.min(img.naturalHeight, maxHeight);
        const finalTop = (maxHeight - finalHeight) / 2;
        const finalLeft = (maxWidth - finalWidth) / 2;

        // Animate to final position
        enlargedImg.style.top = `${finalTop}px`;
        enlargedImg.style.left = `${finalLeft}px`;
        enlargedImg.style.width = `${finalWidth}px`;
        enlargedImg.style.height = `${finalHeight}px`;
    });

    // Close function with fade out
    const closeOverlay = () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    };

    // Close on click
    overlay.addEventListener('click', closeOverlay);

    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeOverlay();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}
