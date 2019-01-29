// new objects to save var newStartSelector = new StartSelector(); // new
// StartSelector being created
var organization = new Organization(); // new organization being created
var newStyle = new ChannelStyle(); // new channel for new organization being created
var newGroup = new Group(); // new group created for new organization
//var newGroupLikemojis = []; //
var newGroups = [] //sorted array of newGroups for new organization being created
var groupsIDs = [] //array of associated group IDs to be stored in the organization object being created
var groupPointers = [] //array of pointers to group objects to be stored in the organization object being created
var newLikemoji = new Likemoji();
var newLikemojisArray = [] //array of likemojis for new organization being created
var newGroupsLikemojis = [] //array of arrays likemoji obj ids for groups of new organization being created

// sets class types and vars to represent parse objects


const ChannelStyle = Parse
				.Object
				.extend("ChannelStyle");
const Likemoji = Parse
				.Object
				.extend("Likemoji");
var likemoji = Parse
				.Object
				.extend("Likemoji");

const StartSelector = Parse
				.Object
				.extend("StartSelector");

//local var to set channel group to display, etc.
var groupSelected = Parse
				.Object
				.extend("Group"); // current group to be displayed in emulator (phone display window)


//clone imported channel to new org**** does not work!!!! need to use async!!!!!
async function cloneChannel(channelId) {
	// to clone the channel we need to get the org id
	// then make a copy of all the 
	// likemojis
	// groups
	// style
	// after copying groups and likemojis we have to rekey 
	// the likemojies array inside the groups object

	await cloneLikemojis(getLikemojis(newOrg.id) );

	await setNewGroupLikemojisArray();

	await saveNewGroups();

	await saveNewStyle();

	saveChannelToOrg();

	// console.log("done")
}