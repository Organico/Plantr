import React, { Component } from 'react';
import auth from '../client.js'

class ProfilePic extends Component {
  render() {
  const profile = auth.getProfile();
  console.dir(profile)
  const profPic = {
    magin: 'auto',
    width: '100px',
    height: '250px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: 'url(' + profile.picture + ')'
  }
      // ||   'url(http://www.clipartbest.com/cliparts/4Tb/6oR/4Tb6oR9ac.gif)'
    return (
      <div className="test " id="profilePic">
        <div className="test">
          <div className="row">
            <div id="username" className="col-md-6  col-sm-6 offset-sm-3">
              {profile.nickname}
            </div>
          </div>
          <div className="row">
            <div style={profPic} className="col-md-6  col-sm-6 offset-sm-3">
              <div id="innerProfilePic"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ProfilePic;