import Organization from "./organizations.js";
//Parse.Cloud.define("CloneChannel", async request => {
async function cloneChannel(req) {
        
  var targetOrg = new Organization();
  var sourceOrg = new Organization();

  // TODO allow flexibility to define only a source org and clone it
  // when no request.targetOrgId is provided
  targetOrg = await getOrganization(req.targetOrgId);
  sourceOrg = await getOrganization(req.sourceOrgId);

  //TODO before we go copy everything to this new organization we have some way of checking it is the correct target?

  // get all the likemojis for the channel copying from
  var likemojis, likemojiIDs, groups, groupIDs;
  getLikemojis(sourceOrg.objectId)
    .then( (likemojis) => {cloneLikemojis(likemojis)})
    // cloning likemojis returns a mapping of oldID to newID array
    .then( (likemojiIDs) => getGroups(sourceOrg.id))
    // cloning groups returns a mapping of oldID to newID array
    .then( (groups) => {cloneGroups(groups, targetOrg, likemojiIDs)}) 
  //TODO fix this thenable mess. We can call cloneLikemojis and getGroups at the same time 

  targetOrg.set("groups", remapIDs(sourceOrg.get("groups"), groupIDs));
  targetOrg.set("groupPointer", arrayToPointers(targetOrg.get("groups"), 'Group'));

  await saveNewStyle();

  await saveChannelToOrg();
  // console.log("done")
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
  console.log(`cloning ${mojis.length} likemojies to ord id ${organization.id}`);
  var likemojiIDs = [];
  var newLikemoji;
  for (var i = 0; i < mojis.length; i++) {
    let newLikemojiID = mojis[i].id; // objectId;
    newLikemoji = mojis[i].clone();
    newLikemoji.set("organizationID", organization.id);
    newLikemoji.set("organizationName", organization.get("name"));
    // TODO this ACL setting could be handled in cloud code beforesave trigger
    newLikemoji.setACL(organization.getACL());
    delete newLikemoji.objectId;
    newLikemoji.save().then(function (newLikemoji) {
        // save new ID
        likemojiIDs.push({oldID: newLikemojiID, newID: newLikemoji.id}); //objectId;
    });
  }
  return likemojiIDs;
}

// return likemojis associated with an org
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

//clone groups
async function cloneGroups(groups, organization, likemojiIDs) {
  var newGroup;
  var groupIDs= [];
  for (var i = 0; i < groups.length; i++) {
    let newGroupID = groups[i].id;  
    newGroup = groups[i].clone();
    newGroup.set("organizationID", organization.id);
    newGroup.set("organization", organization.get("name"));
    newGroup.set("order", i);    
    newGroup.set("likemojis", remapIDs(newGroup.get("likemojis")));
    newGroup.save().then(function (newGroup) {
        groupIDs.push({oldID: newGroupID, newID: newGroup.id}); //objectId;
      }
    )  
  }
  return groupIDs;
}

async function saveChannelToOrg() {
  // should rename groups to channels..?
  let organization = new Organization(); // new organization being created
  let editors = []; //users ids able to edit the channel to populate channel list

  editors.push(currentUser.id);

  organization.set("groups", groupsIDs);
  organization.set("groupPointer", groupPointers);
  organization.set("header", returnedOrg.attributes.header);
  organization.set("callOut", returnedOrg.attributes.callOut);
  organization.set("editors", editors);

  organization.save().then(
    org => {
      // Execute any logic that should take place after the object is saved.
      console.log(`org id ${org.id} saved`);
      //alert('Organization updated with channel: ' +
      // org.id);
    },
    error => {
      // Execute any logic that should take place if the save fails. error is a
      // Parse.Error with an error code and message.
      alert(`Failed to create new object, with error code: ${error.message}`);
    }
  );
}

//clone style
async function saveNewStyle(orgId) {
  const ChannelStyle = Parse.Object.extend("ChannelStyle");
  var newStyle = new ChannelStyle(); // new channel for new organization being created
  var styles = new ChannelStyle();
  styles = await getStyle(orgId);
  newStyle = styles[0].clone();
  newStyle.set("organizationID", orgId);
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
}

// return styles associated with an org
async function getStyle(orgId) {
  var query = new Parse.Query(ChannelStyle);
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
  const query = new Parse.Query(Group);
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
function remapIDs(sourceArray, mappingArray){
  const remappedIDs = sourceArray.map(id => { 
      try {
        let newid = mappingArray.find(x => x.oldID === id).newID;
        return newid;
      }
      catch(err)
      {return null;}
    }).filter(function (el) {
      return el != null;
    });
  return remappedIDs;
}

function arrayToPointers (arr, pointerClass){
  const pointers = arr.map(id => {return {
    __type: "Pointer",
    className: pointerClass,
    objectId: id
    }});
  return pointers;
  }

  export default cloneChannel;