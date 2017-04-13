import React from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
// import axios from 'axios';
// import { setUserParameters } from '../action';
// import GardenGrid from './GardenSquareGrid/GardenGrid';

const Profile = React.createClass({

  render() {
    return(
      <div>
        <div className="container-fluid containerStyle">
        {/*//<<-------------------COVER PHOTO----------------------->>*/}
          <div className="row">
            <div id="coverPhoto" className="col-md-12 col-sm-12 col-xs-12">
            </div>
          </div>
          <div className="row">
        {/*<<-------------------PROFILE PIC----------------------->>*/}
            <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-xs-8 offset-xs-2" id="profilePic">
              <div className="container">
                <div className="row">
                  <div id="username" className="col-md-6 offset-md-3 col-sm-6 offset-sm-3">
                    User Name
                  </div>
                </div>
                <div className="row">
                  <div id="innerProfile" className="col-md-6 offset-md-3 col-sm-6 offset-sm-3">
                    <div id="innerProfilePic"></div>
                  </div>
                </div>
              </div>
            </div>
        {/*<<-------------------USER RECENT DIVS----------------------->>*/}
        {/*<<-------------------ABOUT----------------------->>*/}
            <div className="col-md-3 offset-md-0 col-sm-6 offset-sm-0 col-xs-12 right userRecent">
              <div className="userRecentSpan"> About Me </div>
              <div>
                <p>This is a paragraph about myself. I'm so cool. Look at all this cool stuff about me!</p>
              </div>
            </div>
        {/*<<-------------------RECENT GARDENS----------------------->>*/}
            <div className="col-md-4 offset-md-1 col-sm-6 col-xs-12 right userRecent">
              <div className="userRecentSpan"> Recent Gardens </div>
              <div>
                <ul>
                  <li className="userRecentUL">
                    <a href="url">Item One</a>
                  </li>
                  <li className="userRecentUL">
                    <a href="url">Item Two</a>
                  </li>
                  <li className="userRecentUL">
                    <a href="url">Item Three</a>
                  </li>
                  <li className="userRecentUL">
                    <a href="url">All Items</a>
                  </li>
                </ul>
              </div>
            </div>
        {/*<<-------------------RECENT POSTS----------------------->>*/}
            <div className="col-md-3 offset-md-1 col-sm-12 col-xs-12 right userRecent">
              <div className="userRecentSpan"> Recent Posts </div>
              <div>
                <ul>
                  <li className="userRecentUL">
                    <a href="url">Item One</a>
                  </li>
                  <li className="userRecentUL">
                    <a href="url">Item Two</a>
                  </li>
                  <li className="userRecentUL">
                    <a href="url">Item Three</a>
                  </li>
                  <li className="userRecentUL">
                    <a href="url">All Items</a>
                  </li>
                </ul>
              </div>
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