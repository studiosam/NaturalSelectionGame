// Zylarian Game Logic

// Get data from local storage

/*
Utility Functions
*/

// Returns zylarian object from a name
// Returns a random name

/*
Mating Logic
*/

// Sets the attributes of the current mate and returns a mating pair of objects as an array

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
