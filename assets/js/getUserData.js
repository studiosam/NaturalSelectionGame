const currentUserText = document.querySelector("#currentLoggedUser");
const currentUser = localStorage.getItem("username");
const numOfZylariansContainer = document.querySelector(
  "#numOfZylariansContainer"
);
const userZylariansContainer = document.querySelector(
  "#userZylariansContainer"
);
const zylarianModalStatus = document.querySelector("#zylarianModalStatus");
const selectedZylarian = document.querySelector("#selectedZylarian");
const zylarianNameColor = document.querySelector(".zylarianName");
const viewZylariansBtn = document.querySelector("#viewZylarians");
const numOfZylarians = document.querySelector("#numOfZylarians");
const mainLogoutBtn = document.querySelector("#logoutLink");
const trashCan = document.querySelector(".trashbtn");
const selectedForDelete = document.querySelector("#selectedForDelete");
const deleteDisplay = document.querySelector("#deleteDisplay");
const finalDeleteBtn = document.querySelector("#finalDeleteBtn");
const closemodal = document.querySelector("#deleteClose");
const zylarianModal = document.querySelector("#zylarianModal");
const config = { attributes: true, attributeOldValue: true };
const observer = new MutationObserver(clearSelections);
observer.observe(zylarianModal, config);

mainLogoutBtn.addEventListener("click", handleLog);
viewZylariansBtn.addEventListener("click", onLoad);
finalDeleteBtn.addEventListener("click", handleDelete);

// HTML for Creating Users Zylarian Population //
const zylarianMenu = (
  zylariandata,
  zyID,
  zylarian,
  cardIndex
) => `<div class="col userZylariansCol">
<div class="card zylarianCard" pointer-events="auto"><img class="card-img-top w-100 d-block" />
    <div class="card-body"><div class="levelContainer">
    <div class="text-end">
        <p class="cardP">Level</p>
    </div>
    <div class="levelCircle">
        <p class="level">1</p>
    </div>
</div>
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
                    <td class="statValue text-center">${zylariandata.specialFeatures[0]}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Diet</td>
                    <td class="statValue text-center">${zylariandata.dietType}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Color Genotypes</td>
                    <td class="statValue text-center">Red: ${zylariandata.colorGenotypes.redGenotype}, Green: ${zylariandata.colorGenotypes.greenGenotype}, Blue: ${zylariandata.colorGenotypes.blueGenotype}, Brown: ${zylariandata.colorGenotypes.brownGenotype}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Skin Texture Genotypes</td>
                    <td class="statValue text-center">Scales: ${zylariandata.skinTextureGenotypes.scaleGenotype}, Skin Moisture: ${zylariandata.skinTextureGenotypes.skinMoistureGenotype}, Feathered: ${zylariandata.skinTextureGenotypes.feathered}, Furry: ${zylariandata.skinTextureGenotypes.furry}</td>
                </tr>
            </tbody>
        </table>
        <span class='zyID' style="display:none">${zyID}</span>
    </div><div class="cardIndex hidden">${cardIndex}</div><div class="text-center text-white mb-2">${zylarian}</div><div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%;">20 EXP</div>
</div></div></div></div>`;

// Gets Users Data from the database and creates their Zylarian Population on page Load //
async function onLoad() {
  if (currentUser !== null) {
    zylarianModalStatus.innerHTML = "Your Zylarians";
    currentUserText.innerHTML = currentUser;
    currentUserStats = await getUserData(currentUser);
    console.log(currentUserStats);
    numOfZylariansContainer.style.display = "block";
    numOfZylarians.innerHTML = currentUserStats.length;
    document.querySelector(
      ".modal-title"
    ).innerHTML = `<span class ="currentUser">${currentUser}'s</span> Zylarians`;
    userZylariansContainer.innerHTML = "";
    let cardIndex = 0;
    if (currentUserStats.length <= 0) {
      zylarianModalStatus.innerHTML =
        "You Do Not Currently Have Any Zylarians :(";
    }
    currentUserStats.forEach((zylarian) => {
      zylarian.cardIndex = cardIndex;
      const dateBorn = zylarian.zylarianData.bornOn;
      const milliseconds =
        dateBorn.seconds * 1000 + Math.floor(dateBorn.nanoseconds / 1e6);
      const providedDate = new Date(milliseconds);
      const currentDate = new Date();
      const date = new Date(milliseconds);
      const timeDifference = currentDate - providedDate;
      const secondsDifference = Math.floor(timeDifference / 1000);
      const minutesDifference = Math.floor(secondsDifference / 60);
      const hoursDifference = Math.floor(minutesDifference / 60);
      const daysDifference = Math.floor(hoursDifference / 24);
      if (daysDifference > 0) {
        zylarian.age = `<span class="currentUser">${daysDifference}</span> days old`;
      } else if (hoursDifference > 0 && hoursDifference < 2) {
        zylarian.age = `<span class="currentUser">${hoursDifference}</span> hour old`;
      } else if (hoursDifference > 0 && hoursDifference > 1) {
        zylarian.age = `<span class="currentUser">${hoursDifference}</span> hours old`;
      } else if (minutesDifference > 0) {
        zylarian.age = `<span class="currentUser">${minutesDifference}</span> minutes old`;
      } else {
        zylarian.age = `<span class="currentUser">${secondsDifference}</span> seconds old`;
      }
      cardIndex++;

      userZylariansContainer.innerHTML += zylarianMenu(
        zylarian.zylarianData,
        zylarian.id,
        zylarian.age,
        zylarian.cardIndex
      );
    });
    // Card Selection Shit //
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

        // Toggle visibility of delete icon based on selected card
        trashCan.classList.toggle(
          "hidden",
          !card.classList.contains("selected")
        );
        selectedZylarian.classList.toggle(
          "hidden",
          !card.classList.contains("selected")
        );

        const currentZyID = card.querySelector("span").innerHTML;
        localStorage.setItem("currentSelected", currentZyID);
        localStorage.setItem(
          "currentSelectedIndex",
          card.querySelector(".cardIndex").innerHTML
        );
        console.log(localStorage.getItem("currentSelected"));

        deleteDisplay.innerHTML = `${card.querySelector("h4").innerHTML}`;
        selectedZylarian.innerHTML = `<span class="currentUser">${
          card.querySelector("h4").innerHTML
        }</span> Selected`;
        selectedForDelete.innerHTML = `${card.querySelector("h4").innerHTML}`;
        zyName = card.querySelector("h4").innerHTML;
      });
    });
  } else {
    window.location.href = "/index.html";
  }
}

// Clears any selections automatically when Zylarian window is closed //

function clearSelections(mutationList) {
  for (const mutation of mutationList) {
    if (mutation.type === "attributes" && mutation.attributeName) {
      //localStorage.removeItem("currentSelected");
      trashCan.classList.add("hidden");
      selectedZylarian.innerHTML = "";
    }
  }
}

// Removes user Data from local storage on logout //

async function handleLog() {
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  window.location.href = "/index.html";
}

// Server request to retrieve user data from the database //

async function getUserData(currentUser) {
  const currentUserId = localStorage.getItem("id");
  const response = await fetch(
    `${serverAddress}userData?userId=${currentUserId}`
  );
  userData = await response.json();
  return userData.body;
}

// Server request to RIP a Zylarian //

async function handleDelete() {
  const currentUserId = localStorage.getItem("id");
  const zyForDeletion = localStorage.getItem("currentSelected");
  const response = await fetch(
    `${serverAddress}deleteZylarian?userId=${currentUserId}&Id=${zyForDeletion}`
  );
  const userData = await response.json();
  if (userData.body === "RIP") {
    let createAlert = document.querySelector(".toast-alert");
    createAlert.innerHTML = `Zylarian <span class="currentUser">${zyName}</span> has been deleted!`;
    onLoad();
    closemodal.click();
  }
}

// Autoruns on load function when the page loads.... Imagine that //
onLoad();
