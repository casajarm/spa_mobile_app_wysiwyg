import {Organization, getOrganization} from "./organizations.js";
import Likemoji from './likemojis.js';
import {ChannelStyle, saveNewStyle, getStyle} from "./styles.js";
//import {Group, getMainCategory} from "./groups.js";

var org = Parse.Object.extend("Organization");

/* 
removeXX means a relation is delete
deleteXX means the object is deleted and relations are removed
*/

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
        this.categories = await getOrgCategories(this.channel);    
        this.likemojis  = await getLikemojis(popID); //get ALL LIKEMOJIS FOR CHANNEL  
        this.styles     = await getStyle(popID);    
        console.log(`populated channel for ${popID}`);
        console.log(`populated likemojis with ${this.likemojis.length}`);
    },
    catLikemojis: function(category) {
        let catLikemojis = category.get('likemojis'); 
        // return the likemojis that match array in category
        return this.likemojis.filter((moji) => catLikemojis.find(x => x === moji.id));
    },
    
    deleteCategory: function(category) {
        // remove from the channel object
        /* according to parse docs we should just:*/
        /* if we remove on parent and relation we get error:
        Cannot merge Add Op with the previous Op
        this.channel.remove('Groups', category);
        */
        // we also have groupPointer to contend with
        let relation = this.channel.relation("Group"); //do we use category or Group??
        relation.remove(category);
    
        //and remove it from this local object
        let ind = this.categories.findIndex(x => x.id === category.id);
        this.categories.splice(ind, 1);
        this.channel.save();  
        // destroy means delete...
        category.destroy().then((cat) => {
            // The object was deleted from the Parse Cloud.    
        }, (error) => {
            // The delete failed.
            // error is a Parse.Error with an error code and message.
            // TODO messaging function for unified handling of errors
            }
        );
        
    },
    addCategory: function (category) {        
        this.categories.push(category);
        //add to the channel object too
        this.channel.add('Groups', category);
        let relation = this.channel.relation("Group");
        relation.add(category);
        category.set('organizationID', this.channel.id);
        category.set('organizationName', this.channel.get('name'));
        category.save();
    },
    
    addLikemoji: function(likemoji) {
        likemoji.set("Organization", this.channel.id);
        likemoji.save();
        this.likemojis.push(likemoji);        
    },
    deleteLikemoji: function(likemoji) {
        // remove from group(s)
        let rem = this.removeCategoryLikemoji;
        this.categories.forEach(function(cat) {
            rem(cat, likemoji);
            }
        )
        // find the exact likemoji in our collection
        let ind = this.likemojis.findIndex(x => x.id === likemoji.id);
        this.likemojis.splice(ind, 1);
        //TODO delete likemoji from the table
        //TODO save()
    },
    addCategoryLikemoji: function(category, likemoji) {
        /* according to parse docs try
            let relation = category.relation("likemojis");
            relation.add(likemoji);
        */
        let catLikemojiIDs = category.get('likemojis');
        catLikemojiIDs.push(likemoji.id);
        category.set('likemojis', catLikemojiIDs);
    },
    removeCategoryLikemoji: function(category, likemoji)  {
        /* according to parse docs try
            let relation = category.relation("likemojis");
            relation.remove(likemoji);
        */
        // get the array of likemoji pointer from grou
        let catLikemojiIDs = category.get('likemojis');
        // find the array index of the given likemoji         
        let ind = catLikemojiIDs.findIndex(x => x === likemoji.id);
        if(ind && ind > -1) {
            catLikemojiIDs.splice(ind, 1);
            category.set('likemojis', catLikemojiIDs);
            //category.save();
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
     
    org . set("groupPointer", arrayToPointers(groupIDs, "Group"));
						

    */

function isMainCategory(category) {
    return category.attributes.main == 1;
}



async function getOrgCategories(channel) {
    let channelRelation = channel.relation('Group');             
    try {
        return await channelRelation.query().find();
    } catch (err) {
    // TypeError: failed to fetch
    alert(err);
    } 
}
/*
async function getOrgCategories(orgId) {
    // TODO try to use relations
    //relation.query().find(
    const query = new ParseQuery("Group");
    query.equalTo("organizationID", orgId);
    query.ascending("order");
    try {
        return await query.find();
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}
*/
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

// SOME TESTS HERE
Parse.initialize("fg8ZXCHKfBOWme42LGPA");
Parse.serverURL = "https://lmx-stage-alex.herokuapp.com/parse";
const id = 'j1xdnYqYgh';
Channel.populate(id) 
.then( function() {
    let mainCat = Channel.mainCategory;
    console.log('main category is ' + mainCat.id);
    let mainCategoryLikemojis = Channel.catLikemojis(mainCat);
    console.log('has count mojis: ' + mainCategoryLikemojis.length);
    let testLikemoji = mainCategoryLikemojis[0];
    console.log('lets remove moji id: ' + testLikemoji.id);
//  test removing a likemoji from a channel and then add it back
    Channel.removeCategoryLikemoji(mainCat, testLikemoji);
    mainCategoryLikemojis = Channel.catLikemojis(mainCat);    
    console.log('now category has count mojis:' + mainCategoryLikemojis.length);
    console.log('lets add it back');
    Channel.addCategoryLikemoji(mainCat, testLikemoji);
    mainCategoryLikemojis = Channel.catLikemojis(mainCat);    
    console.log('now category has count mojis:' + mainCategoryLikemojis.length);
// now lets delete the moji from the channel
    let chanLikemojis = Channel.likemojis;
    console.log(`Channel has ${chanLikemojis.length} likemojis`); 
    Channel.deleteLikemoji(testLikemoji);
    console.log(`Channel has ${chanLikemojis.length} likemojis`); 
    console.log('the category without asking has count: ' + mainCategoryLikemojis.length);
    // value not reference....
    mainCategoryLikemojis = Channel.catLikemojis(mainCat);    
    console.log('the category after asking has count: ' + mainCategoryLikemojis.length);
    //what I want to be able to do it Channel.categories[0].likemojis 
    let lastCat = Channel.subCategories[Channel.subCategories.length -1];
    console.log('found last category named' + lastCat.get('name'));
    console.log(`Channel has ${Channel.subCategories.length} groups/categories `)
    // create a clone o we can add it back
    /*
    let newCat = lastCat.clone;
    delete newCat.objectId;    
    console.log('remove the category');
    Channel.deleteCategory(lastCat);
    console.log(`Channel now has ${Channel.subCategories.length} groups/categories `)
    Channel.addCategory(newCat);
    console.log(`Channel now has ${Channel.subCategories.length} groups/categories `)
*/

});

export {Channel};