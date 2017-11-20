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
            
            el.component('name')[0].innerText = response.user.username;

            el.component('sales_value')[0].innerText = response.user.sales;
        });
    
        app.subscribe('ENVATO_ITEMS_RESPONSE_SUCCESS', (message, response) => {
            el.component('items_value')[0].innerText = response.matches.length;
        });
        
        app.subscribe('ENVATO_BADGES_RESPONSE_SUCCESS', (message, response) => {
            response['user-badges'].forEach(badge => {
                el.component('badges')[0].insertAdjacentHTML('beforeend', `
                    <div class="i8_envato_badge tooltip" data-tooltip="${badge.label}">
                        <img alt="${badge.label}" title="${badge.label}" src="${badge.image}" />
                    </div>
                `);
                // refresh tooltips
                app.tooltips();
            });
        });

    }, defaults, custom, app.evalConfig);

    app.config['envato-badge'] = app.parse(defaults['envato-badge'], custom);

    return exports;
}