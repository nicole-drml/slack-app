import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Conversation from "../../parts/Conversation";
import Channels from "../Channels/Channels";

import "/Users/nicoledoromal/AvionSchool/slack-app/src/assets/scss/message-group.scss";

const DirectMessages = (props) => {
  const DIRECT_MESSAGES = localStorage.getItem("DIRECT_MESSAGES")
    ? JSON.parse(localStorage.getItem("DIRECT_MESSAGES"))
    : [];

  const addCredentials = (key, value) => {
    localStorage.setItem(key, value);
  };
  const RECEIVER = localStorage.getItem("RECEIVER");


  const [receivers, setReceivers] = useState(DIRECT_MESSAGES);
  const [newReceiver, setNewReceiver] = useState("");

  const [enterNewReceiver, setEnterNewReceiver] = useState("");
  const [directActive, setDirectActive] = useState(false);
  const [showReceiverInput, setShowReceiverInput] = useState(false);

  const navigate = useNavigate();


  const handleAddReceiver = (value) => {
    setNewReceiver(value);
  };

  const handleSelectReceiver = (id) => {
    addCredentials("RECEIVER", id);
    props.showCurrentLabel();
    navigate(`/dashboard/direct/${id}`);
  };

  useEffect(() => {
    if (enterNewReceiver !== "") {
      const receiver = newReceiver;
      const id = JSON.stringify(new Date().getTime());
      const updated = [{ name: receiver, id: id }, ...DIRECT_MESSAGES];
      localStorage.setItem("DIRECT_MESSAGES", JSON.stringify(updated));
      setReceivers(updated);
      setShowReceiverInput(!showReceiverInput);
      setNewReceiver("");
    }
  }, [enterNewReceiver]);

  const handleDelete = (id) => {
    const updatedReceivers = receivers.filter((receiver) => receiver.id !== id);
    setReceivers(updatedReceivers);
    localStorage.setItem("DIRECT_MESSAGES", JSON.stringify(updatedReceivers));
    console.log("deleted DM", id);
  };

  const dropDown = () => {
    setDirectActive(!directActive);
  };

  return (
    <div className="direct-messages-component">
      <div className="direct-messages-label message-group-label">
        <div
          className={"caret-icon icon " + (directActive ? "rotate-icon" : "")}
          onClick={dropDown}
        >
          <i className="fa-solid fa-caret-right"></i>
        </div>
        <span
          className={"message-group-span " + (directActive ? "active" : "")}
          onClick={dropDown}
        >
          Direct Messages
        </span>
        <div className="settings-container">
          <div className="plus-icon icon">
            <i
              className="fa-solid fa-plus"
              onClick={() => setShowReceiverInput(!showReceiverInput)}
            ></i>
          </div>
        </div>
      </div>
      {directActive && (
        <div className="conversations-list-container direct-list">
          {showReceiverInput && (
            <input
              type="text"
              value={newReceiver}
              onChange={(e) => handleAddReceiver(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setEnterNewReceiver({ name: e.target.value });
                }
              }}
              placeholder="new message"
              className="add-receiver-input-field"

              //   type="email"
              //     value={receiver}
              //     onKeyPress={(e) => {
              //       if (e.key === "Enter") {
              //         enterReceiverValue({ name: e.target.value });
              //       }
              //   //   }}
              //   className="receiver-input"
              //   placeholder="receiver@email.com"
              //   autoFocus="yes"
              //   onClick={fetchUsers}
            ></input>
          )}
          <ul>
            {DIRECT_MESSAGES.length === 0 ? (
              <span className="default-empty-span">No messages yet</span>
            ) : (
              receivers.map((receiver) => {
                return (
                  <li
                    className="recepient-li"
                    key={receiver.id}
                    // onClick={() => openMessage(receiver.id)}
                  >
                    <span
                      className="conversation-name"
                      onClick={() => handleSelectReceiver(receiver.name)}
                    >
                      {receiver.name}
                    </span>
                    <i className="fa-solid fa-i-cursor icon"></i>
                    <i
                      className="fa-regular fa-trash-can icon"
                      onClick={() => handleDelete(receiver.id)}
                    ></i>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
      {RECEIVER && (
        <Conversation
        allUsers={props.allUsers}
        // id={props.setReceiverName=()=>{}}
        />
      )}
      {/* <Routes >
        <Route index element={ <Conversation/> } />
        <Route path="dashboard/:email" 
        element=<C
        />
      </Routes> */}
    </div>
  );
};

export default DirectMessages;
