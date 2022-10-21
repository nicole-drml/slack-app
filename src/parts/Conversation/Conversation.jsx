import { useEffect, useState } from "react";

import "./Conversation.scss";

const Conversation = (props) => {
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");
  const contentType = localStorage.getItem("content-type");

  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTypeMessage = (value) => {
    setMessage(value);
  };

  const body = {
    receiver_id: props.receiverID,
    receiver_class: props.receiverClass,
    body: message,
  };

  const postMessage = async () => {
    return await fetch("http://206.189.91.54/api/v1/messages", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": contentType,
        "access-token": accessToken,
        client,
        expiry,
        uid,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage("");
      })
      .catch((error) => {
        setError(error);
        setHasError(true);
        setIsLoading(true);
        console.log("err", error);
      });
  };

  const [conversationArray, setConversationArray] = useState([]);

  const getConversations = async () => {
    await fetch(
      `http://206.189.91.54/api/v1/messages?receiver_id=${props.receiverID}&receiver_class=${props.receiverClass}`,
      {
        method: "GET",
        headers: {
          "access-token": accessToken,
          client: client,
          expiry: expiry,
          uid: uid,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        setHasError(false);
        console.log("convo", result.data);
        setConversationArray(result.data);
      })
      .catch((error) => {
        setHasError(true);
        setError(JSON.stringify(error));
        setIsLoading(true);
        console.log("urr", error);
      });
  };

  useEffect(() => {
    console.log(props.receiverClass);
    getConversations();
  }, [props.receiverID]);

  return (
    <div className="conversation-part">
      <div className="receiver-container">
        <p>
          {" "}
          <span className="message-to-span">
            {props.receiverEmail
              ? `Direct message: ${props.receiverEmail}`
              : `Channel: ${props.channelName}`}
          </span>
        </p>
        <div className="receiver-name"></div>
        <div className="search-email-containers"></div>
      </div>
      <div className="conversation">
        {isLoading && <span>Loading...</span>}
        {hasError && <span>{error}</span>}
        <ul className="messages-list">
          {conversationArray.length === 0 ? (
            <span className="no-messages-yet-span">no messages yet</span>
          ) : (
            conversationArray.map((convesationText) => {
              return (
                <li className="message">
                  <span className="sender-span">
                    {convesationText.sender.uid}
                  </span>
                  <p className="message-text">{convesationText.body}</p>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="message-body-container">
        <input
          type="text"
          value={message}
          onChange={(e) => handleTypeMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              postMessage(e.target.value);
            }
          }}
          required="yes"
          placeholder="Start a new message"
        ></input>
        <i className="fa-regular fa-paper-plane" onClick={postMessage}></i>
      </div>
    </div>
  );
};

export default Conversation;
