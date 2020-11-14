// listern for auth status changes

auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("guides")
      .get()
      .then((snapshot) => {
        setupGuides(snapshot.docs);
      });
    setupUI(user);
  } else {
    setupUI();
    setupGuides([]);
  }
});

const signUpform = document.querySelector("#signup-form");

signUpform.addEventListener("submit", (e) => {
  e.preventDefault();

  // getting user info
  const email = signUpform["signup-email"].value;
  const password = signUpform["signup-password"].value;

  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signUpform.reset();
  });
});

//  signout a user

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();

  auth.signOut().then(() => {
    console.log("user signed out");
  });
});

// login

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // logout
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    // closing session
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
