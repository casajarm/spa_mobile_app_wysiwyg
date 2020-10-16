import {Organization, getOrganization} from "./organizations.js";
import Badge from './badges.js';
import {ChannelStyle, saveNewStyle, getStyle} from "./styles.js";
import viewControl from './viewcontrol.js';

//import {Group, getMainCategory} from "./groups.js";

var org = Parse.Object.extend("Organization");
const Channel =  {
    channel:    new org(),
    categories: [], //Object.create(Group)]
    badges:  [], //[Object.create(Badge)],
    //TODO how to define function getCategoryBadges on each array element
    styles:     [],// [Object.create(ChannelStyle)],
    _selectedCategory: '',

    get channelID() {return this.channel.id},

    get selectedCategory() {return this._selectedCategory},
    /**
     * @param {object} category
     */
    set selectedCategory(category) {
        this._selectedCategory = category;
    },
    get selectedCategoryID() {return this._selectedCategory.id},
    set selectedCategoryID(ID) {
        this._selectedCategory = this.categories.find(x => x.id === ID);
    },

    async populateAll(popID) {
      // setting a new channel refresh all the related data
        this.channel    = await getOrganization(popID);
        this.categories = await getOrgCategories(popID);
        this.badges  = await getBadges(popID);
        this.styles     = await getStyle(popID);
        console.log(`populated channel for ${popID}`);
        console.log(`populated badges with ${this.badges.length}`);
    },

    async resetStyle() {
        await this.styles[0].fetch()
        console.info(`populated style and now tabbar has a value of ${Channel.channelStyle.get("tabBar")}`);
        return this.styles[0];
    },

    catBadges: function(category) {
        let catBadges = category.get('badges');
        // return the badges that match array in category
        return this.badges.filter((moji) => catBadges.find(x => x === moji.id));
    },

    deleteCategory: async function(category) {
        // remove from the channel object..group and grouppointers attributes
        let channelGroups = this.channel.get('groups');
        let ind = channelGroups.findIndex(x => x === category.id);
        channelGroups.splice(ind,1);
        this.channel.set('groups', channelGroups);
        this.channel.set("groupPointer", arrayToPointers(channelGroups, "Group"));
        //and remove it from this local object
        let ind2 = this.categories.findIndex(x => x.id === category.id);
        this.categories.splice(ind2, 1);
        await this.channel.save();

        //search parse to see if category has connected data
        // if not then delete it

        category.save();
        // destroy means delete...
        await category.destroy().then((cat) => {
            // The object was deleted from the Parse Cloud.
        }, (error) => {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
            // TODO messaging function for unified handling of errors
            }
        );

    },
    addCategory: async function (category) {
        // test if this is already in the channel
        let ind = this.categories.findIndex(x => x.id === category.id);
        if (ind < 0) {
            this.categories.push(category);
            //add to the channel object too
            let channelGroups = this.channel.get('groups');
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

    addBadge: async function(badge) {
        badge.set("Organization", this.channel.id);
        await badge.save();
        this.badges.push(badge);
    },
    deleteBadge: async function(badge) {
        // remove from group(s)
        let rem = this.removeCategoryBadge;
//        let {removeCategoryBadge: rem} = this;

        this.categories.forEach(function(cat) {
            rem(cat, badge);
            }
        )
        // find the exact badge in our collection
        let ind = this.badges.findIndex(x => x.id === badge.id);
        this.badges.splice(ind, 1);
        await Parse.Object.saveAll(this.categories);
        await badge.destroy().then((moji) => {
            // The object was deleted from the Parse Cloud.
        }, (error) => {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
            // TODO messaging function for unified handling of errors
            }
        );
    },
    addCategoryBadge: async function(category, badge) {
        //if badge is an id find the actual object
        let badgeID, badgeObj, maxCount = 20;
        if (typeof(badge) === "string" || typeof(badge) === "number") {
            badgeID = badge;
            try {
                badgeObj = this.badges.find(x => x.id === badgeID);
            }
            catch (e){
                alert (`${badge} is an invalid ID for badges`);
            }

        }
        else {
            badgeObj = badge;
            badgeID = badgeObj.id;
        }
        // limit main category to 3 badges
        if (isMainCategory(category)) {
            maxCount = 3;
        }

        let catBadgeIDs = category.get('badges');
        if (catBadgeIDs.length >= maxCount) {
           alert('This section only allows 3 Badges');
        }
        else {
        // don't add if it is already in the list
            if (!catBadgeIDs.find(x => x == badgeID)) {
                catBadgeIDs.push(badgeID);
                category.set('badges', catBadgeIDs);
                badgeObj.set('OrganizationId', this.channel.id);
                badgeObj.set('organizationName', this.channel.get('name'));
                await badgeObj.save();
                // TODO move to button action to "save" await category.save();
            }
        }
    },
    removeCategoryBadge: async function(category, badgeID)  {
        // get the array of badge pointer from group
        let catBadgeIDs = category.get('badges');
        // find the array index of the given badge
        let ind = catBadgeIDs.findIndex(x => x === badgeID);
        if(ind > -1) {
            catBadgeIDs.splice(ind, 1);
            category.set('badges', catBadgeIDs);
            // TODO move to button action to "save" await category.save();
        }
    },
    setCategoryOrder: function(ids, orders)  {
        // TODO run category ordering through here to ensure the
        // array and order attributes are in synch
    },

    get mainCategory()  {
        let mainCat = this.categories.filter(isMainCategory);
        return mainCat[0]; //filter returns array here
    },

    get subCategories() {return this.categories.filter(function(cat) {return !isMainCategory(cat)})},
    get channelStyle() {return this.styles[0]},

    saveAll: function() {
        Promise.all([
            this.styles.saveAll(),
            this.categories.saveAll(),
            this.badges.saveAll(),
            this.channel.save()])
            .then( () => {return})
            .catch(error => {
                console.log(error.message)
              });
    },

    updateViews: function() {
        viewControl.update();
    }
}

/*  need to incorporate this logic
    editors.push(currentUser.id);
    organization.set("header", returnedOrg.attributes.header);
    organization.set("callOut", returnedOrg.attributes.callOut);
    organization.set("editors", editors);
*/

function isMainCategory(category) {
    return category.attributes.main == 1;
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

async function getBadges(orgId) {
    const query = new Parse.Query(Badge);
    query.equalTo("organizationID", orgId);
    try {
      return await query.find();
    } catch (err) {
      // TypeError: failed to fetch
      alert(err);
    }
  }

function arrayToPointers(arr, pointerClass) {
    const pointers = arr.map(id => {
        return {
            __type: "Pointer",
            className: pointerClass,
            objectId: id
        };
    });
    return pointers;
}
export {Channel, viewControl};