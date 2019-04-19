
function loginForm() {
    let form = html`<h2>Login to your account</h2>
    <form id="loginForm" class="form">
        <div class="form-group" id="emaildiv">
            <label for="emailSignup">email</label>
            <input type="email" class="form-control" id="loginEmail" placeholder="enter your email here">
        </div>
        <div class="form-group" id="passworddiv">
            <label for="passwordSignup">password</label>
            <input type="password" class="form-control" id="loginPassword" placeholder="enter your password here"></div>
        <button id="loginUser" type="button" class="btn btn-default">
            Login
        </button>
    </form>`;
    return form;
}

export default loginForm;