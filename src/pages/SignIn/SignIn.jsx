import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import "./SignIn.scss"

const SignIn = () => {
    const navigate = useNavigate();
    const toSignUp = () => {
        navigate('/signup')
    }

    return ( 
        <div className="sign-in-container">
            < Form
            formTitle="Sign in to Slack"
            buttonText="Sign In with Email"
            />
            <div className="to-sign-up-container">
                <p>New to Slack?</p>
                <a onClick={toSignUp} >Create an account</a>
            </div>
        </div>
     );
}
 
export default SignIn;