import * as app from '../../../app';
import defaults from './social-dropdown.json';

/**
 * Social Dropdown Menu
 * 
 * @access public
 * 
 * @param {(String|HTMLElement|NodeList)} els
 * @param {Object} custom 
 */
export function socialDropdown(els = document.body, custom = {}) {

    custom = app.custom('socialDropdown', custom);

    const NEW_RANGE = Date.now() - 2592000000;
    const GITHUB_WRAPPER = document.querySelector('.header_social-links_item.github');
    const GITHUB_LINK = GITHUB_WRAPPER.querySelector('.header_social-links_link');
    const DRIBBBLE_WRAPPER = document.querySelector('.header_social-links_item.dribbble');
    const DRIBBBLE_LINK = DRIBBBLE_WRAPPER.querySelector('.header_social-links_link');

    app.Synergy(els, (el, options) => {

        const TEMPLATE = `
            <li class="${options.name}_item">
                <a class="${options.name}_link" target="blank" href="{URL}">
                    <span class="${options.name}_tag-{TAG_CLASS}">{TAG}</span>
                    <h4 class="${options.name}_title">{TITLE}</h4>
                    <p class="${options.name}_description">{DESCRIPTION}</p>
                </a>
            </li>
        `;

        app.subscribe('DRIBBBLE_RESPONSE_SUCCESS', function(message, data) {
            let updates = 0;
            
            data.forEach(shot => {
                if (Date.parse(shot.created_at) > NEW_RANGE) {
                    updates++;
                    
                    if (updates === 1) {
                        DRIBBBLE_WRAPPER.classList.add('has-new');
                        DRIBBBLE_WRAPPER.insertAdjacentHTML('beforeend', `
                            <div class="${options.name}_wrap"><ul class="${options.name}"></ul></div>
                        `);
                    }

                    let [tag, tagClass] = ['New Shot', 'new-shot'];

                    // remove HTML from string
                    shot.description = shot.description.replace(/<\/?[^>]+(>|$)/g, '');
                    
                    document.querySelector(`.dribbble .${options.name}`)
                        .insertAdjacentHTML('beforeend', TEMPLATE
                            .replace('{TITLE}', shot.title)
                            .replace('{DESCRIPTION}', shot.description)
                            .replace('{URL}', shot.html_url)
                            .replace('{TAG}', tag)
                            .replace('{TAG_CLASS}', tagClass)
                    );
                }
    
                document.querySelector('#dribbble_shots').insertAdjacentHTML('beforeend', 
                        document.getElementById('i8_dribbble_shot_template').innerHTML
                            .replace('${shot.html_url}', shot.html_url)
                            .replace('${shot.images.normal}', `<img src="${shot.images.normal}" />`)
                );
            });
    
            if (updates) {
                DRIBBBLE_LINK.classList.add('new');
                DRIBBBLE_LINK.setAttribute('data-new-posts', updates);
            }
    
            if (app.media('min-width', 'break-4', app)) app.Tilt();  
        });

        app.subscribe('GITHUB_RESPONSE_SUCCESS', function(message, data) {
            let updates = 0;
            
            data.forEach(repo => {
                if (repo.owner.login === 'esr360') {
                    if (Date.parse(repo.updated_at) > NEW_RANGE || Date.parse(repo.pushed_at) > NEW_RANGE) {
                        updates++;
    
                        if (updates === 1) {
                            GITHUB_WRAPPER.classList.add('has-new');
                            GITHUB_WRAPPER.insertAdjacentHTML('beforeend', `
                                <div class="${options.name}_wrap"><ul class="${options.name}"></ul></div>
                            `);
                        }

                        let [tag, tagClass] = ['New Updates', 'new-updates'];

                        if (Date.parse(repo.pushed_at) > Date.parse(repo.updated_at)) {
                            [tag, tagClass] = ['New Commits', 'new-commits'];
                        }

                        if (Date.parse(repo.created_at) > NEW_RANGE) {
                            [tag, tagClass] = ['New Repo', 'new-repo'];
                        }

                        if (!repo.description) repo.description = '<i>No description is available</i>';
    
                        document.querySelector(`.github .${options.name}`)
                            .insertAdjacentHTML('beforeend', TEMPLATE
                                .replace('{TITLE}', repo.name)
                                .replace('{DESCRIPTION}', repo.description)
                                .replace('{URL}', repo.html_url)
                                .replace('{TAG}', tag)
                                .replace('{TAG_CLASS}', tagClass)
                        );
                    }
                }
            });
    
            if (updates) {
                GITHUB_LINK.classList.add('new');
                GITHUB_LINK.setAttribute('data-new-posts', updates);
            }
        });

    }, defaults, custom, app.evalConfig);

    app.config.socialDropdown = app.parse(defaults.socialDropdown, custom);

    return exports;
}