const loginBtn = document.querySelector("#login");
const loginError = document.querySelector("#loginError");
const currentUserData = localStorage.getItem("username");
const logoutBtn = document.querySelector("#logout");
const loginInfo = document.querySelector("#loggedIn");
logoutBtn.addEventListener("click", logout);
const form = document.querySelector("#loginForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  login();
});

if (currentUserData !== null) {
  loginInfo.innerHTML = `Currently Logged in as: <span id="currentUser">${currentUserData}</span>`;
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
} else {
  loginInfo.innerHTML = `Currently Not Logged In`;
  logoutBtn.style.display = "none";
}

async function logout() {
  localStorage.removeItem("username");
  loginInfo.innerHTML = `Currently Not Logged In`;
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
}

async function login() {
  loginError.innerHTML = "";
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  if (username == "" || password == "") {
    loginError.innerHTML = "PLEASE FUCKING LOGIN";
  } else {
    const formData = new FormData(form);
    form.reset();

    sendLoginData(formData);
  }
}

async function sendLoginData(formData) {
  const data = new URLSearchParams(formData);
  const response = await fetch("http://127.0.0.1:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });

  const responseStatus = await response.json();

  loginBtn.style.display = "none";
  if (responseStatus.body === "success") {
    localStorage.setItem("username", responseStatus.user);
    logoutBtn.style.display = "inline-block";
    loginInfo.innerHTML = `Currently Logged in as: <span id="currentUser">${localStorage.getItem(
      "username"
    )}</span>`;
  } else if (responseStatus.body === "error") {
    console.log(responseStatus.type);
    loginError.innerHTML = "Invalid Password";
    loginBtn.style.display = "inline-block";
  }
  console.log(responseStatus.body);
}
