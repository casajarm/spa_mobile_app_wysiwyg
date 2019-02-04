const Parse = require('parse/node');
const express = require('express');
const app = express();
var debug = require('debug')('likemoji:server');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log('Handling login post');
    login(req, res);
    //res.send('attempting login for ' + req.body.username);
});

const login = (req, res) => {
    
    console.log('Calling Parse Login');
    Parse.User.logIn(req.body.username, req.body.password).then(function(user) {
        var val = JSON.stringify({sessionToken: user.getSessionToken()});
        var opts = {path: '/', httpOnly: true};
        res.cookie('parse.session', val, opts);
        res.send('attempting login for ' + req.body.username);
        res.end;        
    }).then(null, function(error) {
        //res.clearCookie('parse.session');
        console.log(error.message);
        ;
    });
};
/*
app.post('/login', function(req, res) {
    Parse.User.logIn(req.body.username, req.body.password).then(function(user) {
        var val = JSON.stringify({sessionToken: user.getSessionToken()});
        var opts = {path: '/', httpOnly: true};
        res.cookie('parse.session', val, opts);
        res.end;        
    }).then(null, function(error) {
        res.clearCookie('parse.session');
        ;
    });
});
*/

module.exports = router;