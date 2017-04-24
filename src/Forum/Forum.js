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
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const WUNDERGROUND_KEY = "b56f2c0800fdf6e4";

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

  putRequest() {
    Ajax({
      type: 'GET',
      url: 'https://phzmapi.org/97214.json',
      dataType: 'json',
      data: { zone : zone },
      success: function(data) {
        console.log(data)
      }
    }).bind(this)
 }
  //   axios.get('https://phzmapi.org/97214.json')
  //   .then((res) => {
  //     console.log('res here', res);
  //   }).catch(err => {
  //     console.error('error is: ', err)
  //   })
  // }
    // var initialize = function() {
    //     geocoder = new google.maps.Geocoder();
    //     var latlng = new google.maps.LatLng(-34.397, 150.644);
    //     var mapOptions = {
    //       zoom: 8,
    //       center: latlng
    //     }
    //     map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //   };

    // codeAddress() {
    //   geocoder = new google.maps.Geocoder();
    //   var address = document.getElementById('address').value;
    //   geocoder.geocode( { 'address': address}, function(results, status) {
    //     if (status == 'OK') {
    //       map.setCenter(results[0].geometry.location);
    //       var marker = new google.maps.Marker({
    //           map: map,
    //           position: results[0].geometry.location
    //       });
    //       return results
    //     } else {
    //       alert('Geocode was not successful for the following reason: ' + status);
    //     }
    //   });
    // }

// checks the location, returns the lat & long
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
    }).catch((err) => {
      console.error('There has been a clientside error in deleting the post in ForumJS ', err);
    });
  }

  componentDidMount() {
    this.getPost();
  }

  render() {
    const profile = auth.getProfile();
    console.log('this is the response: ', this.putRequest());
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