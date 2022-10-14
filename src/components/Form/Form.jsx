import "./Form.scss";
import logoWithText from "/Users/nicoledoromal/AvionSchool/slack-app/src/assets/images/slack_with_text.png";

const Form = ({
  formTitle,
  buttonText
}) => {
  return (
    <div className="form">
      <form>
        <img src={logoWithText} />
        <h1>{formTitle}</h1>
        <h4>We suggest using the <span>email address you use at work. </span> </h4>
        <input type="email" placeholder="name@work-email.com" ></input>
        <button text="{button-text}">{buttonText}</button>
      </form>
    </div>
  );
};

export default Form;
