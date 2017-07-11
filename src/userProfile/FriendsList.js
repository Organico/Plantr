import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendsListEntry from './FriendsListEntry';
import { setPosts } from '../Actions/ForumActions';

class FriendsList extends Component {
  // TODO - ADD FRIEND FUNCTIONALITY
  render() {
    const profile = this.props.profile;
    return (
      <div className="row">
        <div className="col-md-10 offset-md-2 right userRecent">
          <div className="userRecentSpan"> Friends List
            <div>
                {this.props.posts.map((post, i) => <FriendsListEntry key={i} friend={post} /> )}
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
