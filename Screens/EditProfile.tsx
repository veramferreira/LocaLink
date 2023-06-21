import { useContext } from "react";
import { MyContext } from "../Context";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function EditProfile() {
  const { userContext } = useContext(MyContext);
  return (
    <View style={styles.container}>
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
