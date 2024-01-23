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
  loginInfo.innerHTML = `Currently Logged in as: <span class="currentUser">${currentUserData}</span>`;
  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  window.location.href = "/NaturalSelectionGame.html";
} else {
  loginInfo.innerHTML = `Currently Not Logged In`;
  logoutBtn.style.display = "none";
}

async function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  loginInfo.innerHTML = `Currently Not Logged In`;
  loginBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
}

async function login() {
  loginError.innerHTML = "";
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const formData = new FormData(form);

  formData.set("username", username.toLowerCase());

  form.reset();
  sendLoginData(formData);
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
    localStorage.setItem("id", responseStatus.id);
    logoutBtn.style.display = "inline-block";
    loginInfo.innerHTML = `Currently Logged in as: <span class="currentUser">${localStorage.getItem(
      "username"
    )}</span>`;
    window.location.href = "/NaturalSelectionGame.html";
  } else if (responseStatus.body === "error") {
    console.log(responseStatus.type);
    loginError.innerHTML = "Invalid Password";
    loginBtn.style.display = "inline-block";
  } else if (responseStatus.body === "new") {
    console.log("User Not Found" + responseStatus.user);
    loginBtn.style.display = "inline-block";
    loginError.innerHTML = `User <span class = "currentUser">${responseStatus.user}</span> Not Found.`;
    loginError.style.display = "inline-block";
  }
  console.log(responseStatus.body);
}
