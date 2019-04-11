import {phoneView} from './phoneView.js';
const {render, html, svg} = lighterhtml;

//const likemojisListView = (likemojis) => {
const likemojisListView = (Channel) => {
	console.info('rendering likemojisListView');
    let panel2 = document.getElementById("panel2");
    function dragMoji(e) {
        e.dataTransfer.setData('Text', e.currentTarget.id + ',add' );
    }

    function handleDrop(e) {
        e.preventDefault();
        // find object dropped..get the id
        //alert('droped moji with id: ' + e.dataTransfer.getData('Text'));
        let mojiID = e.dataTransfer.getData('Text');
        // storing data in drag event as "ID,add" or "ID,remove"
        let dropEvent = e.dataTransfer.getData('Text').split(',');
        if (dropEvent[1] === 'remove') {
            // add it
            Channel.removeCategoryLikemoji(Channel.selectedCategory, dropEvent[0])
            .then(render(panel2, () => phoneView(Channel)))
        }
    }

    function dragover(e) {
        e.preventDefault()
    }

    function dragenter(e) {
        e.preventDefault()
    }


    const likemojiView = (likemoji) => {
        let likemojiViewHTML = html`<div
            class="likemojis containerLikemojis ui-draggable ui-draggable-handle"
            id="${likemoji.id}"
            data-toggle="modal"
            data-target="#editLikemojisModal"
            draggable="true"
            ondragstart="${dragMoji}"
        >
            <img
                src="${likemoji.attributes.x3.url()}"
                class="likemojiImages grow"
            />
            <div class="likemojiNames">${likemoji.attributes.names.en}</div>
        </div>`;

        //console.log(likemojiViewHTML);
        return likemojiViewHTML;
    };

    let likemojisListViewHTML = html`<div id="likemojisEditor" class="editorWindow" style="display: block;">
        <h3>Edit Likemojis</h3>
        <hr/>
        <div
            id="likemojisContainer"
            class="scroll likemojisContainer-area dynamicAreaOverflow ui-droppable"
            ondragenter="${dragenter}"
            ondragover="${dragover}"
            ondrop="${handleDrop}"
        >
            ${Channel.likemojis.map(moji => likemojiView(moji))}
        </div>
        <div class="selectDiv text-center" data-toggle="modal" data-target="#addLikemojisModal">
			<button type="button"  id="addLikemojisModalButton" class="btn btn-default addLikemojis containerLikemojis"><i style="font-size: 1.3em; color: white; margin-top: 4px;" class="far fa-plus-square grow"></i> Add Likemojis</button>
        </div>
    </div>`;

    return likemojisListViewHTML;
}

export default likemojisListView;