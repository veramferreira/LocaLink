import React, { useContext } from "react";
import { auth } from "../../config/firebase";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { MyContext } from "../../Context";

const Message = ({ message }) => {
  const { userContext } = useContext(MyContext);
  if (message.name === userContext.userName) {
    console.log("hello");
  }
  const sentReceivedText = () => {
    console.log(message.name, userContext.userName);
    return message.name === userContext.userName
      ? {
          fontFamily: "Poppins_400Regular",
          textAlign: "right",
        }
      : {
          fontFamily: "Poppins_400Regular",
          textAlign: "left",
        };
  };
  const sentReceivedName = () => {
    console.log(message.name, userContext.userName);
    return message.name === userContext.userName
      ? {
          fontFamily: "Poppins_500Medium",
          marginBottom: 10,
          textAlign: "right",
        }
      : {
          fontFamily: "Poppins_500Medium",
          marginBottom: 10,
          textAlign: "left",
        };
  };
  return (
    <View style={styles.container}>
      <Text style={sentReceivedName()}>{message.name}</Text>
      <Text style={sentReceivedText()}>{message.text}</Text>
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
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 8,
  },

  name: {
    fontFamily: "Poppins_500Medium",
    marginBottom: 10,
  },
  text: {
    fontFamily: "Poppins_400Regular",
  },

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
