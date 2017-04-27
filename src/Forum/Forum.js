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
import Ajax from 'react-ajax';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#d6eef9',
    borderRadius: '10px'
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

  check () {
    fetch("https://ipinfo.io/json")
      .then(res => res.json())
      .then(ip => {
          let crd = this.state.coordinates; //***Turns into ==> this.props.coordinates
          crd = crd || {
            latitude: +ip.loc.split(",")[0],
            longitude: +ip.loc.split(",")[1]
          }
          console.log('this is the CRD: ', crd);
          console.log('GOOGLE API AIzaSyA6vXqv9uWnwy23Np7vN7CAOXFqtByzDL4')
          return crd
      })
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
      this.getPost();
    }).catch((err) => {
      console.error('There has been a clientside error in deleting the post in ForumJS ', err);
    });
  }

  componentDidMount() {
    this.getPost();
  }

  render() {
    const profile = auth.getProfile();
    let that = this;
    return(
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
                     return  <button type="submit" onClick={that.openModal}>Post Here!</button>
                    }
                  }())
                  }
                </div>
              </div>
            </div>
            <br/>
            <div className="searchForum">
              <input className="searchForum" />
            </div>
          </div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h3>Post Your Questions or Successes Onto the Forum</h3>
            <CreateNewPost closeModal={this.closeModal}/>
            <button onClick={this.closeModal}>close</button>
         </Modal>
         <div className="col-md-8 offset-md-2">
           {this.props.posts.map((post, i) => {
             if (profile.email === post.email && !this.props.editing && !that.state.modalIsOpen) {
            return <div className="post">
                 <div className="editDelete">
                   <i className="fa fa-pencil-square-o" ariaHidden="true" onClick={ () => {
                       this.props.dispatchSetEditing(post.message);
                     }}></i>
                   <i className="fa fa-trash" ariaHidden="true" onClick={ () => {
                       this.deletePost(post._id);
                     }}></i>
                 </div>
              <ForumPost key={i} post={post} nickname={post.nickname} title={post.title} message={post.message} replies={post.replies} />
            </div>
           } else if (profile.email === post.email && this.props.editing && (post.message === this.props.messageToEdit)) {
                return <div className="post">
                  <div className="editDelete">
                    <i className="fa fa-trash" ariaHidden="true" onClick={ () => {
                      this.deletePost(post._id);
                    }}></i>
                  </div>
                  <EditPost id={post._id} post={post} nickname={post.nickname} message={post.message} title={post.title} replies={post.replies} />
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