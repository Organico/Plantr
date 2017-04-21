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
      this.props.dispatchSetPost(dbPostData)
    }).catch((err) => {
      console.error('There has been a clientside error in getting the post in ForumJS ', err);
    });
  },

   deletePost(id) {
    axios.delete('/api/forum/' + id, {
      id: id
    })
    .then((res) => {
      console.log('Successfully deleted user post');
    }).catch((err) => {
      console.error('There has been a clientside error in deleting the post in ForumJS ', err);
    });
  },

   editPost(id, message, title) {
    const profile = auth.getProfile();
    axios.put('/api/forum/' + id,
      {
        id: id,
        message: message,
        title: title
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
    const profile = auth.getProfile();
    return(
        <div className="row">
          <button type="submit" onClick={ () => {
            this.getPost();
          }} >Get Request Here</button>
          <div className="col-md-6 offset-md-2">
            <CreateNewPost />
          </div>
          <div className="col-md-8 offset-md-2">
            {this.props.posts.map((post, i) => {
              if (profile.email === post.email) {
               return <div className="post">
                 <ForumPost key={i} post={post} nickname={post.nickname} title={post.title} message={post.message} replies={post.replies} />
                    <div>
                      <button type="submit" onClick={ () => {
                        this.deletePost(post._id);
                        this.getPost();
                      }}>delete</button>
                      <button type="submit" onClick={ () => {
                        this.editPost(post._id, post.message, post.title);
                        this.getPost();
                      }}>edit</button>
                  </div>
               </div>
              } else {
               return <div className="post"><ForumPost key={i} post={post} nickname={post.nickname} title={post.title} message={post.message} replies={post.replies} /></div>
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