import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { setPosts, setEditing } from '../Actions/ForumActions';

class EditPost extends Component {
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
  }

  editPost(id, replyId, message, oldMessage) {
    axios.put('/api/forum/' + id + '/' + replyId, {
      params: {
        id: id,
        replyId: replyId,
        message: message,
        oldMessage: oldMessage
      }
    }).then((res) => {
      this.props.dispatchSetEditing();
      this.getPost();
    }).catch((err) => {
      console.error("Post has not updated on EditPost: ", err);
    });
  }

  render() {
    let profilePic = {
      marginTop: '5px',
      height: '30px',
      width: '30px',
      backgroundImage: 'url(' + this.props.reply.replyUser.picture + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '10px'
    }
    let id = this.props.id;
    let replyId = this.props.replyId
    let newMessage;
    return(
      <div className="reply">
        <div className="row">
          <div className="col-md-1 offset-md-1" style={profilePic}>
          </div>
          <div className="replyUsername">
            { this.props.reply.replyUser.nickname }
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-9 replyBox">
                <textarea  rows="4" className="textArea" ref={(message) => newMessage = message } type="string" name="newMessage" defaultValue={JSON.parse(this.props.message)}>
                </textarea>
              </div>
              <div className="col-md-1" id="addReply">
                <button type="submit" onClick ={ () => {
                  newMessage.value = JSON.stringify(newMessage.value);
                  this.editPost(id, replyId, newMessage.value, this.props.message);
                  newMessage.value = '';
                }}>submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetPost(message) {
      dispatch(setPosts(message));
    },
    dispatchSetEditing(editing) {
      dispatch(setEditing(editing));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
