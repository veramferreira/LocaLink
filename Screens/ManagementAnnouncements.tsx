import { Text, View, StyleSheet, Button } from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";

export default function ManagementAnnouncements({ navigation }: any) {
  const [announcementList, setAnnouncementList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "postAdminAnnouncement"), orderBy("title"));

    const announcementQuery = onSnapshot(q, (querySnapshot) => {
      let announcementArr: Array<Object> = [];

      querySnapshot.forEach((doc) => {
        announcementArr.push({...doc.data(), id: doc.id});
      });
      setAnnouncementList(announcementArr);
      setIsLoading(false);
    });

    return () => announcementQuery();
  }, []);

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    announcementList.map((announcement: any, index) => {
      return (
        <View>
          <Text>{announcement.title}</Text>
          <Text>{announcement.img}</Text>
          <Text>{announcement.description}</Text>
        </View>
      )
    })
  )
}