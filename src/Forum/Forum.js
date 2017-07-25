import axios from 'axios';
import { connect } from 'react-redux';
import CreateNewPost from './CreateNewPost';
import EditPost from './EditPost';
import ForumPost from './ForumPost';
import Modal from  'react-modal';
import React,{ Component } from 'react';
import { setPosts, setEditing } from '../Actions/ForumActions';

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
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  check () {
    fetch("https://ipinfo.io/json")
    .then((res) => res.json())
    .then((ip) => {
      let coordinate = this.state.coordinates; //***Turns into ==> this.props.coordinates
      coordinate = coordinate || {
        latitude: +ip.loc.split(",")[0],
        longitude: +ip.loc.split(",")[1]
      }
      return coordinate;
    })
  }

  deletePost(id) {
    axios.delete('/api/forum/' + id, {
      id: id
    })
    .then((res) => {
      this.getPost();
    }).catch((err) => {
      console.error('There has been a clientside error in deleting the post in ForumJS ', err);
    });
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

  renderEditButton() {
    if (!this.props.editing) {
      return <button type="submit" onClick={this.openModal}>Post here!</button>
    }
  }

  componentDidMount() {
    this.getPost();
  }

  renderPostSection(profile, post, i) {
    const categoryCheck = (post.category === this.props.currentCategory);
    const emailCheck = (profile.email === post.email);
    if (emailCheck && !this.props.editing && !this.state.modalIsOpen && categoryCheck) {
      return (
        <div className="post">
          <div className="editDelete">
            <i className="fa fa-pencil-square-o" onClick={ () => {
              this.props.dispatchSetEditing(post.message);
            }}></i>
            <i className="fa fa-trash" onClick={ () => {
              this.deletePost(post._id);
            }}></i>
          </div>
          <ForumPost
            key={post._id}
            message={post.message}
            nickname={post.nickname}
            post={post}
            profile={profile}
            replies={post.replies}
            title={post.title}
          />
        </div>
      )
    } else if (emailCheck && categoryCheck && this.props.editing && (post.message === this.props.messageToEdit)) {
      return (
        <div className="post">
          <div className="editDelete">
            <i className="fa fa-trash" onClick={ () => {
              this.deletePost(post._id);
            }}></i>
          </div>
          <EditPost
            id={post._id}
            message={post.message}
            nickname={post.nickname}
            post={post}
            profile={profile}
            replies={post.replies}
            title={post.title}
            />
        </div>
      )
    }
    if (categoryCheck) {
      return (
        <div className="post">
          <ForumPost
            key={post._id}
            message={post.message}
            nickname={post.nickname}
            post={post}
            profile={profile}
            replies={post.replies}
            title={post.title}
          />
        </div>
      )
    }
  }

  render() {
    const profile = this.props.profile;
    return (
      <div>
        <div className="col-md-10 offset-md-1">
          <div className="post">
            <div className="row">
              <div className="col-md-10">
                <h3>Share Your Thoughts in the {this.props.currentCategory} Channel</h3>
              </div>
              <div className="replyEditDelete">
                { this.renderEditButton() }
             </div>
           </div>
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
        <div className="col-md-10 offset-md-1">
          {this.props.posts.map((post, i) => this.renderPostSection(profile, post, i))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPost: state.forumReducer.currentPost,
    currentCategory: state.forumReducer.currentCategory,
    editing: state.forumReducer.editing,
    forumActive: state.forumReducer.forumActive,
    messageToEdit: state.forumReducer.messageToEdit,
    posts: state.forumReducer.posts,
    profile: state.userProfileReducer.profile
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
