//badges.js
//const Badge = Parse.Object.extend("Badge");
//var badge = Parse.Object.extend("Badge");

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

var Badge = Parse.Object.extend("Badge", {
    cloneBadges:  (badges)  => {return cloneBadges(badges)}
    , getBadges:  (orgId)   => {return getBadges(orgId)}
    , sortName:   (badges)  => {return sortBadgesByName(badges)}
});

//copies given Badges to current Badge set
async function cloneBadges(badges) {
    let newBadgesArray = [];
    let intermediateBadgesArray = [];
    for (var i = 0; i < badges.length; i++) {
      var newBadge = badges[i].clone();
      newBadge.set("organizationID", organization.id);
      newBadge.set("organizationName", organization.get("name"));
      newBadgesArray[i] = newBadge;
      // add attribute to store the original ID
      newBadgesArray[i].copiedFromID = badges[i].id;
    }
    // saving to Parse without added attribute
    intermediateBadgesArray = newBadgesArray;
    delete intermediateBadgesArray.copiedFromID;
    Parse.Object.saveAll(intermediateBadgesArray);
    return newBadgesArray;
  };

// iterate through categoriesSorted array badges property array
// to store index relating to old badge ids
// and create new arrays of new badges based on old indexs
// and save to newGroupsBadges array.

function setNewGroupBadgesArray() {
  var importedBadgesIDs = [];
  var newBadgesArrayIDs = [];
  var newGroupBadges = [];
  for (var i = 0; i < importedBadges.length; i++) {
    importedBadgesIDs[i] = importedBadges[i].id;
    newBadgesArrayIDs[i] = newBadgesArray[i].id;
  }

  for (var i = 0; i < categoriesSorted.length; i++) {
    // console.log (categoriesSorted[i].attributes.badges.length)
    newGroupBadges = [];

    for (var j = 0; j < categoriesSorted[i].attributes.badges.length; j++) {
      var badgeID = categoriesSorted[i].attributes.badges[j];
      var oldBadgeIndex = importedBadgesIDs.indexOf(badgeID);

      newGroupBadges[j] = newBadgesArrayIDs[oldBadgeIndex];
    }

    newGroupsBadges[i] = newGroupBadges;
  }

  return newGroupBadges;
}

// return badges associated with an org
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
async function sortBadgesByName(badges) {
  return badges.sort(SortByName);
}

function SortByName(a, b) {
	var aName = a.attributes.name.toLowerCase();
	var bName = b.attributes.name.toLowerCase();
	return aName < bName ? -1 : aName > bName ? 1 : 0;
}

export default Badge;