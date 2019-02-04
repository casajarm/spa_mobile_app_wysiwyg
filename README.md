##likemoji
ExpressJS based Node app with a SPA front end
Uses Parse platform

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
    "payload": "username=greg3@sqlprompt.net&password=greg3",
    "url": "http://127.0.0.1:3000/login",
}
7. Confirm response from Post operation includes a session token
    eg parse.session=%7B%22sessionToken%22%3A%22r%3Aa04d0ca1da3efef9db501b03171df76a%22%7D; 
    Note the first run takes time to spin up the Heroku instance

**To run any Parse SDK code in node you need at least this minimum:**
const Parse = require('parse/node');
Parse.initialize("fg8ZXCHKfBOWme42LGPA");
Parse.serverURL = 'https://lmx-stage-alex.herokuapp.com/parse'




**Edit a file, create a new file, and clone from Bitbucket in under 2 minutes**

When you're done, you can delete the content in this README and update the file with details for others getting started with your repository.

*We recommend that you open this README in another tab as you perform the tasks below. You can [watch our video](https://youtu.be/0ocf7u76WSo) for a full demo of all the steps in this tutorial. Open the video in a new tab to avoid leaving Bitbucket.*

---




## Edit a file

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Click **Source** on the left side.
2. Click the README.md link from the list of files.
3. Click the **Edit** button.
4. Delete the following text: *Delete this line to make a change to the README from Bitbucket.*
5. After making your change, click **Commit** and then **Commit** again in the dialog. The commit page will open and you’ll see the change you just made.
6. Go back to the **Source** page.

---

## Create a file

Next, you’ll add a new file to this repository.

1. Click the **New file** button at the top of the **Source** page.
2. Give the file a filename of **contributors.txt**.
3. Enter your name in the empty file space.
4. Click **Commit** and then **Commit** again in the dialog.
5. Go back to the **Source** page.

Before you move on, go ahead and explore the repository. You've already seen the **Source** page, but check out the **Commits**, **Branches**, and **Settings** pages.

---

## Clone a repository

Use these steps to clone from SourceTree, our client for using the repository command-line free. Cloning allows you to work on your files locally. If you don't yet have SourceTree, [download and install first](https://www.sourcetreeapp.com/). If you prefer to clone from the command line, see [Clone a repository](https://confluence.atlassian.com/x/4whODQ).

1. You’ll see the clone button under the **Source** heading. Click that button.
2. Now click **Check out in SourceTree**. You may need to create a SourceTree account or log in.
3. When you see the **Clone New** dialog in SourceTree, update the destination path and name if you’d like to and then click **Clone**.
4. Open the directory you just created to see your repository’s files.

Now that you're more familiar with your Bitbucket repository, go ahead and add a new file locally. You can [push your change back to Bitbucket with SourceTree](https://confluence.atlassian.com/x/iqyBMg), or you can [add, commit,](https://confluence.atlassian.com/x/8QhODQ) and [push from the command line](https://confluence.atlassian.com/x/NQ0zDQ).