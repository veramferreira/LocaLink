import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
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

const ownerRoutes: NavigationItem[] = [
  { id: 1, title: "ℹ️ About", screen: "About" },
  {
    id: 2,
    title: "📣 Management Announcements",
    screen: "ManagementAnnouncements",
  },
  { id: 3, title: "🔧 Report Issue", screen: "ReportIssue" },
  { id: 4, title: "📆 Calendar", screen: "Calendar" },
  { id: 5, title: "🔎 Lost & Found", screen: "LostFound" },
  { id: 6, title: "🛍️ Marketplace", screen: "Marketplace" },
  { id: 7, title: "💬 Recommendations", screen: "Recommendations" },
  { id: 8, title: "Chat", screen: "Chat" },
  { id: 9, title: "Post announcement", screen: "PostAnnouncement" },
  { id: 10, title: "Assign Admins", screen: "AssignAdmins" },
];

const adminRoutes: NavigationItem[] = [
  { id: 1, title: "ℹ️ About", screen: "About" },
  {
    id: 2,
    title: "📣 Management Announcements",
    screen: "ManagementAnnouncements",
  },
  { id: 3, title: "🔧 Report Issue", screen: "ReportIssue" },
  { id: 4, title: "📆 Calendar", screen: "Calendar" },
  { id: 5, title: "🔎 Lost & Found", screen: "LostFound" },
  { id: 6, title: "🛍️ Marketplace", screen: "Marketplace" },
  { id: 7, title: "💬 Recommendations", screen: "Recommendations" },
  { id: 8, title: "Chat", screen: "Chat" },
  { id: 9, title: "Post announcement", screen: "PostAnnouncement" },
];

const routes: NavigationItem[] = [
  { id: 1, title: "ℹ️ About", screen: "About" },
  {
    id: 2,
    title: "📣 Management Announcements",
    screen: "ManagementAnnouncements",
  },
  { id: 3, title: "🔧 Report Issue", screen: "ReportIssue" },
  { id: 4, title: "📆 Calendar", screen: "Calendar" },
  { id: 5, title: "🔎 Lost & Found", screen: "LostFound" },
  { id: 6, title: "🛍️ Marketplace", screen: "Marketplace" },
  { id: 7, title: "💬 Recommendations", screen: "Recommendations" },
  { id: 8, title: "Chat", screen: "Chat" },
];

export const HomepageScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const { userContext } = useContext(MyContext);

  useEffect(() => {
    const q = query(collection(db, "Users"));
    const usersQuery = onSnapshot(q, (querySnapshot) => {
      let usersArr: any[] = [];
      querySnapshot.forEach((doc) => usersArr.push(doc.data()));

      return () => usersQuery();
    });
  }, []);

  const handleLinkPress = (item: NavigationItem) => {
    console.log(item.screen);
    if (item.screen === "HomepageScreen") {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: item.screen }],
        })
      );
    } else {
      navigation.navigate(item.screen, {});
    }
  };

  const colours = ["#1B73E7", "#F4C01D", "#FF8A64"];
  const renderItem = ({ item }: { item: NavigationItem }) => {
    const backgroundColor = colours[item.id % colours.length];
    const itemContainerStyle = {
      ...styles.itemContainer,
      backgroundColor,
    };

    return (
      <TouchableOpacity
        onPress={() => handleLinkPress(item)}
        style={itemContainerStyle}
      >
        <Text style={styles.itemTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return userContext?.role === "owner" ? (
    <ScrollView>
      <View style={styles.container}>
        {userContext?.communityName && (
          <Text style={styles.h2}>
            Welcome to {userContext.communityName}! 👋
          </Text>
        )}
        <View style={styles.containerList}>
          {ownerRoutes.map((item) => (
            <React.Fragment key={item.id}>
              {renderItem({ item })}
            </React.Fragment>
          ))}
        </View>
      </View>
    </ScrollView>
  ) : userContext?.role === "admin" ? (
    <ScrollView>
      <View style={styles.container}>
        {userContext?.communityName && (
          <Text style={styles.h2}>
            Welcome to {userContext.communityName}! 👋
          </Text>
        )}
        <View style={styles.containerList}>
          {adminRoutes.map((item) => (
            <React.Fragment key={item.id}>
              {renderItem({ item })}
            </React.Fragment>
          ))}
        </View>
      </View>
    </ScrollView>
  ) : (
    <ScrollView>
      <View style={styles.container}>
        {userContext?.communityName && (
          <Text style={styles.h2}>
            Welcome to {userContext.communityName}! 👋
          </Text>
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
        {userContext?.role && <Text style={styles.h2}>{userContext.role}</Text>}
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
    fontFamily: "Poppins_700Bold",
    marginTop: 50,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  itemContainer: {
    height: 120,
    width: "85%",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: colours.secondary,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  itemTitle: {
    fontSize: 18,
    color: "white",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
});
