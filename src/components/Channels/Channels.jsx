import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Conversation from "../../parts/Conversation/Conversation.jsx";

import "../../assets/scss/message-group.scss";

const Channels = (props) => {
  const navigate = useNavigate();
  const addCredentials = (key, value) => {
    localStorage.setItem(key, value);
  };
  const RECEIVER = JSON.parse(localStorage.getItem("RECEIVER"));
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");
  const contentType = localStorage.getItem("content-type");

  const [channels, setChannels] = useState(null);
  const [typedChannel, setTypedChannel] = useState("");
  const [channelName, setChannelName] = useState("");
  const [enterNewChannel, setenterNewChannel] = useState("");
  const [channelsActive, setChannelsActive] = useState(false);
  const [showChannelInput, setShowChannelInput] = useState(false);
  const [channelExists, setChannelExists] = useState(false);
  const [enteredValue, setEnteredValue] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("");

  const handleTypeNewChannel = (value) => {
    setTypedChannel(value);
  };

  const showInput = () => {
    setShowChannelInput(!showChannelInput);
    setTypedChannel("");
    setChannelExists(false);
    setenterNewChannel("");
  };

  const handleEnterNewChannel = (value) => {
    setenterNewChannel(value);
    if (props.selectedChannelInfo) {
      setChannelExists(
        props.selectedChannelInfo.find(
          (channel) => channel.name.toString() === value.toString()
        )
      );
    }
    setEnteredValue(true);
    setShowChannelInput(false);
  };

  useEffect(() => {
    const data = {
      name: enterNewChannel,
      user_ids: [],
    };

    if (!channelExists) {
      fetch("http://206.189.91.54/api/v1/channels", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "access-token": accessToken,
          client: client,
          expiry: expiry,
          uid: uid,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          renderAllChannels();
          setShowChannelInput(false);
        });
    }
    setTypedChannel("");
  }, [enterNewChannel]);

  const renderAllChannels = async () => {
    setChannelsActive(!channelsActive);
    setChannelExists(false);

    await fetch("http://206.189.91.54/api/v1/channels", {
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
        setChannels(result.data);
      });
  };

  const handleSelectChannel = (channel, id) => {
    addCredentials("RECEIVER", JSON.stringify(channel));
    setSelectedChannel(channel);
    props.setReceiverID(id);
    props.showCurrentLabel();
    setChannelName(channel.name);
    props.setMemberAlready(false);
    props.setChannelIsSelected(true);
    navigate(`/dashboard/channel/${channel.name}/${channel.id}`);
    props.setNewMemberAdded(false);
    props.setNewMemberToVerify("");
  };

  return (
    <div className="channels-component">
      <div className="channels-label message-group-label">
        <div
          className={"caret-icon icon " + (channelsActive ? "rotate-icon" : "")}
          onClick={renderAllChannels}
        >
          <i className="fa-solid fa-caret-right icon"></i>
        </div>
        <span
          className={"message-group-span " + (channelsActive ? "active" : "")}
          onClick={renderAllChannels}
        >
          Channels
        </span>
        <div className="settings-container">
          <div className="plus-icon icon">
            <i className="fa-solid fa-plus icon" onClick={showInput}></i>
          </div>
        </div>
      </div>
      {channelsActive && (
        <div className="conversations-list-container channels-list">
          {channelExists && (
            <div className="channel-alrady-exists">
              <span>{enterNewChannel} already exists</span>
            </div>
          )}
          {showChannelInput && (
            <input
              type="text"
              value={typedChannel}
              onChange={(e) => handleTypeNewChannel(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleEnterNewChannel(e.target.value);
                  setTypedChannel("");
                }
              }}
              placeholder="new channel"
              className="add-receiver-input-field"
            ></input>
          )}
          <ul>
            {!channels ? (
              <span className="default-empty-span">No channels yet</span>
            ) : (
              channels.map((channel) => {
                return (
                  <li className="recepient-li" key={channel.id}>
                    <span
                      className="conversation-name"
                      onClick={() => handleSelectChannel(channel, channel.id)}
                    >
                      {channel.name}
                    </span>
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
