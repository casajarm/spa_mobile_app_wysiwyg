//users.js returns list of channels for current user
// turns out exgedning user object is a little more involved. 
// if needed check out the example in extendedUserExample.js
//var User = Parse.Object.extend("User");

async function getUserChannels(userId) {
    const query = new Parse.Query("Organization");
    query.equalTo("editors", userId);

    try {
        return await query.find();
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

//sign up / create new user
async function newUser (email, password) {
    // TODO handle user already exists first
    console.log("function called")
    console.log(email + " " + password)

    let user = new Parse.User(); 
    let currentUser;
    //TODO I think here we use the outer User object this method is called from
    // in other words "this"
    
    user.set("username", email);
    user.set("password", password);
    user.set("email", email);

    // other fields can be set just like with Parse.Object user.set("phone", "");
    try {
        await user.signUp();
        currentUser = await Parse
            .User
            .current();

        console.log("user is signed up")
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
        console.log("not signed up")
    }
    return currentUser;
}

//logs user in
async function userLogin (email, password)  {
    
    /*
    const user = await Parse
        .User
        .logIn(email, password);
    */
    this.logIn(email, password)
        .then(user => {return user})
        .catch(error => {alert(error)});

}

async function logout() {
    Parse
        .User
        .logOut()
        .then(() => {
            currentUser = Parse
                .User
                .current(); // this will now be null
            if (currentUser) {
                console.log("loggedin")
            } else {
                console.log("loggedout")

                window.location.href = 'index.html';
            }
        });
}

export {getUserChannels, newUser};
