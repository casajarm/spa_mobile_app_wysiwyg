import {phoneView} from './phoneView.js';
//.for(categories)

const {render, html, svg} = lighterhtml;

//const categoriesEditorView = categories => {
const categoriesEditorView = (Channel) => {
	let categoriesEditorViewHTML = html`
	<div id="categoriesEditor" class="editorWindow">
		<h3>Edit Categories</h3>
		<hr />
		<div id="editorContainer" class="image upload">
			<h4 style="display:inline">Click to edit / Drag to reorder:</h4>
			<ul id="categoriesInEditor">
				${Channel.categories.map((cat, index) => 
					cat.attributes.main != 1
					? html`<li
								id="${cat.id+index}"
								data-i="${cat.id}"
								data-toggle="modal"
								data-target="#addCategoriesModal"
								class="${cat.attributes.disable == 1 ? 'disable' : ''}"
								draggable="true"
								ondrag="${handleDrag}"
								ondragend="${handleDrop}"
								>
								<i class="fas fa-sort"></i>
								<i class="fas fa-edit floatRight"></i>
								<p class="inlineDisplay">${cat.attributes.name}</p>
								<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>
							</li>`
					: html``
			)}
			</ul>
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
	</div>`;

	function handleDrag(event) {
		const selectedItem = event.target,
		list = selectedItem.parentNode,
		x = event.clientX,
		y = event.clientY;

		selectedItem.classList.add('drag-sort-active');
		let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

		if (list === swapItem.parentNode) {
			swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
			list.insertBefore(selectedItem, swapItem);
		}
	}

	function handleDrop(event) {
		event.target.classList.remove('drag-sort-active');
		setNewGroupOrder();
	}

	//sets group order to order that was set in the dragable editor
	function setNewGroupOrder() {
		//user catOrder above to update all groups order
		let catOrder = document.querySelectorAll('#categoriesInEditor li');	
		for (var i = 0; i < catOrder.length; i++) {
			let thisID = catOrder[i].dataset.i;
			let group = Channel.categories.find(x => x.id === thisID);
			let order = i + 1;
			group.set("order", order);
		}
		Parse.Object.saveAll(Channel.categories).then(
			async groupsSaved => {
				Channel.categories.sort(function (a,b) {
					return a.get('order') - b.get('order');
  				});
				
				for (var i = 1; i < Channel.categories.length; i++) {
					console.log(Channel.categories[i].id + " " + Channel.categories[i].attributes.order);
				}
				//refresh phone panel here
				render(panel2, () => phoneView(Channel, Channel.mainCategory.id));
			},
			error => {
				reject();
				alert("Failed to create new objects, with error code: " + error.message);
			}
		);
	}
	return categoriesEditorViewHTML;	
}        

export default categoriesEditorView;