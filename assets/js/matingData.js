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

chooseZylarian.addEventListener("click", zylarianSelected);

async function zylarianSelected() {
  const zylarianSelection = localStorage.getItem("currentSelectedIndex");
  const yourZylarianData = currentUserStats[zylarianSelection];
  console.log(yourZylarianData);
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
