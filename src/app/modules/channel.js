import {Organization, getOrganization} from "./organizations.js";
import Likemoji from './likemojis.js';
import {ChannelStyle, saveNewStyle, getStyle} from "./styles.js";
//import {Group, getMainCategory} from "./groups.js";

var org = Parse.Object.extend("Organization");
const Channel =  {
    channel:    new org(),
    categories: [], //Object.create(Group)]   
    likemojis:  [], //[Object.create(Likemoji)],  
    //TODO how to define function getCategoryLikemojis on each array element
    styles:     [],// [Object.create(ChannelStyle)],
    get channelID() {return this.channel.id},

    async populate(popID) {
      // setting a new channel refresh all the related data      
        this.channel    = await getOrganization(popID);
        this.categories = await getOrgCategories(popID);    
        this.likemojis  = await getLikemojis(popID);   
        this.styles     = await getStyle(popID);    
        console.log(`populated channel for ${popID}`);
        console.log(`populated likemojis with ${this.likemojis.length}`);
    },
    catLikemojis: function(category) {
        let catLikemojis = category.get('likemojis'); 
        // return the likemojis that match array in category
        return this.likemojis.filter((moji) => catLikemojis.find(x => x === moji.id));
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
    },
    
    addLikemoji: async function(likemoji) {
        likemoji.set("Organization", this.channel.id);
        await likemoji.save();
        this.likemojis.push(likemoji);        
    },
    deleteLikemoji: async function(likemoji) {
        // remove from group(s)
        let rem = this.removeCategoryLikemoji;
        this.categories.forEach(function(cat) {
            rem(cat, likemoji);
            }
        )
        // find the exact likemoji in our collection
        let ind = this.likemojis.findIndex(x => x.id === likemoji.id);
        this.likemojis.splice(ind, 1);
        await Parse.Object.saveAll(this.categories);
        await likemoji.destroy().then((moji) => {
            // The object was deleted from the Parse Cloud.    
        }, (error) => {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
            // TODO messaging function for unified handling of errors
            }
        );
    },
    addCategoryLikemoji: async function(category, likemoji) {
        //TODO handle IDs as well as full objects
        let likemojiID = typeof(likemoji) === "string" || typeof(likemoji) === "number" ? likemoji : likemoji.id;
        let catLikemojiIDs = category.get('likemojis');
        catLikemojiIDs.push(likemojiID);
        category.set('likemojis', catLikemojiIDs);
        likemoji.set('OrganizationId', this.channel.id);
        likemoji.set('organizationName', this.channel.get('name'));
        await likemoji.save();
        await category.save();        
    },
    removeCategoryLikemoji: async function(category, likemoji)  {
        // get the array of likemoji pointer from group
        let catLikemojiIDs = category.get('likemojis');
        // find the array index of the given likemoji         
        let ind = catLikemojiIDs.findIndex(x => x === likemoji.id);
        if(ind && ind > -1) {
            catLikemojiIDs.splice(ind, 1);
            category.set('likemojis', catLikemojiIDs);
            await category.save();
        }
    },
    setCategoryOrder: function(ids, orders)  {},
        
    get mainCategory()  {
        console.log('this is ' + this);
        let mainCat = this.categories.filter(isMainCategory); 
        return mainCat[0]; //filter returns array here
    },
    
    get subCategories() {return this.categories.filter(function(cat) {return !isMainCategory(cat)})},
    get channelStyle() {return this.styles[0]},
    saveAll: function() {return x}  
}

/*  need to incorporate this logic

    editors.push(currentUser.id);
    organization.set("groups", groupsIDs);
    organization.set("groupPointer", groupPointers);
    organization.set("header", returnedOrg.attributes.header);
    organization.set("callOut", returnedOrg.attributes.callOut);
    organization.set("editors", editors);
     
    org . set("groupPointer", arrayToPointers(groupIDs, "group"));
						

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
export {Channel};