import React, { useState, useEffect, useRef, useContext } from "react";
import Message from "../comp/messageComp/Message";
import { db } from "../config/firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import SendMessage from "../comp/messageComp/SendMessage";
import { MyContext } from "../Context";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    borderColor: "red",
  },
});

const GeneralChat = () => {
  const { userContext } = useContext(MyContext);
  const chatDB = `${userContext.communityName}GeneralChat`;
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, `${chatDB}`), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages: any = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, [userContext]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.message}>
          {messages &&
            messages.map((message) => {
              return <Message key={message.id} message={message} />;
            })}
          <SendMessage scroll={scroll} chatDB={chatDB} />
        </View>
      </ScrollView>
    </View>
  );
};

export default GeneralChat;
