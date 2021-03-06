const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountdetails = document.querySelector(".account-details");

// setup ui

const setupUI = (user) => {
  if (user) {
    //  account info
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
        <div>Logged in as ${user.email}
        <div>${doc.data().bio}
        `;
        accountdetails.innerHTML = html;
      });

    // toggle ui element
    loggedInLinks.forEach((item) => {
      item.style.display = "block";

      loggedOutLinks.forEach((item) => {
        item.style.display = "none";
      });
    });
  } else {
    // hiding account
    accountdetails.innerHTML = "";
    loggedInLinks.forEach((item) => {
      item.style.display = "none";

      loggedOutLinks.forEach((item) => {
        item.style.display = "block";
      });
    });
  }
};

// setup guides
const setupGuides = (data) => {
  let html = "";
  if (data.length) {
    data.forEach((doc) => {
      const guide = doc.data();
      const li = `
    <li>
    <div class="collapsible-header grey lighten-4">${guide.title}</div>
    <div class="collapsible-body white">${guide.content} </div>
    </li> 
    `;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = `<h5 class="center-align">Login to view guides </h5>`;
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
