import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../config/firebase";

export default function AddModeToUser(email: any, mode: string): void {
  const docRef = doc(db, "Users", email);

  updateDoc(docRef, {
    ldMode: mode,
  });
}
