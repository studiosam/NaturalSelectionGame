const express = require("express");
var app = express();
var server = require("http").Server(app);
var cors = require("cors");
const bcrypt = require("bcrypt");

require("dotenv").config();
const {
  createZylarian,
  createUser,
  getUsers,
  getZylarians,
  getMyZylarians,
  checkUsers,
  getUserZylarians,
} = require("./database.js");

global.io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/", async function (req, res) {
  console.log(req.body);
  const checkForUser = await checkUsers(req.body.username);
  console.log("Check for User = " + checkForUser);
  if (checkForUser.exists === true) {
    const isValid = await verifyPassword(
      req.body.password,
      checkForUser.passwordHash
    );
    console.log(isValid);
    if (isValid) {
      res.send({
        body: "success",
        user: req.body.username,
        id: checkForUser.id,
      });
    } else {
      res.send({ body: "error", type: "invalid_password" });
    }
  } else if (checkForUser === "create") {
    res.send({ body: "new", user: req.body.username });
  }
});

app.post("/create", async function (req, res) {
  const checkForUser = await checkUsers(req.body.username);
  console.log("Check for User = " + checkForUser);
  if (checkForUser.exists === true) {
    console.log("User Already Exists");
    res.send({ body: "userexists", user: req.body.username });
    return;
  } else {
    console.log(`Creating New User ${req.body.username}`);
    const createCheck = await hashPassword(
      req.body.username,
      req.body.password
    );
    if (createCheck === "success") {
      console.log(`New User Created!`);
      res.send({ body: "success", user: req.body.username });
    } else if (createCheck === "error") {
      res.send({ body: "error" });
    }
  }
});

app.get("/userData", async function (req, res) {
  const userId = req.query.userId;
  const currentUserZylarians = await getUserZylarians(userId);
  res.send({ body: currentUserZylarians });
});

app.post("/createZylarian", async function (req, res) {
  const zylarianData = await req.body;
  console.log(zylarianData);

  await createZylarian(zylarianData.ownerId, zylarianData);
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

async function hashPassword(username, plaintextPassword) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plaintextPassword, saltRounds);
  return createUser(username, hash);
}

async function verifyPassword(plaintextPassword, storedHash) {
  return await bcrypt.compare(plaintextPassword, storedHash);
}
