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
import updatePostCount from "../Utils/updatePostCount";
import HandleNotifications from "../comp/handleNotifications";

type NavigationItem = {
  id: number;
  title: string;
  screen: string;
};

const ownerRoutes: NavigationItem[] = [
  {
    id: 1,
    title: "📣 Management Announcements",
    screen: "ManagementAnnouncements",
  },
  { id: 2, title: "ℹ️ About", screen: "About" },
  { id: 3, title: "💬 General Chat", screen: "Chat" },
  { id: 4, title: "📆 Calendar", screen: "Calendar" },
  { id: 5, title: "🛍️ Marketplace", screen: "Marketplace" },
  { id: 6, title: "📝 Recommendations", screen: "Recommendations" },
  { id: 7, title: "🔎 Lost & Found", screen: "LostFound" },
  { id: 8, title: "🔧 Report Issue", screen: "ReportIssue" },
  { id: 9, title: "📣 Post Announcement", screen: "PostAnnouncement" },
  { id: 10, title: "🎖️ Assign Admins", screen: "AssignAdmins" },
];

const adminRoutes: NavigationItem[] = [
  {
    id: 1,
    title: "📣 Management Announcements",
    screen: "ManagementAnnouncements",
  },
  { id: 2, title: "ℹ️ About", screen: "About" },
  { id: 3, title: "💬 General Chat", screen: "Chat" },
  { id: 4, title: "📆 Calendar", screen: "Calendar" },
  { id: 5, title: "🛍️ Marketplace", screen: "Marketplace" },
  { id: 6, title: "📝 Recommendations", screen: "Recommendations" },
  { id: 7, title: "🔎 Lost & Found", screen: "LostFound" },
  { id: 8, title: "🔧 Report Issue", screen: "ReportIssue" },
  { id: 9, title: "📣 Post Announcement", screen: "PostAnnouncement" },
];

const routes: NavigationItem[] = [
  {
    id: 1,
    title: "📣 Management Announcements",
    screen: "ManagementAnnouncements",
  },
  { id: 2, title: "ℹ️ About", screen: "About" },
  { id: 3, title: "💬 General Chat", screen: "Chat" },
  { id: 4, title: "📆 Calendar", screen: "Calendar" },
  { id: 5, title: "🛍️ Marketplace", screen: "Marketplace" },
  { id: 6, title: "📝 Recommendations", screen: "Recommendations" },
  { id: 7, title: "🔎 Lost & Found", screen: "LostFound" },
  { id: 8, title: "🔧 Report Issue", screen: "ReportIssue" },
];

export const HomepageScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [hasNewPosts, setHasNewPosts] = useState(false);
  const { userContext, setUserContext } = useContext(MyContext);

  useEffect(() => {
    const checkForNewPosts = async () => {
      const managementAnnouncementsQuerySnapshot = await getDocs(
        collection(db, `${userContext.communityName}postAdminAnnouncement`)
      );

      const currentPostCount = managementAnnouncementsQuerySnapshot.docs.length;
      let hasNewPosts;
      if (!userContext.postCount) {
        hasNewPosts = true;
      } else {
        hasNewPosts = currentPostCount > userContext.postCount;
      }
      setHasNewPosts(hasNewPosts);
      updatePostCount(userContext.email.toLowerCase(), currentPostCount);
      setUserContext({ ...userContext, postCount: currentPostCount });
      // setPreviousPostCount(currentPostCount);
    };

    checkForNewPosts();

    const unsubscribe = onSnapshot(
      collection(db, `${userContext?.communityName}postAdminAnnouncement`),
      () => {
        checkForNewPosts();
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(collection(db, "Users"));
    const usersQuery = onSnapshot(q, (querySnapshot) => {
      let usersArr: any[] = [];
      querySnapshot.forEach((doc) => usersArr.push(doc.data()));

      return () => usersQuery();
    });
  }, []);

  const handleLinkPress = (item: NavigationItem) => {
    if (item.screen === "ManagementAnnouncements") {
      setHasNewPosts(false);
    }
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
        {item.screen === "ManagementAnnouncements" && hasNewPosts && (
          <View>
            <Text style={styles.notificationText}>New posts!</Text>
          </View>
        )}
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
    marginTop: 15,
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
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  itemTitle: {
    fontSize: 18,
    color: "white",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  notificationText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    textTransform: "lowercase",
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 20,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
