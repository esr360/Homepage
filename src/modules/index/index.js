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
    const header_newSocial_item_template = document.getElementById('header_newSocial_item_template').innerHTML;

    app.Synergy(els, (el, options) => {
        // Fetch Dribbble shots
        $.ajax({
            type: 'GET',
            url: 'https://api.dribbble.com/v1/users/esr360/shots/?access_token=' + options['dribbble-token'],
            success: response => this.handleDribbbleShots(response, '#dribbble_shots')
        });
        
        // Fech Github Info
        $.ajax({
            type: 'GET',
            url: 'https://api.github.com/users/esr360/repos',
            success: response => this.handleGithubRepos(response)
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

    this.handleDribbbleShots = (shots, target) => {
        // ensure `target` is an HTMLElement
        if(!(target instanceof HTMLElement)) {
            target = document.querySelector(target);
        }

        const wrapper = document.querySelector('.i8_newSocial_dribbble');
        const shotTemplate = document.getElementById('i8_dribbble_shot_template').innerHTML;

        let newPosts = 0;
        
        shots.forEach(shot => {
            const isNew = Date.parse(shot.created_at) > NEW_RANGE;

            if (isNew) {
                newPosts++;

                wrapper.querySelector('.header_newSocial').insertAdjacentHTML('beforeend',  
                    header_newSocial_item_template
                        .replace('${shot.title}', shot.title)
                        .replace('${shot.description}', shot.description)
                        .replace('${shot.url}', shot.html_url)
                );
            }

            target.insertAdjacentHTML('beforeend', 
                shotTemplate
                    .replace('${shot.html_url}', shot.html_url)
                    .replace('${shot.images.normal}', shot.images.normal)
            );
        });

        if (newPosts) {
            $('.header_social-links_item[title=Dribbble]').addClass('new').attr('data-new-posts', newPosts);
        }

        if (app.media('min-width', 'break-4', app)) app.Tilt();  
    }
    
    this.handleGithubRepos = (repos) => {

        const wrapper = document.querySelector('.i8_newSocial_github');

        let updates = 0;

        repos.forEach(repo => {
            if (repo.owner.login === 'esr360') {
                if (Date.parse(repo.updated_at) > NEW_RANGE) {
                    updates++;
                    
                    wrapper.querySelector('.header_newSocial').insertAdjacentHTML('beforeend',  
                        header_newSocial_item_template
                            .replace('${shot.title}', shot.title)
                            .replace('${shot.description}', shot.description)
                            .replace('${shot.url}', shot.html_url)
                    );
                }
            }
        });
        
        if (updates) {
            $('.header_social-links_item[title=Github]').addClass('new').attr('data-new-posts', updates);
        }
    }

    app.config.index = app.parse(defaults.index, custom);

    return exports;
}