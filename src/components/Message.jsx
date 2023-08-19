import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Download from "../img/download.png"

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl);
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        {/* <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        /> */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        <img src={message.img} alt="" className="message-image" />
        
        {message.img && (
              <button
                className="download-button"
                onClick={() => openImageInNewTab(message.img)}
              >
                <img src={Download} alt="" className="download" />
              </button>
        )}
      </div>
    </div>
  );
};

export default Message;
