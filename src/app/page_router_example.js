"use strict";
import {getUserChannels, newUser} from "./modules/users.js";
import cloneChannel from "./modules/clonechannel.js";
import Organization from "./modules/organizations.js";
import {getStyle} from "./modules/styles.js";
import {Group, getMainCategory} from "./modules/groups.js";

var panel1,
    panel2,
    panel3,
    holdingPen,
    channelName,
    user,
    channelID,          // currently selected channel ID
    categoryID,         // currently selected category ID
    channels,           // list of users channels
    channelStyle,       // current style of selected channel
    likemojis,          // all likemojis for channel
    categoryLikemojis,  // likemojis for selected category
    categories;

var channel =  new Organization();    // current channel
var category = new Group();

channelName = "You Beautiful Person You";
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        initApplication();
        page("/");
    }
};

function initApplication() {
    panel1 = document.getElementById("panel1");
    panel2 = document.getElementById("panel2");
    panel3 = document.getElementById("panel3");
    holdingPen = document.getElementById("hiddenContainer");
    console.log(holdingPen);

    Parse.initialize("fg8ZXCHKfBOWme42LGPA");
    Parse.serverURL = "https://lmx-stage-alex.herokuapp.com/parse";
    user = new Parse.User();
}

page.start({hashbang: false, dispatch: true});
//page.base("/src/app/page_router_example.html");
page.base('/src/app');
page("/", function (ctx, next) {
    panel1.innerHTML = `
        <ul>
            <li><a href="signup">Create New Account</a></li>
            <li><a href="login">Login</a></li>
        </ul>`;

    panel2.innerHTML = "";
    panel3.innerHTML = "";
});

page("/home", function (ctx, next) {
    page("/");
});

page("/signup", function (ctx, next) {
    //panel 2
    panel2.innerHTML = "";
    renderForm(panel2, signUpForm);
    //not sure if this is the best place to wire up event handlers...
    let signupUser2 = document.querySelector("#signUpUser2");
    signupUser2.addEventListener("click", async function (e) {
        e.preventDefault();
        // create the user
        let user_password = document
            .getElementById("inputPassword")
            .value;
        let user_email = document
            .getElementById("inputEmail")
            .value;
        try {
            user = await newUser(user_email, user_password)
        } catch (e) {
            alert('error: ' + e);
            // TODO we could redirect to another route?
        }

        // TODO we need to put validation controls around the signup form
        if (user.isCurrent()) {
            // set orgname/channelname in state
            channelName = document
                .getElementById("inputOrganization")
                .value;

            // TODO see if we can just give it a route for clone and then a "next" clone a
            // channel for them start by cloning channel 0rUmexIHBw
            const targetOrg = new Organization();
            const channelID = "0rUmexIHBw"; //TODO make this dynamic based on how they enter
            targetOrg.set("name", channelName);
            targetOrg
                .save()
                .then(async function (org) {
                    console.log("New org saved .. now clone");
                    await cloneChannel({targetOrgId: org.id, sourceOrgId: channelID});
                    //hide login link
                    document.getElementById('login').classList.add('active');

                    page("/link2");

                });
        }
    });

    //panel 3
    panel3.innerHTML = "";
    let productImage = document.createElement("img");
    productImage.src = "../assets/screenshots/IMG_0971.png";
    panel3.appendChild(productImage);
});


page("/login", function (ctx, next) {
    panel1.innerHTML = "";
    panel2.innerHTML = "";
    panel3.innerHTML = "";

    let headline = document.createElement('h2');
    headline.innerHTML = 'Login to your account';
    panel2.appendChild(headline); 
    renderForm(panel2, loginForm);
    
    //not sure if this is the best place to wire up event handlers...
    let loginButton = document.querySelector("#loginUser");
    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        // login the user
        var user_password = $("#loginPassword").val();
        var user_email = $("#loginEmail").val();
        // then show them the page listing their channels
        console.log(`responding to the click event ${e}`);
        loginParse(user_email, user_password).then(function () {
            //hide login link
            document.getElementById('login').classList.add('active');
            // move along
            page("/channels");
        });
    });
}); // login page

page("/distribute", function (ctx, next) {
    panel1.innerHTML = "About your Likemoji Channel";
    panel2.innerHTML = "A list of links for channel";

    //TODO this would be better as a template
    panel3.innerHTML = "";
    let shareForm = document.createElement("form");
    let shareEmails = document.createElement("textarea");
    shareEmails.value = "Enter emails to share channel";

    let shareButton = document.createElement("button");
    shareButton.innerHTML = "Send Emails";
    shareButton.className = "btn btn-default";
    shareButton.addEventListener("click", function (e) {
        alert("emails are on the way");
        e.preventDefault();
    });
    shareForm.appendChild(shareEmails);
    shareForm.appendChild(shareButton);
    panel3.appendChild(shareForm);
}); // distribute page

page("/link2", function (ctx, next) {
    panel1.innerHTML = "About your Likemoji Channel";
    panel2.innerHTML = "";
    panel3.innerHTML = `Congratulations ${channelName}! Here's your new Likemoji channel`;

    let nextButton = document.createElement("button");
    nextButton.className = "btn btn-default";
    nextButton.innerHTML = "Next";
    nextButton.addEventListener("click", function (e) {
        page("/distribute");
        e.preventDefault();
    });
    panel3.appendChild(nextButton);

    //showLink(ctx, next, boilerplate);
    renderForm(panel2, phone);
}); // link2 page

page("/channels", async function (ctx, next) {
    console.log("channel list view");
    if (user.isCurrent()) {
    channels = await getUserChannels(user.id)
    console.log(`getUserChannels returned count: ${channels.length}`);
    panel1.innerHTML = "<h2>Choose a Channel to Edit</h2>";
    renderForm(panel1, displayChannelList, channels);
    panel2.innerHTML = "";
    panel3.innerHTML = "";
    }

}); //channels page

page("/channel/:channelID/clone", function (ctx, next) {
    let channelID = ctx.params.channelID;
    console.log(`entering clone for channel id ${channelID}`);
    let targetOrgName = "Clone of " + channelID;
    const targetOrg = new Organization();
    targetOrg.set("name", targetOrgName);
    targetOrg
        .save()
        .then(async function (org) {
            console.log("New org saved .. now clone");
            await cloneChannel({targetOrgId: org.id, sourceOrgId: channelID});
        });
});

page("/channel/:channelID/view",  async function (ctx, next) {
    channelID = ctx.params.channelID;
    console.log(`entering view for channel id ${channelID}`);
    panel2.classList.add('phone-frame');
    categories = await getOrgCategories(channelID);
    //likemojis = await get ALL LIKEMOJIS FOR CHANNEL
    panel2.innerHTML ="";
    
    category = getMainCategory(categories);
    
    renderForm(panel2, phone, category);
    
    let style = getStyle(channelID)
    .then((_style) => {
       let style = _style[0];
       renderForm(panel2, inlineStyle, style);

    });

});//channel view

page("/channel/:channelID/view/:groupID", async function (ctx, next) {
    channelID = ctx.params.channelID;
    categoryID = ctx.params.groupID;
    ctx.save();

    console.log(`entering view for channel id ${channelID} and group ${categoryID}`);
    panel2.classList.add('phone-frame'); 
    panel2.innerHTML ="";

    categories = await getOrgCategories(category.attributes.organizationID);
    likemojis = await getCategoryLikemojis(category);
 
    getOrgCategories(channelID)
    .then(channels => {
        let selectedChannel = channels.find(x => x.id === categoryID);   
        renderForm(panel2, phone, selectedChannel);
    });
    
    let style = getStyle(channelID)
    .then((_style) => {
       let style = _style[0];
       renderForm(panel2, inlineStyle, style);
    });
    
    // TODO add the back button on the left panel

});//channel group page


page("/channel/:channelID/edit", function (ctx, next) {
    console.log(`entering edit for channel id ${ctx.channelID}`);
}); //channel editor page



page("/right/link10", function (ctx, next) {
    console.log("link10");
    showRightLink(ctx, next, "link10");
});

page("*", function (ctx, next) {
    console.log("catch all route");
    console.log(ctx);
});

function clearPanel(panel) {
    var panelContents = panel.childNodes;
    for (i = 0; i < panelContents.length; i++) {
        holdingPen.appendChild(panelContents[i]);
    }
}

function renderForm(panel, formFunction, formArguments) {
    let form;
    // sometimes form is a promise
    // try to resolve and if it is not a thennable just append the result
    // 
    try {
         formFunction(formArguments).then(_form => {panel.appendChild(_form)});
    }
    catch (err) {
        form = formFunction(formArguments);  
        panel.appendChild(form);      
    }    
}

function showform(formID, panel) {
    var form = document.getElementById(formID);
    form.style.visible = true;
    form.style.display = "block";
    panel.appendChild(form);
}

function showLink(ctx, next, custom) {
    console.log(`Show ${custom}`);
    panel3.innerHTML = "";
    var newElement = document.createElement("P");
    newElement.onclick = function (e) {
        page("/right/link10");
        e.preventDefault();
    };
    var newElementContents = document.createTextNode(custom);
    newElement.appendChild(newElementContents);
    panel3.appendChild(newElement);
}

function showRightLink(ctx, next, custom) {
    console.log(`Show ${custom}`);
    panel3 = document.getElementById("targetDiv");
    console.log(panel3);
    var newElement = document.createElement("P");
    var newElementContents = document.createTextNode(custom);
    newElement.appendChild(newElementContents);
    panel3.appendChild(newElement);
}

function signUpForm() {
    let form = document.createElement("div");
    let form2 = `<form id="signUpForm" class="form">
		<h2>Create Your Account</h2>
		<div class="form-group" id="emaildiv">
			<label for="emailSignup">email</label>
			<input type="email" class="form-control" id="inputEmail" placeholder="enter your email here">
		</div>
		<div class="form-group" id="passworddiv">
			<label for="passwordSignup">password</label>
			<input type="password" class="form-control" id="inputPassword" placeholder="create your password here">
		</div>		
		<div class="form-group" id="organizationdiv">
				<label for="organizationSignup">Orgnization Name</label>
				<input type="text" class="form-control" id="inputOrganization" placeholder="organization name">
			</div>
        <button id="signUpUser2" type="button" class="btn btn-default">submit</button>`;
    form.innerHTML = form2;

    return form;
}

function loginForm() {
    let form = document.createElement("div");
    let target = "";
    let form2 = `<form id="loginForm" class="form">
    
        <div class="form-group" id="emaildiv">
            <label for="emailSignup">email</label>
            <input type="email" class="form-control" id="loginEmail" placeholder="enter your email here">
        </div>
        <div class="form-group" id="passworddiv">
            <label for="passwordSignup">password</label>
            <input type="password" class="form-control" id="loginPassword" placeholder="enter your password here"></div>
        <button id="loginUser" type="button" class="btn btn-default">
            submit
        </button>
    </form>`;
    form.innerHTML = form2;
    return form;
}

function phoneImage() {
    let form = document.createElement("div");
    let form2 = document.createElement("div");
    form2.id = "phoneBackground";
    form2.className = "phone";

    let image = document.createElement("img");
    // TODO revist this ../ reference needed right now for the setting of BASE
    // image.src = '../assets/iPhone_7_front_frame.png';
    image.src = ".../assets/iPhone_7_front_frame sized.png";
    image.className = "phone";
    form2.appendChild(image);
    form.appendChild(form2);
    return form;
}


//<a href="channel/${i.id}/clone">${i.attributes.name}</a>
function displayChannelList(channels) {
    let form = document.createElement("div");
    let orgList = channels
        .map(i => {
        return `<li class="channelList" id="${i.id}">
                    <a onclick="page('/channel/${i.id}/view')">${i.attributes.name}</a>
                </li>`;
    })
        .join("");
    form.innerHTML = `<ul>${orgList}</ul>`;
    return form;
}

async function loginParse(username, password) {
    console.log(`logIn call with user: ${username} and pwd: ${password}`);
    try {
        user = await Parse
            .User
            .logIn(username, password);
        console.log("logged in");
        return user;
    } catch (err) {
        console.log(`error logging in ${err}`);
    }
    /*
        .then(function (newUser) {
			user = newUser;
			if (user.isCurrent()) {
				console.log("loggedin");
			} else {
				console.log("loggedout");
            }
            return user;
        })
        .then(function (user) {
            console.log('login function returning');
            return user;
        })
        .catch(err => alert(err));
   */
}

function inlineStyle(style) {
    
    let styleRules = `#phoneDisplay { 
        background-color: ${style.get("generalColor")};
    }
    
    .navBar { 
        background-color:  ${style.get("tabBar")}
    }
	
	.activeNavIcon { 
        color:  ${style.get("tabBarSelected")}
    }
	
	.channelText { 
        color:  ${style.get("generalTextColor")}
    }
    .categorytxt { 
        color:  ${style.get("categoryTextColor")}
    }
    `;
    let styleSheet = document.createElement("style");
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = styleRules;
    return styleSheet;
        
}

