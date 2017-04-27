import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import ForumPost from '../Forum/ForumPost';
import axios from 'axios';
import auth from '../client.js';
import { setPosts } from '../Actions/ForumActions';

class RecentPosts extends Component {

   getPost() {
    const profile = auth.getProfile();
    axios.get('/api/forum/:' + profile.email)
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
      console.log("Error in RECENTPOSTS");
    });
  }

  componentDidMount() {
    this.getPost();
  }

  render() {
    const profile = auth.getProfile();
    return (
      <div className="row">
        <div className="col-md-12 offset-md-2 right userRecent">
          <div className="userRecentSpan"> Recent Posts
            <div>
                {this.props.posts.map((post, i) => {
                  if (post.email === profile.email) {
                    return <ForumPost key={i} post={post} nickname={post.nickname} title={post.title} message={post.message} replies={post.replies} />
                  }
                }
                )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


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

export default connect(mapStateToProps, mapDispatchToProps)(RecentPosts);
