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
  , login: (username, password) => {login(username, password)}
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

    //var user_password = $("#inputPassword").val();
    //var user_email = $("#inputEmail").val();

    console.log(email + " " + password)

    var user = new Parse.User();
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
//    var user_password = $("#loginPassword").val();
//    var user_email = $("#loginEmail").val();
    const user = await Parse
        .User
        .logIn(email, password);

    currentUser = Parse
        .User
        .current();
    if (currentUser) {
    //TODO move this to routes
        userChannels = await getUserChannels();
        displayUserChannelList();

        $("#loginForm").hide();
        $("#loginChoice").show();
        $("#login").hide();
        $("#signup").hide();
        $("#logout").show();
        // 		$("#loginForm").show();

        console.log("loggedin")
    } else {
        console.log("loggedout")
    }
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

export  {User, userLogin};