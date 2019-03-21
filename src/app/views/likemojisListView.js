import {render, html} from '//unpkg.com/lighterhtml?module';

//const likemojisListView = (likemojis) => {
const likemojisListView = (Channel) => {

    function dragMoji(e) {
        e.dataTransfer.setData('Text', e.currentTarget.id + ',add' );
    }

    function handleDrop(e) {
        e.preventDefault();
        // find object dropped..get the id
        alert('droped moji with id: ' + e.dataTransfer.getData('Text'));
        let mojiID = e.dataTransfer.getData('Text');
        // storing data in drag event as "ID,add" or "ID,remove"
        let dropEvent = e.dataTransfer.getData('Text').split(',');
        if (dropEvent[1] === 'remove') {
            // add it
            Channel.removeCategoryLikemoji(Channel.selectedCategory, dropEvent[0]);
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
    
        console.log(likemojiViewHTML);
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
    </div>`;

    return likemojisListViewHTML;
}

export default likemojisListView;