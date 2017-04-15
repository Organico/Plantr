
import React from 'react'
import AuthService from './AuthService.js'

export class Login extends React.Component {


  render() {
    const { auth } = this.props

    return (
      <div className="container login">
        <div className="jumbotron">
          <div className="row align-items-center justify-contents-center">
            <div className="w-100"></div>
            <div className="col">
              <img src="http://www.scienceclarified.com/photos/plant-3250.jpg" alt="Plantr logo" />
            </div>
            <div className="w-100"></div>
            <div className="col">
              <button className="btn btn-primary" onClick={auth.login.bind(this)}>Login</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;