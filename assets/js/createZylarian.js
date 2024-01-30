/*Creating new zylarians*/

/*/////////////////////////////////////
 **CREATE ZYLARIAN FROM CREATE SCREEN**
 */ ///////////////////////////////////
class CreateZylarian {
  constructor(
    name,
    height,
    weight,
    activity,
    skinColor,
    skinTexture,
    limbType,
    specialFeatures,
    dietType
  ) {
    // Set input values from form
    console.log("Generating zylarian");
    this.name = name || generateRandomName();
    this.height = height;
    this.weight = weight;
    this.activity = activity;
    this.skinColor = skinColor;
    this.skinTexture = skinTexture;
    this.limbType = limbType;
    this.specialFeatures = [specialFeatures];
    this.dietType = dietType;

    // Generate genotypes for the initial Zylarian
    console.log("Generating genotypes for the initial Zylarian.");
    this.genotypes = {
      color: assignGenotypesForColor(skinColor),
      texture: assignGenotypesForSkinTexture(skinTexture),
    };
    //console.log(this);
  }
}

// Create Zylarian from user form and return Zylarian object
async function createZylarianFromForm() {
  console.log("Getting form values");
  // Set limits of initial zylarian size
  const form = document.getElementById("zylarianForm");
  const MIN_HEIGHT = 50;
  const MAX_HEIGHT = 300;
  const MIN_WEIGHT = 75;
  const MAX_WEIGHT = 10000;

  // Extract values with correct types
  const height = parseInt(form.height.value, 10);
  const weight = parseInt(form.weight.value, 10);

  // Create the initial Zylarian with correct argument order
  console.log("Creating Zylarian");
  createZylarian = new CreateZylarian(
    form.name.value,
    height, // Correct position for height
    weight, // Correct position for weight
    form.activity.value,
    form.skinColor.value,
    form.skinTexture.value,
    form.limbType.value,
    form.specialFeatures.value,
    form.dietType.value
  );

  createZylarian.skinPattern = "Solid";
  createZylarian.ownerId = localStorage.getItem("id");
  createZylarian.owner = localStorage.getItem("username");

  if (createZylarian) {
    console.log("Zylarian created successfully");
  } else {
    console.log("Error creating zylarian");
  }

  return createZylarian;
}

// **ASSIGNING GENOTYPES TO CREATED ZYLARIANS**//

// Skin color
function assignGenotypesForColor(selectedColorId) {
  console.log("Assigning color genotypes");
  const selectedColor = zylarianSkinColors.find(
    (color) => color.id === selectedColorId
  );

  if (selectedColor) {
    const redGenotype = getRandomGenotype(selectedColor.redGenotype);
    const greenGenotype = getRandomGenotype(selectedColor.greenGenotype);
    const blueGenotype = getRandomGenotype(selectedColor.blueGenotype);
    const brownGenotype = getRandomGenotype(selectedColor.brownGenotype);

    return {
      redGenotype,
      greenGenotype,
      blueGenotype,
      brownGenotype,
    };
  } else {
    console.error("Selected color not found:", selectedColorId);
    return null;
  }
}

// Skin texture
function assignGenotypesForSkinTexture(selectedTextureId) {
  console.log("Assigning texture genotypes");
  const selectedTexture = zylarianSkinTextures.find(
    (texture) => texture.id === selectedTextureId
  );

  if (selectedTexture) {
    // prettier-ignore
    const skinMoistureGenotype = getRandomGenotype(selectedTexture.skinMoistureGenotype);
    const scaleGenotype = getRandomGenotype(selectedTexture.scaleGenotype);
    const furGenotype = getRandomGenotype(selectedTexture.furGenotype);
    const featherGenotype = getRandomGenotype(selectedTexture.featherGenotype);

    return {
      skinMoistureGenotype,
      scaleGenotype,
      furGenotype,
      featherGenotype,
    };
  } else {
    console.error("Selected texture not found:", selectedTextureId);
    return null;
  }
}

// Pick a genotype from an array of possibilities
function getRandomGenotype(genotypeOptions) {
  console.log("Getting random genotype from array");
  if (Array.isArray(genotypeOptions)) {
    // If it's an array, pick a random element from the array
    const randomIndex = Math.floor(Math.random() * genotypeOptions.length);
    return genotypeOptions[randomIndex];
  } else {
    // If it's not an array, return the genotype as is
    return genotypeOptions;
  }
}

/*///////////////////////////////////
 **CREATE ZYLARIAN FROM MATE SCREEN**
 */ /////////////////////////////////
class mateZylarian {
  constructor(
    name,
    height,
    weight,
    activity,
    limbType,
    specialFeatures,
    dietType,
    genotypes
  ) {
    // Set values from mate form
    // prettier-ignore

    this.name = name;
    this.height = height;
    this.weight = weight;
    this.activity = activity;
    this.limbType = limbType;
    this.genotypes = {
      color: genotypes.color,
      texture: genotypes.texture,
    };
    this.specialFeatures = specialFeatures;
    this.dietType = dietType;

    // Process genotypes
    this.skinColor = skinMatching(
      this.genotypes.color,
      zylarianSkinColors,
      "color"
    );
    this.skinTexture = skinMatching(
      this.genotypes.texture,
      zylarianSkinTextures,
      "texture"
    );
    this.skinPattern = skinPatternProcessor(this.genotypes.color);
  }
}

// **ASSIGNING SKIN TRAIT TO CREATED ZYLARIANS FROM GENOTYPE** //
function skinMatching(newZylarianGenotypes, skinObjectsArray, type) {
  console.log("Matching newZylarianGenotypes to phenotypes");
  console.log(newZylarianGenotypes);
  console.log(skinObjectsArray);
  let propertiesToMatch = [];

  if (type === "color") {
    propertiesToMatch = [
      "redGenotype",
      "greenGenotype",
      "blueGenotype",
      "brownGenotype",
    ];
  } else if (type === "texture") {
    propertiesToMatch = [
      "skinMoistureGenotype",
      "scaleGenotype",
      "furGenotype",
      "featherGenotype",
    ];
  }
  for (const skinObject of skinObjectsArray) {
    console.log("newZylarianGenotypes", newZylarianGenotypes);

    for (const key of propertiesToMatch) {
      if (Array.isArray(skinObject[key])) {
        if (!skinObject[key].includes(newZylarianGenotypes[key])) {
          console.log(skinObject[key], newZylarianGenotypes[key]);
          matched = false;
          break;
        }
      } else if (skinObject[key] !== newZylarianGenotypes[key]) {
        matched = false;
        break;
      } else {
        matched = true;
      }
      if (matched) {
        return skinObject.id;
      }
    }
  }
}

// Processes genotypes to skin pattern
function skinPatternProcessor(skinColorGenotypes) {
  let colorString = joinColorAlleles(skinColorGenotypes);
  let uniqueDominantAlleles = findUniqueCapitalLetters(colorString);
  return skinPatternDetermination(uniqueDominantAlleles);
}

// Returns a string of all color genotypes
function joinColorAlleles(colorGenotypes) {
  return (
    colorGenotypes.redGenotype +
    colorGenotypes.greenGenotype +
    colorGenotypes.blueGenotype +
    colorGenotypes.brownGenotype
  );
}

// Returns a string of unique capital letters from a string
function findUniqueCapitalLetters(str) {
  const uniqueCapitals = new Set();

  for (const char of str) {
    if (char >= "A" && char <= "Z") {
      uniqueCapitals.add(char);
    }
  }
  return Array.from(uniqueCapitals).join("");
}

// Returns a skin pattern based on a string of unique capital letters
function skinPatternDetermination(dominantAlleles) {
  if (dominantAlleles.length > 1) {
    if (dominantAlleles == "GB" || dominantAlleles == "BG") {
      return zylarianSkinPatterns[3].id;
    }
    let randomNum = Math.random();
    if (randomNum > 0.7) {
      return zylarianSkinPatterns[1].id;
    } else if (randomNum > 0.3) {
      return zylarianSkinPatterns[2].id;
    } else {
      return zylarianSkinPatterns[0].id;
    }
  }
}
