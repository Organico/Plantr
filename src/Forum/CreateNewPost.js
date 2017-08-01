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
    if (this.state.success === '') {
      return (
        <div>
          <br />
        </div>
      )
    } else if (this.state.success === false) {
      return (
        <div className="col-md-6 offset-md-3">
          <Alert color="danger" className="sucess-alert">
            <p>Please make sure to fill-in all the input fields. </p>
          </Alert>
        </div>
      )
    }
  }
  checkInputs(input) {
    // THIS NEEDS FURTHER FUNCTIONALITY
    let tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
    let tagOrComment = new RegExp(
        '<(?:'
        // Comment body.
        + '!--(?:(?:-*[^->])*--+|-?)'
        // Special "raw text" elements whose content should be elided.
        + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
        + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
        // Regular name
        + '|/?[a-z]'
        + tagBody
        + ')>',
        'gi');
      return input.replace(/</g, '&lt;');
  }

  savePost(title, message) {
    title = this.checkInputs(title);
    message = this.checkInputs(message);
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
        <div className="row">
          <textarea className="modal-title" ref={(node) => titleInput= node } type="string" name="titleInput" placeholder="Title Example: My organic compost tea recipe">
          </textarea>
        </div>
        <div className="row">
          <br />
          {this.renderSuccessMessage()}
        </div>
        <div className="row">
          <textarea className="modal-message" ref={(node) => messageInput = node } type="string" name="messageInput" placeholder="Message Example: This super special compost tea requires ...">
          </textarea>
        </div>
        <div className="row modal-buttons">
          <div className="col-sm-1">
            <button className="modal-post-button" onClick={this.props.closeModal}>close</button>
          </div>
          <div className="col-sm-2 offset-sm-9">
            <button className="modal-post-button" type="submit" onClick={() => {
              this.savePost(titleInput.value, messageInput.value);
              titleInput.value = '';
              messageInput.value = '';
            }}>
            Add Post
            </button>
          </div>
        </div>
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
