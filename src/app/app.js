'use strict'
import Group from "./modules/groups.js";
import Likemoji from "./modules/likemojis.js";
import getStartSelectors from "./modules/startselector.js";
//import Startselector from "./modules/startselector.js";
import { ChannelStyle, saveNewStyle, getStyle } from "./modules/styles.js";
import getUserChannels from "./modules/users.js";
import cloneChannel from "./modules/clonechannel.js";
import Organization from "./modules/organizations.js";
// import page from 'https://unpkg.com/page/page.js'; this has to go in html
// page Alex's test environment
Parse.initialize("fg8ZXCHKfBOWme42LGPA");
Parse.serverURL = "https://lmx-stage-alex.herokuapp.com/parse";

// imported objects var importedLikemojis = [] // array of likemojis for
// imported organization

var user = new Parse.User();

var styles = new ChannelStyle();
var groups = []; //array of groups for imported organization - unsorted
var categoriesSorted = []; //array of groups for imported organization - sorted by "order" using sortCategories() function
var userChannels = []; //array of user channels for logged-in user

var fileUploadControl;

// channel selector vars
//TODO put in DB
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
];
var selectedChannelID = "7";
var returnedStartSelectors = []; //array of StartSelector objects (names, text, images of start options) ie: "start from template" or "start from scratch"

//editor vars
var editors = []; //users ids able to edit the channel to populate channel list
var activeEditorWindow = "pageHeaderEditor";
var imagefile; //image to be saved to S3
var unsplashResults = []; //array of images returned from unsplash search
var parseFile;
var headerParseFile;
var ipadParseFile;

// returns what is being clicked $('body').click(function(event) {   var target
// = $(event.target);   console.log(target); }); *********build page
// functions*********** loads org objects and builds page...
async function getChannel(channelId) {
	styles = await getStyle(channelId);
	likemojis = await getLikemojis(channelId);
	returnedOrg = await getOrganization(channelId);
	groups = await getGroups(channelId);
	categoriesSorted = await sortCategories();
}

async function displayChannel() {
	await buildPage(groups[0].id);
	await displayCollectionLikemojis();
	await displayEditorCategories();
	displayStyle();
}

async function getChannelAndClone(channelId) {
	//await getChannel(id);
	await cloneChannel(channelId);
	await getChannel(organization.id);
	displayChannel();
}

async function loadUserChannel(id) {
	await getChannel(id);
	displayChannel(id);
}

//************save new channel objects*************

function saveOrgName() {
	organization.set("name", $("#orgName").val());

	organization.save().then(
		org => {
			// Execute any logic that should take place after the object is saved.
			// alert('New object created with objectId: ' + org.id); alert('New object
			// created with name: ' + org.get("name")); organization

			$("#createChannel").hide();
			$("#startSelectorPage").show();
		},
		error => {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		}
	);
}

function saveAddressInfo() {
	organization.set("address", $("#orgAddress").val());
	organization.set("city", $("#city").val());
	organization.set("state", $("#state").val());
	organization.set("phoneNumber", $("#phoneNumber").val());

	organization.save().then(
		org => {
			// Execute any logic that should take place after the object is saved.

			$("#saveAddress").hide();
			$("#startSelectorPage").show();
		},
		error => {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		}
	);
}

// start selector functions change color on hover for start selector types
function showOne(id) {
	$(".startSelectorText").hide();
	$("#" + id).show();
}

$(".startSelector div").hover(
	function() {
		$(this).addClass("hover hover>p");
		startSelectorImage(demoImages[this.id]);
		showOne($(this).attr("id") + "Text");
	},
	function() {
		$(this).removeClass("hover hover>p");
		startSelectorImage(demoImages[selectedChannelID]);
		showOne($(".activeChannel").attr("id") + "Text");
	}
);

// channel selector functions change color on hover for channel selector types

$(".channelSelector div").hover(
	function() {
		$(this).addClass("hover hover>p");
		selectorImage(demoImages[this.id]);
	},
	function() {
		$(this).removeClass("hover hover>p");
		selectorImage(demoImages[selectedChannelID]);
	}
);

// sets template channel demo image on start selector page
function startSelectorImage(image) {
	var element = document.getElementById("startDemoImage");
	if (element) element.setAttribute("src", image);
}

// sets template channel demo image on channel selector page
function selectorImage(image) {
	var element = document.getElementById("demoImage");
	element.setAttribute("src", image);
}

//sets active channel

$(".startSelector div").click(function setActiveChannel(id) {
	$(".activeChannel").removeClass("activeChannel");
	selectedChannelID = this.id;
	$(this).addClass("activeChannel");
});

$(".channelSelector div").click(function setActiveChannel(id) {
	$(".activeChannel").removeClass("activeChannel");
	selectedChannelID = this.id;
	$(this).addClass("activeChannel");
});

// sets selected channel to active on page load

$(document).ready(function() {
	startSelectorImage(demoImages[selectedChannelID]);
});

$(".channelSelectButton").click(function(event) {
	console.log("selected channel " + selectedChannelID);
	switch (selectedChannelID) {
		case "7":
			console.log("I'm here!");
			$("#build").show();
			$("#startSelectorPage").hide();
			selectedChannelID = "0";
			break;

		case "8":
			$("#edit").show();
			getChannelAndClone("0rUmexIHBw");
			returnedOrg = organization;
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

$(".editor").hover(
	function() {
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
	},
	function() {
		$(".highlightEditor").removeClass("highlightEditor");
		$(".catHighlightEditor").removeClass("catHighlightEditor");
		hideShow("editorWindow", activeEditorWindow);
	}
);

// highlights editor zone and editor window

function hideShow(classname, idname) {
	$("." + classname).hide();
	$("#" + idname).show();
}

//selects active editor window

$(".editor").click(function(event) {
	switch (this.id) {
		case "addHeader":
			activeEditorWindow = "pageHeaderEditor";
			break;

		case "addLikemojis":
			activeEditorWindow = "likemojisEditor";
			break;

		case "addCategories":
			activeEditorWindow = "categoriesEditor";
			break;
	}

	$(".editor").removeClass("active");

	$(this).toggleClass("active");
});

$(".singleMultiSwitch").click(function(event) {
	var buttonID = "#" + this.id;
	singleMultiToggle(buttonID);
});

function singleMultiToggle(id) {
	switch (id) {
		case "#singlePageSelect":
			$(".categories").hide();
			$("#categoryEditorButton").hide();
			break;

		case "#multiPageSelect":
			$(".categories").fadeIn();
			$("#categoryEditorButton").fadeIn();
			break;
	}

	$(".singleMultiSwitch").removeClass("active");

	$(id).addClass("active");
}

// *****************************************header image uploader functions for
// editor************************************** don't think this is being used
// currently - might need for fabric js and cropper function readURL(input) { if
// (input.files && input.files[0]) {         var reader = new FileReader();
// reader.onload = function(e) {             $('#buildHeader img').attr('src',
// ''+e.target.result +''); $('#buildHeader').hide();
// $('#buildHeader').fadeIn(650);    var image = new Image(); 			image.src =
// ''+e.target.result +''; 			var file = new Parse.File("header.jpg", { base64:
// image.src }); 			console.log(image);         }
// reader.readAsDataURL(input.files[0]);     } } listens for imageUpload ID
// (headerImage) input and calls stores header image to parse as pf file and
// then loads image into head display area

$("#saveEditedHeader").click(function() {
	// var name = $('#imageUpload')[0].files[0].name;   $("#headerName").text(name);
	groupSelected.set("newHeader", headerParseFile);
	groupSelected.set("newIpadHeader", ipadParseFile);
	groupSelected.save().then(
		group => {
			// Execute any logic that should take place after the object is saved.
			console.log("header saved");

			$("#buildHeader img").attr(
				"src",
				groupSelected.attributes.newHeader.url()
			);
			$("#buildHeader").hide();
			$("#buildHeader").fadeIn(650);
			$("#imageUpload")[0].value = "";
		},
		error => {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		}
	);
});

//uploads a likemoji image from category editor modal

$("#likemojiEditorImageButton").click(function() {
	var fileUploadControl = $("#likemojiEditorImageInput")[0];
	if (fileUploadControl.files.length > 0) {
		var file = fileUploadControl.files[0];
		var name = fileUploadControl.files[0].name;
		parseFile = new Parse.File(name, file);

		parseFile.save().then(
			function() {
				// $('#likemojiPreview').hide();
				$("#likemojiPreview").attr("src", parseFile._url);
				// $('#likemojiPreview').fadeIn(650);
				console.log(parseFile._url);

				// The file has been saved to Parse.
			},
			function(error) {
				// The file either could not be read, or could not be saved to Parse.
			}
		);
		$("#likemojiEditorImageInput")[0].value = "";
	}
});

// uploads mobile header image to parse and sets the preview image src
$("#headerEditorImageButton").click(function() {
	var fileUploadControl = $("#imageUpload")[0];
	if (fileUploadControl.files.length > 0) {
		var file = fileUploadControl.files[0];
		var name = fileUploadControl.files[0].name;
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
	var fileUploadControl = $("#ipadImageUpload")[0];
	if (fileUploadControl.files.length > 0) {
		var file = fileUploadControl.files[0];
		var name = fileUploadControl.files[0].name;
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

//saves edited likemoji when editor modal is closed with save button

$("#saveEditedLikemoji").click(function(event) {
	var likemojiNamesEN = $("#likemojiName").val();
	likemoji.set("names", { en: likemojiNamesEN });
	if (parseFile != undefined) {
		likemoji.set("x3", parseFile);
	}
	likemoji.save().then(
		async returnedLikemoji => {
			// Execute any logic that should take place after the object is saved.
			console.log("likemoji saved");
			await returnedLikemoji;
			document.getElementById("likemojisContainer").innerHTML = "";
			displayCollectionLikemojis();
			parseFile = undefined;
		},
		error => {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		}
	);
});

//uploads a category image from category editor modal

$("#categoryImageButton").click(function() {
	var fileUploadControl = $("#categoryImageInput")[0];
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
	var categoryText = $("#categoryDisplayName").val();
	var categoryNameInternal = $("#categoryName").val();
	var categoryTextEN = {
		en: categoryText
	};
	if ($("#disableCat").is(":checked")) {
		var disabled = 1;
	} else {
		var disabled = 0;
	}

	if (group == undefined) {
		group = new Group();
		group.set("organizationID", returnedOrg.id);

		group.set("order", groups.length + 1);
		group.set("newHeader", groups[0].attributes.newHeader);
		group.set("callOuts", { en: "Connect with us!" });
		group.set("likemojis", []);
		groups.push(group);
	}

	group.set("name", categoryNameInternal);
	group.set("names", categoryTextEN);
	group.set("disable", disabled);

	if (parseFile != undefined) {
		group.set("newCategoryImage", parseFile);
		console.log("skipped");
	}

	// need to add "else" above to handle if user adds a category and doesn't upload
	// an image.. should default to a default parse image we host - should do the
	// same for the header as well - currently it just duplicates the main page
	// header here...

	group.save().then(
		async group => {
			// Execute any logic that should take place after the object is saved.
			console.log("category image saved");
			goToPage(groups[0].id);
			document.getElementById("categoriesInEditor").innerHTML = "";
			displayEditorCategories();
			parseFile = undefined;
		},
		error => {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		}
	);
});

$("#addNewCategories").click(function(event) {
	group = undefined;
});

async function returnDisplayLikemojis(orgID) {
	importedLikemojis = await getLikemojis(orgID);
	sortImportedLikemojisByName();
	document.getElementById("likemojisContainer").innerHTML = "";
	displayCollectionLikemojis();
}

//creates a new likemoji from file uploader
async function createLikemoji(i) {
	var file = fileUploadControl[i];
	var name = fileUploadControl[i].name;
	var parseFile = new Parse.File(name, file);
	var likemojiNamesEN = name.slice(0, -4);

	parseFile.save().then(
		function() {
			newLikemoji = new Likemoji();

			newLikemoji.set("x3", parseFile);
			newLikemoji.set("name", name.slice(0, -4));
			newLikemoji.set("names", { en: likemojiNamesEN });
			newLikemoji.set("organizationID", returnedOrg.id);
			newLikemoji.set("organizationName", returnedOrg.get("name"));
			newLikemoji.save().then(
				() => {
					// Execute any logic that should take place after the object is saved.
					returnDisplayLikemojis(returnedOrg.id);

					$("#uploadComplete").fadeIn(1650);
				},
				error => {
					// Execute any logic that should take place if the save fails. error is a
					// Parse.Error with an error code and message.
					alert(
						"Failed to create new object, with error code: " + error.message
					);
				}
			);
			// The file has been saved to Parse.
		},
		function(error) {
			// The file either could not be read, or could not be saved to Parse.
		}
	);
}

$("#addLikemojisModalButton").change(function() {
	$("#uploadComplete").hide();
});

$("#likemojisImageButton").click(async function() {
	fileUploadControl = document.getElementById("likemojisImageInput").files;
	if (fileUploadControl.length > 0) {
		for (var i = 0; i < fileUploadControl.length; i++) {
			createLikemoji(i);
		}

		$("#likemojisImageInput")[0].value = "";
	}
});

async function loadUnsplash(searchterm) {
	try {
		await $.ajax({
			url:
				"https://rocky-tundra-24072.herokuapp.com/unsplash?search_term=" +
				searchterm,
			dataType: "json",
			success: function(data) {
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
	document.getElementById("thumbsContainer").innerHTML = "";
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
	await prepThumbsContainerForImages();
	await loadUnsplash("smoke");
	await displayUnsplashSearch();
	doMasonry();
}

async function searchUnsplash(search) {
	await prepThumbsContainerForImages();
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
	}
}

$("#unsplashImageButton").click(function(event) {
	var search = $("#unsplashImageInput").val();
	searchUnsplash(search);
});

$("#editTheme").click(function(event) {
	displayStyle();
	$("#pageHeaderEditor").hide();
	$("#colorThemeEditor").show();
});

// layout Masonry after each image loads

async function doMasonry() {
	$grid.imagesLoaded().progress(function() {
		$grid.masonry();
		$grid.masonry("reloadItems");
	});
}

// init Masonry

var $grid = $(".grid").masonry({
	columnWidth: ".grid-sizer",
	itemSelector: ".grid-item",
	percentPosition: true,
	gutter: 10
});

// saves call to action for group to parse and displays in channel

$("#callToActionSave").click(function(event) {
	var callOutText = $("#editorCallOut").val();
	var callOutsObject = {
		en: callOutText
	};

	groupSelected.set("callOuts", callOutsObject);
	groupSelected.save().then(
		group => {
			// Execute any logic that should take place after the object is saved.

			$("#callout").hide();
			$("#callout").text(groupSelected.attributes.callOuts.en);
			$("#callout").fadeIn(650);
		},
		error => {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		}
	);
});

//saves extended info text for group to parse

$("#editExtendedInfo").click(function(event) {
	var extendedInfoText = $("#categoryExtendedInfo").val();
	var extenedInfoObject = {
		en: extendedInfoText
	};

	groupSelected.set("descriptions", extenedInfoObject);
	groupSelected.save().then(
		group => {
			// Execute any logic that should take place after the object is saved.
		},
		error => {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		}
	);
});

// sets editor buttons when back button is pressed and also returns phone
// display to main page group

$("#backFromGroup").click(function(event) {
	goToPage(groups[0].id);
	$("#phoneDisplayBackButton").hide();
	$("#singleMultiToggle").fadeIn(650);
	singleMultiToggle("#multiPageSelect");
	cancelLikemojisAdd();
});

// sets editor buttons to subcategory edit view and sets phone display to the
// category that was clicked

$("#categories").on("click", ".category", function() {
	$("#likemojiGroupCollection").removeClass("likemojiGroupCollectionNone");
	$("#likemojiGroupCollection").addClass("likemojiGroupCollection-area");
	$("#likemojiGroupCollection").addClass("categoryLikemojis");

	goToPage(this.id);

	if (goToPage(this.id) !== categoriesSorted[0].id) {
		$("#phoneDisplayBackButton").show();
		singleMultiToggle("#singlePageSelect");
		$("#singleMultiToggle").hide();
		cancelLikemojisAdd();
	} else {
	}
});

//Category editor sort function

var catOrder;

$(function() {
	var cats = $("#categoriesInEditor");
	if (cats) {
		if (cats.sortable) {
			cats.sortable({
				update: function(event, ui) {
					catOrder = $(this).sortable("toArray");
					// $("#catOrderText").text (catOrder);
					setNewGroupOrder();
				}
			});
		}
	}
});

//opens category editor modal for selected (clicked) category in editor window

$("#categoriesInEditor").on("click", "li", function() {
	// alert(this.id)
	var categoryID = this.id.substr(0, this.id.length - 1);
	group = groups.find(x => x.id === categoryID);

	$("#categoryName").val(group.attributes.name);
	$("#categoryDisplayName").val(group.attributes.names.en);
	$("#categoryImageInput").val("");

	if (group.attributes.disable == 1) {
		$("#disableCat").prop("checked", true);
	} else {
		$("#disableCat").prop("checked", false);
	}

	// var name = group.attributes.newCategoryImage._name

	$("#categoryPreview").hide();
	$("#categoryPreview").attr("src", group.attributes.newCategoryImage.url());
	$("#categoryPreview").fadeIn(650);
	$("#categoryImageName").text(group.attributes.newCategoryImage._name);
});

//opens header editor modal

$("#uploadHeader").click(function(event) {
	$("#imageUpload").val("");

	$("#headerPreview").attr("src", groupSelected.attributes.newHeader.url());

	$("#headerEditorImageName").text(groupSelected.attributes.newHeader._name);

	$("#ipadImageUpload").val("");

	$("#ipadHeaderPreview").attr(
		"src",
		groupSelected.attributes.newIpadHeader.url()
	);

	$("#ipadHeaderEditorImageName").text(
		groupSelected.attributes.newIpadHeader._name
	);
});

//opens likemoji editor modal for selected (clicked) category in editor window

$(".likemojisContainer-area").on("click", ".likemojis", function() {
	// alert("clicked");
	var thisLikemojiID = this.id;
	likemoji = likemojis.find(x => x.id === thisLikemojiID);

	$("#likemojiName").val(likemoji.attributes.names.en);
	$("#likemojiEditorImageInput").val("");

	// var imageName = likemoji.attributes.x3._name

	$("#likemojiPreview").hide();
	$("#likemojiPreview").attr("src", likemoji.attributes.x3.url());
	$("#likemojiPreview").fadeIn(650);

	$("#LikemojiEditorImageName").text(likemoji.attributes.x3._name);
});

// dragable likemojis - adds and removes likemoji from current category (group)
// - doesn't save to parse without hitting save button!!!

function dragfix() {
	//when a likemoji is dragged
	$(function() {
		$(".likemojis").draggable({
			scope: "dragLikemojis",
			revertDuration: 100,
			helper: "clone",
			appendTo: "body",
			start: function(event, ui) {
				if (groupSelected.attributes.likemojis.length < 1) {
					$("#likemojiGroupCollection").removeClass(
						"likemojiGroupCollectionNone"
					);
					// $("#likemojiGroupCollection").addClass("likemojiGroupCollection-area");
					$("#likemojiGroupCollection").addClass("mainpageLikemojis");
				}
				$("#likemojiGroupCollection").addClass("highlightEditor");
			}
		});
	});

	//when a likemoji is dropped in the editor container

	$(".likemojisContainer-area").droppable({
		scope: "dragLikemojis",
		drop: function(event, ui) {
			var area = $(this)
				.find(".area")
				.html();
			var likemoji = $(ui.draggable).html();
			var currentID = ui.draggable.prop("id");
			// console.log(currentID);

			$("#likemojiGroupCollection").removeClass("highlightEditor");

			if (groupSelected.attributes.likemojis.length < 2) {
				$("#likemojiGroupCollection").addClass("likemojiGroupCollectionNone");
				// $("#likemojiGroupCollection").removeClass("likemojiGroupCollection-area");
				$("#likemojiGroupCollection").removeClass("mainpageLikemojis");
			}

			var mojitext = ui.draggable.children("div.likemojiNames");
			mojitext.removeClass("channelText");
			mojitext.css("color", "");

			$("#cancelSaveGroup").show();

			var index = groupSelected.attributes.likemojis.indexOf(currentID);
			if (index !== -1) {
				groupSelected.attributes.likemojis.splice(index, 1);
			}

			$(ui.draggable)
				.detach()
				.css({ top: 0, left: 0 })
				.appendTo(this);
		}
	});

	//when a likemoji is dragged into a channel

	$(".likemojiGroupCollection-area").droppable({
		scope: "dragLikemojis",
		drop: function(event, ui) {
			var area = $("this")
				.find(".area")
				.html();
			var likemojiDrag = $(ui.draggable).html();
			var currentID = ui.draggable.prop("id");

			$("#likemojiGroupCollection").removeClass("highlightEditor");

			if (groupSelected.id == groups[0].id) {
				if (likemojiGroupCollection.children.length >= 3) {
					alert(
						"You can only add 3 likemojis here unless you switch to single page mode"
					);
					return;
				}
			}

			var index = groupSelected.attributes.likemojis.indexOf(currentID);
			if (index !== -1) {
				alert("This likemoji is already being used on this page");
				return;
			}

			$("#cancelSaveGroup").show();

			$(ui.helper).remove();

			groupSelected.attributes.likemojis.push(currentID);
			goToPage(groupSelected.id);

			console.log(currentID);

			$(ui.draggable).detach();
		}
	});
}

async function cancelLikemojisAdd() {
	await getGroups(returnedOrg.id);
	goToPage(groupSelected.id);
	document.getElementById("likemojisContainer").innerHTML = "";
	displayCollectionLikemojis();
	$("#cancelSaveGroup").hide();
}

$("#saveLikemojiAdd").click(function(event) {
	groupSelected.set("likemojis", groupSelected.attributes.likemojis);
	groupSelected.save().then(
		group => {
			$("#cancelSaveGroup").hide();
		},
		error => {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert("Failed to create new object, with error code: " + error.message);
		}
	);
});

$("#cancelLikemojiAdd").click(function(event) {
	cancelLikemojisAdd();
});

//listens for signup Submit button

$("#signUpUser2").click(function(event) {
	newUser();
});

//listens for login Submit button

$("#loginUser").click(async function(event) {
	var user_password = $("#loginPassword").val();
	var user_email = $("#loginEmail").val();

	console.log(`logIn call with user: ${user_email} and pwd: ${user_password}`);
	Parse.User.logIn(user_email, user_password)
		.then(newUser => {
			user = newUser;
			if (user.isCurrent()) {
				//TODO move this to routes
				userChannels = getUserChannels(user.id).then(channels =>
					displayUserChannelList(channels)
				);
				$("#loginForm").hide();
				$("#loginChoice").show();
				$("#login").hide();
				$("#signup").hide();
				$("#logout").show();
				// 		$("#loginForm").show();

				console.log("loggedin");
			} else {
				console.log("loggedout");
			}
		})
		.catch(err => alert(err));
});

function loginParse(username, password) {
	console.log(`logIn call with user: ${username} and pwd: ${password}`);
	Parse.User.logIn(username, password)
		.then(newUser => {
			user = newUser;
			if (user.isCurrent()) {
				console.log("loggedin");
			} else {
				console.log("loggedout");
			}
		})
		.catch(err => alert(err));
}

$("#startBuild").click(function(event) {
	$("#getStartedIntro").hide();
	$("#signUpForm").show();
	$(".nav li").removeClass("active"); //this will remove the active class from                                      //previously active menu item
	$("#signup").addClass("active");
});

//starts new channel build flow from logged in

$("#startBuild2").click(function(event) {
	$("#loginChoice").hide();
	$("#createChannel").show();
});

//listens for navbar login button

$("#login").click(function(event) {
	$("#getStartedIntro").hide();
	$("#loginForm").show();
	$("#signUpForm").hide();

	$(".nav li").removeClass("active"); //this will remove the active class from
	//previously active menu item
	$("#login").addClass("active");
});

//listens for navbar signup button

$("#signup").click(function(event) {
	$("#getStartedIntro").hide();
	$("#loginForm").hide();
	$("#signUpForm").show();

	$(".nav li").removeClass("active"); //this will remove the active class from
	//previously active menu item
	$("#signup").addClass("active");
});

//listens for navbar logout button

$("#logout").click(function(event) {
	logout();
});

//displays list of channels owned by current logged in user

function displayUserChannelList(channels) {
	for (var i = 0; i < channels.length; i++) {
		var li = document.createElement("li");

		li.setAttribute("id", channels[i].id);
		li.setAttribute("class", "channelList");
		li.innerHTML = channels[i].attributes.name;

		var element = document.getElementById("userChannelList");
		element.appendChild(li);

		// userChannels[i]
	}
}

//loads existing user channel to editor
$("#userChannelList").on("click", "li", function() {
	// alert(this.id)

	loadUserChannel(this.id);

	$("#edit").show();
	$("#loginChoice").hide();
});

//stops page refresh when enter is pressed while in form input field
$("form").keypress(function(event) {
	return event.keyCode != 13;
});