import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";

export default function ManagementAnnouncements({ navigation }: any) {
  const [announcementList, setAnnouncementList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "postAdminAnnouncement"),
      orderBy("timestamp")
    );

    const announcementQuery = onSnapshot(q, (querySnapshot) => {
      let announcementArr: Array<Object> = [];

      querySnapshot.forEach((doc) => {
        announcementArr.push({ ...doc.data(), id: doc.id });
      });
      setAnnouncementList(announcementArr);
      setIsLoading(false);
    });

    return () => announcementQuery();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={styles.heading}> Management Announcements</Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          announcementList.map((announcement: any, index) => {
            return (
              <View key={announcement.id} style={styles.postBody}>
                <Text style={styles.title}>{announcement.title}</Text>
                <Image
                  source={{ uri: announcement.img }}
                  style={styles.postImg}
                />
                <Text style={styles.description}>
                  {announcement.description}
                </Text>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  postBody: {
    display: "flex",
    alignContent: "center",
  },
  title: {
    marginLeft: 15,
    marginBottom: 10,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  postImg: {
    width: 300,
    height: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#F4C01D",
    alignSelf: "center",
  },
  description: {
    marginLeft: 25,
    marginRight: 25,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: 10,
  },
});
