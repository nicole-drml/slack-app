import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Sidebar.scss";

import Channels from "/Users/nicoledoromal/AvionSchool/slack-app/src/components/Channels/Channels.jsx";
import DirectMessages from "../../components/DirectMessages/DirectMessages.jsx";

import { AiOutlineUserAdd } from "react-icons/ai";

const Sidebar = (props) => {
  const allUsers = props.allUsers.data;
  const [currentLabelVisible, setCurrentLabelVisible] = useState(false);

  const navigate = useNavigate();

  const CHANNEL_MEMBERS = localStorage.getItem("CHANNEL_MEMBERS");
  const SIGNED_IN = localStorage.getItem("SIGNED_IN");

  const hideConversation = () => {
    setCurrentLabelVisible(false);
    navigate("/dashboard");
    localStorage.removeItem("RECEIVER");
  };

  const [receiverID, setReceiverID] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [signedIn, setSignedIn] = useState("");

  const [channelIsSelected, setChannelIsSelected] = useState(null);

  const [channelMembersArray, setChannelMembersArray] = useState([]);

  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
const [selectedChannelInfo, setSelectedChannelInfo] = useState("");

  const getChannelMembers = async () => {
    await fetch(`http://206.189.91.54/api/v1/channels/${receiverID}`, {
      method: "GET",
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        setHasError(false);
        setSelectedChannelInfo(result.data)
        console.log("getmembers", result.data);
        console.log("channel_members", result.data.channel_members);
        console.log("result.data.id", result.data.id);
        setChannelMembersArray(result.data.channel_members);
      })
      .catch((error) => {
        setHasError(true);
        setError(JSON.stringify(error));
        setIsLoading(true);
        console.log("urr", error);
      });
  };

  const [clickAddMember, setClickAddMember] = useState(false);
  const [channelID, setChannelID] = useState("");

  const clickAddMemberIcon = (channelID) => {
    setNewMemberAdded(false)
    setClickAddMember(!clickAddMember);
    setChannelID(channelID);
    console.log("what channelchannelID", channelID);
  };

  useEffect(() => {
    getChannelMembers();
    setClickAddMember(false);
  }, [receiverID]);

  const [newTypedMember, setNewTypedMember] = useState("");
  const [newMemberToVerify, setNewMemberToVerify] = useState("");

  const handleTypeNewMember = (value) => {
    setNewTypedMember(value);
  };

  const [enterNewMember, setEnterNewMember] = useState("");
  const [checkMembership, setCheckMembership] = useState(null);
  const [memberAlready, setMemberAlready] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState(null);

  const handleEnterNewMember = (value) => {
    setEnterNewMember(value);
    setNewMemberToVerify(
      props.allUsers.data.find((user) => user.id.toString() === value)
    );
    setCheckMembership(!checkMembership);
    setNewTypedMember("");
    console.log("entered");
    setClickAddMember(!clickAddMember)
  };

  useEffect(() => {
    setMemberAlready(
      channelMembersArray.some(
        (member) => member.user_id === newMemberToVerify.id
      )
    );
    console.log("mem?", memberAlready);
    console.log("useeffect");
    console.log("enterNewMember", enterNewMember);
    setMembershipStatus(!membershipStatus);
  }, [checkMembership]);

  const [errorMessage, setErrorMessage] = useState("");
  const [newMemberAdded, setNewMemberAdded] = useState(false);

  useEffect(() => {
    if (!memberAlready) {
      const data = {
        id: channelID,
        member_id: enterNewMember,
      };

      fetch("http://206.189.91.54/api/v1/channel/add_member", {
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
          if (result.success === false) {
            setErrorMessage(result.errors[0]);
            console.log("errorMessage", errorMessage);
          } else {
            setNewMemberAdded(true)
            getChannelMembers()
          }
        });
    }
    console.log("useeffectworked");
  }, [membershipStatus]);


  useEffect(() => {
    setSignedIn(SIGNED_IN);
    setNewMemberAdded(false)
  }, []);
  
  return (
    <div className="sidebar-part">
      <div className="sidebar-heading">{signedIn}</div>
      <div className="channels-dm-container">
        <Channels
          showCurrentLabel={(currentLabelVisible) =>
            setCurrentLabelVisible(true)
          }
          receiverID={receiverID}
          setReceiverID={setReceiverID}
          channelMembers={channelMembersArray}
          setChannelMembers={setChannelMembersArray}
          channelIsSelected={channelIsSelected}
          setChannelIsSelected={setChannelIsSelected}
          clickAddMember={clickAddMember}
          setClickAddMember={setClickAddMember}
          clickAddMemberIcon={clickAddMemberIcon}
          hideConversation={hideConversation}
          setMemberAlready={setMemberAlready}
          setNewMemberAdded={setNewMemberAdded}
          setNewMemberToVerify={setNewMemberToVerify}
          selectedChannelInfo={selectedChannelInfo}
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
          setChannelIsSelected={setChannelIsSelected}
        />
      </div>
      <div
        className={
          "sidebar-current-conversation " +
          (currentLabelVisible ? "visible " : "hidden ") +
          (channelIsSelected ? "channel " : "direct ")
        }
      >
        {channelIsSelected ? (
          <div className="channel-members-container">
            <p className="current-channel-p">CHANNEL {receiverID}</p>

            <AiOutlineUserAdd
                      className=
                        "add-user-icon icon"
                      onClick={() => clickAddMemberIcon(receiverID)}
                    />

            <br></br>
            <p className="members-p">members</p>
            {clickAddMember && (
              <input
                type="text"
                value={newTypedMember}
                onChange={(e) => handleTypeNewMember(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    // setEnterNewMember({ id: e.target.value });
                    handleEnterNewMember(e.target.value);
                  }
                }}
                placeholder="new member"
                className="add-new-member-input-field"
              ></input>
            )}
            <ul className="channel-members">
              {channelMembersArray ? (
                channelMembersArray.map((member) => {
                  return <li>{member.user_id}</li>;
                })
              ) : (
                <span>no members</span>
              )}
            </ul>
            {memberAlready && (
              <p className="member-not-valid-p">
                <span className="member-not-valid-id-span">
                  {" "}
                  {newMemberToVerify.id}{" "}
                </span>{" "}
                is already a member
              </p>
            )}            
            {newMemberAdded && (
              <p className="new-member-added-p">
                <span className="new-member-added-span">
                  {" "}
                  {newMemberToVerify.id}{" "}
                </span>{" "}
                added as new member
              </p>
            )}
          </div>
        ) : (
          <span>{receiverID}</span>
        )}

        <div className="icon" onClick={hideConversation}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
