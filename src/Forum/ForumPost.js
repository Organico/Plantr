import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import auth from '../client.js';


const ForumPost = React.createClass({

  render() {
  const profile = auth.getProfile();
  //create get request for original posters profile pic
  const profilePic = {
    backgroundImage: 'url(' + profile.picture + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
    return(
        <div className="row">
          <div className="col-md-1" style={profilePic}>
          </div>
          <div className="col-md-11 offset-md-0">
            <div className="row">
              This is a Title
            </div>
            <div className="row">
              This is some awesome stuff in the body
            </div>
          </div>

        </div>
    )
  }
})


export default ForumPost;