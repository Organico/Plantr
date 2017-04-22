import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ReplyPost from './ReplyPost';

const Replies = React.createClass({

  render() {
  let profilePic = {
    backgroundImage: 'url(' + this.props.reply.replyUser.picture + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

    return(
      <div className="reply">
        <div className="row">
          <div className="col-md-1 offset-md-1" style={profilePic}>
          <br/>
          </div>
          <div className="postUsername">
            { this.props.reply.replyUser.nickname }
          </div>
          <div className="col-md-10 offset-md-1">
            <div className="row">
              { this.props.reply.message }
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Replies