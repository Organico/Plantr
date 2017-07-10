import React, { Component } from 'react';

class FriendsListEntry extends Component {
  render() {
    let profilePic = {
      marginTop: '5px',
      height: '30px',
      width: '30px',
      backgroundImage: 'url(' + this.props.friend.profile + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '10px'
    }
    return (
      <div className="row">
        <div className="col-md-1 offset-md-1" style={profilePic}>
        </div>
        <div className="replyUsername">
          { this.props.friend.nickname }
        </div>
      </div>
    )
  }
}

export default FriendsListEntry;
