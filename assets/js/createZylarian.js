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
    this.skinColor = skinMatching(this.genotypes.color, zylarianSkinColors);
    this.skinTexture = skinMatching(
      this.genotypes.texture,
      zylarianSkinTextures
    );
    this.skinPattern = skinPatternProcessor(this.genotypes.color);
    this.patternColors = patternColorSelector(
      this.genotypes.color,
      this.skinColor
    );
  }
}

// **ASSIGNING SKIN TRAIT TO CREATED ZYLARIANS FROM GENOTYPE** //
function skinMatching(newZylarianGenotypes, skinObjectsArray) {
  console.log("Matching newZylarianGenotypes to phenotypes");
  console.log(newZylarianGenotypes);
  console.log(skinObjectsArray);

  // for (const [gene, genotype] of newZylarianGenotypes) {
  //   for (const phenotype of skinObjectsArray) {

  //   }
  // }

  for (const item of skinObjectsArray) {
    let isMatched = true;
    for (const prop in newZylarianGenotypes) {
      if (newZylarianGenotypes.hasOwnProperty(prop)) {
        console.log("item: " + item.id);
        console.log("prop: " + prop);
        const genotype1 = newZylarianGenotypes[prop];
        const genotype2 = item[prop];
        console.log(
          `genotype to match: ${genotype1} options to match: ${genotype2}`
        );
        if (Array.isArray(genotype2)) {
          if (!genotype2.includes(genotype1)) {
            isMatched = false;
            break;
          }
        } else {
          if (genotype1 !== genotype2) {
            isMatched = false;
            break;
          }
        }
      }
    }
    if (isMatched) {
      return item.id;
    }
  }
  console.log("skinMatching = No match found");
  return null;
}
/*
  for (const skinObject of skinObjectsArray) {
    console.log(
      "skinObject: " + skinObject + "\nskinObjectsArray: " + skinObjectsArray
    );
    let matched = false;
    for (const key of propertiesToMatch) {
      console.log("key: " + key + "\npropertiesToMatch: " + propertiesToMatch);
      console.log("skinObject[key]: " + skinObject[key]);
      if (Array.isArray(skinObject[key])) {
        if (!skinObject[key].includes(newZylarianGenotypes[key])) {
          matched = false;
          break;
        }
      } else if (skinObject[key] !== newZylarianGenotypes[key]) {
        matched = false;
        break;
      } else {
        matched = true;
      }
    }
    if (matched) {
      return skinObject.id;
    }
  }*/

// Processes genotypes to skin pattern
function skinPatternProcessor(skinColorGenotypes) {
  let colorString = joinColorAlleles(skinColorGenotypes);
  console.log("colorString: " + colorString);
  let uniqueDominantAlleles = findUniqueCapitalLetters(colorString);
  console.log("uniqueDominantAlleles: " + uniqueDominantAlleles);
  return skinPatternDetermination(uniqueDominantAlleles);
}

function patternColorSelector(skinColorGenotypes, solidSkinColor) {
  let colorString = joinColorAlleles(skinColorGenotypes);
  let uniqueDominantAlleles = findUniqueCapitalLetters(colorString);
  let colorArr = uniqueDominantAlleles.split("");
  let solidColor;
  let res;
  console.log(`solidSkinColor: ${solidSkinColor} colorArr: ${colorArr}`);
  switch (solidSkinColor) {
    case "Brown":
      solidColor = "P";
      break;
    case "Red":
      solidColor = "R";
      break;
    case "Blue":
      solidColor = "B";
      break;
    case "Green":
      solidColor = "G";
      break;
  }
  if (colorArr.length > 1 && colorArr.includes(solidColor)) {
    console.log(`colorarr greaterthan 1 ${colorArr.length}`);
    colorArr.splice(colorArr.indexOf(solidColor), 1);
    colorString = colorArr.join("");
    console.log(`colorString: ${colorString}, solidColor: ${solidColor}`);
    res = getRandomLettersFromString(colorString, 1);
  } else {
    res = getRandomLettersFromString(colorArr.join(""), 1);
  }
  console.log("res: " + res);
  switch (res) {
    case "R":
      return "Red";
    case "G":
      return "Green";
    case "B":
      return "Blue";
    case "P":
      return "Brown";
  }
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
  console.log("dominantAlleles: " + dominantAlleles);
  if (dominantAlleles.length > 1) {
    if (dominantAlleles == "GB" || dominantAlleles == "BG") {
      return zylarianSkinPatterns[3].id; //iridescent
    }
    let randomNum = Math.random();
    if (randomNum > 0.7) {
      return zylarianSkinPatterns[1].id; //spotted?
    } else if (randomNum > 0.3) {
      return zylarianSkinPatterns[2].id; //striped?
    } else {
      return zylarianSkinPatterns[0].id; //solid
    }
  } else {
    return zylarianSkinPatterns[0].id; //solid
  }
}

function getRandomLettersFromString(capitalLetters, numOfLetters) {
  let arr = capitalLetters.split("");
  let res = "";
  while (res.length < numOfLetters) {
    rand = Math.floor(Math.random() * arr.length);
    res += arr[rand];
    console.log("res: " + res);
    arr.splice(rand, 1);
  }
  return res;
}

function generateRandomName() {
  console.log("Generating random name");
  const names = [
    "Aiden",
    "Alex",
    "Andy",
    "Ari",
    "Ash",
    "Aspen",
    "Aubrey",
    "August",
    "Avery",
    "Bailey",
    "Blair",
    "Blake",
    "Brett",
    "Brook",
    "Caelan",
    "Cameron",
    "Campbell",
    "Carson",
    "Casey",
    "Charlie",
    "Chris",
    "Cory",
    "Dakota",
    "Dallas",
    "Dana",
    "Darcy",
    "Devin",
    "Drew",
    "Eddie",
    "Eli",
    "Elliott",
    "Emerson",
    "Emery",
    "Finley",
    "Frances",
    "Frankie",
    "Gabriel",
    "Glenn",
    "Gray",
    "Hadley",
    "Harley",
    "Harper",
    "Hayden",
    "Hunter",
    "Indigo",
    "Jamie",
    "Jayden",
    "Jesse",
    "Jordan",
    "Jules",
    "Julian",
    "Kai",
    "Karter",
    "Kelly",
    "Kendall",
    "Kennedy",
    "Lane",
    "Leighton",
    "Leslie",
    "Logan",
    "London",
    "Madison",
    "Marley",
    "Mason",
    "Max",
    "Mckenzie",
    "Micah",
    "Morgan",
    "Nico",
    "Noel",
    "Oakley",
    "Parker",
    "Pat",
    "Payton",
    "Phoenix",
    "Quinn",
    "Reagan",
    "Reed",
    "Reese",
    "Remy",
    "Riley",
    "River",
    "Robin",
    "Rory",
    "Rowan",
    "Ryan",
    "Sage",
    "Sam",
    "Sawyer",
    "Shawn",
    "Shay",
    "Sidney",
    "Skyler",
    "Spencer",
    "Stevie",
    "Sydney",
    "Taylor",
    "Terry",
    "Toni",
    "Trace",
    "Tristan",
    "Tyler",
    "Val",
    "Wesley",
    "Winter",
    "Zion",
    "Adrian",
    "Ainsley",
    "Ali",
    "Angel",
    "Armani",
    "Asa",
    "Austen",
    "Beau",
    "Beckett",
    "Billie",
    "Bobbie",
    "Brady",
    "Briar",
    "Brooklyn",
    "Caden",
    "Cameron",
    "Campbell",
    "Casey",
    "Charlie",
    "Corey",
    "Dakota",
    "Dallas",
    "Darian",
    "Dylan",
    "Eden",
    "Elliot",
    "Ellis",
    "Emery",
    "Emory",
    "Erin",
    "Evan",
    "Frances",
    "Frankie",
    "Gael",
    "Gray",
    "Harlow",
    "Hayden",
    "Henley",
    "Hunter",
    "Indiana",
    "Ira",
    "Jaden",
    "Jael",
    "Jagger",
    "James",
    "Jamie",
    "Jay",
    "Jaylen",
    "Jean",
    "Jessie",
    "Jordan",
    "Jules",
    "Kai",
    "Kamryn",
    "Keegan",
    "Keiran",
    "Kendall",
    "Kennedy",
    "Kieran",
    "Kit",
    "Kody",
    "Kylin",
    "Laine",
    "Landry",
    "Lane",
    "Leighton",
    "Lennox",
    "Leslie",
    "Linden",
    "London",
    "Mackenzie",
    "Marley",
    "Max",
    "Maxwell",
    "Merritt",
    "Micah",
    "Mika",
    "Milan",
    "Morgan",
    "Nicky",
    "Noa",
    "Oakley",
    "Ocean",
    "Parker",
    "Payton",
    "Peyton",
    "Phoenix",
    "Piper",
    "Presley",
    "Quincy",
    "Quinn",
    "Rae",
    "Ray",
    "Reagan",
    "Reed",
    "Reese",
    "Remy",
    "Riley",
    "Rio",
    "River",
    "Robin",
    "Rory",
    "Rowan",
    "Ryan",
    "Sage",
    "Sam",
    "Sasha",
    "Sawyer",
    "Shae",
    "Shane",
    "Shawn",
    "Shiloh",
    "Sky",
    "Skyler",
    "Sloan",
    "Spencer",
    "Stevie",
    "Sydney",
    "Tatum",
    "Taylor",
    "Teagan",
    "Terry",
    "Toby",
    "Tony",
    "Tracy",
    "Val",
    "Wesley",
    "Wren",
    "Zephyr",
    "Addison",
    "Adley",
    "Afton",
    "Ainsley",
    "Alex",
    "Alfie",
    "Amari",
    "Angel",
    "Ari",
    "Ariel",
    "Arlo",
    "Armani",
    "Asa",
    "Ashton",
    "Aubrey",
    "August",
    "Austen",
    "Avery",
    "Bailey",
    "Beau",
    "Beckett",
    "Bellamy",
    "Bennett",
    "Bentley",
    "Billie",
    "Blaine",
    "Blair",
    "Blake",
    "Blaze",
    "Bobbie",
  ];

  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}
