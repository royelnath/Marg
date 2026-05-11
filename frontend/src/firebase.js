// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// PASTE YOUR UNIQUE CONFIG HERE FROM THE FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyDKsNWxU5geuFDlZOe46qImNfkTa_7Skns",
  authDomain: "future-marg.firebaseapp.com",
  projectId: "future-marg",
  storageBucket: "future-marg.firebasestorage.app",
  messagingSenderId: "70249093862",
  appId: "1:70249093862:web:58b4000961570a8e7e3927"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);