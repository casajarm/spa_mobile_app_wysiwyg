const {render, html, svg} = lighterhtml;

function styleEditorView(Channel) {
    let style = Channel.channelStyle;
    //let tempStyle = style.clone();
    let editorView = html `
		<div class="modal-body">
            <div id="colorThemeEditor" class="editorWindow">
                <div id="themeContainer">
                    <h4 style="display:inline">Edit Theme (Color / Font):</h4>
                    <br>
                    <br>
                    <div class="form-group jscolor">
                        <input id="backgroundColor" class="jscolor"
                            data-attr="generalColor"
                            value="${style.get("generalColor")}"
                            onchange=${setTemp}
                        >
                        <label for="backgroundColor"> - Background</label>
                    </div>
                    <div class="form-group">
                        <input id="textColor" class="jscolor"
                            data-attr="generalTextColor"
                            value="${style.get("generalTextColor")}"
                            onchange=${setTemp}
                            >
                        <label for="textColor"> - Text</label>
                    </div>
                    <div class="form-group">
                        <input id="catTextColor" class="jscolor"
                            data-attr="catTextColor"
                            value="${style.get("categoryTextColor")}"
                            onchange=${setTemp}
                        >
                        <label for="catTextColor"> - Category Label Text</label>
                    </div>
                    <div class="form-group">
                        <input id="navColor" class="jscolor"
                            data-attr="tabBar starColor navButtonColor"
                            value="${style.get("tabBar")}"
                            onchange=${setTemp}
                        >
                        <label for="navColor"> - NavBar / Buttons / Stars</label>
                    </div>
                    <div class="form-group">
                        <input id="activeNav" class="jscolor"
                            data-attr="tabBarSelected"
                            value="${style.get("tabBarSelected")}"
                            onchange=${setTemp}
                        >
                        <label for="activeNav"> - Active Nav Button</label>
                    </div>
                </div>
            </div>
    		<div id="themeSaveButtons" class="btn-group themeSaveButtons" role="group" aria-label="...">
                <button id="editorThemeCancel" class="btn btn-editorThemeSave" onclick="${closeStyleEditor}">
                    <label for="themeCancel">
                        <i style="font-size: 1.3em; color: white;" class="fas fa-ban"></i>
                        <h5 style="display:inline">cancel</h5>
                    </label>
                </button>
                <button id="editorThemeSave"
                    class="btn btn-editorThemeSave active"
                    onclick="${saveStyle}"
                >
                    <label>
                            <i style="font-size: 1.3em; color: white;" class="fas fa-save"></i>
                            <h5 style="display:inline">save</h5>
                    </label>
                </button>
            </div>
        </div>`;

    function setTemp(e) {
        let attribs = e.currentTarget.dataset.attr.split(' ');
        let val = e.currentTarget.value;
        console.log(`set attribute ${attribs} to value ${val}`);
        for (i = 0; i < attribs.length; i++) {
            tempStyle.set(attribs[i], val);
        }
    }

    function saveStyle() {
        /*
        style.set("organizationID", returnedOrg.id);
        style.set("generalColor", "#" + $("#backgroundColor").val());
        style.set("tabBar", "#" + $("#navColor").val());
        style.set("starColor", "#" + $("#navColor").val());
        style.set("navButtonColor", "#" + $("#navColor").val());
        style.set("tabBarSelected", "#" + $("#activeNav").val());
        style.set("generalTextColor", "#" + $("#textColor").val());
        style.set("categoryTextColor", "#" + $("#catTextColor").val());
        */
        //TODO what are these here for???
        style.set("fontCategorySize", "Large");
        style.set("font", "Avenir-Next");
        style.set("fontSize", "16");

        style
            .save()
            .then(style => {
                // Execute any logic that should take place after the object is saved.
                // alert('Saved objectId: ' + style.id);
            }, error => {
                // Execute any logic that should take place if the save fails. error is a
                // Parse.Error with an error code and message.
                alert("Failed to create new object, with error code: " + error.message);
            });
    }

    function closeStyleEditor (e) {
        e.preventDefault();
        togglePanelWithin('panel-editor', 'panel3');
    }

    return editorView;
}

function togglePanelWithin(panelName, parentName) {
    let panel, parent;
    panel = document.getElementById(panelName);
    if (panel) {
        parent = document.getElementById(parentName);
        if (parent){
            for (var i = 0; i < parent.children.length; i++) {
                parent.children[i].classList.add('hidden');
              }
            panel.classList.remove('hidden');
        }
        else {
            console.warn(`panel ${parentName} not found`);
        }
    }
    else {
        console.warn(`panel ${panelName} not found`);
    }
}

export default styleEditorView;

//edit color styles edit background color
/*
$("#backgroundColor")
    .change(function () {
        $("#phoneDisplay").css("background-color", "#" + $("#backgroundColor").val());
    });

//edit navbar color

$("#navColor").change(function () {
    $("#navBar").css("background-color", "#" + $("#navColor").val());
});

//edit active navbutton color

$("#activeNav").change(function () {
    $(".activeNavIcon").css("color", "#" + $("#activeNav").val());
});

//edit general text color

$("#textColor").change(function () {
    $(".channelText").css("color", "#" + $("#textColor").val());
});

//edit category text color

$("#catTextColor").change(function () {
    $(".categorytxt").css("color", "#" + $("#catTextColor").val());
});
*/