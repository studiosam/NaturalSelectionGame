// Initialize empty array of Zylarians controlled by the player
let population = [];

let currentMate = {};

let generation = 0;

// Set arrays with all the variables with menu options
let variablesWithOptions = ["skinColor", "skinTexture", "skinPattern", "limbType", "specialFeatures", "dietType" ];
let mateVariablesWithOptions = ["mateSkinColor", "mateSkinTexture", "mateSkinPattern", "mateLimbType", "mateSpecialFeatures", "mateDietType" ];

// Arrays of objects with names and beneficial environments
const zylarianSkinColors = [
    {
        id: "White",
        beneficialEnvironment: ["Frostvale Glacier"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Arid Dunes Oasis"],
        redGenotype: "rr",
        greenGenotype: "gg",
        blueGenotype: "bb",
        brownGenotype: "pp",
        selectable: false
    },
    {
        id: "Beige",
        beneficialEnvironment: ["Arid Dunes Oasis"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Frostvale Glacier"],
        redGenotype: "rr",
        greenGenotype: "gg",
        blueGenotype: "bb",
        brownGenotype: "Pp"
    },
    {
        id: "Gray",
        beneficialEnvironment: ["Peaktop Highlands"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
        redGenotype: "Rr",
        greenGenotype: "Gg",
        blueGenotype: "Bb",
        brownGenotype: "pp"
    },
    {
        id: "Blue",
        beneficialEnvironment: ["Frostvale Glacier"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Peaktop Highlands"],
        redGenotype: "rr",
        greenGenotype: "gg",
        blueGenotype: ["BB", "Bb"],
        brownGenotype: "pp",
        selectable: false
    },
    {
        id: "Green",
        beneficialEnvironment: ["Verdant Canopy Island"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
        redGenotype: "rr",
        greenGenotype: ["GG", "Gg"],
        blueGenotype: "bb",
        brownGenotype: "pp",
        selectable: false
    },
    {
        id: "Red",
        beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
        redGenotype: "RR",
        greenGenotype: "gg",
        blueGenotype: "bb",
        brownGenotype: "pp",
        selectable: false
    },
    {
        id: "Pink",
        beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
        redGenotype: "Rr",
        greenGenotype: "gg",
        blueGenotype: "bb",
        brownGenotype: "pp",
        selectable: false
    },
    {
        id: "Yellow",
        beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Peaktop Highlands", "Frostvale Glacier"],
        redGenotype: ["RR", "Rr"],
        greenGenotype: ["GG","Gg"],
        blueGenotype: "bb",
        brownGenotype: "pp"
    },
    {
        id: "Brown",
        beneficialEnvironment: ["Peaktop Highlands", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
        redGenotype: ["RR", "Rr", "rr"],
        greenGenotype: ["GG", "Gg", "gg"],
        blueGenotype: ["BB","Bb", "bb"],
        brownGenotype: ["PP","Pp"]
    },
    {
        id: "Black",
        beneficialEnvironment: ["Peaktop Highlands", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Savannah Plains Sanctuary"],
        redGenotype: "RR",
        greenGenotype: "GG",
        blueGenotype: "BB",
        brownGenotype: "PP"
    }
];

const zylarianSkinTextures = [
    {
        id: "Scaly",
        beneficialEnvironment: ["Arid Dunes Oasis", "Peaktop Highlands"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Frostvale Glacier"],
        skinMoistureGenotype: "ww",
        scaleGenotype: ["SS", "Ss"],
        feathered: false,
        furry: false
    },
    {
        id: "Smooth",
        beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
        skinMoistureGenotype: ["WW", "Ww", "ww"],
        scaleGenotype: "ss",
        feathered: false,
        furry: false
    },
    {
        id: "Furry",
        beneficialEnvironment: ["Frostvale Glacier", "Savannah Plains Sanctuary"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Greenwood Falls Isle"],
        skinMoistureGenotype: ["Ww", "ww"],
        scaleGenotype: "ss",
        feathered: false,
        furry: true
    },
    {
        id: "Leathery",
        beneficialEnvironment: ["Peaktop Highlands", "Arid Dunes Oasis"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
        skinMoistureGenotype: "ww",
        scaleGenotype: ["SS", "Ss", "ss"],
        feathered: false,
        furry: false
    },
    {
        id: "Feathered",
        beneficialEnvironment: ["Savannah Plains Sanctuary", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"],
        skinMoistureGenotype: ["Ww", "ww"],
        scaleGenotype: ["SS", "Ss"],
        feathered: true,
        furry: false
        
    },
    {
        id: "Slimy",
        beneficialEnvironment: ["Greenwood Falls Isle", "Verdant Canopy Island"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Peaktop Highlands"],
        skinMoistureGenotype: "WW",
        scaleGenotype: ["ss"],
        feathered: false,
        furry: false
    }
];

const zylarianSkinPatterns = [
    {
        id: "Striped",
        beneficialEnvironment: ['Savannah Plains Sanctuary', 'Greenwood Falls Isle'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Peaktop Highlands']
    },
    {
        id: "Spotted",
        beneficialEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle'],
        detrimentalEnvironment: ['Frostvale Glacier', 'Arid Dunes Oasis']
    },
    {
        id: "Solid",
        beneficialEnvironment: ['Peaktop Highlands', 'Frostvale Glacier'],
        detrimentalEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle']
    },
    {
        id: "Iridescent",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Frostvale Glacier'],
        detrimentalEnvironment: ['Savannah Plains Sanctuary', 'Peaktop Highlands']
    }
];

const zylarianLimbTypes = [
    {
        id: "Quadripedal",
        beneficialEnvironment: ['Savannah Plains Sanctuary', 'Peaktop Highlands'],
        detrimentalEnvironment: ['Greenwood Falls Isle', 'Frostvale Glacier']
    },
    {
        id: "Bipedal Bimanual",
        beneficialEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Savannah Plains Sanctuary']
    },
    {
        id: "Quadripedal Bimanual",
        beneficialEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle', 'Savannah Plains Sanctuary', 'Peaktop Highlands'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Savannah Plains Sanctuary'],
        selectable: false
    }
];

const zylarianSpecialFeatures = [
    {
        id: "Night Vision",
        beneficialEnvironment: ['Peaktop Highlands', 'Greenwood Falls Isle', 'Arid Dunes Oasis'],
        detrimentalEnvironment:[]
    },
    {
        id: "Amphibious",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Verdant Canopy Island'],
        detrimentalEnvironment:['Arid Dunes Oasis']
    },
    {
        id: "Enhanced Hearing",
        beneficialEnvironment: ['Savannah Plains Sanctuary', 'Frostvale Glacier'],
        detrimentalEnvironment:[]
    },
    {
        id: "Toxic Secretion",
        beneficialEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle'],
        detrimentalEnvironment:['Arid Dunes Oasis']
    },
    {
        id: "Webbed Feet",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Verdant Canopy Island'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Peaktop Highlands']
    },
    {
        id: "Winged",
        beneficialEnvironment: ['Frostvale Glacier', 'Verdant Canopy Island'],
        detrimentalEnvironment:[]
    },
    {
        id: "Hooves",
        beneficialEnvironment: ['Savannah Plains Sanctuary', 'Peaktop Highlands'],
        detrimentalEnvironment: ['Greenwood Falls Isle', 'Frostvale Glacier']
    }
];

const zylarianDietTypes = [
    {
        id: "Herbivore",
        beneficialEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Peaktop Highlands']
    },
    {
        id: "Carnivore",
        beneficialEnvironment: ['Savannah Plains Sanctuary', 'Peaktop Highlands'],
        detrimentalEnvironment: ['Greenwood Falls Isle', 'Frostvale Glacier']
    },
    {
        id: "Omnivore",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Savannah Plains Sanctuary'],
        detrimentalEnvironment: ['Frostvale Glacier', 'Arid Dunes Oasis']
    },
    {
        id: "Insectivore",
        beneficialEnvironment: ['Verdant Canopy Island', 'Peaktop Highlands'],
        detrimentalEnvironment: ['Frostvale Glacier', 'Arid Dunes Oasis']
    },
    {
        id: "Piscivore",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Frostvale Glacier'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Peaktop Highlands']
    },
    {
        id: "Nectarivore",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Verdant Canopy Island'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Savannah Plains Sanctuary']
    }
];

const optionsMapping = {
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
    mateDietType: zylarianDietTypes
};

// Create initial zylarian from user form and add it to the array of zylarians that the player controls
function createZylarian() {
    const form = document.getElementById('zylarianForm');

    const newZylarian = new Zylarian(
        form.name.value,
        form.skinColor.value,
        form.skinTexture.value,
        form.skinPattern.value,
        form.height.value,
        form.weight.value,
        form.limbType.value,
        form.specialFeatures.value,
        form.dietType.value
    );

    if(!areAllValuesNonEmpty(newZylarian)) {
        alert("Please select a valid value for each option");
        return;
    }

    newZylarian.colorGenotypes = assignGenotypesForColor(newZylarian.skinColor);
    newZylarian.skinTextureGenotypes = assignGenotypesForSkinTexture(newZylarian.skinTexture);
    
    population.push(newZylarian); // Add new zylarian to the player's population
    updateZylarianList(); // Update the list to include the new Zylarian
    alert("New Zylarian created!"); // feedback to the user    

    updateScreen();
}

// Sets the attributes of the current mate and returns a mating pair of objects as an array
function setCurrentMate(playerZylarianName) {
    let playerZylarian = playerZylarianName
    const form = document.getElementById('mateForm');
    currentMate = {
        skinColor: form.mateSkinColor.value,
        skinTexture: form.mateSkinTexture.value,
        skinPattern: form.mateSkinPattern.value,
        height: parseInt(form.mateHeight.value, 10), // Assuming height is a number
        weight: parseInt(form.mateWeight.value, 10), // Assuming weight is a number
        limbType: form.mateLimbType.value,
        specialFeatures: form.mateSpecialFeatures.value,
        dietType: form.mateDietType.value
    };
    if(form.mateName.value) {
        currentMate.name = form.mateName.value;
    }
    else {
        currentMate.name = generateRandomName();
    }

    // Optional: Add validation here
    if(!areAllValuesNonEmpty(currentMate)) {
        alert("Please select a valid value for each option");
        return;
    }

    console.log(currentMate); // For debugging
    alert('Current mate set!'); // Inform the user
    document.getElementById('mateFormContainer').style.display = 'none';
    document.getElementById('mateZylarian').style.display = 'block';

    let mateText = document.getElementById('mateText');

    mateText.innerHTML = `    
        <strong>Mate:</strong> ${currentMate.name}<br>
        Color: ${currentMate.skinColor}, Texture: ${currentMate.skinTexture}, Pattern: ${currentMate.skinPattern}<br>
        Height: ${currentMate.height} cm, Weight: ${currentMate.weight} g<br>
        Limb Type: ${currentMate.limbType}, Special Feature: ${currentMate.specialFeatures}, Diet: ${currentMate.dietType}<br>
        Color Genotype: ${currentMate.colorGenotypes}
    `;
}

// Mating function
function mateAttempt(zylarian1, zylarian2) {
    let successfulMate = activityMating(zylarian1.activity, zylarian2.activity);
    let newHeight = heightWeightMating(zylarian1.height, zylarian2.height);
    let newWeight = heightWeightMating(zylarian1.weight, zylarian2.weight);
    let newSkinTexture = skinTextureMating(zylarian1.skinTexture, zylarian2.skinTexture);
    let newLimbType = limbTypeMating(zylarian1.limbType, zylarian2.limbType);

}

// Height mating algorithm returns a number
function heightWeightMating(measurement1, measurement2) {
    let max = Math.max(measurement1, measurement2);
    let min = Math.min(measurement1, measurement2);
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

// Skin Texture mating algorith returns a skin texture as a string

// Limb type mating algorith returns an array of limb types. Meant to introduce centaur like body types as a mutation when types differ
function limbTypeMating(type1, type2,) {
    if(type1 == type2) {
        return type1;
    }

    let randomNumber = Math.ceil(Math.random()*100);
    
    if (randomNumber > 98) {
        return limbType[2].id;
    }
    else if(randomNumber > 47) {
        return type1;
    } 
    else {
        return type2;
    }
}

// Returns whether or not mating is successful as true or false. Meant to simulate whether or not the organisms were able to come in contact with each other due to activity cycles
function activityMating(activity1, activity2) {
    if(activity1 == activity2) {
        return Math.random > 0.2;
    }
    else {
        return Math.random > 0.7;
    }
}

function updateScreen() {
    // Hide the creation form and show the Zylarians list
    document.getElementById('zylarianCreationFormPage').style.display = 'none';
    document.getElementById('zylariansControlledByPlayerPage').style.display = 'block';

    // Populate the mate form dropdowns
    initializeZylarianMenu(mateVariablesWithOptions);
}

// Clears the existing zylarian list to start fresh each time
function updateZylarianList() {
    const listContainer = document.getElementById('zylariansControlledByPlayerListContainer');
    listContainer.innerHTML = ''; // Clear existing list
    
    // Creates a list item for each zylarian in the array
    population.forEach((zylarian, index) => {
        const genotypes = zylarian.colorGenotypes;
        const genotypeString = `Red: ${genotypes.redGenotype}, Green: ${genotypes.greenGenotype}, Blue: ${genotypes.blueGenotype}, Brown: ${genotypes.brownGenotype}`;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Zylarian ${index + 1}:</strong> ${zylarian.name}<br>
            Color: ${zylarian.skinColor}, Texture: ${zylarian.skinTexture}, Pattern: ${zylarian.skinPattern}<br>
            Height: ${zylarian.height} cm, Weight: ${zylarian.weight} g<br>
            Limb Type: ${zylarian.limbType}, Special Feature: ${zylarian.specialFeatures}, Diet: ${zylarian.dietType}<br>
            Color Genotypes: ${genotypeString}
            `;
        listContainer.appendChild(listItem);
    });
}

// Populates all option menus
function initializeZylarianMenu(selectIds) {
    selectIds.forEach(id => {
        const optionsArray = optionsMapping[id];
        if (optionsArray) {
            populateOptions(id, optionsArray);
        } else {
            console.error('No options array found for:', id);
        }
    });
}

// Populates dropdown menu with all items in an array
function populateOptions(elementId, optionsArray) {
    const selectElement = document.getElementById(elementId);
    
    if (selectElement) {
        // Create and add the placeholder option
        const placeholderOption = document.createElement('option');
        placeholderOption.textContent = "Select an option"; // Placeholder text
        placeholderOption.disabled = true; // The user can't select this
        placeholderOption.selected = true; // This option is selected by default
        placeholderOption.value = "";
        selectElement.appendChild(placeholderOption);
        
        optionsArray.forEach(obj => {
            if(obj.selectable != false) {
                const option = document.createElement('option');
                option.value = obj.id;  
                option.textContent = obj.id;  
                selectElement.appendChild(option);
            }
            obj.selectable = true;
        });
    } else {
        console.error('Element not found for ID:', elementId);
    }
}

// Checks that all values in an object are non-empty
function areAllValuesNonEmpty(obj) {
    return Object.values(obj).every(value => value !== "");
}

// Returns a random name
function generateRandomName() {
    const firstNames = ["Alex", "Jordan", "Casey", "Taylor", "Jamie", "Morgan", "Charlie", "Riley", "Sam", "Avery", "Quinn", "Skyler", "Cameron", "Reese", "Peyton", "Dakota", "Drew", "Jesse", "Robin", "Hayden", "Emerson", "Adrian", "Blair", "Shawn", "Frankie", "Andy", "Sage", "Kelly", "Bailey", "Rowan"];

    const randomIndex = Math.floor(Math.random() * firstNames.length);
    return firstNames[randomIndex];
}

// Pick a genotype from an array of possibilities
function getRandomGenotype(genotypeOptions) {
    if (Array.isArray(genotypeOptions)) {
        // If it's an array, pick a random element from the array
        const randomIndex = Math.floor(Math.random() * genotypeOptions.length);
        return genotypeOptions[randomIndex];
    } else {
        // If it's not an array, return the genotype as is
        return genotypeOptions;
    }
}

// Function to assign genotypes for a selected skin color
function assignGenotypesForColor(selectedColorId) {
    const selectedColor = zylarianSkinColors.find(color => color.id === selectedColorId);

    if (selectedColor) {
        const redGenotype = getRandomGenotype(selectedColor.redGenotype);
        const greenGenotype = getRandomGenotype(selectedColor.greenGenotype);
        const blueGenotype = getRandomGenotype(selectedColor.blueGenotype);
        const brownGenotype = getRandomGenotype(selectedColor.brownGenotype);

        return {
            redGenotype,
            greenGenotype,
            blueGenotype,
            brownGenotype
        };
    } else {
        console.error('Selected color not found:', selectedColorId);
        return null;
    }
}

// Function to assign genotypes for a selected skin texture
function assignGenotypesForSkinTexture(selectedTextureId) {
    const selectedTexture = zylarianSkinTextures.find(texture => texture.id === selectedTextureId);

    if (selectedTexture) {
        const skinMoistureGenotype = getRandomGenotype(selectedTexture.skinMoistureGenotype);
        const scaleGenotype = getRandomGenotype(selectedTexture.scaleGenotype);

        return {
            skinMoistureGenotype,
            scaleGenotype,
            feathered: selectedTexture.feathered,
            furry: selectedTexture.furry
        };
    } else {
        console.error('Selected texture not found:', selectedTextureId);
        return null;
    }
}

// Constructor to create each individual Zylarian
function Zylarian(name, skinColor, skinTexture, skinPattern, height, weight, limbType, specialFeatures, dietType) {
    if(name) {
        this.name = name;
    }
    else {
        this.name = generateRandomName();
    }
    this.skinColor = skinColor;
    this.skinTexture = skinTexture;
    this.skinPattern = skinPattern;
    this.height = height;
    this.weight = weight;
    this.limbType = limbType;
    this.specialFeatures = specialFeatures;
    this.dietType = dietType;
}

initializeZylarianMenu(variablesWithOptions);