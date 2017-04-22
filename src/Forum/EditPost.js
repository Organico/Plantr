import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { setPosts, setEditing } from '../Actions/ForumActions';
import auth from '../client.js';

const EditPost = React.createClass({

  getPost() {
    axios.get('/api/forum')
    .then((res) => {
      let dbPostData = res.data;
      for (let i = 0; i<dbPostData.length; i++) {
        let message = dbPostData[i];
        message['isShort'] = true;
      }
      this.props.dispatchSetPost(dbPostData)
    }).catch((err) => {
      console.error('There has been a clientside error in getting the post in ForumJS ', err);
    });
  },

 editPost(id, message, title) {
  axios.put('/api/forum/' + id,
    {
      id: id,
      message: message,
      title: title
    }
  ).then((res) => {
    console.log("Post has been successfully updated on EditPost");
    this.props.dispatchSetEditing();
    this.getPost();
  }).catch((err) => {
    console.error("Post has not updated on EditPost: ", err);
  });
},

render() {
  const profile = auth.getProfile();
  let profilePic = {
    backgroundImage: 'url(' + profile.picture + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }


  let id = this.props.id;
  let newMessage;
  let newTitle;
  return(
    <div className="row">
      <div className="col-md-1" style={profilePic}>
        <div>
          { profile.nickname }
        </div>
      </div>
      <input ref={(title) => newTitle = title } type="string" name="newTitle" defaultValue={JSON.parse(this.props.title)}/>
      <input ref={(message) => newMessage = message } type="string" name="newMessage" defaultValue={JSON.parse(this.props.message)}/>
      <button type="submit" onClick ={ () => {
        newMessage.value = JSON.stringify(newMessage.value);
        newTitle.value = JSON.stringify(newTitle.value);
        this.editPost(id, newMessage.value, newTitle.value);
        newMessage.value = '';
        newTitle.value = '';
      }}>submit</button>
    </div>
    )
  }
});

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
    },
    dispatchSetEditing(editing) {
      dispatch(setEditing(editing));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);