import {render, html} from '//unpkg.com/lighterhtml?module';

const categoryEditorView = (category) => {
	let categoryEditorViewHTML = html`<div class="channelEdit">
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
					value="${category.attributes.callOuts.en}"
				/>
				<div class="input-group-btn">
					<button
						id="callToActionSave"
						class="btn btn-callToAction"
						type="button"
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
			<button id="editExtendedInfo" class="btn btn-editTheme">
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