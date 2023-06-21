import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { auth, db } from "../config/firebase";
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { MyContext } from "../Context";
import colours from "../constants/colours";

interface CommunityInfo {
  description: string;
  contact1Name: string;
  contact1Info: string;
  contact2Name: string;
  contact2Info: string;
  contact3Name: string;
  contact3Info: string;
  management1Name: string;
  management1Img: string;
  management2Name: string;
  management2Img: string;
  management3Name: string;
  management3Img: string;
}

export default function About({ navigation }: any) {
  const [community, setCommunity] = useState("");
  const [communityInfo, setCommunityInfo] = useState<CommunityInfo | null>(
    null
  );
  const { userContext, setUserContext } = useContext(MyContext);

  useEffect(() => {
    if (userContext?.communityName) {
      const q = query(
        collection(db, "CommunityList"),
        where("name", "==", userContext.communityName)
      );
      const communityQuery = onSnapshot(q, (querySnapshot: QuerySnapshot) => {
        const communityArr: any[] = [];
        querySnapshot.forEach((doc) => communityArr.push(doc.data()));
        if (communityArr.length > 0) {
          setCommunityInfo(communityArr[0]);
        }
      });
      return () => communityQuery();
    }
  }, [userContext]);

  useEffect(() => {
    if (userContext?.communityName) {
      setCommunity(userContext.communityName);
    }
  }, [userContext]);

  if (!community || !communityInfo) {
    return null;
  }

  return (
    <>
      {!community ? null : (
        <ScrollView>
          <View>
            <Text style={styles.heading}>About {community}</Text>
            <View style={styles.main}>
              <View style={styles.block}>
                <Text style={styles.title}>Description of {community}: </Text>
                <View style={styles.contactsBody}>
                  <Text style={styles.normalText}>
                    {communityInfo.description}
                  </Text>
                </View>
              </View>
              <View style={styles.block}>
                <Text style={styles.title}>Useful Contacts:</Text>
                <View style={styles.contacts}>
                  <Text style={styles.normalText}>
                    <Text style={styles.semiBold}>
                      {communityInfo.contact1Name}:{" "}
                    </Text>
                    {communityInfo.contact1Info}
                  </Text>
                  <Text style={styles.normalText}>
                    <Text style={styles.semiBold}>
                      {communityInfo.contact2Name}:{" "}
                    </Text>
                    {communityInfo.contact2Info}
                  </Text>
                  <Text style={styles.normalText}>
                    <Text style={styles.semiBold}>
                      {communityInfo.contact3Name}:{" "}
                    </Text>
                    {communityInfo.contact3Info}
                  </Text>
                </View>
              </View>
              <Text style={styles.title}>Management:</Text>
              <View style={styles.managementBlock}>
                <View>
                  <Image
                    style={styles.avatarImg}
                    source={{
                      uri: communityInfo.management1Img,
                    }}
                  />
                  <Text style={styles.adminName}>
                    {communityInfo.management1Name}
                  </Text>
                </View>
                <View>
                  <Image
                    style={styles.avatarImg}
                    source={{
                      uri: communityInfo.management2Img,
                    }}
                  />
                  <Text style={styles.adminName}>
                    {communityInfo.management2Name}
                  </Text>
                </View>
                <View>
                  <Image
                    style={styles.avatarImg}
                    source={{
                      uri: communityInfo.management3Img,
                    }}
                  />
                  <Text style={styles.adminName}>
                    {communityInfo.management3Name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  semiBold: {
    fontFamily: "Poppins_500Medium",
  },
  normalText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: colours.font,
  },
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
  contacts: {
    rowGap: 4,
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: colours.yellow,
    borderWidth: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 15,
    paddingTop: 15,
  },
  block: {
    marginBottom: 20,
  },
  contactsBody: {
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: colours.yellow,
    borderWidth: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 15,
    paddingTop: 15,
  },
  managementBlock: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    textAlign: "center",
  },
  adminName: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    color: colours.font,
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
    borderWidth: 2,
    borderColor: colours.yellow,
  },
});
