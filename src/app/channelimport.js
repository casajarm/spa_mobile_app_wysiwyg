// Alex's test environment
Parse.initialize("fg8ZXCHKfBOWme42LGPA");

Parse.serverURL = 'https://lmx-stage-alex.herokuapp.com/parse'

// sets class types and vars to represent parse objects
const Organization = Parse
				.Object
				.extend("Organization");
const Group = Parse
				.Object
				.extend("Group");
const ChannelStyle = Parse
				.Object
				.extend("ChannelStyle");
const Likemoji = Parse
				.Object
				.extend("Likemoji");
const StartSelector = Parse
				.Object
				.extend("StartSelector");

//*********global vars ************ imported objects
var returnedOrg = Parse
				.Object
				.extend("Organization"); // imported organization
var importedLikemojis = [] // array of likemojis for imported organization
var styles = new ChannelStyle();
var groups = [] //array of groups for imported organization - unsorted
var categoriesSorted = [] //array of groups for imported organization - sorted by "order" using sortCategories() function
var likemoji = Parse
				.Object
				.extend("Likemoji");
var userChannels = [] //array of user channels for logged-in user

//local var to set channel group to display, etc.
var groupSelected = Parse
				.Object
				.extend("Group"); // current group to be displayed in emulator (phone display window)

// new objects to save var newStartSelector = new StartSelector(); // new
// StartSelector being created
var newOrg = new Organization(); // new organization being created
var newStyle = new ChannelStyle(); // new channel for new organization being created
var newGroup = new Group(); // new group created for new organization
var newGroupLikemojis = []; //
var newGroups = [] //sorted array of newGroups for new organization being created
var groupsIDs = [] //array of associated group IDs to be stored in the organization object being created
var groupPointers = [] //array of pointers to group objects to be stored in the organization object being created
var newLikemoji = new Likemoji();
var newLikemojisArray = [] //array of likemojis for new organization being created
var newGroupsLikemojis = [] //array of arrays likemoji obj ids for groups of new organization being created
var fileUploadControl;

// channel selector vars
var demoImages = [
				"assets/screenshots/IMG_0967.png",
				"assets/screenshots/IMG_0970.png",
				"assets/screenshots/IMG_0972.png",
				"assets/screenshots/IMG_0971.png",
				"assets/screenshots/hrscreen.jpg",
				"assets/screenshots/IMG_0969.png",
				"assets/screenshots/IMG_0970.png",
				"assets/screenshots/hrscreen.jpg",
				"assets/screenshots/IMG_0970.png"
]
var selectedChannelID = "7"
var returnedStartSelectors = []; //array of StartSelector objects (names, text, images of start options) ie: "start from template" or "start from scratch"

//editor vars
var editors = []; //users ids able to edit the channel to populate channel list
var activeEditorWindow = "pageHeaderEditor"
var imagefile; //image to be saved to S3
var unsplashResults = []; //array of images returned from unsplash search
var parseFile;
var headerParseFile;
var ipadParseFile;

// returns what is being clicked $('body').click(function(event) {   var target =
// $(event.target);   console.log(target); }); returns StartSelector Objects
async function getStartSelectors() {

				const query = new Parse.Query(StartSelector);

				try {

								return await query.find();

				} catch (err) {
								// TypeError: failed to fetch
								alert(err);
				}
}

//returns and organization object template or channel to edit or clone

async function getOrganization(orgId) {

				const query = new Parse.Query(Organization);

				try {

								return await query.get(orgId);

				} catch (err) {
								// TypeError: failed to fetch
								alert(err);
				}
}

// return groups associated with an org

async function getGroups(orgId) {

				const query = new Parse.Query(Group);
				query.equalTo("organizationID", orgId);

				try {

								return await query.find();

				} catch (err) {
								// TypeError: failed to fetch
								alert(err);
				}
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

// return likemojis associated with an org

async function getLikemojis(orgId) {

				const query = new Parse.Query(Likemoji);
				query.equalTo("organizationID", orgId);

				try {

								return await query.find();

				} catch (err) {
								// TypeError: failed to fetch
								alert(err);

				}
}

// *********build page functions*********** loads org objects and builds page...
async function getChannel(id) {
				styles = await getStyle(id);
				importedLikemojis = await getLikemojis(id);
				returnedOrg = await getOrganization(id);
				groups = await getGroups(id);
				categoriesSorted = await sortCategories();
}

async function displayChannel(id) {
				await buildPage(groups[0].id);
				await displayCollectionLikemojis();
				await displayEditorCategories();
				displayStyle()
}

async function getChannelAndClone(id) {
				await getChannel(id);
				await cloneChannel();
				await getChannel(newOrg.id);
				displayChannel(id)

}

async function loadUserChannel(id) {

				await getChannel(id);
				displayChannel(id);

}

// display style channel css, etc...

function displayStyle() {
				// set background color and editor swatch
				$("#phoneDisplay").css("background-color", styles[0].get("generalColor"));
				$("#backgroundColor").val(styles[0].get("generalColor").substring(1));
				document
								.getElementById('backgroundColor')
								.jscolor
								.importColor();

				// set navBar color and editor swatch
				$(".navBar").css("background-color", styles[0].get("tabBar"));
				$("#navColor").val(styles[0].get("tabBar").substring(1));
				document
								.getElementById('navColor')
								.jscolor
								.importColor();

				$(".activeNavIcon").css("color", styles[0].get("tabBarSelected"));
				$("#activeNav").val(styles[0].get("tabBarSelected").substring(1));
				document
								.getElementById('activeNav')
								.jscolor
								.importColor();

				//set general text color
				$(".channelText").css("color", styles[0].get("generalTextColor"));
				$("#textColor").val(styles[0].get("generalTextColor").substring(1));
				document
								.getElementById('textColor')
								.jscolor
								.importColor();

				//set category text color
				$(".categorytxt").css("color", styles[0].get("categoryTextColor"));
				$("#catTextColor").val(styles[0].get("categoryTextColor").substring(1));
				document
								.getElementById('catTextColor')
								.jscolor
								.importColor();

}

//cancel style edits

$("#editorThemeCancel")
				.click(function () {
								//resets style to last saved style
								displayStyle();
								$("#colorThemeEditor").hide();
								$("#pageHeaderEditor").show();

				});

//save style edits

$("#editorThemeSave").click(function () {

				saveStyle();
				$("#colorThemeEditor").hide();
				$("#pageHeaderEditor").show();

});

function saveStyle() {

				styles[0].set("organizationID", returnedOrg.id);
				styles[0].set("generalColor", "#" + $("#backgroundColor").val());
				styles[0].set("tabBar", "#" + $("#navColor").val());
				styles[0].set("starColor", "#" + $("#navColor").val());
				styles[0].set("navButtonColor", "#" + $("#navColor").val());
				styles[0].set("tabBarSelected", "#" + $("#activeNav").val());
				styles[0].set("generalTextColor", "#" + $("#textColor").val());
				styles[0].set("categoryTextColor", "#" + $("#catTextColor").val());
				styles[0].set("fontCategorySize", "Large");
				styles[0].set("font", "Avenir-Next");
				styles[0].set("fontSize", "16");

				styles[0]
								.save()
								.then((style) => {
												// Execute any logic that should take place after the object is saved.
												// alert('Saved objectId: ' + style.id);

								}, (error) => {
												// Execute any logic that should take place if the save fails. error is a
												// Parse.Error with an error code and message.
												alert('Failed to create new object, with error code: ' + error.message);
								});
}

//edit color styles edit background color

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

// load header image for page

function displayHeader() {

				// loads header image from org object to fix the fact that its stored in the
				// Organization class **** update - commented out because this is being fixed -
				// saving for ability to clone 1st channel on production if needed ***** if
				// (groupSelected.get("main") == 1) { 	var node =
				// document.getElementById("docHeaderImage"); 	node.setAttribute("src",
				// "https://s3.amazonaws.com/lmxproduction/" + returnedOrg.attributes.header);
				// 	} else { 	// Loads regular header images from all other groups aside from
				// main category to fix Org class issue 	var node =
				// document.getElementById("docHeaderImage"); 	node.setAttribute("src",
				// "https://s3.amazonaws.com/lmxproduction/" +
				// groupSelected.attributes.headerImage); }

				var node = document.getElementById("docHeaderImage");
				node.setAttribute("src", groupSelected.attributes.newHeader.url());
}

// display callout on page

function displayCallout() {

				// commented out - loads channel from old org location - may want to use for
				// first production channel clones...
				// document.getElementById("callout").innerHTML = returnedOrg.get("callOut");
				// loads callouts from new corrected group location
				$('#callout').text(groupSelected.attributes.callOuts.en);

}

// load and display likemojis for category

function displayLikemojis() {

				if (groupSelected.attributes.likemojis.length < 1) {

								var emptyText = document.createElement("h4");
								var text = document.createTextNode('Add Likemojis Here');

								emptyText.setAttribute("class", "dragLikemojisPrompt")
								emptyText.appendChild(text);

								var element = document.getElementById("likemojiGroupCollection");
								element.appendChild(emptyText);

				} else {

								for (var j = 0; j < groupSelected.attributes.likemojis.length; j++) {
												var likemojiID = groupSelected.attributes.likemojis[j];

												var groupLikemojis = importedLikemojis.filter(obj => {
																return obj.id === likemojiID;
												})

												// console.log(groupLikemojis[0].attributes.name);

												var likemojiImage = groupLikemojis[0].attributes.x3;
												var likemojiName = groupLikemojis[0].attributes.names.en;
												var likemojiID = groupLikemojis[0].id;

												//create divs and images to display likemojis

												var div = document.createElement("div");
												var node = document.createElement("img");
												var text = document.createElement("div");
												var textname = document.createTextNode(likemojiName);

												div.setAttribute("class", "likemojis")
												div.setAttribute("id", likemojiID)
												text.setAttribute("class", "likemojiNames channelText")
												node.setAttribute("src", likemojiImage.url())
												node.setAttribute("class", "likemojiImages")
												div.appendChild(node);
												text.appendChild(textname);
												div.appendChild(text);

												var element = document.getElementById("likemojiGroupCollection");
												element.appendChild(div);

								};
				};
}

function displayCollectionLikemojis() {

				for (var j = 0; j < importedLikemojis.length; j++) {

								// skip likemojis that are in current group
								// console.log(importedLikemojis[j].attributes.name);

								var likemojiImage = importedLikemojis[j].attributes.x3;
								var likemojiName = importedLikemojis[j].attributes.names.en;
								var likemojiID = importedLikemojis[j].id;

								//create divs and images to display likemojis

								var div = document.createElement("div");
								var node = document.createElement("img");
								var text = document.createElement("div");
								var textname = document.createTextNode(likemojiName);

								div.setAttribute("class", "likemojis containerLikemojis")
								div.setAttribute("id", likemojiID)
								div.setAttribute("data-toggle", "modal");
								div.setAttribute("data-target", "#editLikemojisModal");
								text.setAttribute("class", "likemojiNames")
								node.setAttribute("src", likemojiImage.url())
								node.setAttribute("class", "likemojiImages grow")
								div.appendChild(node);
								text.appendChild(textname);
								div.appendChild(text);

								var element = document.getElementById("likemojisContainer");
								element.appendChild(div);
				};
				//inits dragable on likemojis after dynamic load for jquery
				dragfix();
}

// sorts groups to correct order

async function sortCategories() {

				groups
								.sort(function (a, b) {
												return a.attributes.order - b.attributes.order
								});
				return groups;
}

async function sortImportedLikemojisByName() {

				importedLikemojis.sort(SortByName);

}

function SortByName(a, b) {
				var aName = a
								.attributes
								.name
								.toLowerCase();
				var bName = b
								.attributes
								.name
								.toLowerCase();
				return ((aName < bName)
								? -1
								: ((aName > bName)
												? 1
												: 0));
}

//sets group to display and edit

function selectDisplayGroup(groupID) {

				groupSelectedPrep = groups.filter(obj => {
								return obj.id === groupID;
				});

				groupSelected = groupSelectedPrep[0];
}

// load and diplay categories on main page

function displayEditorCategories() {

				if (groupSelected.attributes.main == 1) {

								for (var i = 0; i < groups.length; i++) {

												if (categoriesSorted[i].attributes.main == 1) {

																// console.log ("skipped");

												} else {

																var text = document.createElement("p");
																var li = document.createElement("li");
																var span = document.createElement("span");
																var icon = document.createElement("i");
																var icon2 = document.createElement("i");

																text.innerHTML = categoriesSorted[i].attributes.name;
																text.setAttribute("class", "inlineDisplay");

																icon.setAttribute("class", "fas fa-sort");
																icon2.setAttribute("class", "fas fa-edit floatRight");

																span.setAttribute("class", "ui-icon ui-icon-arrowthick-2-n-s");
																li.setAttribute("id", categoriesSorted[i].id + i);
																li.setAttribute("data-toggle", "modal");
																li.setAttribute("data-target", "#addCategoriesModal");

																li.appendChild(icon);
																li.appendChild(icon2);
																li.appendChild(text);

																li.appendChild(span);

																if (categoriesSorted[i].attributes.disable == 1) {
																				li.setAttribute("class", "disabledCategory");
																}

																var element = document.getElementById("categoriesInEditor");
																element.appendChild(li);
												};
								};

				} else {

								console.log("no groups to display")
				};
}

function displayCategories() {

				if (groupSelected.attributes.main == 1) {

								for (var i = 0; i < groups.length; i++) {

												if (categoriesSorted[i].attributes.main == 1) {

																// console.log ("skipped");

												} else {

																if (categoriesSorted[i].attributes.disable !== 1) {
																				var div = document.createElement("div");
																				var img = document.createElement("img");
																				var txt = document.createElement("p");

																				img.setAttribute("src", groups[i].attributes.newCategoryImage.url())
																				img.setAttribute("width", "100%")
																				img.setAttribute("height", "auto")
																				txt.innerHTML = (categoriesSorted[i].attributes.names.en);
																				txt.setAttribute("class", "categorytxt")
																				div.setAttribute("class", "category")
																				div.setAttribute("type", "button")
																				div.setAttribute("id", categoriesSorted[i].id)
																				// div.setAttribute("onclick", "goToPage('" + categoriesSorted[i].id + "')")
																				div.appendChild(img);
																				div.appendChild(txt);
																				var element = document.getElementById("categories");
																				element.appendChild(div);

																} else {
																				// console.log ("skipped disabled")
																};
												};
								};

				} else {

								console.log("no groups to display")
				};
}

function goToPage(groupID) {

				// removes content from phone screen
				document
								.getElementById("likemojiGroupCollection")
								.innerHTML = ""
				document
								.getElementById("categories")
								.innerHTML = ""

				if (groupID == groups[0].id) {

								if (groupSelected.attributes.likemojis.length < 1) {

												// $("#likemojiGroupCollection").removeClass("likemojiGroupCollection-area");
												$("#likemojiGroupCollection").removeClass("mainpageLikemojis");
												$("#likemojiGroupCollection").addClass("likemojiGroupCollectionNone")

								} else {

												$("#likemojiGroupCollection").addClass("mainpageLikemojis");
												$("#likemojiGroupCollection").removeClass("likemojiGroupCollectionNone")
												// $("#likemojiGroupCollection").addClass("likemojiGroupCollection-area");

								};

								$("#likemojiGroupCollection").removeClass("categoryLikemojis");

				} else {

								$("#likemojiGroupCollection").removeClass("mainpageLikemojis")
								$("#likemojiGroupCollection").removeClass("likemojiGroupCollectionNone")
								// $("#likemojiGroupCollection").addClass("likemojiGroupCollection-area");
								$("#likemojiGroupCollection").addClass("categoryLikemojis");
				}

				// loads and displays new page

				buildPage(groupID);

}

function buildPage(groupID) {

				selectDisplayGroup(groupID)
				displayHeader();
				displayCallout();
				sortImportedLikemojisByName()
				displayLikemojis();
				displayCategories();
				displayStyle();
				//inits dragable on likemojis after dynamic load for jquery
				dragfix();

}

//************save new channel objects*************

function saveOrgName() {
				newOrg.set("name", $("#orgName").val());

				newOrg
								.save()
								.then((org) => {
												// Execute any logic that should take place after the object is saved.
												// alert('New object created with objectId: ' + org.id); alert('New object
												// created with name: ' + org.get("name")); newOrg

												$("#createChannel").hide();
												$("#startSelectorPage").show();

								}, (error) => {
												// Execute any logic that should take place if the save fails. error is a
												// Parse.Error with an error code and message.
												alert('Failed to create new object, with error code: ' + error.message);
								});
}

function saveAddressInfo() {

				newOrg.set("address", $("#orgAddress").val());
				newOrg.set("city", $("#city").val());
				newOrg.set("state", $("#state").val());
				newOrg.set("phoneNumber", $("#phoneNumber").val());

				newOrg
								.save()
								.then((org) => {
												// Execute any logic that should take place after the object is saved.

												$("#saveAddress").hide();
												$("#startSelectorPage").show();
								}, (error) => {
												// Execute any logic that should take place if the save fails. error is a
												// Parse.Error with an error code and message.
												alert('Failed to create new object, with error code: ' + error.message);
								});

}

//clone style

function saveNewStyle() {

				newStyle = styles[0].clone()

				newStyle.set("organizationID", newOrg.id)

				newStyle
								.save()
								.then((style) => {
												// Execute any logic that should take place after the object is saved.
												// alert('New object created with objectId: ' + style.id);

								}, (error) => {
												// Execute any logic that should take place if the save fails. error is a
												// Parse.Error with an error code and message.
												alert('Failed to create new object, with error code: ' + error.message);
								});
}

//clone groups
async function saveNewGroups() {

				return new Promise(async(resolve, reject) => {

								for (var i = 0; i < categoriesSorted.length; i++) {

												newGroup = categoriesSorted[i].clone();
												newGroup.set("organizationID", newOrg.id);
												newGroup.set("organization", newOrg.get("name"));
												newGroup.set("order", i);
												newGroup.set("likemojis", newGroupsLikemojis[i])
												newGroups[i] = newGroup;
								};

								Parse
												.Object
												.saveAll(newGroups)
												.then((groups) => {
																for (var i = 0; i < groups.length; i++) {
																				groupsIDs[i] = groups[i].id;
																				groupPointers[i] = {
																								"__type": "Pointer",
																								"className": "Group",
																								"objectId": groups[i].id
																				}
																};

																resolve();
												}, (error) => {

																reject();
																alert('Failed to create new objects, with error code: ' + error.message);
												});
				});
};

//clones all importedLikemojis

async function cloneLikemojis() {
				for (var i = 0; i < importedLikemojis.length; i++) {

								var newLikemoji = importedLikemojis[i].clone();
								newLikemoji.set("organizationID", newOrg.id);
								newLikemoji.set("organizationName", newOrg.get("name"));
								newLikemojisArray[i] = newLikemoji;
				};
				return await Parse
								.Object
								.saveAll(newLikemojisArray);

}

// iterate through categoriesSorted array likemojis property array to store
// index relating to old likemoji ids and create new arrays of new likemojis
// based on old indexs and save to newGroupsLikemojis array.

function setNewGroupLikemojisArray() {

				var importedLikemojisIDs = [];
				var newLikemojisArrayIDs = [];

				for (var i = 0; i < importedLikemojis.length; i++) {
								importedLikemojisIDs[i] = importedLikemojis[i].id
								newLikemojisArrayIDs[i] = newLikemojisArray[i].id
				};

				for (var i = 0; i < categoriesSorted.length; i++) {

								// console.log (categoriesSorted[i].attributes.likemojis.length)
								newGroupLikemojis = []

								for (var j = 0; j < categoriesSorted[i].attributes.likemojis.length; j++) {

												var likemojiID = categoriesSorted[i].attributes.likemojis[j];
												var oldLikemojiIndex = importedLikemojisIDs.indexOf(likemojiID);

												newGroupLikemojis[j] = newLikemojisArrayIDs[oldLikemojiIndex];

								};

								newGroupsLikemojis[i] = newGroupLikemojis;
				};
}

//clone imported channel to new org**** does not work!!!! need to use async!!!!!

async function cloneChannel() {

				await cloneLikemojis();

				await setNewGroupLikemojisArray();

				await saveNewGroups();

				await saveNewStyle();

				saveChannelToOrg();

				// console.log("done")
}

function saveChannelToOrg() {

				editors.push(currentUser.id);

				newOrg.set("groups", groupsIDs);
				newOrg.set("groupPointer", groupPointers);
				newOrg.set("header", returnedOrg.attributes.header);
				newOrg.set("callOut", returnedOrg.attributes.callOut);
				newOrg.set("editors", editors);

				newOrg
								.save()
								.then((org) => {
												// Execute any logic that should take place after the object is saved.
												// console.log("org saved"); alert('Organization updated with channel: ' +
												// org.id);

								}, (error) => {
												// Execute any logic that should take place if the save fails. error is a
												// Parse.Error with an error code and message.
												alert('Failed to create new object, with error code: ' + error.message);
								});
}

// start selector functions change color on hover for start selector types
function showOne(id) {
				$('.startSelectorText').hide();
				$('#' + id).show();
}

$(".startSelector div")
				.hover(function () {
								$(this).addClass("hover hover>p");
								startSelectorImage(demoImages[this.id]);
								showOne($(this).attr('id') + "Text");
				}, function () {
								$(this).removeClass("hover hover>p");
								startSelectorImage(demoImages[selectedChannelID]);
								showOne($('.activeChannel').attr('id') + "Text");
				});

// channel selector functions change color on hover for channel selector types

$(".channelSelector div").hover(function () {
				$(this).addClass("hover hover>p");
				selectorImage(demoImages[this.id]);
}, function () {
				$(this).removeClass("hover hover>p");
				selectorImage(demoImages[selectedChannelID]);
});

// sets template channel demo image on start selector page
function startSelectorImage(image) {
				var element = document.getElementById("startDemoImage");
				element.setAttribute("src", image);
}

// sets template channel demo image on channel selector page
function selectorImage(image) {
				var element = document.getElementById("demoImage");
				element.setAttribute("src", image);
}

//sets active channel

$(".startSelector div")
				.click(function setActiveChannel(id) {
								$('.activeChannel').removeClass("activeChannel");
								selectedChannelID = this.id;
								$(this).addClass("activeChannel");
				});

$(".channelSelector div").click(function setActiveChannel(id) {
				$('.activeChannel').removeClass("activeChannel");
				selectedChannelID = this.id;
				$(this).addClass("activeChannel");
});

// sets selected channel to active on page load

$(document).ready(function () {
				startSelectorImage(demoImages[selectedChannelID]);
});

$(".channelSelectButton").click(function (event) {

				console.log("selected channel " + selectedChannelID)
				switch (selectedChannelID) {
								case "7":
												console.log("I'm here!")$("#build").show();
												$("#startSelectorPage").hide();
												selectedChannelID = "0"
												break;

								case "8":
												$("#edit").show();
												getChannelAndClone("0rUmexIHBw");
												returnedOrg = newOrg;
												$("#startSelectorPage").hide();
												break;

								case "0":
												$("#edit").show();
												getChannelAndClone("UbFSsTDzQX");
												$("#build").hide();
												break;

								case "1":
												$("#edit").show();
												getChannelAndClone("UbFSsTDzQX");
												$("#build").hide();
												break;

								case "2":
												$("#edit").show();
												getChannelAndClone("UbFSsTDzQX");
												$("#build").hide();
												break;

								case "3":
												$("#edit").show();
												getChannelAndClone("UbFSsTDzQX");
												$("#build").hide();
												break;

								case "4":
												$("#edit").show();
												getChannelAndClone("aF8GBEnpqU");
												$("#build").hide();
												break;

								case "5":
												$("#edit").show();
												getChannelAndClone("UbFSsTDzQX");
												$("#build").hide();
												break;
				}
});

// ****************************************************editor UI
// functions******************************************** displays different edit
// zones and editor containers based on hovering over editor buttons

$(".editor").hover(function () {
				switch (this.id) {
								case "addHeader":
												$("#buildHeader").addClass("highlightEditor");
												hideShow("editorWindow", "pageHeaderEditor");
												break;

								case "addLikemojis":
												$("#likemojiGroupCollection").addClass("highlightEditor");
												hideShow("editorWindow", "likemojisEditor");
												break;

								case "addCategories":
												$("#categories").addClass("catHighlightEditor");
												hideShow("editorWindow", "categoriesEditor");
												break;
				}

}, function () {
				$(".highlightEditor").removeClass("highlightEditor");
				$(".catHighlightEditor").removeClass("catHighlightEditor");
				hideShow("editorWindow", activeEditorWindow);
});

// highlights editor zone and editor window

function hideShow(classname, idname) {

				$('.' + classname).hide();
				$('#' + idname).show();
}

//selects active editor window

$(".editor")
				.click(function (event) {

								switch (this.id) {
												case "addHeader":
																activeEditorWindow = "pageHeaderEditor"
																break;

												case "addLikemojis":
																activeEditorWindow = "likemojisEditor"
																break;

												case "addCategories":
																activeEditorWindow = "categoriesEditor"
																break;
								}

								$(".editor").removeClass("active");

								$(this).toggleClass("active");

				});

$(".singleMultiSwitch").click(function (event) {
				var buttonID = "#" + this.id;
				singleMultiToggle(buttonID);

});

function singleMultiToggle(id) {

				switch (id) {
								case "#singlePageSelect":
												$(".categories").hide()$("#categoryEditorButton").hide()break;

								case "#multiPageSelect":
												$(".categories").fadeIn()$("#categoryEditorButton").fadeIn()break;
				}

				$(".singleMultiSwitch").removeClass("active");

				$(id).addClass("active");

};

// *****************************************header image uploader functions for
// editor************************************** don't think this is being used
// currently - might need for fabric js and cropper function readURL(input) {
//  if (input.files && input.files[0]) {         var reader = new FileReader();
//        reader.onload = function(e) {             $('#buildHeader
// img').attr('src', ''+e.target.result +'');
// $('#buildHeader').hide();             $('#buildHeader').fadeIn(650);
//    var image = new Image(); 			image.src = ''+e.target.result +''; 			var
// file = new Parse.File("header.jpg", { base64: image.src });
// 			console.log(image);         }
// reader.readAsDataURL(input.files[0]);     } } listens for imageUpload ID
// (headerImage) input and calls stores header image to parse as pf file and then
// loads image into head display area

$("#saveEditedHeader").click(function () {

				// var name = $('#imageUpload')[0].files[0].name;   $("#headerName").text(name);

				groupSelected.set("newHeader", headerParseFile);

				groupSelected.set("newIpadHeader", ipadParseFile);

				groupSelected
								.save()
								.then((group) => {
												// Execute any logic that should take place after the object is saved.
												console.log("header saved");

												$('#buildHeader img').attr('src', groupSelected.attributes.newHeader.url());
												$('#buildHeader').hide();
												$('#buildHeader').fadeIn(650);
												$("#imageUpload")[0].value = '';

								}, (error) => {
												// Execute any logic that should take place if the save fails. error is a
												// Parse.Error with an error code and message.
												alert('Failed to create new object, with error code: ' + error.message);
								});

});

//uploads a likemoji image from category editor modal

$("#likemojiEditorImageButton").click(function () {

				var fileUploadControl = $("#likemojiEditorImageInput")[0];
				if (fileUploadControl.files.length > 0) {
								var file = fileUploadControl.files[0];
								var name = fileUploadControl.files[0].name;
								parseFile = new Parse.File(name, file);

								parseFile
												.save()
												.then(function () {
																// $('#likemojiPreview').hide();
																$('#likemojiPreview').attr('src', parseFile._url);
																// $('#likemojiPreview').fadeIn(650);
																console.log(parseFile._url);

																// The file has been saved to Parse.
												}, function (error) {
																// The file either could not be read, or could not be saved to Parse.
												});
								$("#likemojiEditorImageInput")[0].value = '';
				};
});

// uploads mobile header image to parse and sets the preview image src

$("#headerEditorImageButton").click(function () {

				var fileUploadControl = $("#imageUpload")[0];
				if (fileUploadControl.files.length > 0) {
								var file = fileUploadControl.files[0];
								var name = fileUploadControl.files[0].name;
								headerParseFile = new Parse.File(name, file);

								headerParseFile
												.save()
												.then(function () {

																$('#headerPreview').attr('src', headerParseFile._url);

																console.log(headerParseFile._url);

																// The file has been saved to Parse.
												}, function (error) {
																// The file either could not be read, or could not be saved to Parse.
												});

				};
});

// uploads mobile header image to parse and sets the preview image src

$("#ipadHeaderEditorImageButton").click(function () {
				console.log("ipad upload clicked")

				var fileUploadControl = $("#ipadImageUpload")[0];
				if (fileUploadControl.files.length > 0) {
								var file = fileUploadControl.files[0];
								var name = fileUploadControl.files[0].name;
								ipadParseFile = new Parse.File(name, file);

								ipadParseFile
												.save()
												.then(function () {

																$('#ipadHeaderPreview').attr('src', ipadParseFile._url);

																console.log(ipadParseFile._url);

																// The file has been saved to Parse.
												}, function (error) {
																// The file either could not be read, or could not be saved to Parse.
												});

				};
});

//saves edited likemoji when editor modal is closed with save button

$("#saveEditedLikemoji").click(function (event) {

				var likemojiNamesEN = $("#likemojiName").val();

				likemoji.set("names", {en: likemojiNamesEN});

				if (parseFile != undefined) {
								likemoji.set("x3", parseFile);
				};

				likemoji
								.save()
								.then(async(returnedLikemoji) => {
												// Execute any logic that should take place after the object is saved.
												console.log("likemoji saved");

												await returnedLikemoji;
												document
																.getElementById("likemojisContainer")
																.innerHTML = '';
												displayCollectionLikemojis();
												parseFile = undefined;

								}, (error) => {
												// Execute any logic that should take place if the save fails. error is a
												// Parse.Error with an error code and message.
												alert('Failed to create new object, with error code: ' + error.message);
								});
});

//uploads a category image from category editor modal

$("#categoryImageButton").click(function () {

				var fileUploadControl = $("#categoryImageInput")[0];
				if (fileUploadControl.files.length > 0) {
								var file = fileUploadControl.files[0];
								var name = fileUploadControl.files[0].name;
								parseFile = new Parse.File(name, file);

								parseFile
												.save()
												.then(function () {
																// $('#categoryPreview').hide();
																$('#categoryPreview').attr('src', parseFile._url);
																// $('#categoryPreview').fadeIn(650);
																console.log(parseFile._url);

																// The file has been saved to Parse.
												}, function (error) {
																// The file either could not be read, or could not be saved to Parse.
												});
								$("#categoryImageInput")[0].value = '';
				};
});

//saves category when editor modal is closed with save button

$("#saveCategory").click(function (event) {

				var categoryText = $("#categoryDisplayName").val();
				var categoryNameInternal = $("#categoryName").val();
				var categoryTextEN = {
								en: categoryText
				};
				if ($('#disableCat').is(":checked")) {
								var disabled = 1
				} else {
								var disabled = 0
				};

				if (group == undefined) {
								group = new Group();
								group.set("organizationID", returnedOrg.id);

								group.set("order", groups.length + 1);
								group.set("newHeader", groups[0].attributes.newHeader);
								group.set("callOuts", {en: "Connect with us!"});
								group.set("likemojis", []);
								groups.push(group);
				};

				group.set("name", categoryNameInternal);
				group.set("names", categoryTextEN);
				group.set("disable", disabled);

				if (parseFile != undefined) {
								group.set("newCategoryImage", parseFile);
								console.log("skipped")
				};

				// need to add "else" above to handle if user adds a category and doesn't upload
				// an image.. should default to a default parse image we host - should do the
				// same for the header as well - currently it just duplicates the main page
				// header here...

				group
								.save()
								.then(async(group) => {
												// Execute any logic that should take place after the object is saved.
												console.log("category image saved");
												goToPage(groups[0].id);
												document
																.getElementById("categoriesInEditor")
																.innerHTML = ""
												displayEditorCategories();
												parseFile = undefined;

								}, (error) => {
												// Execute any logic that should take place if the save fails. error is a
												// Parse.Error with an error code and message.
												alert('Failed to create new object, with error code: ' + error.message);
								});
});

$("#addNewCategories").click(function (event) {
				group = undefined;
});

async function returnDisplayLikemojis(orgID) {

				importedLikemojis = await getLikemojis(orgID);
				sortImportedLikemojisByName();
				document
								.getElementById("likemojisContainer")
								.innerHTML = "";
				displayCollectionLikemojis();
}

//creates a new likemoji from file uploader

async function createLikemoji(i) {
				var file = fileUploadControl[i];
				var name = fileUploadControl[i].name;
				var parseFile = new Parse.File(name, file);
				var likemojiNamesEN = name.slice(0, -4);

				parseFile
								.save()
								.then(function () {

												newLikemoji = new Likemoji();

												newLikemoji.set("x3", parseFile);
												newLikemoji.set("name", name.slice(0, -4));
												newLikemoji.set("names", {en: likemojiNamesEN});
												newLikemoji.set("organizationID", returnedOrg.id);
												newLikemoji.set("organizationName", returnedOrg.get("name"));
												newLikemoji
																.save()
																.then(() => {
																				// Execute any logic that should take place after the object is saved.
																				returnDisplayLikemojis(returnedOrg.id);

																				$('#uploadComplete').fadeIn(1650);

																}, (error) => {
																				// Execute any logic that should take place if the save fails. error is a
																				// Parse.Error with an error code and message.
																				alert('Failed to create new object, with error code: ' + error.message);
																});
												// The file has been saved to Parse.
								}, function (error) {
												// The file either could not be read, or could not be saved to Parse.
								});

}

$("#addLikemojisModalButton")
				.change(function () {

								$('#uploadComplete').hide();

				});

$("#likemojisImageButton").click(async function () {

				fileUploadControl = document
								.getElementById("likemojisImageInput")
								.files;
				if (fileUploadControl.length > 0) {

								for (var i = 0; i < fileUploadControl.length; i++) {

												createLikemoji(i)

								};

								$("#likemojisImageInput")[0].value = '';
				}

});

async function loadUnsplash(searchterm) {

				try {
								await $.ajax({
												url: "https://rocky-tundra-24072.herokuapp.com/unsplash?search_term=" + searchterm,
												dataType: "json",
												success: function (data) {
																console.log(data);
																unsplashResults = data;
												}
								});

				} catch (err) {
								// TypeError: failed to fetch
								alert(err);
				}
}

$("#unsplashSearchModal").click(getDisplayUnsplash);

async function prepThumbsContainerForImages() {
				document
								.getElementById("thumbsContainer")
								.innerHTML = ""
				var div = document.createElement("div");
				div.setAttribute("class", "grid-sizer");
				var element = document.getElementById("thumbsContainer");
				element.appendChild(div);

				var div = document.createElement("div");
				div.setAttribute("class", "gutter-sizer");
				var element = document.getElementById("thumbsContainer");
				element.appendChild(div);

}

async function getDisplayUnsplash() {
				await prepThumbsContainerForImages()
				await loadUnsplash("smoke");
				await displayUnsplashSearch();
				doMasonry();
}

async function searchUnsplash(search) {
				await prepThumbsContainerForImages()
				await loadUnsplash(search);
				await displayUnsplashSearch();
				doMasonry();
}

function displayUnsplashSearch() {
				for (var i = 0; i < unsplashResults.resp.results.length; i++) {

								var img = document.createElement("img");
								var div = document.createElement("div");

								img.setAttribute("src", unsplashResults.resp.results[i].urls["small"]);
								// img.setAttribute("class", "thumbImages");

								div.setAttribute("class", "grid-item");
								div.appendChild(img);

								var element = document.getElementById("thumbsContainer");
								element.appendChild(div);
				};

}

$("#unsplashImageButton")
				.click(function (event) {
								var search = $("#unsplashImageInput").val();
								searchUnsplash(search);
				});

$("#editTheme").click(function (event) {
				displayStyle()
				$("#pageHeaderEditor").hide();
				$("#colorThemeEditor").show();
});

// layout Masonry after each image loads

async function doMasonry() {
				$grid
								.imagesLoaded()
								.progress(function () {
												$grid.masonry();
												$grid.masonry('reloadItems');
								});
}

// init Masonry

var $grid = $('.grid').masonry({columnWidth: '.grid-sizer', itemSelector: '.grid-item', percentPosition: true, gutter: 10});

// saves call to action for group to parse and displays in channel

$("#callToActionSave").click(function (event) {

				var callOutText = $("#editorCallOut").val();
				var callOutsObject = {
								en: callOutText
				};

				groupSelected.set("callOuts", callOutsObject);
				groupSelected
								.save()
								.then((group) => {
												// Execute any logic that should take place after the object is saved.

												$('#callout').hide();
												$('#callout').text(groupSelected.attributes.callOuts.en);
												$('#callout').fadeIn(650);

								}, (error) => {
												// Execute any logic that should take place if the save fails. error is a
												// Parse.Error with an error code and message.
												alert('Failed to create new object, with error code: ' + error.message);
								});
});

//saves extended info text for group to parse

$("#editExtendedInfo").click(function (event) {

				var extendedInfoText = $("#categoryExtendedInfo").val();
				var extenedInfoObject = {
								en: extendedInfoText
				};

				groupSelected.set("descriptions", extenedInfoObject);
				groupSelected
								.save()
								.then((group) => {
												// Execute any logic that should take place after the object is saved.

								}, (error) => {
												// Execute any logic that should take place if the save fails. error is a
												// Parse.Error with an error code and message.
												alert('Failed to create new object, with error code: ' + error.message);
								});
});

// sets editor buttons when back button is pressed and also returns phone display
// to main page group

$("#backFromGroup").click(function (event) {

				goToPage(groups[0].id);
				$("#phoneDisplayBackButton").hide();
				$("#singleMultiToggle").fadeIn(650);
				singleMultiToggle("#multiPageSelect");
				cancelLikemojisAdd();

});

// sets editor buttons to subcategory edit view and sets phone display to the
// category that was clicked

$("#categories").on('click', '.category', function () {

				$("#likemojiGroupCollection").removeClass("likemojiGroupCollectionNone");
				$("#likemojiGroupCollection").addClass("likemojiGroupCollection-area");
				$("#likemojiGroupCollection").addClass("categoryLikemojis");

				goToPage(this.id);

				if (goToPage(this.id) !== categoriesSorted[0].id) {

								$("#phoneDisplayBackButton").show();
								singleMultiToggle("#singlePageSelect");
								$("#singleMultiToggle").hide();
								cancelLikemojisAdd();

				} else {};

});

//Category editor sort function

var catOrder;

$(function () {
				$('#categoriesInEditor').sortable({
								update: function (event, ui) {
												catOrder = $(this).sortable('toArray')
												// $("#catOrderText").text (catOrder);
												setNewGroupOrder();
								}
				});
});

//sets group order to order that was set in the dragable editor

function setNewGroupOrder() {
				//user catOrder above to update all groups order

				for (var i = 0; i < catOrder.length; i++) {
								var thisID = catOrder[i].substr(0, catOrder[i].length - 1);
								group = groups.find(x => x.id === thisID)
								var order = i + 1;
								group.set("order", order);

				};
				Parse
								.Object
								.saveAll(groups)
								.then(async(groupsSaved) => {

												for (var i = 1; i < groups.length; i++) {
																console.log(groups[i].id + ' ' + groups[i].attributes.order)
												};

												sortCategories();
												goToPage(groups[0].id);

								}, (error) => {

												reject();
												alert('Failed to create new objects, with error code: ' + error.message);
								});

}

//opens category editor modal for selected (clicked) category in editor window

$("#categoriesInEditor")
				.on('click', 'li', function () {

								// alert(this.id)
								var categoryID = this
												.id
												.substr(0, this.id.length - 1);
								group = groups.find(x => x.id === categoryID)

								$("#categoryName").val(group.attributes.name);
								$("#categoryDisplayName").val(group.attributes.names.en);
								$("#categoryImageInput").val("");

								if (group.attributes.disable == 1) {
												$("#disableCat").prop('checked', true);;
								} else {
												$("#disableCat").prop('checked', false);;
								}

								// var name = group.attributes.newCategoryImage._name

								$('#categoryPreview').hide();
								$('#categoryPreview').attr('src', group.attributes.newCategoryImage.url());
								$('#categoryPreview').fadeIn(650);
								$("#categoryImageName").text(group.attributes.newCategoryImage._name);

				});

//opens header editor modal

$("#uploadHeader").click(function (event) {

				$("#imageUpload").val("");

				$('#headerPreview').attr('src', groupSelected.attributes.newHeader.url());

				$("#headerEditorImageName").text(groupSelected.attributes.newHeader._name);

				$("#ipadImageUpload").val("");

				$('#ipadHeaderPreview').attr('src', groupSelected.attributes.newIpadHeader.url());

				$("#ipadHeaderEditorImageName").text(groupSelected.attributes.newIpadHeader._name);

});

//opens likemoji editor modal for selected (clicked) category in editor window

$(".likemojisContainer-area").on('click', '.likemojis', function () {

				// alert("clicked");
				var thisLikemojiID = this.id
				likemoji = importedLikemojis.find(x => x.id === thisLikemojiID)

				$("#likemojiName").val(likemoji.attributes.names.en);
				$("#likemojiEditorImageInput").val("");

				// var imageName = likemoji.attributes.x3._name

				$('#likemojiPreview').hide();
				$('#likemojiPreview').attr('src', likemoji.attributes.x3.url());
				$('#likemojiPreview').fadeIn(650);

				$("#LikemojiEditorImageName").text(likemoji.attributes.x3._name);

});

// dragable likemojis - adds and removes likemoji from current category (group)
// - doesn't save to parse without hitting save button!!!

function dragfix() {

				//when a likemoji is dragged
				$(function () {
								$(".likemojis").draggable({
												scope: 'dragLikemojis',
												revertDuration: 100,
												helper: 'clone',
												appendTo: 'body',
												start: function (event, ui) {

																if (groupSelected.attributes.likemojis.length < 1) {
																				$("#likemojiGroupCollection").removeClass("likemojiGroupCollectionNone");
																				// $("#likemojiGroupCollection").addClass("likemojiGroupCollection-area");
																				$("#likemojiGroupCollection").addClass("mainpageLikemojis");

																};
																$("#likemojiGroupCollection").addClass("highlightEditor");

												}
								});
				});

				//when a likemoji is dropped in the editor container

				$(".likemojisContainer-area").droppable({
								scope: 'dragLikemojis',
								drop: function (event, ui) {
												var area = $(this)
																.find(".area")
																.html();
												var likemoji = $(ui.draggable).html()
												var currentID = ui
																.draggable
																.prop('id')
												// console.log(currentID);

												$("#likemojiGroupCollection").removeClass("highlightEditor");

												if (groupSelected.attributes.likemojis.length < 2) {
																$("#likemojiGroupCollection").addClass("likemojiGroupCollectionNone")
																// $("#likemojiGroupCollection").removeClass("likemojiGroupCollection-area");
																$("#likemojiGroupCollection").removeClass("mainpageLikemojis");
												};

												var mojitext = ui
																.draggable
																.children('div.likemojiNames')
												mojitext.removeClass('channelText');
												mojitext.css("color", "");

												$("#cancelSaveGroup").show();

												var index = groupSelected
																.attributes
																.likemojis
																.indexOf(currentID);
												if (index !== -1) {
																groupSelected
																				.attributes
																				.likemojis
																				.splice(index, 1);
												};

												$(ui.draggable)
																.detach()
																.css({top: 0, left: 0})
																.appendTo(this);

								}
				})

				//when a likemoji is dragged into a channel

				$(".likemojiGroupCollection-area").droppable({
								scope: 'dragLikemojis',
								drop: function (event, ui) {
												var area = $("this")
																.find(".area")
																.html();
												var likemojiDrag = $(ui.draggable).html();
												var currentID = ui
																.draggable
																.prop('id')

												$("#likemojiGroupCollection").removeClass("highlightEditor");

												if (groupSelected.id == groups[0].id) {

																if (likemojiGroupCollection.children.length >= 3) {
																				alert("You can only add 3 likemojis here unless you switch to single page mode")
																				return
																};
												};

												var index = groupSelected
																.attributes
																.likemojis
																.indexOf(currentID);
												if (index !== -1) {
																alert("This likemoji is already being used on this page");
																return;
												};

												$("#cancelSaveGroup").show();

												$(ui.helper).remove();

												groupSelected
																.attributes
																.likemojis
																.push(currentID)
												goToPage(groupSelected.id);

												console.log(currentID);

												$(ui.draggable).detach();
								}
				})
}

$("#saveLikemojiAdd")
				.click(function (event) {
								groupSelected.set("likemojis", groupSelected.attributes.likemojis);
								groupSelected
												.save()
												.then((group) => {

																$("#cancelSaveGroup").hide();

												}, (error) => {
																// Execute any logic that should take place if the save fails. error is a
																// Parse.Error with an error code and message.
																alert('Failed to create new object, with error code: ' + error.message);
												});

				});

$("#cancelLikemojiAdd").click(function (event) {

				cancelLikemojisAdd();

});

async function cancelLikemojisAdd() {
				await getGroups(returnedOrg.id);
				goToPage(groupSelected.id);
				document
								.getElementById("likemojisContainer")
								.innerHTML = '';
				displayCollectionLikemojis()
				$("#cancelSaveGroup").hide();

}

//sign up / create new user
async function newUser() {
				console.log("function called")

				var user_password = $("#inputPassword").val();
				var user_email = $("#inputEmail").val();

				console.log(user_email + " " + user_password)

				var user = new Parse.User();
				user.set("username", user_email);
				user.set("password", user_password);
				user.set("email", user_email);

				// other fields can be set just like with Parse.Object user.set("phone", "");
				try {
								await user.signUp();
								currentUser = await Parse
												.User
												.current();

								$("#signUpForm").hide();
								$("#createChannel").show();
								$("#login").hide();
								$("#signup").hide();
								$("#logout").show();

								console.log("user is signed up")
				} catch (error) {
								// Show the error message somewhere and let the user try again.
								alert("Error: " + error.code + " " + error.message);
								console.log("not signed up")
				}
}

//listens for signup Submit button

$("#signUpUser2")
				.click(function (event) {

								newUser();

				});

//listens for login Submit button

$("#loginUser").click(function (event) {

				userLogin();

});

$("#startBuild").click(function (event) {

				$("#getStartedIntro").hide();
				$("#signUpForm").show();
				$(".nav li").removeClass("active"); //this will remove the active class from                                      //previously active menu item
				$("#signup").addClass('active');

});

//starts new channel build flow from logged in

$("#startBuild2").click(function (event) {

				$("#loginChoice").hide();
				$("#createChannel").show();

});

//listens for navbar login button

$("#login").click(function (event) {
				$("#getStartedIntro").hide();
				$("#loginForm").show();
				$("#signUpForm").hide();

				$(".nav li").removeClass("active"); //this will remove the active class from
				//previously active menu item
				$("#login").addClass('active');

});

//listens for navbar signup button

$("#signup").click(function (event) {
				$("#getStartedIntro").hide();
				$("#loginForm").hide();
				$("#signUpForm").show();

				$(".nav li").removeClass("active"); //this will remove the active class from
				//previously active menu item
				$("#signup").addClass('active');

});

//listens for navbar logout button

$("#logout").click(function (event) {
				logout();

});

//logs user in
async function userLogin() {
				var user_password = $("#loginPassword").val();
				var user_email = $("#loginEmail").val();
				const user = await Parse
								.User
								.logIn(user_email, user_password);
				currentUser = Parse
								.User
								.current();
				if (currentUser) {

								userChannels = await getUserChannels();
								displayUserChannelList();

								$("#loginForm").hide();
								$("#loginChoice").show();
								$("#login").hide();
								$("#signup").hide();
								$("#logout").show();
								// 		$("#loginForm").show();

								console.log("loggedin")
				} else {
								console.log("loggedout")
				}
}

//displays list of channels owned by current logged in user

function displayUserChannelList() {
				for (var i = 0; i < userChannels.length; i++) {

								var li = document.createElement("li");

								li.setAttribute("id", userChannels[i].id)
								li.setAttribute("class", "channelList")
								li.innerHTML = userChannels[i].attributes.name

								var element = document.getElementById("userChannelList");
								element.appendChild(li);

								// userChannels[i]
				};

}

//loads existing user channel to editor
$("#userChannelList")
				.on('click', 'li', function () {

								// alert(this.id)

								loadUserChannel(this.id);

								$("#edit").show();
								$("#loginChoice").hide();

				});

async function logout() {
				Parse
								.User
								.logOut()
								.then(() => {
												currentUser = Parse
																.User
																.current(); // this will now be null
												if (currentUser) {
																console.log("loggedin")
												} else {
																console.log("loggedout")

																window.location.href = 'file:///Users/alexbarrett/Desktop/likemoji%20website%20and%20builder/likemoji%20' +
																								'builder/buildChannel.html';
												}
								});
}
//stops page refresh when enter is pressed while in form input field
$('form')
				.keypress(function (event) {
								return event.keyCode != 13;
				});

//returns list of channels for current user

async function getUserChannels() {

				const query = new Parse.Query(Organization);
				query.equalTo("editors", currentUser.id);

				try {

								return await query.find();

				} catch (err) {
								// TypeError: failed to fetch
								alert(err);
				}
}
