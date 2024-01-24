const currentUserText = document.querySelector("#currentLoggedUser");
const currentUser = localStorage.getItem("username");
const numOfZylariansContainer = document.querySelector(
  "#numOfZylariansContainer"
);
const userZylariansContainer = document.querySelector(
  "#userZylariansContainer"
);

const zylarianNameColor = document.querySelector(".zylarianName");
const viewZylariansBtn = document.querySelector("#viewZylarians");
const numOfZylarians = document.querySelector("#numOfZylarians");
const mainLogoutBtn = document.querySelector("#logoutLink");
mainLogoutBtn.addEventListener("click", handleLog);
viewZylariansBtn.addEventListener("click", onLoad);

const zylarianMenu = (zylariandata) => `<div class="col userZylariansCol">
<div class="card zylarianCard" pointer-events="auto"><img class="card-img-top w-100 d-block" />
    <div class="card-body">
        <h4 class="card-title zylarianName" style="background-color:${zylariandata.skinColor}">${zylariandata.name}</h4>
        <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th class="text-center" colspan="2">Stats</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="statItem text-center">Color</td>
                    <td class="statValue text-center">${zylariandata.skinColor}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Texture</td>
                    <td class="statValue text-center">${zylariandata.skinTexture}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Pattern</td>
                    <td class="statValue text-center">${zylariandata.skinPattern}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Height</td>
                    <td class="statValue text-center">${zylariandata.height}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Weight</td>
                    <td class="statValue text-center">${zylariandata.weight}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Limb Type</td>
                    <td class="statValue text-center">${zylariandata.limbType}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Special Feature</td>
                    <td class="statValue text-center">${zylariandata[0][0]}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Diet</td>
                    <td class="statValue text-center">${zylariandata.dietType}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Color Genotypes</td>
                    <td class="statValue text-center">Red: ${zylariandata.redGenotype}, Green: ${zylariandata.greenGenotype}, Blue: ${zylariandata.blueGenotype}, Brown: ${zylariandata.brownGenotype}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Skin Texture Genotypes</td>
                    <td class="statValue text-center">Scales: ${zylariandata.scaleGenotype}, Skin Moisture: ${zylariandata.skinMoistureGenotype}, Featherd: ${zylariandata.feathered}, Furry: ${zylariandata.furry}</td>
                </tr>
            </tbody>
        </table>
    </div>`;

async function onLoad() {
  if (currentUser !== null) {
    currentUserText.innerHTML = currentUser;
    const currentUserStats = await getUserData(currentUser);
    console.log(currentUserStats);
    numOfZylariansContainer.style.display = "block";
    numOfZylarians.innerHTML = currentUserStats.length;
    document.querySelector(
      ".modal-title"
    ).innerHTML = `${currentUser}'s Zylarians`;
    userZylariansContainer.innerHTML = "";
    currentUserStats.forEach((zylarian) => {
      userZylariansContainer.innerHTML += zylarianMenu(zylarian.zylarianData);
    });
    const userZylariansCol = document.querySelectorAll(".zylarianCard");

    userZylariansCol.forEach((card) => {
      card.addEventListener("click", () => {
        // Remove "selected" class from all cards
        userZylariansCol.forEach((otherCard) => {
          if (otherCard !== card && otherCard.classList.contains("selected")) {
            otherCard.classList.remove("selected");
          }
        });

        // Toggle "selected" class for the clicked card
        card.classList.toggle("selected");
        console.log(card);
      });
    });
  } else {
    window.location.href = "/index.html";
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
