import React from 'react'
import AuthService from './AuthService.js';
import { connect } from 'react-redux';
import LogoAnimation from '../Home/LogoAnimation';

export class Login extends React.Component {

  render() {
    const { auth } = this.props;
    const profileState = this.props.profile
    return (
      <div className="login">
        <LogoAnimation />
          <p className="loginLead">
            { (function() {
              if (!profileState) {
                return <button className="btn btn-primary login-btn" onClick={auth.login.bind(this)}>Get Started</button>
                }
              }())
            }
          </p>
      </div>
    )
  }
}

export default Login;

        // <img id="seed" src="https://s3-us-west-2.amazonaws.com/ryaperry-bucket/banners/Plantr_Banner_how_to_use4.png" alt="Build a Garden" crossOrigin="anonymous" width="1049" height="320"></img>