import { Organization } from "./organizations.js";
//Parse.Cloud.define("CloneChannel", async request => {
var currentUser;
var cloneableID; // the default key for the data we clone on new account creation


async function cloneChannel(req) {
	console.log(`cloneChannel ${req.sourceOrgId} to ${req.targetOrgId}`);
	var targetOrg = new Organization();
	var sourceOrg = new Organization();

	currentUser = Parse.User.current();
	//TODO before we go copy everything to this new organization we have some way of checking it is the correct target?

	// TODO allow flexibility to define only a source org and clone it
	// when no request.targetOrgId is provided
	targetOrg = await getOrganization(req.targetOrgId);
	sourceOrg = await getOrganization(req.sourceOrgId);

	//TODO check if name exists before we overwrite it
	targetOrg.set("name", "Clone of " + sourceOrg.get("name"));

	// too many paramters needed for the steps in this
	// await saveChannelToOrg(groupIDs);
	// TODO can we make this into a separate block?
	let editors = []; //users ids able to edit the channel to populate channel list
	editors.push(currentUser.id);
	targetOrg.set("editors", editors);
	targetOrg.set("header", sourceOrg.attributes.header);
	targetOrg.set("callOut", sourceOrg.attributes.callOut);

	// get all the badges for the channel copying from
	//var badges, badgeIDs, groups;
	var groupIDs = [];
	let badges = await getBadges(req.sourceOrgId);
	//.then(_badges => {
		//let badges = _badges;
	let badgeIDs = await cloneBadges(badges, targetOrg);
//			.then(_badgeIDs => {
//				badgeIDs = _bagdeIDs;
				// TODO we can probably just keep passing the then return down and not pas back up to outer block scoped variables
	let groups = await getGroups(sourceOrg.id); 
	//.then(_groups => {
					//let groups = _groups;
	groupIDs = await cloneGroups(groups, targetOrg, badgeIDs);
	//.then(_groupIDS => {
						// now that we have groupids we can pass that back up into the org record
	//					groupIDs = _groupIDS;
	targetOrg.set("groups", groupIDs);
	targetOrg.set("groupPointer", arrayToPointers(groupIDs, "Group"));
	await targetOrg.save().then(
		org => {
			console.log(`org id ${org.id} saved`);
		},
		error => {
			alert(`Failed to create new object, with error code: ${error.message}`);
		}
	);

	// cloning badges returns a mapping of oldID to newID array
	//.then( (badgeIDs) => {groups = getGroups(sourceOrg.id)})
	// cloning groups returns a mapping of oldID to newID array

	await copyStyleToOrg(sourceOrg.id, targetOrg.id);

	console.log("done");
	return targetOrg;
}
//);

//returns an organization object template or channel to edit or clone
async function getOrganization(orgId) {
	const query = new Parse.Query(Organization);
	try {
		return await query.get(orgId);
	} catch (err) {
		// TypeError: failed to fetch
		alert(err);
	}
}

//copies given array of Badge objects to new organization object
async function cloneBadges(badges, organization) {
	console.log(
		`cloning ${badges.length} badgees to org id ${organization.id}`
	);
	// map each badge to a function that will clone it
	let badgeSaveArray = badges.map(async badge => {
		const result = await copyBadgeToOrg(badge, organization);
		//console.log(result.id);
		return { oldID: badge.id, newID: result.id };
	});
	// execute the entire array of clone calls and return the array of returned values
	const resolvedbadgeSaveArray = await Promise.all(badgeSaveArray); // resolving all promises
	return resolvedbadgeSaveArray;
}

async function copyBadgeToOrg(badge, org) {
	let newBadge = badge.clone();
	newBadge.set("organizationID", org.id);
	newBadge.set("organizationName", org.get("name"));
	// TODO this ACL setting could be handled in cloud code beforesave trigger
	newBadge.setACL(org.getACL());
	delete newBadge.objectId;
	return await newBadge.save(); /*.then(function(newBadge) {
    return newBadge;
      { oldID: newBadgeID, newID: newBadge.id }; //objectId;
  })*/
}

// return badges associated with an org
async function getBadges(orgId) {
	const query = new Parse.Query("Badge");
	query.equalTo("organizationID", orgId);
	try {
		return await query.find();
	} catch (err) {
		// TypeError: failed to fetch
		alert(err);
	}
}

async function cloneGroup(group, organization, badgeIDs) {
	let newGroup = group.clone();
	newGroup.set("organizationID", organization.id);
	newGroup.set("organization", organization.get("name"));
	//newGroup.set("order", i);
	newGroup.set("badges", remapIDs(newGroup.get("badges"), badgeIDs));
	return await newGroup.save();
}

//clone groups
async function cloneGroups(groups, organization, badgeIDs) {
	let groupSaveArray = groups.map(async group => {
		const result = await cloneGroup(group, organization, badgeIDs);
		console.log(result.id);
		return result.id;
	});
	// execute the entire array of clone calls and return the array of returned values
	const resolvedgroupSaveArray = await Promise.all(groupSaveArray); // resolving all promises
	return resolvedgroupSaveArray;
}

//clone style
async function copyStyleToOrg(fromOrgID, toOrgID) {
	const ChannelStyle = Parse.Object.extend("ChannelStyle");
	var newStyle = new ChannelStyle(); // new channel for new organization being created
	var styles = new ChannelStyle();
	getStyle(fromOrgID).then(_styles => {
		styles = _styles;
		newStyle = styles[0].clone();
		newStyle.set("organizationID", toOrgID);
		newStyle.save().then(
			style => {
				// Execute any logic that should take place after the object is saved.
				console.log(`New object created with objectId:${style.id}`);
			},
			error => {
				// Execute any logic that should take place if the save fails. error is a
				// Parse.Error with an error code and message.
				alert(`Failed to create new object, with error code: ${error.message}`);
			}
		);
	});
}

// return styles associated with an org
async function getStyle(orgId) {
	var query = new Parse.Query("ChannelStyle");
	query.equalTo("organizationID", orgId);
	try {
		// store styles query result in styles array
		return await query.find();
	} catch (err) {
		// TypeError: failed to fetch
		alert(err);
	}
}

// return groups associated with an org

async function getGroups(orgId) {
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

// given an array of objectids and an array of object {oldID: x, newID: y}
// attempts to find the x value and return the y
// not found returns a null which is then filtered out of te returned array
function remapIDs(sourceArray, mappingArray) {
	var mapp = mappingArray;
	const lookup = function (findID) {
		return mapp.find(x => x.oldID === findID).newID;
	}

	const remappedIDs = sourceArray
		.map(id => {
			try {
				let newid = lookup(id); // mappingArray.find(x => x.oldID === id).newID;
				return newid;
			} catch (err) {
				return null;
			}
		})
		.filter(function (el) {
			return el != null;
		});
	return remappedIDs;
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


function test() {
	let json = {
		__type: 'Object',
		objectId: 'myid',
		name: 'John',
		className: 'Item',
		a: {
			__type: 'Object',
			className: 'Inner',
			b: 'somekey'
		}
	};

	json.name = 'haha';

	let obj = Parse.Object.fromJSON(json);
	obj.save();
}





async function getDefaultGroups() {
	let data = await (await fetch("../app/assets/group.json")).json();
	let groups = [];
	data.results.forEach(groupJSON => {
		groupJSON.className = 'Group';
		let group = Parse.Object.fromJSON(groupJSON);
		groups.push(group);
	});
    return groups;
}


async function fetchAsync () {
    let data = await (await fetch('https://api.github.com')).json();
    return data.results;
    }


async function getDefaultBadges() {
    let data = await(await fetch("../app/assets/badges.json")).json();
	let badges = [];
	data.results.forEach(badgeJSON => {
		badgeJSON.className = 'Badge';
		let badge = Parse.Object.fromJSON(badgeJSON);
		badges.push(badge);
	});
    return badges;
}


async function getDefaultStyles() {
	let data = await(await fetch("../app/assets/channel_style.json")).json();
	
	var style;
	await data.results.forEach(styleJSON => {
		styleJSON.className = 'ChannelStyle';
		style = Parse.Object.fromJSON(styleJSON);
		
	});
    return style; // we should only have one style but in case there are muitlpes this returns the past one
	
}


async function createBaseOrg() {
    const baseID = "xGO7Pdu71w";
    var sourceOrg = new Organization();
    sourceOrg.organization = "BaseOrg";
    sourceOrg.organizationID = baseID;////j7Upfb6fEo
	sourceOrg.id = baseID;
	sourceOrg.name = "Default";
	//let obj = Parse.Object.fromJSON(orgJson);
    //obj.save();
    //targetOrg.save()
    //.then (org => console.log('saved base org to parse db with id ' + org.id));


    // load the json for groups and badges
    var groups = await getDefaultGroups();
    var badges = await getDefaultBadges();

	var targetOrg = new Organization();
	
// fix  	currentUser = Parse.User.current();
	targetOrg.set("name", "Clone of " + sourceOrg.get("name"));

	// too many paramters needed for the steps in this
	// await saveChannelToOrg(groupIDs);
	// TODO can we make this into a separate block?
	let editors = []; //users ids able to edit the channel to populate channel list
	//editors.push(currentUser.id);
	targetOrg.set("editors", editors);
	targetOrg.set("header", sourceOrg.attributes.header);
	targetOrg.set("callOut", sourceOrg.attributes.callOut);
	await targetOrg.save();
	console.log('working on new base org with organizationID: ' + targetOrg.organizationID);
	console.log('working on new base org with object id: ' + targetOrg.objectId);
	
	// get all the badges for the channel copying from
	//var badges, badgeIDs, groups;
	var groupIDs = [];
    let badgeIDs = await cloneBadges(badges, targetOrg);
    groupIDs = await cloneGroups(groups, targetOrg, badgeIDs);
	targetOrg.set("groups", groupIDs);
	targetOrg.set("groupPointer", arrayToPointers(groupIDs, "Group"));
	await targetOrg.save().then(
		org => {
			console.log(`org id ${org.id} saved`);
		},
		error => {
			alert(`Failed to create new object, with error code: ${error.message}`);
		}
	);
          
	//const ChannelStyle = Parse.Object.extend("ChannelStyle");
	var newStyle;// = new ChannelStyle(); // new channel for new organization being created
	newStyle = await getDefaultStyles();
	console.log('retrieved default style');
	newStyle.id  = null;//treat it like a new record
	newStyle.set("organizationID", targetOrg.id);
	await newStyle.save().then(
		style => {
			// Execute any logic that should take place after the object is saved.
			console.log(`New style object created with objectId:${style.id}`);
		},
		error => {
			// Execute any logic that should take place if the save fails. error is a
			// Parse.Error with an error code and message.
			alert(`Failed to create new object, with error code: ${error.message}`);
		}
	);
	// set this id for the base object for cloning
	cloneableID = targetOrg.id;
	console.log("done");
}

function getCloneableID() {
	return cloneableID;
}

export {cloneChannel, createBaseOrg, getCloneableID};