import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { setPosts } from '../Actions/ForumActions';
import auth from '../client.js';

const EditPost = React.createClass({

 editPost(id, message, title) {
  console.log('ID IN EDIT POST', id);
  const profile = auth.getProfile();
  axios.put('/api/forum/' + id,
    {
      id: id,
      message: message,
      title: title
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
  console.log('PROPS IN EDITPOST ', this.props)
  return(
    <div className="row" >
      <input ref={(node) => title = node } type="string" name="title"/>
      <input ref={(node) => message = node } type="string" name="message"/>
      <button type="submit" onClick ={ () => {
        this.editPost(this.props.id, title.value, message.value)
      }}>submit</button>
    </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts,
    currentPost: state.forumReducer.currentPost
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    dispatchSetPost(message) {
      dispatch(setPosts(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);