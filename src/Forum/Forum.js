import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import ForumPost from './ForumPost';
import CreateNewPost from './CreateNewPost';
import axios from 'axios';
import { setPosts } from '../Actions/ForumActions';
import auth from '../client.js';

const Forum = React.createClass({

   getPost() {
    axios.get('/api/forum')
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

   deletePost(id) {
    const profile = auth.getProfile();
    console.log('THIS IS THE ID FORUM',  id)
    axios.get('/api/forum/:' + id, {
      id: id
    })
    .then((res) => {
      console.log('RES IN FORUMJS', res)
      let dbPostData = res.data;
      for (let i = 0; i<dbPostData.length; i++) {
        let message = dbPostData[i];
        message['isShort'] = true;
      }
      console.log("Db post data", dbPostData)
      this.props.dispatchSetPost(dbPostData)
    }).catch((err) => {
      console.log('THE ERROR IS IN FORUMJS')
      console.error(err);
    });
  },

  render() {
    const profile = auth.getProfile();
    return(
        <div className="row">
          <button type="submit" onClick={ () => {
            this.getPost();
          }} >Get Request Here</button>
          <div className="col-md-6">
            <CreateNewPost />
          </div>
          <div className="col-md-12">
            {this.props.posts.map((post, i) => {
              if (profile.email === post.email) {
               return <div>
               <ForumPost key={i} post={post} nickname={post.nickname} title={post.title} message={post.message} replies={post.replies} />
                  <div className="col-md-10 offset-md-1">
                    <button type="submit" className="glyphicon glyphicon-remove-circle" onClick={ () => {
                      console.log('WHAT IS POST FORUM', post);
                  this.deletePost(post._id);
                }}>delete</button>
                </div>
               </div>
              } else {
               return <ForumPost key={i} post={post} nickname={post.nickname} title={post.title} message={post.message} replies={post.replies} />
              }
            }
            )}
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forum);