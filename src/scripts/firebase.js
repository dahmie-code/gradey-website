import { getDatabase, ref, push, set, get, update, remove, child } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: "https://gradey-webapp-default-rtdb.firebaseio.com",
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
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
