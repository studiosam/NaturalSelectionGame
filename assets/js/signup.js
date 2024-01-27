const loginError = document.querySelector("#loginError");
const currentUserData = localStorage.getItem("username");
const loginInfo = document.querySelector("#loggedIn");
const createBtn = document.querySelector("#create");
const form = document.querySelector("#loginForm");
const passwordvalid = document.querySelector("#passwordvalid");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  createNewUser();
});

form.addEventListener("keyup", passwordCheck);

// Checks to see if already logged in //

if (currentUserData !== null) {
  loginInfo.innerHTML = `Currently Logged in as: <span class="currentUser">${currentUserData}</span>`;

  window.location.href = "/create.html";
} else {
  loginInfo.innerHTML = `Currently Not Logged In`;
}

// Server request to Create a new user account //
async function createNewUser() {
  loginError.innerHTML = "";
  const formData = new FormData(form);
  const username = formData.get("username");
  formData.set("username", username.toLowerCase());
  const data = new URLSearchParams(formData);
  const response = await fetch(`${serverAddress}create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });

  const responseStatus = await response.json();

  if (responseStatus.body === "success") {
    loginInfo.innerHTML = `New User <span class="currentUser">${responseStatus.user} Created!</span> <br>Click <a class="signup" href="index.html">Here</a> to Login`;
  } else if (responseStatus.body === "error") {
    console.log(responseStatus.type);
    loginError.innerHTML = "Error. User Not Created";
  } else if (responseStatus.body === "userexists") {
    loginError.innerHTML = `User <span class="currentUser">${responseStatus.user}</span> Already Exists!<br>Click <a class="signup" href="index.html">Here</a> to Login`;
  }
  console.log(responseStatus.body);
  form.reset();
}

// Checks if signup passwords match. Runs after every keypress//
function passwordCheck() {
  const password1 = document.querySelector("#password").value;
  const password2 = document.querySelector("#confirmpassword").value;
  if (password1 || password2 !== "") {
    if (password1 !== password2) {
      passwordvalid.style.display = "block";
      createBtn.disabled = true;
      console.log("doesnt match");
    } else {
      passwordvalid.style.display = "none";
      createBtn.disabled = false;
      console.log("MATCH!");
    }
  }
}
