import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { setPosts } from '../Actions/ForumActions';
import auth from '../client.js';

const EditPost = React.createClass({

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
      console.error('There has been a clientside error in getting the post in ForumJS ', err);
    });
  },

 editPost(id, replyId, message, oldMessage) {
  axios.put('/api/forum/' + id + '/' + replyId, {
    params: {
      id: id,
      replyId: replyId,
      message: message,
      oldMessage: oldMessage
     }
    }
  ).then((res) => {
    console.log("Post has been successfully updated on EditPost");
    this.getPost();
  }).catch((err) => {
    console.error("Post has not updated on EditPost: ", err);
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
  console.log('THIS PROPS IN EDITREPLY ', this.props);
  let id = this.props.id;
  let replyId = this.props.replyId
  let newMessage;
  return(
    <div className="row">
      <div className="col-md-1" style={profilePic}>
        <div style={username}>
          { profile.nickname }
        </div>
      </div>
      <input ref={(message) => newMessage = message } type="string" name="newMessage" defaultValue={JSON.parse(this.props.message)}/>
      <button type="submit" onClick ={ () => {
        newMessage.value = JSON.stringify(newMessage.value);
        this.editPost(id, replyId, newMessage.value, this.props.message);
        newMessage.value = '';
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