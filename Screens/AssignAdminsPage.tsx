import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { MyContext } from "../Context";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AddRoleToUser from "../Utils/AddRoleToUser";
import colours from "../constants/colours";

export default function AssignAdmins() {
  const [CommunityUserList, setCommunityUserList] = useState([{}]);
  const { userContext } = useContext(MyContext);

  useEffect(() => {
    const q = query(
      collection(db, "Users"),
      where("communityName", "==", userContext?.communityName)
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

  useEffect(() => {}, [CommunityUserList]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Community Roles</Text>
        {CommunityUserList.map((user) => {
          return (
            <View style={styles.usersWrapper}>
              <Text style={styles.boldText}>
                👤 Username:{" "}
                <Text style={styles.normalText}>{user.userName}</Text>
              </Text>
              <Text style={styles.boldText}>
                🗂️ Current Role:{" "}
                <Text style={styles.normalText}>{user.role}</Text>
              </Text>

              {user.role !== "owner" ? (
                <View style={styles.btnWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      AddRoleToUser(user.email, "admin");
                    }}
                  >
                    <View style={styles.buttonAdd}>
                      <Text style={styles.buttonText}>Assign Admin</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      AddRoleToUser(user.email, "resident");
                    }}
                  >
                    <View style={styles.buttonRemove}>
                      <Text style={styles.buttonText}>Remove Admin</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  heading: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontWeight: "bold",
    margin: 20,
    fontSize: 20,
  },
  usersWrapper: {
    display: "flex",
    padding: 10,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 8,
  },
  boldText: {
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    padding: 5,
    paddingTop: 10,
  },
  normalText: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  btnWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonAdd: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colours.secondary,
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 15,
    borderColor: colours.secondary,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    color: "white",
  },
  buttonRemove: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colours.error,
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});
