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

    const DRIBBBLE_TOKEN = '4526e22a9e300d869d7150623fb27351bd4e80aaafa2cebed0429e5a6e395e22';

    app.Synergy(els, (el, options) => {    
    
        $.ajax({
            type: 'GET',
            url: 'https://api.dribbble.com/v1/users/esr360/shots/?access_token=' + DRIBBBLE_TOKEN,
            success: response => handleDribbbleShots(response, '#dribbble_shots'),
            error: response => {
                console.log('Error: ' + response);
            }
        });

        $(window).on('scroll', function() {
            var scrollTop = $(this).scrollTop();

            //if (app.inViewport({target: document.querySelector('.i8_background')})) {
                $('.i8_background').css({
                    transform: 'translateY(' + scrollTop/-4 + 'px)'
                });

                $('.i8_foreground').css({
                    transform: 'translateY(' + scrollTop/-6 + 'px)'
                });
            //}

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
                        transform: 'translateY(' + ((scrollTop - elemTop) / -1) + 'px)'
                    });
                }
                
                if (app.inViewport({coverage: 'top', target: document.querySelector('.i8_iphone')})) {
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

        function handleDribbbleShots(shots, target) {
            if(!(target instanceof HTMLElement)) {
                target = document.querySelector(target);
            }

            shots.forEach(shot => target.insertAdjacentHTML('beforeend', 
                `<a target="blank" href="${shot.html_url}" class="i8_dribbble_shot span-3">
                    <img class="" src="${shot.images.normal}" />
                </a>`
            ));

            app.Tilt();
        }

    }, defaults, custom, app.evalConfig);

    app.config.index = app.parse(defaults.index, custom);

    return exports;
}