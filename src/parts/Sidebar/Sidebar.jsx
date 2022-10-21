import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Sidebar.scss";

import Channels from "/Users/nicoledoromal/AvionSchool/slack-app/src/components/Channels/Channels.jsx";
import DirectMessages from "../../components/DirectMessages/DirectMessages.jsx";

const Sidebar = (props) => {
  const [currentLabelVisible, setCurrentLabelVisible] = useState(false);

  const navigate = useNavigate()


  const hideConversation = () => {
    setCurrentLabelVisible(false);
    navigate('/dashboard')
    localStorage.removeItem("RECEIVER")
  };



  const [receiverID, setReceiverID] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  return (
    <div className="sidebar-part">
      <div className="sidebar-heading">
        Nicole's Slack
        <span className="compose-message-icon">
          <i className="fa-regular fa-pen-to-square"></i>
        </span>
      </div>
      <div className="channels-dm-container">
        <Channels
        showCurrentLabel={currentLabelVisible => setCurrentLabelVisible(true)}

        /> 
        <DirectMessages
        showCurrentLabel={currentLabelVisible => setCurrentLabelVisible(true)}
        allUsers={props.allUsers}
        receiverID={receiverID}
        setReceiverID={setReceiverID}
        receiverEmail={receiverEmail}
        setReceiverEmail={setReceiverEmail}
        hideConversation={hideConversation}
        />
      </div>
      <div
        className={
          "sidebar-current-conversation " +
          (currentLabelVisible ? "visible" : "hidden")
        }
      >
        <span>{receiverID}</span>
        <div className="icon" onClick={hideConversation}>
          <i className="fa-solid fa-xmark"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
