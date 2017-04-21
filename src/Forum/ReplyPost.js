import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { togglePost } from '../Actions/ForumActions';
import auth from '../client.js';
import axios from 'axios';
const ReplyPost = React.createClass({

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
    }).catch((err) => {
      console.error("Error in submitting a reply - replyPost: ", err);
    });
  },

  render() {
    let replyMessage;

    return(
      <div className="row">
        <div className="col-md-7 offset-md-2">
          <textarea  rows="2" cols="50" ref={(node) => replyMessage = node } type="string" name="messageInput" placeholder='Your message'>
          </textarea>
        </div>
        <div className="col-md-1" id="addReply">
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

    dispatchReplyPost(message) {
      dispatch(replyPost(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyPost);