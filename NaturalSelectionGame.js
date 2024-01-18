// Zylarian Game Logic

/*
Initializing global variables
*/
    let population = []; // Array of zylarians controlled by the player
    let initialZylarian = {}; //Object to hold the initial zylarian for the entire game
    let currentMate = {}; // Object to hold the current mating partner
    let generation = 0; // Keeping track of generations

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
            id: "Solid",
            beneficialEnvironment: ['Peaktop Highlands', 'Frostvale Glacier'],
            detrimentalEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle'],
        },
        {
            id: "Striped",
            beneficialEnvironment: ['Savannah Plains Sanctuary', 'Greenwood Falls Isle'],
            detrimentalEnvironment: ['Arid Dunes Oasis', 'Peaktop Highlands'],
            selectable: false
        },
        {
            id: "Spotted",
            beneficialEnvironment: ['Verdant Canopy Island', 'Greenwood Falls Isle'],
            detrimentalEnvironment: ['Frostvale Glacier', 'Arid Dunes Oasis'],
            selectable: false
        },
        {
            id: "Iridescent",
            beneficialEnvironment: ['Greenwood Falls Isle', 'Frostvale Glacier'],
            detrimentalEnvironment: ['Savannah Plains Sanctuary', 'Peaktop Highlands'],
            selectable: false
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
        },
        {
            id: "Poisonous",
            beneficialEnvironment: [],
            detrimentalEnvironment: []
        },
        {
            id: "Venomous",
            beneficialEnvironment: [],
            detrimentalEnvironment: []
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

/*
Arrays of traits with multiple type options. -- Used for populating dropdown menus. Probably could be optimized
*/

    const variablesWithOptions = [
        "skinColor", 
        "skinTexture", 
        "skinPattern", 
        "limbType", 
        "specialFeatures", 
        "dietType" 
    ];
    const mateVariablesWithOptions = [
        "mateSkinColor", 
        "mateSkinTexture", 
        "mateSkinPattern", 
        "mateLimbType", 
        "mateSpecialFeatures", 
        "mateDietType" 
    ];

/* 
Data Model and constructor for each zylarian 
*/

    class Zylarian {
        constructor(name, height, weight, skinColor, skinTexture, skinPattern, limbType, specialFeatures, dietType, isInitial = false) {
            this.name = name || generateRandomName();
            this.height = height;
            this.weight = weight;
            this.skinColor = skinColor;
            this.skinTexture = skinTexture;
            this.skinPattern = skinPattern;
            this.limbType = limbType;
            this.specialFeatures = specialFeatures;
            this.dietType = dietType;
            
            // Generate genotypes only for the initial Zylarian
            if (isInitial) {
                this.colorGenotypes = assignGenotypesForColor(skinColor);
                this.skinTextureGenotypes = assignGenotypesForSkinTexture(skinTexture);
                this.extractAndStoreAlleles();
            }
        }

        extractAndStoreAlleles() {
            // Function to split a genotype into alleles
            const splitGenotype = (genotype) => {
                return genotype.split('');
            };

            // Store alleles
            this.alleles = {
                redAlleles: splitGenotype(this.colorGenotypes.redGenotype),
                greenAlleles: splitGenotype(this.colorGenotypes.greenGenotype),
                blueAlleles: splitGenotype(this.colorGenotypes.blueGenotype),
                brownAlleles: splitGenotype(this.colorGenotypes.brownGenotype),
                skinMoistureAlleles: splitGenotype(this.skinTextureGenotypes.skinMoistureGenotype),
                scaleAlleles: splitGenotype(this.skinTextureGenotypes.scaleGenotype)
            }
        };
    
        
        /* DOCUMENTATION *
        Example usage:
        Creating the initial Zylarian with genotypes
        let initialZylarian = new Zylarian("Zylo", "Green", "Scaly", "Striped", 150, 500, "Quadripedal", "Night Vision", "Carnivore", true);
        Creating a Zylarian through mating (genotypes will be handled in the mating logic)
        let childZylarian = new Zylarian("Zylina", "Green", "Scaly", "Striped", 140, 450, "Quadripedal", "Night Vision", "Carnivore");
        */
        
    }
       
/*
Creating new zylarians
*/

    // Create initial zylarian from user form and add it to the array of zylarians that the player controls
    function createInitialZylarian() {
        const MIN_HEIGHT = 50;
        const MAX_HEIGHT = 300;
        const MIN_WEIGHT = 75;
        const MAX_WEIGHT = 10000;
        const form = document.getElementById('zylarianForm');
    
        // Extract values with correct types
        const height = parseInt(form.height.value, 10);
        const weight = parseInt(form.weight.value, 10);
    
        // Check if values are within the allowed range
        if (height < MIN_HEIGHT || height > MAX_HEIGHT || weight < MIN_WEIGHT || weight > MAX_WEIGHT) {
            alert("Please select a valid height and weight for the Zylarian.");
            return null;
        }
    
        // Create the initial Zylarian with correct argument order
        const initialZylarian = new Zylarian(
            form.name.value,
            height, // Correct position for height
            weight, // Correct position for weight
            form.skinColor.value,
            form.skinTexture.value,
            form.skinPattern.value,
            form.limbType.value,
            form.specialFeatures.value,
            form.dietType.value,
            true // isInitial is set to true
        );

        // Make sure each variable has a valid value
        if(!areAllValuesNonEmpty(initialZylarian) || height < MIN_HEIGHT || height > MAX_HEIGHT || weight < MIN_WEIGHT || weight > MAX_WEIGHT) {
            alert("Please select a valid value for each option");
            return;
        }
        return initialZylarian;
    }

    // Create a zylarian using mating logic -- EMPTY
    function createZylarianByMating(zylarian1, zylarian2) {

    }

    /*
    Utility Functions
    */
   
   // Returns a random name
   function generateRandomName() {
       const names = [
           "Aiden", "Alex", "Andy", "Ari", "Ash", "Aspen", "Aubrey", "August", "Avery", "Bailey", "Blair", "Blake", "Brett", "Brook", "Caelan", "Cameron", "Campbell", "Carson", "Casey", "Charlie", "Chris", "Cory", "Dakota", "Dallas", "Dana", "Darcy", "Devin", "Drew", "Eddie", "Eli", "Elliott", "Emerson", "Emery", "Finley", "Frances", "Frankie", "Gabriel", "Glenn", "Gray", "Hadley", "Harley", "Harper", "Hayden", "Hunter", "Indigo", "Jamie", "Jayden", "Jesse", "Jordan", "Jules", "Julian", "Kai", "Karter", "Kelly", "Kendall", "Kennedy", "Lane", "Leighton", "Leslie", "Logan", "London", "Madison", "Marley", "Mason", "Max", "Mckenzie", "Micah", "Morgan", "Nico", "Noel", "Oakley", "Parker", "Pat", "Payton", "Phoenix", "Quinn", "Reagan", "Reed", "Reese", "Remy", "Riley", "River", "Robin", "Rory", "Rowan", "Ryan", "Sage", "Sam", "Sawyer", "Shawn", "Shay", "Sidney", "Skyler", "Spencer", "Stevie", "Sydney", "Taylor", "Terry", "Toni", "Trace", "Tristan", "Tyler", "Val", "Wesley", "Winter", "Zion", "Adrian", "Ainsley", "Ali", "Angel", "Armani", "Asa", "Austen", "Beau", "Beckett", "Billie", "Bobbie", "Brady", "Briar", "Brooklyn", "Caden", "Cameron", "Campbell", "Casey", "Charlie", "Corey", "Dakota", "Dallas", "Darian", "Dylan", "Eden", "Elliot", "Ellis", "Emery", "Emory", "Erin", "Evan", "Frances", "Frankie", "Gael", "Gray", "Harlow", "Hayden", "Henley", "Hunter", "Indiana", "Ira", "Jaden", "Jael", "Jagger", "James", "Jamie", "Jay", "Jaylen", "Jean", "Jessie", "Jordan", "Jules", "Kai", "Kamryn", "Keegan", "Keiran", "Kendall", "Kennedy", "Kieran", "Kit", "Kody", "Kylin", "Laine", "Landry", "Lane", "Leighton", "Lennox", "Leslie", "Linden", "London", "Mackenzie", "Marley", "Max", "Maxwell", "Merritt", "Micah", "Mika", "Milan", "Morgan", "Nicky", "Noa", "Oakley", "Ocean", "Parker", "Payton", "Peyton", "Phoenix", "Piper", "Presley", "Quincy", "Quinn", "Rae", "Ray", "Reagan", "Reed", "Reese", "Remy", "Riley", "Rio", "River", "Robin", "Rory", "Rowan", "Ryan", "Sage", "Sam", "Sasha", "Sawyer", "Shae", "Shane", "Shawn", "Shiloh", "Sky", "Skyler", "Sloan", "Spencer", "Stevie", "Sydney", "Tatum", "Taylor", "Teagan", "Terry", "Toby", "Tony", "Tracy", "Val", "Wesley", "Wren", "Zephyr", "Addison", "Adley", "Afton", "Ainsley", "Alex", "Alfie", "Amari", "Angel", "Ari", "Ariel", "Arlo", "Armani", "Asa", "Ashton", "Aubrey", "August", "Austen", "Avery", "Bailey", "Beau", "Beckett", "Bellamy", "Bennett", "Bentley", "Billie", "Blaine", "Blair", "Blake", "Blaze", "Bobbie"
        ];
        
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    }
    
    // Checks that all values in an object are non-empty
    function areAllValuesNonEmpty(obj) {
        return Object.values(obj).every(value => value !== "");
    }
    
    // Add zylarian to population and update zylarian list
    function handleZylarianCreation(zylarianObj) {
        // Add zylarian to player's population
        population.push(zylarianObj);
        // Update the list to include the new Zylarian
        updateZylarianList();  
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

/*
Mating Logic
*/

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

    // Height mating algorithm returns a random number between the max and min height of the parents
    function heightWeightMating(measurement1, measurement2) {
        let max = Math.max(measurement1, measurement2) + measurement1*.1;
            let min = Math.min(measurement1, measurement2) - measurement2*.1;
            return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
    }
    
    // Skin Texture mating algorithm returns a skin texture as a string. Meant to represent linked genes, as each initial zylarian's color genetics and skin texture genetics will be linked together.
    
    //Skin Pattern mating algorithm returns a skin pattern as a string. Meant to represent co-dominance when more than 1 dominant allele is present.

    // Limb type mating algorithm returns an array of limb types. Meant to introduce centaur like body types as a mutation when types differ
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
    
/*
Handling button submit forms
*/
   
   // Handling initial zylarian form submit
   // Handling mating form submit
   // Handling next month form submit
   
/*
UI Manipulation
*/
  
    // Update screen on clicks
    function updateScreen() {
        // Hide the creation form and show the Zylarians list
        document.getElementById('zylarianCreationFormPage').style.display = 'none';
        document.getElementById('zylariansControlledByPlayerPage').style.display = 'block';
        
        // Populate the mate form dropdowns
        initializeZylarianMenu(mateVariablesWithOptions);
    }

    // Clears the existing zylarian list to start fresh each time and creates a list item for each player zylarian
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

/*
GAME LOGIC
*/

initializeZylarianMenu(variablesWithOptions);