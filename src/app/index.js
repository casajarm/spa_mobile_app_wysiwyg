"use strict";
import {getUserChannels, newUser} from "./modules/users.js";
import {cloneChannel, createBaseOrg, getCloneableID} from "./modules/clonechannel.js";
import {Organization} from "./modules/organizations.js";
import {Channel, viewControl} from './modules/channel.js';
import {phoneView} from './views/phoneView.js';
import categoryEditorView from './views/categoryView.js';
import categoriesEditorView from './views/categoriesEditor.js';
import catLeftView from './views/catLeftView.js';
import badgesListView from './views/badgesListView.js';
import styleEditorView from './views/styleEditorView.js';
import signUpForm from './views/signupForm.js';
import loginForm from './views/loginForm.js';



//this is to local test the parse server without the actual server
var ParseMockDB =  require('parse-mockdb');
ParseMockDB.mockDB(Parse); // Mock the Parse RESTController


const {render, html, svg} = lighterhtml;// this is loaded in the index.html file

var panel1,
    panel2,
    panel3,
    panelStyle,
    channelName,
    user,
    channelID,              // currently selected channel ID
    selectedCategoryID,     // currently selected category ID
    panelCategories,
    panelBadges,
    panelEditor,
    panelStyleEditor;             //styles editor
var channels = []           // list of users channels


//modal editor vars
var editors = []; //users ids able to edit the channel to populate channel list
var activeEditorWindow = "pageHeaderEditor";
var imagefile; //image to be saved to S3
var unsplashResults = []; //array of images returned from unsplash search
var parseFile;
var headerParseFile;
var ipadParseFile;

const emptySpan = function() {
    return html`<span />`;
};

// used to deal with errors on undefined attributes where parse wants you to chain a call to something like URL to the attribute
// for example groupSelected.attributes.newCategoryImage.url()
let mockObject = {};
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


function saveGroups(json, orgID) {
    let groups = json.results;
    groups.forEach(element => {
        console.log('step');
        let group = element;
        group.className = 'Group';
        let obj = Parse.Object.fromJSON(group);
        obj.organizationID = orgID;
        obj.save();
        
    }); 
    console.log('saved group to parse db');
    
}






function initApplication() {
    panel1 = document.getElementById("panel1");
    panel2 = document.getElementById("panel2");
    panel3 = document.getElementById("panel3");
    panelStyle = document.getElementById("panel-style");
    // not sure about having to add these elements like this
    panelBadges = getOrCreateDiv('panel-badges', panel3);
    panelEditor =  getOrCreateDiv('panel-editor', panel3)
    panelCategories = getOrCreateDiv('panel-categories', panel3);
    panelStyleEditor =  getOrCreateDiv('panel-style-editor', panel3);

    Parse.initialize("fg8ZXCHKfBOWme42LGPA");
    //Parse.serverURL = "https://lmx-stage-alex.herokuapp.com/parse";
    Parse.enableLocalDatastore();
    user = new Parse.User();
    createBaseOrg();
}

page.start({hashbang: false, dispatch: true});
//page.base("/src/app/page_router_example.html");
page.base('/src/app');
page("/", function (ctx, next) {
    viewControl.deleteAll();
    viewControl.add(panel1
    , () => html`
        <ul>
            <li><a href="signup">Create New Account</a></li>
            <li><a href="login">Login</a></li>
        </ul>`);
    viewControl.add(panel2, () => emptySpan());
    viewControl.add(panel3, () => emptySpan());
});

page("/home", function (ctx, next) {
    page.redirect("/");
});

page("/signup", function (ctx, next) {
    //panel 2
    viewControl.deleteView(panel2);
    viewControl.add(panel3, () => emptySpan());
    viewControl.add(panel2, () => signUpForm());
    //not sure if this is the best place to wire up event handlers...
    let signupUser2 = document.querySelector("#signUpUser2");
    signupUser2.addEventListener("click", async function (e) {
        e.preventDefault();
        // create the user
        let user_password = document
            .getElementById("inputPassword")
            .value;
        let user_email = document
            .getElementById("inputEmail")
            .value;
        try {
            user = await newUser(user_email, user_password)
        } catch (e) {
            alert('error: ' + e);
            // TODO we could redirect to another route?
        }

        // TODO we need to put validation controls around the signup form
        if (user.isCurrent()) {
            // set orgname/channelname in state
            channelName = document
                .getElementById("inputOrganization")
                .value;

            // TODO see if we can just give it a route for clone and then a "next" clone a
            // channel for them start by cloning channel xGO7Pdu71w
            const targetOrg = new Organization();
            var channelID = getCloneableID();  //"xGO7Pdu71w"; //
            //TODO if the name is not unique???
            targetOrg.set("name", channelName);
            targetOrg
                .save()
                .then(async function (org) {
                    console.log("New org saved .. now clone");
                    await cloneChannel({targetOrgId: org.id, sourceOrgId: channelID});
                    //TODO update header image with fabric built image
                    //Channel.mainCategory().set('headerimage', '')

                    document.getElementById('login').classList.add('active');
                    page(`/viewnew/${org.id}`);
                    }
                );
        }
    });

    let imageSource = "../assets/screenshots/IMG_0971.png";
    viewControl.add(panel3, () => html`<img src="${imageSource}" />`);
});


page("/login", function (ctx, next) {
    console.info('login route');
    viewControl.deleteAll();
    viewControl.add(panel2, () => loginForm());

    //not sure if this is the best place to wire up event handlers...
    let loginButton = document.querySelector("#loginUser");
    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        // login the user
        var user_password = $("#loginPassword").val();
        var user_email = $("#loginEmail").val();
        // then show them the page listing their channels
        console.log(`responding to the click event ${e}`);
        loginParse(user_email, user_password).then(function () {
            //hide login link
            document.getElementById('login').classList.add('active');
            // move along
            page("/channels");
        });
    });
}); // login page

page("/logout", function (ctx, next) {
    viewControl.deleteAll();
    Parse.User.logOut().then(() => {
        console.info('user logged out');
        user = Parse.User.current();
        page.redirect('/home');
        });
    }
); // logout


page("/distribute", function (ctx, next) {
    viewControl.add(panel1, () => html`<h1>About your Badge Channel</h1>`);
    viewControl.add(panel3, () => {
        function shareChannel(e) {
            e.preventDefault();
            alert("emails are on the way");
        }

        let form = html`<h2>A list of links for channel</h2>
        <ul>
            <li>Link1</li>
            <li>Link2</li>
            <li>Link3</li>
        </ul>
        <form>
            <textarea id="email-list" placeholder="enter emails to share your channel">
            </textarea>
            <button id="share-channel-button"
                class="btn btn-default"
                onclick="${shareChannel}"
            >Share Channel
            </button>
        </form>`;
        return form;
        }
    );

}); // distribute page

page("/viewnew/:orgID", async function (ctx, next) {
    await Channel.populateAll(ctx.params.orgID);
    viewControl.add(panel1, () => html`<h1>About your Badge Channel</h1>`);
    //showLink(ctx, next, boilerplate);
    Channel.selectedCategory = Channel.mainCategory;
    viewControl.add(panel2, () => phoneView(Channel));

    viewControl.add(panel3, () => {
        let form = html`<h2>Congratulations ${Channel.channelName}!</h2>
        <h3>Here's your new Badge channel</h3>
        <button id="next-step-button"
            onclick="${() => page('/distribute')}"
            class="btn btn-default">Next</button>`;
        return form;
    });

}); // viewnew/orgID page

page("/channels", async function (ctx, next) {
    console.log("channel list view");
    if (user.isCurrent()) {
    channels = await getUserChannels(user.id)
    console.log(`getUserChannels returned count: ${channels.length}`);


    viewControl.add(panel1, () => displayChannelList(channels));
    viewControl.deleteView(panel2);
    viewControl.deleteView(panel3);

}

}); //channels page

page("/channel/:channelID/clone", function (ctx, next) {
    channelID = ctx.params.channelID || getCloneableID();
    console.log(`entering clone for channel id ${channelID}`);
    channelName = "Clone of " + channelID;
    const targetOrg = new Organization();
    targetOrg.set("name", channelName);
    targetOrg
        .save()
        .then(async function (org) {
            console.log("New org saved .. now clone");
            await cloneChannel({targetOrgId: org.id, sourceOrgId: channelID});
            //redirect to the view now
            page.redirect(`/viewnew/${org.id}`);
        });
});

page("/channel/:channelID/view",  async function (ctx, next) {
    channelID = ctx.params.channelID;
    console.log(`entering view for channel id ${channelID}`);
    if (!Channel.channelID
        || Channel.channelID != channelID) {
            await Channel.populateAll(channelID);
            //channel = channels.find(x => x.id === channelID);
    }
    Channel.selectedCategory = Channel.mainCategory;
    viewControl.deleteAll();
    viewControl.add(panel2, () => phoneView(Channel));
    viewControl.add(panel1, () => catLeftView(Channel.categories));
    // not sure about having to add these elements like this
    panelBadges = getOrCreateDiv('panel-badges', panel3);
    panelEditor =  getOrCreateDiv('panel-editor', panel3)
    panelCategories = getOrCreateDiv('panel-categories', panel3);
    panelStyleEditor =  getOrCreateDiv('panel-style-editor', panel3);

    panelBadges.classList.add('hidden');
    panelCategories.classList.add('hidden');
    panelStyleEditor.classList.add('hidden');
    panelEditor.classList.remove('hidden');

    // we could combine these 4 views into one view.js file
    viewControl.add(panelCategories, () => categoriesEditorView(Channel));
    viewControl.add(panelEditor, () => categoryEditorView(Channel));
    viewControl.add(panelBadges, () => badgesListView(Channel));
    viewControl.add(panelStyleEditor, () => styleEditorView(Channel));

    viewControl.add(panelStyle, () => inlineStyle(Channel.channelStyle));

});  //channel view

page("/channel/:channelID/view/:groupID", async function (ctx, next) {
    if (!Channel.channelID
        || Channel.channelID != ctx.params.channelID) {
        channelID = ctx.params.channelID;
        Channel.populateAll(channelID);
        //channel = channels.find(x => x.id === channelID);
        }

        selectedCategoryID = ctx.params.groupID;
        console.log(`entering view for channel id ${channelID} and group ${selectedCategoryID}`);
        Channel.selectedCategoryID = selectedCategoryID;
        viewControl.add(panel2, () => phoneView(Channel));

        viewControl.add(panelCategories, () => categoriesEditorView(Channel));
        viewControl.add(panelEditor, () => categoryEditorView(Channel));
        viewControl.add(panelBadges, () => badgesListView(Channel));
        viewControl.add(panelStyleEditor, () => styleEditorView(Channel));

        viewControl.add(panelStyle, () => inlineStyle(Channel.channelStyle));
        // TODO add the back button on the left panel
        panelBadges.classList.add('hidden');
        panelCategories.classList.add('hidden');
        panelStyleEditor.classList.add('hidden');
        panelEditor.classList.remove('hidden');

});//channel group page


page("/channel/:channelID/edit", function (ctx, next) {
    console.log(`entering edit for channel id ${ctx.channelID}`);
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
    let form;
    // sometimes form is a promise
    // try to resolve and if it is not a thennable just append the result
    //
    try {
         formFunction(formArguments).then(_form => {panel.appendChild(_form)});
    }
    catch (err) {
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
const displayChannelList = (channels) => {
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
        let targetChannel = e.currentTarget.dataset.i;
        let route = '/channel/' + targetChannel + '/view';
        page(route);
    }

    let orgList = channels.map(i =>
            html`<li class="channelList" id="${i.id}">
                    <a data-i=${i.id} onclick="${selectChannel}">${i.attributes.name}</a>
                </li>`);

    let form = html`<div>
        <ul>
            ${orgList}
        </ul>
    </div>`;
    return form;
}

async function loginParse(username, password) {
    console.log(`logIn call with user: ${username} and pwd: ${password}`);
    try {
        user = await Parse
            .User
            .logIn(username, password);
        console.log("logged in");
        return user;
    } catch (err) {
        console.log(`error logging in ${err}`);
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
    console.info(`running inline style with tabbar value of ${style.get("tabBar")}`);
    let styleSheet = `
        #phoneDisplay {
            background-color: ${style.get("generalColor")};
        }

        .navBar {
            background-color:  ${style.get("tabBar")}
        }

        .activeNavIcon {
            color:  ${style.get("tabBarSelected")}
        }

        .channelText {
            color:  ${style.get("generalTextColor")}
        }
        .categorytxt {
            color:  ${style.get("categoryTextColor")}
        }`;
    let styleTag = document.createElement('style');
    styleTag.append(styleSheet);
    return styleTag;
}

function getOrCreateDiv(id, parent) {
    let elem = document.getElementById(id);
    if (!elem) {
        elem = document.createElement('div')
        elem.id = id;
        parent.appendChild(elem);
    }
    return elem;
}

/* jquery/bootstrap handler for the categories editor modal
TODO replace with template function?
*/
$('#addCategoriesModal').on('show.bs.modal',
    function (event) {
        let modal = $(this);
        let triggeringElement = event.relatedTarget; // Button/link/div that triggered the modal
        if (triggeringElement.id == 'addNewCategories') {
            Channel.selectedCategory = null;
            document.getElementById('badge-edit-form').reset();
            modal.find("#categoryPreview").attr("src", '');
            modal.find("#categoryImageName").text('');
        }
        else {
            let categoryID = triggeringElement.dataset.i; // Extract info from data-* attributes
            Channel.selectedCategoryID = categoryID;
            let groupSelected = Channel.selectedCategory;
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
    }
)

//uploads a category image from category editor modal
$("#categoryImageButton").click(function() {
	let fileUploadControl = $("#categoryImageInput")[0];
	if (fileUploadControl.files.length > 0) {
		var file = fileUploadControl.files[0];
		var name = fileUploadControl.files[0].name;
		parseFile = new Parse.File(name, file);

		parseFile.save().then(
			function() {
				// $('#categoryPreview').hide();
				$("#categoryPreview").attr("src", parseFile._url);
				// $('#categoryPreview').fadeIn(650);
				console.log(parseFile._url);

				// The file has been saved to Parse.
			},
			function(error) {
				// The file either could not be read, or could not be saved to Parse.
			}
		);
		$("#categoryImageInput")[0].value = "";
	}
});

//saves category when editor modal is closed with save button
$("#saveCategory").click(function(event) {
    let categoryText = $("#categoryDisplayName").val();
	let categoryNameInternal = $("#categoryName").val();
	let categoryTextEN = {
		en: categoryText
	};
    let Group = Parse.Object.extend('Group');
    let disabled = $("#disableCat").is(":checked") ? 1 : 0;
    let groupSelected = Channel.selectedCategory;

	if (groupSelected == undefined) {
		groupSelected = new Group(); //Parse.Object.createWithoutData('Group');
		groupSelected.set("organizationID", Channel.channelID);
		groupSelected.set("order", Channel.categories.length + 1);
		groupSelected.set("newHeader", Channel.mainCategory.attributes.newHeader);
		groupSelected.set("callOuts", { en: "Connect with us!" });
		groupSelected.set("badges", []);
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

	groupSelected.save().then(
		async group => {
            Channel.addCategory(groupSelected)
            .then( () => {
                console.log("category saved");
                parseFile = undefined;
                page.redirect('/channel/' + channelID + '/view/' + groupSelected.id);
                //document.getElementById("categoriesInEditor").innerHTML = "";
            })
		},
		error => {
			//  error is a Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		}
	);
});

//fills data for header editor modal
$('#editheaderModal').on('show.bs.modal',
    function (event) {
        let modal = $(this);
        let groupSelected = Channel.selectedCategory;

        modal.find("#imageUpload").val("");
        modal.find("#headerPreview").attr("src", groupSelected.attributes.newHeader.url());
        modal.find("#headerEditorImageName").text(groupSelected.attributes.newHeader._name);
        modal.find("#ipadImageUpload").val("");
        modal.find("#ipadHeaderPreview").attr(
            "src",
            (groupSelected.attributes.newIpadHeader || mockObject).url() || ''
        );
        modal.find("#ipadHeaderEditorImageName").text(
            (groupSelected.attributes.newIpadHeader || mockObject)._name || ''
    	);
    }
);

$("#saveEditedHeader").click(function() {
	// var name = $('#imageUpload')[0].files[0].name;   $("#headerName").text(name);
    let groupSelected = Channel.selectedCategory;
    groupSelected.set("newHeader", headerParseFile);
	groupSelected.set("newIpadHeader", ipadParseFile);
	groupSelected.save().then(
		group => {
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
            Channel.updateViews();

           // todo see if bootstrap has a reset modal feature
            $("#imageUpload")[0].value = "";
		},
		error => {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		}
	);
});

// uploads mobile header image to parse and sets the preview image src
$("#headerEditorImageButton").click(function() {
	let fileUploadControl = $("#imageUpload")[0];
	if (fileUploadControl.files.length > 0) {
		let file = fileUploadControl.files[0];
		let name = fileUploadControl.files[0].name;
		headerParseFile = new Parse.File(name, file);

		headerParseFile.save().then(
			function() {
				$("#headerPreview").attr("src", headerParseFile._url);

				console.log(headerParseFile._url);

				// The file has been saved to Parse.
			},
			function(error) {
				// The file either could not be read, or could not be saved to Parse.
			}
		);
	}
});

// uploads mobile header image to parse and sets the preview image src

$("#ipadHeaderEditorImageButton").click(function() {
	console.log("ipad upload clicked");

	let fileUploadControl = $("#ipadImageUpload")[0];
	if (fileUploadControl.files.length > 0) {
		let file = fileUploadControl.files[0];
		let name = fileUploadControl.files[0].name;
		ipadParseFile = new Parse.File(name, file);

		ipadParseFile.save().then(
			function() {
				$("#ipadHeaderPreview").attr("src", ipadParseFile._url);

				console.log(ipadParseFile._url);

				// The file has been saved to Parse.
			},
			function(error) {
				// The file either could not be read, or could not be saved to Parse.
			}
		);
	}
});


// when badge editor modal is opened this fills data
$('#editBadgesModal').on('show.bs.modal',
    function (event) {
        let thisBadgeID = event.relatedTarget.id // id of calling badge icon
        let modal = $(this);
        // alert("clicked");
        let badge = Channel.badges.find(x => x.id === thisBadgeID);

        modal.find("#badgeName").val(badge.attributes.names.en);
        modal.find("#badgeEditorImageInput").val("");
        modal.find("#badgePreview").hide();
        modal.find("#badgePreview").attr("src", badge.attributes.x3.url());
        modal.find("#badgePreview").fadeIn(650);
        modal.find("#BadgeEditorImageName").text(badge.attributes.x3._name);
        modal.find("#badgeEditorImageButton").click(function() {
        let fileUploadControl = $("#badgeEditorImageInput")[0];
        if (fileUploadControl.files.length > 0) {
            let file = fileUploadControl.files[0];
            let name = fileUploadControl.files[0].name;
            parseFile = new Parse.File(name, file);

            parseFile.save().then(
                function() {
                    // $('#badgePreview').hide();
                    $("#badgePreview").attr("src", parseFile._url);
                    // $('#badgePreview').fadeIn(650);
                    console.log(parseFile._url);

                    // The file has been saved to Parse.
                },
                function(error) {
                    // The file either could not be read, or could not be saved to Parse.
                }
            );
            $("#badgeEditorImageInput")[0].value = "";
        }
    });

    //saves edited badge when editor modal is closed with save button
    modal.find("#saveEditedBadge").click(function(event) {
            var badgeNamesEN = $("#badgeName").val();

            badge.set("names", { en: badgeNamesEN });

            if (parseFile != undefined) {
                badge.set("x3", parseFile);
            }

            badge.save().then(
                async returnedBadge => {
                    // Execute any logic that should take place after the object is saved.
                    console.log("badge saved");
                    Channel.updateViews();
                    parseFile = undefined;
                },
                error => {
                    // Execute any logic that should take place if the save fails. error is a
                    // Parse.Error with an error code and message.
                    alert("Failed to create new object, with error code: " + error.message);
                }
            );
    });
});


//creates a new badge from file uploader
async function createBadge(file) {
    let name = file.name;
	let parseFile = new Parse.File(name, file);
	let badgeNamesEN = name.slice(0, -4);
    let Badge = Parse.Object.extend('Badge');
    console.info('saving file named ' + name);
    await parseFile.save()
    let newBadge = new Badge();
    console.info(`file ${name} saved now add badges`);
    newBadge.set("x3", parseFile);
    newBadge.set("name", name.slice(0, -4));
    newBadge.set("names", { en: badgeNamesEN });
    newBadge.set("organizationID", Channel.channelID);
    newBadge.set("organizationName", Channel.channelName);
    await newBadge.save()
    .catch(error => {
        // error is a Parse.Error with an error code and message.
        alert("Failed to create new object, with error code: " + error.message);
    });
    console.info(`badge ${name} saved now add to channel`);
    Channel.badges.push(newBadge);
    $("#uploadComplete").fadeIn(1650);
    // The file has been saved to Parse.
    return newBadge;
}

$("#addBadgesModalButton").change(function() {
	$("#uploadComplete").hide();
});

$("#badgesImageButton").click(async function() {
	let fileUploadControl = document.getElementById("badgesImageInput").files;
	if (fileUploadControl.length > 0) {
        let promiseChain = [];
        for (var i = 0; i < fileUploadControl.length; i++) {
            console.info('adding upload promise for file number' + i);
            promiseChain.push (createBadge(fileUploadControl[i]));
        }
        await Promise.all(promiseChain)
            .then( () =>  {
                console.info('badges saved..now refresh views');
                Channel.updateViews();
                $("#badgesImageInput")[0].value = "";
            });
	}
});