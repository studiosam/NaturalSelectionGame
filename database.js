const mysql = require("mysql2");
const dotenv = require("dotenv").config();
// Create a connection pool
const pool = mysql
  .createPool({
    host: "localhost",
    port: 3306,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_USER_PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 15, // Adjust based on your requirements
    queueLimit: 0,
  })
  .promise();
// Database functions //

// Gets All Zylarians from Selected User (player arg) //
async function getUserZylarians(player) {
  const userZylarians = await generateSelectQuery(
    "zylarians",
    "ownerId",
    player
  );
  console.log("userZylarians");
  return userZylarians;
}

// Get ALL Zylarians //

async function getAllZylarians() {
  const allZylarians = await getAllRowsFromTable("zylarians");
  console.log(allZylarians);
  return allZylarians;
}

// Creates a Zylarian (zylarianData arg) for Selected User (player arg) //

async function createZylarian(player, zylarianData) {
  zylarianData.ownerId = player;
  zylarianData.id = generateZylarianId();

  generateInsertQuery(zylarianData, "zylarians");
}

// RIPs selected Zylarian (zylarian arg) from Selected User (player arg) //
async function deleteUserZylarian(player, zylarian) {
  const connection = await pool.getConnection();
  const tableName = "zylarians";
  const columnName = "id";
  const columnValue = zylarian;
  try {
    const sql = `DELETE FROM ${mysql.escapeId(
      tableName
    )} WHERE ${mysql.escapeId(columnName)} = ${mysql.escape(columnValue)}`;
    const [result] = await connection.execute(sql);

    console.log(`Deleted ${result.affectedRows} row(s) from ${tableName}`);
    return "RIP";
  } catch (err) {
    console.error(err);
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
}

// List all Users in ZyVille (<--- Stupid Name)//
async function getUsers() {
  let users = getAllRowsFromTable("users");
  return users;
}

// Checks if a user exists on login or signup and if so handles accordingly //
async function checkUsers(user) {
  const currentUsers = [];
  const allUsers = await getAllRowsFromTable("users");
  allUsers.forEach((username, index) => {
    currentUsers.push({
      username: username.username,
      password: username.password,
      id: username.id,
    });
  });
  const findUser = currentUsers.find(
    (usersearch) => usersearch.username === user
  );
  if (findUser) {
    console.log(
      `User ${findUser.username} exists with the password hash ${findUser.password}`
    );
    return { exists: true, passwordHash: findUser.password, id: findUser.id };
  } else {
    return "create";
  }
}

// Create New User //
async function createUser(username, password) {
  userData = {
    username: username,
    password: password,
    id: generateUserId(),
  };
  generateInsertQuery(userData, "users");
  if (userData.id) {
    console.log(`New User ${username} created with ID : ${userData.id}`);
    return "success";
  } else {
    console.log(`ERROR CREATING USER`);
    return "error";
  }
}

async function generateInsertQuery(data, table) {
  const connection = await pool.getConnection();
  const columns = Object.keys(data).join(",");
  const values = Object.values(data)
    .map((value) => {
      if (typeof value === "string") {
        return mysql.escape(value);
      } else if (value instanceof Date) {
        return mysql.escape(value.toISOString().slice(0, 19).replace("T", " "));
      } else if (typeof value === "object") {
        return mysql.escape(JSON.stringify(value));
      } else {
        return value;
      }
    })
    .join(",");

  const sql = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
  try {
    const [result, fields] = await connection.execute(sql);
    console.log(result); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
}

async function generateSelectQuery(tableName, columnName, columnValue) {
  const connection = await pool.getConnection();
  const sqlQuery = `SELECT * FROM ${mysql.escapeId(
    tableName
  )} WHERE ${mysql.escapeId(columnName)} = ${mysql.escape(columnValue)}`;
  try {
    const [rows, fields] = await connection.execute(sqlQuery);

    const parsedRows = rows.map((row) => {
      if (row.genotypes) {
        row.genotypes = JSON.parse(row.genotypes);
      }
      if (row.specialFeatures) {
        row.specialFeatures = JSON.parse(row.specialFeatures);
      }
      return row;
    });

    return parsedRows;
  } catch (err) {
    console.log(err);
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
}
async function getAllRowsFromTable(tableName) {
  const connection = await pool.getConnection();
  try {
    const sql = `SELECT * FROM ${mysql.escapeId(tableName)}`;
    const [rows, fields] = await connection.execute({ sql: sql });
    const parsedRows = rows.map((row) => {
      if (row.genotypes) {
        row.genotypes = JSON.parse(row.genotypes);
      }
      if (row.specialFeatures) {
        row.specialFeatures = JSON.parse(row.specialFeatures);
      }
      return row;
    });

    return parsedRows;
  } catch (err) {
    console.error(err);
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
}
function generateUserId(prefix = "user", length = 8) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let userId = prefix;

  for (let i = 0; i < length - prefix.length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    userId += characters.charAt(randomIndex);
  }

  return userId;
}

function generateZylarianId(prefix = "zy", length = 8) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let userId = prefix;

  for (let i = 0; i < length - prefix.length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    userId += characters.charAt(randomIndex);
  }

  return userId;
}
// To do - Update User Function MAYBE? //
async function updateUsers() {}

module.exports = {
  createZylarian,
  createUser,
  getUsers,
  checkUsers,
  getUserZylarians,
  deleteUserZylarian,
  getAllZylarians,
};
