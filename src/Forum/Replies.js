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
  let username = {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    marginTop: '50%'
  }

    return(
      <div>
        <div className="row">
          <div className="col-md-1" style={profilePic}>
          <br/>
          <div style={username}>
            { this.props.reply.replyUser.nickname }
          </div>
          </div>
          <div className="col-md-11 offset-md-0">
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