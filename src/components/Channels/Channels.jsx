import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Conversation from "../../parts/Conversation";

import "/Users/nicoledoromal/AvionSchool/slack-app/src/assets/scss/message-group.scss";

import { AiOutlineUserAdd } from "react-icons/ai";


const Channels = (props) => {
  // let CHANNELS = localStorage.getItem("CHANNELS")
  //   ? JSON.parse(localStorage.getItem("CHANNELS"))
  //   : [];

  const addCredentials = (key, value) => {
    localStorage.setItem(key, value);
  };

  const RECEIVER = JSON.parse(localStorage.getItem("RECEIVER"));
  const CHANNELS = JSON.parse(localStorage.getItem("CHANNELS"));

  const [channels, setChannels] = useState([]);
  const [newChannel, setNewChannel] = useState("");

  const [enterNewChannel, setenterNewChannel] = useState("");
  const [channelName, setChannelName] = useState("")

  const [channelsActive, setChannelsActive] = useState(false);
  const [showChannelInput, setShowChannelInput] = useState(false);

  const navigate = useNavigate();
  // const [channelID, setChannelI] = useState("");

  const handleAddChannel = (value) => {
    setNewChannel(value);
  };

  const [selectedChannel, setSelectedChannel] = useState("");

  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");
  const contentType = localStorage.getItem("content-type");

  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const renderAllChannels = async () => {
    setChannelsActive(!channelsActive);

    return await fetch("http://206.189.91.54/api/v1/channels", {
      method: "GET",
      headers: {
        "Content-Type": contentType,
        "access-token": accessToken,
        client,
        expiry,
        uid,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setMessage("");
        setChannels(result.data);
        addCredentials("CHANNELS", JSON.stringify(result.data));
      })
      .catch((error) => {
        setError(error);
        setHasError(true);
        setIsLoading(true);
        console.log("err", error);
      });
  };

  // const [channelID, setChannelID] = useState("");

  const handleSelectChannel = (channel, id) => {
    addCredentials("RECEIVER", JSON.stringify(channel));
    setSelectedChannel(channel);
    props.setReceiverID(id);
    props.showCurrentLabel();
    setChannelName(channel.name)
    console.log("id", id);

    console.log("the channel", channel);
    console.log("channel.name", channel.name);
    console.log("channel.id", channel.id);

    navigate(`/dashboard/channel/${channel.name}/${channel.id}`);
  };



  // useEffect(() => {

  // }, [])

  return (
    <div className="channels-component">
      <div className="channels-label message-group-label">
        <div
          className={"caret-icon icon " + (channelsActive ? "rotate-icon" : "")}
          onClick={renderAllChannels}
        >
          <i
            className="fa-solid fa-caret-right"
            onClick={() => setShowChannelInput(!showChannelInput)}
          ></i>
        </div>
        <span
          className={"message-group-span " + (channelsActive ? "active" : "")}
          onClick={renderAllChannels}
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
              // onKeyPress={(e) => {
              //   if (e.key === "Enter") {
              //     setAddMembers({ name: e.target.value });
              //   }
              // }}
              placeholder="new channel"
              className="add-receiver-input-field"
            ></input>
          )}
          <ul>
            {CHANNELS.length === 0 ? (
              <span className="default-empty-span">No channels yet</span>
            ) : (
              CHANNELS.map((channel) => {
                return (
                  <li className="recepient-li" key={channel.id}>
                    <span
                      className="conversation-name"
                      onClick={() => handleSelectChannel(channel, channel.id)}
                    >
                      {channel.name}
                    </span>
                    {/* <i class="fa-regular fa-user-plus icon"></i> */}
                    <AiOutlineUserAdd className="add-user-icon icon" />
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
      {RECEIVER && (
        <Routes>
          <Route
            path="channel/:channelName/:channelID"
            element={
              <Conversation
                allUsers={props.allUsers}
                receiverID={props.receiverID}
                setReceiverID={props.setReceiverID}
                channelName={channelName}
                receiverClass="Channel"
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default Channels;
