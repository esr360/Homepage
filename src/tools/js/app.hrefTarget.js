import * as app from '../../app';

/**
 * Add `target="blank"` to external links
 * 
 * @access public
 * 
 * @param {String} url
 */
export function hrefTarget(url = window.location.host) {
    // get all links
    const links = document.querySelectorAll('[href]');

    links.forEach(link => {
        if (link.href.indexOf(url) !== -1) {
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', 'blank');
            }
        }
    });
}