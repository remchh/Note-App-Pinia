import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAkysY30k47_9HN5jChkVcX76Olmd-ISCg",
  authDomain: "notes-app-a78d1.firebaseapp.com",
  projectId: "notes-app-a78d1",
  storageBucket: "notes-app-a78d1.appspot.com",
  messagingSenderId: "733327002998",
  appId: "1:733327002998:web:a67d18a47e4e7df81abe57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app) //access to the database

export {
  db
}