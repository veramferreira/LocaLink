import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../config/firebase";

export default function AddRoleToUser(email: any, role: string): void {
  const docRef = doc(db, "Users", email);

  updateDoc(docRef, {
    role: role,
  });
}
