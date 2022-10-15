import { useEffect, useState } from "react";

import "./MessageGroup.scss";

const MessageGroup = ({ messageGroupSpan }) => {
  const [activeIcon, setActiveIcon] = useState(false);

  const dropDown = () => {
    setActiveIcon(!activeIcon);
  };

  return (
    <div className="message-group-component" onClick={dropDown}>
      <div className={"caret-icon icon " + (activeIcon ? "active-group" : "")}>
        <i className="fa-solid fa-caret-right"></i>
      </div>
      <span className={"message-group-span " + (activeIcon ? "active" : "")}>
        {messageGroupSpan}
      </span>
      <div className="settings-container">
        <div className="vertical-ellipsis-icon icon">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div className="plus-icon icon">
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  );
};

export default MessageGroup;
