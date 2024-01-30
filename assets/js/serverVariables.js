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
