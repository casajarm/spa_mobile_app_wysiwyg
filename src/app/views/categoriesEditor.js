import {render, html} from '//unpkg.com/lighterhtml?module';

const categoriesEditorView = categories => {
	let categoriesEditorViewHTML = html`
		<div id="categoriesEditor" class="editorWindow" style="display:none">
			<h3>Edit Categories</h3>
			<hr />
			<div id="editorContainer" class="image upload">
				<h4 style="display:inline">Click to edit / Drag to reorder:</h4>
				<ul id="categoriesInEditor"></ul>
                ${categories.map((cat, index) => 
					cat.attributes.main != 1
						? html`<li
									id="${cat.id+index}"
									data-toggle="modal"
									data-target="#addCategoriesModal"
                                    class="${cat.attributes.disable == 1 ? 'disable' : ''}"
                                    >
									<i class="fas fa-sort"></i>
									<i class="fas fa-edit floatRight"></i>
									<p class="inlineDisplay">{cat.attributes.name}</p>
									<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>
								</li>`
						: html`<span></span>`
                )}
			</div>
			<div
				class="selectDiv text-center"
				data-toggle="modal"
				data-target="#addCategoriesModal"
			>
				<button
					type="button"
					id="addNewCategories"
					class="btn btn-default addCategories"
				>
					<i
						style="font-size: 1.3em; color: white; margin-top: 4px;"
						class="far fa-plus-square grow"
					></i>
					Add Categories
				</button>
			</div>
		</div>
	`;
    return categoriesEditorViewHTML;
}        
/*

if (groupSelected.attributes.main == 1) {
	for (var i = 0; i < groups.length; i++) {
		if (categoriesSorted[i].attributes.main == 1) {
			// console.log ("skipped");
		} else {
			var text = document.createElement("p");
			var li = document.createElement("li");
			var span = document.createElement("span");
			var icon = document.createElement("i");
			var icon2 = document.createElement("i");

			text.innerHTML = categoriesSorted[i].attributes.name;
			text.setAttribute("class", "inlineDisplay");

			icon.setAttribute("class", "fas fa-sort");
			icon2.setAttribute("class", "fas fa-edit floatRight");

			span.setAttribute("class", "ui-icon ui-icon-arrowthick-2-n-s");
			li.setAttribute("id", categoriesSorted[i].id + i);
			li.setAttribute("data-toggle", "modal");
			li.setAttribute("data-target", "#addCategoriesModal");

			li.appendChild(icon);
			li.appendChild(icon2);
			li.appendChild(text);

			li.appendChild(span);

			if (categoriesSorted[i].attributes.disable == 1) {
				li.setAttribute("class", "disabledCategory");
			}

			var element = document.getElementById("categoriesInEditor");
			element.appendChild(li);
		}
	}
} else {
	console.log("no groups to display");
}
*/

export default categoriesEditorView;