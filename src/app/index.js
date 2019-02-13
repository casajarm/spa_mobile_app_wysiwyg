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

                                    var groupLikemojis = likemojis.filter(obj => {
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

    for (var j = 0; j < likemojis.length; j++) {

                    // skip likemojis that are in current group
                    // console.log(likemojis[j].attributes.name);

                    var likemojiImage = likemojis[j].attributes.x3;
                    var likemojiName = likemojis[j].attributes.names.en;
                    var likemojiID = likemojis[j].id;

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
