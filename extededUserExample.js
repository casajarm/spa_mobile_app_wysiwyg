Parse.User.allowCustomUserClass(true);

class User extends Parse.User {
  constructor() {
    super("_User");
  }

  doLogin(email, password) {
    Parse.User.logIn(email, password)
      .then(object => {
        console.log(object);
        this.isAdmin = object.get("isAdmin");
      })
      .catch(console.error);
  }

  doSignUp(username, email, password) {
    return makeAnAdmin(email, password);
  }
}

Parse.Object.registerSubclass("User", User);

const makeAnAdmin = async (email, password) => {
  return Parse.User.signUp(email, password, {
    email: email,
    isAdmin: false
  });
};
