import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountSettingsModal from "../../components/AccountSettingsModal/AccountSettingsModal.jsx";

import "./Header.scss";
import logo from "../../assets/images/slack_mark.png";
import avatar from "../../assets/images/CryptoFluff_0026.jpg";

const Header = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);

  const logoClick = () => {
    navigate("/");
  };

  return (
    <div className="header-part">
      <img src={logo} className="img-logo" onClick={logoClick}></img>
      <span className="slack-span">Slack</span>
      <img
        src={avatar}
        className="img-avatar"
        onClick={() => {
          setShowModal(!showModal);
          setActive(!active);
        }}
      ></img>
      {showModal && <AccountSettingsModal />}
    </div>
  );
};

export default Header;
