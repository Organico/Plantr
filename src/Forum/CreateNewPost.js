import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import auth from '../client.js';
import addPost from '../actions/ForumActions';


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
            dispatch(addPost(message));
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

CreateNewPost.propTypes = {
  dispatch: PropTypes.func.isRequired, //need to connect dispatch
};

export default CreateNewPost;