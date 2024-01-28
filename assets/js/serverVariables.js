const serverAddress = "http://127.0.0.1:4000/";
// const serverAddress = "https://nsgserver.gbs423.com/";

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
/*
Creating new zylarians
*/
/* 
    Data Model and constructor for each zylarian 
    */

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
    console.log("THIS", this);

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
