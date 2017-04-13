import React, { Component, PropTypes } from 'react';
// import {Layer, Rect, Stage} from 'react-konva';
import { connect } from 'react-redux';
// import axios from 'axios';
import NewsFeed from './NewsFeed';

class Home extends React.Component {

 render() {

    let background = {
      backgroundImage: 'url(https://static.pexels.com/photos/82728/plant-paprika-pepper-grow-82728.jpeg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'fixed',
      borderRadius: '15px'
    };

    let font = {
      fontColor: 'white',
      fontSize: '16px'
    }
    return (
      <div className="container-fluid ">
        <div className="row">
          <div className="col-xs-7 col-md-7" style={background}>
            <h1 className="display-3">Welcome to Plantr!</h1>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for
                            calling extra attention to featured content or information.</p>
            <hr className="my-2" style={font} />
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="#" role="button">Get Started</a>
            </p>
          </div>
          <NewsFeed />
        </div>
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
