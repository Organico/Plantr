import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import Modal from  'react-modal';
import ForumPost from './ForumPost';
import EditPost from './EditPost';
import CreateNewPost from './CreateNewPost';
import axios from 'axios';
import { setPosts, setEditing } from '../Actions/ForumActions';
import auth from '../client.js';
import WeatherTest from '../weather/Weather';
import {getTemp, getCoordinates, getWeatherDescription} from '../weather/OpenWeatherMap'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Forum extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
      console.error('There has been a clientside error in getting the post in ForumJS ', err);
    });
  }

   deletePost(id) {
    axios.delete('/api/forum/' + id, {
      id: id
    })
    .then((res) => {
      console.log('Successfully deleted user post');
    }).catch((err) => {
      console.error('There has been a clientside error in deleting the post in ForumJS ', err);
    });
  }

  componentDidMount() {
    this.getPost();
  }

  render() {
    // need to find out how to get the set the location
    console.log('trying to get the coordinates: ', getCoordinates())
    const profile = auth.getProfile();
    return(
        <div className="row">
          <div className="col-md-5 offset-md-2">
            <button onClick={this.openModal}>Create New Forum Post</button>
          </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <CreateNewPost />
              <button onClick={this.closeModal}>close</button>
           </Modal>
          <div className="col-md-8 offset-md-2">
            {this.props.posts.map((post, i) => {
              if (profile.email === post.email && !this.props.editing) {
               return <div className="post">
                 <ForumPost key={i} post={post} nickname={post.nickname} title={post.title} message={post.message} replies={post.replies} />
                    <div>
                      <button type="submit" onClick={ () => {
                        this.deletePost(post._id);
                        this.getPost();
                      }}>delete</button>
                      <button type="submit" onClick={ () => {
                        this.props.dispatchSetEditing(post.message);
                      }}>edit</button>
                  </div>
               </div>
              } else if (profile.email === post.email && this.props.editing && (post.message === this.props.messageToEdit)) {
                  return <div className="post">
                    <EditPost id={post._id} message={post.message} title={post.title} />
                    <button type="submit" onClick={ () => {
                      this.props.dispatchSetEditing();
                      this.getPost();
                    }}>delete</button>
                  </div>
              } else {
               return <div className="post"><ForumPost key={i} post={post} nickname={post.nickname} title={post.title} message={post.message} replies={post.replies} /></div>
              }
            }
            )}
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