import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Form from "../../components/Form";
import "./SignUp.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toSignIn = () => {
    navigate("/signin");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    if (password === passwordConfirmation) {
      fetch("http://206.189.91.54/api/v1/auth/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          response.headers.forEach((value, key) => {
            console.log(key + "->" + value);
          });
          return response.json();
        })
        .then((result) => {
          if (result.status === "error") {
            setErrorMessage(result.errors.full_messages);
          }
        });
    } else {
      setErrorMessage("Passwords do not match");
    }
  };

  return (
    <div className="sign-up-container">
      <Form
        formTitle={"First, enter your email"}
        buttonText={"Continue"}
        onSubmit={handleSubmit}
        confirmPassword={true}
        email={email}
        password={password}
        passwordConfirmation={passwordConfirmation}
        setEmail={setEmail}
        setPassword={setPassword}
        setPasswordConfirmation={setPasswordConfirmation}
        errorMessage={errorMessage}
      />
      <span className="or-span">OR</span>
      <p>Already using Slack?</p>
      <a onClick={toSignIn}>Sign in to an existing workspace</a>
    </div>
  );
};

export default SignUp;
