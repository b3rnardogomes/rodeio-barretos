import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtxbVGHVEvgAWqvGNzLYeiushIShUP8bw",
  authDomain: "barretos-camping.firebaseapp.com",
  databaseURL: "https://barretos-camping-default-rtdb.firebaseio.com",
  projectId: "barretos-camping",
  storageBucket: "barretos-camping.firebasestorage.app",
  messagingSenderId: "496449608569",
  appId: "1:496449608569:web:1ada4288e7a6ee63c36da8",
  measurementId: "G-P5Z2JZTK92"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);