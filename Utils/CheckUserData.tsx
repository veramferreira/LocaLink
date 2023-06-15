import { doc, updateDoc } from "firebase/firestore";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";

export default function CheckUserData(): void {
  const [users, setUsers] = useState([{}]);
  const q = query(collection(db, "Users"));

  useEffect(() => {
    const communityQuery = onSnapshot(q, (querySnapshot) => {
      onSnapshot(q, (querySnapshot) => {
        let UserList: Array<Object> = [];

        querySnapshot.forEach((doc) => {
          UserList.push({ ...doc.data(), id: doc.id });
        });
        setUsers(UserList);
      });
      console.log(users);
    });
    return () => communityQuery();
  }, []);
}
