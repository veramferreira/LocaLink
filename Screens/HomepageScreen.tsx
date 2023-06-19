import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";
import colours from "../constants/colours.js";
import { MyContext } from "../Context";

type NavigationItem = {
  id: number;
  title: string;
  screen: string;
};

const routes: NavigationItem[] = [
  { id: 1, title: "About", screen: "About" },
  {
    id: 2,
    title: "Management Announcements",
    screen: "ManagementAnnouncements",
  },
  { id: 3, title: "Report Issue", screen: "ReportIssue" },
  { id: 4, title: "Calendar", screen: "Calendar" },
  { id: 5, title: "Lost&Found", screen: "LostFound" },
  { id: 6, title: "Marketplace", screen: "Marketplace" },
  { id: 7, title: "Recommendations", screen: "Recommendations" },
  { id: 8, title: "Sign In", screen: "SignIn" },
  { id: 9, title: "FindCommunity", screen: "FindCommunity" },

  { id: 10, title: "CreateCommunity", screen: "CreateCommunity" },
  { id: 11, title: "Chat", screen: "Chat" },

  { id: 12, title: "ProfileSetup", screen: "ProfileSetup" },
  { id: 13, title: "FindCreate", screen: "FindCreate" },

  {
    id: 14,
    title: "Post Announcement (admins only)",
    screen: "PostAnnouncement",
  },
];

export const HomepageScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [community, setCommunity] = useState("");
  const { userContext } = useContext(MyContext);

  useEffect(() => {
    const q = query(collection(db, "Users"));
    const usersQuery = onSnapshot(q, (querySnapshot) => {
      let usersArr: any[] = [];
      querySnapshot.forEach((doc) => usersArr.push(doc.data()));
      setCommunity(usersArr[0].communityName);
      return () => usersQuery();
    });
  }, []);
  useEffect(() => {
    console.log(community);
  }, [community]);

  const handleLinkPress = (item: NavigationItem) => {
    navigation.push(item.screen);
  };

  const renderItem = ({ item }: { item: NavigationItem }) => (
    <TouchableOpacity
      onPress={() => handleLinkPress(item)}
      style={styles.itemContainer}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
  console.log("homepage tag");
  return (
    <ScrollView>
      <View style={styles.container}>
        {!community ? null : (
          <Text style={styles.h2}>Welcome to {community}!</Text>
        )}
        <View style={styles.containerList}>
          {routes.map((item) => (
            <React.Fragment key={item.id}>
              {renderItem({ item })}
            </React.Fragment>
          ))}
        </View>
        {userContext?.userName && (
          <Text style={styles.h2}>{userContext.userName}!</Text>
        )}
        {userContext?.communityName && (
          <Text style={styles.h2}>{userContext.communityName}</Text>
        )}
        {userContext?.email && (
          <Text style={styles.h2}>{userContext.email}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  h2: {
    flex: 0.5,
    fontSize: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerList: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  itemContainer: {
    height: 120,
    width: "40%",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: colours.secondary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 18,
    // textDecoration: "none",
    color: "white",
  },
});
