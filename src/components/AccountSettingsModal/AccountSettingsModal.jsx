import { useNavigate } from "react-router-dom";
import "./AccountSettingsModal.scss";

const AccountSettingsModal = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.clear();
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
