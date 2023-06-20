import { useContext } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import colours from "../constants/colours";
import { MyContext } from "../Context";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function HeaderRight() {
  const { userContext } = useContext(MyContext);
  const navigation = useNavigation();

  const userName = userContext?.userName || "";

  if (!userName) return null;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProfileSetup")}>
      <View style={styles.headerRight}>
        <Text style={styles.headerRightText}>{userName}</Text>
        <FontAwesome5 name="user" size={20} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    marginRight: 15,
    alignItems: "center",
  },
  headerRightText: {
    color: "white",
    paddingRight: 5,
  },
});
