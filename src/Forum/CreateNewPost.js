import { Alert } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { setPosts, setEditing } from '../Actions/ForumActions';

class CreateNewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: ''
    }
  }

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
      console.error('ERROR IN FORUMJS ', err);
    });
  }

  renderSuccessMessage() {
    if (this.state.success === true) {
      return (
        <div>
          <Alert color="success" className="sucess-alert">
            <p>Your email was sent successfully. </p>
          </Alert>
        </div>
      )
    } else if (this.state.success === false) {
        return (
          <div>
            <Alert color="danger" className="sucess-alert">
              <p>Please make sure to fill-in all the input fields. </p>
            </Alert>
          </div>
        )
    } else {
      return (
          <br />
      )
    }
  }

  savePost(title, message) {
    const profile = this.props.profile;
    const profilePic = {
      backgroundImage: 'url(' + profile.picture + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
    const currentCategory = this.props.currentCategory;
    if (title.length<= 2 || message.length <= 2) {
      this.setState({ success: false });
    } else {
      axios.post('/api/forum',
        {
          profile: profile.picture,
          title: title,
          message: message,
          nickname: profile.nickname,
          email: profile.email,
          replies: [],
          time: new Date().toDateString(),
          category: currentCategory
        }
      ).then((res) => {
        this.props.closeModal();
        this.props.dispatchSetEditing();
        this.getPost();
        this.props.dispatchSetEditing(); // <-- THIS IS NECESSARY, NOT A DUPLICATE
      }).catch((err) => {
        console.error("Error in creating a new post on CreateNewPost", err);
      });
    }
  }

  componentDidUpdate() {
    if (this.state.success === false) {
      const context = this;
      setTimeout(() => context.setState({ success: '' }), 5000)
    }
  }

  render() {
    let titleInput;
    let messageInput;
    return (
      <div>
        <textarea cols="50" rows="1" ref={(node) => titleInput= node } type="string" name="titleInput" placeholder="Title Example: My organic compost tea recipe">
        </textarea>
        <div>{this.renderSuccessMessage()}</div>
        <textarea  rows="15" cols="75" ref={(node) => messageInput = node } type="string" name="messageInput" placeholder="Message Example: This super special compost tea requires ...">
        </textarea>
        <button type="submit" onClick={() => {
            titleInput.value = JSON.stringify(titleInput.value);
            messageInput.value = JSON.stringify(messageInput.value);
            this.savePost(titleInput.value, messageInput.value);
            titleInput.value = '';
            messageInput.value = '';
          }}>
          Add Post
        </button>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    posts: state.forumReducer.posts,
    profile: state.userProfileReducer.profile,
    currentCategory: state.forumReducer.currentCategory
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPost);
