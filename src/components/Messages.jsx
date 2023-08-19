// Messages.js

import React, { useContext, useEffect } from "react"; // Import useEffect
import { ChatContext } from "../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore"; // Import onSnapshot and doc
import { db } from "../firebase";
import Message from "./Message";

const Messages = ({ messages, setMessages }) => { // Accept messages and setMessages as props
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId, setMessages]); // Add setMessages to the dependency array

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
