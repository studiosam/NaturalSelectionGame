// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  deleteDoc,
} = require("firebase/firestore");

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBWnEdVuXkK0yq6hS7mXMFriJjpCtz8bTQ",
  authDomain: "zylarians.firebaseapp.com",
  projectId: "zylarians",
  storageBucket: "zylarians.appspot.com",
  messagingSenderId: "750453172060",
  appId: "1:750453172060:web:6f778b66d00ec9a93c0399",
  measurementId: "G-N00C9PVNLP",
});

// Define Database Variables //
const db = getFirestore();
const usersCollection = collection(db, "users");
const zylariansCollection = collection(db, "zylarians");

// Database functions //

// Gets All Zylarians from Selected User (player arg) //
async function getUserZylarians(player) {
  const userZylarians = [];
  const userRef = collection(db, `users/${player}/zylarians`);
  const zys = await getDocs(userRef);
  zys.docs.forEach((zylarian, index) => {
    userZylarians.push({ ...zylarian.data(), id: zylarian.id });
    userZylarians[index].zylarianData.id = zylarian.id;
  });
  return userZylarians;
}

// Get ALL Zylarians //

async function getAllZylarians() {
  try {
    const allUsers = await getUsers();

    // Use map to create an array of promises for user ids
    const userPromises = allUsers.map(async (user) => user.id);

    // Wait for all userPromises to complete and get user ids
    const userIds = await Promise.all(userPromises);

    // Use map to create an array of promises for zylarians
    const zylarianPromises = userIds.map(async (userId) => {
      let zylarians = await getUserZylarians(userId);
      return zylarians;
    });

    // Wait for all zylarianPromises to complete and get zylarians
    const allZylarians = await Promise.all(zylarianPromises);
    console.log(allZylarians[0][0]);
    // Flatten the nested array and get an array of zylarianData objects
    const flattenedZylarians = allZylarians
      .flat()
      .map((zylarian) => zylarian.zylarianData);
    console.log(flattenedZylarians[0]);
    return flattenedZylarians;
  } catch (error) {
    console.error("Error in getAllZylarians:", error);
  }
}

// Creates a Zylarian (zylarianData arg) for Selected User (player arg) //

async function createZylarian(player, zylarianData) {
  const userRef = collection(db, `users/${player}/zylarians`);
  zylarianData.bornOn = new Date();
  await addDoc(userRef, { zylarianData });
}

// RIPs selected Zylarian (zylarian arg) from Selected User (player arg) //
async function deleteUserZylarian(player, zylarian) {
  const userRef = doc(db, `users/${player}/zylarians/${zylarian}`);
  const status = await deleteDoc(userRef);
  return status;
}

// List all Users in ZyVille (<--- Stupid Name)//
async function getUsers() {
  let users = [];
  const collection = await getDocs(usersCollection);
  collection.docs.forEach((user) => {
    users.push({ ...user.data(), id: user.id });
  });

  return users;
}

// Checks if a user exists on login or signup and if so handles accordingly //
async function checkUsers(user) {
  const currentUsers = [];
  const allUsers = await getUsers();
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

// Debug Function - Retrieves all Zylarians for specific user (owner arg)//
async function getMyZylarians(owner) {
  let myZylarians = [];
  const collection = await getDocs(zylariansCollection);
  collection.docs.forEach((zylarian) => {
    if (zylarian.data().owner === owner) {
      myZylarians.push({ id: zylarian.data().name });
    }
  });
  console.log(myZylarians);
}

// Create New User //
async function createUser(username, password) {
  userData = {
    username: username,
    password: password,
  };
  const newUserRef = await addDoc(usersCollection, userData);
  if (newUserRef.id) {
    console.log(`New User ${username} created with ID : ${newUserRef.id}`);
    return "success";
  } else {
    console.log(`ERROR CREATING USER`);
    return "error";
  }
}

// To do - Update User Function MAYBE? //
async function updateUsers() {}

module.exports = {
  createZylarian,
  createUser,
  getUsers,
  getMyZylarians,
  checkUsers,
  getUserZylarians,
  deleteUserZylarian,
  getAllZylarians,
};
