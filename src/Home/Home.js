import React, { Component, PropTypes } from 'react';
// import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux';
// import axios from 'axios';
import NewsFeed from './NewsFeed';

class Home extends React.Component {

 render() {

    let background = {
      marginTop: '10px',
      marginLeft: '10px',
      backgroundImage: 'url(https://static.pexels.com/photos/132957/pexels-photo-132957.jpeg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'fixed',
      backgroundSize: 'cover',
      borderRadius: '10px'
    };

    let font = {
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    }
    return (
      <div>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-xs-8 col-md-8" style={background}>
              <h1 className="display-3">Welcome to Plantr!</h1>
              <p className="lead" style={font}>Plantr is an online gardening and outdoor decor service, enabling people to create and plan their seasonal gardens based on regional variations and personal needs. Plantr was started by a group of passionate urban farmers looking to maximize their lots while incorporating the tech they use to help connect with their garden. It is through the passion of our users that Plantr is able to tell the story of who we are and how we connect with one another.</p>
              <hr className="my-2"/>
              <p style={font}>From customization to cost and weather integration, Plantr gives you the tools to make gardening quick and easy. Sign up to join our community of local growers to find out how you can take your gardening skills to the next level! </p>
              <p className="lead">
                 <button className="btn btn-primary" onClick={auth.login.bind(this)}>Getting Started</button>
              </p>
            </div>
          </div>
        </div>
        <NewsFeed />
      </div>
    )
  }
};

// const mapStateToProps = (state) => {
//   return {
//     // searchTerm: state.searchTerm
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {

//     // dispatchSetGardenParameters(width, height, color) {
//     //   dispatch(setGardenParameters(width, height, color));
//     // },
//     // dispatchSetGarden(dbGardenGrid) {
//     //   dispatch(setGarden(dbGardenGrid));
//     // }
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
