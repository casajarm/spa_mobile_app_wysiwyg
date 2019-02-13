//users.js returns list of channels for current user

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

var User = Parse.Object.extend("User", {
    logout: () => {saveChannelToOrg()}
  , login: (username, password, options ) => {Parse.User.logIn(username, password, options)}
  , newUser: (email, username, password) => {newUser(email, username, password)} 
  , getUserChannels: () => {getUserChannels()} 
});

async function getUserChannels() {
    const query = new Parse.Query(Organization);
    query.equalTo("editors", currentUser.id);

    try {
        return await query.find();
    } catch (err) {
        // TypeError: failed to fetch
        alert(err);
    }
}

//sign up / create new user
async function newUser (email, username, password) {
    // TODO handle user already exists first
    console.log("function called")



    console.log(email + " " + password)

    var user = new Parse.User(); 
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
        // TODO move to routes 
        $("#signUpForm").hide();
        $("#createChannel").show();
        $("#login").hide();
        $("#signup").hide();
        $("#logout").show();

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

                window.location.href = 'file:///Users/alexbarrett/Desktop/likemoji%20website%20and%20builder/likemoji%20' +
                        'builder/buildChannel.html';
            }
        });
}

export default User;