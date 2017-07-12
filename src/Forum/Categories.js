import React,{ Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import Modal from  'react-modal';
import ForumPost from './ForumPost';
import EditPost from './EditPost';
import CreateNewPost from './CreateNewPost';
import axios from 'axios';
import { setPosts, setEditing } from '../Actions/ForumActions';
import auth from '../client.js';


class Forum extends Component {
  constructor() {
    super();

    this.state = {
    };
  }


  render() {
    const profile = auth.getProfile();
    let that = this;
    return (
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="post">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h3>Let Your Community Know About Your Garden</h3>
              </div>
              <div className="replyEditDelete">
                { (function() {
                  if (!that.props.editing) {
                    return <button type="submit" onClick={that.openModal}>Post Here!</button>
                  }
                 }())
                }
             </div>
           </div>
          </div>
          <br/>
          <div className="searchForum">
            <input className="searchForumInput" />
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h3>Share Your Stories</h3>
          <CreateNewPost closeModal={this.closeModal} />
          <button onClick={this.closeModal}>close</button>
        </Modal>
        <div className="col-md-8 offset-md-2">
          {this.props.posts.map((post, i) => this.renderPostSection(profile, post, i))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messageToEdit: state.forumReducer.messageToEdit,
    posts: state.forumReducer.posts,
    currentPost: state.forumReducer.currentPost,
    editing: state.forumReducer.editing
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

export default connect(mapStateToProps, mapDispatchToProps)(Forum);
