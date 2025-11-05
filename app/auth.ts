import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const signInAdmin = async () => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, "cameronshiu@gmail.com", "Aidan202822@");
  console.log("Admin signed in");
};