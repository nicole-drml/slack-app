import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import "./SignUp.scss"

const SignUp = () => {
    const navigate = useNavigate()

    const toSignIn = () => {
        navigate("/signin")
    }
    return (
        <div className="sign-up-container">
        <Form 
        formTitle={"First, enter your email"}
        buttonText={"Continue"}
        />
        <span className="or-span">OR</span>
        <p>Already using Slack?</p>
        <a onClick={toSignIn} >Sign in to an existing workspace</a>
        </div>
     );
}
 
export default SignUp;