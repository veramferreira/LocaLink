import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../config/firebase";

export default function updatePostCount(email: any, postCount: number): void {
  const docRef = doc(db, "Users", email);

  updateDoc(docRef, {
    postCount: postCount,
  });
}
