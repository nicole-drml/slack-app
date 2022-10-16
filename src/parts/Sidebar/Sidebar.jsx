import { useState, useEffect } from "react";
import "./Sidebar.scss";

import Channels from "/Users/nicoledoromal/AvionSchool/slack-app/src/components/Channels/Channels.jsx";
import ChannelsList from "/Users/nicoledoromal/AvionSchool/slack-app/src/components/ChannelsList/ChannelsList.jsx";
import DirectMessages from "../../components/DirectMessages/DirectMessages.jsx";
import DirectMessagesList from "/Users/nicoledoromal/AvionSchool/slack-app/src/components/DirectMessagesList/DirectMessagesList.jsx";
const Sidebar = () => {
  const [conversationVisible, setConversationVisible] = useState(true);

  const hideConversation = () => {
    setConversationVisible(!conversationVisible);
  };

  const [channelsActive, setChannelsActive] = useState(false);
  const [directActive, setDirectActive] = useState(false);

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
          channelsActive={channelsActive}
          setChannelsActive={setChannelsActive}
        />
        {channelsActive && <ChannelsList />}
        <DirectMessages
          directActive={directActive}
          setDirectActive={setDirectActive}
        />
        {directActive && <DirectMessagesList />}
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
