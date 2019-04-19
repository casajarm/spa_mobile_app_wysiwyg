const {render, html, svg} = lighterhtml;
function signUpForm() {
    let form = html`<div>
    <form id="signUpForm" class="form">
		<h2>Create Your Account</h2>
		<div class="form-group" id="emaildiv">
			<label for="emailSignup">email</label>
			<input type="email" class="form-control" id="inputEmail" placeholder="enter your email here">
		</div>
		<div class="form-group" id="passworddiv">
			<label for="passwordSignup">password</label>
			<input type="password" class="form-control" id="inputPassword" placeholder="create your password here">
		</div>
		<div class="form-group" id="organizationdiv">
				<label for="organizationSignup">Organization Name</label>
                <input type="text"
                    class="form-control"
                    id="inputOrganization"
                    placeholder="organization name"
                >
		</div>
        <button id="signUpUser2" type="button" class="btn btn-default">Start</button>
    </form>
    </div>`;

    return form;
}
export default signUpForm;