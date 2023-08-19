import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDBsPP_LkIdhwUdQnjLY4v0KkMO9VzDxI0",
    authDomain: "chatgram-d0f3e.firebaseapp.com",
    projectId: "chatgram-d0f3e",
    storageBucket: "chatgram-d0f3e.appspot.com",
    messagingSenderId: "966263651886",
    appId: "1:966263651886:web:d868708ff8428f83e0e9bf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()