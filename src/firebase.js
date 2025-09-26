import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp, 
  doc, 
  deleteDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASH4D-k8LD9SzRBKg4C6cVweUrhJxpjAw",
  authDomain: "spend-wise-1c7d4.firebaseapp.com",
  projectId: "spend-wise-1c7d4",
  storageBucket: "spend-wise-1c7d4.firebasestorage.app",
  messagingSenderId: "26387052806",
  appId: "1:26387052806:web:89bf58cbd4f9bd02990687"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {
  auth,
  provider,
  db,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,          
  deleteDoc, 
  serverTimestamp
};
