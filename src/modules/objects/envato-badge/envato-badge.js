import * as app from '../../../app';
import defaults from './envato-badge.json';

/**
 * Envato Badge
 * 
 * @access public
 * 
 * @param {(String|HTMLElement|NodeList)} els
 * @param {Object} custom 
 */
export function envatoBadge(els = 'i8_envato', custom = {}) {

    custom = app.custom('envato-badge', custom);

    app.Synergy(els, (el, options) => {

        app.subscribe('ENVATO_USER_RESPONSE_SUCCESS', (message, response) => {
            el.component('avatar')[0].setAttribute('src', response.user.image);

            el.component('sales_value')[0].innerText = response.user.sales;

            el.component('name')[0].innerText = response.user.username;
        });
    
        app.subscribe('ENVATO_ITEMS_RESPONSE_SUCCESS', (message, response) => {
            el.component('items_value')[0].innerText = response.matches.length;
        });
        
        app.subscribe('ENVATO_BADGES_RESPONSE_SUCCESS', (message, response) => {
            response['user-badges'].forEach(badge => {
                el.component('badges')[0].insertAdjacentHTML('beforeend', `
                    <img class="i8_envato_badge" alt="${badge.label}" title="${badge.label}" src="${badge.image}" />
                `);
            });
        });

    }, defaults, custom, app.evalConfig);

    app.config['envato-badge'] = app.parse(defaults['envato-badge'], custom);

    return exports;
}