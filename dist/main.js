/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _templateObject = _taggedTemplateLiteral(["<span />"], ["<span />"]),
    _templateObject2 = _taggedTemplateLiteral(["\n        <ul>\n            <li><a href=\"signup\">Create New Account</a></li>\n            <li><a href=\"login\">Login</a></li>\n        </ul>"], ["\n        <ul>\n            <li><a href=\"signup\">Create New Account</a></li>\n            <li><a href=\"login\">Login</a></li>\n        </ul>"]),
    _templateObject3 = _taggedTemplateLiteral(["<img src=\"", "\" />"], ["<img src=\"", "\" />"]),
    _templateObject4 = _taggedTemplateLiteral(["<h1>About your Likemoji Channel</h1>"], ["<h1>About your Likemoji Channel</h1>"]),
    _templateObject5 = _taggedTemplateLiteral(["<h2>A list of links for channel</h2>\n        <ul>\n            <li>Link1</li>\n            <li>Link2</li>\n            <li>Link3</li>\n        </ul>\n        <form>\n            <textarea id=\"email-list\" placeholder=\"enter emails to share your channel\">\n            </textarea>\n            <button id=\"share-channel-button\"\n                class=\"btn btn-default\"\n                onclick=\"", "\"\n            >Share Channel\n            </button>\n        </form>"], ["<h2>A list of links for channel</h2>\n        <ul>\n            <li>Link1</li>\n            <li>Link2</li>\n            <li>Link3</li>\n        </ul>\n        <form>\n            <textarea id=\"email-list\" placeholder=\"enter emails to share your channel\">\n            </textarea>\n            <button id=\"share-channel-button\"\n                class=\"btn btn-default\"\n                onclick=\"", "\"\n            >Share Channel\n            </button>\n        </form>"]),
    _templateObject6 = _taggedTemplateLiteral(["<h2>Congratulations ", "!</h2>\n        <h3>Here's your new Likemoji channel</h3>\n        <button id=\"next-step-button\"\n            onclick=\"", "\"\n            class=\"btn btn-default\">Next</button>"], ["<h2>Congratulations ", "!</h2>\n        <h3>Here's your new Likemoji channel</h3>\n        <button id=\"next-step-button\"\n            onclick=\"", "\"\n            class=\"btn btn-default\">Next</button>"]),
    _templateObject7 = _taggedTemplateLiteral(["<li class=\"channelList\" id=\"", "\">\n                    <a data-i=", " onclick=\"", "\">", "</a>\n                </li>"], ["<li class=\"channelList\" id=\"", "\">\n                    <a data-i=", " onclick=\"", "\">", "</a>\n                </li>"]),
    _templateObject8 = _taggedTemplateLiteral(["<div>\n        <ul>\n            ", "\n        </ul>\n    </div>"], ["<div>\n        <ul>\n            ", "\n        </ul>\n    </div>"]);

var _users = __webpack_require__(/*! ./modules/users.js */ "./src/app/modules/users.js");

var _clonechannel = __webpack_require__(/*! ./modules/clonechannel.js */ "./src/app/modules/clonechannel.js");

var _clonechannel2 = _interopRequireDefault(_clonechannel);

var _organizations = __webpack_require__(/*! ./modules/organizations.js */ "./src/app/modules/organizations.js");

var _channel = __webpack_require__(/*! ./modules/channel.js */ "./src/app/modules/channel.js");

var _phoneView = __webpack_require__(/*! ./views/phoneView.js */ "./src/app/views/phoneView.js");

var _categoryView = __webpack_require__(/*! ./views/categoryView.js */ "./src/app/views/categoryView.js");

var _categoryView2 = _interopRequireDefault(_categoryView);

var _categoriesEditor = __webpack_require__(/*! ./views/categoriesEditor.js */ "./src/app/views/categoriesEditor.js");

var _categoriesEditor2 = _interopRequireDefault(_categoriesEditor);

var _catLeftView = __webpack_require__(/*! ./views/catLeftView.js */ "./src/app/views/catLeftView.js");

var _catLeftView2 = _interopRequireDefault(_catLeftView);

var _likemojisListView = __webpack_require__(/*! ./views/likemojisListView.js */ "./src/app/views/likemojisListView.js");

var _likemojisListView2 = _interopRequireDefault(_likemojisListView);

var _styleEditorView = __webpack_require__(/*! ./views/styleEditorView.js */ "./src/app/views/styleEditorView.js");

var _styleEditorView2 = _interopRequireDefault(_styleEditorView);

var _signupForm = __webpack_require__(/*! ./views/signupForm.js */ "./src/app/views/signupForm.js");

var _signupForm2 = _interopRequireDefault(_signupForm);

var _loginForm = __webpack_require__(/*! ./views/loginForm.js */ "./src/app/views/loginForm.js");

var _loginForm2 = _interopRequireDefault(_loginForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _lighterhtml = lighterhtml,
    render = _lighterhtml.render,
    html = _lighterhtml.html,
    svg = _lighterhtml.svg; // this is loaded in the index.html file

var panel1, panel2, panel3, panelStyle, channelName, user, channelID, // currently selected channel ID
selectedCategoryID, // currently selected category ID
panelCategories, panelLikemojis, panelEditor, panelStyleEditor; //styles editor
var channels = []; // list of users channels


//modal editor vars
var editors = []; //users ids able to edit the channel to populate channel list
var activeEditorWindow = "pageHeaderEditor";
var imagefile; //image to be saved to S3
var unsplashResults = []; //array of images returned from unsplash search
var parseFile;
var headerParseFile;
var ipadParseFile;

var emptySpan = function emptySpan() {
    return html(_templateObject);
};

// used to deal with errors on undefined attributes where parse wants you to chain a call to something like URL to the attribute
// for example groupSelected.attributes.newCategoryImage.url()
var mockObject = {};
mockObject.url = function () {
    return '';
};

channelName = "You Beautiful Person You";
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        initApplication();
        page("/");
    }
};

function initApplication() {
    panel1 = document.getElementById("panel1");
    panel2 = document.getElementById("panel2");
    panel3 = document.getElementById("panel3");
    panelStyle = document.getElementById("panel-style");
    // not sure about having to add these elements like this
    panelLikemojis = getOrCreateDiv('panel-likemojis', panel3);
    panelEditor = getOrCreateDiv('panel-editor', panel3);
    panelCategories = getOrCreateDiv('panel-categories', panel3);
    panelStyleEditor = getOrCreateDiv('panel-style-editor', panel3);

    Parse.initialize("fg8ZXCHKfBOWme42LGPA");
    Parse.serverURL = "https://lmx-stage-alex.herokuapp.com/parse";
    user = new Parse.User();
}

page.start({ hashbang: false, dispatch: true });
//page.base("/src/app/page_router_example.html");
page.base('/src/app');
page("/", function (ctx, next) {
    _channel.viewControl.deleteAll();
    _channel.viewControl.add(panel1, function () {
        return html(_templateObject2);
    });
    _channel.viewControl.add(panel2, function () {
        return emptySpan();
    });
    _channel.viewControl.add(panel3, function () {
        return emptySpan();
    });
});

page("/home", function (ctx, next) {
    page.redirect("/");
});

page("/signup", function (ctx, next) {
    //panel 2
    _channel.viewControl.deleteView(panel2);
    _channel.viewControl.add(panel3, function () {
        return emptySpan();
    });
    _channel.viewControl.add(panel2, function () {
        return (0, _signupForm2.default)();
    });
    //not sure if this is the best place to wire up event handlers...
    var signupUser2 = document.querySelector("#signUpUser2");
    signupUser2.addEventListener("click", async function (e) {
        e.preventDefault();
        // create the user
        var user_password = document.getElementById("inputPassword").value;
        var user_email = document.getElementById("inputEmail").value;
        try {
            user = await (0, _users.newUser)(user_email, user_password);
        } catch (e) {
            alert('error: ' + e);
            // TODO we could redirect to another route?
        }

        // TODO we need to put validation controls around the signup form
        if (user.isCurrent()) {
            // set orgname/channelname in state
            channelName = document.getElementById("inputOrganization").value;

            // TODO see if we can just give it a route for clone and then a "next" clone a
            // channel for them start by cloning channel xGO7Pdu71w
            var targetOrg = new _organizations.Organization();
            var _channelID = "xGO7Pdu71w"; //TODO make this dynamic based on how they enter
            //TODO if the name is not unique???
            targetOrg.set("name", channelName);
            targetOrg.save().then(async function (org) {
                console.log("New org saved .. now clone");
                await (0, _clonechannel2.default)({ targetOrgId: org.id, sourceOrgId: _channelID });
                //TODO update header image with fabric built image
                _channel.Channel.mainCategory().set('headerimage', '');

                document.getElementById('login').classList.add('active');
                page("/viewnew/" + org.id);
            });
        }
    });

    var imageSource = "../assets/screenshots/IMG_0971.png";
    _channel.viewControl.add(panel3, function () {
        return html(_templateObject3, imageSource);
    });
});

page("/login", function (ctx, next) {
    console.info('login route');
    _channel.viewControl.deleteAll();
    _channel.viewControl.add(panel2, function () {
        return (0, _loginForm2.default)();
    });

    //not sure if this is the best place to wire up event handlers...
    var loginButton = document.querySelector("#loginUser");
    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        // login the user
        var user_password = $("#loginPassword").val();
        var user_email = $("#loginEmail").val();
        // then show them the page listing their channels
        console.log("responding to the click event " + e);
        loginParse(user_email, user_password).then(function () {
            //hide login link
            document.getElementById('login').classList.add('active');
            // move along
            page("/channels");
        });
    });
}); // login page

page("/logout", function (ctx, next) {
    _channel.viewControl.deleteAll();
    Parse.User.logOut().then(function () {
        console.info('user logged out');
        user = Parse.User.current();
        page.redirect('/home');
    });
}); // logout


page("/distribute", function (ctx, next) {
    _channel.viewControl.add(panel1, function () {
        return html(_templateObject4);
    });
    _channel.viewControl.add(panel3, function () {
        function shareChannel(e) {
            e.preventDefault();
            alert("emails are on the way");
        }

        var form = html(_templateObject5, shareChannel);
        return form;
    });
}); // distribute page

page("/viewnew/:orgID", async function (ctx, next) {
    await _channel.Channel.populateAll(ctx.params.orgID);
    _channel.viewControl.add(panel1, function () {
        return html(_templateObject4);
    });
    //showLink(ctx, next, boilerplate);
    _channel.Channel.selectedCategory = _channel.Channel.mainCategory;
    _channel.viewControl.add(panel2, function () {
        return (0, _phoneView.phoneView)(_channel.Channel);
    });

    _channel.viewControl.add(panel3, function () {
        var form = html(_templateObject6, _channel.Channel.channelName, function () {
            return page('/distribute');
        });
        return form;
    });
}); // viewnew/orgID page

page("/channels", async function (ctx, next) {
    console.log("channel list view");
    if (user.isCurrent()) {
        channels = await (0, _users.getUserChannels)(user.id);
        console.log("getUserChannels returned count: " + channels.length);

        _channel.viewControl.add(panel1, function () {
            return displayChannelList(channels);
        });
        _channel.viewControl.deleteView(panel2);
        _channel.viewControl.deleteView(panel3);
    }
}); //channels page

page("/channel/:channelID/clone", function (ctx, next) {
    channelID = ctx.params.channelID;
    console.log("entering clone for channel id " + channelID);
    channelName = "Clone of " + channelID;
    var targetOrg = new _organizations.Organization();
    targetOrg.set("name", channelName);
    targetOrg.save().then(async function (org) {
        console.log("New org saved .. now clone");
        await (0, _clonechannel2.default)({ targetOrgId: org.id, sourceOrgId: channelID });
        //redirect to the view now
        page.redirect("/viewnew/" + org.id);
    });
});

page("/channel/:channelID/view", async function (ctx, next) {
    channelID = ctx.params.channelID;
    console.log("entering view for channel id " + channelID);
    if (!_channel.Channel.channelID || _channel.Channel.channelID != channelID) {
        await _channel.Channel.populateAll(channelID);
        //channel = channels.find(x => x.id === channelID);
    }
    _channel.Channel.selectedCategory = _channel.Channel.mainCategory;
    _channel.viewControl.deleteAll();
    _channel.viewControl.add(panel2, function () {
        return (0, _phoneView.phoneView)(_channel.Channel);
    });
    _channel.viewControl.add(panel1, function () {
        return (0, _catLeftView2.default)(_channel.Channel.categories);
    });
    // not sure about having to add these elements like this
    panelLikemojis = getOrCreateDiv('panel-likemojis', panel3);
    panelEditor = getOrCreateDiv('panel-editor', panel3);
    panelCategories = getOrCreateDiv('panel-categories', panel3);
    panelStyleEditor = getOrCreateDiv('panel-style-editor', panel3);

    panelLikemojis.classList.add('hidden');
    panelCategories.classList.add('hidden');
    panelStyleEditor.classList.add('hidden');
    panelEditor.classList.remove('hidden');

    // we could combine these 4 views into one view.js file
    _channel.viewControl.add(panelCategories, function () {
        return (0, _categoriesEditor2.default)(_channel.Channel);
    });
    _channel.viewControl.add(panelEditor, function () {
        return (0, _categoryView2.default)(_channel.Channel);
    });
    _channel.viewControl.add(panelLikemojis, function () {
        return (0, _likemojisListView2.default)(_channel.Channel);
    });
    _channel.viewControl.add(panelStyleEditor, function () {
        return (0, _styleEditorView2.default)(_channel.Channel);
    });

    _channel.viewControl.add(panelStyle, function () {
        return inlineStyle(_channel.Channel.channelStyle);
    });
}); //channel view

page("/channel/:channelID/view/:groupID", async function (ctx, next) {
    if (!_channel.Channel.channelID || _channel.Channel.channelID != ctx.params.channelID) {
        channelID = ctx.params.channelID;
        _channel.Channel.populateAll(channelID);
        //channel = channels.find(x => x.id === channelID);
    }

    selectedCategoryID = ctx.params.groupID;
    console.log("entering view for channel id " + channelID + " and group " + selectedCategoryID);
    _channel.Channel.selectedCategoryID = selectedCategoryID;
    _channel.viewControl.add(panel2, function () {
        return (0, _phoneView.phoneView)(_channel.Channel);
    });

    _channel.viewControl.add(panelCategories, function () {
        return (0, _categoriesEditor2.default)(_channel.Channel);
    });
    _channel.viewControl.add(panelEditor, function () {
        return (0, _categoryView2.default)(_channel.Channel);
    });
    _channel.viewControl.add(panelLikemojis, function () {
        return (0, _likemojisListView2.default)(_channel.Channel);
    });
    _channel.viewControl.add(panelStyleEditor, function () {
        return (0, _styleEditorView2.default)(_channel.Channel);
    });

    _channel.viewControl.add(panelStyle, function () {
        return inlineStyle(_channel.Channel.channelStyle);
    });
    // TODO add the back button on the left panel
    panelLikemojis.classList.add('hidden');
    panelCategories.classList.add('hidden');
    panelStyleEditor.classList.add('hidden');
    panelEditor.classList.remove('hidden');
}); //channel group page


page("/channel/:channelID/edit", function (ctx, next) {
    console.log("entering edit for channel id " + ctx.channelID);
}); //channel editor page


page("/right/link10", function (ctx, next) {
    console.log("link10");
    showRightLink(ctx, next, "link10");
});

page("*", function (ctx, next) {
    console.log("catch all route");
    console.log(ctx);
});

function clearPanel(panel) {
    var panelContents = panel.childNodes;
    for (i = 0; i < panelContents.length; i++) {
        holdingPen.appendChild(panelContents[i]);
    }
}

function renderForm(panel, formFunction, formArguments) {
    var form = void 0;
    // sometimes form is a promise
    // try to resolve and if it is not a thennable just append the result
    //
    try {
        formFunction(formArguments).then(function (_form) {
            panel.appendChild(_form);
        });
    } catch (err) {
        form = formFunction(formArguments);
        panel.appendChild(form);
    }
}

function showform(formID, panel) {
    var form = document.getElementById(formID);
    form.style.visible = true;
    form.style.display = "block";
    panel.appendChild(form);
}

//<a href="channel/${i.id}/clone">${i.attributes.name}</a>
var displayChannelList = function displayChannelList(channels) {
    /* simple pattern for click handlers
    define a function that takes (e) as parameter
    --- function myClicker(e) {
    inside function find the target and the id data attribute
    --- let targetID = e.currentTarget.dataset.i;
    --- execute something
    then define onclick and data-i attribute
    --- <a data-i=${i.id} onclick="${myClicker}">
    */

    function selectChannel(e) {
        var targetChannel = e.currentTarget.dataset.i;
        var route = '/channel/' + targetChannel + '/view';
        page(route);
    }

    var orgList = channels.map(function (i) {
        return html(_templateObject7, i.id, i.id, selectChannel, i.attributes.name);
    });

    var form = html(_templateObject8, orgList);
    return form;
};

async function loginParse(username, password) {
    console.log("logIn call with user: " + username + " and pwd: " + password);
    try {
        user = await Parse.User.logIn(username, password);
        console.log("logged in");
        return user;
    } catch (err) {
        console.log("error logging in " + err);
    }
    /*
        .then(function (newUser) {
    user = newUser;
    if (user.isCurrent()) {
    console.log("loggedin");
    } else {
    console.log("loggedout");
            }
            return user;
        })
        .then(function (user) {
            console.log('login function returning');
            return user;
        })
        .catch(err => alert(err));
    */
}

function inlineStyle(style) {
    console.info("running inline style with tabbar value of " + style.get("tabBar"));
    var styleSheet = "\n        #phoneDisplay {\n            background-color: " + style.get("generalColor") + ";\n        }\n\n        .navBar {\n            background-color:  " + style.get("tabBar") + "\n        }\n\n        .activeNavIcon {\n            color:  " + style.get("tabBarSelected") + "\n        }\n\n        .channelText {\n            color:  " + style.get("generalTextColor") + "\n        }\n        .categorytxt {\n            color:  " + style.get("categoryTextColor") + "\n        }";
    var styleTag = document.createElement('style');
    styleTag.append(styleSheet);
    return styleTag;
}

function getOrCreateDiv(id, parent) {
    var elem = document.getElementById(id);
    if (!elem) {
        elem = document.createElement('div');
        elem.id = id;
        parent.appendChild(elem);
    }
    return elem;
}

/* jquery/bootstrap handler for the categories editor modal
TODO replace with template function?
*/
$('#addCategoriesModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    var triggeringElement = event.relatedTarget; // Button/link/div that triggered the modal
    if (triggeringElement.id == 'addNewCategories') {
        _channel.Channel.selectedCategory = null;
        document.getElementById('likemoji-edit-form').reset();
        modal.find("#categoryPreview").attr("src", '');
        modal.find("#categoryImageName").text('');
    } else {
        var categoryID = triggeringElement.dataset.i; // Extract info from data-* attributes
        _channel.Channel.selectedCategoryID = categoryID;
        var groupSelected = _channel.Channel.selectedCategory;
        modal.find("#categoryName").val(groupSelected.attributes.name);
        modal.find("#categoryDisplayName").val(groupSelected.attributes.names.en);
        modal.find("#categoryImageInput").val("");
        if (groupSelected.attributes.disable == 1) {
            modal.find("#disableCat").prop("checked", true);
        } else {
            modal.find("#disableCat").prop("checked", false);
        }
        modal.find("#categoryPreview").hide();
        modal.find("#categoryPreview").attr("src", (groupSelected.attributes.newCategoryImage || mockObject).url() || '');
        modal.find("#categoryPreview").fadeIn(650);
        modal.find("#categoryImageName").text((groupSelected.attributes.newCategoryImage || mockObject)._name);
    }
});

//uploads a category image from category editor modal
$("#categoryImageButton").click(function () {
    var fileUploadControl = $("#categoryImageInput")[0];
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = fileUploadControl.files[0].name;
        parseFile = new Parse.File(name, file);

        parseFile.save().then(function () {
            // $('#categoryPreview').hide();
            $("#categoryPreview").attr("src", parseFile._url);
            // $('#categoryPreview').fadeIn(650);
            console.log(parseFile._url);

            // The file has been saved to Parse.
        }, function (error) {
            // The file either could not be read, or could not be saved to Parse.
        });
        $("#categoryImageInput")[0].value = "";
    }
});

//saves category when editor modal is closed with save button
$("#saveCategory").click(function (event) {
    var categoryText = $("#categoryDisplayName").val();
    var categoryNameInternal = $("#categoryName").val();
    var categoryTextEN = {
        en: categoryText
    };
    var Group = Parse.Object.extend('Group');
    var disabled = $("#disableCat").is(":checked") ? 1 : 0;
    var groupSelected = _channel.Channel.selectedCategory;

    if (groupSelected == undefined) {
        groupSelected = new Group(); //Parse.Object.createWithoutData('Group');
        groupSelected.set("organizationID", _channel.Channel.channelID);
        groupSelected.set("order", _channel.Channel.categories.length + 1);
        groupSelected.set("newHeader", _channel.Channel.mainCategory.attributes.newHeader);
        groupSelected.set("callOuts", { en: "Connect with us!" });
        groupSelected.set("likemojis", []);
    }

    groupSelected.set("name", categoryNameInternal);
    groupSelected.set("names", categoryTextEN);
    groupSelected.set("disable", disabled);

    if (parseFile != undefined) {
        groupSelected.set("newCategoryImage", parseFile);
        console.log("skipped");
    }

    // need to add "else" above to handle if user adds a category and doesn't upload
    // an image.. should default to a default parse image we host - should do the
    // same for the header as well - currently it just duplicates the main page
    // header here...

    groupSelected.save().then(async function (group) {
        _channel.Channel.addCategory(groupSelected).then(function () {
            console.log("category saved");
            parseFile = undefined;
            page.redirect('/channel/' + channelID + '/view/' + groupSelected.id);
            //document.getElementById("categoriesInEditor").innerHTML = "";
        });
    }, function (error) {
        //  error is a Parse.Error with an error code and message.
        alert("Failed to create new object, with error code: " + error.message);
    });
});

//fills data for header editor modal
$('#editheaderModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    var groupSelected = _channel.Channel.selectedCategory;

    modal.find("#imageUpload").val("");
    modal.find("#headerPreview").attr("src", groupSelected.attributes.newHeader.url());
    modal.find("#headerEditorImageName").text(groupSelected.attributes.newHeader._name);
    modal.find("#ipadImageUpload").val("");
    modal.find("#ipadHeaderPreview").attr("src", (groupSelected.attributes.newIpadHeader || mockObject).url() || '');
    modal.find("#ipadHeaderEditorImageName").text((groupSelected.attributes.newIpadHeader || mockObject)._name || '');
});

$("#saveEditedHeader").click(function () {
    // var name = $('#imageUpload')[0].files[0].name;   $("#headerName").text(name);
    var groupSelected = _channel.Channel.selectedCategory;
    groupSelected.set("newHeader", headerParseFile);
    groupSelected.set("newIpadHeader", ipadParseFile);
    groupSelected.save().then(function (group) {
        // Execute any logic that should take place after the object is saved.
        console.log("header saved");
        /*
        $("#buildHeader img").attr(
        "src",
        groupSelected.attributes.newHeader.url()
        );
        $("#buildHeader").hide();
        $("#buildHeader").fadeIn(650);
        */
        _channel.Channel.updateViews();

        // todo see if bootstrap has a reset modal feature
        $("#imageUpload")[0].value = "";
    }, function (error) {
        // Execute any logic that should take place if the save fails. error is a
        // Parse.Error with an error code and message.
        alert("Failed to create new object, with error code: " + error.message);
    });
});

// uploads mobile header image to parse and sets the preview image src
$("#headerEditorImageButton").click(function () {
    var fileUploadControl = $("#imageUpload")[0];
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = fileUploadControl.files[0].name;
        headerParseFile = new Parse.File(name, file);

        headerParseFile.save().then(function () {
            $("#headerPreview").attr("src", headerParseFile._url);

            console.log(headerParseFile._url);

            // The file has been saved to Parse.
        }, function (error) {
            // The file either could not be read, or could not be saved to Parse.
        });
    }
});

// uploads mobile header image to parse and sets the preview image src

$("#ipadHeaderEditorImageButton").click(function () {
    console.log("ipad upload clicked");

    var fileUploadControl = $("#ipadImageUpload")[0];
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = fileUploadControl.files[0].name;
        ipadParseFile = new Parse.File(name, file);

        ipadParseFile.save().then(function () {
            $("#ipadHeaderPreview").attr("src", ipadParseFile._url);

            console.log(ipadParseFile._url);

            // The file has been saved to Parse.
        }, function (error) {
            // The file either could not be read, or could not be saved to Parse.
        });
    }
});

// when likemoji editor modal is opened this fills data
$('#editLikemojisModal').on('show.bs.modal', function (event) {
    var thisLikemojiID = event.relatedTarget.id; // id of calling likemoji icon
    var modal = $(this);
    // alert("clicked");
    var likemoji = _channel.Channel.likemojis.find(function (x) {
        return x.id === thisLikemojiID;
    });

    modal.find("#likemojiName").val(likemoji.attributes.names.en);
    modal.find("#likemojiEditorImageInput").val("");
    modal.find("#likemojiPreview").hide();
    modal.find("#likemojiPreview").attr("src", likemoji.attributes.x3.url());
    modal.find("#likemojiPreview").fadeIn(650);
    modal.find("#LikemojiEditorImageName").text(likemoji.attributes.x3._name);
    modal.find("#likemojiEditorImageButton").click(function () {
        var fileUploadControl = $("#likemojiEditorImageInput")[0];
        if (fileUploadControl.files.length > 0) {
            var file = fileUploadControl.files[0];
            var name = fileUploadControl.files[0].name;
            parseFile = new Parse.File(name, file);

            parseFile.save().then(function () {
                // $('#likemojiPreview').hide();
                $("#likemojiPreview").attr("src", parseFile._url);
                // $('#likemojiPreview').fadeIn(650);
                console.log(parseFile._url);

                // The file has been saved to Parse.
            }, function (error) {
                // The file either could not be read, or could not be saved to Parse.
            });
            $("#likemojiEditorImageInput")[0].value = "";
        }
    });

    //saves edited likemoji when editor modal is closed with save button
    modal.find("#saveEditedLikemoji").click(function (event) {
        var likemojiNamesEN = $("#likemojiName").val();

        likemoji.set("names", { en: likemojiNamesEN });

        if (parseFile != undefined) {
            likemoji.set("x3", parseFile);
        }

        likemoji.save().then(async function (returnedLikemoji) {
            // Execute any logic that should take place after the object is saved.
            console.log("likemoji saved");
            _channel.Channel.updateViews();
            parseFile = undefined;
        }, function (error) {
            // Execute any logic that should take place if the save fails. error is a
            // Parse.Error with an error code and message.
            alert("Failed to create new object, with error code: " + error.message);
        });
    });
});

//creates a new likemoji from file uploader
async function createLikemoji(file) {
    var name = file.name;
    var parseFile = new Parse.File(name, file);
    var likemojiNamesEN = name.slice(0, -4);
    var Likemoji = Parse.Object.extend('Likemoji');
    console.info('saving file named ' + name);
    await parseFile.save();
    var newLikemoji = new Likemoji();
    console.info("file " + name + " saved now add likemojis");
    newLikemoji.set("x3", parseFile);
    newLikemoji.set("name", name.slice(0, -4));
    newLikemoji.set("names", { en: likemojiNamesEN });
    newLikemoji.set("organizationID", _channel.Channel.channelID);
    newLikemoji.set("organizationName", _channel.Channel.channelName);
    await newLikemoji.save().catch(function (error) {
        // error is a Parse.Error with an error code and message.
        alert("Failed to create new object, with error code: " + error.message);
    });
    console.info("likemoji " + name + " saved now add to channel");
    _channel.Channel.likemojis.push(newLikemoji);
    $("#uploadComplete").fadeIn(1650);
    // The file has been saved to Parse.
    return newLikemoji;
}

$("#addLikemojisModalButton").change(function () {
    $("#uploadComplete").hide();
});

$("#likemojisImageButton").click(async function () {
    var fileUploadControl = document.getElementById("likemojisImageInput").files;
    if (fileUploadControl.length > 0) {
        var promiseChain = [];
        for (var i = 0; i < fileUploadControl.length; i++) {
            console.info('adding upload promise for file number' + i);
            promiseChain.push(createLikemoji(fileUploadControl[i]));
        }
        await Promise.all(promiseChain).then(function () {
            console.info('likemojis saved..now refresh views');
            _channel.Channel.updateViews();
            $("#likemojisImageInput")[0].value = "";
        });
    }
});

/***/ }),

/***/ "./src/app/modules/channel.js":
/*!************************************!*\
  !*** ./src/app/modules/channel.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.viewControl = exports.Channel = undefined;

var _organizations = __webpack_require__(/*! ./organizations.js */ "./src/app/modules/organizations.js");

var _likemojis = __webpack_require__(/*! ./likemojis.js */ "./src/app/modules/likemojis.js");

var _likemojis2 = _interopRequireDefault(_likemojis);

var _styles = __webpack_require__(/*! ./styles.js */ "./src/app/modules/styles.js");

var _viewcontrol = __webpack_require__(/*! ./viewcontrol.js */ "./src/app/modules/viewcontrol.js");

var _viewcontrol2 = _interopRequireDefault(_viewcontrol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import {Group, getMainCategory} from "./groups.js";

var org = Parse.Object.extend("Organization");
var Channel = {
    channel: new org(),
    categories: [], //Object.create(Group)]
    likemojis: [], //[Object.create(Likemoji)],
    //TODO how to define function getCategoryLikemojis on each array element
    styles: [], // [Object.create(ChannelStyle)],
    _selectedCategory: '',

    get channelID() {
        return this.channel.id;
    },

    get selectedCategory() {
        return this._selectedCategory;
    },
    /**
     * @param {object} category
     */
    set selectedCategory(category) {
        this._selectedCategory = category;
    },
    get selectedCategoryID() {
        return this._selectedCategory.id;
    },
    set selectedCategoryID(ID) {
        this._selectedCategory = this.categories.find(function (x) {
            return x.id === ID;
        });
    },

    populateAll: async function populateAll(popID) {
        // setting a new channel refresh all the related data
        this.channel = await (0, _organizations.getOrganization)(popID);
        this.categories = await getOrgCategories(popID);
        this.likemojis = await getLikemojis(popID);
        this.styles = await (0, _styles.getStyle)(popID);
        console.log("populated channel for " + popID);
        console.log("populated likemojis with " + this.likemojis.length);
    },
    resetStyle: async function resetStyle() {
        await this.styles[0].fetch();
        console.info("populated style and now tabbar has a value of " + Channel.channelStyle.get("tabBar"));
        return this.styles[0];
    },


    catLikemojis: function catLikemojis(category) {
        var catLikemojis = category.get('likemojis');
        // return the likemojis that match array in category
        return this.likemojis.filter(function (moji) {
            return catLikemojis.find(function (x) {
                return x === moji.id;
            });
        });
    },

    deleteCategory: async function deleteCategory(category) {
        // remove from the channel object..group and grouppointers attributes
        var channelGroups = this.channel.get('groups');
        var ind = channelGroups.findIndex(function (x) {
            return x === category.id;
        });
        channelGroups.splice(ind, 1);
        this.channel.set('groups', channelGroups);
        this.channel.set("groupPointer", arrayToPointers(channelGroups, "Group"));
        //and remove it from this local object
        var ind2 = this.categories.findIndex(function (x) {
            return x.id === category.id;
        });
        this.categories.splice(ind2, 1);
        await this.channel.save();

        //search parse to see if category has connected data
        // if not then delete it

        category.save();
        // destroy means delete...
        await category.destroy().then(function (cat) {
            // The object was deleted from the Parse Cloud.
        }, function (error) {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
            // TODO messaging function for unified handling of errors
        });
    },
    addCategory: async function addCategory(category) {
        // test if this is already in the channel
        var ind = this.categories.findIndex(function (x) {
            return x.id === category.id;
        });
        if (ind < 0) {
            this.categories.push(category);
            //add to the channel object too
            var channelGroups = this.channel.get('groups');
            channelGroups.push(category.id);
            this.channel.set('groups', channelGroups);
            this.channel.set("groupPointer", arrayToPointers(channelGroups, "Group"));
            this.channel.save();
            category.set('organizationID', this.channel.id);
            category.set('organizationName', this.channel.get('name'));
            await category.save();
        }
        return category;
    },

    addLikemoji: async function addLikemoji(likemoji) {
        likemoji.set("Organization", this.channel.id);
        await likemoji.save();
        this.likemojis.push(likemoji);
    },
    deleteLikemoji: async function deleteLikemoji(likemoji) {
        // remove from group(s)
        var rem = this.removeCategoryLikemoji;
        //        let {removeCategoryLikemoji: rem} = this;

        this.categories.forEach(function (cat) {
            rem(cat, likemoji);
        });
        // find the exact likemoji in our collection
        var ind = this.likemojis.findIndex(function (x) {
            return x.id === likemoji.id;
        });
        this.likemojis.splice(ind, 1);
        await Parse.Object.saveAll(this.categories);
        await likemoji.destroy().then(function (moji) {
            // The object was deleted from the Parse Cloud.
        }, function (error) {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
            // TODO messaging function for unified handling of errors
        });
    },
    addCategoryLikemoji: async function addCategoryLikemoji(category, likemoji) {
        //if likemoji is an id find the actual object
        var likemojiID = void 0,
            likemojiObj = void 0,
            maxCount = 20;
        if (typeof likemoji === "string" || typeof likemoji === "number") {
            likemojiID = likemoji;
            try {
                likemojiObj = this.likemojis.find(function (x) {
                    return x.id === likemojiID;
                });
            } catch (e) {
                alert(likemoji + " is an invalid ID for likemojis");
            }
        } else {
            likemojiObj = likemoji;
            likemojiID = likemojiObj.id;
        }
        // limit main category to 3 likemojis
        if (isMainCategory(category)) {
            maxCount = 3;
        }

        var catLikemojiIDs = category.get('likemojis');
        if (catLikemojiIDs.length >= maxCount) {
            alert('This section only allows 3 Likemojis');
        } else {
            // don't add if it is already in the list
            if (!catLikemojiIDs.find(function (x) {
                return x == likemojiID;
            })) {
                catLikemojiIDs.push(likemojiID);
                category.set('likemojis', catLikemojiIDs);
                likemojiObj.set('OrganizationId', this.channel.id);
                likemojiObj.set('organizationName', this.channel.get('name'));
                await likemojiObj.save();
                // TODO move to button action to "save" await category.save();
            }
        }
    },
    removeCategoryLikemoji: async function removeCategoryLikemoji(category, likemojiID) {
        // get the array of likemoji pointer from group
        var catLikemojiIDs = category.get('likemojis');
        // find the array index of the given likemoji
        var ind = catLikemojiIDs.findIndex(function (x) {
            return x === likemojiID;
        });
        if (ind > -1) {
            catLikemojiIDs.splice(ind, 1);
            category.set('likemojis', catLikemojiIDs);
            // TODO move to button action to "save" await category.save();
        }
    },
    setCategoryOrder: function setCategoryOrder(ids, orders) {
        // TODO run category ordering through here to ensure the
        // array and order attributes are in synch
    },

    get mainCategory() {
        var mainCat = this.categories.filter(isMainCategory);
        return mainCat[0]; //filter returns array here
    },

    get subCategories() {
        return this.categories.filter(function (cat) {
            return !isMainCategory(cat);
        });
    },
    get channelStyle() {
        return this.styles[0];
    },

    saveAll: function saveAll() {
        Promise.all([this.styles.saveAll(), this.categories.saveAll(), this.likemojis.saveAll(), this.channel.save()]).then(function () {
            return;
        }).catch(function (error) {
            console.log(error.message);
        });
    },

    updateViews: function updateViews() {
        _viewcontrol2.default.update();
    }

    /*  need to incorporate this logic
        editors.push(currentUser.id);
        organization.set("header", returnedOrg.attributes.header);
        organization.set("callOut", returnedOrg.attributes.callOut);
        organization.set("editors", editors);
    */

};function isMainCategory(category) {
    return category.attributes.main == 1;
}

async function getOrgCategories(orgId) {
    var query = new Parse.Query("Group");
    query.equalTo("organizationID", orgId);
    query.ascending("order");
    try {
        return await query.find();
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

async function getLikemojis(orgId) {
    var query = new Parse.Query(_likemojis2.default);
    query.equalTo("organizationID", orgId);
    try {
        return await query.find();
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

function arrayToPointers(arr, pointerClass) {
    var pointers = arr.map(function (id) {
        return {
            __type: "Pointer",
            className: pointerClass,
            objectId: id
        };
    });
    return pointers;
}
exports.Channel = Channel;
exports.viewControl = _viewcontrol2.default;

/***/ }),

/***/ "./src/app/modules/clonechannel.js":
/*!*****************************************!*\
  !*** ./src/app/modules/clonechannel.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _organizations = __webpack_require__(/*! ./organizations.js */ "./src/app/modules/organizations.js");

//Parse.Cloud.define("CloneChannel", async request => {
var currentUser;

async function cloneChannel(req) {
	console.log("cloneChannel " + req.sourceOrgId + " to " + req.targetOrgId);
	var targetOrg = new _organizations.Organization();
	var sourceOrg = new _organizations.Organization();

	currentUser = Parse.User.current();
	//TODO before we go copy everything to this new organization we have some way of checking it is the correct target?

	// TODO allow flexibility to define only a source org and clone it
	// when no request.targetOrgId is provided
	targetOrg = await getOrganization(req.targetOrgId);
	sourceOrg = await getOrganization(req.sourceOrgId);

	//TODO check if name exists before we overwrite it
	targetOrg.set("name", "Clone of " + sourceOrg.get("name"));

	// too many paramters needed for the steps in this
	// await saveChannelToOrg(groupIDs);
	// TODO can we make this into a separate block?
	var editors = []; //users ids able to edit the channel to populate channel list
	editors.push(currentUser.id);
	targetOrg.set("editors", editors);
	targetOrg.set("header", sourceOrg.attributes.header);
	targetOrg.set("callOut", sourceOrg.attributes.callOut);

	// get all the likemojis for the channel copying from
	//var likemojis, likemojiIDs, groups;
	var groupIDs = [];
	getLikemojis(req.sourceOrgId).then(function (_likemojis) {
		var likemojis = _likemojis;
		var likemojiIDs = cloneLikemojis(likemojis, targetOrg) //async .. does it matter
		.then(function (_likemojIDs) {
			likemojiIDs = _likemojIDs;
			// TODO we can probably just keep passing the then return down and not pas back up to outer block scoped variables
			getGroups(sourceOrg.id).then(function (_groups) {
				var groups = _groups;
				cloneGroups(groups, targetOrg, likemojiIDs).then(function (_groupIDS) {
					// now that we have groupids we can pass that back up into the org record
					groupIDs = _groupIDS;
					targetOrg.set("groups", groupIDs);
					targetOrg.set("groupPointer", arrayToPointers(groupIDs, "Group"));
					targetOrg.save().then(function (org) {
						console.log("org id " + org.id + " saved");
					}, function (error) {
						alert("Failed to create new object, with error code: " + error.message);
					});
				});
			});
		});
	});
	// cloning likemojis returns a mapping of oldID to newID array
	//.then( (likemojiIDs) => {groups = getGroups(sourceOrg.id)})
	// cloning groups returns a mapping of oldID to newID array

	//TODO fix this thenable mess. We can call cloneLikemojis and getGroups at the same time

	copyStyleToOrg(sourceOrg.id, targetOrg.id);

	console.log("done");
}
//);

//returns an organization object template or channel to edit or clone
async function getOrganization(orgId) {
	var query = new Parse.Query(_organizations.Organization);
	try {
		return await query.get(orgId);
	} catch (err) {
		// TypeError: failed to fetch
		alert(err);
	}
}

//copies given array of Likemoji objects to new organization object
async function cloneLikemojis(mojis, organization) {
	console.log("cloning " + mojis.length + " likemojies to ord id " + organization.id);
	// map each moji to a function that will clone it
	var mojiSaveArray = mojis.map(async function (moji) {
		var result = await copyMojiToOrg(moji, organization);
		//console.log(result.id);
		return { oldID: moji.id, newID: result.id };
	});
	// execute the entire array of clone calls and return the array of returned values
	var resolvedmojiSaveArray = await Promise.all(mojiSaveArray); // resolving all promises
	return resolvedmojiSaveArray;
}

async function copyMojiToOrg(likemoji, org) {
	var newLikemoji = likemoji.clone();
	newLikemoji.set("organizationID", org.id);
	newLikemoji.set("organizationName", org.get("name"));
	// TODO this ACL setting could be handled in cloud code beforesave trigger
	newLikemoji.setACL(org.getACL());
	delete newLikemoji.objectId;
	return await newLikemoji.save(); /*.then(function(newLikemoji) {
                                  return newLikemoji;
                                  { oldID: newLikemojiID, newID: newLikemoji.id }; //objectId;
                                  })*/
}

// return likemojis associated with an org
async function getLikemojis(orgId) {
	var query = new Parse.Query("Likemoji");
	query.equalTo("organizationID", orgId);
	try {
		return await query.find();
	} catch (err) {
		// TypeError: failed to fetch
		alert(err);
	}
}

async function cloneGroup(group, organization, likemojiIDs) {
	var newGroup = group.clone();
	newGroup.set("organizationID", organization.id);
	newGroup.set("organization", organization.get("name"));
	//newGroup.set("order", i);
	newGroup.set("likemojis", remapIDs(newGroup.get("likemojis"), likemojiIDs));
	return await newGroup.save();
}

//clone groups
async function cloneGroups(groups, organization, likemojiIDs) {
	var groupSaveArray = groups.map(async function (group) {
		var result = await cloneGroup(group, organization, likemojiIDs);
		console.log(result.id);
		return result.id;
	});
	// execute the entire array of clone calls and return the array of returned values
	var resolvedgroupSaveArray = await Promise.all(groupSaveArray); // resolving all promises
	return resolvedgroupSaveArray;
}

//clone style
function copyStyleToOrg(fromOrgID, toOrgID) {
	var ChannelStyle = Parse.Object.extend("ChannelStyle");
	var newStyle = new ChannelStyle(); // new channel for new organization being created
	var styles = new ChannelStyle();
	getStyle(fromOrgID).then(function (_styles) {
		styles = _styles;
		newStyle = styles[0].clone();
		newStyle.set("organizationID", toOrgID);
		newStyle.save().then(function (style) {
			// Execute any logic that should take place after the object is saved.
			console.log("New object created with objectId:" + style.id);
		}, function (error) {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		});
	});
}

// return styles associated with an org
async function getStyle(orgId) {
	var query = new Parse.Query("ChannelStyle");
	query.equalTo("organizationID", orgId);
	try {
		// store styles query result in styles array
		return await query.find();
	} catch (err) {
		// TypeError: failed to fetch
		alert(err);
	}
}

// return groups associated with an org

async function getGroups(orgId) {
	var query = new Parse.Query("Group");
	query.equalTo("organizationID", orgId);
	query.ascending("order");
	try {
		return await query.find();
	} catch (err) {
		// TypeError: failed to fetch
		alert(err);
	}
}

// given an array of objectids and an array of object {oldID: x, newID: y}
// attempts to find the x value and return the y
// not found returns a null which is then filtered out of te returned array
function remapIDs(sourceArray, mappingArray) {
	var mapp = mappingArray;
	var lookup = function lookup(findID) {
		return mapp.find(function (x) {
			return x.oldID === findID;
		}).newID;
	};

	var remappedIDs = sourceArray.map(function (id) {
		try {
			var newid = lookup(id); // mappingArray.find(x => x.oldID === id).newID;
			return newid;
		} catch (err) {
			return null;
		}
	}).filter(function (el) {
		return el != null;
	});
	return remappedIDs;
}

function arrayToPointers(arr, pointerClass) {
	var pointers = arr.map(function (id) {
		return {
			__type: "Pointer",
			className: pointerClass,
			objectId: id
		};
	});
	return pointers;
}

exports.default = cloneChannel;

/***/ }),

/***/ "./src/app/modules/likemojis.js":
/*!**************************************!*\
  !*** ./src/app/modules/likemojis.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//likemojis.js
//const Likemoji = Parse.Object.extend("Likemoji");
//var likemoji = Parse.Object.extend("Likemoji");

/* A "standard" Parse object extend format 
var MyClass = Parse.Object.extend("MyClass", {
        Instance methods,
        initialize: function(attrs, options) {
            this.someInstanceProperty = [],
            Other instance properties
        }
    }, {
        Class properties
    });
 */

var Likemoji = Parse.Object.extend("Likemoji", {
  cloneMojies: function cloneMojies(mojis) {
    return cloneLikemojies(mojis);
  },
  getLikemojis: function getLikemojis(orgId) {
    return _getLikemojis(orgId);
  },
  sortName: function sortName(mojis) {
    return sortMojisByName(mojis);
  }
});

//copies given Likemojis to current Likemoji set
async function cloneLikemojis(mojies) {
  var newLikemojisArray = [];
  var intermediateLikemojisArray = [];
  for (var i = 0; i < mojis.length; i++) {
    var newLikemoji = mojis[i].clone();
    newLikemoji.set("organizationID", organization.id);
    newLikemoji.set("organizationName", organization.get("name"));
    newLikemojisArray[i] = newLikemoji;
    // add attribute to store the original ID
    newLikemojisArray[i].copiedFromID = mojis[i].id;
  }
  // saving to Parse without added attribute
  intermediateLikemojisArray = newLikemojisArray;
  delete intermediateLikemojisArray.copiedFromID;
  Parse.Object.saveAll(intermediateLikemojisArray);
  return newLikemojisArray;
};

// iterate through categoriesSorted array likemojis property array
// to store index relating to old likemoji ids
// and create new arrays of new likemojis based on old indexs
// and save to newGroupsLikemojis array.

function setNewGroupLikemojisArray() {
  var importedLikemojisIDs = [];
  var newLikemojisArrayIDs = [];
  var newGroupLikemojis = [];
  for (var i = 0; i < importedLikemojis.length; i++) {
    importedLikemojisIDs[i] = importedLikemojis[i].id;
    newLikemojisArrayIDs[i] = newLikemojisArray[i].id;
  }

  for (var i = 0; i < categoriesSorted.length; i++) {
    // console.log (categoriesSorted[i].attributes.likemojis.length)
    newGroupLikemojis = [];

    for (var j = 0; j < categoriesSorted[i].attributes.likemojis.length; j++) {
      var likemojiID = categoriesSorted[i].attributes.likemojis[j];
      var oldLikemojiIndex = importedLikemojisIDs.indexOf(likemojiID);

      newGroupLikemojis[j] = newLikemojisArrayIDs[oldLikemojiIndex];
    }

    newGroupsLikemojis[i] = newGroupLikemojis;
  }

  return newGroupLikemojis;
}

// return likemojis associated with an org
async function _getLikemojis(orgId) {
  var query = new Parse.Query(Likemoji);
  query.equalTo("organizationID", orgId);

  try {
    return await query.find();
  } catch (err) {
    // TypeError: failed to fetch
    alert(err);
  }
}
async function sortMojisByName(mojis) {
  return mojis.sort(SortByName);
}

function SortByName(a, b) {
  var aName = a.attributes.name.toLowerCase();
  var bName = b.attributes.name.toLowerCase();
  return aName < bName ? -1 : aName > bName ? 1 : 0;
}

exports.default = Likemoji;

/***/ }),

/***/ "./src/app/modules/organizations.js":
/*!******************************************!*\
  !*** ./src/app/modules/organizations.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// organizations.js 
//prototype object for Organization class from Parse

/* A "standard" Parse object extend format 
var MyClass = Parse.Object.extend("MyClass", {
        Instance methods,
        initialize: function(attrs, options) {
            this.someInstanceProperty = [],
            Other instance properties
        }
    }, {
        Class properties
    });
 */

var Organization = Parse.Object.extend("Organization", {
    saveChannelToOrg: function saveChannelToOrg() {
        _saveChannelToOrg();
    },
    getOrganization: function getOrganization(orgId) {
        _getOrganization(orgId);
    }
});

//TODO do we need to do this? 
// docs say only for ES6 class/subclass syntax 
// Parse.Object.registerSubclass("Organization", Organization);

//TODO don't we want paramters for saveChannelToOrg?


//TODO extend or delegate from base class not Parse                
var returnedOrg = Parse.Object.extend("Organization"); // imported organization


//returns and organization object template or channel to edit
// or clone
async function _getOrganization(orgId) {

    var query = new Parse.Query(Organization);

    try {
        return await query.get(orgId);
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

function _saveChannelToOrg() {
    // should rename groups to channels..?
    var organization = new Organization(); // new organization being created

    editors.push(currentUser.id);

    organization.set("groups", groupsIDs);
    organization.set("groupPointer", groupPointers);
    organization.set("header", returnedOrg.attributes.header);
    organization.set("callOut", returnedOrg.attributes.callOut);
    organization.set("editors", editors);

    organization.save().then(function (org) {
        // Execute any logic that should take place after the object is saved.
        // console.log("org saved"); alert('Organization updated with channel: ' +
        // org.id);
    }, function (error) {
        // Execute any logic that should take place if the save fails. error is a
        // Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
    });
}

exports.Organization = Organization;
exports.getOrganization = _getOrganization;

/***/ }),

/***/ "./src/app/modules/styles.js":
/*!***********************************!*\
  !*** ./src/app/modules/styles.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//channelstyles.js  styles
var ChannelStyle = Parse.Object.extend("ChannelStyle");

function saveNewStyle() {

    newStyle = styles[0].clone();

    newStyle.set("organizationID", organization.id);

    newStyle.save().then(function (style) {
        // Execute any logic that should take place after the object is saved.
        // alert('New object created with objectId: ' + style.id);

    }, function (error) {
        // Execute any logic that should take place if the save fails. error is a
        // Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
    });
}

// return styles associated with an org
async function getStyle(orgId) {

    var query = new Parse.Query(ChannelStyle);
    query.equalTo("organizationID", orgId);

    try {
        // store styles query result in styles array
        return await query.find();
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

exports.ChannelStyle = ChannelStyle;
exports.saveNewStyle = saveNewStyle;
exports.getStyle = getStyle;

/***/ }),

/***/ "./src/app/modules/users.js":
/*!**********************************!*\
  !*** ./src/app/modules/users.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//users.js returns list of channels for current user
// turns out exgedning user object is a little more involved. 
// if needed check out the example in extendedUserExample.js
//var User = Parse.Object.extend("User");

async function getUserChannels(userId) {
    var query = new Parse.Query("Organization");
    query.equalTo("editors", userId);

    try {
        return await query.find();
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

//sign up / create new user
async function newUser(email, password) {
    // TODO handle user already exists first
    console.log("function called");
    console.log(email + " " + password);

    var user = new Parse.User();
    var currentUser = void 0;
    //TODO I think here we use the outer User object this method is called from
    // in other words "this"

    user.set("username", email);
    user.set("password", password);
    user.set("email", email);

    // other fields can be set just like with Parse.Object user.set("phone", "");
    try {
        await user.signUp();
        currentUser = await Parse.User.current();

        console.log("user is signed up");
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
        console.log("not signed up");
    }
    return currentUser;
}

//logs user in
async function userLogin(email, password) {

    /*
    const user = await Parse
        .User
        .logIn(email, password);
    */
    this.logIn(email, password).then(function (user) {
        return user;
    }).catch(function (error) {
        alert(error);
    });
}

async function logout() {
    Parse.User.logOut().then(function () {
        currentUser = Parse.User.current(); // this will now be null
        if (currentUser) {
            console.log("loggedin");
        } else {
            console.log("loggedout");

            window.location.href = 'file:///Users/alexbarrett/Desktop/likemoji%20website%20and%20builder/likemoji%20' + 'builder/buildChannel.html';
        }
    });
}

exports.getUserChannels = getUserChannels;
exports.newUser = newUser;

/***/ }),

/***/ "./src/app/modules/viewcontrol.js":
/*!****************************************!*\
  !*** ./src/app/modules/viewcontrol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['<span />'], ['<span />']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _lighterhtml = lighterhtml,
    render = _lighterhtml.render,
    html = _lighterhtml.html,
    svg = _lighterhtml.svg;

var viewControl = {
    views: []
};

viewControl.add = function (target, source) {
    var key = viewControl.views.find(function (x) {
        return x.target === target;
    });
    if (key) {
        key.source = source;
    } else {
        var viewDef = { target: target, source: source };
        viewControl.views.push(viewDef);
    }
    console.log('added key ' + target);
    render(target, source);
};

viewControl.deleteView = function (target) {
    var key = viewControl.views.find(function (x) {
        return x.target === target;
    });
    if (key) {
        var deleted = viewControl.views.splice(key);
        console.log('deleted view' + target.id);
    }
    render(target, function () {
        return html(_templateObject);
    });
};

viewControl.deleteAll = function () {
    viewControl.views.forEach(function (x) {
        return viewControl.deleteView(x.target);
    });
    //viewControl.views = [];
};

viewControl.update = function () {
    //get object keys
    //find each target or create if not exists??? TODO should we only allow existing elements here?
    //and render them
    //
    var renders = viewControl.views;
    console.log(renders);
    renders.forEach(function (x) {
        return render(x.target, x.source);
    });
};

exports.default = viewControl;

/***/ }),

/***/ "./src/app/views/catLeftView.js":
/*!**************************************!*\
  !*** ./src/app/views/catLeftView.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['<div>\n        <h3>Design & Edit Your Channel</h3>\n        <hr />\n        <div>\n            <ul>\n                <li><h4>Customize the look and feel</h4></li>\n                <li><h4>Drag Likemojis in or out</h4></li>\n                <li><h4>Sort or disable Categories</h4></li>\n            </ul>\n        </div>\n        <hr />\n        <div class="selectDiv text-center">\n            <button\n                id="addHeader"\n                type="button"\n                class="btn btn-default active editor"\n                aria-pressed="true"\n                onclick="', '"\n            >\n                Edit Page\n            </button>\n            <!-- \t<p>Upload header image - (1242px \xD7 704px)</p></center> -->\n        </div>\n        <div class="selectDiv text-center">\n            <button id="addLikemojis" type="button" class="btn btn-default editor"  onclick="', '">\n                Add/Edit Likemojis\n            </button>\n            <!-- <p>Upload likemojis - (324px \xD7 324px)</p></center> -->\n        </div>\n        <div id="categoryEditorButton" class="selectDiv text-center">\n            <button id="addCategories" type="button" class="btn btn-default editor" onclick="', '">\n                Add/Edit Categories\n            </button>\n            <!-- <p>Upload category image - (1242px \xD7 312px)</p></center> -->\n        </div>\n        <div id="afterEditorButton" class="selectDiv text-center">\n            <button id="afterEditing" type="button" class="btn btn-default editor">\n                Next\n            </button>\n            <!-- <p>Upload category image - (1242px \xD7 312px)</p></center> -->\n        </div>\n        <div id="cancelSaveGroup" class="selectDiv text-center" style="display:none">\n            <div class="btn-group " role="group" aria-label="...">\n                <button\n                    id="cancelLikemojiAdd"\n                    type="button"\n                    class="btn btn-danger"\n                    aria-pressed="true"\n                >\n                    cancel\n                </button>\n                <button id="saveLikemojiAdd" type="button" class="btn btn-success active">\n                    save\n                </button>\n            </div>\n            <p>(Save Likemojis to Current View)</p>\n        </div>\n        <div\n            id="phoneDisplayBackButton"\n            class="selectDiv text-center"\n            style="display:none"\n        >\n            <button id="backFromGroup" type="button" class="btn btn-default editorBack">\n                <i class="fas fa-chevron-left"></i> Back\n            </button>\n        </div>\n    </div>'], ['<div>\n        <h3>Design & Edit Your Channel</h3>\n        <hr />\n        <div>\n            <ul>\n                <li><h4>Customize the look and feel</h4></li>\n                <li><h4>Drag Likemojis in or out</h4></li>\n                <li><h4>Sort or disable Categories</h4></li>\n            </ul>\n        </div>\n        <hr />\n        <div class="selectDiv text-center">\n            <button\n                id="addHeader"\n                type="button"\n                class="btn btn-default active editor"\n                aria-pressed="true"\n                onclick="', '"\n            >\n                Edit Page\n            </button>\n            <!-- \t<p>Upload header image - (1242px \xD7 704px)</p></center> -->\n        </div>\n        <div class="selectDiv text-center">\n            <button id="addLikemojis" type="button" class="btn btn-default editor"  onclick="', '">\n                Add/Edit Likemojis\n            </button>\n            <!-- <p>Upload likemojis - (324px \xD7 324px)</p></center> -->\n        </div>\n        <div id="categoryEditorButton" class="selectDiv text-center">\n            <button id="addCategories" type="button" class="btn btn-default editor" onclick="', '">\n                Add/Edit Categories\n            </button>\n            <!-- <p>Upload category image - (1242px \xD7 312px)</p></center> -->\n        </div>\n        <div id="afterEditorButton" class="selectDiv text-center">\n            <button id="afterEditing" type="button" class="btn btn-default editor">\n                Next\n            </button>\n            <!-- <p>Upload category image - (1242px \xD7 312px)</p></center> -->\n        </div>\n        <div id="cancelSaveGroup" class="selectDiv text-center" style="display:none">\n            <div class="btn-group " role="group" aria-label="...">\n                <button\n                    id="cancelLikemojiAdd"\n                    type="button"\n                    class="btn btn-danger"\n                    aria-pressed="true"\n                >\n                    cancel\n                </button>\n                <button id="saveLikemojiAdd" type="button" class="btn btn-success active">\n                    save\n                </button>\n            </div>\n            <p>(Save Likemojis to Current View)</p>\n        </div>\n        <div\n            id="phoneDisplayBackButton"\n            class="selectDiv text-center"\n            style="display:none"\n        >\n            <button id="backFromGroup" type="button" class="btn btn-default editorBack">\n                <i class="fas fa-chevron-left"></i> Back\n            </button>\n        </div>\n    </div>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _lighterhtml = lighterhtml,
    render = _lighterhtml.render,
    html = _lighterhtml.html,
    svg = _lighterhtml.svg;


var catLeftView = function catLeftView(categories) {
    //TODO what is a better way to keep this view from knowing about the other parts of the page
    console.info('rendering catLeftView');
    function togglePanelWithin(panelName, parentName) {
        var panel = void 0,
            parent = void 0;
        panel = document.getElementById(panelName);
        if (panel) {
            parent = document.getElementById(parentName);
            if (parent) {
                for (var i = 0; i < parent.children.length; i++) {
                    parent.children[i].classList.add('hidden');
                }
                panel.classList.remove('hidden');
            } else {
                console.warn('panel ' + parentName + ' not found');
            }
        } else {
            console.warn('panel ' + panelName + ' not found');
        }
    }

    function callCategoriesEditor(e) {
        e.preventDefault();
        togglePanelWithin('panel-categories', 'panel3');
    }

    function callCategoryEditor(e) {
        e.preventDefault();
        togglePanelWithin('panel-editor', 'panel3');
    }

    function callLikemojiEditor(e) {
        e.preventDefault();
        togglePanelWithin('panel-likemojis', 'panel3');
    }

    return html(_templateObject, callCategoryEditor, callLikemojiEditor, callCategoriesEditor);
};

exports.default = catLeftView;

/***/ }),

/***/ "./src/app/views/categoriesEditor.js":
/*!*******************************************!*\
  !*** ./src/app/views/categoriesEditor.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['\n\t<div id="categoriesEditor"\n\t\tclass="editorWindow"\n\t\tondragover="', '"\n\t>\n\t\t<h3>Edit Categories</h3>\n\t\t<hr />\n\t\t<div id="editorContainer" class="image upload">\n\t\t\t<h4 style="display:inline">Click to edit / Drag to reorder:</h4>\n\t\t\t<ul id="categoriesInEditor">\n\t\t\t\t', '\n\t\t\t</ul>\n\t\t</div>\n\t\t<div class="selectDiv text-center">\n\t\t\t<button\n\t\t\t\ttype="button"\n\t\t\t\tid="addNewCategories"\n\t\t\t\tclass="btn btn-default addCategories"\n\t\t\t\tdata-toggle="modal"\n\t\t\t\tdata-target="#addCategoriesModal"\n\t\t\t\t>\n\t\t\t\t<i\n\t\t\t\t\tstyle="font-size: 1.3em; color: white; margin-top: 4px;"\n\t\t\t\t\tclass="far fa-plus-square grow"\n\t\t\t\t></i>\n\t\t\t\tAdd Categories\n\t\t\t</button>\n\t\t</div>\n\t</div>'], ['\n\t<div id="categoriesEditor"\n\t\tclass="editorWindow"\n\t\tondragover="', '"\n\t>\n\t\t<h3>Edit Categories</h3>\n\t\t<hr />\n\t\t<div id="editorContainer" class="image upload">\n\t\t\t<h4 style="display:inline">Click to edit / Drag to reorder:</h4>\n\t\t\t<ul id="categoriesInEditor">\n\t\t\t\t', '\n\t\t\t</ul>\n\t\t</div>\n\t\t<div class="selectDiv text-center">\n\t\t\t<button\n\t\t\t\ttype="button"\n\t\t\t\tid="addNewCategories"\n\t\t\t\tclass="btn btn-default addCategories"\n\t\t\t\tdata-toggle="modal"\n\t\t\t\tdata-target="#addCategoriesModal"\n\t\t\t\t>\n\t\t\t\t<i\n\t\t\t\t\tstyle="font-size: 1.3em; color: white; margin-top: 4px;"\n\t\t\t\t\tclass="far fa-plus-square grow"\n\t\t\t\t></i>\n\t\t\t\tAdd Categories\n\t\t\t</button>\n\t\t</div>\n\t</div>']),
    _templateObject2 = _taggedTemplateLiteral(['<li\n\t\t\t\t\t\t\t\tid="', '"\n\t\t\t\t\t\t\t\tdata-i="', '"\n\t\t\t\t\t\t\t\tdata-toggle="modal"\n\t\t\t\t\t\t\t\tdata-target="#addCategoriesModal"\n\t\t\t\t\t\t\t\tclass="', '"\n\t\t\t\t\t\t\t\tdraggable="true"\n\t\t\t\t\t\t\t\tondragend="', '"\n\t\t\t\t\t\t\t\tondragstart="', '"\n\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<i class="fas fa-sort"></i>\n\t\t\t\t\t\t\t\t<i class="fas fa-edit floatRight"></i>\n\t\t\t\t\t\t\t\t<p class="inlineDisplay">', '</p>\n\t\t\t\t\t\t\t\t<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>\n\t\t\t\t\t\t\t</li>'], ['<li\n\t\t\t\t\t\t\t\tid="', '"\n\t\t\t\t\t\t\t\tdata-i="', '"\n\t\t\t\t\t\t\t\tdata-toggle="modal"\n\t\t\t\t\t\t\t\tdata-target="#addCategoriesModal"\n\t\t\t\t\t\t\t\tclass="', '"\n\t\t\t\t\t\t\t\tdraggable="true"\n\t\t\t\t\t\t\t\tondragend="', '"\n\t\t\t\t\t\t\t\tondragstart="', '"\n\t\t\t\t\t\t\t\t>\n\t\t\t\t\t\t\t\t<i class="fas fa-sort"></i>\n\t\t\t\t\t\t\t\t<i class="fas fa-edit floatRight"></i>\n\t\t\t\t\t\t\t\t<p class="inlineDisplay">', '</p>\n\t\t\t\t\t\t\t\t<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>\n\t\t\t\t\t\t\t</li>']),
    _templateObject3 = _taggedTemplateLiteral([''], ['']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _lighterhtml = lighterhtml,
    render = _lighterhtml.render,
    html = _lighterhtml.html,
    svg = _lighterhtml.svg;

//const categoriesEditorView = categories => {

var categoriesEditorView = function categoriesEditorView(Channel) {
	console.info('rendering categoriesEditorView');
	var selectedItem = void 0;
	var categoriesEditorViewHTML = html(_templateObject, handleDrag, Channel.categories.map(function (cat, index) {
		return cat.attributes.main != 1 ? html(_templateObject2, cat.id + index, cat.id, cat.attributes.disable == 1 ? 'disabledCategory' : 'test', handleDrop, handleDragStart, cat.attributes.name) : html(_templateObject3);
	}));

	function handleDragStart(event) {
		console.info('drag starting');
		event.dataTransfer.setData("text/plain", "Text to drag");
		selectedItem = event.target;
		// set target on start so the dragover listener can handle the swapping
		// firsfox won't give us clientX and clientY on the drag event..just dragover
	}

	function handleDrag(event) {
		console.info('drag happening');
		var list = selectedItem.parentNode,
		    x = event.clientX,
		    y = event.clientY;

		selectedItem.classList.add('drag-sort-active');
		var swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
		// TODO a more functional approach would be to just look at keys being swapped and send them to the model as actions
		if (list === swapItem.parentNode) {
			swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
			list.insertBefore(selectedItem, swapItem);
		}
	}

	async function handleDrop(event) {
		event.target.classList.remove('drag-sort-active');
		await setNewGroupOrder();
		console.info('categories sorted now refresh views');
		// seems we like dom manipulation in page messes up the render cycle
		// so we need to just blank this panel and let it rerender
		var elem = document.getElementById('panel-categories');
		render(elem, function () {
			return html(_templateObject3);
		});
		Channel.updateViews();
	}

	//sets group order to order that was set in the dragable editor
	async function setNewGroupOrder() {
		//user catOrder above to update all groups order
		var catOrder = document.querySelectorAll('#categoriesInEditor li');

		var _loop = function _loop() {
			var thisID = catOrder[i].dataset.i;
			var group = Channel.categories.find(function (x) {
				return x.id === thisID;
			});
			var order = i + 1;
			group.set("order", order);
		};

		for (var i = 0; i < catOrder.length; i++) {
			_loop();
		}
		await Parse.Object.saveAll(Channel.categories);
		Channel.categories.sort(function (a, b) {
			console.info('category array sort element');
			return a.get('order') - b.get('order');
		});
		return;
	}

	console.log(categoriesEditorViewHTML);
	return categoriesEditorViewHTML;
};

exports.default = categoriesEditorView;

/***/ }),

/***/ "./src/app/views/categoryView.js":
/*!***************************************!*\
  !*** ./src/app/views/categoryView.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templateObject = _taggedTemplateLiteral(['<div id="categoryEditor" class="channelEdit">\n\t\t\t<div\n\t\t\t\tid="imageUploaderButtons"\n\t\t\t\tclass="btn-group"\n\t\t\t\trole="group"\n\t\t\t\taria-label="..."\n\t\t\t>\n\t\t\t\t<button\n\t\t\t\t\tid="uploadHeader"\n\t\t\t\t\tclass="btn btn-editorUploadSwitch active"\n\t\t\t\t\tdata-toggle="modal"\n\t\t\t\t\tdata-target="#editheaderModal"\n\t\t\t\t>\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<i\n\t\t\t\t\t\t\tstyle="font-size: 1.3em; color: white;"\n\t\t\t\t\t\t\tclass="fas fa-file-upload"\n\t\t\t\t\t\t></i>\n\t\t\t\t\t\t<h5 style="display:inline">upload</h5>\n\t\t\t\t\t</label>\n\t\t\t\t</button>\n\t\t\t\t<button\n\t\t\t\t\tid="unsplashSearchModal"\n\t\t\t\t\tclass="btn btn-editorUploadSwitch"\n\t\t\t\t\tdata-toggle="modal"\n\t\t\t\t\tdata-target="#unsplashModal"\n\t\t\t\t>\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<i\n\t\t\t\t\t\t\tstyle="font-size: 1.3em; color: white;"\n\t\t\t\t\t\t\tclass="fas fa-camera"\n\t\t\t\t\t\t></i>\n\t\t\t\t\t\t<h5 style="display:inline">unsplash</h5>\n\t\t\t\t\t</label>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<br />\n\t\t\t<p>Name: ', '</p>\n\t\t\t<label for="editorCallOut">Call to Action:</label>\n\t\t\t<div class="input-group">\n\t\t\t\t<input\n\t\t\t\t\ttype="text"\n\t\t\t\t\tclass="form-control"\n\t\t\t\t\tid="editorCallOut"\n\t\t\t\t\tplaceholder="Let us know how we\'re doing..."\n\t\t\t\t\tvalue="', '"\n\t\t\t\t/>\n\t\t\t\t<div class="input-group-btn">\n\t\t\t\t\t<button\n\t\t\t\t\t\tid="callToActionSave"\n\t\t\t\t\t\tclass="btn btn-callToAction"\n\t\t\t\t\t\ttype="button"\n\t\t\t\t\t\tonclick=', '\n\t\t\t\t\t>\n\t\t\t\t\t\tsave\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<br />\n\n\t\t\t<div class="btn-group" role="group" aria-label="...">\n\t\t\t\t<button\n\t\t\t\t\tid=""\n\t\t\t\t\ttype="button"\n\t\t\t\t\tclass="btn btn-likemojiSwitch"\n\t\t\t\t\taria-pressed="true"\n\t\t\t\t>\n\t\t\t\t\tOff\n\t\t\t\t</button>\n\t\t\t\t<button id="" type="button" class="btn btn-likemojiSwitch active">\n\t\t\t\t\tOn\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<label> - Likemojis Outline Stroke</label> <br />\n\t\t\t<br />\n\t\t\t<button id="editTheme" class="btn btn-editTheme" onclick="', '">\n\t\t\t\t<label>\n\t\t\t\t\t<i\n\t\t\t\t\t\tclass="fas fa-edit"\n\t\t\t\t\t\tstyle="font-size: 1.3em; display:inline"\n\t\t\t\t\t></i>\n\t\t\t\t\t<h5 style="display:inline">Edit</h5>\n\t\t\t\t</label>\n\t\t\t</button>\n\t\t\t<label> - Edit Theme (Color / Font)</label> <br />\n\t\t\t<br />\n\t\t\t<button id="editExtendedInfo" class="btn btn-editTheme" onclick=', '>\n\t\t\t\t<label>\n\t\t\t\t\t<i\n\t\t\t\t\t\tclass="fas fa-save"\n\t\t\t\t\t\tstyle="font-size: 1.3em; display:inline"\n\t\t\t\t\t></i>\n\t\t\t\t\t<h5 style="display:inline">Save</h5>\n\t\t\t\t</label>\n\t\t\t</button>\n\t\t\t<label style="display:inline" for="categoryExtendedInfo"\n\t\t\t\t>- Info Text:\n\t\t\t\t<i style="display:inline" class="fas fa-info-circle"></i\n\t\t\t></label>\n\t\t\t<div class="form-group infoDiv">\n\t\t\t\t<textarea\n\t\t\t\t\tid="categoryExtendedInfo"\n\t\t\t\t\tclass="form-control infoTextField"\n\t\t\t\t\trows="5"\n\t\t\t\t\tplaceholder="Here at XYZ Corp, We know that want to put your experience first..."\n\t\t\t\t\tvalue="', '"\n\t\t\t\t>\n\t\t\t\t</textarea>\n\t\t\t</div>\n\t\t</div>\n\t</div>'], ['<div id="categoryEditor" class="channelEdit">\n\t\t\t<div\n\t\t\t\tid="imageUploaderButtons"\n\t\t\t\tclass="btn-group"\n\t\t\t\trole="group"\n\t\t\t\taria-label="..."\n\t\t\t>\n\t\t\t\t<button\n\t\t\t\t\tid="uploadHeader"\n\t\t\t\t\tclass="btn btn-editorUploadSwitch active"\n\t\t\t\t\tdata-toggle="modal"\n\t\t\t\t\tdata-target="#editheaderModal"\n\t\t\t\t>\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<i\n\t\t\t\t\t\t\tstyle="font-size: 1.3em; color: white;"\n\t\t\t\t\t\t\tclass="fas fa-file-upload"\n\t\t\t\t\t\t></i>\n\t\t\t\t\t\t<h5 style="display:inline">upload</h5>\n\t\t\t\t\t</label>\n\t\t\t\t</button>\n\t\t\t\t<button\n\t\t\t\t\tid="unsplashSearchModal"\n\t\t\t\t\tclass="btn btn-editorUploadSwitch"\n\t\t\t\t\tdata-toggle="modal"\n\t\t\t\t\tdata-target="#unsplashModal"\n\t\t\t\t>\n\t\t\t\t\t<label>\n\t\t\t\t\t\t<i\n\t\t\t\t\t\t\tstyle="font-size: 1.3em; color: white;"\n\t\t\t\t\t\t\tclass="fas fa-camera"\n\t\t\t\t\t\t></i>\n\t\t\t\t\t\t<h5 style="display:inline">unsplash</h5>\n\t\t\t\t\t</label>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<br />\n\t\t\t<p>Name: ', '</p>\n\t\t\t<label for="editorCallOut">Call to Action:</label>\n\t\t\t<div class="input-group">\n\t\t\t\t<input\n\t\t\t\t\ttype="text"\n\t\t\t\t\tclass="form-control"\n\t\t\t\t\tid="editorCallOut"\n\t\t\t\t\tplaceholder="Let us know how we\'re doing..."\n\t\t\t\t\tvalue="', '"\n\t\t\t\t/>\n\t\t\t\t<div class="input-group-btn">\n\t\t\t\t\t<button\n\t\t\t\t\t\tid="callToActionSave"\n\t\t\t\t\t\tclass="btn btn-callToAction"\n\t\t\t\t\t\ttype="button"\n\t\t\t\t\t\tonclick=', '\n\t\t\t\t\t>\n\t\t\t\t\t\tsave\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<br />\n\n\t\t\t<div class="btn-group" role="group" aria-label="...">\n\t\t\t\t<button\n\t\t\t\t\tid=""\n\t\t\t\t\ttype="button"\n\t\t\t\t\tclass="btn btn-likemojiSwitch"\n\t\t\t\t\taria-pressed="true"\n\t\t\t\t>\n\t\t\t\t\tOff\n\t\t\t\t</button>\n\t\t\t\t<button id="" type="button" class="btn btn-likemojiSwitch active">\n\t\t\t\t\tOn\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<label> - Likemojis Outline Stroke</label> <br />\n\t\t\t<br />\n\t\t\t<button id="editTheme" class="btn btn-editTheme" onclick="', '">\n\t\t\t\t<label>\n\t\t\t\t\t<i\n\t\t\t\t\t\tclass="fas fa-edit"\n\t\t\t\t\t\tstyle="font-size: 1.3em; display:inline"\n\t\t\t\t\t></i>\n\t\t\t\t\t<h5 style="display:inline">Edit</h5>\n\t\t\t\t</label>\n\t\t\t</button>\n\t\t\t<label> - Edit Theme (Color / Font)</label> <br />\n\t\t\t<br />\n\t\t\t<button id="editExtendedInfo" class="btn btn-editTheme" onclick=', '>\n\t\t\t\t<label>\n\t\t\t\t\t<i\n\t\t\t\t\t\tclass="fas fa-save"\n\t\t\t\t\t\tstyle="font-size: 1.3em; display:inline"\n\t\t\t\t\t></i>\n\t\t\t\t\t<h5 style="display:inline">Save</h5>\n\t\t\t\t</label>\n\t\t\t</button>\n\t\t\t<label style="display:inline" for="categoryExtendedInfo"\n\t\t\t\t>- Info Text:\n\t\t\t\t<i style="display:inline" class="fas fa-info-circle"></i\n\t\t\t></label>\n\t\t\t<div class="form-group infoDiv">\n\t\t\t\t<textarea\n\t\t\t\t\tid="categoryExtendedInfo"\n\t\t\t\t\tclass="form-control infoTextField"\n\t\t\t\t\trows="5"\n\t\t\t\t\tplaceholder="Here at XYZ Corp, We know that want to put your experience first..."\n\t\t\t\t\tvalue="', '"\n\t\t\t\t>\n\t\t\t\t</textarea>\n\t\t\t</div>\n\t\t</div>\n\t</div>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _lighterhtml = lighterhtml,
    render = _lighterhtml.render,
    html = _lighterhtml.html,
    svg = _lighterhtml.svg;

//const categoryEditorView = (category) => {

var categoryEditorView = function categoryEditorView(Channel) {
	console.info('rendering categoryEditorView');
	var category = Channel.selectedCategory;
	var callOut = category.attributes.callOuts.en;
	var description = void 0;
	try {
		description = category.attributes.descriptions.en;
	} catch (e) {
		description = '';
	}

	console.info('description = ' + description);
	async function saveCallToAction(e) {
		var callOutText = document.getElementById("editorCallOut").value;
		var callOutsObject = {
			en: callOutText
		};
		//TODO check if this is a change before wasting effort to call Parse
		category.set("callOuts", callOutsObject);
		category.save().then(function (group) {
			//rerender the phone
			Channel.updateViews();
		}, function (error) {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		});
	};

	async function saveExtendedInfo(e) {
		var extendedInfoText = document.getElementById('categoryExtendedInfo').value;
		var extenedInfoObject = { en: extendedInfoText };
		category.set("descriptions", extenedInfoObject);
		category.save().then(function (group) {
			// Execute any logic that should take place after the object is saved.
		}, function (error) {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		});
	};

	var categoryEditorViewHTML = html(_templateObject, category.attributes.name, callOut, saveCallToAction, callStyleEditor, saveExtendedInfo, description);

	function callStyleEditor(e) {
		e.preventDefault();
		togglePanelWithin('panel-style-editor', 'panel3');
	}

	return categoryEditorViewHTML;
};

function togglePanelWithin(panelName, parentName) {
	var panel = void 0,
	    parent = void 0;
	panel = document.getElementById(panelName);
	if (panel) {
		parent = document.getElementById(parentName);
		if (parent) {
			for (var i = 0; i < parent.children.length; i++) {
				parent.children[i].classList.add('hidden');
			}
			panel.classList.remove('hidden');
		} else {
			console.warn('panel ' + parentName + ' not found');
		}
	} else {
		console.warn('panel ' + panelName + ' not found');
	}
}

exports.default = categoryEditorView;

/***/ }),

/***/ "./src/app/views/likemojisListView.js":
/*!********************************************!*\
  !*** ./src/app/views/likemojisListView.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['<div\n            class="likemojis containerLikemojis ui-draggable ui-draggable-handle"\n            id="', '"\n            data-toggle="modal"\n            data-target="#editLikemojisModal"\n            draggable="true"\n            ondragstart="', '"\n        >\n            <img\n                src="', '"\n                class="likemojiImages grow"\n            />\n            <div class="likemojiNames">', '</div>\n        </div>'], ['<div\n            class="likemojis containerLikemojis ui-draggable ui-draggable-handle"\n            id="', '"\n            data-toggle="modal"\n            data-target="#editLikemojisModal"\n            draggable="true"\n            ondragstart="', '"\n        >\n            <img\n                src="', '"\n                class="likemojiImages grow"\n            />\n            <div class="likemojiNames">', '</div>\n        </div>']),
    _templateObject2 = _taggedTemplateLiteral(['<div id="likemojisEditor" class="editorWindow" style="display: block;">\n        <h3>Edit Likemojis</h3>\n        <hr/>\n        <div\n            id="likemojisContainer"\n            class="scroll likemojisContainer-area dynamicAreaOverflow ui-droppable"\n            ondragenter="', '"\n            ondragover="', '"\n            ondrop="', '"\n        >\n            ', '\n        </div>\n        <div class="selectDiv text-center" data-toggle="modal" data-target="#addLikemojisModal">\n\t\t\t<button type="button"  id="addLikemojisModalButton" class="btn btn-default addLikemojis containerLikemojis"><i style="font-size: 1.3em; color: white; margin-top: 4px;" class="far fa-plus-square grow"></i> Add Likemojis</button>\n        </div>\n    </div>'], ['<div id="likemojisEditor" class="editorWindow" style="display: block;">\n        <h3>Edit Likemojis</h3>\n        <hr/>\n        <div\n            id="likemojisContainer"\n            class="scroll likemojisContainer-area dynamicAreaOverflow ui-droppable"\n            ondragenter="', '"\n            ondragover="', '"\n            ondrop="', '"\n        >\n            ', '\n        </div>\n        <div class="selectDiv text-center" data-toggle="modal" data-target="#addLikemojisModal">\n\t\t\t<button type="button"  id="addLikemojisModalButton" class="btn btn-default addLikemojis containerLikemojis"><i style="font-size: 1.3em; color: white; margin-top: 4px;" class="far fa-plus-square grow"></i> Add Likemojis</button>\n        </div>\n    </div>']);

var _phoneView = __webpack_require__(/*! ./phoneView.js */ "./src/app/views/phoneView.js");

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _lighterhtml = lighterhtml,
    render = _lighterhtml.render,
    html = _lighterhtml.html,
    svg = _lighterhtml.svg;

//const likemojisListView = (likemojis) => {

var likemojisListView = function likemojisListView(Channel) {
    console.info('rendering likemojisListView');
    var panel2 = document.getElementById("panel2");
    function dragMoji(e) {
        e.dataTransfer.setData('Text', e.currentTarget.id + ',add');
    }

    function handleDrop(e) {
        e.preventDefault();
        // find object dropped..get the id
        //alert('droped moji with id: ' + e.dataTransfer.getData('Text'));
        var mojiID = e.dataTransfer.getData('Text');
        // storing data in drag event as "ID,add" or "ID,remove"
        var dropEvent = e.dataTransfer.getData('Text').split(',');
        if (dropEvent[1] === 'remove') {
            // add it
            Channel.removeCategoryLikemoji(Channel.selectedCategory, dropEvent[0]).then(render(panel2, function () {
                return (0, _phoneView.phoneView)(Channel);
            }));
        }
    }

    function dragover(e) {
        e.preventDefault();
    }

    function dragenter(e) {
        e.preventDefault();
    }

    var likemojiView = function likemojiView(likemoji) {
        var likemojiViewHTML = html(_templateObject, likemoji.id, dragMoji, likemoji.attributes.x3.url(), likemoji.attributes.names.en);

        //console.log(likemojiViewHTML);
        return likemojiViewHTML;
    };

    var likemojisListViewHTML = html(_templateObject2, dragenter, dragover, handleDrop, Channel.likemojis.map(function (moji) {
        return likemojiView(moji);
    }));

    return likemojisListViewHTML;
};

exports.default = likemojisListView;

/***/ }),

/***/ "./src/app/views/loginForm.js":
/*!************************************!*\
  !*** ./src/app/views/loginForm.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["<h2>Login to your account</h2>\n    <form id=\"loginForm\" class=\"form\">\n        <div class=\"form-group\" id=\"emaildiv\">\n            <label for=\"emailSignup\">email</label>\n            <input type=\"email\" class=\"form-control\" id=\"loginEmail\" placeholder=\"enter your email here\">\n        </div>\n        <div class=\"form-group\" id=\"passworddiv\">\n            <label for=\"passwordSignup\">password</label>\n            <input type=\"password\" class=\"form-control\" id=\"loginPassword\" placeholder=\"enter your password here\"></div>\n        <button id=\"loginUser\" type=\"button\" class=\"btn btn-default\">\n            Login\n        </button>\n    </form>"], ["<h2>Login to your account</h2>\n    <form id=\"loginForm\" class=\"form\">\n        <div class=\"form-group\" id=\"emaildiv\">\n            <label for=\"emailSignup\">email</label>\n            <input type=\"email\" class=\"form-control\" id=\"loginEmail\" placeholder=\"enter your email here\">\n        </div>\n        <div class=\"form-group\" id=\"passworddiv\">\n            <label for=\"passwordSignup\">password</label>\n            <input type=\"password\" class=\"form-control\" id=\"loginPassword\" placeholder=\"enter your password here\"></div>\n        <button id=\"loginUser\" type=\"button\" class=\"btn btn-default\">\n            Login\n        </button>\n    </form>"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _lighterhtml = lighterhtml,
    render = _lighterhtml.render,
    html = _lighterhtml.html,
    svg = _lighterhtml.svg;


function loginForm() {
    var form = html(_templateObject);
    return form;
}

exports.default = loginForm;

/***/ }),

/***/ "./src/app/views/phoneView.js":
/*!************************************!*\
  !*** ./src/app/views/phoneView.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['<div id="likemojiGroupCollection"\n                class="', '">\n                  ', '\n            </div>'], ['<div id="likemojiGroupCollection"\n                class="', '">\n                  ', '\n            </div>']),
    _templateObject2 = _taggedTemplateLiteral(['<h4 id="dragLikemojisPrompt" class="dragLikemojisPrompt" style="display:none">Add Likemojis Here!</h4>'], ['<h4 id="dragLikemojisPrompt" class="dragLikemojisPrompt" style="display:none">Add Likemojis Here!</h4>']),
    _templateObject3 = _taggedTemplateLiteral(['<div id=\'phone-view\' class="col-lg-4 channelEdit">\n        <div class="phone" id="phoneView">\n            <img class="phone" src="assets/iPhone_7_front_frame sized.png" />\n            <div id="phoneDisplay" class="phoneDisplay-area">\n                <div id="buildHeader" class="header text-white">\n                    <img id="docHeaderImage" class="header"\n                        src="', '" />\n                </div>\n                <div id="callout" class="callout channelText">\n                    ', '\n                </div>\n                <div class="phoneDisplayDynamicArea scroll dynamicAreaOverflow"\n                    ondragenter="', '"\n                    ondragover="', '"\n                    ondrop="', '"\n                >\n                    ', '\n                    ', '\n                </div>\n                ', '\n            </div>\n        </div>\n    </div>'], ['<div id=\'phone-view\' class="col-lg-4 channelEdit">\n        <div class="phone" id="phoneView">\n            <img class="phone" src="assets/iPhone_7_front_frame sized.png" />\n            <div id="phoneDisplay" class="phoneDisplay-area">\n                <div id="buildHeader" class="header text-white">\n                    <img id="docHeaderImage" class="header"\n                        src="', '" />\n                </div>\n                <div id="callout" class="callout channelText">\n                    ', '\n                </div>\n                <div class="phoneDisplayDynamicArea scroll dynamicAreaOverflow"\n                    ondragenter="', '"\n                    ondragover="', '"\n                    ondrop="', '"\n                >\n                    ', '\n                    ', '\n                </div>\n                ', '\n            </div>\n        </div>\n    </div>']),
    _templateObject4 = _taggedTemplateLiteral(['<span></span>'], ['<span></span>']),
    _templateObject5 = _taggedTemplateLiteral(['<div\n    id="navBar"\n    class="navBar"\n    style="background-color: rgb(24, 49, 103);"\n    >\n        <div id="homeNavButton"\n            class="navIcons"\n            style="display:inline">\n            <i\n                style="font-size: 1.3em; color: rgb(52, 255, 86);"\n                class="fas fa-home activeNavIcon"\n                onclick="', '"\n                ></i>\n        </div>\n        <div id="inboxNavButton" class="navIcons" style="display:inline">\n            <i\n                style="font-size: 1.3em; color: white;"\n                class="far fa-envelope"\n            ></i>\n        </div>\n        <div id="profileNavButton" class="navIcons" style="display:inline">\n            <i style="font-size: 1.3em; color: white;" class="fas fa-user"></i>\n        </div>\n    </div>'], ['<div\n    id="navBar"\n    class="navBar"\n    style="background-color: rgb(24, 49, 103);"\n    >\n        <div id="homeNavButton"\n            class="navIcons"\n            style="display:inline">\n            <i\n                style="font-size: 1.3em; color: rgb(52, 255, 86);"\n                class="fas fa-home activeNavIcon"\n                onclick="', '"\n                ></i>\n        </div>\n        <div id="inboxNavButton" class="navIcons" style="display:inline">\n            <i\n                style="font-size: 1.3em; color: white;"\n                class="far fa-envelope"\n            ></i>\n        </div>\n        <div id="profileNavButton" class="navIcons" style="display:inline">\n            <i style="font-size: 1.3em; color: white;" class="fas fa-user"></i>\n        </div>\n    </div>']),
    _templateObject6 = _taggedTemplateLiteral(['<div\n        class="containerLikemojis likemojis ui-draggable ui-draggable-handle"\n        draggable="true"\n        id="', '"\n        draggable="true"\n        ondragstart="', '"\n    >\n        <img\n            src="', '"\n            class="likemojiImages"/>\n        <div\n            class="likemojiNames channelText"\n            style="color: rgb(52, 255, 86);">\n            ', '\n        </div>\n    </div>'], ['<div\n        class="containerLikemojis likemojis ui-draggable ui-draggable-handle"\n        draggable="true"\n        id="', '"\n        draggable="true"\n        ondragstart="', '"\n    >\n        <img\n            src="', '"\n            class="likemojiImages"/>\n        <div\n            class="likemojiNames channelText"\n            style="color: rgb(52, 255, 86);">\n            ', '\n        </div>\n    </div>']),
    _templateObject7 = _taggedTemplateLiteral(['<div class="category"\n        type="button"\n        id="', '"\n        data-i="', '"\n        onclick="', '">\n        <img\n            src="', '"\n            width="100%"\n            height="auto"/>\n        <p class="categorytxt" style="color: rgb(255, 255, 255);">\n            ', '\n        </p>\n    </div>'], ['<div class="category"\n        type="button"\n        id="', '"\n        data-i="', '"\n        onclick="', '">\n        <img\n            src="', '"\n            width="100%"\n            height="auto"/>\n        <p class="categorytxt" style="color: rgb(255, 255, 255);">\n            ', '\n        </p>\n    </div>']),
    _templateObject8 = _taggedTemplateLiteral(['<div id="categories" class="categories">\n            ', '\n      </div>'], ['<div id="categories" class="categories">\n            ', '\n      </div>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//import {render, html} from '//unpkg.com/lighterhtml?module';
var _lighterhtml = lighterhtml,
    render = _lighterhtml.render,
    html = _lighterhtml.html,
    svg = _lighterhtml.svg;

/* Main structure of the phone panel
|phone
|-category
|--header
|--callout
|--likemojis
|---likemoji list
|---other categories
|-navbar
*/

// phone function returns all the HTML for displaying the phone widget with the
// data for an org set to be selected for the given "category" parameter
// category is a Group object from Parse

var phone = async function phone(Channel, selectedCategoryID) {
    if (!selectedCategoryID) {
        selectedCategoryID = Channel.main;
    }
    return (/*await*/phoneView(Channel, selectedCategoryID)
    );
};

//const phoneView = (category, categories, categoryLikemojis) => {
//const phoneView = (props) => {
var phoneView = function phoneView(Channel) {
    console.info('rendering phoneView');
    var orgID = Channel.channelID; //category.attributes.organizationID;
    var panel2 = document.getElementById("panel2");
    var category = Channel.selectedCategory || Channel.mainCategory;
    console.info('selected category id: ' + category.id);
    var likemojisView = function likemojisView(likemojis) {
        var mainPageClass = 'likemojiGroupCollection-area';
        if (category.attributes.main == 1) {
            mainPageClass = mainPageClass + ' mainpageLikemojis';
        }
        var mojiHtml = html(_templateObject, mainPageClass, likemojis ? likemojis.map(function (moji) {
            return likemojiView(moji);
        }) : html(_templateObject2));

        return mojiHtml;
    };

    var phoneHTML = html(_templateObject3, category.attributes.newHeader.url(), category.attributes.callOuts.en, dragenter, dragover, handleDrop, likemojisView(Channel.catLikemojis(category)), category.attributes.main == 1 ? categoriesSubView(Channel.categories) : html(_templateObject4), phoneNavBarView(Channel));
    function handleDrop(e) {
        e.preventDefault();
        // find object dropped..get the id
        //alert('droped moji with id: ' + e.dataTransfer.getData('Text'));
        // storing data in drag event as "ID,add" or "ID,remove"
        var dropEvent = e.dataTransfer.getData('Text').split(',');
        if (dropEvent[1] === 'add') {
            // add it
            Channel.addCategoryLikemoji(category, dropEvent[0]).then(render(panel2, function () {
                return phoneView(Channel);
            }));
        }
    }

    function dragover(e) {
        e.preventDefault();
    }

    function dragenter(e) {
        e.preventDefault();
    }

    console.log(phoneHTML);
    //let phoneView = html`<div id='phone-view' class="col-lg-4 channelEdit">${phoneHTML}</div>`;
    return phoneHTML;
};

var phoneNavBarView = function phoneNavBarView(Channel) {
    function homeClick() {
        phoneHome(Channel);
    }

    async function phoneHome(Channel) {
        Channel.selectedCategory = Channel.mainCategory;
        //let category = getMainCategory(categories);
        //let categoryLikemojis = await getCategoryLikemojis(category);
        //TODO decide to render our route here
        //TODO can we just refer to this views parent (<div id="phoneView">.parent)?
        var panel2 = document.getElementById("panel2");
        var panel3 = document.getElementById("panel3");

        //panel2.innerHTML = '';
        //render(panel2, function () { return phoneView(Channel)});
        var route = "/channel/" + channelID + "/view";
        //page(route);
        page.redirect(route);
    }
    var channelID = Channel.channelID;
    var navHTML = html(_templateObject5, homeClick);
    return navHTML;
};

var likemojiView = function likemojiView(likemoji) {

    function dragMoji(e) {
        e.dataTransfer.setData('Text', e.currentTarget.id + ',remove');
    }

    var likemojiViewHTML = html(_templateObject6, likemoji.id, dragMoji, likemoji.attributes.x3.url(), likemoji.attributes.names.en);

    //console.log(likemojiViewHTML);
    return likemojiViewHTML;
};

var categoryView = function categoryView(category, skipMain) {
    var orgID = category.attributes.organizationID;
    /* simple pattern for click handlers
    define a function that takes (e) as parameter
    --- function myClicker(e) {
    inside function find the target and the id data attribute
    --- let targetID = e.currentTarget.dataset.i;
    --- execute something
    then define onclick and data-i attribute
    --- <a data-i=${i.id} onclick="${myClicker}">
    */
    function selectCategory(e) {
        var targetID = e.currentTarget.dataset.i;
        page.redirect('/channel/' + orgID + '/view/' + targetID);
        //Channel.selectedCategoryID = targetID;
        //let panel2 = document.getElementById("panel2");
        //render(panel2, function () { return phoneView(Channel)});
    }

    if (skipMain) {
        if (category.attributes.main == 1) return html(_templateObject4);
    }
    var imgSrc = category.attributes.newCategoryImage ? category.attributes.newCategoryImage.url() : category.attributes.newHeader.url();
    var catName = category.attributes.name;
    var catID = category.id;

    var categoryViewHTML = html(_templateObject7, catID, catID, selectCategory, imgSrc, catName);

    //console.log(categoryViewHTML);
    return categoryViewHTML;
};

var categoriesSubView = function categoriesSubView(cats) {
    console.log('composing categoriesSubView');
    return html(_templateObject8, cats.map(function (cat) {
        if (cat.attributes.disable !== 1) {
            return categoryView(cat, true);
        } else {
            return html(_templateObject4);
        }
    }));
};

var getCategoryLikemojis = async function getCategoryLikemojis(category) {
    var IDs = category.attributes.likemojis;
    var likemojis = [];
    if (IDs.length > 0) {
        likemojis = await getLikemojisByID(IDs);
    }
    return likemojis;
};

// returns likemojis sorted by name from a list of ids useful for getting the
// mojis of the given category (group)
async function getLikemojisByID(likemojiIDs) {
    var query = new Parse.Query("Likemoji");
    query.containedIn("objectId", likemojiIDs);
    query.ascending("name");
    try {
        return await query.find();
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

exports.phone = phone;
exports.phoneView = phoneView;
exports.getCategoryLikemojis = getCategoryLikemojis;

/***/ }),

/***/ "./src/app/views/signupForm.js":
/*!*************************************!*\
  !*** ./src/app/views/signupForm.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _templateObject = _taggedTemplateLiteral(["<div>\n    <form id=\"signUpForm\" class=\"form\">\n\t\t<h2>Create Your Account</h2>\n\t\t<div class=\"form-group\" id=\"emaildiv\">\n\t\t\t<label for=\"emailSignup\">email</label>\n\t\t\t<input type=\"email\" class=\"form-control\" id=\"inputEmail\" placeholder=\"enter your email here\">\n\t\t</div>\n\t\t<div class=\"form-group\" id=\"passworddiv\">\n\t\t\t<label for=\"passwordSignup\">password</label>\n\t\t\t<input type=\"password\" class=\"form-control\" id=\"inputPassword\" placeholder=\"create your password here\">\n\t\t</div>\n\t\t<div class=\"form-group\" id=\"organizationdiv\">\n\t\t\t\t<label for=\"organizationSignup\">Organization Name</label>\n                <input type=\"text\"\n                    class=\"form-control\"\n                    id=\"inputOrganization\"\n                    placeholder=\"organization name\"\n                >\n\t\t</div>\n        <button id=\"signUpUser2\" type=\"button\" class=\"btn btn-default\">Start</button>\n    </form>\n    </div>"], ["<div>\n    <form id=\"signUpForm\" class=\"form\">\n\t\t<h2>Create Your Account</h2>\n\t\t<div class=\"form-group\" id=\"emaildiv\">\n\t\t\t<label for=\"emailSignup\">email</label>\n\t\t\t<input type=\"email\" class=\"form-control\" id=\"inputEmail\" placeholder=\"enter your email here\">\n\t\t</div>\n\t\t<div class=\"form-group\" id=\"passworddiv\">\n\t\t\t<label for=\"passwordSignup\">password</label>\n\t\t\t<input type=\"password\" class=\"form-control\" id=\"inputPassword\" placeholder=\"create your password here\">\n\t\t</div>\n\t\t<div class=\"form-group\" id=\"organizationdiv\">\n\t\t\t\t<label for=\"organizationSignup\">Organization Name</label>\n                <input type=\"text\"\n                    class=\"form-control\"\n                    id=\"inputOrganization\"\n                    placeholder=\"organization name\"\n                >\n\t\t</div>\n        <button id=\"signUpUser2\" type=\"button\" class=\"btn btn-default\">Start</button>\n    </form>\n    </div>"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _lighterhtml = lighterhtml,
    render = _lighterhtml.render,
    html = _lighterhtml.html,
    svg = _lighterhtml.svg;

function signUpForm() {
				var form = html(_templateObject);

				return form;
}
exports.default = signUpForm;

/***/ }),

/***/ "./src/app/views/styleEditorView.js":
/*!******************************************!*\
  !*** ./src/app/views/styleEditorView.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(["<div id=\"colorThemeEditor\" class=\"editorWindow\">\n            <div id=\"themeContainer\">\n                <h4 style=\"display:inline\">Edit Theme (Color / Font):</h4>\n                <br>\n                <br>\n                <div class=\"form-group\">\n                    <input id=\"backgroundColor\" class=\"", "\"\n                        data-attr=\"generalColor\"\n                        value=\"", "\"\n                        onchange=", "\n                    >\n                    <label for=\"backgroundColor\">&nbsp;-&nbsp;Background</label>\n                </div>\n                <div class=\"form-group\">\n                    <input id=\"textColor\" class=\"", "\"\n                        data-attr=\"generalTextColor\"\n                        value=\"", "\"\n                        onchange=", "\n                        >\n                    <label for=\"textColor\"> - Text</label>\n                </div>\n                <div class=\"form-group\">\n                    <input id=\"catTextColor\" class=\"", "\"\n                        data-attr=\"categoryTextColor\"\n                        value=\"", "\"\n                        onchange=", "\n                    >\n                    <label for=\"catTextColor\"> - Category Label Text</label>\n                </div>\n                <div class=\"form-group\">\n                    <input id=\"navColor\" class=\"", "\"\n                        data-attr=\"tabBar starColor navButtonColor\"\n                        value=\"", "\"\n                        onchange=", "\n                    >\n                    <label for=\"navColor\"> - NavBar / Buttons / Stars</label>\n                </div>\n                <div class=\"form-group\">\n                    <input id=\"activeNav\" class=\"", "\"\n                        data-attr=\"tabBarSelected\"\n                        value=\"", "\"\n                        onchange=", "\n                    >\n                    <label for=\"activeNav\"> - Active Nav Button</label>\n                </div>\n            </div>\n        </div>\n        <div id=\"themeSaveButtons\" class=\"btn-group themeSaveButtons\" role=\"group\" aria-label=\"...\">\n            <button id=\"editorThemeCancel\" class=\"btn btn-editorThemeSave\" onclick=\"", "\">\n                <label for=\"themeCancel\">\n                    <i style=\"font-size: 1.3em; color: white;\" class=\"fas fa-ban\"></i>\n                    <h5 style=\"display:inline\">cancel</h5>\n                </label>\n            </button>\n            <button id=\"editorThemeSave\"\n                class=\"btn btn-editorThemeSave active\"\n                onclick=\"", "\"\n            >\n                <label>\n                        <i style=\"font-size: 1.3em; color: white;\" class=\"fas fa-save\"></i>\n                        <h5 style=\"display:inline\">save</h5>\n                </label>\n            </button>\n        </div>\n        <script>jscolor.installByClassName(\"jscolor\");</script>\n        "], ["<div id=\"colorThemeEditor\" class=\"editorWindow\">\n            <div id=\"themeContainer\">\n                <h4 style=\"display:inline\">Edit Theme (Color / Font):</h4>\n                <br>\n                <br>\n                <div class=\"form-group\">\n                    <input id=\"backgroundColor\" class=\"", "\"\n                        data-attr=\"generalColor\"\n                        value=\"", "\"\n                        onchange=", "\n                    >\n                    <label for=\"backgroundColor\">&nbsp;-&nbsp;Background</label>\n                </div>\n                <div class=\"form-group\">\n                    <input id=\"textColor\" class=\"", "\"\n                        data-attr=\"generalTextColor\"\n                        value=\"", "\"\n                        onchange=", "\n                        >\n                    <label for=\"textColor\"> - Text</label>\n                </div>\n                <div class=\"form-group\">\n                    <input id=\"catTextColor\" class=\"", "\"\n                        data-attr=\"categoryTextColor\"\n                        value=\"", "\"\n                        onchange=", "\n                    >\n                    <label for=\"catTextColor\"> - Category Label Text</label>\n                </div>\n                <div class=\"form-group\">\n                    <input id=\"navColor\" class=\"", "\"\n                        data-attr=\"tabBar starColor navButtonColor\"\n                        value=\"", "\"\n                        onchange=", "\n                    >\n                    <label for=\"navColor\"> - NavBar / Buttons / Stars</label>\n                </div>\n                <div class=\"form-group\">\n                    <input id=\"activeNav\" class=\"", "\"\n                        data-attr=\"tabBarSelected\"\n                        value=\"", "\"\n                        onchange=", "\n                    >\n                    <label for=\"activeNav\"> - Active Nav Button</label>\n                </div>\n            </div>\n        </div>\n        <div id=\"themeSaveButtons\" class=\"btn-group themeSaveButtons\" role=\"group\" aria-label=\"...\">\n            <button id=\"editorThemeCancel\" class=\"btn btn-editorThemeSave\" onclick=\"", "\">\n                <label for=\"themeCancel\">\n                    <i style=\"font-size: 1.3em; color: white;\" class=\"fas fa-ban\"></i>\n                    <h5 style=\"display:inline\">cancel</h5>\n                </label>\n            </button>\n            <button id=\"editorThemeSave\"\n                class=\"btn btn-editorThemeSave active\"\n                onclick=\"", "\"\n            >\n                <label>\n                        <i style=\"font-size: 1.3em; color: white;\" class=\"fas fa-save\"></i>\n                        <h5 style=\"display:inline\">save</h5>\n                </label>\n            </button>\n        </div>\n        <script>jscolor.installByClassName(\"jscolor\");</script>\n        "]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _lighterhtml = lighterhtml,
    render = _lighterhtml.render,
    html = _lighterhtml.html,
    svg = _lighterhtml.svg;


function styleEditorView(Channel) {
    console.info('rendering stlyeEditorView');
    var style = Channel.channelStyle;
    var jscolor = "jscolor {position:'right',\n    borderColor:'#FFF #666 #666 #FFF',\n    insetColor:'#666 #FFF #FFF #666',\n    backgroundColor:'#CCC'}";

    var editorView = html(_templateObject, jscolor, style.get("generalColor"), setTemp, jscolor, style.get("generalTextColor"), setTemp, jscolor, style.get("categoryTextColor"), setTemp, jscolor, style.get("tabBar"), setTemp, jscolor, style.get("tabBarSelected"), setTemp, closeStyleEditor, saveStyle);

    function setTemp(e) {
        var attribs = e.currentTarget.dataset.attr.split(' ');
        var val = '#' + e.currentTarget.value;
        console.log("set attribute " + attribs + " to value " + val);
        for (var i = 0; i < attribs.length; i++) {
            style.set(attribs[i], val);
        }
        Channel.updateViews();
    }

    function saveStyle() {
        //TODO what are these here for???
        style.set("fontCategorySize", "Large");
        style.set("font", "Avenir-Next");
        style.set("fontSize", "16");

        style.save().then(function (style) {
            // Execute any logic that should take place after the object is saved.
            // alert('Saved objectId: ' + style.id);
            Channel.updateViews();
        }, function (error) {
            // Execute any logic that should take place if the save fails. error is a
            // Parse.Error with an error code and message.
            alert("Failed to create new object, with error code: " + error.message);
        });
    }

    function closeStyleEditor(e) {
        e.preventDefault();
        //refresh Channel data with style from database
        var close = !style.dirty() || confirm('Discard unsaved changes');
        if (close) {
            Channel.resetStyle().then(function () {
                console.info("reverted stlyle and now tabbar has a value of " + style.get("tabBar"));
                Channel.updateViews();
            });

            // TODO is this the best way to revert back?
            togglePanelWithin('panel-editor', 'panel3');
        }
    }

    return editorView;
}

function togglePanelWithin(panelName, parentName) {
    var panel = void 0,
        parent = void 0;
    panel = document.getElementById(panelName);
    if (panel) {
        parent = document.getElementById(parentName);
        if (parent) {
            for (var i = 0; i < parent.children.length; i++) {
                parent.children[i].classList.add('hidden');
            }
            panel.classList.remove('hidden');
        } else {
            console.warn("panel " + parentName + " not found");
        }
    } else {
        console.warn("panel " + panelName + " not found");
    }
}

exports.default = styleEditorView;

//edit color styles edit background color
/*
$("#backgroundColor")
    .change(function () {
        $("#phoneDisplay").css("background-color", "#" + $("#backgroundColor").val());
    });

//edit navbar color

$("#navColor").change(function () {
    $("#navBar").css("background-color", "#" + $("#navColor").val());
});

//edit active navbutton color

$("#activeNav").change(function () {
    $(".activeNavIcon").css("color", "#" + $("#activeNav").val());
});

//edit general text color

$("#textColor").change(function () {
    $(".channelText").css("color", "#" + $("#textColor").val());
});

//edit category text color

$("#catTextColor").change(function () {
    $(".categorytxt").css("color", "#" + $("#catTextColor").val());
});
*/

/***/ })

/******/ });
//# sourceMappingURL=main.js.map