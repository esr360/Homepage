///****************************************************************
/// One-Nexus - A toolkit for architecting and constructing 
/// front-end user-interfaces - https://github.com/esr360/One-Nexus
///
/// @author [@esr360](http://twitter.com/esr360)
///****************************************************************

// Expose the app object
import * as app from './app';

// Export global app config
export { default as global } from './app.json';

// Instantiate the configuration object 
export const config = {};

// Vendor
//*****************************************************************

import deepextend from 'deep-extend';
import Browser from 'detect-browser';
import Flickity from 'flickity';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import Synergy from 'Synergy';
import Tilt from 'tilt.js';

export { 
    deepextend,
    Browser,
    Flickity, 
    PubSub,
    Synergy, 
    Tilt 
};

// Modules
//*****************************************************************

// Elements
import { accordion } from './modules/elements/accordions/accordions';
import { carousel } from './modules/elements/carousels/carousels';
import { modal } from './modules/elements/modals/modals';
import { progressBar } from './modules/elements/progress-bars/progress-bars';
import { tabs } from './modules/elements/tabs/tabs';
import { tooltips } from './modules/elements/tooltips/tooltips';

// Objects
import { envatoBadge } from './modules/objects/envato-badge/envato-badge';
import { googleMap } from './modules/objects/google-map/google-map';
import { header } from './modules/objects/header/header';
import { overlay } from './modules/objects/overlay/overlay';
import { preloader } from './modules/objects/preloader/preloader';
import { scrollTop } from './modules/objects/scroll-top/scroll-top';
import { search } from './modules/objects/search/search';
import { sideNav } from './modules/objects/side-nav/side-nav';
import { socialDropdown } from './modules/objects/social-dropdown/social-dropdown';

// Utilities
import { colors } from './modules/utilities/colors/colors';
import { core } from './modules/utilities/core/core';
import { grid } from './modules/utilities/grid/grid';
import { typography } from './modules/utilities/typography/typography';

// Index
import { index } from './modules/index/index';

export { 
    envatoBadge, 
    accordion, 
    carousel, 
    modal, 
    progressBar, 
    tabs, 
    tooltips, 
    googleMap, 
    header, 
    overlay, 
    preloader, 
    scrollTop, 
    search, 
    sideNav, 
    socialDropdown, 
    colors, 
    core, 
    grid, 
    typography, 
    index
};

// Tools
//*****************************************************************

import { custom } from './tools/js/app.custom';
import { evalConfig } from './tools/js/app.evalConfig';
import { hrefTarget } from './tools/js/app.hrefTarget';
import { inViewport } from './tools/js/app.inViewport';
import { isValidSelector } from './tools/js/app.isValidSelector';
import { media } from './tools/js/app.media';
import { parents } from './tools/js/app.parents';
import { parse } from './tools/js/app.parse';
import { smoothScroll } from './tools/js/app.smoothScroll';
import { scrollSpy } from './tools/js/app.scrollSpy';

export {
    custom, 
    evalConfig, 
    hrefTarget, 
    inViewport, 
    isValidSelector, 
    media, 
    parents, 
    parse, 
    smoothScroll, 
    scrollSpy
};

//*****************************************************************

app.publish   = PubSub.publish;
app.subscribe = PubSub.subscribe;

window.$      = $;
window.jQuery = $;
window.APPUI  = window.APPUI || app;

// Global Methods
//*****************************************************************

Element.prototype.component = function(component, set) {
    return Synergy(this).component(component, set, this);
};

Element.prototype.modifier = function(modifier, set) {
    return Synergy(this).modifier(modifier, set, this);
};

Element.prototype.parents = function(selector) {
    return parents(this, selector);
};

// Global Functions
//*****************************************************************

hrefTarget();

// Ajax Requests
//*****************************************************************

// Fetch Dribbble Shots
$.ajax('https://api.dribbble.com/v1/users/esr360/shots/?access_token=' + app.global['dribbble-token'], {
    success: response => app.publish('DRIBBBLE_RESPONSE_SUCCESS', response)
});

// Fetch Github Repos
$.ajax('https://api.github.com/users/esr360/repos', {
    success: response => app.publish('GITHUB_RESPONSE_SUCCESS', response)
});

// Fetch Envato Info
$.ajax('https://api.envato.com/v1/market/user:SkyUX.json', {
    headers: { Authorization: 'Bearer ' + app.global['envato-token'] },
    success: response => app.publish('ENVATO_USER_RESPONSE_SUCCESS', response)
});

// Fetch Envato Info
$.ajax('https://api.envato.com/v1/discovery/search/search/item?username=SkyUX', {
    headers: { Authorization: 'Bearer ' + app.global['envato-token'] },
    success: response => app.publish('ENVATO_ITEMS_RESPONSE_SUCCESS', response)
});

// Fetch Envato Info
$.ajax('https://api.envato.com/v1/market/user-badges:SkyUX.json', {
    headers: { Authorization: 'Bearer ' + app.global['envato-token'] },
    success: response => app.publish('ENVATO_BADGES_RESPONSE_SUCCESS', response)
});