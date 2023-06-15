import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { auth, db } from "../config/firebase";
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  query,
} from "@firebase/firestore";

interface FormValues {
  name: string;
  description: string;
  postcode: string;
  img: string;
  management1Name: string;
  management1Img: string;
  management2Name: string;
  management2Img: string;
  management3Name: string;
  management3Img: string;
  contact1Name: string;
  contact1Info: string;
  contact2Name: string;
  contact2Info: string;
  contact3Name: string;
  contact3Info: string;
}

export default function About({ navigation }: any) {
  const [community, setCommunity] = useState("");
  const [communityInfo, setCommunityInfo] = useState("");

  useEffect(() => {
    const q = query(collection(db, "Users"));
    const usersQuery = onSnapshot(q, (QuerySnapshot) => {
      let usersArr: any[] = [];
      QuerySnapshot.forEach((doc) => usersArr.push(doc.data()));
      setCommunity(usersArr[0].community_name);
      return () => usersQuery();
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "CommunityList"));
    const communityQuery = onSnapshot(q, (QuerySnapshot) => {
      let communityArr: any[] = [];
      QuerySnapshot.forEach((doc) => communityArr.push(doc.data()));
      setCommunityInfo(communityArr[9]);
      return () => communityQuery();
    });
  }, []);

  useEffect(() => {}, [community]);

  return (
    <>
      {!community ? null : (
        <View>
          <Text style={styles.heading}>About {community}</Text>
          <View style={styles.main}>
            <Text style={styles.title}>Description of {community}: </Text>
            <View style={styles.block}>
              <Text>{communityInfo.description}</Text>
            </View>
            <Text style={styles.title}>Useful Contacts:</Text>
            <View>
              <Text>{communityInfo.contact1Info}</Text>
              <Text>{communityInfo.contact2Info}</Text>
              <Text>{communityInfo.contact3Info}</Text>
            </View>
            <View style={styles.block}>
              <Text style={styles.title}>Management:</Text>
              <View>
                <Image
                  style={styles.avatarImg}
                  source={{
                    uri: communityInfo.management1Img,
                  }}
                />
                <Text>{communityInfo.management1Name}</Text>
                <Image
                  style={styles.avatarImg}
                  source={{
                    uri: communityInfo.management2Img,
                  }}
                />
                <Text>{communityInfo.management2Name}</Text>
              </View>
              <Image
                style={styles.avatarImg}
                source={{
                  uri: communityInfo.management3Img,
                }}
              />
              <Text>{communityInfo.management3Name}</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  main: {
    marginRight: 30,
    marginLeft: 30,
  },
  block: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    marginTop: 10,
    fontFamily: "Poppins_500Medium",
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
