import React, { Component } from 'react';
import auth from '../client.js'

class ProfilePic extends Component {
  render() {
  const profile = auth.getProfile();
  console.dir(profile)
  const profPic = {
    margin: 'auto',
    border: 'solid 5px #cccdce',
    borderRadius: '50%',
    width: '190px',
    height: '190px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url(' + profile.picture + ')'
  }
      // ||   'url(http://www.clipartbest.com/cliparts/4Tb/6oR/4Tb6oR9ac.gif)'
    return (
      <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-xs-8 offset-xs-2" id="profilePic">
        <div className="container">
          <div className="row">
            <div id="username" className="col-md-6 offset-md-3 col-sm-6 offset-sm-3">
              {profile.nickname}
            </div>
          </div>
          <div className="row">
            <div style={profPic} className="col-md-6 offset-md-3 col-sm-6 offset-sm-3">
              <div id="innerProfilePic"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ProfilePic;