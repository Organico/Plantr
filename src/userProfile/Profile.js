import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import CoverPhoto from './CoverPhoto';
import ProfilePic from './ProfilePic';
import About from './About';
import RecentGardens from './RecentGardens';
import RecentPosts from './RecentPosts';
import axios from 'axios';
import { setPlantHardiness } from '../Actions/WeatherActions';
// import GardenGrid from './GardenSquareGrid/GardenGrid';

class Profile extends Component {

  getHardiness() {
  let zipCode = this.props.coordinates;
  console.log('here is the zipCode: ', this.props)
    axios.get('api/users/hardiness', {
      params: {
        zipCode: zipCode
      }
    })
    .then((res) => {
      console.log('res here', res.data);
      this.props.dispatchPlantHardiness(res.data);
    }).catch(err => {
      console.error('error is: ', err)
    })
  }

  componentDidMount() {
    this.getHardiness();
  }

  render() {
    return(
      <div>
        <div className="container-fluid containerStyle">

          <div className="row">
            <div className="col-md-3 profileLeft">
              <ProfilePic />
              <hr className="profileDividerLine" />
              <About />
              <hr className="profileDividerLine" />
            </div>
            <div className="col-md-6">
              <RecentGardens />
              <RecentPosts />
            </div>
          </div>
        </div>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    gardens: state.gardens,
    coordinates: state.weatherReducer.coordinates
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    dispatchUserParameters(username, gardens) {
      dispatch(setUserParameters(username, gardens));
    },
    dispatchPlantHardiness(data) {
      dispatch(setPlantHardiness(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);