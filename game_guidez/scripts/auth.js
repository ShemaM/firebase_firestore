// listern for auth status changes

auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("guides").onSnapshot((snapshot) => {
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

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        bio: signUpform["signup-bio"].value,
      });
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signUpform.reset();
    });
});

// create new  guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("guides")
    .add({
      title: createForm["title"].value,
      content: createForm["content"].value,
    })
    .then(() => {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
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
