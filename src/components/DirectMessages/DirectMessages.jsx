import MessageGroup from "../MessageGroup";

const DirectMessages = ({ directActive, setDirectActive }) => {
  return (
    <div className="direct-messages-component">
      <MessageGroup
        messageGroupSpan={"Direct Messages"}
        activeComponent={directActive}
        setActiveComponent={setDirectActive}
      />
    </div>
  );
};

export default DirectMessages;
