import { useState, useEffect } from "react";
import "./Sidebar.scss";
import Channels from "/Users/nicoledoromal/AvionSchool/slack-app/src/components/Channels/Channels.jsx";
import DirectMessages from "../../components/DirectMessages/DirectMessages.jsx";

const Sidebar = () => {
  const [conversationVisible, setConversationVisible] = useState(true);

  const hideConversation = () => {
    setConversationVisible(!conversationVisible);
  };


  return (
    <div className="sidebar-part">
      <div className="sidebar-heading">
        Nicole's Slack
        <span
          className="compose-message-icon"
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </span>

      </div>
      <div className="channels-dm-container">
        <Channels />
        <DirectMessages />
      </div>
      <div
        className={
          "sidebar-current-conversation " +
          (conversationVisible ? "visible" : "hidden")
        }
      >
        <span>Angela</span>
        <div className="icon" onClick={hideConversation}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
