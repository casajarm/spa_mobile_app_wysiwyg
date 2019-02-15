var panel1, panel2, panel3, holdingPen;
    
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      initApplication();
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
page.base('/src/app');
page('/link1'
        , function(ctx, next) {
            //showLink(ctx, next, 'link1');
            clearPanel(panel2);
            showform('signUpForm', panel2);
            }
);
page('/link2'
        , function(ctx, next) {
            showLink(ctx, next, 'link2')
            }
);
page('/link3'
        , function(ctx, next) {
            showLink(ctx, next, 'link3')
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
        

)

function clearPanel(panel) {
    var panelContents = panel.childNodes;
    for(i=0; i<panelContents.length; i++) {
        holdingPen.appendChild(panelContents[i]);
    }
    
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

