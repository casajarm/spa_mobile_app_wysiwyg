import {render, html} from '//unpkg.com/lighterhtml?module';
import {phoneView} from './phoneView.js';

//const categoryEditorView = (category) => {
const categoryEditorView = (Channel) => {
	let category = Channel.selectedCategory;
	let callOut = category.attributes.callOuts.en;
	console.log('category id is ' + category.id);
	console.log('callout is ' + callOut);
	async function saveCallToAction (e) {
		var callOutText = document.getElementById("editorCallOut").value;
		var callOutsObject = {
			en: callOutText
		};
		//TODO check if this is a change before wasting effort to call Parse
		category.set("callOuts", callOutsObject);
		category.save().then(
			group => {
				//rerender the phone
				let phoneViewPanel = document.getElementById('phone-view').parentNode;
				render(phoneViewPanel, () => phoneView(Channel));
			},
			error => {
				// Execute any logic that should take place if the save fails. error is a
				// Parse.Error with an error code and message.
				alert("Failed to create new object, with error code: " + error.message);
			}
		);
	};

	async function saveExtendedInfo (e) {
		let extendedInfoText = $("#categoryExtendedInfo").value;
		let extenedInfoObject = {en: extendedInfoText};
		category.set("descriptions", extenedInfoObject);
		category.save().then(
			group => {
				// Execute any logic that should take place after the object is saved.
			},
			error => {
				// Execute any logic that should take place if the save fails. error is a
				// Parse.Error with an error code and message.
				alert("Failed to create new object, with error code: " + error.message);
			}
		);
	};

	let categoryEditorViewHTML = html`<div id="categoryEditor" class="channelEdit">
			<div
				id="imageUploaderButtons"
				class="btn-group"
				role="group"
				aria-label="..."
			>
				<button
					id="uploadHeader"
					class="btn btn-editorUploadSwitch active"
					data-toggle="modal"
					data-target="#editheaderModal"
				>
					<label>
						<i
							style="font-size: 1.3em; color: white;"
							class="fas fa-file-upload"
						></i>
						<h5 style="display:inline">upload</h5>
					</label>
				</button>
				<button
					id="unsplashSearchModal"
					class="btn btn-editorUploadSwitch"
					data-toggle="modal"
					data-target="#unsplashModal"
				>
					<label>
						<i
							style="font-size: 1.3em; color: white;"
							class="fas fa-camera"
						></i>
						<h5 style="display:inline">unsplash</h5>
					</label>
				</button>
			</div>
			<br />
			<label for="editorCallOut">Call to Action:</label>
			<div class="input-group">
				<input
					type="text"
					class="form-control"
					id="editorCallOut"
					placeholder="Let us know how we're doing..."
					value="${callOut}"
				/>
				<div class="input-group-btn">
					<button
						id="callToActionSave"
						class="btn btn-callToAction"
						type="button"
						onclick=${saveCallToAction}
					>
						save
					</button>
				</div>
			</div>
			<br />

			<div class="btn-group" role="group" aria-label="...">
				<button
					id=""
					type="button"
					class="btn btn-likemojiSwitch"
					aria-pressed="true"
				>
					Off
				</button>
				<button id="" type="button" class="btn btn-likemojiSwitch active">
					On
				</button>
			</div>

			<label> - Likemojis Outline Stroke</label> <br />
			<br />

			<button id="editTheme" class="btn btn-editTheme">
				<label>
					<i
						class="fas fa-edit"
						style="font-size: 1.3em; display:inline"
					></i>
					<h5 style="display:inline">Edit</h5>
				</label>
			</button>
			<label> - Edit Theme (Color / Font)</label> <br />
			<br />
			<button id="editExtendedInfo" class="btn btn-editTheme" onclick=${saveExtendedInfo}>
				<label>
					<i
						class="fas fa-save"
						style="font-size: 1.3em; display:inline"
					></i>
					<h5 style="display:inline">Save</h5>
				</label>
			</button>
			<label style="display:inline" for="categoryExtendedInfo"
				>- Info Text:
				<i style="display:inline" class="fas fa-info-circle"></i
			></label>
			<div class="form-group infoDiv">
				<textarea
					id="categoryExtendedInfo"
					class="form-control infoTextField"
					rows="5"
					placeholder="Here at XYZ Corp, We know that want to put your experience first..."
					>
					${category.attributes.descriptions.en}
				</textarea>
			</div>
		</div>
	</div>`;

	return categoryEditorViewHTML;
}
export default categoryEditorView;