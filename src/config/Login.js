import React from 'react'
import AuthService from './AuthService.js';
import { connect } from 'react-redux';
import LogoAnimation from '../Home/LogoAnimation';

export class Login extends React.Component {

  render() {
    const { auth } = this.props;
    const profileState = this.props.profile
    return (
      <div className="container login">
        <LogoAnimation />
           <p>From customization to cost and weather integration, Plantr gives you the tools to make gardening quick and easy. Sign up to join our community of local growers to find out how you can take your gardening skills to the next level! </p>
          <p className="lead">
            { (function() {
              if (!profileState) {
                return <button className="btn btn-primary" onClick={auth.login.bind(this)}>Getting Started</button>
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