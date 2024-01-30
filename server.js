const express = require("express");
var app = express();
var server = require("http").Server(app);
var cors = require("cors");
const bcrypt = require("bcryptjs");
var cron = require("node-cron");
const crypto = require("crypto");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;

const {
  createZylarian,
  createUser,
  getUsers,
  checkUsers,
  getUserZylarians,
  deleteUserZylarian,
  getAllZylarians,
  generateUpdateQuery,
} = require("./database.js");

global.io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// Check For Existing User Endpoint //

app.post("/", async function (req, res) {
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

// Create User Endpoint //

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

// Get User Data Endpoint //

app.get("/userData", async function (req, res) {
  const userId = req.query.userId;
  const currentUserZylarians = await getUserZylarians(userId);
  res.send({ body: currentUserZylarians });
});

// Get All Zylarians in Existence Endpoint //

app.get("/allZylarians", async function (req, res) {
  const allZylarians = await getAllZylarians();

  res.send({ body: allZylarians });
});

// Delete Zylarian Endpoint //

app.get("/deleteZylarian", async function (req, res) {
  console.log(req.query.userId, req.query.Id);
  const userId = req.query.userId;
  const zyForDeletion = req.query.Id;
  const deleteThatBoi = await deleteUserZylarian(userId, zyForDeletion);

  res.send({ body: "RIP" });
});

// Create Zylarian Endpoint //

app.post("/createZylarian", async function (req, res) {
  const zylarianData = await req.body;
  //console.log(zylarianData);

  await createZylarian(zylarianData.ownerId, zylarianData);
  const currentUserZylarians = await getUserZylarians(zylarianData.ownerId);

  res.send({ body: currentUserZylarians.length });
});

app.post("/generateSignature", function (req, res) {
  const { dataToSign } = req.body;

  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(JSON.stringify(dataToSign));
  const signature = hmac.digest("hex");

  res.json({ signature });
});
app.post("/processPointsData", async function (req, res) {
  const { pointsData, signature } = req.body;

  // Verify the signature
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(JSON.stringify(pointsData));

  const calculatedSignature = hmac.digest("hex");

  if (calculatedSignature !== signature) {
    return res.status(403).json({ error: "Invalid signature" });
  }

  // Signature is valid, proceed with further processing (e.g., updating the database)

  for (let i = 0; i < pointsData.zylarianIds.length; i++) {
    const zylarianId = pointsData.zylarianIds[i];
    const earnedPoints = pointsData.earnedPoints[i];
    console.log(zylarianId);
    console.log(earnedPoints);
    await generateUpdateQuery(
      "zylarians",
      "currentXp",
      earnedPoints,
      "id",
      zylarianId
    );
  }

  return res.status(200).json({ success: true });
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

// Password Hashing Functions //

async function hashPassword(username, plaintextPassword) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plaintextPassword, saltRounds);
  console.log("password hashing");
  return createUser(username, hash);
}

async function verifyPassword(plaintextPassword, storedHash) {
  return await bcrypt.compare(plaintextPassword, storedHash);
}

// CRON JOBS //
// cron.schedule("*/5 * * * * *", () => {
//   ;
// });
