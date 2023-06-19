import { useContext } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import colours from "../constants/colours";
import { MyContext } from "../Context";
import { FontAwesome5 } from "@expo/vector-icons";

export default function HeaderRight() {
  const { userContext } = useContext(MyContext);

  const userName = userContext?.userName || "";

  if (!userName) return null;

  return (
    <View style={styles.headerRight}>
      <Text style={styles.headerRightText}>{userName}</Text>
      <FontAwesome5 name="user" size={20} color="white" />
    </View>
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
