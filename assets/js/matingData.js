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
chooseZylarian.addEventListener("click", zylarianSelected);
getPopulationOnLoad();
mateSelect.addEventListener("change", fillMateData);
// Retrieves Selected Zylarian Data and outputs to page //
async function zylarianSelected() {
  const zylarianSelection = localStorage.getItem("currentSelectedIndex");
  const yourZylarianData = currentUserStats[zylarianSelection].zylarianData;
  alert.querySelector("span").innerHTML = yourZylarianData.name;
  const closemodal = document.querySelector("#zylarianModalClose");
  closemodal.click();
  updateZylarianList([yourZylarianData]);
  yourNameChoice.value = yourZylarianData.name;
}

async function fillMateData() {
  const currentMate = mateSelect.value;
  totalPopulation.forEach((item, index) => {
    Object.entries(item).forEach(([key, value]) => {
      if (value === currentMate) {
        mate = item;
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

  //   mate.diurnal ? (diurnal.checked = true) : (diurnal.checked = false);
  //   nocturnal.checked = mate.nocturnal ? "Yes" : "No";
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
  const response = await fetch(`http://127.0.0.1:3000/allZylarians`);
  populationData = await response.json();
  const filteredZylarians = populationData.body.filter(
    (obj) => obj.ownerId !== currentUserId
  );
  return filteredZylarians;
}

async function createMateMenu(mate) {
  mateSelect.innerHTML += `<option value = "${mate.id}">${mate.name}</option>`;
}

initializeZylarianMenu(mateVariablesWithOptions);
