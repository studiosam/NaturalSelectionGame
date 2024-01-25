const createZylarianForm = document.querySelector("#zylarianForm");
createZylarianForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  createZylarianForm.reset();
  const isCreated = await handleInitialZylarian();
  if (isCreated) {
    let createAlert = document.querySelector(".create-alert");
    createAlert.innerHTML = `Zylarian <span class="currentUser">${initialZylarian.name}</span> has been created!`;

    setTimeout(() => {
      createAlert.innerHTML = "";
    }, 3000);
  } else {
    createAlert.innerHTML = "Error Creating Zylarian";
    setTimeout(() => {
      createAlert.innerHTML = "";
    }, 3000);
  }
});
