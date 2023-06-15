import React from "react";
import { auth } from "../../config/firebase";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

const Message = ({ message }) => {
  // message.uid === auth.currentUser.uid ? `${style.sent}` : `${style.received}`;

  return (
    <View style={styles.wrapper}>
      <Text>{message.name}</Text>
      <Text>{message.text}</Text>
    </View>
  );
};

export default Message;
