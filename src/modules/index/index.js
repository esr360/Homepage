import * as app from '../../app';
import defaults from './index.json';

/**
 * Index
 * 
 * @access public
 * 
 * @param {(String|HTMLElement|NodeList)} els
 * @param {Object} custom
 */
export function index(els = 'i8', custom = {}) {

    custom = app.custom('index', custom);

    const NEW_RANGE = Date.now() - 2592000000;

    app.Synergy(els, (el, options) => {
        // Fetch Dribbble shots
        $.ajax('https://api.dribbble.com/v1/users/esr360/shots/?access_token=' + options['dribbble-token'], {
            success: response => app.publish('DRIBBBLE_RESPONSE_SUCCESS', response)
        });
        
        // Fech Github Repos
        $.ajax('https://api.github.com/users/esr360/repos', {
            success: response => app.publish('GITHUB_RESPONSE_SUCCESS', response)
        });

        // Parallax
        $(window).on('scroll', function() {
            var scrollTop = $(this).scrollTop();

            $('.i8_background').css({
                transform: 'translateY(' + scrollTop/-4 + 'px)'
            });

            $('.i8_foreground').css({
                transform: 'translateY(' + scrollTop/-6 + 'px)'
            });

            if (app.media('min-width', 'break-4', app)) {
                if (app.inViewport({target: document.querySelector('.i8_intro')})) {
                    $('.i8_intro').css({
                        'background-position-y': (0.2 * scrollTop) - 200 + 'px'
                    });
                }

                if (app.inViewport({target: document.querySelector('.i8_macbook'), coverage: 'top'})) {
                    var elem = document.querySelector('.i8_macbook_screen');
                    var elemTop = (elem.getBoundingClientRect().top - window.innerHeight) + scrollTop;

                    $('.i8_macbook_screen img').css({
                        transform: 'translateY(' + ((scrollTop - elemTop) / -1) + 'px)'
                    });
                }
                
                if (app.inViewport({target: document.querySelector('.i8_iphone'), coverage: 'top'})) {
                    var elem = document.querySelector('.i8_iphone_screen');
                    var elemTop = (elem.getBoundingClientRect().top - window.innerHeight) + scrollTop;

                    $('.i8_iphone_screen img').css({
                        transform: 'translateY(' + ((scrollTop - elemTop) / -1) + 'px)'
                    });
                }
                                
                if (app.inViewport({target: document.querySelector('.i8_ribbon')})) {
                    $('.i8_ribbon_foreground').css({
                        bottom: '17vw',
                        transform: 'translateY(' + scrollTop/10 + 'px)'
                    });
                }
            }
        });
    }, defaults, custom, app.evalConfig);

    app.config.index = app.parse(defaults.index, custom);

    return exports;
}