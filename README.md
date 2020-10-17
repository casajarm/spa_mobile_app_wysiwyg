##SPA Mobile Editor
SPA using modules, arrow functions, asynch/await and some other modern stuff
Must be served over http ... file:// protocol will result in CORS error when importing external libraries

To Use:

1. Clone repository
2. Open command prompt in root directory of repository
3. run: "npm install" to install dependencies (express, parse and related subdependencies)
4. webpack: "npx webpack --config webpack.config.js"   (only really needed for Parse Mock)
5. Turn on server (node will work fine but I use Live Server extension in VS Code)
6. Point browser (Chrome or Firefox are working) at URL = http://ipaddress:port/src/app/
7. Create new user

The code uses Parse platform
but you don't have to because this includes a mocked Parse API via https://github.com/Hustle/parse-mockdb

Using Parse Mock you will be able to keep your changes until you close out browser. Uses LocalStorage.

Using Parse Mock you cannot upload files yet...

To Use Parse DB on Heroku:
1. Clone repository
2. Open command prompt in root directory of repository
3. run: "npm install" to install dependencies (express, parse and related subdependencies)
4. Change directory to root
5. run in command prompt: npm start
6. User Postman or equivalent to send the following
{
    "headers": "content-type: application/x-www-form-urlencoded",
    "method": "POST",
    "payload": "username=BaseOrg@YOURBASEDOMAIN&password=BaseOrg",
    "url": "http://127.0.0.1:3000/login",
}
7. Confirm response from Post operation includes a session token
    eg parse.session=%7B%22sessionToken%22%3A%22r%3Aa04d0ca1da3efef9db501b03171df76a%22%7D; 
    Note the first run takes time to spin up the Heroku instance
