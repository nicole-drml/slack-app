import "./MessageGroup.scss";

const MessageGroup = ({
  messageGroupSpan,
  activeComponent,
  setActiveComponent,
}) => {
  const dropDown = () => {
    setActiveComponent(!activeComponent);
  };

  return (
    <div className="message-group-component" onClick={dropDown}>
      <div
        className={"caret-icon icon " + (activeComponent ? "rotate-icon" : "")}
      >
        <i className="fa-solid fa-caret-right"></i>
      </div>
      <span
        className={"message-group-span " + (activeComponent ? "active" : "")}
      >
        {messageGroupSpan}
      </span>
      <div className="settings-container">
        <div className="plus-icon icon">
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  );
};

export default MessageGroup;
