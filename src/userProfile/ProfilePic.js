import React, { Component } from 'react';

class ProfilePic extends Component {
  render() {
    return (
      <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-xs-8 offset-xs-2" id="profilePic">
        <div className="container">
          <div className="row">
            <div id="username" className="col-md-6 offset-md-3 col-sm-6 offset-sm-3">
              User Name
            </div>
          </div>
          <div className="row">
            <div id="innerProfile" className="col-md-6 offset-md-3 col-sm-6 offset-sm-3">
              <div id="innerProfilePic"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ProfilePic;