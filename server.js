// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const database = require("./database.js");

const app = express();
const server = http.Server(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Received data");
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Websocket connection handlers
io.on("connection", async (socket) => {
  const sockets = await io.fetchSockets();
  console.log(`User connected: ${socket.id} | Total: ${sockets.length}`);

  socket.on("logToServer", (msg) => {
    handleClientMessage(msg);
  });

  socket.on("zylarianData", async (data) => {
    await handleZylarianData(data);
  });
});

async function handleClientMessage(msg) {
  switch (msg) {
    case "Test":
      console.log("Test Message received");
      break;
    default:
      console.log(`Message received: ${msg}`);
  }
}

async function handleZylarianData(data) {
  try {
    await database.createZylarian(data);
    await sendZylarianData(data);
  } catch (error) {
    console.error("Error handling Zylarian data:", error);
  }
}

async function sendZylarianData(data) {
  try {
    await io.emit("ZylarianData", data);
  } catch (error) {
    console.error("Error sending Zylarian data:", error);
  }
}
