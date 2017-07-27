import axios from 'axios';
import { connect } from 'react-redux';
import EditReply from './EditReply';
import React, { Component } from 'react';
import Replies from './Replies';
import ReplyPost from './ReplyPost';
import { setPosts, togglePost, setEditing } from '../Actions/ForumActions';

class ForumPost extends Component {
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

  deletePost(id, replyId, message) {
    axios.delete('/api/forum/' + id + '/' + replyId, {
      params: {
        userId: id,
        replyId: replyId,
        message: message
      }
    })
    .then((res) => {
      this.getPost();
    }).catch((err) => {
      console.error('There has been a clientside error in deleting the post in ForumJS ', err);
    });
  }

  renderReplies(postType) {
    if (!postType && !this.props.editing) {
      return <ReplyPost post={this.props.post}/>
    }
  }

  render() {
    const profile = this.props.profile;
    let profilePic = {
      height: '50px',
      width: '50px',
      backgroundImage: 'url(' + this.props.post.profile + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '50%',
      marginLeft: 'calc(2.5vw + 3.5vh)'
    }
    let props = this.props;
    let postType = this.props.post.isShort;
    let message;
    let title;
    if (postType) {
      if (this.props.message.split(" ").length < 100) {
        if (this.props.replies.length) {
          message = this.props.message.split(" ").slice(0, 100).join(" ") + "...Click to see replies";
          title = this.props.title.split(" ").slice(0, 20).join(" ");
        } else {
          title = this.props.title;
          message = this.props.message;
        }
      } else {
        message = this.props.message.split(" ").slice(0, 100).join(" ") + "...Click to Expand";
        title = this.props.title.split(" ").slice(0, 20).join(" ");
      }
    } else {
      message = this.props.message;
      title = this.props.title;
    }

    return (
      <div className="container-fluid">
        <div className="row post">
          <div className="col-md-3 post-pic-username">
            <div className="row"></div>
              <div className="col-md-12 offset-md-3 postPicture" style={profilePic}></div>
            <div className="row">
              <div className="col-md-12 post-username">{ this.props.nickname }</div>
            </div>
          </div>
          <div className="col-md-7 forum-title-text">
            <div onClick = {() => {
              this.props.dispatchTogglePost(this.props.post._id);
            }}>
              <div className="row">
                <span className="forum-title">{ title }</span>
              </div>
              <div className="row forum-message">
                { message }
              </div>
            </div>
            <div>
              <div>
                <div className="col-md-12">
                  {this.props.replies.map((reply, i) => {
                    const emailCheck = (profile.email === reply.replyUser.email);
                    if (!postType) {
                      if (emailCheck && !this.props.editing) {
                        return (
                          <div className="row">
                            <div className="col-md-11">
                              <Replies
                                key={i}
                                reply={reply}
                              />
                            </div>
                            <div className="col-md-1">
                              <div className="reply-edit-delete">
                                <i className="fa fa-pencil-square-o" onClick={ () => {
                                  this.props.dispatchSetEditing(reply.message);
                                }}></i>
                                <i className="fa fa-trash" onClick={ () => {
                                  this.deletePost(reply.belongsToId, reply.replyUser.clientID, reply.message);
                                }}></i>
                              </div>
                            </div>
                          </div>
                        )
                      } else if (emailCheck && this.props.editing && (reply.message === this.props.messageToEdit)) {
                        return (
                          <EditReply
                            id={reply.belongsToId}
                            message={reply.message}
                            reply={reply}
                            replyId={reply.replyUser.clientID}
                          />
                        )
                      } else {
                        return (
                          <Replies
                            key={reply.belongsToId}
                            reply={reply}
                          />
                        )
                      }
                    }
                  }
                )}
                </div>
                  { this.renderReplies(postType) }
              </div>
            </div>
          </div>
          <div className="col-md-2 reply-count">Replies: {this.props.replies.length}
            <br />
            <div className="reply-count"> { this.props.post.time } </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    messageToEdit: state.forumReducer.messageToEdit,
    posts: state.forumReducer.posts,
    editing: state.forumReducer.editing
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchTogglePost(id) {
      dispatch(togglePost(id));
    },
    dispatchSetPost(message) {
      dispatch(setPosts(message));
    },
    dispatchSetEditing(editing) {
      dispatch(setEditing(editing));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumPost);

