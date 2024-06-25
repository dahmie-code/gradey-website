import { getDatabase, ref, push, set, get, update, remove, child } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';

const firebaseConfig = {
  apiKey: "AIzaSyDqysohgLq1StvsQCVGLEsiTtg-HMBidjg",
  authDomain: "gradey-webapp.firebaseapp.com",
  databaseURL: "https://gradey-webapp-default-rtdb.firebaseio.com",
  projectId: "gradey-webapp",
  storageBucket: "gradey-webapp.appspot.com",
  messagingSenderId: "479464668344",
  appId: "1:479464668344:web:9816e36382dc222c0bc84d",
  measurementId: "G-7RRSRQL016"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

export {
  auth, db, ref, push, set, get, update, remove,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut, child,
};
