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

        $(window).on('scroll', function() {
            var scrollTop = $(this).scrollTop();

            if (app.inViewport({target: document.querySelector('.i8_background')})) {
                $('.i8_background').css({
                    'transform': 'translateY(' + scrollTop/-4 + 'px)'
                });

                $('.i8_foreground').css({
                    'transform': 'translateY(' + scrollTop/-6 + 'px)'
                });
            }

            if (app.media('min-width', 'break-4', app)) {
                if (app.inViewport({target: document.querySelector('.i8_intro')})) {
                    $('.i8_intro').css({
                        'background-position-y': (0.2 * scrollTop) - 200 + 'px'
                    });
                }

                if (app.inViewport({coverage: 'top', target: document.querySelector('.i8_macbook')})) {
                    var elem = document.querySelector('.i8_macbook_screen');
                    var elemTop = (elem.getBoundingClientRect().top - window.innerHeight) + scrollTop;

                    $('.i8_macbook_screen img').css({
                        'transform': 'translateY(' + ((scrollTop - elemTop) / -0.5) + 'px)'
                    });
                }
                                
                if (app.inViewport({coverage: 'top', target: document.querySelector('.i8_iphone')})) {
                    var elem = document.querySelector('.i8_iphone_screen');
                    var elemTop = (elem.getBoundingClientRect().top - window.innerHeight) + scrollTop;

                    $('.i8_iphone_screen img').css({
                        'transform': 'translateY(' + ((scrollTop - elemTop) / -0.5) + 'px)'
                    });
                }
            }
        });

    }, defaults, custom, app.evalConfig);

    app.config.index = app.parse(defaults.index, custom);

    return exports;
}