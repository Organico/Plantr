import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import CoverPhoto from './CoverPhoto';
import ProfilePic from './ProfilePic';
import About from './About';
import RecentGardens from './RecentGardens';
import RecentPosts from './RecentPosts';
// import axios from 'axios';
// import { setUserParameters } from '../action';
// import GardenGrid from './GardenSquareGrid/GardenGrid';

const Profile = React.createClass({

  render() {
    return(
      <div>
        <div className="container-fluid containerStyle">

          <div className="row">
            <div className="col-md-6">
              <About />
              <RecentGardens />
              <RecentPosts />
            </div>
            <div className="col-md-6">
              <ProfilePic />
            </div>
          </div>
        </div>
      </div>
      )
  }
})

const mapStateToProps = (state) => {
  return {
    username: state.username,
    gardens: state.gardens
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    dispatchUserParameters(username, gardens) {
      dispatch(setUserParameters(username, gardens));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);