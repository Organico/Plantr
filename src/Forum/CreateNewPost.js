import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import auth from '../client.js';
import { addPost } from '../Actions/ForumActions';
import axios from 'axios';


const CreateNewPost = React.createClass({

    savePost(title, message) {
      const profile = auth.getProfile();
      const profilePic = {
        backgroundImage: 'url(' + profile.picture + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
      axios.post('/api/forum',
        {
          profile: profile.picture,
          title: title,
          message: message,
          nickname: profile.nickname,
          email: profile.email,
          replies: []
        }
      ).then((res) => {
        console.log('res', res)
        console.log("Successful post");
      }).catch((err) => {
        console.error(err);
        console.log("Error in savePost()");
      });
    },

    render() {
    let titleInput;
    let messageInput;
    return (
      <div>
      <input ref={(node) => titleInput= node } type="string" name="titleInput" placeholder='Your title'/>
      <br />
      <textarea  rows="4" cols="50" ref={(node) => messageInput = node } type="string" name="messageInput" placeholder='Your message'>
      </textarea>
      <button type="submit" onClick={() => {
          this.savePost(titleInput.value, messageInput.value)
          titleInput.value = '';
          messageInput.value = '';
        }}>
        Add Post
      </button>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    dispatchAddPost(message) {
      dispatch(addPost(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPost);