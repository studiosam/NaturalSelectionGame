const chooseZylarian = document.querySelector("#chooseZylarian");
const mateSelect = document.querySelector("#mateSelect");
const yourNameChoice = document.querySelector("#nameChoice");
const matesName = document.querySelector("#mateName");
const matesHeight = document.querySelector("#mateHeight");
const matesWeight = document.querySelector("#mateWeight");
const mateRedGenotype = document.querySelector("#mateRedGenotype");
const mateGreenGenotype = document.querySelector("#mateGreenGenotype");
const mateBlueGenotype = document.querySelector("#mateBlueGenotype");
const mateBrownGenotype = document.querySelector("#mateBrownGenotype");
const mateScaleGenotype = document.querySelector("#mateScaleGenotype");
const mateFeathered = document.querySelector("#mateFeathered");
const mateSkinMoistureGenotype = document.querySelector(
  "#mateSkinMoistureGenotype"
);
const mateFurry = document.querySelector("#mateFurry");
const diurnal = document.querySelector("#diurnal");
const nocturnal = document.querySelector("#nocturnal");
const mateLimbType = document.querySelector("#mateLimbType");
const mateSpecialFeatures = document.querySelector("#mateSpecialFeatures");
const mateDietType = document.querySelector("#mateDietType");
const alert = document.querySelector("#toast-1");
const mateForm = document.querySelector("#mateForm");
mateForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let newChildStatus = await mateStatus();
  if (newChildStatus.status === "Failed") {
    console.log("failed");
    // Output to Page //
    document.querySelector(
      "#childAlertContainer"
    ).innerHTML = `<div class="text-center alertBG"><p">Mating Unsuccessful :(</p><br /><p>Please Try Again</p>`;
    $("#childAlertBox").fadeIn();
    setTimeout(() => {
      $("#alertBox").fadeOut();
      document.querySelector("#childAlertContainer").innerHTML = "";
    }, 3000);
  } else {
    // Output to Page //

    document.querySelector("#childAlertContainer").innerHTML = zylarianNewChild(
      newChildStatus.child
    );
    $("#childAlertBox").fadeIn();
    setTimeout(() => {
      $("#alertBox").fadeOut();
      document.querySelector("#childAlertContainer").innerHTML = "";
    }, 3000);
    const listContainer = (document.getElementById(
      "zylariansControlledByPlayerListContainer"
    ).innerHTML = "");
    document.querySelector("#mateForm").reset();
    const zylarian1 = JSON.parse(localStorage.getItem("zylarian1"));
    const zylarian2 = JSON.parse(localStorage.getItem("zylarian2"));
    addXpFromMating(zylarian1, zylarian2);
    localStorage.removeItem("zylarian2");
  }
});
chooseZylarian.addEventListener("click", zylarianSelected);
getPopulationOnLoad();
mateSelect.innerHTML;
mateSelect.addEventListener("change", fillMateData);
// Retrieves Selected Zylarian Data and outputs to page //
async function zylarianSelected() {
  const zylarianSelection = localStorage.getItem("currentSelectedIndex");
  const yourZylarianData = currentUserStats[zylarianSelection];
  alert.querySelector("span").innerHTML = yourZylarianData.name;
  const closemodal = document.querySelector("#zylarianModalClose");
  closemodal.click();
  updateZylarianList([yourZylarianData]);

  localStorage.setItem("zylarian1", JSON.stringify(yourZylarianData));
  yourNameChoice.value = yourZylarianData.name;
}

async function fillMateData() {
  const currentMate = mateSelect.value;
  totalPopulation.forEach((item, index) => {
    Object.entries(item).forEach(([key, value]) => {
      if (value === currentMate) {
        mate = item;

        localStorage.setItem("zylarian2", JSON.stringify(mate));
        console.log(mate);
      }
    });
  });
  matesName.value = mate.name || "";
  matesHeight.value = mate.height || "";
  matesWeight.value = mate.weight || "";
  mateRedGenotype.value = mate.genotypes.color.redGenotype || "";
  mateGreenGenotype.value = mate.genotypes.color.greenGenotype || "";
  mateBlueGenotype.value = mate.genotypes.color.blueGenotype || "";
  mateBrownGenotype.value = mate.genotypes.color.brownGenotype || "";
  mateScaleGenotype.value = mate.genotypes.texture.scaleGenotype || "";
  mateSkinMoistureGenotype.value = mate.genotypes.texture.skinMoistureGenotype;

  //selections
  mateLimbType.value = mate.limbType || "";
  mateSpecialFeatures.value = mate.specialFeatures || "";
  mateDietType.value = mate.dietType || "";

  // if bois//
  if (mate.activity === "Diurnal") {
    diurnal.checked = true;
  } else if (mate.activity === "Nocturnal") {
    nocturnal.checked = true;
  }
  mateFeathered.value = mate.genotypes.texture.featherGenotype;

  mateFurry.value = mate.genotypes.texture.furGenotype;
}

// Retrieve Entire Zylarian Population on load //
async function getPopulationOnLoad() {
  totalPopulation = await getEntirePopulation();
  totalPopulation.forEach((zylarian) => {
    createMateMenu(zylarian);
  });
}
async function getEntirePopulation() {
  const currentUserId = localStorage.getItem("id");
  const response = await fetch(`${serverAddress}allZylarians`);
  populationData = await response.json();
  const filteredZylarians = populationData.body.filter(
    (obj) => obj.ownerId !== currentUserId && obj.isAlive !== 0
  );
  return filteredZylarians;
}

async function createMateMenu(mate) {
  mateSelect.innerHTML += `<option value = "${mate.id}">${mate.name}</option>`;
}

const zylarianNewChild = (zylariandata) => {
  console.log(zylariandata);
  return `<div class="col userZylariansCol"><div><p class="text-center offspringSuccess">Success!<br/>New Offspring:</p></div>
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
                    <td class="statValue text-center">${zylariandata.specialFeatures[0]}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Diet</td>
                    <td class="statValue text-center">${zylariandata.dietType}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Color Genotypes</td>
                    <td class="statValue text-center">Red: ${zylariandata.genotypes.color.redGenotype}, Green: ${zylariandata.genotypes.color.greenGenotype}, Blue: ${zylariandata.genotypes.color.blueGenotype}, Brown: ${zylariandata.genotypes.color.brownGenotype}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Skin Texture Genotypes</td>
                    <td class="statValue text-center">Scales: ${zylariandata.genotypes.texture.scaleGenotype}, Skin Moisture: ${zylariandata.genotypes.texture.skinMoistureGenotype}, Feathers: ${zylariandata.genotypes.texture.featherGenotype}, Fur: ${zylariandata.genotypes.texture.furGenotype}</td>
                </tr>
            </tbody>
        </table>
        
    </div></div></div></div>`;
};

function updateZylarianList(population) {
  console.log("Updating zylarian list");

  const listContainer = document.getElementById(
    "zylariansControlledByPlayerListContainer"
  );
  listContainer.innerHTML = ""; // Clear existing list
  console.log(population);

  // Creates a list item for each zylarian in the array
  population.forEach((zylarian, index) => {
    try {
      colorGenotypes = zylarian.genotypes.color;
      textureGenotypes = zylarian.genotypes.texture;
    } catch (e) {
      console.log("already Parsed");
    }
    const skinColorGenotypeString = `<span class="red">Red: ${colorGenotypes.redGenotype}</span>, <span class="green">Green: ${colorGenotypes.greenGenotype}</span>, <span class="blue">Blue: ${colorGenotypes.blueGenotype}</span>, <span class="brown">Brown: ${colorGenotypes.brownGenotype}</span>`;
    const skinTextureGenotypeString = `Scales: ${textureGenotypes.scaleGenotype}, Skin Moisture: ${textureGenotypes.skinMoistureGenotype}, Feathered: ${textureGenotypes.featherGenotype}, Furry: ${textureGenotypes.furGenotype}`;

    const listItem = document.createElement("li");
    listItem.innerHTML = `
                <li><strong>Zylarian ${
                  index + 1
                }:</strong><span class="currentUser"> ${
      zylarian.name
    }</span></li>
                <li>Color: ${zylarian.skinColor}, Texture: ${
      zylarian.skinTexture
    }, Pattern: ${zylarian.skinPattern}</li><li>
                Height: ${zylarian.height} cm, Weight: ${
      zylarian.weight
    } g</li><li>
                Limb Type: ${zylarian.limbType}, Special Feature: ${
      zylarian.specialFeatures
    }, Diet: ${zylarian.dietType}</li><li>
                Color Genotypes: ${skinColorGenotypeString}</li><li>
                Skin Texture Genotypes: ${skinTextureGenotypeString}
                `;
    listContainer.appendChild(listItem);
  });
}
