import React, { Component } from 'react';


class RecentGardens extends Component {
  render() {
    return (
      <div className="col-md-4 offset-md-1 col-sm-6 col-xs-12 right userRecent">
        <div className="userRecentSpan"> Recent Gardens </div>
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


export default RecentGardens;