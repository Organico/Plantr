import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendsListEntry from './FriendsListEntry';

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

// this is simply for demonstration purposes, once functionality exists
// we will need to refactor mapping function to deal with actual friends
const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts,
  };
};

export default connect(mapStateToProps)(FriendsList);
