"use strict";
import Organization from "./modules/organizations.js";
import Likemoji from './modules/likemojis.js';
import {ChannelStyle} from "./modules/styles.js";
import {Group, getMainCategory} from "./modules/groups.js";
import {phone, phoneView, getOrgCategories, getCategoryLikemojis} from './views/phoneView.js';

export var likemojis = [];          // all likemojis for channel
export var categoryLikemojis = [];  // likemojis for selected category
export var categories = [];         // categories (Groups) for selected channel

export var channels = new Array;           // list of users channels
export var channel =  new Organization();    // current channel
export var category = new Group();
export var Moji = new Likemoji();
export var Style = new ChannelStyle();
export var channelStyle;       // current style of selected channel
export var channelID;          // currently selected channel ID
export var categoryID;         // currently selected category ID