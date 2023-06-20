import React from "react";
import { auth } from "../../config/firebase";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";


const Message = ({ message }) => {
  // message.uid === auth.currentUser.uid ? `${style.sent}` : `${style.received}`;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{message.name}</Text>
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // flexDirection: "column",
    // borderColor: "red",
    // borderWidth: 1,
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 8,
  },
  name: {
    fontFamily: "Poppins_500Medium",
    marginBottom: 10
  },
  text: {
    fontFamily: 'Poppins_400Regular',
  }
//   wrapper: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   name: {
//     flex: 1,
//     textAlign: "center"
//   },
});
