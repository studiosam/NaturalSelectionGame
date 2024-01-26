// Zylarian Game Logic

/*
Initializing global variables
*/

let population = []; // Array of zylarians controlled by the player
let INITIAL_ZYLARIAN = {}; //Object to hold the initial zylarian for the entire game
let currentMate = {}; // Object to hold the current mating partner
let generation = 0; // Keeping track of generations
let month = 0;

/* 
Arrays of trait objects
*/

const zylarianSkinColors = [
  {
    id: "White",
    beneficialEnvironment: ["Frostvale Glacier"],
    detrimentalEnvironment: ["Verdant Canopy Island", "Arid Dunes Oasis"],
    redGenotype: "rr",
    greenGenotype: "gg",
    blueGenotype: "bb",
    brownGenotype: "pp",
    selectable: false,
  },
  {
    id: "Beige",
    beneficialEnvironment: ["Arid Dunes Oasis"],
    detrimentalEnvironment: ["Verdant Canopy Island", "Frostvale Glacier"],
    redGenotype: "rr",
    greenGenotype: "gg",
    blueGenotype: "bb",
    brownGenotype: "Pp",
  },
  {
    id: "Gray",
    beneficialEnvironment: ["Peaktop Highlands"],
    detrimentalEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
    redGenotype: "Rr",
    greenGenotype: "Gg",
    blueGenotype: "Bb",
    brownGenotype: "pp",
  },
  {
    id: "Blue",
    beneficialEnvironment: ["Frostvale Glacier"],
    detrimentalEnvironment: ["Verdant Canopy Island", "Peaktop Highlands"],
    redGenotype: "rr",
    greenGenotype: "gg",
    blueGenotype: ["BB", "Bb"],
    brownGenotype: "pp",
    selectable: false,
  },
  {
    id: "Green",
    beneficialEnvironment: ["Verdant Canopy Island"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
    redGenotype: "rr",
    greenGenotype: ["GG", "Gg"],
    blueGenotype: "bb",
    brownGenotype: "pp",
    selectable: false,
  },
  {
    id: "Red",
    beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
    redGenotype: "RR",
    greenGenotype: "gg",
    blueGenotype: "bb",
    brownGenotype: "pp",
    selectable: false,
  },
  {
    id: "Pink",
    beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
    redGenotype: "Rr",
    greenGenotype: "gg",
    blueGenotype: "bb",
    brownGenotype: "pp",
    selectable: false,
  },
  {
    id: "Yellow",
    beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
    detrimentalEnvironment: ["Peaktop Highlands", "Frostvale Glacier"],
    redGenotype: ["RR", "Rr"],
    greenGenotype: ["GG", "Gg"],
    blueGenotype: "bb",
    brownGenotype: "pp",
  },
  {
    id: "Brown",
    beneficialEnvironment: ["Peaktop Highlands", "Greenwood Falls Isle"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
    redGenotype: ["RR", "Rr", "rr"],
    greenGenotype: ["GG", "Gg", "gg"],
    blueGenotype: ["BB", "Bb", "bb"],
    brownGenotype: ["PP", "Pp"],
  },
  {
    id: "Black",
    beneficialEnvironment: ["Peaktop Highlands", "Greenwood Falls Isle"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Savannah Plains Sanctuary"],
    redGenotype: "RR",
    greenGenotype: "GG",
    blueGenotype: "BB",
    brownGenotype: "PP",
  },
];
const zylarianSkinTextures = [
  {
    id: "Scaly",
    beneficialEnvironment: ["Arid Dunes Oasis", "Peaktop Highlands"],
    detrimentalEnvironment: ["Verdant Canopy Island", "Frostvale Glacier"],
    skinMoistureGenotype: "ww",
    scaleGenotype: ["SS", "Ss"],
    feathered: false,
    furry: false,
  },
  {
    id: "Smooth",
    beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
    skinMoistureGenotype: ["WW", "Ww", "ww"],
    scaleGenotype: "ss",
    feathered: false,
    furry: false,
  },
  {
    id: "Furry",
    beneficialEnvironment: ["Frostvale Glacier", "Savannah Plains Sanctuary"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Greenwood Falls Isle"],
    skinMoistureGenotype: ["Ww", "ww"],
    scaleGenotype: "ss",
    feathered: false,
    furry: true,
  },
  {
    id: "Leathery",
    beneficialEnvironment: ["Peaktop Highlands", "Arid Dunes Oasis"],
    detrimentalEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
    skinMoistureGenotype: "ww",
    scaleGenotype: ["SS", "Ss", "ss"],
    feathered: false,
    furry: false,
  },
  {
    id: "Feathered",
    beneficialEnvironment: [
      "Savannah Plains Sanctuary",
      "Greenwood Falls Isle",
    ],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
    skinMoistureGenotype: ["Ww", "ww"],
    scaleGenotype: ["SS", "Ss"],
    feathered: true,
    furry: false,
  },
  {
    id: "Slimy",
    beneficialEnvironment: ["Greenwood Falls Isle", "Verdant Canopy Island"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Peaktop Highlands"],
    skinMoistureGenotype: "WW",
    scaleGenotype: ["ss"],
    feathered: false,
    furry: false,
  },
];
const zylarianSkinPatterns = [
  {
    id: "Solid",
    beneficialEnvironment: ["Peaktop Highlands", "Frostvale Glacier"],
    detrimentalEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
  },
  {
    id: "Striped",
    beneficialEnvironment: [
      "Savannah Plains Sanctuary",
      "Greenwood Falls Isle",
    ],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Peaktop Highlands"],
    selectable: false,
  },
  {
    id: "Spotted",
    beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
    detrimentalEnvironment: ["Frostvale Glacier", "Arid Dunes Oasis"],
    selectable: false,
  },
  {
    id: "Iridescent",
    beneficialEnvironment: ["Greenwood Falls Isle", "Frostvale Glacier"],
    detrimentalEnvironment: ["Savannah Plains Sanctuary", "Peaktop Highlands"],
    selectable: false,
  },
];
const zylarianLimbTypes = [
  {
    id: "Quadripedal",
    beneficialEnvironment: ["Savannah Plains Sanctuary", "Peaktop Highlands"],
    detrimentalEnvironment: ["Greenwood Falls Isle", "Frostvale Glacier"],
  },
  {
    id: "Bipedal Bimanual",
    beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Savannah Plains Sanctuary"],
  },
  {
    id: "Quadripedal Bimanual",
    beneficialEnvironment: [
      "Verdant Canopy Island",
      "Greenwood Falls Isle",
      "Savannah Plains Sanctuary",
      "Peaktop Highlands",
    ],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Savannah Plains Sanctuary"],
    selectable: false,
  },
];
const zylarianSpecialFeatures = [
  {
    id: "Night Vision",
    beneficialEnvironment: [
      "Peaktop Highlands",
      "Greenwood Falls Isle",
      "Arid Dunes Oasis",
    ],
    detrimentalEnvironment: [],
  },
  {
    id: "Amphibious",
    beneficialEnvironment: ["Greenwood Falls Isle", "Verdant Canopy Island"],
    detrimentalEnvironment: ["Arid Dunes Oasis"],
  },
  {
    id: "Enhanced Hearing",
    beneficialEnvironment: ["Savannah Plains Sanctuary", "Frostvale Glacier"],
    detrimentalEnvironment: [],
  },
  {
    id: "Toxic Secretion",
    beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
    detrimentalEnvironment: ["Arid Dunes Oasis"],
  },
  {
    id: "Webbed Feet",
    beneficialEnvironment: ["Greenwood Falls Isle", "Verdant Canopy Island"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Peaktop Highlands"],
  },
  {
    id: "Winged",
    beneficialEnvironment: ["Frostvale Glacier", "Verdant Canopy Island"],
    detrimentalEnvironment: [],
  },
  {
    id: "Hooves",
    beneficialEnvironment: ["Savannah Plains Sanctuary", "Peaktop Highlands"],
    detrimentalEnvironment: ["Greenwood Falls Isle", "Frostvale Glacier"],
  },
  {
    id: "Poisonous",
    beneficialEnvironment: [],
    detrimentalEnvironment: [],
  },
  {
    id: "Venomous",
    beneficialEnvironment: [],
    detrimentalEnvironment: [],
  },
];
const zylarianDietTypes = [
  {
    id: "Herbivore",
    beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Peaktop Highlands"],
  },
  {
    id: "Carnivore",
    beneficialEnvironment: ["Savannah Plains Sanctuary", "Peaktop Highlands"],
    detrimentalEnvironment: ["Greenwood Falls Isle", "Frostvale Glacier"],
  },
  {
    id: "Omnivore",
    beneficialEnvironment: [
      "Greenwood Falls Isle",
      "Savannah Plains Sanctuary",
    ],
    detrimentalEnvironment: ["Frostvale Glacier", "Arid Dunes Oasis"],
  },
  {
    id: "Insectivore",
    beneficialEnvironment: ["Verdant Canopy Island", "Peaktop Highlands"],
    detrimentalEnvironment: ["Frostvale Glacier", "Arid Dunes Oasis"],
  },
  {
    id: "Piscivore",
    beneficialEnvironment: ["Greenwood Falls Isle", "Frostvale Glacier"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Peaktop Highlands"],
  },
  {
    id: "Nectarivore",
    beneficialEnvironment: ["Greenwood Falls Isle", "Verdant Canopy Island"],
    detrimentalEnvironment: ["Arid Dunes Oasis", "Savannah Plains Sanctuary"],
  },
];
optionsMapping = {
  // Mapping for the original Zylarian form
  skinColor: zylarianSkinColors,
  skinTexture: zylarianSkinTextures,
  skinPattern: zylarianSkinPatterns,
  limbType: zylarianLimbTypes,
  specialFeatures: zylarianSpecialFeatures,
  dietType: zylarianDietTypes,

  // Mapping for the mate form
  mateSkinColor: zylarianSkinColors,
  mateSkinTexture: zylarianSkinTextures,
  mateSkinPattern: zylarianSkinPatterns,
  mateLimbType: zylarianLimbTypes,
  mateSpecialFeatures: zylarianSpecialFeatures,
  mateDietType: zylarianDietTypes,
};

/*
Arrays of traits with multiple type options. -- Used for populating dropdown menus. Probably could be optimized
*/

const variablesWithOptions = [
  "skinColor",
  "skinTexture",
  "limbType",
  "specialFeatures",
  "dietType",
];
const mateVariablesWithOptions = [
  "mateSkinTexture",
  "mateSkinPattern",
  "mateLimbType",
  "mateSpecialFeatures",
  "mateDietType",
];

/*
Creating new zylarians
*/
/* 
    Data Model and constructor for each zylarian 
    */

console.log("Please dear jesus. Here we go.");

class Zylarian {
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
    //console.log(this);

    // Generate genotypes for the initial Zylarian
    console.log("Generating genotypes for the initial Zylarian.");
    this.colorGenotypes = assignGenotypesForColor(skinColor);
    this.skinTextureGenotypes = assignGenotypesForSkinTexture(skinTexture);
    this.extractAndStoreAlleles();
    //console.log(this);
  }

  extractAndStoreAlleles() {
    console.log("Extracting alleles for the initial zylarian");
    // Function to split a genotype into alleles
    const splitGenotype = (genotype) => {
      return genotype.split("");
    };

    // Store alleles
    console.log("Storing alleles for the initial zylarian");
    this.alleles = {
      redAlleles: splitGenotype(this.colorGenotypes.redGenotype),
      greenAlleles: splitGenotype(this.colorGenotypes.greenGenotype),
      blueAlleles: splitGenotype(this.colorGenotypes.blueGenotype),
      brownAlleles: splitGenotype(this.colorGenotypes.brownGenotype),
      skinMoistureAlleles: splitGenotype(
        this.skinTextureGenotypes.skinMoistureGenotype
      ),
      scaleAlleles: splitGenotype(this.skinTextureGenotypes.scaleGenotype),
    };
    //console.log(this);
  }
  /* Example usage:
        const zylarian = new Zylarian("Zylo", 150, 500, "Green", "Scaly", "Quadripedal", "Night Vision", "Carnivore");*/
}

// Create initial zylarian from user form and return the zylarian
async function createInitialZylarian() {
  console.log("Getting form values");
  // Set limits of initial zylarian size
  const MIN_HEIGHT = 50;
  const MAX_HEIGHT = 300;
  const MIN_WEIGHT = 75;
  const MAX_WEIGHT = 10000;
  const form = document.getElementById("zylarianForm");

  // Extract values with correct types
  const height = parseInt(form.height.value, 10);
  const weight = parseInt(form.weight.value, 10);

  // Check if values are within the allowed range
  if (
    !areAllValuesNonEmpty(INITIAL_ZYLARIAN) ||
    height < MIN_HEIGHT ||
    height > MAX_HEIGHT ||
    weight < MIN_WEIGHT ||
    weight > MAX_WEIGHT
  ) {
    alert("Please select a valid value for each choice.");
    return;
  } else {
    // Create the initial Zylarian with correct argument order
    initialZylarian = new Zylarian(
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

    initialZylarian.skinPattern = "Solid";
    initialZylarian.ownerId = localStorage.getItem("id");
    initialZylarian.owner = localStorage.getItem("username");

    if (initialZylarian) {
      console.log("Zylarian created successfully");
    } else {
      console.log("Error creating zylarian");
    }
    console.log("MFZB", initialZylarian);
    return initialZylarian;
  }
}

// Get data from local storage
function getZylariansAndMateThem() {
  const zylarian1FromStorage = JSON.parse(localStorage.getItem("zylarian1"));
  const zylarian2FromStorage = JSON.parse(localStorage.getItem("zylarian2"));
  createZylarianByMating(zylarian1FromStorage, zylarian2FromStorage);
}

// Create a zylarian using mating logic -- EMPTY
function createZylarianByMating(zylarian1, zylarian2) {
  let mateActivityCheck = activityMating(
    zylarian1.activity,
    zylarian2.activity
  );
  let mateSizeCheck = reproductiveSuccessBySize(
    zylarian1.height,
    zylarian2.height,
    zylarian1.weight,
    zylarian2.weight,
    alphaH,
    alphaW
  );

  console.log("Mating conditions check");
  if (mateActivityCheck && mateSizeCheck) {
    console.log("Generating new zylarian traits");
    let offspring = {};

    let newActivity = trueFalseMating(zylarian1.activity, zylarian2.activity);
    let newHeight = heightWeightMating(zylarian1.height, zylarian2.height);
    let newWeight = heightWeightMating(zylarian1.weight, zylarian2.weight);
    let newSkinTexture = skinTextureMating(
      zylarian1.skinTexture,
      zylarian2.skinTexture
    );
    let newLimbType = limbTypeMating(zylarian1.limbType, zylarian2.limbType);
    let newFeathered = trueFalseMating(
      zylarian1.feathered,
      zylarian2.feathered
    );
    let newFurry = trueFalseMating(zylarian1.furry, zylarian2.furry);
    let newDietType = trueFalseMating(zylarian1.dietType, zylarian2.dietType);
    let newGenotypes = mendellianCombination(zylarian1, zylarian2);
    let newSkinColor = skinMatching(
      colorGenotypes,
      zylarianSkinColors,
      "color"
    );
    let newSkinPattern = skinMatching(
      textureGenotypes,
      zylarianSkinTextures,
      "texture"
    );
    let newSpecialFeatures = inheritSpecialFeatures(
      zylarian1.specialFeatures,
      zylarian2.specialFeatures
    );

    offspring = new Zylarian(
      generateRandomName(),
      newHeight,
      newWeight,
      newActivity,
      newSkinColor,
      newSkinTexture,
      newLimbType,
      newSpecialFeatures,
      newDietType
    );
  }
  if (offspring) {
    return offspring;
  } else {
    console.log("No offspring");
  }
}

/*
Utility Functions
*/

// Returns zylarian object from a name
function getZylarianByName(name) {
  console.log("Getting zylarian by name");
  return population.find((zylarian) => zylarian.name === name);
}

// Returns a random name
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

// Checks that all values in an object are non-empty
function areAllValuesNonEmpty(obj) {
  console.log("Checking if all values are valid");
  return Object.values(obj).every((value) => value !== "");
}

// Function to assign genotypes for a selected skin color
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

// Function to assign genotypes for a selected skin texture
function assignGenotypesForSkinTexture(selectedTextureId) {
  console.log("Assigning texture genotypes");
  const selectedTexture = zylarianSkinTextures.find(
    (texture) => texture.id === selectedTextureId
  );

  if (selectedTexture) {
    const skinMoistureGenotype = getRandomGenotype(
      selectedTexture.skinMoistureGenotype
    );
    const scaleGenotype = getRandomGenotype(selectedTexture.scaleGenotype);

    return {
      skinMoistureGenotype,
      scaleGenotype,
      feathered: selectedTexture.feathered,
      furry: selectedTexture.furry,
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

// Returns true or false based on a given probability
function getRandomBoolean(probability) {
  console.log("Getting random boolean");
  return Math.random() < probability;
}

// Returns the full genotype when two genes are linked
function linkGenes(gene1Genotype, gene2Genotype) {
  console.log("Linking genes");
  return gene1Genotype + gene2Genotype;
}

// Returns an array of two sets of alleles for two traits that are linked
function simulateLinkage(genotype1, genotype2, linkChance) {
  console.log("Simulating linkage");
  // Randomly determine if alleles for the two genes will be linked
  const crossingOver = Math.random() < linkChance; // 50% chance of linkage, adjust as needed

  if (!crossingOver) {
    console.log("Crossing over did not occer.");
    // If linked, return the alleles as they are
    return [
      genotype1.charAt(0) + genotype2.charAt(0),
      genotype1.charAt(1),
      genotype2.charAt(1),
    ];
  } else {
    console.log("Crossing over has occurred between two linked traits.");
    // If not linked, swap alleles of the second gene
    return [
      genotype1.charAt(0) + genotype2.charAt(1),
      genotype1.charAt(1) + genotype2.charAt(0),
    ];
  }
}

/*
Mating Logic
*/

// Sets the attributes of the current mate and returns a mating pair of objects as an array
function setCurrentMatingPair() {
  console.log("Mating button pressed");
  const form = document.getElementById("mateForm");

  // Set player zylarian object
  let playerZylarian = getZylarianByName(form.nameChoice.value);

  currentMateFormValues = {
    name: form.mateName.value,
    skinColorGenotypes: {
      redGenotype: form.mateRedGenotype.value,
      greenGenotype: form.mateGreenGenotype.value,
      blueGenotype: form.mateBlueGenotype.value,
      brownGenotype: form.mateBrownGenotype.value,
    },
    skinTextureGenotypes: {
      skinMoistureGenotype: form.mateSkinMoistureGenotype.value,
      scaleGenotype: form.mateScaleGenotype.value,
      feathered: form.mateFeathered.value,
      furry: form.mateFurry.value,
    },
    height: parseInt(form.mateHeight.value, 10), // Assuming height is a number
    weight: parseInt(form.mateWeight.value, 10), // Assuming weight is a number
    limbType: form.mateLimbType.value,
    specialFeatures: [form.mateSpecialFeatures.value],
    dietType: form.mateDietType.value,
    activity: form.mateActivity.value,
  };

  if (!areAllValuesNonEmpty(currentMate)) {
    alert("Please select a valid value for each option");
    return;
  }

  // Set current mate
  currentMate = new Zylarian(
    currentMateFormValues.name,
    currentMateFormValues.height,
    currentMateFormValues.weight,
    currentMateFormValues.activity,
    skinMatching(
      currentMateFormValues.skinColorGenotypes,
      zylarianSkinColors,
      "color"
    ),
    skinMatching(
      currentMateFormValues.skinTextureGenotypes,
      zylarianSkinTextures,
      "texture"
    ),
    currentMateFormValues.limbType,
    currentMateFormValues.specialFeatures,
    currentMateFormValues.dietType
  );

  console.log(currentMate); // For debugging
  alert("Current mate set!"); // Inform the user

  document.getElementById("mateFormContainer").style.display = "none";
  document.getElementById("mateZylarian").style.display = "block";

  let mateText = document.getElementById("mateText");

  mateText.innerHTML = `    
            <strong>Mate:</strong> ${currentMate.name}<br>
            Color: ${currentMate.skinColor}, Texture: ${currentMate.skinTexture}, Pattern: ${currentMate.skinPattern}<br>
            Height: ${currentMate.height} cm, Weight: ${currentMate.weight} g<br>
            Limb Type: ${currentMate.limbType}, Special Feature: ${currentMate.specialFeatures}, Diet: ${currentMate.dietType}<br>
            Color Genotype: ${currentMate.colorGenotypes}
        `;
}

// Height and weight mating algorithm returns a random number between the max and min height of the zylarians
function heightWeightMating(measurement1, measurement2) {
  console.log("Generating height and weight");
  let max = Math.max(measurement1, measurement2) + measurement1 * 0.1;
  let min = Math.min(measurement1, measurement2) - measurement2 * 0.1;
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

// Feather and fur mating algorithm returns an array of two booleans for whether the new zylarian is feathered or furry
function trueFalseMating(trait1, trait2) {
  console.log("Generating skin texture");
  if (trait1 == trait2) {
    return trait1;
  } else {
    return getRandomBoolean(0.5);
  }
}

// Limb type mating algorithm returns an array of limb types. Meant to introduce centaur like body types as a mutation when types differ
function limbTypeMating(type1, type2) {
  console.log("Generating limb type");
  if (type1 == type2) {
    return type1;
  }

  let randomNumber = Math.ceil(Math.random() * 100);

  if (randomNumber > 98) {
    return limbType[2].id;
  } else if (randomNumber > 47) {
    return type1;
  } else {
    return type2;
  }
}

// Returns whether or not mating is successful as true or false. Meant to simulate whether or not the organisms were able to come in contact with each other due to activity cycles
function activityMating(activity1, activity2) {
  console.log("Checking activity period");
  if (activity1 == activity2) {
    return Math.random > 0.2;
  } else {
    return Math.random > 0.9;
  }
}

function skinColorMating(genotypes) {
  console.log("Generating color");
  for (const skinColor of zylarianSkinColors) {
    let matched = true;
    for (const key of [
      "redGenotype",
      "greenGenotype",
      "blueGenotype",
      "brownGenotype",
    ]) {
      if (Array.isArray(skinColor[key])) {
        if (!skinColor[key].includes(genotypes[key])) {
          matched = false;
          break;
        }
      } else {
        if (skinColor[key] !== genotypes[key]) {
          matched = false;
          break;
        }
      }
    }
    if (matched) {
      return skinColor.id;
    }
  }
  return null; // Return null if no matching skin color is found
}

function skinMatching(genotypes, skinData, type) {
  console.log("Matching genotypes to phenotypes");
  for (const skinItem of skinData) {
    let matched = true;
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
        "feathered",
        "furry",
      ];
    }

    for (const key of propertiesToMatch) {
      if (Array.isArray(skinItem[key])) {
        if (!skinItem[key].includes(genotypes[key])) {
          matched = false;
          break;
        }
      } else {
        if (skinItem[key] !== genotypes[key]) {
          matched = false;
          break;
        }
      }
    }
    if (matched) {
      return skinItem.id;
    }
  }
  return null; // Return null if no matching skin color or texture is found
}

function mendellianCombination(zylarian1, zylarian2) {
  console.log("Doing Punnett Squares");
  const offspringGenotypes = {};

  // Loop through each allele pair in the alleles object
  for (const alleleKey in zylarian1.alleles) {
    if (
      zylarian1.alleles.hasOwnProperty(alleleKey) &&
      zylarian2.alleles.hasOwnProperty(alleleKey) &&
      !Boolean(zylarian1.alleles[alleleKey]) && // Check if alleleKey is not a boolean
      !Boolean(zylarian2.alleles[alleleKey]) // Check if alleleKey is not a boolean
    ) {
      const zylarian1Alleles = zylarian1.alleles[alleleKey];
      const zylarian2Alleles = zylarian2.alleles[alleleKey];

      // Generate genotype for each allele pair
      offspringGenotypes[alleleKey] = generateOffspringGenotype(
        zylarian1Alleles[0],
        zylarian1Alleles[1],
        zylarian2Alleles[0],
        zylarian2Alleles[1]
      );
    }
  }

  return offspringGenotypes;
}

// Punnett square function
function generateOffspringGenotype(
  zylarian1Allele1,
  zylarian1Allele2,
  zylarian2Allele1,
  zylarian2Allele2
) {
  console.log("Generating genotype");
  // Randomly select one allele from each zylarian
  const offspringAllele1 =
    Math.random() < 0.5 ? zylarian1Allele1 : zylarian1Allele2;
  const offspringAllele2 =
    Math.random() < 0.5 ? zylarian2Allele1 : zylarian2Allele2;

  return offspringAllele1 + offspringAllele2;
}

// Returns a bool for reproductive success probability based on height and weight.
function reproductiveSuccessBySize(height1, height2, weight1, weight2) {
  console.log("Checking size compatibility");
  const ALPHA_H = 1;
  const ALPHA_W = 1;
  let avgHeight = (height1 + height2) / 2;
  let avgWeight = (weight1 + weight2) / 2;

  let heightDifference = Math.abs(height1 - height2) / avgHeight;
  let weightDifference = Math.abs(weight1 - weight2) / avgWeight;

  return (
    Math.exp(-(ALPHA_H * heightDifference + ALPHA_W * weightDifference)) > 0.5
  );
}

function inheritSpecialFeatures(parent1Features, parent2Features) {
  console.log("Generating special features");
  const offspringFeatures = [];
  const inheritanceProbability = {
    parent1: 0.75,
    parent2: 0.25,
  };

  // Check for each feature of parent1
  parent1Features.forEach((feature) => {
    if (Math.random() < inheritanceProbability.parent1) {
      offspringFeatures.push(feature);
    }
  });

  // Check for each feature of parent2 not already included
  parent2Features.forEach((feature) => {
    if (
      !offspringFeatures.includes(feature) &&
      Math.random() < inheritanceProbability.parent2
    ) {
      offspringFeatures.push(feature);
    }
  });

  return offspringFeatures;
}

/*
Handling button submit forms
*/

// Handling initial zylarian form submit
async function handleInitialZylarian() {
  console.log("Handling initial zylarian");
  initialZylarian = await createInitialZylarian();
  if (initialZylarian) {
    population.push(initialZylarian);
    await sendZylarianData(initialZylarian);

    return "success";
  } else {
    // Handle the case where no Zylarian is created (e.g., show an error message)
    console.error("Failed to create a new Zylarian.");
    return "error";
  }
}

// Clears the existing zylarian list to start fresh each time and creates a list item for each player zylarian
function updateZylarianList(population) {
  console.log("Updating zylarian list");

  const listContainer = document.getElementById(
    "zylariansControlledByPlayerListContainer"
  );
  //listContainer.innerHTML = ""; // Clear existing list
  console.log(population);

  // Creates a list item for each zylarian in the array
  population.forEach((zylarian, index) => {
    const colorGenotypes = zylarian.colorGenotypes;
    const textureGenotypes = zylarian.skinTextureGenotypes;

    let feathered = textureGenotypes.feathered ? "true" : "false";
    let furry = textureGenotypes.furry ? "true" : "false";

    const skinColorGenotypeString = `<span class="red">Red: ${colorGenotypes.redGenotype}</span>, <span class="green">Green: ${colorGenotypes.greenGenotype}</span>, <span class="blue">Blue: ${colorGenotypes.blueGenotype}</span>, <span class="brown">Brown: ${colorGenotypes.brownGenotype}</span>`;
    const skinTextureGenotypeString = `Scales: ${textureGenotypes.scaleGenotype}, Skin Moisture: ${textureGenotypes.skinMoistureGenotype}, Feathered: <span class="${feathered}">${textureGenotypes.feathered}</span>, Furry: <span class="${furry}">${textureGenotypes.furry}</span>`;

    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <li><strong>Zylarian ${
              index + 1
            }:</strong><span class="currentUser"> ${zylarian.name}</span></li>
            <li>Color: ${zylarian.skinColor}, Texture: ${
      zylarian.skinTexture
    }, Pattern: ${zylarian.skinPattern}</li><li>
            Height: ${zylarian.height} cm, Weight: ${zylarian.weight} g</li><li>
            Limb Type: ${zylarian.limbType}, Special Feature: ${
      zylarian.specialFeatures
    }, Diet: ${zylarian.dietType}</li><li>
            Color Genotypes: ${skinColorGenotypeString}</li><li>
            Skin Texture Genotypes: ${skinTextureGenotypeString}
            `;
    listContainer.appendChild(listItem);
  });
}

// Populates all option menus
function initializeZylarianMenu(selectIds) {
  console.log("Initializing menu");

  selectIds.forEach((id) => {
    const optionsArray = optionsMapping[id];
    if (optionsArray) {
      populateOptions(id, optionsArray);
    } else {
      console.error("No options array found for:", id);
    }
  });
}

// Populates dropdown menu with all items in an array
function populateOptions(elementId, optionsArray) {
  console.log("Populating options");

  const selectElement = document.getElementById(elementId);

  if (selectElement) {
    // Create and add the placeholder option
    const placeholderOption = document.createElement("option");
    placeholderOption.textContent = "Select an option"; // Placeholder text
    placeholderOption.disabled = true; // The user can't select this
    placeholderOption.selected = true; // This option is selected by default
    placeholderOption.value = "";
    selectElement.appendChild(placeholderOption);

    optionsArray.forEach((obj) => {
      if (obj.selectable != false) {
        const option = document.createElement("option");
        option.value = obj.id;
        option.textContent = obj.id;
        selectElement.appendChild(option);
      }
      obj.selectable = true;
    });
  } else {
    console.error("Element not found for ID:", elementId);
  }
}

/*
GAME LOGIC
*/

initializeZylarianMenu(variablesWithOptions);
