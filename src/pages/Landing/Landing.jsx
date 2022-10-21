import logoWithText from '/Users/nicoledoromal/AvionSchool/slack-app/src/assets/images/slack_with_white_text.png';
import bodyImage from '/Users/nicoledoromal/AvionSchool/slack-app/src/assets/images/landing-body.png';
import './Landing.scss';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  // fetch('https://jsonplaceholder.typicode.com/users')
  //   .then((response) => {
  //     console.log('resolved', response);
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log('reject', err);
  //   });

  const toSignIn = () => {
    navigate('/signin');
  };

  const toSignUp = () => {
    navigate('/signup');
  };
  return (
    <div className='landing-page'>
      <header className='header'>
        <img src={logoWithText} />
        <nav>
          <div className='sign-in-button' onClick={toSignIn}>
            Sign In
          </div>
        </nav>
      </header>
      <div className='body-container'>
        <div className='body-text'>
          <h1>
            {' '}
            Great teamwork starts with a <span>digital HQ</span>
          </h1>
          <p className='subtitle'>
            With all your people, tools and communication in one place,<br></br>{' '}
            you can work faster and more flexibly than ever before.
          </p>
          <button onClick={toSignUp}>SIGN UP WITH EMAIL</button>
          <p className='slack-is-free'>
            <span>Slack is free to try </span> for as long as you'd like
          </p>
        </div>
        <div className='body-image'>
          <img src={bodyImage} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
