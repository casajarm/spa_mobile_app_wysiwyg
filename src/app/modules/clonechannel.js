import {Organization} from "./organizations.js";
//Parse.Cloud.define("CloneChannel", async request => {
var currentUser;

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

	// get all the likemojis for the channel copying from
	//var likemojis, likemojiIDs, groups;
	var groupIDs = [];
	getLikemojis(req.sourceOrgId).then(_likemojis => {
		let likemojis = _likemojis;
		let likemojiIDs = cloneLikemojis(likemojis, targetOrg) //async .. does it matter
			.then(_likemojIDs => {
				likemojiIDs = _likemojIDs;
				// TODO we can probably just keep passing the then return down and not pas back up to outer block scoped variables
				getGroups(sourceOrg.id).then(_groups => {
					let groups = _groups;
					cloneGroups(groups, targetOrg, likemojiIDs).then(_groupIDS => {
						// now that we have groupids we can pass that back up into the org record
						groupIDs = _groupIDS;
						targetOrg.set("groups", groupIDs);
						targetOrg.set("groupPointer", arrayToPointers(groupIDs, "Group"));
						targetOrg.save().then(
							org => {
								console.log(`org id ${org.id} saved`);
							},
							error => {
								alert(`Failed to create new object, with error code: ${error.message}`);
							}
						);
					});
				});
			});
	});
	// cloning likemojis returns a mapping of oldID to newID array
	//.then( (likemojiIDs) => {groups = getGroups(sourceOrg.id)})
	// cloning groups returns a mapping of oldID to newID array

	//TODO fix this thenable mess. We can call cloneLikemojis and getGroups at the same time

	copyStyleToOrg(sourceOrg.id, targetOrg.id);

	console.log("done");
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

//copies given array of Likemoji objects to new organization object
async function cloneLikemojis(mojis, organization) {
	console.log(
		`cloning ${mojis.length} likemojies to ord id ${organization.id}`
	);
	// map each moji to a function that will clone it
	let mojiSaveArray = mojis.map(async moji => {
		const result = await copyMojiToOrg(moji, organization);
		//console.log(result.id);
		return { oldID: moji.id, newID: result.id };
	});
	// execute the entire array of clone calls and return the array of returned values
	const resolvedmojiSaveArray = await Promise.all(mojiSaveArray); // resolving all promises
	return resolvedmojiSaveArray;
}

async function copyMojiToOrg(likemoji, org) {
	let newLikemoji = likemoji.clone();
	newLikemoji.set("organizationID", org.id);
	newLikemoji.set("organizationName", org.get("name"));
	// TODO this ACL setting could be handled in cloud code beforesave trigger
	newLikemoji.setACL(org.getACL());
	delete newLikemoji.objectId;
	return await newLikemoji.save(); /*.then(function(newLikemoji) {
    return newLikemoji;
      { oldID: newLikemojiID, newID: newLikemoji.id }; //objectId;
  })*/
}

// return likemojis associated with an org
async function getLikemojis(orgId) {
	const query = new Parse.Query("Likemoji");
	query.equalTo("organizationID", orgId);
	try {
		return await query.find();
	} catch (err) {
		// TypeError: failed to fetch
		alert(err);
	}
}

async function cloneGroup (group, organization, likemojiIDs) {
	let newGroup = group.clone();
	newGroup.set("organizationID", organization.id);
	newGroup.set("organization", organization.get("name"));
	//newGroup.set("order", i);
	newGroup.set("likemojis", remapIDs(newGroup.get("likemojis"), likemojiIDs));
	return await newGroup.save();
}

//clone groups
async function cloneGroups(groups, organization, likemojiIDs) {
	let groupSaveArray = groups.map(async group => {
		const result = await cloneGroup(group, organization, likemojiIDs);
		console.log(result.id);
		return result.id;
	});
	// execute the entire array of clone calls and return the array of returned values
	const resolvedgroupSaveArray = await Promise.all(groupSaveArray); // resolving all promises
	return resolvedgroupSaveArray;
}

//clone style
function copyStyleToOrg(fromOrgID, toOrgID) {
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
	const lookup = function(findID){
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
		.filter(function(el) {
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

export default cloneChannel;