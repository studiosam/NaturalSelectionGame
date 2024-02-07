// const serverAddress = "http://127.0.0.1:3000/";
const serverAddress = "https://nsgserver.gbs423.com/";

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
Arrays of Phenotype Objects
*/

const zylarianSkinColors = [
  {
    id: "White",
  },
  {
    id: "Beige",
  },
  {
    id: "Gray",
  },
  {
    id: "Blue",
    selectable: false,
  },
  {
    id: "Green",
    selectable: false,
  },
  {
    id: "Red",
    selectable: false,
  },
  {
    id: "Pink",
    selectable: false,
  },
  {
    id: "Yellow",
    selectable: false,
  },
  {
    id: "Brown",
  },
  {
    id: "Black",
  },
];
const zylarianSkinTextures = [
  {
    id: "Smooth",
  },
  {
    id: "Scaly",
  },
  {
    id: "Fuzzy",
  },
  {
    id: "Leathery",
    selectable: false,
  },
  {
    id: "Feathered",
    selectable: false,
  },
  {
    id: "Slimy",
    selectable: false,
  },
  {
    id: "Rough",
    selectable: false,
  },
  {
    id: "Furry",
    selectable: false,
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
  {
    id: "Camouflaged",
    selectable: false,
  },
];
const zylarianLimbTypes = [
  {
    id: "Four legs",
  },
  {
    id: "Two Hands, Two Legs",
  },
  {
    id: "Two Hands, Four Legs",
    selectable: false,
  },
  {
    id: "Four Hands, Two Legs",
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
];

/*
Arrays of Genotype Objects
*/
const zylarianGenes = [
  {
    id: "Red Pigment",
  },
  {
    id: "Green Pigment",
  },
  {
    id: "Blue Pigment",
  },
  {
    id: "Brown Pigment",
  },
  {
    id: "Mucous Secretion",
  },
  {
    id: "Scales",
  },
  {
    id: "Hair",
  },
  {
    id: "Pairs of Limbs",
  },
  {
    id: "Webbed Digits",
  },
  {
    id: "Eyesight",
  },
  {
    id: "Swimming",
  },
  {
    id: "Flying",
  },
  {
    id: "Poison",
  },
  {
    id: "Venom",
  },
  {
    id: "Front Teeth",
  },
  {
    id: "Back Teeth",
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
