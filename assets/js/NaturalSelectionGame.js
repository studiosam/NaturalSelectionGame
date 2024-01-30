// Zylarian Game Logic

// Get data from local storage
async function getZylariansAndMateThem() {
  const checkMateStatus = await mateStatus();

  if (checkMateStatus === "Failed") {
    console.log("failed");
    // Output to Page //
    document.querySelector(
      "#childAlertContainer"
    ).innerHTML = `<div class="text-center alertBG"><p">Mating Unsuccessful :(</p><br /><p>Please Try Again</p>`;
    $("#childAlertBox").fadeIn();
    setTimeout(() => {
      $("#alertBox").fadeOut();
      document.querySelector("#childAlertContainer").innerHTML = "";
    }, 3000);
  } else {
    // Output to Page //

    document.querySelector("#childAlertContainer").innerHTML =
      zylarianNewChild(checkMateStatus);
    $("#childAlertBox").fadeIn();
    setTimeout(() => {
      $("#alertBox").fadeOut();
      document.querySelector("#childAlertContainer").innerHTML = "";
    }, 3000);
    document.querySelector("#mateForm").reset();
  }
}

async function mateStatusOld() {
  try {
    const zylarian1FromStorage = JSON.parse(localStorage.getItem("zylarian1"));
    const zylarian2FromStorage = JSON.parse(localStorage.getItem("zylarian2"));
    const newZylarian = createZylarianByMating(
      zylarian1FromStorage,
      zylarian2FromStorage
    );

    localStorage.removeItem("zylarian2");
    newZylarian.ownerId = localStorage.getItem("id");
    newZylarian.owner = localStorage.getItem("username");
    sendZylarianData(newZylarian);
    return newZylarian;
  } catch (error) {
    return "Failed";
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
  listContainer.innerHTML = ""; // Clear existing list
  console.log(population);

  // Creates a list item for each zylarian in the array
  population.forEach((zylarian, index) => {
    const colorGenotypes = JSON.parse(zylarian.genotypes).color;
    const textureGenotypes = JSON.parse(zylarian.genotypes).texture;

    const skinColorGenotypeString = `<span class="red">Red: ${colorGenotypes.redGenotype}</span>, <span class="green">Green: ${colorGenotypes.greenGenotype}</span>, <span class="blue">Blue: ${colorGenotypes.blueGenotype}</span>, <span class="brown">Brown: ${colorGenotypes.brownGenotype}</span>`;
    const skinTextureGenotypeString = `Scales: ${textureGenotypes.scaleGenotype}, Skin Moisture: ${textureGenotypes.skinMoistureGenotype}, Feathered: ${textureGenotypes.featherGenotype}, Furry: ${textureGenotypes.furGenotype}`;

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
  }
}

/*
GAME LOGIC
*/
initializeZylarianMenu(mateVariablesWithOptions);
initializeZylarianMenu(variablesWithOptions);
