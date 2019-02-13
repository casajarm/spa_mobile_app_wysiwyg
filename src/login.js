const Parse = require('parse/node');
const express = require('express');
const app = express();

// Alex's test environment
Parse.initialize("fg8ZXCHKfBOWme42LGPA");
Parse.serverURL = 'https://lmx-stage-alex.herokuapp.com/parse'
// Alex's test environment

// run just for test
testLogin();

async function login(logInfo, callback) {

    let username = logInfo.email,
        password = logInfo.password;

    try {    
        var user = await Parse.User.logIn(username, password)
    }
    catch (error) {
        callback(error.message)
    }
   let sessionID = user.getSessionToken();
   return user;
}

async function testLogin(){
    //prototype object for Organization class from Parse
    const User = Parse.Object.extend("User");
    let parseUser = new User();
    parseUser = await login({email: 'greg3@sqlprompt.net', password: 'greg3'}, console.log)
    console.log('testLogin', parseUser);
    let sessionID = parseUser.getSessionToken();
    console.log('session token', sessionID);
}

app.post('/login', function(req, res) {
    Parse.User.logIn(req.body.username, req.body.password).then(function(user) {
        var val = JSON.stringify({sessionToken: user.getSessionToken()});
        var opts = {path: '/', httpOnly: true};
        res.cookie('parse.session', val, opts);
        
    }).then(null, function(error) {
        res.clearCookie('parse.session');
        ;
    });
});
