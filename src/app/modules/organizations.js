// organizations.js 
//prototype object for Organization class from Parse

/* A "standard" Parse object extend format 
var MyClass = Parse.Object.extend("MyClass", {
        Instance methods,
        initialize: function(attrs, options) {
            this.someInstanceProperty = [],
            Other instance properties
        }
    }, {
        Class properties
    });
 */

var Organization = Parse.Object.extend("Organization", {
	saveChannelToOrg: () => {saveChannelToOrg()}
  , getOrganization: (orgId) => {getOrganization(orgId)} 
});
//TODO don't we want paramters for saveChannelToOrg?


//TODO extend or delegate from base class not Parse                
var returnedOrg = Parse
				.Object
				.extend("Organization"); // imported organization


//returns and organization object template or channel to edit
// or clone
async function getOrganization(orgId) {

    const query = new Parse.Query(Organization);

    try {
        return await query.get(orgId);
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

function saveChannelToOrg() {
    // should rename groups to channels..?
    let organization = new Organization(); // new organization being created

    editors.push(currentUser.id);

    organization.set("groups", groupsIDs);
    organization.set("groupPointer", groupPointers);
    organization.set("header", returnedOrg.attributes.header);
    organization.set("callOut", returnedOrg.attributes.callOut);
    organization.set("editors", editors);

    organization
        .save()
        .then((org) => {
            // Execute any logic that should take place after the object is saved.
            // console.log("org saved"); alert('Organization updated with channel: ' +
            // org.id);
        }, (error) => {
            // Execute any logic that should take place if the save fails. error is a
            // Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        });
}

export default Organization;