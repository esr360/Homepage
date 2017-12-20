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

    const browser = app.Browser.detect().name;

    // Parallax/Scroll effects
    if (app.media('min-width', 'break-4', app)) {

        if (browser === 'chrome') {
            $('.i8_background').css({
                height: '150%',
                'background-attachment': 'fixed'
            });
        } else {
            $('.i8_intro').css({
                'margin-top': 0
            });
        }

        $(window).on('scroll', function() {
            
            var scrollTop = $(this).scrollTop();

            document.querySelectorAll('.inactive').forEach(el => {
                if (app.inViewport({target: el, coverage: 'middle'})) {
                    el.classList.remove('inactive');
                }
            });

            if (browser === 'chrome') {
                $('.i8_background').css({
                    transform: 'translateY(' + scrollTop/-4 + 'px)'
                });
    
                $('.i8_foreground').css({
                    transform: 'translateY(' + scrollTop * 0.4 + 'px)'
                });
            }

            if (app.inViewport({target: document.querySelector('.i8_intro'), coverage: 'top'})) {
                $('.i8_intro_background').css({
                    top: '-10vw',
                    transform: 'translateY(' + scrollTop/4 + 'px)'
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
                    bottom: '23%',
                    transform: 'translateY(' + scrollTop/10 + 'px)'
                });
            }

        });

    }

    app.Synergy(els, (el, options) => {

    }, defaults, custom, app.evalConfig);

    app.config.index = app.parse(defaults.index, custom);

    return exports;
}