import axios from 'axios';
import { connect } from 'react-redux';
import ForumPost from '../Forum/ForumPost';
import React, { Component } from 'react';
import { setPosts } from '../Actions/ForumActions';

class RecentPosts extends Component {

  getPost() {
    const profile = this.props.profile;
    axios.get('/api/forum/' + profile.email)
    .then((res) => {
      let dbPostData = res.data;
      for (let i = 0; i < dbPostData.length; i++) {
        let message = dbPostData[i];
        message['isShort'] = true;
      }
      this.props.dispatchSetPost(dbPostData)
    }).catch((err) => {
      console.error("There was a get request error on the client in User RecentPosts", err);
    });
  }

  componentDidMount() {
    this.getPost();
  }

  render() {
    const profile = this.props.profile;
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1 right user-recent">
          <div className="user-recent-span">
            <h3 className="profile-posts">Recent Posts</h3>
            <hr />
            <div>
                {this.props.posts.map((post, i) => {
                  if (post.email === profile.email) {
                    return (
                      <ForumPost
                        key={i}
                        post={post}
                        nickname={post.nickname}
                        title={post.title}
                        message={post.message}
                        replies={post.replies}
                      />
                    )
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetPost(post) {
      dispatch(setPosts(post))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentPosts);
