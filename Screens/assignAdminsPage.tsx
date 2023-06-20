import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

import { Text, View } from "react-native";
export default function assignAdmins() {
  const [CommunityUserList, setCommunityUserList] = useState([{}]);
  useEffect(() => {
    const q = query(
      collection(db, "Users"),
      where("communityName", "==", "south manchester ")
    );

    const communityUserQuery = onSnapshot(q, (querySnapshot) => {
      let communityUserArr: Array<Object> = [];

      querySnapshot.forEach((doc) => {
        communityUserArr.push({ ...doc.data(), id: doc.id });
      });
      setCommunityUserList(communityUserArr);
    });

    return () => communityUserQuery();
  }, []);
  useEffect(() => {
    console.log(CommunityUserList);
  }, [CommunityUserList]);
  return (
    <View>
      {CommunityUserList.map((elm) => {
        return <Text>{elm.userName}</Text>;
      })}
    </View>
  );
}
