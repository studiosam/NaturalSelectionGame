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
  getZylariansAndMateThem();
});
chooseZylarian.addEventListener("click", zylarianSelected);
getPopulationOnLoad();
mateSelect.innerHTML;
mateSelect.addEventListener("change", fillMateData);
// Retrieves Selected Zylarian Data and outputs to page //
async function zylarianSelected() {
  const zylarianSelection = localStorage.getItem("currentSelectedIndex");
  const yourZylarianData = currentUserStats[zylarianSelection].zylarianData;
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
  mateRedGenotype.value = mate.colorGenotypes.redGenotype || "";
  mateGreenGenotype.value = mate.colorGenotypes.greenGenotype || "";
  mateBlueGenotype.value = mate.colorGenotypes.blueGenotype || "";
  mateBrownGenotype.value = mate.colorGenotypes.brownGenotype || "";
  mateScaleGenotype.value = mate.skinTextureGenotypes.scaleGenotype || "";
  mateSkinMoistureGenotype.value =
    mate.skinTextureGenotypes.skinMoistureGenotype;

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
  mate.skinTextureGenotypes.feathered
    ? (mateFeathered.checked = true)
    : (mateFeathered.checked = false);
  mate.skinTextureGenotypes.furry
    ? (mateFurry.checked = true)
    : (mateFurry.checked = false);
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
    (obj) => obj.ownerId !== currentUserId
  );
  return filteredZylarians;
}

async function createMateMenu(mate) {
  mateSelect.innerHTML += `<option value = "${mate.id}">${mate.name}</option>`;
}

const zylarianNewChild = (
  zylariandata
) => `<div class="col userZylariansCol"><div><p class="text-center offspringSuccess">Success!<br/>New Offspring:</p></div>
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
                    <td class="statValue text-center">Red: ${zylariandata.colorGenotypes.redGenotype}, Green: ${zylariandata.colorGenotypes.greenGenotype}, Blue: ${zylariandata.colorGenotypes.blueGenotype}, Brown: ${zylariandata.colorGenotypes.brownGenotype}</td>
                </tr>
                <tr>
                    <td class="statItem text-center">Skin Texture Genotypes</td>
                    <td class="statValue text-center">Scales: ${zylariandata.skinTextureGenotypes.scaleGenotype}, Skin Moisture: ${zylariandata.skinTextureGenotypes.skinMoistureGenotype}, Featherd: ${zylariandata.skinTextureGenotypes.feathered}, Furry: ${zylariandata.skinTextureGenotypes.furry}</td>
                </tr>
            </tbody>
        </table>
        
    </div></div></div></div>`;
