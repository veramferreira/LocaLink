import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../config/firebase";

export default function AddComToUser(email : any, comName: string): void {
  // Update the database
  const docRef = doc(db, "Users", email);

  updateDoc(docRef, {
    community_name: comName,
  });

}
