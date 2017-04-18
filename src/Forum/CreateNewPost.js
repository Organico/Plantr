import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import auth from '../client.js';
import { addPost } from '../Actions/ForumActions';
import axios from 'axios';


const CreateNewPost = React.createClass({

    savePost() {
    const profile = auth.getProfile();
    const profilePic = {
      backgroundImage: 'url(' + profile.picture + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
      console.log("Saving post...")
      console.log(this.props);
      axios.post('/api/forum',
        {
          profile: profile.picture,
          title: this.props.title,
          message: this.props.message,
          nickname: profile.nickname
        }
      ).then((res) => {
        console.log("Successful post");
      }).catch((err) => {
        console.error(err);
        console.log("Error in savePost()");
      });
    },

    render() {
    let titleInput;
    let messageInput;
    let message;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!titleInput.value.trim()) {
              return;
            }
            message = {title: titleInput.value, message: messageInput.value};
            this.props.dispatchAddPost(message);
            // dispatch(addTodo(messageInput.value));
            titleInput.value = '';
            messageInput.value = '';
          }}
        >
          <input ref={node => { titleInput = node; }} />
          <button type="submit" onClick={() => {
              this.savePost()}}>
            Add Post
          </button>
          <br />
        <textarea rows="4" cols="50" ref={node => {messageInput = node; }}>

        </textarea>
        </form>
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