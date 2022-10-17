import "./ConversationsListContainer.scss";
import { useState, useEffect } from "react";

const ConversationsListContainer = () => {
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(error);
        setIsLoading(true);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="conversations-list-container">
      <ul>
        {isLoading ? (
          <span>LOADING...</span>
        ) : (
          users.map((user) => {
            return (
              <li className="recepient-li">
                <span className="conversation-name">{user.name}</span>
                <i class="fa-solid fa-i-cursor icon"></i>
                <i class="fa-regular fa-trash-can icon"></i>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default ConversationsListContainer;
