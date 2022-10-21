import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Sidebar.scss";

import Channels from "/Users/nicoledoromal/AvionSchool/slack-app/src/components/Channels/Channels.jsx";
import DirectMessages from "../../components/DirectMessages/DirectMessages.jsx";

const Sidebar = (props) => {
  const [currentLabelVisible, setCurrentLabelVisible] = useState(false);

  const navigate = useNavigate();

  const SIGNED_IN = localStorage.getItem("SIGNED_IN")

  const hideConversation = () => {
    setCurrentLabelVisible(false);
    navigate("/dashboard");
    localStorage.removeItem("RECEIVER");
  };

  const [receiverID, setReceiverID] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");  
  const [signedIn, setSignedIn] = useState("");  
  
  useEffect(() => {
    setSignedIn(SIGNED_IN)
    }, [])
  
  return (
    <div className="sidebar-part">
      <div className="sidebar-heading">
       {signedIn}
      </div>
      <div className="channels-dm-container">
        <Channels
          showCurrentLabel={(currentLabelVisible) =>
            setCurrentLabelVisible(true)
          }
          receiverID={receiverID}
          setReceiverID={setReceiverID}
          hideConversation={hideConversation}
        />
        <DirectMessages
          showCurrentLabel={(currentLabelVisible) =>
            setCurrentLabelVisible(true)
          }
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
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
