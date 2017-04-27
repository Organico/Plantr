import React, { Component } from 'react';
import GardenSquareGridView from '../GardenSquareGrid/getGardenSquareGrid';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import auth from '../client.js';
import { setPosts } from '../Actions/ForumActions';

class IndividualGarden extends Component {

  render() {
    let profilePic = {
      height: '50px',
      width: '50px',
      backgroundImage: 'url(' + this.props.profilePicture + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: '900',
      borderRadius: '50%'
    }
    console.log('THIS PROPS IN INDIVIDUAL: ', this);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <div className="row"></div>
              <div className="col-md-12 offset-md-3 postPicture" style={profilePic}>
              </div>
              <div className="row">
                <div className="col-md-12 postUsername">{ this.props.nickname }
                </div>
              </div>
            </div>
            <div className="row forumMessage" onClick={ ()=> {this.props.onClick(); }}>
              { this.props.gardenName }
            </div>
        </div>
      </div>
    )
  }
}


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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualGarden);
