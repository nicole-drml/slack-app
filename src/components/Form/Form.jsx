import "./Form.scss";
import logoWithText from "/Users/nicoledoromal/AvionSchool/slack-app/src/assets/images/slack_with_text.png";

const Form = ({
  formTitle,
  buttonText
}) => {
  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   const data = {
  //     email: email,
  //     password: password,
  //     confirm_passwords: confirm_password
  //   }
  //   fetch('http://206.189.91.54/ api/v1/auth/', {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then((response) => {
  //     response.headers.forEach((value, key) => {
  //       console.log(key + '->' + value)
  //     })
  //     return response.json()
  //   })
  //   .then((result) => {
  //     console.log("result", result)
  //   })
  // }


  return (
    <div className="form">
      <form>
        <img src={logoWithText} />
        <h1>{formTitle}</h1>
        <h4>We suggest using the <span>email address you use at work. </span> </h4>
        <input type="email" placeholder="name@work-email.com" className="input-email" autoComplete="off" ></input>
        <input type="password" placeholder="password" className="input-password" ></input>
        <input type="password" placeholder="confirm password" className="input-confirm-password" ></input>
        <button text="{button-text}">{buttonText}</button>
      </form>
    </div>
  );
};

export default Form;
