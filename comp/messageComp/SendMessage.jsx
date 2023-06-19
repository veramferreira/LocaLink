import React, { useState } from "react";
import { auth, db } from "../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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

const SendMessage = ({ scroll, chatDB }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid message");
      return;
    }
    const { email } = auth.currentUser;
    await addDoc(collection(db, `${chatDB}`), {
      text: input,
      name: email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        value={input}
        onChangeText={setInput}
        style={styles.input}
        placeholder="Message"
      />
      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendMessage;
