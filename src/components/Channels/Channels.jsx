import MessageGroup from "../MessageGroup";

const Channels = ({ channelsActive, setChannelsActive }) => {
  return (
    <div className="channels-component">
      <MessageGroup
        messageGroupSpan={"Channels"}
        activeComponent={channelsActive}
        setActiveComponent={setChannelsActive}
      />
    </div>
  );
};

export default Channels;
