//styles.js clone style

function saveNewStyle() {

    newStyle = styles[0].clone()

    newStyle.set("organizationID", organization.id)

    newStyle
        .save()
        .then((style) => {
            // Execute any logic that should take place after the object is saved.
            // alert('New object created with objectId: ' + style.id);

        }, (error) => {
            // Execute any logic that should take place if the save fails. error is a
            // Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        });
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
