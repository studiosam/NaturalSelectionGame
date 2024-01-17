// Arrays of objects with names and beneficial environments
const zylarianSkinColors = [
    {
        color: "Green",
        beneficialEnvironment: ["Verdant Canopy Island"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"]
    },
    {
        color: "Sandy Brown",
        beneficialEnvironment: ["Arid Dunes Oasis"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Frostvale Glacier"]
    },
    {
        color: "Beige",
        beneficialEnvironment: ["Arid Dunes Oasis"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Frostvale Glacier"]
    },
    {
        color: "White",
        beneficialEnvironment: ["Frostvale Glacier"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Arid Dunes Oasis"]
    },
    {
        color: "Light Blue",
        beneficialEnvironment: ["Frostvale Glacier"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Peaktop Highlands"]
    },
    {
        color: "Dark Brown",
        beneficialEnvironment: ["Peaktop Highlands", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"]
    },
    {
        color: "Black",
        beneficialEnvironment: ["Peaktop Highlands", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Savannah Plains Sanctuary"]
    },
    {
        color: "Red",
        beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"]
    },
    {
        color: "Yellow",
        beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Peaktop Highlands", "Frostvale Glacier"]
    },
    {
        color: "Blue",
        beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"]
    },
    {
        color: "Gray",
        beneficialEnvironment: ["Peaktop Highlands"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"]
    },
    {
        color: "Aquatic Blue",
        beneficialEnvironment: ["Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"]
    },
    {
        color: "Aquatic Green",
        beneficialEnvironment: ["Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"]
    }
];

const zylarianSkinTextures = [
    {
        texture: "Scaly",
        beneficialEnvironment: ["Arid Dunes Oasis", "Peaktop Highlands"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Frostvale Glacier"]
    },
    {
        texture: "Smooth",
        beneficialEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"]
    },
    {
        texture: "Furry",
        beneficialEnvironment: ["Frostvale Glacier", "Savannah Plains Sanctuary"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Greenwood Falls Isle"]
    },
    {
        texture: "Leathery",
        beneficialEnvironment: ["Peaktop Highlands", "Arid Dunes Oasis"],
        detrimentalEnvironment: ["Verdant Canopy Island", "Greenwood Falls Isle"]
    },
    {
        texture: "Feathered",
        beneficialEnvironment: ["Savannah Plains Sanctuary", "Greenwood Falls Isle"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Frostvale Glacier"]
    },
    {
        texture: "Slimy",
        beneficialEnvironment: ["Greenwood Falls Isle", "Verdant Canopy Island"],
        detrimentalEnvironment: ["Arid Dunes Oasis", "Peaktop Highlands"]
    }
];

const zylarianSkinPatterns = [
    {
        pattern: "Striped",
        beneficialEnvironment: ['Savannah Plains Sanctuary', 'Greenwood Falls Isle'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Peaktop Highlands']
    },
    {
        pattern: "Spotted",
        beneficialEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle'],
        detrimentalEnvironment: ['Frostvale Glacier', 'Arid Dunes Oasis']
    },
    {
        pattern: "Solid",
        beneficialEnvironment: ['Peaktop Highlands', 'Frostvale Glacier'],
        detrimentalEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle']
    },
    {
        pattern: "Iridescent",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Frostvale Glacier'],
        detrimentalEnvironment: ['Savannah Plains Sanctuary', 'Peaktop Highlands']
    }
];

const zylarianLimbTypes = [
    {
        limbType: "Four-legged",
        beneficialEnvironment: ['Savannah Plains Sanctuary', 'Peaktop Highlands'],
        detrimentalEnvironment: ['Greenwood Falls Isle', 'Frostvale Glacier']
    },
    {
        limbType: "Two-legged",
        beneficialEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Savannah Plains Sanctuary']
    },
    {
        limbType: "Webbed Feet",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Verdant Canopy Island'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Peaktop Highlands']
    },
    {
        limbType: "Winged",
        beneficialEnvironment: ['Frostvale Glacier', 'Verdant Canopy Island'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Savannah Plains Sanctuary']
    }
];

const zylarianSpecialFeatures = [
    {
        specialFeature: "Night Vision",
        beneficialEnvironment: ['Peaktop Highlands', 'Greenwood Falls Isle'],
    },
    {
        specialFeature: "Amphibious",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Verdant Canopy Island'],
    },
    {
        specialFeature: "Enhanced Hearing",
        beneficialEnvironment: ['Savannah Plains Sanctuary', 'Frostvale Glacier'],
    },
    {
        specialFeature: "Fast Regeneration",
        beneficialEnvironment: ['Peaktop Highlands', 'Frostvale Glacier'],
    },
    {
        specialFeature: "Toxic Secretion",
        beneficialEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle'],
    }
];

const zylarianDietTypes = [
    {
        dietType: "Herbivore",
        beneficialEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Peaktop Highlands']
    },
    {
        dietType: "Carnivore",
        beneficialEnvironment: ['Savannah Plains Sanctuary', 'Peaktop Highlands'],
        detrimentalEnvironment: ['Greenwood Falls Isle', 'Frostvale Glacier']
    },
    {
        dietType: "Omnivore",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Savannah Plains Sanctuary'],
        detrimentalEnvironment: ['Frostvale Glacier', 'Arid Dunes Oasis']
    },
    {
        dietType: "Insectivore",
        beneficialEnvironment: ['Verdant Canopy Island', 'Peaktop Highlands'],
        detrimentalEnvironment: ['Frostvale Glacier', 'Arid Dunes Oasis']
    },
    {
        dietType: "Piscivore",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Frostvale Glacier'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Peaktop Highlands']
    },
    {
        dietType: "Nectarivore",
        beneficialEnvironment: ['Greenwood Falls Isle', 'Verdant Canopy Island'],
        detrimentalEnvironment: ['Arid Dunes Oasis', 'Savannah Plains Sanctuary']
    }
];

/* DEACTIVATED Egg-Bearing or Live-Birth Array

const zylarianTypesOfReproduction = [ 
    {0: "Oviparous"},
    {1: "Viviparous"}
]; 

*/

// populates color dropdown menu with all items in the skinColor Array
function populateOptions(id) {
    const selectElement = document.getElementById(id);

    zylarianSkinColors.forEach(colorObj => {
        const option = document.createElement('option');
        option.value = colorObj.color;
        option.textContent = colorObj.color;
        selectElement.appendChild(option);
    });
}
populateOptions("skinColor");
populateOptions("skinTexture");
populateOptions("skinPattern");
populateOptions("limbType");
populateOptions("specialFeatures");
populateOptions("dietType");

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

// Initialize empty array of Zylarians controlled by the player
let population = [];

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

    
    population.push(newZylarian); // Add new zylarian to the player's population
    console.log(population); // for debugging purposes
    updateZylarianList(); // Update the list to include the new Zylarian
    alert("New Zylarian created!"); // feedback to the user

    // Hide the creation form and show the Zylarians list
    document.getElementById('zylarianCreationFormPage').style.display = 'none';
    document.getElementById('zylariansControlledByPlayerPage').style.display = 'block';
}

// Clears the existing zylarian list to start fresh each time
function updateZylarianList() {
    const listContainer = document.getElementById('zylariansControlledByPlayerListContainer');
    listContainer.innerHTML = ''; // Clear existing list

    // Creates a list item for each zylarian in the array
    population.forEach((zylarian, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Zylarian ${index + 1}:</strong> ${zylarian.name}<br>
            Color: ${zylarian.skinColor}, Texture: ${zylarian.skinTexture}, Pattern: ${zylarian.skinPattern}<br>
            Height: ${zylarian.height} cm, Weight: ${zylarian.weight} g<br>
            Limb Type: ${zylarian.limbType}, Special Feature: ${zylarian.specialFeatures}, Diet: ${zylarian.dietType}
        `;
        listContainer.appendChild(listItem);
    });
}

// Returns a random name
function generateRandomName() {
    const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George", "Hannah", "Ivan", "Julia"];

    const randomIndex = Math.floor(Math.random() * firstNames.length);
    return firstNames[randomIndex];
}
