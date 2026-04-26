import { db } from "./firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const testFirestore = async () => {
  try {
    const docRef = await addDoc(collection(db, "files"), {
      name: "test.csv",
      createdAt: new Date()
    });

    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
};