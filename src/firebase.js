import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1KqtlbFTvUFrRm7AZgQ7myH3HnFZqpqU",
  authDomain: "chat-app-c69a0.firebaseapp.com",
  projectId: "chat-app-c69a0",
  storageBucket: "chat-app-c69a0.appspot.com",
  messagingSenderId: "621868589609",
  appId: "1:621868589609:web:95ea4fca63dbd882143238",
  measurementId: "G-7N2P34P0X7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()