const express = require("express");
var app = express();
var server = require("http").Server(app);
var cors = require("cors");

require("dotenv").config();
const {
  createZylarian,
  createUser,
  getUsers,
  getZylarians,
  getMyZylarians,
} = require("./database.js");

global.io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  console.log(req.body);
  createUser(req.body.username, req.body.password);
});

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
  socket.on("zylarianData", async (data) => {
    await createZylarian(data);
    await sendZylarianData(data);
  });
});

// Send Data to Client //

async function logToClient(msg) {
  await io.emit("log", msg);
}

async function sendZylarianData(data) {
  await io.emit("ZylarianData", data);
}
