//import {render, html} from '//unpkg.com/lighterhtml?module';
const {render, html, svg} = lighterhtml;

/* Main structure of the phone panel
|phone
|-category
|--header
|--callout
|--badges
|---badge list
|---other categories
|-navbar
*/

// phone function returns all the HTML for displaying the phone widget with the
// data for an org set to be selected for the given "category" parameter
// category is a Group object from Parse
const phone = async (Channel, selectedCategoryID) =>  {
    if (!selectedCategoryID) {
        selectedCategoryID = Channel.main
    }
    return /*await*/ phoneView(Channel, selectedCategoryID);
}


//const phoneView = (category, categories, categoryBadges) => {
//const phoneView = (props) => {
const phoneView = (Channel) => {
    console.info('rendering phoneView');
    let orgID = Channel.channelID; //category.attributes.organizationID;
    let panel2 = document.getElementById("panel2");
    let category = Channel.selectedCategory || Channel.mainCategory;
    console.info(`selected category id: ${category.id}`);
    const badgesView = (badges) => {
        let mainPageClass = 'badgeGroupCollection-area';
        if(category.attributes.main == 1) {
            mainPageClass = mainPageClass + ' mainpageBadges';
        }
        let badgeHtml = html`<div id="badgeGroupCollection"
                class="${mainPageClass}">
                  ${badges
                    ? badges.map(badge => badgeView(badge))
                    : html`<h4 id="dragBadgesPrompt" class="dragBadgesPrompt" style="display:none">Add Badges Here!</h4>`}
            </div>`;

        return badgeHtml;
    }

    let phoneHTML =
    html`<div id='phone-view' class="col-lg-4 channelEdit">
        <div class="phone" id="phoneView">
            <img class="phone" src="assets/iPhone_7_front_frame sized.png" />
            <div id="phoneDisplay" class="phoneDisplay-area">
                <div id="buildHeader" class="header text-white">
                    <img id="docHeaderImage" class="header"
                        src="${category.attributes.newHeader.url()}" />
                </div>
                <div id="callout" class="callout channelText">
                    ${category.attributes.callOuts.en}
                </div>
                <div class="phoneDisplayDynamicArea scroll dynamicAreaOverflow"
                    ondragenter="${dragenter}"
                    ondragover="${dragover}"
                    ondrop="${handleDrop}"
                >
                    ${badgesView(Channel.catBadges(category))}
                    ${category.attributes.main == 1 ?
                            categoriesSubView(Channel.categories)
                            : html`<span></span>`
                    }
                </div>
                ${phoneNavBarView(Channel)}
            </div>
        </div>
    </div>`;
    function handleDrop(e) {
        e.preventDefault();
        // find object dropped..get the id
        //alert('droped badge with id: ' + e.dataTransfer.getData('Text'));
        // storing data in drag event as "ID,add" or "ID,remove"
        let dropEvent = e.dataTransfer.getData('Text').split(',');
        if (dropEvent[1] === 'add') {
            // add it
            Channel.addCategoryBadge(category, dropEvent[0])
            .then (
                render(panel2, function () { return phoneView(Channel)})
            )
        }
    }

    function dragover(e) {
        e.preventDefault()
    }

    function dragenter(e) {
        e.preventDefault()
    }

    console.log(phoneHTML);
    //let phoneView = html`<div id='phone-view' class="col-lg-4 channelEdit">${phoneHTML}</div>`;
    return phoneHTML;
}

const phoneNavBarView =  (Channel) => {
    function homeClick () { phoneHome(Channel)}

    async function phoneHome(Channel) {
        Channel.selectedCategory = Channel.mainCategory;
        //let category = getMainCategory(categories);
        //let categoryBadges = await getCategoryBadges(category);
        //TODO decide to render our route here
        //TODO can we just refer to this views parent (<div id="phoneView">.parent)?
        let panel2 = document.getElementById("panel2");
        let panel3 = document.getElementById("panel3");

        //panel2.innerHTML = '';
        //render(panel2, function () { return phoneView(Channel)});
        let route = "/channel/" + channelID + "/view";
        //page(route);
        page.redirect(route);
    }
    let channelID = Channel.channelID;
    let navHTML = html`<div
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
                onclick="${homeClick}"
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
    return navHTML;
}

  const badgeView = (badge) => {

    function dragBadge(e) {
        e.dataTransfer.setData('Text', e.currentTarget.id + ',remove');
    }

    let badgeViewHTML = html`<div
        class="containerBadges badges ui-draggable ui-draggable-handle"
        draggable="true"
        id="${badge.id}"
        draggable="true"
        ondragstart="${dragBadge}"
    >
        <img
            src="${badge.attributes.x3.url()}"
            class="badgeImages"/>
        <div
            class="badgeNames channelText"
            style="color: rgb(52, 255, 86);">
            ${badge.attributes.names.en}
        </div>
    </div>`;

    //console.log(badgeViewHTML);
    return badgeViewHTML;
};


const categoryView = (category, skipMain) => {
    let orgID = category.attributes.organizationID;
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
        let targetID = e.currentTarget.dataset.i;
        page.redirect(`/channel/${orgID}/view/${targetID}`);
        //Channel.selectedCategoryID = targetID;
        //let panel2 = document.getElementById("panel2");
        //render(panel2, function () { return phoneView(Channel)});
    }

    if (skipMain) {
        if (category.attributes.main ==1) return html`<span></span>`;
    }
    let imgSrc = category.attributes.newCategoryImage ?
                category.attributes.newCategoryImage.url()
                : category.attributes.newHeader.url();
    let catName = category.attributes.name;
    let catID = category.id;

    let categoryViewHTML = html`<div class="category"
        type="button"
        id="${catID}"
        data-i="${catID}"
        onclick="${selectCategory}">
        <img
            src="${imgSrc}"
            width="100%"
            height="auto"/>
        <p class="categorytxt" style="color: rgb(255, 255, 255);">
            ${catName}
        </p>
    </div>`;

    //console.log(categoryViewHTML);
    return categoryViewHTML;
}

const categoriesSubView = (cats) => {
    console.log('composing categoriesSubView');
    return html`<div id="categories" class="categories">
            ${cats.map(cat => {
                    if (cat.attributes.disable !== 1) {
                        return categoryView(cat, true)
                    }
                    else {return html`<span></span>`}
                })
            }
      </div>`;
}

const getCategoryBadges = async (category) => {
    let IDs = category.attributes.badges;
    let badges = [];
    if (IDs.length > 0) {
        badges = await getBadgesByID(IDs);
    }
    return badges;
}

// returns badges sorted by name from a list of ids useful for getting the
// badges of the given category (group)
async function getBadgesByID(badgeIDs) {
    const query = new Parse.Query("Badge");
    query.containedIn("objectId", badgeIDs);
    query.ascending("name");
    try {
        return await query.find();
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

export {phone, phoneView, getCategoryBadges};