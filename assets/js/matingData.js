const chooseZylarian = document.querySelector("#chooseZylarian");
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
const mateFurry = document.querySelector("#mateFurry");
const diurnal = document.querySelector("#diurnal");
const nocturnal = document.querySelector("#nocturnal");
const mateLimbType = document.querySelector("#mateLimbType");
const mateSpecialFeatures = document.querySelector("#mateSpecialFeatures");
const mateDietType = document.querySelector("#mateDietType");
const alert = document.querySelector("#toast-1");
chooseZylarian.addEventListener("click", zylarianSelected);

// Retrieves Selected Zylarian Data and outputs to page //
async function zylarianSelected() {
  const zylarianSelection = localStorage.getItem("currentSelectedIndex");
  const yourZylarianData = currentUserStats[zylarianSelection].zylarianData;
  alert.querySelector("span").innerHTML = yourZylarianData.name;
  const closemodal = document.querySelector("#zylarianModalClose");
  closemodal.click();
  updateZylarianList([yourZylarianData]);
  yourNameChoice.value = yourZylarianData.name;

  // TO DO, RETRIEVE SELECTED MATE DATA //

  //   ${activity}
  //   ${blueGenotype}
  //   ${brownGenotype}
  //   ${dietType}
  //   ${feathered}
  //   ${furry}
  //   ${greenGenotype}
  //   ${height}
  //   ${limbType}
  //   ${name}
  //   ${owner}
  //   ${redGenotype}
  //   ${scaleGenotype}
  //   ${skinColor}
  //   ${skinMoistureGenotype}
  //   ${skinPattern}
  //   ${skinTexture}
  //   ${weight}
  //   Do special featured
  //
}

initializeZylarianMenu(mateVariablesWithOptions);
