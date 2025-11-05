// app/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrCgWXV40mFZq2ZI2ILwz0gxuxl3wGNv8",
  authDomain: "camsterbrainrot.firebaseapp.com", // must match your project
  projectId: "camsterbrainrot",
  storageBucket: "camsterbrainrot.appspot.com",
  messagingSenderId: "586964433819",
  appId: "1:586964433819:web:39ea7e60f8497e99407f3e",
  measurementId: "G-4DSQXMJ04W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { app };
