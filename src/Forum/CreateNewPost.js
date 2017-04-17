import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import auth from '../client.js';
import { addPost } from '../Actions/ForumActions';



const CreateNewPost = React.createClass({

    render() {
    const profile = auth.getProfile();
    const profilePic = {
      backgroundImage: 'url(' + profile.picture + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
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
            message = JSON.stringify({title: titleInput.value, message: messageInput.value});

            dispatchAddPost(message);
            // dispatch(addTodo(messageInput.value));
            titleInput.value = '';
            messageInput.value = '';
          }}
        >
          <input ref={node => { titleInput = node; }} />
          <button type="submit">
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