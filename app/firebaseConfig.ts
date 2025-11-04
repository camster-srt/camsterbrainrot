// app/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrCgWXV40mFZq2ZI2ILwz0gxuxl3wGNv8",
  authDomain: "camsterbrainrot.firebaseapp.com",
  projectId: "camsterbrainrot",
  storageBucket: "camsterbrainrot.appspot.com",
  messagingSenderId: "586964433819",
  appId: "1:586964433819:web:39ea7e60f8497e99407f3e",
  measurementId: "G-4DSQXMJ04W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(app);