import * as app from '../../../app';
import defaults from './overlay.json';

/**
 * Page Overlay
 * 
 * @access public
 * 
 * @param {(String|Object)} els
 * @param {Object} custom
 */
export function overlay(els = 'overlay', custom = {}) {

    custom = app.custom('overlay', custom);

    app.Synergy(els, (el, options) => {
        exports.show = flag => exports.toggle(flag, 'show');
        exports.hide = flag => exports.toggle(flag, 'hide');

        exports.toggle = (flag, operator) => {
            const state = (el.modifier('visible') && operator !== 'show' || operator === 'hide') ? 'remove' : 'add';

            el.modifier((flag ? flag + '-' : '') + 'visible', state);
        };

    }, defaults, custom, app.evalConfig);

    app.config.overlay = app.parse(defaults.overlay, custom);

    return exports;
}