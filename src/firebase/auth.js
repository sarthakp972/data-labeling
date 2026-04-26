import { auth } from "./firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User:", result.user);
    return result.user;
  } catch (error) {
    console.error("Google login error:", error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
};