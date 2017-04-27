import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import auth from '../client.js';
import { setPosts, addPost, setEditing } from '../Actions/ForumActions';
import axios from 'axios';
import moment from '../../node_modules/moment/moment'

class CreateNewPost extends Component {

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
  }

    savePost(title, message) {
      console.log('here is the time: ', moment("YYYY-MM-DD HH:mm"));
      console.log('here is another time: ', )
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
          replies: [],
          time: moment()._d
        }
      ).then((res) => {
        console.log("Successful posted on the client side of CreateNewPost");
        this.props.closeModal();
        this.props.dispatchSetEditing();
        this.getPost();
        this.props.dispatchSetEditing(); // <-- THIS IS NECESSARY, NOT A DUPLICATE
      }).catch((err) => {
        console.error("Error in creating a new post on CreateNewPost", err);
      });
    }

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
};

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
    },
    dispatchSetEditing(editing) {
      dispatch(setEditing(editing));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPost);