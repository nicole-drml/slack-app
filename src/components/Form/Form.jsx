// import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.scss";
import logoWithText from "/Users/nicoledoromal/AvionSchool/slack-app/src/assets/images/slack_with_text.png";

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
  
// const accessToken = localStorage.getItem('access-token')
// const client = localStorage.getItem('client')
// const expiry = localStorage.getItem('expiry')
// const uid = localStorage.getItem('uid')

// const fetchUsers =() => {
//   fetch('http://206.189.91.54/api/v1/users', {
//     method: 'GET',
//     headers: {
//       'access-token': accessToken,
//       client: client,
//       expiry: expiry,
//       uid: uid
//     }
//   })
//   .then((response) => response.json())
//   .then((result) => console.log("rezzult", result))
// }

// useEffect(() => {
// fetchUsers()
// }, [])


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
