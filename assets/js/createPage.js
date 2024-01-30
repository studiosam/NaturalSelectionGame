// Show Zylarian Creation Alert //
const createZylarianForm = document.querySelector("#zylarianForm");
createZylarianForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const isCreated = await createZylarianFromForm();

  if (isCreated) {
    let createAlert = document.querySelector(".create-alert");
    $("#alertBox").fadeIn();
    await sendZylarianData(isCreated);
    createAlert.innerHTML = `Zylarian <span class="currentUser">${isCreated.name}</span> has been created!`;
    await createZylarianForm.reset();
    setTimeout(() => {
      createAlert.innerHTML = "";

      $("#alertBox").fadeOut();
    }, 1500);
  } else {
    createAlert.innerHTML = "Error Creating Zylarian";
    setTimeout(() => {
      createAlert.innerHTML = "";
    }, 1500);
  }
});
