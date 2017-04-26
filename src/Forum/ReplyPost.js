import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { setPosts, togglePost, setEditing } from '../Actions/ForumActions';
import auth from '../client.js';
import axios from 'axios';

const ReplyPost = React.createClass({

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
      console.error('there has been an error in rerendering on ReplyPost ', err);
    });
  },

  replyPost(replyMessage) {
    const profile = auth.getProfile();
    axios.put('/api/forum',
      {
        id: this.props.post._id,
        replies: {
          belongsToId: this.props.post._id,
          message: replyMessage,
          replyUser: profile
        }
      }
    ).then((res) => {
      console.log("Successfully posted a reply");
      this.getPost();
    }).catch((err) => {
      console.error("Error in submitting a reply - replyPost: ", err);
    });
  },

  render() {
    let replyMessage;

    return(
      <div className="row">
        <div className="col-md-8 replyBox">

          <textarea  rows="2" cols="50" ref={(node) => replyMessage = node } type="string" name="messageInput" placeholder='Your message'>
          </textarea>
        </div>
        <div className="col-md-1 offset-md-1" id="addReply">
          <button type="submit" onClick={() => {
            replyMessage.value = JSON.stringify(replyMessage.value);
            this.replyPost(replyMessage.value);
            replyMessage.value = '';
          }}>submit</button>
        </div>
      </div>
    )
  }
})

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
    },
    dispatchReplyPost(message) {
      dispatch(replyPost(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyPost);