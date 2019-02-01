const Parse = require('parse/node');
const express = require('express');
const app = express();

// Alex's test environment
Parse.initialize("fg8ZXCHKfBOWme42LGPA");
Parse.serverURL = 'https://lmx-stage-alex.herokuapp.com/parse'
// Alex's test environment

/*
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
*/

login({email: 'greg3@sqlprompt.net', password: 'greg3'}, console.log);

//userLogin('greg3@sqlprompt.net', 'greg3');
function login(logInfo, callback) {
    let username = logInfo.email,
        password = logInfo.password;

    Parse.User.logIn(username, password).then(
        (user) => {
            if(!user) {
                callback('No user found');
            } else {
                let sessionID = user.getSessionToken();
                callback(null, user);
                callback(null, sessionID);
            }
        },
        (error) => {
            callback(error.message, null);
        }
    );
}
