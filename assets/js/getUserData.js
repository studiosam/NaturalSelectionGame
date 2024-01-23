const currentUserText = document.querySelector("#currentLoggedUser");
const currentUser = localStorage.getItem("username");
const numOfZylariansContainer = document.querySelector(
  "#numOfZylariansContainer"
);
const numOfZylarians = document.querySelector("#numOfZylarians");
const mainLogoutBtn = document.querySelector("#logoutLink");
mainLogoutBtn.addEventListener("click", handleLog);

async function onLoad() {
  if (currentUser !== null) {
    currentUserText.innerHTML = currentUser;
    const currentUserStats = await getUserData(currentUser);
    console.log(currentUserStats);
    numOfZylariansContainer.style.display = "block";
    numOfZylarians.innerHTML = currentUserStats.length;
  } else {
    mainLogoutBtn.innerHTML = "Login";
  }
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
  return userData.body;
}

onLoad();
