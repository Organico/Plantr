import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import auth from '../client.js';
import { addPost } from '../Actions/ForumActions';

const ForumPost = React.createClass({

  render() {
    console.log('KEEEEEEEEY', this.props.post._id)
  //create get request for original posters profile pic
  let profilePic = {
    backgroundImage: 'url(' + this.props.post.profile + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
  let titleShort = this.props.title.split(" ").slice(0, 20).join(" ");
  let messageShort = this.props.message.split(" ").slice(0, 100).join(" ") + "...";
    return(
        <div className="row" onClick = {() => {
            if (titleShort == this.props.title.split(" ").slice(0, 20).join(" ")) { titleShort = this.props.title; }
            else { titleShort = this.props.title.split(" ").slice(0, 20).join(" "); }
            if (messageShort == this.props.message.split(" ").slice(0, 100).join(" ") + "...") { messageShort = this.props.message; }
            else { messageShort = this.props.message.split(" ").slice(0, 100).join(" ") + "..." }
            let message = {title: titleShort, message: messageShort}
            this.props.dispatchAddPost(message);
            // { title: action.message.title, message: action.message.message };
            // this.props.addPost(message);
            }} >
          <div className="col-md-1" style={profilePic}>
          { this.props.nickname }
          </div>
          <div className="col-md-11 offset-md-0">
            <div className="row">
              <span className="forumTitle">{ titleShort }</span>
            </div>
            <div className="row">
              { messageShort }
            </div>
          </div>
        </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts,
    currentPost: state.forumReducer.currentPost
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    dispatchAddPost(message) {
      dispatch(addPost(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForumPost);