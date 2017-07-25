import React, { Component }from 'react';

export default class Replies extends Component {
  render() {
    let profilePic = {
      marginTop: '5px',
      height: '30px',
      width: '30px',
      backgroundImage: 'url(' + this.props.reply.replyUser.picture + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '10px'
    }
    return(
      <div className="reply">
        <div className="row">
          <div className="col-md-1 offset-md-1" style={profilePic}>
          </div>
          <div className="replyUsername">
            { this.props.reply.replyUser.nickname }
          </div>
          <div className="col-md-10 offset-md-1">
            <div className="row replyMessage">
              { this.props.reply.message + ' - ' + this.props.reply.time }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
