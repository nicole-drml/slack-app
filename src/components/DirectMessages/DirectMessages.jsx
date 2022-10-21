import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Conversation from "../../parts/Conversation";

import "/Users/nicoledoromal/AvionSchool/slack-app/src/assets/scss/message-group.scss";

const DirectMessages = (props) => {
  const DIRECT_MESSAGES = localStorage.getItem("DIRECT_MESSAGES")
    ? JSON.parse(localStorage.getItem("DIRECT_MESSAGES"))
    : [];

  const addCredentials = (key, value) => {
    localStorage.setItem(key, value);
  };
  const RECEIVER = JSON.parse(localStorage.getItem("RECEIVER"));

  const [contacts, setContacts] = useState(DIRECT_MESSAGES);
  const [newContact, setNewContact] = useState("");

  const [enterNewContact, setEnterNewContact] = useState("");
  const [directActive, setDirectActive] = useState(false);
  const [showReceiverInput, setShowReceiverInput] = useState(false);

  const navigate = useNavigate();

  const handleAddReceiver = (value) => {
    setNewContact(value);
  };

  const handleSelectReceiver = async (id) => {
    const usersAPI = props.allUsers.data;
    let receiver = usersAPI.filter((user) => user.email === id);

    if (receiver.length > 0) {
      addCredentials("RECEIVER", JSON.stringify(receiver));
      props.showCurrentLabel();
      props.setReceiverID(receiver[0].id);
      props.setReceiverEmail(receiver[0].email);
      navigate(`/dashboard/direct/${id}/${receiver[0].id}`);
    } else if (receiver.length === 0) {
      props.hideConversation(true);
      alert(`"${id}" user does not exist`);
    }
  };

  useEffect(() => {
    if (enterNewContact !== "") {
      const receiver = newContact;
      const id = JSON.stringify(new Date().getTime());
      const updated = [{ name: receiver, id: id }, ...DIRECT_MESSAGES];
      localStorage.setItem("DIRECT_MESSAGES", JSON.stringify(updated));
      setContacts(updated);
      setShowReceiverInput(!showReceiverInput);
      setNewContact("");
    }
  }, [enterNewContact]);

  const handleDelete = (id) => {
    const updatedcontacts = contacts.filter((receiver) => receiver.id !== id);
    setContacts(updatedcontacts);
    localStorage.setItem("DIRECT_MESSAGES", JSON.stringify(updatedcontacts));
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
              value={newContact}
              onChange={(e) => handleAddReceiver(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setEnterNewContact({ name: e.target.value });
                }
              }}
              placeholder="new message"
              className="add-receiver-input-field"
            ></input>
          )}
          <ul>
            {DIRECT_MESSAGES.length === 0 ? (
              <span className="default-empty-span">No messages yet</span>
            ) : (
              contacts.map((receiver) => {
                return (
                  <li className="recepient-li" key={receiver.id}>
                    <span
                      className="conversation-name"
                      onClick={() => handleSelectReceiver(receiver.name)}
                    >
                      {receiver.name}
                    </span>
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
        <Routes>
          <Route
            path="direct/:receiverEmail/:receiverID"
            element={
              <Conversation
                allUsers={props.allUsers}
                receiverID={props.receiverID}
                setReceiverID={props.setReceiverID}
                receiverEmail={props.receiverEmail}
                setReceiverEmail={props.setReceiverEmail}
                receiverClass="User"
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default DirectMessages;
