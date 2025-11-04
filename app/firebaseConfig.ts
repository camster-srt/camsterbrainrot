import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrCgWXV40mFZq2ZI2ILwz0gxuxl3wGNv8",
  authDomain: "camsterbrainrot.firebaseapp.com",
  projectId: "camsterbrainrot",
  storageBucket: "camsterbrainrot.firebasestorage.app",
  messagingSenderId: "586964433819",
  appId: "1:586964433819:web:39ea7e60f8497e99407f3e",
  measurementId: "G-4DSQXMJ04W"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);