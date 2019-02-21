var panel1, panel2, panel3, holdingPen, orgName;
orgName = 'You Beautiful Person You';    
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
}

page.start({hashbang: false, dispatch: true});
page.base('/src/app/page_router_example.html');
page('/', function (ctx, next) {
    panel3.innerHTML = "";

});

page('/link1'
        , function(ctx, next) {      
            let productImage = document.createElement("img");
            productImage.src = '../assets/screenshots/IMG_0971.png';
            panel3.appendChild(productImage);
            
            panel2.innerHTML = "";
            renderForm(panel2, signUpForm);            
            //not sure if this is the best place to wire up event handlers...
            let signupUser2 = document.querySelector('#signUpUser2');
            signupUser2
            .addEventListener('click'
                    , function(e){
                        page('/link3');
                        e.preventDefault();
                    }
            )            
        }
);
page('/link2'
        , function(ctx, next) {
            panel2.innerHTML = "";
            renderForm(panel2, loginForm);            
            }
);
page('/link3'
        , function(ctx, next) {
            orgName = document.getElementById('inputOrganization').value;
            let boilerplate = `Welcome to the builder ${orgName}`;
            panel1.innerHTML = 'About your Likemoji Channel';
            panel2.innerHTML = '';
            panel3.innerHTML = `Congratulations ${orgName}! Here's your new Likemoji channel`;        
            
            //showLink(ctx, next, boilerplate);
            renderForm(panel2, phone);
            }
);

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

function renderForm(panel, formFunction){
   var form = formFunction();
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
				<label for="organizationSignup">password</label>
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
        <button id="loginUser" type="button" class="btn btn-default" onclick="page('/link10')">
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