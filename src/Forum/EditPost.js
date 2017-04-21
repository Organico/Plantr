import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { setPosts } from '../Actions/ForumActions';
import auth from '../client.js';

const EditPost = React.createClass({

 editPost(id, message, title) {
  console.log('ID IN EDIT POST', id);
  axios.put('/api/forum/' + id,
    {
      id: id,
      message: message,
      title: title
    }
  ).then((res) => {
    console.log("Successful post");
  }).catch((err) => {
    console.error(err);
    console.log("Error in savePost()");
  });
},

render() {
  const profile = auth.getProfile();
  let profilePic = {
    backgroundImage: 'url(' + profile.picture + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
  let username = {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    marginTop: '50%'
  }
  console.log('PROPS IN EDITPOST ', this.props);
  return(
    <div className="row">
      <div className="col-md-1" style={profilePic}>
        <div style={username}>
          { profile.nickname }
        </div>
      </div>
      <input ref={(node) => title = node } type="string" name="title" value={this.props.title}/>
      <input ref={(node) => message = node } type="string" name="message" value={this.props.message}/>
      <button type="submit" onClick ={ () => {
        this.editPost(this.props.id, message.value, title.value)
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