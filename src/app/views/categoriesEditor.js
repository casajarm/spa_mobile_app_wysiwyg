const {render, html, svg} = lighterhtml;

//const categoriesEditorView = categories => {
const categoriesEditorView = (Channel) => {
	console.info('rendering categoriesEditorView');
	let selectedItem;
	let categoriesEditorViewHTML = html`
	<div id="categoriesEditor"
		class="editorWindow"
		ondragover="${handleDrag}"
	>
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
								class="${cat.attributes.disable == 1 ? 'disabledCategory' : 'test'}"
								draggable="true"
								ondragend="${handleDrop}"
								ondragstart="${handleDragStart}"
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
		<div class="selectDiv text-center">
			<button
				type="button"
				id="addNewCategories"
				class="btn btn-default addCategories"
				data-toggle="modal"
				data-target="#addCategoriesModal"
				>
				<i
					style="font-size: 1.3em; color: white; margin-top: 4px;"
					class="far fa-plus-square grow"
				></i>
				Add Categories
			</button>
		</div>
	</div>`;

	function handleDragStart(event) {
		console.info('drag starting');
		event.dataTransfer.setData("text/plain", "Text to drag");
		selectedItem = event.target;
		// set target on start so the dragover listener can handle the swapping
		// firsfox won't give us clientX and clientY on the drag event..just dragover
	}

	function handleDrag(event) {
		console.info('drag happening');
		const list = selectedItem.parentNode,
			x = event.clientX,
			y = event.clientY;

		selectedItem.classList.add('drag-sort-active');
		let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
		// TODO a more functional approach would be to just look at keys being swapped and send them to the model as actions
		if (list === swapItem.parentNode) {
			swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
			list.insertBefore(selectedItem, swapItem);
		}
	}

	async function handleDrop(event) {
		event.target.classList.remove('drag-sort-active');
		await setNewGroupOrder();
		console.info('categories sorted now refresh views');
		// seems we like dom manipulation in page messes up the render cycle
		// so we need to just blank this panel and let it rerender
		let elem = document.getElementById('panel-categories');
		render(elem, () => html``);
		Channel.updateViews();
	}

	//sets group order to order that was set in the dragable editor
	async function setNewGroupOrder() {
		//user catOrder above to update all groups order
		let catOrder = document.querySelectorAll('#categoriesInEditor li');
		for (var i = 0; i < catOrder.length; i++) {
			let thisID = catOrder[i].dataset.i;
			let group = Channel.categories.find(x => x.id === thisID);
			let order = i + 1;
			group.set("order", order);
		}
		await Parse.Object.saveAll(Channel.categories);
		Channel.categories.sort(function (a,b) {
					console.info('category array sort element');
					return a.get('order') - b.get('order');
				});
		return;
	}

	console.log(categoriesEditorViewHTML);
	return categoriesEditorViewHTML;
}

export default categoriesEditorView;