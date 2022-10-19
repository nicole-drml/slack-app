import { useEffect, useState } from "react";

import "./Conversation.scss";

const Conversation = (props) => {
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");
  const contentType = localStorage.getItem("content-type");

  const RECEIVER = localStorage.getItem("RECEIVER")



const [error, setError] = useState("");
const [hasError, setHasError] = useState(false);
const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);
  
  const handleTypeMessage = (value) => {
    setMessage(value);
  };

  const body = {
    receiver_id: 2800,
    receiver_class: "User",
    body: message
  };

  const postMessage = async () => {
    return await fetch("http://206.189.91.54/api/v1/messages", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        client,
        expiry,
        uid,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage("")
      })
      .catch((error) => {
        setError(error);
        setHasError(true);
        setIsLoading(true);
        console.log("err", error);
      });
  };

  return (
    <div className="conversation-part">
      <div className="receiver-container"
      >
        <p
        >To: <span className="message-to-span">{RECEIVER}</span></p>
        <div className="receiver-name">
        </div>
        <div className="search-email-containers">
        </div>
      </div>
      <div className="conversation">
        {isLoading && <span>Loading...</span>}
        {hasError && <span>{error}</span>}
      </div>
      <div className="message-body-container">
        <input
          type="text"
          value={message}
          onChange={(e) => handleTypeMessage(e.target.value)}
        //   onKeyPress={(e) => {
        //     eslint-disable-next-line 
        //     if (e.key === "Enter") {postMessage}
        //   }}
          required="yes"
          placeholder="Start a new message"
        ></input>
        <i className="fa-regular fa-paper-plane" onClick={postMessage}></i>
      </div>
    </div>
  );
};

export default Conversation;
