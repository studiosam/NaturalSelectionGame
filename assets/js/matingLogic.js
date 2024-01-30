/* Mating Logic */

async function mateStatus() {
  try {
    const mateForm = document.getElementById("mateForm");
    const zylarian1FromStorage = JSON.parse(localStorage.getItem("zylarian1"));
    const zylarian2FromStorage = JSON.parse(localStorage.getItem("zylarian2"));
    const newZylarian = createZylarianByMating(
      zylarian1FromStorage,
      zylarian2FromStorage
    );
    console.log(zylarian1FromStorage);
    console.log(zylarian2FromStorage);
    localStorage.removeItem("zylarian2");
    newZylarian.ownerId = localStorage.getItem("id");
    newZylarian.owner = localStorage.getItem("username");
    sendZylarianData(newZylarian);
    mateForm.reset();
    return { status: true, child: newZylarian };
  } catch (error) {
    return "Failed";
  }
}
// Create a zylarian using mating logic
function createZylarianByMating(zylarian1, zylarian2) {
  let offspring = {};
  console.log("Mating conditions check");
  if (matingSuccess(zylarian1, zylarian2)) {
    console.log("Generating new zylarian traits");

    let offspringHeight = heightWeightMating(
      zylarian1.height,
      zylarian2.height
    );
    let offspringWeight = heightWeightMating(
      zylarian1.weight,
      zylarian2.weight
    );
    let offspringActivity = traitOneOrTraitTwoMating(
      zylarian1.activity,
      zylarian2.activity
    );
    let offspringLimbType = limbTypeMating(
      zylarian1.limbType,
      zylarian2.limbType
    );
    let offspringSpecialFeatures = inheritSpecialFeatures(
      zylarian1.specialFeatures,
      zylarian2.specialFeatures
    );
    let offspringDietType = traitOneOrTraitTwoMating(
      zylarian1.dietType,
      zylarian2.dietType
    );

    let offspringColorGenotypes = getGenotypes(
      zylarian1.genotypes.color,
      zylarian2.genotypes.color
    );

    let offspringTextureGenotypes = getGenotypes(
      zylarian1.genotypes.texture,
      zylarian2.genotypes.texture
    );

    let offspringGenotypes = {
      color: offspringColorGenotypes,
      texture: offspringTextureGenotypes,
    };

    offspring = new mateZylarian(
      generateRandomName(),
      offspringHeight,
      offspringWeight,
      offspringActivity,
      offspringLimbType,
      offspringSpecialFeatures,
      offspringDietType,
      offspringGenotypes
    );

    // Process genotypes to traits
  }
  if (Object.keys(offspring).length > 0) {
    console.log("OFFSPRING");
    return offspring;
  } else {
    console.log("No offspring");
  }
}

// Check for mating success
async function matingSuccess(zylarian1, zylarian2) {
  let mateActivityCheck = activityMatingSuccess(
    zylarian1.activity,
    zylarian2.activity
  );
  let mateSizeCheck = sizeMatingSuccess(
    zylarian1.height,
    zylarian2.height,
    zylarian1.weight,
    zylarian2.weight,
    ALPHA_H,
    ALPHA_W
  );
  return mateActivityCheck && mateSizeCheck;
}

// Returns whether or not mating is successful as true or false. Meant to simulate whether or not the organisms were able to come in contact with each other due to activity cycles
function activityMatingSuccess(activity1, activity2) {
  console.log("Checking activity period");
  let r = Math.random();
  if (activity1 == activity2) {
    console.log("Awake at the same time");
    console.log(r > 0.2);
    return r > 0.2;
  } else {
    console.log("Not awake at the same time");
    console.log(r > 0.9);
    return r > 0.9;
  }
}

// Returns a bool for reproductive success  based on height and weight.
function sizeMatingSuccess(height1, height2, weight1, weight2) {
  console.log("Checking size compatibility");

  let avgHeight = (height1 + height2) / 2;
  let avgWeight = (weight1 + weight2) / 2;

  let heightDifference = Math.abs(height1 - height2) / avgHeight;
  let weightDifference = Math.abs(weight1 - weight2) / avgWeight;

  return (
    Math.exp(-(ALPHA_H * heightDifference + ALPHA_W * weightDifference)) > 0.5
  );
}

// Height and weight mating algorithm returns a random number between the max and min height of the zylarians
function heightWeightMating(measurement1, measurement2) {
  console.log("Generating height and weight");
  let r = Math.random();
  let max = Math.max(measurement1, measurement2) + measurement1 * 0.1;
  let min = Math.min(measurement1, measurement2) - measurement2 * 0.1;
  return Math.floor(r * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

// Pick one of two traits
function traitOneOrTraitTwoMating(trait1, trait2) {
  console.log("Generating skin texture");
  if (trait1 == trait2) {
    return trait1;
  } else {
    if (getRandomBoolean(0.5)) {
      return trait1;
    } else {
      return trait2;
    }
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

// Returns an array of special features that are inherited from each parent, but more likely from parent1
function inheritSpecialFeatures(parent1FeaturesObj, parent2FeaturesObj) {
  console.log("Generating special features");
  const offspringFeatures = [];
  const parent1Features = [];
  const parent2Features = [];
  const inheritanceProbability = {
    parent1: 0.75,
    parent2: 0.25,
  };
  let parse1 = JSON.parse(parent1FeaturesObj);
  let parse2 = JSON.parse(parent2FeaturesObj);

  Object.keys(parse1).forEach((feature) => {
    parent1Features.push(parse1[feature]);
  });
  Object.keys(parse2).forEach((feature) => {
    parent2Features.push(parse2[feature]);
  });

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

//////// HEY IT"S HERE AND FIXED MAYBE????//////////////////
function getGenotypes(zylarian1, zylarian2) {
  let newGenotypesObject = {};
  for (const entry of Object.entries(zylarian1)) {
    for (const entry2 of Object.entries(zylarian2)) {
      if (entry[0] === entry2[0]) {
        // console.log(entry[1].split(""), entry2[1].split(""));
        let newGenotypes = generateOffspringGenotype(
          entry[1].split(""),
          entry2[1].split("")
        );
        newGenotypesObject[entry[0]] = newGenotypes;
      }
    }
  }
  //   console.log(newGenotypesObject);
  return newGenotypesObject;
}

// Punnett square function
function generateOffspringGenotype(genotype1, genotype2) {
  let zylarian1Allele1 = genotype1[0];
  let zylarian1Allele2 = genotype1[1];
  let zylarian2Allele1 = genotype2[0];
  let zylarian2Allele2 = genotype2[1];
  console.log("Generating genotype");
  // Randomly select one allele from each zylarian
  const offspringAllele1 =
    Math.random() < 0.5 ? zylarian1Allele1 : zylarian1Allele2;
  const offspringAllele2 =
    Math.random() < 0.5 ? zylarian2Allele1 : zylarian2Allele2;

  let newGenotypeArray = [offspringAllele1, offspringAllele2].sort();
  //   console.log(newGenotypeArray.join());
  return newGenotypeArray.join("");
}
