import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { togglePost } from '../Actions/ForumActions';
import auth from '../client.js';
import axios from 'axios';
const ReplyPost = React.createClass({

  replyPost(replyMessage) {
    console.log(this.props.post._id);
      const profile = auth.getProfile();
      // const profilePic = {
      //   backgroundImage: 'url(' + profile.picture + ')',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center'
      // }
      axios.put('/api/forum',
        {
          id: this.props.post._id,
          replies: {
            message: replyMessage,
            replyUser: profile
          }
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
    let replyMessage;

    return(
      <div className="row">
        <textarea  rows="4" cols="50" ref={(node) => replyMessage = node } type="string" name="messageInput" placeholder='Your message'>
        </textarea>
        <button type="submit" onClick={() => {
          this.replyPost(replyMessage.value);
        }}>submit</button>
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