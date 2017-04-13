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
            <p>"Plantr is an online gardening and outdoor decor service, enabling people to create and plan their seasonal gardens based on regional variations OR local needs. Plantr was started by passionate urban farmers looking to maximize their lots while incorporating the tech to help you connect with your garden, but it is through the passion of our users that tell the story of who we are."</p>
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
