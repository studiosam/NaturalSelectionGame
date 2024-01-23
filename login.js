const loginBtn = document.querySelector("#login");
const loginError = document.querySelector("#loginError");
const currentUser = document.querySelector("#currentUser");
const currentUserData = localStorage.getItem("username");
const logoutBtn = document.querySelector("#logout");
// loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);
const form = document.querySelector("#loginForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  login();
});
currentUser.innerHTML = currentUserData;
async function logout() {
  localStorage.removeItem("username");
  currentUser.innerHTML = localStorage.getItem("username");
}
async function login() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  if (username == "" || password == "") {
    loginError.innerHTML = "PLEASE FUCKING LOGIN";
  } else {
    loginError.innerHTML = "LOGGED IN!";

    localStorage.setItem("username", username);
    currentUser.innerHTML = localStorage.getItem("username");
    const formData = new FormData(form);
    console.log(formData.get("username"));
    sendLoginData(formData);
  }
}

async function sendLoginData(formData) {
  const response = fetch("http://127.0.0.1:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });
  console.log(formData);
}
