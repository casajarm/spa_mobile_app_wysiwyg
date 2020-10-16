import {phoneView} from './phoneView.js';
const {render, html, svg} = lighterhtml;

//const badgesListView = (badges) => {
const badgesListView = (Channel) => {
	console.info('rendering badgesListView');
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
            Channel.removeCategoryBadge(Channel.selectedCategory, dropEvent[0])
            .then(render(panel2, () => phoneView(Channel)))
        }
    }

    function dragover(e) {
        e.preventDefault()
    }

    function dragenter(e) {
        e.preventDefault()
    }


    const badgeView = (badge) => {
        let badgeViewHTML = html`<div
            class="badges containerBadges ui-draggable ui-draggable-handle"
            id="${badge.id}"
            data-toggle="modal"
            data-target="#editBadgesModal"
            draggable="true"
            ondragstart="${dragMoji}"
        >
            <img
                src="${badge.attributes.x3.url()}"
                class="badgeImages grow"
            />
            <div class="badgeNames">${badge.attributes.names.en}</div>
        </div>`;

        //console.log(badgeViewHTML);
        return badgeViewHTML;
    };

    let badgesListViewHTML = html`<div id="badgesEditor" class="editorWindow" style="display: block;">
        <h3>Edit Badges</h3>
        <hr/>
        <div
            id="badgesContainer"
            class="scroll badgesContainer-area dynamicAreaOverflow ui-droppable"
            ondragenter="${dragenter}"
            ondragover="${dragover}"
            ondrop="${handleDrop}"
        >
            ${Channel.badges.map(moji => badgeView(moji))}
        </div>
        <div class="selectDiv text-center" data-toggle="modal" data-target="#addBadgesModal">
			<button type="button"  id="addBadgesModalButton" class="btn btn-default addBadges containerBadges"><i style="font-size: 1.3em; color: white; margin-top: 4px;" class="far fa-plus-square grow"></i> Add Badges</button>
        </div>
    </div>`;

    return badgesListViewHTML;
}

export default badgesListView;