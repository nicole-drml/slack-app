import "./MessageGroup.scss"

const MessageGroup = ({
    messageGroupSpan
}) => {
    return ( 
        <div className="message-group-component">
          <div className="caret-icon icon">
            <i className="fa-solid fa-caret-right"></i>
          </div>
          <span className="message-group-span">{messageGroupSpan}</span>
          <div className="settings-container">
            <div className="vertical-ellipsis-icon icon">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
            <div className="plus-icon icon">
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
        </div> );
}
 
export default MessageGroup;