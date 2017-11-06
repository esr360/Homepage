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
    const NEW_RANGE = Date.now() - 2592000000;

    app.Synergy(els, (el, options) => {    
        // Populate Dribbble shots
        $.ajax({
            type: 'GET',
            url: 'https://api.dribbble.com/v1/users/esr360/shots/?access_token=' + DRIBBBLE_TOKEN,
            success: response => this.handleDribbbleShots(response, '#dribbble_shots')
        });

        // Parallax
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
    }, defaults, custom, app.evalConfig);

    this.handleDribbbleShots = (shots, target) => {
        // ensure `target` is an HTMLElement
        if(!(target instanceof HTMLElement)) {
            target = document.querySelector(target);
        }

        const header_icon = $('.header_social-links_item[title=Dribbble]');

        let newPosts = 0;
        
        shots.forEach(shot => {
            const isNew = Date.parse(shot.created_at) > NEW_RANGE;
            const shotColumnClass = `span-3 break-3-third break-2-half break-1-full${isNew ? ' new' : ''}`;

            if (isNew) newPosts++;

            target.insertAdjacentHTML('beforeend', 
                `<a target="blank" href="${shot.html_url}" class="i8_dribbble_shot ${shotColumnClass}">
                    <img class="" src="${shot.images.normal}" />
                </a>`
            );
        });

        if (newPosts) {
            header_icon.addClass('new');
            header_icon.attr('data-new-posts', newPosts);
        }

        if (app.media('min-width', 'break-4', app)) app.Tilt();  
    }

    app.config.index = app.parse(defaults.index, custom);

    return exports;
}