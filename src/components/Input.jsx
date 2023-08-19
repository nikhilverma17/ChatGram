import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      
      // Upload image logic
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          // Handle upload error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // Update message with image
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    setText("");
    setImg(null);
  };
  
  const handleSendHi = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: "👋",
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior of the Enter key
      handleSend(); // Call the handleSend function to send the message
    }
  };

  return (
    <div className="input">
      {/* Input field for sending text messages */}
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress} // Listen for Enter key press
      />

      {/* Send button for text messages */}

      {/* Input field and send button for normal messages */}
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        /> 
        <button className="emoji" onClick={handleSendHi}>👋</button>
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>

      {/* Button to send "hi" */}
      
    </div>
  );
};

export default Input;