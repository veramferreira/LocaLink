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
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AddRoleToUser from "../Utils/AddRoleToUser";

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

  useEffect(() => {
    console.log(CommunityUserList);
  }, [CommunityUserList]);

  return (
    <View>
      {CommunityUserList.map((user) => {
        return (
          <View>
            <Text>Username: {user.userName}</Text>
            <Text>Current Role: {user.role}</Text>

            {user.role !== "owner" ? (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    AddRoleToUser(user.email, "admin");
                  }}
                >
                  <Text>Assign Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    AddRoleToUser(user.email, "resident");
                  }}
                >
                  <Text>Remove Admin</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
