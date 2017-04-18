import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import auth from '../client.js';
import axios from 'axios';


const ForumPost = React.createClass({

  getPosts() {
    axios.get('/api/forum')
    .then((res) => {
      console.log("getPostsCalled ", res);
    }).catch((err) => {
      console.error(err);
      console.log("Error in ForumPost()");
    });
  },

  render() {
  const profile = auth.getProfile();
  //create get request for original posters profile pic
  this.getPosts();
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
              <span className="forumTitle">{ this.props.title }</span>
            </div>
            <div className="row">
              { this.props.message }
            </div>
          </div>
        </div>
    )
  }
})


export default ForumPost;