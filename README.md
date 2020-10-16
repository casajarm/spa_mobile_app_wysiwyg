##SPA Mobile Editor
SPA using modules, arrow functions, asynch/await and some other modern stuff
Must be served over http ... file:// protocol will result in CORS error when importing external libraries

To Use:

Clone git repo
Turn on server (node will work fine but I use Live Server extension in VS Code)
Point browser (Chrome or Firefox are working) at URL = http://ipaddress:port/src/app/buildChannel.html

To view the router demo URL = http://ipaddress:port/src/app/page_router_example.html
you can click the login or create new account links..add your name to login email and click submit.


Once we get Webpack running for older browsers will move code into a dist directory


## We may revisit all this node stuff...it should work still
Uses Parse platform..mocked via https://github.com/Hustle/parse-mockdb

Currently only capable of logging in user via Parse Platform 
Using the workspace created by Alex 
To Use:
1. Clone repository
2. Open command prompt in root directory of repository
3. run: "npm install" to install dependencies (express, parse and related subdependencies)
4. Change directory to root
5. run in command prompt: npm start
6. User Postman or equivalent to send the following
{
    "headers": "content-type: application/x-www-form-urlencoded",
    "method": "POST",
    "payload": "username=BaseOrg@sqlprompt.net&password=BaseOrg",
    "url": "http://127.0.0.1:3000/login",
}
7. Confirm response from Post operation includes a session token
    eg parse.session=%7B%22sessionToken%22%3A%22r%3Aa04d0ca1da3efef9db501b03171df76a%22%7D; 
    Note the first run takes time to spin up the Heroku instance

