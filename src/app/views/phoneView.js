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
async function phone(category) {
    let categories = await getOrgCategories(category.attributes.organizationID);
    let likemojis = await getCategoryLikemojis(category);
    return phoneView(category, categories, likemojis);  
}

const phoneView = (category, categories, likemojis) => {
    let orgID = category.attributes.organizationID;
    let phoneHTML = 
    `<div class="phone">
        <img class="phone" src="assets/iPhone_7_front_frame sized.png" />
        <div id="phoneDisplay" class="phoneDisplay-area">
            <div id="buildHeader" class="header text-white">
                <img id="docHeaderImage" class="header" 
                    src="${category.attributes.newHeader.url()}" />
            </div>
            <div id="callout" class="callout channelText">
                ${category.attributes.callOuts.en}
            </div>
            <div class="phoneDisplayDynamicArea scroll dynamicAreaOverflow">
                ${likemojisView(likemojis)}
                <div id="categories" class="categories">
                    ${(category.attributes.main == 1) ? categoriesView(categories) : ''}
                </div>
            </div>
            ${phoneNavBarView(orgID)}
        </div>
    </div>`;
    //console.log('done building view'); console.log(phoneView);
    let phoneView = document.createElement("div");
    phoneView.classList.add(['col-lg-4', 'channelEdit']);
    phoneView.innerHTML = phoneHTML;
    // add onclick handlers 
    let categoriesButtons = phoneView.getElementsByClassName('category'); 
    // convert nodelist to array to enable foreach
    let categoriesButtonsArr = [].slice.call(categoriesButtons);
    categoriesButtonsArr.forEach(cat => {
        cat.addEventListener('click', function(e) {
            page(`/channel/${orgID}/view/${cat.id}`);
            }
        );
    });

    return phoneView;
}

const phoneNavBarView =  (channelID) => {
    return `<div
    id="navBar"
    class="navBar"
    style="background-color: rgb(24, 49, 103);"
    >
        <div id="homeNavButton" 
            class="navIcons" 
            style="display:inline">
            <i
                style="font-size: 1.3em; color: rgb(52, 255, 86);"
                class="fas fa-home activeNavIcon"
                onclick="page('/channel/${channelID}/view')"
                ></i>
        </div>
        <div id="inboxNavButton" class="navIcons" style="display:inline">
            <i
                style="font-size: 1.3em; color: white;"
                class="far fa-envelope"
            ></i>
        </div>
        <div id="profileNavButton" class="navIcons" style="display:inline">
            <i style="font-size: 1.3em; color: white;" class="fas fa-user"></i>
        </div>
    </div>`;
}

const likemojiView = (likemoji) => {
    return `<div
    class="likemojis ui-draggable ui-draggable-handle"
    id="${likemoji
        .id}">
    <img
        src="${likemoji
        .attributes
        .x3
        .url()}"
        class="likemojiImages"/>
    <div
        class="likemojiNames channelText"
        style="color: rgb(52, 255, 86);">
        ${likemoji
        .attributes
        .names
        .en}
    </div>
</div>`
};

const likemojisView = (likemojis) => {
    return `<div id="likemojiGroupCollection"
            class="likemojiGroupCollection-area mainpageLikemojis">
              ${likemojis
        ? likemojis.map(likemojiView).join('')
        : `<h4 id="dragLikemojisPrompt" class="dragLikemojisPrompt" style="display:none">
                    Add Likemojis Here!
                 </h4>`}	
         </div>`;
}

categoriesView = (categories) => {
    let categoryView = '';
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].attributes.main != 1) {
            categoryView += `<div class="category" type="button" id="${categories[i]
                .id}">
                <img
                    src="${categories[i]
                .attributes
                .newCategoryImage
                .url()}"
                    width="100%"
                    height="auto"/>
                <p class="categorytxt" style="color: rgb(255, 255, 255);">
                ${categories[i]
                .attributes
                .name}
                </p>    
            </div>`
        }; // if not the main category
    }
    return categoryView;
}

async function getCategoryLikemojis(category) {
    let IDs = category.attributes.likemojis;
    let likemojis = [];
    if (IDs.length > 0) {
        likemojis = await getLikemojisByID(IDs);
    }
    return likemojis;
}

// returns likemojis sorted by name from a list of ids useful for getting the
// mojis of the given category (group)
async function getLikemojisByID(likemojiIDs) {
    const query = new Parse.Query("Likemoji");
    query.containedIn("objectId", likemojiIDs);
    query.ascending("name");
    try {
        return await query.find();
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

async function getOrgCategories(orgId) {
    const query = new Parse.Query("Group");
    query.equalTo("organizationID", orgId);
    query.ascending("order");
    try {
        return await query.find();
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}