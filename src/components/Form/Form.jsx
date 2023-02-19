import { useNavigate } from "react-router-dom";
import "./Form.scss";
import logoWithText from "../../src/assets/images/slack_with_text.png";

const Form = ({
  formTitle,
  buttonText,
  confirmPassword,
  onSubmit,
  email,
  password,
  passwordConfirmation,
  setEmail,
  setPassword,
  setPasswordConfirmation,
  errorMessage
}) => {
  const navigate = useNavigate()
  
  const handleEmail = (value) => {
    setEmail(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handlePasswordConfirmation = (value) => {
    setPasswordConfirmation(value);
  };

  return (
    <div className='form'>
      <form onSubmit={onSubmit}>
        <img src={logoWithText} 
        onClick={() => {
          navigate('/')
        }}/>
        <h1>{formTitle}</h1>
        <h4>
          We suggest using the <span>email address you use at work. </span>{" "}
        </h4>
        <input
          type="email"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
          placeholder="name@work-email.com"
          className='input-email'
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          placeholder="password"
          className='input-password'
        ></input>
        {confirmPassword && (
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => handlePasswordConfirmation(e.target.value)}
            placeholder="confirm password"
            className='input-confirm-password'
          ></input>
        )}
        <button text="{button-text}">{buttonText}</button>
        {errorMessage && <span className="error-message">{ errorMessage }</span>}
      </form>
    </div>
  );
};

export default Form;
