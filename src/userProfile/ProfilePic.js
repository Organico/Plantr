import React, { Component } from 'react';
import auth from '../client.js'

class ProfilePic extends Component {
  render() {
  const profile = auth.getProfile();
  console.log("HERE IS THE PROFILE:", profile)
  const profPic = {
    magin: 'auto',
    width: '100px',
    height: '250px',
    backgroundSize: '150px 150px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: 'url(' + profile.picture + ')'
  }
    return (
      <div id="profilePic">
        <div>
          <div className="row">
            <div id="username" className="col-md-12">
              {profile.nickname}
            </div>
          </div>
          <div className="row">
            <div id="picDiv" style={profPic} className="col-md-6 offset-md-3">
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ProfilePic;