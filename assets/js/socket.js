// Connect client to Server Websocket //

const socket = io("http://127.0.0.1:3000"); // Connect to the server immediately when the page loads

// Log to console when connected //
socket.on("connect", function () {
  console.log(`Connected to the server as ID: ${socket.id}`);
});

// Receive Messages From Server //
socket.on("log", async function (msg) {
  switch (msg) {
    case "Test":
      console.log("Test Message");
      break;
  }
});

// Receive Zylarian Data Back From Server //
socket.on("ZylarianData", async function (data) {
  console.log("SUCCESS!!!!!", data);
});
// Send Messages To Server //
async function logToServer(msg) {
  socket.emit("logToServer", msg);
}

async function sendZylarianData(data) {
  socket.emit("zylarianData", data);
}
