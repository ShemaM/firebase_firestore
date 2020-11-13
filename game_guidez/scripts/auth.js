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
