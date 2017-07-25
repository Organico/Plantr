import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { setPosts, setEditing } from '../Actions/ForumActions';

class ReplyPost extends Component {
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
  }

  replyPost(replyMessage) {
    const profile = this.props.profile
    axios.put('/api/forum', {
      id: this.props.post._id,
      replies: {
        belongsToId: this.props.post._id,
        message: replyMessage,
        replyUser: profile,
        time: new Date().toDateString()
      }
    }).then((res) => {
      this.getPost();
    }).catch((err) => {
      console.error("Error in submitting a reply - replyPost: ", err);
    });
  }

  render() {
    let replyMessage;
    return (
      <div className="row">
        <div className="replyBox col-md-9">
          <textarea  rows="2" className="textArea" ref={(node) => replyMessage = node } type="string" name="messageInput" placeholder='Got advice or questions about this post? Reply here'>
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
}

const mapStateToProps = (state) => {
  return {
    profile: state.userProfileReducer.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetPost(message) {
      dispatch(setPosts(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyPost);
