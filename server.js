const express = require("express");
var app = express();
var server = require("http").Server(app);
require("dotenv").config();

global.io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// Websocket Server Connection Handlers //
io.on("connection", async (socket) => {
  const sockets = await io.fetchSockets();
  console.log(
    `User Connected! ID : ${socket.id} | Total Connected Users ${sockets.length}`
  );
  // Handle Client Messages //
  socket.on("logToServer", (msg) => {
    switch (msg) {
      case "Test":
        console.log("Test Message");
        break;

      default:
        console.log(msg);
    }
  });

  // Receive Zylarian Data From Client To Send To Back To All //
  socket.on("zylarianData", (data) => {
    sendZylarianData(data);
  });
});

// Send Data to Client //

async function logToClient(msg) {
  await io.emit("log", msg);
}

async function sendZylarianData(data) {
  await io.emit("ZylarianData", data);
}