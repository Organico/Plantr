import React, { Component } from 'react';
import auth from '../client.js'

class ProfilePic extends Component {

  render() {
  const profile = auth.getProfile();
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
            <div className="col-md-12">
              <h3>{profile.nickname}</h3>
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