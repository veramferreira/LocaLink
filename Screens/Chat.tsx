import React, { useState, useEffect, useRef } from "react";
import Message from "../comp/messageComp/Message";
import { db } from "../config/firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import SendMessage from "../comp/messageComp/SendMessage";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
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

const Chat = () => {
  const chatDB = "messages";
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, `${chatDB}`), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages: any = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text>
          {messages &&
            messages.map((message) => {
              return <Message key={message.id} message={message} />;
            })}
        </Text>
        <SendMessage scroll={scroll} chatDB={chatDB} />
      </View>
    </ScrollView>
  );
};

export default Chat;
