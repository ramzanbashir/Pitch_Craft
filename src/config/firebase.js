import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRxX6G-x7ViQS4S8mNz98WIcJ1XV2Bjpg",
  authDomain: "pitch-craft-93b30.firebaseapp.com",
  projectId: "pitch-craft-93b30",
  storageBucket: "pitch-craft-93b30.firebasestorage.app",
  messagingSenderId: "860200144439",
  appId: "1:860200144439:web:33f1e5bafce60daca039b2",
  measurementId: "G-QJWRFK5BFK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
