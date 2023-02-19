import "./NotFound.scss";
import { useNavigate } from "react-router-dom";

import logoGif from "../../assets/images/slack_animation.gif";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <img
        src={logoGif}
        onClick={() => {
          navigate("/");
        }}
      />
      <h1>Page Not Found</h1>
      <span>(click on the logo to go back to home page)</span>
    </div>
  );
};

export default NotFound;
