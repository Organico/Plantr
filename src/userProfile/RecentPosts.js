import React, { Component } from 'react';
import axios from 'axios';

class RecentPosts extends Component {

  // getUserPost() {
  //   axios.get('/api/forum')
  //   .then((res) => {
  //     var dbPostData = res.data;
  //     this.props.dispatchSetPost(dbPostData)
  //   }).catch((err) => {
  //     console.error(err);
  //     console.log("Error in Forum()");
  //   });
  // },

  render() {
    return (
      <div className="col-md-3 offset-md-1 col-sm-12 col-xs-12 right userRecent">
        <div className="userRecentSpan"> Recent Posts </div>
        <div>
          <ul>
            <li className="userRecentUL">
              <a href="url">Item One</a>
            </li>
            <li className="userRecentUL">
              <a href="url">Item Two</a>
            </li>
            <li className="userRecentUL">
              <a href="url">Item Three</a>
            </li>
            <li className="userRecentUL">
              <a href="url">All Items</a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}


export default RecentPosts;