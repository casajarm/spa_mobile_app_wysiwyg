import {Organization, getOrganization} from "./organizations.js";
import Likemoji from './likemojis.js';
import {ChannelStyle, saveNewStyle, getStyle} from "./styles.js";
import {Group, getMainCategory} from "./groups.js";

var org = Parse.Object.extend("Organization");

const Channel =  {
    channel:    new org(),
    categories: [], //Object.create(Group)]   
    likemojis:  [], //[Object.create(Likemoji)],  
    //TODO how to define function getCatMojis on each array element
    styles:     [],// [Object.create(ChannelStyle)],
    get channelID() {return this.channel.id},

    async populate(popID) {
      // setting a new channel refresh all the related data      
        this.channel    = await getOrganization(popID);
        this.categories = await getOrgCategories(popID);    
        this.likemojis  = await getLikemojis(popID); //get ALL LIKEMOJIS FOR CHANNEL  
        this.styles     = await getStyle(popID);    
        console.log(`populated channel for ${popID}`);
        console.log(`populated likemojis with ${this.likemojis.length}`);
    },
    catMojis: function(category) {
        let catMojis = category.get('likemojis'); 
        // return the likemojis that match array in category
        return this.likemojis.filter((moji) => catMojis.find(x => x === moji.id));
    },
    
    removeCategory: function(category) {
        // remove from the channel object too
    },
    addCategory: function (category) {        
        this.categories.push(category);
        //add to the channel object too
        // can only be done after a save!
        let channelGroups = this.channel.get('Groups');
        channelGroups.push(category.id);
        this.channel.set('Groups', channelGroups);
        this.channel.set("groupPointer", arrayToPointers(channelGroups, "Group"));
        this.channel.save();
    },
    
    addMoji: function(likemoji) {
        likemoji.set("Organization", this.channel.id);
        likemoji.save();
        this.likemojis.push(likemoji);        
    },
    removeMoji: function(likemoji) {
        // remove from group(s)
        let rem = this.removeCatMoji;
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
    addCatMoji: function(category, likemoji) {
        let catMojiIDs = category.get('likemojis');
        catMojiIDs.push(likemoji.id);
        category.set('likemojis', catMojiIDs);
    },
    removeCatMoji: function(category, likemoji)  {
        // get the array of likemoji pointer from grou
        let catMojiIDs = category.get('likemojis');
        // find the array index of the given likemoji         
        let ind = catMojiIDs.findIndex(x => x === likemoji.id);
        if(ind && ind > -1) {
            catMojiIDs.splice(ind, 1);
            category.set('likemojis', catMojiIDs);
            //category.save();
        }
    },
    setCatOrder: function(ids, orders)  {},
        
    get mainCategory()  {
        console.log('this is ' + this);
        let mainCat = this.categories.filter(isMainCategory); 
        return mainCat[0]; //filter returns array here
    },
    
    get subCategories() {return this.categories.filter(!isMainCategory)},
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


Parse.initialize("fg8ZXCHKfBOWme42LGPA");
Parse.serverURL = "https://lmx-stage-alex.herokuapp.com/parse";

// SOME TESTS HERE
const id = 'j1xdnYqYgh';
Channel.populate(id) 
.then( function() {
    let mainCat = Channel.mainCategory;
    console.log('main category is ' + mainCat.id);
    let mainCatMojis = Channel.catMojis(mainCat);
    console.log('has count mojis: ' + mainCatMojis.length);
    let testMoji = mainCatMojis[0];
    console.log('lets remove moji id: ' + testMoji.id);
//  test removing a likemoji from a channel and then add it back
    Channel.removeCatMoji(mainCat, testMoji);
    mainCatMojis = Channel.catMojis(mainCat);    
    console.log('now category has count mojis:' + mainCatMojis.length);
    console.log('lets add it back');
    Channel.addCatMoji(mainCat, testMoji);
    mainCatMojis = Channel.catMojis(mainCat);    
    console.log('now category has count mojis:' + mainCatMojis.length);
// now lets delete the moji from the channel
    let chanMojis = Channel.likemojis;
    console.log(`Channel has ${chanMojis.length} likemojis`); 
    Channel.removeMoji(testMoji);
    console.log(`Channel has ${chanMojis.length} likemojis`); 
    console.log('the category without asking has count: ' + mainCatMojis.length);
    mainCatMojis = Channel.catMojis(mainCat);    
    console.log('the category AFTER asking has count: ' + mainCatMojis.length);

}
)
export {Channel};