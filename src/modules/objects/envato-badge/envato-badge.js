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

        console.log(
            el.component('avatar')[0],
            document.getElementById('i8_envato_avatar')
        );

        app.subscribe('ENVATO_USER_RESPONSE_SUCCESS', (message, response) => {
            document.getElementById('i8_envato_avatar').setAttribute('src', response.user.image);
            document.getElementById('i8_envato_sales').innerText = response.user.sales;
            document.getElementById('i8_envato_user').innerText = response.user.username;
        });
    
        app.subscribe('ENVATO_ITEMS_RESPONSE_SUCCESS', (message, response) => {
            document.getElementById('i8_envato_items').innerText = response.matches.length;
        });
        
        app.subscribe('ENVATO_BADGES_RESPONSE_SUCCESS', (message, response) => {
            response['user-badges'].forEach(badge => {
                document.getElementById('i8_envato_badges').insertAdjacentHTML('beforeend', `
                    <img class="i8_envato_badge" alt="${badge.label}" title="${badge.label}" src="${badge.image}" />
                `);
            });
        });

    }, defaults, custom, app.evalConfig);

    app.config['envato-badge'] = app.parse(defaults['envato-badge'], custom);

    return exports;
}