import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbj0ulEVI6JumN1_XQjgiwtbQrY3Ax0sU",
  authDomain: "mini--hackthon.firebaseapp.com",
  projectId: "mini--hackthon",
  storageBucket: "mini--hackthon.firebasestorage.app",
  messagingSenderId: "261252327467",
  appId: "1:261252327467:web:472eebdf152a03d7cda26e",
  measurementId: "G-1LM3KFYBEB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
