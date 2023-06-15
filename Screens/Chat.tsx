import React, { useState, useEffect, useRef } from "react";
import Message from "../comp/messageComp/Message";
import { db } from "../config/firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import SendMessage from "../comp/messageComp/SendMessage";

const style = {
  main: `flex flex-col p-[10px] relative overflow-y-scroll max-h-[85%]`,
};

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
    <>
      <main className={style.main}>
        {messages &&
          messages.map((message) => {
            return <Message key={message.id} message={message} />;
          })}
        <span ref={scroll}></span>
      </main>
      <SendMessage chatDB={chatDB} scroll={scroll} />
    </>
  );
};

export default Chat;
