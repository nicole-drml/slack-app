import "./ConversationsListContainer.scss"

const ConversationsListContainer = () => {
    const CONVERSATIONS = [
        {name: "Sab", age: 24},
        {name: "Emma", age: 20},
        {name: "Alex", age: 17},
        {name: "Sarina", age: 24},
        {name: "Ella", age: 20},
        {name: "Andre", age: 17},
        {name: "thequickbronwfoxjumpsoverthelazy", age: 24},
        {name: "Ysa", age: 20},
        {name: "Olivia", age: 17}
    ]

    return ( 
        <div className="conversations-list-container">
            <ul>
                {CONVERSATIONS.map((conversation) => {
                    return (<li>
                        <span className="conversation-name">{conversation.name}</span>
                        </li>)
                })}
            </ul>
        </div>
     );
}
 
export default ConversationsListContainer;