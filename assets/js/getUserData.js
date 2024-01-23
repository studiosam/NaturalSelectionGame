const currentUserText = document.querySelector("#currentLoggedUser");
const currentUser = localStorage.getItem("username");
const mainLogoutBtn = document.querySelector("#logoutLink");
mainLogoutBtn.addEventListener("click", logout);
if (currentUser !== null) {
  currentUserText.innerHTML = currentUser;
}

async function logout() {
  localStorage.removeItem("username");
  window.location.href = "/index.html";
}
