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

    app.Synergy(els, (el, options) => {

        // Parallax/Scroll Effects
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
                
                if (app.inViewport({target: document.querySelector('.i8_design'), coverage: 'middle'})) {
                    document.querySelector('.i8_design').classList.remove('inactive');
                }

                if (app.inViewport({target: document.querySelector('.i8_noah'), coverage: 'middle'})) {
                    document.querySelector('.i8_noah').classList.remove('inactive');
                }

                if (app.inViewport({target: document.querySelector('.i8_follow'), coverage: 'middle'})) {
                    document.querySelector('.i8_follow').classList.remove('inactive');
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