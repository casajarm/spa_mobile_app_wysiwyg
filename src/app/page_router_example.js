'use strict'
import getUserChannels from './modules/users.js';
var panel1, panel2, panel3, holdingPen, channelName, user;
var userChannels = [];
channelName = 'You Beautiful Person You';    
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      initApplication();
      page('/');
    }
  }

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
page.base('/src/app/page_router_example.html');
page('/', function (ctx, next) {
    
    panel2.innerHTML = "";
    panel3.innerHTML = "";

});

page('/link1'
        , function(ctx, next) {
        //panel 2    
            panel2.innerHTML = "";
            renderForm(panel2, signUpForm);            
            //not sure if this is the best place to wire up event handlers...
            let signupUser2 = document.querySelector('#signUpUser2');
            signupUser2
            .addEventListener('click'
                    , function(e){
                        // create the user
                        // clone a channel for them

                        // set orgname/channelname in state 
                        channelName = document.getElementById('inputOrganization').value;          
                        page('/link2');
                        e.preventDefault();
                    }
            );

        //panel 3   
            panel3.innerHTML = "";   
            let productImage = document.createElement("img");
            productImage.src = '../assets/screenshots/IMG_0971.png';
            panel3.appendChild(productImage);
                        
        }
);
page('/login'
        , function(ctx, next) {
            panel2.innerHTML = "";
            panel3.innerHTML = "";

            renderForm(panel2, loginForm);            
            //not sure if this is the best place to wire up event handlers...
            let loginButton = document.querySelector('#loginUser');
            loginButton
            .addEventListener('click'
                    , function(e){
                        // login the user
                        var user_password = $("#loginPassword").val();
                        var user_email = $("#loginEmail").val();                    
                        // then show them the page listing their channels 
                        loginParse(user_email, user_password)
                        .then (function () {
                            page('/channels');
                            }         
                        );
                        e.preventDefault();
                    }
            );
        }
); // login page

page('/distribute'
        , function(ctx, next){
            panel1.innerHTML = 'About your Likemoji Channel';
            panel2.innerHTML = 'A list of links for channel';
            
            //TODO this would be better as a template
            panel3.innerHTML = '';
            let shareForm = document.createElement('form');            
            let shareEmails = document.createElement('textarea');
            shareEmails.value ="Enter emails to share channel";

            let shareButton =document.createElement('button');
            shareButton.innerHTML = 'Send Emails';
            shareButton.className = 'btn btn-default';
            shareButton.addEventListener('click', function(e) {
                alert('emails are on the way');
                e.preventDefault();
            })
            shareForm.appendChild(shareEmails);
            shareForm.appendChild(shareButton);
            panel3.appendChild(shareForm);

        }
); // distribute page

page('/link2'
        , function(ctx, next) {
            panel1.innerHTML = 'About your Likemoji Channel';
            panel2.innerHTML = '';
            panel3.innerHTML = `Congratulations ${channelName}! Here's your new Likemoji channel`;        

            let nextButton = document.createElement('button');
            nextButton.className = 'btn btn-default';
            nextButton.innerHTML = 'Next';
            nextButton.addEventListener('click', function(e) {
                page('/distribute');
                e.preventDefault();
            });
            panel3.appendChild(nextButton);

            //showLink(ctx, next, boilerplate);
            renderForm(panel2, phone);
            }
); // link2 page

page('/channels'
        , function (ctx, next){
            console.log('channel list view');
            if (user.isCurrent()) {
                userChannels = getUserChannels(user.id)
                .then(channels => {
                    console.log(`getUserChannels returned count: ${channels.length}`);
                    panel1.innerHTML = '<h2>Choose a Channel to Edit</h2>';
                    renderForm(panel1, displayChannelList, channels);
                    panel2.innerHTML = '';
                    panel3.innerHTML = '';
                    }
                )
            }
        }
); //channels page

page('/channel/:channelID/edit'
        , function (ctx, next){
            console.log(`entering edit for channel id ${ctx.channelID}`)
        }
); //channel editor page

page('/right/link10'
        , function(ctx, next) {
            console.log('link10');
            showRightLink(ctx, next, 'link10')
            }
);

page('*'
        , function(ctx, next) {
            console.log('missed');
            console.log(ctx);
        }
        

);

function clearPanel(panel) {
    var panelContents = panel.childNodes;
    for(i=0; i<panelContents.length; i++) {
        holdingPen.appendChild(panelContents[i]);
    }
    
}

function renderForm(panel, formFunction, formArguments){
   var form = formFunction(formArguments);
   panel.appendChild(form);
}

function showform(formID, panel) {
    
    var form = document.getElementById(formID);
    form.style.visible = true;
    form.style.display = "block";
    panel.appendChild(form);
    
}
    
function showLink(ctx, next, custom){
    console.log(`Show ${custom}`);
    panel3.innerHTML = "";
    var newElement = document.createElement("P");
    newElement.onclick = function(e){
            page('/right/link10');
            e.preventDefault();
        };
    var newElementContents = document.createTextNode(custom);
    newElement.appendChild(newElementContents);
    panel3.appendChild(newElement);	
}

function showRightLink(ctx, next, custom){
    console.log(`Show ${custom}`);
    panel3 = document.getElementById("targetDiv");		
    console.log(panel3);	
    var newElement = document.createElement("P");
    var newElementContents = document.createTextNode(custom);
    newElement.appendChild(newElementContents);
    panel3.appendChild(newElement);	
}

function signUpForm() {
    let form = document.createElement('div');
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
    form.innerHTML=form2;

    return form;
}

function loginForm() {
    let form = document.createElement('div');
    let target = '';
    let form2 = 
    `<form id="loginForm" class="form">
    <h2>Login to Your Account</h2>
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
    form.innerHTML=form2;
    return form;
}

function phone(){
    let form = document.createElement('div');
    let form2 = document.createElement('div');
    form2.id = 'phoneBackground';
    form2.className = 'phone';
    
    let image = document.createElement('img');
    //TODO revist this ../ reference needed right now for the setting of BASE
    //image.src = '../assets/iPhone_7_front_frame.png';
    image.src = '../assets/iPhone_7_front_frame sized.png';
    image.className = 'phone';
    form2.appendChild(image);
    form.appendChild(form2);
    return form;
}


function displayChannelList(channels) {
    let form = document.createElement('div');
    let orgList = channels.map((i) => {
        return `<li class="channelList" id="${i.id}">${i.attributes.name}</li>`;
     }).join('');
    form.innerHTML=`<ul>${orgList}</ul>`;
    return form;
}

async function loginParse(username, password) {
    console.log(`logIn call with user: ${username} and pwd: ${password}`);
    try {
        user = await Parse.User.logIn(username, password);
        console.log('logged in');
        return user;
    }
    catch(err) {
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
