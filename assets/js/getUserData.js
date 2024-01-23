const currentUserText = document.querySelector("#currentLoggedUser");
const currentUser = localStorage.getItem("username");

const mainLogoutBtn = document.querySelector("#logoutLink");
mainLogoutBtn.addEventListener("click", handleLog);

if (currentUser !== null) {
  currentUserText.innerHTML = currentUser;
  getUserData(currentUser);
} else {
  mainLogoutBtn.innerHTML = "Login";
}

async function handleLog() {
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  window.location.href = "/index.html";
}

async function getUserData(currentUser) {
  const currentUserId = localStorage.getItem("id");
  const response = await fetch(
    `http://127.0.0.1:3000/userData?userId=${currentUserId}`
  );
  userData = await response.json();
  console.log(userData.body);
}
