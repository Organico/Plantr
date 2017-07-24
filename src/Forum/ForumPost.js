/*





  renderReplies(postType) {
    if (!postType && !this.props.editing) {
      return <ReplyPost post={this.props.post}/>
    }
  }

  render() {

    let profilePic = {
      height: '50px',
      width: '50px',
      backgroundImage: 'url(' + this.props.post.profile + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '50%'
    }
    let postType = this.props.post.isShort;
    let postResult = this.checkPost(postType);

    return (
      <div className="container-fluid">
        <div className="row post">
          <div className="col-md-3">
            <div className="row"></div>
              <div className="col-md-12 offset-md-3 postPicture" style={profilePic}></div>
            <div className="row">
              <div className="col-md-12 postUsername">{ this.props.nickname }</div>
            </div>
          </div>
          <div className="col-md-7 forumTitleText">
            <div onClick = {() => {
              this.props.dispatchTogglePost(this.props.post._id);
            }}>
              <div className="row">
                <span className="forumTitle">{ postResult.title }</span>
              </div>
              <div className="row forumMessage">
                { postResult.message }
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
                              <div className="replyEditDelete">
                                <i className="fa fa-pencil-square-o" onClick={ () => {
                                  this.props.dispatchSetEditing(reply.message);
                                }}></i>
                                <i className="fa fa-trash" onClick={ () => {
                                  this.deletePost(reply.belongsToId, reply.replyUser.clientID);
                                }}></i>
                              </div>
                            </div>
                          </div>
                        )
                      } else if (emailCheck && this.props.editing && (reply.message === this.props.messageToEdit)) {
                        return (
                          <EditReply
                            reply={reply}
                            replyId={reply.replyUser.clientID}
                            id={reply.belongsToId}
                            message={reply.message}
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
          <div className="col-md-2 replyCount">Replies: {this.props.replies.length}
            <br />
            <div className="replyCount"> { this.props.post.time } </div>
          </div>
        </div>
      </div>
    )
  }
}


*/

import axios from 'axios';
import { connect } from 'react-redux';
import EditReply from './EditReply';
import React, { Component } from 'react';
import Replies from './Replies';
import ReplyPost from './ReplyPost';
import { setPosts, togglePost, setEditing } from '../Actions/ForumActions';

class ForumPost extends Component {
  checkPost(postType) {
    let result = {};
    if (postType) {
      if (this.props.message.split(" ").length < 100) {
        if (this.props.replies.length) {
          result.message = this.props.message.split(" ").slice(0, 100).join(" ") + "...Click to see replies";
          result.title = this.props.title.split(" ").slice(0, 20).join(" ");
        } else {
          result.title = this.props.title;
          result.message = this.props.message;
        }
      } else {
        result.message = this.props.message.split(" ").slice(0, 100).join(" ") + "...Click to Expand";
        result.title = this.props.title.split(" ").slice(0, 20).join(" ");
      }
    } else {
      result.message = this.props.message;
      result.itle = this.props.title;
    }
    return result;
  }

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

  deletePost(id, replyId) {
    axios.delete('/api/forum/' + id + '/' + replyId, {
      userId: id,
      replyId: replyId
    })
    .then((res) => {
      console.log('Successfully deleted the reply from ForumPost');
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
      zIndex: '900',
      borderRadius: '50%'
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
          <div className="col-md-3">
            <div className="row"></div>
              <div className="col-md-12 offset-md-3 postPicture" style={profilePic}></div>
            <div className="row">
              <div className="col-md-12 postUsername">{ this.props.nickname }</div>
            </div>
          </div>
          <div className="col-md-7 forumTitleText">
            <div onClick = {() => {
              this.props.dispatchTogglePost(this.props.post._id);
            }}>
              <div className="row">
                <span className="forumTitle">{ title }</span>
              </div>
              <div className="row forumMessage">
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
                              <div className="replyEditDelete">
                                <i className="fa fa-pencil-square-o" onClick={ () => {
                                  this.props.dispatchSetEditing(reply.message);
                                }}></i>
                                <i className="fa fa-trash" onClick={ () => {
                                  this.deletePost(reply.belongsToId, reply.replyUser.clientID);
                                }}></i>
                              </div>
                            </div>
                          </div>
                        )
                      } else if (emailCheck && this.props.editing && (reply.message === this.props.messageToEdit)) {
                        return (
                          <EditReply
                            reply={reply}
                            replyId={reply.replyUser.clientID}
                            id={reply.belongsToId}
                            message={reply.message}
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
          <div className="col-md-2 replyCount">Replies: {this.props.replies.length}
            <br />
            <div className="replyCount"> { this.props.post.time } </div>
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

