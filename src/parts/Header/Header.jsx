import "./Header.scss";
import logo from "/Users/nicoledoromal/AvionSchool/slack-app/src/assets/images/slack_mark.png"
import avatar from "/Users/nicoledoromal/AvionSchool/slack-app/src/assets/images/CryptoFluff_0026.jpg";

const Header = () => {
  return (
    <div className="header-part">
      <img src={logo} className="img-logo" ></img>
      <img src={avatar} className="img-avatar" ></img>
    </div>
  );
};

export default Header;
