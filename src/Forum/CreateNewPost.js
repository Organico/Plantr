import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import auth from '../client.js';
import { setPosts, addPost } from '../Actions/ForumActions';
import axios from 'axios';


const CreateNewPost = React.createClass({

   getPost() {
    axios.get('/api/forum')
    .then((res) => {
      let dbPostData = res.data;
      for (let i = 0; i<dbPostData.length; i++) {
        let message = dbPostData[i];
        message['isShort'] = true;
      }
      this.props.dispatchSetPost(dbPostData)
    }).catch((err) => {
      console.error('ERROR IN FORUMJS ', err);
    });
  },

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
        console.log("Successful posted on the client side of CreateNewPost");
        this.props.closeModal();
        this.getPost();
      }).catch((err) => {
        console.error(err);
        console.log("Error in creating a new post on CreateNewPost");
      });
    },

    render() {
    let titleInput;
    let messageInput;
    return (
      <div>
        <textarea cols="50" rows="1" ref={(node) => titleInput= node } type="string" name="titleInput" placeholder="Title Example: My organic compost tea recipe">
        </textarea>
        <br />
        <textarea  rows="15" cols="75" ref={(node) => messageInput = node } type="string" name="messageInput" placeholder="Message Example: This super special compost tea requires ...">
        </textarea>
        <button type="submit" onClick={() => {
            titleInput.value = JSON.stringify(titleInput.value);
            messageInput.value = JSON.stringify(messageInput.value);
            this.savePost(titleInput.value, messageInput.value);
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
    },
    dispatchSetPost(message) {
      dispatch(setPosts(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPost);