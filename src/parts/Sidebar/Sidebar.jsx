import "./Sidebar.scss";
import Channels from "/Users/nicoledoromal/AvionSchool/slack-app/src/components/Channels/Channels.jsx";
import DirectMessages from "../../components/DirectMessages/DirectMessages.jsx";

const Sidebar = () => {
  return (
    <div className="sidebar-part">
      <div className="sidebar-heading">
        Nicole's Slack
        <span className="compose-message-icon">
          <i className="fa-regular fa-pen-to-square"></i>
        </span>
      </div>
      <div className="channels-dm-container">
        <Channels />
        <DirectMessages />
      </div>
    </div>
  );
};

export default Sidebar;
