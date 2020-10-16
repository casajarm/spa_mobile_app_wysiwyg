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

var Group = Parse.Object.extend("Group", {
	saveNewGroups: () => {saveNewGroups()}
  , getGroups: (orgId) => {getGroups(orgId)}
});


// return groups associated with an org
async function getGroups(orgId) {

		const query = new Parse.Query(Group);
		query.equalTo("organizationID", orgId);

		try {

				return await query.find();

		} catch (err) {
				// TypeError: failed to fetch
				alert(err);
		}
}

//clone groups
async function saveNewGroups() {

		return new Promise(async(resolve, reject) => {

				for (var i = 0; i < categoriesSorted.length; i++) {

						newGroup = categoriesSorted[i].clone();
						newGroup.set("organizationID", organization.id);
						newGroup.set("organization", organization.get("name"));
						newGroup.set("order", i);
						newGroup.set("badges", newGroupsBadges[i])
						newGroups[i] = newGroup;
				};

				Parse
						.Object
						.saveAll(newGroups)
						.then((groups) => {
								for (var i = 0; i < groups.length; i++) {
										groupsIDs[i] = groups[i].id;
										groupPointers[i] = {
												"__type": "Pointer",
												"className": "Group",
												"objectId": groups[i].id
										}
								};

								resolve();
						}, (error) => {

								reject();
								alert('Failed to create new objects, with error code: ' + error.message);
						});
		});
}

//sets group order to order that was set in the dragable editor
function setNewGroupOrder() {
		//user catOrder above to update all groups order

		for (var i = 0; i < catOrder.length; i++) {
				var thisID = catOrder[i].substr(0, catOrder[i].length - 1);
				group = groups.find(x => x.id === thisID)
				var order = i + 1;
				group.set("order", order);

		};
		Parse
				.Object
				.saveAll(groups)
				.then(async(groupsSaved) => {

						for (var i = 1; i < groups.length; i++) {
								console.log(groups[i].id + ' ' + groups[i].attributes.order)
						};

						sortCategories();
						goToPage(groups[0].id);

				}, (error) => {

						reject();
						alert('Failed to create new objects, with error code: ' + error.message);
				});

}

function getMainCategory(categories) {
	for (var x = 0; x < categories.length; x++) { 
		if (categories[x].attributes.main == 1) {
			return categories[x];
		}
	}

}

export {Group, getMainCategory, setNewGroupOrder};