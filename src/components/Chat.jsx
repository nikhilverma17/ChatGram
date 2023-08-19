import React, { useContext, useState } from "react"; // Import useState
import Messages from "./Messages";
import Input from "./Input";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Delete from "../img/delete.png";
import Refresh from "../img/refresh.png";

const Chat = () => {
  const { data } = useContext(ChatContext);

  // Define the messages state and the setMessages function
  const [messages, setMessages] = useState([]);

  const clearMessages = async () => {
    try {
      // Clear all messages from the Firestore document
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: [],
      });
      // Clear the local state
      setMessages([]);
    } catch (error) {
      console.error("Error clearing messages:", error);
    }
  };

  const handleRefreshPage = () => {
    window.location.reload(); // Refresh the whole page
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="user-info">
          <div className="user-status">
            <span>{data.user?.displayName}</span>
          </div>
        </div>
        <div className="chatIcons">
          {/* Move the button group here */}
          <button  onClick={clearMessages}><img src={Delete}/></button>
          <button  onClick={handleRefreshPage}><img src={Refresh}/></button>
        </div>
      </div>
      {/* Pass messages and setMessages as props */}
      <Messages messages={messages} setMessages={setMessages} />
      <Input />
    </div>
  );
};

export default Chat;
