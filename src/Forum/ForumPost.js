import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import auth from '../client.js';
import { setPosts, togglePost, setEditing } from '../Actions/ForumActions';
import ReplyPost from './ReplyPost';
import EditReply from './EditReply';
import Replies from './Replies';
import axios from 'axios';

const ForumPost = React.createClass({

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

  deletePost(id, replyId) {
    axios.delete('/api/forum/' + id + '/' + replyId, {
      userId: id,
      replyId: replyId
    })
    .then((res) => {
      console.log('Successfully deleted the reply from ForumPost');
      this.props.dispatchSetEditing();
      this.getPost();
    }).catch((err) => {
      console.error('There has been a clientside error in deleting the post in ForumJS ', err);
    });
  },

  render() {
  const profile = auth.getProfile();
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

    return(
      <div className="container-fluid">
        <div className="row post">
          <div className="col-md-2">
            <div className="row"></div>
              <div className="col-md-12 offset-md-3 postPicture" style={profilePic}></div>
            <div className="row">
              <div className="col-md-12 postUsername">{ this.props.nickname }</div>
            </div>
          </div>
          <div className="col-md-8 forumTitleText">
            <div onClick = {() => {
            this.props.dispatchTogglePost(this.props.post._id);
            }}>
              <div className="row">
                <span className="forumTitle">{ title }</span>
              </div>
              <div className="row">
                { message }
              </div>
            </div>
            <div className="row">
              <div>
                <div className="col-md-12">
                  {this.props.replies.map((reply, i) => {
                    if (!postType) {
                      if (profile.email === reply.replyUser.email && !this.props.editing) {
                        console.log('here is the reply: ', reply);
                      return <div className="row">
                            <div className="col-md-10">
                              <Replies key={i} reply={reply} />
                            </div>
                            <div className="col-md-1">
                              <div className="replyEditDelete">
                                <i className="fa fa-pencil-square-o" ariaHidden="true" onClick={ () => {
                                    this.props.dispatchSetEditing(reply.message);
                                  }}></i>
                                <i className="fa fa-trash" ariaHidden="true" onClick={ () => {
                                    this.deletePost(reply.belongsToId, reply.replyUser.clientID);
                                  }}></i>
                              </div>
                          </div>

                      </div>
                       } else if (profile.email === reply.replyUser.email && this.props.editing && (reply.message === this.props.messageToEdit)) {
                        return <div className="row">
                        <div className="col-md-11">
                          <EditReply reply={reply} replyId={reply.replyUser.clientID} id={reply.belongsToId} message={reply.message}/>
                        </div>
                          <div className="col-md-1">
                            <div className="replyEditDelete">
                              <i className="fa fa-trash" ariaHidden="true" onClick={ () => {
                                  this.deletePost(reply.belongsToId, reply.replyUser.clientID);
                                }}></i>
                              </div>
                          </div>
                        </div>
                       } else {
                        return <Replies key={i} reply={reply} />
                       }
                    }
                  }
                  )}
                </div>
                  { (function() {
                    if (!postType && !props.editing) {
                      return <ReplyPost post={props.post}/>
                    }
                  }())
                  }

              </div>
            </div>
          </div>
          <div className="col-md-2 replyCount">Replies: {this.props.replies.length}</div>
        </div>

      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    messageToEdit: state.forumReducer.messageToEdit,
    posts: state.forumReducer.posts,
    currentPost: state.forumReducer.currentPost,
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