import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import auth from '../client.js';
import { setPosts, togglePost } from '../Actions/ForumActions';
import ReplyPost from './ReplyPost';
import Replies from './Replies';
import axios from 'axios';

const ForumPost = React.createClass({

  deletePost() {
    const profile = auth.getProfile();
    axios.delete('/api/forum/:' + profile.email)
    .then((res) => {
      let dbPostData = res.data;
      for (let i = 0; i<dbPostData.length; i++) {
        let message = dbPostData[i];
        message['isShort'] = true;
      }
      console.log("Db post data", dbPostData)
      this.props.dispatchSetPost(dbPostData)
    }).catch((err) => {
      console.error(err);
    });
  },

  render() {
  const profile = auth.getProfile();
  //create get request for original posters profile pic
  let profilePic = {
    backgroundImage: 'url(' + this.props.post.profile + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
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

  let username = {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    marginTop: '50%'
  }

    return(
      <div className="container-fluid">
        <div className="row" onClick = {() => {
            this.props.dispatchTogglePost(this.props.post._id);
            }} >
          <div className="col-md-1" style={profilePic}>
          <div style={username}>
            { this.props.nickname }
          </div>
          </div>
          <div className="col-md-8 offset-md-1">
            <div className="row">
              <span className="forumTitle">{ title }</span>
            </div>
            <div className="row">
              { message }
            </div>
          </div>
        </div>
          <div>
            <div className="col-md-8 offset-md-2 test">
              {this.props.replies.map((reply, i) => {
                if (!postType) {
                  if (profile.email === reply.replyUser.email) {
                  return <div>
                    <Replies key={i} reply={reply} />
                      <div className="col-md-10">
                        <button type="submit" className="glyphicon glyphicon-remove-circle" onClick={ () => {
                      this.deletePost();
                    }}>delete</button>
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
                if (!postType) {
                  return <ReplyPost post={props.post}/>
                }
              }())
              }

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

    dispatchTogglePost(id) {
      dispatch(togglePost(id));
    },
    dispatchSetPost(message) {
      dispatch(setPosts(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumPost);