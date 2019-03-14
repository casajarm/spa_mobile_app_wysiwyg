import {render, html} from '//unpkg.com/lighterhtml?module';
import {getMainCategory} from '../modules/groups.js';
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
const phone = async (props) =>  {
    const {category, categories, categoryLikemojis} = props;
    //let categories = await getOrgCategories(category.attributes.organizationID);
   // let likemojis = await getCategoryLikemojis(category);
    return /*await*/ phoneView(category, categories, categoryLikemojis);  
}

//const phoneView = (category, categories, categoryLikemojis) => {
const phoneView = (props) => {
    const {category, categories, categoryLikemojis} = props;
    let orgID = category.attributes.organizationID;

    let phoneHTML = 
    html`<div class="phone">
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
                ${likemojisView(categoryLikemojis)}
                ${category.attributes.main == 1 ?
                        categoriesSubView(categories)
                        : html`<span></span>`
                  }
            </div>
            ${phoneNavBarView(orgID, categories)}
        </div>
    </div>`;
    //console.log('done building view'); console.log(phoneView);
    /*
    let phoneView = document.createElement("div");
    phoneView.classList.add(['col-lg-4', 'channelEdit']);
    //phoneView.innerHTML = phoneHTML;
    phoneView.appendChild(phoneHTML);
    */
    let phoneView = html`<div id='phone-view' class="col-lg-4 channelEdit">${phoneHTML}</div>`; 
    return phoneView;
}

const phoneNavBarView =  (channelID, categories) => {
    function homeClick () { phoneHome(channelID)}

    async function phoneHome(channelID) {
        let category = getMainCategory(categories);
        let categoryLikemojis = await getCategoryLikemojis(category);
        //render(panel2, () => phoneView({category, categories, categoryLikemojis}));
        let route = "/channel/" + channelID + "/view";
        page(route);
    }

    let navHTML = html.for({channelID})`<div
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

  const likemojiView = (likemoji) => {
    let likemojiViewHTML = html`<div
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
    </div>`;

    console.log(likemojiViewHTML);
    return likemojiViewHTML;
};

const likemojisView = (likemojis) => {
    return html`<div id="likemojiGroupCollection"
            class="likemojiGroupCollection-area mainpageLikemojis">
              ${likemojis
        ? likemojis.map(moji => likemojiView(moji))
        : html`<h4 id="dragLikemojisPrompt" class="dragLikemojisPrompt" style="display:none">Add Likemojis Here!</h4>`}	
         </div>`;
}

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
    page(`/channel/${orgID}/view/${targetID}`);        
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

    console.log(categoryViewHTML);
    return categoryViewHTML;
}

/*
    let categoriesSubView = 
    html`<div id="categories" class="categories">
            ${(category.attributes.main == 1) ? 
                 categories.map(cat => categoryView(cat)) 
              } 
        </div>`;
*/        
const categoriesSubView = (cats) => {
    return html`<div id="categories" class="categories">
            ${cats.map(cat => categoryView(cat, true))} 
      </div>`;
}

// let categoriesSubView =  html`<div id="categories" class="categories"></div>`;

/*
const categoriesView = (categories) => {
    return categories.map(category => {
        if (category.attributes.main != 1) categoryView(category); 
    });
}
*/

const getCategoryLikemojis = async (category) => {
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

export {phone, phoneView, getOrgCategories, getCategoryLikemojis};