import { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AddModeToUser from "../Utils/AddModeToUSer";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../config/firebase";
export default function EditProfile() {
  const [userList, setUserList] = useState([{}]);
  const { userContext, setUserContext } = useContext(MyContext);
  useEffect(() => {
    const q = query(
      collection(db, "Users"),
      where("userName", "==", userContext?.userName)
    );

    const userListQuery = onSnapshot(q, (querySnapshot) => {
      let userListArr: Array<Object> = [];

      querySnapshot.forEach((doc) => {
        userListArr.push({ ...doc.data(), id: doc.id });
      });
      setUserList(userListArr);
    });

    return () => userListQuery();
  }, []);
  //need to check user mode to send the opersite back to update doc the update state then bobs ur fanny ur done

  console.log(userList[0].ldMode);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          AddModeToUser(userContext.email, "Dark");
        }}
      >
        <Text>light dark</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>My Profile</Text>
      <Image
        source={require("../assets/avatar.jpeg")}
        style={styles.avatarImg}
      />
      <View style={styles.bodyContainer}>
        <Text style={styles.boldText}>
          User name:{" "}
          <Text style={styles.normalText}>{userContext.userName}</Text>
        </Text>
        <Text style={styles.boldText}>
          Email: <Text style={styles.normalText}>{userContext.email}</Text>
        </Text>
        <Text style={styles.boldText}>
          Community:{" "}
          <Text style={styles.normalText}>{userContext.communityName}</Text>
        </Text>
        <Text style={styles.boldText}>
          Role: <Text style={styles.normalText}>{userContext.role}</Text>
        </Text>
      </View>
    </View>
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
  bodyContainer: {
    display: "flex",
    padding: 10,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 8,
  },
  avatarImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#F4C01D",
    alignSelf: "center",
    marginBottom: 20,
  },
  boldText: {
    fontFamily: "Poppins_500Medium",
    textAlign: "left",
    padding: 5,
    paddingTop: 10,
  },
  normalText: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    justifyContent: "center",
  },
});
