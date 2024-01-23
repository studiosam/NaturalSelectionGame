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

const db = getFirestore();

const user = doc(db, "users/mainusers");
const usersCollection = collection(db, "users");
const zylariansCollection = collection(db, "zylarians");
// Database functions //

async function getUserZylarians(player) {
  const userZylarians = [];
  const userRef = collection(db, `users/${player}/zylarians`);
  const zys = await getDocs(userRef);
  zys.docs.forEach((zylarian) => {
    userZylarians.push({ ...zylarian.data() });
  });
  return userZylarians;
}

async function createZylarian(player, zylarianData) {
  const userRef = collection(db, `users/${player}/zylarians`);
  await addDoc(userRef, { zylarianData });
}

// List all Users //
async function getUsers() {
  let users = [];
  const collection = await getDocs(usersCollection);
  collection.docs.forEach((user) => {
    users.push({ ...user.data(), id: user.id });
  });

  return users;
}

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

  // console.log(allUsers);
}
// List all Zylarians //
async function getZylarians() {
  let zylarians = [];
  const collection = await getDocs(zylariansCollection);
  collection.docs.forEach((zylarian) => {
    zylarians.push({ ...zylarian.data(), id: zylarian.id });
  });
  console.log(zylarians);
}

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

// async function createUser(username, password) {
//   userData = {
//     username: username,
//     password: password,
//   };
//   await setDoc(user, userData).doc("ass");
// }

// Create New Zylarian //

// Update User //
async function updateUsers() {}

//debug//
//createDoc("ass", "Boy");
//getUsers();
//createZylarian();
//getZylarians();
//checkUsers("asd");
//getMyZylarians("bitch");

module.exports = {
  createZylarian,
  createUser,
  getUsers,
  getZylarians,
  getMyZylarians,
  checkUsers,
  getUserZylarians,
};
