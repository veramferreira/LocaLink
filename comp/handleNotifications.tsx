import React, { useEffect, useState } from "react";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import {
    Text, StyleSheet
  } from "react-native";
import { db } from "../config/firebase";

interface HandleNotificationsProps {
    onNewPosts: () => void;
  }  

const HandleNotifications: React.FC<HandleNotificationsProps> = ({
    onNewPosts,
  }) => {
  const [hasNewPosts, setHasNewPosts] = useState(false);
  const [previousPostCount, setPreviousPostCount] = useState(0);

  useEffect(() => {
    const checkForNewPosts = async () => {
      const managementAnnouncementsQuerySnapshot = await getDocs(
        collection(db, "postAdminAnnouncement")
      );

      const currentPostCount = managementAnnouncementsQuerySnapshot.docs.length;
      const hasNewPosts = currentPostCount > previousPostCount;
      setHasNewPosts(hasNewPosts);
      setPreviousPostCount(currentPostCount);
      if (hasNewPosts) {
          onNewPosts(); // Invoke the callback when new posts are detected
        }
    };

    checkForNewPosts()

    const unsubscribe = onSnapshot(collection(db, "postAdminAnnouncement"), () => {
      checkForNewPosts();
    });

    return unsubscribe; // Cleanup the subscription on unmount
  }, []);



  return <>{hasNewPosts && <Text style={styles.notificationText}>New posts!</Text>}</>;
};

const styles = StyleSheet.create({
    notificationText: {
        color: "white",
        fontSize: 12,
        fontFamily: "Poppins_500Medium",
        textTransform: "lowercase",
        backgroundColor: "red",
        borderWidth:1,
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
    

export default HandleNotifications;