import React, { useContext, useState } from "react";
import { auth, db } from "../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { MyContext } from "../../Context";
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#1B73E7",
    padding: 10,
    fontSize: 14,
    borderRadius: 6,
    margin: 15,
    borderColor: "#1B73E7",
    paddingLeft: 30,
    paddingRight: 30,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  
  },
  btnText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  }
});

const SendMessage = ({ scroll, chatDB }) => {
  const { userContext } = useContext(MyContext);
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid message");
      return;
    }

    await addDoc(collection(db, `${chatDB}`), {
      text: input,
      name: userContext?.userName,
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
        <Text style={styles.btnText}>Send!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendMessage;
