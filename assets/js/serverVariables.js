const serverAddress = "http://127.0.0.1:3000/";
// const serverAddress = "https://nsgserver.gbs423.com/";

/*
Initializing global variables
*/

let population = []; // Array of zylarians controlled by the player
let INITIAL_ZYLARIAN = {}; //Object to hold the initial zylarian for the entire game
let currentMate = {}; // Object to hold the current mating partner
let generation = 0; // Keeping track of generations
let month = 0;
const ALPHA_H = 1;
const ALPHA_W = 1;

/* 
Arrays of trait objects
*/

const zylarianSkinColors = [
  {
    id: "White",
    redGenotype: "rr",
    greenGenotype: "gg",
    blueGenotype: "bb",
    brownGenotype: "pp",
    selectable: false,
  },
  {
    id: "Beige",
    redGenotype: "rr",
    greenGenotype: "gg",
    blueGenotype: "bb",
    brownGenotype: "Pp",
  },
  {
    id: "Gray",
    redGenotype: "Rr",
    greenGenotype: "Gg",
    blueGenotype: "Bb",
    brownGenotype: "pp",
  },
  {
    id: "Blue",
    redGenotype: "rr",
    greenGenotype: "gg",
    blueGenotype: ["BB", "Bb"],
    brownGenotype: "pp",
    selectable: false,
  },
  {
    id: "Green",
    redGenotype: "rr",
    greenGenotype: ["GG", "Gg"],
    blueGenotype: "bb",
    brownGenotype: "pp",
    selectable: false,
  },
  {
    id: "Red",
    redGenotype: "RR",
    greenGenotype: "gg",
    blueGenotype: "bb",
    brownGenotype: "pp",
    selectable: false,
  },
  {
    id: "Pink",
    redGenotype: "Rr",
    greenGenotype: "gg",
    blueGenotype: "bb",
    brownGenotype: "pp",
    selectable: false,
  },
  {
    id: "Yellow",
    redGenotype: ["RR", "Rr"],
    greenGenotype: ["GG", "Gg"],
    blueGenotype: "bb",
    brownGenotype: "pp",
  },
  {
    id: "Brown",
    redGenotype: ["RR", "Rr", "rr"],
    greenGenotype: ["GG", "Gg", "gg"],
    blueGenotype: ["BB", "Bb", "bb"],
    brownGenotype: ["PP", "Pp"],
  },
  {
    id: "Black",
    redGenotype: "RR",
    greenGenotype: "GG",
    blueGenotype: "BB",
    brownGenotype: "PP",
  },
];
const zylarianSkinTextures = [
  {
    id: "Scaly",
    skinMoistureGenotype: "ww",
    scaleGenotype: "SS",
    furGenotype: "ff",
    featherGenotype: "bb",
  },
  {
    id: "Smooth",
    skinMoistureGenotype: ["WW", "Ww", "ww"],
    scaleGenotype: "ss",
    furGenotype: "ff",
    featherGenotype: "bb",
  },
  {
    id: "Furry",
    skinMoistureGenotype: ["Ww", "ww"],
    scaleGenotype: "ss",
    furGenotype: ["FF", "Ff"],
    featherGenotype: "bb",
  },
  {
    id: "Leathery",
    skinMoistureGenotype: "ww",
    scaleGenotype: ["SS", "Ss", "ss"],
    furGenotype: "ff",
    featherGenotype: "bb",
  },
  {
    id: "Feathered",
    skinMoistureGenotype: ["WW", "Ww", "ww"],
    scaleGenotype: ["SS", "Ss"],
    furGenotype: "ff",
    featherGenotype: "BB",
  },
  {
    id: "Slimy",
    skinMoistureGenotype: "WW",
    scaleGenotype: "ss",
    furGenotype: ["Ff", "ff"],
    featherGenotype: "bb",
  },
];
const zylarianSkinPatterns = [
  {
    id: "Solid",
  },
  {
    id: "Striped",
    selectable: false,
  },
  {
    id: "Spotted",
    selectable: false,
  },
  {
    id: "Iridescent",
    selectable: false,
  },
];
const zylarianLimbTypes = [
  {
    id: "Quadripedal",
  },
  {
    id: "Bipedal Bimanual",
  },
  {
    id: "Quadripedal Bimanual",
    selectable: false,
  },
];
const zylarianSpecialFeatures = [
  {
    id: "Night Vision",
  },
  {
    id: "Amphibious",
  },
  {
    id: "Enhanced Hearing",
  },
  {
    id: "Toxic Secretion",
  },
  {
    id: "Webbed Feet",
  },
  {
    id: "Winged",
  },
  {
    id: "Hooves",
  },
  {
    id: "Poisonous",
  },
  {
    id: "Venomous",
  },
];
const zylarianDietTypes = [
  {
    id: "Herbivore",
  },
  {
    id: "Carnivore",
  },
  {
    id: "Omnivore",
  },
  {
    id: "Insectivore",
  },
  {
    id: "Piscivore",
  },
  {
    id: "Nectarivore",
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
Returns a random name
*/

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
