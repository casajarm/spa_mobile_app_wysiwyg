import {render, html} from '//unpkg.com/lighterhtml?module';

const likemojisListView = (likemojis) => {

    const likemojiView = (likemoji) => {
        let likemojiViewHTML = html`<div
            class="likemojis containerLikemojis ui-draggable ui-draggable-handle"
            id="${likemoji.id}"
            data-toggle="modal"
            data-target="#editLikemojisModal"
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
        >
            ${likemojis.map(moji => likemojiView(moji))}
        </div>
    </div>`;

    return likemojisListViewHTML;
}

export default likemojisListView;