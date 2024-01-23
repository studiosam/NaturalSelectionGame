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

// List all Users //
async function getUsers() {
  let users = [];
  const collection = await getDocs(usersCollection);
  collection.docs.forEach((user) => {
    users.push({ ...user.data(), id: user.id });
  });
  console.log(users);
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
  await addDoc(usersCollection, userData);
}

// async function createUser(username, password) {
//   userData = {
//     username: username,
//     password: password,
//   };
//   await setDoc(user, userData).doc("ass");
// }

// Create New Zylarian //
async function createZylarian(zylarianData) {
  zylarianParams = {
    owner: "bitch",
    name: "Ween Boy",
    height: 100,
    weight: 500,
    activity: "Diurnal",
    skinColor: "Beige",
    skinTexture: "Scaly",
    limbType: "Quadripedal",
    specialFeatures: ["Amphibious"],
    dietType: "Herbivore",
    colorGenotypes: {
      redGenotype: "rr",
      greenGenotype: "gg",
      blueGenotype: "bb",
      brownGenotype: "Pp",
    },
    skinTextureGenotypes: {
      skinMoistureGenotype: "ww",
      scaleGenotype: "Ss",
      feathered: false,
      furry: false,
    },
    alleles: {
      redAlleles: ["r", "r"],
      greenAlleles: ["g", "g"],
      blueAlleles: ["b", "b"],
      brownAlleles: ["P", "p"],
      skinMoistureAlleles: ["w", "w"],
      scaleAlleles: ["S", "s"],
    },
  };

  await addDoc(zylariansCollection, zylarianParams);
}

// Update User //
async function updateUsers() {}

//debug//
//createDoc("ass", "Boy");
//getUsers();
//createZylarian();
//getZylarians();
getMyZylarians("bitch");

module.exports = {
  createZylarian,
  createUser,
  getUsers,
  getZylarians,
  getMyZylarians,
};
