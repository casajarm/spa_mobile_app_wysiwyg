const {render, html, svg} = lighterhtml;

const catLeftView = (categories) => {


    function hideAll() {
        let panel3Container = document.getElementById('panel3');
        for (var i = 0; i < panel3Container.children.length; i++) {
            panel3Container.children[i].classList.add('hidden');
          }
    }

    function callCategoriesEditor (e) {
        let catsView = document.getElementById('categoriesEditor');
        console.log('clicked callCategoriesEditor');
        hideAll();
        catsView.classList.remove('hidden');
    }
    
    function callCategoryEditor (e) {
        let catsView = document.getElementById('categoryEditor');
        console.log('clicked callCategoryEditor');
        hideAll();
        catsView.classList.remove('hidden');
    }
    
    function callLikemojiEditor (e) {
        let catsView = document.getElementById('likemojisEditor');
        console.log('clicked callLikemojiEditor');
        hideAll();
        catsView.classList.remove('hidden');
    }


    return html`<div>
        <h3>Design & Edit Your Channel</h3>
        <hr />
        <div>
            <ul>
                <li><h4>Customize the look and feel</h4></li>
                <li><h4>Drag Likemojis in or out</h4></li>
                <li><h4>Sort or disable Categories</h4></li>
            </ul>
        </div>
        <hr />
        <div class="selectDiv text-center">
            <button 
                id="addHeader"
                type="button"
                class="btn btn-default active editor"
                aria-pressed="true"
                onclick="${callCategoryEditor}"
            >
                Edit Page
            </button>
            <!-- 	<p>Upload header image - (1242px × 704px)</p></center> -->
        </div>
        <div class="selectDiv text-center">
            <button id="addLikemojis" type="button" class="btn btn-default editor"  onclick="${callLikemojiEditor}">
                Add/Edit Likemojis
            </button>
            <!-- <p>Upload likemojis - (324px × 324px)</p></center> -->
        </div>
        <div id="categoryEditorButton" class="selectDiv text-center">
            <button id="addCategories" type="button" class="btn btn-default editor" onclick="${callCategoriesEditor}">
                Add/Edit Categories
            </button>
            <!-- <p>Upload category image - (1242px × 312px)</p></center> -->
        </div>
        <div id="afterEditorButton" class="selectDiv text-center">
            <button id="afterEditing" type="button" class="btn btn-default editor">
                Next
            </button>
            <!-- <p>Upload category image - (1242px × 312px)</p></center> -->
        </div>
        <div id="cancelSaveGroup" class="selectDiv text-center" style="display:none">
            <div class="btn-group " role="group" aria-label="...">
                <button
                    id="cancelLikemojiAdd"
                    type="button"
                    class="btn btn-danger"
                    aria-pressed="true"
                >
                    cancel
                </button>
                <button id="saveLikemojiAdd" type="button" class="btn btn-success active">
                    save
                </button>
            </div>
            <p>(Save Likemojis to Current View)</p>
        </div>
        <div
            id="phoneDisplayBackButton"
            class="selectDiv text-center"
            style="display:none"
        >
            <button id="backFromGroup" type="button" class="btn btn-default editorBack">
                <i class="fas fa-chevron-left"></i> Back
            </button>
        </div>
    </div>`;
}

export default catLeftView;