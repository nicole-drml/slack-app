import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "../../components/Form";
import "./SignIn.scss";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { purpose } = location.pathname.split("/").pop();

  const toSignUp = () => {
    navigate("/signup");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signedIn = localStorage.getItem("SIGNED_IN");

  const addCredentials = (key, value) => {
    localStorage.setItem(key, value);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    fetch("http://206.189.91.54/api/v1/auth/sign_in", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.headers.forEach((value, key) => {
          addCredentials(key, value);
        });
        return response.json();
      })
      .then((result) => {
        if (result.success === false) {
          setErrorMessage(result.errors[0]);
        } else {
          addCredentials("SIGNED_IN", email);
          navigate("/dashboard");
        }
      });
  };

  if (signedIn) navigate("/client");

  return (
    <div className="sign-in-container">
      <Form
        formTitle="Sign in to Slack"
        buttonText="Sign In with Email"
        onSubmit={handleSubmit}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        errorMessage={errorMessage}
      />
      <div className="to-sign-up-container">
        <p>New to Slack?</p>
        <a onClick={toSignUp}>Create an account</a>
      </div>
    </div>
  );
};

export default SignIn;
