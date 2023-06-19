import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../config/firebase";

export default function AddComToUser(email: any, comName: string): void {
  const docRef = doc(db, "Users", email);

  updateDoc(docRef, {
    communityName: comName,
  });
}
