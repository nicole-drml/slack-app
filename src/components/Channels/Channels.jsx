import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import "/Users/nicoledoromal/AvionSchool/slack-app/src/assets/scss/message-group.scss";

const Channels = (props) => {
  let CHANNELS = localStorage.getItem("CHANNELS")
    ? JSON.parse(localStorage.getItem("CHANNELS"))
    : [];

  const [channels, setChannels] = useState(CHANNELS);
  const [newChannel, setNewChannel] = useState("");

  const handleAddChannel = (value) => {
    setNewChannel(value);
  };

  const [newChannelInput, setNewChannelInput] = useState("");

  const [channelsActive, setChannelsActive] = useState(false);
  const [showChannelInput, setShowChannelInput] = useState(false);

  const navigate = useNavigate();
  // const [hasError, setHasError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // const fetchUsers = () => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setUsers(result);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setHasError(error);
  //       setIsLoading(true);
  //     });
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const [channel, setChannel] = useState("");

  const showConversationModal = (id) => {
    setChannel(id)
  navigate(`/dashboard/channel/${id}`);
  console.log("channel rec", channel);
  props.showCurrentLabel();
  }

  useEffect(() => {
    if (newChannelInput !== "") {
      const channel = newChannel;
      const id = new Date().getTime();
      const updatedChannels = [{ name: channel, id: id }, ...CHANNELS];
      localStorage.setItem("CHANNELS", JSON.stringify(updatedChannels));
      setChannels(updatedChannels);
      setShowChannelInput(!showChannelInput);
      setNewChannel("");
    }
  }, [newChannelInput]);

  const handleDelete = (id) => {
    const updatedChannels = channels.filter((channel) => channel.id !== id);
    setChannels(updatedChannels);
    localStorage.setItem("CHANNELS", JSON.stringify(updatedChannels));
    console.log("deleted channel", id);
  };

  const dropDown = () => {
    setChannelsActive(!channelsActive);
  };

  return (
    <div className="channels-component">
      <div className="channels-label message-group-label">
        <div
          className={"caret-icon icon " + (channelsActive ? "rotate-icon" : "")}
          onClick={dropDown}
        >
          <i
            className="fa-solid fa-caret-right"
            onClick={() => setShowChannelInput(!showChannelInput)}
          ></i>
        </div>
        <span
          className={"message-group-span " + (channelsActive ? "active" : "")}
          onClick={dropDown}
        >
          Channels
        </span>
        <div className="settings-container">
          <div className="plus-icon icon">
            <i
              className="fa-solid fa-plus"
              onClick={() => setShowChannelInput(!showChannelInput)}
            ></i>
          </div>
        </div>
      </div>
      {channelsActive && (
        <div className="conversations-list-container channels-list">
          {showChannelInput && (
            <input
              type="text"
              value={newChannel}
              onChange={(e) => handleAddChannel(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setNewChannelInput({ name: e.target.value });
                }
              }}
              placeholder="new channel"
              className="add-receiver-input-field"
            ></input>
          )}
          <ul>
            {CHANNELS.length === 0 ? (
              <span className="default-empty-span">No channels yet</span>
            ) : (
              channels.map((channel) => {
                return (
                  <li className="recepient-li" key={channel.id}>
                    <span
                      className="conversation-name"
                      onClick={() => showConversationModal(channel.id)}
                    >
                      {channel.name}
                    </span>
                    <i className="fa-solid fa-i-cursor icon"></i>
                    <i
                      className="fa-regular fa-trash-can icon"
                      onClick={() => handleDelete(channel.id)}
                    ></i>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Channels;
