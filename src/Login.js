import React from 'react'
import AuthService from './config/AuthService.js'

export class Login extends React.Component {

  render() {
    const { auth } = this.props;
    return (
      <div className="container login">
        <div className="jumbotron">
          <div className="row align-items-center justify-contents-center">
            <div className="col">
              <h1>Plantr</h1>
            </div>
            <div className="w-100"></div>
            <div className="col">
              <img src="" alt="Plantr logo" />
            </div>
            <div className="w-100"></div>
            <div className="col">
              <button onClick={auth.login.bind(this)}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;