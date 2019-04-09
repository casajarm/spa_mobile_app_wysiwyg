async function displayChannel(id) {
	await buildPage(groups[0].id);
	await displayCollectionLikemojis();
	await displayEditorCategories();
	displayStyle();
}

function buildPage(groupID) {
	selectDisplayGroup(groupID);
	displayHeader();
	displayCallout();
	sortImportedLikemojisByName();
	displayLikemojis();
	displayCategories();
	displayStyle(); // repeated on the function displayChannel
	//inits dragable on likemojis after dynamic load for jquery
	dragfix();
}

//sets group to display and edit
// TODO replace references .. this logic exists elsewhere
function selectDisplayGroup(groupID) {
	groupSelectedPrep = groups.filter(obj => {
		return obj.id === groupID;
	});

	groupSelected = groupSelectedPrep[0];
}

// TODO add parameter groupSelected?
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
	$("#callout").text(groupSelected.attributes.callOuts.en);
}

async function sortImportedLikemojisByName() {
	importedLikemojis.sort(SortByName);
}

function displayLikemojis() {
	if (groupSelected.attributes.likemojis.length < 1) {
		var emptyText = document.createElement("h4");
		var text = document.createTextNode("Add Likemojis Here");

		emptyText.setAttribute("class", "dragLikemojisPrompt");
		emptyText.appendChild(text);

		var element = document.getElementById("likemojiGroupCollection");
		element.appendChild(emptyText);
	} else {
		for (var j = 0; j < groupSelected.attributes.likemojis.length; j++) {
			var likemojiID = groupSelected.attributes.likemojis[j];

			var groupLikemojis = importedLikemojis.filter(obj => {
				return obj.id === likemojiID;
			});

			// console.log(groupLikemojis[0].attributes.name);

			var likemojiImage = groupLikemojis[0].attributes.x3;
			var likemojiName = groupLikemojis[0].attributes.names.en;
			var likemojiID = groupLikemojis[0].id;

			//create divs and images to display likemojis

			var div = document.createElement("div");
			var node = document.createElement("img");
			var text = document.createElement("div");
			var textname = document.createTextNode(likemojiName);

			div.setAttribute("class", "likemojis");
			div.setAttribute("id", likemojiID);
			text.setAttribute("class", "likemojiNames channelText");
			node.setAttribute("src", likemojiImage.url());
			node.setAttribute("class", "likemojiImages");
			div.appendChild(node);
			text.appendChild(textname);
			div.appendChild(text);

			var element = document.getElementById("likemojiGroupCollection");
			element.appendChild(div);
		}
	}
}

function displayCategories() {
	if (groupSelected.attributes.main == 1) {
		for (var i = 0; i < groups.length; i++) {
			if (categoriesSorted[i].attributes.main == 1) {
				// console.log ("skipped");
			} else {
				if (categoriesSorted[i].attributes.disabled !== 1) {
					var div = document.createElement("div");
					var img = document.createElement("img");
					var txt = document.createElement("p");

					img.setAttribute("src", groups[i].attributes.newCategoryImage.url());
					img.setAttribute("width", "100%");
					img.setAttribute("height", "auto");
					txt.innerHTML = categoriesSorted[i].attributes.names.en;
					txt.setAttribute("class", "categorytxt");
					div.setAttribute("class", "category");
					div.setAttribute("type", "button");
					div.setAttribute("id", categoriesSorted[i].id);
					// div.setAttribute("onclick", "goToPage('" + categoriesSorted[i].id + "')")
					div.appendChild(img);
					div.appendChild(txt);
					var element = document.getElementById("categories");
					element.appendChild(div);
				} else {
					// console.log ("skipped disabled")
				}
			}
		}
	} else {
		console.log("no groups to display");
	}
}


// sets editor buttons to subcategory edit view and sets phone display to the
// category that was clicked
// TODO can we replace this with an accordion?
$("#categories").on("click", ".category", function() {
	let mojicollection = document.getElementById('likemojiGroupCollection');
	//mojicollection
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


// this is how each category section of the phone widget is changed
function goToPage(groupID) {
	// removes content from phone screen
	document.getElementById("likemojiGroupCollection").innerHTML = "";
	document.getElementById("categories").innerHTML = "";

	if (groupID == groups[0].id) {
		// if this is the "main channel"
		if (groupSelected.attributes.likemojis.length < 1) {
			//TODO can we replace JQuery with elementNodeReference.classList.add and .remove .toggle?
			// $("#likemojiGroupCollection").removeClass("likemojiGroupCollection-area");
			$("#likemojiGroupCollection").removeClass("mainpageLikemojis");
			$("#likemojiGroupCollection").addClass("likemojiGroupCollectionNone");
		} else {
			$("#likemojiGroupCollection").addClass("mainpageLikemojis");
			$("#likemojiGroupCollection").removeClass("likemojiGroupCollectionNone");
			// $("#likemojiGroupCollection").addClass("likemojiGroupCollection-area");
		}

		$("#likemojiGroupCollection").removeClass("categoryLikemojis");
	} else {
		$("#likemojiGroupCollection").removeClass("mainpageLikemojis");
		$("#likemojiGroupCollection").removeClass("likemojiGroupCollectionNone");
		// $("#likemojiGroupCollection").addClass("likemojiGroupCollection-area");
		$("#likemojiGroupCollection").addClass("categoryLikemojis");
	}

	// loads and displays new page

	buildPage(groupID);
}
