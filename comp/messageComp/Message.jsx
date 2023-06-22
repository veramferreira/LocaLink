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
import colours from "../../constants/colours";

const Message = ({ message }) => {
  const { userContext } = useContext(MyContext);

  const sentReceivedText = () => {
    return message.name === userContext?.userName
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
    return message.name === userContext?.userName
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

  const containerStyle =
    message.name === userContext?.userName
      ? styles.sentContainer
      : styles.receivedContainer;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={sentReceivedName()}>{message.name}</Text>
      <Text style={sentReceivedText()}>{message.text}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    width: "70%",
    margin: 20,
    borderWidth: 1,
  },
  sentContainer: {
    alignSelf: "flex-end",
    borderColor: colours.yellow,
  },
  receivedContainer: {
    alignSelf: "flex-start",
    borderColor: colours.pink,
  },
});
