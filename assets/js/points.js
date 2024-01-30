// Show Zylarian Creation Alert //
const pointsForm = document.querySelector("#pointsForm");
async function sendPoints(pointsData) {
  fetch(`http://localhost:3000/generateSignature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dataToSign: pointsData }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Data now contains the signature generated on the server
      const { signature } = data;

      const requestData = {
        pointsData,
        signature,
      };
      // Now send both the original pointsData and the signature to another endpoint on the server for further processing
      sendToServer(requestData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function sendToServer(requestData) {
  // Make a POST request to another endpoint on the server with the requestData
  fetch(`${serverAddress}processPointsData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Process the response from the server, if needed
      console.log("Server response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function addXpFromMating(zylarian1, zylarian2) {
  const pointsData = {
    zylarianIds: [`${zylarian1.id}`, `${zylarian2.id}`],
    earnedPoints: [`${zylarian1.currentXp + 5}`, `${zylarian2.currentXp + 5}`],
  };
  await sendPoints(pointsData);
}
