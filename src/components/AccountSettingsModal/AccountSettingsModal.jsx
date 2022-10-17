import { useNavigate } from "react-router-dom";
import "./AccountSettingsModal.scss";

const AccountSettingsModal = () => {
  const navigate = useNavigate();

  let removeResponseHeaders = [
    "access-token",
    "client",
    "expiry",
    "cache-control",
    "content-type",
    "token-type",
    "uid",
  ];

  const signOut = () => {
    localStorage.removeItem("SIGNED_IN");
    for (let header of removeResponseHeaders) {
      localStorage.removeItem(header);
    }
    navigate("/");
  };

  return (
    <div className="account-settings-modal">
      <div className="sign-out-container container" onClick={signOut}>
        <span>Sign out</span>
        <i className="fa-solid fa-right-from-bracket"></i>
      </div>
    </div>
  );
};

export default AccountSettingsModal;
