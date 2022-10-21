import { useEffect, useState } from "react";

import "./Conversation.scss";

const Conversation = (props) => {
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");
  const contentType = localStorage.getItem("content-type");

  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTypeMessage = (value) => {
    setMessage(value);
  };

  const body = {
    receiver_id: props.receiverID,
    receiver_class: "User",
    body: message,
  };

  const postMessage = async () => {
    return await fetch("http://206.189.91.54/api/v1/messages", {
      method: "POST",
      body: JSON.stringify(body),
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
        console.log("sent message to", props.receiverID);
      })
      .catch((error) => {
        setError(error);
        setHasError(true);
        setIsLoading(true);
        console.log("err", error);
      });
  };

  // const emailsfromusers = () => {
  // const convoEmails = props.allUsers.forEach((user) => user.email)
  // setConvoEmails(convoEmails)
  // console.log("convo emails", convoEmails)
  // }

  const [conversationArray, setConversationArray] = useState([])
  const [showConversation, setShowConversation] = useState([])
  
  const getConversations = async () => {
    await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=${props.receiverID}&receiver_class=User&`, {
      method: "GET",
      headers: {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid,
      },
    })
      .then(async (response) => await response.json())
      .then((result) => {
        // setMessages(result);
        setIsLoading(false);
        setHasError(false);
        setConversationArray(result.data)
        console.log("convo", result);
        console.log("convo sender", result.data[0].sender);
        console.log("convo senderUID", result.data[0].sender.uid);
        console.log("props.receiverID", props.receiverID);
        // console.log("0", allUsers.data[0]);
        // console.log("thisisit", allUsers);
        // console.log(".data", allUsers.data);
        // console.log(".zero,email", allUsers.data[0].email);
      })
      .catch((error) => {
        setHasError(true);
        setError(JSON.stringify(error));
        setIsLoading(true);
        console.log("urr", error);
      });
  };

  useEffect(() => {
    console.log("please render convo");
    getConversations()
  }, [props.receiverID]);

  const mockConvo = [
    {
      message:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, qui voluptatibus. Quae beatae mollitia quasi sed officia cupiditate, impedit suscipit, excepturi voluptates velit cumque facilis dolore odit? Deleniti consequatur officia non ipsam vel voluptatem cum quisquam recusandae commodi! Earum blanditiis, enim minima nobis explicabo quo aspernatur id modi! Nulla expedita quae veniam voluptate minima, error, saepe, tempora dolorem quidem voluptatibus maiores quis nihil quisquam eum! Ipsam cum fugiat commodi consequuntur quis voluptatem assumenda distinctio autem dicta magni perferendis voluptate, soluta optio reprehenderit adipisci rerum amet molestias praesentium ex et, eaque impedit tempora. Quia id aut laboriosam corporis quos quae nulla magnam harum reiciendis voluptate rem dolores beatae fugiat aliquid architecto pariatur ullam aliquam culpa quidem sint neque inventore, quibusdam maiores. Neque, assumenda illo labore impedit, similique inventore minus dolorum fugit non autem dignissimos provident voluptatum doloribus et rem nam ex possimus dolor deleniti cum. Ducimus maxime quibusdam esse dignissimos delectus itaque rem! Deleniti dolorum, velit doloremque provident voluptas expedita fugit corrupti alias rerum dolores sint delectus necessitatibus voluptates ipsa magni ut unde totam reprehenderit, tenetur nobis vitae cum voluptatum. Eos iure quis eligendi? Quod optio voluptates cum alias et fuga repudiandae asperiores. In cum sit amet officia impedit minus, dolor facere laborum autem, eius placeat fugiat qui repellat cumque incidunt ratione quasi culpa. Sunt, beatae natus! Architecto culpa, expedita maxime ipsam eum, autem accusantium totam voluptatem explicabo cumque quos eligendi repudiandae placeat sed consequatur eius quam ipsum? Iusto incidunt aperiam fugiat praesentium reprehenderit, dolorem repudiandae architecto eaque. Distinctio nostrum fugit, quaerat atque magni laudantium quasi. Distinctio amet veniam quas at aliquid nisi, rem laborum voluptatem aspernatur error fugit illo? Unde, doloremque qui reiciendis consequatur recusandae non dolorem fugiat culpa dicta ullam temporibus enim architecto autem dolorum saepe vitae cum error nihil quam illum tenetur. Veniam ea ipsam eius quibusdam aspernatur.",
        sender:
    "me po"
      },
    { message: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",   sender:
    "me po" },
    
    {
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis temporibus doloribus quia quas numquam corrupti.",
   sender:
   "me po" },
    {
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat adipisci ea reprehenderit saepe inventore doloribus cumque voluptate ullam, ratione nam, consequuntur molestiae, id eum in iste molestias animi dignissimos nemo. Veritatis omnis recusandae ratione, dolorem unde assumenda explicabo laboriosam eligendi, corporis delectus nesciunt commodi eius. Placeat dolore repellendus qui. Aperiam suscipit quibusdam cumque necessitatibus ipsum hic ea, et optio fugit quos delectus eum. Accusamus voluptatibus est, natus ea, voluptas maxime molestias facilis totam dolorem provident necessitatibus iure cupiditate eos dolorum suscipit nobis aliquam itaque aspernatur voluptatum id ex facere ipsa laudantium? Ut fuga aliquid recusandae optio. Iure facere officiis ipsum.",
        sender:
        "me po"},
    { message: "lorem",   sender:
    "me po" },
    { message: "Lorem ipsum dolor sit.",   sender:
    "me po" },
    {
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, nulla?",   sender:
        "me po"
    },
    {
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo consectetur dicta accusantium quaerat enim aperiam magnam dolore ad, voluptatem quidem. Nesciunt nostrum blanditiis sapiente quas quaerat laborum, vitae autem doloremque temporibus adipisci, dignissimos quos minus eum harum fugiat possimus veritatis corporis officia consectetur voluptas magnam? Saepe quaerat ipsam consectetur impedit.",
        sender:
        "me po"},
    {
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta alias pariatur magnam esse natus. Saepe laboriosam facilis voluptatibus aliquid voluptatem.",
        sender:
        "me po"
    },
  ];
  return (
    <div className="conversation-part">
      <div className="receiver-container">
        <p>
          To:{" "}
          <span className="message-to-span">
            {`${props.receiverEmail} (${props.receiverID})`}
          </span>
        </p>
        <div className="receiver-name"></div>
        <div className="search-email-containers"></div>
      </div>
      <div className="conversation">
        {isLoading && <span>Loading...</span>}
        {hasError && <span>{error}</span>}
        <ul className="messages-list">
          {mockConvo.lenth === 0 ? (
            <span>no messages yet</span>
          ) : (
            conversationArray.map((convesationText) => {
              return (
                <li className="message">
                <span className="sender-span">{convesationText.sender.uid}</span>
                  <p className="message-text">{convesationText.body}</p>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="message-body-container">
        <input
          type="text"
          value={message}
          onChange={(e) => handleTypeMessage(e.target.value)}
          //   onKeyPress={(e) => {
          //     eslint-disable-next-line
          //     if (e.key === "Enter") {postMessage}
          //   }}
          required="yes"
          placeholder="Start a new message"
        ></input>
        <i className="fa-regular fa-paper-plane" onClick={postMessage}></i>
      </div>
    </div>
  );
};

export default Conversation;
