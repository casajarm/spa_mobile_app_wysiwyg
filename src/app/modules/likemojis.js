//likemojis.js
//const Likemoji = Parse.Object.extend("Likemoji");
//var likemoji = Parse.Object.extend("Likemoji");

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

var Likemoji = Parse.Object.extend("Likemoji", {
      cloneMojies: (mojies) => {cloneLikemojies(mojies)}
    , getLikemojis: (orgId) => {getLikemojis(orgId)} 
});


//copies given Likemojis to current Likemoji set
async function cloneLikemojis(mojies) {
    let newLikemojisArray = [];
    let intermediateLikemojisArray = [];
    for (var i = 0; i < mojis.length; i++) {
      var newLikemoji = mojis[i].clone();
      newLikemoji.set("organizationID", organization.id);
      newLikemoji.set("organizationName", organization.get("name"));
      newLikemojisArray[i] = newLikemoji;
      // add attribute to store the original ID
      newLikemojisArray[i].copiedFromID = mojis[i].id;
    }
    // saving to Parse without added attribute
    intermediateLikemojisArray = newLikemojisArray;
    delete intermediateLikemojisArray.copiedFromID;
    Parse.Object.saveAll(intermediateLikemojisArray);
    return newLikemojisArray;
  };

// iterate through categoriesSorted array likemojis property array
// to store index relating to old likemoji ids
// and create new arrays of new likemojis based on old indexs
// and save to newGroupsLikemojis array.

function setNewGroupLikemojisArray() {
  var importedLikemojisIDs = [];
  var newLikemojisArrayIDs = [];
  var newGroupLikemojis = [];
  for (var i = 0; i < importedLikemojis.length; i++) {
    importedLikemojisIDs[i] = importedLikemojis[i].id;
    newLikemojisArrayIDs[i] = newLikemojisArray[i].id;
  }

  for (var i = 0; i < categoriesSorted.length; i++) {
    // console.log (categoriesSorted[i].attributes.likemojis.length)
    newGroupLikemojis = [];

    for (var j = 0; j < categoriesSorted[i].attributes.likemojis.length; j++) {
      var likemojiID = categoriesSorted[i].attributes.likemojis[j];
      var oldLikemojiIndex = importedLikemojisIDs.indexOf(likemojiID);

      newGroupLikemojis[j] = newLikemojisArrayIDs[oldLikemojiIndex];
    }

    newGroupsLikemojis[i] = newGroupLikemojis;
  }

  return newGroupLikemojis;
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
async function sortMojisByName(mojis) {
  return mojis.sort(SortByName);
}

export default Likemoji;